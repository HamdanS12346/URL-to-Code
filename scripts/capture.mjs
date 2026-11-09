// Step 2 — capture: the page's default state, warmed up (every scroll/lazy/counter effect has run) and frozen
// (carousels at slide 0, animations parked, JS timers stopped). Never leaves the page.
// Writes outputs/<screen>/capture/: page.json dom.json controls.json webforms.json pseudo.json listeners.json frames.json
//   aria.yml page.png, assets/ (+ index.json), js/ (page scripts), css/ (inline styles), shots/ (reference pieces)
// and next to it: reference.png sections/ snapshot/{rendered.html,used.css} motion.json
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { openPage, samePage } from './lib/browser.mjs';
import { installClock, warmUp, freeze } from './lib/freeze.mjs';
import { sample, build } from './lib/motion.mjs';
import { reference, snapshot } from './snapshot.mjs';
import { py } from './lib/py.mjs';

const writeJson = (f, o) => fs.writeFileSync(f, JSON.stringify(o, null, 1));
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/svg+xml': 'svg', 'image/webp': 'webp', 'image/x-icon': 'ico', 'image/bmp': 'bmp' };

// Elements that look clickable but have no markup hint: ask the browser for their real listeners.
async function listeners(page, sels) {
  const out = {};
  const cdp = await page.context().newCDPSession(page);
  for (const sel of sels) {
    try {
      const { result } = await cdp.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(sel)})` });
      if (!result.objectId) continue;
      const { listeners: ls } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
      const types = [...new Set(ls.map((l) => l.type))].filter((t) => /click|mouse(down|up)|pointer(down|up)|touchstart|keydown/.test(t));
      if (types.length) out[sel] = types;
      await cdp.send('Runtime.releaseObject', { objectId: result.objectId });
    } catch {}
  }
  await cdp.detach().catch(() => {});
  return out;
}

export async function capture({ browser, cfg, url, out, viewport, dpr, log, userShots = 0, kit = null }) {
  const dir = path.join(out, 'capture');
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); // OneDrive / an open editor can hold a file for a moment
  for (const d of ['assets', 'js', 'css']) fs.mkdirSync(path.join(dir, d), { recursive: true });
  const s = await openPage(browser, cfg, { url, viewport, dpr, assetsDir: path.join(dir, 'assets'), jsDir: path.join(dir, 'js') });
  const clockOn = await installClock(s.context, cfg);
  try {
    const res = await s.load();
    const final = new URL(s.page.url());
    if (!samePage(final, new URL(url)))
      throw new Error(`the page redirected to ${final.href}. If that is a login page: npm run login -- "${url}" (see README)`);
    if (res && res.status() >= 400) log(`  ! HTTP ${res.status()} for ${url}`);

    // 0. app shell whose content scrolls inside a div: let it grow so the window scrolls and every part gets photographed
    const grown = await s.page.evaluate(() => __pw.expandScroller());
    if (grown) log(`  ! the page scrolls inside \`${grown.sel}\` (${grown.from}px tall, content ${grown.to}px): expanded so all of it is photographed; the real page keeps that area scrollable`);

    // 1. warm up: scroll through so lazy images, reveal-on-scroll and counters have all run; then back to the top
    await warmUp(s.page, cfg.warmup);
    await s.settle();
    // a site kit reads its widgets from the page's own framework and stamps them (before the freeze: menus still animate)
    const kitRest = kit ? await kit.prepare({ page: s.page, cfg, log }) : null;
    // popups that happen to be open at rest (a tooltip under the mouse) are not part of the page
    await s.page.mouse.move(0, 0);
    if (cfg.transient) await s.page.evaluate((sel) => { for (const e of document.querySelectorAll(sel)) if (e.getClientRects().length && !e.closest('[data-kit-menu]')) e.style.setProperty('display', 'none'); }, cfg.transient);

    // 2. motion, measured while things still move: library config + CSS animations, then speed/rhythm by sampling
    const mstatic = await s.page.evaluate(() => __pw.motionStatic());
    const movers = await sample(s.page, cfg.motion);

    // 3. freeze: everything below (dom.json, controls, pictures) is read from this one still state
    const fz = await freeze(s.page, s.context, clockOn);
    log(`  frozen: clock ${fz.clock}; reset to slide 0: ${fz.swiper} swiper, ${fz.slick} slick, ${fz.owl} owl; ${fz.animations} animations parked; ${fz.stillMoving} candidates still moving${fz.stillMoving ? ' (JS-driven motion the clock could not stop)' : ''}`);

    const cands = await s.page.evaluate(() => __pw.pointerCandidates());
    const listen = await listeners(s.page, cands);
    await s.page.evaluate((x) => { __pw.extra = x; }, listen);

    const meta = await s.page.evaluate(() => __pw.scrape());
    const controls = await s.page.evaluate(() => __pw.controls());
    const tree = await s.page.evaluate(() => __pw.tree());
    const webforms = await s.page.evaluate(() => __pw.webforms());
    const pseudo = await s.page.evaluate(() => __pw.pseudo());
    const aria = await s.page.locator('body').ariaSnapshot({ timeout: 15000 }).catch(() => '');
    // the reference photos come BEFORE any fullPage screenshot: a fullPage screenshot leaves the page changed
    // (scrollbar gone = 15px wider, ~10px taller), which made the old reference disagree with dom.json and the offline copy
    const ref = await reference({ page: s.page, context: s.context, out, dpr, userShots, tree, maxHeightPx: cfg.warmup?.maxHeightPx, log });
    // page.png = the reference itself. No fullPage screenshot any more: it changes the page's layout and fails on very tall pages
    fs.copyFileSync(path.join(out, ref.file), path.join(dir, 'page.png'));

    // same-origin iframes: their own tree + controls (exploration stays in the main document)
    const frames = [];
    for (const f of s.page.frames()) {
      if (f === s.page.mainFrame()) continue;
      try {
        if (new URL(f.url()).origin !== new URL(url).origin) { frames.push({ url: f.url(), name: f.name(), crossOrigin: true }); continue; }
        frames.push({ url: f.url(), name: f.name(), tree: await f.evaluate(() => __pw.tree()), controls: await f.evaluate(() => __pw.controls()) });
      } catch (e) { frames.push({ url: f.url(), error: e.message.split('\n')[0] }); }
    }

    // canvases (charts) can't be rebuilt from the DOM: keep a picture of each
    const canvases = [];
    const walk = (n, fn) => { if (!n) return; fn(n); for (const k of n.k || []) walk(k, fn); };
    walk(tree.body, (n) => { if (n.t === 'canvas' && n.box[2] > 4 && n.box[3] > 4) canvases.push(n); });
    for (const [i, n] of canvases.entries()) {
      const file = `assets/_canvas/canvas-${i + 1}.png`;
      fs.mkdirSync(path.join(dir, 'assets/_canvas'), { recursive: true });
      try { py('imgtools.py', 'crop', path.join(out, ref.file), path.join(dir, file), dpr, ...n.box); n.file = file; } catch {} // cut from the reference
    }

    const assets = await s.flush();
    if (s.failed.length) log(`  ! ${s.failed.length} asset(s) were loaded by the page but could not be saved (the offline copy and the port will lack them): ${s.failed.slice(0, 3).map((f) => `${f.url} (${f.error})`).join('; ')}${s.failed.length > 3 ? ' …' : ''}`);

    // link the tree to local files: images, CSS backgrounds, inline SVG (saved as files), data: URIs
    const byUrl = Object.fromEntries(Object.entries(assets).map(([u, a]) => [u, a.file]));
    let svgN = 0;
    const dataUri = (src) => {
      const m = src.match(/^data:([^;,]+)(;base64)?,(.*)$/s);
      if (!m) return undefined;
      const buf = m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3]));
      const file = `assets/_inline/${crypto.createHash('md5').update(buf).digest('hex').slice(0, 10)}.${EXT[m[1]] || 'bin'}`;
      fs.mkdirSync(path.join(dir, 'assets/_inline'), { recursive: true });
      fs.writeFileSync(path.join(dir, file), buf);
      return file;
    };
    const fileOf = (u) => (u?.startsWith('data:') ? dataUri(u) : byUrl[u]);
    const saveSvg = (svg) => {
      const file = `assets/_svg/svg-${++svgN}.svg`;
      fs.mkdirSync(path.join(dir, 'assets/_svg'), { recursive: true });
      fs.writeFileSync(path.join(dir, file), svg.includes('xmlns=') ? svg : svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'));
      return file;
    };
    const bgFiles = (bg) => [...(bg || '').matchAll(/url\("?([^")]+)"?\)/g)].map((m) => fileOf(m[1]) || m[1]);
    const link = (n) => {
      if (n.src) n.file = fileOf(n.src);
      if (n.svg) { n.file = saveSvg(n.svg); delete n.svg; }
      if (n.s?.backgroundImage) n.bgFiles = bgFiles(n.s.backgroundImage);
      for (const p of Object.values(n.pseudo || {})) if (p.bgImage) p.bgFiles = bgFiles(p.bgImage);
      for (const r of n.runs || []) {
        if (r.img) r.file = fileOf(r.img);
        if (r.svg) { r.file = saveSvg(r.svg); delete r.svg; }
      }
      for (const row of n.rows || []) for (const c of row) if (c.img) c.file = fileOf(c.img);
    };
    walk(tree.body, link);
    for (const f of frames) if (f.tree) walk(f.tree.body, link);

    // inline scripts/styles as files the spec writer can read
    meta.inlineScripts.forEach((t, i) => fs.writeFileSync(path.join(dir, 'js', `inline-${i + 1}.js`), t));
    meta.inlineStyles.forEach((t, i) => fs.writeFileSync(path.join(dir, 'css', `inline-${i + 1}.css`), t));
    meta.inlineScripts = meta.inlineScripts.length;
    meta.inlineStyles = meta.inlineStyles.length;
    meta.capturedAt = new Date().toISOString();
    meta.status = res?.status() ?? null;
    meta.loadEvents = s.guard.events.filter((e) => ['console', 'pageerror', 'dialog', 'popup'].includes(e.type));

    writeJson(path.join(dir, 'page.json'), meta);
    writeJson(path.join(dir, 'dom.json'), tree);
    writeJson(path.join(dir, 'controls.json'), controls);
    writeJson(path.join(dir, 'webforms.json'), webforms);
    writeJson(path.join(dir, 'pseudo.json'), pseudo);
    writeJson(path.join(dir, 'listeners.json'), listen);
    writeJson(path.join(dir, 'frames.json'), frames);
    writeJson(path.join(dir, 'assets', 'index.json'), assets);
    fs.writeFileSync(path.join(dir, 'aria.yml'), aria);

    const snap = await snapshot({ page: s.page, out, log, fullCss: !!cfg.fullCss });
    // the kit's clicks come after every picture of the page at rest
    if (kit) await kit.explore({ page: s.page, context: s.context, s, out, log, kit: kitRest });
    const entries = build(mstatic, movers, snap.keyframes);
    writeJson(path.join(out, 'motion.json'), { capturedAt: new Date().toISOString(), sampleSec: cfg.motion?.sampleSec ?? 10, freeze: fz, entries, transitions: mstatic.transitions, hints: mstatic.hints, running: mstatic.running });
    const kinds = Object.entries(entries.reduce((a, e) => ({ ...a, [e.kind]: (a[e.kind] || 0) + 1 }), {})).map(([k, n]) => `${n} ${k}`).join(', ') || 'none';
    log(`  motion.json: ${entries.length} entries (${kinds}); ${mstatic.transitions.length} transition groups`);

    const fw = Object.entries(meta.framework).filter(([, v]) => v).map(([k]) => k).join(', ') || 'plain';
    log(`  captured: ${controls.length} controls, ${webforms.validators.length} validators, ${Object.keys(assets).length} assets, ${frames.length} frames [${fw}, ${meta.compatMode}]`);
    return { meta, controls, webforms };
  } finally { await s.close(); }
}
