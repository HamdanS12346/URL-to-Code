# UI SPEC — fxfer-v3/file-transfer-configuration

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 + Kendo UI for jQuery (provider kit) · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[css:selector]` · `[kit:<id>]` kit widget/dialog · `[UNKNOWN: …]`

## 1. Overview
This screen lets the user search for File Transfer Configurations using criteria fields and view matching configurations in a results grid, with an action to create a new configuration via a modal dialog. [asset:sections/02-pagebody.png]

Primary tasks:
- Search configurations by criteria (Configuration ID/Name, Owner Name/Module, Protocol). [ctl:ConfigId, ctl:ConfigName, ctl:OwnerName, kit:k2, kit:k3]
- View Search Results in a paged, sortable grid (with Show Inactives). [kit:k4, ctl:FileTransferShowInactiveCheckBox]
- Create a new configuration via the “Add File Transfer Configuration” dialog. [ctl:FileTransferGridAddButton, kit:d1]
- View an existing configuration via the “View File Transfer Configuration” dialog (opened from the grid). [kit:d2]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-file-transfer-configuration.png]

Scope of this spec: the content area `#pageBody > main` (the page body content under the shared shell). [css:#pageBody]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content root | `div#pageBody` | 0,139,1920,511 | sections/02 | contains `main` and the screen form | background `rgb(255, 255, 255)` | [css:#pageBody] |
| Screen form | `form#FileTransferSearchForm` | 0,139,1920,511 | sections/02 | block | `class="k-content"` | [css:form.k-content] |
| Action row | `button#FileTransferGridAddButton` | ?,?,146×38 | sections/02 | top-right | 1px solid rgb(0, 98, 255) border, radius 4px | [ctl:FileTransferGridAddButton, asset:sections/02-pagebody.png] |
| Search Criteria panel | `div.content-panel-container` | ?,?,1860×389 | sections/02 | panel with header + body | border 1px solid rgb(222, 226, 230), radius 10px, shadow rgba(0,0,0,0.08) 0 8px 10px 1px | [asset:sections/02-pagebody.png] |
| Search Results panel (hidden at load) | `div#searchFileTransferConfigResultsPanel` | `[UNKNOWN: box after revealed]` | kit/states/search | appears below Search Criteria | `style="display:none"` at load, `data-kit-h="h7"` | [kit:k4, asset:kit/states/search.png] |

### 2.1 Search Criteria panel
- Header text is “Search Criteria”. [asset:sections/02-pagebody.png]
- Header tools include a chevron icon with title “Collapse” (`div.fa-angle-up[title="Collapse"]`). [css:.content-panel-hdr-tools]
- The panel contains a “Required Fields ( * )” note near the top-right of the panel body. [asset:sections/02-pagebody.png]
- Criteria fields appear in a left-aligned grid of label + help icon + input. [asset:sections/02-pagebody.png]
- Action buttons are inside the panel at the bottom: “Reset” at bottom-left; “Cancel” and “Search” at bottom-right. [ctl:resetButton, ctl:cancelButton, ctl:nextButton]

