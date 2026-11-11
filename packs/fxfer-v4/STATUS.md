# fxfer-v4: status

| step | status | attempts | at | first problem |
|---|---|---|---|---|
| capture:home | done |  | 2026-11-11 07:49 |  |
| capture:file-transfer-configuration | done |  | 2026-11-11 07:50 |  |
| capture:file-transfer-tracking | done |  | 2026-11-11 07:51 |  |
| capture:ftp-server-credentials | done |  | 2026-11-11 07:52 |  |
| spec:home | done | 1 | 2026-11-11 07:59 |  |
| spec:file-transfer-tracking | done | 1 | 2026-11-11 08:01 |  |
| spec:file-transfer-configuration | done | 1 | 2026-11-11 08:02 |  |
| spec:ftp-server-credentials | done | 1 | 2026-11-11 08:06 |  |
| port:home | done |  | 2026-11-11 08:06 |  |
| port:file-transfer-configuration | done |  | 2026-11-11 08:06 |  |
| port:file-transfer-tracking | done |  | 2026-11-11 08:06 |  |
| port:ftp-server-credentials | done |  | 2026-11-11 08:06 |  |
| preflight:kit | needs-review |  | 2026-11-11 08:08 | the kit on the raw port (fix it in kits/<kit>, not in the app): |
| code:file-transfer-tracking | blocked | 1 | 2026-11-11 08:14 | the writer reports a problem outside its files (packs/fxfer-v4/app/src/screens/file-transfer-tracking/BLOCKED.md): |
| code:file-transfer-configuration | blocked | 1 | 2026-11-11 08:15 | the writer reports a problem outside its files (packs/fxfer-v4/app/src/screens/file-transfer-configuration/BLOCKED.md): |
| code:ftp-server-credentials | blocked | 1 | 2026-11-11 08:25 | the writer reports a problem outside its files (packs/fxfer-v4/app/src/screens/ftp-server-credentials/BLOCKED.md): |
| code:home | blocked | 2 | 2026-11-11 08:35 | the writer reports a problem outside its files (packs/fxfer-v4/app/src/screens/home/BLOCKED.md): |

Logs of every writer call: packs/fxfer-v4/logs/. Re-run `npm run ui -- fxfer-v4` to continue; `--redo` or `--from <stage>` to do steps again.
