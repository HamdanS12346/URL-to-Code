# lookout.md: what may not work on the client machine, and the fix

`npm run ui` was built and tested on a dev machine against a fake portal, with a fake writer instead of Codex.
On the client machine (the AVD) these things are still unknown. Go through them **in order**: each section needs the one before it.
Tick a box (`- [x]`) when its check passes. If you are Codex doing this: run each check yourself, tick what passes,
and for anything that fails apply the fix, run the check again, and write one line under **Notes** at the bottom.

How to run the tool once this list is done: [docs/client-runbook.md](docs/client-runbook.md).

---

## E. The machine

- [ ] **E1. Node 20.19 or newer, Python 3.9 or newer, Git.**
  Check: `node -v`, `python --version`, `git --version`.
  Fix: install them. If `python` opens the Microsoft Store, use `py` and add `"python": "py"` to `config.json`.

- [ ] **E2. `npm install` works in final-playwright.**
  Check: `npm install` ends without `ERR!`.
  Fix: the proxy/registry. `npm config set registry <the client's npm mirror>` (ask which registry the csharp-doc-agent setup uses), or `npm config set proxy http://<proxy>:<port>` and `npm config set https-proxy http://<proxy>:<port>`.

- [ ] **E3. A browser for Playwright.**
  Check: `npx playwright install chromium` finishes.
  Fix: if downloads are blocked, use the Edge that is already installed. Add `"browserChannel": "msedge"` to `config.json` (top level). Nothing else changes.

- [ ] **E4. Python packages.**
  Check: `python -c "import PIL, numpy; print('ok')"` prints `ok`.
  Fix: `pip install pillow numpy` (behind a proxy: `pip install --proxy http://<proxy>:<port> pillow numpy`, or `--index-url <client mirror>`).

- [ ] **E5. The tool works on this machine (no Codex, no portal).**
  Check: `npm run smoke:ui` ends with `ui smoke: OK` (about 3 minutes).
  Fix: the line before the error says which step failed. A browser error means E3; a `python` error means E1/E4.

- [ ] **E6. Short paths.**
  Check: the clone is at `C:\UI-specs\final-playwright` (or as short).
  Fix: move it. Windows path limits break deep capture folders (`packs\<pack>\screens\<screen>\capture\assets\...`).

## W. The writer (Codex through start_codex.ps1)

All of these are tested in one go by **`npm run check:writer`** (about a minute). It runs Codex once in a temp folder and prints one ✓/✗ line per item below.
It uses the same writer command as `npm run ui`: `--writer "<command>"`, else `WRITER=` in final-playwright\.env, else `..\start_codex.ps1`.

- [ ] **W1. The wrapper is found.**
  Check: `Test-Path ..\start_codex.ps1` is `True` (run from final-playwright). The first line `check:writer` prints shows the command it used.
  Fix: put final-playwright next to `start_codex.ps1`, or set the full command with `WRITER=` in final-playwright\.env:
  `WRITER=powershell -NoProfile -ExecutionPolicy Bypass -File C:\UI-specs\start_codex.ps1 exec -c web_search=disabled --skip-git-repo-check -C {workdir}`

- [ ] **W2. Codex starts and exits cleanly** (✓ "the writer starts and exits cleanly").
  Fix, by what the log shows:
  - `401 incorrect_hostname` / wrong base URL: the Codex `.env` next to start_codex.ps1 (`LLM_MODEL`, `OPENAI_BASE_URL`). Never pass `--model` yourself: the wrapper sets the client-approved 5.2 model.
  - fails with no message: the command ends with a bare `-`. Remove it (PowerShell treats it as an invalid switch).
  - `running scripts is disabled`: keep `-ExecutionPolicy Bypass` in the command.

- [ ] **W3. Codex receives the prompt** (✓ "it got the prompt and can write files").
  The tool sends the prompt on stdin. If Codex starts but behaves as if it got no task:
  Fix: add `{prompt}` at the end of the writer command. The tool then passes one quoted sentence, "Read the file …prompt.md and do exactly what it says", as an argument instead.

