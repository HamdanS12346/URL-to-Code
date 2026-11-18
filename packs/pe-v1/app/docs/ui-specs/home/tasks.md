# TASKS — pe-v1/home

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/pe-v1/screens/home/spec/UI_SPEC.md · tests: packs/pe-v1/screens/home/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- pe-v1/home`: builds the static page in `packs/pe-v1/screens/home/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/pe-v1/screens/home/` (`npm run verify -- pe-v1/home` reads them there).

## 1. Shell — §2, §3, §5
- [ ] Header + footer look/spacing + base tokens (fonts/colors). Keys: pageBannerLogo, button-main-menu-2, button-disclaimer, button-cookie-policy.
  Accept: `npm run verify -- pe-v1/home` → `size_delta_px` within ±2.
- [ ] Side menu open/close + flyouts (kit shell). Keys: button-main-menu-2, mainMenuClose.
  Accept: parity shell/menu checks in `packs/pe-v1/screens/home/spec/parity.spec.ts` pass.

## 2. Regions — §2
- [ ] Home hero band (image left + heading right). Accept: verify band for `sections/01-mcbrowborder.png` has `bad_pct` < 5.
- [ ] Footer band. Accept: verify band for `sections/02-disclaimer-the-website-is-prov.png` has `bad_pct` < 5.

## 3. Navigation wiring — §9
- [ ] Provider Enrollment menu items route to captured screens (mapping in §5.1). Accept: clicking Dashboard/Search/Workflow items navigates to the correct screen route (where implemented).
- [ ] Non-Provider-Enrollment menu items remain no-op. Accept: click does not navigate (URL unchanged), but hover flyout still appears.

## 4. Done
- [ ] `npm run verify -- pe-v1/home`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/pe-v1/screens/home/spec/parity.spec.ts`: all pass.

