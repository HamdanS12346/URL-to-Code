# UI SPEC ? pe-v1/dashboard

> Source https://uximc.mms.tst.pgwcloud.net/ProviderEnrollment/Dashboard ? viewport 1905?1080 CSS px @ dpr 1 ? legacy built with jquery 3.7.1 ? target React 19
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` ? `[js:?]` ? `[aspx:?]` ? `[css:selector]` ? `[kit:kN]` widget/dialog ? `[UNKNOWN: ?]`

## 1. Overview
Provider Enrollment dashboard content area: a grid of navigation tiles, a status summary, a ?Quick Search? criteria panel, and a ?Search Results? grid. [asset:sections/01-mcbrowborder.png]

Primary tasks:
- Navigate to Provider Enrollment modules via tile links. [ctl:link-search-enrollment-application-2]
- Search for provider enrollment applications by ATN / name / NPI. [ctl:searchButton]

## 2. Layout
Wrapped in the shared shell (see the home spec).

Page content area: `#pageBody > main` at 0,106.17,1904.67,1186.56; background rgb(255, 255, 255). [asset:sections/01-mcbrowborder.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Content root | `main` | 0,106.17,1904.67,1186.56 | sections/01 | Two-column layout: left tile grid; right sidebar (Status + Quick Search); Search Results full-width below | bg rgb(255,255,255) | [asset:sections/01-mcbrowborder.png] |
| Help icon (page) | `button-help` | 1828.92,77,43.75,35 | sections/01 | Top-right floating control | Font Awesome icon stack | [ctl:button-help, asset:sections/01-mcbrowborder.png] |
| Preferences icon | `settingPreferencesButton` | 1869.67,106.17,35,28 | sections/01 | Top-right floating control | Font Awesome gear icon | [ctl:settingPreferencesButton, asset:sections/01-mcbrowborder.png] |
| Tile: Dashboard | `link-dashboard-8` | 15,149.17,226,266 | sections/01 | Tile grid (row 1 col 1) | 2px solid rgb(0,179,136) border; radius 0 0 5px 5px | [ctl:link-dashboard-8, asset:sections/01-mcbrowborder.png] |
| Tile: Search Enrollment Application | `link-search-enrollment-application-2` | 271,149.17,226,266 | sections/01 | Tile grid (row 1 col 2) | Same tile styling as Dashboard | [ctl:link-search-enrollment-application-2, asset:sections/01-mcbrowborder.png] |
| Tile: Search Enrollment Reports | `link-search-enrollment-reports-2` | 527,149.17,226,266 | sections/01 | Tile grid (row 1 col 3) | Same tile styling as Dashboard | [ctl:link-search-enrollment-reports-2, asset:sections/01-mcbrowborder.png] |
| Tile: Workflow Dashboard | `link-workflow-dashboard-2` | 783,149.17,226,266 | sections/01 | Tile grid (row 1 col 4) | Same tile styling as Dashboard | [ctl:link-workflow-dashboard-2, asset:sections/01-mcbrowborder.png] |
| Tile: Workflow Applications | `link-workflow-applications-2` | 15,430.17,226,266 | sections/01 | Tile grid (row 2 col 1) | Same tile styling as Dashboard | [ctl:link-workflow-applications-2, asset:sections/01-mcbrowborder.png] |
| Tile: Workflow Configuration | `link-workflow-configuration-2` | 271,430.17,226,266 | sections/01 | Tile grid (row 2 col 2) | Same tile styling as Dashboard | [ctl:link-workflow-configuration-2, asset:sections/01-mcbrowborder.png] |
| Tile: Workflow Tasks | `link-workflow-tasks-2` | 527,430.17,226,266 | sections/01 | Tile grid (row 2 col 3) | Same tile styling as Dashboard | [ctl:link-workflow-tasks-2, asset:sections/01-mcbrowborder.png] |
| Tile: New Enrollment Entry | `link-new-enrollment-entry-2` | 783,430.17,226,266 | sections/01 | Tile grid (row 2 col 4) | Same tile styling as Dashboard | [ctl:link-new-enrollment-entry-2, asset:sections/01-mcbrowborder.png] |
| Tile: Resume Enrollment Entry | `link-resume-enrollment-entry-2` | 15,711.17,226,266 | sections/01 | Tile grid (row 3 col 1) | Same tile styling as Dashboard | [ctl:link-resume-enrollment-entry-2, asset:sections/01-mcbrowborder.png] |
| Status panel | `div.dshbrd-panel-container` | 1443.5,134.17,431.17,230.67 | sections/01 | Right sidebar, top | 2px solid rgb(119,119,119) border; radius 0 0 5px 5px | [asset:sections/01-mcbrowborder.png] |
| Quick Search panel | `div.content-panel-container` | 1443.5,393.83,446.17,541.67 | sections/01 | Right sidebar, below Status | radius 10px; shadow rgba(0,0,0,0.08) 0px 8px 10px 1px | [asset:sections/01-mcbrowborder.png] |
| Search Results panel | `div.content-panel-container` | 0,1006.17,1904.67,262.56 | sections/01 | Full-width below tiles/sidebar | radius 10px; shadow rgba(0,0,0,0.08) 0px 8px 10px 1px | [asset:sections/01-mcbrowborder.png] |
| Search Results grid | `providerEnrollmentResultsGrid` | 0.67,1084.83,1903.33,168.23 | sections/01 | Kendo grid + pager | Kendo grid styling; pager includes Refresh and page size | [ctl:providerEnrollmentResultsGrid, kit:k1, asset:sections/01-mcbrowborder.png] |

