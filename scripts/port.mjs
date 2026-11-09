// Phase 2, step 1: turn a captured screen into a running React page, mechanically and for any site.
//   npm run port -- <screen> [--out <dir>] [--force]
//   --scope <sel>   port only that element (a screen's content area, without the site's header/menu)
//   --slot <sel>    port everything but put {children} where that element was (the shared shell around every screen)
//   --name <Name>   component name (default: from the screen name)
//   --assets-dir <dir> --asset-base </url/>   where the assets go and the URL they are served at (needed when --out is
//                   outside this repo, e.g. public/assets/<screen> served at /assets/<screen>/ by the app's own Vite)
//   --kit-import <path>   a screen captured with a site kit (kit/screen.json): import path of the app's kit runtime as seen
//                   from Page.tsx (e.g. ../../kit). Each stamped widget becomes <KitWidget id="kN" />, the page is wrapped in
//                   <KitScreen>, every dialog the capture opened becomes dialogs/Dialog<Id>.tsx, full.css replaces used.css
//   --services <path>     import path (from Page.tsx) of the screen's generated services module (mock data, real endpoint names)
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
import { toJsx, unsetFirst, pretty } from './lib/jsx.mjs';
import { reportPreflight } from './lib/keys.mjs';
import { inlineImports } from './lib/cssimport.mjs';
import { timingPhrase } from './lib/timing.mjs';
import { scrollEars, scrollDirectional, mediaEars } from './lib/behave.mjs';
import { screenDir, relDir } from './lib/paths.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : null);
const VALUED = new Set(['--out', '--scope', '--slot', '--name', '--assets-dir', '--asset-base', '--kit-import', '--services']);
const screen = args.find((a, i) => !a.startsWith('--') && !VALUED.has(args[i - 1]));
if (!screen) { console.error('usage: npm run port -- <screen> [--out <dir>] [--force] [--scope <sel> | --slot <sel>] [--name <Name>] [--assets-dir <dir> --asset-base </url/>]'); process.exit(1); }
const scope = opt('--scope'), slot = opt('--slot');

const OUT = screenDir(screen);
const CAP = path.join(OUT, 'capture');
const SNAP = path.join(OUT, 'snapshot');
for (const f of [path.join(SNAP, 'rendered.html'), path.join(SNAP, 'used.css'), path.join(CAP, 'bands.json')]) {
  if (!fs.existsSync(f)) { console.error(`${f} not found. Run: npm run capture -- ${screen}`); process.exit(2); }
}
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };

const pascal = (s) => s.replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '');
const Screen = opt('--name') || pascal(screen.split('/').pop());
const dest = opt('--out') ? path.resolve(opt('--out')) : path.join(OUT, 'app');
if (fs.existsSync(dest) && fs.readdirSync(dest).length && !flag('--force')) {
  console.error(`${dest} already exists (hand edits would be lost). Re-run with --force to overwrite it.`);
  process.exit(3);
}
const rel = path.relative(ROOT, dest).replace(/\\/g, '/');
if (rel.startsWith('..') && !opt('--asset-base')) { console.error('--out outside this repo needs --assets-dir and --asset-base (this repo\'s Vite only serves its own folders)'); process.exit(1); }
const assetBase = opt('--asset-base') || `/${rel}/assets/`;

