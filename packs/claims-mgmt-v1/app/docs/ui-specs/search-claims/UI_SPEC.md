# UI SPEC — claims-mgmt-v1/search-claims

> Source https://uximc.mms.tst.pgwcloud.net/ClaimsManagement/SearchClaims · viewport 1905×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive, jquery 3.7.1 · target React 19
> Evidence tags: `[ctl:key]` element · `[asset:path]` file · `[js:…]` script evidence · `[UNKNOWN: …]` gap · `[kit:kN]` provider kit widget/dialog

## 1. Overview
Search Claims is a criteria form used to search for claims (identifiers + dates + member/provider + advanced filters). [asset:sections/01-search-claims.png]

Primary tasks:
- Run a search. [ctl:nextButton]
- Reset all criteria. [ctl:resetButton]
- Cancel and leave the page. [ctl:cancelButton]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Capture scope is the content area under the shell; the main content is a single large “Search Criteria” panel with the Search/Reset/Cancel actions at its bottom edge. [asset:sections/01-search-claims.png]

## 3. Design tokens
- Base typography is `Arial, Helvetica, sans-serif` at ~14px with dark gray body text. [asset:sections/01-search-claims.png]
- The Search Criteria container uses a light border, rounded corners, and a subtle drop shadow. [asset:sections/01-search-claims.png]

## 4. Assets
- Screen reference crops: `sections/01-search-claims.png`, `sections/02-disclaimer-the-website-is-prov.png`. [asset:sections/01-search-claims.png, asset:sections/02-disclaimer-the-website-is-prov.png]
- Shared shell logo asset: `capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png`. [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png]

## 5. Components
- This screen is a provider-portal (Kendo UI for jQuery) page; all Kendo widgets and dialogs are implemented by the Provider kit.
- Kit widgets present on this page (must be treated as kit-owned islands in rebuild):
[kit:k1] [kit:k2] [kit:k3] [kit:k4] [kit:k5] [kit:k6] [kit:k7] [kit:k8] [kit:k9] [kit:k10] [kit:k11] [kit:k12] [kit:k13] [kit:k14] [kit:k15] [kit:k16] [kit:k17] [kit:k18] [kit:k19] [kit:k20] [kit:k21] [kit:k22] [kit:k23]

