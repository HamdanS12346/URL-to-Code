// Explore: what the page DOES, in two stages with your coding agent in between.
//   survey()  (stage 2): find everything hoverable / clickable / typeable -> explore/survey/ (candidates.md, map pictures, suggested plan)
//   (stage 3: the agent writes explore/plan.json, skill explore-plan; or --auto takes the suggested one)
//   explore() (stage 4): run the plan. Every action starts from a known state, is performed, and the page is diffed -> explore/states.json + shots/
// Never leaves the page: navigations are blocked and recorded.
import fs from 'node:fs';
import path from 'node:path';
import { openPage } from './lib/browser.mjs';
import { loadPlan } from './check-plan.mjs';
import { RECORDER, scanHover, scrollProbe, mediaProbe, renderBrief } from './lib/behave.mjs';
import { timingStart, timingStop, relevantTiming, timingPhrase } from './lib/timing.mjs';

const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const LISTS = ['shown', 'hidden', 'enabled', 'disabled', 'checked', 'unchecked', 'added', 'removed'];
const EVENTS = new Set(['navigation', 'postback', 'async-postback', 'request', 'dialog', 'popup', 'download', 'pageerror']);

// ---------- diff two snapshots ----------
// Keys of the elements the scroll probe found to be driven by scroll position (a sticky copy of the header, a back-to-top button):
// the part itself and everything inside it. Every click scrolls its target into view, so without this a sticky bar "appears"
// as an effect of an unrelated click, and the rebuild is then tested for a behavior no click has.
const partKeys = new WeakMap();
function scrollParts(items, sels) {
  if (!sels?.size) return new Set();
  let hit = partKeys.get(items);
  if (hit) return hit;
  const roots = new Set(Object.entries(items).filter(([, it]) => sels.has(it.s)).map(([k]) => k));
  hit = new Set(Object.keys(items).filter((k) => { for (let p = k; p; p = items[p]?.p) if (roots.has(p)) return true; return false; }));
  partKeys.set(items, hit);
  return hit;
}
export function diff(a, b, vol = { items: new Set(), texts: new Set() }) {
  const d = Object.fromEntries(LISTS.map((k) => [k, []]));
  d.changed = [];
  // only when the scroll position moved between the two snapshots: that is when a scroll-driven part can have changed by itself
  const sk = vol.scrollSels && a.y !== undefined && b.y !== undefined && a.y !== b.y ? new Set([...scrollParts(a.items, vol.scrollSels), ...scrollParts(b.items, vol.scrollSels)]) : null;
  const skText = new Set();
  if (sk) for (const k of sk) for (const it of [a.items[k], b.items[k]]) { if (it?.t) skText.add(it.t); if (it?.l) skText.add(it.l); }
  const scrolly = (t) => t.length >= 2 && [...skText].some((s) => s.includes(t.replace(/…$/, '')));
  for (const [k, y] of Object.entries(b.items)) {
    if (vol.items.has(k) || sk?.has(k)) continue;
    const x = a.items[k];
    if (!x) { if (y.v) d.added.push(k); continue; }
    if (x.v !== y.v) (y.v ? d.shown : d.hidden).push(k);
    if (!x.v && !y.v) continue;
    if (x.e !== y.e && x.e !== undefined) (y.e ? d.enabled : d.disabled).push(k);
    if (x.c !== y.c && x.c !== undefined) (y.c ? d.checked : d.unchecked).push(k);
    for (const f of ['val', 'opts', 't', 'cls', 'ex']) if (x[f] !== y[f]) d.changed.push({ key: k, field: f, from: x[f], to: y[f] });
  }
  for (const [k, x] of Object.entries(a.items)) if (!b.items[k] && x.v && !vol.items.has(k) && !sk?.has(k)) d.removed.push(k);
  const ms = (t) => Object.entries(t).filter(([s]) => !vol.texts.has(s) && !(sk && scrolly(s)));
  d.textsAdded = ms(b.texts).filter(([s, n]) => n > (a.texts[s] || 0)).map(([s]) => s);
  d.textsRemoved = ms(a.texts).filter(([s, n]) => n > (b.texts[s] || 0)).map(([s]) => s);
  return d;
}
const keysOf = (d) => [...LISTS.flatMap((k) => d[k]), ...d.changed.map((c) => c.key)];
const any = (d) => LISTS.some((k) => d[k].length) || d.changed.length || d.textsAdded.length || d.textsRemoved.length;
// drop entries whose ancestor is already in the list ("panel shown" covers the panel's children)
const topOnly = (keys, items) => {
  const set = new Set(keys);
  return keys.filter((k) => { for (let p = items[k]?.p; p; p = items[p]?.p) if (set.has(p)) return false; return true; });
};

