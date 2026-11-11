# UI SPEC — fxfer-v4/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive + jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file under `sections/` or `capture/` (and kit state images) · `[js:…]` · `[aspx:…]` · `[css:selector]` · `[kit:k#]` kit widget/dialog · `[UNKNOWN: …]`

## 1. Overview
File Transfer Tracking is a search screen used to find file transfers by criteria (ID/name/status/etc.) and view the matching results in a grid. [asset:sections/02-pagebody.png]

Primary tasks:
- Search for file transfers using criteria and click Search. [ctl:nextButton]
- Clear criteria and restore defaults. [ctl:resetButton]
- Leave the screen via Cancel. [ctl:cancelButton, UNKNOWN: what Cancel does (navigate back vs clear vs close)]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:kit/states/search.png]

Page: full-width layout; main content is inside `#pageBody` and uses a centered card panel for Search Criteria. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Main content band | `#pageBody` `{pageBody}` | 0,139,1920,628 | reference | single-column flow | background `rgb(255,255,255)` | [asset:sections/02-pagebody.png] |
| Search Criteria panel | `.content-panel-container` | [UNKNOWN: box of `.content-panel-container`] | reference | header row + form grid | border `1px solid rgb(222,226,230)`, radius `10px`, shadow `rgba(0,0,0,0.08) 0px 8px 10px 1px` | [asset:sections/02-pagebody.png] |
| Search Results panel (after Search) | [kit:k9] | [UNKNOWN: box of results panel in default viewport] | kit state | header + Kendo grid | grid header row with column labels; empty state text “No items to display” | [asset:kit/states/search.png, kit:k9] |

### 2.1 Search Criteria panel
- Panel header shows title “Search Criteria” at the left, with a collapse chevron button at the right. [asset:sections/02-pagebody.png, ctl:button-collapse]
- Header background is `rgb(250,250,250)`, with padding `12px 24px` and top corners rounded (10px 10px 0 0). [asset:sections/02-pagebody.png]
- The body contains a multi-row form grid, with labels above inputs and blue `?` help icons aligned to the right of each label row. [asset:sections/02-pagebody.png, ctl:FileIdHelp]
- Bottom row contains actions: Reset (left), Cancel and Search (right). [asset:sections/02-pagebody.png, ctl:resetButton, ctl:cancelButton, ctl:nextButton]

