# UI SPEC — fxfer-v4/file-transfer-configuration

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive, jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file · `[js:…]` · `[css:selector]` · `[UNKNOWN: …]` · `[kit:<id>]` provider kit widget/dialog

## 1. Overview
File Transfer Configuration is a search/list screen for file transfer source-location configurations, with actions to create a new configuration and to view an existing configuration from the results grid. [asset:sections/02-pagebody.png]

Primary tasks:
- Search configurations using criteria (ID/name/owner module/protocol) and review results. [ctl:nextButton, kit:k4]
- Create a new file transfer configuration. [ctl:FileTransferGridAddButton, kit:d1]
- View an existing configuration by opening a results row. [kit:k4, kit:d2]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-file-transfer-configuration.png]

Page content area: `div#pageBody.row` containing `form#FileTransferSearchForm` (white background). [ctl:pageBody]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Page title | `h1#activeScreen` | 212,62,199,30 | sections/01 | left-aligned title in the green module bar | text “File Transfer Configuration” | [asset:sections/01-file-transfer-configuration.png] |
| Content root | `div#pageBody` | 0,139,1920,511 | sections/02 | stacks: Create New button row, Search Criteria panel; Search Results panel (hidden at load) | bg `rgb(255,255,255)` | [ctl:pageBody, asset:sections/02-pagebody.png] |
| Create New | `button#FileTransferGridAddButton` | 1729,139,146,38 | sections/02 | single button aligned to top-right | border `1px solid rgb(0, 98, 255)`, radius `4px`, padding `5px 30px` | [ctl:FileTransferGridAddButton, asset:sections/02-pagebody.png] |
| Search Criteria panel | `.content-panel-container` | 30,207,1860,389 | sections/02 | panel with header and body | border `1px solid rgb(222, 226, 230)`, radius `10px`, shadow `rgba(0, 0, 0, 0.08) 0px 8px 10px 1px` | [asset:sections/02-pagebody.png] |

### 2.1 Search Criteria panel
Panel header text is “Search Criteria” with a right-aligned collapse/expand chevron icon. [asset:sections/02-pagebody.png]

Inside the panel body:
- Field rows for Configuration ID, Configuration Name, Owner Name. [kit:k1, ctl:ConfigName, ctl:OwnerName]
- Field row for Owner Module and Protocol dropdowns. [kit:k2, kit:k3]
- Action buttons: Reset (left), Cancel + Search (right). [ctl:resetButton, ctl:cancelButton, ctl:nextButton]

### 2.2 Search Results panel (hidden at load)
The Search Results panel is present in the DOM but hidden at load (`style="display:none"`, `data-kit-h="h7"`). [asset:snapshot/rendered.html]

