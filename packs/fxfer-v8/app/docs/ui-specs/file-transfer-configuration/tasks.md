# TASKS ? fxfer-v8/file-transfer-configuration

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v8/screens/file-transfer-configuration/spec/UI_SPEC.md ? tests: packs/fxfer-v8/screens/file-transfer-configuration/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v8/file-transfer-configuration`: builds the static page in `packs/fxfer-v8/screens/file-transfer-configuration/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v8/screens/file-transfer-configuration/` (`npm run verify -- fxfer-v8/file-transfer-configuration` reads them there).

## 1. Shell ? ?2, ?3
- [ ] Confirm the rebuild renders inside the shared Provider shell (home spec) and that the content area matches ?2 boxes.
  Accept: `npm run verify -- fxfer-v8/file-transfer-configuration` ? `size_delta_px` within ?2.

## 2. Regions ? ?2 (top to bottom, one task each)
- [ ] Content area: `#pageBody > main`, Create New button, Search Criteria panel. [FileTransferGridAddButton, button-collapse]
  Accept: verify band drift `bad_pct` < 5 for the first band.

## 3. Components & states ? ?5, ?7, ?8
- [ ] Search criteria: wire fields + Reset/Search actions; ensure results grid renders and Show Inactives toggles. [ConfigId, ConfigName, OwnerName, SearchModuleList, ProtocolList, resetButton, nextButton, FileTransferShowInactiveCheckBox]
  Accept: parity spec opens page without missing `data-testid` keys.
- [ ] Dialogs: Add (`d1`) and View (`d2`) ? open/close behavior and required-field validation messages per ?6/?8. [kit:d1, kit:d2]
  Accept: dialog states match kit screenshots in `kit/states/`.

## 4. Validation ? ?6
- [ ] Implement regex/required validation messages exactly as specified for `ConfigId`, `ConfigName`, `OwnerName` and Add dialog Save validations.
  Accept: field-level errors show the exact message text.

## 5. Server interactions ? ?10
- [ ] Provide an API adapter for `GET /api/FileTransfer/SearchFileTransfer/` (or an equivalent endpoint) returning grid rows for `k4`.
  Accept: Search populates grid rows and refresh tooltip remains ?Refresh?.

## 6. Done
- [ ] `npm run verify -- fxfer-v8/file-transfer-configuration`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v8/screens/file-transfer-configuration/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
