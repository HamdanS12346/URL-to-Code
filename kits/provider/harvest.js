// In-page half of the Provider kit (Kendo UI for jQuery portals). Injected into the live page by kit.mjs.
// Reads what Kendo itself knows (widget options, data sources, columns, tooltip content) instead of clicking around,
// and stamps the DOM so the snapshot (and the port) can find each widget again:
//   data-kit="kN"            a widget the rebuild replaces with a kit component (definition in screen.json widgets.kN)
//   data-kit-tip / -pos / -after   a Kendo tooltip target (content, position, delay)
//   data-kit-action="…"      search | reset | cancel | create | save | close | collapse
//   data-kit-h="hN"          hidden at rest (search results, panels): screen.json says what reveals it
//   data-kit-shell="title|module"   the page title bar texts (they change per screen)
(() => {
  const $ = window.jQuery;
  const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
  const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  let n = 0, h = 0;
  const idOf = (el) => el.getAttribute('data-kit') || (el.setAttribute('data-kit', 'k' + ++n), el.getAttribute('data-kit'));
  const plain = (o, depth = 0) => { // widget options -> JSON (no functions, no data sources, no DOM)
    if (o == null || typeof o !== 'object') return typeof o === 'function' ? undefined : o;
    if (o instanceof Date) return o.toISOString();
    if (depth > 3 || o.nodeType || o.jquery || (window.kendo?.data?.DataSource && o instanceof window.kendo.data.DataSource)) return undefined;
    if (Array.isArray(o)) return o.slice(0, 50).map((x) => plain(x, depth + 1));
    const r = {};
    for (const [k, v] of Object.entries(o)) { if (k === 'dataSource' || k.startsWith('_')) continue; const p = plain(v, depth + 1); if (p !== undefined) r[k] = p; }
    return r;
  };
  const widgetOf = (el) => { try { return (el && window.kendo?.widgetInstance?.($(el))) || null; } catch { return null; } };
  const labelOf = (input) => {
    const id = input.id;
    let l = id && document.querySelector(`label[for="${CSS.escape(id)}"]`);
    if (!l) { const col = input.closest('.editor-col, .form-group, .field, td'); l = col && col.querySelector('label'); }
    return l ? clean(l.textContent) : clean(input.getAttribute('aria-label') || input.getAttribute('title') || '');
  };
  // MVC unobtrusive validation: data-val-<rule>="message", data-val-<rule>-<param>="value"
  const dataVal = (i) => Object.fromEntries([...i.attributes].filter((a) => /^data-val-[a-z]+$/.test(a.name)).map((a) => [a.name.slice(9), a.value]));
  const valParams = (i) => Object.fromEntries([...i.attributes].filter((a) => /^data-val-[a-z]+-[a-z]+$/.test(a.name)).map((a) => [a.name.slice(9), a.value]));
  const required = (input) => {
    if (input.required || input.hasAttribute('data-val-required')) return true;
    const col = input.closest('.editor-col, .form-group');
    return !!col?.querySelector('.editor-req-field, .required');
  };
  const items = (w) => {
    let data = [];
    try { const d = w.dataSource.data(); data = d.toJSON ? d.toJSON() : [...d]; } catch {}
    const tf = w.options.dataTextField, vf = w.options.dataValueField;
    return data.slice(0, 1000).map((d) => (d && typeof d === 'object' ? { text: String(d[tf || 'text'] ?? d.Text ?? ''), value: String(d[vf || 'value'] ?? d.Value ?? d[tf] ?? '') } : { text: String(d), value: String(d) }));
  };
  const optionLabel = (w) => {
    const o = w.options.optionLabel;
    if (!o) return null;
    return typeof o === 'string' ? o : String(o[w.options.dataTextField || 'text'] ?? '');
  };
  const iso = (d) => (d instanceof Date && !isNaN(d) ? d.toISOString() : d ?? null);

  // one widget -> its definition
  const widget = (el) => {
    const w = widgetOf(el);
    const role = (el.getAttribute('data-role') || '').toLowerCase();
    if (!w) return null;
    const wrap = (w.wrapper && w.wrapper[0]) || el;
    const base = { role, id: el.id || null, name: el.getAttribute('name') || null, label: labelOf(el), required: required(el),
      validation: dataVal(el), validationParams: valParams(el), enabled: !wrap.classList.contains('k-disabled') && !el.disabled, help: null,
      animation: plain(w.options.animation), html: null };
    if (role === 'dropdownlist' || role === 'combobox') {
      return { ...base, kind: 'dropdown', optionLabel: optionLabel(w), items: items(w), value: String(w.value() ?? ''), text: clean(w.text()), cascadeFrom: w.options.cascadeFrom || null,
        filter: w.options.filter || null, height: w.options.height ?? 200 };
    }
    if (role === 'numerictextbox') return { ...base, kind: 'numeric', value: w.value(), format: w.options.format, decimals: w.options.decimals, min: w.options.min, max: w.options.max, step: w.options.step, spinners: w.options.spinners !== false, placeholder: el.getAttribute('placeholder') || '' };
    if (/^(datepicker|datetimepicker|timepicker|dateinput)$/.test(role)) {
      const kind = role === 'datetimepicker' ? 'datetime' : role === 'timepicker' ? 'time' : 'date';
      // days from today (the capture's day): a prefilled "today" must still be today when the rebuild runs, a 12/31/9999 stays 12/31/9999
      const v = w.value(), day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const offsetDays = v instanceof Date && !isNaN(v) ? Math.round((day(v) - day(new Date())) / 864e5) : null;
      return { ...base, kind, value: iso(w.value()), offsetDays, minutes: v instanceof Date && !isNaN(v) ? v.getHours() * 60 + v.getMinutes() : null, format: w.options.format, timeFormat: w.options.timeFormat || null, interval: w.options.interval ?? 30, min: iso(w.options.min), max: iso(w.options.max), placeholder: el.getAttribute('placeholder') || '' };
    }
    if (role === 'grid') {
      const opt = w.options;
      const cols = (w.columns || []).map((c) => ({ field: c.field || null, title: clean(c.title ?? c.field ?? ''), width: c.width ?? null, hidden: !!c.hidden,
        sortable: !!opt.sortable && c.sortable !== false, filterable: !!opt.filterable && c.filterable !== false, command: !!c.command, format: c.format || null }));
      return { ...base, label: null, kind: 'grid', columns: cols, sortable: plain(opt.sortable), filterable: plain(opt.filterable), pageable: plain(opt.pageable),
        pageSize: (() => { try { return w.dataSource.pageSize(); } catch { return null; } })(), autoBind: opt.autoBind !== false };
    }
    return null;
  };
  const ISLAND = new Set(['dropdown', 'numeric', 'date', 'datetime', 'time', 'grid']);
  // data-role values the kit handles (islands, tooltips) or that are parts of them (a grid's sorter/pager/filter, a
  // dropdown's list, the side menu, a window); anything else is a widget the kit does not rebuild yet (the census of every
  // menu page found autocomplete, maskedtextbox, multiselect, listbox, listview, tabstrip): it is ported as static markup
  // and reported, so the spec can flag it instead of the screen silently losing behavior
  const KNOWN = new Set(['dropdownlist', 'combobox', 'numerictextbox', 'datepicker', 'datetimepicker', 'timepicker', 'dateinput', 'grid', 'tooltip',
    'columnsorter', 'pager', 'resizable', 'selectable', 'staticlist', 'list', 'popup', 'validator', 'menu', 'contextmenu', 'window', 'textbox', 'button',
    'checkbox', 'radiobutton', 'filtermenu', 'filtermulticheck', 'filtercell', 'columnmenu', 'draggable', 'droptarget', 'reorderable', 'loader']);
  const unknownRoles = (root) => {
    const out = {};
    for (const el of root.querySelectorAll('[data-role]')) {
      const r = el.getAttribute('data-role').toLowerCase();
      if (KNOWN.has(r) || el.closest('[data-kit-skip], [data-kit-menu]')) continue;
      (out[r] ||= { count: 0, ids: [] }).count++;
      if (el.id && out[r].ids.length < 5) out[r].ids.push(el.id);
    }
    return out;
  };

  // everything Kendo built inside root: widgets (stamped), tooltips
  const scan = (root, defs) => {
    for (const el of root.querySelectorAll('[data-role]')) {
      if (el.closest('[data-kit-skip]')) continue;
      const role = el.getAttribute('data-role').toLowerCase();
      if (role === 'tooltip') {
        const w = widgetOf(el);
        const content = clean((w && typeof w.options.content === 'string' && w.options.content) || el.getAttribute('title') || el.getAttribute('data-original-title') || el.getAttribute('aria-label') || '');
        if (!content || el.closest('.k-grid-header')) continue;
        el.setAttribute('data-kit-tip', content);
        el.setAttribute('data-kit-tip-pos', (w && w.options.position) || 'top');
        el.setAttribute('data-kit-tip-after', String(w ? w.options.showAfter ?? 100 : 100));
        continue;
      }
      const def = widget(el);
      if (!def || !ISLAND.has(def.kind)) continue;
      const w = widgetOf(el);
      const wrap = (w.wrapper && w.wrapper[0]) || el;
      const outer = wrap.parentElement?.closest('[data-kit]');
      if (outer) continue; // inside another island (a grid's pager)
      const id = idOf(wrap);
      const col = wrap.closest('.editor-col, .form-group');
      const help = col?.querySelector('[data-kit-tip]');
      def.help = help ? help.getAttribute('data-kit-tip') : null;
      def.html = wrap.outerHTML;
      defs[id] = def;
    }
  };
  const fields = (root) => [...root.querySelectorAll('input, select, textarea')]
    .filter((i) => (i.name || i.id) && !/^__/.test(i.name) && (i.type !== 'hidden' || i.getAttribute('data-role')))
    .filter((i) => !i.closest('.k-grid, .k-pager, [data-kit-skip]') || i.closest('.k-grid-toolbar'))
    .filter((i) => !(i.type === 'text' && i.closest('[data-kit]') && !i.name)) // a widget's visible twin of its real input
    .map((i) => ({ name: i.name || i.id, id: i.id || null, type: i.type || i.tagName.toLowerCase(), role: i.getAttribute('data-role') || null, label: labelOf(i), required: required(i),
      maxLength: i.maxLength > 0 ? i.maxLength : null, validation: dataVal(i), validationParams: valParams(i), value: i.type === 'checkbox' || i.type === 'radio' ? i.checked : i.value,
      widget: i.closest('[data-kit]')?.getAttribute('data-kit') || null, disabled: i.disabled, readOnly: i.readOnly }));
  const ACTIONS = [['search', /^search$/i], ['reset', /^(reset|clear)$/i], ['cancel', /^cancel$/i], ['create', /^(create new|add new|upload new|create [a-z]+( [a-z]+)?)$/i], ['save', /^(save|submit|update)$/i], ['close', /^(close|×|x)$/i]];
  const actions = (root) => {
    const out = [];
    for (const b of root.querySelectorAll('button, input[type=button], input[type=submit], input[type=reset], a.k-button, a.btn, .k-window-titlebar-action')) {
      // a grid's toolbar holds page buttons (the Create New of a dialog's Destination grid); the rest of a widget is the kit's
      if (!b.closest('.k-grid-toolbar') && (b.closest('.k-grid, .k-pager') || b.closest('[data-kit]'))) continue;
      const t = clean(b.value || b.textContent || b.getAttribute('aria-label') || b.getAttribute('title'));
      const hit = ACTIONS.find(([, re]) => re.test(t)) || (b.matches('.k-window-titlebar-action') && /close/i.test(b.getAttribute('aria-label') || b.getAttribute('title') || '') ? ['close'] : null);
      if (!hit) continue;
      b.setAttribute('data-kit-action', hit[0]);
      out.push({ action: hit[0], text: t, id: b.id || null });
    }
    // collapsible panels: a chevron or angle in a panel header toggles the panel's body. The portal's icon sits in a "*-hdr-tools"
    // div INSIDE the header, so go by the panel container (header and body are its children); an icon with no container falls
    // back to the header around it and the part after that
    const panelOf = (ic) => {
      const box = ic.closest('[class*=panel-container]');
      const h = box?.querySelector(':scope > [class*=-hdr]:not([class*=hdr-tools])'), b = box?.querySelector(':scope > [class*=-bdy]');
      if (h && b) return { hdr: h, body: b };
      if (/fa-angle-(up|down)/.test(ic.className)) return {}; // an angle outside a panel is something else (a dropdown arrow)
      const o = ic.closest('.content-panel-hdr, .panel-heading, .card-header, [class*=panel-hdr], [class*=-hdr], [class*=header]');
      return { hdr: o, body: o?.nextElementSibling };
    };
    for (const ic of root.querySelectorAll('.fa-chevron-up, .fa-chevron-down, .fa-angle-up, .fa-angle-down, .k-i-chevron-up, .k-i-chevron-down, .k-svg-i-chevron-up, .k-svg-i-chevron-down, [data-toggle=collapse]')) {
      const { hdr, body } = panelOf(ic);
      if (!hdr || !body || hdr.closest('.k-menu, .k-grid, #pageHeader, [class*=mainMenu]') || hdr.querySelector('[data-kit-action=collapse]') || body.hasAttribute('data-kit-collapse')) continue;
      const clickable = ic.closest('a, button, .clickable') || ic;
      clickable.setAttribute('data-kit-action', 'collapse');
      body.setAttribute('data-kit-collapse', shown(body) ? 'open' : 'closed');
      out.push({ action: 'collapse', text: clean(hdr.textContent).slice(0, 60), expanded: shown(body) });
    }
    return out;
  };
  // a grid's markup was taken before its toolbar buttons were stamped: take it again, so the rebuilt grid carries them
  const restamp = (defs) => {
    for (const [id, def] of Object.entries(defs)) {
      const el = def.kind === 'grid' && document.querySelector(`[data-kit="${id}"]`);
      if (el && el.querySelector('.k-grid-toolbar [data-kit-action]')) def.html = el.outerHTML;
    }
  };
  const hiddenAtRest = (root) => {
    const out = [];
    for (const el of root.querySelectorAll('div, section, fieldset, table, span, p, ul')) {
      if (out.length >= 300 || el.closest('[data-kit-h], [data-kit], script, template, [data-kit-collapse]')) continue;
      // Kendo's own hidden wrappers under root are not parts of the page; root itself may sit in one (a dialog's content)
      const k = el.closest('.k-animation-container, .k-window');
      if (k && root.contains(k)) continue;
      if (getComputedStyle(el).display !== 'none' || (!el.children.length && !clean(el.textContent))) continue;
      el.setAttribute('data-kit-h', 'h' + ++h);
      out.push(el.getAttribute('data-kit-h'));
    }
    return out;
  };

  window.__kit = {
    // the page at rest: called after the freeze, before the snapshot
    rest({ scope, module }) {
      const root = (scope && document.querySelector(scope)) || document.body;
      const defs = {};
      scan(root, defs);
      if (root !== document.body) for (const r of document.querySelectorAll('#pageHeader, header')) scan(r, defs); // the logo's tooltip
      const title = [...document.querySelectorAll('h1')].find((x) => shown(x) && (!scope || !root.contains(x)));
      if (title && scope) title.setAttribute('data-kit-shell', 'title');
      let mod = null;
      if (module && scope) {
        const want = module.toLowerCase();
        mod = [...document.body.querySelectorAll('div, span, a, li, h2, h3')].filter((e) => shown(e) && !root.contains(e) && !e.closest('#pageHeader, .k-menu, [data-kit-skip]') && clean(e.textContent).toLowerCase() === want)
          .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0] || null;
        if (mod) mod.setAttribute('data-kit-shell', 'module');
      }
      // Kendo's leftovers under <body>: hidden window wrappers, overlays, popup containers. The kit renders its own; the port drops these
      // (not a menu's submenu: once opened, a scrollable Kendo menu keeps it in a container beside the <ul>, and the kit's
      // fly-out is built from it)
      for (const e of document.querySelectorAll('.k-window, .k-overlay, .k-animation-container, .k-list-container, .k-calendar-container, .k-tooltip, .k-popup'))
        if (!e.closest('[data-kit-menu], .k-menu, [data-kit]') && !e.parentElement?.closest('.k-window, .k-animation-container') && !e.querySelector('.k-menu-popup')) e.setAttribute('data-kit-drop', '');
      const focus = document.activeElement && document.activeElement !== document.body && root.contains(document.activeElement) ? document.activeElement : null;
      if (focus) focus.setAttribute('data-kit-autofocus', '');
      const header = document.querySelector('#pageHeader');
      const acts = actions(root);
      restamp(defs);
      return {
        shell: { title: title ? clean(title.textContent) : null, module: mod ? clean(mod.textContent) : null, headerStyle: header?.getAttribute('style') || null,
          headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null },
        widgets: defs, fields: fields(root), actions: acts, hidden: hiddenAtRest(root), unknown: unknownRoles(root), autofocus: focus ? (focus.id || focus.name || focus.tagName) : null,
        kendo: window.kendo?.version || null, jquery: $?.fn?.jquery || null,
      };
    },
    // the shared Kendo defaults: the exact animation numbers, no sampling
    defaults() {
      const k = window.kendo?.ui || {};
      const o = (name) => (k[name] ? plain(k[name].prototype.options) : null);
      return { popup: o('Popup')?.animation || null, tooltip: o('Tooltip'), window: o('Window')?.animation || null, menu: o('Menu')?.animation || null };
    },
    widgetEl(id) { const wrap = document.querySelector(`[data-kit="${id}"]`); return wrap?.matches('[data-role]') ? wrap : wrap?.querySelector('[data-role]'); },
    openPopup(id) { const w = widgetOf(this.widgetEl(id)); if (!w?.open) return false; w.open(); return true; },
    popupHtml(id) {
      const w = widgetOf(this.widgetEl(id));
      const p = w?.popup?.element?.[0] || w?.dateView?.popup?.element?.[0];
      const c = p && (p.closest('.k-animation-container') || p);
      return c ? c.outerHTML : null;
    },
    closePopup(id) { try { widgetOf(this.widgetEl(id))?.close(); } catch {} },
    tooltipHtml() { const t = [...document.querySelectorAll('.k-tooltip')].find(shown); const c = t && (t.closest('.k-animation-container') || t); return c ? c.outerHTML : null; },
    // after Search: what each grid shows now, as templates. No data values leave the page: only column types, lengths and counts
    grids() {
      const out = {};
      for (const g of document.querySelectorAll('[data-kit][data-role=grid], [data-kit] [data-role=grid]')) {
        const w = widgetOf(g);
        const id = g.closest('[data-kit]').getAttribute('data-kit');
        if (!w) continue;
        let view = [];
        try { const v = w.dataSource.view(); view = v.toJSON ? v.toJSON() : [...v]; } catch {}
        const type = (v) => (v == null || v === '' ? null : typeof v === 'number' ? 'number' : typeof v === 'boolean' ? 'boolean' : v instanceof Date || /^\/Date\(|^\d{4}-\d\d-\d\dT/.test(String(v)) ? 'date' : 'string');
        const fields = {};
        for (const row of view.slice(0, 50)) for (const [k, v] of Object.entries(row)) {
          const t = type(v); if (!t) continue;
          const f = (fields[k] ||= { type: t, maxLen: 0, minLen: 1e9 });
          const len = String(v).length; f.maxLen = Math.max(f.maxLen, len); f.minLen = Math.min(f.minLen, len);
        }
        const rows = [...g.querySelectorAll('tbody > tr')].filter((r) => !r.closest('.k-grid-header') && !r.classList.contains('k-grid-norecords'));
        // a row template: the text of every cell becomes {{cN}} (the values are not kept)
        const tpl = (tr) => {
          if (!tr) return null;
          const c = tr.cloneNode(true);
          [...c.children].forEach((td, i) => {
            const leaf = [...td.querySelectorAll('*')].reverse().find((x) => !x.children.length && clean(x.textContent)) || td;
            leaf.textContent = `{{c${i}}}`;
            if (td.hasAttribute('title')) td.setAttribute('title', `{{c${i}}}`);
          });
          return c.outerHTML;
        };
        out[id] = { total: (() => { try { return w.dataSource.total(); } catch { return view.length; } })(), pageSize: (() => { try { return w.dataSource.pageSize(); } catch { return null; } })(),
          fields, rowTemplate: tpl(rows[0]), altRowTemplate: tpl(rows[1]), html: (() => { const c = g.cloneNode(true); c.querySelectorAll('tbody').forEach((b) => b.replaceChildren()); return c.outerHTML; })(),
          rowCount: rows.length };
      }
      return out;
    },
    revealed() { return [...document.querySelectorAll('[data-kit-h]')].filter(shown).map((e) => e.getAttribute('data-kit-h')); },
    // A click that opens no window may show a part of the page instead (the Destination form inside the Add dialog). marks():
    // which parts are shown now, inside the open dialog or else the page: the hidden-at-rest parts and every element with an
    // id (the portal's scripts show and hide by id). changed(before): what a click turned on and off since, outermost
    // parts only, as selectors the rebuild resolves inside the same dialog / page.
    marksRoot() { const win = [...document.querySelectorAll('.k-window')].filter(shown).pop(); return win ? win.querySelector('.k-window-content') || win : document.body; },
    marks() {
      const root = this.marksRoot(), out = {};
      for (const el of root.querySelectorAll('[data-kit-h], [id]')) {
        if (el.closest('[data-kit], .k-animation-container, script') || (root === document.body && el.closest('.k-window, [data-kit-menu], #pageHeader'))) continue;
        out[el.hasAttribute('data-kit-h') ? `[data-kit-h="${el.getAttribute('data-kit-h')}"]` : `#${CSS.escape(el.id)}`] = shown(el);
      }
      return { parts: out, scroll: Math.round(root === document.body ? scrollY : root.scrollTop) };
    },
    changed(before) {
      const root = this.marksRoot(), now = this.marks();
      const flipped = Object.keys(now.parts).filter((k) => k in before.parts && now.parts[k] !== before.parts[k]);
      const els = new Map(flipped.map((k) => [k, root.querySelector(k)]));
      const outer = (k) => !flipped.some((o) => o !== k && now.parts[o] === now.parts[k] && els.get(o) !== els.get(k) && els.get(o)?.contains(els.get(k)));
      const pick = (on) => flipped.filter((k) => now.parts[k] === on && outer(k)).slice(0, 20);
      const show = pick(true);
      if (show.length) els.get(show[0])?.scrollIntoView({ block: 'nearest' }); // for the picture; the live page's own scroll was read before this
      return { show, hide: pick(false), scroll: now.scroll !== before.scroll ? now.scroll : null };
    },
    // A click that opens no window may show a part of the page instead (the Destination form inside the Add dialog). marks():
    // which parts are shown now, inside the open dialog or else the page: the hidden-at-rest parts and every element with an
    // id (the portal's scripts show and hide by id). changed(before): what a click turned on and off since, outermost
    // parts only, as selectors the rebuild resolves inside the same dialog / page.
    marksRoot() { const win = [...document.querySelectorAll('.k-window')].filter(shown).pop(); return win ? win.querySelector('.k-window-content') || win : document.body; },
    marks() {
      const root = this.marksRoot(), out = {};
      for (const el of root.querySelectorAll('[data-kit-h], [id]')) {
        if (el.closest('[data-kit], .k-animation-container, script') || (root === document.body && el.closest('.k-window, [data-kit-menu], #pageHeader'))) continue;
        out[el.hasAttribute('data-kit-h') ? `[data-kit-h="${el.getAttribute('data-kit-h')}"]` : `#${CSS.escape(el.id)}`] = shown(el);
      }
      return { parts: out, scroll: Math.round(root === document.body ? scrollY : root.scrollTop) };
    },
    changed(before) {
      const root = this.marksRoot(), now = this.marks();
      const flipped = Object.keys(now.parts).filter((k) => k in before.parts && now.parts[k] !== before.parts[k]);
      const els = new Map(flipped.map((k) => [k, root.querySelector(k)]));
      const outer = (k) => !flipped.some((o) => o !== k && now.parts[o] === now.parts[k] && els.get(o)?.contains(els.get(k)) && els.get(o) !== els.get(k));
      const pick = (on) => flipped.filter((k) => now.parts[k] === on && outer(k)).slice(0, 20);
      const show = pick(true), first = show.length ? els.get(show[0]) : null;
      first?.scrollIntoView({ block: 'nearest' }); // for the picture; the live page's own scroll was read before this
      return { show, hide: pick(false), scroll: now.scroll !== before.scroll ? now.scroll : null };
    },
    // an open Kendo window: stamp it like the page, hand back its parts
    dialog() {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop();
      if (!win) return null;
      const content = win.querySelector('.k-window-content') || win;
      const defs = {};
      scan(content, defs);
      const acts = actions(win);
      restamp(defs);
      const hidden = hiddenAtRest(content);
      const w = widgetOf(content.matches('[data-role=window]') ? content : content.querySelector('[data-role=window]') || content);
      const ov = [...document.querySelectorAll('.k-overlay')].find(shown);
      const cs = ov && getComputedStyle(ov);
      const tb = win.querySelector('.k-window-titlebar');
      return { title: clean(win.querySelector('.k-window-title')?.textContent), windowClass: win.className, windowStyle: win.getAttribute('style'),
        titlebarHtml: tb?.outerHTML || null, contentClass: content.className, contentId: content.id || null, contentStyle: content.getAttribute('style'), contentHtml: content.innerHTML,
        overlay: ov ? { className: ov.className, style: ov.getAttribute('style'), background: cs.backgroundColor, opacity: cs.opacity } : null,
        options: w ? plain({ modal: w.options.modal, width: w.options.width, height: w.options.height, actions: w.options.actions, draggable: w.options.draggable, resizable: w.options.resizable, animation: w.options.animation, position: w.options.position }) : null,
        widgets: defs, fields: fields(content), actions: acts, hidden, unknown: unknownRoles(content), rect: win.getBoundingClientRect().toJSON() };
    },
    closeDialog() {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop();
      if (!win) return false;
      const w = widgetOf(win.querySelector('[data-role=window]') || win.querySelector('.k-window-content'));
      if (w?.close) { w.close(); return true; }
      const x = win.querySelector('[data-kit-action=close], .k-window-titlebar-action');
      if (x) { x.click(); return true; }
      return false;
    },

    // ---------- what the page does at this viewport and on small interactions (read by kit.mjs; the kit runtime replays it) ----------
    // the page at this viewport: which of the portal's own breakpoints are active, where the shell sits, which hamburger shows
    layout() {
      const box = (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
      const r = (sel) => { const e = [...document.querySelectorAll(sel)].find(shown); return e ? box(e) : null; };
      let phone = null;
      try { phone = typeof window.isPhone === 'function' ? !!window.isPhone() : null; } catch {}
      const mq = (q) => matchMedia(q).matches;
      return { inner: { w: innerWidth, h: innerHeight, docW: document.documentElement.clientWidth, dpr: devicePixelRatio },
        breakpoints: { max1280: mq('(max-width: 1280px)'), max768: mq('(max-width: 768px)'), portrait: mq('(orientation: portrait)'), isPhone: phone },
        header: r('#pageHeader, header'), main: r('#pageBody > main, main'), footer: r('footer, #pageFooter'),
        burgers: [...document.querySelectorAll('i.fa-bars, [class*=hamburger], .mobile-nav')].filter(shown).length,
        navLinks: [...document.querySelectorAll('#pageHeader a, header a')].filter(shown).length,
        horizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 };
    },
    // where the open window sits and how it is sized (Kendo's center() on a desktop, the portal's own phone branch on a small screen)
    position() {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop();
      if (!win) return null;
      const r = win.getBoundingClientRect(), cs = getComputedStyle(win), docW = document.documentElement.clientWidth, content = win.querySelector('.k-window-content');
      const px = (v) => { const n = parseFloat(v); return isNaN(n) ? null : n; };
      return { rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, viewport: { w: innerWidth, h: innerHeight, docW },
        centered: Math.abs(r.x - (docW - r.width) / 2) <= 2, minWidth: px(cs.minWidth), maxHeight: px(cs.maxHeight), width: px(cs.width),
        contentScrolls: !!content && content.scrollHeight > content.clientHeight + 1, contentMaxHeight: content ? px(getComputedStyle(content).maxHeight) : null,
        titlebarH: Math.round(win.querySelector('.k-window-titlebar')?.getBoundingClientRect().height ?? 0) };
    },
    // the side menu's / module tab's items that open a submenu; the submenu that is open now (does it scroll? does Kendo give it scroll buttons?)
    menus() {
      const items = (ul) => [...ul.children].filter((x) => x.tagName === 'LI' && shown(x) && (x.getAttribute('aria-haspopup') === 'true' || x.matches('[data-groupparent]')));
      const uls = [...document.querySelectorAll('ul[data-role=menu]')].filter(shown).map((u) => ({ ul: u, vertical: u.getAttribute('aria-orientation') === 'vertical' || u.classList.contains('k-menu-vertical'), n: items(u).length })).filter((m) => m.n);
      return { side: uls.filter((m) => m.vertical).sort((a, b) => b.n - a.n)[0]?.ul ? true : false, bar: uls.some((m) => !m.vertical) };
    },
    flyout() {
      const c = [...document.querySelectorAll('.k-animation-container')].find((e) => shown(e) && e.querySelector('.k-menu-popup'));
      if (!c) return null;
      const p = c.querySelector('.k-menu-popup'), cs = getComputedStyle(p), b = c.getBoundingClientRect();
      return { rect: { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }, inlineStyle: p.getAttribute('style'), overflowY: cs.overflowY, maxHeight: cs.maxHeight,
        scrollbar: p.scrollHeight > p.clientHeight + 1 && cs.overflowY !== 'visible' && cs.overflowY !== 'hidden', scrollButtons: [...p.querySelectorAll('.k-menu-scroll-button')].filter(shown).length, items: p.querySelectorAll('li').length };
    },

    // ---------- parts that show or hide on a radio / checkbox / dropdown value ----------
    // the controls worth trying on a page or in the open window: radio groups, checkboxes, and dropdowns that are not another one's cascade child
    triggers(where) {
      const R = where === 'dialog' ? this.marksRoot() : (document.querySelector('#pageBody > main, main') || document.body);
      let n = 0;
      const stampT = (el) => el.getAttribute('data-kit-t') || (el.setAttribute('data-kit-t', 't' + ++n + '-' + Math.random().toString(36).slice(2, 5)), el.getAttribute('data-kit-t'));
      const skip = (el) => el.closest('.k-grid, .k-pager, .k-menu, #pageHeader, [data-kit-menu], .k-animation-container, [data-kit-skip]') || (where !== 'dialog' && el.closest('.k-window'));
      const groups = {};
      for (const r of R.querySelectorAll('input[type=radio]')) if (!skip(r) && r.name && !r.disabled) (groups[r.name] ||= []).push(r);
      const radios = Object.entries(groups).slice(0, 6).map(([name, rs]) => ({ name, options: rs.slice(0, 6).map((r) => ({ t: stampT(r), value: r.value, checked: r.checked })) }));
      const checkboxes = [...R.querySelectorAll('input[type=checkbox]')].filter((c) => !skip(c) && !c.disabled && (shown(c) || shown(c.closest('label')))).slice(0, 8).map((c) => ({ t: stampT(c), name: c.name || c.id, checked: c.checked }));
      const dropdowns = [...R.querySelectorAll('input[data-role=dropdownlist], select[data-role=dropdownlist]')].filter((i) => !skip(i)).map((i) => [i, widgetOf(i)])
        .filter(([, w]) => w && !w.options.cascadeFrom && !w.wrapper.hasClass('k-disabled')).slice(0, 6).map(([i, w]) => {
          let data = [];
          try { data = w.dataSource.data().toJSON().slice(0, 6); } catch {}
          const tf = w.options.dataTextField, vf = w.options.dataValueField;
          return { t: stampT(i), name: i.name || i.id, value: String(w.value() ?? ''), values: data.map((d) => (d && typeof d === 'object' ? String(d[vf || 'value'] ?? d.Value ?? d[tf] ?? '') : String(d))) };
        });
      return { radios, checkboxes, dropdowns };
    },
    tclick(t) { const el = document.querySelector(`[data-kit-t="${t}"]`); if (!el) return false; el.click(); return true; },
    tuncheck(t) { const el = document.querySelector(`[data-kit-t="${t}"]`); if (!el) return false; el.checked = false; el.dispatchEvent(new Event('change', { bubbles: true })); return true; },
    tpick(t, value) { const w = widgetOf(document.querySelector(`[data-kit-t="${t}"]`)); if (!w) return false; w.value(value); w.trigger('change'); return true; },
    // which of the parts (hidden-at-rest ones and ids) are shown right now, as selectors
    parts() { return this.marks().parts; },

    // ---------- validation as the page shows it ----------
    // the summary banners and per-field messages that are visible now (inside the open window, else the page)
    validation() {
      const R = this.marksRoot();
      const summaries = [...R.querySelectorAll('.validation-summary, .editor-validation-summary, .validation-summary-errors, .k-messagebox-error')].filter(shown).filter((e, _, all) => !all.some((o) => o !== e && o.contains(e)))
        .slice(0, 2).map((e) => ({ h: e.getAttribute('data-kit-h'), className: e.className.replace(/\bdata-kit\S*/g, '').trim(), style: e.getAttribute('style'), html: e.innerHTML.replace(/\sdata-kit[\w-]*="[^"]*"/g, ''), text: clean(e.textContent) }));
      const fields = [...R.querySelectorAll('.field-validation-error, .k-invalid-msg, .k-form-error, span[data-valmsg-for]')].filter((e) => shown(e) && clean(e.textContent)).slice(0, 30)
        .map((e) => ({ for: e.getAttribute('data-valmsg-for') || e.getAttribute('data-for') || (e.previousElementSibling?.querySelector?.('[name]')?.name ?? e.previousElementSibling?.getAttribute?.('name')) || null, text: clean(e.textContent), className: e.className }));
      return summaries.length || fields.length ? { summaries, fields } : null;
    },
    // is a loading indicator on screen (the portal's "Processing ..." box, Kendo's loading masks)?
    loading() { return [...document.querySelectorAll('#loadingDialog, .k-loading-mask, .k-loading-image, .wait-dialog, .blockUI')].some(shown); },

    // ---------- the "form data has changed" confirm a close can raise ----------
    // stamps the open window's buttons as the stay / leave answers (by their words), and returns its parts like dialog() does
    confirm() {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop();
      if (!win) return null;
      const btns = [...win.querySelectorAll('button, input[type=button], .k-button')].filter(shown);
      const answer = (b) => { const t = clean(b.value || b.textContent); return /^(no|cancel|stay|keep editing|return|go back)$/i.test(t) ? 'stay' : /^(yes|ok|discard|leave|continue|close|don.?t save)$/i.test(t) ? 'leave' : null; };
      for (const b of btns) { const a = answer(b); if (a) b.setAttribute('data-kit-confirm', a); }
      const d = this.dialog();
      return d && { ...d, buttons: btns.map((b) => ({ text: clean(b.value || b.textContent), answer: answer(b) })).filter((b) => b.text) };
    },
    // a text box in the open window a user could type into, to make it dirty
    editable() {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop(), R = win && (win.querySelector('.k-window-content') || win);
      const i = R && [...R.querySelectorAll('input[type=text], input:not([type]), textarea')].find((x) => shown(x) && !x.disabled && !x.readOnly && !x.closest('.k-picker, .k-dropdownlist, .k-numerictextbox, .k-grid') && !/date|time|dropdown|numeric|combo/.test(x.getAttribute('data-role') || ''));
      if (!i) return null;
      i.setAttribute('data-kit-edit', '');
      return true;
    },
    // the close button of the open window: the title bar's X, or its Cancel
    closeButton(via) {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop();
      if (!win) return false;
      win.querySelectorAll('[data-kit-close-via]').forEach((e) => e.removeAttribute('data-kit-close-via'));
      const el = via === 'cancel' ? [...win.querySelectorAll('[data-kit-action=cancel]')].find(shown)
        : [...win.querySelectorAll('.k-window-titlebar .k-window-titlebar-action, .k-window-titlebar a, .k-window-titlebar button')].find((a) => shown(a) && (/close/i.test(a.getAttribute('aria-label') || a.getAttribute('title') || '') || a.querySelector('.k-i-custom-close, .k-i-close, .k-i-x, .k-svg-i-x')));
      if (!el) return false;
      el.setAttribute('data-kit-close-via', via);
      return true;
    },

    // ---------- the grid's column filter ----------
    filterIcon() {
      const g = [...document.querySelectorAll('[data-role=grid]')].find((x) => shown(x) && !x.closest('.k-window'));
      const ic = g && [...g.querySelectorAll('.k-grid-header .k-grid-filter-menu, .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu')].find(shown);
      if (!ic) return null;
      ic.setAttribute('data-kit-filter-icon', '');
      const b = ic.getBoundingClientRect();
      return { x: Math.round(b.x + scrollX), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height) };
    },
    filterPopup() {
      const p = [...document.querySelectorAll('.k-filter-menu, .k-column-menu, .k-grid-filter-popup')].find(shown);
      if (!p) return null;
      const c = p.closest('.k-animation-container') || p.closest('.k-popup') || p, b = c.getBoundingClientRect();
      return { rect: { x: Math.round(b.x + scrollX), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height) }, html: c.outerHTML.replace(/\sdata-kit[\w-]*="[^"]*"/g, ''),
        buttons: [...c.querySelectorAll('button, .k-button')].filter(shown).map((x) => clean(x.textContent)).filter(Boolean) };
    },
    closeFilterPopup() {
      for (const p of document.querySelectorAll('.k-filter-menu, .k-column-menu, .k-grid-filter-popup')) { try { (widgetOf(p) || $(p).closest('.k-popup').data('kendoPopup'))?.close(); } catch {} }
    },
  };
})();
