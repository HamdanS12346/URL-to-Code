# FACTS — ffxfer-index-v1/file-transfer-tracking

Generated from a Playwright capture of the live page. Deterministic: nothing here is inferred. Read this first, then `content.md`.
Cite ids exactly as written: `[ctl:<key>]` controls, `[T07]` behaviors, `[val:<id>]` validators, `[shot:N]` your screenshot N, `[asset:<path>]` files.
All sizes are CSS px (screenshot px ÷ dpr).

## 1. Page
| | |
|---|---|
| URL | https://uximc.mms.tst.pgwcloud.net/FileTransfer/SearchFileTransferTracking |
| Title | File Transfer Tracking |
| Built with | mvcUnobtrusive, jquery 3.7.1 |
| Doctype / mode | <!DOCTYPE html> / CSS1Compat |
| Viewport | 1920×1080 CSS px @ dpr 1 |
| Document | 1920×1080 CSS px |
| Language / charset | en / UTF-8 |
| Favicon | - |

**Reference picture made by the tool** (page warmed up and frozen: lazy images loaded, counters finished, carousels at slide 0): `reference.png`, 1920×1080 px @ dpr 1, 1 shots pasted at their exact scroll positions.
Look at `sections/` first: one full-resolution crop per band. They are far sharper than the whole-page picture. Cite one as `[asset:sections/<file>]`.

| # | crop file(s) | y | h (CSS px) | element |
|---|---|---|---|---|
| 1 | `sections/01-file-transfer-tracking.png` | 62 | 77 | div.menu |
| 2 | `sections/02-pagebody.png` | 139 | 628 | div#pageBody.row |
| 3 | `sections/03-disclaimer-the-website-is-prov.png` | 767 | 119 | footer |

The page as a self-contained copy: `snapshot/rendered.html` (the DOM after its scripts ran, scripts removed, original class names) and `snapshot/used.css` (only the CSS rules this page uses, hover/focus/::before and media queries included). `snapshot/fidelity/report.json` says how closely that copy, rendered offline from the saved assets, matches the reference.

## 2. Design tokens (computed, weighted by use)
| token | values (weight) |
|---|---|
| font families | `Arial` (5036)<br>`Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` (3792)<br>`Arial, sans-serif` (3443)<br>`"Times New Roman"` (367)<br>`Arial, FontAwesome, sans-serif` (89)<br>`"Poppins Bold", Arial, Helvetica, sans-serif` (66) |
| size / weight / line-height | `14px / 400 / lh 14px` (5225)<br>`16px / 400 / lh 25px` (3318)<br>`14px / 700 / lh 20px` (2872)<br>`14px / 700 / lh 14px` (244)<br>`16px / 700 / lh 22.8571px` (156)<br>`16px / 400 / lh 21px` (138)<br>`16px / 700 / lh 18px` (125)<br>`14px / 400 / lh 20px` (112)<br>`16px / 400 / lh 21.44px` (104)<br>`12px / 400 / lh 17.1429px` (102)<br>`12px / 400 / lh 32px` (83)<br>`16px / 400 / lh 40px` (70) |
| text colors | `rgb(61, 61, 61)` (5468)<br>`rgb(43, 58, 68)` (3706)<br>`rgb(255, 255, 255)` (2872)<br>`rgb(0, 0, 0)` (500)<br>`rgb(0, 98, 255)` (138)<br>`rgb(87, 87, 87)` (113)<br>`rgb(48, 179, 254)` (29)<br>`rgb(203, 26, 198)` (18)<br>`rgb(90, 105, 120)` (17)<br>`rgb(51, 51, 51)` (14) |
| backgrounds | `rgb(255, 255, 255)` (2494)<br>`rgb(43, 58, 68)` (279)<br>`rgb(250, 250, 250)` (89)<br>`rgb(0, 238, 174)` (61)<br>`rgb(48, 179, 254)` (4)<br>`rgb(38, 143, 203)` (4) |
| borders | `1px solid rgba(0, 0, 0, 0)` (156)<br>`1px solid rgb(90, 105, 120)` (18)<br>`1px solid rgb(255, 255, 255)` (12)<br>`1px solid rgb(206, 212, 218)` (9)<br>`1px solid rgb(222, 226, 230)` (4)<br>`1px solid rgb(0, 98, 255)` (3)<br>`1px solid rgb(67, 119, 137)` (3)<br>`1px solid rgb(38, 143, 203)` (1) |
| radii | `2.5px` (159)<br>`5px` (19)<br>`4px` (15)<br>`10px 10px 0px 0px` (8)<br>`9px` (6)<br>`0px 0px 9px 9px` (6) |
| body | fontFamily: Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome; fontSize: 14px; lineHeight: 14px; color: rgb(51, 51, 51); backgroundColor: rgb(255, 255, 255); margin: 0px; padding: 62px 0px 0px |
| html | background rgba(0, 0, 0, 0); font-size 10px |
| web fonts loaded | Font Awesome 6 Pro 900 normal, Poppins normal normal, Poppins Bold normal normal |

## 3. Layout sections (top level, document order)
| # | element | box x,y,w,h | in shots | own style | first text | controls |
|---|---|---|---|---|---|---|
| 1 | div#pageHeader.header {pageHeader} | 0,0,1920,62 |  | backgroundColor: rgb(43, 58, 68); position: fixed | Medicaid Management Solutions | 18 |
| 2 | div.menu {navigation-file-transfer-services} | 0,62,1920,32 |  | backgroundColor: rgb(0, 238, 174) | File Transfer Services | 3 |
| 3 | div#mcbRowBorder.row {mcbRowBorder} | 0,94,1920,45 |  | borderBottom: 1px solid rgb(179, 179, 179); display: flex |  | 1 |
| 4 | div.row | 0,139,1920,0 |  |  |  | 0 |
| 5 | div.row | 0,139,1920,0 |  |  |  | 0 |
| 6 | div#pageBody.row {pageBody} | 0,139,1920,628 |  |  | Search Criteria | 35 |
| 7 | footer {contentinfo} | 0,767,1920,119 |  |  | Disclaimer | 0 |

Exact per-element boxes and style deltas: `capture/dom.json` (`box` = [x, y, w, h] CSS px, `s` = style that differs from the parent).

## 4. Assets (use these files, never redraw them)
| file (under capture/) | used as | shown at (CSS) | natural px |
|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | img | 117×57 | 169×82 |
| `assets/_svg/svg-1.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-2.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-3.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-4.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-5.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-6.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-7.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-8.svg` | inline svg | 18×16 |  |

