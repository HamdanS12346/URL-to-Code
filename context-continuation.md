# Context continuation: final-playwright (Provider portal rebuilds)

State as of 2026-11-11, branch `feature/ui-specs`. **Nothing from this work is committed.** Read `AGENTS.md`, `kits/provider/KIT.md`
and `docs/client-runbook.md` too; this file is the story and the decisions, those are the rules.

## 1. What the project is

`final-playwright` turns a legacy web screen (a URL) into a UI spec and then a React 19 + TypeScript + Vite rebuild, 1:1 in looks,
behavior and animation. Playwright captures facts (screenshots, real CSS, DOM, network, motion). A coding agent (Codex on the client
machine, `--writer`) writes spec and code. Scripts capture facts; the writer only adds what scripts cannot know.

The client site is the **Provider portal** (Gainwell MMS, test host `uximc.mms.tst.pgwcloud.net`, login needed): ASP.NET MVC +
jQuery 3.7 + **Kendo UI for jQuery 2026.1**, one shared shell on every module (fixed header, side menu behind a hamburger, module tab,
green title bar, footer). Goal: it must work for **every module**, not just the ones tried so far. Hard constraint from the user:
"do not break the tool, just improve it".

Layout that matters:
- `kits/provider/` = everything the tool knows about this family of sites: `kit.mjs` (hooks the scripts call: `prepare`, `explore`,
  `factsSection`, `required`, `prompt`, `todo`), `harvest.js` (runs in the page as `window.__kit`), `app/` (React runtime copied into
  each generated app as `src/kit`: `KitScreen.tsx`, `widgets.tsx`, `core.ts`, `data.ts`, `index.ts`), `KIT.md` (guide for writers).
- `scripts/ui.mjs` = the pipeline (`npm run ui -- <pack>`): login, discover menu, capture each screen, spec, port, code, verify.
  `scripts/verify.mjs` renders the app, diffs it against `reference.png` and replays `kit/states.json`. `scripts/lib/*` are helpers.
- `packs/<pack>/` = one run of one module (`pack.json`, `STATUS.md`, `status.json`, `ui.log`, `logs/`, `screens/<screen>/`, `app/`).
  Nothing screen-specific lives outside it. `scripts/` stays site-agnostic.
- `prompts/` = writer prompts (`code-kit.md` is the kit-mode code prompt). `test/provider-portal/server.mjs` = offline Provider-like
  portal with real Kendo core; `test/provider-smoke.mjs` drives the whole pipeline against it with a fake writer.
- Probe evidence: `docs/provider-probe/` (ANSWERS.md, PROBE-2-ANSWERS.md, `16-menu.json`, `22-menu.json`, census `20-*`, reference
  images and `reference-images/CONTEXT.md`).

## 2. Standing rules (do not violate)

- Never open, print or copy `.env` or anything under `packs/*/auth/` (portal password and logged-in session).
- The password is typed at the prompt only, never written to disk or given to the writer.
- Do not run the capture or open the live site unless the user asks. Probe images and artifacts may show client data: do not publish.
- Never edit capture output (`outputs/`, `packs/*/screens/*` facts); ask for a re-capture instead.
- Never edit an app's `src/kit`: fix the kit in `kits/provider/app` (every screen and pack gets it on the next run).
- Grid rows are synthetic (no client data kept). Edit/detail flows are in scope (open, harvest, close, never Save/Update/Delete).
  Mock services layer with the real endpoint names (`src/services/<screen>.ts`).
- Codex on the client account allows 3 concurrent sessions: default `--parallel 3`.

## 3. Decisions made in this chat (all of them)

1. Goal for each module: **Home + the module's screens + a working navbar**, for any module.
2. Side menu behaves like the live one (probe 2): opening swaps the root's classes (`display-none` -> `display-flex`, both
   `!important`) and appends `<div class="disabled-backdrop">` to `<body>`; no fade. Only the X (`#mainMenuClose`) or a menu link
   closes it; Escape and a backdrop click do NOT. Kendo menu options: hoverDelay 100, animation open 200 / close 100.
