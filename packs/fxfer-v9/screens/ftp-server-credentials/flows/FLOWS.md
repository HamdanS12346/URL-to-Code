# Flows of https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFTPServerCredentials

7 states (0 boundaries), 4 wave(s), plans by ai. 2026-11-17T11:38:34.305Z

Each state: its id (cite it in the spec as [flow:<id>]), kind, how it was reached, status. A **boundary** is where the live page would have sent a write (blocked): the flow ends there.
Folders: `<id>-<name>/` with shot.png, map.png (numbered), node.json (fields: what each text box accepts and the messages it shows; saveProbe: what Save shows with writes blocked), layer.html.

- **n0** at-rest (page) - explored [shot](n0-at-rest/shot.png)
  - field Server Name: accepts letters, digits, spaces, symbols, max 50 (stops typing)
  - **n1** search-results (results) via click "Search" - explored [shot](n1-search-results/shot.png)
    - tried: e3 "" click -> leaves the page for  (not followed: captured as a screen of its own); e4 "true" click -> nothing changed
    - **n1.1** criteria-expanded (part) via click "div.panel-icon.clickable" - explored [shot](n1.1-criteria-expanded/shot.png)
      - tried: e6 "Search" click -> nothing changed; e6 "Search" click -> the same state as n1; e9 "RanjanRanjan10.143.27.994ranjan27113/28/2025 Yes" dblclick -> the same state as n1.2; e7 "" click -> leaves the page for  (not followed: captured as a screen of its own); e8 "true" click -> the same state as n1
      - field Server Name: accepts letters, digits, spaces, symbols, max 50 (stops typing)
    - **n1.2** credential-details (dialog) "Edit FTP Server Credentials" via dblclick "RanjanRanjan10.143.27.994ranjan27113/28/2025 Yes" - explored [shot](n1.2-credential-details/shot.png)
      - never clicked: "Save" (commit: the kit marks it a Save)
      - field Description: accepts letters, digits, spaces, symbols, max 100 (stops typing)
      - field Transfer Mode: accepts letters, max 1 (stops typing)
      - field IP Server: accepts letters, digits, spaces, symbols, max 15 (stops typing)
      - field Port: accepts letters, digits, spaces, symbols
      - field Proxy Address: accepts letters, digits, spaces, symbols
      - field Proxy Port: accepts letters, digits, spaces, symbols
      - field Server User: accepts letters, digits, spaces, symbols, max 50 (stops typing)
      - Save with writes blocked ("Save"): no message; would send POST /api/FileTransfer/AddFTPServerCredentials/
      - **n1.2.1** invalidate (dialog) "Alert Confirmation" via click "Invalidate" - dead-end (Alert Confirmation has only a commit (Yes); No just returns to the already-explored credential details dialog.) [shot](n1.2.1-invalidate/shot.png)
        - never clicked: "Yes" (commit: a bare "Yes")
  - **n2** create-new (dialog) "Add FTP Server Credentials" via click "Create New" - dead-end (only Save is a commit (danger) and Cancel just closes the dialog) [shot](n2-create-new/shot.png)
    - never clicked: "Save" (commit: the kit marks it a Save)
  - **n3** criteria-collapsed (part) via click "div.panel-icon.clickable" - dead-end (only Create New opens the already-known add dialog, and the chevron just returns to the already-known expanded criteria state) [shot](n3-criteria-collapsed/shot.png)
