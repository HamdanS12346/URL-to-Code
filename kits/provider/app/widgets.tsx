// Provider kit widgets: each Kendo widget the capture stamped (data-kit="kN") comes back as an "island": the live
// markup as it was (same tag, classes, icons), with Kendo's behavior wired onto it. Popups are built from the live
// popup markup the capture recorded (kit.json calibration), so their look is the portal's, not a guess.
import { useContext, useLayoutEffect, useRef } from 'react';
import { KitContext, claimPopup, releasePopup, copyFont, place, slide, parseHtml, useIsland, fill, esc, ms, type Ctx, type Item, type WidgetDef } from './core';
import { rowsFor } from './data';

// Kendo 2026 markup, used when the capture has no live sample of a popup
const DEFAULT_LIST = '<div class="k-animation-container"><div class="k-child-animation-container"><div class="k-list-container k-popup k-dropdownlist-popup"><div class="k-list"><div role="option" class="k-list-optionlabel"></div><div class="k-list-content k-list-scroller"><ul role="listbox" class="k-list-ul"><li role="option" class="k-list-item"><span class="k-list-item-text"></span></li></ul></div></div></div></div></div>';
const ARROW_L = '<span class="k-icon k-svg-icon k-svg-i-caret-alt-left k-button-icon"><svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="m160 256 192-128v256z"></path></svg></span>';
const ARROW_R = '<span class="k-icon k-svg-icon k-svg-i-caret-alt-right k-button-icon"><svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M352 256 160 384V128z"></path></svg></span>';
const DEFAULT_CAL = `<div class="k-calendar-container k-popup"><div class="k-calendar"><div class="k-header k-hstack"><span data-action="prev" role="button" class="k-calendar-nav-prev k-button k-button-flat k-icon-button">${ARROW_L}</span><span data-action="nav-up" role="button" class="k-calendar-nav-fast k-button k-button-flat k-flex"><span class="k-button-text"></span></span><span data-action="next" role="button" class="k-calendar-nav-next k-button k-button-flat k-icon-button">${ARROW_R}</span></div><div class="k-calendar-view k-align-items-start k-justify-content-center k-hstack k-calendar-monthview"><table role="grid" class="k-calendar-table" cellspacing="0"><thead class="k-calendar-thead"><tr role="row" class="k-calendar-tr">${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => `<th scope="col" class="k-calendar-th">${d}</th>`).join('')}</tr></thead><tbody class="k-calendar-tbody"></tbody></table></div><div class="k-calendar-footer"><button class="k-calendar-nav-today k-flex k-button k-button-flat k-button-primary" role="link"><span class="k-button-text"></span></button></div></div></div>`;
const SORT = {
  asc: '<span class="k-sort-icon"><span class="k-icon k-svg-icon k-svg-i-sort-asc-small"><svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M256 192v224h-32V192h-96L240 64l112 128z"></path></svg></span></span>',
  desc: '<span class="k-sort-icon"><span class="k-icon k-svg-icon k-svg-i-sort-desc-small"><svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M224 320V96h32v224h96L240 448 128 320z"></path></svg></span></span>',
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ---------- a list popup (dropdown items, a time list), built from the live popup markup ----------
type ListPopup = { close: () => void; el: HTMLElement; up: boolean };
function openList(ctx: Ctx, anchor: HTMLElement, opts: { label: string | null; items: Item[]; value: string; height: number; pick: (v: string) => void; onClose: () => void }): ListPopup {
  const tpl = parseHtml(ctx.data.calibration?.dropdownPopup || DEFAULT_LIST)!;
  const listC = (tpl.matches('.k-list-container') ? tpl : tpl.querySelector('.k-list-container')) as HTMLElement;
  const box = document.createElement('div');
  box.className = 'k-animation-container';
  box.setAttribute('data-kit-popup', '');
  Object.assign(box.style, { position: 'absolute', zIndex: '10002', overflow: 'hidden' });
  const child = document.createElement('div');
  child.className = 'k-child-animation-container';
  child.style.display = 'block';
  const list = listC.cloneNode(true) as HTMLElement;
  list.removeAttribute('style');
  list.removeAttribute('id');
  list.querySelectorAll('.k-no-data, .k-list-group-sticky-header').forEach((e) => ((e as HTMLElement).style.display = 'none'));
  const ol = list.querySelector('.k-list-optionlabel') as HTMLElement | null;
  if (ol) { if (opts.label == null) ol.remove(); else { ol.textContent = opts.label; ol.className = 'k-list-optionlabel' + (opts.value === '' ? ' k-selected k-focus' : ''); } }
  const ul = list.querySelector('ul')!;
  const liTpl = (ul.querySelector('li') ?? parseHtml('<li role="option" class="k-list-item"><span class="k-list-item-text"></span></li>')!).cloneNode(true) as HTMLElement;
  ul.replaceChildren(...opts.items.map((it, i) => {
    const li = liTpl.cloneNode(true) as HTMLElement;
    li.className = 'k-list-item' + (it.value === opts.value ? ' k-selected k-focus' : '');
    li.removeAttribute('id');
    li.setAttribute('aria-selected', String(it.value === opts.value));
    li.setAttribute('data-offset-index', String(i));
    li.setAttribute('data-kit-value', it.value);
    (li.querySelector('.k-list-item-text') ?? li).textContent = it.text;
    return li;
  }));
  list.removeAttribute('data-kit-drop');
  const content = list.querySelector('.k-list-content, .k-list-scroller') as HTMLElement | null;
  const klist = list.querySelector('.k-list') as HTMLElement | null;
  klist?.removeAttribute('style');
  klist?.removeAttribute('id');
  const w = anchor.getBoundingClientRect().width;
  Object.assign(list.style, { width: `${w}px`, minWidth: `${w}px`, whiteSpace: 'normal' });
  copyFont(anchor, list);
  child.append(list);
  box.append(child);
  document.body.append(box);
  // Kendo's height option caps the whole list (option label included); the scroller takes what is left
  // (Kendo sets both heights: the list's, and the container's = list + its padding/border; as flex items they would grow back otherwise)
  if (klist && klist.offsetHeight > opts.height) { const chrome = list.offsetHeight - klist.offsetHeight; klist.style.height = `${opts.height}px`; list.style.height = `${opts.height + chrome}px`; }
  else if (!klist && content && content.offsetHeight > opts.height) Object.assign(content.style, { height: `${opts.height}px`, overflowY: 'auto' });
  const h = list.offsetHeight;
  Object.assign(box.style, { width: `${w}px`, height: `${h}px` });
  const up = place(anchor, box, h);
  slide(child, up, true, ms(ctx.data, 'popupOpen'));
  (content?.querySelector('.k-selected') as HTMLElement | null)?.scrollIntoView({ block: 'nearest' });
  box.addEventListener('mouseover', (e) => { const li = (e.target as Element).closest('li, .k-list-optionlabel'); box.querySelectorAll('.k-hover').forEach((x) => x !== li && x.classList.remove('k-hover')); li?.classList.add('k-hover'); });
  box.addEventListener('mousedown', (e) => e.preventDefault()); // keep the focus on the widget, like Kendo
  box.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t.closest('.k-list-optionlabel')) opts.pick('');
    else { const li = t.closest('li[data-kit-value]'); if (li) opts.pick(li.getAttribute('data-kit-value')!); }
  });
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    releasePopup(anchor);
    slide(child, up, false, ms(ctx.data, 'popupClose')).then(() => box.remove());
    opts.onClose();
  };
  claimPopup(anchor, close);
  return { close, el: box, up };
}

