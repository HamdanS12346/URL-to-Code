#!/usr/bin/env node
// Offline provider probe: uses already-captured HTML+CSS (packs/file-transfer/...) and Playwright
// to answer as many provider-probe.md queries as possible without logging into the live portal.
// Output folder: docs/provider-probe/
//
// Limits:
// - Dynamic behaviors that require live JS (tooltips on hover, opening dropdown popups, modal dialogs, etc.)
//   are marked as unsupported in offline mode.
// - Any extracted markup is scrubbed of grid cell text and obvious secrets (hidden inputs/tokens).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT = path.join(ROOT, 'docs', 'provider-probe');

const SCREENS = {
  home: 'home',
  cfg: 'file-transfer-configuration',
  trk: 'file-transfer-tracking',
  ftp: 'ftp-server-credentials',
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
const readText = (f) => fs.readFileSync(f, 'utf8');
const readJson = (f) => JSON.parse(readText(f));
const writeJson = (name, obj) => fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 1));
const writeText = (name, text) => fs.writeFileSync(path.join(OUT, name), text);

const cap = (s, max = 60_000) => (s && s.length > max ? `${s.slice(0, max)}…<truncated>` : s);

const redactText = (s) => {
  if (s == null) return s;
  let out = String(s);
  out = out.replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, '<redacted ip>');
  out = out.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '<redacted email>');
  return out;
};

async function withOfflinePage(browser, screenId, fn) {
  const dir = path.join(ROOT, 'packs', 'file-transfer', 'screens', screenId);
  const htmlFile = path.join(dir, 'snapshot', 'rendered.html');
  const cssFile = path.join(dir, 'snapshot', 'used.css');
  const pageJsonFile = path.join(dir, 'capture', 'page.json');

  const htmlRaw = readText(htmlFile);
  const css = readText(cssFile);
  const html = htmlRaw.includes('</head>')
    ? htmlRaw.replace('</head>', `\n<style id="__used_css__">\n${css}\n</style>\n</head>`)
    : `<style id="__used_css__">\n${css}\n</style>\n${htmlRaw}`;

  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.route('**/*', (route) => route.abort()).catch(() => {});
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(50);

  try {
    const pageMeta = readJson(pageJsonFile);
    return await fn({ page, context, dir, pageMeta });
  } finally {
    await context.close().catch(() => {});
  }
}

async function getStyle(page, selector) {
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

async function outerHTML(page, selector, { scrubGridCells = false } = {}) {
  return await page.evaluate(([sel, limit, scrub]) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const clone = el.cloneNode(true);

    for (const input of clone.querySelectorAll('input[type="hidden"], input[type="password"], input[name="__RequestVerificationToken"], input[name="fakepasswordremembered"]')) {
      if (input.hasAttribute('value')) input.setAttribute('value', '<redacted>');
      if ('value' in input) input.value = '<redacted>';
    }

    if (scrub) {
      for (const td of clone.querySelectorAll('tbody td')) {
        const t = (td.textContent || '').trim();
        if (!t) continue;
        td.textContent = `<text len=${t.length}>`;
      }
    }

    let html = clone.outerHTML;
    if (html.length > limit) html = html.slice(0, limit) + '…<truncated>';
    return html;
  }, [selector, 60_000, scrubGridCells]);
}

async function query00_env(browser) {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  try {
    await page.goto('about:blank');
    const env = await page.evaluate(() => ({
      userAgent: navigator.userAgent,
      devicePixelRatio: window.devicePixelRatio,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }));
    return {
      ...env,
      playwrightVersion,
      viewportUsed: { width: 1920, height: 1080 },
      browserZoom: '[UNKNOWN: not detected in offline mode]',
      note: 'Offline probe against captured HTML/CSS; UA is the local Playwright browser UA (not necessarily the original capture UA).',
    };
  } finally {
    await context.close().catch(() => {});
  }
}

function stripQuery(url) {
  try {
    const u = new URL(url);
    return { origin: u.origin, path: u.pathname };
  } catch {
    return { origin: null, path: url };
  }
}

