# UI SPEC ? fxfer-v7/file-transfer-configuration

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with mvcUnobtrusive + jquery 3.7.1 ? target React 19
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` file under `capture/` (or `sections/...`, `kit/states/...`) ? `[js:?]` ? `[aspx:?]` ? `[css:selector]` ? `[kit:kN|dN]` kit widget/dialog ? `[UNKNOWN: ?]`

## 1. Overview
?File Transfer Configuration? lets a user search for existing file transfer source-location configurations and either view an existing configuration (from the results grid) or create a new one. [asset:kit/states/search.png]

Primary tasks:
- Search configurations by criteria and review results in the grid. [kit:k4]
- Create a new configuration via ?Create New? and save. [ctl:FileTransferGridAddButton, kit:d1]
- View an existing configuration by opening a grid row. [kit:d2]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Page content area is inside `#pageBody` and includes the title strip, the Search Criteria panel, and the Search Results grid. Background is `rgb(255, 255, 255)`. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---:|---|---|---|---|
| Module/title strip | `div.menu` (`navigation-file-transfer-services`) | 0,62,1920,32 | sections/01 | block row | bg `rgb(0, 238, 174)` | [asset:sections/01-file-transfer-configuration.png] |
| Main content container | `div#pageBody` (`pageBody`) | 0,138,1920,510 | sections/02 | normal flow | | [asset:sections/02-pagebody.png] |

### 2.1 Module/title strip
- Left module label: ?FILE TRANSFER SERVICES? on a dark background block. [asset:sections/01-file-transfer-configuration.png]
- Screen title text: ?File Transfer Configuration? on a green strip. [asset:sections/01-file-transfer-configuration.png]
- Help icon/button at far right of the strip. [ctl:button-help, asset:sections/01-file-transfer-configuration.png]

### 2.2 Main content container
Top-right action:
- ?Create New? button aligned to the top-right of the content area, above the Search Criteria panel. [ctl:FileTransferGridAddButton, asset:sections/02-pagebody.png]

Search Criteria panel:
- Card container (`.content-panel-container`) with border `0.666667px solid rgb(222, 226, 230)`, `border-radius: 10px`, and drop shadow `rgba(0, 0, 0, 0.08) 0px 8px 10px 1px`. Header background `rgb(250, 250, 250)` with `border-radius: 10px 10px 0px 0px`. [asset:sections/02-pagebody.png]
- Panel header text ?Search Criteria? with a collapse/expand chevron icon at right. [ctl:button-collapse, ctl:button-22, asset:sections/02-pagebody.png]
- Required marker legend ?Required Fields ( * )? at top-right of the panel body. [asset:sections/02-pagebody.png]

