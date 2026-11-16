# UI SPEC ? fxfer-v6/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with mvcUnobtrusive + jquery 3.7.1 ? target React 19
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` file under capture/ (or sections/?) ? `[js:?]` ? `[aspx:?]` ? `[css:selector]` ? `[kit:<id>]` ? `[UNKNOWN: ?]`

## 1. Overview
File Transfer Tracking is a search screen for finding file transfers by criteria (ID/name/status/direction/transport/location/partner/date/size) and reviewing tracking details for a selected row. [asset:sections/02-pagebody.png, kit:k9]

Primary tasks:
- Search for file transfers (criteria optional) and view results in a grid. [ctl:nextButton, kit:k9]
- Open a file?s tracking details dialog from the results grid. [kit:d1, kit:k9]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-file-transfer-tracking.png]

Page content (this spec): scoped to `#pageBody > main`. [ctl:pageBody, ctl:main]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content area | `#pageBody > main` (`pageBody`, `main`) | 0,138,1920,627 (pageBody) | sections/02 | centered inner container | background rgb(255,255,255) | [ctl:pageBody, ctl:main, asset:sections/02-pagebody.png] |
| Search Criteria panel | `.content-panel-container` (within `step1`) | 30,?,1860,573 (container) | sections/02 | panel with header + body | border 0.666667px solid rgb(222,226,230); radius 10px; shadow rgba(0,0,0,0.08) 0px 8px 10px 1px | [ctl:step1, asset:sections/02-pagebody.png] |
| Search Results panel (after Search) | `#searchFileTrackingGrid` | [UNKNOWN: exact box in default reference state] | kit/states/search.png | panel with header + grid | matches Search Criteria panel styling | [asset:kit/states/search.png, kit:k9] |

