# TASKS ? fxfer-v8/home

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the ?Build phase? rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v8/screens/home/spec/UI_SPEC.md ? tests: packs/fxfer-v8/screens/home/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v8/home`: builds the static page in `packs/fxfer-v8/screens/home/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v8/screens/home/` (`npm run verify -- fxfer-v8/home` reads them there).

## 1. Shell ? UI_SPEC ?2, ?3, ?5
- [ ] HeaderBar: fixed header bg, accent border, logo placement, title text, desktop header links, mobile header layout (<1280). Keys: pageBannerLogo, button-medicaid-management-solutions, link-*, button-main-menu-2.
  Accept: `npm run verify -- fxfer-v8/home` ? `size_delta_px` within ?2.

## 2. Side menu ? UI_SPEC ?8.2, ?9
- [ ] SideMenu open/close + hovered module flyout visuals (use `menu.json` + the `menu/*.png` references). Keys: button-main-menu-2.
  Accept: parity tests for menu open/close triggers pass; visuals match menu reference screenshots for at least one hovered module.

## 3. Home hero ? UI_SPEC ?2.2, ?4
- [ ] HomeHero: hero background image (assets/Content/dxc.ua3.core.home.myhome.png) + heading/subtitle placement.
  Accept: verify band `sections/01-mcbrowborder.png` is visually close (bad_pct < 5 for that band).

## 4. Footer ? UI_SPEC ?2.3
- [ ] Footer: subfooter link bar + copyright/build line layout.
  Accept: verify band `sections/02-disclaimer-the-website-is-prov.png` is visually close (bad_pct < 5 for that band).

## 5. Done
- [ ] `npm run verify -- fxfer-v8/home`: size_delta ?2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v8/screens/home/spec/parity.spec.ts`: all pass.
- [ ] Open questions in UI_SPEC ?13 are either answered by new captures or tracked as known gaps.
