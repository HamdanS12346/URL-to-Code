// In-page helpers of the flows stage (scripts/flows.mjs), injected into the live page. Site-agnostic: a modal is a visible
// .k-window, [role=dialog], [aria-modal=true] or .modal.show; the one on top is the layer the user can act on.
//   __xp.layer(scope)        stamp the top layer's content root data-xp-layer; { top, title, windows }
//   __xp.collect(scope, n)   what can be clicked / typed / picked in the top layer, stamped data-xp="eN"
//   __xp.fp(scope)           the state's fingerprint: windows open, the layer's headings, labels, buttons, tabs, rows>0, validation shown
//   __xp.resolve(step, scope) find a recorded step's element again (stamped data-xp-hit), by css + nth among the shown, text as a check
//   __xp.overlay(on)         numbered boxes over the stamped candidates (the map picture the planner reads)
//   __xp.exits()             the ways out of the top window (its title bar's X, its Close / Cancel / Back / No), as steps
//   __xp.quiet(q, cap)       resolves once the page has not changed for q ms (a window's script still setting it up)
//   __xp.arm() / appeared()  what showed up anywhere since arm() (a toast, a banner built on the spot), even if gone again
(() => {
  if (window.__xp) return;
  const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
  const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  const MODAL = '.k-window, [role=dialog], [aria-modal=true], .modal.show';
  const z = (el) => { for (let e = el; e && e !== document.body; e = e.parentElement) { const v = parseInt(getComputedStyle(e).zIndex, 10); if (!isNaN(v)) return v; } return 0; };
  const windows = () => [...document.querySelectorAll(MODAL)].filter((w) => shown(w) && !w.parentElement?.closest(MODAL) && w.getBoundingClientRect().width > 40);
  const topWindow = () => windows().map((w, i) => [w, z(w), i]).sort((a, b) => b[1] - a[1] || b[2] - a[2])[0]?.[0] || null;
  const contentOf = (w) => w.querySelector(':scope > .k-window-content, .k-window-content, .modal-content') || w;
  const root = (scope) => { const w = topWindow(); return w ? contentOf(w) : (scope && document.querySelector(scope)) || document.body; };
  const titleOf = (w) => clean(w.querySelector('.k-window-title, .modal-title, [role=heading], h1, h2, h3')?.textContent).slice(0, 80);
  const textOf = (el) => clean(el.matches('input') ? el.value || el.getAttribute('aria-label') || el.title : el.textContent || el.getAttribute('aria-label') || el.title).slice(0, 60);
  const labelOf = (el) => {
    const byFor = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
    const col = el.closest('.editor-col, .form-group, .field, td');
    return clean(byFor?.textContent || el.getAttribute('aria-label') || col?.querySelector('.editor-label, label')?.textContent || el.placeholder || '').slice(0, 60);
  };
  const GENERATED = /^(k-|_|ui-id|ext-)|[0-9a-f]{8}-[0-9a-f]{4}|\d{5,}/;
  const STATE_CLS = /^(k-(hover|focus|focused|selected|active|disabled|state-\w+|alt|master-row|table-row|link|first|last)|active|selected|focus|hover|disabled|open|show|ng-|data-)/;
  const cssOf = (el) => {
    const tag = el.tagName.toLowerCase();
    if (el.id && !GENERATED.test(el.id) && document.querySelectorAll(`#${CSS.escape(el.id)}`).length === 1) return `#${CSS.escape(el.id)}`;
    if (tag === 'tr') { const g = el.closest('[id]'); return `${g && !GENERATED.test(g.id) ? `#${CSS.escape(g.id)} ` : ''}tbody tr`; }
    const cls = [...el.classList].filter((c) => !STATE_CLS.test(c)).slice(0, 2).map((c) => `.${CSS.escape(c)}`).join('');
    const nm = el.getAttribute('name') ? `[name="${el.getAttribute('name').replace(/"/g, '\\"')}"]` : '';
    const ty = tag === 'input' ? `[type="${el.type}"]` : '';
    return tag + cls + ty + nm;
  };
  const nthOf = (el, css, R) => { try { return [...R.querySelectorAll(css)].filter(shown).indexOf(el); } catch { return -1; } };
  const SKIP = '.k-pager, .k-grid-header, .k-animation-container, [data-kit-menu], #pageHeader, header[role=banner], script, template, [data-xp-skip]';
  const kindOf = (el) => {
    const tag = el.tagName.toLowerCase(), t = (el.type || '').toLowerCase(), role = el.getAttribute('role');
    if (tag === 'tr') return 'row';
    if (tag === 'select') return 'select';
    if (tag === 'textarea' || (tag === 'input' && /^(text|email|tel|number|search|password|url|)$/.test(t) && !el.matches('[role=combobox], [data-role=dropdownlist]'))) return 'text';
    if (t === 'checkbox') return 'check';
    if (t === 'radio') return 'radio';
    if (el.matches('.k-dropdownlist, .k-picker, [role=combobox], [aria-haspopup=listbox]')) return 'dropdown';
    if (role === 'tab' || el.closest('.k-tabstrip-items, [role=tablist]')) return 'tab';
    if (tag === 'a') return 'link';
    return 'button';
  };
  const rules = (el) => {
    const r = {};
    for (const a of el.attributes) if (/^data-val-/.test(a.name)) r[a.name.slice(9)] = a.value;
    if (el.maxLength > 0) r.maxlength = el.maxLength;
    if (el.required) r.required = true;
    if (el.pattern) r.pattern = el.pattern;
    if (el.min) r.min = el.min;
    if (el.max) r.max = el.max;
    if (el.getAttribute('inputmode')) r.inputmode = el.getAttribute('inputmode');
    return r;
  };

  window.__xp = {
    layer(scope) {
      document.querySelectorAll('[data-xp-layer]').forEach((e) => e.removeAttribute('data-xp-layer'));
      const w = topWindow(), R = root(scope);
      R.setAttribute('data-xp-layer', '');
      return { top: !!w, title: w ? titleOf(w) : null, windows: windows().length };
    },
    collect(scope, max = 60) {
      document.querySelectorAll('[data-xp]').forEach((e) => e.removeAttribute('data-xp'));
      const R = root(scope), top = !!topWindow();
      const sel = 'button, a[href], a[onclick], input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], input[type=text], input[type=email], input[type=tel], input[type=number], input[type=search], input:not([type]), textarea, select, [role=button], [role=tab], [role=link], .k-tabstrip-items > li, .clickable, [onclick], .k-dropdownlist, span.k-picker';
      // a widget's own buttons (a picker's calendar / clock, a number box's spinners) open its popup, which the kit already records
      // and a help icon is a hover tooltip (recorded by the kit), not something that opens a state
      const inner = (e) => e.matches('.k-input-button, .k-spinner-increase, .k-spinner-decrease, .k-select, [data-kit-tip], span[data-role=tooltip], i[data-role=tooltip], .editor-icon, .help-icon-stack-container, .editor-req-field')
        || (!e.matches('input') && !!e.closest('.k-datepicker, .k-datetimepicker, .k-timepicker, .k-numerictextbox, .k-dateinput'));
      let els = [...R.querySelectorAll(sel)].filter((e) => shown(e) && !e.closest(SKIP) && !inner(e) && !e.disabled && !e.closest('[aria-disabled=true], .k-disabled') && !(e.readOnly && e.matches('input, textarea')));
      // the twin input inside a widget wrapper is the wrapper's; an element inside another candidate is that candidate (a link's icon)
      els = els.filter((e) => !els.some((o) => o !== e && o.contains(e) && !(e.matches('input, select, textarea') && o.matches('.clickable, [onclick]'))));
      // a grid: its first data row (the rest are the same), and the links / buttons in that row; the other rows are counted
      const grids = new Map();
      for (const tb of R.querySelectorAll('tbody')) {
        if (tb.closest(SKIP)) continue;
        const rows = [...tb.children].filter((r) => r.tagName === 'TR' && shown(r) && !r.matches('.k-grid-norecords, .k-no-data, .k-grouping-row, .k-detail-row'));
        if (!rows.length || !tb.closest('.k-grid, table[role=grid], table.table, [data-role=grid]')) continue;
        grids.set(tb, rows);
      }
      const otherRow = (e) => { const tr = e.closest('tr'); const rows = tr && grids.get(tr.parentElement); return !!rows && rows.indexOf(tr) > 0; };
      els = els.filter((e) => !otherRow(e));
      for (const [, rows] of grids) els.push(rows[0]);
      const out = [];
      let n = 0;
      for (const el of els) {
        if (out.length >= max) break;
        const id = `e${++n}`, css = cssOf(el);
        el.setAttribute('data-xp', id);
        const b = el.getBoundingClientRect(), kind = kindOf(el), tr = el.tagName === 'TR' ? el : null;
        out.push({ el: id, kind, layer: top ? 'top' : 'page', css, nth: nthOf(el, css, R), text: textOf(el), label: ['text', 'select', 'check', 'radio', 'dropdown'].includes(kind) ? labelOf(el) : null,
          id: el.id || null, name: el.getAttribute('name') || null, type: el.type || null, kitAction: el.getAttribute('data-kit-action'), value: kind === 'text' && el.type !== 'password' ? el.value.slice(0, 40) : undefined,
          checked: /^(check|radio)$/.test(kind) ? el.checked : undefined, rules: kind === 'text' ? rules(el) : undefined,
          options: kind === 'select' ? [...el.options].slice(0, 12).map((o) => o.value) : undefined,
          rows: tr ? grids.get(tr.parentElement)?.length : undefined, inRow: !tr && !!el.closest('tbody tr') || undefined,
          box: { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) } });
      }
      return out;
    },
    fp(scope) {
      const ws = windows().map(titleOf), R = root(scope);
      const vis = (s) => [...R.querySelectorAll(s)].filter((e) => shown(e) && !e.closest(SKIP));
      const set = (arr) => [...new Set(arr.filter(Boolean))].sort();
      const parts = [
        `W:${ws.join('>')}`,
        `H:${set(vis('h1, h2, h3, h4, legend, .content-panel-hdr, .panel-heading, .card-header, [class*=panel-hdr]').map((e) => clean(e.textContent).slice(0, 40))).join('|')}`,
        `L:${set(vis('label, .editor-label').map((e) => clean(e.textContent).slice(0, 30))).join('|')}`,
        `B:${set(vis('button, input[type=button], input[type=submit], a.k-button, a.btn').map((e) => textOf(e))).join('|')}`,
        `F:${vis('input:not([type=hidden]), select, textarea').filter((e) => !e.readOnly && !e.disabled).length}`,
        `T:${set(vis('[role=tab][aria-selected=true], .k-tabstrip-items .k-active, .nav-tabs .active').map((e) => textOf(e))).join('|')}`,
        `R:${vis('tbody tr').filter((r) => !r.matches('.k-grid-norecords, .k-no-data')).length > 0 ? 1 : 0}`,
        `V:${vis('.field-validation-error, .validation-summary-errors, .k-invalid-msg, .k-form-error, .validation-summary, .msg-inline').filter((e) => clean(e.textContent)).length > 0 ? 1 : 0}`,
      ];
      return parts.join('\n');
    },
    // the ways out of the top window: its title bar's close (layer "win": the window itself), and the buttons in it that only lead back
    // (Close, Cancel, Back, No...). A step each, as resolve() takes it
    exits() {
      const w = topWindow();
      if (!w) return [];
      const out = [], BACK = /^(close|cancel|back|no|x|×|done|return)$/i;
      const x = [...w.querySelectorAll('.k-window-titlebar .k-window-titlebar-action, .k-window-titlebar [aria-label=Close], .modal-header .close, .modal-header .btn-close')].filter(shown)
        .find((e) => /close|×|x/i.test(`${e.getAttribute('aria-label') || ''} ${e.title || ''} ${e.className} ${e.textContent}`));
      if (x) out.push({ do: 'click', layer: 'win', css: cssOf(x), nth: nthOf(x, cssOf(x), w), text: 'X', via: 'x' });
      const C = contentOf(w);
      for (const b of C.querySelectorAll('button, input[type=button], input[type=submit], a.k-button, a.btn, [role=button]')) {
        if (!shown(b) || b.disabled || b.closest(SKIP) || !BACK.test(textOf(b))) continue;
        const css = cssOf(b);
        if (!out.some((o) => o.css === css && o.layer === 'top')) out.push({ do: 'click', layer: 'top', css, nth: nthOf(b, css, C), text: textOf(b), via: 'button' });
        if (out.length >= 4) break;
      }
      return out;
    },
    // resolves when nothing in the page has changed for `q` ms (a window's own script still filling it, checking the radio of its record), at most `cap` ms
    quiet(q = 300, cap = 3000) {
      return new Promise((done) => {
        let t = setTimeout(end, q);
        const t0 = Date.now(), mo = new MutationObserver((ms) => {
          if (ms.every((m) => m.target.closest?.('[data-xp-badge]') || (m.type === 'attributes' && /^data-xp/.test(m.attributeName)))) return;
          clearTimeout(t);
          t = setTimeout(end, Math.max(0, Math.min(q, cap - (Date.now() - t0))));
        });
        function end() { mo.disconnect(); done(Date.now() - t0); }
        mo.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
      });
    },
    // what showed up anywhere on the page since arm(): elements added or turned visible that carry text (a toast, a banner its script built, a message),
    // kept even when they are gone again by the time it is read (a toast that hides itself)
    arm() {
      const seen = (window.__xpSeen = []);
      window.__xpMo?.disconnect();
      const note = (el) => {
        // a message, not content: nothing a person fills or picks in it, no rows
        if (!(el instanceof Element) || el.closest('[data-xp-badge], script, style, .k-animation-container .k-list, .k-tooltip, tr, li') || el.querySelector('input, select, textarea, button, table, tr, li') || seen.length >= 20) return;
        const txt = clean(el.textContent);
        if (!txt || !shown(el) || seen.some((s) => s.el === el || s.el.contains(el))) return;
        const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
        seen.push({ el, text: txt.slice(0, 160), cls: (typeof el.className === 'string' ? el.className : '').slice(0, 80), at: el.parentElement?.id ? `#${el.parentElement.id}` : cssOf(el.parentElement || el),
          fixed: cs.position === 'fixed' || !!el.closest('.k-notification, [role=alert], [role=status]'), inWindow: !!el.closest(MODAL), box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, t: Date.now() });
      };
      window.__xpMo = new MutationObserver((ms) => {
        for (const m of ms) {
          if (m.type === 'childList') m.addedNodes.forEach((x) => setTimeout(() => note(x), 0));
          else if (m.target instanceof Element && /msg|alert|notif|toast|error|summary|banner|message/i.test(`${m.target.className} ${m.target.getAttribute('role') || ''}`)) setTimeout(() => note(m.target), 0);
        }
      });
      window.__xpMo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class'] });
    },
    appeared() {
      window.__xpMo?.disconnect();
      const now = Date.now();
      return (window.__xpSeen || []).map(({ el, t, ...r }) => ({ ...r, stays: el.isConnected && shown(el), ms: el.isConnected && shown(el) ? null : now - t }));
    },
    resolve(step, scope) {
      document.querySelectorAll('[data-xp-hit]').forEach((e) => e.removeAttribute('data-xp-hit'));
      const R = step.layer === 'win' ? topWindow() : step.layer === 'top' ? (topWindow() ? contentOf(topWindow()) : null) : root(scope);
      if (!R) return { ok: false, why: 'no window open' };
      let list = [];
      try { list = [...R.querySelectorAll(step.css)].filter(shown); } catch { return { ok: false, why: `bad selector ${step.css}` }; }
      let el = list[step.nth];
      // the page changed a little since (a row more above): the same text among the same kind wins
      if (step.text && (!el || textOf(el) !== step.text) && step.css !== 'tbody tr' && !/ tbody tr$/.test(step.css)) el = list.find((e) => textOf(e) === step.text) || el;
      if (!el) return { ok: false, why: `${step.css} #${step.nth} not found (${list.length} shown)` };
      el.setAttribute('data-xp-hit', '');
      el.scrollIntoView({ block: 'center' });
      return { ok: true, text: textOf(el) };
    },
    windows() { return windows().length; },
    overlay(on) {
      document.querySelectorAll('[data-xp-badge]').forEach((e) => e.remove());
      if (!on) return;
      for (const el of document.querySelectorAll('[data-xp]')) {
        const b = el.getBoundingClientRect();
        if (b.bottom < 0 || b.top > innerHeight) continue;
        const d = document.createElement('div');
        d.setAttribute('data-xp-badge', '');
        d.textContent = el.getAttribute('data-xp');
        Object.assign(d.style, { position: 'fixed', left: `${Math.max(0, b.x - 2)}px`, top: `${Math.max(0, b.y - 14)}px`, font: 'bold 11px Arial', color: '#fff', background: '#d6005c', padding: '0 3px',
          zIndex: 2147483647, pointerEvents: 'none', outline: '1px solid #d6005c', boxShadow: `0 0 0 1px #fff` });
        const o = document.createElement('div');
        o.setAttribute('data-xp-badge', '');
        Object.assign(o.style, { position: 'fixed', left: `${b.x}px`, top: `${b.y}px`, width: `${b.width}px`, height: `${b.height}px`, outline: '2px solid #d6005c', zIndex: 2147483646, pointerEvents: 'none' });
        document.body.append(o, d);
      }
    },
    // the message shown for a field after it was typed into and left (unobtrusive validation, Kendo's validator, or the field's own aria)
    fieldMsg(name) {
      const R = root(null), el = R.querySelector(`[name="${name.replace(/"/g, '\\"')}"]`);
      const m = [...R.querySelectorAll(`[data-valmsg-for="${name.replace(/"/g, '\\"')}"], [data-for="${name.replace(/"/g, '\\"')}"]`)].find((e) => shown(e) && clean(e.textContent));
      const near = el?.closest('.editor-col, .form-group, .field, td')?.querySelector('.field-validation-error, .k-invalid-msg, .k-form-error, .invalid-feedback');
      return clean((m || (near && shown(near) ? near : null))?.textContent) || (el?.getAttribute('aria-invalid') === 'true' ? '(marked invalid)' : null);
    },
  };
})();
