# FACTS — claims-mgmt-v1/search-claims

Generated from a Playwright capture of the live page. Deterministic: nothing here is inferred. Read this first, then `content.md`.
Cite ids exactly as written: `[ctl:<key>]` controls, `[T07]` behaviors, `[val:<id>]` validators, `[shot:N]` your screenshot N, `[asset:<path>]` files.
All sizes are CSS px (screenshot px ÷ dpr).

## 1. Page
| | |
|---|---|
| URL | https://uximc.mms.tst.pgwcloud.net/ClaimsManagement/SearchClaims |
| Title | Search Claims |
| Built with | mvcUnobtrusive, jquery 3.7.1 |
| Doctype / mode | <!DOCTYPE html> / CSS1Compat |
| Viewport | 1920×1080 CSS px @ dpr 1 |
| Document | 1905×1129 CSS px |
| Language / charset | en / UTF-8 |
| Favicon | - |

**Reference picture made by the tool** (page warmed up and frozen: lazy images loaded, counters finished, carousels at slide 0): `reference.png`, 1905×1129 px @ dpr 1, 2 shots pasted at their exact scroll positions.
Look at `sections/` first: one full-resolution crop per band. They are far sharper than the whole-page picture. Cite one as `[asset:sections/<file>]`.

| # | crop file(s) | y | h (CSS px) | element |
|---|---|---|---|---|
| 1 | `sections/01-search-claims.png` | 62 | 948 | div.menu |
| 2 | `sections/02-disclaimer-the-website-is-prov.png` | 1010 | 119 | footer |

The page as a self-contained copy: `snapshot/rendered.html` (the DOM after its scripts ran, scripts removed, original class names) and `snapshot/used.css` (only the CSS rules this page uses, hover/focus/::before and media queries included). `snapshot/fidelity/report.json` says how closely that copy, rendered offline from the saved assets, matches the reference.

## 2. Design tokens (computed, weighted by use)
| token | values (weight) |
|---|---|
| font families | `Arial` (5036)<br>`Arial, sans-serif` (3874)<br>`Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome` (1426)<br>`"Times New Roman"` (367)<br>`Arial, FontAwesome, sans-serif` (174)<br>`Poppins, Arial, Helvetica, sans-serif` (75) |
| size / weight / line-height | `14px / 400 / lh 14px` (5239)<br>`14px / 700 / lh 20px` (2872)<br>`16px / 400 / lh 25px` (678)<br>`16px / 700 / lh 18px` (422)<br>`16px / 700 / lh 22.8571px` (298)<br>`14px / 700 / lh 14px` (244)<br>`16px / 400 / lh 40px` (179)<br>`16px / 400 / lh 18px` (168)<br>`16px / 400 / lh 21px` (138)<br>`16px / 400 / lh 21.44px` (104)<br>`12px / 400 / lh 17.1429px` (102)<br>`12px / 400 / lh 32px` (84) |
| text colors | `rgb(61, 61, 61)` (5516)<br>`rgb(255, 255, 255)` (2824)<br>`rgb(43, 58, 68)` (1782)<br>`rgb(0, 0, 0)` (491)<br>`rgb(0, 98, 255)` (166)<br>`rgb(87, 87, 87)` (114)<br>`rgb(68, 68, 68)` (79)<br>`rgb(48, 179, 254)` (29)<br>`rgb(203, 26, 198)` (18)<br>`rgb(90, 105, 120)` (17) |
| backgrounds | `rgb(255, 255, 255)` (4423)<br>`rgb(43, 58, 68)` (276)<br>`rgb(250, 250, 250)` (88)<br>`rgb(0, 238, 174)` (61)<br>`rgb(48, 179, 254)` (4)<br>`rgb(38, 143, 203)` (4) |
| borders | `1px solid rgba(0, 0, 0, 0)` (85)<br>`1px solid rgb(90, 105, 120)` (50)<br>`1px solid rgb(206, 212, 218)` (15)<br>`1px solid rgb(255, 255, 255)` (12)<br>`1px solid rgb(0, 98, 255)` (7)<br>`1px solid rgb(222, 226, 230)` (5)<br>`1px solid rgb(67, 119, 137)` (4)<br>`1px solid rgb(38, 143, 203)` (1) |
| radii | `2.5px` (78)<br>`5px` (63)<br>`4px` (34)<br>`10px 10px 0px 0px` (8)<br>`9px` (6)<br>`0px 0px 9px 9px` (6) |
| body | fontFamily: Arial, "Helvetica Neue", Helvetica, sans-serif, FontAwesome; fontSize: 14px; lineHeight: 14px; color: rgb(51, 51, 51); backgroundColor: rgb(255, 255, 255); margin: 0px; padding: 62px 0px 0px |
| html | background rgba(0, 0, 0, 0); font-size 10px |
| web fonts loaded | Font Awesome 6 Pro 900 normal, Poppins normal normal, Poppins Bold normal normal |

## 3. Layout sections (top level, document order)
| # | element | box x,y,w,h | in shots | own style | first text | controls |
|---|---|---|---|---|---|---|
| 1 | div#pageHeader.header {pageHeader} | 0,0,1905,62 |  | backgroundColor: rgb(43, 58, 68); position: fixed | Medicaid Management Solutions | 18 |
| 2 | div.menu {navigation-claims-managem} | 0,62,1905,32 |  | backgroundColor: rgb(0, 238, 174) | Claims Management | 4 |
| 3 | div#mcbRowBorder.row {mcbRowBorder} | 0,94,1905,12 |  | borderBottom: 1px solid rgb(179, 179, 179); display: flex |  | 0 |
| 4 | div.row | 0,106,1905,0 |  |  |  | 0 |
| 5 | div.row | 0,106,1905,0 |  |  |  | 0 |
| 6 | div#pageBody.row {pageBody} | 0,106,1905,904 |  |  | Search Criteria | 72 |
| 7 | footer {contentinfo} | 0,1010,1905,119 |  |  | Disclaimer | 0 |

Exact per-element boxes and style deltas: `capture/dom.json` (`box` = [x, y, w, h] CSS px, `s` = style that differs from the parent).

## 4. Assets (use these files, never redraw them)
| file (under capture/) | used as | shown at (CSS) | natural px |
|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | img | 116×56 | 169×82 |
| `assets/_svg/svg-1.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-2.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-3.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-4.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-5.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-6.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-7.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-8.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-9.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-10.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-11.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-12.svg` | inline svg | 18×16 |  |
| `assets/_svg/svg-13.svg` | inline svg | 18×16 |  |

