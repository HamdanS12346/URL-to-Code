# BLOCKED — fxfer-v4/home

The Provider kit/shell side-menu flyout state does not replay in the rebuild.

## What I ran
- `npx tsc --noEmit` (in `packs/fxfer-v4/app`) — OK
- Visual + kit-states verify (from `C:\UI-specs\URL-to-Code`):
  - `$env:URL="http://localhost:5180/#/"; $env:WAIT_ROOT="1"; node scripts/verify.mjs fxfer-v4/home`

## What I saw
- `states: 3/4 match the live page | ✗ menu-flyout: [data-kit-flyout] not shown (a module flies out to the left of the menu, over the page)`
- `menu-open`, `menu-close`, and `tooltip` states pass.
- Candidate/reference screenshots:
  - Candidate: `C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\home\verify\states\menu-flyout\candidate.png`
  - Reference: `C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\home\kit\states\menu-flyout.png`

This flyout behavior is owned by the Provider kit/shell; per task rules I did not implement a workaround in the screen code.
