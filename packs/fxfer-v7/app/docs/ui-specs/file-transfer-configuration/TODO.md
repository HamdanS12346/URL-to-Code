# Checklist: File Transfer Configuration

Generated from the capture (kit/screen.json). Route: `#/file-transfer-configuration`.

## Done by the kit (do not rebuild)
- [x] k1: numeric "Configuration ID"
- [x] k2: dropdown "SearchModuleList" (30 options)
- [x] k3: dropdown "ProtocolList" (4 options)
- [x] k4: grid "FileTransferSearchGrid"
- [x] d1: dialog "Add File Transfer Configuration", opened by Create New #1 (dialogs/ in the screen folder)
- [x] d2: dialog "View File Transfer Configuration", opened by the first grid row (dialogs/ in the screen folder)
- [x] Search: fills the grid with synthetic rows, reveals h2. On the live page a Search with nothing typed listed 10 row(s): keep it that way (no rule of yours may stop a Search with an empty form; the checks click Search, then a row)
- [x] "Create New" on dialog "Add File Transfer Configuration": shows [data-kit-h="h24"], hides #divSourceId; Cancel / Save inside that part put it away
- [x] grid row: a click selects it, a double-click opens dialog d2
- [x] 1 radio / checkbox / dropdown effect(s) on hidden parts, measured on the live page and applied by the kit (do not write your own show/hide for them)
- [x] Save with nothing filled: the summary banner (with its X) and the field messages
- [x] closing a dialog with an edit: the "form data has changed" window where the live one asked (X, Cancel, Escape)
- [x] dialog placement by layout: below (max-width: 1280px) the portal's phone branch, above it centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] Reset: clears the fields
- [x] collapsible panels (chevrons)
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 1 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h1; Search reveals h2): find in the script what shows each and build that
- [ ] dialog "Add File Transfer Configuration": 20 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] dialog "View File Transfer Configuration": 38 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js
