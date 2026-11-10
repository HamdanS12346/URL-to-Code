#!/usr/bin/env node
// provider-probe (online) - probe 2

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

import { launch, openPage } from '../../scripts/lib/browser.mjs';
import { login, manualLogin, readEnv, readMenu } from '../../scripts/lib/portal.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;

const ROOT = path.resolve('.');
const OUT = path.join(ROOT, 'docs', 'provider-probe');

const BASE = 'https://uximc.mms.tst.pgwcloud.net';
const URLS = {
  home: BASE + '/Home/MyHome/',
  cfg: BASE + '/FileTransfer/SearchSourceLocations',
  trk: BASE + '/FileTransfer/SearchFileTransferTracking',
  ftp: BASE + '/FileTransfer/SearchFTPServerCredentials',
  uiExamples: BASE + '/Employee/UIExamples',
};

const knownRoles = new Set([
  'dropdownlist',
  'combobox',
  'numerictextbox',
  'datepicker',
  'datetimepicker',
  'timepicker',
  'grid',
  'tooltip',
  'window',
  'menu',
  'popup',
]);

const wrapperSelectors = [
  '.k-tabstrip',
  '.k-panelbar',
  '.k-upload',
  '.k-multiselect',
  '.k-maskedtextbox',
  '.k-switch',
  '.k-checkbox',
  '.k-radio',
  '.k-treeview',
  '.k-listview',
  '.k-chart',
  '.k-editor',
  '.k-splitter',
  '.k-stepper',
  '.k-wizard',
  '.k-combobox',
  '.k-autocomplete',
  '.k-dropdowntree',
];

const ensureDir = (d) => fs.mkdirSync(d, { recursive: true });
const writeJson = (name, obj) => fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 1));
const writeText = (name, text) => fs.writeFileSync(path.join(OUT, name), text);
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const cap = (s, max = 150000) => (s && s.length > max ? s.slice(0, max) + '...<truncated>' : s);
const sha256 = (s) => crypto.createHash('sha256').update(String(s || ''), 'utf8').digest('hex');