### 2.2 Search Results panel (after Search)
After a Search, a “Search Results” panel appears beneath Search Criteria and contains:
- “Show Inactives” checkbox (`FileTransferShowInactiveCheckBox`) at the upper-right of the grid toolbar. [ctl:FileTransferShowInactiveCheckBox, asset:kit/states/search.png]
- Results grid widget `[kit:k4]`. [kit:k4]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome 14px/1` | default text | [css:body] |
| `--color-text` | `rgb(51, 51, 51)` | default text | [css:body] |
| `--color-surface` | `rgb(255, 255, 255)` | page background | [css:body] |
| `--color-panel-header-bg` | `rgb(250, 250, 250)` | panel header background | [asset:sections/02-pagebody.png] |
| `--color-border-panel` | `rgb(222, 226, 230)` | panel border | [asset:sections/02-pagebody.png] |
| `--color-border-input` | `rgb(90, 105, 120)` | input borders | [asset:sections/02-pagebody.png] |
| `--color-accent` | `rgb(0, 98, 255)` | primary accents (Create New border, focus/hover accents) | [asset:sections/02-pagebody.png] |
| `--color-help` | `rgb(51, 129, 255)` | help icon color | [ctl:ConfigIdHelp] |
| `--color-required` | `rgb(203, 26, 198)` | required asterisk + “Required Fields (*)” | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_svg/svg-1.svg` | Owner Module dropdown caret icon | 18×16 | inline svg in dropdown button | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | Protocol dropdown caret icon | 18×16 | inline svg in dropdown button | [asset:assets/_svg/svg-2.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferConfigurationPage`
  - `Shell` *shared* (out of scope; see home spec)
  - `CreateNewButtonRow` — “Create New” [ctl:FileTransferGridAddButton]
  - `SearchCriteriaPanel`
    - `ConfigurationIdField` — widget `[kit:k1]` [kit:k1]
    - `ConfigurationNameField` [ctl:ConfigName]
    - `OwnerNameField` [ctl:OwnerName]
    - `OwnerModuleField` — widget `[kit:k2]` [kit:k2]
    - `ProtocolField` — widget `[kit:k3]` [kit:k3]
    - `SearchCriteriaActions` — Reset / Cancel / Search [ctl:resetButton]
  - `SearchResultsPanel` (hidden at load; shown after Search) [kit:k4]
    - `ShowInactivesToggle` [ctl:FileTransferShowInactiveCheckBox]
    - `FileTransferConfigurationsGrid` — widget `[kit:k4]` [kit:k4]
  - `AddFileTransferConfigurationDialog` (modal) [kit:d1]
  - `ViewFileTransferConfigurationDialog` (modal) [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `FileTransferConfigurationPage` | none | results visible + dialogs open/closed | `FileTransferGridAddButton`, `nextButton` | [asset:sections/02-pagebody.png] |
| `SearchCriteriaPanel` | criteria values | expanded/collapsed | `ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList` | [kit:k1, kit:k2, kit:k3] |
| `SearchResultsPanel` | search results rows | selected row | `FileTransferShowInactiveCheckBox`, grid `k4` | [kit:k4, asset:kit/states/search.png] |
| `AddFileTransferConfigurationDialog` | none | dialog form values | dialog `d1`, widgets `k5`–`k18`, destination grid `k12` | [kit:d1, kit:k12, asset:kit/states/dialog-d1.png] |
| `ViewFileTransferConfigurationDialog` | selected row | none (read-only) | dialog `d2`, widgets `k19`–`k30`, destination grid `k25` | [kit:d2, asset:kit/states/dialog-d2.png] |

## 6. Fields & validation
Field keys are the live `id` attributes (or kit widget ids) and become `data-testid` in the rebuild. [css:input[id]]

### 6.1 Search Criteria fields (page)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ConfigId` (`[kit:k1]`) | Configuration ID | numeric | empty | no | max length 9; digits-only regex `^([0-9])*$` | “Configuration ID is restricted to numeric characters only [0-9].” | on submit / validation | [kit:k1] |
| `ConfigName` | Configuration Name | text | empty | no | max length 50; regex `^([A-Za-z0-9]|[^\x00-\x7F])*$` | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on submit / validation | [ctl:ConfigName] |
| `OwnerName` | Owner Name | text | empty | no | max length 50; regex `^([^;*^:~<>%])*$` | “Owner Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on submit / validation | [ctl:OwnerName] |
| `SearchModuleList` (`[kit:k2]`) | Owner Module | dropdown | “select a value...” | no | options (30): Administration; Auth Determination; Claims Management; Core; Correspondence Mgmt; Custom 01; Drug Rebate; Drug Rebate Portal; EDI; Employee Mgmt; File Transfer; Identity Management; Integration; Managed Care; Managed Care Portal; Member Management; Member Portal; Notifications; Plan Management; Program Integrity; Program Integrity CT; Provider Credentialing; Provider Enrollment; Provider Management; Provider Portal; Screening; Task Management; TPL Case Tracking; TPL HIPP; TPL Policy | n/a | on submit / validation | [kit:k2] |
| `ProtocolList` (`[kit:k3]`) | Protocol | dropdown | “select a value...” | no | options (4): FTP; SFTP; UNC; FTPS | n/a | on submit / validation | [kit:k3] |

### 6.2 Dialog d1 — “Add File Transfer Configuration” fields
Dialog title: “Add File Transfer Configuration”. [kit:d1]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `Edit_ConfigName` | Configuration Name | text | empty | yes | alphanumeric regex (same pattern as page) | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].”; “Configuration Name is a required field.” | on Save | [kit:d1] |
| `Description` | Description | text | empty | no | `[UNKNOWN: max length / validation not listed]` | `[UNKNOWN]` | on Save | [kit:d1] |
| `ProtocolTypeList` (`[kit:k5]`) | Protocol | dropdown | “select a value...” | yes | options (4): FTP; SFTP; UNC; FTPS | “Protocol is a required field.” | on Save | [kit:k5] |
| `FtsServerList` (`[kit:k6]`) | Server | dropdown | “select a value...” | yes | options (4): Ranjan; SFTP DEV; SFTP TEST; SftpTest | “Server is a required field.” / (required validation message may show “Please input required information and try again.”) | on Save | [kit:k6] |
| `SourceAddress` | Source Address | text | empty | yes | required | “Source Address is a required field.” | on Save | [kit:d1] |
| `SourceFileMask` | Source File Mask | text | empty | yes | required | “Source File Mask is a required field.” | on Save | [kit:d1] |
| `FileDirectionList` (`[kit:k7]`) | File Direction | dropdown | “select a value...” | no | options (2): INBOUND; OUTBOUND | n/a | on Save | [kit:k7] |
| `TradingPartner` | Trading Partner | text | empty | no | alphanumeric regex | “Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on Save | [kit:d1] |
| `Edit_OwnerName` | Owner Name | text | empty | yes | required | “Owner Name is a required field.” | on Save | [kit:d1] |
| `OwnerPhoneNumber` | Owner Phone | masked textbox (Kendo) | empty | yes | required; phone regex | “Owner Phone is a required field.”; “Enter Valid Phone Number.” | on Save | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `AddConfigModuleList` (`[kit:k8]`) | Owner Module | dropdown | “select a value...” | yes | options (30): same list as SearchModuleList | “Owner Module is a required field.” | on Save | [kit:k8] |
| `OwnerEmail` | Owner Email | text | empty | yes | required; email regex | “Owner Email is a required field.”; “Owner Email is not a valid email address. Enter email with 'name@domain' format.” | on Save | [kit:d1] |
| `RunSchedule_ID1` / `RunSchedule_ID2` | Run Weekly / Run Monthly | radio | `[UNKNOWN: default selection]` | yes | required | `[UNKNOWN: required message]` | on Save | [kit:d1] |
| `RunOnSunday`…`RunOnSaturday` | Sunday…Saturday | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `RunOnFirstDay` | Run On First Day Month | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `RunOnLastDay` | Run On Last Day Month | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `RunOnThisDayList` (`[kit:k9]`) | Run On This Day Month | dropdown | “select a value...” | no | options 1–31 | n/a | on Save | [kit:k9] |
| `TimeWindowStartList` (`[kit:k10]`) | Time Window Start | dropdown | “select a value...” | yes | options (48): 0000, 0030, 0100… | “Time Window Start is a required field.” | on Save | [kit:k10] |
| `TimeWindowEndList` (`[kit:k11]`) | Time Window End | dropdown | “select a value...” | yes | options (48): 0000, 0030, 0100… | “Time Window End is a required field.” | on Save | [kit:k11] |
| `SendNotification` | Send Notification | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `Suspended` | Suspend | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `IsActive` | Active | checkbox | checked | no | n/a | n/a | on Save | [kit:d1, asset:kit/states/dialog-d1.png] |
| Destination grid `[kit:k12]` | DestinationGrid | grid | empty | n/a | `[UNKNOWN: add/edit destination row behavior]` | `[UNKNOWN]` | n/a | [kit:k12] |
| `DestinationProtocolList` (`[kit:k13]`) | Destination Protocol | dropdown | “select a value...” | yes | options (4): FTP; SFTP; UNC; FTPS | “Destination Protocol is a required field.” | on Save | [kit:k13] |
| `FTPServer` (`[kit:k14]`) | Server | dropdown | “select a value...” | yes | options (4): Ranjan; SFTP DEV; SFTP TEST; SftpTest | “Server is a required field.” | on Save | [kit:k14] |
| `DestinationTypeList` (`[kit:k15]`) | Destination Type | dropdown | “select a value...” | yes | options (2): File to Event; User Defined | “Destination Type is a required field.” | on Save | [kit:k15] |
| `DestinationAddress` | Destination Address | text | empty | yes | required | “Destination Address is a required field.” | on Save | [kit:d1] |
| `ContractNameList` (`[kit:k16]`) | FTE Module Contract | dropdown | “select a value...” | no | options (21): (see kit) | `[UNKNOWN: required?]` | on Save | [kit:k16] |
| `FTEMetadataId` (`[kit:k17]`) | FTE Metadata | dropdown | “select a value...” | yes | options: `[UNKNOWN: list empty in capture]` | “FTE Metadata is a required field.” | on Save | [kit:k17] |
| `ContactName` | Contact Name | text | empty | no | invalid character regex | “Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| `ContactPhone` | Contact Phone | masked textbox (Kendo) | empty | no | phone regex | “Enter Valid Phone Number.” | on Save | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `ContactEmail` | Contact Email | text | empty | no | email regex | “Contact Email is not a valid email address. Enter email with 'name@domain' format.” | on Save | [kit:d1] |
| `OverwriteAtDestination` | Overwrite At Destination | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `CompressAtDestination` | Compress At Destination | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `DestinationIsArchive` | Destination Is Archive | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `RenameAtDestination` | Rename At Destination | checkbox | unchecked | no | n/a | n/a | on Save | [kit:d1] |
| `RenamePatternList` (`[kit:k18]`) | Rename Pattern | dropdown | “select a value...” | no | options (5): ORIG_<DATE>_<TIME>; <SAK>_<CRC32>_ORIG; <USER>_<SAK>_<CRC32>_ORIG; <SAK>_ORIG; <FILEID>_ORIG | “Rename Pattern is a required field.” `[UNKNOWN: required only in view dialog per kit harvest]` | on Save | [kit:k18] |

