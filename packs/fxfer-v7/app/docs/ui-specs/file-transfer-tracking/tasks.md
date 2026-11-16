# TASKS — fxfer-v7/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library). Provider kit renders Kendo widgets/dialogs; screen code should only wire screen-specific behavior.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v7/screens/file-transfer-tracking/spec/UI_SPEC.md` · tests: `packs/fxfer-v7/screens/file-transfer-tracking/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v7/file-transfer-tracking`: builds the static page in `packs/fxfer-v7/screens/file-transfer-tracking/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v7/screens/file-transfer-tracking/` (`npm run verify -- fxfer-v7/file-transfer-tracking` reads them there).
- [ ] The route `#/fxfer-v7/file-transfer-tracking` needs no registration: the root router finds the screen’s `app/Page.tsx`.

## 1. Shell — §2, §3
- [ ] Keep the shared shell as the kit provides; do not re-implement header/menu/footer.
  Accept: `npm run verify -- fxfer-v7/file-transfer-tracking` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] `ModuleTitleBar`: “FILE TRANSFER SERVICES” + “File Transfer Tracking”. Accept: verify band `01-file-transfer-tracking` bad_pct < 5.
- [ ] `MainContent`: Search Criteria panel layout (fields + buttons). Accept: verify band `02-pagebody` bad_pct < 5.
- [ ] `Footer`: shared footer visuals. Accept: verify band `03-disclaimer-the-website-is-prov` bad_pct < 5.

## 3. Components & states — §5, §7, §8
- [ ] `SearchCriteriaPanel`: collapse/expand via `button-collapse` and the header tools (`button-22`). Accept: parity tests for `button-collapse` interactions pass.
- [ ] `SearchCriteriaForm`: wire Provider kit widgets and ensure all keys in §12 exist as `data-testid`. Accept: parity tests pass.
- [ ] `SearchResultsGrid` (`[kit:k9]`): ensure Search shows results and grid can sort/page via the kit. Accept: parity tests that run Search and select a row pass.
- [ ] `FileTransferDetailsDialog` (`[kit:d1]`): ensure row double-click opens the dialog and X/Cancel close it. Accept: parity tests pass.

## 4. Validation — §6
- [ ] Ensure the captured validation messages for File ID / File Name / Trading Partner ID / dates / sizes appear when invalid. Accept: parity tests pass.

## 5. Server interactions — §10
- [ ] Ensure Search triggers `GET /api/FileTransfer/SearchFileTransferTracking/` via the kit service and populates the grid. Accept: parity tests pass.

## 6. Done
- [ ] `npm run verify -- fxfer-v7/file-transfer-tracking`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v7/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
