// npm run smoke:explore — stages 2-4 on a modern-looking page: 40 identical cards, CSS dropdown menus, accordion,
// tabs, a modal, and buttons covered by an overlay. Checks: the run stops at stage 3 for the plan; an agent plan is
// followed exactly; --auto folds look-alikes, still finds every interaction, and does not reload-storm.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = 4798, SCREEN = '_test-explore';
const cards = Array.from({ length: 40 }, (_, i) => `<div class="card"><h3>Product ${i + 1}</h3><button class="details">Details</button></div>`).join('');
const HTML = `<!doctype html><html><head><meta charset="utf-8"><title>explore fixture</title><style>
body{margin:0;font:16px Arial}
nav ul.top{list-style:none;margin:0;padding:0;display:flex;background:#123}
nav .top>li{position:relative;padding:12px 20px;color:#fff;cursor:pointer}
nav .top>li ul{display:none;position:absolute;left:0;top:44px;background:#fff;color:#000;list-style:none;padding:8px;margin:0;width:160px}
nav .top>li:hover ul{display:block}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:20px}
.card{border:1px solid #ccc;padding:12px;transition:box-shadow .2s}.card:hover{box-shadow:0 4px 12px rgba(0,0,0,.3)}
.details{background:#06c;color:#fff;border:0;padding:6px 12px}.details:hover{background:#048}
.acc button{display:block;width:100%;text-align:left;padding:8px}.panel{display:none;padding:8px;background:#eef}.panel.open{display:block}
[role=tab]{padding:8px 16px}[role=tab][aria-selected=true]{background:#06c;color:#fff}.tp{display:none;padding:8px}.tp.on{display:block}
#modal{display:none;position:fixed;top:100px;left:300px;width:300px;padding:20px;background:#fff;border:2px solid #000;z-index:20}
.covered{position:relative}.cover{position:absolute;inset:0;background:transparent;z-index:5}
</style></head><body>
<nav><ul class="top"><li>Shop<ul><li><a href="/a">Fruit</a></li><li><a href="/b">Veg</a></li></ul></li><li>Learn<ul><li><a href="/c">Guides</a></li></ul></li><li>Help<ul><li><a href="/d">Contact</a></li></ul></li></ul></nav>
<div class="acc"><button id="a1" aria-expanded="false" aria-controls="p1">Shipping</button><div class="panel" id="p1">Ships in 2 days</div>
<button id="a2" aria-expanded="false" aria-controls="p2">Returns</button><div class="panel" id="p2">30 day returns</div></div>
<div><button role="tab" id="t1" aria-selected="true">Overview</button><button role="tab" id="t2" aria-selected="false">Specs</button>
<div class="tp on" id="tp1">Overview text</div><div class="tp" id="tp2">Specs text</div></div>
<div style="padding:12px"><input type="search" id="q" placeholder="Search products"> <button id="openm">Open dialog</button></div>
<div id="modal" role="dialog">Hello from the dialog <button id="closem">Close</button></div>
<div style="padding:12px">${Array.from({ length: 6 }, (_, i) => `<span class="covered"><button class="ghost">Hidden ${i + 1}</button><i class="cover"></i></span>`).join(' ')}</div>
<div class="grid">${cards}</div>
<script>
for (const b of document.querySelectorAll('.acc button')) b.onclick=()=>{const p=document.getElementById(b.getAttribute('aria-controls'));const o=p.classList.toggle('open');b.setAttribute('aria-expanded',o)};
for (const t of document.querySelectorAll('[role=tab]')) t.onclick=()=>{for(const x of document.querySelectorAll('[role=tab]')){x.setAttribute('aria-selected',x===t)}document.getElementById('tp1').classList.toggle('on',t.id==='t1');document.getElementById('tp2').classList.toggle('on',t.id==='t2')};
openm.onclick=()=>{modal.style.display='block'};closem.onclick=()=>{modal.style.display='none'};
</script></body></html>`;

let pageLoads = 0;
const server = http.createServer((req, res) => {
  if (req.url === '/') pageLoads++;
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(HTML);
}).listen(PORT);

const dir = path.join(ROOT, 'screenshots', SCREEN, 'url');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'url.txt'), `http://localhost:${PORT}/\n`);
fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify({ motion: { sampleSec: 2, intervalMs: 250 }, defaultViewport: { width: 1000, height: 700 }, dpr: 1, explore: { timeBudgetSec: 120 } }));

// runs a script, echoes its output, resolves { code, text }
const node = (script, args) => new Promise((r) => {
  const p = spawn(process.execPath, [path.join(ROOT, 'scripts', script), SCREEN, ...args], { cwd: ROOT });
  let text = '';
  for (const s of [p.stdout, p.stderr]) s.on('data', (b) => { text += b; process.stdout.write(b); });
  p.on('exit', (code) => r({ code, text }));
});
const run = (args) => node('run.mjs', args);
const out = path.join(ROOT, 'outputs', SCREEN), ex = path.join(out, 'explore');
const readJ = (f) => JSON.parse(fs.readFileSync(path.join(ex, f), 'utf8'));
const planFile = path.join(ex, 'plan.json');

// stage 1 only
assert.equal((await run(['--skip', 'explore,selfcheck,spec', '--force'])).code, 0, 'capture steps failed');
fs.rmSync(planFile, { force: true });

