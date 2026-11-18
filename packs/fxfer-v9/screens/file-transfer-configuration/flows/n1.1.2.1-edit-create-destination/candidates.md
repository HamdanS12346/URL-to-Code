# n1.1.2.1 edit-create-destination: what can be done here (top window "Edit File Transfer Configuration")

Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.

| el | kind | text / label | id / name | rules / options | note |
|---|---|---|---|---|---|
| e1 | dropdown | select a value...DestinationProtocolList / Destination Protocol |  | 1, 2, 3, 4 |  |
| e2 | dropdown | select a value...DestinationTypeList / Destination Type |  | FileToEvent, UserDefined |  |
| e3 | text | Destination Address | DestinationAddress / DestinationAddress | {"length-max":"Destination Address has a maximum length of 248 characters.","required":"Destination Address is a required field.","maxlength":248,"inputmode":"text"} |  |
| e4 | text | Contact Name | ContactName / ContactName | {"length-max":"Contact Name has a maximum length of 50 characters.","regex":"Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","maxlength":50,"inputmode":"text"} |  |
| e5 | text | Contact Phone | ContactPhone / ContactPhone | {"length-max":"Contact Phone has a maximum length of 50 characters.","regex":"Enter Valid Phone Number.","regex-pattern":"^(?!(^\\(?(0{3})\\)?( /-/\\.)?0{3}( /-/\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( /-/\\.)?\\d{3,3}( /-/\\.)?\\d{4,4}$)","inputmode":"text"} |  |
| e6 | text | Contact Email | ContactEmail / ContactEmail | {"length-max":"Contact Email has a maximum length of 50 characters.","regex":"Contact Email is not a valid email address. Enter email with 'name@domain' format.","regex-pattern":"^[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$","maxlength":50,"inputmode":"text"} |  |
| e7 | check | true / Overwrite At Destination | OverwriteAtDestination / OverwriteAtDestination |  |  |
| e8 | check | true / Compress At Destination | CompressAtDestination / CompressAtDestination |  |  |
| e9 | check | true / Destination Is Archive | DestinationIsArchive / DestinationIsArchive |  |  |
| e10 | check | true / Rename At Destination | RenameAtDestination / RenameAtDestination |  |  |
| e11 | check | true / Active | Active / Active |  | checked |
| e12 | button | Reset | DestinationResetButton |  |  |
| e13 | button | Cancel | DestinationCancelButton |  |  |
| e14 | button | Add Another | AddAnotherButton |  |  |
| e15 | button | Save | SaveAndCloseButton |  | danger: commit: "Save" |
