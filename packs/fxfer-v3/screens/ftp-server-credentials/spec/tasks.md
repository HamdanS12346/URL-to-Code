# TASKS — fxfer-v3/ftp-server-credentials

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the “Build phase” rules in `AGENTS.md` (dpr!).
Spec: packs/fxfer-v3/screens/ftp-server-credentials/spec/UI_SPEC.md · tests: packs/fxfer-v3/screens/ftp-server-credentials/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- fxfer-v3/ftp-server-credentials`: builds the static page in `packs/fxfer-v3/screens/ftp-server-credentials/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`.
- [ ] Keep `reference.png` and `manifest.json` in `packs/fxfer-v3/screens/ftp-server-credentials/` (`npm run verify -- fxfer-v3/ftp-server-credentials` reads them there).

## 1. Shell — §2
- [ ] Use the shared Provider shell from the kit (see home spec); implement only the content scope `#pageBody > main` described here.
  Accept: `npm run verify -- fxfer-v3/ftp-server-credentials` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Content header actions: Help icon (`button-help`) + “Create New” (`ftpServerCredentialAddButton`).
  Accept: verify band `band-02-pagebody` `bad_pct` < 5.
- [ ] Search Criteria panel (title, required hint, Server Name field, Reset/Cancel/Search actions). Keys: `criteriaPanel`, `FtpServerName`, `FtpServerNameHelp`, `resetButton`, `cancelButton`, `nextButton`.
  Accept: verify band `band-02-pagebody` `bad_pct` < 5.
- [ ] Search Results panel state after Search: Include Invalids (`showInvalidFTPServerCredentialsCheckBox`) + grid (`k1`).
  Accept: `npm run verify -- fxfer-v3/ftp-server-credentials` reports `states: N/M` matching for the kit state screenshots.

## 3. Dialogs & states — §5, §6, §7, §8
- [ ] Wire Create New → open dialog `d1` (kit) and grid row double-click → open dialog `d2`.
  Accept: `npm run verify -- fxfer-v3/ftp-server-credentials` reports dialog state screenshots match.
- [ ] Ensure dialog widgets `k2`/`k3` (Add) and `k4`/`k5` (Edit) render with date format `MM/dd/yyyy` and read-only styling.
  Accept: kit dialog state screenshots match.

## 4. Validation — §6
- [ ] Ensure required/regex/date/number validation messages appear verbatim as listed in §6 (kit-driven).
  Accept: parity tests (if extended for dialogs) and/or manual verification using the kit’s validation.

## 5. Server interactions — §10
- [ ] Stub/implement endpoints for Search and Save in the generated services file for this screen (kit pattern).
  Accept: Search renders rows; Save produces the same post-save UI behavior as legacy. [UNKNOWN]

## 6. Done
- [ ] `npm run verify -- fxfer-v3/ftp-server-credentials`: size_delta ±2, bad_pct < 5, and kit `states: N/M` all match.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v3/screens/ftp-server-credentials/spec/parity.spec.ts`: all pass.
- [ ] Resolve §13 open questions or document as known gaps.
