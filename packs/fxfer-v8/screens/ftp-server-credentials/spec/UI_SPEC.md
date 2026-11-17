# UI SPEC — fxfer-v8/ftp-server-credentials

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jQuery 3.7.1 + Kendo UI for jQuery (Provider portal) · target React 19
> Evidence tags: `[ctl:key]` element · `[kit:<id>]` kit widget/dialog · `[asset:path]` capture/state image · `[css:selector]` CSS rule · `[UNKNOWN: …]`

## 1. Overview
This screen lets a Provider portal user search for existing FTP Server Credentials and open dialogs to create a new credential record or edit an existing one. [asset:kit/states/search.png]

Primary tasks:
- Search credentials by “Server Name”. [ctl:FtpServerName, ctl:nextButton]
- Create a new credential record. [ctl:ftpServerCredentialAddButton, kit:d1]
- Review and edit an existing record from the results grid. [kit:k1, kit:d2]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:kit/states/search.png]

Page: fluid (full-width), white background; main content is a centered column inside `#pageBody > main`. [css:body, asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Module title bar | `div.menu` {navigation-file-transfer-services} | 0,62,1920,32 | section 01 | horizontal bar | bg rgb(0, 238, 174) | [asset:sections/01-ftp-server-credentials.png] |
| Main content | `#pageBody > main` | 0,138,1920,399 | section 02 | vertical stack | contains Create New + panels | [asset:sections/02-pagebody.png] |
| Footer | `footer` | 0,537,1920,119 | section 03 | footer links + build line | dark subfooter + white links | [asset:sections/03-disclaimer-the-website-is-prov.png] |

### 2.1 Module title bar
- Left label text: “FILE TRANSFER SERVICES”. [asset:sections/01-ftp-server-credentials.png]
- Screen title text: “FTP Server Credentials”. [asset:sections/01-ftp-server-credentials.png]
- Active module menu (shell): “FILE TRANSFER SERVICES” tab/list elements. [ctl:activeModuleMenu, ctl:activeModuleMenuFirstItem, ctl:button-8]
- Right page-level help icon (book-in-circle). [ctl:button-help, asset:sections/01-ftp-server-credentials.png]

### 2.2 Main content
Default (before Search):
- Top-right action button: “Create New”. [ctl:ftpServerCredentialAddButton, asset:sections/02-pagebody.png]
- “Search Criteria” panel is expanded and shows one text field (“Server Name”) plus action buttons. [ctl:criteriaPanel, ctl:FtpServerName, ctl:resetButton, ctl:cancelButton, ctl:nextButton, asset:sections/02-pagebody.png]
- “Server Name” label includes a help icon. [ctl:FtpServerNameHelp, asset:sections/02-pagebody.png]
- Search Criteria panel header includes a focusable tools area (contains the collapse control). [ctl:button-22, ctl:criteriaPanel, asset:sections/02-pagebody.png]

After Search (recorded state):
- “Search Criteria” panel is collapsed to its header row. [ctl:criteriaPanel, kit:k1, asset:kit/states/search.png]
- A “Search Results” panel appears below, containing a Kendo grid and pager. [kit:k1, asset:kit/states/search.png]

### 2.3 Footer
- Subfooter links (centered): “Disclaimer”, “Website Requirements”, “Privacy Policy”, “Cookie Policy”. [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy, asset:sections/03-disclaimer-the-website-is-prov.png]
- Copyright/build line includes “© 2026 Gainwell Technologies. All rights reserved.” and the server/build string. [ctl:footerBuild, asset:sections/03-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-base | Arial, "Helvetica Neue", Helvetica, sans-serif | default body text | [css:body] |
| --font-size-base | 14px | most UI text | [css:body] |
| --color-text | rgb(61, 61, 61) | default text color | [css:body] |
| --color-page-bg | rgb(255, 255, 255) | page background | [css:body] |
| --color-modulebar-bg | rgb(0, 238, 174) | module title bar | [asset:sections/01-ftp-server-credentials.png] |
| --color-panel-hdr-bg | rgb(250, 250, 250) | panel headers | [asset:sections/02-pagebody.png] |
| --color-panel-border | rgb(222, 226, 230) | panel borders | [asset:sections/02-pagebody.png] |
| --color-link-invert | rgb(255, 255, 255) | subfooter link text | [asset:sections/03-disclaimer-the-website-is-prov.png] |
| --color-action | rgb(0, 98, 255) | outline buttons (“Create New”, “Reset”, “Cancel”) | [asset:sections/02-pagebody.png] |
| --color-required | rgb(203, 26, 198) | required asterisk indicator | [asset:sections/02-pagebody.png] |

## 4. Assets
None unique to this screen’s content area; the shared shell assets are specified on `fxfer-v8/home`. [asset:sections/02-pagebody.png]

## 5. Components
React component tree (shared components marked *shared*):
- `FtpServerCredentialsPage`
  - `PortalShell` *shared* — fixed header + side menu + footer (see home spec). [ctl:pageBannerLogo]
  - `ModuleTitleBar` *shared* — “FILE TRANSFER SERVICES” + “FTP Server Credentials” + help icon. [ctl:button-help]
  - `CreateNewButtonRow` — “Create New” action. [ctl:ftpServerCredentialAddButton]
  - `SearchCriteriaPanel` — criteria form (collapsible). [ctl:criteriaPanel]
  - `SearchResultsPanel` — results grid + pager (after Search). [kit:k1]
  - `AddFtpServerCredentialsDialog` — modal dialog `d1`. [kit:d1]
  - `EditFtpServerCredentialsDialog` — modal dialog `d2`. [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| PortalShell (*shared*) | none | responsive header/menu state | pageBannerLogo, button, button-medicaid-management-solutions, button-2, AAGMenu.BroadcastMsg, link-messages, AAGMenu.ExternalLinks, link-external-links, AAGMenu.Favorites, link-favorites, AAGMenu.ContactUs, link-contact-us, AAGMenu.MyAccount, link-my-account, AAGMenu.Logout, link-logout, button-main-menu-2, activeModuleMenu, activeModuleMenuFirstItem, button-disclaimer, button-website-requirements, button-privacy-policy, button-cookie-policy | [ctl:pageBannerLogo, ctl:button, ctl:button-medicaid-management-solutions, ctl:button-2, ctl:AAGMenu.BroadcastMsg, ctl:link-messages, ctl:AAGMenu.ExternalLinks, ctl:link-external-links, ctl:AAGMenu.Favorites, ctl:link-favorites, ctl:AAGMenu.ContactUs, ctl:link-contact-us, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-logout, ctl:button-main-menu-2, ctl:activeModuleMenu, ctl:activeModuleMenuFirstItem] |
| SearchCriteriaPanel | initial values | isCollapsed | criteriaPanel, button-22, FtpServerName, FtpServerNameHelp, resetButton, cancelButton, nextButton | [ctl:criteriaPanel, ctl:button-22, ctl:FtpServerName, ctl:FtpServerNameHelp] |
| SearchResultsPanel | rows (synthetic in kit) | selectedRow | showInvalidFTPServerCredentialsCheckBox, k1 grid | [kit:k1, ctl:showInvalidFTPServerCredentialsCheckBox] |
| AddFtpServerCredentialsDialog | none | form state / dirty flag | dialog d1 | [kit:d1, asset:kit/states/dialog-d1.png] |
| EditFtpServerCredentialsDialog | row | form state / dirty flag | dialog d2 | [kit:d2, asset:kit/states/dialog-d2.png] |

## 6. Fields & validation
### 6.1 Search criteria fields
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| FtpServerName | Server Name | text | empty | no | max length 50; disallow characters `; * ^ : ~ < > %` | “Server Name has a maximum length of 50 characters.”; “Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit / change (unobtrusive validation) | [ctl:FtpServerName, kit:d1] |
| showInvalidFTPServerCredentialsCheckBox | Include Invalids | checkbox | unchecked in base state (not visible until results) | no | [UNKNOWN: validation/rules for Include Invalids] | [UNKNOWN] | [UNKNOWN] | [ctl:showInvalidFTPServerCredentialsCheckBox, asset:kit/states/search.png] |

### 6.2 Dialog `d1` — Add FTP Server Credentials
(Kit dialog and field contracts are authoritative.) [kit:d1]

| key / id | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| Edit_FtpServerName | Server Name | text | empty | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “Server Name is a required field.”; “Server Name has a maximum length of 50 characters.”; “Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpDescription | Description | text | empty | yes | max length 250; disallow characters `; * ^ : ~ < > %` | “Description is a required field.”; “Description has a maximum length of 250 characters.”; “Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpTransferMode | Transfer Mode | text | empty | yes | required | “Transfer Mode is a required field.” | on Save | [kit:d1] |
| Edit_FtpServerIp | IP Server | text | empty | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “IP Server is a required field.”; “IP Server has a maximum length of 50 characters.”; “IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpPort | Port | text | `0` (shown) | yes | required; numeric; disallow characters `; * ^ : ~ < > %` | “Port is a required field.”; “The field Port must be a number.”; “Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1, asset:kit/states/dialog-d1.png] |
| Edit_FtpProxyAddress | Proxy Address | text | empty | no | max length 50; disallow characters `; * ^ : ~ < > %` | “Proxy Address has a maximum length of 50 characters.”; “Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpProxyPort | Proxy Port | text | empty | no | numeric; disallow characters `; * ^ : ~ < > %` | “The field Proxy Port must be a number.”; “Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpUser | Server User | text | empty | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “Server User is a required field.”; “Server User has a maximum length of 50 characters.”; “Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpPassword | Password | password | empty | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “Password is a required field.”; “Password has a maximum length of 50 characters.”; “Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| Edit_FtpPasswordConfirmation | Password Confirmation | password | empty | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “Password Confirmation is a required field.”; “Password Confirmation has a maximum length of 50 characters.”; “Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| View_OperatorId | Last Modified User Id | text (read-only) | 01/01/1900 / or populated | yes | disallow characters `; * ^ : ~ < > %` | “Last Modified User Id is a required field.”; “Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| View_CreationDate | Creation Date | datepicker (read-only) | 01/01/1900 | yes | required; date format MM/DD/YYYY; min/max range 01/01/1900–12/31/9999 | “Creation Date is a required field.”; “Creation Date must represent a valid date in the format 'MM/DD/YYYY'.”; “Creation Date must be within 01/01/1900 and 12/31/9999.” | on Save | [kit:k2, kit:d1] |
| View_LastModifiedDate | Modified Date | datepicker (read-only) | empty | no | date format MM/DD/YYYY | “Modified Date must represent a valid date in the format 'MM/DD/YYYY'.” | on Save | [kit:k3, kit:d1] |
| View_IsValid | Is Valid | text (read-only) | empty | no | [UNKNOWN: value format for Is Valid in Add dialog] | [UNKNOWN] | [UNKNOWN] | [kit:d1] |

### 6.3 Dialog `d2` — Edit FTP Server Credentials
| key / id | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| Edit_FtpServerName | Server Name | text | populated from row | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “Server Name is a required field.”; “Server Name has a maximum length of 50 characters.”; “Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2, asset:kit/states/dialog-d2.png] |
| Edit_FtpDescription | Description | text | populated from row | yes | max length 250; disallow characters `; * ^ : ~ < > %` | “Description is a required field.”; “Description has a maximum length of 250 characters.”; “Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpTransferMode | Transfer Mode | text | populated from row | yes | required | “Transfer Mode is a required field.” | on Save | [kit:d2] |
| Edit_FtpServerIp | IP Server | text | populated from row | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “IP Server is a required field.”; “IP Server has a maximum length of 50 characters.”; “IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpPort | Port | text | populated from row | yes | required; numeric; disallow characters `; * ^ : ~ < > %` | “Port is a required field.”; “The field Port must be a number.”; “Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpProxyAddress | Proxy Address | text | populated from row | no | max length 50; disallow characters `; * ^ : ~ < > %` | “Proxy Address has a maximum length of 50 characters.”; “Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpProxyPort | Proxy Port | text | populated from row | no | numeric; disallow characters `; * ^ : ~ < > %` | “The field Proxy Port must be a number.”; “Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpUser | Server User | text | populated from row | yes | max length 50; disallow characters `; * ^ : ~ < > %` | “Server User is a required field.”; “Server User has a maximum length of 50 characters.”; “Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpPassword | Password | password | empty | no | max length 50; disallow characters `; * ^ : ~ < > %` | “Password has a maximum length of 50 characters.”; “Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| Edit_FtpPasswordConfirmation | Password Confirmation | password | empty | no | max length 50; disallow characters `; * ^ : ~ < > %` | “Password Confirmation has a maximum length of 50 characters.”; “Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2] |
| View_OperatorId | Last Modified User Id | text (read-only) | populated | yes | disallow characters `; * ^ : ~ < > %` | “Last Modified User Id is a required field.”; “Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d2, asset:kit/states/dialog-d2.png] |
| View_CreationDate | Creation Date | datepicker (read-only) | populated | yes | required; date format MM/DD/YYYY; min/max range 01/01/1900–12/31/9999 | “Creation Date is a required field.”; “Creation Date must represent a valid date in the format 'MM/DD/YYYY'.”; “Creation Date must be within 01/01/1900 and 12/31/9999.” | on Save | [kit:k6, kit:d2] |
| View_LastModifiedDate | Modified Date | datepicker (read-only) | populated | no | date format MM/DD/YYYY | “Modified Date must represent a valid date in the format 'MM/DD/YYYY'.” | on Save | [kit:k7, kit:d2] |
| View_IsValid | Is Valid | text (read-only) | populated (e.g. True) | no | [UNKNOWN: value mapping for Is Valid (True/False vs Yes/No)] | [UNKNOWN] | [UNKNOWN] | [kit:d2, asset:kit/states/dialog-d2.png] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| Search criteria expanded | boolean | true | criteriaPanel chevron toggle | shows/hides the criteria form body | [ctl:criteriaPanel, asset:sections/02-pagebody.png] |
| Results shown | boolean | false | Search action (`nextButton`) | shows “Search Results” panel and grid | [ctl:nextButton, kit:k1, asset:kit/states/search.png] |
| Add dialog open | enum | closed | Create New button | shows dialog `d1` modal | [ctl:ftpServerCredentialAddButton, kit:d1] |
| Edit dialog open | enum | closed | grid row double-click | shows dialog `d2` modal | [kit:k1, kit:d2] |

