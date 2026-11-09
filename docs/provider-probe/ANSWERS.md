# Provider Probe Answers (Online)

All answers below are derived strictly from the existing probe evidence artifacts in `docs/provider-probe/` (the `NN-*.json` and `NN-*.png` files). No additional browser probing/clicking was performed while generating this write-up.

## Provenance

- Evidence source: `docs/provider-probe/SUMMARY.md` plus the `NN-*.json` and `NN-*.png` artifacts in `docs/provider-probe/`.
- Run status index: `docs/provider-probe/SUMMARY.md` marks Q00-Q15 as passed.
- Online-run time window (by filesystem timestamps on the artifacts): from `00-env.json` (`2026-11-09 16:56:31`) through `02-widgets-error.json` (`2026-11-09 17:24:31`).
- Q16 artifacts (menu probe) are timestamped `2026-11-09 22:31:24` through `2026-11-09 22:31:41` (separate later online run than Q00-Q15).
- Q02 regeneration check: `02-widgets.json` and `02-widgets-error.json` are timestamped `2026-11-09 17:24:31`, later than `02-widgets-<screen>.json` files (timestamped around `2026-11-09 16:57`). This suggests Q02 was rerun/fixed and the aggregated Q02 output was regenerated; the per-screen Q02 artifacts may be leftover from the earlier run.

## Q00

Environment information (browser + viewport) for the probe run.

