# TASKS — fxfer-v7/ftp-server-credentials

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v7/screens/ftp-server-credentials/spec/UI_SPEC.md · tests: packs/fxfer-v7/screens/ftp-server-credentials/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v7/ftp-server-credentials`: generate the baseline rebuild from `snapshot/rendered.html` + `snapshot/used.css`.
- [ ] Verify `manifest.json` has correct `dpr` and viewport; keep all sizing in CSS px.

## 1. Shell — §2, §3
- [ ] Use the shared Provider shell (home screen spec) and keep module bar + footer consistent.
  Accept: `npm run verify -- fxfer-v7/ftp-server-credentials` → `size_delta_px` within ±2.

## 2. Regions — §2
- [ ] Content area default state: Create New + Search Criteria panel (expanded), including button placement and panel styles. [keys: ftpServerCredentialAddButton, criteriaPanel, FtpServerName, resetButton, cancelButton, nextButton]
  Accept: verify band for `sections/02-pagebody.png` has `bad_pct` < 5.
- [ ] Search Results state: results panel + grid + Include Invalids checkbox. [kit:k1]
  Accept: state screenshot `kit/states/search.png` matches closely; grid columns and pager render.

## 3. Components & states — §5, §7, §8
- [ ] Wire Search to show results grid and populate 4 synthetic rows (kit) when Search is clicked with empty criteria. [§8.2]
  Accept: parity spec can open results and see 4 rows.
- [ ] Create New opens Add dialog `d1`; double-click row opens Edit dialog `d2`. [§8.3]
  Accept: parity spec can open dialogs and close them.
- [ ] Close confirmation appears after edits (No stays, Yes closes). [§8.3]
  Accept: parity spec passes dialog close confirmation checks.

## 4. Validation — §6
- [ ] Add dialog required-field validation messages show (7 messages when saved empty). [kit:d1]
  Accept: parity spec validation assertions pass.

## 5. Server interactions — §10
- [ ] Implement service stub for GET `/api/FileTransfer/GetFTPServerCredentials/` used by Search. [§10]
  Accept: Search results appear without errors.

## 6. Done
- [ ] `npm run verify -- fxfer-v7/ftp-server-credentials`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v7/screens/ftp-server-credentials/spec/parity.spec.ts`: all pass.
- [ ] Resolve §13 open questions, or track as known gaps.
