# TASKS — claims-mgmt-v1/home

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/claims-mgmt-v1/screens/home/spec/UI_SPEC.md · tests: packs/claims-mgmt-v1/screens/home/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- claims-mgmt-v1/home`: builds the static page in `packs/claims-mgmt-v1/screens/home/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/claims-mgmt-v1/screens/home/` (`npm run verify -- claims-mgmt-v1/home` reads them there).

## 1. Shell — UI_SPEC §2–§3
- [ ] Implement `PortalHeader` and fixed positioning, base font stack, and core CSS variables.
  Accept: `npm run verify -- claims-mgmt-v1/home` → `size_delta_px` within ±2.

## 2. Regions — UI_SPEC §2 (top to bottom)
- [ ] Header: logo + title/subtitle + global links + hamburger. Keys: `pageBannerLogo`, `button-medicaid-management-solutions`, `link-messages`, `link-external-links`, `link-favorites`, `link-contact-us`, `link-logout`, `button-main-menu-2`.
  Accept: header band diff < 5%.
- [ ] Hero: left image (`assets/Content/dxc.ua3.core.home.myhome.png`) + right title/subtitle.
  Accept: hero band diff < 5%.
- [ ] Footer: subfooter link bar + copyright/build text. Keys: `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`.
  Accept: footer band diff < 5%.

## 3. Components & states — UI_SPEC §5, §7, §8
- [ ] Side menu open/close and hover flyouts matching kit behavior (open on hamburger; closes only via X/link; hover delay 100ms).
  Accept: parity/menu checks pass.
- [ ] Client logo tooltip: text "Client Logo" appears on hover after 100ms.
  Accept: parity/menu checks pass.

## 4. Done
- [ ] `npm run verify -- claims-mgmt-v1/home`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/claims-mgmt-v1/screens/home/spec/parity.spec.ts`: all pass.