// ---------- sample values that break / satisfy a field's rules ----------
export function samples(c, vals = []) {
  const name = `${c.key} ${c.name || ''} ${c.label || ''} ${c.id || ''}`.toLowerCase();
  const type = (c.type || 'text').toLowerCase(), dv = c.dataVal || {};
  const tests = [], invalid = [], first = [];
  const bad = (value, why) => { if (!invalid.some((x) => x.value === value)) invalid.push({ value, why }); };
  const regex = (expr, why) => {
    let re;
    try { re = new RegExp(`^(?:${expr})$`); } catch { return; }
    tests.push((x) => re.test(x));
    const b = ['abc', '!!', '123', 'a@'].find((x) => !re.test(x));
    if (b != null) bad(b, why);
  };
  const range = (min, max, dataType, why) => {
    if (/Date/i.test(dataType || '')) { tests.push((x) => { const t = Date.parse(x); return !isNaN(t) && t >= Date.parse(min) && t <= Date.parse(max); }); bad('01/01/1900', why); return; }
    if (isNaN(+min) || isNaN(+max)) return;
    tests.push((x) => x !== '' && +x >= +min && +x <= +max);
    bad(String(+max + 1), why);
    first.push(String(min));
  };
  if (c.required || dv['data-val-required'] || vals.some((v) => v.type === 'required')) bad('', 'required');
  for (const v of vals) {
    if (v.type === 'regex' && v.expression) regex(v.expression, `regex ${v.key || v.id}`);
    if (v.type === 'range' && v.min != null && v.max != null) range(v.min, v.max, v.dataType, `range ${v.key || v.id}`);
    if (v.type === 'compare' && v.operator === 'DataTypeCheck') {
      if (/Integer|Double|Currency/i.test(v.dataType || '')) { tests.push((x) => x !== '' && !isNaN(+x)); bad('abc', `type ${v.key || v.id}`); }
      else if (/Date/i.test(v.dataType || '')) { tests.push((x) => !isNaN(Date.parse(x))); bad('abc', `type ${v.key || v.id}`); }
    }
    if (v.type === 'compare' && v.valueToCompare != null && v.operator && v.operator !== 'DataTypeCheck' && !isNaN(+v.valueToCompare)) {
      const n = +v.valueToCompare;
      const op = { Equal: (x) => +x === n, NotEqual: (x) => +x !== n, GreaterThan: (x) => +x > n, GreaterThanEqual: (x) => +x >= n, LessThan: (x) => +x < n, LessThanEqual: (x) => +x <= n }[v.operator];
      if (op) { tests.push((x) => x !== '' && op(x)); const b = [String(n - 1), String(n), String(n + 1)].find((x) => !op(x)); if (b) bad(b, `compare ${v.key || v.id}`); first.push(...[String(n), String(n + 1), String(n - 1)].filter(op)); }
    }
  }
  if (dv['data-val-regex-pattern']) regex(dv['data-val-regex-pattern'], 'data-val-regex');
  if (dv['data-val-range-min'] != null && dv['data-val-range-max'] != null) range(dv['data-val-range-min'], dv['data-val-range-max'], '', 'data-val-range');
  if (dv['data-val-email'] || type === 'email') { tests.push((x) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)); bad('abc', 'email'); }
  if (dv['data-val-number'] || type === 'number') { tests.push((x) => x !== '' && !isNaN(+x)); if (type !== 'number') bad('abc', 'number'); }
  if (c.pattern) regex(c.pattern, 'pattern');
  const max = c.maxlength || +dv['data-val-length-max'] || 0;
  if (max) { tests.push((x) => x.length <= max); if (max < 300) bad('x'.repeat(max + 1), 'maxlength'); }
  const min = c.minlength || +dv['data-val-length-min'] || 0;
  if (min > 1) { tests.push((x) => x.length >= min); bad('x'.repeat(min - 1), 'minlength'); }
  if (type === 'number') { if (c.min) { tests.push((x) => +x >= +c.min); first.push(String(c.min)); } if (c.max) tests.push((x) => +x <= +c.max); }
  const byType = { date: ['2024-01-15'], time: ['10:30'], 'datetime-local': ['2024-01-15T10:30'], month: ['2024-01'], week: ['2024-W03'] };
  const byName = [[/mail/, 'test@example.com'], [/phone|mobile|tel|fax/, '5551234567'], [/zip|postal|pin ?code/, '12345'], [/date|dob|birth/, '01/15/2024'],
    [/url|website/, 'https://example.com'], [/amount|price|qty|quantity|age|count|number|\bno\b|year/, '100'], [/pass/, 'Test@1234']];
  const cands = [...first, ...(byType[type] || []), ...byName.filter(([re]) => re.test(name)).map(([, v]) => v),
    'Test', 'Test Value', '100', '1', '12345', 'test@example.com', '01/15/2024', '2024-01-15', 'ABC123', 'https://example.com', 'Test@1234', '5551234567'];
  const valid = cands.find((x) => tests.every((t) => { try { return t(x); } catch { return false; } })) ?? 'Test';
  return { valid, invalid: invalid.filter((x) => x.value !== valid).slice(0, 3) };
}

const spread = (count, k, skip) => {
  const idx = [...Array(count).keys()].filter((i) => i !== skip && i > 0);
  if (idx.length <= k) return idx;
  return [...new Set(Array.from({ length: k }, (_, j) => idx[Math.round((j * (idx.length - 1)) / (k - 1))]))];
};

// actions for one interactive element; a "chain" runs in order on one page load (empty -> invalid -> valid)
function chainsFor(key, it, c, vals, E) {
  const base = { key, sel: !it.v && it.ls ? it.ls : it.s, label: it.l };
  switch (it.i) {
    case 'text': {
      if (c?.readOnly) return [];
      const sm = samples(c || { key, label: it.l }, vals);
      return [[...sm.invalid.map((x) => ({ ...base, a: 'fill', value: x.value, why: x.why })), { ...base, a: 'fill', value: sm.valid, why: 'valid' }]];
    }
    case 'checkbox': return [[{ ...base, a: 'click', why: it.c ? 'uncheck' : 'check' }, { ...base, a: 'click', why: it.c ? 'check' : 'uncheck' }]];
    case 'radio': return it.c ? [] : [[{ ...base, a: 'click', why: 'select' }]];
    case 'select': {
      const count = parseInt(it.opts, 10) || 0, cur = c?.options?.findIndex((o) => o.s) ?? 0;
      const steps = spread(count, E.maxOptions, cur).map((i) => ({ ...base, a: 'select', index: i, value: c?.options?.[i]?.t ?? `option #${i}` }));
      return steps.length ? [steps] : [];
    }
    case 'link': {
      const plain = c && ['url', 'external', 'other'].includes(c.hrefKind) && !c.inline?.onclick && !(c.handlers || []).some((h) => /click|mouse/i.test(h));
      return plain ? [] : [[{ ...base, a: 'click' }]];
    }
    case 'button': case 'combobox': return [[{ ...base, a: 'click' }]];
    default: return [];
  }
}

const isSubmitter = (c) => c.visible && !c.disabled && c.kind === 'button' &&
  (c.postback?.validate || c.type === 'submit' || /\b(submit|save|log ?in|sign ?in|register|search|send|next|continue|apply|ok|update|create|add|go|find|calculate|confirm|login)\b/i.test(c.label || ''));

const sum = (a) => {
  const o = { a: a.a, key: a.key, label: a.label, sel: a.sel };
  for (const k of ['value', 'index', 'group', 'why']) if (a[k] !== undefined) o[k] = a[k];
  if (a.fields) o.fields = a.fields.map(sum);
  return o;
};
const styleDelta = (a, b) => { const o = {}; if (a && b) for (const k of Object.keys(b)) if (a[k] !== b[k]) o[k] = [a[k], b[k]]; return o; };

// De-duplicate by group signature: 40 look-alike cards -> a few spread across the group (first, middle, last).
// Triggers (aria popup/expanded, CSS :hover rules) keep a bigger quota: each one may open something different.
// entries: [key, item]; item.g = group signature, item.x / item.strong = trigger. Returns a Set of keys to keep.
export function pickGroups(entries, per = 3, perTrigger = 10) {
  const byG = new Map();
  for (const e of entries) { const g = e[1].g ?? e[0]; (byG.get(g) ?? byG.set(g, []).get(g)).push(e); }
  const keep = new Set();
  for (const list of byG.values()) {
    const k = Math.min(list.length, list.some((e) => e[1].x || e[1].strong) ? perTrigger : per);
    const idx = new Set(Array.from({ length: k }, (_, j) => Math.round((j * (list.length - 1)) / Math.max(1, k - 1))));
    for (const i of idx) keep.add(list[i][0]);
  }
  return keep;
}

