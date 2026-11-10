Task: code ffxfer-index-v1/file-transfer-tracking
Screen folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking
App folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Build the screen "File Transfer Tracking" in src/screens/file-transfer-tracking/ (route #/file-transfer-tracking). It renders inside the shared shell (src/shell), which is already built: do not change the shell.

The app in this folder is React 19 + TypeScript + Vite, plain CSS, no UI library, hash routes (src/main.tsx, src/routes.ts).
The files you start from are a mechanical port of the captured page (`npm run port`): the page's own markup, class names, CSS
and assets, with every control's `data-testid` from the spec already stamped. It looks right but does nothing yet.

Read first:
- the spec: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/spec/UI_SPEC.md and tasks.md (the authority; build every task)
- the behavior digest next to the ported Page.tsx: BEHAVIOR.md (what each explored action did, with measured animation timings)
- pictures, full resolution: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/sections/*.png (the page band by band) and C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/explore/shots/* (each state after an action)
- facts: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/facts.md, the page's real CSS C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/snapshot/used.css, its DOM C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/snapshot/rendered.html
- the build rules in C:\UI-specs\URL-to-Code\/AGENTS.md, "Phase 2 — Build", "Build rules"

Rules:
- Copy, do not redesign: spacing, sizes, colors, fonts, borders and text exactly as captured. No new features, no improvements.
- Build behavior as real React state: menus, dropdowns, tabs, dialogs, conditional fields, validation, hover effects, animations with the measured numbers.
- Keep every `data-testid`. Keep the page's class names and style.css; add CSS only for states the capture showed.
- There is no backend: a control that would call the server does what the spec says happens on screen, nothing more.
- Edit only the files named below. Do not touch src/routes.ts, src/menu.ts or src/main.tsx (they are generated).
- Files you may edit or add: src/screens/file-transfer-tracking/**, public/assets/file-transfer-tracking/**, src/services/file-transfer-tracking.ts.
- Finish with `npx tsc --noEmit` in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app passing. Anything you had to guess (the spec says [UNKNOWN]) goes in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app/docs/ui-specs/file-transfer-tracking/GUESSED.md, one line each.
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/capture/js/), and anything the spec lists that the port does not show yet.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

----
This is attempt 2. The previous attempt was checked and did not pass. The check printed:

```
verify (the app at http://localhost:5180/#/file-transfer-tracking against the captured reference): bad_pct 77.46% (limit 5), size_delta_px [0,0] (height limit ±4), worst section file-transfer-tracking
states: 0/3 match the live page | ✗ dropdown: locator.click: Timeout 5000ms exceeded. | ✗ tooltip: locator.hover: Timeout 5000ms exceeded. | ✗ search: locator.click: Timeout 5000ms exceeded.
cluster 1: css box 0,0,1920,1080 bad_px 1606187 under label#ToSizeLabel "To Size (KB)"
cluster 2: css box 48,0,120,48 bad_px 1169 under img ""
cluster 3: css box 792,792,144,24 bad_px 824 under a.subfooter-link[data-testid=button-website-requirements] "Website Requirements"
worst cluster, ref | candidate: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking\verify\worst.png
motion: 1/1 match
behavior: nothing recorded to compare (stage 2 of the capture has no behave.json: npm run go -- <screen> --from survey) | console: 0 error(s), 0 React warning(s), 0 failed resource(s)
sections (bad_pct, height delta): 1:file-transfer-tracking 87.7% | 2:pagebody 86.31% | 3:disclaimer-the-website-is-prov 41.79%
Pictures: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking\verify\candidate.png (the app), diff.png, report.json; the reference is C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking\reference.png
```

Fix what it reports (start with the first problem), keep everything that already works, and run the check again yourself where the task says how.
