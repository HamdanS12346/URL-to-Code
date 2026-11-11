# FACTS — claims-mgmt-v1/pro-dur

Generated from a Playwright capture of the live page. Deterministic: nothing here is inferred. Read this first, then `content.md`.
Cite ids exactly as written: `[ctl:<key>]` controls, `[T07]` behaviors, `[val:<id>]` validators, `[shot:N]` your screenshot N, `[asset:<path>]` files.
All sizes are CSS px (screenshot px ÷ dpr).

## 1. Page
| | |
|---|---|
| URL | https://uximc.mms.tst.pgwcloud.net/ProDUR/ProDURDashBoard |
| Title | Pro DUR |
| Built with | jquery 3.7.1 |
| Doctype / mode | <!DOCTYPE html> / CSS1Compat |
| Viewport | 1920×1080 CSS px @ dpr 1 |
| Document | 1905×1600 CSS px |
| Language / charset | en / UTF-8 |
| Favicon | - |

**Reference picture made by the tool** (page warmed up and frozen: lazy images loaded, counters finished, carousels at slide 0): `reference.png`, 1905×1600 px @ dpr 1, 2 shots pasted at their exact scroll positions.
Look at `sections/` first: one full-resolution crop per band. They are far sharper than the whole-page picture. Cite one as `[asset:sections/<file>]`.

| # | crop file(s) | y | h (CSS px) | element |
|---|---|---|---|---|
| 1 | `sections/01-pro-dur.png` | 62 | 77 | div.menu |
| 2 | `sections/02-produrdashboard.png` | 139 | 350 | div#ProDURdashBoard.col-md-12 |
| 3 | `sections/03-disclaimer-the-website-is-prov.png` | 1482 | 119 | footer |

The page as a self-contained copy: `snapshot/rendered.html` (the DOM after its scripts ran, scripts removed, original class names) and `snapshot/used.css` (only the CSS rules this page uses, hover/focus/::before and media queries included). `snapshot/fidelity/report.json` says how closely that copy, rendered offline from the saved assets, matches the reference.

## 2. Design tokens (computed, weighted by use)
| token | values (weight) |
|---|---|
| font families | `Arial` (5031)<br>`Arial, sans-serif` (3356)<br>`Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` (2302)<br>`"Times New Roman"` (367)<br>`Poppins, Arial, Helvetica, sans-serif` (50)<br>`Poppins, sans-serif` (44) |
| size / weight / line-height | `14px / 400 / lh 14px` (5608)<br>`14px / 700 / lh 20px` (2872)<br>`16px / 400 / lh 20px` (1027)<br>`16px / 700 / lh 16px` (670)<br>`14px / 700 / lh 14px` (244)<br>`16px / 400 / lh 21px` (138)<br>`16px / 400 / lh 21.44px` (104)<br>`12px / 400 / lh 17.1429px` (102)<br>`12px / 400 / lh 32px` (83)<br>`15px / 500 / lh 16.5px` (48)<br>`22px / 400 / lh 22px` (44)<br>`22px / 400 / lh 45px` (37) |
| text colors | `rgb(61, 61, 61)` (5398)<br>`rgb(255, 255, 255)` (3824)<br>`rgb(51, 51, 51)` (725)<br>`rgb(0, 0, 0)` (552)<br>`rgb(34, 34, 34)` (345)<br>`rgb(0, 98, 255)` (138)<br>`rgb(87, 87, 87)` (113)<br>`rgb(43, 58, 68)` (37)<br>`rgb(48, 179, 254)` (29)<br>`rgb(90, 105, 120)` (17) |
| backgrounds | `rgb(255, 255, 255)` (323)<br>`rgb(43, 58, 68)` (276)<br>`rgb(0, 0, 0)` (180)<br>`rgb(0, 238, 174)` (61)<br>`rgb(48, 179, 254)` (4) |
| borders | `1px solid rgb(238, 238, 238)` (20)<br>`1px solid rgb(255, 255, 255)` (12)<br>`1px solid rgb(206, 212, 218)` (6)<br>`2px solid rgb(0, 179, 136)` (3)<br>`1px solid rgb(222, 226, 230)` (1)<br>`1px solid rgb(0, 0, 0)` (1)<br>`1px solid rgb(90, 105, 120)` (1) |
| radii | `5px` (55)<br>`9px` (6)<br>`10px 10px 0px 0px` (6)<br>`0px 0px 9px 9px` (6)<br>`10px` (1) |
| body | fontFamily: Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome; fontSize: 14px; lineHeight: 14px; color: rgb(51, 51, 51); backgroundColor: rgb(255, 255, 255); margin: 0px; padding: 62px 0px 0px |
| html | background rgba(0, 0, 0, 0); font-size 10px |
| web fonts loaded | Font Awesome 6 Pro 900 normal, Poppins normal normal, Poppins Bold normal normal |

## 3. Layout sections (top level, document order)
| # | element | box x,y,w,h | in shots | own style | first text | controls |
|---|---|---|---|---|---|---|
| 1 | div#pageHeader.header {pageHeader} | 0,0,1905,62 |  | backgroundColor: rgb(43, 58, 68); position: fixed | Medicaid Management Solutions | 18 |
| 2 | div.menu {navigation-claims-managem} | 0,62,1905,32 |  | backgroundColor: rgb(0, 238, 174) | Claims Management | 4 |
| 3 | div#mcbRowBorder.row {mcbRowBorder} | 0,94,1905,45 |  | borderBottom: 1px solid rgb(179, 179, 179); display: flex |  | 1 |
| 4 | div.row | 0,139,1905,0 |  |  |  | 0 |
| 5 | div.row | 0,139,1905,0 |  |  |  | 0 |
| 6 | div#pageBody.row {pageBody} | 0,139,1905,1343 |  |  | Actions | 1 |
| 7 | footer {contentinfo} | 0,1482,1905,119 |  |  | Disclaimer | 0 |

Exact per-element boxes and style deltas: `capture/dom.json` (`box` = [x, y, w, h] CSS px, `s` = style that differs from the parent).

## 4. Assets (use these files, never redraw them)
| file (under capture/) | used as | shown at (CSS) | natural px |
|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | img | 116×56 | 169×82 |

Fonts: `assets/fonts/Poppins.woff` (/fonts/Poppins.woff), `assets/fonts/Poppins-Bold.woff` (/fonts/Poppins-Bold.woff), `assets/webfonts/fa-solid-900.woff2` (/webfonts/fa-solid-900.woff2)
Stylesheets (legacy CSS, verbatim): `assets/bundles/appcss__dc8bcbe2.css`, `assets/bundles/vendorcss__75ac4b06.css`, `assets/_long/deb23c03e2505ea9.css`
All downloaded files: `capture/assets/index.json` (15).