const slug = (s) => (String(s || '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80) || 'item');

async function withTimeout(ms, fn) {
  const t = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout after ' + ms + 'ms')), ms));
  return await Promise.race([fn(), t]);
}

async function safeOuterHTML(page, selector, { scrubGridCells = false } = {}) {
  const html = await page.evaluate(([sel, scrub]) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const clone = el.cloneNode(true);

    for (const input of clone.querySelectorAll('input[type=hidden], input[type=password], input[name=__RequestVerificationToken], input[name=fakepasswordremembered]')) {
      if (input.hasAttribute('value')) input.setAttribute('value', '<redacted>');
      if ('value' in input) input.value = '<redacted>';
    }

    if (scrub) {
      for (const td of clone.querySelectorAll('tbody td')) {
        const t = (td.textContent || '').trim();
        if (!t) continue;
        td.textContent = '<text len=' + t.length + '>';
      }
    }

    return clone.outerHTML;
  }, [selector, scrubGridCells]);

  return cap(html);
}

async function waitForKendoReady(page, maxMs = 10000) {
  await page.waitForFunction(() => {
    if (!window.kendo) return false;
    const masks = [...document.querySelectorAll('.k-loading-mask')];
    const anyVisible = masks.some((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 2 && r.height > 2;
    });
    return !anyVisible;
  }, { timeout: maxMs }).catch(() => {});
}

function row(q, status, note) {
  const t = new Date().toISOString();
  return '- ' + q + ': ' + status + (note ? ' - ' + note : '') + ' (' + t + ')';
}

async function pageCensus({ browser, cfg, viewport, dpr, url, username, screenshotRel }) {
  const s = await openPage(browser, cfg, { url, viewport, dpr });
  const started = Date.now();
  try {
    await s.load({ quietMax: 10000 });
    await waitForKendoReady(s.page, 10000);

    const finalUrl = s.page.url();

    const scripts = await s.page.evaluate(() => {
      const out = [];
      for (const sc of document.querySelectorAll('script[src]')) {
        const src = sc.getAttribute('src') || '';
        if (!src) continue;
        const abs = new URL(src, location.href).href;
        if (/\/Scripts\//i.test(abs)) out.push(abs);
      }
      return [...new Set(out)];
    });

    const scriptFindings = [];
    for (const u of scripts) {
      try {
        const res = await s.page.request.get(u, { timeout: 10000 });
        const txt = await res.text();

        const openModalOverlay = [];
        const rxModal = /openModalOverlay\(\s*['"]([^'"]+)['"]\s*,\s*([A-Za-z0-9_.$]+)\s*,/g;
        for (let m; (m = rxModal.exec(txt));) openModalOverlay.push({ panelId: m[1], urlVar: m[2] });

        const dataBoundEvents = [];
        const rxBound = /setKendoGridDataBoundEvents\(\s*e\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\)/g;
        for (let m; (m = rxBound.exec(txt));) dataBoundEvents.push({ msg: m[1].trim(), singleClick: m[2].trim(), doubleClick: m[3].trim() });

        const cascadeFrom = [];
        const rxCascade = /cascadeFrom\s*[:(]\s*['"]([^'"]+)['"]/g;
        for (let m; (m = rxCascade.exec(txt));) cascadeFrom.push(m[1]);

        scriptFindings.push({
          url: u,
          status: res.status(),
          openModalOverlay,
          dataBoundEvents,
          cascadeFrom: [...new Set(cascadeFrom)],
          kendoWindowCalls: (txt.match(/\bkendoWindow\s*\(/g) || []).length,
          locationAssignments: (txt.match(/\b(?:window\.)?location(?:\.href)?\s*=\s*/g) || []).length,
        });
      } catch (e) {
        scriptFindings.push({ url: u, error: String(e?.message || e).slice(0, 220) });
      }
    }

    const census = await s.page.evaluate((wrappers) => {
      const text = (el) => (el?.innerText || el?.textContent || '').replace(/\s+/g, ' ').trim();

      const titleEl = document.querySelector('#pageBody h1') || document.querySelector('h1');
      const title = text(titleEl) || null;

      const activeTab = (() => {
        const e = document.querySelector('.k-tabstrip .k-state-active, .k-tabstrip .k-active, [role=tab].k-state-active, [role=tab][aria-selected=true]');
        return text(e) || null;
      })();

      const hasIframe = document.querySelectorAll('iframe').length > 0;

      const roles = new Map();
      const roleWidgetNames = new Map();
      for (const el of document.querySelectorAll('[data-role]')) {
        const r = (el.getAttribute('data-role') || '').trim();
        if (!r) continue;
        roles.set(r, (roles.get(r) || 0) + 1);
        try {
          const w = window.kendo?.widgetInstance?.(el);
          const name = w?.options?.name;
          if (name && name !== r) {
            const key = r + '->' + name;
            roleWidgetNames.set(key, (roleWidgetNames.get(key) || 0) + 1);
          }
        } catch {}
      }

      const wrappersOut = {};
      for (const sel of wrappers) wrappersOut[sel] = document.querySelectorAll(sel).length;

      const tooltips = document.querySelectorAll('[data-role=tooltip]').length;
      const validated = document.querySelectorAll('[data-val=true]').length;
      const required = document.querySelectorAll('.editor-req-field').length;

      const scope = document.querySelector('#pageBody') || document.body;
      const buttons = new Set();
      for (const b of scope.querySelectorAll('button, input[type=button], input[type=submit]')) {
        const v = (b.tagName === 'INPUT' ? (b.value || '') : (b.textContent || '')).replace(/\s+/g, ' ').trim();
        if (v) buttons.add(v);
      }

      const grids = [];
      for (const el of document.querySelectorAll('[data-role=grid]')) {
        let opt = null;
        try {
          const g = window.kendo?.widgetInstance?.(el);
          opt = g?.options || null;
        } catch {}

        const colTitles = [];
        const commandTexts = [];
        const cols = opt?.columns || [];
        for (const c of cols) {
          colTitles.push(String(c?.title || c?.field || ''));
          const cmd = c?.command;
          const cmds = Array.isArray(cmd) ? cmd : (cmd ? [cmd] : []);
          for (const x of cmds) {
            if (typeof x === 'string') commandTexts.push(x);
            else commandTexts.push(x?.text || x?.title || x?.name || '');
          }
        }

        const toolbarTexts = (() => {
          const root = el.closest('.k-grid') || el;
          const bar = root.querySelector('.k-grid-toolbar');
          if (!bar) return [];
          return [...bar.querySelectorAll('a,button,input[type=button],input[type=submit]')]
            .map((e) => (e.value || e.textContent || '').replace(/\s+/g, ' ').trim())
            .filter(Boolean);
        })();

        grids.push({
          id: el.id || null,
          columns: colTitles,
          filterable: !!opt?.filterable,
          pageable: !!opt?.pageable,
          selectable: opt?.selectable ?? null,
          toolbar: [...new Set(toolbarTexts)],
          commands: [...new Set(commandTexts.map((t) => String(t || '').trim()).filter(Boolean))],
        });
      }

      return {
        title,
        activeTab,
        hasIframe,
        roles: Object.fromEntries([...roles.entries()].sort((a, b) => b[1] - a[1])),
        roleWidgetNames: Object.fromEntries([...roleWidgetNames.entries()].sort((a, b) => b[1] - a[1])),
        wrappers: wrappersOut,
        tooltips,
        validated,
        required,
        buttons: [...buttons],
        grids,
      };
    }, wrapperSelectors);

    const headerHtml = await safeOuterHTML(s.page, '#pageHeader');
    const menuHtml = await safeOuterHTML(s.page, '#mainMenuContainer');
    const shellRaw = (headerHtml || '') + '\n' + (menuHtml || '');
    let scrubbed = shellRaw;
    if (username) {
      const esc = String(username).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      scrubbed = scrubbed.replace(new RegExp(esc, 'g'), '<redacted user>');
    }
    scrubbed = scrubbed
      .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/ig, '<guid>')
      .replace(/\?v=[^'"\s>]+/g, '')
      .replace(/\bdata-uid\s*=\s*['"][^'"]+['"]/ig, 'data-uid=<redacted>');
    const shellHash = sha256(scrubbed).slice(0, 24);

    if (screenshotRel) {
      const abs = path.join(OUT, screenshotRel);
      ensureDir(path.dirname(abs));
      await s.page.screenshot({ path: abs, type: 'jpeg', quality: 60, fullPage: false }).catch(() => {});
    }

    return {
      url,
      finalUrl,
      tookMs: Date.now() - started,
      screenshot: screenshotRel || null,
      ...census,
      scripts,
      scriptFindings,
      shellHash,
    };
  } finally {
    await s.close().catch(() => {});
  }
}

function summarizeCensus(pages) {
  const byModule = new Map();
  const unknownPages = [];
  const add = (map, k, n) => map.set(k, (map.get(k) || 0) + (n || 0));

  for (const p of pages) {
    if (!p || p.error) continue;
    const mod = (p.trail && p.trail[0]) || '(unknown module)';
    if (!byModule.has(mod)) byModule.set(mod, { pages: 0, roles: new Map(), wrappers: new Map() });
    const m = byModule.get(mod);
    m.pages++;
    for (const [r, n] of Object.entries(p.roles || {})) add(m.roles, r, n);
    for (const [sel, n] of Object.entries(p.wrappers || {})) if (n) add(m.wrappers, sel, n);

    const unknownRoles = Object.keys(p.roles || {}).filter((r) => !knownRoles.has(r));
    const unknownWrappers = Object.entries(p.wrappers || {}).filter(([, n]) => n > 0).map(([sel]) => sel);
    const unknown = [...unknownRoles, ...unknownWrappers].filter(Boolean);
    if (unknown.length) unknownPages.push({ trail: p.trail, url: p.finalUrl || p.url, unknown: [...new Set(unknown)].sort() });
  }

  const globalRoleCounts = new Map();
  const globalWrapperCounts = new Map();
  for (const m of byModule.values()) {
    for (const [r, n] of m.roles.entries()) add(globalRoleCounts, r, n);
    for (const [w, n] of m.wrappers.entries()) add(globalWrapperCounts, w, n);
  }

  const topUnknownRoles = [...globalRoleCounts.entries()]
    .filter(([r]) => !knownRoles.has(r))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([r]) => r);
  const topWrappers = [...globalWrapperCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([w]) => w);

  const roleCols = [...knownRoles].sort().concat(topUnknownRoles);
  const wrapperCols = topWrappers;

  const lines = [];
  lines.push('# Q20 census summary');
  lines.push('');
  lines.push('Playwright: ' + playwrightVersion);
  lines.push('');
  lines.push('## Roles (data-role) by module');
  lines.push('');
  lines.push(['| module | pages |', ...roleCols.map((c) => ' ' + c + ' |')].join(''));
  lines.push(['|---|---:|', ...roleCols.map(() => '---:|')].join(''));
  for (const [mod, m] of [...byModule.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const row = ['| ' + mod + ' | ' + m.pages + ' |'];
    for (const c of roleCols) row.push(' ' + (m.roles.get(c) || 0) + ' |');
    lines.push(row.join(''));
  }
  lines.push('');
  lines.push('## Wrappers by module');
  lines.push('');
  lines.push(['| module | pages |', ...wrapperCols.map((c) => ' ' + c + ' |')].join(''));
  lines.push(['|---|---:|', ...wrapperCols.map(() => '---:|')].join(''));
  for (const [mod, m] of [...byModule.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const row = ['| ' + mod + ' | ' + m.pages + ' |'];
    for (const c of wrapperCols) row.push(' ' + (m.wrappers.get(c) || 0) + ' |');
    lines.push(row.join(''));
  }
  lines.push('');
  lines.push('## Pages using widgets the kit does not know');
  lines.push('');
  if (!unknownPages.length) lines.push('- (none found)');
  else for (const p of unknownPages.slice(0, 400)) lines.push('- ' + (p.trail ? p.trail.join(' > ') : '(unknown)') + ' - ' + p.unknown.join(', ') + ' - ' + p.url);
  if (unknownPages.length > 400) lines.push('- ... plus ' + (unknownPages.length - 400) + ' more');
  lines.push('');

  return lines.join('\n');
}

async function q20(browser, cfg, pack, { viewport, dpr, username }) {
  ensureDir(path.join(OUT, '20-census'));

  const menu = await readMenu(browser, cfg, {
    url: URLS.home,
    viewport,
    dpr,
    sel: {
      ...(pack.selectors || {}),
      ...(pack.menuButton ? { menuButton: pack.menuButton } : {}),
    },
    target: pack.menu || 'File Transfer Services',
    maxDepth: 3,
    shot: path.join(OUT, '20-menu-open.png'),
    shotDir: path.join(OUT, '20-menu-modules'),
    log: () => {},
  });

  const leaves = [];
  const jsLinks = [];
  const visit = (node, trail) => {
    if (node?.children?.length) return void node.children.forEach((c) => visit(c, [...trail, c.label]));
    const href = (node?.href || '').trim();
    if (/^javascript:/i.test(href)) {
      jsLinks.push({ trail, href });
      return;
    }
    const url = node?.url || (href && !/^(#|javascript:)/i.test(href) ? href : null);
    if (!url) return;
    leaves.push({ trail, href: href || null, url: new URL(url, BASE).href });
  };
  for (const m of menu.modules || []) visit(m, [m.label]);

  writeJson('20-menu-links.json', { jsLinks, leavesCount: leaves.length, leaves });

  const priorPath = path.join(OUT, '20-census.json');
  let prior = [];
  if (fs.existsSync(priorPath)) {
    try { prior = JSON.parse(fs.readFileSync(priorPath, 'utf8')); } catch {}
  }
  const done = new Set(prior.filter((p) => p && !p.error).map((p) => p.finalUrl || p.url));

  const out = [...prior];
  const upsert = (entry) => {
    const key = entry.finalUrl || entry.url;
    const i = out.findIndex((x) => (x?.finalUrl || x?.url) === key);
    if (i >= 0) out[i] = entry;
    else out.push(entry);
  };

  for (const leaf of leaves) {
    const moduleSlug = slug(leaf.trail[0]);
    const itemSlug = slug(leaf.trail.at(-1));
    const screenshotRel = path.join('20-census', moduleSlug, itemSlug + '.jpg');

    if (done.has(leaf.url)) continue;

    const base = { trail: leaf.trail, href: leaf.href, url: leaf.url };
    const entry = await withTimeout(25000, async () => {
      const data = await pageCensus({ browser, cfg, viewport, dpr, url: leaf.url, username, screenshotRel });
      return { ...base, ...data };
    }).catch((e) => ({ ...base, error: String(e?.message || e).slice(0, 220) }));

    upsert(entry);
    fs.writeFileSync(priorPath, JSON.stringify(out, null, 1));
  }

  writeJson('20-census.json', out);
  writeText('20-census-summary.md', summarizeCensus(out));
}

async function q21(browser, cfg, { viewport, dpr }) {
  const pages = [
    { id: 'cfg', url: URLS.cfg },
    { id: 'trk', url: URLS.trk },
    { id: 'ftp', url: URLS.ftp },
  ];

  const out = { pages: {}, screenshots: [] };
  let shotN = 1;

  for (const p of pages) {
    const s = await openPage(browser, cfg, { url: p.url, viewport, dpr });
    try {
      await s.load({ quietMax: 10000 });
      await waitForKendoReady(s.page, 10000);

      const items = await s.page.evaluate(() => {
        const root = document.querySelector('#pageBody > main') || document.querySelector('#pageBody') || document.body;
        const els = [...root.querySelectorAll('[data-role=tooltip]')].slice(0, 12);
        return els.map((el) => ({ selector: window.__pw?.makeSel?.()?.(el) || null }));
      });

      const pageOut = [];
      for (const it of items) {
        if (!it.selector) continue;
        const delay = await s.page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return 500;
          try {
            const w = window.kendo?.widgetInstance?.(el);
            const showAfter = Number(w?.options?.showAfter || 0);
            return Math.max(0, showAfter) + 300;
          } catch {
            return 500;
          }
        }, it.selector);

        await s.page.hover(it.selector, { timeout: 3000 }).catch(() => {});
        await s.page.waitForTimeout(delay);

        const meas = await s.page.evaluate(() => {
          const isVis = (el) => {
            if (!el) return false;
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 10 && r.height > 10;
          };
          const tt = [...document.querySelectorAll('.k-tooltip')].filter(isVis).at(-1) || null;
          const ac = tt?.closest('.k-child-animation-container') || null;
          if (!tt) return null;

          const rect = tt.getBoundingClientRect();
          const rectAc = ac ? ac.getBoundingClientRect() : null;
          const cs = getComputedStyle(tt);
          const lh = parseFloat(cs.lineHeight || '0') || 0;
          const lines = lh ? Math.round(rect.height / lh) : null;

          return {
            text: (tt.textContent || '').replace(/\s+/g, ' ').trim(),
            containerInline: ac?.getAttribute('style') || null,
            tooltipInline: tt.getAttribute('style') || null,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            containerRect: rectAc ? { x: rectAc.x, y: rectAc.y, width: rectAc.width, height: rectAc.height } : null,
            lineHeight: cs.lineHeight || null,
            lines,
          };
        });

        if (!meas) continue;
        pageOut.push({ triggerSelector: it.selector, ...meas });

        if (meas.text && /\S+\s+\S+/.test(meas.text) && out.screenshots.length < 6) {
          const file = '21-tooltip-' + (shotN++) + '.png';
          const abs = path.join(OUT, file);
          await s.page.screenshot({
            path: abs,
            clip: {
              x: Math.max(0, meas.rect.x - 10),
              y: Math.max(0, meas.rect.y - 10),
              width: Math.max(1, meas.rect.width + 20),
              height: Math.max(1, meas.rect.height + 20),
            },
          }).catch(() => {});
          out.screenshots.push(file);
        }
      }

      out.pages[p.id] = { url: p.url, tooltips: pageOut };
    } finally {
      await s.close().catch(() => {});
    }
  }

  writeJson('21-tooltips.json', out);
}

async function q22(cfgRaw, storageState, pack, { viewport, dpr }) {
  const videoDir = path.join(OUT, '_tmp-video');
  ensureDir(videoDir);

  const browser = await launch({ ...cfgRaw, headed: true });
  try {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: dpr,
      storageState,
      ignoreHTTPSErrors: true,
      recordVideo: { dir: videoDir, size: viewport },
    });

    await context.route('**/*', (route) => {
      const m = route.request().method();
      const mutating = !['GET', 'HEAD', 'OPTIONS'].includes(m);
      if (mutating) return route.abort('aborted');
      return route.continue();
    });

    const page = await context.newPage();
    const out = { perPage: {}, video: '22-menu.webm', screenshots: [] };
    const menuBtn = pack.menuButton || '#pageBannerMenu > nav > div > i';

    const menuState = async (tag) => await page.evaluate((t) => {
      const pick = (sel) => document.querySelector(sel);
      const styles = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { display: cs.display, opacity: cs.opacity, transform: cs.transform };
      };
      const container = pick('#mainMenuContainer');
      const backdrop = [...document.querySelectorAll('.disabled-backdrop')];
      const back = backdrop.at(-1) || null;
      return {
        tag: t,
        container: container ? { className: container.className || '', style: styles(container) } : null,
        backdropCount: backdrop.length,
        backdropOuterHTML: back ? back.outerHTML : null,
        backdropStyle: back ? styles(back) : null,
        activeElement: (() => {
          const a = document.activeElement;
          if (!a) return null;
          const txt = (a.textContent || a.value || '').replace(/\s+/g, ' ').trim().slice(0, 80);
          return { tag: a.tagName.toLowerCase(), id: a.id || null, className: a.className || null, text: txt || null };
        })(),
      };
    }, tag);

    const isMenuOpen = async () => await page.evaluate(() => {
      const el = document.querySelector('#mainMenuContainer');
      if (!el) return false;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.05 && r.width > 20 && r.height > 20;
    });

    const openMenu = async () => {
      await page.click(menuBtn, { timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(250);
    };

    const closeMenu = async (method) => {
      if (!(await isMenuOpen())) await openMenu();
      if (method === 'close-button') await page.click('#mainMenuClose', { timeout: 3000 }).catch(() => {});
      else if (method === 'escape') await page.keyboard.press('Escape').catch(() => {});
      else if (method === 'backdrop-click') await page.mouse.click(200, 500).catch(() => {});
      await page.waitForTimeout(350);
      return await isMenuOpen();
    };

    const snapOpenTimeline = async () => {
      const items = [];
      items.push(await menuState('before'));
      await openMenu();
      await page.waitForTimeout(50);
      items.push(await menuState('t+50ms'));
      await page.waitForTimeout(250);
      items.push(await menuState('t+300ms'));
      await page.waitForTimeout(600);
      items.push(await menuState('t+900ms'));
      return items;
    };

    const hoverFlyout = async (label, prefix) => {
      const tgt = page.locator('#mainMenu').locator('text=' + label).first();
      const before = await page.evaluate(() => [...document.querySelectorAll('.k-animation-container')].map((e) => e.getAttribute('style') || ''));
      await tgt.hover({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(50);
      const at50 = await page.evaluate((b) => {
        const isVis = (el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 10 && r.height > 10;
        };
        const now = [...document.querySelectorAll('.k-animation-container')].filter(isVis);
        const fresh = now.find((e) => !(b || []).includes(e.getAttribute('style') || '')) || now.at(-1) || null;
        if (!fresh) return null;
        const r = fresh.getBoundingClientRect();
        return { rect: { x: r.x, y: r.y, width: r.width, height: r.height }, inlineStyle: fresh.getAttribute('style') || null };
      }, before);
      await page.waitForTimeout(250);
      const at300 = await page.evaluate(() => {
        const isVis = (el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity || '1') > 0.01 && r.width > 10 && r.height > 10;
        };
        const fresh = [...document.querySelectorAll('.k-animation-container')].filter(isVis).at(-1) || null;
        if (!fresh) return null;
        const r = fresh.getBoundingClientRect();
        return { rect: { x: r.x, y: r.y, width: r.width, height: r.height }, inlineStyle: fresh.getAttribute('style') || null };
      });
      const shot = prefix + '.png';
      await page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});
      out.screenshots.push(shot);
      return { at50, at300, screenshot: shot };
    };

    const kendoMenuOptions = async () => await page.evaluate(() => {
      try {
        const o = globalThis.$?.('#mainMenu')?.data?.('kendoMenu')?.options;
        return o ? { animation: o.animation, hoverDelay: o.hoverDelay, direction: o.direction, orientation: o.orientation, openOnClick: o.openOnClick } : null;
      } catch {
        return null;
      }
    });

    for (const [id, url] of [['home', URLS.home], ['cfg', URLS.cfg]]) {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await waitForKendoReady(page, 10000);
      const timeline = await snapOpenTimeline();
      const opts = await kendoMenuOptions();
      const flyout = await hoverFlyout('File Transfer Services', '22-menu-flyout-' + id);
      const stillOpenA = await closeMenu('close-button');
      const stillOpenB = await closeMenu('escape');
      const stillOpenC = await closeMenu('backdrop-click');
      out.perPage[id] = {
        url,
        timeline,
        kendoMenuOptions: opts,
        flyout,
        closedBy: {
          closeButtonStillOpen: stillOpenA,
          escapeStillOpen: stillOpenB,
          backdropClickStillOpen: stillOpenC,
        },
      };
    }

    await page.goto(URLS.home, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForKendoReady(page, 10000);
    await openMenu();
    await page.locator('#mainMenu').locator('text=File Transfer Services').first().hover().catch(() => {});
    await page.waitForTimeout(400);
    await page.locator('#mainMenu').locator('text=File Transfer Tracking').first().hover().catch(() => {});
    await page.waitForTimeout(250);
    await page.locator('#mainMenu').locator('text=File Transfer Tracking').first().click().catch(() => {});
    await page.waitForLoadState('load', { timeout: 25000 }).catch(() => {});
    await waitForKendoReady(page, 10000);

    const videoPath = await page.video()?.path().catch(() => null);
    await context.close().catch(() => {});

    if (videoPath && fs.existsSync(videoPath)) {
      const target = path.join(OUT, '22-menu.webm');
      try { fs.copyFileSync(videoPath, target); } catch {}
    }

    writeJson('22-menu.json', out);
  } finally {
    await browser.close().catch(() => {});
    try { fs.rmSync(videoDir, { recursive: true, force: true }); } catch {}
  }
}

async function q23(browser, cfg, { viewport, dpr }) {
  const pages = [
    { id: 'cfg', url: URLS.cfg },
    { id: 'trk', url: URLS.trk },
    { id: 'ftp', url: URLS.ftp },
  ];
  const out = { pages: {} };

  for (const p of pages) {
    const s = await openPage(browser, cfg, { url: p.url, viewport, dpr });
    try {
      await s.load({ quietMax: 10000 });
      await waitForKendoReady(s.page, 10000);
      await s.page.keyboard.press('Escape').catch(() => {});
      await s.page.click('#mainMenuClose', { timeout: 1000 }).catch(() => {});
      await s.page.waitForTimeout(200);

      const closeAnyWindow = async () => {
        const close = s.page.locator('.k-window:visible .k-window-actions .k-i-close, .k-window:visible .k-window-actions [aria-label=Close], .k-window:visible .k-window-actions button').first();
        if (await close.count().catch(() => 0)) await close.click().catch(() => {});
        await s.page.waitForTimeout(300);
      };

      const body = s.page.locator('#pageBody');
      const createNew = body.locator('text=Create New').first();
      const exists = (await createNew.count().catch(() => 0)) > 0;
      const box = exists ? await createNew.boundingBox().catch(() => null) : null;
      const elementFromPoint = box ? await s.page.evaluate(({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return null;
        const txt = (el.textContent || el.value || '').replace(/\s+/g, ' ').trim().slice(0, 80);
        return { tag: el.tagName.toLowerCase(), id: el.id || null, className: el.className || null, text: txt || null };
      }, { x: box.x + box.width / 2, y: box.y + box.height / 2 }) : null;
      const pageOut = {
        url: p.url,
        createNew: { exists, box, elementFromPoint },
        createNewResult: null,
        searchResult: null,
      };

      if (exists) {
        const n = s.guard.events.length;
        s.guard.allowPost = true;
        await createNew.click({ timeout: 5000 }).catch(() => {});
        s.guard.allowPost = false;

        const win = s.page.locator('.k-window').filter({ has: s.page.locator('.k-window-title') });
        const opened = await win.first().waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);

        const reqs = s.guard.events.slice(n)
          .filter((e) => ['request', 'postback', 'async-postback', 'navigation'].includes(e.type))
          .map((e) => {
            try { const u = new URL(e.url); return { type: e.type, method: e.method || null, path: u.pathname }; }
            catch { return { type: e.type, method: e.method || null, path: e.url }; }
          });

        if (opened) {
          const info = await s.page.evaluate(() => {
            const w = document.querySelector('.k-window');
            const title = (w?.querySelector('.k-window-title')?.textContent || '').replace(/\s+/g, ' ').trim() || null;
            const rect = w ? w.getBoundingClientRect() : null;
            let options = null;
            try { options = window.kendo?.widgetInstance?.(w)?.options || null; } catch {}
            const overlay = document.querySelector('.k-overlay');
            return {
              title,
              rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
              options,
              overlay: overlay ? { className: overlay.className || '', style: overlay.getAttribute('style') || null } : null,
              outerHTML: w ? w.outerHTML : null,
            };
          });
          const shot = '23-' + p.id + '-create-new.png';
          await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});
          pageOut.createNewResult = { opened: true, info: { ...info, outerHTML: cap(info.outerHTML) }, screenshot: shot, requests: reqs };
          await closeAnyWindow();
        } else {
          pageOut.createNewResult = { opened: false, requests: reqs };
        }
      }

      const searchBtn = body.locator('button').filter({ hasText: 'Search' }).first();
      const hasSearch = (await searchBtn.count().catch(() => 0)) > 0;
      if (hasSearch) {
        s.guard.allowPost = true;
        await searchBtn.click({ timeout: 5000 }).catch(() => {});
        await s.page.waitForTimeout(1000);
        await waitForKendoReady(s.page, 10000);
        s.guard.allowPost = false;

        const rowCount = await s.page.evaluate(() => {
          const grid = document.querySelector('[data-role=grid]');
          if (!grid) return null;
          const rows = [...grid.querySelectorAll('tbody tr')].filter((tr) => !(tr.className || '').includes('k-no-data'));
          return rows.length;
        });

        pageOut.searchResult = { rowCount, singleClick: null, doubleClick: null };

        if (rowCount && rowCount > 0) {
          const row = s.page.locator('[data-role=grid] tbody tr').first();
          const beforeSel = await row.getAttribute('class').catch(() => null);
          await row.click({ timeout: 5000 }).catch(() => {});
          await s.page.waitForTimeout(400);
          const afterSel = await row.getAttribute('class').catch(() => null);
          const windowOpened = await s.page.locator('.k-window:visible').count().catch(() => 0);
          pageOut.searchResult.singleClick = { beforeClass: beforeSel, afterClass: afterSel, windowOpened: windowOpened > 0 };
          if (windowOpened > 0) await closeAnyWindow();

          await row.dblclick({ timeout: 5000 }).catch(() => {});
          const opened = await s.page.locator('.k-window:visible').first().waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
          if (opened) {
            const info = await s.page.evaluate(() => {
              const w = document.querySelector('.k-window');
              const title = (w?.querySelector('.k-window-title')?.textContent || '').replace(/\s+/g, ' ').trim() || null;
              const rect = w ? w.getBoundingClientRect() : null;
              let options = null;
              try { options = window.kendo?.widgetInstance?.(w)?.options || null; } catch {}
              return { title, rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null, options };
            });
            const shot = '23-' + p.id + '-row-dblclick.png';
            await s.page.screenshot({ path: path.join(OUT, shot), fullPage: false }).catch(() => {});
            pageOut.searchResult.doubleClick = { opened: true, info, screenshot: shot };
            await closeAnyWindow();
          } else {
            pageOut.searchResult.doubleClick = { opened: false };
          }
        }
      }
      out.pages[p.id] = pageOut;
    } catch (e) {
      out.pages[p.id] = { url: p.url, error: String(e?.message || e).slice(0, 240) };
    } finally {
      await s.close().catch(() => {});
    }
  }
  writeJson('23-dialogs.json', out);
}

async function q24(browser, cfg, { viewport, dpr, username }) {
  const screenshot = '24-ui-examples.png';
  const census = await withTimeout(25000, async () => {
    return await pageCensus({ browser, cfg, viewport, dpr, url: URLS.uiExamples, username, screenshotRel: null });
  }).catch((e) => ({ url: URLS.uiExamples, error: String(e?.message || e).slice(0, 240) }));

  const headings = [];
  if (!census.error) {
    const s = await openPage(browser, cfg, { url: URLS.uiExamples, viewport, dpr });
    try {
      await s.load({ quietMax: 10000 });
      await waitForKendoReady(s.page, 10000);
      await s.page.screenshot({ path: path.join(OUT, screenshot), fullPage: true }).catch(() => {});
      headings.push(...(await s.page.evaluate(() => {
        const root = document.querySelector('#pageBody > main') || document.querySelector('#pageBody') || document.body;
        return [...root.querySelectorAll('h1,h2,h3')]
          .map((h) => (h.textContent || '').replace(/\s+/g, ' ').trim())
          .filter(Boolean)
          .slice(0, 120);
      })));
    } finally {
      await s.close().catch(() => {});
    }
  }

  writeJson('24-ui-examples.json', { url: URLS.uiExamples, screenshot, census, headings });
}

async function main() {
  ensureDir(OUT);

  const cfgRaw = readJson(path.resolve('config.json'));
  const pack = readJson(path.resolve('packs/file-transfer/pack.json'));

  const envFile = readEnv(path.resolve('.env'));
  // On Windows, USERNAME is commonly pre-set to the OS login. Prefer .env.
  const username = envFile.USERNAME || process.env.USERNAME || '';
  const password = envFile.UI_PASSWORD || process.env.UI_PASSWORD || envFile.PASSWORD || process.env.PASSWORD || '';
  const manual = process.argv.includes('--manual-login');
  const headless = process.argv.includes('--headless');

  if (!manual && !username) {
    console.error('Missing USERNAME in environment (or run with --manual-login).');
    process.exit(2);
  }
  if (!manual && !password) {
    console.error('Missing UI_PASSWORD (or PASSWORD) in environment (or run with --manual-login).');
    process.exit(2);
  }

  const viewport = { width: 1920, height: 1080 };
  const dpr = 1;

  const browser = await launch({ ...cfgRaw, headed: !headless });
  const summary = [];
  try {
    const storageState = manual
      ? await manualLogin({ ...cfgRaw, headed: true }, { url: URLS.home, viewport })
      : await login(browser, {
        url: URLS.home,
        state: undefined,
        creds: { username, password },
        sel: {
          ...(pack.selectors || {}),
          ...(pack.menuButton ? { menuButton: pack.menuButton } : {}),
        },
        viewport,
        log: () => {},
      });

    const cfg = {
      ...cfgRaw,
      mode: 'readonly',
      auth: { ...(cfgRaw.auth || {}), storageState },
      headed: !headless,
    };

    const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).toLowerCase();
    const run = async (q, fn, errFile) => {
      if (only && !q.toLowerCase().startsWith(only)) return;
      try {
        await fn();
        summary.push(row(q, 'ok'));
      } catch (e) {
        const msg = String(e?.message || e);
        if (errFile) writeJson(errFile, { error: msg });
        summary.push(row(q, 'fail', msg.slice(0, 140)));
      }
    };

    await run('Q20 census', () => q20(browser, cfg, pack, { viewport, dpr, username }), '20-census-error.json');
    await run('Q21 tooltips', () => q21(browser, cfg, { viewport, dpr }), '21-tooltips-error.json');
    await run('Q22 menu', () => q22(cfgRaw, storageState, pack, { viewport, dpr }), '22-menu-error.json');
    await run('Q23 dialogs', () => q23(browser, cfg, { viewport, dpr }), '23-dialogs-error.json');
    await run('Q24 UI examples', () => q24(browser, cfg, { viewport, dpr, username }), '24-ui-examples-error.json');
  } finally {
    await browser.close().catch(() => {});
  }

  writeText('SUMMARY-2.md', ['# provider-probe (online) - probe 2', '', ...summary, ''].join('\n'));
}

await main();
