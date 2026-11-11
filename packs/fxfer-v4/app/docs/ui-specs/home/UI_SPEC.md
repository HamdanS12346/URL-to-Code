# UI SPEC — fxfer-v4/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome/ · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[M##]` motion · `[ctl:key]` element · `[val:key]` validator · `[asset:path]` file under this screen folder · `[js:…]` · `[css:…]` · `[UNKNOWN: …]`

## 1. Overview
This is the Provider portal landing page (“My Home”): a fixed header + global navigation shell, a static hero/banner, and a portal footer. [asset:reference.png]

Primary tasks:
- Open the side menu (“hamburger”) to navigate to other modules (and to this app’s File Transfer Services screens). [ctl:button-main-menu-2, asset:kit/states/menu-open.png]

## 2. Layout
Page: fixed header (`#pageHeader`) at top; body has `padding-top: 62px` to clear the header; main content is a single hero band followed by a footer. [asset:facts.json]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---:|---|---|---|---|
| Fixed header | `div#pageHeader` `{pageHeader}` | 0,0,1920,66 | reference | flex row, `justify-content: space-between` | bg `rgb(43,58,68)`, bottom border `4px solid rgb(48,179,254)` | [asset:facts.json] |
| Header: logo | `div#pageBannerLogo` | 50,1.73,116.52,58.53 | reference | contains anchor+img | logo img `117×57` CSS | [ctl:pageBannerLogo, asset:facts.json] |
| Header: system name | `div.system-name` `{button}` | 201.52,12,320,18 | reference | centered text | `Poppins` 18px 700, color `rgb(48,179,254)` | [ctl:button, asset:facts.json] |
| Header: app title | `div.app-title` `{button-medicaid-management-solutions}` | 201.52,30,320,20 | reference | centered text | `Poppins` 15px, uppercase, color `rgb(255,255,255)` | [ctl:button-medicaid-management-solutions, asset:facts.json] |
| Header: AAG menu bar | `ul.aag-menu` `{button-2}` | 1137.2,21.42,684.8,19.14 | reference | horizontal Kendo menu | items are `li.k-item` | [ctl:button-2, asset:facts.json] |
| Header: side-menu opener | `div#pageBannerMenu` `{pageBannerMenu}` containing `i.fa-bars` `{button-main-menu-2}` | 1852,0,68,62 | reference | square button area | bg `rgb(48,179,254)` | [ctl:button-main-menu-2, asset:content.md] |
| Top divider row | `div#mcbRowBorder.row` `{mcbRowBorder}` | 0,62,1920,44.5 | reference | full-width row | bottom border `1px solid rgb(179,179,179)` | [asset:sections/01-mcbrowborder.png] |
| Main content | `div#pageBody.row` | 0,106.5,1920,526.05 | reference | contains `form#mainForm` | white background | [asset:sections/01-mcbrowborder.png] |
| Hero image cell | `td.myHome_img` `{img-stethoscope-and-tablet-laying-on}` | 8,108.5,1235.69,522.05 | reference | left column | background image `assets/Content/dxc.ua3.core.home.myhome.png` | [asset:sections/01-mcbrowborder.png] |
| Help icon | `span.fa-stack` `{button-help}` | 1844.25,77,43.75,35 | reference | floats at upper-right of hero band | icon in blue circle | [ctl:button-help, asset:reference.png] |
| Footer | `footer` | 0,633,1920,119 | reference | two rows: dark link bar + white build bar | dark bar bg `rgb(43,58,68)` | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 2.1 Header (`#pageHeader`)
- Left: client logo image link. [ctl:pageBannerLogo, ctl:link-client-logo, asset:content.md]
- Center: system name “Medicaid Management Solutions” (blue) above app title “Final Test” (white). [ctl:button, ctl:button-medicaid-management-solutions, asset:content.md]
- Right: horizontal menu items (“en”, “MESSAGES”, … “LOGOUT”) plus the hamburger button at far right. [ctl:button-2, asset:reference.png]

### 2.2 Hero band
- The band is a two-column layout: a large grayscale image on the left and a right column with title and subtitle text. [asset:sections/01-mcbrowborder.png]
- Title text (as an H2 in `content.md`): “Medicaid Management Solutions”. [asset:content.md]
- Subtitle text: “Charting a New Direction for Better Healthcare Outcomes”. [asset:content.md]