Fonts: `assets/webfonts/fa-solid-900.woff2` (/webfonts/fa-solid-900.woff2), `assets/fonts/Poppins.woff` (/fonts/Poppins.woff), `assets/fonts/Poppins-Bold.woff` (/fonts/Poppins-Bold.woff)
Stylesheets (legacy CSS, verbatim): `assets/bundles/vendorcss__75ac4b06.css`, `assets/bundles/appcss__dc8bcbe2.css`, `assets/_long/deb23c03e2505ea9.css`
All downloaded files: `capture/assets/index.json` (18).

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
| [ctl:29c169a7-ff30-4c30-a975-047d2f7b6662] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:82b443cd-922c-40ae-9137-8828890484f9] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:4960a1f8-fb20-4326-a92b-1ac1ae99aa84] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-search-claims] | button | Search Claims |  | hidden |  |  |
| [ctl:link-search-claims] | link | Search Claims |  | hidden |  | anchor |
| [ctl:button-pro-dur] | button | Pro DUR |  | hidden |  |  |
| [ctl:link-pro-dur] | link | Pro DUR |  | hidden |  | url → /ProDUR/ProDURDashBoard |
| [ctl:button-drug-rebate-dashboard-labeler-nd] | button | Drug Rebate Dashboard Labeler NDC Claim … |  | hidden |  |  |
| [ctl:link-drug-rebate] | link | Drug Rebate |  | hidden |  | url → /DrugRebate/Dashboard |
| [ctl:c9497a25-e193-4b03-930e-0da72344cad0] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:a2765fd9-0d8f-4656-b065-bbc485806938] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-page-elements-widgets] | button | Page Elements / Widgets |  | hidden |  |  |
| [ctl:link-page-elements-widgets] | link | Page Elements / Widgets |  | hidden |  | url → /Employee/UIExamples |
| [ctl:button-file-transfer-services-file-tran] | button | File Transfer Services File Transfer Con… |  | hidden |  |  |
| [ctl:31256c13-05c2-485a-a1fd-3ae46e110dcf] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-file-transfer-configuration] | button | File Transfer Configuration |  | hidden |  |  |
| [ctl:link-file-transfer-configuration] | link | File Transfer Configuration |  | hidden |  | url → /FileTransfer/SearchSourceLocations |
| [ctl:button-file-transfer-tracking] | button | File Transfer Tracking |  | hidden |  |  |
| [ctl:link-file-transfer-tracking] | link | File Transfer Tracking |  | hidden |  | url → /FileTransfer/SearchFileTransferTracking |
| [ctl:button-ftp-server-credentials] | button | FTP Server Credentials |  | hidden |  |  |
| [ctl:link-ftp-server-credentials] | link | FTP Server Credentials |  | hidden |  | url → /FileTransfer/SearchFTPServerCredentials |
| [ctl:button-integration-event-to-file-query-] | button | Integration Event To File Query Builder … |  | hidden |  |  |
| [ctl:link-integration] | link | Integration |  | hidden |  | url → /Integration/Dashboard |
| [ctl:505b4d1e-ca3b-4c03-baa2-33535f183815] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:19605852-fb29-4079-8ae2-90b1710d1627] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:7bcb8e60-4ae5-4b94-b731-571912836fbc] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:00502dad-0759-437c-8abf-ea5bc259d9b1] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:3faa8093-e41f-4bba-adf1-9eed902fb657] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:7679fde8-6419-4a8c-ab98-4a7c1be8275b] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:87b88f5c-5969-4851-b0f2-e18a91b6d9a4] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:e42ee536-cf3c-4e1c-b34a-037d1058bdf5] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:0116561e-0b12-460e-b5aa-45fe0660de5f] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:e38e56bd-02e5-49f5-bca6-7a30a5de540c] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:30d1e5f0-702f-4a19-b09b-339d867dcdd5] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:3fb5c93a-d4ee-48b7-88e9-2ecd138635d0] | button |  |  | hidden |  | handlers jq:click |
| [ctl:button-search-hipp] | button | Search HIPP |  | hidden |  |  |
| [ctl:link-search-hipp] | link | Search HIPP |  | hidden |  | url → /TPLHIPP/SearchHIPP |
| [ctl:button-average-expenditure] | button | Average Expenditure |  | hidden |  |  |
| [ctl:link-average-expenditure] | link | Average Expenditure |  | hidden |  | url → /TPLHIPP/SearchAverageExpenditure |
| [ctl:button-task-management-dashboard-task-t] | button | Task Management Dashboard Task Template … |  | hidden |  |  |
| [ctl:link-task-management] | link | Task Management |  | hidden |  | url → /TaskManagement/Dashboard |
| [ctl:0adfea89-a4f7-4ef1-acfa-c1475277b8d5] | button |  |  | hidden |  | handlers jq:click |
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
| [ctl:link-search-claims-2] | link | Search Claims |  | hidden |  | anchor |
| [ctl:button-pro-dur-2] | button | Pro DUR |  | hidden |  |  |
| [ctl:link-pro-dur-2] | link | Pro DUR |  | hidden |  | url → /ProDUR/ProDURDashBoard |
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
| [ctl:auditHelp] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:click,jq:keypress |
| [ctl:button-help] | button | Help |  | hidden |  | tooltip "Help"; handlers jq:touchstart |
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
| [ctl:plusMinusSearchClaimsClick] | button |  |  |  |  | handlers onclick,jq:click,jq:keypress |
| [ctl:ClaimIdentifiersHelp] | button | HELP |  |  |  | tooltip "Search for claims by ICN, TCN, or MCO ICN."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-search-by-search-for-claims-by-i] | combobox | SEARCH BY Search for claims by ICN, TCN,… |  |  |  | handlers jq:focusin,jq:focusout,jq:focus,jq:mouseout,jq:mouseover |
| [ctl:button-select] | button | select |  |  |  | handlers jq:blur |
| [ctl:ClaimIdentifiersList] | text | ClaimIdentifiersList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:SearchICNHelp] | button | HELP |  | hidden |  | tooltip "Internal Claim Number assigned by Claims Managemen…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:SearchICN] | text | ICN Internal Claim Number assigned by Cl… |  | hidden | maxlength 15; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:TCNHelp] | button | HELP |  | hidden |  | tooltip "This is the transaction control number (TCN) which…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:TCN] | text | TCN This is the transaction control numb… |  | hidden | maxlength 15; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:MCOICNHelp] | button | HELP |  | hidden |  | tooltip "This is the MCO assigned internal claim number for…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:MCOICN] | text | MCO ICN This is the MCO assigned interna… |  | hidden | maxlength 15; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:DateTypeHelp] | button | HELP |  |  |  | tooltip "Search for claims by date of service (DOS), date r…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-choose-date-type-search-for-clai] | combobox | CHOOSE DATE TYPE Search for claims by da… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-2] | button | select |  |  |  | handlers jq:blur |
| [ctl:DateTypeList] | text | DateTypeList | DOS | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:button-date-from-is-a-required-field] | button | Date From is a required field. |  |  |  | tooltip "Date From is a required field."; handlers jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:FromDateHelp] | button | HELP |  |  |  | tooltip "Beginning date range for date of service (DOS), da…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:FromDate] | text | DATE FROM Beginning date range for date … | 11/10/2024 | required | data-val: date,minmax-date,required | handlers onblur,onkeydown,jq:keydown,jq:focusout,jq:focus |
| [ctl:button-select-3] | button | select |  |  |  | handlers jq:click,jq:mousedown,jq:blur |
| [ctl:button-date-to-is-a-required-field] | button | Date To is a required field. |  |  |  | tooltip "Date To is a required field."; handlers jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ToDateHelp] | button | HELP |  |  |  | tooltip "Ending date range for date of service (DOS), date …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ToDate] | text | DATE TO Ending date range for date of se… | 11/10/2026 | required | data-val: date,minmax-date,required | handlers onblur,onkeydown,jq:keydown,jq:focusout,jq:focus |
| [ctl:button-select-4] | button | select |  |  |  | handlers jq:click,jq:mousedown,jq:blur |
| [ctl:MemberByHelp] | button | HELP |  |  |  | tooltip "Search for claims by Member ID, Member Name or Pat…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-choose-member-by-search-for-clai] | combobox | CHOOSE MEMBER BY Search for claims by Me… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-5] | button | select |  |  |  | handlers jq:blur |
| [ctl:MemberByList] | text | MemberByList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:MemberIDHelp] | button | HELP |  | hidden |  | tooltip "This is the Unique ID from the Member's HealthCare…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:MemberID] | text | Member ID This is the Unique ID from the… |  | hidden | data-val: regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:MemberNameHelp] | button | HELP |  | hidden |  | tooltip "Full name of the Member associated with the Member…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:MemberName] | text | Member Name Full name of the Member asso… |  | hidden | data-val: regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:PatientAccountNumberHelp] | button | HELP |  | hidden |  | tooltip "Identification for a member assigned by a provider…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:PatientAccountNumber] | text | Patient Acct Identification for a member… |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:ProviderRoleHelp] | button | HELP |  |  |  | tooltip "Search for claims by billing provider, performing …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-choose-provider-role-search-for-] | combobox | CHOOSE PROVIDER ROLE Search for claims b… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-6] | button | select |  |  |  | handlers jq:blur |
| [ctl:ProviderRoleList] | text | ProviderRoleList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:ProviderByHelp] | button | HELP |  | hidden |  | tooltip "Search for claims by National Provider Number (NPI…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-choose-provider-by-search-for-cl] | combobox | Choose Provider By Search for claims by … |  | hidden |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-7] | button | select |  | hidden |  | handlers jq:blur |
| [ctl:ProviderByList] | text | ProviderByList | NP | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:NPIHelp] | button | HELP |  | hidden |  | tooltip "This is the NPI number assigned by the government …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:NPI] | text | NPI This is the NPI number assigned by t… |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:ProviderNameHelp] | button | HELP |  | hidden |  | tooltip "This is the name for the provider on the claim."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ProviderName] | text | Provider Name This is the name for the p… |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:ProviderTaxonomyHelp] | button | HELP |  | hidden |  | tooltip "This is the taxonomy code for the provider on the …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ProviderTaxonomy] | text | Provider Taxonomy This is the taxonomy c… |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:ProviderTaxIDHelp] | button | HELP |  | hidden |  | tooltip "This is the tax identifier for the provider on the…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ProviderTaxID] | text | Provider Tax ID This is the tax identifi… |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:ProviderIDHelp] | button | HELP |  | hidden |  | tooltip "Identification number of the provider performing t…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ProviderID] | text | Provider ID Identification number of the… |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:ProviderLocationIDHelp] | button | HELP |  | hidden |  | tooltip "The location code where the provider performs the …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ProviderLocationID] | text | Svc Location ID The location code where … |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:plusMinusAdvancedSearchClaimsClick] | button |  |  |  |  | handlers onclick,jq:click,jq:keypress |
| [ctl:ClaimTypeHelp] | button | HELP |  |  |  | tooltip "Indicates the type of claim. i.e. Medical, Inpatie…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-claim-type-indicates-the-type-of] | combobox | Claim Type Indicates the type of claim. … |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-8] | button | select |  |  |  | handlers jq:blur |
| [ctl:ClaimTypeList] | text | ClaimTypeList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:ClaimSubTypeHelp] | button | HELP |  |  |  | tooltip "Indicates additional qualifications of types of cl…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-sub-type-indicates-additional-qu] | combobox | Sub Type Indicates additional qualificat… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-9] | button | select |  |  |  | handlers jq:blur |
| [ctl:ClaimSubTypeList] | text | ClaimSubTypeList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:ClaimStatusHelp] | button | HELP |  |  |  | tooltip "Identifies the status of the claim with the system…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-status-identifies-the-status-of-] | combobox | Status Identifies the status of the clai… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-10] | button | select |  |  |  | handlers jq:blur |
| [ctl:ClaimStatusList] | text | ClaimStatusList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:ClaimSourceCodeHelp] | button | HELP |  |  |  | tooltip "Indicates the origin of the claim. i.e. HIPAA tran…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-claim-source-code-indicates-the-] | combobox | Claim Source Code Indicates the origin o… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-11] | button | select |  |  |  | handlers jq:blur |
| [ctl:ClaimSourceCodeList] | text | ClaimSourceCodeList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:PayToHelp] | button | HELP |  |  |  | tooltip "Indicates who is paid when the claim is resolved. …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-pay-to-indicates-who-is-paid-whe] | combobox | Pay To Indicates who is paid when the cl… |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-12] | button | select |  |  |  | handlers jq:blur |
| [ctl:PayToList] | text | PayToList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:ServiceTypeHelp] | button | HELP |  |  |  | tooltip "The type of service associated with the major or p…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-svc-type-the-type-of-service-ass] | combobox | Svc Type The type of service associated … |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-13] | button | select |  |  |  | handlers jq:blur |
| [ctl:ServiceTypeList] | text | ServiceTypeList |  | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:Modifiers1Help] | button | HELP |  |  |  | tooltip "Code used to provide additional information about …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:Modifiers1] | text | Mod1 Code used to provide additional inf… |  |  | maxlength 50; data-val: length-max | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-2] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:Modifiers2Help] | button | HELP |  |  |  | tooltip "Code used to provide additional information about …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:Modifiers2] | text | Mod2 Code used to provide additional inf… |  |  | maxlength 50; data-val: length-max | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-3] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:Modifiers3Help] | button | HELP |  |  |  | tooltip "Code used to provide additional information about …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:Modifiers3] | text | Mod3 Code used to provide additional inf… |  |  | maxlength 50; data-val: length-max | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-4] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:Modifiers4Help] | button | HELP |  |  |  | tooltip "Code used to provide additional information about …"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:Modifiers4] | text | Mod4 Code used to provide additional inf… |  |  | maxlength 50; data-val: length-max | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-5] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:ExceptionErrorCodeHelp] | button | HELP |  |  |  | tooltip "Code used to identify the failed edit or audit."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ExceptionErrorCode] | text | Exp Error Code Code used to identify the… |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-6] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:AuthorizationNumberHelp] | button | HELP |  |  |  | tooltip "Identifies the prior authorization (prior auth) nu…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:AuthorizationNumber] | text | Prior Auth Identifies the prior authoriz… |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:OperatorIdentifierHelp] | button | HELP |  |  |  | tooltip "Identifies the last person that updated the claim."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:OperatorIdentifier] | text | Operator ID Identifies the last person t… |  |  | maxlength 200; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:RANumberHelp] | button | HELP |  |  |  | tooltip "Check number associated with the paid claim."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:RANumber] | text | RA Number Check number associated with t… |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:TotalBilledHelp] | button | HELP |  |  |  | tooltip "Total of all line charges on the claim."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-range-from] | text | Range From | $0.00 |  | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:keypress,jq:blur |
| [ctl:TotalBilledRangeFrom] | text | Range From | 0 | hidden | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:focusout,jq:keydown,jq:keyup,jq:paste |
| [ctl:button-increase-value] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:text-range-to] | text | Range To | $0.00 |  | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:keypress,jq:blur |
| [ctl:TotalBilledRangeTo] | text | Range To | 0 | hidden | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:focusout,jq:keydown,jq:keyup,jq:paste |
| [ctl:button-increase-value-2] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-2] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:col-md-3_editor-colProcCodeHelp] | button | HELP |  |  |  | tooltip "CDT/HCPCS code (DXXXX) used to identify a procedur…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ProcCodeFrom] | text | From |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:ProcCodeTo] | text | To |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:focusin,jq:focusout,jq:change,jq:input,jq:keypress |
| [ctl:col-md-3_editor-colToothNoHelp] | button | HELP |  |  |  | tooltip "Identifies the tooth the provider rendered service…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:ToothNumberFrom] | text | From |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-7] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:ToothNumberTo] | text | To |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-8] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:editor-colPriDXCodeHelp] | button | HELP |  |  |  | tooltip "The major or primary diagnosis for this claim"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:combobox-choose-dx-type] | combobox | Choose DX Type |  |  |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-14] | button | select |  |  |  | handlers jq:blur |
| [ctl:DiagnosisTypeList] | text | DiagnosisTypeList | 02 | hidden |  | handlers jq:focus,jq:keypress,jq:change,jq:keyup,jq:blur |
| [ctl:PrimaryDiagnosisCodeICD09] | text | Code |  | hidden | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-9] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:PrimaryDiagnosisCodeICD10] | text | Code |  |  | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keyup,jq:focusin,jq:focusout,jq:change,jq:input |
| [ctl:button-clear-10] | button | clear |  | hidden |  | tooltip "clear"; handlers jq:touchend,jq:click,jq:mousedown,jq:mouseover,jq:mouseout |
| [ctl:prevButton] | button | Prev |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:resetButton] | button | Reset |  |  |  | tooltip "Alt+Q"; handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt1Button] | button | Alt1 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt4Button] | button | Alt4 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt5Button] | button | Alt5 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt6Button] | button | Alt6 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt7Button] | button | Alt7 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt8Button] | button | Alt8 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:printButton] | button | Print |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt2Button] | button | Alt2 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:alt3Button] | button | Alt3 |  | hidden |  | handlers jq:keypress,jq:click,jq:blur |
| [ctl:cancelButton] | button | Cancel |  |  |  | tooltip "Alt+1"; handlers jq:keypress,jq:click,jq:blur |
| [ctl:nextButton] | button | Search |  |  |  | tooltip "Alt+2"; handlers jq:keypress,jq:click,jq:blur |
| [ctl:ClaimsResultsGrid] | button |  |  | hidden |  | handlers jq:dblclick,jq:mouseover,jq:mouseout |
| [ctl:button-grid-toolbar] | button | grid toolbar |  | hidden |  | handlers jq:click,jq:input |
| [ctl:button-20] | button |  |  | hidden |  | handlers jq:scroll,jq:mousedown,jq:touchstart,jq:click |
| [ctl:button-21] | button |  |  | hidden |  | handlers jq:mousedown,jq:focus,jq:focusout,jq:keydown |
| [ctl:42e99044-fbed-4f61-9ae2-2347e33d996f] | button | Internal Claim Number assigned by Claims… |  | hidden |  | tooltip "Internal Claim Number assigned by Claims Managemen…"; handlers jq:click |
| [ctl:link-icn-filter-column-settings] | link | ICN filter column settings |  | hidden |  | js; tooltip "ICN filter column settings"; handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:00558588-8cca-451f-a7b9-28983d074c71] | button | This is the Unique ID from the Member's … |  | hidden |  | tooltip "This is the Unique ID from the Member's HealthCare…"; handlers jq:click |
| [ctl:a6044a10-319f-43aa-ab16-c479f1961928] | button | This is the NPI number assigned by the g… |  | hidden |  | tooltip "This is the NPI number assigned by the government …"; handlers jq:click |
| [ctl:17ef4f1b-8f0c-46b5-9908-a8cbd042c94f] | button | Indicates the type of claim. i.e. Medica… |  | hidden |  | tooltip "Indicates the type of claim. i.e. Medical, Inpatie…"; handlers jq:click |
| [ctl:d106c6c8-a7e5-45e8-a3b9-4f5742b56ab6] | button | Indicates additional qualifications of t… |  | hidden |  | tooltip "Indicates additional qualifications of types of cl…"; handlers jq:click |
| [ctl:bb98cd1e-252c-4a5b-a7e6-2e3753531fc2] | button | Identifies the status of the claim with … |  | hidden |  | tooltip "Identifies the status of the claim with the system…"; handlers jq:click |
| [ctl:8fcfe4e9-11c2-4439-8d42-9bec82bba56e] | button | Earliest Beginning date of service (DOS)… |  | hidden |  | tooltip "Earliest Beginning date of service (DOS) for all s…"; handlers jq:click |
| [ctl:b7ef7a06-f89b-402a-aeb8-228f10250d72] | button | Latest Ending date of service (DOS) for … |  | hidden |  | tooltip "Latest Ending date of service (DOS) for all servic…"; handlers jq:click |
| [ctl:5d5bc6e1-b329-4d3c-84f2-3a7fdb6f6976] | button | Total of all line charges on the claim. |  | hidden |  | tooltip "Total of all line charges on the claim."; handlers jq:click |
| [ctl:9ba1c176-4a85-4cd2-8515-967dccff62e7] | button | Amount calculated based on benefit rules… |  | hidden |  | tooltip "Amount calculated based on benefit rules , pricing…"; handlers jq:click |
| [ctl:846f6082-0cc8-4fb3-aa44-9f459883d166] | button | Identifies the authorization number that… |  | hidden |  | tooltip "Identifies the authorization number that provides …"; handlers jq:click |
| [ctl:ca12b71c-2e11-47be-aea4-9ad2a944b186] | button | Date the claim was paid |  | hidden |  | tooltip "Date the claim was paid"; handlers jq:click |
| [ctl:link-paid-date-filter-column-settings] | link | Paid Date filter column settings |  | hidden |  | js; tooltip "Paid Date filter column settings"; handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:ee21e128-ae85-4e3e-ac4e-a236d665d975] | button | Paid Date |  | hidden |  | handlers jq:click |
| [ctl:f49e4b3c-05d4-4f61-a851-8cc697f7caad] | button |  |  | hidden |  | handlers jq:click,jq:keydown,jq:mousedown,jq:focus,jq:focusout |
| [ctl:ddef018a-9e65-414a-8614-ef8c028fb0e8] | button | Page navigation, page 0 of 0 |  | hidden |  | handlers jq:change,jq:click,jq:keydown,jq:focusout,jq:focusin |
| [ctl:excelButton] | button | Export to Excel |  | hidden |  | tooltip "Export to Excel"; handlers jq:blur,jq:click,jq:focus,jq:keydown,jq:keyup |
| [ctl:pdfButton] | button | Export to PDF |  | hidden |  | tooltip "Export to PDF"; handlers jq:blur,jq:click,jq:focus,jq:keydown,jq:keyup |
| [ctl:button-go-to-the-first-page] | button | Go to the first page |  | hidden |  | tooltip "Go to the first page"; handlers jq:blur |
| [ctl:button-go-to-the-previous-page] | button | Go to the previous page |  | hidden |  | tooltip "Go to the previous page"; handlers jq:blur |
| [ctl:button-page-0] | button | Page 0 |  | hidden |  | handlers jq:blur |
| [ctl:button-go-to-the-next-page] | button | Go to the next page |  | hidden |  | tooltip "Go to the next page"; handlers jq:blur |
| [ctl:button-go-to-the-last-page] | button | Go to the last page |  | hidden |  | tooltip "Go to the last page"; handlers jq:blur |
| [ctl:text-page] | text | Page |  | hidden | data-val: data-validate | handlers jq:focus,jq:blur |
| [ctl:text-page-2] | text | Page |  | hidden |  | handlers jq:focusout,jq:keydown,jq:keyup,jq:paste,jq:input |
| [ctl:link-refresh] | link | Refresh |  | hidden |  | url → /api/ClaimsManagement/SearchClaims/; tooltip "Refresh"; handlers jq:mouseover,jq:mouseout |
| [ctl:combobox-page-sizes-drop-down] | combobox | Page sizes drop down |  | hidden |  | handlers jq:focusin,jq:focusout,jq:mouseout,jq:mouseover,jq:keydown |
| [ctl:button-select-15] | button | select |  | hidden |  | handlers jq:blur |
| [ctl:select-page-sizes-drop-down] | select | Page sizes drop down | 10 | hidden | type=select-one | handlers jq:focus,jq:blur; 3 options |
| [ctl:nextClaimButton] | button | Alt+N |  | hidden |  | tooltip "Alt+N"; handlers jq:blur,jq:click,jq:focus,jq:keydown,jq:keyup |
| [ctl:prevClaimButton] | button | Alt+P |  | hidden |  | tooltip "Alt+P"; handlers jq:blur,jq:click,jq:focus,jq:keydown,jq:keyup |
| [ctl:View_MemberNameHelp] | button | HELP |  | hidden |  | tooltip "Full name of the Member associated with the Member…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_MemberName] | text | Member Name Full name of the Member asso… |  | hidden, readonly | maxlength 125; data-val: length-max,regex,regex-pattern | handlers jq:keypress,jq:change,jq:keyup,jq:focus,jq:blur |
| [ctl:View_MemberDOBHelp] | button | HELP |  | hidden |  | tooltip "Member's date of birth."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_MemberDOB] | text | DOB Member's date of birth. | 01/01/0001 | hidden, readonly | data-val: date,minmax-date | handlers onblur,onkeydown,jq:keypress,jq:change,jq:keyup |
| [ctl:button-select-16] | button | select |  | hidden |  | handlers jq:blur |
| [ctl:View_MemberGenderCodeHelp] | button | HELP |  | hidden |  | tooltip "Member's gender."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_MemberGenderCode_ID] | text | Gender Member's gender. |  | hidden, readonly |  | handlers onmouseover,jq:keypress,jq:focus,jq:blur |
| [ctl:View_BillingProviderNameHelp] | button | HELP |  | hidden |  | tooltip "This is the name for the billing provider on the c…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_BillingProviderName] | text | Billing Prov Name This is the name for t… |  | hidden, readonly | maxlength 125; data-val: length-max,regex,regex-pattern | handlers jq:keypress,jq:change,jq:keyup,jq:focus,jq:blur |
| [ctl:View_BillingProviderTaxIdHelp] | button | HELP |  | hidden |  | tooltip "This is the tax identifier for the billing provide…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_BillingProviderTaxId] | text | Billing Prov Tax ID This is the tax iden… |  | hidden, readonly | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keypress,jq:change,jq:keyup,jq:focus,jq:blur |
| [ctl:View_TotalAllowedAmountHelp] | button | HELP |  | hidden |  | tooltip "Amount calculated based on pricing fee schedule an…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-total-allowed-amount-calculated-] | text | Total Allowed Amount calculated based on… | $0.00 | hidden, readonly | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:blur |
| [ctl:View_TotalAllowedAmount] | text | Total Allowed | 0 | hidden, readonly | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:keypress,jq:change,jq:keyup,jq:focusout |
| [ctl:button-increase-value-3] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-3] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:View_TotalCopayAmountHelp] | button | HELP |  | hidden |  | tooltip "Amount of money the member pays for services rende…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-total-copay-amount-of-money-the-] | text | Total Copay Amount of money the member p… | $0.00 | hidden, readonly | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:blur |
| [ctl:View_TotalCopayAmount] | text | Total Copay | 0 | hidden, readonly | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:keypress,jq:change,jq:keyup,jq:focusout |
| [ctl:button-increase-value-4] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-4] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:View_TotalCoinsuranceAmountHelp] | button | HELP |  | hidden |  | tooltip "The amount based on a percentage of the Provider's…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-total-coinsurance-the-amount-bas] | text | Total Coinsurance The amount based on a … | $0.00 | hidden, readonly | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:blur |
| [ctl:View_TotalCoinsuranceAmount] | text | Total Coinsurance | 0 | hidden, readonly | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:keypress,jq:change,jq:keyup,jq:focusout |
| [ctl:button-increase-value-5] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-5] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:View_TotalDeductibleAmountHelp] | button | HELP |  | hidden |  | tooltip "Amount of money the member is responsible for payi…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-total-deductible-amount-of-money] | text | Total Deductible Amount of money the mem… | $0.00 | hidden, readonly | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:blur |
| [ctl:View_TotalDeductibleAmount] | text | Total Deductible | 0 | hidden, readonly | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:keypress,jq:change,jq:keyup,jq:focusout |
| [ctl:button-increase-value-6] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-6] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:View_TotalSpenddownAmountHelp] | button | HELP |  | hidden |  | tooltip "Amount of money the member is responsible for payi…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:text-total-spenddown-amount-of-money-] | text | Total Spenddown Amount of money the memb… | $0.00 | hidden, readonly | data-val: data-validate | tooltip "$0.00"; handlers jq:focus,jq:blur |
| [ctl:View_TotalSpenddownAmount] | text | Total Spenddown | 0 | hidden, readonly | maxlength 15; data-val: length-max,number,regex,regex-pattern | handlers onfocus,jq:keypress,jq:change,jq:keyup,jq:focusout |
| [ctl:button-increase-value-7] | button | Increase value |  | hidden |  | tooltip "Increase value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:button-decrease-value-7] | button | Decrease value |  | hidden |  | tooltip "Decrease value"; handlers jq:touchmove,jq:mousemove,jq:touchcancel,jq:mouseout,jq:touchend |
| [ctl:PrimaryDiagnosis_QualifierHelp] | button | HELP |  | hidden |  | tooltip "DX Code List qualifier identifying a specific indu…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:PrimaryDiagnosis_Qualifier_ID] | text | Qual DX Code List qualifier identifying … |  | hidden, readonly |  | handlers onmouseover,jq:keypress,jq:focus,jq:blur |
| [ctl:PrimaryDiagnosis_CodeHelp] | button | HELP |  | hidden |  | tooltip "The major or primary diagnosis for this claim"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:PrimaryDiagnosis_Code] | text | Code The major or primary diagnosis for … |  | hidden, readonly | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keypress,jq:change,jq:keyup,jq:focus,jq:blur |
| [ctl:View_ExceptionErrorCodeHelp] | button | HELP |  | hidden |  | tooltip "Code used to identify the failed edit or audit."; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_ExceptionErrorCode_ID] | text | Exp Error Code Code used to identify the… |  | hidden, readonly |  | handlers onmouseover,jq:keypress,jq:focus,jq:blur |
| [ctl:View_DepartmentHelp] | button | HELP |  | hidden |  | tooltip "Identifies the current department to which the cla…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_Department] | text | Department Identifies the current depart… |  | hidden, readonly | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keypress,jq:change,jq:keyup,jq:focus,jq:blur |
| [ctl:View_LocationHelp] | button | HELP |  | hidden |  | tooltip "Identifies the current location to which the claim…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:View_Location] | text | Location Identifies the current location… |  | hidden, readonly | maxlength 50; data-val: length-max,regex,regex-pattern | handlers jq:keypress,jq:change,jq:keyup,jq:focus,jq:blur |
| [ctl:EmergencyIndicator] | checkbox | Emergency | unchecked | hidden | type=checkbox | handlers jq:change,jq:keypress,jq:keyup,jq:blur |
| [ctl:EmergencyIndicatorHelp] | button | HELP |  | hidden |  | tooltip "Indicates whether service was provided as a result…"; handlers jq:touchstart,jq:click,jq:keypress,jq:mouseover,jq:mouseout |
| [ctl:button-22] | button |  |  | hidden |  | handlers onclick,onkeypress |
| [ctl:button-close-8] | button | Close |  | hidden |  |  |
| [ctl:link-back-to-top] | link | Back to Top |  | hidden |  | anchor |
| [ctl:link-back-to-top-2] | link | Back to Top |  | hidden |  | anchor |
| [ctl:link-back-to-top-3] | link | Back to Top |  | hidden |  | anchor |
| [ctl:button-disclaimer] | button | Disclaimer |  |  |  | handlers onclick,onkeypress |
| [ctl:button-website-requirements] | button | Website Requirements |  |  |  | handlers onclick,onkeypress |
| [ctl:button-privacy-policy] | button | Privacy Policy |  |  |  | handlers onclick,onkeypress |
| [ctl:button-cookie-policy] | button | Cookie Policy |  |  |  | handlers onclick,onkeypress |
| [ctl:link-back-to-top-4] | link | Back to Top |  | hidden |  | anchor; tooltip "Back to Top"; handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-23] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ClaimIdentifiersList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:24ca9f46-c314-4f1e-9e04-ccaefd501ca0] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-icn] | button | ICN |  | hidden |  |  |
| [ctl:button-mco-icn] | button | MCO ICN |  | hidden |  |  |
| [ctl:button-tcn] | button | TCN |  | hidden |  |  |
| [ctl:button-select-a-value-icnmco-icntcnno-d] | button | select a value...ICNMCO ICNTCNNo Data Fo… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:DateTypeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-service-date] | button | Service Date |  | hidden |  |  |
| [ctl:button-paid-date] | button | Paid Date |  | hidden |  |  |
| [ctl:button-receipt-date] | button | Receipt Date |  | hidden |  |  |
| [ctl:button-service-datepaid-datereceipt-dat] | button | Service DatePaid DateReceipt DateNo Data… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:MemberByList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:9f719bbc-ba12-46a4-b10c-0ca1da5fcb76] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-id] | button | ID |  | hidden |  |  |
| [ctl:button-name] | button | Name |  | hidden |  |  |
| [ctl:button-patient-acct] | button | Patient Acct |  | hidden |  |  |
| [ctl:button-select-a-value-idnamepatient-acc] | button | select a value...IDNamePatient AcctNo Da… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ProviderRoleList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:33a8abb4-3f31-4820-94c9-1762d793b4f3] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-billing] | button | Billing |  | hidden |  |  |
| [ctl:button-performing] | button | Performing |  | hidden |  |  |
| [ctl:button-referring] | button | Referring |  | hidden |  |  |
| [ctl:button-attending] | button | Attending |  | hidden |  |  |
| [ctl:button-24] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ProviderByList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-npi] | button | NPI |  | hidden |  |  |
| [ctl:button-provider-id] | button | Provider ID |  | hidden |  |  |
| [ctl:button-name-2] | button | Name |  | hidden |  |  |
| [ctl:button-tax-id] | button | Tax ID |  | hidden |  |  |
| [ctl:button-taxonomy] | button | Taxonomy |  | hidden |  |  |
| [ctl:button-npiprovider-idnametax-idtaxonomy] | button | NPIProvider IDNameTax IDTaxonomyNo Data … |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ClaimTypeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:ae9a0f49-8b60-4363-a32c-d00f4787c083] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-inpatient] | button | Inpatient |  | hidden |  |  |
| [ctl:button-inpatient-crossover] | button | Inpatient Crossover |  | hidden |  |  |
| [ctl:button-medical] | button | Medical |  | hidden |  |  |
| [ctl:button-medical-crossover] | button | Medical Crossover |  | hidden |  |  |
| [ctl:button-medical-2] | button | Medical |  | hidden |  |  |
| [ctl:button-outpatient] | button | Outpatient |  | hidden |  |  |
| [ctl:button-dental] | button | Dental |  | hidden |  |  |
| [ctl:button-pharmacy] | button | Pharmacy |  | hidden |  |  |
| [ctl:button-inpatient-2] | button | Inpatient |  | hidden |  |  |
| [ctl:button-25] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ClaimSubTypeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:0304bd88-42a6-4071-8ade-9ac7ef7602a0] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-finance] | button | Finance |  | hidden |  |  |
| [ctl:button-home-health] | button | Home Health |  | hidden |  |  |
| [ctl:button-compound] | button | Compound |  | hidden |  |  |
| [ctl:button-skilled-nursing-facility] | button | Skilled Nursing Facility |  | hidden |  |  |
| [ctl:button-durable-medical-equipment] | button | Durable Medical Equipment |  | hidden |  |  |
| [ctl:button-orthodontia] | button | Orthodontia |  | hidden |  |  |
| [ctl:button-hospice-care] | button | Hospice Care |  | hidden |  |  |
| [ctl:button-cross-over] | button | Cross Over |  | hidden |  |  |
| [ctl:button-diet-nutrition] | button | Diet\Nutrition |  | hidden |  |  |
| [ctl:button-laboratory] | button | Laboratory |  | hidden |  |  |
| [ctl:button-non-medical] | button | Non Medical |  | hidden |  |  |
| [ctl:button-pediatric] | button | Pediatric |  | hidden |  |  |
| [ctl:button-rehabilitation] | button | Rehabilitation |  | hidden |  |  |
| [ctl:button-speech-hearing] | button | Speech/Hearing |  | hidden |  |  |
| [ctl:button-speciality-rn] | button | Speciality - RN |  | hidden |  |  |
| [ctl:button-supplier] | button | Supplier |  | hidden |  |  |
| [ctl:button-surgery] | button | Surgery |  | hidden |  |  |
| [ctl:button-technicians] | button | Technicians |  | hidden |  |  |
| [ctl:button-transportation] | button | Transportation |  | hidden |  |  |
| [ctl:button-vision] | button | Vision |  | hidden |  |  |
| [ctl:button-disabilities] | button | Disabilities |  | hidden |  |  |
| [ctl:button-psychiatric] | button | Psychiatric |  | hidden |  |  |
| [ctl:button-respite] | button | Respite |  | hidden |  |  |
| [ctl:button-substance-abuse-disorder-rehabil] | button | Substance Abuse Disorder Rehabilitation … |  | hidden |  |  |
| [ctl:button-26] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ClaimStatusList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:cfbcd822-7858-487a-bc1e-5b2d8b4cb887] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-denied] | button | Denied |  | hidden |  |  |
| [ctl:button-paid] | button | Paid |  | hidden |  |  |
| [ctl:button-suspended] | button | Suspended |  | hidden |  |  |
| [ctl:button-adjusted] | button | Adjusted |  | hidden |  |  |
| [ctl:button-voided] | button | Voided |  | hidden |  |  |
| [ctl:button-in-process] | button | In Process |  | hidden |  |  |
| [ctl:button-27] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ClaimSourceCodeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:f4c0caa8-e117-4cf5-b326-64dc4841daf8] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-hipaa-transaction] | button | HIPAA Transaction |  | hidden |  |  |
| [ctl:button-manual-entry] | button | Manual Entry |  | hidden |  |  |
| [ctl:button-test] | button | Test |  | hidden |  |  |
| [ctl:button-testing] | button | Testing |  | hidden |  |  |
| [ctl:button-test-2] | button | Test |  | hidden |  |  |
| [ctl:button-28] | button |  |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:PayToList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:fd6549e2-4817-4c7b-ae8e-4fc41f66fd53] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-alternate-payee] | button | Alternate Payee |  | hidden |  |  |
| [ctl:button-member-4] | button | Member |  | hidden |  |  |
| [ctl:button-provider-2] | button | Provider |  | hidden |  |  |
| [ctl:button-select-a-value-alternate-payeeme] | button | select a value...Alternate PayeeMemberPr… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ServiceTypeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:4ce486c0-5658-4f7b-b03d-8eeb03f4c97b] | button | select a value... |  | hidden |  | handlers jq:touchend,jq:click,jq:mouseout,jq:mouseover |
| [ctl:button-surgery-2] | button | Surgery |  | hidden |  |  |
| [ctl:button-medical-3] | button | Medical |  | hidden |  |  |
| [ctl:button-laboratory-2] | button | Laboratory |  | hidden |  |  |
| [ctl:button-select-a-value-surgerymedicallab] | button | select a value...SurgeryMedicalLaborator… |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:DiagnosisTypeList-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-icd-9-cm] | button | ICD-9-CM |  | hidden |  |  |
| [ctl:button-icd-10-cm] | button | ICD-10-CM |  | hidden |  |  |
| [ctl:button-icd-9-cmicd-10-cmno-data-found] | button | ICD-9-CMICD-10-CMNo Data Found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:e1c7f776-41c3-4e0f-9431-8a5890741387-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-5] | button | 5 |  | hidden |  |  |
| [ctl:9ed7f694-9eba-41f0-8700-a0cf873a73c4] | button | 10 |  | hidden |  |  |
| [ctl:button-20] | button | 20 |  | hidden |  |  |
| [ctl:button-no-data-found-51020] | button | No data found.51020 |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ProviderTaxonomy-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:Modifiers1-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-2] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:Modifiers2-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-3] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:Modifiers3-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-4] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:Modifiers4-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-5] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ToothNumberFrom-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-6] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ToothNumberTo-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-7] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:ExceptionErrorCode-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-8] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:PrimaryDiagnosisCodeICD09-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |
| [ctl:button-no-data-found-9] | button | No data found |  | hidden |  | handlers jq:mouseover,jq:wheel,jq:mouseout,jq:mousedown |
| [ctl:PrimaryDiagnosisCodeICD10-list] | button |  |  | hidden |  | handlers jq:click,jq:mouseover,jq:mouseout |

