// Motion: what moves, how fast, how often.
// Setup (carousel library config, CSS animations/transitions, counters) is read from the page (__pw.motionStatic);
// speed and rhythm are measured by sampling candidate elements over time (sample). build() merges both into numbered
// entries M01.. (the ids the spec must cite); check() replays the same measurement on the rebuild.
const med = (a) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const val = (r) => r.slice(1).join('|'); // row = [t, x, y, w, opacity, transform, text]
const inBox = (b, host, pad = 0) => { const cx = b[0] + b[2] / 2, cy = b[1] + b[3] / 2; return cx >= host[0] - pad && cx <= host[0] + host[2] + pad && cy >= host[1] - pad && cy <= host[1] + host[3] + pad; };

const inRow = (b, host) => b[0] < host[0] + host[2] && b[0] + b[2] > host[0] && b[1] + b[3] / 2 >= host[1] && b[1] + b[3] / 2 <= host[1] + host[3];

export async function sample(page, { sampleSec = 10, intervalMs = 250 } = {}) {
  const cands = await page.evaluate(() => __pw.probeInit());
  const series = cands.map(() => []);
  const t0 = Date.now();
  while (Date.now() - t0 < sampleSec * 1000) {
    const t = Date.now() - t0;
    (await page.evaluate(() => __pw.probeRead())).forEach((v, i) => series[i].push([t, ...v]));
    await page.waitForTimeout(intervalMs);
  }
  return analyse(cands, series);
}

function analyse(cands, series) {
  const moving = new Set();
  series.forEach((s, i) => { if (s.length > 2 && s.some((r) => val(r) !== val(s[0]))) moving.add(i); });
  // a descendant that only moves because an ancestor moves is not a mover of its own
  const rigid = (d, a) => series[d].every((r, k) => Math.abs((r[1] - series[d][0][1]) - (series[a][k][1] - series[a][0][1])) <= 1.5 && Math.abs((r[2] - series[d][0][2]) - (series[a][k][2] - series[a][0][2])) <= 1.5 && r[4] === series[d][0][4]);
  const kept = [...moving].filter((i) => { for (let p = cands[i].parent; p >= 0; p = cands[p].parent) if (moving.has(p) && rigid(i, p)) return false; return true; });
  const movers = kept.map((i) => {
    const s = series[i], n = s.length - 1;
    const diff = s.slice(0, n).map((r, k) => val(r) !== val(s[k + 1]));
    const props = [];
    if (s.some((r) => r[1] !== s[0][1] || r[2] !== s[0][2] || r[3] !== s[0][3])) props.push('position');
    if (s.some((r) => r[4] !== s[0][4])) props.push('opacity');
    if (s.some((r) => r[5] !== s[0][5])) props.push('transform');
    if (s.some((r) => r[6] !== s[0][6])) props.push('text');
    const m = { sel: cands[i].sel, parentSel: cands[i].parentSel, box: cands[i].box, props, mode: diff.filter(Boolean).length / n > 0.6 ? 'continuous' : 'stepped' };
    if (m.mode === 'continuous') {
      const vx = [], vy = [];
      for (let k = 0; k < n; k++) { const dt = (s[k + 1][0] - s[k][0]) / 1000 || 1; vx.push((s[k + 1][1] - s[k][1]) / dt); vy.push((s[k + 1][2] - s[k][2]) / dt); }
      m.velocity = { x: Math.round(med(vx)), y: Math.round(med(vy)) }; // px/s; the median ignores the jump when a loop wraps
    } else {
      const groups = [];
      diff.forEach((c, k) => { if (!c) return; if (diff[k - 1]) { const g = groups[groups.length - 1]; g.dx += s[k + 1][1] - s[k][1]; g.dy += s[k + 1][2] - s[k][2]; } else groups.push({ start: s[k][0], dx: s[k + 1][1] - s[k][1], dy: s[k + 1][2] - s[k][2] }); });
      m.starts = groups.map((g) => g.start);
      m.stepPx = { x: Math.round(med(groups.map((g) => Math.abs(g.dx)))), y: Math.round(med(groups.map((g) => Math.abs(g.dy)))) };
    }
    return m;
  });
  // siblings under one parent doing the same thing (fading slides, ticker items) are one entry
  const by = new Map();
  for (const m of movers) { const k = [m.parentSel, m.mode, m.props.join()].join('|'); const g = by.get(k); if (g) { g.count++; g.starts = [...(g.starts || []), ...(m.starts || [])]; } else by.set(k, { ...m, count: 1 }); }
  return [...by.values()].map((m) => {
    if (m.starts) {
      const t = m.starts.sort((a, b) => a - b).filter((x, k, a) => k === 0 || x - a[k - 1] > 600); // one start per event, sample resolution +-intervalMs
      m.events = t.length;
      m.intervalMs = t.length >= 2 ? Math.round(med(t.slice(1).map((x, k) => x - t[k]))) : null;
      m.firstChangeMs = t[0];
      delete m.starts;
    }
    return m;
  });
}

