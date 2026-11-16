# UI SPEC — fxfer-v7/ftp-server-credentials

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[aspx:…]` · `[css:selector]` · `[kit:kN]`/`[kit:dN]` kit widget or dialog · `[UNKNOWN: …]`

## 1. Overview
FTP Server Credentials search and maintenance screen for File Transfer Services. Supports searching existing FTP server credential records, adding a new record, and editing an existing record. [asset:sections/02-pagebody.png]

Primary tasks:
- Search FTP server credentials (optionally filtering by Server Name). [ctl:nextButton, kit:k1]
- Create a new FTP server credential record. [ctl:ftpServerCredentialAddButton, kit:d1]
- Edit an existing FTP server credential record from the results grid. [kit:d2]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-ftp-server-credentials.png]

Page: full-width portal layout; this screen’s content area is `div#pageBody.row` (scoped to `#pageBody > main`), with the main panel content on a white background. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Module bar | `div.menu` (`navigation-file-transfer-services`) | 0,62,1920,32 |  | single row | bg rgb(0, 238, 174) | [asset:sections/01-ftp-server-credentials.png] |
| Content area | `div#pageBody.row` (`pageBody`) | 0,138,1920,399 |  | column | white background | [asset:sections/02-pagebody.png] |
| Footer | `footer` | 0,537,1920,119 |  | footer links row + build info row | bg rgb(43, 58, 68) | [asset:sections/03-disclaimer-the-website-is-prov.png] |

