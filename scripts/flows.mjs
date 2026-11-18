// The flows stage: explore one captured screen as deep as it goes, up to the click that would save or create something.
//   state (node) --plan (AI or rules)--> actions --Playwright--> what each did --> new states --> plan again ... until every branch is a dead end
// A node is a state of the screen (the page at rest, the results, a dialog, a dialog in a dialog, an edit mode, a shown part), told apart
// by a fingerprint of what the top layer shows (not its data). Each node gets a folder with its picture, a numbered map of what can be
// clicked or typed (the planner reads it), the window's markup, the validation its fields show, and what was tried from it.
//   flows/index.json       the graph (nodes, what each action did), also what a re-run continues from
//   flows/FLOWS.md         the tree, readable; flows/plans/wave-N.json the plans
//   flows/<id>-<name>/     node.json, shot.png, map.png, candidates.md/.json, layer.html + window.json (a window)
// Ids carry the hierarchy (n1.2.1 = the 1st state reached from n1.2): flat folders, short paths (Windows).
// Safety (scripts/lib/safety.mjs): commit buttons are never clicked; every write is blocked; a click that tries one is a "boundary" leaf.
// Site knowledge comes from the kit (kit.flows: ready, wait, window, closeTop, marks, changed, validation, pick, enrich, allow, rowVia, sweep, confirm, merge).
// Besides the plan's actions, every window / part state gets the checks no planner has to think of: what each radio / checkbox / dropdown
// value shows (sweep), where each way out lands (exits: the X, Close, Cancel...), and what a way out does with an edit in the form (dirtyExit:
// the "form data has changed" window and where its answers land). They run while the planner plans the next wave.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { openPage, samePage } from './lib/browser.mjs';
import { COMMIT, danger, isWritePath, requestPolicy } from './lib/safety.mjs';
import { checkPlan, DO } from './check-flows.mjs';

const INPAGE = fs.readFileSync(new URL('./lib/flows-inpage.js', import.meta.url), 'utf8');
export const DEFAULTS = { maxNodes: 40, maxDepth: 6, maxWaves: 6, maxActions: 12, timeBudgetSec: 1500, workers: 2, probeFields: 8, saveProbe: true, settleMs: 300, ai: true, allow: [],
  sweep: true, exitProbe: true, dirtyProbe: true, recorder: true };
const readJson = (f, d = null) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, o) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1)); };
const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32) || 'state';
const md5 = (s) => crypto.createHash('md5').update(s).digest('hex').slice(0, 12);
const lines = (t) => Object.fromEntries(String(t).split('\n').map((l) => [l.slice(0, 1), l.slice(2)]));
const ASSET = /\.(js|css|png|gif|svg|jpe?g|woff2?|ttf|ico)(\?|$)/i;
const BACK = /^(reset|clear|cancel|close|back|x|×|no)$/i; // leads back to where it was: the undo, not a new state

// the steps of a candidate: what the engine replays and what the rebuild's checks replay
export const stepOf = (c, act = {}) => ({ do: act.do || 'click', layer: c.layer, css: c.css, nth: c.nth, text: c.text, ...(act.value !== undefined ? { value: String(act.value) } : {}), kind: c.kind });

// What the rules would do from each node, when there is no planner or its plan does not pass the gate: every button, link, tab and
// first row of the top layer once (not the commit ones, not the ones that only lead back), radios and checkboxes below the page
export function rulePlan(nodes, B, rowVia = null) {
  const rank = (c) => (c.kitAction === 'create' ? 0 : c.kitAction === 'search' ? 1 : c.kind === 'row' ? 2 : c.kind === 'tab' ? 3 : c.kind === 'button' ? 4 : c.kind === 'link' ? 5 : 6);
  return {
    source: 'rules',
    nodes: nodes.map((n) => {
      const cands = (n.candidates || []).filter((c) => !c.danger && !BACK.test(c.text || '') && !['reset', 'cancel', 'close', 'collapse', 'menu', 'menu-close'].includes(c.kitAction)
        && (['button', 'link', 'tab', 'row'].includes(c.kind) || (n.id !== 'n0' && ((c.kind === 'radio' && !c.checked) || c.kind === 'check'))));
      const actions = [], rowLink = cands.some((c) => c.inRow && ['link', 'button'].includes(c.kind));
      for (const c of cands.sort((a, b) => rank(a) - rank(b))) {
        if (c.kind === 'row') {
          if (rowLink) continue; // the row's own link opens it: clicking the row too only reaches the same state again
          if (rowVia !== 'dblclick') actions.push({ el: c.el, do: 'click', why: 'opens the row (the other rows are the same)' });
          if (rowVia !== 'click') actions.push({ el: c.el, do: 'dblclick', why: 'the portal opens a row on double-click' });
        } else actions.push({ el: c.el, do: 'click', why: `${c.kind} "${c.text || c.label || c.el}"` });
      }
      const a = actions.slice(0, B.maxActions);
      return a.length ? { node: n.id, actions: a } : { node: n.id, deadEnd: true, reason: 'nothing left to click that is not a commit or a way back' };
    }),
  };
}

