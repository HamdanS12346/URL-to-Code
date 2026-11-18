# SETUP: rebuild a portal module, step by step

Follow the phases in order. Phases 1 to 5 are done **once per computer**. After that, every new module is Phase 6 onward.
Every command goes into **Windows PowerShell**: type it (or paste it) and press Enter.

---

## Phase 1: Install the tools (once)

Install these three programs (accept the defaults in each installer):

| Program | Where | Version |
|---|---|---|
| Node.js | https://nodejs.org (the "LTS" button) | 20.19 or newer |
| Git | https://git-scm.com/download/win | any |
| Python | https://www.python.org/downloads/ (tick **"Add python.exe to PATH"** on the first screen) | 3.9 or newer |

Close PowerShell, open a new one, and check:

```powershell
node -v
git --version
python --version
```

Each one prints a version number. If one says "not recognized", install that program again.

---

## Phase 2: Make the folder and download the repo (once)

```powershell
mkdir C:\UI-specs
cd C:\UI-specs
git clone -b feature/ui-specs https://github.com/HamdanS12346/URL-to-Code.git final-playwright
```

You now have the folder `C:\UI-specs\final-playwright`.
Keep this exact path (`C:\UI-specs`): long paths break on Windows.

---

## Phase 3: Put the Codex files in `C:\UI-specs` (once)

Two files go in **`C:\UI-specs`** (the folder *above* `final-playwright`, not inside it):

1. **`start_codex.ps1`**: the Codex start script your team gave you. Copy it in as it is.
2. **`.env`**: the Codex settings (API key, model, address). Create it:

```powershell
cd C:\UI-specs
notepad .env
```

Notepad asks "create a new file?": click **Yes**. Paste your team's Codex settings, for example:

```
OPENAI_API_KEY=your-api-key-here
LLM_MODEL=your-model-name
OPENAI_BASE_URL=https://your-codex-endpoint/v1
```

Use the exact names and values your team uses for Codex (the ones `start_codex.ps1` expects). Save and close Notepad.

The folder must now look like this:

```
C:\UI-specs\
  start_codex.ps1
  .env
  final-playwright\
```

---

## Phase 4: Put the portal login in `final-playwright` (once)

A **second** `.env`, this one **inside** `final-playwright`, holds the portal user name and password:

```powershell
cd C:\UI-specs\final-playwright
notepad .env
```

Click **Yes**, then paste and fill in:

```
USERNAME=your.portal.user
PASSWORD=your-portal-password
```

- No spaces around `=`.
- If the password contains `#`, a space or a quote, put it in single quotes: `PASSWORD='my#pass word'`.
- Save and close Notepad.

Final layout:

```
C:\UI-specs\
  start_codex.ps1        <- Codex start script
  .env                   <- Codex settings (API key, model, address)
  final-playwright\
    .env                 <- USERNAME and PASSWORD for the portal
```

Never share or commit either `.env` file: they are kept out of git on purpose.

---

## Phase 5: Install and test (once)

```powershell
cd C:\UI-specs\final-playwright
npm install
npx playwright install chromium
pip install pillow numpy
```

Then run the two checks:

```powershell
npm run smoke:ui
```
Wait until it ends with **`ui smoke: OK`** (a few minutes).

```powershell
npm run check:writer
```
Every line must start with **✓** and it must end with **`writer OK`**. A line with **✗** shows its fix underneath; usually
`start_codex.ps1` or the Codex `.env` from Phase 3 is wrong or in the wrong folder.

Setup is done.

---

## Phase 6: Rebuild a module

### 6.1 Pick the two names

**Pack name**: a short name you make up for this run. Everything for the run is saved under it.
Lowercase, no spaces, and end with a version number:

| Module | Good pack names |
|---|---|
| File Transfer Services | `fxfer-v10`, `fxfer-v11` |
| Claims Management | `claims-v2` |
| Provider Enrollment | `pe-v2` |
| Plan Management | `plan-mgmt-v1` |
| Member Management | `member-mgmt-v1` |

