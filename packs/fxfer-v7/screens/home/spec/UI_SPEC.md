# UI SPEC — fxfer-v7/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome/ - viewport 1920x1080 CSS px @ dpr 1 - legacy built with jQuery 3.7.1 + Kendo UI for jQuery (Provider portal kit) - target React 19
> Evidence tags: `[T##]` behavior - `[ctl:key]` element - `[val:key]` validator - `[asset:path]` file under this screen folder (including `sections/`, `capture/`, `kit/`, `menu/`) - `[css:selector]` - `[UNKNOWN: ...]`

## 1. Overview
This is the Provider portal "My Home" page: it shows a static hero banner and footer, and it defines the shared shell used across this pack (header + hamburger side menu). [asset:reference.png]
Primary tasks:
- Open the side menu (hamburger) to browse modules and items. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]
- Navigate to File Transfer Services screens via the side menu flyout. [asset:menu/file-transfer-services.png]

## 2. Layout
Page: full-width fluid layout; fixed header at the top; body content starts below the header (body padding-top = 62px). [asset:facts.md]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Fixed header | `div#pageHeader` (`pageHeader`) | 0,0,1920,66 | reference | fixed | bg `rgb(43, 58, 68)`; bottom border `4px solid rgb(48, 179, 254)` | [asset:facts.md] |
| Menu button block | `div#pageBannerMenu` (`pageBannerMenu`) | 0,(in header),?,? | reference | icon button | hamburger icon; click opens side menu | [ctl:button-main-menu-2, asset:reference.png] |
| Divider row | `div#mcbRowBorder.row` (`mcbRowBorder`) | 0,62,1920,44 | reference | flex row | bottom border `0.666667px solid rgb(179, 179, 179)` | [asset:facts.md] |
| Main body | `div#pageBody.row` (`pageBody`) | 0,106,1920,526 | reference | contains hero table | hero image + right-side heading | [asset:facts.md, asset:sections/01-mcbrowborder.png] |
| Footer | `footer` | 0,632,1920,119 | reference | stacked bars | dark link bar + white build bar | [asset:facts.md, asset:sections/02-disclaimer-the-website-is-prov.png] |

### 2.1 Fixed header
- Left: client logo image (Gainwell) and portal title "Medicaid Management Solutions". [asset:reference.png]
- Under the title: environment label "Final Test". [asset:reference.png]
- Right: a horizontal list of quick actions/links: "en", "Messages", "External Links", "Favorites", "Contact Us", "My Account", "Logout", plus the hamburger menu icon at the far right. [asset:reference.png]
- Hovering the client logo shows a tooltip "Client Logo". [asset:kit/states/tooltip.png]

### 2.2 Hero banner
The content area shows a large grayscale photo (stethoscope + tablet) on the left, with the title and tagline on the right:
- Heading: "Medicaid Management Solutions"
- Tagline: "Charting a New Direction for Better Healthcare Outcomes"
[asset:sections/01-mcbrowborder.png]

