// Usage: node scripts/verify.mjs <screen>        (reads .task/<screen>/manifest.json: reference, dpr)
// Renders http://localhost:5173/#/<screen> at the reference's REAL conditions
//   viewport = reference pixels / dpr, deviceScaleFactor = dpr
// then diffs against the reference -> .task/<screen>/verify/{candidate.png,diff.png,report.json}
// BASE=http://localhost:5174 if vite picked another port.
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const screen = process.argv[2] ?? (console.error('usage: node scripts/verify.mjs <screen>'), process.exit(1));
const dir = `.task/${screen}`;
const { reference = 'reference.png', dpr } = JSON.parse(fs.readFileSync(`${dir}/manifest.json`, 'utf8'));
if (!dpr) { console.error(`${dir}/manifest.json has no "dpr". Ask the user (browser console: devicePixelRatio) - never assume 1.`); process.exit(2); }

const png = fs.readFileSync(`${dir}/${reference}`);
const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]; // PNG IHDR
const viewport = { width: Math.round(w / dpr), height: Math.round(h / dpr) };
fs.mkdirSync(`${dir}/verify`, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor: dpr });
await page.goto(`${process.env.BASE ?? 'http://localhost:5173'}/#/${screen}`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${dir}/verify/candidate.png`, fullPage: true });
const env = await page.evaluate(() => ({ innerWidth, dpr: devicePixelRatio, compat: document.compatMode, overflowX: document.documentElement.scrollWidth > innerWidth }));
await browser.close();

console.log(JSON.stringify({ reference: [w, h], viewport, ...env }));
const r = spawnSync('python', ['scripts/diff.py', `${dir}/${reference}`, `${dir}/verify/candidate.png`, `${dir}/verify`], { stdio: 'inherit' });
process.exit(r.status ?? 1);
