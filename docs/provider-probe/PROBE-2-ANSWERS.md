# Provider Probe Answers (Online) - Probe 2

All answers below are derived strictly from the existing probe evidence artifacts in `docs/provider-probe/` (the `20-*` .. `24-*` artifacts). No additional browser probing/clicking was performed while generating this write-up.

## Provenance

Answers are derived strictly from `docs/provider-probe/` artifacts.

Pass list (verbatim from `docs/provider-probe/SUMMARY-2.md`):

- Q20 census: ok (2026-11-10T10:25:31.782Z)
- Q21 tooltips: ok (2026-11-10T10:27:01.667Z)
- Q22 menu: ok (2026-11-10T10:28:55.043Z)
- Q23 dialogs: ok (2026-11-10T10:29:40.093Z)
- Q24 UI examples: ok (2026-11-10T10:30:03.050Z)

## Q20 (Census)

This section summarizes the Q20 widget census outputs.

Totals and key findings from `20-census.json`:

- `20-census.json` is a JSON array with `160` entries.
- Error field distribution (by `error` value as present in the entries):
  - `Invalid URL`: `152`
  - Entries missing an `error` field: `3`
  - `page.evaluate: Target page, context or browser has been closed`: `2`
  - `timeout after 25000ms`: `2`
  - `page.goto: net::ERR_NAME_NOT_RESOLVED at http://https//apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review ...`: `1`
- Each entry contains `trail` (menu trail), `href`, and `url`; some entries also include `error`.

Key findings from `20-census-summary.md`:

- Playwright version recorded: `1.56.1`.

Roles (data-role) by module (verbatim table from `20-census-summary.md`):

| module | pages | combobox | datepicker | datetimepicker | dropdownlist | grid | menu | numerictextbox | popup | timepicker | tooltip | window | columnsorter | staticlist | textbox | validator | resizable | selectable | pager | button | checkbox |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| File Transfer Services | 3 | 0 | 0 | 2 | 9 | 3 | 15 | 6 | 13 | 0 | 98 | 0 | 21 | 9 | 6 | 4 | 3 | 3 | 3 | 2 | 2 |

Wrappers by module (verbatim table from `20-census-summary.md`):

| module | pages | .k-checkbox |
|---|---:|---:|
| File Transfer Services | 3 | 2 |

Unknown widget types findings (verbatim list from `20-census-summary.md`, section “Pages using widgets the kit does not know”):

- File Transfer Services > File Transfer Configuration - .k-checkbox, button, checkbox, columnsorter, pager, resizable, selectable, staticlist, textbox, validator - https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations
- File Transfer Services > File Transfer Tracking - columnsorter, pager, resizable, selectable, staticlist, textbox, validator - https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking
- File Transfer Services > FTP Server Credentials - .k-checkbox, button, checkbox, columnsorter, pager, resizable, selectable, staticlist, textbox, validator - https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials

Screenshots:

- Viewport screenshots exist under `docs/provider-probe/20-census/` (module subfolders), and are stored as `.jpg` files.

Evidence used:

- `docs/provider-probe/20-census.json`: array length; per-entry fields `trail`, `href`, `url`, `error`.
- `docs/provider-probe/20-census-summary.md`: Playwright version line; “Roles (data-role) by module” table; “Wrappers by module” table; “Pages using widgets the kit does not know” list.
- `docs/provider-probe/20-census/file-transfer-services/file-transfer-configuration.jpg`
- `docs/provider-probe/20-census/file-transfer-services/file-transfer-tracking.jpg`
- `docs/provider-probe/20-census/file-transfer-services/ftp-server-credentials.jpg`
- `docs/provider-probe/20-census/provider-enrollment/workflow-dashboard.jpg`
- `docs/provider-probe/20-census/provider-enrollment/workflow-applications.jpg`

## Q21 (Tooltips)

This section summarizes tooltip width and line-count measurements from `21-tooltips.json`.

Per page (based on `pages.<page>.tooltips[*].rect.width`, `lineHeight`, `lines`):

- `cfg` (`pages.cfg.url` = `https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations`):
  - Tooltips recorded: `6`
  - `rect.width` range: `62.698` to `135.844`
  - `lineHeight`: `18px` (unique value across recorded tooltips)
  - `lines`: min `1`, max `1`

- `trk` (`pages.trk.url` = `https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking`):
  - Tooltips recorded: `11`
  - `rect.width` range: `51.792` to `125.979`
  - `lineHeight`: `18px` (unique value across recorded tooltips)
  - `lines`: min `1`, max `1`

- `ftp` (`pages.ftp.url` = `https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials`):
  - Tooltips recorded: `5`
  - `rect.width` range: `93.802` to `93.802`
  - `lineHeight`: `18px` (unique value across recorded tooltips)
  - `lines`: min `1`, max `1`

