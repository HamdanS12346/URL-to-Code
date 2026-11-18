//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2024. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var applicantContactAddressCity = "#ApplicantContact_Address_City";
var applicantContactAddressCountryList = "#ApplicantContact_Address_CountryList";
var applicantContactAddressLine1 = "#ApplicantContact_Address_Line1";
var applicantContactAddressPostalCode = "#ApplicantContact_Address_PostalCode";
var applicantContactAddressStatesList = "#ApplicantContact_Address_StatesList";
var applicantContactAddressValidationInfoIsAddressValidated = "#ApplicantContact_Address_ValidationInfo_IsAddressValidated";
var applicantContactEmailAddress = "#ApplicantContact_EmailAddress";
var applicantContactEmailAddressConfirmation = "#ApplicantContact_EmailAddressConfirmation";
var applicantContactEmailAddressConfirmationID = "ApplicantContact_EmailAddressConfirmation";
var applicantContactEmailAddressID = "ApplicantContact_EmailAddress";
var applicantContactPhoneExtension = "#ApplicantContact_PhoneNumber_PhoneExtension";
var applicantContactPhoneNumber = "#ApplicantContact_PhoneNumber_PhoneNumber";
var applicantContactPreferredCommunicationMethodList = "#ApplicantContact_PreferredCommunicationMethodList";
var applicantContactAllowTextNotifications = "#ApplicantContact_AllowTextNotifications"
var applicationType = "#ApplicationType";
var controlToFocusOnClose = "";
var credentialTypeList = "Provider_CredentialTypeList";
var data = [];
var dataroleDropdownlist = "[data-role='dropdownlist']";
var divDoingBusinessAsName = "#DoingBusinessAsName";
var divEnrollmentAddressHomeId = "#DivEnrollmentAddressHome";
var divEnrollmentGroupFacilityIdentification = "#divEnrollmentGroupFacilityIdentification";
var divEnrollmentIndividualIdentification = "#divEnrollmentIndividualIdentification";
var divForIndividualOrBusiness = "#divForIndividualOrBusiness";
var divGeneralCredentialInformationDetails = "#divGeneralCredentialInformationDetails";
var divGeneralInfo = "#divGeneralInfo";
var divNPI = $("div[id='divNPI']");
var divNPIReval = "#divNPIReval";
var divProgramParticipationAnswer = "#divProgramParticipationAnswer";
var divProviderEffectiveDate = "#divProviderEffectiveDate";
var divProviderEINCode = "#divProviderEINCode";
var divProviderEINCodeReval = "#divProviderEINCodeReval";
var divProviderIDReval = "#divProviderIDReval";
var divProviderSSNCode = "#divProviderSSNCode";
var divProviderSSNCodeReval = "#divProviderSSNCodeReval";
var divTaxName = "#LegalTaxName";
var enrollmentCriteriaEnrollmentTypeList = "#EnrollmentCriteria_EnrollmentTypeList";
var enrollmentCriteriaEnrollmentTypeListId = "EnrollmentCriteria_EnrollmentTypeList";
var enrollmentCriteriaProviderTypeList = "#EnrollmentCriteria_ProviderTypeList";
var enrollmentCriteriaProviderTypeListId = "EnrollmentCriteria_ProviderTypeList";
var enrollmentCriteriaProviderTypeName = "#EnrollmentCriteria_ProviderType_Name";
var enrollmentCriteriaProviderTypeValue = "#EnrollmentCriteria_ProviderTypeValue";
var enrollmentTyp = '';
var enrollmentTypeChanged = false;
var enrollmentTypeDDLData = "";
var individualOrBusiness = $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]');
var inputText = 'input:text';
var inputPassword = 'input:password';
var isCredentialingEnabled = "#IsCredentialingEnabled";
var isNPIChangeExecuted = false;
var isNPIChangeExecutedSearchExistingServiceLocationResult = null;
var isNPIChangeExecutedSearchRegisteredProviderResult = null;
var isPreviouslyRegisteredProvider = "#IsPreviouslyRegisteredProvider";
var isRevalidatedPersonNameFirst = "#IsRevalidatedPersonNameFirst";
var isRevalidatedPersonNameSecond = "#IsRevalidatedPersonNameSecond";
var isServiceLocationExist = "#Provider_IsServiceLocationExist";
var isNPIInvalid = "#Provider_IsNPIInvalid";
var isSSNInvalid = "#Provider_IsSSNInvalid";
var isEINInvalid = "#Provider_IsEINInvalid";
var isEmailInvalid = "#Provider_IsEmailInvalid";
var npiTaxIdExists = "#NpiTaxIdExists";
var legacyProviderID = "#LegacyProviderID";
var legalNameShow = "#LegalNameShow";
var legalNameShowReval = "#LegalNameShowReval";
var mcoPrograms = "#mcoPrograms";
var mcoProgramsList = [];
var newEnrollmentPersonNameFirst = "#NewEnrollmentPersonNameFirst";
var newEnrollmentPersonNameSecond = "#NewEnrollmentPersonNameSecond";
var programType = "#Provider_ProgramTypeList";
var providerBirthPlaceInformationCity = "Provider_GeneralCredentialInformation_BirthPlaceInformation_City";
var providerBirthPlaceInformationCountryList = "Provider_GeneralCredentialInformation_BirthPlaceInformation_CountryList";
var providerBirthPlaceInformationCountry = "Provider_GeneralCredentialInformation_BirthPlaceInformation_Country";
var providerBirthPlaceInformationStatesList = "Provider_GeneralCredentialInformation_BirthPlaceInformation_StatesList";
var providerBirthPlaceInformationStates = "Provider_GeneralCredentialInformation_BirthPlaceInformation_States";
var providerECFMGCertificateIssueDate = "Provider_GeneralCredentialInformation_ECFMGCertificateIssueDate";
var providerECFMGCertificateIssueDateVal = "#Provider_GeneralCredentialInformation_ECFMGCertificateIssueDate";
var providerECFMGNumber = "Provider_GeneralCredentialInformation_ECFMGNumber";
var providerECFMGNumberVal = "#Provider_GeneralCredentialInformation_ECFMGNumber";
var providerNationalProviderIdentifier = "Provider_NationalProviderIdentifier";
var providerNationalProviderIdentifierVal = "#Provider_NationalProviderIdentifier";
var providerNursePractitionerNpi = "Provider_NursePractitioner_Npi";
var providerNursePractitionerNpiValidationMessage = "Provider.NursePractitioner.Npi_validationMessage";
var providerNursePractitionerPhysicianFirstName = "Provider_NursePractitioner_PhysicianFirstName";
var providerNursePractitionerPhysicianLastName = "Provider_NursePractitioner_PhysicianLastName";
var providerPreferredCommunicationDetailsLanguageListList = "Provider_PreferredCommunicationDetails_LanguageListList";
var providerProviderLegalNameProviderLegalName = "Provider_ProviderLegalName_ProviderLegalName";
var providerProviderNamePersonNameFirst = "Provider_ProviderName_PersonName_First";
var providerProviderNamePersonNameFirstLastName = "Provider_ProviderName_PersonName_LastNameFirst";
var providerProviderNamePersonNameLast = "Provider_ProviderName_PersonName_Last";
var providerProviderNamePersonNameMiddle = "Provider_ProviderName_PersonName_Middle";
var providerProviderNamePersonNameLastNameSecond = "Provider_ProviderName_PersonName_LastNameSecond";
var providerProviderNamePersonNameLegalLastName = "Provider_ProviderName_PersonName_LegalLastName";
var providerSelectedProgramTypeCode = "#Provider_SelectedProgramTypeCode";
var providerTaxIdentificationEffectiveFromDate = "Provider_TaxIdentification_EffectiveFromDate";
var providerTaxIdentificationSSNParent = "#Provider\\.TaxIdentification\\.SSN_parent";
var providerTaxIdType = "#Provider_TaxIdentification_TaxIdType";
var providerTypeDDLData = null;
var providerTypeLoaded = false;
var providerUPIN = "Provider_GeneralCredentialInformation_UPIN";
var requestedEffectiveDateParent = "#RequestedEffectiveDate_parent";
var taxIdentificationSSN = "Provider_TaxIdentification_SSN";
var taxIdentificationSSNHidden = "Provider_TaxIdentification_SSNHidden";
var providerTaxIdentificationSSNRawVal = "#Provider_TaxIdentification_SSNRawVal";
var taxIdentificationTaxId = "Provider_TaxIdentification_TaxId";
var taxIdentificationTaxIdHidden = "Provider_TaxIdentification_TaxIdHidden";
var providerTaxIdentificationTaxIdRawVal = "#Provider_TaxIdentification_TaxIdRawVal";
var isAllowReenrollmentRequest = "#AllowReenrollmentRequest";
var customMultipleProgramTypes = "#customMultipleProgramTypes";
var selectedCustomProgramsList = [];
var isCustomMultipleProgramTypesFlag = false;
var customSingleProgramTypes = [];
var programTypesResult;
var divProgramType = "#divProgramType";
var divCustomMultipleProgramTypes = "#divCustomMultipleProgramTypes";
var unitedStates = 'US';
var domesticCountryCode;
var revalRiskLevel;
var riskLevelDataListItems;
var activeStep = Number($('#ActiveStep').val());
var currentStep = Number($("#CurrentStep").val());
var removeEditorFieldClass = 'editor-field';
var generalInformationFormId = "generalInformationForm";

if (getCustomMultipleProgramTypesData !== null) {
    for (i = 0; i < getCustomMultipleProgramTypesData.length; i++) {
        selectedCustomProgramsList.push(getCustomMultipleProgramTypesData[i].ID);
    }
}

