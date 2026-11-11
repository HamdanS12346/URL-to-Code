# TASKS ? claims-mgmt-v1/pro-dur

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/claims-mgmt-v1/screens/pro-dur/spec/UI_SPEC.md ? tests: packs/claims-mgmt-v1/screens/pro-dur/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- claims-mgmt-v1/pro-dur`: builds the static page in `packs/claims-mgmt-v1/screens/pro-dur/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`. Everything for this screen lives in `packs/claims-mgmt-v1/screens/pro-dur/`.
- [ ] `reference.png` and `manifest.json` stay in `packs/claims-mgmt-v1/screens/pro-dur/` (`npm run verify -- claims-mgmt-v1/pro-dur` reads them there).
- [ ] The route `#/claims-mgmt-v1/pro-dur` needs no registration: the root router finds `packs/*/screens/*/app/Page.tsx`.

## 1. Shell ? ?2, ?3
- [ ] Keep the screen wrapped in the shared shell (home spec); do not rebuild shell specifics here beyond keeping the ported markup intact.
  Accept: `npm run verify -- claims-mgmt-v1/pro-dur` ? `size_delta_px` within ?2.

## 2. Regions ? ?2 (top to bottom, one task each)
- [ ] Content area layout: top-row panels (Actions / Bookmarks / Glossary) and overall spacing.
  Accept: verify top band (around `sections/02-produrdashboard.png`) `bad_pct` < 5.
- [ ] Feature tile grid: bordered tiles and labels, matching `reference.png` tile layout.
  Accept: verify mid-page bands `bad_pct` < 5 for the first drifting band.
- [ ] Footer (shared shell footer in capture): keep ported footer layout and text.
  Accept: verify footer band (around `sections/03-disclaimer-the-website-is-prov.png`) `bad_pct` < 5.

## 3. Components & states ? ?5, ?7, ?8
- [ ] `DashboardPanels`: ensure keys `link-actions`, `link-create-new*`, `link-search-*`, `link-bookmarks`, `link-glossary` render with the same typography/underline and are clickable anchors.
  Accept: parity tests referencing these keys pass.
- [ ] `FeatureTileGrid`: ensure tile labels and the one captured clickable tile key `OverusePrecautionPanel` exist and match layout.
  Accept: parity tests referencing `OverusePrecautionPanel` pass.
- [ ] Help button: render `button-help` in the same position/styling.
  Accept: parity tests referencing `button-help` pass.

## 4. Validation ? ?6
- [ ] None.

## 5. Server interactions ? ?10
- [ ] None.

## 6. Done
- [ ] `npm run verify -- claims-mgmt-v1/pro-dur`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/claims-mgmt-v1/screens/pro-dur/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
