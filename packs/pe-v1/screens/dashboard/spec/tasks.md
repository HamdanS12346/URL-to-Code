# TASKS ? pe-v1/dashboard

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/pe-v1/screens/dashboard/spec/UI_SPEC.md ? tests: packs/pe-v1/screens/dashboard/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- pe-v1/dashboard`: builds the static page in the pack app and stamps every key as `data-testid`.
- [ ] `packs/pe-v1/screens/dashboard/reference.png` and `packs/pe-v1/screens/dashboard/manifest.json` stay in place (`npm run verify -- pe-v1/dashboard` reads them there).

## 1. Shell ? ?2, ?3
- [ ] Confirm the content is wrapped in the shared shell (home spec) and that the `#pageBody > main` viewport matches 1905?1080 CSS px @ dpr 1.
  Accept: `npm run verify -- pe-v1/dashboard` ? `size_delta_px` within ?2.

## 2. Regions ? ?2 (top to bottom)
- [ ] Top controls: help icon (`button-help`) and preferences icon (`settingPreferencesButton`).
  Accept: `npm run verify -- pe-v1/dashboard` improves top band match.
- [ ] Tiles grid: 9 tiles (`link-*`) with 2px green borders and centered text.
  Accept: verify band `band-01-mcbrowborder` `bad_pct` < 5.
- [ ] Right sidebar: Status panel + Quick Search panel.
  Accept: verify band `band-01-mcbrowborder` `bad_pct` < 5.
- [ ] Search Results panel: header + grid (`providerEnrollmentResultsGrid`) empty state.
  Accept: verify band `band-01-mcbrowborder` `bad_pct` < 5.

## 3. Components & states ? ?5, ?7, ?8
- [ ] Quick Search behaviors: Clear clears fields; Search with empty criteria shows the error banner from `kit/states/search.png`.
  Accept: parity tests for `clearButton` / `searchButton` pass.
- [ ] Search Results grid widget: columns + pager + Refresh (`link-refresh`).
  Accept: parity tests referencing `providerEnrollmentResultsGrid` pass.

## 4. Validation ? ?6
- [ ] Field constraints/messages for ATN, Last Name, Business Name, NPI match the kit harvest.
  Accept: parity tests pass.

## 5. Server interactions ? ?10
- [ ] Wire Search and Refresh to the kit service stub(s) used by the pack.
  Accept: the UI updates without console errors; parity tests pass where applicable.

## 6. Done
- [ ] `npm run verify -- pe-v1/dashboard`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/pe-v1/screens/dashboard/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