$(document).ready(function () {
    if (isMCO.toLowerCase() === "true") {
        makeAsyncWebApiCall(getMCOProgramsListUrl, "POST", null, "application/json", "getMCOProgramsListSuccess");
    }
    enrollmentTypeDDLData = $(enrollmentCriteriaEnrollmentTypeList).data("kendoDropDownList");
    initializeProviderTypeDropdown();
    if (iscredentialInformationIsRequired !== null && iscredentialInformationIsRequired !== undefined && iscredentialInformationIsRequired.toLocaleLowerCase() === "true") {
        setFieldAsRequired(providerBirthPlaceInformationCity, providerBirthPlaceInformationCity);
        setFieldAsRequired(providerBirthPlaceInformationCountryList, providerBirthPlaceInformationCountry);
        setFieldAsRequired(providerBirthPlaceInformationStatesList, providerBirthPlaceInformationStates);
    }
    else {
        setFieldAsNotRequired(providerBirthPlaceInformationCity, providerBirthPlaceInformationCity);
        setFieldAsNotRequired(providerBirthPlaceInformationCountryList, providerBirthPlaceInformationCountry);
        setFieldAsNotRequired(providerBirthPlaceInformationStatesList, providerBirthPlaceInformationStates);
    }
    $("#Provider_PreviousLegacyProviderIdentifier").prop('maxlength', providerIdLength);
    $("#Provider_CurrentLegacyProviderIdentifier").prop('maxlength', providerIdLength);
    setRequiredFieldProperty();

    $("#Provider_TaxIdentification_TaxIdHelp").addClass("grid-toolbar-spacer-right");
    $("#Provider_TaxIdentification_SSNHelp").addClass("grid-toolbar-spacer-right");

    if ($(applicationType).val() === reval && enrollmentTyp === atypicalEnrollmentType) {
        checkMedicareEnrollment();
    }
    if (isMCO.toLowerCase() !== "true") {
        $(divProgramType).hide();
        $(programType).data("kendoDropDownList").value(FFSOnly);
        $("#Provider_ProgramType_ID").val(FFSOnly);
        $(programType).val(FFSOnly);
    }
    if (isEnableMultiFactorAuthentication) {
        setEmailAsRequired();
    }
    $(applicantContactPreferredCommunicationMethodList).change(function (e) {
        setPreferredCommunicationMethodHiddenFields($(this).data("kendoDropDownList"));
        syncPreferredCommunicationMethodDropdownWithHiddenFields();
        setRequiredFieldProperty();
    });

    $(applicantContactEmailAddress).blur(function () {
        setRequiredFieldProperty();
    });
    $(applicantContactEmailAddressConfirmation).blur(function () {
        setRequiredFieldProperty();
    });

    setContactFieldsForValidation();
    initializeAppSettingVariables();
    initializeContactAddressFields();
    sealCredentialFields();

    if ($(applicationType).val() === reval || $(applicationType).val() === mcoEnrollment) {
        $(divProviderIDReval).show();
        $("#IntialIsRevalidateDropdownHide").hide();
        $("#IntialIsRevalidateDropdownShow").show();
        $(requestedEffectiveDateParent).hide();
        setFieldAsNotRequired("RequestedEffectiveDate", "RequestedEffectiveDate");
        $("#divHideRevalcurrentEnrolledEditSection").hide();
        $("#divHideRevalpreviousEnrolledEditSection").hide();
        $(divForIndividualOrBusiness).hide();
        var Ethnicitydropdownlist = $("#Provider_IndividualProvider_EthnicityList").data("kendoDropDownList");
        Ethnicitydropdownlist.readonly(true);
        var Genderdropdownlist = $("#Provider_IndividualProvider_GenderList").data("kendoDropDownList");
        Genderdropdownlist.readonly(true);
        makePreferredCommunicationLanguagedropdownlistReadonly();
        enrollmentTyp = enrollmentTypeDDLData.value();
        if (enrollmentTyp === individualEnrollmentType || enrollmentTyp === atypicalEnrollmentType) {
            $(divForIndividualOrBusiness).show();
            var taxIDType = $(providerTaxIdType).val();
            taxIDType === SSN ? individualOrBusiness[0].checked = true : individualOrBusiness[1].checked = true;
            individualOrBusiness.attr('readonly', false);
            if (individualOrBusiness[0].checked) {
                $("#" + individualOrBusiness[1].id).attr('readonly', true);
            }
            else {
                $("#" + individualOrBusiness[0].id).attr('readonly', true);
            }
            individualOrBusiness.closest("div").addClass("readonly-bkgrnd-color");
        }
        if (isMCO.toLowerCase() === "true") {
            var participatingMCOPrograms = $("#Provider_MCOParticipatingContractsFormatted").val();
            if (participatingMCOPrograms) {
                $("#divParticipatingPrograms").show();
                displayFieldAsRequired("Provider_ProgramParticipationQuestionsLabel", false);
            }
        }
        configureReadOnlyControls();
    } else if ($(applicationType).val() === reenrollment && $(isAllowReenrollmentRequest).val().toLowerCase() === "true") {
        $("#divHideRevalcurrentEnrolledEditSection").hide();
        $("#divHideRevalpreviousEnrolledEditSection").hide();
        $(providerNationalProviderIdentifierVal).readonly();
        makeReadOnlySSN();
        makeReadOnlyEIN();
        var isIndividualOrBusiness = individualOrBusiness[0].checked === true ? individualEntityType : individualOrBusiness[1].checked === true ? businessEntityType : false;
        enrollmentType = enrollmentTypeDDLData.value();
        disableIndividualOrBusiness(individualOrBusiness);
        if (allowSoleProprietorGroupFacilityEnrollment && (enrollmentType === facilityEnrollmentType || enrollmentType === groupEnrollmentType)) {
            disableEinOrSsnRedioButtonInGroupAndFacilityEnrollment();
        }
        makeReadOnlyContactInformation(enrollmentType, isIndividualOrBusiness);
        if ($('#EnrollmentAllowed').val() !== '' && $('#EnrollmentAllowed').val().toLowerCase() === yesFfsOnly.toLowerCase()) {
            if (currentStep >= 3) {
                // Resumed reenrollment: preserve existing saved ProgramType
                $(programType).data("kendoDropDownList").readonly();
                configureReadOnlyControls();
            } else {
                loadDropDownForFFSOnlyProgramType(false);
            }
        }

    } else if ($(applicationType).val() === newenrollment && $("#IsChowEnrollment").val().toLowerCase() === "true") {
        enrollmentType = enrollmentTypeDDLData.value();
        individualOrBusiness[1].checked = true;
        disableIndividualOrBusiness(individualOrBusiness);
        // Check if NPI or Tax ID changes require clearing legal name field
        const shouldClearLegalName = (!isNpiChangeRequiresNewEnrollment && $('#ChowNPI').val().trim() !== "") ||
            (!isTaxIDChangeRequiresNewEnrollment && $('#ChowTaxId').val().trim() !== "");

        if (!shouldClearLegalName) {
            makeLegalNameFieldsReadOnly();
        }

        $(providerNationalProviderIdentifierVal).readonly();
        $('input:radio[name="Provider.TaxIdentification.TaxIdTypes.ID"]')[0].checked = true;
        disableEinOrSsnRedioButtonInGroupAndFacilityEnrollment();
        if (enrollmentType !== individualEnrollmentType) {
            makeReadOnlySSN();
        }
        makeReadOnlyEIN();
        makePreferredCommunicationLanguagedropdownlistReadonly();
        setFieldAsNotRequired('Provider_CurrentLegacyProviderIdentifier', 'Provider_CurrentLegacyProviderIdentifier');
        setFieldAsNotRequired('Provider_PreviousLegacyProviderIdentifier', 'Provider_PreviousLegacyProviderIdentifier');
        $("#divHideRevalcurrentEnrolledEditSection").hide();
        $("#divHideRevalpreviousEnrolledEditSection").hide();
        $("#divProviderIDReval").show();
    }

    if (isDisableMedicareEnrollQuestion === false) {
        if ($(applicationType).val() === reval && individualGroupEnrollmentType === enrollmentTypeDDLData.value()) {
            $(divProviderSSNCode).addClass("editor-clear");
        }
    } else {
        $("#divHideMedicareEnrollQuestion").hide();
    }

    $("li[id='MCBMenu.PrintPreview']").children().removeAttr("href");
    var enrollAplicationId = "#EnrollmentApplicationId";
    id = $(enrollAplicationId).val();
    $("#StepName").val("GeneralInfo");
    $("#CurrentStep").val(3);
    $("#divProviderCAQHRegistration").show();

    //Load the values of SSN or EIN on enrollment resume
    toggleRequiredFieldsForAControlInsideADiv("#npiCheck", false);
    //Display Fields On Page Load

    $('input:radio[name="Provider.IsCurrentlyEnrolled.ID"]').change(function () {

        if ($('input:radio[name="Provider.IsCurrentlyEnrolled.ID"]')[0].checked === true) {
            onGeneralPageAlertMessage();
            isStepDataDirty = true;
        }
    });

    $("#" + taxIdentificationTaxId).change(function (e) {
        $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
        clearNPIChangeExecutedDetails();
        if ($(applicationType).val() !== reval && $(providerNationalProviderIdentifierVal).val() !== undefined && $("#" + taxIdentificationTaxIdHidden).val() !== undefined) {
            if (identifyMatchedActiveRegisteredProviderFlag.toLowerCase() === "true") {
                var param = {
                    npi: $(providerNationalProviderIdentifierVal).val(),
                    taxId: $("#" + taxIdentificationTaxIdHidden).val(),
                    enrollmentType: enrollmentTypeDDLData.value()
                };
                RegisteredProviderExist = makeSyncWebApiCall(searchRegisteredProvider, "POST", JSON.stringify(param), "application/json");
                $(legacyProviderID).val(RegisteredProviderExist.Data);
                setExistingServiceLocation();
            }
            else {
                setExistingServiceLocation();
            }
        }
    });

    $(providerNationalProviderIdentifierVal).change(function (e) {
        $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
        var isIndividualOrBusiness = $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]');
        $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
        var enrollmentTypeVal = enrollmentTypeDDLData.value();
        isIndividualOrBusiness = isIndividualOrBusiness[0].checked === true ? "Individual" : (isIndividualOrBusiness[1].checked === true ? "Business" : "default");
        if ($(applicationType).val() !== reval && $(providerNationalProviderIdentifierVal).val() !== undefined && $("#" + taxIdentificationTaxIdHidden).val() !== undefined && (enrollmentTypeVal === Facility || enrollmentTypeVal === Group || (enrollmentTypeVal === individualEnrollmentType && isIndividualOrBusiness === Business) || (enrollmentTypeVal === atypicalEnrollmentType && isIndividualOrBusiness === Business))) {
            if (identifyMatchedActiveRegisteredProviderFlag.toLowerCase() === "true") {
                var param = {
                    npi: $(providerNationalProviderIdentifierVal).val(),
                    taxId: $("#" + taxIdentificationTaxIdHidden).val(),
                    enrollmentType: enrollmentTypeVal
                };
                if (!isNPIChangeExecuted) {
                    RegisteredProviderExist = makeSyncWebApiCall(searchRegisteredProvider, "POST", JSON.stringify(param), "application/json");
                } else {
                    RegisteredProviderExist = isNPIChangeExecutedSearchRegisteredProviderResult;
                }
                if (RegisteredProviderExist.Data !== null) {
                    $(isPreviouslyRegisteredProvider).val(true);
                    $(legacyProviderID).val(RegisteredProviderExist.Data);
                    HideAndShowServiceFields();
                }
                else {
                    $(isPreviouslyRegisteredProvider).val(false);
                    $(legacyProviderID).val(RegisteredProviderExist.Data);
                    setExistingServiceLocation();
                }
            }
            else {
                setExistingServiceLocation();
            }
        }
        clearNPIChangeExecutedDetails();
    });

    function setExistingServiceLocation() {
        $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
        $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());

        if ($("#" + taxIdentificationSSNHidden).val() === undefined || $("#" + taxIdentificationSSNHidden).val() === "") {
            let ssnValue = $(providerTaxIdentificationSSNRawVal).val();
            if (ssnValue !== null && ssnValue !== "" && ssnValue !== undefined && ssnValue.indexOf("●") === -1) {
                $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
            }
        }
        var ssnOrTaxId = $("#" + taxIdentificationSSNHidden).val();

        if (ssnOrTaxId === undefined || ssnOrTaxId === "") {
            $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
            ssnOrTaxId = $("#" + taxIdentificationTaxIdHidden).val();
        }

        if (setExistingServiceLocationFlag.toLowerCase() === "true") {
            if (isNPIAndSSNFieldsFilled(ssnOrTaxId)) {
                var param = {
                    npi: $(providerNationalProviderIdentifierVal).val(),
                    taxId: ssnOrTaxId.replace(/-/g, ''),
                    enrollmentType: enrollmentTypeDDLData.value()
                };
                var serviceLocationCodeExist = null;
                if (!isNPIChangeExecuted) {
                    serviceLocationCodeExist = makeSyncWebApiCall(searchExistingServiceLocation, "POST", JSON.stringify(param), "application/json");
                } else {
                    isNPIChangeExecutedSearchExistingServiceLocationResult = null;
                    serviceLocationCodeExist = isNPIChangeExecutedSearchExistingServiceLocationResult;
                }
                $(isServiceLocationExist).val(serviceLocationCodeExist.Data);
                HideAndShowServiceFields();
            }
            else {
                $(isServiceLocationExist).val('false');
            }
        }
    }

    function HideAndShowServiceFields() {
        showHideGeneralCredentialInformationOnChange();
    }

    $('input:radio[name="Provider.IsPreviouslyEnrolled.ID"]').change(function () {
        checkPreviousEnrollment();
    });

    $('input:radio[name="Provider.IsMedicareEnrolled.ID"]').change(function () {
        checkMedicareEnrollment();
        showHideGeneralCredentialInformationOnChange();
    });

    $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegistered.ID"]').change(function () {
        checkCAQHRegistration();
    });

    $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]').change(function () {
        populateRedactionWidget("Provider_TaxIdentification_SSN", "");
        $("#Provider_TaxIdentification_SSNHidden").val("");
        populateRedactionWidget("Provider_TaxIdentification_TaxId", "");
        $("#Provider_TaxIdentification_TaxIdHidden").val("");
        checkIndividualOrBusiness();
        $(divEnrollmentIndividualIdentification).find(inputText).val('');
        $(divEnrollmentIndividualIdentification).find(dataroleDropdownlist).each(function () { $(this).data("kendoDropDownList").text(""); });
        $(divProviderSSNCode).find(inputText).val('');
        $(divProviderSSNCode).find(inputPassword).val('');
        $(divNPI).find(inputText).val('');
        $(divEnrollmentGroupFacilityIdentification).find(inputText).val('');
        $(divProviderEINCode).find(inputText).val('');
        $(divProviderEINCode).find(inputPassword).val('');
        $(divProviderEffectiveDate).find(inputText).val('');
        clearValidationMessage(divGeneralInfo);
        showHideGeneralCredentialInformationOnChange();
    });

    $(nextButtonId).prop('value', buttonContinueSaveText);
    $("#CurrentStep").val(3);

    $(enrollmentCriteriaEnrollmentTypeList).change(function (e) {
        var enrollmentCriteriaProviderTypeListVal = enrollmentCriteriaProviderTypeListId;
        if (enrollmentTypeChanged) {
            var programTypeDDLData = $(programType).data("kendoDropDownList");
            programTypeDDLData.readonly(false);
            resetProgramTypeDropdown();
            $(divForIndividualOrBusiness).hide();
            $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]').prop('checked', false);
            $(divProgramParticipationAnswer).hide();
            clrKendoDropdownList(enrollmentCriteriaProviderTypeListVal);
            resetProviderTypeDropDown();
            ClearValidationMessage(enrollmentCriteriaProviderTypeListVal);
            ClearValidationMessage("RequestedEffectiveDate");
            $(divGeneralInfo).find(inputText).val('');
            $(divGeneralInfo).find(inputPassword).val('');
            $(divGeneralInfo).find(dataroleDropdownlist).each(function () {
                $(this).data("kendoDropDownList").text("");
            });
            var enrollmentType = enrollmentTypeDDLData.value();
            if (enrollmentType === individualEnrollmentType) {
                $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]')[0].checked = true;
                checkIndividualOrBusiness();
            }
            if (allowSoleProprietorGroupFacilityEnrollment && (enrollmentType === groupEnrollmentType || enrollmentType === facilityEnrollmentType)) {
                $('input:radio[name="Provider.TaxIdentification.TaxIdTypes.ID"]')[0].checked = true;
                checkdProviderTaxIdentificationTaxIdTypes();
            }
            clearValidationMessage(divGeneralInfo);
            var providerIsCurrentlyEnrolled = "#Provider_IsCurrentlyEnrolled";
            var providerIsPreviouslyEnrolled = "#Provider_IsPreviouslyEnrolled";
            var providerIsMedicareEnrolled = "#Provider_IsMedicareEnrolled";
            $(providerIsCurrentlyEnrolled).prop('checked', false);
            $(providerIsPreviouslyEnrolled).prop('checked', false);
            $(providerIsMedicareEnrolled).prop('checked', false);
            checkCurrentEnrollment();
            checkPreviousEnrollment();
            checkMedicareEnrollment();
            showHideCAQHQuestion();
            checkCAQHRegistration();
            if (isMCO.toLowerCase() === "true") {
                updateMcoProgramsList();
            }
        }
        if (enrollmentType != "") {
            controlToFocusOnClose = enrollmentCriteriaProviderTypeListId;
            $(enrollmentCriteriaEnrollmentTypeList).focusout();
            displayPopupDialog(messageType, enrollmentTypeHdr, enrollmentTypeWarningMessage, null, controlToFocusOnClose);
        }
        onEnrollmentTypeSelect();
        checkProviderTypeFields();
        if ($(enrollmentCriteriaEnrollmentTypeList).val() === "") {
            showOrHideTrackingNumber(false);
        }
        else {
            showOrHideTrackingNumber(true);
        }
        showHideGeneralCredentialInformationOnChange();
        enrollmentType = enrollmentTypeDDLData.value();
        checkGeneralCredentialInformation(enrollmentType);
        configureReadOnlyControls();
    });

    $("#Provider_ProgramTypeList").change(function () {
        var providerCAQHProviderID = "Provider_ProviderCAQHRegistration_CAQHProviderID";
        var enrollmentType = enrollmentTypeDDLData.value();
        var programTypeSelectAll = "#ProgramTypeSelectAll";

        if ($(applicationType).val() !== reval) {
            let mcoProgramsMultiSelect = $(mcoPrograms).data('kendoMultiSelect');
            if (mcoProgramsMultiSelect) {
                mcoProgramsMultiSelect.value('');
            }
        }

        showHideGeneralCredentialInformationOnChange();
        ClearValidationMessage(providerCAQHProviderID);
        $(programTypeSelectAll).prop('checked', false);
        if (!isCustomMultipleProgramTypesFlag && customSingleProgramTypes.length > 0) {
            $(providerSelectedProgramTypeCode).val('');
            for (var i = 0; i < customSingleProgramTypes.length; i++) {
                if (customSingleProgramTypes[i].Text === $(programType).data("kendoDropDownList").text()) {
                    $(providerSelectedProgramTypeCode).val(customSingleProgramTypes[i].programTypeID);
                    break;
                }
            }
        }
    });

    $(':input').change(function () {
        ignoreDirtyData = false;
        isStepDataDirty = true;
    });

    if (!providerTypeLoaded) {
        onEnrollmentTypeSelect();
    }

    checkCurrentEnrollment();
    checkPreviousEnrollment();
    checkMedicareEnrollment();
    checkCAQHRegistration();
    var enrollmentType = enrollmentTypeDDLData.value();
    if (enrollmentType === atypicalEnrollmentType) {
        checkIndividualOrBusiness();
    }
    checkProviderTypeFields();
    displayIndividualIdentification(enrollmentTypeDDLData.value());


    enrollmentTypeDDLData.bind("dataBound", function (e) {
        InitalizeDropdownHide();
    });

    if ($(enrollmentCriteriaEnrollmentTypeList).val() === "") {
        showOrHideTrackingNumber(false);
    }

    $("#divCAQHRegisteredReval").hide();
    if ($(applicationType).val() === mcoEnrollment) {
        $("input.k-textbox[readonly!='readonly']").readonly();
        $(applicantContactPreferredCommunicationMethodList).data("kendoDropDownList").readonly();
        $("#divPreferredCommunicationMethod").hide();
        $("#ApplicantContact_PhoneNumberTypeList").data("kendoDropDownList").readonly();
        $("#Provider_ProgramTypeList").data("kendoDropDownList").readonly();
        $(applicantContactAddressCountryList).data("kendoDropDownList").readonly();
        $(applicantContactAddressStatesList).data("kendoDropDownList").readonly();

        if ($("#divProviderCAQHRegistration").css("display") === "block") {
            $("#divCAQHRegisteredReval").show();
            $("#divCAQHRegisteredNew").hide();
            $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegisteredReval.ID"]').attr('readonly', true);
            $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegisteredReval.ID"]').closest("div").addClass("readonly-bkgrnd-color");
        }
        $("#" + providerBirthPlaceInformationCity).attr("readonly", false);
        $(providerECFMGNumberVal).attr("readonly", false);
        $(providerECFMGCertificateIssueDateVal).attr("readonly", false);
        $("#" + providerUPIN).attr("readonly", false);

        configureReadOnlyControls();
    }

    $("#Provider_GeneralCredentialInformation_ECFMGNumber").kendoMaskedTextBox({
        mask: ecfmgMask
    });

    showHideCAQHQuestion();
    toggleCAQHInstructionalText();
    runCredentialingValidationForServiceLocation();
    runExistingServiceLocationValidationForRaIndicator();
    diableEnrollmentAndProviderTypeDropDown();
    showHideProgramTypeOnPageLoad();
    showHideGeneralCredentialInformationOnChange();
    checkGeneralCredentialInformation(enrollmentType);
    showHidePreferredCommunication();
    setNurseParctitionerNameAsNotRequired();
    setRevalRiskLevel();
    configureReadOnlyControls();
    populateRedactionWidget("Provider_TaxIdentification_SSN", $('#Provider_TaxIdentification_SSNHidden').val());
    populateRedactionWidget("Provider_TaxIdentification_TaxId", $('#Provider_TaxIdentification_TaxIdHidden').val());
    applyRedactions();

    if (isEnableElectronicDocumentSignatureFlag) {
        setPreferredCommunicationToEmailForEsignature();
    }
});

function onSendPhoneNumberVerificationCodeYes() {
    $(window).off('beforeunload');
    var languagecode = "";
    if ($("#Provider_PreferredCommunicationDetails_LanguageListList").val() !== null && $("#Provider_PreferredCommunicationDetails_LanguageListList").val() !== undefined && $("#Provider_PreferredCommunicationDetails_LanguageListList").val() !== "undefined") {
        languagecode = $("#Provider_PreferredCommunicationDetails_LanguageListList").val()
    }
    var params = {
        phoneNumber: $(applicantContactPhoneNumber).val(),
        trackingNumber: $("#TrackingNumber").val(),
        PreferredCommunicationLanguageCode: languagecode
    };
    openModalOverlay("PhoneNumberAuthenticationForm", phoneNumberAuthenticationMvcUrl, 'panelForm-col-3', null, params);
}

function onSendPhoneNumberVerificationCodeNo() {
    $(applicantContactAllowTextNotifications).prop('checked', false);
}

$(applicantContactAllowTextNotifications).change(function (e) {
    if (enableSmsMessages && !hasRightsEnrollmentWithoutSave) {
        if ($(applicantContactAllowTextNotifications).is(':checked')) {
            if (validatePhoneNumber()) {
                if ($(applicantContactPhoneExtension).val() === "") {
                    displayPopupOKCancelDialog(messageWarning, allowTextNotificationTitle, allowTextNotificationsAlert, globalYes, "onSendPhoneNumberVerificationCodeYes", globalNo, "onSendPhoneNumberVerificationCodeNo");
                }
                else {
                    setKendoValidatorFieldMessage($(applicantContactPhoneExtension), textNotificationForPhoneExtensionmsg);
                    onSendPhoneNumberVerificationCodeNo();
                }
            }
            else {
                onSendPhoneNumberVerificationCodeNo();
            }
        }
    }
})

function validatePhoneNumber() {
    if ($(applicantContactPhoneNumber).val() === "") {
        setKendoValidatorFieldMessage($(applicantContactPhoneNumber), $(applicantContactPhoneNumber).attr("data-val-required"));
        return false
    }
    else {
        var fieldRegex = new RegExp($(applicantContactPhoneNumber).attr("data-val-regex-pattern"));
        var fieldValue = $(applicantContactPhoneNumber).val();
        if (!fieldRegex.test(fieldValue)) {
            setKendoValidatorFieldMessage($(applicantContactPhoneNumber), $(applicantContactPhoneNumber).attr("data-val-regex"));
            return false
        }
        return true
    }
}

$(applicantContactPhoneNumber).change(function (e) {
    if (enableSmsMessages) {
        if ($(applicantContactAllowTextNotifications).is(':checked')) {
            displayPopupDialog("info", phoneNumberHdr, changeOfPhoneNumberAlert);
        }
        if ($(applicantContactPhoneNumber).val() !== "") {
            $("#ApplicantContact_PhoneNumber_PhoneNumber_validationMessage").resetValidation();
        }
        onSendPhoneNumberVerificationCodeNo();
    }
})

$(applicantContactPhoneExtension).change(function (e) {
    if (enableSmsMessages) {
        if ($(applicantContactAllowTextNotifications).is(':checked')) {
            if ($(applicantContactPhoneExtension).val() !== "") {
                onSendPhoneNumberVerificationCodeNo();
            }
        }
        $("#ApplicantContact_PhoneNumber_PhoneExtension_validationMessage").resetValidation();
    }
})

function setRevalRiskLevel() {
    if ($("#ReasonCode").val() === "" && ($("#ActiveStep").val() === "" || $("#ActiveStep").val() === "3")) {
        if ($(applicationType).val() === reval) {
            if (isMCO.toLowerCase() === "false") {
                var providerTypeParm;
                var providerTypeValue = providerTypeDDLData.value() === '' ? $("#EnrollmentCriteria_ProviderType_ID").val() : providerTypeDDLData.value();
                if (providerTypeValue !== "" && providerTypeValue !== null) {
                    var enrollmentTypeValue = enrollmentTypeDDLData.value !== undefined ? enrollmentTypeDDLData.value() : $("#EnrollmentCriteria_EnrollmentType_ID").val();
                    providerTypeParm = { providerType: providerTypeValue, applicationType: $("#ApplicationType").val(), enrollmentType: enrollmentTypeValue };
                    var attributeResult = makeSyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(providerTypeParm), "application/json");
                    processProviderTypesAttributesSuccess(attributeResult);

                }
            }
            if (revalRiskLevel !== "" && revalRiskLevel !== undefined && revalRiskLevel !== $("#RiskLevel").val()) {
                displayPopupDialog(messageType, providerTypeHdr, riskLevelDropWarningMessage.replace('{0}', setRiskLevelDescription(revalRiskLevel)));
                $("#RiskLevel").val(revalRiskLevel);
            }

        }
    }
}

function setRiskLevelDescription(revalRiskLevelvalue) {
    if (riskLevelDataListItems !== null && riskLevelDataListItems.length > 0) {
        for (i = 0; i < riskLevelDataListItems.length; i++) {
            if (riskLevelDataListItems[i].Value === revalRiskLevelvalue) {
                return riskLevelDataListItems[i].Text;

            }
        }
    }
}

