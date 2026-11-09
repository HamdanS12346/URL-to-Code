#!/usr/bin/env node
// provider-probe (online)
//
// Runs a read-only Playwright probe against the live Provider portal.
// Writes artifacts to: docs/provider-probe/
//
// Credentials:
// - USERNAME from env
// - UI_PASSWORD from env (fallback to PASSWORD)
//
// Safety:
// - Does not print or persist passwords/cookies/storageState.
// - Uses openPage() guard with cfg.mode=readonly (mutations blocked by default).

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
  home: `${BASE}/Home/MyHome/`,
  cfg: `${BASE}/FileTransfer/SearchSourceLocations`,
  trk: `${BASE}/FileTransfer/SearchFileTransferTracking`,
  ftp: `${BASE}/FileTransfer/SearchFTPServerCredentials`,
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
const writeText = (name, text) => fs.writeFileSync(path.join(OUT, name), text);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const cap = (s, max = 60_000) => (s && s.length > max ? `${s.slice(0, max)}â€¦<truncated>` : s);

const redactString = (s) => {
  if (s == null) return s;
  let out = String(s);
  out = out.replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, '<redacted ip>');
  out = out.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '<redacted email>');
  out = out.replace(/\b(Welcome|Signed in as|Logged in as)\s+[^<\r\n]{1,60}/gi, '$1 <redacted user>');
  return out;
};

async function safeOuterHTML(page, selector, { scrubGridCells = false } = {}) {
  const html = await page.evaluate(([sel, scrub]) => {
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

    if (scrub) {
      for (const td of clone.querySelectorAll('tbody td')) {
        const t = (td.textContent || '').trim();
        if (!t) continue;
        td.textContent = `<text len=${t.length}>`;
      }
    }

    return clone.outerHTML;
  }, [selector, scrubGridCells]);

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
    for (const s of sels) {
      const els = [...document.querySelectorAll(s)];
      const el = els.find(isVis);
      if (!el) continue;
      document.querySelectorAll(`[${attr}]`).forEach((e) => e.removeAttribute(attr));
      el.setAttribute(attr, '1');
      return `[${attr}="1"]`;
    }
    return null;
  }, [selectors, attrName]);
}