### 6.3 Dialog d2 — “View File Transfer Configuration” fields (read-only)
Dialog title: “View File Transfer Configuration”. [kit:d2]

Most fields in this dialog are `readOnly=true` in the kit harvest and render as read-only/disabled values. [kit:d2]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `eft_ConfigName` | Configuration Name | text (read-only) | populated | yes | required; alphanumeric regex | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].”; “Configuration Name is a required field.” | on Save (if editable) | [kit:d2] |
| `eft_ProtocolTypeList` (`[kit:k19]`) | Protocol | dropdown (read-only selection) | populated | yes | required | “Protocol is a required field.” | on Save (if editable) | [kit:k19] |
| `eft_FTPServerName` | Server | text (read-only) | populated | yes | required | “Server is a required field.” | on Save (if editable) | [kit:d2] |
| `eft_SourceAddress` | Source Address | text (read-only) | populated | yes | required | “Source Address is a required field.” | on Save (if editable) | [kit:d2] |
| `eft_SourceFileMask` | Source File Mask | text (read-only) | populated | yes | required | “Source File Mask is a required field.” | on Save (if editable) | [kit:d2] |
| `eft_FileDirectionList` (`[kit:k20]`) | File Direction | dropdown (read-only selection) | populated | no | n/a | n/a | n/a | [kit:k20] |
| `eft_TradingPartner` | Trading Partner | text (read-only) | populated | no | alphanumeric regex | “Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on Save (if editable) | [kit:d2] |
| `eft_OwnerName` | Owner Name | text (read-only) | populated | yes | required | “Owner Name is a required field.” | on Save (if editable) | [kit:d2] |
| `eft_OwnerPhoneNumber` | Owner Phone | masked textbox (Kendo, read-only) | populated | yes | required; phone regex | “Owner Phone is a required field.”; “Enter Valid Phone Number.” | on Save (if editable) | [kit:d2, UNKNOWN: kit has no maskedtextbox] |
| `eft_OwnerSubsystemList` (`[kit:k21]`) | Owner Module | dropdown (read-only selection) | populated | yes | required | “Owner Module is a required field.” | on Save (if editable) | [kit:k21] |
| `eft_OwnerEmail` | Owner Email | text (read-only) | populated | yes | required; email regex | “Owner Email is a required field.”; “Owner Email is not a valid email address. Enter email with 'name@domain' format.” | on Save (if editable) | [kit:d2] |
| `eft_RunOnThisDayList` (`[kit:k22]`) | Run On This Day Month | dropdown (read-only) | populated | no | n/a | n/a | n/a | [kit:k22] |
| `eft_TimeWindowStartList` (`[kit:k23]`) | Time Window Start | dropdown (read-only) | populated | yes | required | “Time Window Start is a required field.” | on Save (if editable) | [kit:k23] |
| `eft_TimeWindowEndList` (`[kit:k24]`) | Time Window End | dropdown (read-only) | populated | yes | required | “Time Window End is a required field.” | on Save (if editable) | [kit:k24] |
| Destination grid `[kit:k25]` | DestinationGrid | grid | populated | n/a | `[UNKNOWN: destination row interactions in view dialog]` | `[UNKNOWN]` | n/a | [kit:k25] |
| `viewDestinationProtocolList` (`[kit:k26]`) | Destination Protocol | dropdown (read-only) | populated | yes | required | “Destination Protocol is a required field.” | on Save (if editable) | [kit:k26] |
| `viewFTPServerList` (`[kit:k27]`) | Server | dropdown (read-only) | populated | yes | required | “Server is a required field.” | on Save (if editable) | [kit:k27] |
| `viewDestinationTypeList` (`[kit:k28]`) | Destination Type | dropdown (read-only) | populated | yes | required | “Destination Type is a required field.” | on Save (if editable) | [kit:k28] |
| `viewDestinationAddress` | Destination Address | text (read-only) | populated | yes | required | “Destination Address is a required field.” | on Save (if editable) | [kit:d2] |
| `viewContractNameList` (`[kit:k29]`) | FTE Module Contract | dropdown (read-only) | populated | yes | required | “FTE Module Contract is a required field.” | on Save (if editable) | [kit:k29] |
| `viewImportJobName` | FTE Metadata | text (read-only) | populated | yes | required | “FTE Metadata is a required field.” | on Save (if editable) | [kit:d2] |
| `viewContactName` | Contact Name | text (read-only) | populated | no | invalid character regex | “Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save (if editable) | [kit:d2] |
| `viewContactPhone` | Contact Phone | masked textbox (Kendo, read-only) | populated | no | phone regex | “Enter Valid Phone Number.” | on Save (if editable) | [kit:d2, UNKNOWN: kit has no maskedtextbox] |
| `viewContactEmail` | Contact Email | text (read-only) | populated | no | email regex | “Contact Email is not a valid email address. Enter email with 'name@domain' format.” | on Save (if editable) | [kit:d2] |
| `viewRenamePatternList` (`[kit:k30]`) | Rename Pattern | dropdown (read-only) | populated | yes | required | “Rename Pattern is a required field.” | on Save (if editable) | [kit:k30] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `resultsVisible` | boolean | false | Search action (`nextButton`) | shows/hides Search Results panel (`data-kit-h="h7"`) | [kit:k4] |
| `showInactives` | boolean | unchecked | toggling `FileTransferShowInactiveCheckBox` | filters grid results to include inactive items | [ctl:FileTransferShowInactiveCheckBox] |
| `addDialogOpen` | boolean | false | Create New action (`FileTransferGridAddButton`) | shows dialog `[kit:d1]` | [kit:d1] |
| `viewDialogOpen` | boolean | false | double-clicking first grid row | shows dialog `[kit:d2]` | [kit:d2] |

