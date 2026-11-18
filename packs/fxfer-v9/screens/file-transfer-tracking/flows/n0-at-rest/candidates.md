# n0 at-rest: what can be done here (the page)

Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.

| el | kind | text / label | id / name | rules / options | note |
|---|---|---|---|---|---|
| e1 | button |  |  |  | kit: collapse |
| e2 | text | File ID | FileId / FileId | {"length-max":"File ID has a maximum length of 50 characters.","regex":"File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","maxlength":50,"inputmode":"text"} |  |
| e3 | text | File Name | FileName / FileName | {"length-max":"File Name has a maximum length of 100 characters.","regex":"File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","maxlength":100,"inputmode":"text"} |  |
| e4 | dropdown | select a value...FileStatusList / File Status |  | 1, 2, 3 |  |
| e5 | dropdown | select a value...DirectionList / Direction |  | 1, 2 |  |
| e6 | dropdown | select a value...TransportTypeList / Transport Type |  | 1, 2, 3, 4 |  |
| e7 | dropdown | select a value...SourceLocation / Source Location |  | 40defc3b-7227-4798-811a-1681e6505df2, 5906a815-02de-4c35-9014-96d920f4285d, a2bd6591-53e6-4c8e-8101-76e8cc105eef, 353244d3-8c51-453d-a26b-d31ba8375431, 67391ddc-ec70-4630-b941-c4e646d99be2, 5e8e5b7e-95a2-43e5-8716-1e4464922617, ddc110bf-9057-484d-9a18-ce5e849ca1f2, b16dfecc-c9fc-45f1-96bb-70b17d934a5f, 284a46bc-10db-46e7-9f1b-d4c6faf29fa3, 1f2a84a6-47c6-4ca2-a7d3-416ad41b48b0, 5ee49daa-f142-4c83-80ce-668bce190cf1, 109fbfd1-d87a-40fd-a3d0-ae3aed2d5d1a |  |
| e8 | text | Trading Partner ID | TradingPartnerId / TradingPartnerId | {"length-max":"Trading Partner ID has a maximum length of 25 characters.","regex":"Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","maxlength":25,"inputmode":"text"} |  |
| e9 | dropdown | From Date | FromDate / FromDate |  |  |
| e10 | dropdown | To Date | ToDate / ToDate |  |  |
| e11 | text | From Size (KB) |  | {} |  |
| e12 | text | To Size (KB) |  | {} |  |
| e13 | button | Reset | resetButton |  | kit: reset |
| e14 | button | Cancel | cancelButton |  | kit: cancel |
| e15 | button | Search | nextButton |  | kit: search |
