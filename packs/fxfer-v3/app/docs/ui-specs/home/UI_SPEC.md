# UI SPEC — fxfer-v3/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome/ · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[aspx:…]` · `[UNKNOWN: …]`

## 1. Overview
The Home screen is the Provider portal landing page and the source of the shared app shell (fixed header + hamburger side menu + footer) that every rebuilt screen uses. The page body is a static hero image + tagline. [asset:reference.png]

Primary tasks:
- Open the side menu (hamburger) and navigate to File Transfer screens. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]

## 2. Layout
Page: fixed 1920px viewport layout; body has top padding to clear the fixed header; main content is a full-width hero band followed by a footer. Header is fixed at the top. [asset:reference.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Header | `div#pageHeader.header` {pageHeader} | 0,0,1920,66 | reference | flex row (logo/title left; nav right; hamburger far right) | bg `rgb(43, 58, 68)`; bottom border `4px solid rgb(48, 179, 254)`; fixed | [asset:reference.png, css:#pageHeader.header] |
| Hero band | `div#mcbRowBorder.row` {mcbRowBorder} | 0,62,1920,45 | reference | row with right-aligned Help icon | border-bottom `1px solid rgb(179, 179, 179)` | [asset:sections/01-mcbrowborder.png, ctl:button-help] |
| Main body | `div#pageBody.row` {pageBody} | 0,107,1920,526 | reference | 2-column table: left image cell + right text cell | left cell uses background-cover image | [asset:sections/01-mcbrowborder.png, asset:assets/Content/dxc.ua3.core.home.myhome.png] |
| Footer | `footer` | 0,633,1920,119 | reference | top dark subfooter bar with 4 links; then bottom white row with copyright/build | subfooter bg `rgb(43, 58, 68)` | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 2.1 Header
- Client logo control `pageBannerLogo` (button) wraps the clickable logo link `link-client-logo`. [ctl:pageBannerLogo, ctl:link-client-logo, asset:reference.png]
- Title block: “Medicaid Management Solutions” and environment label “Final Test”. [ctl:button-medicaid-management-solutions, asset:reference.png]
- Language selector: button `button-en` + link `link-en` (text “en”). [ctl:button-en, ctl:link-en, asset:reference.png]
- Global header menu items are rendered as a button + link pair per item (examples: `AAGMenu.BroadcastMsg` + `link-messages`). [ctl:AAGMenu.BroadcastMsg, ctl:link-messages, ctl:AAGMenu.ExternalLinks, ctl:link-external-links, ctl:AAGMenu.Favorites, ctl:link-favorites, ctl:AAGMenu.ContactUs, ctl:link-contact-us, ctl:AAGMenu.MyAccount, ctl:link-my-account, ctl:AAGMenu.Logout, ctl:link-logout, asset:reference.png]
- Far right: hamburger icon button (Font Awesome bars) with label “Main Menu”. [ctl:button-main-menu-2, css:#pageBannerMenu, asset:reference.png]
- Additional header buttons `button` and `button-2` exist without visible labels in the capture. [ctl:button, ctl:button-2, asset:facts.md, UNKNOWN: what these header buttons do]

### 2.2 Hero band (row border)
- Contains the Help icon button (blue circle with white book-open glyph) aligned near the right edge. [ctl:button-help, asset:reference.png]

### 2.3 Main body (hero)
The body is a full-width table row:
- Left cell (`td.myHome_img`): background image `assets/Content/dxc.ua3.core.home.myhome.png`, covers the cell. [asset:assets/Content/dxc.ua3.core.home.myhome.png, css:.myHome_img]
- Right cell (`td.myHome_copy`): right-aligned text near the bottom:
  - Heading: “Medicaid Management Solutions” (font-size 33px, line-height 36.3px, font-weight 500). [asset:sections/01-mcbrowborder.png, asset:capture/dom.json]
  - Subheading: “Charting a New Direction for Better Healthcare Outcomes” (font-size 13px, line-height 13px). [asset:sections/01-mcbrowborder.png, asset:capture/dom.json]

### 2.4 Footer
Footer is two stacked rows:
- Subfooter (dark bar): center-aligned links: “Disclaimer” · “Website Requirements” · “Privacy Policy” · “Cookie Policy”. [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy, asset:sections/02-disclaimer-the-website-is-prov.png]
- Bottom row (white): left copyright and right server/build/version string. [ctl:footerCopyright, ctl:footerBuild, asset:sections/02-disclaimer-the-website-is-prov.png]

### 2.5 Side menu (shared shell)
The hamburger opens a full-height right-side menu overlay showing the module list; hovering a module opens a flyout panel to its left listing that module’s items. [ctl:button-main-menu-2, asset:kit/states/menu-open.png, asset:menu.json]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` 14px/14px | body text | [asset:content.md] |
| `--color-text` | `rgb(61, 61, 61)` | main text | [asset:facts.md] |
| `--color-header-bg` | `rgb(43, 58, 68)` | header + subfooter | [asset:reference.png] |
| `--color-accent` | `rgb(48, 179, 254)` | header bottom border; hamburger background | [css:#pageHeader.header, css:#pageBannerMenu] |
| `--color-link-inverse` | `rgb(255, 255, 255)` | header nav links | [asset:reference.png] |
| `--color-help-circle` | `rgb(51, 129, 255)` | Help icon circle | [ctl:button-help, asset:capture/dom.json] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header client logo | 117×57 | tooltip text “Client Logo” | [asset:reference.png, asset:kit/states/tooltip.png] |
| `assets/Content/dxc.ua3.core.home.myhome.png` | main hero background | 1236×522 | background cover image (stethoscope + tablet scene) | [asset:assets/Content/dxc.ua3.core.home.myhome.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `HomePage`
  - `ProviderShell` *shared*
    - `Header` *shared* — logo, site title, top nav, hamburger [ctl:pageHeader]
    - `SideMenu` *shared* — hamburger menu + module flyouts (kit-managed) [ctl:button-main-menu-2]
    - `Footer` *shared* — subfooter links + copyright/build [ctl:button-disclaimer]
  - `HomeHero`

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `Header` | none | none | `pageBannerLogo`, `link-client-logo`, `button-medicaid-management-solutions`, `link-en`, `link-messages`, `link-external-links`, `link-favorites`, `link-contact-us`, `link-my-account`, `link-logout`, `button-main-menu-2` | [asset:reference.png] |
| `SideMenu` | menu tree | `isOpen`, `hoveredModule` | `button-main-menu-2` (open), close icon (X) | [asset:kit/states/menu-open.png, asset:menu.json] |
| `HomeHero` | none | none | `img-stethoscope-and-tablet-laying-on` | [asset:sections/01-mcbrowborder.png] |
| `Footer` | none | none | `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`, `footerCopyright`, `footerBuild` | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 5.1 Side menu tree (modules + items)
Source of truth for the full menu tree is `menu.json`. [asset:menu.json]

| module | item | legacy href | notes | evidence |
|---|---|---|---|---|
| Administration | Broadcast Message | `/BroadcastMessage/BroadcastMessageSearch` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | FAQ's | `/FAQMaintenance/FAQMaintenanceSearch` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Application Settings | `/AppSetting/ManageAppSettings` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage HTML Blocks | `/Localization/ManageHtmlBlocks` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Help | `/ManageHelpContent/HelpContentSearch` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Images | `/Localization/ManageImages` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage IOC Settings | `/AppSetting/ManageIocSettings` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Labels | `/Localization/ManageLabels` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Menus | `/Menu/ManageMenus` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Menu Items | `/Menu/ManageMenuItems` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Messages | `/Localization/ManageMessages` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Security Functions | `/Localization/ManageSecurityFunctions` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Security Rights | `/Localization/ManageSecurityRights` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Security Roles | `/Localization/ManageSecurityRoles` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Services | `/Service/ManageServices` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Subscriptions | `/EventSubscriptions/ManageSubscription` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Module Events | `/ModuleEvents/ManageModuleEvents` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage Users | `/UserMaintenance/ManageUsers` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Administration | Manage User Invitations | `/UserMaintenance/ManageUserInvitations` | shown in flyout | [asset:menu.json, asset:menu/administration.png] |
| Alert Notification | Event Configuration | `/Notifications/EventNotificationSearch` | shown in flyout | [asset:menu.json, asset:menu/alert-notification.png] |
| Alert Notification | Subscriber Configuration | `/Notifications/SubscriberSearch` | shown in flyout | [asset:menu.json, asset:menu/alert-notification.png] |
| Alert Notification | Event Subscription | `/Notifications/SubscriptionDetails` | shown in flyout | [asset:menu.json, asset:menu/alert-notification.png] |
| Alert Notification | Tracking | `/Notifications/NotificationTracking` | shown in flyout | [asset:menu.json, asset:menu/alert-notification.png] |
| Claims Management | Search Claims | `/ClaimsManagement/SearchClaims` | shown in flyout | [asset:menu.json, asset:menu/claims-management.png] |
| Claims Management | Pro DUR | `/ProDUR/ProDURDashBoard` | shown in flyout | [asset:menu.json, asset:menu/claims-management.png] |
| Drug Rebate | Dashboard | `/DrugRebate/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Labeler | `/DrugRebate/SearchLabelerInformation` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | NDC | `/NationalDrugCode/SearchNationalDrugCode` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Claim Level Detail | `/ClaimDetails/SearchClaims` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | CCN List | `/CashControlNumbers/SearchCashControlNumbers` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | ROSI/PQAS List | `/DrugRebate/SearchRosiPqas` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Disputes List | `/Invoice/SearchNDCDisputes` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Invoice Management | `/Invoice/SearchInvoiceInquiry` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | NDC Invoice Inquiry | `/NDCInvoice/SearchNDCInvoiceInquiry` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | CCN/NDC Association | `/Invoice/SearchCCNAssociated` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | PPA Maintenance | `/PPAMaintenance/SearchPPAMaintenance` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Incremental Adjustments | `/IncrementalAdjustment/SearchIncrementalAdjustment` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Postmark Dates | `/PostmarkDates/PostmarkDates` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | T-Bill Rates | `/DrugRebate/SearchTreasuryBillRates` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | 340b Providers | `/DrugRebate/SearchProvider340b` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Provider Recoupment | `/ProviderRecoupment/SearchProviderRecoupment` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Invoice Process Flags | `/DrugRebate/InvoiceProcessFlags` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Fund Codes | `/FundCodes/SearchFundCodes` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| Drug Rebate | Web Information | `/WebAdmin/WebAdmin` | shown in flyout | [asset:menu.json, asset:menu/drug-rebate.png] |
| UI Examples | Page Elements / Widgets | `/Employee/UIExamples` | shown in flyout | [asset:menu.json, asset:menu/ui-examples.png] |
| File Transfer Services | File Transfer Configuration | `/FileTransfer/SearchSourceLocations` | routes to rebuilt screen `fxfer-v3/file-transfer-configuration` | [asset:menu.json, asset:menu/file-transfer-services.png] |
| File Transfer Services | File Transfer Tracking | `/FileTransfer/SearchFileTransferTracking` | routes to rebuilt screen `fxfer-v3/file-transfer-tracking` | [asset:menu.json, asset:menu/file-transfer-services.png] |
| File Transfer Services | FTP Server Credentials | `/FileTransfer/SearchFTPServerCredentials` | routes to rebuilt screen `fxfer-v3/ftp-server-credentials` | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Integration | Event To File Query Builder | `/EventToFileWizard/SearchEventToFileMetadata` | shown in flyout | [asset:menu.json, asset:menu/integration.png] |
| Integration | File To Event Metadata | `/EventsDistributor/SearchFileDefinition` | shown in flyout | [asset:menu.json, asset:menu/integration.png] |
| Integration | File To Event Orchestration | `/FileToEventOrchestration/SearchExternalOrchestration` | shown in flyout | [asset:menu.json, asset:menu/integration.png] |
| Integration | Event Status Tracking | `/EventStatusTracking/SearchEventStatus` | shown in flyout | [asset:menu.json, asset:menu/integration.png] |
| Integration | System Process Tracking | `/SystemProcessTracking/SearchSystemProcessTracking` | shown in flyout | [asset:menu.json, asset:menu/integration.png] |
| Integration | Dashboard | `/Integration/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/integration.png] |
| Managed Care | MCE | `/ManagedCare/SearchMCE` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Member | `/ManagedCare/SearchMember` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Network | `/Network/SearchNetwork` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Provider | `/ManagedCare/SearchPCPProvider` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | HIPAA Transactions | `/ManagedCare/EDITxnSearch` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Lock Out | `/ManagedCare/SearchLockOutByPCPMCEMember` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Screening Results | `/ManagedCare/ScreeningResults` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Capitation | `/ManagedCare/Capitation` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Reports | `/ManagedCare/ManagedCareReports` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Reference Data | `/ManagedCare/ReferenceData` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Provider MCE Enrollment | `/ManagedCare/SearchProviderMCEEnrollment` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | File Upload | `/ManagedCare/SearchCapitationFileUpload` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Managed Care | Mass Transfer | `/ManagedCare/MassTransferSearch` | shown in flyout | [asset:menu.json, asset:menu/managed-care.png] |
| Member Management | Member | `/MemberManagement/SearchMember` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Member Management | Medicaid Case | `/MedicaidCase/SearchMedicaidCase` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Member Management | Fulfillment Materials | `/FulfillmentMaterials/FulfillmentMaterials` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Member Management | Fraud Protection | `/FraudProtection/SearchFraudProtection` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Member Management | Group | `/Group/SearchGroup` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Member Management | Broker/Sales/TPA | `/BrokerSalesTPA/SearchBrokerSalesTPA` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Member Management | Person | `/Person/SearchPerson` | shown in flyout | [asset:menu.json, asset:menu/member-management.png] |
| Plan Management | Reference Data | `/PlanManagement/ReferenceData` | shown in flyout | [asset:menu.json, asset:menu/plan-management.png] |
| Plan Management | Pharmacy Related Data | `/PlanManagement/SearchPharmacyRelatedData` | shown in flyout | [asset:menu.json, asset:menu/plan-management.png] |
| Plan Management | Related Data | `/PlanManagement/SearchRelatedInformation` | shown in flyout | [asset:menu.json, asset:menu/plan-management.png] |
| Plan Management | Rate Setting | `/PlanManagement/SearchRates` | shown in flyout | [asset:menu.json, asset:menu/plan-management.png] |
| Plan Management | File Upload | `/PlanManagement/FileUpload` | shown in flyout | [asset:menu.json, asset:menu/plan-management.png] |
| Plan Management | Manage Cycles | `/PlanManagement/SearchCycleSchedule` | shown in flyout | [asset:menu.json, asset:menu/plan-management.png] |
| Program Integrity | Dashboard | `/ProgramIntegrity/PIURDashboard` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Manage Configurations | `/ProgramIntegrity/ManageConfigurations` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Custom Peer Groups | `/ProgramIntegrity/CustomPeerGroupSearch` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Service Types | `/ProgramIntegrity/ServiceTypeSearch` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Study Request | `/ProgramIntegrity/StudyRequestSearch` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Suppressed Entities | `/ProgramIntegrity/SuppressEntitySearch` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Study Analysis Catalog | `/ProgramIntegrity/StudyAnalysisCatalog` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Manage Assignment Permissions | `/ProgramIntegrity/SearchAssignmentPermissions` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Predictive Model Definition | `/ProgramIntegrity/SearchPMDefinition` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Targeted Query Definition | `/ProgramIntegrity/TargetedQueryDefinitionSearch` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Analysis Review | `/ProgramIntegrity/AnalysisReviewHome` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| Program Integrity | Case Request | `/ProgramIntegrity/CaseRequestSearch` | shown in flyout | [asset:menu.json, asset:menu/program-integrity.png] |
| PI Case Tracking | Dashboard | `/ProgramIntegrityCT/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | Case | `/ProgramIntegrityCT/SearchCase` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | Intake | `/ProgramIntegrityCT/SearchIntake` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | Review Types | `/ProgramIntegrityCT/SearchReviewTypes` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | SuperCase | `/ProgramIntegrityCT/SearchSuperCase` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | Contact | `/ProgramIntegrityCT/SearchContact` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | User Information | `/ProgramIntegrityCT/SearchUserInformation` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | Letter Template | `/ProgramIntegrityCT/SearchLetterTemplate` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| PI Case Tracking | Bulk Load | `/ProgramIntegrityCT/SearchBulkLoad` | shown in flyout | [asset:menu.json, asset:menu/pi-case-tracking.png] |
| Provider Enrollment | Dashboard | `/ProviderEnrollment/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Search Enrollment Application | `/ProviderEnrollment/SearchProviderApplication` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Search Enrollment Reports | `/ProviderEnrollment/SearchEnrollmentReports` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Workflow Dashboard | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Workflow Applications | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Workflow Configuration | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Workflow Tasks | `https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | New Enrollment Entry | `/ProviderEnrollment/CreateSecureEnrollment` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Enrollment | Resume Enrollment Entry | `/ProviderEnrollment/ResumeSecureEnrollment` | shown in flyout | [asset:menu.json, asset:menu/provider-enrollment.png] |
| Provider Management | Providers | `/ProviderManagement/SearchProvider` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Owners and Managing Employees | `/ProviderManagement/SearchOwnerManagingEmployeeAssociation` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | IRS W-9 Tax IDs | `/ProviderManagement/SearchIRSTaxId` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Provider Summary | `/ProviderManagement/SearchProviderSummary` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | CLIA Numbers | `/ProviderManagement/SearchCLIANumber` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | EFT Enrollments | `/ProviderManagement/SearchBaseEFTEnrollments` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Workflow Items | `/ProviderManagement/CompletedWorkItems` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | MCO Enrollment List | `/ProviderManagement/SearchMCOProvider` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Bulk Transactions Within Base ID | `/ProviderManagement/SearchBulkTransaction` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | NPPR Transactions | `/ProviderManagement/SearchNPPR` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | PRN Transactions | `/ProviderManagement/SearchPRN` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | EP Workflow Transactions | `/ProviderManagement/SearchEPTransaction` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Base ID Termination Transactions | `/ProviderManagement/SearchProviderBaseIDTermTransaction` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Mass Change Transactions | `/ProviderManagement/SearchMassChangeTransaction` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Change Of Ownership Transactions | `/ProviderManagement/SearchChangeOfOwnershipTransactions` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Provider Dashboard | `/ProviderManagement/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Provider Management | Managed Care Entities | `/ProviderManagedCare/SearchManagedCareEntity` | shown in flyout | [asset:menu.json, asset:menu/provider-management.png] |
| Screening/Credentialing | Dashboard | `/Credentialing/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/screening-credentialing.png] |
| Screening/Credentialing | Credentialing Application Review | `http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review` | shown in flyout | [asset:menu.json, asset:menu/screening-credentialing.png] |
| Screening/Credentialing | Search | `/Credentialing/Search` | shown in flyout | [asset:menu.json, asset:menu/screening-credentialing.png] |
| Screening/Credentialing | Search Audit History | `/Credentialing/AuditSearch` | shown in flyout | [asset:menu.json, asset:menu/screening-credentialing.png] |
| Screening/Credentialing | File Upload/Download/Search | `/Credentialing/FileMgmtSearch` | shown in flyout | [asset:menu.json, asset:menu/screening-credentialing.png] |
| TPL Case Tracking | Case | `/TPLCaseTracking/SearchCase` | shown in flyout | [asset:menu.json, asset:menu/tpl-case-tracking.png] |
| TPL Case Tracking | Contact | `/TPLCaseTracking/SearchContact` | shown in flyout | [asset:menu.json, asset:menu/tpl-case-tracking.png] |
| TPL Case Tracking | Desktop Review Upload | `/TPLCaseTracking/DesktopReviewUpload` | shown in flyout | [asset:menu.json, asset:menu/tpl-case-tracking.png] |
| TPL Case Tracking | Search Desktop Review | `/TPLCaseTracking/SearchDesktopReviewCase` | shown in flyout | [asset:menu.json, asset:menu/tpl-case-tracking.png] |
| TPL Case Tracking | Worker Compensation Intake | `/TPLCaseTracking/SearchWorkerCompensation` | shown in flyout | [asset:menu.json, asset:menu/tpl-case-tracking.png] |
| TPL Case Tracking | Manage Case Assignment Permissions | `/TPLCaseTracking/SearchCaseAssignmentPermissions` | shown in flyout | [asset:menu.json, asset:menu/tpl-case-tracking.png] |
| TPL Policy | Carrier | `/TPLPolicy/SearchCarrier` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Employer | `/TPLPolicy/SearchEmployer` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Policyholder | `/TPLPolicy/SearchPolicyholder` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Absent Parent | `/TPLPolicy/SearchAbsentParent` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Policy | `/TPLPolicy/SearchTPLPolicy` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | TPL Policy Intake | `/TPLPolicy/SearchPolicyIntake` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Mass Carrier Migration | `/TPLPolicy/SearchCarrierMigration` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Non-Covered Code | `/TPLPolicy/SearchNonCoveredCode` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Member | `/TPLPolicy/MemberSearch` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Carrier Crosswalk Rule | `/TPLPolicy/SearchCarrierCrossWalkRule` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | TPL Policy Letters | `/TPLPolicy/SearchPolicyLetter` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL Policy | Member Quick View | `/TPLPolicy/MemberQuickView` | shown in flyout | [asset:menu.json, asset:menu/tpl-policy.png] |
| TPL HIPP | Search HIPP | `/TPLHIPP/SearchHIPP` | shown in flyout | [asset:menu.json, asset:menu/tpl-hipp.png] |
| TPL HIPP | Average Expenditure | `/TPLHIPP/SearchAverageExpenditure` | shown in flyout | [asset:menu.json, asset:menu/tpl-hipp.png] |
| Task Management | Dashboard | `/TaskManagement/Dashboard` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Task Template | `/TaskManagement/SearchTaskTemplate` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Task List | `/TaskManagement/SearchTaskList` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Link Configuration | `/TaskManagement/SearchLinkConfiguration` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Routing Configuration | `/TaskManagement/SearchRoutingConfiguration` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Manage User Association | `/TaskManagement/SearchUserAssociation` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Manage User Schedule | `/TaskManagement/SearchUserCapacity` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |
| Task Management | Bulk Recall | `/TaskManagement/SearchRecallTask` | shown in flyout | [asset:menu.json, asset:menu/task-management.png] |

## 6. Fields & validation
None. [asset:facts.md]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `sideMenu.isOpen` | boolean | false | hamburger click / close icon / menu item click | whether the side menu overlay is visible | [ctl:button-main-menu-2, asset:kit/states/menu-open.png] |
| `sideMenu.hoveredModule` | string | null | null | hover over a module row | which module flyout is shown | [asset:menu/administration.png] |

## 8. Behavior
### 8.1 Header (top nav)
- THE SYSTEM SHALL render the top navigation links “en”, “MESSAGES”, “EXTERNAL LINKS”, “FAVORITES”, “CONTACT US”, “MY ACCOUNT”, “LOGOUT” in the header. [ctl:link-en, ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, ctl:link-my-account, ctl:link-logout, asset:reference.png]
- WHEN the user hovers the client logo THE SYSTEM SHALL show a tooltip “Client Logo”. [ctl:link-client-logo, asset:kit/states/tooltip.png]

### 8.2 Side menu (hamburger + flyouts)
- WHEN the user activates the hamburger (“Main Menu”) THE SYSTEM SHALL show the side menu overlay. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]
- WHEN the side menu is open THE SYSTEM SHALL dim the page content behind it. [asset:kit/states/menu-open.png]
- WHEN the user hovers a module row in the side menu THE SYSTEM SHALL show that module’s flyout panel listing its items. [asset:menu.json, asset:menu/administration.png]
- WHEN the user activates the side menu close icon (X) THE SYSTEM SHALL hide the side menu overlay. [asset:kit/states/menu-open.png, asset:kit/screen.json]

### 8.3 Footer
- THE SYSTEM SHALL render footer links: “Disclaimer”, “Website Requirements”, “Privacy Policy”, “Cookie Policy”. [ctl:button-disclaimer, ctl:button-website-requirements, ctl:button-privacy-policy, ctl:button-cookie-policy, asset:sections/02-disclaimer-the-website-is-prov.png]

### 8.4 Scroll behavior
None. [asset:facts.md]

### 8.5 Media
None. [asset:facts.md]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-my-account` | `/Home/MyAccount` | same tab (legacy href) | [ctl:link-my-account, asset:content.md] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab (legacy href) | [ctl:link-logout, asset:content.md] |
| Header link “MESSAGES” | `javascript:getBroadcastMsg();` | in-page action (details unknown) | [ctl:link-messages, asset:content.md, UNKNOWN: what UI opens for Messages] |
| Header link “EXTERNAL LINKS” | `javascript:toggleVisibilityStyle('divExternalLinks');` | in-page action (details unknown) | [ctl:link-external-links, asset:content.md, UNKNOWN: what UI opens for External Links] |
| Header link “FAVORITES” | `javascript:getFavorites();` | in-page action (details unknown) | [ctl:link-favorites, asset:content.md, UNKNOWN: what UI opens for Favorites] |
| Header link “CONTACT US” | `javascript:getContactUs();` | in-page action (details unknown) | [ctl:link-contact-us, asset:content.md, UNKNOWN: what UI opens for Contact Us] |
| Side menu > File Transfer Services > File Transfer Configuration | route `#/fxfer-v3/file-transfer-configuration` | SPA route | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu > File Transfer Services > File Transfer Tracking | route `#/fxfer-v3/file-transfer-tracking` | SPA route | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu > File Transfer Services > FTP Server Credentials | route `#/fxfer-v3/ftp-server-credentials` | SPA route | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu > all other items | no route | shown but does not navigate in this rebuilt app | [asset:menu.json] |
| Footer “Disclaimer” | [UNKNOWN: destination/page] | unknown | [ctl:button-disclaimer, asset:content.md] |
| Footer “Website Requirements” | [UNKNOWN: destination/page] | unknown | [ctl:button-website-requirements, asset:content.md] |
| Footer “Privacy Policy” | [UNKNOWN: destination/page] | unknown | [ctl:button-privacy-policy, asset:content.md] |
| Footer “Cookie Policy” | [UNKNOWN: destination/page] | unknown | [ctl:button-cookie-policy, asset:content.md] |

## 10. Server interactions
None observed. [asset:facts.md]

## 11. Accessibility
- Client logo is an image link; hover tooltip text is “Client Logo”. [ctl:link-client-logo, asset:kit/states/tooltip.png]
- Hero image cell has `role="img"` with aria-label “Stethoscope and tablet laying on medical office desk”. [ctl:img-stethoscope-and-tablet-laying-on, asset:capture/dom.json]
- Links use underline on hover; focus shows an outline + inset box-shadow per shared styles. [ctl:link-client-logo, asset:facts.md]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v3/screens/home/spec/parity.spec.ts` uses them:
`pageHeader`, `pageBannerLogo`, `link-client-logo`, `button-medicaid-management-solutions`, `link-en`, `link-messages`, `link-external-links`, `link-favorites`, `link-contact-us`, `link-my-account`, `link-logout`, `button-main-menu-2`, `button-help`, `img-stethoscope-and-tablet-laying-on`, `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`, `footerCopyright`, `footerBuild`. [asset:facts.md]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v3/screens/home/spec/parity.spec.ts`

## 13. Open questions
1. What UI opens for header actions “MESSAGES”, “EXTERNAL LINKS”, “FAVORITES”, “CONTACT US” (dialog/panel content, close behavior)? — answer from: legacy UX/product owner, or a dedicated capture that explores those actions. [UNKNOWN]
2. Where do the footer links navigate (“Disclaimer”, “Website Requirements”, “Privacy Policy”, “Cookie Policy”)? — answer from: legacy UX/product owner, or capture with those clicks explored. [UNKNOWN]
3. What does the Help icon (book in blue circle) do when activated? — answer from: legacy UX/product owner, or capture with that click explored. [UNKNOWN]

## 14. Motion
None. [asset:motion.json]
