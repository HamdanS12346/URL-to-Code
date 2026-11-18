# UI SPEC — fxfer-v9/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive + jQuery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element/control · `[val:key]` validator · `[asset:path]` capture file · `[flow:<id>]` flow state · `[kit:<id>]` provider kit widget/dialog · `[M##]` motion · `[UNKNOWN: …]`

## 1. Overview
File Transfer Tracking lets portal users search file transfers by criteria (id/name/status/direction/type/partner/date/size) and view details for a selected transfer. [flow:n0]

Primary tasks:
- Search for matching file transfers and view the Search Results grid. [flow:n2]
- Open a File Transfer Tracking detail dialog for a result row. [flow:n2.1, kit:d1]

## 2. Layout
Wrapped in the shared shell (see the home spec). [flow:n0]

Page: fluid (full-width) portal content area; main content is a centered card-style panel stack (Search Criteria, then Search Results after Search). [asset:sections/02-pagebody.png, flow:n2]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Search Criteria panel | `#searchFileTrackingPanel` | 30.67,195.83,1858.67,500 | sections/02 | grid of labeled fields + footer actions | card border 0.666667px solid rgb(222, 226, 230), radius 10px, shadow rgba(0, 0, 0, 0.08) 0px 8px 10px 1px | [asset:sections/02-pagebody.png] |
| Search Results panel (appears after Search) | `[data-kit-h="h2"]` + grid | [UNKNOWN: exact box in at-rest capture] | flow n2 | header + data grid + pager | same card styling as Search Criteria | [flow:n2, kit:k9] |
| Detail dialog (modal window) | [kit:d1] | [UNKNOWN: exact box depends on responsive profile] | flow n2.1 | modal dialog with scrollable body | Kendo Window styling; max-height ~85% viewport | [flow:n2.1, kit:d1] |

### 2.1 Search Criteria panel
- Header row shows title “Search Criteria” at left and a collapse/expand chevron button at right. [asset:sections/02-pagebody.png, ctl:button-collapse]
- Top-right text shows “Required Fields ( * )”. [asset:sections/02-pagebody.png]
- Fields are arranged in rows (left-to-right):
  - Row 1: File ID, File Name. [asset:sections/02-pagebody.png, ctl:FileId, ctl:FileName]
  - Row 2: File Status, Direction, Transport Type. [asset:sections/02-pagebody.png, kit:k1, kit:k2, kit:k3]
  - Row 3: Source Location, Trading Partner ID. [asset:sections/02-pagebody.png, kit:k4, ctl:TradingPartnerId]
  - Row 4: From Date, To Date, From Size (KB), To Size (KB). [asset:sections/02-pagebody.png, kit:k5, kit:k6, kit:k7, kit:k8]
- Footer actions: Reset at left; Cancel and Search at right. [asset:sections/02-pagebody.png, ctl:resetButton, ctl:cancelButton, ctl:nextButton]

