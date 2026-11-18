# UI SPEC — fxfer-v9/ftp-server-credentials

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 + Kendo UI for jQuery (Provider portal) · target React 19
> Evidence tags: `[flow:<id>]` flows state · `[kit:<id>]` provider kit widget/dialog · `[ctl:<key>]` element · `[M##]` motion · `[asset:path]` capture image/file · `[UNKNOWN: …]`

## 1. Overview
FTP Server Credentials is a search-and-maintain screen for FTP server credential records (search existing credentials, create a new credential, edit an existing credential, and invalidate a credential). [asset:sections/02-pagebody.png]

Primary tasks:
- Search credentials by server name and view results in a grid. [flow:n1]
- Create a new credential record via the “Create New” dialog. [ctl:ftpServerCredentialAddButton, flow:n2]
- Edit an existing credential record by opening the row’s “Edit FTP Server Credentials” dialog. [flow:n1.2]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Page: full-width portal page; primary content lives in `#pageBody > main` and is centered with wide gutters; scroll is page-level. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---:|---|---|---|---|
| Shared shell (header) | `{pageHeader}` `div#pageHeader` | 0,0,1920,62 | reference.png | fixed header | bg `rgb(43, 58, 68)` | [ctl:pageBannerLogo] |
| Module bar | `div.menu` `{navigation-file-transfer-services}` | 0,62,1920,32 | reference.png | left module tab + screen title | bg `rgb(0, 238, 174)` | [ctl:activeModuleMenu] |
| Content area | `div#pageBody` `{pageBody}` → `form#SearchFTPServerCredentialsId` | 0,138.17,1920,398.83 | reference.png | stacked: actions row + criteria panel | white background | [asset:sections/02-pagebody.png] |
| Footer | `footer` (portal footer links + copyright/build) | 0,537,1920,119 | reference.png | centered link row + left/right meta | bg `rgb(43, 58, 68)` | [asset:sections/03-disclaimer-the-website-is-prov.png, ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy] |