Fonts: `assets/fonts/Poppins.woff` (/fonts/Poppins.woff), `assets/webfonts/fa-solid-900.woff2` (/webfonts/fa-solid-900.woff2), `assets/fonts/Poppins-Bold.woff` (/fonts/Poppins-Bold.woff)
Stylesheets (legacy CSS, verbatim): `assets/bundles/appcss__dc8bcbe2.css`, `assets/bundles/vendorcss__75ac4b06.css`, `assets/_long/deb23c03e2505ea9.css`
All downloaded files: `capture/assets/index.json` (16).

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
| [ctl:7ca049f3-a71a-44fa-8ced-8045dd98dbb8] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:9d25f8ba-7e38-486c-a910-71598efac897] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:3c2fb5e0-d925-4c5b-9ae0-de80da61abc4] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-search-claims] | button | Search Claims |  | hidden |  |  |
| [ctl:link-search-claims] | link | Search Claims |  | hidden |  | url → /ClaimsManagement/SearchClaims |
| [ctl:button-pro-dur] | button | Pro DUR |  | hidden |  |  |
| [ctl:link-pro-dur] | link | Pro DUR |  | hidden |  | url → /ProDUR/ProDURDashBoard |
| [ctl:button-drug-rebate-dashboard-labeler-nd] | button | Drug Rebate Dashboard Labeler NDC Claim … |  | hidden |  |  |
| [ctl:link-drug-rebate] | link | Drug Rebate |  | hidden |  | url → /DrugRebate/Dashboard |
| [ctl:c1b952e8-ad7e-492e-bf9f-85d63703b257] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:89db0427-3813-454b-81c2-fcede5d46a6e] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-page-elements-widgets] | button | Page Elements / Widgets |  | hidden |  |  |
| [ctl:link-page-elements-widgets] | link | Page Elements / Widgets |  | hidden |  | url → /Employee/UIExamples |
| [ctl:button-file-transfer-services-file-tran] | button | File Transfer Services File Transfer Con… |  | hidden |  |  |
| [ctl:f58d116e-6f31-4676-b321-0887278c9478] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-file-transfer-configuration] | button | File Transfer Configuration |  | hidden |  |  |
| [ctl:link-file-transfer-configuration] | link | File Transfer Configuration |  | hidden |  | url → /FileTransfer/SearchSourceLocations |
| [ctl:button-file-transfer-tracking] | button | File Transfer Tracking |  | hidden |  |  |
| [ctl:link-file-transfer-tracking] | link | File Transfer Tracking |  | hidden |  | anchor |
| [ctl:button-ftp-server-credentials] | button | FTP Server Credentials |  | hidden |  |  |
| [ctl:link-ftp-server-credentials] | link | FTP Server Credentials |  | hidden |  | url → /FileTransfer/SearchFTPServerCredentials |
| [ctl:button-integration-event-to-file-query-] | button | Integration Event To File Query Builder … |  | hidden |  |  |
| [ctl:link-integration] | link | Integration |  | hidden |  | url → /Integration/Dashboard |
| [ctl:a4febc6a-9f62-44a8-b8cd-f98cd8596693] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:92f05e18-53ba-4bef-b6c9-f6964b13536d] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:50fc1974-9b73-45d4-9ad8-06c81d539605] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:414e9498-43f1-4686-9aad-0a17331daa3a] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:09963d64-bcfa-4ea2-be24-fd3227ccae5d] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:ba44d88c-fbc1-45b2-9a18-1df4988266ea] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:0b78879e-b7d5-4e02-9923-3f2fe84fbe0d] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:997231a6-5b34-44b3-a38f-c10fae2b9c78] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:bdd19f76-5fbe-4a44-982a-766a8b6faa23] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:30eef9e9-3abf-4d77-8bc6-171d9165907d] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:2fd33835-119a-4184-a56d-a78a11a3ec19] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:c7d3587d-513d-428b-b568-9689c4801b8b] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-search-hipp] | button | Search HIPP |  | hidden |  |  |
| [ctl:link-search-hipp] | link | Search HIPP |  | hidden |  | url → /TPLHIPP/SearchHIPP |
| [ctl:button-average-expenditure] | button | Average Expenditure |  | hidden |  |  |
| [ctl:link-average-expenditure] | link | Average Expenditure |  | hidden |  | url → /TPLHIPP/SearchAverageExpenditure |
| [ctl:button-task-management-dashboard-task-t] | button | Task Management Dashboard Task Template … |  | hidden |  |  |
| [ctl:link-task-management] | link | Task Management |  | hidden |  | url → /TaskManagement/Dashboard |
| [ctl:92c6cdc7-d99c-4be9-89ce-d13b5a7457a4] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:activeModuleMenuFirstItem] | button | FILE TRANSFER SERVICES |  |  |  |  |
| [ctl:button-file-transfer-configuration-2] | button | File Transfer Configuration |  | hidden |  |  |
| [ctl:link-file-transfer-configuration-2] | link | File Transfer Configuration |  | hidden |  | url → /FileTransfer/SearchSourceLocations |
| [ctl:button-file-transfer-tracking-2] | button | File Transfer Tracking |  | hidden |  |  |
| [ctl:link-file-transfer-tracking-2] | link | File Transfer Tracking |  | hidden |  | anchor |
| [ctl:button-ftp-server-credentials-2] | button | FTP Server Credentials |  | hidden |  |  |
| [ctl:link-ftp-server-credentials-2] | link | FTP Server Credentials |  | hidden |  | url → /FileTransfer/SearchFTPServerCredentials |
| [ctl:button-10] | button |  |  | hidden |  | handlers jq:mouseover,jq:mousedown,jq:touchstart,jq:mouseout |
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
| [ctl:button-11] | button |  |  | hidden |  |  |
| [ctl:button-12] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquareMail] | button |  |  | hidden |  |  |
| [ctl:MinusSquareMail] | button |  |  | hidden |  |  |
| [ctl:mailClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-2] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-2] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:notesHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-13] | button |  |  | hidden |  |  |
| [ctl:button-14] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquareNotes] | button |  |  | hidden |  |  |
| [ctl:MinusSquareNotes] | button |  |  | hidden |  |  |
| [ctl:notesClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-3] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-3] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:printPreviewHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-15] | button |  |  | hidden |  |  |
| [ctl:button-16] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquarePrintPreview] | button |  |  | hidden |  |  |
| [ctl:MinusSquarePrintPreview] | button |  |  | hidden |  |  |
| [ctl:printPreviewClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-4] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-4] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:reportsHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-17] | button |  |  | hidden |  | handlers jq:touchstart |
| [ctl:PlusSquareReports] | button |  |  | hidden |  |  |
| [ctl:MinusSquareReports] | button |  |  | hidden |  |  |
| [ctl:reportsClose] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-5] | button | Close |  | hidden |  | tooltip "Close" |
| [ctl:button-open-in-separate-window-5] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:button-18] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-19] | button |  |  | hidden |  |  |
| [ctl:button-20] | button |  |  | hidden |  | handlers jq:click,jq:keypress |
| [ctl:button-close-6] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick |
| [ctl:button-open-in-separate-window-6] | button | Open in separate window |  | hidden |  | handlers onclick |
| [ctl:ExternalLinksClose] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:divExternalLinksBody] | button |  |  | hidden |  |  |
| [ctl:link-records-management-rm8] | link | Records Management (RM8) |  | hidden |  | js |
| [ctl:link-cms] | link | CMS |  | hidden |  | js |
| [ctl:link-gainwell] | link | Gainwell |  | hidden |  | js |
| [ctl:link-medicaid] | link | Medicaid |  | hidden |  | js |
| [ctl:extLinksCloseButton] | button | Close |  | hidden |  | handlers onclick,jq:keypress,jq:blur |
| [ctl:ShowCoreBroadcastMsgBody] | button | Expand |  | hidden |  | tooltip "Expand"; handlers onclick,onkeypress,jq:click,jq:keypress,jq:keydown |
| [ctl:HideCoreBroadcastMsgBody] | button | Collapse |  | hidden |  | tooltip "Collapse"; handlers onclick,onkeypress,jq:click,jq:keypress,jq:keydown |
| [ctl:CloseBroadcastMsgPanel] | button | Close |  | hidden |  | tooltip "Close"; handlers jq:click,jq:keypress,jq:keydown,jq:mouseover,jq:mouseout |
| [ctl:curMsgButton] | button | Current Messages |  | hidden |  | handlers jq:click,jq:focus,jq:blur |
| [ctl:acknowledgedMsgButton] | button | Acknowledged Messages |  | hidden |  | handlers jq:click,jq:blur |
| [ctl:messagesCloseButton] | button | Close |  | hidden |  | handlers onclick,jq:focus,jq:keydown,jq:keypress,jq:blur |
| [ctl:ShowFavoritesBody] | button | Expand |  | hidden |  | tooltip "Expand"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:HideFavoritesBody] | button | Collapse |  | hidden |  | tooltip "Collapse"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:FavoritesClose] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:ShowCoreContactUsBody] | button | Expand |  | hidden |  | tooltip "Expand"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:HideCoreContactUsBody] | button | Collapse |  | hidden |  | tooltip "Collapse"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:IntContactUsClose] | button | Close |  | hidden |  | tooltip "Close"; handlers onclick,onkeypress,jq:mouseover,jq:mouseout |
| [ctl:intPortalContactUsCloseButton] | button | Close |  | hidden |  | handlers onclick,jq:keypress,jq:blur |
| [ctl:text] | text |  |  | hidden |  | handlers jq:keypress,jq:blur |
| [ctl:text-2] | text |  |  | hidden | type=password | handlers jq:keypress,jq:blur |
| [ctl:button-close-7] | button | close |  | hidden |  | handlers jq:keypress,jq:click |
| [ctl:button-21] | button |  |  |  |  | handlers jq:click,jq:keypress |
| [ctl:button-collapse] | button | Collapse |  |  |  | tooltip "Collapse" |
| [ctl:FileIdHelp] | button | HELP |  |  |  | tooltip "File ID"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:FileId] | text | File ID File ID |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:focus |
| [ctl:FileNameHelp] | button | HELP |  |  |  | tooltip "File Name"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:FileName] | text | File Name File Name |  |  | maxlength 100; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:FileStatusHelp] | button | HELP |  |  |  | tooltip "File Status"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-file-status-file-status] | combobox | File Status File Status |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select] | button | select |  |  |  | handlers jq:blur |
| [ctl:FileStatusList] | text | FileStatusList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:DirectionHelp] | button | HELP |  |  |  | tooltip "Direction"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-direction-direction] | combobox | Direction Direction |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-2] | button | select |  |  |  | handlers jq:blur |
| [ctl:DirectionList] | text | DirectionList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:TransportTypeHelp] | button | HELP |  |  |  | tooltip "Transport Type"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-transport-type-transport-type] | combobox | Transport Type Transport Type |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-3] | button | select |  |  |  | handlers jq:blur |
| [ctl:TransportTypeList] | text | TransportTypeList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:SourceLocationIdHelp] | button | HELP |  |  |  | tooltip "Source Location"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-source-location-source-location] | combobox | Source Location Source Location |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-4] | button | select |  |  |  | handlers jq:blur |
| [ctl:SourceLocation] | text | SourceLocation |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:TradingPartnerIdHelp] | button | HELP |  |  |  | tooltip "Trading Partner ID"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:TradingPartnerId] | text | Trading Partner ID Trading Partner ID |  |  | maxlength 25; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:FromDateHelp] | button | HELP |  |  |  | tooltip "From Date"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:FromDate] | text | From Date From Date |  |  | data-val: date,datetime | handlers jq:keydown,jq:focus,jq:focusout,jq:keypress,jq:change |
| [ctl:button-open-the-date-view] | button | Open the date view |  |  |  | handlers jq:mousedown,jq:click,jq:blur |
| [ctl:button-open-the-time-view] | button | Open the time view |  |  |  | handlers jq:mousedown,jq:click,jq:blur |
| [ctl:ToDateHelp] | button | HELP |  |  |  | tooltip "To Date"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ToDate] | text | To Date To Date |  |  | data-val: date,datetime | handlers jq:keydown,jq:focus,jq:focusout,jq:keypress,jq:change |
| [ctl:button-open-the-date-view-2] | button | Open the date view |  |  |  | handlers jq:mousedown,jq:click,jq:blur |
| [ctl:button-open-the-time-view-2] | button | Open the time view |  |  |  | handlers jq:mousedown,jq:click,jq:blur |
| [ctl:FromSizeHelp] | button | HELP |  |  |  | tooltip "From Size (KB)"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-from-size-kb-from-size-kb] | text | From Size (KB) From Size (KB) |  |  | data-val: data-validate | handlers jq:focus,jq:keypress,jq:blur |
| [ctl:FromSize] | text | From Size (KB) |  | hidden | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers jq:focusout,jq:keydown,jq:keyup,jq:paste,jq:input |
| [ctl:button-increase-value] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:ToSizeHelp] | button | HELP |  |  |  | tooltip "To Size (KB)"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-to-size-kb-to-size-kb] | text | To Size (KB) To Size (KB) |  |  | data-val: data-validate | handlers jq:focus,jq:keypress,jq:blur |
| [ctl:ToSize] | text | To Size (KB) |  | hidden | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers jq:focusout,jq:keydown,jq:keyup,jq:paste,jq:input |
| [ctl:button-increase-value-2] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-2] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:prevButton] | button | Prev |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:resetButton] | button | Reset |  |  |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt1Button] | button | Alt1 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt4Button] | button | Alt4 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt5Button] | button | Alt5 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt6Button] | button | Alt6 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt7Button] | button | Alt7 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt8Button] | button | Alt8 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:printButton] | button | Print |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt2Button] | button | Alt2 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt3Button] | button | Alt3 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:cancelButton] | button | Cancel |  |  |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:nextButton] | button | Search |  |  |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:button-22] | button |  |  | hidden |  | handlers jq:scroll,jq:mousedown,jq:touchstart,jq:click |
| [ctl:button-23] | button |  |  | hidden |  | handlers jq:mousedown,jq:focus,jq:focusout,jq:keydown |
| [ctl:f3ed688e-566e-470c-9fde-62329e88eed5] | button |  |  | hidden |  | handlers jq:click |
| [ctl:0997f373-d570-44e6-8507-be69d970b0fa] | button | File ID |  | hidden |  | handlers jq:click |
| [ctl:de2d2f33-4f97-420a-894d-d7032470aa22] | button | File Name |  | hidden |  | handlers jq:click |
| [ctl:33c18bba-672b-4f5c-a678-284e2b89f300] | button | File Status |  | hidden |  | handlers jq:click |
| [ctl:d5eeb097-adaa-4266-8342-29eb6d4268c4] | button | Transport Type |  | hidden |  | handlers jq:click |
| [ctl:e5379e15-a471-469d-849f-63211f744f60] | button | Size (KB) |  | hidden |  | handlers jq:click |
| [ctl:893b2518-3817-4f0c-9725-32546d5cd688] | button | Create Date |  | hidden |  | handlers jq:click |
| [ctl:30d5ec2d-f9af-4ec1-bff3-adabc8365ac4] | button |  |  | hidden |  | handlers jq:click,jq:keydown,jq:mousedown,jq:focus,jq:focusout |
| [ctl:6c7f7a36-4a36-4eba-afa0-04dd566e1c91] | button | Page navigation, page 0 of 0 |  | hidden |  | handlers jq:change,jq:click,jq:keydown,jq:focusout,jq:focusin |
| [ctl:button-go-to-the-first-page] | button | Go to the first page |  | hidden |  | tooltip "Go to the first page"; handlers jq:blur |
| [ctl:button-go-to-the-previous-page] | button | Go to the previous page |  | hidden |  | tooltip "Go to the previous page"; handlers jq:blur |
| [ctl:button-page-0] | button | Page 0 |  | hidden |  | handlers jq:blur |
| [ctl:button-go-to-the-next-page] | button | Go to the next page |  | hidden |  | tooltip "Go to the next page"; handlers jq:blur |
| [ctl:button-go-to-the-last-page] | button | Go to the last page |  | hidden |  | tooltip "Go to the last page"; handlers jq:blur |
| [ctl:text-page] | text | Page |  | hidden | data-val: data-validate | handlers jq:focus,jq:blur |
| [ctl:text-page-2] | text | Page |  | hidden |  | handlers jq:focusout,jq:keydown,jq:keyup,jq:paste,jq:input |
| [ctl:link-refresh] | link | Refresh |  | hidden |  | url → /api/FileTransfer/SearchFileTransferTracking/; tooltip "Refresh"; handlers jq:mouseover,jq:mouseout |
| [ctl:combobox-page-sizes-drop-down] | combobox | Page sizes drop down |  | hidden |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-5] | button | select |  | hidden |  | handlers jq:blur |
| [ctl:select-page-sizes-drop-down] | select | Page sizes drop down | 10 | hidden | type=select-one | handlers jq:focus,jq:blur; 3 options |
| [ctl:button-24] | button |  |  | hidden |  | handlers onclick,onkeypress |
| [ctl:button-close-8] | button | Close |  | hidden |  |  |
| [ctl:link-back-to-top] | link | Back to Top |  | hidden |  | anchor |
| [ctl:link-back-to-top-2] | link | Back to Top |  | hidden |  | anchor |
| [ctl:link-back-to-top-3] | link | Back to Top |  | hidden |  | anchor |
| [ctl:button-disclaimer] | button | Disclaimer |  |  |  | handlers onclick,onkeypress |
| [ctl:button-website-requirements] | button | Website Requirements |  |  |  | handlers onclick,onkeypress |
| [ctl:button-privacy-policy] | button | Privacy Policy |  |  |  | handlers onclick,onkeypress |
| [ctl:button-cookie-policy] | button | Cookie Policy |  |  |  | handlers onclick,onkeypress |
| [ctl:link-back-to-top-4] | link | Back to Top |  | hidden |  | anchor; tooltip "Back to Top"; handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-25] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:FileStatusList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:c078f2ef-64c3-4486-98a1-e90401e012d7] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-complete] | button | Complete |  | hidden |  |  |
| [ctl:button-error] | button | Error |  | hidden |  |  |
| [ctl:button-transferring] | button | Transferring |  | hidden |  |  |
| [ctl:button-select-a-value-completeerrortran] | button | select a value...CompleteErrorTransferri… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:DirectionList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:edab9766-f7cf-4f60-aaf4-f4114f06e4e2] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-inbound] | button | INBOUND |  | hidden |  |  |
| [ctl:button-outbound] | button | OUTBOUND |  | hidden |  |  |
| [ctl:button-select-a-value-inboundoutboundno] | button | select a value...INBOUNDOUTBOUNDNo Data … |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:TransportTypeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:44aad5b9-ca75-4eee-bf91-adac1b099e7a] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-ftp] | button | FTP |  | hidden |  |  |
| [ctl:button-sftp] | button | SFTP |  | hidden |  |  |
| [ctl:button-unc] | button | UNC |  | hidden |  |  |
| [ctl:button-ftps] | button | FTPS |  | hidden |  |  |
| [ctl:button-select-a-value-ftpsftpuncftpsno-] | button | select a value...FTPSFTPUNCFTPSNo Data F… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:text-3] | text |  |  | hidden |  | handlers jq:keydown,jq:mousedown,jq:paste,jq:input |
| [ctl:SourceLocation-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:64cf3d49-0ca0-4cb5-815e-07fb4a5c275e] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-a6-123-43] | button | a6 - 123.43 |  | hidden |  |  |
| [ctl:button-admin-https-tenant2-fltest-mapsh] | button | Admin - https://tenant2-fltest.mapshc.co… |  | hidden |  |  |
| [ctl:button-amaro42925sftptosftp-amarocom-so] | button | Amaro42925SFTPToSFTP - /AmaroCom/SourceS… |  | hidden |  |  |
| [ctl:button-bug3197290commercial-fts-ranjan] | button | Bug3197290Commercial - /FTS/Ranjan |  | hidden |  |  |
| [ctl:button-chrometested-4] | button | chrometested - /4 |  | hidden |  |  |
| [ctl:button-config-addrs] | button | config - /Addrs |  | hidden |  |  |
| [ctl:button-config-add] | button | config - /add |  | hidden |  |  |
| [ctl:button-config-address] | button | config - /address |  | hidden |  |  |
| [ctl:button-config-address-2] | button | config - /address |  | hidden |  |  |
| [ctl:button-config-addrress] | button | config - /addrress |  | hidden |  |  |
| [ctl:button-config-3] | button | config - /3 |  | hidden |  |  |
| [ctl:button-configname-addresssuresh] | button | configname - /AddressSuresh |  | hidden |  |  |
| [ctl:button-configname-address] | button | configname - /address |  | hidden |  |  |
| [ctl:button-configname-address-2] | button | configname - /address |  | hidden |  |  |
| [ctl:button-configname-address-3] | button | configname - /address |  | hidden |  |  |
| [ctl:button-configname-address-4] | button | configname - /address |  | hidden |  |  |
| [ctl:button-configname-address-5] | button | configname - /address |  | hidden |  |  |
| [ctl:button-confignameaujx-sourceadd-shes] | button | ConfigNameAuJX - /SourceAdd - shes |  | hidden |  |  |
| [ctl:button-confignameclav-sourceadd-kyxq] | button | ConfigNameClAv - /SourceAdd - kYxq |  | hidden |  |  |
| [ctl:button-confignamecpby-sourceadd-hxfx] | button | ConfigNamecPby - /SourceAdd - HxFx |  | hidden |  |  |
| [ctl:button-confignamedctl-sourceadd-zxjc] | button | ConfigNamedCtL - /SourceAdd - zxJc |  | hidden |  |  |
| [ctl:button-confignamedgce-sourceadd-utqx] | button | ConfigNameDGcE - /SourceAdd - UTqX |  | hidden |  |  |
| [ctl:button-confignamedoir-sourceadd-efmi] | button | ConfigNamedOIR - /SourceAdd - efMI |  | hidden |  |  |
| [ctl:button-confignameekpg-sourceadd-osda] | button | ConfigNameEKPG - /SourceAdd - OsDa |  | hidden |  |  |
| [ctl:button-confignamefoxb-sourceadd-oppp] | button | ConfigNamefoXb - /SourceAdd - oPPp |  | hidden |  |  |
| [ctl:button-confignamefvqf-sourceadd-hfjh] | button | ConfigNameFVQf - /SourceAdd - HFJh |  | hidden |  |  |
| [ctl:button-confignameghsk-sourceadd-dpci] | button | ConfigNameGhSk - /SourceAdd - dPcI |  | hidden |  |  |
| [ctl:button-confignameglbc-sourceadd-kjrq] | button | ConfigNameGLbC - /SourceAdd - KjRQ |  | hidden |  |  |
| [ctl:button-confignamegmyo-sourceadd-lvtz] | button | ConfigNamegMYO - /SourceAdd - lvtZ |  | hidden |  |  |
| [ctl:button-confignamehwwg-sourceadd-tqon] | button | ConfigNamehwwG - /SourceAdd - TqOn |  | hidden |  |  |
| [ctl:button-confignameiadb-sourceadd-math] | button | ConfigNameIaDB - /SourceAdd - math |  | hidden |  |  |
| [ctl:button-confignamejzzd-sourceadd-tsnd] | button | ConfigNameJZzD - /SourceAdd - TSnd |  | hidden |  |  |
| [ctl:button-confignamekkhz-sourceadd-zzzy] | button | ConfigNamekkHZ - /SourceAdd - zzZy |  | hidden |  |  |
| [ctl:button-confignamemvqi-sourceadd-rped] | button | ConfigNameMvQI - /SourceAdd - Rped |  | hidden |  |  |
| [ctl:button-confignamenefl-sourceadd-pbyz] | button | ConfigNameNEfL - /SourceAdd - pbyZ |  | hidden |  |  |
| [ctl:button-confignamenetw-sourceadd-notq] | button | ConfigNameNEtW - /SourceAdd - noTq |  | hidden |  |  |
| [ctl:button-confignameohnl-sourceadd-htub] | button | ConfigNameOHNL - /SourceAdd - hTUb |  | hidden |  |  |
| [ctl:button-confignamepelm-sourceadd-jpfa] | button | ConfigNamePELM - /SourceAdd - JPfa |  | hidden |  |  |
| [ctl:button-confignamephql-sourceadd-clhv] | button | ConfigNamePhql - /SourceAdd - CLHv |  | hidden |  |  |
| [ctl:button-confignameplga-sourceadd-dagu] | button | ConfigNamePLGA - /SourceAdd - daGu |  | hidden |  |  |
| [ctl:button-confignamerfwl-sourceadd-iltg] | button | ConfigNameRFWl - /SourceAdd - Iltg |  | hidden |  |  |
| [ctl:button-confignamerrdw-sourceadd-ldpt] | button | ConfigNamerRdw - /SourceAdd - LDpt |  | hidden |  |  |
| [ctl:button-confignameruzq-sourceadd-vssd] | button | ConfigNameRUzQ - /SourceAdd - VsSD |  | hidden |  |  |
| [ctl:button-confignamerwdv-sourceadd-kkwf] | button | ConfigNameRWDv - /SourceAdd - kkwF |  | hidden |  |  |
| [ctl:button-confignamerxxv-sourceadd-axru] | button | ConfigNamerxXV - /SourceAdd - AxRU |  | hidden |  |  |
| [ctl:button-confignamesipj-sourceadd-envt] | button | ConfigNamesIpJ - /SourceAdd - envt |  | hidden |  |  |
| [ctl:button-confignameskxg-sourceadd-yatj] | button | ConfigNameskxg - /SourceAdd - yAtj |  | hidden |  |  |
| [ctl:button-confignamesuni-address] | button | confignamesuni - /address |  | hidden |  |  |
| [ctl:button-confignametaqz-sourceadd-ifxf] | button | ConfigNametAqZ - /SourceAdd - IFXF |  | hidden |  |  |
| [ctl:button-confignametetx-sourceadd-xedj] | button | ConfigNametETX - /SourceAdd - xEdJ |  | hidden |  |  |
| [ctl:button-confignametgwd-sourceadd-ffhv] | button | ConfigNameTgWd - /SourceAdd - ffHv |  | hidden |  |  |
| [ctl:button-confignameudqq-sourceadd-fcbd] | button | ConfigNameudqq - /SourceAdd - fCBD |  | hidden |  |  |
| [ctl:button-confignamevppn-sourceadd-ygjn] | button | ConfigNameVppN - /SourceAdd - YGJN |  | hidden |  |  |
| [ctl:button-confignamewels-sourceadd-idcb] | button | ConfigNameWELS - /SourceAdd - IDCb |  | hidden |  |  |
| [ctl:button-confignamewicw-sourceadd-rgsz] | button | ConfigNamewICw - /SourceAdd - rgSZ |  | hidden |  |  |
| [ctl:button-confignamewyiw-sourceadd-rvar] | button | ConfigNameWyiW - /SourceAdd - rvar |  | hidden |  |  |
| [ctl:button-confignamexgdm-sourceadd-xlbr] | button | ConfigNamexgdM - /SourceAdd - xLbr |  | hidden |  |  |
| [ctl:button-confignamexova-sourceadd-bydp] | button | ConfigNamexoVa - /SourceAdd - BydP |  | hidden |  |  |
| [ctl:button-confignameymfa-sourceadd-ehcf] | button | ConfigNameYmfa - /SourceAdd - ehCF |  | hidden |  |  |
| [ctl:button-confignameyuwb-sourceadd-gtsr] | button | ConfigNameyuWb - /SourceAdd - GTsr |  | hidden |  |  |
| [ctl:button-confignamezhet-sourceadd-vxet] | button | ConfigNameZhet - /SourceAdd - Vxet |  | hidden |  |  |
| [ctl:button-confignamezspz-sourceadd-wlxp] | button | ConfigNamezSPz - /SourceAdd - WLXP |  | hidden |  |  |
| [ctl:button-configsunil-address] | button | configSunil - /address |  | hidden |  |  |
| [ctl:button-doctesting-2] | button | doctesting - /2 |  | hidden |  |  |
| [ctl:button-firstsecond-4] | button | firstsecond - /4 |  | hidden |  |  |
| [ctl:button-fltestcomsce2-testlk-source-01] | button | FLTESTCOMSCE2 - /TestLK/Source_01 |  | hidden |  |  |
| [ctl:button-fltestcomsce3-testlk-source-01] | button | FLTESTCOMSCE3 - /TestLK/Source_01 |  | hidden |  |  |
| [ctl:button-foxtested-6] | button | foxtested - /6 |  | hidden |  |  |
| [ctl:button-fts-h] | button | fts - H:\\ |  | hidden |  |  |
| [ctl:button-fts-h-2] | button | fts - H:// |  | hidden |  |  |
| [ctl:button-fts-h-ftsfiles-gawru] | button | FTS - H:\FTSFiles\Gawru |  | hidden |  |  |
| [ctl:button-ftsftfer141comm-h-ftsfiles] | button | FTSFTFER141Comm - H:\FTSFiles |  | hidden |  |  |
| [ctl:button-gvtestftscomm-h-ftsfiles-gawru] | button | GvTestFTSComm - H:\FTSFiles\Gawru |  | hidden |  |  |
| [ctl:button-inxcom1-h-dtsfiles-source] | button | INXCom1 - H:\DTSFiles\Source |  | hidden |  |  |
| [ctl:button-inxcom2-h-dtsfiles-source] | button | INXCom2 - H:\DTSFiles\Source |  | hidden |  |  |
| [ctl:button-man-man] | button | man - /man |  | hidden |  |  |
| [ctl:button-pictoutbound-mapsftshrfs01-comme] | button | PICTOutBound - \\mapsftshrfs01\Commercia… |  | hidden |  |  |
| [ctl:button-rjcomm1-h-ranjan-source-commerci] | button | RJComm1 - H:\Ranjan\Source_Commercial_Bu… |  | hidden |  |  |
| [ctl:button-rjcomm123-h-ranjan-source-wrong-] | button | RJComm123 - H:\Ranjan\Source_Wrong_CM |  | hidden |  |  |
| [ctl:button-rjcommer12-rj-ranjsa-sour5748] | button | RJCommer12 - RJ:Ranjsa/Sour5748 |  | hidden |  |  |
| [ctl:button-sftpweeklyrun2-testlk-source-02] | button | SFTPWEEKLYRUN2 - /TestLK/Source_02 |  | hidden |  |  |
| [ctl:button-smktestfer-h-ftsfiles-sourcecomm] | button | smktestfer - H:\FTSFiles\SourceCommercia… |  | hidden |  |  |
| [ctl:button-test-test] | button | Test - /test |  | hidden |  |  |
| [ctl:button-test-wwwgoogle] | button | Test - /wwwgoogle |  | hidden |  |  |
| [ctl:button-test1345219162-test] | button | Test1345219162 - /test |  | hidden |  |  |
| [ctl:button-test7135518282-test] | button | Test7135518282 - /test |  | hidden |  |  |
| [ctl:button-tested-12] | button | tested - /12 |  | hidden |  |  |
| [ctl:button-testlvftcommercrenamedestin-h-ft] | button | TESTLVFTCommercrenamedestin - H:\FTSFile… |  | hidden |  |  |
| [ctl:button-testns052901-h-ftsfiles-05-29-so] | button | TestNS052901 - H:\FTSFiles\05-29\Source_… |  | hidden |  |  |
| [ctl:button-testns061002-h-ftsfiles-06-10-so] | button | TestNS061002 - H:\FTSFiles\06-10\Source_… |  | hidden |  |  |
| [ctl:button-testns0805c-h-ua3-fts-destinatio] | button | TestNS0805C - H:\UA3\FTS\Destination0802 |  | hidden |  |  |
| [ctl:button-testromi129regression-h-ftsfiles] | button | TestRomi129Regression - H:\FTSFiles\Sour… |  | hidden |  |  |
| [ctl:button-testwcf01-c-test] | button | TESTWCF01 - C:\Test |  | hidden |  |  |
| [ctl:button-testwcf02-c-test] | button | TESTWCF02 - C:\Test |  | hidden |  |  |
| [ctl:button-twtywf-jhbfd] | button | twtywf - /jhbfd |  | hidden |  |  |
| [ctl:button-uncmonthlyrun1-h-ftsfiles-12-23-] | button | UNCMONTHLYRUN1 - H:\FTSFiles\12-23\Sourc… |  | hidden |  |  |
| [ctl:button-updatedconfig02c-c] | button | UpdatedConfig02C - C:\ |  | hidden |  |  |
| [ctl:button-26] | button |  |  | hidden |  | handlers jq:mousedown,jq:mouseover,jq:wheel,jq:mouseout |
| [ctl:FromDate_timeview] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:FromDate_option_selected] | button | 12:00 AM |  | hidden |  |  |
| [ctl:button-12-00-am] | button | 12:00 AM |  | hidden |  | handlers jq:mousedown,jq:mouseover,jq:wheel,jq:mouseout |
| [ctl:ToDate_timeview] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:ToDate_option_selected] | button | 12:00 AM |  | hidden |  |  |
| [ctl:button-12-30-am] | button | 12:30 AM |  | hidden |  |  |
| [ctl:button-1-00-am] | button | 1:00 AM |  | hidden |  |  |
| [ctl:button-1-30-am] | button | 1:30 AM |  | hidden |  |  |
| [ctl:button-2-00-am] | button | 2:00 AM |  | hidden |  |  |
| [ctl:button-2-30-am] | button | 2:30 AM |  | hidden |  |  |
| [ctl:button-3-00-am] | button | 3:00 AM |  | hidden |  |  |
| [ctl:button-3-30-am] | button | 3:30 AM |  | hidden |  |  |
| [ctl:button-4-00-am] | button | 4:00 AM |  | hidden |  |  |
| [ctl:button-4-30-am] | button | 4:30 AM |  | hidden |  |  |
| [ctl:button-5-00-am] | button | 5:00 AM |  | hidden |  |  |
| [ctl:button-5-30-am] | button | 5:30 AM |  | hidden |  |  |
| [ctl:button-6-00-am] | button | 6:00 AM |  | hidden |  |  |
| [ctl:button-6-30-am] | button | 6:30 AM |  | hidden |  |  |
| [ctl:button-7-00-am] | button | 7:00 AM |  | hidden |  |  |
| [ctl:button-7-30-am] | button | 7:30 AM |  | hidden |  |  |
| [ctl:button-8-00-am] | button | 8:00 AM |  | hidden |  |  |
| [ctl:button-8-30-am] | button | 8:30 AM |  | hidden |  |  |
| [ctl:button-9-00-am] | button | 9:00 AM |  | hidden |  |  |
| [ctl:button-9-30-am] | button | 9:30 AM |  | hidden |  |  |
| [ctl:button-10-00-am] | button | 10:00 AM |  | hidden |  |  |
| [ctl:button-10-30-am] | button | 10:30 AM |  | hidden |  |  |
| [ctl:button-11-00-am] | button | 11:00 AM |  | hidden |  |  |
| [ctl:button-11-30-am] | button | 11:30 AM |  | hidden |  |  |
| [ctl:button-12-00-pm] | button | 12:00 PM |  | hidden |  |  |
| [ctl:button-12-30-pm] | button | 12:30 PM |  | hidden |  |  |
| [ctl:button-1-00-pm] | button | 1:00 PM |  | hidden |  |  |
| [ctl:button-1-30-pm] | button | 1:30 PM |  | hidden |  |  |
| [ctl:button-2-00-pm] | button | 2:00 PM |  | hidden |  |  |
| [ctl:button-2-30-pm] | button | 2:30 PM |  | hidden |  |  |
| [ctl:button-3-00-pm] | button | 3:00 PM |  | hidden |  |  |
| [ctl:button-3-30-pm] | button | 3:30 PM |  | hidden |  |  |
| [ctl:button-4-00-pm] | button | 4:00 PM |  | hidden |  |  |
| [ctl:button-4-30-pm] | button | 4:30 PM |  | hidden |  |  |
| [ctl:button-5-00-pm] | button | 5:00 PM |  | hidden |  |  |
| [ctl:button-5-30-pm] | button | 5:30 PM |  | hidden |  |  |
| [ctl:button-6-00-pm] | button | 6:00 PM |  | hidden |  |  |
| [ctl:button-6-30-pm] | button | 6:30 PM |  | hidden |  |  |
| [ctl:button-7-00-pm] | button | 7:00 PM |  | hidden |  |  |
| [ctl:button-7-30-pm] | button | 7:30 PM |  | hidden |  |  |
| [ctl:button-8-00-pm] | button | 8:00 PM |  | hidden |  |  |
| [ctl:button-8-30-pm] | button | 8:30 PM |  | hidden |  |  |
| [ctl:button-9-00-pm] | button | 9:00 PM |  | hidden |  |  |
| [ctl:button-9-30-pm] | button | 9:30 PM |  | hidden |  |  |
| [ctl:button-10-00-pm] | button | 10:00 PM |  | hidden |  |  |
| [ctl:button-10-30-pm] | button | 10:30 PM |  | hidden |  |  |
| [ctl:button-11-00-pm] | button | 11:00 PM |  | hidden |  |  |
| [ctl:button-11-30-pm] | button | 11:30 PM |  | hidden |  |  |
| [ctl:button-27] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:321f0113-5581-4867-be45-0209f52b7c6d-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-5] | button | 5 |  | hidden |  |  |
| [ctl:be761d5a-6d99-421a-974c-afe6cb4918ef] | button | 10 |  | hidden |  |  |
| [ctl:button-20] | button | 20 |  | hidden |  |  |

