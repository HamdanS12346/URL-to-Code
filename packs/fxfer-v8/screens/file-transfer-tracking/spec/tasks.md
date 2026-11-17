# TASKS ? fxfer-v8/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v8/screens/file-transfer-tracking/spec/UI_SPEC.md ? tests: packs/fxfer-v8/screens/file-transfer-tracking/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v8/file-transfer-tracking`: builds the static page in `packs/fxfer-v8/screens/file-transfer-tracking/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v8/screens/file-transfer-tracking/` (`npm run verify -- fxfer-v8/file-transfer-tracking` reads them there).

## 1. Shell ? ?2, ?3
- [ ] Use the shared shell provided by the Provider kit; do not rebuild shell UI in this screen. Accept: `npm run verify -- fxfer-v8/file-transfer-tracking` ? size_delta_px within ?2. [asset:kit/states/search.png]

## 2. Regions ? ?2 (top to bottom, one task each)
- [ ] Search Criteria panel: header, collapse chevron (`button-22`), and field grid layout. Accept: verify the Search Criteria band (`sections/02-pagebody.png`) has `bad_pct` < 5. [asset:sections/02-pagebody.png]
- [ ] Search Results grid ([kit:k9]): header ?Search Results?, grid columns, pager. Accept: kit state `search.png` matches in verify states. [kit:k9]

## 3. Components & states ? ?5, ?7, ?8
- [ ] Search criteria fields: wire kit widgets `k1`?`k8` and text inputs (`FileId`, `FileName`, `TradingPartnerId`). Accept: parity tests for typing/selecting inputs pass. [kit:k1, kit:k2, kit:k3, kit:k4, kit:k5, kit:k6, kit:k7, kit:k8]
- [ ] Search action: clicking Search (`nextButton`) populates grid, and double-clicking first row opens dialog d1. Accept: parity tests reach dialog d1. [kit:k9, kit:d1]
- [ ] Dialog d1: INFORMATION section fields, EVENTS grid (`k13`), EXCEPTIONS grid (`k14`), close via X and Cancel. Accept: kit state `dialog-d1.png` matches; parity tests pass. [kit:d1, kit:k13, kit:k14]

## 4. Validation ? ?6
- [ ] Implement validations/messages for File ID, File Name, Trading Partner ID, From/To Date format, and size numeric constraints (?2 decimals). Accept: parity tests for invalid input pass. [kit:k9, kit:d1]

## 5. Server interactions ? ?10
- [ ] Stub GET `/api/FileTransfer/SearchFileTransferTracking/` so a blank Search returns rows and populates the grid; record `[UNKNOWN]` criteria params as a known gap until the API contract is known. Accept: Search produces rows and dialog opens from first row. [kit:k9]

## 6. Done
- [ ] `npm run verify -- fxfer-v8/file-transfer-tracking`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v8/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
