# Checklist: New Enrollment Entry

Generated from the capture (kit/screen.json). Route: `#/new-enrollment-entry`.

## Done by the kit (do not rebuild)
- [x] k1: numeric "What is the total % change of ownership?"
- [x] k2: dropdown "EnrollmentPreChecklist_EnrollmentTypeList" (7 options)
- [x] k3: dropdown "EnrollmentPreChecklist_ProviderTypeList"
- [x] k4: dropdown "EnrollmentPreChecklist_SpecialtyList"
- [x] k5: dropdown "EnrollmentPreChecklist_ProgramTypeList"
- [x] k6: dropdown "StatusList" (13 options)
- [x] k7: dropdown "EnrollmentCriteria_EnrollmentTypeList" (7 options)
- [x] k8: dropdown "EnrollmentCriteria_ProviderTypeList"
- [x] k9: date "Effective Date"
- [x] k10: date "Receipt Date"
- [x] k11: dropdown "Provider_IndividualProvider_GenderList" (3 options)
- [x] k12: dropdown "Provider_IndividualProvider_EthnicityList" (2 options)
- [x] k13: date "Birth Date"
- [x] k14: dropdown "Provider_CredentialTypeList" (39 options)
- [x] k15: date "IRS Effective Date"
- [x] k16: dropdown "Provider_PreferredCommunicationDetails_LanguageListList" (2 options)
- [x] k17: dropdown "Provider_ProgramTypeList"
- [x] k18: dropdown "ApplicantContact_Address_StatesList" (57 options)
- [x] k19: dropdown "ApplicantContact_Address_CountryList" (5 options)
- [x] k20: dropdown "ApplicantContact_PhoneNumberTypeList" (7 options)
- [x] k21: dropdown "ApplicantContact_PreferredCommunicationMethodList" (2 options)
- [x] 2 radio / checkbox / dropdown effect(s) on hidden parts, measured on the live page and applied by the kit (do not write your own show/hide for them)
- [x] dialog placement by layout: below (max-width: 1280px) the portal's phone branch, above it centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] Reset: clears the fields
- [x] collapsible panels (chevrons)
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 13 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13): find in the script what shows each and build that
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/Common/hp.ua3.providerEnrollment.AddressValidation__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.CaqhReadOnly__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.chowPreRequest__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.commonPartial__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.Common__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.createEnrollment__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.GeneralInfoPartial__884a35a7.js
