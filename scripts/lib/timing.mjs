// How long things take to move. The explore stage already performs every hover and click and diffs the page before/after;
// this adds a frame-by-frame look at what changed *while* it changed, so "the answer slides open" becomes
// "height 0 -> 96px over ~300 ms, ease-out" instead of a bare "shown".
//   in the page: a MutationObserver notes elements touched by the action, requestAnimationFrame measures them every frame,
//   and document.getAnimations() adds the exact numbers of CSS transitions / animations (hover transitions touch no DOM at all).
//   JavaScript-driven animations (jQuery slideDown, GSAP, hand-rolled rAF) are caught the same way, by measuring.
// Cost: the page is measured while the action's own wait runs; no extra waiting beyond a short hover top-up.
const num = (v) => Math.round(v * 100) / 100;

function sampler() {
  if (window.__pwT) return;
  const T = (window.__pwT = {});
  const r2 = (v) => Math.round((Number.isFinite(v) ? v : 0) * 100) / 100;
  const matrix = (s) => {
    if (!s || s === 'none') return [0, 0, 1];
    const m = s.match(/matrix(3d)?\(([^)]+)\)/);
    if (!m) return [0, 0, 1];
    const v = m[2].split(',').map(parseFloat);
    return m[1] ? [v[12], v[13], v[0]] : [v[4], v[5], v[0]];
  };
  T.measure = (el, rec) => {
    if (rec.f.length >= 140) return;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el), [tx, ty, sc] = matrix(cs.transform);
    // t, height, width, opacity, translateX, translateY, scale, page-y, shown
    rec.f.push([r2(performance.now() - T.t0), r2(r.height), r2(r.width), r2(+cs.opacity), r2(tx), r2(ty), r2(sc), r2(r.top + scrollY), cs.display === 'none' || cs.visibility === 'hidden' ? 0 : 1]);
  };
  T.touch = (el) => {
    if (!(el instanceof Element) || T.map.has(el) || T.map.size >= 40 || el === document.documentElement || el === document.body) return;
    const rec = { f: [] };
    T.map.set(el, rec);
    T.measure(el, rec); // right after the change: the animation's starting value
  };
  T.start = () => {
    if (T.raf) cancelAnimationFrame(T.raf);
    if (T.mo) T.mo.disconnect();
    T.t0 = performance.now(); T.map = new Map(); T.css = new Map(); T.frames = 0; T.live = true;
    T.mo = new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === 'attributes') T.touch(m.target);
        else { for (const n of m.addedNodes) T.touch(n); T.touch(m.target); }
      }
    });
    T.mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class', 'hidden', 'open', 'aria-expanded', 'aria-hidden'], childList: true, subtree: true });
    const tick = () => {
      if (!T.live) return;
      T.frames++;
      for (const [el, rec] of T.map) T.measure(el, rec);
      if (T.frames <= 8) {
        for (const a of document.getAnimations()) {
          const eff = a.effect, t = eff && eff.target;
          if (!t || !(t instanceof Element)) continue;
          const tm = eff.getComputedTiming();
          const isT = typeof CSSTransition !== 'undefined' && a instanceof CSSTransition;
          const isA = typeof CSSAnimation !== 'undefined' && a instanceof CSSAnimation;
          if (!isT && !(isA && Number.isFinite(tm.iterations))) continue; // endless decorative loops are not a reaction to the action
          T.touch(t);
          const prop = isT ? a.transitionProperty : a.animationName;
          const key = prop + '|' + [...T.map.keys()].indexOf(t);
          if (!T.css.has(key)) T.css.set(key, { el: t, kind: isT ? 'transition' : 'animation', prop, duration: Math.round(+tm.duration || 0), delay: Math.round(+tm.delay || 0), easing: eff.getTiming().easing });
        }
      }
      T.raf = requestAnimationFrame(tick);
    };
    T.raf = requestAnimationFrame(tick);
  };
  T.stop = () => {
    T.live = false;
    cancelAnimationFrame(T.raf);
    if (T.mo) T.mo.disconnect();
    const sel = __pw.makeSel(), names = ['height', 'width', 'opacity', 'translateX', 'translateY', 'scale', 'top'];
    const items = [];
    for (const [el, rec] of T.map) {
      const f = rec.f;
      if (f.length < 2) continue;
      const props = {};
      let t0 = Infinity, t1 = 0, cutoff = false;
      for (let j = 0; j < names.length; j++) {
        const col = f.map((r) => r[j + 1]);
        const eps = names[j] === 'opacity' || names[j] === 'scale' ? 0.02 : 1;
        const a = col[0], b = col[col.length - 1];
        if (Math.max(...col) - Math.min(...col) < eps) continue;
        let i0 = col.findIndex((v) => Math.abs(v - a) >= eps);
        if (i0 < 0) continue;
        let i1 = col.length - 1;
        while (i1 > 0 && Math.abs(col[i1 - 1] - b) < eps) i1--;
        const start = f[Math.max(0, i0 - 1)][0], end = f[i1][0];
        // value at a fraction of the way through, linearly interpolated between frames
        const at = (frac) => {
          const t = start + (end - start) * frac;
          for (let k = 1; k < f.length; k++) if (f[k][0] >= t) { const w = (t - f[k - 1][0]) / Math.max(1, f[k][0] - f[k - 1][0]); return col[k - 1] + (col[k] - col[k - 1]) * w; }
          return b;
        };
        const span = b - a;
        const p = Math.abs(span) < eps ? [0.25, 0.5, 0.75] : [0.25, 0.5, 0.75].map((x) => r2((at(x) - a) / span));
        props[names[j]] = { from: r2(a), to: r2(b), startMs: Math.round(start), endMs: Math.round(end), p };
        t0 = Math.min(t0, start); t1 = Math.max(t1, end);
        if (f.length >= 3 && Math.abs(col[col.length - 1] - col[col.length - 3]) >= eps) cutoff = true; // still moving when sampling ended
      }
      const shownCol = f.map((r) => r[8]);
      if (shownCol[0] !== shownCol[shownCol.length - 1]) props.shown = { from: shownCol[0], to: shownCol[shownCol.length - 1] };
      const css = [...T.css.values()].filter((c) => c.el === el).map((c) => ({ kind: c.kind, prop: c.prop, durationMs: c.duration, delayMs: c.delay, easing: c.easing }));
      if (!Object.keys(props).length && !css.length) continue;
      const r = el.getBoundingClientRect();
      const label = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
      const lead = props.height || props.width || props.translateY || props.translateX || props.opacity || props.scale || props.top;
      items.push({
        sel: sel(el), tag: el.tagName.toLowerCase(), label, text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 240), box: [r.x + scrollX, r.y + scrollY, r.width, r.height].map(Math.round),
        props, startMs: Number.isFinite(t0) ? Math.round(t0) : 0, durationMs: t1 > t0 ? Math.round(t1 - t0) : 0, p: lead ? lead.p : undefined, css, cutoff,
      });
    }
    return { items: items.slice(0, 16), frames: T.frames };
  };
}
export const SAMPLER = `(${sampler.toString()})()`;

