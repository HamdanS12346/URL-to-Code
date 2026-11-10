# TASKS — fxfer-v3/home

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v3/screens/home/spec/UI_SPEC.md · tests: packs/fxfer-v3/screens/home/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v3/home`: builds the static page in `packs/fxfer-v3/screens/home/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v3/screens/home/` (`npm run verify -- fxfer-v3/home` reads them there).

## 1. Shell — §2, §3
- [ ] Header + footer layout, fonts, colors, and CSS variables from §3.
  Accept: `npm run verify -- fxfer-v3/home` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom, one task each)
- [ ] Header: logo, title, top nav links, hamburger placement. [keys: pageHeader, pageBannerLogo, link-*].
  Accept: verify band `bad_pct` < 5 for the header/first band.
- [ ] Hero band + Help icon placement. [keys: mcbRowBorder, button-help].
  Accept: verify band `bad_pct` < 5 for `sections/01-*`.
- [ ] Hero image + right-aligned text. [keys: img-stethoscope-and-tablet-laying-on].
  Accept: verify band `bad_pct` < 5 for `sections/01-*`.
- [ ] Footer: subfooter links + bottom copyright/build row. [keys: button-disclaimer, footerCopyright, footerBuild].
  Accept: verify band `bad_pct` < 5 for `sections/02-*`.

## 3. Components & states — §5, §7, §8
- [ ] Side menu: open/close overlay and module flyouts (kit-managed) + routing only for File Transfer Services items. [keys: button-main-menu-2].
  Accept: parity tests for side menu routing pass.

## 4. Validation — §6
- [ ] None.

## 5. Server interactions — §10
- [ ] None.

## 6. Done
- [ ] `npm run verify -- fxfer-v3/home`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v3/screens/home/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