function setNurseParctitionerNameAsNotRequired() {
    setFieldAsNotRequired(providerNursePractitionerPhysicianFirstName, providerNursePractitionerPhysicianFirstName);
    setFieldAsNotRequired(providerNursePractitionerPhysicianLastName, providerNursePractitionerPhysicianLastName);
}

function clearNPIChangeExecutedDetails() {
    isNPIChangeExecuted = false;
    isNPIChangeExecutedSearchExistingServiceLocationResult = null;
    isNPIChangeExecutedSearchRegisteredProviderResult = null;
}

function getMCOProgramsListSuccess(result) {
    if (result.Data) {
        for (var i = 0; i < result.Data.length; i++) {
            mcoProgramsList.push([result.Data[i].Name, result.Data[i].Id, result.Data[i].URL]);
        }

        if (mcoProgramsList.length > 0) {
            data = [{ program: mcoProgramsList[0][0], code: mcoProgramsList[0][1], url: mcoProgramsList[0][2] }];
        }
        for (x = 1; x < mcoProgramsList.length; x++) {
            data[x] = {
                program: mcoProgramsList[x][0],
                code: mcoProgramsList[x][1],
                url: mcoProgramsList[x][2]
            };
        }
        $(mcoPrograms).kendoMultiSelect({
            dataTextField: "program",
            dataValueField: "code",
            dataSource: data
        });
        $(divProgramType).show();
        AssignProgramParticipation();
        showHideGeneralCredentialInformationOnChange();
    }
}

function showHidePreferredCommunication() {
    if (isEnablePreferredCommunicationLanguage === false) {
        $("#divPreferredLanguage").hide();
        setFieldAsNotRequired(providerPreferredCommunicationDetailsLanguageListList, providerPreferredCommunicationDetailsLanguageListList);
        var preferredCommunicationLanguagedropdownlist = $("#Provider_PreferredCommunicationDetails_LanguageListList").data("kendoDropDownList");
        if (preferredCommunicationLanguage === '' || preferredCommunicationLanguage === null) {
            preferredCommunicationLanguagedropdownlist.value(defaultLanguage);
            var sel = $('#Provider_PreferredCommunicationDetails_LanguageListList').val();
            if (sel !== '') {
                $('#Provider_PreferredCommunicationDetails_LanguageList_ID').val(sel);
                var txt = preferredCommunicationLanguagedropdownlist.text();
                $('#Provider_PreferredCommunicationDetails_LanguageList_Name').val(txt);
            } else {
                $('#Provider_PreferredCommunicationDetails_LanguageList_ID').val('');
                $('#Provider_PreferredCommunicationDetails_LanguageList_Name').val('');
            }
        }
    }
    else {
        $("#divPreferredLanguage").show();
        setFieldAsRequired('Provider_PreferredCommunicationDetails_LanguageListList', 'Provider_PreferredCommunicationDetails_LanguageList');
    }
}

$("#Provider_PreviousLegacyProviderIdentifier").change(function () {
    if ($("#Provider_PreviousLegacyProviderIdentifier").val() !== "" && $("#Provider_PreviousLegacyProviderIdentifier").val().replaceAll('_', '') !== "" && isDisableReenrollmentOption === false) {
        displayPopupOKCancelDialog("Warning", reenrollmentConfirmationPopUpHeader, isReenrollmentAlert, globalYes, "", globalNo, "onGeneralPageReEnrollmentNo");
    }
});

function setRequiredFieldProperty() {
    var preferredCommunicationType = $(applicantContactPreferredCommunicationMethodList).data("kendoDropDownList").value();
    if (isEnableMultiFactorAuthentication || preferredCommunicationType === "E") {
        setEmailAsRequired();
    }
    else {
        if ($(applicantContactEmailAddressConfirmation).val().trim() !== "") {
            setFieldAsRequired(applicantContactEmailAddressID, applicantContactEmailAddressID);
        }
        else {
            setFieldAsNotRequired(applicantContactEmailAddressID, applicantContactEmailAddressID);
        }
        if ($(applicantContactEmailAddress).val().trim() !== "") {
            setFieldAsRequired(applicantContactEmailAddressConfirmationID, applicantContactEmailAddressConfirmationID);
        }
        else {
            setFieldAsNotRequired(applicantContactEmailAddressConfirmationID, applicantContactEmailAddressConfirmationID);
        }
    }
}

function setEmailAsRequired() {
    setFieldAsRequired(applicantContactEmailAddressID, applicantContactEmailAddressID);
    setFieldAsRequired(applicantContactEmailAddressConfirmationID, applicantContactEmailAddressConfirmationID);
}

$("#" + taxIdentificationSSN).change(function () {
    $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
    clearNPIChangeExecutedDetails();
    registeredProviderExistingDetails();
    runExistingServiceLocationValidationForRaIndicator();
});

$("#" + taxIdentificationTaxIdHidden).change(function () {
    clearNPIChangeExecutedDetails();
    registeredProviderExistingDetails();
    runExistingServiceLocationValidationForRaIndicator();
});

$("#Provider_NationalProviderIdentifier").change(function () {
    clearNPIChangeExecutedDetails();
    isNPIChangeExecuted = true;
    registeredProviderExistingDetails();
    runExistingServiceLocationValidationForRaIndicator();
});

function registeredProviderExistingDetails() {
    if ($("#" + taxIdentificationSSNHidden).val() === undefined || $("#" + taxIdentificationSSNHidden).val() === "") {
        let ssnValue = $(providerTaxIdentificationSSNRawVal).val();
        if (ssnValue !== null && ssnValue !== "" && ssnValue !== undefined && ssnValue.indexOf("●") === -1) {
            $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
        }
    }
    var ssnOrTaxId = $("#" + taxIdentificationSSNHidden).val();
    if (ssnOrTaxId === undefined || ssnOrTaxId === "") {
        ssnOrTaxId = $("#" + taxIdentificationTaxIdHidden).val();
    }

    if ($(applicationType).val() !== reval && isNPIAndSSNFieldsFilled(ssnOrTaxId)) {
        if (identifyMatchedActiveRegisteredProviderFlag.toLowerCase() === "true" && $("#IsChowEnrollment").val().toLowerCase() === "false") {
            var param = {
                npi: $(providerNationalProviderIdentifierVal).val(),
                taxId: ssnOrTaxId.replace(/-/g, ''),
                enrollmentType: enrollmentTypeDDLData.value()
            };
            RegisteredProviderExist = makeSyncWebApiCall(searchRegisteredProvider, "POST", JSON.stringify(param), "application/json");
            isNPIChangeExecutedSearchRegisteredProviderResult = RegisteredProviderExist;
            if (RegisteredProviderExist.Data !== null) {
                $(isPreviouslyRegisteredProvider).val(true);
                $(legacyProviderID).val(RegisteredProviderExist.Data);
                showHideGeneralCredentialInformationOnChange();
            }
            else {
                $(isPreviouslyRegisteredProvider).val(false);
                $(legacyProviderID).val(RegisteredProviderExist.Data);
                runCredentialingValidationForServiceLocation();
            }
        }
        else {
            runCredentialingValidationForServiceLocation();
        }
    }
}

function runCredentialingValidationForServiceLocation() {
    if ($("#" + taxIdentificationSSNHidden).val() === undefined || $("#" + taxIdentificationSSNHidden).val() === "") {
        let ssnValue = $(providerTaxIdentificationSSNRawVal).val();
        if (ssnValue !== null && ssnValue !== "" && ssnValue !== undefined && ssnValue.indexOf("●") === -1) {
            $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
        }
    }
    var ssnOrTaxId = $("#" + taxIdentificationSSNHidden).val();
    if (ssnOrTaxId === undefined || ssnOrTaxId === "") {
        ssnOrTaxId = $("#" + taxIdentificationTaxIdHidden).val();
    }
    if (isNPIAndSSNFieldsFilled(ssnOrTaxId)) {
        var params = {
            npi: $(providerNationalProviderIdentifierVal).val(),
            taxId: ssnOrTaxId.replace(/-/g, ''),
            enrollmentType: enrollmentTypeDDLData.value()
        };
        var returnValue = makeSyncWebApiCall(searchExistingServiceLocation, "POST", JSON.stringify(params), "application/json");
        $(isServiceLocationExist).val(returnValue.Data);
        showHideGeneralCredentialInformationOnChange();
        if (isNPIChangeExecuted) {
            isNPIChangeExecutedSearchExistingServiceLocationResult = null;
            isNPIChangeExecutedSearchExistingServiceLocationResult = returnValue;
        }
    }
}

function runExistingServiceLocationValidationForRaIndicator() {
    if ($("#" + taxIdentificationSSNHidden).val() === undefined || $("#" + taxIdentificationSSNHidden).val() === "") {
        let ssnValue = $(providerTaxIdentificationSSNRawVal).val();
        if (ssnValue !== null && ssnValue !== "" && ssnValue !== undefined && ssnValue.indexOf("●") === -1) {
            $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
        }
    }
    var ssnOrTaxId = $("#" + taxIdentificationSSNHidden).val();
    if (ssnOrTaxId === undefined || ssnOrTaxId === "") {
        ssnOrTaxId = $("#" + taxIdentificationTaxIdHidden).val();
    }
    if ($(applicationType).val() !== reval && isNPIAndSSNFieldsFilled(ssnOrTaxId) && isEnableRemittancePrintIndicator && printedRaRequestedMaintainedAtBaseLocation && $("#IsChowEnrollment").val().toLowerCase() !== "true") {
        var params = {
            npi: $(providerNationalProviderIdentifierVal).val(),
            taxId: ssnOrTaxId.replace(/-/g, ''),
            enrollmentType: enrollmentTypeDDLData.value()
        };
        var returnValue = makeSyncWebApiCall(searchExistingServiceLocation, "POST", JSON.stringify(params), "application/json");
        $(npiTaxIdExists).val(returnValue.Data);
    }
}

function onEnrollmentTypeSelect() {
    var enrollmentType = enrollmentTypeDDLData.value();
    var enrollmentCriteriaProviderTypeListVal = enrollmentCriteriaProviderTypeListId;
    displayIndividualIdentification(enrollmentType);

    if (enrollmentType === atypicalEnrollmentType) {
        checkIndividualOrBusiness();
        if ($(applicationType).val() !== reval && $(applicationType).val() !== mcoEnrollment) {
            $(divForIndividualOrBusiness).show();
        }
    }
    if (enrollmentType !== null && enrollmentType !== '') {
        let providerTypesParm = {
            enrollmentType: enrollmentType,
            isCAQHEnrollment: $("#IsCAQHEnrollment").val() === "True",
            applicationType: $(applicationType).val(),
            skipCAQHMandatedTypes: true
        };
        makeAsyncWebApiCall(providerTypeWebApiUrl, "POST", JSON.stringify(providerTypesParm), "application/json", "processProviderTypesSuccess");
        enrollmentTypeChanged = true;
        $("li[id='MCBMenu.PrintPreview']").show();
        $("li[id='MCBMenu.PrintPreview']").children().attr("href", "javascript:getPrintPreview();");
        showOrHideTrackingNumber(true);
        toggleCAQHInstructionalText();
    }
    else {
        $("#toc").hide();
        clrKendoDropdownList(enrollmentCriteriaProviderTypeListVal);
        $("li[id='MCBMenu.PrintPreview']").children().removeAttr("href");
    }
}

function processProviderTypesAttributesSuccess(result) {
    GetProviderTypeAttributeValue(result.Data);
    setGenderAsRequiredBasedOnProviderTypeAttribute(result.Data);
    collectCredentialTypeBasedOnProviderTypeAttribute(result.Data);
}

function setGenderAsRequiredBasedOnProviderTypeAttribute(listAttributes) {
    if (listAttributes.ProviderTypeDataListAttributes !== null && listAttributes.ProviderTypeDataListAttributes.length > 0) {
        for (i = 0; i < listAttributes.ProviderTypeDataListAttributes.length; i++) {
            if (listAttributes.ProviderTypeDataListAttributes[i] !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== ""
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName == "EnableEnrollmentCredentialingDetails") {
                var enrollmentType = enrollmentTypeDDLData.value();
                var attributeValue = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                if (attributeValue.toLowerCase() === "true" && enrollmentType === "I") {
                    setFieldAsRequired('Provider_IndividualProvider_GenderList', 'Provider_IndividualProvider_Gender');
                }
                else {
                    setFieldAsNotRequired('Provider_IndividualProvider_GenderList', 'Provider_IndividualProvider_Gender');
                }
            }
        }
    }
}

function processProviderTypesAttributesFailure(result) {
    controlToFocusOnClose = enrollmentCriteriaProviderTypeListId;
    $(enrollmentCriteriaProviderTypeList).data("kendoDropDownList").value('');
    $(enrollmentCriteriaProviderTypeList).data("kendoDropDownList").text('');
    $(enrollmentCriteriaProviderTypeList).focus();
    displayPopupDialog(messageTypeError, technicalErrorHeader, technicalErrorMessage, null, controlToFocusOnClose);
}

function onGeneralPageAlertMessage() {
    displayPopupOKCancelDialog(messageWarning, revalidatePopupTitle, isRevalidationAlert, globalYes, "onGeneralPageAlertMessageYes", globalNo, "onGeneralPageAlertMessageNo");
}

function onGeneralPageAlertMessageYes() {
    isStepDataDirty = false;
    window.location = revalidateActionUrl;
}

function onGeneralPageAlertMessageNo() {
    $('input:radio[name="Provider.IsCurrentlyEnrolled.ID"]')[0].checked = false;
    $('input:radio[name="Provider.IsCurrentlyEnrolled.ID"]')[1].checked = true;
    checkCurrentEnrollment();
}
function onGeneralPageReEnrollmentNo() {
    $('input:radio[name="Provider.IsPreviouslyEnrolled.ID"]')[1].checked = true;
    checkPreviousEnrollment();
}

function collectCredentialTypeBasedOnProviderTypeAttribute(listAttributes) {
    var isEnableEnrollmentCredentialingDetailsAttributePresent = false;
    if (listAttributes.ProviderTypeDataListAttributes !== null && listAttributes.ProviderTypeDataListAttributes.length > 0) {
        for (i = 0; i < listAttributes.ProviderTypeDataListAttributes.length; i++) {
            if (listAttributes.ProviderTypeDataListAttributes[i] !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== ""
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName === "EnableEnrollmentCredentialingDetails") {
                isEnableEnrollmentCredentialingDetailsAttributePresent = true;
                if (listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue === "true") {
                    $("#CredentialType").show();
                    setFieldAsRequired(credentialTypeList, "Provider_CredentialType");
                    break;
                }
                else {
                    if ($("#IsCAQHEnrollment").val().toLowerCase() === "undefined" || $("#IsCAQHEnrollment").val().toLowerCase() === "false") {
                        resetCredentialTypeDropDown();
                    }
                }
            }
        }

        if ($("#IsCAQHEnrollment").val().toLowerCase() === "true") {
            $("#CredentialType").show();
            var credentialTypeDropdown = $("#Provider_CredentialTypeList").data("kendoDropDownList");
            credentialTypeDropdown.readonly(true);
            configureReadOnlyDropDownListWidgets();
        }
        else if (!isEnableEnrollmentCredentialingDetailsAttributePresent) {
            $("#CredentialType").hide();
            setFieldAsNotRequired(credentialTypeList, credentialTypeList);
            $("#" + credentialTypeList).data("kendoDropDownList").select(null);
            $("#Provider_CredentialType_ID").val("");
            $("#Provider_CaredentialType_Name").val("");
        }
    }
}

function GetProviderTypeAttributeValue(listAttributes) {

    if (listAttributes !== null) {
        controlToFocusOnClose = "RequestedEffectiveDate";
        if (!$(enrollmentCriteriaProviderTypeList).prop('readonly')) {
            setProviderTypeAttributes(listAttributes);
        }
        else if ($(enrollmentCriteriaProviderTypeList).prop('readonly') && $(applicationType).val() === newenrollment && $("#IsChowEnrollment").val().toLowerCase() === "true") {
            if (listAttributes.ProviderTypeDataListAttributes !== null && listAttributes.ProviderTypeDataListAttributes.length > 0) {
                for (i = 0; i < listAttributes.ProviderTypeDataListAttributes.length; i++) {
                    if (listAttributes.ProviderTypeDataListAttributes[i] !== null
                        && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== null
                        && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== "") {
                        switch (listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName) {
                            case "RiskLevel":
                                var risklevel = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                                $("#RiskLevel").val(risklevel);
                                break;
                            case "EnrollmentAllowed":
                                $("#EnrollmentAllowed").val(listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue);
                                break;
                            case "RevalidationRiskLevel":
                                revalRiskLevel = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                                break;
                            case "MedicareCrossoverOnly":
                                $("#MedicareCrossoverOnly").val(listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue.toLowerCase());
                                break;
                        }
                    }
                }
            }
        }
        else {
            setProviderTypeAttributesRevalRiskLevel(listAttributes);
        }

        if (($(applicationType).val() === newenrollment || $(applicationType).val() === reenrollment || $(applicationType).val() === reval)
            && listAttributes.EnrollmentTypeEnrollmentAllowed !== null && listAttributes.EnrollmentTypeEnrollmentAllowed !== undefined && listAttributes.EnrollmentTypeEnrollmentAllowed.trim() !== "") {
            $("#EnrollmentAllowed").val(listAttributes.EnrollmentTypeEnrollmentAllowed.trim());
        }

        if ($("#RiskLevel").val() !== "" || $("#IsCAQHEnrollment").val().toLowerCase() === "true" || $(applicationType).val() === reval) {
            showHideProgramTypeOnTheBasisOfProviderTypeOnChange($("#EnrollmentAllowed").val(), listAttributes);
        }
    }
}

function setProviderTypeAttributesRevalRiskLevel(listAttributes) {

    if (listAttributes.ProviderTypeDataListAttributes !== null && listAttributes.ProviderTypeDataListAttributes.length > 0) {
        for (i = 0; i < listAttributes.ProviderTypeDataListAttributes.length; i++) {
            if (listAttributes.ProviderTypeDataListAttributes[i] !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== "") {
                if (listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName === "RevalidationRiskLevel") {
                    revalRiskLevel = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                }
                if (listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName === enrollmentAllowedAttrName) {
                    $("#EnrollmentAllowed").val(listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue);
                }
            }
        }
    }
    if (listAttributes.RiskLevelDataListItems !== null) {
        riskLevelDataListItems = listAttributes.RiskLevelDataListItems.LocaleDataListItems;
    }
}

