#!/usr/bin/env node
// Q16 - hamburger/side menu behavior probe (online)
//
// Produces: docs/provider-probe/16-menu.json + related PNGs.
//
// Credentials from env:
// - USERNAME
// - UI_PASSWORD (fallback to PASSWORD)
//
// Safety:
// - Read-only only; does not click menu items.
// - Does not print or persist passwords/cookies/storageState.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { launch, openPage } from '../../scripts/lib/browser.mjs';
import { login } from '../../scripts/lib/portal.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;

const ROOT = path.resolve('.');
const OUT = path.join(ROOT, 'docs', 'provider-probe');

const BASE = 'https://uximc.mms.tst.pgwcloud.net';
const URLS = {
  cfg: `${BASE}/FileTransfer/SearchSourceLocations`,
  home: `${BASE}/Home/MyHome`,
};

const STYLE_PROPS = [
  'display', 'position', 'box-sizing', 'width', 'height',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius',
  'background-color', 'background-image', 'color',
  'font-family', 'font-size', 'font-weight', 'font-style',
  'line-height', 'letter-spacing', 'text-transform',
  'box-shadow', 'opacity', 'transform', 'transition', 'animation',
  'z-index', 'overflow', 'cursor',
];

const ensureDir = (d) => fs.mkdirSync(d, { recursive: true });
const writeJson = (name, obj) => fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 1));
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const cap = (s, max = 60_000) => (s && s.length > max ? `${s.slice(0, max)}ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦<truncated>` : s);

const redactString = (s) => {
  if (s == null) return s;
  let out = String(s);
  out = out.replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, '<redacted ip>');
  out = out.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '<redacted email>');
  out = out.replace(/\b(Welcome|Signed in as|Logged in as)\s+[^<\r\n]{1,60}/gi, '$1 <redacted user>');
  return out;
};

async function safeOuterHTML(page, selector) {
  const html = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const clone = el.cloneNode(true);
    for (const input of clone.querySelectorAll('input[type="hidden"], input[type="password"], input[name="__RequestVerificationToken"], input[name="fakepasswordremembered"]')) {
      if (input.hasAttribute('value')) input.setAttribute('value', '<redacted>');
      if ('value' in input) input.value = '<redacted>';
    }
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const t = n.nodeValue || '';
      if (!t.trim()) continue;
      const ip = /\b\d{1,3}(?:\.\d{1,3}){3}\b/g;
      const email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
      if (ip.test(t) || email.test(t)) n.nodeValue = t.replace(ip, '<redacted ip>').replace(email, '<redacted email>');
    }
    return clone.outerHTML;
  }, selector);

  return redactString(cap(html));
}

async function styleDump(page, selector) {
  return await page.evaluate(([sel, props]) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const style = {};
    for (const p of props) style[p] = cs.getPropertyValue(p);
    return { selector: sel, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }, style };
  }, [selector, STYLE_PROPS]);
}

async function markFirstVisible(page, selectors, attrName) {
  return await page.evaluate(([sels, attr]) => {
    const isVis = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 10 && r.height > 10;
    };

    const W = innerWidth || 1920;
    const scoreOf = (el) => {
      const r = el.getBoundingClientRect();
      const area = Math.max(0, r.width * r.height);
      const rightness = Math.max(0, Math.min(1, r.x / W));
      // Prefer big panels, and panels more to the right (hamburger menu in this portal opens on the right)
      return area + rightness * 500000;
    };

    const candidates = [];
    for (const s of sels) {
      for (const el of document.querySelectorAll(s)) {
        if (!isVis(el)) continue;
        candidates.push(el);
      }
    }

    if (!candidates.length) return null;
    const best = candidates.sort((a, b) => scoreOf(b) - scoreOf(a))[0];
    document.querySelectorAll(`[${attr}]`).forEach((e) => e.removeAttribute(attr));
    best.setAttribute(attr, '1');
    return `[${attr}="1"]`;
  }, [selectors, attrName]);
}

