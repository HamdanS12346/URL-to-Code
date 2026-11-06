Task: code {{id}}
Screen folder: {{dir}}
App folder: {{app}}

You are running unattended: nobody will answer questions. Do the task, then stop.

{{goal}}

The app in this folder is React 19 + TypeScript + Vite, plain CSS, no UI library, hash routes (src/main.tsx, src/routes.ts).
The files you start from are a mechanical port of the captured page (`npm run port`): the page's own markup, class names, CSS
and assets, with every control's `data-testid` from the spec already stamped. It looks right but does nothing yet.

Read first:
- the spec: {{dir}}/spec/UI_SPEC.md and tasks.md (the authority; build every task)
- the behavior digest next to the ported Page.tsx: BEHAVIOR.md (what each explored action did, with measured animation timings)
- pictures, full resolution: {{dir}}/sections/*.png (the page band by band) and {{dir}}/explore/shots/* (each state after an action)
- facts: {{dir}}/facts.md, the page's real CSS {{dir}}/snapshot/used.css, its DOM {{dir}}/snapshot/rendered.html
- the build rules in {{root}}/AGENTS.md, "Phase 2 — Build", "Build rules"

Rules:
- Copy, do not redesign: spacing, sizes, colors, fonts, borders and text exactly as captured. No new features, no improvements.
- Build behavior as real React state: menus, dropdowns, tabs, dialogs, conditional fields, validation, hover effects, animations with the measured numbers.
- Keep every `data-testid`. Keep the page's class names and style.css; add CSS only for states the capture showed.
- There is no backend: a control that would call the server does what the spec says happens on screen, nothing more.
- Edit only the files named below. Do not touch src/routes.ts, src/menu.ts or src/main.tsx (they are generated).
{{files}}
- Finish with `npx tsc --noEmit` in {{app}} passing. Anything you had to guess (the spec says [UNKNOWN]) goes in {{app}}/docs/ui-specs/{{name}}/GUESSED.md, one line each.
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).
{{extra}}
