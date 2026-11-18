Task: flows fxfer-v9/file-transfer-configuration wave 5
Screen folder: C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration

You are running unattended: nobody will answer questions. Do the task, then stop.

Write any files you create/modify as UTF-8 text (not UTF-16). If you use PowerShell commands to write files, use Set-Content/Out-File with -Encoding utf8.
Do not use the `apply_patch` helper here; it is unreliable in this environment. Edit files using Python/Node/PowerShell file writes (UTF-8) instead.

You plan the next step of exploring the live screen `fxfer-v9/file-transfer-configuration` (File Transfer Configuration, https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchSourceLocations). A script drives the browser; you only decide what it does.
The goal: reach EVERY state of this screen (results, dialogs, dialogs inside dialogs, edit modes, tabs, parts a radio or a value shows,
validation messages) up to the click that would save or create something. The script blocks every write and never clicks a commit button,
so you cannot break anything: be thorough.

1. Read C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration\flows\plans\wave-5.frontier.json: the states still open in this wave, each with its candidates (the elements of its top layer, ids e1, e2...).
2. For each state, open its folder (`dir`): look at map.png (the numbers are the element ids) and shot.png with your image viewer, and read
   candidates.md (kind, text, label, rules such as maxlength / required / email, dropdown options). Read C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration/flows/FLOWS.md for what
   was already reached and what each earlier click did: never plan a click that already led to a known state from the same place.
3. Write C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration\flows\plans\wave-5.json as JSON:
   {"nodes": [ {"node": "n1", "name": "search-results",
       "actions": [ {"el": "e7", "do": "dblclick", "why": "opens the row's detail window", "name": "view-configuration"},
                    {"el": "e3", "do": "select", "value": "M", "why": "Run Monthly shows the day-of-month part"},
                    {"el": "e12", "do": "click", "setup": [{"el": "e4", "do": "fill", "value": "1234567890"}], "why": "Next with a valid NPI typed" } ],
       "same": [ {"el": "e9", "as": "e7", "why": "the other rows open the same window"} ] },
     {"node": "n2.1", "deadEnd": true, "reason": "a read-only view: only Close" } ]}
   - One entry per state of C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration\flows\plans\wave-5.frontier.json. "do": click | dblclick | hover | fill | select | check | press. "fill"/"select" need a "value" (a string).
   - "setup": steps done first, in order (type valid values so a button or a section opens; pick the dropdown value that reveals a part).
   - "name" (optional): lower-case words joined by "-", at most 32 characters, naming the state you expect (it names its folder).
   - At most 12 actions per state. Prefer actions that lead to DIFFERENT states: every button and link that opens something (View, Edit,
     Details, a tab, Create New, Next, a row: grid rows often open on double-click), a radio or dropdown value that changes the form, and
     wrong input that makes the page answer (letters in a number field, too long a value, a bad e-mail, a date out of range), each once.
     The script already measures every text box by itself (what it accepts, its length limit, the message it shows, what Save says with the
     form as it is), so do not spend actions on that.
   - Never plan an element marked `danger` (Save, Submit, Update, Delete, a bare Add/OK/Yes...): the gate rejects the plan.
   - Close, Cancel, Reset and Back only lead back: the script uses them itself.
   - A state with nothing new to open is a dead end: say so with a reason.
4. Run `node scripts/check-flows.mjs C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration\flows\plans\wave-5.json C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration\flows\plans\wave-5.frontier.json` in C:\UI-specs\URL-to-Code\ and fix the plan until it prints ✓.

What the capture already knows about this screen (dropdown options, dialogs it opened, the portal's conventions): C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration/kit/screen.json; the site kit's guide: C:\UI-specs\URL-to-Code\kits\provider\KIT.md.
Write only C:\UI-specs\URL-to-Code\packs\fxfer-v9\screens\file-transfer-configuration\flows\plans\wave-5.json. Do not run `npm run ui`, `npm run capture` or the browser, and do not open the live site.
Never open, print or copy .env files or anything under packs/*/auth/ (they hold the portal password and session).
