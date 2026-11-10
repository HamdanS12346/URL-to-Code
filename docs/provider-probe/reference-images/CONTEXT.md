# Context: what we are doing and why these images exist

## The project
`final-playwright` turns one legacy web screen (a URL) into a UI spec and then into a React 19 + TypeScript + Vite rebuild.
Playwright captures the facts (screenshots, real CSS, DOM, motion, network calls). A coding agent (Codex on the client machine) writes the spec and then the code.
Rules live in `AGENTS.md`; the client workflow is in `docs/client-runbook.md`.

## The client and the target
- Client portal: **Provider** (Gainwell MMS), built on **Kendo UI for jQuery** + ASP.NET MVC. Test host: `uximc.mms.tst.pgwcloud.net` (login required).
- First module being rebuilt: **File Transfer Services**, three screens:
  1. File Transfer Configuration
  2. File Transfer Tracking
  3. FTP Server Credentials
- Goal: the rebuild must be **1:1** with the real portal in looks, behavior and animations.

## Why the tool was changed
The first run on the client site produced pages that visibly differed from the real ones (images `compare-generated-vs-actual-01..05.jpg` show generated vs actual). Generic screenshot-to-code could not reproduce Kendo widgets (dropdown lists, date pickers, grids with filter/pager, dialogs, tooltips, validation).

Hard constraint from the user: whatever fix is made must hold **uniformly across every module and page of the Provider portal**, not just File Transfer Services.

## What was built (uncommitted on branch `feature/ui-specs` unless since committed)
- **Site kit** `kits/provider/`: in-page harvest of live Kendo widgets (options, data sources, columns, tooltips, validation rules, open popups and dialogs), a React runtime copied into each generated app as `src/kit`, a guide for the coder (`KIT.md`), and hooks the scripts call. `scripts/` stays site-agnostic.
- **Faster pipeline with a kit:** no motion sampling, short warm-up, fidelity/survey/plan/explore skipped.
- **Packs:** `npm run ui` now asks for a **pack name** first (e.g. `ffxfer-v2` gives `packs\ffxfer-v2`); the old `outRepo` question is gone so several packs of one module never conflict. The app lives in `packs/<pack>/app` and uses the repo's `node_modules`.
- **Decisions agreed with the user:** grid rows are **synthetic** (no client data kept); edit/detail flows from the first grid row are in scope (open, harvest, close; never Save/Update/Delete); a **mock services layer** with the real endpoint names (`src/services/<screen>.ts`).
- **Verify** replays kit states (dropdown open, calendar, tooltip, Search, dialogs) and prints `states: N/M`.
- **Test rig:** an offline Provider-style portal using real Kendo core (`npm run smoke:provider`).

## Known gaps / next ideas
- Grid filter menu, pager page-size dropdown, cascading dropdown behavior and the help (book) icon are not reproduced yet (see `kits/provider/KIT.md`).
- Backend endpoints: only calls triggered by the capture's safe clicks are recorded. Possible extension: read Kendo `dataSource.options.transport` URLs and form `action`s, record JSON body keys, scan saved screen JS for Save endpoints.
- Spec generation is slow; a `--parallel N` option was proposed, not built.
- Not yet run against the real client portal; real Kendo Grid/Window/DateTimePicker are the likeliest to differ from the offline stand-ins.

## The images in this folder
Pasted by the user in the first planning chat, extracted from the session transcript.
- `compare-generated-vs-actual-01..05.jpg`: generated output vs the real page (the gap to close).
- `actual-site-01..13.jpg`: the real Provider portal (File Transfer Services screens, grids, dialogs, dropdowns, tooltips, side menu). These are the visual ground truth.

They may show client data: do not publish. Related evidence: `docs/provider-probe/` (the client's probe answers).

## Standing rules
- Never open, print or copy `.env` or anything under `packs/*/auth/`.
- The password is typed at the prompt only, never written to disk or given to the writer.
- Do not run the capture or open the live site unless the user asks.
