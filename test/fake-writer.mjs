// A stand-in for Codex in npm run smoke:ui: reads the prompt on stdin and does the least that passes each gate.
//   plan -> the survey's rule-based plan (+ the menu button the prompt asks for); spec -> a spec citing every id in facts.json;
//   code -> nothing (the port already compiles). Never use it for real work.
import fs from 'node:fs';
import path from 'node:path';
import { SECTIONS } from '../scripts/check-spec.mjs';

const prompt = fs.readFileSync(0, 'utf8');
const [, kind] = prompt.match(/^Task: (\w+) /m) || [];
const dir = (prompt.match(/^Screen folder: (.+)$/m) || [])[1]?.trim();
const json = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
console.log(`fake writer: ${kind} ${dir}`);
// for the smoke test: which credential variables reached the writer's environment (names only, never values)
if (process.env.FAKE_WRITER_REPORT) fs.appendFileSync(process.env.FAKE_WRITER_REPORT, `${kind}: ${['UI_PASSWORD', 'PASSWORD', 'UI_USERNAME'].filter((k) => k in process.env).map((k) => `${k.toLowerCase()} `).join('') || 'none'}\n`);

if (kind === 'plan') {
  const plan = json(path.join(dir, 'explore', 'survey', 'plan.suggested.json'));
  const menuSel = (prompt.match(/menu button \(selector `([^`]+)`\)/) || [])[1];
  const el = menuSel && json(path.join(dir, 'explore', 'survey', 'survey.json')).elements.find((e) => e.sel === menuSel);
  if (el && ![...plan.actions, ...plan.hover].some((e) => (e.key ?? e) === el.key)) plan.actions.unshift({ key: el.key, why: 'opens the site menu' });
  fs.writeFileSync(path.join(dir, 'explore', 'plan.json'), JSON.stringify({ ...plan, source: 'agent' }, null, 1));
}
if (kind === 'spec') {
  const R = json(path.join(dir, 'facts.json')).required;
  const cites = [...R.controls.map((k) => `[ctl:${k}]`), ...R.transitions.map((t) => `[${t}]`), ...R.validators.map((v) => `[val:${v}]`),
    ...[...(R.motion || []), ...(R.scroll || []), ...(R.media || [])].map((m) => `[${m}]`)];
  const sections = [...SECTIONS, ...(Array.isArray(R.motion) ? ['Motion'] : [])];
  const extra = fs.existsSync(path.join(dir, 'menu.json')) ? ' Menu tree [asset:menu.json].' : '';
  fs.mkdirSync(path.join(dir, 'spec'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'spec', 'UI_SPEC.md'), `# UI spec (fake writer)\n\n${sections.map((s) => `## ${s}\n\n- ${s === 'Components' ? `Covers ${cites.join(' ')}.${extra}` : 'Not written [UNKNOWN: fake writer].'}\n`).join('\n')}`);
  fs.writeFileSync(path.join(dir, 'spec', 'tasks.md'), '# Tasks\n\n- [ ] build it [UNKNOWN: fake writer]\n');
}