Hidden at load (facts §12):
None. [asset:sections/02-pagebody.png]

## 8. Behavior
### 8.1 SearchCriteriaPanel
- THE SYSTEM SHALL show a “Search Criteria” panel with a chevron control at the right of the header (expanded state shows an “up” chevron). [ctl:criteriaPanel, asset:sections/02-pagebody.png]
- WHEN the user activates the Search Criteria chevron THE SYSTEM SHALL toggle the criteria body expanded/collapsed. [ctl:criteriaPanel, asset:kit/states/search.png]
- WHEN the user clicks “Reset” THE SYSTEM SHALL reset the Search Criteria inputs to their default values. [ctl:resetButton, asset:sections/02-pagebody.png]
- WHEN the user clicks “Search” THE SYSTEM SHALL display the Search Results panel and populate the grid with 4 synthetic rows (as captured). [ctl:nextButton, kit:k1, asset:kit/states/search.png]
- WHEN Search completes THE SYSTEM SHALL collapse the Search Criteria panel (captured behavior). [ctl:nextButton, kit:k1, asset:kit/states/search.png]
- WHEN the user clicks “Cancel” THE SYSTEM SHALL perform the legacy Cancel behavior. [ctl:cancelButton, UNKNOWN: what Cancel does on this page (navigate away vs clear vs no-op)]

