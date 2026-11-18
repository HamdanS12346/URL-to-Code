// Preflight: which data-testid keys does spec/parity.spec.ts use that nothing in app/ carries? (seconds, no browser)
import fs from 'node:fs';
import path from 'node:path';

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.name === 'assets' ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : /\.[jt]sx?$/.test(e.name) ? [path.join(d, e.name)] : []);

export function appKeys(appDir) {
  const keys = new Set();
  let dynamic = false;
  if (!fs.existsSync(appDir)) return { keys, dynamic };
  for (const f of walk(appDir)) {
    const s = fs.readFileSync(f, 'utf8');
    if (/data-testid=\{/.test(s)) dynamic = true;
    for (const m of s.matchAll(/data-testid=["']([^"']+)["']/g)) keys.add(m[1]);
    if (/\.[jt]s$/.test(f)) for (const m of s.matchAll(/["'`]([\w-]+)["'`]/g)) keys.add(m[1]); // behavior.ts may set ids by hand
  }
  return { keys, dynamic };
}

export function preflight(outDir) {
  const specFile = path.join(outDir, 'spec', 'parity.spec.ts');
  if (!fs.existsSync(specFile)) return null;
  const spec = fs.readFileSync(specFile, 'utf8');
  const used = new Set([...spec.matchAll(/(?:el|isDisabled)\(page, "([^"]+)"/g), ...spec.matchAll(/"key":"([^"]+)"/g)].map((m) => m[1]));
  // the screen's own app/ (npm run port), else the pack's app (src/screens/<screen>, src/shell: Vite's layout)
  const pack = outDir.match(/^(.*)[\\/]screens[\\/]([^\\/]+)$/);
  let app = pack && path.join(pack[1], 'app');
  try { app = JSON.parse(fs.readFileSync(path.join(pack[1], 'pack.json'), 'utf8')).outRepo || app; } catch { /* not a pack, or no pack.json */ }
  const dirs = [path.join(outDir, 'app'), ...(pack ? [path.join(app, 'src', 'screens', pack[2]), path.join(app, 'src', 'shell')] : [])];
  const found = dirs.map(appKeys);
  const keys = new Set(found.flatMap((f) => [...f.keys])), dynamic = found.some((f) => f.dynamic);
  return { used: used.size, missing: [...used].filter((k) => !keys.has(k)).sort(), dynamic };
}

export function reportPreflight(outDir, outFile) {
  const p = preflight(outDir);
  if (!p) return null;
  if (outFile) fs.writeFileSync(outFile, JSON.stringify(p, null, 2));
  if (!p.used) return p; // no parity keys (a site-kit screen): nothing to report, and "0 keys" only misleads the writer
  const head = p.missing.slice(0, 8).join(', ') + (p.missing.length > 8 ? ` (+${p.missing.length - 8})` : '');
  console.log(`preflight: parity.spec.ts uses ${p.used} keys, ${p.missing.length} carried by no data-testid in app/${p.missing.length ? ': ' + head : ''}${p.dynamic ? ' [app builds some data-testids dynamically: list may over-report]' : ''}`);
  return p;
}
