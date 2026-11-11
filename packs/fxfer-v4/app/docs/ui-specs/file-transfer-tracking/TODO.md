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
- [x] Search: fills the grid with synthetic rows, reveals h13
- [x] Reset: clears the fields
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 13 part(s) hidden at rest (data-kit-h=…) that Search does not reveal (it reveals h13): find in the script what shows each (a radio, a checkbox, a dropdown value) and build that
- [ ] every task in spec/tasks.md that the list above does not cover (messages such as "At least one search criteria is required.")

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransferTracking/hp.ua3.FileTransfer.searchFileTransferTracking__884a35a7.js