Example screenshots are present as `21-tooltip-*.png` files (the screenshot file names are also listed in `21-tooltips.json` under `screenshots`).

Evidence used:

- `docs/provider-probe/21-tooltips.json`: `pages.<page>.url`, `pages.<page>.tooltips[*].rect.width`, `pages.<page>.tooltips[*].lineHeight`, `pages.<page>.tooltips[*].lines`, `screenshots`.
- `docs/provider-probe/21-tooltip-1.png`
- `docs/provider-probe/21-tooltip-2.png`
- `docs/provider-probe/21-tooltip-3.png`
- `docs/provider-probe/21-tooltip-4.png`
- `docs/provider-probe/21-tooltip-5.png`
- `docs/provider-probe/21-tooltip-6.png`

## Q22 (Menu)

This section summarizes side menu open / fly-out (hover) / close behaviors recorded in `22-menu.json`.

Pages captured (from `22-menu.json: perPage` keys): `home` and `cfg`.

Open behavior (both `home` and `cfg`):

- `before`: `container.className = "display-none"`, `container.style.display = "none"`, and `backdropCount = 0`.
- After hamburger click:
  - `t+50ms`, `t+300ms`, `t+900ms`: `container.className = "display-flex"`, `container.style.display = "flex"`, `container.style.opacity = "1"`, `container.style.transform = "none"`.
  - `t+50ms`, `t+300ms`, `t+900ms`: `backdropCount = 1`.
  - `t+50ms`: `backdropOuterHTML = "<div class=\"disabled-backdrop\"></div>"` and `backdropStyle.opacity = "0.3"`.

Kendo menu options captured (both `home` and `cfg`, from `kendoMenuOptions`):

- `animation.open.duration = 200`
- `animation.close.duration = 100`
- `hoverDelay = 100`
- `direction = "default"`
- `orientation = "vertical"`
- `openOnClick = false`

Fly-out (hover) behavior:

- For both `home` and `cfg`: `flyout.at50` is `null` and `flyout.at300` includes a `rect` and `inlineStyle` snapshot.
- `flyout.screenshot` is recorded per page:
  - `home`: `22-menu-flyout-home.png`
  - `cfg`: `22-menu-flyout-cfg.png`

Close behavior (values are recorded under `closedBy`):

- For both `home` and `cfg`:
  - `closeButtonStillOpen = false`
  - `escapeStillOpen = true`
  - `backdropClickStillOpen = true`

Video:

- `22-menu.webm` is referenced by `22-menu.json` under `video`.

Evidence used:

- `docs/provider-probe/22-menu.json`: `perPage.<page>.timeline[*]` (before + open sampling), `perPage.<page>.kendoMenuOptions`, `perPage.<page>.flyout`, `perPage.<page>.closedBy`, `video`, `screenshots`.
- `docs/provider-probe/22-menu-flyout-home.png`
- `docs/provider-probe/22-menu-flyout-cfg.png`
- `docs/provider-probe/22-menu.webm`

## Q23 (Create New + grid row dialogs)

This section summarizes the presence of “Create New” and whether a `.k-window` opened, per page, based on `23-dialogs.json`.

File Transfer Configuration (`pages.cfg.url` = `https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations`):

- Create New exists: `true` (`pages.cfg.createNew.exists`).
- `.k-window` opened after clicking Create New: `false` (`pages.cfg.createNewResult.opened`).
- Requests recorded after clicking Create New (from `pages.cfg.createNewResult.requests[*]`):
  - `POST /FileTransfer/FileTransferConfigurationEdit/`
  - `GET /Scripts/FileTransfer/hp.ua3.fileTransfer.FileTransferConfigurationEditInit.js`
  - `GET /api/FileTransfer/GetFtpServerDetails/`
  - `GET /api/FileTransfer/GetDataListData/`
  - `GET /api/FileTransfer/GetFtpServerDetails/`
  - `GET /Scripts/hp.ua3.core.multiPanelEditor.js`
- Scroll-preventing / scrollable evidence (window options/style/rect): not present in evidence (no window `info` object is present because `opened=false`).

File Transfer Tracking (`pages.trk.url` = `https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking`):

- Create New exists: `false` (`pages.trk.createNew.exists`).
- `.k-window` opened after clicking Create New: not present in evidence (`pages.trk.createNewResult` is `null`).
- Scroll-preventing / scrollable evidence (window options/style/rect): not present in evidence.

FTP Server Credentials (`pages.ftp.url` = `https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials`):

- Create New exists: `true` (`pages.ftp.createNew.exists`).
- `.k-window` opened after clicking Create New: `true` (`pages.ftp.createNewResult.opened`).
- Window info recorded under `pages.ftp.createNewResult.info`:
  - `title`: `Add FTP Server Credentials`
  - `rect`: `{ x: 952.7999877929688, y: 443.13543701171875, width: 14.399984359741211, height: 6.1666669845581055 }`
  - `options`: `null`
  - `overlay.className`: `k-overlay`
  - `overlay.style`: `z-index: 11501; display: block; opacity: 0.5; transition: 350ms ease-out;`
  - `outerHTML` contains (among other content):
    - Window root inline style includes `max-height: 918px;`.
    - `.k-window-content` inline style includes `max-height: 918px; overflow: hidden;`.
