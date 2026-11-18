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
import { Bus, KitContext, DEFAULTS, esc, parseHtml, routeFor, styleObject, useIsland, type Conditional, type Confirm, type Create, type Ctx, type DialogDef, type Flow, type KitData, type PageLock, type Responsive, type Services, type Validation } from './core';

type Open = { id: string; closing: boolean };
const shown = (el: Element) => el.getClientRects().length > 0;

// The field the portal focuses when a page or a window opens: the one the capture saw focused (data-kit-autofocus), else the first
// field a person can type in (the portal's pages open on their first field, whichever the module).
const FIELD = 'input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly]), .k-dropdownlist[tabindex]';
function focusFirst(root: ParentNode) {
  const af = root.querySelector<HTMLElement>('[data-kit-autofocus]');
  const el = af ? (af.matches('input, select, textarea, [tabindex]') ? af : af.querySelector<HTMLElement>('input:not([type=hidden]), [tabindex]')) : null;
  (el && shown(el) ? el : [...root.querySelectorAll<HTMLElement>(FIELD)].find(shown))?.focus({ preventScroll: true });
}

// A modal window locks the page behind it (the portal's windows are opened with preventScroll, and its own script sets html overflow hidden): no page scrollbar,
// only the window's content scrolls. What the capture saw the page do (pageLock) is replayed; a capture without it falls back on the window's own option.
const lock = { n: 0, html: '', body: '', scroll: null as string | null };
function lockPage(def: DialogDef): () => void {
  const m = def.options?.modal as { preventScroll?: boolean } | boolean | undefined;
  const pl: PageLock | null = def.pageLock ?? (m && typeof m === 'object' && m.preventScroll ? { htmlOverflow: 'hidden', bodyOverflow: null, bodyAdd: [], bodyScroll: null } : null);
  if (!pl) return () => {};
  const h = document.documentElement, b = document.body, added = pl.bodyAdd.filter((c) => !b.classList.contains(c));
  if (lock.n++ === 0) Object.assign(lock, { html: h.style.overflow, body: b.style.overflow, scroll: b.getAttribute('scroll') });
  if (pl.htmlOverflow) h.style.overflow = pl.htmlOverflow;
  if (pl.bodyOverflow) b.style.overflow = pl.bodyOverflow;
  if (pl.bodyScroll) b.setAttribute('scroll', pl.bodyScroll);
  b.classList.add(...added);
  return () => {
    b.classList.remove(...added);
    if (--lock.n > 0) return;
    h.style.overflow = lock.html;
    b.style.overflow = lock.body;
    if (lock.scroll === null) b.removeAttribute('scroll'); else b.setAttribute('scroll', lock.scroll);
  };
}

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
  root.querySelectorAll<HTMLElement>('[data-kit-banner]').forEach((e) => { e.style.display = 'none'; e.removeAttribute('data-kit-banner'); });
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
// one field's message, as the portal puts it: into the field's own slot (data-valmsg-for), else right after the widget, and the widget marked invalid
function showMessage(root: Element, name: string, msg: string) {
  const input = root.querySelector(`[name="${CSS.escape(name)}"]`);
  const wrap = input?.closest('.k-input, .k-picker, .k-dropdownlist, .k-numerictextbox') ?? input;
  wrap?.classList.add('k-invalid');
  const slot = root.querySelector(`[data-valmsg-for="${CSS.escape(name)}"]`);
  if (slot) { slot.classList.remove('field-validation-valid'); slot.classList.add('field-validation-error'); slot.textContent = msg; }
  else if (wrap && !wrap.nextElementSibling?.hasAttribute('data-kit-err')) wrap.insertAdjacentHTML('afterend', `<span class="k-form-error k-invalid-msg field-validation-error" data-kit-err="">${msg.replace(/[<>&]/g, '')}</span>`);
}
// the summary banner a failed Search / Save shows (the live markup: icon, message, its X), found by the id the capture gave it, else the first one in the scope
function showBanner(root: Element, v: Validation | null | undefined) {
  for (const b of v?.summaries ?? []) {
    if (b.at) { // a banner the live page's script built on the spot into its panel's status box (not in the markup at rest)
      const box = root.querySelector<HTMLElement>(b.at) ?? (root.matches(b.at) ? root as HTMLElement : null);
      if (!box) continue;
      box.querySelectorAll('[data-kit-err]').forEach((e) => e.remove());
      box.insertAdjacentHTML('beforeend', `<div class="${esc(b.className)}" data-kit-err="">${b.html}</div>`);
      continue;
    }
    const el = (b.h ? root.querySelector<HTMLElement>(`[data-kit-h="${b.h}"]`) : null) ?? root.querySelector<HTMLElement>('.validation-summary, .editor-validation-summary, .validation-summary-errors');
    if (!el) continue;
    el.innerHTML = b.html;
    if (b.className) el.className = b.className;
    reveal(el);
    el.setAttribute('data-kit-banner', '');
  }
}
// MVC unobtrusive validation (data-val-*), the rules the portal's forms use; the messages are the server's own
function validate(root: Element | null, banner?: Validation | null) {
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
    showMessage(root, i.name, msg);
  }
  if (!ok) showBanner(root, banner);
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
type Fly = { li: Element; box: HTMLElement; undo?: () => void };
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
  const ms = now ? 0 : flyMs(ul, 'close-ms', 100), done = () => { f.undo?.(); f.box.remove(); };
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
function showFly(ul: Element, li: Element, speed: number) {
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
  clone.style.overflow = 'visible'; // what Kendo sets inline on a popup it opens: the stylesheet's overflow:auto would give the submenu a native scrollbar
  child.append(clone);
  box.append(child);
  Object.assign(box.style, { display: 'block', position: 'absolute', zIndex: '10002', visibility: 'hidden' });
  host.append(box);
  const undoFit = fitFly(clone, box, speed);
  const w = clone.offsetWidth, h = clone.offsetHeight;
  Object.assign(child.style, { display: 'block', width: `${w}px`, height: `${h}px` });
  const hr = host.getBoundingClientRect(), lr = li.getBoundingClientRect();
  if (isHorizontal(ul)) Object.assign(box.style, { top: `${lr.bottom - hr.top}px`, left: `${lr.left - hr.left}px` });
  else Object.assign(box.style, { top: `${Math.max(0, Math.min(lr.top, (document.documentElement.clientHeight || innerHeight) - h)) - hr.top}px`, left: `${-w}px` }); // Kendo keeps a submenu inside the window
  box.style.removeProperty('visibility');
  flys.set(ul, { li, box, undo: undoFit });
  child.animate([{ transform: slideFrom(ul) }, { transform: 'translate(0, 0)' }], { duration: flyMs(ul, 'open-ms', DEFAULTS.menuMs), easing: 'ease-out' })
    .finished.then(() => box.classList.add('k-animation-container-shown'), () => {});
}
const closeFlys = (root: ParentNode, now = false) => root.querySelectorAll(MENU).forEach((ul) => hideFly(ul, now));
// A scrollable Kendo menu (the side menu's module list, a submenu taller than its room, the module tab's popup): arrow buttons at both ends, a list that
// scrolls while the pointer rests on a button (at Kendo's own speed: `speed`, px per second), with the wheel too; the end it has reached is k-disabled.
// `auto`: the live page hides the buttons while everything fits. 'both': both show while the list overflows (a submenu); 'lazy': the lower one shows while it
// overflows, the upper one once it has scrolled (the side menu's list). Returns what undoes it.
const ARROW = { prev: 'm256 160 128 192H128z', next: 'm256 352 128-192H128z' };
function arrowButton(dir: 'prev' | 'next') {
  const b = document.createElement('span');
  b.className = `k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-${dir} k-disabled`;
  b.setAttribute('unselectable', 'on');
  b.style.width = '100%';
  b.innerHTML = `<span class="k-icon k-svg-icon k-svg-i-caret-alt-${dir === 'prev' ? 'up' : 'down'} k-button-icon"><svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="${ARROW[dir]}"/></svg></span>`;
  return b;
}
function scrollable(ul: HTMLElement, prev: HTMLElement | null, next: HTMLElement | null, speed: number, auto: false | 'both' | 'lazy') {
  const ac = new AbortController(), on = { signal: ac.signal };
  const over = () => ul.scrollHeight > ul.clientHeight + 1;
  let scrolled = false;
  const sync = () => {
    // Kendo: the lower arrow shows while the list can scroll; the upper one appears once it has scrolled, and stays (disabled, gray) when it is back at the top
    if (auto) {
      scrolled ||= ul.scrollTop > 0;
      for (const [b, on] of [[prev, auto === 'both' ? over() : scrolled], [next, over()]] as const) if (b) { if (on) b.style.removeProperty('display'); else b.style.display = 'none'; }
    }
    prev?.classList.toggle('k-disabled', ul.scrollTop <= 0);
    next?.classList.toggle('k-disabled', ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 1);
  };
  let raf = 0, dir = 0, last = 0;
  const tick = (t: number) => { if (!dir) return; ul.scrollTop += (dir * speed * (t - last)) / 1000; last = t; sync(); raf = requestAnimationFrame(tick); };
  const go = (d: number) => { dir = d; cancelAnimationFrame(raf); last = performance.now(); if (d) raf = requestAnimationFrame(tick); };
  for (const [b, d] of [[prev, -1], [next, 1]] as const) { b?.addEventListener('mouseenter', () => go(d), on); b?.addEventListener('mouseleave', () => go(0), on); }
  ul.addEventListener('wheel', (e) => { if (!over()) return; e.preventDefault(); e.stopPropagation(); ul.scrollTop += e.deltaY; sync(); }, { ...on, passive: false });
  ul.addEventListener('scroll', sync, on);
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null;
  ro?.observe(ul);
  sync();
  return () => { ac.abort(); ro?.disconnect(); cancelAnimationFrame(raf); };
}
// A popup's size and its scroll parts. Kendo gives the list an explicit height (frozen into the snapshot at the capture's window size, so it is dropped here), the
// popup is at least as high as the portal's CSS says (the module tab's: 30vh) and at most its max-height; the buttons the live markup had stay as they were.
function fitFly(clone: HTMLElement, box: HTMLElement, speed: number) {
  const ul = clone.querySelector<HTMLElement>('ul');
  if (!ul) return () => {};
  const wrap = clone.querySelector<HTMLElement>(':scope > .k-menu-scroll-wrapper');
  const inner = wrap ?? clone;
  ul.style.removeProperty('height');
  const cap = parseFloat(getComputedStyle(clone).maxHeight), min = parseFloat(getComputedStyle(box).minHeight) || 0;
  let prev = inner.querySelector<HTMLElement>(':scope > .k-menu-scroll-button-prev'), next = inner.querySelector<HTMLElement>(':scope > .k-menu-scroll-button-next');
  const had = !!(prev || next);
  const natural = clone.offsetHeight;
  const h = Math.min(Math.max(natural, min), isNaN(cap) ? Infinity : cap);
  if (!had && ul.scrollHeight <= h + 1) return () => {}; // fits: Kendo shows no buttons
  Object.assign(clone.style, { display: 'flex', flexDirection: 'column', overflow: 'visible', height: `${h}px` }); // visible: the upper arrow sits above the popup, as Kendo's does
  if (wrap) Object.assign(wrap.style, { display: 'flex', flexDirection: 'column', flex: '1 1 auto', minHeight: '0' });
  Object.assign(ul.style, { overflow: 'hidden', flex: '1 1 auto', minHeight: '0' });
  if (!had) { // what Kendo builds around a list that scrolls: a scroll wrapper with the two arrows (the portal's CSS styles its items through it)
    const w = document.createElement('div');
    w.className = 'k-menu-scroll-wrapper k-menu-scroll-wrapper-vertical';
    Object.assign(w.style, { flex: '1 1 auto', minHeight: '0' });
    prev = arrowButton('prev'); next = arrowButton('next');
    ul.replaceWith(w);
    w.append(prev, ul, next);
  }
  for (const b of [prev, next]) if (b) b.style.flex = '0 0 auto';
  return scrollable(ul, prev, next, speed, had ? false : 'both');
}

