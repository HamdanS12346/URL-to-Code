// What a still photo cannot show: which elements the page's JavaScript reacts to on hover, what happens while scrolling
// (sticky / fixed / hide-on-scroll parts), and what the page's videos do (autoplay, loop, their pause button).
// Everything is measured on the live page, in real time, read-only. Nothing here is specific to a site.
//   RECORDER     init script: notes every hover/scroll listener the page registers (before its own scripts run)
//   scanHover    elements with a hover handler (direct, inline, jQuery, React/Vue, jQuery-delegated) -> the planner must cover them
//   scrollProbe  scrolls down and back up; records fixed/sticky parts that appear, disappear, shrink or hide on the way
//   mediaProbe   <video>/<audio>, animated images, canvases; clicks each video's play/pause/mute control and reads the result
//   renderBrief  the markdown section the planner (and later the spec writer) reads
// Used by explore.mjs (survey, stage 2) and verify.mjs (the same probes on the rebuild, then compared).
import fs from 'node:fs';
import path from 'node:path';

const fnSrc = (f) => `(${f.toString()})()`;

// ---------- 1. listener recorder ----------
function recorder() {
  if (window.__pwL) return;
  const HOVER = /^(mouseenter|mouseover|pointerenter|pointerover|mouseleave|mouseout|pointerleave|pointerout)$/;
  const SCROLLY = /^(scroll|wheel|touchmove)$/;
  const L = (window.__pwL = { wm: new WeakMap(), list: [], win: [], doc: [], io: 0 });
  const add = (arr, t) => { if (!arr.includes(t)) arr.push(t); };
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, opts) {
    try {
      if (typeof type === 'string' && (HOVER.test(type) || SCROLLY.test(type))) {
        if (this === window) add(L.win, type);
        else if (this === document || this === document.documentElement || this === document.body) add(L.doc, type);
        else if (this instanceof Element) {
          let s = L.wm.get(this);
          if (!s) { s = []; L.wm.set(this, s); if (L.list.length < 6000) L.list.push(new WeakRef(this)); }
          add(s, type);
        }
      }
    } catch { /* never break the page */ }
    return orig.apply(this, arguments);
  };
  const IO = window.IntersectionObserver;
  if (IO) {
    try {
      window.IntersectionObserver = class extends IO {
        observe(t) { try { L.io++; } catch { /* ignore */ } return super.observe(t); }
      };
    } catch { /* ignore */ }
  }
}
export const RECORDER = fnSrc(recorder);

