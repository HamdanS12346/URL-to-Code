#!/usr/bin/env node
// npm run spec:gemini -- <screen> [--model <name>] [--repairs N]
// Writes outputs/<screen>/spec/UI_SPEC.md + tasks.md with Gemini, following the ui-spec skill, then runs the gate
// and sends its report back for up to N repair rounds (default 1).
// Needs GEMINI_API_KEY. Model: --model, else env GEMINI_MODEL, else config.json "gemini.model".
// Free tier: Google may use what you send. Local / demo pages only, never customer screens.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { check } from './check-spec.mjs';
import { screenDir } from './lib/paths.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
try { process.loadEnvFile(path.join(ROOT, '.env')); } catch {} // optional .env with GEMINI_API_KEY
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const screen = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
const model = opt('--model', process.env.GEMINI_MODEL || cfg.gemini?.model || 'gemini-2.5-flash');
const repairs = +opt('--repairs', 1);
const key = process.env.GEMINI_API_KEY;
if (!screen) { console.error('usage: npm run spec:gemini -- <screen> [--model <name>] [--repairs N]'); process.exit(1); }
if (!key) { console.error('set GEMINI_API_KEY'); process.exit(1); }

const out = screenDir(screen), shotsDir = path.join(ROOT, 'screenshots', screen);
const read = (p) => fs.readFileSync(p, 'utf8');
if (!fs.existsSync(path.join(out, 'facts.md'))) { console.error(`no facts.md: run npm run capture -- ${screen} first`); process.exit(1); }

const skillDir = path.join(ROOT, '.claude', 'skills', 'ui-spec');
const system = [
  read(path.join(skillDir, 'SKILL.md')),
  '# references/ui-spec-template.md\n' + read(path.join(skillDir, 'references', 'ui-spec-template.md')),
  '# references/tasks-template.md\n' + read(path.join(skillDir, 'references', 'tasks-template.md')),
  `# How this run differs from the skill
You cannot open files or run commands: everything you may read is in the user message, in skill order (facts.md, the user's screenshots if any, content.md, section crops, state pictures).
The section crops are full-resolution pictures of each band of the page: take looks (spacing, colors, alignment, images) from them and numbers from facts.md. snapshot/used.css was not given to you: do not invent CSS, mark what only it could answer as [UNKNOWN: …].
Every Motion entry in facts.md §15 (M01…) must be cited in the Motion section with its numbers copied.
Ignore "on demand" files you were not given; mark anything they would have answered as [UNKNOWN: …].
The gate is run for you; if it fails you get its report and must return BOTH files again, complete, with every problem fixed.
Return JSON {"ui_spec": "<full UI_SPEC.md>", "tasks": "<full tasks.md>"}. The screen is "${screen}".`,
].join('\n\n---\n\n');

