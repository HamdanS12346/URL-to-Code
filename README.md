# final-playwright

Legacy screen (URL + your screenshots) → captured facts → UI spec + tasks → React 19 rebuild checked against your screenshots.
Self-contained: everything it uses lives in this folder. Works on any page (WebForms, DevExpress, MVC, React…); it never leaves the given page.

## Quick start: one command, two stops for your coding agent

```
1. make the folder        screenshots/<screen>/url/url.txt      <- one line: the page address
2. run (from this folder) npm run go -- <screen>
      stages 1-2 run (about 1 min), then it prints  STOP HERE (stage 3 of 5)
3. in your coding agent:  plan the exploration for <screen>
      (skill explore-plan: reads the survey + map pictures, writes explore/plan.json, ends with npm run check:plan -- <screen> ✓)
4. run the SAME command again:  npm run go -- <screen>
      stage 4 runs the plan (1-5 min), then it prints  STOP HERE  for stage 5
5. in your coding agent:  write the UI spec for <screen>
      (skill ui-spec; ends when npm run check -- <screen> prints ✓)
6. new chat, start coding:  build <screen> from outputs/<screen>/spec/tasks.md      (skill draw-ui)
      (first `npm run port -- <screen>` builds the static page in outputs/<screen>/app/, then `npm run verify -- <screen>`.
       Everything for a screen lives in outputs/<screen>/; the root app only routes to outputs/*/app.)
```

The five stages:

| stage | what happens | by |
|---|---|---|
| 1 capture | warm up + freeze the page, save assets/DOM/computed styles/tokens/motion/regions, photograph it at `config.json -> urlOnly` size | script |
| 2 survey | find everything you can hover / click / type into (CSS `:hover` rules, aria popups/tabs/accordions, forms), fold look-alikes (40 cards = 1 group), list what is hidden at load. Writes `explore/survey/candidates.md`, `map/NN.jpg` (the page with a numbered box per row) and `plan.suggested.json` (rule-based) | script |
| 3 plan | **your coding agent** picks what to test and in what order (menus, tabs, accordions, carousel, search with a real query, forms; skips footer/legal/social), writes `explore/plan.json`; `npm run check:plan` must pass. The run stops here | agent + gate |
| 4 run the plan | hover (no reloads), focus, then clicks/fills/Enter in plan order: act, settle, diff DOM/styles, crop what changed, follow what an action reveals. Never leaves the page, never submits (mode `safe`). Then `facts.md` | script |
| 5 spec | **your coding agent** writes `UI_SPEC.md` + `tasks.md` from `facts.md`, `sections/*.png`, `content.md`; the gate `npm run check` must pass. The run stops before this | agent + gate |

Re-running is safe: finished stages are cached; a changed `plan.json` re-runs stage 4 only. To re-plan, edit or delete `explore/plan.json` and run again.

Optional extras (all off by default, nothing needs an API key):
- `--auto` no stop at stage 3: the rule-based plan (`plan.suggested.json`) is used.
- `--gemini` Gemini writes the spec (needs `GEMINI_API_KEY` in `.env`; retries on 503/429).
- `--selfcheck` re-runs every behavior against the live page to drop flaky ones (5-8 min on a big live site).
Other flags: `--force` (redo all), `--from survey|plan|explore`, `--skip <step>`, `--headed`.
Budget: `"budgetSec"` in the plan, else `config.json -> explore.timeBudgetSec` (300). The plan always runs first, in its order; leftover budget follows what it revealed (menu sections, dialog close buttons). If the stage-4 line says `left at the limit: N planned`, raise it or shorten the plan (hover gets 45% of the time, the rest goes to click/fill actions); leftover follow-ups alone are fine.
Self-tests: `npm run smoke` (capture/motion), `npm run smoke:explore` (stop at stage 3, agent plan followed exactly, `--auto` folding, no reload storm), `node test/jsx-attrs.mjs` and `node test/port-regress.mjs` (port and `usedCss` regressions, line-break-only formatting).

## After stage 5: build and check

