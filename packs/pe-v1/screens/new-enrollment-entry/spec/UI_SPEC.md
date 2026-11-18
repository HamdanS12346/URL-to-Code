# UI SPEC — pe-v1/new-enrollment-entry

> Source https://uximc.mms.tst.pgwcloud.net/ProviderEnrollment/CreateSecureEnrollment · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive, jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file under `capture/` (or `sections/…`) · `[js:…]` · `[aspx:…]` · `[css:…]` · `[kit:k#]` provider kit widget · `[UNKNOWN: …]`

## 1. Overview
New Enrollment Entry registration form that captures login credentials (email + password) and whether the enrollment is a change of ownership, so the user can register and receive a tracking number to resume later. [asset:sections/02-pagebody.png]

Primary tasks:
- Enter `EnrollmentCreateCredentials_EmailAddress` and `EnrollmentCreateCredentials_EmailAddressConfirmation`. [ctl:EnrollmentCreateCredentials_EmailAddress]
- Enter `EnrollmentCreateCredentials_Password` and `EnrollmentCreateCredentials_PasswordConfirmation`. [ctl:EnrollmentCreateCredentials_Password]
- (Optional) Enter `EnrollmentCreateCredentials_ProviderReference`. [ctl:EnrollmentCreateCredentials_ProviderReference]
- Choose `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes|IDNo`. [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo]
- Submit with `nextButton` (Register) or go back with `prevButton` (Previous). [ctl:nextButton]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/02-pagebody.png]

Content area scope for this spec: `#pageBody > main` (the form content). [asset:sections/02-pagebody.png]

Page: white background; content is a single bordered/shadowed panel inside `form#CreateEnrollmentForm`, with a header row (“Registration”) and form fields below. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Form root | `form#CreateEnrollmentForm` `{CreateEnrollmentForm}` | 0,138,1920,771 | sections/02 | block | background `rgb(255,255,255)` | [asset:sections/02-pagebody.png] |
| Panel container | `.content-panel-container` | 30,163,1860,721 | sections/02 | block | border `0.666667px solid rgb(222,226,230)`, radius `10px`, shadow `rgba(0,0,0,0.08) 0px 8px 10px 1px`, padding-bottom `15px` | [asset:sections/02-pagebody.png] |
| Panel header | `.content-panel-hdr` | 30,163,1859,48 | sections/02 | flex row | bg `rgb(250,250,250)`, padding `12px 24px`, top radii `10px 10px 0 0` | [asset:sections/02-pagebody.png] |
| Fields grid | registration fields area | [UNKNOWN: exact grid container key/box] | sections/02 | 2-column grid for email/password rows; full-width Provider Reference | inputs are `span.k-input` boxes with `40px` height and `5px` radius | [asset:sections/02-pagebody.png] |
| Actions | buttons row | [UNKNOWN: container key/box] | sections/02 | right-aligned | `prevButton` outlined; `nextButton` filled | [asset:sections/02-pagebody.png] |