function row(q, status, note = '') {
  const mark = status === 'ok' ? 'âœ“' : status === 'partial' ? 'partial' : 'âœ—';
  return `- ${q}: ${mark}${note ? ` â€” ${note}` : ''}`;
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

async function q00(browser, cfg, env) {
  const out = await withPage(browser, cfg, { url: URLS.home, ...env }, async (s) => {
    return await s.page.evaluate(() => ({
      userAgent: navigator.userAgent,
      devicePixelRatio: window.devicePixelRatio,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      visualViewportScale: window.visualViewport?.scale ?? null,
    }));
  });
  writeJson('00-env.json', {
    ...out,
    playwrightVersion,
    viewportUsed: env.viewport,
    dprUsed: env.dpr,
    browserZoom: out.visualViewportScale ? `visualViewport.scale=${out.visualViewportScale}` : '[UNKNOWN]',
  });
}

async function q01(browser, cfg, env) {
  const out = { screens: {}, note: 'Live runtime stack fingerprint. Script/link paths omit query strings.' };
  for (const [screen, url] of Object.entries(URLS)) {
    out.screens[screen] = await withPage(browser, cfg, { url, ...env }, async (s) => {
      return await s.page.evaluate(() => {
        const strip = (u) => {
          try {
            const x = new URL(u, location.href);
            return { origin: x.origin, path: x.pathname };
          } catch {
            return { origin: null, path: u };
          }
        };

        const scripts = [...document.querySelectorAll('script[src]')].map((e) => strip(e.getAttribute('src')));
        const styles = [...document.querySelectorAll('link[rel="stylesheet"][href]')].map((e) => strip(e.getAttribute('href')));

        const fonts = [];
        try {
          // eslint-disable-next-line no-undef
          for (const f of document.fonts.values()) fonts.push({ family: f.family, weight: f.weight, style: f.style, status: f.status });
        } catch {}

        const fontOf = (sel) => {
          const el = document.querySelector(sel);
          return el ? getComputedStyle(el).fontFamily : null;
        };

        return {
          jquery: window.jQuery?.fn?.jquery ?? null,
          kendo: window.kendo?.version ?? null,
          kendoTheme: {
            stylesheetFiles: styles.filter((s) => (s.path || '').toLowerCase().includes('kendo')),
            htmlClass: document.documentElement.className || null,
            bodyClass: document.body?.className || null,
          },
          bootstrap: window.bootstrap?.Tooltip ? 'bootstrap (v? unknown)' : null,
          scripts,
          stylesheets: styles,
          fontsLoaded: fonts,
          computedFonts: {
            body: fontOf('body'),
            h1: fontOf('h1'),
            h2: fontOf('h2'),
            h3: fontOf('h3'),
            label: fontOf('label'),
            input: fontOf('input'),
            button: fontOf('button'),
          },
          serverHints: {
            requestVerificationTokenPresent: !!document.querySelector('input[name="__RequestVerificationToken"]'),
            metaGeneratorTags: [...document.querySelectorAll('meta[name="generator"], meta[name="Generator"]')]
              .map((m) => ({ name: m.getAttribute('name'), content: m.getAttribute('content') })),
          },
        };
      });
    });
  }
  writeJson('01-stack.json', out);
}

async function q02(browser, cfg, env) {
  for (const [screen, url] of Object.entries(URLS)) {
    const widgets = await withPage(browser, cfg, { url, ...env }, async (s) => {
      return await s.page.evaluate(() => {
        const targets = new Set();
        for (const sel of ['[data-role]', '.k-widget', '.k-input', '.k-dropdownlist', '.k-datetimepicker', '.k-grid', '.k-window', '.k-tooltip', '.k-panelbar', '.k-numerictextbox']) {
          for (const el of document.querySelectorAll(sel)) targets.add(el);
        }

        // eslint-disable-next-line no-undef
        const canWidget = !!(window.kendo && typeof kendo.widgetInstance === 'function');

        const rows = [];
        for (const el of targets) {
          let widget = null;
          if (canWidget) {
            try {
              // eslint-disable-next-line no-undef
              const w = kendo.widgetInstance(el);
              if (w) widget = { name: w.options?.name ?? w.name ?? null };
            } catch {}
          }
          rows.push({
            role: el.getAttribute?.('data-role') || null,
            id: el.id || null,
            name: el.getAttribute?.('name') || null,
            tag: el.tagName?.toLowerCase() || null,
            classes: (el.getAttribute?.('class') || '').trim().split(/\s+/).filter(Boolean),
            widget,
          });
        }

        return { count: rows.length, items: rows };
      });
    });

    writeJson(`02-widgets-${screen}.json`, widgets);
  }
}

async function q03(browser, cfg, env, pack) {
  const out = { perScreen: {}, diffs: {}, note: 'Shell outerHTML + style snippets + hamburger open sample (best-effort).' };

  for (const [screen, url] of Object.entries(URLS)) {
    out.perScreen[screen] = await withPage(browser, cfg, { url, ...env }, async (s) => {
      const shellShot = `03-shell-${screen}.png`;
      await s.page.screenshot({ path: path.join(OUT, shellShot), fullPage: false }).catch(() => {});

      const headerOuterHTML = await safeOuterHTML(s.page, '#pageHeader');
      const footerOuterHTML = await safeOuterHTML(s.page, '#pageFooter');

      // raw HTML hint
      const rawHtmlHints = await (async () => {
        try {
          const res = await s.page.request.get(url);
          const txt = await res.text();
          return { status: res.status(), h1InRaw: /<h1\b[^>]*>/.test(txt) };
        } catch (e) {
          return { error: String(e?.message || e) };
        }
      })();

      // hamburger open (do not click menu items)
      const menuButtonSel = pack.menuButton || '#pageBannerMenu';
      await s.page.click(menuButtonSel, { timeout: 5000 }).catch(() => {});
      await s.page.waitForTimeout(300);
      const panelSel = await markFirstVisible(s.page, ['[role="menu"]', '.k-menu', '.k-animation-container', '.k-popup'], 'data-pw-probe-menu');
      const menuSample = panelSel
        ? await sampleMotion(s.page, panelSel, async () => {}, async () => { await s.page.keyboard.press('Escape').catch(() => {}); await s.page.waitForTimeout(200); })
        : null;
      const menuShot = '03-menu-open.png';
      await s.page.screenshot({ path: path.join(OUT, menuShot), fullPage: false }).catch(() => {});

      return {
        url,
        screenshot: shellShot,
        headerOuterHTML,
        footerOuterHTML,
        styles: {
          headerRoot: await styleDump(s.page, '#pageHeader'),
          logo: await styleDump(s.page, '#pageBannerLogo'),
          hamburgerButton: await styleDump(s.page, menuButtonSel),
        },
        rawHtmlHints,
        hamburger: {
          panelSelector: panelSel,
          panelOuterHTML: panelSel ? await safeOuterHTML(s.page, panelSel) : null,
          panelStyle: panelSel ? await styleDump(s.page, panelSel) : null,
          sample: menuSample,
          screenshot: menuShot,
        },
      };
    });
  }

  const diffHint = (a, b) => {
    if (a === b) return null;
    const al = a || '', bl = b || '';
    const n = Math.min(al.length, bl.length);
    let i = 0;
    for (; i < n && al[i] === bl[i]; i++);
    return { firstDiffIndex: i, aAround: al.slice(Math.max(0, i - 60), i + 60), bAround: bl.slice(Math.max(0, i - 60), i + 60) };
  };

  out.diffs = {
    header: {
      home_vs_cfg: diffHint(out.perScreen.home.headerOuterHTML, out.perScreen.cfg.headerOuterHTML),
      cfg_vs_trk: diffHint(out.perScreen.cfg.headerOuterHTML, out.perScreen.trk.headerOuterHTML),
      trk_vs_ftp: diffHint(out.perScreen.trk.headerOuterHTML, out.perScreen.ftp.headerOuterHTML),
    },
  };

  writeJson('03-shell.json', out);
}

async function q04(browser, cfg, env) {
  const out = { screens: {}, note: 'Overlays at rest after load + 3s idle.' };
  const selOverlays = '.k-animation-container, .k-popup, .k-tooltip, [role=tooltip], .k-window, .k-overlay, .k-list-container, .k-calendar-container';

  for (const [screen, url] of Object.entries(URLS)) {
    out.screens[screen] = await withPage(browser, cfg, { url, ...env }, async (s) => {
      await s.page.waitForTimeout(3000);
      return await s.page.evaluate((sel) => {
        const els = [...document.querySelectorAll(sel)];
        const isVis = (el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 0 && r.height > 0;
        };
        const items = els.map((el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            class: el.getAttribute('class') || null,
            parent: el.parentElement ? { tag: el.parentElement.tagName.toLowerCase(), class: el.parentElement.getAttribute('class') || null } : null,
            display: cs.display,
            visibility: cs.visibility,
            opacity: cs.opacity,
            rect: { x: r.x, y: r.y, width: r.width, height: r.height },
            ariaHidden: el.getAttribute('aria-hidden'),
            inlineStyle: el.getAttribute('style') || null,
            text: (el.textContent || '').trim().slice(0, 80),
            visibleAtRest: isVis(el),
          };
        });
        return { count: items.length, anyVisibleAtRest: items.some((i) => i.visibleAtRest), items };
      }, selOverlays);
    });
  }

  writeJson('04-rest-overlays.json', out);
}