Full detail per control (computed style, selector, box, options, inline handlers): `capture/controls.json`.

## 6. Validation

HTML5 / MVC rules on: [ctl:SearchICN], [ctl:TCN], [ctl:MCOICN], [ctl:FromDate], [ctl:ToDate], [ctl:MemberID], [ctl:MemberName], [ctl:PatientAccountNumber], [ctl:NPI], [ctl:ProviderName], [ctl:ProviderTaxonomy], [ctl:ProviderTaxID], [ctl:ProviderID], [ctl:ProviderLocationID], [ctl:Modifiers1], [ctl:Modifiers2], [ctl:Modifiers3], [ctl:Modifiers4], [ctl:ExceptionErrorCode], [ctl:AuthorizationNumber], [ctl:OperatorIdentifier], [ctl:RANumber], [ctl:text-range-from], [ctl:TotalBilledRangeFrom], [ctl:text-range-to], [ctl:TotalBilledRangeTo], [ctl:ProcCodeFrom], [ctl:ProcCodeTo], [ctl:ToothNumberFrom], [ctl:ToothNumberTo], [ctl:PrimaryDiagnosisCodeICD09], [ctl:PrimaryDiagnosisCodeICD10], [ctl:text-page], [ctl:View_MemberName], [ctl:View_MemberDOB], [ctl:View_BillingProviderName], [ctl:View_BillingProviderTaxId], [ctl:text-total-allowed-amount-calculated-], [ctl:View_TotalAllowedAmount], [ctl:text-total-copay-amount-of-money-the-], [ctl:View_TotalCopayAmount], [ctl:text-total-coinsurance-the-amount-bas], [ctl:View_TotalCoinsuranceAmount], [ctl:text-total-deductible-amount-of-money], [ctl:View_TotalDeductibleAmount], [ctl:text-total-spenddown-amount-of-money-], [ctl:View_TotalSpenddownAmount], [ctl:PrimaryDiagnosis_Code], [ctl:View_Department], [ctl:View_Location] (see §5 rules).

