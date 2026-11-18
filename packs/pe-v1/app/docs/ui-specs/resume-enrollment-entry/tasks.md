# TASKS — pe-v1/resume-enrollment-entry

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/pe-v1/screens/resume-enrollment-entry/spec/UI_SPEC.md · tests: packs/pe-v1/screens/resume-enrollment-entry/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- pe-v1/resume-enrollment-entry`: builds the static page in `packs/pe-v1/screens/resume-enrollment-entry/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/pe-v1/screens/resume-enrollment-entry/` (`npm run verify -- pe-v1/resume-enrollment-entry` reads them there).

## 1. Shell — §2, §3
- [ ] No screen-specific shell work (wrapped in the shared shell). Accept: `npm run verify -- pe-v1/resume-enrollment-entry` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Resume Enrollment panel container + header styling (`.content-panel-container`, `.content-panel-hdr`).
  Accept: verify band for `sections/02-pagebody.png` has `bad_pct` < 5.
- [ ] Footer band (subfooter links row).
  Accept: verify band for `sections/03-disclaimer-the-website-is-prov.png` has `bad_pct` < 5.

## 3. Components & states — §5, §7, §8
- [ ] Fields: `TrackingNumber`, `Password` with required markers + help icons. Accept: parity assertions referencing these keys pass.
- [ ] Password visibility: `PasswordVisibilityToggle` toggles input `type` and icon class. Accept: parity tests for toggle behavior pass.
- [ ] Actions: `cancelButton` navigates to `/Home/MyHome/`; `nextButton` triggers the Resume flow. Accept: parity tests for actions pass.
- [ ] Footer overlays: Disclaimer/Website Requirements/Privacy/Cookie open modal overlays. Accept: parity tests for footer overlay open pass.

## 4. Validation — §6
- [ ] `TrackingNumber` required + numeric-only + max length 10; `Password` required + max length 20. Accept: parity tests for validation messages pass.

## 5. Server interactions — §10
- [ ] Stub `POST /api/ProviderEnrollment/Resume/` and navigation to the next step (post to `/ProviderEnrollment/CreateSecureEnrollment/`).
  Accept: parity tests expecting Resume API call pass.

## 6. Done
- [ ] `npm run verify -- pe-v1/resume-enrollment-entry`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/pe-v1/screens/resume-enrollment-entry/spec/parity.spec.ts`: all pass.
