// Tool-made reference + a local copy of the page that proves the capture is complete.
//   reference()  viewport-stepped shots -> reference.png (+ sections/NN-*.png, one full-resolution crop per band)
//   snapshot()   snapshot/rendered.html (DOM after the page's scripts ran, scripts removed) + snapshot/used.css
//   fidelity()   renders rendered.html OFFLINE from the saved assets and diffs it against reference.png:
//                a low number means the capture holds everything the page needs to look the way it does.
import fs from 'node:fs';
import path from 'node:path';
import { INPAGE, shoot } from './lib/freeze.mjs';
import { py } from './lib/py.mjs';

const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);

// many tiny top-level bands (table-layout pages put every row at the top) make useless crops: merge small neighbours, cap the count
function mergeBands(bands, max = 40, minH = 60) {
  const out = [];
  for (const b of bands) {
    const last = out[out.length - 1];
    if (last && (b.h < minH || last.h < minH)) { last.h = Math.max(last.y + last.h, b.y + b.h) - last.y; last.w = Math.max(last.w, b.w); continue; }
    out.push({ ...b });
  }
  while (out.length > max) {
    let k = 0;
    for (let i = 1; i < out.length - 1; i++) if (out[i].h + out[i + 1].h < out[k].h + out[k + 1].h) k = i;
    out[k].h = Math.max(out[k].y + out[k].h, out[k + 1].y + out[k + 1].h) - out[k].y;
    out.splice(k + 1, 1);
  }
  return out;
}

// draw-ui's measurement input (its references/reference-measurement.md): boxes in reference pixels, taken from the real DOM
// instead of eyeballed on a shrunken picture: every band, h1-h3 headings, large images, and rows of look-alike siblings (card grids)
function regionsFor({ bands, tree, width, height, dpr }) {
  const R = [], names = new Set();
  const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'x';
  const add = (name, b, extra = {}) => {
    let [x, y, w, h] = b.map((v) => Math.round(v * dpr));
    if (x < 0) { w += x; x = 0; }
    if (y < 0) { h += y; y = 0; }
    w = Math.min(w, width - x); h = Math.min(h, height - y);
    if (w < 4 || h < 4) return false;
    let n = name, i = 2;
    while (names.has(n)) n = `${name}-${i++}`;
    names.add(n);
    R.push({ name: n, box: [x, y, w, h], ...extra });
    return true;
  };
  bands.forEach((b, i) => add(`band-${String(i + 1).padStart(2, '0')}-${slug(b.label)}`, [b.x, b.y, b.w, b.h], b.sel ? { selector: b.sel } : {}));
  const text = (n) => { let t = ''; const w = (x) => { if (t.length > 40 || !x) return; if (x.runs) t += x.runs.map((r) => r.x || '').join(''); (x.k || []).forEach(w); }; w(n); return t; };
  let heads = 0, imgs = 0, rows = 0;
  const walk = (n) => {
    if (!n || !n.box) return;
    if (/^h[1-3]$/.test(n.t) && heads < 30 && add(`${n.t}-${slug(text(n))}`, n.box)) heads++;
    if (n.t === 'img' && n.box[2] * n.box[3] >= 6000 && imgs < 30 && add(`img-${slug(String(n.file || n.src || '').split('/').pop())}`, n.box)) imgs++;
    const kids = (n.k || []).filter((k) => k.t !== '#text' && k.box && k.box[2] > 40 && k.box[3] > 20);
    if (rows < 8 && kids.length >= 3) {
      const sig = (k) => `${k.t}.${(k.cls || '').split(' ')[0]}`;
      const same = kids.filter((k) => sig(k) === sig(kids[0]) && Math.abs(k.box[1] - kids[0].box[1]) <= 4 && Math.abs(k.box[2] - kids[0].box[2]) <= kids[0].box[2] * 0.15);
      if (same.length >= 3) { rows++; same.slice(0, 8).forEach((k, i) => add(`row${rows}-item${i + 1}`, k.box, { group: `row${rows}` })); }
    }
    (n.k || []).forEach(walk);
  };
  walk(tree?.body);
  // a group that lost members to clipping must still have two
  const count = R.reduce((a, r) => (r.group ? { ...a, [r.group]: (a[r.group] || 0) + 1 } : a), {});
  return R.filter((r) => !r.group || count[r.group] >= 2);
}

export async function reference({ page, context, out, dpr, userShots, tree, maxHeightPx = 30000, log }) {
  const dir = path.join(out, 'capture', 'shots');
  const all = await page.evaluate(() => __pw.bands());
  const bands = mergeBands(all.filter((b) => b.y < maxHeightPx));
  fs.writeFileSync(path.join(out, 'capture', 'bands.json'), JSON.stringify(bands, null, 1));
  const r = await shoot(page, context, dir, { maxHeightPx });
  if (r.fullHeight > r.docHeight) log(`  ! page is ${r.fullHeight}px tall (infinite scroll?): photographed the first ${r.docHeight}px (config warmup.maxHeightPx)`);
  // with your own screenshots, reference.png stays yours (stitch step); the tool's picture is reference-auto.png
  const file = userShots ? 'reference-auto.png' : 'reference.png';
  const c = py('imgtools.py', 'compose', dir, path.join(out, file), dpr);
  const s = py('imgtools.py', 'sections', path.join(out, file), path.join(out, 'capture', 'bands.json'), path.join(out, 'sections'), dpr);
  fs.writeFileSync(path.join(out, 'reference.json'), JSON.stringify({ file, source: 'tool', width: c.width, height: c.height, dpr, css_width: c.width / dpr, shots: c.shots, sections: s.count, truncated: r.fullHeight > r.docHeight }, null, 1));
  log(`  ${file} ${c.width}x${c.height} from ${r.count} shots; ${s.count} section crops in sections/${all.length !== bands.length ? ` (${all.length} bands merged to ${bands.length})` : ''}`);

  // ready-made baseline for the draw-ui skill: regions.json + its own measure_reference.py run -> measure-00/
  const regions = regionsFor({ bands, tree, width: c.width, height: c.height, dpr });
  fs.writeFileSync(path.join(out, 'regions.json'), JSON.stringify({ reference: file, css_viewport_width: c.width / dpr, regions }, null, 1));
  const m00 = path.join(out, 'measure-00');
  fs.rmSync(m00, { recursive: true, force: true });
  try {
    const m = py(path.join(out, '..', '..', '.claude', 'skills', 'draw-ui', 'scripts', 'measure_reference.py'), '--manifest', path.join(out, 'regions.json'), '--out-dir', m00);
    log(`  regions.json: ${regions.length} regions (${m.groups} repeated rows) measured by draw-ui -> measure-00/`);
  } catch (e) { log(`  ! draw-ui measure_reference failed on regions.json: ${e.message.split('\n')[0]}`); }
  return { file, bands: bands.length };
}

