# UI SPEC — fxfer-v6/home

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
| Side menu -> File Transfer Services -> File Transfer Configuration | /FileTransfer/SearchSourceLocations | #/fxfer-v6/file-transfer-configuration | same tab | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu -> File Transfer Services -> File Transfer Tracking | /FileTransfer/SearchFileTransferTracking | #/fxfer-v6/file-transfer-tracking | same tab | [asset:menu.json, asset:menu/file-transfer-services.png] |
| Side menu -> File Transfer Services -> FTP Server Credentials | /FileTransfer/SearchFTPServerCredentials | #/fxfer-v6/ftp-server-credentials | same tab | [asset:menu.json, asset:menu/file-transfer-services.png] |
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
Every element below gets `data-testid="<key>"` in the rebuild; `packs/fxfer-v6/screens/home/spec/parity.spec.ts` uses them. [asset:spec/selectors.json]

```text
[ctl:pageBannerLogo] [ctl:link-client-logo] [ctl:button] [ctl:button-medicaid-management-solutions] [ctl:button-main-menu] [ctl:button-2]
[ctl:button-en] [ctl:link-en] [ctl:AAGMenu.BroadcastMsg] [ctl:link-messages] [ctl:AAGMenu.ExternalLinks] [ctl:link-external-links]
[ctl:AAGMenu.Favorites] [ctl:link-favorites] [ctl:AAGMenu.ContactUs] [ctl:link-contact-us] [ctl:AAGMenu.MyAccount] [ctl:link-my-account]
[ctl:AAGMenu.Logout] [ctl:link-logout] [ctl:button-main-menu-2] [ctl:mainMenuClose] [ctl:button-3] [ctl:mobileMenuIcon]
[ctl:button-4] [ctl:button-en-2] [ctl:link-en-2] [ctl:AAGMenu.BroadcastMsg_mbl] [ctl:link-messages-2] [ctl:AAGMenu.ExternalLinks_mbl]
[ctl:link-external-links-2] [ctl:AAGMenu.Favorites_mbl] [ctl:link-favorites-2] [ctl:AAGMenu.ContactUs_mbl] [ctl:link-contact-us-2] [ctl:AAGMenu.MyAccount_mbl]
[ctl:link-my-account-2] [ctl:AAGMenu.Logout_mbl] [ctl:link-logout-2] [ctl:button-5] [ctl:button-6] [ctl:mainMenu]
[ctl:button-administration] [ctl:button-alert-notification-event-configu] [ctl:ee09c683-59b2-4334-81f2-0c236a3df1da] [ctl:button-event-configuration] [ctl:link-event-configuration] [ctl:button-subscriber-configuration]
[ctl:link-subscriber-configuration] [ctl:button-event-subscription] [ctl:link-event-subscription] [ctl:button-tracking] [ctl:link-tracking] [ctl:button-claims-management-search-claims-]
[ctl:link-claims-management] [ctl:30e8f72e-16ca-41d2-bb32-a4246ed8e8ca] [ctl:button-search-claims] [ctl:link-search-claims] [ctl:button-pro-dur] [ctl:link-pro-dur]
[ctl:button-drug-rebate-dashboard-labeler-nd] [ctl:link-drug-rebate] [ctl:93106f48-ada8-4453-896c-500978c92249] [ctl:button-dashboard] [ctl:link-dashboard] [ctl:button-labeler]
[ctl:link-labeler] [ctl:button-ndc] [ctl:link-ndc] [ctl:button-claim-level-detail] [ctl:link-claim-level-detail] [ctl:button-ccn-list]
[ctl:link-ccn-list] [ctl:button-rosi-pqas-list] [ctl:link-rosi-pqas-list] [ctl:button-disputes-list] [ctl:link-disputes-list] [ctl:button-invoice-management]
[ctl:link-invoice-management] [ctl:button-ndc-invoice-inquiry] [ctl:link-ndc-invoice-inquiry] [ctl:button-ccn-ndc-association] [ctl:link-ccn-ndc-association] [ctl:button-ppa-maintenance]
[ctl:link-ppa-maintenance] [ctl:button-incremental-adjustments] [ctl:link-incremental-adjustments] [ctl:button-postmark-dates] [ctl:link-postmark-dates] [ctl:button-t-bill-rates]
[ctl:link-t-bill-rates] [ctl:button-340b-providers] [ctl:link-340b-providers] [ctl:button-provider-recoupment] [ctl:link-provider-recoupment] [ctl:button-invoice-process-flags]
[ctl:link-invoice-process-flags] [ctl:button-fund-codes] [ctl:link-fund-codes] [ctl:button-web-information] [ctl:link-web-information] [ctl:button-ui-examples-page-elements-widget]
[ctl:link-ui-examples] [ctl:b9d280bb-801b-4b2d-856d-2c3cf0272ddf] [ctl:button-page-elements-widgets] [ctl:link-page-elements-widgets] [ctl:button-file-transfer-services-file-tran] [ctl:96ff5869-d95c-46d0-8595-10f8d7b52930]
[ctl:button-file-transfer-configuration] [ctl:link-file-transfer-configuration] [ctl:button-file-transfer-tracking] [ctl:link-file-transfer-tracking] [ctl:button-ftp-server-credentials] [ctl:link-ftp-server-credentials]
[ctl:button-integration-event-to-file-query-] [ctl:link-integration] [ctl:64fd204c-0c1a-4537-a0bf-ffe697e838ac] [ctl:button-event-to-file-query-builder] [ctl:link-event-to-file-query-builder] [ctl:button-file-to-event-metadata]
[ctl:link-file-to-event-metadata] [ctl:button-file-to-event-orchestration] [ctl:link-file-to-event-orchestration] [ctl:button-event-status-tracking] [ctl:link-event-status-tracking] [ctl:button-system-process-tracking]
[ctl:link-system-process-tracking] [ctl:button-dashboard-2] [ctl:link-dashboard-2] [ctl:button-managed-care-mce-member-network-] [ctl:link-managed-care] [ctl:afcab3a1-7056-46ec-90f7-e6bb9134801e]
[ctl:button-mce] [ctl:link-mce] [ctl:button-member] [ctl:link-member] [ctl:button-network] [ctl:link-network]
[ctl:button-provider] [ctl:link-provider] [ctl:button-hipaa-transactions] [ctl:link-hipaa-transactions] [ctl:button-lock-out] [ctl:link-lock-out]
[ctl:button-screening-results] [ctl:link-screening-results] [ctl:button-capitation] [ctl:link-capitation] [ctl:button-reports] [ctl:link-reports]
[ctl:button-reference-data] [ctl:link-reference-data] [ctl:button-provider-mce-enrollment] [ctl:link-provider-mce-enrollment] [ctl:button-file-upload] [ctl:link-file-upload]
[ctl:button-mass-transfer] [ctl:link-mass-transfer] [ctl:button-member-management-member-medicai] [ctl:link-member-management] [ctl:493efae0-4beb-410d-bbd0-f09722409c48] [ctl:button-member-2]
[ctl:link-member-2] [ctl:button-medicaid-case] [ctl:link-medicaid-case] [ctl:button-fulfillment-materials] [ctl:link-fulfillment-materials] [ctl:button-fraud-protection]
[ctl:link-fraud-protection] [ctl:button-group] [ctl:link-group] [ctl:button-broker-sales-tpa] [ctl:link-broker-sales-tpa] [ctl:button-person]
[ctl:link-person] [ctl:button-plan-management-reference-data-p] [ctl:link-plan-management] [ctl:49f97f7d-6d79-4fb8-af36-58f4d2f56bed] [ctl:button-reference-data-2] [ctl:link-reference-data-2]
[ctl:button-pharmacy-related-data] [ctl:link-pharmacy-related-data] [ctl:button-related-data] [ctl:link-related-data] [ctl:button-rate-setting] [ctl:link-rate-setting]
[ctl:button-file-upload-2] [ctl:link-file-upload-2] [ctl:button-manage-cycles] [ctl:link-manage-cycles] [ctl:button-program-integrity-dashboard-mana] [ctl:5d0a1a14-70d7-4aae-980d-b00b36e5a317]
[ctl:button-dashboard-3] [ctl:link-dashboard-3] [ctl:button-manage-configurations] [ctl:link-manage-configurations] [ctl:button-custom-peer-groups] [ctl:link-custom-peer-groups]
[ctl:button-service-types] [ctl:link-service-types] [ctl:button-study-request] [ctl:link-study-request] [ctl:button-suppressed-entities] [ctl:link-suppressed-entities]
[ctl:button-study-analysis-catalog] [ctl:link-study-analysis-catalog] [ctl:button-manage-assignment-permissions] [ctl:link-manage-assignment-permissions] [ctl:button-predictive-model-definition] [ctl:link-predictive-model-definition]
[ctl:button-targeted-query-definition] [ctl:link-targeted-query-definition] [ctl:button-analysis-review] [ctl:link-analysis-review] [ctl:button-case-request] [ctl:link-case-request]
[ctl:button-pi-case-tracking-dashboard-case-] [ctl:link-pi-case-tracking] [ctl:633bfb69-085c-4d2c-a93c-ba0ff71cf1bf] [ctl:button-dashboard-4] [ctl:link-dashboard-4] [ctl:button-case]
[ctl:link-case] [ctl:button-intake] [ctl:link-intake] [ctl:button-review-types] [ctl:link-review-types] [ctl:button-supercase]
[ctl:link-supercase] [ctl:button-contact] [ctl:link-contact] [ctl:button-user-information] [ctl:link-user-information] [ctl:button-letter-template]
[ctl:link-letter-template] [ctl:button-bulk-load] [ctl:link-bulk-load] [ctl:button-provider-enrollment-dashboard-se] [ctl:link-provider-enrollment] [ctl:7f03cb8e-4c19-4e75-8ed2-f7c028c96dc9]
[ctl:button-dashboard-5] [ctl:link-dashboard-5] [ctl:button-search-enrollment-application] [ctl:link-search-enrollment-application] [ctl:button-search-enrollment-reports] [ctl:link-search-enrollment-reports]
[ctl:button-workflow-dashboard] [ctl:link-workflow-dashboard] [ctl:button-workflow-applications] [ctl:link-workflow-applications] [ctl:button-workflow-configuration] [ctl:link-workflow-configuration]
[ctl:button-workflow-tasks] [ctl:link-workflow-tasks] [ctl:button-new-enrollment-entry] [ctl:link-new-enrollment-entry] [ctl:button-resume-enrollment-entry] [ctl:link-resume-enrollment-entry]
[ctl:button-provider-management-providers-ow] [ctl:link-provider-management] [ctl:dfff428c-ba1c-4c36-83f6-c94908265037] [ctl:button-providers] [ctl:link-providers] [ctl:button-owners-and-managing-employees]
[ctl:link-owners-and-managing-employees] [ctl:button-irs-w-9-tax-ids] [ctl:link-irs-w-9-tax-ids] [ctl:button-provider-summary] [ctl:link-provider-summary] [ctl:button-clia-numbers]
[ctl:link-clia-numbers] [ctl:button-eft-enrollments] [ctl:link-eft-enrollments] [ctl:button-workflow-items] [ctl:link-workflow-items] [ctl:button-mco-enrollment-list]
[ctl:link-mco-enrollment-list] [ctl:button-bulk-transactions-within-base-id] [ctl:link-bulk-transactions-within-base-id] [ctl:button-nppr-transactions] [ctl:link-nppr-transactions] [ctl:button-prn-transactions]
[ctl:link-prn-transactions] [ctl:button-ep-workflow-transactions] [ctl:link-ep-workflow-transactions] [ctl:button-base-id-termination-transactions] [ctl:link-base-id-termination-transactions] [ctl:button-mass-change-transactions]
[ctl:link-mass-change-transactions] [ctl:button-change-of-ownership-transactions] [ctl:link-change-of-ownership-transactions] [ctl:button-provider-dashboard] [ctl:link-provider-dashboard] [ctl:button-managed-care-entities]
[ctl:link-managed-care-entities] [ctl:button-screening-credentialing-dashboar] [ctl:link-screening-credentialing] [ctl:0a7eb015-e844-4b92-887c-9782d5b6fefe] [ctl:button-dashboard-6] [ctl:link-dashboard-6]
[ctl:button-credentialing-application-review] [ctl:link-credentialing-application-review] [ctl:button-search] [ctl:link-search] [ctl:button-search-audit-history] [ctl:link-search-audit-history]
[ctl:button-file-upload-download-search] [ctl:link-file-upload-download-search] [ctl:button-tpl-case-tracking-case-contact-d] [ctl:link-tpl-case-tracking] [ctl:b1eb31b0-2c65-4fc2-9d0d-9c377e7cb82b] [ctl:button-case-2]
[ctl:link-case-2] [ctl:button-contact-2] [ctl:link-contact-2] [ctl:button-desktop-review-upload] [ctl:link-desktop-review-upload] [ctl:button-search-desktop-review]
[ctl:link-search-desktop-review] [ctl:button-worker-compensation-intake] [ctl:link-worker-compensation-intake] [ctl:button-manage-case-assignment-permissio] [ctl:link-manage-case-assignment-permissio] [ctl:button-tpl-policy-carrier-employer-poli]
[ctl:link-tpl-policy] [ctl:924c94b0-c2b3-4810-be24-e25180edf82e] [ctl:button-carrier] [ctl:link-carrier] [ctl:button-employer] [ctl:link-employer]
[ctl:button-policyholder] [ctl:link-policyholder] [ctl:button-absent-parent] [ctl:link-absent-parent] [ctl:button-policy] [ctl:link-policy]
[ctl:button-tpl-policy-intake] [ctl:link-tpl-policy-intake] [ctl:button-mass-carrier-migration] [ctl:link-mass-carrier-migration] [ctl:button-non-covered-code] [ctl:link-non-covered-code]
[ctl:button-member-3] [ctl:link-member-3] [ctl:button-carrier-crosswalk-rule] [ctl:link-carrier-crosswalk-rule] [ctl:button-tpl-policy-letters] [ctl:link-tpl-policy-letters]
[ctl:button-member-quick-view] [ctl:link-member-quick-view] [ctl:button-tpl-hipp-search-hipp-average-exp] [ctl:link-tpl-hipp] [ctl:06899da6-c928-40b8-8ae5-2a5e53115465] [ctl:button-search-hipp]
[ctl:link-search-hipp] [ctl:button-average-expenditure] [ctl:link-average-expenditure] [ctl:button-task-management-dashboard-task-t] [ctl:link-task-management] [ctl:610a42ac-65a0-4f8f-ac00-08e244b84233]
[ctl:button-dashboard-7] [ctl:link-dashboard-7] [ctl:button-task-template] [ctl:link-task-template] [ctl:button-task-list] [ctl:link-task-list]
[ctl:button-link-configuration] [ctl:link-link-configuration] [ctl:button-routing-configuration] [ctl:link-routing-configuration] [ctl:button-manage-user-association] [ctl:link-manage-user-association]
[ctl:button-manage-user-schedule] [ctl:link-manage-user-schedule] [ctl:button-bulk-recall] [ctl:link-bulk-recall] [ctl:button-7] [ctl:9da82d74-986e-49f2-91a6-0995d18f1d9b]
[ctl:button-broadcast-message] [ctl:link-broadcast-message] [ctl:button-faq-s] [ctl:link-faq-s] [ctl:button-manage-application-settings] [ctl:link-manage-application-settings]
[ctl:button-manage-html-blocks] [ctl:link-manage-html-blocks] [ctl:button-manage-help] [ctl:link-manage-help] [ctl:button-manage-images] [ctl:link-manage-images]
[ctl:button-manage-ioc-settings] [ctl:link-manage-ioc-settings] [ctl:button-manage-labels] [ctl:link-manage-labels] [ctl:button-manage-menus] [ctl:link-manage-menus]
[ctl:button-manage-menu-items] [ctl:link-manage-menu-items] [ctl:button-manage-messages] [ctl:link-manage-messages] [ctl:button-manage-security-functions] [ctl:link-manage-security-functions]
[ctl:button-manage-security-rights] [ctl:link-manage-security-rights] [ctl:button-manage-security-roles] [ctl:link-manage-security-roles] [ctl:button-manage-services] [ctl:link-manage-services]
[ctl:button-manage-subscriptions] [ctl:link-manage-subscriptions] [ctl:button-manage-module-events] [ctl:link-manage-module-events] [ctl:button-manage-users] [ctl:link-manage-users]
[ctl:button-manage-user-invitations] [ctl:link-manage-user-invitations] [ctl:button-8] [ctl:button-9] [ctl:button-10] [ctl:mcbMenu]
[ctl:MCBMenu.Notes] [ctl:Notes] [ctl:MCBMenu.Mail] [ctl:Mail] [ctl:MCBMenu.Audit] [ctl:Audit]
[ctl:MCBMenu.SetPanelTabs] [ctl:link-set-panel-tabs] [ctl:MCBMenu.MITASteps] [ctl:link-mita-steps] [ctl:MCBMenu.ReportsLetters] [ctl:link-reports-letters]
[ctl:MCBMenu.RelatedPages] [ctl:link-related-pages] [ctl:MCBMenu.ViewData] [ctl:link-view-data] [ctl:MCBMenu.Reports] [ctl:Reports]
[ctl:MCBMenu.PrintPreview] [ctl:PrintPreview] [ctl:MCBMenu.PageHelp] [ctl:Help] [ctl:MCBMenu.ReturnToProvider] [ctl:RTP]
[ctl:button-help] [ctl:auditHelp] [ctl:button-help-2] [ctl:PlusSquareAudit] [ctl:MinusSquareAudit] [ctl:auditClose]
[ctl:button-close] [ctl:button-open-in-separate-window] [ctl:mailHelp] [ctl:button-11] [ctl:button-12] [ctl:PlusSquareMail]
[ctl:MinusSquareMail] [ctl:mailClose] [ctl:button-close-2] [ctl:button-open-in-separate-window-2] [ctl:notesHelp] [ctl:button-13]
[ctl:button-14] [ctl:PlusSquareNotes] [ctl:MinusSquareNotes] [ctl:notesClose] [ctl:button-close-3] [ctl:button-open-in-separate-window-3]
[ctl:printPreviewHelp] [ctl:button-15] [ctl:button-16] [ctl:PlusSquarePrintPreview] [ctl:MinusSquarePrintPreview] [ctl:printPreviewClose]
[ctl:button-close-4] [ctl:button-open-in-separate-window-4] [ctl:reportsHelp] [ctl:button-17] [ctl:PlusSquareReports] [ctl:MinusSquareReports]
[ctl:reportsClose] [ctl:button-close-5] [ctl:button-open-in-separate-window-5] [ctl:button-18] [ctl:button-19] [ctl:button-20]
[ctl:button-close-6] [ctl:button-open-in-separate-window-6] [ctl:ExternalLinksClose] [ctl:divExternalLinksBody] [ctl:link-records-management-rm8] [ctl:link-cms]
[ctl:link-gainwell] [ctl:link-medicaid] [ctl:extLinksCloseButton] [ctl:ShowCoreBroadcastMsgBody] [ctl:HideCoreBroadcastMsgBody] [ctl:CloseBroadcastMsgPanel]
[ctl:curMsgButton] [ctl:acknowledgedMsgButton] [ctl:messagesCloseButton] [ctl:ShowFavoritesBody] [ctl:HideFavoritesBody] [ctl:FavoritesClose]
[ctl:ShowCoreContactUsBody] [ctl:HideCoreContactUsBody] [ctl:IntContactUsClose] [ctl:intPortalContactUsCloseButton] [ctl:text] [ctl:text-2]
[ctl:button-close-7] [ctl:button-21] [ctl:button-close-8] [ctl:link-back-to-top] [ctl:link-back-to-top-2] [ctl:link-back-to-top-3]
[ctl:button-disclaimer] [ctl:button-website-requirements] [ctl:button-privacy-policy] [ctl:button-cookie-policy] [ctl:link-back-to-top-4]
```

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/fxfer-v6/screens/home/spec/parity.spec.ts`

## 13. Open questions
1. What content/layout appears inside each header overlay panel (Broadcast Messages / External Links / Favorites / Contact Us) after it is shown? - answer from: capture that opens each panel and records state screenshots [UNKNOWN]
2. What content/layout appears inside each footer modal overlay (Site Disclaimer / Site Requirements / Site Privacy / Site Cookie)? - answer from: capture that clicks each footer item and records overlay state screenshots [UNKNOWN]
3. Is the footer build line (Server / Build Date / v...) expected to be live environment data or can it be hardcoded in the rebuild? - answer from: product owner / portal standard [UNKNOWN]

## 14. Motion
None (facts S15: "Nothing moved or animated."). [asset:motion.json]
