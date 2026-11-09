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
      return { ...base, kind, value: iso(w.value()), format: w.options.format, timeFormat: w.options.timeFormat || null, interval: w.options.interval ?? 30, min: iso(w.options.min), max: iso(w.options.max), placeholder: el.getAttribute('placeholder') || '' };
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
  const ACTIONS = [['search', /^search$/i], ['reset', /^(reset|clear)$/i], ['cancel', /^cancel$/i], ['create', /^(create new|add new)$/i], ['save', /^(save|submit|update)$/i], ['close', /^(close|×|x)$/i]];
  const actions = (root) => {
    const out = [];
    for (const b of root.querySelectorAll('button, input[type=button], input[type=submit], input[type=reset], a.k-button, a.btn, .k-window-titlebar-action')) {
      if (b.closest('.k-grid, .k-pager') && !b.closest('.k-grid-toolbar')) continue;
      if (b.closest('[data-kit]')) continue;
      const t = clean(b.value || b.textContent || b.getAttribute('aria-label') || b.getAttribute('title'));
      const hit = ACTIONS.find(([, re]) => re.test(t)) || (b.matches('.k-window-titlebar-action') && /close/i.test(b.getAttribute('aria-label') || b.getAttribute('title') || '') ? ['close'] : null);
      if (!hit) continue;
      b.setAttribute('data-kit-action', hit[0]);
      out.push({ action: hit[0], text: t, id: b.id || null });
    }
    // collapsible panels: a chevron in a panel header toggles the body that follows the header
    for (const ic of root.querySelectorAll('.fa-chevron-up, .fa-chevron-down, .k-i-chevron-up, .k-i-chevron-down, .k-svg-i-chevron-up, .k-svg-i-chevron-down, [data-toggle=collapse]')) {
      const hdr = ic.closest('.content-panel-hdr, .panel-heading, .card-header, [class*=panel-hdr], [class*=-hdr], [class*=header]');
      if (!hdr || hdr.closest('.k-menu, .k-grid, #pageHeader') || hdr.querySelector('[data-kit-action=collapse]')) continue;
      const body = hdr.nextElementSibling;
      if (!body) continue;
      const clickable = ic.closest('a, button, .clickable') || ic;
      clickable.setAttribute('data-kit-action', 'collapse');
      body.setAttribute('data-kit-collapse', shown(body) ? 'open' : 'closed');
      out.push({ action: 'collapse', text: clean(hdr.textContent).slice(0, 60), expanded: shown(body) });
    }
    return out;
  };
  const hiddenAtRest = (root) => {
    const out = [];
    for (const el of root.querySelectorAll('div, section, fieldset, table, span, p, ul')) {
      if (out.length >= 300 || el.closest('[data-kit-h], [data-kit], .k-animation-container, .k-window, script, template, [data-kit-collapse]')) continue;
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
      for (const e of document.querySelectorAll('.k-window, .k-overlay, .k-animation-container, .k-list-container, .k-calendar-container, .k-tooltip, .k-popup'))
        if (!e.closest('[data-kit-menu], .k-menu, [data-kit]') && !e.parentElement?.closest('.k-window, .k-animation-container')) e.setAttribute('data-kit-drop', '');
      const focus = document.activeElement && document.activeElement !== document.body && root.contains(document.activeElement) ? document.activeElement : null;
      if (focus) focus.setAttribute('data-kit-autofocus', '');
      const header = document.querySelector('#pageHeader');
      return {
        shell: { title: title ? clean(title.textContent) : null, module: mod ? clean(mod.textContent) : null, headerStyle: header?.getAttribute('style') || null,
          headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null },
        widgets: defs, fields: fields(root), actions: actions(root), hidden: hiddenAtRest(root), autofocus: focus ? (focus.id || focus.name || focus.tagName) : null,
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
    // an open Kendo window: stamp it like the page, hand back its parts
    dialog() {
      const win = [...document.querySelectorAll('.k-window')].filter(shown).pop();
      if (!win) return null;
      const content = win.querySelector('.k-window-content') || win;
      const defs = {};
      scan(content, defs);
      const acts = actions(win);
      const hidden = hiddenAtRest(content);
      const w = widgetOf(content.matches('[data-role=window]') ? content : content.querySelector('[data-role=window]') || content);
      const ov = [...document.querySelectorAll('.k-overlay')].find(shown);
      const cs = ov && getComputedStyle(ov);
      const tb = win.querySelector('.k-window-titlebar');
      return { title: clean(win.querySelector('.k-window-title')?.textContent), windowClass: win.className, windowStyle: win.getAttribute('style'),
        titlebarHtml: tb?.outerHTML || null, contentClass: content.className, contentId: content.id || null, contentStyle: content.getAttribute('style'), contentHtml: content.innerHTML,
        overlay: ov ? { className: ov.className, style: ov.getAttribute('style'), background: cs.backgroundColor, opacity: cs.opacity } : null,
        options: w ? plain({ modal: w.options.modal, width: w.options.width, height: w.options.height, actions: w.options.actions, draggable: w.options.draggable, resizable: w.options.resizable, animation: w.options.animation, position: w.options.position }) : null,
        widgets: defs, fields: fields(content), actions: acts, hidden, rect: win.getBoundingClientRect().toJSON() };
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
  };
})();