### 2.3 Footer
- Dark subfooter bar with four links centered: “Disclaimer”, “Website Requirements”, “Privacy Policy”, “Cookie Policy”. [asset:sections/02-disclaimer-the-website-is-prov.png]
- White build bar: copyright left and “Server / Build Date / v…” right. [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` @ 14px/14px | page body | [asset:facts.json] |
| `--font-title` | `Poppins, Arial, Helvetica, sans-serif` | header titles | [asset:facts.json] |
| `--color-text` | `rgb(51, 51, 51)` | default body text | [asset:facts.json] |
| `--color-header-bg` | `rgb(43, 58, 68)` | header + subfooter | [asset:facts.json] |
| `--color-accent` | `rgb(48, 179, 254)` | header border + hamburger bg | [asset:facts.json] |
| `--color-header-title` | `rgb(48, 179, 254)` | “Medicaid Management Solutions” (system name) | [asset:facts.json] |
| `--color-header-app` | `rgb(255, 255, 255)` | “Final Test” (app title) | [asset:facts.json] |

## 4. Assets
| file (under this screen folder) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header client logo | 117×57 | image is inside a link to `/Home/MyHome/` | [asset:facts.json] |
| `capture/assets/Content/dxc.ua3.core.home.myhome.png` | hero band background (left cell) | 1236×522 | used as CSS background image on `td.myHome_img` | [asset:facts.json] |
| `capture/assets/webfonts/fa-solid-900.woff2` | icon font | n/a | Font Awesome 6 Pro Solid | [asset:facts.json] |
| `capture/assets/fonts/Poppins.woff` | web font | n/a | Poppins regular | [asset:facts.json] |
| `capture/assets/fonts/Poppins-Bold.woff` | web font | n/a | Poppins bold | [asset:facts.json] |

## 5. Components
React component tree (shared components marked *shared*):
- `FxferHomePage`
  - `ProviderShell` *shared* — fixed header + AAG menu + hamburger side menu [ctl:button-main-menu-2]
  - `HomeHero` — hero image + title/subtitle [asset:sections/01-mcbrowborder.png]
  - `HelpIcon` *shared* — page help button at top-right of content [ctl:button-help]
  - `ProviderFooter` *shared* — subfooter links + build info [ctl:button-disclaimer]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `ProviderShell` *shared* | current route | side menu open/closed; flyout open | `pageBannerLogo`, `link-client-logo`, `button`, `button-medicaid-management-solutions`, `button-2`, `button-en`, `link-en`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2` | [asset:facts.json] |
| `HomeHero` | none | none | `img-stethoscope-and-tablet-laying-on` | [asset:content.md] |
| `HelpIcon` *shared* | none | open/closed help panel (unknown) | `button-help` | [ctl:button-help, asset:reference.png] |
| `ProviderFooter` *shared* | none | none | `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`, `footerCopyright`, `footerBuild` | [asset:content.md] |

### 5.1 Side menu tree (global)
The side menu shows these modules and items (tree taken from `menu.json`). Only items under **File Transfer Services** route to screens in this app; all other items are present in the menu but do not navigate in the rebuild. [asset:menu.json]

Modules (each module’s hover/flyout look is shown in `menu/*.png`):
- Administration [asset:menu/administration.png]
- Alert Notification [asset:menu/alert-notification.png]
- Claims Management [asset:menu/claims-management.png]
- Drug Rebate [asset:menu/drug-rebate.png]
- UI Examples [asset:menu/ui-examples.png]
- File Transfer Services [asset:menu/file-transfer-services.png]
- Integration [asset:menu/integration.png]
- Managed Care [asset:menu/managed-care.png]
- Member Management [asset:menu/member-management.png]
- Plan Management [asset:menu/plan-management.png]
- Program Integrity [asset:menu/program-integrity.png]
- PI Case Tracking [asset:menu/pi-case-tracking.png]
- Provider Enrollment [asset:menu/provider-enrollment.png]
- Provider Management [asset:menu/provider-management.png]
- Screening/Credentialing [asset:menu/screening-credentialing.png]
- TPL Case Tracking [asset:menu/tpl-case-tracking.png]
- TPL Policy [asset:menu/tpl-policy.png]
- TPL HIPP [asset:menu/tpl-hipp.png]
- Task Management [asset:menu/task-management.png]

## 6. Fields & validation
None. (No client-side validation rules found.) [asset:facts.json]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `sideMenuOpen` | boolean | false | clicking hamburger / close | shows/hides the side menu panel + backdrop overlay | [ctl:button-main-menu-2, asset:kit/states/menu-open.png] |
| `sideMenuFlyout` | `{ moduleLabel } | null` | null | hover a module in the open side menu | shows the hovered module’s flyout panel | [asset:kit/states/menu-flyout.png] |

Hidden at load (facts §12):
None. [asset:facts.json]

## 8. Behavior
### 8.1 Header
- THE SYSTEM SHALL show a tooltip reading “Client Logo” when the user hovers the client logo image. [ctl:pageBannerLogo, asset:kit/states/tooltip.png]

### 8.2 Side menu (shell)
- WHEN the user activates the hamburger icon (`#pageBannerMenu > nav > div > i`) THE SYSTEM SHALL open the side menu panel and show a gray backdrop overlay behind it. [ctl:button-main-menu-2, asset:snapshot/rendered.html, asset:kit/states/menu-open.png]
- WHEN the side menu is open THE SYSTEM SHALL show the list of module labels in a right-side vertical panel. [asset:kit/states/menu-open.png, asset:menu.json]
- WHEN the user hovers a module label in the open side menu THE SYSTEM SHALL show that module’s flyout submenu beside the module list. [asset:kit/states/menu-flyout.png, asset:menu/administration.png]

### 8.3 Page content
No measured behaviors on this page (no capture actions). [asset:facts.json]

### 8.4 Scroll behavior (facts §16: cite every [S##])
None. (No measured scroll behaviors in `facts.json`.) [asset:facts.json]

### 8.5 Media (facts §17: cite every [V##])
None. [asset:facts.json]

## 9. Navigation
Top header links:

| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-en` | `javascript:getLanguage();` | legacy JS | [ctl:link-en, asset:content.md] |
| `link-messages` | `javascript:getBroadcastMsg();` | legacy JS | [ctl:link-messages, asset:content.md] |
| `link-external-links` | `javascript:toggleVisibilityStyle('divExternalLinks');` | legacy JS | [ctl:link-external-links, asset:content.md] |
| `link-favorites` | `javascript:getFavorites();` | legacy JS | [ctl:link-favorites, asset:content.md] |
| `link-contact-us` | `javascript:getContactUs();` | legacy JS | [ctl:link-contact-us, asset:content.md] |
| `AAGMenu.MyAccount` | `/Home/MyAccount` | same tab navigation | [ctl:AAGMenu.MyAccount, asset:content.md] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab navigation | [ctl:link-logout, asset:content.md] |

Side menu items (full tree):
- Administration → Broadcast Message, FAQ’s, Manage Application Settings, Manage HTML Blocks, Manage Help, Manage Images, Manage IOC Settings, Manage Labels, Manage Menus, Manage Menu Items, Manage Messages, Manage Security Functions, Manage Security Rights, Manage Security Roles, Manage Services, Manage Subscriptions, Manage Module Events, Manage Users, Manage User Invitations. [asset:menu.json, asset:menu/administration.png]
- Alert Notification → Event Configuration, Subscriber Configuration, Event Subscription, Tracking. [asset:menu.json, asset:menu/alert-notification.png]
- Claims Management → Dashboard, Search Claims. [asset:menu.json, asset:menu/claims-management.png]
- Drug Rebate → Dashboard, Drug Rebate Status Tracking, Claims Verification, Create Drug Rebate Invoice, Create Utilization Invoice, List Drug Rebate Invoices, List Utilization Invoices, View Drug Rebate Invoice, View Utilization Invoice, Research, Export DR Utilization, Export utilization data, Maintenance, Rebate Agreements, Help, Contact Us, Product List, Labeler. [asset:menu.json, asset:menu/drug-rebate.png]
- UI Examples → Page Elements / Widgets. [asset:menu.json, asset:menu/ui-examples.png]
- File Transfer Services → File Transfer Configuration, File Transfer Tracking, FTP Server Credentials. [asset:menu.json, asset:menu/file-transfer-services.png]
- Integration → Dashboard, Event To File Query Builder, File To Event Metadata, File To Event Orchestration, Event Status Tracking, System Process Tracking. [asset:menu.json, asset:menu/integration.png]
- Managed Care → Dashboard, MCE, Member, Network, Provider, HIPAA Transactions, Lock Out, Screening Results, Capitation, Reports, Reference Data, Provider MCE Enrollment, Managed Care MCE Member Network Provider Relationship Maintenance. [asset:menu.json, asset:menu/managed-care.png]
- Member Management → Member Management Search, Member Change Log, Member View / Edit, Member Change Request, Member Search, Member View, Member Enrollment. [asset:menu.json, asset:menu/member-management.png]
- Plan Management → Dashboard, Search Benefit Plans, Search Rate Codes, Search Special Package, Search Plan Enrollment, Search Client Plan. [asset:menu.json, asset:menu/plan-management.png]
- Program Integrity → Dashboard, Review Claims, Claim History, Claim Detail, Recoveries, Provider, Member, Report. [asset:menu.json, asset:menu/program-integrity.png]
- PI Case Tracking → Dashboard, Cases, Assignments, Tasks, Referral, Notices, Reports, Alerts, Help. [asset:menu.json, asset:menu/pi-case-tracking.png]
- Provider Enrollment → Provider Enrollment Dashboard, Search Enrollment Request, Search Provider, Search Enrollment, Search Enrollment Change, Search Enrollment Pending, Search Enrollment Terminated, Search Enrollment Reinstated, Search Provider Enrollment Tasks. [asset:menu.json, asset:menu/provider-enrollment.png]
- Provider Management → Dashboard, Provider, Provider Change Log, Provider Change Request, Provider Enrollment, Provider Enrollment Change, Provider Enrollment Pending, Provider Enrollment Terminated, Provider Enrollment Reinstated, Provider Enrollment Tasks, Provider Contract, Provider Contract Change, Provider Contract Pending, Provider Contract Terminated, Provider Contract Reinstated, Provider Contract Tasks, Reports. [asset:menu.json, asset:menu/provider-management.png]
- Screening/Credentialing → Dashboard, Screening Results, Screening Results Status, Credentialing Results, Credentialing Results Status. [asset:menu.json, asset:menu/screening-credentialing.png]
- TPL Case Tracking → Dashboard, Search TPL Cases, Search TPL Case Details, Search TPL Case Alerts, Search TPL Case Notes, Search TPL Case Messages. [asset:menu.json, asset:menu/tpl-case-tracking.png]
- TPL Policy → Dashboard, Policy Search, Add Policy, Policy Change Requests, Search Case Tracking, Search by Policy, Search by Case, Search by Member, Search by Provider, Search by Organization, Reports, Reference Data. [asset:menu.json, asset:menu/tpl-policy.png]
- TPL HIPP → Dashboard, Search HIPP Records. [asset:menu.json, asset:menu/tpl-hipp.png]
- Task Management → Dashboard, Search Tasks, Create Task, Task Calendar, Task Templates, Task Template Groups, Search Task Assignments, Search Task Assignment Calendar. [asset:menu.json, asset:menu/task-management.png]

Routing rules for this app:
- WHEN the user selects “File Transfer Configuration” from the side menu THE SYSTEM SHALL navigate to `#/fxfer-v4/file-transfer-configuration`. [asset:menu.json]
- WHEN the user selects “File Transfer Tracking” from the side menu THE SYSTEM SHALL navigate to `#/fxfer-v4/file-transfer-tracking`. [asset:menu.json]
- WHEN the user selects “FTP Server Credentials” from the side menu THE SYSTEM SHALL navigate to `#/fxfer-v4/ftp-server-credentials`. [asset:menu.json]
- WHEN the user selects any other side menu item THE SYSTEM SHALL not navigate (no route in this app). [asset:menu.json]

Footer links:

| trigger (key) | destination | how | evidence |
|---|---|---|---|
| `button-disclaimer` | [UNKNOWN: destination/action] | [UNKNOWN] | [ctl:button-disclaimer, asset:sections/02-disclaimer-the-website-is-prov.png] |
| `button-website-requirements` | [UNKNOWN: destination/action] | [UNKNOWN] | [ctl:button-website-requirements, asset:sections/02-disclaimer-the-website-is-prov.png] |
| `button-privacy-policy` | [UNKNOWN: destination/action] | [UNKNOWN] | [ctl:button-privacy-policy, asset:sections/02-disclaimer-the-website-is-prov.png] |
| `button-cookie-policy` | [UNKNOWN: destination/action] | [UNKNOWN] | [ctl:button-cookie-policy, asset:sections/02-disclaimer-the-website-is-prov.png] |

## 10. Server interactions
None observed. [asset:facts.json]

## 11. Accessibility
- Hamburger icon has `aria-label="Main Menu"` and `role="button"`. [asset:snapshot/rendered.html, ctl:button-main-menu-2]
- Logo and language menu use tooltips (Kendo tooltip) with visible popover in `kit/states/tooltip.png`. [asset:kit/states/tooltip.png]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `spec/parity.spec.ts` uses them.

| key | what it is | evidence |
|---|---|---|
| `pageBannerLogo` | header client logo container | [ctl:pageBannerLogo] |
| `link-client-logo` | link to Home (`/Home/MyHome/`) | [ctl:link-client-logo] |
| `button` | system name title (“Medicaid Management Solutions”) | [ctl:button] |
| `button-medicaid-management-solutions` | app title (“Final Test”) | [ctl:button-medicaid-management-solutions] |
| `button-2` | header horizontal AAG menu bar container (`ul.aag-menu`) | [ctl:button-2] |
| `button-en` | language menu item container | [ctl:button-en] |
| `link-en` | language menu link (`javascript:getLanguage()`) | [ctl:link-en] |
| `AAGMenu.BroadcastMsg` | header “MESSAGES” menu item container | [ctl:AAGMenu.BroadcastMsg] |
| `link-messages` | “MESSAGES” link | [ctl:link-messages] |
| `AAGMenu.ExternalLinks` | header “EXTERNAL LINKS” menu item container | [ctl:AAGMenu.ExternalLinks] |
| `link-external-links` | “EXTERNAL LINKS” link | [ctl:link-external-links] |
| `AAGMenu.Favorites` | header “FAVORITES” menu item container | [ctl:AAGMenu.Favorites] |
| `link-favorites` | “FAVORITES” link | [ctl:link-favorites] |
| `AAGMenu.ContactUs` | header “CONTACT US” menu item container | [ctl:AAGMenu.ContactUs] |
| `link-contact-us` | “CONTACT US” link | [ctl:link-contact-us] |
| `AAGMenu.MyAccount` | header “MY ACCOUNT” menu item container | [ctl:AAGMenu.MyAccount] |
| `AAGMenu.Logout` | header “LOGOUT” menu item container | [ctl:AAGMenu.Logout] |
| `link-logout` | “LOGOUT” link (`/Security/LogoutFromMenu`) | [ctl:link-logout] |
| `button-main-menu-2` | hamburger icon/button (opens side menu) | [ctl:button-main-menu-2] |
| `button-help` | help icon button (book) | [ctl:button-help] |
| `button-disclaimer` | footer link button “Disclaimer” | [ctl:button-disclaimer] |
| `button-website-requirements` | footer link button “Website Requirements” | [ctl:button-website-requirements] |
| `button-privacy-policy` | footer link button “Privacy Policy” | [ctl:button-privacy-policy] |
| `button-cookie-policy` | footer link button “Cookie Policy” | [ctl:button-cookie-policy] |

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v4/screens/home/spec/parity.spec.ts`

## 13. Open questions
1. What does the header “MESSAGES / EXTERNAL LINKS / FAVORITES / CONTACT US” open in the legacy portal (panel vs new page), and what should the rebuild do for those entries? [UNKNOWN]
2. What does the floating Help (book icon) do on this page (opens a panel, modal, or new window)? [UNKNOWN]
3. What are the destinations/contents for the footer items (Disclaimer / Website Requirements / Privacy Policy / Cookie Policy) in this environment? [UNKNOWN]

## 14. Motion
None. (Nothing moved or animated in capture.) [asset:facts.json]