## 5. Controls (every interactive element)
| key | kind | label | default | flags | rules | behavior |
|---|---|---|---|---|---|---|
| [ctl:pageBannerLogo] | button | Client Logo |  |  |  |  |
| [ctl:link-client-logo] | link | Client Logo |  |  |  | url → /Home/MyHome/ |
| [ctl:button] | button |  |  |  |  |  |
| [ctl:button-medicaid-management-solutions] | button | Medicaid Management Solutions |  |  |  |  |
| [ctl:button-main-menu] | button | Main Menu |  | hidden |  | handlers onclick,onkeypress |
| [ctl:button-2] | button |  |  |  |  | handlers jq:pointerdown,jq:MSPointerDown,jq:touchstart,jq:click,jq:mousedown |
| [ctl:AAGMenu.BroadcastMsg] | button | MESSAGES |  |  |  |  |
| [ctl:link-messages] | link | MESSAGES |  |  |  | js |
| [ctl:AAGMenu.ExternalLinks] | button | EXTERNAL LINKS |  |  |  |  |
| [ctl:link-external-links] | link | EXTERNAL LINKS |  |  |  | js |
| [ctl:AAGMenu.Favorites] | button | FAVORITES |  |  |  |  |
| [ctl:link-favorites] | link | FAVORITES |  |  |  | js |
| [ctl:AAGMenu.ContactUs] | button | CONTACT US |  |  |  |  |
| [ctl:link-contact-us] | link | CONTACT US |  |  |  | js |
| [ctl:AAGMenu.MyAccount] | button | MY ACCOUNT |  |  |  |  |
| [ctl:link-my-account] | link | MY ACCOUNT |  |  |  | url → /Home/MyAccount |
| [ctl:AAGMenu.Logout] | button | LOGOUT |  |  |  |  |
| [ctl:link-logout] | link | LOGOUT |  |  |  | url → /Security/LogoutFromMenu; handlers onclick,onkeypress |
| [ctl:button-main-menu-2] | button | Main Menu |  |  |  | handlers onclick,onkeypress |
| [ctl:mainMenuClose] | button | Close |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-3] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:mobileMenuIcon] | button | Expand |  | hidden |  | tooltip "Expand"; handlers jq:click |
| [ctl:button-4] | button |  |  | hidden |  | handlers jq:pointerdown,jq:MSPointerDown,jq:touchstart,jq:click,jq:mousedown |
| [ctl:AAGMenu.BroadcastMsg_mbl] | button | Messages |  | hidden |  |  |
| [ctl:link-messages-2] | link | Messages |  | hidden |  | js |
| [ctl:AAGMenu.ExternalLinks_mbl] | button | External Links |  | hidden |  |  |
| [ctl:link-external-links-2] | link | External Links |  | hidden |  | js |
| [ctl:AAGMenu.Favorites_mbl] | button | Favorites |  | hidden |  |  |
| [ctl:link-favorites-2] | link | Favorites |  | hidden |  | js |
| [ctl:AAGMenu.ContactUs_mbl] | button | Contact Us |  | hidden |  |  |
| [ctl:link-contact-us-2] | link | Contact Us |  | hidden |  | js |
| [ctl:AAGMenu.MyAccount_mbl] | button | My Account |  | hidden |  |  |
| [ctl:link-my-account-2] | link | My Account |  | hidden |  | url → /Home/MyAccount |
| [ctl:AAGMenu.Logout_mbl] | button | Logout |  | hidden |  |  |
| [ctl:link-logout-2] | link | Logout |  | hidden |  | url → /Security/LogoutFromMenu; handlers onclick,onkeypress |
| [ctl:button-5] | button |  |  | hidden |  | handlers jq:pointerdown,jq:MSPointerDown,jq:touchstart,jq:click,jq:mousedown |
| [ctl:button-6] | button |  |  | hidden |  | handlers jq:mouseover,jq:mousedown,jq:touchstart,jq:mouseout |
| [ctl:mainMenu] | button |  |  | hidden |  | handlers jq:mousewheel,jq:DOMMouseScroll,jq:keydown,jq:focus,jq:focusin |
| [ctl:button-administration-broadcast-message] | button | Administration Broadcast Message FAQ's M… |  | hidden |  |  |
| [ctl:615deb7d-8523-4ec6-ac38-5233889169c0] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-broadcast-message] | button | Broadcast Message |  | hidden |  |  |
| [ctl:link-broadcast-message] | link | Broadcast Message |  | hidden |  | url → /BroadcastMessage/BroadcastMessageSearch |
| [ctl:button-faq-s] | button | FAQ's |  | hidden |  |  |
| [ctl:link-faq-s] | link | FAQ's |  | hidden |  | url → /FAQMaintenance/FAQMaintenanceSearch |
| [ctl:button-manage-application-settings] | button | Manage Application Settings |  | hidden |  |  |
| [ctl:link-manage-application-settings] | link | Manage Application Settings |  | hidden |  | url → /AppSetting/ManageAppSettings |
| [ctl:button-manage-html-blocks] | button | Manage HTML Blocks |  | hidden |  |  |
| [ctl:link-manage-html-blocks] | link | Manage HTML Blocks |  | hidden |  | url → /Localization/ManageHtmlBlocks |
| [ctl:button-manage-help] | button | Manage Help |  | hidden |  |  |
| [ctl:link-manage-help] | link | Manage Help |  | hidden |  | url → /ManageHelpContent/HelpContentSearch |
| [ctl:button-manage-images] | button | Manage Images |  | hidden |  |  |
| [ctl:link-manage-images] | link | Manage Images |  | hidden |  | url → /Localization/ManageImages |
| [ctl:button-manage-ioc-settings] | button | Manage IOC Settings |  | hidden |  |  |
| [ctl:link-manage-ioc-settings] | link | Manage IOC Settings |  | hidden |  | url → /AppSetting/ManageIocSettings |
| [ctl:button-manage-labels] | button | Manage Labels |  | hidden |  |  |
| [ctl:link-manage-labels] | link | Manage Labels |  | hidden |  | url → /Localization/ManageLabels |
| [ctl:button-manage-menus] | button | Manage Menus |  | hidden |  |  |
| [ctl:link-manage-menus] | link | Manage Menus |  | hidden |  | url → /Menu/ManageMenus |
| [ctl:button-manage-menu-items] | button | Manage Menu Items |  | hidden |  |  |
| [ctl:link-manage-menu-items] | link | Manage Menu Items |  | hidden |  | url → /Menu/ManageMenuItems |
| [ctl:button-manage-messages] | button | Manage Messages |  | hidden |  |  |
| [ctl:link-manage-messages] | link | Manage Messages |  | hidden |  | url → /Localization/ManageMessages |
| [ctl:button-manage-security-functions] | button | Manage Security Functions |  | hidden |  |  |
| [ctl:link-manage-security-functions] | link | Manage Security Functions |  | hidden |  | url → /Localization/ManageSecurityFunctions |
| [ctl:button-manage-security-rights] | button | Manage Security Rights |  | hidden |  |  |
| [ctl:link-manage-security-rights] | link | Manage Security Rights |  | hidden |  | url → /Localization/ManageSecurityRights |
| [ctl:button-manage-security-roles] | button | Manage Security Roles |  | hidden |  |  |
| [ctl:link-manage-security-roles] | link | Manage Security Roles |  | hidden |  | url → /Localization/ManageSecurityRoles |
| [ctl:button-manage-services] | button | Manage Services |  | hidden |  |  |
| [ctl:link-manage-services] | link | Manage Services |  | hidden |  | url → /Service/ManageServices |
| [ctl:button-manage-subscriptions] | button | Manage Subscriptions |  | hidden |  |  |
| [ctl:link-manage-subscriptions] | link | Manage Subscriptions |  | hidden |  | url → /EventSubscriptions/ManageSubscription |
| [ctl:button-manage-module-events] | button | Manage Module Events |  | hidden |  |  |
| [ctl:link-manage-module-events] | link | Manage Module Events |  | hidden |  | url → /ModuleEvents/ManageModuleEvents |
| [ctl:button-manage-users] | button | Manage Users |  | hidden |  |  |
| [ctl:link-manage-users] | link | Manage Users |  | hidden |  | url → /UserMaintenance/ManageUsers |
| [ctl:button-manage-user-invitations] | button | Manage User Invitations |  | hidden |  |  |
| [ctl:link-manage-user-invitations] | link | Manage User Invitations |  | hidden |  | url → /UserMaintenance/ManageUserInvitations |
| [ctl:button-alert-notification-event-configu] | button | Alert Notification Event Configuration S… |  | hidden |  |  |
| [ctl:e3fdc2d6-c5b6-44e6-9e0d-3a49ad534b94] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-event-configuration] | button | Event Configuration |  | hidden |  |  |
| [ctl:link-event-configuration] | link | Event Configuration |  | hidden |  | url → /Notifications/EventNotificationSearch |
| [ctl:button-subscriber-configuration] | button | Subscriber Configuration |  | hidden |  |  |
| [ctl:link-subscriber-configuration] | link | Subscriber Configuration |  | hidden |  | url → /Notifications/SubscriberSearch |
| [ctl:button-event-subscription] | button | Event Subscription |  | hidden |  |  |
| [ctl:link-event-subscription] | link | Event Subscription |  | hidden |  | url → /Notifications/SubscriptionDetails |
| [ctl:button-tracking] | button | Tracking |  | hidden |  |  |
| [ctl:link-tracking] | link | Tracking |  | hidden |  | url → /Notifications/NotificationTracking |
| [ctl:button-claims-management-search-claims-] | button | Claims Management Search Claims Pro DUR |  | hidden |  |  |
| [ctl:link-claims-management] | link | Claims Management |  | hidden |  | url → /ClaimsManagement/Dashboard |
| [ctl:0487fabf-5575-46e9-83d6-d95fdfcd4a45] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-search-claims] | button | Search Claims |  | hidden |  |  |
| [ctl:link-search-claims] | link | Search Claims |  | hidden |  | url → /ClaimsManagement/SearchClaims |
| [ctl:button-pro-dur] | button | Pro DUR |  | hidden |  |  |
| [ctl:link-pro-dur] | link | Pro DUR |  | hidden |  | anchor |
| [ctl:button-drug-rebate-dashboard-labeler-nd] | button | Drug Rebate Dashboard Labeler NDC Claim … |  | hidden |  |  |
| [ctl:link-drug-rebate] | link | Drug Rebate |  | hidden |  | url → /DrugRebate/Dashboard |
| [ctl:5387e76f-47b1-4b9e-9fc9-205c85f934a8] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-dashboard] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard] | link | Dashboard |  | hidden |  | url → /DrugRebate/Dashboard |
| [ctl:button-labeler] | button | Labeler |  | hidden |  |  |
| [ctl:link-labeler] | link | Labeler |  | hidden |  | url → /DrugRebate/SearchLabelerInformation |
| [ctl:button-ndc] | button | NDC |  | hidden |  |  |
| [ctl:link-ndc] | link | NDC |  | hidden |  | url → /NationalDrugCode/SearchNationalDrugCode |
| [ctl:button-claim-level-detail] | button | Claim Level Detail |  | hidden |  |  |
| [ctl:link-claim-level-detail] | link | Claim Level Detail |  | hidden |  | url → /ClaimDetails/SearchClaims |
| [ctl:button-ccn-list] | button | CCN List |  | hidden |  |  |
| [ctl:link-ccn-list] | link | CCN List |  | hidden |  | url → /CashControlNumbers/SearchCashControlNumbers |
| [ctl:button-rosi-pqas-list] | button | ROSI/PQAS List |  | hidden |  |  |
| [ctl:link-rosi-pqas-list] | link | ROSI/PQAS List |  | hidden |  | url → /DrugRebate/SearchRosiPqas |
| [ctl:button-disputes-list] | button | Disputes List |  | hidden |  |  |
| [ctl:link-disputes-list] | link | Disputes List |  | hidden |  | url → /Invoice/SearchNDCDisputes |
| [ctl:button-invoice-management] | button | Invoice Management |  | hidden |  |  |
| [ctl:link-invoice-management] | link | Invoice Management |  | hidden |  | url → /Invoice/SearchInvoiceInquiry |
| [ctl:button-ndc-invoice-inquiry] | button | NDC Invoice Inquiry |  | hidden |  |  |
| [ctl:link-ndc-invoice-inquiry] | link | NDC Invoice Inquiry |  | hidden |  | url → /NDCInvoice/SearchNDCInvoiceInquiry |
| [ctl:button-ccn-ndc-association] | button | CCN/NDC Association |  | hidden |  |  |
| [ctl:link-ccn-ndc-association] | link | CCN/NDC Association |  | hidden |  | url → /Invoice/SearchCCNAssociated |
| [ctl:button-ppa-maintenance] | button | PPA Maintenance |  | hidden |  |  |
| [ctl:link-ppa-maintenance] | link | PPA Maintenance |  | hidden |  | url → /PPAMaintenance/SearchPPAMaintenance |
| [ctl:button-incremental-adjustments] | button | Incremental Adjustments |  | hidden |  |  |
| [ctl:link-incremental-adjustments] | link | Incremental Adjustments |  | hidden |  | url → /IncrementalAdjustment/SearchIncrementalAdjustment |
| [ctl:button-postmark-dates] | button | Postmark Dates |  | hidden |  |  |
| [ctl:link-postmark-dates] | link | Postmark Dates |  | hidden |  | url → /PostmarkDates/PostmarkDates |
| [ctl:button-t-bill-rates] | button | T-Bill Rates |  | hidden |  |  |
| [ctl:link-t-bill-rates] | link | T-Bill Rates |  | hidden |  | url → /DrugRebate/SearchTreasuryBillRates |
| [ctl:button-340b-providers] | button | 340b Providers |  | hidden |  |  |
| [ctl:link-340b-providers] | link | 340b Providers |  | hidden |  | url → /DrugRebate/SearchProvider340b |
| [ctl:button-provider-recoupment] | button | Provider Recoupment |  | hidden |  |  |
| [ctl:link-provider-recoupment] | link | Provider Recoupment |  | hidden |  | url → /ProviderRecoupment/SearchProviderRecoupment |
| [ctl:button-invoice-process-flags] | button | Invoice Process Flags |  | hidden |  |  |
| [ctl:link-invoice-process-flags] | link | Invoice Process Flags |  | hidden |  | url → /DrugRebate/InvoiceProcessFlags |
| [ctl:button-fund-codes] | button | Fund Codes |  | hidden |  |  |
| [ctl:link-fund-codes] | link | Fund Codes |  | hidden |  | url → /FundCodes/SearchFundCodes |
| [ctl:button-web-information] | button | Web Information |  | hidden |  |  |
| [ctl:link-web-information] | link | Web Information |  | hidden |  | url → /WebAdmin/WebAdmin |
| [ctl:button-ui-examples-page-elements-widget] | button | UI Examples Page Elements / Widgets |  | hidden |  |  |
| [ctl:link-ui-examples] | link | UI Examples |  | hidden |  | url → /Employee/UIExamples |
| [ctl:a0b405c2-8294-41ab-8bb9-ddcde8ad709d] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-page-elements-widgets] | button | Page Elements / Widgets |  | hidden |  |  |
| [ctl:link-page-elements-widgets] | link | Page Elements / Widgets |  | hidden |  | url → /Employee/UIExamples |
| [ctl:button-file-transfer-services-file-tran] | button | File Transfer Services File Transfer Con… |  | hidden |  |  |
| [ctl:f63da5ba-b538-418d-bd95-22f85394a398] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-file-transfer-configuration] | button | File Transfer Configuration |  | hidden |  |  |
| [ctl:link-file-transfer-configuration] | link | File Transfer Configuration |  | hidden |  | url → /FileTransfer/SearchSourceLocations |
| [ctl:button-file-transfer-tracking] | button | File Transfer Tracking |  | hidden |  |  |
| [ctl:link-file-transfer-tracking] | link | File Transfer Tracking |  | hidden |  | url → /FileTransfer/SearchFileTransferTracking |
| [ctl:button-ftp-server-credentials] | button | FTP Server Credentials |  | hidden |  |  |
| [ctl:link-ftp-server-credentials] | link | FTP Server Credentials |  | hidden |  | url → /FileTransfer/SearchFTPServerCredentials |
| [ctl:button-integration-event-to-file-query-] | button | Integration Event To File Query Builder … |  | hidden |  |  |
| [ctl:link-integration] | link | Integration |  | hidden |  | url → /Integration/Dashboard |
| [ctl:cedbe8d7-3161-4505-a39f-e37fefe12afa] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-event-to-file-query-builder] | button | Event To File Query Builder |  | hidden |  |  |
| [ctl:link-event-to-file-query-builder] | link | Event To File Query Builder |  | hidden |  | url → /EventToFileWizard/SearchEventToFileMetadata |
| [ctl:button-file-to-event-metadata] | button | File To Event Metadata |  | hidden |  |  |
| [ctl:link-file-to-event-metadata] | link | File To Event Metadata |  | hidden |  | url → /EventsDistributor/SearchFileDefinition |
| [ctl:button-file-to-event-orchestration] | button | File To Event Orchestration |  | hidden |  |  |
| [ctl:link-file-to-event-orchestration] | link | File To Event Orchestration |  | hidden |  | url → /FileToEventOrchestration/SearchExternalOrchestration |
| [ctl:button-event-status-tracking] | button | Event Status Tracking |  | hidden |  |  |
| [ctl:link-event-status-tracking] | link | Event Status Tracking |  | hidden |  | url → /EventStatusTracking/SearchEventStatus |
| [ctl:button-system-process-tracking] | button | System Process Tracking |  | hidden |  |  |
| [ctl:link-system-process-tracking] | link | System Process Tracking |  | hidden |  | url → /SystemProcessTracking/SearchSystemProcessTracking |
| [ctl:button-dashboard-2] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard-2] | link | Dashboard |  | hidden |  | url → /Integration/Dashboard |
| [ctl:button-managed-care-mce-member-network-] | button | Managed Care MCE Member Network Provider… |  | hidden |  |  |
| [ctl:link-managed-care] | link | Managed Care |  | hidden |  | url → /ManagedCare/Dashboard |
| [ctl:e4389fa7-67f8-4942-8b97-68d91c0f8f40] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-mce] | button | MCE |  | hidden |  |  |
| [ctl:link-mce] | link | MCE |  | hidden |  | url → /ManagedCare/SearchMCE |
| [ctl:button-member] | button | Member |  | hidden |  |  |
| [ctl:link-member] | link | Member |  | hidden |  | url → /ManagedCare/SearchMember |
| [ctl:button-network] | button | Network |  | hidden |  |  |
| [ctl:link-network] | link | Network |  | hidden |  | url → /Network/SearchNetwork |
| [ctl:button-provider] | button | Provider |  | hidden |  |  |
| [ctl:link-provider] | link | Provider |  | hidden |  | url → /ManagedCare/SearchPCPProvider |
| [ctl:button-hipaa-transactions] | button | HIPAA Transactions |  | hidden |  |  |
| [ctl:link-hipaa-transactions] | link | HIPAA Transactions |  | hidden |  | url → /ManagedCare/EDITxnSearch |
| [ctl:button-lock-out] | button | Lock Out |  | hidden |  |  |
| [ctl:link-lock-out] | link | Lock Out |  | hidden |  | url → /ManagedCare/SearchLockOutByPCPMCEMember |
| [ctl:button-screening-results] | button | Screening Results |  | hidden |  |  |
| [ctl:link-screening-results] | link | Screening Results |  | hidden |  | url → /ManagedCare/ScreeningResults |
| [ctl:button-capitation] | button | Capitation |  | hidden |  |  |
| [ctl:link-capitation] | link | Capitation |  | hidden |  | url → /ManagedCare/Capitation |
| [ctl:button-reports] | button | Reports |  | hidden |  |  |
| [ctl:link-reports] | link | Reports |  | hidden |  | url → /ManagedCare/ManagedCareReports |
| [ctl:button-reference-data] | button | Reference Data |  | hidden |  |  |
| [ctl:link-reference-data] | link | Reference Data |  | hidden |  | url → /ManagedCare/ReferenceData |
| [ctl:button-provider-mce-enrollment] | button | Provider MCE Enrollment |  | hidden |  |  |
| [ctl:link-provider-mce-enrollment] | link | Provider MCE Enrollment |  | hidden |  | url → /ManagedCare/SearchProviderMCEEnrollment |
| [ctl:button-file-upload] | button | File Upload |  | hidden |  |  |
| [ctl:link-file-upload] | link | File Upload |  | hidden |  | url → /ManagedCare/SearchCapitationFileUpload |
| [ctl:button-mass-transfer] | button | Mass Transfer |  | hidden |  |  |
| [ctl:link-mass-transfer] | link | Mass Transfer |  | hidden |  | url → /ManagedCare/MassTransferSearch |
| [ctl:button-member-management-member-medicai] | button | Member Management Member Medicaid Case F… |  | hidden |  |  |
| [ctl:link-member-management] | link | Member Management |  | hidden |  | url → /MemberManagement/MemberLanding |
| [ctl:35abc519-1f9d-4e7a-ac06-952cd3e304e1] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-member-2] | button | Member |  | hidden |  |  |
| [ctl:link-member-2] | link | Member |  | hidden |  | url → /MemberManagement/SearchMember |
| [ctl:button-medicaid-case] | button | Medicaid Case |  | hidden |  |  |
| [ctl:link-medicaid-case] | link | Medicaid Case |  | hidden |  | url → /MedicaidCase/SearchMedicaidCase |
| [ctl:button-fulfillment-materials] | button | Fulfillment Materials |  | hidden |  |  |
| [ctl:link-fulfillment-materials] | link | Fulfillment Materials |  | hidden |  | url → /FulfillmentMaterials/FulfillmentMaterials |
| [ctl:button-fraud-protection] | button | Fraud Protection |  | hidden |  |  |
| [ctl:link-fraud-protection] | link | Fraud Protection |  | hidden |  | url → /FraudProtection/SearchFraudProtection |
| [ctl:button-group] | button | Group |  | hidden |  |  |
| [ctl:link-group] | link | Group |  | hidden |  | url → /Group/SearchGroup |
| [ctl:button-broker-sales-tpa] | button | Broker/Sales/TPA |  | hidden |  |  |
| [ctl:link-broker-sales-tpa] | link | Broker/Sales/TPA |  | hidden |  | url → /BrokerSalesTPA/SearchBrokerSalesTPA |
| [ctl:button-person] | button | Person |  | hidden |  |  |
| [ctl:link-person] | link | Person |  | hidden |  | url → /Person/SearchPerson |
| [ctl:button-plan-management-reference-data-p] | button | Plan Management Reference Data Pharmacy … |  | hidden |  |  |
| [ctl:link-plan-management] | link | Plan Management |  | hidden |  | url → /PlanManagement/Dashboard |
| [ctl:c7a80c94-45bf-471e-8004-e4b42bcb37f2] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-reference-data-2] | button | Reference Data |  | hidden |  |  |
| [ctl:link-reference-data-2] | link | Reference Data |  | hidden |  | url → /PlanManagement/ReferenceData |
| [ctl:button-pharmacy-related-data] | button | Pharmacy Related Data |  | hidden |  |  |
| [ctl:link-pharmacy-related-data] | link | Pharmacy Related Data |  | hidden |  | url → /PlanManagement/SearchPharmacyRelatedData |
| [ctl:button-related-data] | button | Related Data |  | hidden |  |  |
| [ctl:link-related-data] | link | Related Data |  | hidden |  | url → /PlanManagement/SearchRelatedInformation |
| [ctl:button-rate-setting] | button | Rate Setting |  | hidden |  |  |
| [ctl:link-rate-setting] | link | Rate Setting |  | hidden |  | url → /PlanManagement/SearchRates |
| [ctl:button-file-upload-2] | button | File Upload |  | hidden |  |  |
| [ctl:link-file-upload-2] | link | File Upload |  | hidden |  | url → /PlanManagement/FileUpload |
| [ctl:button-manage-cycles] | button | Manage Cycles |  | hidden |  |  |
| [ctl:link-manage-cycles] | link | Manage Cycles |  | hidden |  | url → /PlanManagement/SearchCycleSchedule |
| [ctl:button-program-integrity-dashboard-mana] | button | Program Integrity Dashboard Manage Confi… |  | hidden |  |  |
| [ctl:27c22fe2-d144-41d5-9031-84bc8f12b670] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-dashboard-3] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard-3] | link | Dashboard |  | hidden |  | url → /ProgramIntegrity/PIURDashboard |
| [ctl:button-manage-configurations] | button | Manage Configurations |  | hidden |  |  |
| [ctl:link-manage-configurations] | link | Manage Configurations |  | hidden |  | url → /ProgramIntegrity/ManageConfigurations |
| [ctl:button-custom-peer-groups] | button | Custom Peer Groups |  | hidden |  |  |
| [ctl:link-custom-peer-groups] | link | Custom Peer Groups |  | hidden |  | url → /ProgramIntegrity/CustomPeerGroupSearch |
| [ctl:button-service-types] | button | Service Types |  | hidden |  |  |
| [ctl:link-service-types] | link | Service Types |  | hidden |  | url → /ProgramIntegrity/ServiceTypeSearch |
| [ctl:button-study-request] | button | Study Request |  | hidden |  |  |
| [ctl:link-study-request] | link | Study Request |  | hidden |  | url → /ProgramIntegrity/StudyRequestSearch |
| [ctl:button-suppressed-entities] | button | Suppressed Entities |  | hidden |  |  |
| [ctl:link-suppressed-entities] | link | Suppressed Entities |  | hidden |  | url → /ProgramIntegrity/SuppressEntitySearch |
| [ctl:button-study-analysis-catalog] | button | Study Analysis Catalog |  | hidden |  |  |
| [ctl:link-study-analysis-catalog] | link | Study Analysis Catalog |  | hidden |  | url → /ProgramIntegrity/StudyAnalysisCatalog |
| [ctl:button-manage-assignment-permissions] | button | Manage Assignment Permissions |  | hidden |  |  |
| [ctl:link-manage-assignment-permissions] | link | Manage Assignment Permissions |  | hidden |  | url → /ProgramIntegrity/SearchAssignmentPermissions |
| [ctl:button-predictive-model-definition] | button | Predictive Model Definition |  | hidden |  |  |
| [ctl:link-predictive-model-definition] | link | Predictive Model Definition |  | hidden |  | url → /ProgramIntegrity/SearchPMDefinition |
| [ctl:button-targeted-query-definition] | button | Targeted Query Definition |  | hidden |  |  |
| [ctl:link-targeted-query-definition] | link | Targeted Query Definition |  | hidden |  | url → /ProgramIntegrity/TargetedQueryDefinitionSearch |
| [ctl:button-analysis-review] | button | Analysis Review |  | hidden |  |  |
| [ctl:link-analysis-review] | link | Analysis Review |  | hidden |  | url → /ProgramIntegrity/AnalysisReviewHome |
| [ctl:button-case-request] | button | Case Request |  | hidden |  |  |
| [ctl:link-case-request] | link | Case Request |  | hidden |  | url → /ProgramIntegrity/CaseRequestSearch |
| [ctl:button-pi-case-tracking-dashboard-case-] | button | PI Case Tracking Dashboard Case Intake R… |  | hidden |  |  |
| [ctl:link-pi-case-tracking] | link | PI Case Tracking |  | hidden |  | url → /ProgramIntegrityCT/Dashboard |
| [ctl:c894b20b-bfea-41ed-a098-ac20da984f2f] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-dashboard-4] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard-4] | link | Dashboard |  | hidden |  | url → /ProgramIntegrityCT/Dashboard |
| [ctl:button-case] | button | Case |  | hidden |  |  |
| [ctl:link-case] | link | Case |  | hidden |  | url → /ProgramIntegrityCT/SearchCase |
| [ctl:button-intake] | button | Intake |  | hidden |  |  |
| [ctl:link-intake] | link | Intake |  | hidden |  | url → /ProgramIntegrityCT/SearchIntake |
| [ctl:button-review-types] | button | Review Types |  | hidden |  |  |
| [ctl:link-review-types] | link | Review Types |  | hidden |  | url → /ProgramIntegrityCT/SearchReviewTypes |
| [ctl:button-supercase] | button | SuperCase |  | hidden |  |  |
| [ctl:link-supercase] | link | SuperCase |  | hidden |  | url → /ProgramIntegrityCT/SearchSuperCase |
| [ctl:button-contact] | button | Contact |  | hidden |  |  |
| [ctl:link-contact] | link | Contact |  | hidden |  | url → /ProgramIntegrityCT/SearchContact |
| [ctl:button-user-information] | button | User Information |  | hidden |  |  |
| [ctl:link-user-information] | link | User Information |  | hidden |  | url → /ProgramIntegrityCT/SearchUserInformation |
| [ctl:button-letter-template] | button | Letter Template |  | hidden |  |  |
| [ctl:link-letter-template] | link | Letter Template |  | hidden |  | url → /ProgramIntegrityCT/SearchLetterTemplate |
| [ctl:button-bulk-load] | button | Bulk Load |  | hidden |  |  |
| [ctl:link-bulk-load] | link | Bulk Load |  | hidden |  | url → /ProgramIntegrityCT/SearchBulkLoad |
| [ctl:button-provider-enrollment-dashboard-se] | button | Provider Enrollment Dashboard Search Enr… |  | hidden |  |  |
| [ctl:link-provider-enrollment] | link | Provider Enrollment |  | hidden |  | url → /ProviderEnrollment/Dashboard |
| [ctl:e56f9d29-42a7-4399-bacd-a027db203075] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-dashboard-5] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard-5] | link | Dashboard |  | hidden |  | url → /ProviderEnrollment/Dashboard |
| [ctl:button-search-enrollment-application] | button | Search Enrollment Application |  | hidden |  |  |
| [ctl:link-search-enrollment-application] | link | Search Enrollment Application |  | hidden |  | url → /ProviderEnrollment/SearchProviderApplication |
| [ctl:button-search-enrollment-reports] | button | Search Enrollment Reports |  | hidden |  |  |
| [ctl:link-search-enrollment-reports] | link | Search Enrollment Reports |  | hidden |  | url → /ProviderEnrollment/SearchEnrollmentReports |
| [ctl:button-workflow-dashboard] | button | Workflow Dashboard |  | hidden |  |  |
| [ctl:link-workflow-dashboard] | link | Workflow Dashboard |  | hidden |  | external → https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard |
| [ctl:button-workflow-applications] | button | Workflow Applications |  | hidden |  |  |
| [ctl:link-workflow-applications] | link | Workflow Applications |  | hidden |  | external → https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications |
| [ctl:button-workflow-configuration] | button | Workflow Configuration |  | hidden |  |  |
| [ctl:link-workflow-configuration] | link | Workflow Configuration |  | hidden |  | external → https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration |
| [ctl:button-workflow-tasks] | button | Workflow Tasks |  | hidden |  |  |
| [ctl:link-workflow-tasks] | link | Workflow Tasks |  | hidden |  | external → https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks |
| [ctl:button-new-enrollment-entry] | button | New Enrollment Entry |  | hidden |  |  |
| [ctl:link-new-enrollment-entry] | link | New Enrollment Entry |  | hidden |  | url → /ProviderEnrollment/CreateSecureEnrollment |
| [ctl:button-resume-enrollment-entry] | button | Resume Enrollment Entry |  | hidden |  |  |
| [ctl:link-resume-enrollment-entry] | link | Resume Enrollment Entry |  | hidden |  | url → /ProviderEnrollment/ResumeSecureEnrollment |
| [ctl:button-provider-management-providers-ow] | button | Provider Management Providers Owners and… |  | hidden |  |  |
| [ctl:link-provider-management] | link | Provider Management |  | hidden |  | url → /ProviderManagement/Dashboard |
| [ctl:d4e6c240-159a-4d03-9213-be59caa2851d] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-providers] | button | Providers |  | hidden |  |  |
| [ctl:link-providers] | link | Providers |  | hidden |  | url → /ProviderManagement/SearchProvider |
| [ctl:button-owners-and-managing-employees] | button | Owners and Managing Employees |  | hidden |  |  |
| [ctl:link-owners-and-managing-employees] | link | Owners and Managing Employees |  | hidden |  | url → /ProviderManagement/SearchOwnerManagingEmployeeAssociation |
| [ctl:button-irs-w-9-tax-ids] | button | IRS W-9 Tax IDs |  | hidden |  |  |
| [ctl:link-irs-w-9-tax-ids] | link | IRS W-9 Tax IDs |  | hidden |  | url → /ProviderManagement/SearchIRSTaxId |
| [ctl:button-provider-summary] | button | Provider Summary |  | hidden |  |  |
| [ctl:link-provider-summary] | link | Provider Summary |  | hidden |  | url → /ProviderManagement/SearchProviderSummary |
| [ctl:button-clia-numbers] | button | CLIA Numbers |  | hidden |  |  |
| [ctl:link-clia-numbers] | link | CLIA Numbers |  | hidden |  | url → /ProviderManagement/SearchCLIANumber |
| [ctl:button-eft-enrollments] | button | EFT Enrollments |  | hidden |  |  |
| [ctl:link-eft-enrollments] | link | EFT Enrollments |  | hidden |  | url → /ProviderManagement/SearchBaseEFTEnrollments |
| [ctl:button-workflow-items] | button | Workflow Items |  | hidden |  |  |
| [ctl:link-workflow-items] | link | Workflow Items |  | hidden |  | url → /ProviderManagement/CompletedWorkItems |
| [ctl:button-mco-enrollment-list] | button | MCO Enrollment List |  | hidden |  |  |
| [ctl:link-mco-enrollment-list] | link | MCO Enrollment List |  | hidden |  | url → /ProviderManagement/SearchMCOProvider |
| [ctl:button-bulk-transactions-within-base-id] | button | Bulk Transactions Within Base ID |  | hidden |  |  |
| [ctl:link-bulk-transactions-within-base-id] | link | Bulk Transactions Within Base ID |  | hidden |  | url → /ProviderManagement/SearchBulkTransaction |
| [ctl:button-nppr-transactions] | button | NPPR Transactions |  | hidden |  |  |
| [ctl:link-nppr-transactions] | link | NPPR Transactions |  | hidden |  | url → /ProviderManagement/SearchNPPR |
| [ctl:button-prn-transactions] | button | PRN Transactions |  | hidden |  |  |
| [ctl:link-prn-transactions] | link | PRN Transactions |  | hidden |  | url → /ProviderManagement/SearchPRN |
| [ctl:button-ep-workflow-transactions] | button | EP Workflow Transactions |  | hidden |  |  |
| [ctl:link-ep-workflow-transactions] | link | EP Workflow Transactions |  | hidden |  | url → /ProviderManagement/SearchEPTransaction |
| [ctl:button-base-id-termination-transactions] | button | Base ID Termination Transactions |  | hidden |  |  |
| [ctl:link-base-id-termination-transactions] | link | Base ID Termination Transactions |  | hidden |  | url → /ProviderManagement/SearchProviderBaseIDTermTransaction |
| [ctl:button-mass-change-transactions] | button | Mass Change Transactions |  | hidden |  |  |
| [ctl:link-mass-change-transactions] | link | Mass Change Transactions |  | hidden |  | url → /ProviderManagement/SearchMassChangeTransaction |
| [ctl:button-change-of-ownership-transactions] | button | Change Of Ownership Transactions |  | hidden |  |  |
| [ctl:link-change-of-ownership-transactions] | link | Change Of Ownership Transactions |  | hidden |  | url → /ProviderManagement/SearchChangeOfOwnershipTransactions |
| [ctl:button-provider-dashboard] | button | Provider Dashboard |  | hidden |  |  |
| [ctl:link-provider-dashboard] | link | Provider Dashboard |  | hidden |  | url → /ProviderManagement/Dashboard |
| [ctl:button-managed-care-entities] | button | Managed Care Entities |  | hidden |  |  |
| [ctl:link-managed-care-entities] | link | Managed Care Entities |  | hidden |  | url → /ProviderManagedCare/SearchManagedCareEntity |
| [ctl:button-screening-credentialing-dashboar] | button | Screening/Credentialing Dashboard Creden… |  | hidden |  |  |
| [ctl:link-screening-credentialing] | link | Screening/Credentialing |  | hidden |  | url → /Credentialing/Dashboard |
| [ctl:13dc971d-0faa-45cb-b2e9-fe9e0beb906f] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-dashboard-6] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard-6] | link | Dashboard |  | hidden |  | url → /Credentialing/Dashboard |
| [ctl:button-credentialing-application-review] | button | Credentialing Application Review |  | hidden |  |  |
| [ctl:link-credentialing-application-review] | link | Credentialing Application Review |  | hidden |  | external → http://https//apnmc.shared.tst.pgwcloud.net/suite/sites/credentialing-review |
| [ctl:button-search] | button | Search |  | hidden |  |  |
| [ctl:link-search] | link | Search |  | hidden |  | url → /Credentialing/Search |
| [ctl:button-search-audit-history] | button | Search Audit History |  | hidden |  |  |
| [ctl:link-search-audit-history] | link | Search Audit History |  | hidden |  | url → /Credentialing/AuditSearch |
| [ctl:button-file-upload-download-search] | button | File Upload/Download/Search |  | hidden |  |  |
| [ctl:link-file-upload-download-search] | link | File Upload/Download/Search |  | hidden |  | url → /Credentialing/FileMgmtSearch |
| [ctl:button-tpl-case-tracking-case-contact-d] | button | TPL Case Tracking Case Contact Desktop R… |  | hidden |  |  |
| [ctl:link-tpl-case-tracking] | link | TPL Case Tracking |  | hidden |  | url → /TPLCaseTracking/Dashboard |
| [ctl:2bf67ffb-390a-40b9-87a0-f17c3a408ae7] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-case-2] | button | Case |  | hidden |  |  |
| [ctl:link-case-2] | link | Case |  | hidden |  | url → /TPLCaseTracking/SearchCase |
| [ctl:button-contact-2] | button | Contact |  | hidden |  |  |
| [ctl:link-contact-2] | link | Contact |  | hidden |  | url → /TPLCaseTracking/SearchContact |
| [ctl:button-desktop-review-upload] | button | Desktop Review Upload |  | hidden |  |  |
| [ctl:link-desktop-review-upload] | link | Desktop Review Upload |  | hidden |  | url → /TPLCaseTracking/DesktopReviewUpload |
| [ctl:button-search-desktop-review] | button | Search Desktop Review |  | hidden |  |  |
| [ctl:link-search-desktop-review] | link | Search Desktop Review |  | hidden |  | url → /TPLCaseTracking/SearchDesktopReviewCase |
| [ctl:button-worker-compensation-intake] | button | Worker Compensation Intake |  | hidden |  |  |
| [ctl:link-worker-compensation-intake] | link | Worker Compensation Intake |  | hidden |  | url → /TPLCaseTracking/SearchWorkerCompensation |
| [ctl:button-manage-case-assignment-permissio] | button | Manage Case Assignment Permissions |  | hidden |  |  |
| [ctl:link-manage-case-assignment-permissio] | link | Manage Case Assignment Permissions |  | hidden |  | url → /TPLCaseTracking/SearchCaseAssignmentPermissions |
| [ctl:button-tpl-policy-carrier-employer-poli] | button | TPL Policy Carrier Employer Policyholder… |  | hidden |  |  |
| [ctl:link-tpl-policy] | link | TPL Policy |  | hidden |  | url → /TPLPolicy/Dashboard |
| [ctl:42c90dc3-9625-4323-9d6d-24c4a6aa5eb0] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-carrier] | button | Carrier |  | hidden |  |  |
| [ctl:link-carrier] | link | Carrier |  | hidden |  | url → /TPLPolicy/SearchCarrier |
| [ctl:button-employer] | button | Employer |  | hidden |  |  |
| [ctl:link-employer] | link | Employer |  | hidden |  | url → /TPLPolicy/SearchEmployer |
| [ctl:button-policyholder] | button | Policyholder |  | hidden |  |  |
| [ctl:link-policyholder] | link | Policyholder |  | hidden |  | url → /TPLPolicy/SearchPolicyholder |
| [ctl:button-absent-parent] | button | Absent Parent |  | hidden |  |  |
| [ctl:link-absent-parent] | link | Absent Parent |  | hidden |  | url → /TPLPolicy/SearchAbsentParent |
| [ctl:button-policy] | button | Policy |  | hidden |  |  |
| [ctl:link-policy] | link | Policy |  | hidden |  | url → /TPLPolicy/SearchTPLPolicy |
| [ctl:button-tpl-policy-intake] | button | TPL Policy Intake |  | hidden |  |  |
| [ctl:link-tpl-policy-intake] | link | TPL Policy Intake |  | hidden |  | url → /TPLPolicy/SearchPolicyIntake |
| [ctl:button-mass-carrier-migration] | button | Mass Carrier Migration |  | hidden |  |  |
| [ctl:link-mass-carrier-migration] | link | Mass Carrier Migration |  | hidden |  | url → /TPLPolicy/SearchCarrierMigration |
| [ctl:button-non-covered-code] | button | Non-Covered Code |  | hidden |  |  |
| [ctl:link-non-covered-code] | link | Non-Covered Code |  | hidden |  | url → /TPLPolicy/SearchNonCoveredCode |
| [ctl:button-member-3] | button | Member |  | hidden |  |  |
| [ctl:link-member-3] | link | Member |  | hidden |  | url → /TPLPolicy/MemberSearch |
| [ctl:button-carrier-crosswalk-rule] | button | Carrier Crosswalk Rule |  | hidden |  |  |
| [ctl:link-carrier-crosswalk-rule] | link | Carrier Crosswalk Rule |  | hidden |  | url → /TPLPolicy/SearchCarrierCrossWalkRule |
| [ctl:button-tpl-policy-letters] | button | TPL Policy Letters |  | hidden |  |  |
| [ctl:link-tpl-policy-letters] | link | TPL Policy Letters |  | hidden |  | url → /TPLPolicy/SearchPolicyLetter |
| [ctl:button-member-quick-view] | button | Member Quick View |  | hidden |  |  |
| [ctl:link-member-quick-view] | link | Member Quick View |  | hidden |  | url → /TPLPolicy/MemberQuickView |
| [ctl:button-tpl-hipp-search-hipp-average-exp] | button | TPL HIPP Search HIPP Average Expenditure |  | hidden |  |  |
| [ctl:link-tpl-hipp] | link | TPL HIPP |  | hidden |  | url → /TPLHIPP/Dashboard |
| [ctl:10696570-2868-46ac-9f81-476999e1fba3] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-search-hipp] | button | Search HIPP |  | hidden |  |  |
| [ctl:link-search-hipp] | link | Search HIPP |  | hidden |  | url → /TPLHIPP/SearchHIPP |
| [ctl:button-average-expenditure] | button | Average Expenditure |  | hidden |  |  |
| [ctl:link-average-expenditure] | link | Average Expenditure |  | hidden |  | url → /TPLHIPP/SearchAverageExpenditure |
| [ctl:button-task-management-dashboard-task-t] | button | Task Management Dashboard Task Template … |  | hidden |  |  |
| [ctl:link-task-management] | link | Task Management |  | hidden |  | url → /TaskManagement/Dashboard |
| [ctl:3985f0a8-8e1e-4847-bc53-f2d99740d82d] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-dashboard-7] | button | Dashboard |  | hidden |  |  |
| [ctl:link-dashboard-7] | link | Dashboard |  | hidden |  | url → /TaskManagement/Dashboard |
| [ctl:button-task-template] | button | Task Template |  | hidden |  |  |
| [ctl:link-task-template] | link | Task Template |  | hidden |  | url → /TaskManagement/SearchTaskTemplate |
| [ctl:button-task-list] | button | Task List |  | hidden |  |  |
| [ctl:link-task-list] | link | Task List |  | hidden |  | url → /TaskManagement/SearchTaskList |
| [ctl:button-link-configuration] | button | Link Configuration |  | hidden |  |  |
| [ctl:link-link-configuration] | link | Link Configuration |  | hidden |  | url → /TaskManagement/SearchLinkConfiguration |
| [ctl:button-routing-configuration] | button | Routing Configuration |  | hidden |  |  |
| [ctl:link-routing-configuration] | link | Routing Configuration |  | hidden |  | url → /TaskManagement/SearchRoutingConfiguration |
| [ctl:button-manage-user-association] | button | Manage User Association |  | hidden |  |  |
| [ctl:link-manage-user-association] | link | Manage User Association |  | hidden |  | url → /TaskManagement/SearchUserAssociation |
| [ctl:button-manage-user-schedule] | button | Manage User Schedule |  | hidden |  |  |
| [ctl:link-manage-user-schedule] | link | Manage User Schedule |  | hidden |  | url → /TaskManagement/SearchUserCapacity |
| [ctl:button-bulk-recall] | button | Bulk Recall |  | hidden |  |  |
| [ctl:link-bulk-recall] | link | Bulk Recall |  | hidden |  | url → /TaskManagement/SearchRecallTask |
| [ctl:button-7] | button |  |  | hidden |  | handlers jq:mouseover,jq:mousedown,jq:touchstart,jq:mouseout |
| [ctl:button-8] | button |  |  |  |  | handlers jq:pointerdown,jq:MSPointerDown,jq:touchstart,jq:click,jq:mousedown |
| [ctl:button-9] | button |  |  | hidden |  | handlers jq:mouseover,jq:mousedown,jq:touchstart,jq:mouseout |
| [ctl:activeModuleMenu] | button |  |  |  |  | handlers jq:mousewheel,jq:DOMMouseScroll,jq:keydown,jq:focus,jq:focusin |
| [ctl:activeModuleMenuFirstItem] | button | CLAIMS MANAGEMENT |  |  |  |  |
| [ctl:link-claims-management-2] | link | CLAIMS MANAGEMENT |  |  |  | url → /ClaimsManagement/Dashboard |
| [ctl:button-search-claims-2] | button | Search Claims |  | hidden |  |  |
| [ctl:link-search-claims-2] | link | Search Claims |  | hidden |  | url → /ClaimsManagement/SearchClaims |
| [ctl:button-pro-dur-2] | button | Pro DUR |  | hidden |  |  |
| [ctl:link-pro-dur-2] | link | Pro DUR |  | hidden |  | anchor |
| [ctl:button-claims-management-search-claims--2] | button | Claims Management Search Claims Pro DUR |  | hidden |  | handlers jq:mouseover,jq:mousedown,jq:touchstart,jq:mouseout |
| [ctl:mcbMenu] | button |  |  | hidden |  | handlers jq:pointerdown,jq:MSPointerDown,jq:touchstart,jq:click,jq:mousedown |
| [ctl:MCBMenu.Notes] | button | Notes |  | hidden |  |  |
| [ctl:Notes] | link | Notes |  | hidden |  | js |
| [ctl:MCBMenu.Mail] | button | Mail |  | hidden |  |  |
| [ctl:Mail] | link | Mail |  | hidden |  | js |
| [ctl:MCBMenu.Audit] | button | Audit |  | hidden |  |  |
| [ctl:Audit] | link | Audit |  | hidden |  | js |
| [ctl:MCBMenu.SetPanelTabs] | button | Set Panel Tabs |  | hidden |  |  |
| [ctl:link-set-panel-tabs] | link | Set Panel Tabs |  | hidden |  | js |
| [ctl:MCBMenu.MITASteps] | button | MITA Steps |  | hidden |  |  |
| [ctl:link-mita-steps] | link | MITA Steps |  | hidden |  | js |
| [ctl:MCBMenu.ReportsLetters] | button | Reports & Letters |  | hidden |  |  |
| [ctl:link-reports-letters] | link | Reports & Letters |  | hidden |  | js |
| [ctl:MCBMenu.RelatedPages] | button | Related Pages |  | hidden |  |  |
| [ctl:link-related-pages] | link | Related Pages |  | hidden |  | js |
| [ctl:MCBMenu.ViewData] | button | View Data |  | hidden |  |  |
| [ctl:link-view-data] | link | View Data |  | hidden |  | js |
| [ctl:MCBMenu.Reports] | button | Reports |  | hidden |  |  |
| [ctl:Reports] | link | Reports |  | hidden |  | js |
| [ctl:MCBMenu.PrintPreview] | button | Print Preview |  | hidden |  |  |
| [ctl:PrintPreview] | link | Print Preview |  | hidden |  | js |
| [ctl:MCBMenu.PageHelp] | button | Help |  | hidden |  |  |
| [ctl:Help] | link | Help |  | hidden |  | js |
| [ctl:MCBMenu.ReturnToProvider] | button | RTP |  | hidden |  |  |
| [ctl:RTP] | link | RTP |  | hidden |  | js |
| [ctl:button-help] | button | Help |  |  |  | tooltip "Help"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:auditHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-help-2] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:touchstart |
| [ctl:PlusSquareAudit] | button |  |  | hidden |  |  |
| [ctl:MinusSquareAudit] | button |  |  | hidden |  |  |
| [ctl:auditClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:mailHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-10] | button |  |  | hidden |  |  |
| [ctl:button-11] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquareMail] | button |  |  | hidden |  |  |
| [ctl:MinusSquareMail] | button |  |  | hidden |  |  |
| [ctl:mailClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-2] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-2] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:notesHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-12] | button |  |  | hidden |  |  |
| [ctl:button-13] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquareNotes] | button |  |  | hidden |  |  |
| [ctl:MinusSquareNotes] | button |  |  | hidden |  |  |
| [ctl:notesClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-3] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-3] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:printPreviewHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-14] | button |  |  | hidden |  |  |
| [ctl:button-15] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquarePrintPreview] | button |  |  | hidden |  |  |
| [ctl:MinusSquarePrintPreview] | button |  |  | hidden |  |  |
| [ctl:printPreviewClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-4] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-4] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:reportsHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-16] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquareReports] | button |  |  | hidden |  |  |
| [ctl:MinusSquareReports] | button |  |  | hidden |  |  |
| [ctl:reportsClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-5] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-5] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:button-17] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-18] | button |  |  | hidden |  |  |
| [ctl:button-19] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-6] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick |
| [ctl:button-open-in-separate-window-6] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:ExternalLinksClose] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:divExternalLinksBody] | button |  |  | hidden |  |  |
| [ctl:link-records-management-rm8] | link | Records Management (RM8) |  | hidden |  | js |
| [ctl:link-cms] | link | CMS |  | hidden |  | js |
| [ctl:link-gainwell] | link | Gainwell |  | hidden |  | js |
| [ctl:link-medicaid] | link | Medicaid |  | hidden |  | js |
| [ctl:extLinksCloseButton] | button | Close |  | hidden |  | handlers onclick,jq:blur |
| [ctl:ShowCoreBroadcastMsgBody] | button | Expand |  | hidden |  | tooltip "Expand"; handlers onclick,onkeypress,jq:click,jq:keypress,jq:keydown |
| [ctl:HideCoreBroadcastMsgBody] | button | Collapse |  | hidden |  | tooltip "Collapse"; handlers onclick,onkeypress,jq:click,jq:keypress,jq:keydown |
| [ctl:CloseBroadcastMsgPanel] | button | Close |  | hidden |  | tooltip "Close"; handlers jq:click,jq:keypress,jq:keydown,jq:mouseover,jq:mouseout |
| [ctl:curMsgButton] | button | Current Messages |  | hidden |  | handlers jq:click,jq:focus,jq:blur |
| [ctl:acknowledgedMsgButton] | button | Acknowledged Messages |  | hidden |  | handlers jq:click,jq:blur |
| [ctl:messagesCloseButton] | button | Close |  | hidden |  | handlers onclick,jq:focus,jq:keydown,jq:blur |
| [ctl:ShowFavoritesBody] | button | Expand |  | hidden |  | tooltip "Expand"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:HideFavoritesBody] | button | Collapse |  | hidden |  | tooltip "Collapse"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:FavoritesClose] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:ShowCoreContactUsBody] | button | Expand |  | hidden |  | tooltip "Expand"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:HideCoreContactUsBody] | button | Collapse |  | hidden |  | tooltip "Collapse"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:IntContactUsClose] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:intPortalContactUsCloseButton] | button | Close |  | hidden |  | handlers onclick,jq:blur |
| [ctl:text] | text |  |  | hidden |  | handlers jq:blur |
| [ctl:text-2] | text |  |  | hidden | type=password | handlers jq:blur |
| [ctl:button-close-7] | button | close |  | hidden |  | handlers jq:keypress,jq:click |
| [ctl:link-actions] | link | Actions |  |  |  | anchor |
| [ctl:link-create-new] | link | Create New |  |  |  | anchor |
| [ctl:link-search-2] | link | Search |  |  |  | anchor |
| [ctl:link-create-new-2] | link | Create New |  |  |  | anchor |
| [ctl:link-search-3] | link | Search |  |  |  | anchor |
| [ctl:link-create-new-3] | link | Create New |  |  |  | anchor |
| [ctl:link-search-4] | link | Search |  |  |  | anchor |
| [ctl:link-bookmarks] | link | Bookmarks |  |  |  | anchor |
| [ctl:link-glossary] | link | Glossary |  |  |  | anchor |
| [ctl:OverusePrecautionPanel] | button |  |  |  |  | handlers jq:click |
| [ctl:button-20] | button |  |  | hidden |  | handlers onclick,onkeypress |
| [ctl:button-close-8] | button | Close |  | hidden |  |  |
| [ctl:link-back-to-top] | link | Back to Top |  | hidden |  | anchor |
| [ctl:link-back-to-top-2] | link | Back to Top |  | hidden |  | anchor |
| [ctl:link-back-to-top-3] | link | Back to Top |  | hidden |  | anchor |
| [ctl:button-disclaimer] | button | Disclaimer |  |  |  | handlers onclick,onkeypress |
| [ctl:button-website-requirements] | button | Website Requirements |  |  |  | handlers onclick,onkeypress |
| [ctl:button-privacy-policy] | button | Privacy Policy |  |  |  | handlers onclick,onkeypress |
| [ctl:button-cookie-policy] | button | Cookie Policy |  |  |  | handlers onclick,onkeypress |
| [ctl:link-back-to-top-4] | link | Back to Top |  | hidden |  | anchor; tooltip "Back to Top"; handlers jq:click,jq:mouseover,jq:mouseout |

