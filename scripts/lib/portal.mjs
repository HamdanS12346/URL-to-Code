// A logged-in portal: log in, read its menu, find each screen's content area. Site-agnostic: the menu button, the login
// fields, the logged-in marker and the content area are found by heuristics, and each one can be pinned with a selector in
// packs/<pack>/pack.json "selectors" (menuButton, username, password, submit, loggedIn) or the screen's "scope".
import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import readline from 'node:readline/promises';
import { INPAGE } from './freeze.mjs';
import { launch, openPage } from './browser.mjs';

// .env into its own object, never process.env: on Windows USERNAME is already the Windows login and is never overridden
export const readEnv = (file) => { try { return util.parseEnv(fs.readFileSync(file, 'utf8')); } catch { return {}; } };

// typed input that is not echoed (the password): raw mode, one key at a time
export function askSecret(q) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(`${q}: `);
    let v = '';
    const done = (val) => { stdin.setRawMode(false); stdin.pause(); stdin.off('data', on); stdout.write('\n'); resolve(val); };
    const on = (buf) => {
      for (const c of buf.toString('utf8')) {
        if (c === '\r' || c === '\n') return done(v);
        if (c === '\u0003') { stdout.write('\n'); process.exit(130); } // Ctrl+C
        if (c === '\b' || c === '\u007f') v = v.slice(0, -1);
        else v += c;
      }
    };
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', on);
  });
}

export async function ask(q, def) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try { return (await rl.question(def ? `${q} [${def}]: ` : `${q}: `)).trim() || def || ''; } finally { rl.close(); }
}

// ---------- in-page helpers (run in the browser; window.__pw comes from inpage.js) ----------

// the button that opens the site menu (hamburger): marks it data-pw-menu, returns a selector for it
const FIND_MENU = (pinned) => {
  document.querySelectorAll('[data-pw-menu]').forEach((e) => e.removeAttribute('data-pw-menu'));
  let best = null;
  if (pinned) best = document.querySelector(pinned);
  else {
    const W = innerWidth, WORDS = /menu|hamburger|burger|toggle|toggler|bars|sidenav|drawer|offcanvas/i;
    let top = 0;
    for (const e of document.querySelectorAll('button,a,[role=button],div,span,i,img,svg')) {
      const r = e.getBoundingClientRect();
      if (r.top > 200 || r.width > 120 || r.height > 120 || r.width < 8 || !__pw.vis(e)) continue;
      const attrs = [e.id, e.getAttribute('class'), e.getAttribute('aria-label'), e.getAttribute('title'), e.getAttribute('alt'), e.getAttribute('data-toggle'), e.getAttribute('data-bs-toggle')].join(' ');
      let score = 0;
      if (WORDS.test(attrs)) score += 5;
      if (/^\s*[☰≡]\s*$/.test(e.textContent || '')) score += 5;
      // three thin bars drawn with spans
      if (e.children.length === 3 && [...e.children].every((c) => { const b = c.getBoundingClientRect(); return b.height <= 6 && b.width >= 10; })) score += 5;
      if (!score) continue;
      if (e.hasAttribute('aria-expanded') || e.hasAttribute('aria-controls')) score += 2;
      if (/^(BUTTON|A)$/.test(e.tagName) || e.getAttribute('role') === 'button') score += 1;
      score += (r.left / W) * 2; // a portal's hamburger usually sits top right
      if (score > top) { best = e; top = score; }
    }
    if (best) best = best.closest('button,a,[role=button]') || best;
  }
  if (!best) return null;
  best.setAttribute('data-pw-menu', '1');
  return __pw.makeSel()(best);
};

const LOGGED_IN = (pinned) => {
  if (pinned) return !!document.querySelector(pinned);
  if ([...document.querySelectorAll('input[type=password]')].some((e) => __pw.vis(e))) return false;
  // a logout entry exists (often inside a closed menu, so text, not visibility)
  return [...document.querySelectorAll('a,button,[role=menuitem],input[type=submit],input[type=button],li,span')]
    .some((e) => /^\s*(log ?out|log ?off|sign ?out)\s*$/i.test(e.value || e.textContent || ''));
};

