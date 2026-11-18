# Flows of https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking

4 states (0 boundaries), 3 wave(s), plans by ai. 2026-11-17T11:26:43.126Z

Each state: its id (cite it in the spec as [flow:<id>]), kind, how it was reached, status. A **boundary** is where the live page would have sent a write (blocked): the flow ends there.
Folders: `<id>-<name>/` with shot.png, map.png (numbered), node.json (fields: what each text box accepts and the messages it shows; saveProbe: what Save shows with writes blocked), layer.html.

- **n0** at-rest (page) - explored [shot](n0-at-rest/shot.png)
  - tried: e4 "select a value...FileStatusList" click -> nothing changed; e5 "select a value...DirectionList" click -> nothing changed; e6 "select a value...TransportTypeList" click -> nothing changed; e7 "select a value...SourceLocation" click -> nothing changed; e9 "From Date" press -> nothing changed; e10 "To Date" press -> nothing changed; e15 "Search" click -> the same state as n2
  - field File ID: accepts letters, digits, spaces, symbols, max 50 (stops typing)
  - field File Name: accepts letters, digits, spaces, symbols, max 100 (stops typing)
  - field Trading Partner ID: accepts letters, digits, spaces, symbols, max 25 (stops typing)
  - **n1** search-criteria-collapsed (part) via click "div.panel-icon.clickable" - dead-end (Search Criteria is collapsed; only the collapse/expand toggle is present and it returns to the already-known expanded view (n0/n2).) [shot](n1-search-criteria-collapsed/shot.png)
  - **n2** after-search-empty (results) via click "Search" - explored [shot](n2-after-search-empty/shot.png)
    - tried: e9 "From Date" click -> nothing changed; e10 "To Date" click -> nothing changed; e4 "select a value...FileStatusList" select -> nothing changed; e5 "select a value...DirectionList" select -> nothing changed; e6 "select a value...TransportTypeList" select -> nothing changed; e7 "select a value...SourceLocation" select -> nothing changed
    - field File ID: accepts letters, digits, spaces, symbols, max 50 (stops typing)
    - field File Name: accepts letters, digits, spaces, symbols, max 100 (stops typing)
    - field Trading Partner ID: accepts letters, digits, spaces, symbols, max 25 (stops typing)
    - **n2.1** open-file-transfer (dialog) "File Transfer Tracking" via dblclick "0b3ad742-223b-4bc1-8b5b-867d8dfde039\\mapsftshrfs01\Commerci" - explored [shot](n2.1-open-file-transfer/shot.png)
      - tried: e3 "T5/25/2021 1:07 PM\\mapsftshrfs01\CommercialSharedFolder\Pro" dblclick -> nothing changed; e1 "There are no records found." dblclick -> nothing changed; e4 "There are no records found." dblclick -> nothing changed