async function q05_help(browser, cfg, env) {
  const out = { note: 'Help icons + book icon (best-effort).', targets: {} };

  const probeHelp = async (screen, labelText, prefix) => {
    return await withPage(browser, cfg, { url: URLS[screen], ...env }, async (s) => {
      const iconSel = await s.page.evaluate((txt) => {
        const norm = (x) => String(x || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const lab = [...document.querySelectorAll('label')].find((l) => norm(l.textContent).includes(norm(txt)));
        if (!lab) return null;
        const wrap = lab.closest('.form-group,.row,td,th,div') || lab.parentElement;
        if (!wrap) return null;
        const icon = wrap.querySelector('[id$="Help"],[id*="Help"],img[data-role="tooltip"],[data-role="tooltip"]');
        if (!icon) return null;
        icon.setAttribute('data-pw-probe-help', '1');
        return '[data-pw-probe-help="1"]';
      }, labelText);

      if (!iconSel) return { error: `help icon not found for label "${labelText}"` };

      const t0 = Date.now();
      await s.page.hover(iconSel).catch(() => {});
      let showDelayMs = null;
      try {
        await s.page.waitForSelector('[role="tooltip"],.k-tooltip', { state: 'visible', timeout: 4000 });
        showDelayMs = Date.now() - t0;
      } catch {}

      const tipSel = await markFirstVisible(s.page, ['[role="tooltip"]', '.k-tooltip'], 'data-pw-probe-tip');
      const shotHover = `${prefix}-hover.png`;
      await s.page.screenshot({ path: path.join(OUT, shotHover), fullPage: false }).catch(() => {});

      const hover = {
        showDelayMs,
        tooltipSelector: tipSel,
        tooltipOuterHTML: tipSel ? await safeOuterHTML(s.page, tipSel) : null,
        tooltipStyle: tipSel ? await styleDump(s.page, tipSel) : null,
        sample: tipSel ? await sampleMotion(s.page, tipSel, async () => {}, async () => { await s.page.mouse.move(0, 0); await s.page.waitForTimeout(200); }) : null,
        screenshot: shotHover,
      };

      await s.page.click(iconSel).catch(() => {});
      await s.page.waitForTimeout(200);
      const shotClick = `${prefix}-click.png`;
      await s.page.screenshot({ path: path.join(OUT, shotClick), fullPage: false }).catch(() => {});

      return { screen, labelText, iconSel, hover, click: { screenshot: shotClick } };
    });
  };

  out.targets.trk_fileId = await probeHelp('trk', 'File ID', '05-help-fileid');
  out.targets.cfg_configId = await probeHelp('cfg', 'Configuration ID', '05-help-configid');

  // book icon (best-effort on cfg)
  out.book = await withPage(browser, cfg, { url: URLS.cfg, ...env }, async (s) => {
    const bookSel = await s.page.evaluate(() => {
      const cands = [...document.querySelectorAll('a,button,span,i')];
      const isBook = (el) => {
        const t = (el.getAttribute('title') || el.getAttribute('aria-label') || '').trim().toLowerCase();
        const cls = (el.getAttribute('class') || '').toLowerCase();
        return t === 'help' || cls.includes('fa-book') || cls.includes('book');
      };
      const el = cands.find(isBook);
      if (!el) return null;
      el.setAttribute('data-pw-probe-book', '1');
      return '[data-pw-probe-book="1"]';
    });

    if (!bookSel) return { error: 'book icon not found (best-effort)' };

    await s.page.hover(bookSel).catch(() => {});
    await s.page.waitForTimeout(200);
    const tipSel = await markFirstVisible(s.page, ['[role="tooltip"]', '.k-tooltip'], 'data-pw-probe-booktip');
    const shot = '05-book-hover.png';
    await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

    const clickTarget = await s.page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      return { tag: el.tagName.toLowerCase(), href: el.getAttribute('href'), onclick: el.getAttribute('onclick') };
    }, bookSel);

    return {
      selector: bookSel,
      tooltipSelector: tipSel,
      tooltipOuterHTML: tipSel ? await safeOuterHTML(s.page, tipSel) : null,
      tooltipStyle: tipSel ? await styleDump(s.page, tipSel) : null,
      screenshot: shot,
      clickTarget,
    };
  });

  writeJson('05-help.json', out);
}

