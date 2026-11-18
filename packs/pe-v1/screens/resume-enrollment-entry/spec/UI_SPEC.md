# UI SPEC — pe-v1/resume-enrollment-entry

> Source https://uximc.mms.tst.pgwcloud.net/ProviderEnrollment/ResumeSecureEnrollment · viewport 1920×1080 CSS px @ dpr 1 · legacy built with mvcUnobtrusive, jquery 3.7.1 · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file under `capture/` (or `sections/…`) · `[js:…]` · `[aspx:…]` · `[css:…]` · `[kit:k#]` provider kit widget · `[UNKNOWN: …]`

## 1. Overview
Resume Enrollment Entry: prompts for a previously-assigned Tracking Number and Password so the user can resume an in-progress enrollment application. [asset:sections/02-pagebody.png]

Primary tasks:
- Enter `TrackingNumber` and `Password`. [ctl:TrackingNumber]
- (Optional) Toggle password visibility via `PasswordVisibilityToggle`. [ctl:PasswordVisibilityToggle]
- Continue with `nextButton` (Resume) or leave with `cancelButton` (Cancel). [ctl:nextButton]
- Open the Forgot Password flow via `button-forgot-password`. [ctl:button-forgot-password]

## 2. Layout
Wrapped in the shared shell (see the home spec). [asset:sections/01-resume-enrollment-entry.png]

Content area scope for this spec: `#pageBody > main` (the form content). [asset:sections/02-pagebody.png]

Page: white background; content is a single bordered/shadowed panel inside `form#EnrollmentResume`, with a header row (“Resume Enrollment”) and form fields below. [asset:sections/02-pagebody.png]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Module bar | `div.menu` `{navigation-provider-enrol}` | 0,62,1920,32 | sections/01 | block | bg `rgb(0, 238, 174)` | [asset:sections/01-resume-enrollment-entry.png] |
| Screen title | `h1` `{activeScreen}` | 218,62,191,30 | sections/01 | inline | text “Resume Enrollment Entry” on module bar | [asset:sections/01-resume-enrollment-entry.png] |
| Form root | `form#EnrollmentResume` `{EnrollmentResume}` | 0,138,1920,479 | sections/02 | block | background `rgb(255,255,255)` | [asset:sections/02-pagebody.png] |
| Panel container | `.content-panel-container` | 30,138,1860,455 | sections/02 | block | border `0.666667px solid rgb(222,226,230)`, radius `10px`, shadow `rgba(0,0,0,0.08) 0px 8px 10px 1px`, padding-bottom `15px` | [asset:sections/02-pagebody.png] |
| Panel header | `.content-panel-hdr` | 31,139,1859,48 | sections/02 | flex row | bg `rgb(250,250,250)`, padding `12px 24px`, top radii `10px 10px 0 0` | [asset:sections/02-pagebody.png] |
| Footer | `footer` `{contentinfo}` | 0,618,1920,119 | sections/03 | block | dark bg `rgb(43, 58, 68)` subfooter | [asset:sections/03-disclaimer-the-website-is-prov.png] |

Responsive breakpoint: below `max-width: 1280px` the portal uses its “phone” branch for layout; this capture includes an additional profile state at 1272×588 CSS px @ dpr 1.5. [asset:kit/states/layout@client.png]

