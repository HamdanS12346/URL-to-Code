// Usage: npm run verify -- <screen>        (reads outputs/<screen>/manifest.json: reference, dpr, viewport)
// Renders the REBUILD at  ${BASE}/#/<screen>  the way the reference was made:
//   same viewport and dpr, warmed up, frozen, shot viewport by viewport (scripts/lib/freeze.mjs)
// and diffs it against the reference -> outputs/<screen>/verify/{candidate.png,diff.png,report.json}
// report.json has bad_pct per top-level section (the reference's bands) and, when motion.json exists, whether every
// carousel / counter / animation of the original also moves in the rebuild, at about the same speed.
// BASE=http://localhost:5174 if vite picked another port. URL=<full url> overrides the whole address.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { launch } from './lib/browser.mjs';
import { INPAGE, installClock, warmUp, freeze, shoot } from './lib/freeze.mjs';
import { sample, check } from './lib/motion.mjs';
import { py } from './lib/py.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const screen = process.argv[2] ?? (console.error('usage: npm run verify -- <screen>'), process.exit(1));
const dir = path.join(ROOT, 'outputs', screen);
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
  process.on('exit', () => vite.kill());
  for (let i = 0; i < 120 && !(await up()); i++) await new Promise((r) => setTimeout(r, 500));
  console.error(`verify: started the dev server at ${base}`);
}
await page.goto(process.env.URL ?? `${base}/#/${screen}`, { timeout: 120000 }); // a cold Vite takes a while to transform the page
// the router loads the screen lazily: wait until it has rendered before warming up and shooting
if (!process.env.URL) await page.waitForFunction(() => document.getElementById('root')?.firstElementChild, null, { timeout: 120000 }).catch(() => {});
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
await browser.close();

console.log(JSON.stringify({ reference: [w, h], viewport, ...env }));
const bandsFile = path.join(dir, manifest.sections || 'capture/bands.json');
const r = py('diff.py', refFile, path.join(outDir, 'candidate.png'), outDir, ...(tool && fs.existsSync(bandsFile) ? [bandsFile, dpr] : []));
console.log(JSON.stringify(r));

const rep = readJson(path.join(outDir, 'report.json'), {});
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
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(rep, null, 2));
if (rep.sections) console.log('sections (bad_pct, height delta): ' + rep.sections.map((s) => `${s.n}:${s.label} ${s.bad_pct}%${s.h_delta_px ? ` (${s.h_delta_px > 0 ? '+' : ''}${s.h_delta_px}px)` : ''}`).join(' | '));
