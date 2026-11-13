#!/usr/bin/env node
// npm run ui -- [<pack>] [--url <home url>] [--menu "<menu item>"] [options]
// One command for one module of a logged-in portal. It asks for whatever is missing, then:
//   login -> discover (read the menu: the module's screens + every other module) -> for the home page (+ the shared
//   header/menu) and each screen: capture, plan (writer), explore, spec (writer) -> scaffold the React 19 app in --out ->
//   port each screen into it -> code (writer), checked by tsc + verify after every attempt.
// Everything lives in packs/<pack>/, the code in packs/<pack>/app/ (--out <folder> puts it elsewhere). One pack per run of a
// module: name a new pack (ffxfer-v2) to start fresh, the same name to continue. A site kit (kits/<kit>/, found by asking each
// kit's detect() on the home page, or --kit <name|none>) replaces the plan/explore loop with a harvest of the page's own
// widgets and builds the screens on the kit's runtime (src/kit).
// Credentials: USERNAME= and PASSWORD= in .env next to package.json (or --env <file>). Writer (Codex):
//   --writer "<command with {workdir}>", or WRITER= in .env; default ..\start_codex.ps1 (client layout), else codex on PATH.
// Options:
//   --from <stage>    redo from: login, discover, capture, plan, explore, spec, port, code (earlier stages stay cached)
//   --only <screen>   just this screen (ids in packs/<pack>/pack.json)   --redo     redo writer steps marked done
//   --no-build        stop after the specs        --yes  no questions     --headed   show the browser
//   --manual-login    log in by hand in a browser window (MFA/SSO)        --verbose  stream the writer's output
//   --rounds N        extra writer attempts after a failed check (2)      --timeout S  per writer call (3600)
//   --link-modules    reuse this repo's node_modules in --out instead of npm install (an app inside this repo, the default
//                     packs/<pack>/app, finds this repo's node_modules by itself: nothing to install)
//   --kit <name|none> force a site kit, or none (default: detected on the home page and kept in pack.json)
//   --parallel N      writer calls at once (3; pack.json "parallel"): each spec starts as soon as its capture is done (the
//                     captures stay one at a time, one browser); with a kit the screens' code steps run side by side too
import crypto from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { launch } from './lib/browser.mjs';
import { ROOT, packDir, screenDir } from './lib/paths.mjs';
import { readEnv, ask, askSecret, login, manualLogin, sessionValid, readMenu, findScope } from './lib/portal.mjs';
import { defaultWriter, fill, runWriter, tail } from './lib/writer.mjs';
import { runScreen } from './run.mjs';
import { detectKit, loadKit } from './lib/kit.mjs';

const STAGES = ['login', 'discover', 'capture', 'plan', 'explore', 'spec', 'port', 'code'];
const VALUED = new Set(['--url', '--menu', '--out', '--writer', '--from', '--only', '--rounds', '--timeout', '--env', '--mode', '--kit', '--parallel']);
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, o) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1)); };
const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const pascal = (s) => s.replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '').replace(/^(\d)/, 'S$1');
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const die = (m) => { console.error(`\n!! ${m}`); process.exit(1); };

const from = opt('--from');
if (from && !STAGES.includes(from)) die(`--from must be one of: ${STAGES.join(', ')}`);
const forced = (stage) => STAGES.indexOf(stage) >= (from ? STAGES.indexOf(from) : Infinity);
const interactive = !flag('--yes') && process.stdin.isTTY;
const noBuild = flag('--no-build');

// ---------- the pack: what to do, kept in packs/<pack>/pack.json ----------
let name = slug(argv.find((a, i) => !a.startsWith('--') && !VALUED.has(argv[i - 1])) || (interactive ? await ask('Pack name (e.g. ffxfer-v2): everything goes to packs\\<name>') : ''));
if (!name) die('name the pack: npm run ui -- <pack>');
// a name already used: continue that pack, or give this run its own (two packs of one module never touch each other)
while (interactive && !from && !opt('--only') && fs.existsSync(path.join(packDir(name), 'pack.json'))) {
  const old = readJson(path.join(packDir(name), 'pack.json'), {});
  const a = await ask(`packs\\${name} already exists${old.menu ? ` ("${old.menu}")` : ''}. Continue it (y), or type a new pack name`, 'y');
  if (/^y(es)?$/i.test(a.trim())) break;
  if (slug(a)) name = slug(a);
}
const P = packDir(name);
const packFile = path.join(P, 'pack.json');
const pack = { selectors: {}, config: {}, ...readJson(packFile, {}), pack: name };
const savePack = () => writeJson(packFile, pack);
// a different site or menu item makes the screens found last time wrong: read the menu again
if (pack.screens?.length && ((opt('--url') && opt('--url') !== pack.url) || (opt('--menu') && opt('--menu').toLowerCase() !== String(pack.menu).toLowerCase()))) delete pack.screens;
if (opt('--url')) pack.url = opt('--url');
if (opt('--menu')) pack.menu = opt('--menu');
if (opt('--out')) pack.outRepo = path.resolve(opt('--out'));
else if (!pack.outRepo) pack.outRepo = process.env.OUT_REPO ? path.resolve(process.env.OUT_REPO) : path.join(P, 'app');
if (opt('--kit')) pack.kit = opt('--kit') === 'none' ? false : opt('--kit');
if (!pack.url && interactive) pack.url = await ask('Home page URL');
try { new URL(pack.url); } catch { die(`not a URL: ${pack.url ?? '(none)'}. Pass --url <home page>`); }
if (!pack.menu && interactive) pack.menu = await ask('Menu item to rebuild (e.g. File Transfer Services)');
if (!pack.menu) die('pass --menu "<menu item>"');
savePack();

const logFile = path.join(P, 'ui.log');
const log = (m) => { console.log(m); fs.appendFileSync(logFile, m + '\n'); };
log(`\n==== ${new Date().toISOString()}  npm run ui -- ${argv.join(' ')}`);

const env = readEnv(opt('--env') ? path.resolve(opt('--env')) : path.join(ROOT, '.env'));
// credentials: UI_USERNAME / UI_PASSWORD from the shell, else .env, else asked (the password typed unseen).
// Kept out of every file and of the writer's environment: Codex can read anything on disk.
const creds = { username: process.env.UI_USERNAME || env.USERNAME, password: process.env.UI_PASSWORD || env.PASSWORD };
const credsFrom = process.env.UI_PASSWORD ? 'UI_PASSWORD' : env.PASSWORD ? '.env' : null;
const writer = opt('--writer') || env.WRITER || pack.writer || defaultWriter();
const rounds = +(opt('--rounds') ?? pack.rounds ?? 2);
const timeoutSec = +(opt('--timeout') ?? pack.timeoutSec ?? 3600);
const parallel = Math.max(1, Math.floor(+(opt('--parallel') ?? pack.parallel ?? 3)) || 1);
// at most n tasks at once, the rest wait their turn (writer calls: each is a Codex session)
const limiter = (n) => {
  let active = 0;
  const queue = [];
  const next = () => {
    if (active >= n || !queue.length) return;
    active++;
    const [fn, res, rej] = queue.shift();
    Promise.resolve().then(fn).then(res, rej).finally(() => { active--; next(); });
  };
  return (fn) => new Promise((res, rej) => { queue.push([fn, res, rej]); next(); });
};
log(`pack ${name}: ${pack.url}  menu "${pack.menu}"  code -> ${rel(pack.outRepo).startsWith('..') ? pack.outRepo : rel(pack.outRepo)}\nwriter: ${writer}`);

