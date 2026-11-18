// What the flows stage may click and send on a live portal. Enforced by the script: a plan (the AI's or the rule-based one)
// cannot override it. The line is "everything up to the click that would save or create something":
//   clicks:   a commit button (Save, Submit, Update, Delete, Approve, a bare Add/OK/Yes on a form...) is never clicked, except the
//             "Save with writes blocked" probe, which only reads the validation it shows
//   requests: while exploring, every write is blocked; a POST goes through only when it reads (a grid's data source, a search,
//             a lookup) or opened an editor in the capture (`allow`); a GET whose path names a write (Delete, Approve...) is blocked
// A blocked write is not an error: it is where the flow ends (a "boundary"), recorded with what would have been sent.

// a button's words that commit something (a kit may add its own: kit.flows.danger)
export const COMMIT = /\b(save|submit|update|delete|remove|approve|deny|reject|deactivate|activate|reactivate|suspend|send|upload|import|finali[sz]e|log ?out|log ?off|sign ?out|purge|void|post|process|certify|attest|transmit|pay|purchase|checkout|archive|register|assign|terminate|withdraw|revoke|reset password|unlock|lock)\b/i;
// a bare verb that is a form's last step (an Add / OK / Yes on a dialog commits it; "Create New", "Add New" open a form and are fine)
const FINAL = /^\s*(add|create|ok|yes|apply|finish|done|confirm|accept|agree)\s*!?\s*$/i;

// why a candidate must not be clicked, or null. c: { text, id, name, kitAction, kind }
export function danger(c, extra = null) {
  if (c.kitAction === 'save') return 'commit: the kit marks it a Save';
  if (['search', 'reset', 'cancel', 'close', 'collapse', 'create', 'menu', 'menu-close'].includes(c.kitAction)) return null;
  if (['text', 'select', 'dropdown', 'check', 'radio'].includes(c.kind)) return null; // typing and picking change nothing on the server
  const words = `${c.text || ''} ${c.id || ''} ${c.name || ''}`.replace(/([a-z])([A-Z])/g, '$1 $2');
  if (COMMIT.test(words)) return `commit: "${(c.text || c.id || '').slice(0, 40)}"`;
  if (FINAL.test(c.text || '')) return `commit: a bare "${c.text.trim()}"`;
  if (extra) { const r = extra(c); if (r) return r; }
  return null;
}

// the words of a URL path: "/FileTransfer/AddFTPServerCredentials/" -> file, transfer, add, ftpserver, credentials
const words = (p) => p.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const WRITE_WORD = /^(add|post|send|lock|unlock|checkout|logout|logoff|signout|cancel|void|pay|insert|create|save|update|delete|remove|submit|approve|deny|reject|deactivate|activate|reactivate|suspend|upload|import|purge|terminate|withdraw|revoke|finalize|finalise|transmit|assign|process|certify|attest|register|archive|edit)$|^(delet|remov|sav|updat|submit|approv|reject|deactivat|activat|insert|creat|upload|purg|terminat|finaliz|finalis|transmit|assign)/;
const STRONG_WORD = /^(delete|remove|deactivate|activate|reactivate|suspend|approve|reject|submit|logout|logoff|signout|purge|void|lock|unlock|checkout|terminate|withdraw|revoke|cancel)$/;
const READ_WORD = /^(read|search|get|find|list|lookup|load|view|filter|validate|check|exists|fetch|query|detail|details|show|display|preview|autocomplete|suggest|select|count|lookups)$/;
// a Kendo data source's own fields (sort, page...) plus whatever the screen's search form sends
const DATASOURCE = new Set(['sort', 'page', 'pageSize', 'group', 'filter', 'aggregate', 'take', 'skip']);

export const isWritePath = (p) => words(p).some((w) => WRITE_WORD.test(w));
export const isStrongWritePath = (p) => words(p).some((w) => STRONG_WORD.test(w));

// the request policy for the browser guard (scripts/lib/browser.mjs guard.policy / guard.blockGet).
// allow: Set of "METHOD /path" the capture saw open a dialog (an editor rendered by POST); extra: pack.json flows.allow
export function requestPolicy({ allow = new Set(), extra = [] } = {}) {
  const ok = new Set([...allow, ...extra].map((x) => x.replace(/\/+$/, '').toLowerCase()));
  const key = (method, u) => `${method} ${u.pathname.replace(/\/+$/, '')}`.toLowerCase();
  return {
    // a non-GET request: may it go?
    policy(method, u, post) {
      if (ok.has(key(method, u))) return true;
      if (method !== 'POST' || isWritePath(u.pathname)) return false;
      if (words(u.pathname).some((w) => READ_WORD.test(w))) return true;
      const keys = post && typeof post === 'object' ? Object.keys(post) : null;
      return !!keys && keys.length > 0 && keys.every((k) => DATASOURCE.has(k) || /^(sort|filter|group|aggregate)\[/.test(k));
    },
    // a GET (script request or navigation of this page) whose path names a write
    blockGet(method, u) { return method === 'GET' && !ok.has(key(method, u)) && isStrongWritePath(u.pathname); },
  };
}

// self-check: node scripts/lib/safety.mjs
if (process.argv[1] && (await import('node:url')).pathToFileURL(process.argv[1]).href === import.meta.url) {
  const assert = (await import('node:assert/strict')).default;
  assert.equal(danger({ text: 'Save', kind: 'button' })?.startsWith('commit'), true);
  assert.equal(danger({ text: 'Delete Destination', kind: 'button' })?.startsWith('commit'), true);
  assert.equal(danger({ text: 'Add', kind: 'button' })?.startsWith('commit'), true);
  assert.equal(danger({ text: 'Create New', kind: 'button', kitAction: 'create' }), null);
  assert.equal(danger({ text: 'Add New', kind: 'button' }), null);
  assert.equal(danger({ text: 'Edit', kind: 'button' }), null);
  assert.equal(danger({ text: 'View', kind: 'link' }), null);
  assert.equal(danger({ text: 'Next', kind: 'button' }), null); // a wizard step: the request guard decides
  assert.equal(danger({ text: '', id: 'btnDeleteRow', kind: 'button' })?.startsWith('commit'), true);
  const p = requestPolicy({ allow: new Set(['POST /FileTransfer/AddFTPServerCredentials']) });
  const U = (s) => new URL(s, 'https://x.test');
  assert.equal(p.policy('POST', U('/FileTransfer/GetSourceLocations'), { sort: '', page: '1' }), true);
  assert.equal(p.policy('POST', U('/FileTransfer/AddFTPServerCredentials/'), {}), true, 'allowed by the capture');
  assert.equal(p.policy('POST', U('/FileTransfer/SaveDestination'), { a: '1' }), false);
  assert.equal(p.policy('POST', U('/FileTransfer/FileTransferConfigurationEdit'), { Id: '4' }), false, 'MVC POST Edit saves');
  assert.equal(p.policy('POST', U('/Provider/AddressLookup'), { zip: '1' }), true, '"Address" is not "add"');
  assert.equal(p.policy('POST', U('/X/Grid_Read'), { sort: '', page: '1', pageSize: '10', group: '', filter: '' }), true);
  assert.equal(p.policy('POST', U('/X/Thing'), { Name: 'a' }), false, 'unknown POST with form fields');
  assert.equal(p.policy('DELETE', U('/X/Thing/4'), null), false);
  assert.equal(p.blockGet('GET', U('/X/DeleteConfig?id=4')), true);
  assert.equal(p.blockGet('GET', U('/X/EditPopup')), false);
  console.log('safety: OK');
}
