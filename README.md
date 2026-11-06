# final-playwright

Turns one web page (a URL) into a React 19 copy of it, plus tests that check the copy looks and behaves like the original.
Scripts capture the page. An AI coding agent (Claude Code, Codex, Cursor, Copilot, Gemini CLI…) plans, writes the spec, and writes the code.

## Install (once)

Needs Node.js 20.19+, Python 3.9+ and Git.

```
git clone <repo address>
cd final-playwright
npm install
npx playwright install chromium
pip install pillow numpy
npm run smoke          # self-test: no red error = ready
```

Run every command from the `final-playwright` folder. On macOS/Linux, if your Python command is `python3`, add `"python": "python3"` to `config.json`.

## Your AI agent

Open the agent in the `final-playwright` folder.

- **Claude Code:** no setup. It reads `CLAUDE.md` / `AGENTS.md` and the skills in `.claude/skills/` by itself.
- **Codex, Cursor, Copilot, Gemini CLI, others:** they read `AGENTS.md`, but you have to name the skill file in your request, e.g.
  `plan the exploration for portfolio. Follow .claude/skills/explore-plan/SKILL.md exactly.`

Use one chat per screen, and a new chat for the build. Let the agent run terminal commands. A step is done only when its check prints ✓.

## How to use it

Example: copy `https://www.zachjordan.io/` as the screen `portfolio`. A **screen** is just a short name you pick, used in every command.

**1. Give it the URL**

Create `screenshots/portfolio/url/url.txt` containing one line:
```
https://www.zachjordan.io/
```
*What it does:* tells the tool which page to copy. You can also put your own `.png`/`.jpg` screenshots in `screenshots/portfolio/` (optional).

**2. Capture**
```
npm run go -- portfolio
```
*What it does:* opens the page, scrolls it so everything loads, freezes it, takes pictures, and saves the HTML, CSS, images and animations. Then it finds everything you can hover, click or type into. It stops after about a minute with `STOP HERE`.

**3. Agent: plan** (in your agent)
```
plan the exploration for portfolio
```
*What it does:* the agent decides which menus, tabs, forms and so on to test, writes `explore/plan.json`, and runs `npm run check:plan -- portfolio` until it prints ✓.
No agent for this step? Run `npm run go -- portfolio --auto` in step 2. It uses a rule-based plan and runs step 4 without stopping.

**4. Explore** (same command again)
```
npm run go -- portfolio
```
*What it does:* carries out the plan (hover, click, type) and records what changed after each action in `facts.md`. Takes 1-5 min, then stops again.

**5. Agent: spec** (in your agent)
```
write the UI spec for portfolio
```
*What it does:* the agent writes `spec/UI_SPEC.md` (what every part looks like and does) and `spec/tasks.md` (the build steps), and runs `npm run check -- portfolio` until it prints ✓. It ends with open questions; answer them if you can.

**6. Agent: build** (new chat)
```
build portfolio from outputs/portfolio/spec/tasks.md
```
*What it does:* the agent runs `npm run port -- portfolio`, which makes a static React copy in `outputs/portfolio/app/`. Then it adds the behavior (menus, tabs, carousels, forms, animations) and checks its work with `npm run verify -- portfolio`.

**7. See it and test it**
```
npm run dev                  # open http://localhost:5173/#/portfolio
npx playwright test outputs/portfolio/spec/parity.spec.ts                                          # original page
TARGET=react URL=http://localhost:5173/#/portfolio npx playwright test outputs/portfolio/spec/parity.spec.ts   # your copy
```
PowerShell: `$env:TARGET="react"; $env:URL="http://localhost:5173/#/portfolio"; npx playwright test outputs/portfolio/spec/parity.spec.ts`

*What it does:* runs the same behavior tests against the original and the copy. When both pass, the copy behaves like the original.

**Reading `verify`** (`outputs/<screen>/verify/report.json`): `size_delta_px` must be within ±2 (otherwise it's a scaling error, fix that first). Keep `bad_pct` low. `motion` and `behavior` should be N/M with N = M. `worst.png` shows original and copy side by side for the worst part.

## A whole portal module (logged in, Codex)

```
npm run ui -- file-transfer --out C:\path\to\new-app
```
Logs in (USERNAME in `.env`; it asks for the password and keeps it in memory only), asks for the home page and a menu item, finds the screens under it, then specs the home page,
its header/menu and every screen, and writes the React 19 app to `--out`, with Codex as the writer. Everything else runs unattended.
Full guide: [docs/client-runbook.md](docs/client-runbook.md). Before the first run on a new machine: [lookout.md](lookout.md) (checklist, with `npm run check:writer` for Codex). Self-test: `npm run smoke:ui`.

## Login pages

```
npm run login -- "https://site.example.com/page.aspx"
```
Log in in the window that opens, then close it. The session is saved to `auth/state.json` and used from then on. Don't share that file.

What the tool may click (`--mode` or `config.json -> mode`):
- `safe` (default): skips buttons like save, delete, submit, pay or log out.
- `readonly`: blocks every form submit. Use it on production systems.
- `full`: clicks everything. Use it on test systems only.

## Where things are

Everything for a screen is in `outputs/<screen>/`. It is not tracked by git, so back up `app/` yourself.
You or your agent only write `explore/plan.json`, `spec/UI_SPEC.md`, `spec/tasks.md` and `app/`. Everything else is generated, so don't edit it.

## If something goes wrong

| Problem | Fix |
|---|---|
| `missing …/url/url.txt` | Check the folder names. The screen name must match the folder. |
| `the page redirected to …` | The page needs a login. See **Login pages**. |
| `could not run python` / `No module named 'PIL'` | Install Python, then `pip install pillow numpy`. |
| `Executable doesn't exist … chromium` | `npx playwright install chromium` |
| A check shows ✗ | Tell the agent: `the check still fails, fix it`. |
| `left at the limit: N planned` | Raise `"budgetSec"` in `plan.json`, or ask for a shorter plan. |
| Blank page at `localhost:5173` | Is `npm run dev` running? Does the URL end in `/#/<screen>`? |
| Page changed, want fresh data | `npm run go -- <screen> --force` |
| Start the build over | `npm run port -- <screen> --force` (overwrites `app/`) |

## Commands

| Command | Use |
|---|---|
| `npm run go -- <screen>` | run the stages (stops for the agent). Flags: `--auto`, `--headed`, `--force`, `--mode`, `--from <step>`, `--only <step>`, `--skip a,b`, `--selfcheck`, `--gemini` (needs `GEMINI_API_KEY` in `.env`) |
| `npm run check:plan -- <screen>` | check the plan |
| `npm run check -- <screen>` | check the spec |
| `npm run port -- <screen>` | make the static React copy |
| `npm run verify -- <screen>` | compare the copy with the original (`BASE=http://localhost:<port>` if not 5173) |
| `npm run dev` | dev server, `http://localhost:5173/` lists all screens |
| `npm run login -- "<url>"` | save a login session |
| `npm run ui -- <pack>` | a whole portal module: login → menu → specs → app (see [docs/client-runbook.md](docs/client-runbook.md)) |
| `npm run check:writer` | can the writer (Codex) do what `npm run ui` needs? (see [lookout.md](lookout.md)) |
| `npm run smoke`, `smoke:explore`, `smoke:behavior`, `smoke:ui` | self-tests |
