# UI SPEC ? fxfer-v3/file-transfer-tracking

> Source https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with mvcUnobtrusive + jQuery 3.7.1 ? target React 19
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` ? `[js:?]` ? `[aspx:?]` ? `[css:selector]` ? `[kit:kN]` ? `[UNKNOWN: ?]`

## 1. Overview
File Transfer Tracking lets a portal user search for file transfer tracking records using criteria (IDs, status/direction, date/time range, size range), and view the matching results in a grid. [asset:sections/02-pagebody.png]

Primary tasks:
- Search for file transfers matching the entered criteria. [ctl:nextButton]
- Review results in the Search Results grid (sortable columns, paging). [kit:k9]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-file-transfer-tracking.png]

Content area: `#pageBody > main` (fluid, white background). [ctl:main]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---:|---|---|---|---|
| Content root | `main` | 0,138.5,1920,628 | sections/02 | block | background `rgb(255,255,255)` | [ctl:main, asset:sections/02-pagebody.png] |
| Search Criteria panel | `.content-panel-container` | 30,138.5,1860,574 | sections/02 | panel | 1px border `rgb(222,226,230)`, radius 10px, shadow `rgba(0,0,0,0.08) 0px 8px 10px 1px` | [asset:sections/02-pagebody.png] |
| Panel header | `.content-panel-hdr` | 31,139.5,1858,48 | sections/02 | flex row | bg `rgb(250,250,250)`, radius `10px 10px 0 0`, padding `12px 24px` | [asset:sections/02-pagebody.png] |
| Panel body | `searchFileTrackingPanel` | 31,196.5,1858,500 | sections/02 | form grid | contains fields + action buttons row | [ctl:searchFileTrackingPanel, asset:sections/02-pagebody.png] |
| Action buttons row | `modelEditorButtonRow` | 41,636.5,1838,48 | sections/02 | row | left: Reset; right: Cancel + Search | [ctl:modelEditorButtonRow, asset:sections/02-pagebody.png] |

### 2.1 Search Criteria panel
- Header text: ?Search Criteria?, with a collapse chevron at the top-right. [asset:sections/02-pagebody.png]
- ?Required Fields ( * )? legend appears at the top-right of the panel body (magenta text). [asset:sections/02-pagebody.png]
- Fields are presented as labeled inputs with a blue help icon (question mark in a circle) next to each label. [asset:sections/02-pagebody.png]

### 2.2 Search Results panel (hidden at load)
The Search Results panel is hidden at initial load and becomes visible after running Search. [kit:k9]

