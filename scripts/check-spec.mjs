#!/usr/bin/env node
// npm run check -- <screen> [<screen> ...]
// The spec gate: does outputs/<screen>/spec/UI_SPEC.md cite every control, behavior and validator the capture
// found (coverage), cite only ids that exist (no invention), tag every requirement, and have every section?
// Writes spec/coverage.json. Exit 1 when anything is missing.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { screenDir } from './lib/paths.mjs';

export const SECTIONS = ['Overview', 'Layout', 'Design tokens', 'Assets', 'Components', 'Fields & validation', 'State model', 'Behavior',
  'Navigation', 'Server interactions', 'Accessibility', 'Test ids', 'Open questions'];

export function check(screen) {
  const out = screenDir(screen);
  const factsFile = path.join(out, 'facts.json'), specFile = path.join(out, 'spec', 'UI_SPEC.md');
  if (!fs.existsSync(factsFile)) return { pass: false, error: `no facts.json: run npm run capture -- ${screen} first` };
  if (!fs.existsSync(specFile)) return { pass: false, error: `no spec/UI_SPEC.md yet: ask the agent to write it (skill ui-spec)` };
  const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));
  // inline code (`[ctl:key]` in a legend, regexes) is not a citation
  const md = fs.readFileSync(specFile, 'utf8').replace(/`[^`\n]*`/g, '``');

  // tags: [T07] [S01] [V01] [ctl:key] [val:id] [shot:2] [asset:path] [js:fn] [aspx:L10] [css:rule] [UNKNOWN] — several per bracket allowed
  const cited = { T: new Set(), M: new Set(), S: new Set(), V: new Set(), ctl: new Set(), val: new Set(), shot: new Set(), asset: new Set() };
  const wild = [];
  let unknownTags = 0;
  for (const m of md.matchAll(/\[([^\]\n]{1,400})\](?!\()/g)) {
    for (const tok of m[1].split(/[,;]\s*|\s+(?=(?:T\d+|M\d+|S\d+|V\d+|ctl:|val:|shot:|asset:)\b)/).map((s) => s.trim()).filter(Boolean)) {
      let x;
      if ((x = tok.match(/^(T\d+)$/))) cited.T.add(x[1]);
      else if ((x = tok.match(/^(M\d+)$/))) cited.M.add(x[1]);
      else if ((x = tok.match(/^(S\d+)$/))) cited.S.add(x[1]);
      else if ((x = tok.match(/^(V\d+)$/))) cited.V.add(x[1]);
      else if ((x = tok.match(/^ctl:(\S+?)\*$/))) wild.push(x[1]);
      else if ((x = tok.match(/^ctl:(\S+)$/))) cited.ctl.add(x[1]);
      else if ((x = tok.match(/^val:(\S+)$/))) cited.val.add(x[1]);
      else if ((x = tok.match(/^shot:(\d+)/))) cited.shot.add(+x[1]);
      else if ((x = tok.match(/^asset:(\S+)$/))) cited.asset.add(x[1]);
      else if (/^UNKNOWN\b/.test(tok)) unknownTags++;
    }
  }
  const covered = (k) => cited.ctl.has(k) || wild.some((w) => k.startsWith(w));
  const all = new Set([...facts.all.elements, ...facts.all.controls]);
  const missing = {
    controls: facts.required.controls.filter((k) => !covered(k)),
    transitions: facts.required.transitions.filter((t) => !cited.T.has(t)),
    validators: facts.required.validators.filter((v) => !cited.val.has(v)),
    motion: (facts.required.motion || []).filter((m) => !cited.M.has(m)),
    scroll: (facts.required.scroll || []).filter((m) => !cited.S.has(m)), // measured by scrolling the live page (explore/survey/behave.json)
    media: (facts.required.media || []).filter((m) => !cited.V.has(m)),
  };
  const hasMotion = Array.isArray(facts.required.motion); // captures made before motion.json existed have no Motion section to check
  const unknown = [
    ...[...cited.T].filter((t) => !facts.all.transitions.includes(t)).map((t) => `[${t}] is not a captured behavior`),
    ...[...cited.ctl].filter((k) => !all.has(k)).map((k) => `[ctl:${k}] is not a captured control/element`),
    ...[...cited.M].filter((m) => !(facts.all.motion || []).includes(m)).map((m) => `[${m}] is not a captured motion entry`),
    ...[...cited.S].filter((m) => !(facts.all.scroll || []).includes(m)).map((m) => `[${m}] is not a measured scroll behavior`),
    ...[...cited.V].filter((m) => !(facts.all.media || []).includes(m)).map((m) => `[${m}] is not a measured media entry`),
    ...[...cited.val].filter((v) => !facts.all.validators.includes(v)).map((v) => `[val:${v}] is not a captured validator`),
    ...[...cited.shot].filter((n) => n < 1 || n > facts.all.shots).map((n) => `[shot:${n}] does not exist (${facts.all.shots} shots)`),
    ...[...cited.asset].filter((a) => !fs.existsSync(path.join(out, 'capture', a)) && !fs.existsSync(path.join(out, a))).map((a) => `[asset:${a}] file not found under capture/`),
    ...wild.filter((w) => ![...all].some((k) => k.startsWith(w))).map((w) => `[ctl:${w}*] matches nothing`),
  ];
  // every EARS line carries evidence
  const untagged = md.split('\n').map((l, i) => [i + 1, l]).filter(([, l]) => /^\s*(?:[-*]|\d+\.)?\s*(?:\*\*[^*]*\*\*\s*)?(WHEN|WHILE|IF|WHERE|THE SYSTEM SHALL)\b/.test(l) && !/\[[^\]]+\](?!\()/.test(l))
    .map(([n, l]) => `line ${n}: ${l.trim().slice(0, 100)}`);
  const headings = [...md.matchAll(/^##\s+(?:\d+\.\s*)?(.+)$/gm)].map((m) => m[1].trim().toLowerCase());
  const sections = [...SECTIONS, ...(hasMotion ? ['Motion'] : [])].filter((s) => !headings.some((h) => h.startsWith(s.toLowerCase())));
  const tasks = fs.existsSync(path.join(out, 'spec', 'tasks.md'));
  const pass = !missing.controls.length && !missing.transitions.length && !missing.validators.length && !missing.motion.length && !missing.scroll.length && !missing.media.length && !unknown.length && !untagged.length && !sections.length && tasks;
  const res = {
    screen, pass, checkedAt: new Date().toISOString(),
    coverage: {
      controls: `${facts.required.controls.length - missing.controls.length}/${facts.required.controls.length}`,
      transitions: `${facts.required.transitions.length - missing.transitions.length}/${facts.required.transitions.length}`,
      validators: `${facts.required.validators.length - missing.validators.length}/${facts.required.validators.length}`,
      motion: hasMotion ? `${facts.required.motion.length - missing.motion.length}/${facts.required.motion.length}` : 'n/a',
      ...(facts.required.scroll?.length ? { scroll: `${facts.required.scroll.length - missing.scroll.length}/${facts.required.scroll.length}` } : {}),
      ...(facts.required.media?.length ? { media: `${facts.required.media.length - missing.media.length}/${facts.required.media.length}` } : {}),
    },
    missing, unknown, untagged, missingSections: sections, tasksFile: tasks, unknownMarkers: unknownTags,
    optional: { linksNotCited: (facts.optional?.links || []).filter((k) => !covered(k)), unexplainedNotCited: (facts.optional?.unexplained || []).filter((k) => !covered(k) && !md.includes(k)) },
  };
  fs.writeFileSync(path.join(out, 'spec', 'coverage.json'), JSON.stringify(res, null, 1));
  return res;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const screens = process.argv.slice(2);
  if (!screens.length) { console.error('usage: npm run check -- <screen> [<screen> ...]'); process.exit(1); }
  let bad = 0;
  for (const s of screens) {
    const r = check(s);
    if (r.error) { bad++; console.log(`✗ ${s}: ${r.error}`); continue; }
    console.log(`${r.pass ? '✓' : '✗'} ${s}: controls ${r.coverage.controls}, behaviors ${r.coverage.transitions}, validators ${r.coverage.validators}, motion ${r.coverage.motion}${r.coverage.scroll ? `, scroll ${r.coverage.scroll}` : ''}${r.coverage.media ? `, media ${r.coverage.media}` : ''}, ${r.unknownMarkers} [UNKNOWN]`);
    const list = (name, xs) => { if (xs.length) console.log(`  ${name} (${xs.length}): ${xs.slice(0, 25).join(', ')}${xs.length > 25 ? ' …' : ''}`); };
    list('missing controls', r.missing.controls.map((k) => `ctl:${k}`));
    list('missing behaviors', r.missing.transitions);
    list('missing validators', r.missing.validators.map((v) => `val:${v}`));
    list('missing motion', r.missing.motion);
    list('missing scroll behaviors (facts.md section 16)', r.missing.scroll);
    list('missing media (facts.md section 17)', r.missing.media);
    for (const u of r.unknown) console.log(`  invented: ${u}`);
    for (const u of r.untagged.slice(0, 15)) console.log(`  no evidence tag: ${u}`);
    list('missing sections', r.missingSections);
    if (!r.tasksFile) console.log('  missing spec/tasks.md');
    list('(optional) links not mentioned', r.optional.linksNotCited.map((k) => `ctl:${k}`));
    list('(optional) unexplained elements not mentioned', r.optional.unexplainedNotCited);
    if (!r.pass) bad++;
  }
  process.exit(bad ? 1 : 0);
}
