// The AI writer, run the way the client's csharp-doc-agent runs it: one command template with {workdir}, e.g.
//   powershell -NoProfile -ExecutionPolicy Bypass -File C:\UI-specs\start_codex.ps1 exec -c web_search=disabled --skip-git-repo-check -C {workdir}
// The prompt goes on stdin (do not end the template with a bare "-": PowerShell treats it as a bad switch and the writer
// fails silently). If stdin does not reach the model, put {prompt} in the template: it becomes one quoted sentence that
// points at the prompt file. Every call gets a log file with the command, the prompt and the output.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './paths.mjs';

// Windows PowerShell 5.1 re-encodes piped stdin with an ASCII/OEM code page: anything else would reach Codex as "?"
const ASCII = { '—': '-', '–': '-', '…': '...', '✓': 'OK', '✗': 'X', '→': '->', '←': '<-', '×': 'x', '≥': '>=', '≤': '<=', '±': '+/-', '‘': "'", '’': "'", '“': '"', '”': '"', '•': '-' };
const toAscii = (s) => s.replace(/[^\x00-\x7f]/g, (c) => ASCII[c] ?? (c.normalize('NFD').replace(/[^\x00-\x7f]/g, '') || '?'));

const quote = (s) => (/[\s"&|<>^]/.test(s) ? `"${s.replaceAll('"', '\\"')}"` : s);

// the client layout: UI-specs/{final-playwright, .env, start_codex.ps1}
export function defaultWriter() {
  const ps1 = path.resolve(ROOT, '..', 'start_codex.ps1');
  if (fs.existsSync(ps1)) return `powershell -NoProfile -ExecutionPolicy Bypass -File ${quote(ps1)} exec -c web_search=disabled --skip-git-repo-check -C {workdir}`;
  return 'codex exec --full-auto --skip-git-repo-check -C {workdir}';
}

export const fill = (name, vars) => fs.readFileSync(path.join(ROOT, 'prompts', `${name}.md`), 'utf8')
  .replace(/\{\{(\w+)\}\}/g, (all, k) => (k in vars ? String(vars[k] ?? '') : all));

// resolves { code, timedOut, ms }
export function runWriter({ cmd, workdir, prompt, logFile, timeoutSec = 3600, echo = false }) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  const promptFile = logFile.replace(/\.log$/, '') + '.prompt.md';
  fs.writeFileSync(promptFile, prompt);
  const line = cmd.replaceAll('{workdir}', quote(workdir))
    .replaceAll('{prompt}', quote(`Read the file ${promptFile} and do exactly what it says.`));
  const log = fs.createWriteStream(logFile);
  log.write(`$ ${line}\n(prompt: ${promptFile})\n--- output ---\n`);
  const t0 = Date.now();
  return new Promise((resolve) => {
    // the portal credentials never reach the writer (they may sit in this process's environment)
    const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => !/^(UI_USERNAME|UI_PASSWORD|PASSWORD)$/i.test(k)));
    const p = spawn(line, { cwd: workdir, shell: true, windowsHide: true, env });
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(p.pid), '/T', '/F']); else p.kill('SIGKILL');
    }, timeoutSec * 1000);
    for (const st of [p.stdout, p.stderr]) st.on('data', (b) => { log.write(b); if (echo) process.stdout.write(b); });
    p.stdin.on('error', () => {}); // a writer that never reads stdin
    p.stdin.end(cmd.includes('{prompt}') ? '' : toAscii(prompt)); // the prompt file keeps the UTF-8 original
    let finished = false;
    const done = (code) => { if (finished) return; finished = true; clearTimeout(timer); log.end(`\n--- exit ${code}${timedOut ? ' (timed out)' : ''} ---\n`); resolve({ code, timedOut, ms: Date.now() - t0 }); };
    p.on('error', (e) => { log.write(`spawn error: ${e.message}\n`); done(-1); });
    p.on('close', done);
  });
}

export const tail = (file, n = 25) => { try { return fs.readFileSync(file, 'utf8').trimEnd().split('\n').slice(-n).join('\n'); } catch { return ''; } };
