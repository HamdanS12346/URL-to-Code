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
- what Cancel does on a search page, and the screen's own messages and rules, exactly as its script has them,
- anything the spec lists that the port does not show.

Never add a rule the screen's script does not have. In particular: when the checklist says the live Search listed rows with
nothing typed, Search with an empty form must keep filling the grid (the checks click Search, then a row, then its dialog).

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

A module's submenu is a box **beside** the module list, not inside it: Kendo lifts the popup out of the `<ul>` (which clips what
is inside) into a `.k-animation-container` on the menu's scroll wrapper, `left: -width; top: <the item's top>` for the vertical
side menu, under the item for the horizontal **module tab** (`#activeModuleMenu`, "CLAIMS MANAGEMENT ∨" under the header). The
kit does the same for both (`[data-kit-flyout]`), with each menu's own timings (stamped on the `<ul>`). A module the capture
itself hovered no longer has its popup inside its `<li>`: Kendo left it in that container, linked by `data-groupparent` (on the
item) and `data-group` (on the popup); the kit finds it there (this is the module of the pack, hovered for the fly-out check: the
rebuilt menu once opened every module except that one). Only a link to a screen of
this app navigates (and closes the menu); every other item is shown and leads nowhere, so the whole menu can be browsed. **Quick
Links** (`#mobileMenuIcon`) is a collapsible shell panel: the capture stamps it (`collapse`) and the kit toggles its angle icon,
`subpanel-collapsed`, title and body like the portal's `expandPanel`. The **page help book** (`.help-icon-container`) belongs to
the page, not the shell: each screen's `screen.json` `help` is its markup or null, and the screen shows or hides it.
`kit/states` check all of it on the rebuild (`menu-open`, `menu-flyout`, `tab-flyout`, `menu-close`): the fly-out must be on top and
outside the list, and look like the live one. Captures from before this have no `menu-flyout`/`tab-flyout`/`help`: capture again.

## Dialogs and grid rows

The capture reads the screen's own script for `openModalOverlay("<panel>", …)` (each dialog, and the button that opens it) and
`setKendoGridDataBoundEvents(e, msg, onClick, onDblClick)` (62 of 89 menu pages open a row on double-click). It clicks each
opener with nothing on top of it, waits for the window while the page loads (up to 20 s), and double-clicks the first row when
the script says so. In the rebuild a click selects the row and a double-click opens its dialog. A dialog the script opens but
the capture could not see is listed in `screen.json` `missing` and in facts.md as `[UNKNOWN]`: never invent it.

