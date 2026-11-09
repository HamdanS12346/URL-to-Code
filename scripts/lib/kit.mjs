// Site kits: what the tool knows about one family of sites (kits/<name>/kit.mjs). The scripts stay site-agnostic and
// only call the hooks a kit exports: detect, config, prepare, explore, factsSection, required, prompt, appDir, guide.
// A pack names its kit in pack.json ("kit": "provider"); `npm run ui` finds it by asking every kit's detect().
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './paths.mjs';

const cache = new Map();
export const kitNames = () => (fs.existsSync(path.join(ROOT, 'kits')) ? fs.readdirSync(path.join(ROOT, 'kits')).filter((d) => fs.existsSync(path.join(ROOT, 'kits', d, 'kit.mjs'))) : []);

export async function loadKit(name) {
  if (!name) return null;
  if (!cache.has(name)) {
    const f = path.join(ROOT, 'kits', name, 'kit.mjs');
    if (!fs.existsSync(f)) throw new Error(`no kit "${name}" (kits/${name}/kit.mjs)`);
    cache.set(name, await import(pathToFileURL(f).href));
  }
  return cache.get(name);
}

// the first kit whose detect() says yes for this (loaded) page
export async function detectKit(page) {
  for (const n of kitNames()) if (await (await loadKit(n)).detect(page)) return n;
  return null;
}

// a screen folder captured with a kit carries kit/screen.json and run.json's "kit"
export async function kitOf(out) {
  try { return await loadKit(JSON.parse(fs.readFileSync(path.join(out, 'run.json'), 'utf8')).kit); } catch { return null; }
}
