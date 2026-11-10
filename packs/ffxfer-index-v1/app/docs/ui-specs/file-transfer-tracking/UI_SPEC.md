# UI SPEC — ffxfer-index-v1/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive, jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file · `[js:…]` · `[css:…]` · `[kit:kN]` kit widget/dialog · `[UNKNOWN: …]`

## 1. Overview
File Transfer Tracking lets a Provider portal user search for file transfers by criteria (id/name/status/direction/etc.) and review results in a grid. [asset:sections/02-pagebody.png]

Primary tasks:
- Search by one or more criteria and view results. [ctl:nextButton, kit:k9, asset:kit/states/search.png]
- Reset entered criteria. [ctl:resetButton, asset:sections/02-pagebody.png]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-file-transfer-tracking.png]

Page/content area: `#pageBody > main` is a full-width content region (x=0, y≈139, w=1920, h=628 CSS px) containing a centered card-like panel. [ctl:pageBody, ctl:main, asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content root | `#pageBody > main` (`main`) | 0,139,1920,628 | sections/02 | block | body padding-top 62px; content starts below the shell | [ctl:main, asset:sections/02-pagebody.png] |
| Search criteria card | `.content-panel-container` | 30,139,1860,574 | sections/02 | block | bg rgb(255,255,255); border 1px solid rgb(222,226,230); radius 10px; shadow rgba(0,0,0,0.08) 0px 8px 10px 1px; padding-bottom 15px | [asset:sections/02-pagebody.png] |
| Card header row | `.content-panel-hdr` | 31,140,1858,48 | sections/02 | flex row | bg rgb(250,250,250); padding 12px 24px; radius 10px 10px 0 0 | [asset:sections/02-pagebody.png] |

### 2.1 Search Criteria panel
- Header text “Search Criteria” appears on the left in the card header row. [asset:sections/02-pagebody.png]
- A collapse/expand chevron icon appears at the far right of the header row. [ctl:button-collapse, asset:sections/02-pagebody.png, UNKNOWN: whether this control collapses/expands the panel body in this screen]
- The panel body contains a multi-column form (left-aligned labels above inputs) and a bottom action row (Reset left; Cancel/Search right). [asset:sections/02-pagebody.png]

### 2.2 Search Results panel (after Search)
After performing Search, a “Search Results” section appears below the Search Criteria card, containing the results grid. [ctl:nextButton, kit:k9, asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-base | Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome 14px/14px | body text | [asset:sections/02-pagebody.png] |
| --color-text | rgb(51, 51, 51) | body text | [asset:sections/02-pagebody.png] |
| --color-card-bg | rgb(255, 255, 255) | cards / inputs | [asset:sections/02-pagebody.png] |
| --color-card-border | rgb(222, 226, 230) | card border | [asset:sections/02-pagebody.png] |
| --color-card-header-bg | rgb(250, 250, 250) | card header background | [asset:sections/02-pagebody.png] |
| --color-input-border | rgb(90, 105, 120) | input/dropdown borders | [asset:sections/02-pagebody.png] |
| --color-help-icon | rgb(51, 129, 255) | per-field help icon (“?”) | [asset:sections/02-pagebody.png] |
| --color-required-accent | rgb(203, 26, 198) | “Required Fields (*)” asterisk | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header client logo | 117×57 | raster logo | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | dropdown caret (File Status) | 18×16 | inline svg icon | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | dropdown caret (Direction) | 18×16 | inline svg icon | [asset:assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | dropdown caret (Transport Type) | 18×16 | inline svg icon | [asset:assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | dropdown caret (Source Location) | 18×16 | inline svg icon | [asset:assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | datetime calendar icon (From Date) | 18×16 | inline svg icon | [asset:assets/_svg/svg-5.svg] |
| `assets/_svg/svg-6.svg` | datetime time icon (From Date) | 18×16 | inline svg icon | [asset:assets/_svg/svg-6.svg] |
| `assets/_svg/svg-7.svg` | datetime calendar icon (To Date) | 18×16 | inline svg icon | [asset:assets/_svg/svg-7.svg] |
| `assets/_svg/svg-8.svg` | datetime time icon (To Date) | 18×16 | inline svg icon | [asset:assets/_svg/svg-8.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - `SearchCriteriaPanel`
    - `CriteriaFieldGrid`
      - `FileIdField` [ctl:FileId]
      - `FileNameField` [ctl:FileName]
      - `FileStatusField` [kit:k1]
      - `DirectionField` [kit:k2]
      - `TransportTypeField` [kit:k3]
      - `SourceLocationField` [kit:k4]
      - `TradingPartnerIdField` [ctl:TradingPartnerId]
      - `FromDateField` [kit:k5]
      - `ToDateField` [kit:k6]
      - `FromSizeField` [kit:k7]
      - `ToSizeField` [kit:k8]
    - `CriteriaActionsRow` (Reset/Cancel/Search) [ctl:resetButton, ctl:cancelButton, ctl:nextButton]
  - `SearchResultsPanel` (hidden until Search) [kit:k9]
    - `FileTrackingGrid` [kit:k9]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `FileTransferTrackingPage` | none | `criteria`, `resultsVisible` | `main`, `pageBody` | [ctl:main, ctl:pageBody, asset:sections/02-pagebody.png] |
| `SearchCriteriaPanel` | criteria values | none | `searchFileTrackingPanel`, `button-collapse` | [ctl:searchFileTrackingPanel, ctl:button-collapse, asset:sections/02-pagebody.png] |
| `FileTrackingGrid` | query criteria | grid paging/sort | `fileTrackingResultsGrid` | [kit:k9, asset:kit/states/search.png] |

## 6. Fields & validation
All fields shown are optional (no required `*` markers appear next to specific labels in the captured state), even though the panel shows the legend “Required Fields (*)”. [asset:sections/02-pagebody.png]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FileId` | File ID | text | empty | no | max length 50; regex disallow `; * ^ : ~ < > %` | “File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on input/submit (MVC unobtrusive) | [ctl:FileId, asset:kit/screen.json] |
| `FileName` | File Name | text | empty | no | max length 100; regex disallow `; * ^ : ~ < > %` | “File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on input/submit (MVC unobtrusive) | [ctl:FileName, asset:kit/screen.json] |
| `FileStatusList` | File Status | dropdown | placeholder “select a value...” | no | options: Complete, Error, Transferring | | on selection | [kit:k1, ctl:combobox-file-status-file-status, asset:kit/states/dropdown.png] |
| `DirectionList` | Direction | dropdown | placeholder “select a value...” | no | options: INBOUND, OUTBOUND | | on selection | [kit:k2, ctl:combobox-direction-direction, asset:sections/02-pagebody.png] |
| `TransportTypeList` | Transport Type | dropdown | placeholder “select a value...” | no | options: FTP, SFTP, UNC, FTPS | | on selection | [kit:k3, ctl:combobox-transport-type-transport-type, asset:sections/02-pagebody.png] |
| `SourceLocation` | Source Location | dropdown | placeholder “select a value...” | no | option list captured (97 options; see kit harvest) | | on selection | [kit:k4, ctl:combobox-source-location-source-location, asset:sections/02-pagebody.png] |
| `TradingPartnerId` | Trading Partner ID | text | empty | no | max length 25; regex disallow `; * ^ : ~ < > %` | “Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on input/submit (MVC unobtrusive) | [ctl:TradingPartnerId, asset:kit/screen.json] |
| `FromDate` | From Date | datetime | empty | no | format `M/d/yyyy h:mm tt` | “The field From Date must be a date.” / “From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'.“ | on parse/submit | [kit:k5, ctl:FromDate, asset:kit/screen.json] |
| `ToDate` | To Date | datetime | empty | no | format `M/d/yyyy h:mm tt` | “The field To Date must be a date.” / “To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'.“ | on parse/submit | [kit:k6, ctl:ToDate, asset:kit/screen.json] |
| `text-from-size-kb-from-size-kb` | From Size (KB) | numeric | empty | no | numeric; message says “at most 2 decimal places” | “From Size (KB) is restricted to numeric values with at most 2 decimal places.” | on parse/submit | [kit:k7, ctl:text-from-size-kb-from-size-kb, asset:kit/screen.json] |
| `text-to-size-kb-to-size-kb` | To Size (KB) | numeric | empty | no | numeric; message says “at most 2 decimal places” | “To Size (KB) is restricted to numeric values with at most 2 decimal places.” | on parse/submit | [kit:k8, ctl:text-to-size-kb-to-size-kb, asset:kit/screen.json] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `criteria` | object | all empty/unselected | typing/selecting | request params for Search | [ctl:FileId, kit:k1, asset:sections/02-pagebody.png] |
| `resultsVisible` | boolean | false | Search | visibility of the Search Results panel + grid | [ctl:nextButton, asset:kit/screen.json, kit:k9] |

Hidden at load (facts §12):
None. [asset:sections/02-pagebody.png]

## 8. Behavior
### 8.1 Search criteria form
- THE SYSTEM SHALL show the Search Criteria panel with all criteria fields empty/unselected. [ctl:searchFileTrackingPanel, asset:sections/02-pagebody.png]
- THE SYSTEM SHALL show the legend “Required Fields (*)” in the Search Criteria header area. [asset:sections/02-pagebody.png]
- WHEN the user clicks Reset THE SYSTEM SHALL clear the criteria fields. [ctl:resetButton, asset:kit/screen.json]
- WHEN the user clicks Search THE SYSTEM SHALL run the file transfer tracking search and show the Search Results panel. [ctl:nextButton, asset:kit/screen.json, kit:k9]
- WHEN the user clicks Cancel THE SYSTEM SHALL navigate away from this screen. [ctl:cancelButton, UNKNOWN: cancel destination/behavior not captured]

### 8.2 Search results grid
- WHILE `resultsVisible` THE SYSTEM SHALL show a results grid with columns: File ID, File Name, File Status, Direction, Transport Type, Size (KB), Create Date, Trading Partner ID; default page size 10. [kit:k9, asset:kit/states/search.png]
- WHILE the grid has no rows THE SYSTEM SHALL show “No items to display”. [kit:k9, asset:kit/states/search.png]

### 8.3 Scroll behavior (facts §16)
None. [asset:facts.md]

### 8.4 Media (facts §17)
None. [asset:facts.md]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| Header nav items (Messages / External Links / Favorites / Contact Us / My Account / Logout) | per captured href | same tab | [ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-my-account, ctl:link-logout] |
| Footer items (Disclaimer / Website Requirements / Privacy Policy / Cookie Policy) | [UNKNOWN: destinations not recorded as navigation] | [UNKNOWN] | [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy, asset:sections/03-disclaimer-the-website-is-prov.png] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/SearchFileTransferTracking/` with query params derived from the criteria fields | same endpoint mocked in rebuild | grid rows + paging totals | [asset:kit/screen.json, kit:k9] |

## 11. Accessibility
- Each field is presented as visible text label + associated input/combobox; the accessibility tree exposes textbox/combobox/spinbutton roles with label text included (e.g. “File ID File ID”, “File Status File Status”). [asset:capture/aria.yml]
- Field-level help icons appear as “HELP” images next to each label. [ctl:FileIdHelp, ctl:FileNameHelp, ctl:FileStatusHelp, ctl:DirectionHelp, ctl:TransportTypeHelp, ctl:SourceLocationIdHelp, ctl:TradingPartnerIdHelp, ctl:FromDateHelp, ctl:ToDateHelp, ctl:FromSizeHelp, ctl:ToSizeHelp]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/ffxfer-index-v1/screens/file-transfer-tracking/spec/parity.spec.ts` uses them:

Required keys from the capture:
[ctl:pageBannerLogo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links] [ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2] [ctl:button-8] [ctl:activeModuleMenu] [ctl:activeModuleMenuFirstItem] [ctl:button-help] [ctl:button-21] [ctl:button-collapse] [ctl:FileIdHelp] [ctl:FileId] [ctl:FileNameHelp] [ctl:FileName] [ctl:FileStatusHelp] [ctl:combobox-file-status-file-status] [ctl:button-select] [ctl:DirectionHelp] [ctl:combobox-direction-direction] [ctl:button-select-2] [ctl:TransportTypeHelp] [ctl:combobox-transport-type-transport-type] [ctl:button-select-3] [ctl:SourceLocationIdHelp] [ctl:combobox-source-location-source-location] [ctl:button-select-4] [ctl:TradingPartnerIdHelp] [ctl:TradingPartnerId] [ctl:FromDateHelp] [ctl:FromDate] [ctl:button-open-the-date-view] [ctl:button-open-the-time-view] [ctl:ToDateHelp] [ctl:ToDate] [ctl:button-open-the-date-view-2] [ctl:button-open-the-time-view-2] [ctl:FromSizeHelp] [ctl:text-from-size-kb-from-size-kb] [ctl:ToSizeHelp] [ctl:text-to-size-kb-to-size-kb] [ctl:resetButton] [ctl:cancelButton] [ctl:nextButton] [ctl:button-disclaimer] [ctl:button-website-requirements] [ctl:button-privacy-policy] [ctl:button-cookie-policy]

Kit widgets/dialogs used by this screen:
[kit:k1] [kit:k2] [kit:k3] [kit:k4] [kit:k5] [kit:k6] [kit:k7] [kit:k8] [kit:k9]

Run:
- Legacy: `npx playwright test packs/ffxfer-index-v1/screens/file-transfer-tracking/spec/parity.spec.ts`
- React: `TARGET=react URL=<rebuild url> npx playwright test packs/ffxfer-index-v1/screens/file-transfer-tracking/spec/parity.spec.ts`

## 13. Open questions
1. Does the chevron control (`button-collapse`) collapse/expand the Search Criteria panel body, and if so what is the collapsed layout? [UNKNOWN]
2. What is the exact Cancel behavior/destination (e.g. navigate to Home/MyHome, confirm on dirty form, etc.)? [UNKNOWN]
3. Do From/To Size fields accept decimals (message says “2 decimal places”) or only integers (widget step is 1 in the kit harvest)? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL apply CSS animation `autoFillEnd` with duration 0s (no visible motion) on inputs as captured (e.g. `#FileId_parent …`). [M01]
