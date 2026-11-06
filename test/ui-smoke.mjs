// npm run smoke:ui — the whole `npm run ui` flow on a tiny local portal, with a fake writer instead of Codex:
// login form inside a hamburger drawer, a hover-flyout module menu (one item has no href, only an onclick),
// two screens behind the login (one with a field that appears only for one choice). Checks: login, menu discovery
// (both URLs), content-area detection, capture + plan + explore + spec for 3 screens, the app scaffold + port + code gate.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = 4797, PACK = 'smoke-portal'; // pack names are slugs: lower-case letters, digits, dashes
const PASSWORD = 'Smoke-Pw-91x', COOKIE = 'sid=smoke-session-7f3a';
const P = path.join(ROOT, 'packs', PACK), OUT = path.join(ROOT, 'test-results', 'ui-smoke-app');

const shell = (loggedIn, content, err = '') => `<!doctype html><html><head><meta charset="utf-8"><title>Portal</title><style>
body{margin:0;font:14px Arial;background:#f3f3f3}
header{height:64px;background:#1d2733;color:#fff;display:flex;align-items:center;padding:0 24px;border-bottom:3px solid #2f8fe8}
header h1{font-size:22px;color:#4aa3ff;margin:0 0 0 40px}
.hamburger{margin-left:auto;width:48px;height:48px;background:#2f8fe8;border:0;cursor:pointer;display:flex;flex-direction:column;justify-content:center;gap:6px;padding:0 10px}
.hamburger span{display:block;height:4px;background:#fff}
#drawer{display:none;position:fixed;top:0;right:0;width:320px;height:100%;background:#fff;box-shadow:-2px 0 8px #0004;z-index:10}
#drawer.open{display:block}
#drawer .close{position:absolute;left:12px;top:12px;border:0;background:none;font-size:22px;cursor:pointer}
.quick{background:#4a5560;color:#fff;margin:56px 0 0;padding:12px 24px;list-style:none}.quick a{color:#fff;font-weight:bold;font-size:12px}
.modules{list-style:none;margin:0;padding:8px 0}.mod{position:relative;padding:10px 24px;cursor:pointer;font-weight:bold}
.mod:hover{background:#1d2733;color:#fff}.fly{display:none;position:absolute;right:100%;top:0;width:240px;background:#1d2733;list-style:none;margin:0;padding:6px 0}
.mod:hover .fly{display:block}.fly a{display:block;color:#fff;padding:8px 16px;text-decoration:none}
#main{padding:24px}.hero{height:400px;background:linear-gradient(#ddd,#999);display:flex;align-items:flex-end;justify-content:flex-end;padding:24px;font-size:32px}
form.login{padding:72px 24px}form.login input{display:block;margin:8px 0;width:240px}.err{color:#c00}
</style></head><body>
<header><b>portal</b><h1>Management Solutions</h1><button class="hamburger" aria-label="Menu" onclick="drawer.classList.add('open')"><span></span><span></span><span></span></button></header>
<aside id="drawer"><button class="close" onclick="drawer.classList.remove('open')">✕</button>${loggedIn ? `
<ul class="quick"><li><a href="#">MESSAGES</a></li><li><a href="/logout">LOGOUT</a></li></ul>
<ul class="modules">
<li class="mod"><span>Administration</span><ul class="fly"><li><a href="/Admin/Users">Users</a></li><li><a href="/Admin/Roles">Roles</a></li></ul></li>
<li class="mod"><span>File Transfer Services</span><ul class="fly"><li><a href="/FT/Config">File Transfer Configuration</a></li><li><a href="#" onclick="location.href='/FT/Tracking';return false">File Transfer Tracking</a></li></ul></li>
<li class="mod"><span>Claims Management</span><ul class="fly"><li><a href="/Claims/Search">Claim Search</a></li></ul></li>
</ul>` : `<form class="login" method="post" action="/login">${err ? `<p class="err">${err}</p>` : ''}<label>User name<input name="user" type="text"></label><label>Password<input name="pass" type="password"></label><button type="submit">Log In</button></form>`}</aside>
<div id="main">${content}</div></body></html>`;

