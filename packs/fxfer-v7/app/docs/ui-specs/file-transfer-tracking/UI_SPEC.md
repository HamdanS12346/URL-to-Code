# UI SPEC — fxfer-v7/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive + jquery 3.7.1 (+ Kendo UI for jQuery via Provider kit) · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[aspx:…]` · `[css:selector]` · `[kit:kN]` Provider kit widget/dialog · `[UNKNOWN: …]`

## 1. Overview
File Transfer Tracking lets a user search for file transfer records by criteria (IDs, status, direction, transport type, location, date range, size range), view results in a grid, and open a per-file details dialog showing information plus event/exception history. [asset:sections/02-pagebody.png]

Primary tasks:
- Search for file transfers using the Search Criteria form and view the Search Results grid. [ctl:nextButton, kit:k9]
- Open a file’s details dialog from a Search Results row and review Information, Events, and Exceptions. [kit:d1, asset:kit/states/dialog-d1.png]
- Clear the criteria form (Reset) or leave the screen (Cancel destination unknown). [ctl:resetButton, ctl:cancelButton]

## 2. Layout
Page: Wrapped in the shared shell (see the home spec). [asset:kit/states/search.png]

Page: fluid full-width; body background rgb(255, 255, 255); page scroll is the document (vertical scrollbar appears once results extend below the fold). [asset:kit/states/search.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Shared header (shell) | `#pageHeader` {pageHeader} | 0,0,1920,62 |  | fixed header | bg rgb(43, 58, 68) | [asset:kit/states/search.png] |
| Module title bar | `.menu` {navigation-file-transfer-services} | 0,62,1920,32 |  | left module label + page title | bg rgb(0, 238, 174) | [asset:sections/01-file-transfer-tracking.png] |
| Module border row | `#mcbRowBorder` {mcbRowBorder} | 0,94,1920,44 |  | flex row | bottom border 0.666667px solid rgb(179, 179, 179) | [asset:kit/states/search.png] |
| Main content | `#pageBody` {pageBody} | 0,138,1920,627 |  | contains Search Criteria and (after search) Search Results |  | [asset:sections/02-pagebody.png] |
| Footer (shell) | `footer` {contentinfo} | 0,766,1920,119 |  | footer links + server/build |  | [asset:sections/03-disclaimer-the-website-is-prov.png] |

### 2.1 Module title bar
- THE SYSTEM SHALL show the module label “FILE TRANSFER SERVICES” at the left, and the page title “File Transfer Tracking” on a green bar. [asset:sections/01-file-transfer-tracking.png]

### 2.2 Main content
- THE SYSTEM SHALL show a “Search Criteria” panel containing the criteria fields and action buttons Reset / Cancel / Search. [asset:sections/02-pagebody.png]
- WHEN Search has been run THE SYSTEM SHALL show a “Search Results” section below Search Criteria containing a pageable, sortable grid. [asset:kit/states/search.png, kit:k9]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-body | Arial, "Helvetica Neue", Helvetica, sans-serif 14px/14px | default text | [asset:sections/02-pagebody.png] |
| --color-text-primary | rgb(61, 61, 61) | most labels/text | [asset:sections/02-pagebody.png] |
| --color-shell-header-bg | rgb(43, 58, 68) | shared header background | [asset:kit/states/search.png] |
| --color-module-bar-bg | rgb(0, 238, 174) | module title bar background | [asset:sections/01-file-transfer-tracking.png] |
| --color-link-footer | rgb(255, 255, 255) on rgb(43, 58, 68) | footer links | [asset:sections/03-disclaimer-the-website-is-prov.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared header logo | 117×57 | “Client Logo” tooltip in shell | [asset:capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png, ctl:pageBannerLogo] |
| `assets/_svg/svg-1.svg` … `assets/_svg/svg-8.svg` | icon SVGs used on page | 18×16 | multiple inline svgs captured | [asset:capture/assets/_svg/svg-1.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - `Shell` *shared* — header, global menus, footer (out of scope here; see home spec) [ctl:button-main-menu-2]
  - `ModuleTitleBar` — “FILE TRANSFER SERVICES” + “File Transfer Tracking” [asset:sections/01-file-transfer-tracking.png]
  - `SearchCriteriaPanel`
    - `SearchCriteriaHeader` — title + collapse chevron [ctl:button-collapse]
    - `SearchCriteriaForm` — fields §6 (including Provider kit widgets) [kit:k1]
    - `SearchCriteriaActions` — Reset / Cancel / Search [ctl:resetButton]
  - `SearchResultsSection` — heading + grid widget [kit:k9]
  - `FileTransferDetailsDialog` — dialog “File Transfer Tracking” [kit:d1]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaForm` | initial field values | criteria field values | `FileId`, `FileName`, `combobox-file-status-file-status`, `combobox-direction-direction`, `combobox-transport-type-transport-type`, `combobox-source-location-source-location`, `TradingPartnerId`, `FromDate`, `ToDate`, `text-from-size-kb-from-size-kb`, `text-to-size-kb-to-size-kb` | [asset:sections/02-pagebody.png, kit:k1] |
| `SearchResultsGrid` | result rows (synthetic in kit) | selected row | grid widget `k9` | [kit:k9, asset:kit/states/search.png] |
| `FileTransferDetailsDialog` | selected row record | open/closed | dialog `d1` | [kit:d1, asset:kit/states/dialog-d1.png] |

## 6. Fields & validation
All Kendo widgets and dialog windows are built by the Provider kit; specify widget contents (label/placeholder/options/format/validation messages), not their internal implementation. [kit:k1]

### 6.1 Search Criteria fields
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FileId` | File ID | text | empty | no | maxLength 50; disallow characters `; * ^ : ~ < > %` | “File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: on blur vs on Search] | [ctl:FileId, kit:k1] |
| `FileName` | File Name | text | empty | no | maxLength 50; disallow characters `; * ^ : ~ < > %` | “File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: on blur vs on Search] | [ctl:FileName, kit:k1] |
| `combobox-file-status-file-status` | File Status | dropdown | placeholder “select a value...” | no | options: Complete, Error, Transferring |  | [UNKNOWN: on blur vs on Search] | [ctl:combobox-file-status-file-status, kit:k1] |
| `combobox-direction-direction` | Direction | dropdown | placeholder “select a value...” | no | options: INBOUND, OUTBOUND |  | [UNKNOWN: on blur vs on Search] | [ctl:combobox-direction-direction, kit:k2] |
| `combobox-transport-type-transport-type` | Transport Type | dropdown | placeholder “select a value...” | no | options: FTP, SFTP, UNC, FTPS |  | [UNKNOWN: on blur vs on Search] | [ctl:combobox-transport-type-transport-type, kit:k3] |
| `combobox-source-location-source-location` | Source Location | dropdown | placeholder “select a value...” | no | options list: 97 captured entries (see `kit/screen.json`) |  | [UNKNOWN: on blur vs on Search] | [ctl:combobox-source-location-source-location, kit:k4] |
| `TradingPartnerId` | Trading Partner ID | text | empty | no | maxLength 50; disallow characters `; * ^ : ~ < > %` | “Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: on blur vs on Search] | [ctl:TradingPartnerId, kit:k1] |
| `FromDate` | From Date | date-time | appears empty in the frozen reference | no | must be a date; must be a valid date time in format `M/d/yyyy h:mm tt` | “The field From Date must be a date.” / “From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'." | [UNKNOWN: on blur vs on Search] | [ctl:FromDate, kit:k5, asset:sections/02-pagebody.png] |
| `ToDate` | To Date | date-time | appears empty in the frozen reference | no | must be a date; must be a valid date time in format `M/d/yyyy h:mm tt` | “The field To Date must be a date.” / “To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'." | [UNKNOWN: on blur vs on Search] | [ctl:ToDate, kit:k6, asset:sections/02-pagebody.png] |
| `text-from-size-kb-from-size-kb` | From Size (KB) | numeric | empty | no | numeric with at most 2 decimal places | “From Size (KB) is restricted to numeric values with at most 2 decimal places.” | [UNKNOWN: on blur vs on Search] | [ctl:text-from-size-kb-from-size-kb, kit:k7] |
| `text-to-size-kb-to-size-kb` | To Size (KB) | numeric | empty | no | numeric with at most 2 decimal places | “To Size (KB) is restricted to numeric values with at most 2 decimal places.” | [UNKNOWN: on blur vs on Search] | [ctl:text-to-size-kb-to-size-kb, kit:k8] |

