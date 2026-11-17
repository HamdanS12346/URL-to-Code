# Checklist: /dashboard

Generated from the capture (kit/screen.json). Route: `#/dashboard`.

## Done by the kit (do not rebuild)
- [x] k1: grid "providerEnrollmentResultsGrid"
- [x] Search: fills the grid with synthetic rows, reveals h1. On the live page a Search with nothing typed listed 1 row(s): keep it that way (no rule of yours may stop a Search with an empty form; the checks click Search, then a row)
- [x] dialog placement by layout: below (max-width: 1280px) the portal's phone branch, above it centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] Reset: clears the fields
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] 4 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h2, h3, h4, h5; Search reveals h1): find in the script what shows each and build that
- [ ] dialog EnrollmentPreferenceOverlay (button #settingPreferencesButton) is opened by the screen's script but was NOT captured: do not invent it. Write it in GUESSED.md as "not captured, re-capture needed"
- [ ] grid row double-click calls gridRowDoubleClickCallBack but the capture saw no dialog: write it in GUESSED.md
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/hp.ua3.providerEnrollment.EnrollmentDashboard__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.QuickSearch__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.SearchResultGrid__884a35a7.js
