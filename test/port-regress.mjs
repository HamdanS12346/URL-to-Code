// node test/port-regress.mjs — regressions found while porting github:
//   1. usedCss keeps `a:not(:focus)` rules (stripping the state used to leave `:not()`, which throws, and the rule was dropped)
//   2. port restores <html>/<body> data-* attributes (the theme colours hang off data-color-mode / data-light-theme)
//   3. pretty() only reformats: removing the line breaks gives the original markup back
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { INPAGE } from '../scripts/lib/freeze.mjs';
import { pretty, toJsx } from '../scripts/lib/jsx.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

// 1
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<style>a:not(:focus){color:red} a:hover{color:blue} p:not(:focus-visible):not(:hover){margin:0} .gone:hover{color:green}</style><a href="#">x</a><p>y</p>');
await page.evaluate(INPAGE);
const css = (await page.evaluate(() => window.__pw.usedCss())).sheets.map((s) => s.text).join('\n');
await browser.close();
assert.ok(css.includes('a:not(:focus)'), `:not(:focus) rule dropped:\n${css}`);
assert.ok(css.includes('a:hover') && css.includes('p:not(:focus-visible)'), css);
assert.ok(!css.includes('.gone'), 'a rule for an element that does not exist must stay dropped');

// 2
const screen = '_test-port-regress';
const out = path.join(ROOT, 'outputs', screen);
try {
  fs.mkdirSync(path.join(out, 'capture'), { recursive: true });
  fs.mkdirSync(path.join(out, 'snapshot'), { recursive: true });
  fs.writeFileSync(path.join(out, 'snapshot', 'rendered.html'), '<!doctype html><html lang="en" data-color-mode="dark" data-light-theme="light"><body data-x="1"><div id="a">hi</div></body></html>');
  fs.writeFileSync(path.join(out, 'snapshot', 'used.css'), 'body{margin:0}');
  fs.writeFileSync(path.join(out, 'capture', 'bands.json'), '[]');
  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'port.mjs'), screen], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr || r.stdout);
  const tsx = fs.readFileSync(path.join(out, 'app', 'Page.tsx'), 'utf8');
  for (const want of ['["data-color-mode","dark"]', '["data-light-theme","light"]', '["data-x","1"]']) assert.ok(tsx.includes(want), `Page.tsx lacks ${want}`);
} finally {
  fs.rmSync(out, { recursive: true, force: true });
}

// 3
const html = '<div class="a" title="x>y"><p>it\'s <b>bold</b> text</p><ul><li><a href="/x">one</a></li><li></li></ul><img src="i.png"><span>{"<b></b>"}</span></div>';
const jsx = toJsx(html);
const nice = pretty(jsx);
assert.equal(nice.replace(/>\n\s*</g, '><'), jsx, 'pretty changed more than line breaks');
assert.ok(nice.split('\n').length > 5, `not broken into lines:\n${nice}`);
assert.ok(nice.includes('<li></li>'), 'an empty pair stays on one line');

console.log('port-regress: ok');
