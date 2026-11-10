# TASKS — ffxfer-index-v1/file-transfer-configuration

Target: React 19 + TypeScript, plain CSS (no UI library). This screen uses the Provider kit for Kendo UI widgets and dialogs.
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md`.
Spec: `packs/ffxfer-index-v1/screens/file-transfer-configuration/spec/UI_SPEC.md` · tests: `packs/ffxfer-index-v1/screens/file-transfer-configuration/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- ffxfer-index-v1/file-transfer-configuration`: builds the static page in `packs/ffxfer-index-v1/screens/file-transfer-configuration/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] Confirm `packs/ffxfer-index-v1/screens/file-transfer-configuration/manifest.json` has `dpr: 1` and `css_viewport_width: 1920`.

## 1. Shell — §2, §3
- [ ] Keep the screen wrapped in the shared shell (home spec); implement only this screen’s content area layout. Accept: `npm run verify -- ffxfer-index-v1/file-transfer-configuration` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Search Criteria panel: panel chrome + header “Search Criteria” + field layout + action buttons (`resetButton`, `cancelButton`, `nextButton`). Accept: verify band containing `sections/02-pagebody.png` has `bad_pct < 5`.
- [ ] Results panel container (`searchFileTransferConfigResultsPanel`) + Create New button (`FileTransferGridAddButton`) + kit grid widget (`k4`). Accept: verify has no early drift; results area matches when forced visible for verification.

## 3. Components & states — §5, §7, §8
- [ ] Wire Search behavior: Search shows results panel and applies filters to the grid from current field values. Accept: parity checks for Search-related test ids pass.
- [ ] Wire Reset behavior: Reset clears fields, clears grid data, unchecks Show Inactives, hides results panel. Accept: parity checks for Reset-related behavior pass.
- [ ] Wire Show Inactives behavior: toggling `FileTransferShowInactiveCheckBox` re-applies grid filter. Accept: parity checks for filter behavior pass.
- [ ] Wire Create New: clicking `FileTransferGridAddButton` opens the kit overlay at `/FileTransfer/FileTransferConfigurationEdit/` (dialog contents are `[UNKNOWN]`). Accept: click opens overlay container.

## 4. Validation — §6
- [ ] Ensure field-level validation messages and max lengths match: `ConfigId` digits-only + max 9; `ConfigName`/`OwnerName` max 50 + regex constraints. Accept: parity validation checks pass.

## 5. Server interactions — §10
- [ ] Stub/implement grid data loading contract once captured/known (currently `[UNKNOWN]`). Accept: results populate and match legacy.

## 6. Done
- [ ] `npm run verify -- ffxfer-index-v1/file-transfer-configuration`: `size_delta_px` ±2, `bad_pct < 5`.
- [ ] `TARGET=react URL=<url> npx playwright test packs/ffxfer-index-v1/screens/file-transfer-configuration/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
