Task: spec ffxfer-index-v1/file-transfer-tracking
Screen folder: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Write the UI spec of the screen `ffxfer-index-v1/file-transfer-tracking` (File Transfer Tracking, https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking). It will be rebuilt in React 19 (TypeScript, Vite, plain CSS).
1. Read C:\UI-specs\URL-to-Code\/AGENTS.md (phase 1), then follow C:\UI-specs\URL-to-Code\/.claude/skills/ui-spec/SKILL.md exactly, with its templates in references/.
   Wherever the skill says `outputs/<screen>/`, use the screen folder above; wherever it says `<screen>`, use `ffxfer-index-v1/file-transfer-tracking`.
2. Look at the pictures it names (sections/*.png, explore/shots/*) with your image viewer.
3. Write only C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/spec/UI_SPEC.md and C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/spec/tasks.md.
4. Run `npm run check -- ffxfer-index-v1/file-transfer-tracking` in C:\UI-specs\URL-to-Code\ and fix the spec until it prints ✓.
Never invent: every requirement carries an evidence tag; what the capture does not show is `[UNKNOWN: …]`.
Do not run `npm run go`, `npm run capture` or `npm run ui`, and do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).

This screen is shown inside the shared shell (header + site menu) that the home page's spec covers. The capture was scoped to its content area `#pageBody > main`: specify that area; for the shell write one line under Layout: "Wrapped in the shared shell (see the home spec)."
This screen belongs to a Provider portal (Kendo UI for jQuery). Read C:\UI-specs\URL-to-Code\kits\provider\KIT.md first. The harvest in C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/kit/screen.json (section 18 of facts.md) is exact: field types, option lists, validation messages, grid columns, dialogs. Pictures of each state: C:\UI-specs\URL-to-Code\packs\ffxfer-index-v1\screens\file-transfer-tracking/kit/states/*.png. Cite every widget and dialog as [kit:<id>]. The kit builds the widgets: specify what they show and hold, not how to code a dropdown.
