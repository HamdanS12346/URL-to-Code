# UI SPEC ? fxfer-v8/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with mvcUnobtrusive + jquery 3.7.1 ? target React 19
> Evidence tags: `[kit:k#]` kit widget/dialog ? `[ctl:key]` element ? `[val:key]` validator ? `[asset:path]` capture/kit/sections file ? `[M##]` motion ? `[UNKNOWN: ?]`

## 1. Overview
File Transfer Tracking lets a portal user search for file transfers (by ID/name/status/direction/etc.) and review tracking details for a selected transfer. [asset:sections/02-pagebody.png]

Primary tasks:
- Search for file transfers using criteria, then review results in the grid. [kit:k9, asset:kit/states/search.png]
- Open a transfer?s detail dialog from the results grid to review Information, Events, and Exceptions. [kit:d1, asset:kit/states/dialog-d1.png]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:kit/states/search.png]

Content area scope for this spec: `#pageBody > main` (search criteria + search results). [ctl:pageBody]

Page: fluid width; content panel centered with ~30px side margins; page scrolls (results extend below the fold). [asset:kit/states/search.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content area | `pageBody` (`div#pageBody.row`) | 0,138.17,1920,627.33 | `sections/02-pagebody.png` | contains the search panel and (after Search) results grid | no explicit bg (inherits white) | [ctl:pageBody, asset:sections/02-pagebody.png] |
| Search panel | `.content-panel-container` | 30,138.17,1860,573.33 | `sections/02-pagebody.png` | stacked: header row then form fields then buttons row | white bg, 10px radius, drop shadow | [asset:sections/02-pagebody.png] |
| Search panel header | `.content-panel-hdr` | 30.67,138.83,1858.67,48 | `sections/02-pagebody.png` | left title + right tools | light gray bg | [asset:sections/02-pagebody.png] |
| Collapse chevron | `button-22` (panel icon) | 1846.83,165.83,27.5,30 | `sections/02-pagebody.png` | header tool icon | caret/chevron icon | [ctl:button-22, asset:sections/02-pagebody.png] |
| Search Results panel | `[kit:k9]` grid container | [UNKNOWN: box of Search Results grid in the frozen capture] | `kit/states/search.png` | header ?Search Results? + grid + pager | Kendo grid | [kit:k9, asset:kit/states/search.png] |

### 2.1 Search panel
- THE SYSTEM SHALL show a panel titled ?Search Criteria?. [asset:sections/02-pagebody.png]
- THE SYSTEM SHALL show ?Required Fields ( * )? text at the top-right of the panel body. [asset:sections/02-pagebody.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | Arial, "Helvetica Neue", Helvetica, sans-serif 14px/14px | default body | [asset:sections/02-pagebody.png] |
| `--color-text` | rgb(61, 61, 61) | labels and body text | [asset:sections/02-pagebody.png] |
| `--color-panel-bg` | rgb(255, 255, 255) | search panel background | [asset:sections/02-pagebody.png] |
| `--color-panel-header-bg` | rgb(250, 250, 250) | search panel header background | [asset:sections/02-pagebody.png] |
| `--color-border` | rgb(222, 226, 230) | panel border | [asset:sections/02-pagebody.png] |
| `--radius-panel` | 10px | search panel corners | [asset:sections/02-pagebody.png] |
| `--shadow-panel` | rgba(0, 0, 0, 0.08) 0px 8px 10px 1px | panel shadow | [asset:sections/02-pagebody.png] |
| `--color-link` | rgb(0, 98, 255) | inline/help icons + link affordances | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell logo | 117?57 | shell-owned (not specified here beyond the wrapper note) | [asset:capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | icon | 18?16 | icon asset used in shell | [asset:capture/assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | icon | 18?16 | icon asset used in shell | [asset:capture/assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | dropdown caret icon | 18?16 | used by dropdowns in search criteria | [asset:capture/assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | dropdown caret icon | 18?16 | used by dropdowns in search criteria | [asset:capture/assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | datepicker icon | 18?16 | used by From Date | [asset:capture/assets/_svg/svg-5.svg] |
| `assets/_svg/svg-6.svg` | time icon | 18?16 | used by From Date | [asset:capture/assets/_svg/svg-6.svg] |
| `assets/_svg/svg-7.svg` | datepicker icon | 18?16 | used by To Date | [asset:capture/assets/_svg/svg-7.svg] |
| `assets/_svg/svg-8.svg` | time icon | 18?16 | used by To Date | [asset:capture/assets/_svg/svg-8.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - Shared shell *shared* ? header + menus (out of scope for this spec) [asset:kit/states/search.png]
  - `SearchCriteriaPanel`
    - `SearchCriteriaFields` ? fields in ?6 [asset:sections/02-pagebody.png]
    - `SearchActions` ? Reset / Cancel / Search [ctl:resetButton]
  - `SearchResultsGrid` ? Kendo grid [kit:k9]
  - `FileTransferTrackingDialog` ? Kendo dialog window [kit:d1]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | current criteria values | panel collapsed/expanded | `button-22` | [ctl:button-22, asset:sections/02-pagebody.png] |
| `SearchCriteriaFields` | criteria values | none | `FileId`, `FileName`, dropdowns, date/time, numeric fields | [asset:sections/02-pagebody.png, kit:k1, kit:k2, kit:k3, kit:k4, kit:k5, kit:k6, kit:k7, kit:k8] |
| `SearchActions` | current criteria | none | `resetButton`, `cancelButton`, `nextButton` | [ctl:resetButton, ctl:cancelButton, ctl:nextButton] |
| `SearchResultsGrid` | last search results | selected row, sort/page | `[kit:k9]` | [kit:k9, asset:kit/states/search.png] |
| `FileTransferTrackingDialog` | selected transfer id | dialog open/close | `[kit:d1]` | [kit:d1, asset:kit/states/dialog-d1.png] |

## 6. Fields & validation
Search criteria fields (top panel):

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FileId` | File ID | text | empty | no | regex: disallow `; * ^ : ~ < > %` | File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: when validation fires (on blur vs on Search)] | [ctl:FileId, kit:k9] |
| `FileName` | File Name | text | empty | no | regex: disallow `; * ^ : ~ < > %` | File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: when validation fires (on blur vs on Search)] | [ctl:FileName, kit:k9] |
| `combobox-file-status-file-status` | File Status | dropdown (Kendo dropdownlist) | option label ?select a value...? | no | options: Complete, Error, Transferring | ? | on selection | [ctl:combobox-file-status-file-status, kit:k1, asset:kit/states/dropdown.png] |
| `combobox-direction-direction` | Direction | dropdown (Kendo dropdownlist) | option label ?select a value...? | no | options: INBOUND, OUTBOUND | ? | on selection | [ctl:combobox-direction-direction, kit:k2] |
| `combobox-transport-type-transport-type` | Transport Type | dropdown (Kendo dropdownlist) | option label ?select a value...? | no | options: FTP, SFTP, UNC, FTPS | ? | on selection | [ctl:combobox-transport-type-transport-type, kit:k3] |
| `combobox-source-location-source-location` | Source Location | dropdown (Kendo dropdownlist, filter=contains) | option label ?select a value...? | no | options list is large; examples include ?a6 - 123.43?, ?Admin - https://tenant2-fltest.mapshc.com/?, ?chrometested - /4?, ?config - /Addrs?, ?PICTOutBound - ?Batch\Output? | ? | on selection | [ctl:combobox-source-location-source-location, kit:k4] |
| `TradingPartnerId` | Trading Partner ID | text | empty | no | regex: disallow `; * ^ : ~ < > %` | Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: when validation fires (on blur vs on Search)] | [ctl:TradingPartnerId, kit:k9] |
| `FromDate` | From Date | datetime (Kendo datetime picker) | prefilled to ?today? (0 day offset) | no | must be a date; must match `M/d/yyyy h:mm tt` | The field From Date must be a date. / From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN: when validation fires] | [ctl:FromDate, kit:k5] |
| `ToDate` | To Date | datetime (Kendo datetime picker) | prefilled to ?today? (0 day offset) | no | must be a date; must match `M/d/yyyy h:mm tt` | The field To Date must be a date. / To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN: when validation fires] | [ctl:ToDate, kit:k6] |
| `text-from-size-kb-from-size-kb` | From Size (KB) | numeric text input (Kendo numeric) | empty | no | numeric; at most 2 decimal places | From Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN: when validation fires] | [ctl:text-from-size-kb-from-size-kb, kit:k7] |
| `text-to-size-kb-to-size-kb` | To Size (KB) | numeric text input (Kendo numeric) | empty | no | numeric; at most 2 decimal places | To Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN: when validation fires] | [ctl:text-to-size-kb-to-size-kb, kit:k8] |

Dialog `File Transfer Tracking` fields (opened from results):

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| [UNKNOWN: dialog field test ids] | File ID | text / read-only display | populated from selected row | ? | regex: disallow `; * ^ : ~ < > %` | File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| [UNKNOWN: dialog field test ids] | Create Date | text / read-only display | populated from selected row | ? | must be a date; must match `M/d/yyyy h:mm tt` | The field Create Date must be a date. / Create Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| [UNKNOWN: dialog field test ids] | File Name | text / read-only display | populated | ? | regex: disallow `; * ^ : ~ < > %` | File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| [UNKNOWN: dialog field test ids] | Size (KB) | numeric / read-only display | populated | ? | numeric; at most 2 decimal places | Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| [UNKNOWN: dialog field test ids] | Originating Server Name | text / read-only display | populated | ? | regex: disallow `; * ^ : ~ < > %` | Originating Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| [UNKNOWN: dialog field test ids] | Source Location | text / read-only display | populated | ? | regex: disallow `; * ^ : ~ < > %` | Source Location contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| [UNKNOWN: dialog field test ids] | Trading Partner ID | text / read-only display | populated | ? | regex: disallow `; * ^ : ~ < > %` | Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN] | [kit:d1, asset:kit/states/dialog-d1.png] |
| `k10` | Direction | dropdown (Kendo dropdownlist) | selected value (e.g. OUTBOUND) | ? | options: INBOUND, OUTBOUND | ? | on selection | [kit:k10, kit:d1, asset:kit/states/dialog-d1.png] |
| `k11` | File Status | dropdown (Kendo dropdownlist) | selected value (e.g. Complete) | ? | options: Complete, Error, Transferring | ? | on selection | [kit:k11, kit:d1, asset:kit/states/dialog-d1.png] |
| `k12` | Transport Type | dropdown (Kendo dropdownlist) | selected value (e.g. UNC) | ? | options: FTP, SFTP, UNC, FTPS | ? | on selection | [kit:k12, kit:d1, asset:kit/states/dialog-d1.png] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| Search panel collapsed | boolean | false | click `button-22` | hides/shows search fields in the Search Criteria panel | [ctl:button-22] |
| Search results visible | boolean | false | Search | shows the ?Search Results? panel with grid [kit:k9] | [kit:k9, asset:kit/states/search.png] |
| Selected result row | selection | none | click a grid row | enables row-based actions; double-click opens dialog | [kit:k9, kit:d1] |
| Dialog open (`File Transfer Tracking`) | modal/dialog | closed | double-click first grid row | shows dialog d1 over the page; dialog scrolls internally | [kit:d1, asset:kit/states/dialog-d1.png] |

Hidden at load (facts ?12):
None. [asset:sections/02-pagebody.png]

## 8. Behavior
### 8.1 Search Criteria panel
- THE SYSTEM SHALL show the Search Criteria panel with the fields listed in ?6. [asset:sections/02-pagebody.png]
- WHEN the user clicks the panel collapse control (`button-22`) THE SYSTEM SHALL collapse/expand the Search Criteria panel. [ctl:button-22]
- WHEN the user clicks Reset (`resetButton`) THE SYSTEM SHALL clear criteria fields back to their default values. [ctl:resetButton, kit:k1, kit:k2, kit:k3, kit:k4, kit:k5, kit:k6, kit:k7, kit:k8]
- WHEN the user clicks Search (`nextButton`) THE SYSTEM SHALL run a search and show the Search Results grid. [ctl:nextButton, kit:k9, asset:kit/states/search.png]
- WHEN the user clicks Cancel (`cancelButton`) THE SYSTEM SHALL [UNKNOWN: confirm/navigation behavior for Cancel on this screen]. [ctl:cancelButton, UNKNOWN]

### 8.2 Search Results grid
- THE SYSTEM SHALL render a results grid with columns: File ID, File Name, File Status, Direction, Transport Type, Size (KB), Create Date, Trading Partner ID. [kit:k9, asset:kit/states/search.png]
- THE SYSTEM SHALL show 10 rows per page (pager ?1-10 of 329244 Items? in the captured state). [kit:k9, asset:kit/states/search.png]
- WHEN the user double-clicks the first grid row THE SYSTEM SHALL open the ?File Transfer Tracking? dialog (d1). [kit:d1]

### 8.3 Dialog: File Transfer Tracking
- THE SYSTEM SHALL open a dialog titled ?File Transfer Tracking? showing sections: INFORMATION, EVENTS, EXCEPTIONS. [kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL show EVENTS as a grid with columns: Event Code, Create Date, Description. [kit:k13, kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL show EXCEPTIONS as a grid with columns: Date, Exception Type, Method Name; when empty it shows ?There are no records found.? [kit:k14, kit:d1, asset:kit/states/dialog-d1.png]
- WHEN the user closes the dialog via X or Cancel THE SYSTEM SHALL close the dialog (even if edits were made). [kit:d1]

### 8.4 Scroll behavior (facts ?16)
None. [asset:kit/states/search.png]

### 8.5 Media (facts ?17)
None. [asset:kit/states/search.png]

## 9. Navigation
No navigation. [asset:sections/02-pagebody.png]

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response ? UI | evidence |
|---|---|---|---|---|
| Search (`nextButton`) | GET `/api/FileTransfer/SearchFileTransferTracking/` (no params recorded when Search clicked with the default/blank form) | Provide an API stub matching the legacy endpoint; criteria query params are `[UNKNOWN]` | response populates the results grid [kit:k9] (captured: 10 rows visible, total 329244) | [kit:k9, asset:kit/states/search.png] |

## 11. Accessibility
- Each field label appears immediately above/left of its control (e.g., File ID label near `FileId`). [ctl:FileId, asset:sections/02-pagebody.png]
- The dialog has a visible title and close control (X). [kit:d1, asset:kit/states/dialog-d1.png]

## 12. Test ids
The rebuild SHALL add `data-testid="<key>"` to every element key used by `spec/parity.spec.ts` (the generated `SEL` map) and `spec/selectors.json`. [asset:spec/parity.spec.ts]

Required control keys for this screen (parity harness expects these keys, including shared-shell keys):
- [ctl:pageBannerLogo]
- [ctl:button]
- [ctl:button-medicaid-management-solutions]
- [ctl:button-2]
- [ctl:AAGMenu.BroadcastMsg]
- [ctl:link-messages]
- [ctl:AAGMenu.ExternalLinks]
- [ctl:link-external-links]
- [ctl:AAGMenu.Favorites]
- [ctl:link-favorites]
- [ctl:AAGMenu.ContactUs]
- [ctl:link-contact-us]
- [ctl:AAGMenu.MyAccount]
- [ctl:AAGMenu.Logout]
- [ctl:link-logout]
- [ctl:button-main-menu-2]
- [ctl:button-8]
- [ctl:activeModuleMenu]
- [ctl:activeModuleMenuFirstItem]
- [ctl:button-help]
- [ctl:button-22]
- [ctl:button-collapse]
- [ctl:FileIdHelp]
- [ctl:FileId]
- [ctl:FileNameHelp]
- [ctl:FileName]
- [ctl:FileStatusHelp]
- [ctl:combobox-file-status-file-status]
- [ctl:button-select]
- [ctl:DirectionHelp]
- [ctl:combobox-direction-direction]
- [ctl:button-select-2]
- [ctl:TransportTypeHelp]
- [ctl:combobox-transport-type-transport-type]
- [ctl:button-select-3]
- [ctl:SourceLocationIdHelp]
- [ctl:combobox-source-location-source-location]
- [ctl:button-select-4]
- [ctl:TradingPartnerIdHelp]
- [ctl:TradingPartnerId]
- [ctl:FromDateHelp]
- [ctl:FromDate]
- [ctl:button-open-the-date-view]
- [ctl:button-open-the-time-view]
- [ctl:ToDateHelp]
- [ctl:ToDate]
- [ctl:button-open-the-date-view-2]
- [ctl:button-open-the-time-view-2]
- [ctl:FromSizeHelp]
- [ctl:text-from-size-kb-from-size-kb]
- [ctl:ToSizeHelp]
- [ctl:text-to-size-kb-to-size-kb]
- [ctl:resetButton]
- [ctl:cancelButton]
- [ctl:nextButton]
- [ctl:button-disclaimer]
- [ctl:button-website-requirements]
- [ctl:button-privacy-policy]
- [ctl:button-cookie-policy]

Content-area keys of note (non-exhaustive):
- [ctl:pageBody]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v8/screens/file-transfer-tracking/spec/parity.spec.ts`


## 13. Open questions
1. What does Cancel (`cancelButton`) do on this screen (navigate away, clear fields, or something else)? [UNKNOWN]
2. When criteria fields are filled, which query params are sent to `/api/FileTransfer/SearchFileTransferTracking/`? [UNKNOWN]
3. In dialog d1, are Direction/File Status/Transport Type dropdowns (`k10`/`k11`/`k12`) editable filters, or read-only displays of the selected row? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL run the CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1) on the listed input wrapper elements; this has no visible motion in the capture. [M01]