const pages = {
  '/Home/MyHome/': '<div class="hero">Medicaid Management Solutions</div>',
  '/FT/Config': `<h2>File Transfer Configuration</h2><fieldset><label>Protocol <select id="proto" onchange="key.style.display=this.value==='SFTP'?'block':'none'"><option>FTP</option><option>SFTP</option></select></label>
<label id="key" style="display:none">Key file <input id="keyfile" type="text"></label><button id="search" type="button" onclick="res.textContent='3 configurations found'">Search</button><p id="res"></p></fieldset>`,
  '/FT/Tracking': '<h2>File Transfer Tracking</h2><label>From <input id="from" type="date"></label> <label>To <input id="to" type="date"></label><table border="1"><tr><th>File</th><th>Status</th></tr><tr><td>a.txt</td><td>Sent</td></tr></table>',
};
const server = http.createServer((req, res) => {
  const authed = (req.headers.cookie || '').includes(COOKIE);
  const u = new URL(req.url, `http://localhost:${PORT}`);
  if (req.method === 'POST' && u.pathname === '/login') {
    let body = '';
    req.on('data', (b) => { body += b; });
    return req.on('end', () => {
      const f = new URLSearchParams(body);
      if (f.get('user') === 'admin' && f.get('pass') === PASSWORD) { res.writeHead(302, { 'set-cookie': `${COOKIE}; Path=/`, location: '/Home/MyHome/' }); return res.end(); }
      res.writeHead(200, { 'content-type': 'text/html' }); res.end(shell(false, pages['/Home/MyHome/'], 'Wrong user name or password'));
    });
  }
  if (u.pathname !== '/Home/MyHome/' && !authed) { res.writeHead(302, { location: '/Home/MyHome/' }); return res.end(); }
  res.writeHead(pages[u.pathname] ? 200 : 404, { 'content-type': 'text/html' });
  res.end(shell(authed, pages[u.pathname] ?? '<h2>Not part of this test</h2>'));
}).listen(PORT);

fs.rmSync(P, { recursive: true, force: true });
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(P, { recursive: true });
fs.writeFileSync(path.join(P, 'pack.json'), JSON.stringify({ config: { dpr: 1, defaultViewport: { width: 1200, height: 800 }, explore: { timeBudgetSec: 60 }, motion: { sampleSec: 2, intervalMs: 250 } } }));
// the user name from .env, the password from the shell (UI_PASSWORD): the way that keeps it out of every file
const envFile = path.join(ROOT, 'test-results', 'ui-smoke.env');
fs.mkdirSync(path.dirname(envFile), { recursive: true });
fs.writeFileSync(envFile, 'USERNAME=admin\n');
const writerSaw = path.join(ROOT, 'test-results', 'ui-smoke-writer-env.txt');
fs.rmSync(writerSaw, { force: true });

const code = await new Promise((r) => {
  const p = spawn(process.execPath, [path.join(ROOT, 'scripts', 'ui.mjs'), PACK, '--yes', '--url', `http://localhost:${PORT}/Home/MyHome/`, '--menu', 'file transfer services',
    '--out', OUT, '--env', envFile, '--writer', `node ${path.join(ROOT, 'test', 'fake-writer.mjs')}`, '--rounds', '0', '--link-modules'], { cwd: ROOT, stdio: 'inherit', env: { ...process.env, UI_PASSWORD: PASSWORD, FAKE_WRITER_REPORT: writerSaw } });
  p.on('exit', r);
});
server.close();
assert.equal(code, 0, 'npm run ui failed');

