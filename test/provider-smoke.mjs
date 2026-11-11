// npm run smoke:provider — the whole `npm run ui` flow on a local Provider-style portal (real Kendo UI, test/provider-portal),
// with the fake writer instead of Codex, then the rebuilt app driven in a browser:
//   capture: the kit is detected, the harvest reads widgets / options / tooltips / validation from Kendo, Search fills the grid
//   (templates, no values), Create New + the nested Create New + the first row's edit dialog are harvested and closed;
//   the number box that the server wrote as value="0" but Kendo shows empty stays empty
//   build: the app goes to packs/<pack>/app (no --out), compiles, uses the kit (KitScreen, KitWidget, dialogs, services)
//   behavior in the rebuild: dropdown open/close (second click, outside click), tooltip after its delay, Search -> rows + pager,
//   sort, Create New -> dialog, Save validates with the server's messages, Cancel closes, the side menu opens
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startProviderPortal } from './provider-portal/server.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
for (const m of ['kendo-ui-core', 'jquery', '@progress/kendo-theme-default']) // optionalDependencies: a blocked registry may have skipped them
  if (!fs.existsSync(path.join(ROOT, 'node_modules', m))) { console.error(`provider smoke needs ${m} (an optional dependency of this repo, used only by the test portal): npm install ${m}`); process.exit(2); }
const PORT = 4798, PACK = 'smoke-provider', PASSWORD = 'Prov-Pw-55z', COOKIE = 'sid=provider-session-91c';
const P = path.join(ROOT, 'packs', PACK), APP = path.join(P, 'app');
const server = startProviderPortal(PORT, { password: PASSWORD, cookie: COOKIE });

fs.rmSync(P, { recursive: true, force: true });
fs.mkdirSync(P, { recursive: true });
fs.writeFileSync(path.join(P, 'pack.json'), JSON.stringify({ devPort: 5181, config: { dpr: 1, defaultViewport: { width: 1400, height: 900 } } }));
const envFile = path.join(ROOT, 'test-results', 'provider-smoke.env');
fs.mkdirSync(path.dirname(envFile), { recursive: true });
fs.writeFileSync(envFile, 'USERNAME=admin\n');

const t0 = Date.now();
const code = await new Promise((r) => {
  const p = spawn(process.execPath, [path.join(ROOT, 'scripts', 'ui.mjs'), PACK, '--yes', '--url', `http://localhost:${PORT}/Home/MyHome/`, '--menu', 'file transfer services',
    '--env', envFile, '--writer', `node ${path.join(ROOT, 'test', 'fake-writer.mjs')}`, '--rounds', '0'], { cwd: ROOT, stdio: 'inherit', env: { ...process.env, UI_PASSWORD: PASSWORD } });
  p.on('exit', r);
});
const minutes = ((Date.now() - t0) / 60000).toFixed(1);
assert.equal(code, 0, 'npm run ui failed');

const j = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const pack = j(path.join(P, 'pack.json'));
assert.equal(pack.kit, 'provider', 'the Provider kit should be detected on the home page');
assert.equal(pack.outRepo, APP, 'without --out the code goes to packs/<pack>/app');
assert.deepEqual(pack.screens.map((s) => s.id), ['home', 'file-transfer-configuration', 'file-transfer-tracking']);
const S = (id) => path.join(P, 'screens', id);

