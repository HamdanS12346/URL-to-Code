# UI SPEC — ffxfer-index-v1/ftp-server-credentials

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 + Kendo UI for jQuery (provider kit) · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[css:selector]` · `[kit:<id>]` kit widget/dialog · `[UNKNOWN: …]`

## 1. Overview
This screen lets the user search for FTP server credentials (by Server Name) and view the matching results in a grid, with an action to add new FTP server credentials. [asset:sections/02-pagebody.png]

Primary tasks:
- Search FTP server credentials by Server Name. [ctl:FtpServerName]
- View Search Results in the grid (sortable/filterable/paged). [kit:k1]
- Create a new FTP Server Credential record via the “Add FTP Server Credentials” dialog. [ctl:ftpServerCredentialAddButton, kit:d1]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-ftp-server-credentials.png]

Scope of this spec: the content area `#pageBody > main` (the page body content under the shared shell). [css:#pageBody]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content root | `div#pageBody` | 0,138.5,1920,399.5 | sections/02 | contains `main` and the screen form | background `var(--gw-color-neutral-0)` | [css:#pageBody] |
| Screen form | `form#SearchFTPServerCredentialsId` | 0,138.5,1920,399.5 | sections/02 | block | `class="k-content"` | [css:form.k-content] |
| Action row | `button#ftpServerCredentialAddButton` | 1743.52,138.5,146.48,38 | sections/02 | top-right | 1px solid rgb(0, 98, 255) border, radius 4px, padding 5px 30px | [ctl:ftpServerCredentialAddButton, asset:sections/02-pagebody.png] |
| Search Criteria panel | `div.content-panel-container` | 30,? ,1860,? | sections/02 | panel with header + body | bg rgb(255,255,255), 1px solid rgb(222,226,230), radius 10px, shadow rgba(0,0,0,0.08) 0 8px 10px 1px | [asset:sections/02-pagebody.png] |

### 2.1 Search Criteria panel
- Header row text is “Search Criteria”. [asset:sections/02-pagebody.png]
- Header tools include a chevron icon button at the far right (`div#criteriaPanel`) with title “Collapse”. [ctl:criteriaPanel]
- The panel contains a “Required Fields ( * )” note near the top-right of the panel body. [asset:sections/02-pagebody.png]
- Field row(s) appear in a left-aligned grid; the first/only captured criterion is “Server Name”. [ctl:FtpServerName]
- Action buttons are inside the panel at the bottom: “Reset” at bottom-left, “Cancel” and “Search” at bottom-right. [ctl:resetButton, ctl:cancelButton, ctl:nextButton]