3. Modules fly out on hover, to the left of the list, as a box Kendo lifts out of the `<ul>` (see section 5). Only links to screens
   of the pack navigate (and close the menu); every other menu item is shown and leads nowhere, menu stays open.
4. Tooltip box width = the tooltip's fractional width + 1px (integer `offsetWidth` made two-word tooltips wrap).
5. Spec and code generation run in parallel (`--parallel`, default 3); with a kit the code steps of different screens also run
   side by side. Writer problems that are the kit's/shell's fault are written to `BLOCKED.md` and not retried.
6. A pack's dev server gets its own port (auto from 5180) so two packs can run in two terminals; Codex's 3-session cap is shared.
7. The kit does as much as possible so writers only add conditional fields, cascades, page-specific behavior; each screen gets an
   auto-generated `docs/ui-specs/<screen>/TODO.md` and the kit-mode prompt forbids rebuilding/hiding the shell, menu or backdrop.
8. Check results stay honest: the end of `npm run ui` now prints one line per screen with `pixels off %`, size delta, worst section
   and `states: N/M` (previously only problems were printed).

## 4. Work history (what was changed, in order)

Earlier chat (summarized): probe 2 answers, `online-probe-2.mjs` fixes (`--only=q20` to rerun just the census), then the big
implementation:
- `kit.mjs`: `sideMenu()` records how the menu opens (class diff, backdrop outerHTML, Kendo timings, close icon), picks the menu root
  by "newly shown element with the most links" (a stray input that appears at the same time once fooled it), closes only via X
  (never re-clicks the hamburger), stamps `data-kit-menu*`. `scriptPlan()` reads the screen's own JS for `openModalOverlay(panel…)`,
  `setKendoGridDataBoundEvents(e,msg,single,double)` (62 of 89 menu pages open a row on double-click). Explore: `waitWindow` (up to
  20 s), `unblock` (nothing may cover a click target), Create New retries, row open via link/dblclick/click, `screen.missing`
  = planned dialogs that were not harvested -> `[UNKNOWN]` lines. Unknown widgets (autocomplete, maskedtextbox, multiselect,
  listbox, listview, tabstrip) are reported, not rebuilt.
- `KitScreen.tsx`: tooltip width fix, side menu class swap + backdrop, menu starts closed at mount, Escape ignored, grid dblclick
  support in `widgets.tsx`, `useKit()` API, KIT.md API section, `prompts/code-kit.md`, `ui.mjs` parallelism/BLOCKED/preflight/dev
  server watchdog, `verify.mjs` state replay with `expect` checks, offline test portal mirroring the live menu.

This chat (after the summary), in order:
1. Confirmed login check exists (commit `10a76c9`): `sessionValid()` / `login()` in `scripts/lib/portal.mjs` look for a logged-in
   marker (Logout) or `selectors.loggedIn`; not part of recent changes.