A **Create New inside a dialog** (also one in a grid's toolbar, such as the Destination grid of an Add dialog) is clicked too.
It either opens a window one level down (`dialogs.<id>.children`), or shows a part of the same dialog that is hidden at rest
(the Destination form): the capture records which parts the click turned on and off (`dialogs.<id>.creates[].show / .hide`,
selectors inside the dialog; picture `states/dialog-<id>-partN.png`), and puts the part away with its own Cancel. The kit
replays it: the button shows the part, a Cancel or Save inside the part puts it away (Save validates that part only), and the
dialog's own Cancel still closes the dialog. The same holds for a Create New on the page that opens no window
(`screen.json` `creates`). Hidden-at-rest parts of a dialog are stamped `data-kit-h` like the page's.

## Viewport profiles: the portal has two layouts

The portal switches layouts at **1280 CSS px wide** (its own `isPhone()` is `matchMedia("(max-width: 1280px)")`). A 1920x1080 screen at
150% Windows scaling is a 1280-wide page, and a real browser on it is about **1272x588**, so a client sees the small layout. The capture
photographs the page at its own viewport (1920x1080 for a url-only capture: the "desktop" profile) **and** at each extra profile in
`config.json` `"profiles"` (default: `client`, 1272x588 at dpr 1.5; a pack overrides it with `pack.json` `config.profiles`, `[]` turns it off).
Nothing is specific to one machine: a profile is just a size, and what changes between layouts is **measured on the live page**, not typed in.

What the profile pass records (`kit/screen.json` `profiles`, `responsive`; `kit/states.json` entries with `"profile"`, `viewport`, `dpr`):
- `profiles.<name>`: the viewport, the layout facts (which breakpoints are active, which hamburger shows, nav links, a sideways scrollbar), and each
  Create New dialog as measured there (rect, min-width, max-height, whether its content scrolls).
- `responsive`: the rule the runtime applies. `query` is read from the portal's own script (`isPhone`), else it is the profile's width.
  `dialog` = what the portal's phone branch does (left / top, at least `minWidthPct` of the width, at most `maxHeightPct` of the height);
  `desktop.maxHeightPct` = the cap above the switch (the portal's `maxOverlayHeight`, 85%). **A dialog touching the left edge at 1272 is the
  live behavior, not a bug**: the portal does not center a window below its switch.
- states `layout@<name>`, `menu-open@<name>`, `menu-flyout@<name>`, `menu-close@<name>`, `tab-flyout@<name>`, `dialog-dN@<name>`: replayed by
  `verify` in a context of that size. A dialog state also checks the window's box (x, y, width, height) against the live one (`expect.rect`).

The runtime (`placeWindow` in `KitScreen.tsx`) centers above `query` (Kendo's `center()`, measured on the layout viewport), places by
left/top below it, caps the height as a share of the **current** window (not the 918 px the capture froze), scrolls the content inside, and
re-places on resize and when the content changes size, like the portal.

## What else a screen records (all optional keys of `screen.json`; a capture without them behaves as before)

| key | what the capture does | what the kit does |
|---|---|---|
| `search.outcome` (`rows` / `validation` / `empty`), `search.validation` | clicks Search with the form as it loads, waits for the loading indicator to go (the "Processing ..." box, grid masks), records the banner (live markup) and per-field messages | a Search with nothing changed shows that banner and messages (its X hides it) and no grid; with something typed it shows the grid |
| `dialogs.<id>.saveValidation` | clicks Save with nothing filled, **every POST blocked**; records the banner and field messages | Save shows the live banner as well as the field messages |
| `dialogs.<id>.close` | with an edit in the dialog: does the X ask "form data has changed"? does Cancel? the confirm's live markup and which button stays / leaves; staying must keep the dialog open | the dialog tracks the person's edits; X / Cancel / Escape ask exactly where the live one asked, with the live window |
| `conditionals`, `dialogs.<id>.conditionals` | tries every radio value, checkbox and dropdown value (not cascade children), records for each value the **absolute** shown/hidden state of the parts that flipped, puts the control back | `change` on the same control sets those parts: no per-screen code for "Run Schedule" and the like. Cascading option lists stay the code step's |
| widget `offsetDays`, `minutes`, `focusMask` | a prefilled date as days from the capture's day (the time of day too); the pattern an empty masked date shows on focus (`__/__/____`) | a date within 1000 days of the capture day stays that far from today; a placeholder (12/31/9999, 01/01/1900) stays as it was; the mask shows on focus |
| `filterPopup` | the grid's filter icon clicked: the popup's live markup and where it opened relative to the icon | the icon opens the popup; Filter / Clear / a press elsewhere close it |
| `links` | a Create New (or a row) that leaves the page: where it goes (the guard aborts the navigation and records it) | `npm run ui` captures each target as a screen of its own (one level, `parent` in `pack.json`), and the click in the rebuild goes to its route |
| collapse icons | the portal's `fa-angle-up/down` as well as chevrons, found through the panel container (the icon sits in a `*-hdr-tools` div inside the header) | the panel slides (the portal's 400 ms) and the icon / `*-collapsed` class / title swap |

The side menu's fly-out is built without a native scrollbar (Kendo sets `overflow: visible` inline on a popup it opens; the stylesheet's
`overflow: auto` + `max-height: 80vh` would give the clone one). When the list is taller than the room (a small window), the kit shows Kendo's scroll buttons
at both ends and scrolls the list with them and the wheel.

## Known gaps (say them in GUESSED.md when a screen needs them)

- Widgets the kit does not rebuild yet are ported as static markup and listed in `screen.json` `unknown` (and facts.md). The
  census of the menu pages found: autocomplete (Plan Management, Claims), masked text box, multiselect, listbox, listview,
  tab strip. Checkboxes and radios are plain inputs and work as they are.

- The grid's column filter popup opens and closes, but its operator list and value box do nothing (it does not filter the synthetic rows), and one popup (the first column's) stands for all columns.
- Screens whose live Search with nothing typed showed a banner have no row template (no rows were ever seen), so a Search with input shows the grid empty.
- Closing behavior is recorded for the dialogs the capture opens from Create New and the first row; a dialog with no editable text box is only tried unedited.
- Profile states cover the menus and each Create New dialog; the full page at the second profile is one viewport picture (`layout@<name>`), not a stitched page.
- The page-size dropdown in the pager does not change the page size.
- A dropdown that cascades from another starts disabled and keeps the option list the capture saw (usually empty).
- The book icon's page help (`displayPageLevelHelp()`) opens nothing.
