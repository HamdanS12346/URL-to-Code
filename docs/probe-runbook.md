# Probe runbook: ask the live portal how it behaves

`npm run probe` logs in like `npm run ui`, opens **every page of the menu** (or the modules you name) and tries each common
interaction there: dialogs, dates, Search, validation, chevrons, conditional fields, closing a dialog with unsaved changes,
the grid's filter icon. It changes nothing in the tool. It writes the answers to `docs/probe/`, which are then used to make the tool smarter.

No Codex: the probe is a plain script. It never clicks Delete or Update. Save is clicked only with every POST blocked (to see the
validation), and a dialog that was edited is always closed without saving.

## Run (on the client machine, PowerShell)

```powershell
cd C:\UI-specs\final-playwright
git pull
npm run probe -- fxfer-v4
```
`fxfer-v4` is any pack you already ran: the probe takes its URL, login selectors, kit and the menu it already read from
`packs\fxfer-v4\`. Without a pack: `npm run probe -- --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/"` (it reads the menu itself).

The login is the same as `npm run ui`: `USERNAME=` in `final-playwright\.env`, the password typed when asked (not shown, not saved).
Unattended: set `$env:UI_PASSWORD` first (see client-runbook.md). The session stays in memory only.

### Time

About 1 to 3 minutes per page; the whole menu (~90 pages) is a few hours. It can be stopped (Ctrl+C) and restarted:
pages already done are skipped. Split it if you like:

```powershell
npm run probe -- fxfer-v4 --modules "File Transfer Services"           # one module first: a quick check that it works
npm run probe -- fxfer-v4 --modules "Claims Management,Provider Management"
npm run probe -- fxfer-v4                                               # then the rest (done pages are skipped)
```

| option | what |
|---|---|
| `--modules "A,B"` | only these menu modules (name starts with) |
| `--only <text>` | only pages whose "Module > Item" matches |
| `--limit N` | the first N pages |
| `--fresh` | probe pages again that already have a result |
| `--read-menu` | read the menu live instead of the pack's `menu.json` |
| `--viewports 1920x1080,1272x588` | where the layout, menus and dialogs are measured (default: the capture size and 1272x588 = a real browser on a 1920x1080 screen at 150%) |
| `--budget 300` | seconds per page before it moves on |
| `--headed` | watch it work |
| `--manual-login` | log in by hand (MFA) |
| `--summary` | only rebuild `ANSWERS.md` from the pages already probed |

### Second run: one module, fixes only

The first run's results are in `docs\probe`. For the follow-up run give it its own folder, so nothing there is overwritten:

```powershell
npm run probe -- fxfer-v4 --modules "File Transfer Services" --out docs\probe-2 --fresh
```
About 10 minutes. It also measures the page layout at 1272x588 (the portal's small-screen layout), every module's menu fly-out
(scrollbar or not), X and Cancel on separate fresh dialogs, and the panel animation times. Send back `docs\probe-2`.

## What comes out

```
docs\probe\
  ANSWERS.md      the short read, one section per question
  answers.json    everything, per question
  pages\*.json    one file per page (what was clicked and what happened)
  shots\*.png     dialogs at each viewport, validation, confirms, date and filter popups
  probe.log       the run
```
Send back the whole `docs\probe` folder (commit it, or zip it). Screenshots of row dialogs are never taken (they show real records), and grids
are kept as counts only. Still, look through `shots\` before you send it.

## If something goes wrong

| problem | fix |
|---|---|
| login fails | the same fixes as `npm run ui` (client-runbook.md, "If something goes wrong") |
| a page says `✗ …` in the log | it is recorded in `answers.json` `failed`; the run goes on. Re-run with `--only "<page>" --fresh --headed` to watch it |
| `out of time (skipped …)` | `--budget 600 --only "<page>" --fresh` |
| a dialog is left open on the portal | close the browser; nothing was saved (POSTs are blocked on Save) |
