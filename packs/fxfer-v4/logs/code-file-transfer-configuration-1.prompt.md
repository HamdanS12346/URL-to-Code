Task: code fxfer-v4/file-transfer-configuration
Screen folder: C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration
App folder: C:\UI-specs\URL-to-Code\packs\fxfer-v4\app

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Build the screen "File Transfer Configuration" in src/screens/file-transfer-configuration/ (route #/file-transfer-configuration). It renders inside the shared shell (src/shell), which is already built: do not change the shell.

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
1. C:\UI-specs\URL-to-Code\packs\fxfer-v4\app\docs\ui-specs\file-transfer-configuration\TODO.md: the checklist for this screen, generated from the capture. Do every item that is not marked done.
2. the spec: C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration/spec/UI_SPEC.md and tasks.md.
3. C:\UI-specs\URL-to-Code\kits\provider\KIT.md (sections "API" and "What is left for the code step").
4. the screen's own script, for conditional fields and cascades: C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration/capture/js/ (only the file(s) named in the checklist).
5. pictures only if a task needs one: C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration/kit/states/*.png (each state) and C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration/sections/*.png.
Do not read style.css, C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration/snapshot/used.css, full.css or rendered.html whole (they are megabytes): search them for one
selector when you need it. Do not look for BEHAVIOR.md or explore/shots: a kit screen has none. Do not read other screens'
folders (src/screens/<other>): each screen is built on its own, and copying another screen's workaround spreads its bug.

Rules:
- Copy, do not redesign. No new features, no improvements, no styles the capture did not show.
- Never write your own dropdown, date picker, tooltip, grid, dialog, collapse, side menu or backdrop, and never edit src/kit or
  src/shell. Never hide, cover or re-style the shell or the side menu from a screen (no `display:none` on #mainMenuContainer,
  no `pointer-events` on a backdrop, no timers that fight the kit).
- If something the kit or the shell owns is wrong (the menu does not open or close, a dialog is missing or empty, a widget
  misbehaves), do not work around it: write C:\UI-specs\URL-to-Code\packs\fxfer-v4\app\src\screens\file-transfer-configuration\BLOCKED.md saying what is wrong and what you saw, then stop. That is reported to
  the person running the tool and costs you nothing.
- There is no backend: src/services/file-transfer-configuration.ts answers with mock data. A control that would call the server does what the spec
  says happens on screen, nothing more.
- Keep the page's class names and every `data-kit*` attribute. Edit only the files named below. Do not touch src/routes.ts,
  src/menu.ts or src/main.tsx (they are generated).
- Files you may edit or add: src/screens/file-transfer-configuration/**, public/assets/file-transfer-configuration/**, src/services/file-transfer-configuration.ts.
- Anything you had to guess (the spec says [UNKNOWN]) goes in C:\UI-specs\URL-to-Code\packs\fxfer-v4\app/docs/ui-specs/file-transfer-configuration/GUESSED.md, one line each.

Check your work (the dev server is already running; never start or stop it):
- `npx tsc --noEmit` in C:\UI-specs\URL-to-Code\packs\fxfer-v4\app: only errors in your own files count.
- the visual + behavior check, run from C:\UI-specs\URL-to-Code\: PowerShell `$env:URL="http://localhost:5180/#/file-transfer-configuration"; $env:WAIT_ROOT="1"; node scripts/verify.mjs fxfer-v4/file-transfer-configuration` (bash: `URL="http://localhost:5180/#/file-transfer-configuration" WAIT_ROOT=1 node scripts/verify.mjs fxfer-v4/file-transfer-configuration`); read C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration\verify\report.json
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (C:\UI-specs\URL-to-Code\packs\fxfer-v4\screens\file-transfer-configuration/capture/js/), and anything the spec lists that the port does not show yet.