### 2.1 Content area (`#pageBody > main`)
Contains:
- “Create New” action button aligned top-right above the criteria panel. [ctl:ftpServerCredentialAddButton, asset:sections/02-pagebody.png]
- “Search Criteria” collapsible panel (expanded by default on initial load). [asset:sections/02-pagebody.png]
- After Search, a “Search Results” panel appears below criteria, containing the grid and an “Include Invalids” toggle. [flow:n1, asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif` (14px, 400) | body text | [asset:sections/02-pagebody.png] |
| `--color-shell-bg` | `rgb(43, 58, 68)` | fixed header + footer background | [asset:sections/01-ftp-server-credentials.png] |
| `--color-module-bar` | `rgb(0, 238, 174)` | module/title bar background | [asset:sections/01-ftp-server-credentials.png] |
| `--color-panel-border` | `rgb(222, 226, 230)` | panel border | [asset:sections/02-pagebody.png] |
| `--color-link` | `rgb(0, 98, 255)` | link/button outlines | [asset:sections/02-pagebody.png] |
| `--radius-panel` | `10px` (header `10px 10px 0 0`) | criteria/results panels | [asset:sections/02-pagebody.png] |
| `--shadow-panel` | `rgba(0, 0, 0, 0.08) 0px 8px 10px 1px` | panel drop shadow | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---:|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header client logo | 117×57 | portal shell | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `FtpServerCredentialsPage`
  - `ProviderShell` *shared* — fixed header + module bar + footer (specified in home spec) [ctl:pageBannerLogo]
  - `PageTitleBar` — module label + “FTP Server Credentials” + page help icon [ctl:activeModuleMenuFirstItem]
  - `CreateNewButton` — opens Add dialog [ctl:ftpServerCredentialAddButton]
  - `SearchCriteriaPanel` — collapsible panel with Server Name field and actions [ctl:criteriaPanel]
  - `SearchResultsPanel` — shown after Search; includes “Include Invalids” and grid [kit:k1, flow:n1]
  - Dialogs (Kendo windows rendered by kit)
    - `AddFtpServerCredentialsDialog` [kit:d1]
    - `EditFtpServerCredentialsDialog` [kit:d2]
    - `AlertConfirmationDialog` [kit:d3]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `CreateNewButton` | none | none | `ftpServerCredentialAddButton` | [ctl:ftpServerCredentialAddButton] |
| `SearchCriteriaPanel` | none | `criteriaExpanded` | `criteriaPanel`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton` | [asset:sections/02-pagebody.png] |
| `SearchResultsPanel` | `results` | `includeInvalids` | `showInvalidFTPServerCredentialsCheckBox`, grid `k1` | [flow:n1, kit:k1] |
| `AddFtpServerCredentialsDialog` | none | dialog form state | kit dialog `d1` | [kit:d1] |
| `EditFtpServerCredentialsDialog` | `selectedRow` | dialog form state | kit dialog `d2` | [kit:d2] |
| `AlertConfirmationDialog` | `message` | none | kit dialog `d3` | [kit:d3] |

## 6. Fields & validation
### 6.1 Search criteria (page)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | `Server Name` | textbox | empty | no | max length 50 (typing stops at limit); regex `^([^;*^:~<>%])*$` | `Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on input / submit (exact timing unknown) | [ctl:FtpServerName, flow:n0] |

### 6.2 Search results controls
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `showInvalidFTPServerCredentialsCheckBox` | `Include Invalids` | checkbox | unchecked (in search results state) | no | none observed | — | — | [flow:n1, asset:kit/states/search.png] |

### 6.3 Dialog: Add FTP Server Credentials (`d1`)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | `Server Name` | textbox | empty | yes | max length 50; regex `^([^;*^:~<>%])*$` | required: `Server Name is a required field.`; invalid: `Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpDescription` | `Description` | textbox | empty | yes | max length 100; regex `^([^;*^:~<>%])*$` | required: `Description is a required field.`; invalid: `Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpTransferMode` | `Transfer Mode` | textbox | empty | yes | required | `Transfer Mode is a required field.` | on Save | [kit:d1] |
| `FtpServerIp` | `IP Server` | textbox | empty | yes | max length 15; regex `^([^;*^:~<>%])*$` | required: `IP Server is a required field.`; invalid: `IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpPort` | `Port` | textbox | `0` (as shown) | yes | must be a number; regex `^([^;*^:~<>%])*$` | required: `Port is a required field.`; number: `The field Port must be a number.`; invalid: `Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1, asset:kit/states/dialog-d1.png] |
| `FtpProxyAddress` | `Proxy Address` | textbox | empty | no | regex `^([^;*^:~<>%])*$` | invalid: `Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpProxyPort` | `Proxy Port` | textbox | empty | no | must be a number; regex `^([^;*^:~<>%])*$` | number: `The field Proxy Port must be a number.`; invalid: `Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpUser` | `Server User` | textbox | empty | yes | max length 50; regex `^([^;*^:~<>%])*$` | required: `Server User is a required field.`; invalid: `Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpPassword` | `Password` | textbox | empty | yes | regex `^([^;*^:~<>%])*$` | required: `Password is a required field.`; invalid: `Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `FtpPasswordConfirmation` | `Password Confirmation` | textbox | empty | yes | regex `^([^;*^:~<>%])*$` | required: `Password Confirmation is a required field.`; invalid: `Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `OperatorId` | `Last Modified User Id` | textbox | empty | yes | regex `^([^;*^:~<>%])*$` | required: `Last Modified User Id is a required field.`; invalid: `Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d1] |
| `CreationDate` | `Creation Date` | datepicker | empty | yes | must be a valid date `MM/DD/YYYY` | required: `Creation Date is a required field.`; invalid: `Creation Date must represent a valid date in the format 'MM/DD/YYYY'.` | on Save | [kit:k2, kit:d1] |
| `LastModifiedDate` | `Modified Date` | datepicker | empty | no | must be a valid date `MM/DD/YYYY` | invalid: `Modified Date must represent a valid date in the format 'MM/DD/YYYY'.` | on Save | [kit:k3, kit:d1] |
| `IsValid` | `Is Valid` | textbox | empty | no | — | — | — | [kit:d1] |
| `FtpServerId` | `FtpServerId` | textbox | empty | no | — | — | — | [kit:d1] |

