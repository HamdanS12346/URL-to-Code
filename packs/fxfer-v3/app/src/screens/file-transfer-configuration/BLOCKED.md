# BLOCKED — file-transfer-configuration

The Provider kit is expected to fully handle grid row double-click → open dialog `d2` and match the captured kit state.

## What I saw

- Visual verify is close for the main page (`bad_pct` ~0.12%, `size_delta_px` [0,0]).
- Kit state replay mismatches for **row-d2** (Search → dblclick first grid row): **16.48% off**.

## Evidence

- `packs/fxfer-v3/screens/file-transfer-configuration/verify/states/row-d2/report.json` (`bad_pct`: 16.48)
- `packs/fxfer-v3/screens/file-transfer-configuration/verify/states/row-d2/candidate.png`
- `packs/fxfer-v3/screens/file-transfer-configuration/verify/states/row-d2/diff.png`
- Reference: `packs/fxfer-v3/screens/file-transfer-configuration/kit/states/dialog-d2.png`

This looks like a kit/shell parity issue for the View dialog state (row double-click flow), not screen-specific logic.
