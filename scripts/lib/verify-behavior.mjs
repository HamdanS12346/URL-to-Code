// verify, behavior half: the same probes that measured the ORIGINAL page (scroll, media, animation timing) are run on the
// REBUILD, and the two are compared. Pixels alone cannot say "the header sticks", "the video plays", "the answer slides".
//   scroll   explore/survey/behave.json  vs  scrollProbe(rebuild)
//   media    explore/survey/behave.json  vs  mediaProbe(rebuild): autoplay/loop/muted, playing, what each control does
//   timing   explore/states.json (transition.timing)  vs  the same click/hover replayed on the rebuild, sampled the same way
//   console  errors and React warnings on load ("Invalid DOM property autoplay", a missing key, a crash)
import { scrollProbe, mediaProbe } from './behave.mjs';
import { timingStart, timingStop, timingPhrase } from './timing.mjs';

const toks = (s) => (s || '').split(/\s+/).filter(Boolean).map((c) => c.replace(/\d+/g, '#'));
const base = (u) => String(u || '').split('/').pop().split('?')[0];

// same element? tag + (same text, or a shared class, or same corner and similar size)
const sameEl = (b, c) => {
  if (b.tag !== c.tag) return false;
  if (b.label && c.label && b.label === c.label) return true;
  if (toks(b.cls).some((t) => toks(c.cls).includes(t) && t.length > 2)) return true;
  const close = (x, y) => Math.abs(x - y) <= Math.max(12, 0.15 * Math.max(x, y));
  return b.anchor === c.anchor && close(b.rect[2], c.rect[2]) && close(b.rect[3], c.rect[3]);
};

export function compareScroll(ref, cand) {
  const out = [];
  for (const b of ref.behaviors || []) {
    const c = (cand.behaviors || []).find((x) => sameEl(b, x) && x.kind === b.kind) || (cand.behaviors || []).find((x) => sameEl(b, x));
    const what = `${b.id} ${b.kind} "${b.label || b.sel}"`;
    if (!c) { out.push({ id: b.id, ok: false, detail: `${what}: not found in the rebuild (nothing ${b.kind === 'always' ? 'stays fixed/sticky there' : 'appears or disappears there'} while scrolling)` }); continue; }
    if (c.kind !== b.kind) { out.push({ id: b.id, ok: false, detail: `${what}: the rebuild's part is "${c.kind}" instead` }); continue; }
    if ((b.kind === 'appears' || b.kind === 'disappears') && Math.abs((c.at ?? c.hi) - (b.at ?? b.hi)) > 150) {
      out.push({ id: b.id, ok: false, detail: `${what}: at ~${b.at ?? b.hi}px in the original, ~${c.at ?? c.hi}px in the rebuild` }); continue;
    }
    if (!!b.change !== !!c.change) { out.push({ id: b.id, ok: false, detail: `${what}: ${b.change ? 'it changes (class/size) while scrolling in the original, not in the rebuild' : 'it changes while scrolling in the rebuild only'}` }); continue; }
    if (!!b.directional !== !!c.directional) { out.push({ id: b.id, ok: false, detail: `${what}: ${b.directional ? 'hides/shows depending on scroll direction in the original, not in the rebuild' : 'direction-dependent in the rebuild only'}` }); continue; }
    out.push({ id: b.id, ok: true });
  }
  return out;
}

export function compareMedia(ref, cand) {
  const out = [];
  const pool = [...(cand.videos || [])];
  for (const [i, v] of (ref.videos || []).entries()) {
    const k = pool.findIndex((c) => base(c.src) && base(c.src) === base(v.src));
    const c = k >= 0 ? pool.splice(k, 1)[0] : (cand.videos || [])[i];
    if (!c) { out.push({ id: v.id, ok: false, detail: `${v.id} ${base(v.src) || v.sel}: no such video/audio in the rebuild` }); continue; }
    const bad = [];
    for (const f of ['autoplay', 'loop', 'muted', 'controls']) if (!!v[f] !== !!c[f]) bad.push(`${f} ${v[f]}→${c[f]}`);
    if (!!v.playing !== !!c.playing) bad.push(v.playing ? 'plays by itself in the original but not in the rebuild' : 'plays in the rebuild but not in the original');
    for (const t of v.controlTests || []) {
      if (!t.clicked || !t.effect) continue;
      const ct = (c.controlTests || []).find((x) => (x.label && x.label === t.label) || x.sel === t.sel);
      if (!ct) bad.push(`control "${t.label || t.sel}" (${t.effect}) not found next to the video`);
      else if (!ct.clicked) bad.push(`control "${t.label || t.sel}" cannot be clicked`);
      else if (ct.effect !== t.effect) bad.push(`control "${t.label || t.sel}" ${t.effect} the video in the original, but ${ct.effect === 'none' ? 'does nothing' : ct.effect} in the rebuild`);
    }
    out.push(bad.length ? { id: v.id, ok: false, detail: `${v.id} ${base(v.src) || v.sel}: ${bad.join('; ')}` } : { id: v.id, ok: true });
  }
  return out;
}

const overlap = (a, b) => Math.max(0, Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]));

