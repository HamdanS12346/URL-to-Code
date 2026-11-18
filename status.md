# status.md — handoff for the next chat

## Earlier work (fxfer-v7 fixes), condensed
Branch `feature/ui-specs`: for the fxfer-v7 discrepancies (dialog placement, frozen dialog widgets, sort carets, filter operator list, empty dates, header hide, search-panel fold) the kit capture/runtime was fixed generically (`kit.mjs`, `harvest.js`, `widgets.tsx`, `KitScreen.tsx`, `port.mjs`, `browser.mjs`, `probe-fixes.mjs`) and verified only on synthetic pages and the local rebuild (v7 verify 13/13, 14/14, 14/16), never on the live portal.
Still open: run a fresh live capture (`npm run ui -- fxfer-v8 …`) and check `row-d2@client`; unhandled widgets (masked text, autocomplete, multiselect, tab strips); details are in git history and `kits/provider/KIT.md`.

## This chat: the "flows" stage (implemented, in the working tree, not committed)

### Request
An AI-driven (Codex-only) exploration loop: capture a state, the AI plans interactions (clicks, values, wrong input, numbers/text), Playwright does them and captures the reactions, and when something new opens (a modal inside a modal) the AI plans again, until a dead end. Output: one folder per state, hierarchical; specs and code are built from it. Hard constraints: smart, never actually save/update/create (everything before that click is free), parallel, modular to the Provider portal, must not break the existing system.
P0 in the same request: the green top band (module tab + title bar) was missing in pe-v1; it must be present for every module.
Last request: flows must run in the plain main command (`npm run ui -- <pack> --yes --url … --menu …`) with no flag, and the runbook must say so.

### Behavior now
- Stage `flows` runs after each screen's capture in every `npm run ui`. Off with `--no-flows` or `pack.json "flows": false`; `--flows` re-enables a pack that has `false`. Re-run from it: `--from flows`; only it: `--only flows`; `--flow-workers N`.
- Re-running a pack built without flows runs flows, then redoes spec, port and code for each screen (`flowsNewer` in `scripts/ui.mjs` compares `flows/index.json` with `src/screens/<id>/Page.tsx`).
- Engine (`scripts/flows.mjs`): a graph of state nodes with fingerprints; each wave is planned by Codex (`prompts/flows.md`, gate `scripts/check-flows.mjs`) or by a rule plan, run by parallel workers (browser contexts sharing the session). Undo = close the window, else reload and replay. A blocked write makes a boundary leaf. Field probes (accepted chars, maxlength, messages) and a save probe (press Save with all writes blocked). Output per state: `shot.png`, `map.png`, `candidates.md/json`, `layer.html`, `window.json`, `node.json`; plus `flows/index.json`. Defaults in `config.json "flows"` (maxNodes 40, maxDepth 6, maxWaves 6, maxActions 12, timeBudgetSec 1500, workers 2, probeFields 8, saveProbe, ai, allow[]).
- Safety (`scripts/lib/safety.mjs`, self-check `node scripts/lib/safety.mjs` → "safety: OK"): commit-verb regex, write-path detection, request policy wired into `guard.policy` / `guard.blockGet` in `scripts/lib/browser.mjs`. Never plan a commit; the script refuses it anyway.
- Merge into the kit (`kits/provider/kit.mjs` `flows` hooks): new dialogs, `screen.flows`, `flow-<id>` states, idempotent; runtime support in `kits/provider/app/{core.ts,KitScreen.tsx,widgets.tsx}`; the spec cites each state as `[flow:<id>]` (`scripts/check-spec.mjs`, flows coverage line).
- P0 fix: `scripts/ui.mjs` picks the shell from screens that have a title bar; `scripts/port.mjs` keeps the tab chevron and renders the band with `{module}`/`{title}` (band returns null when no title); `kits/provider/harvest.js` module-tab lookup excludes menu popups.

### Files (all under `c:\dev\final-playwright`)
New: `scripts/flows.mjs`, `scripts/check-flows.mjs`, `scripts/lib/safety.mjs`, `scripts/lib/flows-inpage.js`, `prompts/flows.md`, `test/flows-smoke.mjs`.
Changed: `scripts/ui.mjs`, `scripts/port.mjs`, `scripts/check-spec.mjs`, `scripts/lib/browser.mjs`, `kits/provider/{kit.mjs,harvest.js,KIT.md}`, `kits/provider/app/{core.ts,KitScreen.tsx,widgets.tsx}`, `test/fake-writer.mjs`, `test/provider-portal/server.mjs` (FlowsLab fixture), `test/{ui,provider}-smoke.mjs` (pin `flows: false`), `config.json`, `package.json` (`smoke:flows`, `check:flows`), `docs/client-runbook.md` (section "Flows: every path of every screen"), `AGENTS.md`.

### Tests
OK: safety self-check; `test/flows-smoke.mjs` (8 states, 2 boundaries, 3 windows, ~80 s, zero writes); provider-smoke; ui-smoke; an integration run on a scratch pack (exit 0, zero writes, verify states 26/26); `tsc` on the kit.
Not re-run since the last change (smokes pinned to `flows:false`, flows on by default): only `node --check scripts/ui.mjs` was done.

### Open items / notes
- Never run against the live portal: flows are tested on the local fixture only. Expect about 20–40 min per screen live.
- `packs/smoke-flows/` is a leftover from my integration run and can be deleted.
- Next steps: run `npm run smoke:ui`, `smoke:provider`, `smoke:flows`; commit; on the AVD re-run `npm run ui -- <pack> --yes --url … --menu …` and send `ui.log`; check the pe-v1 green band after a re-port.
- Pitfalls: the Edit tool writes CRLF; the repo files are LF, so normalize with `sed -i 's/\r$//'`. Never open `.env` or `packs/*/auth/`. Don't edit an app's `src/kit`; fix `kits/provider/app`. Pack `verify` needs `URL=http://localhost:<port>/#/<screen> WAIT_ROOT=1`.
