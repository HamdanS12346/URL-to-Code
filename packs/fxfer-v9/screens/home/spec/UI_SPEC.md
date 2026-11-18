# UI SPEC — fxfer-v9/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome · viewport 1920×1080 CSS px @ dpr 1 · legacy built with ASP.NET MVC + jQuery + Kendo UI for jQuery (Provider portal) · target React 19 [asset:../run.json]
> Evidence tags:
> ctl:<key> element · kit:<id> kit widget/action/dialog · asset:<path> file under this screen folder · css:<selector> rule in snapshot/used.css · [UNKNOWN: …]

## 1. Overview
Home/landing screen that shows a hero image + tagline, and defines the shared Provider-portal shell used across the app (fixed header + hamburger side menu + footer). [asset:../reference.png]
Primary tasks:
- Open the side menu from the header hamburger and choose a File Transfer Services destination. [ctl:button-main-menu-2, asset:menu/file-transfer-services.png]
- Use the header utility menu items (EN, Messages, External Links, Favorites, Contact Us, My Account, Logout). [ctl:button-en, ctl:AAGMenu.BroadcastMsg, ctl:AAGMenu.ExternalLinks, ctl:AAGMenu.Favorites, ctl:AAGMenu.ContactUs, ctl:AAGMenu.MyAccount, ctl:AAGMenu.Logout, ctl:link-en, ctl:link-messages, ctl:link-external-links, ctl:link-favorites, ctl:link-contact-us, asset:aria.yml]
- Open footer informational overlays (Disclaimer / Website Requirements / Privacy Policy / Cookie Policy). [ctl:button-disclaimer]