async function sampleFrames(page, selector) {
  const ts = [0, 16, 50, 100, 150, 200, 300, 400, 600];
  const frames = [];
  const read = async () => page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      rect: { x: r.x, y: r.y, width: r.width, height: r.height },
      opacity: cs.opacity,
      transform: cs.transform,
      height: cs.height,
      overflow: cs.overflow,
      clipPath: cs.clipPath,
    };
  }, selector);

  const start = Date.now();
  for (const t of ts) {
    const now = Date.now();
    const wait = Math.max(0, t - (now - start));
    if (wait) await page.waitForTimeout(wait);
    frames.push({ t, v: await read() });
  }
  return frames;
}

async function sampleMotion(page, selector, openFn, closeFn) {
  const widgetAnimation = await page.evaluate((sel) => {
    try {
      const el = document.querySelector(sel);
      // eslint-disable-next-line no-undef
      if (!el || !window.kendo || typeof kendo.widgetInstance !== 'function') return null;
      // eslint-disable-next-line no-undef
      const w = kendo.widgetInstance(el);
      return w?.options?.animation ?? null;
    } catch {
      return null;
    }
  }, selector);

  await openFn();
  const open = await sampleFrames(page, selector);
  await closeFn();
  const close = await sampleFrames(page, selector);

  return { selector, widgetAnimation, open, close };
}

async function withPage(browser, cfg, { url, viewport, dpr }, fn) {
  const s = await openPage(browser, cfg, { url, viewport, dpr });
  try {
    await s.load();
    return await fn(s);
  } finally {
    await s.close();
  }
}