- Playwright: `1.56.1`
- User agent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0`
- Viewport used: `1920x1080`
- `devicePixelRatio`: `1`
- Browser zoom signal: `visualViewport.scale=1`

Evidence used:

- `docs/provider-probe/00-env.json`: `userAgent`, `devicePixelRatio`, `innerWidth`, `innerHeight`, `playwrightVersion`, `viewportUsed`, `dprUsed`, `browserZoom`.

## Q01

Stack fingerprint for `home`, `cfg`, `trk`, and `ftp`.

Summary (common across all 4 screens):

- jQuery: `3.7.1`
- Kendo UI: `2026.1.415`
- Bootstrap: `null` (not detected by the probe)
- Stylesheets (same list on all screens): `/bundles/vendorcss`, `/bundles/appcss`, and `/finaltest/TenantContent/Commercial/Styles/hp.ua3.core.tenantTheme.css`.

Theme hints recorded by the probe:

- `html` class: `k-webkit k-webkit157`
- `body` class differs per screen:
  - `home`: `Home MyHome`
  - `cfg`: `FileTransfer SearchSourceLocations`
  - `trk`: `FileTransfer SearchFileTransferTracking`
  - `ftp`: `FileTransfer SearchFTPServerCredentials`
- `kendoTheme.stylesheetFiles`: `[]` (empty) for all screens.

Scripts (path list as recorded; differs per screen mainly by the screen-specific module script):

- Common (all screens): `/bundles/vendor`, `/bundles/app`, Kendo culture/messages (`/Scripts/Kendo/Cultures/kendo.culture.en-US.min.js`, `/Scripts/Kendo/Messages/kendo.messages.en-US.min.js`), plus shared portal scripts like `/Scripts/hp.ua3.core.mainMenu.js` and `/Scripts/hp.ua3.core.moduleContentPanels.js`.
- Screen-specific script examples:
  - `home`: `/Scripts/Home/hp.ua3.core.security.myHome.js`
  - `cfg`: `/Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations.js`
  - `trk`: `/Scripts/FileTransferTracking/hp.ua3.FileTransfer.searchFileTransferTracking.js`
  - `ftp`: `/Scripts/FileTransfer/hp.ua3.fileTransfer.searchFtpServerCredentials.js`

Fonts and typography (high level):

- `document.fonts` families include Font Awesome (5 and 6 variants) and `Poppins` (as recorded by the probe).
- Computed font families recorded by the probe include:
  - `body`: `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome`
  - `input`: `Arial`
  - `button`: `Arial`

Missing/unknowns in the evidence:

- `requestVerificationTokenPresent` is `null` in the captured JSON (the yes/no signal is not present).
- `metaGenerators` is `null` in the captured JSON.

Evidence used:

- `docs/provider-probe/01-stack.json`: `screens.<screen>.jquery`, `screens.<screen>.kendo`, `screens.<screen>.kendoTheme`, `screens.<screen>.bootstrap`, `screens.<screen>.scripts[*].path`, `screens.<screen>.stylesheets[*].path`, `screens.<screen>.fontsLoaded[*].family`, `screens.<screen>.computedFonts`, `screens.<screen>.requestVerificationTokenPresent`, `screens.<screen>.metaGenerators`.

## Q02

Widget inventory per screen.

The aggregated evidence file reports the following total element counts:

- `home`: `32`
- `cfg`: `71`
- `trk`: `95`
- `ftp`: `57`

Role/type distribution highlights (as recorded):

- `home`: mostly `tooltip` (27) and `menu` (5).
- Module screens include additional Kendo roles such as `columnsorter`, `dropdownlist`, `numerictextbox`, `textbox`, `popup`, `staticlist`, `validator`, `resizable`, and `pager`.

Important limitations in the evidence:

- In `02-widgets.json`, every item’s `widget` field is `null` (no `kendo.widgetInstance(el)` / widget options were captured).
- Some items have an empty `role` string; the role appears to come from `data-role` and can be missing on elements included via the CSS-class scan.

Evidence used:

- `docs/provider-probe/02-widgets.json`: `screens.<screen>.count`, `screens.<screen>.items[*].role`, `screens.<screen>.items[*].id`, `screens.<screen>.items[*].name`, `screens.<screen>.items[*].tag`, `screens.<screen>.items[*].classes`, `screens.<screen>.items[*].widget`.
- `docs/provider-probe/02-widgets-error.json`: `note`.

Additional artifacts present (older timestamps; treated as potentially leftover from an earlier run):

- `docs/provider-probe/02-widgets-home.json`, `docs/provider-probe/02-widgets-cfg.json`, `docs/provider-probe/02-widgets-trk.json`, `docs/provider-probe/02-widgets-ftp.json`.

## Q03

Shell (header/title area/footer) capture for `home`, `cfg`, `trk`, and `ftp`, including a best-effort diff and hamburger menu sampling.

What the evidence includes:

- Per-screen URL and rest-state screenshots:
  - `home`: `03-shell-home.png`
  - `cfg`: `03-shell-cfg.png`
  - `trk`: `03-shell-trk.png`
  - `ftp`: `03-shell-ftp.png`
- Per-screen captured shell outerHTML:
  - `perScreen.<screen>.headerOuterHTML` (header + module bar + title bar area)
  - `perScreen.<screen>.footerOuterHTML`
- STYLE snippets for key shell elements under `perScreen.<screen>.styles`.
- A best-effort header outerHTML diff:
  - `diffs.header.home_vs_cfg.firstDiffIndex = 75` (the captured snippet indicates `cfg` has an inline `style="border-bottom: 0px;"` on the header root; the other screen-to-screen diffs are `null` in the JSON).
- Server-rendering hint:
  - For each screen, `perScreen.<screen>.rawHtmlHints.h1InRaw = true` (indicating the `<h1>` title bar text exists in the raw server HTML fetched via `page.request.get(url)`).
- Hamburger menu panel capture (opened without selecting items):
  - OuterHTML + STYLE + open/close SAMPLE captured under `perScreen.cfg.hamburger`.
  - Screenshot: `03-menu-open.png`.

Evidence used:

- `docs/provider-probe/03-shell.json`: `perScreen`, `diffs`, `note`.
- `docs/provider-probe/03-shell-home.png`: referenced by `perScreen.home.screenshot`.
- `docs/provider-probe/03-shell-cfg.png`: referenced by `perScreen.cfg.screenshot`.
- `docs/provider-probe/03-shell-trk.png`: referenced by `perScreen.trk.screenshot`.
- `docs/provider-probe/03-shell-ftp.png`: referenced by `perScreen.ftp.screenshot`.
- `docs/provider-probe/03-menu-open.png`: referenced by `perScreen.cfg.hamburger.screenshot`.
- Related note: Q03’s captured hamburger panel outerHTML (`perScreen.cfg.hamburger.panelOuterHTML`) is the top header menu (Messages/External Links/etc.). The right-side module navigation menu (`ul#mainMenu`) and its hover submenu behavior are captured in Q16 (`docs/provider-probe/16-menu.json` + screenshots).

## Q04

Overlays present at rest (after load + idle).

- The probe recorded `0` overlays for each of `home`, `cfg`, `trk`, and `ftp`.
- Therefore, based on this evidence, there were no Kendo overlay/popup elements enumerated at rest.

Evidence used:

- `docs/provider-probe/04-rest-overlays.json`: `screens.<screen>.overlays`.

## Q05

