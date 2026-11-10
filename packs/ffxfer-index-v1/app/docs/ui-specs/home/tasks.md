# TASKS ? ffxfer-index-v1/home

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: packs/ffxfer-index-v1/screens/home/spec/UI_SPEC.md ? tests: packs/ffxfer-index-v1/screens/home/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- ffxfer-index-v1/home`: builds the static page in `packs/ffxfer-index-v1/screens/home/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/ffxfer-index-v1/screens/home/` (`npm run verify -- ffxfer-index-v1/home` reads them there).
- [ ] The route `#/ffxfer-index-v1/home` needs no registration: the root router finds `packs/ffxfer-index-v1/screens/home/app/Page.tsx`.

## 1. Shell ? ?2, ?3
- [ ] Implement `ProviderShell` shared layout: fixed header (`#pageHeader`), help row (`#mcbRowBorder`), footer. Accept: `npm run verify -- ffxfer-index-v1/home` ? `size_delta_px` within ?2.

## 2. Regions ? ?2 (top to bottom)
- [ ] Header: logo, title, utility menubar, hamburger button. Keys: `pageBannerLogo`, `link-client-logo`, `button`, `button-medicaid-management-solutions`, `button-2`, `button-en`, `link-en`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-help`. Accept: parity tests for header keys pass.
- [ ] Help row: help icon `button-help` positioned near the right edge. Accept: verify band 01 bad_pct < 5.
- [ ] Home hero: `.myHome_img` cover background + `.myHome_copy` right-aligned copy. Accept: verify band 01 bad_pct < 5.
- [ ] Footer: subfooter link bar + build info row. Keys: `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`. Accept: verify band 02 bad_pct < 5.

## 3. Components & states ? ?5, ?7, ?8
- [ ] Hamburger side navigation: open/close, right-side panel, hover flyouts, module tree from `menu.json`. Accept: parity checks for `button-main-menu-2` pass and UI matches menu hover screenshots.
- [ ] At-a-glance panels: External Links panel (static list) + placeholders for Messages/Favorites/Contact Us (render container + close). Accept: parity keys for `link-messages`, `link-external-links`, `link-favorites`, `link-contact-us` pass.
- [ ] Help icon: wire to stub behavior until help content is known. Accept: parity key `button-help` exists.

## 4. Validation ? ?6
- [ ] None (no validated inputs on this page). Accept: `npm run check -- ffxfer-index-v1/home` remains OK.

## 5. Server interactions ? ?10
- [ ] None observed; keep all dynamic panel content behind stubs/mocks until APIs are defined. Accept: app runs without console errors.

## 6. Done
- [ ] `npm run verify -- ffxfer-index-v1/home`: size_delta ?2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/ffxfer-index-v1/screens/home/spec/parity.spec.ts`: all pass.
- [ ] Every ?13 open question answered, or listed as known gaps.