export async function timingStart(page) {
  try { await page.evaluate(`${SAMPLER};window.__pwT.start()`); return true; } catch { return false; }
}
export async function timingStop(page) {
  try { return await page.evaluate('window.__pwT && window.__pwT.stop()'); } catch { return null; }
}

// "ease-out" / "linear" / ... from where the animation stood at 25, 50 and 75 % of its time
export function easingOf(p, durationMs) {
  if (!p || durationMs < 50) return durationMs < 50 ? 'instant' : 'unknown';
  const [a, b, c] = p;
  if (Math.abs(a - 0.25) < 0.07 && Math.abs(b - 0.5) < 0.07 && Math.abs(c - 0.75) < 0.07) return 'linear';
  if (a < 0.22 && c > 0.78) return 'ease-in-out';
  if (b > 0.57) return 'ease-out';
  if (b < 0.43) return 'ease-in';
  return 'ease';
}

// only the elements that belong to this action: the ones the diff names (or their ancestors/descendants), or that overlap them
export function relevantTiming(res, effectSels, effectBoxes, effectTexts = []) {
  if (!res?.items?.length) return undefined;
  const said = effectTexts.map((s) => String(s).replace(/…$/, '').slice(0, 50)).filter((s) => s.length > 3);
  const hit = (it) => (it.text && said.some((s) => it.text.includes(s))) || effectSels.some((s) => it.sel === s || it.sel.startsWith(s + ' >') || s.startsWith(it.sel + ' >')) ||
    effectBoxes.some((b) => it.box[0] < b[0] + b[2] + 24 && b[0] < it.box[0] + it.box[2] + 24 && it.box[1] < b[1] + b[3] + 24 && b[1] < it.box[1] + it.box[3] + 24);
  const rows = res.items.filter(hit).map((it) => ({ ...it, easing: it.css?.[0]?.easing && it.css[0].easing !== 'ease' ? it.css[0].easing : easingOf(it.p, it.durationMs) }));
  rows.sort((a, b) => b.durationMs - a.durationMs);
  return rows.length ? rows.slice(0, 5) : undefined;
}

const unit = (name) => (name === 'opacity' || name === 'scale' ? '' : 'px');
// one readable line per animated element, used by facts.md and BEHAVIOR.md
export function timingPhrase(it) {
  const who = it.label ? `"${it.label.slice(0, 30)}"` : it.sel.slice(-40);
  const props = Object.entries(it.props || {}).filter(([k]) => k !== 'shown').slice(0, 3).map(([k, v]) => `${k} ${num(v.from)}→${num(v.to)}${unit(k)}`);
  const css = it.css?.length ? `, CSS ${it.css[0].kind} ${it.css[0].prop} ${it.css[0].durationMs}ms ${it.css[0].easing}${it.css[0].delayMs ? ` delay ${it.css[0].delayMs}ms` : ''}` : '';
  const dur = it.durationMs >= 50 ? `over ~${it.durationMs}ms (${it.easing})` : 'instantly';
  return `${who}: ${props.join(', ') || (it.props?.shown ? (it.props.shown.to ? 'appears' : 'disappears') : 'changes')} ${dur}${css}${it.cutoff ? ' [still moving when sampling ended]' : ''}`;
}