// ---- the harvest ----
const cfg = j(path.join(S('file-transfer-configuration'), 'kit', 'screen.json'));
const kinds = Object.values(cfg.widgets).map((w) => w.kind).sort();
assert.deepEqual(kinds, ['dropdown', 'dropdown', 'grid', 'numeric'], `widgets: ${kinds}`);
const om = Object.values(cfg.widgets).find((w) => w.label === 'Owner Module');
assert.equal(om.items.length, 8, 'dropdown options read from Kendo, not by clicking');
assert.equal(om.optionLabel, 'select a value...');
assert.equal(om.help, 'Owner Module', 'the ? tooltip belongs to its field');
assert.equal(Object.values(cfg.widgets).find((w) => w.kind === 'numeric').value, null, 'ConfigId is empty in Kendo');
assert.deepEqual([cfg.shell.module, cfg.shell.title], ['File Transfer Services', 'File Transfer Configuration'], 'title bar texts');
const g = Object.values(cfg.grids)[0];
assert.equal(g.total, 23, 'Search: the grid total');
assert.ok(g.rowTemplate.includes('{{c0}}') && !g.rowTemplate.includes('Config0'), 'row template keeps no values');
assert.equal(cfg.requests.search.url, '/FileTransfer/GetSourceLocations', 'the search endpoint is recorded');
assert.ok(cfg.search.reveals.length >= 1, 'Search reveals the results panel');
const dlg = Object.values(cfg.dialogs);
assert.ok(dlg.some((d) => d.title === 'Add File Transfer Configuration' && !d.parent), `Create New dialog harvested: ${dlg.map((d) => d.title)}`);
assert.ok(dlg.some((d) => d.title === 'Add Destination' && d.parent), 'the nested Create New dialog harvested');
assert.ok(cfg.row?.dialog && cfg.dialogs[cfg.row.dialog].title === 'Edit File Transfer Configuration', `first row opens the edit dialog: ${JSON.stringify(cfg.row)}`);
const add = dlg.find((d) => d.title === 'Add File Transfer Configuration');
assert.ok(add.fields.some((f) => f.validation.required === 'Configuration Name is a required field.'), 'MVC validation messages harvested');
assert.ok(cfg.calibration.dropdownPopup?.includes('k-list-container'), 'live dropdown popup markup recorded');
assert.ok(cfg.calibration.tooltip?.includes('k-tooltip'), 'live tooltip markup recorded');
assert.equal(cfg.calibration.defaults.popup.open.duration, 200, "Kendo's own popup animation");
const html = fs.readFileSync(path.join(S('file-transfer-configuration'), 'snapshot', 'rendered.html'), 'utf8');
assert.match(html, /<input[^>]*id="ConfigId"[^>]*value=""|<input[^>]*value=""[^>]*id="ConfigId"/, 'the snapshot keeps the live (empty) value, not value="0"');
const run = j(path.join(S('file-transfer-configuration'), 'run.json'));
assert.ok(!run.steps.explore && !run.steps.survey, 'the kit skips survey/plan/explore');
const trk = j(path.join(S('file-transfer-tracking'), 'kit', 'screen.json'));
assert.ok(Object.values(trk.widgets).some((w) => w.kind === 'datetime'), 'date-time pickers harvested');
// the side menu, as the client's script opens it (probe 2, Q22): a class swap + a backdrop appended to <body>
assert.equal(cfg.menu?.root, 'div#mainMenuContainer', `the menu root is the panel with the links, not a field that appeared with it: ${JSON.stringify(cfg.menu)}`);
assert.deepEqual([cfg.menu.add, cfg.menu.remove], [['display-flex'], ['display-none']], 'the classes the menu swaps');
assert.match(cfg.menu.backdrop ?? '', /disabled-backdrop/, 'the backdrop the menu appends');
assert.equal(cfg.menu.closed, true, 'the capture closed the menu again with its own close icon');
assert.ok(!html.includes('class="disabled-backdrop"'), 'no backdrop frozen into the snapshot');
// the portal's row convention: setKendoGridDataBoundEvents(e, msg, click, dblclick) -> a double-click opens the view dialog
assert.equal(trk.plan?.rowDouble, 'onDisplayTrackingView', `the row's double-click handler read from the script: ${JSON.stringify(trk.plan)}`);
assert.equal(trk.row?.via, 'dblclick', `the row opened by double-click: ${JSON.stringify(trk.row)}`);
assert.equal(trk.dialogs[trk.row.dialog]?.title, 'View File Transfer Tracking', 'the view dialog harvested');
assert.deepEqual(trk.missing, [], 'every dialog the script opens was harvested');
const cfgStates = j(path.join(S('file-transfer-configuration'), 'kit', 'states.json')).map((s) => s.name);
for (const n of ['menu-open', 'menu-flyout', 'menu-close', 'tab-flyout']) assert.ok(cfgStates.includes(n), `verify replays ${n}: ${cfgStates}`);
// the page-level help book: the tracking page has it, the others (and so the shell, ported from the first) do not
assert.ok(j(path.join(S('file-transfer-tracking'), 'kit', 'screen.json')).help?.includes('help-icon-container'), 'the tracking capture records its help book');
assert.equal(j(path.join(S('file-transfer-configuration'), 'kit', 'screen.json')).help, null, 'the configuration capture records that it has none');
assert.ok(fs.readFileSync(path.join(S('file-transfer-configuration'), 'facts.md'), 'utf8').includes('Provider kit harvest'), 'facts.md carries the harvest');
const st = j(path.join(P, 'status.json')).items;
for (const s of pack.screens) assert.equal(st[`spec:${s.id}`]?.status, 'done', `spec:${s.id}: ${JSON.stringify(st[`spec:${s.id}`])}`);
assert.ok(!st['plan:file-transfer-configuration'], 'no writer planning step with a kit');

