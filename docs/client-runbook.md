# Client runbook: one portal module → UI specs → React 19 code

`npm run ui` does the whole thing for one menu item of a logged-in portal (for example "File Transfer Services"):
it logs in, reads the menu, and for the **home page + its header/menu** and **every screen under that menu item** it captures,
explores (dropdowns, hidden and conditional UI), writes the spec (Codex) and finally writes the React 19 code (Codex) into a separate folder.

## Folder layout

```
C:\UI-specs\
  final-playwright\     this repo (git clone, branch feature/ui-specs)
  .env                  Codex's settings (LLM_MODEL, OPENAI_BASE_URL), read by start_codex.ps1
  start_codex.ps1       the client's Codex wrapper
```
The tool finds `..\start_codex.ps1` by itself. Keep the path short (`C:\UI-specs`): Windows path limits.

## Install (once)

You need Node.js 20.19+, Python 3.9+ and Git, and the client's `start_codex.ps1` + its `.env` in `C:\UI-specs` (the same setup csharp-doc-agent uses).

```powershell
cd C:\UI-specs
git clone <repo address> final-playwright
cd final-playwright
git checkout feature/ui-specs
npm install
npx playwright install chromium     # blocked by the proxy? lookout.md E3
pip install pillow numpy
npm run smoke:ui                    # self-test: a fake portal and a fake writer, no Codex, no network. Ends with "ui smoke: OK"
npm run check:writer                # can Codex write files, run commands, read outside its folder, see pictures? One ✓/✗ line each
```

**Before the first real run, go through [lookout.md](../lookout.md)**: the checklist of what may not work on the client machine, each with its fix.
You can hand it to Codex: "go through lookout.md, run each check, tick what passes, fix what fails".

### Portal credentials

Put the user name in **final-playwright\\.env** (not the Codex `.env` one level up; this one is git-ignored):

```
USERNAME=your.user
```
The tool reads this file itself, so Windows' own `USERNAME` variable does not get in the way.

**The password: let the tool ask.** Each run asks for it once, without showing it, and keeps it only in memory. Codex can read any file on the
machine, so a password in a file is a password Codex may see. Ways to give it, safest first:

| how | when |
|---|---|
| type it when asked | normal runs |
| `$env:UI_PASSWORD = [Net.NetworkCredential]::new('', (Read-Host 'Password' -AsSecureString)).Password` before `npm run ui` | unattended runs (`--yes`); it lives only in that PowerShell window |
| `PASSWORD=` in final-playwright\\.env | works, but Codex can read that file: the run warns about it |

The logged-in session (cookies) is also kept in memory only, never in a file, and the password is removed from Codex's environment before every call.
So every `npm run ui` logs in once at the start (and again by itself if the portal logs it out).

## Run

```powershell
cd C:\UI-specs\final-playwright
$outRepo = "C:\UI-specs\fxfer-ui"      # where the code goes: an empty or new folder
npm run ui -- file-transfer --out $outRepo
```
It asks for the home page URL and the menu item name, then lists the screens it found under it, each with its content area, and asks to go on.
Everything after that runs unattended. The same without questions:

```powershell
npm run ui -- file-transfer --yes --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "File Transfer Services" --out $outRepo
```

`$outRepo` is a PowerShell variable: always pass it as `--out $outRepo` (the tool cannot see the variable itself).

### What happens, in order

| stage | what | who |
|---|---|---|
| login | opens the home page, clicks the menu button, fills in the user name and password, keeps the session in memory | script |
| discover | reads the whole menu (every module and its items), finds the URL of each item under your menu item, finds each screen's content area | script |
| capture | photographs and saves each page (DOM, real CSS, assets, motion) | script |
| plan | decides what to hover/click/type on each page (`explore/plan.json`), checked by `check:plan` | Codex |
| explore | carries out the plan on the live page and records every change (dropdowns, conditional fields, menus) | script |
| spec | writes `spec/UI_SPEC.md` + `tasks.md`, checked by `npm run check` | Codex |
| port | copies each page into `$outRepo` as static React (the shell from the home page, the content of each screen) | script |
| code | builds the behavior, checked by `tsc` and `verify` (pixels + behavior against the capture) after every attempt | Codex |

When a check fails, Codex gets the check's report and tries again (`--rounds`, default 2 more tries). If it still fails, the step is marked
`needs-review` in `packs/<pack>/STATUS.md` with the last report, and the run moves on. A plan Codex cannot get right is replaced by the rule-based plan.

### Results

