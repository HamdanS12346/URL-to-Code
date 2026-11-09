// Provider kit runtime, shared by every screen of the app (copied to src/kit by `npm run ui`; do not edit it in the app:
// fix it in final-playwright/kits/provider/app so every screen and every pack gets the fix).
// core: the types of kit.json (written by the capture's harvest), a tiny event bus, and the DOM helpers the widgets share.
import { createContext, createElement, useMemo, type ReactElement } from 'react';

export type Item = { text: string; value: string };
export type WidgetDef = {
  kind: 'dropdown' | 'numeric' | 'date' | 'datetime' | 'time' | 'grid'; role: string; id: string | null; name: string | null; label: string | null;
  required: boolean; validation: Record<string, string>; validationParams: Record<string, string>; enabled: boolean; help: string | null;
  html: string; animation?: unknown;
  optionLabel?: string | null; items?: Item[]; value?: unknown; text?: string; cascadeFrom?: string | null; height?: number;
  format?: string; decimals?: number; min?: unknown; max?: unknown; step?: number; spinners?: boolean; placeholder?: string; interval?: number; timeFormat?: string | null;
  columns?: { field: string | null; title: string; width: unknown; hidden: boolean; sortable: boolean; filterable: boolean; command: boolean; format: string | null }[];
  pageable?: { pageSizes?: unknown; buttonCount?: number; refresh?: boolean; info?: boolean } | boolean; pageSize?: number | null;
};
export type GridAfter = { total: number; pageSize: number | null; fields: Record<string, { type: string; maxLen: number; minLen: number }>; rowTemplate: string | null; altRowTemplate: string | null; html: string; rowCount: number };
export type DialogDef = { title: string; windowClass: string; windowStyle: string | null; titlebarHtml: string | null; contentClass: string; contentId: string | null; contentStyle: string | null;
  overlay: { className: string; style: string | null; background: string; opacity: string } | null; options: Record<string, unknown> | null; widgets: Record<string, WidgetDef>;
  opener: string; openerIndex?: number; parent?: string; children: string[] };
type Anim = { effects?: string; duration?: number };
export type KitData = {
  shell?: { title: string | null; module: string | null };
  widgets: Record<string, WidgetDef>; grids: Record<string, GridAfter>; dialogs: Record<string, DialogDef>;
  search: { reveals: string[]; requests: { method: string; url: string; params: string[] }[] } | null;
  row: { dialog: string | null; navigates: string | null } | null;
  calibration: { defaults?: { popup?: { open?: Anim; close?: Anim }; tooltip?: { showAfter?: number; hideAfter?: number; animation?: { open?: Anim; close?: Anim } } | null; window?: { open?: Anim; close?: Anim } | null; menu?: { open?: Anim; close?: Anim } | null; tooltipGap?: number } | null;
    dropdownPopup?: string | null; calendarPopup?: string | null; tooltip?: string | null };
};
export type Services = { search?: (values: Record<string, string>) => unknown; save?: (dialog: string, values: Record<string, string>) => unknown };

// one bus per KitScreen: search / reset / change
export class Bus extends EventTarget {
  emit(type: string, detail?: unknown) { this.dispatchEvent(new CustomEvent(type, { detail })); }
  on(type: string, fn: (d: any) => void) { const h = (e: Event) => fn((e as CustomEvent).detail); this.addEventListener(type, h); return () => this.removeEventListener(type, h); }
}
export type Ctx = { data: KitData; defs: Record<string, WidgetDef>; bus: Bus; openDialog: (id: string) => void };
export const KitContext = createContext<Ctx | null>(null);