// merge static facts + measurements into numbered entries
export function build(st, movers, keyframes) {
  const entries = [];
  const id = () => 'M' + String(entries.length + 1).padStart(2, '0');
  const rest = [...movers];
  const take = (pred) => rest.filter(pred).map((m) => { rest.splice(rest.indexOf(m), 1); return m; });
  const trim = ({ sel, mode, props, velocity, intervalMs, stepPx, events, count }) => ({ sel, mode, props, velocity, intervalMs, stepPx, events, count });
  // a carousel's moving part (swiper-wrapper, slick-track) is wider than the carousel: match by parent or by the row it sits in
  for (const s of st.sliders) entries.push({ id: id(), kind: 'slider', ...s, measured: take((m) => m.parentSel === s.sel || inRow(m.box, s.box)).slice(0, 3).map(trim) });
  for (const c of st.counters) entries.push({ id: id(), kind: 'counter', ...c });
  for (const a of st.cssAnimations) {
    const own = a.iterations === 'infinite' ? take((m) => a.samples.includes(m.sel) || a.samples.includes(m.parentSel)).map(trim) : [];
    entries.push({ id: id(), kind: 'css-animation', ...a, keyframes: (keyframes.find((k) => k.name === a.name.split(',')[0].trim()) || {}).css, measured: own.length ? own : undefined });
  }
  for (const m of rest) entries.push({ id: id(), kind: 'mover', ...m });
  return entries.slice(0, 60);
}

// the same measurement on the rebuild: did every entry survive, at about the same speed?
export async function check(entries, page, movers) {
  const live = await page.evaluate(() => ({
    // the expected value was recorded with textContent (__pw.motionStatic), so read it the same way here:
    // innerText drops every hidden element's text and would fail a counter whose panel starts closed
    text: document.body.textContent.replace(/\s+/g, ' '),
    anims: [...new Set([...document.body.querySelectorAll('*')].map((e) => getComputedStyle(e).animationName).filter((n) => n !== 'none'))],
  }));
  const near = (a, b) => Math.abs(a - b) <= Math.max(0.25 * Math.abs(b), 40);
  const compare = (want, got) => {
    if (want.mode === 'stepped') return got.mode === 'stepped' && want.intervalMs && got.intervalMs ? { ok: near(got.intervalMs, want.intervalMs), detail: `changes every ${want.intervalMs}ms; rebuild ${got.intervalMs}ms` } : { ok: false, detail: `original ${want.mode}${want.intervalMs ? ` every ${want.intervalMs}ms` : ''}; rebuild ${got.mode}${got.intervalMs ? ` every ${got.intervalMs}ms` : ''}` };
    const [w, g] = Math.abs(want.velocity.x) >= Math.abs(want.velocity.y) ? [want.velocity.x, got.velocity?.x ?? 0] : [want.velocity.y, got.velocity?.y ?? 0];
    return { ok: got.mode === 'continuous' && Math.sign(w) === Math.sign(g) && near(g, w), detail: `scrolls ${w}px/s; rebuild ${got.mode === 'continuous' ? g + 'px/s' : got.mode}` };
  };
  return entries.map((e) => {
    const base = { id: e.id, kind: e.kind };
    if (e.kind === 'counter') return { ...base, ok: live.text.includes(e.text), detail: `shows "${e.text}"` };
    const wants = e.kind === 'mover' ? [e] : e.measured || [];
    if (e.kind === 'css-animation' && !wants.length) return { ...base, ok: live.anims.some((a) => a.includes(e.name.split(',')[0].trim())), detail: `animation ${e.name}` };
    if (!wants.length) return { ...base, ok: null, detail: 'nothing was measured on the original' };
    const host = e.box || wants[0].box, d = (m) => Math.hypot(m.box[0] + m.box[2] / 2 - host[0] - host[2] / 2, m.box[1] + m.box[3] / 2 - host[1] - host[3] / 2);
    const got = movers.filter((m) => inBox(m.box, host, 150) || inRow(m.box, host)).sort((a, b) => (b.mode === wants[0].mode) - (a.mode === wants[0].mode) || d(a) - d(b))[0];
    if (!got) return { ...base, ok: false, detail: 'not moving in the rebuild' };
    return { ...base, ...compare(wants[0], got) };
  });
}