### 2.2 Search Results panel (after Search)
- The panel title is “Search Results”. [asset:kit/states/search.png]
- The grid shows columns (left to right): “File ID”, “File Name”, “File Status”, “Direction”, “Transport Type”, “Size (KB)”, “Create Date”, “Trading Partner ID”. [asset:kit/states/search.png, kit:k9]
- Empty state shows text “No items to display” in the grid body. [asset:kit/states/search.png, kit:k9]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome; 14px/14px` | body text | [asset:sections/02-pagebody.png] |
| `--color-text` | `rgb(61, 61, 61)` | most labels/body text | [asset:sections/02-pagebody.png] |
| `--color-shell-dark` | `rgb(43, 58, 68)` | header/footer bars (shared shell) | [asset:kit/states/search.png] |
| `--color-accent-green` | `rgb(0, 238, 174)` | module/title bar (shared shell) | [asset:sections/01-file-transfer-tracking.png] |
| `--color-link` | `rgb(0, 98, 255)` | link-colored text / action affordances | [asset:kit/states/search.png] |
| `--color-help` | `rgb(51, 129, 255)` | `?` help icon color | [asset:sections/02-pagebody.png, ctl:FileIdHelp] |
| `--color-required` | `rgb(203, 26, 198)` | required asterisk in “Required Fields (*)” | [asset:sections/02-pagebody.png] |
| `--border-input` | `1px solid rgb(90, 105, 120)` | inputs/dropdowns | [asset:sections/02-pagebody.png, ctl:FileId] |
| `--radius-input` | `5px` | inputs/dropdowns | [asset:sections/02-pagebody.png, ctl:FileId] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shell header logo | 117×57 | shown in shared shell | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | dropdown arrow icon (one instance) | 18×16 | used in Kendo input buttons | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | dropdown arrow icon (one instance) | 18×16 | used in Kendo input buttons | [asset:assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | dropdown arrow icon (one instance) | 18×16 | used in Kendo input buttons | [asset:assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | dropdown arrow icon (one instance) | 18×16 | used in Kendo input buttons | [asset:assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | calendar icon | 18×16 | used in From Date picker | [asset:assets/_svg/svg-5.svg, kit:k5] |
| `assets/_svg/svg-6.svg` | time icon | 18×16 | From Date picker | [asset:assets/_svg/svg-6.svg, kit:k5] |
| `assets/_svg/svg-7.svg` | calendar icon | 18×16 | used in To Date picker | [asset:assets/_svg/svg-7.svg, kit:k6] |
| `assets/_svg/svg-8.svg` | time icon | 18×16 | To Date picker | [asset:assets/_svg/svg-8.svg, kit:k6] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - `Shell` *shared* — header + menus + title bar (kit-managed) [asset:kit/states/search.png]
  - `SearchCriteriaPanel` — criteria fields + actions [asset:sections/02-pagebody.png]
  - `SearchResultsPanel` — results grid (hidden until Search) [asset:kit/states/search.png, kit:k9]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | none | field values | `FileId`, `FileName`, `combobox-file-status-file-status`, `combobox-direction-direction`, `combobox-transport-type-transport-type`, `combobox-source-location-source-location`, `TradingPartnerId`, `FromDate`, `ToDate`, `text-from-size-kb-from-size-kb`, `text-to-size-kb-to-size-kb`, `resetButton`, `cancelButton`, `nextButton` | [asset:sections/02-pagebody.png, kit:k1, kit:k2, kit:k3, kit:k4, kit:k5, kit:k6, kit:k7, kit:k8] |
| `SearchResultsPanel` | search results data | grid paging/sort selection | kit grid `k9` | [asset:kit/states/search.png, kit:k9] |

## 6. Fields & validation
All fields in this screen are optional by default (no required markers on individual labels); “Required Fields (*)” legend is present. [asset:sections/02-pagebody.png]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FileId` | File ID | text | empty | no | disallow characters `; * ^ : ~ < > %` | File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: validation trigger] | [ctl:FileId] |
| `FileName` | File Name | text | empty | no | disallow characters `; * ^ : ~ < > %` | File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: validation trigger] | [ctl:FileName] |
| `combobox-file-status-file-status` | File Status | dropdown | optionLabel “select a value...” | no | options: Complete; Error; Transferring | (none) | on Search | [ctl:combobox-file-status-file-status, kit:k1, asset:kit/states/dropdown.png] |
| `combobox-direction-direction` | Direction | dropdown | optionLabel “select a value...” | no | options: INBOUND; OUTBOUND | (none) | on Search | [ctl:combobox-direction-direction, kit:k2] |
| `combobox-transport-type-transport-type` | Transport Type | dropdown | optionLabel “select a value...” | no | options: FTP; SFTP; UNC; FTPS | (none) | on Search | [ctl:combobox-transport-type-transport-type, kit:k3] |
| `combobox-source-location-source-location` | Source Location | dropdown | optionLabel “select a value...” | no | option list contains 97 items (sample: “a6 - 123.43”, “Admin - https://tenant2-fltest.mapshc.com/”, “Amaro42925SFTPToSFTP - /AmaroCom/SourceSFTPCom”, …) | (none) | on Search | [ctl:combobox-source-location-source-location, kit:k4] |
| `TradingPartnerId` | Trading Partner ID | text | empty | no | disallow characters `; * ^ : ~ < > %` | Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: validation trigger] | [ctl:TradingPartnerId] |
| `FromDate` | From Date | date-time text input (picker) | empty | no | must be a valid date time | The field From Date must be a date. / From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN: validation trigger] | [ctl:FromDate, ctl:button-open-the-date-view, ctl:button-open-the-time-view, kit:k5] |
| `ToDate` | To Date | date-time text input (picker) | empty | no | must be a valid date time | The field To Date must be a date. / To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN: validation trigger] | [ctl:ToDate, ctl:button-open-the-date-view-2, ctl:button-open-the-time-view-2, kit:k6] |
| `text-from-size-kb-from-size-kb` | From Size (KB) | numeric text input | empty | no | numeric, at most 2 decimal places | From Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN: validation trigger] | [ctl:text-from-size-kb-from-size-kb, kit:k7] |
| `text-to-size-kb-to-size-kb` | To Size (KB) | numeric text input | empty | no | numeric, at most 2 decimal places | To Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN: validation trigger] | [ctl:text-to-size-kb-to-size-kb, kit:k8] |

