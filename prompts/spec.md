Task: spec {{id}}
Screen folder: {{dir}}

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

Write the UI spec of the screen `{{id}}` ({{label}}, {{url}}). It will be rebuilt in React 19 (TypeScript, Vite, plain CSS).
1. Read {{root}}/AGENTS.md (phase 1), then follow {{root}}/.claude/skills/ui-spec/SKILL.md exactly, with its templates in references/.
   Wherever the skill says `outputs/<screen>/`, use the screen folder above; wherever it says `<screen>`, use `{{id}}`.
2. Look at the pictures it names (sections/*.png, explore/shots/*) with your image viewer.
3. Write only {{dir}}/spec/UI_SPEC.md and {{dir}}/spec/tasks.md.
4. Run `npm run check -- {{id}}` in {{root}} and fix the spec until it prints ✓.
Never invent: every requirement carries an evidence tag; what the capture does not show is `[UNKNOWN: …]`.
Do not run `npm run go`, `npm run capture` or `npm run ui`, and do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).
{{extra}}
