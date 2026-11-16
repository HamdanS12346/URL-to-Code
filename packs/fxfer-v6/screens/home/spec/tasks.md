# TASKS — fxfer-v6/home

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v6/screens/home/spec/UI_SPEC.md` - tests: `packs/fxfer-v6/screens/home/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v6/home`: builds the static page in `packs/fxfer-v6/screens/home/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v6/screens/home/` (`npm run verify -- fxfer-v6/home` reads them there).
- [ ] The route `#/fxfer-v6/home` needs no registration: the root router finds `packs/fxfer-v6/screens/home/app/Page.tsx`.

## 1. Shell - S2, S3, S5, S8
- [ ] Header: logo + title + quick links row + hamburger / close icon. Keys include `pageHeader`, `pageBannerMenu`, `button-main-menu-2`, `mainMenuClose`.
  Accept: `npm run verify -- fxfer-v6/home` -> `size_delta_px` within +-2.
- [ ] Side menu: open/close + backdrop + module list + flyout submenus; render using `menu.json` structure.
  Accept: parity test ids present; menu visual matches `menu-open` and `menu/*` screenshots.

## 2. Regions - S2 (top to bottom)
- [ ] Hero banner: background image + heading/tagline text; match `sections/01-mcbrowborder.png`.
  Accept: verify band drift for the hero is minimal (`bad_pct` < 5 for its band).
- [ ] Footer: subfooter policy links + build info row; match `sections/02-disclaimer-the-website-is-prov.png`.
  Accept: verify footer band `bad_pct` < 5.

## 3. Navigation behavior - S9
- [ ] Side menu items under "File Transfer Services" navigate to internal routes:
  - `File Transfer Configuration` -> `#/fxfer-v6/file-transfer-configuration`
  - `File Transfer Tracking` -> `#/fxfer-v6/file-transfer-tracking`
  - `FTP Server Credentials` -> `#/fxfer-v6/ftp-server-credentials`
  Accept: clicking each closes the menu and changes route (when the destination screen exists).
- [ ] All other side menu items render and show hover flyouts, but do not navigate in the rebuild.
  Accept: no route change on click.

## 4. Header overlays + footer modals - S8, S10
- [ ] Implement overlay panels for Messages / External Links / Favorites / Contact Us using the endpoint contracts in S10 (or stubs), and ensure open/close works.
  Accept: parity test ids exist; manual check matches S8 behavior.
- [ ] Implement footer modal overlays for Disclaimer / Website Requirements / Privacy Policy / Cookie Policy and wire them to the captured URLs.
  Accept: clicking each footer item opens a modal container.

## 5. Done
- [ ] `npm run verify -- fxfer-v6/home`: size_delta within +-2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v6/screens/home/spec/parity.spec.ts`: all pass.