- **A new name starts from scratch.** The **same name continues** an earlier run (see Phase 9).
- Names already in the repo (don't reuse them for a fresh start): `fxfer-v6`, `fxfer-v7`, `fxfer-v8`, `fxfer-v9`, `claims-mgmt-v1`, `pe-v1`.

**Menu name**: the module exactly as it is written in the portal's menu. The ones on the portal:

```
Administration            Alert Notification        Claims Management         Drug Rebate
File Transfer Services    Integration               Managed Care              Member Management
Plan Management           Program Integrity         PI Case Tracking          Provider Enrollment
Provider Management       Screening/Credentialing   TPL Case Tracking         TPL Policy
TPL HIPP                  Task Management           UI Examples
```

### 6.2 Run it

```powershell
cd C:\UI-specs\final-playwright
npm run ui -- fxfer-v10 --yes --headed --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "File Transfer Services"
```

Change only the **pack name** (`fxfer-v10`) and the **menu name** (`"File Transfer Services"`). Keep the quotes around the menu name.

More examples:

```powershell
npm run ui -- claims-v2 --yes --headed --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "Claims Management"
npm run ui -- pe-v2 --yes --headed --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "Provider Enrollment"
npm run ui -- plan-mgmt-v1 --yes --headed --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "Plan Management"
```

What the parts mean:

| Part | Meaning |
|---|---|
| `fxfer-v10` | the pack name |
| `--yes` | run without asking any questions |
| `--headed` | show the browser window, so you can watch |
| `--url "…"` | the portal's home page (always this one) |
| `--menu "…"` | the module to rebuild |

### 6.3 While it runs

- **Don't click or type in the browser window it opens**, and don't close it.
- Leave PowerShell open. Don't let the computer sleep.
- It takes a long time: from about an hour for a small module to several hours for a big one.
- It is finished when PowerShell shows **`== done.`** and gives you the command prompt back.

---

## Phase 7: Check the result

Everything is in **`C:\UI-specs\final-playwright\packs\<pack name>\`**. Open these in File Explorer or VS Code:

| File | What to look at |
|---|---|
| `packs\<pack>\STATUS.md` | one line per screen: **done**, or **needs-review** / **blocked** with the reason |
| `packs\<pack>\app\UI_BUILD_REPORT.md` | how close each rebuilt screen is to the real one |
| `packs\<pack>\ui.log` | the full run log: send this file if you need help |

---

## Phase 8: Open the rebuilt app

```powershell
cd C:\UI-specs\final-playwright\packs\fxfer-v10\app
npm run dev
```

(Use your own pack name in place of `fxfer-v10`.) Then open this in Chrome or Edge:

**http://localhost:5180/#/**

The portal's menu is there; the items of your module open the rebuilt screens.
To stop the app, click in PowerShell and press **Ctrl+C**.

The app's code is in `packs\<pack>\app\src\`. To give it to someone as its own project, copy the whole `app` folder and run
`npm install` inside the copy.

---

## Phase 9: Run again

**It stopped in the middle** (computer restarted, window closed, error): run **the exact same command** again. It continues where it stopped.

```powershell
npm run ui -- fxfer-v10 --yes --headed --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "File Transfer Services"
```

**Start the same module completely fresh**: use a **new pack name** (`fxfer-v11`). The old pack is not touched.

**Redo only one part** of an existing pack (add to the end of the command):

| Add this | To |
|---|---|
| `--from code` | write the app's code again |
| `--from spec` | write the specs and the code again |
| `--only file-transfer-tracking --from capture` | redo one screen (screen names are the folder names in `packs\<pack>\screens\`) |

---

## If something goes wrong

| You see | Do this |
|---|---|
| `login did not work` | Check `USERNAME` and `PASSWORD` in `final-playwright\.env` (Phase 4). Log in to the portal by hand once to make sure the password works. |
| `no USERNAME/PASSWORD` | The `.env` from Phase 4 is missing, misspelled, or in the wrong folder. It must be `C:\UI-specs\final-playwright\.env`. |
| `no menu item "…"` | The menu name is spelled differently: the message lists the real names; copy one exactly. |
| `Nothing was written to …` | Codex did not run. Run `npm run check:writer` and fix what shows ✗ (Phase 3). |
| `Executable doesn't exist … chromium` | Run `npx playwright install chromium`. If downloads are blocked, open `config.json` and add `"browserChannel": "msedge",` after the first `{`. |
| `could not run python` / `No module named 'PIL'` | Install Python (tick "Add to PATH"), then `pip install pillow numpy`. |
| `the app's dev server did not start` / port 5180 in use | Close the other `npm run dev` window (Ctrl+C), then run again. |
| Notepad saved the file as `.env.txt` | In PowerShell, in that folder: `Rename-Item .env.txt .env` |
| anything else | Send `packs\<pack>\ui.log` and `packs\<pack>\STATUS.md` |