Help icons (`?`) and book icon behavior (hover/click) as captured.

Help `?` tooltip behavior (hover):

- `trk` / "File ID":
  - Tooltip appears after `374ms`.
  - Tooltip markup captured as a Kendo tooltip popup: `class="k-tooltip k-popup"` with content `File ID`.
  - Tooltip styling includes blue background `rgb(0, 124, 173)` with white text `rgb(255, 255, 255)` and `z-index: 12000`.
- `cfg` / "Configuration ID":
  - Tooltip appears after `463ms`.
  - Tooltip markup captured as a Kendo tooltip popup with content `Configuration ID`.
  - Tooltip styling is consistent with the `trk` tooltip (same blue background / white text scheme recorded).

Help `?` click behavior:

- Evidence includes click screenshots, but the JSON does not include additional captured outerHTML/STYLE for a click-opened popover/panel; click is represented only by a screenshot filename.

Book icon (top right beside Create New):

- Hover tooltip content: `Help` (captured as a Kendo tooltip popup).
- Click target captured as `onclick="displayPageLevelHelp()"` (no navigation followed).

Evidence used:

- `docs/provider-probe/05-help.json`: `targets.trk_fileId.*`, `targets.cfg_configId.*`, `book.*`.
- `docs/provider-probe/05-help-fileid-hover.png`: `targets.trk_fileId.hover.screenshot`.
- `docs/provider-probe/05-help-fileid-click.png`: `targets.trk_fileId.click.screenshot`.
- `docs/provider-probe/05-help-configid-hover.png`: `targets.cfg_configId.hover.screenshot`.
- `docs/provider-probe/05-help-configid-click.png`: `targets.cfg_configId.click.screenshot`.
- `docs/provider-probe/05-book-hover.png`: `book.screenshot`.

## Q06

Dropdown probe.

- The probe did not find a dropdown for label `Owner Module` on any of the attempted screens (`cfg`, `trk`, `ftp`).
- No dropdown open/close sampling or dropdown screenshots exist in `docs/provider-probe/` for Q06.
- Additional visual evidence (outside the Q06 JSON): `docs/provider-probe/16-menu-top.png` shows an `Owner Module` control with a caret and placeholder text `select a value...`, suggesting the dropdown exists on the page but the Q06 probe script did not locate it by label.

Evidence used:

- `docs/provider-probe/06-dropdown.json`: `screens.cfg.error`, `screens.trk.error`, `screens.ftp.error`.

## Q07

Date/time picker probe.

What was captured:

- The evidence contains a best-effort capture for `trk.fromDate` only.
- The captured calendar popup outerHTML indicates a Kendo calendar container: `class="k-calendar-container k-popup"`.
- The month header in the captured outerHTML is `November 2026`, and the "today" footer button text is `Monday, November 9, 2026`.

Probe limitations visible in the evidence:

- The recorded bounding rect for the calendar container style snippet is `{x:0,y:0,width:0,height:0}` even while `display` is reported as `flex`.
- `trk.toDate` is not present in the JSON (missing capture for "To Date").

Evidence used:

- `docs/provider-probe/07-datetime.json`: `trk.fromDate.widgetSelector`, `trk.fromDate.calendar.outerHTML`, `trk.fromDate.calendar.style`, `trk.fromDate.calendar.sample`.
- `docs/provider-probe/07-datetime-calendar.png`: screenshot artifact captured during Q07.

## Q08

Collapse/expand (Search Criteria) probe.

What was captured:

- Best-effort capture for `cfg` and `ftp` with selectors for the clickable collapse control and the collapsible body.
- Captured fields include `bodyStyleBefore` (STYLE snippet) and timing samples (`sample.open` / `sample.close`).

Probe limitations visible in the evidence:

- The recorded `getBoundingClientRect()` values in the captured samples are `{x:0,y:0,width:0,height:0}` for the sampled element(s), indicating the probe did not capture meaningful geometry for this interaction in this run.

Evidence used:

- `docs/provider-probe/08-collapse.json`: `screens.cfg.*`, `screens.ftp.*`.

## Q09

Grid probe (after Search).

The evidence is split into per-screen captures plus screenshots.

`cfg` grid (`File Transfer Configuration`):

- Grid present: `true`.
- Columns captured (9 total; 8 marked sortable; 0 marked filterable):
  - `Configuration ID`, `Configuration Name`, `Protocol`, `Address`, `Mask`, `Owner Name`, `Owner Module`, `Status`, `Fts Source Location Id`.
