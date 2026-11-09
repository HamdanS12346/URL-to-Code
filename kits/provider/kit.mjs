// The Provider kit: what this tool knows about portals built on ASP.NET MVC + Kendo UI for jQuery (Gainwell MMS and
// its look-alikes). scripts/ stays site-agnostic; everything that knows "Kendo" or "Provider" lives in kits/provider/.
//   detect(page)      is this such a portal? (window.kendo + jQuery)
//   config            capture settings for it: no motion sampling, a short warm-up, no survey/plan/explore (the harvest replaces them)
//   prepare(ctx)      before the freeze: read every widget from Kendo itself and stamp the DOM (harvest.js); find the side menu
//   explore(ctx)      after the snapshot: the safe clicks (open a dropdown, hover a help icon, Search, the first row, Create New),
//                     each recorded as a template + a picture. Save/Delete/Update are never clicked.
// Writes <screen>/kit/: screen.json, dialogs/<id>.html, states/*.png, states.json (what verify replays on the rebuild).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HARVEST = fs.readFileSync(new URL('./harvest.js', import.meta.url), 'utf8');
export const name = 'provider';
export const appDir = fileURLToPath(new URL('./app/', import.meta.url));
export const guide = fileURLToPath(new URL('./KIT.md', import.meta.url));

// what a Provider screen does not need: animation numbers come from Kendo's own options, and these pages have no
// autoplay motion, video or scroll effects; the harvest replaces the survey -> plan -> explore loop
export const config = {
  motion: { sampleSec: 0 },
  warmup: { stepFrac: 1, pauseMs: 150, maxSteps: 6, stableMs: 300, maxStableSec: 3 },
  skipSteps: ['fidelity', 'survey', 'plan', 'explore'],
  fullCss: true, // the port takes every rule of the portal's stylesheets: open lists, tooltips and dialogs need rules the page at rest does not use
  transient: '.k-animation-container, .k-tooltip, .k-list-container, .k-calendar-container', // open at rest only by accident (the mouse sat on the logo)
};

export async function detect(page) {
  return page.evaluate(() => !!(window.kendo && window.jQuery && window.kendo.ui)).catch(() => false);
}

const inject = (page) => page.evaluate((src) => { if (!window.__kit) (0, eval)(src); }, HARVEST);
const writeJson = (f, o) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1)); };
const readJson = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null);