function setProviderTypeAttributes(listAttributes) {

    if (listAttributes.ProviderTypeDataListAttributes !== null && listAttributes.ProviderTypeDataListAttributes.length > 0) {
        for (i = 0; i < listAttributes.ProviderTypeDataListAttributes.length; i++) {
            if (listAttributes.ProviderTypeDataListAttributes[i] !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== "") {
                switch (listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName) {
                    case "RiskLevel":
                        risk = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                        $("#RiskLevel").val(risk);
                        $(enrollmentCriteriaProviderTypeList).focusout();
                        switch (risk) {
                            case "H":
                                displayPopupDialog(messageType, providerTypeHdr, highRiskProviderTypeWarningMessage + ProviderTypeWarningMessage, null, controlToFocusOnClose);
                                break;
                            case "M":
                                displayPopupDialog(messageType, providerTypeHdr, mediumRiskProviderTypeWarningMessage + ProviderTypeWarningMessage, null, controlToFocusOnClose);
                                break;
                            case "L":
                                displayPopupDialog(messageType, providerTypeHdr, ProviderTypeWarningMessage, null, controlToFocusOnClose);
                                break;
                            default:
                                controlToFocusOnClose = "";
                                $(enrollmentCriteriaProviderTypeList).data("kendoDropDownList").value('');
                                $(enrollmentCriteriaProviderTypeList).data("kendoDropDownList").text('');
                                $(enrollmentCriteriaProviderTypeList).focus();
                                displayPopupDialog(messageTypeError, technicalErrorHeader, technicalErrorMessage, null, controlToFocusOnClose);
                                break;
                        }
                        break;
                    case "EnrollmentAllowed":
                        $("#EnrollmentAllowed").val(listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue);
                        break;
                    case "RevalidationRiskLevel":
                        revalRiskLevel = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                        break;
                    case "MedicareCrossoverOnly":
                        $("#MedicareCrossoverOnly").val(listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue.toLowerCase());
                        break;
                }
            }
        }
    }
}

function initializeProviderTypeDropdown() {
    var enrollmentAllowedAttribute = $('#EnrollmentAllowed').val();
    providerTypeDDLData = $(enrollmentCriteriaProviderTypeList).data("kendoDropDownList");
    providerTypeDDLData.unbind();
    providerTypeDDLData.bind("change", providerTypeDropDownChanged);
    if ($("#Provider_ProgramType_ID").val() === null || $("#Provider_ProgramType_ID").val() === "") {
        clrKendoDropdownList("Provider_ProgramTypeList");
    }
    else if ($("#Provider_ProgramType_ID").val() !== null || $("#Provider_ProgramType_ID").val() !== "") {
        $(programType).data("kendoDropDownList").value($("#Provider_ProgramType_ID").val());
    }
    if (enrollmentAllowedAttribute.toLowerCase() !== null && enrollmentAllowedAttribute.toLowerCase() !== "custommultiple") {
        $(divCustomMultipleProgramTypes).hide();
    }
}

function setDataSourceForProviderTypeDropDown(dropDownId, data) {
    clrKendoDropdownList(dropDownId);
    var dataSource = new kendo.data.DataSource({ data: data });
    providerTypeDDLData.setDataSource(dataSource);
}

function diableEnrollmentAndProviderTypeDropDown() {
    preVal = $("#EnrollmentCriteria_ProviderType_ID").val();

    if (editorStep === 3 && enrollmentTypeChanged === true) {

        if ($("#EnrollmentCriteria_ProviderType_ID").val()) {
            enrollmentTypeDDLData.readonly(true);
            providerTypeDDLData.readonly(true);
        }
    }
    configureReadOnlyControls();
}

function providerTypeDropDownChanged(e) {
    var curVal = providerTypeDDLData.value();
    var enrollmentType = enrollmentTypeDDLData.value();
    var ptsel = curVal;
    var providerTypeParm;
    // Only reset ProgramType if provider type actually changed (not during page re-initialization)
    var existingProviderTypeId = $("#EnrollmentCriteria_ProviderType_ID").val();
    if (curVal !== existingProviderTypeId) {
        $(programType).data("kendoDropDownList").value('');
        $("#EnrollmentAllowed").val('');
        $("#Provider_ProgramType_ID").val('');
        if (isMCO.toLowerCase() === "true") {
            $(divProgramParticipationAnswer).hide();
            showHideGeneralCredentialInformationOnChange();
        }
        else {
            $("#Provider_ProgramTypeList").val(FFSOnly);
            $("#Provider_ProgramType_ID").val(FFSOnly);
        }
    }
    showHideCAQHQuestion();

    if (ptsel !== '') {
        $("#EnrollmentCriteria_ProviderType_ID").val(ptsel);
        $(enrollmentCriteriaProviderTypeName).val(providerTypeDDLData.text());
        $(enrollmentCriteriaProviderTypeValue).val(providerTypeDDLData.text());
        providerTypeParm = { providerType: ptsel, applicationType: $("#ApplicationType").val(), enrollmentType: enrollmentType };
        makeAsyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(providerTypeParm), "application/json", "processProviderTypesAttributesSuccess", "processProviderTypesAttributesFailure");
    }

    if (enrollmentType === atypicalEnrollmentType) {
        $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]')[0].checked = true;
        checkIndividualOrBusiness();
        $(divEnrollmentIndividualIdentification).find(inputText).val('');
        $(divEnrollmentIndividualIdentification).find(dataroleDropdownlist).each(function () { $(this).data("kendoDropDownList").text(""); });
        $(divProviderSSNCode).find(inputText).val('');
        $(divProviderSSNCode).find(inputPassword).val('');
        $(divEnrollmentGroupFacilityIdentification).find(inputText).val('');
        $(divProviderEINCode).find(inputText).val('');
        $(divProviderEINCode).find(inputPassword).val('');
        $(divProviderEffectiveDate).find(inputText).val('');
        clearValidationMessage(divGeneralInfo);

        if (((preVal === screeningProv || preVal === MentalHealthProv || preVal === "") && ((curVal === screeningProv || curVal === MentalHealthProv)) || ((preVal !== screeningProv && preVal !== MentalHealthProv)) && (curVal !== screeningProv && curVal !== MentalHealthProv))) {
            return false;
        }
        else {
            if (curVal === screeningProv || curVal === MentalHealthProv) {
                $(divEnrollmentIndividualIdentification).find(inputText).val('');
                $(divEnrollmentIndividualIdentification).find(dataroleDropdownlist).each(function () { $(this).data("kendoDropDownList").text(""); });
                $(divProviderSSNCode).find(inputText).val('');
                $(divProviderSSNCode).find(inputPassword).val('');
            }
            else {
                $(divEnrollmentGroupFacilityIdentification).find(inputText).val('');
                $(divProviderEINCode).find(inputText).val('');
                $(divProviderEINCode).find(inputPassword).val('');
                $(divProviderEffectiveDate).find(inputText).val('');
            }
        }
    }
    checkProviderTypeFields();
    customSingleProgramTypes = [];
}

function processProviderTypesSuccess(result) {
    if (result.Data !== null && result.Data.length > 0) {
        setDataSourceForProviderTypeDropDown(enrollmentCriteriaProviderTypeListId, result.Data);
        var StepName = $("#StepName").val();

        if ($("#EnrollmentCriteria_ProviderType_ID").val()) {
            providerTypeDDLData.value($("#EnrollmentCriteria_ProviderType_ID").val());
        }

        providerTypeLoaded = true;
        providerTypeDDLData.text($(enrollmentCriteriaProviderTypeValue).val());
        $(enrollmentCriteriaProviderTypeName).val(providerTypeDDLData.text($(enrollmentCriteriaProviderTypeValue).val()));
        $("#EnrollmentCriteria_EnrollmentType_Name").val(enrollmentTypeDDLData.text($("#EnrollmentCriteria_EnrollmentTypeValue").val()));

        var enrollmentType = enrollmentTypeDDLData.value();
        var ptsel = providerTypeDDLData.value();
        individualOrBusiness = individualOrBusiness[0].checked === true ? "Individual" : (individualOrBusiness[1].checked === true ? "Business" : "default");
        var taxIDType = $(providerTaxIdType).val();
        InitalizeDropdownHide();
        if (currentStep === 0 || isNaN(currentStep)) {
            currentStep = 3;
        }
        if (activeStep === 3 && currentStep === 3) {
            loadTOCs();
        }
        diableEnrollmentAndProviderTypeDropDown();
        applyRevalMcoReadonlyControls();
    }
}

function applyRevalMcoReadonlyControls() {
    if ($(applicationType).val() !== reval && $(applicationType).val() !== mcoEnrollment) {
        return;
    }
    var Ethnicitydropdownlist = $("#Provider_IndividualProvider_EthnicityList").data("kendoDropDownList");
    if (Ethnicitydropdownlist) {
        lockDropDown(Ethnicitydropdownlist);
    }
    var Genderdropdownlist = $("#Provider_IndividualProvider_GenderList").data("kendoDropDownList");
    if (Genderdropdownlist) {
        lockDropDown(Genderdropdownlist);
    }
    configureReadOnlyControls();
}

function lockDropDown(ddl) {
    ddl.readonly(true);
    ddl.unbind("open");
    ddl.bind("open", function (e) { e.preventDefault(); });
    var $wrapper = ddl.wrapper || ddl.element.closest(".k-picker, .k-widget, .k-dropdown");
    if ($wrapper && $wrapper.length) {
        $wrapper.attr("aria-readonly", "true").prop("tabindex", -1)
            .addClass("readonly-control readonly-bkgrnd-color k-readonly k-state-disabled");
        $wrapper.find(".k-input-button, .k-select").hide();
        $wrapper.find(".k-input-inner").css("font-weight", "bold");
    }
}

function toggleCAQHInstructionalText() {
    let isCAQH = ($("#IsCAQHEnrollment").val() || "false").toLowerCase() === "true";
    let appType = $(applicationType).val();
    if (enableRequireCAQHEnrollmentForProviderType && !isCAQH && appType === newenrollment) {
        $("#divCAQHProviderTypeInstruction").show();
    } else {
        $("#divCAQHProviderTypeInstruction").hide();
    }
}

function clrKendoDropdownList(dropdownId) {
    var dropdownBox = $("#" + dropdownId).data("kendoDropDownList");
    var dataSource = new kendo.data.DataSource({
        data: []
    });

    dropdownBox.setDataSource(dataSource);      //clears datasource
    dropdownBox.text('');                       //clears visible text
    dropdownBox.value();                        //clears invisible value
}

function getSSNOrEINValue() {
    var taxIDType = $(providerTaxIdType).val();
    DisplayEINAndSSNBasedOnTheTaxIdTypeSelection(taxIDType);
}

function DisplayEINAndSSNBasedOnTheTaxIdTypeSelection(value) {
    if ($("#" + taxIdentificationSSNHidden).val() === undefined || $("#" + taxIdentificationSSNHidden).val() === "") {
        let ssnValue = $(providerTaxIdentificationSSNRawVal).val();
        if (ssnValue !== null && ssnValue !== "" && ssnValue !== undefined && ssnValue.indexOf("●") === -1) {
            $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
        }
    }
    var divSSN = $("div[id='divProviderSSNCode']");
    var einObject = $("#" + taxIdentificationTaxIdHidden);
    var ssnObject = $("#" + taxIdentificationSSNHidden);
    var einEffectiveDateObject = $("#" + providerTaxIdentificationEffectiveFromDate);
    var einValue = einObject.val();
    var ssnValue = ssnObject.val();
    var einEffectiveDateValue = einEffectiveDateObject.val();
    var divEIN = $("div[id='divProviderEINCode']");

    switch (value) {
        case "EIN":
            divEIN.show();
            $(divProviderEffectiveDate).show();
            einObject.val(einValue);
            einEffectiveDateObject.val(einEffectiveDateValue);
            ssnObject.val("");
            setFieldAsRequired(taxIdentificationTaxId, taxIdentificationTaxId);
            setFieldAsRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
            setFieldAsNotRequired(taxIdentificationSSN, taxIdentificationSSN);
            divSSN.hide();
            break;
        case "SSN":
            divSSN.show();
            ssnObject.val(ssnValue);
            einObject.val("");
            einEffectiveDateObject.val("");
            setFieldAsRequired(taxIdentificationSSN, taxIdentificationSSN);
            setFieldAsNotRequired(taxIdentificationTaxId, taxIdentificationTaxId);
            setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
            divEIN.hide();
            $(divProviderEffectiveDate).hide();
            break;
        default:
            disableSSNEINControls();
            break;
    }
}

function disableSSNEINControls() {
    $("#" + taxIdentificationSSN).val("");
    $("#" + taxIdentificationTaxId).val("");
    $("#" + providerTaxIdentificationEffectiveFromDate).val("");
    var divSSN = $("div[id='divProviderSSNCode']");
    var divEIN = $("div[id='divProviderEINCode']");

    setFieldAsNotRequired(taxIdentificationSSN, taxIdentificationSSN);
    setFieldAsNotRequired(taxIdentificationTaxId, taxIdentificationTaxId);
    setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);

    divSSN.hide();
    divEIN.hide();
    $(divProviderEffectiveDate).hide();
}

function checkIndividualOrBusiness() {
    var isIndividualOrBusiness = $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]');
    var enrollmentType = enrollmentTypeDDLData.value();
    isIndividualOrBusiness = isIndividualOrBusiness[0].checked === true ? "Individual" : (isIndividualOrBusiness[1].checked === true ? "Business" : "default");
    var providerIndividualProviderBirthDate = "Provider_IndividualProvider_BirthDate";

    switch (isIndividualOrBusiness) {
        case individualEntityType:
            $(divEnrollmentIndividualIdentification).show();
            $(divProviderSSNCode).show();
            $(divEnrollmentGroupFacilityIdentification).hide();
            $(divProviderEINCode).hide();
            $(divProviderEffectiveDate).hide();
            setFieldAsNotRequired(providerProviderLegalNameProviderLegalName, providerProviderLegalNameProviderLegalName);
            setFieldAsNotRequired(taxIdentificationTaxId, taxIdentificationTaxId);
            setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
            setFieldAsRequired(taxIdentificationSSN, taxIdentificationSSN);
            setFieldAsRequired(providerProviderNamePersonNameFirst, providerProviderNamePersonNameFirst);
            if (isenableSecondLastName) {
                setFieldAsRequired(providerProviderNamePersonNameFirstLastName, providerProviderNamePersonNameFirstLastName);
                setFieldAsRequired(providerProviderNamePersonNameLegalLastName, providerProviderNamePersonNameLegalLastName);
            }
            setFieldAsRequired(providerIndividualProviderBirthDate, providerIndividualProviderBirthDate);
            setFieldAsRequired(providerProviderNamePersonNameLast, providerProviderNamePersonNameLast);
            if (enrollmentType === atypicalEnrollmentType) {
                divNPI.hide();
                $(providerNationalProviderIdentifierVal).val("");
                setFieldAsNotRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            }
            else {
                divNPI.show();
                setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            }
            isMcoEnrommentHideForAtypicalProviderTypeWithGroupFacilityIdentification();
            isRevalidatedEnrommentHideForAtypicalProviderTypeWithGroupFacilityIdentification();
            taxIdType = SSN;
            $(providerTaxIdType).val(taxIdType);
            break;
        case businessEntityType:
            if (enrollmentType === atypicalEnrollmentType) {
                $(divEnrollmentGroupFacilityIdentification).show();
                $(divTaxName).show();
                $(divDoingBusinessAsName).show();
                $(divProviderEINCode).show();
                $(divProviderEffectiveDate).show();
                $(divEnrollmentIndividualIdentification).hide();
                $(divProviderSSNCode).hide();
                setFieldAsNotRequired(taxIdentificationSSN, taxIdentificationSSN);
                setFieldAsNotRequired(providerProviderNamePersonNameFirst, providerProviderNamePersonNameFirst);
                setFieldAsNotRequired(providerProviderNamePersonNameFirstLastName, providerProviderNamePersonNameFirstLastName);
                setFieldAsNotRequired(providerIndividualProviderBirthDate, providerIndividualProviderBirthDate);
                setFieldAsNotRequired(providerProviderNamePersonNameLast, providerProviderNamePersonNameLast);
                setFieldAsNotRequired(providerProviderNamePersonNameLegalLastName, providerProviderNamePersonNameLegalLastName);
                setFieldAsRequired(providerProviderLegalNameProviderLegalName, providerProviderLegalNameProviderLegalName);
                setFieldAsRequired(taxIdentificationTaxId, taxIdentificationTaxId);
                if (hideIRSEffectiveDate === "No") {
                    $(divProviderEffectiveDate).show();
                    setFieldAsRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
                }
                else {
                    $(divProviderEffectiveDate).hide();
                    setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
                }
                divNPI.hide();
                $(providerNationalProviderIdentifierVal).val("");
                setFieldAsNotRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            }
            else {
                $(divEnrollmentGroupFacilityIdentification).show();
                $(divTaxName).hide();
                $(divDoingBusinessAsName).hide();
                setFieldAsRequired(providerProviderLegalNameProviderLegalName, providerProviderLegalNameProviderLegalName);
                $(divProviderEINCode).show();
                setFieldAsRequired(taxIdentificationTaxId, taxIdentificationTaxId);
                if (hideIRSEffectiveDate === "No") {
                    $(divProviderEffectiveDate).show();
                    setFieldAsRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
                }
                else {
                    $(divProviderEffectiveDate).hide();
                    setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
                }
                divNPI.show();
                setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
                $(divEnrollmentIndividualIdentification).show();
                $(divProviderSSNCode).show();
                setFieldAsRequired(taxIdentificationSSN, taxIdentificationSSN);
                setFieldAsRequired(providerProviderNamePersonNameFirst, providerProviderNamePersonNameFirst);
                setFieldAsRequired(providerIndividualProviderBirthDate, providerIndividualProviderBirthDate);
                setFieldAsRequired(providerProviderNamePersonNameLast, providerProviderNamePersonNameLast);
                if (isenableSecondLastName) {
                    setFieldAsRequired(providerProviderNamePersonNameLegalLastName, providerProviderNamePersonNameLegalLastName);
                }
            }
            isMcoEnrommentHideForAtypicalProviderTypeWithIndividualIdentification();
            isRevalidatedEnrommentHideForAtypicalProviderTypeWithIndividualIdentification();
            taxIdType = EIN;
            $(providerTaxIdType).val(taxIdType);
            break;
        default:
            $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]')[0].checked = true;
            $(divEnrollmentIndividualIdentification).show();
            $(divProviderSSNCode).show();
            $(divEnrollmentGroupFacilityIdentification).hide();
            $(divProviderEINCode).hide();
            $(divProviderEffectiveDate).hide();
            setFieldAsNotRequired(providerProviderLegalNameProviderLegalName, providerProviderLegalNameProviderLegalName);
            setFieldAsNotRequired(taxIdentificationTaxId, taxIdentificationTaxId);
            setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
            setFieldAsRequired(taxIdentificationSSN, taxIdentificationSSN);
            setFieldAsRequired(providerProviderNamePersonNameFirst, providerProviderNamePersonNameFirst);
            if (isenableSecondLastName) {
                setFieldAsRequired(providerProviderNamePersonNameFirstLastName, providerProviderNamePersonNameFirstLastName);
                setFieldAsRequired(providerProviderNamePersonNameLegalLastName, providerProviderNamePersonNameLegalLastName);
            }
            setFieldAsRequired(providerIndividualProviderBirthDate, providerIndividualProviderBirthDate);
            setFieldAsRequired(providerProviderNamePersonNameLast, providerProviderNamePersonNameLast);
            if (enrollmentType === atypicalEnrollmentType) {
                divNPI.hide();
                $(providerNationalProviderIdentifierVal).val("");
                setFieldAsNotRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            }
            else {
                divNPI.show();
                setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            }
            isMcoEnrommentHideForAtypicalProviderTypeWithGroupFacilityIdentification();
            isRevalidatedEnrommentHideForAtypicalProviderTypeWithGroupFacilityIdentification();
            taxIdType = SSN;
            $(providerTaxIdType).val(taxIdType);
            break;
    }
}