- Requests recorded after clicking Create New (from `pages.ftp.createNewResult.requests[*]`):
  - `GET /FileTransfer/AddFTPServerCredentials/`
  - `GET /Scripts/FileTransfer/hp.ua3.fileTransfer.viewEditFtpServerCredentials.js`
- Scroll-preventing / scrollable evidence (based on recorded window options/style/rect):
  - Recorded window `options` are `null` in the evidence.
  - Recorded window `outerHTML` includes `.k-window-content` inline style `overflow: hidden;`.
  - No additional scroll-lock / scrollable indicators are present in the captured fields beyond the overlay style and window `outerHTML`.

Grid row dialogs:

- For all three pages (`cfg`, `trk`, `ftp`), `searchResult` is `null` in `23-dialogs.json`, so row count / row click / row double-click dialog evidence is not present in this artifact.

Screenshots:

- `23-ftp-create-new.png` is referenced in `23-dialogs.json` as `pages.ftp.createNewResult.screenshot`.

Evidence used:

- `docs/provider-probe/23-dialogs.json`: `pages.cfg.createNew`, `pages.cfg.createNewResult.opened`, `pages.cfg.createNewResult.requests[*]`; `pages.trk.createNew`, `pages.trk.createNewResult`; `pages.ftp.createNew`, `pages.ftp.createNewResult.opened`, `pages.ftp.createNewResult.info` (title/rect/options/overlay/outerHTML), `pages.ftp.createNewResult.requests[*]`; `pages.<page>.searchResult`.
- `docs/provider-probe/23-ftp-create-new.png`

## Q24 (UI examples)

This section summarizes the portal “UI Examples” page evidence captured in `24-ui-examples.json`.

Page identity:

- `url`: `https://uximc.mms.tst.pgwcloud.net/Employee/UIExamples`
- Screenshot file: `24-ui-examples.png`
- `census.title`: `UI Examples`
- `census.activeTab`: `Pages`
- `census.hasIframe`: `false`
- `census.tookMs`: `13848`

Widget counts on this page (from `census.roles`):

- Top counts (by value): `tooltip = 334`, `checkbox = 97`, `columnsorter = 63`, `popup = 34`, `button = 33`.
- Additional recorded role keys include (not exhaustive): `window = 17`, `dropdownlist = 16`, `numerictextbox = 13`, `grid = 7`, `tabstrip = 4`, `datepicker = 3`, `datetimepicker = 3`, `timepicker = 2`, `multiselect = 2`, `upload = 2`, `treeview = 2`, `wizard = 1`, `stepper = 1`, `treelist = 1`.

Wrapper counts on this page (from `census.wrappers`):

- `.k-tabstrip = 4`, `.k-upload = 2`, `.k-multiselect = 2`, `.k-maskedtextbox = 7`, `.k-switch = 2`, `.k-checkbox = 146`, `.k-radio = 19`, `.k-treeview = 2`, `.k-stepper = 1`, `.k-wizard = 1`, `.k-autocomplete = 2`.

Headings:

- `headings` list length: `55`.
- The recorded `headings` list includes (as individual strings):
  - `AutoComplete`
  - `DatePicker / DateTimePicker`
  - `TimePicker`
  - `Multi-select Calendar`
  - `Timeline`
  - `Wizard`
  - `ListBox`
  - `TreeList`
  - `TreeView`
  - `Widget Alignment Test`

Evidence used:

- `docs/provider-probe/24-ui-examples.json`: `url`, `screenshot`, `census.*` (title/activeTab/hasIframe/tookMs/roles/wrappers), `headings[*]`.
- `docs/provider-probe/24-ui-examples.png`

## Gaps (from evidence)

- `docs/provider-probe/20-census.json` entries contain `trail` / `href` / `url` and (sometimes) `error`, but do not contain per-page widget census fields such as role counts / wrapper counts / grid details / scripts extraction (those fields are not present in this JSON artifact).
- `docs/provider-probe/20-census-summary.md` contains role/wrapper summaries only for the `File Transfer Services` module (no other module rows are present in the tables).
- `docs/provider-probe/23-dialogs.json` has `pages.<page>.searchResult = null` for `cfg`, `trk`, and `ftp`, so evidence about grid row click / double-click behavior and any resulting `.k-window` dialogs is not present.
- `docs/provider-probe/23-dialogs.json` has `pages.ftp.createNewResult.info.options = null`, and does not include additional captured fields such as page/body scroll state, so scroll-preventing behavior cannot be determined beyond the recorded overlay style and window `outerHTML`.