## 6. Fields & validation
- Required date fields: Date From and Date To are required Kendo date pickers. [kit:k3, kit:k4]
- Advanced criteria fields include dropdowns, autocomplete-like inputs, and numeric currency ranges. [asset:sections/01-search-claims.png]
- Some cross-field validation behavior is implemented in the page script (e.g., From Date > To Date; minimum 3 characters for certain criteria). [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#checkclaimsValidation, js:js/inline-104.js]

## 7. State model
- Collapsible panels: Search Criteria and Advanced sections can be collapsed/expanded via their +/- controls. [ctl:plusMinusSearchClaimsClick, ctl:plusMinusAdvancedSearchClaimsClick]
- Several criteria inputs are conditionally shown based on dropdown selections (Search By, Member By, Provider Role/Provider By, DX Type). [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#claimIdentifiersListChange]

## 8. Behavior
- WHEN Search Criteria collapse is toggled, the main criteria body shows/hides. [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#clickToSearchClaimsCollapseExpand, ctl:plusMinusSearchClaimsClick]
- WHEN Advanced collapse is toggled, the advanced criteria body shows/hides and the icon title changes. [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#clickToAdvancedSearchClaimsCollapseExpand, ctl:plusMinusAdvancedSearchClaimsClick]
- WHEN Search is pressed and validations pass, the page posts to `/api/ClaimsManagement/SearchClaims/` (form-serialized). [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#processNext, js:js/inline-104.js]

## 9. Navigation
- A double-click on a selected results grid row navigates to a claim information page (URL decided by status/type). [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#claimsManagementCreateUrl]

## 10. Server interactions
- Search uses `POST /api/ClaimsManagement/SearchClaims/` with `application/x-www-form-urlencoded` body from `$(formId).serialize()`. [js:Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js#processNext, js:js/inline-104.js]
- Data-lists for several fields are loaded from localization APIs (modifiers, taxonomies, tooth numbers, ICD codes, exception error codes). [js:js/inline-104.js]

## 11. Accessibility
- Each field is presented with a visible label and an adjacent help icon for guidance. [asset:sections/01-search-claims.png]

## 12. Test ids
Every required captured control below must exist in the rebuild with `data-testid="<key>"`.

[ctl:pageBannerLogo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-2] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links] [ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2] [ctl:button-8] [ctl:activeModuleMenu] [ctl:activeModuleMenuFirstItem] [ctl:plusMinusSearchClaimsClick] [ctl:ClaimIdentifiersHelp] [ctl:combobox-search-by-search-for-claims-by-i] [ctl:button-select] [ctl:DateTypeHelp] [ctl:combobox-choose-date-type-search-for-clai] [ctl:button-select-2] [ctl:button-date-from-is-a-required-field] [ctl:FromDateHelp] [ctl:FromDate] [ctl:button-select-3] [ctl:button-date-to-is-a-required-field] [ctl:ToDateHelp] [ctl:ToDate] [ctl:button-select-4] [ctl:MemberByHelp] [ctl:combobox-choose-member-by-search-for-clai] [ctl:button-select-5] [ctl:ProviderRoleHelp] [ctl:combobox-choose-provider-role-search-for-] [ctl:button-select-6] [ctl:plusMinusAdvancedSearchClaimsClick] [ctl:ClaimTypeHelp] [ctl:combobox-claim-type-indicates-the-type-of] [ctl:button-select-8] [ctl:ClaimSubTypeHelp] [ctl:combobox-sub-type-indicates-additional-qu] [ctl:button-select-9] [ctl:ClaimStatusHelp] [ctl:combobox-status-identifies-the-status-of-] [ctl:button-select-10] [ctl:ClaimSourceCodeHelp] [ctl:combobox-claim-source-code-indicates-the-] [ctl:button-select-11] [ctl:PayToHelp] [ctl:combobox-pay-to-indicates-who-is-paid-whe] [ctl:button-select-12] [ctl:ServiceTypeHelp] [ctl:combobox-svc-type-the-type-of-service-ass] [ctl:button-select-13] [ctl:Modifiers1Help] [ctl:Modifiers1] [ctl:Modifiers2Help] [ctl:Modifiers2] [ctl:Modifiers3Help] [ctl:Modifiers3] [ctl:Modifiers4Help] [ctl:Modifiers4] [ctl:ExceptionErrorCodeHelp] [ctl:ExceptionErrorCode] [ctl:AuthorizationNumberHelp] [ctl:AuthorizationNumber] [ctl:OperatorIdentifierHelp] [ctl:OperatorIdentifier] [ctl:RANumberHelp] [ctl:RANumber] [ctl:TotalBilledHelp] [ctl:text-range-from] [ctl:text-range-to] [ctl:col-md-3_editor-colProcCodeHelp] [ctl:ProcCodeFrom] [ctl:ProcCodeTo] [ctl:col-md-3_editor-colToothNoHelp] [ctl:ToothNumberFrom] [ctl:ToothNumberTo] [ctl:editor-colPriDXCodeHelp] [ctl:combobox-choose-dx-type] [ctl:button-select-14] [ctl:PrimaryDiagnosisCodeICD10] [ctl:resetButton] [ctl:cancelButton] [ctl:nextButton] [ctl:button-disclaimer] [ctl:button-website-requirements] [ctl:button-privacy-policy] [ctl:button-cookie-policy] 

## 13. Open questions
1. Exact results grid placement and empty-state rendering after a successful Search. [UNKNOWN]
2. Visible label text for the Provider By selector when Provider Role is chosen (hidden in captured default state). [UNKNOWN]
3. Complete response shape and formatting rules for each results grid column. [UNKNOWN]

## 14. Motion
- Motion entry present in capture: CSS animation `autoFillEnd` (0s duration; no visible movement). [M01]