Full detail per control (computed style, selector, box, options, inline handlers): `capture/controls.json`.

## 6. Validation

HTML5 / MVC rules on: [ctl:FileId], [ctl:FileName], [ctl:TradingPartnerId], [ctl:FromDate], [ctl:ToDate], [ctl:text-from-size-kb-from-size-kb], [ctl:FromSize], [ctl:text-to-size-kb-to-size-kb], [ctl:ToSize], [ctl:text-page] (see §5 rules).

## 7. Interaction styles (measured on the live page)
No hover/focus style changes measured.

Legacy CSS rules for states (`:hover :focus :active :disabled .aspNetDisabled …`) that apply to controls (full list: `capture/pseudo.json`):
- [ctl:link-messages], [ctl:link-external-links], [ctl:link-favorites], [ctl:link-contact-us], [ctl:link-my-account], [ctl:link-logout]: `.k-link, .k-link:hover { color: inherit; text-decoration: none; outline: 0px; cursor: pointer; }` `.k-link, .k-link:hover { color: inherit; text-decoration: none; outline: 0px; cursor: pointer; }` `a, a:link, a:hover, a:visited { background-color: transparent; color: var(--gw-color-neutral-8); }` `a:link, a:visited, a.common-page-link:link, a.common-page-link:visited { text-decoration: none; }`
- [ctl:button-select], [ctl:button-select-2], [ctl:button-select-3], [ctl:button-select-4], [ctl:button-open-the-date-view], [ctl:button-open-the-time-view], [ctl:button-open-the-date-view-2], [ctl:button-open-the-time-view-2], [ctl:resetButton], [ctl:cancelButton], [ctl:nextButton]: `.k-button:disabled, .k-button.k-disabled { box-shadow: none; }` `.k-button:hover, .k-button:focus { text-decoration: none; outline: 0px; }` `.k-button:hover, .k-button.k-hover, .k-button.k-button-base:hover, .k-… { border-color: var(--kendo-color-border, rgba(0, 0, 0, 0.08)); color: var(--kendo-color-on-base, #3d3d3d); background-col… }` `.k-button:focus, .k-button.k-focus, .k-button.k-button-base:focus, .k-… { box-shadow: 0 0 0 2px color-mix(in srgb, var(--kendo-color-on-app-surface, #3d3d3d) 8%, transparent); }`
- [ctl:AAGMenu.BroadcastMsg], [ctl:AAGMenu.ExternalLinks], [ctl:AAGMenu.Favorites], [ctl:AAGMenu.ContactUs], [ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:activeModuleMenuFirstItem]: `.k-menu:not(.k-context-menu) > .k-item:hover, .k-menu:not(.k-context-m… { color: var(--kendo-color-on-app-surface, #3d3d3d); }` `.k-menu:not(.k-context-menu) > .k-item:active, .k-menu:not(.k-context-… { color: var(--kendo-color-primary-on-surface, #ff6358); }` `.k-menu:not(.k-context-menu) > .k-item:focus, .k-menu:not(.k-context-m… { box-shadow: inset 0 0 0 2px var(--kendo-color-border-alt, rgba(0, 0, 0, 0.16)); }` `.k-menu:not(.k-context-menu) > .k-item:hover, .k-menu:not(.k-context-m… { color: var(--kendo-color-on-app-surface, #3d3d3d); }`
- [ctl:combobox-file-status-file-status], [ctl:combobox-direction-direction], [ctl:combobox-transport-type-transport-type], [ctl:combobox-source-location-source-location]: `.k-input::placeholder, .k-picker::placeholder { color: var(--kendo-color-subtle, #666666); opacity: 1; user-select: none; }` `.k-picker:hover, .k-picker.k-hover, .k-picker.k-picker-solid:hover, .k… { border-color: var(--kendo-color-border, rgba(0, 0, 0, 0.08)); color: var(--kendo-color-on-base, #3d3d3d); background-col… }` `.k-picker:focus, .k-picker.k-focus, .k-picker.k-picker-solid:focus, .k… { box-shadow: 0 0 0 2px color-mix(in srgb, var(--kendo-color-on-app-surface, #3d3d3d) 8%, transparent); }` `.k-picker:focus-within, .k-picker.k-picker-solid:focus-within { box-shadow: 0 0 0 2px color-mix(in srgb, var(--kendo-color-on-app-surface, #3d3d3d) 8%, transparent); }`
- [ctl:FileId], [ctl:FileName], [ctl:TradingPartnerId], [ctl:FromDate], [ctl:ToDate], [ctl:text-from-size-kb-from-size-kb], [ctl:text-to-size-kb-to-size-kb]: `.k-input-inner::placeholder { color: var(--kendo-color-subtle, #666666); opacity: 1; user-select: none; }` `.k-input-inner:invalid { box-shadow: none; }` `.k-input-inner::placeholder { color: var(--kendo-color-subtle, #666666); opacity: 1; user-select: none; }` `.k-input-inner:invalid { box-shadow: none; }`
- [ctl:link-client-logo], [ctl:button-disclaimer], [ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy]: `a, a:link, a:hover, a:visited { background-color: transparent; color: var(--gw-color-neutral-8); }` `a:link, a:visited, a.common-page-link:link, a.common-page-link:visited { text-decoration: none; }` `a:focus, a.common-page-link:focus { outline: var(--widget-focus-outline); box-shadow: var(--widget-focus-box-shadow) !important; }` `a:hover, a.common-page-link:hover { text-decoration: underline; }`
- [ctl:button-medicaid-management-solutions]: `.app-title:focus { outline: rgb(46, 171, 255) solid 0.2rem; }`
- [ctl:button-21]: `.content-panel-hdr-tools .panel-icon:focus-within, .content-subpanel-h… { outline: var(--widget-focus-outline); padding: 0px 0.5rem; position: relative; box-shadow: var(--widget-focus-box-shadow… }`
- [ctl:FileIdHelp], [ctl:FileNameHelp], [ctl:FileStatusHelp], [ctl:DirectionHelp], [ctl:TransportTypeHelp], [ctl:SourceLocationIdHelp], [ctl:TradingPartnerIdHelp], [ctl:FromDateHelp], [ctl:ToDateHelp], [ctl:FromSizeHelp], [ctl:ToSizeHelp]: `.editor-icon:hover { color: var(--widget-icon-help); }`
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
- `js/inline-10.js`
- `js/inline-11.js`
- `js/inline-12.js`
- `js/inline-13.js`
- `js/inline-14.js`
- `js/inline-15.js`
- `js/inline-16.js`
- `js/inline-17.js`
- `js/inline-18.js`
- `js/inline-19.js`
- `js/inline-2.js`
- `js/inline-20.js`
- `js/inline-21.js`
- `js/inline-22.js`
- `js/inline-23.js`
- `js/inline-24.js`
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
- `js/Scripts/hp.ua3.core.modelEditor__884a35a7.js`: setEnterFunctionality, resetDirtyData, decrementEditor, incrementEditor, initEdtorStep, initEdtorStepValidator, resetEditorStep, resetDropdowns, ExpandPanelOnError, clearPanelFields, checkMasking, getInitialPageDates, resetPageDates
- `js/Scripts/hp.ua3.core.moduleContentPanels__884a35a7.js`: getAudit, getMail, getNotes, getPrintPreview, getReports, getReturnToProvider, loadPanelContent, toggleVisibility, resetActiveMCB, setActiveMCB, setHelpIcon, getHelpNodeValue, closeMCBPanel, openPopupInNewWindow, popupCenteredHelpWindow
- `js/Scripts/FileTransferTracking/hp.ua3.FileTransfer.searchFileTransferTracking__884a35a7.js`: displayFileTransferTracking, callFileTransferTrackingView, editorCancelPreprocess, editorPreviousPreprocess, editorNextPreprocess, editorNextPostValidate, editorResetPreprocess, editorResetPostprocess, fileTrackingGridOnRowSelected, resetFieldValidations, resetSearchFileTransfer, performFileTrackingSearch
- `js/Scripts/Kendo/Cultures/kendo.culture.en-US.min__884a35a7.js`
- `js/Scripts/Kendo/Messages/kendo.messages.en-US.min__884a35a7.js`
- Hidden fields (page state): FileStatus.ID="", FileStatus.Name="", FileStatus.DisplayFormat="Name", Direction.ID="", Direction.Name="", Direction.DisplayFormat="Name", TransportType.ID="", TransportType.Name="", TransportType.DisplayFormat="Name", Editor.Alt1ActionText="", Editor.Alt1ActionUrl="", Editor.Alt2ActionText="", Editor.Alt2ActionUrl="", Editor.Alt3ActionText="", Editor.Alt3ActionUrl="", Editor.Alt4ActionText="", Editor.Alt4ActionUrl="", Editor.Alt5ActionText="", Editor.Alt5ActionUrl="", Editor.Alt6ActionText="", Editor.Alt6ActionUrl="", Editor.Alt7ActionText="", Editor.Alt7ActionUrl="", Editor.Alt8ActionText="", Editor.Alt8ActionUrl="", Editor.CancelActionText="Cancel", Editor.CancelActionUrl="/Home/MyHome/", Editor.ConfirmDeleteMessage="Are you sure you want to delete the ?", Editor.DeleteActionText="Delete", Editor.DeletedMessage="was successfully deleted.", Editor.Direction="Next", Editor.DirtyDataMessage="Form data has changed and has not been s…", Editor.EntityName="", Editor.IsAlt1Enabled="False", Editor.IsAlt2Enabled="False", Editor.IsAlt3Enabled="False", Editor.IsAlt4Enabled="False", Editor.IsAlt5Enabled="False", Editor.IsAlt6Enabled="False", Editor.IsAlt7Enabled="False", Editor.IsAlt8Enabled="False", Editor.IsCancelEnabled="True", Editor.IsDirtyDataEnabled="False", Editor.IsPrintEnabled="False", Editor.IsProcessDirty="False", Editor.IsResetEnabled="True", Editor.Mode="Create", Editor.NextActionText="Next", Editor.PrevActionText="Prev", Editor.PrintActionText="", Editor.PrintActionUrl="", Editor.ResetActionText="Reset", Editor.SaveActionText="Search", Editor.SavedMessage="was successfully saved.", Editor.ShowSummaryError="True", Editor.Step="1", Editor.StepCount="1", Editor.TitleFormatText="{0} {1} - Step {2} of {3}"

