# TASKS — ffxfer-index-v1/ftp-server-credentials

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md` (dpr!).
Spec: `packs/ffxfer-index-v1/screens/ftp-server-credentials/spec/UI_SPEC.md` · tests: `packs/ffxfer-index-v1/screens/ftp-server-credentials/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- ffxfer-index-v1/ftp-server-credentials`: builds the static page in `packs/ffxfer-index-v1/screens/ftp-server-credentials/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] `reference.png` and `manifest.json` stay in `packs/ffxfer-index-v1/screens/ftp-server-credentials/` (`npm run verify -- ffxfer-index-v1/ftp-server-credentials` reads them there).
- [ ] The route `#/ffxfer-index-v1/ftp-server-credentials` needs no registration.

## 1. Shell — §2, §3
- [ ] Reuse the shared shell implementation from the pack’s home screen; do not re-spec or re-build shell styling here.
  Accept: parity test ids for the shell resolve (parity.spec.ts selectors find elements).

## 2. Regions — §2 (top to bottom)
- [ ] Content root (`#pageBody > main`): ensure the screen form, Create New action row, and Search Criteria panel match `sections/02-pagebody.png`.
  Accept: `npm run verify -- ffxfer-index-v1/ftp-server-credentials` → `size_delta_px` within ±2.

## 3. Components & states — §5, §7, §8
- [ ] Search Criteria panel: `criteriaPanel`, `FtpServerName`, `resetButton`, `cancelButton`, `nextButton`.
  Accept: parity tests for those keys pass.
- [ ] Search Results state (after Search): show `showInvalidFTPServerCredentialsCheckBox` and the grid widget `[kit:k1]`.
  Accept: kit state replay/verify shows Search Results like `kit/states/search.png`.
- [ ] Create New dialog: open dialog `[kit:d1]` from `ftpServerCredentialAddButton`.
  Accept: kit state replay/verify shows dialog like `kit/states/dialog-d1.png`.

## 4. Validation — §6
- [ ] Search criteria validation for `FtpServerName` (max length 50 + invalid character regex).
  Accept: parity tests validate the same messages (or update spec once legacy behavior is captured).

## 5. Server interactions — §10
- [ ] Search request: GET `/api/FileTransfer/GetFTPServerCredentials/` returning data shaped for `[kit:k1]`.
  Accept: Search populates the grid and shows “1-4 of 4 Items” style paging info.

## 6. Done
- [ ] `npm run verify -- ffxfer-index-v1/ftp-server-credentials`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/ffxfer-index-v1/screens/ftp-server-credentials/spec/parity.spec.ts`: all pass.
- [ ] Resolve or document every §13 open question as a known gap.