- Grid outerHTML shows a toolbar checkbox labeled `Show Inactives`.

`trk` grid (`File Transfer Tracking`):

- Grid present: `true`.
- Columns captured (8 total; 0 sortable; 0 filterable):
  - `File ID`, `File Name`, `File Status`, `Direction`, `Transport Type`, `Size (KB)`, `Create Date`, `Trading Partner ID`.

`ftp` grid (`FTP Server Credentials`):

- Grid present: `true`.
- Columns captured (6 total; 6 sortable; 3 filterable):
  - `Server Name`, `Description`, `IP Server`, `Server User`, `Creation Date`, `Is Valid`.

Evidence used:

- `docs/provider-probe/09-grid.json`: `note` (high-level statement: "Grid after Search. Cell text redacted."), plus `screens` summary.
- `docs/provider-probe/09-grid-cfg.json`: `before.gridPresent`, `gridOuterHTML`, `columns[*]`.
- `docs/provider-probe/09-grid-trk.json`: `before.gridPresent`, `gridOuterHTML`, `columns[*]`.
- `docs/provider-probe/09-grid-ftp.json`: `before.gridPresent`, `gridOuterHTML`, `columns[*]`.
- `docs/provider-probe/09-grid-cfg.png`: grid screenshot.
- `docs/provider-probe/09-grid-trk.png`: grid screenshot.
- `docs/provider-probe/09-grid-ftp.png`: grid screenshot.

## Q10

Modal / window probe for "Create New" dialogs (best-effort).

What was captured (both `cfg` and `ftp`):

- Overlay selector: `[data-pw-probe-overlay="1"]`.
- Window selector: `[data-pw-probe-win="1"]`.
- Window outerHTML is captured in `docs/provider-probe/10-modal.json` under `screens.<screen>.outerHTML` (not reproduced here).
- STYLE snippets (captured after the interaction) show:
  - Overlay `background-color: rgb(61, 61, 61)` with `opacity: 0.5` and `z-index: 11501`, but `display: none` at capture time.
  - Window `border-radius: 10px`, `border: 1px solid rgb(206, 212, 218)`, `box-shadow: rgba(0, 0, 0, 0.5) 10px 10px 23px -4px`, `z-index: 11502`, `width: 75%`, but `display: none` at capture time.
- Esc-close sampling:
  - `sampleEsc.open` includes a concrete window rect of `{x:240,y:81,width:1440,height:918}`.
  - `sampleEsc.close` samples include `{x:0,y:0,width:0,height:0}` rect values for the same selector.

Failures/partials recorded in the evidence:

- Widget option extraction failed on both dialogs: `widgetOptions.error = "e.data is not a function"`.
- Focus capture on open reports the active element as `body` (no dialog-internal focus target captured).
- Body scroll-lock signal recorded as `bodyOverflow: visible`.

Evidence used:

- `docs/provider-probe/10-modal.json`: `screens.cfg.*`, `screens.ftp.*`.
- `docs/provider-probe/10-modal-cfg.png`: `screens.cfg.screenshot`.
- `docs/provider-probe/10-modal-ftp.png`: `screens.ftp.screenshot`.

## Q11

Field defaults probe.

Configuration ID on `cfg` (explicit check):

- Element: `input#ConfigId` with `name="ConfigId"`.
- Captured `dataRole`: `numerictextbox`.
- Captured values at rest:
  - `valueAttr`: `0`
  - `valueProp`: `""` (empty string)
  - `widgetValue`: `null` (not captured)
- `maxLength`: `9`.

Reset behavior:

- Not implemented in this probe output: `resetBehavior = "[UNKNOWN: reset comparison not implemented]"`.

Evidence used:

- `docs/provider-probe/11-fields.json`: `screens.cfg[]`, `screens.trk[]`, `screens.ftp[]`, `configurationIdOnCfg`, `resetBehavior`.

## Q12

Interaction styles (hover/focus/active/disabled) probe.

Buttons captured on `cfg`:

- Search button:
  - Rest: `background-color rgb(38, 143, 203)`, `border-bottom 1px solid rgb(0, 0, 0)`, `box-shadow none`.
  - Hover: same values as rest in this capture.
  - Active: same background, with `box-shadow rgba(38, 143, 203, 0.337) 0px 0px 0px 0.338467px`.
  - Focus: `null` (not captured)
  - Disabled: `null` (not captured)
