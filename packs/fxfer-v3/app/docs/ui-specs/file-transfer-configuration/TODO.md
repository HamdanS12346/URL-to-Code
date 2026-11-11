# Checklist: File Transfer Configuration

Generated from the capture (kit/screen.json). Route: `#/file-transfer-configuration`.

## Done by the kit (do not rebuild)
- [x] k1: numeric "Configuration ID"
- [x] k2: dropdown "SearchModuleList" (30 options)
- [x] k3: dropdown "ProtocolList" (4 options)
- [x] k4: grid "FileTransferSearchGrid"
- [x] d1: dialog "Add File Transfer Configuration", opened by Create New #1 (dialogs/ in the screen folder)
- [x] d2: dialog "View File Transfer Configuration", opened by the first grid row (dialogs/ in the screen folder)
- [x] Search: fills the grid with synthetic rows, reveals h7
- [x] grid row: a click selects it, a double-click opens dialog d2
- [x] Reset: clears the fields
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 7 part(s) hidden at rest (data-kit-h=…) that Search does not reveal (it reveals h7): find in the script what shows each (a radio, a checkbox, a dropdown value) and build that
- [ ] every task in spec/tasks.md that the list above does not cover (messages such as "At least one search criteria is required.")

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransfer/hp.ua3.FileTransfer.searchSourceLocations__884a35a7.js