### 2.1 Resume Enrollment panel
- Panel title (verbatim) is “Resume Enrollment”, prefixed by a magenta required marker `*` (Font Awesome). [asset:sections/02-pagebody.png]
- A right-aligned legend reads `Required Fields ( * )`. [asset:sections/02-pagebody.png]
- Instruction paragraph (verbatim): “Enter your assigned Tracking Number and Password in order to resume enrollment.” [asset:sections/02-pagebody.png]
- Field order (top to bottom): Tracking Number, Password, Forgot Password link, action buttons (Cancel left, Resume right). [asset:sections/02-pagebody.png]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| `--font-base` | `Arial, "Helvetica Neue", Helvetica, sans-serif` | body + panel | [asset:sections/02-pagebody.png] |
| `--color-text` | `rgb(61, 61, 61)` | body text | [asset:sections/02-pagebody.png] |
| `--color-heading` | `rgb(43, 58, 68)` | headings, labels, input text | [ctl:TrackingNumber] |
| `--color-link` | `rgb(0, 98, 255)` | “Forgot Password?” link, outlined button | [ctl:button-forgot-password] |
| `--color-accent-required` | `rgb(203, 26, 198)` | required asterisks + legend | [asset:sections/02-pagebody.png] |
| `--color-accent-help` | `rgb(51, 129, 255)` | help icons | [ctl:TrackingNumberHelp] |
| `--color-panel-border` | `rgb(222, 226, 230)` | panel outline | [asset:sections/02-pagebody.png] |
| `--color-panel-header-bg` | `rgb(250, 250, 250)` | panel header row | [asset:sections/02-pagebody.png] |
| `--color-input-border` | `rgb(90, 105, 120)` | input outline (`span.k-input`) | [asset:sections/02-pagebody.png] |
| `--color-button-primary-bg` | `rgb(38, 143, 203)` | Resume button fill | [ctl:nextButton] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| `assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png` | shared shell header logo | 117×57 | raster logo | [asset:assets/_ext/mapssharedstorage01.blob.core.windows.net/finaltest/TenantContent/Commercial/Images/logo__3659ec6d.png] |
| `assets/webfonts/fa-solid-900.woff2` | icon font | n/a | required marker `*`, help icon `?`, password eye icon | [asset:assets/webfonts/fa-solid-900.woff2] |
| `assets/fonts/Poppins.woff` | web font | n/a | header/subfooter font | [asset:assets/fonts/Poppins.woff] |
| `assets/fonts/Poppins-Bold.woff` | web font | n/a | bold headings | [asset:assets/fonts/Poppins-Bold.woff] |

## 5. Components
React component tree (shared components marked *shared*):
- `ResumeEnrollmentEntryPage`
  - `Shell` *shared* (header, module menu, footer; not specified here) [ctl:link-logout]
  - `ResumeEnrollmentPanel`
    - `RequiredFieldsLegend` [asset:sections/02-pagebody.png]
    - `TrackingNumberField` [ctl:TrackingNumber]
    - `PasswordField` [ctl:Password]
    - `ForgotPasswordLink` [ctl:button-forgot-password]
    - `ActionsRow` (Cancel + Resume) [ctl:nextButton]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|
| `ResumeEnrollmentPanel` | none | none | `EnrollmentResume` | [ctl:TrackingNumber] |
| `TrackingNumberField` | value | none | `button-tracking-number-is-a-required-fi`, `TrackingNumberHelp`, `TrackingNumber` | [ctl:TrackingNumber] |
| `PasswordField` | value, visibility | `passwordVisible` | `button-password-is-a-required-field`, `PasswordHelp`, `Password`, `PasswordVisibilityToggle`, `PasswordVisibilityToggleIcon` | [ctl:Password] |
| `ActionsRow` | none | none | `cancelButton`, `nextButton` | [ctl:nextButton] |
| `ForgotPasswordLink` | none | none | `button-forgot-password` | [ctl:button-forgot-password] |
| `FooterLinks` *shared* | none | none | `button-disclaimer`, `button-website-requirements`, `button-privacy-policy`, `button-cookie-policy` | [ctl:button-disclaimer] |

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|
| `TrackingNumber` | `Tracking Number` | text | empty | yes | max length 10; numeric-only regex `^([0-9])*$` | `Tracking Number is a required field.`; `Tracking Number is restricted to numeric characters only [0-9].` | on Resume submit | [ctl:TrackingNumber, asset:kit/screen.json] |
| `Password` | `Password` | password | empty | yes | max length 20 | `Password is a required field.` | on Resume submit | [ctl:Password, asset:kit/screen.json] |

