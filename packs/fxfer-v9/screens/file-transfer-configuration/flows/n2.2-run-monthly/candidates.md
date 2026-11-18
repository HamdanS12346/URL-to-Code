# n2.2 run-monthly: what can be done here (top window "Add File Transfer Configuration")

Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.

| el | kind | text / label | id / name | rules / options | note |
|---|---|---|---|---|---|
| e1 | text | Configuration Name | Edit_ConfigName / ConfigName | {"length-max":"Configuration Name has a maximum length of 50 characters.","regex":"Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].","regex-pattern":"^([A-Za-z0-9]/[^\\x00-\\x7F])*$","required":"Configuration Name is a required field.","maxlength":50,"inputmode":"text"} |  |
| e2 | text | Description | Description / Description | {"length-max":"Description has a maximum length of 200 characters.","maxlength":200,"inputmode":"text"} |  |
| e3 | dropdown | select a value...ProtocolTypeList / Protocol |  | 1, 2, 3, 4 |  |
| e4 | text | Source Address | SourceAddress / SourceAddress | {"length-max":"Source Address has a maximum length of 248 characters.","required":"Source Address is a required field.","maxlength":248,"inputmode":"text"} |  |
| e5 | text | Source File Mask | SourceFileMask / SourceFileMask | {"length-max":"Source File Mask has a maximum length of 50 characters.","required":"Source File Mask is a required field.","maxlength":50,"inputmode":"text"} |  |
| e6 | dropdown | select a value...FileDirectionList / File Direction |  | 1, 2 |  |
| e7 | text | Trading Partner | TradingPartner / TradingPartner | {"length-max":"Trading Partner has a maximum length of 10 characters.","regex":"Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].","regex-pattern":"^([A-Za-z0-9]/[^\\x00-\\x7F])*$","maxlength":10,"inputmode":"text"} |  |
| e8 | text | Owner Name | Edit_OwnerName / OwnerName | {"length-max":"Owner Name has a maximum length of 50 characters.","required":"Owner Name is a required field.","maxlength":50,"inputmode":"text"} |  |
| e9 | text | Owner Phone | OwnerPhoneNumber / OwnerPhoneNumber | {"length-max":"Owner Phone has a maximum length of 20 characters.","regex":"Enter Valid Phone Number.","regex-pattern":"^(?!(^\\(?(0{3})\\)?( /-/\\.)?0{3}( /-/\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( /-/\\.)?\\d{3,3}( /-/\\.)?\\d{4,4}$)","required":"Owner Phone is a required field.","inputmode":"text"} |  |
| e10 | dropdown | select a value...AddConfigModuleList / Owner Module |  | 0b34481f-f69c-3ab6-e053-c9157aceff03, 09df7d37-3bd5-7c9c-e053-c9157aceb3f2, bb31ef47-8d1e-c99a-e053-c9157ace53da, 06c7121b-8166-4e32-e054-0017a4ab527b, 98385830-7fc2-5bb4-e053-c9157ace364b, 0e7b7146-aa81-5292-e053-c9157ace4cbe, 96c6da47-0ae6-2bcd-e053-c9157ace38f9, fdf18357-3c14-7cb7-e053-c9157ace3990, ff19da47-cc91-e17d-e053-c9157ace99a5, 2e60501f-f8aa-50b6-e053-c9157acefb50, 30de9349-0e99-aec1-e053-c9157ace0401, f1612a4b-ff51-1a03-e053-c9157ace9264 |  |
| e11 | text | Owner Email | OwnerEmail / OwnerEmail | {"length-max":"Owner Email has a maximum length of 150 characters.","regex":"Owner Email is not a valid email address. Enter email with 'name@domain' format.","regex-pattern":"^[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$","required":"Owner Email is a required field.","maxlength":150,"inputmode":"text"} |  |
| e12 | radio | 1 / Run Weekly | RunSchedule_ID1 / RunSchedule.ID |  |  |
| e13 | radio | 2 / Run Monthly | RunSchedule_ID2 / RunSchedule.ID |  | checked |
| e14 | check | true / Run On First Day Month | RunOnFirstDay / RunOnFirstDay |  |  |
| e15 | check | true / Run On Last Day Month | RunOnLastDay / RunOnLastDay |  |  |
| e16 | dropdown | select a value...RunOnThisDayList / Run On This Day Month |  | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |  |
| e17 | dropdown | select a value...TimeWindowStartList / Time Window Start |  | 0000, 0030, 0100, 0130, 0200, 0230, 0300, 0330, 0400, 0430, 0500, 0530 |  |
| e18 | dropdown | select a value...TimeWindowEndList / Time Window End |  | 0000, 0030, 0100, 0130, 0200, 0230, 0300, 0330, 0400, 0430, 0500, 0530 |  |
| e19 | check | true / Send Notification | SendNotification / SendNotification |  |  |
| e20 | check | true / Suspend | Suspended / Suspended |  |  |
| e21 | check | true / Active | IsActive / IsActive |  | checked |
| e22 | check | true / Show Inactives | DestinationShowInactiveCheckBox / DestinationShowInactiveCheckBox |  |  |
| e23 | button | Create New | DestinationGridAddButton |  |  |
| e24 | row | There are no records found. |  |  | 1 rows |
| e25 | button | Reset | FileTransferConfigurationEditFormResetButton |  |  |
| e26 | button | Cancel | FileTransferConfigurationEditFormCancelButton |  |  |
| e27 | button | Save | FileTransferConfigurationEditFormSaveButton |  | danger: commit: "Save" |
| e28 | row | There are no records found. |  |  | 1 rows |
