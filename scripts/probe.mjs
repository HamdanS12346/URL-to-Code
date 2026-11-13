#!/usr/bin/env node
// npm run probe -- [<pack>] [options]: log in like `npm run ui`, open every page of the portal's menu and let the site kit's
// probe (kits/<kit>/probe.mjs: probePage + summarize) answer its questions there. Nothing is captured for a rebuild: the
// output is evidence for changing the tool, in docs/probe/ (pages/<page>.json, answers.json, ANSWERS.md, shots/).
//   <pack>              take the URL, selectors, kit and the menu already read (menu.json) from packs/<pack>/
//   --url <home>        the home page (without a pack)
//   --modules "A,B"     only these menu modules (label starts with); --only <regex> on "Module > Item"; --limit N pages
//   --fresh             probe pages again that already have a file (default: continue where it stopped)
//   --read-menu         read the menu live even when the pack has menu.json
//   --viewports W1xH1,W2xH2   where dialogs are measured (default: the capture viewport and 1280x720 = 1920x1080 at 150%)
//   --budget <sec>      time per page (300); --out <dir> (docs/probe); --headed; --manual-login; --env <file>; --summary (only rebuild ANSWERS.md)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, packDir } from './lib/paths.mjs';
import { launch, openPage } from './lib/browser.mjs';
import { readEnv, ask, askSecret, login, manualLogin, sessionValid, isLoggedIn, readMenu } from './lib/portal.mjs';
import { detectKit } from './lib/kit.mjs';

const argv = process.argv.slice(2);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const flag = (n) => argv.includes(n);
const die = (m) => { console.error(`\n✗ ${m}`); process.exit(1); };
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, o) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1)); };
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'page';
const takesValue = new Set(['--url', '--modules', '--only', '--limit', '--viewports', '--budget', '--out', '--env', '--kit']);
const packName = argv.find((a, i) => !a.startsWith('--') && !takesValue.has(argv[i - 1]));

const OUT = path.resolve(opt('--out') || path.join(ROOT, 'docs', 'probe'));
const pagesDir = path.join(OUT, 'pages'), shotDir = path.join(OUT, 'shots');
const pack = packName ? readJson(path.join(packDir(packName), 'pack.json'), null) ?? die(`no packs/${packName}/pack.json`) : {};
const url = opt('--url') || pack.url || die('pass a pack name or --url <home page>');
const sel = { ...pack.selectors, ...(pack.menuButton && !pack.selectors?.menuButton ? { menuButton: pack.menuButton } : {}) };
fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(shotDir, { recursive: true });
const logFile = path.join(OUT, 'probe.log');
const log = (m) => { console.log(m); fs.appendFileSync(logFile, m + '\n'); };

// the same capture settings `npm run ui` uses for a pack (config.json + its url-only defaults + pack.json "config")
const base = readJson(path.join(ROOT, 'config.json'), {});
const cfg = { ...base, ...base.urlOnly, ...pack.config, auth: { ...base.auth, ...pack.config?.auth, storageState: null } };
const viewport = cfg.defaultViewport, dpr = cfg.dpr;
// the capture's own size, and a real browser on a 1920x1080 screen at 150% (1272x588: the portal switches to its small layout at 1280)
const viewports = (opt('--viewports') || `${viewport.width}x${viewport.height},1272x588`).split(',').map((v) => { const [width, height] = v.split('x').map(Number); return { width, height }; });
if (viewports.some((v) => !v.width || !v.height)) die('--viewports takes WxH,WxH (e.g. 1920x1080,1280x720)');

// rebuild the answers from the page files only
const summarize = async (kitName) => {
  const probe = await import(pathToFileURL(path.join(ROOT, 'kits', kitName, 'probe.mjs')).href);
  const pages = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.json')).map((f) => readJson(path.join(pagesDir, f), null)).filter(Boolean);
  const { answers, markdown } = probe.summarize(pages);
  writeJson(path.join(OUT, 'answers.json'), answers);
  fs.writeFileSync(path.join(OUT, 'ANSWERS.md'), markdown);
  log(`answers: ${path.relative(ROOT, path.join(OUT, 'ANSWERS.md'))} (${pages.length} pages)`);
};
if (flag('--summary')) { await summarize(opt('--kit') || pack.kit || readJson(path.join(OUT, 'run.json'), {}).kit || die('pass --kit')); process.exit(0); }

log(`\n==== ${new Date().toISOString()}  npm run probe -- ${argv.join(' ')}`);
const env = readEnv(opt('--env') ? path.resolve(opt('--env')) : path.join(ROOT, '.env'));
// never written anywhere: the password stays in memory, the session too (Codex can read the disk)
const creds = { username: process.env.UI_USERNAME || env.USERNAME, password: process.env.UI_PASSWORD || env.PASSWORD };
const interactive = process.stdin.isTTY;

const browser = await launch({ ...cfg, headed: flag('--headed') });
let session = null;
const withSession = () => ({ ...cfg, auth: { ...cfg.auth, storageState: session } });
const ensureLogin = async (force = false) => {
  if (pack.login === false) return;
  if (!force && await sessionValid(browser, { url, state: session, sel, viewport })) return;
  log('>> login');
  if (flag('--manual-login') || pack.manualLogin) { session = await manualLogin(cfg, { url, viewport }); return; }
  if (!creds.username && interactive) creds.username = await ask('Portal user name');
  if (!creds.password && interactive) creds.password = await askSecret(`Password for ${creds.username} (not shown, not saved)`);
  session = await login(browser, { url, state: session, creds, sel, viewport, log });
};

