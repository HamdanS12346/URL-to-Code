# Checklist: Search Claims

Generated from the capture (kit/screen.json). Route: `#/search-claims`.

## Done by the kit (do not rebuild)
- [x] k1: dropdown "ClaimIdentifiersList" (3 options)
- [x] k2: dropdown "DateTypeList" (3 options)
- [x] k3: date "Date From"
- [x] k4: date "Date To"
- [x] k5: dropdown "MemberByList" (3 options)
- [x] k6: dropdown "ProviderRoleList" (4 options)
- [x] k7: dropdown "ProviderByList" (5 options)
- [x] k8: dropdown "ClaimTypeList" (9 options)
- [x] k9: dropdown "ClaimSubTypeList" (24 options)
- [x] k10: dropdown "ClaimStatusList" (6 options)
- [x] k11: dropdown "ClaimSourceCodeList" (5 options)
- [x] k12: dropdown "PayToList" (3 options)
- [x] k13: dropdown "ServiceTypeList" (3 options)
- [x] k14: numeric "Range From"
- [x] k15: numeric "Range To"
- [x] k16: dropdown "DiagnosisTypeList" (2 options)
- [x] k17: grid "ClaimsResultsGrid"
- [x] k18: date "DOB"
- [x] k19: numeric "Total Allowed"
- [x] k20: numeric "Total Copay"
- [x] k21: numeric "Total Coinsurance"
- [x] k22: numeric "Total Deductible"
- [x] k23: numeric "Total Spenddown"
- [x] Search: fills the grid with synthetic rows
- [x] Reset: clears the fields
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 44 part(s) hidden at rest (data-kit-h=…) that Search does not reveal: find in the script what shows each (a radio, a checkbox, a dropdown value) and build that
- [ ] every task in spec/tasks.md that the list above does not cover (messages such as "At least one search criteria is required.")

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/ClaimsManagement/hp.ua3.claimsManagement.commonEvents__884a35a7.js
- capture/js/Scripts/ClaimsManagement/hp.ua3.claimsManagement.Common__884a35a7.js
- capture/js/Scripts/ClaimsManagement/hp.ua3.claimsManagement.searchClaims__884a35a7.js