async function q06_dropdowns(browser, cfg, env) {
  const out = { note: 'Dropdown probe (best-effort).', screens: {} };

  const probe = async (screen, labelText, prefix) => {
    return await withPage(browser, cfg, { url: URLS[screen], ...env }, async (s) => {
      const wrapSel = await s.page.evaluate((txt) => {
        const norm = (x) => String(x || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const lab = [...document.querySelectorAll('label')].find((l) => norm(l.textContent).includes(norm(txt)));
        if (!lab) return null;
        const wrap = lab.closest('.form-group,.row,td,th,div') || lab.parentElement;
        if (!wrap) return null;
        const dd = wrap.querySelector('.k-dropdownlist,[data-role="dropdownlist"],.k-combobox,[data-role="combobox"]');
        if (!dd) return null;
        dd.setAttribute('data-pw-probe-dd', '1');
        return '[data-pw-probe-dd="1"]';
      }, labelText);

      if (!wrapSel) return { error: `dropdown not found for label "${labelText}"` };

      const closed = {
        wrapperOuterHTML: await safeOuterHTML(s.page, wrapSel),
        wrapperStyle: await styleDump(s.page, wrapSel),
      };

      await s.page.click(wrapSel).catch(() => {});
      await s.page.waitForTimeout(150);
      const focused = { wrapperStyle: await styleDump(s.page, wrapSel) };

      await s.page.click(`${wrapSel} .k-input-button, ${wrapSel} .k-select, ${wrapSel}`).catch(() => {});
      await s.page.waitForTimeout(250);

      const popupSel = await markFirstVisible(s.page, ['.k-list-container', '.k-animation-container'], 'data-pw-probe-ddpop');
      const shot = `${prefix}-open.png`;
      await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

      const open = popupSel ? {
        popupSelector: popupSel,
        popupOuterHTML: await safeOuterHTML(s.page, popupSel),
        popupStyle: await styleDump(s.page, popupSel),
        sample: await sampleMotion(s.page, popupSel, async () => {}, async () => { await s.page.keyboard.press('Escape').catch(() => {}); await s.page.waitForTimeout(150); }),
      } : { error: 'popup not found after open' };

      return { labelText, wrapperSelector: wrapSel, closed, focused, open, screenshot: shot };
    });
  };

  out.screens.cfg = await probe('cfg', 'Owner Module', '06-dropdown-cfg');
  out.screens.trk = await probe('trk', 'Owner Module', '06-dropdown-trk');
  out.screens.ftp = await probe('ftp', 'Owner Module', '06-dropdown-ftp');

  writeJson('06-dropdown.json', out);
}

async function q07_datetime(browser, cfg, env) {
  const out = { note: 'Date/time picker probe (best-effort).', trk: {} };

  out.trk.fromDate = await withPage(browser, cfg, { url: URLS.trk, ...env }, async (s) => {
    const dtSel = await s.page.evaluate(() => {
      const el = document.querySelector('.k-datetimepicker,[data-role="datetimepicker"],.k-datepicker,[data-role="datepicker"]');
      if (!el) return null;
      el.setAttribute('data-pw-probe-dt', '1');
      return '[data-pw-probe-dt="1"]';
    });

    if (!dtSel) return { error: 'no datetimepicker found on trk (best-effort)' };

    await s.page.click(`${dtSel} .k-input-button`).catch(() => {});
    await s.page.waitForTimeout(250);

    const calSel = await markFirstVisible(s.page, ['.k-calendar-container', '.k-calendar', '.k-animation-container'], 'data-pw-probe-cal');
    const shot = '07-datetime-calendar.png';
    await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

    await s.page.keyboard.press('Escape').catch(() => {});
    await s.page.waitForTimeout(150);

    return {
      widgetSelector: dtSel,
      calendar: calSel ? {
        selector: calSel,
        outerHTML: await safeOuterHTML(s.page, calSel),
        style: await styleDump(s.page, calSel),
        sample: await sampleMotion(s.page, calSel, async () => {}, async () => { await s.page.keyboard.press('Escape').catch(() => {}); await s.page.waitForTimeout(150); }),
        screenshot: shot,
      } : { error: 'calendar popup not found' },
    };
  });

  writeJson('07-datetime.json', out);
}

async function q08_collapse(browser, cfg, env) {
  const out = { note: 'Search Criteria collapse/expand (best-effort).', screens: {} };

  const probe = async (screen) => withPage(browser, cfg, { url: URLS[screen], ...env }, async (s) => {
    const panel = await s.page.evaluate(() => {
      const norm = (x) => String(x || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const hdr = [...document.querySelectorAll('h1,h2,h3,h4,div,span')].find((e) => norm(e.textContent).includes('search criteria'));
      if (!hdr) return null;
      const card = hdr.closest('.card,.panel,div') || hdr.parentElement;
      if (!card) return null;
      const btn = card.querySelector('button,[role=button],a,span,i') || hdr;
      btn.setAttribute('data-pw-probe-collapse', '1');
      const body = card.querySelector('.collapse,.card-body,.panel-body,.k-content,.content') || hdr.parentElement?.nextElementSibling;
      if (body) body.setAttribute('data-pw-probe-collapse-body', '1');
      return { clickSel: '[data-pw-probe-collapse="1"]', bodySel: body ? '[data-pw-probe-collapse-body="1"]' : null };
    });

    if (!panel?.clickSel) return { error: 'Search Criteria panel not found' };

    const before = panel.bodySel ? await styleDump(s.page, panel.bodySel) : null;

    const sample = panel.bodySel
      ? await sampleMotion(s.page, panel.bodySel, async () => { await s.page.click(panel.clickSel).catch(() => {}); await s.page.waitForTimeout(150); }, async () => { await s.page.click(panel.clickSel).catch(() => {}); await s.page.waitForTimeout(150); })
      : null;

    return { ...panel, bodyStyleBefore: before, sample, localStorageKeys: await s.page.evaluate(() => Object.keys(localStorage || {})) };
  });

  out.screens.cfg = await probe('cfg');
  out.screens.ftp = await probe('ftp');

  writeJson('08-collapse.json', out);
}

async function q09_grid(browser, cfg, env) {
  const out = { note: 'Grid after Search. Cell text redacted.', screens: {} };

  const run = async (screen) => withPage(browser, cfg, { url: URLS[screen], ...env }, async (s) => {
    const before = await s.page.evaluate(() => {
      const g = document.querySelector('.k-grid');
      if (!g) return { gridPresent: false };
      return { gridPresent: true, textPreview: (g.textContent || '').trim().slice(0, 160) || null };
    });

    const searchSel = 'button:has-text("Search"), input[type="submit"][value="Search"], input[type="button"][value="Search"]';
    s.guard.allowPost = true;
    await s.page.click(searchSel, { timeout: 5000 }).catch(() => {});
    await s.settle(800, 12000).catch(() => {});
    s.guard.allowPost = false;

    const gridSel = '.k-grid';
    if ((await s.page.locator(gridSel).count()) === 0) return { before, error: 'grid not found after Search' };

    const gridOuterHTML = await safeOuterHTML(s.page, gridSel, { scrubGridCells: true });
    const headerOuterHTML = redactString(cap(await s.page.locator(`${gridSel} thead`).first().evaluate((e) => e.outerHTML).catch(() => null)));
    const pagerOuterHTML = redactString(cap(await s.page.locator(`${gridSel} .k-pager-wrap, ${gridSel} .k-pager`).first().evaluate((e) => e.outerHTML).catch(() => null)));

    const columns = await s.page.evaluate(() => {
      const g = document.querySelector('.k-grid');
      const ths = [...(g?.querySelectorAll('thead th') || [])];
      return ths.map((th) => {
        const label = (th.textContent || '').replace(/\s+/g, ' ').trim();
        const sortable = th.className.includes('k-sortable') || !!th.querySelector('[class*="sort"],.k-i-sort');
        const filterable = !!th.querySelector('.k-i-filter, .k-grid-filter, [class*="filter"]');
        const sortIcon = th.querySelector('.k-i-sort, .k-sort-icon, [class*="sort"]');
        const filterIcon = th.querySelector('.k-i-filter, .k-grid-filter, [class*="filter"]');
        return {
          label,
          sortable,
          filterable,
          sortIconClass: sortIcon ? sortIcon.getAttribute('class') : null,
          filterIconClass: filterIcon ? filterIcon.getAttribute('class') : null,
          ariaSort: th.getAttribute('aria-sort'),
        };
      });
    });

    const shot = `09-grid-${screen}.png`;
    await s.page.locator(gridSel).first().screenshot({ path: path.join(OUT, shot) }).catch(async () => {
      await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});
    });

    return { before, gridOuterHTML, headerOuterHTML, pagerOuterHTML, columns, screenshot: shot };
  });

  out.screens.cfg = await run('cfg');
  out.screens.trk = await run('trk');
  out.screens.ftp = await run('ftp');

  writeJson('09-grid.json', out);
  writeJson('09-grid-cfg.json', out.screens.cfg);
  writeJson('09-grid-trk.json', out.screens.trk);
  writeJson('09-grid-ftp.json', out.screens.ftp);
}