### 2.3 Footer
- Dark subfooter bar with four items: "Disclaimer", "Website Requirements", "Privacy Policy", "Cookie Policy". [asset:sections/02-disclaimer-the-website-is-prov.png]
- White footer bar: left copyright line and right environment/build line. [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--color-bg` | `rgb(255, 255, 255)` | page background | [asset:facts.md] |
| `--color-header-bg` | `rgb(43, 58, 68)` | header background, footer dark bar | [asset:facts.md] |
| `--color-accent` | `rgb(48, 179, 254)` | header bottom border | [asset:facts.md] |
| `--font-body` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` @ `14px` | default text | [asset:facts.md] |
| `--color-text-default` | `rgb(51, 51, 51)` | body text | [asset:facts.md] |
| `--color-text-inverse` | `rgb(255, 255, 255)` | header/footer text | [asset:facts.md] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header logo | 117x57 | natural 169x82 | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/Content/dxc.ua3.core.home.myhome.png` | hero image background | 1236x522 | applied as `background-image` | [asset:assets/Content/dxc.ua3.core.home.myhome.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `HomePage`
  - `Header` *shared* - logo, portal title, header quick links, hamburger icon. [asset:reference.png]
  - `SideMenu` *shared* - off-canvas menu opened by the hamburger icon; contains module list and flyout submenus. [asset:kit/states/menu-open.png]
  - `HeroBanner` - hero image + title/tagline. [asset:sections/01-mcbrowborder.png]
  - `Footer` *shared* - policy links bar + build info bar. [asset:sections/02-disclaimer-the-website-is-prov.png]

### 5.1 Side menu modules (hover/flyout appearance)
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

### 5.2 Side menu content (full module -> item tree)
| module | item | legacy href | evidence |
|---|---|---|---|
| Administration | Broadcast Message | /BroadcastMessage/BroadcastMessageSearch | [asset:menu.json] |
| Administration | FAQ's | /FAQMaintenance/FAQMaintenanceSearch | [asset:menu.json] |
| Administration | Manage Application Settings | /AppSetting/ManageAppSettings | [asset:menu.json] |
| Administration | Manage HTML Blocks | /Localization/ManageHtmlBlocks | [asset:menu.json] |
| Administration | Manage Help | /ManageHelpContent/HelpContentSearch | [asset:menu.json] |
| Administration | Manage Images | /Localization/ManageImages | [asset:menu.json] |
| Administration | Manage IOC Settings | /AppSetting/ManageIocSettings | [asset:menu.json] |
| Administration | Manage Labels | /Localization/ManageLabels | [asset:menu.json] |
| Administration | Manage Menus | /Menu/ManageMenus | [asset:menu.json] |
| Administration | Manage Menu Items | /Menu/ManageMenuItems | [asset:menu.json] |
| Administration | Manage Messages | /Localization/ManageMessages | [asset:menu.json] |
| Administration | Manage Security Functions | /Localization/ManageSecurityFunctions | [asset:menu.json] |
| Administration | Manage Security Rights | /Localization/ManageSecurityRights | [asset:menu.json] |
| Administration | Manage Security Roles | /Localization/ManageSecurityRoles | [asset:menu.json] |
| Administration | Manage Services | /Service/ManageServices | [asset:menu.json] |
| Administration | Manage Subscriptions | /EventSubscriptions/ManageSubscription | [asset:menu.json] |
| Administration | Manage Module Events | /ModuleEvents/ManageModuleEvents | [asset:menu.json] |
| Administration | Manage Users | /UserMaintenance/ManageUsers | [asset:menu.json] |
| Administration | Manage User Invitations | /UserMaintenance/ManageUserInvitations | [asset:menu.json] |
| Alert Notification | Event Configuration | /Notifications/EventNotificationSearch | [asset:menu.json] |
| Alert Notification | Subscriber Configuration | /Notifications/SubscriberSearch | [asset:menu.json] |
| Alert Notification | Event Subscription | /Notifications/SubscriptionDetails | [asset:menu.json] |
| Alert Notification | Tracking | /Notifications/NotificationTracking | [asset:menu.json] |
| Claims Management | Search Claims | /ClaimsManagement/SearchClaims | [asset:menu.json] |
| Claims Management | Pro DUR | /ProDUR/ProDURDashBoard | [asset:menu.json] |
| Drug Rebate | Dashboard | /DrugRebate/Dashboard | [asset:menu.json] |
| Drug Rebate | Labeler | /DrugRebate/SearchLabelerInformation | [asset:menu.json] |
| Drug Rebate | NDC | /NationalDrugCode/SearchNationalDrugCode | [asset:menu.json] |
| Drug Rebate | Claim Level Detail | /ClaimDetails/SearchClaims | [asset:menu.json] |
| Drug Rebate | CCN List | /CashControlNumbers/SearchCashControlNumbers | [asset:menu.json] |
| Drug Rebate | ROSI/PQAS List | /DrugRebate/SearchRosiPqas | [asset:menu.json] |
| Drug Rebate | Disputes List | /Invoice/SearchNDCDisputes | [asset:menu.json] |
| Drug Rebate | Invoice Management | /Invoice/SearchInvoiceInquiry | [asset:menu.json] |
| Drug Rebate | NDC Invoice Inquiry | /NDCInvoice/SearchNDCInvoiceInquiry | [asset:menu.json] |
| Drug Rebate | CCN/NDC Association | /Invoice/SearchCCNAssociated | [asset:menu.json] |
| Drug Rebate | PPA Maintenance | /PPAMaintenance/SearchPPAMaintenance | [asset:menu.json] |
| Drug Rebate | Incremental Adjustments | /IncrementalAdjustment/SearchIncrementalAdjustment | [asset:menu.json] |
| Drug Rebate | Postmark Dates | /PostmarkDates/PostmarkDates | [asset:menu.json] |
| Drug Rebate | T-Bill Rates | /DrugRebate/SearchTreasuryBillRates | [asset:menu.json] |
| Drug Rebate | 340b Providers | /DrugRebate/SearchProvider340b | [asset:menu.json] |
| Drug Rebate | Provider Recoupment | /ProviderRecoupment/SearchProviderRecoupment | [asset:menu.json] |
| Drug Rebate | Invoice Process Flags | /DrugRebate/InvoiceProcessFlags | [asset:menu.json] |
| Drug Rebate | Fund Codes | /FundCodes/SearchFundCodes | [asset:menu.json] |
| Drug Rebate | Web Information | /WebAdmin/WebAdmin | [asset:menu.json] |
| UI Examples | Page Elements / Widgets | /Employee/UIExamples | [asset:menu.json] |
| File Transfer Services | File Transfer Configuration | /FileTransfer/SearchSourceLocations | [asset:menu.json] |
| File Transfer Services | File Transfer Tracking | /FileTransfer/SearchFileTransferTracking | [asset:menu.json] |
| File Transfer Services | FTP Server Credentials | /FileTransfer/SearchFTPServerCredentials | [asset:menu.json] |
| Integration | Event To File Query Builder | /EventToFileWizard/SearchEventToFileMetadata | [asset:menu.json] |
| Integration | File To Event Metadata | /EventsDistributor/SearchFileDefinition | [asset:menu.json] |
| Integration | File To Event Orchestration | /FileToEventOrchestration/SearchExternalOrchestration | [asset:menu.json] |
| Integration | Event Status Tracking | /EventStatusTracking/SearchEventStatus | [asset:menu.json] |
| Integration | System Process Tracking | /SystemProcessTracking/SearchSystemProcessTracking | [asset:menu.json] |
| Integration | Dashboard | /Integration/Dashboard | [asset:menu.json] |
| Managed Care | MCE | /ManagedCare/SearchMCE | [asset:menu.json] |
| Managed Care | Member | /ManagedCare/SearchMember | [asset:menu.json] |
| Managed Care | Network | /Network/SearchNetwork | [asset:menu.json] |
| Managed Care | Provider | /ManagedCare/SearchPCPProvider | [asset:menu.json] |
| Managed Care | HIPAA Transactions | /ManagedCare/EDITxnSearch | [asset:menu.json] |
| Managed Care | Lock Out | /ManagedCare/SearchLockOutByPCPMCEMember | [asset:menu.json] |
| Managed Care | Screening Results | /ManagedCare/ScreeningResults | [asset:menu.json] |
| Managed Care | Capitation | /ManagedCare/Capitation | [asset:menu.json] |
| Managed Care | Reports | /ManagedCare/ManagedCareReports | [asset:menu.json] |
| Managed Care | Reference Data | /ManagedCare/ReferenceData | [asset:menu.json] |
| Managed Care | Provider MCE Enrollment | /ManagedCare/SearchProviderMCEEnrollment | [asset:menu.json] |
| Managed Care | File Upload | /ManagedCare/SearchCapitationFileUpload | [asset:menu.json] |
| Managed Care | Mass Transfer | /ManagedCare/MassTransferSearch | [asset:menu.json] |
| Member Management | Member | /MemberManagement/SearchMember | [asset:menu.json] |
| Member Management | Medicaid Case | /MedicaidCase/SearchMedicaidCase | [asset:menu.json] |
| Member Management | Fulfillment Materials | /FulfillmentMaterials/FulfillmentMaterials | [asset:menu.json] |
| Member Management | Fraud Protection | /FraudProtection/SearchFraudProtection | [asset:menu.json] |
| Member Management | Group | /Group/SearchGroup | [asset:menu.json] |
| Member Management | Broker/Sales/TPA | /BrokerSalesTPA/SearchBrokerSalesTPA | [asset:menu.json] |
| Member Management | Person | /Person/SearchPerson | [asset:menu.json] |
| Plan Management | Reference Data | /PlanManagement/ReferenceData | [asset:menu.json] |
| Plan Management | Pharmacy Related Data | /PlanManagement/SearchPharmacyRelatedData | [asset:menu.json] |
| Plan Management | Related Data | /PlanManagement/SearchRelatedInformation | [asset:menu.json] |
| Plan Management | Rate Setting | /PlanManagement/SearchRates | [asset:menu.json] |
| Plan Management | File Upload | /PlanManagement/FileUpload | [asset:menu.json] |
| Plan Management | Manage Cycles | /PlanManagement/SearchCycleSchedule | [asset:menu.json] |
| Program Integrity | Dashboard | /ProgramIntegrity/PIURDashboard | [asset:menu.json] |
| Program Integrity | Manage Configurations | /ProgramIntegrity/ManageConfigurations | [asset:menu.json] |
| Program Integrity | Custom Peer Groups | /ProgramIntegrity/CustomPeerGroupSearch | [asset:menu.json] |
| Program Integrity | Service Types | /ProgramIntegrity/ServiceTypeSearch | [asset:menu.json] |
| Program Integrity | Study Request | /ProgramIntegrity/StudyRequestSearch | [asset:menu.json] |
| Program Integrity | Suppressed Entities | /ProgramIntegrity/SuppressEntitySearch | [asset:menu.json] |
| Program Integrity | Study Analysis Catalog | /ProgramIntegrity/StudyAnalysisCatalog | [asset:menu.json] |
| Program Integrity | Manage Assignment Permissions | /ProgramIntegrity/SearchAssignmentPermissions | [asset:menu.json] |
| Program Integrity | Predictive Model Definition | /ProgramIntegrity/SearchPMDefinition | [asset:menu.json] |
| Program Integrity | Targeted Query Definition | /ProgramIntegrity/TargetedQueryDefinitionSearch | [asset:menu.json] |
| Program Integrity | Analysis Review | /ProgramIntegrity/AnalysisReviewHome | [asset:menu.json] |
| Program Integrity | Case Request | /ProgramIntegrity/CaseRequestSearch | [asset:menu.json] |
| PI Case Tracking | Dashboard | /ProgramIntegrityCT/Dashboard | [asset:menu.json] |
| PI Case Tracking | Case | /ProgramIntegrityCT/SearchCase | [asset:menu.json] |
| PI Case Tracking | Intake | /ProgramIntegrityCT/SearchIntake | [asset:menu.json] |
| PI Case Tracking | Review Types | /ProgramIntegrityCT/SearchReviewTypes | [asset:menu.json] |
| PI Case Tracking | SuperCase | /ProgramIntegrityCT/SearchSuperCase | [asset:menu.json] |
| PI Case Tracking | Contact | /ProgramIntegrityCT/SearchContact | [asset:menu.json] |
| PI Case Tracking | User Information | /ProgramIntegrityCT/SearchUserInformation | [asset:menu.json] |
| PI Case Tracking | Letter Template | /ProgramIntegrityCT/SearchLetterTemplate | [asset:menu.json] |
| PI Case Tracking | Bulk Load | /ProgramIntegrityCT/SearchBulkLoad | [asset:menu.json] |
| Provider Enrollment | Dashboard | /ProviderEnrollment/Dashboard | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Application | /ProviderEnrollment/SearchProviderApplication | [asset:menu.json] |
| Provider Enrollment | Search Enrollment Reports | /ProviderEnrollment/SearchEnrollmentReports | [asset:menu.json] |
| Provider Enrollment | Workflow Dashboard | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard | [asset:menu.json] |
| Provider Enrollment | Workflow Applications | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications | [asset:menu.json] |
| Provider Enrollment | Workflow Configuration | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration | [asset:menu.json] |
| Provider Enrollment | Workflow Tasks | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks | [asset:menu.json] |
| Provider Enrollment | New Enrollment Entry | /ProviderEnrollment/CreateSecureEnrollment | [asset:menu.json] |
| Provider Enrollment | Resume Enrollment Entry | /ProviderEnrollment/ResumeSecureEnrollment | [asset:menu.json] |
| Provider Management | Providers | /ProviderManagement/SearchProvider | [asset:menu.json] |
| Provider Management | Owners and Managing Employees | /ProviderManagement/SearchOwnerManagingEmployeeAssociation | [asset:menu.json] |
| Provider Management | IRS W-9 Tax IDs | /ProviderManagement/SearchIRSTaxId | [asset:menu.json] |
| Provider Management | Provider Summary | /ProviderManagement/SearchProviderSummary | [asset:menu.json] |
| Provider Management | CLIA Numbers | /ProviderManagement/SearchCLIANumber | [asset:menu.json] |
| Provider Management | EFT Enrollments | /ProviderManagement/SearchBaseEFTEnrollments | [asset:menu.json] |
| Provider Management | Workflow Items | /ProviderManagement/CompletedWorkItems | [asset:menu.json] |
| Provider Management | MCO Enrollment List | /ProviderManagement/SearchMCOProvider | [asset:menu.json] |
| Provider Management | Bulk Transactions Within Base ID | /ProviderManagement/SearchBulkTransaction | [asset:menu.json] |
| Provider Management | NPPR Transactions | /ProviderManagement/SearchNPPR | [asset:menu.json] |
| Provider Management | PRN Transactions | /ProviderManagement/SearchPRN | [asset:menu.json] |
| Provider Management | EP Workflow Transactions | /ProviderManagement/SearchEPTransaction | [asset:menu.json] |
| Provider Management | Base ID Termination Transactions | /ProviderManagement/SearchProviderBaseIDTermTransaction | [asset:menu.json] |
| Provider Management | Mass Change Transactions | /ProviderManagement/SearchMassChangeTransaction | [asset:menu.json] |
| Provider Management | Change Of Ownership Transactions | /ProviderManagement/SearchChangeOfOwnershipTransactions | [asset:menu.json] |
| Provider Management | Provider Dashboard | /ProviderManagement/Dashboard | [asset:menu.json] |
| Provider Management | Managed Care Entities | /ProviderManagedCare/SearchManagedCareEntity | [asset:menu.json] |
| Screening/Credentialing | Dashboard | /Credentialing/Dashboard | [asset:menu.json] |
| Screening/Credentialing | Credentialing Application Review | http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review | [asset:menu.json] |
| Screening/Credentialing | Search | /Credentialing/Search | [asset:menu.json] |
| Screening/Credentialing | Search Audit History | /Credentialing/AuditSearch | [asset:menu.json] |
| Screening/Credentialing | File Upload/Download/Search | /Credentialing/FileMgmtSearch | [asset:menu.json] |
| TPL Case Tracking | Case | /TPLCaseTracking/SearchCase | [asset:menu.json] |
| TPL Case Tracking | Contact | /TPLCaseTracking/SearchContact | [asset:menu.json] |
| TPL Case Tracking | Desktop Review Upload | /TPLCaseTracking/DesktopReviewUpload | [asset:menu.json] |
| TPL Case Tracking | Search Desktop Review | /TPLCaseTracking/SearchDesktopReviewCase | [asset:menu.json] |
| TPL Case Tracking | Worker Compensation Intake | /TPLCaseTracking/SearchWorkerCompensation | [asset:menu.json] |
| TPL Case Tracking | Manage Case Assignment Permissions | /TPLCaseTracking/SearchCaseAssignmentPermissions | [asset:menu.json] |
| TPL Policy | Carrier | /TPLPolicy/SearchCarrier | [asset:menu.json] |
| TPL Policy | Employer | /TPLPolicy/SearchEmployer | [asset:menu.json] |
| TPL Policy | Policyholder | /TPLPolicy/SearchPolicyholder | [asset:menu.json] |
| TPL Policy | Absent Parent | /TPLPolicy/SearchAbsentParent | [asset:menu.json] |
| TPL Policy | Policy | /TPLPolicy/SearchTPLPolicy | [asset:menu.json] |
| TPL Policy | TPL Policy Intake | /TPLPolicy/SearchPolicyIntake | [asset:menu.json] |
| TPL Policy | Mass Carrier Migration | /TPLPolicy/SearchCarrierMigration | [asset:menu.json] |
| TPL Policy | Non-Covered Code | /TPLPolicy/SearchNonCoveredCode | [asset:menu.json] |
| TPL Policy | Member | /TPLPolicy/MemberSearch | [asset:menu.json] |
| TPL Policy | Carrier Crosswalk Rule | /TPLPolicy/SearchCarrierCrossWalkRule | [asset:menu.json] |
| TPL Policy | TPL Policy Letters | /TPLPolicy/SearchPolicyLetter | [asset:menu.json] |
| TPL Policy | Member Quick View | /TPLPolicy/MemberQuickView | [asset:menu.json] |
| TPL HIPP | Search HIPP | /TPLHIPP/SearchHIPP | [asset:menu.json] |
| TPL HIPP | Average Expenditure | /TPLHIPP/SearchAverageExpenditure | [asset:menu.json] |
| Task Management | Dashboard | /TaskManagement/Dashboard | [asset:menu.json] |
| Task Management | Task Template | /TaskManagement/SearchTaskTemplate | [asset:menu.json] |
| Task Management | Task List | /TaskManagement/SearchTaskList | [asset:menu.json] |
| Task Management | Link Configuration | /TaskManagement/SearchLinkConfiguration | [asset:menu.json] |
| Task Management | Routing Configuration | /TaskManagement/SearchRoutingConfiguration | [asset:menu.json] |
| Task Management | Manage User Association | /TaskManagement/SearchUserAssociation | [asset:menu.json] |
| Task Management | Manage User Schedule | /TaskManagement/SearchUserCapacity | [asset:menu.json] |
| Task Management | Bulk Recall | /TaskManagement/SearchRecallTask | [asset:menu.json] |

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `Header` | none | none | client logo, title, quick links, hamburger | [asset:reference.png] |
| `SideMenu` | menu tree from `menu.json` | `menuOpen`, `hoveredModule` | module buttons + item links | [asset:menu.json, asset:kit/states/menu-open.png] |
| `HeroBanner` | none | none | hero image + text | [asset:sections/01-mcbrowborder.png] |
| `Footer` | none | none | 4 policy items + build text | [asset:sections/02-disclaimer-the-website-is-prov.png] |

## 6. Fields & validation
No user-editable form fields are visible on this page in the captured state. [asset:reference.png]

Client-side validation: None found. [asset:facts.md]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `menuOpen` | boolean | `false` | hamburger click / close click | side menu visibility + backdrop | [asset:kit/states/menu-open.png] |
| `hoveredModule` | string|null | `null` | pointer hover on a module row | which flyout submenu is shown | [asset:menu/file-transfer-services.png] |

Hidden at load (facts S12):
None. [asset:facts.md]

## 8. Behavior
### 8.1 Side menu (shell)
- WHEN the user activates the hamburger icon in the header THEN THE SYSTEM SHALL open the side menu. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]
- WHEN the side menu is open THEN THE SYSTEM SHALL show a backdrop over the page content. [asset:kit/states/menu-open.png]
- WHEN the user activates the close (X) control in the header THEN THE SYSTEM SHALL close the side menu. [ctl:mainMenuClose, asset:kit/states/menu-open.png]
- WHEN the user hovers a module in the side menu THEN THE SYSTEM SHALL show that module's flyout submenu to the left of the module list. [asset:menu/administration.png]
- WHILE the viewport is at the "client" profile (1272x588) THEN THE SYSTEM SHALL render the open side menu with a visible scrollbar and a "Quick Links" header section as shown. [asset:kit/states/menu-open@client.png]
- WHILE the viewport is at the "client" profile (1272x588) AND a flyout submenu is taller than the available space THEN THE SYSTEM SHALL show flyout scroll controls (up/down) as shown. [asset:kit/states/menu-flyout@client.png]

### 8.2 Header overlays (Messages / External Links / Favorites / Contact Us)
- WHEN the user activates "Messages" THEN THE SYSTEM SHALL call `/Notification/BroadcastMsg?isAcknowledgedMsg=<True|False>` (GET) and show the Broadcast Message panel (`divCoreBroadcastMsg`). [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getBroadcastMsg]
- WHEN the user activates "External Links" THEN THE SYSTEM SHALL toggle the External Links panel (`divExternalLinks`). [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#toggleVisibilityStyle]
- WHEN the user activates "Favorites" THEN THE SYSTEM SHALL call `/Favorites/FavoritesContent` (POST, form field `name=<moduleName|empty>`) and toggle the Favorites panel (`divFavorites`). [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getFavorites]
- WHEN the user activates "Contact Us" THEN THE SYSTEM SHALL call `/Notification/ContactUs` (GET, JSON body includes `viewInNewWindow=false`) and toggle the Contact Us panel (`divCoreContactUs`). [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getContactUs]

### 8.3 Footer modal overlays
- WHEN the user activates "Disclaimer" THEN THE SYSTEM SHALL open modal overlay `SiteDisclaimerOverlay` with URL `/Home/SiteDisclaimer/`. [ctl:button-disclaimer, asset:capture/controls.json]
- WHEN the user activates "Website Requirements" THEN THE SYSTEM SHALL open modal overlay `SiteRequirementsOverlay` with URL `/Home/SiteRequirements/`. [ctl:button-website-requirements, asset:capture/controls.json]
- WHEN the user activates "Privacy Policy" THEN THE SYSTEM SHALL open modal overlay `SitePrivacyOverlay` with URL `/Home/SitePrivacy/`. [ctl:button-privacy-policy, asset:capture/controls.json]
- WHEN the user activates "Cookie Policy" THEN THE SYSTEM SHALL open modal overlay `SiteCookieOverlay` with URL `/Home/SiteCookie/`. [ctl:button-cookie-policy, asset:capture/controls.json]

### 8.4 Tooltip
- WHEN the user hovers the client logo THEN THE SYSTEM SHALL show a tooltip reading "Client Logo". [asset:kit/states/tooltip.png]

### 8.y Scroll behavior (facts S16: cite every [S##])
None observed / recorded for this capture. [asset:facts.md]

### 8.z Media (facts S17: cite every [V##])
None observed / recorded for this capture. [asset:facts.md]

## 9. Navigation
### 9.1 Header links
| trigger (key) | legacy destination | rebuild destination | how | evidence |
|---|---|---|---|---|
| Header: My Account (`link-my-account`) | `/Home/MyAccount` | None (display only in rebuild) | same tab | [ctl:link-my-account, asset:reference.png] |
| Header: Logout (`link-logout`) | `/Security/LogoutFromMenu` | None (display only in rebuild) | same tab | [ctl:link-logout, asset:reference.png] |
| Header: Messages (`link-messages`) | `getBroadcastMsg()` -> `/Notification/BroadcastMsg` (GET) | Show Broadcast Message panel (`divCoreBroadcastMsg`) | overlay | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getBroadcastMsg] |
| Header: External Links (`link-external-links`) | `toggleVisibilityStyle('divExternalLinks')` | Toggle External Links panel (`divExternalLinks`) | overlay | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#toggleVisibilityStyle] |
| Header: Favorites (`link-favorites`) | `getFavorites()` -> `/Favorites/FavoritesContent` (POST) | Toggle Favorites panel (`divFavorites`) | overlay | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getFavorites] |
| Header: Contact Us (`link-contact-us`) | `getContactUs()` -> `/Notification/ContactUs` (GET) | Toggle Contact Us panel (`divCoreContactUs`) | overlay | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getContactUs] |

### 9.2 Side menu items
| trigger | legacy destination | rebuild destination | how | evidence |
|---|---|---|---|---|
| Side menu -> Administration -> Broadcast Message | /BroadcastMessage/BroadcastMessageSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> FAQ's | /FAQMaintenance/FAQMaintenanceSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Application Settings | /AppSetting/ManageAppSettings | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage HTML Blocks | /Localization/ManageHtmlBlocks | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Help | /ManageHelpContent/HelpContentSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Images | /Localization/ManageImages | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage IOC Settings | /AppSetting/ManageIocSettings | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Labels | /Localization/ManageLabels | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Menus | /Menu/ManageMenus | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Menu Items | /Menu/ManageMenuItems | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Messages | /Localization/ManageMessages | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Security Functions | /Localization/ManageSecurityFunctions | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Security Rights | /Localization/ManageSecurityRights | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Security Roles | /Localization/ManageSecurityRoles | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Services | /Service/ManageServices | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Subscriptions | /EventSubscriptions/ManageSubscription | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Module Events | /ModuleEvents/ManageModuleEvents | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage Users | /UserMaintenance/ManageUsers | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Administration -> Manage User Invitations | /UserMaintenance/ManageUserInvitations | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Alert Notification -> Event Configuration | /Notifications/EventNotificationSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Alert Notification -> Subscriber Configuration | /Notifications/SubscriberSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Alert Notification -> Event Subscription | /Notifications/SubscriptionDetails | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Alert Notification -> Tracking | /Notifications/NotificationTracking | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Claims Management -> Search Claims | /ClaimsManagement/SearchClaims | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Claims Management -> Pro DUR | /ProDUR/ProDURDashBoard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Dashboard | /DrugRebate/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Labeler | /DrugRebate/SearchLabelerInformation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> NDC | /NationalDrugCode/SearchNationalDrugCode | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Claim Level Detail | /ClaimDetails/SearchClaims | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> CCN List | /CashControlNumbers/SearchCashControlNumbers | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> ROSI/PQAS List | /DrugRebate/SearchRosiPqas | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Disputes List | /Invoice/SearchNDCDisputes | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Invoice Management | /Invoice/SearchInvoiceInquiry | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> NDC Invoice Inquiry | /NDCInvoice/SearchNDCInvoiceInquiry | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> CCN/NDC Association | /Invoice/SearchCCNAssociated | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> PPA Maintenance | /PPAMaintenance/SearchPPAMaintenance | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Incremental Adjustments | /IncrementalAdjustment/SearchIncrementalAdjustment | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Postmark Dates | /PostmarkDates/PostmarkDates | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> T-Bill Rates | /DrugRebate/SearchTreasuryBillRates | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> 340b Providers | /DrugRebate/SearchProvider340b | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Provider Recoupment | /ProviderRecoupment/SearchProviderRecoupment | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Invoice Process Flags | /DrugRebate/InvoiceProcessFlags | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Fund Codes | /FundCodes/SearchFundCodes | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Drug Rebate -> Web Information | /WebAdmin/WebAdmin | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> UI Examples -> Page Elements / Widgets | /Employee/UIExamples | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> File Transfer Services -> File Transfer Configuration | /FileTransfer/SearchSourceLocations | #/fxfer-v7/file-transfer-configuration | same tab | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu -> File Transfer Services -> File Transfer Tracking | /FileTransfer/SearchFileTransferTracking | #/fxfer-v7/file-transfer-tracking | same tab | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu -> File Transfer Services -> FTP Server Credentials | /FileTransfer/SearchFTPServerCredentials | #/fxfer-v7/ftp-server-credentials | same tab | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu -> Integration -> Event To File Query Builder | /EventToFileWizard/SearchEventToFileMetadata | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Integration -> File To Event Metadata | /EventsDistributor/SearchFileDefinition | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Integration -> File To Event Orchestration | /FileToEventOrchestration/SearchExternalOrchestration | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Integration -> Event Status Tracking | /EventStatusTracking/SearchEventStatus | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Integration -> System Process Tracking | /SystemProcessTracking/SearchSystemProcessTracking | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Integration -> Dashboard | /Integration/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> MCE | /ManagedCare/SearchMCE | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Member | /ManagedCare/SearchMember | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Network | /Network/SearchNetwork | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Provider | /ManagedCare/SearchPCPProvider | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> HIPAA Transactions | /ManagedCare/EDITxnSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Lock Out | /ManagedCare/SearchLockOutByPCPMCEMember | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Screening Results | /ManagedCare/ScreeningResults | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Capitation | /ManagedCare/Capitation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Reports | /ManagedCare/ManagedCareReports | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Reference Data | /ManagedCare/ReferenceData | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Provider MCE Enrollment | /ManagedCare/SearchProviderMCEEnrollment | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> File Upload | /ManagedCare/SearchCapitationFileUpload | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Managed Care -> Mass Transfer | /ManagedCare/MassTransferSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Member | /MemberManagement/SearchMember | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Medicaid Case | /MedicaidCase/SearchMedicaidCase | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Fulfillment Materials | /FulfillmentMaterials/FulfillmentMaterials | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Fraud Protection | /FraudProtection/SearchFraudProtection | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Group | /Group/SearchGroup | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Broker/Sales/TPA | /BrokerSalesTPA/SearchBrokerSalesTPA | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Member Management -> Person | /Person/SearchPerson | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Plan Management -> Reference Data | /PlanManagement/ReferenceData | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Plan Management -> Pharmacy Related Data | /PlanManagement/SearchPharmacyRelatedData | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Plan Management -> Related Data | /PlanManagement/SearchRelatedInformation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Plan Management -> Rate Setting | /PlanManagement/SearchRates | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Plan Management -> File Upload | /PlanManagement/FileUpload | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Plan Management -> Manage Cycles | /PlanManagement/SearchCycleSchedule | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Dashboard | /ProgramIntegrity/PIURDashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Manage Configurations | /ProgramIntegrity/ManageConfigurations | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Custom Peer Groups | /ProgramIntegrity/CustomPeerGroupSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Service Types | /ProgramIntegrity/ServiceTypeSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Study Request | /ProgramIntegrity/StudyRequestSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Suppressed Entities | /ProgramIntegrity/SuppressEntitySearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Study Analysis Catalog | /ProgramIntegrity/StudyAnalysisCatalog | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Manage Assignment Permissions | /ProgramIntegrity/SearchAssignmentPermissions | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Predictive Model Definition | /ProgramIntegrity/SearchPMDefinition | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Targeted Query Definition | /ProgramIntegrity/TargetedQueryDefinitionSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Analysis Review | /ProgramIntegrity/AnalysisReviewHome | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Program Integrity -> Case Request | /ProgramIntegrity/CaseRequestSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Dashboard | /ProgramIntegrityCT/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Case | /ProgramIntegrityCT/SearchCase | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Intake | /ProgramIntegrityCT/SearchIntake | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Review Types | /ProgramIntegrityCT/SearchReviewTypes | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> SuperCase | /ProgramIntegrityCT/SearchSuperCase | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Contact | /ProgramIntegrityCT/SearchContact | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> User Information | /ProgramIntegrityCT/SearchUserInformation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Letter Template | /ProgramIntegrityCT/SearchLetterTemplate | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> PI Case Tracking -> Bulk Load | /ProgramIntegrityCT/SearchBulkLoad | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Dashboard | /ProviderEnrollment/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Search Enrollment Application | /ProviderEnrollment/SearchProviderApplication | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Search Enrollment Reports | /ProviderEnrollment/SearchEnrollmentReports | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Workflow Dashboard | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Workflow Applications | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Workflow Configuration | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Workflow Tasks | https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> New Enrollment Entry | /ProviderEnrollment/CreateSecureEnrollment | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Enrollment -> Resume Enrollment Entry | /ProviderEnrollment/ResumeSecureEnrollment | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Providers | /ProviderManagement/SearchProvider | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Owners and Managing Employees | /ProviderManagement/SearchOwnerManagingEmployeeAssociation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> IRS W-9 Tax IDs | /ProviderManagement/SearchIRSTaxId | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Provider Summary | /ProviderManagement/SearchProviderSummary | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> CLIA Numbers | /ProviderManagement/SearchCLIANumber | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> EFT Enrollments | /ProviderManagement/SearchBaseEFTEnrollments | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Workflow Items | /ProviderManagement/CompletedWorkItems | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> MCO Enrollment List | /ProviderManagement/SearchMCOProvider | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Bulk Transactions Within Base ID | /ProviderManagement/SearchBulkTransaction | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> NPPR Transactions | /ProviderManagement/SearchNPPR | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> PRN Transactions | /ProviderManagement/SearchPRN | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> EP Workflow Transactions | /ProviderManagement/SearchEPTransaction | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Base ID Termination Transactions | /ProviderManagement/SearchProviderBaseIDTermTransaction | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Mass Change Transactions | /ProviderManagement/SearchMassChangeTransaction | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Change Of Ownership Transactions | /ProviderManagement/SearchChangeOfOwnershipTransactions | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Provider Dashboard | /ProviderManagement/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Provider Management -> Managed Care Entities | /ProviderManagedCare/SearchManagedCareEntity | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Screening/Credentialing -> Dashboard | /Credentialing/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Screening/Credentialing -> Credentialing Application Review | http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Screening/Credentialing -> Search | /Credentialing/Search | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Screening/Credentialing -> Search Audit History | /Credentialing/AuditSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Screening/Credentialing -> File Upload/Download/Search | /Credentialing/FileMgmtSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Case Tracking -> Case | /TPLCaseTracking/SearchCase | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Case Tracking -> Contact | /TPLCaseTracking/SearchContact | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Case Tracking -> Desktop Review Upload | /TPLCaseTracking/DesktopReviewUpload | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Case Tracking -> Search Desktop Review | /TPLCaseTracking/SearchDesktopReviewCase | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Case Tracking -> Worker Compensation Intake | /TPLCaseTracking/SearchWorkerCompensation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Case Tracking -> Manage Case Assignment Permissions | /TPLCaseTracking/SearchCaseAssignmentPermissions | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Carrier | /TPLPolicy/SearchCarrier | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Employer | /TPLPolicy/SearchEmployer | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Policyholder | /TPLPolicy/SearchPolicyholder | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Absent Parent | /TPLPolicy/SearchAbsentParent | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Policy | /TPLPolicy/SearchTPLPolicy | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> TPL Policy Intake | /TPLPolicy/SearchPolicyIntake | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Mass Carrier Migration | /TPLPolicy/SearchCarrierMigration | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Non-Covered Code | /TPLPolicy/SearchNonCoveredCode | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Member | /TPLPolicy/MemberSearch | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Carrier Crosswalk Rule | /TPLPolicy/SearchCarrierCrossWalkRule | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> TPL Policy Letters | /TPLPolicy/SearchPolicyLetter | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL Policy -> Member Quick View | /TPLPolicy/MemberQuickView | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL HIPP -> Search HIPP | /TPLHIPP/SearchHIPP | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> TPL HIPP -> Average Expenditure | /TPLHIPP/SearchAverageExpenditure | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Dashboard | /TaskManagement/Dashboard | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Task Template | /TaskManagement/SearchTaskTemplate | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Task List | /TaskManagement/SearchTaskList | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Link Configuration | /TaskManagement/SearchLinkConfiguration | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Routing Configuration | /TaskManagement/SearchRoutingConfiguration | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Manage User Association | /TaskManagement/SearchUserAssociation | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Manage User Schedule | /TaskManagement/SearchUserCapacity | None (display only in rebuild) | same tab | [asset:menu.json] |
| Side menu -> Task Management -> Bulk Recall | /TaskManagement/SearchRecallTask | None (display only in rebuild) | same tab | [asset:menu.json] |

### 9.3 Footer items
| trigger (key) | legacy destination | rebuild destination | how | evidence |
|---|---|---|---|---|
| Footer: Disclaimer (`button-disclaimer`) | `openModalOverlay('SiteDisclaimerOverlay', '/Home/SiteDisclaimer/', 'panelForm-col-3', null, null);` | [UNKNOWN: modal overlay contents not captured] | overlay | [ctl:button-disclaimer, asset:capture/controls.json] |
| Footer: Website Requirements (`button-website-requirements`) | `openModalOverlay('SiteRequirementsOverlay', '/Home/SiteRequirements/', 'panelForm-col-4', null, null);` | [UNKNOWN: modal overlay contents not captured] | overlay | [ctl:button-website-requirements, asset:capture/controls.json] |
| Footer: Privacy Policy (`button-privacy-policy`) | `openModalOverlay('SitePrivacyOverlay', '/Home/SitePrivacy/', 'panelForm-col-4', null, null);` | [UNKNOWN: modal overlay contents not captured] | overlay | [ctl:button-privacy-policy, asset:capture/controls.json] |
| Footer: Cookie Policy (`button-cookie-policy`) | `openModalOverlay('SiteCookieOverlay', '/Home/SiteCookie/', 'panelForm-col-3', null, null);` | [UNKNOWN: modal overlay contents not captured] | overlay | [ctl:button-cookie-policy, asset:capture/controls.json] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response -> UI | evidence |
|---|---|---|---|---|
| Header: Messages | `GET /Notification/BroadcastMsg?isAcknowledgedMsg=<True|False>` | [UNKNOWN: mock/service contract for rebuild] | populates + shows `divCoreBroadcastMsg` | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getBroadcastMsg] |
| Header: Favorites | `POST /Favorites/FavoritesContent` (form: `name=<moduleName|empty>`) | [UNKNOWN: mock/service contract for rebuild] | populates + toggles `divFavorites` | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getFavorites] |
| Header: Contact Us | `GET /Notification/ContactUs` (JSON includes `viewInNewWindow=false`) | [UNKNOWN: mock/service contract for rebuild] | populates + toggles `divCoreContactUs` | [js:Scripts/hp.ua3.core.atAGlance__884a35a7.js#getContactUs] |

## 11. Accessibility
- Interactive header items are real links/buttons and should be focusable with a visible focus outline consistent with the legacy CSS. [asset:facts.md]
- The hamburger icon and portal title show focus outlines in the legacy CSS rules. [asset:facts.md]

## 12. Test ids
Every element below gets data-testid=<key> in the rebuild; packs/fxfer-v7/screens/home/spec/parity.spec.ts uses them. [asset:spec/selectors.json]

~~~text
[ctl:0be55229-882f-46c7-8b33-1aecaed3be2d] [ctl:1a4a335c-0321-479d-b956-c601e2495ac1] [ctl:20e5db49-5597-41e6-82cc-4aec920ed2b6] [ctl:40c82707-1b81-4064-9c93-0afec1db24b0] [ctl:4cd7133a-cc99-41d8-b9e2-c2ad9fa744d8] [ctl:4d1b4c4d-9101-4eba-851e-4f5b11d11de5] [ctl:69af15c1-263e-4ba2-8de4-c0f216088791] [ctl:6da8bb33-04e4-49c6-b471-145183128808]
[ctl:716943f4-369a-4ca5-938d-b8496ccf7871] [ctl:88b67c1d-ec49-4692-96c8-01d3136bb365] [ctl:8c4c1512-4c23-4a54-9edb-feed64150c95] [ctl:923ca7ff-53e6-4742-b92d-b2893e3b3478] [ctl:a180fcae-2821-49d6-bf9a-9b7cf6202ee9] [ctl:AAGMenu.BroadcastMsg] [ctl:AAGMenu.BroadcastMsg_mbl] [ctl:AAGMenu.ContactUs]
[ctl:AAGMenu.ContactUs_mbl] [ctl:AAGMenu.ExternalLinks] [ctl:AAGMenu.ExternalLinks_mbl] [ctl:AAGMenu.Favorites] [ctl:AAGMenu.Favorites_mbl] [ctl:AAGMenu.Logout] [ctl:AAGMenu.Logout_mbl] [ctl:AAGMenu.MyAccount]
[ctl:AAGMenu.MyAccount_mbl] [ctl:acknowledgedMsgButton] [ctl:Audit] [ctl:auditClose] [ctl:auditHelp] [ctl:b4441069-9607-47ff-a783-f8fc1118e242] [ctl:button] [ctl:button-10]
[ctl:button-11] [ctl:button-12] [ctl:button-13] [ctl:button-14] [ctl:button-15] [ctl:button-16] [ctl:button-17] [ctl:button-18]
[ctl:button-19] [ctl:button-2] [ctl:button-20] [ctl:button-21] [ctl:button-3] [ctl:button-340b-providers] [ctl:button-4] [ctl:button-5]
[ctl:button-6] [ctl:button-7] [ctl:button-8] [ctl:button-9] [ctl:button-absent-parent] [ctl:button-administration] [ctl:button-alert-notification-event-configu] [ctl:button-analysis-review]
[ctl:button-average-expenditure] [ctl:button-base-id-termination-transactions] [ctl:button-broadcast-message] [ctl:button-broker-sales-tpa] [ctl:button-bulk-load] [ctl:button-bulk-recall] [ctl:button-bulk-transactions-within-base-id] [ctl:button-capitation]
[ctl:button-carrier] [ctl:button-carrier-crosswalk-rule] [ctl:button-case] [ctl:button-case-2] [ctl:button-case-request] [ctl:button-ccn-list] [ctl:button-ccn-ndc-association] [ctl:button-change-of-ownership-transactions]
[ctl:button-claim-level-detail] [ctl:button-claims-management-search-claims-] [ctl:button-clia-numbers] [ctl:button-close] [ctl:button-close-2] [ctl:button-close-3] [ctl:button-close-4] [ctl:button-close-5]
[ctl:button-close-6] [ctl:button-close-7] [ctl:button-close-8] [ctl:button-contact] [ctl:button-contact-2] [ctl:button-cookie-policy] [ctl:button-credentialing-application-review] [ctl:button-custom-peer-groups]
[ctl:button-dashboard] [ctl:button-dashboard-2] [ctl:button-dashboard-3] [ctl:button-dashboard-4] [ctl:button-dashboard-5] [ctl:button-dashboard-6] [ctl:button-dashboard-7] [ctl:button-desktop-review-upload]
[ctl:button-disclaimer] [ctl:button-disputes-list] [ctl:button-drug-rebate-dashboard-labeler-nd] [ctl:button-eft-enrollments] [ctl:button-employer] [ctl:button-en] [ctl:button-en-2] [ctl:button-ep-workflow-transactions]
[ctl:button-event-configuration] [ctl:button-event-status-tracking] [ctl:button-event-subscription] [ctl:button-event-to-file-query-builder] [ctl:button-faq-s] [ctl:button-file-to-event-metadata] [ctl:button-file-to-event-orchestration] [ctl:button-file-transfer-configuration]
[ctl:button-file-transfer-services-file-tran] [ctl:button-file-transfer-tracking] [ctl:button-file-upload] [ctl:button-file-upload-2] [ctl:button-file-upload-download-search] [ctl:button-fraud-protection] [ctl:button-ftp-server-credentials] [ctl:button-fulfillment-materials]
[ctl:button-fund-codes] [ctl:button-group] [ctl:button-help] [ctl:button-help-2] [ctl:button-hipaa-transactions] [ctl:button-incremental-adjustments] [ctl:button-intake] [ctl:button-integration-event-to-file-query-]
[ctl:button-invoice-management] [ctl:button-invoice-process-flags] [ctl:button-irs-w-9-tax-ids] [ctl:button-labeler] [ctl:button-letter-template] [ctl:button-link-configuration] [ctl:button-lock-out] [ctl:button-main-menu]
[ctl:button-main-menu-2] [ctl:button-manage-application-settings] [ctl:button-manage-assignment-permissions] [ctl:button-manage-case-assignment-permissio] [ctl:button-manage-configurations] [ctl:button-manage-cycles] [ctl:button-managed-care-entities] [ctl:button-managed-care-mce-member-network-]
[ctl:button-manage-help] [ctl:button-manage-html-blocks] [ctl:button-manage-images] [ctl:button-manage-ioc-settings] [ctl:button-manage-labels] [ctl:button-manage-menu-items] [ctl:button-manage-menus] [ctl:button-manage-messages]
[ctl:button-manage-module-events] [ctl:button-manage-security-functions] [ctl:button-manage-security-rights] [ctl:button-manage-security-roles] [ctl:button-manage-services] [ctl:button-manage-subscriptions] [ctl:button-manage-user-association] [ctl:button-manage-user-invitations]
[ctl:button-manage-users] [ctl:button-manage-user-schedule] [ctl:button-mass-carrier-migration] [ctl:button-mass-change-transactions] [ctl:button-mass-transfer] [ctl:button-mce] [ctl:button-mco-enrollment-list] [ctl:button-medicaid-case]
[ctl:button-medicaid-management-solutions] [ctl:button-member] [ctl:button-member-2] [ctl:button-member-3] [ctl:button-member-management-member-medicai] [ctl:button-member-quick-view] [ctl:button-ndc] [ctl:button-ndc-invoice-inquiry]
[ctl:button-network] [ctl:button-new-enrollment-entry] [ctl:button-non-covered-code] [ctl:button-nppr-transactions] [ctl:button-open-in-separate-window] [ctl:button-open-in-separate-window-2] [ctl:button-open-in-separate-window-3] [ctl:button-open-in-separate-window-4]
[ctl:button-open-in-separate-window-5] [ctl:button-open-in-separate-window-6] [ctl:button-owners-and-managing-employees] [ctl:button-page-elements-widgets] [ctl:button-person] [ctl:button-pharmacy-related-data] [ctl:button-pi-case-tracking-dashboard-case-] [ctl:button-plan-management-reference-data-p]
[ctl:button-policy] [ctl:button-policyholder] [ctl:button-postmark-dates] [ctl:button-ppa-maintenance] [ctl:button-predictive-model-definition] [ctl:button-privacy-policy] [ctl:button-prn-transactions] [ctl:button-pro-dur]
[ctl:button-program-integrity-dashboard-mana] [ctl:button-provider] [ctl:button-provider-dashboard] [ctl:button-provider-enrollment-dashboard-se] [ctl:button-provider-management-providers-ow] [ctl:button-provider-mce-enrollment] [ctl:button-provider-recoupment] [ctl:button-providers]
[ctl:button-provider-summary] [ctl:button-rate-setting] [ctl:button-reference-data] [ctl:button-reference-data-2] [ctl:button-related-data] [ctl:button-reports] [ctl:button-resume-enrollment-entry] [ctl:button-review-types]
[ctl:button-rosi-pqas-list] [ctl:button-routing-configuration] [ctl:button-screening-credentialing-dashboar] [ctl:button-screening-results] [ctl:button-search] [ctl:button-search-audit-history] [ctl:button-search-claims] [ctl:button-search-desktop-review]
[ctl:button-search-enrollment-application] [ctl:button-search-enrollment-reports] [ctl:button-search-hipp] [ctl:button-service-types] [ctl:button-study-analysis-catalog] [ctl:button-study-request] [ctl:button-subscriber-configuration] [ctl:button-supercase]
[ctl:button-suppressed-entities] [ctl:button-system-process-tracking] [ctl:button-targeted-query-definition] [ctl:button-task-list] [ctl:button-task-management-dashboard-task-t] [ctl:button-task-template] [ctl:button-t-bill-rates] [ctl:button-tpl-case-tracking-case-contact-d]
[ctl:button-tpl-hipp-search-hipp-average-exp] [ctl:button-tpl-policy-carrier-employer-poli] [ctl:button-tpl-policy-intake] [ctl:button-tpl-policy-letters] [ctl:button-tracking] [ctl:button-ui-examples-page-elements-widget] [ctl:button-user-information] [ctl:button-web-information]
[ctl:button-website-requirements] [ctl:button-worker-compensation-intake] [ctl:button-workflow-applications] [ctl:button-workflow-configuration] [ctl:button-workflow-dashboard] [ctl:button-workflow-items] [ctl:button-workflow-tasks] [ctl:CloseBroadcastMsgPanel]
[ctl:curMsgButton] [ctl:d762c503-995b-489c-a6fd-0bdab161a09f] [ctl:db5af4a4-d50c-4004-8166-df09d3c7dd07] [ctl:divExternalLinksBody] [ctl:e9e9d3ef-b46f-44dc-b9a0-e4b2e35a6bce] [ctl:ed797990-bd74-4372-8c57-c0a95c4e8b8b] [ctl:ExternalLinksClose] [ctl:extLinksCloseButton]
[ctl:FavoritesClose] [ctl:ffaa2ce3-2a33-4fb0-bb53-0adc3ef5546d] [ctl:Help] [ctl:HideCoreBroadcastMsgBody] [ctl:HideCoreContactUsBody] [ctl:HideFavoritesBody] [ctl:IntContactUsClose] [ctl:intPortalContactUsCloseButton]
[ctl:link-340b-providers] [ctl:link-absent-parent] [ctl:link-analysis-review] [ctl:link-average-expenditure] [ctl:link-back-to-top] [ctl:link-back-to-top-2] [ctl:link-back-to-top-3] [ctl:link-back-to-top-4]
[ctl:link-base-id-termination-transactions] [ctl:link-broadcast-message] [ctl:link-broker-sales-tpa] [ctl:link-bulk-load] [ctl:link-bulk-recall] [ctl:link-bulk-transactions-within-base-id] [ctl:link-capitation] [ctl:link-carrier]
[ctl:link-carrier-crosswalk-rule] [ctl:link-case] [ctl:link-case-2] [ctl:link-case-request] [ctl:link-ccn-list] [ctl:link-ccn-ndc-association] [ctl:link-change-of-ownership-transactions] [ctl:link-claim-level-detail]
[ctl:link-claims-management] [ctl:link-clia-numbers] [ctl:link-client-logo] [ctl:link-cms] [ctl:link-contact] [ctl:link-contact-2] [ctl:link-contact-us] [ctl:link-contact-us-2]
[ctl:link-credentialing-application-review] [ctl:link-custom-peer-groups] [ctl:link-dashboard] [ctl:link-dashboard-2] [ctl:link-dashboard-3] [ctl:link-dashboard-4] [ctl:link-dashboard-5] [ctl:link-dashboard-6]
[ctl:link-dashboard-7] [ctl:link-desktop-review-upload] [ctl:link-disputes-list] [ctl:link-drug-rebate] [ctl:link-eft-enrollments] [ctl:link-employer] [ctl:link-en] [ctl:link-en-2]
[ctl:link-ep-workflow-transactions] [ctl:link-event-configuration] [ctl:link-event-status-tracking] [ctl:link-event-subscription] [ctl:link-event-to-file-query-builder] [ctl:link-external-links] [ctl:link-external-links-2] [ctl:link-faq-s]
[ctl:link-favorites] [ctl:link-favorites-2] [ctl:link-file-to-event-metadata] [ctl:link-file-to-event-orchestration] [ctl:link-file-transfer-configuration] [ctl:link-file-transfer-tracking] [ctl:link-file-upload] [ctl:link-file-upload-2]
[ctl:link-file-upload-download-search] [ctl:link-fraud-protection] [ctl:link-ftp-server-credentials] [ctl:link-fulfillment-materials] [ctl:link-fund-codes] [ctl:link-gainwell] [ctl:link-group] [ctl:link-hipaa-transactions]
[ctl:link-incremental-adjustments] [ctl:link-intake] [ctl:link-integration] [ctl:link-invoice-management] [ctl:link-invoice-process-flags] [ctl:link-irs-w-9-tax-ids] [ctl:link-labeler] [ctl:link-letter-template]
[ctl:link-link-configuration] [ctl:link-lock-out] [ctl:link-logout] [ctl:link-logout-2] [ctl:link-manage-application-settings] [ctl:link-manage-assignment-permissions] [ctl:link-manage-case-assignment-permissio] [ctl:link-manage-configurations]
[ctl:link-manage-cycles] [ctl:link-managed-care] [ctl:link-managed-care-entities] [ctl:link-manage-help] [ctl:link-manage-html-blocks] [ctl:link-manage-images] [ctl:link-manage-ioc-settings] [ctl:link-manage-labels]
[ctl:link-manage-menu-items] [ctl:link-manage-menus] [ctl:link-manage-messages] [ctl:link-manage-module-events] [ctl:link-manage-security-functions] [ctl:link-manage-security-rights] [ctl:link-manage-security-roles] [ctl:link-manage-services]
[ctl:link-manage-subscriptions] [ctl:link-manage-user-association] [ctl:link-manage-user-invitations] [ctl:link-manage-users] [ctl:link-manage-user-schedule] [ctl:link-mass-carrier-migration] [ctl:link-mass-change-transactions] [ctl:link-mass-transfer]
[ctl:link-mce] [ctl:link-mco-enrollment-list] [ctl:link-medicaid] [ctl:link-medicaid-case] [ctl:link-member] [ctl:link-member-2] [ctl:link-member-3] [ctl:link-member-management]
[ctl:link-member-quick-view] [ctl:link-messages] [ctl:link-messages-2] [ctl:link-mita-steps] [ctl:link-my-account] [ctl:link-my-account-2] [ctl:link-ndc] [ctl:link-ndc-invoice-inquiry]
[ctl:link-network] [ctl:link-new-enrollment-entry] [ctl:link-non-covered-code] [ctl:link-nppr-transactions] [ctl:link-owners-and-managing-employees] [ctl:link-page-elements-widgets] [ctl:link-person] [ctl:link-pharmacy-related-data]
[ctl:link-pi-case-tracking] [ctl:link-plan-management] [ctl:link-policy] [ctl:link-policyholder] [ctl:link-postmark-dates] [ctl:link-ppa-maintenance] [ctl:link-predictive-model-definition] [ctl:link-prn-transactions]
[ctl:link-pro-dur] [ctl:link-provider] [ctl:link-provider-dashboard] [ctl:link-provider-enrollment] [ctl:link-provider-management] [ctl:link-provider-mce-enrollment] [ctl:link-provider-recoupment] [ctl:link-providers]
[ctl:link-provider-summary] [ctl:link-rate-setting] [ctl:link-records-management-rm8] [ctl:link-reference-data] [ctl:link-reference-data-2] [ctl:link-related-data] [ctl:link-related-pages] [ctl:link-reports]
[ctl:link-reports-letters] [ctl:link-resume-enrollment-entry] [ctl:link-review-types] [ctl:link-rosi-pqas-list] [ctl:link-routing-configuration] [ctl:link-screening-credentialing] [ctl:link-screening-results] [ctl:link-search]
[ctl:link-search-audit-history] [ctl:link-search-claims] [ctl:link-search-desktop-review] [ctl:link-search-enrollment-application] [ctl:link-search-enrollment-reports] [ctl:link-search-hipp] [ctl:link-service-types] [ctl:link-set-panel-tabs]
[ctl:link-study-analysis-catalog] [ctl:link-study-request] [ctl:link-subscriber-configuration] [ctl:link-supercase] [ctl:link-suppressed-entities] [ctl:link-system-process-tracking] [ctl:link-targeted-query-definition] [ctl:link-task-list]
[ctl:link-task-management] [ctl:link-task-template] [ctl:link-t-bill-rates] [ctl:link-tpl-case-tracking] [ctl:link-tpl-hipp] [ctl:link-tpl-policy] [ctl:link-tpl-policy-intake] [ctl:link-tpl-policy-letters]
[ctl:link-tracking] [ctl:link-ui-examples] [ctl:link-user-information] [ctl:link-view-data] [ctl:link-web-information] [ctl:link-worker-compensation-intake] [ctl:link-workflow-applications] [ctl:link-workflow-configuration]
[ctl:link-workflow-dashboard] [ctl:link-workflow-items] [ctl:link-workflow-tasks] [ctl:Mail] [ctl:mailClose] [ctl:mailHelp] [ctl:mainMenu] [ctl:mainMenuClose]
[ctl:mcbMenu] [ctl:MCBMenu.Audit] [ctl:MCBMenu.Mail] [ctl:MCBMenu.MITASteps] [ctl:MCBMenu.Notes] [ctl:MCBMenu.PageHelp] [ctl:MCBMenu.PrintPreview] [ctl:MCBMenu.RelatedPages]
[ctl:MCBMenu.Reports] [ctl:MCBMenu.ReportsLetters] [ctl:MCBMenu.ReturnToProvider] [ctl:MCBMenu.SetPanelTabs] [ctl:MCBMenu.ViewData] [ctl:messagesCloseButton] [ctl:MinusSquareAudit] [ctl:MinusSquareMail]
[ctl:MinusSquareNotes] [ctl:MinusSquarePrintPreview] [ctl:MinusSquareReports] [ctl:mobileMenuIcon] [ctl:Notes] [ctl:notesClose] [ctl:notesHelp] [ctl:pageBannerLogo]
[ctl:PlusSquareAudit] [ctl:PlusSquareMail] [ctl:PlusSquareNotes] [ctl:PlusSquarePrintPreview] [ctl:PlusSquareReports] [ctl:PrintPreview] [ctl:printPreviewClose] [ctl:printPreviewHelp]
[ctl:Reports] [ctl:reportsClose] [ctl:reportsHelp] [ctl:RTP] [ctl:ShowCoreBroadcastMsgBody] [ctl:ShowCoreContactUsBody] [ctl:ShowFavoritesBody] [ctl:text]
[ctl:text-2]
~~~

## 13. Open questions
1. What content/layout appears inside each header overlay panel (Broadcast Messages / External Links / Favorites / Contact Us) after it is shown? - answer from: capture that opens each panel and records state screenshots [UNKNOWN]
2. What content/layout appears inside each footer modal overlay (Site Disclaimer / Site Requirements / Site Privacy / Site Cookie)? - answer from: capture that clicks each footer item and records overlay state screenshots [UNKNOWN]
3. Is the footer build line (Server / Build Date / v...) expected to be live environment data or can it be hardcoded in the rebuild? - answer from: product owner / portal standard [UNKNOWN]

## 14. Motion
None (facts S15: "Nothing moved or animated."). [asset:motion.json]