### 6.2 Details dialog fields (dialog: File Transfer Tracking)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| (dialog) `Information_FileId` | File ID | text (read-only display) | populated from selected row | no | disallow characters `; * ^ : ~ < > %` | “File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: when dialog validates] | [kit:d1, asset:kit/states/dialog-d1.png] |
| (dialog) `Information_CreateDate` | Create Date | text (read-only display) | populated from selected row | no | must be a date; must be a valid date time in format `M/d/yyyy h:mm tt` | “The field Create Date must be a date.” / “Create Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'." | [UNKNOWN: when dialog validates] | [kit:d1, asset:kit/states/dialog-d1.png] |
| (dialog) `Information_DirectionList` | Direction | dropdown (display) | populated from selected row | no | options: INBOUND, OUTBOUND |  | [UNKNOWN: when dialog validates] | [kit:k10, kit:d1] |
| (dialog) `Information_FileStatusList` | File Status | dropdown (display) | populated from selected row | no | options: Complete, Error, Transferring |  | [UNKNOWN: when dialog validates] | [kit:k11, kit:d1] |
| (dialog) `Information_TransportTypeList` | Transport Type | dropdown (display) | populated from selected row | no | options: FTP, SFTP, UNC, FTPS |  | [UNKNOWN: when dialog validates] | [kit:k12, kit:d1] |
| (dialog) `Information_Size` | Size (KB) | text (read-only display) | populated from selected row | no | numeric with at most 2 decimal places | “Size (KB) is restricted to numeric values with at most 2 decimal places.” | [UNKNOWN: when dialog validates] | [kit:d1, asset:kit/states/dialog-d1.png] |
| (dialog) `Information_OriginatingServerName` | Originating Server Name | text (read-only display) | populated from selected row | no | disallow characters `; * ^ : ~ < > %` | “Originating Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: when dialog validates] | [kit:d1] |
| (dialog) `Information_SourceLocation` | Source Location | text (read-only display) | populated from selected row | no | disallow characters `; * ^ : ~ < > %` | “Source Location contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: when dialog validates] | [kit:d1] |
| (dialog) `Information_TradingPartnerId` | Trading Partner ID | text (read-only display) | populated from selected row | no | disallow characters `; * ^ : ~ < > %` | “Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: when dialog validates] | [kit:d1] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `searchCriteriaExpanded` | boolean | true | collapse control | shows/hides the Search Criteria panel body | [ctl:button-collapse, kit:k1] |
| `searchHasRun` | boolean | false | Search action | shows Search Results section | [ctl:nextButton, asset:kit/states/search.png] |
| `selectedResultRow` | string/record | none | grid row click | enables row-specific actions and is the subject of the details dialog | [kit:k9] |
| `detailsDialogOpen` | boolean | false | grid row double-click; dialog close | shows/hides the “File Transfer Tracking” dialog | [kit:d1] |