Full detail per control (computed style, selector, box, options, inline handlers): `capture/controls.json`.

## 6. Validation
No client-side validation rules found in the page. Server-side rules, if any, are only visible in the source.

## 7. Interaction styles (measured on the live page)
No hover/focus style changes measured.

Legacy CSS rules for states (`:hover :focus :active :disabled .aspNetDisabled …`) that apply to controls (full list: `capture/pseudo.json`):
- [ctl:link-messages], [ctl:link-external-links], [ctl:link-favorites], [ctl:link-contact-us], [ctl:link-my-account], [ctl:link-logout], [ctl:link-claims-management-2]: `.k-link, .k-link:hover { color: inherit; text-decoration: none; outline: 0px; cursor: pointer; }` `.k-link, .k-link:hover { color: inherit; text-decoration: none; outline: 0px; cursor: pointer; }` `a, a:link, a:hover, a:visited { background-color: transparent; color: var(--gw-color-neutral-8); }` `a:link, a:visited, a.common-page-link:link, a.common-page-link:visited { text-decoration: none; }`
- [ctl:AAGMenu.BroadcastMsg], [ctl:AAGMenu.ExternalLinks], [ctl:AAGMenu.Favorites], [ctl:AAGMenu.ContactUs], [ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:activeModuleMenuFirstItem]: `.k-menu:not(.k-context-menu) > .k-item:hover, .k-menu:not(.k-context-m… { color: var(--kendo-color-on-app-surface, #3d3d3d); }` `.k-menu:not(.k-context-menu) > .k-item:active, .k-menu:not(.k-context-… { color: var(--kendo-color-primary-on-surface, #ff6358); }` `.k-menu:not(.k-context-menu) > .k-item:focus, .k-menu:not(.k-context-m… { box-shadow: inset 0 0 0 2px var(--kendo-color-border-alt, rgba(0, 0, 0, 0.16)); }` `.k-menu:not(.k-context-menu) > .k-item:hover, .k-menu:not(.k-context-m… { color: var(--kendo-color-on-app-surface, #3d3d3d); }`
- [ctl:link-client-logo], [ctl:link-actions], [ctl:link-create-new], [ctl:link-search-2], [ctl:link-create-new-2], [ctl:link-search-3], [ctl:link-create-new-3], [ctl:link-search-4], [ctl:link-bookmarks], [ctl:link-glossary], [ctl:button-disclaimer], [ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy]: `a, a:link, a:hover, a:visited { background-color: transparent; color: var(--gw-color-neutral-8); }` `a:link, a:visited, a.common-page-link:link, a.common-page-link:visited { text-decoration: none; }` `a:focus, a.common-page-link:focus { outline: var(--widget-focus-outline); box-shadow: var(--widget-focus-box-shadow) !important; }` `a:hover, a.common-page-link:hover { text-decoration: underline; }`
- [ctl:button-medicaid-management-solutions]: `.app-title:focus { outline: rgb(46, 171, 255) solid 0.2rem; }`
- [ctl:button-main-menu-2]: `.hamburger i:focus { outline: var(--widget-focus-outline); outline-offset: 0px; box-shadow: var(--widget-focus-box-shadow) !important; }`
- [ctl:button]: `.system-name:focus { outline: rgb(46, 171, 255) solid 0.2rem; }`

