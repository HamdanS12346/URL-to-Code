// The Provider kit's follow-up probe: the measurements the kit still lacks for five rebuild bugs (packs/fxfer-v7/changes).
// Run it through the same driver as the census probe, on the module whose screens showed the bugs:
//   npm run probe -- <pack> --probe fixes --modules "File Transfer Services" --out docs\probe-fixes --fresh
// Read-only like probe.mjs: nothing is saved, Delete/Update are never clicked, a sort or a filter is never applied to data
// that leaves the page (counts, markup shapes and positions only). The questions (F-ids are the keys in answers.json):
//  F1  a dialog opening, frame by frame, at each viewport: when the window is at its final place and size (the open
//      animation, the "Processing ..." box before it), what requests the opener needs, and whether it opens with POSTs blocked
//  F2  grid sort: the header's indicator markup and colors unsorted / after 1, 2, 3 clicks; what the other columns show then
//  F3  date inputs: what the box shows at rest (and 3 s later) next to the widget's value(); on focus, after a picked day, on blur
//  F4  the header while scrolling: at which scroll position it hides (headroom unpinned) and how far up brings it back, at each viewport
//  F5  the grid filter popup: where the operator dropdown's list opens (relative to the dropdown) and what it covers
//  F6  dropdowns inside a dialog: where their list opens, its stacking against the window, its item count
import fs from 'node:fs';
import path from 'node:path';

const HARVEST = fs.readFileSync(new URL('./harvest.js', import.meta.url), 'utf8');

