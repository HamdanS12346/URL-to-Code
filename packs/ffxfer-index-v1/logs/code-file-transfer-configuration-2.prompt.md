Task: code ffxfer-index-v1/file-transfer-configuration
Screen folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration
App folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Build the screen "File Transfer Configuration" in src/screens/file-transfer-configuration/ (route #/file-transfer-configuration). It renders inside the shared shell (src/shell), which is already built: do not change the shell.

The app in this folder is React 19 + TypeScript + Vite, plain CSS, no UI library, hash routes (src/main.tsx, src/routes.ts).
The files you start from are a mechanical port of the captured page (`npm run port`): the page's own markup, class names, CSS
and assets, with every control's `data-testid` from the spec already stamped. It looks right but does nothing yet.

Read first:
- the spec: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/spec/UI_SPEC.md and tasks.md (the authority; build every task)
- the behavior digest next to the ported Page.tsx: BEHAVIOR.md (what each explored action did, with measured animation timings)
- pictures, full resolution: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/sections/*.png (the page band by band) and C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/explore/shots/* (each state after an action)
- facts: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/facts.md, the page's real CSS C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/snapshot/used.css, its DOM C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/snapshot/rendered.html
- the build rules in C:\UI-specs\URL-to-Code\/AGENTS.md, "Phase 2 — Build", "Build rules"

Rules:
- Copy, do not redesign: spacing, sizes, colors, fonts, borders and text exactly as captured. No new features, no improvements.
- Build behavior as real React state: menus, dropdowns, tabs, dialogs, conditional fields, validation, hover effects, animations with the measured numbers.
- Keep every `data-testid`. Keep the page's class names and style.css; add CSS only for states the capture showed.
- There is no backend: a control that would call the server does what the spec says happens on screen, nothing more.
- Edit only the files named below. Do not touch src/routes.ts, src/menu.ts or src/main.tsx (they are generated).
- Files you may edit or add: src/screens/file-transfer-configuration/**, public/assets/file-transfer-configuration/**, src/services/file-transfer-configuration.ts.
- Finish with `npx tsc --noEmit` in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app passing. Anything you had to guess (the spec says [UNKNOWN]) goes in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app/docs/ui-specs/file-transfer-configuration/GUESSED.md, one line each.
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration/capture/js/), and anything the spec lists that the port does not show yet.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

----
This is attempt 2. The previous attempt was checked and did not pass. The check printed:

```
verify (the app at http://localhost:5180/#/file-transfer-configuration against the captured reference): bad_pct 0.87% (limit 5), size_delta_px [0,0] (height limit ±4), worst section pagebody
states: 0/2 match the live page | ✗ dropdown: locator.click: Timeout 5000ms exceeded. | ✗ search: locator.click: Timeout 5000ms exceeded.
cluster 1: css box 1656,96,192,672 bad_px 16431 under li.k-item.k-menu-item[data-testid=button-plan-management] "Plan Management Reference Data Pharmacy "
cluster 2: css box 216,0,288,48 bad_px 758 under div.system-name[data-testid=button] "Medicaid Management Solutions"
cluster 3: css box 1200,24,216,24 bad_px 424 under a.k-link.display-block[data-testid=link-external-links] "External Links"
worst cluster, ref | candidate: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration\verify\worst.png
motion: 1/1 match
behavior: nothing recorded to compare (stage 2 of the capture has no behave.json: npm run go -- <screen> --from survey) | console: 1 error(s), 0 React warning(s), 0 failed resource(s)
  console ✗ Invalid aria prop `aria-role` on <div> tag. For details, see https://react.dev/link/invalid-aria-props
sections (bad_pct, height delta): 1:mainmenucontainer 0.87% | 2:pagebody 1.35% | 3:disclaimer-the-website-is-prov 1.03%
Pictures: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration\verify\candidate.png (the app), diff.png, report.json; the reference is C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-configuration\reference.png
```

Fix what it reports (start with the first problem), keep everything that already works, and run the check again yourself where the task says how.
