# TASKS ? fxfer-v3/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the ?Build phase? rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v3/screens/file-transfer-tracking/spec/UI_SPEC.md ? tests: packs/fxfer-v3/screens/file-transfer-tracking/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v3/file-transfer-tracking`: builds the static page in `packs/fxfer-v3/screens/file-transfer-tracking/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v3/screens/file-transfer-tracking/` (`npm run verify -- fxfer-v3/file-transfer-tracking` reads them there).
- [ ] Route `#/fxfer-v3/file-transfer-tracking` needs no registration: the root router discovers `packs/fxfer-v3/screens/file-transfer-tracking/app/Page.tsx`.

## 1. Shell ? ?2, ?3
- [ ] Keep the shared shell wrapper (Provider kit). Accept: `npm run verify -- fxfer-v3/file-transfer-tracking` ? `size_delta_px` within ?2.

## 2. Regions ? ?2 (top to bottom, one task each)
- [ ] Search Criteria panel: panel container, header, fields layout, action button row [`main`, `searchFileTrackingPanel`, `modelEditorButtonRow`]. Accept: verify band for `sections/02-pagebody.png` has `bad_pct` < 5.
- [ ] Search Results panel (hidden at load): layout and styling of the ?Search Results? panel + grid container. Accept: state screenshot `kit/states/search.png` matches in `verify` states replay.

## 3. Components & states ? ?5, ?7, ?8
- [ ] Wire `criteria_collapsed` toggle on `button-collapse`. Accept: parity actions related to collapse (if present) pass.
- [ ] Wire Search to reveal results + call the search service, then load rows into the grid widget `k9`. Accept: kit states replay shows Search Results panel visible and grid present.

## 4. Validation ? ?6
- [ ] Implement MVC validation messages for `FileId`, `FileName`, `TradingPartnerId`, `FromDate`, `ToDate`, `FromSize`, `ToSize`. Accept: parity tests for validation pass.

## 5. Server interactions ? ?10
- [ ] Implement GET `/api/FileTransfer/SearchFileTransferTracking/` mapping once the request contract is known. Accept: grid rows match expected column formatting (Size (KB) n2, Create Date g). [kit:k9]

## 6. Done
- [ ] `npm run verify -- fxfer-v3/file-transfer-tracking`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v3/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