// ---------- 2. hover handlers ----------
function hoverScan() {
  const L = window.__pwL || { list: [], wm: new WeakMap(), win: [], doc: [], io: 0 };
  const jq = window.jQuery && window.jQuery._data ? window.jQuery : null;
  const ENTER = /^(mouseenter|mouseover|pointerenter|pointerover)$/i;
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const sel = __pw.makeSel();
  const found = new Map();
  const add = (el, type, via) => {
    if (!el || !(el instanceof Element) || el === document.body || el === document.documentElement) return;
    const f = found.get(el) || { types: [], via: [] };
    if (!f.types.includes(type)) f.types.push(type);
    if (!f.via.includes(via)) f.via.push(via);
    found.set(el, f);
  };
  for (const ref of L.list) {
    const el = ref.deref();
    if (el && el.isConnected) for (const t of L.wm.get(el) || []) if (ENTER.test(t)) add(el, t.toLowerCase(), 'addEventListener');
  }
  const delegated = [];
  if (jq) for (const host of [document, document.body]) {
    let ev; try { ev = jq._data(host, 'events'); } catch { ev = null; }
    if (ev) for (const t in ev) if (ENTER.test(t)) for (const h of ev[t]) if (h.selector) delegated.push({ type: t, selector: h.selector });
  }
  let n = 0;
  for (const el of document.body.querySelectorAll('*')) {
    if (++n > 9000) break;
    for (const a of ['onmouseenter', 'onmouseover', 'onpointerenter', 'onpointerover']) if (el[a] || el.hasAttribute(a)) add(el, a.slice(2), 'inline');
    if (jq) { let ev; try { ev = jq._data(el, 'events'); } catch { ev = null; } if (ev) for (const t in ev) if (ENTER.test(t)) add(el, t.toLowerCase(), 'jquery'); }
    for (const k of Object.keys(el)) {
      if (k.startsWith('__reactProps$')) { const p = el[k] || {}; for (const h of ['onMouseEnter', 'onMouseOver', 'onPointerEnter']) if (typeof p[h] === 'function') add(el, h.slice(2).toLowerCase(), 'react'); }
      else if (k === '_vei' && el._vei) for (const h in el._vei) if (/^onMouse(enter|over)$/i.test(h) || /^onPointer(enter|over)$/i.test(h)) add(el, h.slice(2).toLowerCase(), 'vue');
    }
  }
  for (const d of delegated) {
    let list = []; try { list = [...document.querySelectorAll(d.selector)].slice(0, 60); } catch { /* bad selector */ }
    for (const el of list) add(el, d.type.toLowerCase(), 'jquery-delegated');
  }
  const part = (e) => (e ? e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className.split(/\s+/).filter(Boolean).map((c) => c.replace(/\d+/g, '#')).sort().join('.') : '') : '');
  const elements = [];
  for (const [el, f] of found) {
    if (!__pw.vis(el)) continue;
    const r = el.getBoundingClientRect();
    const own = clean([...el.childNodes].filter((x) => x.nodeType === 3).map((x) => x.textContent).join(' ')) || clean(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent);
    elements.push({ sel: sel(el), label: own.slice(0, 40), types: f.types, via: f.via, g: part(el) + '<' + part(el.parentElement), box: [r.x + scrollX, r.y + scrollY, r.width, r.height].map(Math.round) });
  }
  elements.sort((a, b) => a.box[1] - b.box[1] || a.box[0] - b.box[0]);
  return {
    elements: elements.slice(0, 200),
    pageLevel: { window: L.win, document: L.doc, intersectionObservers: L.io, jquery: !!jq, delegated: [...new Set(delegated.map((d) => d.selector))].slice(0, 40) },
  };
}
export async function scanHover(page) {
  return page.evaluate(fnSrc(hoverScan)).catch(() => ({ elements: [], pageLevel: {} }));
}

// ---------- 3. scroll probe ----------
function scrollState() {
  const sel = __pw.makeSel(), vw = innerWidth, vh = innerHeight;
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const els = [], taken = new Set();
  let n = 0;
  for (const el of document.body.querySelectorAll('*')) {
    if (++n > 9000) break;
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
    let up = el.parentElement, nested = false;
    while (up) { if (taken.has(up)) { nested = true; break; } up = up.parentElement; }
    if (nested) continue;
    taken.add(el);
    const r = el.getBoundingClientRect();
    const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.02 && r.width > 1 && r.height > 1 && r.bottom > 1 && r.top < vh - 1 && r.right > 1 && r.left < vw - 1;
    const label = clean(el.getAttribute('aria-label') || el.textContent).slice(0, 40) || (el.querySelector('img[alt]') || {}).alt || '';
    els.push({
      sel: sel(el), tag: el.tagName.toLowerCase(), pos: cs.position, vis: visible, r: [r.left, r.top, r.width, r.height].map(Math.round),
      cls: typeof el.className === 'string' ? el.className : '', op: Math.round(+cs.opacity * 100) / 100, tf: cs.transform === 'none' ? '' : cs.transform,
      z: cs.zIndex, label: clean(label),
    });
  }
  return { y: Math.round(scrollY), vh, els, html: document.documentElement.className, body: document.body.className,
    h: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) };
}
const toks = (s) => (s || '').split(/\s+/).filter(Boolean);
const diffCls = (a, b) => { const A = new Set(toks(a)), B = new Set(toks(b)); return { added: [...B].filter((x) => !A.has(x)), removed: [...A].filter((x) => !B.has(x)) }; };
const anchorOf = (r, vw, vh) => {
  const [x, y, w, h] = r, v = [], hz = [];
  if (y <= 2) v.push('top'); else if (y + h >= vh - 2) v.push('bottom');
  if (x <= 2 && w < vw * 0.9) hz.push('left'); else if (x + w >= vw - 2 && w < vw * 0.9) hz.push('right');
  return [...v, ...hz].join('-') || 'floating';
};