Hidden at load (facts §12):
None reported by the base capture; kit harvest uses `data-kit-h` for hidden helpers and the Search Results panel. [kit:k4]

## 8. Behavior
### 8.1 Search Criteria
- THE SYSTEM SHALL show the Search Criteria panel with criteria fields and action buttons (Reset / Cancel / Search). [asset:sections/02-pagebody.png]
- WHEN the user activates the “Search” action (`nextButton`) THE SYSTEM SHALL show the Search Results panel and populate the results grid. [ctl:nextButton, kit:k4, asset:kit/states/search.png]
- WHEN the user activates the “Reset” action (`resetButton`) THE SYSTEM SHALL reset Search Criteria fields to defaults. [ctl:resetButton, UNKNOWN: confirm whether Search Results are cleared]
- WHEN the user activates the “Cancel” action (`cancelButton`) THE SYSTEM SHALL perform the legacy Cancel behavior. [ctl:cancelButton, UNKNOWN: destination/behavior of Cancel]

### 8.2 Search Results
- WHILE `resultsVisible=true` THE SYSTEM SHALL show a “Search Results” panel beneath Search Criteria. [asset:kit/states/search.png]
- THE SYSTEM SHALL show a “Show Inactives” checkbox in the grid toolbar. [ctl:FileTransferShowInactiveCheckBox, asset:kit/states/search.png]
- THE SYSTEM SHALL render the results grid with paging (page size 10) and the columns: Configuration ID, Configuration Name, Protocol, Address, Mask, Owner Name, Owner Module, Status (and a hidden Fts Source Location Id). [kit:k4]
- WHEN the user double-clicks the first grid row THE SYSTEM SHALL open the View dialog `[kit:d2]` (single click selects the row). [kit:k4, kit:d2]