function checkCurrentEnrollment() {
    if ($("#IsChowEnrollment").val().toLowerCase() === "false") {
        var isCurrentlyEnrolled = $('input:radio[name="Provider.IsCurrentlyEnrolled.ID"]');
        var providerCurrentLegacyProviderIdentifier = "Provider_CurrentLegacyProviderIdentifier";
        var currentLegacyIdentifier = "#" + providerCurrentLegacyProviderIdentifier;
        var currentEnrolledEditSection = "#currentEnrolledEditSection";
        isCurrentlyEnrolled = isCurrentlyEnrolled[1].checked === true ? "Yes" : (isCurrentlyEnrolled[0].checked === true ? "No" : "default");
        switch (isCurrentlyEnrolled) {
            case "Yes":
                setFieldAsNotRequired(providerCurrentLegacyProviderIdentifier, providerCurrentLegacyProviderIdentifier);
                $(currentLegacyIdentifier).val('');
                $(currentEnrolledEditSection).hide();
                break;
            case "No":
                setFieldAsRequired(providerCurrentLegacyProviderIdentifier, providerCurrentLegacyProviderIdentifier);
                $(currentEnrolledEditSection).show();
                $("[data-valmsg-for='Provider.CurrentLegacyProviderIdentifier']").hide();
                break;
            default:
                setFieldAsNotRequired(providerCurrentLegacyProviderIdentifier, providerCurrentLegacyProviderIdentifier);
                $(currentLegacyIdentifier).val('');
                $(currentEnrolledEditSection).hide();
                $('input:radio[name="Provider.IsCurrentlyEnrolled.ID"]')[1].checked = true;
                break;
        }
    }
}

function checkPreviousEnrollment() {
    if ($("#IsChowEnrollment").val().toLowerCase() === "false") {
        var providerPreviousLegacyProviderIdentifier = "Provider_PreviousLegacyProviderIdentifier";
        var isPreviouslyEnrolled = $('input:radio[name="Provider.IsPreviouslyEnrolled.ID"]');
        var previousLegacyIdentifier = "#" + providerPreviousLegacyProviderIdentifier;
        var previousEnrolledEditSection = "#previousEnrolledEditSection";
        isPreviouslyEnrolled = isPreviouslyEnrolled[1].checked === true ? "Yes" : (isPreviouslyEnrolled[0].checked === true ? "No" : "default");
        switch (isPreviouslyEnrolled) {
            case "Yes":
                setFieldAsNotRequired(providerPreviousLegacyProviderIdentifier, providerPreviousLegacyProviderIdentifier);
                $(previousLegacyIdentifier).val('');
                ClearValidationMessage("Provider.PreviousLegacyProviderIdentifier");
                $("[data-valmsg-for='Provider.PreviousLegacyProviderIdentifier']").hide();
                $(previousEnrolledEditSection).hide();
                $("Provider.PreviousLegacyProviderIdentifier").prop("readonly", true);
                break;
            case "No":
                setFieldAsRequired(providerPreviousLegacyProviderIdentifier, providerPreviousLegacyProviderIdentifier);
                $(previousEnrolledEditSection).show();
                $("[data-valmsg-for='Provider.PreviousLegacyProviderIdentifier']").hide();
                $("Provider.PreviousLegacyProviderIdentifier").prop("readonly", false);
                break;
            default:
                setFieldAsNotRequired(providerPreviousLegacyProviderIdentifier, providerPreviousLegacyProviderIdentifier);
                $(previousLegacyIdentifier).val('');
                $(previousEnrolledEditSection).hide();
                $('input:radio[name="Provider.IsPreviouslyEnrolled.ID"]')[1].checked = true;
                break;
        }
    }
}

function checkMedicareEnrollment() {
    if (isDisableMedicareEnrollQuestion === false) {
        var isMedicareEnrolled = $('input:radio[name="Provider.IsMedicareEnrolled.ID"]');
        isMedicareEnrolled = isMedicareEnrolled[1].checked === true ? "Yes" : (isMedicareEnrolled[0].checked === true ? "No" : "default");
        switch (isMedicareEnrolled) {
            case "Yes":
                break;
            case "No":
                break;
            default:
                $('input:radio[name="Provider.IsMedicareEnrolled.ID"]')[1].checked = true;
                break;
        }
    } else {
        $("#divHideMedicareEnrollQuestion").hide();
    }
}

function checkCAQHRegistration() {
    var providerCAQHProviderID = "Provider_ProviderCAQHRegistration_CAQHProviderID";
    var isProviderCAQHRegistered = $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegistered.ID"]');
    isProviderCAQHRegistered = isProviderCAQHRegistered[0].checked === true ? "Yes" : (isProviderCAQHRegistered[1].checked === true ? "No" : "default");

    switch (isProviderCAQHRegistered) {
        case "No":
            $("#divCAQHProviderID").hide();
            $("#" + providerCAQHProviderID).val('');
            setFieldAsNotRequired(providerCAQHProviderID, providerCAQHProviderID);
            ClearValidationMessage(providerCAQHProviderID);
            break;
        case "Yes":
            $("#divCAQHProviderID").show();
            setFieldAsRequired(providerCAQHProviderID, providerCAQHProviderID);
            break;
        default:
            $("#divCAQHProviderID").hide();
            setFieldAsNotRequired(providerCAQHProviderID, providerCAQHProviderID);
            if ($(applicationType).val() === mcoEnrollment) {
                $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegistered.ID"]')[1].checked = true;
                $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegisteredReval.ID"]')[1].checked = true;
            }
            break;
    }
}

function checkProviderTypeFields(e) {
    var providerTaxonomyCodeList = "Provider_TaxonomyCodeList";
    var providerNPIZipPlus4 = "Provider_NPIZipPlus4";

    if (isProviderTypeAtypical($(enrollmentCriteriaProviderTypeList).val())) {
        setFieldAsNotRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
        setFieldAsNotRequired(providerNPIZipPlus4, providerNPIZipPlus4);
        setFieldAsNotRequired(providerTaxonomyCodeList, providerTaxonomyCodeList);
    }
    else {
        setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
        setFieldAsRequired(providerNPIZipPlus4, providerNPIZipPlus4);
        setFieldAsRequired(providerTaxonomyCodeList, providerTaxonomyCodeList);
    }
}

function isProviderTypeAtypical(providerType) {
    var enrollmentType = enrollmentTypeDDLData.value();
    return enrollmentType === atypicalEnrollmentType;
}

clearValidationMessage = function (idVal) {
    $(idVal).resetAllValidations();
};

function makeReadOnlySSN() {
    $("#" + taxIdentificationSSN).attr("readonly", "readonly");
    $("#Provider_TaxIdentification_SSNLabel").attr("readonly", "readonly");
    setFieldAsNotRequired("Provider_TaxIdentification_SSN", "Provider_TaxIdentification_SSN");
}

function makeReadOnlyEIN() {
    $("#" + taxIdentificationTaxId).attr("readonly", "readonly");
    setFieldAsNotRequired("Provider_TaxIdentification_TaxId", "Provider_TaxIdentification_TaxId");
    $("#Provider_TaxIdentification_TaxIdLabel").attr("readonly", "readonly");
}

function disableIndividualOrBusiness(individualOrBusiness) {
    individualOrBusiness.attr('readonly', false);
    if (individualOrBusiness[0].checked) {
        $("#" + individualOrBusiness[1].id).attr('readonly', true);
    }
    else {
        $("#" + individualOrBusiness[0].id).attr('readonly', true);
    }
    individualOrBusiness.closest("div").addClass("readonly-bkgrnd-color");
}

function makeReadOnlyContactInformation(enrollmentType, isIndividualOrBusiness) {
    switch (enrollmentType) {
        case individualEnrollmentType:
            if (isIndividualOrBusiness === individualEntityType) {
                if (isenableSecondLastName) {
                    makeIndividualNameFieldsReadOnlyForSecondLastName();
                }
                else {
                    makeIndividualNameFieldsReadOnly();
                }
            }
            else if (isIndividualOrBusiness === businessEntityType) {
                if (isenableSecondLastName) {
                    makeIndividualNameFieldsReadOnlyForSecondLastName();
                    makeLegalNameFieldsReadOnly();
                }
                else {
                    makeIndividualNameFieldsReadOnly();
                    makeLegalNameFieldsReadOnly();
                }
            }
            break;
        case ATypical:
            if (isIndividualOrBusiness === individualEntityType) {
                if (isenableSecondLastName) {
                    makeIndividualNameFieldsReadOnlyForSecondLastName();
                }
                else {
                    makeIndividualNameFieldsReadOnly();
                }
            }
            else if (isIndividualOrBusiness === businessEntityType) {
                makeLegalNameFieldsReadOnly();
            }
            break;
        case Facility:
        case Group:
            makeLegalNameFieldsReadOnly();
            break;
        case OPR:
        case individualGroupEnrollmentType:
            if (isenableSecondLastName) {
                makeIndividualNameFieldsReadOnlyForSecondLastName();
            } else {
                makeIndividualNameFieldsReadOnly();
            }
            break;
    }
}

function makeIndividualNameFieldsReadOnlyForSecondLastName() {
    $("#" + providerProviderNamePersonNameFirst).readonly();
    $("#" + providerProviderNamePersonNameMiddle).readonly();
    $("#" + providerProviderNamePersonNameFirstLastName).readonly();
    $("#" + providerProviderNamePersonNameLegalLastName).readonly();
    $("#" + providerProviderNamePersonNameLastNameSecond).readonly();
}

function makeIndividualNameFieldsReadOnly() {
    $("#" + providerProviderNamePersonNameFirst).readonly();
    $("#" + providerProviderNamePersonNameMiddle).readonly();
    $("#" + providerProviderNamePersonNameLast).readonly();
}

function makeLegalNameFieldsReadOnly() {
    $("#" + providerProviderLegalNameProviderLegalName).readonly();
}

function isMcoEnrommentHideForFacilityAndGroup() {
    if ($(applicationType).val() === mcoEnrollment) {
        $(legalNameShow).hide();
        $(legalNameShowReval).show();
        $("#divNPI").hide();
        $(divNPIReval).show();
        $(divProviderEINCodeReval).hide();
        $(divProviderSSNCodeReval).hide();
        $(requestedEffectiveDateParent).hide();
        setFieldAsNotRequired("RequestedEffectiveDate", "RequestedEffectiveDate");
        if (allowSoleProprietorGroupFacilityEnrollment) {
            setReadOnlySSNOrEINForSoleProprietor();
            setHideOrShowProviderEffectiveDateForSoleProprietor();
        }
        else {
            $(divProviderEINCode).show();
            $(divProviderEffectiveDate).show();
            makeReadOnlyEIN();
        }
    }
}

function isMcoEnrommentHideForIndividualAndIndividualWGroupAndOPR() {
    if ($(applicationType).val() === mcoEnrollment) {
        $(divProviderSSNCodeReval).hide();
        $(divNPIReval).show();
        $(isRevalidatedPersonNameFirst).show();
        $(newEnrollmentPersonNameFirst).hide();
        $(divProviderSSNCode).show();
        $("#divNPI").hide();
        $(newEnrollmentPersonNameSecond).hide();
        $(isRevalidatedPersonNameSecond).show();
        makeReadOnlySSN();
    }
}

function isMcoEnrommentHideForAtypicalProviderTypeWithGroupFacilityIdentification() {
    if ($(applicationType).val() === mcoEnrollment && enrollmentTyp === atypicalEnrollmentType) {
        $(divProviderSSNCodeReval).hide();
        $(divProviderSSNCode).show();
        $(newEnrollmentPersonNameFirst).hide();
        $(newEnrollmentPersonNameSecond).hide();
        $(isRevalidatedPersonNameFirst).show();
        $(isRevalidatedPersonNameSecond).show();
        makeReadOnlySSN();
    }
    else if ($(applicationType).val() === mcoEnrollment) {
        $(divProviderSSNCodeReval).hide();
        $(divProviderSSNCode).show();
        $(newEnrollmentPersonNameFirst).hide();
        $(newEnrollmentPersonNameSecond).hide();
        $(isRevalidatedPersonNameFirst).show();
        $(isRevalidatedPersonNameSecond).show();
        $(divNPIReval).show();
        $(divNPI).hide();
        makeReadOnlySSN();
    }
}

function isMcoEnrommentHideForAtypicalProviderTypeWithIndividualIdentification() {
    var divProviderEffectiveDateReval = "#divProviderEffectiveDateReval";

    if ($(applicationType).val() === mcoEnrollment && enrollmentTyp === atypicalEnrollmentType) {
        $(newEnrollmentPersonNameSecond).hide();
        $(isRevalidatedPersonNameSecond).show();
        $(legalNameShow).hide();
        $(legalNameShowReval).show();
        $(divProviderEINCodeReval).hide();
        $(divProviderEINCode).show();
        $(divProviderEffectiveDate).show();
        $(newEnrollmentPersonNameFirst).hide();
        $(isRevalidatedPersonNameFirst).show();
        $(divProviderEffectiveDateReval).hide();
        $(':radio:not(:checked)').attr('readonly', true);
        makeReadOnlyEIN();
    }
    else if ($(applicationType).val() === mcoEnrollment && enrollmentTyp === individualEnrollmentType) {
        $(isRevalidatedPersonNameFirst).show();
        $(isRevalidatedPersonNameSecond).show();
        $(newEnrollmentPersonNameFirst).hide();
        $(newEnrollmentPersonNameSecond).hide();
        $(divProviderEINCodeReval).hide();
        $(divProviderEINCode).show();
        $(divProviderEffectiveDate).show();
        $(divProviderEffectiveDateReval).hide();
        $(legalNameShow).hide();
        $(legalNameShowReval).show();
        $("#LegalTaxNameReval").hide();
        divNPI.hide();
        $(providerNationalProviderIdentifierVal).val("");
        $(divNPIReval).show();
        $(divProviderSSNCodeReval).hide();
        $(divProviderSSNCode).show();
        $(':radio:not(:checked)').attr('readonly', true);
        makeReadOnlySSN();
        makeReadOnlyEIN();
    }
}

function isRevalidatedEnrommentHideForAtypicalProvider() {
    if ($(applicationType).val() === reval || $(applicationType).val() === mcoEnrollment) {
        $(requestedEffectiveDateParent).hide();
        setFieldAsNotRequired("RequestedEffectiveDate", "RequestedEffectiveDate");
    }
}

function isRevalidatedEnrollmentHideForFacilityAndGroup() {
    if ($(applicationType).val() === reval) {
        validateNPIInRevalidation();
        $(divProviderEINCodeReval).hide();
        $(divProviderSSNCodeReval).hide();
        $(requestedEffectiveDateParent).hide();
        setFieldAsNotRequired("RequestedEffectiveDate", "RequestedEffectiveDate");
        if (allowSoleProprietorGroupFacilityEnrollment) {
            setReadOnlySSNOrEINForSoleProprietorInRevalidation();
            if (hideIRSEffectiveDate.toLowerCase() === "yes") {
                $(divProviderEffectiveDate).hide();
            }
            else {
                setHideOrShowProviderEffectiveDateForSoleProprietor();
            }
        }
        else {
            if (hideIRSEffectiveDate.toLowerCase() === "yes") {
                $(divProviderEffectiveDate).hide();
            }
            else {
                $(divProviderEffectiveDate).show();
            }
            validateEINInRevalidation();
        }
    }
}

function isRevalidatedEnrommentHideForIndividualAndIndividualWGroupAndOPR() {
    if ($(applicationType).val() === reval) {
        validateNPIInRevalidation();
        validateSSNInRevalidation();
    }
}

function validateNPIInRevalidation() {
    if ($(isNPIInvalid).val().toLowerCase() === "true") {
        $(divNPIReval).hide();
        $("#divNPI").show();
    }
    else {
        $(divNPIReval).show();
        $("#divNPI").hide();
    }
}

function validateSSNInRevalidation() {
    $(divProviderSSNCodeReval).hide();
    $(divProviderSSNCode).show();
    if ($(isSSNInvalid).val().toLowerCase() !== "true") {
        makeReadOnlySSN();
    }
}

function validateEINInRevalidation() {
    $(divProviderEINCodeReval).hide();
    $(divProviderEINCode).show();
    if ($(isEINInvalid).val().toLowerCase() !== "true") {
        makeReadOnlyEIN();
    }
}

function validateEmailInRevalidation() {
    if ($(applicationType).val() === reval && $(isEmailInvalid).val().toLowerCase() === "true") {
        $("#EnrollmentCreateCredentials_EmailAddress").val($("#ApplicantContact_EmailAddress").val());
        $("#EnrollmentCreateCredentials_EmailAddressConfirmation").val($("#ApplicantContact_EmailAddressConfirmation").val());
    }
}

function isRevalidatedEnrommentHideForAtypicalProviderTypeWithGroupFacilityIdentification() {
    if ($(applicationType).val() === reval && enrollmentTyp === atypicalEnrollmentType) {
        validateSSNInRevalidation();
    }
    else if ($(applicationType).val() === reval) {
        validateNPIInRevalidation();
        validateSSNInRevalidation();
    }
}