### 2.1 Search Criteria panel
- Header text: `Search Criteria`. [asset:sections/02-pagebody.png]
- Top-right chevron button collapses/expands the body. [ctl:button-collapse]
- Body shows a `Required Fields ( * )` hint row. [asset:sections/02-pagebody.png]
- Fields are arranged as labeled editor rows with a blue `?` help icon per field. [asset:sections/02-pagebody.png]
- Action buttons: `Reset` at bottom-left; `Cancel` and `Search` grouped bottom-right. [ctl:resetButton, ctl:cancelButton, ctl:nextButton, asset:sections/02-pagebody.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | Arial, "Helvetica Neue", Helvetica, sans-serif | body text | [asset:sections/02-pagebody.png] |
| `--font-size-base` | 14px | most text | [asset:sections/02-pagebody.png] |
| `--color-text` | rgb(61, 61, 61) | panel content text | [asset:sections/02-pagebody.png] |
| `--color-shell-bg` | rgb(43, 58, 68) | shared shell header/footer | [asset:sections/01-file-transfer-tracking.png] |
| `--color-accent-bar` | rgb(0, 238, 174) | module bar behind title | [asset:sections/01-file-transfer-tracking.png] |
| `--color-link` | rgb(0, 98, 255) | footer links/interactive text | [asset:sections/03-disclaimer-the-website-is-prov.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117?57 | client logo | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | dropdown caret (File Status) | 18?16 | inline svg icon | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | dropdown caret (Direction) | 18?16 | inline svg icon | [asset:assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | dropdown caret (Transport Type) | 18?16 | inline svg icon | [asset:assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | dropdown caret (Source Location) | 18?16 | inline svg icon | [asset:assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | From Date calendar icon | 18?16 | inline svg icon | [asset:assets/_svg/svg-5.svg] |
| `assets/_svg/svg-6.svg` | From Date clock icon | 18?16 | inline svg icon | [asset:assets/_svg/svg-6.svg] |
| `assets/_svg/svg-7.svg` | To Date calendar icon | 18?16 | inline svg icon | [asset:assets/_svg/svg-7.svg] |
| `assets/_svg/svg-8.svg` | To Date clock icon | 18?16 | inline svg icon | [asset:assets/_svg/svg-8.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - `Shell` *shared* ? header/menu/footer (see home spec) [asset:sections/01-file-transfer-tracking.png]
  - `SearchCriteriaPanel` ? criteria form + actions [asset:sections/02-pagebody.png]
  - `SearchResultsPanel` ? results header + grid (shown after Search) [asset:kit/states/search.png, kit:k9]
  - `FileTransferTrackingDialog` ? row details dialog [asset:kit/states/dialog-d1.png, kit:d1]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | criteria values | panel open/closed | `button-collapse`, `resetButton`, `cancelButton`, `nextButton` | [ctl:button-collapse, ctl:resetButton, ctl:cancelButton, ctl:nextButton] |
| `SearchCriteriaFields` | none | form field values | `FileId`, `FileName`, `TradingPartnerId` + kit widgets | [ctl:FileId, ctl:FileName, ctl:TradingPartnerId, kit:k1, kit:k2, kit:k3, kit:k4, kit:k5, kit:k6, kit:k7, kit:k8] |
| `SearchResultsGrid` | rows (synthetic), sort, paging | selected row | kit grid `k9` | [kit:k9] |
| `FileTransferTrackingDialog` | selected row (FileId) | open/close | dialog `d1` with widgets `k10`?`k14` | [kit:d1, kit:k10, kit:k11, kit:k12, kit:k13, kit:k14] |

## 6. Fields & validation
Search criteria fields (labels verbatim): [asset:sections/02-pagebody.png]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FileId` | File ID | text | empty | no | max length 50; disallow `; * ^ : ~ < > %` | File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: when shown] | [ctl:FileId, kit:k9] |
| `FileName` | File Name | text | empty | no | max length 100; disallow `; * ^ : ~ < > %` | File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: when shown] | [ctl:FileName, kit:k9] |
| (widget) | File Status | dropdown | option label `select a value...` | no | options: Complete, Error, Transferring |  |  | [kit:k1, ctl:combobox-file-status-file-status] |
| (widget) | Direction | dropdown | option label `select a value...` | no | options: INBOUND, OUTBOUND |  |  | [kit:k2, ctl:combobox-direction-direction] |
| (widget) | Transport Type | dropdown | option label `select a value...` | no | options: FTP, SFTP, UNC, FTPS |  |  | [kit:k3, ctl:combobox-transport-type-transport-type] |
| (widget) | Source Location | dropdown | option label `select a value...` | no | 97 options (see kit) |  |  | [kit:k4, ctl:combobox-source-location-source-location] |
| `TradingPartnerId` | Trading Partner ID | text | empty | no | disallow `; * ^ : ~ < > %` | Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | [UNKNOWN: when shown] | [ctl:TradingPartnerId, kit:k9] |
| (widget) | From Date | datetime | recorded by kit as +0 day(s) from today | no | must be a date; must match `M/d/yyyy h:mm tt` | The field From Date must be a date. / From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN: when shown] | [kit:k5, ctl:FromDate] |
| (widget) | To Date | datetime | recorded by kit as +0 day(s) from today | no | must be a date; must match `M/d/yyyy h:mm tt` | The field To Date must be a date. / To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'. | [UNKNOWN: when shown] | [kit:k6, ctl:ToDate] |
| (widget) | From Size (KB) | numeric | empty | no | numeric with at most 2 decimal places | From Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN: when shown] | [kit:k7, ctl:text-from-size-kb-from-size-kb] |
| (widget) | To Size (KB) | numeric | empty | no | numeric with at most 2 decimal places | To Size (KB) is restricted to numeric values with at most 2 decimal places. | [UNKNOWN: when shown] | [kit:k8, ctl:text-to-size-kb-to-size-kb] |

Dialog fields (File Transfer Tracking) are read-only in the captured state. [asset:kit/states/dialog-d1.png, kit:d1]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `searchPanelOpen` | boolean | true | Collapse chevron | Search Criteria body visible/hidden | [ctl:button-collapse] |
| `resultsVisible` | boolean | false | Search | Search Results panel visible | [ctl:nextButton, kit:k9] |
| `trackingDialogOpen` | boolean | false | Grid row dblclick; dialog Close/Cancel | Dialog `d1` open/closed | [kit:d1, kit:k9] |

Hidden at load (facts ?12): None. [asset:sections/02-pagebody.png]

## 8. Behavior
### 8.1 Search
- WHEN the user activates `Search` THE SYSTEM SHALL request results and show the Search Results panel containing the results grid. [ctl:nextButton, kit:k9]
- THE SYSTEM SHALL allow Search with no criteria; the capture's Search-with-default-form returned rows (10 rows shown in the state screenshot). [kit:k9, asset:kit/states/search.png]

### 8.2 Results grid
- WHEN the user double-clicks the first results row THE SYSTEM SHALL open the File Transfer Tracking dialog (`d1`). [kit:k9, kit:d1]

### 8.3 Dialog (File Transfer Tracking)
- WHEN the user closes the dialog using the window close (X) THE SYSTEM SHALL close the dialog (no confirmation recorded). [kit:d1]
- WHEN the user activates `Cancel` in the dialog THE SYSTEM SHALL close the dialog (no confirmation recorded). [kit:d1]

### 8.4 Scroll behavior (facts ?16: cite every [S##])
None. [asset:sections/02-pagebody.png]

### 8.5 Media (facts ?17: cite every [V##])
None. [asset:sections/02-pagebody.png]

## 9. Navigation
No navigation recorded for the content area; shell navigation is covered by the home spec. [asset:sections/01-file-transfer-tracking.png]

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response ? UI | evidence |
|---|---|---|---|---|
| Search (`nextButton`) | GET `/api/FileTransfer/SearchFileTransferTracking/` (no params captured) | Provide an endpoint returning row list for grid `k9` | grid populated (10 rows per page) | [ctl:nextButton, kit:k9] |
| Row details (dblclick row) | POST `/FileTransfer/FileTransferTrackingView/` (params: `FileId`) | Provide endpoint to fetch tracking details for selected FileId | opens dialog `d1` with Information + Events/Exceptions | [kit:d1, kit:k9] |

## 11. Accessibility
- The Search Criteria area is exposed as a `main` landmark containing form fields and buttons. [ctl:main, asset:aria.yml]
- Field labels are programmatically associated to inputs (e.g. File ID, File Name). [ctl:FileId, ctl:FileName, asset:aria.yml]
- Dropdowns are exposed as `combobox` controls with a nested `select` button. [ctl:combobox-file-status-file-status, ctl:button-select, asset:aria.yml]
- Numeric fields are exposed as `spinbutton` (From/To Size). [ctl:text-from-size-kb-from-size-kb, ctl:text-to-size-kb-to-size-kb, asset:aria.yml]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `spec/parity.spec.ts` uses them:

| key | what | evidence |
|---|---|---|
| pageBannerLogo | Client logo button (shell) | [ctl:pageBannerLogo] |
| button | System name button (shell) | [ctl:button] |
| button-medicaid-management-solutions | App title button (shell) | [ctl:button-medicaid-management-solutions] |
| button-2 | Header menubar interaction target (shell) | [ctl:button-2] |
| AAGMenu.BroadcastMsg | Top menu item: Messages (shell) | [ctl:AAGMenu.BroadcastMsg] |
| link-messages | Top menu link: Messages (shell) | [ctl:link-messages] |
| AAGMenu.ExternalLinks | Top menu item: External Links (shell) | [ctl:AAGMenu.ExternalLinks] |
| link-external-links | Top menu link: External Links (shell) | [ctl:link-external-links] |
| AAGMenu.Favorites | Top menu item: Favorites (shell) | [ctl:AAGMenu.Favorites] |
| link-favorites | Top menu link: Favorites (shell) | [ctl:link-favorites] |
| AAGMenu.ContactUs | Top menu item: Contact Us (shell) | [ctl:AAGMenu.ContactUs] |
| link-contact-us | Top menu link: Contact Us (shell) | [ctl:link-contact-us] |
| AAGMenu.MyAccount | Top menu item: My Account (shell) | [ctl:AAGMenu.MyAccount] |
| AAGMenu.Logout | Top menu item: Logout (shell) | [ctl:AAGMenu.Logout] |
| link-logout | Top menu link: Logout (shell) | [ctl:link-logout] |
| button-main-menu-2 | Hamburger / Main Menu button (shell) | [ctl:button-main-menu-2] |
| button-8 | Module menu wrapper (shell) | [ctl:button-8] |
| activeModuleMenu | Module menubar (shell) | [ctl:activeModuleMenu] |
| activeModuleMenuFirstItem | Module menu first item: File Transfer Services (shell) | [ctl:activeModuleMenuFirstItem] |
| button-help | Help button (shell row border) | [ctl:button-help] |
| button-22 | Panel icon container in Search Criteria header | [ctl:button-22] |
| button-collapse | Search Criteria collapse chevron | [ctl:button-collapse] |
| FileIdHelp | Help icon for File ID | [ctl:FileIdHelp] |
| FileId | Text input: File ID | [ctl:FileId] |
| FileNameHelp | Help icon for File Name | [ctl:FileNameHelp] |
| FileName | Text input: File Name | [ctl:FileName] |
| FileStatusHelp | Help icon for File Status | [ctl:FileStatusHelp] |
| combobox-file-status-file-status | Dropdown: File Status (widget k1) | [ctl:combobox-file-status-file-status] |
| button-select | Dropdown caret button (File Status) | [ctl:button-select] |
| DirectionHelp | Help icon for Direction | [ctl:DirectionHelp] |
| combobox-direction-direction | Dropdown: Direction (widget k2) | [ctl:combobox-direction-direction] |
| button-select-2 | Dropdown caret button (Direction) | [ctl:button-select-2] |
| TransportTypeHelp | Help icon for Transport Type | [ctl:TransportTypeHelp] |
| combobox-transport-type-transport-type | Dropdown: Transport Type (widget k3) | [ctl:combobox-transport-type-transport-type] |
| button-select-3 | Dropdown caret button (Transport Type) | [ctl:button-select-3] |
| SourceLocationIdHelp | Help icon for Source Location | [ctl:SourceLocationIdHelp] |
| combobox-source-location-source-location | Dropdown: Source Location (widget k4) | [ctl:combobox-source-location-source-location] |
| button-select-4 | Dropdown caret button (Source Location) | [ctl:button-select-4] |
| TradingPartnerIdHelp | Help icon for Trading Partner ID | [ctl:TradingPartnerIdHelp] |
| TradingPartnerId | Text input: Trading Partner ID | [ctl:TradingPartnerId] |
| FromDateHelp | Help icon for From Date | [ctl:FromDateHelp] |
| FromDate | Datetime picker input: From Date (widget k5) | [ctl:FromDate] |
| button-open-the-date-view | From Date calendar button | [ctl:button-open-the-date-view] |
| button-open-the-time-view | From Date time button | [ctl:button-open-the-time-view] |
| ToDateHelp | Help icon for To Date | [ctl:ToDateHelp] |
| ToDate | Datetime picker input: To Date (widget k6) | [ctl:ToDate] |
| button-open-the-date-view-2 | To Date calendar button | [ctl:button-open-the-date-view-2] |
| button-open-the-time-view-2 | To Date time button | [ctl:button-open-the-time-view-2] |
| FromSizeHelp | Help icon for From Size (KB) | [ctl:FromSizeHelp] |
| text-from-size-kb-from-size-kb | Numeric textbox input: From Size (KB) (widget k7) | [ctl:text-from-size-kb-from-size-kb] |
| ToSizeHelp | Help icon for To Size (KB) | [ctl:ToSizeHelp] |
| text-to-size-kb-to-size-kb | Numeric textbox input: To Size (KB) (widget k8) | [ctl:text-to-size-kb-to-size-kb] |
| resetButton | Button: Reset | [ctl:resetButton] |
| cancelButton | Button: Cancel | [ctl:cancelButton] |
| nextButton | Button: Search | [ctl:nextButton] |
| button-disclaimer | Footer link: Disclaimer | [ctl:button-disclaimer] |
| button-website-requirements | Footer link: Website Requirements | [ctl:button-website-requirements] |
| button-privacy-policy | Footer link: Privacy Policy | [ctl:button-privacy-policy] |
| button-cookie-policy | Footer link: Cookie Policy | [ctl:button-cookie-policy] |


Run: `TARGET=react URL=<rebuild url> npx playwright test spec/parity.spec.ts`

## 13. Open questions
1. What does the main page `Cancel` button do (navigate away, clear fields, or something else)? [UNKNOWN]
2. Do From Date / To Date show a visible default value on load (the kit recorded a datetime value, but the reference crop shows no visible text)? [UNKNOWN]
3. What is the expected behavior of `Reset` (which fields clear vs revert to defaults, including date/time pickers)? [UNKNOWN]

## 14. Motion
- WHILE the page is shown THE SYSTEM SHALL have no user-visible motion; the only recorded motion entry is a zero-duration CSS animation (`autoFillEnd`). [M01]