When shown (after a Search), it appears below Search Criteria and contains a results grid with a toolbar “Show Inactives” checkbox. [kit:k4, asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` | page body | [asset:facts.md] |
| `--font-size-body` | `14px` | most labels/text | [asset:facts.md] |
| `--color-text` | `rgb(61, 61, 61)` | primary body text | [asset:facts.md] |
| `--color-shell-bg` | `rgb(43, 58, 68)` | shell header/footer (shared shell) | [asset:facts.md] |
| `--color-accent-green` | `rgb(0, 238, 174)` | module/title bar background | [asset:sections/01-file-transfer-configuration.png] |
| `--color-link-blue` | `rgb(0, 98, 255)` | button borders / accents | [asset:sections/02-pagebody.png] |
| `--color-required-magenta` | `rgb(203, 26, 198)` | required-field star and “Required Fields (*)” legend | [asset:sections/02-pagebody.png] |
| `--radius-panel` | `10px` | content panels | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117×57 | “Client Logo” image | [asset:content.md] |
| `assets/_svg/svg-1.svg` | Owner Module dropdown caret icon | 18×16 | used inside `button.k-input-button` | [asset:content.md] |
| `assets/_svg/svg-2.svg` | Protocol dropdown caret icon | 18×16 | used inside `button.k-input-button` | [asset:content.md] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferConfigurationPage`
  - `SharedShell` *shared* — header/menu/footer (not specified here) [asset:sections/01-file-transfer-configuration.png]
  - `SearchCriteriaPanel` — fields §6 and actions §8 [asset:sections/02-pagebody.png]
  - `SearchResultsPanel` — results grid §6/§8 (hidden until Search) [kit:k4]
  - `AddFileTransferConfigurationDialog` — modal dialog d1 [kit:d1]
  - `ViewFileTransferConfigurationDialog` — modal dialog d2 [kit:d2]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `FileTransferConfigurationPage` | none | `resultsVisible` (derived from search) | `pageBody` | [ctl:pageBody] |
| `SearchCriteriaPanel` | current criteria values | none (kit owns widget state) | `ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList`, `resetButton`, `cancelButton`, `nextButton` | [kit:k1, kit:k2, kit:k3] |
| `SearchResultsPanel` | search results rows | selected row | `searchFileTransferConfigResultsPanel`, `FileTransferSearchGrid`, `FileTransferShowInactiveCheckBox` | [kit:k4] |
| `AddFileTransferConfigurationDialog` | none | form state | dialog `d1` | [kit:d1] |
| `ViewFileTransferConfigurationDialog` | selected row id | none (read-only view) | dialog `d2` | [kit:d2] |

## 6. Fields & validation
### 6.1 Search criteria (main page)
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ConfigId` | Configuration ID | numeric textbox | empty | no | max length 9; numeric-only (`^([0-9])*$`) | “Configuration ID has a maximum length of 9 characters.”; “Configuration ID is restricted to numeric characters only [0-9].” | [UNKNOWN: when validation is triggered on the search form] | [kit:k1] |
| `ConfigName` | Configuration Name | text | empty | no | regex: alphanumeric only | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | [UNKNOWN: when validation is triggered on the search form] | [asset:facts.md] |
| `OwnerName` | Owner Name | text | empty | no | regex: disallowed chars `; * ^ : ~ < > %` | “Owner Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | [UNKNOWN: when validation is triggered on the search form] | [asset:facts.md] |
| `SearchModuleList` | Owner Module | dropdown | `select a value...` | no | options (30): Administration; Auth Determination; Claims Management; Core; Correspondence Mgmt; Custom 01; Drug Rebate; Drug Rebate Portal; EDI; Employee Mgmt; File Transfer; Identity Management; Integration; Managed Care; Managed Care Portal; Member Management; Member Portal; Notifications; Plan Management; Program Integrity; Program Integrity CT; Provider Credentialing; Provider Enrollment; Provider Management; Provider Portal; Screening; Task Management; TPL Case Tracking; TPL HIPP; TPL Policy | — | — | [kit:k2] |
| `ProtocolList` | Protocol | dropdown | `select a value...` | no | options (4): FTP; SFTP; UNC; FTPS | — | — | [kit:k3] |

### 6.2 Add dialog — “Add File Transfer Configuration”
All dialog fields, dropdown option lists, and validation messages come from the provider kit harvest. [kit:d1]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `Edit_ConfigName` | Configuration Name | text | empty | yes | regex: alphanumeric only | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].”; “Configuration Name is a required field.” | on Save | [kit:d1] |
| `Description` | Description | text | empty | no | — | — | on Save | [kit:d1] |
| `ProtocolTypeList` | Protocol | dropdown | `select a value...` | yes | options (4): FTP; SFTP; UNC; FTPS | “Protocol is a required field.” | on Save | [kit:k5, kit:d1] |
| `FtsServerList` | Server | dropdown | `select a value...` | yes | options (4): Ranjan; SFTP DEV; SFTP TEST; SftpTest | “Please input required information and try again.” | on Save | [kit:k6, kit:d1] |
| `SourceAddress` | Source Address | text | empty | yes | required | “Source Address is a required field.” | on Save | [kit:d1] |
| `SourceFileMask` | Source File Mask | text | empty | yes | required | “Source File Mask is a required field.” | on Save | [kit:d1] |
| `FileDirectionList` | File Direction | dropdown | `select a value...` | no | options (2): INBOUND; OUTBOUND | — | on Save | [kit:k7, kit:d1] |
| `TradingPartner` | Trading Partner | text | empty | no | regex: alphanumeric only | “Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | on Save | [kit:d1] |
| `Edit_OwnerName` | Owner Name | text | empty | yes | required | “Owner Name is a required field.” | on Save | [kit:d1] |
| `OwnerPhoneNumber` | Owner Phone | masked textbox | empty | yes | regex (phone) | “Enter Valid Phone Number.”; “Owner Phone is a required field.” | on Save | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `AddConfigModuleList` | Owner Module | dropdown | `select a value...` | yes | options (30): Administration; Auth Determination; Claims Management; Core; Correspondence Mgmt; Custom 01; Drug Rebate; Drug Rebate Portal; EDI; Employee Mgmt; File Transfer; Identity Management; Integration; Managed Care; Managed Care Portal; Member Management; Member Portal; Notifications; Plan Management; Program Integrity; Program Integrity CT; Provider Credentialing; Provider Enrollment; Provider Management; Provider Portal; Screening; Task Management; TPL Case Tracking; TPL HIPP; TPL Policy | “Owner Module is a required field.” | on Save | [kit:k8, kit:d1] |
| `OwnerEmail` | Owner Email | text | empty | yes | regex (email) | “Owner Email is not a valid email address. Enter email with 'name@domain' format.”; “Owner Email is a required field.” | on Save | [kit:d1] |
| `RunSchedule_ID1` | Run Weekly | radio | [UNKNOWN: default selection] | yes | — | — | on Save | [kit:d1] |
| `RunSchedule_ID2` | Run Monthly | radio | [UNKNOWN: default selection] | yes | — | — | on Save | [kit:d1] |
| `RunOnSunday` | Sunday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnMonday` | Monday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnTuesday` | Tuesday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnWednesday` | Wednesday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnThursday` | Thursday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnFriday` | Friday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnSaturday` | Saturday | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnFirstDay` | Run On First Day Month | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnLastDay` | Run On Last Day Month | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RunOnThisDayList` | Run On This Day Month | dropdown | `select a value...` | no | options (31): 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13; 14; 15; 16; 17; 18; 19; 20; 21; 22; 23; 24; 25; 26; 27; 28; 29; 30; 31 | — | on Save | [kit:k9, kit:d1] |
| `TimeWindowStartList` | Time Window Start | dropdown | `select a value...` | yes | options (48): 0000; 0030; 0100; 0130; 0200; 0230; 0300; 0330; 0400; 0430; 0500; 0530; 0600; 0630; 0700; 0730; 0800; 0830; 0900; 0930; 1000; 1030; 1100; 1130; 1200; 1230; 1300; 1330; 1400; 1430; 1500; 1530; 1600; 1630; 1700; 1730; 1800; 1830; 1900; 1930; 2000; 2030; 2100; 2130; 2200; 2230; 2300; 2330 | “Time Window Start is a required field.” | on Save | [kit:k10, kit:d1] |
| `TimeWindowEndList` | Time Window End | dropdown | `select a value...` | yes | options (48): 0000; 0030; 0100; 0130; 0200; 0230; 0300; 0330; 0400; 0430; 0500; 0530; 0600; 0630; 0700; 0730; 0800; 0830; 0900; 0930; 1000; 1030; 1100; 1130; 1200; 1230; 1300; 1330; 1400; 1430; 1500; 1530; 1600; 1630; 1700; 1730; 1800; 1830; 1900; 1930; 2000; 2030; 2100; 2130; 2200; 2230; 2300; 2330 | “Time Window End is a required field.” | on Save | [kit:k11, kit:d1] |
| `SendNotification` | Send Notification | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `Suspended` | Suspend | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `IsActive` | Active | checkbox | [UNKNOWN: default checked state] | no | — | — | on Save | [kit:d1] |
| `DestinationShowInactiveCheckBox` | Show Inactives | checkbox | unchecked | no | — | — | — | [kit:k12, kit:d1] |
| `DestinationProtocolList` | Destination Protocol | dropdown | `select a value...` | yes | options (4): FTP; SFTP; UNC; FTPS | “Destination Protocol is a required field.” | on Save | [kit:k13, kit:d1] |
| `FTPServer` | Server | dropdown | `select a value...` | yes | options (4): Ranjan; SFTP DEV; SFTP TEST; SftpTest | [UNKNOWN: required message for Server in destination section] | on Save | [kit:k14, kit:d1] |
| `DestinationTypeList` | Destination Type | dropdown | `select a value...` | yes | options (2): File to Event; User Defined | “Destination Type is a required field.” | on Save | [kit:k15, kit:d1] |
| `DestinationAddress` | Destination Address | text | empty | yes | required | “Destination Address is a required field.” | on Save | [kit:d1] |
| `ContractNameList` | FTE Module Contract | dropdown | `select a value...` | no | options (21): Administration - Datalists; Claims Management; Direct Load SQL; Drug Rebate; Dummy Module - Don't use; External-Domain System; File Transfer Service; Financial Management; Integration - File To Event; Managed Care; Member Management - Member Information; Plan Management - Code Information; Plan Management - Grouping; Plan Management - Rate Setting; Plan Management - Related Information; Provider Enrollment; Provider Management; Provider Management - Integration; Test-Dummy Module-Don't use; TPL Case Tracking; TPL Policy | — | on Save | [kit:k16, kit:d1] |
| `FTEMetadataId` | FTE Metadata | dropdown | `select a value...` | yes | [UNKNOWN: option list not captured (0 options)] | [UNKNOWN: required message for FTE Metadata dropdown] | on Save | [kit:k17, kit:d1] |
| `ContactName` | Contact Name | text | empty | no | regex: disallowed chars `; * ^ : ~ < > %` | “Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | on Save | [kit:d1] |
| `ContactPhone` | Contact Phone | masked textbox | empty | no | regex (phone) | “Enter Valid Phone Number.” | on Save | [kit:d1, UNKNOWN: kit has no maskedtextbox] |
| `ContactEmail` | Contact Email | text | empty | no | regex (email) | “Contact Email is not a valid email address. Enter email with 'name@domain' format.” | on Save | [kit:d1] |
| `OverwriteAtDestination` | Overwrite At Destination | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `CompressAtDestination` | Compress At Destination | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `DestinationIsArchive` | Destination Is Archive | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RenameAtDestination` | Rename At Destination | checkbox | unchecked | no | — | — | on Save | [kit:d1] |
| `RenamePatternList` | Rename Pattern | dropdown | `select a value...` | no | options (5): ORIG_<DATE>_<TIME>; <SAK>_<CRC32>_ORIG; <USER>_<SAK>_<CRC32>_ORIG; <SAK>_ORIG; <FILEID>_ORIG | — | on Save | [kit:k18, kit:d1] |

### 6.3 View dialog — “View File Transfer Configuration”
This dialog is read-only (fields `readOnly=true`; many checkboxes disabled). [kit:d2]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `eft_ConfigName` | Configuration Name | text | (value from selected row) | yes | regex: alphanumeric only | “Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].”; “Configuration Name is a required field.” | [UNKNOWN: whether validation ever runs in read-only dialog] | [kit:d2] |
| `eft_ProtocolTypeList` | Protocol | dropdown | (selected value) | yes | options captured: FTP | “Protocol is a required field.” | — | [kit:k19, kit:d2] |
| `eft_FTPServerName` | Server | text | (value) | yes | required | “Server is a required field.” | — | [kit:d2] |
| `eft_SourceAddress` | Source Address | text | (value) | yes | required | “Source Address is a required field.” | — | [kit:d2] |
| `eft_SourceFileMask` | Source File Mask | text | (value) | yes | required | “Source File Mask is a required field.” | — | [kit:d2] |
| `eft_FileDirectionList` | File Direction | dropdown | (selected value) | no | [UNKNOWN: option list not captured] | — | — | [kit:k20, kit:d2] |
| `eft_TradingPartner` | Trading Partner | text | (value) | no | regex: alphanumeric only | “Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].” | — | [kit:d2] |
| `eft_OwnerName` | Owner Name | text | (value) | yes | required | “Owner Name is a required field.” | — | [kit:d2] |
| `eft_OwnerPhoneNumber` | Owner Phone | masked textbox | (value) | yes | regex (phone) | “Enter Valid Phone Number.”; “Owner Phone is a required field.” | — | [kit:d2, UNKNOWN: kit has no maskedtextbox] |
| `eft_OwnerSubsystemList` | Owner Module | dropdown | (selected value) | yes | options captured: Administration | “Owner Module is a required field.” | — | [kit:k21, kit:d2] |
| eft_RunOnThisDayList | Run On This Day Month | dropdown | (selected value) | no | [UNKNOWN: option list not captured] | — | — | [kit:k22, kit:d2] |
| `eft_OwnerEmail` | Owner Email | text | (value) | yes | regex (email) | “Owner Email is not a valid email address. Enter email with 'name@domain' format.”; “Owner Email is a required field.” | — | [kit:d2] |
| `eft_TimeWindowStartList` | Time Window Start | dropdown | (selected value) | yes | options captured: 0000 | “Time Window Start is a required field.” | — | [kit:k23, kit:d2] |
| `eft_TimeWindowEndList` | Time Window End | dropdown | (selected value) | yes | options captured: 0030 | “Time Window End is a required field.” | — | [kit:k24, kit:d2] |
| `viewDestinationProtocolList` | Destination Protocol | dropdown | (selected value) | yes | [UNKNOWN: option list not captured] | “Destination Protocol is a required field.” | — | [kit:k26, kit:d2] |
| `viewFTPServerList` | Server | dropdown | (selected value) | yes | [UNKNOWN: option list not captured] | “Server is a required field.” | — | [kit:k27, kit:d2] |
| `viewDestinationTypeList` | Destination Type | dropdown | (selected value) | yes | [UNKNOWN: option list not captured] | “Destination Type is a required field.” | — | [kit:k28, kit:d2] |
| `viewDestinationAddress` | Destination Address | text | (value) | yes | required | “Destination Address is a required field.” | — | [kit:d2] |
| `viewContractNameList` | FTE Module Contract | dropdown | (selected value) | yes | [UNKNOWN: option list not captured] | “FTE Module Contract is a required field.” | — | [kit:k29, kit:d2] |
| `viewImportJobName` | FTE Metadata | text | (value) | yes | required | “FTE Metadata is a required field.” | — | [kit:d2] |
| `viewContactName` | Contact Name | text | (value) | no | regex: disallowed chars `; * ^ : ~ < > %` | “Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.” | — | [kit:d2] |
| `viewContactPhone` | Contact Phone | masked textbox | (value) | no | regex (phone) | “Enter Valid Phone Number.” | — | [kit:d2, UNKNOWN: kit has no maskedtextbox] |
| `viewContactEmail` | Contact Email | text | (value) | no | regex (email) | “Contact Email is not a valid email address. Enter email with 'name@domain' format.” | — | [kit:d2] |
| `viewRenamePatternList` | Rename Pattern | dropdown | (selected value) | yes | [UNKNOWN: option list not captured] | “Rename Pattern is a required field.” | — | [kit:k30, kit:d2] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `resultsVisible` | ui | false | Search action | shows `searchFileTransferConfigResultsPanel` and grid `k4` | [asset:snapshot/rendered.html, kit:k4] |
| `addDialogOpen` | ui | false | Create New | shows dialog `d1` | [kit:d1] |
| `viewDialogOpen` | ui | false | double-click a result row | shows dialog `d2` | [kit:d2] |

Hidden at load (facts §18 / kit):
| element | shown when | evidence |
|---|---|---|
| `h1` validation summary container | [UNKNOWN: when the page shows a summary banner] | [asset:snapshot/rendered.html] |
| `h2` `#ConfigIdHelpDesc` | always hidden (aria help text) | [asset:snapshot/rendered.html] |
| `h3` `#ConfigNameHelpDesc` | always hidden (aria help text) | [asset:snapshot/rendered.html] |
| `h4` `#OwnerNameHelpDesc` | always hidden (aria help text) | [asset:snapshot/rendered.html] |
| `h5` `#col-md-4_editor-colOwnerModuleHelpDesc` | always hidden (aria help text) | [asset:snapshot/rendered.html] |
| `h6` `#ProtocolHelpDesc` | always hidden (aria help text) | [asset:snapshot/rendered.html] |
| `h7` `#searchFileTransferConfigResultsPanel` | after Search succeeds | [kit:k4, asset:snapshot/rendered.html] |

## 8. Behavior
### 8.1 Search criteria
- THE SYSTEM SHALL render the Search Criteria panel with fields Configuration ID, Configuration Name, Owner Name, Owner Module, and Protocol. [asset:sections/02-pagebody.png, kit:k1, kit:k2, kit:k3]
- WHEN the user clicks Search (`nextButton`) THE SYSTEM SHALL request search results and show the Search Results panel (`h7`). [ctl:nextButton, kit:k4]
- WHEN the user clicks Create New (`FileTransferGridAddButton`) THE SYSTEM SHALL open dialog “Add File Transfer Configuration”. [ctl:FileTransferGridAddButton, kit:d1]
- WHEN the user clicks Reset (`resetButton`) THE SYSTEM SHALL reset the search criteria to defaults. [ctl:resetButton, UNKNOWN: exact reset behavior not measured]
- WHEN the user clicks Cancel (`cancelButton`) THE SYSTEM SHALL leave this screen. [ctl:cancelButton, UNKNOWN: destination and whether it prompts]

### 8.2 Search results
- WHILE `resultsVisible` is false THE SYSTEM SHALL keep `#searchFileTransferConfigResultsPanel` hidden (`display:none`). [asset:snapshot/rendered.html]
- WHEN results are shown THE SYSTEM SHALL display grid columns: Configuration ID, Configuration Name, Protocol, Address, Mask, Owner Name, Owner Module, Status, Fts Source Location Id (hidden by default). [kit:k4, asset:snapshot/rendered.html]
- WHEN the user single-clicks a results row THE SYSTEM SHALL select the row. [kit:k4]
- WHEN the user double-clicks a results row THE SYSTEM SHALL open “View File Transfer Configuration” (dialog `d2`). [kit:k4, kit:d2]

### 8.3 Dialogs
- WHEN dialog `d1` is open THE SYSTEM SHALL show required-field indicators (magenta `*`) for required fields. [kit:d1, asset:kit/states/dialog-d1.png]
- WHEN dialog `d2` is open THE SYSTEM SHALL present fields as read-only and disable checkboxes (where `disabled=true`). [kit:d2, asset:kit/states/dialog-d2.png]
- THE SYSTEM SHALL render the Destination grid in `d1` with columns: Destination Address, Destination Protocol, Contact Name, Status, Active, Contact Phone, Contact Email, Overwrite At Destination, Compress At Destination, Destination Is Archive, Rename At Destination, Rename Pattern, Server, Destination Id, Destination Line Number, Is Added Updated, FTE Metadata, FTE Module Contract, Destination Type. [kit:k12, kit:d1]
- THE SYSTEM SHALL render the Destination grid in `d2` with columns: Destination Address, Destination Protocol, Contact Name, Status, Active. [kit:k25, kit:d2]

### 8.4 Scroll behavior
None. 

### 8.5 Media
None.

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `cancelButton` | [UNKNOWN: destination] | [UNKNOWN] | [ctl:cancelButton] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | GET `/api/FileTransfer/SearchFileTransfer/` (query params not captured) | kit services stub `search(values)` | shows Search Results panel and populates grid | [kit:k4] |
| Open Add dialog | POST `/FileTransfer/FileTransferConfigurationEdit/` (payload not captured) | kit services stub `save(dialog, values)` | save outcome [UNKNOWN: success message / error UI] | [kit:d1] |
| Fetch server/datalist for add dialog | GET `/api/FileTransfer/GetFtpServerDetails/` and GET `/api/FileTransfer/GetDataListData/` (params not captured) | kit services stubs | populates dropdowns | [kit:d1] |
| Open View dialog | GET `/FileTransfer/FileTransferConfigurationView/` (params not captured) | kit services stub `save/search` as needed | shows dialog `d2` for the selected row | [kit:d2] |

## 11. Accessibility
- Each field has a visible label in `.editor-label` and an associated input id/name (MVC unobtrusive pattern). [asset:snapshot/rendered.html]
- Help icons use tooltips (`data-role="tooltip"`, `data-kit-tip`) with hidden description spans (`h2`–`h6`). [asset:snapshot/rendered.html]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v4/screens/file-transfer-configuration/spec/parity.spec.ts` uses them.

Page content keys:
`pageBody`, `FileTransferSearchForm`, `FileTransferGridAddButton`, `ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList`, `resetButton`, `cancelButton`, `nextButton`, `searchFileTransferConfigResultsPanel`, `FileTransferSearchGrid`, `FileTransferShowInactiveCheckBox` [kit:k4]


### 12.1 Required controls (gate coverage)
The spec checker requires each control key below to be mentioned at least once. Shell-related controls are part of the shared Provider shell (see the home spec). [asset:facts.json]

| control key | note | evidence |
|---|---|---|
| `pageBannerLogo` | shared shell header logo area | [ctl:pageBannerLogo] |
| `button` | shared shell system name text element | [ctl:button] |
| `button-medicaid-management-solutions` | shared shell app title text element | [ctl:button-medicaid-management-solutions] |
| `button-2` | shared shell top nav menubar container | [ctl:button-2] |
| `AAGMenu.BroadcastMsg` | shared shell top nav menu item | [ctl:AAGMenu.BroadcastMsg] |
| `link-messages` | shared shell top nav link | [ctl:link-messages] |
| `AAGMenu.ExternalLinks` | shared shell top nav menu item | [ctl:AAGMenu.ExternalLinks] |
| `link-external-links` | shared shell top nav link | [ctl:link-external-links] |
| `AAGMenu.Favorites` | shared shell top nav menu item | [ctl:AAGMenu.Favorites] |
| `link-favorites` | shared shell top nav link | [ctl:link-favorites] |
| `AAGMenu.ContactUs` | shared shell top nav menu item | [ctl:AAGMenu.ContactUs] |
| `link-contact-us` | shared shell top nav link | [ctl:link-contact-us] |
| `AAGMenu.MyAccount` | shared shell top nav menu item | [ctl:AAGMenu.MyAccount] |
| `AAGMenu.Logout` | shared shell top nav menu item | [ctl:AAGMenu.Logout] |
| `link-logout` | shared shell top nav link | [ctl:link-logout] |
| `button-main-menu-2` | shared shell hamburger menu button | [ctl:button-main-menu-2] |
| `button-8` | shared shell module menu scroll wrapper | [ctl:button-8] |
| `activeModuleMenu` | shared shell active module menu | [ctl:activeModuleMenu] |
| `activeModuleMenuFirstItem` | shared shell module menu first item | [ctl:activeModuleMenuFirstItem] |
| `button-help` | page-level help/book icon | [ctl:button-help] |
| `FileTransferGridAddButton` | “Create New” button | [ctl:FileTransferGridAddButton] |
| `button-22` | Search Criteria panel toolbar icon (collapse/expand) | [ctl:button-22] |
| `button-collapse` | Search Criteria panel chevron button | [ctl:button-collapse] |
| `ConfigIdHelp` | “Configuration ID” help tooltip icon | [ctl:ConfigIdHelp] |
| `text-configuration-id-configuration-i` | Configuration ID text input (numeric widget inner input) | [ctl:text-configuration-id-configuration-i] |
| `ConfigNameHelp` | “Configuration Name” help tooltip icon | [ctl:ConfigNameHelp] |
| `ConfigName` | Configuration Name input | [ctl:ConfigName] |
| `OwnerNameHelp` | “Owner Name” help tooltip icon | [ctl:OwnerNameHelp] |
| `OwnerName` | Owner Name input | [ctl:OwnerName] |
| `col-md-4_editor-colOwnerModuleHelp` | “Owner Module” help tooltip icon | [ctl:col-md-4_editor-colOwnerModuleHelp] |
| `combobox-owner-module` | Owner Module dropdown widget root | [ctl:combobox-owner-module] |
| `button-select` | Owner Module dropdown caret button | [ctl:button-select] |
| `ProtocolHelp` | “Protocol” help tooltip icon | [ctl:ProtocolHelp] |
| `combobox-protocol-protocol` | Protocol dropdown widget root | [ctl:combobox-protocol-protocol] |
| `button-select-2` | Protocol dropdown caret button | [ctl:button-select-2] |
| `resetButton` | Reset button | [ctl:resetButton] |
| `cancelButton` | Cancel button | [ctl:cancelButton] |
| `nextButton` | Search button | [ctl:nextButton] |
| `button-disclaimer` | footer link/button: Disclaimer | [ctl:button-disclaimer] |
| `button-website-requirements` | footer link/button: Website Requirements | [ctl:button-website-requirements] |
| `button-privacy-policy` | footer link/button: Privacy Policy | [ctl:button-privacy-policy] |
| `button-cookie-policy` | footer link/button: Cookie Policy | [ctl:button-cookie-policy] |
Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v4/screens/file-transfer-configuration/spec/parity.spec.ts`

## 13. Open questions
1. What does Cancel do on this screen (destination route, and does it warn about dirty state)? [UNKNOWN]
2. What exact UI appears when Search is submitted with invalid criteria (e.g., empty criteria) — inline messages vs summary (`h1`)? [UNKNOWN]
3. Masked textbox behavior (Owner Phone, Contact Phone) is not rebuilt by the kit; should the rebuild implement masking or keep static markup? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL run CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1, easing `ease`) on the captured elements (no visible motion). [M01]