// what survey and explore both need: the capture's inputs, and a page with the snapshot helpers
function inputs(out) {
  const cap = path.join(out, 'capture');
  const controls = readJson(path.join(cap, 'controls.json'), []);
  const wf = readJson(path.join(cap, 'webforms.json'), { validators: [] });
  return { cap, controls, wf, listen: readJson(path.join(cap, 'listeners.json'), {}), ctrl: Object.fromEntries(controls.map((c) => [c.key, c])),
    valsFor: (key) => (wf.validators || []).filter((v) => v.targetKey === key && v.enabled !== false) };
}

async function session({ browser, cfg, url, viewport, dpr }, I, saveAssets, { record = false } = {}) {
  const E = cfg.explore;
  // stage 4 adds hover/state images to the capture's assets; the survey saves nothing
  const s = await openPage(browser, cfg, { url, viewport, dpr, ...(saveAssets ? { assetsDir: path.join(I.cap, 'assets'), assets: readJson(path.join(I.cap, 'assets', 'index.json'), {}) } : {}) });
  // hover/scroll listeners are only visible if they are noted as the page registers them: before its own scripts run
  if (record) await s.context.addInitScript({ content: RECORDER });
  const snap = async () => {
    for (let i = 0; i < 5; i++) {
      try { return await s.page.evaluate(() => __pw.snap()); } catch { await s.page.waitForLoadState('load').catch(() => {}); await s.page.waitForTimeout(400); }
    }
    throw new Error('page never settled for a snapshot');
  };
  const reset = async () => { await s.load({ idleMs: E.resetIdleMs ?? 2000, quietMax: E.quietMaxMs ?? 8000 }); await s.page.evaluate((x) => { __pw.extra = x; __pw.stable = true; }, I.listen).catch(() => {}); return snap(); };
  // which of [id, selector] pairs sit inside explore.scope
  const inside = (pairs) => s.page.evaluate(([scope, ps]) => ps.filter(([, sel]) => { try { return !!document.querySelector(sel)?.closest(scope); } catch { return false; } }).map(([k]) => k), [E.scope, pairs]);
  return { s, snap, reset, inside };
}

