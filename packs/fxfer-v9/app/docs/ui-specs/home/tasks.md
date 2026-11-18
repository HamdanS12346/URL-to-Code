# TASKS — fxfer-v9/home

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the Build phase rules in AGENTS.md (dpr!).
Spec: packs/fxfer-v9/screens/home/spec/UI_SPEC.md · tests: packs/fxfer-v9/screens/home/spec/parity.spec.ts

## 0. Setup
- [ ] npm run port -- fxfer-v9/home: builds the static page in packs/fxfer-v9/screens/home/app/ (assets copied to app/assets/, every key as data-testid) and writes app/BEHAVIOR.md.
- [ ] reference.png and manifest.json stay in packs/fxfer-v9/screens/home/ (npm run verify -- fxfer-v9/home reads them there).
- [ ] The route #/fxfer-v9/home needs no registration: the root router discovers screens automatically.

## 1. Shell — §2, §3
- [ ] Fixed header layout + colors + fonts + header utility menu styling.
  Accept: npm run verify -- fxfer-v9/home → size_delta_px within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Header + hamburger + (menu-open state): pageBannerLogo, button, button-medicaid-management-solutions, button-2, button-en, link-en, link-messages, link-external-links, link-favorites, link-contact-us, AAGMenu.MyAccount, AAGMenu.Logout, link-logout, button-main-menu-2. Accept: verify header band bad_pct < 5.
- [ ] Row border + help icon: button-help. Accept: verify band bad_pct < 5.
- [ ] Home hero (image + copy). Accept: verify worst band is not the hero.
- [ ] Footer link bar + build info. Accept: verify footer band bad_pct < 5.

## 3. Components & states — §5, §7, §8
- [ ] Side menu overlay states + flyout visuals; menu tree populated from menu.json.
  Accept: parity tests for shell/menu interactions pass; verify states: N/M for menu-open and menu-flyout.

## 4. Validation — §6
- [ ] None.

## 5. Server interactions — §10
- [ ] Stub modal overlay endpoints for footer links (Disclaimer / Website Requirements / Privacy Policy / Cookie Policy) so interactions can be exercised without legacy backend.
  Accept: parity tests that click the footer links produce an overlay (content may remain placeholder per §13 open questions).

## 6. Done
- [ ] npm run verify -- fxfer-v9/home: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] TARGET=react URL=<url> npx playwright test packs/fxfer-v9/screens/home/spec/parity.spec.ts: all pass.
- [ ] §13 open questions answered or explicitly listed as known gaps.
