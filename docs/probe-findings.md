# What the probes found, and what the tool does about it

Three runs of `npm run probe` on the live Provider portal (`docs/probe/` all modules, 155 pages; `docs/probe-ft-alert/` and `docs/probe-task-admin/` the
follow-up on File Transfer, Alert Notification, Administration and Task Management, with the 1272x588 viewport). Each finding, the evidence, and where the
tool handles it now. Run the probe again on a new module before trusting the kit there (`docs/probe-runbook.md`).

| finding | evidence | the tool |
|---|---|---|
| The portal has two layouts, switching at **1280 CSS px**. A 1920x1080 screen at 150% is 1272 wide, so the client sees the small one. | `isPhone()` in the portal's `app` bundle: `matchMedia("(max-width: 1280px)")`; nav links 6 → 0 and a second hamburger below it | `config.json` `profiles`; the capture's profile pass; `screen.responsive`; `verify` replays `…@client` states |
| **A dialog touching the left edge at 1272 is correct.** Below the switch: left 0, top 20, at least 90% of the width, at most 85% of the height, content scrolling inside. Above it: centered, at most 85% high. | 9 of 9 dialogs measured at 1272, 13 of 13 centered at 1920 | `responsive.dialog` / `desktop`, `placeWindow` in `KitScreen.tsx`, `expect.rect` in verify |
| Submenus of the side menu have **no native scrollbar**; at a small height Kendo caps them (80% of the window) and shows scroll buttons at both ends | 40 fly-outs measured: 0 with a scrollbar, inline `overflow: visible` on every popup | the clone sets `overflow: visible`; `fitFly` shows the buttons and scrolls with them and the wheel |
| Panel chevrons are mostly **`fa-angle-up/down`** in a `*-hdr-tools` div inside the header; the slide is 400 ms | 144 toggles; the first probe measured 0 ms because it looked at the wrong element | the harvest finds the panel through its container and stamps angles as well as chevrons |
| A Search with nothing typed is **validation on most Admin / Task screens** (a banner with a server message, plus field messages) and rows on most File Transfer / Alert screens | 85 of 133 pages: banner; 9: rows; the loading indicator is the "Processing ..." box or the grid mask (median 5.7 s) | `search.outcome`, `search.validation`; the capture waits for the indicator to go |
| Save with nothing filled: banner + a message under each required field, nothing sent | 9 of 9 dialogs | `dialogs.<id>.saveValidation` |
| Closing with an edit: the **X always asks** ("Form data has changed ..."; No/Yes or Stay/Leave); **Cancel asks on some screens, closes on others**; staying keeps the dialog | 11 dialogs | `dialogs.<id>.close` and the confirm window |
| Empty date boxes show `__/__/____` on focus; some are prefilled with today / yesterday or a placeholder (12/31/9999, 01/01/1900) | 26 of 146 prefilled | `offsetDays`, `minutes`, `focusMask` |
| Radios / checkboxes / dropdown values show or hide parts (Run Schedule; "Send SMS" shows "SMS Address") | 102 effects on 38 pages | `conditionals` per page and per dialog |
| The grid's filter icon opens one popup shape: operator, value, Filter / Clear | 15 popups, one shape | `filterPopup` |
| Create New is usually **another page** (35 of 61), not a dialog | the probe saw `navigates: /…/AddMember/` | not handled yet: those pages are not captured (see the plan: linked pages) |
| Widgets the kit does not rebuild: masked text box 57, autocomplete 85, filter multi-check 32, tab strip 13, multiselect 9 | `Q12_vocabulary` | static markup, flagged, as before |
