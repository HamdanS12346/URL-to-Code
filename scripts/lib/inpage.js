// Injected into every document (context.addInitScript). Everything the Node scripts read from a page lives on window.__pw.
// Plain browser code: no imports, no Node APIs. Works on any page (WebForms, MVC, React, Angular, Vue, static);
// framework-specific readers (WebForms validators, UpdatePanels, React props...) are best-effort and never throw.
(() => {
  if (window.__pw) return;

  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const cut = (s, n) => (s && s.length > n ? s.slice(0, n) + '…' : s);
  const slug = (s) => clean(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32);
  const esc = (s) => CSS.escape(s);
  const r2 = (v) => Math.round(v * 100) / 100;
  const box = (el) => { const r = el.getBoundingClientRect(); return [r.x + scrollX, r.y + scrollY, r.width, r.height].map(r2); };
  const isWF = () => !!(window.__doPostBack || window.WebForm_PostBackOptions || document.getElementById('__VIEWSTATE'));

  const vis = (el) => {
    if (!el || !el.isConnected) return false;
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    if (!el.getClientRects().length) return false;
    const r = el.getBoundingClientRect();
    if (r.right + scrollX < 0 || r.bottom + scrollY < 0) return false; // parked off-screen (left:-9999px)
    if (r.width <= 1 && r.height <= 1) return false; // sr-only
    // survey/explore only (the capture's own flags stay as they were): content inside a closed accordion. The panel is
    // `height:0; overflow:hidden` (or max-height:0), its text still has a box, and without this it counts as visible before the
    // click, so "the answer appears" is never seen. Only a clipping ancestor with no height/width counts: off-screen carousel slides do not.
    if (window.__pw && window.__pw.stable && getComputedStyle(el).position !== 'fixed' && collapsed(el)) return false;
    return true;
  };
  const collapsed = (el) => {
    const memo = window.__pw && window.__pw._cm;
    const walk = (e) => {
      if (!e || e === document.body || e === document.documentElement) return false;
      if (memo && memo.has(e)) return memo.get(e);
      const cs = getComputedStyle(e);
      let r = false;
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') { const b = e.getBoundingClientRect(); r = b.height < 1 || b.width < 1; }
      if (!r) r = walk(e.parentElement);
      if (memo) memo.set(e, r);
      return r;
    };
    return walk(el);
  };

  const STYLE_PROPS = ['color', 'backgroundColor', 'backgroundImage', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius',
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textAlign', 'textDecorationLine', 'textTransform',
    'padding', 'margin', 'width', 'height', 'boxShadow', 'opacity', 'cursor', 'outline', 'outlineOffset'];
  const styleOf = (el) => { const cs = getComputedStyle(el), o = {}; for (const p of STYLE_PROPS) o[p] = cs[p]; return o; };

  // ---------- selectors: unique, preferring #id / data-testid / name ----------
  const makeSel = () => {
    const idc = new Map();
    for (const e of document.querySelectorAll('[id]')) idc.set(e.id, (idc.get(e.id) || 0) + 1);
    const memo = new Map();
    const sel = (el) => {
      if (memo.has(el)) return memo.get(el);
      let s;
      const tid = el.getAttribute && el.getAttribute('data-testid');
      if (el.id && idc.get(el.id) === 1) s = '#' + esc(el.id);
      else if (tid && document.querySelectorAll(`[data-testid="${esc(tid)}"]`).length === 1) s = `[data-testid="${esc(tid)}"]`;
      else if (/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(el.tagName) && el.name && !/^(radio|checkbox)$/.test(el.type) && document.getElementsByName(el.name).length === 1)
        s = `${el.tagName.toLowerCase()}[name="${esc(el.name)}"]`;
      else {
        const p = el.parentElement, tag = el.tagName.toLowerCase();
        if (!p || p === document.documentElement) s = tag;
        else {
          const same = [...p.children].filter((c) => c.tagName === el.tagName);
          const part = tag + (same.length > 1 ? `:nth-of-type(${same.indexOf(el) + 1})` : '');
          s = (p === document.body ? 'body' : sel(p)) + ' > ' + part;
        }
      }
      memo.set(el, s);
      return s;
    };
    return sel;
  };

  // ---------- WebForms ids: ClientID "ctl00_Main_txtName" -> server id "txtName" ----------
  // Naming-container prefixes come from name attributes ("ctl00$Main$txtName"), which use $ and never appear in server ids.
  const wfPrefixes = () => {
    const set = new Set();
    for (const el of document.querySelectorAll('[name*="$"]')) {
      const parts = el.getAttribute('name').split('$');
      for (let i = 1; i < parts.length; i++) set.add(parts.slice(0, i).join('_') + '_');
    }
    return [...set].sort((a, b) => b.length - a.length);
  };
  const serverId = (el, pre) => {
    if (el.id) { const p = pre.find((x) => el.id.startsWith(x) && el.id.length > x.length); return p ? el.id.slice(p.length) : el.id; }
    const n = el.getAttribute && el.getAttribute('name');
    return n && n.includes('$') ? n.split('$').pop() : '';
  };

  // ---------- event handlers we can see without CDP ----------
  const handlers = (el) => {
    const out = [];
    for (const a of el.getAttributeNames()) if (a.startsWith('on')) out.push(a);
    for (const k of Object.keys(el)) {
      if (k.startsWith('__reactProps$')) { const p = el[k] || {}; for (const n in p) if (/^on[A-Z]/.test(n) && typeof p[n] === 'function') out.push('react:' + n); }
      else if (k === '_vei' && el._vei) for (const n in el._vei) out.push('vue:' + n);
    }
    try { const jq = window.jQuery && jQuery._data && jQuery._data(el, 'events'); if (jq) for (const n in jq) out.push('jq:' + n); } catch {}
    if (el.__pwListen) for (const t of el.__pwListen) out.push('dom:' + t);
    return out;
  };
  const delegated = () => {
    const sels = [];
    try {
      if (window.jQuery && jQuery._data) for (const host of [document, document.body]) {
        const ev = jQuery._data(host, 'events');
        if (ev) for (const n in ev) for (const h of ev[n]) if (h.selector) sels.push(h.selector);
      }
    } catch {}
    return sels;
  };

  const INTERACTIVE = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[onclick],[onchange],[onmouseover],[onmousedown],' +
    '[role=button],[role=link],[role=tab],[role=checkbox],[role=radio],[role=switch],[role=menuitem],[role=option],[role=combobox],' +
    '[contenteditable=""],[contenteditable=true],[tabindex]:not([tabindex="-1"])';

  const kindOf = (el) => {
    const t = el.tagName, role = el.getAttribute('role');
    if (t === 'INPUT') {
      const type = el.type;
      if (type === 'checkbox') return 'checkbox';
      if (type === 'radio') return 'radio';
      if (/^(submit|button|image|reset)$/.test(type)) return 'button';
      if (type === 'file') return 'file';
      if (/^(range|color)$/.test(type)) return 'other';
      return 'text';
    }
    if (t === 'TEXTAREA' || (el.isContentEditable && el.hasAttribute('contenteditable'))) return 'text';
    if (t === 'SELECT') return 'select';
    if (role === 'checkbox' || role === 'switch') return 'checkbox';
    if (role === 'radio') return 'radio';
    if (role === 'combobox') return 'combobox';
    if (t === 'A' && el.hasAttribute('href')) return 'link';
    return 'button';
  };

  const labelOf = (el) => {
    // a hidden element has no innerText: join its text nodes with a space, as innerText would between blocks
    const flat = (x) => { const w = document.createTreeWalker(x, NodeFilter.SHOW_TEXT); const t = []; while (w.nextNode()) t.push(w.currentNode.nodeValue); return t.join(' '); };
    const tx = (x) => clean(x && (x.innerText || flat(x)));
    const by = el.getAttribute('aria-labelledby');
    if (by) { const t = clean(by.split(/\s+/).map((id) => tx(document.getElementById(id))).join(' ')); if (t) return cut(t, 80); }
    const al = el.getAttribute('aria-label');
    if (al) return cut(clean(al), 80);
    if (el.labels && el.labels.length) {
      const l = el.labels[0];
      const t = clean([...l.childNodes].filter((n) => !n.contains(el) && !(n.nodeType === 1 && n.matches('input,select,textarea'))).map((n) => n.textContent).join(' '));
      if (t) return cut(t, 80);
    }
    const role = el.getAttribute('role');
    if (/^(BUTTON|A|SUMMARY)$/.test(el.tagName) || /^(button|link|tab|menuitem|option)$/.test(role || '')) { const t = tx(el); if (t) return cut(t, 80); }
    if (el.tagName === 'INPUT' && /^(submit|button|reset)$/.test(el.type) && el.value) return cut(el.value, 80);
    if (el.tagName === 'INPUT' && el.type === 'image') return cut(el.alt || el.title || (el.src || '').split('/').pop(), 80);
    const img = el.querySelector && el.querySelector('img[alt]');
    if (img && img.alt) return cut(img.alt, 80);
    if (el.title) return cut(clean(el.title), 80);
    if (el.placeholder) return cut(el.placeholder, 80);
    const td = el.closest('td,th'); // legacy table layout: <td>Name:</td><td><input></td>
    if (td) { let p = td.previousElementSibling; while (p && !clean(p.innerText)) p = p.previousElementSibling; if (p) return cut(clean(p.innerText), 80); }
    let s = el.previousSibling;
    while (s && !clean(s.textContent)) s = s.previousSibling;
    if (s && clean(s.textContent).length < 60) return clean(s.textContent);
    return '';
  };

  // ---------- index: every element worth tracking, with a deterministic key ----------
  // key = WebForms server id / id / data-testid, else "<kind>-<label-slug>", made unique in document order.
  const index = () => {
    const pre = wfPrefixes(), deleg = delegated(), extra = window.__pw.extra || {};
    for (const [s, types] of Object.entries(extra)) { try { const e = document.querySelector(s); if (e) e.__pwListen = types; } catch {} }
    const out = [], used = new Map(), keyOf = new Map();
    if (!document.body) return out;
    // __pw.stable (set by survey/explore after the page loaded): an element keeps the key it first got for the life of
    // the page. Otherwise a dialog inserted before `button-3` renumbers every later button, and the before/after diff
    // of that action blames the wrong controls. The first snapshot after a load numbers exactly as without it.
    const memory = window.__pw.stable ? (window.__pw._keys ||= new WeakMap()) : null;
    const owned = new Set();
    if (memory) for (const el of document.body.querySelectorAll('*')) { const k = memory.get(el); if (k) owned.add(k); }
    for (const el of document.body.querySelectorAll('*')) {
      if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|LINK|META|BR)$/.test(el.tagName)) continue;
      if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) continue;
      if (el.tagName === 'INPUT' && el.type === 'hidden') continue; // __VIEWSTATE & co. live in webforms().hiddenFields
      const h = handlers(el);
      const clicky = h.some((x) => /click|mouse(down|up)|pointer(down|up)|touchstart/i.test(x));
      const interactive = el.matches(INTERACTIVE) || clicky || deleg.some((s) => { try { return el.matches(s); } catch { return false; } });
      const tracked = interactive || el.id || el.hasAttribute('data-testid') || el.hasAttribute('role') || el.hasAttribute('aria-expanded') ||
        /^(DIALOG|DETAILS|FORM|FIELDSET|TABLE)$/.test(el.tagName);
      if (!tracked) continue;
      const kind = interactive ? kindOf(el) : null;
      let base = serverId(el, pre) || el.getAttribute('data-testid') || '';
      if (!base) {
        const what = kind || el.getAttribute('role') || el.tagName.toLowerCase();
        const lbl = slug(kind ? labelOf(el) : (el.getAttribute('aria-label') || (el.textContent || '').slice(0, 80)));
        base = lbl ? `${what}-${lbl}` : what;
      }
      let key = memory && memory.get(el);
      if (!key) {
        let n = (used.get(base) || 0) + 1;
        key = n === 1 ? base : `${base}-${n}`;
        if (memory) while (owned.has(key) || used.has('key:' + key)) { n++; key = `${base}-${n}`; }
        used.set(base, n);
        if (memory) { used.set('key:' + key, 1); memory.set(el, key); owned.add(key); }
      } else used.set('key:' + key, 1);
      let p = el.parentElement, parentKey;
      while (p && !parentKey) { parentKey = keyOf.get(p); p = p.parentElement; }
      keyOf.set(el, key);
      out.push({ el, key, kind, parentKey, h });
    }
    return out;
  };

  // ---------- postback parsing ----------
  const parsePostback = (s) => {
    if (!s) return null;
    let m = s.match(/WebForm_PostBackOptions\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*(true|false)\s*,\s*"([^"]*)"/);
    if (m) return { target: m[1], arg: m[2], validate: m[3] === 'true', group: m[4] };
    m = s.match(/__doPostBack\(\s*\\?['"]([^'"\\]*)\\?['"]\s*,\s*\\?['"]([^'"\\]*)\\?['"]/);
    if (m) return { target: m[1], arg: m[2], validate: false, group: '' };
    return null;
  };
  const hrefKind = (el) => {
    const raw = el.getAttribute('href');
    if (raw == null) return 'none';
    if (/__doPostBack|WebForm_DoPostBack/.test(raw)) return 'postback';
    if (/^\s*javascript:/i.test(raw)) return 'js';
    if (raw === '' || raw.startsWith('#')) return 'anchor';
    try {
      const u = new URL(raw, location.href);
      if (!/^https?:$/.test(u.protocol)) return 'other';
      if (u.origin !== location.origin) return 'external';
      if (u.pathname === location.pathname && u.search === location.search) return 'anchor';
      return 'url';
    } catch { return 'js'; }
  };

  // ---------- controls: every interactive element, fully described ----------
  const controls = () => {
    const sel = makeSel();
    return index().filter((x) => x.kind).map(({ el, key, kind, parentKey, h }) => {
      const tag = el.tagName.toLowerCase();
      const onclick = el.getAttribute('onclick') || '', onchange = el.getAttribute('onchange') || '';
      const href = el.getAttribute('href') || '';
      let pb = parsePostback(href + ' ' + onclick);
      if (!pb && tag === 'input' && /^(submit|image)$/.test(el.type) && isWF() && el.name)
        pb = { target: el.name, arg: '', validate: !!(window.Page_Validators || []).length, group: '' };
      const apb = parsePostback(onchange);
      const cm = onclick.match(/confirm\(\s*(['"])((?:\\.|(?!\1).)*)\1/);
      const dataVal = {}, inline = {};
      for (const a of el.getAttributeNames()) {
        if (a.startsWith('data-val')) dataVal[a] = el.getAttribute(a);
        if (a.startsWith('on')) inline[a] = cut(el.getAttribute(a), 400);
      }
      const shown = vis(el);
      const c = {
        key, sel: sel(el), kind, tag, parent: parentKey,
        id: el.id || undefined, name: el.getAttribute('name') || undefined, type: el.type || el.getAttribute('type') || undefined,
        role: el.getAttribute('role') || undefined, testid: el.getAttribute('data-testid') || undefined,
        label: labelOf(el), text: cut(clean(el.innerText || ''), 120) || undefined,
        visible: shown, box: box(el),
        disabled: !!(el.disabled || el.classList.contains('aspNetDisabled') || el.getAttribute('aria-disabled') === 'true') || undefined,
        readOnly: el.readOnly || undefined,
        required: !!(el.required || el.getAttribute('aria-required') === 'true' || el.hasAttribute('data-val-required')) || undefined,
        maxlength: el.maxLength > 0 ? el.maxLength : undefined, minlength: el.minLength > 0 ? el.minLength : undefined,
        min: el.min || undefined, max: el.max || undefined, step: el.step || undefined, pattern: el.pattern || undefined,
        placeholder: el.placeholder || undefined, title: el.title || undefined, tabIndex: el.tabIndex, accessKey: el.accessKey || undefined,
        autocomplete: el.getAttribute('autocomplete') || undefined, multiple: el.multiple || undefined, accept: el.accept || undefined,
        hrefKind: kind === 'link' ? hrefKind(el) : undefined, href: kind === 'link' ? el.href : undefined, target: el.target || undefined,
        postback: pb || undefined, autoPostBack: apb || undefined, confirm: cm ? cm[2] : undefined,
        handlers: h.length ? h : undefined, inline: Object.keys(inline).length ? inline : undefined,
        dataVal: Object.keys(dataVal).length ? dataVal : undefined,
        style: shown ? styleOf(el) : undefined,
      };
      if (kind === 'checkbox' || kind === 'radio') {
        c.checked = el.checked ?? el.getAttribute('aria-checked') === 'true';
        c.group = el.getAttribute('name') || undefined;
        if (el.labels && el.labels[0]) c.labelSel = sel(el.labels[0]);
      }
      if (kind === 'select') {
        c.options = [...el.options].slice(0, 300).map((o) => ({ v: o.value, t: clean(o.text), s: o.selected || undefined, d: o.disabled || undefined }));
        c.optionCount = el.options.length;
      } else if (kind === 'text') c.value = ('value' in el ? (el.type === 'password' ? (el.value ? '***' : '') : cut(el.value, 300)) : cut(clean(el.textContent), 300)) || undefined;
      return c;
    });
  };

  // "same kind of thing" signature: tag + classes (digits folded) of the element and its two ancestors.
  // 40 product cards share one signature, so explore tests a few of them instead of all 40.
  const sigOf = (el) => {
    const part = (e) => (e ? e.tagName + '.' + (typeof e.className === 'string' ? e.className.split(/\s+/).filter(Boolean).map((c) => c.replace(/\d+/g, '#')).sort().join('.') : '') : '');
    const p = el.parentElement;
    return part(el) + '<' + part(p) + '<' + part(p && p.parentElement) + (el.getAttribute('role') ? '@' + el.getAttribute('role') : '');
  };
  // has a popup / panel behind it: never collapsed into a group
  const trigger = (el) => el.hasAttribute('aria-haspopup') || el.hasAttribute('aria-expanded') || el.hasAttribute('aria-controls') || el.tagName === 'SUMMARY';

  // ---------- snapshot: the state diffed before/after every action ----------
  // one snapshot = one layout state: the collapsed-ancestor answers are remembered for its duration only
  const snap = () => { window.__pw._cm = new Map(); try { return snapInner(); } finally { window.__pw._cm = null; } };
  const snapInner = () => {
    const sel = makeSel(), items = {};
    for (const { el, key, kind, parentKey } of index()) {
      const v = vis(el);
      const it = { v, s: sel(el) };
      if (parentKey) it.p = parentKey;
      if (v) it.b = box(el);
      if (kind) {
        it.i = kind;
        it.l = labelOf(el);
        it.g = sigOf(el);
        if (trigger(el)) it.x = 1;
        it.e = !(el.disabled || el.classList.contains('aspNetDisabled') || el.getAttribute('aria-disabled') === 'true');
        if (kind === 'checkbox' || kind === 'radio') {
          it.c = el.checked ?? el.getAttribute('aria-checked') === 'true';
          if (!v && el.labels && el.labels[0] && vis(el.labels[0])) it.ls = sel(el.labels[0]); // custom-styled box: click its label
        }
        if (kind === 'text' && 'value' in el) it.val = el.type === 'password' ? (el.value ? '***' : '') : cut(String(el.value), 100);
        if (kind === 'select') { it.val = el.value; it.opts = el.options.length + ':' + cut([...el.options].map((o) => o.text).join('|'), 200); }
      } else it.l = cut(clean((el.textContent || '').slice(0, 300)), 60);
      const cls = typeof el.className === 'string' ? el.className : '';
      if (cls) it.cls = cut(cls, 120);
      // own text of leaf-ish elements only (labels, messages, cells); containers would repeat every child's change
      if (kind !== 'select' && (el.childElementCount === 0 || (/^(A|BUTTON|LABEL|SPAN|TD|TH|LI|P|H[1-6]|DT|DD|LEGEND|CAPTION)$/.test(el.tagName) && el.childElementCount <= 3))) {
        const t = clean(el.textContent);
        if (t.length <= 200) it.t = t;
      }
      const ex = el.getAttribute('aria-expanded');
      if (ex) it.ex = ex;
      items[key] = it;
    }
    const texts = {}, seen = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n, count = 0;
    while ((n = walker.nextNode()) && count < 5000) {
      const t = clean(n.textContent), p = n.parentElement;
      if (!t || !p || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|OPTION)$/.test(p.tagName)) continue;
      let ok = seen.get(p);
      if (ok === undefined) seen.set(p, (ok = vis(p)));
      if (!ok) continue;
      const k = cut(t, 160);
      texts[k] = (texts[k] || 0) + 1;
      count++;
    }
    return { url: location.href, title: document.title, items, texts, h: document.documentElement.scrollHeight, y: Math.round(scrollY) };
  };

  // ---------- visual tree of <body>: boxes, style deltas, text runs, images, tables, controls ----------
  // Node: { t, box, key?, s?: style delta vs parent, runs?, k?: children, src/alt/nat, svg, rows, pseudo }
  const tree = () => {
    const idx = index(), keyOf = new Map(idx.map((x) => [x.el, x.key])), ctl = new Set(idx.filter((x) => x.kind).map((x) => x.el));
    const MAX = 8000;
    let count = 0;
    const INHERITED = ['color', 'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'textAlign', 'textTransform', 'letterSpacing', 'whiteSpace', 'listStyleType', 'wordSpacing'];
    const DEFAULTS = [['position', 'static'], ['float', 'none'], ['maxWidth', 'none'], ['margin', '0px'], ['padding', '0px'], ['backgroundColor', 'rgba(0, 0, 0, 0)'],
      ['backgroundImage', 'none'], ['borderRadius', '0px'], ['boxShadow', 'none'], ['textShadow', 'none'], ['opacity', '1'], ['transform', 'none'], ['filter', 'none'],
      ['objectFit', 'fill'], ['textDecorationLine', 'none'], ['cursor', 'auto'], ['overflow', 'visible'], ['zIndex', 'auto'], ['verticalAlign', 'baseline']];
    const FLEX = [['flexDirection', 'row'], ['flexWrap', 'nowrap'], ['justifyContent', 'normal'], ['alignItems', 'normal'], ['gap', 'normal'],
      ['gridTemplateColumns', 'none'], ['gridTemplateRows', 'none']];
    const VISUAL = ['backgroundColor', 'backgroundImage', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'boxShadow', 'borderRadius'];
    const KEEP = new Set(['header', 'nav', 'main', 'footer', 'section', 'article', 'aside', 'figure', 'figcaption', 'ul', 'ol', 'li', 'a', 'button',
      'form', 'fieldset', 'legend', 'label', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'tr', 'td', 'th', 'iframe']);
    const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'LINK', 'META']);
    const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
    const shown = (el, cs) => cs.display === 'contents' || (cs.display !== 'none' && cs.visibility !== 'hidden' && el.getClientRects().length > 0);

    const delta = (cs, p) => {
      const s = {};
      for (const k of INHERITED) if (!p || cs[k] !== p[k]) s[k] = cs[k];
      if (/flex|grid/.test(cs.display)) { s.display = cs.display; for (const [k, d] of FLEX) if (cs[k] !== d) s[k] = cs[k]; }
      else if (/inline-block|table|list-item/.test(cs.display)) s.display = cs.display;
      for (const [k, d] of DEFAULTS) if (cs[k] !== d) s[k] = cs[k];
      if (s.position) for (const k of ['top', 'right', 'bottom', 'left']) if (cs[k] !== 'auto') s[k] = cs[k];
      if (s.backgroundImage) Object.assign(s, { backgroundSize: cs.backgroundSize, backgroundPosition: cs.backgroundPosition, backgroundRepeat: cs.backgroundRepeat });
      for (const side of ['Top', 'Right', 'Bottom', 'Left'])
        if (cs[`border${side}Style`] !== 'none' && cs[`border${side}Width`] !== '0px') s[`border${side}`] = `${cs[`border${side}Width`]} ${cs[`border${side}Style`]} ${cs[`border${side}Color`]}`;
      if (s.textDecorationLine) Object.assign(s, { textDecorationColor: cs.textDecorationColor, textDecorationStyle: cs.textDecorationStyle });
      return s;
    };
    const pseudoOf = (el) => {
      const o = {};
      for (const p of ['::before', '::after']) {
        const c = getComputedStyle(el, p);
        if (!c.content || c.content === 'none' || c.content === 'normal') continue;
        o[p.slice(2)] = { content: c.content, font: c.fontFamily, size: c.fontSize, weight: c.fontWeight, color: c.color, display: c.display, w: c.width, h: c.height,
          bg: c.backgroundColor !== 'rgba(0, 0, 0, 0)' ? c.backgroundColor : undefined, bgImage: c.backgroundImage !== 'none' ? c.backgroundImage : undefined,
          border: c.borderTopStyle !== 'none' ? c.borderTop : undefined, position: c.position !== 'static' ? c.position : undefined };
      }
      return Object.keys(o).length ? o : undefined;
    };
    const kidsOf = (el) => {
      if (el.shadowRoot) return [...el.shadowRoot.childNodes];
      if (el.tagName === 'SLOT') { const a = el.assignedNodes({ flatten: true }); if (a.length) return a; }
      return [...el.childNodes];
    };
    const inline = (el) => { const d = getComputedStyle(el).display; return d === 'inline' || d === 'contents' || d === 'none' || el.tagName === 'BR' || (el.tagName === 'IMG' && el.width < 48); };
    // a block of inline text (links allowed, other controls not) becomes `runs`
    const isTextBlock = (el) => (!ctl.has(el) || /^(A|BUTTON|LABEL|SUMMARY)$/.test(el.tagName)) && !el.shadowRoot && !!(el.innerText || '').trim() &&
      [...el.querySelectorAll('*')].every((e) => inline(e) && (!ctl.has(e) || e.tagName === 'A'));

    const runs = (el, bcs) => {
      const out = [];
      const same = (a, b) => a.b === b.b && a.i === b.i && a.a === b.a && a.c === b.c && a.fs === b.fs && a.u === b.u && a.key === b.key;
      const push = (r) => { const last = out[out.length - 1]; if (last && last.x !== undefined && r.x !== undefined && same(last, r)) last.x += r.x; else out.push(r); };
      const walk = (node, f) => {
        for (const n of node.childNodes) {
          if (n.nodeType === 3) { const x = n.textContent.replace(/\s+/g, ' '); if (x) push({ x, ...f }); continue; }
          if (n.nodeType !== 1) continue;
          const cs = getComputedStyle(n);
          if (cs.display === 'none' || n.tagName === 'SCRIPT' || n.tagName === 'STYLE') continue;
          if (n.tagName === 'BR') { push({ x: '\n', ...f }); continue; }
          if (n.tagName === 'IMG') { out.push({ img: abs(n.currentSrc || n.src), alt: n.alt, w: n.width, h: n.height }); continue; }
          if (n instanceof SVGSVGElement) { const r = n.getBoundingClientRect(); out.push({ svg: cut(n.outerHTML, 50000), w: r2(r.width), h: r2(r.height) }); continue; }
          const g = { ...f };
          if (+cs.fontWeight >= 600 && +bcs.fontWeight < 600) g.b = 1;
          if (cs.fontStyle === 'italic' && bcs.fontStyle !== 'italic') g.i = 1;
          if (cs.color !== bcs.color) g.c = cs.color;
          if (cs.fontSize !== bcs.fontSize) g.fs = cs.fontSize;
          if (cs.textDecorationLine.includes('underline') !== bcs.textDecorationLine.includes('underline')) g.u = cs.textDecorationLine.includes('underline') ? 1 : 0;
          if (n.tagName === 'A' && n.hasAttribute('href')) { g.a = n.getAttribute('href'); if (keyOf.has(n)) g.key = keyOf.get(n); }
          walk(n, g);
        }
      };
      walk(el, {});
      const xs = out.filter((r) => r.x !== undefined);
      if (xs.length) { xs[0].x = xs[0].x.trimStart(); xs[xs.length - 1].x = xs[xs.length - 1].x.trimEnd(); }
      return out.filter((r) => r.img || r.svg || r.x);
    };

    // data grid (GridView, th-headed table) vs layout table (legacy pages lay out forms with tables: keep those as boxes)
    const dataTable = (el) => !el.querySelector('table') && (!!el.querySelector('th') || (el.rows.length >= 3 && new Set([...el.rows].map((r) => r.cells.length)).size <= 2));

    const node = (el, pcs, depth) => {
      if (count >= MAX || depth > 90 || SKIP.has(el.tagName)) return null;
      const cs = getComputedStyle(el);
      if (!shown(el, cs)) return null;
      const t = el instanceof SVGSVGElement ? 'svg' : el.tagName.toLowerCase();
      const n = { t };
      if (keyOf.has(el)) n.key = keyOf.get(el);
      const role = el.getAttribute('role'), label = el.getAttribute('aria-label') || el.getAttribute('title');
      const cls = (typeof el.className === 'string' ? el.className : el.getAttribute('class') || '').trim();
      if (role) n.role = role;
      if (label) n.label = cut(label, 120);
      if (el.id) n.id = el.id;
      if (cls) n.cls = cut(cls, 120);
      n.box = box(el);
      const s = delta(cs, pcs);
      if (Object.keys(s).length) n.s = s;
      const ps = pseudoOf(el);
      if (ps) n.pseudo = ps;
      count++;

      if (t === 'img') return Object.assign(n, { src: abs(el.currentSrc || el.src), alt: el.alt, nat: [el.naturalWidth, el.naturalHeight] });
      if (t === 'svg') return Object.assign(n, { svg: cut(el.outerHTML, 50000) });
      if (t === 'canvas') return n;
      if (['iframe', 'video', 'audio', 'embed', 'object'].includes(t)) return Object.assign(n, { src: abs(el.currentSrc || el.src || el.data || ''), poster: el.poster || undefined });
      if (['input', 'select', 'textarea'].includes(t)) return Object.assign(n, {
        type: el.type, name: el.getAttribute('name') || undefined, placeholder: el.placeholder || undefined,
        value: ['password', 'hidden'].includes(el.type) || t === 'select' ? undefined : el.value || undefined,
        checked: /^(checkbox|radio)$/.test(el.type) ? el.checked : undefined, disabled: el.disabled || undefined,
        options: t === 'select' ? [...el.options].slice(0, 100).map((o) => (o.selected ? '* ' : '') + clean(o.text)) : undefined,
      });
      if (t === 'table' && dataTable(el)) {
        const cellInfo = (c) => {
          const o = { x: clean(c.innerText) };
          if (c.tagName === 'TH') o.h = 1;
          if (c.colSpan > 1) o.cs = c.colSpan;
          if (c.rowSpan > 1) o.rs = c.rowSpan;
          const keys = [...c.querySelectorAll('*')].filter((e) => ctl.has(e)).map((e) => keyOf.get(e));
          if (keys.length) o.k = keys;
          const im = c.querySelector('img');
          if (im) o.img = abs(im.currentSrc || im.src);
          return o;
        };
        n.rowCount = el.rows.length;
        n.rows = [...el.rows].slice(0, 60).map((r) => [...r.cells].map(cellInfo));
        const th = el.querySelector('th'), td = el.querySelector('td');
        n.cellStyle = { th: th ? delta(getComputedStyle(th), cs) : undefined, td: td ? delta(getComputedStyle(td), cs) : undefined };
        n.rowStyle = [...el.rows].slice(0, 5).map((r) => { const rc = getComputedStyle(r); return { bg: rc.backgroundColor, color: rc.color, cls: r.className || undefined }; });
        return n;
      }
      if (t === 'a' && el.hasAttribute('href')) n.href = el.getAttribute('href');
      if (isTextBlock(el)) { n.runs = runs(el, cs); return n.runs.length ? n : null; }

      const kids = [];
      for (const c of kidsOf(el)) {
        if (c.nodeType === 3) { const x = c.textContent.trim().replace(/\s+/g, ' '); if (x) kids.push({ t: '#text', runs: [{ x }] }); }
        else if (c.nodeType === 1) { const k = node(c, cs, depth + 1); if (k) kids.push(k); }
      }
      if (kids.length) n.k = kids;
      const visual = !!n.s && VISUAL.some((k) => k in n.s);
      if (!kids.length && !visual && !n.key && !ps && !['a', 'button', 'hr', 'td', 'th'].includes(t) && !role) { count--; return null; }
      const ownLayout = !!n.s && Object.keys(n.s).some((k) => !INHERITED.includes(k));
      if (kids.length === 1 && !ownLayout && !KEEP.has(t) && !role && !label && !n.key && !ps && kids[0].t !== '#text') {
        const k = kids[0];
        if (n.s) k.s = { ...n.s, ...k.s };
        count--;
        return k;
      }
      return n;
    };
    return { viewport: [innerWidth, innerHeight], doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight], truncated: count >= MAX, body: node(document.body, null, 0) };
  };

  // ---------- page-level facts and design tokens ----------
  const scrape = () => {
    const tally = (m, k, w) => { if (k && w > 0) m[k] = (m[k] || 0) + w; };
    const text = {}, bg = {}, fonts = {}, sizes = {}, borders = {}, radii = {};
    for (const el of document.body.querySelectorAll('*')) {
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('').length;
      if (own) { tally(text, s.color, own); tally(fonts, s.fontFamily, own); tally(sizes, `${s.fontSize} / ${s.fontWeight} / lh ${s.lineHeight}`, own); }
      const r = el.getBoundingClientRect(), area = Math.round((r.width * r.height) / 1000);
      if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') tally(bg, s.backgroundColor, area);
      if (s.borderTopStyle !== 'none' && s.borderTopWidth !== '0px') tally(borders, s.borderTop, 1);
      if (s.borderRadius !== '0px') tally(radii, s.borderRadius, 1);
    }
    const top = (m, n = 16) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n).map(([v, w]) => ({ v, w }));
    const dt = document.doctype;
    const anyKey = (re) => { for (const e of [...document.querySelectorAll('body, body *')].slice(0, 400)) if (Object.keys(e).some((k) => re.test(k))) return true; return false; };
    return {
      url: location.href, title: document.title, lang: document.documentElement.lang || null, charset: document.characterSet,
      doctype: dt ? `<!DOCTYPE ${dt.name}${dt.publicId ? ` PUBLIC "${dt.publicId}"` : ''}${dt.systemId ? ` "${dt.systemId}"` : ''}>` : null,
      compatMode: document.compatMode, viewport: [innerWidth, innerHeight], dpr: devicePixelRatio,
      doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      meta: { description: document.querySelector('meta[name=description]')?.content ?? null, viewport: document.querySelector('meta[name=viewport]')?.content ?? null,
        favicon: document.querySelector('link[rel~=icon]')?.href ?? null },
      framework: {
        webforms: isWF(), aspnetAjax: !!(window.Sys && window.Sys.Application), mvcUnobtrusive: !!document.querySelector('[data-val=true]'),
        react: anyKey(/^__react(Fiber|Props|Container)/), vue: !!(window.__VUE__ || document.querySelector('[data-v-app]')) || anyKey(/^__vue/),
        angular: !!(window.ng || document.querySelector('[ng-version],[ng-app],.ng-scope')), jquery: window.jQuery ? (window.jQuery.fn.jquery || true) : false,
        bootstrap: !!document.querySelector('link[href*=bootstrap],script[src*=bootstrap]'),
      },
      headings: [...document.querySelectorAll('h1,h2,h3,h4')].filter(vis).map((h) => ({ level: +h.tagName[1], text: cut(clean(h.innerText), 120) })),
      tokens: { text: top(text), bg: top(bg), fonts: top(fonts), sizes: top(sizes, 24), borders: top(borders), radii: top(radii, 8) },
      fonts: [...new Map([...document.fonts].filter((f) => f.status === 'loaded')
        .map((f) => [`${f.family}|${f.weight}|${f.style}`, { family: f.family.replace(/["']/g, ''), weight: f.weight, style: f.style }])).values()],
      body: styleOf(document.body), html: { bg: getComputedStyle(document.documentElement).backgroundColor, fontSize: getComputedStyle(document.documentElement).fontSize },
      inlineScripts: [...document.scripts].filter((s) => !s.src && s.textContent.trim()).map((s) => s.textContent),
      inlineStyles: [...document.querySelectorAll('style')].map((s) => s.textContent).filter((s) => s.trim()),
      scripts: [...document.scripts].filter((s) => s.src).map((s) => s.src),
      stylesheets: [...document.querySelectorAll('link[rel~=stylesheet]')].map((l) => l.href),
    };
  };

  // ---------- WebForms / ASP.NET AJAX specifics (empty lists on other pages) ----------
  const webforms = () => {
    const keyOf = new Map(index().map((x) => [x.el, x.key]));
    const TYPE = { RequiredFieldValidatorEvaluateIsValid: 'required', RegularExpressionValidatorEvaluateIsValid: 'regex', RangeValidatorEvaluateIsValid: 'range',
      CompareValidatorEvaluateIsValid: 'compare', CustomValidatorEvaluateIsValid: 'custom' };
    // classic validators keep settings as expandos (v.controltovalidate); unobtrusive ones as data-val-* attributes
    const attr = (v, n) => {
      const x = v[n];
      if (typeof x === 'function') return x.name;
      if (x != null && typeof x !== 'object') return x;
      const a = v.getAttribute('data-val-' + n.toLowerCase());
      return a ?? undefined;
    };
    const byId = (id) => { const e = id && document.getElementById(id); return e ? keyOf.get(e) : undefined; };
    const validators = (window.Page_Validators || []).map((v) => {
      const fn = attr(v, 'evaluationfunction') || '', target = attr(v, 'controltovalidate');
      return {
        id: v.id, key: keyOf.get(v), target, targetKey: byId(target), type: TYPE[fn] || fn, message: attr(v, 'errormessage'), text: clean(v.textContent) || undefined,
        display: attr(v, 'display') || 'Static', group: attr(v, 'validationGroup') ?? '', enabled: v.enabled !== false,
        expression: attr(v, 'validationexpression'), min: attr(v, 'minimumvalue'), max: attr(v, 'maximumvalue'), dataType: attr(v, 'type'),
        compareTo: attr(v, 'controltocompare'), compareToKey: byId(attr(v, 'controltocompare')), valueToCompare: attr(v, 'valuetocompare'), operator: attr(v, 'operator'),
        initialValue: attr(v, 'initialvalue'), clientFunction: attr(v, 'clientvalidationfunction'), focusOnError: attr(v, 'focusOnError'),
        color: getComputedStyle(v).color,
      };
    });
    // DevExpress editors keep rules client-side in validationPatterns: no pattern = required, pattern = regex
    try {
      ASPxClientControl.GetControlCollection().ForEachControl((c) => {
        if (!c.validationPatterns?.length && !c.customValidationEnabled) return;
        const el = document.getElementById(c.name + '_I') || document.getElementById(c.name), targetKey = el ? keyOf.get(el) : undefined;
        const base = { target: c.name, targetKey, display: c.display, group: c.validationGroup || '', enabled: true, source: 'devexpress' };
        const pats = c.validationPatterns || [];
        pats.forEach((p) => { const type = p.pattern ? 'regex' : 'required'; validators.push({ ...base, id: `${targetKey || c.name}:${type}`, type, message: p.errorText, expression: p.pattern }); });
        if (!pats.length) validators.push({ ...base, id: `${targetKey || c.name}:custom`, type: 'custom', message: c.errorText });
      });
    } catch {}
    const summaries = (window.Page_ValidationSummaries || []).map((s) => ({ id: s.id, key: keyOf.get(s), headerText: attr(s, 'headertext'), showMessageBox: attr(s, 'showmessagebox'),
      showSummary: attr(s, 'showsummary'), displayMode: attr(s, 'displaymode'), group: attr(s, 'validationGroup') ?? '' }));
    let updatePanels = null;
    try {
      const prm = Sys.WebForms.PageRequestManager.getInstance();
      updatePanels = { ids: prm._updatePanelClientIDs || prm._updatePanelIDs, asyncTriggers: prm._asyncPostBackControlClientIDs || prm._asyncPostBackControlIDs,
        postBackTriggers: prm._postBackControlClientIDs || prm._postBackControlIDs, childrenAsTriggers: prm._updatePanelHasChildrenAsTriggers };
    } catch {}
    let components = [];
    try {
      if (window.Sys && Sys.Application) components = Sys.Application.getComponents().map((c) => {
        let type = '', el;
        try { type = (c.getType && c.getType().getName()) || ''; } catch {}
        const props = {};
        for (const k in c) {
          if (!/^get_/.test(k) || typeof c[k] !== 'function' || c[k].length) continue;
          try { const v = c[k](); if (v == null || ['string', 'number', 'boolean'].includes(typeof v)) props[k.slice(4)] = v; else if (v && v.tagName) props[k.slice(4)] = '#' + (v.id || v.tagName); } catch {}
        }
        try { el = c.get_element && c.get_element(); } catch {}
        return { id: c.get_id ? c.get_id() : undefined, type, element: el ? el.id : undefined, elementKey: el ? keyOf.get(el) : undefined, props };
      });
    } catch {}
    const grids = {};
    for (const el of document.querySelectorAll('[href*="__doPostBack"],[onclick*="__doPostBack"],[href*="WebForm_PostBackOptions"]')) {
      const pb = parsePostback((el.getAttribute('href') || '') + ' ' + (el.getAttribute('onclick') || ''));
      const m = pb && pb.arg.match(/^(Page|Sort|Edit|Delete|Select|Update|Cancel|New|Insert|Expand|Collapse)\$(.*)$/);
      if (m) ((grids[pb.target] ||= {})[m[1]] ||= []).push(m[2]);
    }
    const hiddenFields = [...document.querySelectorAll('input[type=hidden]')].map((h) => ({ name: h.name, id: h.id || undefined, size: h.value.length,
      value: /^__(VIEWSTATE|EVENTVALIDATION|VIEWSTATEGENERATOR|PREVIOUSPAGE|VIEWSTATEENCRYPTED)/.test(h.name) || h.value.length > 120 ? undefined : h.value }));
    const defaultButtons = [...document.querySelectorAll('[onkeypress*="WebForm_FireDefaultButton"]')].map((el) => {
      const m = el.getAttribute('onkeypress').match(/WebForm_FireDefaultButton\(\s*event\s*,\s*'([^']+)'/);
      return { container: keyOf.get(el), button: m && m[1], buttonKey: m ? byId(m[1]) : undefined };
    });
    const forms = [...document.forms].map((f, i) => ({ index: i, id: f.id || undefined, key: keyOf.get(f), action: f.getAttribute('action'), method: (f.method || 'get').toUpperCase(),
      enctype: f.enctype, fields: [...f.elements].map((e) => keyOf.get(e)).filter(Boolean) }));
    return { isWebForms: isWF(), validators, summaries, updatePanels, components, grids, hiddenFields, defaultButtons, forms };
  };

  // ---------- CSS rules for interaction states, mapped to the controls they style ----------
  const pseudo = () => {
    const STATE = /:(hover|focus|focus-visible|focus-within|active|disabled|checked|visited|placeholder-shown|invalid)\b|::placeholder|\.aspNetDisabled|\[disabled\]/;
    const STRIP = /::?(hover|focus-visible|focus-within|focus|active|disabled|checked|visited|placeholder-shown|placeholder|invalid)\b(\([^)]*\))?/g;
    const rules = [], sheets = [];
    const walk = (list, href) => {
      for (const r of list) {
        if (r.cssRules && !r.selectorText) { walk(r.cssRules, href); continue; }
        if (r.selectorText && STATE.test(r.selectorText)) rules.push({ selector: r.selectorText, css: r.style.cssText, sheet: href });
      }
    };
    for (const s of document.styleSheets) {
      let list;
      try { list = s.cssRules; } catch { sheets.push({ href: s.href, blocked: true }); continue; }
      sheets.push({ href: s.href || 'inline', rules: list.length });
      walk(list, s.href || 'inline');
    }
    const ctls = index().filter((x) => x.kind && vis(x.el)), byKey = {};
    rules.slice(0, 3000).forEach((r, i) => {
      for (const part of r.selector.split(',')) {
        const base = part.replace(STRIP, '').trim() || '*';
        for (const x of ctls) { let m = false; try { m = x.el.matches(base); } catch {} if (m) (byKey[x.key] ||= new Set()).add(i); }
      }
    });
    return { sheets, rules: rules.slice(0, 3000), byKey: Object.fromEntries(Object.entries(byKey).map(([k, v]) => [k, [...v]])) };
  };

  // looks clickable (cursor:pointer) but isn't interactive by markup: Node checks these for listeners via CDP
  const pointerCandidates = () => {
    const sel = makeSel(), ctl = new Set(index().filter((x) => x.kind).map((x) => x.el)), out = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (out.length >= 300) break;
      if (ctl.has(el) || (el instanceof SVGElement && !(el instanceof SVGSVGElement))) continue;
      if (getComputedStyle(el).cursor !== 'pointer') continue;
      if (el.parentElement && getComputedStyle(el.parentElement).cursor === 'pointer') continue; // only the outermost
      if (el.closest('a[href],button') || !vis(el)) continue;
      out.push(sel(el));
    }
    return out;
  };

  // non-control elements worth hovering: CSS-only dropdowns (`li:hover ul`) and cursor:pointer elements
  const hoverTargets = () => {
    const sel = makeSel(), ctl = new Set(index().filter((x) => x.kind).map((x) => x.el)), out = new Set();
    const strong = new Set(); // matched by a CSS `x:hover y` rule: a real signal, not just cursor:pointer
    const add = (el, hard) => { if (el && !ctl.has(el) && vis(el)) { out.add(el); if (hard) strong.add(el); } };
    const walk = (list) => {
      for (const r of list) {
        if (r.cssRules && !r.selectorText) { walk(r.cssRules); continue; }
        if (!r.selectorText || !r.selectorText.includes(':hover')) continue;
        for (const part of r.selectorText.split(',')) {
          const m = part.match(/^(.*?):hover\s*[>+~ ]\s*[^\s,]/); // the :hover changes something else
          if (m) { try { document.querySelectorAll(m[1].trim() || '*').forEach((e) => add(e, true)); } catch {} }
        }
      }
    };
    for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
    for (const s of pointerCandidates()) { try { add(document.querySelector(s)); } catch {} }
    const own = (el) => clean([...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ')) || clean(el.textContent);
    return [...out].slice(0, 120).map((el) => ({ sel: sel(el), label: cut(own(el), 40), g: sigOf(el), strong: strong.has(el) || trigger(el) }));
  };

  // fields a submit button most likely submits: those in its nearest ancestor that has any
  const scopeFields = (s) => {
    const b = document.querySelector(s);
    if (!b) return [];
    const fields = index().filter((x) => (x.kind === 'text' || x.kind === 'select') && vis(x.el) && !x.el.disabled && !x.el.readOnly);
    for (let a = b.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const inside = fields.filter((f) => a.contains(f.el));
      if (inside.length) return inside.slice(0, 40).map((f) => f.key);
    }
    return [];
  };

  const styleFor = (s) => { const e = document.querySelector(s); return e ? styleOf(e) : null; };
  const validate = (group) => {
    let ok = null;
    if (typeof window.Page_ClientValidate === 'function') ok = window.Page_ClientValidate(group);
    try { const dx = ASPxClientEdit.ValidateGroup(group || null); ok = ok === null ? dx : ok && dx; } catch {}
    return ok;
  };

  // ======================= v2: freeze, bands, used CSS, motion =======================
  const SKIPTAG = /^(SCRIPT|STYLE|LINK|META|NOSCRIPT|TEMPLATE|HEAD|TITLE|BR|PATH|G|DEFS|USE)$/;
  const plain = (o, keys) => {
    const r = {};
    for (const k of keys) { if (!o || !(k in o) || typeof o[k] === 'function') continue; try { r[k] = JSON.parse(JSON.stringify(o[k], (_, v) => (typeof v === 'function' || v instanceof Node ? undefined : v))); } catch {} }
    return r;
  };

  // carousels back to slide 0 with autoplay off; CSS animations parked (infinite -> start, finite -> end state)
  const freezeDom = () => {
    const info = { swiper: 0, slick: 0, owl: 0, animations: 0 };
    for (const el of document.querySelectorAll('.swiper, .swiper-container')) {
      const s = el.swiper;
      if (!s) continue;
      try { if (s.autoplay && s.autoplay.stop) s.autoplay.stop(); s.params.loop ? s.slideToLoop(0, 0) : s.slideTo(0, 0); info.swiper++; } catch {}
    }
    const $ = window.jQuery;
    if ($) {
      try { $('.slick-initialized').each(function () { try { $(this).slick('slickPause'); $(this).slick('slickGoTo', 0, true); info.slick++; } catch {} }); } catch {}
      try { $('.owl-loaded').each(function () { try { $(this).trigger('stop.owl.autoplay'); $(this).trigger('to.owl.carousel', [0, 0, true]); info.owl++; } catch {} }); } catch {}
    }
    for (const a of document.getAnimations()) {
      try { const t = a.effect.getComputedTiming(); if (t.iterations === Infinity) { a.pause(); a.currentTime = 0; } else a.finish(); info.animations++; } catch {}
    }
    return info;
  };

  // fixed headers / stuck sticky bars would repeat in every scroll shot: hide them after the first.
  // cookie/consent banners and modal dialogs cover the page: hide them in every shot. first === null: only restore.
  const hideOverlays = (first) => {
    for (const el of document.querySelectorAll('[data-pw-hid]')) { const v = el.getAttribute('data-pw-hid'); v ? el.style.setProperty('visibility', v) : el.style.removeProperty('visibility'); el.removeAttribute('data-pw-hid'); }
    if (first === null) return 0;
    let n = 0;
    for (const el of document.body.querySelectorAll('*')) {
      const cs = getComputedStyle(el), p = cs.position;
      if ((p !== 'fixed' && p !== 'sticky') || !el.getClientRects().length) continue;
      const banner = el.getAttribute('role') === 'dialog' || el.getAttribute('aria-modal') === 'true' || /cookie|consent|gdpr/i.test((el.textContent || '').slice(0, 600));
      if (first && !banner) continue;
      if (!banner && p === 'sticky' && Math.abs(el.getBoundingClientRect().top - (parseFloat(cs.top) || 0)) > 1.5) continue; // only while stuck
      el.setAttribute('data-pw-hid', el.style.getPropertyValue('visibility'));
      el.style.setProperty('visibility', 'hidden', 'important');
      n++;
    }
    return n;
  };

  // app shells (100vh layout, content scrolls inside a div): the window never scrolls, so the photos would only show the
  // first screen. Let the biggest inner scroller grow to its full height so the page scrolls like a document.
  const expandScroller = () => {
    const H = innerHeight;
    if (document.documentElement.scrollHeight > H + 10) return null;
    let best = null, extra = 50;
    for (const el of document.body.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (!/(auto|scroll)/.test(cs.overflowY) || el.clientHeight < H * 0.4) continue;
      if (el.scrollHeight - el.clientHeight > extra) { best = el; extra = el.scrollHeight - el.clientHeight; }
    }
    if (!best) return null;
    const from = best.clientHeight, to = best.scrollHeight;
    for (let el = best; el && el !== document.documentElement; el = el.parentElement)
      for (const [k, v] of [['height', 'auto'], ['max-height', 'none'], ['overflow', 'visible']]) el.style.setProperty(k, v, 'important');
    for (const el of [document.documentElement, document.body]) for (const [k, v] of [['height', 'auto'], ['overflow', 'visible']]) el.style.setProperty(k, v, 'important');
    return { sel: makeSel()(best), from, to };
  };

  // top-level bands of the page (same walk facts.md uses): what the section crops are cut along
  const bands = () => {
    const ok = (k) => !SKIPTAG.test(k.tagName) && k.getClientRects().length && k.getBoundingClientRect().height > 2 && getComputedStyle(k).position !== 'fixed';
    let root = document.body;
    for (;;) { const kids = [...root.children].filter(ok); if (kids.length === 1 && kids[0].children.length) root = kids[0]; else break; }
    const docH = document.documentElement.scrollHeight, tall = Math.max(1200, docH * 0.25);
    // a band taller than `tall` is opened up: its only-child wrappers are peeled, a band with several children is replaced by them
    const expand = (el, depth) => {
      if (el.getBoundingClientRect().height <= tall || depth > 8) return [el];
      const kids = [...el.children].filter(ok);
      if (kids.length === 1) return expand(kids[0], depth + 1);
      return kids.length ? kids.flatMap((k) => expand(k, depth + 1)) : [el];
    };
    const list = [...root.children].filter(ok).flatMap((k) => expand(k, 0));
    const sel = makeSel();
    return list.map((el) => {
      const b = box(el), h = el.querySelector('h1,h2,h3,h4');
      const cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\s+/)[0] || '';
      return { sel: sel(el), tag: el.tagName.toLowerCase(), id: el.id || '', cls, x: b[0], y: b[1], w: b[2], h: b[3], label: slug(el.id || (h && h.textContent) || clean(el.textContent).slice(0, 30) || cls || el.tagName) || el.tagName.toLowerCase() };
    }).filter((b) => b.h >= 20).sort((a, b) => a.y - b.y);
  };

  // CSS the page really uses: every rule whose selector matches some element (state pseudo-classes and
  // pseudo-elements are stripped before matching, so :hover / ::before rules of existing elements are kept)
  const usedCss = () => {
    const STRIP = /::?(before|after|first-line|first-letter|selection|marker|placeholder|backdrop|file-selector-button|-[\w-]+)(\([^)]*\))?/g;
    const STATE = /:(hover|focus-visible|focus-within|focus|active|visited|link|any-link|target|checked|disabled|enabled|placeholder-shown|invalid|valid|indeterminate|fullscreen|-[\w-]+)(?![\w-])/g;
    const cache = new Map();
    // stripping the state out of `:not(:focus)` leaves `:not()`, which throws and would drop the rule
    const EMPTY = /:(?:not|is|where|has)\(\s*\)/g;
    const bare = (s) => s.replace(STRIP, '').replace(STATE, '').replace(EMPTY, '').trim();
    const one = (s) => { s = bare(s); if (!s || /[>+~]$/.test(s)) s += '*'; try { return !!document.querySelector(s); } catch { return false; } };
    const match = (sel) => {
      if (cache.has(sel)) return cache.get(sel);
      let r;
      try { r = !!document.querySelector(bare(sel) || '*'); } catch { r = sel.split(/,(?![^(]*\))/).some(one); }
      cache.set(sel, r);
      return r;
    };
    const kf = [], stats = { rules: 0, kept: 0 }, blocked = [];
    const walk = (list) => {
      const res = [];
      for (const r of list) {
        stats.rules++;
        if (r.type === 1) { if (match(r.selectorText)) { res.push(r.cssText); stats.kept++; } }
        else if (r.type === 7) kf.push({ name: r.name, css: r.cssText });
        else if (r.type === 3) {
          // @import: the imported sheet is not in document.styleSheets, its rules are only reachable through this rule
          // (a site's header/footer styles often live there). Cross-origin ones are listed as blocked, like any other sheet
          const imp = r.styleSheet;
          let inner;
          try { inner = imp ? walk(imp.cssRules) : []; } catch { blocked.push((imp && imp.href) || r.href); continue; }
          if (inner.length) { const mq = r.media && r.media.mediaText; res.push(mq && mq !== 'all' ? `@media ${mq} {\n${inner.join('\n')}\n}` : inner.join('\n')); }
        }
        else if (r.type === 5 || r.type === 10 || !r.cssRules) res.push(r.cssText);
        else { const inner = walk(r.cssRules); if (inner.length) res.push(r.cssText.slice(0, r.cssText.indexOf('{')).trim() + ' {\n' + inner.join('\n') + '\n}'); }
      }
      return res;
    };
    const sheets = [];
    for (const s of [...document.styleSheets, ...(document.adoptedStyleSheets || [])]) {
      let list;
      try { list = s.cssRules; } catch { blocked.push(s.href); continue; }
      const text = walk(list);
      sheets.push({ href: s.href || 'inline', rules: list.length, text: text.join('\n') });
    }
    const all = sheets.map((s) => s.text).join('\n');
    const keyframes = kf.filter((k) => new RegExp('(^|[^\\w-])' + k.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^\\w-]|$)').test(all)).map((k) => ({ name: k.name, css: cut(k.css, 4000) }));
    return { sheets, blocked, keyframes, stats };
  };

  // static motion facts: CSS animation/transition setup, carousel libraries' own config, counters, animation hints
  const motionStatic = () => {
    const sel = makeSel(), out = { sliders: [], counters: [], cssAnimations: [], transitions: [], running: [], hints: [] };
    const els = [...document.body.querySelectorAll('*')].filter((e) => !SKIPTAG.test(e.tagName) && e.getClientRects().length).slice(0, 6000);
    for (const el of document.querySelectorAll('.swiper, .swiper-container')) {
      const s = el.swiper;
      if (!s) continue;
      const p = s.params || {};
      out.sliders.push({ lib: 'swiper', sel: sel(el), box: box(el), slides: s.slides ? s.slides.length : undefined, realSlides: s.slides ? [...s.slides].filter((x) => !x.classList.contains('swiper-slide-duplicate')).length : undefined,
        params: plain(p, ['slidesPerView', 'slidesPerGroup', 'spaceBetween', 'loop', 'speed', 'effect', 'direction', 'centeredSlides', 'freeMode', 'autoHeight', 'breakpoints']),
        autoplay: p.autoplay && typeof p.autoplay === 'object' ? plain(p.autoplay, ['delay', 'disableOnInteraction', 'pauseOnMouseEnter', 'reverseDirection', 'stopOnLastSlide']) : !!p.autoplay });
    }
    const $ = window.jQuery;
    if ($) {
      try { $('.slick-initialized').each(function () { const o = $(this).slick('getSlick').options; out.sliders.push({ lib: 'slick', sel: sel(this), box: box(this), params: plain(o, ['autoplay', 'autoplaySpeed', 'slidesToShow', 'slidesToScroll', 'speed', 'infinite', 'fade', 'arrows', 'dots', 'pauseOnHover', 'centerMode', 'variableWidth', 'cssEase', 'vertical', 'rtl', 'responsive']) }); }); } catch {}
      try { $('.owl-loaded').each(function () { const o = ($(this).data('owl.carousel') || {}).options; if (o) out.sliders.push({ lib: 'owl', sel: sel(this), box: box(this), params: plain(o, ['items', 'loop', 'autoplay', 'autoplayTimeout', 'smartSpeed', 'margin', 'nav', 'dots', 'responsive']) }); }); } catch {}
    }
    for (const el of document.querySelectorAll('marquee')) out.sliders.push({ lib: 'marquee-tag', sel: sel(el), box: box(el), params: { behavior: el.getAttribute('behavior'), direction: el.getAttribute('direction'), scrollamount: el.getAttribute('scrollamount'), scrolldelay: el.getAttribute('scrolldelay') } });
    for (const el of document.querySelectorAll('.elementor-counter-number, [data-to-value], [data-count], [data-target], [data-purecounter-end], .counter-number, .odometer, .counter')) {
      if (!el.getClientRects().length) continue;
      const data = {};
      for (const a of el.attributes) if (a.name.startsWith('data-')) data[a.name] = cut(a.value, 80);
      out.counters.push({ sel: sel(el), box: box(el), text: clean(el.textContent), data });
    }
    const groups = new Map(), trans = new Map();
    for (const el of els) {
      const cs = getComputedStyle(el);
      if (cs.animationName !== 'none') {
        const k = [cs.animationName, cs.animationDuration, cs.animationDelay, cs.animationIterationCount, cs.animationTimingFunction, cs.animationFillMode, cs.animationDirection].join('|');
        const g = groups.get(k) || { name: cs.animationName, duration: cs.animationDuration, delay: cs.animationDelay, iterations: cs.animationIterationCount, easing: cs.animationTimingFunction, fill: cs.animationFillMode, direction: cs.animationDirection, count: 0, samples: [], box: box(el) };
        g.count++; if (g.samples.length < 3) g.samples.push(sel(el)); groups.set(k, g);
      }
      if (cs.transitionDuration.split(',').some((d) => parseFloat(d) > 0)) {
        const k = [cs.transitionProperty, cs.transitionDuration, cs.transitionTimingFunction, cs.transitionDelay].join('|');
        const g = trans.get(k) || { property: cs.transitionProperty, duration: cs.transitionDuration, easing: cs.transitionTimingFunction, delay: cs.transitionDelay, count: 0, samples: [] };
        g.count++; if (g.samples.length < 4) g.samples.push(sel(el)); trans.set(k, g);
      }
      if (out.hints.length < 60) {
        const a = {};
        for (const at of el.attributes) {
          if (/^data-(aos|wow|animation|animate|animated|delay|duration|parallax|scroll|speed|ticker|marquee)/.test(at.name)) a[at.name] = cut(at.value, 60);
          else if (at.name === 'data-settings' && /animation|autoplay|speed|duration|delay|slide|loop|ticker|marquee|effect|parallax|scrolling|sticky/i.test(at.value)) {
            try { const j = JSON.parse(at.value), keep = {}; for (const [kk, v] of Object.entries(j)) if (/animation|autoplay|speed|duration|delay|slide|loop|ticker|marquee|effect|parallax|scrolling|sticky/i.test(kk) && v !== '' && v !== false) keep[kk] = v; if (Object.keys(keep).length) a['data-settings'] = keep; } catch {}
          }
        }
        if (Object.keys(a).length) out.hints.push({ sel: sel(el), attrs: a });
      }
    }
    out.cssAnimations = [...groups.values()].sort((a, b) => b.count - a.count).slice(0, 40);
    out.transitions = [...trans.values()].sort((a, b) => b.count - a.count).slice(0, 40);
    for (const a of document.getAnimations().slice(0, 200)) {
      try {
        const t = a.effect && a.effect.target, ct = a.effect.getComputedTiming();
        if (!t || !t.getClientRects || (ct.progress === null && a.playState === 'finished')) continue;
        out.running.push({ type: a.constructor.name, name: a.animationName || a.transitionProperty || a.id || '', sel: sel(t), state: a.playState,
          timing: { duration: ct.duration, delay: ct.delay, iterations: ct.iterations === Infinity ? 'infinite' : ct.iterations, direction: ct.direction, easing: ct.easing },
          keyframes: a.effect.getKeyframes().slice(0, 12).map((k) => { const o = {}; for (const [p, v] of Object.entries(k)) if (p !== 'computedOffset') o[p] = String(v); return o; }) });
      } catch {}
    }
    return out;
  };

  // movers: candidates are read over time from Node (probeInit once, probeRead per sample)
  const CAND = /ticker|marquee|carousel|slider|slide|swiper-wrapper|slick-track|owl-stage|scroller|rotator|counter|odometer|typed|reveal|fade/i;
  const probeInit = () => {
    const sel = makeSel(), els = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (els.length >= 700) break;
      if (SKIPTAG.test(el.tagName) || (el instanceof SVGElement && !(el instanceof SVGSVGElement))) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none') continue;
      const cls = typeof el.className === 'string' ? el.className : '';
      if (cs.transform !== 'none' || /transform|translate|left|margin|opacity|top/i.test(el.getAttribute('style') || '') || cs.willChange.includes('transform') || cs.animationName !== 'none' || CAND.test(cls)) els.push(el);
    }
    window.__pw._cand = els;
    const idx = new Map(els.map((e, i) => [e, i]));
    return els.map((el) => { let p = el.parentElement; while (p && !idx.has(p)) p = p.parentElement; return { sel: sel(el), box: box(el), parent: p ? idx.get(p) : -1, parentSel: el.parentElement ? sel(el.parentElement) : '' }; });
  };
  const probeRead = () => (window.__pw._cand || []).map((el) => {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return [r2(r.x + scrollX), r2(r.y + scrollY), r2(r.width), cs.opacity, cs.transform, el.childElementCount <= 40 ? clean(el.textContent).slice(0, 32) : ''];
  });

  window.__pw = { extra: {}, makeSel, vis, index, controls, snap, tree, scrape, webforms, pseudo, pointerCandidates, hoverTargets, scopeFields, styleFor, validate,
    freezeDom, hideOverlays, expandScroller, bands, usedCss, motionStatic, probeInit, probeRead };
})();