async function q10_modal(browser, cfg, env) {
  const out = { note: 'Create New dialogs (best-effort).', screens: {} };

  const run = async (screen, prefix) => withPage(browser, cfg, { url: URLS[screen], ...env }, async (s) => {
    const btnSel = 'button:has-text("Create New"), a:has-text("Create New"), input[type="button"][value="Create New"]';
    s.guard.allowPost = true;
    await s.page.click(btnSel, { timeout: 5000 }).catch(() => {});
    await s.settle(800, 12000).catch(() => {});
    s.guard.allowPost = false;

    const winSel = await markFirstVisible(s.page, ['.k-window', '[role="dialog"]', '.k-dialog'], 'data-pw-probe-win');
    if (!winSel) return { error: 'modal window not found after Create New' };

    const options = await s.page.evaluate((sel) => {
      try {
        const el = document.querySelector(sel);
        // eslint-disable-next-line no-undef
        if (!el || !window.kendo || typeof kendo.widgetInstance !== 'function') return null;
        // eslint-disable-next-line no-undef
        const w = kendo.widgetInstance(el);
        const o = w?.options || null;
        if (!o) return null;
        return {
          name: o.name || w.name || null,
          modal: o.modal,
          width: o.width,
          height: o.height,
          draggable: o.draggable,
          resizable: o.resizable,
          actions: o.actions,
          animation: o.animation,
          position: o.position,
        };
      } catch (e) {
        return { error: String(e?.message || e) };
      }
    }, winSel);

    const overlaySel = await markFirstVisible(s.page, ['.k-overlay'], 'data-pw-probe-overlay');

    const outerHTML = await safeOuterHTML(s.page, winSel, { scrubGridCells: true });
    const shot = `${prefix}.png`;
    await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

    const sampleEsc = await sampleMotion(s.page, winSel, async () => {}, async () => { await s.page.keyboard.press('Escape').catch(() => {}); await s.page.waitForTimeout(300); });

    return {
      windowSelector: winSel,
      widgetOptions: options,
      overlaySelector: overlaySel,
      style: {
        overlay: overlaySel ? await styleDump(s.page, overlaySel) : null,
        window: await styleDump(s.page, winSel),
      },
      outerHTML,
      sampleEsc,
      screenshot: shot,
      focusOnOpen: await s.page.evaluate(() => ({ activeTag: document.activeElement?.tagName?.toLowerCase() || null, activeId: document.activeElement?.id || null })),
      bodyScroll: await s.page.evaluate(() => ({ bodyOverflow: getComputedStyle(document.body).overflow, bodyClass: document.body.className })),
    };
  });

  out.screens.cfg = await run('cfg', '10-modal-cfg');
  out.screens.ftp = await run('ftp', '10-modal-ftp');

  writeJson('10-modal.json', out);
}

async function q11_fields(browser, cfg, env) {
  const out = { note: 'Field defaults snapshot from live DOM; hidden/password/token values redacted.', screens: {} };

  const scan = async (url) => withPage(browser, cfg, { url, ...env }, async (s) => {
    return await s.page.evaluate(() => {
      const rows = [];
      // eslint-disable-next-line no-undef
      const canWidget = !!(window.kendo && typeof kendo.widgetInstance === 'function');

      for (const el of [...document.querySelectorAll('input,select,textarea')]) {
        const tag = el.tagName.toLowerCase();
        const type = tag === 'input' ? (el.getAttribute('type') || 'text') : tag;
        const id = el.id || null;
        const name = el.getAttribute('name') || null;
        const role = el.getAttribute('data-role') || null;

        const valueAttrRaw = el.getAttribute('value');
        const valuePropRaw = 'value' in el ? el.value : null;
        const isSecret = type === 'hidden' || type === 'password' || name === '__RequestVerificationToken' || name === 'fakepasswordremembered';

        let widgetValue = null;
        let widgetRole = null;
        if (canWidget) {
          try {
            // eslint-disable-next-line no-undef
            const w = kendo.widgetInstance(el);
            if (w) {
              widgetRole = w.options?.name ?? w.name ?? null;
              widgetValue = typeof w.value === 'function' ? w.value() : null;
            }
          } catch {}
        }

        rows.push({
          tag,
          type,
          id,
          name,
          dataRole: role,
          valueAttr: isSecret && valueAttrRaw ? '<redacted>' : valueAttrRaw,
          valueProp: isSecret && valuePropRaw ? '<redacted>' : valuePropRaw,
          widgetRole,
          widgetValue,
          placeholder: el.getAttribute('placeholder') || null,
          required: el.hasAttribute('required'),
          maxLength: el.getAttribute('maxlength') || null,
        });
      }

      return rows;
    });
  });

  out.screens.cfg = await scan(URLS.cfg);
  out.screens.trk = await scan(URLS.trk);
  out.screens.ftp = await scan(URLS.ftp);

  out.configurationIdOnCfg = out.screens.cfg.filter((f) => String(f.id || '').toLowerCase().includes('configid') || String(f.name || '').toLowerCase().includes('configid')).slice(0, 5);
  out.resetBehavior = '[UNKNOWN: reset comparison not implemented]';

  writeJson('11-fields.json', out);
}