Search Results region:
- After Search, a ?Search Results? header and a Kendo grid render below the Search Criteria panel; includes a ?Show Inactives? checkbox above/right of the grid. [kit:k4, asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` 14px/14px | body text | [asset:sections/02-pagebody.png] |
| `--color-text` | `rgb(61, 61, 61)` | default text | [asset:sections/02-pagebody.png] |
| `--color-shell-bg` | `rgb(43, 58, 68)` | shared header background | [asset:kit/states/search.png] |
| `--color-accent-titlebar` | `rgb(0, 238, 174)` | module/title strip | [asset:sections/01-file-transfer-configuration.png] |
| `--color-link-accent` | `rgb(0, 98, 255)` | button borders/text | [asset:sections/02-pagebody.png] |
| `--radius-control` | `5px` | text inputs/dropdowns | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---:|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117?57 | img alt text ?Client Logo? | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | Owner Module dropdown caret icon | 18?16 | inline svg in dropdown button | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | Protocol dropdown caret icon | 18?16 | inline svg in dropdown button | [asset:assets/_svg/svg-2.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferConfigurationPage`
  - `SearchCriteriaPanel`
    - `ConfigurationIdField` (Kendo numeric) [kit:k1]
    - `ConfigurationNameField` [ctl:ConfigName]
    - `OwnerNameField` [ctl:OwnerName]
    - `OwnerModuleField` (Kendo dropdown) [kit:k2]
    - `ProtocolField` (Kendo dropdown) [kit:k3]
    - `ActionsRow` (Reset / Cancel / Search) [ctl:resetButton, ctl:cancelButton, ctl:nextButton]
  - `SearchResultsGrid` (Kendo grid) [kit:k4]
  - `AddFileTransferConfigurationDialog` (Kendo window) [kit:d1]
  - `ViewFileTransferConfigurationDialog` (Kendo window) [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | initial values empty | criteria values | `ConfigName`, `OwnerName`, `combobox-owner-module`, `combobox-protocol-protocol` | [asset:sections/02-pagebody.png] |
| `SearchResultsGrid` | search results rows, show-inactives flag | selected row, paging, sorting | (grid internals) | [kit:k4, asset:kit/states/search.png] |
| `AddFileTransferConfigurationDialog` | none (opened by Create New) | dialog form state | dialog `d1` and widgets `k5?k18` | [kit:d1] |
| `ViewFileTransferConfigurationDialog` | selected row | none (view/read-only presentation) | dialog `d2` and widgets `k33?k44` | [kit:d2] |

## 6. Fields & validation
Search Criteria (main screen):

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ConfigId` | Configuration ID | number (Kendo numeric) | empty | no | numeric-only | ?Configuration ID is restricted to numeric characters only [0-9].? | on input/submit | [kit:k1] |
| `ConfigName` | Configuration Name | text | empty | no | regex: alphanumeric only | ?Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].? | on input/submit | [ctl:ConfigName, asset:sections/02-pagebody.png] |
| `OwnerName` | Owner Name | text | empty | no | regex: disallow `; * ^ : ~ < > %` | ?Owner Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.? | on input/submit | [ctl:OwnerName, asset:sections/02-pagebody.png] |
| `SearchModuleList` | Owner Module | dropdown (Kendo) | placeholder ?select a value...? | no | option list (30) | | on submit | [kit:k2] |
| `ProtocolList` | Protocol | dropdown (Kendo) | placeholder ?select a value...? | no | options: FTP, SFTP, UNC, FTPS | | on submit | [kit:k3] |

Add dialog: ?Add File Transfer Configuration? (`d1`):

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ConfigName` | Configuration Name | text | empty | yes | regex: alphanumeric only; max length 50 | required: ?Configuration Name is a required field.?; regex: ?Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].? | on Save | [kit:d1, asset:kit/states/dialog-d1.png] |
| `Description` | Description | text | empty | no | max length 200 | | on Save | [kit:d1] |
| `ProtocolTypeList` | Protocol | dropdown | placeholder ?select a value...? | yes | options: FTP, SFTP, UNC, FTPS | required: ?Protocol is a required field.? | on Save | [kit:k5] |
| `FtsServerList` | Server | dropdown | placeholder ?select a value...? | yes | options (4) | required: ?Please input required information and try again.? | on Save | [kit:k6] |
| `SourceAddress` | Source Address | text | empty | yes | max length 248 | required: ?Source Address is a required field.? | on Save | [kit:d1] |
| `SourceFileMask` | Source File Mask | text | empty | yes | max length 50 | required: ?Source File Mask is a required field.? | on Save | [kit:d1] |
| `FileDirectionList` | File Direction | dropdown | placeholder ?select a value...? | no | options: INBOUND, OUTBOUND | | on Save | [kit:k7] |
| `TradingPartner` | Trading Partner | text | empty | no | regex: alphanumeric only; max length 10 | regex: ?Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].? | on Save | [kit:d1] |
| `OwnerName` | Owner Name | text | empty | yes | max length 50 | required: ?Owner Name is a required field.? | on Save | [kit:d1] |
| `OwnerPhoneNumber` | Owner Phone | masked text box (Kendo maskedtextbox) | empty | yes | regex: phone | required: ?Owner Phone is a required field.?; regex: ?Enter Valid Phone Number.? | on Save | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `AddConfigModuleList` | Owner Module | dropdown | placeholder ?select a value...? | yes | option list (30) | required: ?Owner Module is a required field.? | on Save | [kit:k8] |
| `OwnerEmail` | Owner Email | text | empty | yes | regex: email; max length 150 | required: ?Owner Email is a required field.?; regex: ?Owner Email is not a valid email address. Enter email with 'name@domain' format.? | on Save | [kit:d1] |
| `RunSchedule.ID` | Run Schedule | radio group | unknown selected at open | yes | weekly vs monthly drives which fields show | | on change / Save | [kit:d1] |
| `RunOnThisDayList` | Run On This Day Month | dropdown | placeholder "select a value..." | no | options: 1?31 | | when Run Monthly | [kit:k9, kit:d1] |
| `TimeWindowStartList` | Time Window Start | dropdown | placeholder ?select a value...? | yes | 48 time options | required: ?Time Window Start is a required field.? | on Save | [kit:k10] |
| `TimeWindowEndList` | Time Window End | dropdown | placeholder ?select a value...? | yes | 48 time options | required: ?Time Window End is a required field.? | on Save | [kit:k11] |
| `DestinationProtocolList` | Destination Protocol | dropdown | placeholder ?select a value...? | yes | options: FTP, SFTP, UNC, FTPS | required: ?Destination Protocol is a required field.? | on Save | [kit:k13] |
| `DestinationTypeList` | Destination Type | dropdown | placeholder ?select a value...? | yes | options: File to Event; User Defined | required: ?Destination Type is a required field.? | on Save | [kit:k15] |
| `FTPServer` | Server | dropdown | placeholder "select a value..." | yes | options (4) | required: "Server is a required field." | on Save | [kit:k14, kit:d1] |
| `ContractNameList` | FTE Module Contract | dropdown | placeholder "select a value..." | no | options (21) | | on Save | [kit:k16, kit:d1] |
| `FTEMetadataId` | FTE Metadata | dropdown | placeholder "select a value..." | yes | | | on Save | [kit:k17, kit:d1] |
| `RenamePatternList` | Rename Pattern | dropdown | placeholder "select a value..." | no | options (5) | | on Save | [kit:k18, kit:d1] |
| `DestinationShowInactiveCheckBox` | Show Inactives | checkbox | unchecked | no | | | | [kit:k12, kit:d1] |
| `DestinationAddress` | Destination Address | text | empty | yes | max length 248 | required: ?Destination Address is a required field.? | on Save | [kit:d1] |
| `ContactPhone` | Contact Phone | masked text box (Kendo maskedtextbox) | empty | no | regex: phone | regex: ?Enter Valid Phone Number.? | on Save | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `ContactEmail` | Contact Email | text | empty | no | regex: email | regex: ?Contact Email is not a valid email address. Enter email with 'name@domain' format.? | on Save | [kit:d1] |

