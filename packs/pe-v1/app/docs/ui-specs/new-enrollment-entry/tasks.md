# TASKS — pe-v1/new-enrollment-entry

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md` (dpr!).
Spec: `packs/pe-v1/screens/new-enrollment-entry/spec/UI_SPEC.md` · tests: `packs/pe-v1/screens/new-enrollment-entry/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- pe-v1/new-enrollment-entry`: builds the static page in `packs/pe-v1/screens/new-enrollment-entry/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/pe-v1/screens/new-enrollment-entry/` (`npm run verify -- pe-v1/new-enrollment-entry` reads them there).
- [ ] The route `#/pe-v1/new-enrollment-entry` needs no registration: the root router finds `packs/*/screens/*/app/Page.tsx`.

## 1. Shell — §2, §3
- [ ] Confirm the page renders inside the shared shell; only the content area is screen-specific.
  Accept: `npm run verify -- pe-v1/new-enrollment-entry` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Registration panel container + header row (“Registration”), including required legend (“Required Fields ( * )”).
  Accept: verify band `sections/02-pagebody.png` `bad_pct` < 5.
- [ ] Fields grid (Email/Confirm Email, Password/Confirm Password, Provider Reference full width).
  Accept: verify band `sections/02-pagebody.png` `bad_pct` < 5.
- [ ] Change ownership radio group + action buttons (`prevButton`, `nextButton`) aligned at bottom-right.
  Accept: verify band `sections/02-pagebody.png` `bad_pct` < 5.

## 3. Components & states — §5, §7, §8
- [ ] Wire up controlled values for the registration fields and radio group.
  Accept: parity tests for the listed `data-testid` elements pass.
- [ ] Render required-marker + help tooltip icons with the captured `title` text (§6.2).
  Accept: parity tests pass and `npm run verify -- pe-v1/new-enrollment-entry` stays under thresholds.

## 4. Validation — §6
- [ ] Enforce required + regex rules for Email/Confirm Email/Password/Confirm Password (messages verbatim).
  Accept: parity tests pass (and/or update once the capture’s parity expectations are known).

## 5. Server interactions — §10
- [ ] Implement stubbed submission behavior for `nextButton` (Register) and `prevButton` (Previous) only after open questions are resolved.
  Accept: parity tests remain green.

## 6. Done
- [ ] `npm run verify -- pe-v1/new-enrollment-entry`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/pe-v1/screens/new-enrollment-entry/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
