# UI SPEC — claims-mgmt-v1/home

> Source https://uximc.mms.tst.pgwcloud.net/Home/MyHome/ · viewport 1920×1080 CSS px @ dpr 1 · legacy built with jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[aspx:…]` · `[UNKNOWN: …]`

## 1. Overview
Home/landing page for the Provider portal: fixed top header + global links, hero banner, and portal footer. This screen also defines the shared shell used by other rebuilt screens (header + hamburger side menu). [asset:reference.png]

Primary tasks:
- Open the side menu (hamburger) and navigate to Claims Management screens. [ctl:button-main-menu-2]
- Use the global header links (Messages/External Links/Favorites/Contact Us/My Account/Logout). [ctl:link-messages]

## 2. Layout
Page: fluid (full viewport width), background `rgb(255, 255, 255)`, page scroll (body has top padding for fixed header), fixed header at top. [asset:reference.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Header | `div#pageHeader` | 0,0,1920,66 | `reference.png` | fixed at top | bg `rgb(43, 58, 68)`, bottom border `4px solid rgb(48, 179, 254)` | [asset:reference.png] |
| Top divider row | `div#mcbRowBorder` | 0,62,1920,45 | `sections/01-mcbrowborder.png` | flex row | bottom border `1px solid rgb(179, 179, 179)` | [asset:sections/01-mcbrowborder.png] |
| Body | `div#pageBody` | 0,107,1920,526 | `sections/01-mcbrowborder.png` | 2-column hero block | left hero image, right heading/subheading | [asset:sections/01-mcbrowborder.png] |
| Footer | `footer` | 0,633,1920,119 | `sections/02-disclaimer-the-website-is-prov.png` | stacked: dark link bar + light copyright bar | dark bar bg `rgb(43, 58, 68)` | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 2.1 Header
- Left: client logo image and portal title/subtitle.
- Right: language selector (`EN` with globe icon), global nav links, user avatar/"Welcome …", and hamburger menu button. [asset:reference.png]

### 2.2 Body (hero)
- Left: large grayscale hero image (background image). [asset:sections/01-mcbrowborder.png]
- Right: heading "Medicaid Management Solutions" and subheading "Charting a New Direction for Better Healthcare Outcomes". [asset:sections/01-mcbrowborder.png]

### 2.3 Footer
- Dark subfooter bar: links "Disclaimer", "Website Requirements", "Privacy Policy", "Cookie Policy" separated by vertical rules. [asset:sections/02-disclaimer-the-website-is-prov.png]
- Bottom bar: copyright on left and server/build info on right. [asset:sections/02-disclaimer-the-website-is-prov.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | `Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` (14px / 400 / lh 14px) | body text | [asset:reference.png] |
| `--color-text` | `rgb(61, 61, 61)` | main text | [asset:reference.png] |
| `--color-header-bg` | `rgb(43, 58, 68)` | header + subfooter bg | [asset:reference.png] |
| `--color-header-accent` | `rgb(48, 179, 254)` | header bottom border + hamburger tile | [asset:reference.png] |
| `--color-on-dark` | `rgb(255, 255, 255)` | header/subfooter text | [asset:reference.png] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | header: client logo | 117×57 | `alt` text "Client Logo" | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/Content/dxc.ua3.core.home.myhome.png` | body: hero image background | 1236×522 | used as CSS background image | [asset:assets/Content/dxc.ua3.core.home.myhome.png] |

## 5. Components
React component tree (shared components marked *shared*):
- `HomePage`
  - `PortalHeader` *shared* — logo, title/subtitle, language selector, global links, hamburger menu trigger. [ctl:pageBannerLogo]
  - `PortalSideMenu` *shared* — off-canvas menu opened from the hamburger. [ctl:button-main-menu-2]
  - `HeroBanner` — hero image + marketing copy. [asset:sections/01-mcbrowborder.png]
  - `HelpButton` *shared* — floating help button (blue circle). [ctl:button-help]
  - `PortalFooter` *shared* — subfooter links + copyright/build info. [ctl:button-disclaimer]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `PortalHeader` | current language, user display name | none | `pageBannerLogo`, `link-client-logo`, `button-medicaid-management-solutions`, `button`, `button-2`, `button-en`, `link-en`, `link-messages`, `link-external-links`, `link-favorites`, `link-contact-us`, `link-my-account`, `link-logout`, `button-main-menu-2` | [asset:reference.png] |
| `PortalSideMenu` | menu tree (modules + items) | `isOpen`, `hoveredModule` | (menu items are stamped by kit; trigger is `button-main-menu-2`) | [asset:kit/states/menu-open.png] |
| `HeroBanner` | none | none | (static content) | [asset:sections/01-mcbrowborder.png] |
| `HelpButton` | none | none | `button-help` | [ctl:button-help] |
| `PortalFooter` | none | none | `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy` | [asset:sections/02-disclaimer-the-website-is-prov.png] |

### 5.1 Side menu tree (all modules + items)
Menu content comes from `menu.json` (live site scrape) and is reproduced verbatim in the rebuild. [asset:menu.json]

- Administration
  - Broadcast Message (/BroadcastMessage/BroadcastMessageSearch)
  - FAQ's (/FAQMaintenance/FAQMaintenanceSearch)
  - Manage Application Settings (/AppSetting/ManageAppSettings)
  - Manage HTML Blocks (/Localization/ManageHtmlBlocks)
  - Manage Help (/ManageHelpContent/HelpContentSearch)
  - Manage Images (/Localization/ManageImages)
  - Manage IOC Settings (/AppSetting/ManageIocSettings)
  - Manage Labels (/Localization/ManageLabels)
  - Manage Menus (/Menu/ManageMenus)
  - Manage Menu Items (/Menu/ManageMenuItems)
  - Manage Messages (/Localization/ManageMessages)
  - Manage Security Functions (/Localization/ManageSecurityFunctions)
  - Manage Security Rights (/Localization/ManageSecurityRights)
  - Manage Security Roles (/Localization/ManageSecurityRoles)
  - Manage Services (/Service/ManageServices)
  - Manage Subscriptions (/EventSubscriptions/ManageSubscription)
  - Manage Module Events (/ModuleEvents/ManageModuleEvents)
  - Manage Users (/UserMaintenance/ManageUsers)
  - Manage User Invitations (/UserMaintenance/ManageUserInvitations)
- Alert Notification
  - Event Configuration (/Notifications/EventNotificationSearch)
  - Subscriber Configuration (/Notifications/SubscriberSearch)
  - Event Subscription (/Notifications/SubscriptionDetails)
  - Tracking (/Notifications/NotificationTracking)
- Claims Management
  - Search Claims (/ClaimsManagement/SearchClaims)
  - Pro DUR (/ProDUR/ProDURDashBoard)
- Drug Rebate
  - Dashboard (/DrugRebate/Dashboard)
  - Labeler (/DrugRebate/SearchLabelerInformation)
  - NDC (/NationalDrugCode/SearchNationalDrugCode)
  - Claim Level Detail (/ClaimDetails/SearchClaims)
  - CCN List (/CashControlNumbers/SearchCashControlNumbers)
  - ROSI/PQAS List (/DrugRebate/SearchRosiPqas)
  - Disputes List (/Invoice/SearchNDCDisputes)
  - Invoice Management (/Invoice/SearchInvoiceInquiry)
  - NDC Invoice Inquiry (/NDCInvoice/SearchNDCInvoiceInquiry)
  - CCN/NDC Association (/Invoice/SearchCCNAssociated)
  - PPA Maintenance (/PPAMaintenance/SearchPPAMaintenance)
  - Incremental Adjustments (/IncrementalAdjustment/SearchIncrementalAdjustment)
  - Postmark Dates (/PostmarkDates/PostmarkDates)
  - T-Bill Rates (/DrugRebate/SearchTreasuryBillRates)
  - 340b Providers (/DrugRebate/SearchProvider340b)
  - Provider Recoupment (/ProviderRecoupment/SearchProviderRecoupment)
  - Invoice Process Flags (/DrugRebate/InvoiceProcessFlags)
  - Fund Codes (/FundCodes/SearchFundCodes)
  - Web Information (/WebAdmin/WebAdmin)
- UI Examples
  - Page Elements / Widgets (/Employee/UIExamples)
- File Transfer Services
  - File Transfer Configuration (/FileTransfer/SearchSourceLocations)
  - File Transfer Tracking (/FileTransfer/SearchFileTransferTracking)
  - FTP Server Credentials (/FileTransfer/SearchFTPServerCredentials)
- Integration
  - Event To File Query Builder (/EventToFileWizard/SearchEventToFileMetadata)
  - File To Event Metadata (/EventsDistributor/SearchFileDefinition)
  - File To Event Orchestration (/FileToEventOrchestration/SearchExternalOrchestration)
  - Event Status Tracking (/EventStatusTracking/SearchEventStatus)
  - System Process Tracking (/SystemProcessTracking/SearchSystemProcessTracking)
  - Dashboard (/Integration/Dashboard)
- Managed Care
  - MCE (/ManagedCare/SearchMCE)
  - Member (/ManagedCare/SearchMember)
  - Network (/Network/SearchNetwork)
  - Provider (/ManagedCare/SearchPCPProvider)
  - HIPAA Transactions (/ManagedCare/EDITxnSearch)
  - Lock Out (/ManagedCare/SearchLockOutByPCPMCEMember)
  - Screening Results (/ManagedCare/ScreeningResults)
  - Capitation (/ManagedCare/Capitation)
  - Reports (/ManagedCare/ManagedCareReports)
  - Reference Data (/ManagedCare/ReferenceData)
  - Provider MCE Enrollment (/ManagedCare/SearchProviderMCEEnrollment)
  - File Upload (/ManagedCare/SearchCapitationFileUpload)
  - Mass Transfer (/ManagedCare/MassTransferSearch)
- Member Management
  - Member (/MemberManagement/SearchMember)
  - Medicaid Case (/MedicaidCase/SearchMedicaidCase)
  - Fulfillment Materials (/FulfillmentMaterials/FulfillmentMaterials)
  - Fraud Protection (/FraudProtection/SearchFraudProtection)
  - Group (/Group/SearchGroup)
  - Broker/Sales/TPA (/BrokerSalesTPA/SearchBrokerSalesTPA)
  - Person (/Person/SearchPerson)
- Plan Management
  - Reference Data (/PlanManagement/ReferenceData)
  - Pharmacy Related Data (/PlanManagement/SearchPharmacyRelatedData)
  - Related Data (/PlanManagement/SearchRelatedInformation)
  - Rate Setting (/PlanManagement/SearchRates)
  - File Upload (/PlanManagement/FileUpload)
  - Manage Cycles (/PlanManagement/SearchCycleSchedule)
- Program Integrity
  - Dashboard (/ProgramIntegrity/PIURDashboard)
  - Manage Configurations (/ProgramIntegrity/ManageConfigurations)
  - Custom Peer Groups (/ProgramIntegrity/CustomPeerGroupSearch)
  - Service Types (/ProgramIntegrity/ServiceTypeSearch)
  - Study Request (/ProgramIntegrity/StudyRequestSearch)
  - Suppressed Entities (/ProgramIntegrity/SuppressEntitySearch)
  - Study Analysis Catalog (/ProgramIntegrity/StudyAnalysisCatalog)
  - Manage Assignment Permissions (/ProgramIntegrity/SearchAssignmentPermissions)
  - Predictive Model Definition (/ProgramIntegrity/SearchPMDefinition)
  - Targeted Query Definition (/ProgramIntegrity/TargetedQueryDefinitionSearch)
  - Analysis Review (/ProgramIntegrity/AnalysisReviewHome)
  - Case Request (/ProgramIntegrity/CaseRequestSearch)
- PI Case Tracking
  - Dashboard (/ProgramIntegrityCT/Dashboard)
  - Case (/ProgramIntegrityCT/SearchCase)
  - Intake (/ProgramIntegrityCT/SearchIntake)
  - Review Types (/ProgramIntegrityCT/SearchReviewTypes)
  - SuperCase (/ProgramIntegrityCT/SearchSuperCase)
  - Contact (/ProgramIntegrityCT/SearchContact)
  - User Information (/ProgramIntegrityCT/SearchUserInformation)
  - Letter Template (/ProgramIntegrityCT/SearchLetterTemplate)
  - Bulk Load (/ProgramIntegrityCT/SearchBulkLoad)
- Provider Enrollment
  - Dashboard (/ProviderEnrollment/Dashboard)
  - Search Enrollment Application (/ProviderEnrollment/SearchProviderApplication)
  - Search Enrollment Reports (/ProviderEnrollment/SearchEnrollmentReports)
  - Workflow Dashboard (https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard)
  - Workflow Applications (https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications)
  - Workflow Configuration (https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration)
  - Workflow Tasks (https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks)
  - New Enrollment Entry (/ProviderEnrollment/CreateSecureEnrollment)
  - Resume Enrollment Entry (/ProviderEnrollment/ResumeSecureEnrollment)
- Provider Management
  - Providers (/ProviderManagement/SearchProvider)
  - Owners and Managing Employees (/ProviderManagement/SearchOwnerManagingEmployeeAssociation)
  - IRS W-9 Tax IDs (/ProviderManagement/SearchIRSTaxId)
  - Provider Summary (/ProviderManagement/SearchProviderSummary)
  - CLIA Numbers (/ProviderManagement/SearchCLIANumber)
  - EFT Enrollments (/ProviderManagement/SearchBaseEFTEnrollments)
  - Workflow Items (/ProviderManagement/CompletedWorkItems)
  - MCO Enrollment List (/ProviderManagement/SearchMCOProvider)
  - Bulk Transactions Within Base ID (/ProviderManagement/SearchBulkTransaction)
  - NPPR Transactions (/ProviderManagement/SearchNPPR)
  - PRN Transactions (/ProviderManagement/SearchPRN)
  - EP Workflow Transactions (/ProviderManagement/SearchEPTransaction)
  - Base ID Termination Transactions (/ProviderManagement/SearchProviderBaseIDTermTransaction)
  - Mass Change Transactions (/ProviderManagement/SearchMassChangeTransaction)
  - Change Of Ownership Transactions (/ProviderManagement/SearchChangeOfOwnershipTransactions)
  - Provider Dashboard (/ProviderManagement/Dashboard)
  - Managed Care Entities (/ProviderManagedCare/SearchManagedCareEntity)
- Screening/Credentialing
  - Dashboard (/Credentialing/Dashboard)
  - Credentialing Application Review (http://https://apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review)
  - Search (/Credentialing/Search)
  - Search Audit History (/Credentialing/AuditSearch)
  - File Upload/Download/Search (/Credentialing/FileMgmtSearch)
- TPL Case Tracking
  - Case (/TPLCaseTracking/SearchCase)
  - Contact (/TPLCaseTracking/SearchContact)
  - Desktop Review Upload (/TPLCaseTracking/DesktopReviewUpload)
  - Search Desktop Review (/TPLCaseTracking/SearchDesktopReviewCase)
  - Worker Compensation Intake (/TPLCaseTracking/SearchWorkerCompensation)
  - Manage Case Assignment Permissions (/TPLCaseTracking/SearchCaseAssignmentPermissions)
- TPL Policy
  - Carrier (/TPLPolicy/SearchCarrier)
  - Employer (/TPLPolicy/SearchEmployer)
  - Policyholder (/TPLPolicy/SearchPolicyholder)
  - Absent Parent (/TPLPolicy/SearchAbsentParent)
  - Policy (/TPLPolicy/SearchTPLPolicy)
  - TPL Policy Intake (/TPLPolicy/SearchPolicyIntake)
  - Mass Carrier Migration (/TPLPolicy/SearchCarrierMigration)
  - Non-Covered Code (/TPLPolicy/SearchNonCoveredCode)
  - Member (/TPLPolicy/MemberSearch)
  - Carrier Crosswalk Rule (/TPLPolicy/SearchCarrierCrossWalkRule)
  - TPL Policy Letters (/TPLPolicy/SearchPolicyLetter)
  - Member Quick View (/TPLPolicy/MemberQuickView)
- TPL HIPP
  - Search HIPP (/TPLHIPP/SearchHIPP)
  - Average Expenditure (/TPLHIPP/SearchAverageExpenditure)
- Task Management
  - Dashboard (/TaskManagement/Dashboard)
  - Task Template (/TaskManagement/SearchTaskTemplate)
  - Task List (/TaskManagement/SearchTaskList)
  - Link Configuration (/TaskManagement/SearchLinkConfiguration)
  - Routing Configuration (/TaskManagement/SearchRoutingConfiguration)
  - Manage User Association (/TaskManagement/SearchUserAssociation)
  - Manage User Schedule (/TaskManagement/SearchUserCapacity)
  - Bulk Recall (/TaskManagement/SearchRecallTask)

### 5.2 Side menu hover/flyout references
One captured picture per module with the menu open and that module hovered:

| module | hover/flyout reference | evidence |
|---|---|---|
| Administration | $pic | [asset:menu/administration.png] |
| Alert Notification | $pic | [asset:menu/alert-notification.png] |
| Claims Management | $pic | [asset:menu/claims-management.png] |
| Drug Rebate | $pic | [asset:menu/drug-rebate.png] |
| UI Examples | $pic | [asset:menu/ui-examples.png] |
| File Transfer Services | $pic | [asset:menu/file-transfer-services.png] |
| Integration | $pic | [asset:menu/integration.png] |
| Managed Care | $pic | [asset:menu/managed-care.png] |
| Member Management | $pic | [asset:menu/member-management.png] |
| Plan Management | $pic | [asset:menu/plan-management.png] |
| Program Integrity | $pic | [asset:menu/program-integrity.png] |
| PI Case Tracking | $pic | [asset:menu/pi-case-tracking.png] |
| Provider Enrollment | $pic | [asset:menu/provider-enrollment.png] |
| Provider Management | $pic | [asset:menu/provider-management.png] |
| Screening/Credentialing | $pic | [asset:menu/screening-credentialing.png] |
| TPL Case Tracking | $pic | [asset:menu/tpl-case-tracking.png] |
| TPL Policy | $pic | [asset:menu/tpl-policy.png] |
| TPL HIPP | $pic | [asset:menu/tpl-hipp.png] |
| Task Management | $pic | [asset:menu/task-management.png] |

### 5.3 Claims Management in-app destinations
Only the Claims Management items route to rebuilt screens in this app; other modules/items are shown but are out of scope for navigation targets. [asset:menu.json]

| item | rebuild destination | evidence |
|---|---|---|
| Search Claims | `#/claims-mgmt-v1/search-claims` | [asset:menu.json] |
| Pro DUR | `#/claims-mgmt-v1/pro-dur` | [asset:menu.json] |

## 6. Fields & validation
None.

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `sideMenuOpen` | boolean | false | click hamburger / click X / click a menu link | shows/hides side menu + backdrop | [asset:kit/states/menu-open.png] |
| `hoveredModule` | string \| null | null | pointer hover over a module row | shows/hides flyout for that module | [asset:menu/claims-management.png] |
| `logoTooltipOpen` | boolean | false | hover over client logo | shows tooltip "Client Logo" | [asset:kit/states/tooltip.png] |

Hidden at load (facts §12):
None.

## 8. Behavior
### 8.1 Header + global links
- THE SYSTEM SHALL render the header fixed at the top of the viewport, with a bottom accent border. [asset:reference.png]
- WHEN the user activates the "EN" language control (`link-en`) THE SYSTEM SHALL open the language overlay. [ctl:link-en, asset:kit/screen.json]

### 8.2 Side menu (hamburger)
- WHEN the user activates the hamburger menu button (`button-main-menu-2`) THE SYSTEM SHALL open the side menu (right-aligned) and display a backdrop behind it. [ctl:button-main-menu-2, asset:kit/states/menu-open.png]
- WHEN the side menu is open THE SYSTEM SHALL close it when the user clicks the menu X control or any menu link. [asset:kit/screen.json]
- WHEN the side menu is open THE SYSTEM SHALL NOT close it on Escape or by clicking the backdrop. [asset:kit/screen.json]
- WHEN the side menu is open and the user hovers a module row THE SYSTEM SHALL open that module flyout after 100ms; flyout open animation duration 200ms, close 100ms. [asset:kit/screen.json, asset:menu/claims-management.png]

### 8.3 Client logo tooltip
- WHEN the pointer hovers the client logo THE SYSTEM SHALL show a tooltip with text "Client Logo" after 100ms, with a callout arrow. [asset:kit/states/tooltip.png, asset:kit/screen.json]

### 8.4 Footer links
- WHEN the pointer hovers a footer link THE SYSTEM SHALL underline the link text. [asset:sections/02-disclaimer-the-website-is-prov.png]

### 8.5 Scroll behavior (facts §16: cite every [S##])
None.

### 8.6 Media (facts §17: cite every [V##])
None.

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-my-account` | legacy `/Home/MyAccount` | same tab (full page) | [asset:reference.png] |
| `link-logout` | legacy `/Security/LogoutFromMenu` | same tab (full page) | [ctl:link-logout] |
| Side menu → Claims Management → Search Claims | rebuild `#/claims-mgmt-v1/search-claims` | SPA route | [asset:menu.json] |
| Side menu → Claims Management → Pro DUR | rebuild `#/claims-mgmt-v1/pro-dur` | SPA route | [asset:menu.json] |

Full side menu tree is listed in §5.1 and is reproduced verbatim. [asset:menu.json]

## 10. Server interactions
None observed. [asset:facts.md]

## 11. Accessibility
- Interactive items in header and footer are keyboard-focusable; focus outlines are shown for header title and hamburger icon. [ctl:button-main-menu-2]
- Side menu supports keyboard activation for the hamburger and close button (captured as `onclick,onkeypress`). [ctl:button-main-menu-2]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/claims-mgmt-v1/screens/home/spec/parity.spec.ts` uses them:

- `pageBannerLogo` [ctl:pageBannerLogo]
- `link-client-logo` [ctl:link-client-logo]
- `button-medicaid-management-solutions` [ctl:button-medicaid-management-solutions]
- `button` [ctl:button]
- `button-2` [ctl:button-2]
- `button-en` [ctl:button-en]
- `link-en` [ctl:link-en]
- `AAGMenu.BroadcastMsg` [ctl:AAGMenu.BroadcastMsg]
- `link-messages` [ctl:link-messages]
- `AAGMenu.ExternalLinks` [ctl:AAGMenu.ExternalLinks]
- `link-external-links` [ctl:link-external-links]
- `AAGMenu.Favorites` [ctl:AAGMenu.Favorites]
- `link-favorites` [ctl:link-favorites]
- `AAGMenu.ContactUs` [ctl:AAGMenu.ContactUs]
- `link-contact-us` [ctl:link-contact-us]
- `AAGMenu.MyAccount` [ctl:AAGMenu.MyAccount]
- `AAGMenu.Logout` [ctl:AAGMenu.Logout]
- `link-logout` [ctl:link-logout]
- `button-main-menu-2` [ctl:button-main-menu-2]
- `button-help` [ctl:button-help]
- `button-disclaimer` [ctl:button-disclaimer]
- `button-website-requirements` [ctl:button-website-requirements]
- `button-privacy-policy` [ctl:button-privacy-policy]
- `button-cookie-policy` [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/claims-mgmt-v1/screens/home/spec/parity.spec.ts`

## 13. Open questions
1. What is the exact visible label / purpose of header control `button` (it is captured as an unlabeled button)? [UNKNOWN]
2. What is the exact visible label / purpose of header control `button-2` (it is captured as an unlabeled button)? [UNKNOWN]
3. In the rebuild, should non-Claims Management side menu items be disabled (no-op) or navigate to legacy URLs? [UNKNOWN]

## 14. Motion
Nothing moved or animated during capture. [asset:motion.json]
