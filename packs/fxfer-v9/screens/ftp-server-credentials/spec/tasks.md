# TASKS — fxfer-v9/ftp-server-credentials

Target: React 19 + TypeScript, plain CSS (no UI library). Provider portal screens use the Provider kit for Kendo widgets/dialogs.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v9/screens/ftp-server-credentials/spec/UI_SPEC.md` · tests: `packs/fxfer-v9/screens/ftp-server-credentials/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v9/ftp-server-credentials`: builds the static page and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v9/screens/ftp-server-credentials/` (`npm run verify -- fxfer-v9/ftp-server-credentials` reads them there).
- [ ] The route `#/fxfer-v9/ftp-server-credentials` needs no registration: the root router finds the screen.

## 1. Shell — §2, §3
- [ ] Shared Provider shell wrapper + module bar styles consistent with the home spec; ensure content area matches §2.1.
  Accept: `npm run verify -- fxfer-v9/ftp-server-credentials` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom, one task each)
- [ ] Content area: Create New button + Search Criteria panel expanded at rest (`ftpServerCredentialAddButton`, `criteriaPanel`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton`).
  Accept: verify band drift is localized; `bad_pct` < 5 for the pageBody band.
- [ ] Search Results state: after Search (`nextButton`) show Search Results panel and grid `k1` with columns and Include Invalids toggle.
  Accept: Provider kit state `search` matches (states: `search.png`).

## 3. Components & states — §5, §7, §8
- [ ] State wiring: `criteriaExpanded`, `resultsVisible`, `includeInvalids`, selection + double-click row opens `d2`.
  Accept: parity tests cover `flow:n1`, `flow:n1.2` interactions.
- [ ] Dialogs: `d1` Add, `d2` Edit, `d3` Alert Confirmation; close-with-dirty opens `d3`.
  Accept: verify kit states `dialog-d1.png`, `dialog-d1-confirm.png`, `dialog-d2.png`, `dialog-d2-confirm.png` match.

## 4. Validation — §6
- [ ] Implement client-side validation messages per kit for Add/Edit dialogs and criteria regex/maxlength.
  Accept: parity tests for required/regex/maxlength behaviors pass.

## 5. Server interactions — §10
- [ ] Implement service stubs for `GET /api/FileTransfer/GetFTPServerCredentials/` and wire Search to populate synthetic grid rows.
  Accept: Search shows results and opens Edit dialog on row double-click.

## 6. Done
- [ ] `npm run verify -- fxfer-v9/ftp-server-credentials`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v9/screens/ftp-server-credentials/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