## 7. Interaction styles (measured on the live page)
No hover/focus style changes measured.

Legacy CSS rules for states (`:hover :focus :active :disabled .aspNetDisabled …`) that apply to controls (full list: `capture/pseudo.json`):
- [ctl:link-messages], [ctl:link-external-links], [ctl:link-favorites], [ctl:link-contact-us], [ctl:link-my-account], [ctl:link-logout], [ctl:link-claims-management-2]: `.k-link, .k-link:hover { color: inherit; text-decoration: none; outline: 0px; cursor: pointer; }` `.k-link, .k-link:hover { color: inherit; text-decoration: none; outline: 0px; cursor: pointer; }` `a, a:link, a:hover, a:visited { background-color: transparent; color: var(--gw-color-neutral-8); }` `a:link, a:visited, a.common-page-link:link, a.common-page-link:visited { text-decoration: none; }`
- [ctl:button-select], [ctl:button-select-2], [ctl:button-select-3], [ctl:button-select-4], [ctl:button-select-5], [ctl:button-select-6], [ctl:button-select-8], [ctl:button-select-9], [ctl:button-select-10], [ctl:button-select-11], [ctl:button-select-12], [ctl:button-select-13], [ctl:button-select-14], [ctl:resetButton], [ctl:cancelButton], [ctl:nextButton]: `.k-button:disabled, .k-button.k-disabled { box-shadow: none; }` `.k-button:hover, .k-button:focus { text-decoration: none; outline: 0px; }` `.k-button:hover, .k-button.k-hover, .k-button.k-button-base:hover, .k-… { border-color: var(--kendo-color-border, rgba(0, 0, 0, 0.08)); color: var(--kendo-color-on-base, #3d3d3d); background-col… }` `.k-button:focus, .k-button.k-focus, .k-button.k-button-base:focus, .k-… { box-shadow: 0 0 0 2px color-mix(in srgb, var(--kendo-color-on-app-surface, #3d3d3d) 8%, transparent); }`
- [ctl:AAGMenu.BroadcastMsg], [ctl:AAGMenu.ExternalLinks], [ctl:AAGMenu.Favorites], [ctl:AAGMenu.ContactUs], [ctl:AAGMenu.MyAccount], [ctl:AAGMenu.Logout], [ctl:activeModuleMenuFirstItem]: `.k-menu:not(.k-context-menu) > .k-item:hover, .k-menu:not(.k-context-m… { color: var(--kendo-color-on-app-surface, #3d3d3d); }` `.k-menu:not(.k-context-menu) > .k-item:active, .k-menu:not(.k-context-… { color: var(--kendo-color-primary-on-surface, #ff6358); }` `.k-menu:not(.k-context-menu) > .k-item:focus, .k-menu:not(.k-context-m… { box-shadow: inset 0 0 0 2px var(--kendo-color-border-alt, rgba(0, 0, 0, 0.16)); }` `.k-menu:not(.k-context-menu) > .k-item:hover, .k-menu:not(.k-context-m… { color: var(--kendo-color-on-app-surface, #3d3d3d); }`
- [ctl:combobox-search-by-search-for-claims-by-i], [ctl:combobox-choose-date-type-search-for-clai], [ctl:combobox-choose-member-by-search-for-clai], [ctl:combobox-choose-provider-role-search-for-], [ctl:combobox-claim-type-indicates-the-type-of], [ctl:combobox-sub-type-indicates-additional-qu], [ctl:combobox-status-identifies-the-status-of-], [ctl:combobox-claim-source-code-indicates-the-], [ctl:combobox-pay-to-indicates-who-is-paid-whe], [ctl:combobox-svc-type-the-type-of-service-ass], [ctl:combobox-choose-dx-type]: `.k-input::placeholder, .k-picker::placeholder { color: var(--kendo-color-subtle, #666666); opacity: 1; user-select: none; }` `.k-picker:hover, .k-picker.k-hover, .k-picker.k-picker-solid:hover, .k… { border-color: var(--kendo-color-border, rgba(0, 0, 0, 0.08)); color: var(--kendo-color-on-base, #3d3d3d); background-col… }` `.k-picker:focus, .k-picker.k-focus, .k-picker.k-picker-solid:focus, .k… { box-shadow: 0 0 0 2px color-mix(in srgb, var(--kendo-color-on-app-surface, #3d3d3d) 8%, transparent); }` `.k-picker:focus-within, .k-picker.k-picker-solid:focus-within { box-shadow: 0 0 0 2px color-mix(in srgb, var(--kendo-color-on-app-surface, #3d3d3d) 8%, transparent); }`
- [ctl:FromDate], [ctl:ToDate], [ctl:Modifiers1], [ctl:Modifiers2], [ctl:Modifiers3], [ctl:Modifiers4], [ctl:ExceptionErrorCode], [ctl:AuthorizationNumber], [ctl:OperatorIdentifier], [ctl:RANumber], [ctl:text-range-from], [ctl:text-range-to], [ctl:ProcCodeFrom], [ctl:ProcCodeTo], [ctl:ToothNumberFrom], [ctl:ToothNumberTo], [ctl:PrimaryDiagnosisCodeICD10]: `.k-input-inner::placeholder { color: var(--kendo-color-subtle, #666666); opacity: 1; user-select: none; }` `.k-input-inner:invalid { box-shadow: none; }` `.k-input-inner::placeholder { color: var(--kendo-color-subtle, #666666); opacity: 1; user-select: none; }` `.k-input-inner:invalid { box-shadow: none; }`
- [ctl:link-client-logo], [ctl:button-disclaimer], [ctl:button-website-requirements], [ctl:button-privacy-policy], [ctl:button-cookie-policy]: `a, a:link, a:hover, a:visited { background-color: transparent; color: var(--gw-color-neutral-8); }` `a:link, a:visited, a.common-page-link:link, a.common-page-link:visited { text-decoration: none; }` `a:focus, a.common-page-link:focus { outline: var(--widget-focus-outline); box-shadow: var(--widget-focus-box-shadow) !important; }` `a:hover, a.common-page-link:hover { text-decoration: underline; }`
- [ctl:button-medicaid-management-solutions]: `.app-title:focus { outline: rgb(46, 171, 255) solid 0.2rem; }`
- [ctl:ClaimIdentifiersHelp], [ctl:DateTypeHelp], [ctl:FromDateHelp], [ctl:ToDateHelp], [ctl:MemberByHelp], [ctl:ProviderRoleHelp], [ctl:ClaimTypeHelp], [ctl:ClaimSubTypeHelp], [ctl:ClaimStatusHelp], [ctl:ClaimSourceCodeHelp], [ctl:PayToHelp], [ctl:ServiceTypeHelp], [ctl:Modifiers1Help], [ctl:Modifiers2Help], [ctl:Modifiers3Help], [ctl:Modifiers4Help], [ctl:ExceptionErrorCodeHelp], [ctl:AuthorizationNumberHelp], [ctl:OperatorIdentifierHelp], [ctl:RANumberHelp], [ctl:TotalBilledHelp], [ctl:col-md-3_editor-colProcCodeHelp], [ctl:col-md-3_editor-colToothNoHelp], [ctl:editor-colPriDXCodeHelp]: `.editor-icon:hover { color: var(--widget-icon-help); }`
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
- `js/inline-100.js`
- `js/inline-101.js`
- `js/inline-102.js`
- `js/inline-103.js`
- `js/inline-104.js`
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
- `js/inline-25.js`
- `js/inline-26.js`
- `js/inline-27.js`
- `js/inline-28.js`
- `js/inline-29.js`
- `js/inline-3.js`
- `js/inline-30.js`
- `js/inline-31.js`
- `js/inline-32.js`
- `js/inline-33.js`
- `js/inline-34.js`
- `js/inline-35.js`
- `js/inline-36.js`
- `js/inline-37.js`
- `js/inline-38.js`
- `js/inline-39.js`
- `js/inline-4.js`
- `js/inline-40.js`
- Hidden fields (page state): ClaimIdentifiers.ID="", ClaimIdentifiers.Name="", ClaimIdentifiers.DisplayFormat="Name", ClaimIdentifiers.Name="", DateType.ID="DOS", DateType.Name="Service Date", DateType.DisplayFormat="Name", DateType.Name="", MemberBy.ID="", MemberBy.Name="", MemberBy.DisplayFormat="Name", MemberBy.Name="", ProviderRole.ID="", ProviderRole.Name="", ProviderRole.DisplayFormat="Name", ProviderRole.Name="", ProviderBy.ID="", ProviderBy.Name="", ProviderBy.DisplayFormat="Name", ProviderBy.Name="", ClaimType.ID="", ClaimType.Name="", ClaimType.DisplayFormat="Name", ClaimSubType.ID="", ClaimSubType.Name="", ClaimSubType.DisplayFormat="Name", ClaimStatus.ID="", ClaimStatus.Name="", ClaimStatus.DisplayFormat="Name", ClaimSourceCode.ID="", ClaimSourceCode.Name="", ClaimSourceCode.DisplayFormat="Name", PayTo.ID="", PayTo.Name="", PayTo.DisplayFormat="Name", ServiceType.ID="", ServiceType.Name="", ServiceType.DisplayFormat="Name", ClaimType.Name="", ClaimSubType.Name="", ClaimStatus.Name="", ClaimSourceCode.Name="", PayTo.Name="", ServiceType.Name="", DiagnosisType.ID="02", DiagnosisType.Name="ICD-10-CM", DiagnosisType.DisplayFormat="Name", DiagnosisType.Name="", Editor.Alt1ActionText="", Editor.Alt1ActionUrl="", Editor.Alt2ActionText="", Editor.Alt2ActionUrl="", Editor.Alt3ActionText="", Editor.Alt3ActionUrl="", Editor.Alt4ActionText="", Editor.Alt4ActionUrl="", Editor.Alt5ActionText="", Editor.Alt5ActionUrl="", Editor.Alt6ActionText="", Editor.Alt6ActionUrl="", Editor.Alt7ActionText="", Editor.Alt7ActionUrl="", Editor.Alt8ActionText="", Editor.Alt8ActionUrl="", Editor.CancelActionText="Cancel", Editor.CancelActionUrl="/Home/MyHome/", Editor.ConfirmDeleteMessage="Are you sure you want to delete the ?", Editor.DeleteActionText="Delete", Editor.DeletedMessage="was successfully deleted.", Editor.Direction="Next", Editor.DirtyDataMessage="Form data has changed and has not been s…", Editor.EntityName="", Editor.IsAlt1Enabled="False", Editor.IsAlt2Enabled="False", Editor.IsAlt3Enabled="False", Editor.IsAlt4Enabled="False", Editor.IsAlt5Enabled="False", Editor.IsAlt6Enabled="False", Editor.IsAlt7Enabled="False", Editor.IsAlt8Enabled="False", Editor.IsCancelEnabled="True", Editor.IsDirtyDataEnabled="False", Editor.IsPrintEnabled="False", Editor.IsProcessDirty="False", Editor.IsResetEnabled="True", Editor.Mode="Create", Editor.NextActionText="Next", Editor.PrevActionText="Prev", Editor.PrintActionText="", Editor.PrintActionUrl="", Editor.ResetActionText="Reset", Editor.SaveActionText="Search", Editor.SavedMessage="was successfully saved.", Editor.ShowSummaryError="True", Editor.Step="1", Editor.StepCount="1", Editor.TitleFormatText="{0} {1} - Step {2} of {3}", ="", PrimaryDiagnosis.CodeDescr="", ="", ="", EmergencyIndicator="false"