// ---------- status: one entry per writer step, so a re-run picks up where it stopped ----------
const statusFile = path.join(P, 'status.json');
const status = readJson(statusFile, { items: {} });
const isDone = (k) => status.items[k]?.status === 'done';
const mark = (k, st, extra = {}) => {
  status.items[k] = { status: st, at: new Date().toISOString(), ...extra };
  writeJson(statusFile, status);
  const rows = Object.entries(status.items).map(([key, v]) => `| ${key} | ${v.status} | ${v.rounds ?? ''} | ${v.at.slice(0, 16).replace('T', ' ')} | ${(v.problems?.[0] ?? '').replace(/\|/g, '\\|').slice(0, 140)} |`);
  fs.writeFileSync(path.join(P, 'STATUS.md'), `# ${name}: status\n\n| step | status | attempts | at | first problem |\n|---|---|---|---|---|\n${rows.join('\n')}\n\nLogs of every writer call: packs/${name}/logs/. Re-run \`npm run ui -- ${name}\` to continue; \`--redo\` or \`--from <stage>\` to do steps again.\n`);
};

// ---------- config per screen: config.json (url-only defaults) + pack.json "config" (+ the content area) ----------
const base = readJson(path.join(ROOT, 'config.json'), {});
// the logged-in session: in memory only (a file under packs/ is readable by the writer)
let session = null;
fs.rmSync(path.join(P, 'auth'), { recursive: true, force: true }); // a session file left by an earlier version of this tool
const withSession = (c) => ({ ...c, auth: { ...c.auth, storageState: session } });
const cfgFor = (scr) => { // without the session: it changes on every login and must not count as a config change
  const pc = pack.config || {};
  const c = { ...base, ...base.urlOnly, ...pc, explore: { ...base.explore, ...pc.explore }, warmup: { ...base.warmup, ...pc.warmup }, motion: { ...base.motion, ...pc.motion },
    auth: { ...base.auth, ...pc.auth, storageState: null } };
  // the home page carries the menu: follow every module it reveals, not a sample of look-alikes
  if (scr?.home) Object.assign(c.explore, { perTrigger: 40, perGroupActions: 40, followPerGroup: 40 }, pc.homeExplore);
  else if (scr?.scope) c.explore.scope = scr.scope;
  // the site kit: which widgets are this screen's (its content area), and the title bar text to look for
  if (pack.kit && scr) c.kit = { name: pack.kit, scope: scr.home ? null : scr.scope || null, module: scr.home ? null : pack.menu, menuButton: pack.menuButton || null };
  return c;
};
const cfg0 = cfgFor(null);
const viewport = cfg0.defaultViewport, dpr = cfg0.dpr;
const nodeRun = (script, args, extraEnv = {}) => {
  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', script), ...args], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1e8, env: { ...process.env, ...extraEnv } });
  return { ok: r.status === 0, text: `${r.stdout || ''}${r.stderr || ''}`.trim() };
};
// the same without blocking: checks run while other writers work (a blocked event loop stalls their output pipes)
const runAsync = (file, args, { cwd = ROOT, env: extraEnv = {} } = {}) => new Promise((resolve) => {
  const p = spawn(process.execPath, [file, ...args], { cwd, env: { ...process.env, ...extraEnv } });
  let text = '';
  p.stdout.on('data', (d) => { text += d; });
  p.stderr.on('data', (d) => { text += d; });
  p.on('error', (e) => resolve({ ok: false, text: e.message }));
  p.on('close', (code) => resolve({ ok: code === 0, text: text.trim() }));
});
const nodeRunAsync = (script, args, extraEnv = {}) => runAsync(path.join(ROOT, 'scripts', script), args, { env: extraEnv });

// ---------- one writer step: prompt, check that it wrote something, gate, repeat with the gate's report ----------
// blocked: a file the writer writes when the problem is not its own (the shell, the kit): the step stops there, reported.
// A gate that answers { infra: true } (the dev server is down) is not the writer's fault: no attempt is spent on it.
async function writeStep(key, { prompt, workdir, expect = [], gate, blocked }) {
  let report = '';
  if (blocked) fs.rmSync(blocked, { force: true });
  for (let round = 1; round <= rounds + 1; round++) {
    const t0 = Date.now() - 1000;
    const lf = path.join(P, 'logs', `${key.replace(/[^a-z0-9-]+/gi, '-')}-${round}.log`);
    log(`   writer: ${key}, attempt ${round} (log: ${rel(lf)})`);
    const w = await runWriter({ cmd: writer, workdir, prompt: round === 1 ? prompt : prompt + fill('repair', { round, report }), logFile: lf, timeoutSec, echo: flag('--verbose') });
    log(`   writer finished: exit ${w.code}${w.timedOut ? ' (TIMED OUT)' : ''}, ${(w.ms / 60000).toFixed(1)} min`);
    const said = w.code === 0 ? '' : `\nThe writer exited with code ${w.code}${w.timedOut ? ' (timed out)' : ''}. Last lines of its output:\n${tail(lf)}`;
    if (blocked && fs.existsSync(blocked)) {
      const why = fs.readFileSync(blocked, 'utf8').trim();
      // "the kit is wrong" about something that worked before this writer's change is the change's fault: back to the writer
      const g = round <= rounds ? await gate() : null;
      if (g?.broke) {
        fs.rmSync(blocked, { force: true });
        report = `${g.text}\nYou wrote BLOCKED.md, but the check shows your own change broke the states listed above: they worked before it. BLOCKED.md was removed. Fix your change.`;
        log(`   ✗ ${key}: the writer blamed the kit for what its own change broke (${g.broke} state(s)): sent back`);
        continue;
      }
      mark(key, 'blocked', { rounds: round, problems: [`the writer reports a problem outside its files (${rel(blocked)}):`, ...why.split('\n').filter(Boolean).slice(0, 30)] });
      log(`   ! ${key}: the writer stopped on a problem it may not fix (kit/shell): ${why.split('\n')[0].slice(0, 200)} (${rel(blocked)})`);
      return false;
    }
    // a writer that fails without a word (bad switch, wrong base URL) leaves the files untouched: say so instead of judging old files
    const missing = expect.filter((f) => !fs.existsSync(f) || (round === 1 && fs.statSync(f).mtimeMs < t0));
    if (missing.length) {
      report = `Nothing was written to ${missing.map((f) => path.relative(workdir, f).split(path.sep).join('/')).join(', ')}.${said}`;
      log(`   ! ${report.split('\n')[0]}${w.code ? ` (writer exit ${w.code}, see the log)` : ''}`);
      continue;
    }
    const g = await gate();
    if (g.ok) { mark(key, 'done', { rounds: round, ...g.info }); log(`   ✓ ${key}`); return true; }
    if (g.infra) {
      mark(key, 'needs-review', { rounds: round, problems: [`not checked: ${g.text.split('\n')[0]}`, 'the writer was not charged for it: re-run this step once the cause is fixed'] });
      log(`   ! ${key}: could not be checked (${g.text.split('\n')[0]}): marked needs-review without spending more attempts`);
      return false;
    }
    report = g.text + said;
    log(`   ✗ check: ${g.text.split('\n').filter(Boolean).slice(0, 3).join(' | ').slice(0, 300)}`);
  }
  mark(key, 'needs-review', { rounds: rounds + 1, problems: report.split('\n').filter(Boolean).slice(0, 40) });
  log(`   ! ${key} still fails after ${rounds + 1} attempts: marked needs-review (packs/${name}/STATUS.md), moving on`);
  return false;
}

