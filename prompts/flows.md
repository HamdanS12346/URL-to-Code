Task: flows {{id}} wave {{wave}}
Screen folder: {{dir}}

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

You plan the next step of exploring the live screen `{{id}}` ({{label}}, {{url}}). A script drives the browser; you only decide what it does.
The goal: reach EVERY state of this screen (results, dialogs, dialogs inside dialogs, edit modes, tabs, parts a radio or a value shows,
validation messages) up to the click that would save or create something. The script blocks every write and never clicks a commit button,
so you cannot break anything: be thorough.

The states open in this wave, with their candidates (the same as {{frontier}}; you do not need to print that file):
{{digest}}

1. The list above is the wave: each state with its candidates (the elements of its top layer, ids e1, e2...).
2. Open a state's map.png (the numbers are the element ids) and shot.png in its folder (`dir`) only where the list does not tell you what an
   element does. Read {{dir}}/flows/FLOWS.md for what was already reached and what each earlier click did: never plan a click that already
   led to a known state from the same place.
3. Write {{plan}} as JSON:
   {"nodes": [ {"node": "n1", "name": "search-results",
       "actions": [ {"el": "e7", "do": "dblclick", "why": "opens the row's detail window", "name": "view-configuration"},
                    {"el": "e3", "do": "select", "value": "M", "why": "Run Monthly shows the day-of-month part"},
                    {"el": "e12", "do": "click", "setup": [{"el": "e4", "do": "fill", "value": "1234567890"}], "why": "Next with a valid NPI typed" } ],
       "same": [ {"el": "e9", "as": "e7", "why": "the other rows open the same window"} ] },
     {"node": "n2.1", "deadEnd": true, "reason": "a read-only view: only Close" } ]}
   - One entry per state of {{frontier}}. "do": click | dblclick | hover | fill | select | check | press. "fill"/"select" need a "value" (a string).
   - "setup": steps done first, in order (type valid values so a button or a section opens; pick the dropdown value that reveals a part).
   - "name" (optional): lower-case words joined by "-", at most 32 characters, naming the state you expect (it names its folder).
   - At most {{max}} actions per state. Prefer actions that lead to DIFFERENT states: every button and link that opens something (View, Edit,
     Details, a tab, Create New, Next, a row: grid rows often open on double-click), a radio or dropdown value that changes the form, and
     wrong input that makes the page answer (letters in a number field, too long a value, a bad e-mail, a date out of range), each once.
     The script already does these by itself in every state, so do not spend actions on them: every text box (what it accepts, its length
     limit, its message), Save with the form as it is (writes blocked), what each radio / checkbox / dropdown value shows and hides in a
     window or a part, and every way out of a window (X, Close, Cancel: where each lands, and whether it asks first with an edit in the form).
   - Spend them on what only a plan can reach: a button or link INSIDE a window or a part (Create New, Add Another, Edit, Create from
     Existing, View), a row of a grid inside a window (double-click), each tab, each value of a dropdown that switches the form to another
     mode (a type, a protocol) with the setup that reveals what depends on it, and a button that validates with the form empty (Add Another).
     The same control in an Edit window as in an Add window is worth trying again: the two often differ.
   - Never plan an element marked `danger` (Save, Submit, Update, Delete, a bare Add/OK/Yes...): the gate rejects the plan.
   - Close, Cancel, Reset and Back only lead back: the script uses them itself.
   - A state with nothing new to open is a dead end: say so with a reason.
4. Run `node scripts/check-flows.mjs {{plan}} {{frontier}}` in {{root}} and fix the plan until it prints ✓.

What the capture already knows about this screen (dropdown options, dialogs it opened, the portal's conventions): {{kit}}; the site kit's guide: {{guide}}.
Write only {{plan}}. Do not run `npm run ui`, `npm run capture` or the browser, and do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).
