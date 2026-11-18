# Checklist: FTP Server Credentials

Generated from the capture (kit/screen.json). Route: `#/ftp-server-credentials`.

## Done by the kit (do not rebuild)
- [x] k1: grid "FTPServerCredentialsGrid"
- [x] d1: dialog "Add FTP Server Credentials", opened by Create New #1 (dialogs/ in the screen folder)
- [x] d2: dialog "Edit FTP Server Credentials", opened by the first grid row (dialogs/ in the screen folder)
- [x] d3: dialog "Alert Confirmation", opened by flow n1.2.1 inside d2 (dialogs/ in the screen folder)
- [x] Search: fills the grid with synthetic rows, reveals h2. On the live page a Search with nothing typed listed 5 row(s): keep it that way (no rule of yours may stop a Search with an empty form; the checks click Search, then a row)
- [x] grid row: a click selects it, a double-click opens dialog d2
- [x] Save with nothing filled: the summary banner (with its X) and the field messages
- [x] closing a dialog with an edit: the "form data has changed" window where the live one asked (X, Cancel, Escape)
- [x] dialog placement by layout: below (max-width: 1280px) the portal's phone branch, above it centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] the grid's column filter popup
- [x] Reset: clears the fields
- [x] collapsible panels (chevrons)
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu
- [x] 5 click(s) found by the flows stage that open a window or show a part (kit.json "flows": n2, n3, n1.1, n1.2, n1.2.1)

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 1 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h1; Search reveals h2): find in the script what shows each and build that
- [ ] dialog "Add FTP Server Credentials": 13 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] dialog "Edit FTP Server Credentials": 12 part(s) hidden at rest that no measured control shows: from the dialog's script
- [ ] flow n1.1 "criteria-expanded": its fields as measured (flows/n1.1-criteria-expanded/node.json "fields"): Server Name accepts letters/digits/spaces/symbols, max 50
- [ ] flow n1.2 "Edit FTP Server Credentials": its fields as measured (flows/n1.2-credential-details/node.json "fields"): Description accepts letters/digits/spaces/symbols, max 100; Transfer Mode accepts letters, max 1; IP Server accepts letters/digits/spaces/symbols, max 15; Port accepts letters/digits/spaces/symbols; Proxy Address accepts letters/digits/spaces/symbols; Proxy Port accepts letters/digits/spaces/symbols; Server User accepts letters/digits/spaces/symbols, max 50
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransfer/hp.ua3.fileTransfer.searchFtpServerCredentials__884a35a7.js