## 15. Motion (what moves, measured on the live page)
The page was warmed up, then sampled for 0s. Setup comes from the page itself (library config, CSS), speed and rhythm from measurement. Every entry has an id; the spec must cite each as `[M01]` in its Motion section.

- **[M01]** CSS animation `autoFillEnd` on 25 element(s), e.g. `#FromDate_parent > div:nth-of-type(2) > span:nth-of-type(1)` (197×40): duration 0s, delay 0s, iterations 1, easing ease, fill none, direction normal; keyframes: `@keyframes autoFillEnd { }`

Transitions (applied when an element changes state, e.g. hover; informational, not cited):
| property | duration | easing | delay | elements | e.g. |
|---|---|---|---|---|---|
| color, background-color, border-color, box-shadow,… | 0.15s, 0.15s, 0.15s, 0.15s, 0.15s | cubic-bezier(0, 0, 0.58, 1), cubic-bezie… | 0s, 0s, 0s, 0s, 0s | 55 | `#extLinksCloseButton` |
| color, background-color, border-color, box-shadow | 0.15s, 0.15s, 0.15s, 0.15s | cubic-bezier(0, 0, 0.58, 1), cubic-bezie… | 0s, 0s, 0s, 0s | 7 | `#AAGMenu\.BroadcastMsg` |
| transform | 0.2s | linear | 0s | 1 | `#pageHeader` |