async function runQ16(browser, cfg, env, pack) {
  const out = {
    note: 'Hamburger/side-menu behavior. Read-only: does not click menu items or navigate.',
    playwrightVersion,
    url: URLS.cfg,
    selectorsTried: null,
    menuButton: null,
    panelSelector: null,
    overlaySelector: null,
    openCloseSample_click: null,
    openCloseSample_keyboard: null,
    screenshots: {},
    styles: {},
    menuItems: null,
    hoverSubmenu: null,
    focus: {},
    guardEvents: null,
  };

  const viewport = env.viewport;
  const dpr = env.dpr;

  return await withPage(browser, cfg, { url: URLS.cfg, viewport, dpr }, async (s) => {
    const menuButtonSel = pack.menuButton || '#pageBannerMenu > nav > div > i';
    out.menuButton = menuButtonSel;

    out.screenshots.top = '16-menu-top.png';
    await s.page.screenshot({ path: path.join(OUT, out.screenshots.top), fullPage: false }).catch(() => {});

    out.styles.hamburgerButton = await styleDump(s.page, menuButtonSel);
    out.styles.pageHeader = await styleDump(s.page, '#pageHeader');

    // --- Open via click
    const openClick = async () => {
      await s.page.click(menuButtonSel, { timeout: 6000 }).catch(() => {});
      await s.page.waitForTimeout(600);
    };
    const closeEsc = async () => {
      await s.page.keyboard.press('Escape').catch(() => {});
      await s.page.waitForTimeout(400);
    };

    await openClick();

    const panelSel = await markFirstVisible(
      s.page,
      [
        '[role="menu"]',
        '.k-animation-container',
        '.k-popup',
        '.k-menu',
        '.k-drawer',
        '.k-drawer-wrapper',
        '.k-panelbar',
        '.k-treeview',
        '.mainMenu',
        '#mainMenu',
      ],
      'data-pw-probe-menu'
    );

    out.panelSelector = panelSel;
    out.overlaySelector = await markFirstVisible(s.page, ['.k-overlay'], 'data-pw-probe-overlay');

    out.screenshots.open = '16-menu-open.png';
    await s.page.screenshot({ path: path.join(OUT, out.screenshots.open), fullPage: false }).catch(() => {});

    if (panelSel) {
      out.styles.panel = await styleDump(s.page, panelSel);
      out.panelOuterHTML = await safeOuterHTML(s.page, panelSel);

      // Visible items snapshot (labels/hrefs only; do not click)
      out.menuItems = await s.page.evaluate((sel) => {
        const root = document.querySelector(sel);
        if (!root) return null;
        const isVis = (el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 4 && r.height > 4;
        };
        const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();

        const candidates = [...root.querySelectorAll('a[href], [role="menuitem"], li, button')]
          .filter(isVis)
          .filter((e) => !e.querySelector('a[href], [role="menuitem"], li, button'));

        const items = [];
        for (const el of candidates.slice(0, 600)) {
          const a = el.matches('a[href]') ? el : el.querySelector('a[href]') || el.closest('a[href]');
          const label = norm(el.innerText || el.textContent || el.getAttribute('aria-label') || el.getAttribute('title') || '');
          if (!label) continue;
          items.push({
            label,
            href: a ? a.getAttribute('href') : null,
            tag: el.tagName.toLowerCase(),
            classes: norm(el.getAttribute('class') || '').split(' ').filter(Boolean),
            ariaExpanded: el.getAttribute('aria-expanded') || null,
          });
        }

        return {
          itemCount: items.length,
          items: items.slice(0, 400),
          note: 'Leaf-most visible menu-related elements under the open panel; truncated.'
        };
      }, panelSel);


      // Hover behavior (submenu) best-effort: hover a parent item and capture the opened panel.
      out.hoverSubmenu = await (async () => {
        try {
          const picked = await s.page.evaluate((rootSel) => {
            const root = document.querySelector(rootSel);
            if (!root) return null;
            const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
            const isVis = (el) => {
              const cs = getComputedStyle(el);
              const r = el.getBoundingClientRect();
              return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 6 && r.height > 6;
            };

            const candidates = [...root.querySelectorAll('a[href], [role="menuitem"], li, button')]
              .filter(isVis)
              .filter((e) => !e.querySelector('a[href], [role="menuitem"], li, button'));

            const hasSubHint = (el) => {
              const aHas = String(el.getAttribute('aria-haspopup') || '').toLowerCase() === 'true';
              const exp = el.hasAttribute('aria-expanded');
              const cls = (el.getAttribute('class') || '');
              const kendoHint = /k-item|k-menu-item|k-link|k-panelbar-item/i.test(cls);
              const hasGroup = !!(el.querySelector('ul,[role="menu"],.k-menu-group,.k-group') || el.closest('li')?.querySelector('ul,[role="menu"],.k-menu-group,.k-group'));
              return aHas || exp || hasGroup || kendoHint;
            };

            const best = candidates.find(hasSubHint) || candidates[0];
            if (!best) return null;
            root.querySelectorAll('[data-pw-probe-hoveritem]').forEach((e) => e.removeAttribute('data-pw-probe-hoveritem'));
            best.setAttribute('data-pw-probe-hoveritem', '1');
            const label = norm(best.innerText || best.textContent || best.getAttribute('aria-label') || best.getAttribute('title') || '');
            return { selector: '[data-pw-probe-hoveritem="1"]', label };
          }, panelSel);

          if (!picked?.selector) return { error: 'no visible menu item found to hover' };

          const itemSel = picked.selector;
          const before = await styleDump(s.page, itemSel);
          await s.page.hover(itemSel).catch(() => {});
          await s.page.waitForTimeout(700);
          const after = await styleDump(s.page, itemSel);

          const submenuSel = await s.page.evaluate(([rootSel, attr]) => {
            const root = document.querySelector(rootSel);
            if (!root) return null;
            const isVis = (el) => {
              const cs = getComputedStyle(el);
              const r = el.getBoundingClientRect();
              return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 10 && r.height > 10;
            };
            document.querySelectorAll(`[${attr}]`).forEach((e) => e.removeAttribute(attr));
            const sels = ['.k-animation-container', '.k-popup', '[role="menu"]', '.k-menu-group', '.k-group', '.k-menu'];
            const nodes = [];
            for (const s of sels) nodes.push(...document.querySelectorAll(s));
            const hit = nodes.find((e) => isVis(e) && e !== root && !root.contains(e));
            if (!hit) return null;
            hit.setAttribute(attr, '1');
            return `[${attr}="1"]`;
          }, [panelSel, 'data-pw-probe-submenu']);

          const result = {
            hoveredItem: { selector: itemSel, label: picked.label },
            itemStyle: { rest: before, hover: after },
            submenuSelector: submenuSel,
            submenuStyle: submenuSel ? await styleDump(s.page, submenuSel) : null,
            submenuOuterHTML: submenuSel ? await safeOuterHTML(s.page, submenuSel) : null,
            sample: null,
            screenshot: null,
          };

          if (submenuSel) {
            result.screenshot = '16-menu-hover-open.png';
            await s.page.screenshot({ path: path.join(OUT, result.screenshot), fullPage: false }).catch(() => {});
            result.sample = await sampleMotion(
              s.page,
              submenuSel,
              async () => {
                await s.page.hover(itemSel).catch(() => {});
                await s.page.waitForTimeout(650);
              },
              async () => {
                await s.page.mouse.move(5, 5).catch(() => {});
                await s.page.waitForTimeout(650);
              }
            );
          }

          return result;
        } catch (e) {
          return { error: String(e?.message || e) };
        }
      })();
      out.openCloseSample_click = await sampleMotion(s.page, panelSel, async () => {}, closeEsc);

      // Re-open to measure keyboard open
      await openClick();
      const panelSel2 = await markFirstVisible(s.page, [panelSel], 'data-pw-probe-menu');
      if (panelSel2) {
        // Try keyboard close/open: focus hamburger -> Enter -> Esc
        await s.page.focus(menuButtonSel).catch(() => {});
        out.focus.beforeKeyboard = await s.page.evaluate(() => ({ activeTag: document.activeElement?.tagName?.toLowerCase() || null, activeId: document.activeElement?.id || null }));

        const openKbd = async () => {
          await s.page.keyboard.press('Enter').catch(() => {});
          await s.page.waitForTimeout(600);
        };
        const closeKbd = async () => {
          await s.page.keyboard.press('Escape').catch(() => {});
          await s.page.waitForTimeout(400);
        };

        out.openCloseSample_keyboard = await sampleMotion(s.page, panelSel2, openKbd, closeKbd);
        await openKbd();
        out.screenshots.openKeyboard = '16-menu-open-kbd.png';
        await s.page.screenshot({ path: path.join(OUT, out.screenshots.openKeyboard), fullPage: false }).catch(() => {});
        await closeKbd();
        out.focus.afterKeyboard = await s.page.evaluate(() => ({ activeTag: document.activeElement?.tagName?.toLowerCase() || null, activeId: document.activeElement?.id || null }));
      }
    } else {
      out.error = 'Could not find visible menu panel after clicking hamburger.';
    }

    out.guardEvents = s.guard?.events || null;
    return out;
  });
}

