// Phase 2, step 1: turn a captured screen into a running React page, mechanically and for any site.
//   npm run port -- <screen> [--out <dir>] [--force]
// Everything lands in the screen's own folder, outputs/<screen>/app/ (the root app only routes to it):
//   style.css              snapshot/used.css with asset URLs made local
//   assets/                the captured assets, served by Vite at /outputs/<screen>/app/assets/
//   components/<Band>.tsx  one component per band in capture/bands.json (outermost bands only)
//   Page.tsx               the rest of the DOM, with each band swapped for its component
//   BEHAVIOR.md            explore/states.json as one line per transition (what to wire up)
// Reads outputs/<screen>/{capture,snapshot,explore} only. The result is the captured markup with the page's
// own class names: a static, pixel-faithful page whose data-testid keys come from capture/controls.json.
// Behavior (state, dialogs, forms) is the next step, written from spec/UI_SPEC.md and BEHAVIOR.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { toJsx, unsetFirst } from './lib/jsx.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : null);
const screen = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
if (!screen) { console.error('usage: npm run port -- <screen> [--out <dir>] [--force]'); process.exit(1); }

const OUT = path.join(ROOT, 'outputs', screen);
const CAP = path.join(OUT, 'capture');
const SNAP = path.join(OUT, 'snapshot');
for (const f of [path.join(SNAP, 'rendered.html'), path.join(SNAP, 'used.css'), path.join(CAP, 'bands.json')]) {
  if (!fs.existsSync(f)) { console.error(`${f} not found. Run: npm run capture -- ${screen}`); process.exit(2); }
}
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };

const pascal = (s) => s.replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '');
const Screen = pascal(screen);
const dest = opt('--out') ? path.resolve(opt('--out')) : path.join(OUT, 'app');
if (fs.existsSync(dest) && fs.readdirSync(dest).length && !flag('--force')) {
  console.error(`${dest} already exists (hand edits would be lost). Re-run with --force to overwrite it.`);
  process.exit(3);
}
const rel = path.relative(ROOT, dest).replace(/\\/g, '/');
if (rel.startsWith('..')) { console.error('--out must be inside this repo (Vite serves the assets from it)'); process.exit(1); }
const assetBase = `/${rel}/assets/`;