- `packs/<pack>/`: `pack.json` (URL, menu, screens, content areas, selectors), `menu.json` + `menu.png` (the menu as read), `screens/<screen>/` (capture, facts, spec), `logs/` (every Codex call: command, prompt, output), `STATUS.md`, `ui.log`
- `$outRepo/`: the app (`npm install`, `npm run dev`, open http://localhost:5180/#/), `UI_BUILD_REPORT.md`, `docs/ui-specs/<screen>/`

In the app, `src/menu.ts` holds the portal's whole menu: items under your menu item open the rebuilt screens, every other item is shown but goes nowhere.

### Re-running

A re-run continues where it stopped: finished steps are skipped.

```powershell
npm run ui -- file-transfer                         # continue
npm run ui -- file-transfer --from spec             # write the specs again (and everything after)
npm run ui -- file-transfer --from code             # write the code again
npm run ui -- file-transfer --only file-transfer-tracking --redo   # one screen, every writer step again
npm run ui -- file-transfer --no-build              # specs only
npm run ui -- file-transfer --from discover         # read the menu again (new screens)
```
Stages: `login, discover, capture, plan, explore, spec, port, code`. `--from port` re-ports and overwrites the code in `$outRepo/src/screens`.

## Codex (the writer)

Default, when `..\start_codex.ps1` exists:
```
powershell -NoProfile -ExecutionPolicy Bypass -File C:\UI-specs\start_codex.ps1 exec -c web_search=disabled --skip-git-repo-check -C {workdir}
```
The prompt goes to Codex on stdin. Override the command with `--writer "<command>"` or `WRITER=<command>` in final-playwright\\.env.
`{workdir}` is the folder Codex works in: final-playwright for plan/spec, `$outRepo` for code.
- Never end the command with a bare `-`: PowerShell treats it as a bad switch and the writer fails without a word.
- If the prompt does not reach Codex through stdin, put `{prompt}` at the end of the command: it becomes one quoted sentence pointing at the prompt file.
- Codex must be allowed to write files and run commands in `{workdir}` (`codex exec` alone is read-only). If `start_codex.ps1` does not set that, add `--full-auto` to the command.
- `--verbose` shows Codex's output live; otherwise it is in `packs/<pack>/logs/`.
- The prompts are plain files in `prompts/` (plan, spec, code, repair): adjust them there.

## Overrides in packs/&lt;pack&gt;/pack.json

Everything the tool guesses can be pinned. Edit `pack.json`, then re-run (with `--from discover` if it changes the screens).

| key | what |
|---|---|
| `selectors.menuButton` | the button that opens the menu, e.g. `"#hamburger"` |
| `selectors.username`, `.password`, `.submit` | the login fields |
| `selectors.loggedIn` | something only a logged-in user has, e.g. `"a[href*='Logout']"` |
| `scope` | the content area of every screen (otherwise found per screen; each screen also has its own `scope`) |
| `screens` | add or remove screens, fix a `url` or `scope`: `{ "id": "x", "label": "X", "url": "…", "trail": ["Module", "X"] }` |
| `login: false` / `manualLogin: true` | no login needed / always log in by hand (MFA, SSO) |
| `menuDepth` | menu levels to read (3) |
| `devPort` | the app's dev server during the code stage (5180) |
| `verify` | what the code check accepts: `{ "maxBadPct": 5, "maxHeightDeltaPx": 4, "behavior": true }` |
| `rounds`, `timeoutSec` | writer retries after a failed check (2), seconds per writer call (3600) |
| `config` | any `config.json` setting for this pack, e.g. `{ "mode": "readonly", "explore": { "timeBudgetSec": 600 } }` |

## If something goes wrong

| Problem | Fix |
|---|---|
| `no login form found` | Pin `selectors.menuButton` / `password` / `username` / `submit`, or run with `--manual-login` |
| `login did not work; the page says …` | USERNAME in final-playwright\\.env, and the password you typed (or `UI_PASSWORD`) |
| logged in, but the tool says it is not | Pin `selectors.loggedIn` (the portal shows no "Logout" text) |
| `no USERNAME/PASSWORD` with `--yes` | `--yes` asks nothing: set `$env:UI_PASSWORD` first, or run without `--yes` |
| `could not find the menu` | Pin `selectors.menuButton` |
| `no menu item "…"` | The message lists the menu's items: use one of those names |
| an item has `no URL` | Add it to `screens` in `pack.json` by hand |
| a screen's content area is wrong | Fix its `scope` in `pack.json`, then `--only <screen> --from capture` |
| `Nothing was written to …` | Codex did not run or did not write: read the newest log in `packs/<pack>/logs/` (read-only sandbox? model or base URL? a bare `-`?) |
| the session expires during the run | It logs in again by itself; with MFA (`"manualLogin": true`) it opens the login window again and waits for you |
| `Executable doesn't exist … chromium` and no download allowed | Use the installed Edge: add `"browserChannel": "msedge"` to config.json |
| `npm install failed` in `$outRepo` | It falls back to final-playwright's node_modules by itself (or pass `--link-modules`) |
| `the app's dev server did not start` | Port 5180 is taken: set `devPort` in `pack.json` |