// marks the login fields data-pw-login=user|pass|submit; null when no password field is visible
const MARK_LOGIN = (sel) => {
  document.querySelectorAll('[data-pw-login]').forEach((e) => e.removeAttribute('data-pw-login'));
  const q = (s) => (s ? document.querySelector(s) : null);
  const pass = q(sel.password) || [...document.querySelectorAll('input[type=password]')].find((e) => __pw.vis(e));
  if (!pass) return null;
  const before = [...document.querySelectorAll('input:not([type]),input[type=text],input[type=email],input[type=tel]')]
    .filter((e) => __pw.vis(e) && e.compareDocumentPosition(pass) & Node.DOCUMENT_POSITION_FOLLOWING);
  const user = q(sel.username) || before.pop();
  let submit = q(sel.submit);
  const isSubmit = (e) => __pw.vis(e) && (e.type === 'submit' || /^\s*(log ?in|sign ?in|submit|continue)\s*$/i.test(e.value || e.textContent || ''));
  // the nearest container around the password field that holds a submit-looking control
  for (let c = pass.form || pass.parentElement; !submit && c && c !== document.documentElement; c = c.parentElement)
    submit = [...c.querySelectorAll('button,input[type=submit],input[type=button],a,[role=button]')].find(isSubmit);
  pass.setAttribute('data-pw-login', 'pass');
  if (user) user.setAttribute('data-pw-login', 'user');
  if (submit) submit.setAttribute('data-pw-login', 'submit');
  return { user: !!user, submit: !!submit };
};

const ERROR_TEXT = () => [...document.querySelectorAll('[role=alert],.validation-summary-errors,.error,.alert-danger,.field-validation-error,.text-danger')]
  .filter((e) => __pw.vis(e)).map((e) => e.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean).join(' | ').slice(0, 200);

// menu reading: "seen" = visible before an action, so what appears after it is the action's result
const MARK_SEEN = () => {
  document.querySelectorAll('[data-pw-seen]').forEach((e) => e.removeAttribute('data-pw-seen'));
  for (const e of document.querySelectorAll('li,a,[role=menuitem]')) if (__pw.vis(e)) e.setAttribute('data-pw-seen', '1');
};
// menu items that appeared since MARK_SEEN (all: true = every visible item). group: only the biggest list (the module list)
const APPEARED = ({ all, group }) => {
  const lab = (e) => (e.innerText || '').split('\n')[0].replace(/\s+/g, ' ').trim();
  const fresh = (q) => [...document.querySelectorAll(q)].filter((e) => (all || !e.hasAttribute('data-pw-seen')) && __pw.vis(e) && lab(e) && lab(e).length < 80);
  let items = fresh('li');
  items = items.filter((e) => !items.some((o) => o !== e && e.contains(o))); // leaf-most: the item, not the list around it
  if (!items.length) { items = fresh('a,[role=menuitem]'); items = items.filter((e) => !items.some((o) => o !== e && e.contains(o))); }
  if (group && items.length) {
    const by = new Map();
    for (const e of items) by.set(e.parentElement, [...(by.get(e.parentElement) || []), e]);
    items = [...by.values()].sort((a, b) => b.length - a.length)[0];
  }
  const out = [], seen = new Set();
  for (const e of items) {
    const label = lab(e);
    if (seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    const a = e.matches('a[href]') ? e : e.querySelector('a[href]') || e.closest('a[href]');
    out.push({ label, href: a ? a.getAttribute('href') : null });
  }
  return out;
};
// marks the visible item with this label data-pw-hit (fresh: only one that appeared since MARK_SEEN)
const FIND_ITEM = ([label, fresh]) => {
  const norm = (s) => (s || '').split('\n')[0].replace(/\s+/g, ' ').trim().toLowerCase();
  document.querySelectorAll('[data-pw-hit]').forEach((e) => e.removeAttribute('data-pw-hit'));
  const c = [...document.querySelectorAll('li,a,[role=menuitem]')].filter((e) => __pw.vis(e) && (!fresh || !e.hasAttribute('data-pw-seen')) && norm(e.innerText) === norm(label));
  const hit = c.find((e) => !c.some((o) => o !== e && e.contains(o))); // innermost: the <a>, not its <li>
  if (hit) hit.setAttribute('data-pw-hit', '1');
  return !!hit;
};

// the screen's own area: the biggest visible element that is not site chrome (holds no menu button / header / banner)
const FIND_SCOPE = (menuSel) => {
  const shell = [menuSel && document.querySelector(menuSel), document.querySelector('[data-pw-menu]'), ...document.querySelectorAll('header,[role=banner]')].filter(Boolean);
  const ok = (e) => __pw.vis(e) && !shell.some((s) => e === s || e.contains(s) || s.contains(e)) && getComputedStyle(e).position !== 'fixed';
  const area = (e) => { const r = e.getBoundingClientRect(); return r.width * r.height; };
  let best = [...document.querySelectorAll('main,[role=main]')].find(ok);
  if (!best) best = [...document.body.querySelectorAll('*')].filter((e) => !/^(SCRIPT|STYLE|NOSCRIPT|IMG|SVG|IFRAME)$/i.test(e.tagName) && ok(e)).sort((a, b) => area(b) - area(a))[0];
  if (!best) return null;
  const r = best.getBoundingClientRect();
  return { sel: __pw.makeSel()(best), box: [r.x, r.y, r.width, r.height].map(Math.round) };
};

// ---------- login ----------

const settle = async (page, ms = 600) => {
  await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(ms);
};
const goto = async (page, url) => {
  // Portals can be slow (SSO redirects, cold start). Be patient and retry once.
  const timeout = 120000;
  for (let i = 0; ; i++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
      break;
    } catch (e) {
      const msg = String(e?.message || e);
      if (i >= 1 || !/Timeout|ERR_|net::/i.test(msg)) throw e;
    }
  }
  await settle(page);
};