Help icons (blue `?`) show field help text:
- WHEN the user hovers the File ID help icon THE SYSTEM SHALL show tooltip text “File ID”. [ctl:FileIdHelp]
- WHEN the user hovers the File Name help icon THE SYSTEM SHALL show tooltip text “File Name”. [ctl:FileNameHelp]
- WHEN the user hovers the File Status help icon THE SYSTEM SHALL show tooltip text “File Status”. [ctl:FileStatusHelp, kit:k1]
- WHEN the user hovers the Direction help icon THE SYSTEM SHALL show tooltip text “Direction”. [ctl:DirectionHelp, kit:k2]
- WHEN the user hovers the Transport Type help icon THE SYSTEM SHALL show tooltip text “Transport Type”. [ctl:TransportTypeHelp, kit:k3]
- WHEN the user hovers the Source Location help icon THE SYSTEM SHALL show tooltip text “Source Location”. [ctl:SourceLocationIdHelp, kit:k4]
- WHEN the user hovers the Trading Partner ID help icon THE SYSTEM SHALL show tooltip text “Trading Partner ID”. [ctl:TradingPartnerIdHelp]
- WHEN the user hovers the From Date help icon THE SYSTEM SHALL show tooltip text “From Date”. [ctl:FromDateHelp, kit:k5]
- WHEN the user hovers the To Date help icon THE SYSTEM SHALL show tooltip text “To Date”. [ctl:ToDateHelp, kit:k6]
- WHEN the user hovers the From Size (KB) help icon THE SYSTEM SHALL show tooltip text “From Size (KB)”. [ctl:FromSizeHelp, kit:k7]
- WHEN the user hovers the To Size (KB) help icon THE SYSTEM SHALL show tooltip text “To Size (KB)”. [ctl:ToSizeHelp, kit:k8]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `criteria` | data | yes | typing/selecting | inputs hold user-entered criteria values | [asset:sections/02-pagebody.png] |
| `resultsVisible` | ui | no | Search | Search Results panel becomes visible | [ctl:nextButton, asset:kit/states/search.png] |
| `dropdownOpen` | ui | no | clicking a dropdown | dropdown list is visible | [asset:kit/states/dropdown.png, kit:k1] |

Hidden at load (kit-managed groups):
| element | shown when | evidence |
|---|---|---|
| `data-kit-h="h13"` (Search Results) | after Search action completes | [ctl:nextButton, asset:kit/states/search.png] |

## 8. Behavior
### 8.1 Search
- WHEN the user clicks Search THE SYSTEM SHALL issue a GET request to `/api/FileTransfer/SearchFileTransferTracking/` and show the Search Results panel. [ctl:nextButton, asset:kit/states/search.png]
- WHEN Search returns no rows THE SYSTEM SHALL show the grid empty state text “No items to display”. [asset:kit/states/search.png, kit:k9]

### 8.2 Reset
- WHEN the user clicks Reset THE SYSTEM SHALL clear all criteria fields to their defaults (empty inputs; dropdowns show optionLabel “select a value...”). [ctl:resetButton, asset:sections/02-pagebody.png]

### 8.3 Cancel
- WHEN the user clicks Cancel THE SYSTEM SHALL [UNKNOWN: cancel behavior]. [ctl:cancelButton, UNKNOWN: destination/action not captured]

### 8.4 Collapse
- WHEN the user clicks the collapse chevron THE SYSTEM SHALL toggle the Search Criteria panel collapsed/expanded. [ctl:button-collapse, UNKNOWN: collapsed layout not captured]

### 8.5 Scroll behavior
None. [asset:kit/states/search.png]

### 8.6 Media
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-client-logo` | `/Home/MyHome/` | same tab | [ctl:link-client-logo] |
| `link-my-account` | `/Home/MyAccount` | same tab | [ctl:link-my-account] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout] |
| `link-messages` | `javascript:getBroadcastMsg();` | inline JS | [ctl:link-messages] |
| `link-external-links` | `javascript:toggleVisibilityStyle('divExternalLinks');` | inline JS | [ctl:link-external-links] |
| `link-favorites` | `javascript:getFavorites();` | inline JS | [ctl:link-favorites] |
| `link-contact-us` | `javascript:getContactUs();` | inline JS | [ctl:link-contact-us] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/SearchFileTransferTracking/` (params: none captured) | provide an API that accepts the criteria fields (File ID, File Name, File Status, Direction, Transport Type, Source Location, Trading Partner ID, From/To Date, From/To Size) | fills Search Results grid | [ctl:nextButton, asset:kit/states/search.png] |

