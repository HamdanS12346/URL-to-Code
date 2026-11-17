// npm run smoke:flows — the flows stage (scripts/flows.mjs) on the local Provider-style portal's FlowsLab page (real Kendo UI):
//   it walks Search -> row View (a window) -> Edit (a part of it) and a destination (a window in the window), and Create New (a window),
//   to the end of every branch; it never sends a write (the server counts them: none may arrive); Save / Delete are never clicked;
//   Continue and Refresh Cache end as boundaries (their write blocked); the fields are measured (a digits-only box, a length limit);
//   a planner's plan goes through the gate (a plan naming a Delete is refused); a re-run continues from flows/index.json;
//   the merge adds the new windows to kit/screen.json, the clicks to its "flows" and a check per state to kit/states.json.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startProviderPortal } from './provider-portal/server.mjs';
import { runFlows } from '../scripts/flows.mjs';
import { checkPlan, checkPlanFile } from '../scripts/check-flows.mjs';
import { loadKit } from '../scripts/lib/kit.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
for (const m of ['kendo-ui-core', 'jquery', '@progress/kendo-theme-default'])
  if (!fs.existsSync(path.join(ROOT, 'node_modules', m))) { console.error(`flows smoke needs ${m} (an optional dependency of this repo): npm install ${m}`); process.exit(2); }
const PORT = 4799, COOKIE = 'sid=flows-session-7q';
const server = startProviderPortal(PORT, { password: 'x', cookie: COOKIE });
const OUT = path.join(ROOT, 'test-results', 'flows-smoke');
for (const d of ['flows', 'kit']) fs.rmSync(path.join(OUT, d), { recursive: true, force: true }); // not OUT itself: an open Explorer window locks it on Windows
fs.mkdirSync(path.join(OUT, 'kit'), { recursive: true });
// the capture's kit data, as small as a merge needs it
fs.writeFileSync(path.join(OUT, 'kit', 'screen.json'), JSON.stringify({ widgets: {}, grids: {}, dialogs: {}, search: null, row: null, links: [] }));
fs.writeFileSync(path.join(OUT, 'kit', 'states.json'), JSON.stringify([{ name: 'search', steps: [] }]));

const url = `http://localhost:${PORT}/FileTransfer/FlowsLab`;
const cfg = { defaultViewport: { width: 1400, height: 900 }, dpr: 1, mode: 'safe', kit: { scope: '#mainContent', module: 'File Transfer Services' },
  auth: { storageState: { cookies: [{ name: 'sid', value: 'flows-session-7q', domain: 'localhost', path: '/', expires: -1, httpOnly: false, secure: false, sameSite: 'Lax' }], origins: [] } } };
