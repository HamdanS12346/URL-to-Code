#!/usr/bin/env node
// The gate of a flows plan (the writer's plan for one wave of the flows stage, scripts/flows.mjs):
//   node scripts/check-flows.mjs <plan.json> <wave-N.frontier.json>
// Every open state has an entry; every action names an element of that state's list (candidates.md), a known way to act on it, a value
// where one is needed, and never a commit button (Save, Delete...: the script would refuse it anyway).
import fs from 'node:fs';

export const DO = new Set(['click', 'dblclick', 'hover', 'fill', 'select', 'check', 'press']);
const NAME = /^[a-z0-9][a-z0-9-]{0,31}$/;

// plan: { nodes: [{ node, name?, deadEnd?, reason?, actions?: [{ el, do, value?, name?, setup?: [{ el, do, value? }], why }], same?: [{ el, as, why }] }] }
// front: [{ node, candidates: [{ el, kind, danger }] }]
export function checkPlan(plan, front, B = {}) {
  const errs = [];
  if (!plan || !Array.isArray(plan.nodes)) return ['the plan must be a JSON object with a "nodes" array'];
  const max = B.maxActions ?? 12;
  const seen = new Set();
  for (const p of plan.nodes) {
    const f = front.find((x) => x.node === p?.node);
    if (!f) { errs.push(`"${p?.node}" is not one of this wave's states (${front.map((x) => x.node).join(', ')})`); continue; }
    seen.add(p.node);
    if (p.name !== undefined && !NAME.test(p.name)) errs.push(`${p.node}: name "${p.name}" must be lower-case words joined by "-", at most 32 characters`);
    const acts = p.actions ?? [];
    if (!Array.isArray(acts)) { errs.push(`${p.node}: "actions" must be an array`); continue; }
    if (!acts.length && !p.deadEnd) errs.push(`${p.node}: no actions: list some, or say "deadEnd": true with a "reason"`);
    if (p.deadEnd && !p.reason) errs.push(`${p.node}: a dead end needs a "reason"`);
    if (acts.length > max) errs.push(`${p.node}: ${acts.length} actions, at most ${max}: pick the ones that reach different states`);
    const byEl = new Map(f.candidates.map((c) => [c.el, c]));
    const one = (a, where) => {
      const c = byEl.get(a?.el);
      if (!c) return errs.push(`${p.node} ${where}: "${a?.el}" is not in its candidates.md`);
      if (c.danger) errs.push(`${p.node} ${where}: ${a.el} "${c.text}" is never clicked (${c.danger})`);
      if (!DO.has(a.do)) errs.push(`${p.node} ${where}: "do" must be one of ${[...DO].join(', ')}`);
      if (['fill', 'select'].includes(a.do) && typeof a.value !== 'string') errs.push(`${p.node} ${where}: "${a.do}" needs a "value" (a string)`);
      if (a.do === 'fill' && !['text'].includes(c.kind)) errs.push(`${p.node} ${where}: ${a.el} is a ${c.kind}, not a text box: fill only text boxes`);
      if (a.do === 'select' && !['select', 'dropdown'].includes(c.kind)) errs.push(`${p.node} ${where}: ${a.el} is a ${c.kind}: select only on a dropdown or select`);
      if (a.name !== undefined && !NAME.test(a.name)) errs.push(`${p.node} ${where}: name "${a.name}" must be lower-case words joined by "-", at most 32 characters`);
    };
    acts.forEach((a, i) => {
      one(a, `action ${i + 1}`);
      if (a.setup !== undefined && !Array.isArray(a.setup)) errs.push(`${p.node} action ${i + 1}: "setup" must be an array of steps`);
      (a.setup || []).forEach((s, k) => one(s, `action ${i + 1} setup ${k + 1}`));
    });
    for (const s of p.same || []) if (!byEl.has(s?.el) || !byEl.has(s?.as)) errs.push(`${p.node}: "same" names an element that is not in its candidates.md (${s?.el} / ${s?.as})`);
  }
  for (const f of front) if (!seen.has(f.node)) errs.push(`${f.node} has no entry: give it actions, or "deadEnd": true with a "reason"`);
  return errs;
}

// what a plan leaves out that is worth a look (not an error): a button or link of a window state that no action of the plan names
// (a Create New inside an Edit, a row of a grid in a dialog). Printed by the gate, never fails it
export function planWarnings(plan, front) {
  const out = [];
  for (const p of plan?.nodes ?? []) {
    const f = front.find((x) => x.node === p.node);
    if (!f || p.deadEnd || !/dialog|part/.test(f.kind ?? '')) continue;
    const used = new Set([...(p.actions ?? []).flatMap((a) => [a.el, ...(a.setup ?? []).map((s) => s.el)]), ...(p.same ?? []).map((s) => s.el)]);
    const left = f.candidates.filter((c) => !c.danger && ['button', 'link', 'row', 'tab'].includes(c.kind) && !used.has(c.el) && !/^(close|cancel|back|reset|x|×|no)$/i.test(c.text || ''));
    if (left.length) out.push(`${p.node}: never tried here: ${left.slice(0, 6).map((c) => `${c.el} ${c.kind} "${(c.text || c.label || '').slice(0, 30)}"`).join(', ')}`);
  }
  return out;
}

export function checkPlanFile(planFile, frontierFile) {
  let plan, fr;
  try { plan = JSON.parse(fs.readFileSync(planFile, 'utf8').replace(/^﻿/, '')); } catch (e) { return [`${planFile} is not valid JSON: ${e.message.split('\n')[0]}`]; }
  try { fr = JSON.parse(fs.readFileSync(frontierFile, 'utf8')); } catch { return [`${frontierFile} is missing`]; }
  return checkPlan(plan, fr.nodes, { maxActions: fr.maxActions });
}

if (process.argv[1] && (await import('node:url')).pathToFileURL(process.argv[1]).href === import.meta.url) {
  const [planFile, frontierFile] = process.argv.slice(2);
  if (!planFile || !frontierFile) { console.error('usage: node scripts/check-flows.mjs <plan.json> <wave-N.frontier.json>'); process.exit(2); }
  const errs = checkPlanFile(planFile, frontierFile);
  if (errs.length) { console.log(`✗ the flows plan does not pass:\n${errs.map((e) => `- ${e}`).join('\n')}`); process.exit(1); }
  try {
    const warn = planWarnings(JSON.parse(fs.readFileSync(planFile, 'utf8').replace(/^﻿/, '')), JSON.parse(fs.readFileSync(frontierFile, 'utf8')).nodes);
    if (warn.length) console.log(`! worth a look (not required):\n${warn.map((w) => `- ${w}`).join('\n')}`);
  } catch { /* the warnings are a hint only */ }
  console.log('✓ flows plan OK');
}