const browser = await launch({ ...cfg0, headed: flag('--headed') });
let devServer = null;
process.on('exit', () => devServer?.kill());
try {
  // ---------- login ----------
  const ensureLogin = async (force = false) => {
    if (pack.login === false) return;
    if (!force && await sessionValid(browser, { url: pack.url, state: session, sel: pack.selectors, viewport })) return;
    log('>> login');
    if (flag('--manual-login') || pack.manualLogin) {
      session = await manualLogin(cfg0, { url: pack.url, viewport });
      if (!(await sessionValid(browser, { url: pack.url, state: session, sel: pack.selectors, viewport }))) throw new Error('still not logged in (no Logout found on the home page). Pin pack.json "selectors.loggedIn" to an element only a logged-in user sees');
      return;
    }
    if (!creds.username && interactive) creds.username = await ask('Portal user name');
    if (!creds.password && interactive) creds.password = await askSecret(`Password for ${creds.username} (not shown, not saved)`);
    if (credsFrom === '.env') log('  ! the password comes from .env, which the writer (Codex) can read. Safer: remove PASSWORD from .env and type it when asked');
    session = await login(browser, { url: pack.url, state: session, creds, sel: pack.selectors, viewport, log });
  };
  await ensureLogin(forced('login'));
  // a capture that hit a login page throws "redirected": log in again and retry once
  const relogin = async (fn) => {
    try { return await fn(); } catch (e) {
      if (!/redirect|log ?in/i.test(e.message) || pack.login === false) throw e;
      log(`   session lost (${e.message.split('\n')[0]}): logging in again`);
      await ensureLogin(true);
      return fn();
    }
  };

  // ---------- discover: the menu, the module's screens, each screen's content area ----------
  if (!pack.screens?.length || forced('discover')) {
    log('>> discover: reading the menu');
    const pick = interactive ? async (mods) => {
      mods.forEach((m, i) => console.log(`   ${i + 1}. ${m.label}`));
      return mods[+(await ask(`No menu item "${pack.menu}". Which one (number)?`)) - 1];
    } : null;
    const r = await readMenu(browser, withSession(cfg0), { url: pack.url, viewport, dpr, sel: pack.selectors, target: pack.menu, pick, shot: path.join(P, 'menu.png'), shotDir: path.join(P, 'menu'), log, maxDepth: pack.menuDepth ?? 3 });
    writeJson(path.join(P, 'menu.json'), { module: r.module.label, menuButton: r.menuSel, pictures: r.pictures.map((f) => `menu/${f}`), modules: r.modules });
    pack.menu = r.module.label;
    pack.menuButton = r.menuSel;
    if (!r.leaves.length) log(`  ! "${r.module.label}" showed no items when hovered or clicked: only the home page will be done. If it is a page itself, add it to pack.json "screens" by hand`);
    const screens = [{ id: 'home', label: 'Home', url: pack.url, home: true }];
    const ids = new Set(['home']);
    for (const l of r.leaves) {
      if (!l.url) { log(`  ! ${l.trail.join(' > ')}: no URL (no href, and clicking it went nowhere): left out. Add it to pack.json "screens" by hand`); continue; }
      let id = slug(l.label) || 'screen';
      for (let n = 2; ids.has(id); n++) id = `${slug(l.label)}-${n}`;
      ids.add(id);
      screens.push({ id, label: l.label, url: l.url, trail: l.trail, ...(l.iframe ? { iframe: true } : {}) });
      if (l.iframe) log(`  ! ${l.label} opens inside a frame of the portal page: it is captured on its own URL (${l.url})`);
    }
    log(`  content area of each screen (what the shared header/menu wraps):`);
    for (const s of screens) {
      const f = pack.scope ? null : await relogin(() => findScope(browser, withSession(cfg0), { url: s.url, viewport, dpr, sel: pack.selectors }));
      s.scope = pack.scope || f?.sel || null;
      log(`   ${s.id.padEnd(32)} ${s.url}\n   ${' '.repeat(32)} content: ${s.scope ?? 'NOT FOUND (whole page)'}${f ? ` (${f.box[2]}x${f.box[3]} px)` : ''}`);
    }
    pack.screens = screens;
    savePack();
    log(`  ${screens.length - 1} screen(s) under "${pack.menu}" + the home page. Menu: packs/${name}/menu.json, picture: menu.png`);
    if (interactive && !/^y/i.test(await ask(`Go on with these? (y / n = stop here, edit packs/${name}/pack.json, run again)`, 'y'))) process.exit(0);
  }
  // ---------- the site kit: asked once, on the home page (pack.json "kit"; --kit overrides) ----------
  if (pack.kit === undefined) {
    const c = await browser.newContext({ viewport, storageState: session ?? undefined, ignoreHTTPSErrors: true });
    try {
      const pg = await c.newPage();
      await pg.goto(pack.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await pg.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
      pack.kit = (await detectKit(pg)) || false;
    } catch (e) { log(`  ! kit detection failed: ${e.message.split('\n')[0]}`); pack.kit = false; }
    finally { await c.close().catch(() => {}); }
    savePack();
  }
  const kit = pack.kit ? await loadKit(pack.kit) : null;
  log(kit ? `site kit: ${pack.kit} (kits/${pack.kit}): the harvest replaces plan + explore; screens are built on its runtime` : 'site kit: none (generic capture, plan and explore)');
  const screens = pack.screens.filter((s) => !opt('--only') || s.id === opt('--only'));
  if (!screens.length) die(`--only ${opt('--only')}: no such screen. Screens: ${pack.screens.map((s) => s.id).join(', ')}`);
  const menu = readJson(path.join(P, 'menu.json'), { modules: [] });

  // ---------- per screen: capture, plan, explore, spec ----------
  // the captures run one after another (one browser, one session); each screen's spec writer starts as soon as its capture
  // is done, up to --parallel at once, while the next capture runs
  const specLimit = limiter(parallel), specs = [];
  const kebab = (t) => slug(t.replace(/([a-z0-9])([A-Z])/g, '$1-$2'));
  // a queue, not a fixed list: a Create New / a row that goes to a page of its own adds that page (one level, same site) while the loop runs
  for (let qi = 0; qi < screens.length; qi++) {
    const scr = screens[qi];
    const id = `${name}/${scr.id}`, dir = screenDir(id);
    log(`\n>> ${scr.id}: ${scr.label}  ${scr.url}`);
    try {
      await ensureLogin();
      const cfg = cfgFor(scr);
      const finger = crypto.createHash('md5').update(JSON.stringify([scr.url, cfg])).digest('hex');
      const sc = () => ({ dir: null, url: scr.url, cfg: withSession(structuredClone(cfg)), sources: [], shots: [], finger }); // the session as it is now (a re-login replaces it)
      const call = (a) => relogin(() => runScreen(id, browser, { sc: sc(), argv: [...a, ...(flag('--headed') ? ['--headed'] : []), ...(opt('--mode') ? ['--mode', opt('--mode')] : [])], managed: true }));
      const planFile = path.join(dir, 'explore', 'plan.json');
      if (forced('plan') || flag('--redo')) fs.rmSync(planFile, { force: true }); // no plan -> the writer plans again
      let r = await call(forced('capture') ? ['--force'] : forced('explore') ? ['--from', 'explore'] : []);
      if (r === 'paused') {
        const menuCheck = () => { // the home plan must open the menu every screen shares
          if (!scr.home || !pack.menuButton) return null;
          const el = readJson(path.join(dir, 'explore', 'survey', 'survey.json'), { elements: [] }).elements.find((e) => e.sel === pack.menuButton);
          const plan = readJson(planFile, {});
          const keys = [...(plan.actions || []), ...(plan.hover || [])].map((e) => (typeof e === 'string' ? e : e?.key));
          return !el || keys.includes(el.key) ? null : `The plan must click the site menu button "${el.key}" (it opens the menu every screen shares): put it under "actions".`;
        };
        const ok = await writeStep(`plan:${scr.id}`, {
          workdir: ROOT, expect: [planFile],
          prompt: fill('plan', { id, dir, root: ROOT, label: scr.label, url: scr.url, extra: scr.home
            ? `\nThis is the HOME page. It also carries the header and the site menu that every screen shares. The plan MUST click the menu button (selector \`${pack.menuButton ?? 'not found'}\`) under "actions": the explorer then hovers every module it reveals, which records the flyouts.`
            : scr.scope ? `\nThe survey covers only this screen's content area (\`${scr.scope}\`); the shared header and menu are explored on the home page.` : '' }),
          gate: async () => { const g = nodeRun('check-plan.mjs', [id]); const m = g.ok ? menuCheck() : null; return { ok: g.ok && !m, text: m || g.text }; },
        });
        if (!ok) log('   ! no usable plan from the writer: exploring with the rule-based plan instead');
        r = await call(ok ? [] : ['--auto']);
      }
      if (r !== 'done') { mark(`capture:${scr.id}`, 'failed', { problems: [`run stopped: ${r}`] }); continue; }
      mark(`capture:${scr.id}`, 'done');
      // pages this screen links to (the kit recorded where a Create New or a row goes when it leaves the page): each is captured as a screen of its own,
      // under this one. One level only; `pack.json "linked": false` or --no-linked turns it off; "maxLinked" caps the number (default 60)
      if (kit && !scr.parent && pack.linked !== false && !flag('--no-linked')) {
        const norm = (u) => u.replace(/#.*$/, '').replace(/\/$/, '').toLowerCase();
        for (const l of readJson(path.join(dir, 'kit', 'screen.json'), {}).links ?? []) {
          let u;
          try { u = new URL(l.url, scr.url); } catch { continue; }
          if (u.origin !== new URL(pack.url).origin || pack.screens.some((x) => norm(x.url) === norm(u.href))) continue;
          if (pack.screens.filter((x) => x.parent).length >= (pack.maxLinked ?? 60)) { log(`   ! ${pack.maxLinked ?? 60} linked pages already: not adding ${u.pathname} (pack.json "maxLinked")`); break; }
          const last = u.pathname.split('/').filter(Boolean).pop() || 'page';
          let cid = kebab(last) || 'page';
          for (let n = 2; pack.screens.some((x) => x.id === cid); n++) cid = `${kebab(last)}-${n}`;
          const label = last.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
          const f = pack.scope ? null : await relogin(() => findScope(browser, withSession(cfg0), { url: u.href, viewport, dpr, sel: pack.selectors })).catch(() => null);
          const child = { id: cid, label, url: u.href, trail: [...(scr.trail ?? [scr.label]), label], parent: scr.id, scope: pack.scope || f?.sel || scr.scope || null };
          pack.screens.push(child);
          screens.push(child);
          savePack();
          log(`   linked page: ${l.kind === 'create' ? `"${l.text}"` : 'a row'} on ${scr.id} goes to ${u.pathname}: captured as the screen "${cid}"`);
        }
      }

      const specFile = path.join(dir, 'spec', 'UI_SPEC.md');
      const fresh = fs.existsSync(specFile) && fs.statSync(specFile).mtimeMs >= fs.statSync(path.join(dir, 'facts.md')).mtimeMs;
      if (isDone(`spec:${scr.id}`) && fresh && !forced('spec') && !flag('--redo')) { log('   spec: up to date'); continue; }
      if (scr.home) {
        fs.copyFileSync(path.join(P, 'menu.json'), path.join(dir, 'menu.json'));
        if (fs.existsSync(path.join(P, 'menu'))) fs.cpSync(path.join(P, 'menu'), path.join(dir, 'menu'), { recursive: true });
      }
      const specPrompt = fill('spec', { id, dir, root: ROOT, label: scr.label, url: scr.url, extra: (scr.home
        ? `\nThis is the HOME page, and it also defines the shell every screen of the rebuilt app shares: the header and the site menu (opened by \`${pack.menuButton ?? '?'}\`).\nThe menu's full tree, read from the live site, is in ${dir}/menu.json. List every module and item from it in Navigation and Components and cite it as [asset:menu.json].\nThe hover/flyout look of the menu is in ${dir}/menu/*.png: one picture per module, taken with the menu open and that module hovered (the explorer records the menu opening, not the CSS hover flyouts). Look at every one and cite them as [asset:menu/<file>.png]. Items under "${pack.menu}" open the screens of this app; every other item is shown (and hovers/opens the same way) but goes nowhere.`
        : `\nThis screen is shown inside the shared shell (header + site menu) that the home page's spec covers. The capture was scoped to its content area${scr.scope ? ` \`${scr.scope}\`` : ''}: specify that area; for the shell write one line under Layout: "Wrapped in the shared shell (see the home spec)."`) + (kit ? kit.prompt('spec', { dir }) : '') });
      log(`   spec: queued (${parallel} writer(s) at once)`);
      specs.push(specLimit(() => writeStep(`spec:${scr.id}`, {
        workdir: ROOT, expect: [specFile, path.join(dir, 'spec', 'tasks.md')], prompt: specPrompt,
        gate: async () => nodeRunAsync('check-spec.mjs', [id]),
      })).catch((e) => { mark(`spec:${scr.id}`, 'failed', { problems: [e.message.split('\n')[0]] }); log(`   !! spec ${scr.id}: ${e.message.split('\n')[0]}`); }));
    } catch (e) {
      mark(`capture:${scr.id}`, 'failed', { problems: [e.message.split('\n')[0]] });
      log(`   !! ${scr.id}: ${e.message.split('\n')[0]} (details: ${rel(path.join(dir, 'run.log'))})`);
    }
  }
  await browser.close().catch(() => {});
  if (specs.length) { log(`\n>> waiting for ${specs.length} spec writer(s)`); await Promise.all(specs); }

  if (noBuild) { log(`\n== specs done (--no-build). Status: packs/${name}/STATUS.md`); process.exit(0); }

  // ---------- scaffold the app (once; never overwrites a file that exists) ----------
  const out = pack.outRepo;
  log(`\n>> app: ${out}`);
  const marker = path.join(out, '.ui-pack.json');
  if (fs.existsSync(out) && fs.readdirSync(out).length && !fs.existsSync(marker)) die(`${out} is not empty and was not made by this tool (no .ui-pack.json). Pick an empty or new folder.`);
  fs.cpSync(path.join(ROOT, 'templates', 'outrepo'), out, { recursive: true, force: false, errorOnExist: false });
  const idx = path.join(out, 'index.html');
  fs.writeFileSync(idx, fs.readFileSync(idx, 'utf8').replace('{{title}}', pack.menu));
  if (!fs.existsSync(path.join(out, 'package.json'))) {
    const me = readJson(path.join(ROOT, 'package.json'), {});
    const pick = (o, ks) => Object.fromEntries(ks.map((k) => [k, o[k]]));
    writeJson(path.join(out, 'package.json'), { name: slug(pack.menu) || name, private: true, type: 'module',
      scripts: { dev: 'vite', build: 'tsc --noEmit && vite build', preview: 'vite preview' },
      dependencies: pick(me.dependencies, ['react', 'react-dom']),
      devDependencies: pick(me.devDependencies, ['@types/react', '@types/react-dom', '@vitejs/plugin-react', 'typescript', 'vite']) });
  }
  writeJson(marker, { pack: name, url: pack.url, menu: pack.menu, source: ROOT, at: new Date().toISOString() });
  const inRepo = !path.relative(ROOT, out).startsWith('..');
  if (!inRepo && !fs.existsSync(path.join(out, 'node_modules'))) {
    const link = () => { fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(out, 'node_modules'), 'junction'); log('   node_modules: linked to final-playwright\'s'); };
    if (flag('--link-modules')) link();
    else {
      log('   npm install …');
      const r = spawnSync('npm', ['install', '--prefer-offline', '--no-audit', '--no-fund'], { cwd: out, shell: true, stdio: 'inherit' });
      if (r.status !== 0) { log('   ! npm install failed: using final-playwright\'s node_modules instead'); link(); }
    }
  }

  // node_modules: the app's own, else this repo's (an app inside the repo resolves packages from here)
  const bin = (p) => [path.join(out, 'node_modules', p), path.join(ROOT, 'node_modules', p)].find((f) => fs.existsSync(f));
  // the kit runtime: copied fresh every run (fixed in kits/<kit>/app, never in the app)
  if (kit) {
    fs.rmSync(path.join(out, 'src', 'kit'), { recursive: true, force: true });
    fs.cpSync(kit.appDir, path.join(out, 'src', 'kit'), { recursive: true });
  }

  // ---------- port: the captured page as static React (the shell from the home page, the content of each screen) ----------
  // with a kit, the shell comes from a module screen (its title bar is what every module screen shows; the home page has none)
  // and the home page is its own complete page
  const ported = (scr) => fs.existsSync(path.join(out, 'src', 'screens', scr.id, 'Page.tsx'));
  const portedNow = new Set(); // ported in this run: no writer has touched these yet
  // with a kit: a module screen whose capture closed the side menu again (one that froze it open would give every screen
  // an open menu); the kit closes the menu at runtime anyway, this only picks the cleanest source
  const kitOf = (s) => readJson(path.join(screenDir(`${name}/${s.id}`), 'kit', 'screen.json'), null);
  const shellCands = kit ? pack.screens.filter((s) => !s.home && s.scope && kitOf(s)) : [];
  const shellFrom = kit ? shellCands.find((s) => kitOf(s).menu?.closed !== false) ?? shellCands[0] : pack.screens.find((s) => s.home);
  if (kit && shellFrom) log(`   shell (header + side menu) ported from ${shellFrom.id}${kitOf(shellFrom).menu ? (kitOf(shellFrom).menu.closed === false ? ' (its menu stayed open in the capture: the kit closes it at runtime)' : '') : ' (no side menu was found on it)'}`);
  if (kit) fs.mkdirSync(path.join(out, 'src', 'services'), { recursive: true });
  // src/services/<screen>.ts: the endpoints the live screen called (recorded by the capture), answered with mock data
  // (synthetic rows, no client data) until the real backend is wired in. Written once: hand edits are kept.
  const writeServices = (scr) => {
    const f = path.join(out, 'src', 'services', `${scr.id}.ts`);
    const k = readJson(path.join(screenDir(`${name}/${scr.id}`), 'kit', 'screen.json'), null);
    if (fs.existsSync(f) || !k) return;
    const ep = { search: k.requests?.search ?? null, ...Object.fromEntries(Object.entries(k.dialogs || {}).map(([id, d]) => [`open_${id}`, d.requests?.[0] ?? null])) };
    fs.writeFileSync(f, `// Services of "${scr.label}". GENERATED once by final-playwright (packs/${name}); edit freely, it is not overwritten.
` +
      `// endpoints: what the live screen called (method, path, the form fields it sent). The functions answer with mock data
// (synthetic rows shaped like the live grid, no client data) until they are wired to the real backend.
` +
      `import { mockPage, type KitData } from '../kit';
import kit from '../screens/${scr.id}/kit.json';

const data = kit as unknown as KitData;
` +
      `export const endpoints = ${JSON.stringify(ep, null, 2)} as const;

` +
      `export async function search(values: Record<string, string>) {
  void values; // the real call: endpoints.search with these form values
  const [id, after] = Object.entries(data.grids ?? {})[0] ?? [];
  return id ? mockPage(data.widgets[id], after) : { total: 0, rows: [] };
}

` +
      `export async function save(dialog: string, values: Record<string, string>) {
  return { ok: true, dialog, values }; // the real call: the dialog's save endpoint (not recorded: the capture never clicks Save)
}
`);
  };
  for (const scr of screens) {
    if (!fs.existsSync(path.join(screenDir(`${name}/${scr.id}`), 'snapshot', 'rendered.html'))) continue;
    if (ported(scr) && !forced('port')) continue;
    const id = `${name}/${scr.id}`;
    const port = (args) => { const r = nodeRun('port.mjs', [id, '--force', '--assets-dir', path.join(out, 'public', 'assets', scr.id), '--asset-base', `/assets/${scr.id}/`, ...args]); log(r.text.split('\n').map((l) => '   ' + l).join('\n')); if (!r.ok) throw new Error(`port ${id} failed`); };
    try {
      const kitArgs = (depth) => (kit ? ['--kit-import', depth] : []);
      if (scr === shellFrom && scr.scope) port(['--slot', scr.scope, '--name', 'Shell', '--out', path.join(out, 'src', 'shell'), ...kitArgs('../kit')]);
      if (kit && !scr.home) writeServices(scr);
      port([...(scr.scope && !(kit && scr.home) ? ['--scope', scr.scope] : []), '--name', scr.home ? 'Home' : pascal(scr.id), '--out', path.join(out, 'src', 'screens', scr.id),
        ...kitArgs('../../kit'), ...(kit && !scr.home ? ['--services', `../../services/${scr.id}`] : [])]);
      mark(`port:${scr.id}`, 'done');
      portedNow.add(scr.id);
    } catch (e) { mark(`port:${scr.id}`, 'failed', { problems: [e.message] }); log(`   !! ${e.message}`); }
  }
  if (!fs.existsSync(path.join(out, 'src', 'shell', 'Page.tsx'))) { // no separate content area: screens stand alone
    fs.mkdirSync(path.join(out, 'src', 'shell'), { recursive: true });
    fs.writeFileSync(path.join(out, 'src', 'shell', 'Page.tsx'), "import type { ReactNode } from 'react';\n\n// No shell was ported (no content area was found): every screen renders on its own.\nexport default function Shell({ children }: { children?: ReactNode; title?: string; module?: string }) {\n  return <>{children}</>;\n}\n");
  }
  // routes.ts + menu.ts: data, regenerated every run
  const routeOf = (s) => (s.home ? '/' : `/${s.id}`);
  const built = pack.screens.filter(ported).sort((a, b) => (b.home ? 1 : 0) - (a.home ? 1 : 0));
  if (!built.length) die('no screen was ported (no capture finished): see packs/' + name + '/STATUS.md');
  fs.writeFileSync(path.join(out, 'src', 'routes.ts'),
    `// GENERATED by final-playwright (npm run ui -- ${name}) on every run: one route per captured screen. Do not edit.\nimport type { ComponentType } from 'react';\n` +
    built.map((s, i) => `import Screen${i} from './screens/${s.id}/Page';\n`).join('') +
    `\n// title/module: the title bar text the shell shows for this screen; bare: a page with its own header (no shared shell)\nexport type Route = { path: string; screen: string; label: string; url: string; title?: string; module?: string; bare?: boolean; Page: ComponentType };\nexport const routes: Route[] = [\n` +
    built.map((s, i) => {
      const sh = kit ? readJson(path.join(screenDir(`${name}/${s.id}`), 'kit', 'screen.json'), {})?.shell ?? {} : {};
      return `  { path: ${JSON.stringify(routeOf(s))}, screen: ${JSON.stringify(s.id)}, label: ${JSON.stringify(s.label)}, url: ${JSON.stringify(s.url)}${sh.title ? `, title: ${JSON.stringify(sh.title)}` : ''}${sh.module ? `, module: ${JSON.stringify(sh.module)}` : ''}${kit && s.home ? ', bare: true' : ''}, Page: Screen${i} },\n`;
    }).join('') + '];\n' +
    `// the portal's links (side menu, buttons) that lead to a rebuilt screen go to its route\n(globalThis as { __kitRoutes?: { path: string; url: string }[] }).__kitRoutes = routes.map((r) => ({ path: r.path, url: r.url }));\n`);
  const withRoutes = (items, trail = []) => items.map((m) => {
    const t = [...trail, m.label], s = pack.screens.find((x) => x.trail?.join('\u0000') === t.join('\u0000'));
    return { label: m.label, ...(s && built.includes(s) ? { route: routeOf(s) } : {}), ...(m.children?.length ? { children: withRoutes(m.children, t) } : {}) };
  });
  fs.writeFileSync(path.join(out, 'src', 'menu.ts'),
    `// GENERATED from packs/${name}/menu.json (the live site's menu) on every run. Do not edit.\n// Items with a route are screens of this app; every other item is shown but goes nowhere (its module is not rebuilt here).\n` +
    `export type MenuItem = { label: string; route?: string; children?: MenuItem[] };\nexport const menu: MenuItem[] = ${JSON.stringify(withRoutes(menu.modules), null, 2)};\n`);
  for (const s of built) { // the specs travel with the code
    const d = path.join(out, 'docs', 'ui-specs', s.id);
    fs.mkdirSync(d, { recursive: true });
    for (const f of ['UI_SPEC.md', 'tasks.md']) { const src = path.join(screenDir(`${name}/${s.id}`), 'spec', f); if (fs.existsSync(src)) fs.copyFileSync(src, path.join(d, f)); }
    const todo = kit?.todo?.(screenDir(`${name}/${s.id}`), { route: routeOf(s) }); // the code writer's checklist
    if (todo) fs.writeFileSync(path.join(d, 'TODO.md'), todo);
  }

  // ---------- code: the writer adds the behavior, checked by tsc + verify against the capture ----------
  const devPort = pack.devPort ?? 5180, devBase = `http://localhost:${devPort}`;
  const up = () => fetch(devBase).then((r) => r.ok, () => false);
  // something already answers on the port: only reuse it if it is this app (a leftover dev server of an earlier run)
  const ours = () => fetch(devBase).then((r) => r.text(), () => '').then((t) => t.includes(`<title>${pack.menu}</title>`));
  if (await up() && !(await ours())) die(`another app is running on ${devBase}: stop it, or set "devPort" in packs/${name}/pack.json`);
  // the dev server: its output goes to logs/devserver.log, and it is started again whenever it is found dead (a check
  // against a dead server once cost a screen all its attempts: ERR_CONNECTION_REFUSED is not the writer's fault)
  const devLog = path.join(P, 'logs', 'devserver.log');
  fs.mkdirSync(path.dirname(devLog), { recursive: true });
  const startDev = async () => {
    devServer?.kill();
    const fd = fs.openSync(devLog, 'a');
    fs.writeSync(fd, `\n==== ${new Date().toISOString()} vite --port ${devPort}\n`);
    devServer = spawn(process.execPath, [bin(path.join('vite', 'bin', 'vite.js')), '--port', String(devPort), '--strictPort'], { cwd: out, stdio: ['ignore', fd, fd] });
    fs.closeSync(fd);
    for (let i = 0; i < 120 && !(await up()); i++) await new Promise((r) => setTimeout(r, 500));
    return up();
  };
  let restarting = null;
  const ensureDev = async () => {
    if (await up()) return true;
    restarting ||= (log(`   ! the dev server on ${devBase} is down: starting it again (log: ${rel(devLog)})`), startDev().finally(() => { restarting = null; }));
    return restarting;
  };
  if (!(await up()) && !(await startDev())) die(`the app's dev server did not start on ${devBase} (port taken? set "devPort" in pack.json; log: ${rel(devLog)})`);
  const limits = { maxBadPct: 5, maxHeightDeltaPx: 4, behavior: true, ...pack.verify };
  const tscBin = bin(path.join('typescript', 'bin', 'tsc'));
  // the screen's own files: with a kit each screen is built on its own, so another screen's errors (or a writer still at work
  // next to it) are not this screen's failure
  const ownFile = (s) => (f) => { const p = f.replace(/\\/g, '/'); return p.startsWith(`src/screens/${s.id}/`) || p === `src/services/${s.id}.ts`; };
  const verifyCmd = (s) => { const id = `${name}/${s.id}`, u = `${devBase}/#${routeOf(s)}`; return `the visual + behavior check, run from ${ROOT}: PowerShell \`$env:URL="${u}"; $env:WAIT_ROOT="1"; node scripts/verify.mjs ${id}\` (bash: \`URL="${u}" WAIT_ROOT=1 node scripts/verify.mjs ${id}\`); read ${path.join(screenDir(id), 'verify', 'report.json')}`; };
  const codeGate = (s) => async () => {
    const tsc = await runAsync(tscBin, ['--noEmit', '-p', out], { cwd: out });
    if (!tsc.ok) {
      const errs = tsc.text.split('\n').filter((l) => /error TS\d+/.test(l));
      const mine = kit ? errs.filter((l) => ownFile(s)(l.split('(')[0].trim())) : errs;
      if (mine.length || !errs.length) return { ok: false, text: `npx tsc --noEmit fails${kit ? ' in your files' : ''}:\n${(mine.length ? mine : tsc.text.split('\n')).slice(0, 40).join('\n')}` };
      log(`   (tsc: ${errs.length} error(s) in other files, not ${s.id}'s: ${errs[0].slice(0, 160)})`);
    }
    if (!(await ensureDev())) return { ok: false, infra: true, text: `the app's dev server on ${devBase} is down and did not start again (see ${rel(devLog)})` };
    const id = `${name}/${s.id}`, vdir = path.join(screenDir(id), 'verify');
    fs.rmSync(path.join(vdir, 'report.json'), { force: true });
    let v = await nodeRunAsync('verify.mjs', [id], { URL: `${devBase}/#${routeOf(s)}`, WAIT_ROOT: '1' });
    if (!v.ok && /ERR_CONNECTION_REFUSED|ECONNREFUSED/.test(v.text)) { // the server died during the check: once more on a fresh one
      if (!(await ensureDev())) return { ok: false, infra: true, text: `the app's dev server on ${devBase} died during the check (see ${rel(devLog)})` };
      v = await nodeRunAsync('verify.mjs', [id], { URL: `${devBase}/#${routeOf(s)}`, WAIT_ROOT: '1' });
      if (!v.ok && /ERR_CONNECTION_REFUSED|ECONNREFUSED/.test(v.text)) return { ok: false, infra: true, text: `the app's dev server on ${devBase} keeps dying (see ${rel(devLog)})` };
    }
    const rep = readJson(path.join(vdir, 'report.json'), null);
    if (!v.ok || !rep) return { ok: false, text: `verify could not compare the page:\n${v.text.split('\n').slice(-25).join('\n')}` };
    const lines = v.text.split('\n').filter((l) => /^(behavior:|motion:|states:|sections|cluster|worst)|✗/.test(l.trim()));
    // kit states (a dropdown open, a dialog...) mostly measure the kit, which the writer must not edit: one that already failed on
    // the port is reported, not gated. One that worked on the port and fails now was broken by the writer: that is gated
    const dh = rep.size_delta_px?.[1] ?? 0, behaviorBad = limits.behavior && lines.some((l) => l.includes('✗') && !l.trim().startsWith('states:'));
    const info = { verify: { bad_pct: rep.bad_pct, size_delta_px: rep.size_delta_px, worst_section: rep.worst_section?.label, behavior: lines.find((l) => l.startsWith('behavior:')), states: lines.find((l) => l.startsWith('states:'))?.split(' | ')[0] } };
    const base = status.states0?.[s.id], now = statesOf(rep);
    // broken: its clicks no longer run or what they must show is gone; or its picture, which matched, is clearly further off
    const broke = base ? Object.entries(now).filter(([n, x]) => base[n] && x.lvl < base[n].lvl && (x.lvl === 0 || (x.pct ?? 0) > (base[n].pct ?? 0) + 5)).map(([n, x]) => `- ${n}: ${x.why}`) : [];
    const ok = rep.bad_pct <= limits.maxBadPct && Math.abs(dh) <= limits.maxHeightDeltaPx * dpr && !behaviorBad && !broke.length;
    return { ok, info, broke: broke.length, text: `verify (the app at ${devBase}/#${routeOf(s)} against the captured reference): bad_pct ${rep.bad_pct}% (limit ${limits.maxBadPct}), size_delta_px ${JSON.stringify(rep.size_delta_px)} (height limit ±${limits.maxHeightDeltaPx * dpr}), worst section ${rep.worst_section?.label ?? '?'}\n${lines.join('\n')}\n` +
      (broke.length ? `States that worked on this screen before your change and fail now. Your change broke them (this is not a kit problem: do not write BLOCKED.md for it). Each is a click path of ${path.join(screenDir(id), 'kit', 'states.json')} (Search, then a grid row, then its dialog...): find the rule or handler of yours that stops it and remove it:\n${broke.join('\n')}\n` : '') +
      `Pictures: ${vdir}${path.sep}candidate.png (the app), diff.png, report.json; the reference is ${screenDir(id)}${path.sep}reference.png` };
  };
  // Kit states before any writer touched a screen (status.json "states0"), per state: 2 it matches the live page, 1 it ran but
  // its picture is off, 0 its clicks did not run or what they must show is not there. What is below 2 here is the kit's or the
  // capture's: the writer is told so and need not stop on it. Measured on a fresh port only: once a writer has edited the
  // screen it cannot be known any more.
  const statesOf = (rep) => Object.fromEntries((rep?.states ?? []).map((x) => [x.name, { lvl: x.ok ? 2 : x.error ? 0 : 1, pct: x.bad_pct ?? null, why: x.error ?? `${x.bad_pct}% off` }]));
  const freshPort = (s) => portedNow.has(s.id) || (!status.states0?.[s.id] && !status.items[`code:${s.id}`]);
  const saveBase = (s) => {
    const rep = readJson(path.join(screenDir(`${name}/${s.id}`), 'verify', 'report.json'), null);
    if (!rep?.states) return;
    (status.states0 ||= {})[s.id] = statesOf(rep);
    writeJson(statusFile, status);
  };
  const baseline = async (s) => {
    if (!kit || !freshPort(s) || !(await ensureDev())) return;
    fs.rmSync(path.join(screenDir(`${name}/${s.id}`), 'verify', 'report.json'), { force: true });
    await nodeRunAsync('verify.mjs', [`${name}/${s.id}`], { URL: `${devBase}/#${routeOf(s)}`, WAIT_ROOT: '1', BEHAVIOR: '0' });
    saveBase(s);
  };
  const known = (s) => {
    const bad = Object.entries(status.states0?.[s.id] ?? {}).filter(([, x]) => x.lvl < 2).map(([n, x]) => `${n} (${x.why})`);
    if (!status.states0?.[s.id]) return '';
    return bad.length
      ? `- These states of the check already fail on this screen before you start: ${bad.join('; ')}. They are the kit's or the capture's and are already reported to the person running the tool: do not fix them, do not work around them, and do not write BLOCKED.md because of them. Every other state passes now and must still pass when you are done.`
      : '- Every state of the check passes on this screen before you start (Search, the grid row, the dialogs, the side menu): it must still pass when you are done.';
  };
  const order = [...screens.filter((s) => s.home), ...screens.filter((s) => !s.home)].filter((s) => built.includes(s));
  // the kit's own behavior on the freshly ported app, before any writer touches it: the side menu (opens, flies out, closes),
  // a tooltip, the dialogs. A failure here is a kit or capture problem (reported, never handed to a writer)
  const pre = kit && !isDone('preflight:kit') || (kit && forced('port')) ? order.find((s) => s === shellFrom) ?? order.find((s) => !s.home) : null;
  if (pre) {
    log(`\n>> kit preflight on ${pre.id} (the port as it is, before any writer)`);
    const v = await nodeRunAsync('verify.mjs', [`${name}/${pre.id}`], { URL: `${devBase}/#${routeOf(pre)}`, WAIT_ROOT: '1', BEHAVIOR: '0' });
    const st = v.text.split('\n').find((l) => l.startsWith('states:'));
    log(`   ${st ?? `no kit states replayed${v.ok ? '' : `: ${v.text.split('\n').slice(-3).join(' | ')}`}`}`);
    const bad = (st ?? '').split(' | ').slice(1).map((x) => x.replace(/^✗\s*/, '').trim()).filter(Boolean);
    mark('preflight:kit', st && !bad.length ? 'done' : 'needs-review', { screen: pre.id, ...(bad.length || !st ? { problems: ['the kit on the raw port (fix it in kits/<kit>, not in the app):', ...(bad.length ? bad : [v.text.split('\n').slice(-5).join(' | ')])] } : {}) });
    if (freshPort(pre)) { saveBase(pre); portedNow.delete(pre.id); } // this screen's states before its writer: measured just now
  }
  const codeLimit = limiter(kit ? parallel : 1); // without a kit the home step builds the shell every other screen needs
  const codeOf = (s) => {
    const key = `code:${s.id}`;
    if (isDone(key) && !forced('code') && !flag('--redo')) { log(`   ${key}: done`); return null; }
    const id = `${name}/${s.id}`;
    const blocked = path.join(out, 'src', 'screens', s.id, 'BLOCKED.md');
    log(`\n>> code ${s.id}${kit && parallel > 1 ? ` (queued, ${parallel} at once)` : ''}`);
    const goal = s.home && kit
      ? `Build the home page in src/screens/home/ (route #/). It is a complete page with its own header (no shared shell). The header's side menu, tooltips and links already work through the kit (<KitScreen>).`
      : s.home
      ? `Build the shared shell and the home page.\n- src/shell/Page.tsx (+ its components/ and BEHAVIOR.md): the header and the site menu every screen shares. The menu's full tree, read from the live site, is in src/menu.ts: render every module and item from it with the open/close, hover and flyout behavior the spec describes (pictures: explore/shots for the menu opening, menu/*.png in the screen folder for each module's hover flyout). Items with a \`route\` link to \`#<route>\`; every other item looks and behaves the same but goes nowhere (no navigation, no error). {children} is where each screen renders: keep it.\n- src/screens/home/: the home page's own content.`
      : `Build the screen "${s.label}" in src/screens/${s.id}/ (route #/${s.id}). It renders inside the shared shell (src/shell), which is already built: do not change the shell.`;
    const files = s.home ? (kit ? '- Files you may edit or add: src/screens/home/**, public/assets/home/**.' : '- Files you may edit or add: src/shell/**, src/screens/home/**, public/assets/home/**.')
      : `- Files you may edit or add: src/screens/${s.id}/**, public/assets/${s.id}/**${kit ? `, src/services/${s.id}.ts` : ''}.`;
    const prompt = () => (kit
      ? fill('code-kit', { id, dir: screenDir(id), app: out, root: ROOT, name: s.id, goal, files, guide: kit.guide, blocked, verify: verifyCmd(s), known: known(s),
        todo: path.join(out, 'docs', 'ui-specs', s.id, 'TODO.md'), extra: kit.prompt('code', { dir: screenDir(id) }) })
      : fill('code', { id, dir: screenDir(id), app: out, root: ROOT, name: s.id, extra: '', goal, files }));
    return codeLimit(async () => { await baseline(s); return writeStep(key, { workdir: out, gate: codeGate(s), prompt: prompt(), blocked: kit ? blocked : undefined }); })
      .catch((e) => { mark(key, 'failed', { problems: [e.message.split('\n')[0]] }); log(`   !! code ${s.id}: ${e.message.split('\n')[0]}`); });
  };
  await Promise.all(order.map(codeOf).filter(Boolean));

  // ---------- report ----------
  const rows = built.map((s) => {
    const c = status.items[`code:${s.id}`], v = c?.verify ?? {};
    return `| ${s.label} | \`#${routeOf(s)}\` | ${c?.status ?? 'not built'} | ${v.bad_pct ?? '?'}% | ${v.size_delta_px ? v.size_delta_px.join(' × ') : '?'} | ${v.worst_section ?? ''} | ${[v.behavior, v.states].filter(Boolean).join('; ')} |`;
  });
  fs.writeFileSync(path.join(out, 'UI_BUILD_REPORT.md'),
    `# ${pack.menu}: React 19 rebuild\n\nGenerated by final-playwright (\`npm run ui -- ${name}\`) from ${pack.url}, ${new Date().toISOString().slice(0, 10)}.\n` +
    `Run it: \`npm install\`, \`npm run dev\`, open http://localhost:${devPort}/#/\n\n` +
    `| screen | route | status | pixels off | size delta (px) | worst section | behavior |\n|---|---|---|---|---|---|---|\n${rows.join('\n')}\n\n` +
    `"pixels off" and "size delta" compare the app with the captured reference (verify). Specs: docs/ui-specs/<screen>/. Guesses the writer made: docs/ui-specs/<screen>/GUESSED.md.\n` +
    `Items still marked needs-review: packs/${name}/STATUS.md in final-playwright (with the check's last report).\n`);
  log(`\n== done. ${rows.length} screen(s) in ${out}\n   report: ${path.join(out, 'UI_BUILD_REPORT.md')}\n   status: packs/${name}/STATUS.md`);
  for (const [k, v] of Object.entries(status.items).filter(([, v]) => v.status !== 'done')) log(`   ! ${k}: ${v.status}${v.problems?.[0] ? ` - ${v.problems[0]}` : ''}`);
} finally {
  await browser.close().catch(() => {});
  devServer?.kill();
}
