// <KitScreen>: wraps a ported Provider screen (or the shared shell) and gives the static markup its behavior, by
// delegation on the attributes the capture stamped:
//   data-kit-action  search | reset | cancel | create | save | close | collapse | menu | menu-close
//   data-kit-tip     Kendo tooltips (help icons, the logo): shown after the portal's delay, in the portal's markup and colors
//   data-kit-h       parts hidden at rest that Search reveals (the results panel)
//   data-kit-menu    the side menu (hamburger): -add/-remove the classes that open it, -backdrop what it appends to <body>,
//                    -hover/-open-ms/-close-ms Kendo's menu timings; its modules fly out on hover, its links route
// plus: k-focus on the focused input's wrapper (Kendo does that; the portal's CSS draws the purple border from it),
// links to a rebuilt screen, the headroom header (hides on scroll down), and the dialogs (Kendo windows).
import { useCallback, useLayoutEffect, useMemo, useRef, useState, type ComponentType, type KeyboardEvent as RKeyboardEvent, type ReactNode, type SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { Bus, KitContext, DEFAULTS, parseHtml, styleObject, useIsland, type Create, type Ctx, type DialogDef, type KitData, type Services } from './core';

type Open = { id: string; closing: boolean };
const shown = (el: Element) => el.getClientRects().length > 0;

// values of the named fields under an element: what Search / Save would send
function values(root: Element | null) {
  const out: Record<string, string> = {};
  if (!root) return out;
  for (const i of root.querySelectorAll<HTMLInputElement>('input[name], select[name], textarea[name]')) {
    if ((i.type === 'checkbox' || i.type === 'radio') && !i.checked) continue;
    out[i.name] = i.value;
  }
  return out;
}
function clearErrors(root: Element) {
  root.querySelectorAll('[data-kit-err]').forEach((e) => e.remove());
  root.querySelectorAll('.k-invalid').forEach((e) => e.classList.remove('k-invalid'));
  root.querySelectorAll('[data-valmsg-for].field-validation-error').forEach((e) => { e.classList.remove('field-validation-error'); e.classList.add('field-validation-valid'); e.textContent = ''; });
}
function resetFields(root: Element | null) {
  if (!root) return;
  for (const i of root.querySelectorAll<HTMLInputElement>('input, textarea')) {
    if (i.closest('[data-kit]')) continue; // the kit widgets reset themselves (bus "reset")
    if (i.type === 'checkbox' || i.type === 'radio') i.checked = i.defaultChecked; else if (!/^(button|submit|reset|hidden)$/.test(i.type)) i.value = i.defaultValue;
  }
  clearErrors(root);
}
// MVC unobtrusive validation (data-val-*), the rules the portal's forms use; the messages are the server's own
function validate(root: Element | null) {
  if (!root) return true;
  clearErrors(root);
  let ok = true;
  for (const i of root.querySelectorAll<HTMLInputElement>('input[data-val="true"], select[data-val="true"], textarea[data-val="true"]')) {
    const h = i.closest('[data-kit-h]');
    if (h && !shown(h)) continue; // a part that is not on screen (the Destination form of a dialog) is not validated, as on the portal
    const v = i.value.trim();
    const a = (n: string) => i.getAttribute(`data-val-${n}`);
    let msg: string | null = null;
    if (a('required') && !v) msg = a('required');
    else if (v && a('length-max') && v.length > +a('length-max')!) msg = a('length');
    else if (v && a('regex-pattern') && !new RegExp(a('regex-pattern')!).test(v)) msg = a('regex');
    else if (v && a('email') && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) msg = a('email');
    else if (v && a('number') && isNaN(+v)) msg = a('number');
    else if (v && a('range') && ((a('range-min') && +v < +a('range-min')!) || (a('range-max') && +v > +a('range-max')!))) msg = a('range');
    if (!msg) continue;
    ok = false;
    const wrap = i.closest('.k-input, .k-picker, .k-dropdownlist, .k-numerictextbox') ?? i;
    wrap.classList.add('k-invalid');
    const slot = root.querySelector(`[data-valmsg-for="${CSS.escape(i.name)}"]`);
    if (slot) { slot.classList.remove('field-validation-valid'); slot.classList.add('field-validation-error'); slot.textContent = msg; }
    else wrap.insertAdjacentHTML('afterend', `<span class="k-form-error k-invalid-msg field-validation-error" data-kit-err="">${msg.replace(/[<>&]/g, '')}</span>`);
  }
  return ok;
}
// show an element hidden at rest: its own display, or block when its class hides it
function reveal(el: HTMLElement) {
  el.style.removeProperty('display');
  if (getComputedStyle(el).display === 'none') el.style.display = 'block';
}

// ---------- a Create New that shows a part of its dialog (or page) instead of opening a window ----------
// which recorded Create New this button is: by its id, else by its place among the shown ones (as the capture counted them)
const createOf = (list: Create[] | undefined, act: Element, all: Element[]) =>
  list?.find((c) => !!c.id && c.id === act.id) ?? list?.find((c) => !c.id && c.index === all.filter(shown).indexOf(act));
// shows the parts the live click showed and hides the ones it hid (`key` marks them, so a Cancel or Save inside puts them away)
function setPart(root: ParentNode, c: Create, key: string | null) {
  for (const s of c.show ?? []) root.querySelectorAll<HTMLElement>(s).forEach((el) => { if (key) { reveal(el); el.setAttribute('data-kit-part', key); } else { el.style.display = 'none'; el.removeAttribute('data-kit-part'); } });
  for (const s of c.hide ?? []) root.querySelectorAll<HTMLElement>(s).forEach((el) => { if (key) el.style.display = 'none'; else reveal(el); });
  if (key && c.scroll != null) { if (root instanceof HTMLElement && root.scrollHeight > root.clientHeight) root.scrollTop = c.scroll; else scrollTo(0, c.scroll); }
}

// ---------- tooltip (one at a time, like Kendo) ----------
let tip: { el: HTMLElement; target: Element } | null = null;
let tipTimer = 0;
function showTip(data: KitData, target: HTMLElement) {
  hideTip(true);
  const text = target.getAttribute('data-kit-tip')!;
  const pos = target.getAttribute('data-kit-tip-pos') || 'top';
  const tpl = data.calibration?.tooltip ? parseHtml(data.calibration.tooltip) : null;
  const tt = ((tpl && (tpl.matches('.k-tooltip') ? tpl : tpl.querySelector('.k-tooltip'))?.cloneNode(true)) as HTMLElement | null)
    ?? (parseHtml('<div role="tooltip" class="k-tooltip k-popup"><div class="k-tooltip-content"></div><div class="k-callout"></div></div>') as HTMLElement);
  tt.removeAttribute('id');
  tt.removeAttribute('style');
  tt.style.position = 'relative'; // inside its animation container, as Kendo shows it (the theme makes .k-popup absolute)
  (tt.querySelector('.k-tooltip-content') ?? tt).textContent = text;
  const callout = tt.querySelector('.k-callout') as HTMLElement | null;
  // Kendo's markup: k-animation-container > k-child-animation-container > k-tooltip, at the text's natural width
  const box = document.createElement('div');
  box.className = 'k-animation-container k-animation-container-shown';
  box.setAttribute('data-kit-popup', '');
  Object.assign(box.style, { position: 'absolute', zIndex: '12000', width: 'max-content', maxWidth: '600px' });
  const child = document.createElement('div');
  child.className = 'k-child-animation-container';
  child.style.display = 'block';
  child.append(tt);
  box.append(child);
  document.body.append(box);
  // the exact (fractional) size: offsetWidth rounds down, and a box 0.8px too narrow wraps "Client Logo" onto two lines
  const r = target.getBoundingClientRect(), { width: w, height: h } = tt.getBoundingClientRect();
  const gap = data.calibration?.defaults?.tooltipGap ?? DEFAULTS.tooltipGap;
  // no room on the asked side: Kendo flips to the other one (the logo's "top" tooltip shows below it)
  let side = pos === 'bottom' ? 'n' : pos === 'left' ? 'e' : pos === 'right' ? 'w' : 's';
  if (side === 's' && r.top - h - gap < 0) side = 'n';
  else if (side === 'n' && r.bottom + h + gap > innerHeight) side = 's';
  if (callout) callout.className = `k-callout k-callout-${side}`;
  Object.assign(child.style, { width: `${w + 1}px`, height: `${h}px` }); // Kendo's container is 1px wider than its tooltip (probe 2, Q21)
  const cx = r.left + r.width / 2 + scrollX, cy = r.top + r.height / 2 + scrollY;
  const at = { s: [cx - w / 2, r.top + scrollY - h - gap], n: [cx - w / 2, r.bottom + scrollY + gap], e: [r.left + scrollX - w - gap, cy - h / 2], w: [r.right + scrollX + gap, cy - h / 2] }[side]!;
  const left = Math.max(0, at[0]);
  Object.assign(box.style, { left: `${left}px`, top: `${at[1]}px` });
  if (callout && (side === 's' || side === 'n')) callout.style.left = `${w / 2 - callout.offsetWidth / 2 - (left - at[0])}px`;
  const dur = data.calibration?.defaults?.tooltip?.animation?.open?.duration ?? 0;
  if (dur) tt.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur });
  tip = { el: box, target };
}
function hideTip(now = false, data?: KitData) {
  clearTimeout(tipTimer);
  if (!tip) return;
  const t = tip;
  tip = null;
  const dur = now ? 0 : data?.calibration?.defaults?.tooltip?.animation?.close?.duration ?? 40;
  if (!dur) { t.el.remove(); return; }
  t.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur }).finished.then(() => t.el.remove(), () => t.el.remove());
}

