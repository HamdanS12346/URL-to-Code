/* -----------------------------------------------------------------------------------------
 * This code is the property of Gainwell Technologies, Copyright (c) 2026. All rights reserved.
 * Any unauthorized use in whole or in part without written consent is strictly prohibited.
 * Violators may be punished to the full extent of the law.
 * -----------------------------------------------------------------------------------------
 * 508 COMPLIANCE: Controls cannot be disabled. Use readonly/onclick="return false" instead.
 * Inline styles are not allowed. Use hide() or CSS classes for visual changes.
 * configureReadOnlyControls() restyles readonly fields as text boxes.
 * -----------------------------------------------------------------------------------------
 */

var caqhReadOnly = (function () {
    "use strict";
    const popupLoadDelayMs = 300;
    const patientFlagCheckboxNames = [
        "acceptingnewmedicaidpatients",
        "agerestrictions"
    ];

    function isCaqhReadOnlyActive() {
        let hiddenField = $("#IsCaqhReadOnlyActive");
        let value = hiddenField.length > 0 ? (hiddenField.val() || "").toString().toLowerCase() : "";
        return value === "true";
    }

    function makeFieldReadOnly(selector) {
        let $el = $(selector);
        if ($el.length === 0) {
            return;
        }

        $el.each(function () {
            let $field = $(this);

            let kendoDropDown = $field.data("kendoDropDownList");
            if (kendoDropDown) {
                kendoDropDown.readonly(true);
                return;
            }

            let kendoComboBox = $field.data("kendoComboBox");
            if (kendoComboBox) {
                kendoComboBox.readonly(true);
                return;
            }

            let kendoDatePicker = $field.data("kendoDatePicker");
            if (kendoDatePicker) {
                kendoDatePicker.readonly(true);
                return;
            }

            let kendoNumericTextBox = $field.data("kendoNumericTextBox");
            if (kendoNumericTextBox) {
                kendoNumericTextBox.readonly(true);
                return;
            }

            let kendoMultiSelect = $field.data("kendoMultiSelect");
            if (kendoMultiSelect) {
                kendoMultiSelect.readonly(true);
                return;
            }

            let kendoMaskedTextBox = $field.data("kendoMaskedTextBox");
            if (kendoMaskedTextBox) {
                kendoMaskedTextBox.readonly(true);
                $field.addClass("readonly-widget");
                return;
            }

            let kendoTextBox = $field.data("kendoTextBox");
            if (kendoTextBox) {
                kendoTextBox.readonly(true);
                return;
            }

            $field.attr("readonly", "readonly");
        });
    }

    function hideButton(buttonId) {
        let buttonElement = document.getElementById(buttonId);
        if (buttonElement) {
            $(buttonElement).hide();
        }
    }

    function hideGridActionButtons(gridSelector) {
        let $grid = $(gridSelector);
        if ($grid.length > 0) {
            $grid.find(".k-grid-delete, .k-grid-edit").hide();
        }
    }

    function hideGridDeleteOnly(gridSelector) {
        let $grid = $(gridSelector);
        if ($grid.length > 0) {
            $grid.find(".k-grid-delete").hide();
        }
    }

    function makeRadioReadOnly(radioName) {
        let $radios = $(document.getElementsByName(radioName)).filter(":radio");
        if ($radios.length === 0) {
            return;
        }

        // Set readonly attribute so configureReadOnlyRadioButtonLists() (called via
        // configureReadOnlyControls()) hides the radio buttons and displays the
        // selected value as a readonly text label - the UX standard pattern.
        $radios.attr("readonly", "readonly");
        $radios.prop("tabindex", -1);
    }

    function isPatientFlagCheckbox(name) {
        let checkboxName = (name || "").toLowerCase();
        return patientFlagCheckboxNames.some(function (patientFlagName) {
            return checkboxName.indexOf(patientFlagName) > -1;
        });
    }

    // Promotes inline label from CheckBoxList partial into editor-label div
    // so configureReadOnlyCheckboxes() shows both label text and value.
    function makeCheckboxListItemReadOnly(checkboxId, $scope) {
        let $cb = $scope ? $scope.find("#" + checkboxId) : $("#" + checkboxId);
        if ($cb.length === 0 || $cb.attr("readonly") === "readonly") {
            return;
        }

        let $container = $cb.closest(".assoc-box-checkbox");
        let $inlineLabel = $container.find("label[for='" + checkboxId + "']");
        let labelText = $inlineLabel.length > 0 ? $inlineLabel.text().trim() : "";

        if (labelText) {
            let $editorCol = $cb.closest(".editor-col");
            let $editorLabel = $editorCol.find("> .editor-label label");
            if ($editorLabel.length > 0) {
                $editorLabel.text(labelText);
            } else {
                $container.before($("<div>", { "class": "editor-label" }).append($("<label>").text(labelText)));
            }
        }

        $cb.attr("readonly", "readonly");
    }

    function hasKendoDropDownValue(selector) {
        let widget = $(selector).data("kendoDropDownList");
        let val = widget ? widget.value() : $(selector).val();
        return val !== null && val !== undefined && val !== "";
    }

    function autoSelectCoveringColleaguesYes(gridSelector, radioName) {
        let $grid = $(gridSelector);
        let kendoGrid = $grid.length > 0 ? $grid.data("kendoGrid") : null;
        let hasRows = kendoGrid && kendoGrid.dataSource.total() > 0;
        if (hasRows) {
            let $radio = $('input:radio[name="' + radioName + '"][value="Y"]');
            $radio.prop("checked", true).trigger("change");
        }
    }

    function gridHasRows(gridSelector) {
        let $grid = $(gridSelector);
        let kendoGrid = $grid.length > 0 ? $grid.data("kendoGrid") : null;
        return kendoGrid && kendoGrid.dataSource.total() > 0;
    }

    function disableCardButtons(cardId) {
        let cardElement = document.getElementById(cardId);
        if (!cardElement) {
            return;
        }

        let $card = $(cardElement);

        // Hide edit/delete icons for 508 compliance (no disabled, no inline styles)
        $card.find("[data-card-role='cardicons'] span").each(function () {
            let $icon = $(this);
            $icon.removeAttr("onclick");
            $icon.hide();
        });

        // Hide add link
        $card.find("[data-card-role='cardaddlink'] a").each(function () {
            let $link = $(this);
            $link.hide();
        });

        // Hide add button
        $card.find("[data-card-role='cardaddbutton']").each(function () {
            let $btn = $(this);
            $btn.hide();
        });
    }

    function disableCardDeleteAndAdd(cardId) {
        let cardElement = document.getElementById(cardId);
        if (!cardElement) {
            return;
        }

        let $card = $(cardElement);

        // Hide only delete icons (fa-trash-can) - keep edit icons (fa-pen-to-square) clickable
        $card.find("[data-card-role='cardicons'] span.fa-trash-can").each(function () {
            let $icon = $(this);
            $icon.removeAttr("onclick");
            $icon.hide();
        });

        // Hide add link
        $card.find("[data-card-role='cardaddlink'] a").each(function () {
            let $link = $(this);
            $link.hide();
        });

        // Hide add button
        $card.find("[data-card-role='cardaddbutton']").each(function () {
            let $btn = $(this);
            $btn.hide();
        });
    }

    function setGeneralInfoFieldsReadOnly() {
        // CAQH-mapped: Provider Name (FirstName, MiddleName, LastName, Suffix)
        makeFieldReadOnly("#Provider_ProviderName_PersonName_First");
        makeFieldReadOnly("#Provider_ProviderName_PersonName_Middle");
        makeFieldReadOnly("#Provider_ProviderName_PersonName_Last");

        // CAQH-mapped: LastNameFirst (rendered when EnableSecondLastName=true)
        makeFieldReadOnly("#Provider_ProviderName_PersonName_LastNameFirst");

        // CAQH-mapped: LegalLastName is an alias for Last (rendered when EnableSecondLastName=true)
        makeFieldReadOnly("#Provider_ProviderName_PersonName_LegalLastName");
        makeFieldReadOnly("#Provider_ProviderName_PersonName_Suffix");

        // CAQH-mapped: ApplicantContact (Name, Email, Phone, Address)
        makeFieldReadOnly("#ApplicantContact_ContactName_First");
        makeFieldReadOnly("#ApplicantContact_ContactName_Last");
        makeFieldReadOnly("#ApplicantContact_EmailAddress");
        makeFieldReadOnly("#ApplicantContact_EmailAddressConfirmation");
        makeFieldReadOnly("#ApplicantContact_PhoneNumber_PhoneNumber");
        makeFieldReadOnly("#ApplicantContact_Address_Line1");
        makeFieldReadOnly("#ApplicantContact_Address_Line2");
        makeFieldReadOnly("#ApplicantContact_Address_City");
        makeFieldReadOnly("#ApplicantContact_Address_StatesList");
        makeFieldReadOnly("#ApplicantContact_Address_PostalCode");
        makeFieldReadOnly("#ApplicantContact_Address_CountryList");

        // CAQH-mapped: Provider NPI, CredentialType, SSN
        makeFieldReadOnly("#Provider_NationalProviderIdentifier");
        makeFieldReadOnly("#Provider_RevalNationalProviderIdentifier");
        makeFieldReadOnly("#Provider_CredentialTypeList");
        makeFieldReadOnly("#Provider_TaxIdentification_SSN");
        makeFieldReadOnly("#Provider_TaxIdentification_RevalSSN");

        // CAQH-mapped: Provider.IsIndividualOrBusiness (Individual or Business radio)
        makeRadioReadOnly("Provider.IsIndividualOrBusiness.ID");

        // CAQH-mapped: Provider.MedicareProviderFlag
        makeRadioReadOnly("Provider.IsMedicareEnrolled.ID");

        // CAQH-mapped: EnrollmentCriteria.EnrollmentType, ProviderType
        makeFieldReadOnly("#EnrollmentCriteria_EnrollmentTypeList");
        makeFieldReadOnly("#EnrollmentCriteria_ProviderTypeList");

        // CAQH-mapped: BirthPlace, ECFMG, UPIN
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_BirthPlaceInformation_City");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_BirthPlaceInformation_CountryList");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_BirthPlaceInformation_StatesList");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_ECFMGCertificateIssueDate");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_ECFMGNumber");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_UPIN");

        // CAQH-mapped: Gender, BirthDate
        makeFieldReadOnly("#Provider_IndividualProvider_GenderList");
        makeFieldReadOnly("#Provider_IndividualProvider_BirthDate");

        // CAQH-mapped: Command.CAQHID and IsProviderCAQHRegistered radio
        makeFieldReadOnly("#Provider_ProviderCAQHRegistration_CAQHProviderID");
        makeRadioReadOnly("Provider.ProviderCAQHRegistration.IsProviderCAQHRegistered.ID");

        // CAQH-mapped: Provider.ProviderAddress (CurrentHome type)
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_Home_Address_Line1");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_Home_Address_Line2");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_Home_Address_City");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_Home_Address_StatesList");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_Home_Address_CountryList");
        makeFieldReadOnly("#Provider_GeneralCredentialInformation_Home_Address_PostalCode");
    }

    function setSpecialtiesFieldsReadOnly() {
        // Card-based specialties - disable delete/add but keep edit clickable for popup readonly
        disableCardDeleteAndAdd("SpecailtyCardsId");

        // Grid-based specialties - hide add buttons only
        hideButton("specialtiesGridAddButton");
        hideButton("taxonomyGridAddButton");
        hideButton("additionalTaxonomiesAddButton");
    }

    function setServiceLocationFieldsReadOnly() {
        // CAQH-mapped: Practice.Limitation.GenderLimitation — swap to readonly text display
        if ($("#editableGender").length > 0) {
            let genderWidget = $("#EnrollmentServiceLocations_ServiceLocationPreferedGender_GenderList").data("kendoDropDownList");
            if (genderWidget) {
                $("#EnrollmentServiceLocations_ServiceLocationPreferedGender_ReadOnlyGender").val(genderWidget.text());
            }
            $("#editableGender").hide();
            $("#readonlyGender").show();
        }

        // CAQH-mapped: Practice.Limitation.AgeLimitationMinimum / Maximum (main page)
        makeFieldReadOnly("#MinAge");
        makeFieldReadOnly("#MaxAge");

        // CAQH-mapped patient flag checkboxes (CHIP and SpecialNeeds are user-editable).
        makeCheckboxListItemReadOnly("AcceptingNewMedicaidPatients");
        makeCheckboxListItemReadOnly("AgeRestrictions");

        // CAQH-mapped: Practice.Associates → ServiceLocAdditionalInfo.CoveringColleaguesYesNo
        autoSelectCoveringColleaguesYes("#coveringColleaguesGrid", 'CoveringColleaguesYesNo.ID');
        makeRadioReadOnly("CoveringColleaguesYesNo.ID");

        // Hide add buttons for grids
        hideButton("ServiceLocationAddressGridAddButton");
        hideButton("ServiceLocationPhoneNumbersGridOnAddButton");
        hideButton("hopGridAddButton");
        hideButton("coveringColleaguesGridAddButton");
    }

    function setProviderTypeInfoFieldsReadOnly() {
        disableCardDeleteAndAdd("HospitalAffiliationsId");
    }

    function setCredentialsFieldsReadOnly() {
        // Degree - card-based, disable delete/add but keep edit clickable for popup readonly
        disableCardDeleteAndAdd("DegreeCardId");

        hideButton("DEAAddButton");
        hideButton("LicensingGridAddButton");
        hideButton("MalpracticeInsuranceGridAddButton");
        hideButton("MedicareParticipationGridAddButton");
        hideButton("MedicaidProgramGridAddButton");
        hideButton("DispenseAddButton");

        makeRadioReadOnly("Provider.MedicaidPrograms.MedicaidProgramQuestionValue.ID");
        makeRadioReadOnly("Provider.ControlledSubstanceCertificates.DispenseControlledSubstanceCertificates.QuestionChoice.ID");
    }

    function setWorkHistoryFieldsReadOnly() {
        hideButton("WorkHistorysGridAddButton");
    }

    function setEducationFieldsReadOnly() {
        // Education grid: hide Add button only when prefilled with CAQH data.
        let educationsGrid = $("#educationsGrid").data("kendoGrid");
        if (educationsGrid && educationsGrid.dataSource.total() > 0) {
            hideButton("educationsGridAddButton");
        }
    }

    function setReferencesFieldsReadOnly() {
        hideButton("referencesGridAddButton");
    }

    function setOtherFieldsReadOnly() {
        hideButton("OtherKnownNamesGridGridAddButton");
        hideButton("certificationsGridAddButton");
        hideButton("MalpracticeInsuranceGridAddButton");

    }

    function hideAllGridActionButtons() {
        // Specialties & Taxonomy: keep Edit clickable, only hide Delete
        hideGridDeleteOnly("#specialtiesGrid");
        hideGridDeleteOnly("#taxonomyGrid");
        hideGridDeleteOnly("#additionalTaxonomiesGrid");
        // Service Location: keep Edit clickable, only hide Delete
        hideGridDeleteOnly("#ServiceLocationAddressGrid");
        hideGridDeleteOnly("#ServiceLocationPhoneNumbersGrid");
        hideGridActionButtons("#hopGrid");
        hideGridDeleteOnly("#coveringColleaguesGrid");

        hideGridActionButtons("#DEAGrid");
        hideGridActionButtons("#LicensingGrid");
        hideGridActionButtons("#MalpracticeGrid");
        hideGridDeleteOnly("#MalpracticeInsuranceGrid");
        hideGridActionButtons("#MedicareParticipationGrid");
        hideGridActionButtons("#MedicaidProgramGrid");
        hideGridDeleteOnly("#LicensingGrid");
        hideGridActionButtons("#MalpracticeInsuranceGrid");
        hideGridDeleteOnly("#MedicareParticipationGrid");
        hideGridDeleteOnly("#MedicaidProgramGrid");
        hideGridActionButtons("#DispenseGrid");

        hideGridDeleteOnly("#WorkHistoryGrid");
        hideGridDeleteOnly("#educationsGrid");
        hideGridActionButtons("#FellowshipGrid");
        hideGridActionButtons("#internshipsGrid");
        hideGridActionButtons("#residencyGrid");
        hideGridDeleteOnly("#referencesGrid");
        hideGridActionButtons("#OtherKnownNamesGridGrid");
        hideGridActionButtons("#PrescribeGrid");
        hideGridActionButtons("#DispenseGrid");
        hideGridDeleteOnly("#certificationsGrid");
    }

    function applyReadOnlyToPageFields() {
        setGeneralInfoFieldsReadOnly();
        setSpecialtiesFieldsReadOnly();
        setServiceLocationFieldsReadOnly();
        setProviderTypeInfoFieldsReadOnly();
        setCredentialsFieldsReadOnly();
        setWorkHistoryFieldsReadOnly();
        setEducationFieldsReadOnly();
        setReferencesFieldsReadOnly();
        setOtherFieldsReadOnly();
        hideAllGridActionButtons();
    }

    // --- Popup readonly functions ---

    function setServiceLocationPopupFieldsReadOnly() {
        let $popup = $("#serviceLocationAddressMainOverlay");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped: Practice.PracticeName
        makeFieldReadOnly("#LocationIdentity_Name");

        // CAQH-mapped: Practice.AddressType.AddressTypeDescription
        makeFieldReadOnly("#IsPrimaryLocation");

        // CAQH-mapped: Practice.Associate.AssocistaeFirstName (PersonName)
        makeFieldReadOnly("#PersonName_Last");
        makeFieldReadOnly("#PersonName_First");
        makeFieldReadOnly("#PersonName_Middle");
        makeFieldReadOnly("#PersonName_Suffix");
        makeFieldReadOnly("#PersonName_LastNameSecond");

        // CAQH-mapped: Practice.Address, Practice.City, Practice.State, etc.
        makeFieldReadOnly("#Address_Line1");
        makeFieldReadOnly("#Address_Line2");
        makeFieldReadOnly("#Address_City");
        makeFieldReadOnly("#Address_StatesList");
        makeFieldReadOnly("#Address_PostalCode");
        makeFieldReadOnly("#Address_CountryList");

        // CAQH-mapped: Derived from Practice.State/Country/City
        makeFieldReadOnly("#LocationCode");
        makeFieldReadOnly("#LocationCode_ID");

        // CAQH-mapped: PracticeAddress.EmailAddress
        makeFieldReadOnly("#EmailAddress");
        makeFieldReadOnly("#EmailAddressConfirmation");

        // CAQH-mapped: Practice.Limitation.AgeLimitationMinimum / Maximum
        makeFieldReadOnly("#ServiceLocation_ServiceLocInformation_MinAge");
        makeFieldReadOnly("#ServiceLocation_ServiceLocInformation_MaxAge");

        // CAQH-mapped: Practice.Limitation.GenderLimitation
        makeFieldReadOnly("#ServiceLocation_ServiceLocationPreferedGender_GenderList");

        // CAQH-mapped: Practice.ADAApprovedFlag
        makeRadioReadOnly("ServiceLocation.ServiceLocationAdaCompliant.ID");

        // CAQH-mapped: Practice.Accessibility.AccessibilityFlag
        makeRadioReadOnly("ServiceLocation.ServiceLocPublicTransp.ServiceLocationPublicTransp.ID");

        // CAQH-mapped patient flag checkboxes (CHIP and SpecialNeeds are user-editable).
        makeCheckboxListItemReadOnly("AcceptingNewMedicaidPatients", $popup);
        makeCheckboxListItemReadOnly("AgeRestrictions", $popup);

        // CAQH-mapped: CoveringColleaguesYesNo readonly (auto-Yes when CAQH provided colleagues)
        autoSelectCoveringColleaguesYes("#coveringColleaguesGrid", 'ServiceLocation.ServiceLocAdditionalInfo.CoveringColleaguesYesNo.ID');
        makeRadioReadOnly("ServiceLocation.ServiceLocAdditionalInfo.CoveringColleaguesYesNo.ID");

        // Hide delete/add on phone numbers grid inside popup (keep Edit for viewing)
        let $phoneGrid = $popup.find("#LocationServiceLocationPhoneNumbersGrid");
        if ($phoneGrid.length > 0) {
            $phoneGrid.find(".k-grid-delete").hide();
            $phoneGrid.find(".k-grid-edit").show();
        }
        $popup.find("#ServiceLocationPhoneNumbersGridOnAddButton").hide();

        // Hide delete/add on HOP grid inside popup (keep Edit for viewing)
        let $hopGrid = $popup.find("#hopGrid");
        if ($hopGrid.length > 0) {
            $hopGrid.find(".k-grid-delete").hide();
            $hopGrid.find(".k-grid-edit").show();
        }
        $popup.find("#hopGridAddButton").hide();

        // Covering colleagues: hide delete/add (CAQH-sourced rows), keep Edit for ProviderType/Specialty
        let $ccGrid = $popup.find("#coveringColleaguesGrid");
        if ($ccGrid.length > 0) {
            $ccGrid.find(".k-grid-delete").hide();
        }
        $popup.find("#coveringColleaguesGridAddButton").hide();

        $("#serviceLocationAddressDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setLanguagesSpokenPopupFieldsReadOnly() {
        // LanguageSpokenTypesList is not CAQH-mapped — all fields remain editable
        let $popup = $("#languagesEditForm");
        if ($popup.length === 0) {
            return;
        }
    }

    function setSpecialtyPopupFieldsReadOnly() {
        let $popup = $("#ViewSpecialityPanelId");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped: Specialty.SpecialtyCode dropdown
        makeFieldReadOnly("#SpecialtyCodeListList");

        // CAQH-mapped: Specialty.Taxonomy dropdown
        makeFieldReadOnly("#TaxonomyList");

        // CAQH-mapped: Specialty.SpecialtyType (IsPrimary checkbox - 508 compliant)
        // Set readonly attribute so configureReadOnlyCheckboxes() replaces with a Yes/No textbox.
        $("#IsPrimary").attr("readonly", "readonly");

        // Hide delete button inside popup
        $popup.find(".k-grid-delete").hide();

        // Show save button if there are non-CAQH-mapped editable fields (program types/waiver types/effective date)
        let hasProgramTypes = $popup.find("#programTypes").children().length > 0;
        let hasWaiverTypes = $popup.find("#waiverTypes").children().length > 0;
        let hasWaiverServiceProvided = $popup.find("#waiverTypeServiceProvided").children().length > 0;
        let hasEditableEffectiveDate = $("#EffectiveDate").length > 0;
        if (hasProgramTypes || hasWaiverTypes || hasWaiverServiceProvided || hasEditableEffectiveDate) {
            $popup.find("#ViewSpecialityFormSaveButton").show();
        } else {
            $popup.find("#ViewSpecialityFormSaveButton").hide();
        }
    }

    function setTaxonomyPopupFieldsReadOnly() {
        let $popup = $("#TaxonomyEditForm");
        if ($popup.length === 0) {
            return;
        }

        // Make Taxonomy dropdown readonly
        makeFieldReadOnly("#TaxonomyList");

        // Hide save and delete buttons in taxonomy popup
        $popup.find("#TaxonomyEditFormSaveButton").hide();
        $popup.find("#TaxonomyDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setHospitalAffiliationPopupFieldsReadOnly() {
        let $popup = $("#viewHospitalAffiliationsOverlay");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped: Provider.Hospital.HospitalAffiliationType (IsPrimary checkbox - 508 compliant)
        // Set readonly attribute so configureReadOnlyCheckboxes() replaces with a Yes/No textbox.
        $("#IsPrimary").attr("readonly", "readonly");

        // CAQH-mapped: Provider.Hospital fields
        makeFieldReadOnly("#HospitalName");
        makeFieldReadOnly("#AddressLine1");
        makeFieldReadOnly("#City");
        makeFieldReadOnly("#StatesList");
        makeFieldReadOnly("#CountryList");
        makeFieldReadOnly("#ZIPCode");
        makeFieldReadOnly("#EffectiveDate");
        makeRadioReadOnly("RestrictionOfPrivileges.ID");

        $("#Others").removeAttr("readonly");
        $("#CoAdmittingStatus").removeAttr("readonly");

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }

        if (typeof onChangeEventStatusOfPrivilegesList === "function") {
            onChangeEventStatusOfPrivilegesList();
        }
    }

    function setReferencesPopupFieldsReadOnly() {
        let $popup = $("#viewReferenceOverlay");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped: Reference Name (FirstName, MiddleName, LastName)
        // Note: LastNameSecond is intentionally NOT included - not CAQH-mapped
        makeFieldReadOnly("#FirstName");
        makeFieldReadOnly("#MiddleName");
        makeFieldReadOnly("#LastName");

        // CAQH-mapped: Reference Phone
        makeFieldReadOnly("#PhoneNumber_PhoneNumber");
        // Note: PhoneNumberTypeList is intentionally NOT readonly - not sourced from CAQH

        // Note: SpecialtyCodeListList is intentionally NOT readonly - not sourced from CAQH

        // CAQH-mapped: Reference Address
        makeFieldReadOnly("#ReferenceAddress_Line1");
        makeFieldReadOnly("#ReferenceAddress_Line2");
        makeFieldReadOnly("#ReferenceAddress_City");
        makeFieldReadOnly("#ReferenceAddress_StatesList");
        makeFieldReadOnly("#ReferenceAddress_CountryList");
        makeFieldReadOnly("#ReferenceAddress_PostalCode");

        // Hide delete button to prevent deletion of CAQH data
        hideButton("ReferenceDeleteButton");

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setOtherKnownNamesPopupFieldsReadOnly() {
        if (!isCaqhReadOnlyActive()) {
            return;
        }

        let $popup = $("#OtherKnownNamesForm");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped: Provider.OtherNames.FirstName / LastName / MiddleName
        makeFieldReadOnly("#PersonNames_Last");
        makeFieldReadOnly("#PersonNames_First");
        makeFieldReadOnly("#PersonNames_Middle");

        // CAQH-mapped: Provider.OtherNames.StartDate / EndDate
        makeFieldReadOnly("#EffectiveDate");
        makeFieldReadOnly("#EndDate");

        // Hide Save and Delete — provider cannot modify CAQH-sourced Other Known Names
        $("#otherKnownNamesFormSaveButton").hide();
        $("#otherKnownNamesDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setCertificationPopupFieldsReadOnly() {
        let $popup = $("#CertificationEditForm");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped fields — read-only
        makeFieldReadOnly("#SpecialtyTypesList");
        makeFieldReadOnly("#CertificationNumber");
        makeFieldReadOnly("#EffectiveDate");

        if (($("#CertificationExpiresFlag").val() || "").toString().toLowerCase() === "true") {
            makeFieldReadOnly("#EffectiveEndDate");
        }

        // Non-CAQH-mapped fields (Certification Type, Other Certification Type, Exempt from Accreditation)
        // remain editable — Save button stays visible so changes can be saved.

        // Hide Delete only — provider cannot delete CAQH-sourced certification records
        $("#certificationDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setPhoneNumberEditPopupFieldsReadOnly() {
        let $form = $("#ServiceLocationPhoneNumbersEditForm");
        if ($form.length === 0) {
            return;
        }

        // CAQH-mapped: Practice.PhoneNumber → PhoneType
        makeFieldReadOnly("#PhoneTypeList");

        // CAQH-mapped: Practice.PhoneNumber → PhoneNumber
        makeFieldReadOnly("#PhoneNumber_PhoneNumber");

        // CAQH-mapped: Practice.PhoneExtension → PhoneExtension
        makeFieldReadOnly("#PhoneNumber_PhoneExtension");

        // Hide Save and Delete — provider cannot modify CAQH-sourced phone numbers
        $("#ServiceLocationPhoneNumbersEditFormSaveButton").hide();
        $("#ServiceLocationPhoneNumbersDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setMalpracticeInsurancePopupFieldsReadOnly() {
        let $popup = $("#MalpracticeInsuranceEditForm");
        if ($popup.length === 0) {
            return;
        }

        // CAQH-mapped fields — read-only
        makeFieldReadOnly("#CarrierName");
        makeFieldReadOnly("#PolicyNumber");
        makeFieldReadOnly("#CoverageAmountAggregate");
        makeFieldReadOnly("#CoverageAmountPerOccurrence");
        makeFieldReadOnly("#EffectiveDate");
        makeFieldReadOnly("#EndDate");

        // Non-CAQH-mapped fields (Type of Carrier) remain editable — Save button stays visible.

        // Hide Delete only — provider cannot delete CAQH-sourced malpractice insurance records
        $("#MalpracticeInsuranceDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setHopEditPopupFieldsReadOnly() {
        let $form = $("#HopEditForm");
        if ($form.length === 0) {
            return;
        }

        // CAQH-mapped: Practice.ProviderPracticeHours.DayOfWeek
        makeFieldReadOnly("#DayList");

        // CAQH-mapped: Practice.ProviderPracticeHours.StartHours
        makeFieldReadOnly("#FromHoursList");

        // CAQH-mapped: Practice.ProviderPracticeHours.EndHours
        makeFieldReadOnly("#ToHoursList");

        // Ensure ToHours stays readonly even if hopEditpanel.js enables it
        let toHoursWidget = $("#ToHoursList").data("kendoDropDownList");
        if (toHoursWidget) {
            toHoursWidget.readonly(true);
        }

        // Hide Save and Delete — provider cannot modify CAQH-sourced hours of operation
        $("#HopEditFormSaveButton").hide();
        $("#HopDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setCoveringColleaguesEditPopupFieldsReadOnly() {
        let $form = $("#coveringColleaguesForm");
        if ($form.length === 0 || $form.data("caqhProcessed")) {
            return;
        }
        $form.data("caqhProcessed", true);

        // CAQH-mapped: names always readonly
        makeFieldReadOnly("#CoveringColleaguesFirstName");
        makeFieldReadOnly("#CoveringColleaguesLastName");
        makeFieldReadOnly("#CoveringColleaguesMiddleName");

        $("#coveringColleaguesDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }

        // Provider Type and Specialty remain editable (not CAQH-mapped)
        let providerTypeWidget = $("#CoveringColleaguesProviderTypeList").data("kendoDropDownList");
        if (providerTypeWidget) {
            providerTypeWidget.readonly(false);
        }
        let specialtyWidget = $("#SpecialtyList").data("kendoDropDownList");
        if (specialtyWidget) {
            specialtyWidget.readonly(false);
        }
    }

    function setWorkHistoryPopupFieldsReadOnly() {
        let $popup = $("#viewWorkHistoryOverlay");
        if ($popup.length === 0) {
            return;
        }

        makeFieldReadOnly("#EntityName");
        makeFieldReadOnly("#WorkHistoryAddress_Line1");
        makeFieldReadOnly("#WorkHistoryAddress_City");
        makeFieldReadOnly("#WorkHistoryAddress_StateList");
        makeFieldReadOnly("#WorkHistoryAddress_CountriesList");
        makeFieldReadOnly("#WorkHistoryAddress_PostalCode");

        // CAQH-mapped: StartDate (M-285)
        makeFieldReadOnly("#From");

        let $isCurrentEmployer = $("#IsCurrentEmployer");
        let isCurrentEmployerValue = $isCurrentEmployer.length > 0 ? ($isCurrentEmployer.val() || "").toString().toLowerCase() : "";
        if (isCurrentEmployerValue === "false") {
            makeFieldReadOnly("#To");
        }
        $popup.find("#workHistoryDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setDegreePopupFieldsReadOnly() {
        let $popup = $("#DegreeEditForm");
        if ($popup.length === 0) {
            return;
        }

        makeFieldReadOnly("#ProviderDegree");
        makeFieldReadOnly("#School");
        let programCompletedFlag = ($("#ProgramCompletedFlag").val() || "").toString().toLowerCase() === "true";
        if (programCompletedFlag) {
            makeFieldReadOnly("#YearOfGraduation");
            $popup.find("#DegreeEditFormSaveButton").hide();
        }

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setLicensePopupFieldsReadOnly() {
        let $popup = $("#LicenseEditForm");
        if ($popup.length === 0) {
            return;
        }
        makeFieldReadOnly("#LicenseNumber");
        makeFieldReadOnly("#StateList");
        makeFieldReadOnly("#LicenseEffectiveDate");
        makeFieldReadOnly("#LicenseExpirationDate");
        $popup.find("#LicenseDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setDEAPopupFieldsReadOnly() {
        let $popup = $("#DEAEditForm");
        if ($popup.length === 0) {
            return;
        }

        makeFieldReadOnly("#DEAEditForm #DEANumber");
        makeFieldReadOnly("#DEAEditForm #EffectiveDate");
        makeFieldReadOnly("#DEAEditForm #EndDate");

        $popup.find("#DEAEditFormSaveButton").hide();
        $popup.find("#DEADeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setMedicarePopupFieldsReadOnly() {
        let $popup = $("#medicareEditForm");
        if ($popup.length === 0) {
            return;
        }

        makeFieldReadOnly("#medicareEditForm #MedicareNumber");
        makeFieldReadOnly("#medicareEditForm #IsMedicareCrossOver");

        $popup.find("#MedicareDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setEducationPopupFieldsReadOnly() {
        let $popup = $("#EducationEditForm");
        if ($popup.length === 0) {
            return;
        }

        // Only apply readonly when editing an existing record (prefilled from CAQH).
        // New records (Create New) should remain editable.
        let educationId = $("#EducationId").val();
        if (educationId === undefined || educationId === null || educationId === "") {
            return;
        }

        // CAQH-mapped: Education fields
        makeFieldReadOnly("#MedicalSchool");
        makeFieldReadOnly("#Degree");
        // YearOfGraduation: readonly only when ProgramCompletedFlag = true.
        // When ProgramCompletedFlag = false, YearOfGraduation is editable and Save button remains visible.
        let programCompletedFlag = ($("#ProgramCompletedFlag").val() || "").toString().toLowerCase() === "true";
        if (programCompletedFlag) {
            makeFieldReadOnly("#YearOfGraduation");
            $("#EducationEditFormSaveButton").hide();
        }
        makeFieldReadOnly("#City");
        makeFieldReadOnly("#StateList");
        makeFieldReadOnly("#Zip");
        makeFieldReadOnly("#FromDate");
        makeFieldReadOnly("#ToDate");

        $("#EducationDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setCDSDispensePopupFieldsReadOnly() {
        let $popup = $("#DispenseASSMCAEditForm");
        if ($popup.length === 0) {
            return;
        }
        makeFieldReadOnly("#DispenseASSMCAEditForm #RegistrationNumber");
        makeFieldReadOnly("#DispenseASSMCAEditForm #EffectiveDate");
        makeFieldReadOnly("#DispenseASSMCAEditForm #EndDate");

        // Hide save and delete buttons - CAQH-sourced data cannot be modified
        $popup.find("#DispenseASSMCAEditFormSaveButton").hide();
        $popup.find("#DispenseDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function setMedicaidProgramPopupFieldsReadOnly() {
        let $popup = $("#medicaidProgramEditForm");
        if ($popup.length === 0) {
            return;
        }
        makeFieldReadOnly("#medicaidProgramEditForm #Program");
        makeFieldReadOnly("#medicaidProgramEditForm #StatesQuestionList");

        $popup.find("#MedicaidProgramDeleteButton").hide();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }
    }

    function applyReadOnlyToPopups() {
        setServiceLocationPopupFieldsReadOnly();
        setPhoneNumberEditPopupFieldsReadOnly();
        setHopEditPopupFieldsReadOnly();
        setCoveringColleaguesEditPopupFieldsReadOnly();
        setSpecialtyPopupFieldsReadOnly();
        setTaxonomyPopupFieldsReadOnly();
        setHospitalAffiliationPopupFieldsReadOnly();
        setLanguagesSpokenPopupFieldsReadOnly();
        setReferencesPopupFieldsReadOnly();
        setOtherKnownNamesPopupFieldsReadOnly();
        setWorkHistoryPopupFieldsReadOnly();
        setCertificationPopupFieldsReadOnly();
        setMalpracticeInsurancePopupFieldsReadOnly();

        // Credential page popup handlers
        setDegreePopupFieldsReadOnly();
        setLicensePopupFieldsReadOnly();
        setDEAPopupFieldsReadOnly();
        setMedicarePopupFieldsReadOnly();
        setMedicaidProgramPopupFieldsReadOnly();
        setCDSDispensePopupFieldsReadOnly();
        setEducationPopupFieldsReadOnly();
    }
    // --- End popup readonly functions ---

    function isSubmitConfirmationPage() {
        // Status 1=Pending, 2=Submitted, 8=WaitingForAttachments indicates confirmation page
        let statusVal = $("#Status_ID").val();
        return statusVal === "1" || statusVal === "2" || statusVal === "8";
    }

    function showCaqhReadOnlyBanner() {
        // Don't show banner on submit confirmation page
        if (isSubmitConfirmationPage()) {
            return;
        }

        $("#caqhReadOnlyBannerMsg .msg-inline").removeClass("display-none");

        $("#caqhReadOnlyBannerClose").on("click keydown", function (e) {
            if (e.type === "click" || e.key === "Enter" || e.key === " ") {
                $(this).closest(".msg-inline").addClass("display-none");
            }
        });
    }

    function init() {
        if (!isCaqhReadOnlyActive()) {
            return;
        }

        showCaqhReadOnlyBanner();
        applyReadOnlyToPageFields();

        if (typeof configureReadOnlyControls === "function") {
            configureReadOnlyControls();
        }

        // Hook into ajax calls to apply readonly when popups load
        $(document).ajaxComplete(function () {
            if (!isCaqhReadOnlyActive()) {
                return;
            }
            applyReadOnlyToPageFields();
            setTimeout(function () {
                applyReadOnlyToPopups();
            }, popupLoadDelayMs);
        });
    }

    return {
        init: init,
        isCaqhReadOnlyActive: isCaqhReadOnlyActive,
        makeFieldReadOnly: makeFieldReadOnly,
        hideButton: hideButton
    };
})();

$(document).ready(function () {
    caqhReadOnly.init();
});
