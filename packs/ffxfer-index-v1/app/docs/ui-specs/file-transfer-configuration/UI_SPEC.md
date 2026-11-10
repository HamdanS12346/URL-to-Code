# UI SPEC — ffxfer-index-v1/file-transfer-configuration

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive, jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[css:…]` · `[kit:k#]` provider-kit widget/dialog · `[UNKNOWN: …]`

## 1. Overview
File Transfer Configuration is a search-and-results screen for locating existing file transfer source location configurations, with an action to create a new configuration. [asset:sections/01-mainmenucontainer.png]

Primary tasks:
- Search configurations by criteria (ID/name/owner/module/protocol) and review results in a grid. [asset:sections/02-pagebody.png]
- Create a new configuration from the results area. [ctl:FileTransferGridAddButton]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Content area: fluid full-width content with a white background; primary content is a single “Search Criteria” panel, followed by a results panel (initially hidden) containing the grid. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---:|---|---|---|---|
| Content root | `div#orientationLandscape` | 0,62,1920,706 | sections/01, sections/02 | block | body padding-top 62px (header), bg `rgb(255,255,255)` | [asset:sections/02-pagebody.png] |
| Search panel | `div.content-panel-container` | (within pageBody) | sections/02 | panel with header + body | border `1px solid rgb(222, 226, 230)`, radius `10px`, shadow `rgba(0,0,0,0.08) 0px 8px 10px 1px`, bottom padding `15px` | [asset:sections/02-pagebody.png, css:.content-panel-container] |
| Search panel header | `div.content-panel-hdr` | (within panel) | sections/02 | block | bg `rgb(250, 250, 250)`, padding `12px 24px`, radius `10px 10px 0 0` | [asset:sections/02-pagebody.png, css:.content-panel-hdr] |
| Results panel (hidden by default) | `div#searchFileTransferConfigResultsPanel` | (below search fields) | (not shown expanded) | block | inline style `display: none` at load | [css:#searchFileTransferConfigResultsPanel, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#resetSearchFileTransfer] |

### 2.1 Search Criteria panel
- Header text “Search Criteria” is left-aligned. [asset:sections/02-pagebody.png]
- Panel body includes a “Required Fields (*)” hint line. [asset:sections/02-pagebody.png]
- Fields are arranged in a multi-column form row layout:
  - Row 1: Configuration ID, Configuration Name, Owner Name. [asset:sections/02-pagebody.png]
  - Row 2: Owner Module, Protocol. [asset:sections/02-pagebody.png]
- Action buttons appear below the fields: Reset, Cancel, Search. [ctl:resetButton]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` | body | [css:body] |
| `--font-size-body` | `14px` | body text | [css:body] |
| `--color-text-body` | `rgb(51, 51, 51)` | body text | [css:body] |
| `--color-panel-border` | `rgb(222, 226, 230)` | panel border | [asset:sections/02-pagebody.png] |
| `--radius-panel` | `10px` | search panel | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117×57 | shell-owned | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | Owner Module dropdown caret icon | 18×16 | used by Kendo dropdown | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | Protocol dropdown caret icon | 18×16 | used by Kendo dropdown | [asset:assets/_svg/svg-2.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferConfigurationPage`
  - `SearchCriteriaPanel`
    - `ConfigurationIdField` — Kendo numeric textbox [kit:k1]
    - `ConfigurationNameField` [ctl:ConfigName]
    - `OwnerNameField` [ctl:OwnerName]
    - `OwnerModuleDropdown` — Kendo dropdown [kit:k2]
    - `ProtocolDropdown` — Kendo dropdown [kit:k3]
    - `SearchActions` — Reset/Cancel/Search [ctl:resetButton]
  - `ResultsPanel`
    - `CreateNewButton` [ctl:FileTransferGridAddButton]
    - `FileTransferSearchGrid` — Kendo grid [kit:k4]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | initial field values | field values | `ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList` | [asset:sections/02-pagebody.png] |
| `ResultsPanel` | current filters | results visibility | `searchFileTransferConfigResultsPanel` | [css:#searchFileTransferConfigResultsPanel] |
| `FileTransferSearchGrid` | filters: ConfigId/OwnerName/ConfigName/Protocol/OwnerSubsystem/IsActive | selected row | `FileTransferSearchGrid`, `FileTransferShowInactiveCheckBox` | [kit:k4, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#performFileTransferSearch] |

## 6. Fields & validation
Provider-kit widgets and their catalogs are authoritative in `kit/screen.json`; cite every widget as `[kit:k#]`.

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---:|---|---|---|---|
| `ConfigId` | Configuration ID | numeric textbox | empty (cleared on init) | no | max length 9; digits only regex `^([0-9])*$` | “Configuration ID is restricted to numeric characters only [0-9].” | on input / MVC validation | [kit:k1, ctl:ConfigId, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#editorInitStepPostprocess] |
| `ConfigName` | Configuration Name | text | empty | no | max length 50; regex `^([A-Za-z0-9]|[^\x00-\x7F])*$` | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on input / MVC validation | [ctl:ConfigName] |
| `OwnerName` | Owner Name | text | empty | no | max length 50; regex `^([^;*^:~<>%])*$` | “Owner Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on input / MVC validation | [ctl:OwnerName] |
| `SearchModuleList` | Owner Module | dropdown | empty | no | option label “select a value…” | N/A | on change | [kit:k2, asset:kit/states/dropdown.png] |
| `ProtocolList` | Protocol | dropdown | empty | no | option label “select a value…” | N/A | on change | [kit:k3, asset:sections/02-pagebody.png] |
| `FileTransferShowInactiveCheckBox` | Show Inactives | checkbox | unchecked | no | toggles IsActive filter (inverted) | N/A | on change | [kit:k4, ctl:FileTransferShowInactiveCheckBox] |

Help/tooltips:
- Configuration ID help icon shows tooltip “Configuration ID”. [ctl:ConfigIdHelp]
- Configuration Name help icon shows tooltip “Configuration Name”. [ctl:ConfigNameHelp]
- Owner Name help icon shows tooltip “Owner Name”. [ctl:OwnerNameHelp]
- Owner Module help icon shows tooltip “Owner Module”. [ctl:col-md-4_editor-colOwnerModuleHelp]
- Protocol help icon shows tooltip “Protocol”. [ctl:ProtocolHelp]

Owner Module option list (dropdown items, in order): [kit:k2]
- Administration
- Auth Determination
- Claims Management
- Core
- Correspondence Mgmt
- Custom 01
- Drug Rebate
- Drug Rebate Portal
- EDI
- Employee Mgmt
- File Transfer
- Identity Management
- Integration
- Managed Care
- Managed Care Portal
- Member Management
- Member Portal
- Notifications
- Plan Management
- Program Integrity
- Program Integrity CT
- Provider Credentialing
- Provider Enrollment
- Provider Management
- Provider Portal
- Screening
- Task Management
- TPL Case Tracking
- TPL HIPP
- TPL Policy

Protocol option list (dropdown items, in order): [kit:k3]
- FTP
- SFTP
- UNC
- FTPS

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `resultsVisible` | boolean | false | Search / Reset | shows/hides `#searchFileTransferConfigResultsPanel` | [css:#searchFileTransferConfigResultsPanel, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#performFileTransferSearch] |
| `showInactive` | boolean | false (unchecked) | Show Inactives checkbox | filter `IsActive` is applied as the inverse of checkbox checked state | [ctl:FileTransferShowInactiveCheckBox, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#applyFileTransferFilter] |
| `selectedRowFtsSourceLocationId` | string | null | grid row selection | used when opening the View overlay URL query string | [js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#fileTransferGridOnRowSelected] |

Hidden at load:
| element | shown when | evidence |
|---|---|---|
| `#searchFileTransferConfigResultsPanel` | after Search | [css:#searchFileTransferConfigResultsPanel, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#performFileTransferSearch] |

## 8. Behavior
### 8.1 Search actions
- WHEN the user clicks Search (`nextButton`) THE SYSTEM SHALL clear general messages, hide summary errors, apply Kendo grid filters from the current field values, hide `#divFileBaseSourceStatus`, and show `#searchFileTransferConfigResultsPanel`. [ctl:nextButton, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#performFileTransferSearch]
- WHEN the user clicks Reset (`resetButton`) THE SYSTEM SHALL hide summary errors, reset field validations, reset the form fields to their defaults, clear grid data, uncheck Show Inactives, hide `#divFileBaseSourceStatus`, and hide `#searchFileTransferConfigResultsPanel`. [ctl:resetButton, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#resetSearchFileTransfer]
- WHEN the user toggles Show Inactives (`FileTransferShowInactiveCheckBox`) THE SYSTEM SHALL clear general messages and re-apply the grid filter using the current criteria values. [ctl:FileTransferShowInactiveCheckBox, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#applyFileTransferFilter]

### 8.2 Results grid
- THE SYSTEM SHALL present a grid with a toolbar containing a “Show Inactives” checkbox and label. [kit:k4]
- THE SYSTEM SHALL show the grid columns (in order): Configuration ID, Configuration Name, Protocol, Address, Mask, Owner Name, Owner Module, Status; and SHALL keep “Fts Source Location Id” hidden. [kit:k4]
- THE SYSTEM SHALL page results with page size 10 and provide pager controls including refresh and page size options 5/10/20. [kit:k4]

### 8.3 Create/view overlays
- WHEN the user clicks “Create New” (`FileTransferGridAddButton`) THE SYSTEM SHALL open a modal overlay “FileTransferConfigurationEditPopup” loading `/FileTransfer/FileTransferConfigurationEdit/`. Dialog contents and save/cancel behavior are not captured. [ctl:FileTransferGridAddButton, js:inline-19.js, UNKNOWN: dialog content]
- WHEN a grid row is selected and the view action is invoked (trigger not captured) THE SYSTEM SHALL open a modal overlay “FileTransferConfigurationViewOverlay” loading `/FileTransfer/FileTransferConfigurationView/?ftsSourceLocationId=<selected>`. [UNKNOWN: what user action invokes onDisplayFileTransferView (row double-click? view icon?)], [js:inline-19.js, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#onDisplayFileTransferView]

### 8.4 Scroll behavior
None. [asset:sections/01-mainmenucontainer.png]

### 8.5 Media
None. [asset:sections/01-mainmenucontainer.png]

## 9. Navigation
None. [asset:sections/02-pagebody.png]

## 10. Server interactions
None observed in the capture. Search applies client-side Kendo filters on the grid; the grid’s data source contract is not captured. [UNKNOWN: grid read endpoint/parameters/response]. [kit:k4, js:Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js#performFileTransferSearch]

## 11. Accessibility
- Each field is associated to its label via captured markup (Kendo widgets and label elements). [kit:k1]
- Help icons are keyboard-accessible (`click`, `keypress`) and expose tooltip text. [ctl:ConfigIdHelp]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/ffxfer-index-v1/screens/file-transfer-configuration/spec/parity.spec.ts` uses them:

`ConfigId`, `ConfigIdHelp`, `ConfigName`, `ConfigNameHelp`, `OwnerName`, `OwnerNameHelp`, `SearchModuleList`, `col-md-4_editor-colOwnerModuleHelp`, `ProtocolList`, `ProtocolHelp`, `resetButton`, `cancelButton`, `nextButton`, `FileTransferGridAddButton`, `searchFileTransferConfigResultsPanel`, `FileTransferSearchGrid`, `FileTransferShowInactiveCheckBox`, `divFileBaseSourceStatus` [asset:sections/02-pagebody.png]

Shared shell/footer controls are captured for parity; their detailed layout/behavior is specified in the home spec.

[ctl:pageBannerLogo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg]
[ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links] [ctl:AAGMenu.Favorites] [ctl:link-favorites]
[ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout]
[ctl:button-main-menu-2] [ctl:mainMenuClose] [ctl:button-5] [ctl:mainMenu] [ctl:button-administration]
[ctl:button-alert-notification] [ctl:button-claims-management] [ctl:button-drug-rebate] [ctl:button-ui-examples]
[ctl:button-file-transfer-services] [ctl:button-integration] [ctl:button-managed-care] [ctl:button-member-management]
[ctl:button-plan-management] [ctl:button-program-integrity] [ctl:button-pi-case-tracking]
[ctl:button-provider-enrollment] [ctl:button-provider-management] [ctl:button-screening-credentialing]
[ctl:button-tpl-case-tracking] [ctl:button-tpl-policy] [ctl:button-tpl-hipp] [ctl:button-task-management]
[ctl:button-8] [ctl:activeModuleMenu] [ctl:activeModuleMenuFirstItem] [ctl:button-help] [ctl:FileTransferGridAddButton]
[ctl:button-21] [ctl:button-collapse] [ctl:ConfigIdHelp] [ctl:text-configuration-id-configuration-i]
[ctl:ConfigNameHelp] [ctl:ConfigName] [ctl:OwnerNameHelp] [ctl:OwnerName] [ctl:col-md-4_editor-colOwnerModuleHelp]
[ctl:combobox-owner-module] [ctl:button-select] [ctl:ProtocolHelp] [ctl:combobox-protocol-protocol]
[ctl:button-select-2] [ctl:resetButton] [ctl:cancelButton] [ctl:nextButton] [ctl:button-disclaimer]
[ctl:button-website-requirements] [ctl:button-privacy-policy] [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/ffxfer-index-v1/screens/file-transfer-configuration/spec/parity.spec.ts`

## 13. Open questions
1. What user action triggers the “View” overlay (`onDisplayFileTransferView`) from the grid (row click? double-click? a command column)? [UNKNOWN]
2. What backend endpoint(s) does the grid use to read results (URL, request params, response shape)? [UNKNOWN]
3. What is the Cancel button’s outcome on this screen (navigate to home, clear form, close module)? [UNKNOWN]
4. What validations (if any) apply across fields (e.g., “at least one search criterion is required”)? [UNKNOWN]
5. What are the contents, fields, validations, and actions inside the Create/Edit overlay and View overlay? [UNKNOWN]

## 14. Motion
- WHILE the page is shown THE SYSTEM SHALL have the CSS animation `autoFillEnd` present on the form input elements with duration 0s and delay 0s (no visible motion). [M01]
