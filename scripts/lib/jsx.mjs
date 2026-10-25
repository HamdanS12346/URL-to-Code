// Mechanical HTML -> JSX and CSS clean-up for scripts/port.mjs. No per-site logic.

// Components reset themselves with `all: unset`. The capture reads rules back through the CSSOM,
// which expands that shorthand into every longhand and serializes them in property order, so resets
// such as `padding-inline: unset` end up AFTER the real `padding: 0 16px` and win. Putting every
// `: unset` declaration back at the front of its block restores the authored order.
export function unsetFirst(css) {
  return css.replace(/\{([^{}]*)\}/g, (all, body) => {
    const decls = body.split(';').map((d) => d.trim()).filter(Boolean);
    const unsets = decls.filter((d) => /:\s*unset$/.test(d));
    if (unsets.length < 5) return all; // not an `all: unset` block - leave it alone
    const rest = decls.filter((d) => !/:\s*unset$/.test(d));
    return '{ ' + [...unsets, ...rest].join('; ') + '; }';
  });
}

const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'use', 'path', 'circle',
  'rect', 'ellipse', 'line', 'polygon', 'polyline', 'area', 'base', 'col', 'embed', 'track', 'wbr', 'stop']);
const ATTR = {
  class: 'className', for: 'htmlFor', srcset: 'srcSet', tabindex: 'tabIndex', colspan: 'colSpan',
  rowspan: 'rowSpan', maxlength: 'maxLength', autocomplete: 'autoComplete', autocapitalize: 'autoCapitalize',
  autocorrect: 'autoCorrect', spellcheck: 'spellCheck', crossorigin: 'crossOrigin', readonly: 'readOnly',
  enterkeyhint: 'enterKeyHint', inputmode: 'inputMode', contenteditable: 'contentEditable',
  httpequiv: 'httpEquiv', referrerpolicy: 'referrerPolicy', fetchpriority: 'fetchPriority',
  playsinline: 'playsInline', viewbox: 'viewBox', preserveaspectratio: 'preserveAspectRatio',
  clippath: 'clipPath', cliprule: 'clipRule', fillrule: 'fillRule', stopcolor: 'stopColor',
  stopopacity: 'stopOpacity', gradientunits: 'gradientUnits', maskunits: 'maskUnits',
  patternunits: 'patternUnits', strokewidth: 'strokeWidth', strokelinecap: 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin', strokemiterlimit: 'strokeMiterlimit', strokedasharray: 'strokeDasharray',
  autofocus: 'autoFocus', novalidate: 'noValidate', charset: 'charSet', accesskey: 'accessKey',
  datetime: 'dateTime', usemap: 'useMap', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen',
  cellpadding: 'cellPadding', cellspacing: 'cellSpacing', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace',
  'xmlns:xlink': 'xmlnsXlink',
  // React warns ("Invalid DOM property ... Did you mean ...") and drops these when written in HTML case; autoplay never started a video
  autoplay: 'autoPlay', controlslist: 'controlsList', disablepictureinpicture: 'disablePictureInPicture',
  disableremoteplayback: 'disableRemotePlayback', hreflang: 'hrefLang', srclang: 'srcLang', srcdoc: 'srcDoc',
  formaction: 'formAction', formenctype: 'formEncType', formmethod: 'formMethod', formtarget: 'formTarget',
  formnovalidate: 'formNoValidate', acceptcharset: 'acceptCharset', minlength: 'minLength', nomodule: 'noModule',
  itemprop: 'itemProp', itemscope: 'itemScope', itemtype: 'itemType', itemid: 'itemID', itemref: 'itemRef',
  enctype: 'encType', imagesrcset: 'imageSrcSet', imagesizes: 'imageSizes', popovertarget: 'popoverTarget',
  popovertargetaction: 'popoverTargetAction', contextmenu: 'contextMenu', marginwidth: 'marginWidth',
  marginheight: 'marginHeight', radiogroup: 'radioGroup',
};
const SVG_DASH = /^(fill|stroke|clip|marker|stop|flood|glyph|paint|dominant|alignment|baseline|letter|word|writing|pointer|vector|text|font|color|shape|mask|filter|gradient|pattern|transform)-/;
// HTML boolean attributes: presence means true, and the DOM serializes them as `hidden=""`.
// React reads that empty string as false and drops the attribute, which unhides every hidden element.
const BOOL = new Set(['hidden', 'disabled', 'checked', 'readonly', 'required', 'multiple', 'selected',
  'open', 'inert', 'loop', 'muted', 'controls', 'autoplay', 'autofocus', 'novalidate', 'formnovalidate',
  'async', 'defer', 'ismap', 'reversed', 'default', 'allowfullscreen', 'playsinline', 'itemscope']);
const camel = (n) => n.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const styleObj = (css, rw) => '{' + css.split(/;(?![^(]*\))/).filter((d) => d.includes(':')).map((d) => {
  const i = d.indexOf(':');
  const k = d.slice(0, i).trim();
  const v = rw(d.slice(i + 1).trim());
  const key = k.startsWith('--') ? k : k.startsWith('-ms-') ? camel(k.slice(1)) : camel(k);
  return `${JSON.stringify(key)}: ${JSON.stringify(v)}`;
}).join(', ') + '}';