- Title: ?Search Results?. [asset:kit/states/search.png]
- Contains a Kendo grid (paging, sortable columns). [kit:k9]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `14px Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` | labels, inputs, grid text | [asset:sections/02-pagebody.png] |
| `--color-text` | `rgb(61, 61, 61)` | panel/header/body text | [asset:sections/02-pagebody.png] |
| `--color-panel-border` | `rgb(222, 226, 230)` | panel border | [asset:sections/02-pagebody.png] |
| `--color-panel-header-bg` | `rgb(250, 250, 250)` | panel header background | [asset:sections/02-pagebody.png] |
| `--radius-panel` | `10px` | panel corners | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---:|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | client logo (shell) | 117?57 | | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | dropdown caret icon (File Status) | 18?16 | | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | dropdown caret icon (Direction) | 18?16 | | [asset:assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | dropdown caret icon (Transport Type) | 18?16 | | [asset:assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | dropdown caret icon (Source Location) | 18?16 | | [asset:assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | calendar icon (From Date) | 18?16 | | [asset:assets/_svg/svg-5.svg] |
| `assets/_svg/svg-6.svg` | clock icon (From Date) | 18?16 | | [asset:assets/_svg/svg-6.svg] |
| `assets/_svg/svg-7.svg` | calendar icon (To Date) | 18?16 | | [asset:assets/_svg/svg-7.svg] |
| `assets/_svg/svg-8.svg` | clock icon (To Date) | 18?16 | | [asset:assets/_svg/svg-8.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `FileTransferTrackingPage`
  - `SearchCriteriaPanel`
    - Text inputs: File ID, File Name, Trading Partner ID [ctl:FileId]
    - Dropdowns (kit widgets): File Status, Direction, Transport Type, Source Location [kit:k1]
    - Date-time pickers (kit widgets): From Date, To Date [kit:k5]
    - Numeric inputs (kit widgets): From Size (KB), To Size (KB) [kit:k7]
    - Buttons: Reset, Cancel, Search [ctl:resetButton]
  - `SearchResultsPanel` (hidden until Search)
    - Results grid (kit widget) [kit:k9]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | search criteria field values | criteria values | `FileId`, `FileName`, `FileStatusList`, `DirectionList`, `TransportTypeList`, `SourceLocation`, `TradingPartnerId`, `FromDate`, `ToDate`, `FromSize`, `ToSize`, `resetButton`, `cancelButton`, `nextButton` | [asset:sections/02-pagebody.png, kit:k1] |
| `SearchResultsPanel` | search results rows | paging/sort | `searchFileTrackingResultsPanel`, `fileTrackingResultsGrid` | [asset:kit/states/search.png, kit:k9] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FileId` | File ID | text | empty | no | max length 50; regex `^([^;*^:~<>%])*$` | ?File ID has a maximum length of 50 characters.?; ?File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.? | [UNKNOWN: validation trigger] | [ctl:FileId] |
| `FileName` | File Name | text | empty | no | max length 100; regex `^([^;*^:~<>%])*$` | ?File Name has a maximum length of 100 characters.?; ?File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.? | [UNKNOWN: validation trigger] | [ctl:FileName] |
| `FileStatusList` | File Status | dropdown (kit) | ?select a value...? | no | options: Complete, Error, Transferring |  | [UNKNOWN: validation trigger] | [kit:k1, asset:kit/states/dropdown.png] |
| `DirectionList` | Direction | dropdown (kit) | ?select a value...? | no | options: INBOUND, OUTBOUND |  | [UNKNOWN: validation trigger] | [kit:k2] |
| `TransportTypeList` | Transport Type | dropdown (kit) | ?select a value...? | no | options: FTP, SFTP, UNC, FTPS |  | [UNKNOWN: validation trigger] | [kit:k3] |
| `SourceLocation` | Source Location | dropdown (kit) | ?select a value...? | no | option list is not present in the capture | [UNKNOWN: Source Location options source + list] | [UNKNOWN: validation trigger] | [kit:k4] |
| `TradingPartnerId` | Trading Partner ID | text | empty | no | max length 25; regex `^([^;*^:~<>%])*$` | ?Trading Partner ID has a maximum length of 25 characters.?; ?Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.? | [UNKNOWN: validation trigger] | [ctl:TradingPartnerId] |
| `FromDate` | From Date | datetime (kit) | empty | no | datetime format `M/d/yyyy h:mm tt` | ?The field From Date must be a date.?; ?From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'.? | [UNKNOWN: validation trigger] | [kit:k5] |
| `ToDate` | To Date | datetime (kit) | empty | no | datetime format `M/d/yyyy h:mm tt` | ?The field To Date must be a date.?; ?To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'.? | [UNKNOWN: validation trigger] | [kit:k6] |
| `FromSize` | From Size (KB) | numeric (kit) | empty | no | max length 15; numeric with up to 2 decimals; regex `^[+-]?(?=\d|\.\d{0,2})\d*(\.\d{0,2})?$` | ?From Size (KB) has a maximum length of 15 characters.?; ?From Size (KB) is restricted to numeric values with at most 2 decimal places.? | [UNKNOWN: validation trigger] | [kit:k7, ctl:FromSize] |
| `ToSize` | To Size (KB) | numeric (kit) | empty | no | max length 15; numeric with up to 2 decimals; regex `^[+-]?(?=\d|\.\d{0,2})\d*(\.\d{0,2})?$` | ?To Size (KB) has a maximum length of 15 characters.?; ?To Size (KB) is restricted to numeric values with at most 2 decimal places.? | [UNKNOWN: validation trigger] | [kit:k8, ctl:ToSize] |

- IF `FileId` contains disallowed characters THEN THE SYSTEM SHALL show the message ?File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.? [ctl:FileId]
- IF `FromSize` is not a number with at most 2 decimal places THEN THE SYSTEM SHALL show the message ?From Size (KB) is restricted to numeric values with at most 2 decimal places.? [ctl:FromSize]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `results_visible` | boolean | false | Search button (`nextButton`) | shows/hides the Search Results panel (`searchFileTrackingResultsPanel`) | [kit:k9] |
| `criteria_collapsed` | boolean | false | collapse control in Search Criteria header | shows/hides the Search Criteria panel body | [ctl:button-collapse] |

Hidden at load (kit `data-kit-h`):
| element | shown when | evidence |
|---|---|---|
| `h1` | never (empty placeholder) | [kit:k9] |
| `FileIdHelpDesc` (`h2`) | never (hidden help text for aria-labelledby) | [ctl:FileId] |
| `FileNameHelpDesc` (`h3`) | never (hidden help text for aria-labelledby) | [ctl:FileName] |
| `FileStatusHelpDesc` (`h4`) | never (hidden help text for aria-labelledby) | [kit:k1] |
| `DirectionHelpDesc` (`h5`) | never (hidden help text for aria-labelledby) | [kit:k2] |
| `TransportTypeHelpDesc` (`h6`) | never (hidden help text for aria-labelledby) | [kit:k3] |
| `SourceLocationIdHelpDesc` (`h7`) | never (hidden help text for aria-labelledby) | [kit:k4] |
| `TradingPartnerIdHelpDesc` (`h8`) | never (hidden help text for aria-labelledby) | [ctl:TradingPartnerId] |
| `FromDateHelpDesc` (`h9`) | never (hidden help text for aria-labelledby) | [kit:k5] |
| `ToDateHelpDesc` (`h10`) | never (hidden help text for aria-labelledby) | [kit:k6] |
| `FromSizeHelpDesc` (`h11`) | never (hidden help text for aria-labelledby) | [kit:k7] |
| `ToSizeHelpDesc` (`h12`) | never (hidden help text for aria-labelledby) | [kit:k8] |
| `searchFileTrackingResultsPanel` (`h13`) | after Search | [kit:k9] |

## 8. Behavior
### 8.1 Search Criteria
- THE SYSTEM SHALL show the Search Criteria panel expanded by default. [asset:sections/02-pagebody.png]
- WHEN the user activates `nextButton` (Search) THE SYSTEM SHALL reveal the Search Results panel and populate the results grid from the search endpoint. [kit:k9, asset:kit/states/search.png]
- WHEN the user activates `resetButton` (Reset) THE SYSTEM SHALL [UNKNOWN: clear behavior for Reset on this screen]. [ctl:resetButton]
- WHEN the user activates `cancelButton` (Cancel) THE SYSTEM SHALL [UNKNOWN: destination / effect of Cancel on this screen]. [ctl:cancelButton]
- WHEN the user activates `button-collapse` THE SYSTEM SHALL toggle the Search Criteria panel body between expanded and collapsed. [ctl:button-collapse]

### 8.2 Search Results grid
- WHILE the Search Results grid has no rows THE SYSTEM SHALL display the message ?No items to display?. [asset:kit/states/search.png, kit:k9]
- THE SYSTEM SHALL show the following grid columns, left to right (sortable where indicated): File ID (sortable), File Name (sortable), File Status (sortable), Direction (sortable), Transport Type (not sortable), Size (KB) (sortable), Create Date (sortable), Trading Partner ID (sortable). [kit:k9]
- THE SYSTEM SHALL page the grid with page size 10 by default, with page size options 5, 10, 20, and a refresh control in the pager. [kit:k9]

### 8.3 Scroll behavior
None. [ctl:pageBody]

### 8.4 Media
None. [ctl:pageBody]

## 9. Navigation
None. [ctl:pageBody]

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response ? UI | evidence |
|---|---|---|---|---|
| Search (`nextButton`) | GET `/api/FileTransfer/SearchFileTransferTracking/` (fields: [UNKNOWN]) | call same endpoint via the generated services module | response rows populate the Search Results grid (`k9`) | [kit:k9] |

## 11. Accessibility
- Each field input uses `aria-labelledby` to point to its label id (e.g. `FileIdLabel`) and a hidden help description span (e.g. `FileIdHelpDesc`). [ctl:FileId]
- Field labels have a help icon with `title` and tooltip behavior (Provider kit). [asset:sections/02-pagebody.png]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v3/screens/file-transfer-tracking/spec/parity.spec.ts` uses them. [ctl:pageBody]

Controls covered by this spec (including the shared shell wrapper):
[ctl:pageBannerLogo, ctl:button, ctl:button-medicaid-management-solutions, ctl:button-2, ctl:AAGMenu.BroadcastMsg, ctl:link-messages, ctl:AAGMenu.ExternalLinks, ctl:link-external-links, ctl:AAGMenu.Favorites, ctl:link-favorites, ctl:AAGMenu.ContactUs, ctl:link-contact-us, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-logout, ctl:button-main-menu-2]
[ctl:button-8, ctl:activeModuleMenu, ctl:activeModuleMenuFirstItem, ctl:button-help, ctl:button-21, ctl:FileIdHelp, ctl:FileNameHelp, ctl:FileStatusHelp, ctl:combobox-file-status-file-status, ctl:button-select, ctl:DirectionHelp, ctl:combobox-direction-direction, ctl:button-select-2, ctl:TransportTypeHelp, ctl:combobox-transport-type-transport-type]
[ctl:button-select-3, ctl:SourceLocationIdHelp, ctl:combobox-source-location-source-location, ctl:button-select-4, ctl:TradingPartnerIdHelp, ctl:FromDateHelp, ctl:FromDate, ctl:button-open-the-date-view, ctl:button-open-the-time-view, ctl:ToDateHelp, ctl:ToDate, ctl:button-open-the-date-view-2, ctl:button-open-the-time-view-2, ctl:FromSizeHelp]
[ctl:text-from-size-kb-from-size-kb, ctl:ToSizeHelp, ctl:text-to-size-kb-to-size-kb, ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy]
Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v3/screens/file-transfer-tracking/spec/parity.spec.ts`

```txt
09d28dca-1eab-45c2-af10-4b7953b378a6
0c095a4f-46a9-40b0-a1ad-0f8ead18a8b1
1125123c-8efc-45bb-b26e-b19595636f18
1eac682e-15ba-43b3-8786-2cba26cff093
268bef93-d493-406a-b380-5f946cf1f85d
277e6215-99a6-4a0a-8d23-3b0a14cc4751
2f1eb7dc-bf9e-40d6-8a97-2a24f6d7c797
38f525d1-1a0e-4608-a245-f141db25d4ff
4207221c-977f-44c6-9cd4-7cae6ee97d2d
48a28426-f442-461c-ba8b-dba0593d9981
4d82dbae-f2f6-4b4c-b83c-64f631da510e
4f95ce43-13a6-45a2-89f6-8b1ddeeb30fd-list
522ebd79-089f-404a-b632-4e6aa7165733
6d99be03-5267-4940-8690-b5a3cf3655ac
6db05de7-a160-46ef-8a02-b45acb5232a3
89ba9145-51ef-4160-870a-0611181cb318
96ac8067-6039-4c19-8bde-d9ea2b212b4b
97432409-2430-47ff-b590-e46bb634b20c
9c7c782f-0377-48dc-9979-486f23840ceb
AAGMenu.BroadcastMsg
AAGMenu.BroadcastMsg_mbl
AAGMenu.ContactUs
AAGMenu.ContactUs_mbl
AAGMenu.ExternalLinks
AAGMenu.ExternalLinks_mbl
AAGMenu.Favorites
AAGMenu.Favorites_mbl
AAGMenu.Logout
AAGMenu.Logout_mbl
AAGMenu.MyAccount
AAGMenu.MyAccount_mbl
Audit
CloseBroadcastMsgPanel
DirectionHelp
DirectionList
DirectionList-list
ExternalLinksClose
FavoritesClose
FileId
FileIdHelp
FileName
FileNameHelp
FileStatusHelp
FileStatusList
FileStatusList-list
FromDate
FromDateHelp
FromDate_option_selected
FromDate_timeview
FromSize
FromSizeHelp
Help
HideCoreBroadcastMsgBody
HideCoreContactUsBody
HideFavoritesBody
IntContactUsClose
MCBMenu.Audit
MCBMenu.MITASteps
MCBMenu.Mail
MCBMenu.Notes
MCBMenu.PageHelp
MCBMenu.PrintPreview
MCBMenu.RelatedPages
MCBMenu.Reports
MCBMenu.ReportsLetters
MCBMenu.ReturnToProvider
MCBMenu.SetPanelTabs
MCBMenu.ViewData
Mail
MinusSquareAudit
MinusSquareMail
MinusSquareNotes
MinusSquarePrintPreview
MinusSquareReports
Notes
PlusSquareAudit
PlusSquareMail
PlusSquareNotes
PlusSquarePrintPreview
PlusSquareReports
PrintPreview
RTP
Reports
ShowCoreBroadcastMsgBody
ShowCoreContactUsBody
ShowFavoritesBody
SourceLocation
SourceLocation-list
SourceLocationIdHelp
ToDate
ToDateHelp
ToDate_option_selected
ToDate_timeview
ToSize
ToSizeHelp
TradingPartnerId
TradingPartnerIdHelp
TransportTypeHelp
TransportTypeList
TransportTypeList-list
a3e899f2-cc17-40d5-9833-d218fb0e3ab2
a7a2ad46-a710-468a-9e08-983d8a7b1657
acknowledgedMsgButton
activeModuleMenu
activeModuleMenuFirstItem
alt1Button
alt2Button
alt3Button
alt4Button
alt5Button
alt6Button
alt7Button
alt8Button
auditClose
auditHelp
b6540b97-2b2e-4f06-82e7-b1326cb5d020
b7c022dd-4079-455e-a7d6-3a80e6b332d5
b80a469f-7865-4c9f-b2e8-37f451c30ec9
bcedc9f0-bb25-445e-8920-27519d9ac0d2
button
button-1-00-am
button-1-00-pm
button-1-30-am
button-1-30-pm
button-10
button-10-00-am
button-10-00-pm
button-10-30-am
button-10-30-pm
button-11
button-11-00-am
button-11-00-pm
button-11-30-am
button-11-30-pm
button-12
button-12-00-am
button-12-00-pm
button-12-30-am
button-12-30-pm
button-13
button-14
button-15
button-16
button-17
button-18
button-19
button-2
button-2-00-am
button-2-00-pm
button-2-30-am
button-2-30-pm
button-20
button-21
button-22
button-23
button-24
button-25
button-26
button-3
button-3-00-am
button-3-00-pm
button-3-30-am
button-3-30-pm
button-340b-providers
button-4
button-4-00-am
button-4-00-pm
button-4-30-am
button-4-30-pm
button-5
button-5-00-am
button-5-00-pm
button-5-30-am
button-5-30-pm
button-6
button-6-00-am
button-6-00-pm
button-6-30-am
button-6-30-pm
button-7
button-7-00-am
button-7-00-pm
button-7-30-am
button-7-30-pm
button-8
button-8-00-am
button-8-00-pm
button-8-30-am
button-8-30-pm
button-9
button-9-00-am
button-9-00-pm
button-9-30-am
button-9-30-pm
button-absent-parent
button-administration-broadcast-message
button-alert-notification-event-configu
button-analysis-review
button-average-expenditure
button-base-id-termination-transactions
button-broadcast-message
button-broker-sales-tpa
button-bulk-load
button-bulk-recall
button-bulk-transactions-within-base-id
button-capitation
button-carrier
button-carrier-crosswalk-rule
button-case
button-case-2
button-case-request
button-ccn-list
button-ccn-ndc-association
button-change-of-ownership-transactions
button-claim-level-detail
button-claims-management-search-claims-
button-clia-numbers
button-close
button-close-2
button-close-3
button-close-4
button-close-5
button-close-6
button-close-7
button-close-8
button-collapse
button-complete
button-contact
button-contact-2
button-cookie-policy
button-credentialing-application-review
button-custom-peer-groups
button-dashboard
button-dashboard-2
button-dashboard-3
button-dashboard-4
button-dashboard-5
button-dashboard-6
button-dashboard-7
button-decrease-value
button-decrease-value-2
button-desktop-review-upload
button-disclaimer
button-disputes-list
button-drug-rebate-dashboard-labeler-nd
button-eft-enrollments
button-employer
button-ep-workflow-transactions
button-error
button-event-configuration
button-event-status-tracking
button-event-subscription
button-event-to-file-query-builder
button-faq-s
button-file-to-event-metadata
button-file-to-event-orchestration
button-file-transfer-configuration
button-file-transfer-configuration-2
button-file-transfer-services-file-tran
button-file-transfer-tracking
button-file-transfer-tracking-2
button-file-upload
button-file-upload-2
button-file-upload-download-search
button-fraud-protection
button-ftp
button-ftp-server-credentials
button-ftp-server-credentials-2
button-ftps
button-fulfillment-materials
button-fund-codes
button-go-to-the-first-page
button-go-to-the-last-page
button-go-to-the-next-page
button-go-to-the-previous-page
button-group
button-help
button-help-2
button-hipaa-transactions
button-inbound
button-increase-value
button-increase-value-2
button-incremental-adjustments
button-intake
button-integration-event-to-file-query-
button-invoice-management
button-invoice-process-flags
button-irs-w-9-tax-ids
button-labeler
button-letter-template
button-link-configuration
button-lock-out
button-main-menu
button-main-menu-2
button-manage-application-settings
button-manage-assignment-permissions
button-manage-case-assignment-permissio
button-manage-configurations
button-manage-cycles
button-manage-help
button-manage-html-blocks
button-manage-images
button-manage-ioc-settings
button-manage-labels
button-manage-menu-items
button-manage-menus
button-manage-messages
button-manage-module-events
button-manage-security-functions
button-manage-security-rights
button-manage-security-roles
button-manage-services
button-manage-subscriptions
button-manage-user-association
button-manage-user-invitations
button-manage-user-schedule
button-manage-users
button-managed-care-entities
button-managed-care-mce-member-network-
button-mass-carrier-migration
button-mass-change-transactions
button-mass-transfer
button-mce
button-mco-enrollment-list
button-medicaid-case
button-medicaid-management-solutions
button-member
button-member-2
button-member-3
button-member-management-member-medicai
button-member-quick-view
button-ndc
button-ndc-invoice-inquiry
button-network
button-new-enrollment-entry
button-non-covered-code
button-nppr-transactions
button-open-in-separate-window
button-open-in-separate-window-2
button-open-in-separate-window-3
button-open-in-separate-window-4
button-open-in-separate-window-5
button-open-in-separate-window-6
button-open-the-date-view
button-open-the-date-view-2
button-open-the-time-view
button-open-the-time-view-2
button-outbound
button-owners-and-managing-employees
button-page-0
button-page-elements-widgets
button-person
button-pharmacy-related-data
button-pi-case-tracking-dashboard-case-
button-plan-management-reference-data-p
button-policy
button-policyholder
button-postmark-dates
button-ppa-maintenance
button-predictive-model-definition
button-privacy-policy
button-prn-transactions
button-pro-dur
button-program-integrity-dashboard-mana
button-provider
button-provider-dashboard
button-provider-enrollment-dashboard-se
button-provider-management-providers-ow
button-provider-mce-enrollment
button-provider-recoupment
button-provider-summary
button-providers
button-rate-setting
button-reference-data
button-reference-data-2
button-related-data
button-reports
button-resume-enrollment-entry
button-review-types
button-rosi-pqas-list
button-routing-configuration
button-screening-credentialing-dashboar
button-screening-results
button-search
button-search-audit-history
button-search-claims
button-search-desktop-review
button-search-enrollment-application
button-search-enrollment-reports
button-search-hipp
button-select
button-select-2
button-select-3
button-select-4
button-select-5
button-select-a-value-completeerrortran
button-select-a-value-ftpsftpuncftpsno-
button-select-a-value-inboundoutboundno
button-select-a-value-no-data-found
button-service-types
button-sftp
button-study-analysis-catalog
button-study-request
button-subscriber-configuration
button-supercase
button-suppressed-entities
button-system-process-tracking
button-t-bill-rates
button-targeted-query-definition
button-task-list
button-task-management-dashboard-task-t
button-task-template
button-tpl-case-tracking-case-contact-d
button-tpl-hipp-search-hipp-average-exp
button-tpl-policy-carrier-employer-poli
button-tpl-policy-intake
button-tpl-policy-letters
button-tracking
button-transferring
button-ui-examples-page-elements-widget
button-unc
button-user-information
button-web-information
button-website-requirements
button-worker-compensation-intake
button-workflow-applications
button-workflow-configuration
button-workflow-dashboard
button-workflow-items
button-workflow-tasks
c5029e0b-f1af-49f3-aa24-211b01a1bedb
c8381217-2938-4455-b9e6-56f97b217e4a
cancelButton
cfd83d26-470e-4f4c-9ed3-7efed4038881
combobox-direction-direction
combobox-file-status-file-status
combobox-page-sizes-drop-down
combobox-source-location-source-location
combobox-transport-type-transport-type
curMsgButton
da9d7757-4d8e-4ebf-bf76-92fa44bcc796
daae215c-38da-4f7a-bc72-36c2ad9bc656
df31b436-b446-4edb-9ae3-ba22bdfbfeb2
divExternalLinksBody
ef48e871-3932-4b5d-8bb6-a9fc85aa1589
extLinksCloseButton
f4f5af30-dfc8-4a4c-b8ca-a88d6fc761a8
fd109d66-823b-4429-a320-30b34abb6184
intPortalContactUsCloseButton
link-340b-providers
link-absent-parent
link-analysis-review
link-average-expenditure
link-back-to-top
link-back-to-top-2
link-back-to-top-3
link-back-to-top-4
link-base-id-termination-transactions
link-broadcast-message
link-broker-sales-tpa
link-bulk-load
link-bulk-recall
link-bulk-transactions-within-base-id
link-capitation
link-carrier
link-carrier-crosswalk-rule
link-case
link-case-2
link-case-request
link-ccn-list
link-ccn-ndc-association
link-change-of-ownership-transactions
link-claim-level-detail
link-claims-management
link-clia-numbers
link-client-logo
link-cms
link-contact
link-contact-2
link-contact-us
link-contact-us-2
link-credentialing-application-review
link-custom-peer-groups
link-dashboard
link-dashboard-2
link-dashboard-3
link-dashboard-4
link-dashboard-5
link-dashboard-6
link-dashboard-7
link-desktop-review-upload
link-disputes-list
link-drug-rebate
link-eft-enrollments
link-employer
link-ep-workflow-transactions
link-event-configuration
link-event-status-tracking
link-event-subscription
link-event-to-file-query-builder
link-external-links
link-external-links-2
link-faq-s
link-favorites
link-favorites-2
link-file-to-event-metadata
link-file-to-event-orchestration
link-file-transfer-configuration
link-file-transfer-configuration-2
link-file-transfer-tracking
link-file-transfer-tracking-2
link-file-upload
link-file-upload-2
link-file-upload-download-search
link-fraud-protection
link-ftp-server-credentials
link-ftp-server-credentials-2
link-fulfillment-materials
link-fund-codes
link-gainwell
link-group
link-hipaa-transactions
link-incremental-adjustments
link-intake
link-integration
link-invoice-management
link-invoice-process-flags
link-irs-w-9-tax-ids
link-labeler
link-letter-template
link-link-configuration
link-lock-out
link-logout
link-logout-2
link-manage-application-settings
link-manage-assignment-permissions
link-manage-case-assignment-permissio
link-manage-configurations
link-manage-cycles
link-manage-help
link-manage-html-blocks
link-manage-images
link-manage-ioc-settings
link-manage-labels
link-manage-menu-items
link-manage-menus
link-manage-messages
link-manage-module-events
link-manage-security-functions
link-manage-security-rights
link-manage-security-roles
link-manage-services
link-manage-subscriptions
link-manage-user-association
link-manage-user-invitations
link-manage-user-schedule
link-manage-users
link-managed-care
link-managed-care-entities
link-mass-carrier-migration
link-mass-change-transactions
link-mass-transfer
link-mce
link-mco-enrollment-list
link-medicaid
link-medicaid-case
link-member
link-member-2
link-member-3
link-member-management
link-member-quick-view
link-messages
link-messages-2
link-mita-steps
link-my-account
link-my-account-2
link-ndc
link-ndc-invoice-inquiry
link-network
link-new-enrollment-entry
link-non-covered-code
link-nppr-transactions
link-owners-and-managing-employees
link-page-elements-widgets
link-person
link-pharmacy-related-data
link-pi-case-tracking
link-plan-management
link-policy
link-policyholder
link-postmark-dates
link-ppa-maintenance
link-predictive-model-definition
link-prn-transactions
link-pro-dur
link-provider
link-provider-dashboard
link-provider-enrollment
link-provider-management
link-provider-mce-enrollment
link-provider-recoupment
link-provider-summary
link-providers
link-rate-setting
link-records-management-rm8
link-reference-data
link-reference-data-2
link-refresh
link-related-data
link-related-pages
link-reports
link-reports-letters
link-resume-enrollment-entry
link-review-types
link-rosi-pqas-list
link-routing-configuration
link-screening-credentialing
link-screening-results
link-search
link-search-audit-history
link-search-claims
link-search-desktop-review
link-search-enrollment-application
link-search-enrollment-reports
link-search-hipp
link-service-types
link-set-panel-tabs
link-study-analysis-catalog
link-study-request
link-subscriber-configuration
link-supercase
link-suppressed-entities
link-system-process-tracking
link-t-bill-rates
link-targeted-query-definition
link-task-list
link-task-management
link-task-template
link-tpl-case-tracking
link-tpl-hipp
link-tpl-policy
link-tpl-policy-intake
link-tpl-policy-letters
link-tracking
link-ui-examples
link-user-information
link-view-data
link-web-information
link-worker-compensation-intake
link-workflow-applications
link-workflow-configuration
link-workflow-dashboard
link-workflow-items
link-workflow-tasks
mailClose
mailHelp
mainMenu
mainMenuClose
mcbMenu
messagesCloseButton
mobileMenuIcon
nextButton
notesClose
notesHelp
pageBannerLogo
prevButton
printButton
printPreviewClose
printPreviewHelp
reportsClose
reportsHelp
resetButton
select-page-sizes-drop-down
text
text-2
text-3
text-from-size-kb-from-size-kb
text-page
text-page-2
text-to-size-kb-to-size-kb
```

## 13. Open questions
1. What does `cancelButton` (Cancel) do on this screen (navigate away? close a module? reset the form?) [UNKNOWN]
2. What exactly does `resetButton` (Reset) clear, and does it also hide Search Results if they are visible? [UNKNOWN]
3. What is the full request contract for GET `/api/FileTransfer/SearchFileTransferTracking/` (query parameter names + mapping to the criteria fields)? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include the CSS animation `autoFillEnd` (0s duration, 0s delay, 1 iteration, easing `ease`) on inputs as captured. [M01]
