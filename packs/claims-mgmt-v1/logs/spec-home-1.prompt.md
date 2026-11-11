Task: spec claims-mgmt-v1/home
Screen folder: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Write the UI spec of the screen `claims-mgmt-v1/home` (Home, https://uximc.mms.tst.pgwcloud.net/Home/MyHome/). It will be rebuilt in React 19 (TypeScript, Vite, plain CSS).
1. Read C:\UI-specs\URL-to-Code\/AGENTS.md (phase 1), then follow C:\UI-specs\URL-to-Code\/.claude/skills/ui-spec/SKILL.md exactly, with its templates in references/.
   Wherever the skill says `outputs/<screen>/`, use the screen folder above; wherever it says `<screen>`, use `claims-mgmt-v1/home`.
2. Look at the pictures it names (sections/*.png, explore/shots/*) with your image viewer.
3. Write only C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/spec/UI_SPEC.md and C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/spec/tasks.md.
4. Run `npm run check -- claims-mgmt-v1/home` in C:\UI-specs\URL-to-Code\ and fix the spec until it prints ✓.
Never invent: every requirement carries an evidence tag; what the capture does not show is `[UNKNOWN: …]`.
Do not run `npm run go`, `npm run capture` or `npm run ui`, and do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This is the HOME page, and it also defines the shell every screen of the rebuilt app shares: the header and the site menu (opened by `#pageBannerMenu > nav > div > i`).
The menu's full tree, read from the live site, is in C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/menu.json. List every module and item from it in Navigation and Components and cite it as [asset:menu.json].
The hover/flyout look of the menu is in C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/menu/*.png: one picture per module, taken with the menu open and that module hovered (the explorer records the menu opening, not the CSS hover flyouts). Look at every one and cite them as [asset:menu/<file>.png]. Items under "Claims Management" open the screens of this app; every other item is shown (and hovers/opens the same way) but goes nowhere.
This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The harvest in C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/kit/screen.json (section 18 of facts.md) is exact: field types, option lists, validation messages, grid columns, dialogs. Pictures of each state: C:\UI-specs\URL-to-Code\packs\claims-mgmt-v1\screens\home/kit/states/*.png. Cite every widget and dialog as [kit:<id>]. The kit builds the widgets: specify what they show and hold, not how to code a dropdown.