- [ ] **W4. Codex can write files in its folder** (same ✓ line).
  `codex exec` is read-only unless told otherwise.
  Fix: add `--full-auto` after `exec` (or `-s workspace-write`), if start_codex.ps1 does not already set a sandbox. Use whatever the client allows for csharp-doc-agent: it writes files too.

- [ ] **W5. Codex can run commands** (✓ "it can run commands").
  Needed for `npm run check:plan`, `npm run check` and `npx tsc` inside its tasks.
  Fix: same as W4 (`--full-auto` allows commands in the folder). If node is not found, Codex's shell has a different PATH: open a fresh terminal after installing Node.
  If commands stay blocked, the tool still works: it runs every check itself after each attempt and sends Codex the report. Codex just cannot check its own work in between, so expect more attempts.

- [ ] **W6. Codex can read files outside its folder** (✓ "it can read files outside {workdir}").
  For code, Codex works in `packs\<pack>\app` but reads the specs, pictures and CSS from `final-playwright\packs\...`.
  Fix: if the sandbox blocks this, add `--add-dir C:\UI-specs\final-playwright` to the writer command (check `codex exec --help` on the machine for the exact flag),
  or, as a last resort and only if the client's rules allow it inside the AVD, `--dangerously-bypass-approvals-and-sandbox`.

- [ ] **W7. Codex can look at pictures** (✓ "it can look at pictures").
  The plan uses map pictures; the spec and code use section crops, state pictures and menu flyout pictures.
  Fix: there is no switch for this. If the model or wrapper cannot view images, everything still runs from text (facts.md, rendered.html, used.css), but the look will be less exact. Note it under Notes and expect a higher "pixels off" in UI_BUILD_REPORT.md.

- [ ] **W8. Long calls finish.**
  Check: in a real run, `packs\<pack>\logs\*.log` end with `--- exit 0 ---`, not `(timed out)`.
  Fix: `--timeout 7200` on `npm run ui` (default 3600 s per call), or `"timeoutSec": 7200` in pack.json.

## S. The portal (first real run)

Run `npm run ui -- <pack>` and watch the first two stages (login, discover). It stops and asks before the long part, so this is cheap.

- [ ] **S0. No secret is anywhere Codex can read.**
  Check: `Select-String -Path .env -Pattern '^PASSWORD='` finds nothing, and there is no `packs\<pack>\auth` folder.
  The tool keeps the password and the logged-in session in memory only and removes the password from Codex's environment. Only a `PASSWORD=` line you add to .env puts it on disk.
  Fix: delete the `PASSWORD=` line; type the password when asked, or set `$env:UI_PASSWORD` in the PowerShell window for unattended (`--yes`) runs.

