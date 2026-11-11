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
import { Bus, KitContext, DEFAULTS, parseHtml, styleObject, useIsland, type Ctx, type DialogDef, type KitData, type Services } from './core';

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
const flyout = (li: Element) => li.querySelector<HTMLElement>(':scope > .k-menu-popup, :scope > .k-animation-container');
// a module's fly-out opens after Kendo's hover delay and slides out of the menu; it closes with the close animation
function showFlyout(menu: Element, li: Element) {
  for (const sib of li.parentElement?.children ?? []) if (sib !== li) { sib.classList.remove('k-hover'); const p = flyout(sib); if (p) hideFlyout(menu, p); }
  li.classList.add('k-hover');
  const pop = flyout(li);
  if (!pop || pop.style.display === 'block') return;
  (li as HTMLElement).style.position = 'relative';
  Object.assign(pop.style, { display: 'block', position: 'absolute', right: '100%', top: '0', zIndex: '10002' });
  pop.animate([{ transform: 'translateX(100%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], { duration: menuMs(menu, 'open-ms', DEFAULTS.menuMs), easing: 'ease-out' });
}
function hideFlyout(menu: Element, p: HTMLElement, now = false) {
  if (p.style.display !== 'block') return;
  const ms = now ? 0 : menuMs(menu, 'close-ms', 100);
  if (!ms) { p.style.display = 'none'; return; }
  p.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(100%)', opacity: 0 }], { duration: ms, easing: 'ease-in' }).finished.then(() => { p.style.display = 'none'; }, () => {});
}
function closeFlyouts(menu: Element, now = false) {
  menu.querySelectorAll('li.k-hover').forEach((li) => li.classList.remove('k-hover'));
  menu.querySelectorAll<HTMLElement>('.k-menu-popup, li > .k-animation-container').forEach((p) => hideFlyout(menu, p, now));
}

// ---------- a dialog: the portal's Kendo window chrome around the ported content ----------
function Window({ id, def, Body, depth, closing, onClosed }: { id: string; def: DialogDef; Body?: ComponentType; depth: number; closing: boolean; onClosed: () => void }) {
  const win = useRef<HTMLDivElement>(null), ov = useRef<HTMLDivElement>(null);
  const bar = useIsland(def.titlebarHtml || `<div class="k-window-titlebar"><span class="k-window-title">${def.title}</span></div>`);
  const anim = def.options?.animation as { open?: { duration?: number }; close?: { duration?: number } } | false | undefined;
  const openMs = anim === false ? 0 : anim?.open?.duration ?? DEFAULTS.windowMs, closeMs = anim === false ? 0 : anim?.close?.duration ?? DEFAULTS.windowMs;
  useLayoutEffect(() => { // Kendo centers a window when it opens, then zooms and fades it in
    const w = win.current!;
    w.style.left = `${Math.max(0, (innerWidth - w.offsetWidth) / 2 + scrollX)}px`;
    w.style.top = `${Math.max(0, (innerHeight - w.offsetHeight) / 2 + scrollY)}px`;
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

  // the side menu, as the page's own script does it: swap the classes the capture saw change on its root (the portal's
  // display-none / display-flex, which are !important, so an inline display can never show it) and append the backdrop
  // it adds to <body>. No fade: the live menu has none. Its close icon, a link in it, or the hamburger close it again.
  const backdrop = useRef<HTMLElement | null>(null);
  const sideMenu = (show: boolean) => {
    for (const el of root.current!.querySelectorAll<HTMLElement>('[data-kit-menu]')) {
      const [add, rm] = menuClasses(el);
      if (add.length || rm.length) { el.classList.remove(...(show ? rm : add)); el.classList.add(...(show ? add : rm)); el.style.removeProperty('display'); }
      else el.style.display = show ? el.getAttribute('data-kit-menu') || 'block' : 'none';
      if (!show) closeFlyouts(el, true);
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
      if (hit || a.closest('[data-kit-menu]')) sideMenu(false); // a menu item closes the menu, like the portal's .child-menu click
      if (hit) location.hash = `#${hit.path}`;
      return;
    }
    const kind = act.getAttribute('data-kit-action');
    e.preventDefault();
    e.stopPropagation();
    switch (kind) {
      case 'search': {
        const v = values(root.current);
        Promise.resolve(services?.search?.(v)).finally(() => {
          bus.emit('search', v);
          for (const id of screen.search?.reveals ?? []) root.current?.querySelectorAll<HTMLElement>(`[data-kit-h="${id}"]`).forEach(reveal);
        });
        break;
      }
      case 'reset': resetFields(scope); bus.emit('reset'); break;
      case 'create': {
        if (dlg) { // a Create New inside a dialog opens that dialog's own child
          const i = [...document.querySelectorAll(`[data-kit-dialog-content="${dlg}"] [data-kit-action=create]`)].indexOf(act);
          const child = screen.dialogs[dlg]?.children?.[i];
          if (child) openDialog(child);
        } else {
          const i = [...root.current!.querySelectorAll('[data-kit-action=create]')].filter(shown).indexOf(act);
          const id = Object.entries(screen.dialogs ?? {}).find(([, d]) => !d.parent && d.openerIndex === i)?.[0];
          if (id) openDialog(id);
        }
        break;
      }
      case 'save': if (dlg && validate(scope)) Promise.resolve(services?.save?.(dlg, values(scope))).finally(() => closeDialog(dlg)); break;
      case 'cancel': case 'close': if (dlg) closeDialog(dlg); break;
      case 'collapse': {
        const body = (act.closest('[class*=hdr], [class*=header], [class*=heading]') ?? act.parentElement)?.nextElementSibling as HTMLElement | null;
        if (!body?.matches('[data-kit-collapse]')) break;
        const opening = !shown(body);
        const icon = act.matches('[class*=chevron]') ? act : act.querySelector('[class*=chevron]');
        if (icon) for (const c of [...icon.classList]) if (/chevron-(up|down)$/.test(c)) icon.classList.replace(c, c.replace(/(up|down)$/, (m) => (m === 'up' ? 'down' : 'up')));
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
    const li = t.closest('[data-kit-menu] li');
    if (li && !li.classList.contains('k-hover')) { // a module of the side menu flies out to the left, after Kendo's hover delay
      const menu = li.closest('[data-kit-menu]')!;
      clearTimeout(menuTimer.current);
      menuTimer.current = window.setTimeout(() => showFlyout(menu, li), menuMs(menu, 'hover', 100));
    } else if (li) clearTimeout(menuTimer.current);
  };
  const onOut = (e: SyntheticEvent) => {
    const t = e.target as Element, to = (e.nativeEvent as MouseEvent).relatedTarget as Element | null;
    const target = t.closest('[data-kit-tip]');
    if (target && !(to && target.contains(to))) { clearTimeout(tipTimer); tipTimer = window.setTimeout(() => hideTip(false, screen), screen.calibration?.defaults?.tooltip?.hideAfter ?? DEFAULTS.tooltipHide); }
    const menu = t.closest('[data-kit-menu]');
    if (menu && !(to && menu.contains(to))) {
      clearTimeout(menuTimer.current);
      menuTimer.current = window.setTimeout(() => closeFlyouts(menu), menuMs(menu, 'hover', 100));
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