### 2.1 Status panel
Panel header shows a 64?64 icon at left (gray background image) and the title ?Status?. Body shows a bulleted list of four status counts. [asset:sections/01-mcbrowborder.png]

Status list items (verbatim):
- Submitted - 31 [asset:sections/01-mcbrowborder.png]
- Pending - 770 [asset:sections/01-mcbrowborder.png]
- Return To Provider - 38 [asset:sections/01-mcbrowborder.png]
- Waiting for Attachments - 15 [asset:sections/01-mcbrowborder.png]

### 2.2 Quick Search panel
Header text ?Quick Search?. Body contains 4 labeled fields (ATN, Last Name, Business Name, NPI), each with a ??? help icon, and two buttons at the bottom right: ?Clear? and ?Search?. [asset:sections/01-mcbrowborder.png]

### 2.3 Search Results panel
Header text ?Search Results?. Body contains a Kendo grid and pager; the captured empty state row reads ?There are no records found.? and pager info reads ?No Items to display?. [kit:k1, asset:sections/01-mcbrowborder.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-body | Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome 14px/14px | body text | [asset:sections/01-mcbrowborder.png] |
| --color-bg | rgb(255, 255, 255) | page background | [asset:sections/01-mcbrowborder.png] |
| --color-text | rgb(51, 51, 51) | default text | [asset:sections/01-mcbrowborder.png] |
| --color-tile-border | rgb(0, 179, 136) | tile borders | [asset:sections/01-mcbrowborder.png] |
| --radius-input | 5px | Quick Search text inputs | [asset:sections/01-mcbrowborder.png] |
| --radius-panel | 10px | Quick Search / Search Results panels | [asset:sections/01-mcbrowborder.png] |
| --shadow-panel | rgba(0, 0, 0, 0.08) 0px 8px 10px 1px | Quick Search / Search Results panels | [asset:sections/01-mcbrowborder.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell client logo | 116?56 | In shared shell | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/Content/dxc.ua3.core.icon.dshbrd.status.png` | Status panel icon | 64?64 | background-image on `.dshbrd-icon-status` | [asset:assets/Content/dxc.ua3.core.icon.dshbrd.status.png] |
| `assets/_svg/svg-1.svg` | Search Results pager refresh icon | 16?16 | used in `link-refresh` | [asset:assets/_svg/svg-1.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `DashboardPage`
  - `DashboardTiles`
  - `DashboardStatusPanel`
  - `DashboardQuickSearch`
  - `DashboardSearchResultsGrid` (Kit widget) [kit:k1]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `DashboardPage` | none | none | `button-help`, `settingPreferencesButton` | [ctl:button-help, ctl:settingPreferencesButton] |
| `DashboardTiles` | none | none | `link-dashboard-8`, `link-search-enrollment-application-2`, `link-search-enrollment-reports-2`, `link-workflow-dashboard-2`, `link-workflow-applications-2`, `link-workflow-configuration-2`, `link-workflow-tasks-2`, `link-new-enrollment-entry-2`, `link-resume-enrollment-entry-2` | [asset:sections/01-mcbrowborder.png] |
| `DashboardQuickSearch` | fields | `criteria` | `ATN`, `LastName`, `BusinessName`, `NPI`, `ATNHelp`, `LastNameHelp`, `BusinessNameHelp`, `NPIHelp`, `clearButton`, `searchButton` | [asset:sections/01-mcbrowborder.png] |
| `DashboardSearchResultsGrid` | `criteria` | `results` | `providerEnrollmentResultsGrid`, `link-refresh` | [ctl:providerEnrollmentResultsGrid, kit:k1] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `ATN` | ATN | text | empty | no | max length 10; numeric-only regex `^([0-9])*$` | ATN has a maximum length of 10 characters. / ATN is restricted to numeric characters only [0-9]. | on input/change/blur | [ctl:ATN, kit:k1] |
| `LastName` | Last Name | text | empty | no | max length 50; regex `^([[a-zA-Z'.,\-]+(?: [a-zA-Z'.,\-]+)*|[^ -])*$` | Last Name has a maximum length of 50 characters. / Last Name contains invalid characters: Must start with a letter. Allowed characters: letters, single spaces, and [' , . -]. | on input/change/blur | [ctl:LastName, kit:k1] |
| `BusinessName` | Business Name | text | empty | no | max length 50; regex `^[A-Za-z0-9 `!@#$&()_+\-={}|[\]"',.\/?]+$` | Business Name has a maximum length of 50 characters. / Business Name contains invalid characters. The characters ; * ^ : ~ < > % and Unicode are not allowed. | on input/change/blur | [ctl:BusinessName, kit:k1] |
| `NPI` | NPI | text | empty | no | max length 10; numeric-only regex `^([0-9])*$` | NPI  has a maximum length of 10 characters. / NPI  is restricted to numeric characters only [0-9]. | on change/keydown/focusout | [ctl:NPI, kit:k1] |

- IF the user clicks ?Search? with all criteria empty THEN THE SYSTEM SHALL show the error banner ?Resolve the following form field errors and try again.? and the bullet ?At least one search criteria value must be provided to initiate the search.? [asset:kit/states/search.png, ctl:searchButton]

Help icons (tooltips):
- `ATNHelp`: ?The ATN is a unique number assigned to an enrollment request.? [ctl:ATNHelp]
- `LastNameHelp`: ?Enter the Last Name.? [ctl:LastNameHelp]
- `BusinessNameHelp`: ?Enter Business Name? [ctl:BusinessNameHelp]
- `NPIHelp`: ?Enter the ten digit National Provider Identifier assigned by NPPES.? [ctl:NPIHelp]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `criteria` | model | empty strings | typing in fields; Clear | Quick Search input values | [ctl:ATN, ctl:LastName, ctl:BusinessName, ctl:NPI] |
| `searchValidationError` | ui | hidden | Search with empty criteria | Shows error banner with messages | [asset:kit/states/search.png] |
| `results` | data | empty | Search / Refresh | Search Results grid rows + pager info | [kit:k1, ctl:providerEnrollmentResultsGrid] |

Hidden at load (facts ?12):
None. [asset:sections/01-mcbrowborder.png]

## 8. Behavior
### 8.1 Tiles
- WHEN the user clicks a tile link THE SYSTEM SHALL navigate to its target (see ?9). [ctl:link-search-enrollment-application-2]

### 8.2 Quick Search
- THE SYSTEM SHALL show the Quick Search fields ATN, Last Name, Business Name, and NPI, each with a ??? help icon. [asset:sections/01-mcbrowborder.png]
- WHEN the user clicks `clearButton` THE SYSTEM SHALL clear ATN, Last Name, Business Name, and NPI to empty. [ctl:clearButton, kit:k1]
- WHEN the user clicks `searchButton` with all criteria empty THE SYSTEM SHALL show the validation error banner (see ?6). [asset:kit/states/search.png, ctl:searchButton]
- WHEN the user clicks `searchButton` with at least one criterion present THE SYSTEM SHALL update the Search Results grid. [ctl:searchButton, kit:k1, UNKNOWN: what request/rows populate the grid]

### 8.3 Search Results grid
- THE SYSTEM SHALL render the Search Results Kendo grid widget with columns ATN, Name, NPI, Date, Status (and hidden columns Date and Quick Search Flag). [kit:k1]
- THE SYSTEM SHALL show the empty-grid message ?There are no records found.? when there are no rows. [kit:k1, asset:sections/01-mcbrowborder.png]
- THE SYSTEM SHALL show a pager with a Refresh control (`link-refresh`) and page size (default 10). [kit:k1, ctl:link-refresh]

### 8.4 Scroll behavior
None in the content area. (Shared shell header uses headroom with offset 150; see home spec.) [kit:k1]

### 8.5 Media
None. [asset:sections/01-mcbrowborder.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-dashboard-8` | (anchor) | same tab | [ctl:link-dashboard-8] |
| `link-search-enrollment-application-2` | `/ProviderEnrollment/SearchProviderApplication` | same tab | [ctl:link-search-enrollment-application-2] |
| `link-search-enrollment-reports-2` | `/ProviderEnrollment/SearchEnrollmentReports` | same tab | [ctl:link-search-enrollment-reports-2] |
| `link-workflow-dashboard-2` | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard` | new window/tab (external) | [ctl:link-workflow-dashboard-2] |
| `link-workflow-applications-2` | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications` | new window/tab (external) | [ctl:link-workflow-applications-2] |
| `link-workflow-configuration-2` | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration` | new window/tab (external) | [ctl:link-workflow-configuration-2] |
| `link-workflow-tasks-2` | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks` | new window/tab (external) | [ctl:link-workflow-tasks-2] |
| `link-new-enrollment-entry-2` | `/ProviderEnrollment/CreateSecureEnrollment` | same tab | [ctl:link-new-enrollment-entry-2] |
| `link-resume-enrollment-entry-2` | `/ProviderEnrollment/ResumeSecureEnrollment` | same tab | [ctl:link-resume-enrollment-entry-2] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response ? UI | evidence |
|---|---|---|---|---|
| Search Results pager Refresh (`link-refresh`) | GET `/api/ProviderEnrollment/SearchProviderApplication/` | (kit service stub) | Refreshes Search Results grid | [ctl:link-refresh, kit:k1, UNKNOWN: response contract not observed] |
| Quick Search Search (`searchButton`) | [UNKNOWN: request not observed in capture] | (kit service stub) | Populates Search Results grid | [ctl:searchButton, kit:k1, UNKNOWN] |

## 11. Accessibility
- Each Quick Search input uses its visible label (?ATN?, ?Last Name?, ?Business Name?, ?NPI?). [asset:sections/01-mcbrowborder.png]
- Help icon controls (`ATNHelp`, `LastNameHelp`, `BusinessNameHelp`, `NPIHelp`) are focusable/clickable and show their tooltips. [ctl:ATNHelp]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/pe-v1/screens/dashboard/spec/parity.spec.ts` uses them:
`button-help`, `settingPreferencesButton`,
`link-dashboard-8`, `link-search-enrollment-application-2`, `link-search-enrollment-reports-2`, `link-workflow-dashboard-2`, `link-workflow-applications-2`, `link-workflow-configuration-2`, `link-workflow-tasks-2`, `link-new-enrollment-entry-2`, `link-resume-enrollment-entry-2`,
`ATN`, `ATNHelp`, `LastName`, `LastNameHelp`, `BusinessName`, `BusinessNameHelp`, `NPI`, `NPIHelp`, `clearButton`, `searchButton`,
`providerEnrollmentResultsGrid`, `link-refresh`.

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/pe-v1/screens/dashboard/spec/parity.spec.ts`

### 12.x Control census (for the spec gate)
The capture includes these required interactive keys (many belong to the shared shell / portal chrome; see home spec for their behavior):
[ctl:pageBannerLogo], [ctl:button], [ctl:button-medicaid-management-solutions], [ctl:button-2]
[ctl:AAGMenu.BroadcastMsg], [ctl:link-messages], [ctl:AAGMenu.ExternalLinks], [ctl:link-external-links]
[ctl:AAGMenu.Favorites], [ctl:link-favorites], [ctl:AAGMenu.ContactUs], [ctl:link-contact-us]
[ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:link-logout], [ctl:button-main-menu-2], [ctl:button-help]
[ctl:settingPreferencesButton], [ctl:07f9f9c0-d730-4d9c-821b-722cd0e2124e], [ctl:link-dashboard-8]
[ctl:51c9bb65-30b2-69e0-e053-4c65a28f8a9e], [ctl:37791c1b-823b-438f-bc52-c5bfa08c88f5]
[ctl:51c9bb65-afb8-69e0-e053-4c65a28f8a9e], [ctl:51c9bb65-b0b8-69e0-e053-4c65a28f8a9e]
[ctl:51c9bb65-b1b8-69e0-e053-4c65a28f8a9e], [ctl:51c9bb65-adb8-69e0-e053-4c65a28f8a9e]
[ctl:51c9bb65-66b8-69e0-e053-4c65a28f8a9e], [ctl:51c9bb65-91b8-69e0-e053-4c65a28f8a9e]
[ctl:recentlySubmitted], [ctl:2], [ctl:1], [ctl:6], [ctl:8], [ctl:ATNHelp], [ctl:ATN], [ctl:LastNameHelp]
[ctl:LastName], [ctl:BusinessNameHelp], [ctl:BusinessName], [ctl:NPIHelp], [ctl:NPI], [ctl:clearButton]
[ctl:searchButton], [ctl:button-21], [ctl:button-22], [ctl:3d62baa6-23a1-485a-9b96-f9e45af0200e]
[ctl:button-23], [ctl:5b442900-049b-4642-a72e-b97cb934c340], [ctl:button-disclaimer]
[ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy]


## 13. Open questions
1. What is the content and behavior of the preferences dialog opened by `settingPreferencesButton` (EnrollmentPreferenceOverlay)? [UNKNOWN]
2. What happens on Search with empty criteria: does it show the validation banner (as in `kit/states/search.png`) or does it list a row (as reported by the kit harvest summary)? [UNKNOWN]
3. `NPI` is a Kendo maskedtextbox and ?looks right? but the kit does not rebuild its behavior; what behaviors are required (masking, formatting, allowed keys)? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL apply the CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1, easing `ease`) to the measured elements. [M01]
