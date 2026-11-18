# pe-v1: status

| step | status | attempts | at | first problem |
|---|---|---|---|---|
| capture:home | done |  | 2026-11-17 05:34 |  |
| capture:dashboard | done |  | 2026-11-17 05:35 |  |
| capture:search-enrollment-application | done |  | 2026-11-17 05:37 |  |
| capture:search-enrollment-reports | done |  | 2026-11-17 05:37 |  |
| capture:workflow-dashboard | failed |  | 2026-11-17 05:38 | the page redirected to https://login.microsoftonline.com/c663f89c-ef9b-418f-bd3d-41e46c0ce068/oauth2/v2.0/authorize?response_type=code&clien |
| capture:workflow-applications | failed |  | 2026-11-17 05:38 | the page redirected to https://login.microsoftonline.com/c663f89c-ef9b-418f-bd3d-41e46c0ce068/oauth2/v2.0/authorize?response_type=code&clien |
| capture:workflow-configuration | failed |  | 2026-11-17 05:38 | the page redirected to https://login.microsoftonline.com/c663f89c-ef9b-418f-bd3d-41e46c0ce068/oauth2/v2.0/authorize?response_type=code&clien |
| capture:workflow-tasks | failed |  | 2026-11-17 05:39 | the page redirected to https://login.microsoftonline.com/c663f89c-ef9b-418f-bd3d-41e46c0ce068/oauth2/v2.0/authorize?response_type=code&clien |
| capture:new-enrollment-entry | done |  | 2026-11-17 05:41 |  |
| capture:resume-enrollment-entry | done |  | 2026-11-17 05:41 |  |
| spec:home | done | 1 | 2026-11-17 05:44 |  |
| spec:dashboard | done | 1 | 2026-11-17 05:44 |  |
| spec:search-enrollment-application | done | 1 | 2026-11-17 05:46 |  |
| spec:search-enrollment-reports | done | 1 | 2026-11-17 05:49 |  |
| spec:new-enrollment-entry | done | 1 | 2026-11-17 05:50 |  |
| spec:resume-enrollment-entry | done | 1 | 2026-11-17 05:55 |  |
| port:home | done |  | 2026-11-17 05:55 |  |
| port:dashboard | done |  | 2026-11-17 05:56 |  |
| port:search-enrollment-application | done |  | 2026-11-17 05:56 |  |
| port:search-enrollment-reports | done |  | 2026-11-17 05:56 |  |
| port:new-enrollment-entry | done |  | 2026-11-17 05:56 |  |
| port:resume-enrollment-entry | done |  | 2026-11-17 05:56 |  |
| preflight:kit | needs-review |  | 2026-11-17 05:57 | the kit on the raw port (fix it in kits/<kit>, not in the app): |

Logs of every writer call: packs/pe-v1/logs/. Re-run `npm run ui -- pe-v1` to continue; `--redo` or `--from <stage>` to do steps again.
