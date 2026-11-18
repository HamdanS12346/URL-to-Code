# n1.2 credential-details: what can be done here (top window "Edit FTP Server Credentials")

Numbers match map.png. `danger` = never clicked (commit). Rows: the first row stands for all of them.

| el | kind | text / label | id / name | rules / options | note |
|---|---|---|---|---|---|
| e1 | text | Ranjan / Description | Edit_FtpDescription / FtpDescription | {"length-max":"Description has a maximum length of 100 characters.","regex":"Description contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","required":"Description is a required field.","maxlength":100,"inputmode":"text"} |  |
| e2 | text | 2 / Transfer Mode | Edit_FtpTransferMode / FtpTransferMode | {"length-max":"Transfer Mode has a maximum length of 1 characters.","required":"Transfer Mode is a required field.","maxlength":1,"inputmode":"text"} |  |
| e3 | text | 10.143.27.994 / IP Server | Edit_FtpServerIp / FtpServerIp | {"length-max":"IP Server has a maximum length of 15 characters.","regex":"IP Server contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","required":"IP Server is a required field.","maxlength":15,"inputmode":"text"} |  |
| e4 | text | 27 / Port | Edit_FtpPort / FtpPort | {"number":"The field Port must be a number.","regex":"Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","required":"Port is a required field.","inputmode":"text"} |  |
| e5 | text | Proxy Address | Edit_FtpProxyAddress / FtpProxyAddress | {"length-max":"Proxy Address has a maximum length of 200 characters.","regex":"Proxy Address contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","maxlength":200,"inputmode":"text"} |  |
| e6 | text | Proxy Port | Edit_FtpProxyPort / FtpProxyPort | {"number":"The field Proxy Port must be a number.","regex":"Proxy Port contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","inputmode":"text"} |  |
| e7 | text | ranjan2711 / Server User | Edit_FtpUser / FtpUser | {"length-max":"Server User has a maximum length of 50 characters.","regex":"Server User contains invalid characters. The characters ; * ^ : ~ < > % are not allowed.","regex-pattern":"^([^;*^:~<>%])*$","required":"Server User is a required field.","maxlength":50,"inputmode":"text"} |  |
| e8 | button | Invalidate | btnInvalidate |  |  |
| e9 | button | Cancel | viewEditFTPServerCredentialsIdCancelButton |  | kit: cancel |
| e10 | button | Save | btnSave |  | danger: commit: the kit marks it a Save; kit: save |
