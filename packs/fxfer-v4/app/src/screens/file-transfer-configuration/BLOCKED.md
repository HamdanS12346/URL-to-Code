# BLOCKED — fxfer-v4/file-transfer-configuration

Kit/shell-owned states fail in verify; no screen-level workaround applied.

Ran:
- `C:\UI-specs\URL-to-Code`: `$env:URL="http://localhost:5180/#/file-transfer-configuration"; $env:WAIT_ROOT="1"; node scripts/verify.mjs fxfer-v4/file-transfer-configuration`

Observed (from `packs/fxfer-v4/screens/file-transfer-configuration/verify/report.json`):
- `states: 6/9 match`
- `row-d2` fails: `locator.scrollIntoViewIfNeeded: Timeout 5000ms exceeded.` (grid row double-click -> dialog d2)
- `menu-flyout` fails: `[data-kit-flyout] not shown` (module flyout to the left of the menu)
- `tab-flyout` fails: `[data-kit-flyout] not shown` (module tab flyout under header tab)

Artifacts:
- `packs/fxfer-v4/screens/file-transfer-configuration/verify/report.json`
- `packs/fxfer-v4/screens/file-transfer-configuration/verify/worst.png`