View dialog: ?View File Transfer Configuration? (`d2`):

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `eft_ProtocolTypeList` | Protocol | dropdown (read-only display) | populated from row | yes | | required: ?Protocol is a required field.? | on open | [kit:k33, kit:d2] |
| `eft_FileDirectionList` | File Direction | dropdown (read-only display) | populated from row | no | | | on open | [kit:k34, kit:d2] |
| `eft_RunOnThisDayList` | Run On This Day Month | dropdown (read-only display) | populated from row | no | | | on open | [kit:k36, kit:d2] |
| `DestinationShowInactiveCheckBox` | Show Inactives | checkbox | unchecked | no | | | on open | [kit:k39, kit:d2] |
| `eft_OwnerSubsystemList` | Owner Module | dropdown (read-only display) | populated from row | yes | | required: ?Owner Module is a required field.? | on open | [kit:k35, kit:d2] |
| `eft_TimeWindowStartList` | Time Window Start | dropdown (read-only display) | populated from row | yes | | required: ?Time Window Start is a required field.? | on open | [kit:k37, kit:d2] |
| `eft_TimeWindowEndList` | Time Window End | dropdown (read-only display) | populated from row | yes | | required: ?Time Window End is a required field.? | on open | [kit:k38, kit:d2] |
| `viewDestinationProtocolList` | Destination Protocol | dropdown (read-only display) | populated from row | yes | | required: ?Destination Protocol is a required field.? | on open | [kit:k40, kit:d2] |
| `viewFTPServerList` | Server | dropdown (read-only display) | populated from row | yes | | required: ?Server is a required field.? | on open | [kit:k41, kit:d2] |
| `viewDestinationTypeList` | Destination Type | dropdown (read-only display) | populated from row | yes | | required: ?Destination Type is a required field.? | on open | [kit:k42, kit:d2] |
| `viewContractNameList` | FTE Module Contract | dropdown (read-only display) | populated from row | yes | | required: ?FTE Module Contract is a required field.? | on open | [kit:k43, kit:d2] |
| `viewRenamePatternList` | Rename Pattern | dropdown (read-only display) | populated from row | yes | | required: ?Rename Pattern is a required field.? | on open | [kit:k44, kit:d2] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| Search criteria values | form | empty | typing/selecting fields | Search request parameters (if any) | [asset:sections/02-pagebody.png] |
| Search results present | derived | unknown (grid appears after Search) | Search | grid content visible under ?Search Results? | [kit:k4, asset:kit/states/search.png] |
| Selected grid row | selection | none | click a row | row highlight; enables row actions (view on dblclick) | [kit:k4] |
| Add dialog open | modal | closed | Create New | shows dialog `d1` | [ctl:FileTransferGridAddButton, kit:d1] |
| View dialog open | modal | closed | double-click a grid row | shows dialog `d2` | [kit:d2] |
| Add dialog run schedule mode | enum | unknown | selecting Run Weekly/Run Monthly | toggles which schedule sub-fields are shown | [kit:d1] |

