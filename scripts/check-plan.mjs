#!/usr/bin/env node
// npm run check:plan -- <screen>
// The stage-3 gate: is outputs/<screen>/explore/plan.json (written by your coding agent, skill explore-plan) usable?
// Every key must be one the survey found (explore/survey/survey.json). Exit 1 when it is not.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

// entries may be "key" or { key, why, value, enter, submit }; "skip" entries are { key, why }: left out on purpose
const norm = (e) => (typeof e === 'string' ? { key: e } : e && typeof e === 'object' ? e : { key: undefined });

export function validatePlan(plan, survey) {
  const errors = [], warnings = [];
  const els = new Map(survey.elements.map((e) => [e.key, e]));
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) return { errors: ['plan.json must be a JSON object { "hover": [...], "actions": [...] }'], warnings };
  // before stage 3 existed, explore wrote its own plan.json (with candidate counts): not a plan anyone chose
  if (typeof plan.candidates === 'number') return { errors: ['explore/plan.json was written by an older version of the tool, not by a planner: delete it and plan again'], warnings };
  for (const f of ['hover', 'actions']) if (plan[f] !== undefined && !Array.isArray(plan[f])) errors.push(`"${f}" must be an array`);
  if (errors.length) return { errors, warnings };
  const hover = (plan.hover || []).map(norm), actions = (plan.actions || []).map(norm);
  if (!hover.length && !actions.length) errors.push('the plan is empty: list at least one key under "hover" or "actions"');
  for (const [f, list] of [['hover', hover], ['actions', actions]]) {
    const seen = new Set();
    for (const e of list) {
      if (typeof e.key !== 'string' || !e.key) { errors.push(`${f}: entry without a "key": ${JSON.stringify(e)}`); continue; }
      const el = els.get(e.key);
      if (!el) { errors.push(`${f}: unknown key "${e.key}" (not in explore/survey/candidates.md; keys are case-sensitive)`); continue; }
      if (seen.has(e.key)) warnings.push(`${f}: "${e.key}" listed twice (runs once)`);
      seen.add(e.key);
      if (f === 'hover' && !el.can.includes('hover')) warnings.push(`hover: "${e.key}" was not hoverable in the survey (hidden or disabled at load): it will probably fail`);
      if (f === 'actions' && !el.can.some((c) => c !== 'hover')) warnings.push(`actions: "${e.key}" has no action (${el.kind === 'link' ? 'a plain link: it would only leave the page' : 'hover only'}): skipped`);
      if (e.value !== undefined && (f !== 'actions' || el.kind !== 'text')) warnings.push(`${f}: "value" only applies to text fields under "actions" ("${e.key}" is ${el.kind || 'hover-only'})`);
      if (e.value !== undefined && typeof e.value !== 'string') errors.push(`actions: "${e.key}" value must be a string`);
      if (e.submit !== undefined && (f !== 'actions' || !el.can.includes('click'))) warnings.push(`${f}: "submit" only applies to clickable buttons under "actions" ("${e.key}"): ignored`);
    }
  }
  // behavior the survey MEASURED (a JavaScript hover handler on the element): the plan must cover each look-alike group, or
  // say why not. A planner that only looks at pictures cannot see these, and the rebuild then misses a whole behavior.
  const planned = new Set([...hover, ...actions].map((e) => e.key));
  const skipped = new Map();
  if (plan.skip !== undefined && !Array.isArray(plan.skip)) errors.push('"skip" must be an array of { "key", "why" }');
  for (const e of Array.isArray(plan.skip) ? plan.skip.map(norm) : []) {
    if (typeof e.key !== 'string' || !e.key) { errors.push(`skip: entry without a "key": ${JSON.stringify(e)}`); continue; }
    if (typeof e.why !== 'string' || e.why.trim().length < 3) { errors.push(`skip: "${e.key}" needs a "why" (what makes it not worth exploring)`); continue; }
    if (!els.has(e.key)) warnings.push(`skip: unknown key "${e.key}"`);
    skipped.set(e.key, e.why);
  }
  for (const g of survey.behavior?.hover?.groups || []) {
    if (g.keys.some((k) => planned.has(k) || skipped.has(k))) continue;
    const more = g.keys.length > 1 ? `; look-alikes: ${g.keys.slice(1, 4).map((k) => `"${k}"`).join(', ')}${g.keys.length > 4 ? ', …' : ''}` : '';
    errors.push(`behavior: "${g.keys[0]}"${g.label ? ` (${g.label})` : ''} has a JavaScript ${g.types.join('/')} handler, so hovering it does something; put it under "hover" (or "actions"), or under "skip" with a "why"${more}`);
  }
  if (plan.budgetSec !== undefined && !(Number.isFinite(plan.budgetSec) && plan.budgetSec >= 30 && plan.budgetSec <= 3600)) errors.push('"budgetSec" must be a number of seconds between 30 and 3600');
  return { errors, warnings, plan: { ...plan, hover: hover.filter((e) => els.has(e.key)), actions: actions.filter((e) => els.has(e.key)) } };
}

// { ok, plan, errors, warnings, hash, source }. auto: no usable plan -> the survey's rule-based suggestion becomes plan.json
export function loadPlan(out, { auto = false } = {}) {
  const sFile = path.join(out, 'explore', 'survey', 'survey.json'), pFile = path.join(out, 'explore', 'plan.json');
  if (!fs.existsSync(sFile)) return { ok: false, errors: ['no explore/survey/survey.json: stage 2 has not run'], warnings: [] };
  const survey = readJson(sFile);
  let plan, errors = [], warnings = [];
  if (fs.existsSync(pFile)) {
    try { plan = readJson(pFile); } catch (e) { errors.push(`plan.json is not valid JSON: ${e.message}`); }
    if (plan) ({ errors, warnings, plan } = validatePlan(plan, survey));
  } else errors.push('no explore/plan.json yet');
  if (errors.length && auto) {
    fs.copyFileSync(path.join(out, 'explore', 'survey', 'plan.suggested.json'), pFile);
    return loadPlan(out);
  }
  if (errors.length) return { ok: false, errors, warnings };
  const hash = crypto.createHash('md5').update(JSON.stringify([plan.hover, plan.actions, plan.budgetSec])).digest('hex');
  return { ok: true, plan, errors, warnings, hash, source: plan.source === 'auto' ? 'auto' : 'agent' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const screens = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (!screens.length) { console.error('usage: npm run check:plan -- <screen>'); process.exit(1); }
  let bad = 0;
  for (const s of screens) {
    const r = loadPlan(path.join(ROOT, 'outputs', s));
    if (r.ok) console.log(`${s}: ✓ plan OK: ${r.plan.hover.length} hovers, ${r.plan.actions.length} actions (${r.source})${r.plan.budgetSec ? `, budget ${r.plan.budgetSec}s` : ''}`);
    else { bad++; console.log(`${s}: ✗ plan not usable`); for (const e of r.errors) console.log(`  - ${e}`); }
    for (const w of r.warnings) console.log(`  ! ${w}`);
  }
  process.exit(bad ? 1 : 0);
}
