// Where a screen's files live. A plain name is the one-screen flow: outputs/<name>.
// "<pack>/<name>" is a screen of a pack (npm run ui): packs/<pack>/screens/<name>.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const packDir = (pack) => path.join(ROOT, 'packs', pack);
export const screenDir = (id) => {
  const [a, b] = String(id).split(/[\\/]/);
  return b ? path.join(packDir(a), 'screens', b) : path.join(ROOT, 'outputs', a);
};
// repo-relative, forward slashes: for messages and for paths other tools resolve from the repo root
export const relDir = (id) => path.relative(ROOT, screenDir(id)).replaceAll('\\', '/');
