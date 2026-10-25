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
Self-tests: `npm run smoke` (capture/motion) and `npm run smoke:explore` (stop at stage 3, agent plan followed exactly, `--auto` folding, no reload storm).


