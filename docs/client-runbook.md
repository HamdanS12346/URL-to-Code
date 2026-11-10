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
npm run ui
```
It asks for three things: the **pack name** (e.g. `ffxfer-v2`), the home page URL and the menu item (the module). Then it lists the
screens it found under that module, each with its content area, and asks to go on. Everything after that runs unattended.

Everything goes into `packs\<pack name>\`, and the code into `packs\<pack name>\app\`. A name you used before asks whether to
continue that pack or take a new name: to rebuild the same module from scratch, give it a new name (`ffxfer-v3`); the old pack stays as it was.
The same without questions:

```powershell
npm run ui -- ffxfer-v2 --yes --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "File Transfer Services"
```
`--out <folder>` still puts the code somewhere else (the folder must be empty or made by this tool).

### The Provider kit (this portal)

On the home page the tool recognises the portal (Kendo UI for jQuery) and uses its **Provider kit** (`kits/provider/`, guide
`kits/provider/KIT.md`). That changes what happens on every screen:
- the planning step and the click-around exploration are gone: the capture **reads** every widget from Kendo itself (dropdown
  options, placeholders, formats, help texts, required fields, validation messages, grid columns), then makes the few safe clicks
  that matter: open a dropdown, hover a `?`, **Search**, **Create New** (and a Create New inside its dialog), the **first grid row**.
  It never clicks Save, Delete or Update.
- no motion sampling, a short warm-up, no screenshot matching: the animation numbers come from Kendo's own settings.
- the app gets the kit's runtime (`src/kit`): real dropdowns, date/time pickers, number boxes, tooltips, grids (sort, pager,
  synthetic rows: no client data is kept), dialogs, the collapsible Search Criteria panel, validation with the portal's messages,
  the side menu. Each module screen sits in one shared shell that shows its own module tab and title.
- `src/services/<screen>.ts` names the endpoints the live screen called and answers with mock data.

`--kit none` turns it off (generic capture, plan and explore); `pack.json` `"kit"` keeps the choice.

### What happens, in order

| stage | what | who |
|---|---|---|
| login | opens the home page, clicks the menu button, fills in the user name and password, keeps the session in memory | script |
| discover | reads the whole menu (every module and its items), finds the URL of each item under your menu item, finds each screen's content area, recognises the site kit | script |
| capture | photographs and saves each page (DOM, the full CSS, assets); with the kit: the harvest (`kit/screen.json`, `kit/states/`, `kit/dialogs/`) | script |
| plan | decides what to hover/click/type on each page (`explore/plan.json`), checked by `check:plan`. **Skipped with the kit** | Codex |
| explore | carries out the plan on the live page and records every change. **Skipped with the kit** (the harvest did it) | script |
| spec | writes `spec/UI_SPEC.md` + `tasks.md`, checked by `npm run check` (with the kit: every widget and dialog cited as `[kit:<id>]`) | Codex |
| port | copies each page into the app as static React; with the kit: every widget becomes a kit component, every dialog a component, the shell comes from a module screen | script |
| code | builds what is left (conditional fields, cascades, the screen's own messages), checked by `tsc` and `verify` (pixels, behavior, and with the kit each recorded state: dropdown open, tooltip, Search, dialogs) | Codex |

When a check fails, Codex gets the check's report and tries again (`--rounds`, default 2 more tries). If it still fails, the step is marked
`needs-review` in `packs/<pack>/STATUS.md` with the last report, and the run moves on. A plan Codex cannot get right is replaced by the rule-based plan.

Speed: up to 3 Codex calls run at once (`--parallel N`, or `"parallel"` in `pack.json`). Each spec starts as soon as its capture is done
(captures stay one at a time), and with the kit the screens' code steps run side by side. Two more things no longer cost Codex attempts:
- **Dev server down:** the app's dev server is restarted when it dies (log: `packs/<pack>/logs/devserver.log`), and a check that could not run is not charged to Codex.
- **Kit or shell problem:** if Codex finds a problem in the kit or the shell, it writes `src/screens/<screen>/BLOCKED.md`, and the step is marked `blocked`.

With the kit, a **kit preflight** replays the kit's own behavior on the app before any Codex call (the side menu opens, flies out and
closes, a tooltip, Search, the dialogs). A failure there is listed as `preflight:kit` in STATUS.md: it is a kit or capture problem, not
Codex's. Each screen also gets a checklist for Codex, `docs/ui-specs/<screen>/TODO.md` in the app.

### Results

- `packs/<pack>/`: `pack.json` (URL, menu, kit, screens, content areas, selectors), `menu.json` + `menu.png` (the menu as read), `screens/<screen>/` (capture, kit harvest, facts, spec), `logs/` (every Codex call: command, prompt, output), `STATUS.md`, `ui.log`
- `packs/<pack>/app/`: the app (`npm run dev` there, open http://localhost:5180/#/; it uses final-playwright's node_modules, nothing to install), `UI_BUILD_REPORT.md`, `docs/ui-specs/<screen>/`.
  To hand it over as its own project: copy the folder out and run `npm install` in the copy.

In the app, `src/menu.ts` holds the portal's whole menu: items under your menu item open the rebuilt screens, every other item is shown but goes nowhere.

### Re-running

A re-run continues where it stopped: finished steps are skipped.

```powershell
npm run ui -- ffxfer-v2                         # continue
npm run ui -- ffxfer-v2 --from spec             # write the specs again (and everything after)
npm run ui -- ffxfer-v2 --from code             # write the code again
npm run ui -- ffxfer-v2 --only file-transfer-tracking --redo   # one screen, every writer step again
npm run ui -- ffxfer-v2 --no-build              # specs only
npm run ui -- ffxfer-v2 --from discover         # read the menu again (new screens)
npm run ui -- ffxfer-v3                         # the same module again, from scratch, in a new pack
```
Stages: `login, discover, capture, plan, explore, spec, port, code`. `--from port` re-ports and overwrites the code in `packs/<pack>/app/src/screens`
(the kit runtime `src/kit` is copied fresh on every run: fix the kit in `kits/provider/app`, never in an app).

## Codex (the writer)

Default, when `..\start_codex.ps1` exists:
```
powershell -NoProfile -ExecutionPolicy Bypass -File C:\UI-specs\start_codex.ps1 exec -c web_search=disabled --skip-git-repo-check -C {workdir}
```
The prompt goes to Codex on stdin. Override the command with `--writer "<command>"` or `WRITER=<command>` in final-playwright\\.env.
`{workdir}` is the folder Codex works in: final-playwright for plan/spec, the app (`packs/<pack>/app`) for code.
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
| `kit` | the site kit (`"provider"`), or `false` for the generic flow; found on the home page when missing |
| `outRepo` | where the code goes (default `packs/<pack>/app`) |

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
| `npm install failed` in an app outside final-playwright (`--out`) | It falls back to final-playwright's node_modules by itself (or pass `--link-modules`) |
| `packs\<name> already exists` | Answer `y` to continue it, or type a new name for a fresh pack |
| the kit was not detected (`site kit: none`) on the Provider portal | `npm run ui -- <pack> --kit provider --from capture` |
| a Provider widget looks or behaves wrong on every screen | It is the kit: fix it in `kits/provider/app` (or report it with `packs/<pack>/screens/<screen>/kit/screen.json` and `verify/states/`), then `--from port` |
| `the app's dev server did not start` | Port 5180 is taken: set `devPort` in `pack.json` |