Freeze state used for every picture: {"swiper":0,"slick":0,"owl":0,"animations":5,"clock":"paused","stillMoving":0}. A non-zero stillMoving means JS-driven motion the fake clock could not stop.
Full detail (keyframe lists of running animations, every sampled mover): `motion.json`.

## 18. Provider kit harvest (kit/screen.json)

Read from Kendo 2026.1.415 on the live page. The kit (src/kit) rebuilds every widget below: cite each as [kit:<id>].

- Title bar: module "?", title "Search Claims"
- [kit:k1] ClaimIdentifiersList (dropdown, placeholder "select a value...", 3 options: ICN | MCO ICN | TCN, help "Search for claims by ICN, TCN, or MCO ICN.")
- [kit:k2] DateTypeList (dropdown, 3 options: Service Date | Paid Date | Receipt Date, help "Search for claims by date of service (DOS), date received, or date paid.")
- [kit:k3] Date From (date, required, format MM/dd/yyyy, help "Date From is a required field.")
- [kit:k4] Date To (date, required, format MM/dd/yyyy, help "Date To is a required field.")
- [kit:k5] MemberByList (dropdown, placeholder "select a value...", 3 options: ID | Name | Patient Acct, help "Search for claims by Member ID, Member Name or Patient Account Number")
- [kit:k6] ProviderRoleList (dropdown, placeholder "select a value...", 4 options: Billing | Performing | Referring | Attending, help "Search for claims by billing provider, performing provider, or referring provider")
- [kit:k7] ProviderByList (dropdown, 5 options: NPI | Provider ID | Name | Tax ID | Taxonomy, help "Search for claims by National Provider Number (NPI), Provider Location ID, Provider Name, Provider Tax ID, or Provider Taxonomy")
- [kit:k8] ClaimTypeList (dropdown, placeholder "select a value...", 9 options: Inpatient | Inpatient Crossover | Medical | Medical Crossover | Medical | Outpatient | Dental | Pharmacy …, help "Indicates the type of claim. i.e. Medical, Inpatient, Outpatient, Pharmacy, Dental")
- [kit:k9] ClaimSubTypeList (dropdown, placeholder "select a value...", 24 options: Finance | Home Health | Compound | Skilled Nursing Facility | Durable Medical Equipment | Orthodontia | Hospice Care  | Cross Over …, help "Indicates additional qualifications of types of claims within the initial claim type i.e. DME, Home Health are valid subtypes for a medical claim type")
- [kit:k10] ClaimStatusList (dropdown, placeholder "select a value...", 6 options: Denied | Paid | Suspended | Adjusted | Voided | In Process, help "Identifies the status of the claim with the system i.e. Paid, Denied, Suspended, Voided, Adjusted.")
- [kit:k11] ClaimSourceCodeList (dropdown, placeholder "select a value...", 5 options: HIPAA Transaction | Manual Entry | Test | Testing | Test, help "Indicates the origin of the claim. i.e. HIPAA transaction, manual entry, batch entry.")
- [kit:k12] PayToList (dropdown, placeholder "select a value...", 3 options: Alternate Payee | Member | Provider, help "Indicates who is paid when the claim is resolved. i.e. Member, Provider, Provider Group, Practice Location")
- [kit:k13] ServiceTypeList (dropdown, placeholder "select a value...", 3 options: Surgery | Medical | Laboratory, help "The type of service associated with the major or primary procedure code for this claim.")
- [kit:k14] Range From (numeric, format c)
- [kit:k15] Range To (numeric, format c)
- [kit:k16] DiagnosisTypeList (dropdown, 2 options: ICD-9-CM | ICD-10-CM)
- [kit:k17] grid: ICN (sortable) (filter), Member ID (sortable), Billing Prov NPI (sortable), Claim Type (sortable), Claim SubType (sortable), Claim Status (sortable), Covered From (sortable), Covered To (sortable), Total Billed (sortable), Total Paid (sortable), Authorization Number (sortable), Paid Date (sortable) (filter), Claims id (sortable); page size 10
- [kit:k18] DOB (date, format MM/dd/yyyy, help "Member's date of birth.")
- [kit:k19] Total Allowed (numeric, format c, help "Amount calculated based on pricing fee schedule and business rules")
- [kit:k20] Total Copay (numeric, format c, help "Amount of money the member pays for services rendered, usually when you receive the service.")
- [kit:k21] Total Coinsurance (numeric, format c, help "The amount based on a percentage of the Provider's charge that is the member's responsibility.")
- [kit:k22] Total Deductible (numeric, format c, help "Amount of money the member is responsible for paying for services rendered.")
- [kit:k23] Total Spenddown (numeric, format c, help "Amount of money the member is responsible for paying for services rendered.")
- field ICN: validation regex "ICN contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field TCN: validation regex "TCN contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field MCOICN: validation regex "MCO ICN contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field FromDate: validation date "Date From must represent a valid date in the format 'MM/DD/YYYY'."; required "Date From is a required field."
- field ToDate: validation date "Date To must represent a valid date in the format 'MM/DD/YYYY'."; required "Date To is a required field."
- field MemberID: validation regex "Member ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field MemberName: validation regex "Member Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field PatientAccountNumber: validation regex "Patient Acct contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field NPI: validation regex "NPI contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field ProviderName: validation regex "Provider Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field ProviderTaxonomy: validation regex "Provider Taxonomy contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field ProviderTaxID: validation regex "Provider Tax ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field ProviderID: validation regex "Provider ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field ProviderLocationID: validation regex "Svc Location ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field ExceptionErrorCode: validation regex "Exp Error Code contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field AuthorizationNumber: validation regex "Prior Auth contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field OperatorIdentifier: validation regex "Operator ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field RANumber: validation regex "RA Number contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field TotalBilledRangeFrom: validation number "Range From is restricted to numeric values with at most 2 decimal places."; regex "Range From is restricted to numeric values with at most 2 decimal places."
- field TotalBilledRangeTo: validation number "Range To is restricted to numeric values with at most 2 decimal places."; regex "Range To is restricted to numeric values with at most 2 decimal places."
- field ProcCodeFrom: validation regex "From is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]."
- field ProcCodeTo: validation regex "To is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]."
- field ToothNumberFrom: validation regex "From is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]."
- field ToothNumberTo: validation regex "To is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]."
- field PrimaryDiagnosisCodeICD09: validation regex "Code contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field PrimaryDiagnosisCodeICD10: validation regex "Code contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field MemberName: validation regex "Member Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field MemberDOB: validation date "DOB must represent a valid date in the format 'MM/DD/YYYY'."
- field BillingProviderName: validation regex "Billing Prov Name contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field BillingProviderTaxId: validation regex "Billing Prov Tax ID contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field TotalAllowedAmount: validation number "Total Allowed is restricted to numeric values with at most 2 decimal places."; regex "Total Allowed is restricted to numeric values with at most 2 decimal places."
- field TotalCopayAmount: validation number "Total Copay is restricted to numeric values with at most 2 decimal places."; regex "Total Copay is restricted to numeric values with at most 2 decimal places."
- field TotalCoinsuranceAmount: validation number "Total Coinsurance is restricted to numeric values with at most 2 decimal places."; regex "Total Coinsurance is restricted to numeric values with at most 2 decimal places."
- field TotalDeductibleAmount: validation number "Total Deductible is restricted to numeric values with at most 2 decimal places."; regex "Total Deductible is restricted to numeric values with at most 2 decimal places."
- field TotalSpenddownAmount: validation number "Total Spenddown is restricted to numeric values with at most 2 decimal places."; regex "Total Spenddown is restricted to numeric values with at most 2 decimal places."
- field PrimaryDiagnosis.Code: validation regex "Code contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field Department: validation regex "Department contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- field Location: validation regex "Location contains invalid characters. The characters ; * ^ : ~ < > % are not allowed."
- Actions: reset "Reset", cancel "Cancel", search "Search"
- Search reveals nothing; calls no endpoint
- [kit:k17] after Search: 0 rows, page size 10; field types  (rows in the rebuild are synthetic)
- Side menu (shell, built by the kit): 181 links; opens by class display-flex + backdrop div.disabled-backdrop; closes by its X or a menu link (not Escape, not the backdrop)