export async function scrollProbe(page, { dir, log = () => {}, maxStops = 14, waitMs = 450, shots = 3 } = {}) {
  const state = () => page.evaluate(fnSrc(scrollState));
  const goto = async (y) => { await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(waitMs); return state(); };
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(waitMs);
  const first = await state();
  const vh = first.vh, vw = await page.evaluate(() => innerWidth);
  const down = [first];
  // down in steps of ~55% of the viewport, coarser on a very tall page so the whole length is covered in maxStops stops;
  // the page may grow while it scrolls (lazy content), so the end is re-read at each stop
  const step = Math.max(Math.round(vh * 0.55), Math.ceil((first.h - vh) / Math.max(1, maxStops - 1)));
  for (let y = 0; down.length < maxStops;) {
    const maxY = Math.max(0, down[down.length - 1].h - vh);
    if (y >= maxY) break;
    y = Math.min(maxY, y + step);
    down.push(await goto(y));
  }
  // and back up through the same positions: a header that hides on the way down and returns on the way up is only seen here
  const up = [];
  for (const s of [...down].reverse().slice(1)) up.push(await goto(s.y));

  const at = (list, sel, i) => list[i]?.els.find((e) => e.sel === sel);
  const sels = [...new Set([...down, ...up].flatMap((s) => s.els.filter((e) => e.vis).map((e) => e.sel)))];
  const raw = [];
  for (const sel of sels) {
    const dv = down.map((_, i) => !!at(down, sel, i)?.vis), uv = up.map((_, i) => !!at(up, sel, i)?.vis);
    const any = [...down, ...up].map((_, i) => (i < down.length ? at(down, sel, i) : at(up, sel, i - down.length))).find((e) => e && e.vis);
    const entry = { sel, tag: any.tag, pos: any.pos, label: any.label, z: any.z, cls: any.cls };
    if (dv.every(Boolean)) {
      entry.kind = 'always';
      entry.rect = at(down, sel, 0).r;
      const e0 = at(down, sel, 0);
      const last = down.length - 1;
      const eN = at(down, sel, last);
      const c = diffCls(e0.cls, eN.cls);
      if (c.added.length || c.removed.length || Math.abs(e0.r[3] - eN.r[3]) > 3 || Math.abs(e0.r[2] - eN.r[2]) > 3) {
        const firstChange = down.findIndex((_, i) => { const e = at(down, sel, i); return e && (e.cls !== e0.cls || Math.abs(e.r[3] - e0.r[3]) > 3 || Math.abs(e.r[2] - e0.r[2]) > 3); });
        entry.change = { fromY: down[Math.max(0, firstChange - 1)].y, toY: down[firstChange].y, cls: c, from: e0.r, to: eN.r, _sel: sel, _first: e0 };
      }
    } else if (!dv[0] && dv.some(Boolean)) {
      const i = dv.findIndex(Boolean);
      entry.kind = 'appears';
      entry.lo = down[i - 1].y; entry.hi = down[i].y;
      entry.rect = at(down, sel, i).r;
      // gone again further down, or when scrolling back up?
      const j = dv.findIndex((v, k) => k > i && !v);
      if (j > 0) entry.hidesAgainAt = down[j].y;
      if (uv.length) entry.hidesAtTop = !uv[uv.length - 1]; // checked on the way back up, not assumed
    } else if (dv[0] && !dv.every(Boolean)) {
      const i = dv.findIndex((v) => !v);
      entry.kind = 'disappears';
      entry.lo = down[i - 1].y; entry.hi = down[i].y;
      entry.rect = at(down, sel, 0).r;
    } else continue;
    // visible on the way up at a position where it was hidden on the way down (or the reverse): hide-on-scroll-down headers
    const ups = [...up].map((s, k) => ({ y: s.y, vis: !!at(up, sel, k)?.vis }));
    const mismatch = ups.filter((u) => { const k = down.findIndex((d) => d.y === u.y); return k >= 0 && dv[k] !== u.vis; });
    if (mismatch.length) entry.directional = { y: mismatch.map((m) => m.y), upVisible: mismatch.map((m) => m.vis) };
    raw.push(entry);
  }

  // narrow "between y1 and y2" down to ~15px (bisection on the live page): pred(state) says whether the thing has changed by then
  const bisect = async (lo, hi, pred) => {
    for (let k = 0; k < 6 && hi - lo > 15; k++) {
      const mid = Math.round((lo + hi) / 2);
      if (pred(await goto(mid))) hi = mid; else lo = mid;
    }
    return hi;
  };
  let refined = 0, changes = 0, roots = 0; // separate budgets: each bisection costs ~6 scroll steps
  for (const e of raw) {
    if (!(e.kind === 'appears' || e.kind === 'disappears') || refined >= 4) continue;
    let lo = e.lo, hi = e.hi;
    for (let k = 0; k < 6 && hi - lo > 15; k++) {
      const mid = Math.round((lo + hi) / 2);
      const s = await goto(mid);
      const vis = !!s.els.find((x) => x.sel === e.sel)?.vis;
      if (e.kind === 'appears' ? vis : !vis) hi = mid; else lo = mid;
    }
    e.lo = lo; e.hi = hi; e.at = hi; refined++;
  }
  for (const e of raw) if (e.at === undefined && e.hi !== undefined) e.at = e.hi;

  for (const e of raw) {
    if (!e.change || changes >= 3) continue;
    const e0 = e.change._first;
    e.change.toY = await bisect(e.change.fromY, e.change.toY, (s) => { const x = s.els.find((q) => q.sel === e.change._sel); return !!x && (x.cls !== e0.cls || Math.abs(x.r[3] - e0.r[3]) > 3 || Math.abs(x.r[2] - e0.r[2]) > 3); });
    changes++;
  }
  for (const e of raw) if (e.change) { delete e.change._sel; delete e.change._first; }

  // body / html classes that change with the scroll position (e.g. a "scrolled" class that restyles the header)
  const rootChanges = [];
  for (const k of ['html', 'body']) {
    const c = diffCls(first[k], down[down.length - 1][k]);
    if (c.added.length || c.removed.length) {
      const i = down.findIndex((s) => s[k] !== first[k]);
      const lo = down[Math.max(0, i - 1)].y;
      rootChanges.push({ el: k, fromY: lo, toY: roots < 3 ? (roots++, await bisect(lo, down[i].y, (s) => s[k] !== first[k])) : down[i].y, ...c });
    }
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(waitMs);

  // pictures: the top, then the viewport at the first few interesting positions
  const behaviors = raw.map((b, i) => ({ id: 'S' + String(i + 1).padStart(2, '0'), ...b, anchor: anchorOf(b.rect, vw, vh) }));
  let shotN = 0;
  if (dir && behaviors.length) {
    fs.mkdirSync(dir, { recursive: true });
    const shoot = async (name, y) => { await goto(y); const f = path.join(dir, name); await page.screenshot({ path: f, type: 'jpeg', quality: 60 }).catch(() => {}); return fs.existsSync(f) ? name : undefined; };
    const top = await shoot('y0.jpg', 0);
    for (const b of behaviors) {
      if (shotN >= shots) break;
      const y = b.at ?? b.change?.toY ?? down[Math.min(1, down.length - 1)].y;
      b.shot = await shoot(`${b.id}.jpg`, y);
      shotN++;
    }
    if (top) behaviors.top = top;
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }
  log(`  [behave] scroll: ${down.length} stops down, ${up.length} up, ${behaviors.length} behavior(s)${behaviors.length ? ': ' + behaviors.map((b) => `${b.id} ${b.kind} ${b.label || b.sel}`.slice(0, 50)).join('; ') : ''}`);
  return { viewport: { width: vw, height: vh }, docHeight: down[down.length - 1].h, stops: down.map((s) => s.y), behaviors: behaviors.map((b) => ({ ...b })), rootChanges, topShot: behaviors.top };
}

// ---------- 4. media ----------
function mediaScan() {
  const sel = __pw.makeSel();
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const videos = [...document.querySelectorAll('video,audio')].slice(0, 12).map((v) => {
    const r = v.getBoundingClientRect();
    return { sel: sel(v), tag: v.tagName.toLowerCase(), src: v.currentSrc || v.src || (v.querySelector('source') || {}).src || '', poster: v.poster || '',
      autoplay: v.autoplay || v.hasAttribute('autoplay'), loop: v.loop, muted: v.muted, controls: v.controls, playsInline: !!v.playsInline,
      paused: v.paused, t: v.currentTime, ready: v.readyState, visible: __pw.vis(v), box: [r.x + scrollX, r.y + scrollY, r.width, r.height].map(Math.round) };
  });
  const images = [...document.images].filter((i) => /\.(gif|apng)(\?|#|$)/i.test(i.currentSrc || i.src) && __pw.vis(i)).slice(0, 12).map((i) => {
    const r = i.getBoundingClientRect();
    return { sel: sel(i), src: i.currentSrc || i.src, box: [r.x + scrollX, r.y + scrollY, r.width, r.height].map(Math.round) };
  });
  const canvases = [...document.querySelectorAll('canvas')].filter((c) => __pw.vis(c)).length;
  const lottie = document.querySelectorAll('lottie-player,dotlottie-player,dotlottie-wc,[data-lottie],[data-animation-path]').length;
  // play / pause / mute controls near each video: buttons in its nearest few ancestors whose label or class says so
  const WORD = /(pause|play|stop|resume|mute|sound|volume|audio)/i;
  const controls = videos.map((m) => {
    const v = document.querySelector(m.sel);
    const found = [];
    let host = v && v.parentElement;
    for (let d = 0; host && d < 5; d++, host = host.parentElement) {
      for (const c of host.querySelectorAll('button,[role=button],a,[tabindex]:not([tabindex="-1"]),input[type=button]')) {
        if (c === v || v.contains(c) || !__pw.vis(c) || found.some((f) => f.el === c)) continue;
        const text = clean(c.getAttribute('aria-label') || c.getAttribute('title') || c.textContent || c.value || '');
        const hay = text + ' ' + (typeof c.className === 'string' ? c.className : '') + ' ' + (c.id || '');
        if (WORD.test(hay)) found.push({ el: c, sel: sel(c), label: text.slice(0, 40), depth: d });
      }
      if (found.length >= 3) break;
    }
    return found.slice(0, 3).map(({ sel: s, label, depth }) => ({ sel: s, label, depth }));
  });
  return { videos, images, canvases, lottie, controls };
}

export async function mediaProbe(page, { log = () => {}, guard } = {}) {
  const scan = await page.evaluate(fnSrc(mediaScan)).catch(() => null);
  if (!scan) return { videos: [], images: [], canvases: 0, lottie: 0 };
  const read = (sel) => page.evaluate((s) => { const v = document.querySelector(s); return v ? { paused: v.paused, muted: v.muted, t: v.currentTime, ended: v.ended } : null; }, sel).catch(() => null);
  const out = [];
  for (const [i, v] of scan.videos.entries()) {
    // autoplay is often gated on visibility: bring it into view, then watch the clock for a moment
    await page.evaluate((s) => { const e = document.querySelector(s); if (e) e.scrollIntoView({ block: 'center', behavior: 'instant' }); }, v.sel).catch(() => {});
    await page.waitForTimeout(700);
    const a = await read(v.sel);
    await page.waitForTimeout(1200);
    const b = await read(v.sel);
    // playing = not paused and the clock moved. A short loop can wrap between the two readings (time goes DOWN), so any change counts
    const entry = { ...v, playing: !!(a && b && !b.paused && Math.abs(b.t - a.t) > 0.05), pausedAfterWatch: b ? b.paused : null, controlTests: [] };
    // click each candidate control once and see what the video did; click again to restore
    const prevPost = guard ? guard.allowPost : undefined;
    if (guard) guard.allowPost = false; // discovery is read-only
    for (const c of (scan.controls[i] || []).slice(0, 2)) {
      const before = await read(v.sel);
      if (!before) break;
      let clicked = true;
      try { await page.locator(c.sel).first().click({ timeout: 1500 }); } catch { clicked = false; }
      await page.waitForTimeout(500);
      const after = await read(v.sel);
      const t = { sel: c.sel, label: c.label, clicked };
      if (clicked && after) {
        t.pausedBefore = before.paused; t.pausedAfter = after.paused; t.mutedBefore = before.muted; t.mutedAfter = after.muted;
        t.effect = after.paused !== before.paused ? (after.paused ? 'pauses' : 'plays') : after.muted !== before.muted ? 'toggles mute' : 'none';
        if (t.effect !== 'none') { // restore, and confirm the same control undoes it
          try { await page.locator(c.sel).first().click({ timeout: 1500 }); } catch { /* ignore */ }
          await page.waitForTimeout(500);
          const back = await read(v.sel);
          t.undoneByReclick = !!back && back.paused === before.paused && back.muted === before.muted;
        }
      }
      await page.keyboard.press('Escape').catch(() => {});
      entry.controlTests.push(t);
    }
    if (guard) guard.allowPost = prevPost;
    out.push(entry);
  }
  const res = { videos: out.map((v, i) => ({ id: 'V' + String(i + 1).padStart(2, '0'), ...v })), images: scan.images, canvases: scan.canvases, lottie: scan.lottie };
  log(`  [behave] media: ${out.length} video/audio (${out.filter((v) => v.playing).length} playing), ${scan.images.length} animated image(s), ${scan.canvases} canvas(es)${out.some((v) => v.controlTests.length) ? `; controls tested: ${out.flatMap((v) => v.controlTests).map((t) => `${t.label || t.sel} → ${t.effect ?? (t.clicked ? '?' : 'not clickable')}`).join(', ')}` : ''}`);
  return res;
}

// ---------- 5. text the planner and the spec writer read ----------
const px = (r) => `${r[2]}×${r[3]}px at (${r[0]}, ${r[1]})`;
const where = (b) => (b.anchor === 'floating' ? 'a free position of the viewport' : `the ${b.anchor} of the viewport`);
export function scrollEars(b) {
  const who = `${b.label ? `"${b.label}" ` : ''}(${b.sel})`;
  if (b.kind === 'appears') {
    return `WHEN the page is scrolled down past about ${b.at ?? b.hi}px THE SYSTEM SHALL show ${who}, ${b.pos}-positioned at ${where(b)}, ${px(b.rect)}${b.hidesAgainAt !== undefined ? `, and hide it again below about ${b.hidesAgainAt}px` : ''}${b.hidesAtTop === true ? '; scrolling back to the top hides it again' : b.hidesAtTop === false ? '; it stays visible after scrolling back to the top' : ''}.`;
  }
  if (b.kind === 'disappears') return `WHEN the page is scrolled down past about ${b.at ?? b.hi}px THE SYSTEM SHALL hide ${who} (${b.pos}-positioned at ${where(b)}, ${px(b.rect)} at the top of the page).`;
  const parts = [`THE SYSTEM SHALL keep ${who} ${b.pos === 'fixed' ? 'fixed' : 'stuck'} at ${where(b)} while scrolling (${px(b.rect)})`];
  if (b.change) {
    const c = b.change, bits = [];
    if (c.cls.added.length || c.cls.removed.length) bits.push(`class ${[...c.cls.added.map((x) => '+' + x), ...c.cls.removed.map((x) => '−' + x)].join(' ')}`);
    if (Math.abs(c.from[3] - c.to[3]) > 3) bits.push(`height ${c.from[3]}→${c.to[3]}px`);
    if (Math.abs(c.from[2] - c.to[2]) > 3) bits.push(`width ${c.from[2]}→${c.to[2]}px`);
    parts.push(`WHEN scrolled past about ${c.toY}px THE SYSTEM SHALL change it: ${bits.join(', ')}`);
  }
  return parts.join('. ') + '.';
}
export function scrollDirectional(b) {
  if (!b.directional) return '';
  return ` It behaves differently on the way back up: at ${b.directional.y.join(', ')}px it is ${b.directional.upVisible[0] ? 'shown' : 'hidden'} when scrolling up (hide-on-scroll-down / show-on-scroll-up pattern).`;
}
export function mediaEars(v) {
  const who = `${v.tag} ${v.src ? `\`${String(v.src).split('/').pop().split('?')[0]}\`` : v.sel}`;
  const out = [];
  out.push(`THE SYSTEM SHALL ${v.playing ? 'play' : v.autoplay ? 'try to autoplay' : 'not autoplay'} ${who}${v.playing ? ' automatically' : ''}${v.muted ? ', muted' : ''}${v.loop ? ', looping' : ''}${v.controls ? ', with native controls' : ''}${v.poster ? `, poster \`${String(v.poster).split('/').pop().split('?')[0]}\`` : ''}.`);
  for (const t of v.controlTests || []) {
    if (!t.clicked) continue;
    if (t.effect === 'none') out.push(`The control "${t.label || t.sel}" (${t.sel}) had no effect on the playback state of ${who} when clicked (it may do something else).`);
    else out.push(`WHEN the user clicks "${t.label || t.sel}" (${t.sel}) THE SYSTEM SHALL ${t.effect === 'toggles mute' ? 'toggle the sound of' : t.effect === 'pauses' ? 'pause' : 'resume'} ${who}${t.undoneByReclick ? '; clicking it again reverses that' : ''}.`);
  }
  return out;
}

export function renderBrief({ hover, scroll, media, keyOf = () => undefined }) {
  const w = [];
  w.push('## Behavior brief (measured before planning: the plan must cover these)', '');
  w.push('This page was also watched while idle-hovering, scrolling and playing, so the plan is not limited to what a still picture shows.', '');
  const groups = hover?.groups || [];
  w.push('### Elements the page\'s JavaScript reacts to on hover');
  if (groups.length) {
    w.push('Every group below must appear in the plan: under `"hover"`, or `"actions"`, or under `"skip"` with a reason (checked by `npm run check:plan`).', '');
    w.push('| key (one per group) | label | handler | look-alikes |', '|---|---|---|---|');
    for (const g of groups) w.push(`| \`${g.keys[0]}\` | ${(g.label || '').replace(/\|/g, '\\|') || '-'} | ${g.types.join(', ')} (${g.via.join(', ')}) | ${g.keys.length > 1 ? '×' + g.keys.length + ' (also ' + g.keys.slice(1, 4).map((k) => '`' + k + '`').join(', ') + (g.keys.length > 4 ? ', …' : '') + ')' : ''} |`);
  } else w.push('None found: no visible element registers a hover handler (menus opened by CSS `:hover` are in the table above).');
  const pl = hover?.pageLevel || {};
  const lv = [pl.window?.length ? `window: ${pl.window.join(', ')}` : '', pl.document?.length ? `document/body: ${pl.document.join(', ')}` : '', pl.intersectionObservers ? `${pl.intersectionObservers} IntersectionObserver target(s)` : '', pl.delegated?.length ? `jQuery-delegated selectors: ${pl.delegated.slice(0, 8).map((s) => '`' + s + '`').join(', ')}` : ''].filter(Boolean);
  if (lv.length) w.push('', `Page-level listeners (the code reacts to scroll/hover somewhere): ${lv.join('; ')}.`);
  w.push('', '### Scroll behavior (the real page was scrolled down and back up)');
  const sb = scroll?.behaviors || [];
  if (sb.length) {
    w.push('Not planned: the pipeline records these itself. Cited later as `[S01]`… in the spec.', '');
    for (const b of sb) w.push(`- **[${b.id}]** ${scrollEars(b)}${scrollDirectional(b)}${b.shot ? ` — picture: \`explore/survey/scroll/${b.shot}\`` : ''}`);
  } else w.push('Nothing fixed, sticky or scroll-dependent was found.');
  for (const r of scroll?.rootChanges || []) w.push(`- WHEN the page is scrolled past about ${r.toY}px THE SYSTEM SHALL change the <${r.el}> class: ${[...r.added.map((x) => '+' + x), ...r.removed.map((x) => '−' + x)].join(' ')}.`);
  w.push('', '### Media (videos and animated images)');
  const vs = media?.videos || [];
  if (vs.length || media?.images?.length || media?.canvases || media?.lottie) {
    for (const v of vs) for (const [i, line] of mediaEars(v).entries()) w.push(`- ${i === 0 ? `**[${v.id}]** ` : ''}${line}`);
    for (const im of media?.images || []) w.push(`- Animated image \`${String(im.src).split('/').pop().split('?')[0]}\` (${im.sel}, ${im.box[2]}×${im.box[3]}px): keep the original file (it animates); do not replace it with a still.`);
    if (media?.canvases) w.push(`- ${media.canvases} visible <canvas> element(s): drawn by script, kept as pictures in capture/assets/_canvas/.`);
    if (media?.lottie) w.push(`- ${media.lottie} Lottie player element(s).`);
  } else w.push('No video, audio, animated image or canvas on the page.');
  w.push('');
  return w.join('\n');
}
