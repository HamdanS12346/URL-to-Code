# n2.3.1 toggle-rename: what can be done here (top window "Add File Transfer Configuration")

Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.

| el | kind | text / label | id / name | rules / options | note |
|---|---|---|---|---|---|
| e1 | dropdown | SFTPDestinationProtocolList / Destination Protocol |  | 1, 2, 3, 4 |  |
| e2 | dropdown | select a value...Server / Server |  | 23a12f97-cdc4-4540-b833-9bc2a68d02a2, e0e6ef34-97c4-4a1c-b162-afea93332afb, 680c7460-8189-4255-93e7-2b6424fdb650, 785712c8-6112-45f1-a020-8d950d5fa7d6, 94014542-6afc-427d-91fa-432f4e4da4a7 |  |
| e3 | dropdown | User DefinedDestinationTypeList / Destination Type |  | FileToEvent, UserDefined |  |
| e4 | text | Destination Address | DestinationAddress / DestinationAddress | {"length-max":"Destination Address has a maximum length of 248 characters.","required":"Destination Address is a required field.","maxlength":248,"inputmode":"text"} |  |
| e5 | text | Contact Name | ContactName / ContactName | {"length-max":"Contact Name has a maximum length of 50 characters.","regex":"Contact Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","maxlength":50,"inputmode":"text"} |  |
| e6 | text | Contact Phone | ContactPhone / ContactPhone | {"length-max":"Contact Phone has a maximum length of 50 characters.","regex":"Enter Valid Phone Number.","regex-pattern":"^(?!(^\\(?(0{3})\\)?( /-/\\.)?0{3}( /-/\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( /-/\\.)?\\d{3,3}( /-/\\.)?\\d{4,4}$)","inputmode":"text"} |  |
| e7 | text | Contact Email | ContactEmail / ContactEmail | {"length-max":"Contact Email has a maximum length of 50 characters.","regex":"Contact Email is not a valid email address. Enter email with 'name@domain' format.","regex-pattern":"^[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$","maxlength":50,"inputmode":"text"} |  |
| e8 | check | true / Overwrite At Destination | OverwriteAtDestination / OverwriteAtDestination |  | checked |
| e9 | check | true / Compress At Destination | CompressAtDestination / CompressAtDestination |  | checked |
| e10 | check | true / Destination Is Archive | DestinationIsArchive / DestinationIsArchive |  | checked |
| e11 | check | true / Rename At Destination | RenameAtDestination / RenameAtDestination |  | checked |
| e12 | dropdown | select a value...RenamePatternList / Rename Pattern |  | 1, 2, 3, 4, 5 |  |
| e13 | check | true / Active | Active / Active |  | checked |
| e14 | button | Reset | DestinationResetButton |  |  |
| e15 | button | Cancel | DestinationCancelButton |  |  |
| e16 | button | Add Another | AddAnotherButton |  |  |
| e17 | button | Save | SaveAndCloseButton |  | danger: commit: "Save" |
