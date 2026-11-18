# UI SPEC — pe-v1/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jQuery 3.7.1 + Kendo UI for jQuery (Provider kit) · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[aspx:…]` · `[css:…]` · `[UNKNOWN: …]`

## 1. Overview
Landing page for the Provider portal module “Provider Enrollment”, showing a static hero panel and the shared portal shell (header + side menu + footer). [asset:reference.png]
Primary tasks:
- Open the side menu (hamburger) to access module navigation. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]
- Use Provider Enrollment flyout items to navigate to screens in this React app. [asset:menu.json, asset:menu/provider-enrollment.png]

## 2. Layout
Page: full-width (1920px) layout with a fixed header; body content starts below the header (body padding-top 62px). No scrolling at 1920×1080. [asset:reference.png, asset:sections/01-mcbrowborder.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---:|---|---|---|---|
| Header | `div#pageHeader` {pageHeader} | 0,0,1920,66 | reference.png | fixed top bar | bg rgb(43, 58, 68); border-bottom 4px solid rgb(48, 179, 254) | [asset:reference.png, ctl:pageBannerLogo, ctl:button-main-menu-2] |
| Body / Hero | `div#pageBody` {pageBody} | 0,106,1920,526 | sections/01… | two-column hero (image left, title right) | white background; hero image as background | [asset:sections/01-mcbrowborder.png] |
| Footer | `footer` | 0,632,1920,119 | sections/02… | dark subfooter links + copyright/build line | bg rgb(43, 58, 68) bar above a white strip | [asset:sections/02-disclaimer-the-website-is-prov.png, ctl:button-disclaimer] |

### 2.1 Header (shared shell)
- Left: client logo image link. [ctl:pageBannerLogo, asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png]
- Title stack: “Medicaid Management Solutions” with subtitle “Final Test”. [ctl:button, ctl:button-medicaid-management-solutions, asset:reference.png]
- Right: language (“en”) + top links: Messages, External Links, Favorites, Contact Us, My Account, Logout. [ctl:button-2, ctl:button-en, ctl:link-en, ctl:AAGMenu.BroadcastMsg, ctl:link-messages, ctl:AAGMenu.ExternalLinks, ctl:link-external-links, ctl:AAGMenu.Favorites, ctl:link-favorites, ctl:AAGMenu.ContactUs, ctl:link-contact-us, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-logout, asset:reference.png]
- Far right: hamburger menu button opens the side menu. [ctl:button-main-menu-2, asset:reference.png]

### 2.2 Body / Hero
- Hero image (stethoscope/tablet) on the left, with the heading on the right: “Medicaid Management Solutions” and tagline “Charting a New Direction for Better Healthcare Outcomes”. [asset:sections/01-mcbrowborder.png]

### 2.3 Footer (shared shell)
- Subfooter bar with four link-like items: Disclaimer · Website Requirements · Privacy Policy · Cookie Policy. [asset:sections/02-disclaimer-the-website-is-prov.png, ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy]
- Copyright + server/build info line. [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-base | Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome; 14px/14px | body + most shell text | [asset:reference.png] |
| --color-header-bg | rgb(43, 58, 68) | header + subfooter bar | [asset:reference.png, asset:sections/02-disclaimer-the-website-is-prov.png] |
| --color-accent | rgb(48, 179, 254) | header bottom border + hover accents | [asset:reference.png] |
| --color-text-default | rgb(61, 61, 61) | general text | [asset:sections/01-mcbrowborder.png] |
| --color-text-on-dark | rgb(255, 255, 255) | header/subfooter text | [asset:reference.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---:|---|---|
| assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png | header client logo | 117×57 | natural 169×82 | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| assets/Content/dxc.ua3.core.home.myhome.png | hero image (background) | 1236×522 | background-image on `td.myHome_img` | [asset:assets/Content/dxc.ua3.core.home.myhome.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `HomePage`
  - `PortalHeader` *shared* — logo, title, top links, hamburger [ctl:pageBannerLogo, ctl:button-main-menu-2]
  - `PortalSideMenu` *shared* — module list + flyouts [asset:menu.json]
  - `HomeHero` — hero image + headline [asset:sections/01-mcbrowborder.png]
  - `PortalFooter` *shared* — subfooter links + build info [ctl:button-disclaimer]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| PortalHeader | none (static labels from content.md) | none | pageBannerLogo, button, button-medicaid-management-solutions, button-2, button-en, link-en, AAGMenu.BroadcastMsg, link-messages, AAGMenu.ExternalLinks, link-external-links, AAGMenu.Favorites, link-favorites, AAGMenu.ContactUs, link-contact-us, AAGMenu.MyAccount, link-my-account, AAGMenu.Logout, link-logout, button-main-menu-2 | [asset:reference.png] |
| PortalSideMenu | menu tree from menu.json | menu open/closed; hovered module | button-main-menu-2, mainMenuClose, mainMenu (many menu item keys) | [asset:menu.json, asset:kit/states/menu-open.png] |
| HomeHero | none | none | pageBody | [asset:sections/01-mcbrowborder.png] |
| PortalFooter | build string text | none | button-disclaimer, button-website-requirements, button-privacy-policy, button-cookie-policy | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 5.1 Side menu tree (modules + items)
The full menu tree below is taken from `menu.json` (read from the live site). [asset:menu.json]

| module | module href | flyout items | rebuild navigation | hover/flyout screenshot | evidence |
|---|---|---|---|---|---|
| Administration | /BroadcastMessage/BroadcastMessageSearch |  | No-op (visible + hover only; does not navigate) | kit/states/menu-flyout.png | [asset:menu.json], [asset:kit/states/menu-flyout.png] |
| Alert Notification | /Notifications/EventNotificationSearch | Event Configuration<br>Subscriber Configuration<br>Event Subscription<br>Tracking | No-op (visible + hover only; does not navigate) | menu/alert-notification.png | [asset:menu.json], [asset:menu/alert-notification.png] |
| Claims Management | /ClaimsManagement/Dashboard | Search Claims<br>Pro DUR | No-op (visible + hover only; does not navigate) | menu/claims-management.png | [asset:menu.json], [asset:menu/claims-management.png] |
| Drug Rebate | /DrugRebate/Dashboard | Dashboard<br>Labeler<br>NDC<br>Claim Level Detail<br>CCN List<br>ROSI/PQAS List<br>Disputes List<br>Invoice Management<br>NDC Invoice Inquiry<br>CCN/NDC Association<br>PPA Maintenance<br>Incremental Adjustments<br>Postmark Dates<br>T-Bill Rates<br>340b Providers<br>Provider Recoupment<br>Invoice Process Flags<br>Fund Codes<br>Web Information | No-op (visible + hover only; does not navigate) | menu/drug-rebate.png | [asset:menu.json], [asset:menu/drug-rebate.png] |
| UI Examples | /Employee/UIExamples | Page Elements / Widgets | No-op (visible + hover only; does not navigate) | menu/ui-examples.png | [asset:menu.json], [asset:menu/ui-examples.png] |
| File Transfer Services | /FileTransfer/SearchSourceLocations | File Transfer Configuration<br>File Transfer Tracking<br>FTP Server Credentials | No-op (visible + hover only; does not navigate) | menu/file-transfer-services.png | [asset:menu.json], [asset:menu/file-transfer-services.png] |
| Integration | /Integration/Dashboard | Event To File Query Builder<br>File To Event Metadata<br>File To Event Orchestration<br>Event Status Tracking<br>System Process Tracking<br>Dashboard | No-op (visible + hover only; does not navigate) | menu/integration.png | [asset:menu.json], [asset:menu/integration.png] |
| Managed Care | /ManagedCare/Dashboard | MCE<br>Member<br>Network<br>Provider<br>HIPAA Transactions<br>Lock Out<br>Screening Results<br>Capitation<br>Reports<br>Reference Data<br>Provider MCE Enrollment<br>File Upload<br>Mass Transfer | No-op (visible + hover only; does not navigate) | menu/managed-care.png | [asset:menu.json], [asset:menu/managed-care.png] |
| Member Management | /MemberManagement/MemberLanding | Member<br>Medicaid Case<br>Fulfillment Materials<br>Fraud Protection<br>Group<br>Broker/Sales/TPA<br>Person | No-op (visible + hover only; does not navigate) | menu/member-management.png | [asset:menu.json], [asset:menu/member-management.png] |
| Plan Management | /PlanManagement/Dashboard | Reference Data<br>Pharmacy Related Data<br>Related Data<br>Rate Setting<br>File Upload<br>Manage Cycles | No-op (visible + hover only; does not navigate) | menu/plan-management.png | [asset:menu.json], [asset:menu/plan-management.png] |
| Program Integrity | /ProgramIntegrity/PIURDashboard | Dashboard<br>Manage Configurations<br>Custom Peer Groups<br>Service Types<br>Study Request<br>Suppressed Entities<br>Study Analysis Catalog<br>Manage Assignment Permissions<br>Predictive Model Definition<br>Targeted Query Definition<br>Analysis Review<br>Case Request | No-op (visible + hover only; does not navigate) | menu/program-integrity.png | [asset:menu.json], [asset:menu/program-integrity.png] |
| PI Case Tracking | /ProgramIntegrityCT/Dashboard | Dashboard<br>Case<br>Intake<br>Review Types<br>SuperCase<br>Contact<br>User Information<br>Letter Template<br>Bulk Load | No-op (visible + hover only; does not navigate) | menu/pi-case-tracking.png | [asset:menu.json], [asset:menu/pi-case-tracking.png] |
| Provider Enrollment | /ProviderEnrollment/Dashboard | Dashboard<br>Search Enrollment Application<br>Search Enrollment Reports<br>Workflow Dashboard<br>Workflow Applications<br>Workflow Configuration<br>Workflow Tasks<br>New Enrollment Entry<br>Resume Enrollment Entry | Routes within this React app (see mapping below) | menu/provider-enrollment.png | [asset:menu.json], [asset:menu/provider-enrollment.png] |
| Provider Management | /ProviderManagement/Dashboard | Providers<br>Owners and Managing Employees<br>IRS W-9 Tax IDs<br>Provider Summary<br>CLIA Numbers<br>EFT Enrollments<br>Workflow Items<br>MCO Enrollment List<br>Bulk Transactions Within Base ID<br>NPPR Transactions<br>PRN Transactions<br>EP Workflow Transactions<br>Base ID Termination Transactions<br>Mass Change Transactions<br>Change Of Ownership Transactions<br>Provider Dashboard<br>Managed Care Entities | No-op (visible + hover only; does not navigate) | menu/provider-management.png | [asset:menu.json], [asset:menu/provider-management.png] |
| Screening/Credentialing | /Credentialing/Dashboard | Dashboard<br>Credentialing Application Review<br>Search<br>Search Audit History<br>File Upload/Download/Search | No-op (visible + hover only; does not navigate) | menu/screening-credentialing.png | [asset:menu.json], [asset:menu/screening-credentialing.png] |
| TPL Case Tracking | /TPLCaseTracking/Dashboard | Case<br>Contact<br>Desktop Review Upload<br>Search Desktop Review<br>Worker Compensation Intake<br>Manage Case Assignment Permissions | No-op (visible + hover only; does not navigate) | menu/tpl-case-tracking.png | [asset:menu.json], [asset:menu/tpl-case-tracking.png] |
| TPL Policy | /TPLPolicy/Dashboard | Carrier<br>Employer<br>Policyholder<br>Absent Parent<br>Policy<br>TPL Policy Intake<br>Mass Carrier Migration<br>Non-Covered Code<br>Member<br>Carrier Crosswalk Rule<br>TPL Policy Letters<br>Member Quick View | No-op (visible + hover only; does not navigate) | menu/tpl-policy.png | [asset:menu.json], [asset:menu/tpl-policy.png] |
| TPL HIPP | /TPLHIPP/Dashboard | Search HIPP<br>Average Expenditure | No-op (visible + hover only; does not navigate) | menu/tpl-hipp.png | [asset:menu.json], [asset:menu/tpl-hipp.png] |
| Task Management | /TaskManagement/Dashboard | Dashboard<br>Task Template<br>Task List<br>Link Configuration<br>Routing Configuration<br>Manage User Association<br>Manage User Schedule<br>Bulk Recall | No-op (visible + hover only; does not navigate) | menu/task-management.png | [asset:menu.json], [asset:menu/task-management.png] |

Provider Enrollment item → rebuild route mapping (based on captured screens in `packs/pe-v1/screens/`; items without a captured screen stay unknown): [asset:menu.json]

| Provider Enrollment item | legacy href | rebuild route | evidence |
|---|---|---|---|
| Dashboard | /ProviderEnrollment/Dashboard | #/pe-v1/dashboard | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Search Enrollment Application | /ProviderEnrollment/SearchProviderApplication | #/pe-v1/search-enrollment-application | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Search Enrollment Reports | /ProviderEnrollment/SearchEnrollmentReports | #/pe-v1/search-enrollment-reports | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Workflow Dashboard | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard | #/pe-v1/workflow-dashboard | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Workflow Applications | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications | #/pe-v1/workflow-applications | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Workflow Configuration | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration | [UNKNOWN: no captured screen route for Workflow Configuration] | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Workflow Tasks | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks | [UNKNOWN: no captured screen route for Workflow Tasks] | [asset:menu.json, asset:menu/provider-enrollment.png] |
| New Enrollment Entry | /ProviderEnrollment/CreateSecureEnrollment | [UNKNOWN: no captured screen route for New Enrollment Entry] | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Resume Enrollment Entry | /ProviderEnrollment/ResumeSecureEnrollment | [UNKNOWN: no captured screen route for Resume Enrollment Entry] | [asset:menu.json, asset:menu/provider-enrollment.png] |

## 6. Fields & validation
None. [asset:facts.md]

## 7. State model
None. [asset:facts.md]

## 8. Behavior
No measured per-screen behaviors were captured for this page. [asset:facts.md]

### 8.1 Shared shell — side menu (Provider kit)
- WHEN the user activates the hamburger menu button THEN THE SYSTEM SHALL open the side menu drawer and show the disabled/backdrop overlay. [ctl:button-main-menu-2, asset:kit/states/menu-open.png, asset:kit/screen.json]
- WHEN the side menu is open AND the user activates the close (X) control THEN THE SYSTEM SHALL close the side menu drawer. [ctl:mainMenuClose, asset:kit/states/menu-open.png]
- WHEN the side menu is open AND the user hovers a module with children THEN THE SYSTEM SHALL show a flyout submenu listing that module items. [asset:menu/provider-enrollment.png]

### 8.2 Scroll behavior (facts §16: cite every [S##])
None. [asset:facts.md]

### 8.3 Media (facts §17: cite every [V##])
None. [asset:facts.md]

## 9. Navigation
### 9.1 Header links
| trigger (key) | destination | how | evidence |
|---|---|---|---|
| link-en | language selector / overlay [UNKNOWN: behavior not captured] | in-page | [ctl:link-en, asset:reference.png] |
| link-messages | `javascript:getBroadcastMsg();` [UNKNOWN: what UI opens] | in-page | [ctl:link-messages, asset:reference.png] |
| link-external-links | javascript:toggleVisibilityStyle('divExternalLinks'); [UNKNOWN: what UI opens] | in-page | [ctl:link-external-links, asset:reference.png] |
| link-favorites | `javascript:getFavorites();` [UNKNOWN: what UI opens] | in-page | [ctl:link-favorites, asset:reference.png] |
| link-contact-us | `javascript:getContactUs();` [UNKNOWN: what UI opens] | in-page | [ctl:link-contact-us, asset:reference.png] |
| link-my-account | `/Home/MyAccount` | same tab | [ctl:link-my-account, asset:reference.png] |
| link-logout | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout, asset:reference.png] |

### 9.2 Side menu (modules + items)
Every module and item from `menu.json` is listed in §5.1. In this rebuild:
- Items under “Provider Enrollment” route to screens in this app (see mapping in §5.1). [asset:menu.json]
- Every other module/item is visible and hovers/flies out the same way, but does not navigate. [asset:menu.json]

### 9.3 Footer links
| trigger (key) | destination | how | evidence |
|---|---|---|---|
| button-disclaimer | [UNKNOWN: destination not captured] | [UNKNOWN] | [ctl:button-disclaimer, asset:sections/02-disclaimer-the-website-is-prov.png] |
| button-website-requirements | [UNKNOWN: destination not captured] | [UNKNOWN] | [ctl:button-website-requirements, asset:sections/02-disclaimer-the-website-is-prov.png] |
| button-privacy-policy | [UNKNOWN: destination not captured] | [UNKNOWN] | [ctl:button-privacy-policy, asset:sections/02-disclaimer-the-website-is-prov.png] |
| button-cookie-policy | [UNKNOWN: destination not captured] | [UNKNOWN] | [ctl:button-cookie-policy, asset:sections/02-disclaimer-the-website-is-prov.png] |

## 10. Server interactions
None observed. [asset:facts.md]

## 11. Accessibility
- The Help icon has `aria-label="Help"` and uses a tooltip (`data-role="tooltip"`). [ctl:button-help, asset:kit/screen.json, asset:aria.yml]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild (minimum required for spec coverage): [asset:facts.json]

`pageBannerLogo`, `button`, `button-medicaid-management-solutions`, `button-2`, `button-en`, `link-en`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-help`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`

Full key list for parity tests is in `spec/selectors.json` / `spec/parity.spec.ts`. [asset:spec/selectors.json, asset:spec/parity.spec.ts]

## 13. Open questions
1. What UI opens for Messages / External Links / Favorites / Contact Us, and what content appears inside each overlay? [UNKNOWN]
2. What are the destinations for footer links (Disclaimer / Website Requirements / Privacy Policy / Cookie Policy) in the rebuild? [UNKNOWN]
3. For Provider Enrollment items without a captured screen route (Workflow Configuration, Workflow Tasks, New Enrollment Entry, Resume Enrollment Entry), what React routes should they map to? [UNKNOWN]

## 14. Motion
None. [asset:facts.md]


