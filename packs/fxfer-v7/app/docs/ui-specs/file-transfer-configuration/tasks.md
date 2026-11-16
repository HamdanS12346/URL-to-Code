# TASKS ? fxfer-v7/file-transfer-configuration

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v7/screens/file-transfer-configuration/spec/UI_SPEC.md` ? tests: `packs/fxfer-v7/screens/file-transfer-configuration/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v7/file-transfer-configuration`: builds the static page in `outputs/fxfer-v7/file-transfer-configuration/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] Use `packs/fxfer-v7/screens/file-transfer-configuration/reference.png` + `packs/fxfer-v7/screens/file-transfer-configuration/manifest.json` as the visual reference for verify.

## 1. Shell ? ?2, ?3
- [ ] Keep the page wrapped in the shared shell (per home spec) while implementing the screen?s content area.
  Accept: `npm run verify -- fxfer-v7/file-transfer-configuration` ? `size_delta_px` within ?2.

## 2. Regions ? ?2 (top to bottom, one task each)
- [ ] Module/title strip: ?FILE TRANSFER SERVICES? + ?File Transfer Configuration? title + help icon. Accept: verify crop for band 01 is aligned.
- [ ] Search Criteria panel: card container + header + collapse icon + fields + buttons (`ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList`). Accept: verify band 02 `bad_pct` < 5.
- [ ] Search Results: header + grid `k4` + ?Show Inactives?. Accept: parity checks for grid interactions pass.

## 3. Components & states ? ?5, ?7, ?8
- [ ] Wire ?Search? (`nextButton`) to show results (mocked rows per kit) and render `k4` with correct columns + paging. Accept: parity tests for Search and grid opening pass.
- [ ] Create New: open dialog `d1`; implement run schedule mode toggles; implement close-with-unsaved-edits confirmation. Accept: parity tests for `d1` states pass.
- [ ] View: open dialog `d2` on row double-click. Accept: parity tests for `d2` open/close pass.

## 4. Validation ? ?6
- [ ] Implement required-field messages for `d1` Save (and search-criteria regex validations where applicable). Accept: parity tests pass.

## 5. Server interactions ? ?10
- [ ] Stub GET `/api/FileTransfer/SearchFileTransfer/` to return synthetic rows (97 total; page size 10). Accept: Search shows grid with rows.

## 6. Done
- [ ] `npm run verify -- fxfer-v7/file-transfer-configuration`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v7/screens/file-transfer-configuration/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
