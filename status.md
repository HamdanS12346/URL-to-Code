# status.md — handoff for the next chat

Branch: `feature/ui-specs`. **Nothing is committed yet** (many `packs/fxfer-v7/screens/*/verify/` files are modified too).
Read first: `AGENTS.md`, `kits/provider/KIT.md`, `docs/probe-runbook.md`, `docs/client-runbook.md`.

## 1. What the project is
`final-playwright` rebuilds legacy Gainwell "Provider" portal screens (Kendo UI for jQuery) as React 19 apps.
`npm run ui` captures the live portal (kit `kits/provider/`), ports it, and the kit runtime (`kits/provider/app/` → copied to each pack app as `src/kit`) replays the portal's behaviour.
Pack `packs/fxfer-v7` (File Transfer Services: Tracking, FTP Server Credentials, File Transfer Configuration) was captured on the AVD (remote VM with live portal access).
Client profile: 1272×588 @ dpr 1.5. The portal switches layout at 1280 CSS px (`isPhone()`).

## 2. The goal of this chat
Make the tool robust for the discrepancies seen in fxfer-v7 (screenshots in `packs/fxfer-v7/changes/`), **for any module, not overfit to File Transfer**, and **without breaking the existing system** (add on top):

1. Date fields filled in the rebuild but empty live.
2. File Transfer Configuration modal shown on the right/off-position at client size; live it is on the left.
3. Sort chevrons don't flip/recolour.
4. Grid filter operator dropdown misbehaves.
5. Dialog dropdown items not working / not captured.
6. Top bar ("top navigation") hide-on-scroll behaviour.

The modal rule is the same in every module, so it must be captured well.

## 3. Root causes found and what was done (all implemented)

| # | Cause | Fix |
|---|---|---|
| Dialog widgets frozen | `scripts/port.mjs` skipped every dialog widget because of `\|\| !el.isConnected` (the dialog HTML box is detached) | removed that test; new `port --dialogs` mode regenerates only dialogs and prints `dialog dN: live/n widgets live` (exit 4 if any frozen) |
| Modal off-position | (a) capture measured the *first frame* of Kendo's opening zoom (10×5 box, scale 0.01) instead of the settled window; (b) POSTs were blocked in capture passes, but some editors are rendered by POST (`POST /FileTransfer/FileTransferConfigurationEdit/`, `POST /FileTransfer/AddFTPServerCredentials/`), so the window never opened; (c) no plausibility check; (d) runtime ignored page scroll when placing | `settledWindow()` (waits for `position().settled`, same box twice 300 ms apart) + `plausible()` in `kit.mjs`; `guard.allow` (per-dialog allowed POSTs, from `screen.dialogs[id].requests`) in `scripts/lib/browser.mjs`; failure reasons are logged (blocked request / stuck loading box / unfinished zoom); `KitScreen.tsx` adds `scrollX/scrollY`; `port.mjs` drops an implausible own `responsive.dialog` and borrows a plausible sibling's |
| Sort chevrons | portal's own carets (`grid-sort-icon-cell`, two `<i>`; sorted → `grid-col-sorted-ind-icon`, teal rgb(0,238,174); desc turns both to `fa-caret-down`); Kendo's `.k-sort-icon` is hidden; cycle asc → desc → asc | `harvest.js sortHeader()`, `kit.mjs sortIcons()` records cycle + per-direction classes into `grids[id].sortIcons`; `widgets.tsx` `nextDir`, `markSortParts`, `indicate` apply them to the sorted column only |
| Filter operator dropdown | popup structure: inner `.k-list-container` nested | `openFilter` lifts it out, `openList({nested})`, `zAbove(anchor)` for list/calendar/filter popups so they stack above windows |
| Dates | portal gives pickers a value (today 00:00) but an empty box; text shows only once a day is picked; also date `max` was frozen at capture day | `harvest.js` returns `shows: el.value` and `minOffsetDays/maxOffsetDays`; `widgets.tsx` picker `atRest()` keeps the box empty when `shows === ''`, `shifted()` for min/max, Reset re-empties |
| Header hide | Headroom.js `offset:150, tolerance:0` | `measureHeadroom()` in `kit.mjs` (5 px scroll steps; null on a short page → borrowed from siblings), `screen.headroom`, used in `KitScreen.tsx` (fallback: header height/4) |
| Search panel folding | live page folds the "Search Criteria" panel after Search (this was the pre-existing FTP `search` state 18% diff) | `collapsed()` in harvest, `screen.search.collapses` in `explore`, `collapseBody()` + post-Search fold in `KitScreen.tsx` |

