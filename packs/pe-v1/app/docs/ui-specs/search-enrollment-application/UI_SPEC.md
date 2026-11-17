# UI SPEC — pe-v1/search-enrollment-application

> Source https://uximc.mms.tst.pgwcloud.net/ProviderEnrollment/SearchProviderApplication · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[ctl:key]` element · `[val:key]` validator · `[asset:path]` file/screenshot · `[js:…]` script evidence · `[UNKNOWN: …]` unknown · `[kit:<id>]` provider-kit widget/dialog · `[M##]` motion

## 1. Overview
Search page for Provider Enrollment users to locate enrollment applications by one or more criteria (IDs, provider name/contact info, status/type/date). [asset:sections/02-pagebody.png]
Primary tasks:
- Search for enrollment applications using the criteria form. [ctl:searchButton]
- Clear the criteria form back to its initial state. [ctl:clearButton]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Page: fluid full-width; white background; page scroll (no inner scroll region observed). [asset:reference.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Module title bar | `div.menu` | 0,62,1920,32 | `sections/01-search-enrollment-application.png` | horizontal bar | bg `rgb(0, 238, 174)` | [asset:sections/01-search-enrollment-application.png] |
| Content area | `div#pageBody.row` | 0,138,1920,653 | `sections/02-pagebody.png` | center container | contains the criteria panel | [asset:sections/02-pagebody.png] |
| Footer (shell) | `footer` | 0,791,1920,119 | `sections/03-disclaimer-the-website-is-prov.png` | centered footer links + build info row | bg `rgb(43, 58, 68)` (subfooter) | [asset:sections/03-disclaimer-the-website-is-prov.png] |

### 2.1 Content area (`#pageBody > main`)
- THE SYSTEM SHALL render one content panel container (`div.content-panel-container`) centered with ~30px side margins (1860px wide), 10px rounded corners, and shadow `rgba(0,0,0,0.08) 0px 8px 10px 1px`. [asset:sections/02-pagebody.png]
- THE SYSTEM SHALL show the panel header text `Search Enrollment Application` and a chevron icon button at the far right (`[ctl:searchCriteriaPanelIcon]`). [asset:sections/02-pagebody.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif` 14px/14px | general UI text | [asset:sections/02-pagebody.png] |
| `--color-text` | `rgb(61, 61, 61)` | form text | [asset:sections/02-pagebody.png] |
| `--color-shell-bg` | `rgb(43, 58, 68)` | top shell + footer | [asset:reference.png] |
| `--color-module-bar` | `rgb(0, 238, 174)` | module title bar | [asset:sections/01-search-enrollment-application.png] |
| `--color-link` | `rgb(0, 98, 255)` | action buttons text | [asset:sections/02-pagebody.png] |
| `--radius-control` | `5px` | input borders | [asset:sections/02-pagebody.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shell header logo | 117×57 | client logo image | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/_svg/svg-1.svg` | Enrollment Type dropdown arrow | 18×16 | caret icon | [asset:assets/_svg/svg-1.svg] |
| `assets/_svg/svg-2.svg` | Provider Type dropdown arrow | 18×16 | caret icon | [asset:assets/_svg/svg-2.svg] |
| `assets/_svg/svg-3.svg` | Status dropdown arrow | 18×16 | caret icon | [asset:assets/_svg/svg-3.svg] |
| `assets/_svg/svg-4.svg` | Receipt Date calendar icon | 18×16 | calendar icon | [asset:assets/_svg/svg-4.svg] |
| `assets/_svg/svg-5.svg` | State dropdown arrow | 18×16 | caret icon | [asset:assets/_svg/svg-5.svg] |
| `assets/_svg/svg-6.svg` | Application Type dropdown arrow | 18×16 | caret icon | [asset:assets/_svg/svg-6.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `SearchEnrollmentApplicationPage`
  - `SearchCriteriaPanel`
    - `CriteriaFields` — §6 (text fields, radio group, kit dropdowns/date) [asset:sections/02-pagebody.png]
    - `FormActions` — Clear/Search [ctl:clearButton]
  - `ValidationSummaryBanner` — shown on invalid search [asset:kit/states/search.png]
  - `ResultsGrid` — Kendo MegaGrid + export/filter UI (hidden in captures; behavior not rebuilt by kit) [UNKNOWN: kit has no megagrid]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchCriteriaPanel` | none | `panelExpanded` | `[ctl:searchCriteriaPanelIcon]` | [asset:sections/02-pagebody.png] |
| `CriteriaFields` | field values | `taxIdType` | `[ctl:ATN]`, `[ctl:LegacyID]`, `[ctl:NPI]`, `[ctl:TaxIdSelection_IDEIN]`, `[ctl:TaxIdSelection_IDSSN]`, `[ctl:LastName]`, `[ctl:FirstName]`, `[ctl:BusinessName]`, `[ctl:ContactEmail]`, `[ctl:ReceiptDate]`, `[ctl:City]` | [asset:sections/02-pagebody.png] |
| `EnrollmentTypeSelect` | value | none | `[ctl:combobox-enrollment-type-enrollment-type]` | [kit:k1] |
| `ProviderTypeSelect` | value | none | `[ctl:combobox-provider-type-provider-type]` | [kit:k2] |
| `StatusSelect` | value | none | `[ctl:combobox-status-status]` | [kit:k3] |
| `ReceiptDatePicker` | date value | none | `[ctl:ReceiptDate]` | [kit:k4] |
| `StateSelect` | value | none | `[ctl:combobox-state-enter-the-state-associated]` | [kit:k5] |
| `ApplicationTypeSelect` | value | none | `[ctl:combobox-application-type-application-typ]` | [kit:k6] |
| `FormActions` | none | none | `[ctl:clearButton]`, `[ctl:searchButton]` | [asset:sections/02-pagebody.png] |
| `ValidationSummaryBanner` | message text | none | (banner close button: `[UNKNOWN: key not captured]`) | [asset:kit/states/search.png] |
| `ResultsGrid` | result rows | grid state | export/filter/pager widgets | [UNKNOWN: kit has no megagrid] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ATN` | `ATN` | text | empty | no | max length 10; numeric-only | `ATN is restricted to numeric characters only [0-9].` | on input / blur | [ctl:ATN] |
| `LegacyID` | `Service Location ID` | text | empty | no | max length 14; alphanumeric-only | `Service Location ID is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].` | on input / blur | [ctl:LegacyID] |
| `NPI` | `NPI` | masked text | empty | no | numeric-only; (maskedtextbox behavior not captured) | `NPI  is restricted to numeric characters only [0-9].` | on change / blur | [ctl:NPI] [UNKNOWN: kit has no maskedtextbox] |
| `TaxIdSelection_IDEIN` | `EIN` | radio | unchecked | no | selects EIN mode |  | on change | [ctl:TaxIdSelection_IDEIN] |
| `TaxIdSelection_IDSSN` | `SSN` | radio | unchecked | no | selects SSN mode |  | on change | [ctl:TaxIdSelection_IDSSN] |
| `LastName` | `Last Name` | text | empty | no | max length 50; pattern | `Last Name contains invalid characters: Must start with a letter. Allowed characters: letters, single spaces, and [' , . -].` | on input / blur | [ctl:LastName] |
| `FirstName` | `First Name` | text | empty | no | max length 50; pattern | `First Name contains invalid characters: Must start with a letter. Allowed characters: letters, single spaces, and [' , . -].` | on input / blur | [ctl:FirstName] |
| `BusinessName` | `Business Name` | text | empty | no | max length 50; pattern | `Business Name contains invalid characters. The characters ; * ^ : ~ < > % and Unicode are not allowed.` | on input / blur | [ctl:BusinessName] |
| `ContactEmail` | `Contact Email` | text | empty | no | max length 150; email-like pattern | `Contact Email is not a valid email address. Enter email with 'name@domain' format.` | on input / blur | [ctl:ContactEmail] |
| `combobox-enrollment-type-enrollment-type` | `Enrollment Type` | dropdown | `select a value...` | no | 7 options (see kit) |  | on change | [ctl:combobox-enrollment-type-enrollment-type] [kit:k1] |
| `combobox-provider-type-provider-type` | `Provider Type` | dropdown | `select a value...` | no | 69 options (see kit) |  | on change | [ctl:combobox-provider-type-provider-type] [kit:k2] |
| `combobox-status-status` | `Status` | dropdown | `select a value...` | no | 13 options (see kit) |  | on change | [ctl:combobox-status-status] [kit:k3] |
| `ReceiptDate` | `Receipt Date` | date | empty | no | format `MM/dd/yyyy` | `Receipt Date must represent a valid date in the format 'MM/DD/YYYY'.` | on blur | [ctl:ReceiptDate] [kit:k4] |
| `City` | `City` | text | empty | no | max length 70; pattern | `City  contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on input / blur | [ctl:City] |
| `combobox-state-enter-the-state-associated` | `State` | dropdown | `select a value...` | no | 57 options (see kit) |  | on change | [ctl:combobox-state-enter-the-state-associated] [kit:k5] |
| `combobox-application-type-application-typ` | `Application Type` | dropdown | `select a value...` | no | 5 options (see kit) |  | on change | [ctl:combobox-application-type-application-typ] [kit:k6] |

- IF the user activates Search with no criteria values THEN THE SYSTEM SHALL show a validation banner with text `Resolve the following form field errors and try again. At least one search criteria value must be provided to initiate the search.` [ctl:searchButton] [asset:kit/states/search.png]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `panelExpanded` | boolean | true | `[ctl:searchCriteriaPanelIcon]` | criteria fields visible when expanded | [ctl:searchCriteriaPanelIcon] |
| `taxIdType` | enum (`none` \| `EIN` \| `SSN`) | `none` | `[ctl:TaxIdSelection_IDEIN]`, `[ctl:TaxIdSelection_IDSSN]` | shows EIN vs SSN masked field | [ctl:TaxIdSelection_IDEIN] |
| `validationSummaryVisible` | boolean | false | `[ctl:searchButton]` | shows the validation banner on invalid search | [asset:kit/states/search.png] |

Hidden at load (facts §18):
| element | shown when | evidence |
|---|---|---|
| `EIN` / `EINSpan` / `EINIcon` | when EIN radio is selected | [ctl:TaxIdSelection_IDEIN] [UNKNOWN: kit has no maskedtextbox] |
| `SSN` / `SSNSpan` / `SSNIcon` | when SSN radio is selected | [ctl:TaxIdSelection_IDSSN] [UNKNOWN: kit has no maskedtextbox] |
| results grid + export/filter controls | after a successful search with criteria | [UNKNOWN: kit has no megagrid] |

## 8. Behavior
### 8.1 Search Criteria Panel
- THE SYSTEM SHALL show a criteria panel titled `Search Enrollment Application`. [asset:sections/02-pagebody.png]
- WHEN the user activates the panel icon (`[ctl:searchCriteriaPanelIcon]`) THE SYSTEM SHALL toggle the panel between expanded and collapsed. [ctl:searchCriteriaPanelIcon] [UNKNOWN: collapse interaction not exercised in capture]

### 8.2 Actions
- WHEN the user clicks `Clear` THEN THE SYSTEM SHALL reset the criteria form to its initial values (all fields empty, dropdowns at optionLabel `select a value...`, no Tax ID radio selected). [ctl:clearButton] [UNKNOWN: reset interaction not exercised in capture]
- WHEN the user clicks `Search` with no criteria values THEN THE SYSTEM SHALL show the validation banner described in §6. [ctl:searchButton] [asset:kit/states/search.png]
- WHEN the user clicks `Search` with at least one criteria value THEN THE SYSTEM SHALL show search results in the provider results grid. [ctl:searchButton] [UNKNOWN: results state not captured]

### 8.3 Tax ID selection
- WHEN the user selects `EIN` THEN THE SYSTEM SHALL show an EIN masked textbox with a redaction toggle icon. [ctl:TaxIdSelection_IDEIN] [UNKNOWN: kit has no maskedtextbox]
- WHEN the user selects `SSN` THEN THE SYSTEM SHALL show an SSN masked textbox with a redaction toggle icon. [ctl:TaxIdSelection_IDSSN] [UNKNOWN: kit has no maskedtextbox]

### 8.4 Provider-kit widgets
- THE SYSTEM SHALL render the Enrollment Type dropdown with optionLabel `select a value...` and the 7 options captured by the kit. [kit:k1]
- THE SYSTEM SHALL render the Provider Type dropdown with optionLabel `select a value...` and the 69 options captured by the kit. [kit:k2]
- THE SYSTEM SHALL render the Status dropdown with optionLabel `select a value...` and the 13 options captured by the kit. [kit:k3]
- THE SYSTEM SHALL render the Receipt Date picker using format `MM/dd/yyyy`. [kit:k4]
- THE SYSTEM SHALL render the State dropdown with optionLabel `select a value...` and the 57 options captured by the kit. [kit:k5]
- THE SYSTEM SHALL render the Application Type dropdown with optionLabel `select a value...` and the 5 options captured by the kit. [kit:k6]
- WHERE results grid tooling is visible THE SYSTEM SHALL render the kit widgets for filter selection, export options, and paging (`[kit:k7]`…`[kit:k10]`). [kit:k7] [kit:k8] [kit:k9] [kit:k10]

### 8.y Scroll behavior
None. [asset:reference.png]

### 8.z Media
None. [asset:reference.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| link-client-logo | /Home/MyHome/ | same tab | [ctl:link-client-logo] |
| link-my-account | /Home/MyAccount | same tab | [ctl:link-my-account] |
| link-logout | /Security/LogoutFromMenu | same tab | [ctl:link-logout] |

Side menu and shell navigation links are owned by the shared shell (see the home spec). Link keys captured on this page:
[ctl:link-client-logo] [ctl:link-my-account] [ctl:link-my-account-2] [ctl:link-broadcast-message] [ctl:link-faq-s] [ctl:link-manage-application-settings]
[ctl:link-manage-html-blocks] [ctl:link-manage-help] [ctl:link-manage-images] [ctl:link-manage-ioc-settings] [ctl:link-manage-labels] [ctl:link-manage-menus]
[ctl:link-manage-menu-items] [ctl:link-manage-messages] [ctl:link-manage-security-functions] [ctl:link-manage-security-rights] [ctl:link-manage-security-roles] [ctl:link-manage-services]
[ctl:link-manage-subscriptions] [ctl:link-manage-module-events] [ctl:link-manage-users] [ctl:link-manage-user-invitations] [ctl:link-event-configuration] [ctl:link-subscriber-configuration]
[ctl:link-event-subscription] [ctl:link-tracking] [ctl:link-claims-management] [ctl:link-search-claims] [ctl:link-pro-dur] [ctl:link-drug-rebate]
[ctl:link-dashboard] [ctl:link-labeler] [ctl:link-ndc] [ctl:link-claim-level-detail] [ctl:link-ccn-list] [ctl:link-rosi-pqas-list]
[ctl:link-disputes-list] [ctl:link-invoice-management] [ctl:link-ndc-invoice-inquiry] [ctl:link-ccn-ndc-association] [ctl:link-ppa-maintenance] [ctl:link-incremental-adjustments]
[ctl:link-postmark-dates] [ctl:link-t-bill-rates] [ctl:link-340b-providers] [ctl:link-provider-recoupment] [ctl:link-invoice-process-flags] [ctl:link-fund-codes]
[ctl:link-web-information] [ctl:link-ui-examples] [ctl:link-page-elements-widgets] [ctl:link-file-transfer-configuration] [ctl:link-file-transfer-tracking] [ctl:link-ftp-server-credentials]
[ctl:link-integration] [ctl:link-event-to-file-query-builder] [ctl:link-file-to-event-metadata] [ctl:link-file-to-event-orchestration] [ctl:link-event-status-tracking] [ctl:link-system-process-tracking]
[ctl:link-dashboard-2] [ctl:link-managed-care] [ctl:link-mce] [ctl:link-member] [ctl:link-network] [ctl:link-provider]
[ctl:link-hipaa-transactions] [ctl:link-lock-out] [ctl:link-screening-results] [ctl:link-capitation] [ctl:link-reports] [ctl:link-reference-data]
[ctl:link-provider-mce-enrollment] [ctl:link-file-upload] [ctl:link-mass-transfer] [ctl:link-member-management] [ctl:link-member-2] [ctl:link-medicaid-case]
[ctl:link-fulfillment-materials] [ctl:link-fraud-protection] [ctl:link-group] [ctl:link-broker-sales-tpa] [ctl:link-person] [ctl:link-plan-management]
[ctl:link-reference-data-2] [ctl:link-pharmacy-related-data] [ctl:link-related-data] [ctl:link-rate-setting] [ctl:link-file-upload-2] [ctl:link-manage-cycles]
[ctl:link-dashboard-3] [ctl:link-manage-configurations] [ctl:link-custom-peer-groups] [ctl:link-service-types] [ctl:link-study-request] [ctl:link-suppressed-entities]
[ctl:link-study-analysis-catalog] [ctl:link-manage-assignment-permissions] [ctl:link-predictive-model-definition] [ctl:link-targeted-query-definition] [ctl:link-analysis-review] [ctl:link-case-request]
[ctl:link-pi-case-tracking] [ctl:link-dashboard-4] [ctl:link-case] [ctl:link-intake] [ctl:link-review-types] [ctl:link-supercase]
[ctl:link-contact] [ctl:link-user-information] [ctl:link-letter-template] [ctl:link-bulk-load] [ctl:link-provider-enrollment] [ctl:link-provider-management]
[ctl:link-providers] [ctl:link-owners-and-managing-employees] [ctl:link-irs-w-9-tax-ids] [ctl:link-provider-summary] [ctl:link-clia-numbers] [ctl:link-eft-enrollments]
[ctl:link-workflow-items] [ctl:link-mco-enrollment-list] [ctl:link-bulk-transactions-within-base-id] [ctl:link-nppr-transactions] [ctl:link-prn-transactions] [ctl:link-ep-workflow-transactions]
[ctl:link-base-id-termination-transactions] [ctl:link-mass-change-transactions] [ctl:link-change-of-ownership-transactions] [ctl:link-provider-dashboard] [ctl:link-managed-care-entities] [ctl:link-screening-credentialing]
[ctl:link-dashboard-5] [ctl:link-credentialing-application-review] [ctl:link-search] [ctl:link-search-audit-history] [ctl:link-file-upload-download-search] [ctl:link-tpl-case-tracking]
[ctl:link-case-2] [ctl:link-contact-2] [ctl:link-desktop-review-upload] [ctl:link-search-desktop-review] [ctl:link-worker-compensation-intake] [ctl:link-manage-case-assignment-permissio]
[ctl:link-tpl-policy] [ctl:link-carrier] [ctl:link-employer] [ctl:link-policyholder] [ctl:link-absent-parent] [ctl:link-policy]
[ctl:link-tpl-policy-intake] [ctl:link-mass-carrier-migration] [ctl:link-non-covered-code] [ctl:link-member-3] [ctl:link-carrier-crosswalk-rule] [ctl:link-tpl-policy-letters]
[ctl:link-member-quick-view] [ctl:link-tpl-hipp] [ctl:link-search-hipp] [ctl:link-average-expenditure] [ctl:link-task-management] [ctl:link-dashboard-6]
[ctl:link-task-template] [ctl:link-task-list] [ctl:link-link-configuration] [ctl:link-routing-configuration] [ctl:link-manage-user-association] [ctl:link-manage-user-schedule]
[ctl:link-bulk-recall] [ctl:link-dashboard-7] [ctl:link-search-enrollment-reports] [ctl:link-workflow-dashboard] [ctl:link-workflow-applications] [ctl:link-workflow-configuration]
[ctl:link-workflow-tasks] [ctl:link-new-enrollment-entry] [ctl:link-resume-enrollment-entry] [ctl:link-provider-enrollment-2] [ctl:link-dashboard-8] [ctl:link-search-enrollment-reports-2]
[ctl:link-workflow-dashboard-2] [ctl:link-workflow-applications-2] [ctl:link-workflow-configuration-2] [ctl:link-workflow-tasks-2] [ctl:link-new-enrollment-entry-2] [ctl:link-resume-enrollment-entry-2]
[ctl:link-refresh]

## 10. Server interactions
None observed; Search was captured as not calling any endpoint. [ctl:searchButton]

## 11. Accessibility
- THE SYSTEM SHALL associate each input with its visible label via or/id (e.g. ATNLabel → ATN). [ctl:ATN]
- THE SYSTEM SHALL expose each help icon as a tooltip trigger (ole=\"img\", ria-label=\"HELP\") with its descriptive text in the DOM (e.g. ATNHelpDesc). [ctl:ATNHelp]

## 12. Test ids
Every element below gets data-testid=\"<key>\" in the rebuild; packs/pe-v1/screens/search-enrollment-application/spec/parity.spec.ts uses them.

Required controls (facts gate):
[ctl:pageBannerLogo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links]
[ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2]
[ctl:button-8] [ctl:activeModuleMenu] [ctl:activeModuleMenuFirstItem] [ctl:button-help] [ctl:button-22] [ctl:searchCriteriaPanelIcon] [ctl:ATNHelp] [ctl:ATN]
[ctl:LegacyIDHelp] [ctl:LegacyID] [ctl:NPIHelp] [ctl:NPI] [ctl:TaxIdSelectionHelp] [ctl:TaxIdSelection_IDEIN] [ctl:TaxIdSelection_IDSSN] [ctl:LastNameHelp]
[ctl:LastName] [ctl:FirstNameHelp] [ctl:FirstName] [ctl:BusinessNameHelp] [ctl:BusinessName] [ctl:ContactEmailHelp] [ctl:ContactEmail] [ctl:EnrollmentTypeHelp]
[ctl:combobox-enrollment-type-enrollment-type] [ctl:button-select] [ctl:ProviderTypeHelp] [ctl:combobox-provider-type-provider-type] [ctl:button-select-2] [ctl:LastStatusHelp] [ctl:combobox-status-status] [ctl:button-select-3]
[ctl:ReceiptDateHelp] [ctl:ReceiptDate] [ctl:button-select-4] [ctl:CityHelp] [ctl:City] [ctl:StatesHelp] [ctl:combobox-state-enter-the-state-associated] [ctl:button-select-5]
[ctl:ApplicationTypeListHelp] [ctl:combobox-application-type-application-typ] [ctl:button-select-6] [ctl:clearButton] [ctl:searchButton] [ctl:button-disclaimer] [ctl:button-website-requirements] [ctl:button-privacy-policy]
[ctl:button-cookie-policy]

Run: TARGET=react URL=<rebuild url> npx playwright test packs/pe-v1/screens/search-enrollment-application/spec/parity.spec.ts

## 13. Open questions
1. What is the results grid layout (columns/rows) after a successful search? [UNKNOWN: results state not captured]
2. What is the exact Clear button behavior for every field (including Tax ID selection and any hidden fields)? [UNKNOWN: reset interaction not exercised in capture]
3. What are the masked textbox behaviors for NPI / SSN / EIN (formatting, redaction toggle behavior)? [UNKNOWN: kit has no maskedtextbox]

## 14. Motion
- THE SYSTEM SHALL run CSS animation utoFillEnd on form input wrappers; measured duration 0s (no visible motion). [M01]
