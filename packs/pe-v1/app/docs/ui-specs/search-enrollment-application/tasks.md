# TASKS — pe-v1/search-enrollment-application

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/pe-v1/screens/search-enrollment-application/spec/UI_SPEC.md · tests: packs/pe-v1/screens/search-enrollment-application/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- pe-v1/search-enrollment-application`: builds the static page in `packs/pe-v1/screens/search-enrollment-application/app/` (assets copied, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/pe-v1/screens/search-enrollment-application/` (`npm run verify -- pe-v1/search-enrollment-application` reads them there).

## 1. Shell — §2, §3
- [ ] Use the shared shell (home spec) and ensure the content area renders inside `#pageBody > main`.
  Accept: `npm run verify -- pe-v1/search-enrollment-application` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom, one task each)
- [ ] Module title bar region crop alignment (`sections/01-search-enrollment-application.png`). Accept: verify top band drift is minimized.
- [ ] Content panel container + header (`Search Enrollment Application`) and criteria grid layout. Accept: verify band for `sections/02-pagebody.png` has `bad_pct` < 5.
- [ ] Footer band (`sections/03-disclaimer-the-website-is-prov.png`) is provided by the shared shell. Accept: verify footer band `bad_pct` < 5.

## 3. Components & states — §5, §7, §8
- [ ] Criteria form fields + help icons; kit widgets `[kit:k1]`…`[kit:k6]` visible and functional. Accept: parity tests for criteria controls pass.
- [ ] Tax ID selection shows EIN/SSN masked fields as specified (or implement per kit capabilities). Accept: parity tests for Tax ID visibility pass.
- [ ] Search button invalid-empty-search state shows the validation summary banner text. Accept: `kit/states/search.png` parity passes.
- [ ] Results grid behavior remains a known gap until a results capture is available. Accept: tracked as open question §13.1.

## 4. Validation — §6
- [ ] Field validation messages match the legacy strings in §6. Accept: parity tests for invalid inputs pass.

## 5. Server interactions — §10
- [ ] No API calls required for empty-search validation (per capture). Accept: no network dependency for this state.

## 6. Done
- [ ] `npm run verify -- pe-v1/search-enrollment-application`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/pe-v1/screens/search-enrollment-application/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
