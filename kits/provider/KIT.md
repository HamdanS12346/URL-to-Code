# Provider kit: Kendo UI for jQuery portals (Gainwell MMS and look-alikes)

Read this before you write a spec or code for a screen whose `run.json` says `"kit": "provider"`.

## What the portal is

Every module is built the same way: ASP.NET MVC pages, jQuery 3.7 and Kendo UI for jQuery 2026.x. The pages share one set of
stylesheets (`/bundles/vendorcss`, `/bundles/appcss`, the tenant theme) and one shell: a fixed header (`#pageHeader`, 62 px,
hides on scroll down), a side menu behind the hamburger, a module tab and a green title bar (`<h1>`), and a footer. A screen
is a few parts that repeat everywhere:

| part | live markup | in the rebuild |
|---|---|---|
| field | `.editor-col` > `.editor-label` (label, `*` required, `?` help) + `.editor-field` | ported as is |
| `?` help, logo | `[data-role=tooltip]` with a `title` | `data-kit-tip`: the kit shows the portal's tooltip after its delay |
| dropdown | `span.k-dropdownlist` + hidden `input[data-role=dropdownlist]` | `<KitWidget id="kN" />` (dropdown island) |
| number box | `span.k-numerictextbox` | `<KitWidget>` (numeric island) |
| date / date-time / time | `span.k-datepicker` / `.k-datetimepicker` | `<KitWidget>` (picker island: calendar, time list) |
| grid | `div.k-grid[data-role=grid]` + `.k-pager` | `<KitWidget>` (grid island: synthetic rows, sort, pager) |
| Search Criteria panel | `.content-panel-hdr` with a chevron + body | `data-kit-action="collapse"` |
| Search / Reset / Cancel / Create New / Save | buttons | `data-kit-action=…` |
| dialog | Kendo Window (`.k-window`, AJAX content) | `dialogs/Dialog<Id>.tsx`, opened by `<KitScreen>` |
| validation | `data-val-*` (MVC unobtrusive) | the kit validates with the same rules and messages |

## What the capture gives you (`<screen>/kit/`)