- THE SYSTEM SHALL render the required marker for `TrackingNumber` as control `button-tracking-number-is-a-required-fi` with tooltip text `Tracking Number is a required field.` [ctl:button-tracking-number-is-a-required-fi]
- THE SYSTEM SHALL render the required marker for `Password` as control `button-password-is-a-required-field` with tooltip text `Password is a required field.` [ctl:button-password-is-a-required-field]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|
| `trackingNumber` | string | empty | typing in `TrackingNumber` | value submitted on Resume | [ctl:TrackingNumber] |
| `password` | string | empty | typing in `Password` | value submitted on Resume | [ctl:Password] |
| `passwordVisible` | boolean | false | `PasswordVisibilityToggle` | `Password` input `type` + toggle icon class | [ctl:PasswordVisibilityToggle, js:js/bundles/app__9da9877b.js#togglePasswordVisibilityIcon] |

Hidden at load (facts §12):
None. [ctl:TrackingNumber]

## 8. Behavior
### 8.1 Resume Enrollment panel
- THE SYSTEM SHALL autofocus `TrackingNumber` on load. [ctl:TrackingNumber, asset:kit/screen.json]
- WHEN the user clicks `cancelButton` THE SYSTEM SHALL navigate to `/Home/MyHome/` in the same tab. [ctl:cancelButton, js:js/Scripts/hp.ua3.core.modelEditor__884a35a7.js#$(cancelButtonId).click]
- WHEN the user clicks `nextButton` THE SYSTEM SHALL validate the current editor step and call `editorNextPostValidate` when valid. [ctl:nextButton, js:js/Scripts/hp.ua3.core.modelEditor__884a35a7.js#$(nextButtonId).click]
- WHEN `editorNextPostValidate` runs THE SYSTEM SHALL call the Resume API and block the default form submit (returns `cancel = true`). [js:js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js#editorNextPostValidate]
- WHEN the Resume API call is made THE SYSTEM SHALL POST to `/api/ProviderEnrollment/Resume/` with content-type `application/x-www-form-urlencoded` and body `$(formId).serialize()`. [js:js/inline-12.js#resumeWebApiUrl, js:js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js#processEnrollmentResume]
- WHEN the Resume API result is valid THE SYSTEM SHALL submit navigation via `FormdDataPost(actionURL, EnrollmentApplicationId)` where `actionURL` defaults to `/ProviderEnrollment/CreateSecureEnrollment/` when `isSecure` is true. [js:js/inline-12.js#createSecureEnrollmentMvcUrl, js:js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js#performNavigation]
- WHEN the user activates `button-forgot-password` THE SYSTEM SHALL open modal overlay `ForgotPasswordForm` loading `/ProviderEnrollment/ForgotPassword/`. [ctl:button-forgot-password, js:js/inline-12.js#forgetPasswordMvcUrl, js:js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js#forgotPassword]

### 8.2 Tooltips
- WHEN the user hovers `TrackingNumberHelp` THE SYSTEM SHALL show a tooltip with content `Provider Enrollment Application Tracking ID` (portal tooltip `showAfter: 100ms`). [ctl:TrackingNumberHelp, asset:kit/screen.json]
- WHEN the user hovers `PasswordHelp` THE SYSTEM SHALL show a tooltip with content `Enter Password` (portal tooltip `showAfter: 100ms`). [ctl:PasswordHelp, asset:kit/screen.json]

### 8.3 Password visibility toggle
- WHEN the user activates `PasswordVisibilityToggle` (click or Space key) THE SYSTEM SHALL toggle the `Password` input `type` between `password` and `text` and toggle the icon class between `fa-eye-slash` and `fa-eye`. [ctl:PasswordVisibilityToggle, ctl:Password, js:js/bundles/app__9da9877b.js#togglePasswordVisibilityIcon]

### 8.4 Footer overlays (shared shell)
- WHEN the user activates `button-disclaimer` THE SYSTEM SHALL open modal overlay `SiteDisclaimerOverlay` loading `/Home/SiteDisclaimer/` (panel class `panelForm-col-3`). [ctl:button-disclaimer, asset:snapshot/rendered.html]
- WHEN the user activates `button-website-requirements` THE SYSTEM SHALL open modal overlay `SiteRequirementsOverlay` loading `/Home/SiteRequirements/` (panel class `panelForm-col-4`). [ctl:button-website-requirements, asset:snapshot/rendered.html]
- WHEN the user activates `button-privacy-policy` THE SYSTEM SHALL open modal overlay `SitePrivacyOverlay` loading `/Home/SitePrivacy/` (panel class `panelForm-col-4`). [ctl:button-privacy-policy, asset:snapshot/rendered.html]
- WHEN the user activates `button-cookie-policy` THE SYSTEM SHALL open modal overlay `SiteCookieOverlay` loading `/Home/SiteCookie/` (panel class `panelForm-col-3`). [ctl:button-cookie-policy, asset:snapshot/rendered.html]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|
| `cancelButton` | `/Home/MyHome/` | same tab (location change) | [ctl:cancelButton, js:js/Scripts/hp.ua3.core.modelEditor__884a35a7.js#$(cancelButtonId).click] |

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|
| `nextButton` (Resume) | `POST /api/ProviderEnrollment/Resume/` body = serialized form (includes `TrackingNumber`, `Password`, plus MVC editor hidden fields) | Stub `POST /api/ProviderEnrollment/Resume/` returning `{ IsValid, Data: { EnrollmentApplicationId, Message, IsCAQHEnrollment, CaqhId } }` | if `IsValid` then navigate via `FormdDataPost(actionURL, EnrollmentApplicationId)` | [ctl:nextButton, js:js/inline-12.js#resumeWebApiUrl, js:js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js#processEnrollmentResume] |
| Successful resume | `FormdDataPost(actionURL, EnrollmentApplicationId)` where default `actionURL` is `/ProviderEnrollment/CreateSecureEnrollment/` when `isSecure` is true | Preserve same post-navigation behavior | loads the next screen (server-rendered MVC page) | [js:js/inline-12.js#createSecureEnrollmentMvcUrl, js:js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js#performNavigation] |
| `button-forgot-password` | loads overlay from `/ProviderEnrollment/ForgotPassword/` | Stub modal body endpoint (if needed) | modal shown over current page | [ctl:button-forgot-password, js:js/inline-12.js#forgetPasswordMvcUrl] |

## 11. Accessibility
- `TrackingNumber` and `Password` appear in the accessibility tree as textboxes with the label text including the required marker (e.g. “* Tracking Number”). [asset:capture/aria.yml]
- The password visibility toggle icon has `role="button"` and `aria-label="Password visibility toggle"`. [asset:capture/aria.yml]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `packs/pe-v1/screens/resume-enrollment-entry/spec/parity.spec.ts` uses them:


- `pageBannerLogo` [ctl:pageBannerLogo]
- `button` [ctl:button]
- `button-medicaid-management-solutions` [ctl:button-medicaid-management-solutions]
- `button-2` [ctl:button-2]
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
- `button-8` [ctl:button-8]
- `activeModuleMenu` [ctl:activeModuleMenu]
- `activeModuleMenuFirstItem` [ctl:activeModuleMenuFirstItem]
- `button-help` [ctl:button-help]
- `button-tracking-number-is-a-required-fi` [ctl:button-tracking-number-is-a-required-fi]
- `TrackingNumberHelp` [ctl:TrackingNumberHelp]
- `TrackingNumber` [ctl:TrackingNumber]
- `button-password-is-a-required-field` [ctl:button-password-is-a-required-field]
- `PasswordHelp` [ctl:PasswordHelp]
- `Password` [ctl:Password]
- `PasswordVisibilityToggle` [ctl:PasswordVisibilityToggle]
- `PasswordVisibilityToggleIcon` [ctl:PasswordVisibilityToggleIcon]
- `button-forgot-password` [ctl:button-forgot-password]
- `cancelButton` [ctl:cancelButton]
- `nextButton` [ctl:nextButton]
- `button-disclaimer` [ctl:button-disclaimer]
- `button-website-requirements` [ctl:button-website-requirements]
- `button-privacy-policy` [ctl:button-privacy-policy]
- `button-cookie-policy` [ctl:button-cookie-policy]

Run: `TARGET=react URL=<rebuild url> npx playwright test packs/pe-v1/screens/resume-enrollment-entry/spec/parity.spec.ts`

## 13. Open questions
1. What UI is shown when `/api/ProviderEnrollment/Resume/` returns `IsValid: false` (inline field errors vs summary vs popup)? [UNKNOWN]
2. What are the exact fields in the serialized form that the Resume API requires beyond `TrackingNumber` + `Password` (which MVC editor hidden fields are required server-side)? [UNKNOWN]
3. What content and actions exist inside the `/ProviderEnrollment/ForgotPassword/` modal overlay? [UNKNOWN]

## 14. Motion
- THE SYSTEM SHALL include CSS animation `autoFillEnd` (duration 0s, delay 0s, iterations 1) as measured on the legacy page. [M01]
