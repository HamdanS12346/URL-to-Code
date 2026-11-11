# BLOCKED — file-transfer-tracking

The Provider kit shell/menu behavior does not match verify expectations.

`node scripts/verify.mjs fxfer-v4/file-transfer-tracking` reports:
- `states: 5/7 match the live page`
- `✗ menu-flyout: [data-kit-flyout] not shown (a module flies out to the left of the menu, over the page)`
- `✗ tab-flyout: [data-kit-flyout] not shown (the module tab opens its screens under it)`

This appears to be owned by `src/kit` / shared shell behavior rather than the screen code.
