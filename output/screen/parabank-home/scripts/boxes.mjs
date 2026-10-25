// Compare rendered boxes against the capture's dom.json (CSS px).
import { chromium } from 'playwright';
import fs from 'node:fs';

const CAP = process.argv[2];
const BASE = process.env.BASE ?? 'http://localhost:5173';
const cap = JSON.parse(fs.readFileSync(CAP, 'utf8'));

const want = new Map();
(function walk(n) {
  const k = n.key || n.id;
  if (k) want.set(k, n.box);
  for (const c of n.k || []) walk(c);
})(cap.body);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1279, height: 764 }, deviceScaleFactor: 1.5 });
await page.goto(`${BASE}/#/parabank-home`);
await page.evaluate(() => document.fonts.ready);

const got = await page.evaluate((keys) => {
  const out = {};
  for (const k of keys) {
    const e = document.querySelector(`[data-testid="${k}"]`) || document.getElementById(k);
    if (!e) { out[k] = null; continue; }
    const r = e.getBoundingClientRect();
    out[k] = [r.x + scrollX, r.y + scrollY, r.width, r.height].map((v) => Math.round(v * 100) / 100);
  }
  return out;
}, [...want.keys()]);
await browser.close();

// capture ran in a 1264px-wide body (scrollbar); fullPage render is 1279 -> centred
// content sits 7.5px further right. Compare x after removing that constant.
const DX = (1279 - 1264) / 2;
let bad = 0;
for (const [k, exp] of want) {
  const g = got[k];
  if (!g) { console.log(`MISSING  ${k}`); bad++; continue; }
  const d = [g[0] - DX - exp[0], g[1] - exp[1], g[2] - exp[2], g[3] - exp[3]].map((v) => Math.round(v * 100) / 100);
  if (d.some((v) => Math.abs(v) > 1)) { console.log(`DIFF ${k.padEnd(34)} exp=${JSON.stringify(exp)} got=${JSON.stringify(g)} d=${JSON.stringify(d)}`); bad++; }
}
console.log(bad === 0 ? 'all boxes match' : `${bad} boxes differ (of ${want.size})`);
