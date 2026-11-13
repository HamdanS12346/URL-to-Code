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
async function sideMenu(page, sel, log, module) {
  // the pack's hamburger; below the portal's small-screen switch it shows a twin of it (the pack's selector is hidden then), so fall back to the usual ones
  let btn = null;
  for (const c of [sel, 'i.fa-bars', '[class*=hamburger]', 'button[aria-label*="menu" i]'].filter(Boolean)) {
    const l = page.locator(`${c}:visible`).first();
    if (await l.count().catch(() => 0)) { btn = l; break; }
  }
  if (!btn) return null;
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
  const fly = await demoFlyout(page, 'side', module).catch(() => null); // a module hovered: where its submenu opens, and a picture of it
  if (fly) Object.assign(found, { flyShot: fly.shot, flyClip: fly.clip, flyRect: fly.rect });
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

// The shell's own parts, which the content harvest never sees (it works inside the screen's scope):
//  - every Kendo menu with submenus (the side menu's module list, the module tab): its hover delay and open/close animation
//    from the live widget, stamped on the <ul> (data-kit-menu-hover/-open-ms/-close-ms) for the runtime to replay;
//  - the shell's collapsible panels (Quick Links in the side menu: an angle icon in a *-panel-hdr-tools, its body a sibling
//    *-panel-bdy of the header inside the same *-panel-container), stamped like the content's (collapse / data-kit-collapse).
async function shellParts(page, scope) {
  return page.evaluate((scope) => {
    const out = { menus: 0, panels: 0 };
    const inScope = scope ? document.querySelector(scope) : null;
    for (const ul of document.querySelectorAll('ul[data-role=menu]')) {
      if (!ul.querySelector(':scope > li > .k-menu-popup, :scope > li > .k-animation-container, :scope > li[data-groupparent]')) continue;
      out.menus++;
      try {
        const m = window.jQuery(ul).data('kendoMenu'), a = m?.options?.animation || {};
        if (!m) continue;
        ul.setAttribute('data-kit-menu-hover', String(m.options.hoverDelay ?? 100));
        if (a.open?.duration != null) ul.setAttribute('data-kit-menu-open-ms', String(a.open.duration));
        if (a.close?.duration != null) ul.setAttribute('data-kit-menu-close-ms', String(a.close.duration));
      } catch {}
    }
    for (const ic of document.querySelectorAll('[class*=panel-hdr-tools] .fa-angle-up, [class*=panel-hdr-tools] .fa-angle-down')) {
      if (ic.hasAttribute('data-kit-action') || inScope?.contains(ic)) continue;
      const box = ic.closest('[class*=panel-container]'), body = box?.querySelector(':scope > [class*=panel-bdy]');
      if (!body) continue;
      ic.setAttribute('data-kit-action', 'collapse');
      body.setAttribute('data-kit-collapse', body.getClientRects().length ? 'open' : 'closed');
      out.panels++;
    }
    return out;
  }, scope || null).catch(() => ({ menus: 0, panels: 0 }));
}

// Hover one module of a menu on the live page and record what Kendo does: which item (stamped data-kit-flyout-demo so the
// rebuild's check hovers the same one), where its submenu lands (the box Kendo lifts out of the <ul>) and a picture of that
// area. `which`: "side" (the hamburger's module list, vertical) or "bar" (the module tab under the header, horizontal).
async function demoFlyout(page, which, module) {
  const ok = await page.evaluate(({ which, module }) => {
    const vis = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    // an item with a submenu: its popup inside it, or (opened before: a scrollable Kendo menu lifts the popup out) linked by data-groupparent
    const has = (li) => li.matches('[data-groupparent]') || !!li.querySelector(':scope > .k-menu-popup, :scope > .k-animation-container');
    const ul = [...document.querySelectorAll('ul[data-role=menu]')].find((u) => vis(u) && [...u.children].some(has) && (which === 'side') === !!u.closest('[data-kit-menu]'));
    if (!ul) return false;
    const lis = [...ul.children].filter((li) => li.tagName === 'LI' && has(li) && vis(li));
    const li = lis.find((l) => module && l.textContent.replace(/\s+/g, ' ').trim().toLowerCase().startsWith(module.toLowerCase())) || lis[0];
    if (!li) return false;
    li.setAttribute('data-kit-flyout-demo', which);
    return true;
  }, { which, module: module || null });
  if (!ok) return null;
  await page.locator(`[data-kit-flyout-demo="${which}"]`).first().hover({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(900);
  const rect = await page.evaluate(() => {
    const vis = (el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    const b = [...document.querySelectorAll('.k-animation-container')].find((c) => vis(c) && c.querySelector('.k-menu-popup'));
    const r = b?.getBoundingClientRect();
    return r && { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  let out = null;
  if (rect && rect.width > 0) {
    const clip = { x: Math.max(0, Math.floor(rect.x - 12)), y: Math.max(0, Math.floor(rect.y - 12)), width: Math.ceil(rect.width + 24), height: Math.ceil(rect.height + 24) };
    const shot = await page.screenshot({ animations: 'disabled', caret: 'hide', clip }).catch(() => null);
    if (shot) out = { clip, rect, shot };
  }
  await page.mouse.move(0, 0);
  await page.waitForTimeout(500);
  return out;
}

export async function prepare({ page, cfg, log }) {
  await inject(page);
  const k = cfg.kit || {};
  const shellInfo = await shellParts(page, k.scope);
  const menu = k.menuButton ? await sideMenu(page, k.menuButton, log, k.module).catch((e) => (log(`  ! kit: side menu: ${e.message.split('\n')[0]}`), null)) : null;
  const bar = await demoFlyout(page, 'bar', k.module).catch(() => null); // the module tab under the header (the home page has none)
  const rest = await page.evaluate((a) => window.__kit.rest(a), { scope: k.scope || null, module: k.module || null });
  const defaults = await page.evaluate(() => window.__kit.defaults());
  // the page-level help icon (the book) sits in the title row above the content scope, so the shell does not carry it;
  // taken after the harvest, which stamped its tooltip (data-kit-tip)
  const help = await page.evaluate(() => document.querySelector('.help-icon-container')?.outerHTML ?? null).catch(() => null);
  log(`  kit (provider): Kendo ${rest.kendo}, ${Object.keys(rest.widgets).length} widgets (${Object.values(rest.widgets).map((w) => w.kind).join(', ') || 'none'}), ${rest.fields.length} fields, ${rest.actions.length} actions, ${rest.hidden.length} hidden parts${Object.keys(rest.unknown || {}).length ? `, widgets the kit does not rebuild yet: ${Object.entries(rest.unknown).map(([r, x]) => `${r} x${x.count}`).join(', ')}` : ''}${menu ? `, side menu ${menu.root} (${menu.links} links${menu.add.length ? `, opens by class ${menu.add.join(' ')}` : ''}${menu.backdrop ? ` + ${menu.backdrop}` : ''}${menu.closed ? '' : ', NOT closed'}${menu.flyShot ? ', fly-out recorded' : ', NO fly-out found'})` : ''}${bar ? ', module tab fly-out recorded' : ''}, ${shellInfo.menus} menu(s) with submenus, ${shellInfo.panels} shell panel(s) that collapse`);
  return { ...rest, defaults, menu, bar, help };
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
    // the portal's own small-screen switch: isPhone() = matchMedia("(max-width: 1280px)") (the dialog code branches on it)
    const phoneFn = /(?:function\s+|)\b(is(?:Phone|Mobile|Small|Narrow|Compact))\s*(?:=\s*function)?\s*\([^)]*\)\s*\{([\s\S]{0,600}?)\n\s*\}/.exec(src);
    const phoneQuery = phoneFn ? /matchMedia\(\s*["']\(\s*max-width:\s*(\d+)px\s*\)["']\s*\)/.exec(phoneFn[2])?.[1] ?? null : null;
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
    return { dialogs, rowDouble, rowSingle, rowOpens: rowPanel || (/location(\.href)?\s*=|window\.open\(/.test(rowBody) ? 'navigate' : null), phoneWidth: phoneQuery ? +phoneQuery : null };
  }).catch(() => ({ dialogs: [], rowDouble: null, rowSingle: null, rowOpens: null, phoneWidth: null }));
}

// ---------- shared by the capture's clicks and the profile pass ----------
// waits until the portal's loading indicator (the "Processing ..." box, Kendo's loading masks, a grid's spinner) is gone and has stayed gone
// for a moment: a Search picture taken while the grid still spins is not the result
async function waitLoaded(page, s, max = 30000) {
  const end = Date.now() + max;
  let quiet = 0;
  await page.waitForTimeout(250);
  while (Date.now() < end) {
    const busy = await page.evaluate(() => window.__kit.loading()).catch(() => false);
    if (busy) quiet = 0; else { quiet += 200; if (quiet >= 600) break; }
    await page.waitForTimeout(200);
  }
  await s.settle(100, 2000).catch(() => {});
}

// What radios, checkboxes and dropdown values show or hide on the page (where = 'page') or in the open window ('dialog'): each value is tried, the
// parts that flipped are recorded with their ABSOLUTE state per value (so the rebuild can set any value from any other one), and the control is put back.
// Result: [{ where, kind, name, values: { <value>: { <selector>: shown } }, rest: { <selector>: shown } }]
async function sweep(page, where) {
  const t = await page.evaluate((w) => window.__kit.triggers(w), where).catch(() => null);
  if (!t) return [];
  const out = [], parts = () => page.evaluate(() => window.__kit.parts());
  const group = async (kind, name, steps, restore, restKey) => {
    const rest = await parts(), states = {}, flipped = new Set();
    let prev = rest;
    for (const st of steps) {
      await st.act();
      await page.waitForTimeout(500);
      const now = await parts();
      for (const k of Object.keys(now)) if (k in prev && now[k] !== prev[k]) flipped.add(k);
      states[st.key] = now;
      prev = now;
    }
    await restore();
    await page.waitForTimeout(400);
    const back = await parts();
    for (const k of Object.keys(back)) if (k in prev && back[k] !== prev[k]) flipped.add(k);
    if (!flipped.size) return;
    const sels = [...flipped].filter((k) => k in rest);
    if (!sels.length) return;
    if (restKey != null) states[restKey] = rest;
    out.push({ where, kind, name, values: Object.fromEntries(Object.entries(states).map(([k, p]) => [k, Object.fromEntries(sels.map((s) => [s, !!p[s]]))])), rest: Object.fromEntries(sels.map((s) => [s, !!rest[s]])) });
  };
  const click = (tid) => page.evaluate((x) => window.__kit.tclick(x), tid);
  for (const g of t.radios) {
    const orig = g.options.find((o) => o.checked);
    await group('radio', g.name, g.options.map((o) => ({ key: o.value, act: () => click(o.t) })),
      async () => { if (orig) await click(orig.t); else for (const o of g.options) await page.evaluate((x) => window.__kit.tuncheck(x), o.t); }, orig ? orig.value : null);
  }
  for (const c of t.checkboxes) await group('checkbox', c.name, [{ key: String(!c.checked), act: () => click(c.t) }], () => click(c.t), String(c.checked));
  for (const d of t.dropdowns) {
    const others = d.values.filter((v) => v !== d.value).slice(0, 4);
    if (!others.length) continue;
    const pick = (v) => page.evaluate(([x, val]) => window.__kit.tpick(x, val), [d.t, v]);
    await group('dropdown', d.name, others.map((v) => ({ key: v, act: () => pick(v) })), () => pick(d.value), d.value);
  }
  return out;
}

// the pictures and checks of the side menu and the module tab, for the capture's own viewport (sfx '') and for each profile ('@name')
function menuStates({ dir, menu, menuShot, flyShot, barFound, sfx = '', extra = {} }) {
  const out = [], open = { do: 'click', sel: '[data-kit-action=menu]' }, bd = !!menu?.backdrop;
  const png = (nm, buf) => { fs.writeFileSync(path.join(dir, 'states', `${nm}${sfx}.png`), buf); return `states/${nm}${sfx}.png`; };
  if (menu) {
    const shot = menuShot ? png('menu-open', menuShot) : null;
    out.push({ name: `menu-open${sfx}`, steps: [open], wait: 800, ...(shot ? { shot } : {}), ...extra,
      expect: [{ sel: '[data-kit-menu]', why: 'the hamburger opens the side menu' }, ...(bd ? [{ sel: '[data-kit-menu-backdrop-live]', why: 'with the backdrop the page appends' }] : [])] });
    // a module hovered: its submenu is a box beside the menu (Kendo lifts it out of the <ul>, which clips what is inside), on top of the page, and looks like the live one
    if (flyShot) out.push({ name: `menu-flyout${sfx}`, steps: [open, { do: 'hover', sel: '[data-kit-flyout-demo="side"]', wait: 900 }], wait: 900, clip: menu.flyClip, shot: png('menu-flyout', flyShot), ...extra,
      expect: [{ sel: '[data-kit-flyout]', top: true, outside: '[data-kit-menu] ul[data-role=menu]', why: 'a module flies out to the left of the menu, over the page' }] });
    if (menu.close) out.push({ name: `menu-close${sfx}`, steps: [open, { do: 'click', sel: '[data-kit-action=menu-close]' }], wait: 600, ...extra,
      expect: [{ sel: '[data-kit-menu]', visible: false, why: 'its close icon closes it' }, ...(bd ? [{ sel: '[data-kit-menu-backdrop-live]', visible: false, why: 'and removes the backdrop' }] : [])] });
  }
  if (barFound) out.push({ name: `tab-flyout${sfx}`, steps: [{ do: 'hover', sel: '[data-kit-flyout-demo="bar"]', wait: 900 }], wait: 900, clip: barFound.clip, shot: png('tab-flyout', barFound.shot), ...extra,
    expect: [{ sel: '[data-kit-flyout]', top: true, outside: 'ul:has(> [data-kit-flyout-demo="bar"])', why: 'the module tab opens its screens under it' }] });
  return out;
}

const maxHeightOf = (style) => { const m = /max-height:\s*([\d.]+)px/.exec(style || ''); return m ? +m[1] : null; };

// The same screen at each extra viewport profile (config "profiles": e.g. a real browser on a 1920x1080 screen at 150% is 1272x588, below the portal's
// small-screen switch at 1280). A new page at that size is loaded, and: the layout the portal's breakpoints give is recorded, each side-menu and module-tab
// state is photographed, each Create New dialog is opened and measured. Everything becomes states (replayed by verify at that size) and screen.profiles /
// screen.responsive (the dialog rule the kit runtime applies: where, how wide, how high, below which width).
async function profilePass({ ctx, screen, states, dir, log }) {
  const { cfg, viewport, dpr, open, url } = ctx;
  const list = (cfg.profiles || []).filter((p) => p?.viewport?.width && p.viewport.height && !(p.viewport.width === viewport.width && p.viewport.height === viewport.height && (p.dpr || 1) === dpr));
  if (!open || !list.length) return;
  const k = cfg.kit || {};
  screen.profiles = {};
  for (const prof of list) {
    const name = prof.name || `${prof.viewport.width}x${prof.viewport.height}`, pdpr = prof.dpr || 1;
    const extra = { profile: name, viewport: prof.viewport, dpr: pdpr };
    log(`  kit: profile "${name}" ${prof.viewport.width}x${prof.viewport.height} @${pdpr}`);
    const s2 = await open({ url, viewport: prof.viewport, dpr: pdpr });
    s2.guard.allowPost = false;
    try {
      const page = s2.page;
      await s2.load();
      const rest = await page.evaluate((src) => { if (!window.__kit) (0, eval)(src); return window.__kit.rest({ scope: null, module: null }); }, HARVEST).catch(() => null);
      await page.evaluate((a) => window.__kit.rest(a), { scope: k.scope || null, module: k.module || null }).catch(() => null);
      const entry = { viewport: prof.viewport, dpr: pdpr, layout: await page.evaluate(() => window.__kit.layout()), dialogs: {} };
      screen.profiles[name] = entry;
      await page.mouse.move(0, 0);
      await page.screenshot({ path: path.join(dir, 'states', `layout@${name}.png`), animations: 'disabled', caret: 'hide' }).catch(() => {});
      states.push({ name: `layout@${name}`, steps: [], wait: 600, shot: `states/layout@${name}.png`, ...extra });
      // the menus at this size
      const menuFound = k.menuButton ? await sideMenu(page, k.menuButton, log, k.module).catch(() => null) : null;
      if (menuFound) {
        const { shot: menuShot, flyShot, ...m } = menuFound;
        entry.menu = { links: m.links, closed: m.closed };
        states.push(...menuStates({ dir, menu: m, menuShot, flyShot: flyShot ? Buffer.from(flyShot) : null, sfx: `@${name}`, extra }));
      }
      const bar = await demoFlyout(page, 'bar', k.module).catch(() => null);
      if (bar) states.push(...menuStates({ dir, menu: null, barFound: bar, sfx: `@${name}`, extra }));
      // each Create New dialog of the main pass, replayed by the same clicks, measured and photographed
      const wins = () => page.evaluate(() => window.__kit.position());
      for (const st of states.filter((x) => /^dialog-d\d+$/.test(x.name) && !x.profile && x.steps.every((s) => /^\[data-kit-action=/.test(s.sel)))) {
        const id = st.name.slice(7);
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
          await s2.settle(300, 6000);
          await page.evaluate((a) => { if (!window.__kit) (0, eval)(a.src); return window.__kit.rest(a); }, { src: HARVEST, scope: k.scope || null, module: k.module || null });
          await page.mouse.move(0, 0);
          for (const step of st.steps) {
            const loc = page.locator(`${step.sel} >> visible=true`).nth(step.nth ?? 0);
            await loc.scrollIntoViewIfNeeded({ timeout: 4000 });
            await loc.click({ timeout: 4000 });
            await page.waitForTimeout(st.wait ?? 800);
          }
          let pos = null;
          for (let i = 0; i < 40 && !pos; i++) { pos = await wins().catch(() => null); if (!pos) await page.waitForTimeout(500); }
          await s2.settle(300, 6000);
          pos = await wins();
          if (!pos) { log(`  ! kit: dialog ${id} did not open at profile "${name}"`); continue; }
          await page.screenshot({ path: path.join(dir, 'states', `dialog-${id}@${name}.png`), animations: 'disabled', caret: 'hide' });
          entry.dialogs[id] = pos;
          states.push({ name: `dialog-${id}@${name}`, steps: st.steps, wait: st.wait, shot: `states/dialog-${id}@${name}.png`, ...extra,
            expect: [{ sel: `[data-kit-dialog="${id}"]`, why: `Create New opens dialog ${id} at this size`, rect: { x: pos.rect.x, y: pos.rect.y, w: pos.rect.w, h: pos.rect.h }, tol: { x: 3, y: 3, w: 3, h: 14 } }] });
          for (let i = 0; i < 3 && (await wins().catch(() => null)); i++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
        } catch (e) { log(`  ! kit: dialog ${id} at profile "${name}": ${e.message.split('\n')[0]}`); }
      }
      void rest;
    } finally { await s2.close().catch(() => {}); }
  }
  // the rule the runtime applies: the portal's own dialog code branches below its small-screen width; the measured windows say where, how wide and how high
  const mainDlg = Object.values(screen.dialogs).find((d) => !d.parent);
  const desktopPct = mainDlg && maxHeightOf(mainDlg.windowStyle) ? +((maxHeightOf(mainDlg.windowStyle) / viewport.height) * 100).toFixed(1) : null;
  const responsive = { query: null, source: null, desktop: { maxHeightPct: desktopPct }, dialog: null };
  for (const [name, p] of Object.entries(screen.profiles)) {
    const pos = Object.values(p.dialogs)[0];
    if (!pos || pos.centered) continue;
    const vw = pos.viewport.docW, vh = pos.viewport.h, width = screen.plan?.phoneWidth ?? p.viewport.width;
    responsive.query = `(max-width: ${width}px)`;
    responsive.source = screen.plan?.phoneWidth ? 'script' : `profile ${name}`;
    responsive.dialog = { left: pos.rect.x, top: pos.rect.y, minWidthPct: pos.minWidth ? +((pos.minWidth / vw) * 100).toFixed(1) : null, widthPct: +((pos.rect.w / vw) * 100).toFixed(1),
      maxHeightPct: pos.maxHeight ? +((pos.maxHeight / vh) * 100).toFixed(1) : null, from: name };
    break;
  }
  screen.responsive = responsive;
  if (responsive.dialog) log(`  kit: below ${responsive.query} (${responsive.source}) a dialog sits at left ${responsive.dialog.left}px, top ${responsive.dialog.top}px, ${responsive.dialog.minWidthPct ?? responsive.dialog.widthPct}% wide, at most ${responsive.dialog.maxHeightPct}% high; above it, centered${desktopPct ? `, at most ${desktopPct}% high` : ''}`);
  else log('  kit: dialogs are centered at every profile');
}

// after the snapshot: the clicks. No reload in between: the stamps must survive
export async function explore({ page, context, s, out, log, kit, cfg = {}, url = null, viewport = null, dpr = 1, open = null }) {
  const dir = path.join(out, 'kit');
  fs.rmSync(dir, { recursive: true, force: true });
  for (const d of ['states', 'dialogs']) fs.mkdirSync(path.join(dir, d), { recursive: true });
  await context.clock.resume().catch(() => {}); // the freeze paused time: Kendo's animations and the page's timers must run again
  const { defaults, menu: menuFound, bar: barFound, ...rest } = kit;
  const { shot: menuShot, flyShot, ...menu } = menuFound || {};
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
  // an empty date box the portal masks shows a pattern ("__/__/____") the moment it is focused; read it from the box itself
  const dateMasks = async (defs, scope) => {
    for (const [id, w] of Object.entries(defs)) {
      if (!/date|time/.test(w.kind) || !w.enabled || w.value) continue;
      const input = page.locator(`${scope}[data-kit="${id}"] input:not([type=hidden])`).first();
      if (!(await input.count().catch(() => 0))) continue;
      try {
        await input.focus({ timeout: 1500 });
        await page.waitForTimeout(250);
        const v = await input.inputValue();
        if (/[_#]/.test(v)) w.focusMask = v;
        await input.evaluate((e) => e.blur());
      } catch { /* a date box under something: no mask recorded */ }
    }
  };
  await dateMasks(kit.widgets, '');
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
    await waitLoaded(page, s); // a grid that still spins is not the result (the portal's loading mask can take seconds)
    await page.waitForTimeout(500);
    screen.grids = await page.evaluate(() => window.__kit.grids());
    // rows: what the live page answered to a Search with the form as it loads (nothing typed): the rebuild's Search must
    // fill the grid from the same click, or the row and dialog checks that follow it have nothing to click
    screen.search = { reveals: await page.evaluate(() => window.__kit.revealed()), requests: requestsSince(t0), rows: Object.values(screen.grids)[0]?.rowCount ?? 0 };
    // what the click produced: rows, or a validation banner (and per-field messages) the rebuild must show instead of a grid
    const sv = await page.evaluate(() => window.__kit.validation()).catch(() => null);
    screen.search.outcome = screen.search.rows > 0 ? 'rows' : sv ? 'validation' : 'empty';
    if (sv && screen.search.outcome === 'validation') screen.search.validation = sv;
    screen.requests.search = screen.search.requests[0] || null;
    await page.evaluate(() => scrollTo(0, 0));
    states.push({ name: 'search', steps: [{ do: 'click', sel: '[data-kit-action=search]' }], wait: 1200, full: true, shot: await shot('search') });
    const g = Object.values(screen.grids)[0];
    log(`  kit: Search -> ${screen.search.outcome}; ${Object.keys(screen.grids).length} grid(s)${g ? `, ${g.total} rows, ${g.rowCount} shown` : ''}, revealed ${screen.search.reveals.length} part(s), ${screen.search.requests.length} request(s)`);
    // the grid's column filter: the icon, the popup it opens (its real markup) and where it sits relative to the icon
    const fi = await page.evaluate(() => window.__kit.filterIcon()).catch(() => null);
    if (fi) {
      try {
        await page.locator('[data-kit-filter-icon]').first().click({ timeout: 2500 });
        await page.waitForTimeout(700);
        const fp = await page.evaluate(() => window.__kit.filterPopup());
        if (fp) {
          screen.filterPopup = { dx: fp.rect.x - fi.x, dy: fp.rect.y - fi.y, w: fp.rect.w, h: fp.rect.h, html: fp.html, buttons: fp.buttons };
          log(`  kit: grid filter popup ${fp.rect.w}x${fp.rect.h} (${fp.buttons.join(' / ')})`);
        }
        await page.keyboard.press('Escape').catch(() => {});
        await page.evaluate(() => window.__kit.closeFilterPopup()).catch(() => {});
        await page.waitForTimeout(300);
      } catch { /* the filter icon is covered: no popup recorded */ }
    }
  }
  // 5. Create New (and the first row's edit/detail): each dialog harvested, then closed. Never Save.
  let dn = 0;
  const who = (loc) => loc.evaluate((e) => ({ id: e.id || null, text: (e.value || e.textContent || e.getAttribute('title') || '').replace(/\s+/g, ' ').trim().slice(0, 60) })).catch(() => ({ id: null, text: '' }));
  // A Create New that opened no window may show a part of what is already there (the Destination form inside the Add
  // dialog; an inline editor on a page): what the click turned on and off, a picture, and the part put away again with its
  // own Cancel (never Save). Returns null when nothing changed.
  const partOf = async (before, nm) => {
    await s.settle(0, 3000).catch(() => {});
    await page.waitForTimeout(400);
    const ch = await page.evaluate((b) => window.__kit.changed(b), before).catch(() => null);
    if (!ch || (!ch.show.length && !ch.hide.length)) return null;
    await page.waitForTimeout(200);
    const part = { ...ch, shot: await shot(nm), restored: false };
    const cancel = page.locator(ch.show.map((x) => `${x} [data-kit-action=cancel]:visible`).join(', ') || '[data-kit-none]').first();
    if (await cancel.count()) {
      await cancel.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(600);
      const back = await page.evaluate((b) => window.__kit.changed(b), before).catch(() => null);
      part.restored = !!back && !back.show.length && !back.hide.length;
    }
    return part;
  };
  const harvestDialog = async (label, nested) => {
    if (!(await waitWindow(nested ? 6000 : 20000))) return null;
    await s.settle(0, 6000).catch(() => {}); // its content may still be loading (dropdown data, the editor's own script)
    await page.waitForTimeout(700);
    const d = await page.evaluate(() => window.__kit.dialog());
    if (!d) return null;
    const id = `d${++dn}`;
    fs.writeFileSync(path.join(dir, 'dialogs', `${id}.html`), d.contentHtml);
    delete d.contentHtml;
    screen.dialogs[id] = { ...d, opener: label, children: [], creates: [] };
    await shot(`dialog-${id}`);
    await dateMasks(d.widgets, '.k-window ');
    if (!nested) screen.dialogs[id].conditionals = await sweep(page, 'dialog').catch(() => []); // radios / checkboxes / dropdown values that show or hide parts of the dialog
    if (!nested) { // a Create New inside the dialog (Destination Configuration): a window one level down, or a part of this one
      const inner = page.locator('.k-window [data-kit-action=create]:visible');
      for (let i = 0, n = Math.min(await inner.count(), 3); i < n; i++) {
        const t0 = Date.now(), me = await who(inner.nth(i));
        const before = await page.evaluate(() => window.__kit.marks()).catch(() => null);
        await inner.nth(i).click({ timeout: 3000 }).catch((e) => log(`  ! kit: Create New "${me.text}" in dialog ${id} click failed: ${e.message.split('\n')[0]}`));
        await page.waitForTimeout(500);
        const count = await page.evaluate(() => [...document.querySelectorAll('.k-window')].filter((w) => w.getClientRects().length).length);
        if (count < 2) {
          const part = before && await partOf(before, `dialog-${id}-part${i + 1}`);
          if (!part) { log(`  ! kit: Create New "${me.text}" in dialog ${id} opened no window and showed nothing`); continue; }
          screen.dialogs[id].creates.push({ index: i, ...me, ...part, requests: requestsSince(t0) });
          log(`  kit: Create New "${me.text}" in dialog ${id} shows ${part.show.join(', ') || 'nothing'}${part.hide.length ? `, hides ${part.hide.join(', ')}` : ''}${part.restored ? '' : ' (its Cancel did not put it away: no further click in this dialog)'}`);
          if (!part.restored) break; // the dialog is no longer as it was at rest
          continue;
        }
        const sub = await harvestDialog(`${label} > create ${i + 1}`, true);
        if (!sub) continue;
        Object.assign(screen.dialogs[sub], { parent: id, requests: requestsSince(t0) });
        screen.dialogs[id].children.push(sub);
        screen.dialogs[id].creates.push({ index: i, ...me, dialog: sub });
        await page.evaluate(() => window.__kit.closeDialog());
        await page.waitForTimeout(800);
      }
    }
    return id;
  };
  // What a dialog does when it is asked to close or to save with nothing filled. Never Save for real: every POST is blocked while it is clicked.
  //  saveValidation: the summary banner and per-field messages Save shows (the kit shows the same, with the live markup)
  //  close.x / close.cancel: with an edit in it, does the X / Cancel ask "form data has changed"? Its window (markup, buttons), and that staying keeps the
  //  dialog open. `reopen` opens the dialog again for the Cancel test (the X test leaves it closed).
  const windows = () => page.evaluate(() => [...document.querySelectorAll('.k-window')].filter((w) => w.getClientRects().length && getComputedStyle(w).visibility !== 'hidden').length);
  const dialogBehaviour = async (id, reopen) => {
    const d = screen.dialogs[id];
    if (!d) return;
    const save = page.locator('.k-window [data-kit-action=save]:visible').first();
    if (await save.count().catch(() => 0)) {
      const allow = s.guard.allowPost, n0 = s.guard.events.length;
      s.guard.allowPost = false;
      try {
        await save.click({ timeout: 2500 }).catch(() => {});
        await page.waitForTimeout(1300);
        await s.settle(100, 3000).catch(() => {});
        const v = await page.evaluate(() => window.__kit.validation());
        const posted = s.guard.events.slice(n0).filter((e) => e.status === 'blocked').length;
        if (v) { d.saveValidation = { ...v, postAttempted: posted > 0 }; log(`  kit: Save with nothing filled in "${d.title}": ${v.summaries.length ? 'a summary banner and ' : ''}${v.fields.length} field message(s)${posted ? ' (and it tried to post)' : ''}`); }
        else if (posted) d.saveValidation = { summaries: [], fields: [], postAttempted: true };
      } finally { s.guard.allowPost = allow; }
    }
    const closeVia = async (via) => {
      const r = { edited: false, asks: false };
      if (await page.evaluate(() => window.__kit.editable())) {
        await page.locator('[data-kit-edit]').first().fill('probe').catch(() => {});
        await page.keyboard.press('Tab').catch(() => {});
        await page.waitForTimeout(300);
        r.edited = true;
      }
      const press = async () => {
        if (!(await page.evaluate((v) => window.__kit.closeButton(v), via))) return null;
        const n0 = await windows();
        await page.locator('[data-kit-close-via]').first().click({ timeout: 2500 }).catch(() => {});
        await page.waitForTimeout(1200);
        return { n0, n1: await windows() };
      };
      const a = await press();
      if (!a) return { ...r, button: false };
      if (a.n1 > a.n0) { // another window opened on top of the dialog: the confirm
        const cf = await page.evaluate(() => window.__kit.confirm());
        if (cf) {
          r.asks = true;
          r.confirm = { title: cf.title, windowClass: cf.windowClass, windowStyle: cf.windowStyle, titlebarHtml: cf.titlebarHtml, contentClass: cf.contentClass, contentId: cf.contentId, contentStyle: cf.contentStyle,
            overlay: cf.overlay, options: cf.options, contentHtml: cf.contentHtml, buttons: cf.buttons, rect: cf.rect };
          await shot(`dialog-${id}-confirm`);
          const stay = page.locator('.k-window [data-kit-confirm=stay]:visible').first(), leave = page.locator('.k-window [data-kit-confirm=leave]:visible').first();
          if (await stay.count()) {
            await stay.click({ timeout: 2500 }).catch(() => {});
            await page.waitForTimeout(800);
            r.stayKeepsOpen = (await windows()) >= a.n0; // the answer that stays leaves the dialog (and the edit) where it was
            if (r.stayKeepsOpen) { // the same button again, this time leaving (the confirm is a new window: its buttons are stamped again)
              const b = await press();
              if (b && b.n1 > b.n0) { await page.evaluate(() => window.__kit.confirm()); await page.locator('.k-window [data-kit-confirm=leave]:visible').first().click({ timeout: 2500 }).catch(() => {}); }
              await page.waitForTimeout(800);
            }
          } else if (await leave.count()) { await leave.click({ timeout: 2500 }).catch(() => {}); await page.waitForTimeout(800); }
        }
      }
      r.closed = (await windows()) < a.n0;
      return r;
    };
    const close = {};
    close.x = await closeVia('x').catch(() => null);
    let why = !reopen ? 'no way to open it again' : null;
    if (!why && (await windows()) !== 0) why = `${await windows()} window(s) still open after X`;
    if (!why && !(await reopen().catch(() => false))) why = 'it did not open again';
    if (!why) {
      await page.evaluate(() => window.__kit.dialog()).catch(() => null); // stamps the fresh window's Cancel / Save
      close.cancel = await closeVia('cancel').catch(() => null);
    } else log(`  ! kit: Cancel of "${d.title}" not tried: ${why}`);
    for (let i = 0; i < 3 && (await windows()); i++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(700); }
    const first = close.x?.confirm ? close.x : close.cancel?.confirm ? close.cancel : null;
    d.close = { x: close.x && { edited: close.x.edited, asks: close.x.asks, stayKeepsOpen: close.x.stayKeepsOpen ?? null, button: close.x.button }, cancel: close.cancel && { edited: close.cancel.edited, asks: close.cancel.asks, stayKeepsOpen: close.cancel.stayKeepsOpen ?? null, button: close.cancel.button }, confirm: first?.confirm ?? null };
    log(`  kit: closing "${d.title}" with an edit: X ${close.x ? (close.x.button === false ? 'has no button' : close.x.asks ? 'asks' : 'closes') : '?'}, Cancel ${close.cancel ? (close.cancel.button === false ? 'has no button' : close.cancel.asks ? 'asks' : 'closes') : 'not tried'}${first?.confirm ? `; the confirm "${first.confirm.buttons.map((b) => b.text).join(' / ')}"` : ''}`);
  };
  // the checks of a dialog's parts, replayed after the steps that open the dialog
  const partStates = (id, steps) => (screen.dialogs[id].creates || []).filter((c) => !c.dialog).map((c) => ({ name: `dialog-${id}-part${c.index + 1}`,
    steps: [...steps, { do: 'click', sel: `[data-kit-dialog="${id}"] [data-kit-action=create]`, nth: c.index }], wait: 1200,
    expect: [...c.show.map((x) => ({ sel: `[data-kit-dialog="${id}"] ${x}`, why: `"${c.text}" in the dialog shows this part` })), ...c.hide.map((x) => ({ sel: `[data-kit-dialog="${id}"] ${x}`, visible: false, why: `"${c.text}" in the dialog hides this part` }))] }));
  const create = page.locator('[data-kit-action=create]:visible');
  const creates = await create.count();
  for (let i = 0; i < Math.min(creates, 3); i++) {
    const el = create.nth(i);
    if (await el.evaluate((e) => !!e.closest('.k-window')).catch(() => true)) continue;
    let t0 = 0, id = null, part = null;
    const me = await who(el), nav0 = s.guard.events.length;
    for (let attempt = 1; attempt <= 2 && !id && !part; attempt++) { // a second try: the first click may have gone to something on top
      for (let tries = 0; attempt > 1 && tries < 3 && await visibleWindow(); tries++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
      await unblock(el, `Create New #${i + 1}`);
      const before = await page.evaluate(() => window.__kit.marks()).catch(() => null);
      t0 = Date.now();
      await el.click({ timeout: 3000 }).catch((e) => log(`  ! kit: Create New #${i + 1} click failed: ${e.message.split('\n')[0]}`));
      id = await harvestDialog(`Create New #${i + 1}`, false);
      // no window: the button may show an editor in the page itself (not after a navigation: the page is another one then)
      if (!id && before && !s.guard.events.slice(nav0).some((e) => e.type === 'navigation')) part = await partOf(before, `create-${i + 1}-part`);
    }
    // replayed in the order it happened here: after Search (the page behind the dialog shows the results)
    const steps = [...(screen.search ? [{ do: 'click', sel: '[data-kit-action=search]' }] : []), { do: 'click', sel: '[data-kit-action=create]', nth: i }];
    if (part) {
      (screen.creates ||= []).push({ index: i, ...me, ...part, requests: requestsSince(t0) });
      states.push({ name: `create-${i + 1}-part`, steps, wait: 1200, expect: [...part.show.map((x) => ({ sel: x, why: `"${me.text}" shows this part of the page` })), ...part.hide.map((x) => ({ sel: x, visible: false, why: `"${me.text}" hides this part of the page` }))] });
      log(`  kit: Create New #${i + 1} "${me.text}" opens no dialog: it shows ${part.show.join(', ') || 'nothing'}${part.hide.length ? `, hides ${part.hide.join(', ')}` : ''}`);
      if (!part.restored) { log('  ! kit: that part could not be put away again: no further Create New is tried on this page'); break; }
      continue;
    }
    // a Create New that leaves the page (35 of 61 on the live portal: an Add page of its own): the guard aborted the navigation, the target is recorded so the pack can
    // capture it as a screen of its own (screen.links; scripts/ui.mjs follows them one level)
    const navEv = s.guard.events.slice(nav0).find((e) => e.type === 'navigation');
    if (!id && !part && navEv) {
      (screen.links ||= []).push({ kind: 'create', text: me.text, id: me.id, url: navEv.url });
      log(`  kit: Create New #${i + 1} "${me.text}" goes to ${navEv.url.replace(/^https?:\/\/[^/]+/, '')}: a page of its own (recorded in screen.links)`);
      continue;
    }
    if (!id) { log(`  ! kit: Create New #${i + 1} opened no dialog (requests after the click: ${requestsSince(t0).map((r) => `${r.method} ${r.url}`).join(', ') || 'none'})`); continue; }
    screen.dialogs[id].requests = requestsSince(t0);
    screen.dialogs[id].openerIndex = i;
    screen.dialogs[id].openerId = me.id;
    states.push({ name: `dialog-${id}`, steps, wait: 1200, shot: `states/dialog-${id}.png` }, ...partStates(id, steps));
    await dialogBehaviour(id, async () => { await el.click({ timeout: 3000 }).catch(() => {}); return waitWindow(20000); });
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
      if (nav && !id) (screen.links ||= []).push({ kind: 'row', url: nav.url });
      if (id) {
        screen.dialogs[id].requests = screen.row.requests;
        const steps = [{ do: 'click', sel: '[data-kit-action=search]' }, { do: how === 'dblclick' ? 'dblclick' : 'click', sel: '[data-kit-row="0"]' }];
        states.push({ name: `row-${id}`, steps, wait: 1200, shot: `states/dialog-${id}.png`, expect: [{ sel: `[data-kit-dialog="${id}"]`, why: `a ${how === 'dblclick' ? 'double-click' : 'click'} on a grid row opens its dialog` }] }, ...partStates(id, steps));
        await dialogBehaviour(id, async () => { await (how === 'dblclick' ? hit.dblclick({ timeout: 3000 }) : hit.click({ timeout: 3000 })).catch(() => {}); return waitWindow(20000); });
        for (let tries = 0; tries < 3 && await visibleWindow(); tries++) { await page.evaluate(() => window.__kit.closeDialog()); await page.waitForTimeout(800); }
      }
      log(`  kit: first row (${how}) -> ${id ? `dialog ${id} "${screen.dialogs[id].title}"` : nav ? `navigates to ${screen.row.navigates} (not followed)` : 'nothing'}`);
    }
  }
  // every dialog the script can open should now be harvested (its window is built on the element id = the panel id)
  const got = new Set(Object.values(screen.dialogs).map((d) => d.contentId).filter(Boolean));
  screen.missing = screen.plan.dialogs.filter((d) => !got.has(d.panel) && (d.opener || d.via === 'row-dblclick'));
  if (screen.missing.length) log(`  ! kit: dialogs the script opens but the capture did not see: ${screen.missing.map((d) => `${d.panel} (${d.opener || d.via})`).join(', ')}`);
  // what radios, checkboxes and dropdown values show or hide on the page (the capture put every control back afterwards)
  screen.conditionals = await sweep(page, 'page').catch(() => []);
  const nCond = screen.conditionals.length + Object.values(screen.dialogs).reduce((n, d) => n + (d.conditionals?.length || 0), 0);
  if (nCond) log(`  kit: ${nCond} control(s) show or hide parts (${[...screen.conditionals, ...Object.values(screen.dialogs).flatMap((d) => d.conditionals || [])].map((c) => c.name).join(', ')})`);
  // the side menu and the module tab, checked on the rebuild: the menu opens (with its backdrop), a module flies out on hover, its close icon closes it; the tab opens a band
  if (menuFound && !flyShot) log('  ! kit: no module of the side menu opened a submenu on hover: the fly-out is not checked');
  states.push(...menuStates({ dir, menu: menuFound ? menu : null, menuShot, flyShot, barFound }));
  // the same screen at the other viewport profiles (config "profiles")
  await profilePass({ ctx: { cfg, viewport: viewport ?? { width: 0, height: 0 }, dpr, open, url }, screen, states, dir, log }).catch((e) => log(`  ! kit: viewport profiles: ${String(e.message).split('\n')[0]}`));
  log(`  kit: ${Object.keys(screen.dialogs).length} dialog(s) ${Object.values(screen.dialogs).map((d) => `"${d.title}"`).join(', ')}; ${states.length} state check(s)`);
  writeJson(path.join(dir, 'screen.json'), screen);
  writeJson(path.join(dir, 'states.json'), states);
  return screen;
}

// a Create New that shows a part of the page or of a dialog instead of opening a window
const partLine = (where) => (c) => `- "${c.text}"${c.id ? ` (#${c.id})` : ''} ${where} opens no window: it shows ${c.show.join(', ') || 'nothing'}${c.hide.length ? ` and hides ${c.hide.join(', ')}` : ''} (picture kit/${c.shot}); a Cancel inside that part puts it away again. The kit does this`;

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
    k.search ? `- Search reveals ${k.search.reveals.join(', ') || 'nothing'}; calls ${k.search.requests.map((r) => `${r.method} ${r.url}`).join(', ') || 'no endpoint'}${k.search.rows ? `. The capture clicked Search with the form as it loads (nothing typed) and the live page listed ${k.search.rows} row(s): Search needs no criteria on this screen` : ''}` : '- No Search on this screen',
    ...(k.creates ?? []).map(partLine('on the page')),
    ...Object.entries(k.dialogs).flatMap(([id, d]) => (d.creates ?? []).filter((c) => !c.dialog).map(partLine(`in dialog [kit:${id}] "${d.title}"`))),
    ...Object.entries(k.grids).map(([id, g]) => `- [kit:${id}] after Search: ${g.total} rows, page size ${g.pageSize}; field types ${Object.entries(g.fields).map(([n, t]) => `${n}:${t.type}`).join(', ')} (rows in the rebuild are synthetic)`),
    ...Object.entries(k.dialogs).map(([id, d]) => `- [kit:${id}] dialog "${d.title}" (opened by ${d.opener}${d.parent ? `, inside ${d.parent}` : ''}): actions ${d.actions.map((a) => a.action).join('/')}; ${dlgWidgets(d)}; markup kit/dialogs/${id}.html, picture kit/states/dialog-${id}.png`),
    ...Object.values(k.dialogs).flatMap((d) => d.fields.filter((x) => Object.keys(x.validation).length).map((x) => `- dialog "${d.title}" field ${x.name}: validation ${Object.entries(x.validation).map(([r, m]) => `${r} "${m}"`).join('; ')}`)),
    k.row ? `- First grid row: ${k.row.dialog ? `opens dialog ${k.row.dialog}${k.row.via === 'dblclick' ? ' on double-click (a single click selects the row)' : ''}` : k.row.navigates ? `navigates to ${k.row.navigates} (another page, out of this screen)` : 'no effect'}` : '',
    // what the capture measured about small behaviors (the kit replays each; none of it needs code in the screen)
    k.search?.outcome ? `- Search with the form as it loads: ${k.search.outcome === 'validation' ? `answers with a validation banner (${k.search.validation.summaries.map((b) => `"${b.text.slice(0, 120)}"`).join(', ') || 'no summary'}) and ${k.search.validation.fields.length} field message(s), not rows` : k.search.outcome === 'rows' ? `lists ${k.search.rows} row(s)` : 'shows nothing'}` : '',
    ...[['the page', k.conditionals ?? []], ...Object.values(k.dialogs).map((d) => [`dialog "${d.title}"`, d.conditionals ?? []])].flatMap(([where, list]) => list.map((c) => `- ${c.kind} ${c.name} on ${where}: ${Object.entries(c.values).map(([v, st]) => `${v} shows [${Object.entries(st).filter(([, on]) => on).map(([sel]) => sel).join(', ') || 'none'}]`).join('; ')} (measured; the kit applies it)`)),
    ...Object.values(k.dialogs).filter((d) => d.saveValidation).map((d) => `- Save with nothing filled in "${d.title}": ${d.saveValidation.summaries.length ? 'a summary banner and ' : ''}${d.saveValidation.fields.length} field message(s), nothing sent`),
    ...Object.values(k.dialogs).filter((d) => d.close).map((d) => `- Closing "${d.title}" with an edit: X ${d.close.x ? (d.close.x.asks ? 'asks "form data has changed"' : 'closes') : '?'}, Cancel ${d.close.cancel ? (d.close.cancel.asks ? 'asks' : 'closes') : 'not tried'}${d.close.confirm ? `; the confirm's buttons: ${d.close.confirm.buttons.map((b) => b.text).join(' / ')}` : ''}`),
    ...Object.values(k.widgets).filter((w) => /date|time/.test(w.kind) && (w.offsetDays != null || w.focusMask)).map((w) => `- ${w.label || w.name} (${w.kind}): ${w.offsetDays != null ? `prefilled ${Math.abs(w.offsetDays) <= 1000 ? `${w.offsetDays} day(s) from today` : `with ${w.value} (a placeholder date, stays as is)`}` : 'empty'}${w.focusMask ? `, shows "${w.focusMask}" on focus` : ''}`),
    k.responsive ? `- Layouts: ${k.responsive.query ? `below ${k.responsive.query} the portal places a dialog by its own phone branch${k.responsive.dialog ? ` (left ${k.responsive.dialog.left}px, top ${k.responsive.dialog.top}px, ${k.responsive.dialog.minWidthPct ?? k.responsive.dialog.widthPct}% wide, at most ${k.responsive.dialog.maxHeightPct}% high)` : ''}; above it centers it${k.responsive.desktop?.maxHeightPct ? `, at most ${k.responsive.desktop.maxHeightPct}% high` : ''}. A dialog touching the left edge at the small size is correct` : 'dialogs are centered at every captured size'}. Captured at: ${Object.entries(k.profiles ?? {}).map(([n, p]) => `${n} ${p.viewport.width}x${p.viewport.height}`).join(', ') || 'one size'}` : '',
    k.filterPopup ? `- The grid's column filter opens a popup (${k.filterPopup.buttons.join(' / ')}); the kit builds it from the live markup` : '',
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
  if (k.search) done.push(`Search: fills the grid with synthetic rows${k.search.reveals.length ? `, reveals ${k.search.reveals.join(', ')}` : ''}${k.search.rows ? `. On the live page a Search with nothing typed listed ${k.search.rows} row(s): keep it that way (no rule of yours may stop a Search with an empty form; the checks click Search, then a row)` : ''}`);
  for (const [where, list] of [['the page', k.creates ?? []], ...Object.values(k.dialogs).map((d) => [`dialog "${d.title}"`, (d.creates ?? []).filter((c) => !c.dialog)])])
    for (const c of list) done.push(`"${c.text}" on ${where}: shows ${c.show.join(', ') || 'nothing'}${c.hide.length ? `, hides ${c.hide.join(', ')}` : ''}; Cancel / Save inside that part put it away`);
  if (k.row?.dialog) done.push(`grid row: ${k.row.via === 'dblclick' ? 'a click selects it, a double-click opens' : 'a click opens'} dialog ${k.row.dialog}`);
  if (k.search?.outcome === 'validation') done.push(`Search with nothing changed: shows the live validation banner and field messages (not rows); with something typed it shows the grid`);
  const nCond = (k.conditionals?.length ?? 0) + Object.values(k.dialogs).reduce((n, d) => n + (d.conditionals?.length ?? 0), 0);
  if (nCond) done.push(`${nCond} radio / checkbox / dropdown effect(s) on hidden parts, measured on the live page and applied by the kit (do not write your own show/hide for them)`);
  if (Object.values(k.dialogs).some((d) => d.saveValidation)) done.push('Save with nothing filled: the summary banner (with its X) and the field messages');
  if (Object.values(k.dialogs).some((d) => d.close?.confirm)) done.push('closing a dialog with an edit: the "form data has changed" window where the live one asked (X, Cancel, Escape)');
  if (k.responsive) done.push(`dialog placement by layout: ${k.responsive.query ? `below ${k.responsive.query} the portal's phone branch, above it centered` : 'centered'}, capped at a share of the window's height (a dialog at the left edge at the small size is correct)`);
  if (k.filterPopup) done.push("the grid's column filter popup");
  if (k.actions.some((a) => a.action === 'reset')) done.push('Reset: clears the fields');
  if (k.actions.some((a) => a.action === 'collapse')) done.push('collapsible panels (chevrons)');
  done.push('tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu');
  for (const [id, w] of Object.entries({ ...k.widgets, ...Object.assign({}, ...Object.values(k.dialogs).map((d) => d.widgets)) }))
    if (w.cascadeFrom) left.push(`${id} "${label(w)}" cascades from ${w.cascadeFrom}: the kit enables it when the parent has a value; give it the options per parent value from the screen's script`);
  if (k.actions.some((a) => a.action === 'cancel')) left.push("Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)");
  // parts a radio / checkbox / dropdown value shows or hides were measured (conditionals) and the kit applies them: only the rest is left
  const covered = (list) => new Set((list ?? []).flatMap((c) => Object.values(c.values).flatMap((st) => Object.keys(st))).map((sel) => /data-kit-h="(h\d+)"/.exec(sel)?.[1]).filter(Boolean));
  const pageLeft = k.hidden.filter((id) => !covered(k.conditionals).has(id) && !(k.search?.reveals ?? []).includes(id));
  if (pageLeft.length) left.push(`${pageLeft.length} part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (${pageLeft.join(', ')}${k.search?.reveals?.length ? `; Search reveals ${k.search.reveals.join(', ')}` : ''}): find in the script what shows each and build that`);
  for (const d of Object.values(k.dialogs)) {
    const dl = (d.hidden ?? []).filter((id) => !covered(d.conditionals).has(id));
    if (dl.length) left.push(`dialog "${d.title}": ${dl.length} part(s) hidden at rest that no measured control shows: from the dialog's script`);
  }
  for (const d of k.missing ?? []) left.push(`dialog ${d.panel} (${d.opener ? `button ${d.opener}` : d.via}) is opened by the screen's script but was NOT captured: do not invent it. Write it in GUESSED.md as "not captured, re-capture needed"`);
  if (k.row && !k.row.dialog && k.plan?.rowDouble) left.push(`grid row double-click calls ${k.plan.rowDouble}${k.plan.rowOpens === 'navigate' ? ' (it navigates to another page: out of this screen, do nothing)' : ' but the capture saw no dialog: write it in GUESSED.md'}`);
  left.push("every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)");
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
