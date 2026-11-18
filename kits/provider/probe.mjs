// The Provider kit's probe: one live menu page in, the answers to the open questions about this portal family out
// (scripts/probe.mjs logs in, walks the menu and calls probePage for each page, then summarize for all of them).
// Read-only by design: Save is clicked only with every POST blocked (to see the client-side validation), Delete/Update
// never, a dirty dialog is always discarded, and no grid value leaves the page (counts and markup shapes only).
//
// The questions (Q-ids are the keys of answers.json):
//  Q1  modal position: where does a dialog land (centered, touching the left edge, wider than the viewport), at each viewport, and what CSS sets its width
//  Q2  dates: prefilled at rest (and how far from today) or empty; what the input shows on focus, on the calendar button, after a day is picked
//  Q3  things inside a dialog that can be clicked (radios, checkboxes, dropdowns, chevrons, a Create New): what each shows or hides
//  Q4  Search with nothing typed: rows, an empty grid, or validation; what it reveals; the "no records" markup
//  Q5  validation on the page (Search without required criteria): summary markup, icon, per-field messages, the close X
//  Q6  chevrons/collapsible panels: icon swap, animation (height over time), does a panel close itself when the grid shows
//  Q7  conditional parts on the page: which radio/checkbox/dropdown value shows which fields (Run Schedule and the like)
//  Q8  the same inside dialogs (answered together with Q3)
//  Q9  validation inside a dialog on Save with nothing filled (POST blocked: was a request attempted at all?)
//  Q10 closing a dialog: with an edit (X, Cancel) and without one: an "unsaved changes" confirm or not, its text and buttons
//  Q11 grid filter icon: the popup it opens (fields, buttons, position), and any chevron/expander inside it
//  Q12 vocabulary: button texts the kit does not map to an action, Kendo widget roles it does not rebuild yet
import fs from 'node:fs';
import path from 'node:path';

const HARVEST = fs.readFileSync(new URL('./harvest.js', import.meta.url), 'utf8');