### 8.3 Create New dialog `[kit:d1]`
- WHEN the user activates “Create New” (`FileTransferGridAddButton`) THE SYSTEM SHALL open the “Add File Transfer Configuration” dialog. [ctl:FileTransferGridAddButton, kit:d1, asset:kit/states/dialog-d1.png]
- THE SYSTEM SHALL render the dialog fields and validation as defined by the kit harvest. [kit:d1]
- `[UNKNOWN]` The dialog has multiple action buttons (Reset/Cancel/Save and additional Destination section actions), but their exact behaviors and endpoints are not captured in base facts. [kit:d1]

### 8.4 View dialog `[kit:d2]`
- WHEN the View dialog is open THE SYSTEM SHALL show the configuration fields in read-only form (most fields `readOnly=true`). [kit:d2, asset:kit/states/dialog-d2.png]

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
| Search (`nextButton`) | GET `/api/FileTransfer/SearchFileTransfer/` (no params listed) | mock/stub response in rebuild; kit uses synthetic rows | populates grid `[kit:k4]` and reveals Search Results panel | [kit:k4] |
| Save (dialog d1) | `[UNKNOWN: legacy endpoint for saving a configuration]` | `[UNKNOWN]` | `[UNKNOWN]` | [kit:d1] |
| View details (dialog d2) | `[UNKNOWN: legacy endpoint for loading view dialog]` | `[UNKNOWN]` | `[UNKNOWN]` | [kit:d2] |