// ---------- dropdown ----------
function Dropdown({ id, def }: { id: string; def: WidgetDef }) {
  const ctx = useContext(KitContext)!;
  const ref = useRef<HTMLElement>(null);
  const el = useIsland(def.html, { ref, 'data-kit': id });
  useLayoutEffect(() => {
    const w = ref.current!;
    const text = w.querySelector('.k-input-value-text') as HTMLElement | null;
    const input = w.querySelector('input[data-role]') as HTMLInputElement | null;
    const items = def.items ?? [], label = def.optionLabel ?? null;
    const initial = String(def.value ?? '');
    const all = (): Item[] => (label != null ? [{ text: label, value: '' }, ...items] : items);
    let value = initial, popup: ListPopup | null = null;
    let enabled = def.enabled;
    const show = (v: string) => {
      value = v;
      const it = all().find((i) => i.value === v);
      if (text) text.textContent = it?.text ?? (label ?? '');
      if (input) input.value = v;
    };
    const change = (v: string) => {
      if (v === value) return;
      show(v);
      input?.dispatchEvent(new Event('change', { bubbles: true }));
      ctx.bus.emit('change', { name: def.name, id: def.id, value: v });
    };
    const close = () => popup?.close();
    const open = () => {
      if (!enabled || popup) return;
      w.setAttribute('aria-expanded', 'true');
      popup = openList(ctx, w, { label, items, value, height: def.height ?? 200, pick: (v) => { change(v); close(); }, onClose: () => { popup = null; w.setAttribute('aria-expanded', 'false'); } });
    };
    const step = (d: number) => { const list = all(); const i = list.findIndex((x) => x.value === value); const n = list[Math.min(list.length - 1, Math.max(0, i + d))]; if (n) change(n.value); };
    const onClick = (e: MouseEvent) => { e.preventDefault(); if (popup) close(); else { w.focus(); open(); } };
    const onKey = (e: KeyboardEvent) => {
      if (!enabled) return;
      if ((e.altKey && e.key === 'ArrowDown') || ((e.key === 'Enter' || e.key === ' ') && !popup)) { e.preventDefault(); open(); }
      else if (e.key === 'Escape' || (e.altKey && e.key === 'ArrowUp') || e.key === 'Tab' || (e.key === 'Enter' && popup)) close();
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); step(e.key === 'ArrowDown' ? 1 : -1); }
      else if (e.key.length === 1 && /\S/.test(e.key)) { const hit = items.find((i) => i.text.toLowerCase().startsWith(e.key.toLowerCase())); if (hit) change(hit.value); }
    };
    const setEnabled = (on: boolean) => { enabled = on; w.classList.toggle('k-disabled', !on); w.setAttribute('aria-disabled', String(!on)); if (!on) close(); };
    show(initial);
    w.addEventListener('click', onClick);
    w.addEventListener('keydown', onKey);
    w.addEventListener('blur', close);
    const offs = [ctx.bus.on('reset', () => change(initial))];
    if (def.cascadeFrom) { // a cascade: enabled once its parent has a value
      setEnabled(false);
      offs.push(ctx.bus.on('change', (d: { name: string; id: string; value: string }) => { if (d.id === def.cascadeFrom || d.name === def.cascadeFrom) { setEnabled(!!d.value); change(''); } }));
    }
    return () => { w.removeEventListener('click', onClick); w.removeEventListener('keydown', onKey); w.removeEventListener('blur', close); close(); offs.forEach((f) => f()); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return el;
}

// ---------- numeric text box ----------
function Numeric({ id, def }: { id: string; def: WidgetDef }) {
  const ctx = useContext(KitContext)!;
  const ref = useRef<HTMLElement>(null);
  const el = useIsland(def.html, { ref, 'data-kit': id });
  useLayoutEffect(() => {
    const w = ref.current!;
    const real = w.querySelector('input[data-role]') as HTMLInputElement | null;
    const vis = ([...w.querySelectorAll('input')].find((i) => i !== real) ?? real) as HTMLInputElement;
    const m = /^[nc](\d)/i.exec(def.format ?? '');
    const dec = def.decimals ?? (m ? +m[1] : 0);
    const fmt = (v: string) => {
      if (v === '' || isNaN(+v)) return '';
      const n = +v;
      if (/^n/i.test(def.format ?? '')) return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (/^c/i.test(def.format ?? '')) return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: dec, maximumFractionDigits: dec });
      return dec ? n.toFixed(dec) : String(Math.round(n));
    };
    const initial = def.value == null || def.value === '' ? '' : String(def.value);
    let raw = initial;
    const set = (v: string) => { raw = v; if (real) real.value = v; vis.value = document.activeElement === vis ? v : fmt(v); };
    const onInput = () => { const v = vis.value.replace(/[^\d.-]/g, ''); if (v !== vis.value) vis.value = v; raw = v; if (real) real.value = v; };
    const onBlur = () => {
      let v: number | '' = raw === '' || isNaN(+raw) ? '' : +raw;
      if (v !== '' && typeof def.min === 'number') v = Math.max(def.min, v);
      if (v !== '' && typeof def.max === 'number') v = Math.min(def.max, v);
      set(v === '' ? '' : String(v));
      ctx.bus.emit('change', { name: def.name, id: def.id, value: raw });
    };
    const onFocus = () => { vis.value = raw; };
    const spin = (e: MouseEvent) => {
      const b = (e.target as Element).closest('.k-spinner-increase, .k-spinner-decrease');
      if (!b) return;
      e.preventDefault();
      set(String((+raw || 0) + (b.classList.contains('k-spinner-increase') ? 1 : -1) * (def.step ?? 1)));
    };
    set(initial);
    vis.addEventListener('input', onInput);
    vis.addEventListener('blur', onBlur);
    vis.addEventListener('focus', onFocus);
    w.addEventListener('mousedown', spin);
    const off = ctx.bus.on('reset', () => set(initial));
    return () => { vis.removeEventListener('input', onInput); vis.removeEventListener('blur', onBlur); vis.removeEventListener('focus', onFocus); w.removeEventListener('mousedown', spin); off(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return el;
}

// ---------- date / datetime / time pickers ----------
// .NET-style format strings, the subset Kendo date formats use
export function formatDate(d: Date, f: string) {
  const H = d.getHours(), h = ((H + 11) % 12) + 1;
  const tok: Record<string, string> = {
    yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(2), MMMM: MONTHS[d.getMonth()], MMM: MONTHS[d.getMonth()].slice(0, 3), MM: String(d.getMonth() + 1).padStart(2, '0'), M: String(d.getMonth() + 1),
    dddd: DAYS[d.getDay()], ddd: DAYS[d.getDay()].slice(0, 3), dd: String(d.getDate()).padStart(2, '0'), d: String(d.getDate()), HH: String(H).padStart(2, '0'), H: String(H), hh: String(h).padStart(2, '0'), h: String(h),
    mm: String(d.getMinutes()).padStart(2, '0'), m: String(d.getMinutes()), ss: String(d.getSeconds()).padStart(2, '0'), s: String(d.getSeconds()), tt: H < 12 ? 'AM' : 'PM',
  };
  return f.replace(/yyyy|yy|MMMM|MMM|MM|M|dddd|ddd|dd|d|HH|H|hh|h|mm|m|ss|s|tt/g, (t) => tok[t] ?? t);
}
const dayKey = (d: Date) => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
const toDate = (v: unknown) => { if (!v) return null; const d = new Date(String(v)); return isNaN(+d) ? null : d; };

function calendar(ctx: Ctx, anchor: HTMLElement, opts: { value: Date | null; min: Date | null; max: Date | null; pick: (d: Date) => void; onClose: () => void }) {
  const tpl = parseHtml(ctx.data.calibration?.calendarPopup || DEFAULT_CAL)!;
  const cont = (tpl.matches('.k-calendar-container') ? tpl : tpl.querySelector('.k-calendar-container') ?? tpl).cloneNode(true) as HTMLElement;
  cont.removeAttribute('aria-hidden');
  cont.removeAttribute('id');
  cont.style.display = 'block';
  copyFont(anchor, cont);
  const box = document.createElement('div');
  box.className = 'k-animation-container';
  box.setAttribute('data-kit-popup', '');
  Object.assign(box.style, { position: 'absolute', zIndex: '10002', overflow: 'hidden' });
  const child = document.createElement('div');
  child.className = 'k-child-animation-container';
  child.append(cont);
  box.append(child);
  const today = new Date();
  let month = new Date((opts.value ?? today).getFullYear(), (opts.value ?? today).getMonth(), 1);
  const inRange = (d: Date) => (!opts.min || d >= new Date(opts.min.getFullYear(), opts.min.getMonth(), opts.min.getDate())) && (!opts.max || d <= opts.max);
  const draw = () => {
    const title = cont.querySelector('.k-calendar-nav-fast .k-button-text, .k-calendar-title .k-button-text');
    if (title) title.textContent = `${MONTHS[month.getMonth()]} ${month.getFullYear()}`;
    const lastPrev = new Date(month.getFullYear(), month.getMonth(), 0), firstNext = new Date(month.getFullYear(), month.getMonth() + 1, 1);
    cont.querySelector('.k-calendar-nav-prev')?.classList.toggle('k-disabled', !!opts.min && lastPrev < opts.min);
    cont.querySelector('.k-calendar-nav-next')?.classList.toggle('k-disabled', !!opts.max && firstNext > opts.max);
    const start = new Date(month.getFullYear(), month.getMonth(), 1 - month.getDay());
    const rows: string[] = [];
    for (let r = 0; r < 6; r++) {
      const cells: string[] = [];
      for (let c = 0; c < 7; c++) {
        const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + r * 7 + c);
        if (!inRange(d)) { cells.push('<td role="gridcell">&nbsp;</td>'); continue; }
        const cls = ['k-calendar-td', c === 0 || c === 6 ? 'k-weekend' : '', d.getMonth() !== month.getMonth() ? 'k-other-month' : '', dayKey(d) === dayKey(today) ? 'k-today' : '', opts.value && dayKey(d) === dayKey(opts.value) ? 'k-selected' : ''].filter(Boolean).join(' ');
        const label = `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        cells.push(`<td class="${cls}" role="gridcell"><span tabindex="-1" class="k-link" data-href="#" data-value="${d.getFullYear()}/${d.getMonth()}/${d.getDate()}" title="${esc(label)}">${d.getDate()}</span></td>`);
      }
      rows.push(`<tr role="row" class="k-calendar-tr">${cells.join('')}</tr>`);
    }
    const tb = cont.querySelector('tbody');
    if (tb) tb.innerHTML = rows.join('');
    const t = cont.querySelector('.k-calendar-nav-today');
    const lbl = `${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    if (t) { t.setAttribute('title', lbl); (t.querySelector('.k-button-text') ?? t).textContent = lbl; }
  };
  draw();
  document.body.append(box);
  const h = cont.offsetHeight;
  Object.assign(box.style, { width: `${cont.offsetWidth}px`, height: `${h}px` });
  const up = place(anchor, box, h);
  slide(child, up, true, ms(ctx.data, 'popupOpen'));
  box.addEventListener('mousedown', (e) => e.preventDefault());
  box.addEventListener('mouseover', (e) => { const td = (e.target as Element).closest('td.k-calendar-td'); box.querySelectorAll('td.k-hover').forEach((x) => x !== td && x.classList.remove('k-hover')); td?.classList.add('k-hover'); });
  box.addEventListener('click', (e) => {
    const t = e.target as Element;
    const link = t.closest('.k-link[data-value]');
    if (link) { const [y, mo, d] = link.getAttribute('data-value')!.split('/').map(Number); opts.pick(new Date(y, mo, d)); return; }
    const nav = t.closest('.k-calendar-nav-prev, .k-calendar-nav-next');
    if (nav && !nav.classList.contains('k-disabled')) { month = new Date(month.getFullYear(), month.getMonth() + (nav.classList.contains('k-calendar-nav-prev') ? -1 : 1), 1); draw(); return; }
    if (t.closest('.k-calendar-nav-today') && inRange(today)) opts.pick(today);
  });
  let closed = false;
  const close = () => { if (closed) return; closed = true; releasePopup(anchor); slide(child, up, false, ms(ctx.data, 'popupClose')).then(() => box.remove()); opts.onClose(); };
  claimPopup(anchor, close);
  return { close };
}

function Picker({ id, def }: { id: string; def: WidgetDef }) {
  const ctx = useContext(KitContext)!;
  const ref = useRef<HTMLElement>(null);
  const el = useIsland(def.html, { ref, 'data-kit': id });
  useLayoutEffect(() => {
    const w = ref.current!;
    const input = (w.querySelector('input[data-role]') ?? w.querySelector('input')) as HTMLInputElement;
    const fmt = def.format || (def.kind === 'time' ? 'h:mm tt' : def.kind === 'datetime' ? 'M/d/yyyy h:mm tt' : 'M/d/yyyy');
    const tfmt = def.timeFormat || 'h:mm tt';
    const initial = toDate(def.value);
    let value = initial;
    let popup: { close: () => void } | null = null;
    const set = (d: Date | null) => { value = d; input.value = d ? formatDate(d, fmt) : ''; ctx.bus.emit('change', { name: def.name, id: def.id, value: input.value }); };
    const close = () => popup?.close();
    const btn = (re: RegExp) => [...w.querySelectorAll('.k-input-button, .k-select, button')].find((b) => re.test(b.innerHTML) || re.test(b.getAttribute('aria-label') ?? '')) as HTMLElement | undefined;
    const calBtn = btn(/calendar/i), timeBtn = btn(/clock|time/i);
    const openCal = () => {
      if (popup) { close(); return; }
      popup = calendar(ctx, w, { value, min: toDate(def.min), max: toDate(def.max), onClose: () => (popup = null),
        pick: (d) => { const t = value ?? new Date(2000, 0, 1, 0, 0); set(new Date(d.getFullYear(), d.getMonth(), d.getDate(), def.kind === 'datetime' ? t.getHours() : 0, def.kind === 'datetime' ? t.getMinutes() : 0)); close(); } });
    };
    const openTime = () => {
      if (popup) { close(); return; }
      const step = def.interval || 30, items: Item[] = [];
      for (let mm = 0; mm < 24 * 60; mm += step) items.push({ text: formatDate(new Date(2000, 0, 1, Math.floor(mm / 60), mm % 60), tfmt), value: String(mm) });
      const cur = value ? String(value.getHours() * 60 + value.getMinutes()) : '';
      popup = openList(ctx, w, { label: null, items, value: cur, height: 200, onClose: () => (popup = null),
        pick: (v) => { const base = value ?? new Date(); set(new Date(base.getFullYear(), base.getMonth(), base.getDate(), Math.floor(+v / 60), +v % 60)); close(); } });
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element;
      if (calBtn?.contains(t)) { e.preventDefault(); openCal(); }
      else if (timeBtn?.contains(t)) { e.preventDefault(); if (def.kind === 'date') openCal(); else openTime(); }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.altKey && e.key === 'ArrowDown') { e.preventDefault(); if (def.kind === 'time') openTime(); else openCal(); } };
    input.value = initial ? formatDate(initial, fmt) : '';
    w.addEventListener('click', onClick);
    w.addEventListener('keydown', onKey);
    const off = ctx.bus.on('reset', () => { close(); set(initial); });
    return () => { w.removeEventListener('click', onClick); w.removeEventListener('keydown', onKey); close(); off(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return el;
}

// ---------- grid: header + sort, synthetic rows from the live row template, pager ----------
function Grid({ id, def }: { id: string; def: WidgetDef }) {
  const ctx = useContext(KitContext)!;
  const ref = useRef<HTMLElement>(null);
  const el = useIsland(def.html, { ref, 'data-kit': id });
  useLayoutEffect(() => {
    const w = ref.current!;
    const after = ctx.data.grids?.[id];
    const all = rowsFor(def, after);
    const cols = (def.columns ?? []).filter((c) => !c.hidden);
    const pg = typeof def.pageable === 'object' ? def.pageable : {};
    let size = after?.pageSize ?? def.pageSize ?? 10, page = 1, searched = false;
    let sort: { col: number; dir: 'asc' | 'desc' } | null = null;
    const emptyRow = w.querySelector('.k-grid-norecords')?.outerHTML ?? null;
    const body = () => [...w.querySelectorAll('tbody')].find((b) => !b.closest('.k-grid-header')) as HTMLElement | undefined;
    const pages = () => Math.max(1, Math.ceil(all.length / size));
    const sorted = () => {
      if (!sort) return all;
      const { col, dir } = sort, k = dir === 'asc' ? 1 : -1;
      const num = (s: string) => (s !== '' && !isNaN(+s) ? +s : NaN);
      return [...all].sort((a, b) => { const x = num(a[col]), y = num(b[col]); return (!isNaN(x) && !isNaN(y) ? x - y : a[col].localeCompare(b[col])) * k; });
    };
    const drawPager = () => {
      const p = w.querySelector('.k-pager');
      if (!p) return;
      const n = pages();
      const nav = (b: Element | null, target: number, off: boolean) => { if (!b) return; b.setAttribute('data-page', String(target)); b.classList.toggle('k-disabled', off); b.setAttribute('aria-disabled', String(off)); };
      const navs = [...p.querySelectorAll('.k-pager-nav')];
      nav(p.querySelector('.k-pager-first'), 1, page === 1);
      nav(p.querySelector('.k-pager-last'), n, page === n);
      const mid = navs.filter((b) => !b.matches('.k-pager-first, .k-pager-last'));
      nav(mid[0] ?? null, page - 1, page === 1);
      nav(mid[1] ?? null, page + 1, page === n);
      const nums = p.querySelector('.k-pager-numbers');
      const tplBtn = nums?.querySelector('button')?.cloneNode(true) as HTMLElement | undefined;
      if (nums && tplBtn) {
        const count = pg.buttonCount ?? 10, start = Math.floor((page - 1) / count) * count + 1;
        const mk = (label: string, target: number, on: boolean) => {
          const b = tplBtn.cloneNode(true) as HTMLElement;
          b.classList.toggle('k-selected', on);
          b.classList.toggle('k-button-primary', on);
          if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
          b.setAttribute('data-page', String(target));
          b.setAttribute('aria-label', label === '...' ? 'More pages' : `Page ${label}`);
          (b.querySelector('.k-button-text') ?? b).textContent = label;
          return b;
        };
        const btns: HTMLElement[] = [];
        if (start > 1) btns.push(mk('...', start - 1, false));
        for (let i = start; i < Math.min(start + count, n + 1); i++) btns.push(mk(String(i), i, i === page));
        if (start + count <= n) btns.push(mk('...', start + count, false));
        nums.replaceChildren(...btns);
      }
      const info = p.querySelector('.k-pager-info');
      if (info && all.length) info.textContent = (info.textContent ?? '').replace(/\d+\s*-\s*\d+\s*of\s*\d+/, `${(page - 1) * size + 1} - ${Math.min(page * size, all.length)} of ${all.length}`);
    };
    const draw = () => {
      const tb = body();
      if (!tb || !after?.rowTemplate) return;
      const rows = sorted().slice((page - 1) * size, page * size);
      tb.innerHTML = rows.length ? rows.map((r, i) => fill(i % 2 && after.altRowTemplate ? after.altRowTemplate : after.rowTemplate!, r)).join('') : emptyRow ?? '';
      [...tb.children].forEach((tr, i) => tr.setAttribute('data-kit-row', String(i)));
      drawPager();
    };
    const onSearch = () => {
      if (after?.html && !searched) { const t = parseHtml(after.html); if (t) w.innerHTML = t.innerHTML; }
      searched = true; page = 1; draw();
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element;
      const th = t.closest('.k-grid-header th') as HTMLElement | null;
      if (th && !t.closest('.k-grid-filter-menu, .k-grid-header-menu')) {
        const idx = [...th.parentElement!.children].indexOf(th);
        if (!cols[idx]?.sortable) return;
        sort = !sort || sort.col !== idx ? { col: idx, dir: 'asc' } : sort.dir === 'asc' ? { col: idx, dir: 'desc' } : null;
        for (const h of w.querySelectorAll('.k-grid-header th')) { h.classList.remove('k-sorted'); h.setAttribute('aria-sort', 'none'); h.querySelector('.k-sort-icon')?.remove(); }
        if (sort) {
          th.classList.add('k-sorted');
          th.setAttribute('aria-sort', sort.dir === 'asc' ? 'ascending' : 'descending');
          (th.querySelector('.k-column-title') ?? th.querySelector('.k-link'))?.insertAdjacentHTML('afterend', SORT[sort.dir]);
        }
        page = 1;
        if (searched) draw();
        return;
      }
      const pb = t.closest('.k-pager [data-page]') as HTMLElement | null;
      if (pb && !pb.classList.contains('k-disabled')) { e.preventDefault(); page = Math.min(pages(), Math.max(1, +pb.getAttribute('data-page')!)); draw(); return; }
      if (t.closest('.k-pager-refresh')) { e.preventDefault(); draw(); return; }
      const row = t.closest('tr[data-kit-row]');
      if (row && ctx.data.row?.dialog) { e.preventDefault(); ctx.openDialog(ctx.data.row.dialog); }
    };
    w.addEventListener('click', onClick);
    const off = ctx.bus.on('search', onSearch);
    return () => { w.removeEventListener('click', onClick); off(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return el;
}

// <KitWidget id="k3" />: the port puts one where each stamped widget was
export function KitWidget({ id }: { id: string }) {
  const ctx = useContext(KitContext);
  const def = ctx?.defs[id];
  if (!def) return null;
  if (def.kind === 'dropdown') return <Dropdown id={id} def={def} />;
  if (def.kind === 'numeric') return <Numeric id={id} def={def} />;
  if (def.kind === 'grid') return <Grid id={id} def={def} />;
  return <Picker id={id} def={def} />;
}