Hidden at load (facts ?12):
None.

## 8. Behavior
### 8.1 Search criteria + results
- WHEN the user clicks ?Search? (`nextButton`) THE SYSTEM SHALL call the Search endpoint and display ?Search Results? with a grid of results (search works with an empty form). [ctl:nextButton, kit:k4]
- WHEN the user clicks ?Reset? (`resetButton`) THE SYSTEM SHALL clear the Search Criteria fields. [ctl:resetButton, kit:k4]
- WHEN the user clicks ?Create New? (`FileTransferGridAddButton`) THE SYSTEM SHALL open dialog ?Add File Transfer Configuration?. [ctl:FileTransferGridAddButton, kit:d1]

### 8.2 Search results grid
- THE SYSTEM SHALL show a Kendo grid with columns: Configuration ID, Configuration Name, Protocol, Address, Mask, Owner Name, Owner Module, Status, Fts Source Location Id; default page size 10. [kit:k4]
- WHEN the user clicks a grid row THE SYSTEM SHALL select the row. [kit:k4]
- WHEN the user double-clicks a grid row THE SYSTEM SHALL open dialog ?View File Transfer Configuration?. [kit:d2]

### 8.3 Dialog `d1` ? Add File Transfer Configuration
- THE SYSTEM SHALL present the form sections ?Source Configuration? and ?Destination Configuration? inside the modal dialog. [kit:d1, asset:kit/states/dialog-d1.png]
- WHEN Run Schedule is ?Run Weekly? THE SYSTEM SHALL show the weekday checkbox fields (Sunday?Saturday). [kit:d1]
- WHEN Run Schedule is ?Run Monthly? THE SYSTEM SHALL show the monthly scheduling fields (Run On First Day Month, Run On Last Day Month, Run On This Day Month). [kit:d1]
- IF the user clicks ?Save? with required fields missing THEN THE SYSTEM SHALL show inline required-field messages (example state captured shows multiple required messages). [kit:d1, asset:kit/states/dialog-d1-confirm.png]
- IF the user attempts to close dialog `d1` (X) with unsaved edits THEN THE SYSTEM SHALL show an ?Alert Confirmation? prompt: ?Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?? with buttons ?No? and ?Yes?. [kit:d1, asset:kit/states/dialog-d1-confirm.png]
- Owner Phone and Contact Phone use Kendo maskedtextbox markup but kit behavior is not implemented. [UNKNOWN: kit has no maskedtextbox]

