# TASKS — fxfer-v6/ftp-server-credentials

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v6/screens/ftp-server-credentials/spec/UI_SPEC.md` · tests: `packs/fxfer-v6/screens/ftp-server-credentials/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v6/ftp-server-credentials`: builds the static page in `packs/fxfer-v6/screens/ftp-server-credentials/app/` (assets copied, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v6/screens/ftp-server-credentials/` (`npm run verify -- fxfer-v6/ftp-server-credentials` reads them there).
- [ ] The route `#/fxfer-v6/ftp-server-credentials` needs no registration: the root router finds `packs/fxfer-v6/screens/ftp-server-credentials/app/Page.tsx`.

## 1. Shell — §2, §3
- [ ] Keep the page wrapped in the shared shell (home spec); ensure content area alignment matches `reference.png`.
  Accept: `npm run verify -- fxfer-v6/ftp-server-credentials` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Content area (`#pageBody`): Create New button row + Search Criteria panel default state.
  Accept: verify band for `sections/02-pagebody.png` has `bad_pct` < 5.
- [ ] Post-search state: Search Results panel with Include Invalids + grid `k1`.
  Accept: `verify` reports `states: search` matches (kit state screenshot). [kit:k1]

## 3. Components & states — §5, §7, §8
- [ ] Wire Search to the kit search service: `nextButton` triggers GET `/api/FileTransfer/GetFTPServerCredentials/` and reveals Search Results.
  Accept: parity tests for `nextButton` pass and `verify` search state matches. [kit:k1]
- [ ] Wire Create New to open dialog `d1`.
  Accept: `verify` state `dialog-d1` matches. [kit:d1]
- [ ] Ensure double-click on first grid row opens dialog `d2`.
  Accept: `verify` state `dialog-d2` matches. [kit:d2]
- [ ] Dialog close confirmation: X-with-edits shows `Alert Confirmation` modal; No stays open; Yes closes.
  Accept: `verify` confirm states for `dialog-d1-confirm` and `dialog-d2-confirm` match. [kit:d1, kit:d2]

## 4. Validation — §6
- [ ] Ensure MVC validation messages for dialogs `d1`/`d2` match the captured strings.
  Accept: kit dialog validation behavior matches captured tooltips/messages. [kit:d1, kit:d2]

## 5. Server interactions — §10
- [ ] Implement screen service stubs for GET search + POST save.
  Accept: Search shows rows; Save calls return success and UI updates per spec (or leave as known gap if `[UNKNOWN]`). [kit:k1]

## 6. Done
- [ ] `npm run verify -- fxfer-v6/ftp-server-credentials`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v6/screens/ftp-server-credentials/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