- [ ] **S1. Login works.**
  Check: it prints `logged in` (or `already logged in`). A person runs this step: it asks for the password, which Codex must never get (see S0).
  Fix, by message:
  - `no login form found`: run with `--headed` to watch it. Then pin the fields in `packs\<pack>\pack.json`: `"selectors": { "menuButton": "…", "username": "…", "password": "…", "submit": "…" }` (find the selectors with the browser's devtools, F12).
  - `login did not work; the page says …`: USERNAME in **final-playwright\.env** (not the Codex .env), and the password typed when asked.
  - MFA, SSO or captcha: `--manual-login` (or `"manualLogin": true` in pack.json); you log in in a window and press Enter.

- [ ] **S2. The tool knows it is logged in.**
  It looks for a "Logout"/"Log off"/"Sign out" text on the home page (the menu can be closed).
  Fix: if the portal has none, pin something only a logged-in user has: `"selectors": { "loggedIn": "#welcomeUser" }`.

- [ ] **S3. The menu is read.**
  Check: `menu: N modules (…)` lists the real modules (Administration, Alert Notification, Claims Management, …). Open `packs\<pack>\menu.png`.
  Fix: wrong or empty list → pin `"selectors": { "menuButton": "…" }` (the hamburger at the top right).

- [ ] **S4. Every module's flyout is captured.**
  Check: `packs\<pack>\menu\*.png` shows each module with its flyout open, and `menu.json` lists each module's items.
  Fix: if items are missing, the menu needs more levels (`"menuDepth": 4`), or it opens on click instead of hover (the tool tries a click when hover shows nothing). A cut-off flyout picture is fine: the items are in menu.json.

- [ ] **S5. Every screen of your module has a URL.**
  Check: the list after discover shows each item (e.g. File Transfer Configuration, File Transfer Tracking, FTP Server Credentials) with a URL.
  Fix: `no URL` → add it by hand in pack.json `screens`: `{ "id": "ftp-server-credentials", "label": "FTP Server Credentials", "url": "https://…", "trail": ["File Transfer Services", "FTP Server Credentials"] }`.
  `opens inside a frame` → the screen is captured on its own URL. Check that this URL shows the screen when opened directly while logged in.

- [ ] **S6. The content area of each screen is right.**
  Check: each screen's `content: <selector> (W x H px)` is the part under the header, not the whole page and not a tiny box.
  Fix: set the right selector in pack.json, either for one screen (its `"scope"`) or for all (top-level `"scope"`). Then `--only <screen> --from capture`.

- [ ] **S7. The session survives the whole run.**
  Check: `session lost … logging in again` may appear; the run goes on.
  Fix: with MFA this needs you each time; set `"manualLogin": true` and stay near the machine.

- [ ] **S8. Exploring does nothing harmful.**
  In the default mode `safe`, the explorer never clicks a button whose label matches save/delete/submit/update/transfer/… (`denyPattern` in config.json); other buttons and their form posts go through.
  Check: this is a test environment (`tst`). If unsure, use `"config": { "mode": "readonly" }` in pack.json: every form post is blocked, and anything that only changes the page still works.
  Note: "transfer" is in the deny list, so in File Transfer screens a button labelled "Transfer" is never clicked. What it does is then `[UNKNOWN]` in the spec.

## R. The results

- [ ] **R1. Specs pass their check.**
  Check: `packs\<pack>\STATUS.md`: every `plan:` and `spec:` row is `done`.
  Fix: a `needs-review` row has the check's report. Re-run that screen with `--only <screen> --redo`, or allow more attempts (`--rounds 4`).

- [ ] **R2. The app installs.**
  Check: the app in `packs\<pack>\app` needs no `npm install`: it resolves its packages from final-playwright's node_modules (`npm run dev` there works).
  Fix: to hand the app over on its own, copy the folder out and run `npm install` in the copy once the registry works.

- [ ] **R3. The app's dev server starts.**
  Check: no `the app's dev server did not start`.
  Fix: port 5180 is taken: `"devPort": 5181` in pack.json.

- [ ] **R4. The code matches the capture.**
  Check: `packs\<pack>\app\UI_BUILD_REPORT.md`: status `done`, "pixels off" at most 5%, size delta near 0.
  Fix: live data (dates, counts, names) differs on every load, so pixels can be off even when the page is right. Look at `packs\<pack>\screens\<screen>\verify\diff.png`; if only data differs, raise `"verify": { "maxBadPct": 10 }` in pack.json and re-run with `--from code`.

- [ ] **R5. The menu in the app.**
  Check: `npm run dev` in `packs\<pack>\app`, open http://localhost:5180/#/. The hamburger opens the menu, every module shows its flyout, items of your module open their screens, and all other items do nothing.
  Fix: add a line describing what is wrong at the end of `prompts/code.md`, then `npm run ui -- <pack> --only home --from code`.

## Notes

(one line per fix applied: what failed, what fixed it)