## 15. Motion (what moves, measured on the live page)
The page was warmed up, then sampled for 0s. Setup comes from the page itself (library config, CSS), speed and rhythm from measurement. Every entry has an id; the spec must cite each as `[M01]` in its Motion section.

- **[M01]** CSS animation `autoFillEnd` on 7 element(s), e.g. `#FileId_parent > div:nth-of-type(2) > span:nth-of-type(1)` (598×40): duration 0s, delay 0s, iterations 1, easing ease, fill none, direction normal; keyframes: `@keyframes autoFillEnd { }`

Transitions (applied when an element changes state, e.g. hover; informational, not cited):
| property | duration | easing | delay | elements | e.g. |
|---|---|---|---|---|---|
| color, background-color, border-color, box-shadow,… | 0.15s, 0.15s, 0.15s, 0.15s, 0.15s | cubic-bezier(0, 0, 0.58, 1), cubic-bezie… | 0s, 0s, 0s, 0s, 0s | 25 | `#extLinksCloseButton` |
| color, background-color, border-color, box-shadow | 0.15s, 0.15s, 0.15s, 0.15s | cubic-bezier(0, 0, 0.58, 1), cubic-bezie… | 0s, 0s, 0s, 0s | 7 | `#AAGMenu\.BroadcastMsg` |
| transform | 0.2s | linear | 0s | 1 | `#pageHeader` |