- Reset and Create New buttons:
  - Rest: `background-color rgb(255, 255, 255)`, blue border `rgb(0, 98, 255)`, text `rgb(0, 98, 255)`, `box-shadow none`.
  - Active: `background-color rgb(250, 252, 255)`, border shifts to `rgb(8, 111, 255)`, and a small blue-ish `box-shadow` is present.
  - Focus: `null` (not captured)
  - Disabled: `null` (not captured)

Text input captured on `cfg`:

- The captured input element shows transparent background (`rgba(0, 0, 0, 0)`) and no borders/box-shadow for rest/hover/focus in this capture.

Modal-specific interaction styles:

- `modal.error = "modal did not open (Create New)"` (so modal button-state styles were not captured here).

Evidence used:

- `docs/provider-probe/12-states.json`: `cfg.buttons.*`, `cfg.inputs.text`, `modal.error`.

## Q13

CSS rules capture for selectors and portal stylesheets.

Stylesheet inventory captured:

- Same-origin bundles captured (full portal styles, marked truncated):
  - `vendorcss`: `totalRules = 15707`, `truncated = true`, `included = "ALL (portal styles)"`.
  - `appcss`: `totalRules = 2248`, `truncated = true`, `included = "ALL (portal styles)"`.
- Cross-origin stylesheet listed but not read:
  - `https://mapssharedstorage01.blob.core.windows.net/.../hp.ua3.core.tenantTheme.css`.

Notable extracted facts visible in the captured CSS text:

- The captured `vendorcss` bundle contains Kendo CSS custom properties like `--kendo-color-primary: #ff6358` and many other `--kendo-*` variables.

Evidence used:

- `docs/provider-probe/13-css-rules.json`: `portalStylesheets`, `sameOrigin.vendorcss`, `sameOrigin.appcss`, `crossOrigin`.

## Q14

Cross-module consistency check.

Targets opened (without clicking menu items; opened via captured hrefs):

- `m1`: module `Administration` / screen `Broadcast Message` at `https://uximc.mms.tst.pgwcloud.net/BroadcastMessage/BroadcastMessageSearch`.
- `m2`: module `Alert Notification` / screen `Event Configuration` at `https://uximc.mms.tst.pgwcloud.net/Notifications/EventNotificationSearch`.

High-level answers as recorded in the JSON:

- `shellMarkupIdenticalApartFromTitle`: `true`
- `sameKendoVersion`: `true`
- `widgetTypesSimilar`: `true`
- `sameHelpIconsPattern`: `[UNKNOWN: not probed specifically]`
- `sameSearchResetCancelLayout`: `[UNKNOWN: not probed specifically]`

Supporting evidence highlights:

- The `m2` stack fingerprint matches the File Transfer screens for jQuery (`3.7.1`), Kendo (`2026.1.415`), and the stylesheet list (`/bundles/vendorcss`, `/bundles/appcss`, and the cross-origin tenant theme stylesheet).
- Widget role counts on `m2` include `tooltip`, `columnsorter`, `menu`, plus a single `grid` and `pager` among others.

Evidence used:

- `docs/provider-probe/14-cross-module.json`: `targets[]`, `results.*`, `answers.*`.
- `docs/provider-probe/14-m1.png`: rest-state screenshot for `m1`.
- `docs/provider-probe/14-m2.png`: rest-state screenshot for `m2`.

## Q15

`home` page inventory.

Blocks (as recorded):

- A single block was enumerated: `form#mainForm.k-content` with title `Medicaid Management Solutions` and a text sample beginning `Medicaid Management Solutions Charting a New Direction for Better Healthcare Outcomes`.

Widget inventory on home (as recorded):

- `dataRoleCount`: `32`
- Top roles: `tooltip` (27), `menu` (5)

Evidence used:

- `docs/provider-probe/15-home.json`: `url`, `screenshot`, `blocks[]`, `widgets.*`.
- `docs/provider-probe/15-home.png`: referenced by `15-home.json`.


## Q16 - Side Menu (Hamburger) Behavior

Summary: This probe captures the hamburger-triggered side menu (`ul#mainMenu[data-role="menu"]`) on `cfg` (`/FileTransfer/SearchSourceLocations`) in a read-only way (no menu item clicks).