const kit = await loadKit('provider');
const browser = await chromium.launch();
const log = (m) => console.log(`  ${m}`);
let planned = 0;
// a planner that answers like the writer would: the wave's rules plan, through the same gate ui.mjs uses
const planner = async ({ file, frontierFile }) => {
  planned++;
  fs.copyFileSync(file.replace(/\.json$/, '.suggested.json'), file);
  return checkPlanFile(file, frontierFile).length === 0;
};
const t0 = Date.now();
try {
  const r = await runFlows({ browser, cfg, url, out: OUT, kit, log, planner, budget: { workers: 2, maxNodes: 30, timeBudgetSec: 600 }, fresh: true, scope: '#mainContent' });
  console.log(`flows: ${JSON.stringify(r)} in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  const G = JSON.parse(fs.readFileSync(path.join(OUT, 'flows', 'index.json'), 'utf8'));
  const nodes = Object.values(G.nodes), titles = nodes.filter((n) => n.kind === 'dialog').map((n) => n.title);

  // ---- safety: nothing written, commits never clicked, the writes that were tried are boundaries ----
  assert.deepEqual(server.writes, [], `writes reached the server: ${server.writes.join(', ')}`);
  const tried = nodes.flatMap((n) => (n.tried || []).map((t) => t.text));
  for (const w of ['Save', 'Delete Destination']) assert.ok(!tried.includes(w), `"${w}" must never be clicked by a plan`);
  assert.ok(nodes.some((n) => n.skipped?.some((s) => s.text === 'Delete Destination')), 'Delete Destination is listed as never clicked');
  const bounds = nodes.filter((n) => n.kind === 'boundary').flatMap((n) => n.requests.map((q) => `${q.method} ${q.url}`));
  assert.ok(bounds.includes('POST /FileTransfer/AddLab'), `Continue in Add Lab is a boundary (got ${bounds.join(', ')})`);
  assert.ok(bounds.includes('GET /FileTransfer/DeleteCache'), `Refresh Cache (a GET that deletes) is a boundary (got ${bounds.join(', ')})`);

  // ---- depth: every branch walked ----
  assert.ok(nodes.some((n) => n.kind === 'results'), 'Search -> results');
  for (const t of ['Add Lab', 'View Lab', 'Destination Detail']) assert.ok(titles.includes(t), `window "${t}" reached (got ${titles.join(', ')})`);
  const view = nodes.find((n) => n.title === 'View Lab'), dest = nodes.find((n) => n.title === 'Destination Detail');
  assert.ok(dest.id.startsWith(`${view.id}.`), `the destination window is a state under View Lab (${dest.id} under ${view.id})`);
  const edit = nodes.find((n) => n.parent === view.id && n.kind === 'part');
  assert.ok(edit, 'Edit shows a part of View Lab');
  assert.ok(edit.change?.show?.some((s) => s.includes('labEdit')), `the part is #labEdit (${JSON.stringify(edit.change)})`);
  assert.equal(nodes.filter((n) => n.status === 'frontier').length, 0, 'nothing left open');

  // ---- probes ----
  const code = edit.fields?.find((f) => f.name === 'LabCode');
  assert.ok(code && code.accepts.digits && !code.accepts.letters, `LabCode keeps digits only (${JSON.stringify(code)})`);
  const nm = edit.fields?.find((f) => f.name === 'LabEditName');
  assert.ok(nm && nm.maxLength === 10 && nm.maxEnforced, `LabEditName stops at 10 (${JSON.stringify(nm)})`);
  assert.ok(edit.saveProbe?.wouldSend?.some((q) => q.url === '/FileTransfer/SaveLab'), `Save with writes blocked would send SaveLab (${JSON.stringify(edit.saveProbe)})`);

  // ---- files ----
  for (const n of nodes) assert.ok(fs.existsSync(path.join(OUT, 'flows', n.dir, 'shot.png')), `${n.dir}/shot.png`);
  assert.ok(fs.existsSync(path.join(OUT, 'flows', view.dir, 'map.png')) && fs.existsSync(path.join(OUT, 'flows', view.dir, 'layer.html')), 'a window has its map and markup');
  const md = fs.readFileSync(path.join(OUT, 'flows', 'FLOWS.md'), 'utf8');
  assert.ok(md.includes(`**${dest.id}**`) && md.includes('boundary'), 'FLOWS.md lists the tree');
  assert.ok(planned >= 2 && G.planners.every((p) => p === 'ai'), `every wave planned through the planner + gate (${G.planners})`);

  // ---- the gate refuses a commit ----
  const fr = JSON.parse(fs.readFileSync(path.join(OUT, 'flows', 'plans', 'wave-1.frontier.json'), 'utf8'));
  const n0 = fr.nodes[0], search = n0.candidates.find((c) => c.text === 'Search');
  assert.deepEqual(checkPlan({ nodes: [{ node: n0.node, actions: [{ el: search.el, do: 'click' }] }] }, fr.nodes), []);
  const destFront = { node: 'x', candidates: [{ el: 'e1', kind: 'button', text: 'Delete Destination', danger: 'commit' }] };
  assert.ok(checkPlan({ nodes: [{ node: 'x', actions: [{ el: 'e1', do: 'click' }] }] }, [destFront]).some((e) => /never clicked/.test(e)), 'a plan naming Delete is refused');
  assert.ok(checkPlan({ nodes: [] }, [destFront]).some((e) => /no entry/.test(e)), 'every open state needs an entry');

  // ---- the merge into the kit ----
  const ks = JSON.parse(fs.readFileSync(path.join(OUT, 'kit', 'screen.json'), 'utf8'));
  const flowDialogs = Object.entries(ks.dialogs).filter(([, d]) => d.flow);
  assert.ok(flowDialogs.length >= 3, `the windows are kit dialogs (${flowDialogs.map(([id, d]) => `${id} ${d.title}`).join(', ')})`);
  for (const [id] of flowDialogs) assert.ok(fs.existsSync(path.join(OUT, 'kit', 'dialogs', `${id}.html`)), `kit/dialogs/${id}.html`);
  const destDlg = flowDialogs.find(([, d]) => d.title === 'Destination Detail');
  assert.equal(destDlg[1].parent, flowDialogs.find(([, d]) => d.title === 'View Lab')[0], 'the destination dialog sits in View Lab');
  assert.ok(ks.flows.some((f) => f.opens === destDlg[0] && f.from), 'a click inside View Lab opens the destination dialog');
  assert.ok(ks.flows.some((f) => f.show?.length && f.from), 'Edit shows its part');
  const st = JSON.parse(fs.readFileSync(path.join(OUT, 'kit', 'states.json'), 'utf8'));
  assert.ok(st.some((s) => s.name === 'search') && st.some((s) => s.name === `flow-${dest.id}`), 'states: the capture\'s kept, one per flow state added');
  const again = await kit.flows.merge({ out: OUT, graph: G, scope: '#mainContent' });
  assert.equal(Object.values(JSON.parse(fs.readFileSync(path.join(OUT, 'kit', 'screen.json'), 'utf8')).dialogs).filter((d) => d.flow).length, flowDialogs.length, `a second merge adds nothing twice (${JSON.stringify(again)})`);

  // ---- a re-run continues (nothing left: no new wave, same states) ----
  const r2 = await runFlows({ browser, cfg, url, out: OUT, kit, log, planner, budget: { workers: 1, maxNodes: 30, timeBudgetSec: 120 }, fresh: false, scope: '#mainContent' });
  assert.equal(r2.states, r.states, 'a re-run keeps the graph');
  console.log(`flows smoke: OK (${r.states} states, ${r.boundaries} boundaries, ${r.dialogs} windows, ${((Date.now() - t0) / 1000).toFixed(0)}s)`);
} finally {
  await browser.close();
  server.close();
}
