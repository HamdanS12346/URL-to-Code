# TASKS — fxfer-v8/ftp-server-credentials

Target: React 19 + TypeScript, plain CSS (no UI library) with the Provider kit (Kendo UI for jQuery portal behaviors/widgets).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md`.
Spec: `packs/fxfer-v8/screens/ftp-server-credentials/spec/UI_SPEC.md` · tests: `packs/fxfer-v8/screens/ftp-server-credentials/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v8/ftp-server-credentials`: builds the static page and stamps every key as `data-testid`.
- [ ] `npm run verify -- fxfer-v8/ftp-server-credentials`: baseline pixel diff against `packs/fxfer-v8/screens/ftp-server-credentials/reference.png`.

## 1. Shell (shared) — §2, §5
- [ ] Use the shared Provider portal shell from `fxfer-v8/home` (header/menu/footer) and ensure required shared keys exist on this route.
  Accept: parity spec can locate `pageBannerLogo`, `link-messages`, `button-main-menu-2`, footer policy links.

## 2. Regions — §2 (top to bottom)
- [ ] Module title bar: “FILE TRANSFER SERVICES” + “FTP Server Credentials” + help icon (`button-help`).
  Accept: `npm run verify -- fxfer-v8/ftp-server-credentials` has low drift in the first band (`sections/01-ftp-server-credentials.png`).
- [ ] Main content: Create New button + Search Criteria panel (expanded default).
  Keys: `ftpServerCredentialAddButton`, `criteriaPanel`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton`.
  Accept: `npm run verify -- fxfer-v8/ftp-server-credentials` band for `sections/02-pagebody.png` has `bad_pct < 5`.

## 3. Kit widgets & dialogs — §5, §6, §7, §8
- [ ] Search Results grid widget (`k1`): columns and pager as captured.
  Accept: state replay screenshot matches `kit/states/search.png` (verify `states: N/M`).
- [ ] Add dialog (`d1`): fields + required validation messages; close “X” shows confirmation (“Alert Confirmation”).
  Accept: verify state screenshots match `kit/states/dialog-d1.png` and `kit/states/dialog-d1-confirm.png`.
- [ ] Edit dialog (`d2`): audit details section and Invalidate button.
  Accept: verify state screenshots match `kit/states/dialog-d2.png`.

## 4. Server interactions (stubs) — §10
- [ ] Stub `GET /api/FileTransfer/GetFTPServerCredentials/` to return 4 rows for the grid.
- [ ] Stub open dialog routes and POST save so UI flows work without the legacy backend.
  Accept: parity tests can open `d1`, open `d2`, and click Save without runtime errors.

## 5. Done
- [ ] `npm run verify -- fxfer-v8/ftp-server-credentials`: `size_delta_px` within ±2; report `bad_pct` and `worst_band`.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v8/screens/ftp-server-credentials/spec/parity.spec.ts`: all pass.
- [ ] Resolve or explicitly track §13 `[UNKNOWN]` items.