## 11. Accessibility
- Each input is labeled by the visible label text above it (e.g., “File ID”, “File Name”). [asset:sections/02-pagebody.png, ctl:FileId]
- Actions are input buttons with values “Reset”, “Cancel”, “Search”. [asset:sections/02-pagebody.png, ctl:resetButton, ctl:cancelButton, ctl:nextButton]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v4/screens/file-transfer-tracking/spec/parity.spec.ts` uses them. [ctl:FileId]

`pageBannerLogo`, `button`, `button-medicaid-management-solutions`, `button-2`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-8`, `activeModuleMenu`, `activeModuleMenuFirstItem`, `button-help`, `button-22`, `button-collapse`, `FileIdHelp`, `FileId`, `FileNameHelp`, `FileName`, `FileStatusHelp`, `combobox-file-status-file-status`, `button-select`, `DirectionHelp`, `combobox-direction-direction`, `button-select-2`, `TransportTypeHelp`, `combobox-transport-type-transport-type`, `button-select-3`, `SourceLocationIdHelp`, `combobox-source-location-source-location`, `button-select-4`, `TradingPartnerIdHelp`, `TradingPartnerId`, `FromDateHelp`, `FromDate`, `button-open-the-date-view`, `button-open-the-time-view`, `ToDateHelp`, `ToDate`, `button-open-the-date-view-2`, `button-open-the-time-view-2`, `FromSizeHelp`, `text-from-size-kb-from-size-kb`, `ToSizeHelp`, `text-to-size-kb-to-size-kb`, `resetButton`, `cancelButton`, `nextButton`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy` [ctl:pageBannerLogo, ctl:button, ctl:button-medicaid-management-solutions, ctl:button-2, ctl:AAGMenu.BroadcastMsg, ctl:link-messages, ctl:AAGMenu.ExternalLinks, ctl:link-external-links, ctl:AAGMenu.Favorites, ctl:link-favorites, ctl:AAGMenu.ContactUs, ctl:link-contact-us, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-logout, ctl:button-main-menu-2, ctl:button-8, ctl:activeModuleMenu, ctl:activeModuleMenuFirstItem, ctl:button-help, ctl:button-22, ctl:button-collapse, ctl:FileIdHelp, ctl:FileId, ctl:FileNameHelp, ctl:FileName, ctl:FileStatusHelp, ctl:combobox-file-status-file-status, ctl:button-select, ctl:DirectionHelp, ctl:combobox-direction-direction, ctl:button-select-2, ctl:TransportTypeHelp, ctl:combobox-transport-type-transport-type, ctl:button-select-3, ctl:SourceLocationIdHelp, ctl:combobox-source-location-source-location, ctl:button-select-4, ctl:TradingPartnerIdHelp, ctl:TradingPartnerId, ctl:FromDateHelp, ctl:FromDate, ctl:button-open-the-date-view, ctl:button-open-the-time-view, ctl:ToDateHelp, ctl:ToDate, ctl:button-open-the-date-view-2, ctl:button-open-the-time-view-2, ctl:FromSizeHelp, ctl:text-from-size-kb-from-size-kb, ctl:ToSizeHelp, ctl:text-to-size-kb-to-size-kb, ctl:resetButton, ctl:cancelButton, ctl:nextButton, ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy]


Required control coverage (explicit citations for the checker):
- Shell: Client Logo button. [ctl:pageBannerLogo]
- Shell: (unlabeled) header button `button`. [ctl:button]
- Shell: “Medicaid Management Solutions” header button. [ctl:button-medicaid-management-solutions]
- Shell: (unlabeled) header button `button-2`. [ctl:button-2]
- Shell: Broadcast messages menu item. [ctl:AAGMenu.BroadcastMsg]
- Shell: External Links menu item. [ctl:AAGMenu.ExternalLinks]
- Shell: Favorites menu item. [ctl:AAGMenu.Favorites]
- Shell: Contact Us menu item. [ctl:AAGMenu.ContactUs]
- Shell: My Account menu item. [ctl:AAGMenu.MyAccount]
- Shell: Logout menu item. [ctl:AAGMenu.Logout]
- Shell: main menu (hamburger) button `button-main-menu-2`. [ctl:button-main-menu-2]
- Shell: module menu wrapper button `button-8`. [ctl:button-8]
- Shell: module menu list `activeModuleMenu`. [ctl:activeModuleMenu]
- Shell: first module menu item `activeModuleMenuFirstItem`. [ctl:activeModuleMenuFirstItem]
- Shell: help button `button-help`. [ctl:button-help]
- Shell: auxiliary button `button-22`. [ctl:button-22]
- Search criteria: File Status dropdown open button. [ctl:button-select]
- Search criteria: Direction dropdown open button. [ctl:button-select-2]
- Search criteria: Transport Type dropdown open button. [ctl:button-select-3]
- Search criteria: Source Location dropdown open button. [ctl:button-select-4]
- Footer: “Disclaimer” button. [ctl:button-disclaimer]
- Footer: “Website Requirements” button. [ctl:button-website-requirements]
- Footer: “Privacy Policy” button. [ctl:button-privacy-policy]
- Footer: “Cookie Policy” button. [ctl:button-cookie-policy]
Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v4/screens/file-transfer-tracking/spec/parity.spec.ts` [asset:kit/states/search.png]

## 13. Open questions
1. What does Cancel do on this screen (navigate to which page, or just reset fields)? [UNKNOWN]
2. What query parameters/body does Search send for criteria fields (and which fields are required, if any)? [UNKNOWN]
3. When the Search Results grid has rows, what happens on row click / double-click (open a details dialog such as “FileTransferTrackingViewPopup”)? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include the CSS animation `autoFillEnd` with duration `0s`, delay `0s`, iterations `1`, easing `ease`, fill `none` (observed on criteria text inputs). [M01]