### 8.4 Dialog `d2` ? View File Transfer Configuration
- WHEN the dialog is opened THE SYSTEM SHALL show the configuration values in read-only form sections. [kit:d2, asset:kit/states/dialog-d2.png]

### 8.5 Scroll behavior (facts ?16: cite every [S##])
None.

### 8.6 Media (facts ?17: cite every [V##])
None.

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-my-account` | `/Home/MyAccount` | same tab | [ctl:link-my-account] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response ? UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/SearchFileTransfer/` | same endpoint contract; params not captured | rows ? Search Results grid | [kit:k4] |

## 11. Accessibility
- Each field has a visible label immediately above/left of the control; label text must match `content.md` verbatim. [asset:sections/02-pagebody.png]
- Focus/hover styles are provided by shared CSS/Kendo (`.k-button:focus`, `.k-picker:focus`, `.editor-icon:hover`). [ctl:nextButton]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v7/screens/file-transfer-configuration/spec/parity.spec.ts` uses them:

`pageBannerLogo` [ctl:pageBannerLogo], `button` [ctl:button], `button-medicaid-management-solutions` [ctl:button-medicaid-management-solutions], `button-2` [ctl:button-2], `AAGMenu.BroadcastMsg` [ctl:AAGMenu.BroadcastMsg], `link-messages` [ctl:link-messages], `AAGMenu.ExternalLinks` [ctl:AAGMenu.ExternalLinks], `link-external-links` [ctl:link-external-links], `AAGMenu.Favorites` [ctl:AAGMenu.Favorites], `link-favorites` [ctl:link-favorites], `AAGMenu.ContactUs` [ctl:AAGMenu.ContactUs], `link-contact-us` [ctl:link-contact-us], `AAGMenu.MyAccount` [ctl:AAGMenu.MyAccount], `AAGMenu.Logout` [ctl:AAGMenu.Logout], `link-logout` [ctl:link-logout], `button-main-menu-2` [ctl:button-main-menu-2], `button-8` [ctl:button-8], `activeModuleMenu` [ctl:activeModuleMenu], `activeModuleMenuFirstItem` [ctl:activeModuleMenuFirstItem], `button-help` [ctl:button-help], `FileTransferGridAddButton` [ctl:FileTransferGridAddButton], `button-22` [ctl:button-22], `button-collapse` [ctl:button-collapse], `ConfigIdHelp` [ctl:ConfigIdHelp], `text-configuration-id-configuration-i` [ctl:text-configuration-id-configuration-i], `ConfigNameHelp` [ctl:ConfigNameHelp], `ConfigName` [ctl:ConfigName], `OwnerNameHelp` [ctl:OwnerNameHelp], `OwnerName` [ctl:OwnerName], `col-md-4_editor-colOwnerModuleHelp` [ctl:col-md-4_editor-colOwnerModuleHelp], `combobox-owner-module` [ctl:combobox-owner-module], `button-select` [ctl:button-select], `ProtocolHelp` [ctl:ProtocolHelp], `combobox-protocol-protocol` [ctl:combobox-protocol-protocol], `button-select-2` [ctl:button-select-2], `resetButton` [ctl:resetButton], `cancelButton` [ctl:cancelButton], `nextButton` [ctl:nextButton], `button-disclaimer` [ctl:button-disclaimer], `button-website-requirements` [ctl:button-website-requirements], `button-privacy-policy` [ctl:button-privacy-policy], `button-cookie-policy` [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v7/screens/file-transfer-configuration/spec/parity.spec.ts`

## 13. Open questions
1. Owner Phone / Contact Phone are Kendo maskedtextbox fields; kit ports static markup but does not implement maskedtextbox behavior (typing mask, caret handling, validation timing). [UNKNOWN: kit has no maskedtextbox]

## 14. Motion
- WHILE the page is shown THE SYSTEM SHALL apply the CSS animation `autoFillEnd` (empty keyframes) to the elements that have it (duration 0s, delay 0s, iterations 1, easing `ease`). [M01]