export async function snapshot({ page, out, log }) {
  const dir = path.join(out, 'snapshot');
  fs.mkdirSync(dir, { recursive: true });
  const html = await page.evaluate(() => {
    const c = document.documentElement.cloneNode(true);
    c.querySelectorAll('script, noscript, link[rel=preload], link[rel=prefetch], link[rel=modulepreload]').forEach((e) => e.remove());
    c.querySelectorAll('[data-pw-hid]').forEach((e) => e.removeAttribute('data-pw-hid'));
    const head = c.querySelector('head');
    if (head && !head.querySelector('base')) { const b = document.createElement('base'); b.href = location.href; head.prepend(b); }
    return '<!DOCTYPE html>\n' + c.outerHTML;
  });
  fs.writeFileSync(path.join(dir, 'rendered.html'), html);
  const u = await page.evaluate(() => __pw.usedCss());
  const assets = readJson(path.join(out, 'capture', 'assets', 'index.json'), {});
  let css = `/* used.css: rules whose selectors match this page, from ${u.sheets.length} stylesheets (${u.stats.kept} of ${u.stats.rules} rules kept).\n   :hover/:focus rules and ::before/::after rules of existing elements are kept. Media queries are kept whole (responsive rules included). */\n`;
  for (const s of u.sheets) if (s.text.trim()) css += `\n/* ==== ${s.href} ==== */\n${s.text}\n`;
  for (const href of u.blocked) { // cross-origin sheets the browser won't expose (web-font CSS): the saved copy, unfiltered
    const a = assets[href];
    const f = a && path.join(out, 'capture', a.file);
    if (f && fs.existsSync(f) && fs.statSync(f).size < 200000) css += `\n/* ==== ${href} (saved copy, unfiltered) ==== */\n${fs.readFileSync(f, 'utf8')}\n`;
  }
  if (u.keyframes.length) css += `\n/* ==== @keyframes in use ==== */\n${u.keyframes.map((k) => k.css).join('\n')}\n`;
  fs.writeFileSync(path.join(dir, 'used.css'), css);
  log(`  snapshot/: rendered.html ${Math.round(html.length / 1024)} KB, used.css ${Math.round(css.length / 1024)} KB (${u.stats.kept}/${u.stats.rules} rules), ${u.keyframes.length} keyframes`);
  return { keyframes: u.keyframes };
}

export async function fidelity({ browser, url, out, viewport, dpr, log }) {
  const html = path.join(out, 'snapshot', 'rendered.html');
  const ref = readJson(path.join(out, 'reference.json'), null);
  if (!fs.existsSync(html) || !ref) return log('  fidelity: nothing to check (run the capture step first)');
  const assets = readJson(path.join(out, 'capture', 'assets', 'index.json'), {});
  const dir = path.join(out, 'snapshot', 'fidelity');
  fs.mkdirSync(dir, { recursive: true });
  const context = await browser.newContext({ viewport, deviceScaleFactor: dpr, ignoreHTTPSErrors: true, serviceWorkers: 'block' });
  await context.addInitScript({ content: INPAGE });
  const target = new URL(url).href;
  await context.route('**/*', (route) => {
    const u = route.request().url();
    if (route.request().resourceType() === 'document' && new URL(u).href === target) return route.fulfill({ body: fs.readFileSync(html), contentType: 'text/html; charset=utf-8' });
    // embedded players (YouTube...) are cross-origin and not saved: the live page shows a black box, so does the stub
    if (route.request().resourceType() === 'document' && route.request().frame().parentFrame()) return route.fulfill({ body: '<body style="margin:0;background:#000"></body>', contentType: 'text/html' });
    const a = assets[u];
    if (a && fs.existsSync(path.join(out, 'capture', a.file))) return route.fulfill({ body: fs.readFileSync(path.join(out, 'capture', a.file)), contentType: a.contentType || undefined });
    return route.abort();
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await shoot(page, context, path.join(dir, 'shots'));
    py('imgtools.py', 'compose', path.join(dir, 'shots'), path.join(dir, 'offline.png'), dpr);
    const r = py('diff.py', path.join(out, ref.file), path.join(dir, 'offline.png'), dir, path.join(out, 'capture', 'bands.json'), dpr);
    log(`  offline copy vs reference: ${r.bad_pct}% of pixels differ, size delta ${r.size_delta_px.join('x')}px, worst section ${r.worst_section?.label} (${r.worst_section?.bad_pct}%)`);
    return r;
  } finally { await context.close(); }
}