### 2.1 Registration panel
- Panel title is “Registration”, prefixed by a magenta required marker `*` (Font Awesome). [asset:sections/02-pagebody.png]
- A right-aligned label reads `Required Fields ( * )`. [asset:sections/02-pagebody.png]
- Instruction paragraph (verbatim): “Register below to be assigned a unique enrollment tracking number. Be sure to write down your password. An email confirmation will be sent with the tracking number. If you don't submit your enrollment right away, you can use this tracking number and password to resume your enrollment application later.” [asset:sections/02-pagebody.png]
- Field layout (top to bottom): Email + Confirm Email; Password + Confirm Password; Provider Reference (full width); Change ownership radio group; Previous/Register buttons. [asset:sections/02-pagebody.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | `Arial, "Helvetica Neue", Helvetica, sans-serif` | body + form | [asset:sections/02-pagebody.png] |
| `--color-text` | `rgb(61, 61, 61)` | panel body text | [asset:sections/02-pagebody.png] |
| `--color-heading` | `rgb(43, 58, 68)` | field labels, buttons text | [asset:sections/02-pagebody.png] |
| `--color-accent-required` | `rgb(203, 26, 198)` | required asterisk + “Required Fields” | [asset:sections/02-pagebody.png] |
| `--color-accent-help` | `rgb(51, 129, 255)` | help icons | [ctl:EnrollmentCreateCredentials_EmailAddressHelp] |
| `--color-panel-border` | `rgb(222, 226, 230)` | panel outline | [asset:sections/02-pagebody.png] |
| `--color-panel-header-bg` | `rgb(250, 250, 250)` | panel header row | [asset:sections/02-pagebody.png] |
| `--color-input-border` | `rgb(90, 105, 120)` | text/password input outline | [ctl:EnrollmentCreateCredentials_EmailAddress] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117×57 | raster logo | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/webfonts/fa-solid-900.woff2` | icon font | n/a | used for required asterisk, help icon, etc. | [asset:assets/webfonts/fa-solid-900.woff2] |

## 5. Components
React component tree (shared components marked *shared*):
- `NewEnrollmentEntryPage`
  - `Shell` *shared* (header, module menu, footer; not specified here) [ctl:link-logout]
  - `RegistrationPanel`
    - `RequiredFieldsLegend` [asset:sections/02-pagebody.png]
    - `EmailRow`
      - `EmailField` [ctl:EnrollmentCreateCredentials_EmailAddress]
      - `ConfirmEmailField` [ctl:EnrollmentCreateCredentials_EmailAddressConfirmation]
    - `PasswordRow`
      - `PasswordField` [ctl:EnrollmentCreateCredentials_Password]
      - `ConfirmPasswordField` [ctl:EnrollmentCreateCredentials_PasswordConfirmation]
    - `ProviderReferenceField` [ctl:EnrollmentCreateCredentials_ProviderReference]
    - `ChangeOwnershipField` [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo]
    - `ActionButtons` [ctl:nextButton]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `Shell` (*shared*) | n/a | shared | `pageBannerLogo`, `link-messages`, `link-external-links`, `link-favorites`, `link-contact-us`, `link-my-account`, `link-logout`, footer buttons | [ctl:link-logout] |
| `RegistrationPanel` | none | none | `CreateEnrollmentForm` | [asset:sections/02-pagebody.png] |
| `EmailField` | value | local | `EnrollmentCreateCredentials_EmailAddress`, `EnrollmentCreateCredentials_EmailAddressHelp`, required marker `button-email-is-a-required-field` | [ctl:EnrollmentCreateCredentials_EmailAddress] |
| `ConfirmEmailField` | value | local | `EnrollmentCreateCredentials_EmailAddressConfirmation`, `EnrollmentCreateCredentials_EmailAddressConfirmationHelp`, required marker `button-confirm-email-is-a-required-fiel` | [ctl:EnrollmentCreateCredentials_EmailAddressConfirmation] |
| `PasswordField` | value | local | `EnrollmentCreateCredentials_Password`, `EnrollmentCreateCredentials_PasswordHelp`, required marker `button-password-is-a-required-field`, `button-fast-access-key-is-p`, `EnrollmentCreateCredentials_PasswordVisibilityToggle` | [ctl:EnrollmentCreateCredentials_Password] |
| `ConfirmPasswordField` | value | local | `EnrollmentCreateCredentials_PasswordConfirmation`, `EnrollmentCreateCredentials_PasswordConfirmationHelp`, required marker `button-confirm-password-is-a-required-f`, `EnrollmentCreateCredentials_PasswordConfirmationVisibilityToggle` | [ctl:EnrollmentCreateCredentials_PasswordConfirmation] |
| `ProviderReferenceField` | value | local | `EnrollmentCreateCredentials_ProviderReference`, `EnrollmentCreateCredentials_ProviderReferenceHelp` | [ctl:EnrollmentCreateCredentials_ProviderReference] |
| `ChangeOwnershipField` | value | local | required marker `button-do-you-need-to-change-ownership--2`, `Provider_ChangeOfOwnership_IsSecurePortalChowRequiredHelp`, `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes`, `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo` | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo] |
| `ActionButtons` | none | none | `prevButton`, `nextButton` | [ctl:nextButton] |

## 6. Fields & validation
### 6.1 Registration fields
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `EnrollmentCreateCredentials_EmailAddress` | `Email` | text | empty | yes | regex: email format `name@domain` | `Email is not a valid email address. Enter email with 'name@domain' format.` | `[UNKNOWN: on blur vs on submit]` | [ctl:EnrollmentCreateCredentials_EmailAddress] |
| `EnrollmentCreateCredentials_EmailAddressConfirmation` | `Confirm Email` | text | empty | yes | regex: email format `name@domain` | `Confirm Email is not a valid email address. Enter email with 'name@domain' format.` | `[UNKNOWN: on blur vs on submit]` | [ctl:EnrollmentCreateCredentials_EmailAddressConfirmation] |
| `EnrollmentCreateCredentials_Password` | `Password` | password | empty | yes | 8–20 chars; min 1 numeric, 1 uppercase, 1 lowercase; disallow `; * ^ : ~ < > %` | `Password must be 8 to 20 characters in length, contain a minimum of 1 numeric digit, 1 uppercase letter and 1 lowercase letter. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on submit]` | [ctl:EnrollmentCreateCredentials_Password] |
| `EnrollmentCreateCredentials_PasswordConfirmation` | `Confirm Password` | password | empty | yes | 8–20 chars; min 1 numeric, 1 uppercase, 1 lowercase; disallow `; * ^ : ~ < > %` | `Confirm Password must be 8 to 20 characters in length, contain a minimum of 1 numeric digit, 1 uppercase letter and 1 lowercase letter. The characters ; * ^ : ~ < > % are not allowed.` | `[UNKNOWN: on blur vs on submit]` | [ctl:EnrollmentCreateCredentials_PasswordConfirmation] |
| `EnrollmentCreateCredentials_ProviderReference` | `Provider Reference` | text | empty | no | max length 100 | n/a | `[UNKNOWN: on blur vs on submit]` | [ctl:EnrollmentCreateCredentials_ProviderReference] |
| `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes` | `Yes` | radio | unchecked | yes | group `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_ID` | n/a | `[UNKNOWN: on change vs on submit]` | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes] |
| `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo` | `No` | radio | checked | yes | group `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_ID` | n/a | `[UNKNOWN: on change vs on submit]` | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo] |

### 6.2 Required markers and help tooltips
These icons exist as separate controls with `title` text:

| key | appears next to | title (verbatim) | evidence |
|---|---|---|---|
| `button-email-is-a-required-field` | `Email` label | `Email is a required field.` | [ctl:button-email-is-a-required-field] |
| `EnrollmentCreateCredentials_EmailAddressHelp` | `Email` label | `The Application Tracking Number will be sent to this address.` | [ctl:EnrollmentCreateCredentials_EmailAddressHelp] |
| `button-confirm-email-is-a-required-fiel` | `Confirm Email` label | `Confirm Email is a required field.` | [ctl:button-confirm-email-is-a-required-fiel] |
| `EnrollmentCreateCredentials_EmailAddressConfirmationHelp` | `Confirm Email` label | `Enter the Email Address again to confirm it matches the previous entry.` | [ctl:EnrollmentCreateCredentials_EmailAddressConfirmationHelp] |
| `button-password-is-a-required-field` | `Password` label | `Password is a required field.` | [ctl:button-password-is-a-required-field] |
| `button-fast-access-key-is-p` | `Password` label | `Fast access key is 'P'.` | [ctl:button-fast-access-key-is-p] |
| `EnrollmentCreateCredentials_PasswordHelp` | `Password` label | `Passwords must be between 8 and 20 characters and include a minimum of one upper case letter, one lower case letter and one numeric digit` | [ctl:EnrollmentCreateCredentials_PasswordHelp] |
| `button-confirm-password-is-a-required-f` | `Confirm Password` label | `Confirm Password is a required field.` | [ctl:button-confirm-password-is-a-required-f] |
| `EnrollmentCreateCredentials_PasswordConfirmationHelp` | `Confirm Password` label | `Passwords must be between 8 and 20 characters and include a minimum of one upper case letter, one lower case letter and one numeric digit.` | [ctl:EnrollmentCreateCredentials_PasswordConfirmationHelp] |
| `EnrollmentCreateCredentials_ProviderReferenceHelp` | `Provider Reference` label | `Enter internal reference information to help you identify the enrollment, should not exceed 100 characters.` | [ctl:EnrollmentCreateCredentials_ProviderReferenceHelp] |
| `button-do-you-need-to-change-ownership--2` | `Do you need to change ownership?` label | `Do you need to change ownership? is a required field.` | [ctl:button-do-you-need-to-change-ownership--2] |
| `Provider_ChangeOfOwnership_IsSecurePortalChowRequiredHelp` | `Do you need to change ownership?` label | `Require Change of ownership` | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequiredHelp] |

### 6.3 Provider kit widgets on this page
The Provider portal kit rebuilds each widget below; the spec cites each widget id as required. [kit:k1]

| kit id | widget | kind | required | placeholder / format | options | evidence |
|---|---|---|---|---|---|---|
| `k1` | `What is the total % change of ownership?` | numeric | no | format `n0` | n/a | [kit:k1] |
| `k2` | `EnrollmentPreChecklist_EnrollmentTypeList` | dropdown | yes | placeholder `select a value...` | 7 options (`Individual`, `Facility`, `Group`, `Individual Within Group`, `Atypical Providers`, `Ordering, Prescribing, Referring`, `Test2025`) | [kit:k2] |
| `k3` | `EnrollmentPreChecklist_ProviderTypeList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k3] |
| `k4` | `EnrollmentPreChecklist_SpecialtyList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k4] |
| `k5` | `EnrollmentPreChecklist_ProgramTypeList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k5] |
| `k6` | `StatusList` | dropdown | no | placeholder `select a value...` | 13 options (starts `Approved`, `Requested`, `Expired`, `Partial`, `Pending` …) | [kit:k6] |
| `k7` | `EnrollmentCriteria_EnrollmentTypeList` | dropdown | yes | placeholder `select a value...` | 7 options (same list as `k2`) | [kit:k7] |
| `k8` | `EnrollmentCriteria_ProviderTypeList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k8] |
| `k9` | `Effective Date` | date | yes | format `MM/dd/yyyy` | n/a | [kit:k9] |
| `k10` | `Receipt Date` | date | yes | format `MM/dd/yyyy` | n/a | [kit:k10] |
| `k11` | `Provider_IndividualProvider_GenderList` | dropdown | no | placeholder `select a value...` | 3 options (`Unknown`, `Female`, `Male`) | [kit:k11] |
| `k12` | `Provider_IndividualProvider_EthnicityList` | dropdown | no | placeholder `select a value...` | 2 options (`Hispanic/Latino`, `Not Hispanic/Latino`) | [kit:k12] |
| `k13` | `Birth Date` | date | yes | format `MM/dd/yyyy` | n/a | [kit:k13] |
| `k14` | `Provider_CredentialTypeList` | dropdown | no | placeholder `select a value...` | 39 options (starts `Certified Registered Nurse Anesthetist`, `Doctor of Chiropractic`, …) | [kit:k14] |
| `k15` | `IRS Effective Date` | date | yes | format `MM/dd/yyyy` | n/a | [kit:k15] |
| `k16` | `Provider_PreferredCommunicationDetails_LanguageListList` | dropdown | yes | placeholder `select a value...` | 2 options (`English`, `Spanish`) | [kit:k16] |
| `k17` | `Provider_ProgramTypeList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k17] |
| `k18` | `ApplicantContact_Address_StatesList` | dropdown | yes | placeholder `select a value...` | 57 options (starts `Alabama`, `Alaska`, `American Samoa`, …) | [kit:k18] |
| `k19` | `ApplicantContact_Address_CountryList` | dropdown | yes | placeholder `select a value...` | 5 options (`United States`, `CANADA`, `MEXICO`, `COSTA RICA`, `COLOMBIA`) | [kit:k19] |
| `k20` | `ApplicantContact_PhoneNumberTypeList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k20] |
| `k21` | `ApplicantContact_PreferredCommunicationMethodList` | dropdown | yes | placeholder `select a value...` | [UNKNOWN: option list not enumerated in facts] | [kit:k21] |

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `changeOwnership` | enum (`Yes`/`No`) | `No` | change on radio group | which radio is checked | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo] |
| `email` | string | empty | typing | form values | [ctl:EnrollmentCreateCredentials_EmailAddress] |
| `confirmEmail` | string | empty | typing | form values | [ctl:EnrollmentCreateCredentials_EmailAddressConfirmation] |
| `password` | string | empty | typing | form values | [ctl:EnrollmentCreateCredentials_Password] |
| `confirmPassword` | string | empty | typing | form values | [ctl:EnrollmentCreateCredentials_PasswordConfirmation] |
| `providerReference` | string | empty | typing | form values | [ctl:EnrollmentCreateCredentials_ProviderReference] |

Hidden at load (facts §12):
None. [asset:sections/02-pagebody.png]

## 8. Behavior
No behavior observed (facts §8). [asset:sections/02-pagebody.png]

### 8.1 Scroll behavior
None. [asset:sections/02-pagebody.png]

### 8.2 Media
None. [asset:sections/02-pagebody.png]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `link-my-account` | `/Home/MyAccount` | same tab | [ctl:link-my-account] |
| `link-logout` | `/Security/LogoutFromMenu` | same tab | [ctl:link-logout] |
| `link-messages` | `javascript:getBroadcastMsg();` | same tab | [ctl:link-messages] |
| `link-external-links` | `javascript:toggleVisibilityStyle('divExternalLinks');` | same tab | [ctl:link-external-links] |
| `link-favorites` | `javascript:getFavorites();` | same tab | [ctl:link-favorites] |
| `link-contact-us` | `javascript:getContactUs();` | same tab | [ctl:link-contact-us] |
| `button-disclaimer` | `[UNKNOWN: destination/content]` | [UNKNOWN] | [ctl:button-disclaimer] |
| `button-website-requirements` | `[UNKNOWN: destination/content]` | [UNKNOWN] | [ctl:button-website-requirements] |
| `button-privacy-policy` | `[UNKNOWN: destination/content]` | [UNKNOWN] | [ctl:button-privacy-policy] |
| `button-cookie-policy` | `[UNKNOWN: destination/content]` | [UNKNOWN] | [ctl:button-cookie-policy] |

## 10. Server interactions
None observed (facts §9). [asset:sections/02-pagebody.png]

## 11. Accessibility
- Each input has a visible label immediately above it; required fields are marked with a preceding asterisk. [asset:sections/02-pagebody.png]
- Help icons are focusable/clickable elements with `role="img"` and `title` text. [ctl:EnrollmentCreateCredentials_EmailAddressHelp]
- Default tab order, error announcement behavior, and Enter-key submit behavior are not measured in this capture. [UNKNOWN: tab order and keyboard submit behavior]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/pe-v1/screens/new-enrollment-entry/spec/parity.spec.ts` uses them.

