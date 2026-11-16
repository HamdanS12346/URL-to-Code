# Checklist: File Transfer Tracking

Generated from the capture (kit/screen.json). Route: `#/file-transfer-tracking`.

## Done by the kit (do not rebuild)
- [x] k1: dropdown "FileStatusList" (3 options)
- [x] k2: dropdown "DirectionList" (2 options)
- [x] k3: dropdown "TransportTypeList" (4 options)
- [x] k4: dropdown "SourceLocation" (97 options)
- [x] k5: datetime "From Date"
- [x] k6: datetime "To Date"
- [x] k7: numeric "From Size (KB)"
- [x] k8: numeric "To Size (KB)"
- [x] k9: grid "fileTrackingResultsGrid"
- [x] d1: dialog "File Transfer Tracking", opened by the first grid row (dialogs/ in the screen folder)
- [x] Search: fills the grid with synthetic rows, reveals h2. On the live page a Search with nothing typed listed 10 row(s): keep it that way (no rule of yours may stop a Search with an empty form; the checks click Search, then a row)
- [x] grid row: a click selects it, a double-click opens dialog d1
- [x] dialog placement by layout: centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] Reset: clears the fields
- [x] collapsible panels (chevrons)
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 1 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h1; Search reveals h2): find in the script what shows each and build that
- [ ] dialog "File Transfer Tracking": 17 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransferTracking/hp.ua3.FileTransfer.searchFileTransferTracking__884a35a7.js
