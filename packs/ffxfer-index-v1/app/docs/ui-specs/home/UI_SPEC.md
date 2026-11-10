# UI SPEC ? ffxfer-index-v1/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome/ ? viewport 1920?1080 CSS px @ dpr 1 ? legacy built with ASP.NET MVC + jQuery 3.7.1 + Kendo UI for jQuery 2026.1.415 ? target React 19 [asset:facts.md, asset:kit/screen.json]
> Evidence tags: `[T##]` behavior ? `[ctl:key]` element ? `[val:key]` validator ? `[shot:N]` screenshot ? `[asset:path]` ? `[js:?]` ? `[aspx:?]` ? `[UNKNOWN: ?]`

## 1. Overview
Home/landing screen for a Provider portal. The page is mostly a branded hero banner; its main purpose for this rebuild is defining the shared shell (fixed header + top utility menu + hamburger side navigation + footer) used across screens. [asset:reference.png]

Primary tasks:
- Open the hamburger side navigation to reach modules and items (only ?File Transfer Services? routes are implemented in this app). [ctl:button-main-menu-2, asset:menu.json]
- Use header utility items (Messages / External Links / Favorites / Contact Us / My Account / Logout). [ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-logout]

## 2. Layout
Page: fluid (100% width), background rgb(255, 255, 255); scroll is the page; header is fixed at top. [asset:reference.png, css:#pageHeader.header]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Fixed header | `div#pageHeader.header` | 0,0,1920,66 | reference | flex row: logo + title + utility menu + hamburger | bg rgb(43, 58, 68); border-bottom 4px solid rgb(48, 179, 254); position fixed | [asset:reference.png, css:#pageHeader.header] |
| Help row | `div#mcbRowBorder` | 0,62,1920,44.5 | reference | flex row, right aligned | border-bottom 1px solid rgb(179, 179, 179) | [asset:sections/01-mcbrowborder.png, css:#mcbRowBorder] |
| Main content | `div#pageBody` | 0,107,1920,526 | reference | single table row: left image, right copy | image cell width 65%, copy cell width 35% | [asset:sections/01-mcbrowborder.png, css:.myHome_img, css:.myHome_copy] |
| Footer | `footer` | 0,633,1920,119 | reference | subfooter links bar + build/copyright row | bg rgb(43, 58, 68) in subfooter; white build row | [asset:sections/02-disclaimer-the-website-is-prov.png, css:.subfooter] |

### 2.1 Fixed header
- Left: client logo image link (clickable). [ctl:pageBannerLogo, ctl:link-client-logo, asset:reference.png]
- Center: system title and environment line:
  - ?Medicaid Management Solutions? (upper line). [ctl:button-medicaid-management-solutions, asset:reference.png]
  - ?Final Test? (lower line). [asset:reference.png]
- Right: utility menubar items (EN, MESSAGES, EXTERNAL LINKS, FAVORITES, CONTACT US, MY ACCOUNT, LOGOUT). [ctl:link-en, ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-logout, asset:reference.png]
- The utility menubar uses button wrappers for each menu item (in addition to the links): EN uses utton-en; Messages/External Links/Favorites/Contact Us/My Account/Logout use AAGMenu.* buttons. [ctl:button-en, ctl:AAGMenu.BroadcastMsg, ctl:AAGMenu.ExternalLinks, ctl:AAGMenu.Favorites, ctl:AAGMenu.ContactUs, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, asset:facts.md]
- The header also contains unlabeled button elements used by the legacy markup for focus/layout. [ctl:button, ctl:button-2, asset:facts.md]
- Far right: hamburger menu button area `#pageBannerMenu` with Font Awesome ??? icon. [ctl:button-main-menu-2, css:#pageBannerMenu, asset:reference.png]

### 2.2 Home hero
Two-column layout:
- Left 65% width: background image `Content/dxc.ua3.core.home.myhome.png` (cover, centered). [asset:sections/01-mcbrowborder.png, css:.myHome_img, asset:assets/Content/dxc.ua3.core.home.myhome.png]
- Right 35% width: right-aligned copy block near bottom:
  - H2: ?Medicaid Management Solutions?. [asset:sections/01-mcbrowborder.png]
  - Paragraph: ?Charting a New Direction for Better Healthcare Outcomes?. [asset:sections/01-mcbrowborder.png]
  Key styles: `.myHome_copy h2` font-size 3.3rem; `.myHome_copy p` font-size 1.3rem. [css:.myHome_copy h2, css:.myHome_copy p]

### 2.3 Footer
- Subfooter bar (dark background) contains 4 links: Disclaimer, Website Requirements, Privacy Policy, Cookie Policy. [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy, asset:sections/02-disclaimer-the-website-is-prov.png]
- Footer info row contains copyright text and build metadata. [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-body | Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome; 14px/14px | body | [asset:facts.md] |
| --color-body-text | rgb(51, 51, 51) | body | [asset:facts.md] |
| --color-shell-bg | rgb(43, 58, 68) | header + subfooter bar | [asset:reference.png] |
| --color-shell-accent | rgb(48, 179, 254) | header bottom border + hamburger background | [asset:reference.png] |
| --color-shell-link | rgb(255, 255, 255) | header utility links | [asset:reference.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header client logo | 117?57 | natural 169?82 | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/Content/dxc.ua3.core.home.myhome.png` | hero background image | shown as cover in left 65% column | (background image) | [asset:assets/Content/dxc.ua3.core.home.myhome.png] |
| `assets/webfonts/fa-solid-900.woff2` | icons (globe, hamburger, help, etc.) | n/a | Font Awesome 6 Pro Solid | [asset:assets/webfonts/fa-solid-900.woff2] |
| `assets/fonts/Poppins.woff` | header/title typography | n/a | Poppins | [asset:assets/fonts/Poppins.woff] |
| `assets/fonts/Poppins-Bold.woff` | panel headers (e.g., Messages panel header) | n/a | "Poppins Bold" | [asset:assets/fonts/Poppins-Bold.woff] |

## 5. Components
React component tree (shared components marked *shared*):
- `HomePage`
  - `ProviderShell` *shared* ? header + help icon row + footer [asset:reference.png]
    - `HeaderBar` *shared* ? logo, title, utility menubar, hamburger [ctl:pageBannerLogo, ctl:button-medicaid-management-solutions, ctl:link-en, ctl:button-main-menu-2]
    - `AtAGlancePanels` *shared* ? Messages / External Links / Favorites / Contact Us panels (hidden by default) [css:.aag-panel]
    - `HelpIcon` *shared* ? floating/book help icon near top-right of content area [ctl:button-help, asset:reference.png]
    - `HamburgerNav` *shared* ? side navigation with module list + hover flyouts [asset:menu.json]
    - `FooterBar` *shared* ? subfooter links and build info [ctl:button-disclaimer]
  - `HomeHero` ? image + copy [asset:sections/01-mcbrowborder.png]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `HeaderBar` | none | none | `pageBannerLogo`, `link-client-logo`, `button-medicaid-management-solutions`, `button-en`, `link-en`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2` | [asset:reference.png] |
| `HamburgerNav` | menu tree from `menu.json` | `isOpen`, `hoverModule` | (menu panel uses `button-main-menu-2` as opener) | [asset:menu.json] |
| `AtAGlancePanels` | none | panel visibility + loaded HTML content | legacy panel root ids: `divCoreBroadcastMsg`, `divExternalLinks`, `divFavorites`, `divCoreContactUs` | [css:.aag-panel] |
| `HomeHero` | none | none | (no interactive controls) | [asset:sections/01-mcbrowborder.png] |
| `FooterBar` | none | none | `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy` | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 5.1 Hamburger nav: full module tree (must be present in UI)
| module | item | legacy href | rebuild routing | evidence |
|---|---|---|---|---|
| Administration | Broadcast Message | `/BroadcastMessage/BroadcastMessageSearch` | No route (shown only) | [asset:menu.json] |
| Administration | FAQ's | `/FAQMaintenance/FAQMaintenanceSearch` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Application Settings | `/AppSetting/ManageAppSettings` | No route (shown only) | [asset:menu.json] |
| Administration | Manage HTML Blocks | `/Localization/ManageHtmlBlocks` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Help | `/ManageHelpContent/HelpContentSearch` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Images | `/Localization/ManageImages` | No route (shown only) | [asset:menu.json] |
| Administration | Manage IOC Settings | `/AppSetting/ManageIocSettings` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Labels | `/Localization/ManageLabels` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Menus | `/Menu/ManageMenus` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Menu Items | `/Menu/ManageMenuItems` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Messages | `/Localization/ManageMessages` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Security Functions | `/Localization/ManageSecurityFunctions` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Security Rights | `/Localization/ManageSecurityRights` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Security Roles | `/Localization/ManageSecurityRoles` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Services | `/Service/ManageServices` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Subscriptions | `/EventSubscriptions/ManageSubscription` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Module Events | `/ModuleEvents/ManageModuleEvents` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Users | `/UserMaintenance/ManageUsers` | No route (shown only) | [asset:menu.json] |
| Administration | Manage User Invitations | `/UserMaintenance/ManageUserInvitations` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Event Configuration | `/Notifications/EventNotificationSearch` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Subscriber Configuration | `/Notifications/SubscriberSearch` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Event Subscription | `/Notifications/SubscriptionDetails` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Tracking | `/Notifications/NotificationTracking` | No route (shown only) | [asset:menu.json] |
| Claims Management | Search Claims | `/ClaimsManagement/SearchClaims` | No route (shown only) | [asset:menu.json] |
| Claims Management | Pro DUR | `/ProDUR/ProDURDashBoard` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Dashboard | `/DrugRebate/Dashboard` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Labeler | `/DrugRebate/SearchLabelerInformation` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | NDC | `/NationalDrugCode/SearchNationalDrugCode` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Claim Level Detail | `/ClaimDetails/SearchClaims` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | CCN List | `/CashControlNumbers/SearchCashControlNumbers` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | ROSI/PQAS List | `/DrugRebate/SearchRosiPqas` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Disputes List | `/Invoice/SearchNDCDisputes` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Invoice Management | `/Invoice/SearchInvoiceInquiry` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | NDC Invoice Inquiry | `/NDCInvoice/SearchNDCInvoiceInquiry` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | CCN/NDC Association | `/Invoice/SearchCCNAssociated` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | PPA Maintenance | `/PPAMaintenance/SearchPPAMaintenance` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Incremental Adjustments | `/IncrementalAdjustment/SearchIncrementalAdjustment` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Postmark Dates | `/PostmarkDates/PostmarkDates` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | T-Bill Rates | `/DrugRebate/SearchTreasuryBillRates` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | 340b Providers | `/DrugRebate/SearchProvider340b` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Provider Recoupment | `/ProviderRecoupment/SearchProviderRecoupment` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Invoice Process Flags | `/DrugRebate/InvoiceProcessFlags` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Fund Codes | `/FundCodes/SearchFundCodes` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Web Information | `/WebAdmin/WebAdmin` | No route (shown only) | [asset:menu.json] |
| UI Examples | Page Elements / Widgets | `/Employee/UIExamples` | No route (shown only) | [asset:menu.json] |
| File Transfer Services | File Transfer Configuration | `/FileTransfer/SearchSourceLocations` | React route (this app) | [asset:menu.json] |
| File Transfer Services | File Transfer Tracking | `/FileTransfer/SearchFileTransferTracking` | React route (this app) | [asset:menu.json] |
| File Transfer Services | FTP Server Credentials | `/FileTransfer/SearchFTPServerCredentials` | React route (this app) | [asset:menu.json] |
| Integration | Event To File Query Builder | `/EventToFileWizard/SearchEventToFileMetadata` | No route (shown only) | [asset:menu.json] |
| Integration | File To Event Metadata | `/EventsDistributor/SearchFileDefinition` | No route (shown only) | [asset:menu.json] |
| Integration | File To Event Orchestration | `/FileToEventOrchestration/SearchExternalOrchestration` | No route (shown only) | [asset:menu.json] |
| Integration | Event Status Tracking | `/EventStatusTracking/SearchEventStatus` | No route (shown only) | [asset:menu.json] |
| Integration | System Process Tracking | `/SystemProcessTracking/SearchSystemProcessTracking` | No route (shown only) | [asset:menu.json] |
| Integration | Dashboard | `/Integration/Dashboard` | No route (shown only) | [asset:menu.json] |
| Managed Care | MCE | `/ManagedCare/SearchMCE` | No route (shown only) | [asset:menu.json] |
| Managed Care | Member | `/ManagedCare/SearchMember` | No route (shown only) | [asset:menu.json] |
| Managed Care | Network | `/Network/SearchNetwork` | No route (shown only) | [asset:menu.json] |
| Managed Care | Provider | `/ManagedCare/SearchPCPProvider` | No route (shown only) | [asset:menu.json] |
| Managed Care | HIPAA Transactions | `/ManagedCare/EDITxnSearch` | No route (shown only) | [asset:menu.json] |
| Managed Care | Lock Out | `/ManagedCare/SearchLockOutByPCPMCEMember` | No route (shown only) | [asset:menu.json] |
| Managed Care | Screening Results | `/ManagedCare/ScreeningResults` | No route (shown only) | [asset:menu.json] |
| Managed Care | Capitation | `/ManagedCare/Capitation` | No route (shown only) | [asset:menu.json] |
| Managed Care | Reports | `/ManagedCare/ManagedCareReports` | No route (shown only) | [asset:menu.json] |
| Managed Care | Reference Data | `/ManagedCare/ReferenceData` | No route (shown only) | [asset:menu.json] |
| Managed Care | Provider MCE Enrollment | `/ManagedCare/SearchProviderMCEEnrollment` | No route (shown only) | [asset:menu.json] |
| Managed Care | File Upload | `/ManagedCare/SearchCapitationFileUpload` | No route (shown only) | [asset:menu.json] |
| Managed Care | Mass Transfer | `/ManagedCare/MassTransferSearch` | No route (shown only) | [asset:menu.json] |
| Member Management | Member | `/MemberManagement/SearchMember` | No route (shown only) | [asset:menu.json] |
| Member Management | Medicaid Case | `/MedicaidCase/SearchMedicaidCase` | No route (shown only) | [asset:menu.json] |
| Member Management | Fulfillment Materials | `/FulfillmentMaterials/FulfillmentMaterials` | No route (shown only) | [asset:menu.json] |
| Member Management | Fraud Protection | `/FraudProtection/SearchFraudProtection` | No route (shown only) | [asset:menu.json] |
| Member Management | Group | `/Group/SearchGroup` | No route (shown only) | [asset:menu.json] |
| Member Management | Broker/Sales/TPA | `/BrokerSalesTPA/SearchBrokerSalesTPA` | No route (shown only) | [asset:menu.json] |
| Member Management | Person | `/Person/SearchPerson` | No route (shown only) | [asset:menu.json] |
| Plan Management | Reference Data | `/PlanManagement/ReferenceData` | No route (shown only) | [asset:menu.json] |
| Plan Management | Pharmacy Related Data | `/PlanManagement/SearchPharmacyRelatedData` | No route (shown only) | [asset:menu.json] |
| Plan Management | Related Data | `/PlanManagement/SearchRelatedInformation` | No route (shown only) | [asset:menu.json] |
| Plan Management | Rate Setting | `/PlanManagement/SearchRates` | No route (shown only) | [asset:menu.json] |
| Plan Management | File Upload | `/PlanManagement/FileUpload` | No route (shown only) | [asset:menu.json] |
| Plan Management | Manage Cycles | `/PlanManagement/SearchCycleSchedule` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Dashboard | `/ProgramIntegrity/PIURDashboard` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Manage Configurations | `/ProgramIntegrity/ManageConfigurations` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Custom Peer Groups | `/ProgramIntegrity/CustomPeerGroupSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Service Types | `/ProgramIntegrity/ServiceTypeSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Study Request | `/ProgramIntegrity/StudyRequestSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Suppressed Entities | `/ProgramIntegrity/SuppressEntitySearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Study Analysis Catalog | `/ProgramIntegrity/StudyAnalysisCatalog` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Manage Assignment Permissions | `/ProgramIntegrity/SearchAssignmentPermissions` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Predictive Model Definition | `/ProgramIntegrity/SearchPMDefinition` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Targeted Query Definition | `/ProgramIntegrity/TargetedQueryDefinitionSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Analysis Review | `/ProgramIntegrity/AnalysisReviewHome` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Case Request | `/ProgramIntegrity/CaseRequestSearch` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Dashboard | `/ProgramIntegrityCT/Dashboard` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Case | `/ProgramIntegrityCT/SearchCase` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Intake | `/ProgramIntegrityCT/SearchIntake` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Review Types | `/ProgramIntegrityCT/SearchReviewTypes` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | SuperCase | `/ProgramIntegrityCT/SearchSuperCase` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Contact | `/ProgramIntegrityCT/SearchContact` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | User Information | `/ProgramIntegrityCT/SearchUserInformation` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Letter Template | `/ProgramIntegrityCT/SearchLetterTemplate` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Bulk Load | `/ProgramIntegrityCT/SearchBulkLoad` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Dashboard | `/ProviderEnrollment/Dashboard` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Application | `/ProviderEnrollment/SearchProviderApplication` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Reports | `/ProviderEnrollment/SearchEnrollmentReports` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Dashboard | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Applications | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Configuration | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Tasks | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | New Enrollment Entry | `/ProviderEnrollment/CreateSecureEnrollment` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Resume Enrollment Entry | `/ProviderEnrollment/ResumeSecureEnrollment` | No route (shown only) | [asset:menu.json] |
| Provider Management | Providers | `/ProviderManagement/SearchProvider` | No route (shown only) | [asset:menu.json] |
| Provider Management | Owners and Managing Employees | `/ProviderManagement/SearchOwnerManagingEmployeeAssociation` | No route (shown only) | [asset:menu.json] |
| Provider Management | IRS W-9 Tax IDs | `/ProviderManagement/SearchIRSTaxId` | No route (shown only) | [asset:menu.json] |
| Provider Management | Provider Summary | `/ProviderManagement/SearchProviderSummary` | No route (shown only) | [asset:menu.json] |
| Provider Management | CLIA Numbers | `/ProviderManagement/SearchCLIANumber` | No route (shown only) | [asset:menu.json] |
| Provider Management | EFT Enrollments | `/ProviderManagement/SearchBaseEFTEnrollments` | No route (shown only) | [asset:menu.json] |
| Provider Management | Workflow Items | `/ProviderManagement/CompletedWorkItems` | No route (shown only) | [asset:menu.json] |
| Provider Management | MCO Enrollment List | `/ProviderManagement/SearchMCOProvider` | No route (shown only) | [asset:menu.json] |
| Provider Management | Bulk Transactions Within Base ID | `/ProviderManagement/SearchBulkTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | NPPR Transactions | `/ProviderManagement/SearchNPPR` | No route (shown only) | [asset:menu.json] |
| Provider Management | PRN Transactions | `/ProviderManagement/SearchPRN` | No route (shown only) | [asset:menu.json] |
| Provider Management | EP Workflow Transactions | `/ProviderManagement/SearchEPTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | Base ID Termination Transactions | `/ProviderManagement/SearchProviderBaseIDTermTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | Mass Change Transactions | `/ProviderManagement/SearchMassChangeTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | Change Of Ownership Transactions | `/ProviderManagement/SearchChangeOfOwnershipTransactions` | No route (shown only) | [asset:menu.json] |
| Provider Management | Provider Dashboard | `/ProviderManagement/Dashboard` | No route (shown only) | [asset:menu.json] |
| Provider Management | Managed Care Entities | `/ProviderManagedCare/SearchManagedCareEntity` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Dashboard | `/Credentialing/Dashboard` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Credentialing Application Review | `http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Search | `/Credentialing/Search` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Search Audit History | `/Credentialing/AuditSearch` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | File Upload/Download/Search | `/Credentialing/FileMgmtSearch` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Case | `/TPLCaseTracking/SearchCase` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Contact | `/TPLCaseTracking/SearchContact` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Desktop Review Upload | `/TPLCaseTracking/DesktopReviewUpload` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Search Desktop Review | `/TPLCaseTracking/SearchDesktopReviewCase` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Worker Compensation Intake | `/TPLCaseTracking/SearchWorkerCompensation` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Manage Case Assignment Permissions | `/TPLCaseTracking/SearchCaseAssignmentPermissions` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Carrier | `/TPLPolicy/SearchCarrier` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Employer | `/TPLPolicy/SearchEmployer` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Policyholder | `/TPLPolicy/SearchPolicyholder` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Absent Parent | `/TPLPolicy/SearchAbsentParent` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Policy | `/TPLPolicy/SearchTPLPolicy` | No route (shown only) | [asset:menu.json] |
| TPL Policy | TPL Policy Intake | `/TPLPolicy/SearchPolicyIntake` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Mass Carrier Migration | `/TPLPolicy/SearchCarrierMigration` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Non-Covered Code | `/TPLPolicy/SearchNonCoveredCode` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Member | `/TPLPolicy/MemberSearch` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Carrier Crosswalk Rule | `/TPLPolicy/SearchCarrierCrossWalkRule` | No route (shown only) | [asset:menu.json] |
| TPL Policy | TPL Policy Letters | `/TPLPolicy/SearchPolicyLetter` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Member Quick View | `/TPLPolicy/MemberQuickView` | No route (shown only) | [asset:menu.json] |
| TPL HIPP | Search HIPP | `/TPLHIPP/SearchHIPP` | No route (shown only) | [asset:menu.json] |
| TPL HIPP | Average Expenditure | `/TPLHIPP/SearchAverageExpenditure` | No route (shown only) | [asset:menu.json] |
| Task Management | Dashboard | `/TaskManagement/Dashboard` | No route (shown only) | [asset:menu.json] |
| Task Management | Task Template | `/TaskManagement/SearchTaskTemplate` | No route (shown only) | [asset:menu.json] |
| Task Management | Task List | `/TaskManagement/SearchTaskList` | No route (shown only) | [asset:menu.json] |
| Task Management | Link Configuration | `/TaskManagement/SearchLinkConfiguration` | No route (shown only) | [asset:menu.json] |
| Task Management | Routing Configuration | `/TaskManagement/SearchRoutingConfiguration` | No route (shown only) | [asset:menu.json] |
| Task Management | Manage User Association | `/TaskManagement/SearchUserAssociation` | No route (shown only) | [asset:menu.json] |
| Task Management | Manage User Schedule | `/TaskManagement/SearchUserCapacity` | No route (shown only) | [asset:menu.json] |
| Task Management | Bulk Recall | `/TaskManagement/SearchRecallTask` | No route (shown only) | [asset:menu.json] |


### 5.2 Hamburger nav: flyout visuals per module
| module | hover/flyout reference | evidence |
|---|---|---|
| Administration | `menu/administration.png` | [asset:menu/administration.png] |
| Alert Notification | `menu/alert-notification.png` | [asset:menu/alert-notification.png] |
| Claims Management | `menu/claims-management.png` | [asset:menu/claims-management.png] |
| Drug Rebate | `menu/drug-rebate.png` | [asset:menu/drug-rebate.png] |
| UI Examples | `menu/ui-examples.png` | [asset:menu/ui-examples.png] |
| File Transfer Services | `menu/file-transfer-services.png` | [asset:menu/file-transfer-services.png] |
| Integration | `menu/integration.png` | [asset:menu/integration.png] |
| Managed Care | `menu/managed-care.png` | [asset:menu/managed-care.png] |
| Member Management | `menu/member-management.png` | [asset:menu/member-management.png] |
| Plan Management | `menu/plan-management.png` | [asset:menu/plan-management.png] |
| Program Integrity | `menu/program-integrity.png` | [asset:menu/program-integrity.png] |
| PI Case Tracking | `menu/pi-case-tracking.png` | [asset:menu/pi-case-tracking.png] |
| Provider Enrollment | `menu/provider-enrollment.png` | [asset:menu/provider-enrollment.png] |
| Provider Management | `menu/provider-management.png` | [asset:menu/provider-management.png] |
| Screening/Credentialing | `menu/screening-credentialing.png` | [asset:menu/screening-credentialing.png] |
| TPL Case Tracking | `menu/tpl-case-tracking.png` | [asset:menu/tpl-case-tracking.png] |
| TPL Policy | `menu/tpl-policy.png` | [asset:menu/tpl-policy.png] |
| TPL HIPP | `menu/tpl-hipp.png` | [asset:menu/tpl-hipp.png] |
| Task Management | `menu/task-management.png` | [asset:menu/task-management.png] |


## 6. Fields & validation
No user-editable form fields exist on this page (no text inputs/selects with validation rules). [asset:facts.md]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `hamburgerMenuOpen` | boolean | false | user activates hamburger button | visibility of `#mainMenuContainer` side nav | [ctl:button-main-menu-2, asset:menu/file-transfer-services.png] |
| `hamburgerHoverModule` | string | null | pointer hover within module list | which module flyout submenu is shown | [asset:menu/file-transfer-services.png] |
| `aagPanelVisible` | enum (`none`/`messages`/`externalLinks`/`favorites`/`contactUs`) | none | user activates header utility links, or closes panels | which `.aag-panel` has `visibility: visible` | [css:.aag-panel, ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us] |

Hidden at load (facts ?12):
None. [asset:facts.md]

## 8. Behavior
### 8.1 Header utility menu
- THE SYSTEM SHALL render the utility menubar items as uppercase links with white text; the last item (LOGOUT) uses the vibrant green accent color. [ctl:link-logout, css:.aag-menu .k-last .k-link]
- WHEN the user activates ?My Account? THE SYSTEM SHALL navigate to `/Home/MyAccount` (same tab). [ctl:link-my-account, asset:facts.md]
- WHEN the user activates ?Logout? THE SYSTEM SHALL navigate to `/Security/LogoutFromMenu` (same tab). [ctl:link-logout, asset:facts.md]

### 8.2 At-a-glance panels (Messages / External Links / Favorites / Contact Us)
- THE SYSTEM SHALL keep `.aag-panel` containers hidden by default via `visibility: hidden` (fixed position near top of viewport). [css:.aag-panel]
- WHEN the user activates ?External Links? THE SYSTEM SHALL show `#divExternalLinks` and render a list of external links (Records Management (RM8), CMS, Gainwell, Medicaid) each with an external-link icon. [ctl:link-external-links, css:.aag-panel-external-links, js:js/Scripts/hp.ua3.core.atAGlance__884a35a7.js#toggleVisibilityStyle]
- WHEN the user activates ?MESSAGES? THE SYSTEM SHALL show #divCoreBroadcastMsg. [ctl:link-messages, js:js/Scripts/hp.ua3.core.atAGlance__884a35a7.js#getBroadcastMsg]
- WHILE the Messages panel is shown THE SYSTEM SHALL display instruction text about Current Messages vs Acknowledged Messages. [asset:snapshot/rendered.html]
- WHILE the Messages panel is shown THE SYSTEM SHALL show tab buttons ?Current Messages? (curMsgButton) and ?Acknowledged Messages? (cknowledgedMsgButton). [asset:snapshot/rendered.html]
- WHILE the Messages panel is shown THE SYSTEM SHALL show a primary ?Close? button (messagesCloseButton). [UNKNOWN: message list rows/content and whether ?Read? checkboxes appear without server data] [asset:snapshot/rendered.html, UNKNOWN: messages payload]
- WHEN the user activates ?Favorites? THE SYSTEM SHALL show `#divFavorites` and load its body content dynamically. [UNKNOWN: favorites content and empty-state text] [ctl:link-favorites, js:js/Scripts/hp.ua3.core.atAGlance__884a35a7.js#getFavorites]
- WHEN the user activates ?Contact Us? THE SYSTEM SHALL show `#divCoreContactUs` and load its body content dynamically. [UNKNOWN: contact-us content, fields, and actions] [ctl:link-contact-us, js:js/Scripts/hp.ua3.core.atAGlance__884a35a7.js#getContactUs]

### 8.3 Hamburger navigation (main menu)
- WHEN the user activates the hamburger menu button THE SYSTEM SHALL open a right-side menu panel (`#mainMenuContainer`) over a dimmed page backdrop. [ctl:button-main-menu-2, css:#mainMenuContainer, asset:menu/file-transfer-services.png]
- WHEN the hamburger menu is open THE SYSTEM SHALL show a vertical module list, and highlight the hovered module with a dark background and left accent bar. [asset:menu/file-transfer-services.png]
- WHEN the user hovers a module THE SYSTEM SHALL show a flyout submenu listing that module?s items. [asset:menu.json]

Flyout evidence (one per module):
- Administration flyout. [asset:menu/administration.png]
- Alert Notification flyout. [asset:menu/alert-notification.png]
- Claims Management flyout. [asset:menu/claims-management.png]
- Drug Rebate flyout. [asset:menu/drug-rebate.png]
- UI Examples flyout. [asset:menu/ui-examples.png]
- File Transfer Services flyout. [asset:menu/file-transfer-services.png]
- Integration flyout. [asset:menu/integration.png]
- Managed Care flyout. [asset:menu/managed-care.png]
- Member Management flyout. [asset:menu/member-management.png]
- Plan Management flyout. [asset:menu/plan-management.png]
- Program Integrity flyout. [asset:menu/program-integrity.png]
- PI Case Tracking flyout. [asset:menu/pi-case-tracking.png]
- Provider Enrollment flyout. [asset:menu/provider-enrollment.png]
- Provider Management flyout. [asset:menu/provider-management.png]
- Screening/Credentialing flyout. [asset:menu/screening-credentialing.png]
- TPL Case Tracking flyout. [asset:menu/tpl-case-tracking.png]
- TPL Policy flyout. [asset:menu/tpl-policy.png]
- TPL HIPP flyout. [asset:menu/tpl-hipp.png]
- Task Management flyout. [asset:menu/task-management.png]

Routing rule for this app:
- WHEN the user selects an item under ?File Transfer Services? THE SYSTEM SHALL navigate to the corresponding React screen/route within this app. [asset:menu.json]
- WHEN the user selects any other module/item THE SYSTEM SHALL NOT navigate (items are present for parity with the portal shell only). [asset:menu.json]

### 8.4 Help icon
- WHEN the user activates the help icon THE SYSTEM SHALL invoke `displayPageLevelHelp()` and show page help content. [UNKNOWN: help UI content and whether it opens a dialog/panel/new window] [ctl:button-help, js:js/inline-6.js#displayPageLevelHelp, UNKNOWN: help rendering]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-client-logo` | `/Home/MyHome/` | same tab | [ctl:link-client-logo] |
| `link-my-account` | `/Home/MyAccount` | same tab | [ctl:link-my-account] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout] |

Hamburger menu (modules + items, full tree):

| module | item | legacy href | rebuild routing | evidence |
|---|---|---|---|---|
| Administration | Broadcast Message | `/BroadcastMessage/BroadcastMessageSearch` | No route (shown only) | [asset:menu.json] |
| Administration | FAQ's | `/FAQMaintenance/FAQMaintenanceSearch` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Application Settings | `/AppSetting/ManageAppSettings` | No route (shown only) | [asset:menu.json] |
| Administration | Manage HTML Blocks | `/Localization/ManageHtmlBlocks` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Help | `/ManageHelpContent/HelpContentSearch` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Images | `/Localization/ManageImages` | No route (shown only) | [asset:menu.json] |
| Administration | Manage IOC Settings | `/AppSetting/ManageIocSettings` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Labels | `/Localization/ManageLabels` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Menus | `/Menu/ManageMenus` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Menu Items | `/Menu/ManageMenuItems` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Messages | `/Localization/ManageMessages` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Security Functions | `/Localization/ManageSecurityFunctions` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Security Rights | `/Localization/ManageSecurityRights` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Security Roles | `/Localization/ManageSecurityRoles` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Services | `/Service/ManageServices` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Subscriptions | `/EventSubscriptions/ManageSubscription` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Module Events | `/ModuleEvents/ManageModuleEvents` | No route (shown only) | [asset:menu.json] |
| Administration | Manage Users | `/UserMaintenance/ManageUsers` | No route (shown only) | [asset:menu.json] |
| Administration | Manage User Invitations | `/UserMaintenance/ManageUserInvitations` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Event Configuration | `/Notifications/EventNotificationSearch` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Subscriber Configuration | `/Notifications/SubscriberSearch` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Event Subscription | `/Notifications/SubscriptionDetails` | No route (shown only) | [asset:menu.json] |
| Alert Notification | Tracking | `/Notifications/NotificationTracking` | No route (shown only) | [asset:menu.json] |
| Claims Management | Search Claims | `/ClaimsManagement/SearchClaims` | No route (shown only) | [asset:menu.json] |
| Claims Management | Pro DUR | `/ProDUR/ProDURDashBoard` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Dashboard | `/DrugRebate/Dashboard` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Labeler | `/DrugRebate/SearchLabelerInformation` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | NDC | `/NationalDrugCode/SearchNationalDrugCode` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Claim Level Detail | `/ClaimDetails/SearchClaims` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | CCN List | `/CashControlNumbers/SearchCashControlNumbers` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | ROSI/PQAS List | `/DrugRebate/SearchRosiPqas` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Disputes List | `/Invoice/SearchNDCDisputes` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Invoice Management | `/Invoice/SearchInvoiceInquiry` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | NDC Invoice Inquiry | `/NDCInvoice/SearchNDCInvoiceInquiry` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | CCN/NDC Association | `/Invoice/SearchCCNAssociated` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | PPA Maintenance | `/PPAMaintenance/SearchPPAMaintenance` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Incremental Adjustments | `/IncrementalAdjustment/SearchIncrementalAdjustment` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Postmark Dates | `/PostmarkDates/PostmarkDates` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | T-Bill Rates | `/DrugRebate/SearchTreasuryBillRates` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | 340b Providers | `/DrugRebate/SearchProvider340b` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Provider Recoupment | `/ProviderRecoupment/SearchProviderRecoupment` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Invoice Process Flags | `/DrugRebate/InvoiceProcessFlags` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Fund Codes | `/FundCodes/SearchFundCodes` | No route (shown only) | [asset:menu.json] |
| Drug Rebate | Web Information | `/WebAdmin/WebAdmin` | No route (shown only) | [asset:menu.json] |
| UI Examples | Page Elements / Widgets | `/Employee/UIExamples` | No route (shown only) | [asset:menu.json] |
| File Transfer Services | File Transfer Configuration | `/FileTransfer/SearchSourceLocations` | React route (this app) | [asset:menu.json] |
| File Transfer Services | File Transfer Tracking | `/FileTransfer/SearchFileTransferTracking` | React route (this app) | [asset:menu.json] |
| File Transfer Services | FTP Server Credentials | `/FileTransfer/SearchFTPServerCredentials` | React route (this app) | [asset:menu.json] |
| Integration | Event To File Query Builder | `/EventToFileWizard/SearchEventToFileMetadata` | No route (shown only) | [asset:menu.json] |
| Integration | File To Event Metadata | `/EventsDistributor/SearchFileDefinition` | No route (shown only) | [asset:menu.json] |
| Integration | File To Event Orchestration | `/FileToEventOrchestration/SearchExternalOrchestration` | No route (shown only) | [asset:menu.json] |
| Integration | Event Status Tracking | `/EventStatusTracking/SearchEventStatus` | No route (shown only) | [asset:menu.json] |
| Integration | System Process Tracking | `/SystemProcessTracking/SearchSystemProcessTracking` | No route (shown only) | [asset:menu.json] |
| Integration | Dashboard | `/Integration/Dashboard` | No route (shown only) | [asset:menu.json] |
| Managed Care | MCE | `/ManagedCare/SearchMCE` | No route (shown only) | [asset:menu.json] |
| Managed Care | Member | `/ManagedCare/SearchMember` | No route (shown only) | [asset:menu.json] |
| Managed Care | Network | `/Network/SearchNetwork` | No route (shown only) | [asset:menu.json] |
| Managed Care | Provider | `/ManagedCare/SearchPCPProvider` | No route (shown only) | [asset:menu.json] |
| Managed Care | HIPAA Transactions | `/ManagedCare/EDITxnSearch` | No route (shown only) | [asset:menu.json] |
| Managed Care | Lock Out | `/ManagedCare/SearchLockOutByPCPMCEMember` | No route (shown only) | [asset:menu.json] |
| Managed Care | Screening Results | `/ManagedCare/ScreeningResults` | No route (shown only) | [asset:menu.json] |
| Managed Care | Capitation | `/ManagedCare/Capitation` | No route (shown only) | [asset:menu.json] |
| Managed Care | Reports | `/ManagedCare/ManagedCareReports` | No route (shown only) | [asset:menu.json] |
| Managed Care | Reference Data | `/ManagedCare/ReferenceData` | No route (shown only) | [asset:menu.json] |
| Managed Care | Provider MCE Enrollment | `/ManagedCare/SearchProviderMCEEnrollment` | No route (shown only) | [asset:menu.json] |
| Managed Care | File Upload | `/ManagedCare/SearchCapitationFileUpload` | No route (shown only) | [asset:menu.json] |
| Managed Care | Mass Transfer | `/ManagedCare/MassTransferSearch` | No route (shown only) | [asset:menu.json] |
| Member Management | Member | `/MemberManagement/SearchMember` | No route (shown only) | [asset:menu.json] |
| Member Management | Medicaid Case | `/MedicaidCase/SearchMedicaidCase` | No route (shown only) | [asset:menu.json] |
| Member Management | Fulfillment Materials | `/FulfillmentMaterials/FulfillmentMaterials` | No route (shown only) | [asset:menu.json] |
| Member Management | Fraud Protection | `/FraudProtection/SearchFraudProtection` | No route (shown only) | [asset:menu.json] |
| Member Management | Group | `/Group/SearchGroup` | No route (shown only) | [asset:menu.json] |
| Member Management | Broker/Sales/TPA | `/BrokerSalesTPA/SearchBrokerSalesTPA` | No route (shown only) | [asset:menu.json] |
| Member Management | Person | `/Person/SearchPerson` | No route (shown only) | [asset:menu.json] |
| Plan Management | Reference Data | `/PlanManagement/ReferenceData` | No route (shown only) | [asset:menu.json] |
| Plan Management | Pharmacy Related Data | `/PlanManagement/SearchPharmacyRelatedData` | No route (shown only) | [asset:menu.json] |
| Plan Management | Related Data | `/PlanManagement/SearchRelatedInformation` | No route (shown only) | [asset:menu.json] |
| Plan Management | Rate Setting | `/PlanManagement/SearchRates` | No route (shown only) | [asset:menu.json] |
| Plan Management | File Upload | `/PlanManagement/FileUpload` | No route (shown only) | [asset:menu.json] |
| Plan Management | Manage Cycles | `/PlanManagement/SearchCycleSchedule` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Dashboard | `/ProgramIntegrity/PIURDashboard` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Manage Configurations | `/ProgramIntegrity/ManageConfigurations` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Custom Peer Groups | `/ProgramIntegrity/CustomPeerGroupSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Service Types | `/ProgramIntegrity/ServiceTypeSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Study Request | `/ProgramIntegrity/StudyRequestSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Suppressed Entities | `/ProgramIntegrity/SuppressEntitySearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Study Analysis Catalog | `/ProgramIntegrity/StudyAnalysisCatalog` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Manage Assignment Permissions | `/ProgramIntegrity/SearchAssignmentPermissions` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Predictive Model Definition | `/ProgramIntegrity/SearchPMDefinition` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Targeted Query Definition | `/ProgramIntegrity/TargetedQueryDefinitionSearch` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Analysis Review | `/ProgramIntegrity/AnalysisReviewHome` | No route (shown only) | [asset:menu.json] |
| Program Integrity | Case Request | `/ProgramIntegrity/CaseRequestSearch` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Dashboard | `/ProgramIntegrityCT/Dashboard` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Case | `/ProgramIntegrityCT/SearchCase` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Intake | `/ProgramIntegrityCT/SearchIntake` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Review Types | `/ProgramIntegrityCT/SearchReviewTypes` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | SuperCase | `/ProgramIntegrityCT/SearchSuperCase` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Contact | `/ProgramIntegrityCT/SearchContact` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | User Information | `/ProgramIntegrityCT/SearchUserInformation` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Letter Template | `/ProgramIntegrityCT/SearchLetterTemplate` | No route (shown only) | [asset:menu.json] |
| PI Case Tracking | Bulk Load | `/ProgramIntegrityCT/SearchBulkLoad` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Dashboard | `/ProviderEnrollment/Dashboard` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Application | `/ProviderEnrollment/SearchProviderApplication` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Reports | `/ProviderEnrollment/SearchEnrollmentReports` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Dashboard | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Applications | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Configuration | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Workflow Tasks | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | New Enrollment Entry | `/ProviderEnrollment/CreateSecureEnrollment` | No route (shown only) | [asset:menu.json] |
| Provider Enrollment | Resume Enrollment Entry | `/ProviderEnrollment/ResumeSecureEnrollment` | No route (shown only) | [asset:menu.json] |
| Provider Management | Providers | `/ProviderManagement/SearchProvider` | No route (shown only) | [asset:menu.json] |
| Provider Management | Owners and Managing Employees | `/ProviderManagement/SearchOwnerManagingEmployeeAssociation` | No route (shown only) | [asset:menu.json] |
| Provider Management | IRS W-9 Tax IDs | `/ProviderManagement/SearchIRSTaxId` | No route (shown only) | [asset:menu.json] |
| Provider Management | Provider Summary | `/ProviderManagement/SearchProviderSummary` | No route (shown only) | [asset:menu.json] |
| Provider Management | CLIA Numbers | `/ProviderManagement/SearchCLIANumber` | No route (shown only) | [asset:menu.json] |
| Provider Management | EFT Enrollments | `/ProviderManagement/SearchBaseEFTEnrollments` | No route (shown only) | [asset:menu.json] |
| Provider Management | Workflow Items | `/ProviderManagement/CompletedWorkItems` | No route (shown only) | [asset:menu.json] |
| Provider Management | MCO Enrollment List | `/ProviderManagement/SearchMCOProvider` | No route (shown only) | [asset:menu.json] |
| Provider Management | Bulk Transactions Within Base ID | `/ProviderManagement/SearchBulkTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | NPPR Transactions | `/ProviderManagement/SearchNPPR` | No route (shown only) | [asset:menu.json] |
| Provider Management | PRN Transactions | `/ProviderManagement/SearchPRN` | No route (shown only) | [asset:menu.json] |
| Provider Management | EP Workflow Transactions | `/ProviderManagement/SearchEPTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | Base ID Termination Transactions | `/ProviderManagement/SearchProviderBaseIDTermTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | Mass Change Transactions | `/ProviderManagement/SearchMassChangeTransaction` | No route (shown only) | [asset:menu.json] |
| Provider Management | Change Of Ownership Transactions | `/ProviderManagement/SearchChangeOfOwnershipTransactions` | No route (shown only) | [asset:menu.json] |
| Provider Management | Provider Dashboard | `/ProviderManagement/Dashboard` | No route (shown only) | [asset:menu.json] |
| Provider Management | Managed Care Entities | `/ProviderManagedCare/SearchManagedCareEntity` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Dashboard | `/Credentialing/Dashboard` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Credentialing Application Review | `http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Search | `/Credentialing/Search` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | Search Audit History | `/Credentialing/AuditSearch` | No route (shown only) | [asset:menu.json] |
| Screening/Credentialing | File Upload/Download/Search | `/Credentialing/FileMgmtSearch` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Case | `/TPLCaseTracking/SearchCase` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Contact | `/TPLCaseTracking/SearchContact` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Desktop Review Upload | `/TPLCaseTracking/DesktopReviewUpload` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Search Desktop Review | `/TPLCaseTracking/SearchDesktopReviewCase` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Worker Compensation Intake | `/TPLCaseTracking/SearchWorkerCompensation` | No route (shown only) | [asset:menu.json] |
| TPL Case Tracking | Manage Case Assignment Permissions | `/TPLCaseTracking/SearchCaseAssignmentPermissions` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Carrier | `/TPLPolicy/SearchCarrier` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Employer | `/TPLPolicy/SearchEmployer` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Policyholder | `/TPLPolicy/SearchPolicyholder` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Absent Parent | `/TPLPolicy/SearchAbsentParent` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Policy | `/TPLPolicy/SearchTPLPolicy` | No route (shown only) | [asset:menu.json] |
| TPL Policy | TPL Policy Intake | `/TPLPolicy/SearchPolicyIntake` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Mass Carrier Migration | `/TPLPolicy/SearchCarrierMigration` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Non-Covered Code | `/TPLPolicy/SearchNonCoveredCode` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Member | `/TPLPolicy/MemberSearch` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Carrier Crosswalk Rule | `/TPLPolicy/SearchCarrierCrossWalkRule` | No route (shown only) | [asset:menu.json] |
| TPL Policy | TPL Policy Letters | `/TPLPolicy/SearchPolicyLetter` | No route (shown only) | [asset:menu.json] |
| TPL Policy | Member Quick View | `/TPLPolicy/MemberQuickView` | No route (shown only) | [asset:menu.json] |
| TPL HIPP | Search HIPP | `/TPLHIPP/SearchHIPP` | No route (shown only) | [asset:menu.json] |
| TPL HIPP | Average Expenditure | `/TPLHIPP/SearchAverageExpenditure` | No route (shown only) | [asset:menu.json] |
| Task Management | Dashboard | `/TaskManagement/Dashboard` | No route (shown only) | [asset:menu.json] |
| Task Management | Task Template | `/TaskManagement/SearchTaskTemplate` | No route (shown only) | [asset:menu.json] |
| Task Management | Task List | `/TaskManagement/SearchTaskList` | No route (shown only) | [asset:menu.json] |
| Task Management | Link Configuration | `/TaskManagement/SearchLinkConfiguration` | No route (shown only) | [asset:menu.json] |
| Task Management | Routing Configuration | `/TaskManagement/SearchRoutingConfiguration` | No route (shown only) | [asset:menu.json] |
| Task Management | Manage User Association | `/TaskManagement/SearchUserAssociation` | No route (shown only) | [asset:menu.json] |
| Task Management | Manage User Schedule | `/TaskManagement/SearchUserCapacity` | No route (shown only) | [asset:menu.json] |
| Task Management | Bulk Recall | `/TaskManagement/SearchRecallTask` | No route (shown only) | [asset:menu.json] |


## 10. Server interactions
None observed during capture. [asset:facts.md]

## 11. Accessibility
- Header is exposed as a banner with a menubar; each utility item is a `menuitem` containing a link. [asset:capture/aria.yml]
- Hamburger button is exposed under navigation "Hamburger Menu" with accessible name "Main Menu". [asset:capture/aria.yml]
- The hero image cell has `role=img` and `aria-label="Stethoscope and tablet laying on medical office desk"`. [asset:capture/aria.yml]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/ffxfer-index-v1/screens/home/spec/parity.spec.ts` uses them:
`pageBannerLogo`, `link-client-logo`, `button`, `button-medicaid-management-solutions`, `button-2`, `button-en`, `link-en`, `AAGMenu.BroadcastMsg`, `link-messages`, `AAGMenu.ExternalLinks`, `link-external-links`, `AAGMenu.Favorites`, `link-favorites`, `AAGMenu.ContactUs`, `link-contact-us`, `AAGMenu.MyAccount`, `AAGMenu.Logout`, `link-logout`, `button-main-menu-2`, `button-help`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy` [asset:facts.json]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/ffxfer-index-v1/screens/home/spec/parity.spec.ts`

## 13. Open questions
1. What is the full language picker UI opened by `link-en` (list of languages, placement, close behavior)? [UNKNOWN]
2. What UI does `displayPageLevelHelp()` show on this page (dialog/panel/new window) and what content does it render? [UNKNOWN]
3. What is the runtime content/state behavior for Messages/Favorites/Contact Us panels (empty state, loading indicator, error state)? [UNKNOWN]

## 14. Motion
None (facts ?15 reports no animations/motion). [asset:motion.json]
