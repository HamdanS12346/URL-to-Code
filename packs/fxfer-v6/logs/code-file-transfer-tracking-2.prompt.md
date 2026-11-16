Task: code fxfer-v6/file-transfer-tracking
Screen folder: C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking
App folder: C:\UI-specs\URL-to-Code\packs\fxfer-v6\app

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Build the screen "File Transfer Tracking" in src/screens/file-transfer-tracking/ (route #/file-transfer-tracking). It renders inside the shared shell (src/shell), which is already built: do not change the shell.

The app is React 19 + TypeScript + Vite, plain CSS, hash routes. This screen was captured with the Provider site kit: the files
you start from are a mechanical port of the live page, and they already look right (pixels within 1% on the first check) and
already behave like the portal for everything the kit knows. Your job is only what the kit cannot know.

Already done for you (do not rebuild, do not work around):
- Every Kendo widget (`<KitWidget id="kN" />`: dropdowns, number boxes, date/time pickers, the grid with synthetic rows, sort
  and pager), the tooltips, Search / Reset / Create New / Save / Cancel, collapsible panels, MVC validation messages, and the
  dialogs (`dialogs/Dialog*.tsx`, opened by `<KitScreen>`; a row opens its dialog the way the live grid does).
- The shared shell (`src/shell`): header, side menu (opens, flies out on hover, routes), title bar. It is not yours to edit.
- The kit's API is in the "API" section of C:\UI-specs\URL-to-Code\kits\provider\KIT.md. Do not read the files under src/kit to learn it.

Read, in this order, and nothing else unless a task needs it:
1. C:\UI-specs\URL-to-Code\packs\fxfer-v6\app\docs\ui-specs\file-transfer-tracking\TODO.md: the checklist for this screen, generated from the capture. Do every item that is not marked done.
2. the spec: C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking/spec/UI_SPEC.md and tasks.md.
3. C:\UI-specs\URL-to-Code\kits\provider\KIT.md (sections "API" and "What is left for the code step").
4. the screen's own script, for conditional fields and cascades: C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking/capture/js/ (only the file(s) named in the checklist).
5. pictures only if a task needs one: C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking/kit/states/*.png (each state) and C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking/sections/*.png.
Do not read style.css, C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking/snapshot/used.css, full.css or rendered.html whole (they are megabytes): search them for one
selector when you need it. Do not look for BEHAVIOR.md or explore/shots: a kit screen has none. Do not read other screens'
folders (src/screens/<other>): each screen is built on its own, and copying another screen's workaround spreads its bug.

Rules:
- Copy, do not redesign. No new features, no improvements, no styles the capture did not show.
- Never write your own dropdown, date picker, tooltip, grid, dialog, collapse, side menu or backdrop, and never edit src/kit or
  src/shell. Never hide, cover or re-style the shell or the side menu from a screen (no `display:none` on #mainMenuContainer,
  no `pointer-events` on a backdrop, no timers that fight the kit).
- If something the kit or the shell owns is wrong (the menu does not open or close, a dialog is missing or empty, a widget
  misbehaves), do not work around it: write C:\UI-specs\URL-to-Code\packs\fxfer-v6\app\src\screens\file-transfer-tracking\BLOCKED.md saying what is wrong and what you saw, then stop. That is reported to
  the person running the tool and costs you nothing.
- There is no backend: src/services/file-transfer-tracking.ts answers with mock data. A control that would call the server does what the spec
  says happens on screen, nothing more.
- Keep the page's class names and every `data-kit*` attribute. Edit only the files named below. Do not touch src/routes.ts,
  src/menu.ts or src/main.tsx (they are generated).
- Files you may edit or add: src/screens/file-transfer-tracking/**, public/assets/file-transfer-tracking/**, src/services/file-transfer-tracking.ts.
- Anything you had to guess (the spec says [UNKNOWN]) goes in C:\UI-specs\URL-to-Code\packs\fxfer-v6\app/docs/ui-specs/file-transfer-tracking/GUESSED.md, one line each.

Check your work (the dev server is already running; never start or stop it):
- `npx tsc --noEmit` in C:\UI-specs\URL-to-Code\packs\fxfer-v6\app: only errors in your own files count.
- the visual + behavior check, run from C:\UI-specs\URL-to-Code\: PowerShell `$env:URL="http://localhost:5180/#/file-transfer-tracking"; $env:WAIT_ROOT="1"; node scripts/verify.mjs fxfer-v6/file-transfer-tracking` (bash: `URL="http://localhost:5180/#/file-transfer-tracking" WAIT_ROOT=1 node scripts/verify.mjs fxfer-v6/file-transfer-tracking`); read C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking\verify\report.json
- Its `states:` line replays the capture's own clicks on your screen (Search with the form as it loads, a grid row, each
  dialog, the side menu). A state that passed before you started and fails after your change is your change's fault, not the
  kit's: the check fails on it. Never add a rule that stops one of those clicks (a "criteria required" message in front of a
  Search that the live page answered with rows).
- These states of the check already fail on this screen before you start: tab-flyout@client (21.71% off). They are the kit's or the capture's and are already reported to the person running the tool: do not fix them, do not work around them, and do not write BLOCKED.md because of them. Every other state passes now and must still pass when you are done.
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking/capture/js/), and anything the spec lists that the port does not show yet.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

----
This is attempt 2. The previous attempt was checked and did not pass. The check printed:

```
verify (the app at http://localhost:5180/#/file-transfer-tracking against the captured reference): bad_pct 2.7% (limit 5), size_delta_px [0,0] (height limit ±4), worst section disclaimer-the-website-is-prov
states: 1/13 match the live page | ✗ tooltip: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ search: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ row-d1: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ menu-open: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ menu-flyout: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ menu-close: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ tab-flyout: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ layout@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ menu-open@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ menu-flyout@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ menu-close@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking | ✗ tab-flyout@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
cluster 1: css box 24,240,1704,168 bad_px 16358 under div#divExtLinksCloseButton.row "Close"
cluster 2: css box 24,528,1248,72 bad_px 8307 under div#ToDate_parent.col-md-2.editor-col "To DateTo Date"
cluster 3: css box 24,432,1080,72 bad_px 6481 under span#a1538fc3-33f1-4c13-9f08-a9e9c40d3598.k-input-inner "select a value..."
worst cluster, ref | candidate: C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking\verify\worst.png
motion: 1/1 match
behavior: no scroll/media/timing probes recorded for this screen (nothing to compare) | console: 0 error(s), 0 React warning(s), 0 failed resource(s)
sections (bad_pct, height delta): 1:file-transfer-tracking 1.93% | 2:pagebody 3.29% | 3:disclaimer-the-website-is-prov 4.24%
States that worked on this screen before your change and fail now. Your change broke them (this is not a kit problem: do not write BLOCKED.md for it). Each is a click path of C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking\kit\states.json (Search, then a grid row, then its dialog...): find the rule or handler of yours that stops it and remove it:
- tooltip: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- search: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- row-d1: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- menu-open: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- menu-flyout: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- menu-close: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- tab-flyout: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- layout@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- menu-open@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- menu-flyout@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- menu-close@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
- tab-flyout@client: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5180/#/file-transfer-tracking
Pictures: C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking\verify\candidate.png (the app), diff.png, report.json; the reference is C:\UI-specs\URL-to-Code\packs\fxfer-v6\screens\file-transfer-tracking\reference.png
```

Fix what it reports (start with the first problem), keep everything that already works, and run the check again yourself where the task says how (its "Check your work" lines, when it has them; otherwise `npx tsc --noEmit`).
A `states:` line with ✗ (a dropdown, tooltip, dialog or the side menu replayed on the app) measures the kit, which you may not edit: if one of those is wrong because of the kit or the shell, write the BLOCKED.md the task names instead of working around it. Not so for a state the report lists under "worked on this screen before your change": your change broke that one, so fix your change.
