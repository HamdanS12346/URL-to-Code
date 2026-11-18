#!/usr/bin/env node
// Debug helper for portals that fail auto-login heuristics.
// Usage:
//   node scripts/debug-login.mjs --url "https://..." --out "packs/<pack>/login-debug" [--headed]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/paths.mjs';
import { INPAGE } from './lib/freeze.mjs';
import { launch } from './lib/browser.mjs';

const argv = process.argv.slice(2);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const flag = (n) => argv.includes(n);
const die = (m) => { console.error(`\n✗ ${m}`); process.exit(1); };
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };

const url = opt('--url');
const outDir = opt('--out');
if (!url) die('pass --url "https://..."');
if (!outDir) die('pass --out "packs/<pack>/login-debug"');
fs.mkdirSync(outDir, { recursive: true });

const cfg = readJson(path.join(ROOT, 'config.json'), {});
const viewport = cfg.defaultViewport || { width: 1366, height: 900 };
const dpr = cfg.dpr || 1;

const browser = await launch({ ...cfg, headed: flag('--headed') });
try {
  const context = await browser.newContext({ viewport, deviceScaleFactor: dpr, ignoreHTTPSErrors: true, serviceWorkers: 'block' });
  await context.addInitScript({ content: INPAGE });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(1500);

  const meta = {
    startedUrl: url,
    finalUrl: page.url(),
    title: await page.title().catch(() => null),
    viewport,
    dpr,
    frames: [],
  };

  const listInputs = async (frame) => {
    return frame.evaluate(() => {
      const vis = (e) => {
        const r = e.getBoundingClientRect();
        const s = getComputedStyle(e);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0';
      };
      const pickSel = (e) => {
        const id = e.getAttribute('id');
        if (id) return `#${CSS.escape(id)}`;
        const name = e.getAttribute('name');
        if (name) return `${e.tagName.toLowerCase()}[name="${name.replace(/"/g, '\\"')}"]`;
        const ph = e.getAttribute('placeholder');
        if (ph) return `${e.tagName.toLowerCase()}[placeholder="${ph.replace(/"/g, '\\"')}"]`;
        return e.tagName.toLowerCase();
      };
      const els = [...document.querySelectorAll('input,button,a,[role=button]')];
      return els.slice(0, 500).map((e) => ({
        tag: e.tagName.toLowerCase(),
        type: e.getAttribute('type') || null,
        id: e.getAttribute('id') || null,
        name: e.getAttribute('name') || null,
        placeholder: e.getAttribute('placeholder') || null,
        ariaLabel: e.getAttribute('aria-label') || null,
        text: (e.value || e.textContent || '').trim().slice(0, 80) || null,
        visible: vis(e),
        selector: pickSel(e),
      }));
    });
  };

  fs.writeFileSync(path.join(outDir, 'main.html'), await page.content(), 'utf8');
  await page.screenshot({ path: path.join(outDir, 'page.png'), fullPage: true }).catch(() => {});

  const inputs = [];
  const frames = page.frames();
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    const info = { index: i, url: f.url(), name: f.name() || null };
    meta.frames.push(info);
    try {
      const html = await f.content();
      fs.writeFileSync(path.join(outDir, `frame-${i}.html`), html, 'utf8');
    } catch {}
    try {
      inputs.push({ frame: info, elements: await listInputs(f) });
    } catch {}
  }
  fs.writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify(meta, null, 2));
  fs.writeFileSync(path.join(outDir, 'inputs.json'), JSON.stringify(inputs, null, 2));

  console.log(`wrote debug output to: ${outDir}`);
  console.log(`- ${path.join(outDir, 'page.png')}`);
  console.log(`- ${path.join(outDir, 'meta.json')}`);
  console.log(`- ${path.join(outDir, 'inputs.json')}`);
} finally {
  await browser.close().catch(() => {});
}