### 2.2 Search Results panel
- After Search, a “Search Results” heading appears above the results grid. [flow:n2]
- The results area contains the File Transfer Tracking grid and Kendo-style pager (page buttons and page-size selector). [flow:n2, kit:k9]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-base | Arial, "Helvetica Neue", Helvetica, sans-serif | body text | [asset:sections/02-pagebody.png] |
| --color-text | rgb(61, 61, 61) | panel/field text | [asset:sections/02-pagebody.png] |
| --color-surface | rgb(255, 255, 255) | page and card surfaces | [asset:sections/02-pagebody.png] |
| --color-panel-header | rgb(250, 250, 250) | Search Criteria card header strip | [asset:sections/02-pagebody.png] |
| --color-border | rgb(222, 226, 230) | card borders | [asset:sections/02-pagebody.png] |
| --radius-card | 10px | Search Criteria/Search Results cards | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | portal header client logo | 117×57 | shell asset (shared) | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | inline svg icon | 18×16 | used by shell/menu controls | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | inline svg icon | 18×16 | used by shell/menu controls | [asset:assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | inline svg icon | 18×16 | dropdown caret icon | [asset:assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | inline svg icon | 18×16 | dropdown caret icon | [asset:assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | inline svg icon | 18×16 | datetime picker icon | [asset:assets/_svg/svg-5.svg] |
| `assets/_svg/svg-6.svg` | inline svg icon | 18×16 | datetime picker icon | [asset:assets/_svg/svg-6.svg] |
| `assets/_svg/svg-7.svg` | inline svg icon | 18×16 | datetime picker icon | [asset:assets/_svg/svg-7.svg] |
| `assets/_svg/svg-8.svg` | inline svg icon | 18×16 | datetime picker icon | [asset:assets/_svg/svg-8.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - `ProviderShell` *shared* — header/menu/footer wrapper (not specified here) [flow:n0]
  - `SearchCriteriaPanel` — criteria fields + actions [asset:sections/02-pagebody.png]
  - `SearchResultsPanel` — results grid + pager (visible after Search) [flow:n2]
  - `FileTransferTrackingDialog` — detail dialog for a selected result row [flow:n2.1, kit:d1]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| SearchCriteriaPanel | initial criteria values | expanded/collapsed | `button-collapse`, `FileId`, `FileName`, `TradingPartnerId`, `FromDate`, `ToDate`, `text-from-size-kb-from-size-kb`, `text-to-size-kb-to-size-kb`, `resetButton`, `cancelButton`, `nextButton` | [asset:sections/02-pagebody.png, flow:n1] |
| KitWidget(k1) | File Status dropdown | selection | `combobox-file-status-file-status`, `button-select` | [kit:k1, ctl:combobox-file-status-file-status] |
| KitWidget(k2) | Direction dropdown | selection | `combobox-direction-direction`, `button-select-2` | [kit:k2, ctl:combobox-direction-direction] |
| KitWidget(k3) | Transport Type dropdown | selection | `combobox-transport-type-transport-type`, `button-select-3` | [kit:k3, ctl:combobox-transport-type-transport-type] |
| KitWidget(k4) | Source Location dropdown | selection | `combobox-source-location-source-location`, `button-select-4` | [kit:k4, ctl:combobox-source-location-source-location] |
| KitWidget(k5) | From Date datetime picker | value | `FromDate`, `button-open-the-date-view`, `button-open-the-time-view` | [kit:k5, ctl:FromDate] |
| KitWidget(k6) | To Date datetime picker | value | `ToDate`, `button-open-the-date-view-2`, `button-open-the-time-view-2` | [kit:k6, ctl:ToDate] |
| KitWidget(k7) | From Size (KB) numeric | value | `text-from-size-kb-from-size-kb` | [kit:k7, ctl:text-from-size-kb-from-size-kb] |
| KitWidget(k8) | To Size (KB) numeric | value | `text-to-size-kb-to-size-kb` | [kit:k8, ctl:text-to-size-kb-to-size-kb] |
| KitWidget(k9) | results grid | paging/sort/selection | (grid internal) | [kit:k9, flow:n2] |
| FileTransferTrackingDialog | selected File Transfer row | open/closed | (dialog internal) | [kit:d1, flow:n2.1] |
| KitWidget(k10) | dialog Direction | (read-only in capture) | Information_DirectionList | [kit:k10] |
| KitWidget(k11) | dialog File Status | (read-only in capture) | Information_FileStatusList | [kit:k11] |
| KitWidget(k12) | dialog Transport Type | (read-only in capture) | Information_TransportTypeList | [kit:k12] |
| KitWidget(k13) | dialog tracking events grid | none | trackingEventsGrid | [kit:k13] |
| KitWidget(k14) | dialog tracking exceptions grid | none | trackingExceptionsGrid | [kit:k14] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| FileId | File ID | text | empty | no | maxLength 50; regex disallow `; * ^ : ~ < > %` | “File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on validation (server/client unobtrusive) | [ctl:FileId, flow:n0] |
| FileName | File Name | text | empty | no | maxLength 100; regex disallow `; * ^ : ~ < > %` | “File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on validation (server/client unobtrusive) | [ctl:FileName, flow:n0] |
| combobox-file-status-file-status | File Status | kit dropdown (k1) | optionLabel “select a value...” | no | options: Complete, Error, Transferring |  | on change / on search | [ctl:combobox-file-status-file-status, kit:k1] |
| combobox-direction-direction | Direction | kit dropdown (k2) | optionLabel “select a value...” | no | options: INBOUND, OUTBOUND |  | on change / on search | [ctl:combobox-direction-direction, kit:k2] |
| combobox-transport-type-transport-type | Transport Type | kit dropdown (k3) | optionLabel “select a value...” | no | options: FTP, SFTP, UNC, FTPS |  | on change / on search | [ctl:combobox-transport-type-transport-type, kit:k3] |
| combobox-source-location-source-location | Source Location | kit dropdown (k4) | optionLabel “select a value...” | no | 98 options (see kit harvest) |  | on change / on search | [ctl:combobox-source-location-source-location, kit:k4] |
| TradingPartnerId | Trading Partner ID | text | empty | no | maxLength 25; regex disallow `; * ^ : ~ < > %` | “Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on validation (server/client unobtrusive) | [ctl:TradingPartnerId, flow:n0] |
| FromDate | From Date | kit datetime (k5) | prefilled “0 day(s) from today” | no | must be date; must be valid datetime in format `M/d/yyyy h:mm tt` | “The field From Date must be a date.” / “From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'.” | on validation (server/client unobtrusive) | [ctl:FromDate, kit:k5] |
| ToDate | To Date | kit datetime (k6) | prefilled “0 day(s) from today” | no | must be date; must be valid datetime in format `M/d/yyyy h:mm tt` | “The field To Date must be a date.” / “To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'.” | on validation (server/client unobtrusive) | [ctl:ToDate, kit:k6] |
| text-from-size-kb-from-size-kb | From Size (KB) | kit numeric (k7) | empty | no | maxLength 15; numeric with at most 2 decimals | “From Size (KB) is restricted to numeric values with at most 2 decimal places.” | on validation (server/client unobtrusive) | [ctl:text-from-size-kb-from-size-kb, kit:k7] |
| text-to-size-kb-to-size-kb | To Size (KB) | kit numeric (k8) | empty | no | maxLength 15; numeric with at most 2 decimals | “To Size (KB) is restricted to numeric values with at most 2 decimal places.” | on validation (server/client unobtrusive) | [ctl:text-to-size-kb-to-size-kb, kit:k8] |

- THE SYSTEM SHALL enforce maxLength by stopping typing at the field max length for File ID (50), File Name (100), and Trading Partner ID (25). [flow:n0]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| criteriaExpanded | boolean | true | click collapse/expand chevron | shows/hides the Search Criteria body | [flow:n1] |
| hasResults | boolean | false | click Search | shows the Search Results panel and grid | [flow:n2] |
| dialogD1Open | boolean | false | double-click a results grid row | shows File Transfer Tracking dialog | [flow:n2.1, kit:d1] |

Hidden at load (facts §12):
None. [flow:n0]

## 8. Behavior
### 8.0 States (flows)
- State n0 “at-rest”: Search Criteria is expanded and the Search Results panel is not shown. Fields accept up to: File ID 50 chars, File Name 100 chars, Trading Partner ID 25 chars. [flow:n0]
- State n1 “search-criteria-collapsed”: reached by clicking the Search Criteria chevron; Search Criteria body is hidden and only the header row remains visible. [flow:n1]
- State n2 “after-search-empty”: reached by clicking Search from n0; Search Results heading and results grid are shown (10 rows listed in the explored run). [flow:n2]
- State n2.1 “open-file-transfer”: reached by double-clicking the first results row in n2; opens dialog d1 “File Transfer Tracking” with Information, Events, and Exceptions sections. [flow:n2.1]
### 8.1 Search Criteria panel
- THE SYSTEM SHALL show the Search Criteria card expanded by default. [flow:n0]
- WHEN the user clicks the collapse/expand chevron THEN THE SYSTEM SHALL hide the Search Criteria body, leaving the header row visible. [flow:n1, ctl:button-collapse]
- WHEN the user clicks Search THEN THE SYSTEM SHALL perform a search and show the Search Results panel. [flow:n2, ctl:nextButton]
- WHEN the user clicks Reset THEN THE SYSTEM SHALL reset the Search Criteria fields. [ctl:resetButton, kit:k1]
- WHEN the user clicks Cancel THEN THE SYSTEM SHALL perform the Cancel action for this screen. [UNKNOWN: where Cancel navigates or what it clears on this screen] [ctl:cancelButton]

### 8.2 Search Results grid
- WHEN the user clicks Search with the form as it loads THEN THE SYSTEM SHALL list 10 rows in the results grid (no criteria required). [flow:n2, kit:k9]
- WHEN the user clicks a results grid row THEN THE SYSTEM SHALL select the row. [kit:k9]
- WHEN the user double-clicks the first results grid row THEN THE SYSTEM SHALL open the File Transfer Tracking dialog d1. [flow:n2.1, kit:d1]

### 8.3 File Transfer Tracking dialog (d1)
- THE SYSTEM SHALL show dialog title “File Transfer Tracking”. [flow:n2.1, kit:d1]
- THE SYSTEM SHALL show section headings “INFORMATION”, “EVENTS”, and “EXCEPTIONS”. [flow:n2.1]
- THE SYSTEM SHALL show these read-only dropdown values in the Information section: Direction, File Status, Transport Type. [flow:n2.1, kit:k10]
- WHEN the user clicks the dialog X (close) THEN THE SYSTEM SHALL close the dialog. [kit:d1]
- WHEN the user clicks Cancel in the dialog THEN THE SYSTEM SHALL close the dialog. [kit:d1]

### 8.4 Scroll behavior (facts §16: cite every [S##])
None. [flow:n0]

### 8.5 Media (facts §17: cite every [V##])
None. [flow:n0]

## 9. Navigation
No navigation. [flow:n0]

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Click Search | GET `/api/FileTransfer/SearchFileTransferTracking/` (no query params observed) | FileTransfer.searchFileTransferTracking(criteria) | shows Search Results grid with rows + pager | [flow:n2, kit:k9] |
| Double-click results row | POST `/FileTransfer/FileTransferTrackingView/` | FileTransfer.fileTransferTrackingView(rowId) | opens dialog d1 populated for that row | [flow:n2.1] |

## 11. Accessibility
- Each field label is visually associated with its input in the Search Criteria grid layout. [asset:sections/02-pagebody.png]
- Help icons next to labels are focusable/clickable elements with tooltip behavior provided by the provider kit. [ctl:FileIdHelp, kit:k1]

## 12. Test ids
Required controls (coverage tags for the checker):

[ctl:pageBannerLogo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links] [ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2] [ctl:button-8] [ctl:activeModuleMenu] [ctl:activeModuleMenuFirstItem] [ctl:button-help] [ctl:button-22] [ctl:button-collapse] [ctl:FileIdHelp] [ctl:FileId] [ctl:FileNameHelp] [ctl:FileName] [ctl:FileStatusHelp] [ctl:combobox-file-status-file-status] [ctl:button-select] [ctl:DirectionHelp] [ctl:combobox-direction-direction] [ctl:button-select-2] [ctl:TransportTypeHelp] [ctl:combobox-transport-type-transport-type] [ctl:button-select-3] [ctl:SourceLocationIdHelp] [ctl:combobox-source-location-source-location] [ctl:button-select-4] [ctl:TradingPartnerIdHelp] [ctl:TradingPartnerId] [ctl:FromDateHelp] [ctl:FromDate] [ctl:button-open-the-date-view] [ctl:button-open-the-time-view] [ctl:ToDateHelp] [ctl:ToDate] [ctl:button-open-the-date-view-2] [ctl:button-open-the-time-view-2] [ctl:FromSizeHelp] [ctl:text-from-size-kb-from-size-kb] [ctl:ToSizeHelp] [ctl:text-to-size-kb-to-size-kb] [ctl:resetButton] [ctl:cancelButton] [ctl:nextButton] [ctl:button-disclaimer] [ctl:button-website-requirements] [ctl:button-privacy-policy] [ctl:button-cookie-policy]

Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v9/screens/file-transfer-tracking/spec/parity.spec.ts` uses them:

`pageBannerLogo`, `button`, `button-medicaid-management-solutions`, `button-2`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-8`, `activeModuleMenu`, `activeModuleMenuFirstItem`, `button-help`, `button-22`, `button-collapse`, `FileIdHelp`, `FileId`, `FileNameHelp`, `FileName`, `FileStatusHelp`, `combobox-file-status-file-status`, `button-select`, `DirectionHelp`, `combobox-direction-direction`, `button-select-2`, `TransportTypeHelp`, `combobox-transport-type-transport-type`, `button-select-3`, `SourceLocationIdHelp`, `combobox-source-location-source-location`, `button-select-4`, `TradingPartnerIdHelp`, `TradingPartnerId`, `FromDateHelp`, `FromDate`, `button-open-the-date-view`, `button-open-the-time-view`, `ToDateHelp`, `ToDate`, `button-open-the-date-view-2`, `button-open-the-time-view-2`, `FromSizeHelp`, `text-from-size-kb-from-size-kb`, `ToSizeHelp`, `text-to-size-kb-to-size-kb`, `resetButton`, `cancelButton`, `nextButton`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`. [ctl:nextButton]

Run: `TARGET=react URL=http://localhost:5173/#/fxfer-v9/file-transfer-tracking npx playwright test packs/fxfer-v9/screens/file-transfer-tracking/spec/parity.spec.ts`

## 13. Open questions
1. What does the Search Criteria “Cancel” action do on this screen (navigate away, clear fields, or close a panel)? [UNKNOWN]
2. Does the Search Results grid support any additional interactions beyond sort/paging/select/double-click (e.g., column filtering)? [UNKNOWN]
3. What request body/fields are posted to `/FileTransfer/FileTransferTrackingView/` when opening dialog d1? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include the CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1, easing ease) applied to input wrapper elements such as `#FileId_parent > div:nth-of-type(2) > span:nth-of-type(1)`. [M01]