export async function openMenu(page, sel = {}) {
  const found = await page.evaluate(FIND_MENU, sel.menuButton || null);
  if (!found) return null;
  await page.click('[data-pw-menu="1"]', { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(800);
  return found;
}

export async function isLoggedIn(page, sel = {}) {
  // Some portals navigate/redirect during login checks; treat context-destroy as "not logged in" and retry briefly.
  for (let i = 0; i < 3; i++) {
    try {
      return await page.evaluate(LOGGED_IN, sel.loggedIn || null);
    } catch (e) {
      const msg = String(e.message || e);
      if (!/Execution context was destroyed|Cannot find context with specified id|Target closed/i.test(msg)) throw e;
      await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(250);
    }
  }
  return false;
}

// One login. Returns the session (Playwright storage state) as an object: it is kept in memory and never written to disk,
// where the writer (Codex, which can read the whole disk) could see it. Its own context: openPage records POST bodies.
export async function login(browser, { url, state, creds, sel = {}, viewport, log = console.log }) {
  if (!creds.username || !creds.password) throw new Error('no USERNAME/PASSWORD: put USERNAME= in .env and type the password when asked (or set PASSWORD=), or run with --manual-login');
  const context = await browser.newContext({ viewport, ignoreHTTPSErrors: true, storageState: state || undefined });
  await context.addInitScript({ content: INPAGE });
  const page = await context.newPage();
  try {
    await goto(page, url);
    if (await isLoggedIn(page, sel)) { log('  already logged in'); return await context.storageState(); }
    let form = await page.evaluate(MARK_LOGIN, sel);
    let frame = null;
    if (!form && await openMenu(page, sel)) form = await page.evaluate(MARK_LOGIN, sel);
    if (!form) {
      const opened = await page.evaluate(() => {
        try {
          if (typeof getLogin === 'function') { getLogin(); return true; }
        } catch {}
        return false;
      });
      if (opened) {
        await settle(page);
        const end = Date.now() + 5000;
        while (!form && Date.now() < end) {
          form = await page.evaluate(MARK_LOGIN, sel);
          if (form) break;
          await page.waitForTimeout(250);
        }
      }
    }
    if (!form) { // a "Log in" link/button that reveals the form
      const links = page.locator('a,button,[role=button]').filter({ hasText: /^\s*(log ?in|sign ?in)\s*$/i });
      for (let i = 0, n = await links.count(); i < n && !form; i++) {
        const link = links.nth(i);
        if (await link.isVisible().catch(() => false)) {
          await link.click().catch(() => {});
          await settle(page);
          const end = Date.now() + 5000;
          while (!form && Date.now() < end) {
            form = await page.evaluate(MARK_LOGIN, sel);
            if (form) break;
            await page.waitForTimeout(250);
          }
        }
      }
    }
    // Some portals embed their login form in an iframe; page.evaluate can't see into frames.
    if (!form) {
      for (const f of page.frames()) {
        if (f === page.mainFrame()) continue;
        const m = await f.evaluate(MARK_LOGIN, sel).catch(() => null);
        if (m) { form = m; frame = f; break; }
      }
    }
    if (!form) throw new Error('no login form found (no visible password field, not even after opening the menu). Pin the fields in pack.json "selectors" (menuButton, username, password, submit) or use --manual-login');
    if (!form.user) throw new Error('found the password field but no username field before it: set pack.json "selectors.username"');
    const host = frame || page;
    await host.fill('[data-pw-login=user]', creds.username);
    await host.fill('[data-pw-login=pass]', creds.password);
    if (form.submit) await host.click('[data-pw-login=submit]', { timeout: 5000 });
    else await host.press('[data-pw-login=pass]', 'Enter');
    await page.waitForTimeout(1000);
    await settle(page, 1000);
    if (!(await isLoggedIn(page, sel))) await goto(page, url); // some portals only show the logged-in menu after a reload
    if (!(await isLoggedIn(page, sel))) {
      const msg = await page.evaluate(ERROR_TEXT).catch(() => '');
      throw new Error(`login did not work${msg ? `; the page says: "${msg}"` : ''}. Check USERNAME/PASSWORD, pin "selectors.loggedIn" if the portal has no visible Logout text, or use --manual-login`);
    }
    log('  logged in');
    return await context.storageState();
  } finally { await context.close(); }
}

// MFA, SSO, captcha, or a form the heuristics miss: a visible browser, you log in, Enter takes the session (in memory)
export async function manualLogin(cfg, { url, viewport }) {
  const b = await launch({ ...cfg, headed: true });
  try {
    const context = await b.newContext({ viewport, ignoreHTTPSErrors: true });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await ask('Log in in the browser window, then press Enter here');
    return await context.storageState();
  } finally { await b.close(); }
}

// is this session still good? (one page load)
export async function sessionValid(browser, { url, state, sel = {}, viewport }) {
  if (!state) return false;
  const context = await browser.newContext({ viewport, ignoreHTTPSErrors: true, storageState: state });
  await context.addInitScript({ content: INPAGE });
  try { const page = await context.newPage(); await goto(page, url); return await isLoggedIn(page, sel); } finally { await context.close(); }
}

// ---------- menu ----------

// Reads the whole menu (every module and its items, maxDepth levels) and resolves the URL of every leaf under `target`.
// Runs on the guarded page (browser.mjs): a click that would leave the page is aborted and recorded, which is how an item
// without an href gives away its URL. POSTs are blocked here.
export async function readMenu(browser, cfg, { url, viewport, dpr, sel = {}, target, pick, maxDepth = 3, shot, shotDir, log = console.log }) {
  const s = await openPage(browser, cfg, { url, viewport, dpr });
  const pictures = [];
  s.guard.allowPost = false;
  const page = s.page;
  const hoverMs = Math.max(400, cfg.explore?.hoverMs ?? 250);
  try {
    await s.load();
    // what the menu button reveals is the module list; no button: the biggest visible list (a menu that is always open)
    const menuSel = await page.evaluate(FIND_MENU, sel.menuButton || null);
    await page.evaluate(MARK_SEEN);
    if (menuSel) { await page.click('[data-pw-menu="1"]', { timeout: 5000 }).catch(() => {}); await page.waitForTimeout(800); }
    const modules = await page.evaluate(APPEARED, { all: !menuSel, group: true });
    const opened = async () => { // the menu still open (its first module visible), else reload and open it again
      if (await page.evaluate(FIND_ITEM, [modules[0].label, false])) return;
      await s.load();
      await openMenu(page, sel);
    };
    if (!modules.length) throw new Error('could not find the menu (nothing appeared after clicking the menu button). Pin pack.json "selectors.menuButton"');
    log(`  menu: ${modules.length} modules (${modules.map((m) => m.label).join(', ')})`);

    // walk a path of labels with the mouse: each level's item is looked for among what the previous hover revealed
    const walk = async (labels) => {
      await opened();
      for (let i = 0; i < labels.length; i++) {
        if (!(await page.evaluate(FIND_ITEM, [labels[i], i > 0]))) return false;
        await page.evaluate(MARK_SEEN);
        await page.hover('[data-pw-hit="1"]', { timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(hoverMs);
      }
      return true;
    };
    // clicks only on modules and inside the chosen one: a click elsewhere could start something (POSTs are blocked anyway)
    const expand = async (labels, depth, isTarget) => {
      if (!(await walk(labels))) return [];
      let kids = await page.evaluate(APPEARED, { all: false, group: false });
      if (!kids.length && (depth === 2 || isTarget)) { // click-to-open menus (accordion); the guard aborts a click that would navigate
        await page.evaluate(FIND_ITEM, [labels.at(-1), labels.length > 1]);
        await page.click('[data-pw-hit="1"]', { timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(hoverMs);
        kids = await page.evaluate(APPEARED, { all: false, group: false });
      }
      kids = kids.filter((k) => k.label.toLowerCase() !== labels.at(-1).toLowerCase());
      // a picture of each module's open flyout: the explorer only follows controls, so a CSS-hover menu is seen here or nowhere
      if (shotDir && depth === 2 && kids.length) {
        const f = path.join(shotDir, `${labels[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'module'}.png`);
        fs.mkdirSync(shotDir, { recursive: true });
        await page.screenshot({ path: f }).catch(() => {});
        pictures.push(path.basename(f));
      }
      if (depth < maxDepth) for (const k of kids) { const c = await expand([...labels, k.label], depth + 1, isTarget); if (c.length) k.children = c; }
      return kids;
    };

    const norm = (x) => x.toLowerCase().replace(/\s+/g, ' ').trim();
    let mod = modules.find((m) => norm(m.label) === norm(target)) || modules.find((m) => norm(m.label).startsWith(norm(target))) || modules.find((m) => norm(m.label).includes(norm(target)));
    if (!mod && pick) mod = await pick(modules);
    if (!mod) throw new Error(`no menu item "${target}". The menu has: ${modules.map((m) => m.label).join(', ')}`);
    for (const m of modules) {
      log(`  reading ${m.label}…`);
      const c = await expand([m.label], 2, m === mod);
      if (c.length) m.children = c;
    }
    log(`  ${mod.label}: ${(mod.children || []).length} item(s)`);

    // every leaf under the chosen module is a screen: its URL from the href, else from where a click tries to go
    const leaves = [];
    const visit = (n, trail) => { if (n.children?.length) for (const c of n.children) visit(c, [...trail, c.label]); else leaves.push({ node: n, trail }); };
    for (const c of mod.children || []) visit(c, [mod.label, c.label]);
    for (const { node, trail } of leaves) {
      const real = node.href && !/^(#|javascript:)/i.test(node.href.trim());
      if (real) { node.url = new URL(node.href, page.url()).href; continue; }
      await walk(trail.slice(0, -1));
      await page.evaluate(FIND_ITEM, [trail.at(-1), trail.length > 1]);
      const n = s.guard.events.length;
      const frames = await page.evaluate(() => [...document.querySelectorAll('iframe')].map((f) => f.src));
      await page.click('[data-pw-hit="1"]', { timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(1500);
      const ev = s.guard.events.slice(n).find((e) => e.type === 'navigation' || e.type === 'popup');
      const frame = (await page.evaluate(() => [...document.querySelectorAll('iframe')].map((f) => f.src))).find((f, i) => f && f !== frames[i]);
      if (ev) node.url = ev.url;
      else if (frame) { node.url = frame; node.iframe = true; }
      else node.url = null;
      await s.load(); // the click may have changed the page: start the next one clean
    }
    if (shot) { // evidence: the open menu with the chosen module's items showing
      await walk([mod.label]);
      await page.screenshot({ path: shot }).catch(() => {});
    }
    return { modules, module: mod, leaves: leaves.map((l) => ({ ...l.node, trail: l.trail })), menuSel, pictures };
  } finally { await s.close(); }
}

// the content area of a screen (what the shell wraps): pinned or found
export async function findScope(browser, cfg, { url, viewport, dpr, sel = {} }) {
  const s = await openPage(browser, cfg, { url, viewport, dpr });
  s.guard.allowPost = false;
  try {
    await s.load();
    const menuSel = await s.page.evaluate(FIND_MENU, sel.menuButton || null);
    return await s.page.evaluate(FIND_SCOPE, menuSel);
  } finally { await s.close(); }
}