function flowsMd(G) {
  const kids = (id) => Object.values(G.nodes).filter((n) => n.parent === id).sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  const out = [`# Flows of ${G.url}`, '', `${Object.keys(G.nodes).length} states (${Object.values(G.nodes).filter((n) => n.kind === 'boundary').length} boundaries), ${G.waves} wave(s), plans by ${[...new Set(G.planners)].join(', ') || '-'}. ${G.at}`,
    '', 'Each state: its id (cite it in the spec as [flow:<id>]), kind, how it was reached, status. A **boundary** is where the live page would have sent a write (blocked): the flow ends there.',
    'Folders: `<id>-<name>/` with shot.png, map.png (numbered), node.json (fields: what each text box accepts and the messages it shows; saveProbe: what Save shows with writes blocked), layer.html.', ''];
  const walk = (n, d) => {
    const via = n.via ? ` via ${n.via.steps.map((s) => `${s.do} "${s.text || s.css}"${s.value !== undefined ? `="${s.value}"` : ''}`).join(' > ')}` : '';
    const extra = n.kind === 'boundary' ? `: would send ${(n.requests || []).map((r) => `${r.method} ${r.url}`).join(', ')}` : n.title ? ` "${n.title}"` : '';
    out.push(`${'  '.repeat(d)}- **${n.id}** ${n.name} (${n.kind})${extra}${via} - ${n.status}${n.reason ? ` (${n.reason})` : ''} [shot](${n.dir}/shot.png)`);
    const notes = (n.tried || []).filter((t) => !t.child).map((t) => `${t.el} "${t.text}" ${t.do} -> ${t.outcome}`);
    if (notes.length) out.push(`${'  '.repeat(d + 1)}- tried: ${notes.join('; ')}`);
    if (n.skipped?.length) out.push(`${'  '.repeat(d + 1)}- never clicked: ${n.skipped.map((s) => `"${s.text}" (${s.why})`).join('; ')}`);
    for (const f of n.fields || []) out.push(`${'  '.repeat(d + 1)}- field ${f.label || f.name}: accepts ${Object.entries(f.accepts).filter(([, v]) => v).map(([k]) => k).join(', ') || 'nothing typed'}${f.maxLength ? `, max ${f.maxLength}${f.maxEnforced ? ' (stops typing)' : ''}` : ''}${Object.entries(f.messages || {}).map(([k, v]) => `; ${k}: "${v}"`).join('')}`);
    const shownUp = (a) => (a || []).map((x) => `"${x.text.slice(0, 80)}"${x.stays ? '' : ` (gone after ${x.ms} ms)`}`).join(', ');
    if (n.saveProbe) out.push(`${'  '.repeat(d + 1)}- Save with writes blocked ("${n.saveProbe.button}"): ${n.saveProbe.validation ? `${n.saveProbe.validation.summaries.length} banner(s)${n.saveProbe.validation.summaries.length ? ` ("${n.saveProbe.validation.summaries[0].text.slice(0, 80)}")` : ''}, ${n.saveProbe.validation.fields.length} field message(s)` : 'no message'}${n.saveProbe.wouldSend?.length ? `; would send ${n.saveProbe.wouldSend.map((r) => `${r.method} ${r.url}`).join(', ')}` : ''}${n.saveProbe.appeared?.length ? `; showed ${shownUp(n.saveProbe.appeared)}` : ''}`);
    for (const t of (n.tried || []).filter((x) => x.appeared?.length)) out.push(`${'  '.repeat(d + 1)}- ${t.do} "${t.text}" showed ${shownUp(t.appeared)}`);
    if (n.conditionals?.length) out.push(`${'  '.repeat(d + 1)}- swept: ${n.conditionals.map((c) => `${c.kind} ${c.name} (${Object.keys(c.values).join(' / ')}) shows/hides ${Object.keys(c.rest).length} part(s)`).join('; ')}`);
    if (n.exits?.length) out.push(`${'  '.repeat(d + 1)}- ways out: ${n.exits.map((x) => `${x.via === 'x' ? 'X' : `"${x.text}"`} -> ${x.error ? `error ${x.error}` : x.opens ? `opens "${x.opens}"` : x.lands ?? `${x.windows} window(s) open`}${x.closed > 1 ? ` (closes ${x.closed} windows)` : ''}`).join('; ')}`);
    for (const de of n.dirtyExits ?? (n.dirtyExit ? [n.dirtyExit] : [])) out.push(`${'  '.repeat(d + 1)}- with an edit${de.edit ? ` (${de.edit})` : ''}, ${de.via === 'x' ? 'X' : `"${de.text}"`} ${de.error ? `error ${de.error}` : de.asks ? `asks "${de.confirm?.title ?? '?'}" (${(de.confirm?.buttons ?? []).map((b) => `${b.text}${b.answer ? `=${b.answer}` : ''}`).join(' / ')}): stay -> ${de.stay?.lands ?? '?'}, leave -> ${de.leave?.lands ?? '?'}${de.leave?.closed > 1 ? ` (closes ${de.leave.closed} windows)` : ''}` : `does not ask (closes ${de.closed ?? '?'} window(s))`}`);
    for (const k of kids(n.id)) walk(k, d + 1);
  };
  if (G.nodes.n0) walk(G.nodes.n0, 0);
  return out.join('\n') + '\n';
}