## 11. Accessibility
- Search criteria inputs use `<label for="...">` associations (e.g., `ConfigNameLabel` → `ConfigName`). [ctl:ConfigName]
- Each search criterion label includes a help icon (`fa-circle-question`) with a tooltip title matching the label (e.g., `ConfigIdHelp` title “Configuration ID”). [ctl:ConfigIdHelp]
- The Search Criteria collapse icon has `tabindex="0"` and title “Collapse”. [css:.content-panel-hdr-tools]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v3/screens/file-transfer-configuration/spec/parity.spec.ts` uses them.

Content-area / screen controls (in scope for this spec):
[ctl:FileTransferGridAddButton], [ctl:button-collapse], [ctl:text-configuration-id-configuration-i], [ctl:ConfigIdHelp], [ctl:ConfigName], [ctl:ConfigNameHelp], [ctl:OwnerName], [ctl:OwnerNameHelp], [ctl:combobox-owner-module], [ctl:button-select], [ctl:col-md-4_editor-colOwnerModuleHelp], [ctl:combobox-protocol-protocol], [ctl:button-select-2], [ctl:ProtocolHelp], [ctl:resetButton], [ctl:cancelButton], [ctl:nextButton].

Shared-shell / footer controls (out of scope; specified in the home spec but required on this route):
[ctl:pageBannerLogo], [ctl:button], [ctl:button-medicaid-management-solutions], [ctl:button-2], [ctl:AAGMenu.BroadcastMsg], [ctl:link-messages], [ctl:AAGMenu.ExternalLinks], [ctl:link-external-links], [ctl:AAGMenu.Favorites], [ctl:link-favorites], [ctl:AAGMenu.ContactUs], [ctl:link-contact-us], [ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:link-logout], [ctl:button-main-menu-2], [ctl:button-8], [ctl:activeModuleMenu], [ctl:activeModuleMenuFirstItem], [ctl:button-help], [ctl:button-21], [ctl:button-disclaimer], [ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy].

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v3/screens/file-transfer-configuration/spec/parity.spec.ts`

## 13. Open questions
1. What does “Cancel” do on this page (navigation destination and whether it prompts)? — answer from: screen JS or product owner. [UNKNOWN]
2. Does “Reset” clear Search Results and/or re-collapse/expand panels? — answer from: screen JS or product owner. [UNKNOWN]
3. What are the save endpoints and success/error behaviors for dialog d1 “Add File Transfer Configuration” (Save, Add Another, Create from Existing)? — answer from: backend/API spec or network capture. [UNKNOWN]
4. Does the Search Criteria chevron control actually collapse/expand the panel body, and is it the only toggle? — answer from: screen JS or capture exploration. [UNKNOWN]
5. What should maskedtextbox fields do (format/mask, cursor behavior) for Owner Phone / Contact Phone in dialogs? — answer from: kit upgrade (maskedtextbox support) or legacy UX guidance. [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL run the CSS animation `autoFillEnd` on input containers (duration 0s, delay 0s, iterations 1, easing `ease`). [M01]

