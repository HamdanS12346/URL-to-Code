# BLOCKED: claims-mgmt-v1/pro-dur

## Why blocked
The visual verifier reports major diffs in shell-owned UI (footer / tooltip state), and fixing it would require changing `src/shell/**` or the kit.
Per pack rules, I did not work around shell/kit behavior from within the screen.

## Evidence
- Verify command used:
  - `$env:URL="http://localhost:5180/#/pro-dur"; $env:WAIT_ROOT="1"; node scripts/verify.mjs claims-mgmt-v1/pro-dur`
- `packs/claims-mgmt-v1/screens/pro-dur/verify/report.json`:
  - `size_delta_px`: `[0, -125]`
  - `bad_pct`: `9.92`
  - `worst_section`: `disclaimer-the-website-is-prov` `bad_pct: 100`
  - `states`: `tooltip` mismatch (`bad_pct: 17.48`), `menu-open/menu-flyout/menu-close` OK

## Notes
- After that run, `http://localhost:5180` became unreachable (`net::ERR_CONNECTION_REFUSED`), so I could not re-run verify.