// the side menu (hamburger): open it once, stamp what appeared, close it again, so the rebuild knows what to show
async function sideMenu(page, sel, log) {
  const btn = page.locator(sel).first();
  if (!(await btn.isVisible().catch(() => false))) return null;
  await page.evaluate(() => { window.__kitShown = new Set([...document.body.querySelectorAll('*')].filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden')); });
  await btn.click({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(900);
  const found = await page.evaluate(() => {
    const was = window.__kitShown, roots = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (was.has(el) || !el.getClientRects().length || getComputedStyle(el).visibility === 'hidden') continue;
      if (roots.some((r) => r.contains(el))) continue;
      roots.push(el);
    }
    roots.forEach((r) => r.setAttribute('data-kit-menu', getComputedStyle(r).display));
    const close = roots.flatMap((r) => [...r.querySelectorAll('.fa-xmark, .fa-times, .fa-x, .k-i-close, [aria-label*=close i]')])[0]
      || [...document.querySelectorAll('.fa-xmark, .fa-times')].find((e) => e.getClientRects().length && !was.has(e));
    if (close) close.setAttribute('data-kit-action', 'menu-close');
    return { roots: roots.map((r) => r.tagName.toLowerCase() + (r.id ? '#' + r.id : '') + (typeof r.className === 'string' && r.className.trim() ? '.' + r.className.trim().split(/\s+/)[0] : '')), close: !!close };
  });
  const hidden = () => page.evaluate(() => [...document.querySelectorAll('[data-kit-menu]')].every((r) => !r.getClientRects().length || getComputedStyle(r).visibility === 'hidden'));
  for (const how of ['[data-kit-action=menu-close]', sel, 'Escape']) { // close it: its close icon, else the same button, else Escape
    if (await hidden()) break;
    if (how === 'Escape') await page.keyboard.press('Escape'); else await page.locator(how).first().click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(900);
  }
  if (!(await hidden())) { log('  ! kit: the side menu did not close again: the snapshot shows it open'); return { ...found, closed: false }; }
  await btn.evaluate((e) => e.setAttribute('data-kit-action', 'menu')).catch(() => {});
  return { ...found, closed: true };
}

export async function prepare({ page, cfg, log }) {
  await inject(page);
  const k = cfg.kit || {};
  const menu = k.menuButton ? await sideMenu(page, k.menuButton, log).catch((e) => (log(`  ! kit: side menu: ${e.message.split('\n')[0]}`), null)) : null;
  const rest = await page.evaluate((a) => window.__kit.rest(a), { scope: k.scope || null, module: k.module || null });
  const defaults = await page.evaluate(() => window.__kit.defaults());
  log(`  kit (provider): Kendo ${rest.kendo}, ${Object.keys(rest.widgets).length} widgets (${Object.values(rest.widgets).map((w) => w.kind).join(', ') || 'none'}), ${rest.fields.length} fields, ${rest.actions.length} actions, ${rest.hidden.length} hidden parts${menu ? `, side menu ${menu.roots.join(' + ')}` : ''}`);
  return { ...rest, defaults, menu };
}

// after the snapshot: the clicks. No reload in between: the stamps must survive
export async function explore({ page, context, s, out, log, kit }) {
  const dir = path.join(out, 'kit');
  fs.rmSync(dir, { recursive: true, force: true });
  for (const d of ['states', 'dialogs']) fs.mkdirSync(path.join(dir, d), { recursive: true });
  await context.clock.resume().catch(() => {}); // the freeze paused time: Kendo's animations and the page's timers must run again
  const { defaults, ...rest } = kit;
  const screen = { ...rest, calibration: { defaults }, grids: {}, dialogs: {}, search: null, row: null, requests: {} };
  const states = [];
  const shot = async (nm, clip) => {
    await page.screenshot({ path: path.join(dir, 'states', `${nm}.png`), animations: 'disabled', caret: 'hide', ...(clip ? { clip } : {}) }).catch(() => {});
    return `states/${nm}.png`;
  };
  const box = (sels) => page.evaluate((ss) => {
    const bs = ss.flatMap((s) => [...document.querySelectorAll(s)]).filter((e) => e.getClientRects().length).map((e) => e.getBoundingClientRect()).filter((b) => b.width && b.height);
    if (!bs.length) return null;
    const x = Math.max(0, Math.min(...bs.map((b) => b.left)) - 8), y = Math.max(0, Math.min(...bs.map((b) => b.top)) - 8);
    const r = { x, y, width: Math.min(innerWidth - x, Math.max(...bs.map((b) => b.right)) - x + 8), height: Math.min(innerHeight - y, Math.max(...bs.map((b) => b.bottom)) - y + 8) };
    return r.width > 4 && r.height > 4 ? r : null;
  }, sels);
  const requestsSince = (t) => s.guard.events.filter((e) => e.at >= t && /request|postback/.test(e.type) && e.url && !/\.(js|css|png|gif|svg|woff2?)(\?|$)/i.test(e.url))
    .map((e) => ({ method: e.method || 'GET', url: e.url.replace(/^https?:\/\/[^/]+/, '').split('?')[0], params: e.post && typeof e.post === 'object' ? Object.keys(e.post) : [] }));
  const visibleWindow = () => page.evaluate(() => [...document.querySelectorAll('.k-window')].some((w) => w.getClientRects().length && getComputedStyle(w).visibility !== 'hidden'));

  // 1. one dropdown open: Kendo's real popup markup + a picture
  const dd = Object.entries(kit.widgets).find(([, w]) => w.kind === 'dropdown' && w.enabled);
  if (dd) {
    const [id] = dd;
    await page.locator(`[data-kit="${id}"]`).scrollIntoViewIfNeeded().catch(() => {});
    if (await page.evaluate((i) => window.__kit.openPopup(i), id)) {
      await page.waitForTimeout(600);
      screen.calibration.dropdownPopup = await page.evaluate((i) => window.__kit.popupHtml(i), id);
      const clip = await box([`[data-kit="${id}"]`, '.k-list-container']);
      states.push({ name: 'dropdown', steps: [{ do: 'click', sel: `[data-kit="${id}"]` }], wait: 600, clip, shot: await shot('dropdown', clip) });
      await page.evaluate((i) => window.__kit.closePopup(i), id);
      await page.waitForTimeout(400);
    }
  }
  // 2. a date picker open (its calendar markup)
  const dp = Object.entries(kit.widgets).find(([, w]) => /date/.test(w.kind) && w.enabled);
  if (dp && await page.evaluate((i) => window.__kit.openPopup(i), dp[0]).catch(() => false)) {
    await page.waitForTimeout(600);
    screen.calibration.calendarPopup = await page.evaluate((i) => window.__kit.popupHtml(i), dp[0]);
    await page.evaluate((i) => window.__kit.closePopup(i), dp[0]);
    await page.waitForTimeout(400);
  }
  // 3. a help icon hovered: the tooltip's real markup, delay and a picture
  const tips = page.locator('[data-kit-tip]');
  for (let i = 0, n = Math.min(await tips.count(), 8); i < n; i++) {
    const t = tips.nth(i);
    if (!(await t.isVisible().catch(() => false))) continue;
    await t.scrollIntoViewIfNeeded().catch(() => {});
    await t.hover({ timeout: 2000 }).catch(() => {});
    const after = +(await t.getAttribute('data-kit-tip-after')) || 100;
    await page.waitForTimeout(after + 500);
    const html = await page.evaluate(() => window.__kit.tooltipHtml());
    if (!html) { await page.mouse.move(0, 0); continue; }
    screen.calibration.tooltip = html;
    // the distance Kendo leaves between the target and its tooltip (the callout sits in it)
    const gap = await t.evaluate((el) => { const tt = [...document.querySelectorAll('.k-tooltip')].find((e) => e.getClientRects().length); if (!tt) return null; const a = el.getBoundingClientRect(), b = tt.getBoundingClientRect(); return Math.round(b.top >= a.bottom ? b.top - a.bottom : a.top - b.bottom); });
    if (gap != null && gap >= 0 && gap < 40) screen.calibration.defaults = { ...screen.calibration.defaults, tooltipGap: gap };
    const clip = await box(['.k-tooltip']).then((b) => b && { x: Math.max(0, b.x - 40), y: Math.max(0, b.y - 10), width: b.width + 80, height: b.height + 60 });
    states.push({ name: 'tooltip', steps: [{ do: 'hover', sel: '[data-kit-tip]', nth: i }], wait: after + 500, clip, shot: await shot('tooltip', clip) });
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);
    break;
  }
  // 4. Search: the results (grid templates, what became visible, which endpoint was called)
  const search = page.locator('[data-kit-action=search]:visible').first();
  if (await search.count()) {
    const t0 = Date.now();
    await search.click({ timeout: 3000 }).catch(() => {});
    await s.settle(300, 6000);
    await page.waitForTimeout(500);
    screen.grids = await page.evaluate(() => window.__kit.grids());
    screen.search = { reveals: await page.evaluate(() => window.__kit.revealed()), requests: requestsSince(t0) };
    screen.requests.search = screen.search.requests[0] || null;
    await page.evaluate(() => scrollTo(0, 0));
    states.push({ name: 'search', steps: [{ do: 'click', sel: '[data-kit-action=search]' }], wait: 1200, full: true, shot: await shot('search') });
    const g = Object.values(screen.grids)[0];
    log(`  kit: Search -> ${Object.keys(screen.grids).length} grid(s)${g ? `, ${g.total} rows, ${g.rowCount} shown` : ''}, revealed ${screen.search.reveals.length} part(s), ${screen.search.requests.length} request(s)`);
  }
  // 5. Create New (and the first row's edit/detail): each dialog harvested, then closed. Never Save.
  let dn = 0;
  const harvestDialog = async (label, nested) => {
    if (!(await page.waitForFunction(() => [...document.querySelectorAll('.k-window')].some((w) => w.getClientRects().length), null, { timeout: 6000 }).then(() => true, () => false))) return null;
    await page.waitForTimeout(700);
    const d = await page.evaluate(() => window.__kit.dialog());
    if (!d) return null;
    const id = `d${++dn}`;
    fs.writeFileSync(path.join(dir, 'dialogs', `${id}.html`), d.contentHtml);
    delete d.contentHtml;
    screen.dialogs[id] = { ...d, opener: label, children: [] };
    await shot(`dialog-${id}`);
    if (!nested) { // a Create New inside the dialog (Destination Configuration): one level down
      const inner = page.locator('.k-window [data-kit-action=create]:visible');
      for (let i = 0, n = Math.min(await inner.count(), 3); i < n; i++) {
        const t0 = Date.now();
        await inner.nth(i).click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(500);
        const count = await page.evaluate(() => [...document.querySelectorAll('.k-window')].filter((w) => w.getClientRects().length).length);
        if (count < 2) continue;
        const sub = await harvestDialog(`${label} > create ${i + 1}`, true);
        if (!sub) continue;
        Object.assign(screen.dialogs[sub], { parent: id, requests: requestsSince(t0) });
        screen.dialogs[id].children.push(sub);
        await page.evaluate(() => window.__kit.closeDialog());
        await page.waitForTimeout(800);
      }
    }
    return id;
  };
  const create = page.locator('[data-kit-action=create]:visible');
  const creates = await create.count();
  for (let i = 0; i < Math.min(creates, 3); i++) {
    const el = create.nth(i);
    if (await el.evaluate((e) => !!e.closest('.k-window')).catch(() => true)) continue;
    const t0 = Date.now();
    await el.click({ timeout: 3000 }).catch(() => {});
    const id = await harvestDialog(`Create New #${i + 1}`, false);
    if (!id) { log(`  ! kit: Create New #${i + 1} opened no dialog`); continue; }
    screen.dialogs[id].requests = requestsSince(t0);
    screen.dialogs[id].openerIndex = i;
    // replayed in the order it happened here: after Search (the page behind the dialog shows the results)
    states.push({ name: `dialog-${id}`, steps: [...(screen.search ? [{ do: 'click', sel: '[data-kit-action=search]' }] : []), { do: 'click', sel: '[data-kit-action=create]', nth: i }], wait: 1200, shot: `states/dialog-${id}.png` });
    for (let tries = 0; tries < 3 && await visibleWindow(); tries++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
  }
  // the first row of the first grid: an edit/detail dialog, or a link to another page (recorded, not followed)
  if (Object.keys(screen.grids).length) {
    const row = page.locator('[data-kit] tbody tr:not(.k-grid-norecords)').first();
    if (await row.count()) {
      const target = row.locator('a[href]:not([href^="javascript:void"]), a.k-grid-edit, button, .clickable').first();
      const t0 = Date.now(), nav0 = s.guard.events.length;
      await ((await target.count()) ? target : row).click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(800);
      const id = (await visibleWindow()) ? await harvestDialog('the first grid row', false) : null;
      const nav = s.guard.events.slice(nav0).find((e) => e.type === 'navigation');
      screen.row = { dialog: id, navigates: nav ? nav.url.replace(/^https?:\/\/[^/]+/, '') : null, requests: requestsSince(t0), via: (await target.count()) ? 'link' : 'row' };
      if (id) {
        screen.dialogs[id].requests = screen.row.requests;
        states.push({ name: `row-${id}`, steps: [{ do: 'click', sel: '[data-kit-action=search]' }, { do: 'click', sel: '[data-kit-row="0"]' }], wait: 1200, shot: `states/dialog-${id}.png` });
        for (let tries = 0; tries < 3 && await visibleWindow(); tries++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
      }
      log(`  kit: first row -> ${id ? `dialog ${id} "${screen.dialogs[id].title}"` : nav ? `navigates to ${screen.row.navigates} (not followed)` : 'nothing'}`);
    }
  }
  log(`  kit: ${Object.keys(screen.dialogs).length} dialog(s) ${Object.values(screen.dialogs).map((d) => `"${d.title}"`).join(', ')}; ${states.length} state picture(s)`);
  writeJson(path.join(dir, 'screen.json'), screen);
  writeJson(path.join(dir, 'states.json'), states);
  return screen;
}

// facts.md: what the harvest found, for the spec writer
export function factsSection(out) {
  const k = readJson(path.join(out, 'kit', 'screen.json'));
  if (!k) return '';
  const w = (def) => `${def.label || def.name || def.id || '?'} (${def.kind}${def.required ? ', required' : ''}${def.optionLabel ? `, placeholder "${def.optionLabel}"` : ''}${def.items?.length ? `, ${def.items.length} options: ${def.items.slice(0, 8).map((i) => i.text).join(' | ')}${def.items.length > 8 ? ' …' : ''}` : ''}${def.format ? `, format ${def.format}` : ''}${def.help ? `, help "${def.help}"` : ''})`;
  const dlgWidgets = (d) => Object.entries(d.widgets).map(([id, def]) => `[kit:${id}] ${w(def)}`).join('; ');
  return [`\n## 18. Provider kit harvest (kit/screen.json)\n`, `Read from Kendo ${k.kendo} on the live page. The kit (src/kit) rebuilds every widget below: cite each as [kit:<id>].\n`,
    k.shell?.title ? `- Title bar: module "${k.shell.module ?? '?'}", title "${k.shell.title}"` : '',
    ...Object.entries(k.widgets).map(([id, def]) => (def.kind === 'grid' ? `- [kit:${id}] grid: ${def.columns.map((c) => `${c.title}${c.sortable ? ' (sortable)' : ''}${c.filterable ? ' (filter)' : ''}`).join(', ')}; page size ${def.pageSize}` : `- [kit:${id}] ${w(def)}`)),
    ...k.fields.filter((x) => Object.keys(x.validation).length).map((x) => `- field ${x.name}: validation ${Object.entries(x.validation).map(([r, m]) => `${r} "${m}"`).join('; ')}`),
    `- Actions: ${k.actions.map((a) => `${a.action} "${a.text}"`).join(', ') || 'none'}`,
    k.search ? `- Search reveals ${k.search.reveals.join(', ') || 'nothing'}; calls ${k.search.requests.map((r) => `${r.method} ${r.url}`).join(', ') || 'no endpoint'}` : '- No Search on this screen',
    ...Object.entries(k.grids).map(([id, g]) => `- [kit:${id}] after Search: ${g.total} rows, page size ${g.pageSize}; field types ${Object.entries(g.fields).map(([n, t]) => `${n}:${t.type}`).join(', ')} (rows in the rebuild are synthetic)`),
    ...Object.entries(k.dialogs).map(([id, d]) => `- [kit:${id}] dialog "${d.title}" (opened by ${d.opener}${d.parent ? `, inside ${d.parent}` : ''}): actions ${d.actions.map((a) => a.action).join('/')}; ${dlgWidgets(d)}; markup kit/dialogs/${id}.html, picture kit/states/dialog-${id}.png`),
    ...Object.values(k.dialogs).flatMap((d) => d.fields.filter((x) => Object.keys(x.validation).length).map((x) => `- dialog "${d.title}" field ${x.name}: validation ${Object.entries(x.validation).map(([r, m]) => `${r} "${m}"`).join('; ')}`)),
    k.row ? `- First grid row: ${k.row.dialog ? `opens dialog ${k.row.dialog}` : k.row.navigates ? `navigates to ${k.row.navigates} (another page, out of this screen)` : 'no effect'}` : ''].filter(Boolean).join('\n') + '\n';
}
// ids the spec must cite: every widget and dialog (dialog widgets too)
export function required(out) {
  const k = readJson(path.join(out, 'kit', 'screen.json'));
  if (!k) return null;
  return [...Object.keys(k.widgets), ...Object.keys(k.dialogs), ...Object.values(k.dialogs).flatMap((d) => Object.keys(d.widgets))];
}

export function prompt(kind, { dir }) {
  if (kind === 'spec') return `\nThis screen belongs to a Provider portal (Kendo UI for jQuery). Read ${guide} first. The harvest in ${dir}/kit/screen.json (section 18 of facts.md) is exact: field types, option lists, validation messages, grid columns, dialogs. Pictures of each state: ${dir}/kit/states/*.png. Cite every widget and dialog as [kit:<id>]. The kit builds the widgets: specify what they show and hold, not how to code a dropdown.`;
  if (kind === 'code') return `\nThis screen belongs to a Provider portal (Kendo UI for jQuery). Read ${guide} first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (${dir}/capture/js/), and anything the spec lists that the port does not show yet.`;
  return '';
}
