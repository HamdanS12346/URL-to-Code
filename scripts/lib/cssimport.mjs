// Shared by snapshot.mjs (capture time) and port.mjs (re-port of an older capture).
import fs from 'node:fs';
import path from 'node:path';

// A saved stylesheet may @import others (a site's header and footer styles are often pulled in that way). The browser only
// honors an @import at the very top of a sheet, and used.css is many sheets in one file: paste each imported sheet in place,
// resolved against the sheet that imported it. Imports that were not saved stay as a comment saying so.
export function inlineImports(css, base, assets, out, seen = new Set(), depth = 0) {
  const re = /@import\s+(?:url\(\s*(["']?)([^)"']+)\1\s*\)|(["'])([^"']+)\3)\s*([^;]*);/g;
  return css.replace(re, (all, _q, u1, _q2, u2, media) => {
    let href;
    try { href = new URL(u1 || u2, base).href; } catch { return `/* @import ${u1 || u2}: not a valid address */`; }
    if (seen.has(href)) return '';
    const a = assets[href], f = a && path.join(out, 'capture', a.file);
    if (!f || !fs.existsSync(f) || depth >= 4) return `/* @import ${href}: not saved */`;
    seen.add(href);
    const text = inlineImports(fs.readFileSync(f, 'utf8'), href, assets, out, seen, depth + 1);
    const mq = media.trim();
    return `/* ==== @import ${href} ==== */\n${mq && mq !== 'all' ? `@media ${mq} {\n${text}\n}` : text}`;
  });
}
