// Step 4 — facts: turn capture/ + explore/ into what the spec writer reads, plus generated parity tests.
// Deterministic: every line comes from an observation. Writes outputs/<screen>/:
//   facts.md      the brief (read first)         content.md   verbatim page content in document order
//   facts.json    ids the spec must cite         manifest.json  reference + dpr for scripts/verify.mjs
//   spec/parity.spec.ts + spec/selectors.json    same tests run against legacy (default) and the React rebuild
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim();
const short = (s, n = 60) => { s = String(s ?? '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n) + '…' : s; };
const relPath = (u, origin) => { try { const x = new URL(u); return x.origin === origin ? x.pathname + x.search : u; } catch { return u; } };
const VISUAL = ['backgroundColor', 'backgroundImage', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'boxShadow', 'borderRadius'];
const walk = (n, fn, depth = 0) => { if (!n) return; fn(n, depth); for (const k of n.k || []) walk(k, fn, depth + 1); };
const px = (b) => (b ? `${Math.round(b[2])}×${Math.round(b[3])}` : '');

// ---------- EARS phrasing ----------
const L = (x) => (x.label ? `"${short(x.label, 50)}" (${x.key})` : `${x.key}`);
function actionPhrase(a, ctrl) {
  const k = ctrl[a.key]?.kind;
  switch (a.a) {
    case 'click':
      if (k === 'checkbox') return `${a.why === 'uncheck' ? 'unchecks' : 'checks'} ${L(a)}`;
      if (k === 'radio') return `selects the option ${L(a)}`;
      return `clicks ${k === 'link' ? 'the link ' : ''}${L(a)}`;
    case 'hover': return `hovers over ${L(a)}`;
    case 'select': return `selects "${short(a.value, 40)}" in ${L(a)}`;
    case 'fill': return a.value === '' ? `clears ${L(a)} and leaves it` : `enters "${short(a.value, 40)}" in ${L(a)} and leaves the field${a.why && a.why !== 'valid' ? ` (${a.why})` : ''}`;
    case 'validate': return `triggers client validation of ${a.label}`;
    case 'fillall': return `fills ${a.fields.map((f) => f.key).join(', ')} with valid values and clicks ${L(a)}`;
    default: return `${a.a} ${L(a)}`;
  }
}
function effectPhrases(t, origin) {
  const e = t.effects, out = [];
  const list = (xs) => xs.slice(0, 6).map(L).join(', ') + (xs.length > 6 ? ` and ${xs.length - 6} more` : '');
  if (e.shown || e.added) out.push(`show ${list([...(e.shown || []), ...(e.added || [])])}`);
  if (e.hidden || e.removed) out.push(`hide ${list([...(e.hidden || []), ...(e.removed || [])])}`);
  if (e.enabled) out.push(`enable ${list(e.enabled)}`);
  if (e.disabled) out.push(`disable ${list(e.disabled)}`);
  if (e.checked) out.push(`check ${list(e.checked)}`);
  if (e.unchecked) out.push(`uncheck ${list(e.unchecked)}`);
  for (const c of e.changed || []) {
    if (c.field === 'val') out.push(`set ${L(c)} to "${short(c.to, 40)}"`);
    else if (c.field === 'opts') out.push(`replace the options of ${L(c)} with ${short(String(c.to).replace(/^(\d+):/, '$1 options: '), 90)}`);
    else if (c.field === 't') out.push(`change the text of ${L(c)} to "${short(c.to, 80)}"`);
    else if (c.field === 'ex') out.push(`set ${L(c)} expanded=${c.to}`);
    else if (c.field === 'cls') out.push(`change the class of ${L(c)} from "${short(c.from, 40)}" to "${short(c.to, 40)}"`);
  }
  const shownText = [...(e.shown || []), ...(e.added || [])].map((x) => x.label || '').join(' ');
  for (const s of (e.textsAdded || []).filter((s) => !shownText.includes(s.replace(/…$/, ''))).slice(0, 3)) out.push(`display "${short(s, 80)}"`);
  if (!out.length) for (const s of (e.textsRemoved || []).slice(0, 2)) out.push(`stop displaying "${short(s, 80)}"`);
  for (const ev of t.events || []) {
    const p = relPath(ev.url, origin);
    const target = ev.post?.__EVENTTARGET ? ` (event target ${ev.post.__EVENTTARGET})` : '';
    if (ev.type === 'postback') out.push(`post back to the server${target}${ev.status === 'blocked' ? ' [request blocked during capture: server response not observed]' : ''}`);
    else if (ev.type === 'async-postback') out.push(`send an async (UpdatePanel) postback${ev.status === 'blocked' ? ' [blocked during capture]' : ''}`);
    else if (ev.type === 'request') out.push(`${ev.method} ${p}${ev.status === 'blocked' ? ' [blocked during capture]' : ''}`);
    else if (ev.type === 'navigation') out.push(ev.kind === 'client' ? `route to ${p}` : `navigate to ${p}${ev.method && ev.method !== 'GET' ? ` (${ev.method}, cross-page post)` : ''}`);
    else if (ev.type === 'dialog') out.push(`show a ${ev.kind} dialog "${short(ev.message, 100)}"`);
    else if (ev.type === 'popup') out.push(`open a new window ${p}`);
    else if (ev.type === 'download') out.push(`download "${ev.file}"`);
    else if (ev.type === 'pageerror') out.push(`raise a script error "${short(ev.message, 80)}"`);
  }
  return [...new Set(out)];
}
export const ears = (t, ctrl, origin) => {
  const steps = [...t.prefix, t.action].map((a) => actionPhrase(a, ctrl));
  return `WHEN the user ${steps.join(', then ')} THE SYSTEM SHALL ${effectPhrases(t, origin).join('; ')}.`;
};

// ---------- content.md: the page's content verbatim, in document order ----------
function contentMd(tree, origin) {
  const lines = [];
  const runText = (runs) => runs.map((r) => {
    if (r.img) return `![${r.alt || ''}](${r.file || r.img})`;
    if (r.file && r.x === undefined) return `[svg ${r.file} ${r.w}×${r.h}]`;
    let x = r.x;
    if (x === '\n') return '  \n';
    if (r.b) x = `**${x.trim()}**`;
    if (r.i) x = `_${x.trim()}_`;
    if (r.a) x = `[${x}](${relPath(r.a, origin)})${r.key ? `{${r.key}}` : ''}`;
    return x;
  }).join('');
  const boxNote = (n) => {
    const s = n.s || {}, bits = [];
    if (s.backgroundColor) bits.push(`bg ${s.backgroundColor}`);
    if (n.bgFiles?.length) bits.push(`bg-image ${n.bgFiles.join(', ')}`);
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) if (s[`border${side}`]) bits.push(`border-${side.toLowerCase()} ${s[`border${side}`]}`);
    if (s.borderRadius) bits.push(`radius ${s.borderRadius}`);
    if (s.boxShadow) bits.push(`shadow ${s.boxShadow}`);
    if (s.padding) bits.push(`padding ${s.padding}`);
    if (s.display && /flex|grid/.test(s.display)) bits.push(`${s.display}${s.flexDirection ? ' ' + s.flexDirection : ''}${s.gap ? ' gap ' + s.gap : ''}${s.gridTemplateColumns ? ' cols ' + s.gridTemplateColumns : ''}`);
    return bits.join(', ');
  };
  const node = (n) => {
    if (!n) return;
    if (n.t === '#text') { lines.push(runText(n.runs)); return; }
    const tag = n.t, who = n.key ? `{${n.key}}` : '';
    if (n.pseudo) for (const [w, p] of Object.entries(n.pseudo)) if (p.content && p.content !== '""') lines.push(`<!-- ::${w} ${p.content} (font ${p.font} ${p.size}, color ${p.color}) -->`);
    if (tag === 'img') { lines.push(`![${n.alt || ''}](${n.file || n.src}) <!-- ${px(n.box)} CSS, natural ${n.nat?.join('×')} ${who} -->`); return; }
    if (tag === 'svg') { lines.push(`[svg icon ${n.file} ${px(n.box)}] ${who}`); return; }
    if (tag === 'canvas') { lines.push(`[canvas ${px(n.box)} -> picture ${n.file}] ${who}`); return; }
    if (['iframe', 'video', 'audio', 'embed', 'object'].includes(tag)) { lines.push(`[${tag} ${relPath(n.src, origin)} ${px(n.box)}] ${who}`); return; }
    if (['input', 'select', 'textarea'].includes(tag)) {
      const bits = [n.type, who, n.value != null ? `value="${short(n.value, 60)}"` : '', n.placeholder ? `placeholder="${n.placeholder}"` : '', n.checked ? 'checked' : '', n.disabled ? 'disabled' : '', px(n.box)];
      lines.push(`[${tag} ${bits.filter(Boolean).join(' ')}]${n.options ? ' options: ' + n.options.slice(0, 30).join(' | ') + (n.options.length > 30 ? ' …' : '') : ''}`);
      return;
    }
    if (n.rows) {
      lines.push(`<!-- table ${who} ${n.rowCount} rows, ${px(n.box)}; header cell: ${JSON.stringify(n.cellStyle?.th || {})}; body cell: ${JSON.stringify(n.cellStyle?.td || {})}; row bg: ${(n.rowStyle || []).map((r) => r.bg).join(', ')} -->`);
      const rows = n.rows.slice(0, 40);
      const width = Math.max(1, ...rows.map((r) => r.length));
      rows.forEach((r, i) => {
        lines.push('| ' + Array.from({ length: width }, (_, j) => cell((r[j]?.x || '') + (r[j]?.k ? ` {${r[j].k.join(',')}}` : '') + (r[j]?.file ? ` ![](${r[j].file})` : ''))).join(' | ') + ' |');
        if (i === 0) lines.push('|' + ' --- |'.repeat(width));
      });
      if (n.rowCount > 40) lines.push(`<!-- … ${n.rowCount - 40} more rows -->`);
      return;
    }
    const styled = !!n.s && VISUAL.some((k) => k in n.s);
    if (styled) lines.push(`<!-- box ${tag}${n.id ? '#' + n.id : ''}${n.cls ? '.' + n.cls.split(' ')[0] : ''} ${who} ${px(n.box)}: ${boxNote(n)} -->`);
    if (n.runs) {
      const t = runText(n.runs);
      if (tag === 'a' && n.href != null) { lines.push(`[${t}](${relPath(n.href, origin)}) ${who}`); }
      else {
        const pre = /^h[1-6]$/.test(tag) ? '#'.repeat(+tag[1]) + ' ' : tag === 'li' ? '- ' : tag === 'button' ? '[button] ' : tag === 'label' ? 'label: ' : '';
        lines.push(pre + t + (who && !n.runs.some((r) => r.key === n.key) ? ` ${who}` : ''));
      }
    } else if ((tag === 'a' || tag === 'button') && !n.k) lines.push(`[${tag} ${who} ${n.label || ''}]`);
    else if (tag === 'hr') lines.push('---');
    for (const k of n.k || []) node(k);
    if (styled) lines.push('<!-- /box -->');
  };
  node(tree.body);
  return lines.filter((l, i, a) => l.trim() || (i > 0 && a[i - 1].trim())).join('\n');
}

// ---------- parity.spec.ts ----------
function paritySpec({ url, viewport, dpr, cfg, transitions, sel, ctrl, origin }) {
  const deny = new RegExp(cfg.denyPattern, 'i');
  const tests = [];
  for (const t of transitions) {
    const asserts = [], e = t.effects;
    const k = (x) => JSON.stringify(x.key);
    for (const x of [...(e.shown || []), ...(e.added || [])].slice(0, 8)) asserts.push(`await expect(el(page, ${k(x)})).toBeVisible();`);
    // "hidden" through a positional selector is meaningless: after a re-render that position holds something else
    const stable = (x) => /^(#|\[data-testid)/.test(x.sel || '') && !(x.sel || '').includes(' > ');
    for (const x of [...(e.hidden || []), ...(e.removed || [])].filter(stable).slice(0, 8)) asserts.push(`await expect(el(page, ${k(x)})).toBeHidden();`);
    for (const x of e.enabled || []) asserts.push(`await expect.poll(() => isDisabled(page, ${k(x)})).toBe(false);`);
    for (const x of e.disabled || []) asserts.push(`await expect.poll(() => isDisabled(page, ${k(x)})).toBe(true);`);
    for (const x of e.checked || []) asserts.push(`await expect(el(page, ${k(x)})).toBeChecked();`);
    for (const x of e.unchecked || []) asserts.push(`await expect(el(page, ${k(x)})).not.toBeChecked();`);
    for (const c of e.changed || []) {
      if (c.field === 'val' && c.to !== '***') asserts.push(`await expect(el(page, ${k(c)})).toHaveValue(${JSON.stringify(c.to ?? '')});`);
      if (c.field === 'opts') asserts.push(`await expect(el(page, ${k(c)}).locator('option')).toHaveCount(${parseInt(c.to, 10) || 0});`);
      if (c.field === 't' && c.to && c.to.length < 150 && !c.to.endsWith('…')) asserts.push(`await expect(el(page, ${k(c)})).toHaveText(${JSON.stringify(c.to)});`);
      if (c.field === 'ex') asserts.push(`await expect(el(page, ${k(c)})).toHaveAttribute('aria-expanded', ${JSON.stringify(c.to)});`);
    }
    for (const s of (e.textsAdded || []).slice(0, 2)) asserts.push(`await expect(page.getByText(${JSON.stringify(s.replace(/…$/, '').slice(0, 80))}, { exact: false }).first()).toBeVisible();`);
    for (const ev of t.events || []) {
      if (ev.type === 'navigation') {
        const p = relPath(ev.url, origin).split('#')[0].toLowerCase();
        asserts.push(`expect(TARGET === 'legacy' ? h.navs.some((u) => u.toLowerCase().includes(${JSON.stringify(p)})) : h.navs.length > 0 || page.url() !== URL).toBeTruthy();`);
      }
      if (ev.type === 'dialog') asserts.push(`expect(h.dialogs.join('\\n')).toContain(${JSON.stringify(String(ev.message).slice(0, 60))});`);
      if (ev.type === 'popup') asserts.push(`expect(h.navs.length).toBeGreaterThan(0);`);
    }
    if (!asserts.length) continue;
    const steps = [...t.prefix, t.action];
    const strip = (a) => { const o = { a: a.a, key: a.key }; for (const f of ['value', 'index', 'group']) if (a[f] !== undefined) o[f] = a[f]; if (a.fields) o.fields = a.fields.map(strip); return o; };
    const blocked = cfg.mode === 'readonly' || (t.events || []).some((ev) => ev.status === 'blocked') ||
      steps.some((a) => cfg.mode === 'safe' && deny.test(`${a.label || ''} ${a.key} ${ctrl[a.key]?.id || ''} ${ctrl[a.key]?.text || ''}`));
    const legacyOnly = steps.some((a) => a.a === 'validate');
    tests.push(`test(${JSON.stringify(`${t.id} ${short(steps.map((a) => `${a.a} ${a.key}`).join(' > '), 90)}`)}, async ({ page }) => {
${legacyOnly ? `  test.skip(TARGET !== 'legacy', 'WebForms client validation call: the rebuild covers this through its own submit test');\n` : ''}  const h = await open(page, ${blocked});
  for (const a of ${JSON.stringify(steps.map(strip))}) await act(page, a);
  ${asserts.join('\n  ')}
});`);
  }
  return `// GENERATED by scripts/facts.mjs from explore/states.json. Do not edit: rerun \`npm run capture -- <screen> --from facts\`.
// Legacy (default):  npx playwright test <this file>
// React rebuild:     TARGET=react URL=http://localhost:5173/#/<route> npx playwright test <this file>
//   The rebuild must put data-testid="<key>" on every element named below (keys = the ids in facts.md / UI_SPEC.md).
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';

const LEGACY_URL = ${JSON.stringify(url)};
const TARGET = process.env.TARGET ?? 'legacy';
const URL = process.env.URL ?? LEGACY_URL;
const AUTH = ${JSON.stringify(cfg.auth?.storageState || '')};
const SEL: Record<string, string> = ${JSON.stringify(sel, null, 2)};

test.use({ viewport: ${JSON.stringify(viewport)}, deviceScaleFactor: ${dpr}, storageState: TARGET === 'legacy' && AUTH && fs.existsSync(AUTH) ? AUTH : undefined });

const el = (page: Page, key: string) => page.locator(TARGET === 'legacy' ? SEL[key] ?? \`[data-testid="\${key}"]\` : \`[data-testid="\${key}"]\`).first();
const isDisabled = (page: Page, key: string) => el(page, key).evaluate((e: any) => !!(e.disabled || e.classList.contains('aspNetDisabled') || e.getAttribute('aria-disabled') === 'true'));

// load the page; navigations away are blocked and recorded; server posts blocked when the test came from a blocked one
async function open(page: Page, blockPost: boolean) {
  const start = new globalThis.URL(URL);
  const navs: string[] = [], dialogs: string[] = [];
  let opened = false;
  await page.route('**/*', (r) => {
    const q = r.request();
    let u: globalThis.URL;
    try { u = new globalThis.URL(q.url()); } catch { return r.continue(); }
    const mutating = !['GET', 'HEAD', 'OPTIONS'].includes(q.method());
    if (opened && q.isNavigationRequest() && q.frame() === page.mainFrame()) {
      if (u.pathname.toLowerCase() !== start.pathname.toLowerCase() || (!mutating && u.search !== start.search)) { navs.push(q.url()); return r.abort('aborted'); }
      if (mutating && blockPost) return r.abort('aborted');
    } else if (opened && mutating && blockPost && ['xhr', 'fetch'].includes(q.resourceType())) return r.abort('aborted');
    return r.continue();
  });
  page.on('dialog', (d) => { dialogs.push(d.message()); (d.type() === 'alert' || d.type() === 'beforeunload' ? d.accept() : d.dismiss()).catch(() => {}); });
  page.on('popup', (p) => { navs.push(p.url()); p.close().catch(() => {}); });
  await page.goto(URL);
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  opened = true;
  return { navs, dialogs };
}

async function act(page: Page, a: any): Promise<void> {
  const o = { timeout: 5000 };
  if (a.a === 'click') await el(page, a.key).click(o);
  else if (a.a === 'hover') await el(page, a.key).hover(o);
  else if (a.a === 'select') await el(page, a.key).selectOption(a.value && !String(a.value).startsWith('option #') ? { label: a.value } : { index: a.index }, o);
  else if (a.a === 'fill') { await el(page, a.key).fill(a.value, o); await el(page, a.key).blur(); }
  else if (a.a === 'press') await el(page, a.key).press(a.value, o);
  else if (a.a === 'validate') await page.evaluate((g) => (window as any).Page_ClientValidate?.(g), a.group);
  else if (a.a === 'fillall') { for (const f of a.fields) await act(page, f); await el(page, a.key).click(o); }
  await page.waitForLoadState('load').catch(() => {});
  await page.waitForTimeout(500);
}

${tests.join('\n\n')}
`;
}

export function facts({ out, screen, url, viewport, dpr, cfg, run, flaky, log = () => {} }) {
  const cap = (f, d) => readJson(path.join(out, 'capture', f), d);
  const meta = cap('page.json', {}), tree = cap('dom.json', { body: null }), controls = cap('controls.json', []), wf = cap('webforms.json', {});
  const pseudo = cap('pseudo.json', { rules: [], byKey: {} }), frames = cap('frames.json', []), assets = cap('assets/index.json', {});
  const states = readJson(path.join(out, 'explore', 'states.json'), { transitions: [], hovers: [], focus: [], noEffect: [], errors: [], unexplained: [], links: [], limits: {} });
  const offsets = readJson(path.join(out, 'offsets.json'), null), align = readJson(path.join(out, 'alignment.json'), null);
  const refMeta = readJson(path.join(out, 'reference.json'), null), bandsIdx = readJson(path.join(out, 'sections', 'index.json'), []);
  const motion = readJson(path.join(out, 'motion.json'), null);
  const flakyFile = path.join(out, 'explore', 'flaky.json');
  if (flaky) fs.writeFileSync(flakyFile, JSON.stringify(flaky));
  const flakySet = new Set(flaky || readJson(flakyFile, []));
  const origin = new URL(url).origin;
  const ctrl = Object.fromEntries(controls.map((c) => [c.key, c]));
  const T = states.transitions;
  const L2 = [];
  const w = (s = '') => L2.push(s);

  // which of the user's screenshots shows CSS y-range [y, y+h]
  const shotsFor = (b) => {
    if (!offsets || !b) return '';
    const y0 = b[1] * dpr, y1 = (b[1] + b[3]) * dpr;
    return offsets.shots.map((s, i) => (s.y <= y1 && s.y + s.height >= y0 ? `shot:${i + 1}` : null)).filter(Boolean).join(', ');
  };

  // ---------- 0. header ----------
  w(`# FACTS — ${screen}`);
  w('');
  w('Generated from a Playwright capture of the live page. Deterministic: nothing here is inferred. Read this first, then `content.md`.');
  w('Cite ids exactly as written: `[ctl:<key>]` controls, `[T07]` behaviors, `[val:<id>]` validators, `[shot:N]` your screenshot N, `[asset:<path>]` files.');
  w('All sizes are CSS px (screenshot px ÷ dpr).');
  w('');

  // ---------- 1. page ----------
  const fw = Object.entries(meta.framework || {}).filter(([, v]) => v).map(([k, v]) => (v === true ? k : `${k} ${v}`)).join(', ') || 'none detected';
  w('## 1. Page');
  w('| | |');
  w('|---|---|');
  w(`| URL | ${url} |`);
  w(`| Title | ${cell(meta.title)} |`);
  w(`| Built with | ${fw} |`);
  w(`| Doctype / mode | ${cell(meta.doctype || 'none')} / ${meta.compatMode}${meta.compatMode === 'BackCompat' ? ' **(QUIRKS MODE: reproduce its box model and table font inheritance)**' : ''} |`);
  w(`| Viewport | ${viewport.width}×${viewport.height} CSS px @ dpr ${dpr} |`);
  w(`| Document | ${meta.doc?.join('×')} CSS px |`);
  w(`| Language / charset | ${meta.lang || '-'} / ${meta.charset} |`);
  w(`| Favicon | ${meta.meta?.favicon ? relPath(meta.meta.favicon, origin) : '-'} |`);
  w('');
  if (offsets) {
    w(`Your screenshots → \`reference.png\` (${offsets.width}×${offsets.height} px; sticky header ${offsets.sticky.top}px, footer ${offsets.sticky.bottom}px):`);
    w('');
    w('| shot | file | covers CSS y |');
    w('|---|---|---|');
    offsets.shots.forEach((s, i) => w(`| shot:${i + 1} | ${s.file} | ${Math.round(s.y / dpr)}–${Math.round((s.y + s.height) / dpr)} |`));
    if (align) w(`\nLive page vs your screenshots: size delta ${align.size_delta_px.join('×')} px, ${align.bad_pct}% of pixels differ${align.bad_pct > 15 ? ' (data or state differs: trust the screenshots for looks, the capture for structure)' : ''}.`);
  } else if (!refMeta) w('**No reference picture exists**: capture/page.png is the only picture.');
  if (refMeta) {
    w(`${offsets ? '\n' : ''}**Reference picture made by the tool** (page warmed up and frozen: lazy images loaded, counters finished, carousels at slide 0): \`${refMeta.file}\`, ${refMeta.width}×${refMeta.height} px @ dpr ${dpr}, ${refMeta.shots} shots pasted at their exact scroll positions.`);
    w('Look at `sections/` first: one full-resolution crop per band. They are far sharper than the whole-page picture. Cite one as `[asset:sections/<file>]`.');
    w('');
    w('| # | crop file(s) | y | h (CSS px) | element |');
    w('|---|---|---|---|---|');
    for (const b of bandsIdx) w(`| ${b.n} | ${b.files.map((f) => `\`sections/${f}\``).join('<br>')} | ${Math.round(b.y)} | ${Math.round(b.h)} | ${b.tag}${b.id ? '#' + b.id : ''}${b.cls ? '.' + b.cls : ''} |`);
    w('');
    w('The page as a self-contained copy: `snapshot/rendered.html` (the DOM after its scripts ran, scripts removed, original class names) and `snapshot/used.css` (only the CSS rules this page uses, hover/focus/::before and media queries included). `snapshot/fidelity/report.json` says how closely that copy, rendered offline from the saved assets, matches the reference.');
  }
  if (run?.sources?.length) w(`\nLegacy source files for this screen: ${run.sources.map((s) => `\`${s}\``).join(', ')}`);
  w('');

  // ---------- 2. design tokens ----------
  const tk = meta.tokens || {};
  const tokenRow = (name, list, n = 8) => w(`| ${name} | ${(list || []).slice(0, n).map((x) => `\`${x.v}\` (${x.w})`).join('<br>')} |`);
  w('## 2. Design tokens (computed, weighted by use)');
  w('| token | values (weight) |');
  w('|---|---|');
  tokenRow('font families', tk.fonts, 6);
  tokenRow('size / weight / line-height', tk.sizes, 12);
  tokenRow('text colors', tk.text, 10);
  tokenRow('backgrounds', tk.bg, 10);
  tokenRow('borders', tk.borders, 8);
  tokenRow('radii', tk.radii, 6);
  w(`| body | ${cell(['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor', 'margin', 'padding'].map((k) => `${k}: ${meta.body?.[k]}`).join('; '))} |`);
  w(`| html | background ${meta.html?.bg}; font-size ${meta.html?.fontSize} |`);
  w(`| web fonts loaded | ${(meta.fonts || []).map((f) => `${f.family} ${f.weight} ${f.style}`).join(', ') || 'none (system fonts)'} |`);
  w('');

  // ---------- 3. layout sections ----------
  w('## 3. Layout sections (top level, document order)');
  let root = tree.body;
  while (root?.k?.filter((x) => x.t !== '#text').length === 1) root = root.k.find((x) => x.t !== '#text');
  let secs = (root?.k || []).filter((x) => x.t !== '#text');
  const docH = meta.doc?.[1] || 1;
  secs = secs.flatMap((s) => ((s.box?.[3] || 0) > docH * 0.6 && (s.k || []).length > 1 ? s.k.filter((x) => x.t !== '#text') : [s]));
  const ctlCount = (n) => { let c = 0; walk(n, (x) => { if (x.key && ctrl[x.key]) c++; }); return c; };
  const firstText = (n) => { let t = ''; walk(n, (x) => { if (!t && x.runs) t = x.runs.map((r) => r.x || '').join(''); }); return short(t, 60); };
  w('| # | element | box x,y,w,h | in shots | own style | first text | controls |');
  w('|---|---|---|---|---|---|---|');
  secs.forEach((s, i) => {
    const st = s.s || {};
    const style = ['backgroundColor', 'borderBottom', 'borderTop', 'padding', 'display', 'position', 'maxWidth'].filter((k) => st[k]).map((k) => `${k}: ${st[k]}`).join('; ');
    w(`| ${i + 1} | ${s.t}${s.id ? '#' + s.id : ''}${s.cls ? '.' + s.cls.split(' ')[0] : ''}${s.key ? ` {${s.key}}` : ''} | ${(s.box || []).map(Math.round).join(',')} | ${shotsFor(s.box)} | ${cell(style)} | ${cell(firstText(s))} | ${ctlCount(s)} |`);
  });
  w('');
  w('Exact per-element boxes and style deltas: `capture/dom.json` (`box` = [x, y, w, h] CSS px, `s` = style that differs from the parent).');
  w('');

  // ---------- 4. assets ----------
  w('## 4. Assets (use these files, never redraw them)');
  const used = new Map();
  const use = (file, how, b, nat) => { if (!file) return; const u = used.get(file) || { how: new Set(), sizes: new Set(), nat }; u.how.add(how); if (b) u.sizes.add(px(b)); used.set(file, u); };
  walk(tree.body, (n) => {
    if (n.t === 'img') use(n.file, 'img', n.box, n.nat);
    if (n.t === 'svg') use(n.file, 'inline svg', n.box);
    if (n.t === 'canvas') use(n.file, 'canvas picture', n.box);
    for (const f of n.bgFiles || []) use(f, `background of ${n.t}${n.id ? '#' + n.id : ''}`, n.box);
    for (const p of Object.values(n.pseudo || {})) for (const f of p.bgFiles || []) use(f, 'pseudo-element background');
    for (const r of n.runs || []) if (r.file) use(r.file, r.img ? 'inline img' : 'inline svg', r.w ? [0, 0, r.w, r.h] : null);
    for (const row of n.rows || []) for (const c of row) if (c.file) use(c.file, 'img in table cell');
  });
  w('| file (under capture/) | used as | shown at (CSS) | natural px |');
  w('|---|---|---|---|');
  for (const [f, u] of used) w(`| \`${f}\` | ${[...u.how].join(', ')} | ${[...u.sizes].slice(0, 3).join(', ')} | ${u.nat ? u.nat.join('×') : ''} |`);
  const byType = (t) => Object.entries(assets).filter(([, a]) => a.type === t);
  w('');
  w(`Fonts: ${byType('font').map(([u, a]) => `\`${a.file}\` (${relPath(u, origin)})`).join(', ') || 'none downloaded'}`);
  w(`Stylesheets (legacy CSS, verbatim): ${byType('stylesheet').map(([, a]) => `\`${a.file}\``).join(', ') || 'none'}${meta.inlineStyles ? `; inline: ${Array.from({ length: meta.inlineStyles }, (_, i) => `\`css/inline-${i + 1}.css\``).join(', ')}` : ''}`);
  w(`All downloaded files: \`capture/assets/index.json\` (${Object.keys(assets).length}).`);
  w('');

  // ---------- 5. controls ----------
  w('## 5. Controls (every interactive element)');
  w('| key | kind | label | default | flags | rules | behavior |');
  w('|---|---|---|---|---|---|---|');
  const vByTarget = {};
  for (const v of wf.validators || []) (vByTarget[v.targetKey] ||= []).push(v.key || v.id);
  for (const c of controls) {
    const def = c.kind === 'select' ? (c.options || []).find((o) => o.s)?.t ?? '' : c.checked !== undefined ? (c.checked ? 'checked' : 'unchecked') : c.value ?? '';
    const flags = [!c.visible && 'hidden', c.disabled && 'disabled', c.readOnly && 'readonly', c.required && 'required'].filter(Boolean).join(', ');
    const rules = [c.type && !['text', 'submit', 'button'].includes(c.type) && c.kind !== 'link' && `type=${c.type}`, c.maxlength && `maxlength ${c.maxlength}`, c.minlength && `minlength ${c.minlength}`,
      c.pattern && `pattern ${c.pattern}`, c.min && `min ${c.min}`, c.max && `max ${c.max}`, vByTarget[c.key] && `validators ${vByTarget[c.key].map((v) => `[val:${v}]`).join(' ')}`,
      c.dataVal && `data-val: ${Object.keys(c.dataVal).filter((k) => k !== 'data-val').map((k) => k.replace('data-val-', '')).join(',')}`].filter(Boolean).join('; ');
    const beh = [c.kind === 'link' && c.hrefKind && `${c.hrefKind}${c.hrefKind === 'url' || c.hrefKind === 'external' ? ' → ' + relPath(c.href, origin) : ''}`, c.target && `target=${c.target}`,
      c.postback && `postback ${c.postback.target}${c.postback.arg ? ` "${c.postback.arg}"` : ''}${c.postback.validate ? ` validates group "${c.postback.group}"` : ''}`,
      c.autoPostBack && 'AutoPostBack on change', c.confirm && `confirm "${short(c.confirm, 60)}"`, c.title && `tooltip "${short(c.title, 50)}"`,
      c.handlers && `handlers ${[...new Set(c.handlers)].slice(0, 5).join(',')}`, c.kind === 'select' && `${c.optionCount} options`].filter(Boolean).join('; ');
    w(`| [ctl:${c.key}] | ${c.kind} | ${cell(short(c.label, 40))} | ${cell(short(def, 40))} | ${flags} | ${cell(rules)} | ${cell(beh)} |`);
  }
  w('');
  w('Full detail per control (computed style, selector, box, options, inline handlers): `capture/controls.json`.');
  w('');

  // ---------- 6. validation ----------
  w('## 6. Validation');
  if ((wf.validators || []).length) {
    w('| id | field | type | rule | message | display | group |');
    w('|---|---|---|---|---|---|---|');
    for (const v of wf.validators) {
      const rule = { regex: v.expression, range: `${v.min} … ${v.max} (${v.dataType})`, compare: v.compareTo ? `${v.operator} ${v.compareToKey || v.compareTo}` : `${v.operator} ${v.valueToCompare ?? ''} (${v.dataType})`, custom: v.clientFunction ? `client fn ${v.clientFunction}()` : 'server-side only' }[v.type] ?? '';
      w(`| [val:${v.key || v.id}] | [ctl:${v.targetKey || v.target}] | ${v.type} | ${cell(rule)} | ${cell(v.message)}${v.text && v.text !== v.message ? ` (inline text "${cell(v.text)}")` : ''} | ${v.display} | ${v.group || '(default)'} |`);
    }
    for (const s of wf.summaries || []) w(`\nValidationSummary ${s.key || s.id}: group "${s.group || '(default)'}", header "${s.headerText || ''}", mode ${s.displayMode}, messagebox ${s.showMessageBox}`);
  }
  const html5 = controls.filter((c) => c.required || c.pattern || c.dataVal || (c.type && /email|number|url|tel|date/.test(c.type)));
  if (html5.length) w(`\nHTML5 / MVC rules on: ${html5.map((c) => `[ctl:${c.key}]`).join(', ')} (see §5 rules).`);
  if (!(wf.validators || []).length && !html5.length) w('No client-side validation rules found in the page. Server-side rules, if any, are only visible in the source.');
  w('');

  // ---------- 7. interaction styles ----------
  w('## 7. Interaction styles (measured on the live page)');
  const fmt = (st) => Object.entries(st).map(([k, [a, b]]) => `${k}: ${short(a, 40)} → ${short(b, 40)}`).join('; ');
  if (states.hovers.length || states.focus.length) {
    w('| control | state | change |');
    w('|---|---|---|');
    for (const h of states.hovers) w(`| [ctl:${h.key}] | hover | ${cell(fmt(h.style))} |`);
    for (const f of states.focus) w(`| [ctl:${f.key}] | focus | ${cell(fmt(f.style))} |`);
  } else w('No hover/focus style changes measured.');
  const pk = Object.entries(pseudo.byKey || {});
  if (pk.length) {
    w('\nLegacy CSS rules for states (`:hover :focus :active :disabled .aspNetDisabled …`) that apply to controls (full list: `capture/pseudo.json`):');
    for (const [k, idx] of pk.slice(0, 60)) w(`- [ctl:${k}]: ${idx.slice(0, 4).map((i) => `\`${short(pseudo.rules[i].selector, 70)} { ${short(pseudo.rules[i].css, 120)} }\``).join(' ')}`);
  }
  w('');

  // ---------- 8. behavior ----------
  w('## 8. Behavior (observed transitions, EARS drafts)');
  w('Each was performed on the live page from a fresh load. Effects are relative to the state right before the last action.');
  w('');
  for (const t of T) {
    const tag = flakySet.has(t.id) ? ' **[FLAKY: did not replay reliably, verify before relying on it]**' : '';
    w(`- **[${t.id}]** ${ears(t, ctrl, origin)}${tag}${t.shot ? ` — picture: \`${t.shot}\`` : ''}`);
  }
  if (!T.length) w('No behavior observed (static page, or everything is server-side).');
  w('');

  // ---------- 9. server ----------
  w('## 9. Server round-trips and requests');
  const reqs = T.flatMap((t) => (t.events || []).filter((e) => /postback|request/.test(e.type)).map((e) => ({ t: t.id, ...e })));
  if (reqs.length) {
    w('| from | kind | method | endpoint | status | fields sent |');
    w('|---|---|---|---|---|---|');
    for (const r of reqs) w(`| [${r.t}] | ${r.type} | ${r.method} | ${cell(relPath(r.url, origin))} | ${r.status} | ${cell(r.post && typeof r.post === 'object' ? Object.entries(r.post).map(([k, v]) => `${k}=${short(v, 30)}`).join(', ') : short(r.post, 200))} |`);
    w('\nBlocked = the request was stopped (config mode "safe" blocks save/delete/submit-like actions): what the server does next is NOT observed; take it from the source / backend spec.');
  } else w('None observed.');
  w('');

  // ---------- 10. navigation ----------
  w('## 10. Navigation (links are recorded, never followed)');
  if (states.links.length) {
    w('| control | label | goes to | target |');
    w('|---|---|---|---|');
    for (const l of states.links) w(`| [ctl:${l.key}] | ${cell(short(l.label, 50))} | ${cell(relPath(l.href, origin))} | ${l.target || ''}${l.visible ? '' : ' (hidden until revealed)'} |`);
  }
  const navT = T.filter((t) => (t.events || []).some((e) => ['navigation', 'popup', 'download'].includes(e.type)));
  if (navT.length) w(`\nObserved by clicking: ${navT.map((t) => `[${t.id}]`).join(', ')}`);
  if (!states.links.length && !navT.length) w('No navigation.');
  w('');

  // ---------- 11. dialogs etc ----------
  const misc = T.flatMap((t) => (t.events || []).filter((e) => ['dialog', 'popup', 'download', 'pageerror'].includes(e.type)).map((e) => `[${t.id}] ${e.type}: ${e.message || e.url || e.file}`));
  const loadEv = (meta.loadEvents || []).map((e) => `on load, ${e.type}: ${short(e.message || e.url, 120)}`);
  w('## 11. Dialogs, popups, downloads, script errors');
  w(misc.length || loadEv.length ? [...misc, ...loadEv].map((x) => `- ${x}`).join('\n') : 'None.');
  w('');

  // ---------- 12. unexplained ----------
  w('## 12. Hidden at load, never revealed by any action');
  if (states.unexplained.length) {
    w('These exist in the page but no click/hover/input showed them. The trigger is server-side, data-dependent, or a path not explored: look in `capture/js/` and the legacy source. Each needs a [UNKNOWN] or an evidenced rule in the spec.');
    for (const u of states.unexplained) w(`- \`${u.key}\`${u.kind ? ` (${u.kind})` : ''}: ${cell(short(u.label, 80))}`);
  } else w('None.');
  w('');

  // ---------- 13. limits ----------
  w('## 13. Not covered by this capture');
  const lim = states.limits || {};
  w(`- Actions run: ${lim.actions ?? 0}${lim.queueLeft ? `, **${lim.queueLeft} not run (limit reached: raise explore.maxActions / timeBudgetSec)**` : ''}; depth ≤ ${lim.maxDepth}; ${Math.round((lim.ms || 0) / 1000)}s.`);
  if (states.errors.length) w(`- Actions that failed: ${states.errors.slice(0, 15).map((e) => `${e.action ? `${e.action.a} ${e.action.key}` : 'replay'}: ${short(e.error, 70)}`).join('; ')}`);
  const ne = [...new Set(states.noEffect.map((n) => n.key))];
  if (ne.length) w(`- No visible effect: ${ne.slice(0, 60).map((k) => `\`${k}\``).join(', ')}${ne.length > 60 ? ' …' : ''}`);
  const skipped = controls.filter((c) => c.visible && ['file', 'other'].includes(c.kind));
  if (skipped.length) w(`- Not exercised (file upload / range / color): ${skipped.map((c) => `[ctl:${c.key}]`).join(', ')}`);
  if (flakySet.size) w(`- Flaky (excluded from required coverage): ${[...flakySet].join(', ')}`);
  w('- Never observable from a browser: server-side rules, role/permission-based visibility, controls with Visible="false" (not rendered at all), what blocked requests would have done.');
  w('');

  // ---------- 14. scripts / platform ----------
  w('## 14. Page scripts, styles and platform details');
  const jsDir = path.join(out, 'capture', 'js');
  const jsFiles = fs.existsSync(jsDir) ? fs.readdirSync(jsDir, { recursive: true }).filter((f) => /\.js$/.test(f)) : [];
  for (const f of jsFiles.slice(0, 40)) {
    const src = fs.readFileSync(path.join(jsDir, f), 'utf8');
    const name = `js/${String(f).replaceAll('\\', '/')}`;
    if (src.length > 400000) { w(`- \`${name}\` (${Math.round(src.length / 1024)} KB bundle)`); continue; }
    const fns = [...new Set([...src.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map((m) => m[1]))];
    w(`- \`${name}\`${fns.length ? `: ${fns.slice(0, 25).join(', ')}${fns.length > 25 ? ' …' : ''}` : ''}`);
  }
  if (wf.updatePanels) w(`- UpdatePanels: ${JSON.stringify(wf.updatePanels)}`);
  for (const c of (wf.components || []).slice(0, 30)) w(`- AJAX component ${c.type} on ${c.elementKey || c.element}: ${short(JSON.stringify(c.props), 300)}`);
  for (const [g, cmds] of Object.entries(wf.grids || {})) w(`- Grid ${g}: ${Object.entries(cmds).map(([k, v]) => `${k}(${[...new Set(v)].slice(0, 8).join(',')})`).join(' ')}`);
  for (const d of wf.defaultButtons || []) w(`- Enter in ${d.container} presses ${d.buttonKey || d.button}`);
  const hf = (wf.hiddenFields || []).filter((h) => h.value !== undefined && !/^__/.test(h.name));
  if (hf.length) w(`- Hidden fields (page state): ${hf.map((h) => `${h.name}="${short(h.value, 40)}"`).join(', ')}`);
  for (const f of frames) w(`- iframe ${relPath(f.url, origin)}${f.crossOrigin ? ' (cross-origin: not captured)' : f.controls ? ` (${f.controls.length} controls, tree in capture/frames.json)` : ''}`);
  w('');

  // ---------- 15. motion ----------
  if (motion) {
    const j = (o) => short(JSON.stringify(o), 260);
    const meas = (m) => (m.mode === 'continuous' ? `moves ${m.velocity.x}px/s horizontally, ${m.velocity.y}px/s vertically (loops)` : `changes every ${m.intervalMs ?? '?'}ms (${m.events} step(s) seen) by about ${m.stepPx?.x ?? 0}px across / ${m.stepPx?.y ?? 0}px down; changes: ${(m.props || []).join(', ')}`);
    w('## 15. Motion (what moves, measured on the live page)');
    w(`The page was warmed up, then sampled for ${motion.sampleSec}s. Setup comes from the page itself (library config, CSS), speed and rhythm from measurement. Every entry has an id; the spec must cite each as \`[M01]\` in its Motion section.`);
    w('');
    for (const e of motion.entries) {
      const m = (e.measured || []).map(meas);
      if (e.kind === 'slider') w(`- **[${e.id}]** ${e.lib} carousel \`${e.sel}\` (${px(e.box)}): ${e.realSlides ?? e.slides ?? '?'} slides; autoplay ${j(e.autoplay ?? '-')}; ${j(e.params)}${m.length ? `; measured: ${m.join(' | ')}` : '; no movement measured'}`);
      else if (e.kind === 'counter') w(`- **[${e.id}]** counter \`${e.sel}\` (${px(e.box)}): ends at "${e.text}"; data ${j(e.data)}`);
      else if (e.kind === 'css-animation') w(`- **[${e.id}]** CSS animation \`${e.name}\` on ${e.count} element(s), e.g. \`${e.samples[0]}\` (${px(e.box)}): duration ${e.duration}, delay ${e.delay}, iterations ${e.iterations}, easing ${e.easing}, fill ${e.fill}, direction ${e.direction}${m.length ? `; measured: ${m.join(' | ')}` : ''}${e.keyframes ? `; keyframes: \`${short(e.keyframes, 400)}\`` : ''}`);
      else w(`- **[${e.id}]** ${e.mode} movement of \`${e.sel}\`${e.count > 1 ? ` and ${e.count - 1} sibling(s)` : ''} (${px(e.box)}): ${meas(e)}`);
    }
    if (!motion.entries.length) w('Nothing moved or animated.');
    if (motion.transitions.length) {
      w('\nTransitions (applied when an element changes state, e.g. hover; informational, not cited):');
      w('| property | duration | easing | delay | elements | e.g. |');
      w('|---|---|---|---|---|---|');
      for (const t of motion.transitions) w(`| ${cell(short(t.property, 50))} | ${t.duration} | ${cell(short(t.easing, 40))} | ${t.delay} | ${t.count} | \`${short(t.samples[0], 60)}\` |`);
    }
    if (motion.hints?.length) w(`\nAnimation hints in markup (data-aos, data-wow, Elementor data-settings...): ${motion.hints.slice(0, 25).map((h) => `\`${short(h.sel, 50)}\` ${j(h.attrs)}`).join('; ')}`);
    w(`\nFreeze state used for every picture: ${j(motion.freeze)}. A non-zero stillMoving means JS-driven motion the fake clock could not stop.`);
    w('Full detail (keyframe lists of running animations, every sampled mover): `motion.json`.');
    w('');
  }

  fs.writeFileSync(path.join(out, 'facts.md'), L2.join('\n'));
  fs.writeFileSync(path.join(out, 'content.md'), `# CONTENT — ${screen}\nPage text verbatim in document order. {key} = control/element id. <!-- box --> = styled container (CSS px).\n\n` + contentMd(tree, origin));

  // ---------- facts.json: what check-spec.mjs enforces ----------
  const plainLink = (c) => c.kind === 'link' && ['url', 'external', 'other'].includes(c.hrefKind) && !(c.handlers || []).some((h) => /click/i.test(h));
  const required = {
    controls: controls.filter((c) => c.visible && !plainLink(c) && (!states.scope || states.scope.keys.includes(c.key))).map((c) => c.key),
    transitions: T.filter((t) => !flakySet.has(t.id)).map((t) => t.id),
    validators: (wf.validators || []).map((v) => v.key || v.id),
    motion: (motion?.entries || []).map((e) => e.id),
  };
  const effectKeys = T.flatMap((t) => [t.action.key, ...t.prefix.map((p) => p.key), ...Object.values(t.effects).flat().map((x) => x?.key)].filter(Boolean));
  const domKeys = [];
  walk(tree.body, (n) => { if (n.key) domKeys.push(n.key); });
  effectKeys.push(...domKeys, ...(states.baseline?.keys || []), ...(states.hoverTargets || []).map((h) => h.key));
  fs.writeFileSync(path.join(out, 'facts.json'), JSON.stringify({
    screen, url, required, optional: { links: controls.filter(plainLink).map((c) => c.key), unexplained: states.unexplained.map((u) => u.key) },
    all: { controls: controls.map((c) => c.key), elements: [...new Set([...controls.map((c) => c.key), ...states.unexplained.map((u) => u.key), ...effectKeys])],
      transitions: T.map((t) => t.id), validators: (wf.validators || []).map((v) => v.key || v.id), shots: offsets?.shots.length || 0, motion: required.motion },
    flaky: [...flakySet],
  }, null, 1));

  // ---------- parity tests + selector map ----------
  fs.mkdirSync(path.join(out, 'spec'), { recursive: true });
  const sel = {};
  for (const c of controls) sel[c.key] = c.sel;
  for (const t of T) {
    for (const a of [...t.prefix, t.action, ...(t.action.fields || [])]) if (a.sel && !a.key.startsWith('validation-group')) sel[a.key] ??= a.sel;
    for (const x of Object.values(t.effects).flat()) if (x?.key && x.sel) sel[x.key] ??= x.sel;
  }
  fs.writeFileSync(path.join(out, 'spec', 'selectors.json'), JSON.stringify(sel, null, 1));
  const live = T.filter((t) => !flakySet.has(t.id));
  fs.writeFileSync(path.join(out, 'spec', 'parity.spec.ts'), paritySpec({ url, viewport, dpr, cfg, transitions: live, sel, ctrl, origin }));
  // verify compares against the tool's own reference when there is one: it is shot the way verify shoots the rebuild
  if (offsets || refMeta) fs.writeFileSync(path.join(out, 'manifest.json'), // css_viewport_width = reference width / dpr (what draw-ui's measure_reference.py maps pixels with); viewport = the browser window (what verify opens)
JSON.stringify({ reference: refMeta ? refMeta.file : 'reference.png', source: refMeta ? 'tool' : 'user', dpr, css_viewport_width: refMeta?.css_width ?? viewport.width, css_viewport_height: viewport.height, viewport, url,
    ...(refMeta ? { sections: 'capture/bands.json', motion: motion ? 'motion.json' : undefined } : {}) }, null, 2));
  log(`  facts.md: ${controls.length} controls, ${T.length} behaviors (${flakySet.size} flaky), ${used.size} assets in use; parity.spec.ts: ${live.length} candidate tests`);
}