// ---------- the side menu ----------
const words = (s: string | null) => (s ?? '').split(/\s+/).filter(Boolean);
// [classes added on open, classes removed on open]: as the capture recorded them; a capture from before that recording
// still carries the portal's display-* classes, which mean the same thing
function menuClasses(el: HTMLElement): [string[], string[]] {
  if (el.hasAttribute('data-kit-menu-add')) return [words(el.getAttribute('data-kit-menu-add')), words(el.getAttribute('data-kit-menu-remove'))];
  if (/(^|\s)display-(none|flex|block)(\s|$)/.test(el.className)) { const d = el.getAttribute('data-kit-menu'); return [[`display-${d && d !== 'none' ? d : 'flex'}`], ['display-none']]; }
  return [[], []];
}
const menuMs = (menu: Element | null, which: 'hover' | 'open-ms' | 'close-ms', dflt: number) => { const v = menu?.getAttribute(`data-kit-menu-${which}`); return v != null && v !== '' && !isNaN(+v) ? +v : dflt; };
// A Kendo menu (the side menu's module list, the module tab under the header) opens a submenu the way Kendo does: it lifts
// the item's popup out of the <ul> into a `.k-animation-container` on the menu's scroll wrapper (the ul clips what is inside
// it), beside the item: to the left of a vertical menu (left: -width, top: the item's top), under a horizontal one. The
// portal's CSS styles that container, so the clone gets the same classes. Timings: the menu's own (data-kit-menu-*), else Kendo's.
const MENU = 'ul[data-role=menu]';
type Fly = { li: Element; box: HTMLElement };
const flys = new WeakMap<Element, Fly>();
const flyMs = (ul: Element, which: 'hover' | 'open-ms' | 'close-ms', dflt: number) =>
  menuMs(ul.hasAttribute(`data-kit-menu-${which}`) ? ul : ul.closest(`[data-kit-menu-${which}]`), which, dflt);
