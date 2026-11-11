# BLOCKED — fxfer-v4/ftp-server-credentials

`node scripts/verify.mjs fxfer-v4/ftp-server-credentials` reports shell/kit regressions that this screen cannot fix.

## What is wrong
- `menu-flyout` state fails: `[data-kit-flyout]` not shown (module fly-out to the left of the side menu).
- `tab-flyout` state fails: `[data-kit-flyout]` not shown (module tab fly-out under the header).

## Evidence
- Verify output: `states: 6/8 match the live page | ✗ menu-flyout … | ✗ tab-flyout …`
- Full details: `C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\ftp-server-credentials\verify\report.json`

## Notes
- This screen code does not touch `src/shell` or `src/kit`; these behaviors are owned by the Provider kit/shell.