// ---------- in-page helpers (window.__probe), next to the harvest's window.__kit ----------
function inpage() {
  if (window.__probe) return;
  const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
  const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  const widgetOf = (el) => { try { return (el && window.kendo?.widgetInstance?.(window.jQuery(el))) || null; } catch { return null; } };
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const cut = (s, n = 6000) => (s && s.length > n ? s.slice(0, n) + '…' : s);
  let n = 0;
  const stamp = (el) => el.getAttribute('data-probe') || (el.setAttribute('data-probe', 'p' + ++n), el.getAttribute('data-probe'));
  const wins = () => [...document.querySelectorAll('.k-window')].filter(shown);
  const topWin = () => wins().sort((a, b) => (+getComputedStyle(a).zIndex || 0) - (+getComputedStyle(b).zIndex || 0)).pop() || null;
  const root = (where) => (where === 'dialog' ? topWin()?.querySelector('.k-window-content') || topWin() : document.querySelector('#pageBody > main, main') || document.body);
  // not a part of the form: widgets' insides, the shell, popups; a dialog's content when looking at the page
  const outside = (el) => el.closest('.k-grid, .k-pager, .k-menu, #pageHeader, [data-kit-menu], .k-animation-container, [data-kit-skip]') || (!topWin()?.contains(el) && el.closest('.k-window'));
  const labelOf = (el) => {
    const col = el.closest('.editor-col, .form-group, label');
    const l = (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) || col?.querySelector('.editor-label label, label') || (col?.tagName === 'LABEL' ? col : null);
    return clean(l?.textContent || el.getAttribute('aria-label') || el.getAttribute('title') || el.name || '').slice(0, 80);
  };
  const iconsIn = (el) => [...el.querySelectorAll('i, span[class*="fa-"], span.k-icon, span.k-svg-icon')].map((i) => (typeof i.className === 'string' ? i.className : i.getAttribute('class') || '')).filter(Boolean).slice(0, 6);
  // the stylesheet rules that size or place an element (the window's width class: overlay-lg, panelForm-col-6, ...)
  const rulesFor = (el) => {
    const out = [];
    const visit = (rules, media) => {
      for (const r of rules) {
        if (out.length >= 15) return;
        if (r.cssRules && r.media) { if (matchMedia(r.media.mediaText).matches) visit(r.cssRules, r.media.mediaText); continue; }
        if (!r.selectorText || !r.style) continue;
        const s = r.style, pick = {};
        for (const p of ['width', 'min-width', 'max-width', 'left', 'top', 'margin-left', 'transform']) if (s.getPropertyValue(p)) pick[p] = s.getPropertyValue(p);
        if (!Object.keys(pick).length) continue;
        try { if (!el.matches(r.selectorText)) continue; } catch { continue; }
        out.push({ selector: r.selectorText.slice(0, 160), ...pick, ...(media ? { media } : {}) });
      }
    };
    for (const sh of document.styleSheets) { try { visit(sh.cssRules, null); } catch {} }
    return out;
  };

  window.__probe = {
    wins: () => wins().length,
    stamp: (sel) => { const el = [...document.querySelectorAll(sel)].find(shown); return el ? stamp(el) : null; },
    // Q1: where the top window sits and why
    position() {
      const w = topWin();
      if (!w) return null;
      const r = box(w), docW = document.documentElement.clientWidth, cs = getComputedStyle(w);
      const content = w.querySelector('.k-window-content');
      const kw = widgetOf(content);
      // Kendo's center() uses the window's width (scrollbar included); a CSS rebuild centers in the page width (without it)
      return { viewport: { w: innerWidth, h: innerHeight, docW }, rect: r, leftGap: r.x, rightGap: docW - r.x - r.w, centeredLeft: Math.round((innerWidth - r.w) / 2),
        centered: Math.abs(r.x - (innerWidth - r.w) / 2) <= 2 || Math.abs(r.x - (docW - r.w) / 2) <= 2,
        touchesLeft: r.x <= 1, widerThanViewport: r.w > docW, overflowRight: r.x + r.w > docW + 1, style: w.getAttribute('style'), className: w.className,
        // height: the portal caps a window at 85% of the viewport; does the content scroll inside it, does the window fit on screen
        fitsViewport: r.y >= 0 && r.y + r.h <= innerHeight + 1, heightPct: Math.round((r.h / innerHeight) * 100), contentScrolls: !!content && content.scrollHeight > content.clientHeight + 1,
        contentH: content ? { scroll: content.scrollHeight, client: content.clientHeight, overflowY: getComputedStyle(content).overflowY } : null, isPhone: (() => { try { return typeof isPhone === 'function' ? !!isPhone() : null; } catch { return null; } })(),
        computed: { width: cs.width, minWidth: cs.minWidth, maxWidth: cs.maxWidth, maxHeight: cs.maxHeight, position: cs.position, transform: cs.transform },
        kendo: kw ? { position: kw.options.position, width: kw.options.width ?? null, minWidth: kw.options.minWidth ?? null, maxWidth: kw.options.maxWidth ?? null } : null,
        rules: rulesFor(w), contentRules: content ? rulesFor(content) : [], title: clean(w.querySelector('.k-window-title')?.textContent) };
    },
    // Q12 + the inventory of what a page / dialog holds
    census(where) {
      const R = root(where);
      if (!R) return null;
      const roles = {};
      for (const el of R.querySelectorAll('[data-role]')) { const k = el.getAttribute('data-role').toLowerCase(); roles[k] = (roles[k] || 0) + 1; }
      const buttons = [...R.querySelectorAll('button, input[type=button], input[type=submit], a.k-button, a.btn')]
        .filter((b) => shown(b) && (b.closest('.k-grid-toolbar') || !b.closest('.k-grid, .k-pager, [data-kit]')))
        .map((b) => ({ text: clean(b.value || b.textContent || b.getAttribute('title')).slice(0, 50), action: b.getAttribute('data-kit-action') || null })).filter((b) => b.text);
      const radios = {};
      for (const r of R.querySelectorAll('input[type=radio]')) if (!outside(r)) (radios[r.name] ||= []).push(clean(r.closest('label')?.textContent || r.value));
      return { roles, buttons, radios, checkboxes: [...R.querySelectorAll('input[type=checkbox]')].filter((c) => !outside(c) && (shown(c) || shown(c.closest('label')))).length,
        required: R.querySelectorAll('[data-val-required], .editor-req-field').length, hiddenAtRest: R.querySelectorAll('[data-kit-h]').length,
        tabs: [...R.querySelectorAll('.k-tabstrip-items > li, [role=tab]')].map((t) => clean(t.textContent).slice(0, 40)),
        collapsibles: R.querySelectorAll('[data-kit-action=collapse]').length };
    },
    // Q2: the date inputs at rest
    dates(where) {
      const R = root(where);
      if (!R) return [];
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return [...R.querySelectorAll('input[data-role=datepicker], input[data-role=datetimepicker], input[data-role=timepicker], input[data-role=dateinput]')].filter((i) => !outside(i)).slice(0, 8).map((i) => {
        const w = widgetOf(i), v = w?.value?.();
        const d = v instanceof Date ? new Date(v) : null;
        if (d) d.setHours(0, 0, 0, 0);
        return { stamp: stamp(i), role: i.getAttribute('data-role'), id: i.id || null, name: i.name || null, label: labelOf(i), valueAttr: i.getAttribute('value'), shows: i.value,
          prefilled: !!i.value, offsetDays: d ? Math.round((d - today) / 864e5) : null, format: w?.options?.format || null, placeholder: i.getAttribute('placeholder'),
          masked: !!(i.getAttribute('data-mask') || i.closest('[class*=mask]') || /_/.test(i.getAttribute('placeholder') || '')), required: !!i.getAttribute('data-val-required'),
          enabled: !i.disabled && !i.readOnly && !i.closest('.k-disabled') && shown(i.closest('.k-picker, .k-datepicker, .k-datetimepicker, .k-timepicker') || i) };
      });
    },
    dateState(st) {
      const i = document.querySelector(`[data-probe="${st}"]`);
      const cal = [...document.querySelectorAll('.k-animation-container, .k-popup, .k-calendar-container, .k-datetime-container')].find((c) => shown(c) && c.querySelector('.k-calendar, .k-time-list, .k-timeselector'));
      return { shows: i?.value ?? null, popup: cal ? box(cal) : null, input: i ? box(i.closest('.k-picker, .k-datepicker, .k-datetimepicker') || i) : null };
    },
    // a day to pick in the open calendar: today, else the first day of this month
    dayCell() {
      const cal = [...document.querySelectorAll('.k-calendar')].find(shown);
      const td = cal && (cal.querySelector('td.k-today:not(.k-disabled)') || [...cal.querySelectorAll('td[role=gridcell]:not(.k-other-month):not(.k-disabled)')][0]);
      return td ? stamp(td.querySelector('.k-link') || td) : null;
    },
    restoreDate(st, shows) {
      const i = document.querySelector(`[data-probe="${st}"]`), w = widgetOf(i);
      try { w?.close?.(); } catch {}
      try { if (w) w.value(shows || null); } catch {}
      if (i) i.value = shows ?? '';
    },
    // Q3/Q7/Q8: what can change what is shown: radio groups, checkboxes, dropdowns (not cascade children)
    triggers(where) {
      const R = root(where);
      if (!R) return { radios: [], checkboxes: [], dropdowns: [] };
      const groups = {};
      for (const r of R.querySelectorAll('input[type=radio]')) if (!outside(r) && r.name && !r.disabled) (groups[r.name] ||= []).push(r);
      const radios = Object.entries(groups).slice(0, 6).map(([name, rs]) => ({ name, label: clean(rs[0].closest('.editor-col')?.querySelector('.editor-label')?.textContent) || name,
        options: rs.slice(0, 5).map((r) => ({ stamp: stamp(r), value: r.value, label: clean(r.closest('label')?.textContent || (r.id && document.querySelector(`label[for="${CSS.escape(r.id)}"]`)?.textContent) || r.value).slice(0, 60), checked: r.checked })) }));
      const checkboxes = [...R.querySelectorAll('input[type=checkbox]')].filter((c) => !outside(c) && !c.disabled && (shown(c) || shown(c.closest('label')))).slice(0, 8)
        .map((c) => ({ stamp: stamp(c), name: c.name || c.id || null, label: clean(c.closest('label')?.textContent) || labelOf(c), checked: c.checked }));
      const dropdowns = [...R.querySelectorAll('input[data-role=dropdownlist], select[data-role=dropdownlist]')].filter((i) => !outside(i)).map((i) => [i, widgetOf(i)])
        .filter(([, w]) => w && !w.options.cascadeFrom && !w.wrapper.hasClass('k-disabled')).slice(0, 6).map(([i, w]) => {
          let items = [];
          try { items = w.dataSource.data().toJSON().slice(0, 6); } catch {}
          const tf = w.options.dataTextField, vf = w.options.dataValueField;
          return { stamp: stamp(i), name: i.name || i.id, label: labelOf(i), value: String(w.value() ?? ''),
            items: items.map((d) => (typeof d === 'object' ? { text: String(d[tf || 'text'] ?? d.Text ?? ''), value: String(d[vf || 'value'] ?? d.Value ?? d[tf] ?? '') } : { text: String(d), value: String(d) })) };
        });
      return { radios, checkboxes, dropdowns };
    },
    click(st) { const el = document.querySelector(`[data-probe="${st}"]`); if (!el) return false; el.click(); return true; },
    pickDropdown(st, value) {
      const w = widgetOf(document.querySelector(`[data-probe="${st}"]`));
      if (!w) return false;
      w.value(value);
      w.trigger('change');
      return true;
    },
    // the dropdowns of a page/dialog: enabled and how many options, to see cascades fire
    dropdownState(where) {
      const R = root(where);
      return Object.fromEntries([...(R?.querySelectorAll('input[data-role=dropdownlist], select[data-role=dropdownlist]') || [])].map((i) => [i.name || i.id, (() => {
        const w = widgetOf(i);
        let c = 0;
        try { c = w.dataSource.data().length; } catch {}
        return { enabled: !!w && !w.wrapper.hasClass('k-disabled'), options: c };
      })()]));
    },
    // the labels inside the parts a click showed or hid (what the user sees appear)
    labelsIn(sels) {
      const R = window.__kit.marksRoot();
      return sels.slice(0, 8).map((s) => {
        const el = R.querySelector(s);
        if (!el) return { sel: s, labels: [] };
        return { sel: s, labels: [...el.querySelectorAll('.editor-label label, label, .content-panel-hdr, h3, h4')].map((l) => clean(l.textContent).slice(0, 60)).filter(Boolean).slice(0, 10),
          required: el.querySelectorAll('[data-val-required], .editor-req-field').length, text: clean(el.textContent).slice(0, 120) };
      });
    },
    // Q6: chevrons, square +/-, angles that open and close a part
    // the panel a toggle icon belongs to: its container's header and body. The icon sits in a "*-hdr-tools" div INSIDE the header,
    // so a plain closest('[class*=hdr]') finds the tools div (no body after it): go by the container (the first run measured 0 ms for this)
    panelOf(el) {
      const box = el.closest('[class*=panel-container]');
      let hdr = box?.querySelector(':scope > [class*=-hdr]:not([class*=hdr-tools])') || null, body = box?.querySelector(':scope > [class*=-bdy]') || null;
      if (!hdr || !body) { // no container: the header around the icon, the part after it
        hdr = el.closest('[class*=hdr]:not([class*=hdr-tools]), [class*=header], .panel-heading') || el.closest('[class*=hdr]');
        body = hdr?.nextElementSibling || hdr?.parentElement?.querySelector(':scope > [class*=bdy], :scope > [class*=body]') || null;
      }
      return { box, hdr, body };
    },
    toggles(where) {
      const R = root(where);
      if (!R) return [];
      const seen = new Set(), out = [];
      for (const ic of R.querySelectorAll('[data-kit-action=collapse], .fa-chevron-up, .fa-chevron-down, .fa-square-minus, .fa-square-plus, .fa-angle-up, .fa-angle-down, .k-i-arrow-chevron-up, .k-i-arrow-chevron-down')) {
        if (outside(ic) || !shown(ic)) continue;
        const { hdr, body } = this.panelOf(ic);
        if (!hdr || seen.has(hdr) || hdr.closest('.k-grid')) continue;
        seen.add(hdr);
        const i = ic.matches('i, span') ? ic : ic.querySelector('i, span') || ic;
        out.push({ stamp: stamp(i), header: clean(hdr.textContent).slice(0, 60), icon: i.className, title: i.getAttribute('title') || i.closest('[title]')?.getAttribute('title') || null, hasBody: !!body });
        if (out.length >= 4) break;
      }
      return out;
    },
    // click a toggle and follow the part under its header: height every frame for `ms`, the icon after, the toggle to click back
    async toggle(st, ms = 1200) {
      const el = document.querySelector(`[data-probe="${st}"]`);
      if (!el) return null;
      const { hdr, body } = this.panelOf(el);
      const before = { icon: el.className, visible: shown(body), h: body ? Math.round(body.getBoundingClientRect().height) : null };
      const samples = [];
      const t0 = performance.now();
      el.click();
      await new Promise((done) => {
        const tick = () => {
          const t = Math.round(performance.now() - t0), h = body ? Math.round(body.getBoundingClientRect().height) : null;
          if (!samples.length || samples[samples.length - 1].h !== h) samples.push({ t, h });
          if (t < ms) requestAnimationFrame(tick); else done();
        };
        requestAnimationFrame(tick);
      });
      const moving = samples.filter((s, k) => k && s.h !== samples[k - 1].h);
      // the toggle to click back: the same icon, or its twin in the same header (Show/Hide anchors swap)
      const back = [...(hdr?.querySelectorAll('i, span[class*=fa-]') || [])].find((i) => shown(i) && /chevron|square-(plus|minus)|angle|arrow/.test(i.className)) || el;
      return { before, after: { icon: back.className, visible: shown(body), h: body ? Math.round(body.getBoundingClientRect().height) : null, title: back.getAttribute('title') || back.closest('[title]')?.getAttribute('title') || null },
        durationMs: moving.length ? moving[moving.length - 1].t : 0, frames: samples.length, samples: samples.slice(0, 40), cssTransition: body ? getComputedStyle(body).transition : null, back: stamp(back), bodyClass: body?.className || null };
    },
    collapseState() {
      return [...document.querySelectorAll('[data-kit-collapse]')].map((b) => ({ header: clean(b.previousElementSibling?.textContent).slice(0, 60), visible: shown(b), h: Math.round(b.getBoundingClientRect().height) }));
    },
    // the page at this viewport: which layout the portal's own breakpoints give, where the shell parts sit, any page scrollbar
    layout() {
      const r = (sel) => { const e = [...document.querySelectorAll(sel)].find(shown); return e ? box(e) : null; };
      let phone = null;
      try { phone = typeof isPhone === 'function' ? !!isPhone() : null; } catch {}
      const burgers = [...document.querySelectorAll('i.fa-bars, [class*=hamburger], [id*=BannerMenu] i, [id*=BannerMenu] button, .mobile-nav')].map((e) => ({ tag: e.tagName.toLowerCase(), cls: String(e.className).slice(0, 60), id: e.id || e.parentElement?.id || null, shown: shown(e), rect: shown(e) ? box(e) : null }));
      const nav = [...document.querySelectorAll('#pageHeader a, #pageHeader button, header a')].filter(shown).map((a) => clean(a.textContent)).filter(Boolean);
      const cs = (e) => (e ? getComputedStyle(e) : null);
      const main = document.querySelector('#pageBody > main, main');
      return { inner: { w: innerWidth, h: innerHeight, docW: document.documentElement.clientWidth, dpr: devicePixelRatio },
        breakpoints: { max1280: matchMedia('(max-width: 1280px)').matches, max768: matchMedia('(max-width: 768px)').matches, portrait: matchMedia('(orientation: portrait)').matches, isPhone: phone },
        header: r('#pageHeader, header'), titleBar: r('h1') && { ...r('h1'), text: clean([...document.querySelectorAll('h1')].find(shown)?.textContent).slice(0, 60) }, moduleTab: r('#activeModuleMenuNav, #activeModuleMenu'),
        main: main && shown(main) ? box(main) : null, footer: r('footer, #pageFooter'), burgers, navLinks: nav,
        page: { scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, horizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1, htmlOverflow: cs(document.documentElement).overflow, bodyOverflow: cs(document.body).overflow } };
    },
    // the side menu's modules (the vertical Kendo menu with the most items) and the module tab's (a horizontal one)
    menus() {
      const li = (ul) => [...ul.children].filter((x) => x.tagName === 'LI' && shown(x) && x.getAttribute('aria-haspopup') === 'true' || x.matches('[data-groupparent]'))
        .filter((x) => shown(x)).map((x) => ({ stamp: stamp(x), text: clean(x.querySelector(':scope > .k-link, :scope > a, :scope > span')?.textContent || x.textContent.slice(0, 40)).slice(0, 50) }));
      const uls = [...document.querySelectorAll('ul[data-role=menu]')].filter(shown).map((u) => ({ ul: u, vertical: u.getAttribute('aria-orientation') === 'vertical' || u.classList.contains('k-menu-vertical'), items: li(u) })).filter((m) => m.items.length);
      const side = uls.filter((m) => m.vertical).sort((a, b) => b.items.length - a.items.length)[0], bar = uls.filter((m) => !m.vertical)[0];
      return { side: side && { items: side.items, rect: box(side.ul) }, bar: bar && { items: bar.items, rect: box(bar.ul) } };
    },
    // the submenu that is open now: does it scroll? (the portal's .k-menu-popup is overflow:auto + max-height:80vh; Kendo sets overflow:visible inline once it opens one)
    flyout() {
      const c = [...document.querySelectorAll('.k-animation-container')].find((e) => shown(e) && e.querySelector('.k-menu-popup'));
      if (!c) return null;
      const p = c.querySelector('.k-menu-popup'), cs = getComputedStyle(p), cc = getComputedStyle(c);
      const items = p.querySelectorAll('li').length;
      return { rect: box(c), popupRect: box(p), inlineStyle: p.getAttribute('style'), containerStyle: c.getAttribute('style'), overflow: cs.overflow, overflowY: cs.overflowY, maxHeight: cs.maxHeight, containerOverflow: cc.overflow,
        scrollbar: p.scrollHeight > p.clientHeight + 1 && cs.overflowY !== 'visible' && cs.overflowY !== 'hidden', scrollbarWidth: p.offsetWidth - p.clientWidth, scrollHeight: p.scrollHeight, clientHeight: p.clientHeight,
        cutOff: c.getBoundingClientRect().bottom > innerHeight + 1 || c.getBoundingClientRect().top < -1, items, scrollButtons: [...p.querySelectorAll('.k-menu-scroll-button')].filter(shown).length,
        fits: c.getBoundingClientRect().bottom <= innerHeight + 1 };
    },
    // Q5/Q9: what a failed validation looks like
    validation(where) {
      const R = root(where);
      if (!R) return null;
      const summary = [...R.querySelectorAll('.validation-summary, .editor-validation-summary, .validation-summary-errors, .k-messagebox-error, [role=alert]')].filter(shown)
        .filter((e, _, all) => !all.some((o) => o !== e && o.contains(e))).slice(0, 3)
        .map((e) => ({ className: e.className, text: clean(e.textContent).slice(0, 600), icons: iconsIn(e), rect: box(e), html: cut(e.outerHTML, 4000),
          close: (() => { const x = e.querySelector('.msg-inline-close, [data-hide=alert], .k-i-close, .fa-xmark'); return x ? stamp(x) : null; })() }));
      const fields = [...R.querySelectorAll('.field-validation-error, .k-invalid-msg, .k-tooltip-validation, .k-form-error, span[data-valmsg-for]')]
        .filter((e) => shown(e) && clean(e.textContent)).slice(0, 12).map((e) => {
          const name = e.getAttribute('data-valmsg-for') || e.getAttribute('data-for') || null;
          const input = name && R.querySelector(`[name="${CSS.escape(name)}"]`);
          const target = input && (input.closest('.k-picker, .k-input, .k-dropdownlist, .k-numerictextbox') || input);
          const a = target && target.getBoundingClientRect(), b = e.getBoundingClientRect();
          return { for: name, text: clean(e.textContent).slice(0, 200), className: e.className, icons: iconsIn(e),
            placement: !a ? null : b.top >= a.bottom - 2 ? 'below' : b.left >= a.right - 2 ? 'right' : b.bottom <= a.top + 2 ? 'above' : 'over', html: cut(e.outerHTML, 1200) };
        });
      const invalid = [...R.querySelectorAll('.k-invalid, .input-validation-error, [aria-invalid=true]')].slice(0, 12).map((e) => {
        const t = e.closest('.k-picker, .k-input, .k-dropdownlist, .k-numerictextbox, .k-textbox') || e;
        const cs = getComputedStyle(t);
        return { name: e.name || e.id || null, className: t.className, border: cs.borderColor, background: cs.backgroundColor };
      });
      return summary.length || fields.length || invalid.length ? { summary, fields, invalid } : null;
    },
    // Q10: the confirm a close produced (another window on top) and its buttons
    confirmInfo() {
      const w = topWin();
      if (!w) return null;
      const buttons = [...w.querySelectorAll('button, input[type=button], .k-button')].filter(shown).map((b) => ({ stamp: stamp(b), text: clean(b.value || b.textContent).slice(0, 40) })).filter((b) => b.text);
      return { title: clean(w.querySelector('.k-window-title, .k-dialog-title')?.textContent), text: clean(w.querySelector('.k-window-content, .k-dialog-content')?.textContent).slice(0, 400),
        className: w.className, rect: box(w), buttons, html: cut(w.outerHTML, 5000) };
    },
    closeButton(via) {
      const w = topWin();
      if (!w) return null;
      const el = via === 'cancel' ? [...w.querySelectorAll('[data-kit-action=cancel]')].find(shown)
        : [...w.querySelectorAll('.k-window-titlebar .k-window-titlebar-action, .k-window-titlebar .k-window-action, .k-window-titlebar a, .k-window-titlebar button')]
          .find((a) => shown(a) && (/close/i.test(a.getAttribute('aria-label') || a.getAttribute('title') || '') || a.querySelector('.k-i-custom-close, .k-i-close, .k-i-x, .k-svg-i-x')));
      return el ? stamp(el) : null;
    },
    // a text box in the top window a user could type into (to make the dialog dirty)
    editable() {
      const R = root('dialog');
      const i = R && [...R.querySelectorAll('input[type=text], input:not([type]), textarea')].find((x) => shown(x) && !x.disabled && !x.readOnly && !x.closest('.k-picker, .k-dropdownlist, .k-numerictextbox, .k-grid') && !/date|time|dropdown|numeric|combo/.test(x.getAttribute('data-role') || ''));
      return i ? { stamp: stamp(i), name: i.name || i.id } : null;
    },
    // Q11: the grid's filter / column-menu icon, and the popup it opens
    filterIcon() {
      const g = [...document.querySelectorAll('[data-role=grid]')].find((x) => shown(x) && !x.closest('.k-window'));
      if (!g) return null;
      const w = widgetOf(g);
      const ic = [...g.querySelectorAll('.k-grid-header .k-grid-filter-menu, .k-grid-header .k-grid-filter, .k-grid-header .k-grid-column-menu, .k-grid-header .k-header-column-menu')].find(shown);
      return { stamp: ic ? stamp(ic) : null, icon: ic ? box(ic) : null, iconHtml: ic ? cut(ic.outerHTML, 600) : null, column: ic ? clean(ic.closest('th')?.textContent).slice(0, 60) : null,
        filterable: (() => { try { return JSON.parse(JSON.stringify(w.options.filterable)); } catch { return null; } })(), columnMenu: !!w?.options?.columnMenu,
        filterableColumns: (w?.columns || []).filter((c) => c.filterable !== false && c.field).length };
    },
    filterPopup() {
      const p = [...document.querySelectorAll('.k-filter-menu, .k-column-menu, .k-grid-filter-popup, .k-popup .k-filter-menu-container')].find(shown);
      if (!p) return null;
      const c = p.closest('.k-animation-container') || p.closest('.k-popup') || p;
      const chevrons = [...c.querySelectorAll('.k-expander, [aria-expanded], .k-i-arrow-chevron-down, .k-svg-i-chevron-down, .k-i-arrow-s, .k-columnmenu-item')].filter(shown).slice(0, 4);
      return { rect: box(c), className: c.className, html: cut(c.outerHTML, 12000),
        fields: [...c.querySelectorAll('input, select')].filter((i) => i.type !== 'hidden' || i.getAttribute('data-role')).map((i) => ({ role: i.getAttribute('data-role'), type: i.type, title: i.getAttribute('title') || i.getAttribute('aria-label') || null })),
        dropdowns: [...c.querySelectorAll('[data-role=dropdownlist]')].map((i) => { try { return widgetOf(i).dataSource.data().toJSON().map((d) => d.text ?? d.Text ?? String(d)).slice(0, 12); } catch { return []; } }),
        buttons: [...c.querySelectorAll('button, .k-button')].filter(shown).map((b) => clean(b.textContent)).filter(Boolean),
        texts: [...c.querySelectorAll('.k-filter-help-text, label, .k-columnmenu-item')].map((l) => clean(l.textContent)).filter(Boolean).slice(0, 10),
        chevrons: chevrons.map((e) => ({ stamp: stamp(e), className: e.className, expanded: e.getAttribute('aria-expanded'), text: clean(e.textContent).slice(0, 40) })) };
    },
    closeFilterPopup() {
      for (const p of document.querySelectorAll('.k-filter-menu, .k-column-menu, .k-grid-filter-popup')) {
        try { (widgetOf(p) || window.jQuery(p).closest('.k-popup').data('kendoPopup'))?.close(); } catch {}
      }
    },
    // the first data row: a link or button in it (opens on click), else its first cell (the portal's double-click)
    firstRow() {
      const g = [...document.querySelectorAll('[data-role=grid]')].find((x) => shown(x) && !x.closest('.k-window'));
      const tr = g?.querySelector('tbody tr:not(.k-grid-norecords)');
      if (!tr) return null;
      const link = [...tr.querySelectorAll('a[href]:not([href^="javascript:void"]), a.k-grid-edit, a.clickable, button, .clickable')].find(shown);
      return { stamp: stamp(link || tr.querySelector('td') || tr), link: !!link };
    },
    gridView() {
      return [...document.querySelectorAll('[data-role=grid]')].filter((g) => shown(g) && !g.closest('.k-window')).slice(0, 2).map((g) => {
        const w = widgetOf(g), nr = g.querySelector('.k-grid-norecords, .k-grid-norecords-template');
        return { id: g.id || null, rows: g.querySelectorAll('tbody tr:not(.k-grid-norecords)').length, total: (() => { try { return w.dataSource.total(); } catch { return null; } })(),
          noRecords: nr && shown(nr) ? { text: clean(nr.textContent), html: cut(nr.outerHTML, 1500) } : null, pager: !!g.querySelector('.k-pager'), rect: box(g) };
      });
    },
    // a text box on the page to type a value no record has (Q4: the empty result)
    searchText() {
      const R = root('page');
      const i = R && [...R.querySelectorAll('input[type=text], input:not([type])')].find((x) => shown(x) && !x.disabled && !x.readOnly && !x.closest('.k-grid, .k-window, .k-picker, .k-numerictextbox, .k-dropdownlist') && !/date|time|numeric|dropdown|combo/.test(x.getAttribute('data-role') || ''));
      return i ? { stamp: stamp(i), name: i.name || i.id, maxLength: i.maxLength } : null;
    },
    // the "please wait" the portal shows while it loads (watched from a click until stopped)
    watchLoading() {
      const sel = '#loadingDialog, .k-loading-mask, .k-loading-image, .loading-dialog, .blockUI';
      const st = { seen: null, ms: 0, t0: performance.now() };
      window.__probeLoading = st;
      st.timer = setInterval(() => {
        const el = [...document.querySelectorAll(sel)].find(shown);
        if (el) { st.seen ||= { className: el.className, id: el.id || null, html: cut(el.outerHTML, 1500), firstAt: Math.round(performance.now() - st.t0) }; st.ms += 50; }
      }, 50);
    },
    stopLoading() { const st = window.__probeLoading; if (!st) return null; clearInterval(st.timer); return st.seen ? { ...st.seen, visibleMs: st.ms } : null; },
  };
}

