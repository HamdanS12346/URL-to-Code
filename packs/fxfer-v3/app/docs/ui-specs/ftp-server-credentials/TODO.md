# Checklist: FTP Server Credentials

Generated from the capture (kit/screen.json). Route: `#/ftp-server-credentials`.

## Done by the kit (do not rebuild)
- [x] k1: grid "FTPServerCredentialsGrid"
- [x] d1: dialog "Add FTP Server Credentials", opened by Create New #1 (dialogs/ in the screen folder)
- [x] d2: dialog "Edit FTP Server Credentials", opened by the first grid row (dialogs/ in the screen folder)
- [x] Search: fills the grid with synthetic rows, reveals h3
- [x] grid row: a click selects it, a double-click opens dialog d2
- [x] Reset: clears the fields
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 3 part(s) hidden at rest (data-kit-h=…) that Search does not reveal (it reveals h3): find in the script what shows each (a radio, a checkbox, a dropdown value) and build that
- [ ] every task in spec/tasks.md that the list above does not cover (messages such as "At least one search criteria is required.")

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/FileTransfer/hp.ua3.fileTransfer.searchFtpServerCredentials__884a35a7.js