// ctx: { browser, cfg (with the session), url, out (screen folder), kit, log, planner, budget, fresh, scope }
// planner({ wave, file, frontierFile }) -> true when it wrote a plan that passes the gate; null/false: the rules plan
export async function runFlows({ browser, cfg, url, out, kit = null, log = console.log, planner = null, budget = {}, fresh = false, scope = null }) {
  const B = { ...DEFAULTS, ...budget };
  const K = kit?.flows ?? {};
  const dir = path.join(out, 'flows'), idx = path.join(dir, 'index.json');
  if (fresh) fs.rmSync(dir, { recursive: true, force: true });
  const G = readJson(idx) ?? { url, at: new Date().toISOString(), waves: 0, planners: [], nodes: {} };
  const byHash = new Map(Object.values(G.nodes).filter((n) => n.fp).map((n) => [n.fp, n.id]));
  const save = () => { G.at = new Date().toISOString(); writeJson(idx, G); fs.writeFileSync(path.join(dir, 'FLOWS.md'), flowsMd(G)); };
  let deadline = Date.now() + B.timeBudgetSec * 1000; // moved on by the time the planner takes: the budget is the browser's
  const timeUp = () => Date.now() > deadline;
  const pol = requestPolicy({ allow: K.allow?.(out) ?? new Set(), extra: B.allow });
  const rowVia = K.rowVia?.(out) ?? null;
  const viewport = cfg.defaultViewport, dpr = cfg.dpr ?? 1;

  // ---------- a worker: one browser context on the screen ----------
  const workers = [];
  const openWorker = async () => {
    const s = await openPage(browser, cfg, { url, viewport, dpr });
    Object.assign(s.guard, { allowPost: false, allow: null, policy: pol.policy, blockGet: pol.blockGet });
    await s.context.addInitScript({ content: INPAGE });
    const w = { s, page: s.page, at: null };
    workers.push(w);
    return w;
  };
  const load = async (w) => {
    await w.s.load({ idleMs: 3000, quietMax: 6000 });
    if (!samePage(new URL(w.page.url()), new URL(url))) throw new Error(`the page redirected to ${w.page.url().slice(0, 120)} (logged out?)`);
    await w.page.evaluate(INPAGE);
    await K.ready?.({ page: w.page, cfg, scope });
    w.at = 'n0';
  };
  const fp = async (w) => { const t = await w.page.evaluate((sc) => window.__xp.fp(sc), scope); return { text: t, hash: md5(t) }; };
  const near = (a, b) => { const x = lines(a), y = lines(b); return x.W === y.W && x.H === y.H; }; // the same windows and headings: the same state, other data
  const wait = async (w) => {
    await w.s.settle(B.settleMs, 6000).catch(() => {});
    if (K.wait) await K.wait({ page: w.page, s: w.s }).catch(() => {}); else await w.page.waitForTimeout(500);
  };
  const quiet = (w) => w.page.evaluate(() => window.__xp.quiet(300, 2500)).catch(() => 0);
  const doStep = async (w, st) => {
    if (st.do === 'key') { await w.page.keyboard.press(st.value || 'Escape'); return; }
    const r = await w.page.evaluate(([x, sc]) => window.__xp.resolve(x, sc), [st, scope]);
    if (!r.ok) throw new Error(r.why);
    const loc = w.page.locator('[data-xp-hit]').first(), o = { timeout: 5000 };
    switch (st.do) {
      case 'dblclick': await loc.dblclick(o); break;
      case 'hover': await loc.hover(o); break;
      case 'fill': await loc.fill(st.value ?? '', o); await loc.evaluate((e) => e.blur()).catch(() => {}); break;
      case 'press': await loc.press(st.value || 'Enter', o); break;
      case 'check': await loc.setChecked(st.value !== 'false', o); break;
      case 'select':
        if (st.kind === 'select') await loc.selectOption(st.value, o);
        else if (!(await K.pick?.({ page: w.page, value: st.value }))) { // no kit: open it and click the option with that text
          await loc.click(o);
          await w.page.locator('.k-list-item, [role=option], li').filter({ hasText: st.value }).first().click(o);
        }
        break;
      default: await loc.click(o);
    }
  };
  const reach = async (w, n) => {
    if (w.at === n.id) return true;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await load(w);
        for (const st of n.path) { await doStep(w, st); await wait(w); }
        await quiet(w);
        const f = await fp(w);
        if (f.hash === n.fp || near(f.text, n.fpText)) { w.at = n.id; return true; }
        n.drift = `replayed to another state (${lines(f.text).W || 'page'} / ${lines(f.text).H.slice(0, 80)})`;
      } catch (e) { if (/redirected/.test(e.message)) throw e; n.drift = e.message.split('\n')[0].slice(0, 160); }
    }
    w.at = null;
    return false;
  };
  const shot = async (w, f, full) => {
    await w.page.screenshot({ path: f, animations: 'disabled', caret: 'hide', fullPage: !!full }).catch(() => {});
  };

  // ---------- a new node: picture, map, what it offers ----------
  const harvest = async (w, n) => {
    const nd = path.join(dir, n.dir);
    fs.mkdirSync(nd, { recursive: true });
    await quiet(w); // a window's own script may still be setting it up (the radio of its record, the parts that go with it)
    const lay = await w.page.evaluate((sc) => window.__xp.layer(sc), scope);
    n.windows = lay.windows;
    if (lay.top && n.kind === 'dialog' && K.window) {
      const d = await K.window({ page: w.page }).catch(() => null);
      if (d) { fs.writeFileSync(path.join(nd, 'layer.html'), d.contentHtml ?? ''); const { contentHtml, ...rest } = d; writeJson(path.join(nd, 'window.json'), rest); n.title ||= rest.title; }
    }
    n.title ||= lay.title;
    await shot(w, path.join(nd, 'shot.png'), !lay.top);
    let cands = await w.page.evaluate(([sc, max]) => window.__xp.collect(sc, max), [scope, 60]);
    if (K.enrich) cands = await K.enrich({ page: w.page, candidates: cands }).catch(() => cands);
    for (const c of cands) { const why = danger(c, K.danger); if (why) c.danger = why; }
    n.candidates = cands;
    await w.page.evaluate(() => window.__xp.overlay(true));
    await shot(w, path.join(nd, 'map.png'), false);
    await w.page.evaluate(() => window.__xp.overlay(false));
    writeJson(path.join(nd, 'candidates.json'), cands);
    fs.writeFileSync(path.join(nd, 'candidates.md'), `# ${n.id} ${n.name}: what can be done here (${lay.top ? `top window "${lay.title}"` : 'the page'})\n\n` +
      'Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.\n\n| el | kind | text / label | id / name | rules / options | note |\n|---|---|---|---|---|---|\n' +
      cands.map((c) => `| ${c.el} | ${c.kind} | ${(c.text || c.label || '').replace(/\|/g, '/')}${c.label && c.text ? ` / ${c.label}` : ''} | ${[c.id, c.name].filter(Boolean).join(' / ')} | ${c.rules ? JSON.stringify(c.rules).replace(/\|/g, '/') : c.options ? c.options.join(', ') : ''} | ${[c.danger ? `danger: ${c.danger}` : '', c.kitAction ? `kit: ${c.kitAction}` : '', c.rows ? `${c.rows} rows` : '', c.checked ? 'checked' : ''].filter(Boolean).join('; ')} |`).join('\n') + '\n');
    n.validation = (await K.validation?.({ page: w.page }).catch(() => null)) ?? null;
    writeJson(path.join(nd, 'node.json'), { ...n, candidates: undefined });
  };
  const newNode = (parent, extra) => {
    parent.kids = (parent.kids || 0) + 1;
    const id = parent.id === 'n0' ? `n${parent.kids}` : `${parent.id}.${parent.kids}`;
    const n = { id, parent: parent.id, depth: parent.depth + 1, status: 'frontier', ...extra };
    n.dir = `${id}-${n.name}`;
    G.nodes[id] = n;
    if (n.fp) byHash.set(n.fp, id);
    return n;
  };

  // ---------- probes: what each text box accepts and says, and what Save says with every write blocked ----------
  // the same form in another state (Add and Edit, Run Weekly and Run Monthly): its fields are measured once
  const fieldCache = (G.fieldCache ||= {});
  const probe = async (w, n) => {
    if (n.probed) return;
    n.probed = true;
    const fields = (n.candidates || []).filter((c) => c.kind === 'text' && c.name).slice(0, B.probeFields);
    const fkey = md5(JSON.stringify(fields.map((c) => [c.name, c.label, c.rules])));
    n.fields = [];
    if (fields.length && fieldCache[fkey]) { n.fields = structuredClone(fieldCache[fkey]); n.fieldsFrom = 'cache'; }
    for (const c of n.fieldsFrom ? [] : fields) {
      if (timeUp()) break;
      try {
        const st = stepOf(c), msg = () => w.page.evaluate((nm) => window.__xp.fieldMsg(nm), c.name);
        const r = await w.page.evaluate(([x, sc]) => window.__xp.resolve(x, sc), [st, scope]);
        if (!r.ok) continue;
        const loc = w.page.locator('[data-xp-hit]').first();
        const orig = await loc.inputValue();
        const type = async (v) => { await loc.fill(''); await loc.pressSequentially(v, { delay: 5 }); const got = await loc.inputValue(); await loc.evaluate((e) => e.blur()); await w.page.waitForTimeout(250); return got; };
        const f = { name: c.name, label: c.label, messages: {} };
        const got = await type('Ab1 !@#.-');
        f.accepts = { letters: /[A-Za-z]/.test(got), digits: /\d/.test(got), spaces: / /.test(got), symbols: /[!@#.-]/.test(got) };
        f.kept = got;
        if (f.accepts.letters || f.accepts.digits) { const m = await msg(); if (m) f.messages.mixed = m; }
        const max = +(c.rules?.maxlength || c.rules?.['length-max'] || 0);
        if (max > 0 && max <= 120) {
          const g = await type('x'.repeat(max + 1));
          f.maxLength = max;
          f.maxEnforced = g.length <= max;
          const m = await msg(); if (m) f.messages.tooLong = m;
        }
        if (c.rules?.email) { await type('not-an-email'); const m = await msg(); if (m) f.messages.badEmail = m; }
        if (c.rules?.regex || c.rules?.pattern) { await type('~~~'); const m = await msg(); if (m) f.messages.badFormat = m; }
        if (c.rules?.required) { await type(''); const m = await msg(); if (m) f.messages.empty = m; }
        await loc.fill(orig).catch(() => {});
        await loc.evaluate((e) => e.blur()).catch(() => {});
        n.fields.push(f);
      } catch { /* a field that went away: the next one */ }
    }
    if (n.fields.length && !n.fieldsFrom) { w.at = null; fieldCache[fkey] = n.fields; } // typed into: the next action starts from a clean page
    // nothing at all may be written while a check presses Save, a way out, or the answer of a confirm
    const sealed = async (fn) => {
      const g = w.s.guard, keep = { policy: g.policy, blockGet: g.blockGet };
      g.policy = () => false;
      g.blockGet = (m, u) => m === 'GET' && isWritePath(u.pathname);
      try { return await fn(g); } finally { Object.assign(g, keep); w.at = null; }
    };
    const save = B.saveProbe && (n.candidates || []).find((c) => c.danger && (c.kitAction === 'save' || /^(save|submit|update)\b/i.test(c.text || '')));
    if (save && !timeUp() && await reach(w, n)) {
      await sealed(async (g) => {
        const e0 = g.events.length;
        try {
          if (B.recorder) await w.page.evaluate(() => window.__xp.arm()).catch(() => {});
          await doStep(w, stepOf(save));
          await w.page.waitForTimeout(1200);
          await wait(w);
          const v = (await K.validation?.({ page: w.page }).catch(() => null)) ?? null;
          const appeared = B.recorder ? await w.page.evaluate(() => window.__xp.appeared()).catch(() => []) : [];
          n.saveProbe = { button: save.text, validation: v, appeared, wouldSend: g.events.slice(e0).filter((e) => e.status === 'blocked').map((e) => ({ method: e.method, url: e.url.replace(/^https?:\/\/[^/]+/, '').split('?')[0], fields: e.post && typeof e.post === 'object' ? Object.keys(e.post) : [] })) };
          await shot(w, path.join(dir, n.dir, 'save-probe.png'), false);
        } catch (e) { n.saveProbe = { button: save.text, error: e.message.split('\n')[0] }; }
      });
    }
    const inWindow = (n.windows ?? 0) > 0 && ['dialog', 'part'].includes(n.kind);
    // the radios / checkboxes / dropdown values of a window or a part: what each value shows and hides (the rebuild sets the parts from the value)
    if (B.sweep && K.sweep && !n.conditionals && ['dialog', 'part'].includes(n.kind) && !timeUp() && await reach(w, n)) {
      n.conditionals = await K.sweep({ page: w.page, where: inWindow ? 'dialog' : 'page' }).catch(() => []);
      w.at = null;
    }
    // where each way out of a window lands: the state it goes back to, or how many windows it closes (an Edit opened from a View may close both)
    if (B.exitProbe && inWindow && !n.exits && !timeUp() && await reach(w, n)) {
      // the X and the buttons named like a way back, then up to two others that are not a commit, open nothing outside, and do not download
      const all = await w.page.evaluate(() => window.__xp.exits()).catch(() => []);
      const list = [...all.filter((e) => !e.other), ...all.filter((e) => e.other && !danger({ text: e.text }, K.danger) && !/browse|upload|download|export|print|help/i.test(e.text)).slice(0, 2)].slice(0, 5);
      n.exits = [];
      for (const ex of list) {
        if (timeUp() || !(await reach(w, n))) break;
        n.exits.push(await sealed(async () => {
          const r = { via: ex.via, text: ex.text, step: ex };
          try {
            await doStep(w, ex);
            await wait(w);
            await quiet(w);
            const nw = await w.page.evaluate(() => window.__xp.windows());
            const f = await fp(w);
            Object.assign(r, { windows: nw, closed: (n.windows ?? 0) - nw, lands: f.hash === n.fp ? n.id : byHash.get(f.hash) ?? (nw === 0 ? 'page' : null) });
            if (nw > (n.windows ?? 0)) r.opens = (await w.page.evaluate((sc) => window.__xp.layer(sc), scope)).title;
          } catch (e) { r.error = e.message.split('\n')[0].slice(0, 120); }
          return r;
        }));
      }
      // with an edit in the form: does the way out ask first ("form data has changed")? Its window, and where each of its answers lands.
      // The X and the first Close / Cancel each: a portal's form may ask on one and not the other
      // the edit: a text box, else a native dropdown set to another value, else a radio not picked, else a checkbox flipped (a form with no text box)
      const cs = (n.candidates || []).filter((c) => !c.danger && c.layer === 'top' && !c.inRow);
      const field = (n.candidates || []).find((c) => c.kind === 'text' && !c.danger && c.type !== 'password')
        ?? cs.find((c) => c.kind === 'select' && c.options?.some((o) => o !== c.value)) ?? cs.find((c) => c.kind === 'radio' && !c.checked) ?? cs.find((c) => c.kind === 'check');
      const dirtyStep = !field ? null : field.kind === 'text' ? stepOf(field, { do: 'fill', value: 'probe' })
        : field.kind === 'select' ? stepOf(field, { do: 'select', value: field.options.find((o) => o !== field.value) })
        : stepOf(field, { do: 'check', value: field.kind === 'check' ? String(!field.checked) : 'true' });
      // the X, and the first button that measured as a way out (it closed the window or went elsewhere)
      const outs = [list.find((e) => e.via === 'x'), n.exits.find((e) => e.via === 'button' && !e.error && !e.opens && (e.closed > 0 || (e.lands && e.lands !== n.id)))?.step
        ?? list.find((e) => e.via === 'button' && !e.other && !n.exits.some((x) => x.step === e))].filter(Boolean);
      if (B.dirtyProbe && n.kind === 'dialog' && dirtyStep) n.dirtyExits = [];
      for (const out1 of B.dirtyProbe && n.kind === 'dialog' && dirtyStep ? outs : []) {
        if (timeUp()) break;
        // reached with the page's own requests let through (a window the portal loads by POST); only the edit and what follows is sealed.
        // It asks when another window comes up on top (more windows, or the same number with another one on top: the form closed, the question open)
        const edit = () => sealed(async () => {
          await doStep(w, dirtyStep); await quiet(w); await doStep(w, out1); await wait(w); await quiet(w);
          const nw = await w.page.evaluate(() => window.__xp.windows()), top = nw ? (await w.page.evaluate((sc) => window.__xp.layer(sc), scope)).title : null;
          return { nw, asks: nw > (n.windows ?? 0) || (nw > 0 && nw === (n.windows ?? 0) && top !== n.title) };
        });
        const d = { via: out1.via, text: out1.text, edit: `${dirtyStep.do} "${field.label || field.text || field.name || field.kind}"` };
        try {
          if (await reach(w, n)) {
            const e1 = await edit(), nw = e1.nw;
            d.asks = e1.asks;
            if (!d.asks) d.closed = (n.windows ?? 0) - nw;
            else {
              d.confirm = K.confirm ? await K.confirm({ page: w.page }).catch(() => null) : { title: (await w.page.evaluate((sc) => window.__xp.layer(sc), scope)).title };
              await shot(w, path.join(dir, n.dir, 'dirty-exit.png'), false);
              // each of its buttons pressed (the question asked again for each): the one that keeps the form open with the edit is "stay", the one
              // that closes it is "leave". Measured, not read from the words, so any wording works; a button that would commit is not pressed
              const btns = (await w.page.evaluate(() => window.__xp.buttons()).catch(() => [])).slice(0, 3);
              d.answers = [];
              let pressed = false;
              for (const b of btns) {
                if (COMMIT.test(b.text) && !/\b(don.?t|do not|without)\b/i.test(b.text)) { d.answers.push({ text: b.text, answer: null, skipped: 'commit' }); continue; }
                if (timeUp() || (pressed && (!(await reach(w, n)) || !(await edit()).asks))) break; // the question again, for the next button
                pressed = true;
                d.answers.push(await sealed(async () => {
                  const r = { text: b.text };
                  try {
                    await doStep(w, b); await wait(w); await quiet(w);
                    const aw = await w.page.evaluate(() => window.__xp.windows()), top = aw ? (await w.page.evaluate((sc) => window.__xp.layer(sc), scope)).title : null, f = await fp(w);
                    r.answer = aw === (n.windows ?? 0) && top === n.title ? 'stay' : aw < (n.windows ?? 0) ? 'leave' : null;
                    Object.assign(r, { windows: aw, closed: (n.windows ?? 0) - aw, lands: byHash.get(f.hash) ?? (aw === 0 ? 'page' : r.answer === 'stay' ? n.id : null) });
                  } catch (e) { r.error = e.message.split('\n')[0].slice(0, 120); }
                  return r;
                }));
              }
              for (const ans of ['stay', 'leave']) { const a = d.answers.find((x) => x.answer === ans); if (a) d[ans] = { windows: a.windows, closed: a.closed, lands: a.lands }; }
              // what was measured beats what the words said: the rebuild stamps the confirm's buttons by these
              const norm = (t) => String(t || '').replace(/\s+/g, ' ').trim().toLowerCase();
              for (const cb of d.confirm?.buttons ?? []) { const m = d.answers.find((a) => a.answer && norm(a.text) === norm(cb.text)); if (m) cb.answer = m.answer; }
            }
          }
        } catch (e) { d.error = e.message.split('\n')[0].slice(0, 120); }
        w.at = null;
        n.dirtyExits.push(d);
      }
      if (n.dirtyExits?.length) n.dirtyExit = n.dirtyExits.find((d) => d.asks) ?? n.dirtyExits[0]; // the one the tree and the spec name first
    }
    writeJson(path.join(dir, n.dir, 'node.json'), { ...n, candidates: undefined });
  };

  // ---------- one action from a node: do it, see what it did, come back ----------
  const act = async (w, n, a) => {
    const byEl = new Map(n.candidates.map((c) => [c.el, c]));
    const c = byEl.get(a.el);
    const steps = [...(a.setup || []).map((s) => stepOf(byEl.get(s.el), s)), stepOf(c, a)];
    const t = { el: a.el, text: c.text || c.label || '', do: a.do, ...(a.value !== undefined ? { value: a.value } : {}), why: a.why };
    (n.tried ||= []).push(t);
    const g = w.s.guard, prev = lines(n.fpText);
    let e0 = 0, before = null;
    // a click that fails here (something left on top by the previous action: an overlay a window did not take away) gets one more try
    // from a freshly loaded page replayed to this state
    for (let attempt = 0; ; attempt++) {
      if (!(await reach(w, n))) { t.outcome = 'could not get back to this state'; return; }
      e0 = g.events.length;
      before = await K.marks?.({ page: w.page }).catch(() => null);
      if (B.recorder) await w.page.evaluate(() => window.__xp.arm()).catch(() => {});
      try { for (const st of steps) { await doStep(w, st); await wait(w); } await quiet(w); break; }
      catch (e) {
        w.at = null;
        if (attempt) { t.outcome = `error: ${e.message.split('\n')[0].slice(0, 120)}`; return; }
      }
    }
    const evs = g.events.slice(e0);
    // a toast, a banner its script built, a message that showed up anywhere (outside the window too), even one gone again already
    const appeared = B.recorder ? await w.page.evaluate(() => window.__xp.appeared()).catch(() => []) : [];
    const msgLike = appeared.filter((x) => x.fixed || /msg|alert|notif|toast|error|summary|banner|message|valid/i.test(x.cls) || (!x.stays && !x.inWindow));
    if (msgLike.length) t.appeared = msgLike.slice(0, 5);
    const blocked = evs.filter((e) => e.status === 'blocked');
    const nav = evs.find((e) => e.type === 'navigation' || e.type === 'popup');
    const reqs = evs.filter((e) => /request|postback/.test(e.type) && e.url && !ASSET.test(e.url)).map((e) => ({ method: e.method || 'GET', url: e.url.replace(/^https?:\/\/[^/]+/, '').split('?')[0], status: e.status }));
    if (blocked.length) {
      const b = newNode(n, { name: slug(`${t.text || a.el}-boundary`), kind: 'boundary', status: 'boundary', via: { el: a.el, steps }, path: [...n.path, ...steps], requests: blocked.map((e) => ({ method: e.method, url: e.url.replace(/^https?:\/\/[^/]+/, '').split('?')[0], fields: e.post && typeof e.post === 'object' ? Object.keys(e.post) : [] })) });
      fs.mkdirSync(path.join(dir, b.dir), { recursive: true });
      await shot(w, path.join(dir, b.dir, 'shot.png'), false);
      writeJson(path.join(dir, b.dir, 'node.json'), b);
      Object.assign(t, { outcome: `boundary: would send ${b.requests.map((r) => `${r.method} ${r.url}`).join(', ')}`, child: b.id });
      w.at = null;
      return;
    }
    if (nav) {
      (n.links ||= []).push({ text: t.text, url: nav.url, kind: nav.type });
      t.outcome = `leaves the page for ${nav.url.replace(/^https?:\/\/[^/]+/, '').slice(0, 100)} (not followed: captured as a screen of its own)`;
      w.at = null;
      return;
    }
    const f = await fp(w);
    if (f.hash === n.fp) { t.outcome = 'nothing changed'; w.at = n.id; return; }
    const known = byHash.get(f.hash);
    if (known) { Object.assign(t, { outcome: `the same state as ${known}`, same: known }); }
    else if (Object.keys(G.nodes).length >= B.maxNodes) { t.outcome = 'a new state, not kept: maxNodes reached'; }
    else {
      const now = lines(f.text), lay = await w.page.evaluate((sc) => window.__xp.layer(sc), scope);
      const opened = lay.windows > (n.windows ?? 0) || (lay.top && now.W !== prev.W);
      const kind = opened ? 'dialog' : Object.keys(now).every((k) => k === 'V' || now[k] === prev[k]) ? 'validation' : now.R === '1' && prev.R === '0' ? 'results' : 'part';
      const change = !opened && before ? await K.changed?.({ page: w.page, before }).catch(() => null) : null;
      const m = newNode(n, { name: slug(a.name || (opened ? lay.title : '') || `${t.text}-${kind}`), kind, fp: f.hash, fpText: f.text, via: { el: a.el, steps }, path: [...n.path, ...steps], requests: reqs, ...(change ? { change } : {}), title: opened ? lay.title : null,
        ...(kind === 'validation' && appeared.length ? { appeared } : {}) });
      if (kind === 'validation' || m.depth >= B.maxDepth) { m.status = 'leaf'; m.reason = kind === 'validation' ? 'only messages changed' : 'maxDepth'; }
      await harvest(w, m);
      Object.assign(t, { outcome: `a new ${kind}${m.title ? ` "${m.title}"` : ''}`, child: m.id });
      log(`flows: ${n.id} -> ${m.id} ${m.name} (${kind}) by ${a.do} "${t.text}"`);
    }
    // back to n: close what opened (cheap), else the next action reloads and replays
    w.at = null;
    for (let i = 0; i < 3 && (await w.page.evaluate(() => window.__xp.windows()).catch(() => 0)) > (n.windows ?? 0); i++) {
      if (!(await K.closeTop?.({ page: w.page }))) await w.page.keyboard.press('Escape').catch(() => {});
      await w.page.waitForTimeout(700);
    }
    if ((await fp(w).catch(() => ({}))).hash === n.fp) w.at = n.id;
  };

  try {
    // ---------- the root: the screen at rest ----------
    const w0 = await openWorker();
    if (!G.nodes.n0) {
      await load(w0);
      const f = await fp(w0);
      const n0 = { id: 'n0', parent: null, depth: 0, name: 'at-rest', dir: 'n0-at-rest', kind: 'page', status: 'frontier', fp: f.hash, fpText: f.text, path: [] };
      G.nodes.n0 = n0;
      byHash.set(f.hash, 'n0');
      await harvest(w0, n0);
      save();
    }
    while (B.workers > workers.length) await openWorker().catch((e) => { log(`flows: ! a second worker did not open (${e.message.split('\n')[0]}): going on with ${workers.length}`); B.workers = workers.length; });

    // ---------- waves: plan every open state, carry the plan out, until nothing is left ----------
    while (!timeUp() && G.waves < B.maxWaves) {
      const frontier = Object.values(G.nodes).filter((n) => n.status === 'frontier' && n.depth < B.maxDepth && n.candidates);
      if (!frontier.length) break;
      const wave = ++G.waves;
      const pdir = path.join(dir, 'plans'), file = path.join(pdir, `wave-${wave}.json`), frontierFile = path.join(pdir, `wave-${wave}.frontier.json`);
      fs.mkdirSync(pdir, { recursive: true });
      fs.rmSync(file, { force: true });
      const front = frontier.map((n) => ({ node: n.id, name: n.name, kind: n.kind, title: n.title ?? null, dir: path.join(dir, n.dir), depth: n.depth, candidates: n.candidates.map((c) => ({ el: c.el, kind: c.kind, text: c.text, label: c.label, danger: c.danger ?? null, options: c.options })) }));
      writeJson(frontierFile, { wave, maxActions: B.maxActions, nodes: front });
      const suggested = rulePlan(frontier, B, rowVia);
      writeJson(path.join(pdir, `wave-${wave}.suggested.json`), suggested);
      save();
      // the checks of each open state need no plan (fields, Save, sweep, ways out): the workers run them while the planner plans.
      // Windows and parts first: they are what a time budget must not leave unexplored
      const rank = (n) => (['dialog', 'part'].includes(n.kind) ? 0 : 1) * 100 + n.depth;
      const probes = [...frontier].sort((a, b) => rank(a) - rank(b));
      const probing = Promise.all(workers.map(async (w) => {
        for (let n = probes.shift(); n && !timeUp(); n = probes.shift()) {
          try { if (await reach(w, n)) await probe(w, n); } catch (e) { if (/redirected/.test(e.message)) throw e; }
          save();
        }
      })).then(() => null, (e) => e);
      let plan = null, source = 'rules';
      if (planner && B.ai !== false) {
        const tp = Date.now();
        const ok = await planner({ wave, file, frontierFile }).catch((e) => (log(`flows: ! planner failed: ${e.message.split('\n')[0]}`), false));
        deadline += Date.now() - tp;
        const p = ok ? readJson(file) : null;
        const errs = p ? checkPlan(p, front, B) : ['no plan'];
        if (!errs.length) { plan = p; source = 'ai'; } else if (ok) log(`flows: ! the plan of wave ${wave} does not pass (${errs[0]}): the rules plan instead`);
      }
      const pe = await probing;
      if (pe) throw pe;
      plan ||= suggested;
      G.planners.push(source);
      log(`flows: wave ${wave}: ${frontier.length} state(s) to explore, plan by ${source === 'ai' ? 'the writer' : 'the rules'}`);
      const jobs = plan.nodes.map((p) => ({ p, n: G.nodes[p.node] })).filter((j) => j.n).sort((a, b) => rank(a.n) - rank(b.n));
      // the nodes of a wave are independent: each worker takes the next one
      await Promise.all(workers.map(async (w) => {
        for (let j = jobs.shift(); j; j = jobs.shift()) {
          const { p, n } = j;
          n.same = p.same || [];
          n.skipped = (n.candidates || []).filter((c) => c.danger && !(n.skipped || []).some((s) => s.el === c.el)).map((c) => ({ el: c.el, text: c.text, why: c.danger }));
          if (p.deadEnd || !p.actions?.length) { n.status = 'dead-end'; n.reason = p.reason || 'the plan has nothing to do here'; save(); continue; }
          try {
            if (!(await reach(w, n))) { n.status = 'unreachable'; n.reason = n.drift; save(); continue; }
            await probe(w, n);
            for (const a of p.actions.slice(0, B.maxActions)) {
              if (timeUp()) break;
              await act(w, n, a);
              save();
            }
            n.status = timeUp() ? 'frontier' : 'explored';
          } catch (e) {
            if (/redirected/.test(e.message)) throw e;
            n.status = 'unreachable'; n.reason = e.message.split('\n')[0].slice(0, 160);
          }
          save();
        }
      }));
    }
    const all = Object.values(G.nodes);
    const left = all.filter((n) => n.status === 'frontier').length;
    if (left) log(`flows: ! ${left} state(s) not explored (${timeUp() ? 'time budget' : G.waves >= B.maxWaves ? 'maxWaves' : 'maxDepth'}): a re-run continues from flows/index.json`);
    save();
    const merged = K.merge ? await K.merge({ out, graph: G, scope, log }).catch((e) => (log(`flows: ! merge into the kit failed: ${e.message.split('\n')[0]}`), null)) : null;
    const sum = { states: all.length, dialogs: all.filter((n) => n.kind === 'dialog').length, boundaries: all.filter((n) => n.kind === 'boundary').length, unreachable: all.filter((n) => n.status === 'unreachable').length, left, waves: G.waves, merged };
    log(`flows: ${sum.states} state(s): ${sum.dialogs} window(s), ${sum.boundaries} boundary(ies), ${sum.unreachable} unreachable, ${left} left${merged ? `; kit: +${merged.dialogs} dialog(s), ${merged.flows} replayed click(s), ${merged.states} state check(s)` : ''}. Tree: ${path.join(dir, 'FLOWS.md')}`);
    return { ok: !left && !sum.unreachable, ...sum };
  } finally {
    for (const w of workers) await w.s.close().catch(() => {});
  }
}