Hidden at load (facts §12): None. [asset:sections/02-pagebody.png]

## 8. Behavior
### 8.1 Shared shell (out of scope)
- Wrapped in the shared Provider portal shell; shell behavior (menus, header) is specified in the home spec. [ctl:button-main-menu-2]

### 8.2 Search Criteria panel
- THE SYSTEM SHALL display the “Search Criteria” header and a collapse control. [asset:sections/02-pagebody.png, ctl:button-collapse]
- WHEN the user activates the collapse control THE SYSTEM SHALL toggle the Search Criteria body collapsed/expanded. [ctl:button-collapse]
- THE SYSTEM SHALL display the “Required Fields ( * )” note in the panel header area. [asset:sections/02-pagebody.png]

### 8.3 Search Criteria fields (Provider kit widgets)
- THE SYSTEM SHALL provide the following widgets (labels/placeholder/options/format as in §6): File Status [kit:k1], Direction [kit:k2], Transport Type [kit:k3], Source Location [kit:k4], From Date [kit:k5], To Date [kit:k6], From Size (KB) [kit:k7], To Size (KB) [kit:k8]. [kit:k1]
- THE SYSTEM SHALL show a `?` help icon next to each field label; hovering/focusing it shows the captured help text for that field. [ctl:FileIdHelp, ctl:FileNameHelp]