// ---------- a dialog: the portal's Kendo window chrome around the ported content ----------
// Where a window goes. Above the portal's small-screen width: Kendo's center(). Below it: the portal's own phone branch (measured on the live page at the
// capture's viewport profiles: left / top, at least minWidthPct of the width). Both: at most a share of the window's height, with the content scrolling inside.
// a collapse control's panel body: the panel container's own (the portal's .content-subpanel-container > .content-subpanel-bdy, whose header tools hold
// the icon one level down), else the element that follows the header
function collapseBody(act: Element): HTMLElement | null {
  const box = act.closest<HTMLElement>('[class*=panel-container]');
  const body = (box?.querySelector(':scope > [data-kit-collapse]') ?? (act.closest('[class*=hdr], [class*=header], [class*=heading]') ?? act.parentElement)?.nextElementSibling) as HTMLElement | null;
  return body?.matches('[data-kit-collapse]') ? body : null;
}
function placeWindow(w: HTMLElement, content: HTMLElement | null, r: Responsive | null | undefined) {
  const vw = document.documentElement.clientWidth || innerWidth, vh = document.documentElement.clientHeight || innerHeight; // Kendo/jQuery measure the layout viewport, not innerWidth
  const small = !!r?.query && !!r.dialog && matchMedia(r.query).matches;
  if (!('kitMin' in w.dataset)) w.dataset.kitMin = w.style.minWidth;
  const pct = small ? r!.dialog!.maxHeightPct : r?.desktop?.maxHeightPct;
  if (pct) {
    const max = (vh * pct) / 100;
    w.style.maxHeight = `${max}px`;
    if (content) content.style.maxHeight = `${Math.max(0, max - (w.querySelector<HTMLElement>('.k-window-titlebar')?.offsetHeight ?? 0))}px`;
  }
  if (small) {
    const d = r!.dialog!;
    w.style.minWidth = d.minWidthPct ? `${(vw * d.minWidthPct) / 100}px` : w.dataset.kitMin!;
    w.style.left = `${d.left + scrollX}px`; // measured in the viewport: the live window is at the same place on screen however far the page was scrolled
    w.style.top = `${d.top + scrollY}px`;
    return;
  }
  w.style.minWidth = w.dataset.kitMin!;
  w.style.left = `${Math.max(0, (vw - w.offsetWidth) / 2 + scrollX)}px`;
  w.style.top = `${Math.max(0, (vh - w.offsetHeight) / 2 + scrollY)}px`;
}
function Window({ id, def, Body, depth, closing, onClosed, responsive, plain = false }: { id: string; def: DialogDef; Body?: ComponentType; depth: number; closing: boolean; onClosed: () => void; responsive?: Responsive; plain?: boolean }) {
  const win = useRef<HTMLDivElement>(null), ov = useRef<HTMLDivElement>(null);
  const bar = useIsland(def.titlebarHtml || `<div class="k-window-titlebar"><span class="k-window-title">${def.title}</span></div>`);
  const anim = def.options?.animation as { open?: { duration?: number }; close?: { duration?: number } } | false | undefined;
  const openMs = anim === false ? 0 : anim?.open?.duration ?? DEFAULTS.windowMs, closeMs = anim === false ? 0 : anim?.close?.duration ?? DEFAULTS.windowMs;
  useLayoutEffect(() => { // Kendo centers a window when it opens (below the small-screen width the portal places it itself), then zooms and fades it in
    const w = win.current!, content = w.querySelector<HTMLElement>('[data-kit-dialog-content]');
    const unlock = plain ? () => {} : lockPage(def); // before placing: without the page's scrollbar the window's room is wider
    const placeIt = () => placeWindow(w, content, plain ? null : responsive);
    placeIt();
    // the portal focuses a field of the window once it is open; a k-focus frozen into the markup belongs to the capture, not to this window
    content?.querySelectorAll('.k-focus').forEach((e) => e.classList.remove('k-focus'));
    const fid = plain ? 0 : requestAnimationFrame(() => { if (content) focusFirst(content); });
    if (openMs) { w.animate([{ opacity: 0, transform: 'scale(0.01)' }, { opacity: 1, transform: 'scale(1)' }], { duration: openMs, easing: 'ease-out' }); ov.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: openMs }); }
    // the portal re-centers a window when its content changes size (a part shown, a message appearing) and when the browser window is resized
    const ro = content && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(placeIt) : null;
    ro?.observe(content!);
    addEventListener('resize', placeIt);
    return () => { cancelAnimationFrame(fid); unlock(); ro?.disconnect(); removeEventListener('resize', placeIt); };
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

// the "form data has changed" window: the live one's chrome and markup (its buttons carry data-kit-confirm = stay | leave), on top of the dialog
function ConfirmWindow({ c, depth }: { c: Confirm; depth: number }) {
  const def = { title: c.title, windowClass: c.windowClass, windowStyle: c.windowStyle, titlebarHtml: c.titlebarHtml, contentClass: c.contentClass, contentId: null, contentStyle: c.contentStyle,
    overlay: c.overlay, options: c.options, widgets: {}, opener: '', children: [] } as DialogDef;
  // its buttons carry the answer the live one measured (pressed: stays or closes), whatever their words
  const Body = useMemo(() => () => <div ref={(el) => el?.querySelectorAll('button, input[type=button], .k-button').forEach((b) => {
    const t = ((b as HTMLInputElement).value || b.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    const a = c.buttons.find((x) => x.answer && x.text.replace(/\s+/g, ' ').trim().toLowerCase() === t)?.answer;
    if (a) b.setAttribute('data-kit-confirm', a);
  })} dangerouslySetInnerHTML={{ __html: c.contentHtml }} />, [c]);
  return <Window id="confirm" def={def} Body={Body} depth={depth + 1} closing={false} onClosed={() => {}} plain />;
}

export function KitScreen({ screen, dialogs = {}, services, shell = false, children }: { screen: KitData; dialogs?: Record<string, ComponentType>; services?: Services; shell?: boolean; children?: ReactNode }) {
  const bus = useMemo(() => new Bus(), []);
  const [open, setOpen] = useState<Open[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const defs = useMemo(() => Object.assign({}, screen.widgets, ...Object.values(screen.dialogs ?? {}).map((d) => d.widgets)), [screen]);
  const openDialog = useCallback((id: string) => { if (screen.dialogs?.[id]) setOpen((o) => (o.some((x) => x.id === id) ? o : [...o, { id, closing: false }])); }, [screen]);
  const closeDialog = useCallback((id: string) => setOpen((o) => o.map((x) => (x.id === id ? { ...x, closing: true } : x))), []);
  // a dialog and, when its live X / Cancel closed more than its own window (an Edit opened from a View closes both), the ones under it
  const closeN = (id: string, n?: number) => setOpen((o) => { const i = o.findIndex((x) => x.id === id); return i < 0 ? o : o.map((x, k) => (k <= i && k > i - Math.max(1, n ?? 1) ? { ...x, closing: true } : x)); });
  const ctx: Ctx = useMemo(() => ({ data: screen, defs, bus, openDialog }), [screen, defs, bus, openDialog]);
  const menuTimer = useRef(0);
  const initial = useRef<Record<string, string>>({}); // the form as it loaded: a Search with nothing changed is the one the live capture clicked
  const [confirm, setConfirm] = useState<{ dlg: string; via: 'x' | 'cancel' } | null>(null);
  // Close / Cancel / Escape of a dialog: with an edit in it, and the live dialog asked "form data has changed", the same window asks here
  const requestClose = (id: string, via: 'x' | 'cancel') => {
    const d = screen.dialogs[id], box = document.querySelector(`[data-kit-dialog-content="${id}"]`), dirty = box?.hasAttribute('data-kit-dirty');
    if (via === 'x' && box && putBack(box, null)) return; // the X of a part shown in the window only puts the part away (live)
    if (dirty && d?.close?.[via]?.asks && d.close.confirm) setConfirm({ dlg: id, via });
    else closeN(id, d?.close?.[via]?.closes);
  };
  // a part the flows stage saw shown inside a window, whose live X (t null) or Close / Cancel (t: the button) only put it away again (a destination
  // shown inside a View): undone, and the window stays
  const undoFlow = (box: ParentNode, f: Flow) => {
    for (const s of f.show ?? []) box.querySelectorAll<HTMLElement>(s).forEach((x) => { x.style.display = 'none'; x.removeAttribute('data-kit-flowpart'); });
    for (const s of f.hide ?? []) box.querySelectorAll<HTMLElement>(s).forEach(reveal);
    for (const [s, on] of Object.entries(f.deep ?? {})) box.querySelectorAll<HTMLElement>(s).forEach((x) => { if (on) x.style.display = 'none'; else reveal(x); });
  };
  const putBack = (box: Element, t: Element | null) => {
    for (const el of box.querySelectorAll<HTMLElement>('[data-kit-flowpart]')) {
      if (!shown(el)) continue;
      const f = screen.flows?.find((x) => x.node === el.getAttribute('data-kit-flowpart'));
      const hit = f?.back?.some((b) => (b === 'x' ? !t : !!t && (() => { try { return [...box.querySelectorAll(b)].some((x) => x.contains(t)); } catch { return false; } })()));
      if (!f || !hit) continue;
      undoFlow(box, f);
      return true;
    }
    return false;
  };
  // the radios / checkboxes of a window that just opened: the parts that go with the value it opened with (the Edit of a record opens on its own
  // Run Weekly, whatever the markup showed when it was frozen)
  const condDone = useRef(new Set<string>());
  useLayoutEffect(() => {
    for (const o of open) {
      const box = document.querySelector(`[data-kit-dialog-content="${o.id}"]`), list = screen.dialogs[o.id]?.conditionals;
      if (o.closing || condDone.current.has(o.id) || !box) continue;
      condDone.current.add(o.id);
      for (const c of list ?? []) {
        if (c.kind === 'dropdown') continue; // a dropdown's value is the widget's: it emits "change" itself
        const el = c.kind === 'radio' ? box.querySelector<HTMLInputElement>(`input[type=radio][name="${CSS.escape(c.name)}"]:checked`)
          : box.querySelector<HTMLInputElement>(`input[type=checkbox][name="${CSS.escape(c.name)}"], input[type=checkbox]#${CSS.escape(c.name)}`);
        if (el) applyCond(list, box, c.kind, c.name, c.kind === 'radio' ? el.value : String(el.checked));
      }
    }
    for (const id of [...condDone.current]) if (!open.some((o) => o.id === id)) condDone.current.delete(id);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  // a click that made the live page answer with messages only (Add Another with nothing filled): its form validated here, with the live banner
  const flowValidation = (t: Element) => {
    if (shell) return null;
    for (const v of screen.validations ?? []) {
      const box = v.from ? document.querySelector(`[data-kit-dialog-content="${v.from}"]`) : root.current;
      let el: Element | undefined;
      try { el = box ? [...box.querySelectorAll(v.css)].filter(shown)[v.nth] : undefined; } catch { continue; }
      if (el?.contains(t)) return { v, box: box! };
    }
    return null;
  };
  const markDirty = (e: SyntheticEvent) => { // a person's edit (not a script's) in a dialog makes it "changed"
    if (!(e.nativeEvent as Event).isTrusted) return;
    (e.target as Element).closest('[data-kit-dialog-content]')?.setAttribute('data-kit-dirty', '');
  };
  // radios / checkboxes / dropdown values that show or hide parts: the live page's own state per value, replayed
  const applyCond = (list: Conditional[] | undefined, scope: ParentNode | null, kind: Conditional['kind'], name: string, key: string) => {
    for (const c of scope ? list ?? [] : []) {
      const st = c.kind === kind && c.name === name ? c.values[key] : null;
      if (!st) continue;
      for (const [sel, on] of Object.entries(st)) {
        try { scope!.querySelectorAll<HTMLElement>(sel).forEach((el) => { if (on) reveal(el); else el.style.display = 'none'; }); } catch { /* a selector the rebuild cannot resolve */ }
      }
    }
  };
  useLayoutEffect(() => bus.on('change', (d: { name: string | null; value: unknown }) => {
    if (!d?.name) return;
    applyCond(screen.conditionals, root.current, 'dropdown', d.name, String(d.value ?? ''));
    document.querySelectorAll('[data-kit-dialog-content]').forEach((el) => applyCond(screen.dialogs[el.getAttribute('data-kit-dialog-content')!]?.conditionals, el, 'dropdown', d.name!, String(d.value ?? '')));
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    const r = root.current!;
    // a k-focus frozen into the capture belongs to the live page's focus: the rebuild focuses the same field itself
    r.querySelectorAll('.k-focus').forEach((e) => e.classList.remove('k-focus'));
    initial.current = values(r);
    r.querySelectorAll('[data-kit-tip][title]').forEach((e) => { if (!e.hasAttribute('aria-label')) e.setAttribute('aria-label', e.getAttribute('title')!); e.removeAttribute('title'); });
    if (!shell) focusFirst(r); // the portal's pages open on their first field (the shared shell has none of its own)
    // the side menu's module list is a scrollable Kendo menu: its buttons show only while it overflows (a small window), and scroll it while hovered
    const speed = screen.menuScroll ?? DEFAULTS.menuScroll;
    const stops = [...r.querySelectorAll<HTMLElement>('.k-menu-scroll-wrapper-vertical > ul[data-role=menu]')].map((ul) =>
      scrollable(ul, ul.parentElement!.querySelector<HTMLElement>(':scope > .k-menu-scroll-button-prev'), ul.parentElement!.querySelector<HTMLElement>(':scope > .k-menu-scroll-button-next'), speed, 'lazy'));
    if (!shell) return () => stops.forEach((f) => f());
    // the header slides away on scroll down and back on scroll up (headroom.js: the portal's CSS owns the classes). Past which scroll position and how
    // small a scroll up are measured on the live page (screen.headroom); a capture without them keeps the header's height and 5 px
    const head = document.querySelector<HTMLElement>('#pageHeader.headroom, .headroom');
    const hr = screen.headroom;
    let last = scrollY;
    const onScroll = () => {
      if (!head) return;
      const y = scrollY, top = hr ? hr.offset : 0, tolerance = hr ? hr.tolerance : 4;
      head.classList.toggle('headroom--top', y <= top);
      head.classList.toggle('headroom--not-top', y > top);
      if (Math.abs(y - last) <= tolerance) return;
      const down = y > last && (hr ? y >= hr.offset : y > head.offsetHeight);
      head.classList.toggle('headroom--unpinned', down);
      head.classList.toggle('headroom--pinned', !down);
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => { stops.forEach((f) => f()); removeEventListener('scroll', onScroll); };
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
  // while it is open the live page shows no sideways scrollbar (measured: data-kit-menu-hscroll="0"; a capture from before that measurement: the same,
  // only a measured "1" keeps it). Only on the page: the menu itself must not clip, its modules fly out beside it.
  // ponytail: overflow-x hidden on the page, not the element that overflows; find that one if a module needs it
  const menuX = useRef<{ html: string } | null>(null);
  const sideMenu = (show: boolean) => {
    for (const el of root.current!.querySelectorAll<HTMLElement>('[data-kit-menu]')) {
      const [add, rm] = menuClasses(el);
      if (add.length || rm.length) { el.classList.remove(...(show ? rm : add)); el.classList.add(...(show ? add : rm)); el.style.removeProperty('display'); }
      else el.style.display = show ? el.getAttribute('data-kit-menu') || 'block' : 'none';
      if (show && el.getAttribute('data-kit-menu-hscroll') !== '1' && !menuX.current) {
        menuX.current = { html: document.documentElement.style.overflowX };
        document.documentElement.style.overflowX = 'hidden';
      } else if (!show && menuX.current) {
        document.documentElement.style.overflowX = menuX.current.html;
        menuX.current = null;
      }
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

  // a click the flows stage saw open a window or show / hide parts on the live page (kit.json "flows"), that no other handler replays. The shell's
  // own KitScreen never does: its kit.json is one screen's, and those selectors mean nothing on another route
  const runFlow = (t: Element, via: Flow['via']) => {
    if (shell) return false;
    for (const f of screen.flows ?? []) {
      if (f.via !== via) continue;
      const box = f.from ? document.querySelector(`[data-kit-dialog-content="${f.from}"]`) : root.current;
      if (!box) continue;
      let el: Element | undefined;
      try { el = [...box.querySelectorAll(f.css)].filter(shown)[f.nth]; } catch { continue; }
      if (!el || !el.contains(t)) continue;
      if (f.opens) openDialog(f.opens);
      for (const s of f.show ?? []) box.querySelectorAll<HTMLElement>(s).forEach((x) => { reveal(x); x.setAttribute('data-kit-flowpart', f.node); });
      for (const s of f.hide ?? []) box.querySelectorAll<HTMLElement>(s).forEach((x) => { x.style.display = 'none'; });
      // what the click turned on and off inside (a field the part shows, a button it hides): by their own display, at any depth
      for (const [s, on] of Object.entries(f.deep ?? {})) { try { box.querySelectorAll<HTMLElement>(s).forEach((x) => { if (on) reveal(x); else x.style.display = 'none'; }); } catch { /* a selector the rebuild cannot resolve */ } }
      // a radio / checkbox / select keeps its own click (its checked state is the form's: preventing it would undo the check)
      return !t.closest('input, select, option, label');
    }
    return false;
  };
  const onDouble = (e: SyntheticEvent) => { if (runFlow(e.target as Element, 'dblclick')) { e.preventDefault(); e.stopPropagation(); } };

  const onChangeEvt = (e: SyntheticEvent) => {
    markDirty(e);
    const t = e.target as HTMLInputElement;
    const kind = t.type === 'radio' ? 'radio' : t.type === 'checkbox' ? 'checkbox' : null;
    const name = t.type === 'radio' ? t.name : t.name || t.id;
    if (!kind || !name) return;
    const key = kind === 'radio' ? t.value : String(t.checked), dlgEl = t.closest('[data-kit-dialog-content]');
    if (dlgEl) applyCond(screen.dialogs[dlgEl.getAttribute('data-kit-dialog-content')!]?.conditionals, dlgEl, kind, name, key);
    else applyCond(screen.conditionals, root.current, kind, name, key);
  };
  const onClick = (e: SyntheticEvent) => {
    const t = e.target as Element;
    // the "form data has changed" window: the answer that stays closes it, the one that leaves closes it and the dialog
    const ans = t.closest('[data-kit-confirm]');
    if (ans && confirm) {
      e.preventDefault(); e.stopPropagation();
      const c = confirm, cv = screen.dialogs[c.dlg]?.close?.[c.via];
      setConfirm(null);
      if (ans.getAttribute('data-kit-confirm') === 'leave') closeN(c.dlg, cv?.leaveCloses ?? cv?.closes);
      return;
    }
    // a validation banner's X (the one in the markup, or one built on the spot like the live script's)
    const x = t.closest('[data-hide=alert]');
    if (x) { e.preventDefault(); x.closest<HTMLElement>('.validation-summary, .editor-validation-summary, .validation-summary-errors, .k-messagebox')?.style.setProperty('display', 'none'); return; }
    const mx = t.closest('.msg-inline-close')?.closest('[data-kit-err]');
    if (mx) { e.preventDefault(); mx.remove(); return; }
    // a click the live page answered with messages only: validate its form; with nothing wrong the click goes on as it would
    const fv = flowValidation(t);
    if (fv && !validate(t.closest('form') ?? fv.box, fv.v.validation)) { e.preventDefault(); e.stopPropagation(); return; }
    // a dialog being edited marks itself on a click on a list item / calendar day (a widget's pick is not an input event)
    if (t.closest('.k-list-item, .k-calendar-td .k-link, .k-list-optionlabel')) t.closest('[data-kit-dialog-content]')?.setAttribute('data-kit-dirty', '');
    const act = t.closest('[data-kit-action]');
    const dlg = t.closest('[data-kit-dialog-content]')?.getAttribute('data-kit-dialog-content') ?? t.closest('[data-kit-dialog]')?.getAttribute('data-kit-dialog') ?? null;
    const scope = dlg ? document.querySelector(`[data-kit-dialog-content="${dlg}"]`) : root.current;
    // the button the live window closed on, whatever its words ("Close", "Return to list"): it closes here too, asking first where the live one asked
    const cv = dlg ? screen.dialogs[dlg]?.close?.cancel : null;
    if (cv?.css && scope && !t.closest('[data-kit-part]') && (() => { try { return !![...scope.querySelectorAll(cv.css!)].filter(shown)[cv.nth ?? 0]?.contains(t); } catch { return false; } })()) {
      e.preventDefault(); e.stopPropagation();
      if (!putBack(scope, t)) requestClose(dlg!, 'cancel');
      return;
    }
    if (!act && runFlow(t, 'click')) { e.preventDefault(); e.stopPropagation(); return; }
    if (!act) {
      const a = t.closest('a[href]');
      if (!a || t.closest('[data-kit]')) return;
      e.preventDefault(); // the portal's own links: a rebuilt screen goes to its route, everything else stays put
      e.stopPropagation();
      const hit = routeFor(a.getAttribute('href'));
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
        // the live Search with nothing changed answered with a validation banner (and field messages), not a grid: show that, and no results
        const untouched = JSON.stringify(v) === JSON.stringify(initial.current), val = screen.search?.validation;
        Promise.resolve(services?.search?.(v)).finally(() => {
          if (screen.search?.outcome === 'validation' && val && untouched && root.current) {
            clearErrors(root.current);
            showBanner(root.current, val);
            for (const f of val.fields) if (f.for) showMessage(root.current, f.for, f.text);
            return;
          }
          if (screen.search?.outcome === 'validation' && root.current) { // with something typed the live Search lists results: its panel was never seen, so show the one around the grid
            clearErrors(root.current);
            root.current.querySelectorAll('.k-grid[data-kit]').forEach((g) => { for (let h = g.closest<HTMLElement>('[data-kit-h]'); h; h = h.parentElement?.closest<HTMLElement>('[data-kit-h]') ?? null) reveal(h); });
          }
          bus.emit('search', v);
          for (const id of screen.search?.reveals ?? []) { if (screen.search?.outcome === 'validation') break; root.current?.querySelectorAll<HTMLElement>(`[data-kit-h="${id}"]`).forEach(reveal); }
          // the panels the live page folded away by itself once the results showed: closed with their own control (its icon swap and slide)
          if (screen.search?.outcome !== 'validation' && screen.search?.collapses?.length && root.current) {
            const r = root.current, bodies = [...r.querySelectorAll<HTMLElement>('[data-kit-collapse]')].filter((b) => !b.closest('.k-window'));
            for (const i of screen.search.collapses) {
              const b = bodies[i];
              if (b && shown(b)) [...r.querySelectorAll<HTMLElement>('[data-kit-action=collapse]')].find((a) => collapseBody(a) === b)?.click();
            }
          }
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
          else { // a Create New that leaves the page on the live portal (an Add page of its own): go to that screen when the pack rebuilt it
            const ln = screen.links?.find((l) => l.kind === 'create' && (!l.id || l.id === act.id)), hit = ln && routeFor(ln.url);
            if (hit) location.hash = `#${hit.path}`;
          }
        }
        break;
      }
      case 'save':
        if (part) { if (validate(part)) Promise.resolve(services?.save?.(dlg ?? 'page', values(part))).finally(putAway); }
        else if (dlg && validate(scope, screen.dialogs[dlg]?.saveValidation)) Promise.resolve(services?.save?.(dlg, values(scope))).finally(() => closeDialog(dlg));
        break;
      case 'cancel': case 'close':
        if (dlg && scope && putBack(scope, act)) break; // the Close of a part shown inside the window: back to the window as it was
        if (part && kind === 'cancel') putAway(); else if (dlg) requestClose(dlg, kind === 'close' ? 'x' : 'cancel');
        break;
      case 'collapse': {
        const box = act.closest<HTMLElement>('[class*=panel-container]');
        const body = collapseBody(act);
        if (!body) break;
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
      menuTimer.current = window.setTimeout(() => showFly(ul, li, screen.menuScroll ?? DEFAULTS.menuScroll), flyMs(ul, 'hover', 100));
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
    if (confirm) { e.stopPropagation(); setConfirm(null); return; } // Escape answers the "form data has changed" window with the answer that stays
    const top = open.filter((x) => !x.closing).at(-1);
    if (top) { e.stopPropagation(); requestClose(top.id, 'x'); } // Escape does not close the side menu on the live portal
  };

  return (
    <KitContext.Provider value={ctx}>
      <div ref={root} data-kit-root="" style={{ display: 'contents' }} onClick={onClick} onDoubleClick={onDouble} onMouseOver={onOver} onMouseOut={onOut}
        onFocus={(e) => focusWrap(e, true)} onBlur={(e) => focusWrap(e, false)} onKeyDown={onKey} onInput={markDirty} onChange={onChangeEvt}>
        {children}
        {open.map((o, i) => <Window key={o.id} id={o.id} def={screen.dialogs[o.id]} Body={dialogs[o.id]} depth={i} closing={o.closing} responsive={screen.responsive} plain={!!screen.dialogs[o.id]?.message} onClosed={() => setOpen((x) => x.filter((y) => y.id !== o.id))} />)}
        {confirm && screen.dialogs[confirm.dlg]?.close?.confirm && <ConfirmWindow c={screen.dialogs[confirm.dlg].close!.confirm!} depth={open.length} />}
      </div>
    </KitContext.Provider>
  );
}
