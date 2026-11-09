# Provider portal probe — instructions for Codex (run on the client machine)

You are probing the live Provider portal (Gainwell MMS, File Transfer Services module) with Playwright, so the UI generator can be tuned to it.
You **collect facts into files**. You do not fix anything, and you do not edit this repo except to add the probe script and the `provider-probe/` output folder.

## Rules (read first)

1. **Read-only.** Allowed clicks: open/close dropdowns, date/time pickers, hover/click `?` help icons, collapse/expand panel chevrons,
   **Search**, **Reset**, **Create New** (to open the dialog), the dialog's **×** and **Cancel**, grid sort headers, grid filter icons (open the menu, then close it without applying), and pager buttons.
   **Never** click Save, Delete, Submit, Apply/Filter inside a filter menu, or any link that leaves the page (footer links, the book icon's target).
   Anything you type into a field must be cleared afterward.
2. **Login:** reuse `login()` from `scripts/lib/portal.mjs`, the same way `npm run ui` logs in. The password comes from `$env:UI_PASSWORD`.
   Never print, log or save the password, cookies or storage state. Never open `.env` or `packs/*/auth/`.
3. **Redact data, keep the UI.** Grid **cell** text becomes `"<text len=N>"`. Keep header labels, button text, field labels, dropdown option labels, tooltips and messages verbatim (that is UI content).
   Redact IPs, user names and emails wherever they appear, including inside outerHTML.
4. **Viewport:** use the same viewport and DPR as the pack capture (`packs/file-transfer/pack.json`). Record `devicePixelRatio`, `innerWidth` and `innerHeight` in `00-env.json`.
5. **Screens** (base `https://uximc.mms.tst.pgwcloud.net`):
   - `cfg` = `/FileTransfer/SearchSourceLocations` (File Transfer Configuration)
   - `trk` = `/FileTransfer/SearchFileTransferTracking` (File Transfer Tracking)
   - `ftp` = `/FileTransfer/SearchFTPServerCredentials` (FTP Server Credentials)
   - `home` = `/Home/MyHome/`
6. **Output:** everything goes into `provider-probe/` at the repo root as `NN-<name>.json`, plus the PNGs named per query. Finish with `provider-probe/SUMMARY.md`:
   one line per query, ✓, ✗ or partial, plus anything surprising. If a query fails, write the error into its JSON and continue. Do not stop.
   Zip `provider-probe/` at the end.
7. **outerHTML:** only the subtree each query names, never `document.documentElement`. Cap each string at 60 kB.
8. **Computed style set (STYLE):** whenever a query says "STYLE", record these properties for the element:
   `display, position, box-sizing, width, height, margin, padding, border (all sides), border-radius, background-color, background-image, color, font-family, font-size, font-weight, font-style, line-height, letter-spacing, text-transform, box-shadow, opacity, transform, transition, animation, z-index, overflow, cursor`.
   Also record `getBoundingClientRect()`.
9. **Timing sampler (SAMPLE):** whenever a query says "SAMPLE", trigger the action, then record the target's rect, opacity, transform, height and clip/overflow
   at t = 0, 16, 50, 100, 150, 200, 300, 400, 600 ms (`requestAnimationFrame` + `performance.now()` inside the page).
   Do this for the open and for the close. Also record the widget's `options.animation` if it is a Kendo widget.

---

## Queries

### Q00 — environment → `00-env.json`
`navigator.userAgent`, `devicePixelRatio`, `innerWidth` and `innerHeight`, browser zoom (if detectable), the Playwright version, and the viewport used.

### Q01 — stack fingerprint (each screen) → `01-stack.json`
For `home`, `cfg`, `trk` and `ftp`, record:
- `window.jQuery?.fn?.jquery`, `window.kendo?.version`, the Kendo theme (stylesheet file names containing `kendo`, and any `k-theme-*`/`k-*` class on `html`/`body`), and the Bootstrap version if present.
- Every `<script src>` and `<link rel=stylesheet href>` (path only, no query strings with tokens).
- `document.fonts`: the loaded families and weights. The computed `font-family` of `body`, `h1–h3`, `label`, `input` and `button`.
- Server rendering hints: `__RequestVerificationToken` present (yes/no only, not the value), and `meta` generator tags.

### Q02 — widget inventory (each screen) → `02-widgets-<screen>.json`
For every element with `[data-role]`, plus every `.k-widget`, `.k-input`, `.k-dropdownlist`, `.k-datetimepicker`, `.k-grid`, `.k-window`, `.k-tooltip`, `.k-panelbar` and `.k-numerictextbox`:
- `role`, `id`, `name`, tag, the wrapper's class list, and the label text it belongs to.
- If `kendo.widgetInstance(el)` exists: `widget.options.name` and a JSON-safe copy of `widget.options`.
  Drop functions and data-source data, but keep `animation`, `optionLabel`, `dataTextField`, `dataValueField`, `format`, `parseFormats`, `interval`, `min`, `max`, `sortable`, `filterable`, `pageable`, `scrollable`,
  `height`, `popup`, `position`, `showOn`, `autoHide`, `callOut`, `width`, `modal`, `draggable`, `resizable`, `actions`, `title` and `visible`.
- The total count per widget type.

Also list every `?` help icon on the screen: its outerHTML, its parent label, and the widget attached to it (if any).

### Q03 — shell (header, title bar, footer) → `03-shell.json` + `03-shell-<screen>.png`
On `home`, `cfg`, `trk` and `ftp`:
- The outerHTML of everything above the page content area (logo row, "Medicaid Management Solutions / FINAL TEST", hamburger, the module tab "FILE TRANSFER SERVICES", the green title bar), and of the footer (links row, copyright, Server/Build line).
- STYLE for: the header root, logo, product title, environment label ("FINAL TEST"), hamburger button, module tab, title bar (including its gradient), title text, every footer band, footer link, footer separator, copyright line, and Server/Build line.
- **A diff of the shell outerHTML between the 4 screens.** Which nodes or text change per screen, and which never change?
- **Where the title and module tab come from:** fetch the raw server HTML with `page.request.get(url)`, not the rendered page.
  Is the title-bar text already in the server HTML, or is it set by script? If by script, name the script and the global/variable it uses.
- Elements that exist in the DOM but are hidden (for example a language item/globe, or user menu items): selector, how they are hidden (`display`/`visibility`/class), and on which screens.
- Hamburger: click it → outerHTML and STYLE of the menu panel, SAMPLE its open and close, and record how it closes (click again, outside click, Esc).
  Screenshot it open as `03-menu-open.png`. Do not click any menu item.
- A screenshot of the full shell at rest for each screen.

### Q04 — overlays at rest → `04-rest-overlays.json`
On each screen, after load + 3 s idle, list every `.k-animation-container, .k-popup, .k-tooltip, [role=tooltip], .k-window, .k-overlay, .k-list-container, .k-calendar-container`.
For each: its parent, `display`, `visibility`, `opacity`, rect, `aria-hidden`, its inline `style` attribute, and its text (truncated to 80 characters).
Answer this question explicitly: **at rest, is any of them visible?** Also: which of them sit in the DOM hidden, and how are they hidden?

### Q05 — help icons (`?`) and the book icon → `05-help.json` + `05-help-*.png`
Run this on `trk` for the "File ID" `?` icon, and on `cfg` for one `?` icon (results should match; say so if they don't).
- **Hover:** SAMPLE the appearance; the tooltip's outerHTML; STYLE for the tooltip box, its text and its callout arrow;
  its position relative to the icon (above/below, offset in px); the delay before it shows; the delay before it hides after mouse-out; and whether the content equals the label text.
- **Click:** does anything else appear (a popover or a panel with longer help text)? If yes, record its outerHTML, STYLE and SAMPLE,
  and how it closes (click again, outside click, Esc, mouse-out).
- **Book icon (top right, beside Create New):** do the same hover check ("Help" tooltip: blue background, white text). On click, only record what it would do (its `href`/`onclick`/`window.open` target). Do not follow it.
- Screenshots: `05-help-hover.png` and `05-help-click.png` (if a popover appears) and `05-book-hover.png`.

### Q06 — dropdowns → `06-dropdown.json` + `06-dropdown-*.png`
Run this on `cfg` → "Owner Module", and repeat the short version on one dropdown on `trk` and one on `ftp`.
- Closed state: outerHTML of the wrapper, and STYLE for the wrapper, the value text and the arrow.
- Focused state (after a click, then close): STYLE of the focus border (the purple outline: color, width, box-shadow).
- Open: SAMPLE the popup; record its outerHTML and its STYLE.
  Also record STYLE for the option-label row ("select a value…"), a normal item, a hovered item, the selected item, and the list scroll container and its scrollbar (the up/down arrow buttons are custom or native?).
  Record the popup height, item count, item height, and the popup width compared with the wrapper width.
- **Close behavior:** check each of these separately and record true/false: click the same control again → closes? Click outside → closes? Esc → closes? Tab → closes? Selecting an item → closes?
- **Placement:** scroll so the dropdown sits near the bottom of the viewport, then open it. Does it open upward? Record its rect.
- Keyboard: does ArrowDown on the closed control change the value without opening? Does Alt+Down open it? Does typing a letter jump to an item?
- Pick an item, record the displayed text, then set it back to the option label (or click Reset).
- Screenshots: open at the normal position, and open near the bottom.

### Q07 — date and time pickers → `07-datetime.json` + `07-datetime-*.png`
Run this on `trk` → "From Date" and "To Date".
- Input: placeholder, `format`/`parseFormats`, its value at rest, and STYLE for the input and both icon buttons (clock, calendar).
- Calendar button: SAMPLE the popup, then record its outerHTML and STYLE for the header (month title, prev/next arrows), weekday row, a day cell, an other-month day, the today cell (the boxed 9), a hovered day, the selected day, and the footer ("Monday, November 9, 2026": its format and color).
  Also: what does clicking the month title do (switch to year view)? How does it close?
- Clock button: SAMPLE the popup, then record its outerHTML, the time interval (30 min?), first/last item, and STYLE for an item, a hovered item and the scroll arrows.
- Pick a date and a time, record the resulting input text format, then clear it.
- Screenshots: calendar open, and time list open.

### Q08 — panel collapse → `08-collapse.json`
Run this on `cfg` and `ftp` → the "Search Criteria" chevron.
- outerHTML of the panel header and its body wrapper. Which element is clicked? Which class or style toggles? How does the chevron icon change (class names)?
- SAMPLE the collapse and the expand (body height, opacity).
- **Why does `ftp` start collapsed and `cfg` start expanded?** Is it a server-rendered class, a script, or saved state (`localStorage`/cookie)? Name the key if it is saved state.
- STYLE of the panel card (border, radius, shadow, background) and of its title.

### Q09 — grid after Search → `09-grid-<screen>.json` + `09-grid-*.png`
On `cfg`, `trk` and `ftp`, click **Search** and wait for the grid. Cell text is redacted, per rule 3.
- The grid's outerHTML: header, the first 3 rows, and the pager.
- **Header:** for each column, record its label, whether it is sortable, whether it is filterable, and the sort and filter icon elements (class names).
  **Why does every sortable column show ▲ when nothing is sorted?** Is it a Kendo option, custom CSS, or a `::after` rule? Paste the CSS rule.
- **Sort cycle:** click one header 3 times. After each click, record the icon class, `aria-sort`, and whether the data order changed. Is it none → asc → desc → none?
- **Filter (on `ftp`):** click one funnel icon, then record the menu's outerHTML, its STYLE and a SAMPLE. Close it without applying anything.
- **Rows:** STYLE for the header cell, a normal row, an alternating row (is there striping?), a hovered row, and a cell with an ellipsis ("\\mapsftshrfs01\..."): `text-overflow`, `white-space` and `max-width`.
  Also record the row height and what happens when a row is clicked.
- **Pager:** STYLE for the first/prev/next/last buttons, the current page (blue 1), another page number, "…", the page-size dropdown (its options), the "Items per page" text, the "1-10 of 97 Items" text and the refresh icon.
  Click page 2 and record the change, then go back to page 1.
- The checkbox beside the grid ("Show Inactives" / "Include Invalids"): its markup and STYLE (a custom box or native?), and its `?` icon.
- **Before Search:** is the grid rendered at all? Is it empty? What text does it show? STYLE of that empty state.
- Screenshots: the grid with its header and pager, for each screen.

### Q10 — the dialog (Create New) → `10-modal-<screen>.json` + `10-modal-*.png`
Run this on `cfg` → "Create New" ("Add File Transfer Configuration"), and on `ftp` → "Create New" ("Add FTP Server Credentials").
- Widget options: `modal`, `width`, `height`, `draggable`, `resizable`, `actions`, `animation` (open/close effects and duration), and `position`.
- SAMPLE the open, the close via ×, the close via Cancel, and the close via Esc (does Esc close it?). Does a click on the overlay close it?
- STYLE for the overlay (color, opacity), the window, the title bar, the title text, the × button, the content scroll container, the section titles ("Source Configuration", "Destination Configuration"), the fieldset boxes, the required `*`, "Required Fields ( * )", the radio group, the bordered checkbox boxes, and the Reset/Cancel/Save buttons.
- The full outerHTML of the window. Form values must be empty, so there is nothing to redact except the nested grid.
- **Focus:** where does focus go on open? Does Tab stay trapped inside the dialog? Where does focus return on close?
- **Body scroll:** is the page behind the dialog scroll-locked? Does the dialog content scroll inside itself? Record the scroll container's `scrollHeight` and `clientHeight`.
- **Nested "Create New" (Destination Configuration):** click it. Does a second window open? Record the same facts for it (title, options, STYLE of the window and title bar), then close it with ×/Cancel.
- **Validation without saving:** if `kendo.ui.Validator` (or jQuery validate) is attached to the form, call its `validate()` from JS (**do not click Save**).
  Record the error-message markup, its STYLE, and its position for 2 required fields. Then reset the form.
- Screenshots: the dialog top, middle and bottom (scroll the content), and the nested dialog.

### Q11 — field defaults → `11-fields.json`
For every input, select and textarea on `cfg`, `trk`, `ftp`, and in the `cfg` dialog, record:
- type, its widget role, the `value` attribute, `.value`, `widget.value()`, the placeholder, `required`, and `maxlength`.
- **Explicitly for Configuration ID on `cfg`:** what are the attribute `value`, `.value` and the widget value at rest? Is it a NumericTextBox?
  (The rebuild showed `0`; live shows empty.)
- Does Reset restore exactly these values?

### Q12 — interaction styles → `12-states.json`
For each button type (Search = solid blue; Reset, Cancel and Create New = outlined; Save; × close) record STYLE in each of these states: rest, `:hover`, `:focus-visible` (Tab to it), `:active` (mouse down), and disabled (if any is disabled).
For a text input, a checkbox and a radio button, record STYLE at rest, on hover, on focus, when checked, and when disabled.
Use `page.hover`, `keyboard.press('Tab')` and `mouse.down`, then read computed styles. Do not rely on CSS text alone.

### Q13 — CSS for states that don't exist at rest → `13-css-rules.json`
From all same-origin stylesheets (`document.styleSheets`, skipping cross-origin ones but listing their hrefs), copy the full `cssText` of every rule whose selector matches any of the following:
`.k-animation-container`, `.k-popup`, `.k-list`, `.k-list-item`, `.k-item`, `.k-state-*`, `.k-hover`, `.k-focus`, `.k-selected`, `.k-tooltip`, `.k-callout`,
`.k-calendar`, `.k-timeselector`, `.k-window`, `.k-overlay`, `.k-dialog`, `.k-grid-header`, `.k-header`, `.k-link`, `.k-i-sort`, `.k-i-arrow`, `.k-i-filter`, `.k-sort-icon`,
`.k-grid-filter`, `.k-filter-menu`, `.k-pager`, `.k-pager-*`, `.k-alt`, `.k-master-row`, `.k-tooltip-validation`, `.k-invalid`, `.k-widget`, `[data-role]`, `:hover`, `:focus` and `@keyframes`.
Also copy every rule from the portal's own (non-Kendo, non-Bootstrap) stylesheets in full. List the file names.
Group the rules by file name, and record each file's total rule count.

### Q14 — same everywhere? (the most important check) → `14-cross-module.json` + `14-*.png`
Open the hamburger menu, pick **2 other modules** (not File Transfer) and one search-type screen in each. Record their URLs.
On those screens, run a light version of Q01, Q02 (counts and widget types only), Q03 (shell diff against `cfg`), Q04 and Q13 (the stylesheet file list only).
Then answer explicitly:
- Is the shell markup identical apart from the module tab and title text?
- Are the widget types the same (DropDownList, DateTimePicker, Grid, Window, Tooltip)?
- Is the same Kendo version and theme used?
- Do the help `?` icons and the Search/Reset/Cancel layout follow the same pattern?

Take a screenshot of each screen at rest.

### Q15 — `home` → `15-home.json` + `15-home.png`
List the blocks on the home page (cards, tiles, news, etc.), and the widget inventory (as in Q02). Note anything on home that is not on the module screens.

---

## Hand back

Hand back `provider-probe.zip` (all the JSON, PNG and `SUMMARY.md` files). It must contain no passwords, cookies, tokens, or unredacted grid data.
