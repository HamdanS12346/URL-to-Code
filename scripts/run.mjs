#!/usr/bin/env node
// One command per screen:  node scripts/run.mjs <screen> [<screen> ...] | --all
//   --force            redo every step (default: skip steps whose inputs didn't change)
//   --skip a,b         leave steps out, e.g. --skip explore,selfcheck (fast: capture + reference + snapshot + motion + facts)
//   --from <step>      redo from this step on        --only <step>   run just this step
//   --mode readonly|safe|full   override config.mode  --headed        show the browser
// Steps: capture -> fidelity -> stitch -> align -> survey -> plan -> explore -> facts -> selfcheck -> spec
//   (5 stages: 1 capture, 2 find interactions, 3 plan, 4 run the plan + facts, 5 write the spec)
//   Stages 3 and 5 are done by your coding agent: the run STOPS there and prints the sentence to say; run the same command again after.
//   --auto             no stop at stage 3: use the rule-based plan       --selfcheck   re-run behaviors to drop flaky ones (slow)
//   --gemini           let Gemini write the spec (needs GEMINI_API_KEY)
// Input:  screenshots/<screen>/url/url.txt  (the only thing you need)
//         (+ optional *.png screenshots of your own, url/config.json, url/source.txt)
// Output: outputs/<screen>/
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './lib/browser.mjs';
import { capture } from './capture.mjs';
import { fidelity } from './snapshot.mjs';
import { survey, explore } from './explore.mjs';
import { facts, selfcheck } from './facts.mjs';
import { check } from './check-spec.mjs';
import { loadPlan } from './check-plan.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const STEPS = ['capture', 'fidelity', 'stitch', 'align', 'survey', 'plan', 'explore', 'facts', 'selfcheck', 'spec'];
const STAGE = {
  capture: 'STAGE 1/5  capture the page: assets, DOM, styles, motion, reference pictures',
  fidelity: 'STAGE 1/5  check that the offline copy matches the live page',
  stitch: 'STAGE 1/5  stitch your own screenshots',
  align: 'STAGE 1/5  compare your screenshots with the live page',
  survey: 'STAGE 2/5  find everything you can hover / click / type into (+ map pictures for the planner)',
  plan: 'STAGE 3/5  the exploration plan (explore/plan.json, written by your coding agent)',
  explore: 'STAGE 4/5  run the plan: hover, focus, click, type; record what changes',
  facts: 'STAGE 4/5  collect everything into facts.md',
  selfcheck: 'STAGE 4/5  re-run the behaviors to drop flaky ones',
  spec: 'STAGE 5/5  (optional, --gemini) Gemini writes UI_SPEC.md + tasks.md and runs the gate',
};
const IMG = /\.(png|jpe?g|webp|bmp)$/i;
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const optVals = new Set(['--from', '--only', '--mode', '--skip'].map((n) => opt(n)).filter(Boolean));
const skip = new Set((opt('--skip') || '').split(',').filter(Boolean));
// steps that run only when asked: selfcheck is 5-8 min on a live site and marks live-data behaviors flaky; the spec is normally written by your coding agent
const off = new Set();
if (!flag('--selfcheck') && opt('--only') !== 'selfcheck' && opt('--from') !== 'selfcheck') off.add('selfcheck');
if (!flag('--gemini') && opt('--only') !== 'spec' && opt('--from') !== 'spec') off.add('spec');
let screens = argv.filter((a) => !a.startsWith('--') && !optVals.has(a));
if (flag('--all')) screens = fs.readdirSync(path.join(ROOT, 'screenshots'), { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_')).map((d) => d.name);
if (!screens.length) { console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 10).join('\n').replace(/^\/\/ ?/gm, '')); process.exit(1); }
for (const o of ['--from', '--only']) if (opt(o) && !STEPS.includes(opt(o))) { console.error(`${o} must be one of: ${STEPS.join(', ')}`); process.exit(1); }

const base = readJson(path.join(ROOT, 'config.json'), {});
const python = base.python || (process.platform === 'win32' ? 'python' : 'python3');
const py = (...args) => {
  const r = spawnSync(python, [path.join(ROOT, 'scripts', 'stitch.py'), ...args], { encoding: 'utf8', env: { ...process.env, PYTHONUTF8: '1' } });
  if (r.error) throw new Error(`could not run ${python}: ${r.error.message} (set "python" in config.json)`);
  const out = (r.stdout || '').trim().split('\n').pop();
  let j; try { j = JSON.parse(out); } catch { throw new Error(`stitch.py: ${r.stderr || out}`); }
  if (r.status) throw new Error(j.error || r.stderr);
  return j;
};