function inferKendoVersionFromScripts(scripts) {
  const hit = (scripts || []).find((s) => /kendo\.(culture|messages)\./i.test(s));
  if (!hit) return null;
  try {
    const u = new URL(hit);
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

async function query01_stack() {
  const out = { screens: {}, note: 'Derived from packs/file-transfer/screens/*/capture/page.json + snapshot HTML (token presence). Kendo theme class detection requires live runtime and is [UNKNOWN] here.' };
  for (const [short, screenId] of Object.entries(SCREENS)) {
    const dir = path.join(ROOT, 'packs', 'file-transfer', 'screens', screenId);
    const pageMeta = readJson(path.join(dir, 'capture', 'page.json'));
    const rendered = readText(path.join(dir, 'snapshot', 'rendered.html'));

    const kendoVersion = inferKendoVersionFromScripts(pageMeta.scripts);
    const tokenPresent = /name="__RequestVerificationToken"/i.test(rendered);

    out.screens[short] = {
      url: pageMeta.url,
      title: pageMeta.title,
      jquery: pageMeta.framework?.jquery ?? null,
      kendo: { version: kendoVersion, theme: '[UNKNOWN: bundled CSS; offline probe cannot detect html/body theme classes reliably]' },
      bootstrap: pageMeta.framework?.bootstrap ?? null,
      scripts: (pageMeta.scripts || []).map(stripQuery),
      stylesheets: (pageMeta.stylesheets || []).map(stripQuery),
      fontsLoaded: pageMeta.fonts || [],
      computedFonts: {
        body: pageMeta.body?.fontFamily ?? null,
        h1_h3: '[UNKNOWN: not captured in page.json]',
        label: '[UNKNOWN: not captured in page.json]',
        input: '[UNKNOWN: not captured in page.json]',
        button: '[UNKNOWN: not captured in page.json]',
      },
      serverHints: {
        requestVerificationTokenPresent: tokenPresent,
        metaGeneratorTags: [],
      },
    };
  }
  return out;
}

async function query02_widgets(browser) {
  const results = {};
  for (const [short, screenId] of Object.entries(SCREENS)) {
    results[short] = await withOfflinePage(browser, screenId, async ({ page }) => {
      return await page.evaluate(() => {
        const roleEls = [...document.querySelectorAll('[data-role]')].map((el) => ({
          role: el.getAttribute('data-role') || null,
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          name: el.getAttribute('name') || null,
          class: (el.getAttribute('class') || '').trim() || null,
        }));
        const byRole = {};
        for (const r of roleEls) byRole[r.role] = (byRole[r.role] || 0) + 1;

        const extraSelectors = ['.k-widget', '.k-input', '.k-dropdownlist', '.k-datetimepicker', '.k-grid', '.k-window', '.k-tooltip', '.k-panelbar', '.k-numerictextbox'];
        const extras = {};
        for (const sel of extraSelectors) extras[sel] = document.querySelectorAll(sel).length;

        return {
          totalDataRoleElements: roleEls.length,
          dataRoleCounts: Object.fromEntries(Object.entries(byRole).sort((a, b) => b[1] - a[1])),
          examples: roleEls.slice(0, 200),
          extraSelectorCounts: extras,
        };
      });
    });

    writeJson(`02-widgets-${short}.json`, results[short]);
  }

  return { note: 'Offline inventory from snapshot/rendered.html. Does not include runtime widget.options from kendo.widgetInstance(el).', screens: results };
}

async function query03_shell(browser) {
  const perScreen = {};
  for (const [short, screenId] of Object.entries(SCREENS)) {
    perScreen[short] = await withOfflinePage(browser, screenId, async ({ page, pageMeta }) => {
      const header = await outerHTML(page, '#pageHeader');
      const footer = (await outerHTML(page, '#pageFooter')) || (await outerHTML(page, 'footer'));

      const styles = {
        pageHeader: await getStyle(page, '#pageHeader'),
        pageBanner: await getStyle(page, '#pageBanner'),
        pageBannerLogo: await getStyle(page, '#pageBannerLogo'),
        pageBannerMenu: await getStyle(page, '#pageBannerMenu'),
      };

      const shot = `03-shell-${short}.png`;
      await page.screenshot({ path: path.join(OUT, shot), fullPage: false });

      return {
        url: pageMeta.url,
        title: pageMeta.title,
        headerOuterHTML: redactText(header),
        footerOuterHTML: redactText(footer),
        styles,
        screenshot: shot,
        rawServerHtml: '[UNKNOWN: offline probe cannot fetch server HTML]',
        titleSource: '[UNKNOWN: requires live server HTML + runtime script tracing]',
        hiddenDomNodes: '[UNKNOWN: offline probe does not attempt full hidden-node enumeration]',
        hamburgerMenu: '[UNKNOWN: requires live runtime]',
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

  return {
    perScreen,
    diffs: {
      header: {
        home_vs_cfg: diffHint(perScreen.home.headerOuterHTML, perScreen.cfg.headerOuterHTML),
        cfg_vs_trk: diffHint(perScreen.cfg.headerOuterHTML, perScreen.trk.headerOuterHTML),
        trk_vs_ftp: diffHint(perScreen.trk.headerOuterHTML, perScreen.ftp.headerOuterHTML),
      },
      footer: {
        home_vs_cfg: diffHint(perScreen.home.footerOuterHTML, perScreen.cfg.footerOuterHTML),
        cfg_vs_trk: diffHint(perScreen.cfg.footerOuterHTML, perScreen.trk.footerOuterHTML),
        trk_vs_ftp: diffHint(perScreen.trk.footerOuterHTML, perScreen.ftp.footerOuterHTML),
      },
    },
    note: 'Shell outerHTML extracted from snapshot HTML; styles computed from snapshot used.css.',
  };
}

async function query04_restOverlays(browser) {
  const selectors = '.k-animation-container, .k-popup, .k-tooltip, [role=tooltip], .k-window, .k-overlay, .k-list-container, .k-calendar-container';
  const out = { selectors, screens: {}, note: 'Computed using snapshot HTML + used.css. Live runtime may create additional overlays not present in the snapshot.' };

  for (const [short, screenId] of Object.entries(SCREENS)) {
    out.screens[short] = await withOfflinePage(browser, screenId, async ({ page }) => {
      const items = await page.evaluate((sel) => {
        const els = [...document.querySelectorAll(sel)];
        return els.map((el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const txt = (el.textContent || '').trim().slice(0, 80);
          const vis = cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 0 && r.height > 0;
          return {
            tag: el.tagName.toLowerCase(),
            class: el.getAttribute('class') || null,
            parentTag: el.parentElement?.tagName?.toLowerCase() || null,
            parentClass: el.parentElement?.getAttribute('class') || null,
            display: cs.display,
            visibility: cs.visibility,
            opacity: cs.opacity,
            rect: { x: r.x, y: r.y, width: r.width, height: r.height },
            ariaHidden: el.getAttribute('aria-hidden'),
            inlineStyle: el.getAttribute('style') || null,
            text: txt,
            visibleAtRest: vis,
          };
        });
      }, selectors);

      return { anyVisibleAtRest: items.some((i) => i.visibleAtRest), count: items.length, items };
    });
  }

  return out;
}

const unsupported = (reason) => ({ status: 'unsupported-offline', reason });

async function query09_grid(browser) {
  const out = { note: 'Grid markup extracted from snapshot HTML. Cell text is redacted as <text len=N>.', screens: {} };

  for (const [short, screenId] of Object.entries({ cfg: SCREENS.cfg, trk: SCREENS.trk, ftp: SCREENS.ftp })) {
    out.screens[short] = await withOfflinePage(browser, screenId, async ({ page }) => {
      const gridHtml = await outerHTML(page, '.k-grid', { scrubGridCells: true });
      const headerHtml = await page.evaluate(() => {
        const g = document.querySelector('.k-grid');
        if (!g) return null;
        const clone = g.cloneNode(true);
        for (const td of clone.querySelectorAll('tbody td')) {
          const t = (td.textContent || '').trim();
          if (!t) continue;
          td.textContent = `<text len=${t.length}>`;
        }
        const thead = clone.querySelector('thead');
        return thead ? thead.outerHTML : null;
      });

      const firstRows = await page.evaluate(() => {
        const g = document.querySelector('.k-grid');
        if (!g) return [];
        const clone = g.cloneNode(true);
        for (const td of clone.querySelectorAll('tbody td')) {
          const t = (td.textContent || '').trim();
          if (!t) continue;
          td.textContent = `<text len=${t.length}>`;
        }
        return [...clone.querySelectorAll('tbody tr')].slice(0, 3).map((tr) => tr.outerHTML);
      });

      const pager = await page.evaluate(() => {
        const g = document.querySelector('.k-grid');
        if (!g) return null;
        const p = g.querySelector('.k-pager-wrap, .k-pager');
        return p ? p.outerHTML : null;
      });

      const shot = `09-grid-${short}.png`;
      const gridLoc = page.locator('.k-grid').first();
      if ((await gridLoc.count()) > 0) {
        await gridLoc.screenshot({ path: path.join(OUT, shot) }).catch(async () => {
          await page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});
        });
      }

      return {
        headerOuterHTML: redactText(cap(headerHtml)),
        first3RowsOuterHTML: firstRows.map((r) => redactText(cap(r))),
        pagerOuterHTML: redactText(cap(pager)),
        gridOuterHTML: redactText(cap(gridHtml)),
        screenshot: fs.existsSync(path.join(OUT, shot)) ? shot : null,
        afterSearch: '[UNKNOWN: snapshot may or may not represent post-Search state]',
        sortCycle: '[UNKNOWN: requires live interaction]',
        filterMenu: '[UNKNOWN: requires live interaction]',
      };
    });

    writeJson(`09-grid-${short}.json`, out.screens[short]);
  }

  return out;
}

async function query11_fields(browser) {
  const out = { note: 'Field defaults extracted from snapshot DOM. Hidden/password values are redacted. widget.value() is not available offline.', screens: {} };

  const scan = async (screenId) => withOfflinePage(browser, screenId, async ({ page }) => {
    return await page.evaluate(() => {
      const els = [...document.querySelectorAll('input,select,textarea')];
      return els.map((el) => {
        const tag = el.tagName.toLowerCase();
        const type = tag === 'input' ? (el.getAttribute('type') || 'text') : tag;
        const role = el.getAttribute('data-role') || null;
        const id = el.id || null;
        const name = el.getAttribute('name') || null;

        const valueAttrRaw = el.getAttribute('value');
        const valuePropRaw = 'value' in el ? el.value : null;
        const isSecret = type === 'hidden' || type === 'password' || name === '__RequestVerificationToken' || name === 'fakepasswordremembered';
        const valueAttr = isSecret && valueAttrRaw ? '<redacted>' : valueAttrRaw;
        const valueProp = isSecret && valuePropRaw ? '<redacted>' : valuePropRaw;

        return {
          tag,
          type,
          id,
          name,
          dataRole: role,
          valueAttr: valueAttr == null ? null : valueAttr,
          valueProp: valueProp == null ? null : valueProp,
          placeholder: el.getAttribute('placeholder') || null,
          required: el.hasAttribute('required'),
          maxLength: el.getAttribute('maxlength') || null,
        };
      });
    });
  });

  out.screens.cfg = await scan(SCREENS.cfg);
  out.screens.trk = await scan(SCREENS.trk);
  out.screens.ftp = await scan(SCREENS.ftp);
  out.screens.home = await scan(SCREENS.home);

  out.configurationIdOnCfg = {
    selectorHint: '#ConfigId / [name="ConfigId"] (best-effort)',
    found: (out.screens.cfg || []).filter((f) => (f.id && f.id.toLowerCase().includes('configid')) || (f.name && f.name.toLowerCase().includes('configid'))).slice(0, 5),
    isNumericTextBox: '[UNKNOWN offline: would require kendo.widgetInstance]',
  };

  out.resetBehavior = '[UNKNOWN offline: requires clicking Reset in live runtime and comparing values]';

  return out;
}

async function query12_states(browser) {
  const out = { note: 'Computed style states sampled from snapshot HTML + used.css (no runtime JS).', screens: {} };

  const targets = {
    searchButton: ['button:has-text("Search")', 'input[type="submit"][value="Search"]', 'input[type="button"][value="Search"]'],
    resetButton: ['button:has-text("Reset")', 'input[type="button"][value="Reset"]', '#resetButton'],
    createNewButton: ['button:has-text("Create New")', 'a:has-text("Create New")'],
    cancelButton: ['button:has-text("Cancel")', 'input[type="button"][value="Cancel"]', '#cancelButton'],
  };

  const styleOf = async (page, sel) => {
    const loc = page.locator(sel).first();
    if ((await loc.count()) === 0) return null;
    const handle = await loc.elementHandle();
    return await page.evaluate(([el, props]) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const style = {};
      for (const p of props) style[p] = cs.getPropertyValue(p);
      return { rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }, style };
    }, [handle, STYLE_PROPS]);
  };

  const stateStyle = async (page, sel, state) => {
    const loc = page.locator(sel).first();
    if ((await loc.count()) === 0) return null;

    if (state === 'hover') await loc.hover({ timeout: 1000 }).catch(() => {});
    if (state === 'focus') await loc.focus().catch(() => {});
    if (state === 'active') {
      const box = await loc.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
      }
    }

    const res = await styleOf(page, sel);
    if (state === 'active') await page.mouse.up().catch(() => {});
    return res;
  };

  for (const [short, screenId] of Object.entries(SCREENS)) {
    out.screens[short] = await withOfflinePage(browser, screenId, async ({ page }) => {
      const found = {};
      for (const [name, sels] of Object.entries(targets)) {
        let chosen = null;
        for (const s of sels) {
          if ((await page.locator(s).count()) > 0) { chosen = s; break; }
        }
        if (!chosen) { found[name] = { selector: null, states: null }; continue; }

        found[name] = {
          selector: chosen,
          states: {
            rest: await stateStyle(page, chosen, 'rest'),
            hover: await stateStyle(page, chosen, 'hover'),
            focusVisible: await stateStyle(page, chosen, 'focus'),
            active: await stateStyle(page, chosen, 'active'),
            disabled: '[UNKNOWN offline: depends on runtime disabling]',
          },
        };
      }
      return found;
    });
  }

  return out;
}

function query13_cssRules() {
  const usedCssPath = path.join('packs', 'file-transfer', 'screens', 'file-transfer-configuration', 'snapshot', 'used.css');
  const css = readText(path.join(ROOT, usedCssPath));

  const needles = [
    '.k-animation-container', '.k-popup', '.k-list', '.k-list-item', '.k-item', '.k-state-', '.k-hover', '.k-focus', '.k-selected', '.k-tooltip', '.k-callout',
    '.k-calendar', '.k-timeselector', '.k-window', '.k-overlay', '.k-dialog', '.k-grid-header', '.k-header', '.k-link', '.k-i-sort', '.k-i-arrow', '.k-i-filter', '.k-sort-icon',
    '.k-grid-filter', '.k-filter-menu', '.k-pager', '.k-alt', '.k-master-row', '.k-tooltip-validation', '.k-invalid', '.k-widget', '[data-role]', ':hover', ':focus', '@keyframes',
  ];

  const blocks = css.split('}').map((b) => (b.trim() ? b + '}' : '')).filter(Boolean);
  const hits = blocks.filter((b) => needles.some((n) => b.includes(n)));

  return {
    status: 'partial-offline',
    note: 'Filtered from snapshot/used.css (used-rule subset), not from live document.styleSheets. Full portal CSS bundles are not available offline.',
    files: {
      'used.css': {
        path: usedCssPath.replaceAll('\\', '/'),
        totalRuleBlocksApprox: blocks.length,
        matchedRuleBlocksApprox: hits.length,
        rules: hits.slice(0, 2000),
      },
    },
  };
}

async function query15_home(browser) {
  return await withOfflinePage(browser, SCREENS.home, async ({ page, pageMeta }) => {
    const blocks = await page.evaluate(() => {
      const main = document.querySelector('#pageBody > main') || document.querySelector('main') || document.body;
      const kids = [...main.children].slice(0, 50);
      return kids.map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        class: (el.getAttribute('class') || '').trim() || null,
        textPreview: (el.textContent || '').trim().slice(0, 120) || null,
      }));
    });

    const shot = '15-home.png';
    await page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});

    const invFile = path.join(OUT, '02-widgets-home.json');
    const widgetInventory = fs.existsSync(invFile) ? JSON.parse(readText(invFile)) : null;

    return {
      url: pageMeta.url,
      title: pageMeta.title,
      blocks,
      widgetInventory,
      screenshot: shot,
      note: 'Blocks are inferred from top-level children under #pageBody > main in snapshot HTML.',
    };
  });
}