const hostOf = (ul: Element) => (ul.closest('.k-menu-scroll-wrapper') ?? ul.parentElement) as HTMLElement;
const isHorizontal = (ul: Element) => ul.getAttribute('aria-orientation') === 'horizontal' || ul.classList.contains('k-menu-horizontal');
const slideFrom = (ul: Element) => (isHorizontal(ul) ? 'translateY(-100%)' : 'translateX(100%)');
function hideFly(ul: Element, now = false) {
  const f = flys.get(ul);
  if (!f) return;
  flys.delete(ul);
  f.li.classList.remove('k-hover', 'k-focus');
  f.li.setAttribute('aria-expanded', 'false');
  const ms = now ? 0 : flyMs(ul, 'close-ms', 100), done = () => f.box.remove();
  if (!ms) return done();
  f.box.classList.remove('k-animation-container-shown');
  f.box.firstElementChild!.animate([{ transform: 'translate(0, 0)' }, { transform: slideFrom(ul) }], { duration: ms, easing: 'ease-in', fill: 'forwards' }).finished.then(done, done);
}
// The item's popup: inside the <li>, as the server wrote it. But once the live Kendo has opened an item of a scrollable menu
// it leaves the popup in a container on the scroll wrapper, linked to the item by data-groupparent / data-group (and
// aria-controls): that is how the capture finds the one module it hovered itself, which is the pack's own module.
function popupOf(li: Element): HTMLElement | null {
  const own = li.querySelector<HTMLElement>(':scope > .k-menu-popup, :scope > .k-animation-container .k-menu-popup');
  if (own) return own;
  const src = (sel: string) => [...li.ownerDocument.querySelectorAll<HTMLElement>(sel)].find((p) => !p.closest('[data-kit-flyout]')) ?? null; // not a fly-out's clone
  const g = li.getAttribute('data-groupparent'), c = li.getAttribute('aria-controls');
  return (g ? src(`.k-menu-popup[data-group="${CSS.escape(g)}"]`) : null) ?? (c ? src(`[id="${CSS.escape(c)}"]`)?.closest<HTMLElement>('.k-menu-popup') ?? null : null);
}
// opens `li`'s popup (and closes the one that was open); an item without a popup only closes the open one
function showFly(ul: Element, li: Element) {
  const cur = flys.get(ul);
  if (cur?.li === li) return;
  const pop = popupOf(li);
  hideFly(ul, !!pop);
  if (!pop) return;
  li.classList.add('k-hover', 'k-focus'); // the portal's CSS highlights the open item through these
  li.setAttribute('aria-expanded', 'true');
  const host = hostOf(ul);
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  const box = document.createElement('div');
  box.className = 'k-animation-container';
  box.setAttribute('role', 'region');
  box.setAttribute('data-kit-flyout', '');
  const child = document.createElement('div');
  child.className = 'k-child-animation-container';
  const clone = pop.cloneNode(true) as HTMLElement;
  clone.style.removeProperty('display');
  clone.setAttribute('aria-hidden', 'false');
  clone.querySelectorAll<HTMLElement>('.k-menu-scroll-button').forEach((b) => { b.style.display = 'none'; }); // Kendo hides them while everything fits
  child.append(clone);
  box.append(child);
  Object.assign(box.style, { display: 'block', position: 'absolute', zIndex: '10002', visibility: 'hidden' });
  host.append(box);
  const w = clone.offsetWidth, h = clone.offsetHeight;
  Object.assign(child.style, { display: 'block', width: `${w}px`, height: `${h}px` });
  const hr = host.getBoundingClientRect(), lr = li.getBoundingClientRect();
  if (isHorizontal(ul)) Object.assign(box.style, { top: `${lr.bottom - hr.top}px`, left: `${lr.left - hr.left}px` });
  else Object.assign(box.style, { top: `${lr.top - hr.top}px`, left: `${-w}px` });
  box.style.removeProperty('visibility');
  flys.set(ul, { li, box });
  child.animate([{ transform: slideFrom(ul) }, { transform: 'translate(0, 0)' }], { duration: flyMs(ul, 'open-ms', DEFAULTS.menuMs), easing: 'ease-out' })
    .finished.then(() => box.classList.add('k-animation-container-shown'), () => {});
}
const closeFlys = (root: ParentNode, now = false) => root.querySelectorAll(MENU).forEach((ul) => hideFly(ul, now));