function screenConfig(name) {
  const dir = path.join(ROOT, 'screenshots', name);
  if (!fs.existsSync(dir)) throw new Error(`no folder screenshots/${name}`);
  const urlFile = path.join(dir, 'url', 'url.txt');
  if (!fs.existsSync(urlFile)) throw new Error(`missing screenshots/${name}/url/url.txt`);
  const url = fs.readFileSync(urlFile, 'utf8').split(/\r?\n/).map((l) => l.trim()).find((l) => l && !l.startsWith('#'));
  try { new URL(url); } catch { throw new Error(`url.txt does not contain a valid URL: ${url}`); }
  const own = readJson(path.join(dir, 'url', 'config.json'), {});
  const shots = fs.readdirSync(dir).filter((f) => IMG.test(f) && fs.statSync(path.join(dir, f)).isFile());
  // url only (no screenshots of yours): base.urlOnly sets the viewport/dpr the tool shoots at
  const cfg = { ...base, ...(shots.length ? {} : base.urlOnly), ...own, explore: { ...base.explore, ...own.explore }, auth: { ...base.auth, ...own.auth } };
  if (opt('--mode')) cfg.mode = opt('--mode');
  if (flag('--headed')) cfg.headed = true;
  if (!['readonly', 'safe', 'full'].includes(cfg.mode)) throw new Error(`mode must be readonly, safe or full (got ${cfg.mode})`);
  if (cfg.auth.storageState) cfg.auth.storageState = path.resolve(ROOT, cfg.auth.storageState);
  const srcFile = path.join(dir, 'url', 'source.txt');
  const sources = fs.existsSync(srcFile) ? fs.readFileSync(srcFile, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : [];
  const finger = crypto.createHash('md5').update(JSON.stringify([url, cfg, shots.map((f) => [f, fs.statSync(path.join(dir, f)).size, fs.statSync(path.join(dir, f)).mtimeMs])])).digest('hex');
  return { dir, url, cfg, sources, shots, finger };
}

async function runScreen(name, browser) {
  const sc = screenConfig(name);
  const out = path.join(ROOT, 'outputs', name);
  fs.mkdirSync(out, { recursive: true });
  const logFile = path.join(out, 'run.log');
  const log = (m) => { console.log(m); fs.appendFileSync(logFile, m + '\n'); };
  const runFile = path.join(out, 'run.json');
  const prev = readJson(runFile, { steps: {} });
  const same = prev.finger === sc.finger;
  const run = { screen: name, url: sc.url, mode: sc.cfg.mode, sources: sc.sources, finger: sc.finger, steps: same ? prev.steps : {}, planHash: same ? prev.planHash : undefined, warnings: [] };
  const dpr = sc.cfg.dpr;
  log(`\n== ${name}  ${sc.url}  (dpr ${dpr}, mode ${sc.cfg.mode})`);

  let redo = flag('--force');
  const want = (step) => {
    if (opt('--only')) return opt('--only') === step;
    if (opt('--from') && STEPS.indexOf(step) >= STEPS.indexOf(opt('--from'))) redo = true;
    if (!run.steps[step]?.ok) redo = true;
    return redo;
  };
  const step = async (s, fn) => {
    if (off.has(s)) return;
    if (skip.has(s) || (s === 'survey' && skip.has('explore'))) { log(`- ${STAGE[s]}: skipped (--skip)`); return; }
    if (!want(s)) { log(`- ${STAGE[s]}: up to date (cached)`); return; }
    const t = Date.now();
    log(`
>> ${STAGE[s]}`);
    const r = await fn();
    if (r === false) { log(`   (${s} did not complete, see above)`); return; }
    run.steps[s] = { ok: true, at: new Date().toISOString(), ms: Date.now() - t };
    for (const later of STEPS.slice(STEPS.indexOf(s) + 1)) delete run.steps[later]; // built on the old result: stale, even if skipped this time
    log(`   done in ${((Date.now() - t) / 1000).toFixed(1)}s`);
    fs.writeFileSync(runFile, JSON.stringify(run, null, 1));
  };

  // viewport = what the user's browser showed: screenshot pixels / dpr
  let viewport = sc.cfg.defaultViewport;
  if (sc.shots.length) {
    const first = py('size', path.join(sc.dir, sc.shots.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0]));
    viewport = { width: Math.round(first.width / dpr), height: Math.round(first.height / dpr) };
  } else run.warnings.push(`no screenshots of yours: the tool shoots the reference itself at ${viewport.width}x${viewport.height} CSS px @ dpr ${dpr} (config urlOnly / defaultViewport)`);
  run.viewport = viewport;
  run.dpr = dpr;
  log(`  viewport ${viewport.width}x${viewport.height} CSS px @ dpr ${dpr}`);
  const ctx = { browser, cfg: sc.cfg, url: sc.url, out, viewport, dpr, log, userShots: sc.shots.length, auto: flag('--auto') };

  await step('capture', () => capture(ctx));
  await step('fidelity', async () => {
    const r = await fidelity(ctx);
    if (r && r.bad_pct > 10) run.warnings.push(`the offline snapshot differs from the live page by ${r.bad_pct}% (worst section: ${r.worst_section?.label}): assets or styles the capture did not save, or layout that only scripts build`);
  });
  await step('stitch', async () => {
    if (!sc.shots.length) return;
    let r;
    // a failed stitch only costs reference.png (needed by verify, not by the spec): warn and go on
    try { r = py('stitch', sc.dir, path.join(out, 'reference.png'), path.join(out, 'offsets.json'), path.join(out, 'capture', 'page.png')); }
    catch (e) {
      for (const f of ['reference.png', 'offsets.json', 'alignment.json', 'manifest.json']) fs.rmSync(path.join(out, f), { force: true });
      run.warnings.push(`stitch failed, no reference.png (spec still works from the screenshots; npm run verify needs it): ${e.message}`);
      return;
    }
    log(`  reference.png ${r.width}x${r.height} from ${sc.shots.length} shot(s) (placed by: ${r.placedBy.join(', ') || 'single shot'}), sticky top ${r.sticky.top}px / bottom ${r.sticky.bottom}px`);
  });
  const offsets = readJson(path.join(out, 'offsets.json'), null);
  await step('align', async () => {
    if (!offsets) return;
    const r = py('compare', path.join(out, 'reference.png'), path.join(out, 'capture', 'page.png'));
    fs.writeFileSync(path.join(out, 'alignment.json'), JSON.stringify(r, null, 1));
    log(`  live page vs your screenshots: size delta ${r.size_delta_px.join('x')} px, ${r.bad_pct}% pixels differ`);
    // a full-page capture never includes the scrollbar your shots show (≈15–17 CSS px): only more than that is a problem
    if (Math.abs(r.size_delta_px[0]) > Math.ceil(18 * dpr)) run.warnings.push(`width differs by ${r.size_delta_px[0]}px: wrong dpr (config "dpr"), or the shots include a browser frame/sidebar`);
    if (r.bad_pct > 30) run.warnings.push(`${r.bad_pct}% of pixels differ from the live page: different data, logged-in state, page, or zoom`);
  });
  await step('survey', () => survey(ctx));
  // stage 3: your coding agent decides what to explore. No usable plan -> stop here; the next run continues from this point
  const only = opt('--only');
  if (!skip.has('explore') && (!only || only === 'plan' || only === 'explore')) {
    log(`
>> ${STAGE.plan}`);
    const pl = loadPlan(out, { auto: flag('--auto') });
    for (const w of pl.warnings) log(`   ! ${w}`);
    if (!pl.ok) {
      for (const e of pl.errors.slice(0, 8)) log(`   - ${e}`);
      if (pl.errors.length > 8) log(`   - … ${pl.errors.length - 8} more: npm run check:plan -- ${name}`);
      for (const w of run.warnings) log(`  ! ${w}`);
      fs.writeFileSync(runFile, JSON.stringify(run, null, 1));
      log(`
   STOP HERE (stage 3 of 5). In your coding agent say:
       plan the exploration for ${name}
   (skill explore-plan: reads outputs/${name}/explore/survey/candidates.md + map/*.jpg, writes explore/plan.json,
    ends with: npm run check:plan -- ${name}  printing ✓)
   Then run the same command again to continue with stages 4-5:  npm run go -- ${name}
   (no agent? npm run go -- ${name} --auto  runs the rule-based plan instead)`);
      return 'paused';
    }
    log(`   ${pl.source === 'auto' ? 'rule-based plan (--auto; delete explore/plan.json to plan with your agent instead)' : "your agent's plan"}: ${pl.plan.hover.length} hovers, ${pl.plan.actions.length} actions${pl.plan.budgetSec ? `, budget ${pl.plan.budgetSec}s` : ''}`);
    if (pl.hash !== run.planHash) {
      if (run.steps.explore) log('   the plan changed since the last explore: stage 4 runs again');
      delete run.steps.explore; // -> explore and everything after it re-run
      run.planHash = pl.hash;
    }
    if (only === 'plan') return 'paused';
  }
  await step('explore', () => explore(ctx));
  await step('facts', () => facts({ ...ctx, screen: name, run }));
  await step('selfcheck', async () => {
    const r = await selfcheck({ ...ctx, screen: name, root: ROOT });
    log(`  parity tests vs the legacy page: ${r.passed} passed, ${r.flaky.length} flaky (excluded from the spec)${r.error ? ` — ${r.error}` : ''}`);
    if (r.error) run.warnings.push(`selfcheck did not run: ${r.error}`);
    if (r.flaky.length) await facts({ ...ctx, screen: name, run, flaky: r.flaky });
  });
  await step('spec', async () => {
    if (!process.env.GEMINI_API_KEY) {
      log(`   no GEMINI_API_KEY (put it in .env): the spec was not written. Either set it and re-run, or ask your coding agent: "write the UI spec for ${name}" (skill ui-spec), then: npm run check -- ${name}`);
      return false;
    }
    const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'spec-gemini.mjs'), name, '--repairs', String(base.gemini?.repairs ?? 2)], { stdio: 'inherit', cwd: ROOT });
    if (r.status) { run.warnings.push('the spec was written but the gate still reports problems: npm run check -- ' + name); }
    return fs.existsSync(path.join(out, 'spec', 'UI_SPEC.md')) ? undefined : false;
  });
  for (const w of run.warnings) log(`  ! ${w}`);
  fs.writeFileSync(runFile, JSON.stringify(run, null, 1));
  const total = Object.values(run.steps).reduce((n, x) => n + (x.ms || 0), 0);
  log(`
== ${name} finished (${(total / 60000).toFixed(1)} min of work)`);
  // a spec older than this capture belongs to a previous capture: don't judge it, the agent must rewrite it
  const specFile = path.join(out, 'spec', 'UI_SPEC.md');
  const fresh = fs.existsSync(specFile) && fs.statSync(specFile).mtimeMs >= fs.statSync(path.join(out, 'facts.md')).mtimeMs;
  const gate = fresh ? check(name) : null;
  if (gate?.pass) log(`   spec:   outputs/${name}/spec/UI_SPEC.md  +  tasks.md   (gate ✓: controls ${gate.coverage.controls}, behaviors ${gate.coverage.transitions}, ${gate.unknownMarkers} [UNKNOWN])
   STOP HERE. Read the spec's "Open questions", then start coding with your agent: "build ${name} from outputs/${name}/spec/tasks.md" (skill draw-ui).`);
  else if (gate) log(`   spec written but the gate ✗: npm run check -- ${name} lists what is missing (controls ${gate.coverage?.controls}, behaviors ${gate.coverage?.transitions}).
   Fix with your agent: "fix the failing spec check for ${name}" (skill ui-spec), re-run the check until ✓, THEN start coding.`);
  else log(`
>> STAGE 5/5  write the spec: your coding agent does this
   STOP HERE. In your coding agent (one chat per screen) say:
       write the UI spec for ${name}
   (skill ui-spec reads outputs/${name}/facts.md, sections/, content.md). It must end with: npm run check -- ${name}  printing ✓.
   Then, in a new chat:  build ${name} from outputs/${name}/spec/tasks.md   (skill draw-ui)`);
}

const browser = await launch({ ...base, headed: flag('--headed') });
let failed = 0, paused = 0;
try {
  for (const s of screens) {
    try { if (await runScreen(s, browser) === 'paused') paused++; }
    catch (e) { failed++; console.error(`\n!! ${s}: ${e.message}`); fs.mkdirSync(path.join(ROOT, 'outputs', s), { recursive: true }); fs.appendFileSync(path.join(ROOT, 'outputs', s, 'run.log'), `ERROR ${e.stack}\n`); }
  }
} finally { await browser.close(); }
console.log(`\n${screens.length - failed - paused}/${screens.length} screen(s) done${paused ? `, ${paused} waiting for the exploration plan (stage 3, see STOP HERE above)` : ''}.`);
process.exit(failed ? 1 : 0);