// ---- the app ----
const read = (f) => fs.readFileSync(path.join(APP, f), 'utf8');
assert.ok(fs.existsSync(path.join(APP, 'src', 'kit', 'KitScreen.tsx')), 'the kit runtime is in the app');
const page = read('src/screens/file-transfer-configuration/Page.tsx');
assert.ok(page.includes('<KitScreen') && page.includes('services={services}'), 'the screen is wrapped in KitScreen with its services');
assert.ok(fs.readdirSync(path.join(APP, 'src', 'screens', 'file-transfer-configuration', 'dialogs')).length >= 3, 'one component per dialog');
assert.match(read('src/services/file-transfer-configuration.ts'), /GetSourceLocations/, 'services name the real endpoint');
assert.match(read('src/shell/Page.tsx'), /title, module/, 'the shell takes the title bar texts as props');
assert.match(read('src/routes.ts'), /title: "File Transfer Configuration"/);
const tsc = spawnSync(process.execPath, [path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc'), '--noEmit', '-p', APP], { encoding: 'utf8' });
assert.equal(tsc.status, 0, `tsc fails:\n${tsc.stdout}${tsc.stderr}`);
const vrep = j(path.join(S('file-transfer-configuration'), 'verify', 'report.json'));
assert.ok(vrep.states?.length >= 3, `kit states replayed by verify: ${JSON.stringify(vrep.states)}`);
for (const s of vrep.states.filter((x) => x.name.startsWith('menu-'))) assert.ok(s.ok, `verify: ${s.name} on the rebuild: ${s.error ?? `${s.bad_pct}% off`}`);
assert.ok(fs.existsSync(path.join(APP, 'docs', 'ui-specs', 'file-transfer-tracking', 'TODO.md')), 'a checklist for the code writer');
assert.match(read('docs/ui-specs/file-transfer-tracking/TODO.md'), /double-click opens dialog/, 'the checklist says what the kit does for the row');

// ---- behavior of the rebuild, in a browser ----
const vite = spawn(process.execPath, [path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js'), '--port', '5182', '--strictPort'], { cwd: APP, stdio: 'ignore' });
const base = 'http://localhost:5182';
for (let i = 0; i < 120 && !(await fetch(base).then((r) => r.ok, () => false)); i++) await new Promise((r) => setTimeout(r, 500));
const browser = await chromium.launch({ channel: JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8')).browserChannel || undefined });
const errors = [];
try {
  const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await p.goto(`${base}/#/file-transfer-configuration`);
  await p.waitForSelector('[data-kit-root]', { state: 'attached', timeout: 60000 });
  await p.waitForTimeout(800);
  assert.equal((await p.locator('#moduleContentBar h1').textContent()).trim(), 'File Transfer Configuration', "the shell shows this screen's title");
  const ddSel = `[data-kit="${Object.entries(cfg.widgets).find(([, w]) => w.label === 'Owner Module')[0]}"]`;
  // dropdown: opens, a second click closes, an outside click closes, picking sets the text
  await p.click(ddSel);
  await p.waitForSelector('[data-kit-popup] li.k-list-item', { timeout: 3000 });
  assert.equal(await p.locator('[data-kit-popup] li.k-list-item').count(), 8);
  await p.click(ddSel);
  await p.waitForTimeout(400);
  assert.equal(await p.locator('[data-kit-popup] .k-list-container').count(), 0, 'a second click closes the dropdown');
  await p.click(ddSel);
  await p.waitForTimeout(300);
  await p.mouse.click(5, 600);
  await p.waitForTimeout(400);
  assert.equal(await p.locator('[data-kit-popup] .k-list-container').count(), 0, 'an outside click closes the dropdown');
  await p.click(ddSel);
  await p.locator('[data-kit-popup] li.k-list-item', { hasText: 'Core' }).click();
  await p.waitForTimeout(300);
  assert.equal((await p.locator(`${ddSel} .k-input-value-text`).textContent()).trim(), 'Core', 'picking an item shows it');
  // tooltip on a ? icon, after the portal's delay
  await p.hover('[data-kit-tip="Owner Module"]');
  await p.waitForTimeout(900);
  assert.equal((await p.locator('.k-tooltip .k-tooltip-content').first().textContent()).trim(), 'Owner Module', 'tooltip text');
  const tipLines = await p.locator('.k-tooltip .k-tooltip-content').first().evaluate((e) => Math.round(e.getBoundingClientRect().height / (parseFloat(getComputedStyle(e).lineHeight) || 18)));
  assert.equal(tipLines, 1, 'a two-word tooltip stays on one line');
  await p.mouse.move(5, 600);
  await p.waitForTimeout(500);
  // Search: results panel, 10 rows, pager, sort
  await p.click('[data-kit-action=search]');
  await p.waitForSelector('tr[data-kit-row]', { timeout: 3000 });
  assert.equal(await p.locator('tr[data-kit-row]').count(), 10, 'one page of synthetic rows');
  const first = await p.locator('tr[data-kit-row="0"] td').first().textContent();
  await p.locator('.k-pager .k-pager-numbers [data-page="2"]').click();
  await p.waitForTimeout(200);
  assert.notEqual(await p.locator('tr[data-kit-row="0"] td').first().textContent(), first, 'page 2 shows other rows');
  assert.match(await p.locator('.k-pager-info').textContent(), /11 - 20 of 23/);
  await p.locator('.k-grid-header th').nth(1).click();
  await p.waitForTimeout(200);
  assert.equal(await p.locator('.k-grid-header th').nth(1).getAttribute('aria-sort'), 'ascending', 'sorting');
  // Create New: dialog, Save validates with the server's message, Cancel closes
  await p.click('[data-kit-action=create]');
  await p.waitForSelector('.k-window [data-kit-dialog-content]', { timeout: 3000 });
  await p.waitForTimeout(500);
  assert.equal((await p.locator('.k-window .k-window-title').first().textContent()).trim(), 'Add File Transfer Configuration');
  await p.locator('.k-window [data-kit-action=save]').click();
  await p.waitForTimeout(200);
  assert.ok((await p.locator('.k-window').first().textContent()).includes('Configuration Name is a required field.'), "Save shows the server's validation message");
  await p.locator('.k-window [data-kit-action=cancel]').click();
  await p.waitForTimeout(700);
  assert.equal(await p.locator('.k-window').count(), 0, 'Cancel closes the dialog');
  // the side menu: opens like the portal's (its classes + the backdrop), Escape and the backdrop leave it open, a module
  // flies out on hover, the close icon closes it, a menu item of this app routes there and closes it
  assert.equal(await p.locator('#mainMenuContainer').isVisible(), false, 'the menu starts closed');
  await p.click('[data-kit-action=menu]:visible');
  await p.waitForTimeout(400);
  assert.ok(await p.locator('[data-kit-menu]').first().isVisible(), 'the hamburger opens the side menu');
  assert.match(await p.locator('#mainMenuContainer').getAttribute('class'), /display-flex/, 'by the portal\'s own class');
  assert.equal(await p.locator('body > .disabled-backdrop').count(), 1, 'with the backdrop on <body>');
  await p.keyboard.press('Escape');
  await p.mouse.click(200, 500);
  await p.waitForTimeout(300);
  assert.ok(await p.locator('[data-kit-menu]').first().isVisible(), 'Escape and a click on the backdrop do not close it (as on the live portal)');
  await p.locator('[data-kit-menu] li', { hasText: 'File Transfer Services' }).first().hover();
  await p.waitForTimeout(700);
  const fly = p.locator('[data-kit-flyout]').filter({ hasText: 'File Transfer Tracking' });
  assert.ok(await fly.first().isVisible(), 'the module flies out on hover');
  // beside the module list (Kendo lifts the popup out of the <ul>, which clips what is inside it), and on top of the page
  const [fb, mb] = [await fly.first().boundingBox(), await p.locator('#mainMenu').boundingBox()];
  assert.ok(fb.x + fb.width <= mb.x + 1, `the fly-out opens to the left of the module list (${JSON.stringify(fb)} vs ${JSON.stringify(mb)})`);
  assert.ok(await fly.first().evaluate((el) => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); }), 'and it is on top, not clipped');
  // an item of a module that is not rebuilt here is shown but leads nowhere; the menu stays open
  await p.locator('[data-kit-menu] li', { hasText: 'Claims Management' }).first().hover();
  await p.waitForTimeout(700);
  await p.locator('[data-kit-flyout] a', { hasText: 'Search Claims' }).click();
  await p.waitForTimeout(300);
  assert.equal(new URL(p.url()).hash, '#/file-transfer-configuration', 'an item of a module that is not rebuilt leads nowhere');
  assert.ok(await p.locator('#mainMenuContainer').isVisible(), 'and the menu stays open');
  // Quick Links: its angle icon opens the accordion (icon, class, title as the portal does) and closes it again
  const bdy = p.locator('#mainMenuContainer .content-subpanel-bdy'), qi = p.locator('#mobileMenuIcon');
  assert.equal(await bdy.isVisible(), false, 'Quick Links starts collapsed');
  await qi.click();
  await p.waitForTimeout(700);
  assert.ok(await bdy.isVisible(), 'the Quick Links icon opens its accordion');
  assert.match(await qi.getAttribute('class'), /fa-angle-up/);
  assert.doesNotMatch(await qi.getAttribute('class'), /subpanel-collapsed/);
  assert.equal(await qi.getAttribute('title'), 'Collapse');
  await qi.click();
  await p.waitForTimeout(700);
  assert.equal(await bdy.isVisible(), false, 'and a second click closes it');
  assert.match(await qi.getAttribute('class'), /fa-angle-down.*subpanel-collapsed|subpanel-collapsed.*fa-angle-down/);
  assert.equal(await qi.getAttribute('title'), 'Expand');
  assert.equal(await p.locator('#mcbRowBorder .help-icon-container').count(), 0, 'no help book on a page whose live twin has none');
  await p.click('[data-kit-action=menu-close]');
  await p.waitForTimeout(300);
  assert.equal(await p.locator('#mainMenuContainer').isVisible(), false, 'the close icon closes it');
  assert.equal(await p.locator('.disabled-backdrop').count(), 0, 'and removes the backdrop');
  await p.click('[data-kit-action=menu]:visible');
  await p.locator('[data-kit-menu] li', { hasText: 'File Transfer Services' }).first().hover();
  await p.waitForTimeout(700);
  await fly.first().locator('a', { hasText: 'File Transfer Tracking' }).click();
  await p.waitForTimeout(800);
  assert.equal(new URL(p.url()).hash, '#/file-transfer-tracking', 'a menu item of this app routes to its screen');
  assert.equal(await p.locator('#mainMenuContainer').isVisible(), false, 'and closes the menu');
  assert.equal(await p.locator('.disabled-backdrop').count(), 0);
  // at 1280 CSS px (a 1920 screen at 150% scaling) the portal swaps in its mobile hamburger: that one opens the menu too
  const vp = p.viewportSize();
  await p.setViewportSize({ width: 1280, height: vp.height });
  await p.click('.mobile-nav [data-kit-action=menu]');
  await p.waitForTimeout(300);
  assert.ok(await p.locator('#mainMenuContainer').isVisible(), 'the narrow-window hamburger opens the menu');
  await p.click('[data-kit-action=menu-close]');
  await p.setViewportSize(vp);
  // the page-level help book comes with the screen: the tracking page has it
  assert.equal(await p.locator('#mcbRowBorder .help-icon-container').count(), 1, "the tracking page shows its help book, which the shell (ported from another screen) does not carry");
  assert.equal(await p.locator('#mcbRowBorder .help-icon-container [data-kit-tip]').count(), 1, 'with the portal\'s tooltip');
  // the module tab under the header: hovering it opens the module's screens under it; its items route
  const tab = p.locator('#activeModuleMenu > li').first();
  await tab.hover();
  await p.waitForTimeout(700);
  const band = p.locator('[data-kit-flyout]').filter({ hasText: 'File Transfer Configuration' });
  assert.ok(await band.first().isVisible(), 'the module tab opens its screens on hover');
  const [bb, tb] = [await band.first().boundingBox(), await tab.boundingBox()];
  assert.ok(bb.y >= tb.y + tb.height - 2, 'under the tab');
  await band.first().locator('a', { hasText: 'File Transfer Configuration' }).click();
  await p.waitForTimeout(800);
  assert.equal(new URL(p.url()).hash, '#/file-transfer-configuration', 'a module-tab item of this app routes to its screen');
  assert.equal(await p.locator('#mcbRowBorder .help-icon-container').count(), 0, 'and the help book goes with the tracking page');
  await p.locator('#activeModuleMenu > li').first().hover();
  await p.waitForTimeout(700);
  await p.locator('[data-kit-flyout] a', { hasText: 'File Transfer Tracking' }).click();
  await p.waitForTimeout(800);
  assert.equal(new URL(p.url()).hash, '#/file-transfer-tracking');
  // the tracking grid: a click selects the row, a double-click opens the view dialog (the portal's convention)
  await p.waitForSelector('[data-kit-action=search]', { timeout: 10000 });
  await p.click('[data-kit-action=search]');
  await p.waitForSelector('tr[data-kit-row]', { timeout: 3000 });
  await p.locator('tr[data-kit-row="1"] td').first().click();
  await p.waitForTimeout(300);
  assert.match(await p.locator('tr[data-kit-row="1"]').getAttribute('class') ?? '', /k-selected/, 'a click selects the row');
  assert.equal(await p.locator('.k-window').count(), 0, 'a click alone opens nothing');
  await p.locator('tr[data-kit-row="1"] td').first().dblclick();
  await p.waitForSelector('.k-window [data-kit-dialog-content]', { timeout: 3000 });
  assert.equal((await p.locator('.k-window .k-window-title').first().textContent()).trim(), 'View File Transfer Tracking', 'a double-click opens the view dialog');
  assert.deepEqual(errors, [], `no errors in the rebuild:\n${errors.join('\n')}`);
} finally {
  await browser.close();
  vite.kill();
  server.close();
}
console.log(`\nprovider smoke: OK (npm run ui took ${minutes} min)`);