Other files touched: `scripts/probe.mjs` (`--probe <name>` selects `probe-<name>.mjs`), new `kits/provider/probe-fixes.mjs` (live probe: dialog opening frames, sort icons, date boxes, headroom, filter/dropdown geometry; output in `docs/probe-fixes/`), `docs/probe-runbook.md` (section for it), `KIT.md` ("Behaviors every module shares" + known-gaps), type additions in `kits/provider/app/core.ts`.

`packs/fxfer-v7/app/src/kit/{core.ts,widgets.tsx,KitScreen.tsx}` are byte-identical copies of `kits/provider/app` (`data.ts`/`index.ts` differ pre-existing, left alone).
`packs/fxfer-v7/app/src/{shell,screens/*}/kit.json` were patched by hand with the probe-measured values (`responsive.dialog {left:0, top:20, minWidthPct:90, widthPct:90, maxHeightPct:85}`, `headroom`, `grids.*.sortIcons`, `FromDate/ToDate.shows=''`, Tracking min/max offsets, FTP `search.collapses=[0]`), and the dialog files were regenerated via `port --dialogs`.

## 4. Verified so far
- `tsc --noEmit` clean.
- Scratchpad tests (not in repo): capture helpers (sort recording, settled wait, plausibility, headroom), request guard (`allow`), runtime checks (modal at 0,20 1145×500 and 240,81 1440×918; dropdown z above window; scrolled row dialog on screen; sort carets; filter operator list dx/dy 0; dates empty/pick/Reset; headroom 150/1 px; no page errors).
- `npm run verify` v7: Tracking 13/13, FTP 14/14, Configuration 14/16, 0 console errors.

## 5. Known gaps / not done
- **The new capture-side code has never run against the live portal** (only synthetic pages and the local rebuild): `settledWindow`, `guard.allow`, `measureHeadroom`, `sortIcons`, `collapses`.
- `row-d2@client` fails in v7: its recorded live expectation is the bogus 10×5 box (needs a fresh capture). `row-d2` (page behind the modal) failed before these changes.
- Filter operator list is 20 px narrower than live (optional widen).
- Wheel-at-bottom headroom question unsettled; optionally re-run the probe without `--headed`.
- Unhandled widgets: masked text box (31 in census), autocomplete (27 pages), multiselect, tab strips. Create New pages that navigate to their own page (35 of 61 in the census) untouched.
- `sortIcons` uses one column's pattern; grids with no rows skip the sort probe; some grids start sorted (runtime seeds from it).

## 6. Confidence for other modules (answer given to the user)
- High: modal placement rule (same across the 23 earlier-probed dialogs in 5+ modules), dialog widgets going live, filter operator list.
- Medium: sort carets, dates, headroom, popup stacking (measured on one module only; code reads classes/markup from capture, with fallbacks to old behaviour).
- Medium, untested live: all capture-side changes.

## 7. Next steps (user's plan)
1. Commit and push; go to the AVD.
2. Run a fresh capture: `npm run ui -- fxfer-v8 --yes --url "https://uximc.mms.tst.pgwcloud.net/Home/MyHome/" --menu "File Transfer Services"` and send `ui.log`.
   Expected log lines: "the header hides past 150px", "sorting a column goes asc -> desc -> asc", "Search folds away 1 panel" (FTP), client dialog measured at `left 0px, top 20px`.
3. Validate on two other, differently shaped modules (e.g. one with tabs, one with a wide grid): open Create New at 1272×588 and confirm 0,20 placement and sort carets. Optional census: `npm run probe -- fxfer-v7 --probe fixes --modules "<module>" --out docs\probe-fixes --fresh --budget 600`.
4. After a fresh capture, check `row-d2@client` passes.

## 8. Working notes / pitfalls
- Files use **CRLF**. Shell heredocs/sed mangle `\b`, `\s`, `\r\n`; write patch scripts to files that normalise to LF and restore CRLF. After patching, grep for 0x08 bytes.
- `verify` for pack screens needs `URL=http://localhost:<port>/#/<screen> WAIT_ROOT=1`, otherwise it opens Home and shows false diffs.
- Never open `.env` or `packs/*/auth/`. Don't edit the app's `src/kit`; fix `kits/provider/app` and sync.
- Run `npm run port` / `verify` only as the AGENTS.md workflow says; Python steps need `PYTHONUTF8=1`.
- No dev server is left running (port 5180 was stopped).
