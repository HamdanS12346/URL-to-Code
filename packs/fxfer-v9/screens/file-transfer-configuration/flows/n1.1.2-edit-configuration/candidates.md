# n1.1.2 edit-configuration: what can be done here (top window "Edit File Transfer Configuration")

Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.

| el | kind | text / label | id / name | rules / options | note |
|---|---|---|---|---|---|
| e1 | text | Test / Configuration Name | Edit_ConfigName / ConfigName | {"length-max":"Configuration Name has a maximum length of 50 characters.","regex":"Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].","regex-pattern":"^([A-Za-z0-9]/[^\\x00-\\x7F])*$","required":"Configuration Name is a required field.","maxlength":50,"inputmode":"text"} |  |
| e2 | text | Description | Description / Description | {"length-max":"Description has a maximum length of 200 characters.","maxlength":200,"inputmode":"text"} |  |
| e3 | dropdown | FTPProtocolTypeList / Protocol |  | 1, 2, 3, 4 |  |
| e4 | dropdown | SFTP TESTFtsServerList / Server |  | 23a12f97-cdc4-4540-b833-9bc2a68d02a2, e0e6ef34-97c4-4a1c-b162-afea93332afb, 680c7460-8189-4255-93e7-2b6424fdb650, 785712c8-6112-45f1-a020-8d950d5fa7d6, 94014542-6afc-427d-91fa-432f4e4da4a7 |  |
| e5 | text | /test / Source Address | SourceAddress / SourceAddress | {"length-max":"Source Address has a maximum length of 248 characters.","required":"Source Address is a required field.","maxlength":248,"inputmode":"text"} |  |
| e6 | text | wer / Source File Mask | SourceFileMask / SourceFileMask | {"length-max":"Source File Mask has a maximum length of 50 characters.","required":"Source File Mask is a required field.","maxlength":50,"inputmode":"text"} |  |
| e7 | dropdown | select a value...FileDirectionList / File Direction |  | 1, 2 |  |
| e8 | text | Trading Partner | TradingPartner / TradingPartner | {"length-max":"Trading Partner has a maximum length of 10 characters.","regex":"Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9].","regex-pattern":"^([A-Za-z0-9]/[^\\x00-\\x7F])*$","maxlength":10,"inputmode":"text"} |  |
| e9 | text | yashwanth / Owner Name | Edit_OwnerName / OwnerName | {"length-max":"Owner Name has a maximum length of 50 characters.","required":"Owner Name is a required field.","maxlength":50,"inputmode":"text"} |  |
| e10 | text | 123-333-3333 / Owner Phone | OwnerPhoneNumber / OwnerPhoneNumber | {"length-max":"Owner Phone has a maximum length of 20 characters.","regex":"Enter Valid Phone Number.","regex-pattern":"^(?!(^\\(?(0{3})\\)?( /-/\\.)?0{3}( /-/\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( /-/\\.)?\\d{3,3}( /-/\\.)?\\d{4,4}$)","required":"Owner Phone is a required field.","inputmode":"text"} |  |
| e11 | dropdown | AdministrationAddConfigModuleList / Owner Module |  | 0b34481f-f69c-3ab6-e053-c9157aceff03, 09df7d37-3bd5-7c9c-e053-c9157aceb3f2, bb31ef47-8d1e-c99a-e053-c9157ace53da, 06c7121b-8166-4e32-e054-0017a4ab527b, 98385830-7fc2-5bb4-e053-c9157ace364b, 0e7b7146-aa81-5292-e053-c9157ace4cbe, 96c6da47-0ae6-2bcd-e053-c9157ace38f9, fdf18357-3c14-7cb7-e053-c9157ace3990, ff19da47-cc91-e17d-e053-c9157ace99a5, 2e60501f-f8aa-50b6-e053-c9157acefb50, 30de9349-0e99-aec1-e053-c9157ace0401, f1612a4b-ff51-1a03-e053-c9157ace9264 |  |
| e12 | text | yashwanth.goduguchintha@dxc.com / Owner Email | OwnerEmail / OwnerEmail | {"length-max":"Owner Email has a maximum length of 150 characters.","regex":"Owner Email is not a valid email address. Enter email with 'name@domain' format.","regex-pattern":"^[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{/}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$","required":"Owner Email is a required field.","maxlength":150,"inputmode":"text"} |  |
| e13 | radio | 1 / Run Weekly | RunSchedule_ID1 / RunSchedule.ID |  |  |
| e14 | radio | 2 / Run Monthly | RunSchedule_ID2 / RunSchedule.ID |  | checked |
| e15 | check | true / Run On First Day Month | RunOnFirstDay / RunOnFirstDay |  |  |
| e16 | check | true / Run On Last Day Month | RunOnLastDay / RunOnLastDay |  |  |
| e17 | dropdown | select a value...RunOnThisDayList / Run On This Day Month |  | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 |  |
| e18 | dropdown | 0000TimeWindowStartList / Time Window Start |  | 0000, 0030, 0100, 0130, 0200, 0230, 0300, 0330, 0400, 0430, 0500, 0530 |  |
| e19 | dropdown | 0030TimeWindowEndList / Time Window End |  | 0000, 0030, 0100, 0130, 0200, 0230, 0300, 0330, 0400, 0430, 0500, 0530 |  |
| e20 | check | true / Send Notification | SendNotification / SendNotification |  |  |
| e21 | check | true / Suspend | Suspended / Suspended |  |  |
| e22 | check | true / Active | IsActive / IsActive |  | checked |
| e23 | check | true / Show Inactives | DestinationShowInactiveCheckBox / DestinationShowInactiveCheckBox |  |  |
| e24 | button | Create New | DestinationGridAddButton |  | kit: create |
| e25 | button | Reset | FileTransferConfigurationEditFormResetButton |  | kit: reset |
| e26 | button | Cancel | FileTransferConfigurationEditFormCancelButton |  | kit: cancel |
| e27 | button | Save | FileTransferConfigurationEditFormSaveButton |  | danger: commit: the kit marks it a Save; kit: save |
| e28 | row | https://dxccommercial.test.mapshc.comFTPActivetruefalsefalse |  |  | 2 rows |