const prio = (it) => (it.x ? 0 : it.i === 'button' || it.i === 'combobox' ? 1 : it.i === 'text' || it.i === 'select' ? 2 : 3);
const cell = (x) => String(x ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

// ---------- STAGE 2 — survey: everything the page lets you hover, click, type into or pick, for the planner (your coding agent) ----------
// Writes explore/survey/: survey.json (every element + what can be done to it), candidates.md (the table the agent reads),
// map/NN.jpg (the page with a numbered box per row), plan.suggested.json (the rule-based plan, what --auto runs).
export async function survey(ctx) {
  const { cfg, out, viewport, log } = ctx;
  const E = cfg.explore, dir = path.join(out, 'explore', 'survey');
  fs.rmSync(dir, { recursive: true, force: true });
  // stage-4 results of an earlier capture would feed facts.md stale behaviors; plan.json stays (re-validated against this survey)
  fs.rmSync(path.join(out, 'explore', 'shots'), { recursive: true, force: true });
  fs.rmSync(path.join(out, 'explore', 'states.json'), { force: true });
  fs.mkdirSync(path.join(dir, 'map'), { recursive: true });
  const I = inputs(out);
  const { s, snap, reset, inside } = await session(ctx, I, false, { record: E.behave !== false });
  try {
    // baseline + volatile elements (clocks, rotating banners): diff two loads, and the same load a few seconds apart
    const b1 = await reset();
    await s.page.waitForTimeout(E.volatileWaitMs ?? 6000); // rotating banners step every 3-6 s: a 2 s look misses them
    const b1b = await snap();
    const base = await reset();
    const vol = { items: new Set(), texts: new Set() };
    for (const d of [diff(b1, b1b), diff(b1, base)]) {
      for (const k of keysOf(d)) vol.items.add(k);
      for (const t of [...d.textsAdded, ...d.textsRemoved]) vol.texts.add(t);
    }
    log(`  [stage 2] baseline: ${Object.keys(base.items).length} tracked elements, ${vol.items.size} volatile (change on their own, ignored)`);
    // elements the page's JavaScript reacts to on hover (listeners were noted from the start of this load): not visible in any picture
    const B = E.behave === false ? null : { scroll: true, media: true, maxStops: 14, ...(typeof E.behave === 'object' ? E.behave : {}) };
    const scanned = B ? await scanHover(s.page) : { elements: [], pageLevel: {} };
    if (scanned.elements.length) log(`  [behave] ${scanned.elements.length} visible element(s) with a JavaScript hover handler`);
    // explore.scope: only the screen's own area, not the shared master page / site chrome
    let inScope = null;
    if (E.scope) {
      inScope = new Set(await inside(Object.entries(base.items).map(([k, it]) => [k, it.s])));
      if (inScope.size) log(`  scope ${E.scope}: ${inScope.size} of ${Object.keys(base.items).length} elements`);
      else { log(`  ! scope ${E.scope} matches nothing: surveying the whole page`); inScope = null; }
    }
    const scoped = (k) => !inScope || inScope.has(k);

    // hoverable: visible enabled controls + CSS-only dropdown triggers / pointer elements that aren't controls (keyed hover-<label>)
    const allVisible = Object.entries(base.items).filter(([k, it]) => it.i && it.v && it.e && !vol.items.has(k) && scoped(k));
    const used = new Set(Object.keys(base.items));
    let hoverRaw = await s.page.evaluate(() => __pw.hoverTargets()).catch(() => []);
    {
      const have = new Map(hoverRaw.map((h) => [h.sel, h])), ctl = new Set(allVisible.map(([, it]) => it.s));
      for (const h of scanned.elements) {
        if (have.has(h.sel)) have.get(h.sel).strong = true;
        else if (!ctl.has(h.sel)) hoverRaw.push({ sel: h.sel, label: h.label, g: h.g, strong: true });
      }
    }
    if (inScope) { const ok = new Set(await inside(hoverRaw.map((h, i) => [i, h.sel]))); hoverRaw = hoverRaw.filter((h, i) => ok.has(i)); }
    const extraHover = hoverRaw.map((h) => {
      let k = `hover-${h.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'item'}`;
      for (let n = 2; used.has(k); n++) k = k.replace(/-\d+$/, '') + `-${n}`;
      used.add(k);
      return [k, { s: h.sel, l: h.label, v: true, e: true, g: h.g, strong: h.strong }];
    });
    const hoverable = [...extraHover, ...allVisible], canHover = new Set(hoverable.map(([k]) => k));
    // actionable: enabled controls, visible or reachable through their label (custom-styled checkboxes)
    const seedable = Object.entries(base.items).filter(([k, it]) => it.i && (it.v || it.ls) && it.e && !vol.items.has(k) && scoped(k));

    // every element the plan may name, and what can be done to it
    const els = new Map();
    for (const [k, it] of [...hoverable, ...seedable]) {
      if (els.has(k)) continue;
      const acts = chainsFor(k, it, I.ctrl[k], I.valsFor(k), E).flat().map((a) => a.a);
      els.set(k, { key: k, kind: it.i, label: it.l || '', sel: it.s, can: [...(canHover.has(k) ? ['hover'] : []), ...new Set(acts)], strong: !!(it.strong || it.x), css: !!it.strong, g: it.g ?? k, item: it });
    }
    // which planned/plannable keys carry a JavaScript hover handler, folded by look-alike group
    const jsBySel = new Map(scanned.elements.map((h) => [h.sel, h]));
    const hoverGroups = new Map();
    for (const e of els.values()) {
      const h = jsBySel.get(e.sel);
      if (!h || !e.can.includes('hover')) continue;
      e.js = h.types; e.jsVia = h.via;
      const g = hoverGroups.get(e.g) ?? hoverGroups.set(e.g, { g: e.g, label: e.label, types: [], via: [], keys: [] }).get(e.g);
      g.keys.push(e.key);
      for (const t of h.types) if (!g.types.includes(t)) g.types.push(t);
      for (const v of h.via) if (!g.via.includes(v)) g.via.push(v);
    }
    const submitter = (k) => !!I.ctrl[k] && isSubmitter(I.ctrl[k]);
    for (const e of els.values()) if (submitter(e.key)) e.submit = true;
    const members = new Map();
    for (const e of els.values()) (members.get(e.g) ?? members.set(e.g, []).get(e.g)).push(e.key);
    for (const e of els.values()) e.count = members.get(e.g).length;

    // the rule-based plan: a few of each group, popup triggers first (= what --auto runs, and a starting point for the agent)
    const keepHover = pickGroups(hoverable, E.perGroup ?? 3, E.perTrigger ?? 10);
    const foldable = seedable.filter(([, it]) => /^(button|link|combobox)$/.test(it.i)); // form fields are never folded: each has its own validation
    const keepAct = pickGroups(foldable, E.perGroupActions ?? 2, E.perTrigger ?? 10);
    const suggested = {
      source: 'auto', note: 'rule-based: look-alikes folded (a few of each group), popup/expand triggers first',
      hover: hoverable.filter(([k]) => keepHover.has(k)).sort((a, b) => !!(b[1].strong || b[1].x) - !!(a[1].strong || a[1].x)).map(([k]) => k),
      actions: [...seedable].sort((a, b) => prio(a[1]) - prio(b[1]))
        .filter(([k, it]) => !(/^(button|link|combobox)$/.test(it.i) && !keepAct.has(k)) && els.get(k).can.some((c) => c !== 'hover'))
        .map(([k]) => (submitter(k) ? { key: k, submit: true } : k)),
    };
    // a JavaScript hover handler is evidence of behavior: the rule-based plan hovers one of each group too
    for (const g of hoverGroups.values()) if (!g.keys.some((k) => suggested.hover.includes(k) || suggested.actions.some((a) => (a.key ?? a) === k))) suggested.hover.unshift(g.keys[0]);
    const inSuggested = new Set([...suggested.hover, ...suggested.actions].map((e) => e.key ?? e));

    // the table lists a few of each look-alike group; every other key stays valid in the plan
    const shown = pickGroups([...els].map(([k, e]) => [k, { g: e.g, x: e.strong }]), E.perGroup ?? 3, E.perTrigger ?? 10);
    await s.page.evaluate(() => window.scrollTo(0, 0));
    const rows = [...els.values()].filter((e) => shown.has(e.key));
    const boxes = await s.page.evaluate((sels) => sels.map((q) => {
      let el; try { el = document.querySelector(q); } catch { return null; }
      const r = el && el.getBoundingClientRect();
      return r && r.width * r.height > 0 ? [Math.round(r.left + scrollX), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)] : null;
    }), rows.map((e) => e.sel));
    rows.forEach((e, i) => { e.box = boxes[i]; });
    rows.sort((a, b) => (a.box ? 0 : 1) - (b.box ? 0 : 1) || (a.box?.[1] ?? 0) - (b.box?.[1] ?? 0) || (a.box?.[0] ?? 0) - (b.box?.[0] ?? 0));
    rows.forEach((e, i) => { e.n = i + 1; });

    // map pictures: the page with a numbered box per row (red; magenta = popup trigger / CSS :hover rule)
    await s.page.evaluate((marks) => {
      const layer = document.createElement('div');
      layer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:2147483647;pointer-events:none';
      for (const [n, [x, y, w, h], strong] of marks) {
        const c = strong ? '#d000ff' : '#e00000', b = document.createElement('div'), t = document.createElement('span');
        b.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;outline:2px solid ${c};outline-offset:-1px`;
        t.textContent = n;
        t.style.cssText = `position:absolute;left:-2px;top:${y < 15 ? 0 : -15}px;font:bold 11px/14px Arial,sans-serif;padding:0 3px;color:#fff;background:${c};white-space:nowrap`;
        b.appendChild(t);
        layer.appendChild(b);
      }
      document.documentElement.appendChild(layer); // the root, not body: absolute = page coordinates even when body is positioned
    }, rows.filter((e) => e.box).map((e) => [e.n, e.box, e.strong]));
    const H = Math.min(await s.page.evaluate(() => document.documentElement.scrollHeight), cfg.warmup?.maxHeightPx ?? 30000);
    const CH = 1400, maps = [];
    for (let y = 0, i = 1; y < H && i <= 25; y += CH, i++) {
      const file = `map/${String(i).padStart(2, '0')}.jpg`;
      try {
        await s.page.screenshot({ path: path.join(dir, file), type: 'jpeg', quality: 70, fullPage: true, clip: { x: 0, y, width: viewport.width, height: Math.min(CH, H - y) } });
        maps.push({ file, y, h: Math.min(CH, H - y) });
      } catch (e) { log(`  ! map picture ${file} failed: ${e.message.split('\n')[0]}`); }
    }
    const mapOf = (box) => (box ? maps.find((m) => box[1] >= m.y && box[1] < m.y + m.h)?.file.slice(4, 6) ?? '' : '');

    const hiddenAtLoad = topOnly(Object.keys(base.items).filter((k) => !base.items[k].v && !vol.items.has(k) && scoped(k)), base.items)
      .slice(0, 40).map((k) => ({ key: k, label: base.items[k].l || '' }));
    // scroll + media probes run on a fresh load of their own: the numbered map layer and any scroll-triggered state are gone
    const behave = { probedAt: new Date().toISOString(), hover: { groups: [...hoverGroups.values()], elements: scanned.elements, pageLevel: scanned.pageLevel }, scroll: null, media: null };
    if (B && (B.scroll || B.media)) {
      try {
        await reset();
        const keyOf = new Map(Object.entries(base.items).map(([k, it]) => [it.s, k]));
        if (B.scroll) {
          behave.scroll = await scrollProbe(s.page, { dir: path.join(dir, 'scroll'), log, maxStops: B.maxStops });
          for (const b of behave.scroll.behaviors) { const k = keyOf.get(b.sel); if (k) b.key = k; }
        }
        if (B.media) {
          if (B.scroll) await reset();
          behave.media = await mediaProbe(s.page, { log, guard: s.guard });
        }
      } catch (e) { log(`  ! behavior probes failed (${e.message.split('\n')[0]}): the brief only has the hover handlers`); }
    }
    fs.writeFileSync(path.join(dir, 'behave.json'), JSON.stringify(behave, null, 1));
    const sv = {
      surveyedAt: new Date().toISOString(), url: ctx.url, title: base.title, viewport,
      behavior: { hover: { groups: behave.hover.groups, pageLevel: behave.hover.pageLevel }, scroll: behave.scroll ? behave.scroll.behaviors.length : 0, scrollSels: behave.scroll ? behave.scroll.behaviors.map((b) => b.sel) : [], media: behave.media ? behave.media.videos.length : 0 },
      volatile: { items: [...vol.items], texts: [...vol.texts] },
      scope: inScope ? { selector: E.scope, keys: [...inScope] } : undefined,
      hoverTargets: extraHover.map(([k, it]) => ({ key: k, label: it.l, sel: it.s })),
      elements: [...els.values()],
      hiddenAtLoad, maps, suggested: { hover: suggested.hover.length, actions: suggested.actions.length },
    };
    fs.writeFileSync(path.join(dir, 'survey.json'), JSON.stringify(sv, null, 1));
    fs.writeFileSync(path.join(dir, 'plan.suggested.json'), JSON.stringify(suggested, null, 1));

    const w = [];
    w.push(`# Exploration candidates: ${sv.title || ctx.url}`, '');
    w.push(`${ctx.url} · viewport ${viewport.width}x${viewport.height} · surveyed ${sv.surveyedAt.slice(0, 16).replace('T', ' ')}`, '');
    w.push(`- ${els.size} elements can be hovered / clicked / typed into, in ${members.size} groups of look-alikes. This table lists ${rows.length}: a few of each group (the column "look-alikes" names the others; their keys are valid in the plan too).`);
    w.push(`- Pictures: ${maps.map((m) => `\`explore/survey/${m.file}\` (y ${m.y}-${m.y + m.h})`).join(', ')}. Box number = row "#". Red = element, magenta = popup/expand trigger or CSS :hover rule.`);
    w.push(`- ${vol.items.size} volatile elements (carousels, clocks) change on their own: not listed, ignored when diffing.`);
    w.push(`- Rule-based suggestion: \`explore/survey/plan.suggested.json\` (${suggested.hover.length} hovers, ${suggested.actions.length} actions), marked "sugg" below. It is what \`--auto\` runs.`);
    w.push(`- Budget: ${E.timeBudgetSec}s (config explore.timeBudgetSec, or "budgetSec" in the plan). A hover costs ~1-2 s; a click/fill ~2-5 s, plus a page reload (5-20 s on a busy site) when it leaves something open.`, '');
    if (B) w.push(renderBrief(behave));
    if (hiddenAtLoad.length) {
      w.push('## Hidden at load (something on the page reveals these: find its trigger)', '');
      for (const h of hiddenAtLoad) w.push(`- \`${h.key}\`: ${cell(h.label).slice(0, 80)}`);
      w.push('');
    }
    w.push('## Elements (top to bottom)', '', '| # | key | label | kind | can | y | map | look-alikes | hints |', '|---|---|---|---|---|---|---|---|---|');
    for (const e of rows) {
      const others = members.get(e.g).filter((k) => k !== e.key && !shown.has(k));
      const hints = [e.css ? 'css :hover' : e.strong ? 'popup/expand trigger' : '', e.js ? 'js hover handler' : '', e.submit ? 'submit-like' : '', inSuggested.has(e.key) ? 'sugg' : ''].filter(Boolean).join(', ');
      w.push(`| ${e.n} | \`${e.key}\` | ${cell(e.label).slice(0, 50)} | ${e.kind || 'hover-only'} | ${e.can.join(', ') || '-'} | ${e.box ? e.box[1] : 'hidden'} | ${mapOf(e.box)} | ${e.count > 1 ? `×${e.count}${others.length ? ` (also ${others.slice(0, 3).map((k) => `\`${k}\``).join(', ')}${others.length > 3 ? ', …' : ''})` : ''}` : ''} | ${hints} |`);
    }
    fs.writeFileSync(path.join(dir, 'candidates.md'), w.join('\n') + '\n');
    log(`  [stage 2] ${els.size} interactive elements in ${members.size} groups -> ${rows.length} listed, ${hiddenAtLoad.length} hidden at load, ${maps.length} map picture(s)`);
    log(`  [stage 2] for the planner: outputs/${path.basename(out)}/explore/survey/candidates.md + map/*.jpg`);
    return sv;
  } finally { await s.close(); }
}

// ---------- STAGE 4 — run the plan (explore/plan.json): every action starts from a known state, is performed, and the page is diffed ----------
// Deterministic and bounded (config.explore / plan.budgetSec). Never leaves the page: navigations are blocked and recorded.
// Writes outputs/<screen>/explore/states.json + shots/<T##>.png (crop of what changed).
export async function explore(ctx) {
  const { cfg, url, out, viewport, dpr, log } = ctx;
  const dir = path.join(out, 'explore');
  const sv = readJson(path.join(dir, 'survey', 'survey.json'), null);
  if (!sv) throw new Error('no explore/survey/survey.json: stage 2 (survey) has not run');
  const pl = loadPlan(out, { auto: ctx.auto });
  if (!pl.ok) throw new Error(`explore/plan.json is not usable: ${pl.errors.join('; ')} (npm run check:plan -- ${path.basename(out)})`);
  const plan = pl.plan, E = { ...cfg.explore, ...(plan.budgetSec ? { timeBudgetSec: plan.budgetSec } : {}) };
  fs.rmSync(path.join(dir, 'shots'), { recursive: true, force: true });
  fs.rmSync(path.join(dir, 'states.json'), { force: true });
  fs.mkdirSync(path.join(dir, 'shots'), { recursive: true });
  const I = inputs(out), { cap, controls, wf, ctrl, valsFor } = I;
  const deny = new RegExp(cfg.denyPattern, 'i');
  const allowed = (a) => cfg.mode === 'full' || (cfg.mode === 'safe' && !deny.test(`${a.label || ''} ${a.key} ${ctrl[a.key]?.id || ''} ${ctrl[a.key]?.text || ''}`));

  const { s, snap, reset } = await session(ctx, I, true);
  const t0 = Date.now();
  const timeUp = () => Date.now() - t0 > E.timeBudgetSec * 1000;
  const loc = (sel) => s.page.locator(sel).first();
  // ids like #dialog-show-dialog-<uuid> are regenerated on every page load: when the recorded selector matches nothing, find the element by its label
  const find = async (a) => {
    const l = loc(a.sel);
    if (!a.label || a.label.length >= 80 || (await l.count().catch(() => 1))) return l;
    const byLabel = s.page.getByText(a.label, { exact: true }).first();
    return (await byLabel.count().catch(() => 0)) ? byLabel : l;
  };
  const run = async (a) => {
    const o = { timeout: E.actionTimeoutMs };
    s.guard.allowPost = allowed(a);
    switch (a.a) {
      case 'click': await (await find(a)).click(o); break;
      case 'hover': await (await find(a)).hover(o); break;
      case 'select': await (await find(a)).selectOption({ index: a.index }, o); break;
      case 'fill': { const l = await find(a); await l.fill(a.value, o); await l.evaluate((e) => e.blur()).catch(() => {}); break; }
      case 'press': await (await find(a)).press(a.value, o); break;
      case 'validate': await s.page.evaluate((g) => __pw.validate(g), a.group); break;
      case 'fillall':
        for (const f of a.fields) {
          const l = await find(f);
          if (f.a === 'select') await l.selectOption({ index: f.index }, o);
          else { await l.fill(f.value, o); await l.evaluate((e) => e.blur()).catch(() => {}); }
        }
        await (await find(a)).click(o);
        break;
    }
  };

  try {
    const base = await reset();
    // volatile = what the survey saw move, plus anything moving now (a short second look)
    const vol = { items: new Set(sv.volatile.items), texts: new Set(sv.volatile.texts), scrollSels: new Set(sv.behavior?.scrollSels || []) };
    await s.page.waitForTimeout(2000);
    { const d = diff(base, await snap()); for (const k of keysOf(d)) vol.items.add(k); for (const t of [...d.textsAdded, ...d.textsRemoved]) vol.texts.add(t); }
    const inScope = sv.scope ? new Set(sv.scope.keys) : null;
    const scoped = (k) => !inScope || inScope.has(k);
    // the live page now, else what the survey saw: keys can drift on a live site, the survey's selector still gets a try
    const known = new Map(sv.elements.map((e) => [e.key, e]));
    const extra = new Set(sv.hoverTargets.map((h) => h.key));
    const itemOf = (k) => base.items[k] || known.get(k)?.item;
    const planned = [...new Set([...plan.hover, ...plan.actions].map((e) => e.key))];
    const drift = planned.filter((k) => !base.items[k] && !extra.has(k));
    log(`  [stage 4] plan (${pl.source === 'auto' ? 'rule-based, --auto' : 'your agent'}): ${plan.hover.length} hovers, ${plan.actions.length} actions, budget ${E.timeBudgetSec}s`);
    if (drift.length) log(`  ! ${drift.length} planned key(s) not on the page right now (live data?), trying the survey's selectors: ${drift.slice(0, 5).join(', ')}${drift.length > 5 ? ', …' : ''}`);

    const transitions = [], hovers = [], focus = [], noEffect = [], errors = [], revealed = new Set();
    let dirty = false, actions = 0;
    const reloads = { hover: 0, actions: 0 }; let phase = 'hover';
    const ensureBase = async () => { if (dirty) { reloads[phase]++; await reset(); dirty = false; } };
    // cheap "is the page still as loaded?" check (one snapshot, no reload): a reload is 15-20 s on a busy site
    const recheck = async () => { const now = await snap().catch(() => null); dirty = !now || now.url !== base.url || any(diff(base, now, vol)); };

    const record = async (prefix, a, d, events, before, after, rawTiming) => {
      const id = 'T' + String(transitions.length + 1).padStart(2, '0');
      const it = (k) => after.items[k] || before.items[k] || {};
      const lab = (k) => ({ key: k, label: it(k).l || '', sel: it(k).s });
      const fx = {};
      fx.shown = topOnly(d.shown, after.items).map(lab);
      fx.added = topOnly(d.added, after.items).map(lab);
      fx.hidden = topOnly(d.hidden, before.items).map(lab);
      fx.removed = topOnly(d.removed, before.items).map(lab);
      for (const f of ['enabled', 'disabled', 'checked', 'unchecked']) fx[f] = d[f].map(lab);
      const appeared = new Set([...d.shown, ...d.added]); // "shown" already says it; its new text is part of that
      fx.changed = d.changed.filter((c) => !(appeared.has(c.key) && c.field === 't')).map((c) => ({ ...c, label: it(c.key).l || '', sel: it(c.key).s }));
      fx.textsAdded = d.textsAdded.slice(0, 20);
      fx.textsRemoved = d.textsRemoved.slice(0, 20);
      for (const k of Object.keys(fx)) if (!fx[k].length) delete fx[k];
      for (const k of [...d.shown, ...d.added]) revealed.add(k);
      // crop of what changed, on the page as it is now
      let shot;
      const boxes = [...d.shown, ...d.added, ...d.enabled, ...d.disabled, ...d.checked, ...d.unchecked, ...d.changed.map((c) => c.key)]
        .map((k) => after.items[k]?.b).filter(Boolean);
      if (!boxes.length) boxes.push(...[...d.hidden, ...d.removed].map((k) => before.items[k]?.b).filter(Boolean));
      if (boxes.length) {
        const x = Math.max(0, Math.min(...boxes.map((b) => b[0])) - 12), y = Math.max(0, Math.min(...boxes.map((b) => b[1])) - 12);
        const w = Math.min(1400, Math.max(...boxes.map((b) => b[0] + b[2])) + 12 - x), h = Math.min(1100, Math.max(...boxes.map((b) => b[1] + b[3])) + 12 - y);
        if (w > 2 && h > 2) {
          shot = `explore/shots/${id}.png`;
          await s.page.screenshot({ path: path.join(out, shot), fullPage: true, clip: { x, y, width: w, height: h } }).catch(() => { shot = undefined; });
        }
      }
      // how it moved: only the animated elements that belong to this action (the diff's elements, their ancestors/descendants, or what overlaps them)
      let timing;
      if (rawTiming) {
        const touched = [...d.shown, ...d.added, ...d.hidden, ...d.removed, ...d.changed.map((c) => c.key)].map((k) => after.items[k] || before.items[k]).filter(Boolean);
        timing = relevantTiming(rawTiming, touched.map((i) => i.s).filter(Boolean), touched.map((i) => i.b).filter(Boolean), [...d.textsAdded, ...d.textsRemoved]);
      }
      transitions.push({ id, depth: prefix.length + 1, prefix: prefix.map(sum), action: sum(a), effects: fx, events, url: after.url !== base.url ? after.url : undefined, shot, ...(timing ? { timing } : {}) });
      return id;
    };

    const queue = [], seen = new Set();
    const sig = (a) => `${a.a}:${a.key}:${a.value ?? a.index ?? a.group ?? ''}`;
    const enqueue = (prefix, steps) => { const k = [...prefix, ...steps].map(sig).join('>'); if (!seen.has(k)) { seen.add(k); queue.push({ prefix, steps }); } };
    // controls a state revealed (not plannable up front), folded by group (a mega menu with 60 look-alike links = a few) and capped per group over the whole run
    const followed = new Map();
    const newControls = (d, after) => {
      const ks = [...d.added, ...d.shown].filter((k) => after.items[k]?.i && after.items[k].e);
      const keep = pickGroups(ks.map((k) => [k, after.items[k]]), E.perGroupActions ?? 2, E.perTrigger ?? 10);
      return ks.filter((k) => {
        if (!keep.has(k)) return false;
        const g = after.items[k].g ?? k;
        if ((followed.get(g) || 0) >= (E.followPerGroup ?? 4)) return false;
        followed.set(g, (followed.get(g) || 0) + 1);
        return true;
      });
    };

    // ---------- 1. hover (in plan order): style changes + hover-revealed content (menus, tooltips) ----------
    const phaseUp = (frac) => Date.now() - t0 > E.timeBudgetSec * 1000 * frac; // each phase has its own share, so hover can't eat the whole budget
    let hovered = 0;
    for (const { key } of plan.hover) {
      if (phaseUp(E.hoverShare ?? 0.45)) { log(`  ! hover phase hit its time share: ${plan.hover.length - hovered} planned hovers skipped`); break; }
      hovered++;
      const it = itemOf(key);
      if (!it) continue;
      try {
        await ensureBase();
        const pre = await snap();
        const st0 = await s.page.evaluate((q) => __pw.styleFor(q), it.s);
        const timed = E.timing !== false && await timingStart(s.page);
        await loc(it.s).hover({ timeout: E.hoverTimeoutMs ?? 1000 });
        await s.page.waitForTimeout(timed ? Math.max(E.hoverMs, E.timingMs ?? 450) : E.hoverMs); // a 300 ms fade must have finished before the sampler stops
        const rawTiming = timed ? await timingStop(s.page) : null;
        const st1 = await s.page.evaluate((q) => __pw.styleFor(q), it.s);
        const style = styleDelta(st0, st1);
        if (Object.keys(style).length) hovers.push({ key, label: it.l, style });
        const after = await snap();
        const d = diff(pre, after, vol); // against the state just before THIS hover: an earlier menu still open, or a rotating banner, is not this hover's effect
        if (any(d)) {
          const a = { a: 'hover', key, sel: it.s, label: it.l };
          await record([], a, d, [], pre, after, rawTiming);
          if (E.maxDepth > 1) for (const k of newControls(d, after)) for (const ch of chainsFor(k, after.items[k], ctrl[k], valsFor(k), E)) enqueue([a], ch.slice(0, 1));
        }
      } catch { /* covered / off-screen / detached: nothing changed, move on without a reload */ }
      await s.page.mouse.move(viewport.width - 1, viewport.height - 1).catch(() => {}); // hover is read-only: no reload between hovers
    }
    await s.page.mouse.move(0, 0).catch(() => {});

    // ---------- 2. focus rings of the planned fields/buttons ----------
    for (const key of planned) {
      const it = itemOf(key);
      if (!it?.v || !/^(text|button|select)$/.test(it.i || '')) continue;
      if (phaseUp(E.focusShare ?? 0.55)) break;
      try {
        const st0 = await s.page.evaluate((q) => __pw.styleFor(q), it.s);
        await loc(it.s).focus({ timeout: 2000 });
        const style = styleDelta(st0, await s.page.evaluate((q) => __pw.styleFor(q), it.s));
        if (Object.keys(style).length) focus.push({ key, label: it.l, style });
        await loc(it.s).evaluate((e) => e.blur());
      } catch {}
    }
    await recheck();

    phase = 'actions';
    // ---------- 3. actions, in plan order: each element's chain (fields: invalid values, then a valid one), validation groups, submit probes ----------
    const skipped = [];
    for (const e of plan.actions) {
      const it = itemOf(e.key);
      const chs = it ? chainsFor(e.key, it, ctrl[e.key], valsFor(e.key), E) : [];
      if (it?.i === 'text' && chs.length && (e.value !== undefined || e.enter)) {
        const ch = chs[0];
        if (e.value !== undefined) ch[ch.length - 1] = { ...ch[ch.length - 1], value: e.value, why: e.why || 'planned value' };
        if (e.enter) ch.push({ ...ch[ch.length - 1], a: 'press', value: 'Enter', why: 'press Enter' });
      }
      if (!chs.length) skipped.push(e.key);
      for (const ch of chs) enqueue([], ch);
    }
    if (skipped.length) log(`  ! ${skipped.length} planned action(s) have nothing to do (plain links / read-only): ${skipped.slice(0, 5).join(', ')}`);
    for (const g of [...new Set((wf.validators || []).map((v) => v.group || ''))])
      enqueue([], [{ a: 'validate', key: `validation-group-${g || 'default'}`, group: g, label: `validation group "${g || '(default)'}"` }]);
    // "submit": true in the plan = fill every field of its form with valid values, then press it (a whole-page form makes every button look like a submit: the planner decides)
    const submitKeys = new Set(plan.actions.filter((e) => e.submit).map((e) => e.key));
    await ensureBase();
    for (const c of controls.filter((c) => submitKeys.has(c.key) && scoped(c.key))) {
      let keys = [];
      if (c.postback?.validate) keys = [...new Set((wf.validators || []).filter((v) => (v.group || '') === (c.postback.group || '')).map((v) => v.targetKey).filter(Boolean))];
      if (!keys.length) keys = await s.page.evaluate((q) => __pw.scopeFields(q), c.sel).catch(() => []);
      const fields = keys.map((k) => ({ k, it: base.items[k], c: ctrl[k] })).filter((f) => f.it?.v && f.it.e && f.c && !f.c.readOnly).map(({ k, it, c: fc }) => {
        if (it.i === 'select') { const i = (fc.options || []).findIndex((o, j) => j > 0 && o.v && !o.d); return i > 0 ? { a: 'select', key: k, sel: it.s, label: it.l, index: i, value: fc.options[i].t } : null; }
        const v = plan.actions.find((x) => x.key === k)?.value; // the agent's value for that field, if it gave one
        return it.i === 'text' ? { a: 'fill', key: k, sel: it.s, label: it.l, value: v ?? samples(fc, valsFor(k)).valid, why: 'valid' } : null;
      }).filter(Boolean);
      if (fields.length) enqueue([], [{ a: 'fillall', key: c.key, sel: c.sel, label: c.label, fields, why: 'all fields valid, then press' }]);
    }

    while (queue.length) {
      if (timeUp() || actions >= E.maxActions) break;
      const next = queue.findIndex((q) => !q.prefix.length); // the plan first (in its order), then follow-ups of what it revealed
      const { prefix, steps } = queue.splice(Math.max(0, next), 1)[0];
      await ensureBase();
      dirty = true; // until this chain has been checked
      try {
        for (const p of prefix) { await run(p); await s.settle(undefined, E.quietMaxMs ?? 8000); }
      } catch (e) { errors.push({ prefix: prefix.map(sum), error: e.message.split('\n')[0] }); await recheck(); continue; }
      let before = await snap(), sent = false;
      const done = [];
      for (const a of steps) {
        actions++;
        const mark = s.guard.events.length;
        const nav0 = before.url;
        let error;
        const timed = E.timing !== false && await timingStart(s.page);
        try { await run(a); await s.settle(undefined, E.quietMaxMs ?? 8000); } catch (e) { error = e.message.split('\n')[0]; }
        const rawTiming = timed && !error ? await timingStop(s.page) : null;
        s.guard.allowPost = cfg.mode !== 'readonly';
        const after = await snap();
        const events = s.guard.events.slice(mark).filter((e) => EVENTS.has(e.type)).map(({ at, ...e }) => e);
        const spa = await s.page.evaluate(() => window.__pwNav || []).catch(() => []);
        if (after.url !== nav0 && !events.some((e) => e.type === 'navigation')) events.push({ type: 'navigation', kind: 'client', url: after.url, history: spa.slice(-3) });
        if (error) { errors.push({ prefix: [...prefix, ...done].map(sum), action: sum(a), error }); before = after; break; } // failed click: page unchanged, no reload unless the check below finds a trace
        const d = diff(before, after, vol);
        // the trigger's own value/checked/class change is the action itself, not an effect
        const own = d.changed.filter((c) => c.key === a.key);
        d.changed = d.changed.filter((c) => c.key !== a.key);
        d.checked = d.checked.filter((k) => k !== a.key);
        d.unchecked = d.unchecked.filter((k) => k !== a.key);
        if (a.a === 'fillall') { const fk = new Set(a.fields.map((f) => f.key)); d.changed = d.changed.filter((c) => !(fk.has(c.key) && c.field === 'val')); }
        if (a.a === 'click' && ctrl[a.key]?.kind === 'radio') d.unchecked = d.unchecked.filter((k) => ctrl[k]?.group !== ctrl[a.key]?.group);
        if (any(d) || events.length) {
          await record([...prefix, ...done], a, d, events, before, after, rawTiming);
          if (prefix.length + 1 < E.maxDepth) for (const k of newControls(d, after)) for (const ch of chainsFor(k, after.items[k], ctrl[k], valsFor(k), E)) enqueue([...prefix, ...done, a], ch);
        } else noEffect.push({ ...sum(a), ownChange: own.length ? own.map((c) => c.field) : undefined });
        done.push(a);
        before = after;
        // a server round-trip or navigation replaces the page: the rest of the chain no longer starts where it expects
        if (events.some((e) => e.type === 'navigation' || (e.type === 'postback' && e.status === 'sent'))) { sent = true; break; }
      }
      // reload only if the chain left a trace: a reload per chain was most of the explore time
      dirty = sent || before.url !== base.url || any(diff(base, before, vol));
      // an open menu / dialog usually closes on Escape: try that before paying for a reload
      if (dirty && !sent && before.url === base.url) { await s.page.keyboard.press('Escape').catch(() => {}); await s.page.waitForTimeout(250); await recheck(); }
    }
    log(`  [stage 4] explored: ${actions} actions, ${transitions.length} transitions, ${hovers.length} hover styles, ${errors.length} errors, reloads hover ${reloads.hover} / actions ${reloads.actions}${queue.length ? `, left at the limit: ${queue.filter((q) => !q.prefix.length).length} planned (raise "budgetSec" in the plan) + ${queue.filter((q) => q.prefix.length).length} follow-ups of revealed controls` : ''}`);

    // ---------- what's left: hidden-at-load elements nothing revealed, plain links, limits ----------
    const validatorKeys = new Set((wf.validators || []).map((v) => v.key).concat((wf.summaries || []).map((v) => v.key)));
    const shownUnder = (k) => { for (let p = k; p; p = base.items[p]?.p) if (revealed.has(p)) return true; return false; };
    const hiddenKeys = Object.keys(base.items).filter((k) => !base.items[k].v && !vol.items.has(k) && !validatorKeys.has(k) && !shownUnder(k));
    const unexplained = topOnly(hiddenKeys, base.items).slice(0, 150).map((k) => ({ key: k, label: base.items[k].l, sel: base.items[k].s, kind: base.items[k].i }));
    const links = controls.filter((c) => c.kind === 'link' && ['url', 'external', 'other'].includes(c.hrefKind)).map((c) => ({ key: c.key, label: c.label, href: c.href, target: c.target, visible: c.visible }));

    fs.writeFileSync(path.join(cap, 'assets', 'index.json'), JSON.stringify(await s.flush(), null, 1));
    const states = {
      url, mode: cfg.mode, viewport, dpr, exploredAt: new Date().toISOString(),
      baseline: { title: base.title, height: base.h, keys: Object.keys(base.items) },
      scope: sv.scope,
      plan: { source: pl.source, hover: plan.hover.length, actions: plan.actions.length, drift, skipped },
      hoverTargets: sv.hoverTargets,
      volatile: { items: [...vol.items], texts: [...vol.texts].slice(0, 50) },
      transitions, hovers, focus, noEffect, errors, unexplained, links,
      limits: { actions, reloads, queueLeft: queue.length, timeUp: timeUp(), ms: Date.now() - t0, maxActions: E.maxActions, maxDepth: E.maxDepth },
    };
    fs.writeFileSync(path.join(dir, 'states.json'), JSON.stringify(states, null, 1));
    return states;
  } finally { await s.close(); }
}
