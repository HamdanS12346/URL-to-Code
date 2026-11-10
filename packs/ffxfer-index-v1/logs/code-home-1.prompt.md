Task: code ffxfer-index-v1/home
Screen folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home
App folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Build the home page in src/screens/home/ (route #/). It is a complete page with its own header (no shared shell). The header's side menu, tooltips and links already work through the kit (<KitScreen>).

The app in this folder is React 19 + TypeScript + Vite, plain CSS, no UI library, hash routes (src/main.tsx, src/routes.ts).
The files you start from are a mechanical port of the captured page (`npm run port`): the page's own markup, class names, CSS
and assets, with every control's `data-testid` from the spec already stamped. It looks right but does nothing yet.

Read first:
- the spec: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/spec/UI_SPEC.md and tasks.md (the authority; build every task)
- the behavior digest next to the ported Page.tsx: BEHAVIOR.md (what each explored action did, with measured animation timings)
- pictures, full resolution: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/sections/*.png (the page band by band) and C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/explore/shots/* (each state after an action)
- facts: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/facts.md, the page's real CSS C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/snapshot/used.css, its DOM C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/snapshot/rendered.html
- the build rules in C:\UI-specs\URL-to-Code\/AGENTS.md, "Phase 2 — Build", "Build rules"

Rules:
- Copy, do not redesign: spacing, sizes, colors, fonts, borders and text exactly as captured. No new features, no improvements.
- Build behavior as real React state: menus, dropdowns, tabs, dialogs, conditional fields, validation, hover effects, animations with the measured numbers.
- Keep every `data-testid`. Keep the page's class names and style.css; add CSS only for states the capture showed.
- There is no backend: a control that would call the server does what the spec says happens on screen, nothing more.
- Edit only the files named below. Do not touch src/routes.ts, src/menu.ts or src/main.tsx (they are generated).
- Files you may edit or add: src/shell/**, src/screens/home/**, public/assets/home/**.
- Finish with `npx tsc --noEmit` in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app passing. Anything you had to guess (the spec says [UNKNOWN]) goes in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\app/docs/ui-specs/home/GUESSED.md, one line each.
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The kit in src/kit already rebuilds every Kendo widget (dropdowns, pickers, numeric boxes, grids with sort/pager, tooltips, dialogs, collapsible panels, Search/Reset/Create New/Save, the side menu), and the port already uses it (<KitWidget id=… />, <KitScreen …>). Never write your own dropdown, date picker, tooltip, grid or dialog, and do not edit src/kit. Your job is what the kit cannot know: conditional fields and cascades from the screen's own script (C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\home/capture/js/), and anything the spec lists that the port does not show yet.
