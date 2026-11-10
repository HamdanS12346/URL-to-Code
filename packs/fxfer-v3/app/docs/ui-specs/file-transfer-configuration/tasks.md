# TASKS — fxfer-v3/file-transfer-configuration

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v3/screens/file-transfer-configuration/spec/UI_SPEC.md` · tests: `packs/fxfer-v3/screens/file-transfer-configuration/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v3/file-transfer-configuration`: builds the static page in `packs/fxfer-v3/screens/file-transfer-configuration/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v3/screens/file-transfer-configuration/` (`npm run verify -- fxfer-v3/file-transfer-configuration` reads them there).
- [ ] The route `#/fxfer-v3/file-transfer-configuration` needs no registration.

## 1. Shell — §2, §3
- [ ] Reuse the shared shell implementation from the pack’s home screen; do not re-spec or re-build shell styling here.
  Accept: parity test ids for the shell resolve (parity.spec.ts selectors find elements).

## 2. Regions — §2 (top to bottom)
- [ ] Content root (`#pageBody > main`): ensure the screen form, Create New action row, and Search Criteria panel match `sections/02-pagebody.png`.
  Accept: `npm run verify -- fxfer-v3/file-transfer-configuration` → `size_delta_px` within ±2.

## 3. Components & states — §5, §7, §8
- [ ] Search Criteria panel: `FileTransferGridAddButton`, `ConfigId`(`[kit:k1]`), `ConfigName`, `OwnerName`, `SearchModuleList`(`[kit:k2]`), `ProtocolList`(`[kit:k3]`), `resetButton`, `cancelButton`, `nextButton`.
  Accept: parity tests for those keys pass.
- [ ] Search Results state (after Search): reveal `searchFileTransferConfigResultsPanel` + show `FileTransferShowInactiveCheckBox` + render grid `[kit:k4]`.
  Accept: kit state replay/verify shows Search Results like `kit/states/search.png`.
- [ ] View dialog state: double-click first grid row opens dialog `[kit:d2]` with read-only fields.
  Accept: kit state replay/verify shows dialog like `kit/states/dialog-d2.png`.
- [ ] Create New dialog state: `FileTransferGridAddButton` opens dialog `[kit:d1]`.
  Accept: kit state replay/verify shows dialog like `kit/states/dialog-d1.png`.

## 4. Validation — §6
- [ ] Search criteria validation: `ConfigId` numeric-only + max length 9; `ConfigName` alphanumeric; `OwnerName` invalid character regex.
  Accept: parity tests validate the same messages (or update spec once legacy behavior is captured).
- [ ] Dialog d1 required-field validation for the required dropdowns/fields (Protocol/Server/Owner Module/Time Window/…)
  Accept: parity tests for dialog validation messages pass.

## 5. Server interactions — §10
- [ ] Search request: GET `/api/FileTransfer/SearchFileTransfer/` returning data shaped for `[kit:k4]`.
  Accept: Search populates the grid and shows “1-10 of 97 Items” style paging info.
- [ ] Save behavior for dialog d1 is currently `[UNKNOWN]` (endpoints + success/error UX).
  Accept: once endpoint is known, parity tests cover the save flow.

## 6. Done
- [ ] `npm run verify -- fxfer-v3/file-transfer-configuration`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v3/screens/file-transfer-configuration/spec/parity.spec.ts`: all pass.
- [ ] Resolve or document every §13 open question as a known gap.
