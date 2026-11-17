# UI SPEC ? fxfer-v8/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome/ ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with jQuery 3.7.1 + Kendo UI for jQuery (Provider portal) ? target React 19
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` ? `[js:?]` ? `[aspx:?]` ? `[css:selector]` ? `[UNKNOWN: ?]`

## 1. Overview
This is the Provider portal Home page: a mostly static landing page (hero image + tagline) that also defines the shared shell used by the rest of the rebuilt app (fixed header + hamburger side menu + footer). [asset:reference.png]

Primary tasks:
- Open the side menu and navigate to File Transfer pages. [ctl:button-main-menu-2, asset:menu/file-transfer-services.png]
- Use the top header links (Messages / External Links / Favorites / Contact Us / My Account / Logout). [ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-my-account, ctl:link-logout]

## 2. Layout
Page: fluid (full-width), body background white; page content starts below a fixed header (body padding-top 62px). [css:.Home]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Header | `div#pageHeader.header` {pageHeader} | 0,0,1920,66 | reference | fixed header | bg rgb(43, 58, 68); bottom border 4px solid rgb(48, 179, 254) | [asset:reference.png, css:#pageHeader.header] |
| Header menu button | `div#pageBannerMenu` {pageBannerMenu} | 1852,0,68,62 | reference | fixed, right edge | bg rgb(48, 179, 254); hamburger icon | [asset:reference.png, css:#pageBannerMenu] |
| Body | `div#pageBody.row` {pageBody} | 0,106,1920,526 | section 01 | normal flow | contains hero tile and tagline | [asset:sections/01-mcbrowborder.png] |
| Footer (subfooter links) | `div.subfooter` | 0,632,1920,77 | section 02 | centered row of links | bg rgb(43, 58, 68); white text | [asset:sections/02-disclaimer-the-website-is-prov.png, css:.subfooter] |
| Footer (copyright/build) | `footer` | 0,632,1920,119 | section 02 | bottom bar | text color rgb(87, 87, 87); build info right-aligned | [asset:sections/02-disclaimer-the-website-is-prov.png, css:footer] |

### 2.1 Header
- Left: Gainwell logo image (clickable). [ctl:pageBannerLogo, asset:reference.png]
- Center-left: product name ?Medicaid Management Solutions? (styled as a focusable button). [ctl:button-medicaid-management-solutions, asset:reference.png]
- Under product name: environment label ?Final Test?. [asset:reference.png]
- Right (desktop layout): inline header links: ?en?, ?MESSAGES?, ?EXTERNAL LINKS?, ?FAVORITES?, ?CONTACT US?, ?MY ACCOUNT?, ?LOGOUT?. [ctl:link-en, ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-my-account, ctl:link-logout]
- Far right: hamburger icon button opens the side menu. [ctl:button-main-menu-2, asset:reference.png]

Responsive layout (below 1280px): the header shows logo + title + hamburger; the inline header links are not shown. [asset:kit/states/layout@client.png]

### 2.2 Body (Home hero)
- A large image area on the left uses a background image (stethoscope + tablet) and is part of a table cell `td.myHome_img`. [asset:sections/01-mcbrowborder.png, asset:assets/Content/dxc.ua3.core.home.myhome.png]
- The right side shows a large heading and smaller subtitle:
  - Heading: ?Medicaid Management Solutions? [asset:sections/01-mcbrowborder.png]
  - Subtitle: ?Charting a New Direction for Better Healthcare Outcomes? [asset:sections/01-mcbrowborder.png]

### 2.3 Footer
Subfooter links (centered): ?Disclaimer?, ?Website Requirements?, ?Privacy Policy?, ?Cookie Policy?. [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy, asset:sections/02-disclaimer-the-website-is-prov.png]

Below subfooter:
- Left: ?? 2026 Gainwell Technologies. All rights reserved.? [asset:sections/02-disclaimer-the-website-is-prov.png]
- Right: ?Server: 10.199.153.38 Build Date: 10/30/2026 3:28:37 AM v30.0.0.2609? [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-base | Arial, "Helvetica Neue", Helvetica, sans-serif | body | [css:body] |
| --font-size-base | 14px | body text | [css:body] |
| --color-text | rgb(51, 51, 51) | body text | [css:body] |
| --color-text-muted | rgb(87, 87, 87) | footer text | [css:footer] |
| --color-invert | rgb(255, 255, 255) | header/footer link text | [asset:reference.png] |
| --color-header-bg | rgb(43, 58, 68) | header background, footer subfooter background | [css:#pageHeader.header, css:.subfooter] |
| --color-accent | rgb(48, 179, 254) | header bottom border, product name text, hamburger background | [css:#pageHeader.header, css:#pageBannerMenu] |
| --border-hairline | 0.666667px solid rgb(179, 179, 179) | horizontal divider under header | [asset:sections/01-mcbrowborder.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png | header logo image | 117?57 | natural 169?82 | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| assets/Content/dxc.ua3.core.home.myhome.png | background image in hero (`td.myHome_img`) | 1236?522 | stethoscope + tablet photo | [asset:assets/Content/dxc.ua3.core.home.myhome.png] |

Menu reference assets (not under capture/):
- Menu tree: `menu.json`. [asset:menu.json]
- Hover/flyout reference screenshots (one per module): menu/administration.png, menu/alert-notification.png, menu/claims-management.png, menu/drug-rebate.png, menu/ui-examples.png, menu/file-transfer-services.png, menu/integration.png, menu/managed-care.png, menu/member-management.png, menu/plan-management.png, menu/program-integrity.png, menu/pi-case-tracking.png, menu/provider-enrollment.png, menu/provider-management.png, menu/screening-credentialing.png, menu/tpl-case-tracking.png, menu/tpl-policy.png, menu/tpl-hipp.png, menu/task-management.png. [asset:menu/administration.png, asset:menu/alert-notification.png, asset:menu/claims-management.png, asset:menu/drug-rebate.png, asset:menu/ui-examples.png, asset:menu/file-transfer-services.png, asset:menu/integration.png, asset:menu/managed-care.png, asset:menu/member-management.png, asset:menu/plan-management.png, asset:menu/program-integrity.png, asset:menu/pi-case-tracking.png, asset:menu/provider-enrollment.png, asset:menu/provider-management.png, asset:menu/screening-credentialing.png, asset:menu/tpl-case-tracking.png, asset:menu/tpl-policy.png, asset:menu/tpl-hipp.png, asset:menu/task-management.png]

## 5. Components
React component tree (shared components marked *shared*):
- `HomePage`
  - `PortalShell` *shared* ? fixed header + side menu + footer. [asset:reference.png]
    - `HeaderBar` *shared* ? logo, title, top links, hamburger menu. [ctl:pageBannerLogo, ctl:button-medicaid-management-solutions, ctl:button-main-menu-2]
    - `SideMenu` *shared* ? slide-out right-side menu + module hover flyouts. [asset:menu.json]
    - `Footer` *shared* ? subfooter links + copyright/build line. [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy]
  - `HomeHero` ? hero image + heading/subtitle. [asset:sections/01-mcbrowborder.png]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| HeaderBar | none | responsive layout (desktop vs <1280) | pageBannerLogo, button-medicaid-management-solutions, link-en, link-messages, link-external-links, link-favorites, link-contact-us, link-my-account, link-logout, button-main-menu-2 | [asset:reference.png, asset:kit/states/layout@client.png] |
| SideMenu | menu model from `menu.json` | isOpen, hoveredModule | menu open button selector `#pageBannerMenu > nav > div > i` | [asset:menu.json] |
| Footer | none | none | button-disclaimer, button-website-requirements, button-privacy-policy, button-cookie-policy | [asset:sections/02-disclaimer-the-website-is-prov.png] |
| HomeHero | none | none | (static text + background image) | [asset:sections/01-mcbrowborder.png] |

SideMenu modules and items (verbatim labels from `menu.json`):
| module | items (children) | evidence |
|---|---|---|
| Administration | Broadcast Message; FAQ's; Manage Application Settings; Manage HTML Blocks; Manage Help; Manage Images; Manage IOC Settings; Manage Labels; Manage Menus; Manage Menu Items; Manage Messages; Manage Security Functions; Manage Security Rights; Manage Security Roles; Manage Services; Manage Subscriptions; Manage Module Events; Manage Users; Manage User Invitations | [asset:menu.json] |
| Alert Notification | Event Configuration; Subscriber Configuration; Event Subscription; Tracking | [asset:menu.json] |
| Claims Management | Search Claims; Pro DUR | [asset:menu.json] |
| Drug Rebate | Dashboard; Labeler; NDC; Claim Level Detail; CCN List; ROSI/PQAS List; Disputes List; Invoice Management; NDC Invoice Inquiry; CCN/NDC Association; PPA Maintenance; Incremental Adjustments; Postmark Dates; T-Bill Rates; 340b Providers; Provider Recoupment; Invoice Process Flags; Fund Codes; Web Information | [asset:menu.json] |
| UI Examples | Page Elements / Widgets | [asset:menu.json] |
| File Transfer Services | File Transfer Configuration; File Transfer Tracking; FTP Server Credentials | [asset:menu.json] |
| Integration | Event To File Query Builder; File To Event Metadata; File To Event Orchestration; Event Status Tracking; System Process Tracking; Dashboard | [asset:menu.json] |
| Managed Care | MCE; Member; Network; Provider; HIPAA Transactions; Lock Out; Screening Results; Capitation; Reports; Reference Data; Provider MCE Enrollment; File Upload; Mass Transfer | [asset:menu.json] |
| Member Management | Member; Medicaid Case; Fulfillment Materials; Fraud Protection; Group; Broker/Sales/TPA; Person | [asset:menu.json] |
| Plan Management | Reference Data; Pharmacy Related Data; Related Data; Rate Setting; File Upload; Manage Cycles | [asset:menu.json] |
| Program Integrity | Dashboard; Manage Configurations; Custom Peer Groups; Service Types; Study Request; Suppressed Entities; Study Analysis Catalog; Manage Assignment Permissions; Predictive Model Definition; Targeted Query Definition; Analysis Review; Case Request | [asset:menu.json] |
| PI Case Tracking | Dashboard; Case; Intake; Review Types; SuperCase; Contact; User Information; Letter Template; Bulk Load | [asset:menu.json] |
| Provider Enrollment | Dashboard; Search Enrollment Application; Search Enrollment Reports; Workflow Dashboard; Workflow Applications; Workflow Configuration; Workflow Tasks; New Enrollment Entry; Resume Enrollment Entry | [asset:menu.json] |
| Provider Management | Providers; Owners and Managing Employees; IRS W-9 Tax IDs; Provider Summary; CLIA Numbers; EFT Enrollments; Workflow Items; MCO Enrollment List; Bulk Transactions Within Base ID; NPPR Transactions; PRN Transactions; EP Workflow Transactions; Base ID Termination Transactions; Mass Change Transactions; Change Of Ownership Transactions; Provider Dashboard; Managed Care Entities | [asset:menu.json] |
| Screening/Credentialing | Dashboard; Credentialing Application Review; Search; Search Audit History; File Upload/Download/Search | [asset:menu.json] |
| TPL Case Tracking | Case; Contact; Desktop Review Upload; Search Desktop Review; Worker Compensation Intake; Manage Case Assignment Permissions | [asset:menu.json] |
| TPL Policy | Carrier; Employer; Policyholder; Absent Parent; Policy; TPL Policy Intake; Mass Carrier Migration; Non-Covered Code; Member; Carrier Crosswalk Rule; TPL Policy Letters; Member Quick View | [asset:menu.json] |
| TPL HIPP | Search HIPP; Average Expenditure | [asset:menu.json] |
| Task Management | Dashboard; Task Template; Task List; Link Configuration; Routing Configuration; Manage User Association; Manage User Schedule; Bulk Recall | [asset:menu.json] |

## 6. Fields & validation
None. [asset:reference.png]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| layoutMode | enum (desktop/mobile) | desktop at 1920px | viewport width crossing 1280px | whether header shows the inline header links | [asset:reference.png, asset:kit/states/layout@client.png] |
| sideMenuOpen | boolean | false | clicking hamburger opens; clicking X or a menu link closes | right-side menu panel + disabled backdrop visibility | [asset:menu/file-transfer-services.png, asset:menu.json] |
| hoveredModule | string/nullable | null | pointer hover over a module row | shows that module?s flyout submenu | [asset:menu/administration.png, asset:menu/file-transfer-services.png] |

Hidden at load (facts ?12):
None. [asset:facts.md]

## 8. Behavior
### 8.1 Header links
- THE SYSTEM SHALL render the header links as clickable text in the desktop layout. [ctl:link-en, ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-my-account, ctl:link-logout]
- WHEN the user focuses the app title button THE SYSTEM SHALL show a visible outline. [ctl:button-medicaid-management-solutions, css:.app-title:focus]

Top-link outcomes are not captured on this screen; treat their overlays/panels as unknown until captured:
- WHEN the user activates ?MESSAGES? THE SYSTEM SHALL show the Messages panel. [UNKNOWN: Messages panel content/behavior; trigger: link-messages]
- WHEN the user activates ?EXTERNAL LINKS? THE SYSTEM SHALL show the External Links panel. [UNKNOWN: External Links panel content/behavior; trigger: link-external-links]
- WHEN the user activates ?FAVORITES? THE SYSTEM SHALL show the Favorites panel. [UNKNOWN: Favorites panel content/behavior; trigger: link-favorites]
- WHEN the user activates ?CONTACT US? THE SYSTEM SHALL show the Contact Us panel. [UNKNOWN: Contact Us panel content/behavior; trigger: link-contact-us]
- WHEN the user activates ?en? THE SYSTEM SHALL show the language selector. [UNKNOWN: language selector UI; trigger: link-en]

### 8.2 Side menu (hamburger)
- WHEN the user activates the hamburger icon THE SYSTEM SHALL open the side menu. [ctl:button-main-menu-2, asset:menu.json]
- THE SYSTEM SHALL render the side menu as a right-side panel with a disabled/dimmed backdrop over the page. [asset:menu/file-transfer-services.png]
- WHEN the side menu is open THE SYSTEM SHALL show an X close control; activating it closes the menu. [asset:menu/file-transfer-services.png]
- WHEN the side menu is open AND the pointer hovers a module THE SYSTEM SHALL show that module?s flyout list to the left of the module list. [asset:menu/administration.png, asset:menu/alert-notification.png, asset:menu/claims-management.png, asset:menu/drug-rebate.png, asset:menu/ui-examples.png, asset:menu/file-transfer-services.png, asset:menu/integration.png, asset:menu/managed-care.png, asset:menu/member-management.png, asset:menu/plan-management.png, asset:menu/program-integrity.png, asset:menu/pi-case-tracking.png, asset:menu/provider-enrollment.png, asset:menu/provider-management.png, asset:menu/screening-credentialing.png, asset:menu/tpl-case-tracking.png, asset:menu/tpl-policy.png, asset:menu/tpl-hipp.png, asset:menu/task-management.png, asset:kit/states/menu-flyout.png]

Side menu navigation policy for this app:
- WHEN the user activates a File Transfer Services item THE SYSTEM SHALL navigate to the corresponding File Transfer Services screen. [asset:menu/file-transfer-services.png]
- WHEN the user activates any NON-File Transfer Services item THE SYSTEM SHALL NOT navigate (no-op); the menu still shows and hovers the same way. [asset:menu.json]

### 8.3 Footer links
- WHEN the user activates ?Disclaimer? THE SYSTEM SHALL open the Disclaimer page. [UNKNOWN: destination; trigger: button-disclaimer]
- WHEN the user activates ?Website Requirements? THE SYSTEM SHALL open the Website Requirements page. [UNKNOWN: destination; trigger: button-website-requirements]
- WHEN the user activates ?Privacy Policy? THE SYSTEM SHALL open the Privacy Policy page. [UNKNOWN: destination; trigger: button-privacy-policy]
- WHEN the user activates ?Cookie Policy? THE SYSTEM SHALL open the Cookie Policy page. [UNKNOWN: destination; trigger: button-cookie-policy]

### 8.4 Scroll behavior (facts ?16: cite every [S##])
None. [asset:facts.md]

### 8.5 Media (facts ?17: cite every [V##])
None. [asset:facts.md]

## 9. Navigation
Header links (desktop):
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| link-my-account | `/Home/MyAccount` | same tab (legacy) | [ctl:link-my-account] |
| link-logout | `/Security/LogoutFromMenu` | same tab (legacy) | [ctl:link-logout] |
| link-messages | `javascript:getBroadcastMsg();` | [UNKNOWN: legacy behavior] | [ctl:link-messages] |
| link-external-links | `javascript:toggleVisibilityStyle('divExternalLinks');` | [UNKNOWN: legacy behavior] | [ctl:link-external-links] |
| link-favorites | `javascript:getFavorites();` | [UNKNOWN: legacy behavior] | [ctl:link-favorites] |
| link-contact-us | `javascript:getContactUs();` | [UNKNOWN: legacy behavior] | [ctl:link-contact-us] |
| link-en | (JS language selector) | [UNKNOWN: legacy behavior] | [ctl:link-en] |

Side menu tree (verbatim from `menu.json`):
| module | item | legacy href | rebuild behavior | evidence |
|---|---|---|---|---|
| Administration | Broadcast Message | /BroadcastMessage/BroadcastMessageSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | FAQ's | /FAQMaintenance/FAQMaintenanceSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Application Settings | /AppSetting/ManageAppSettings | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage HTML Blocks | /Localization/ManageHtmlBlocks | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Help | /ManageHelpContent/HelpContentSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Images | /Localization/ManageImages | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage IOC Settings | /AppSetting/ManageIocSettings | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Labels | /Localization/ManageLabels | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Menus | /Menu/ManageMenus | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Menu Items | /Menu/ManageMenuItems | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Messages | /Localization/ManageMessages | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Security Functions | /Localization/ManageSecurityFunctions | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Security Rights | /Localization/ManageSecurityRights | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Security Roles | /Localization/ManageSecurityRoles | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Services | /Service/ManageServices | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Subscriptions | /EventSubscriptions/ManageSubscription | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Module Events | /ModuleEvents/ManageModuleEvents | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage Users | /UserMaintenance/ManageUsers | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Administration | Manage User Invitations | /UserMaintenance/ManageUserInvitations | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Alert Notification | Event Configuration | /Notifications/EventNotificationSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Alert Notification | Subscriber Configuration | /Notifications/SubscriberSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Alert Notification | Event Subscription | /Notifications/SubscriptionDetails | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Alert Notification | Tracking | /Notifications/NotificationTracking | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Claims Management | Search Claims | /ClaimsManagement/SearchClaims | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Claims Management | Pro DUR | /ProDUR/ProDURDashBoard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Dashboard | /DrugRebate/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Labeler | /DrugRebate/SearchLabelerInformation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | NDC | /NationalDrugCode/SearchNationalDrugCode | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Claim Level Detail | /ClaimDetails/SearchClaims | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | CCN List | /CashControlNumbers/SearchCashControlNumbers | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | ROSI/PQAS List | /DrugRebate/SearchRosiPqas | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Disputes List | /Invoice/SearchNDCDisputes | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Invoice Management | /Invoice/SearchInvoiceInquiry | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | NDC Invoice Inquiry | /NDCInvoice/SearchNDCInvoiceInquiry | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | CCN/NDC Association | /Invoice/SearchCCNAssociated | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | PPA Maintenance | /PPAMaintenance/SearchPPAMaintenance | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Incremental Adjustments | /IncrementalAdjustment/SearchIncrementalAdjustment | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Postmark Dates | /PostmarkDates/PostmarkDates | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | T-Bill Rates | /DrugRebate/SearchTreasuryBillRates | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | 340b Providers | /DrugRebate/SearchProvider340b | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Provider Recoupment | /ProviderRecoupment/SearchProviderRecoupment | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Invoice Process Flags | /DrugRebate/InvoiceProcessFlags | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Fund Codes | /FundCodes/SearchFundCodes | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Drug Rebate | Web Information | /WebAdmin/WebAdmin | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| UI Examples | Page Elements / Widgets | /Employee/UIExamples | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| File Transfer Services | File Transfer Configuration | /FileTransfer/SearchSourceLocations | route `#/file-transfer-services/file-transfer-configuration` (pack screen id: `fxfer-v8/file-transfer-configuration`) | [asset:menu.json] |
| File Transfer Services | File Transfer Tracking | /FileTransfer/SearchFileTransferTracking | route `#/file-transfer-services/file-transfer-tracking` (pack screen id: `fxfer-v8/file-transfer-tracking`) | [asset:menu.json] |
| File Transfer Services | FTP Server Credentials | /FileTransfer/SearchFTPServerCredentials | [UNKNOWN: rebuild route/screen id for "FTP Server Credentials"] | [asset:menu.json] |
| Integration | Event To File Query Builder | /EventToFileWizard/SearchEventToFileMetadata | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Integration | File To Event Metadata | /EventsDistributor/SearchFileDefinition | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Integration | File To Event Orchestration | /FileToEventOrchestration/SearchExternalOrchestration | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Integration | Event Status Tracking | /EventStatusTracking/SearchEventStatus | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Integration | System Process Tracking | /SystemProcessTracking/SearchSystemProcessTracking | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Integration | Dashboard | /Integration/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | MCE | /ManagedCare/SearchMCE | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Member | /ManagedCare/SearchMember | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Network | /Network/SearchNetwork | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Provider | /ManagedCare/SearchPCPProvider | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | HIPAA Transactions | /ManagedCare/EDITxnSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Lock Out | /ManagedCare/SearchLockOutByPCPMCEMember | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Screening Results | /ManagedCare/ScreeningResults | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Capitation | /ManagedCare/Capitation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Reports | /ManagedCare/ManagedCareReports | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Reference Data | /ManagedCare/ReferenceData | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Provider MCE Enrollment | /ManagedCare/SearchProviderMCEEnrollment | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | File Upload | /ManagedCare/SearchCapitationFileUpload | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Managed Care | Mass Transfer | /ManagedCare/MassTransferSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Member | /MemberManagement/SearchMember | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Medicaid Case | /MedicaidCase/SearchMedicaidCase | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Fulfillment Materials | /FulfillmentMaterials/FulfillmentMaterials | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Fraud Protection | /FraudProtection/SearchFraudProtection | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Group | /Group/SearchGroup | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Broker/Sales/TPA | /BrokerSalesTPA/SearchBrokerSalesTPA | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Member Management | Person | /Person/SearchPerson | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Plan Management | Reference Data | /PlanManagement/ReferenceData | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Plan Management | Pharmacy Related Data | /PlanManagement/SearchPharmacyRelatedData | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Plan Management | Related Data | /PlanManagement/SearchRelatedInformation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Plan Management | Rate Setting | /PlanManagement/SearchRates | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Plan Management | File Upload | /PlanManagement/FileUpload | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Plan Management | Manage Cycles | /PlanManagement/SearchCycleSchedule | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Dashboard | /ProgramIntegrity/PIURDashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Manage Configurations | /ProgramIntegrity/ManageConfigurations | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Custom Peer Groups | /ProgramIntegrity/CustomPeerGroupSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Service Types | /ProgramIntegrity/ServiceTypeSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Study Request | /ProgramIntegrity/StudyRequestSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Suppressed Entities | /ProgramIntegrity/SuppressEntitySearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Study Analysis Catalog | /ProgramIntegrity/StudyAnalysisCatalog | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Manage Assignment Permissions | /ProgramIntegrity/SearchAssignmentPermissions | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Predictive Model Definition | /ProgramIntegrity/SearchPMDefinition | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Targeted Query Definition | /ProgramIntegrity/TargetedQueryDefinitionSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Analysis Review | /ProgramIntegrity/AnalysisReviewHome | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Program Integrity | Case Request | /ProgramIntegrity/CaseRequestSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Dashboard | /ProgramIntegrityCT/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Case | /ProgramIntegrityCT/SearchCase | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Intake | /ProgramIntegrityCT/SearchIntake | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Review Types | /ProgramIntegrityCT/SearchReviewTypes | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | SuperCase | /ProgramIntegrityCT/SearchSuperCase | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Contact | /ProgramIntegrityCT/SearchContact | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | User Information | /ProgramIntegrityCT/SearchUserInformation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Letter Template | /ProgramIntegrityCT/SearchLetterTemplate | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| PI Case Tracking | Bulk Load | /ProgramIntegrityCT/SearchBulkLoad | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Dashboard | /ProviderEnrollment/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Application | /ProviderEnrollment/SearchProviderApplication | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Reports | /ProviderEnrollment/SearchEnrollmentReports | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Workflow Dashboard | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Workflow Applications | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Workflow Configuration | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Workflow Tasks | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | New Enrollment Entry | /ProviderEnrollment/CreateSecureEnrollment | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Enrollment | Resume Enrollment Entry | /ProviderEnrollment/ResumeSecureEnrollment | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Providers | /ProviderManagement/SearchProvider | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Owners and Managing Employees | /ProviderManagement/SearchOwnerManagingEmployeeAssociation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | IRS W-9 Tax IDs | /ProviderManagement/SearchIRSTaxId | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Provider Summary | /ProviderManagement/SearchProviderSummary | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | CLIA Numbers | /ProviderManagement/SearchCLIANumber | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | EFT Enrollments | /ProviderManagement/SearchBaseEFTEnrollments | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Workflow Items | /ProviderManagement/CompletedWorkItems | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | MCO Enrollment List | /ProviderManagement/SearchMCOProvider | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Bulk Transactions Within Base ID | /ProviderManagement/SearchBulkTransaction | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | NPPR Transactions | /ProviderManagement/SearchNPPR | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | PRN Transactions | /ProviderManagement/SearchPRN | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | EP Workflow Transactions | /ProviderManagement/SearchEPTransaction | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Base ID Termination Transactions | /ProviderManagement/SearchProviderBaseIDTermTransaction | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Mass Change Transactions | /ProviderManagement/SearchMassChangeTransaction | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Change Of Ownership Transactions | /ProviderManagement/SearchChangeOfOwnershipTransactions | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Provider Dashboard | /ProviderManagement/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Provider Management | Managed Care Entities | /ProviderManagedCare/SearchManagedCareEntity | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Screening/Credentialing | Dashboard | /Credentialing/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Screening/Credentialing | Credentialing Application Review | http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Screening/Credentialing | Search | /Credentialing/Search | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Screening/Credentialing | Search Audit History | /Credentialing/AuditSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Screening/Credentialing | File Upload/Download/Search | /Credentialing/FileMgmtSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Case Tracking | Case | /TPLCaseTracking/SearchCase | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Case Tracking | Contact | /TPLCaseTracking/SearchContact | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Case Tracking | Desktop Review Upload | /TPLCaseTracking/DesktopReviewUpload | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Case Tracking | Search Desktop Review | /TPLCaseTracking/SearchDesktopReviewCase | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Case Tracking | Worker Compensation Intake | /TPLCaseTracking/SearchWorkerCompensation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Case Tracking | Manage Case Assignment Permissions | /TPLCaseTracking/SearchCaseAssignmentPermissions | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Carrier | /TPLPolicy/SearchCarrier | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Employer | /TPLPolicy/SearchEmployer | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Policyholder | /TPLPolicy/SearchPolicyholder | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Absent Parent | /TPLPolicy/SearchAbsentParent | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Policy | /TPLPolicy/SearchTPLPolicy | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | TPL Policy Intake | /TPLPolicy/SearchPolicyIntake | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Mass Carrier Migration | /TPLPolicy/SearchCarrierMigration | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Non-Covered Code | /TPLPolicy/SearchNonCoveredCode | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Member | /TPLPolicy/MemberSearch | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Carrier Crosswalk Rule | /TPLPolicy/SearchCarrierCrossWalkRule | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | TPL Policy Letters | /TPLPolicy/SearchPolicyLetter | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL Policy | Member Quick View | /TPLPolicy/MemberQuickView | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL HIPP | Search HIPP | /TPLHIPP/SearchHIPP | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| TPL HIPP | Average Expenditure | /TPLHIPP/SearchAverageExpenditure | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Dashboard | /TaskManagement/Dashboard | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Task Template | /TaskManagement/SearchTaskTemplate | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Task List | /TaskManagement/SearchTaskList | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Link Configuration | /TaskManagement/SearchLinkConfiguration | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Routing Configuration | /TaskManagement/SearchRoutingConfiguration | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Manage User Association | /TaskManagement/SearchUserAssociation | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Manage User Schedule | /TaskManagement/SearchUserCapacity | no-op (not part of File Transfer Services app) | [asset:menu.json] |
| Task Management | Bulk Recall | /TaskManagement/SearchRecallTask | no-op (not part of File Transfer Services app) | [asset:menu.json] |

## 10. Server interactions
None observed. [asset:facts.md]

## 11. Accessibility
- THE SYSTEM SHALL preserve visible focus styling for interactive elements (header title, hamburger icon, links). [css:.app-title:focus, css:.hamburger i:focus, css:a:focus]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v8/screens/home/spec/parity.spec.ts` uses them.

Required controls from this capture (facts.json `required.controls`):
- Header/logo/title: [ctl:pageBannerLogo, ctl:link-client-logo, ctl:button, ctl:button-2, ctl:button-medicaid-management-solutions]
- Header (desktop links): [ctl:button-en, ctl:link-en, ctl:AAGMenu.BroadcastMsg, ctl:AAGMenu.ExternalLinks, ctl:AAGMenu.Favorites]
- Header (desktop link targets): [ctl:AAGMenu.ContactUs, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-messages, ctl:link-external-links]
- Header (desktop link targets, cont.): [ctl:link-favorites, ctl:link-contact-us, ctl:link-logout]
- Shell actions: [ctl:button-main-menu-2, ctl:button-help]
- Footer links: [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v8/screens/home/spec/parity.spec.ts`

## 13. Open questions
1. What is the UI/behavior of the ?MESSAGES? panel (open/close, contents, keyboard behavior)? [UNKNOWN]
2. What is the UI/behavior of the ?EXTERNAL LINKS? panel? [UNKNOWN]
3. What is the destination/URL behavior (same tab/new tab) of the footer links (Disclaimer / Website Requirements / Privacy Policy / Cookie Policy)? [UNKNOWN]

## 14. Motion
None. [asset:facts.md]