### 8.2 SearchResultsPanel (Kendo grid)
- THE SYSTEM SHALL show a “Search Results” panel containing a Kendo grid with columns: Server Name, Description, IP Server, Server User, Creation Date, Is Valid. [kit:k1, asset:kit/states/search.png]
- THE SYSTEM SHALL show a pager with navigation buttons, current page indicator, a page-size dropdown (default 10), and an item count (“1-4 of 4 Items”). [kit:k1, asset:kit/states/search.png]
- WHEN the user double-clicks the first grid row THE SYSTEM SHALL open the “Edit FTP Server Credentials” dialog (`d2`). [kit:k1, kit:d2]

### 8.3 Dialog `d1` (Add FTP Server Credentials)
- WHEN the user clicks “Create New” THE SYSTEM SHALL open dialog `d1` titled “Add FTP Server Credentials”. [ctl:ftpServerCredentialAddButton, kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL autofocus the “Server Name” field in dialog `d1`. [kit:d1]
- IF the user clicks the window close “X” while the form has unsaved edits THEN THE SYSTEM SHALL show a confirmation dialog titled “Alert Confirmation” with message “Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?” and buttons “No” and “Yes”. [kit:d1, asset:kit/states/dialog-d1-confirm.png]
- WHEN the user chooses “No” in the confirmation dialog THEN THE SYSTEM SHALL keep dialog `d1` open. [kit:d1, asset:kit/states/dialog-d1-confirm.png]
- WHEN the user chooses “Yes” in the confirmation dialog THEN THE SYSTEM SHALL close dialog `d1`. [kit:d1, asset:kit/states/dialog-d1-confirm.png]

### 8.4 Dialog `d2` (Edit FTP Server Credentials)
- WHEN the user opens dialog `d2` THE SYSTEM SHALL show the title “Edit FTP Server Credentials” and populate the form fields from the selected grid row. [kit:d2, asset:kit/states/dialog-d2.png]
- THE SYSTEM SHALL show an “Audit Details” section with read-only values for Last Modified User Id, Creation Date, Modified Date, Is Valid. [kit:d2, asset:kit/states/dialog-d2.png]
- WHEN the user clicks “Invalidate” THE SYSTEM SHALL perform the legacy invalidate behavior. [kit:d2, UNKNOWN: what Invalidate changes in the UI and whether it saves immediately]

### 8.5 Scroll behavior (facts §16: cite every [S##])
None. [asset:sections/02-pagebody.png]

### 8.6 Media (facts §17: cite every [V##])
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| None | - | - | [asset:sections/02-pagebody.png] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/GetFTPServerCredentials/` (params not captured) | Provide a stub/service returning 4 rows matching grid fields | populates grid `k1` | [kit:k1] |
| Open Add dialog | GET `/FileTransfer/AddFTPServerCredentials/` | Provide a stub to open `d1` | opens dialog `d1` | [kit:d1] |
| Save (Edit dialog capture) | POST `/FileTransfer/AddFTPServerCredentials/` with form fields incl. FtpServerId, FtpServerName, FtpServerIp, FtpTransferMode, FtpUser, FtpPassword*, FtpPasswordConfirmation*, FtpDescription, FtpPort, FtpProxyAddress, FtpProxyPort, LastModifiedDate, CreationDate, IsValid, OperatorId, plus Editor[...] and Metadata[...] | Provide a stub/service that accepts the same fields | [UNKNOWN: success UX (toast/banner/close dialog/refresh grid) not captured] | [kit:d2] |

## 11. Accessibility
- Search Criteria panel header and chevron are keyboard focusable; focus styles come from the shared portal CSS (see home spec). [ctl:criteriaPanel]
- Required fields are indicated with a colored asterisk next to the label. [asset:kit/states/dialog-d1.png]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v8/screens/ftp-server-credentials/spec/parity.spec.ts` uses them:
`pageBannerLogo`, `button`, `button-medicaid-management-solutions`, `button-2`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `link-my-account`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-8`, `activeModuleMenu`, `activeModuleMenuFirstItem`, `button-22`, `ftpServerCredentialAddButton`, `criteriaPanel`, `FtpServerNameHelp`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton`, `showInvalidFTPServerCredentialsCheckBox`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`. [ctl:ftpServerCredentialAddButton]

Shell required controls (shared header links): [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links] [ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v8/screens/ftp-server-credentials/spec/parity.spec.ts`.

## 13. Open questions
1. What is the legacy “Cancel” behavior on this page (navigate away, clear, close panel)? — answer from: product owner or legacy script/route docs. [UNKNOWN]
2. What does “Include Invalids” change in the Search Results (grid filter, server param)? — answer from: backend contract or observing live behavior. [UNKNOWN]
3. What happens on successful Save in Add/Edit dialogs (dialog closes? grid refresh? message text)? — answer from: backend contract or observing live behavior. [UNKNOWN]
4. What is the exact behavior of “Invalidate” in the Edit dialog (immediate save vs staged, confirmation, resulting Is Valid value)? — answer from: legacy script/backend. [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include the page’s recorded CSS animation entry `autoFillEnd` (no visible motion; duration 0s) on the `#FtpServerName_parent …` input wrapper as captured. [M01]

