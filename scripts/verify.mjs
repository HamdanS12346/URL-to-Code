// Usage: npm run verify -- <screen>        (reads outputs/<screen>/manifest.json: reference, dpr, viewport)
// Renders the REBUILD at  ${BASE}/#/<screen>  the way the reference was made:
//   same viewport and dpr, warmed up, frozen, shot viewport by viewport (scripts/lib/freeze.mjs)
// and diffs it against the reference -> outputs/<screen>/verify/{candidate.png,diff.png,report.json}
// report.json has bad_pct per top-level section (the reference's bands) and, when motion.json exists, whether every
// carousel / counter / animation of the original also moves in the rebuild, at about the same speed.
// BASE=http://localhost:5174 if vite picked another port. URL=<full url> overrides the whole address.
// WAIT_ROOT=1 with URL: the address is a React app (another repo): wait for #root to render, as for this repo.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { launch } from './lib/browser.mjs';
import { INPAGE, installClock, warmUp, freeze, shoot } from './lib/freeze.mjs';
import { sample, check } from './lib/motion.mjs';
import { py } from './lib/py.mjs';
import { reportPreflight } from './lib/keys.mjs';
import { verifyBehavior, printBehavior } from './lib/verify-behavior.mjs';
import { screenDir } from './lib/paths.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const screen = process.argv[2] ?? (console.error('usage: npm run verify -- <screen>'), process.exit(1));
const dir = screenDir(screen);
const manifestFile = path.join(dir, 'manifest.json');
if (!fs.existsSync(manifestFile)) { console.error(`${manifestFile} not found. Run: npm run capture -- ${screen}`); process.exit(2); }
const manifest = readJson(manifestFile, {});
const { reference = 'reference.png', dpr } = manifest;
if (!dpr) { console.error(`${manifestFile} has no "dpr". Ask the user (browser console: devicePixelRatio) - never assume 1.`); process.exit(2); }

const tool = manifest.source === 'tool';
const refFile = path.join(dir, reference);
const png = fs.readFileSync(refFile);
const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]; // PNG IHDR
// a tool reference is as wide as the layout (scrollbar excluded): take the viewport from the manifest, not from the picture
const viewport = tool ? manifest.viewport ?? { width: manifest.css_viewport_width, height: manifest.css_viewport_height } : { width: Math.round(w / dpr), height: Math.round(h / dpr) };
const outDir = path.join(dir, 'verify');
fs.mkdirSync(outDir, { recursive: true });
reportPreflight(dir, path.join(outDir, 'missing-keys.json'));

const cfg = readJson(path.join(ROOT, 'config.json'), {});
const browser = await launch(cfg); // same launch as the capture: scrollbars take layout width in both
const context = await browser.newContext({ viewport, deviceScaleFactor: dpr, ignoreHTTPSErrors: true, serviceWorkers: 'block' });
await context.addInitScript({ content: INPAGE });
const clockOn = tool ? await installClock(context, cfg) : false;
const page = await context.newPage();
const base = process.env.BASE ?? 'http://localhost:5173';
const up = () => fetch(base).then((r) => r.ok, () => false);
if (!process.env.URL && !(await up())) { // no dev server running: start this repo's own Vite for the length of the run
  const vite = spawn(process.execPath, [path.join(ROOT, 'node_modules/vite/bin/vite.js'), '--port', new URL(base).port || '5173', '--strictPort'], { cwd: ROOT, stdio: 'ignore' });
  vite.unref(); // a ref'd child kept this process alive after the run (it never returned); 'exit' still kills it
  process.on('exit', () => vite.kill());
  for (let i = 0; i < 120 && !(await up()); i++) await new Promise((r) => setTimeout(r, 500));
  console.error(`verify: started the dev server at ${base}`);
}
await page.goto(process.env.URL ?? `${base}/#/${screen}`, { timeout: 120000 }); // a cold Vite takes a while to transform the page
// the router loads the screen lazily: wait until it has rendered before warming up and shooting
if (!process.env.URL || process.env.WAIT_ROOT) await page.waitForFunction(() => document.getElementById('root')?.firstElementChild, null, { timeout: 120000 }).catch(() => {});
await page.evaluate(() => document.fonts.ready);

let motion = null, bandsNow = null;
if (tool) {
  await page.evaluate(() => __pw.expandScroller()); // same as the capture: an app shell's inner scroller is grown to full height
  await warmUp(page, cfg.warmup);
  const expected = readJson(path.join(dir, 'motion.json'), null);
  if (expected?.entries.length) motion = await check(expected.entries, page, await sample(page, cfg.motion));
  await freeze(page, context, clockOn);
  bandsNow = await page.evaluate(() => __pw.bands());
  await shoot(page, context, path.join(outDir, 'shots'), { maxHeightPx: cfg.warmup?.maxHeightPx });
  py('imgtools.py', 'compose', path.join(outDir, 'shots'), path.join(outDir, 'candidate.png'), dpr);
} else {
  await page.screenshot({ path: path.join(outDir, 'candidate.png'), fullPage: true });
}
const env = await page.evaluate(() => ({ innerWidth, dpr: devicePixelRatio, compat: document.compatMode, overflowX: document.documentElement.scrollWidth > innerWidth }));