## 8. Behavior (observed transitions, EARS drafts)
Each was performed on the live page from a fresh load. Effects are relative to the state right before the last action.

No behavior observed (static page, or everything is server-side).

## 9. Server round-trips and requests
None observed.

## 10. Navigation (links are recorded, never followed)
No navigation.

## 11. Dialogs, popups, downloads, script errors
None.

## 12. Hidden at load, never revealed by any action
None.

## 13. Not covered by this capture
- Actions run: 0; depth ≤ undefined; 0s.
- Never observable from a browser: server-side rules, role/permission-based visibility, controls with Visible="false" (not rendered at all), what blocked requests would have done.

## 14. Page scripts, styles and platform details
- `js/inline-1.js`
- `js/inline-2.js`
- `js/inline-3.js`
- `js/inline-4.js`
- `js/inline-5.js`
- `js/inline-6.js`: displayPageLevelHelp
- `js/inline-7.js`
- `js/inline-8.js`
- `js/inline-9.js`
- `js/bundles/app__9da9877b.js`: populateRedactionWidget, d, screenRotation, adjustStepperSteps, ExpandHelpItem, ExpandItem, CollapseHelpItem, CollapseItem, initializeContentPanels, togglePanelExpandCollapse, expandCollapseAction, expandAllAction, collapseAllAction, expandAllPanel, collapseAllPanel, expandPanel, collapsePanel, postSlideUpAndSlideDown, closeAction, changeBgColor, showLoadingDialog, hideLoadingDialog, syncContentLoading, syncContentLoaded, addSpecialMessage …
- `js/bundles/vendor__f7304116.js` (7212 KB bundle)
- `js/Scripts/hp.ua3.core.atAGlance__884a35a7.js`: toggleVisibilityStyle, hideExternalPortalMenusDiv, closeMobileNav, disableBg, getLanguage, onLanguagesClose, getFavorites, onLoadFavoritesContentSuccess, reloadFavorites, onReloadFavoritesContentSuccess, getContactUs, onLoadContactUsContentSuccess, getLogin, onLoadLoginContentSuccess, getBroadcastMsg, onLoadBroadcastMsgContentSuccess, refreshFavoritesContent, onRefreshFavoritesContentSuccess, chkBroadcastMsgTab, googleSearch_onClick, googleSearchMobile_onClick, allResult, setUpAtAGlanceTabbingHandlers, messagesClose, extLinksClose …
- `js/Scripts/hp.ua3.core.mainMenu__884a35a7.js`: openMainMenu, closeMainMenu
- `js/Scripts/hp.ua3.core.moduleContentPanels__884a35a7.js`: getAudit, getMail, getNotes, getPrintPreview, getReports, getReturnToProvider, loadPanelContent, toggleVisibility, resetActiveMCB, setActiveMCB, setHelpIcon, getHelpNodeValue, closeMCBPanel, openPopupInNewWindow, popupCenteredHelpWindow
- `js/Scripts/ClaimsManagement/hp.ua3.claimsManagement.proDURDashBoard__884a35a7.js`
- `js/Scripts/Kendo/Cultures/kendo.culture.en-US.min__884a35a7.js`
- `js/Scripts/Kendo/Messages/kendo.messages.en-US.min__884a35a7.js`

