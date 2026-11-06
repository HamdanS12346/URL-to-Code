Task: plan {{id}}
Screen folder: {{dir}}

You are running unattended: nobody will answer questions. Do the task, then stop.

Plan the exploration of the screen `{{id}}` ({{label}}, {{url}}).
1. Read {{root}}/AGENTS.md (phase 0), then follow {{root}}/.claude/skills/explore-plan/SKILL.md exactly.
   Wherever the skill says `outputs/<screen>/`, use the screen folder above; wherever it says `<screen>`, use `{{id}}`.
2. Look at every picture it names (explore/survey/map/*.jpg) with your image viewer.
3. Write only {{dir}}/explore/plan.json.
4. Run `npm run check:plan -- {{id}}` in {{root}} and fix plan.json until it prints ✓.
Do not run `npm run go`, `npm run capture` or `npm run ui`, and do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).
{{extra}}