async function main() {
  ensureDir(OUT);

  const cfgRaw = readJson(path.resolve('config.json'));
  const pack = readJson(path.resolve('packs/file-transfer/pack.json'));

  const username = process.env.USERNAME || '';
  const password = process.env.UI_PASSWORD || process.env.PASSWORD || '';
  if (!username) {
    console.error('Missing USERNAME in environment.');
    process.exit(2);
  }
  if (!password) {
    console.error('Missing UI_PASSWORD (or PASSWORD) in environment.');
    process.exit(2);
  }

  const viewport = { width: 1920, height: 1080 };
  const dpr = 1;

  const sel = {
    ...(pack.selectors || {}),
    ...(pack.menuButton ? { menuButton: pack.menuButton } : {}),
  };

  const browser = await launch({ ...cfgRaw, headed: false });
  try {
    const storageState = await login(browser, {
      url: URLS.home,
      state: undefined,
      creds: { username, password },
      sel,
      viewport,
      log: () => {},
    });

    const cfg = {
      ...cfgRaw,
      mode: 'readonly',
      auth: { ...(cfgRaw.auth || {}), storageState },
    };

    const out = await runQ16(browser, cfg, { viewport, dpr }, pack);
    writeJson('16-menu.json', out);
  } finally {
    await browser.close().catch(() => {});
  }
}

await main();