### 8.4 Search Results grid
- WHEN the user runs Search THE SYSTEM SHALL show “Search Results” and render a pageable grid with columns: File ID, File Name, File Status, Direction, Transport Type, Size (KB), Create Date, Trading Partner ID. [kit:k9, asset:kit/states/search.png]
- THE SYSTEM SHALL allow sorting on the sortable columns (as captured by the kit). [kit:k9]
- WHEN the user clicks a row THE SYSTEM SHALL select it (without opening the dialog). [kit:k9]
- WHEN the user double-clicks the first grid row THE SYSTEM SHALL open the details dialog `d1`. [kit:d1, kit:k9]

### 8.5 Details dialog — “File Transfer Tracking”
- WHEN opened THE SYSTEM SHALL show a modal dialog titled “File Transfer Tracking” containing sections “INFORMATION”, “EVENTS”, and “EXCEPTIONS”. [kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL allow closing the dialog via the top-right X and via the Cancel button in the dialog. [kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL show the Events grid with columns Event Code, Create Date, Description. [kit:k13, kit:d1]
- THE SYSTEM SHALL show the Exceptions grid with columns Date, Exception Type, Method Name; when empty it shows “There are no records found.” [kit:k14, asset:kit/states/dialog-d1.png]
- Responsive placement: below 1280px wide the portal may place the dialog near the left edge (phone branch); above it centers it, at most 85% high. [asset:kit/states/layout@client.png, kit:d1]

### 8.6 Scroll behavior
None. [asset:sections/02-pagebody.png]

### 8.7 Media
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-client-logo` | `/Home/MyHome/` | same tab | [ctl:link-client-logo] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout] |
| `link-my-account` | `/Home/MyAccount` | same tab | [ctl:link-my-account] |
| `cancelButton` | [UNKNOWN: Cancel target/destination] | [UNKNOWN] | [ctl:cancelButton] |
| `button-disclaimer` | [UNKNOWN: footer Disclaimer destination] | [UNKNOWN] | [ctl:button-disclaimer] |
| `button-website-requirements` | [UNKNOWN: footer Website Requirements destination] | [UNKNOWN] | [ctl:button-website-requirements] |
| `button-privacy-policy` | [UNKNOWN: footer Privacy Policy destination] | [UNKNOWN] | [ctl:button-privacy-policy] |
| `button-cookie-policy` | [UNKNOWN: footer Cookie Policy destination] | [UNKNOWN] | [ctl:button-cookie-policy] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | `GET /api/FileTransfer/SearchFileTransferTracking/` (criteria fields are the form inputs in §6) | Provider kit services mock the endpoint for rebuild | response populates Search Results grid | [kit:k9] |

## 11. Accessibility
- Each field has a visible label (“File ID”, “File Name”, etc.) and a separate help icon for tooltip help. [asset:sections/02-pagebody.png, ctl:FileIdHelp]
- Buttons are keyboard-activatable (capture shows `onclick`/`onkeypress` handlers on key actions like Search/Reset/Cancel). [ctl:nextButton]
- Kendo widgets (dropdowns/date-time/numeric/grid/dialog) are expected to provide keyboard interaction per the Provider kit. [kit:k1]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `spec/parity.spec.ts` uses them.

Required capture controls (gate list):
[ctl:pageBannerLogo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links] [ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2] [ctl:button-8] [ctl:activeModuleMenu] [ctl:activeModuleMenuFirstItem] [ctl:button-help] [ctl:button-22] [ctl:button-collapse] [ctl:FileIdHelp] [ctl:FileId] [ctl:FileNameHelp] [ctl:FileName] [ctl:FileStatusHelp] [ctl:combobox-file-status-file-status] [ctl:button-select] [ctl:DirectionHelp] [ctl:combobox-direction-direction] [ctl:button-select-2] [ctl:TransportTypeHelp] [ctl:combobox-transport-type-transport-type] [ctl:button-select-3] [ctl:SourceLocationIdHelp] [ctl:combobox-source-location-source-location] [ctl:button-select-4] [ctl:TradingPartnerIdHelp] [ctl:TradingPartnerId] [ctl:FromDateHelp] [ctl:FromDate] [ctl:button-open-the-date-view] [ctl:button-open-the-time-view] [ctl:ToDateHelp] [ctl:ToDate] [ctl:button-open-the-date-view-2] [ctl:button-open-the-time-view-2] [ctl:FromSizeHelp] [ctl:text-from-size-kb-from-size-kb] [ctl:ToSizeHelp] [ctl:text-to-size-kb-to-size-kb] [ctl:resetButton] [ctl:cancelButton] [ctl:nextButton] [ctl:button-disclaimer] [ctl:button-website-requirements] [ctl:button-privacy-policy] [ctl:button-cookie-policy]

Key list (verbatim):
`pageBannerLogo`, `button`, `button-medicaid-management-solutions`, `button-2`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-8`, `activeModuleMenu`, `activeModuleMenuFirstItem`, `button-help`, `button-22`, `button-collapse`, `FileIdHelp`, `FileId`, `FileNameHelp`, `FileName`, `FileStatusHelp`, `combobox-file-status-file-status`, `button-select`, `DirectionHelp`, `combobox-direction-direction`, `button-select-2`, `TransportTypeHelp`, `combobox-transport-type-transport-type`, `button-select-3`, `SourceLocationIdHelp`, `combobox-source-location-source-location`, `button-select-4`, `TradingPartnerIdHelp`, `TradingPartnerId`, `FromDateHelp`, `FromDate`, `button-open-the-date-view`, `button-open-the-time-view`, `ToDateHelp`, `ToDate`, `button-open-the-date-view-2`, `button-open-the-time-view-2`, `FromSizeHelp`, `text-from-size-kb-from-size-kb`, `ToSizeHelp`, `text-to-size-kb-to-size-kb`, `resetButton`, `cancelButton`, `nextButton`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`.

Run: `TARGET=react URL=<rebuild url> npx playwright test spec/parity.spec.ts`

## 13. Open questions
1. What is the destination/behavior of the Search Criteria `cancelButton` on this screen (navigate to home, close module, etc.)? [UNKNOWN]
2. What are the destinations/content for footer links/buttons: Disclaimer, Website Requirements, Privacy Policy, Cookie Policy? [UNKNOWN]
3. Are From Date / To Date intended to default to “today” (kit reports prefilled 0 day(s) from today) even though they appear empty in the frozen reference image? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL apply the CSS animation `autoFillEnd` (duration 0s, delay 0s, 1 iteration, easing `ease`) to 7 elements such as `#FileId_parent > div:nth-of-type(2) > span:nth-of-type(1)`. [M01]