2. `ui.mjs` dev port auto-pick (first free from 5180; reuses this pack's own app; pinned `devPort` still honored).
3. Diagnosed fxfer-v3: menu "didn't work" because the portal has **two hamburgers** (`.mobile-nav` shown below 1280 CSS px; a 1920
   screen at Windows 150% = 1280 CSS px) and only the desktop one was stamped. Fixes: `kit.mjs` stamps twins, `KitScreen` stamps
   twins at mount, `verify.mjs` clicks only visible elements (`${sel} >> visible=true`), test portal + smoke cover the mobile one.
4. `ui.mjs` end-of-run summary table (verify numbers per screen).
5. Claims Management run (`packs/claims-mgmt-v1`: home + search-claims + pro-dur) analysis, then the five fixes of section 5.
6. Verification: `npm run smoke:provider` OK (preflight states 9/9), `npm run smoke:ui` OK, `npm run smoke` OK.

## 5. The latest fixes (claims-mgmt-v1 feedback) in detail

User report: navbar opens/closes on X (good); Quick Links chevron did nothing; hovering a module opened a submenu inside the list and
it vanished; navigation should be wired inside the menu for the generated module only; help book missing on Search Claims.

- **Fly-out** (`KitScreen.tsx`: `showFly/hideFly/closeFlys`, `MENU = 'ul[data-role=menu]'`): clone the item's `.k-menu-popup` into
  `div.k-animation-container[data-kit-flyout] > div.k-child-animation-container` appended to the menu's `.k-menu-scroll-wrapper`
  (else the ul's parent). Vertical menu: `left:-width; top = li top`; horizontal (module tab `#activeModuleMenu`): under the li.
  Slide `translateX(100%)->0` (vertical) / `translateY(-100%)->0` (horizontal), then add `k-animation-container-shown`. Item gets
  `k-hover k-focus` while open (the portal's CSS highlights through these). Timings read per `<ul>` (`data-kit-menu-hover/-open-ms/
  -close-ms`, stamped by `shellParts()` in `kit.mjs` from `jQuery(ul).data('kendoMenu')`), falling back to the menu root's, then
  Kendo defaults. Root cause of the old bug: the popup stayed inside `ul`, whose ancestor `.k-menu-scroll-wrapper .k-menu` has
  `overflow:hidden`.
- **Links**: pack routes come from `globalThis.__kitRoutes` (generated `src/routes.ts`); a hit routes and closes menu/fly-out (the
  `inMenu` test happens BEFORE the fly-out is removed, which matters); non-hits inside menus do nothing.
- **Quick Links** (`#mobileMenuIcon`, `.content-subpanel-container > .content-subpanel-bdy`): `shellParts()` stamps
  `data-kit-action=collapse` + `data-kit-collapse` on shell panels with `fa-angle-up/down` outside the screen scope. Runtime
  `collapse` case finds the body via the nearest `[class*=panel-container]`, flips chevron/angle, toggles `*-collapsed` and
  `collapsedPanel` (remembering the removed class in `data-kit-was`), swaps title Expand/Collapse, sets
  `#mainMenuItemContainer` height `20vh` for `#mobileMenuIcon` (the portal's script does it on every click).
- **Help book**: `.help-icon-container` lives in `#mcbRowBorder` (above the content scope `#pageBody > main`), so the shell (ported
  from ONE screen via `--slot`) loses other screens' copy. `prepare()` now returns `help` (outerHTML or null) -> `screen.json`
  `help`; `KitScreen` (non-shell) effect shows/injects it into `#mcbRowBorder` or hides the shell's, no-op if `help === undefined`
  (old captures). Click does nothing (the portal's help window `/Help/HelpContentPopup` is not rebuilt). Not covered: other
  per-page items of that title row (Notes, Mail, Print Preview...).
- **Verify** (`scripts/verify.mjs`): `expect` entries accept `top: true` (element must be what `elementFromPoint` hits at its centre)
  and `outside: <selector>` (box must not overlap it), besides `visible`/`lines`. New states from `kit.mjs`: `menu-flyout`
  (hover the module stamped `data-kit-flyout-demo="side"`, clipped screenshot of the live submenu) and `tab-flyout`
  (`data-kit-flyout-demo="bar"`). `demoFlyout()` records them on the live page.
- Test rig: `test/provider-portal/server.mjs` now has the module tab (`.menu > #activeModuleMenu`, plain `.module-name` kept so the
  title-bar harvest path stays covered), Quick Links panel, `#mcbRowBorder` with a help book on the tracking page only, and
  `.child-menu .k-menu-link` CSS (the live popup is bold through `.child-menu`, not through nesting under `#mainMenu`).
  `test/provider-smoke.mjs` asserts all of the above, including the narrow-window hamburger.

## 6. Pack status snapshots

- `packs/fxfer-v3` (File Transfer Services): captures/specs/ports done; `preflight:kit` needs-review and
  `code:file-transfer-configuration` blocked on state `row-d2` (double-click first grid row -> View dialog, 16.48% off the live
  picture; BLOCKED.md written by the writer, reading it: kit/shell parity issue, not screen logic). **Not yet investigated.**
  The writer also edited `src/kit/widgets.tsx` (scrollIntoView before dblclick), which the rules forbid; harmless, overwritten next run.
- `packs/claims-mgmt-v1` (Claims Management: home, search-claims, pro-dur): search-claims and home done; `code:pro-dur` blocked
  (BLOCKED.md exists, not read yet); Pro DUR's book icon shown only with fix 4. Needs `--from capture` to get the new states/`help`.
- `packs/ffxfer-index-v1`: the older first run. `smoke-*` packs are test output (recreated by the smoke tests).

## 7. How to run

- New module (login: typed password at the prompt, never stored): `npm run ui -- <pack-name> --menu "<Menu item>"`, add
  `--url https://uximc.mms.tst.pgwcloud.net/Home/MyHome/` the first time and `--yes` for non-interactive. The pack name is asked
  first when omitted. Example: `npm run ui -- provenroll-v1 --menu "Provider Enrollment"`.
- Redo from a stage: `--from capture|spec|port|code`, or `--redo`. Re-run without flags continues a pack. To pick up the latest kit
  *capture* changes (new states, `help`) on an existing pack use `--from capture`; a plain re-run only refreshes the runtime.
- Two modules in two terminals work (own folders, own dev ports); split Codex sessions with `--parallel` (3 total).
- Useful: `--parallel N`, `--writer "<cmd with {workdir}>"`, `--headed`, `--mode readonly|safe|full` (capture mode in config.json is
  `safe`: POSTs allowed). Logs: `packs/<pack>/ui.log`, `logs/*.log`, `logs/devserver.log`; results: `STATUS.md`, `status.json`,
  `app/UI_BUILD_REPORT.md`.
- Tests (all offline, must stay green): `npm run smoke:provider` (~3 min), `npm run smoke:ui`, `npm run smoke`.
- What to check on a new module after the run: the end-of-run table (pixels off %, `states: N/M`), `preflight:kit` line, any
  `BLOCKED.md`; in the browser: hamburger opens (also at a 1280 CSS px window), hover a module -> submenu beside the list, a module
  tab hover opens its screens, only pack screens navigate, Quick Links opens, tooltips stay on one line, Create New dialogs open.

## 8. Known gaps / next ideas

- Kit does not rebuild: autocomplete, masked text box, multiselect, listbox, listview, tab strip (reported as `unknown` in
  `screen.json` and facts.md, shown as static markup). Grid column filter menu, pager page-size dropdown, cascading dropdown
  option lists, the page-level help window, other per-page title-row items are not reproduced.
- `fxfer-v3` `row-d2` (View dialog after row double-click) mismatch: investigate in the kit, compare
  `packs/fxfer-v3/screens/file-transfer-configuration/verify/states/row-d2/` with `kit/states/dialog-d2.png`.
- Census (probe 2, Q20) had 70 timeouts of 159 menu pages (89 read); 152 stale `Invalid URL` rows came from an old file.
- The new `top`/`outside` verify checks were shown to pass on the fix; they were not run against the old broken runtime.
- Nothing has been run against the real portal since these last changes: the real Kendo menu markup was read from
  `rendered.html` and probe JSON (not exercised live).

## 9. Environment gotchas (this machine, Windows 11)

- A "Fact-Forcing Gate" hook blocks the **first** Bash call and the first edit of each file per session until facts (importers,
  affected API, data fields, the user's instruction verbatim) are stated in text; then retry the same call. In a parallel batch an
  edit that is blocked leaves the others applied: re-check consistency (this once left unbalanced HTML in the test portal).
- Python is not installed (use node). Do not `cd` into `packs/*` and leave the shell there: Windows then refuses (`EPERM`) when the
  smoke test deletes `packs/smoke-provider`.
- `node --check <file>` is the quick syntax check; PowerShell is the primary shell, Bash is also available.
- Files changed (uncommitted): `kits/provider/{kit.mjs,harvest.js,KIT.md}`, `kits/provider/app/{KitScreen.tsx,core.ts,index.ts,
  widgets.tsx}`, `scripts/{ui.mjs,verify.mjs}`, `scripts/lib/{jsx.mjs,keys.mjs,verify-behavior.mjs}`, `prompts/{code-kit.md,
  repair.md}`, `test/provider-portal/server.mjs`, `test/provider-smoke.mjs`, `docs/client-runbook.md`,
  `docs/provider-probe/reference-images/CONTEXT.md`, this file.