console.log(JSON.stringify({ reference: [w, h], viewport, ...env }));
const bandsFile = path.join(dir, manifest.sections || 'capture/bands.json');
const r = py('diff.py', refFile, path.join(outDir, 'candidate.png'), outDir, ...(tool && fs.existsSync(bandsFile) ? [bandsFile, dpr] : []));
console.log(JSON.stringify(r));

// diagnosis, output only: which element of the rebuild sits under each diff cluster, and (when the page is taller than the
// reference) which elements stick out past the reference's bottom edge
const rep = readJson(path.join(outDir, 'report.json'), {});
const diag = await page.evaluate(({ boxes, refH }) => {
  const all = [...document.querySelectorAll('body *')].map((e) => { const b = e.getBoundingClientRect(); return { e, x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height }; }).filter((o) => o.w > 0 && o.h > 0);
  const name = (e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + (e.dataset.testid ? `[data-testid=${e.dataset.testid}]` : '');
  const describe = (o) => o && { el: name(o.e), text: (o.e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40), box: [o.x, o.y, o.w, o.h].map(Math.round) };
  const elements = boxes.map(([x, y, w, h]) => describe(all.filter((o) => o.x <= x + w / 2 && x + w / 2 <= o.x + o.w && o.y <= y + h / 2 && y + h / 2 <= o.y + o.h).sort((a, b) => a.w * a.h - b.w * b.h)[0]) ?? null);
  let overflow = null;
  if (refH) { // leaf-most elements whose bottom edge passes the reference height: what made the page taller
    const past = new Set(all.filter((o) => o.y + o.h > refH + 1).map((o) => o.e));
    overflow = all.filter((o) => past.has(o.e) && ![...o.e.children].some((c) => past.has(c))).slice(0, 15).map(describe);
  }
  return { elements, overflow };
}, { boxes: (rep.clusters || []).map((c) => c.box.map((v) => v / dpr)), refH: r.size_delta_px[1] > 2 ? h / dpr : 0 }).catch(() => null);
// behavior: the probes that measured the original page (scroll, media, animation timing) run on the rebuild and are compared,
// plus the console of a fresh load (a React warning such as "Invalid DOM property autoplay" is a defect no picture shows)
let behavior = null;
if (process.env.BEHAVIOR !== '0') {
  try {
    behavior = await verifyBehavior({
      browser, viewport, dpr, url: process.env.URL ?? `${base}/#/${screen}`, initScript: INPAGE, waitRoot: !process.env.URL || !!process.env.WAIT_ROOT,
      ref: readJson(path.join(dir, 'explore', 'survey', 'behave.json'), null), states: readJson(path.join(dir, 'explore', 'states.json'), null),
    });
  } catch (e) { console.error(`behavior check could not run: ${e.message.split(String.fromCharCode(10))[0]}`); }
}
// a site kit's states (kit/states.json): the clicks the capture made on the live page (a dropdown open, a tooltip, Search,
// each dialog), replayed on the rebuild by the same stamped selectors, each picture diffed against the live one
const kitStates = readJson(path.join(dir, 'kit', 'states.json'), null);
if (kitStates?.length && process.env.STATES !== '0') {
  rep.states = [];
  const sdir = path.join(outDir, 'states');
  fs.rmSync(sdir, { recursive: true, force: true });
  if (clockOn) await context.clock.resume().catch(() => {}); // the freeze paused time for the whole context: delays (a tooltip's) must run
  for (const st of kitStates) {
    const p = await context.newPage();
    const r = { name: st.name, ok: false };
    try {
      await p.goto(process.env.URL ?? `${base}/#/${screen}`, { timeout: 120000 });
      await p.waitForFunction(() => document.getElementById('root')?.firstElementChild, null, { timeout: 60000 }).catch(() => {});
      await p.waitForTimeout(400);
      await p.mouse.move(0, 0);
      for (const s of st.steps) {
        const loc = p.locator(`${s.sel} >> visible=true`).nth(s.nth ?? 0); // a twin hidden by a media query (a second hamburger) is never the one
        await loc.scrollIntoViewIfNeeded({ timeout: 5000 });
        if (s.do === 'hover') await loc.hover({ timeout: 5000 }); else if (s.do === 'dblclick') await loc.dblclick({ timeout: 5000 }); else await loc.click({ timeout: 5000 });
        await p.waitForTimeout(s.wait ?? st.wait ?? 800);
      }
      if (st.name === 'search') await p.evaluate(() => scrollTo(0, 0));
      // what must be true after the steps (the side menu open, its fly-out shown, closed again), checked in the DOM
      const failed = [];
      for (const e of st.expect ?? []) {
        // per matched, shown element: its text lines, whether it is what the pointer would hit at its centre (an element
        // clipped by an ancestor's overflow still has a box but is not on top), and whether its box overlaps `outside`'s
        const seen = await p.locator(e.sel).evaluateAll((els, outside) => els.filter((x) => x.getClientRects().length && getComputedStyle(x).visibility !== 'hidden')
          .map((x) => {
            const t = x.querySelector('.k-tooltip-content') ?? x, lh = parseFloat(getComputedStyle(t).lineHeight) || 18, r = x.getBoundingClientRect();
            const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2), o = outside && document.querySelector(outside)?.getBoundingClientRect();
            return { lines: Math.round(t.getBoundingClientRect().height / lh), top: !!hit && x.contains(hit), overlaps: !!o && Math.min(r.right, o.right) - Math.max(r.left, o.left) > 1 && Math.min(r.bottom, o.bottom) - Math.max(r.top, o.top) > 1 };
          }), e.outside ?? null);
        if ((e.visible ?? true) !== seen.length > 0) failed.push(`${e.sel} ${e.visible === false ? 'still shown' : 'not shown'}${e.why ? ` (${e.why})` : ''}`);
        else if (e.lines && seen.length && seen[0].lines > e.lines) failed.push(`${e.sel} wraps onto ${seen[0].lines} lines, the live one has ${e.lines}`);
        else if (e.top && seen.length && !seen.some((x) => x.top)) failed.push(`${e.sel} is shown but covered or clipped: not on top${e.why ? ` (${e.why})` : ''}`);
        else if (e.outside && seen.some((x) => x.overlaps)) failed.push(`${e.sel} opens inside ${e.outside}, which clips it; the live one opens beside it${e.why ? ` (${e.why})` : ''}`);
      }
      if (failed.length) r.error = failed.join('; ');
      if (!st.shot) { r.ok = !failed.length; } else {
        const d = path.join(sdir, st.name);
        fs.mkdirSync(d, { recursive: true });
        await p.screenshot({ path: path.join(d, 'candidate.png'), animations: 'disabled', caret: 'hide', ...(st.clip ? { clip: st.clip } : {}) });
        const res = py('diff.py', path.join(dir, 'kit', st.shot), path.join(d, 'candidate.png'), d);
        Object.assign(r, { bad_pct: res.bad_pct, size_delta_px: res.size_delta_px, ok: !failed.length && res.bad_pct <= (+process.env.STATE_MAX_BAD_PCT || 15) });
      }
    } catch (e) { r.error = e.message.split('\n')[0]; }
    await p.close();
    rep.states.push(r);
  }
  console.log(`states: ${rep.states.filter((s) => s.ok).length}/${rep.states.length} match the live page${rep.states.filter((s) => !s.ok).map((s) => ` | ✗ ${s.name}: ${s.error ?? `${s.bad_pct}% off`}`).join('')}`);
}
await browser.close();
if (diag) {
  (rep.clusters || []).forEach((c, i) => { c.css_box = c.box.map((v) => Math.round(v / dpr)); c.element = diag.elements[i]; });
  if (diag.overflow) rep.past_reference_height = diag.overflow;
}
(rep.clusters || []).slice(0, 3).forEach((c, i) => console.log(`cluster ${i + 1}: css box ${c.css_box} bad_px ${c.bad_px} under ${c.element ? `${c.element.el} "${c.element.text}"` : '?'}`));
if (rep.worst_crop) console.log(`worst cluster, ref | candidate: ${path.join(outDir, rep.worst_crop)}`);
const bands = readJson(bandsFile, null);
if (rep.sections && bands && bandsNow) { // same number of bands: how much taller/shorter is each one in the rebuild?
  if (bands.length === bandsNow.length) rep.sections.forEach((s, i) => { s.h_delta_px = Math.round(bandsNow[i].h - bands[i].h); });
  else rep.bands_note = `the rebuild has ${bandsNow.length} top-level bands, the original ${bands.length}: section heights not compared`;
}
if (motion) {
  rep.motion = motion;
  const bad = motion.filter((m) => m.ok === false);
  console.log(`motion: ${motion.filter((m) => m.ok).length}/${motion.length} match${bad.length ? `; wrong: ${bad.map((m) => `${m.id} ${m.detail}`).join(' | ')}` : ''}`);
}
if (behavior) { rep.behavior = behavior; printBehavior(behavior); }
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(rep, null, 2));
if (rep.sections) console.log('sections (bad_pct, height delta): ' + rep.sections.map((s) => `${s.n}:${s.label} ${s.bad_pct}%${s.h_delta_px ? ` (${s.h_delta_px > 0 ? '+' : ''}${s.h_delta_px}px)` : ''}`).join(' | '));
