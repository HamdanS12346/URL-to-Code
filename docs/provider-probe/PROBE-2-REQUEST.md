# Probe 2: what to collect from the live Provider portal

For: whoever runs Codex + Playwright on the client machine. Read-only. Output goes next to the first probe, in `docs/provider-probe/`
(files `20-*` .. `24-*`). Write the probe as `docs/provider-probe/online-probe-2.mjs`, built like `online-probe.mjs`: `launch` / `openPage`
(readonly guard) from `scripts/lib/browser.mjs`, `login` from `scripts/lib/portal.mjs`, viewport 1920x1080, dpr 1.

## Safety rules (same as probe 1)
- Never click Save, Update, Delete, Submit, Approve, Send, or anything inside a dialog except its titlebar close (X) or Cancel.
- Never print, write or copy the password, cookies or storageState. Never open `.env` or `packs/*/auth/`.
- Screenshots may show test-environment data: keep them in this folder, do not publish them.
- Each page gets a fresh load. Time-box each page to 25 s; a page that errors gets `{ error }` in the JSON and the probe moves on.

## Q20. Widget census of every menu page (the most important one)
Why: the kit only rebuilds dropdown, numeric, date/datetime/time and grid. Other modules may use widgets it has never seen.
This census decides what the kit learns next, so that "give it any module" works.

1. On the home page, open the hamburger (`#pageBannerMenu > nav > div > i`) and collect every `#mainMenu a[href]` with its trail
   (module > item). Expect about 180. Skip `javascript:` links (list them separately).
2. For each href (fresh `goto`, wait for `load`, then until `window.kendo` exists and no `.k-loading-mask` is visible, max 10 s), record:
   - `url`, `finalUrl` (redirects), `title` (the green title bar `h1`), module tab text, whether the page has an `iframe`.
   - `roles`: count of every `[data-role]` value, plus `kendo.widgetInstance(el).options.name` when it differs.
   - `wrappers`: counts of `.k-tabstrip, .k-panelbar, .k-upload, .k-multiselect, .k-maskedtextbox, .k-switch, .k-checkbox, .k-radio,
     .k-treeview, .k-listview, .k-chart, .k-editor, .k-splitter, .k-stepper, .k-wizard, .k-combobox, .k-autocomplete, .k-dropdowntree`.
   - `tooltips`: count of `[data-role=tooltip]`; `validated`: count of `[data-val=true]`; `required`: count of `.editor-req-field`.
   - `buttons`: the unique texts/values of buttons and `input[type=button|submit]` inside `#pageBody`.
   - `grids`: per `[data-role=grid]`: column titles, `filterable`, `pageable`, `selectable`, toolbar button texts, command column texts.
   - `scripts`: the page's own script URLs (those under `/Scripts/<Module>/`). GET each one (same origin) and extract with a regex:
     - every `openModalOverlay("<panelId>", <urlVar>, ...)` call (panel id, url variable),
     - every `setKendoGridDataBoundEvents(e, <msg>, <singleClick>, <doubleClick>)` call (the two callback names),
     - every `cascadeFrom`, `kendoWindow(`, `window.location` / `location.href =` assignment.
   - `shellHash`: a hash of `#pageHeader` + `#mainMenuContainer` outerHTML with the user name, ids that are GUIDs and `?v=` stripped
     (it tells us whether every module shares one shell).
   - a viewport screenshot, JPEG quality 60: `20-census/<module-slug>/<item-slug>.jpg`.
3. Write `20-census.json` (one entry per page) and `20-census-summary.md`: a table module × widget kind (counts), and a list
   "pages using a widget the kit does not know" (anything in `wrappers` or `roles` other than dropdownlist/combobox, numerictextbox,
   datepicker/datetimepicker/timepicker, grid, tooltip, window, menu, popup).

## Q21. Tooltip widths (confirms the "two words on two lines" fix)
On File Transfer Configuration, File Transfer Tracking and FTP Server Credentials: hover each `[data-role=tooltip]` inside
`#pageBody > main` (up to 12 per page), wait `showAfter + 300` ms, record: the text, the inline `width`/`height` of
`.k-child-animation-container`, `.k-tooltip` `getBoundingClientRect()` width and height, its computed `line-height`, and the number
of lines (`round(height / line-height)`). Take a clip screenshot of two tooltips whose text has two or more words.
Output: `21-tooltips.json`, `21-tooltip-<n>.png`.

## Q22. The side menu (hamburger): open, fly-out, close
Once on the home page and once on File Transfer Configuration, each from a fresh load:
1. Before: `#mainMenuContainer` className and computed `display`; number of `.disabled-backdrop` elements.
2. Click the hamburger. At 50 ms, 300 ms and 900 ms record: className, computed display/opacity/transform of `#mainMenuContainer`,
   the backdrop's count, outerHTML and computed style, and `document.activeElement`.
3. `$('#mainMenu').data('kendoMenu').options` (animation, hoverDelay, direction, orientation, openOnClick).
4. Hover "File Transfer Services": the fly-out's `.k-animation-container` rect + inline style at 50/300 ms, and a screenshot.
5. Close it three separate ways (reopen between them), recording after each whether it closed: (a) `#mainMenuClose`, (b) Escape,
   (c) a click on the backdrop at (200, 500).
6. A video (Playwright `recordVideo`) of: open, hover File Transfer Services, hover File Transfer Tracking, click it, the new page loaded.
Output: `22-menu.json`, `22-menu.webm`, `22-menu-*.png`.

## Q23. Create New and the grid row (the File Transfer Configuration dialog that did not open)
On File Transfer Configuration, File Transfer Tracking and FTP Server Credentials, fresh load each:
1. Make sure nothing covers the page: the menu is closed, and `document.elementFromPoint` at the centre of the Create New button
   returns the button (record what it returned).
2. Click Create New (if the page has one), wait for a visible `.k-window` (10 s). Record: title, `options` of its Kendo Window,
   rect, the overlay's class/style, the window's outerHTML (empty form, no data), the requests made after the click (method + path
   only). Screenshot. Close it with the titlebar X.
3. Click Search with no criteria. Record the row count. If there are rows: single-click the first row (record any class/selection
   change and whether a window opened), then double-click it (wait for `.k-window` 10 s; if one opens: title, options, rect,
   screenshot `23-<screen>-row-dblclick.png`, then close it with the X; never click anything inside it).
Output: `23-dialogs.json`, `23-*.png`.

## Q24. The portal's own widget gallery
Menu "UI Examples > Page Elements / Widgets" (`/Employee/UIExamples`): a full-page screenshot, the Q20 census for that page, and
the list of its section headings. It shows the portal's own widgets in one place: it becomes the kit's test page.
Output: `24-ui-examples.json`, `24-ui-examples.png`.

## When done
Write `PROBE-2-ANSWERS.md` like `ANSWERS.md`: one section per question, facts only, each citing the file it came from.