// ---------- captured markup -> React element (the island's own tag and attributes; its children stay HTML) ----------
const ATTR: Record<string, string> = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', colspan: 'colSpan', rowspan: 'rowSpan', autocomplete: 'autoComplete', inputmode: 'inputMode', cellspacing: 'cellSpacing' };
export function styleObject(css: string | null): Record<string, string> {
  const o: Record<string, string> = {};
  for (const d of (css || '').split(/;(?![^(]*\))/)) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    const k = d.slice(0, i).trim();
    o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = d.slice(i + 1).trim();
  }
  return o;
}
export function parseHtml(html: string): Element | null {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
// the element as React renders it: the captured tag and attributes; its innerHTML handed over as-is (the widget owns its children)
export function useIsland(html: string, extra: Record<string, unknown> = {}): ReactElement | null {
  return useMemo(() => {
    const el = parseHtml(html);
    if (!el) return null;
    const props: Record<string, unknown> = {};
    for (const a of [...el.attributes]) {
      if (/^on/i.test(a.name)) continue;
      const n = ATTR[a.name] ?? a.name;
      props[n] = n === 'style' ? styleObject(a.value) : n === 'tabIndex' ? Number(a.value) : a.value;
    }
    props.dangerouslySetInnerHTML = { __html: el.innerHTML };
    return createElement(el.tagName.toLowerCase(), { ...props, ...extra });
  }, [html]); // eslint-disable-line react-hooks/exhaustive-deps
}

export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
export const fill = (tpl: string, values: string[]) => tpl.replace(/\{\{c(\d+)\}\}/g, (_, i) => esc(values[+i] ?? ''));

// Kendo copies the widget's font onto its popup (the popup lives under <body>, outside the form's styles)
export function copyFont(from: Element, to: HTMLElement) {
  const cs = getComputedStyle(from);
  for (const p of ['fontSize', 'fontFamily', 'fontStretch', 'fontStyle', 'fontWeight', 'lineHeight'] as const) to.style[p] = cs[p];
}
// below the anchor, or above it when there is no room below (Kendo's "flip")
export function place(anchor: Element, box: HTMLElement, height: number) {
  const r = anchor.getBoundingClientRect();
  const below = innerHeight - r.bottom, above = r.top;
  const up = below < height && above > below;
  box.style.left = `${r.left + scrollX}px`;
  box.style.top = up ? `${r.top + scrollY - height}px` : `${r.bottom + scrollY}px`;
  return up;
}
export function slide(el: HTMLElement, up: boolean, open: boolean, ms: number) {
  const from = `translateY(${up ? '100%' : '-100%'})`;
  return el.animate(open ? [{ transform: from }, { transform: 'translateY(0)' }] : [{ transform: 'translateY(0)' }, { transform: from }], { duration: ms, easing: 'ease-out', fill: 'forwards' }).finished.catch(() => {});
}
// one popup open at a time, closed by a press anywhere else (Kendo's behavior)
let current: { close: () => void; owner: Element } | null = null;
export function claimPopup(owner: Element, close: () => void) { if (current && current.owner !== owner) current.close(); current = { close, owner }; }
export function releasePopup(owner: Element) { if (current?.owner === owner) current = null; }
if (typeof document !== 'undefined') document.addEventListener('mousedown', (e) => {
  if (!current) return;
  const t = e.target as Element;
  if (current.owner.contains(t) || t.closest?.('[data-kit-popup]')) return;
  current.close();
}, true);

// Kendo's own defaults (kendo.ui.Popup / Tooltip / Window / Menu); kit.json calibration.defaults overrides them
export const DEFAULTS = { popupOpen: 200, popupClose: 100, tooltipShow: 100, tooltipHide: 100, windowMs: 350, menuMs: 200, collapseMs: 400, tooltipGap: 6 };
export const ms = (d: KitData, kind: 'popupOpen' | 'popupClose' | 'windowMs' | 'menuMs') => {
  const c = d.calibration?.defaults;
  const v = kind === 'popupOpen' ? c?.popup?.open?.duration : kind === 'popupClose' ? c?.popup?.close?.duration : kind === 'windowMs' ? c?.window?.open?.duration : c?.menu?.open?.duration;
  return typeof v === 'number' ? v : DEFAULTS[kind];
};