async function markByText(page, { selector, attr, text, exact = true }) {
  return await page.evaluate(([sel, a, t, ex]) => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const want = norm(t).toLowerCase();
    document.querySelectorAll(`[${a}]`).forEach((e) => e.removeAttribute(a));
    const isVis = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 6 && r.height > 6;
    };
    const els = [...document.querySelectorAll(sel)].filter(isVis);
    const hit = els.find((el) => {
      const raw = (el.value || el.innerText || el.textContent || '');
      const got = norm(raw).toLowerCase();
      return ex ? got === want : got.includes(want);
    });
    if (!hit) return null;
    hit.setAttribute(a, '1');
    return `[${a}="1"]`;
  }, [selector, attr, text, exact]);
}

async function tabTo(page, selector, maxTabs = 40) {
  await page.mouse.click(5, 5).catch(() => {});
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press('Tab').catch(() => {});
    const ok = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const a = document.activeElement;
      return a === el || (a && el.contains(a));
    }, selector);
    if (ok) return true;
  }
  return false;
}

async function activeStyle(page, selector) {
  const box = await page.locator(selector).boundingBox().catch(() => null);
  if (!box) return null;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2).catch(() => {});
  await page.mouse.down().catch(() => {});
  const s = await styleDump(page, selector);
  await page.mouse.up().catch(() => {});
  return s;
}

async function q12_states(browser, cfg, env) {
  const out = { note: 'Best-effort computed-style snapshots for key controls across interaction states.', cfg: {}, modal: {} };

  out.cfg = await withPage(browser, cfg, { url: URLS.cfg, ...env }, async (s) => {
    const res = { buttons: {}, inputs: {} };

    const searchSel = await markByText(s.page, { selector: 'button,input[type=button],input[type=submit],a,[role=button]', attr: 'data-pw-probe-btn', text: 'Search' });
    const resetSel = await markByText(s.page, { selector: 'button,input[type=button],input[type=submit],a,[role=button]', attr: 'data-pw-probe-btn2', text: 'Reset' });
    const createSel = await markByText(s.page, { selector: 'button,input[type=button],input[type=submit],a,[role=button]', attr: 'data-pw-probe-btn3', text: 'Create New' });

    const snapButton = async (sel) => {
      if (!sel) return { error: 'not found' };
      const rest = await styleDump(s.page, sel);
      await s.page.hover(sel).catch(() => {});
      const hover = await styleDump(s.page, sel);
      const tabbed = await tabTo(s.page, sel);
      const focusVisible = tabbed ? await styleDump(s.page, sel) : null;
      const active = await activeStyle(s.page, sel);
      return { selector: sel, rest, hover, focusVisible, active, disabled: null };
    };

    res.buttons.search = await snapButton(searchSel);
    res.buttons.reset = await snapButton(resetSel);
    res.buttons.createNew = await snapButton(createSel);

    const textSel = await markFirstVisible(s.page, ['input:not([type])', 'input[type="text"]', 'textarea'], 'data-pw-probe-text');
    if (textSel) {
      const rest = await styleDump(s.page, textSel);
      await s.page.hover(textSel).catch(() => {});
      const hover = await styleDump(s.page, textSel);
      await s.page.click(textSel).catch(() => {});
      const focus = await styleDump(s.page, textSel);
      res.inputs.text = { selector: textSel, rest, hover, focus, disabled: null };
    } else {
      res.inputs.text = { error: 'no visible text input found' };
    }

    return res;
  });

  out.modal = await withPage(browser, cfg, { url: URLS.cfg, ...env }, async (s) => {
    const res = { buttons: {}, inputs: {} };
    await s.page.click('button:has-text("Create New")', { timeout: 8000 }).catch(() => {});
    await s.page.waitForTimeout(700);
    const winSel = await markFirstVisible(s.page, ['.k-window', '[role="dialog"]', '.k-dialog'], 'data-pw-probe-win');
    if (!winSel) return { error: 'modal did not open (Create New)' };

    const cancelSel = await markByText(s.page, { selector: `${winSel} button, ${winSel} input[type=button], ${winSel} a, ${winSel} [role=button]`, attr: 'data-pw-probe-cancel', text: 'Cancel', exact: false });
    const saveSel = await markByText(s.page, { selector: `${winSel} button, ${winSel} input[type=button], ${winSel} input[type=submit], ${winSel} a, ${winSel} [role=button]`, attr: 'data-pw-probe-save', text: 'Save', exact: false });
    const closeSel = await markFirstVisible(s.page, [`${winSel} .k-window-actions .k-window-action`, `${winSel} [aria-label*=close i]`, `${winSel} button[title*=close i]`], 'data-pw-probe-x');

    const snapButton = async (sel) => {
      if (!sel) return { error: 'not found' };
      const rest = await styleDump(s.page, sel);
      await s.page.hover(sel).catch(() => {});
      const hover = await styleDump(s.page, sel);
      const tabbed = await tabTo(s.page, sel);
      const focusVisible = tabbed ? await styleDump(s.page, sel) : null;
      const active = await activeStyle(s.page, sel);
      return { selector: sel, rest, hover, focusVisible, active, disabled: null };
    };

    res.buttons.cancel = await snapButton(cancelSel);
    res.buttons.save = await snapButton(saveSel);
    res.buttons.closeX = await snapButton(closeSel);

    const checkboxSel = await markFirstVisible(s.page, [`${winSel} input[type=checkbox]`], 'data-pw-probe-cb');
    if (checkboxSel) {
      const rest = await styleDump(s.page, checkboxSel);
      await s.page.hover(checkboxSel).catch(() => {});
      const hover = await styleDump(s.page, checkboxSel);
      await s.page.click(checkboxSel).catch(() => {});
      const checked = await styleDump(s.page, checkboxSel);
      await s.page.click(checkboxSel).catch(() => {});
      const focus = (await tabTo(s.page, checkboxSel)) ? await styleDump(s.page, checkboxSel) : null;
      res.inputs.checkbox = { selector: checkboxSel, rest, hover, focus, checked, disabled: null };
    } else {
      res.inputs.checkbox = { error: 'no checkbox found in modal' };
    }

    const radioSel = await markFirstVisible(s.page, [`${winSel} input[type=radio]`], 'data-pw-probe-radio');
    if (radioSel) {
      const rest = await styleDump(s.page, radioSel);
      await s.page.hover(radioSel).catch(() => {});
      const hover = await styleDump(s.page, radioSel);
      await s.page.click(radioSel).catch(() => {});
      const checked = await styleDump(s.page, radioSel);
      const focus = (await tabTo(s.page, radioSel)) ? await styleDump(s.page, radioSel) : null;
      res.inputs.radio = { selector: radioSel, rest, hover, focus, checked, disabled: null };
    } else {
      res.inputs.radio = { error: 'no radio found in modal' };
    }

    await s.page.keyboard.press('Escape').catch(() => {});
    await s.page.waitForTimeout(300);
    return res;
  });

  writeJson('12-states.json', out);
}