// replay recorded click/hover transitions that were animated, sample the rebuild the same way, compare durations
async function replayTiming(page, openRebuild, states, budgetMs, log) {
  const todo = (states?.transitions || []).filter((t) => t.timing?.length && !t.prefix?.length && ['click', 'hover'].includes(t.action.a) && t.action.key).slice(0, 12);
  const out = [];
  const t0 = Date.now();
  for (const t of todo) {
    if (Date.now() - t0 > budgetMs) { log(`  timing replay: stopped at its ${Math.round(budgetMs / 1000)}s budget (${todo.length - out.length} transition(s) not replayed)`); break; }
    const want = t.timing.filter((x) => x.durationMs >= 50 || x.css?.length);
    if (!want.length) continue;
    try {
      await openRebuild();
      let loc = page.locator(`[data-testid="${t.action.key}"]`).first();
      if (!(await loc.count()) && t.action.label) loc = page.getByText(t.action.label, { exact: true }).filter({ visible: true }).first();
      if (!(await loc.count())) { out.push({ id: t.id, ok: false, detail: `${t.id}: control ${t.action.key} not found in the rebuild` }); continue; }
      await timingStart(page);
      await (t.action.a === 'click' ? loc.click({ timeout: 3000 }) : loc.hover({ timeout: 3000 }));
      await page.waitForTimeout(Math.max(700, Math.max(...want.map((x) => x.durationMs)) + 300));
      const got = await timingStop(page);
      const bad = [];
      for (const r of want.slice(0, 3)) {
        const c = (got?.items || []).map((x) => ({ x, o: overlap(x.box, r.box) + (x.label && x.label === r.label ? 1e9 : 0) })).filter((m) => m.o > 0).sort((a, b) => b.o - a.o)[0]?.x;
        const rd = r.durationMs, cd = c?.durationMs ?? 0;
        if (rd < 50 && cd < 50) continue;
        if (!c || cd < 50) bad.push(`${timingPhrase(r)} — in the rebuild it is instant`);
        else if (Math.abs(cd - rd) > Math.max(120, rd * 0.4)) bad.push(`"${(r.label || r.sel).slice(0, 30)}" ~${rd}ms in the original, ~${cd}ms in the rebuild`);
      }
      out.push(bad.length ? { id: t.id, ok: false, detail: `${t.id} ${t.action.a} ${t.action.key}: ${bad.join('; ')}` } : { id: t.id, ok: true });
    } catch (e) { out.push({ id: t.id, ok: false, detail: `${t.id}: could not replay (${String(e.message).split('\n')[0].slice(0, 80)})` }); }
  }
  return out;
}

export async function verifyBehavior({ browser, viewport, dpr, url, initScript, ref, states, waitRoot, log = console.log, timingBudgetSec = 45 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: dpr, ignoreHTTPSErrors: true, serviceWorkers: 'block' });
  await context.addInitScript({ content: initScript });
  const page = await context.newPage();
  const messages = [];
  // console.error('Invalid DOM property `%s`...', 'autoplay', 'autoPlay'): text() leaves the %s placeholders; fill them from the arguments
  const pending = [];
  page.on('console', (m) => {
    if (m.type() !== 'error' && m.type() !== 'warning') return;
    pending.push(Promise.all(m.args().map((a) => a.jsonValue().catch(() => ''))).then(([fmt, ...rest]) => {
      const text = typeof fmt === 'string' ? fmt.replace(/%[sdifoOc]/g, () => String(rest.shift() ?? '')) + (rest.length ? ' ' + rest.join(' ') : '') : m.text();
      messages.push({ type: m.type(), text: text.slice(0, 240) });
    }).catch(() => messages.push({ type: m.type(), text: m.text().slice(0, 240) })));
  });
  page.on('pageerror', (e) => messages.push({ type: 'pageerror', text: String(e.message).slice(0, 240) }));
  // about:blank first: the same URL with the same #hash is a same-document navigation, which would keep the scrolled, half-used page
  const open = async () => { await page.goto('about:blank'); await page.goto(url, { timeout: 120000 }); if (waitRoot) await page.waitForFunction(() => document.getElementById('root')?.firstElementChild, null, { timeout: 60000 }).catch(() => {}); await page.evaluate(() => document.fonts.ready).catch(() => {}); await page.waitForTimeout(1200); };
  const res = {};
  try {
    await open();
    if (ref?.scroll) res.scroll = compareScroll(ref.scroll, await scrollProbe(page, { log: () => {} }));
    if (ref?.media) { await open(); res.media = compareMedia(ref.media, await mediaProbe(page, { log: () => {} })); }
    if (states?.transitions?.some((t) => t.timing?.length)) res.timing = await replayTiming(page, open, states, timingBudgetSec * 1000, log);
  } finally {
    await Promise.allSettled(pending);
    const resource = messages.filter((m) => /Failed to load resource/i.test(m.text));
    res.console = {
      errors: messages.filter((m) => !/Failed to load resource/i.test(m.text) && m.type !== 'warning').map((m) => m.text),
      reactWarnings: messages.filter((m) => /Warning:|Invalid DOM property|React does not recognize|Each child in a list|unique "key"|hydrat/i.test(m.text)).map((m) => m.text),
      failedResources: resource.length,
    };
    await context.close().catch(() => {});
  }
  return res;
}

export function printBehavior(res, log = console.log) {
  const line = (name, list) => (list ? `${name} ${list.filter((x) => x.ok).length}/${list.length} match` : null);
  const parts = [line('scroll', res.scroll), line('media', res.media), line('timing', res.timing)].filter(Boolean);
  const c = res.console;
  log(`behavior: ${parts.join(' | ') || 'nothing recorded to compare (stage 2 of the capture has no behave.json: npm run go -- <screen> --from survey)'} | console: ${c.errors.length} error(s), ${c.reactWarnings.length} React warning(s), ${c.failedResources} failed resource(s)`);
  for (const [name, list] of [['scroll', res.scroll], ['media', res.media], ['timing', res.timing]]) for (const x of (list || []).filter((y) => !y.ok)) log(`  ${name} ✗ ${x.detail}`);
  for (const e of [...new Set([...c.reactWarnings, ...c.errors])].slice(0, 6)) log(`  console ✗ ${e}`);
}