// ---------- in-page helpers (window.__fx) ----------
function inpage() {
  if (window.__fx) return;
  const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none';
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const widgetOf = (el) => { try { return (el && window.kendo?.widgetInstance?.(window.jQuery(el))) || null; } catch { return null; } };
  const cls = (el) => (typeof el.className === 'string' ? el.className : el.getAttribute('class') || '');
  const LOADING = '#loadingDialog, .k-loading-mask, .k-loading-image, .wait-dialog, .blockUI';
  const iso = (d) => (d instanceof Date && !isNaN(d) ? d.toISOString() : d == null ? null : String(d));
  let n = 0;
  const stamp = (el) => el.getAttribute('data-fx') || (el.setAttribute('data-fx', 'f' + ++n), el.getAttribute('data-fx'));
  const wins = () => [...document.querySelectorAll('.k-window')].filter(shown);
  const topWin = () => wins().sort((a, b) => (+getComputedStyle(a).zIndex || 0) - (+getComputedStyle(b).zIndex || 0)).pop() || null;
  const winInfo = (w) => {
    const cs = getComputedStyle(w);
    return { ...box(w), title: (w.querySelector('.k-window-title')?.textContent || '').trim().slice(0, 60), id: w.querySelector('.k-window-content')?.id || null,
      loading: !!w.querySelector(LOADING) || w.matches(LOADING), transform: cs.transform, opacity: cs.opacity, z: cs.zIndex };
  };
  let rec = null;
  window.__fx = {
    stamp,
    wins: () => wins().length,
    // F1: every animation frame, the windows and the loading box (a sample is kept only when something changed)
    watch() {
      rec = { t0: performance.now(), samples: [], last: '' };
      const tick = () => {
        if (!rec || rec.stopped) return;
        const now = { wins: wins().map(winInfo), loading: [...document.querySelectorAll(LOADING)].filter(shown).map((e) => ({ sel: e.id ? '#' + e.id : cls(e).split(' ')[0], ...box(e) })) };
        const k = JSON.stringify(now);
        if (k !== rec.last && rec.samples.length < 400) { rec.samples.push({ t: Math.round(performance.now() - rec.t0), ...now }); rec.last = k; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    unwatch() { if (!rec) return null; rec.stopped = true; const s = rec.samples; rec = null; return s; },
    // F1: the open window, settled: where, its CSS, its Kendo options, the viewport, the page lock
    final() {
      const w = topWin();
      if (!w) return null;
      const cs = getComputedStyle(w), c = w.querySelector('.k-window-content'), k = widgetOf(c);
      let phone = null;
      try { phone = typeof window.isPhone === 'function' ? !!window.isPhone() : null; } catch {}
      const rules = [];
      const visit = (list, media) => {
        for (const r of list) {
          if (rules.length >= 15) return;
          if (r.cssRules && r.media) { if (matchMedia(r.media.mediaText).matches) visit(r.cssRules, r.media.mediaText); continue; }
          if (!r.selectorText || !r.style) continue;
          const pick = {};
          for (const p of ['width', 'min-width', 'max-width', 'max-height', 'left', 'top', 'transform']) if (r.style.getPropertyValue(p)) pick[p] = r.style.getPropertyValue(p);
          if (!Object.keys(pick).length) continue;
          try { if (!w.matches(r.selectorText)) continue; } catch { continue; }
          rules.push({ selector: r.selectorText.slice(0, 160), ...pick, ...(media ? { media } : {}) });
        }
      };
      for (const sh of document.styleSheets) { try { visit(sh.cssRules, null); } catch {} }
      return { ...winInfo(w), className: cls(w).slice(0, 200), inlineStyle: w.getAttribute('style'), css: { width: cs.width, minWidth: cs.minWidth, maxWidth: cs.maxWidth, maxHeight: cs.maxHeight, left: cs.left, top: cs.top, position: cs.position },
        rules, options: k ? { position: k.options.position, width: k.options.width, height: k.options.height, modal: k.options.modal, animation: k.options.animation } : null,
        content: c ? { scrollH: c.scrollHeight, clientH: c.clientHeight, maxHeight: getComputedStyle(c).maxHeight } : null,
        viewport: { innerW: innerWidth, innerH: innerHeight, docW: document.documentElement.clientWidth, dpr: devicePixelRatio, isPhone: phone, max1280: matchMedia('(max-width: 1280px)').matches },
        lock: { html: getComputedStyle(document.documentElement).overflow, body: getComputedStyle(document.body).overflow }, focus: document.activeElement?.id || document.activeElement?.tagName || null };
    },
    closeTop() { const w = topWin(); const k = widgetOf(w?.querySelector('.k-window-content')); if (k) { k.close(); return true; } w?.querySelector('.k-window-titlebar-action, .k-window-action, [aria-label=Close]')?.click(); return !!w; },

    // F2: the first grid with rows: its headers
    sortables() {
      const g = [...document.querySelectorAll('.k-grid')].find((x) => shown(x) && x.querySelector('tbody tr:not(.k-grid-norecords) td'));
      if (!g) return null;
      const ths = [...g.querySelectorAll('.k-grid-header th')].filter(shown);
      return { grid: stamp(g), cols: ths.map((th, i) => ({ i, title: (th.querySelector('.k-column-title')?.textContent || th.textContent || '').trim().slice(0, 40), stamp: stamp(th), sortable: th.getAttribute('data-role') === 'columnsorter' || th.hasAttribute('aria-sort') })) };
    },
    // the header cells' state: the markup without ids, aria-sort, each icon's classes, glyph and color
    headState(grid) {
      const g = document.querySelector(`[data-fx="${grid}"]`);
      if (!g) return null;
      const strip = (h) => h.replace(/\s(id|data-fx|aria-describedby|aria-controls)="[^"]*"/g, '');
      return [...g.querySelectorAll('.k-grid-header th')].filter(shown).map((th) => ({
        title: (th.querySelector('.k-column-title')?.textContent || '').trim().slice(0, 40), ariaSort: th.getAttribute('aria-sort'), className: cls(th),
        icons: [...th.querySelectorAll('i, .k-icon, .k-sort-icon')].map((e) => { const cs = getComputedStyle(e), b = getComputedStyle(e, '::before'); return { cls: cls(e), color: cs.color, display: cs.display, glyph: b.content, fontFamily: b.fontFamily.slice(0, 60), fontWeight: b.fontWeight, ...box(e) }; }),
        html: strip(th.innerHTML).slice(0, 1500) }));
    },
    headerBox(grid) { const h = document.querySelector(`[data-fx="${grid}"] .k-grid-header`); return h ? box(h) : null; },

    // F3: every date/time widget (on the page, or inside the top window)
    dates(where) {
      const R = where === 'dialog' ? topWin() : document.querySelector('#pageBody > main, main') || document.body;
      if (!R) return [];
      return [...R.querySelectorAll('input[data-role=datepicker], input[data-role=datetimepicker], input[data-role=timepicker], input[data-role=dateinput]')].filter((i) => where === 'dialog' || !i.closest('.k-window')).map((i) => {
        const w = widgetOf(i);
        let v = null;
        try { v = w?.value(); } catch {}
        return { stamp: stamp(i), id: i.id, role: i.getAttribute('data-role'), shows: i.value, valueAttr: i.getAttribute('value'), widgetValue: iso(v), optionValue: iso(w?.options?.value), placeholder: i.placeholder || null,
          format: w?.options?.format || null, dateInput: w?.options?.dateInput ?? null, enabled: !i.disabled && !i.closest('.k-disabled') };
      });
    },
    dateShows(st) {
      const i = document.querySelector(`[data-fx="${st}"]`);
      if (!i) return null;
      let v = null;
      try { v = widgetOf(i)?.value(); } catch {}
      return { shows: i.value, widgetValue: iso(v), popup: [...document.querySelectorAll('.k-animation-container')].some((c) => shown(c) && c.querySelector('.k-calendar, .k-time-list, .k-timeselector')) };
    },
    pickToday() { const c = [...document.querySelectorAll('.k-calendar')].find(shown); const d = c?.querySelector('td.k-today .k-link') || c?.querySelector('td:not(.k-other-month) .k-link'); if (!d) return false; d.click(); return true; },
    restoreDate(st) { const w = widgetOf(document.querySelector(`[data-fx="${st}"]`)); try { w?.close?.('date'); w?.close?.('time'); w?.close?.(); } catch {} },

    // F4: the parts that stay on screen while the page scrolls (the header, the module tab bar)
    fixedParts() {
      const out = [];
      const add = (el, label) => { if (el && !out.some((o) => o.stamp === el.getAttribute('data-fx'))) out.push({ stamp: stamp(el), sel: label || el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls(el) ? '.' + cls(el).trim().split(/\s+/).slice(0, 3).join('.') : ''), position: getComputedStyle(el).position }); };
      add(document.querySelector('#pageHeader, header')); // the header even when it is not fixed (a relative header at a small width)
      for (const el of document.querySelectorAll('body *')) {
        if (out.length >= 8) break;
        if (el.closest('.k-window, .k-animation-container')) continue;
        const p = getComputedStyle(el).position;
        if ((p === 'fixed' || p === 'sticky') && shown(el) && el.getBoundingClientRect().width > innerWidth * 0.5) add(el);
      }
      const bar = document.querySelector('#activeModuleMenu')?.parentElement?.closest('nav, div');
      if (bar) add(bar, 'module bar ' + bar.tagName.toLowerCase() + (bar.id ? '#' + bar.id : '.' + cls(bar).split(' ')[0]));
      return out;
    },
    partsAt(stamps) {
      return { y: Math.round(scrollY), parts: stamps.map((s) => { const e = document.querySelector(`[data-fx="${s}"]`); if (!e) return null; const r = e.getBoundingClientRect(); return { s, top: Math.round(r.top), bottom: Math.round(r.bottom), cls: cls(e).split(/\s+/).filter((c) => /headroom|pinned|top|fixed|sticky/.test(c)).join(' '), transform: getComputedStyle(e).transform }; }) };
    },
    scrollMax: () => document.documentElement.scrollHeight - innerHeight,

    // F5: the filter icon of the first grid; the open filter popup and its operator dropdown
    filterIcon() { const f = [...document.querySelectorAll('.k-grid-filter-menu, .k-grid-header-menu, .k-grid-filter')].find(shown); return f ? { stamp: stamp(f), ...box(f) } : null; },
    filterPopup() {
      const p = [...document.querySelectorAll('.k-filter-menu, .k-column-menu')].find(shown);
      if (!p) return null;
      const c = p.closest('.k-animation-container') || p, dd = [...p.querySelectorAll('.k-dropdownlist, .k-picker')].find(shown);
      const inp = [...p.querySelectorAll('input[type=text], .k-textbox input')].find(shown);
      return { ...box(c), z: getComputedStyle(c).zIndex, dropdown: dd ? { stamp: stamp(dd), ...box(dd) } : null, input: inp ? box(inp) : null,
        buttons: [...p.querySelectorAll('button')].filter(shown).map((b) => ({ text: b.textContent.trim(), ...box(b) })) };
    },
    // a dropdown's open list: the visible list popup (not the filter popup itself)
    openList() {
      const l = [...document.querySelectorAll('.k-list-container, .k-dropdownlist-popup')].find((e) => shown(e) && !e.querySelector('.k-filter-menu'));
      if (!l) return null;
      const c = l.closest('.k-animation-container') || l;
      const host = c.parentElement;
      return { ...box(c), z: getComputedStyle(c).zIndex, items: l.querySelectorAll('li').length, parent: host === document.body ? 'body' : host?.closest('.k-window') ? 'inside window' : host?.closest('.k-filter-menu') ? 'inside filter popup' : host?.tagName || null };
    },
    // F6: the dropdowns of the top window
    dialogDropdowns() {
      const w = topWin();
      return w ? [...w.querySelectorAll('.k-dropdownlist, .k-combobox')].filter((d) => shown(d) && !d.classList.contains('k-disabled')).slice(0, 4)
        .map((d) => ({ stamp: stamp(d), label: (d.closest('.editor-col, .form-group')?.querySelector('label')?.textContent || '').trim().slice(0, 40), ...box(d) })) : [];
    },
    winZ() { const w = topWin(); return w ? getComputedStyle(w).zIndex : null; },
  };
}

export async function probePage({ s, viewports = [], shotDir, slug, budgetSec = 300, log = () => {} }) {
  const page = s.page;
  const deadline = Date.now() + budgetSec * 1000;
  const out = { errors: [], skipped: [], viewports: [] };
  const primary = page.viewportSize();
  const shot = async (name, clip) => {
    if (!shotDir) return null;
    const f = path.join(shotDir, `${slug}--${name}.png`);
    const vp = page.viewportSize();
    const c = clip && (() => { const x = Math.max(0, Math.round(clip.x)), y = Math.max(0, Math.round(clip.y)); return { x, y, width: Math.max(4, Math.min(vp.width - x, Math.round(clip.width))), height: Math.max(4, Math.min(vp.height - y, Math.round(clip.height))) }; })();
    await page.screenshot({ path: f, caret: 'hide', ...(c ? { clip: c } : {}) }).catch(() => {});
    return path.basename(f);
  };
  const P = (fn, arg) => page.evaluate(fn, arg);
  const wait = (ms) => page.waitForTimeout(ms);
  const step = async (name, fn) => {
    if (Date.now() > deadline) { out.skipped.push(name); return null; }
    try { return await fn(); } catch (e) { out.errors.push(`${name}: ${String(e.message || e).split('\n')[0].slice(0, 200)}`); return null; }
  };
  const ready = async () => {
    await page.evaluate((src) => { if (!window.__kit) (0, eval)(src); }, HARVEST);
    await page.evaluate(`(${inpage})()`);
    await page.evaluate(() => window.__kit.rest({ scope: document.querySelector('#pageBody > main') ? '#pageBody > main' : null, module: null })).catch(() => null);
  };
  const reload = async () => { await s.load({ idleMs: 3000, quietMax: 5000 }); await ready(); };
  const nWin = () => P(() => window.__fx?.wins() ?? 0).catch(() => 0);
  const closeAll = async () => { for (let i = 0; i < 5 && (await nWin()); i++) { await P(() => window.__fx.closeTop()).catch(() => {}); await wait(700); } };
  const path0 = (u) => u.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
  const reqs = (i) => s.guard.events.slice(i).filter((e) => /request|postback/.test(e.type) && e.url && !/\.(js|css|png|gif|svg|woff2?|ico)(\?|$)/i.test(e.url))
    .map((e) => ({ method: e.method || 'GET', url: path0(e.url), status: e.status || null })).slice(0, 12);

  // F1: an opener clicked with the frame recorder on; waits up to 25 s for a window, then until no window moves for 1.5 s
  const openAndWatch = async (doClick, tag, { blockPosts = false } = {}) => {
    const n0 = await nWin(), ev0 = s.guard.events.length, allow = s.guard.allowPost;
    if (blockPosts) s.guard.allowPost = false;
    try {
      await P(() => window.__fx.watch());
      const t0 = Date.now();
      await doClick();
      await page.waitForFunction((n) => (window.__fx?.wins() || 0) > n, n0, { timeout: 25000 }).catch(() => {});
      let last = null, still = 0;
      for (let i = 0; i < 40 && still < 1500; i++) {
        await wait(250);
        const k = await P(() => JSON.stringify([...document.querySelectorAll('.k-window')].map((w) => { const r = w.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; })));
        still = k === last ? still + 250 : 0;
        last = k;
      }
      const samples = await P(() => window.__fx.unwatch());
      const opened = (await nWin()) > n0;
      const r = { opened, ms: Date.now() - t0, requests: reqs(ev0), blocked: s.guard.events.slice(ev0).filter((e) => e.status === 'blocked').map((e) => `${e.method} ${path0(e.url)}`),
        samples, final: opened ? await P(() => window.__fx.final()) : null, shot: await shot(tag) };
      // when did the window first show, and when did it reach its final box
      if (samples?.length) {
        const first = samples.find((x) => x.wins.length > n0);
        r.firstSeen = first ? { t: first.t, box: first.wins[first.wins.length - 1] } : null;
        const f = r.final;
        r.settledAt = f ? samples.find((x) => x.wins.some((w) => Math.abs(w.x - f.x) <= 1 && Math.abs(w.y - f.y) <= 1 && Math.abs(w.w - f.w) <= 1 && Math.abs(w.h - f.h) <= 2))?.t ?? null : null;
      }
      return r;
    } finally { s.guard.allowPost = allow; }
  };

  // F6: each dropdown of the open window: where its list opens and how it stacks against the window
  const dialogDropdowns = async (tag) => {
    const list = await P(() => window.__fx.dialogDropdowns());
    const res = [];
    for (const [i, d] of list.entries()) {
      await page.locator(`[data-fx="${d.stamp}"]`).click({ timeout: 3000 }).catch(() => {});
      await wait(600);
      const l = await P(() => window.__fx.openList());
      res.push({ label: d.label, dropdown: { x: d.x, y: d.y, w: d.w, h: d.h }, list: l, dx: l ? l.x - d.x : null, dy: l ? l.y - (d.y + d.h) : null, windowZ: await P(() => window.__fx.winZ()),
        shot: i === 0 && l ? await shot(`${tag}-dd`, { x: Math.min(d.x, l.x) - 10, y: Math.min(d.y, l.y) - 10, width: Math.max(d.x + d.w, l.x + l.w) - Math.min(d.x, l.x) + 20, height: Math.max(d.y + d.h, l.y + l.h) - Math.min(d.y, l.y) + 20 }) : null });
      // close the list with a click on the dropdown again (Escape could reach Kendo's window and close it)
      if (l) { await page.locator(`[data-fx="${d.stamp}"]`).click({ timeout: 3000 }).catch(() => {}); await wait(300); }
      if (!(await nWin())) break;
    }
    return res;
  };

  const markCreates = () => P(() => [...document.querySelectorAll('[data-kit-action=create]')].filter((e) => e.getClientRects().length && !e.closest('.k-window')).slice(0, 2)
    .map((e, i) => (e.setAttribute('data-fx-create', String(i)), (e.value || e.textContent || '').replace(/\s+/g, ' ').trim())));
  const search = async () => {
    const st = await P(() => { const b = [...document.querySelectorAll('[data-kit-action=search]')].find((e) => e.getClientRects().length); return b ? window.__fx.stamp(b) : null; });
    if (!st) return false;
    await page.locator(`[data-fx="${st}"]`).click({ timeout: 3000 });
    await s.settle(300, 8000).catch(() => {});
    await wait(800);
    return true;
  };

  await ready();

  // F3 on the page at rest (now and 3 s later: a script may clear or fill the box after load), then driven like a user
  out.dates = await step('page dates', async () => {
    const atLoad = await P(() => window.__fx.dates('page'));
    if (!atLoad.length) return null;
    await wait(3000);
    const later = await P(() => window.__fx.dates('page'));
    const first = later.find((d) => d.enabled);
    let drive = null;
    if (first) {
      const st = first.stamp, state = () => P((x) => window.__fx.dateShows(x), st);
      drive = { id: first.id };
      await page.locator(`[data-fx="${st}"]`).click({ timeout: 3000 }).catch(() => {});
      await wait(400);
      drive.onFocus = await state();
      const pick = `:is(.k-picker, .k-datepicker, .k-datetimepicker, .k-timepicker):has([data-fx="${st}"])`;
      const cal = page.locator(`${pick} :is(button, .k-select):has(.k-svg-i-calendar, .k-i-calendar)`).first();
      await ((await cal.count()) ? cal : page.locator(`${pick} :is(.k-input-button, .k-select)`).last()).click({ timeout: 3000 }).catch(() => {});
      await wait(600);
      drive.calendarOpen = await state();
      if (await P(() => window.__fx.pickToday())) { await wait(600); drive.afterPick = await state(); }
      await page.keyboard.press('Tab').catch(() => {});
      await wait(400);
      drive.afterBlur = await state();
      await P((x) => window.__fx.restoreDate(x), st);
    }
    return { atLoad: atLoad.map(({ stamp, ...d }) => d), after3s: later.map(({ stamp, ...d }) => d), drive };
  });

  // each viewport: F4 (scroll), F1/F6 (Create New, a row's dialog); at the capture's own size F2/F5 (sort, filter)
  for (const vp of viewports) {
    const tag = `${vp.width}x${vp.height}`, isPrimary = vp.width === primary.width && vp.height === primary.height;
    const res = { viewport: vp, creates: [] };
    out.viewports.push(res);
    await step(`${tag} resize`, async () => { await page.setViewportSize(vp); await reload(); });

    // F4: scroll down 10 px at a time to the bottom, then back up in small steps; each change of the fixed parts recorded
    res.scroll = await step(`${tag} scroll`, async () => {
      const parts = await P(() => window.__fx.fixedParts());
      const stamps = parts.map((p) => p.stamp);
      const max = await P(() => window.__fx.scrollMax());
      const at = () => P((x) => window.__fx.partsAt(x), stamps);
      const changes = [];
      let lastKey = '';
      const note = async (dir) => { const a = await at(); const k = JSON.stringify(a.parts.map((p) => p && [p.top, p.cls])); if (k !== lastKey) { changes.push({ dir, ...a }); lastKey = k; } };
      await note('rest');
      for (let y = 10; y < max + 10; y += 10) { await P((v) => window.scrollTo(0, v), Math.min(y, max)); await wait(60); await note('down'); }
      for (const d of [1, 2, 5, 10, 20, 40]) { await P((v) => window.scrollBy(0, -v), d); await wait(250); await note(`up ${d}`); }
      await P(() => window.scrollTo(0, 0)); await wait(400);
      // a real wheel too (what a user does)
      await page.mouse.move(vp.width / 2, vp.height / 2);
      const wheel = [];
      for (const dy of [100, 100, 100, 100, -30, -30]) { await page.mouse.wheel(0, dy); await wait(450); wheel.push({ dy, ...(await at()) }); }
      const shots = [];
      for (const y of [0, 100, 200, max]) { await P((v) => window.scrollTo(0, v), y); await wait(450); shots.push(await shot(`${tag}-scroll-${y}`)); }
      await P((v) => window.scrollBy(0, -v), 30); await wait(450); shots.push(await shot(`${tag}-scroll-${max}-up30`));
      await P(() => window.scrollTo(0, 0));
      return { parts, max, changes, wheel, shots };
    });

    // F1 + F6: each Create New, first with POSTs blocked (what the capture's other-size pass did), then as a user would
    const creates = (await step(`${tag} creates`, async () => { await reload(); return markCreates(); })) || [];
    for (const [i, label] of creates.entries()) {
      const c = { opener: label };
      res.creates.push(c);
      c.postsBlocked = await step(`${tag} create ${i + 1} blocked`, async () => {
        await reload(); await markCreates();
        const r = await openAndWatch(() => page.locator(`[data-fx-create="${i}"]`).click({ timeout: 3000 }), `${tag}-create${i + 1}-blocked`, { blockPosts: true });
        await closeAll();
        return { opened: r.opened, blocked: r.blocked, requests: r.requests, loadingStillShown: (r.samples?.at(-1)?.loading?.length ?? 0) > 0, shot: r.shot };
      });
      c.open = await step(`${tag} create ${i + 1}`, async () => {
        await reload(); await markCreates();
        const r = await openAndWatch(() => page.locator(`[data-fx-create="${i}"]`).click({ timeout: 3000 }), `${tag}-create${i + 1}`);
        if (r.opened) {
          r.dates = await P(() => window.__fx.dates('dialog')).then((l) => l.map(({ stamp, ...d }) => d)).catch(() => null);
          r.dropdowns = await step(`${tag} create ${i + 1} dropdowns`, () => dialogDropdowns(`${tag}-create${i + 1}`));
        }
        await closeAll();
        return r;
      });
    }

    // a row's dialog (double-click, the portal's convention), and at the primary size the sort and the filter
    res.searched = await step(`${tag} search`, async () => { await reload(); return search(); });
    if (!res.searched) continue;
    res.row = await step(`${tag} row`, async () => {
      const td = page.locator('.k-grid tbody tr:not(.k-grid-norecords) td').first();
      if (!(await td.count())) return null;
      await td.scrollIntoViewIfNeeded({ timeout: 4000 }).catch(() => {});
      const r = await openAndWatch(() => td.dblclick({ timeout: 4000 }), `${tag}-row`);
      if (r.opened) r.dropdowns = await step(`${tag} row dropdowns`, () => dialogDropdowns(`${tag}-row`));
      await closeAll();
      return r;
    });
    if (!isPrimary) continue;
    // F2: the first two sortable columns, clicked three times each (a sort only reads: the same search, ordered)
    out.sort = await step('sort', async () => {
      await reload(); await search();
      const g = await P(() => window.__fx.sortables());
      if (!g) return null;
      const res2 = { columns: g.cols.map((c) => ({ title: c.title, sortable: c.sortable })), unsorted: await P((x) => window.__fx.headState(x), g.grid), runs: [] };
      const hb = await P((x) => window.__fx.headerBox(x), g.grid);
      res2.shotUnsorted = hb ? await shot('sort-0', { x: hb.x, y: hb.y - 4, width: hb.w, height: hb.h + 8 }) : null;
      for (const [ci, c] of g.cols.filter((x) => x.sortable).slice(0, 2).entries()) {
        const run = { column: c.title, clicks: [] };
        for (let k = 1; k <= 3; k++) {
          const ev0 = s.guard.events.length, t0 = Date.now();
          const th = page.locator(`[data-fx="${c.stamp}"]`), link = th.locator('.k-link, .k-column-title').first();
          await ((await link.count()) ? link : th).click({ timeout: 3000 }).catch(() => {});
          await s.settle(300, 8000).catch(() => {});
          await wait(500);
          const hb2 = await P((x) => window.__fx.headerBox(x), g.grid);
          run.clicks.push({ click: k, ms: Date.now() - t0, requests: reqs(ev0), head: await P((x) => window.__fx.headState(x), g.grid),
            shot: ci === 0 && hb2 ? await shot(`sort-click${k}`, { x: hb2.x, y: hb2.y - 4, width: hb2.w, height: hb2.h + 8 }) : null });
        }
        res2.runs.push(run);
      }
      return res2;
    });
    // F5: the filter popup and its operator dropdown's list (nothing is filtered: the popup is closed without Filter)
    out.filter = await step('filter', async () => {
      await reload(); await search();
      const f = await P(() => window.__fx.filterIcon());
      if (!f) return null;
      await page.locator(`[data-fx="${f.stamp}"]`).click({ timeout: 3000 }).catch(() => {});
      await wait(700);
      const pop = await P(() => window.__fx.filterPopup());
      if (!pop) return { icon: f, popup: null };
      const r = { icon: f, popup: pop, shotClosed: await shot('filter-popup', { x: Math.min(f.x, pop.x) - 10, y: Math.min(f.y, pop.y) - 10, width: Math.max(f.x + f.w, pop.x + pop.w) - Math.min(f.x, pop.x) + 20, height: pop.y + pop.h - Math.min(f.y, pop.y) + 20 }) };
      if (pop.dropdown) {
        await page.locator(`[data-fx="${pop.dropdown.stamp}"]`).click({ timeout: 3000 }).catch(() => {});
        await wait(600);
        const l = await P(() => window.__fx.openList());
        r.list = l;
        if (l) {
          r.listVsDropdown = { dx: l.x - pop.dropdown.x, dy: l.y - (pop.dropdown.y + pop.dropdown.h), dw: l.w - pop.dropdown.w };
          r.coversInput = !!pop.input && l.y < pop.input.y + pop.input.h && l.y + l.h > pop.input.y;
          r.listInsidePopup = l.y + l.h <= pop.y + pop.h;
          const x = Math.min(f.x, pop.x, l.x) - 10, y = Math.min(f.y, pop.y) - 10;
          r.shot = await shot('filter-operator-open', { x, y, width: Math.max(pop.x + pop.w, l.x + l.w) - x + 10, height: Math.max(pop.y + pop.h, l.y + l.h) - y + 10 });
          await page.locator(`[data-fx="${pop.dropdown.stamp}"]`).click({ timeout: 3000 }).catch(() => {});
          await wait(300);
        }
      }
      await page.keyboard.press('Escape').catch(() => {});
      return r;
    });
  }
  await page.setViewportSize(primary).catch(() => {});
  const v = out.viewports.map((x) => `${x.viewport.width}x${x.viewport.height}: create ${x.creates.map((c) => (c.open?.opened ? 'open' : 'NOT open') + (c.postsBlocked ? (c.postsBlocked.opened ? '/blocked open' : '/blocked NOT open') : '')).join(',') || '-'}, row ${x.row?.opened ? 'open' : '-'}`).join('; ');
  log(`   ${v}${out.sort ? ', sort' : ''}${out.filter ? ', filter' : ''}${out.dates ? ', dates' : ''}`);
  return out;
}

// ---------- every page -> the answers ----------
export function summarize(pages) {
  const ok = pages.filter((p) => p.probe);
  const L = ['# Follow-up probe: the fixes\n', `${ok.length} page(s). Pictures in shots/, raw data (every frame of each dialog opening) in pages/*.json.\n`];
  const box = (b) => (b ? `${b.x},${b.y} ${b.w}x${b.h}` : '-');
  const answers = {};
  for (const p of ok) {
    const r = p.probe, a = (answers[p.label] = {});
    L.push(`\n## ${p.label}\n`);
    for (const v of r.viewports) {
      const tag = `${v.viewport.width}x${v.viewport.height}`;
      const dlg = (label, o) => {
        if (!o) return;
        a[`F1 ${tag} ${label}`] = { opened: o.opened, final: o.final && box(o.final), firstSeen: o.firstSeen && { t: o.firstSeen.t, box: box(o.firstSeen.box) }, settledAt: o.settledAt };
        L.push(`- **F1 ${tag}** ${label}: ${o.opened ? `final ${box(o.final)}, first seen ${box(o.firstSeen?.box)} at ${o.firstSeen?.t} ms, at its final box at ${o.settledAt} ms; isPhone ${o.final.viewport.isPhone}, css width ${o.final.css.width} min ${o.final.css.minWidth}, rules ${o.final.rules.map((x) => x.selector).join(' | ') || '-'}; requests ${o.requests.map((q) => `${q.method} ${q.url}`).join(', ') || '-'}` : `did not open (requests ${o.requests?.map((q) => `${q.method} ${q.url}`).join(', ') || '-'})`}`);
        for (const d of o.dropdowns || []) L.push(`  - F6 dropdown "${d.label}": ${d.list ? `list ${box(d.list)}, ${d.list.items} items, dx ${d.dx} dy ${d.dy}, z ${d.list.z} vs window ${d.windowZ}, ${d.list.parent}` : 'no list opened'}`);
        for (const d of o.dates || []) L.push(`  - F3 dialog date ${d.id}: shows "${d.shows}", value() ${d.widgetValue}`);
      };
      for (const c of v.creates) {
        dlg(`Create New "${c.opener}"`, c.open);
        if (c.postsBlocked) L.push(`  - with POSTs blocked: ${c.postsBlocked.opened ? 'opened' : `did NOT open; blocked ${c.postsBlocked.blocked.join(', ') || 'nothing'}${c.postsBlocked.loadingStillShown ? '; the loading box was still up' : ''}`}`);
      }
      dlg('row double-click', v.row);
      if (v.scroll) {
        const flips = v.scroll.changes.filter((c) => c.dir !== 'rest').map((c) => `${c.dir}@${c.y}: ${c.parts.map((q) => q && `${q.top}${q.cls ? ` [${q.cls}]` : ''}`).join(' / ')}`);
        a[`F4 ${tag}`] = { parts: v.scroll.parts.map((q) => q.sel), max: v.scroll.max, changes: flips };
        L.push(`- **F4 ${tag}** parts ${v.scroll.parts.map((q) => `${q.sel} (${q.position})`).join(', ')}; max scroll ${v.scroll.max}; changes: ${flips.slice(0, 14).join('; ') || 'none'}`);
      }
    }
    if (r.dates) {
      for (const d of r.dates.after3s) L.push(`- **F3** ${d.id} (${d.role}): shows "${d.shows}" (at load "${r.dates.atLoad.find((x) => x.id === d.id)?.shows}"), value() ${d.widgetValue}, options.value ${d.optionValue}, value attribute ${d.valueAttr}`);
      const dr = r.dates.drive;
      if (dr) L.push(`  - ${dr.id} driven: focus "${dr.onFocus?.shows}", calendar open "${dr.calendarOpen?.shows}", picked "${dr.afterPick?.shows ?? '-'}", blur "${dr.afterBlur?.shows}"`);
      a.F3 = r.dates.after3s.map((d) => ({ id: d.id, shows: d.shows, value: d.widgetValue }));
    }
    if (r.sort) {
      a.F2 = r.sort.runs.map((x) => ({ column: x.column, unsorted: r.sort.unsorted.find((h) => h.title === x.column)?.icons.map((i) => `${i.cls} ${i.color}`), clicks: x.clicks.map((c) => c.head.find((h) => h.title === x.column)?.icons.map((i) => `${i.cls} ${i.color}`)) }));
      for (const run of r.sort.runs) {
        const un = r.sort.unsorted.find((h) => h.title === run.column);
        L.push(`- **F2** "${run.column}": unsorted ${un?.icons.map((i) => `${i.cls} (${i.color})`).join(' + ') || '-'}`);
        for (const c of run.clicks) {
          const h = c.head.find((x) => x.title === run.column), other = c.head.find((x) => x.title && x.title !== run.column && x.icons.length);
          L.push(`  - click ${c.click}: aria-sort ${h?.ariaSort}, ${h?.icons.map((i) => `${i.cls} (${i.color})`).join(' + ') || 'no icon'}; another column then: ${other?.icons.map((i) => i.cls).join(' + ') || '-'}; ${c.requests.length} request(s), ${c.ms} ms`);
        }
      }
    }
    if (r.filter) {
      a.F5 = { list: r.filter.list && box(r.filter.list), ...r.filter.listVsDropdown, coversInput: r.filter.coversInput, insidePopup: r.filter.listInsidePopup };
      L.push(`- **F5** filter popup ${box(r.filter.popup)}; operator list ${r.filter.list ? `${box(r.filter.list)}, dx ${r.filter.listVsDropdown.dx} dy ${r.filter.listVsDropdown.dy} dw ${r.filter.listVsDropdown.dw}, covers the value box ${r.filter.coversInput}, inside the popup ${r.filter.listInsidePopup}, ${r.filter.list.parent}, z ${r.filter.list.z} vs popup ${r.filter.popup.z}` : 'did not open'}`);
    }
    if (r.errors.length) L.push(`- errors: ${r.errors.join(' | ')}`);
    if (r.skipped.length) L.push(`- skipped (time): ${r.skipped.join(', ')}`);
  }
  return { answers, markdown: L.join('\n') + '\n' };
}