// ---------- one page ----------
// menuButton: the hamburger's selector (pack.json "menuButton"); shell: also measure the side menu's and module tab's fly-outs (once per run)
export async function probePage({ s, viewports = [], shotDir, slug, budgetSec = 300, menuButton = null, shell = false }) {
  const page = s.page;
  const deadline = Date.now() + budgetSec * 1000;
  const out = { kendo: null, errors: [], skipped: [] };
  const primary = page.viewportSize();
  const shots = [];
  const shot = async (name, clip, full = false) => {
    if (!shotDir) return null;
    const f = path.join(shotDir, `${slug}--${name}.png`);
    await page.screenshot({ path: f, animations: 'disabled', caret: 'hide', ...(clip ? { clip } : {}), ...(full ? { fullPage: true } : {}) }).catch(() => {});
    shots.push(path.basename(f));
    return path.basename(f);
  };
  const ev = (fn, arg) => page.evaluate(fn, arg);
  const P = (expr) => page.evaluate(expr);
  const wait = (ms) => page.waitForTimeout(ms);
  const nWin = () => P('window.__probe ? window.__probe.wins() : 0').catch(() => 0);
  const ready = async () => {
    await page.evaluate((src) => { if (!window.__kit) (0, eval)(src); }, HARVEST);
    await page.evaluate(`(${inpage})()`);
    const rest = await page.evaluate(() => window.__kit.rest({ scope: document.querySelector('#pageBody > main') ? '#pageBody > main' : null, module: null })).catch(() => null);
    out.kendo ||= rest?.kendo || null;
    return rest;
  };
  const reload = async () => { await s.load({ idleMs: 3000, quietMax: 5000 }); await ready(); };
  const click = async (st, how = 'click') => {
    const loc = page.locator(`[data-probe="${st}"]`).first();
    try { await (how === 'dblclick' ? loc.dblclick({ timeout: 3000 }) : loc.click({ timeout: 3000 })); return true; } catch { return ev((x) => window.__probe.click(x), st); }
  };
  const step = async (name, fn) => {
    if (Date.now() > deadline) { out.skipped.push(name); return null; }
    try { return await fn(); } catch (e) { out.errors.push(`${name}: ${String(e.message || e).split('\n')[0].slice(0, 200)}`); return null; }
  };
  const since = (i) => s.guard.events.slice(i);
  const requests = (i) => since(i).filter((e) => /request|postback/.test(e.type) && e.url && !/\.(js|css|png|gif|svg|woff2?|ico)(\?|$)/i.test(e.url))
    .map((e) => ({ method: e.method || 'GET', url: e.url.replace(/^https?:\/\/[^/]+/, '').split('?')[0], status: e.status || null })).slice(0, 8);
  // a dialog opens after its content loaded (openModalOverlay: .load(url, ..., () => center().open()))
  const waitWin = async (n0, ms = 20000) => {
    await page.waitForFunction((n) => (window.__probe?.wins() || 0) > n, n0, { timeout: ms }).catch(() => {});
    await s.settle(300, 5000).catch(() => {});
    return (await nWin()) > n0;
  };
  const closeAll = async () => { for (let i = 0; i < 5 && (await nWin()); i++) { await P('window.__kit.closeDialog()').catch(() => {}); await wait(600); } };
  const where = async () => ((await nWin()) ? 'dialog' : 'page');
  // what a click showed or hid (inside the top dialog, else the page), with the labels of what appeared
  const diffOf = async (fn) => {
    const before = await P('window.__kit.marks()');
    const dd0 = await ev((w) => window.__probe.dropdownState(w), await where());
    const ev0 = s.guard.events.length;
    await fn();
    await wait(600);
    await s.settle(100, 3000).catch(() => {});
    const ch = await ev((b) => window.__kit.changed(b), before);
    const dd1 = await ev((w) => window.__probe.dropdownState(w), await where());
    const cascades = Object.keys(dd1).filter((k) => dd0[k] && (dd0[k].enabled !== dd1[k].enabled || dd0[k].options !== dd1[k].options)).map((k) => ({ dropdown: k, before: dd0[k], after: dd1[k] }));
    return { show: ch.show.length ? await ev((x) => window.__probe.labelsIn(x), ch.show) : [], hide: ch.hide.length ? await ev((x) => window.__probe.labelsIn(x), ch.hide) : [],
      cascades, requests: requests(ev0) };
  };

  // Q3/Q7/Q8: every radio value, checkbox and (a few) dropdown values: what each shows or hides; put back afterwards
  const conditionals = async (w) => {
    const t = await ev((x) => window.__probe.triggers(x), w);
    const res = { radios: [], checkboxes: [], dropdowns: [] };
    for (const g of t.radios) {
      const orig = g.options.find((o) => o.checked);
      for (const o of g.options) {
        if (Date.now() > deadline) break;
        const d = await diffOf(() => ev((x) => window.__probe.click(x), o.stamp));
        res.radios.push({ group: g.name, groupLabel: g.label, value: o.value, label: o.label, checkedAtRest: o.checked, ...d });
      }
      if (orig) await ev((x) => window.__probe.click(x), orig.stamp);
      await wait(300);
    }
    for (const c of t.checkboxes) {
      if (Date.now() > deadline) break;
      const d = await diffOf(() => ev((x) => window.__probe.click(x), c.stamp));
      res.checkboxes.push({ name: c.name, label: c.label, checkedAtRest: c.checked, ...d });
      await ev((x) => window.__probe.click(x), c.stamp);
      await wait(300);
    }
    for (const dd of t.dropdowns) {
      for (const it of dd.items.filter((i) => i.value !== dd.value).slice(0, 4)) {
        if (Date.now() > deadline) break;
        const d = await diffOf(() => ev(([x, v]) => window.__probe.pickDropdown(x, v), [dd.stamp, it.value]));
        if (d.show.length || d.hide.length || d.cascades.length) res.dropdowns.push({ name: dd.name, label: dd.label, value: it.value, text: it.text, ...d });
      }
      await ev(([x, v]) => window.__probe.pickDropdown(x, v), [dd.stamp, dd.value]);
      await wait(300);
    }
    return res;
  };

  // Q2: the inputs at rest, then the first one driven like a user: focus, calendar button, a day, Tab; put back
  const dates = async (w, tag) => {
    const list = await ev((x) => window.__probe.dates(x), w);
    const first = list.find((d) => d.enabled);
    let drive = null;
    if (first) {
      const state = () => ev((x) => window.__probe.dateState(x), first.stamp);
      drive = { role: first.role, label: first.label, atRest: first.shows };
      await page.locator(`[data-probe="${first.stamp}"]`).first().click({ timeout: 3000 }).catch(() => {});
      await wait(300);
      drive.onFocus = (await state()).shows;
      // the calendar button (a date-time picker has a clock button first); a time picker only has its clock
      const pick = `:is(.k-picker, .k-datepicker, .k-datetimepicker, .k-timepicker):has([data-probe="${first.stamp}"])`;
      const cal = page.locator(`${pick} :is(button, .k-select):has(.k-svg-i-calendar, .k-i-calendar)`).first();
      await ((await cal.count()) ? cal : page.locator(`${pick} :is(.k-input-button, .k-select)`).last()).click({ timeout: 3000 }).catch(() => {});
      await wait(600);
      const opened = await state();
      Object.assign(drive, { onCalendarButton: opened.shows, popup: opened.popup, input: opened.input });
      if (opened.popup) {
        const x = Math.max(0, Math.min(opened.input?.x ?? opened.popup.x, opened.popup.x) - 10), y = Math.max(0, Math.min(opened.input?.y ?? opened.popup.y, opened.popup.y) - 10);
        drive.shot = await shot(`${tag}-date-open`, { x, y, width: Math.max(opened.popup.x + opened.popup.w, (opened.input?.x ?? 0) + (opened.input?.w ?? 0)) - x + 10, height: Math.max(opened.popup.y + opened.popup.h, (opened.input?.y ?? 0) + (opened.input?.h ?? 0)) - y + 10 });
        const day = await P('window.__probe.dayCell()');
        if (day) {
          await click(day);
          await wait(500);
          const after = await state();
          drive.afterPick = after.shows;
          drive.popupAfterPick = !!after.popup; // a date-time picker moves on to its time list
        }
      }
      // no Escape: Kendo's window closes on it, which ended the whole dialog probe on 4 dialogs (restoreDate closes the popup)
      await page.keyboard.press('Tab').catch(() => {});
      await wait(300);
      drive.afterBlur = (await state()).shows;
      await ev(([x, v]) => window.__probe.restoreDate(x, v), [first.stamp, first.shows]);
    }
    return { inputs: list.map(({ stamp, ...d }) => d), drive };
  };

  // Q6: each toggle clicked once and back
  const toggles = async (w) => {
    const list = await ev((x) => window.__probe.toggles(x), w);
    const res = [];
    for (const t of list) {
      if (Date.now() > deadline) break;
      const first = await ev((x) => window.__probe.toggle(x), t.stamp);
      if (!first) continue;
      await wait(300);
      const back = await ev((x) => window.__probe.toggle(x), first.back);
      await wait(300);
      res.push({ header: t.header, title: t.title, first: { ...first, back: undefined }, back: back && { ...back, back: undefined } });
    }
    return res;
  };

  const validationAndClose = async (w, tag) => {
    const v = await ev((x) => window.__probe.validation(x), w);
    if (!v) return null;
    v.shot = await shot(`${tag}-validation`);
    const x = v.summary.find((s) => s.close)?.close;
    if (x) { await click(x); await wait(500); v.summaryCloseHides = !(await ev((y) => window.__probe.validation(y), w))?.summary?.length; }
    return v;
  };

  // Q9: Save with nothing filled, every POST blocked
  const saveEmpty = async () => {
    const st = await P("window.__probe.stamp('.k-window [data-kit-action=save]')");
    if (!st) return null;
    const ev0 = s.guard.events.length, allow = s.guard.allowPost, n0 = await nWin();
    s.guard.allowPost = false;
    try {
      await click(st);
      await wait(1500);
      await s.settle(100, 3000).catch(() => {});
      const blocked = since(ev0).filter((e) => e.status === 'blocked').map((e) => `${e.method} ${e.url.replace(/^https?:\/\/[^/]+/, '').split('?')[0]}`);
      return { validation: await validationAndClose('dialog', `${slug}-save`.slice(-40)), postAttempted: blocked, stillOpen: (await nWin()) >= n0, native: since(ev0).filter((e) => e.type === 'dialog').map((e) => e.message) };
    } finally { s.guard.allowPost = allow; }
  };

  // Q10: X and Cancel, each on its own fresh dialog (`reopen` opens it again), after an edit when `edit`. A confirm is answered
  // "stay" first (the dialog must still be open, and its text and buttons are what the user sees), then the same button is
  // clicked again and the confirm answered "leave". Nothing is saved, ever.
  const confirmButtons = (c) => ({ stay: c.buttons.find((b) => /^(no|cancel|stay|keep editing|return)$/i.test(b.text)), leave: c.buttons.find((b) => /^(yes|ok|discard|leave|continue|close|don.?t save)$/i.test(b.text)) });
  const closeVia = async (via, edit, tag) => {
    const a = { via, edited: null, closed: false, confirm: null, native: [] };
    if (edit) {
      const e = await P('window.__probe.editable()');
      if (e) { await page.locator(`[data-probe="${e.stamp}"]`).fill('probe').catch(() => {}); await page.keyboard.press('Tab').catch(() => {}); await wait(300); a.edited = e.name; }
    }
    const press = async () => {
      const st = await ev((v) => window.__probe.closeButton(v), via);
      if (!st) return null;
      const n0 = await nWin(), ev0 = s.guard.events.length;
      await click(st);
      await wait(1200);
      return { n0, n1: await nWin(), native: since(ev0).filter((e) => e.type === 'dialog').map((e) => ({ kind: e.kind, message: e.message })) };
    };
    const r = await press();
    if (!r) return { ...a, button: false };
    a.native = r.native;
    a.closed = r.n1 < r.n0;
    if (r.n1 > r.n0) { // a confirm opened on top of the dialog
      a.confirm = await P('window.__probe.confirmInfo()');
      a.confirm.shot = await shot(`${tag}-confirm-${via}`);
      const { stay, leave } = confirmButtons(a.confirm);
      if (stay) {
        a.answered = stay.text;
        await click(stay.stamp);
        await wait(800);
        a.stillOpenAfterStay = (await nWin()) >= r.n0; // staying must leave the dialog (and its edit) where it was
        if (a.stillOpenAfterStay && leave) { // the same button again, this time leaving
          const r2 = await press();
          if (r2 && r2.n1 > r2.n0) {
            const c2 = await P('window.__probe.confirmInfo()'), l2 = confirmButtons(c2).leave;
            if (l2) { a.leftWith = l2.text; await click(l2.stamp); await wait(800); }
          }
          a.closedAfterLeave = (await nWin()) < r.n0;
        }
      } else if (leave) { a.answered = leave.text; await click(leave.stamp); await wait(800); a.closedAfterLeave = (await nWin()) < r.n0; }
    }
    return a;
  };
  const closeTest = async (edit, tag, reopen) => {
    const res = { edited: null, attempts: [] };
    for (const via of ['x', 'cancel']) {
      if (via === 'cancel') { // the first one closed (or left) the dialog: a fresh one for Cancel
        await closeAll();
        if (!reopen || !(await reopen())) { res.attempts.push({ via, reopened: false }); break; }
        await P('window.__kit.dialog()').catch(() => {}); // the harvest recognizes the dialog's Cancel / Save buttons (a fresh window has none marked)
      }
      const a = await closeVia(via, edit, tag);
      res.edited ||= a.edited;
      res.attempts.push(a);
    }
    await closeAll();
    return res;
  };

  // a dialog that just opened: where it is, what it holds, what its parts do, Save empty, how it closes (`reopen`: opens it again)
  const dialog = async (opener, tag, { full = true, reopen = null } = {}) => {
    const d = { opener };
    d.info = await P('(() => { const x = window.__kit.dialog(); if (!x) return null; return { title: x.title, options: x.options, windowClass: x.windowClass, contentId: x.contentId, fields: x.fields.length, required: x.fields.filter((f) => f.required).length, hidden: x.hidden.length, unknown: x.unknown, actions: x.actions.map((a) => a.action + ": " + a.text) }; })()').catch(() => null);
    d.position = await P('window.__probe.position()');
    d.shot = full ? await shot(tag) : null; // not a row's dialog: it shows a real record
    d.census = await ev((w) => window.__probe.census(w), 'dialog');
    if (full) {
      d.dates = await step(`${tag} dates`, () => dates('dialog', tag));
      d.conditionals = await step(`${tag} conditionals`, () => conditionals('dialog'));
      d.toggles = await step(`${tag} toggles`, () => toggles('dialog'));
      d.nested = await step(`${tag} nested create`, async () => {
        const st = await P("window.__probe.stamp('.k-window [data-kit-action=create]')");
        if (!st) return null;
        const allow = s.guard.allowPost, n0 = await nWin();
        s.guard.allowPost = false;
        try {
          const ch = await diffOf(() => click(st));
          if ((await nWin()) > n0 || (await waitWin(n0, 5000))) {
            const r = { window: await P('window.__probe.position()'), census: await ev((w) => window.__probe.census(w), 'dialog'), shot: await shot(`${tag}-nested`) };
            await P('window.__kit.closeDialog()');
            await wait(700);
            return r;
          }
          return { inline: ch };
        } finally { s.guard.allowPost = allow; }
      });
      d.saveEmpty = await step(`${tag} save empty`, saveEmpty);
    }
    d.close = await step(`${tag} close`, () => closeTest(true, tag, reopen));
    await closeAll();
    return d;
  };

  // Q11: the filter icon of the result grid, the popup it opens, a chevron in it
  const gridFilter = async () => {
    const f = await P('window.__probe.filterIcon()');
    if (!f?.stamp) return f;
    await click(f.stamp);
    await wait(700);
    const pop = await P('window.__probe.filterPopup()');
    if (pop) {
      const x = Math.max(0, Math.min(f.icon.x, pop.rect.x) - 10), y = Math.max(0, Math.min(f.icon.y, pop.rect.y) - 10);
      pop.shot = await shot('grid-filter', { x, y, width: Math.max(pop.rect.x + pop.rect.w, f.icon.x + f.icon.w) - x + 10, height: Math.max(pop.rect.y + pop.rect.h, f.icon.y + f.icon.h) - y + 10 });
      for (const c of pop.chevrons.slice(0, 2)) {
        await click(c.stamp);
        await wait(500);
        const now = await P('window.__probe.filterPopup()');
        c.after = now ? { htmlDelta: now.html.length - pop.html.length, expanded: now.chevrons.find((z) => z.stamp === c.stamp)?.expanded ?? null, rect: now.rect } : { popupClosed: true };
      }
    }
    await page.keyboard.press('Escape').catch(() => {});
    await wait(300);
    await P('window.__probe.closeFilterPopup()');
    await wait(300);
    return { ...f, popup: pop };
  };

  // ---------- the page ----------
  const rest = await ready();
  out.title = rest?.shell?.title || (await page.title().catch(() => null));
  out.census = await ev((w) => window.__probe.census(w), 'page');
  out.unknownRoles = rest?.unknown || {};
  out.hiddenAtRest = rest?.hidden?.length || 0;
  out.dates = await step('page dates', () => dates('page', 'page'));
  out.conditionals = await step('page conditionals', () => conditionals('page'));
  out.toggles = await step('page toggles', () => toggles('page'));
  await step('reload', reload); // back to the page as it loads: the steps above changed the form

  // Q4/Q5/Q6: Search with nothing typed
  const searchSt = await P("window.__probe.stamp('[data-kit-action=search]')");
  if (searchSt) {
    out.search = await step('search', async () => {
      const collapse0 = await P('window.__probe.collapseState()');
      const ev0 = s.guard.events.length, t0 = Date.now();
      await P('window.__probe.watchLoading()');
      const ch = await diffOf(async () => { await click(searchSt); await s.settle(300, 8000).catch(() => {}); });
      const loading = await P('window.__probe.stopLoading()');
      return { ms: Date.now() - t0, reveals: ch.show, hides: ch.hide, requests: requests(ev0), loading, grids: await P('window.__probe.gridView()'),
        collapseBefore: collapse0, collapseAfter: await P('window.__probe.collapseState()'), validation: await validationAndClose('page', 'page-search') };
    });
    out.gridFilter = await step('grid filter', gridFilter);
    // the first row: a dialog on double-click (the portal's convention), else on click
    out.row = await step('first row', async () => {
      const r = await P('window.__probe.firstRow()');
      if (!r) return null;
      const n0 = await nWin(), ev0 = s.guard.events.length;
      let how = r.link ? 'click' : 'dblclick', via = r.link ? 'link' : 'dblclick';
      await click(r.stamp, how);
      if (!(await waitWin(n0, 12000))) {
        how = r.link ? 'dblclick' : 'click';
        via = r.link ? 'link dblclick' : 'click';
        await click(r.stamp, how);
        if (!(await waitWin(n0, 4000))) return { dialog: null, navigates: since(ev0).find((e) => e.type === 'navigation')?.url?.replace(/^https?:\/\/[^/]+/, '') || null };
      }
      const reopen = async () => { const n = await nWin(); await click(r.stamp, how); return waitWin(n, 12000); };
      return { via, dialog: await dialog(`row ${via}`, 'row', { full: false, reopen }) };
    });
  }

  // Q1/Q3/Q8/Q9/Q10: each Create New (at most 2) opened, explored, closed
  out.dialogs = [];
  const markCreates = () => P(`[...document.querySelectorAll('[data-kit-action=create]')].filter((e) => e.getClientRects().length && !e.closest('.k-window')).slice(0, 2).map((e) => (e.setAttribute('data-probe-create', ''), (e.value || e.textContent || '').replace(/\\s+/g, ' ').trim()))`).catch(() => []);
  const creates = await markCreates();
  const reopenCreate = (i) => async () => {
    const n0 = await nWin();
    try { await page.locator('[data-probe-create]').nth(i).click({ timeout: 3000 }); } catch { return false; }
    return waitWin(n0);
  };
  for (let i = 0; i < creates.length; i++) {
    await step(`create ${i + 1}`, async () => {
      const n0 = await nWin(), ev0 = s.guard.events.length;
      await P('window.__probe.watchLoading()');
      await page.locator('[data-probe-create]').nth(i).click({ timeout: 3000 });
      const opened = await waitWin(n0);
      const loading = await P('window.__probe.stopLoading()');
      if (!opened) { out.dialogs.push({ opener: creates[i], opened: false, requests: requests(ev0), navigates: since(ev0).find((e) => e.type === 'navigation')?.url?.replace(/^https?:\/\/[^/]+/, '') || null }); return; }
      out.dialogs.push({ ...(await dialog(creates[i], `create${i + 1}`, { reopen: reopenCreate(i) })), loading, requests: requests(ev0) });
    });
  }

  // Q4: a Search no record matches (the empty grid, or what shows instead)
  if (searchSt) out.searchNoMatch = await step('search no match', async () => {
    await reload();
    const t = await P('window.__probe.searchText()');
    if (!t) return null;
    await page.locator(`[data-probe="${t.stamp}"]`).fill('zzqx9w'.slice(0, t.maxLength > 0 ? t.maxLength : 6));
    const st = await P("window.__probe.stamp('[data-kit-action=search]')");
    const ev0 = s.guard.events.length;
    const ch = await diffOf(async () => { await click(st); await s.settle(300, 8000).catch(() => {}); });
    const r = { field: t.name, reveals: ch.show, requests: requests(ev0), grids: await P('window.__probe.gridView()'), validation: await validationAndClose('page', 'page-nomatch'), shot: await shot('search-nomatch') };
    // a page whose empty Search only showed validation: its grid (and filter icon) shows now
    if (!out.gridFilter?.popup && r.grids.length) out.gridFilter = await gridFilter();
    return r;
  });

  // Q13 the menus at a viewport: each module of the side menu hovered (does its submenu scroll, is it cut off) and the module tab's
  const hover = async (st) => { await page.locator(`[data-probe="${st}"]`).first().hover({ timeout: 3000 }).catch(() => {}); await wait(800); };
  const flyShot = async (tag, f) => (f?.rect ? shot(tag, { x: Math.max(0, f.rect.x - 12), y: Math.max(0, f.rect.y - 12), width: Math.min(innerSize().w, f.rect.w + 24), height: Math.min(innerSize().h, f.rect.h + 24) }) : null);
  const innerSize = () => ({ w: page.viewportSize().width, h: page.viewportSize().height });
  const menuProbe = async (tag) => {
    const res = { bar: [], side: [] };
    const m0 = await P('window.__probe.menus()');
    if (m0.bar) for (const it of m0.bar.items.slice(0, 2)) { // the module tab under the header (a page has none on Home)
      await hover(it.stamp);
      const f = await P('window.__probe.flyout()');
      res.bar.push({ item: it.text, ...(f || { popup: false }), shot: await flyShot(`${tag}-tabflyout`, f) });
      await page.mouse.move(0, 0);
      await wait(400);
    }
    // the side menu: the hamburger (the pack's selector, else the usual ones; below 1280 px the portal shows a twin of it)
    let opened = false;
    for (const sel of [menuButton, 'i.fa-bars', '[class*=hamburger]', 'button[aria-label*="menu" i]'].filter(Boolean)) {
      const b = page.locator(`${sel}:visible`).first();
      if (!(await b.count())) continue;
      await b.click({ timeout: 3000 }).catch(() => {});
      await wait(900);
      if ((await P('window.__probe.menus()')).side) { opened = true; res.hamburger = sel; break; }
    }
    const m = opened ? await P('window.__probe.menus()') : null;
    if (!m?.side) { res.error = 'the side menu did not open: pass the hamburger as pack.json "menuButton"'; return res; }
    res.sideRect = m.side.rect;
    let shots = 0;
    for (const it of m.side.items) {
      if (Date.now() > deadline) { out.skipped.push(`menu ${it.text}`); break; }
      await hover(it.stamp);
      const f = await P('window.__probe.flyout()');
      const bad = !!f && (f.scrollbar || f.cutOff || !f.fits);
      res.side.push({ item: it.text, ...(f || { popup: false }), shot: f && (shots === 0 || (bad && shots < 4)) ? (shots++, await flyShot(`${tag}-flyout-${shots}`, f)) : null });
    }
    await page.mouse.move(0, 0);
    return res;
  };

  // Q1 + Q13 at each viewport (the first is the capture's own; a 1920x1080 screen at 150% is about 1272x588 in a real browser):
  // the page layout the portal's breakpoints give, the menus, and the first Create New's dialog (where, how tall, a close with no edit)
  out.viewports = [];
  for (const vp of viewports) {
    const same = vp.width === primary.width && vp.height === primary.height, tag = `${vp.width}x${vp.height}`;
    const r = await step(`viewport ${tag}`, async () => {
      if (!same) await page.setViewportSize(vp);
      await reload();
      const res = { viewport: vp, layout: await P('window.__probe.layout()') };
      res.layoutShot = await shot(`layout-${tag}`, null, true);
      if (shell) res.menus = await menuProbe(tag);
      if (!same && creates.length) {
        await reload();
        await markCreates();
        const n0 = await nWin();
        await page.locator('[data-probe-create]').first().click({ timeout: 3000 });
        if (!(await waitWin(n0))) res.dialog = { opened: false };
        else {
          res.dialog = { position: await P('window.__probe.position()'), shot: await shot(`create1-${tag}`) };
          res.dialog.cleanClose = await closeTest(false, `create1-${vp.width}`, reopenCreate(0));
          await closeAll();
        }
      }
      return res;
    });
    if (!r) continue;
    out.viewports.push(r);
    if (r.dialog?.position && out.dialogs[0]) (out.dialogs[0].atViewports ||= []).push({ viewport: vp, position: r.dialog.position, shot: r.dialog.shot, cleanClose: r.dialog.cleanClose });
  }
  if (page.viewportSize().width !== primary.width) await page.setViewportSize(primary).catch(() => {});
  out.shots = shots;
  return out;
}

