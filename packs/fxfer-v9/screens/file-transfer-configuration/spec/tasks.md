# TASKS — fxfer-v9/file-transfer-configuration

Target: React 19 + TypeScript, plain CSS (no UI library).
Build with the draw-ui skill (reconstruction mode) + the Build phase rules in `AGENTS.md` (dpr!).
Spec: `packs/fxfer-v9/screens/file-transfer-configuration/spec/UI_SPEC.md` · tests: `packs/fxfer-v9/screens/file-transfer-configuration/spec/parity.spec.ts`

## 0. Setup
- [ ] `npm run port -- fxfer-v9/file-transfer-configuration`: builds the static page in the pack app and writes behavior notes.
- [ ] `packs/fxfer-v9/screens/file-transfer-configuration/reference.png` and `packs/fxfer-v9/screens/file-transfer-configuration/manifest.json` stay in place (`npm run verify -- fxfer-v9/file-transfer-configuration` reads them there).

## 1. Shell — §2, §3
- [ ] Use the shared shell implementation (home spec); implement only the content area described in §2.
  Accept: `npm run verify -- fxfer-v9/file-transfer-configuration` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom)
- [ ] Create New button + Search Criteria panel layout (expanded) (keys: `FileTransferGridAddButton`, `ConfigId`, `ConfigName`, `OwnerName`, `SearchModuleList`, `ProtocolList`, `resetButton`, `cancelButton`, `nextButton`).
  Accept: verify earliest band drift minimized; panel matches `sections/02-pagebody.png`.
- [ ] Search Results panel + grid scaffold (widget `k4`).
  Accept: Search state matches `kit/states/search.png`.

## 3. Components & states — §5, §7, §8
- [ ] Criteria collapse/expand state (`criteriaExpanded`) and Search results visibility (`hasResults`) (flow states: `n0`, `n1`, `n3`).
  Accept: parity flows for `flow-n1` / `flow-n3` pass.
- [ ] Dialog wiring for `d1` Add, `d2` View, `d3` Edit (flow states: `n2`, `n1.1`, `n1.1.2`).
  Accept: kit states replay and dialogs open/close as captured.

## 4. Validation — §6
- [ ] Implement required-field messages from the Save probe in `n2` (at minimum: ConfigName, ProtocolTypeList, SourceAddress, SourceFileMask, OwnerName, OwnerPhoneNumber, OwnerEmail, RunSchedule, TimeWindowStartList, TimeWindowEndList, destination-required message).
  Accept: parity tests for dialog validation pass.

## 5. Server interactions — §10
- [ ] Stub/call the screen services for Search and dialog loads; wire Save in edit mode to PUT `/api/FileTransfer/AddFileTransferBaseConfiguration/`.
  Accept: UI transitions match flow states; writes remain mock-safe.

## 6. Done
- [ ] `npm run verify -- fxfer-v9/file-transfer-configuration`: size_delta ±2, bad_pct < 5.
- [ ] `TARGET=react URL=<url> npx playwright test packs/fxfer-v9/screens/file-transfer-configuration/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered or tracked as a known gap.
