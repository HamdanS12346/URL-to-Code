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

// the side menu (hamburger): open it once and record how the page opens it (the classes its root swaps, the backdrop
// it appends, Kendo's menu timings), close it with its own close icon, and stamp all of it on the DOM so the port
// carries it and the kit replays it. The menu root is the newly shown element with the most links (a field that
// happens to appear at the same time is not the menu). Never re-click the opener to close: that opens it again.
async function sideMenu(page, sel, log) {
  const btn = page.locator(sel).first();
  if (!(await btn.isVisible().catch(() => false))) return null;
  await page.evaluate(() => {
    const all = [...document.body.querySelectorAll('*')];
    window.__kitShown = new Set(all.filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden'));
    window.__kitBefore = new Set(all);
    window.__kitCls = new Map(all.map((el) => [el, typeof el.className === 'string' ? el.className : '']));
  });
  await btn.click({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(900);
  const found = await page.evaluate(() => {
    const was = window.__kitShown, roots = [];
    const vis = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    for (const el of document.body.querySelectorAll('*')) {
      if (was.has(el) || !vis(el) || roots.some((r) => r.contains(el))) continue;
      roots.push(el);
    }
    const links = (r) => r.querySelectorAll('a[href], li').length;
    const root = roots.slice().sort((a, b) => links(b) - links(a))[0];
    if (!root || !links(root)) return null;
    // the backdrop: a new element that covers the page (appended on open, removed on close)
    const bd = roots.find((r) => r !== root && !window.__kitBefore.has(r) && /fixed|absolute/.test(getComputedStyle(r).position) && r.getBoundingClientRect().width >= innerWidth * 0.5);
    const before = (window.__kitCls.get(root) || '').split(/\s+/).filter(Boolean), now = (typeof root.className === 'string' ? root.className : '').split(/\s+/).filter(Boolean);
    const add = now.filter((c) => !before.includes(c)), remove = before.filter((c) => !now.includes(c));
    root.setAttribute('data-kit-menu', getComputedStyle(root).display);
    if (add.length || remove.length) { root.setAttribute('data-kit-menu-add', add.join(' ')); root.setAttribute('data-kit-menu-remove', remove.join(' ')); }
    if (bd) root.setAttribute('data-kit-menu-backdrop', bd.outerHTML.replace(/\s(style|data-kit[\w-]*)="[^"]*"/g, ''));
    try { // the live menu's own timings (hover delay before a module flies out, its open/close animation)
      const m = window.jQuery(root).find('[data-role=menu]').addBack('[data-role=menu]').first().data('kendoMenu');
      if (m) {
        const a = m.options.animation || {};
        root.setAttribute('data-kit-menu-hover', String(m.options.hoverDelay ?? 100));
        if (a.open?.duration != null) root.setAttribute('data-kit-menu-open-ms', String(a.open.duration));
        if (a.close?.duration != null) root.setAttribute('data-kit-menu-close-ms', String(a.close.duration));
      }
    } catch {}
    const close = root.querySelector('#mainMenuClose, .fa-xmark, .fa-times, .fa-x, .k-i-close, [aria-label*=close i]')
      || [...document.querySelectorAll('.fa-xmark, .fa-times')].find((e) => vis(e) && !was.has(e));
    if (close) close.setAttribute('data-kit-action', 'menu-close');
    const name = (r) => r.tagName.toLowerCase() + (r.id ? '#' + r.id : '');
    return { root: name(root), add, remove, backdrop: bd ? name(bd) + '.' + [...bd.classList].join('.') : null, close: !!close, links: root.querySelectorAll('a[href]').length };
  });
  if (!found) { log('  ! kit: the side menu button showed no menu'); return null; }
  await page.mouse.move(0, 0);
  found.shot = await page.screenshot({ animations: 'disabled', caret: 'hide' }).catch(() => null); // the live menu, open: verify compares the rebuild's
  const hidden = () => page.evaluate(() => { const r = document.querySelector('[data-kit-menu]'); return !r || !r.getClientRects().length || getComputedStyle(r).visibility === 'hidden'; });
  for (const how of ['[data-kit-action=menu-close]', 'Escape']) {
    if (await hidden()) break;
    if (how === 'Escape') await page.keyboard.press('Escape'); else await page.locator(how).first().click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(900);
  }
  let closed = await hidden();
  if (!closed) { // force the closed state the page itself would have: the classes back, the backdrop dropped from the port
    closed = await page.evaluate(() => {
      const r = document.querySelector('[data-kit-menu]');
      const add = (r.getAttribute('data-kit-menu-add') || '').split(' ').filter(Boolean), rm = (r.getAttribute('data-kit-menu-remove') || '').split(' ').filter(Boolean);
      if (add.length || rm.length) { r.classList.remove(...add); r.classList.add(...rm); } else r.style.display = 'none';
      const cls = /class="([^"]+)"/.exec(r.getAttribute('data-kit-menu-backdrop') || '')?.[1];
      if (cls) document.querySelectorAll('.' + cls.trim().split(/\s+/).map((c) => CSS.escape(c)).join('.')).forEach((e) => { e.setAttribute('data-kit-drop', ''); e.style.display = 'none'; });
      return !r.getClientRects().length;
    });
    log(`  ! kit: the side menu's close icon did not close it: ${closed ? 'closed it by its own classes' : 'it stays open in the snapshot (the kit closes it at runtime)'}`);
  }
  // the button and its twins: the portal has a second hamburger (.mobile-nav) that a media query shows below 1280 CSS px,
  // which is what a 1920 screen at 150% Windows scaling is
  await btn.evaluate((e) => {
    const twin = (t) => t === e || (e.className && t.className === e.className && t.getAttribute('aria-label') === e.getAttribute('aria-label'));
    for (const t of document.querySelectorAll(e.tagName)) if (twin(t)) t.setAttribute('data-kit-action', 'menu');
  }).catch(() => {});
  return { ...found, closed };
}

export async function prepare({ page, cfg, log }) {
  await inject(page);
  const k = cfg.kit || {};
  const menu = k.menuButton ? await sideMenu(page, k.menuButton, log).catch((e) => (log(`  ! kit: side menu: ${e.message.split('\n')[0]}`), null)) : null;
  const rest = await page.evaluate((a) => window.__kit.rest(a), { scope: k.scope || null, module: k.module || null });
  const defaults = await page.evaluate(() => window.__kit.defaults());
  log(`  kit (provider): Kendo ${rest.kendo}, ${Object.keys(rest.widgets).length} widgets (${Object.values(rest.widgets).map((w) => w.kind).join(', ') || 'none'}), ${rest.fields.length} fields, ${rest.actions.length} actions, ${rest.hidden.length} hidden parts${Object.keys(rest.unknown || {}).length ? `, widgets the kit does not rebuild yet: ${Object.entries(rest.unknown).map(([r, x]) => `${r} x${x.count}`).join(', ')}` : ''}${menu ? `, side menu ${menu.root} (${menu.links} links${menu.add.length ? `, opens by class ${menu.add.join(' ')}` : ''}${menu.backdrop ? ` + ${menu.backdrop}` : ''}${menu.closed ? '' : ', NOT closed'})` : ''}`);
  return { ...rest, defaults, menu };
}

// what the screen's own script says it can open, read from its source (the portal's conventions, seen on every module):
//   openModalOverlay("<panel>", url, ...)                       a dialog (a Kendo window on the element id <panel>)
//   $("#<button>").click(function () { ... openModalOverlay(    the button that opens it
//   setKendoGridDataBoundEvents(e, msg, <onClick>, <onDblClick>) what a grid row does on a click / double-click
// The capture then knows which dialogs it must have harvested, and that a row opens on double-click.
async function scriptPlan(page) {
  return page.evaluate(async () => {
    const lib = /kendo|jquery|bootstrap|modernizr|headroom|moment|\/hp\.ua3\.core\.|\/lib\/|\.min\.js/i;
    const texts = [...document.scripts].filter((s) => !s.src).map((s) => s.textContent || '');
    for (const s of [...document.scripts].filter((x) => x.src)) {
      let u;
      try { u = new URL(s.src, location.href); } catch { continue; }
      if (u.origin !== location.origin || lib.test(u.pathname)) continue;
      try { texts.push(await (await fetch(u.href, { credentials: 'same-origin' })).text()); } catch {}
    }
    const src = texts.join('\n;\n');
    const name = (x) => (x || '').trim().replace(/^["']|["']$/g, '');
    const fnBody = (fn) => { const m = new RegExp(`function\\s+${fn.replace(/[^\w$]/g, '')}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]{0,1500}?)\\n\\}`).exec(src) || new RegExp(`${fn.replace(/[^\w$]/g, '')}\\s*=\\s*function\\s*\\([^)]*\\)\\s*\\{([\\s\\S]{0,1500}?)\\n\\}`).exec(src); return m ? m[1] : ''; };
    const panelIn = (body) => /openModalOverlay\(\s*["']([\w-]+)["']/.exec(body)?.[1] || null;
    const dialogs = [];
    const add = (panel, opener, via) => { const d = dialogs.find((x) => x.panel === panel); if (d) { d.opener ||= opener; d.via ||= via; } else dialogs.push({ panel, opener, via }); };
    for (const m of src.matchAll(/\$\(\s*["']#([\w-]+)["']\s*\)\s*\.\s*(?:click|on\(\s*["']click["']\s*,)\s*\(?\s*function[^{]*\{([\s\S]{0,700}?)\}\s*\)/g)) {
      const p = panelIn(m[2]);
      if (p) add(p, `#${m[1]}`, 'click');
    }
    const bound = [...src.matchAll(/setKendoGridDataBoundEvents\(\s*[\w$]+\s*,([^,]*),([^,]*),([^,)]*)\)/g)].map((m) => ({ single: name(m[2]), double: name(m[3]) }))
      .map((b) => ({ single: /^(null|undefined|)$/.test(b.single) ? null : b.single, double: /^(null|undefined|)$/.test(b.double) ? null : b.double }));
    const rowDouble = bound.find((b) => b.double)?.double || null, rowSingle = bound.find((b) => b.single)?.single || null;
    const rowBody = rowDouble ? fnBody(rowDouble) : '';
    const rowPanel = panelIn(rowBody);
    if (rowPanel) add(rowPanel, null, 'row-dblclick');
    for (const m of src.matchAll(/openModalOverlay\(\s*["']([\w-]+)["']/g)) add(m[1], null, null);
    return { dialogs, rowDouble, rowSingle, rowOpens: rowPanel || (/location(\.href)?\s*=|window\.open\(/.test(rowBody) ? 'navigate' : null) };
  }).catch(() => ({ dialogs: [], rowDouble: null, rowSingle: null, rowOpens: null }));
}

// after the snapshot: the clicks. No reload in between: the stamps must survive
export async function explore({ page, context, s, out, log, kit }) {
  const dir = path.join(out, 'kit');
  fs.rmSync(dir, { recursive: true, force: true });
  for (const d of ['states', 'dialogs']) fs.mkdirSync(path.join(dir, d), { recursive: true });
  await context.clock.resume().catch(() => {}); // the freeze paused time: Kendo's animations and the page's timers must run again
  const { defaults, menu: menuFound, ...rest } = kit;
  const { shot: menuShot, ...menu } = menuFound || {};
  const screen = { ...rest, menu: menuFound ? menu : null, calibration: { defaults }, grids: {}, dialogs: {}, search: null, row: null, requests: {} };
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
  // a dialog loaded by AJAX can take several requests (the File Transfer Configuration editor: 5): wait while the page
  // is busy, up to 20 s; stop early once it has been quiet for a while with no window
  const waitWindow = async (max = 20000) => {
    const end = Date.now() + max;
    let idle = 0;
    while (Date.now() < end) {
      if (await visibleWindow()) return true;
      const busy = await page.evaluate(() => !!document.querySelector('.k-loading-mask, .k-loading-image, #loadingDialog:not([style*="none"])')).catch(() => false);
      const t = Date.now();
      await s.settle(0, 1500).catch(() => {});
      idle = busy || Date.now() - t > 1400 ? 0 : idle + (Date.now() - t);
      if (idle > 4000) break;
    }
    return visibleWindow();
  };
  // something on top of what we are about to click (the side menu's backdrop, a leftover overlay) takes the click and
  // the capture silently records "nothing happened": find it, close the menu, else hide it for the capture, and say so
  const coverOf = (loc) => loc.evaluate((el) => {
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (!top || el.contains(top) || top.contains(el)) return null;
    top.setAttribute('data-kit-cover', '');
    return top.tagName.toLowerCase() + (top.id ? `#${top.id}` : '') + (typeof top.className === 'string' && top.className.trim() ? `.${top.className.trim().split(/\s+/).join('.')}` : '');
  }).catch(() => null);
  const unblock = async (loc, what) => {
    const cover = await coverOf(loc);
    if (!cover) return true;
    log(`  ! kit: ${what} is covered by ${cover}: closing it`);
    await page.locator('[data-kit-action=menu-close]:visible').first().click({ timeout: 1500 }).catch(() => {});
    await page.waitForTimeout(500);
    if (!(await coverOf(loc))) return true;
    await page.evaluate(() => document.querySelectorAll('[data-kit-cover]').forEach((e) => { if (/fixed|absolute/.test(getComputedStyle(e).position) && !e.closest('.k-window')) e.style.setProperty('display', 'none', 'important'); }));
    const still = await coverOf(loc);
    if (still) log(`  ! kit: ${what} is still covered by ${still}`);
    return !still;
  };
  screen.plan = await scriptPlan(page);
  if (screen.plan.dialogs.length) log(`  kit: the screen's script opens ${screen.plan.dialogs.map((d) => `${d.panel}${d.opener ? ` (${d.opener})` : ''}`).join(', ')}${screen.plan.rowDouble ? `; a row double-click calls ${screen.plan.rowDouble}` : ''}`);

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
    const lines = await page.evaluate(() => { const t = [...document.querySelectorAll('.k-tooltip')].find((e) => e.getClientRects().length); const c = t?.querySelector('.k-tooltip-content') ?? t; return c ? Math.max(1, Math.round(c.getBoundingClientRect().height / (parseFloat(getComputedStyle(c).lineHeight) || 18))) : 1; });
    states.push({ name: 'tooltip', steps: [{ do: 'hover', sel: '[data-kit-tip]', nth: i }], wait: after + 500, clip, shot: await shot('tooltip', clip), expect: [{ sel: '.k-tooltip', lines, why: 'the live tooltip' }] });
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);
    break;
  }
  // 4. Search: the results (grid templates, what became visible, which endpoint was called)
  const search = page.locator('[data-kit-action=search]:visible').first();
  if (await search.count()) {
    await unblock(search, 'Search');
    const t0 = Date.now();
    await search.click({ timeout: 3000 }).catch((e) => log(`  ! kit: Search click failed: ${e.message.split('\n')[0]}`));
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
    if (!(await waitWindow(nested ? 6000 : 20000))) return null;
    await s.settle(0, 6000).catch(() => {}); // its content may still be loading (dropdown data, the editor's own script)
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
    let t0 = 0, id = null;
    for (let attempt = 1; attempt <= 2 && !id; attempt++) { // a second try: the first click may have gone to something on top
      for (let tries = 0; attempt > 1 && tries < 3 && await visibleWindow(); tries++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
      await unblock(el, `Create New #${i + 1}`);
      t0 = Date.now();
      await el.click({ timeout: 3000 }).catch((e) => log(`  ! kit: Create New #${i + 1} click failed: ${e.message.split('\n')[0]}`));
      id = await harvestDialog(`Create New #${i + 1}`, false);
    }
    if (!id) { log(`  ! kit: Create New #${i + 1} opened no dialog (requests after the click: ${requestsSince(t0).map((r) => `${r.method} ${r.url}`).join(', ') || 'none'})`); continue; }
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
      // the portal's grids open a row on double-click (setKendoGridDataBoundEvents); a link or button in the row on click
      const via = (await target.count()) ? 'link' : screen.plan.rowDouble ? 'dblclick' : 'row';
      const t0 = Date.now(), nav0 = s.guard.events.length;
      const hit = via === 'link' ? target : row.locator('td').first();
      await unblock(hit, 'the first grid row');
      await (via === 'dblclick' ? hit.dblclick({ timeout: 3000 }) : hit.click({ timeout: 3000 })).catch((e) => log(`  ! kit: first row ${via} failed: ${e.message.split('\n')[0]}`));
      let id = (await waitWindow(via === 'dblclick' ? 20000 : 3000)) ? await harvestDialog('the first grid row', false) : null;
      let how = via;
      if (!id && via === 'row' && !s.guard.events.slice(nav0).some((e) => e.type === 'navigation')) { // nothing on click: the portal's other convention
        await hit.dblclick({ timeout: 3000 }).catch(() => {});
        if (await waitWindow(8000)) { id = await harvestDialog('the first grid row (double-click)', false); how = 'dblclick'; }
      }
      const nav = s.guard.events.slice(nav0).find((e) => e.type === 'navigation');
      screen.row = { dialog: id, navigates: nav ? nav.url.replace(/^https?:\/\/[^/]+/, '') : null, requests: requestsSince(t0), via: how };
      if (id) {
        screen.dialogs[id].requests = screen.row.requests;
        states.push({ name: `row-${id}`, steps: [{ do: 'click', sel: '[data-kit-action=search]' }, { do: how === 'dblclick' ? 'dblclick' : 'click', sel: '[data-kit-row="0"]' }], wait: 1200, shot: `states/dialog-${id}.png` });
        for (let tries = 0; tries < 3 && await visibleWindow(); tries++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
      }
      log(`  kit: first row (${how}) -> ${id ? `dialog ${id} "${screen.dialogs[id].title}"` : nav ? `navigates to ${screen.row.navigates} (not followed)` : 'nothing'}`);
    }
  }
  // every dialog the script can open should now be harvested (its window is built on the element id = the panel id)
  const got = new Set(Object.values(screen.dialogs).map((d) => d.contentId).filter(Boolean));
  screen.missing = screen.plan.dialogs.filter((d) => !got.has(d.panel) && (d.opener || d.via === 'row-dblclick'));
  if (screen.missing.length) log(`  ! kit: dialogs the script opens but the capture did not see: ${screen.missing.map((d) => `${d.panel} (${d.opener || d.via})`).join(', ')}`);
  // the side menu, checked on the rebuild: opens (with its backdrop), a module flies out on hover, its close icon closes it
  if (menuFound) {
    const open = { do: 'click', sel: '[data-kit-action=menu]' }, bd = !!menu.backdrop;
    if (menuShot) fs.writeFileSync(path.join(dir, 'states', 'menu-open.png'), menuShot);
    states.push({ name: 'menu-open', steps: [open], wait: 800, ...(menuShot ? { shot: 'states/menu-open.png' } : {}),
      expect: [{ sel: '[data-kit-menu]', why: 'the hamburger opens the side menu' }, ...(bd ? [{ sel: '[data-kit-menu-backdrop-live]', why: 'with the backdrop the page appends' }] : [])] });
    const mod = '[data-kit-menu] li:has(> .k-menu-popup), [data-kit-menu] li:has(> .k-animation-container)';
    if (await page.locator(mod).count().catch(() => 0)) states.push({ name: 'menu-flyout', steps: [open, { do: 'hover', sel: mod, wait: 900 }], wait: 900,
      expect: [{ sel: '[data-kit-menu] li > .k-menu-popup, [data-kit-menu] li > .k-animation-container', why: 'a module flies out on hover' }] });
    if (menu.close) states.push({ name: 'menu-close', steps: [open, { do: 'click', sel: '[data-kit-action=menu-close]' }], wait: 600,
      expect: [{ sel: '[data-kit-menu]', visible: false, why: 'its close icon closes it' }, ...(bd ? [{ sel: '[data-kit-menu-backdrop-live]', visible: false, why: 'and removes the backdrop' }] : [])] });
  }
  log(`  kit: ${Object.keys(screen.dialogs).length} dialog(s) ${Object.values(screen.dialogs).map((d) => `"${d.title}"`).join(', ')}; ${states.length} state check(s)`);
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
    k.row ? `- First grid row: ${k.row.dialog ? `opens dialog ${k.row.dialog}${k.row.via === 'dblclick' ? ' on double-click (a single click selects the row)' : ''}` : k.row.navigates ? `navigates to ${k.row.navigates} (another page, out of this screen)` : 'no effect'}` : '',
    k.menu ? `- Side menu (shell, built by the kit): ${k.menu.links} links; opens by ${k.menu.add?.length ? `class ${k.menu.add.join(' ')}` : 'display'}${k.menu.backdrop ? ` + backdrop ${k.menu.backdrop}` : ''}; closes by its X or a menu link (not Escape, not the backdrop)` : '',
    ...[['the page', k.unknown], ...Object.values(k.dialogs).map((d) => [`dialog "${d.title}"`, d.unknown])].flatMap(([where, u]) => Object.entries(u ?? {}).map(([role, x]) =>
      `- Kendo ${role} on ${where} (${x.count}${x.ids.length ? `: #${x.ids.join(', #')}` : ''}): the kit does not rebuild this widget yet; it is ported as its static markup (it looks right, it does not behave). Specify what it shows and list its behavior as [UNKNOWN: kit has no ${role}]`)),
    ...(k.missing ?? []).map((d) => `- [UNKNOWN: dialog ${d.panel}] the screen's script opens it (${d.opener ? `button ${d.opener}` : d.via}), but the capture could not see it: list it in the spec as an open question, do not invent its fields`)].filter(Boolean).join('\n') + '\n';
}
// TODO.md for the code writer: what the kit already does for this screen (checked) and what is left (unchecked), from the
// capture, so the writer starts from a list instead of reverse-engineering src/kit
export function todo(out, { route }) {
  const k = readJson(path.join(out, 'kit', 'screen.json'));
  if (!k) return null;
  const jsDir = path.join(out, 'capture', 'js');
  const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
  const own = walk(jsDir).filter((f) => /[\\/]Scripts[\\/]/.test(f) && !/kendo|jquery|bootstrap|[\\/]hp\.ua3\.core\.|\.min\./i.test(f)).map((f) => path.relative(out, f).split(path.sep).join('/'));
  const label = (d) => d.label || d.name || d.id || '?';
  const done = [], left = [];
  for (const [id, w] of Object.entries(k.widgets)) done.push(`${id}: ${w.kind} "${label(w)}"${w.items?.length ? ` (${w.items.length} options)` : ''}`);
  for (const [id, d] of Object.entries(k.dialogs)) done.push(`${id}: dialog "${d.title}", opened by ${d.opener}${d.parent ? ` inside ${d.parent}` : ''} (dialogs/ in the screen folder)`);
  if (k.search) done.push(`Search: fills the grid with synthetic rows${k.search.reveals.length ? `, reveals ${k.search.reveals.join(', ')}` : ''}`);
  if (k.row?.dialog) done.push(`grid row: ${k.row.via === 'dblclick' ? 'a click selects it, a double-click opens' : 'a click opens'} dialog ${k.row.dialog}`);
  if (k.actions.some((a) => a.action === 'reset')) done.push('Reset: clears the fields');
  if (k.actions.some((a) => a.action === 'collapse')) done.push('collapsible panels (chevrons)');
  done.push('tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu');
  for (const [id, w] of Object.entries({ ...k.widgets, ...Object.assign({}, ...Object.values(k.dialogs).map((d) => d.widgets)) }))
    if (w.cascadeFrom) left.push(`${id} "${label(w)}" cascades from ${w.cascadeFrom}: the kit enables it when the parent has a value; give it the options per parent value from the screen's script`);
  if (k.actions.some((a) => a.action === 'cancel')) left.push("Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)");
  if (k.hidden.length) left.push(`${k.hidden.length} part(s) hidden at rest (data-kit-h=…) that Search does not reveal${k.search?.reveals?.length ? ` (it reveals ${k.search.reveals.join(', ')})` : ''}: find in the script what shows each (a radio, a checkbox, a dropdown value) and build that`);
  for (const d of Object.values(k.dialogs)) if (d.hidden?.length) left.push(`dialog "${d.title}": ${d.hidden.length} part(s) hidden at rest: the same, from the dialog's script`);
  for (const d of k.missing ?? []) left.push(`dialog ${d.panel} (${d.opener ? `button ${d.opener}` : d.via}) is opened by the screen's script but was NOT captured: do not invent it. Write it in GUESSED.md as "not captured, re-capture needed"`);
  if (k.row && !k.row.dialog && k.plan?.rowDouble) left.push(`grid row double-click calls ${k.plan.rowDouble}${k.plan.rowOpens === 'navigate' ? ' (it navigates to another page: out of this screen, do nothing)' : ' but the capture saw no dialog: write it in GUESSED.md'}`);
  left.push('every task in spec/tasks.md that the list above does not cover (messages such as "At least one search criteria is required.")');
  return `# Checklist: ${k.shell?.title || route}\n\nGenerated from the capture (kit/screen.json). Route: \`#${route}\`.\n\n## Done by the kit (do not rebuild)\n${done.map((x) => `- [x] ${x}`).join('\n')}\n\n` +
    `## Left for you\n${left.map((x) => `- [ ] ${x}`).join('\n')}\n\n## The screen's own script (paths in the screen folder)\n${own.map((f) => `- ${f}`).join('\n') || '- (none saved)'}\n`;
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
