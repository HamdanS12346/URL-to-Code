# TASKS — ffxfer-index-v1/file-transfer-tracking

Target: React 19 + TypeScript, plain CSS (no UI library). This Provider portal screen uses the Provider kit (`kits/provider`): do not reimplement dropdown/date/grid/dialog behavior.
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md` (dpr!).
Spec: `packs/ffxfer-index-v1/screens/file-transfer-tracking/spec/UI_SPEC.md` · tests: `packs/ffxfer-index-v1/screens/file-transfer-tracking/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- ffxfer-index-v1/file-transfer-tracking`: builds the static page in `packs/ffxfer-index-v1/screens/file-transfer-tracking/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/ffxfer-index-v1/screens/file-transfer-tracking/` (`npm run verify -- ffxfer-index-v1/file-transfer-tracking` reads them there).
- [ ] The route `#/ffxfer-index-v1/file-transfer-tracking` needs no registration: the root router discovers the screen’s `app/Page.tsx`.

## 1. Shell — §2, §3
- [ ] Confirm the shared shell wrapper is used (Provider kit), then implement only the content area `#pageBody > main` for this screen.
  Accept: `npm run verify -- ffxfer-index-v1/file-transfer-tracking` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Search Criteria card: header row + criteria fields grid + action row (Reset/Cancel/Search). Keys: `searchFileTrackingPanel`, `FileId`, `FileName`, `FromDate`, `ToDate`, `resetButton`, `cancelButton`, `nextButton`. Accept: verify band containing the card has `bad_pct < 5`.
- [ ] Search Results panel (after Search): section heading + grid. Keys: `fileTrackingResultsGrid` (kit `k9`). Accept: parity tests for Search state pass.

## 3. Components & states — §5, §7, §8
- [ ] Wire `resultsVisible` so Search reveals the Search Results section (even if empty). Evidence: §7 (`resultsVisible`). Accept: parity test state that includes results passes.
- [ ] Hook Reset to clear all criteria fields. Accept: parity tests pass.
- [ ] Preserve kit widgets for: File Status/Direction/Transport Type/Source Location dropdowns (`k1–k4`), From/To Date (`k5–k6`), From/To Size (`k7–k8`), results grid (`k9`). Accept: kit state screenshots replay and match.

## 4. Validation — §6
- [ ] Implement client-side validation messages for invalid characters / date parsing / numeric parsing exactly as listed in §6.
  Accept: parity tests covering invalid inputs pass.

## 5. Server interactions — §10
- [ ] Implement the Search request contract: GET `/api/FileTransfer/SearchFileTransferTracking/` with query params derived from criteria.
  Accept: Search renders the same grid empty state (“No items to display”) when the mock returns no rows.

## 6. Done
- [ ] `npm run verify -- ffxfer-index-v1/file-transfer-tracking`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/ffxfer-index-v1/screens/file-transfer-tracking/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