async function q13_css(browser, cfg, env) {
  const out = await withPage(browser, cfg, { url: URLS.cfg, ...env }, async (s) => {
    return await s.page.evaluate(() => {
      const patterns = [
        '.k-animation-container', '.k-popup', '.k-list', '.k-list-item', '.k-item', '.k-state-', '.k-hover', '.k-focus', '.k-selected',
        '.k-tooltip', '.k-callout', '.k-calendar', '.k-timeselector', '.k-window', '.k-overlay', '.k-dialog', '.k-grid-header', '.k-header',
        '.k-link', '.k-i-sort', '.k-i-arrow', '.k-i-filter', '.k-sort-icon', '.k-grid-filter', '.k-filter-menu', '.k-pager', '.k-alt',
        '.k-master-row', '.k-tooltip-validation', '.k-invalid', '.k-widget', '[data-role]', ':hover', ':focus', '@keyframes',
      ];
      const want = new RegExp(patterns.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');

      const fileName = (href) => {
        if (!href) return '[inline]';
        try { return href.split('?')[0].split('#')[0].split('/').slice(-1)[0]; } catch { return String(href); }
      };
      const isPortalCss = (href) => {
        const h = String(href || '').toLowerCase();
        return !!href && !h.includes('kendo') && !h.includes('bootstrap');
      };
      const out = { sameOrigin: {}, crossOrigin: [], portalStylesheets: [], note: 'cssText captured from same-origin stylesheets; cross-origin listed only.' };

      for (const ss of [...document.styleSheets]) {
        const href = ss.href || null;
        const name = fileName(href);
        let rules = null;
        try {
          rules = ss.cssRules;
        } catch {
          out.crossOrigin.push({ href, name });
          continue;
        }

        const total = rules ? rules.length : 0;
        const isPortal = isPortalCss(href);
        if (isPortal) out.portalStylesheets.push({ href, name, totalRules: total });

        const picked = [];
        if (rules) {
          for (const r of rules) {
            const txt = r.cssText || '';
            if (isPortal || want.test(txt)) picked.push(txt);
          }
        }

        let joined = picked.join('\n\n');
        const MAX = 1_200_000; // 1.2MB
        let truncated = false;
        if (joined.length > MAX) { joined = joined.slice(0, MAX) + '\n/* â€¦truncatedâ€¦ */'; truncated = true; }

        out.sameOrigin[name] = {
          href,
          totalRules: total,
          included: isPortal ? 'ALL (portal styles)' : 'MATCHED (kendo/state selectors)',
          truncated,
          rulesCssText: joined,
        };
      }

      return out;
    });
  });

  writeJson('13-css-rules.json', out);
}

async function q14_crossModule(browser, cfg, env, pack) {
  const menu = readJson(path.resolve('packs/file-transfer/menu.json'));

  const pickScreens = () => {
    const hits = [];
    for (const m of menu.modules || []) {
      if (!m || !m.label || /file transfer services/i.test(m.label)) continue;
      const kids = (m.children || []).filter(Boolean);
      if (!kids.length) continue;
      const best = kids.find((c) => /search/i.test(c.href || '') || /search/i.test(c.label || '')) || kids[0];
      if (!best?.href) continue;
      hits.push({ module: m.label, screen: best.label || best.href, href: best.href });
      if (hits.length >= 2) break;
    }
    return hits.map((h, i) => ({ ...h, url: `${BASE}${h.href}`, id: `m${i + 1}` }));
  };

  const targets = pickScreens();
  const out = {
    note: 'Best-effort cross-module check. Uses captured menu.json hrefs to open two non-File-Transfer screens; does not click menu items.',
    targets,
    cfgShellHeaderOuterHTML: null,
    screens: {},
    answers: {},
  };

  out.cfgShellHeaderOuterHTML = await withPage(browser, cfg, { url: URLS.cfg, ...env }, async (s) => safeOuterHTML(s.page, '#pageHeader'));

  const light = async (url, id) => withPage(browser, cfg, { url, ...env }, async (s) => {
    const shot = `14-${id}.png`;
    await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

    const headerOuterHTML = await safeOuterHTML(s.page, '#pageHeader');
    const headerDiff = (() => {
      const a = out.cfgShellHeaderOuterHTML || '';
      const b = headerOuterHTML || '';
      if (a === b) return null;
      const n = Math.min(a.length, b.length);
      let i = 0;
      for (; i < n && a[i] === b[i]; i++);
      return { firstDiffIndex: i, aAround: a.slice(Math.max(0, i - 60), i + 60), bAround: b.slice(Math.max(0, i - 60), i + 60) };
    })();

    const stack = await s.page.evaluate(() => ({
      jquery: window.jQuery?.fn?.jquery ?? null,
      kendo: window.kendo?.version ?? null,
      htmlClass: document.documentElement.className || null,
      bodyClass: document.body?.className || null,
      stylesheets: [...document.querySelectorAll('link[rel=stylesheet][href]')].map((e) => {
        try {
          const u = new URL(e.getAttribute('href'), location.href);
          return { origin: u.origin, path: u.pathname };
        } catch {
          return { origin: null, path: e.getAttribute('href') };
        }
      }),
    }));

    const widgets = await s.page.evaluate(() => {
      const roles = new Map();
      for (const el of document.querySelectorAll('[data-role]')) {
        const r = el.getAttribute('data-role') || '';
        roles.set(r, (roles.get(r) || 0) + 1);
      }
      const uniq = [...roles.entries()].sort((a, b) => b[1] - a[1]).map(([role, count]) => ({ role, count }));
      return { dataRoleCount: document.querySelectorAll('[data-role]').length, rolesTop: uniq.slice(0, 30) };
    });

    const overlays = await s.page.evaluate(() => {
      const sels = ['.k-overlay', '.k-loading-mask', '.k-loading-image', '.k-block', '.k-tooltip', '.k-popup', '.k-animation-container'];
      const found = [];
      for (const sel of sels) {
        const el = [...document.querySelectorAll(sel)].find((e) => {
          const cs = getComputedStyle(e);
          const r = e.getBoundingClientRect();
          return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 10 && r.height > 10;
        });
        if (el) found.push({ sel, tag: el.tagName.toLowerCase(), className: el.className || null });
      }
      return found;
    });

    const stylesheets = await s.page.evaluate(() => {
      const list = [];
      for (const ss of [...document.styleSheets]) list.push({ href: ss.href || null });
      return list;
    });

    return { url, screenshot: shot, headerOuterHTML, headerDiff, stack, widgets, overlays, stylesheets };
  });

  for (const t of targets) {
    out.screens[t.id] = await light(t.url, t.id).catch((e) => ({ url: t.url, error: String(e?.message || e) }));
  }

  const screens = Object.values(out.screens).filter((x) => x && !x.error);
  const kendoVersions = screens.map((s) => s.stack?.kendo).filter(Boolean);
  const widgetRoleSets = screens.map((s) => new Set((s.widgets?.rolesTop || []).map((r) => r.role)));

  out.answers = {
    shellMarkupIdenticalApartFromTitle: screens.every((s) => !s.headerDiff),
    sameKendoVersion: kendoVersions.length ? kendoVersions.every((v) => v === kendoVersions[0]) : '[UNKNOWN]',
    widgetTypesSimilar: widgetRoleSets.length >= 2 ? [...widgetRoleSets[0]].some((r) => widgetRoleSets[1].has(r)) : '[UNKNOWN]',
    sameHelpIconsPattern: '[UNKNOWN: not probed specifically]',
    sameSearchResetCancelLayout: '[UNKNOWN: not probed specifically]',
  };

  writeJson('14-cross-module.json', out);
}

async function q15_home(browser, cfg, env) {
  const out = await withPage(browser, cfg, { url: URLS.home, ...env }, async (s) => {
    const shot = '15-home.png';
    await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

    const blocks = await s.page.evaluate(() => {
      const scope = document.querySelector('#pageBody > main') || document.querySelector('main') || document.body;
      const children = [...scope.children].filter((e) => {
        const cs = getComputedStyle(e);
        const r = e.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 10 && r.height > 10;
      });
      const pickTitle = (el) => {
        const h = el.querySelector('h1,h2,h3,h4,header,[role=heading]');
        const t = (h?.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
        return t || null;
      };
      return children.slice(0, 30).map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        className: (el.getAttribute('class') || '').trim() || null,
        title: pickTitle(el),
        textSample: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 140) || null,
      }));
    });

    const widgets = await s.page.evaluate(() => {
      const roles = new Map();
      for (const el of document.querySelectorAll('[data-role]')) {
        const r = el.getAttribute('data-role') || '';
        roles.set(r, (roles.get(r) || 0) + 1);
      }
      const uniq = [...roles.entries()].sort((a, b) => b[1] - a[1]).map(([role, count]) => ({ role, count }));
      return { dataRoleCount: document.querySelectorAll('[data-role]').length, rolesTop: uniq.slice(0, 50) };
    });

    return { url: URLS.home, screenshot: shot, blocks, widgets };
  });

  writeJson('15-home.json', out);
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
  const env = { viewport, dpr };

  const sel = {
    ...(pack.selectors || {}),
    ...(pack.menuButton ? { menuButton: pack.menuButton } : {}),
  };

  const browser = await launch({ ...cfgRaw, headed: false });
  const summary = [];
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

    const run = async (q, fn, errFile) => {
      try {
        await fn();
        summary.push(row(q, 'ok'));
      } catch (e) {
        const msg = String(e?.message || e);
        if (errFile) writeJson(errFile, { error: msg });
        summary.push(row(q, 'fail', msg.slice(0, 140)));
      }
    };

    await run('Q00 env', () => q00(browser, cfg, env), '00-env.json');
    await run('Q01 stack', () => q01(browser, cfg, env), '01-stack.json');
    await run('Q02 widgets', () => q02(browser, cfg, env), '02-widgets-error.json');
    await run('Q03 shell', () => q03(browser, cfg, env, pack), '03-shell.json');
    await run('Q04 overlays', () => q04(browser, cfg, env), '04-rest-overlays.json');
    await run('Q05 help', () => q05_help(browser, cfg, env), '05-help.json');
    await run('Q06 dropdown', () => q06_dropdowns(browser, cfg, env), '06-dropdown.json');
    await run('Q07 datetime', () => q07_datetime(browser, cfg, env), '07-datetime.json');
    await run('Q08 collapse', () => q08_collapse(browser, cfg, env), '08-collapse.json');
    await run('Q09 grid', () => q09_grid(browser, cfg, env), '09-grid.json');
    await run('Q10 modal', () => q10_modal(browser, cfg, env), '10-modal.json');
    await run('Q11 fields', () => q11_fields(browser, cfg, env), '11-fields.json');
    await run('Q12 states', () => q12_states(browser, cfg, env), '12-states.json');
    await run('Q13 css', () => q13_css(browser, cfg, env), '13-css-rules.json');
    await run('Q14 cross-module', () => q14_crossModule(browser, cfg, env, pack), '14-cross-module.json');
    await run('Q15 home', () => q15_home(browser, cfg, env), '15-home.json');
  } finally {
    await browser.close().catch(() => {});
  }

  writeText('SUMMARY.md', ['# provider-probe (online)', '', ...summary, ''].join('\n'));
}

await main();
