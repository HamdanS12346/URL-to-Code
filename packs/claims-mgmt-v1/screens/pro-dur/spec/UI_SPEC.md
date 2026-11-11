# UI SPEC ? claims-mgmt-v1/pro-dur

> Source https://uximc.mms.tst.pgwcloud.net/ProDUR/ProDURDashBoard ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with jquery 3.7.1 ? target React 19
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` ? `[js:?]` ? `[aspx:?]` ? `[UNKNOWN: ?]`

## 1. Overview
Pro DUR dashboard inside the Claims Management module. The screen presents shortcut tiles (Audit/Create New/lookup lists) for Pro DUR features and a glossary of acronyms. [asset:reference.png]

Primary tasks:
- Open a Pro DUR feature from the dashboard tiles (example: ?Overuse Precaution?). [ctl:OverusePrecautionPanel]
- Use the ?Actions? panel to pick a feature area and select ?Create New? or ?Search?. [ctl:link-actions, ctl:link-create-new, ctl:link-search-2]
- Browse glossary acronyms in the ?Glossary? panel. [ctl:link-glossary, asset:sections/02-produrdashboard.png]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:reference.png]

Page: fluid width (document 1905?1600 CSS px), background rgb(255, 255, 255), scroll page; fixed header at top. [asset:reference.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Shell header | `div#pageHeader` `{pageHeader}` | 0,0,1905,62 | reference.png | fixed header | bg rgb(43, 58, 68) | [asset:reference.png] |
| Module/title bar | `div.menu` `{navigation-claims-managem}` | 0,62,1905,32 | sections/01 | horizontal bar | bg rgb(0, 238, 174) | [asset:sections/01-pro-dur.png] |
| Content area | `#pageBody > main` `{main}` | 0,138.5,1905,1343 | reference.png | page flow | white background | [asset:reference.png] |
| Footer | `footer` `{contentinfo}` | 0,1481.5,1905,118.5 | sections/03 | stacked footer bars | 12px text, dark subfooter | [asset:sections/03-disclaimer-the-website-is-prov.png] |

### 2.1 Content area (`#pageBody > main`)
The content area contains:
1) A top row of three bordered panels: Actions (left), Bookmarks (center), Glossary (right).
2) A multi-row grid of Pro DUR feature tiles (each tile is a bordered box with a bold label + underline divider + one or more actions/links inside). [asset:reference.png]

Top-row panels (boxes from the live DOM):
- Actions panel: x=30, y=138.5, w=438.75, h=303.75. [ctl:link-actions]
- Bookmarks panel: x=498.75, y=138.5, w=907.5, h=74. [ctl:link-bookmarks]
- Glossary panel: x=1436.25, y=138.5, w=438.75, h=280. [ctl:link-glossary]

Shared panel style (top row): background rgb(255, 255, 255), border `2px solid rgb(0, 179, 136)` on all sides; left icon is Font Awesome 48px on a vertical green-to-white gradient background. [asset:sections/02-produrdashboard.png]