// ---------- a dialog: the portal's Kendo window chrome around the ported content ----------
function Window({ id, def, Body, depth, closing, onClosed }: { id: string; def: DialogDef; Body?: ComponentType; depth: number; closing: boolean; onClosed: () => void }) {
  const win = useRef<HTMLDivElement>(null), ov = useRef<HTMLDivElement>(null);
  const bar = useIsland(def.titlebarHtml || `<div class="k-window-titlebar"><span class="k-window-title">${def.title}</span></div>`);
  const anim = def.options?.animation as { open?: { duration?: number }; close?: { duration?: number } } | false | undefined;
  const openMs = anim === false ? 0 : anim?.open?.duration ?? DEFAULTS.windowMs, closeMs = anim === false ? 0 : anim?.close?.duration ?? DEFAULTS.windowMs;
  useLayoutEffect(() => { // Kendo centers a window when it opens, then zooms and fades it in
    const w = win.current!;
    // Kendo/jQuery centering uses the layout viewport width/height (documentElement.clientWidth/Height),
    // not window.innerWidth/innerHeight. This matters at 1280x720 (aka 1920x1080 @ 150% zoom) where
    // dialogs can end up touching the left edge on the live site.
    const vw = document.documentElement?.clientWidth || innerWidth;
    const vh = document.documentElement?.clientHeight || innerHeight;
    w.style.left = `${Math.max(0, (vw - w.offsetWidth) / 2 + scrollX)}px`;
    w.style.top = `${Math.max(0, (vh - w.offsetHeight) / 2 + scrollY)}px`;
    if (openMs) { w.animate([{ opacity: 0, transform: 'scale(0.01)' }, { opacity: 1, transform: 'scale(1)' }], { duration: openMs, easing: 'ease-out' }); ov.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: openMs }); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!closing) return;
    if (!closeMs) { onClosed(); return; }
    win.current!.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.01)' }], { duration: closeMs, fill: 'forwards' }).finished.then(onClosed, onClosed);
    ov.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: closeMs, fill: 'forwards' });
  }, [closing]); // eslint-disable-line react-hooks/exhaustive-deps
  const style: Record<string, string | number> = { ...styleObject(def.windowStyle), position: 'absolute', zIndex: 10003 + depth * 2, opacity: 1, transform: 'none' };
  delete style.top; delete style.left;
  return createPortal(
    <>
      {def.options?.modal !== false && <div ref={ov} className={def.overlay?.className || 'k-overlay'} style={{ ...styleObject(def.overlay?.style ?? null), display: 'block', zIndex: 10002 + depth * 2 }} />}
      <div ref={win} className={def.windowClass} style={style} role="dialog" data-kit-dialog={id}>
        {bar}
        <div className={def.contentClass} id={def.contentId ?? undefined} style={styleObject(def.contentStyle)} data-kit-dialog-content={id}>{Body ? <Body /> : null}</div>
      </div>
    </>, document.body);
}