function isRevalidatedEnrommentHideForAtypicalProviderTypeWithIndividualIdentification() {
    var divProviderEffectiveDateReval = "#divProviderEffectiveDateReval";

    if ($(applicationType).val() === reval && enrollmentTyp === atypicalEnrollmentType) {
        validateEINInRevalidation();
        $(divProviderEffectiveDate).show();
        $(divProviderEffectiveDateReval).hide();
        $(':radio:not(:checked)').attr('readonly', true);
    }
    else if ($(applicationType).val() === reval && enrollmentTyp === individualEnrollmentType) {
        validateNPIInRevalidation();
        validateEINInRevalidation();
        validateSSNInRevalidation();
        $(divProviderEffectiveDate).show();
        $(divProviderEffectiveDateReval).hide();
        $(':radio:not(:checked)').attr('readonly', true);
    }
}

function InitalizeDropdownHide() {
    if ($(applicationType).val() === reval || $(applicationType).val() === mcoEnrollment) {
        $("#TextOfEnrollmentType").val(enrollmentTypeDDLData.text());
        $("#TextOfProviderType").val(providerTypeDDLData.text());
    }
}

function displayIndividualIdentification(enrollType) {
    var taxIdType;
    var providerIndividualProviderBirthDate = "Provider_IndividualProvider_BirthDate";
    var divProviderTaxIdentificationTaxIdTypes = "#divProviderTaxIdentificationTaxIdTypes";
    switch (enrollType) {
        case individualEnrollmentType:
            $(divForIndividualOrBusiness).show();
            checkIndividualOrBusiness();
            setFieldAsNotRequired(providerNursePractitionerNpi, providerNursePractitionerNpi);
            $(providerNursePractitionerNpiValidationMessage).resetValidation();
            $(divProviderEINCode).addClass("editor-clear");
            $(divProviderEINCodeReval).addClass("editor-clear");
            $(divProviderTaxIdentificationTaxIdTypes).hide();
            break;
        case OPREnrollmentType:
        case individualGroupEnrollmentType:
            $(divEnrollmentIndividualIdentification).show();
            $(divProviderSSNCode).show();
            $(divEnrollmentGroupFacilityIdentification).hide();
            $(divProviderEINCode).hide();
            $(divProviderEffectiveDate).hide();
            divNPI.show();
            setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            setFieldAsNotRequired(providerNursePractitionerNpi, providerNursePractitionerNpi);
            $(providerNursePractitionerNpiValidationMessage).resetValidation();
            setFieldAsNotRequired(providerProviderLegalNameProviderLegalName, providerProviderLegalNameProviderLegalName);
            setFieldAsNotRequired(taxIdentificationTaxId, taxIdentificationTaxId);
            setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
            setFieldAsRequired(taxIdentificationSSN, taxIdentificationSSN);
            setFieldAsRequired(providerProviderNamePersonNameFirst, providerProviderNamePersonNameFirst);
            if (isenableSecondLastName) {
                setFieldAsRequired(providerProviderNamePersonNameFirstLastName, providerProviderNamePersonNameFirstLastName);
                setFieldAsRequired(providerProviderNamePersonNameLegalLastName, providerProviderNamePersonNameLegalLastName);
            }
            setFieldAsRequired(providerIndividualProviderBirthDate, providerIndividualProviderBirthDate);
            setFieldAsRequired(providerProviderNamePersonNameLast, providerProviderNamePersonNameLast);
            isMcoEnrommentHideForIndividualAndIndividualWGroupAndOPR();
            isRevalidatedEnrommentHideForIndividualAndIndividualWGroupAndOPR();
            taxIdType = SSN;
            $(providerTaxIdType).val(taxIdType);
            $(divForIndividualOrBusiness).hide();
            $(divProviderEINCode).removeClass("editor-clear");
            $(divProviderEINCodeReval).removeClass("editor-clear");
            $(divProviderTaxIdentificationTaxIdTypes).hide();
            break;
        case groupEnrollmentType:
        case facilityEnrollmentType:
            if (allowSoleProprietorGroupFacilityEnrollment) {
                $(divProviderTaxIdentificationTaxIdTypes).show();
                var isEinOrSsn = $('input:radio[name="Provider.TaxIdentification.TaxIdTypes.ID"]');
                if ($(providerTaxIdType).val() === SSN) {
                    isEinOrSsn[1].checked = true;
                    showSsnAndSetTaxIdTypeGroupOrFacilityEnrollment();
                }
                else {
                    isEinOrSsn[0].checked = true;
                    showEinAndSetTaxIdTypeGroupOrFacilityEnrollment();
                }
                $(divProviderEINCode).removeClass("editor-clear");
                $(divProviderEINCodeReval).removeClass("editor-clear");
                $(divProviderTaxIdentificationTaxIdTypes).addClass("editor-clear");
                if ($(applicationType).val() === reval || $(applicationType).val() === mcoEnrollment) {
                    disableEinOrSsnRedioButtonInGroupAndFacilityEnrollment();
                }
            }
            else {
                $(divProviderTaxIdentificationTaxIdTypes).hide();
                showEinAndSetTaxIdTypeGroupOrFacilityEnrollment();
                $(divProviderEINCode).addClass("editor-clear");
                $(divProviderEINCodeReval).addClass("editor-clear");
            }
            $(divEnrollmentGroupFacilityIdentification).show();
            $(divTaxName).show();
            $(divDoingBusinessAsName).show();
            $(divEnrollmentIndividualIdentification).hide();
            setFieldAsNotRequired(providerProviderNamePersonNameFirst, providerProviderNamePersonNameFirst);
            setFieldAsNotRequired(providerIndividualProviderBirthDate, providerIndividualProviderBirthDate);
            setFieldAsNotRequired(providerProviderNamePersonNameLast, providerProviderNamePersonNameLast);
            setFieldAsNotRequired(providerProviderNamePersonNameFirstLastName, providerProviderNamePersonNameFirstLastName);
            setFieldAsNotRequired(providerProviderNamePersonNameLegalLastName, providerProviderNamePersonNameLegalLastName);
            setFieldAsRequired(providerProviderLegalNameProviderLegalName, providerProviderLegalNameProviderLegalName);
            divNPI.show();
            setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            setFieldAsNotRequired(providerNursePractitionerNpi, providerNursePractitionerNpi);
            $(providerNursePractitionerNpiValidationMessage).resetValidation();
            isMcoEnrommentHideForFacilityAndGroup();
            isRevalidatedEnrollmentHideForFacilityAndGroup();
            $(divForIndividualOrBusiness).hide();
            break;
        case atypicalEnrollmentType:
            var ptsel = $("#EnrollmentCriteria_ProviderType_ID").val();
            if (ptsel === "") {
                $(divEnrollmentIndividualIdentification).hide();
                $(divProviderSSNCode).hide();
                $(divEnrollmentGroupFacilityIdentification).hide();
                $(divProviderEINCode).hide();
                $(divProviderEffectiveDate).hide();
                divNPI.hide();
                $(providerNationalProviderIdentifierVal).val("");
                setFieldAsNotRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
                setFieldAsNotRequired(providerNursePractitionerNpi, providerNursePractitionerNpi);
                $(providerNursePractitionerNpiValidationMessage).resetValidation();
            }
            else {
                checkIndividualOrBusiness();
            }
            isRevalidatedEnrommentHideForAtypicalProvider();
            $(divProviderEINCode).addClass("editor-clear");
            $(divProviderEINCodeReval).addClass("editor-clear");
            $(divProviderTaxIdentificationTaxIdTypes).hide();
            break;
        default:
            $(divEnrollmentIndividualIdentification).hide();
            $(divProviderSSNCode).hide();
            $(divEnrollmentGroupFacilityIdentification).hide();
            $(divProviderEINCode).hide();
            $(divProviderEffectiveDate).hide();
            $(divForIndividualOrBusiness).hide();
            divNPI.show();
            setFieldAsRequired(providerNationalProviderIdentifier, providerNationalProviderIdentifier);
            if ($(applicationType).val() === reval || $(applicationType).val() === mcoEnrollment) {
                $(requestedEffectiveDateParent).hide();
                setFieldAsNotRequired("RequestedEffectiveDate", "RequestedEffectiveDate");
                enrollmentTypeDDLData.readonly(true);
                providerTypeDDLData.readonly(true);
            }
            if ($(applicationType).val() === mcoEnrollment) {
                $(providerNationalProviderIdentifierVal).readonly();
                $(providerNationalProviderIdentifierVal).prop("readonly", true);
            }
            $(divProviderEINCode).removeClass("editor-clear");
            $(divProviderEINCodeReval).removeClass("editor-clear");
            $(divProviderTaxIdentificationTaxIdTypes).hide();
            break;
    }
    configureReadOnlyControls();
}

$(providerECFMGNumberVal).change(function () {
    var ecfmgNumber = $(providerECFMGNumberVal).val();
    if (ecfmgNumber !== "") {
        setFieldAsRequired(providerECFMGCertificateIssueDate, providerECFMGCertificateIssueDate);
    }
    else {
        setFieldAsNotRequired(providerECFMGCertificateIssueDate, providerECFMGCertificateIssueDate);
    }
});

$(providerECFMGCertificateIssueDateVal).focusout(function () {
    var ecfmgIssueDate = $(providerECFMGCertificateIssueDateVal).data("kendoMaskedTextBox").raw();
    if (ecfmgIssueDate !== "") {
        setFieldAsRequired(providerECFMGNumber, providerECFMGNumber);
    } else {
        setFieldAsNotRequired(providerECFMGNumber, providerECFMGNumber);
    }
});


function checkGeneralCredentialInformation(enrollmentType) {
    if (iscredentialInformationIsRequired !== null && iscredentialInformationIsRequired !== undefined && iscredentialInformationIsRequired.toLocaleLowerCase() === "false") {
        setFieldAsNotRequired(providerBirthPlaceInformationCity, providerBirthPlaceInformationCity);
        setFieldAsNotRequired(providerBirthPlaceInformationCountryList, providerBirthPlaceInformationCountry);
        setFieldAsNotRequired(providerBirthPlaceInformationStatesList, providerBirthPlaceInformationStates);
        setFieldAsNotRequired(providerECFMGNumber, providerECFMGNumber);
        setFieldAsNotRequired(providerECFMGCertificateIssueDate, providerECFMGCertificateIssueDate);
        ClearValidationMessage(providerBirthPlaceInformationCountryList);
        ClearValidationMessage(providerBirthPlaceInformationStatesList);

        $("#" + providerBirthPlaceInformationCity).resetValidation();

        $(providerECFMGNumberVal).resetValidation();

        $("#" + providerECFMGCertificateIssueDate).resetValidation();

        $("#" + providerUPIN).resetValidation();
    }
}

function EnableOrDisableCopyAddressControls(source) {
    //check all the mandatory fields are entered or not
    if (IsAddressFieldsAreEntered()) {
        $("#ApplicantContact_Address_IsAddressValidated").val(false);
        $(applicantContactAddressValidationInfoIsAddressValidated).val(false);
        //Validate entered address using address doctor
        EnteredAddressValidation(source);
    }
}

function IsAddressFieldsAreEntered() {
    return ($(applicantContactAddressLine1).val() !== "" &&
        $(applicantContactAddressCity).val() !== "" &&
        $(applicantContactAddressStatesList).data("kendoDropDownList").value() !== "" &&
        $(applicantContactAddressCountryList).data("kendoDropDownList").value() !== "" &&
        $(applicantContactAddressPostalCode).val() !== "");
}

function CheckForMandatoryAddressFields(source) {
    return !($(applicantContactAddressLine1).val() !== "" &&
        $(applicantContactAddressCity).val() !== "" &&
        $(applicantContactAddressStatesList).data("kendoDropDownList").value() !== "" &&
        $(applicantContactAddressPostalCode).val() !== "");
}

function showOrHideTrackingNumber(val) {
    if (val) {
        $("#toc").show();
        $(".toc-sub-title").show();
        $(".toc-panel-container").show();
        $(".toc-btn-panel").show();
        $(".toc-main-title").children().show();
    }
    else {
        $("#toc").show();
        $(".toc-sub-title").hide();
        $(".toc-panel-container").hide();
        $(".toc-btn-panel").hide();
        $(".toc-main-title").children(":not(" + "#trackingLabel" + "," + "#trackingNumber" + ")").hide();
    }
}

function getSelectedPrograms() {
    $("#generateProgramParticipation").empty();

    var multiselect = $(mcoPrograms).data("kendoMultiSelect");
    var selectedPrograms = multiselect.dataItems();
    var i = 0;
    selectedPrograms.forEach(function (code) {

        var dynamicControls = "<input name = 'Provider.ProgramParticipationAnswers[" + i + "].Id' id = 'Provider.ProgramParticipationAnswers[" + i + "]_Id' value = '" + selectedPrograms[i].code + "' />"
            + "<input name = 'Provider.ProgramParticipationAnswers[" + i + "].Name' id = 'Provider.ProgramParticipationAnswers[" + i + "]_Name' value = '" + selectedPrograms[i].program + "' />"
            + "<input name = 'Provider.ProgramParticipationAnswers[" + i + "].Value' id = 'Provider.ProgramParticipationAnswers[" + i + "]_Value' value = '" + true + "' />"
            + "<input name = 'Provider.ProgramParticipationAnswers[" + i + "].URL' id = 'Provider.ProgramParticipationAnswers[" + i + "]_URL' value = '" + selectedPrograms[i].url + "' />";

        $("#generateProgramParticipation").append(dynamicControls);
        i++;
    });
}

function updateMcoProgramsList() {
    var selectedMcoProgramsList = $(mcoPrograms).data("kendoMultiSelect");
    if (selectedMcoProgramsList) {
        selectedMcoProgramsList.value('');
    }
}

function AssignProgramParticipation() {
    var retrievedPrograms = [];
    if (ProgramParticipationDetailRes !== undefined && ProgramParticipationDetailRes.length > 0) {
        for (var i = 0; i < ProgramParticipationDetailRes.length; i++) {
            retrievedPrograms.push(ProgramParticipationDetailRes[i].Id);
        }
        var mcoProgramsMultiSelect = $(mcoPrograms).data('kendoMultiSelect');
        if (mcoProgramsMultiSelect) {
            mcoProgramsMultiSelect.value(retrievedPrograms);
        }
    }
}

function updateStateMalpracticeCoverage() {
    if (($(programType).val() !== MCO && $(programType).val() !== FFSMCO) && isMCOCredentialing.toLowerCase() === "true") {
        getStateMalpracticeCoverageData.StateCompensationFundDetails.ID = null;
        getStateMalpracticeCoverageData.ExclusionProceduresDetails.ID = null;
        getStateMalpracticeCoverageData.ExclusionProceduresDetailsText = null;
        getStateMalpracticeCoverageData.StateMedicalMalpracticeActDetails.ID = null;
    }
}

function showHideCAQHQuestion() {
    var isCAQHQuestionEnabled = "#IsCAQHQuestionEnabled";
    var caqhIdForNewEnrollment = "Provider_ProviderCAQHRegistration_IsProviderCAQHRegistered";
    var caqhIdForRevalidation = "Provider_ProviderCAQHRegistration_IsProviderCAQHRegisteredReval";
    var caqhProviderId = "Provider_ProviderCAQHRegistration_CAQHProviderID";

    var enrollmentType = enrollmentTypeDDLData.value();

    for (var i = 0; i < enrollmentTypeCAQHQuestionAttribute.length; i++) {
        if (enrollmentType === enrollmentTypeCAQHQuestionAttribute[i][0]) {
            $(isCAQHQuestionEnabled).val(enrollmentTypeCAQHQuestionAttribute[i][1]);
            break;
        }
    }

    if ($(isCAQHQuestionEnabled).val().toLowerCase() === "false") {
        $("#divProviderCAQHRegistration").hide();
        setFieldAsNotRequired(caqhIdForNewEnrollment, caqhIdForNewEnrollment);
        setFieldAsNotRequired(caqhIdForRevalidation, caqhIdForRevalidation);
        setFieldAsNotRequired(caqhProviderId, caqhProviderId);
    }
    else {
        $("#divProviderCAQHRegistration").show();
        var isProviderCAQHRegistered = $('input:radio[name="Provider.ProviderCAQHRegistration.IsProviderCAQHRegistered.ID"]');
        if ($("#" + caqhProviderId).val() !== '') {
            isProviderCAQHRegistered[0].checked = true;
        }
        else {
            isProviderCAQHRegistered[1].checked = true;
            $("#divCAQHProviderID").hide();
            setFieldAsNotRequired(caqhProviderId, caqhProviderId);
            ClearValidationMessage(caqhProviderId);
        }
    }
}

function getEnrollmentTypeAttributeFlagValue() {
    for (i = 0; i < enrollmentTypeCredentialFlagAttribute.length; i++) {
        if (enrollmentTypeCredentialFlagAttribute[i][0] === enrollmentTypeDDLData.value()) {
            if (enrollmentTypeCredentialFlagAttribute[i][1].toLowerCase() === "true") {
                return true;
            }
        }
    }
    return false;
}

function showHideGeneralCredentialInformationOnChange() {
    if (mainFlag.toLowerCase() === "true") {
        if (getEnrollmentTypeAttributeFlagValue() === true) {
            checkForServiceLocationFlag();
        }
        else {
            hideCredentialInformationDetailsDiv();
        }
    }
    else {
        hideCredentialInformationDetailsDiv();
    }
    checkForProgramParticipationAnswer();
    if ($(programType).val() === 'FFSonly') {
        setFieldAsNotRequired(providerBirthPlaceInformationCity, providerBirthPlaceInformationCity);
        setFieldAsNotRequired(providerBirthPlaceInformationCountryList, providerBirthPlaceInformationCountry);
        setFieldAsNotRequired(providerBirthPlaceInformationStatesList, providerBirthPlaceInformationStates);
    }
}

function checkForServiceLocationFlag() {
    var isMedicareEnrolledChecked = $('input:radio[name="Provider.IsMedicareEnrolled.ID"]')[0].checked === true ? true : false;

    if (setExistingServiceLocationFlag.toLowerCase() === "true" && $(isServiceLocationExist).val().toLowerCase() === "true") {
        hideCredentialInformationDetailsDiv();
    }
    else {
        if (medicareEnrolledFlag.toLowerCase() === "true" && isMedicareEnrolledChecked === true) {
            hideCredentialInformationDetailsDiv();
        }
    }
}

function checkForProgramParticipationAnswer() {
    if (($(programType).val() === MCO || $(programType).val() === FFSMCO) && $('#EnrollmentAllowed').val().toLowerCase() !== "customsingle") {
        $(divProgramParticipationAnswer).show();
    }
    else if ($(programType).val() === FFSOnly) {
        $(divProgramParticipationAnswer).hide();
    }
    else if ($(programType).val() === "") {
        $(divProgramParticipationAnswer).hide();
    }
}