try {
  await ensureLogin();
  // the kit: the pack's, else whichever kit recognises the home page
  let kitName = opt('--kit') || pack.kit;
  if (!kitName) {
    const s = await openPage(browser, withSession(), { url, viewport, dpr });
    try { await s.load(); kitName = await detectKit(s.page); } finally { await s.close(); }
  }
  if (!kitName || !fs.existsSync(path.join(ROOT, 'kits', kitName, 'probe.mjs'))) die(`no site kit with a probe for this portal (kit: ${kitName || 'none detected'}). Pass --kit <name>`);
  const probe = await import(pathToFileURL(path.join(ROOT, 'kits', kitName, 'probe.mjs')).href);
  log(`kit: ${kitName}, viewport ${viewport.width}x${viewport.height} @${dpr}, dialogs also at ${viewports.map((v) => `${v.width}x${v.height}`).join(', ')}`);

  // ---------- the menu: every leaf with a URL is a page ----------
  const menuFile = packName && path.join(packDir(packName), 'menu.json');
  let menu = !flag('--read-menu') && menuFile && readJson(menuFile, null);
  if (!menu?.modules?.length) {
    log('>> reading the menu');
    const r = await readMenu(browser, withSession(), { url, viewport, dpr, sel, target: '', maxDepth: pack.menuDepth ?? 3, log });
    menu = { modules: r.modules };
    writeJson(path.join(OUT, 'menu.json'), menu);
  } else log(`menu: ${path.relative(ROOT, menuFile)} (${menu.modules.length} modules; --read-menu to read it again)`);
  const want = (opt('--modules') || '').split(',').map((m) => m.trim().toLowerCase()).filter(Boolean);
  const pages = [{ label: 'Home', trail: ['Home'], url }];
  const visit = (n, trail) => {
    if (n.children?.length) return n.children.forEach((c) => visit(c, [...trail, c.label]));
    const href = n.url || n.href;
    if (!href || /^(#|javascript:)/i.test(href.trim())) return;
    pages.push({ label: trail.join(' > '), trail, url: new URL(href, url).href });
  };
  for (const m of menu.modules) if (!want.length || want.some((w) => m.label.toLowerCase().startsWith(w))) visit(m, [m.label]);
  const seen = new Set();
  let list = pages.filter((p) => { const k = p.url.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  if (want.length) list = list.filter((p) => p.label !== 'Home');
  if (opt('--only')) list = list.filter((p) => new RegExp(opt('--only'), 'i').test(p.label));
  if (opt('--limit')) list = list.slice(0, +opt('--limit'));
  writeJson(path.join(OUT, 'run.json'), { at: new Date().toISOString(), url, kit: kitName, pack: packName || null, viewport, dpr, viewports, pages: list.length });
  log(`${list.length} page(s) to probe`);

  // ---------- each page ----------
  const budget = +(opt('--budget') || 300);
  let shellDone = false; // the menus are the same on every page: measured on the first page this run probes
  for (const [i, p] of list.entries()) {
    const name = slug(p.trail.join('-')), file = path.join(pagesDir, `${name}.json`);
    const old = readJson(file, null);
    if (old?.probe && !flag('--fresh')) { log(`[${i + 1}/${list.length}] ${p.label}: done before (--fresh to redo)`); continue; }
    const t0 = Date.now();
    const rec = { label: p.label, trail: p.trail, url: p.url, at: new Date().toISOString() };
    for (let attempt = 1; attempt <= 2; attempt++) {
      const s = await openPage(browser, withSession(), { url: p.url, viewport, dpr });
      try {
        await s.load();
        if (pack.login !== false && !(await isLoggedIn(s.page, sel))) {
          if (attempt === 2) throw new Error('not logged in on this page even after logging in again');
          log('   session lost: logging in again');
          await ensureLogin(true);
          continue;
        }
        rec.finalUrl = s.page.url() !== p.url ? s.page.url() : undefined;
        rec.probe = await probe.probePage({ s, cfg, viewports, shotDir, slug: name, budgetSec: budget, log, menuButton: sel.menuButton || null, shell: !shellDone });
        shellDone = true;
        delete rec.error;
        break;
      } catch (e) {
        rec.error = String(e.message || e).split('\n')[0].slice(0, 300);
      } finally { await s.close(); }
    }
    rec.ms = Date.now() - t0;
    writeJson(file, rec);
    const pr = rec.probe;
    log(`[${i + 1}/${list.length}] ${p.label}: ${rec.error ? `✗ ${rec.error}` : `${(rec.ms / 1000).toFixed(0)}s, ${pr.dialogs.length} dialog(s)${pr.search ? ', search' : ''}${pr.errors.length ? `, ${pr.errors.length} step error(s)` : ''}${pr.skipped.length ? `, out of time (skipped ${pr.skipped.join(', ')})` : ''}`}`);
  }
  await summarize(kitName);
} finally { await browser.close().catch(() => {}); }