function jsxAttrs(tag, raw, inSvg, rw) {
  const out = [];
  // <input type="submit|reset|button|image" value="Sign Up">: React skips `defaultValue` on submit/reset inputs (so the browser's own
  // "Submit" shows), and these types are exempt from the controlled-input warning, so the label must be a real `value`
  const buttonLike = tag === 'input' && /(?:^|\s)type\s*=\s*["']?(submit|reset|button|image)\b/i.test(raw);
  const re = /([:a-zA-Z_][-:.a-zA-Z0-9_]*)(\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m;
  while ((m = re.exec(raw))) {
    const low = m[1].toLowerCase();
    const hasVal = !!m[2];
    const val = m[3] ?? m[4] ?? m[5] ?? '';
    if (low === 'style') { out.push(`style={${styleObj(val, rw)}}`); continue; }
    if (/^on[a-z]+$/.test(low)) continue; // inline handlers: the page's scripts are not ported
    // attributes the browser ignores: `size` on an <svg> (width/height already carry it), width/height="auto"
    if (low === 'size' && inSvg) continue;
    if ((low === 'width' || low === 'height') && val === 'auto') continue;
    let name;
    if (low.startsWith('data-') || low.startsWith('aria-') || low === 'xmlns') name = low;
    else if (ATTR[low]) name = ATTR[low];
    else if (low.includes(':')) name = low;
    else if (inSvg && SVG_DASH.test(low)) name = camel(low);
    else name = low;
    // a controlled value without onChange is read-only in React: keep the captured one editable
    if (name === 'value' && /^(input|textarea|select)$/.test(tag) && !buttonLike) name = 'defaultValue';
    if (name === 'checked' && tag === 'input') name = 'defaultChecked';
    if (!hasVal) { out.push(`${name}={true}`); continue; }
    // `hidden=""` / `hidden="hidden"` are true; a real value (hidden="until-found") stays a string
    if (BOOL.has(low) && (val === '' || val.toLowerCase() === low)) { out.push(`${name}={true}`); continue; }
    // React types these as numbers, not strings
    if (/^(tabIndex|rowSpan|colSpan|maxLength)$/.test(name) && /^-?\d+$/.test(val)) { out.push(`${name}={${val}}`); continue; }
    out.push(`${name}=${JSON.stringify(rw(val, low))}`);
  }
  return out.length ? ' ' + out.join(' ') : '';
}

const ENT = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', reg: '®',
  trade: '™', hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', middot: '·', bull: '•', deg: '°',
};
const decode = (s) => s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (all, body) => {
  if (body[0] === '#') {
    const n = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
    return Number.isFinite(n) ? String.fromCodePoint(n) : all;
  }
  return ENT[body] ?? all;
});

// rw(value, attrName?) rewrites asset URLs; the default leaves everything alone
export function toJsx(html, rw = (s) => s) {
  const out = [];
  let svgDepth = 0;
  const text = (s) => {
    const t = decode(s);
    if (!t.trim()) { if (t.length && out.length) out.push('{" "}'); return; }
    out.push('{' + JSON.stringify(t) + '}');
  };
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>|<!--[\s\S]*?-->/g;
  let last = 0, m;
  while ((m = re.exec(html))) {
    text(html.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[0].startsWith('<!--')) continue;
    const [, slash, tag, attrs, self] = m;
    const low = tag.toLowerCase();
    // the snapshot writes void SVG/HTML elements as <path ...></path>; the opening tag already
    // became self-closing JSX, so the stray closing tag is dropped
    if (slash) { if (VOID.has(low)) continue; if (low === 'svg') svgDepth--; out.push(`</${low}>`); continue; }
    if (low === 'svg') svgDepth++;
    const a = jsxAttrs(low, attrs, svgDepth > 0, rw);
    if (self || VOID.has(low)) { out.push(`<${low}${a} />`); if (low === 'svg') svgDepth--; }
    else out.push(`<${low}${a}>`);
  }
  text(html.slice(last));
  return out.join('');
}

// One element per line, formatting only. A line break goes only where a tag is directly followed by another opening or
// closing tag of a different element: JSX drops whitespace-only text that contains a newline, so nothing rendered changes.
// Quotes count only inside a tag or a {expression}; in text an apostrophe is just text.
export function pretty(s) {
  const VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
  let out = '', depth = 0, brace = 0, tag = null, q = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    out += c;
    if (q) { if (c === '\\' && brace) out += s[++i] ?? ''; else if (c === q) q = ''; continue; }
    if (brace || tag !== null) {
      if (c === '"' || c === "'" || (brace && c === '`')) { q = c; if (tag !== null) tag += c; continue; }
      if (c === '{') { brace++; continue; }
      if (c === '}') { brace--; continue; }
      if (brace) continue;
      if (c !== '>') { tag += c; continue; }
      const name = (tag.match(/^\/?([\w.-]+)/) || [])[1] || '';
      const closing = tag.startsWith('/'), selfClosing = tag.endsWith('/') || VOID.test(name);
      if (closing) depth = Math.max(depth - 1, 0); else if (!selfClosing) depth++;
      tag = null;
      const emptyPair = !closing && !selfClosing && s[i + 2] === '/'; // <b></b> stays on one line
      if (s[i + 1] === '<' && !emptyPair) out += '\n' + '  '.repeat(depth);
      continue;
    }
    if (c === '{') brace++;
    else if (c === '<') tag = '';
  }
  return out;
}