export function KitScreen({ screen, dialogs = {}, services, shell = false, children }: { screen: KitData; dialogs?: Record<string, ComponentType>; services?: Services; shell?: boolean; children?: ReactNode }) {
  const bus = useMemo(() => new Bus(), []);
  const [open, setOpen] = useState<Open[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const defs = useMemo(() => Object.assign({}, screen.widgets, ...Object.values(screen.dialogs ?? {}).map((d) => d.widgets)), [screen]);
  const openDialog = useCallback((id: string) => { if (screen.dialogs?.[id]) setOpen((o) => (o.some((x) => x.id === id) ? o : [...o, { id, closing: false }])); }, [screen]);
  const closeDialog = useCallback((id: string) => setOpen((o) => o.map((x) => (x.id === id ? { ...x, closing: true } : x))), []);
  const ctx: Ctx = useMemo(() => ({ data: screen, defs, bus, openDialog }), [screen, defs, bus, openDialog]);
  const menuTimer = useRef(0);

  useLayoutEffect(() => {
    const r = root.current!;
    // a k-focus frozen into the capture belongs to the live page's focus: the rebuild focuses the same field itself
    r.querySelectorAll('.k-focus').forEach((e) => e.classList.remove('k-focus'));
    r.querySelectorAll('[data-kit-tip][title]').forEach((e) => { if (!e.hasAttribute('aria-label')) e.setAttribute('aria-label', e.getAttribute('title')!); e.removeAttribute('title'); });
    const af = r.querySelector<HTMLElement>('[data-kit-autofocus]');
    const focusEl = af?.matches('input, select, textarea, [tabindex]') ? af : af?.querySelector<HTMLElement>('input:not([type=hidden]), [tabindex]');
    focusEl?.focus({ preventScroll: true });
    if (!shell) return;
    // the header slides away on scroll down and back on scroll up (headroom.js: the portal's CSS owns the classes)
    const head = document.querySelector<HTMLElement>('#pageHeader.headroom, .headroom');
    let last = scrollY;
    const onScroll = () => {
      if (!head) return;
      const y = scrollY;
      head.classList.toggle('headroom--top', y <= 0);
      head.classList.toggle('headroom--not-top', y > 0);
      if (Math.abs(y - last) < 5) return;
      const down = y > last && y > head.offsetHeight;
      head.classList.toggle('headroom--unpinned', down);
      head.classList.toggle('headroom--pinned', !down);
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [shell]);

  // the page-level help icon (the book): it sits in the title row, which the shared shell owns, but the live page decides per
  // screen whether it has one. This screen's capture says so: show it when the live page had it (the shell, ported from
  // another screen, may not carry it), hide the shell's when the live page had none. No-op on a capture without `help`.
  useLayoutEffect(() => {
    if (shell || screen.help === undefined) return;
    const row = document.getElementById('mcbRowBorder');
    if (!row) return;
    const cur = row.querySelector<HTMLElement>('.help-icon-container');
    if (!screen.help) {
      if (!cur) return;
      const was = cur.style.display;
      cur.style.display = 'none';
      return () => { cur.style.display = was; };
    }
    if (cur) return;
    const el = parseHtml(screen.help) as HTMLElement | null;
    if (!el) return;
    el.querySelectorAll('[onclick], [onkeypress]').forEach((e) => { e.removeAttribute('onclick'); e.removeAttribute('onkeypress'); }); // the portal's page-help window is not rebuilt
    el.querySelectorAll('[title]').forEach((e) => {
      if (!e.hasAttribute('data-kit-tip') && e.matches('[data-role=tooltip]')) e.setAttribute('data-kit-tip', e.getAttribute('title')!);
      if (!e.hasAttribute('aria-label')) e.setAttribute('aria-label', e.getAttribute('title')!);
      e.removeAttribute('title');
    });
    row.append(el);
    return () => el.remove();
  }, [screen, shell]);

  // the side menu, as the page's own script does it: swap the classes the capture saw change on its root (the portal's
  // display-none / display-flex, which are !important, so an inline display can never show it) and append the backdrop
  // it adds to <body>. No fade: the live menu has none. Its close icon, a link in it, or the hamburger close it again.
  const backdrop = useRef<HTMLElement | null>(null);
  const sideMenu = (show: boolean) => {
    for (const el of root.current!.querySelectorAll<HTMLElement>('[data-kit-menu]')) {
      const [add, rm] = menuClasses(el);
      if (add.length || rm.length) { el.classList.remove(...(show ? rm : add)); el.classList.add(...(show ? add : rm)); el.style.removeProperty('display'); }
      else el.style.display = show ? el.getAttribute('data-kit-menu') || 'block' : 'none';
      if (!show) closeFlys(el, true);
      const bd = el.getAttribute('data-kit-menu-backdrop');
      if (show && bd && !backdrop.current) {
        const b = parseHtml(bd) as HTMLElement | null;
        if (b) { b.setAttribute('data-kit-menu-backdrop-live', ''); document.body.append(b); backdrop.current = b; }
      }
    }
    if (!show) { backdrop.current?.remove(); backdrop.current = null; }
  };
  const menuOpen = () => [...root.current!.querySelectorAll('[data-kit-menu]')].some(shown);
  useLayoutEffect(() => { // the menu starts closed, whatever state the capture froze it in (a static copy of the backdrop is hidden)
    for (const el of root.current!.querySelectorAll<HTMLElement>('[data-kit-menu]')) {
      const cls = /class="([^"]+)"/.exec(el.getAttribute('data-kit-menu-backdrop') ?? '')?.[1];
      if (cls) root.current!.querySelectorAll<HTMLElement>('.' + cls.trim().split(/\s+/).map((c) => CSS.escape(c)).join('.')).forEach((b) => { b.style.display = 'none'; });
    }
    // the hamburger's twins open it too: the portal shows a second one (.mobile-nav) below 1280 CSS px (a 1920 screen at
    // 150% scaling), and captures from before the kit stamped twins only carry the one the capture clicked
    for (const b of root.current!.querySelectorAll<HTMLElement>('[data-kit-action=menu]')) {
      if (!b.className) continue;
      root.current!.querySelectorAll<HTMLElement>(b.tagName).forEach((t) => {
        if (!t.hasAttribute('data-kit-action') && t.className === b.className && t.getAttribute('aria-label') === b.getAttribute('aria-label')) t.setAttribute('data-kit-action', 'menu');
      });
    }
    sideMenu(false);
    return () => { backdrop.current?.remove(); backdrop.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onClick = (e: SyntheticEvent) => {
    const t = e.target as Element;
    const act = t.closest('[data-kit-action]');
    const dlg = t.closest('[data-kit-dialog-content]')?.getAttribute('data-kit-dialog-content') ?? t.closest('[data-kit-dialog]')?.getAttribute('data-kit-dialog') ?? null;
    const scope = dlg ? document.querySelector(`[data-kit-dialog-content="${dlg}"]`) : root.current;
    if (!act) {
      const a = t.closest('a[href]');
      if (!a || t.closest('[data-kit]')) return;
      e.preventDefault(); // the portal's own links: a rebuilt screen goes to its route, everything else stays put
      e.stopPropagation();
      const routes = (globalThis as { __kitRoutes?: { path: string; url?: string }[] }).__kitRoutes ?? [];
      let p = '';
      try { p = new URL(a.getAttribute('href') ?? '', location.origin).pathname.toLowerCase(); } catch { /* javascript: links */ }
      const hit = p ? routes.find((r) => { try { return !!r.url && new URL(r.url).pathname.toLowerCase() === p; } catch { return false; } }) : undefined;
      // an item of a rebuilt screen routes there and closes the menu, like the portal's .child-menu click; every other item of
      // the menu is shown but leads nowhere (the other modules are not rebuilt here), and the menu stays open
      if (hit) {
        const fly = a.closest('[data-kit-flyout]'), inMenu = !!a.closest('[data-kit-menu]'); // before the fly-out (and the link with it) is removed
        if (fly) closeFlys(fly.parentElement!, true);
        if (inMenu) sideMenu(false);
        location.hash = `#${hit.path}`;
      }
      return;
    }
    const kind = act.getAttribute('data-kit-action');
    e.preventDefault();
    e.stopPropagation();
    // inside a part a Create New showed (data-kit-part="<dialog id | page>:<its place in creates>"): Cancel and Save put it away
    const part = act.closest<HTMLElement>('[data-kit-part]'), home = (dlg ? scope : root.current) as HTMLElement | null;
    const putAway = () => {
      const [where, n] = part!.getAttribute('data-kit-part')!.split(':');
      const c = (where === 'page' ? screen.creates : screen.dialogs[where]?.creates)?.[+n];
      if (c && home) setPart(home, c, null);
    };
    switch (kind) {
      case 'search': {
        const v = values(root.current);
        Promise.resolve(services?.search?.(v)).finally(() => {
          bus.emit('search', v);
          for (const id of screen.search?.reveals ?? []) root.current?.querySelectorAll<HTMLElement>(`[data-kit-h="${id}"]`).forEach(reveal);
        });
        break;
      }
      case 'reset': resetFields(part ?? scope); bus.emit('reset'); break;
      case 'create': {
        const all = [...(home?.querySelectorAll('[data-kit-action=create]') ?? [])];
        if (dlg) { // a Create New inside a dialog opens that dialog's own child, or shows a part of the dialog
          const list = screen.dialogs[dlg]?.creates, c = createOf(list, act, all);
          const child = c ? c.dialog : screen.dialogs[dlg]?.children?.[all.indexOf(act)]; // no `creates`: a capture from before them
          if (child) openDialog(child);
          else if (c && home) setPart(home, c, `${dlg}:${list!.indexOf(c)}`);
        } else {
          const tops = Object.entries(screen.dialogs ?? {}).filter(([, d]) => !d.parent), i = all.filter(shown).indexOf(act);
          const id = (tops.find(([, d]) => !!d.openerId && d.openerId === act.id) ?? tops.find(([, d]) => !d.openerId && d.openerIndex === i))?.[0];
          const c = id ? undefined : createOf(screen.creates, act, all);
          if (id) openDialog(id);
          else if (c && home) setPart(home, c, `page:${screen.creates!.indexOf(c)}`);
        }
        break;
      }
      case 'save':
        if (part) { if (validate(part)) Promise.resolve(services?.save?.(dlg ?? 'page', values(part))).finally(putAway); }
        else if (dlg && validate(scope)) Promise.resolve(services?.save?.(dlg, values(scope))).finally(() => closeDialog(dlg));
        break;
      case 'cancel': case 'close': if (part && kind === 'cancel') putAway(); else if (dlg) closeDialog(dlg); break;
      case 'collapse': {
        // the body: the panel container's own (the portal's .content-subpanel-container > .content-subpanel-bdy, whose header
        // tools hold the icon one level down), else the element that follows the header
        const box = act.closest<HTMLElement>('[class*=panel-container]');
        const body = (box?.querySelector(':scope > [data-kit-collapse]') ?? (act.closest('[class*=hdr], [class*=header], [class*=heading]') ?? act.parentElement)?.nextElementSibling) as HTMLElement | null;
        if (!body?.matches('[data-kit-collapse]')) break;
        const opening = !shown(body);
        const icon = act.matches('[class*=chevron], [class*=angle]') ? act : act.querySelector('[class*=chevron], [class*=angle]');
        if (icon) {
          // what the portal's expandPanel / collapsePanel do to the icon: chevron / angle up <-> down, its *-collapsed class,
          // its Expand / Collapse title, and the container's collapsedPanel class
          for (const c of [...icon.classList]) if (/(chevron|angle)-(up|down)$/.test(c)) icon.classList.replace(c, c.replace(/(up|down)$/, (m) => (m === 'up' ? 'down' : 'up')));
          const flag = (el: HTMLElement | Element, re: RegExp) => {
            if (opening) { const c = [...el.classList].find((x) => re.test(x)); if (c) { el.classList.remove(c); (el as HTMLElement).dataset.kitWas = c; } } else { const c = (el as HTMLElement).dataset.kitWas; if (c) el.classList.add(c); }
          };
          flag(icon, /^(subpanel|subsec|panel)-collapsed$/);
          if (box) flag(box, /^collapsedPanel$/);
          const t = icon.getAttribute('title');
          if (t === 'Expand' || t === 'Collapse') icon.setAttribute('title', t === 'Expand' ? 'Collapse' : 'Expand');
        }
        if (act.id === 'mobileMenuIcon') document.getElementById('mainMenuItemContainer')?.style.setProperty('height', '20vh'); // the portal's own handler does this on every click
        if (opening) { reveal(body); const h = body.scrollHeight; body.animate([{ height: '0px', overflow: 'hidden' }, { height: `${h}px`, overflow: 'hidden' }], { duration: DEFAULTS.collapseMs }); }
        else { const h = body.offsetHeight; body.animate([{ height: `${h}px`, overflow: 'hidden' }, { height: '0px', overflow: 'hidden' }], { duration: DEFAULTS.collapseMs }).finished.then(() => { body.style.display = 'none'; }, () => {}); }
        break;
      }
      case 'menu': sideMenu(!menuOpen()); break;
      case 'menu-close': sideMenu(false); break;
    }
  };
  const onOver = (e: SyntheticEvent) => {
    const t = e.target as Element;
    const target = t.closest<HTMLElement>('[data-kit-tip]');
    if (target && tip?.target !== target) {
      clearTimeout(tipTimer);
      tipTimer = window.setTimeout(() => showTip(screen, target), +(target.getAttribute('data-kit-tip-after') ?? DEFAULTS.tooltipShow));
    }
    // an item of a Kendo menu opens its submenu after the menu's hover delay; the pointer inside an open submenu keeps it open
    const sub = t.closest('[data-kit-flyout]'), li = t.closest(`${MENU} > li`);
    if (sub) {
      clearTimeout(menuTimer.current);
      sub.querySelectorAll('li.k-hover').forEach((x) => x.classList.remove('k-hover', 'k-focus'));
      t.closest('li')?.classList.add('k-hover', 'k-focus');
    } else if (li && !li.classList.contains('k-hover')) {
      const ul = li.parentElement!;
      clearTimeout(menuTimer.current);
      menuTimer.current = window.setTimeout(() => showFly(ul, li), flyMs(ul, 'hover', 100));
    } else if (li) clearTimeout(menuTimer.current);
  };
  const onOut = (e: SyntheticEvent) => {
    const t = e.target as Element, to = (e.nativeEvent as MouseEvent).relatedTarget as Element | null;
    const target = t.closest('[data-kit-tip]');
    if (target && !(to && target.contains(to))) { clearTimeout(tipTimer); tipTimer = window.setTimeout(() => hideTip(false, screen), screen.calibration?.defaults?.tooltip?.hideAfter ?? DEFAULTS.tooltipHide); }
    // leaving a menu (its list or its open submenu) for somewhere outside both closes the submenu after the hover delay
    const scope = t.closest(`${MENU}, [data-kit-flyout]`);
    const host = scope && (scope.matches(MENU) ? hostOf(scope) : scope.parentElement);
    if (host && !(to && host.contains(to))) {
      clearTimeout(menuTimer.current);
      menuTimer.current = window.setTimeout(() => closeFlys(host), flyMs(host.querySelector(MENU) ?? host, 'hover', 100));
    }
  };
  const focusWrap = (e: SyntheticEvent, on: boolean) => { (e.target as Element).closest?.('.k-input, .k-picker, .k-textbox, .k-numerictextbox, .k-dropdownlist')?.classList.toggle('k-focus', on); };
  const onKey = (e: RKeyboardEvent) => {
    if (e.key !== 'Escape') return;
    const top = open.filter((x) => !x.closing).at(-1);
    if (top) { e.stopPropagation(); closeDialog(top.id); } // Escape does not close the side menu on the live portal
  };

  return (
    <KitContext.Provider value={ctx}>
      <div ref={root} data-kit-root="" style={{ display: 'contents' }} onClick={onClick} onMouseOver={onOver} onMouseOut={onOut}
        onFocus={(e) => focusWrap(e, true)} onBlur={(e) => focusWrap(e, false)} onKeyDown={onKey}>
        {children}
        {open.map((o, i) => <Window key={o.id} id={o.id} def={screen.dialogs[o.id]} Body={dialogs[o.id]} depth={i} closing={o.closing} onClosed={() => setOpen((x) => x.filter((y) => y.id !== o.id))} />)}
      </div>
    </KitContext.Provider>
  );
}