### 6.4 Dialog: Edit FTP Server Credentials (`d2`)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | `Server Name` | textbox | populated | yes | max length 50; regex `^([^;*^:~<>%])*$` | required: `Server Name is a required field.`; invalid: `Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2, flow:n1.2] |
| `FtpDescription` | `Description` | textbox | populated | yes | max length 100 (typing stops at limit); regex `^([^;*^:~<>%])*$` | required: `Description is a required field.`; invalid: `Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2, flow:n1.2] |
| `FtpTransferMode` | `Transfer Mode` | textbox | populated | yes | max length 1 (typing stops at limit) | required: `Transfer Mode is a required field.` | on Save | [kit:d2, flow:n1.2] |
| `FtpServerIp` | `IP Server` | textbox | populated | yes | max length 15; regex `^([^;*^:~<>%])*$` | required: `IP Server is a required field.`; invalid: `IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2, flow:n1.2] |
| `FtpPort` | `Port` | textbox | populated | yes | must be a number; regex `^([^;*^:~<>%])*$` | required: `Port is a required field.`; number: `The field Port must be a number.`; invalid: `Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2] |
| `FtpProxyAddress` | `Proxy Address` | textbox | empty/optional | no | regex `^([^;*^:~<>%])*$` | invalid: `Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2] |
| `FtpProxyPort` | `Proxy Port` | textbox | empty/optional | no | must be a number; regex `^([^;*^:~<>%])*$` | number: `The field Proxy Port must be a number.`; invalid: `Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2] |
| `FtpUser` | `Server User` | textbox | populated | yes | max length 50; regex `^([^;*^:~<>%])*$` | required: `Server User is a required field.`; invalid: `Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2, flow:n1.2] |
| `FtpPassword` | `Password` | textbox | empty | no | regex `^([^;*^:~<>%])*$` | invalid: `Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2, asset:kit/states/dialog-d2.png] |
| `FtpPasswordConfirmation` | `Password Confirmation` | textbox | empty | no | regex `^([^;*^:~<>%])*$` | invalid: `Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2] |
| `OperatorId` | `Last Modified User Id` | textbox | populated (read-only display) | yes | regex `^([^;*^:~<>%])*$` | required: `Last Modified User Id is a required field.`; invalid: `Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Save | [kit:d2, asset:kit/states/dialog-d2.png] |
| `CreationDate` | `Creation Date` | datepicker | populated | yes | must be a valid date `MM/DD/YYYY` | required: `Creation Date is a required field.`; invalid: `Creation Date must represent a valid date in the format 'MM/DD/YYYY'.` | on Save | [kit:k6, kit:d2] |
| `LastModifiedDate` | `Modified Date` | datepicker | populated | no | must be a valid date `MM/DD/YYYY` | invalid: `Modified Date must represent a valid date in the format 'MM/DD/YYYY'.` | on Save | [kit:k7, kit:d2] |
| `IsValid` | `Is Valid` | textbox | populated (read-only display) | no | — | — | — | [kit:d2, asset:kit/states/dialog-d2.png] |
| `FtpServerId` | `FtpServerId` | textbox | populated | no | — | — | — | [kit:d2] |

### 6.5 Dialog: Alert Confirmation (`d3`)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| — | `Alert Confirmation` | dialog | — | — | — | `Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?` | when closing a dirty dialog | [kit:d3, asset:kit/states/dialog-d1-confirm.png] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `criteriaExpanded` | boolean | `true` | click chevron in Search Criteria header | shows/hides criteria panel body | [ctl:criteriaPanel, flow:n3] |
| `resultsVisible` | boolean | `false` | click `Search` | shows Search Results panel and grid | [flow:n1] |
| `selectedCredential` | object/null | null | single-click grid row | enables row context for double-click to open edit dialog | [kit:k1] |
| `includeInvalids` | boolean | `false` | toggle checkbox | affects results filter (exact behavior unknown) | [UNKNOWN: does toggling Include Invalids auto-refresh results or require Search?] |
| `openDialog` | enum | none | Create New / dblclick row / close actions | which dialog window is visible (`d1`, `d2`, `d3`) | [flow:n2, flow:n1.2, flow:n1.2.1] |

Hidden at load (facts §12):
None.

## 8. Behavior
### 8.0 States (flows)
- WHILE the screen is at rest THE SYSTEM SHALL show the Search Criteria panel expanded and no Search Results panel. [flow:n0]
- WHEN the user clicks Search THE SYSTEM SHALL enter the search-results state with the Search Results panel visible. [flow:n1]
- WHEN the user toggles the criteria chevron while results are visible THE SYSTEM SHALL enter the criteria-expanded state (criteria body visible). [flow:n1.1]
- WHEN the user double-clicks the first results row THE SYSTEM SHALL enter the credential-details state with the Edit dialog open. [flow:n1.2]
- WHEN the user clicks Invalidate in the Edit dialog THE SYSTEM SHALL enter the invalidate state with the Alert Confirmation dialog open. [flow:n1.2.1]
- WHEN the user clicks Create New THE SYSTEM SHALL enter the create-new state with the Add dialog open. [flow:n2]
- WHEN the user clicks the criteria chevron on the at-rest page THE SYSTEM SHALL enter the criteria-collapsed state (criteria body hidden). [flow:n3]
### 8.1 Search Criteria panel
- THE SYSTEM SHALL show the “Search Criteria” panel expanded on initial load. [flow:n0, asset:sections/02-pagebody.png]
- WHEN the user clicks the criteria chevron (`criteriaPanel`) THE SYSTEM SHALL toggle between expanded and collapsed criteria content. [flow:n3, ctl:criteriaPanel]
- WHEN the user types into `FtpServerName` THE SYSTEM SHALL stop accepting further input after 50 characters. [flow:n0]
- WHEN the user clicks `resetButton` (“Reset”) THE SYSTEM SHALL reset the search criteria fields to their default values. [ctl:resetButton, asset:sections/02-pagebody.png]
- WHEN the user clicks `cancelButton` (“Cancel”) THE SYSTEM SHALL navigate away from this screen. [ctl:cancelButton, flow:n1, UNKNOWN: destination URL of Cancel]

### 8.2 Search and results
- WHEN the user clicks `nextButton` (“Search”) THE SYSTEM SHALL send `GET /api/FileTransfer/GetFTPServerCredentials/` and show the Search Results panel. [ctl:nextButton, flow:n1]
- WHILE results are shown THE SYSTEM SHALL display a grid with the columns: Server Name, Description, IP Server, Server User, Creation Date, Is Valid. [kit:k1, asset:kit/states/search.png]
- WHILE results are shown THE SYSTEM SHALL show the “Include Invalids” checkbox in the Search Results panel header area. [flow:n1]
- WHEN the user double-clicks the first results row THE SYSTEM SHALL open the “Edit FTP Server Credentials” dialog. [flow:n1.2]

### 8.3 Create new
- WHEN the user clicks `ftpServerCredentialAddButton` (“Create New”) THE SYSTEM SHALL request `GET /FileTransfer/AddFTPServerCredentials/` and open the “Add FTP Server Credentials” dialog. [flow:n2, kit:d1]

### 8.4 Dialog: Add / Edit FTP Server Credentials
- WHEN the Add dialog is open THE SYSTEM SHALL show the dialog title “Add FTP Server Credentials” and action buttons “Cancel” and “Save”. [kit:d1, asset:kit/states/dialog-d1.png]
- WHEN the Edit dialog is open THE SYSTEM SHALL show the dialog title “Edit FTP Server Credentials”, action buttons “Cancel” and “Save”, and an “Invalidate” button. [kit:d2, asset:kit/states/dialog-d2.png]
- WHEN the user clicks the dialog close (X) with unsaved changes THE SYSTEM SHALL show the “Alert Confirmation” dialog with buttons “No” and “Yes”. [kit:d3, asset:kit/states/dialog-d1-confirm.png]
- IF the user clicks “No” on Alert Confirmation THEN THE SYSTEM SHALL return to the underlying dialog without closing it. [flow:n1.2.1, kit:d3]
- IF the user clicks “Yes” on Alert Confirmation THEN THE SYSTEM SHALL close the underlying dialog. [UNKNOWN: whether “Yes” also performs any other action]

### 8.5 Invalidate
- WHEN the user clicks “Invalidate” in the Edit dialog THE SYSTEM SHALL open the “Alert Confirmation” dialog. [flow:n1.2.1, kit:d3]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `cancelButton` | [UNKNOWN: destination when Cancel is clicked] | same tab (full page navigation) | [flow:n1] |
| top-nav links (shell) | various (Messages, External Links, Favorites, Contact Us, My Account, Logout) | same tab (shell behavior) | [ctl:link-messages] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Click `Search` (`nextButton`) | `GET /api/FileTransfer/GetFTPServerCredentials/` (no params observed) | `GET /api/FileTransfer/GetFTPServerCredentials/` | populates Search Results grid | [flow:n1, kit:k1] |
| Click `Create New` (`ftpServerCredentialAddButton`) | `GET /FileTransfer/AddFTPServerCredentials/` | screen service call to open the Add dialog | dialog `d1` opens | [flow:n2, kit:d1] |
| Double-click grid row | `POST /FileTransfer/AddFTPServerCredentials/` (dialog open) | screen service call to open the Edit dialog | dialog `d2` opens | [flow:n1.2, kit:d2] |
| Click `Save` in Edit dialog | would send `POST /api/FileTransfer/AddFTPServerCredentials/` with fields: `__RequestVerificationToken`, `FtpServerName`, `FtpDescription`, `FtpTransferMode`, `FtpServerIp`, `FtpPort`, `FtpProxyAddress`, `FtpProxyPort`, `FtpUser`, `FtpPassword`, `FtpPasswordConfirmation`, `FtpServerId`, `Metadata.ModifiedDate`, `Metadata.ModifiedId`, `Metadata.ModifiedTimestamp`, `OperatorId`, `CreationDate`, `LastModifiedDate`, `IsValid` | screen service call to save | [UNKNOWN: success response + resulting UI update] | [flow:n1.2] |

## 11. Accessibility
- The content area uses a `main` landmark containing a grouped region with labeled controls (e.g., textbox “Server Name”). [asset:capture/aria.yml]
- The criteria help icon is an image with accessible name “HELP”. [asset:capture/aria.yml]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v9/screens/ftp-server-credentials/spec/parity.spec.ts` uses them:
`pageBannerLogo`, `button`, `button-medicaid-management-solutions`, `button-2`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-8`, `activeModuleMenu`, `activeModuleMenuFirstItem`, `button-help`, `ftpServerCredentialAddButton`, `button-22`, `criteriaPanel`, `FtpServerNameHelp`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy` [ctl:pageBannerLogo]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v9/screens/ftp-server-credentials/spec/parity.spec.ts`
Required control keys (checker)

| key | what it is (this screen) | evidence |
|---|---|---|
| `pageBannerLogo` | portal shell client logo container (shared shell) | [ctl:pageBannerLogo] |
| `button` | header text container (shell) | [ctl:button] |
| `button-medicaid-management-solutions` | header title text container (shell) | [ctl:button-medicaid-management-solutions] |
| `button-2` | header menu list container (shell) | [ctl:button-2] |
| `AAGMenu.BroadcastMsg` | top nav “Messages” menu item (shell) | [ctl:AAGMenu.BroadcastMsg] |
| `link-messages` | top nav “Messages” link (shell) | [ctl:link-messages] |
| `AAGMenu.ExternalLinks` | top nav “External Links” menu item (shell) | [ctl:AAGMenu.ExternalLinks] |
| `link-external-links` | top nav “External Links” link (shell) | [ctl:link-external-links] |
| `AAGMenu.Favorites` | top nav “Favorites” menu item (shell) | [ctl:AAGMenu.Favorites] |
| `link-favorites` | top nav “Favorites” link (shell) | [ctl:link-favorites] |
| `AAGMenu.ContactUs` | top nav “Contact Us” menu item (shell) | [ctl:AAGMenu.ContactUs] |
| `link-contact-us` | top nav “Contact Us” link (shell) | [ctl:link-contact-us] |
| `AAGMenu.MyAccount` | top nav “My Account” menu item (shell) | [ctl:AAGMenu.MyAccount] |
| `AAGMenu.Logout` | top nav “Logout” menu item (shell) | [ctl:AAGMenu.Logout] |
| `link-logout` | top nav “Logout” link (shell) | [ctl:link-logout] |
| `button-main-menu-2` | hamburger menu button (shell) | [ctl:button-main-menu-2] |
| `button-8` | module tab wrapper (shell) | [ctl:button-8] |
| `activeModuleMenu` | module menu list (shell) | [ctl:activeModuleMenu] |
| `activeModuleMenuFirstItem` | module menu first item “File Transfer Services” (shell) | [ctl:activeModuleMenuFirstItem] |
| `button-help` | page-level Help (book) icon button | [ctl:button-help] |
| `ftpServerCredentialAddButton` | “Create New” button | [ctl:ftpServerCredentialAddButton] |
| `button-22` | Search Criteria panel header container | [ctl:button-22] |
| `criteriaPanel` | Search Criteria chevron button | [ctl:criteriaPanel] |
| `FtpServerNameHelp` | help/tooltip icon for Server Name label | [ctl:FtpServerNameHelp] |
| `FtpServerName` | Server Name textbox (criteria) | [ctl:FtpServerName] |
| `resetButton` | “Reset” button | [ctl:resetButton] |
| `cancelButton` | “Cancel” button | [ctl:cancelButton] |
| `nextButton` | “Search” button | [ctl:nextButton] |
| `button-disclaimer` | footer link “Disclaimer” | [ctl:button-disclaimer] |
| `button-website-requirements` | footer link “Website Requirements” | [ctl:button-website-requirements] |
| `button-privacy-policy` | footer link “Privacy Policy” | [ctl:button-privacy-policy] |
| `button-cookie-policy` | footer link “Cookie Policy” | [ctl:button-cookie-policy] |

## 13. Open questions
1. What is the destination URL (or action) of the page-level `Cancel` button? [UNKNOWN]
2. Does toggling “Include Invalids” automatically refresh the grid, or does it only take effect on the next Search? [UNKNOWN]
3. When confirming “Yes” on “Alert Confirmation”, does the screen only close the dialog or does it also trigger any server interaction? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include the CSS animation `autoFillEnd` (0s duration, 0s delay, 1 iteration; empty keyframes) applied to the Server Name input wrapper. [M01]

