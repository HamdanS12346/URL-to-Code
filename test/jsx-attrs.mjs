// node test/jsx-attrs.mjs — the HTML->JSX attribute rules the port depends on.
// The DOM serializes a boolean attribute as `hidden=""`, and React reads that empty string as false:
// every hidden element would come back visible, which silently changes the page's height.
import assert from 'node:assert/strict';
import { toJsx } from '../scripts/lib/jsx.mjs';

const has = (html, want) => assert.ok(toJsx(html).includes(want), `${html} -> ${toJsx(html)} (wanted ${want})`);

has('<div hidden=""></div>', 'hidden={true}');          // serialized boolean
has('<div hidden></div>', 'hidden={true}');             // bare boolean
has('<div hidden="hidden"></div>', 'hidden={true}');    // repeated-name form
has('<div hidden="until-found"></div>', 'hidden="until-found"'); // a real value stays a string
has('<input disabled="" readonly="">', 'disabled={true}');
has('<input readonly="">', 'readOnly={true}');          // still renamed for React
has('<input checked="">', 'defaultChecked={true}');     // uncontrolled, as the port needs
has('<div class="x" data-y="1"></div>', 'className="x"');

console.log('jsx-attrs: ok');
