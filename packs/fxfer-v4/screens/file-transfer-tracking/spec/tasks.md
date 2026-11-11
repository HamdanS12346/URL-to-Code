# TASKS — fxfer-v4/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library).
This screen uses the Provider kit (Kendo UI for jQuery portal). Use `<KitScreen>` + `<KitWidget id=...>`; do not implement dropdowns/date pickers/grids manually. Spec: `packs/fxfer-v4/screens/file-transfer-tracking/spec/UI_SPEC.md` · tests: `packs/fxfer-v4/screens/file-transfer-tracking/spec/parity.spec.ts`

## 0. Setup
- [ ] Run `npm run port -- fxfer-v4/file-transfer-tracking` to generate the initial rebuild scaffold and stamp every `data-testid`.
- [ ] Confirm `packs/fxfer-v4/screens/file-transfer-tracking/manifest.json` has `dpr` and CSS viewport values.
- [ ] Verify shell comes from the shared kit shell; only implement the captured content area behavior.

## 1. Shell — §2, §3
- [ ] Ensure the screen is wrapped by the shared Provider shell (header/menu/title/footer) without screen-specific edits.
  Accept: `npm run verify -- fxfer-v4/file-transfer-tracking` → `size_delta_px` within ±2.

## 2. Regions — §2
- [ ] Search Criteria panel: render the panel container, header, and the form grid layout with correct spacing/typography. Keys: `button-collapse`, `resetButton`, `cancelButton`, `nextButton`.
  Accept: `npm run verify -- fxfer-v4/file-transfer-tracking` → band `band-02-pagebody` bad_pct < 5.
- [ ] Search Results panel (after Search): ensure the kit grid `k9` renders with the same columns and empty state.
  Accept: kit state compare includes `search` and matches.

## 3. Components & states — §5, §7, §8
- [ ] Criteria fields: hook up kit widgets `k1`–`k8` to the matching elements/keys (dropdowns, date-time pickers, numeric boxes) and keep defaults (optionLabel “select a value...”).
  Accept: parity selectors find all required keys.
- [ ] Search action: clicking `nextButton` shows Search Results panel and triggers the screen service request.
  Accept: `search` kit state matches and parity tests pass.
- [ ] Reset action: clicking `resetButton` clears criteria back to defaults.
  Accept: parity tests pass.

## 4. Validation — §6
- [ ] Enforce validation messages exactly for invalid characters (File ID / File Name / Trading Partner ID) and date/number formatting for the date-time and numeric fields.
  Accept: parity tests pass (and messages match verbatim).

## 5. Server interactions — §10
- [ ] Implement service call for GET `/api/FileTransfer/SearchFileTransferTracking/` (criteria params: [UNKNOWN] in spec) and map response to grid rows.
  Accept: Search Results grid populates and empty state matches when no rows.

## 6. Done
- [ ] `npm run verify -- fxfer-v4/file-transfer-tracking`: `size_delta_px` ±2 and `bad_pct` < 5 (report numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v4/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Address or document remaining §13 open questions.