function hideCredentialInformationDetailsDiv() {
    var enrollmentTypeVal = enrollmentTypeDDLData.value();
    $(isCredentialingEnabled).val('False');
    checkGeneralCredentialInformation(enrollmentTypeVal);
}

function sealCredentialFields() {
    sealFieldFromCopying(applicantContactEmailAddressConfirmation);
    sealFieldFromCopying(applicantContactEmailAddress);
    sealFieldFromCopying("#EnrollmentCreateCredentials_Password");
    sealFieldFromCopying("#EnrollmentCreateCredentials_PasswordConfirmation");
}

function setContactFieldsForValidation() {
    var listOfFieldsProviderAddressContactInfoForAddressValidator = {
        AddressType: contactAddressType,
        Line1: applicantContactAddressLine1,
        Line2: "#ApplicantContact_Address_Line2",
        City: applicantContactAddressCity,
        State: applicantContactAddressStatesList,
        PostalCode: applicantContactAddressPostalCode,
        Country: applicantContactAddressCountryList,
        suggestedAddressResult: {
            Latitude: "#ApplicantContact_Address_ValidationInfo_Latitude",
            Longitude: "#ApplicantContact_Address_ValidationInfo_Longitude",
            IsAddressValidated: applicantContactAddressValidationInfoIsAddressValidated,
            Type: "#ApplicantContact_Address_ValidationInfo_Type",
            ContainsInvalidType: "#ApplicantContact_Address_ValidationInfo_ContainsInvalidType",
            AddressConfirmed: "#ApplicantContact_Address_ValidationInfo_AddressConfirmed"
        }
    };
    registerChangeFieldsForAddressValidator(listOfFieldsProviderAddressContactInfoForAddressValidator);
}

function initializeAppSettingVariables() {
    domesticCountryCode = ($(applicantContactAddressCountryList).val() !== undefined && $(applicantContactAddressCountryList).val() !== "") ? $(applicantContactAddressCountryList).val().toUpperCase() : unitedStates;
}

function initializePreferredCommunicationsDropdown() {
    var preferredCommunicationMethodDropdown = $(applicantContactPreferredCommunicationMethodList).data("kendoDropDownList");
    if (preferredCommunicationMethodDropdown.dataSource.data().length === 1) {
        preferredCommunicationMethodDropdown.select(1);
        preferredCommunicationMethodDropdown.optionLabel.remove();
        setRequiredFieldProperty();
    }
    syncPreferredCommunicationMethodDropdownWithHiddenFields(preferredCommunicationMethodDropdown);
}

function setPreferredCommunicationMethodHiddenFields(preferredCommunicationMethodDropdown) {
    $("#ApplicantContact_PreferredCommunicationMethod_ID").val(preferredCommunicationMethodDropdown.value());
    $("#ApplicantContact_PreferredCommunicationMethod_Name").val(preferredCommunicationMethodDropdown.text());
}
function syncPreferredCommunicationMethodDropdownWithHiddenFields() {
    var preferredCommunicationMethodDropdown = $(applicantContactPreferredCommunicationMethodList).data("kendoDropDownList");
    if (!preferredCommunicationMethodDropdown) {
        return;
    }
    if ($("#ApplicantContact_PreferredCommunicationMethod_ID").val() === '') {
        setPreferredCommunicationMethodHiddenFields(preferredCommunicationMethodDropdown);
    } else {
        preferredCommunicationMethodDropdown.value($("#ApplicantContact_PreferredCommunicationMethod_ID").val());
    }
}

function initializeContactAddressFields() {
    if ($("#ApplicantContact_Address_Country_ID").val() === '') {
        $(applicantContactAddressCountryList).data("kendoDropDownList").value(domesticCountryCode);
        $("#ApplicantContact_Address_Country_ID").val($(applicantContactAddressCountryList).data("kendoDropDownList").value());
    }
    else {
        $(applicantContactAddressCountryList).data("kendoDropDownList").value($("#ApplicantContact_Address_Country_ID").val());
    }
}

$(applicantContactAddressCountryList).change(function () {
    $("#ApplicantContact_Address_Country_ID").val($(applicantContactAddressCountryList).data("kendoDropDownList").value());
    $("#ApplicantContact_Address_Country_Name").val($(applicantContactAddressCountryList).data("kendoDropDownList").text());
});

function isNPIAndSSNFieldsFilled(ssnOrTaxId) {
    return ($(providerNationalProviderIdentifierVal).val() !== undefined
        && $(providerNationalProviderIdentifierVal).val() !== ""
        && ($(providerNationalProviderIdentifierVal).val()).replace(/_/g, '').length === 10
        && ssnOrTaxId !== undefined && ssnOrTaxId.replace(/-/g, '').length === 9)
        || (enrollmentTypeDDLData.value() === atypicalEnrollmentType
            && ssnOrTaxId !== undefined && ssnOrTaxId.replace(/-/g, '').length === 9);
}

function showHideProgramTypeOnTheBasisOfProviderTypeOnChange(providerTypeAttributeValue, listAttributes) {
    if (isMCO.toLowerCase() === "true") {
        // For revalidation with FFS-only enrollment allowed, if the provider participates with MCOs
        // the PE App cannot remove the MCO, so ProgramType must be set to FFS and MCO and made readonly.
        // If provider is FFS-only, keep FFS and make readonly.
        // For other EnrollmentAllowed values, let revalidation fall through to the normal switch logic.
        if ($(applicationType).val() === reval && providerTypeAttributeValue !== '' && providerTypeAttributeValue !== null && providerTypeAttributeValue.toLowerCase() === yesFfsOnly.toLowerCase()) {
            $(divProgramType).show();
            $(divCustomMultipleProgramTypes).hide();
            let revalProgramTypeDDLData = $(programType).data("kendoDropDownList");
            // Use passed-in listAttributes if available; otherwise fall back to sync call
            let revalListItemAttributes = null;
            if (listAttributes !== null && listAttributes !== undefined && listAttributes.ProviderTypeListItemAttributes !== null && listAttributes.ProviderTypeListItemAttributes !== undefined) {
                revalListItemAttributes = listAttributes.ProviderTypeListItemAttributes;
            } else {
                let revalProviderTypeValue = providerTypeDDLData.value() === "" ? $("#EnrollmentCriteria_ProviderType_ID").val() : providerTypeDDLData.value();
                let revalProviderTypeParm = { providerType: revalProviderTypeValue, applicationType: $("#ApplicationType").val() };
                let revalAttributeResult = makeSyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(revalProviderTypeParm), "application/json");
                if (revalAttributeResult !== null && revalAttributeResult.Data !== null && revalAttributeResult.Data.ProviderTypeListItemAttributes !== null) {
                    revalListItemAttributes = revalAttributeResult.Data.ProviderTypeListItemAttributes;
                }
            }
            if (revalListItemAttributes !== null) {
                let revalDataSource = new kendo.data.DataSource({ data: revalListItemAttributes });
                revalProgramTypeDDLData.setDataSource(revalDataSource);
            }
            // Determine enforced value based on current saved ProgramType:
            // If provider has MCO participation (MCOOnly or FFSMCO), preserve as FFSMCO; otherwise FFS.
            let currentSavedProgramType = $("#Provider_ProgramType_ID").val();
            let enforcedProgramType = (currentSavedProgramType === MCOOnly || currentSavedProgramType === FFSMCO) ? FFSMCO : FFSOnly;
            $("#Provider_ProgramType_ID").val(enforcedProgramType);
            revalProgramTypeDDLData.value(enforcedProgramType);
            revalProgramTypeDDLData.readonly();
            isCustomMultipleProgramTypesFlag = false;
            configureReadOnlyControls();
            if (currentStep === 0 || isNaN(currentStep)) {
                currentStep = 3;
            }
            if (activeStep === 3 && currentStep === 3) {
                loadTOCs();
            }
            return;
        }

        // For re-enrollment with FFS-only enrollment allowed, ProgramType must be set to FFS only and made readonly.
        if ($(applicationType).val() === reenrollment && providerTypeAttributeValue !== '' && providerTypeAttributeValue !== null && providerTypeAttributeValue.toLowerCase() === yesFfsOnly.toLowerCase()) {
            $(divProgramType).show();
            $(divCustomMultipleProgramTypes).hide();
            if (currentStep >= 3) {
                // Resumed reenrollment: preserve existing saved ProgramType
                $(programType).data("kendoDropDownList").readonly();
                configureReadOnlyControls();
            } else {
                loadDropDownForFFSOnlyProgramType(false);
            }
            isCustomMultipleProgramTypesFlag = false;
            if (currentStep === 0 || isNaN(currentStep)) {
                currentStep = 3;
            }
            if (activeStep === 3 && currentStep === 3) {
                loadTOCs();
            }
            return;
        }

        var param = null;
        programTypesResult = null;
        if (providerTypeDDLData.value() === "") {
            param = { providerType: $("#EnrollmentCriteria_ProviderType_ID").val() };
        }
        else {
            param = { providerType: providerTypeDDLData.value() };
        }
        var programTypeDDLData = $(programType).data("kendoDropDownList");
        programTypeDDLData.readonly(false);
        resetProgramTypeDropdown();

        $(customMultipleProgramTypes).empty();
        if (providerTypeAttributeValue === '' || providerTypeAttributeValue === null || providerTypeAttributeValue.toLowerCase() === "false" || providerTypeAttributeValue.toLowerCase() === "yesallprogramtypes") {
            $(divProgramType).show();
            $(divCustomMultipleProgramTypes).hide();
            loadDropDownForAllProgramTypes(listAttributes);
            setFieldAsRequired("Provider_ProgramTypeList", "Provider_ProgramType");
            isCustomMultipleProgramTypesFlag = false;
        }
        else if (providerTypeAttributeValue !== "" && providerTypeAttributeValue !== null && providerTypeAttributeValue.toLowerCase() === yesFfsOnly.toLowerCase()) {
            $(divProgramType).show();
            $(divCustomMultipleProgramTypes).hide();
            var dataSource = new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes });
            $(programType).data("kendoDropDownList").setDataSource(dataSource);
            if (($(applicationType).val() === reenrollment || $(applicationType).val() === reval) && currentStep >= 3) {
                // Resumed reenrollment/revalidation: preserve existing saved ProgramType
                $(programType).data("kendoDropDownList").readonly();
                configureReadOnlyControls();
            } else {
                loadDropDownForFFSOnlyProgramType(false);
            }
            isCustomMultipleProgramTypesFlag = false;
        }
        else if (providerTypeAttributeValue !== "" && providerTypeAttributeValue !== null && providerTypeAttributeValue.toLowerCase() === "mcoonly") {
            $(divProgramType).show();
            $(divCustomMultipleProgramTypes).hide();
            var McoDataSource = new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes });
            $(programType).data("kendoDropDownList").setDataSource(McoDataSource);
            loadDropDownForMCOOnlyProgramType(false);
            setFieldAsRequired("Provider_ProgramTypeList", "Provider_ProgramType");
            isCustomMultipleProgramTypesFlag = false;
        }
        else if (providerTypeAttributeValue !== "" && providerTypeAttributeValue !== null && providerTypeAttributeValue.toLowerCase() === "custommultiple") {
            $(divProgramParticipationAnswer).hide();
            $(divProgramType).hide();
            $(divCustomMultipleProgramTypes).show();
            setFieldAsNotRequired("Provider_ProgramTypeList", "Provider_ProgramType");
            $("#Provider_ProgramType_ID").val(FFSMCO);
            isCustomMultipleProgramTypesFlag = true;
            programTypesResult = makeSyncWebApiCall(programTypeWebApiUrl, "POST", JSON.stringify(param), "application/json");
            buildCustomMultipleCheckBoxes(programTypesResult);
            showHideGeneralCredentialInformationOnChange();
        }
        else if (providerTypeAttributeValue !== "" && providerTypeAttributeValue !== null && providerTypeAttributeValue.toLowerCase() === customSingle.toLowerCase()) {
            $(divProgramParticipationAnswer).hide();
            isCustomMultipleProgramTypesFlag = false;
            let customSingleParam = param;
            if (listAttributes !== null && listAttributes !== undefined && listAttributes.EnrollmentTypeEnrollmentAllowed !== null && listAttributes.EnrollmentTypeEnrollmentAllowed !== undefined && listAttributes.EnrollmentTypeEnrollmentAllowed.trim().toLowerCase() === customSingle.toLowerCase()) {
                let enrollmentTypeValue = enrollmentTypeDDLData.value() !== undefined && enrollmentTypeDDLData.value() !== '' ? enrollmentTypeDDLData.value() : $("#EnrollmentCriteria_EnrollmentType_ID").val();
                let providerTypeValue = providerTypeDDLData.value() === '' ? $("#EnrollmentCriteria_ProviderType_ID").val() : providerTypeDDLData.value();
                customSingleParam = { providerType: providerTypeValue, enrollmentType: enrollmentTypeValue };
            }
            programTypesResult = makeSyncWebApiCall(programTypeWebApiUrl, "POST", JSON.stringify(customSingleParam), "application/json");
            showHideGeneralCredentialInformationOnChange();
            $("#EnrollmentAllowed").val(providerTypeAttributeValue);
            overrideProgramTypes(programTypesResult);
        }
        if (!isCustomMultipleProgramTypesFlag && customSingleProgramTypes.length > 0 && $(providerSelectedProgramTypeCode).val() == '') {
            for (var i = 0; i < customSingleProgramTypes.length; i++) {
                if (customSingleProgramTypes[i].Text === $(programType).data("kendoDropDownList").text()) {
                    $(providerSelectedProgramTypeCode).val(customSingleProgramTypes[i].programTypeID);
                }
            }
        }
    }
    else {
        $(divProgramType).show();
        if (($(applicationType).val() === reenrollment || $(applicationType).val() === reval) && currentStep >= 3) {
            // Resumed existing reenrollment/revalidation: preserve saved ProgramType, do not overwrite
            $(programType).data("kendoDropDownList").readonly();
            configureReadOnlyControls();
            $("#divProgramParticipationAnswer").hide();
            showHideGeneralCredentialInformationOnChange();
            $(divProgramType).hide();
        } else {
            loadDropDownForFFSOnlyProgramType(true);
            if ($(applicationType).val() === reval || $(applicationType).val() === reenrollment) {
                $(programType).data("kendoDropDownList").readonly();
            }
        }
    }
    if (currentStep === 0 || isNaN(currentStep)) {
        currentStep = 3;
    }
    if (activeStep === 3 && currentStep === 3) {
        loadTOCs();
    }
    configureReadOnlyControls();
}

customProgramTypeChange = function (e) {
    if (e.checked) {
        selectedCustomProgramsList.push(e.name);
    }
    else {
        selectedCustomProgramsList.splice(selectedCustomProgramsList.indexOf(e.name), 1);
        $('input[name="SelectAll"]').prop('checked', false);
    }
    isStepDataDirty = true;
    setProgramTypeValue(e.checked, e.value);
};

customProgramTypeChangeForSelectAll = function (e) {
    selectedCustomProgramsList.splice(0, selectedCustomProgramsList.length);
    if (e.checked) {
        for (var i = 0; i < programTypesResult.Data.length; i++) {
            selectedCustomProgramsList.push(programTypesResult.Data[i].Value);
            $('input[name="' + programTypesResult.Data[i].Value + '"]').prop('checked', true);
        }
    }
    else {
        for (var j = 0; j < programTypesResult.Data.length; j++) {
            $('input[name="' + programTypesResult.Data[j].Value + '"]').prop('checked', false);
        }
    }
    $(programType).val(FFSMCO);
    $("#Provider_ProgramType_ID").val(FFSMCO);
    isStepDataDirty = true;
};

function setProgramTypeValue(isChecked, currentProgramType) {
    var lowerProgramType = currentProgramType.toLowerCase();
    if (isChecked) {
        if (lowerProgramType === "ffsmco") {
            $(programType).val(FFSMCO);
            $("#Provider_ProgramType_ID").val(FFSMCO);
        } else if (lowerProgramType === "ffsonly") {
            $(programType).val(FFSOnly);
            $("#Provider_ProgramType_ID").val(FFSOnly);
        } else {
            checkExistingProgramTypeAndReset();
        }
    }
    else {
        if (lowerProgramType === "ffsmco") {
            $(programType).val(MCO);
            $("#Provider_ProgramType_ID").val(MCO);
        } else if (lowerProgramType === "ffsonly") {
            $(programType).val(FFSOnly);
            $("#Provider_ProgramType_ID").val(FFSOnly);
        } else {
            checkExistingProgramTypeAndReset();
        }
    }
}

function checkExistingProgramTypeAndReset() {
    var currentProgramTypeVal = $(programType).val().toLowerCase();
    if (currentProgramTypeVal === "ffsmco") {
        $(programType).val(FFSMCO);
    } else if (currentProgramTypeVal === "ffsonly") {
        $(programType).val(FFSOnly);
    } else {
        $(programType).val(MCO);
    }

    var currentProgramTypeId = $("#Provider_ProgramType_ID").val().toLowerCase();
    if (currentProgramTypeId === "ffsmco") {
        $("#Provider_ProgramType_ID").val(FFSMCO);
    } else if (currentProgramTypeId === "ffsonly") {
        $("#Provider_ProgramType_ID").val(FFSOnly);
    } else {
        $("#Provider_ProgramType_ID").val(MCO);
    }
}

function overrideProgramTypes(programTypesResult) {
    var programTypeArray = [];
    if (programTypesResult.Data.length > 0) {
        for (var i = 0; i < programTypesResult.Data.length; i++) {
            var program = {};
            for (j = 0; j < programTypesResult.Data[i].AttributeValues.length; j++) {
                if (programTypesResult.Data[i].AttributeValues[j].DataListAttributeName.toLowerCase() === "ffsmcotype") {
                    program.Name = programTypesResult.Data[i].Text;
                    program.FormattedText = programTypesResult.Data[i].Text;
                    program.ID = programTypesResult.Data[i].AttributeValues[j].DataListAttributeValue;
                }
            }
            programTypeArray.push(program);
            customSingleProgramTypes.push({ programTypeID: programTypesResult.Data[i].Value, Text: programTypesResult.Data[i].Text });
        }

        $(programType).data("kendoDropDownList").setDataSource(programTypeArray);
    }
}