// Run the generated parity tests against the legacy page. Anything that doesn't replay is flaky.
export async function selfcheck({ out, root }) {
  const spec = path.join(out, 'spec', 'parity.spec.ts');
  if (!fs.existsSync(spec) || !/\ntest\(/.test(fs.readFileSync(spec, 'utf8'))) return { passed: 0, flaky: [] };
  const report = path.join(out, 'spec', 'selfcheck.json');
  fs.rmSync(report, { force: true });
  const cli = path.join(root, 'node_modules', '@playwright', 'test', 'cli.js');
  const r = spawnSync(process.execPath, [cli, 'test', path.relative(path.join(root, 'outputs'), spec).replaceAll('\\', '/'), '--reporter=json', '--retries=1'], {
    cwd: root, encoding: 'utf8', maxBuffer: 1e8, env: { ...process.env, TARGET: 'legacy', PLAYWRIGHT_JSON_OUTPUT_NAME: report },
  });
  const rep = readJson(report, null);
  if (!rep) return { passed: 0, flaky: [], error: short(`no report (exit ${r.status}${r.error ? `, ${r.error.message}` : ''}) ${r.stderr || r.stdout || ''}`, 300) };
  let passed = 0;
  const flaky = [];
  const visit = (s) => {
    for (const sp of s.specs || []) {
      const id = (sp.title.match(/^T\d+/) || [])[0];
      const outcome = sp.tests?.[0]?.status; // expected | unexpected | flaky | skipped
      if (outcome === 'expected') passed++;
      else if (id && outcome !== 'skipped') flaky.push(id);
    }
    for (const c of s.suites || []) visit(c);
  };
  for (const s of rep.suites || []) visit(s);
  return { passed, flaky };
}