// ---------- assets + URL rewriting ----------
const index = readJson(path.join(CAP, 'assets/index.json'), {});
const local = new Map(); // absolute url -> /<rel>/assets/<file>
const byBase = new Map(); // file name -> local path, or null when two different files share the name
for (const [url, a] of Object.entries(index)) {
  if (!a.file) continue;
  const f = assetBase + a.file.replace(/^assets\//, '');
  local.set(url, f);
  const b = decodeURIComponent(url.split(/[?#]/)[0].split('/').pop() || '');
  if (b) byBase.set(b, byBase.has(b) && byBase.get(b) !== f ? null : f);
}
const assetsTo = path.join(dest, 'assets');
fs.rmSync(assetsTo, { recursive: true, force: true });
if (fs.existsSync(path.join(CAP, 'assets'))) {
  fs.cpSync(path.join(CAP, 'assets'), assetsTo, { recursive: true });
  fs.rmSync(path.join(assetsTo, 'index.json'), { force: true });
  fs.rmSync(path.join(assetsTo, 'metrics'), { recursive: true, force: true });
}
const localizeAbs = (s) => { for (const [u, f] of local) if (s.includes(u)) s = s.split(u).join(f); return s; };
// a relative url() has lost the stylesheet it was written in: match it by file name when that is unambiguous
const unresolved = new Set();
const localizeCss = (css) => localizeAbs(css).replace(/url\(\s*(["']?)([^)"']+)\1\s*\)/g, (all, q, u) => {
  if (u.startsWith(assetBase) || u.startsWith('data:') || u.startsWith('#')) return all;
  const hit = byBase.get(decodeURIComponent(u.split(/[?#]/)[0].split('/').pop() || ''));
  if (hit) return `url(${q}${hit}${q})`;
  unresolved.add(u);
  return all;
});
const rewriteAttr = (v, attr) => {
  const s = localizeAbs(v);
  if (s !== v || !/^(src|poster|data-src)$/.test(attr ?? '') || /^(data:|\/\/|https?:)/.test(v)) return s;
  return byBase.get(decodeURIComponent(v.split(/[?#]/)[0].split('/').pop() || '')) ?? v;
};

// ---------- css ----------
fs.mkdirSync(path.join(dest, 'components'), { recursive: true });
fs.writeFileSync(path.join(dest, 'style.css'), unsetFirst(localizeCss(fs.readFileSync(path.join(SNAP, 'used.css'), 'utf8'))));

// ---------- markup: cut the frozen DOM into bands ----------
const bands = readJson(path.join(CAP, 'bands.json'), []);
const controls = readJson(path.join(CAP, 'controls.json'), []);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route('**/*', (r) => (r.request().url().startsWith('file:') ? r.continue() : r.abort('aborted')));
await page.goto('file:///' + path.join(SNAP, 'rendered.html').replace(/\\/g, '/'));
const cut = await page.evaluate(({ bands, controls }) => {
  document.querySelectorAll('script, noscript, style, link, base').forEach((e) => e.remove());
  // the spec and parity.spec.ts address controls by these keys
  let stamped = 0;
  for (const c of controls) {
    let el = null;
    try { el = document.querySelector(c.sel); } catch { /* selector from another document state */ }
    if (el) { el.setAttribute('data-testid', c.key); stamped++; }
  }
  // outermost bands only: a band inside another band is part of that band's component
  const els = [];
  for (const b of bands) {
    let el = null;
    try { el = document.querySelector(b.sel); } catch { /* skip */ }
    if (el && el !== document.body && !els.includes(el)) els.push(el);
  }
  const outer = els.filter((e) => !els.some((o) => o !== e && o.contains(e)));
  outer.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  const parts = outer.map((e, i) => ({ i, tag: e.tagName.toLowerCase(), id: e.id, html: e.outerHTML }));
  outer.forEach((e, i) => { const s = document.createElement('div'); s.setAttribute('data-slot', String(i)); e.replaceWith(s); });
  return {
    parts, stamped, body: document.body.innerHTML, title: document.title, bodyId: document.body.id,
    bodyClass: document.body.className, htmlClass: document.documentElement.className,
    bodyStyle: document.body.getAttribute('style') || '',
    // themes are selected by attributes, not classes (data-color-mode, data-light-theme, lang...):
    // without them every var() the page's CSS defines under [data-color-mode=…] stays unset
    htmlAttrs: [...document.documentElement.attributes].filter((a) => !/^(class|id|style)$/.test(a.name)).map((a) => [a.name, a.value]),
    bodyAttrs: [...document.body.attributes].filter((a) => !/^(class|id|style)$/.test(a.name)).map((a) => [a.name, a.value]),
  };
}, { bands, controls });
await browser.close();

// component names: the element id when it is a usable identifier, else its tag (+ number when repeated)
const count = {};
for (const p of cut.parts) {
  const base = /^[A-Za-z][\w-]*$/.test(p.id) ? pascal(p.id) : pascal(p.tag);
  count[base] = (count[base] || 0) + 1;
  p.name = count[base] > 1 ? base + String(count[base]).padStart(2, '0') : base;
}

const head = '// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file\n';
for (const p of cut.parts) {
  fs.writeFileSync(path.join(dest, 'components', `${p.name}.tsx`),
    `${head}// Band ${p.i + 1} of ${screen}: ported from outputs/${screen}/snapshot/rendered.html (${p.tag}${p.id ? '#' + p.id : ''}).\n` +
    `export default function ${p.name}() {\n  return (\n    ${toJsx(p.html, rewriteAttr)}\n  );\n}\n`);
}

let body = toJsx(cut.body, rewriteAttr);
body = body.replace(/<div data-slot="(\d+)"><\/div>/g, (_, i) => `<${cut.parts[+i].name} />`);
// The stylesheet is injected while the screen is mounted and removed after, so screens in one app do not leak
// rules (`body`, `*`, `h1`...) into each other. Same for the title and the id/classes the original page keeps on
// <body>/<html>, which its CSS may depend on.
const apply = [cut.title && `document.title = ${JSON.stringify(cut.title)};`,
  cut.bodyId && `body.id = ${JSON.stringify(cut.bodyId)};`,
  cut.bodyClass && `body.className = ${JSON.stringify(cut.bodyClass)};`,
  cut.htmlClass && `html.className = ${JSON.stringify(cut.htmlClass)};`,
  cut.bodyStyle && `body.setAttribute('style', ${JSON.stringify(cut.bodyStyle)});`].filter(Boolean);
fs.writeFileSync(path.join(dest, 'Page.tsx'),
  `${head}import { useLayoutEffect } from 'react';\nimport css from './style.css?inline';\n` +
  cut.parts.map((p) => `import ${p.name} from './components/${p.name}';\n`).join('') +
  `\n// ${screen}: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.\n` +
  `export default function ${Screen}Page() {\n` +
  `  useLayoutEffect(() => {\n    const style = document.createElement('style');\n    style.textContent = css;\n    document.head.append(style);\n` +
  `    const { body, documentElement: html } = document;\n    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];\n` +
  `    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them\n` +
  `    const undo = [[html, ${JSON.stringify(cut.htmlAttrs || [])}], [body, ${JSON.stringify(cut.bodyAttrs || [])}]].flatMap(([el, pairs]) =>\n` +
  `      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));\n` +
  (apply.length ? `    ${apply.join('\n    ')}\n` : '') +
  `    return () => {\n      style.remove();\n      undo.forEach((f) => f());\n      [document.title, body.id, body.className, html.className] = prev;\n      if (prev[4] === null) body.removeAttribute('style'); else body.setAttribute('style', prev[4]);\n    };\n  }, []);\n\n` +
  `  return (\n    <>${body}</>\n  );\n}\n`);

// ---------- behavior digest: explore/states.json, one line per transition ----------
const states = readJson(path.join(OUT, 'explore', 'states.json'), null);
let digest = 0;
if (states?.transitions?.length) {
  const keys = (xs) => xs.map((x) => x.key || x.label || x.sel).join(', ');
  const act = (a) => `${a.a} \`${a.key || a.sel}\`${a.value ? ` "${a.value}"` : ''}${a.label ? ` (${a.label})` : ''}`;
  const lines = states.transitions.map((t) => {
    const e = t.effects || {};
    const fx = [['added', e.added], ['shown', e.shown], ['hidden', e.hidden], ['removed', e.removed], ['enabled', e.enabled], ['checked', e.checked]]
      .filter(([, v]) => v?.length).map(([n, v]) => `${n} ${keys(v)}`);
    if (e.changed?.length) fx.push('changed ' + e.changed.map((c) => `${c.key}.${c.field} \`${c.from}\` → \`${c.to}\``).join('; '));
    if (e.textsAdded?.length) fx.push('text+ ' + e.textsAdded.slice(0, 6).join(' | '));
    if (e.textsRemoved?.length) fx.push('text- ' + e.textsRemoved.slice(0, 6).join(' | '));
    const reqs = [...new Set((t.events || []).filter((v) => v.type === 'request' && v.url).map((v) => `${v.method} ${v.url.split('?')[0].replace(/^https?:\/\/[^/]+/, '')}`))].slice(0, 3);
    const nav = (t.events || []).filter((v) => v.type === 'navigation').map((v) => `navigates ${v.kind || ''} ${v.url || ''}`.trim());
    const after = t.prefix?.length ? ` (after ${t.prefix.map(act).join(' → ')})` : '';
    return `- **${t.id}**${after} ${act(t.action)} → ${fx.join('; ') || 'no visible change'}${[...nav, ...(reqs.length ? [`requests ${reqs.join(', ')}`] : [])].map((x) => ' · ' + x).join('')}${t.shot ? ` · picture outputs/${screen}/${t.shot}` : ''}`;
  });
  fs.writeFileSync(path.join(dest, 'BEHAVIOR.md'),
    `# ${screen}: what each explored action did\n\nGenerated by \`npm run port\` from \`outputs/${screen}/explore/states.json\`; \`spec/UI_SPEC.md\` is the authority.\n` +
    `Keys are the \`data-testid\`s in Page.tsx. A class swap (\`from\` → \`to\`) names rules that already exist in \`style.css\` only if the page had them at capture time; otherwise they are unknown and need a measured value from the picture.\n\n${lines.join('\n')}\n`);
  digest = lines.length;
}

console.log(`${screen} -> ${rel}: ${cut.parts.length} band components, ${cut.stamped}/${controls.length} data-testid keys stamped, ${local.size} assets${digest ? `, ${digest} transitions in BEHAVIOR.md` : ''}`);
for (const p of cut.parts) console.log('  ', p.name.padEnd(18), p.tag + (p.id ? '#' + p.id : ''));
if (unresolved.size) console.log('unresolved css url():', [...unresolved].slice(0, 10).join(', '), unresolved.size > 10 ? `(+${unresolved.size - 10})` : '');
console.log(`next: npm run verify -- ${screen}   (starts its own dev server)`);