## 15. Motion (what moves, measured on the live page)
The page was warmed up, then sampled for 0s. Setup comes from the page itself (library config, CSS), speed and rhythm from measurement. Every entry has an id; the spec must cite each as `[M01]` in its Motion section.

Nothing moved or animated.

Transitions (applied when an element changes state, e.g. hover; informational, not cited):
| property | duration | easing | delay | elements | e.g. |
|---|---|---|---|---|---|
| opacity | 0.5s | ease | 0s | 55 | `#ProDURdashBoard > div:nth-of-type(3) > div > div:nth-of-typ…` |
| color, background-color, border-color, box-shadow | 0.15s, 0.15s, 0.15s, 0.15s | cubic-bezier(0, 0, 0.58, 1), cubic-bezie… | 0s, 0s, 0s, 0s | 7 | `#AAGMenu\.BroadcastMsg` |
| color, background-color, border-color, box-shadow,… | 0.15s, 0.15s, 0.15s, 0.15s, 0.15s | cubic-bezier(0, 0, 0.58, 1), cubic-bezie… | 0s, 0s, 0s, 0s, 0s | 3 | `#extLinksCloseButton` |
| transform | 0.2s | linear | 0s | 1 | `#pageHeader` |

Freeze state used for every picture: {"swiper":0,"slick":0,"owl":0,"animations":0,"clock":"paused","stillMoving":0}. A non-zero stillMoving means JS-driven motion the fake clock could not stop.
Full detail (keyframe lists of running animations, every sampled mover): `motion.json`.

## 18. Provider kit harvest (kit/screen.json)

Read from Kendo 2026.1.415 on the live page. The kit (src/kit) rebuilds every widget below: cite each as [kit:<id>].

- Title bar: module "?", title "Pro DUR"
- Actions: none
- No Search on this screen
- Side menu (shell, built by the kit): 181 links; opens by class display-flex + backdrop div.disabled-backdrop; closes by its X or a menu link (not Escape, not the backdrop)
