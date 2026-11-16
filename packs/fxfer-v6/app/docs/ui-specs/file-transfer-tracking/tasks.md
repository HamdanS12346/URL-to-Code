# TASKS ? fxfer-v6/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the Build phase rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v6/screens/file-transfer-tracking/spec/UI_SPEC.md ? tests: packs/fxfer-v6/screens/file-transfer-tracking/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v6/file-transfer-tracking`: builds the static page in `packs/fxfer-v6/screens/file-transfer-tracking/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v6/screens/file-transfer-tracking/` (`npm run verify -- fxfer-v6/file-transfer-tracking` reads them there).

## 1. Shell ? UI_SPEC ?2
- [ ] Use the shared shell (see home spec); do not re-implement shell behavior in this screen.

## 2. Regions ? UI_SPEC ?2 (top to bottom)
- [ ] Content area (`#pageBody > main`): panel container sizing + spacing. Accept: `npm run verify -- fxfer-v6/file-transfer-tracking` ? `size_delta_px` within ?2.
- [ ] Search Criteria panel: header, collapse chevron, field grid, action buttons. Accept: verify band containing Search Criteria has `bad_pct` < 5.
- [ ] Search Results panel (after Search): header + kit grid `k9`. Accept: state replay for `kit/states/search.png` matches (verify `states: N/M`).

## 3. Components & states ? UI_SPEC ?5, ?7, ?8
- [ ] Wire Search button (`nextButton`) to show results state + grid `k9` (criteria optional). Accept: parity tests for Search behavior pass. [ctl:nextButton, kit:k9]
- [ ] Wire row dblclick to open dialog `d1`. Accept: parity tests for dialog open/close pass. [kit:d1, kit:k9]

## 4. Validation ? UI_SPEC ?6
- [ ] Apply field constraints (maxlength, disallowed characters, numeric/date formats) as in ?6. Accept: parity validations pass (if covered).

## 5. Server interactions ? UI_SPEC ?10
- [ ] Implement API stubs or wiring for Search (GET `/api/FileTransfer/SearchFileTransferTracking/`) and row details (POST `/FileTransfer/FileTransferTrackingView/`). Accept: UI reacts the same way as the kit states.

## 6. Done
- [ ] `npm run verify -- fxfer-v6/file-transfer-tracking`: size_delta ?2; bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v6/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Every UI_SPEC ?13 open question answered, or listed as known gaps.