## 2. Layout
Page: fluid 100% width, background rgb(255, 255, 255); fixed header height 66px; body content starts below the header (62px top padding on body). [css:#pageHeader.header, asset:reference.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Fixed header bar | div#pageHeader.header {pageHeader} | 0,0,1920,66 | reference | flex row, space-between | bg rgb(43, 58, 68); border-bottom 4px solid rgb(48, 179, 254) | [asset:../reference.png] |
| Header hamburger area | div#pageBannerMenu.display-block {pageBannerMenu} / {button-main-menu-2} | 1852,0,68,62 | reference | flex center | bg rgb(48, 179, 254) | [asset:reference.png, ctl:button-main-menu-2] |
| Top row under header | div#mcbRowBorder.row {mcbRowBorder} | 0,62,1920,44 | sections/01 | flex row | border-bottom 0.666667px solid rgb(179, 179, 179) | [asset:sections/01-mcbrowborder.png] |
| Main body | div#pageBody.row {pageBody} | 0,106,1920,526 | sections/01 | table with 2 columns | left 65% background image; right 35% copy, right-aligned | [asset:sections/01-mcbrowborder.png] |
| Footer (links row) | footer | 0,632,1920,119 | sections/02 | stacked: dark link bar + light info row | dark bar bg rgb(43, 58, 68); link text rgb(255,255,255) | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 2.1 Header (shared shell)
- Top row contains the Help button (book icon) with key button-help. [ctl:button-help, asset:../reference.png]
- Left: client logo image inside a link/button region {pageBannerLogo}. [ctl:pageBannerLogo, asset:reference.png]
- Center: product/system name “Medicaid Management Solutions” and environment name “Final Test” (rendered uppercase via CSS). [ctl:button, ctl:button-medicaid-management-solutions, asset:reference.png]
- Right (menubar): EN, Messages, External Links, Favorites, Contact Us, My Account, Logout. [ctl:button-2, asset:capture/aria.yml]
- Far right: hamburger button “Main Menu” (Font Awesome icon “”). [ctl:button-main-menu-2, asset:capture/aria.yml]

### 2.2 Home hero
- Two-column table row:
  - Left cell td.myHome_img uses background image capture/assets/Content/dxc.ua3.core.home.myhome.png (cover, centered) and is 65% width. [css:.myHome_img, asset:sections/01-mcbrowborder.png]
  - Right cell td.myHome_copy is 35% width with right-aligned copy anchored near the bottom:
    - <h2> “Medicaid Management Solutions” (font-size 3.3rem). [css:.myHome_copy h2, asset:sections/01-mcbrowborder.png]
    - <p> “Charting a New Direction for Better Healthcare Outcomes” (font-size 1.3rem). [css:.myHome_copy p, asset:sections/01-mcbrowborder.png]

### 2.3 Footer (shared shell)
- Dark “subfooter” link bar with 4 links: Disclaimer, Website Requirements, Privacy Policy, Cookie Policy. [css:.subfooter, asset:sections/02-disclaimer-the-website-is-prov.png]
- Light info row: “© 2026 Gainwell Technologies. All rights reserved.” plus “Server: … Build Date: … v…” at right. [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --font-sans | Arial, "Helvetica Neue", Helvetica, sans-serif | body text | [asset:../facts.md] |
| --font-size-base | 14px | body and menu | [asset:../facts.md] |
| --color-page-bg | rgb(255, 255, 255) | page background | [asset:../facts.md] |
| --color-header-bg | rgb(43, 58, 68) | header + footer bar | [asset:../facts.md] |
| --color-accent-blue | rgb(48, 179, 254) | header bottom border, hamburger bg | [asset:../facts.md] |
| --color-accent-green | rgb(0, 238, 174) | theme highlight and menu focus color | [asset:facts.md, css::root] |
| --color-text-default | rgb(61, 61, 61) | page copy | [asset:../facts.md] |
| --color-text-invert | rgb(255, 255, 255) | header/footer text | [asset:../facts.md] |

## 4. Assets
| file (under capture/ or screen folder) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| capture/assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png | header logo | 117×57 | natural 169×82 | [asset:../facts.md] |
| capture/assets/Content/dxc.ua3.core.home.myhome.png | home hero left background | 1236×522 | background image of td.myHome_img | [asset:../facts.md] |

## 5. Components
React component tree (shared components marked *shared*):
- HomePage
  - AppShell *shared* — fixed header, utility menu, hamburger, side menu overlay, footer [asset:../reference.png]
  - HomeHero — hero image + copy [asset:sections/01-mcbrowborder.png]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| AppShell *shared* | none | sideMenuOpen, activeHeaderPanel | pageBannerLogo, button, button-medicaid-management-solutions, button-en, link-en, link-messages, link-external-links, link-favorites, link-contact-us, AAGMenu.MyAccount, AAGMenu.Logout, link-logout, button-main-menu-2, button-help, footer buttons | [asset:../reference.png] |
| HeaderBar *shared* | none | activeHeaderPanel | pageBannerLogo, button, button-medicaid-management-solutions, button-2 | [asset:reference.png, css:#pageHeader.header] |
| SideMenuOverlay *shared* | menu data from menu.json | sideMenuOpen | open/close via button-main-menu-2 | [asset:../kit/states/menu-open.png, asset:menu.json] |
| HomeHero | none | none | (no interactive keys) | [asset:sections/01-mcbrowborder.png] |
| FooterBar *shared* | none | none | button-disclaimer, button-website-requirements, button-privacy-policy, button-cookie-policy | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 5.1 Menu flyout visuals (one screenshot per hovered module)
| module (hovered) | screenshot | evidence |
|---|---|---|
| Administration | menu/administration.png | [asset:../menu/administration.png] |
| Alert Notification | menu/alert-notification.png | [asset:../menu/alert-notification.png] |
| Claims Management | menu/claims-management.png | [asset:../menu/claims-management.png] |
| Drug Rebate | menu/drug-rebate.png | [asset:../menu/drug-rebate.png] |
| UI Examples | menu/ui-examples.png | [asset:../menu/ui-examples.png] |
| File Transfer Services | menu/file-transfer-services.png | [asset:../menu/file-transfer-services.png] |
| Integration | menu/integration.png | [asset:../menu/integration.png] |
| Managed Care | menu/managed-care.png | [asset:../menu/managed-care.png] |
| Member Management | menu/member-management.png | [asset:../menu/member-management.png] |
| Plan Management | menu/plan-management.png | [asset:../menu/plan-management.png] |
| Program Integrity | menu/program-integrity.png | [asset:../menu/program-integrity.png] |
| PI Case Tracking | menu/pi-case-tracking.png | [asset:../menu/pi-case-tracking.png] |
| Provider Enrollment | menu/provider-enrollment.png | [asset:../menu/provider-enrollment.png] |
| Provider Management | menu/provider-management.png | [asset:../menu/provider-management.png] |
| Screening/Credentialing | menu/screening-credentialing.png | [asset:../menu/screening-credentialing.png] |
| TPL Case Tracking | menu/tpl-case-tracking.png | [asset:../menu/tpl-case-tracking.png] |
| TPL Policy | menu/tpl-policy.png | [asset:../menu/tpl-policy.png] |
| TPL HIPP | menu/tpl-hipp.png | [asset:../menu/tpl-hipp.png] |
| Task Management | menu/task-management.png | [asset:../menu/task-management.png] |

### 5.2 Side menu tree (verbatim from menu.json)
| module | item | legacy href | evidence |
|---|---|---|---|
| Administration | (module) | | [asset:../menu.json] |
| Administration | Broadcast Message | /BroadcastMessage/BroadcastMessageSearch | [asset:../menu.json] |
| Administration | FAQ's | /FAQMaintenance/FAQMaintenanceSearch | [asset:../menu.json] |
| Administration | Manage Application Settings | /AppSetting/ManageAppSettings | [asset:../menu.json] |
| Administration | Manage HTML Blocks | /Localization/ManageHtmlBlocks | [asset:../menu.json] |
| Administration | Manage Help | /ManageHelpContent/HelpContentSearch | [asset:../menu.json] |
| Administration | Manage Images | /Localization/ManageImages | [asset:../menu.json] |
| Administration | Manage IOC Settings | /AppSetting/ManageIocSettings | [asset:../menu.json] |
| Administration | Manage Labels | /Localization/ManageLabels | [asset:../menu.json] |
| Administration | Manage Menus | /Menu/ManageMenus | [asset:../menu.json] |
| Administration | Manage Menu Items | /Menu/ManageMenuItems | [asset:../menu.json] |
| Administration | Manage Messages | /Localization/ManageMessages | [asset:../menu.json] |
| Administration | Manage Security Functions | /Localization/ManageSecurityFunctions | [asset:../menu.json] |
| Administration | Manage Security Rights | /Localization/ManageSecurityRights | [asset:../menu.json] |
| Administration | Manage Security Roles | /Localization/ManageSecurityRoles | [asset:../menu.json] |
| Administration | Manage Services | /Service/ManageServices | [asset:../menu.json] |
| Administration | Manage Subscriptions | /EventSubscriptions/ManageSubscription | [asset:../menu.json] |
| Administration | Manage Module Events | /ModuleEvents/ManageModuleEvents | [asset:../menu.json] |
| Administration | Manage Users | /UserMaintenance/ManageUsers | [asset:../menu.json] |
| Administration | Manage User Invitations | /UserMaintenance/ManageUserInvitations | [asset:../menu.json] |
| Alert Notification | (module) | | [asset:../menu.json] |
| Alert Notification | Event Configuration | /Notifications/EventNotificationSearch | [asset:../menu.json] |
| Alert Notification | Subscriber Configuration | /Notifications/SubscriberSearch | [asset:../menu.json] |
| Alert Notification | Event Subscription | /Notifications/SubscriptionDetails | [asset:../menu.json] |
| Alert Notification | Tracking | /Notifications/NotificationTracking | [asset:../menu.json] |
| Claims Management | (module) | | [asset:../menu.json] |
| Claims Management | Search Claims | /ClaimsManagement/SearchClaims | [asset:../menu.json] |
| Claims Management | Pro DUR | /ProDUR/ProDURDashBoard | [asset:../menu.json] |
| Drug Rebate | (module) | | [asset:../menu.json] |
| Drug Rebate | Dashboard | /DrugRebate/Dashboard | [asset:../menu.json] |
| Drug Rebate | Labeler | /DrugRebate/SearchLabelerInformation | [asset:../menu.json] |
| Drug Rebate | NDC | /NationalDrugCode/SearchNationalDrugCode | [asset:../menu.json] |
| Drug Rebate | Claim Level Detail | /ClaimDetails/SearchClaims | [asset:../menu.json] |
| Drug Rebate | CCN List | /CashControlNumbers/SearchCashControlNumbers | [asset:../menu.json] |
| Drug Rebate | ROSI/PQAS List | /DrugRebate/SearchRosiPqas | [asset:../menu.json] |
| Drug Rebate | Disputes List | /Invoice/SearchNDCDisputes | [asset:../menu.json] |
| Drug Rebate | Invoice Management | /Invoice/SearchInvoiceInquiry | [asset:../menu.json] |
| Drug Rebate | NDC Invoice Inquiry | /NDCInvoice/SearchNDCInvoiceInquiry | [asset:../menu.json] |
| Drug Rebate | CCN/NDC Association | /Invoice/SearchCCNAssociated | [asset:../menu.json] |
| Drug Rebate | PPA Maintenance | /PPAMaintenance/SearchPPAMaintenance | [asset:../menu.json] |
| Drug Rebate | Incremental Adjustments | /IncrementalAdjustment/SearchIncrementalAdjustment | [asset:../menu.json] |
| Drug Rebate | Postmark Dates | /PostmarkDates/PostmarkDates | [asset:../menu.json] |
| Drug Rebate | T-Bill Rates | /DrugRebate/SearchTreasuryBillRates | [asset:../menu.json] |
| Drug Rebate | 340b Providers | /DrugRebate/SearchProvider340b | [asset:../menu.json] |
| Drug Rebate | Provider Recoupment | /ProviderRecoupment/SearchProviderRecoupment | [asset:../menu.json] |
| Drug Rebate | Invoice Process Flags | /DrugRebate/InvoiceProcessFlags | [asset:../menu.json] |
| Drug Rebate | Fund Codes | /FundCodes/SearchFundCodes | [asset:../menu.json] |
| Drug Rebate | Web Information | /WebAdmin/WebAdmin | [asset:../menu.json] |
| UI Examples | (module) | | [asset:../menu.json] |
| UI Examples | Page Elements / Widgets | /Employee/UIExamples | [asset:../menu.json] |
| File Transfer Services | (module) | | [asset:../menu.json] |
| File Transfer Services | File Transfer Configuration | /FileTransfer/SearchSourceLocations | [asset:../menu.json] |
| File Transfer Services | File Transfer Tracking | /FileTransfer/SearchFileTransferTracking | [asset:../menu.json] |
| File Transfer Services | FTP Server Credentials | /FileTransfer/SearchFTPServerCredentials | [asset:../menu.json] |
| Integration | (module) | | [asset:../menu.json] |
| Integration | Event To File Query Builder | /EventToFileWizard/SearchEventToFileMetadata | [asset:../menu.json] |
| Integration | File To Event Metadata | /EventsDistributor/SearchFileDefinition | [asset:../menu.json] |
| Integration | File To Event Orchestration | /FileToEventOrchestration/SearchExternalOrchestration | [asset:../menu.json] |
| Integration | Event Status Tracking | /EventStatusTracking/SearchEventStatus | [asset:../menu.json] |
| Integration | System Process Tracking | /SystemProcessTracking/SearchSystemProcessTracking | [asset:../menu.json] |
| Integration | Dashboard | /Integration/Dashboard | [asset:../menu.json] |
| Managed Care | (module) | | [asset:../menu.json] |
| Managed Care | MCE | /ManagedCare/SearchMCE | [asset:../menu.json] |
| Managed Care | Member | /ManagedCare/SearchMember | [asset:../menu.json] |
| Managed Care | Network | /Network/SearchNetwork | [asset:../menu.json] |
| Managed Care | Provider | /ManagedCare/SearchPCPProvider | [asset:../menu.json] |
| Managed Care | HIPAA Transactions | /ManagedCare/EDITxnSearch | [asset:../menu.json] |
| Managed Care | Lock Out | /ManagedCare/SearchLockOutByPCPMCEMember | [asset:../menu.json] |
| Managed Care | Screening Results | /ManagedCare/ScreeningResults | [asset:../menu.json] |
| Managed Care | Capitation | /ManagedCare/Capitation | [asset:../menu.json] |
| Managed Care | Reports | /ManagedCare/ManagedCareReports | [asset:../menu.json] |
| Managed Care | Reference Data | /ManagedCare/ReferenceData | [asset:../menu.json] |
| Managed Care | Provider MCE Enrollment | /ManagedCare/SearchProviderMCEEnrollment | [asset:../menu.json] |
| Managed Care | File Upload | /ManagedCare/SearchCapitationFileUpload | [asset:../menu.json] |
| Managed Care | Mass Transfer | /ManagedCare/MassTransferSearch | [asset:../menu.json] |
| Member Management | (module) | | [asset:../menu.json] |
| Member Management | Member | /MemberManagement/SearchMember | [asset:../menu.json] |
| Member Management | Medicaid Case | /MedicaidCase/SearchMedicaidCase | [asset:../menu.json] |
| Member Management | Fulfillment Materials | /FulfillmentMaterials/FulfillmentMaterials | [asset:../menu.json] |
| Member Management | Fraud Protection | /FraudProtection/SearchFraudProtection | [asset:../menu.json] |
| Member Management | Group | /Group/SearchGroup | [asset:../menu.json] |
| Member Management | Broker/Sales/TPA | /BrokerSalesTPA/SearchBrokerSalesTPA | [asset:../menu.json] |
| Member Management | Person | /Person/SearchPerson | [asset:../menu.json] |
| Plan Management | (module) | | [asset:../menu.json] |
| Plan Management | Reference Data | /PlanManagement/ReferenceData | [asset:../menu.json] |
| Plan Management | Pharmacy Related Data | /PlanManagement/SearchPharmacyRelatedData | [asset:../menu.json] |
| Plan Management | Related Data | /PlanManagement/SearchRelatedInformation | [asset:../menu.json] |
| Plan Management | Rate Setting | /PlanManagement/SearchRates | [asset:../menu.json] |
| Plan Management | File Upload | /PlanManagement/FileUpload | [asset:../menu.json] |
| Plan Management | Manage Cycles | /PlanManagement/SearchCycleSchedule | [asset:../menu.json] |
| Program Integrity | (module) | | [asset:../menu.json] |
| Program Integrity | Dashboard | /ProgramIntegrity/PIURDashboard | [asset:../menu.json] |
| Program Integrity | Manage Configurations | /ProgramIntegrity/ManageConfigurations | [asset:../menu.json] |
| Program Integrity | Custom Peer Groups | /ProgramIntegrity/CustomPeerGroupSearch | [asset:../menu.json] |
| Program Integrity | Service Types | /ProgramIntegrity/ServiceTypeSearch | [asset:../menu.json] |
| Program Integrity | Study Request | /ProgramIntegrity/StudyRequestSearch | [asset:../menu.json] |
| Program Integrity | Suppressed Entities | /ProgramIntegrity/SuppressEntitySearch | [asset:../menu.json] |
| Program Integrity | Study Analysis Catalog | /ProgramIntegrity/StudyAnalysisCatalog | [asset:../menu.json] |
| Program Integrity | Manage Assignment Permissions | /ProgramIntegrity/SearchAssignmentPermissions | [asset:../menu.json] |
| Program Integrity | Predictive Model Definition | /ProgramIntegrity/SearchPMDefinition | [asset:../menu.json] |
| Program Integrity | Targeted Query Definition | /ProgramIntegrity/TargetedQueryDefinitionSearch | [asset:../menu.json] |
| Program Integrity | Analysis Review | /ProgramIntegrity/AnalysisReviewHome | [asset:../menu.json] |
| Program Integrity | Case Request | /ProgramIntegrity/CaseRequestSearch | [asset:../menu.json] |
| PI Case Tracking | (module) | | [asset:../menu.json] |
| PI Case Tracking | Dashboard | /ProgramIntegrityCT/Dashboard | [asset:../menu.json] |
| PI Case Tracking | Case | /ProgramIntegrityCT/SearchCase | [asset:../menu.json] |
| PI Case Tracking | Intake | /ProgramIntegrityCT/SearchIntake | [asset:../menu.json] |
| PI Case Tracking | Review Types | /ProgramIntegrityCT/SearchReviewTypes | [asset:../menu.json] |
| PI Case Tracking | SuperCase | /ProgramIntegrityCT/SearchSuperCase | [asset:../menu.json] |
| PI Case Tracking | Contact | /ProgramIntegrityCT/SearchContact | [asset:../menu.json] |
| PI Case Tracking | User Information | /ProgramIntegrityCT/SearchUserInformation | [asset:../menu.json] |
| PI Case Tracking | Letter Template | /ProgramIntegrityCT/SearchLetterTemplate | [asset:../menu.json] |
| PI Case Tracking | Bulk Load | /ProgramIntegrityCT/SearchBulkLoad | [asset:../menu.json] |
| Provider Enrollment | (module) | | [asset:../menu.json] |
| Provider Enrollment | Dashboard | /ProviderEnrollment/Dashboard | [asset:../menu.json] |
| Provider Enrollment | Search Enrollment Application | /ProviderEnrollment/SearchProviderApplication | [asset:../menu.json] |
| Provider Enrollment | Search Enrollment Reports | /ProviderEnrollment/SearchEnrollmentReports | [asset:../menu.json] |
| Provider Enrollment | Workflow Dashboard | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard | [asset:../menu.json] |
| Provider Enrollment | Workflow Applications | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications | [asset:../menu.json] |
| Provider Enrollment | Workflow Configuration | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration | [asset:../menu.json] |
| Provider Enrollment | Workflow Tasks | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks | [asset:../menu.json] |
| Provider Enrollment | New Enrollment Entry | /ProviderEnrollment/CreateSecureEnrollment | [asset:../menu.json] |
| Provider Enrollment | Resume Enrollment Entry | /ProviderEnrollment/ResumeSecureEnrollment | [asset:../menu.json] |
| Provider Management | (module) | | [asset:../menu.json] |
| Provider Management | Providers | /ProviderManagement/SearchProvider | [asset:../menu.json] |
| Provider Management | Owners and Managing Employees | /ProviderManagement/SearchOwnerManagingEmployeeAssociation | [asset:../menu.json] |
| Provider Management | IRS W-9 Tax IDs | /ProviderManagement/SearchIRSTaxId | [asset:../menu.json] |
| Provider Management | Provider Summary | /ProviderManagement/SearchProviderSummary | [asset:../menu.json] |
| Provider Management | CLIA Numbers | /ProviderManagement/SearchCLIANumber | [asset:../menu.json] |
| Provider Management | EFT Enrollments | /ProviderManagement/SearchBaseEFTEnrollments | [asset:../menu.json] |
| Provider Management | Workflow Items | /ProviderManagement/CompletedWorkItems | [asset:../menu.json] |
| Provider Management | MCO Enrollment List | /ProviderManagement/SearchMCOProvider | [asset:../menu.json] |
| Provider Management | Bulk Transactions Within Base ID | /ProviderManagement/SearchBulkTransaction | [asset:../menu.json] |
| Provider Management | NPPR Transactions | /ProviderManagement/SearchNPPR | [asset:../menu.json] |
| Provider Management | PRN Transactions | /ProviderManagement/SearchPRN | [asset:../menu.json] |
| Provider Management | EP Workflow Transactions | /ProviderManagement/SearchEPTransaction | [asset:../menu.json] |
| Provider Management | Base ID Termination Transactions | /ProviderManagement/SearchProviderBaseIDTermTransaction | [asset:../menu.json] |
| Provider Management | Mass Change Transactions | /ProviderManagement/SearchMassChangeTransaction | [asset:../menu.json] |
| Provider Management | Change Of Ownership Transactions | /ProviderManagement/SearchChangeOfOwnershipTransactions | [asset:../menu.json] |
| Provider Management | Provider Dashboard | /ProviderManagement/Dashboard | [asset:../menu.json] |
| Provider Management | Managed Care Entities | /ProviderManagedCare/SearchManagedCareEntity | [asset:../menu.json] |
| Screening/Credentialing | (module) | | [asset:../menu.json] |
| Screening/Credentialing | Dashboard | /Credentialing/Dashboard | [asset:../menu.json] |
| Screening/Credentialing | Credentialing Application Review | http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review | [asset:../menu.json] |
| Screening/Credentialing | Search | /Credentialing/Search | [asset:../menu.json] |
| Screening/Credentialing | Search Audit History | /Credentialing/AuditSearch | [asset:../menu.json] |
| Screening/Credentialing | File Upload/Download/Search | /Credentialing/FileMgmtSearch | [asset:../menu.json] |
| TPL Case Tracking | (module) | | [asset:../menu.json] |
| TPL Case Tracking | Case | /TPLCaseTracking/SearchCase | [asset:../menu.json] |
| TPL Case Tracking | Contact | /TPLCaseTracking/SearchContact | [asset:../menu.json] |
| TPL Case Tracking | Desktop Review Upload | /TPLCaseTracking/DesktopReviewUpload | [asset:../menu.json] |
| TPL Case Tracking | Search Desktop Review | /TPLCaseTracking/SearchDesktopReviewCase | [asset:../menu.json] |
| TPL Case Tracking | Worker Compensation Intake | /TPLCaseTracking/SearchWorkerCompensation | [asset:../menu.json] |
| TPL Case Tracking | Manage Case Assignment Permissions | /TPLCaseTracking/SearchCaseAssignmentPermissions | [asset:../menu.json] |
| TPL Policy | (module) | | [asset:../menu.json] |
| TPL Policy | Carrier | /TPLPolicy/SearchCarrier | [asset:../menu.json] |
| TPL Policy | Employer | /TPLPolicy/SearchEmployer | [asset:../menu.json] |
| TPL Policy | Policyholder | /TPLPolicy/SearchPolicyholder | [asset:../menu.json] |
| TPL Policy | Absent Parent | /TPLPolicy/SearchAbsentParent | [asset:../menu.json] |
| TPL Policy | Policy | /TPLPolicy/SearchTPLPolicy | [asset:../menu.json] |
| TPL Policy | TPL Policy Intake | /TPLPolicy/SearchPolicyIntake | [asset:../menu.json] |
| TPL Policy | Mass Carrier Migration | /TPLPolicy/SearchCarrierMigration | [asset:../menu.json] |
| TPL Policy | Non-Covered Code | /TPLPolicy/SearchNonCoveredCode | [asset:../menu.json] |
| TPL Policy | Member | /TPLPolicy/MemberSearch | [asset:../menu.json] |
| TPL Policy | Carrier Crosswalk Rule | /TPLPolicy/SearchCarrierCrossWalkRule | [asset:../menu.json] |
| TPL Policy | TPL Policy Letters | /TPLPolicy/SearchPolicyLetter | [asset:../menu.json] |
| TPL Policy | Member Quick View | /TPLPolicy/MemberQuickView | [asset:../menu.json] |
| TPL HIPP | (module) | | [asset:../menu.json] |
| TPL HIPP | Search HIPP | /TPLHIPP/SearchHIPP | [asset:../menu.json] |
| TPL HIPP | Average Expenditure | /TPLHIPP/SearchAverageExpenditure | [asset:../menu.json] |
| Task Management | (module) | | [asset:../menu.json] |
| Task Management | Dashboard | /TaskManagement/Dashboard | [asset:../menu.json] |
| Task Management | Task Template | /TaskManagement/SearchTaskTemplate | [asset:../menu.json] |
| Task Management | Task List | /TaskManagement/SearchTaskList | [asset:../menu.json] |
| Task Management | Link Configuration | /TaskManagement/SearchLinkConfiguration | [asset:../menu.json] |
| Task Management | Routing Configuration | /TaskManagement/SearchRoutingConfiguration | [asset:../menu.json] |
| Task Management | Manage User Association | /TaskManagement/SearchUserAssociation | [asset:../menu.json] |
| Task Management | Manage User Schedule | /TaskManagement/SearchUserCapacity | [asset:../menu.json] |
| Task Management | Bulk Recall | /TaskManagement/SearchRecallTask | [asset:../menu.json] |

## 6. Fields & validation
None. [asset:../facts.md]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| sideMenuOpen | boolean | false | hamburger button-main-menu-2; close X / menu link | shows div#mainMenuContainer + backdrop div.disabled-backdrop | [ctl:button-main-menu-2, asset:kit/screen.json] |
| activeHeaderPanel | enum (none | languages | messages | externalLinks | favorites | contactUs | myAccount) | none | clicking header items | shows/hides a corresponding .aag-panel overlay | [ctl:link-messages, css:.aag-panel] |
| headerHiddenOnScroll | boolean | false | scrolling down/up | hides/shows #pageHeader with CSS transition on transform | [asset:../kit/screen.json, asset:motion.json] |

Hidden at load (facts §12):
None. [asset:../facts.md]

## 8. Behavior
### 8.1 Header + hamburger menu (shared shell)
- THE SYSTEM SHALL render a fixed header bar at the top of the viewport. [asset:reference.png, css:#pageHeader.header]
- WHEN the user activates the hamburger button (button-main-menu-2) THE SYSTEM SHALL open the side menu overlay and show a backdrop. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]
- WHEN the side menu is open THEN THE SYSTEM SHALL close it when its X is activated or when a menu link is activated (not Escape, not clicking the backdrop). [asset:facts.md, asset:kit/screen.json]

### 8.2 Header utility panels
- WHEN the user activates “External Links” THEN THE SYSTEM SHALL show an overlay panel that includes a Close action extLinksCloseButton with visible text “Close”. [ctl:link-external-links, ctl:extLinksCloseButton]
- WHEN the user activates “Messages” THEN THE SYSTEM SHALL show an overlay panel that includes a Close action messagesCloseButton with visible text “Close”. [ctl:link-messages, ctl:messagesCloseButton]
- WHEN the user activates “Contact Us” THEN THE SYSTEM SHALL show an overlay panel that includes a Close action intPortalContactUsCloseButton with visible text “Close”. [ctl:link-contact-us, ctl:intPortalContactUsCloseButton]

### 8.3 Scroll behavior
- WHEN the page is scrolled down past 150px THE SYSTEM SHALL hide the header and show it again when scrolling back up (Headroom behavior). [asset:../kit/screen.json]

### 8.4 Media
None. [asset:../facts.md]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| pageBannerLogo | #/fxfer-v9/home | app route | [ctl:pageBannerLogo] |
| Header: link-my-account | None (not part of File Transfer Services app scope) | no-op | [asset:aria.yml] |
| Header: link-logout | [UNKNOWN: how logout is handled in the rebuild] | [UNKNOWN] | [ctl:link-logout] |
| Footer: button-disclaimer | /Home/SiteDisclaimer/ (modal overlay) | legacy overlay request | [ctl:button-disclaimer] |
| Footer: button-website-requirements | /Home/SiteRequirements/ (modal overlay) | legacy overlay request | [ctl:button-website-requirements] |
| Footer: button-privacy-policy | /Home/PrivacyPolicy/ (modal overlay) | legacy overlay request | [ctl:button-privacy-policy] |
| Footer: button-cookie-policy | /Home/CookiePolicy/ (modal overlay) | legacy overlay request | [ctl:button-cookie-policy] |

### 9.1 Side menu items
| trigger (key) | item | destination | how | evidence |
|---|---|---|---|---|
| Side menu → Administration | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Broadcast Message | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | FAQ's | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Application Settings | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage HTML Blocks | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Help | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Images | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage IOC Settings | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Labels | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Menus | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Menu Items | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Messages | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Security Functions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Security Rights | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Security Roles | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Services | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Subscriptions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Module Events | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage Users | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Administration | Manage User Invitations | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Alert Notification | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Alert Notification | Event Configuration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Alert Notification | Subscriber Configuration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Alert Notification | Event Subscription | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Alert Notification | Tracking | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Claims Management | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Claims Management | Search Claims | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Claims Management | Pro DUR | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Labeler | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | NDC | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Claim Level Detail | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | CCN List | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | ROSI/PQAS List | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Disputes List | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Invoice Management | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | NDC Invoice Inquiry | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | CCN/NDC Association | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | PPA Maintenance | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Incremental Adjustments | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Postmark Dates | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | T-Bill Rates | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | 340b Providers | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Provider Recoupment | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Invoice Process Flags | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Fund Codes | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Drug Rebate | Web Information | None (no route) | no-op | [asset:../menu.json] |
| Side menu → UI Examples | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → UI Examples | Page Elements / Widgets | None (no route) | no-op | [asset:../menu.json] |
| Side menu → File Transfer Services | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → File Transfer Services | File Transfer Configuration | #/fxfer-v9/file-transfer-configuration | app route | [asset:../menu.json] |
| Side menu → File Transfer Services | File Transfer Tracking | [UNKNOWN: route/screen id for File Transfer Tracking] | app route | [asset:../menu.json] |
| Side menu → File Transfer Services | FTP Server Credentials | [UNKNOWN: route/screen id for FTP Server Credentials] | app route | [asset:../menu.json] |
| Side menu → Integration | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Integration | Event To File Query Builder | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Integration | File To Event Metadata | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Integration | File To Event Orchestration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Integration | Event Status Tracking | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Integration | System Process Tracking | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Integration | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | MCE | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Member | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Network | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Provider | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | HIPAA Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Lock Out | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Screening Results | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Capitation | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Reports | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Reference Data | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Provider MCE Enrollment | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | File Upload | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Managed Care | Mass Transfer | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Member | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Medicaid Case | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Fulfillment Materials | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Fraud Protection | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Group | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Broker/Sales/TPA | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Member Management | Person | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | Reference Data | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | Pharmacy Related Data | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | Related Data | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | Rate Setting | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | File Upload | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Plan Management | Manage Cycles | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Manage Configurations | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Custom Peer Groups | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Service Types | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Study Request | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Suppressed Entities | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Study Analysis Catalog | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Manage Assignment Permissions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Predictive Model Definition | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Targeted Query Definition | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Analysis Review | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Program Integrity | Case Request | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Case | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Intake | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Review Types | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | SuperCase | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Contact | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | User Information | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Letter Template | None (no route) | no-op | [asset:../menu.json] |
| Side menu → PI Case Tracking | Bulk Load | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Search Enrollment Application | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Search Enrollment Reports | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Workflow Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Workflow Applications | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Workflow Configuration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Workflow Tasks | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | New Enrollment Entry | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Enrollment | Resume Enrollment Entry | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Providers | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Owners and Managing Employees | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | IRS W-9 Tax IDs | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Provider Summary | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | CLIA Numbers | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | EFT Enrollments | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Workflow Items | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | MCO Enrollment List | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Bulk Transactions Within Base ID | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | NPPR Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | PRN Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | EP Workflow Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Base ID Termination Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Mass Change Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Change Of Ownership Transactions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Provider Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Provider Management | Managed Care Entities | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Screening/Credentialing | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Screening/Credentialing | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Screening/Credentialing | Credentialing Application Review | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Screening/Credentialing | Search | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Screening/Credentialing | Search Audit History | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Screening/Credentialing | File Upload/Download/Search | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | Case | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | Contact | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | Desktop Review Upload | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | Search Desktop Review | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | Worker Compensation Intake | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Case Tracking | Manage Case Assignment Permissions | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Carrier | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Employer | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Policyholder | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Absent Parent | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Policy | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | TPL Policy Intake | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Mass Carrier Migration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Non-Covered Code | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Member | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Carrier Crosswalk Rule | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | TPL Policy Letters | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL Policy | Member Quick View | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL HIPP | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL HIPP | Search HIPP | None (no route) | no-op | [asset:../menu.json] |
| Side menu → TPL HIPP | Average Expenditure | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | (module) | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Dashboard | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Task Template | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Task List | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Link Configuration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Routing Configuration | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Manage User Association | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Manage User Schedule | None (no route) | no-op | [asset:../menu.json] |
| Side menu → Task Management | Bulk Recall | None (no route) | no-op | [asset:../menu.json] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| Header “Languages” (link-en) | JS getLanguage() (requests not observed) | [UNKNOWN: languages API] | [UNKNOWN] | [ctl:link-en] |
| Header “Messages” (link-messages) | JS getBroadcastMsg() (requests not observed) | [UNKNOWN: messages API] | [UNKNOWN] | [ctl:link-messages] |
| Header “External Links” (link-external-links) | JS toggleVisibilityStyle("divExternalLinks") | none (client show/hide) | shows/hides panel | [ctl:link-external-links] |
| Header “Favorites” (link-favorites) | JS getFavorites() (requests not observed) | [UNKNOWN: favorites API] | [UNKNOWN] | [ctl:link-favorites] |
| Header “Contact Us” (link-contact-us) | JS getContactUs() (requests not observed) | [UNKNOWN: contact-us API] | [UNKNOWN] | [ctl:link-contact-us] |
| Footer “Disclaimer” | GET /Home/SiteDisclaimer/ in a modal overlay (openModalOverlay) | [UNKNOWN: modal overlay content source] | overlay with disclaimer content | [ctl:button-disclaimer] |
| Footer “Website Requirements” | GET /Home/SiteRequirements/ in a modal overlay (openModalOverlay) | [UNKNOWN] | [UNKNOWN] | [ctl:button-website-requirements] |
| Footer “Privacy Policy” | GET /Home/PrivacyPolicy/ in a modal overlay (openModalOverlay) | [UNKNOWN] | [UNKNOWN] | [ctl:button-privacy-policy] |
| Footer “Cookie Policy” | GET /Home/CookiePolicy/ in a modal overlay (openModalOverlay) | [UNKNOWN] | [UNKNOWN] | [ctl:button-cookie-policy] |

## 11. Accessibility
- The header is exposed as a banner region with a menubar containing menuitem entries for EN, Messages, External Links, Favorites, Contact Us, My Account, Logout. [asset:aria.yml]
- The hamburger control is exposed under navigation “Hamburger Menu” with button name “Main Menu”. [asset:aria.yml]
- The hero image cell exposes an accessible name “Stethoscope and tablet laying on medical office desk” via role=img / aria-label. [asset:aria.yml]

## 12. Test ids
Every element below gets data-testid="<key>" in the rebuild; packs/fxfer-v9/screens/home/spec/parity.spec.ts uses them:
pageBannerLogo, button, button-medicaid-management-solutions, button-2, button-en, link-en, AAGMenu.BroadcastMsg, link-messages, AAGMenu.ExternalLinks, link-external-links, AAGMenu.Favorites, link-favorites, AAGMenu.ContactUs, link-contact-us, AAGMenu.MyAccount, AAGMenu.Logout, link-logout, button-main-menu-2, button-help, button-disclaimer, button-website-requirements, button-privacy-policy, button-cookie-policy, link-my-account [asset:aria.yml]
Run: TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v9/screens/home/spec/parity.spec.ts [asset:../spec/parity.spec.ts]

## 13. Open questions
1. What is the intended rebuild behavior for “My Account” and “Logout” (in-app route vs external navigation)? [UNKNOWN]
2. What content and controls appear inside the header panels for Messages / External Links / Favorites / Contact Us (not captured in states)? [UNKNOWN]
3. What does the Help icon (button-help) do in this tenant (page-level help overlay vs no-op)? [UNKNOWN]
4. What are the rebuild route/screen ids for “File Transfer Tracking” and “FTP Server Credentials” (menu says they are in-app)? [UNKNOWN]

## 14. Motion
None. [asset:../motion.json]


