# TASKS — fxfer-v4/home

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md` (DPR first).
Spec: `packs/fxfer-v4/screens/home/spec/UI_SPEC.md` · tests: `packs/fxfer-v4/screens/home/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v4/home`: builds the static page in `packs/fxfer-v4/screens/home/app/` and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/fxfer-v4/screens/home/` (`npm run verify -- fxfer-v4/home` reads them there).

## 1. Shell — §2, §3, §5
- [ ] Implement `ProviderShell` (shared): fixed header, AAG header links, hamburger side menu behavior.
  Accept: `npm run verify -- fxfer-v4/home` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Header (`#pageHeader`): logo, system/app titles, header links, hamburger. Accept: verify top band `bad_pct` < 5.
- [ ] Hero band: left image background + right title/subtitle + floating help icon. Accept: verify band `bad_pct` < 5.
- [ ] Footer: dark link bar + white build bar. Accept: verify footer band `bad_pct` < 5.

## 3. Navigation — §9
- [ ] Side menu list + flyouts: render full module/item tree from `menu.json`; only File Transfer Services items route to `#/fxfer-v4/file-transfer-configuration`, `#/fxfer-v4/file-transfer-tracking`, `#/fxfer-v4/ftp-server-credentials`.
  Accept: parity tests for menu open/flyout states pass.

## 4. Done
- [ ] `npm run verify -- fxfer-v4/home`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v4/screens/home/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