| key | what | evidence |
|---|---|---|
| `pageBannerLogo` | shared shell logo (image) | [ctl:pageBannerLogo] |
| `button` | shared shell control (unlabeled in this spec) | [ctl:button] |
| `button-medicaid-management-solutions` | shared shell control (unlabeled in this spec) | [ctl:button-medicaid-management-solutions] |
| `button-2` | shared shell control (unlabeled in this spec) | [ctl:button-2] |
| `AAGMenu.BroadcastMsg` | shared shell menu item container | [ctl:AAGMenu.BroadcastMsg] |
| `link-messages` | shared shell link “Messages” | [ctl:link-messages] |
| `AAGMenu.ExternalLinks` | shared shell menu item container | [ctl:AAGMenu.ExternalLinks] |
| `link-external-links` | shared shell link “External Links” | [ctl:link-external-links] |
| `AAGMenu.Favorites` | shared shell menu item container | [ctl:AAGMenu.Favorites] |
| `link-favorites` | shared shell link “Favorites” | [ctl:link-favorites] |
| `AAGMenu.ContactUs` | shared shell menu item container | [ctl:AAGMenu.ContactUs] |
| `link-contact-us` | shared shell link “Contact Us” | [ctl:link-contact-us] |
| `AAGMenu.MyAccount` | shared shell menu item container | [ctl:AAGMenu.MyAccount] |
| `AAGMenu.Logout` | shared shell menu item container | [ctl:AAGMenu.Logout] |
| `link-logout` | shared shell link “Logout” | [ctl:link-logout] |
| `button-main-menu-2` | shared shell hamburger/menu toggle | [ctl:button-main-menu-2] |
| `button-8` | shared shell module menu wrapper | [ctl:button-8] |
| `activeModuleMenu` | shared shell module menu list | [ctl:activeModuleMenu] |
| `activeModuleMenuFirstItem` | shared shell module menu first item (“Provider Enrollment”) | [ctl:activeModuleMenuFirstItem] |
| `button-help` | shared shell help/book icon button | [ctl:button-help] |
| `button-email-is-a-required-field` | required-marker icon next to Email | [ctl:button-email-is-a-required-field] |
| `EnrollmentCreateCredentials_EmailAddressHelp` | Email help icon | [ctl:EnrollmentCreateCredentials_EmailAddressHelp] |
| `EnrollmentCreateCredentials_EmailAddress` | Email textbox | [ctl:EnrollmentCreateCredentials_EmailAddress] |
| `button-confirm-email-is-a-required-fiel` | required-marker icon next to Confirm Email | [ctl:button-confirm-email-is-a-required-fiel] |
| `EnrollmentCreateCredentials_EmailAddressConfirmationHelp` | Confirm Email help icon | [ctl:EnrollmentCreateCredentials_EmailAddressConfirmationHelp] |
| `EnrollmentCreateCredentials_EmailAddressConfirmation` | Confirm Email textbox | [ctl:EnrollmentCreateCredentials_EmailAddressConfirmation] |
| `button-password-is-a-required-field` | required-marker icon next to Password | [ctl:button-password-is-a-required-field] |
| `button-fast-access-key-is-p` | Password “fast access key” icon | [ctl:button-fast-access-key-is-p] |
| `EnrollmentCreateCredentials_PasswordHelp` | Password help icon | [ctl:EnrollmentCreateCredentials_PasswordHelp] |
| `EnrollmentCreateCredentials_Password` | Password textbox | [ctl:EnrollmentCreateCredentials_Password] |
| `EnrollmentCreateCredentials_PasswordVisibilityToggle` | Password visibility toggle control | [ctl:EnrollmentCreateCredentials_PasswordVisibilityToggle] |
| `EnrollmentCreateCredentials_PasswordVisibilityToggleIcon` | Password visibility toggle icon | [ctl:EnrollmentCreateCredentials_PasswordVisibilityToggleIcon] |
| `button-confirm-password-is-a-required-f` | required-marker icon next to Confirm Password | [ctl:button-confirm-password-is-a-required-f] |
| `EnrollmentCreateCredentials_PasswordConfirmationHelp` | Confirm Password help icon | [ctl:EnrollmentCreateCredentials_PasswordConfirmationHelp] |
| `EnrollmentCreateCredentials_PasswordConfirmation` | Confirm Password textbox | [ctl:EnrollmentCreateCredentials_PasswordConfirmation] |
| `EnrollmentCreateCredentials_PasswordConfirmationVisibilityToggle` | Confirm Password visibility toggle control | [ctl:EnrollmentCreateCredentials_PasswordConfirmationVisibilityToggle] |
| `EnrollmentCreateCredentials_PasswordConfirmationVisibilityToggleIcon` | Confirm Password visibility toggle icon | [ctl:EnrollmentCreateCredentials_PasswordConfirmationVisibilityToggleIcon] |
| `EnrollmentCreateCredentials_ProviderReferenceHelp` | Provider Reference help icon | [ctl:EnrollmentCreateCredentials_ProviderReferenceHelp] |
| `EnrollmentCreateCredentials_ProviderReference` | Provider Reference textbox | [ctl:EnrollmentCreateCredentials_ProviderReference] |
| `button-do-you-need-to-change-ownership--2` | required-marker icon next to Change ownership question | [ctl:button-do-you-need-to-change-ownership--2] |
| `Provider_ChangeOfOwnership_IsSecurePortalChowRequiredHelp` | Change ownership help icon | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequiredHelp] |
| `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes` | Change ownership radio “Yes” | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes] |
| `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo` | Change ownership radio “No” | [ctl:Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDNo] |
| `nextButton` | primary action button “Register” | [ctl:nextButton] |
| `prevButton` | secondary action button “Previous” | [ctl:prevButton] |
| `button-disclaimer` | footer item “Disclaimer” | [ctl:button-disclaimer] |
| `button-website-requirements` | footer item “Website Requirements” | [ctl:button-website-requirements] |
| `button-privacy-policy` | footer item “Privacy Policy” | [ctl:button-privacy-policy] |
| `button-cookie-policy` | footer item “Cookie Policy” | [ctl:button-cookie-policy] |

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/pe-v1/screens/new-enrollment-entry/spec/parity.spec.ts`

## 13. Open questions
1. What happens when the user clicks `nextButton` (Register): request contract, server response, and next screen/route? [UNKNOWN]
2. What happens when the user clicks `prevButton` (Previous): navigation target and whether unsaved changes are confirmed? [UNKNOWN]
3. What additional fields/panels appear (if any) when `Provider_ChangeOfOwnership_IsSecurePortalChowRequired_IDYes` is selected? [UNKNOWN]
4. What is the exact behavior of `EnrollmentCreateCredentials_PasswordVisibilityToggle` / `EnrollmentCreateCredentials_PasswordConfirmationVisibilityToggle` (toggle type, persists, affects icon)? [UNKNOWN]
5. What content/destination is opened by footer buttons `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy`? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL apply CSS animation `autoFillEnd` on the registration input wrappers as captured (duration `0s`, delay `0s`, easing `ease`, iterations `1`, `@keyframes autoFillEnd { }`). [M01]