const j = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const pack = j(path.join(P, 'pack.json'));
assert.equal(pack.menu, 'File Transfer Services', 'typed menu name should resolve to the real label');
assert.deepEqual(pack.screens.map((s) => s.id), ['home', 'file-transfer-configuration', 'file-transfer-tracking']);
assert.ok(pack.screens[1].url.endsWith('/FT/Config'), 'href item URL');
assert.ok(pack.screens[2].url.endsWith('/FT/Tracking'), `onclick-only item URL should come from the guarded click: ${pack.screens[2].url}`);
assert.ok(pack.screens.every((s) => s.scope === '#main'), `content area should be #main: ${pack.screens.map((s) => s.scope)}`);
const menu = j(path.join(P, 'menu.json'));
assert.deepEqual(menu.modules.map((m) => m.label), ['Administration', 'File Transfer Services', 'Claims Management']);
assert.deepEqual(menu.modules[0].children.map((c) => c.label), ['Users', 'Roles'], 'other modules are read too (the navbar needs them)');
const st = j(path.join(P, 'status.json')).items;
for (const s of pack.screens) for (const k of ['plan', 'spec']) assert.equal(st[`${k}:${s.id}`]?.status, 'done', `${k}:${s.id}: ${JSON.stringify(st[`${k}:${s.id}`])}`);
for (const s of pack.screens) assert.ok(st[`code:${s.id}`], `code:${s.id} should have run`);
const states = j(path.join(P, 'screens', 'file-transfer-configuration', 'explore', 'states.json'));
assert.ok(states.transitions.some((t) => JSON.stringify(t.effects).includes('Key file')), 'explore should find the field that appears for SFTP');
const homeStates = j(path.join(P, 'screens', 'home', 'explore', 'states.json'));
assert.ok(homeStates.transitions.some((t) => (t.effects.shown || []).some((x) => x.sel === '#drawer')), 'home explore should open the menu');
assert.deepEqual(menu.pictures, ['menu/administration.png', 'menu/file-transfer-services.png', 'menu/claims-management.png'], 'one flyout picture per module');
assert.ok(fs.existsSync(path.join(P, 'screens', 'home', 'menu', 'file-transfer-services.png')), 'flyout pictures go to the home screen folder for the spec');
assert.ok(fs.existsSync(path.join(P, 'screens', 'home', 'measure-00', 'measurements.json')), 'draw-ui baseline measured for pack screens too');
assert.ok(fs.readFileSync(path.join(OUT, 'src', 'shell', 'Page.tsx'), 'utf8').includes('{children}'), 'the shell keeps a slot for the screens');
assert.ok(!fs.readFileSync(path.join(OUT, 'src', 'screens', 'file-transfer-configuration', 'Page.tsx'), 'utf8').includes('hamburger'), 'a screen port holds no shell');
assert.match(fs.readFileSync(path.join(OUT, 'src', 'menu.ts'), 'utf8'), /"route": "\/file-transfer-configuration"/);
assert.ok(fs.existsSync(path.join(OUT, 'UI_BUILD_REPORT.md')));
// secrets: the writer never got the password, and neither it nor the session cookie is in any file the run wrote
assert.ok(fs.existsSync(writerSaw), 'the fake writer should have reported its environment');
assert.ok(!fs.readFileSync(writerSaw, 'utf8').includes('password'), `the writer must not get the password in its environment:\n${fs.readFileSync(writerSaw, 'utf8')}`);
assert.ok(!fs.existsSync(path.join(P, 'auth')), 'no session file on disk');
const leaks = [];
const scan = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isSymbolicLink()) continue; // the app's node_modules is a junction to this repo's
    if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); continue; }
    if (/\.(png|jpe?g|webp|gif|woff2?|ttf|ico)$/i.test(e.name)) continue;
    const t = fs.readFileSync(p, 'latin1');
    if (t.includes(PASSWORD) || t.includes('smoke-session-7f3a')) leaks.push(path.relative(ROOT, p));
  }
};
scan(P); scan(OUT);
assert.deepEqual(leaks, [], 'password or session cookie written to disk');
console.log('\nui smoke: OK');