### 2.2 Search Results panel (after Search)
After a Search, a “Search Results” panel appears beneath Search Criteria and contains:
- “Include Invalids” checkbox control (`showInvalidFTPServerCredentialsCheckBox`) at the upper-right of the panel. [ctl:showInvalidFTPServerCredentialsCheckBox, asset:kit/states/search.png]
- Results grid widget. [kit:k1]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome 14px/1` | default text | [css:body] |
| `--color-text` | `rgb(51, 51, 51)` | default text | [css:body] |
| `--color-surface` | `var(--gw-color-neutral-0)` | page background | [css:body] |
| `--color-panel-header-bg` | `rgb(250, 250, 250)` | “Search Criteria” header bg | [asset:sections/02-pagebody.png] |
| `--color-accent` | `rgb(0, 98, 255)` | primary accents (button borders, help icon) | [asset:sections/02-pagebody.png] |
| `--color-required` | `rgb(203, 26, 198)` | required asterisk / “Required Fields (*)” | [asset:sections/02-pagebody.png] |

## 4. Assets
None (content area uses CSS + icon fonts; no content-area bitmap assets captured). [asset:sections/02-pagebody.png]

## 5. Components
React component tree (shared components marked *shared*):
- `FtpServerCredentialsPage`
  - `Shell` *shared* (out of scope; see home spec)
  - `CreateNewButtonRow` — “Create New” [ctl:ftpServerCredentialAddButton]
  - `SearchCriteriaPanel`
    - `ServerNameField` — field + help icon [ctl:FtpServerName]
    - `SearchCriteriaActions` — Reset / Cancel / Search [ctl:resetButton]
  - `SearchResultsPanel` (shown after Search)
    - `IncludeInvalidsToggle` [ctl:showInvalidFTPServerCredentialsCheckBox]
    - `FtpServerCredentialsGrid` [kit:k1]
  - `AddFtpServerCredentialsDialog` (modal) [kit:d1]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `FtpServerCredentialsPage` | none | search state + dialog open/closed | `ftpServerCredentialAddButton`, `nextButton` | [asset:sections/02-pagebody.png] |
| `SearchCriteriaPanel` | current criteria values | expanded/collapsed | `criteriaPanel`, `FtpServerName` | [ctl:criteriaPanel, ctl:FtpServerName] |
| `SearchResultsPanel` | search results (synthetic) | paging/sort/filter via kit | `showInvalidFTPServerCredentialsCheckBox` | [asset:kit/states/search.png] |
| `FtpServerCredentialsGrid` | synthetic rows | kit-owned | (kit widget) | [kit:k1] |
| `AddFtpServerCredentialsDialog` | none | field values + validation via kit | (kit dialog) | [kit:d1, asset:kit/states/dialog-d1.png] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | `Server Name` | text | empty | no | max length 50; regex `^([^;*^:~<>%])*$` | `Server Name has a maximum length of 50 characters.` / `Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: when search criteria validation messages are shown]` | [ctl:FtpServerName] |
| `showInvalidFTPServerCredentialsCheckBox` | `Include Invalids` | checkbox | unchecked | no | none captured | none | `[UNKNOWN: whether toggling re-queries or client-filters]` | [ctl:showInvalidFTPServerCredentialsCheckBox, asset:kit/states/search.png] |

Dialog “Add FTP Server Credentials” fields (kit-managed): [kit:d1]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `Edit_FtpServerName` | `Server Name` | text | empty | yes | max length 50; regex `^([^;*^:~<>%])*$` | `Server Name is a required field.` / `Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpDescription` | `Description` | text | empty | yes | max length 100; regex `^([^;*^:~<>%])*$` | `Description is a required field.` / `Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpTransferMode` | dropdown | `[UNKNOWN: initial selection]` | yes | required | `Transfer Mode is a required field.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpServerIp` | `IP Server` | text | empty | yes | regex `^([^;*^:~<>%])*$` | `IP Server is a required field.` / `IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpPort` | `Port` | number | `0` | yes | number; regex `^([^;*^:~<>%])*$` | `Port is a required field.` / `The field Port must be a number.` / `Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpProxyAddress` | `Proxy Address` | text | empty | no | regex `^([^;*^:~<>%])*$` | `Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpProxyPort` | `Proxy Port` | number | empty | no | number; regex `^([^;*^:~<>%])*$` | `The field Proxy Port must be a number.` / `Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpUser` | `Server User` | text | empty | yes | regex `^([^;*^:~<>%])*$` | `Server User is a required field.` / `Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpPassword` | `Password` | password | empty | yes | regex `^([^;*^:~<>%])*$` | `Password is a required field.` / `Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_FtpPasswordConfirmation` | `Password Confirmation` | password | empty | yes | regex `^([^;*^:~<>%])*$` | `Password Confirmation is a required field.` / `Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `Edit_OperatorId` | `Last Modified User Id` | text | empty | yes | regex `^([^;*^:~<>%])*$` | `Last Modified User Id is a required field.` / `Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on save]` | [kit:d1] |
| `View_CreationDate` | `Creation Date` | date (MM/dd/yyyy) | `01/01/1900` | yes | date format MM/DD/YYYY | `Creation Date is a required field.` / `Creation Date must represent a valid date in the format 'MM/DD/YYYY'.` | `[UNKNOWN: on blur vs on save]` | [kit:k2] |
| `View_LastModifiedDate` | `Modified Date` | date (MM/dd/yyyy) | `01/01/1900` | no | date format MM/DD/YYYY | `Modified Date must represent a valid date in the format 'MM/DD/YYYY'.` | `[UNKNOWN: on blur vs on save]` | [kit:k3] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `searchCriteriaExpanded` | boolean | true | `criteriaPanel` toggle | Search Criteria panel body visible when true | [ctl:criteriaPanel, asset:sections/02-pagebody.png] |
| `hasSearched` | boolean | false | Search action (`nextButton`) | Search Results panel visible when true; Search Criteria may be collapsed | [ctl:nextButton, asset:kit/states/search.png] |
| `includeInvalids` | boolean | false | `showInvalidFTPServerCredentialsCheckBox` | affects which results are included | [ctl:showInvalidFTPServerCredentialsCheckBox] |
| `addDialogOpen` | boolean | false | Create New action | dialog `Add FTP Server Credentials` shown when true | [ctl:ftpServerCredentialAddButton, kit:d1] |

Hidden at load (facts §12):
None. [ctl:FtpServerName]

