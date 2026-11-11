# fxfer-v3: status

| step | status | attempts | at | first problem |
|---|---|---|---|---|
| capture:home | done |  | 2026-11-10 18:33 |  |
| capture:file-transfer-configuration | done |  | 2026-11-10 18:34 |  |
| capture:file-transfer-tracking | done |  | 2026-11-10 18:35 |  |
| capture:ftp-server-credentials | done |  | 2026-11-10 18:35 |  |
| spec:file-transfer-configuration | done | 1 | 2026-11-10 18:46 |  |
| spec:home | done | 1 | 2026-11-10 18:46 |  |
| spec:file-transfer-tracking | done | 1 | 2026-11-10 18:46 |  |
| spec:ftp-server-credentials | done | 1 | 2026-11-10 18:58 |  |
| port:home | done |  | 2026-11-10 18:58 |  |
| port:file-transfer-configuration | done |  | 2026-11-10 18:59 |  |
| port:file-transfer-tracking | done |  | 2026-11-10 18:59 |  |
| port:ftp-server-credentials | done |  | 2026-11-10 18:59 |  |
| preflight:kit | needs-review |  | 2026-11-10 19:00 | the kit on the raw port (fix it in kits/<kit>, not in the app): |
| code:file-transfer-tracking | done | 1 | 2026-11-10 19:15 |  |
| code:home | done | 1 | 2026-11-10 19:16 |  |
| code:file-transfer-configuration | blocked | 1 | 2026-11-10 19:22 | the writer reports a problem outside its files (packs/fxfer-v3/app/src/screens/file-transfer-configuration/BLOCKED.md): |
| code:ftp-server-credentials | done | 1 | 2026-11-10 19:28 |  |

Logs of every writer call: packs/fxfer-v3/logs/. Re-run `npm run ui -- fxfer-v3` to continue; `--redo` or `--from <stage>` to do steps again.
