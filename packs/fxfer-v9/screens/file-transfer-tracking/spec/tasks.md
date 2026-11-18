# TASKS — fxfer-v9/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v9/screens/file-transfer-tracking/spec/UI_SPEC.md · tests: packs/fxfer-v9/screens/file-transfer-tracking/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v9/file-transfer-tracking`: builds the static page in `packs/fxfer-v9/screens/file-transfer-tracking/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v9/screens/file-transfer-tracking/` (`npm run verify -- fxfer-v9/file-transfer-tracking` reads them there).
- [ ] The route `#/fxfer-v9/file-transfer-tracking` needs no registration: the root router finds `packs/*/screens/*/app/Page.tsx`.

## 1. Shell — §2
- [ ] Ensure the screen is wrapped by the shared Provider shell (header/menu/footer). Accept: `npm run verify -- fxfer-v9/file-transfer-tracking` size_delta_px within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Search Criteria card: header, field grid layout, and footer buttons (`FileId`, `FileName`, `combobox-*`, `FromDate`, `ToDate`, `text-from-size-kb-from-size-kb`, `text-to-size-kb-to-size-kb`, `resetButton`, `cancelButton`, `nextButton`).
  Accept: verify band for the Search Criteria region has bad_pct < 5.
- [ ] Search Results card (post-search state): heading and results grid + pager (kit grid `k9`).
  Accept: kit state after-search compares (states N/M) and verify band bad_pct < 5. 

## 3. Components & states — §5, §7, §8
- [ ] Search Criteria collapse/expand (`button-collapse`) reproduces the collapsed state. Accept: parity checks for `flow:n1` state pass.
- [ ] Search runs with empty criteria and displays results. Accept: parity checks for `flow:n2` state pass.
- [ ] Double-click first row opens dialog `d1`. Accept: parity checks for `flow:n2.1` state pass.

## 4. Validation — §6
- [ ] Implement maxLength enforcement for FileId/FileName/TradingPartnerId and numeric/date validation messages for size/date fields.
  Accept: parity tests and kit validations match the messages in §6.

## 5. Server interactions — §10
- [ ] Implement service stubs for:
  - GET `/api/FileTransfer/SearchFileTransferTracking/` (search)
  - POST `/FileTransfer/FileTransferTrackingView/` (open dialog)
  Accept: behaviors in §8 still work with mocked responses.

## 6. Done
- [ ] `npm run verify -- fxfer-v9/file-transfer-tracking`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=http://localhost:5173/#/fxfer-v9/file-transfer-tracking npx playwright test packs/fxfer-v9/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