## 8. Behavior
### 8.1 Search Criteria
- THE SYSTEM SHALL show the Search Criteria panel with the “Server Name” field and action buttons (Reset / Cancel / Search). [asset:sections/02-pagebody.png]
- WHEN the user activates the Search Criteria chevron (`criteriaPanel`) THE SYSTEM SHALL toggle the Search Criteria panel between expanded and collapsed. [ctl:criteriaPanel, asset:sections/02-pagebody.png, asset:kit/states/search.png]

### 8.2 Search
- WHEN the user activates the “Search” action (`nextButton`) THE SYSTEM SHALL request FTP server credentials and show a Search Results panel containing the grid and the “Include Invalids” checkbox. [ctl:nextButton, kit:k1, asset:kit/states/search.png]
- WHEN the user activates the “Reset” action (`resetButton`) THE SYSTEM SHALL reset the Search Criteria form to its defaults. [ctl:resetButton, UNKNOWN: confirm whether results are cleared and whether Search Criteria expands]
- WHEN the user activates the “Cancel” action (`cancelButton`) THE SYSTEM SHALL perform the legacy Cancel behavior. [ctl:cancelButton, UNKNOWN: destination/behavior of Cancel]

### 8.3 Create New dialog
- WHEN the user activates “Create New” (`ftpServerCredentialAddButton`) THE SYSTEM SHALL open the “Add FTP Server Credentials” dialog. [ctl:ftpServerCredentialAddButton, kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL render the dialog fields and validation as defined by the kit harvest. [kit:d1]

### 8.y Scroll behavior
None observed. [asset:sections/02-pagebody.png]

### 8.z Media
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `cancelButton` | `[UNKNOWN: where Cancel navigates]` | `[UNKNOWN]` | [ctl:cancelButton] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search (`nextButton`) | GET `/api/FileTransfer/GetFTPServerCredentials/` | mock/stub response in rebuild; kit uses synthetic rows | populates grid `k1` and shows Search Results panel | [kit:k1] |
| Save (dialog d1) | `[UNKNOWN: legacy endpoint for add FTP server credentials]` | `[UNKNOWN]` | `[UNKNOWN]` | [kit:d1, UNKNOWN: missing request capture] |

## 11. Accessibility
- The “Server Name” input has a `<label for="FtpServerName">Server Name</label>` association. [ctl:FtpServerName]
- The Search Criteria help icon uses a tooltip with title “Server Name”. [ctl:FtpServerNameHelp]
- Buttons and menu controls are expected to be keyboard-focusable per the shared shell spec. [UNKNOWN: reference home spec evidence]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/ffxfer-index-v1/screens/ftp-server-credentials/spec/parity.spec.ts` uses them.

Content-area keys in scope for this spec:
`ftpServerCredentialAddButton`, `criteriaPanel`, `FtpServerName`, `FtpServerNameHelp`, `resetButton`, `cancelButton`, `nextButton`, `showInvalidFTPServerCredentialsCheckBox` [ctl:nextButton]

Shared-shell / out-of-scope controls (specified in the home spec, but still required as `data-testid` for parity on this route):
[ctl:pageBannerLogo], [ctl:button], [ctl:button-medicaid-management-solutions], [ctl:button-2], [ctl:AAGMenu.BroadcastMsg], [ctl:link-messages], [ctl:AAGMenu.ExternalLinks], [ctl:link-external-links], [ctl:AAGMenu.Favorites], [ctl:link-favorites], [ctl:AAGMenu.ContactUs], [ctl:link-contact-us], [ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:link-logout], [ctl:button-main-menu-2], [ctl:button-8], [ctl:activeModuleMenu], [ctl:activeModuleMenuFirstItem], [ctl:button-help], [ctl:button-21], [ctl:button-disclaimer], [ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/ffxfer-index-v1/screens/ftp-server-credentials/spec/parity.spec.ts`

## 13. Open questions
1. What exactly happens when the user clicks “Cancel” on this screen (navigation destination and whether it prompts)? — answer from: legacy JS `hp.ua3.fileTransfer.searchFtpServerCredentials__884a35a7.js` or product owner. [UNKNOWN]
2. Does “Reset” clear Search Results and/or re-expand Search Criteria? — answer from: legacy JS `hp.ua3.fileTransfer.searchFtpServerCredentials__884a35a7.js`. [UNKNOWN]
3. What is the submit/save endpoint and response behavior for the “Add FTP Server Credentials” dialog (Save)? — answer from: backend/API spec or network capture. [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL run the CSS animation `autoFillEnd` on the Server Name field container (duration 0s, delay 0s, iterations 1, easing `ease`). [M01]