Freeze state used for every picture: {"swiper":0,"slick":0,"owl":0,"animations":5,"clock":"paused","stillMoving":0}. A non-zero stillMoving means JS-driven motion the fake clock could not stop.
Full detail (keyframe lists of running animations, every sampled mover): `motion.json`.

## 18. Provider kit harvest (kit/screen.json)

Read from Kendo 2026.1.415 on the live page. The kit (src/kit) rebuilds every widget below: cite each as [kit:<id>].

- Title bar: module "?", title "File Transfer Tracking"
- [kit:k1] FileStatusList (dropdown, placeholder "select a value...", 3 options: Complete | Error | Transferring, help "File Status")
- [kit:k2] DirectionList (dropdown, placeholder "select a value...", 2 options: INBOUND | OUTBOUND, help "Direction")
- [kit:k3] TransportTypeList (dropdown, placeholder "select a value...", 4 options: FTP | SFTP | UNC | FTPS, help "Transport Type")
- [kit:k4] SourceLocation (dropdown, placeholder "select a value...", 97 options: a6 - 123.43 | Admin - https://tenant2-fltest.mapshc.com/ | Amaro42925SFTPToSFTP - /AmaroCom/SourceSFTPCom | Bug3197290Commercial - /FTS/Ranjan | chrometested - /4 | config - /Addrs | config - /add | config - /address …, help "Source Location")
- [kit:k5] From Date (datetime, format M/d/yyyy h:mm tt, help "From Date")
- [kit:k6] To Date (datetime, format M/d/yyyy h:mm tt, help "To Date")
- [kit:k7] From Size (KB) (numeric, format n, help "From Size (KB)")
- [kit:k8] To Size (KB) (numeric, format n, help "To Size (KB)")
- [kit:k9] grid: File ID (sortable), File Name (sortable), File Status (sortable), Direction (sortable), Transport Type, Size (KB) (sortable), Create Date (sortable), Trading Partner ID (sortable); page size 10
- field FileId: validation regex "File ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field FileName: validation regex "File Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field TradingPartnerId: validation regex "Trading Partner ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field FromDate: validation date "The field From Date must be a date."; datetime "From Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'."
- field ToDate: validation date "The field To Date must be a date."; datetime "To Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'."
- field FromSize: validation number "From Size (KB) is restricted to numeric values with at most 2 decimal places."; regex "From Size (KB) is restricted to numeric values with at most 2 decimal places."
- field ToSize: validation number "To Size (KB) is restricted to numeric values with at most 2 decimal places."; regex "To Size (KB) is restricted to numeric values with at most 2 decimal places."
- Actions: reset "Reset", cancel "Cancel", search "Search"
- Search reveals h13; calls GET /api/FileTransfer/SearchFileTransferTracking/
- [kit:k9] after Search: 0 rows, page size 10; field types  (rows in the rebuild are synthetic)
