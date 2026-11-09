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

## Known gaps (say them in GUESSED.md when a screen needs them)

- The grid's column filter menu (the funnel icon) does not open.
- The page-size dropdown in the pager does not change the page size.
- A dropdown that cascades from another starts disabled and keeps the option list the capture saw (usually empty).
- The book icon's page help (`displayPageLevelHelp()`) opens nothing.
