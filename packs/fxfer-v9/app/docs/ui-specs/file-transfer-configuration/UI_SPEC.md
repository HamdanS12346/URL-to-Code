# UI SPEC — fxfer-v9/file-transfer-configuration

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive + jquery 3.7.1 (Kendo UI for jQuery portal) · target React 19
> Evidence tags: `[ctl:key]` element · `[asset:path]` file under `packs/fxfer-v9/screens/file-transfer-configuration/` · `[kit:<id>]` provider-kit widget/dialog id · `[flow:<id>]` flows state id · `[M##]` motion entry · `[UNKNOWN: …]`

## 1. Overview
The File Transfer Configuration screen lets users search existing file transfer configurations, view/edit a selected configuration, and create a new configuration. [asset:sections/02-pagebody.png]

Primary tasks:
- Search configurations by criteria and review results in a grid. [kit:k4, flow:n1]
- Open a configuration to view details, then optionally enter edit mode. [kit:d2, kit:d3, flow:n1.1, flow:n1.1.2]
- Create a new configuration via the “Add File Transfer Configuration” dialog. [kit:d1, flow:n2]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Content area: `#pageBody > main` contains the Create New action, the Search Criteria panel, and (after Search) the Search Results panel/grid. [asset:sections/02-pagebody.png, asset:kit/states/search.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content root | `div#pageBody` | 0,138,1920,510 | reference | block | page background white | [asset:sections/02-pagebody.png] |
| Create New | `#FileTransferGridAddButton` | [UNKNOWN: exact box] | reference | button aligned top-right above panels | outline button, blue text | [ctl:FileTransferGridAddButton, asset:sections/02-pagebody.png] |
| Search Criteria panel | `.content-panel-container` | [UNKNOWN: exact box] | reference | panel with header + body | light shadow, rounded corners | [asset:sections/02-pagebody.png] |
| Search Results panel | [UNKNOWN: selector/key for results container] | [UNKNOWN: exact box] | kit state | appears below criteria after Search | header “Search Results” above grid | [asset:kit/states/search.png] |

### 2.1 Search Criteria panel
The panel header reads “Search Criteria” with a chevron/caret control on the right for collapse/expand. The caret control is keyed as `button-collapse` / `button-22` in capture controls. [ctl:button-collapse, ctl:button-22, asset:sections/02-pagebody.png]

### 2.2 Search Results panel
After Search, a section header “Search Results” appears above the results grid. [asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-body | Arial, "Helvetica Neue", Helvetica, sans-serif | all content | [asset:sections/02-pagebody.png] |
| --text-body | rgb(61, 61, 61) | panel content text | [asset:sections/02-pagebody.png] |
| --surface | rgb(255, 255, 255) | page + panels | [asset:sections/02-pagebody.png] |
| --panel-header-bg | rgb(250, 250, 250) | Search Criteria header | [asset:sections/02-pagebody.png] |
| --border-control | rgb(90, 105, 120) | input borders | [asset:sections/02-pagebody.png] |
| --accent-blue | rgb(0, 98, 255) | button border / emphasis | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under `packs/fxfer-v9/screens/file-transfer-configuration/`) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `sections/01-file-transfer-configuration.png` | module title bar crop | 1920×76 | reference crop | [asset:sections/01-file-transfer-configuration.png] |
| `sections/02-pagebody.png` | content area crop | 1920×510 | reference crop | [asset:sections/02-pagebody.png] |
| `kit/states/search.png` | “after Search” state (criteria + grid) | [UNKNOWN: screenshot size] | used to specify Search Results region | [asset:kit/states/search.png] |
| `kit/states/dialog-d1.png` | dialog `d1` (Add) top portion | [UNKNOWN] | source configuration portion visible | [asset:kit/states/dialog-d1.png, kit:d1] |
| `kit/states/dialog-d1-part1.png` | dialog `d1` (Add) scrolled to destination portion | [UNKNOWN] | destination configuration + action buttons | [asset:kit/states/dialog-d1-part1.png, kit:d1] |
| `kit/states/dialog-d2.png` | dialog `d2` (View) | [UNKNOWN] | read-only values | [asset:kit/states/dialog-d2.png, kit:d2] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferConfigurationPage`
  - `CreateNewButton`
  - `SearchCriteriaPanel`
    - `ConfigurationIdField` (numeric) [kit:k1]
    - `ConfigurationNameField`
    - `OwnerNameField`
    - `OwnerModuleDropdown` [kit:k2]
    - `ProtocolDropdown` [kit:k3]
    - `ResetButton`
    - `CancelButton`
    - `SearchButton`
  - `SearchResultsPanel`
    - `FileTransferConfigurationsGrid` [kit:k4]
  - Dialogs (provider kit)
    - `DialogD1_AddFileTransferConfiguration` [kit:d1]
    - `DialogD2_ViewFileTransferConfiguration` [kit:d2]
    - `DialogD3_EditFileTransferConfiguration` [kit:d3]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `FileTransferConfigurationPage` | none | dialog open/closed state, current search results | `FileTransferSearchForm` | [asset:sections/02-pagebody.png] |
| `SearchCriteriaPanel` | current criteria | collapsed/expanded | `ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList`, `resetButton`, `cancelButton`, `nextButton` | [kit:k1, kit:k2, kit:k3, asset:sections/02-pagebody.png] |
| `FileTransferConfigurationsGrid` | rows | selection | grid widget | [kit:k4, asset:kit/states/search.png] |
| `DialogD1_AddFileTransferConfiguration` | none | form state (source + destination) | dialog fields listed in §6 | [kit:d1, flow:n2] |
| `DialogD2_ViewFileTransferConfiguration` | selected row | none (view mode) | dialog fields listed in §6 | [kit:d2, flow:n1.1] |
| `DialogD3_EditFileTransferConfiguration` | selected row | editable form state | dialog fields listed in §6 | [kit:d3, flow:n1.1.2] |

## 6. Fields & validation

### 6.1 Search Criteria (page)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ConfigId` | Configuration ID | numeric textbox | empty | no | max length 9; numeric-only regex `^([0-9])*$` | “Configuration ID is restricted to numeric characters only [0-9].” | on validation | [kit:k1, ctl:text-configuration-id-configuration-i] |
| `ConfigName` | Configuration Name | text | empty | no | max length 50; regex `^([A-Za-z0-9]|[^\x00-\x7F])*$` | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on validation | [ctl:ConfigName, asset:sections/02-pagebody.png] |
| `OwnerName` | Owner Name | text | empty | no | max length 50; regex `^([^;*^:~<>%])*$` | “Owner Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on validation | [ctl:OwnerName, asset:sections/02-pagebody.png] |
| `SearchModuleList` | Owner Module | dropdown | “select a value...” | no | [UNKNOWN: list filtering/sorting behavior beyond kit standard dropdown] | none | on validation | [kit:k2, ctl:combobox-owner-module] |
| `ProtocolList` | Protocol | dropdown | “select a value...” | no | [UNKNOWN: list filtering/sorting behavior beyond kit standard dropdown] | none | on validation | [kit:k3, ctl:combobox-protocol-protocol] |

Label help icons (page):
- Configuration ID help icon key: `ConfigIdHelp`. [ctl:ConfigIdHelp]
- Configuration Name help icon key: `ConfigNameHelp`. [ctl:ConfigNameHelp]
- Owner Name help icon key: `OwnerNameHelp`. [ctl:OwnerNameHelp]
- Owner Module help icon key: `col-md-4_editor-colOwnerModuleHelp`. [ctl:col-md-4_editor-colOwnerModuleHelp]
- Protocol help icon key: `ProtocolHelp`. [ctl:ProtocolHelp]

Dropdown open affordances (page):
- Owner Module dropdown arrow button key: `button-select`. [ctl:button-select]
- Protocol dropdown arrow button key: `button-select-2`. [ctl:button-select-2]

Dropdown option lists (page):
- Owner Module options: Administration, Auth Determination, Claims Management, Core, …, TPL Policy (30 total). [kit:k2]
- Protocol options: FTP, SFTP, UNC, FTPS. [kit:k3]

### 6.2 Dialog d1 / d3 — Add/Edit File Transfer Configuration (shared field set)
The Add (`d1`) and Edit (`d3`) dialogs share the same field ids and validation messages for editable fields. [kit:d1, kit:d3]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `Edit_ConfigName` | Configuration Name | text | empty | yes | max length 50; alphanumeric regex | “Configuration Name is a required field.” | Save probe | [flow:n2, flow:n1.1.2] |
| `Description` | Description | text | empty | no | [UNKNOWN: max length] | none | on validation | [kit:d1] |
| `ProtocolTypeList` | Protocol | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Protocol is a required field.” | Save probe | [kit:k5, flow:n2] |
| `FtsServerList` | Server | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Server is a required field.” | on validation | [kit:k6, kit:d1] |
| `SourceAddress` | Source Address | text | empty | yes | [UNKNOWN: max length] | “Source Address is a required field.” | Save probe | [flow:n2] |
| `SourceFileMask` | Source File Mask | text | empty | yes | max length 50 | “Source File Mask is a required field.” | Save probe | [flow:n2] |
| `FileDirectionList` | File Direction | dropdown | “select a value...” | no | [UNKNOWN: option list values/labels] | none | on validation | [kit:k7, kit:d1] |
| `TradingPartner` | Trading Partner | text | empty | no | max length 10; alphanumeric regex | “Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on validation | [kit:d1] |
| `Edit_OwnerName` | Owner Name | text | empty | yes | max length 50; invalid chars rule | “Owner Name is a required field.” | Save probe | [flow:n2] |
| `OwnerPhoneNumber` | Owner Phone | masked textbox | empty | yes | [UNKNOWN: mask/format; kit does not implement maskedtextbox behavior] | “Owner Phone is a required field.”; “Enter Valid Phone Number.” | Save probe / validation | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `AddConfigModuleList` | Owner Module | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Please input required information and try again.” (Save probe) / “Owner Module is a required field.” (kit harvest) | Save probe / validation | [kit:k8, flow:n2, kit:d1] |
| `OwnerEmail` | Owner Email | text | empty | yes | email format | “Owner Email is a required field.”; “Owner Email is not a valid email address. Enter email with 'name@domain' format.” | Save probe / validation | [flow:n2, kit:d1] |
| `RunSchedule_ID1` | Run Weekly | radio | [UNKNOWN: default] | yes | toggles weekly vs monthly schedule sections | “Run Schedule is a required field.” | Save probe | [flow:n2, kit:d1] |
| `RunSchedule_ID2` | Run Monthly | radio | [UNKNOWN: default] | yes | toggles weekly vs monthly schedule sections | “Run Schedule is a required field.” | Save probe | [flow:n2, kit:d1] |
| `RunOnThisDayList` | Run On This Day Month | dropdown | “select a value...” | [UNKNOWN: only shown in monthly mode] | [UNKNOWN: option list values/labels] | [UNKNOWN: required/validation message] | on validation | [kit:k9, kit:d1] |
| `TimeWindowStartList` | Time Window Start | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Time Window Start is a required field.” | Save probe | [kit:k10, flow:n2] |
| `TimeWindowEndList` | Time Window End | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Time Window End is a required field.” | Save probe | [kit:k11, flow:n2] |
| `SendNotification` | Send Notification | checkbox | unchecked | no |  | none | on toggle | [kit:d1] |
| `Suspended` | Suspend | checkbox | unchecked | no |  | none | on toggle | [kit:d1] |
| `IsActive` / `Active` | Active | checkbox | checked | no |  | none | on toggle | [asset:kit/states/dialog-d1.png, kit:d1] |

Destination configuration (within d1/d3):
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `DestinationGrid` | [UNKNOWN: grid label] | grid |  |  | destination rows list |  | after adding destinations | [kit:k12, kit:d1] |
| `DestinationProtocolList` | Destination Protocol | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Destination Protocol is a required field.” | on validation | [kit:k13, kit:d1] |
| `FTPServer` | Server | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Server is a required field.” | on validation | [kit:k14, kit:d1] |
| `DestinationTypeList` | Destination Type | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “Destination Type is a required field.” | on validation | [kit:k15, kit:d1] |
| `DestinationAddress` | Destination Address | text | empty | yes | [UNKNOWN: max length] | “Destination Address is a required field.” | on validation | [kit:d1] |
| `ContractNameList` | FTE Module Contract | dropdown | “select a value...” | [UNKNOWN: required in some modes only] | [UNKNOWN: option list values/labels] | “FTE Module Contract is a required field.” | on validation | [kit:k16, kit:d1] |
| `FTEMetadataId` | FTE Metadata | dropdown | “select a value...” | yes | [UNKNOWN: option list values/labels] | “FTE Metadata is a required field.” | on validation | [kit:k17, kit:d1] |
| `ContactName` | Contact Name | text | empty | no | invalid chars `; * ^ : ~ < > %` disallowed | “Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on validation | [kit:d1] |
| `ContactPhone` | Contact Phone | masked textbox | empty | no | [UNKNOWN: mask/format; kit does not implement maskedtextbox behavior] | “Enter Valid Phone Number.” | on validation | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `ContactEmail` | Contact Email | text | empty | no | email format | “Contact Email is not a valid email address. Enter email with 'name@domain' format.” | on validation | [kit:d1] |
| `OverwriteAtDestination` | Overwrite At Destination | checkbox | unchecked | no |  | none | on toggle | [asset:kit/states/dialog-d1-part1.png, kit:d1] |
| `CompressAtDestination` | Compress At Destination | checkbox | unchecked | no |  | none | on toggle | [asset:kit/states/dialog-d1-part1.png, kit:d1] |
| `DestinationIsArchive` | Destination Is Archive | checkbox | unchecked | no |  | none | on toggle | [asset:kit/states/dialog-d1-part1.png, kit:d1] |
| `RenameAtDestination` | Rename At Destination | checkbox | unchecked | no | when checked, Rename Pattern becomes required | [UNKNOWN: exact required message timing] | Save probe | [flow:n2.3.1] |
| `RenamePatternList` | Rename Pattern | dropdown | “select a value...” | [UNKNOWN: required only when Rename At Destination checked] | [UNKNOWN: option list values/labels] | “Rename Pattern is a required field.” | on validation | [kit:k18, kit:d1] |

Dialog save-probe extra validation (d1):
- “At least one destination is required for the file transfer configuration” appears as a field-level error with `for: undefined` when attempting Save with no destination configured. [flow:n2]

### 6.3 Dialog d2 — View File Transfer Configuration
The View dialog displays values as read-only (underlined text) and includes actions to Edit and Close. [kit:d2, asset:kit/states/dialog-d2.png]

Kit widgets used inside View dialog:
- Source dropdown widgets: `eft_ProtocolTypeList` [kit:k33], `eft_FileDirectionList` [kit:k34], `eft_OwnerSubsystemList` [kit:k35], `eft_RunOnThisDayList` [kit:k36], `eft_TimeWindowStartList` [kit:k37], `eft_TimeWindowEndList` [kit:k38].
- Destination grid widget: `FileTransferDestinationGrid` [kit:k39].
- Destination dropdown widgets: `viewDestinationProtocolList` [kit:k40], `viewFTPServerList` [kit:k41], `viewDestinationTypeList` [kit:k42], `viewContractNameList` [kit:k43], `viewRenamePatternList` [kit:k44].

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `editFileTransferConfigurationButton` | [UNKNOWN: button label text] | button |  |  | enters edit mode (`d3`) |  | on click | [flow:n1.1.2, kit:d2] |
| `closeFileTransferConfigurationButton` | [UNKNOWN: button label text] | button |  |  | closes dialog |  | on click | [kit:d2] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `criteriaExpanded` | ui | yes | collapse/expand caret | Search Criteria body visibility | [asset:sections/02-pagebody.png, flow:n3] |
| `hasResults` | data | no | Search | Search Results panel/grid visibility | [flow:n1, kit:k4] |
| `dialog` | ui | none | Create New / grid row double-click / Edit | which dialog is open (`d1`/`d2`/`d3`) | [flow:n2, flow:n1.1, flow:n1.1.2] |

Hidden at load (facts §12):
None. [asset:sections/02-pagebody.png]

## 8. Behavior

### 8.1 Search Criteria
- THE SYSTEM SHALL show a “Search Criteria” panel containing the criteria fields and Reset/Cancel/Search actions. [asset:sections/02-pagebody.png]
- WHEN the user clicks the Search Criteria panel caret THEN THE SYSTEM SHALL toggle the panel between expanded and collapsed. [flow:n3]

### 8.2 Search Results grid
- WHEN the user clicks “Search” THEN THE SYSTEM SHALL display the Search Results section with a grid of matching configurations. [flow:n1, kit:k4]
- WHEN the user double-clicks a grid row THEN THE SYSTEM SHALL open the “View File Transfer Configuration” dialog (`d2`). [flow:n1.1, kit:d2]

Grid columns (left to right): Configuration ID, Configuration Name, Protocol, Address, Mask, Owner Name, Owner Module, Status (with an additional hidden column “Fts Source Location Id”). [kit:k4]

### 8.3 Dialog d1 — Add File Transfer Configuration
- WHEN the user clicks “Create New” THEN THE SYSTEM SHALL open the “Add File Transfer Configuration” dialog (`d1`). [flow:n2, kit:d1]
- IF the user attempts to Save with required fields missing THEN THE SYSTEM SHALL show field-level validation messages including (at minimum) Configuration Name, Protocol, Source Address, Source File Mask, Owner Name, Owner Phone, Owner Email, Run Schedule, Time Window Start, Time Window End, and the destination-required message. [flow:n2]
- WHEN the user closes the dialog via the X after editing THEN THE SYSTEM SHALL show an “Alert Confirmation” modal with message “Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?” and buttons “No” / “Yes”. [asset:kit/states/dialog-d1-confirm.png, kit:d1]

### 8.4 Dialog d2 — View File Transfer Configuration
- WHEN the user opens the View dialog THEN THE SYSTEM SHALL show the selected configuration’s details in read-only form. [flow:n1.1, kit:d2]
- WHEN the user clicks “Edit” in the View dialog THEN THE SYSTEM SHALL open the “Edit File Transfer Configuration” dialog (`d3`). [flow:n1.1.2, kit:d3]

### 8.5 Dialog d3 — Edit File Transfer Configuration
- WHILE the Edit dialog is open THE SYSTEM SHALL allow editing the same fields as the Add dialog. [flow:n1.1.2, kit:d3]
- IF the user attempts to Save in edit mode THEN THE SYSTEM SHALL send an update request (writes blocked in flows capture). [flow:n1.1.2]

### 8.6 States (flows)
Each row is a distinct observed UI state (including dialog sub-views). [flow:n0]

| state id | name | kind | how reached | what it shows / what can be done | evidence |
|---|---|---|---|---|---|
| `n0` | at-rest | page | initial load | Search Criteria expanded; Create New button; no Search Results shown | [flow:n0] |
| `n1` | search-results | results | click Search | Search Results grid visible below Search Criteria | [flow:n1] |
| `n1.1` | open-configuration | dialog | double-click a results row | View File Transfer Configuration dialog open | [flow:n1.1] |
| `n1.1.1` | open-destination | part | double-click inside View dialog destination grid/row | Destination details shown within the View dialog; only Close returns | [flow:n1.1.1] |
| `n1.1.2` | edit-configuration | dialog | click Edit in View dialog | Edit File Transfer Configuration dialog open (editable fields) | [flow:n1.1.2] |
| `n1.1.2.1` | edit-create-destination | part | in Edit dialog: set File Direction + Trading Partner, click Create New | Destination create portion reached from Edit dialog | [flow:n1.1.2.1] |
| `n1.1.2.2` | open-destination | part | double-click destination row in Edit dialog | Destination details within Edit dialog | [flow:n1.1.2.2] |
| `n1.1.2.3` | edit-run-weekly | part | click Run Weekly | Weekly schedule fields visible | [flow:n1.1.2.3] |
| `n2` | create-new | dialog | click Create New | Add File Transfer Configuration dialog open | [flow:n2] |
| `n2.1` | run-weekly | part | in Add dialog: click Run Weekly | Weekly schedule fields visible in Add dialog | [flow:n2.1] |
| `n2.2` | run-monthly | part | in Add dialog: click Run Monthly | Monthly schedule fields visible in Add dialog | [flow:n2.2] |
| `n2.3` | create-destination | part | fill required Source config, click Create New (destination) | Destination configuration portion visible | [flow:n2.3] |
| `n2.3.1` | toggle-rename | part | click Rename At Destination | Rename Pattern requirement becomes active | [flow:n2.3.1] |
| `n2.3.1.1` | add-another | part | fill destination + click Add Another | Another destination add attempt (frontier) | [flow:n2.3.1.1] |
| `n2.3.1.2` | set-destination-type-filetoevent | part | select Destination Type = FileToEvent | Destination type changed (frontier) | [flow:n2.3.1.2] |
| `n2.3.2` | add-another (validation) | validation | click Add Another with missing fields | Only validation/messages change | [flow:n2.3.2] |
| `n3` | criteria-collapsed | part | click criteria caret | Search Criteria collapsed to header-only | [flow:n3] |

## 9. Navigation
None. [asset:sections/02-pagebody.png]

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/SearchFileTransfer/` | `FileTransfer.searchFileTransfer(criteria)` | rows populate Search Results grid | [kit:k4, flow:n1] |
| Open View dialog | GET `/FileTransfer/FileTransferConfigurationView/` | `FileTransfer.getConfigurationView(id)` | dialog `d2` content | [flow:n1.1] |
| Open Add/Edit dialog | POST `/FileTransfer/FileTransferConfigurationEdit/` | `FileTransfer.getConfigurationEditModel(id?)` | dialog `d1`/`d3` content | [flow:n2, flow:n1.1.2] |
| Load supporting lists/server details | GET `/api/FileTransfer/GetDataListData/`; GET `/api/FileTransfer/GetFtpServerDetails/` | supporting lookups | dropdown contents / server fields | [flow:n2] |
| Save (Edit) | PUT `/api/FileTransfer/AddFileTransferBaseConfiguration/` | `FileTransfer.saveConfiguration(payload)` | [UNKNOWN: success/error UI; flows blocked writes] | [flow:n1.1.2] |

## 11. Accessibility
- Each field has a visible label; required fields are marked with an asterisk (*) before the label text. [asset:kit/states/dialog-d1.png]
- Help icons (`?`) appear beside many labels and show tooltips using the provider-kit tooltip behavior. [asset:sections/02-pagebody.png, asset:kit/states/tooltip.png]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v9/screens/file-transfer-configuration/spec/parity.spec.ts` uses them.

### 12.1 Page content keys
- `FileTransferGridAddButton` [ctl:FileTransferGridAddButton]
- `ConfigId` [kit:k1]
- `ConfigName` [ctl:ConfigName]
- `OwnerName` [ctl:OwnerName]
- `SearchModuleList` [kit:k2]
- `ProtocolList` [kit:k3]
- `resetButton` [ctl:resetButton]
- `cancelButton` [ctl:cancelButton]
- `nextButton` [ctl:nextButton]

### 12.2 Shared shell keys (out of scope for this screen spec)
These keys exist on the page because the screen is wrapped by the portal shell. [ctl:pageBannerLogo]

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
- `button-disclaimer` [ctl:button-disclaimer]
- `button-website-requirements` [ctl:button-website-requirements]
- `button-privacy-policy` [ctl:button-privacy-policy]
- `button-cookie-policy` [ctl:button-cookie-policy]

### 12.3 Dialog sample keys
Dialogs (sample; full set comes from kit dialogs `d1`/`d2`/`d3`):
- `Edit_ConfigName`, `ProtocolTypeList`, `SourceAddress`, `SourceFileMask`, `Edit_OwnerName`, `OwnerPhoneNumber`, `OwnerEmail`, `TimeWindowStartList`, `TimeWindowEndList`, `DestinationProtocolList`, `DestinationTypeList`, `DestinationAddress`, `FTEMetadataId` [kit:d1, kit:d3]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v9/screens/file-transfer-configuration/spec/parity.spec.ts`

## 13. Open questions
1. What are the full option lists (labels + values) for the Add/Edit dialog dropdowns (Protocol, Server, File Direction, Owner Module, Time Window Start/End, Destination Protocol/Type/Server, FTE Metadata, Rename Pattern, etc.)? [UNKNOWN]
2. What is the exact mask/format behavior of the Kendo maskedtextbox fields (Owner Phone, Contact Phone) in this portal, since the kit ports them as static markup only? [UNKNOWN]
3. What does the page do on successful Save / Save And Close / Update And Close (toast/banner text, grid refresh, dialog close) given that flows blocked write requests? [UNKNOWN]

## 14. Motion
- WHILE the page is shown THE SYSTEM SHALL apply the CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1, easing ease, fill none, direction normal; keyframes `@keyframes autoFillEnd { }`) to the captured input elements (e.g. `#ConfigId_parent …`). [M01]