// ---------- assets + URL rewriting ----------
const index = readJson(path.join(CAP, 'assets/index.json'), {});
const local = new Map(); // absolute url -> /<rel>/assets/<file>
const byBase = new Map(); // file name -> local path, or null when two different files share the name
for (const [url, a] of Object.entries(index)) {
  if (!a.file) continue;
  const f = assetBase + a.file.replace(/^assets\//, '');
  local.set(url, f);
  if (/^https?:/.test(url)) local.set(url.replace(/^https?:/, ''), f); // CSS and HTML often write //host/path
  const b = decodeURIComponent(url.split(/[?#]/)[0].split('/').pop() || '');
  if (b) byBase.set(b, byBase.has(b) && byBase.get(b) !== f ? null : f);
}
const assetsTo = opt('--assets-dir') ? path.resolve(opt('--assets-dir')) : path.join(dest, 'assets');
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
// a capture made before snapshot.mjs resolved @import still has them in used.css (ignored by the browser mid-file): paste them in now
const pageUrl = readJson(path.join(OUT, 'run.json'), {}).url || 'https://localhost/';
const kitImport = opt('--kit-import');
const kitScreen = kitImport ? readJson(path.join(OUT, 'kit', 'screen.json'), null) : null;
if (kitImport && !kitScreen) { console.error(`--kit-import: ${OUT}/kit/screen.json not found (capture this screen with its kit first)`); process.exit(2); }
// a component one folder down (components/, dialogs/) imports the kit one level further up
const kitFrom = (depth) => (kitImport?.startsWith('.') && depth ? `../${kitImport}` : kitImport);
const cssFile = kitScreen && fs.existsSync(path.join(SNAP, 'full.css')) ? 'full.css' : 'used.css';
const usedCss = inlineImports(fs.readFileSync(path.join(SNAP, cssFile), 'utf8'), pageUrl, index, OUT);
fs.writeFileSync(path.join(dest, 'style.css'), unsetFirst(localizeCss(usedCss)));

// ---------- markup: cut the frozen DOM into bands ----------
const bands = readJson(path.join(CAP, 'bands.json'), []);
const controls = readJson(path.join(CAP, 'controls.json'), []);
// hover-only targets (CSS :hover menus, cards) are not controls, but the spec and parity.spec.ts address them by key too
const hoverKeys = (readJson(path.join(OUT, 'explore', 'states.json'), null)?.hoverTargets || []).filter((h) => h.key && h.sel);
const browser = await chromium.launch({ channel: readJson(path.join(ROOT, 'config.json'), {}).browserChannel || undefined });
const page = await browser.newPage();
await page.route('**/*', (r) => (r.request().url().startsWith('file:') ? r.continue() : r.abort('aborted')));
await page.goto('file:///' + path.join(SNAP, 'rendered.html').replace(/\\/g, '/'));
const kitArg = kitScreen ? { islands: Object.keys(kitScreen.widgets), shell: !!slot } : null;
const cut = await page.evaluate(({ bands, controls, hoverKeys, scope, slot, kit }) => {
  document.querySelectorAll('script, noscript, style, link, base').forEach((e) => e.remove());
  // the spec and parity.spec.ts address controls by these keys
  let stamped = 0;
  for (const c of controls) {
    let el = null;
    try { el = document.querySelector(c.sel); } catch { /* selector from another document state */ }
    if (el) { el.setAttribute('data-testid', c.key); stamped++; }
  }
  for (const h of hoverKeys) {
    let el = null;
    try { el = document.querySelector(h.sel); } catch { /* skip */ }
    if (el && !el.hasAttribute('data-testid')) { el.setAttribute('data-testid', h.key); stamped++; }
  }
  // outermost bands only: a band inside another band is part of that band's component
  const els = [];
  for (const b of bands) {
    let el = null;
    try { el = document.querySelector(b.sel); } catch { /* skip */ }
    if (el && el !== document.body && !els.includes(el)) els.push(el);
  }
  let outer = els.filter((e) => !els.some((o) => o !== e && o.contains(e)));
  outer.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  // --scope: only the content area; --slot: everything but the content area, which becomes {children}.
  // Bands are cut by their positional selectors BEFORE the DOM is reshaped; a band around the slot stays in Page.tsx.
  const q = (s) => { try { return s ? document.querySelector(s) : null; } catch { return null; } };
  const root = q(scope), hole = q(slot);
  if (scope && !root) return { error: `--scope ${scope} matches nothing in snapshot/rendered.html` };
  if (slot && !hole) return { error: `--slot ${slot} matches nothing in snapshot/rendered.html` };
  if (root) { outer = outer.filter((e) => root === e || root.contains(e)); document.body.replaceChildren(root); }
  if (hole) {
    outer = outer.filter((e) => !hole.contains(e) && !e.contains(hole));
    const s = document.createElement('div'); s.setAttribute('data-slot', 'children'); hole.replaceWith(s);
  }
  // site kit: every stamped widget becomes a placeholder for <KitWidget id="kN" />; on the shell, the title bar texts become props
  if (kit) {
    for (const el of [...document.querySelectorAll('[data-kit-drop]')]) { el.remove(); outer = outer.filter((o) => o.isConnected); } // the site's popup leftovers: the kit renders its own
    for (const el of [...document.querySelectorAll('[data-kit]')]) {
      const id = el.getAttribute('data-kit');
      if (!kit.islands.includes(id) || !el.isConnected) continue;
      const s = document.createElement('div'); s.setAttribute('data-slot-kit', id); el.replaceWith(s);
      outer = outer.map((o) => (o === el ? s : o));
    }
    if (kit.shell) for (const [k, m] of [['title', '__KIT_TITLE__'], ['module', '__KIT_MODULE__']]) { const e = document.querySelector(`[data-kit-shell=${k}]`); if (e) e.textContent = m; }
  }
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
}, { bands, controls, hoverKeys, scope, slot, kit: kitArg });
// the dialogs the kit opened: their content, with the same placeholders
const dialogHtml = {};
if (kitScreen) for (const id of Object.keys(kitScreen.dialogs || {})) {
  const f = path.join(OUT, 'kit', 'dialogs', `${id}.html`);
  if (!fs.existsSync(f)) continue;
  dialogHtml[id] = await page.evaluate(({ html, islands }) => {
    const box = document.createElement('div');
    box.innerHTML = html;
    box.querySelectorAll('script, noscript, style, link').forEach((e) => e.remove());
    for (const el of [...box.querySelectorAll('[data-kit]')]) {
      if (!islands.includes(el.getAttribute('data-kit')) || !el.isConnected) continue;
      const s = document.createElement('div'); s.setAttribute('data-slot-kit', el.getAttribute('data-kit')); el.replaceWith(s);
    }
    return box.innerHTML;
  }, { html: fs.readFileSync(f, 'utf8'), islands: Object.values(kitScreen.dialogs).flatMap((d) => Object.keys(d.widgets)) });
}
await browser.close();
if (cut.error) { console.error(cut.error); process.exit(2); }

// component names: the element id when it is a usable identifier, else its tag (+ number when repeated)
const count = {};
for (const p of cut.parts) {
  const base = /^[A-Za-z][\w-]*$/.test(p.id) ? pascal(p.id) : pascal(p.tag);
  count[base] = (count[base] || 0) + 1;
  p.name = count[base] > 1 ? base + String(count[base]).padStart(2, '0') : base;
}

const head = '// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file\n';
const islands = (jsx) => jsx.replace(/<div data-slot-kit="([\w-]+)"><\/div>/g, '<KitWidget id="$1" />');
const kitShell = (jsx) => jsx.replace(/\{"__KIT_TITLE__"\}/g, '{title}').replace(/\{"__KIT_MODULE__"\}/g, '{module}');
const usesKit = (jsx) => (kitImport && jsx.includes('<KitWidget') ? `import { KitWidget } from '${kitFrom(1)}';\n` : '');
const withProps = new Set();
for (const p of cut.parts) {
  const jsx = kitShell(islands(pretty(toJsx(p.html, rewriteAttr))));
  const props = /\{(title|module)\}/.test(jsx);
  if (props) withProps.add(p.name);
  fs.writeFileSync(path.join(dest, 'components', `${p.name}.tsx`),
    `${head}${usesKit(jsx)}// Band ${p.i + 1} of ${screen}: ported from ${relDir(screen)}/snapshot/rendered.html (${p.tag}${p.id ? '#' + p.id : ''}).\n` +
    `export default function ${p.name}(${props ? '{ title, module }: { title?: string; module?: string }' : ''}) {\n  return (\n    ${jsx}\n  );\n}\n`);
}
// the kit's dialogs: one component each, rendered by <KitScreen> when their opener is clicked
const dialogNames = {};
if (kitScreen) {
  fs.rmSync(path.join(dest, 'dialogs'), { recursive: true, force: true });
  for (const [id, html] of Object.entries(dialogHtml)) {
    const nm = 'Dialog' + pascal(id);
    dialogNames[id] = nm;
    fs.mkdirSync(path.join(dest, 'dialogs'), { recursive: true });
    const jsx = islands(pretty(toJsx(html, rewriteAttr)));
    fs.writeFileSync(path.join(dest, 'dialogs', `${nm}.tsx`), `${head}${usesKit(jsx)}// Dialog ${id} "${kitScreen.dialogs[id].title}" of ${screen}: ported from ${relDir(screen)}/kit/dialogs/${id}.html.\n` +
      `export default function ${nm}() {\n  return (\n    <>${jsx}</>\n  );\n}\n`);
  }
  fs.writeFileSync(path.join(dest, 'kit.json'), JSON.stringify(kitScreen)); // the kit runtime reads its widgets, grids, dialogs and the live popup templates from here
}

let body = toJsx(cut.body, rewriteAttr);
body = kitShell(islands(pretty(body.replace(/<div data-slot="(\d+)"><\/div>/g, (_, i) => `<${cut.parts[+i].name}${withProps.has(cut.parts[+i].name) ? ' title={title} module={module}' : ''} />`).replace(/<div data-slot="children"><\/div>/, '{children}'))));
if (kitScreen) body = `<KitScreen screen={kit as unknown as KitData} dialogs={{ ${Object.entries(dialogNames).map(([id, nm]) => `${id}: ${nm}`).join(', ')} }}${opt('--services') ? ' services={services}' : ''}${slot ? ' shell' : ''}>${body}</KitScreen>`;
// The stylesheet is injected while the screen is mounted and removed after, so screens in one app do not leak
// rules (`body`, `*`, `h1`...) into each other. Same for the title and the id/classes the original page keeps on
// <body>/<html>, which its CSS may depend on.
const apply = [cut.title && `document.title = ${JSON.stringify(cut.title)};`,
  cut.bodyId && `body.id = ${JSON.stringify(cut.bodyId)};`,
  cut.bodyClass && `body.className = ${JSON.stringify(cut.bodyClass)};`,
  cut.htmlClass && `html.className = ${JSON.stringify(cut.htmlClass)};`,
  cut.bodyStyle && `body.setAttribute('style', ${JSON.stringify(cut.bodyStyle)});`].filter(Boolean);
fs.writeFileSync(path.join(dest, 'Page.tsx'),
  `${head}import { useLayoutEffect${slot ? ', type ReactNode' : ''} } from 'react';\nimport css from './style.css?inline';\n` +
  (kitScreen ? `import { KitScreen, KitWidget, type KitData } from '${kitFrom(0)}';\nimport kit from './kit.json';\n${opt('--services') ? `import * as services from '${opt('--services')}';\n` : ''}${Object.values(dialogNames).map((nm) => `import ${nm} from './dialogs/${nm}';\n`).join('')}` : '') +
  cut.parts.map((p) => `import ${p.name} from './components/${p.name}';\n`).join('') +
  `\n// ${screen}: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.\n` +
  `export default function ${Screen}Page(${slot ? `{ children${kitScreen ? ', title, module' : ''} }: { children?: ReactNode; title?: string; module?: string }` : ''}) {\n` +
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
const behave = readJson(path.join(OUT, 'explore', 'survey', 'behave.json'), null);
let digest = 0;
if (states?.transitions?.length || behave) {
  const keys = (xs) => xs.map((x) => x.key || x.label || x.sel).join(', ');
  const act = (a) => `${a.a} \`${a.key || a.sel}\`${a.value ? ` "${a.value}"` : ''}${a.label ? ` (${a.label})` : ''}`;
  const lines = (states?.transitions || []).map((t) => {
    const e = t.effects || {};
    const fx = [['added', e.added], ['shown', e.shown], ['hidden', e.hidden], ['removed', e.removed], ['enabled', e.enabled], ['checked', e.checked]]
      .filter(([, v]) => v?.length).map(([n, v]) => `${n} ${keys(v)}`);
    if (e.changed?.length) fx.push('changed ' + e.changed.map((c) => `${c.key}.${c.field} \`${c.from}\` → \`${c.to}\``).join('; '));
    if (e.textsAdded?.length) fx.push('text+ ' + e.textsAdded.slice(0, 6).join(' | '));
    if (e.textsRemoved?.length) fx.push('text- ' + e.textsRemoved.slice(0, 6).join(' | '));
    const reqs = [...new Set((t.events || []).filter((v) => v.type === 'request' && v.url).map((v) => `${v.method} ${v.url.split('?')[0].replace(/^https?:\/\/[^/]+/, '')}`))].slice(0, 3);
    const nav = (t.events || []).filter((v) => v.type === 'navigation').map((v) => `navigates ${v.kind || ''} ${v.url || ''}`.trim());
    const anim = (t.timing || []).slice(0, 2).map(timingPhrase);
    const after = t.prefix?.length ? ` (after ${t.prefix.map(act).join(' → ')})` : '';
    return `- **${t.id}**${after} ${act(t.action)} → ${fx.join('; ') || 'no visible change'}${[...nav, ...(reqs.length ? [`requests ${reqs.join(', ')}`] : []), ...(anim.length ? [`animation: ${anim.join('; ')}`] : [])].map((x) => ' · ' + x).join('')}${t.shot ? ` · picture ${relDir(screen)}/${t.shot}` : ''}`;
  });
  fs.writeFileSync(path.join(dest, 'BEHAVIOR.md'),
    `# ${screen}: what each explored action did\n\nGenerated by \`npm run port\` from \`${relDir(screen)}/explore/states.json\`; \`spec/UI_SPEC.md\` is the authority.\n` +
    `Keys are the \`data-testid\`s in Page.tsx. A class swap (\`from\` → \`to\`) names rules that already exist in \`style.css\` only if the page had them at capture time; otherwise they are unknown and need a measured value from the picture.\n` +
    `"animation:" lines are measured frame by frame on the live page: build them with those durations and easings, not with an instant show/hide.\n\n${lines.join('\n')}\n` +
    // measured by scrolling / playing the live page: a port copies the markup, not the script that makes a header stick or a video play
    (behave?.scroll?.behaviors?.length || behave?.scroll?.rootChanges?.length ? `\n## Scroll (the port is static: none of this exists until it is built)\n\n${behave.scroll.behaviors.map((b) => `- **[${b.id}]** ${scrollEars(b)}${scrollDirectional(b)}${b.key ? ` (control \`${b.key}\`)` : ''}`).join('\n')}\n${(behave.scroll.rootChanges || []).map((r) => `- scrolled past ~${r.toY}px: <${r.el}> class ${[...r.added.map((x) => '+' + x), ...r.removed.map((x) => '−' + x)].join(' ')}`).join('\n')}\n` : '') +
    (behave?.media?.videos?.length ? `\n## Media (React drops or ignores some attributes: check each video actually plays)\n\n${behave.media.videos.map((v) => mediaEars(v).map((l) => `- **[${v.id}]** ${l}`).join('\n')).join('\n')}\n` : ''));
  digest = lines.length;
}

console.log(`${screen} -> ${rel}: ${cut.parts.length} band components, ${cut.stamped}/${controls.length} data-testid keys stamped, ${local.size} assets${digest ? `, ${digest} transitions in BEHAVIOR.md` : ''}`);
for (const p of cut.parts) console.log('  ', p.name.padEnd(18), p.tag + (p.id ? '#' + p.id : ''));
if (unresolved.size) console.log('unresolved css url():', [...unresolved].slice(0, 10).join(', '), unresolved.size > 10 ? `(+${unresolved.size - 10})` : '');
console.log(`next: npm run verify -- ${screen}   (starts its own dev server)`);
