#Wrapped in the shared shell (see the home spec).\n\nShared shell/footer controls are present on this page but specified in the home spec: [ctl:pageBannerLogo], [ctl:button], [ctl:button-medicaid-management-solutions], [ctl:button-2], [ctl:AAGMenu.BroadcastMsg], [ctl:link-messages], [ctl:AAGMenu.ExternalLinks], [ctl:link-external-links], [ctl:AAGMenu.Favorites], [ctl:link-favorites], [ctl:AAGMenu.ContactUs], [ctl:link-contact-us], [ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:link-logout], [ctl:button-main-menu-2], [ctl:button-8], [ctl:activeModuleMenu], [ctl:activeModuleMenuFirstItem], [ctl:button-help], [ctl:button-22], [ctl:button-disclaimer], [ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy].\nUI SPEC — fxfer-v4/ftp-server-credentials

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file under `capture/` (or `sections/…`) · `[kit:kN]` kit widget/dialog · `[css:selector]` · `[UNKNOWN: …]`

## 1. Overview
Screen for searching FTP server credential records and opening dialogs to add or edit an FTP server credential. [asset:sections/02-pagebody.png]
Primary tasks:
- Search credentials by Server Name using the Search Criteria panel, then review results in the grid. [ctl:FtpServerName, ctl:nextButton, kit:k1]
- Add a new FTP server credential via Create New → Add FTP Server Credentials dialog. [ctl:ftpServerCredentialAddButton, kit:d1]
- Edit an existing credential by double-clicking a Search Results grid row → Edit FTP Server Credentials dialog. [kit:k1, kit:d2]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Page: fixed viewport (capture 1920×1080 CSS px), body background rgb(255, 255, 255), page scroll (no inner scroll region captured). [asset:reference.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content area | `div#pageBody.row` `{pageBody}` | 0,139,1920,400 | reference | single column; top-right action row; then Search Criteria panel | white bg; content panel border 1px solid rgb(222, 226, 230); panel radius 10px; shadow rgba(0, 0, 0, 0.08) 0px 8px 10px 1px | [asset:sections/02-pagebody.png] |

### 2.1 Content area (`#pageBody`)
- Top action row contains `Create New` button aligned to the top-right. [ctl:ftpServerCredentialAddButton]
- Below it is the `Search Criteria` content panel with a collapse/expand chevron icon on the right side of the panel header. [ctl:criteriaPanel]
- Search Results panel is not visible in the default (pre-search) state; it appears after Search and contains the results grid. [kit:k1]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` 14px/14px | body | [asset:sections/02-pagebody.png] |
| `--color-text` | rgb(61, 61, 61) | most labels and body text | [asset:sections/02-pagebody.png] |
| `--color-panel-header-bg` | rgb(250, 250, 250) | Search Criteria panel header | [asset:sections/02-pagebody.png] |
| `--color-panel-border` | rgb(222, 226, 230) | Search Criteria/Search Results panel border | [asset:sections/02-pagebody.png] |
| `--shadow-panel` | rgba(0, 0, 0, 0.08) 0px 8px 10px 1px | Search Criteria/Search Results panel | [asset:sections/02-pagebody.png] |
| `--color-input-border` | rgb(90, 105, 120) | Server Name textbox border | [ctl:FtpServerName] |
| `--radius-button` | 4px | Create New/Reset/Cancel/Search buttons | [ctl:ftpServerCredentialAddButton] |
| `--color-primary` | rgb(0, 98, 255) | Create New/Reset/Cancel/Search button border/text | [ctl:ftpServerCredentialAddButton] |
| `--color-help-icon` | rgb(51, 129, 255) | help `?` icons | [ctl:FtpServerNameHelp] |
| `--color-required` | rgb(203, 26, 198) | required asterisk indicators | [kit:d1] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shell header logo | 117×57 | reused by shell | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `FtpServerCredentialsPage`
  - `SearchCriteriaPanel` — Server Name field + Reset/Cancel/Search buttons [ctl:FtpServerName, ctl:resetButton, ctl:cancelButton, ctl:nextButton]
  - `CreateNewButton` — opens Add dialog [ctl:ftpServerCredentialAddButton, kit:d1]
  - `SearchResultsPanel` — Include Invalids checkbox + results grid [ctl:showInvalidFTPServerCredentialsCheckBox, kit:k1]
  - `AddFtpServerCredentialsDialog` — Kendo dialog `d1` [kit:d1]
  - `EditFtpServerCredentialsDialog` — Kendo dialog `d2` [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | `serverName` | none (kit/forms own values) | `FtpServerName`, `criteriaPanel`, `resetButton`, `cancelButton`, `nextButton` | [ctl:FtpServerName] |
| `SearchResultsPanel` | search response rows | selected row | `showInvalidFTPServerCredentialsCheckBox`, grid `FTPServerCredentialsGrid` | [ctl:showInvalidFTPServerCredentialsCheckBox, kit:k1] |
| `AddFtpServerCredentialsDialog` | form fields | dialog-local form state | dialog `d1`, date pickers `k2`/`k3` | [kit:d1, kit:k2, kit:k3] |
| `EditFtpServerCredentialsDialog` | row values | dialog-local form state | dialog `d2`, date pickers `k4`/`k5` | [kit:d2, kit:k4, kit:k5] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FtpServerName` | Server Name | text | empty | no | max length 50; disallow `; * ^ : ~ < > %` | Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed. | on submit (Search) [UNKNOWN: exact validation trigger] | [ctl:FtpServerName, kit:k1] |
| `showInvalidFTPServerCredentialsCheckBox` | Include Invalids | checkbox | unchecked (and hidden pre-search) | no | none |  | on change [UNKNOWN: effect on results] | [ctl:showInvalidFTPServerCredentialsCheckBox] |

Dialog `d1`/`d2` fields (the kit provides the exact rules/messages):
- IF Server Name contains any of `; * ^ : ~ < > %` THEN THE SYSTEM SHALL show `Server Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` [kit:d1]
- IF Description contains any of `; * ^ : ~ < > %` THEN THE SYSTEM SHALL show `Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` [kit:d1]
- IF Transfer Mode is empty THEN THE SYSTEM SHALL show `Transfer Mode is a required field.` [kit:d1]
- IF IP Server is empty THEN THE SYSTEM SHALL show `IP Server is a required field.` [kit:d1]
- IF Port is not a number THEN THE SYSTEM SHALL show `The field Port must be a number.` [kit:d1]
- IF Password is empty in Add (`d1`) THEN THE SYSTEM SHALL show `Password is a required field.` [kit:d1]
- IF Password Confirmation is empty in Add (`d1`) THEN THE SYSTEM SHALL show `Password Confirmation is a required field.` [kit:d1]
- IF Creation Date is not a valid date (MM/DD/YYYY) THEN THE SYSTEM SHALL show `Creation Date must represent a valid date in the format 'MM/DD/YYYY'.` [kit:k2]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| Search Criteria collapsed | boolean | false (expanded) | click `criteriaPanel` | hides/shows Search Criteria panel body | [ctl:criteriaPanel] |
| Search Results visible | boolean | false | Search | shows Search Results panel + grid | [kit:k1] |
| Include Invalids visible | boolean | false | Search | shows `Include Invalids` checkbox | [ctl:showInvalidFTPServerCredentialsCheckBox, kit:k1] |
| Selected result row | string/row id | none | single-click grid row | marks row selected; enables double-click open | [kit:k1] |
| Add dialog open | boolean | false | Create New | shows dialog `d1` | [kit:d1] |
| Edit dialog open | boolean | false | double-click result row | shows dialog `d2` | [kit:d2] |

Hidden at load (facts §12):
| element | shown when | evidence |
|---|---|---|
| `showInvalidFTPServerCredentialsCheckBox` | after Search Results are shown | [ctl:showInvalidFTPServerCredentialsCheckBox] |

## 8. Behavior
### 8.1 Search Criteria
- THE SYSTEM SHALL show the Search Criteria panel header text `Search Criteria`. [asset:sections/02-pagebody.png]
- WHEN the user activates the collapse control `criteriaPanel` THEN THE SYSTEM SHALL collapse/expand the Search Criteria panel body. [ctl:criteriaPanel]

### 8.2 Search
- WHEN the user clicks `Search` THEN THE SYSTEM SHALL request FTP server credentials and reveal the Search Results panel. [ctl:nextButton, kit:k1]

### 8.3 Create New
- WHEN the user clicks `Create New` THEN THE SYSTEM SHALL open dialog `Add FTP Server Credentials` (`d1`). [ctl:ftpServerCredentialAddButton, kit:d1]

### 8.4 Grid + Edit
- THE SYSTEM SHALL display the Search Results grid with columns: `Server Name`, `Description`, `IP Server`, `Server User`, `Creation Date`, `Is Valid`. [kit:k1]
- WHEN the user double-clicks the first results grid row THEN THE SYSTEM SHALL open dialog `Edit FTP Server Credentials` (`d2`). [kit:k1, kit:d2]

## 9. Navigation
None. [asset:reference.png]

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/GetFTPServerCredentials/` | same endpoint via rebuild service | shows Search Results grid rows | [kit:k1] |
| Save (Add/Edit dialog) | POST `/FileTransfer/AddFTPServerCredentials/` (fields include `FtpServerId`, `FtpServerName`, `FtpServerIp`, `FtpTransferMode`, `FtpUser`, `FtpPassword`, `FtpPasswordConfirmation`, `FtpDescription`, `FtpPort`, `FtpProxyAddress`, `FtpProxyPort`, `LastModifiedDate`, `CreationDate`, `IsValid`, `RemovePassword`, `OperatorId`, plus `Editor[...]` and `Metadata[...]`) | same endpoint via rebuild service | [UNKNOWN: post-save UI update/confirmation] | [kit:d1, kit:d2] |

## 11. Accessibility
- Each field uses a `<label for="...">` association (e.g., `Server Name` label `for="FtpServerName"`). [ctl:FtpServerName]
- Required fields in dialogs show an asterisk icon with a tooltip message like `Server Name is a required field.` [kit:d1]
- Help `?` icons expose tooltips with field names (e.g., `Server Name`). [ctl:FtpServerNameHelp]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v4/screens/ftp-server-credentials/spec/parity.spec.ts` uses them.

At minimum, the screen-specific content-area keys:
`ftpServerCredentialAddButton`, `criteriaPanel`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton`, `showInvalidFTPServerCredentialsCheckBox`, `FTPServerCredentialsGrid` [ctl:ftpServerCredentialAddButton]

## 13. Open questions
1. What does the Search Criteria `Cancel` action do on this screen (navigate to `/Home/MyHome/` vs something else)? [UNKNOWN]
2. What is the exact effect of toggling `Include Invalids` on the Search Results grid (refetch vs client-side filter)? [UNKNOWN]
3. What does `Invalidate` do in the Edit dialog (`d2`) and what UI confirmation/result should follow? [UNKNOWN]

## 14. Motion
- WHILE the page is shown THE SYSTEM SHALL apply the CSS animation `autoFillEnd` (duration 0s, delay 0s, 1 iteration, easing `ease`) to elements like `#FtpServerName_parent > div:nth-of-type(2) > span:nth-of-type(1)`. [M01]