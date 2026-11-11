Task: code claims-mgmt-v1/home
Screen folder: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home
App folder: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\app

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Build the home page in src/screens/home/ (route #/). It is a complete page with its own header (no shared shell). The header's side menu, tooltips and links already work through the kit (<KitScreen>).

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
1. C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\app\docs\ui-specs\home\TODO.md: the checklist for this screen, generated from the capture. Do every item that is not marked done.
2. the spec: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/spec/UI_SPEC.md and tasks.md.
3. C:\UI-specs\URL-to-Code\kits\provider\KIT.md (sections "API" and "What is left for the code step").
4. the screen's own script, for conditional fields and cascades: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/capture/js/ (only the file(s) named in the checklist).
5. pictures only if a task needs one: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/kit/states/*.png (each state) and C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/sections/*.png.
Do not read style.css, C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/snapshot/used.css, full.css or rendered.html whole (they are megabytes): search them for one
selector when you need it. Do not look for BEHAVIOR.md or explore/shots: a kit screen has none. Do not read other screens'
folders (src/screens/<other>): each screen is built on its own, and copying another screen's workaround spreads its bug.

Rules:
- Copy, do not redesign. No new features, no improvements, no styles the capture did not show.
- Never write your own dropdown, date picker, tooltip, grid, dialog, collapse, side menu or backdrop, and never edit src/kit or
  src/shell. Never hide, cover or re-style the shell or the side menu from a screen (no `display:none` on #mainMenuContainer,
  no `pointer-events` on a backdrop, no timers that fight the kit).
- If something the kit or the shell owns is wrong (the menu does not open or close, a dialog is missing or empty, a widget
  misbehaves), do not work around it: write C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\app\src\screens\home\BLOCKED.md saying what is wrong and what you saw, then stop. That is reported to
  the person running the tool and costs you nothing.
- There is no backend: src/services/home.ts answers with mock data. A control that would call the server does what the spec
  says happens on screen, nothing more.
- Keep the page's class names and every `data-kit*` attribute. Edit only the files named below. Do not touch src/routes.ts,
  src/menu.ts or src/main.tsx (they are generated).
- Files you may edit or add: src/screens/home/**, public/assets/home/**.
- Anything you had to guess (the spec says [UNKNOWN]) goes in C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\app/docs/ui-specs/home/GUESSED.md, one line each.

Check your work (the dev server is already running; never start or stop it):
- `npx tsc --noEmit` in C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\app: only errors in your own files count.
- the visual + behavior check, run from C:\UI-specs\URL-to-Code\: PowerShell `$env:URL="http://localhost:5180/#/"; $env:WAIT_ROOT="1"; node scripts/verify.mjs claims-mgmt-v1/home` (bash: `URL="http://localhost:5180/#/" WAIT_ROOT=1 node scripts/verify.mjs claims-mgmt-v1/home`); read C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home\verify\report.json
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/capture/js/), and anything the spec lists that the port does not show yet.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

----
This is attempt 2. The previous attempt was checked and did not pass. The check printed:

```
verify (the app at http://localhost:5180/#/ against the captured reference): bad_pct 0.13% (limit 5), size_delta_px [0,0] (height limit ±4), worst section mcbrowborder
states: 4/4 match the live page
cluster 1: css box 192,0,312,48 bad_px 1065 under div.system-name[data-testid=button] "Medicaid Management Solutions"
cluster 2: css box 1152,24,264,24 bad_px 656 under a.k-link.display-block[data-testid=link-messages] "Messages"
cluster 3: css box 1536,24,192,24 bad_px 529 under li#AAGMenu.MyAccount.k-item.k-menu-item[data-testid=AAGMenu.MyAccount] "My Account"
worst cluster, ref | candidate: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home\verify\worst.png
behavior: no scroll/media/timing probes recorded for this screen (nothing to compare) | console: 3 error(s), 3 React warning(s), 0 failed resource(s)
  console ✗ In HTML, whitespace text nodes cannot be a child of <table>. Make sure you don't have any extra whitespace between tags on each line of your source code.
  console ✗ In HTML, whitespace text nodes cannot be a child of <tr>. Make sure you don't have any extra whitespace between tags on each line of your source code.
  console ✗ In HTML, whitespace text nodes cannot be a child of <tbody>. Make sure you don't have any extra whitespace between tags on each line of your source code.
sections (bad_pct, height delta): 1:mcbrowborder 0% | 2:disclaimer-the-website-is-prov 0%
Pictures: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home\verify\candidate.png (the app), diff.png, report.json; the reference is C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home\reference.png
```

Fix what it reports (start with the first problem), keep everything that already works, and run the check again yourself where the task says how (its "Check your work" lines, when it has them; otherwise `npx tsc --noEmit`).
A `states:` line with ✗ (a dropdown, tooltip, dialog or the side menu replayed on the app) measures the kit, which you may not edit: if one of those is wrong because of the kit or the shell, write the BLOCKED.md the task names instead of working around it.
