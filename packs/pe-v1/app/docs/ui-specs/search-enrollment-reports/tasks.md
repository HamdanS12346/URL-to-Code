# TASKS — pe-v1/search-enrollment-reports

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/pe-v1/screens/search-enrollment-reports/spec/UI_SPEC.md · tests: packs/pe-v1/screens/search-enrollment-reports/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- pe-v1/search-enrollment-reports`: builds the static page in `packs/pe-v1/screens/search-enrollment-reports/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/pe-v1/screens/search-enrollment-reports/` (`npm run verify -- pe-v1/search-enrollment-reports` reads them there).
- [ ] The route `#/pe-v1/search-enrollment-reports` needs no registration: the root router finds `packs/*/screens/*/app/Page.tsx`.

## 1. Shell — §2, §3
- [ ] Use the shared shell (home screen) wrapper; ensure content area layout matches §2 and tokens from §3.
  Accept: `npm run verify -- pe-v1/search-enrollment-reports` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Search criteria panel card: header strip + body spacing, required marker, collapse chevron; fields row + button row. Accept: verify band for the panel has `bad_pct` < 5.
- [ ] Search results panel (post-search): card container + `Search Results` header + grid placement. Accept: verify/state diff for `kit/states/search.png` is acceptable, and parity probes that reveal the grid pass.

## 3. Components & states — §5, §7, §8
- [ ] Criteria form behaviors: defaults, `Clear`, `Search`, criteria panel collapse toggle. Keys: `FromDate`, `ToDate`, `UserId`, `clearButton`, `searchButton`, `searchCriteriaPanelIcon`. Accept: parity tests for these interactions pass.
- [ ] Results state: hidden at load; visible after valid Search; grid column labels match (`File Name`, `Date Requested`). Accept: parity tests pass.

## 4. Validation — §6
- [ ] Required/date-format messages for `From Date` and `To Date`, user id invalid character rule, and cross-field rule `From Date cannot be greater than To Date`. Accept: parity tests pass.

## 5. Server interactions — §10
- [ ] Implement/attach services for `POST /api/ProviderEnrollment/SearchEnrollmentReports/` grid reads and `GET /api/ProviderEnrollment/GetFile/` downloads (as used by the kit services layer). Accept: Search populates the grid or shows empty-state identically.

## 6. Done
- [ ] `npm run verify -- pe-v1/search-enrollment-reports`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/pe-v1/screens/search-enrollment-reports/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
