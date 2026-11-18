# UI SPEC — pe-v1/search-enrollment-reports

> Source https://uximc.mms.tst.pgwcloud.net/ProviderEnrollment/SearchEnrollmentReports · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive + jquery 3.7.1 · target React 19
> Evidence tags: `[kit:kN]` provider-kit widget/dialog · `[ctl:key]` element · `[val:key]` validator · `[asset:path]` captured file (including `sections/…`, `kit/states/…`) · `[js:file#symbol]` · `[css:selector]` · `[UNKNOWN: …]`

## 1. Overview
Search page to locate generated enrollment report files by date range and optional user id, then download a report from the results grid. [asset:sections/01-search-enrollment-reports.png]

Primary tasks:
- Enter/adjust `From Date`, `To Date`, `User ID` criteria and run Search. [kit:k1, kit:k2]
- Clear all criteria and hide results. [ctl:clearButton]
- Review Search Results in the grid (File Name, Date Requested). [kit:k3]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-search-enrollment-reports.png]

This spec covers the screen content area `#pageBody > main` (the module content). [ctl:pageBody]

Page (content area): centered card panels within a full-width content region; background `rgb(255, 255, 255)`; scroll is page-level (shell header is fixed). [asset:sections/01-search-enrollment-reports.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content region | `div#pageBody` (`pageBody`) | 0,105.67,1920,375.83 | sections/01 | contains main content | (shell provides 62px top padding) | [ctl:pageBody] |
| Search criteria panel body | `div#SearchEnrollmentReport` | 30.67,163.33,1858.67,278.5 | sections/01 | block; form fields grid | within bordered card; panel header above | [asset:sections/01-search-enrollment-reports.png] |
| From Date input | `input#FromDate` | 41.33,318.83,374.33,30 | sections/01 | textbox inside Kendo datepicker | 14px text; inside `span.k-datepicker` 445×40 | [kit:k1] |
| To Date input | `input#ToDate` | 501,318.83,374.33,30 | sections/01 | textbox inside Kendo datepicker | 14px text; inside `span.k-datepicker` 445×40 | [kit:k2] |
| User ID input | `input#UserId` | 970.67,318.5,396.33,30 | sections/01 | textbox | inside `span.k-input` 445×40 | [ctl:UserId] |
| Clear button | `input#clearButton` | 1638.05,393.83,99.57,38 | sections/01 | button | outlined, blue border | [ctl:clearButton] |
| Search button | `input#searchButton` | 1749.63,393.83,114.71,38 | sections/01 | button | filled primary blue | [ctl:searchButton] |

### 2.1 Search criteria panel
- Card container: bordered with rounded corners; header strip background `rgb(250, 250, 250)`; body background `rgb(255, 255, 255)`; drop shadow `rgba(0, 0, 0, 0.08) 0px 8px 10px 1px`. [asset:sections/01-search-enrollment-reports.png]
- Panel header left shows magenta required marker `*` and title text `Search Enrollment Reports`; right side has a collapse chevron icon. [asset:sections/01-search-enrollment-reports.png]
- Right side of body shows `Required Fields ( * )` in magenta. [asset:sections/01-search-enrollment-reports.png]
- Instruction text lines:
  - `Complete the necessary criteria for the chosen search(s).` [asset:sections/01-search-enrollment-reports.png]
  - `Note: The name of the report file is displayed as Module Name, Timestamp in YYYYMMDDHHMMSS format, and the Report Name. The latest generated file is displayed at the top.` [asset:sections/01-search-enrollment-reports.png]

### 2.2 Search results panel (revealed by Search)
- The screen contains a `Search Results` section below the criteria panel, initially hidden. [js:capture/js/_long/2d9bf8422f2190f0.js#document.ready]
- After a successful Search, the `Search Results` header and the results grid appear below, within a matching rounded card. [asset:kit/states/search.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` 14px/14px | body text | [asset:sections/01-search-enrollment-reports.png] |
| `--color-text` | `rgb(51, 51, 51)` | default text | [asset:sections/01-search-enrollment-reports.png] |
| `--color-panel-border` | `rgb(222, 226, 230)` @ 0.666667px | card borders | [asset:sections/01-search-enrollment-reports.png] |
| `--color-panel-header-bg` | `rgb(250, 250, 250)` | panel header strip | [asset:sections/01-search-enrollment-reports.png] |
| `--color-required` | `rgb(203, 26, 198)` | required `*` markers + `Required Fields ( * )` | [asset:sections/01-search-enrollment-reports.png] |
| `--color-link` | `rgb(0, 98, 255)` | primary action color (buttons/links) | [asset:sections/01-search-enrollment-reports.png] |
| `--radius-input` | `5px` | inputs | [asset:sections/01-search-enrollment-reports.png] |
| `--radius-panel` | `10px` | cards | [asset:sections/01-search-enrollment-reports.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117×57 | shell-owned | [asset:capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `capture/assets/_svg/svg-1.svg` | From Date calendar icon | 18×16 | inside datepicker button | [asset:capture/assets/_svg/svg-1.svg] |
| `capture/assets/_svg/svg-2.svg` | To Date calendar icon | 18×16 | inside datepicker button | [asset:capture/assets/_svg/svg-2.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `SearchEnrollmentReportsPage`
  - `SharedShell` *shared* — header/menu/footer wrapper (not specified here) [ctl:pageHeader]
  - `SearchCriteriaPanel`
    - `FromDate` (Kendo datepicker widget) [kit:k1]
    - `ToDate` (Kendo datepicker widget) [kit:k2]
    - `UserId` (textbox) [ctl:UserId]
    - `ClearButton` [ctl:clearButton]
    - `SearchButton` [ctl:searchButton]
  - `SearchResultsPanel`
    - `EnrollmentReportGrid` (Kendo grid widget) [kit:k3]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `SearchEnrollmentReportsPage` | none | `criteria`, `results` | `pageBody` | [ctl:pageBody] |
| `SearchCriteriaPanel` | form values | `criteriaPanelOpen` | `searchCriteriaPanelIcon`, `FromDate`, `ToDate`, `UserId`, `clearButton`, `searchButton` | [asset:sections/01-search-enrollment-reports.png] |
| `SearchResultsPanel` | grid filters | `resultsVisible` | (contains `EnrollmentReportGrid`) | [asset:kit/states/search.png] |
| `EnrollmentReportGrid` | filter values | grid internal paging/sort | `enrollmentReportStatusResultsGrid` | [kit:k3] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `FromDate` | `From Date` | date (Kendo datepicker) | set to today on load (shown as `11/17/2026` in capture) | yes | date format `MM/dd/yyyy`; range 01/01/1900–12/31/9999 | `From Date must represent a valid date in the format 'MM/DD/YYYY'.` / `From Date must be within 01/01/1900 and 12/31/9999.` / `From Date is a required field.` | on Search click (form-level validator) | [kit:k1] |
| `ToDate` | `To Date` | date (Kendo datepicker) | set to today on load (shown as `11/17/2026` in capture) | yes | date format `MM/dd/yyyy`; range 01/01/1900–12/31/9999 | `To Date must represent a valid date in the format 'MM/DD/YYYY'.` / `To Date must be within 01/01/1900 and 12/31/9999.` / `To Date is a required field.` | on Search click (form-level validator) | [kit:k2] |
| `UserId` | `User ID` | text | `useradmin1` | no | rejects characters `; * ^ : ~ < > %` | `User ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.` | on Search click (form-level validator) | [js:capture/js/kit/screen.json#fields] |

- IF `From Date` is greater than `To Date` THEN THE SYSTEM SHALL show the message `From Date cannot be greater than To Date` on the `From Date` field and not run the search. [js:capture/js/_long/2d9bf8422f2190f0.js#searchEnrollmentReports]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `criteriaPanelOpen` | boolean | true | collapse icon in panel header | shows/hides the criteria panel body | [ctl:searchCriteriaPanelIcon] |
| `resultsVisible` | boolean | false | Search (valid) / Clear | shows/hides `Search Results` panel | [js:capture/js/_long/2d9bf8422f2190f0.js#document.ready] |

## 8. Behavior
### 8.1 Criteria form
- THE SYSTEM SHALL prefill `From Date` and `To Date` with today’s date on initial load. [js:capture/js/_long/2d9bf8422f2190f0.js#initializeNameTypeControls]
- WHEN the user clicks `Clear` THE SYSTEM SHALL reset the form, blank out `From Date`, `To Date`, and `User ID`, clear validation messages, hide results, clear the results grid data, and focus the first element in the form. [js:capture/js/_long/2d9bf8422f2190f0.js#clearButtonId]
- WHEN the user clicks `Search` THE SYSTEM SHALL clear and hide the results panel, validate the form, and only if valid: show the results panel, apply grid filters for `UserId`, `FromDate`, and `ToDate`, set page size to 10, and show a loading dialog. [js:capture/js/_long/2d9bf8422f2190f0.js#searchButtonId]
- WHEN the user clicks the panel chevron control THE SYSTEM SHALL toggle the criteria panel open/closed. [ctl:searchCriteriaPanelIcon]

### 8.2 Search results grid
- THE SYSTEM SHALL keep the results grid hidden until a Search runs successfully (valid criteria). [js:capture/js/_long/2d9bf8422f2190f0.js#searchEnrollmentReports]
- THE SYSTEM SHALL render a grid with columns `File Name` and `Date Requested`, pageable with page-size options 5/10/20 and default 10. [kit:k3]
- WHEN the grid is binding data AND the result set is non-empty THEN THE SYSTEM SHALL hide the criteria panel body and collapse the criteria panel. [js:capture/js/_long/2d9bf8422f2190f0.js#onEnrollmentReportSearchGridOnDataBinding]
- WHEN the grid has zero items THEN THE SYSTEM SHALL keep the criteria panel body visible. [js:capture/js/_long/2d9bf8422f2190f0.js#onEnrollmentReportSearchGridOnDataBinding]
- WHEN the user clicks a `File Name` link in the grid THEN THE SYSTEM SHALL attempt to download the file by calling `downloadFile("#= FileId #")`. [js:capture/js/inline-13.js#kendoGrid]

### 8.3 Scroll behavior
None (within this screen content area). [UNKNOWN: confirm whether any content-area elements stick during scroll]

### 8.4 Media
None. [asset:sections/01-search-enrollment-reports.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `AAGMenu.Logout` / `link-logout` | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout] |
| `AAGMenu.MyAccount` | `/Home/MyAccount` | same tab | [ctl:AAGMenu.MyAccount] |
| `activeModuleMenuFirstItem` | `/ProviderEnrollment/SearchEnrollmentReports` | same tab | [ctl:activeModuleMenuFirstItem] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Search | `POST /api/ProviderEnrollment/SearchEnrollmentReports/` with Kendo grid params `sort`, `page`, `pageSize`, `group`, `filter` | Provide an endpoint matching Kendo grid contract used by the kit services for this screen | Populates results grid (or shows empty state) | [kit:k3] |
| Click File Name | `GET /api/ProviderEnrollment/GetFile/` (plus file id argument) | Provide a file-download endpoint; exact parameterization is unknown | Triggers file download | [js:capture/js/inline-14.js#GetFile] |

## 11. Accessibility
- Each field is labeled by its `<label>` and help/description element (e.g., date fields use `aria-labelledby` referencing label + help desc). [kit:k1]
- Help icons provide tooltip text for required date fields. [kit:k1]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/pe-v1/screens/search-enrollment-reports/spec/parity.spec.ts` uses them:

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
- `button-22` [ctl:button-22]
- `searchCriteriaPanelIcon` [ctl:searchCriteriaPanelIcon]
- `button-from-date-is-a-required-field` [ctl:button-from-date-is-a-required-field]
- `FromDateHelp` [ctl:FromDateHelp]
- `FromDate` [ctl:FromDate]
- `button-select` [ctl:button-select]
- `button-to-date-is-a-required-field` [ctl:button-to-date-is-a-required-field]
- `ToDateHelp` [ctl:ToDateHelp]
- `ToDate` [ctl:ToDate]
- `button-select-2` [ctl:button-select-2]
- `UserIdHelp` [ctl:UserIdHelp]
- `UserId` [ctl:UserId]
- `clearButton` [ctl:clearButton]
- `searchButton` [ctl:searchButton]
- `button-disclaimer` [ctl:button-disclaimer]
- `button-website-requirements` [ctl:button-website-requirements]
- `button-privacy-policy` [ctl:button-privacy-policy]
- `button-cookie-policy` [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/pe-v1/screens/search-enrollment-reports/spec/parity.spec.ts` [ctl:pageBody]

## 13. Open questions
1. What does the loading dialog (`showLoadingDialog`) look like, and does it block input? [UNKNOWN]
2. What is the real data shape returned by `POST /api/ProviderEnrollment/SearchEnrollmentReports/` (grid `Data` fields, paging totals), and does an empty criteria search always return results? [UNKNOWN]
3. How does `downloadFile(fileId)` parameterize the `GetFile` call (query string vs path) and what file types/content-disposition does it return? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL define the CSS animation `autoFillEnd` on date picker elements with duration 0s (no visible motion in capture). [M01]