Feature tiles (examples):
- ?Contra FDBDX? tile box: x=30, y=581.5, w=282.48, h=213; border `1px solid rgb(238, 238, 238)`; padding 7px. [asset:reference.png]
- ?Drug Allergy? tile box: x=342.48, y=581.5, w=282.48, h=101; same border and padding. [asset:reference.png]
- ?Suspended Claim Alerts? tile box: x=30, y=1268.5, w=282.48, h=88; same border and padding. [asset:reference.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome 14px/14px | body / most text | [ctl:OverusePrecautionPanel] |
| `--color-text` | rgb(51, 51, 51) | body text | [ctl:OverusePrecautionPanel] |
| `--color-shell-bg` | rgb(43, 58, 68) | fixed header background | [asset:reference.png] |
| `--color-module-bar` | rgb(0, 238, 174) | module/title bar background | [asset:sections/01-pro-dur.png] |
| `--color-panel-border` | rgb(0, 179, 136) | top-row panel border | [asset:sections/02-produrdashboard.png] |
| `--color-tile-border` | rgb(238, 238, 238) | feature tile border | [asset:reference.png] |
| `--radius-tooltip` | 5px | glossary tooltip boxes (black) | [asset:content.md] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shell header logo | 116?56 | tenant logo image | [ctl:pageBannerLogo, asset:reference.png] |

Icons:
- Font Awesome 6 Pro is used for header/menu icons and panel icons (rendered via icon fonts / `::before` glyphs). [asset:content.md]

## 5. Components
React component tree (shared components marked *shared*):
- `ProDURPage`
  - `Shell` *shared* ? header + module bar + footer (see home spec) [ctl:pageBannerLogo]
  - `DashboardPanels` ? Actions / Bookmarks / Glossary [ctl:link-actions]
  - `FeatureTileGrid` ? multi-row grid of tiles [ctl:OverusePrecautionPanel]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `Shell` *shared* | none (shared) | shared shell state (menu open/closed) | `pageBannerLogo`, `button-main-menu-2`, `activeModuleMenuFirstItem`, footer links | [ctl:pageBannerLogo, ctl:button-main-menu-2, ctl:activeModuleMenuFirstItem, ctl:button-disclaimer] |
| `DashboardPanels` | none | none observed | `link-actions`, `link-create-new*`, `link-search-*`, `link-bookmarks`, `link-glossary` | [ctl:link-actions, ctl:link-create-new, ctl:link-search-2, ctl:link-bookmarks, ctl:link-glossary] |
| `FeatureTileGrid` | none | none observed | `OverusePrecautionPanel` (one captured clickable tile) | [ctl:OverusePrecautionPanel, asset:reference.png] |
| `HelpButton` | none | none observed | `button-help` | [ctl:button-help] |

## 6. Fields & validation
None. [asset:reference.png]

| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|

## 7. State model
No client-side states were exercised in this capture (0 actions run). [asset:facts.md]

| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|

Hidden at load (facts ?12):
| element | shown when | evidence |
|---|---|---|
| None | ? | [asset:facts.md] |

## 8. Behavior
### 8.1 Dashboard panels
- THE SYSTEM SHALL render the Actions panel with three feature lines (?Alert Disposition?, ?Common Alert Criteria?, ?Allergy Diagnosis Enquiry?), each followed by ?Create New | Search? links. [ctl:link-actions, ctl:link-create-new, ctl:link-search-2, asset:sections/02-produrdashboard.png]
- THE SYSTEM SHALL render the Bookmarks panel title (?Bookmarks?) with an otherwise empty body in this capture. [ctl:link-bookmarks, asset:sections/02-produrdashboard.png]
- THE SYSTEM SHALL render the Glossary panel title (?Glossary?) and a scrollable list of acronyms (example visible: ADI, AGCSP, API, BC, DT, ER, FDB, FDBDX). [ctl:link-glossary, asset:sections/02-produrdashboard.png]

### 8.2 Feature tiles
- THE SYSTEM SHALL render a grid of feature tiles with the same labels and inner link list as shown in `reference.png` (examples: ?Contra FDBDX?, ?Drug Allergy?, ?Drug-Drug Interactions?, ?Overuse Precaution?, ?Pediatric?, ?Underuse Precaution?). [asset:reference.png]
- WHEN the user clicks the ?Overuse Precaution? tile THE SYSTEM SHALL perform an action that is not observable in this capture. [ctl:OverusePrecautionPanel, UNKNOWN: click outcome (navigate? open dialog?)]

### 8.3 Help
- WHEN the user activates the help button (book icon) THE SYSTEM SHALL perform an action that is not observable in this capture. [ctl:button-help, UNKNOWN: help action/outcome]

### 8.4 Scroll behavior (facts ?16: cite every [S##])
None. [asset:facts.md]

### 8.5 Media (facts ?17: cite every [V##])
None. [asset:facts.md]

## 9. Navigation
None observed. [asset:facts.md]

## 10. Server interactions
None observed. [asset:facts.md]

## 11. Accessibility
- Links and buttons are keyboard focusable where `tabIndex=0` (example: ?Actions? heading link). [ctl:link-actions]
- Shell focus outlines include a 0.2rem solid rgb(46, 171, 255) outline for app-title/system-name elements (shared shell behavior). [ctl:button-medicaid-management-solutions]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/claims-mgmt-v1/screens/pro-dur/spec/parity.spec.ts` uses them:

| key | description (from capture) | evidence |
|---|---|---|
| `pageBannerLogo` | header tenant logo (clickable) | [ctl:pageBannerLogo] |
| `button` | header title text container (?Medicaid Management Solutions?) | [ctl:button] |
| `button-medicaid-management-solutions` | header subtitle (?FINAL TEST?) | [ctl:button-medicaid-management-solutions] |
| `button-2` | header top-right nav list container | [ctl:button-2] |
| `AAGMenu.BroadcastMsg` | header nav item ?MESSAGES? | [ctl:AAGMenu.BroadcastMsg] |
| `link-messages` | ?MESSAGES? link (`javascript:getBroadcastMsg();`) | [ctl:link-messages] |
| `AAGMenu.ExternalLinks` | header nav item ?EXTERNAL LINKS? | [ctl:AAGMenu.ExternalLinks] |
| `link-external-links` | ?EXTERNAL LINKS? link (`toggleVisibilityStyle('divExternalLinks')`) | [ctl:link-external-links] |
| `AAGMenu.Favorites` | header nav item ?FAVORITES? | [ctl:AAGMenu.Favorites] |
| `link-favorites` | ?FAVORITES? link (`javascript:getFavorites();`) | [ctl:link-favorites] |
| `AAGMenu.ContactUs` | header nav item ?CONTACT US? | [ctl:AAGMenu.ContactUs] |
| `link-contact-us` | ?CONTACT US? link (`javascript:getContactUs();`) | [ctl:link-contact-us] |
| `AAGMenu.MyAccount` | header nav item ?MY ACCOUNT? | [ctl:AAGMenu.MyAccount] |
| `AAGMenu.Logout` | header nav item ?LOGOUT? | [ctl:AAGMenu.Logout] |
| `link-logout` | ?LOGOUT? link (`/Security/LogoutFromMenu`) | [ctl:link-logout] |
| `button-main-menu-2` | header hamburger (?Main Menu?) | [ctl:button-main-menu-2] |
| `button-8` | module menu bar container (?CLAIMS MANAGEMENT?) | [ctl:button-8] |
| `activeModuleMenu` | module dropdown list container | [ctl:activeModuleMenu] |
| `activeModuleMenuFirstItem` | module dropdown first item (?CLAIMS MANAGEMENT?) | [ctl:activeModuleMenuFirstItem] |
| `button-help` | help icon/button (book) | [ctl:button-help] |
| `link-actions` | dashboard panel heading link ?Actions? | [ctl:link-actions] |
| `link-create-new` | first ?Create New? link under ?Alert Disposition? | [ctl:link-create-new] |
| `link-search-2` | first ?Search? link under ?Alert Disposition? | [ctl:link-search-2] |
| `link-create-new-2` | ?Create New? link under ?Common Alert Criteria? | [ctl:link-create-new-2] |
| `link-search-3` | ?Search? link under ?Common Alert Criteria? | [ctl:link-search-3] |
| `link-create-new-3` | ?Create New? link under ?Allergy Diagnosis Enquiry? | [ctl:link-create-new-3] |
| `link-search-4` | ?Search? link under ?Allergy Diagnosis Enquiry? | [ctl:link-search-4] |
| `link-bookmarks` | dashboard panel heading link ?Bookmarks? | [ctl:link-bookmarks] |
| `link-glossary` | dashboard panel heading link ?Glossary? | [ctl:link-glossary] |
| `OverusePrecautionPanel` | ?Overuse Precaution? feature tile container (has jq:click handler) | [ctl:OverusePrecautionPanel] |
| `button-disclaimer` | footer link ?Disclaimer? | [ctl:button-disclaimer] |
| `button-website-requirements` | footer link ?Website Requirements? | [ctl:button-website-requirements] |
| `button-privacy-policy` | footer link ?Privacy Policy? | [ctl:button-privacy-policy] |
| `button-cookie-policy` | footer link ?Cookie Policy? | [ctl:button-cookie-policy] |

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/claims-mgmt-v1/screens/pro-dur/spec/parity.spec.ts`

## 13. Open questions
1. What is the click outcome for each feature tile (navigate vs open modal vs expand in place), including ?Overuse Precaution?? ? answer from: product owner / legacy user flow, or by capturing explored actions. [UNKNOWN]
2. What does the help button (book icon) do on this screen (open page-level help window/panel, route, or no-op)? ? answer from: legacy behavior (`displayPageLevelHelp`) or a capture with actions. [UNKNOWN]
3. What is the intended behavior of the ?Create New? / ?Search? links in the Actions panel (they currently point to the same dashboard URL in this capture)? ? answer from: product owner / legacy navigation. [UNKNOWN]

## 14. Motion
None. [asset:facts.md]
