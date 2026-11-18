# Checklist: File Transfer Configuration

Generated from the capture (kit/screen.json). Route: `#/file-transfer-configuration`.

## Done by the kit (do not rebuild)
- [x] k1: numeric "Configuration ID"
- [x] k2: dropdown "SearchModuleList" (30 options)
- [x] k3: dropdown "ProtocolList" (4 options)
- [x] k4: grid "FileTransferSearchGrid"
- [x] d1: dialog "Add File Transfer Configuration", opened by Create New #1 (dialogs/ in the screen folder)
- [x] d2: dialog "View File Transfer Configuration", opened by the first grid row (dialogs/ in the screen folder)
- [x] d3: dialog "Edit File Transfer Configuration", opened by flow n1.1.2 inside d2 (dialogs/ in the screen folder)
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
- [x] 10 click(s) found by the flows stage that open a window or show a part (kit.json "flows": n2, n3, n1.1, n2.1, n2.2, n1.1.1, n1.1.2, n2.3.1, n1.1.2.2, n1.1.2.3)

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 1 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h1; Search reveals h2): find in the script what shows each and build that
- [ ] dialog "Add File Transfer Configuration": 20 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] dialog "View File Transfer Configuration": 38 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] dialog "Edit File Transfer Configuration": 24 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] flow n1 "search-results": its fields as measured (flows/n1-search-results/node.json "fields"): Configuration Name accepts letters/digits/spaces/symbols, max 50; Owner Name accepts letters/digits/spaces/symbols, max 50
- [ ] flow n2 "Add File Transfer Configuration": its fields as measured (flows/n2-create-new/node.json "fields"): Configuration Name accepts letters/digits/spaces/symbols, max 50; Description accepts letters/digits/spaces/symbols; Source Address accepts letters/digits/spaces/symbols; Source File Mask accepts letters/digits/spaces/symbols, max 50; Trading Partner accepts letters/digits/spaces/symbols, max 10; Owner Name accepts letters/digits/spaces/symbols, max 50; Owner Phone accepts digits/symbols; Owner Email accepts letters/digits/spaces/symbols
- [ ] flow n2.1 "Add File Transfer Configuration": its fields as measured (flows/n2.1-run-weekly/node.json "fields"): Configuration Name accepts letters/digits/spaces/symbols, max 50; Description accepts letters/digits/spaces/symbols; Source Address accepts letters/digits/spaces/symbols; Source File Mask accepts letters/digits/spaces/symbols, max 50; Trading Partner accepts letters/digits/spaces/symbols, max 10; Owner Name accepts letters/digits/spaces/symbols, max 50; Owner Phone accepts digits/symbols; Owner Email accepts letters/digits/spaces/symbols
- [ ] flow n2.2 "Add File Transfer Configuration": its fields as measured (flows/n2.2-run-monthly/node.json "fields"): Configuration Name accepts letters/digits/spaces/symbols, max 50; Description accepts letters/digits/spaces/symbols; Source Address accepts letters/digits/spaces/symbols; Source File Mask accepts letters/digits/spaces/symbols, max 50; Trading Partner accepts letters/digits/spaces/symbols, max 10; Owner Name accepts letters/digits/spaces/symbols, max 50; Owner Phone accepts digits/symbols; Owner Email accepts letters/digits/spaces/symbols
- [ ] flow n2.3 "Add File Transfer Configuration": its fields as measured (flows/n2.3-create-destination/node.json "fields"): Destination Address accepts letters/digits/spaces/symbols; Contact Name accepts letters/digits/spaces/symbols, max 50; Contact Phone accepts digits/symbols; Contact Email accepts letters/digits/spaces/symbols, max 50
- [ ] flow n1.1.2 "Edit File Transfer Configuration": its fields as measured (flows/n1.1.2-edit-configuration/node.json "fields"): Configuration Name accepts letters/digits/spaces/symbols, max 50; Description accepts letters/digits/spaces/symbols; Source Address accepts letters/digits/spaces/symbols; Source File Mask accepts letters/digits/spaces/symbols, max 50; Trading Partner accepts letters/digits/spaces/symbols, max 10; Owner Name accepts letters/digits/spaces/symbols, max 50; Owner Phone accepts digits/symbols; Owner Email accepts letters/digits/spaces/symbols
- [ ] flow n2.3.1 "Add File Transfer Configuration": its fields as measured (flows/n2.3.1-toggle-rename/node.json "fields"): Destination Address accepts letters/digits/spaces/symbols; Contact Name accepts letters/digits/spaces/symbols, max 50; Contact Phone accepts digits/symbols; Contact Email accepts letters/digits/spaces/symbols, max 50
- [ ] flow n2 "Add File Transfer Configuration": Save with the form as it was shows 0 banner(s) and 12 field message(s) (flows/n2-create-new/node.json "saveProbe")
- [ ] flow n2.1 "Add File Transfer Configuration": Save with the form as it was shows 0 banner(s) and 11 field message(s) (flows/n2.1-run-weekly/node.json "saveProbe")
- [ ] flow n2.2 "Add File Transfer Configuration": Save with the form as it was shows 0 banner(s) and 11 field message(s) (flows/n2.2-run-monthly/node.json "saveProbe")
- [ ] flow n2.3 "Add File Transfer Configuration": Save with the form as it was shows 0 banner(s) and 3 field message(s) (flows/n2.3-create-destination/node.json "saveProbe")
- [ ] flow n2.3.1 "Add File Transfer Configuration": Save with the form as it was shows 0 banner(s) and 4 field message(s) (flows/n2.3.1-toggle-rename/node.json "saveProbe")
- [ ] states the kit does not reach by itself (a step that types or picks, or a click it could not place): n2.3 "Add File Transfer Configuration", n1.1.2.1 "Edit File Transfer Configuration", n2.3.1.1 "Add File Transfer Configuration", n2.3.1.2 "Add File Transfer Configuration": build what leads there from flows/FLOWS.md
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js
