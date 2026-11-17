# Checklist: Search Enrollment Application

Generated from the capture (kit/screen.json). Route: `#/search-enrollment-application`.

## Done by the kit (do not rebuild)
- [x] k1: dropdown "EnrollmentTypeList" (7 options)
- [x] k2: dropdown "ProviderTypeList" (69 options)
- [x] k3: dropdown "LastStatusList" (13 options)
- [x] k4: date "Receipt Date"
- [x] k5: dropdown "StatesList" (57 options)
- [x] k6: dropdown "ApplicationTypeListList" (5 options)
- [x] k7: dropdown "megaGridUserSelections" (2 options)
- [x] k8: dropdown "ExportOptionsList" (3 options)
- [x] k9: numeric "Page"
- [x] k10: dropdown "Page sizes drop down" (3 options)
- [x] Search: fills the grid with synthetic rows, reveals h1
- [x] Search with nothing changed: shows the live validation banner and field messages (not rows); with something typed it shows the grid
- [x] 1 radio / checkbox / dropdown effect(s) on hidden parts, measured on the live page and applied by the kit (do not write your own show/hide for them)
- [x] dialog placement by layout: below (max-width: 1280px) the portal's phone branch, above it centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] Reset: clears the fields
- [x] collapsible panels (chevrons)
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] 1 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h2; Search reveals h1): find in the script what shows each and build that
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/hp.ua3.providerEnrollment.commonPartial__884a35a7.js
