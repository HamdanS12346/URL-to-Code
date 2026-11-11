# TASKS — fxfer-v4/file-transfer-configuration

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v4/screens/file-transfer-configuration/spec/UI_SPEC.md · tests: packs/fxfer-v4/screens/file-transfer-configuration/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v4/file-transfer-configuration`: generates `packs/fxfer-v4/screens/file-transfer-configuration/app/` (assets to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] Confirm `packs/fxfer-v4/screens/file-transfer-configuration/manifest.json` has `dpr` and `css_viewport_width` (dpr = 1 here).

## 1. Shell — §2
- [ ] Ensure the screen renders inside the shared Provider shell (kit `SharedShell`).
  Accept: `npm run verify -- fxfer-v4/file-transfer-configuration` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Page content root (`pageBody` + `FileTransferSearchForm`) matches reference. Accept: verify earliest band drift is near 0.
- [ ] Search Criteria panel: title “Search Criteria”, required legend, fields, and buttons (`resetButton`, `cancelButton`, `nextButton`). Accept: verify band `02-pagebody` `bad_pct < 5`.
- [ ] Search Results panel (`searchFileTransferConfigResultsPanel`): hidden at load; after Search it shows the grid + “Show Inactives”. Accept: parity (kit state `search.png`) passes.

## 3. Components & states — §5, §7, §8
- [ ] Wire the Search action to reveal results panel `h7` and populate grid `k4`. Accept: parity tests around `nextButton` and `k4` pass.
- [ ] Create New opens dialog `d1`. Accept: parity state `dialog-d1.png` passes.
- [ ] Results row double-click opens dialog `d2`. Accept: parity state `dialog-d2.png` passes.

## 4. Validation — §6
- [ ] Enforce required fields and regex validations as captured (kit handles). Accept: parity asserts match the kit’s validation messages.
- [ ] Known gap: maskedtextbox behavior is not rebuilt by kit. Accept: looks correct visually; behavior documented as `[UNKNOWN]` in spec.

## 5. Server interactions — §10
- [ ] Stub endpoints for search + dialog open/save in kit services (URLs in §10). Accept: Search results populate and dialogs open with synthetic data.

## 6. Done
- [ ] `npm run verify -- fxfer-v4/file-transfer-configuration`: `size_delta_px` within ±2 and `bad_pct < 5`.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v4/screens/file-transfer-configuration/spec/parity.spec.ts`: all pass.
- [ ] Open questions (§13) either answered or explicitly carried as known gaps.
