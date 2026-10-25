// Self-test helper: take overlapping scroll screenshots like a person would (page area only).
//   node test/make-shots.mjs <url> <screenshots/<screen>> [cssWidth=1000] [cssHeight=520] [dpr=1.5]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const [url, dir, w = '1000', h = '520', dpr = '1.5'] = process.argv.slice(2);
if (!url || !dir) { console.error('usage: node test/make-shots.mjs <url> <dir> [cssWidth] [cssHeight] [dpr]'); process.exit(1); }
fs.mkdirSync(path.join(dir, 'url'), { recursive: true });
fs.writeFileSync(path.join(dir, 'url', 'url.txt'), url + '\n');
const browser = await chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
await page.goto(url, { waitUntil: 'networkidle' });
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const step = Math.round(+h * 0.7); // ~30% overlap
let n = 0;
for (let y = 0; ; y += step) {
  await page.evaluate((v) => scrollTo(0, v), y);
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(dir, `${String(++n).padStart(2, '0')}.png`) });
  if (y + +h >= total) break;
}
await browser.close();
console.log(`${n} shot(s) in ${dir}`);
