#!/usr/bin/env node
// npm run check:writer [-- --writer "<command with {workdir}>"] [--timeout S]
// Can the writer (Codex through start_codex.ps1) do what `npm run ui` needs? One small task in a temp folder tests:
// it gets the prompt, writes files in {workdir}, runs a command, reads a file outside {workdir}, and looks at a picture.
// Prints one ✓/✗ line per ability, with the fix (see lookout.md). Exit 1 when anything fails.
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from './lib/paths.mjs';
import { readEnv } from './lib/portal.mjs';
import { defaultWriter, runWriter, tail } from './lib/writer.mjs';

const argv = process.argv.slice(2);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const env = readEnv(path.join(ROOT, '.env'));
const writer = opt('--writer') || env.WRITER || defaultWriter();

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'writer-check-'));
const work = path.join(base, 'work'), outside = path.join(base, 'outside');
fs.mkdirSync(work); fs.mkdirSync(outside);
const token = crypto.randomBytes(6).toString('hex');
fs.writeFileSync(path.join(outside, 'token.txt'), token);
const picture = path.join(outside, 'colour.png');
const b = await chromium.launch({ channel: readConfig().browserChannel || undefined });
const p = await b.newPage({ viewport: { width: 200, height: 200 } });
await p.setContent('<body style="margin:0;background:#e00000"></body>');
await p.screenshot({ path: picture });
await b.close();

const ans = (f) => path.join(work, 'answers', f);
const prompt = `Task: writer-check
You are running unattended: nobody will answer questions. Do these four things in this folder, then stop.
1. Create the file answers/written.txt containing the word OK.
2. Run the command \`node -v\` and write what it prints into answers/node.txt.
3. Read the file ${path.join(outside, 'token.txt')} and write its exact contents into answers/token.txt.
4. Look at the picture ${picture} with your image viewer and write the one colour word that fills it (in English, lower case) into answers/colour.txt.
`;
console.log(`writer: ${writer}\nworkdir: ${work}\nrunning (up to ${opt('--timeout') ?? 600}s)…`);
const logFile = path.join(base, 'writer.log');
const w = await runWriter({ cmd: writer, workdir: work, prompt, logFile, timeoutSec: +(opt('--timeout') ?? 600), echo: argv.includes('--verbose') });
const read = (f) => {
  try {
    const b = fs.readFileSync(ans(f));
    if (!b.length) return '';
    // Windows PowerShell redirection/Out-File often produces UTF-16LE.
    const s =
      b[0] === 0xff && b[1] === 0xfe ? b.toString('utf16le') :
      b[0] === 0xfe && b[1] === 0xff ? b.toString('utf16le') : // best-effort
      b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf ? b.toString('utf8') :
      b.toString('utf8');
    return s.replace(/^﻿/, '').trim();
  } catch {
    return null;
  }
};

const checks = [
  ['the writer starts and exits cleanly', w.code === 0 && !w.timedOut, `exit ${w.code}${w.timedOut ? ' (timed out)' : ''}. Wrong path to start_codex.ps1, a bare "-" at the end, or the model/base URL in the Codex .env (lookout.md: W1, W2)`],
  ['it got the prompt and can write files in {workdir}', read('written.txt')?.toUpperCase() === 'OK', 'nothing written: the prompt did not arrive (put {prompt} in the writer command) or the sandbox is read-only (add --full-auto) (lookout.md: W3, W4)'],
  ['it can run commands', /^v\d+/.test(read('node.txt') || ''), 'no `node -v` output: commands are blocked or node is not on its PATH (lookout.md: W5)'],
  ['it can read files outside {workdir}', read('token.txt') === token, 'could not copy the token: reads outside the folder are blocked; the code step reads the specs from packs/ (lookout.md: W6)'],
  ['it can look at pictures', /red/i.test(read('colour.txt') || ''), `answered "${read('colour.txt') ?? 'nothing'}" for a red picture: no image viewing, so plans and specs are written from text only (lookout.md: W7)`],
];
for (const [what, ok, fix] of checks) console.log(`${ok ? '✓' : '✗'} ${what}${ok ? '' : `\n    ${fix}`}`);
const bad = checks.filter((c) => !c[1]).length;
if (bad) console.log(`\nwriter log (${logFile}), last lines:\n${tail(logFile, 30)}`);
else fs.rmSync(base, { recursive: true, force: true });
console.log(bad ? `\n${bad} of ${checks.length} failed` : '\nwriter OK: npm run ui can use it');
process.exit(bad ? 1 : 0);

function readConfig() { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8')); } catch { return {}; } }