```
npm run port -- <screen>       static React page in outputs/<screen>/app/ (formatted: one element per line). Re-running needs --force and overwrites hand edits.
                               Ends with a preflight: which data-testid keys parity.spec.ts uses that nothing in app/ carries.
npm run verify -- <screen>     renders the rebuild like the reference, diffs it, prints size_delta_px, bad_pct, per-section bad_pct and the motion N/M line
npx playwright test outputs/<screen>/spec/parity.spec.ts            the original page (TARGET=legacy, default)
TARGET=react URL=http://localhost:5173/#/<screen> npx playwright test outputs/<screen>/spec/parity.spec.ts     the rebuild
```

- **verify** starts its own Vite when none is running (`BASE=http://localhost:<port>` for another port) and exits by itself. It writes `outputs/<screen>/verify/`:
  `report.json`, `candidate.png`, `diff.png`, `missing-keys.json` (the preflight), and, when something differs, `worst.png` (reference | candidate for the worst region).
  `report.json -> clusters` has the top 5 diff regions as boxes with the rebuild's element under each; when the rebuild is taller than the reference, `past_reference_height` lists the elements that stick out past its bottom edge.
- **parity** runs 4 tests in parallel against the rebuild (2 against the live site). An action on a key that no `data-testid` in `app/` carries fails at once instead of waiting 5 s (skipped when the app builds its testids dynamically). Assertions are not weakened.
- **facts.md** lists controls with identical state rules on one line and collapses `tooltip-<uuid>` ids into one line with a count; every id is still in `facts.json`.
- **explore** finds an element by its label when its recorded id selector no longer exists (ids such as `#dialog-show-dialog-<uuid>` change on every load).
- **budgetSec**: leave it out of `plan.json` (default 300); only raise it, never lower it.
- GateGuard (coding-agent hook) first-touch prompts are skipped for `scripts/**` and `outputs/*/app/**` through `.claude/settings.local.json` (personal, not committed).

## Building the React version: step by step (for beginners)

This part runs after the spec is finished (`npm run check -- <screen>` prints ✓). Replace `<screen>` with your screen name. Every command runs in a terminal opened in this folder.

**One time only**

1. Install the project's tools:
   ```
   npm install
   ```

**Every time you build a screen**

2. Create the starting page from the captured files:
   ```
   npm run port -- <screen>
   ```
   This writes `outputs/<screen>/app/`, a static copy of the page with `Page.tsx`, `components/`, `style.css`, `assets/` and `BEHAVIOR.md`. Run it once to start. Running it again needs `--force`, which overwrites any code you wrote by hand.

3. Measure how close the copy is to the screenshot:
   ```
   npm run verify -- <screen>
   ```
   Open `outputs/<screen>/verify/report.json`. Check `size_delta_px` (it should be within ±2), the per-section `bad_pct` (the sections with the most difference are listed first), and the `motion` and `behavior` lines. Open the crop named in `worst_band` to see what is wrong.

4. Build the page from `outputs/<screen>/spec/tasks.md`. Work through it from top to bottom: setup, page shell, one task per band of the page, interactive parts (menus, carousels, tabs, forms), validation, and the final checks. Edit the files in `outputs/<screen>/app/` directly. Each task says how to tell it is done.

5. Start the dev server in its own terminal and leave it running:
   ```
   npm run dev
   ```
   Then open `http://localhost:5173/#/<screen>` in a browser to see your page.

6. Test how the page behaves (clicks, tabs, carousels, forms) against the live page and against your rebuild:
   ```
   npx playwright test outputs/<screen>/spec/parity.spec.ts
   TARGET=react URL=http://localhost:5173/#/<screen> npx playwright test outputs/<screen>/spec/parity.spec.ts
   ```
   The first line tests the original page, and the second tests your rebuild. Run `verify` again after each round of fixes; stop after three rounds and list what is left.

7. Write the final report. It lists what matches, what does not, and anything you guessed. A guess is needed when the spec marks something `[UNKNOWN]`. Put each guess on its own line under "Guessed", with the guess you made.

**If something goes wrong**

- `verify` or `port` says a file is missing: run step 2 again, or check that `outputs/<screen>/spec/` still has `UI_SPEC.md` and `tasks.md`.
- The page is blank at `localhost:5173`: check that the dev server is still running and that the address ends in `/#/<screen>`.
- The numbers are far off (`size_delta_px` larger than ±2): check that the manifest in `outputs/<screen>/manifest.json` has `"dpr"` and `"css_viewport_width"`. Do not change the screenshot or the spec to fix this.