- Open/close behavior (from sampler evidence in `openCloseSample_click` / `openCloseSample_keyboard`):
  - Panel rect during open samples (both click + keyboard): `rect={x:1632,y:91,width:288,height:864}`, `opacity="1"`, `transform="none"` (constant across sampled times `t=0..600ms`).
  - Close samples (both click + keyboard): the probe still measured the panel with the same rect/opacity/transform across `t=0..600ms`.
  - Limitation: the sampler output does not show an observable close transition (or post-close hidden state) for the panel. Close behavior via Esc/outside-click/X is therefore not confirmed by the sampler fields alone.

- Selectors detected:
  - Hamburger button selector: `#pageBannerMenu > nav > div > i` (from `menuButton`).
  - Menu panel selector: `[data-pw-probe-menu="1"]` (from `panelSelector`).
  - Overlay selector: `null` (from `overlaySelector`).
  - Focus snapshot around the keyboard-open step: `focus.beforeKeyboard.activeTag = "i"`, `focus.afterKeyboard.activeTag = "i"` (focus stayed on the hamburger icon in this capture).

- Menu panel outerHTML (summary only):
  - Full panel HTML is captured in `docs/provider-probe/16-menu.json` as `panelOuterHTML` (length ~60,790 chars in this artifact).
  - Panel root begins with: `<ul id="mainMenu" data-role="menu" class="... k-menu k-menu-vertical ..." ...>`.
  - The captured `panelOuterHTML` contains `li` items marked `aria-haspopup="true"` and `aria-expanded="false"` (no `aria-expanded="true"` occurrences were found in this capture).

- Menu item inventory (from `menuItems`, which is explicitly noted as truncated):
  - `menuItems.itemCount = 15`.
  - `menuItems.note`: “Leaf-most visible menu-related elements under the open panel; truncated.”
  - All inventoried items have `tag: "a"` and a non-empty `href` (15/15).
  - Sample items (label -> href):
    - `Claims Management` -> `/ClaimsManagement/Dashboard`
    - `Drug Rebate` -> `/DrugRebate/Dashboard`
    - `UI Examples` -> `/Employee/UIExamples`
    - `Integration` -> `/Integration/Dashboard`
    - `Managed Care` -> `/ManagedCare/Dashboard`
    - `Member Management` -> `/MemberManagement/MemberLanding`

- Hover behavior / submenu (from `hoverSubmenu`):
  - Hovered item: `Claims Management` (selector `[data-pw-probe-hoveritem="1"]`).
  - Submenu panel detected: `[data-pw-probe-submenu="1"]`.
  - Submenu style snapshot: `display="block"`, `opacity="1"`, `z-index="10002"`, `rect={x:1513.609375,y:163,width:118.390625,height:74}`.
  - Submenu outerHTML exists (`hoverSubmenu.submenuOuterHTML`, length ~1,492 chars) and begins with a Kendo animation container: `div.k-animation-container ...`.
  - Submenu labels visible in the captured submenu HTML include: `Search Claims`, `Pro DUR`.
  - Submenu animation sampling (`hoverSubmenu.sample`):
    - `open` frames keep a constant rect/opacity/transform from `t=0..600ms`.
    - `close` frames report `rect={x:0,y:0,width:0,height:0}` from `t=0..600ms`.

- Visual evidence (screenshots):
  - `docs/provider-probe/16-menu-top.png`: baseline page (menu closed; hamburger icon visible at top right).
  - `docs/provider-probe/16-menu-open.png`: menu open (page appears dimmed behind the menu; close `X` icon is visible in the header).
  - `docs/provider-probe/16-menu-open-kbd.png`: menu open via keyboard path (visually similar open state).
  - `docs/provider-probe/16-menu-hover-open.png`: menu open with hover submenu visible for `Claims Management`.
  - Missing optional Q16 screenshots (not present in `docs/provider-probe/`): `16-menu-hover-open-full.png`, `16-menu-hover-submenu.png`.

- Guardrail evidence (probe safety):
  - `note` states the probe is read-only and does not click menu items or navigate.
  - `guardEvents` is an empty array (`[]`) in this artifact (no navigation or POST guard events were recorded by this probe run).

Evidence used:

- `docs/provider-probe/16-menu.json`: `note`, `url`, `menuButton`, `panelSelector`, `overlaySelector`, `openCloseSample_click`, `openCloseSample_keyboard`, `panelOuterHTML`, `menuItems`, `hoverSubmenu`, `focus`, `guardEvents`, `screenshots`.
- `docs/provider-probe/16-menu-top.png`
- `docs/provider-probe/16-menu-open.png`
- `docs/provider-probe/16-menu-open-kbd.png`
- `docs/provider-probe/16-menu-hover-open.png`