function buildCustomMultipleCheckBoxes(programTypesResult) {
    if (programTypesResult.Data.length > 0) {
        var genericProgramType;

        var dynamicControlForSelectAll = "<div class='col-md-4 editor-col'>"
            + "<input data-val='true' type='checkbox' id = 'Provider_CustomMultipleProgramTypes_SelectAll' name = 'SelectAll' onclick = 'customProgramTypeChangeForSelectAll(this)' class='k-checkbox editor-control'/>"
            + "<label class='k-checkbox-label' for = 'Provider_CustomMultipleProgramTypes_SelectAll'>" + programTypeSelectAll + "</label>"
            + "</div>";
        $(customMultipleProgramTypes).append(dynamicControlForSelectAll);

        for (i = 0; i < programTypesResult.Data.length; i++) {
            for (j = 0; j < programTypesResult.Data[i].AttributeValues.length; j++) {
                if (programTypesResult.Data[i].AttributeValues[j].DataListAttributeName.toLowerCase() === "ffsmcotype") {
                    genericProgramType = programTypesResult.Data[i].AttributeValues[j].DataListAttributeValue;
                }
            }

            var dynamicControls = "<div class='col-md-4 editor-col'>"
                + "<input data-val='true' type='checkbox' id = 'Provider_CustomMultipleProgramTypes[" + i + "]_Value' name = '" + programTypesResult.Data[i].Value + "' onclick = 'customProgramTypeChange(this)' class='k-checkbox editor-control' value='" + genericProgramType + "'/>"
                + "<label class='k-checkbox-label' for = 'Provider_CustomMultipleProgramTypes[" + i + "]_Value'>" + programTypesResult.Data[i].Text + "</label>"
                + "</div>";

            $(customMultipleProgramTypes).append(dynamicControls);
        }

        for (i = 0; i < selectedCustomProgramsList.length; i++) {
            $('input[name="' + selectedCustomProgramsList[i] + '"]').prop('checked', true);
        }
    }
}

function updateCustomMultipleProgramTypes() {
    if (isCustomMultipleProgramTypesFlag) {
        isStepDataDirty = false;
        $("#generateProgramParticipation").empty();
        if (selectedCustomProgramsList !== null & selectedCustomProgramsList !== "") {
            for (i = 0; i < selectedCustomProgramsList.length; i++) {
                var dynamicControls = "<input name = 'Provider.CustomProgramTypes[" + i + "].ID' id = 'Provider.CustomProgramTypes[" + i + "]_ID' value = '" + selectedCustomProgramsList[i] + "' />";
                $("#generateProgramParticipation").append(dynamicControls);
            }
        }
        else {
            var errors = new Array();
            errors.push(customeMultipleProgramTypeRequired);
            showSummaryErrors(errors);
        }
    }
}

function showHideProgramTypeOnPageLoad() {
    if (isMCO.toLowerCase() === "true" || $("#IsCAQHEnrollment").val().toLowerCase() === "true") {
        var providerTypeParm;
        var providerTypeValue = providerTypeDDLData.value() === '' ? $("#EnrollmentCriteria_ProviderType_ID").val() : providerTypeDDLData.value();
        var providerTypeAttributeValue = $('#EnrollmentAllowed').val().toLowerCase();
        if (providerTypeValue !== "" && providerTypeValue !== null) {
            let enrollmentTypeValue = enrollmentTypeDDLData.value() !== undefined && enrollmentTypeDDLData.value() !== '' ? enrollmentTypeDDLData.value() : $("#EnrollmentCriteria_EnrollmentType_ID").val();
            providerTypeParm = { providerType: providerTypeValue, applicationType: $("#ApplicationType").val(), enrollmentType: enrollmentTypeValue };
            let attributeResult = makeSyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(providerTypeParm), "application/json");
            if (attributeResult !== null && attributeResult.Data !== null) {
                processProviderTypesAttributesSuccess(attributeResult);
            }
            // For Revalidation, ensure the enrollment type EnrollmentAllowed override is applied
            // even if processProviderTypesAttributesSuccess did not fully enforce it.
            if ($(applicationType).val() === reval
                && attributeResult !== null && attributeResult.Data !== null
                && attributeResult.Data.EnrollmentTypeEnrollmentAllowed !== null
                && attributeResult.Data.EnrollmentTypeEnrollmentAllowed !== undefined
                && attributeResult.Data.EnrollmentTypeEnrollmentAllowed.trim().toLowerCase() === yesFfsOnly.toLowerCase()) {
                let revalProgramTypeDDL = $(programType).data("kendoDropDownList");
                if (!revalProgramTypeDDL.options.readonly) {
                    $(divProgramType).show();
                    $(divCustomMultipleProgramTypes).hide();
                    if (attributeResult.Data.ProviderTypeListItemAttributes !== null && attributeResult.Data.ProviderTypeListItemAttributes !== undefined) {
                        let revalDS = new kendo.data.DataSource({ data: attributeResult.Data.ProviderTypeListItemAttributes });
                        revalProgramTypeDDL.setDataSource(revalDS);
                    }
                    let savedPT = $("#Provider_ProgramType_ID").val();
                    let enforcedPT = (savedPT === MCOOnly || savedPT === FFSMCO) ? FFSMCO : FFSOnly;
                    $("#Provider_ProgramType_ID").val(enforcedPT);
                    revalProgramTypeDDL.value(enforcedPT);
                    revalProgramTypeDDL.readonly();
                    isCustomMultipleProgramTypesFlag = false;
                    configureReadOnlyControls();
                }
            }
        }
        else if (providerTypeAttributeValue !== null && providerTypeAttributeValue !== "") {
            if (providerTypeAttributeValue.toLowerCase() === "custommultiple") {
                showHideProgramTypeOnTheBasisOfProviderTypeOnChange(providerTypeAttributeValue, null);
            }

            if (providerTypeAttributeValue.toLowerCase() === "yesallprogramtypes") {
                showHideProgramTypeOnTheBasisOfProviderTypeOnChange(providerTypeAttributeValue, null);
            }

            else if (providerTypeAttributeValue.toLowerCase() === yesFfsOnly.toLowerCase()) {
                if ($(applicationType).val() === reval) {
                    let revalProviderTypeVal = $("#EnrollmentCriteria_ProviderType_ID").val();
                    let revalParm = { providerType: revalProviderTypeVal, applicationType: $("#ApplicationType").val() };
                    let revalAttrResult = makeSyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(revalParm), "application/json");
                    if (revalAttrResult !== null && revalAttrResult.Data !== null && revalAttrResult.Data.ProviderTypeListItemAttributes !== null) {
                        let revalDS = new kendo.data.DataSource({ data: revalAttrResult.Data.ProviderTypeListItemAttributes });
                        $(programType).data("kendoDropDownList").setDataSource(revalDS);
                    }
                    let savedPT = $("#Provider_ProgramType_ID").val();
                    let enforcedPT = (savedPT === MCOOnly || savedPT === FFSMCO) ? FFSMCO : FFSOnly;
                    $("#Provider_ProgramType_ID").val(enforcedPT);
                    $(programType).data("kendoDropDownList").value(enforcedPT);
                    $(programType).data("kendoDropDownList").readonly();
                    configureReadOnlyControls();
                }
                else {
                    if ($(applicationType).val() === reenrollment && currentStep >= 3) {
                        // Resumed reenrollment: preserve existing saved ProgramType
                        $(programType).data("kendoDropDownList").readonly();
                        configureReadOnlyControls();
                    } else {
                        $("#Provider_ProgramType_ID").val(FFSOnly);
                        $(programType).data("kendoDropDownList").value(FFSOnly);
                        loadDropDownForFFSOnlyProgramType(false);
                    }
                }
            }
            else if (providerTypeAttributeValue.toLowerCase() === "mcoonly") {
                $("#Provider_ProgramType_ID").val(MCOOnly);
                $(programType).data("kendoDropDownList").value(MCOOnly);
                loadDropDownForMCOOnlyProgramType(false);
            }
        }
        AssignProgramParticipation();
    }
    else {
        if (($(applicationType).val() === reenrollment || $(applicationType).val() === reval) && currentStep >= 3) {
            // Resumed reenrollment/revalidation: preserve existing saved ProgramType
            $(programType).data("kendoDropDownList").readonly();
            configureReadOnlyControls();
            $(divProgramType).hide();
        } else {
            $("#Provider_ProgramType_ID").val(FFSOnly);
            $(programType).data("kendoDropDownList").value(FFSOnly);
            loadDropDownForFFSOnlyProgramType(true);
            if ($(applicationType).val() === reval || $(applicationType).val() === reenrollment) {
                $(programType).data("kendoDropDownList").readonly();
                configureReadOnlyControls();
            }
        }
    }
    if (currentStep === 0 || isNaN(currentStep)) {
        currentStep = 3;
    }
    if (activeStep === 3 && currentStep === 3) {
        loadTOCs();
    }
}

function loadTOCs() {
    var enrollmentTypePartialParm = "enrollmentType=" + enrollmentTypeDDLData.value() + "&providerType=" + providerTypeDDLData.value() + "&riskLevel=" + $("#RiskLevel").val() + "&programType=" + $(programType).val() + "&disabledTocs=" + disabledTocs + "&EnrollmentApplicationId=" + $("#EnrollmentApplicationId").val() + "&applicationType=" + $("#ApplicationType").val() + "&isCredentialingEnabled=" + $(isCredentialingEnabled).val();
    if (enrollmentTypeDDLData.value() !== "") {
        let enrollmentStepsParm = { enrollmentType: enrollmentTypeDDLData.value(), providerType: providerTypeDDLData.value(), riskLevel: $("#RiskLevel").val(), programType: $(programType).val(), disabledTocs: disabledTocs, enrollmentApplicationId: $("#EnrollmentApplicationId").val(), applicationType: $("#ApplicationType").val(), isCredentialingEnabled: $(isCredentialingEnabled).val() };
        makeAsyncWebApiCall(enrollmentStepsWebApiUrl, "POST", JSON.stringify(enrollmentStepsParm), "application/json", "processEnrollmentPartialStepsSuccess");
    }
}

function loadDropDownForFFSOnlyProgramType(hideControl) {
    var programTypeDDLData = $(programType).data("kendoDropDownList");

    $("#Provider_ProgramType_ID").val(FFSOnly);
    programTypeDDLData.value(FFSOnly);
    programTypeDDLData.readonly();
    configureReadOnlyControls();
    $("#divProgramParticipationAnswer").hide();
    showHideGeneralCredentialInformationOnChange();
    if (hideControl !== undefined && hideControl === true) {
        $(divProgramType).hide();
    }
}

function loadDropDownForMCOOnlyProgramType(hideControl) {
    var programTypeDDLData = $(programType).data("kendoDropDownList");
    $("#Provider_ProgramType_ID").val(MCOOnly);
    programTypeDDLData.value(MCOOnly);
    programTypeDDLData.readonly();
    configureReadOnlyControls();
    showHideGeneralCredentialInformationOnChange();
    if (hideControl !== undefined && hideControl === true) {
        $(divProgramType).hide();
    }
}

function loadDropDownForAllProgramTypes(listAttributes) {
    $(programType).data("kendoDropDownList").readonly(false);
    if ($("#Provider_ProgramType_ID").val() === null || $("#Provider_ProgramType_ID").val() === "") {
        clrKendoDropdownList("Provider_ProgramTypeList");
    }
    var dataSource = new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes });
    $(programType).data("kendoDropDownList").setDataSource(dataSource);
    if ($("#Provider_ProgramType_ID").val() !== null || $("#Provider_ProgramType_ID").val() !== "") {
        $(programType).data("kendoDropDownList").value($("#Provider_ProgramType_ID").val());
    }
    configureReadOnlyDropDownListWidgets();
    showHideGeneralCredentialInformationOnChange();
}

function resetProgramTypeDropdown() {
    $(programType).closest('div.editor-field').find('span.k-dropdown-wrap.k-state-default').find('span.k-input').removeClass('readonly-control');
    $(programType).data("kendoDropDownList").readonly(false);
    configureReadOnlyDropDownListWidgets();
}

function resetProviderTypeDropDown() {
    $(enrollmentCriteriaProviderTypeList).data("kendoDropDownList").select(null);
    $("#EnrollmentCriteria_ProviderType_ID").val("");
    $("#EnrollmentCriteria_ProviderType_Name").val("");
}

function resetCredentialTypeDropDown() {
    $("#CredentialType").hide();
    setFieldAsNotRequired(credentialTypeList, "Provider_CredentialType");
    $("#" + credentialTypeList).data("kendoDropDownList").select(null);
    $("#Provider_CredentialType_ID").val("");
    $("#Provider_CaredentialType_Name").val("");
}

function makePreferredCommunicationLanguagedropdownlistReadonly() {
    var preferredCommunicationLanguagedropdownlist = $("#Provider_PreferredCommunicationDetails_LanguageListList").data("kendoDropDownList");
    if ($(applicationType).val() === reval) {
        preferredCommunicationLanguagedropdownlist.readonly(false);
    }
    else if ($(applicationType).val() === mcoEnrollment) {
        preferredCommunicationLanguagedropdownlist.readonly(true);
        configureReadOnlyControls();
    }
    else if ($(applicationType).val() === newenrollment && $("#IsChowEnrollment").val().toLowerCase() === "true") {
        preferredCommunicationLanguagedropdownlist.readonly(true);
        configureReadOnlyControls();
    }
}

function showEinAndSetTaxIdTypeGroupOrFacilityEnrollment() {
    $(divProviderSSNCode).hide();
    populateRedactionWidget("Provider_TaxIdentification_SSN", "");
    $("#Provider_TaxIdentification_SSNHidden").val("");
    $(divProviderEINCode).show();
    if (hideIRSEffectiveDate === "No") {
        $(divProviderEffectiveDate).show();
        setFieldAsRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
    }
    else {
        $(divProviderEffectiveDate).hide();
        setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
    }
    setFieldAsRequired(taxIdentificationTaxId, taxIdentificationTaxId);
    setFieldAsNotRequired(taxIdentificationSSN, taxIdentificationSSN);
    taxIdType = EIN;
    $(providerTaxIdType).val(taxIdType);
}

function showSsnAndSetTaxIdTypeGroupOrFacilityEnrollment() {
    $(divProviderSSNCode).show();
    $(divProviderEINCode).hide();
    populateRedactionWidget("Provider_TaxIdentification_TaxId", "");
    $("#Provider_TaxIdentification_TaxIdHidden").val("");
    $(divProviderEffectiveDate).hide();
    setFieldAsNotRequired(taxIdentificationTaxId, taxIdentificationTaxId);
    setFieldAsNotRequired(providerTaxIdentificationEffectiveFromDate, providerTaxIdentificationEffectiveFromDate);
    setFieldAsRequired(taxIdentificationSSN, taxIdentificationSSN);
    taxIdType = SSN;
    $(providerTaxIdType).val(taxIdType);
}

$('input:radio[name="Provider.TaxIdentification.TaxIdTypes.ID"]').change(function () {
    checkdProviderTaxIdentificationTaxIdTypes();
    $(divProviderSSNCode).find(inputText).val('');
    $(divProviderSSNCode).find(inputPassword).val('');
    $(divProviderEINCode).find(inputText).val('');
    $(divProviderEINCode).find(inputPassword).val('');
    $(divProviderEffectiveDate).find(inputText).val('');
});

function disableEinOrSsnRedioButtonInGroupAndFacilityEnrollment() {
    var einOrSsn = $('input:radio[name="Provider.TaxIdentification.TaxIdTypes.ID"]');
    einOrSsn.attr('readonly', false);
    if (einOrSsn[0].checked) {
        $("#" + einOrSsn[1].id).attr('readonly', true);
    }
    else {
        $("#" + einOrSsn[0].id).attr('readonly', true);
    }
    einOrSsn.closest("div").addClass("readonly-bkgrnd-color");
    configureReadOnlyControls();
}

function checkdProviderTaxIdentificationTaxIdTypes() {
    var isEinOrSsn = $('input:radio[name="Provider.TaxIdentification.TaxIdTypes.ID"]');
    isEinOrSsn = isEinOrSsn[0].checked === true ? EIN : isEinOrSsn[1].checked === true ? SSN : "default";
    switch (isEinOrSsn) {
        case EIN:
            showEinAndSetTaxIdTypeGroupOrFacilityEnrollment();
            break;
        case SSN:
            showSsnAndSetTaxIdTypeGroupOrFacilityEnrollment();
            break;
        default:
            isEinOrSsn[0].checked = true;
            showEinAndSetTaxIdTypeGroupOrFacilityEnrollment();
            break;
    }
}

function setReadOnlySSNOrEINForSoleProprietor() {
    if ($(providerTaxIdType).val() === SSN) {
        $(divProviderEINCode).hide();
        $(divProviderSSNCode).show();
        makeReadOnlySSN();
    }
    else {
        $(divProviderSSNCode).hide();
        $(divProviderEINCode).show();
        makeReadOnlyEIN();
    }
}

function setReadOnlySSNOrEINForSoleProprietorInRevalidation() {
    if ($(providerTaxIdType).val() === SSN) {
        $(divProviderEINCode).hide();
        validateSSNInRevalidation();
    }
    else {
        $(divProviderSSNCode).hide();
        validateEINInRevalidation();
    }
}

function setHideOrShowProviderEffectiveDateForSoleProprietor() {
    if ($(providerTaxIdType).val() === SSN) {
        $(divProviderEffectiveDate).hide();
    }
    else {
        $(divProviderEffectiveDate).show();
    }
}


$("#ViewChowDetailsButton").click(function () {
    openModalOverlay(generalInformationFormId, viewChowRequestFormURL, 'panelForm-col-7', null, { applicationId: applicationID });
});
function setPreferredCommunicationToEmailForEsignature() {
    var dropdown = $(applicantContactPreferredCommunicationMethodList).data("kendoDropDownList");
    if (!dropdown) return;

    var showOnlyEmailInPreferredCommunicationDropdown = function () {
        var dataSource = dropdown.dataSource;
        var allItems = dataSource.data();

        for (var i = allItems.length - 1; i >= 0; i--) {
            if (allItems[i].ID !== "E") {
                dataSource.remove(allItems[i]);
            } else {
                dropdown.value(allItems[i].ID);
                $("#ApplicantContact_PreferredCommunicationMethod_ID").val(allItems[i].ID);
                $("#ApplicantContact_PreferredCommunicationMethod_Name").val(allItems[i].Name);
            }
        }
    };

    if (dropdown.dataSource.data().length === 0) {
        var onDataSourceChange = function () {
            showOnlyEmailInPreferredCommunicationDropdown();
            dropdown.dataSource.unbind("change", onDataSourceChange);
        };
        dropdown.dataSource.bind("change", onDataSourceChange);
    } else {
        showOnlyEmailInPreferredCommunicationDropdown();
    }
}
function buildGeneralInformationPageError() {
    const pageErrorList = [
        { errors: [programParticipationQuestionRequiredMsg], element: "#divProviderInformation" },
        { errors: [correctTheAddressMsg], element: "#divContactInformation" }
    ];
    return pageErrorList;
}