### 2.1 Content area (`#pageBody > main`)
- Top-right action button: “Create New” button. [ctl:ftpServerCredentialAddButton, asset:sections/02-pagebody.png]
- Search Criteria panel (expanded by default) with a single text field and action buttons. [ctl:criteriaPanel, ctl:FtpServerName, asset:sections/02-pagebody.png]
- After a Search, a Search Results panel appears below Search Criteria containing a results grid and “Include Invalids” checkbox. [kit:k1, asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | Arial, "Helvetica Neue", Helvetica, sans-serif 14px/14px | default text | [asset:sections/02-pagebody.png] |
| `--color-text` | rgb(61, 61, 61) | body text | [asset:sections/02-pagebody.png] |
| `--color-text-invert` | rgb(255, 255, 255) | footer text | [asset:sections/03-disclaimer-the-website-is-prov.png] |
| `--color-shell-bg` | rgb(43, 58, 68) | shell header/footer | [asset:sections/03-disclaimer-the-website-is-prov.png] |
| `--color-module-bar` | rgb(0, 238, 174) | module bar | [asset:sections/01-ftp-server-credentials.png] |
| `--color-link` | rgb(0, 98, 255) | buttons/links | [asset:sections/02-pagebody.png] |
| `--color-required-asterisk` | rgb(203, 26, 198) | required `*` marker | [asset:sections/02-pagebody.png] |
| `--color-field-border` | rgb(90, 105, 120) | inputs | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shell header “Client Logo” | 117×57 | Tenant logo image | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `FtpServerCredentialsPage`
  - `ProviderShell` *shared* — header, menus, footer (out of scope for this spec) [asset:sections/01-ftp-server-credentials.png]
  - `ContentMain`
    - `CreateNewButtonRow` — “Create New” [ctl:ftpServerCredentialAddButton]
    - `SearchCriteriaPanel` — search filters + Search/Reset/Cancel [ctl:criteriaPanel, ctl:FtpServerName]
    - `SearchResultsPanel` — results grid + Include Invalids [kit:k1]
  - `AddFtpServerCredentialsDialog` (modal) [kit:d1]
  - `EditFtpServerCredentialsDialog` (modal) [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `CreateNewButtonRow` | none | none | `ftpServerCredentialAddButton` | [ctl:ftpServerCredentialAddButton, asset:sections/02-pagebody.png] |
| `SearchCriteriaPanel` | none | expanded/collapsed | `criteriaPanel`, `FtpServerName`, `FtpServerNameHelp`, `resetButton`, `cancelButton`, `nextButton` | [ctl:criteriaPanel, ctl:FtpServerName, asset:sections/02-pagebody.png] |
| `SearchResultsPanel` | `rows` (synthetic) | selected row, paging/sort/filter (kit) | grid widget `k1`, `showInvalidFTPServerCredentialsCheckBox` | [kit:k1, asset:kit/states/search.png] |
| `AddFtpServerCredentialsDialog` | none | form fields (kit) | dialog `d1`, date widgets `k2`/`k3` | [kit:d1, kit:k2, kit:k3, asset:kit/states/dialog-d1.png] |
| `EditFtpServerCredentialsDialog` | selected row | form fields (kit) | dialog `d2`, date widgets `k6`/`k7` | [kit:d2, kit:k6, kit:k7, asset:kit/states/dialog-d2.png] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | Server Name | text | empty | no | maxLength 50; regex pattern `^([^;*^:~<>%])*$` | Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on input / change | [ctl:FtpServerName, kit:k1] |
| `showInvalidFTPServerCredentialsCheckBox` | Include Invalids | checkbox | unchecked | no | None | None | n/a | [kit:k1, asset:kit/states/search.png] |

Dialog `d1` (Add FTP Server Credentials) fields:
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | Server Name | text | empty | yes | maxLength 50; regex disallow `;*^:~<>%` | Server Name is a required field. / Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpDescription` | Description | text | empty | yes | regex disallow `;*^:~<>%` | Description is a required field. / Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpTransferMode` | Transfer Mode | text (widget) | empty | yes | required | Transfer Mode is a required field. | on Save | [kit:d1] |
| `FtpServerIp` | IP Server | text | empty | yes | regex disallow `;*^:~<>%` | IP Server is a required field. / IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpPort` | Port | number | 0 | yes | must be a number; regex disallow `;*^:~<>%` | Port is a required field. / The field Port must be a number. / Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpProxyAddress` | Proxy Address | text | empty | no | regex disallow `;*^:~<>%` | Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpProxyPort` | Proxy Port | number | empty | no | must be a number; regex disallow `;*^:~<>%` | The field Proxy Port must be a number. / Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpUser` | Server User | text | empty | yes | regex disallow `;*^:~<>%` | Server User is a required field. / Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpPassword` | Password | password | empty | yes | regex disallow `;*^:~<>%` | Password is a required field. / Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `FtpPasswordConfirmation` | Password Confirmation | password | empty | yes | regex disallow `;*^:~<>%` | Password Confirmation is a required field. / Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `OperatorId` | Last Modified User Id | text | empty | yes | regex disallow `;*^:~<>%` | Last Modified User Id is a required field. / Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d1] |
| `CreationDate` | Creation Date | datepicker | empty | yes | must be a valid date in `MM/DD/YYYY` | Creation Date is a required field. / Creation Date must represent a valid date in the format 'MM/DD/YYYY'. | on Save | [kit:d1, kit:k2] |
| `LastModifiedDate` | Modified Date | datepicker | empty | no | must be a valid date in `MM/DD/YYYY` | Modified Date must represent a valid date in the format 'MM/DD/YYYY'. | on Save | [kit:d1, kit:k3] |

Dialog `d2` (Edit FTP Server Credentials) fields:
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | Server Name | text | populated | yes | regex disallow `;*^:~<>%` | Server Name is a required field. / Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpDescription` | Description | text | populated | yes | regex disallow `;*^:~<>%` | Description is a required field. / Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpTransferMode` | Transfer Mode | text (widget) | populated | yes | required | Transfer Mode is a required field. | on Save | [kit:d2] |
| `FtpServerIp` | IP Server | text | populated | yes | regex disallow `;*^:~<>%` | IP Server is a required field. / IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpPort` | Port | number | populated | yes | must be a number; regex disallow `;*^:~<>%` | Port is a required field. / The field Port must be a number. / Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpProxyAddress` | Proxy Address | text | empty | no | regex disallow `;*^:~<>%` | Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpProxyPort` | Proxy Port | number | empty | no | must be a number; regex disallow `;*^:~<>%` | The field Proxy Port must be a number. / Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpUser` | Server User | text | populated | yes | regex disallow `;*^:~<>%` | Server User is a required field. / Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpPassword` | Password | password | empty | no | regex disallow `;*^:~<>%` | Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `FtpPasswordConfirmation` | Password Confirmation | password | empty | no | regex disallow `;*^:~<>%` | Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `OperatorId` | Last Modified User Id | text | populated | yes | regex disallow `;*^:~<>%` | Last Modified User Id is a required field. / Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on Save | [kit:d2] |
| `CreationDate` | Creation Date | datepicker | populated | yes | must be a valid date in `MM/DD/YYYY` | Creation Date is a required field. / Creation Date must represent a valid date in the format 'MM/DD/YYYY'. | on Save | [kit:d2, kit:k6] |
| `LastModifiedDate` | Modified Date | datepicker | populated | no | must be a valid date in `MM/DD/YYYY` | Modified Date must represent a valid date in the format 'MM/DD/YYYY'. | on Save | [kit:d2, kit:k7] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `searchCriteriaExpanded` | ui | true | toggle via criteria header chevron | Search Criteria body visible/hidden | [ctl:criteriaPanel, asset:sections/02-pagebody.png] |
| `resultsVisible` | ui | false | Search action | Search Results panel appears with grid | [ctl:nextButton, kit:k1, asset:kit/states/search.png] |
| `addDialogOpen` | modal | false | Create New | Add dialog shown | [ctl:ftpServerCredentialAddButton, kit:d1] |
| `editDialogOpen` | modal | false | double-click a grid row | Edit dialog shown | [kit:d2] |
| `closeConfirmOpen` | modal | false | close dialog with edits | Alert Confirmation dialog shown | [kit:d1, kit:d2, asset:kit/states/dialog-d1-confirm.png] |

Hidden at load (facts §12):
None. [asset:sections/02-pagebody.png]

## 8. Behavior
### 8.1 Search criteria
- THE SYSTEM SHALL show the Search Criteria panel expanded by default. [ctl:criteriaPanel, asset:sections/02-pagebody.png]
- WHEN the user clicks the Search Criteria panel’s chevron control THE SYSTEM SHALL toggle the panel between expanded and collapsed. [ctl:criteriaPanel, kit:k1]
- WHEN the user enters text into “Server Name” THE SYSTEM SHALL accept up to 50 characters and reject the characters `; * ^ : ~ < > %`. [ctl:FtpServerName, kit:k1]

### 8.2 Search
- WHEN the user clicks “Search” THE SYSTEM SHALL call `GET /api/FileTransfer/GetFTPServerCredentials/` and show the Search Results panel with a grid listing rows. [ctl:nextButton, kit:k1]
- WHEN the user clicks “Search” with the form as it loads (no criteria) THE SYSTEM SHALL list 4 rows (synthetic in the rebuild). [kit:k1, asset:kit/states/search.png]

### 8.3 Create and edit dialogs
- WHEN the user clicks “Create New” THE SYSTEM SHALL open the modal dialog titled “Add FTP Server Credentials”. [ctl:ftpServerCredentialAddButton, kit:d1]
- WHEN the user double-clicks the first grid row THE SYSTEM SHALL open the modal dialog titled “Edit FTP Server Credentials”. [kit:k1, kit:d2]
- IF the user attempts to close either dialog after editing any field THEN THE SYSTEM SHALL show an “Alert Confirmation” dialog with the message “Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?” and buttons “No” and “Yes”. [kit:d1, kit:d2, asset:kit/states/dialog-d1-confirm.png]
- WHEN the user clicks “No” in the close confirmation THEN THE SYSTEM SHALL keep the original dialog open. [kit:d1, kit:d2]
- WHEN the user clicks “Yes” in the close confirmation THEN THE SYSTEM SHALL close the original dialog. [kit:d1, kit:d2]
- WHEN the user clicks “Save” in the Add dialog with required fields empty THEN THE SYSTEM SHALL show 7 field validation messages and send no request. [kit:d1]
- WHEN the user clicks “Save” in the Edit dialog with required fields empty THEN THE SYSTEM SHALL show 0 field validation messages and send no request. [kit:d2]

### 8.4 Scroll behavior (facts §16: cite every [S##])
None. [asset:sections/02-pagebody.png]

### 8.5 Media (facts §17: cite every [V##])
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| Shell header and menu links | various portal pages | same tab | [ctl:link-logout] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/GetFTPServerCredentials/` (no params observed) | service stub for search endpoint | 4 row(s) rendered in results grid | [kit:k1] |

## 11. Accessibility
- Search Criteria “Server Name” uses a visible label and a focusable text box; the help icon is a focusable button with tooltip text “Server Name”. [ctl:FtpServerName, ctl:FtpServerNameHelp]
- Action buttons (“Create New”, “Reset”, “Cancel”, “Search”) are keyboard focusable. [ctl:ftpServerCredentialAddButton, ctl:resetButton, ctl:cancelButton, ctl:nextButton]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v7/screens/ftp-server-credentials/spec/parity.spec.ts` uses them:

- `pageBannerLogo` [ctl:pageBannerLogo]
- `button` [ctl:button]
- `button-medicaid-management-solutions` [ctl:button-medicaid-management-solutions]
- `button-2` [ctl:button-2]
- `AAGMenu.BroadcastMsg` [ctl:AAGMenu.BroadcastMsg]
- `link-messages` [ctl:link-messages]
- `AAGMenu.ExternalLinks` [ctl:AAGMenu.ExternalLinks]
- `link-external-links` [ctl:link-external-links]
- `AAGMenu.Favorites` [ctl:AAGMenu.Favorites]
- `link-favorites` [ctl:link-favorites]
- `AAGMenu.ContactUs` [ctl:AAGMenu.ContactUs]
- `link-contact-us` [ctl:link-contact-us]
- `AAGMenu.MyAccount` [ctl:AAGMenu.MyAccount]
- `AAGMenu.Logout` [ctl:AAGMenu.Logout]
- `link-logout` [ctl:link-logout]
- `button-main-menu-2` [ctl:button-main-menu-2]
- `button-8` [ctl:button-8]
- `activeModuleMenu` [ctl:activeModuleMenu]
- `activeModuleMenuFirstItem` [ctl:activeModuleMenuFirstItem]
- `button-help` [ctl:button-help]
- `ftpServerCredentialAddButton` [ctl:ftpServerCredentialAddButton]
- `button-22` [ctl:button-22]
- `criteriaPanel` [ctl:criteriaPanel]
- `FtpServerNameHelp` [ctl:FtpServerNameHelp]
- `FtpServerName` [ctl:FtpServerName]
- `resetButton` [ctl:resetButton]
- `cancelButton` [ctl:cancelButton]
- `nextButton` [ctl:nextButton]
- `button-disclaimer` [ctl:button-disclaimer]
- `button-website-requirements` [ctl:button-website-requirements]
- `button-privacy-policy` [ctl:button-privacy-policy]
- `button-cookie-policy` [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v7/screens/ftp-server-credentials/spec/parity.spec.ts`

## 13. Open questions
1. What does the “Cancel” button do on this screen (navigate away, clear form, close module, etc.)? [UNKNOWN]
2. What does “Include Invalids” change in the Search Results grid (does it re-run Search, filter client-side, or only affect subsequent searches)? [UNKNOWN]
3. What does the dialog “Save” action do on success (toast/banner message, dialog closes, grid refresh behavior)? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL apply CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1, easing ease) to the Server Name input wrapper when the browser autofill completes. [M01]