- `screen.json`: everything read from Kendo itself: every widget (kind, label, option list, placeholder, format, required,
  help text, validation messages), every field, every action, the title bar texts, Kendo's own animation numbers
  (`calibration.defaults`), the live markup of an open dropdown list / calendar / tooltip, what Search revealed and which
  endpoint it called, the grid after Search as **templates** (row markup with `{{cN}}` slots, column types, row count: no
  client data), and every dialog (Create New, a Create New inside it, the first row's edit dialog).
- `dialogs/<id>.html`: each dialog's content, stamped like the page.
- `states/*.png`: the live page in each state (a dropdown open, a tooltip, after Search, each dialog). `verify` replays the same
  clicks on the rebuild and compares (`states: N/M` line).
- `facts.md` section 18 summarizes it all. Cite each widget and dialog in the spec as `[kit:<id>]`.

## What is already built (the app's `src/kit`, copied from `kits/provider/app`)

`<KitScreen>` wraps each ported screen and the shell. `<KitWidget id>` renders each Kendo widget from its live markup with
Kendo's behavior: a second click and an outside click close a dropdown, the list opens upward when there is no room below,
the arrow keys and letters pick items, the tooltip waits for the portal's delay, the grid sorts (none → asc → desc) and pages,
and a dialog zooms and fades in. Rows after Search are synthetic, shaped like the live ones.
`src/services/<screen>.ts` names the live endpoints and answers with mock data.

**Never** write your own dropdown, date picker, tooltip, grid, dialog or collapse in a screen, and **never edit `src/kit`**: a
kit problem is fixed once in `final-playwright/kits/provider/app`, for every screen and every pack.

## What is left for the code step

What the kit cannot know, taken from the screen's own script (`<screen>/capture/js/…/hp.ua3.<Module>.<screen>.js`) and the spec:
- conditional fields (a radio that shows more fields, a checkbox that enables a dropdown) and cascading dropdowns' options,
- what Cancel does on a search page, and the screen's own messages ("At least one search criteria is required."),
- anything the spec lists that the port does not show.

Use the kit's bus for values (`ctx.bus.on('change', …)`) or plain DOM events on the ported markup; keep the class names.
Each screen gets a checklist, `docs/ui-specs/<screen>/TODO.md` in the app: what the kit already does and what is left.

## API (everything a screen's own code may use; import from the app's `src/kit`)

```tsx
import { KitScreen, KitWidget, useKit, type KitData } from '../../kit';
```

- `<KitScreen screen={kit} dialogs={{ d1: DialogD1 }} services={services} shell?>`: already in the ported Page.tsx. `screen` is
  the screen's `kit.json`; `dialogs` maps each dialog id to its body component; `services` is `src/services/<screen>.ts`.
- `<KitWidget id="k3" />`: one Kendo widget, by the id the capture stamped. Already placed by the port.
- `useKit()` (inside a KitScreen, e.g. in a dialog body or a small component of the screen) returns
  `{ data, defs, bus, openDialog }`:
  - `bus.on('change', ({ name, id, value }) => …)`: a kit widget's value changed (returns an unsubscribe function);
    `bus.on('search', (values) => …)` after Search; `bus.on('reset', () => …)` after Reset. `bus.emit(type, detail)` sends one.
    Plain inputs (text boxes, radios, checkboxes) are not on the bus: listen to their DOM events.
  - `openDialog('d2')`: open a captured dialog from code (e.g. a radio that opens one).
  - `data`: the kit.json (`widgets`, `dialogs`, `grids`, `search`, `row`, `plan`, `missing`).
- Services (`src/services/<screen>.ts`): `search(values)` returns `{ total, rows }` of synthetic rows; `save(dialog, values)`.
  `endpoints` names the live endpoints. Edit freely: it is generated once.
- Attributes the kit acts on (keep them): `data-kit-action="search|reset|cancel|create|save|close|collapse|menu|menu-close"`,
  `data-kit-tip="text"` (a tooltip), `data-kit-h` (hidden at rest; Search reveals the ones in `search.reveals`),
  `data-kit-collapse` (a panel body), `data-kit-menu*` (the side menu: never touch it from a screen).

Worked example: the FTP Server Credentials screen needs no code of its own beyond the port. Its Create New opens dialog `d1`
("Add FTP Server Credentials", ported to `dialogs/DialogD1.tsx`), its tooltips and validation come from the kit, and its grid
fills on Search. A screen with a conditional field adds one small component next to the markup, for example:

```tsx
// shows the part hidden at rest (data-kit-h="h4") only for "Run Monthly", as the screen's script does
function RunSchedule() {
  useEffect(() => {
    const on = (e: Event) => {
      const r = e.target as HTMLInputElement;
      if (r.name === 'RunSchedule') document.querySelector<HTMLElement>('[data-kit-h="h4"]')!.style.display = r.value === 'M' ? '' : 'none';
    };
    document.addEventListener('change', on);
    return () => document.removeEventListener('change', on);
  }, []);
  return null;
}
```

## The side menu (the shell, built by the kit)

Measured on the live portal (docs/provider-probe, probe 2): the hamburger swaps the menu root's classes (`display-none` →
`display-flex`, which are `!important`) and appends `<div class="disabled-backdrop">` to `<body>`; there is no fade. A module
flies out to the left after Kendo's hover delay (100 ms) with its menu animation (open 200 ms, close 100 ms). Only the X and a
menu link close it: Escape and a click on the backdrop do not. The capture records all of this on the menu root
(`data-kit-menu-add/-remove/-backdrop/-hover/-open-ms/-close-ms`) and the kit replays it; a link to a rebuilt screen routes there.

## Dialogs and grid rows

The capture reads the screen's own script for `openModalOverlay("<panel>", …)` (each dialog, and the button that opens it) and
`setKendoGridDataBoundEvents(e, msg, onClick, onDblClick)` (62 of 89 menu pages open a row on double-click). It clicks each
opener with nothing on top of it, waits for the window while the page loads (up to 20 s), and double-clicks the first row when
the script says so. In the rebuild a click selects the row and a double-click opens its dialog. A dialog the script opens but
the capture could not see is listed in `screen.json` `missing` and in facts.md as `[UNKNOWN]`: never invent it.

## Known gaps (say them in GUESSED.md when a screen needs them)

- Widgets the kit does not rebuild yet are ported as static markup and listed in `screen.json` `unknown` (and facts.md). The
  census of the menu pages found: autocomplete (Plan Management, Claims), masked text box, multiselect, listbox, listview,
  tab strip. Checkboxes and radios are plain inputs and work as they are.

- The grid's column filter menu (the funnel icon) does not open.
- The page-size dropdown in the pager does not change the page size.
- A dropdown that cascades from another starts disabled and keeps the option list the capture saw (usually empty).
- The book icon's page help (`displayPageLevelHelp()`) opens nothing.