// stages 2 -> stop at 3: survey written, nothing explored, the sentence for the agent printed
let r = await run([]);
assert.equal(r.code, 0, 'a run that stops for the plan is not a failure');
assert.match(r.text, /STOP HERE \(stage 3 of 5\)[\s\S]*plan the exploration for _test-explore/, 'the run must stop at stage 3 and say what to tell the agent');
for (const f of ['survey/survey.json', 'survey/candidates.md', 'survey/plan.suggested.json', 'survey/map/01.jpg']) assert.ok(fs.existsSync(path.join(ex, f)), `stage 2 must write explore/${f}`);
assert.ok(!fs.existsSync(path.join(ex, 'states.json')), 'nothing may be explored before the plan exists');
const sv = readJ('survey/survey.json');
const md = fs.readFileSync(path.join(ex, 'survey', 'candidates.md'), 'utf8');
const keyOf = (re, kind) => sv.elements.find((e) => re.test(e.label) && (!kind || e.kind === kind))?.key;
const shop = keyOf(/^Shop/), shipping = keyOf(/^Shipping$/, 'button'), search = sv.elements.find((e) => e.kind === 'text')?.key, specs = keyOf(/^Specs$/, 'button');
assert.ok(shop && shipping && search && specs, `survey must find the Shop dropdown, accordion, search box and tabs (${shop}, ${shipping}, ${search}, ${specs})`);
assert.ok(md.includes(`\`${shop}\``) && md.includes(`\`${shipping}\``), 'candidates.md must list them by key');
assert.ok(sv.elements.length > 40 && md.split('\n').filter((l) => /^\| \d+ \|/.test(l)).length < sv.elements.length / 2, 'candidates.md must fold the 40 look-alike cards');

// a bad plan is refused, with the reason
fs.writeFileSync(planFile, JSON.stringify({ hover: ['no-such-key'], actions: [] }));
r = await node('check-plan.mjs', []);
assert.equal(r.code, 1, 'check:plan must fail on an unknown key');
assert.match(r.text, /unknown key "no-such-key"/);

// the agent's plan: stage 4 does exactly that (and follows what it reveals), nothing else
fs.writeFileSync(planFile, JSON.stringify({
  hover: [{ key: shop, why: 'CSS dropdown' }],
  actions: [shipping, { key: search, value: 'apples', enter: true, why: 'search' }],
}));
assert.equal((await node('check-plan.mjs', [])).code, 0, 'check:plan must accept a valid plan');
r = await run([]);
assert.equal(r.code, 0, 'stage 4 with the agent plan failed');
let states = readJ('states.json');
let T = states.transitions;
const did = (re) => T.some((t) => re.test(JSON.stringify(t.action)));
assert.equal(states.plan.source, 'agent');
assert.ok(T.some((t) => t.action.a === 'hover' && /Fruit|Veg/.test(JSON.stringify(t.effects))), 'planned hover must open the Shop dropdown');
assert.ok(did(/Shipping/), 'planned accordion click must run');
assert.ok(JSON.stringify(states).includes('apples'), 'the planned search value must be typed');
assert.ok(!did(/Specs|Open dialog/), 'unplanned controls must not be explored');
assert.match(r.text, /STAGE 5\/5/, 'after stage 4 the run must stop for the spec');

// --auto: no plan -> the rule-based one, no stop
fs.rmSync(planFile);
const loadsBefore = pageLoads, t0 = Date.now();
r = await run(['--auto']);
assert.equal(r.code, 0, 'the --auto run failed');
const sec = (Date.now() - t0) / 1000, loads = pageLoads - loadsBefore;
server.close();
const plan = readJ('plan.json');
states = readJ('states.json');
T = states.transitions;
const has = (re) => T.some((t) => re.test(JSON.stringify(t.action)));
assert.equal(states.plan.source, 'auto');

// 1. look-alikes folded: 40 cards must not mean 40 hovers
assert.ok(plan.hover.length <= 25, `40 look-alike cards should fold into a few hovers (planned ${plan.hover.length} of ${sv.elements.length} elements)`);
// 2. every real interaction still found
assert.ok(states.hovers.some((h) => /Details/.test(h.label) && h.style && Object.keys(h.style).length), 'card button hover style should be captured');
assert.ok(T.some((t) => /Fruit|Veg/.test(JSON.stringify(t.effects)) && t.action.a === 'hover'), 'CSS dropdown "Shop" should be found by hover');
assert.ok(T.some((t) => /Guides|Contact/.test(JSON.stringify(t.effects))), 'the other dropdowns (same group, different content) must not be folded away');
assert.ok(has(/Shipping/) && has(/Returns/), 'both accordion triggers must be tested (aria-expanded triggers are never folded)');
assert.ok(has(/Specs/), 'tab switch should be found');
assert.ok(has(/Open dialog/) && T.some((t) => /dialog/i.test(JSON.stringify(t.effects))), 'modal open should be found');
// 3. speed + no reload storm: 6 covered buttons used to cost one reload each
const rl = states.limits.reloads;
assert.ok(rl.hover <= 3, `hover phase reloaded ${rl.hover} times (covered/unhoverable buttons and open dropdowns must not force reloads)`);
assert.ok(loads <= 20, `explore loaded the page ${loads} times`);
assert.equal(states.limits.queueLeft, 0, 'every planned action should have run');
assert.ok(states.limits.ms < 90000, `explore took ${(states.limits.ms / 1000).toFixed(0)}s`);
console.log(`\nexplore smoke OK: stop at stage 3 ✓, agent plan followed ✓, --auto: ${sv.elements.length} elements -> ${plan.hover.length} hovers, ${T.length} behaviors, ${states.hovers.length} hover styles, ${loads} page loads, ${sec.toFixed(0)}s`);