// ---------- every page -> the answers ----------
const uniq = (xs) => [...new Set(xs.filter((x) => x != null && x !== ''))];
const count = (xs) => Object.entries(xs.reduce((m, x) => ((m[x] = (m[x] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
const top = (xs, n = 6) => count(xs).slice(0, n).map(([k, c]) => `${k} x${c}`).join(', ') || '-';
// markup reduced to its shape (tags and classes), to count how many different kinds there are
const shape = (html) => (html || '').replace(/\s(id|data-probe|data-kit[\w-]*|style|aria-[\w-]+|for|data-valmsg-for|name|title)="[^"]*"/g, '').replace(/>[^<]+</g, '><').slice(0, 600);

export function summarize(pages) {
  const ok = pages.filter((p) => p.probe);
  const all = (f) => ok.flatMap((p) => [].concat(f(p) ?? []).filter(Boolean).map((x) => ({ page: p.label, ...x })));
  const name = (d) => d.info?.title || d.opener;
  const dialogsOf = (p) => [...(p.probe.dialogs || []), ...(p.probe.row?.dialog ? [{ ...p.probe.row.dialog, opener: `row ${p.probe.row.via}` }] : [])];

  const Q1 = all((p) => dialogsOf(p).flatMap((d) => [d.position && { dialog: name(d), ...d.position }, ...(d.atViewports || []).filter((v) => v.position).map((v) => ({ dialog: name(d), ...v.position }))]))
    .map(({ page, dialog, viewport, rect, centered, touchesLeft, widerThanViewport, overflowRight, className, computed, kendo, rules, heightPct, fitsViewport, contentScrolls, isPhone }) => ({ page, dialog, viewport: `${viewport.w}x${viewport.h}`, rect, centered, touchesLeft, widerThanViewport, overflowRight, windowClass: className, width: computed.width, minWidth: computed.minWidth, maxHeight: computed.maxHeight, heightPct, fitsViewport, contentScrolls, isPhone, kendoPosition: kendo?.position, rules }));
  const Q2 = all((p) => [...(p.probe.dates?.inputs || []).map((d) => ({ where: 'page', ...d })), ...dialogsOf(p).flatMap((d) => (d.dates?.inputs || []).map((x) => ({ where: `dialog ${name(d)}`, ...x })))]);
  const drives = all((p) => [p.probe.dates?.drive && { where: 'page', ...p.probe.dates.drive }, ...dialogsOf(p).map((d) => d.dates?.drive && { where: `dialog ${name(d)}`, ...d.dates.drive })]);
  const labels = (xs) => xs.map((x) => x.labels.join(', ') || x.text).filter(Boolean);
  const effects = (w, c) => [...(c?.radios || []).map((r) => ({ kind: 'radio', trigger: `${r.groupLabel || r.group} = ${r.label}`, ...r })), ...(c?.checkboxes || []).map((r) => ({ kind: 'checkbox', trigger: `${r.label} toggled`, ...r })), ...(c?.dropdowns || []).map((r) => ({ kind: 'dropdown', trigger: `${r.label || r.name} = ${r.text}`, ...r }))]
    .filter((e) => e.show.length || e.hide.length || e.cascades?.length).map((e) => ({ where: w, kind: e.kind, trigger: e.trigger, shows: labels(e.show), hides: labels(e.hide), cascades: e.cascades, requests: e.requests }));
  const Q7 = all((p) => effects('page', p.probe.conditionals));
  const Q3 = all((p) => dialogsOf(p).flatMap((d) => [...effects(`dialog ${name(d)}`, d.conditionals),
    d.nested && { where: `dialog ${name(d)}`, kind: 'create-new', nested: d.nested.window ? { title: d.nested.window.title, rect: d.nested.window.rect, centered: d.nested.window.centered } : null, inline: d.nested.inline ? labels(d.nested.inline.show) : null }]));
  const Q4 = all((p) => p.probe.search && { rowsOnEmptySearch: p.probe.search.grids?.[0]?.rows ?? null, total: p.probe.search.grids?.[0]?.total ?? null, validationInstead: !!p.probe.search.validation, reveals: labels(p.probe.search.reveals),
    requests: p.probe.search.requests.map((r) => `${r.method} ${r.url}`), loading: p.probe.search.loading ? `${p.probe.search.loading.id ? '#' + p.probe.search.loading.id : p.probe.search.loading.className} ${p.probe.search.loading.visibleMs}ms` : null,
    noMatch: p.probe.searchNoMatch && { rows: p.probe.searchNoMatch.grids?.[0]?.rows ?? null, noRecords: p.probe.searchNoMatch.grids?.[0]?.noRecords?.text ?? null, gridShown: !!p.probe.searchNoMatch.grids?.length, validation: !!p.probe.searchNoMatch.validation } });
  const vshape = (v) => v && { summaryClass: v.summary.map((s) => s.className), summaryIcons: v.summary.flatMap((s) => s.icons), summaryText: v.summary.map((s) => s.text.slice(0, 160)), summaryCloseHides: v.summaryCloseHides ?? null,
    fieldMessage: v.fields.slice(0, 3).map((f) => ({ class: f.className, placement: f.placement, icons: f.icons, text: f.text })), invalidStyle: uniq(v.invalid.map((i) => `${i.border} / ${i.background}`)), shape: shape(v.summary[0]?.html) };
  const Q5 = all((p) => [p.probe.search?.validation && { when: 'search', ...vshape(p.probe.search.validation) }, p.probe.searchNoMatch?.validation && { when: 'search no-match', ...vshape(p.probe.searchNoMatch.validation) }]);
  const strip = (c) => c.replace(/fa-solid|clickable|fa-lg|accessory-[\w-]+/g, '').replace(/\s+/g, ' ').trim();
  const Q6 = all((p) => [...(p.probe.toggles || []).map((t) => ({ where: 'page', ...t })), ...dialogsOf(p).flatMap((d) => (d.toggles || []).map((t) => ({ where: `dialog ${name(d)}`, ...t })))]
    .map((t) => ({ where: t.where, header: t.header, iconBefore: strip(t.first.before.icon), iconAfter: strip(t.first.after.icon), opens: !t.first.before.visible && t.first.after.visible, closes: t.first.before.visible && !t.first.after.visible, ms: t.first.durationMs, backMs: t.back?.durationMs ?? null, cssTransition: t.first.cssTransition })));
  const autoCollapse = all((p) => p.probe.search && { changed: (p.probe.search.collapseBefore || []).map((b, i) => ({ header: b.header, before: b.visible, after: p.probe.search.collapseAfter?.[i]?.visible })).filter((x) => x.before !== x.after) }).filter((x) => x.changed.length);
  const Q9 = all((p) => dialogsOf(p).filter((d) => d.saveEmpty).map((d) => ({ dialog: name(d), postAttempted: d.saveEmpty.postAttempted, stillOpen: d.saveEmpty.stillOpen, native: d.saveEmpty.native, ...vshape(d.saveEmpty.validation) })));
  const Q10 = all((p) => dialogsOf(p).flatMap((d) => [d.close && { dialog: name(d), edited: d.close.edited, attempts: d.close.attempts }, ...(d.atViewports || []).filter((v) => v.cleanClose).map((v) => ({ dialog: name(d), edited: null, attempts: v.cleanClose.attempts }))]))
    .map((c) => ({ ...c, attempts: c.attempts.map((a) => ({ via: a.via, edited: a.edited, reopened: a.reopened, answered: a.answered, button: a.button, closed: a.closed, native: a.native, stillOpenAfterStay: a.stillOpenAfterStay, leftWith: a.leftWith, closedAfterLeave: a.closedAfterLeave, confirm: a.confirm ? { title: a.confirm.title, text: a.confirm.text, buttons: a.confirm.buttons.map((b) => b.text), className: a.confirm.className, rect: a.confirm.rect, answered: a.answered, shot: a.confirm.shot } : null })) }));
  const Q11 = all((p) => p.probe.gridFilter && { filterable: p.probe.gridFilter.filterable, columnMenu: p.probe.gridFilter.columnMenu, icon: p.probe.gridFilter.iconHtml, column: p.probe.gridFilter.column,
    popup: p.probe.gridFilter.popup && { className: p.probe.gridFilter.popup.className, rect: p.probe.gridFilter.popup.rect, fields: p.probe.gridFilter.popup.fields, operators: p.probe.gridFilter.popup.dropdowns, buttons: p.probe.gridFilter.popup.buttons, texts: p.probe.gridFilter.popup.texts, chevrons: p.probe.gridFilter.popup.chevrons.map((c) => ({ className: c.className, text: c.text, after: c.after })), shot: p.probe.gridFilter.popup.shot, shape: shape(p.probe.gridFilter.popup.html) } });
  const Q12 = { unmappedButtons: count(ok.flatMap((p) => [...(p.probe.census?.buttons || []), ...dialogsOf(p).flatMap((d) => d.census?.buttons || [])].filter((b) => !b.action).map((b) => b.text))),
    unknownRoles: count(ok.flatMap((p) => [...Object.keys(p.probe.unknownRoles || {}), ...dialogsOf(p).flatMap((d) => Object.keys(d.info?.unknown || {}))])),
    roles: count(ok.flatMap((p) => Object.entries(p.probe.census?.roles || {}).flatMap(([r, n]) => Array(n).fill(r)))), tabs: all((p) => p.probe.census?.tabs?.length && { tabs: p.probe.census.tabs }) };

  // Q13: per viewport, the page layout and every fly-out of the menus (probed on the first page of a run: the menus are the same everywhere)
  const Q13 = all((p) => (p.probe.viewports || []).map((v) => ({ viewport: `${v.viewport.width}x${v.viewport.height}`, layout: v.layout, layoutShot: v.layoutShot, menus: v.menus,
    dialog: v.dialog?.position && { rect: v.dialog.position.rect, heightPct: v.dialog.position.heightPct, fitsViewport: v.dialog.position.fitsViewport, contentScrolls: v.dialog.position.contentScrolls, isPhone: v.dialog.position.isPhone } })));
  const flyAll = Q13.flatMap((q) => [...(q.menus?.side || []), ...(q.menus?.bar || [])].map((f) => ({ page: q.page, viewport: q.viewport, ...f })));
  const flyDo = flyAll.filter((f) => f.rect);
  const failed = pages.filter((p) => !p.probe).map((p) => ({ page: p.label, error: p.error }));
  const answers = { pages: pages.length, probed: ok.length, failed, Q1_modalPosition: Q1, Q2_dates: { inputs: Q2, driven: drives }, Q3_Q8_dialogParts: Q3, Q4_search: Q4, Q5_pageValidation: Q5,
    Q6_toggles: { toggles: Q6, autoCollapseOnSearch: autoCollapse }, Q7_pageConditionals: Q7, Q9_dialogSaveValidation: Q9, Q10_closeConfirm: Q10, Q11_gridFilter: Q11, Q12_vocabulary: Q12, Q13_layoutAndMenus: Q13,
    stepErrors: all((p) => (p.probe.errors || []).map((e) => ({ error: e }))), skippedForTime: all((p) => p.probe.skipped?.length && { steps: p.probe.skipped }) };

  // the short read: counts first, a few examples each; answers.json has everything
  const ex = (xs, f, n = 5) => xs.slice(0, n).map((x) => `  - ${f(x)}`).join('\n') || '  - (none)';
  const closeLine = (a) => `${a.via}: ${a.confirm ? `confirm "${a.confirm.text.slice(0, 80)}" [${a.confirm.buttons.join('/')}], ${a.answered || '?'} keeps it open: ${a.stillOpenAfterStay ?? '?'}, ${a.leftWith || '?'} closes it: ${a.closedAfterLeave ?? '?'}` : a.reopened === false ? 'could not reopen' : a.native?.length ? `native ${a.native[0].kind} "${a.native[0].message}"` : a.closed ? 'closes' : a.button === false ? 'no such button' : 'stays open'}`;
  const md = [`# Probe answers\n`, `${ok.length} of ${pages.length} pages probed${failed.length ? ` (${failed.length} failed: ${failed.slice(0, 5).map((f) => f.page).join(', ')})` : ''}; ${answers.stepErrors.length} step errors, ${answers.skippedForTime.length} pages ran out of time. Everything is in answers.json, one file per page in pages/, pictures in shots/.\n`,
    `## Q1 Modal position`, `- ${Q1.filter((x) => x.centered).length}/${Q1.length} centered, ${Q1.filter((x) => x.touchesLeft).length} touching the left edge, ${Q1.filter((x) => x.widerThanViewport).length} wider than the viewport, ${Q1.filter((x) => x.overflowRight).length} running past the right edge`,
    `- by viewport: ${top(Q1.map((x) => `${x.viewport} ${x.touchesLeft ? 'left-edge' : x.centered ? 'centered' : 'other'}`), 10)}`,
    `- window classes: ${top(Q1.map((x) => `"${x.windowClass.replace(/\bk-window\b/, '').trim()}"`))}`,
    `- width rules: ${uniq(Q1.flatMap((x) => x.rules.map((r) => `${r.selector} {${Object.entries(r).filter(([k]) => k !== 'selector').map(([k, v]) => `${k}:${v}`).join(';')}}`))).slice(0, 6).join(' | ') || 'none'}`,
    ex(Q1.filter((x) => !x.centered), (x) => `${x.page} / ${x.dialog} @${x.viewport}: x=${x.rect.x} w=${x.rect.w}${x.touchesLeft ? ' (touches left)' : ''}`),
    `\n## Q2 Dates`, `- ${Q2.length} date inputs: ${Q2.filter((d) => d.prefilled).length} prefilled (days from today: ${top(Q2.filter((d) => d.offsetDays != null).map((d) => d.offsetDays))}), ${Q2.filter((d) => d.prefilled && !d.valueAttr).length} filled by script (no value attribute), ${Q2.filter((d) => d.masked).length} masked`,
    `- formats: ${top(Q2.map((d) => `${d.role} ${d.format}`))}`,
    `- driven (rest -> focus -> calendar button -> day picked -> blur):`, ex(drives, (d) => `${d.page} ${d.where} ${d.label}: "${d.atRest}" -> "${d.onFocus}" -> "${d.onCalendarButton}" -> "${d.afterPick ?? '?'}" -> "${d.afterBlur}"`),
    `\n## Q3/Q8 Clickable parts inside dialogs`, `- ${Q3.length} effects`, ex(Q3, (x) => `${x.page} / ${x.where}: ${x.kind} ${x.trigger || ''}${x.shows?.length ? ` shows [${x.shows.join(' | ')}]` : ''}${x.hides?.length ? ` hides [${x.hides.join(' | ')}]` : ''}${x.nested ? ` opens "${x.nested.title}" (${x.nested.centered ? 'centered' : `x=${x.nested.rect.x}`})` : ''}${x.inline?.length ? ` shows inline [${x.inline.join(' | ')}]` : ''}`, 12),
    `\n## Q4 Search with nothing typed`, `- ${Q4.length} pages with Search: ${Q4.filter((x) => x.rowsOnEmptySearch > 0).length} list rows, ${Q4.filter((x) => x.rowsOnEmptySearch === 0 && !x.validationInstead).length} show an empty grid, ${Q4.filter((x) => x.validationInstead).length} show validation instead`,
    `- no-match search: ${top(Q4.filter((x) => x.noMatch).map((x) => (x.noMatch.validation ? 'validation' : x.noMatch.noRecords ? `"${x.noMatch.noRecords}"` : x.noMatch.gridShown ? 'empty grid, no message' : 'no grid')))}`,
    `- loading indicator: ${top(Q4.map((x) => (x.loading ? x.loading.replace(/ \d+ms$/, '') : 'none seen')))}`,
    `\n## Q5 Validation on the page`, `- ${Q5.length} validation states seen on Search; ${uniq(Q5.map((x) => x.shape)).length} distinct summary shapes`,
    ex(Q5, (x) => `${x.page} (${x.when}): ${x.summaryClass.join(' ') || 'no summary'} icons [${x.summaryIcons.join(' ')}] "${x.summaryText[0] || ''}"; field messages: ${x.fieldMessage.map((f) => `${f.placement} ${f.class}`).join(', ') || '-'}; its X hides it: ${x.summaryCloseHides}`),
    `\n## Q6 Chevrons / collapsible panels`, `- ${Q6.length} toggles; durations ${top(Q6.map((t) => `${Math.round(t.ms / 50) * 50}ms`))}; icon swaps ${top(Q6.map((t) => `${t.iconBefore} -> ${t.iconAfter}`), 5)}`,
    `- panels that change by themselves on Search: ${autoCollapse.length ? autoCollapse.slice(0, 6).map((x) => `${x.page}: ${x.changed.map((c) => `"${c.header}" ${c.before ? 'closed' : 'opened'}`).join(', ')}`).join('; ') : 'none'}`,
    `\n## Q7 Conditional parts on the page`, `- ${Q7.length} effects`, ex(Q7, (x) => `${x.page}: ${x.kind} ${x.trigger}${x.shows.length ? ` shows [${x.shows.join(' | ')}]` : ''}${x.hides.length ? ` hides [${x.hides.join(' | ')}]` : ''}${x.cascades?.length ? ` cascades ${x.cascades.map((c) => c.dropdown).join(', ')}` : ''}`, 12),
    `\n## Q9 Save with nothing filled (POST blocked)`, `- ${Q9.length} dialogs: ${Q9.filter((x) => x.summaryClass?.length || x.fieldMessage?.length).length} show validation, ${Q9.filter((x) => x.postAttempted.length).length} tried to post anyway (validated on the server only)`,
    ex(Q9, (x) => `${x.page} / ${x.dialog}: ${x.summaryClass?.join(' ') || 'no summary'}; field messages ${x.fieldMessage?.map((f) => `${f.placement} ${f.class}`).join(', ') || '-'}${x.postAttempted.length ? `; POST ${x.postAttempted.join(', ')}` : ''}`),
    `\n## Q10 Closing a dialog`, `- after an edit: ${top(Q10.filter((c) => c.edited).flatMap((c) => c.attempts.map(closeLine)), 8)}`, `- without an edit: ${top(Q10.filter((c) => !c.edited).flatMap((c) => c.attempts.map(closeLine)), 8)}`,
    `\n## Q11 Grid filter`, `- ${Q11.length} grids after Search, ${Q11.filter((x) => x.popup).length} filter popups opened; filterable: ${top(Q11.map((x) => JSON.stringify(x.filterable)))}; ${uniq(Q11.filter((x) => x.popup).map((x) => x.popup.shape)).length} distinct popup shapes`,
    ex(Q11.filter((x) => x.popup), (x) => `${x.page} (${x.column}): fields ${x.popup.fields.map((f) => f.role || f.type).join(',')}; buttons ${x.popup.buttons.join('/')}; chevrons ${x.popup.chevrons.length}`),
    `\n## Q12 Vocabulary`, `- buttons the kit does not map: ${Q12.unmappedButtons.slice(0, 25).map(([k, n]) => `"${k}" x${n}`).join(', ') || 'none'}`, `- widget roles the kit does not rebuild: ${Q12.unknownRoles.map(([k, n]) => `${k} x${n}`).join(', ') || 'none'}`,
    `- pages with tabs: ${Q12.tabs.length}`,
    `\n## Q13 Layout and menus per viewport`,
    ...Q13.map((q) => `- ${q.viewport} (${q.page}): layout ${q.layout.breakpoints.max1280 ? 'small (<=1280)' : 'desktop'}${q.layout.breakpoints.max768 ? ' + <=768' : ''}, isPhone() ${q.layout.breakpoints.isPhone}; header ${q.layout.header?.h ?? '-'}px; hamburgers shown: ${q.layout.burgers.filter((b) => b.shown).length}/${q.layout.burgers.length}; nav links: ${q.layout.navLinks.length}; page ${q.layout.page.horizontalScroll ? 'SCROLLS SIDEWAYS' : 'fits the width'}${q.dialog ? `; dialog x=${q.dialog.rect.x} y=${q.dialog.rect.y} ${q.dialog.rect.w}x${q.dialog.rect.h} (${q.dialog.heightPct}% of the height, fits: ${q.dialog.fitsViewport}, content scrolls: ${q.dialog.contentScrolls})` : ''}`),
    `- menu fly-outs measured: ${flyDo.length}; with a scrollbar: ${flyDo.filter((f) => f.scrollbar).length}; cut off by the window: ${flyDo.filter((f) => f.cutOff || !f.fits).length}; overflow values seen: ${top(flyDo.map((f) => `${f.overflowY} (inline: ${/overflow/.test(f.inlineStyle || '') ? 'yes' : 'no'})`))}`,
    ex(flyDo.filter((f) => f.scrollbar || f.cutOff || !f.fits), (f) => `${f.viewport} "${f.item}": ${f.items} items, ${f.popupRect.h}px high, scroll height ${f.scrollHeight}, scrollbar ${f.scrollbar} (${f.scrollbarWidth}px), overflow ${f.overflowY}, max-height ${f.maxHeight}, window bottom at ${f.rect.y + f.rect.h}`, 8),
    `- side menus that did not open: ${Q13.filter((q) => q.menus?.error).map((q) => `${q.viewport}: ${q.menus.error}`).join('; ') || 'none'}`].join('\n') + '\n';
  return { answers, markdown: md };
}