// user message: text + images, inline (request limit ~20MB, so state pictures stop at a budget)
const IMG = /\.(png|jpe?g|webp)$/i;
const mime = (f) => ({ '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' })[path.extname(f).toLowerCase()] || 'image/png';
const img = (p) => ({ inline_data: { mime_type: mime(p), data: fs.readFileSync(p).toString('base64') } });
const parts = [{ text: `# outputs/${screen}/facts.md\n\n${read(path.join(out, 'facts.md'))}` }];
const shots = (fs.existsSync(shotsDir) ? fs.readdirSync(shotsDir) : []).filter((f) => IMG.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
shots.forEach((f, i) => parts.push({ text: `shot:${i + 1} = screenshots/${screen}/${f}` }, img(path.join(shotsDir, f))));
parts.push({ text: `# outputs/${screen}/content.md\n\n${read(path.join(out, 'content.md'))}` });
let budget = 14e6 - parts.reduce((n, p) => n + (p.inline_data?.data.length || p.text.length), 0);
let skipped = 0;
// the tool's own section crops first: full-resolution, one per band, taken from a warmed-up frozen page
const secFile = path.join(out, 'sections', 'index.json');
const bands = fs.existsSync(secFile) ? JSON.parse(read(secFile)) : [];
let nCrops = 0;
for (const b of bands) for (const f of b.files) {
  const jpg = path.join(out, 'sections', 'jpg', f.replace(/\.png$/, '.jpg'));
  const p = fs.existsSync(jpg) ? jpg : path.join(out, 'sections', f); // JPEG twin: ~5x smaller, so long pages keep every crop
  const size = Math.ceil(fs.statSync(p).size * 4 / 3);
  if (size > budget) { skipped++; continue; }
  budget -= size;
  nCrops++;
  parts.push({ text: `section crop sections/${f} (band ${b.n}, y ${Math.round(b.y)}-${Math.round(b.y + b.h)} CSS px; cite as [asset:sections/${f}])` }, img(p));
}
const statesFile = path.join(out, 'explore', 'states.json'); // absent when the capture ran with --skip explore
const states = fs.existsSync(statesFile) ? JSON.parse(read(statesFile)) : { transitions: [] };
for (const t of states.transitions || []) {
  const p = t.shot && path.join(out, t.shot);
  if (!p || !fs.existsSync(p)) continue;
  const size = Math.ceil(fs.statSync(p).size * 4 / 3);
  if (size > budget) { skipped++; continue; } // ponytail: hard byte budget, use the Files API if big screens lose too many state pictures
  budget -= size;
  parts.push({ text: `state picture ${t.shot} (behavior ${t.id})` }, img(p));
}

const schema = { type: 'OBJECT', properties: { ui_spec: { type: 'STRING' }, tasks: { type: 'STRING' } }, required: ['ui_spec', 'tasks'] };
const contents = [{ role: 'user', parts }];
async function ask() {
  let res, body;
  // "high demand" (503) / rate limits (429) are usually gone in a minute: retry with a growing pause instead of losing a 5-minute run
  for (let attempt = 0; ; attempt++) {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents,
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json', responseSchema: schema, maxOutputTokens: 65536 } }),
    });
    body = await res.json();
    if (res.ok || ![429, 500, 502, 503, 504].includes(res.status) || attempt >= 4) break;
    const wait = [10, 20, 40, 60][attempt];
    console.log(`  Gemini ${res.status} (${body.error?.message?.slice(0, 60) || 'busy'}): retrying in ${wait}s`);
    await new Promise((r) => setTimeout(r, wait * 1000));
  }
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${body.error?.message || JSON.stringify(body).slice(0, 300)}`);
  const cand = body.candidates?.[0];
  const text = cand?.content?.parts?.map((p) => p.text || '').join('');
  if (!text) throw new Error(`no answer (finishReason ${cand?.finishReason}, block ${body.promptFeedback?.blockReason})`);
  contents.push({ role: 'model', parts: [{ text }] });
  try { return JSON.parse(text); } catch { throw new Error(`answer was not JSON (finishReason ${cand.finishReason}): output cut off? try a model with a bigger output`); }
}

const spec = path.join(out, 'spec');
fs.mkdirSync(spec, { recursive: true });
console.log(`${screen}: ${model}, ${shots.length} screenshot(s), ${nCrops} section crop(s), ${parts.filter((p) => p.inline_data).length - shots.length - nCrops} state picture(s)${skipped ? `, ${skipped} skipped (size)` : ''}`);
let r, round = 0;
for (;;) {
  let a;
  try { a = await ask(); }
  catch (e) { if (round > 0) { console.log(`  repair round failed (${e.message.slice(0, 120)}); keeping the previous version`); break; } throw e; }
  fs.writeFileSync(path.join(spec, 'UI_SPEC.md'), a.ui_spec);
  fs.writeFileSync(path.join(spec, 'tasks.md'), a.tasks);
  r = check(screen);
  console.log(`  round ${round}: ${r.pass ? '✓' : '✗'} controls ${r.coverage.controls}, behaviors ${r.coverage.transitions}, validators ${r.coverage.validators}, motion ${r.coverage.motion}, ${r.unknownMarkers} [UNKNOWN]`);
  if (r.pass || round++ >= repairs) break;
  const { missing, unknown, untagged, missingSections, tasksFile } = r;
  contents.push({ role: 'user', parts: [{ text: `The gate failed. Fix every item and return both files again, complete.\n${JSON.stringify({ missing, invented: unknown, untagged, missingSections, tasksFile }, null, 1)}` }] });
}
fs.writeFileSync(path.join(spec, 'gemini.json'), JSON.stringify({ model, rounds: round, at: new Date().toISOString(), pass: r.pass }, null, 1));
if (!r.pass) console.log(`  still failing: see spec/coverage.json, or run npm run check -- ${screen}`);
process.exit(r.pass ? 0 : 1);
