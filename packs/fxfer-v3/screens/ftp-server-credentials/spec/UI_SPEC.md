# UI SPEC — fxfer-v3/ftp-server-credentials

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[kit:<id>]` kit widget/dialog/action · `[ctl:<key>]` element · `[M##]` motion · `[asset:path]` screenshot/capture file · `[UNKNOWN: …]`

## 1. Overview
This screen lets portal users search FTP Server Credentials and open dialogs to add or edit a credential record. [asset:sections/02-pagebody.png]

Primary tasks:
- Search by Server Name and view results in the grid. [ctl:FtpServerName, kit:k1, asset:kit/states/search.png]
- Create a new FTP Server Credential record. [ctl:ftpServerCredentialAddButton, kit:d1, asset:kit/states/dialog-d1.png]
- Edit an existing FTP Server Credential record from the results grid. [kit:k1, kit:d2, asset:kit/states/dialog-d2.png]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Page content scope: `#pageBody > main` (the content area below the module tab bar). [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Page body (content) | `#pageBody` | 0,139,1920,400 | sections/02 | normal flow | background rgb(255,255,255) | [asset:sections/02-pagebody.png] |
| Help icon | `button-help` | 1844.25,109,43.75,35 | kit/states/search | positioned icon button | Font Awesome book icon in blue circle | [ctl:button-help, asset:kit/states/search.png] |
| Primary action | `ftpServerCredentialAddButton` | 1743.52,138.5,146.48,38 | sections/02, kit/states/search | top-right button | white background, 1px solid rgb(0,98,255), radius 4px | [ctl:ftpServerCredentialAddButton, asset:sections/02-pagebody.png] |

### 2.1 Search Criteria panel
A bordered panel titled “Search Criteria” with a chevron toggle at the right edge of the header. [asset:sections/02-pagebody.png]

- Header text: “Search Criteria”. [asset:sections/02-pagebody.png]
- Right-side helper text: “Required Fields ( * )” (asterisk rendered in magenta). [asset:sections/02-pagebody.png]
- Body contains the Server Name field and the Reset/Cancel/Search actions. [asset:sections/02-pagebody.png]

### 2.2 Search Results panel (revealed after Search)
After Search, a second panel titled “Search Results” appears below Search Criteria, containing the Include Invalids checkbox and the results grid. [kit:k1, ctl:showInvalidFTPServerCredentialsCheckBox, asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-body | Arial, "Helvetica Neue", Helvetica, sans-serif 14px | body text | [asset:sections/02-pagebody.png] |
| --color-text | rgb(61, 61, 61) | labels/body | [asset:sections/02-pagebody.png] |
| --color-panel-border | rgb(222, 226, 230) | panel border | [asset:sections/02-pagebody.png] |
| --color-panel-header-bg | rgb(250, 250, 250) | panel header bg | [asset:sections/02-pagebody.png] |
| --color-primary | rgb(0, 98, 255) | button border/focus | [asset:sections/02-pagebody.png] |
| --radius-panel | 10px | panels | [asset:sections/02-pagebody.png] |

## 4. Assets
None (content area uses CSS/Font Awesome icons; no screen-specific bitmap assets). [asset:sections/02-pagebody.png]

## 5. Components
React component tree (shared components marked *shared*):
- `FtpServerCredentialsPage`
  - `ProviderShell` *shared* — provided by kit; not specified here
  - `PageHelpButton` — help icon in the content header area [ctl:button-help]
  - `CreateNewButton` — “Create New” [ctl:ftpServerCredentialAddButton]
  - `SearchCriteriaPanel` — form inputs + actions [ctl:FtpServerName, ctl:resetButton, ctl:cancelButton, ctl:nextButton]
  - `SearchResultsPanel` — results grid + include invalids [kit:k1, ctl:showInvalidFTPServerCredentialsCheckBox]
  - `DialogD1_Add` — “Add FTP Server Credentials” [kit:d1]
  - `DialogD2_Edit` — “Edit FTP Server Credentials” [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `FtpServerCredentialsPage` | none | panel collapsed/expanded states (kit) | `button-help`, `ftpServerCredentialAddButton` | [ctl:button-help, ctl:ftpServerCredentialAddButton] |
| `SearchCriteriaPanel` | `FtpServerName` | field values (kit bus + native inputs) | `FtpServerName`, `FtpServerNameHelp`, `resetButton`, `cancelButton`, `nextButton`, `criteriaPanel` | [ctl:FtpServerName, ctl:FtpServerNameHelp, ctl:resetButton, ctl:cancelButton, ctl:nextButton, ctl:criteriaPanel] |
| `SearchResultsPanel` | `showInvalidFTPServerCredentialsCheckBox` | grid state (kit) | `showInvalidFTPServerCredentialsCheckBox`, `k1` | [ctl:showInvalidFTPServerCredentialsCheckBox, kit:k1] |
| `DialogD1_Add` | dialog fields | dialog form state (kit) | dialog `d1`, widgets `k2`, `k3` | [kit:d1, kit:k2, kit:k3] |
| `DialogD2_Edit` | dialog fields | dialog form state (kit) | dialog `d2`, widgets `k4`, `k5` | [kit:d2, kit:k4, kit:k5] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | Server Name | text | empty | no | maxLength 50; regex `^([^;*^:~<>%])*$` | “Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on input/submit | [ctl:FtpServerName] |
| `showInvalidFTPServerCredentialsCheckBox` | Include Invalids | checkbox | unchecked | no | None | None | on change / search | [ctl:showInvalidFTPServerCredentialsCheckBox] |

Dialog `d1` — Add FTP Server Credentials:
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `Edit_FtpServerName` | Server Name | text | empty | yes | regex `^([^;*^:~<>%])*$` | required: “Server Name is a required field.”; regex: “Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpDescription` | Description | text | empty | yes | regex `^([^;*^:~<>%])*$` | required: “Description is a required field.”; regex: “Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpTransferMode` | Transfer Mode | text | empty | yes | required | “Transfer Mode is a required field.” | on submit | [kit:d1] |
| `Edit_FtpServerIp` | IP Server | text | empty | yes | regex `^([^;*^:~<>%])*$` | required: “IP Server is a required field.”; regex: “IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpPort` | Port | text | `0` | yes | number; regex `^([^;*^:~<>%])*$` | required: “Port is a required field.”; number: “The field Port must be a number.”; regex: “Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpProxyAddress` | Proxy Address | text | empty | no | regex `^([^;*^:~<>%])*$` | “Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpProxyPort` | Proxy Port | text | empty | no | number; regex `^([^;*^:~<>%])*$` | number: “The field Proxy Port must be a number.”; regex: “Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpUser` | Server User | text | empty | yes | regex `^([^;*^:~<>%])*$` | required: “Server User is a required field.”; regex: “Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpPassword` | Password | password | empty | yes | regex `^([^;*^:~<>%])*$` | required: “Password is a required field.”; regex: “Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `Edit_FtpPasswordConfirmation` | Password Confirmation | password | empty | yes | regex `^([^;*^:~<>%])*$` | required: “Password Confirmation is a required field.”; regex: “Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `View_OperatorId` | Last Modified User Id | text (read-only) | empty | yes | regex `^([^;*^:~<>%])*$` | required: “Last Modified User Id is a required field.”; regex: “Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d1] |
| `View_CreationDate` | Creation Date | date (read-only) | `01/01/1900` | yes | date format `MM/dd/yyyy` | required: “Creation Date is a required field.”; date: “Creation Date must represent a valid date in the format 'MM/DD/YYYY'.” | on submit | [kit:d1, kit:k2] |
| `View_LastModifiedDate` | Modified Date | date (read-only) | `01/01/1900` | no | date format `MM/dd/yyyy` | “Modified Date must represent a valid date in the format 'MM/DD/YYYY'.” | on submit | [kit:d1, kit:k3] |

Dialog `d2` — Edit FTP Server Credentials:
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `Edit_FtpServerName` | Server Name | text (read-only) | populated from row | yes | regex `^([^;*^:~<>%])*$` | required: “Server Name is a required field.”; regex: “Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpDescription` | Description | text | populated from row | yes | regex `^([^;*^:~<>%])*$` | required: “Description is a required field.”; regex: “Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpTransferMode` | Transfer Mode | text | populated from row | yes | required | “Transfer Mode is a required field.” | on submit | [kit:d2] |
| `Edit_FtpServerIp` | IP Server | text | populated from row | yes | regex `^([^;*^:~<>%])*$` | required: “IP Server is a required field.”; regex: “IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpPort` | Port | text | populated from row | yes | number; regex `^([^;*^:~<>%])*$` | required: “Port is a required field.”; number: “The field Port must be a number.”; regex: “Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpProxyAddress` | Proxy Address | text | empty | no | regex `^([^;*^:~<>%])*$` | “Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpProxyPort` | Proxy Port | text | empty | no | number; regex `^([^;*^:~<>%])*$` | number: “The field Proxy Port must be a number.”; regex: “Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpUser` | Server User | text | populated from row | yes | regex `^([^;*^:~<>%])*$` | required: “Server User is a required field.”; regex: “Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpPassword` | Password | password | empty | no | regex `^([^;*^:~<>%])*$` | “Password contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `Edit_FtpPasswordConfirmation` | Password Confirmation | password | empty | no | regex `^([^;*^:~<>%])*$` | “Password Confirmation contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `View_OperatorId` | Last Modified User Id | text (read-only) | populated from row | yes | regex `^([^;*^:~<>%])*$` | required: “Last Modified User Id is a required field.”; regex: “Last Modified User Id contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit | [kit:d2] |
| `View_CreationDate` | Creation Date | date (read-only) | populated from row | yes | date format `MM/dd/yyyy` | required: “Creation Date is a required field.”; date: “Creation Date must represent a valid date in the format 'MM/DD/YYYY'.” | on submit | [kit:d2, kit:k4] |
| `View_LastModifiedDate` | Modified Date | date (read-only) | populated from row | no | date format `MM/dd/yyyy` | “Modified Date must represent a valid date in the format 'MM/DD/YYYY'.” | on submit | [kit:d2, kit:k5] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| Search Criteria panel expanded | ui | yes | chevron toggle | shows/hides the criteria body (Server Name + action buttons) | [ctl:criteriaPanel, asset:sections/02-pagebody.png] |
| Search Results panel visible | ui | no | Search action | reveals the results grid panel below | [ctl:nextButton, kit:k1, asset:kit/states/search.png] |
| Include Invalids | ui | unchecked | checkbox change | [UNKNOWN: how it impacts search results] | [ctl:showInvalidFTPServerCredentialsCheckBox, asset:kit/states/search.png] |
\nAlso present but not visible in the default reference picture:\n| element | shown when | evidence |
|---|---|---|
| `prevButton`, `alt1Button`…`alt8Button`, `printButton` | [UNKNOWN: legacy action bar state] | [ctl:prevButton] |

## 8. Behavior
### 8.1 Page actions
- WHEN the user activates “Create New” THE SYSTEM SHALL open the modal dialog “Add FTP Server Credentials”. [ctl:ftpServerCredentialAddButton, kit:d1, asset:kit/states/dialog-d1.png]
- WHEN the user activates “Search” THE SYSTEM SHALL reveal the Search Results panel and populate the grid. [ctl:nextButton, kit:k1, asset:kit/states/search.png]
- WHEN the user activates “Reset” THE SYSTEM SHALL clear the search criteria fields. [ctl:resetButton, asset:sections/02-pagebody.png]
- WHEN the user activates “Cancel” THE SYSTEM SHALL perform the legacy cancel action. [UNKNOWN: destination / effect] [ctl:cancelButton]
- WHEN the user activates the Help icon THE SYSTEM SHALL execute `displayPageLevelHelp()`. [UNKNOWN: what UI opens] [ctl:button-help]

### 8.2 Grid (`k1`)
- THE SYSTEM SHALL display columns: Server Name, Description, IP Server, Server User, Creation Date, Is Valid. [kit:k1, asset:kit/states/search.png]
- THE SYSTEM SHALL support single-column sorting with allowUnsort=false (no “none” state once sorted). [kit:k1]
- THE SYSTEM SHALL support column filtering for: Server Name, Description, Server User (operators: Contains, Starts With, Ends With). [kit:k1]
- THE SYSTEM SHALL paginate with page size options 5/10/20 and a Refresh action. [kit:k1]
- WHEN the user double-clicks the first row THE SYSTEM SHALL open the “Edit FTP Server Credentials” dialog. [kit:k1, kit:d2, asset:kit/states/dialog-d2.png]

### 8.3 Scroll behavior
None captured for the screen content area. [asset:sections/02-pagebody.png]

### 8.4 Media
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `cancelButton` | [UNKNOWN: legacy destination] | [UNKNOWN] | [ctl:cancelButton] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search (`nextButton`) | GET `/api/FileTransfer/GetFTPServerCredentials/` params: none | kit service `search(values)` (mocked) | renders rows into grid `k1` | [ctl:nextButton, kit:k1] |
| Open Add dialog (`ftpServerCredentialAddButton`) | GET `/FileTransfer/AddFTPServerCredentials/` params: none | kit service `openDialog('d1')` (mocked) | shows dialog content `d1` | [ctl:ftpServerCredentialAddButton, kit:d1] |
| Save Edit dialog (`btnSave` in `d2`) | POST `/FileTransfer/AddFTPServerCredentials/` form fields: see kit request param list | kit service `save('d2', values)` (mocked) | [UNKNOWN: legacy post-save effect] | [kit:d2] |

## 11. Accessibility
- Server Name field uses a visible text label (“Server Name”) and a help icon next to the label. [ctl:FtpServerName, ctl:FtpServerNameHelp, asset:sections/02-pagebody.png]
- Required fields are indicated with a leading “*” marker in magenta. [asset:kit/states/dialog-d1.png]
- Dialogs are modal with a visible title and Close (X) button. [kit:d1, kit:d2]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild:
`button-help`, `ftpServerCredentialAddButton`, `criteriaPanel`, `FtpServerName`, `FtpServerNameHelp`, `resetButton`, `cancelButton`, `nextButton`, `showInvalidFTPServerCredentialsCheckBox`, `k1`, `d1`, `d2`, `k2`, `k3`, `k4`, `k5`. [kit:k1, kit:d1, kit:d2]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v3/screens/ftp-server-credentials/spec/parity.spec.ts`
Gate-required controls (shell + content):
[ctl:pageBannerLogo, ctl:button, ctl:button-medicaid-management-solutions, ctl:button-2, ctl:AAGMenu.BroadcastMsg, ctl:link-messages, ctl:AAGMenu.ExternalLinks, ctl:link-external-links]
[ctl:AAGMenu.Favorites, ctl:link-favorites, ctl:AAGMenu.ContactUs, ctl:link-contact-us, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-logout]
[ctl:button-main-menu-2, ctl:button-8, ctl:activeModuleMenu, ctl:activeModuleMenuFirstItem, ctl:button-help, ctl:button-21]
[ctl:ftpServerCredentialAddButton, ctl:criteriaPanel, ctl:FtpServerNameHelp, ctl:FtpServerName, ctl:resetButton, ctl:cancelButton, ctl:nextButton]
[ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy]

## 13. Open questions
1. What is the effect/destination of the page-level Cancel action? [UNKNOWN]
2. What UI opens (if any) for the Help icon (`displayPageLevelHelp()`)? [UNKNOWN]
3. What does “Include Invalids” change about the Search results? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include the CSS animation `autoFillEnd` (duration 0s, 1 iteration) on the Server Name input wrapper. [M01]