function summaryLine(q, status, note = '') {
  const mark = status === 'ok' ? '✓' : status === 'partial' ? 'partial' : '✗';
  return `- ${q}: ${mark}${note ? ` — ${note}` : ''}`;
}

async function main() {
  ensureDir(OUT);

  const browser = await chromium.launch({ headless: true });
  const summary = [];

  try {
    // Q00
    try {
      writeJson('00-env.json', await query00_env(browser));
      summary.push(summaryLine('Q00', 'ok', 'wrote 00-env.json'));
    } catch (e) {
      writeJson('00-env.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q00', 'fail', 'error'));
    }

    // Q01
    try {
      writeJson('01-stack.json', await query01_stack());
      summary.push(summaryLine('Q01', 'partial', 'wrote 01-stack.json (theme + some computed fonts unknown)'));
    } catch (e) {
      writeJson('01-stack.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q01', 'fail', 'error'));
    }

    // Q02
    try {
      writeJson('02-widgets.json', await query02_widgets(browser));
      summary.push(summaryLine('Q02', 'partial', 'wrote 02-widgets-*.json (no runtime widget.options)'));
    } catch (e) {
      writeJson('02-widgets.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q02', 'fail', 'error'));
    }

    // Q03
    try {
      writeJson('03-shell.json', await query03_shell(browser));
      summary.push(summaryLine('Q03', 'partial', 'wrote 03-shell.json + 03-shell-*.png (no server HTML / hamburger runtime)'));
    } catch (e) {
      writeJson('03-shell.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q03', 'fail', 'error'));
    }

    // Q04
    try {
      writeJson('04-rest-overlays.json', await query04_restOverlays(browser));
      summary.push(summaryLine('Q04', 'partial', 'wrote 04-rest-overlays.json (snapshot-only)'));
    } catch (e) {
      writeJson('04-rest-overlays.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q04', 'fail', 'error'));
    }

    // Q05–Q08 unsupported offline
    writeJson('05-help.json', unsupported('Help tooltips/popovers require live runtime JS + hover sampling.'));
    summary.push(summaryLine('Q05', 'fail', 'unsupported offline'));

    writeJson('06-dropdown.json', unsupported('Dropdown popup sampling/open/close behavior requires live runtime JS.'));
    summary.push(summaryLine('Q06', 'fail', 'unsupported offline'));

    writeJson('07-datetime.json', unsupported('Calendar/time popup sampling requires live runtime JS.'));
    summary.push(summaryLine('Q07', 'fail', 'unsupported offline'));

    writeJson('08-collapse.json', unsupported('Panel collapse/expand sampling requires live runtime JS.'));
    summary.push(summaryLine('Q08', 'fail', 'unsupported offline'));

    // Q09
    try {
      writeJson('09-grid.json', await query09_grid(browser));
      summary.push(summaryLine('Q09', 'partial', 'wrote 09-grid-*.json + 09-grid-*.png where available (live interactions unknown)'));
    } catch (e) {
      writeJson('09-grid.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q09', 'fail', 'error'));
    }

    // Q10 unsupported offline
    writeJson('10-modal.json', unsupported('Create New modal requires live runtime JS + interaction sampling.'));
    summary.push(summaryLine('Q10', 'fail', 'unsupported offline'));

    // Q11
    try {
      writeJson('11-fields.json', await query11_fields(browser));
      summary.push(summaryLine('Q11', 'partial', 'wrote 11-fields.json (no widget.value()/Reset comparison)'));
    } catch (e) {
      writeJson('11-fields.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q11', 'fail', 'error'));
    }

    // Q12
    try {
      writeJson('12-states.json', await query12_states(browser));
      summary.push(summaryLine('Q12', 'partial', 'wrote 12-states.json (offline computed CSS only)'));
    } catch (e) {
      writeJson('12-states.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q12', 'fail', 'error'));
    }

    // Q13
    try {
      writeJson('13-css-rules.json', query13_cssRules());
      summary.push(summaryLine('Q13', 'partial', 'wrote 13-css-rules.json (from used.css subset)'));
    } catch (e) {
      writeJson('13-css-rules.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q13', 'fail', 'error'));
    }

    // Q14 unsupported offline
    writeJson('14-cross-module.json', unsupported('Requires live navigation to other modules to validate cross-module consistency.'));
    summary.push(summaryLine('Q14', 'fail', 'unsupported offline'));

    // Q15
    try {
      writeJson('15-home.json', await query15_home(browser));
      summary.push(summaryLine('Q15', 'partial', 'wrote 15-home.json + 15-home.png (snapshot-only)'));
    } catch (e) {
      writeJson('15-home.json', { error: String(e?.message || e) });
      summary.push(summaryLine('Q15', 'fail', 'error'));
    }

    writeText('SUMMARY.md', `# provider-probe (offline)\n\nGenerated from packs/file-transfer captured artifacts on ${new Date().toISOString()}.\n\n${summary.join('\n')}\n\n## Limits\n- This run is *offline*: it does not log into the live portal, so anything requiring runtime JS interactions is marked unsupported.\n- Markup is scrubbed to avoid leaking tokens and grid cell text.\n`);
  } finally {
    await browser.close().catch(() => {});
  }
}

await main();
