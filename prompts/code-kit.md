Task: code {{id}}
Screen folder: {{dir}}
App folder: {{app}}

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

{{goal}}

The app is React 19 + TypeScript + Vite, plain CSS, hash routes. This screen was captured with the Provider site kit: the files
you start from are a mechanical port of the live page, and they already look right (pixels within 1% on the first check) and
already behave like the portal for everything the kit knows. Your job is only what the kit cannot know.

Already done for you (do not rebuild, do not work around):
- Every Kendo widget (`<KitWidget id="kN" />`: dropdowns, number boxes, date/time pickers, the grid with synthetic rows, sort
  and pager), the tooltips, Search / Reset / Create New / Save / Cancel, collapsible panels, MVC validation messages, and the
  dialogs (`dialogs/Dialog*.tsx`, opened by `<KitScreen>`; a row opens its dialog the way the live grid does).
- The shared shell (`src/shell`): header, side menu (opens, flies out on hover, routes), title bar. It is not yours to edit.
- The kit's API is in the "API" section of {{guide}}. Do not read the files under src/kit to learn it.

Read, in this order, and nothing else unless a task needs it:
1. {{todo}}: the checklist for this screen, generated from the capture. Do every item that is not marked done.
2. the spec: {{dir}}/spec/UI_SPEC.md and tasks.md.
3. {{guide}} (sections "API" and "What is left for the code step").
4. the screen's own script, for conditional fields and cascades: {{dir}}/capture/js/ (only the file(s) named in the checklist).
5. pictures only if a task needs one: {{dir}}/kit/states/*.png (each state) and {{dir}}/sections/*.png.
Do not read style.css, {{dir}}/snapshot/used.css, full.css or rendered.html whole (they are megabytes): search them for one
selector when you need it. Do not look for BEHAVIOR.md or explore/shots: a kit screen has none. Do not read other screens'
folders (src/screens/<other>): each screen is built on its own, and copying another screen's workaround spreads its bug.

Rules:
- Copy, do not redesign. No new features, no improvements, no styles the capture did not show.
- Never write your own dropdown, date picker, tooltip, grid, dialog, collapse, side menu or backdrop, and never edit src/kit or
  src/shell. Never hide, cover or re-style the shell or the side menu from a screen (no `display:none` on #mainMenuContainer,
  no `pointer-events` on a backdrop, no timers that fight the kit).
- If something the kit or the shell owns is wrong (the menu does not open or close, a dialog is missing or empty, a widget
  misbehaves), do not work around it: write {{blocked}} saying what is wrong and what you saw, then stop. That is reported to
  the person running the tool and costs you nothing.
- There is no backend: src/services/{{name}}.ts answers with mock data. A control that would call the server does what the spec
  says happens on screen, nothing more.
- Keep the page's class names and every `data-kit*` attribute. Edit only the files named below. Do not touch src/routes.ts,
  src/menu.ts or src/main.tsx (they are generated).
{{files}}
- Anything you had to guess (the spec says [UNKNOWN]) goes in {{app}}/docs/ui-specs/{{name}}/GUESSED.md, one line each.

Check your work (the dev server is already running; never start or stop it):
- `npx tsc --noEmit` in {{app}}: only errors in your own files count.
- {{verify}}
- Its `states:` line replays the capture's own clicks on your screen (Search with the form as it loads, a grid row, each
  dialog, the side menu). A state that passed before you started and fails after your change is your change's fault, not the
  kit's: the check fails on it. Never add a rule that stops one of those clicks (a "criteria required" message in front of a
  Search that the live page answered with rows).
{{known}}
Do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).
{{extra}}
