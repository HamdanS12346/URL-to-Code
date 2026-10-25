// Run a script from scripts/ with the project's python; returns the last stdout line parsed as JSON.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));

export function py(script, ...args) {
  let python = process.platform === 'win32' ? 'python' : 'python3';
  try { python = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8')).python || python; } catch {}
  const r = spawnSync(python, [path.isAbsolute(script) ? script : path.join(ROOT, 'scripts', script), ...args.map(String)], { encoding: 'utf8', maxBuffer: 1e8, env: { ...process.env, PYTHONUTF8: '1' } });
  if (r.error) throw new Error(`could not run ${python}: ${r.error.message} (set "python" in config.json)`);
  const out = (r.stdout || '').trim().split('\n').pop();
  let j;
  try { j = JSON.parse(out); } catch { throw new Error(`${script}: ${r.stderr || out}`); }
  if (r.status) throw new Error(j.error || r.stderr);
  return j;
}
