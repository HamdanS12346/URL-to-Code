//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2024. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var createEnrollmentFormId = "#CreateEnrollmentForm";
var enrollmentPreChecklistEnrollmentTypeListId = "EnrollmentPreChecklist_EnrollmentTypeList";
var enrollmentPreChecklistProviderTypeListId = "EnrollmentPreChecklist_ProviderTypeList";
var enrollmentPreChecklistProgramTypeListId = "EnrollmentPreChecklist_ProgramTypeList";
var enrollmentPreChecklistProgramType = "EnrollmentPreChecklist_ProgramType";
var multifactorAuthenticationFormId = "MultifactorAuthenticationForm";
var step = 0;
var prechecklistProviderTypeDDLData = null;
var enrollmentAllowedAttributeValue;
var specialtyAttributeList = [];
var isEmailInvalid = "#Provider_IsEmailInvalid";
var enrollmentApplicationId;
var isRegistrationEmailAddressUpdatedNotificationSent;
var enrollmentStatus;
var isNPPESDirtyDataAllowed = "#Provider_IsNPPESDirtyDataAllowed";
var isSSNVerificationAccepted = "#Provider_TaxIdentification_SSNVerification_IsSSNVerificationAccepted";
var isEINVerificationAccepted = "#Provider_TaxIdentification_EINVerification_IsEINVerificationAccepted";
var irsSSNValidationCode = "#Provider_TaxIdentification_SSNVerification_IRSSSNValidationCode";
var irsEINValidationCode = "#Provider_TaxIdentification_EINVerification_IRSEINValidationCode";
var hasIrsScreeningValidationError = false;
var irsTinValidationMatchCode;
var irsTinType;
var newEnrollmentTypeIdentifierEnrollmentTypeListId = "NewEnrollmentTypeIdentifier_EnrollmentTypeList";
var newEnrollmentTypeIdentifierProviderTypeListId = "NewEnrollmentTypeIdentifier_ProviderTypeList";
var newEnrollmentTypeIdentifierProviderTypeDDL = null;
var isCAQHEnrollmentRequired = false;

var prechecklistDataValidator = $(createEnrollmentFormId).kendoValidator({
    validateOnBlur: false,
    validate: function () {
        focusFirstErrorElement(createEnrollmentFormId);
    }
}).data("kendoValidator");

$(document).ready(function () {
    initializeNewEnrollmentTypeIdentifiers();
    initializePrechecklistProviderTypeDropdown();
    ProviderReferenceTextCounter("#EnrollmentCreateCredentials_ProviderReference");
    setFieldAsRequired(enrollmentPreChecklistEnrollmentTypeListId, "EnrollmentPreChecklist_EnrollmentType");
    setFieldAsRequired(enrollmentPreChecklistProviderTypeListId, "EnrollmentPreChecklist_ProviderType");
    setFieldAsRequired("EnrollmentPreChecklist_SpecialtyList", "EnrollmentPreChecklist_Specialty");
    setFieldAsRequired("EnrollmentPreChecklist_IsMedicareEnrolled", "EnrollmentPreChecklist_IsMedicareEnrolled");
    setFieldAsRequired("EnrollmentPreChecklist_TaxIdTypes", "EnrollmentPreChecklist_TaxIdTypes");
    setFieldAsRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
    
    $(document).on('click', '.msg-inline-close[data-dismiss="alert"]', function (e) {
        e.preventDefault();
        $('#validationSummary_child').fadeOut(300, function () {
            $(this).empty();
        });
    });

    $("#EnrollmentCreateCredentials_ProviderReference").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length) {
            e.preventDefault();
        }
    });
    clrKendoDropdownList("EnrollmentPreChecklist_SpecialtyList");
    clrKendoDropdownList(enrollmentPreChecklistProviderTypeListId);
    clrKendoDropdownList(enrollmentPreChecklistProgramTypeListId);
    $("#EnrollmentPreChecklist_EnrollmentTypeList").change(function (e) {
        clearSummaryErrors();
        var enrollmentTypeDropDown = $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").value();
        clrKendoDropdownList(enrollmentPreChecklistProviderTypeListId);
        $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").select(-1);
        $("#EnrollmentPreChecklist_ProviderTypeList").focus().select();
        clrKendoDropdownList("EnrollmentPreChecklist_SpecialtyList");
        resetEnrollmentPrechecklistProgramTypeDropdown();
        if (enrollmentTypeDropDown !== "") {
            let providerTypesParm = { enrollmentType: enrollmentTypeDropDown, isPrechecklist: true };
            makeAsyncWebApiCall(loadProviderTypesWebApiUrl, "POST", JSON.stringify(providerTypesParm), "application/json", "providerTypeDataReceiveSuccess");
        }
        togglePrechecklistGenerateButton();
    });
    if (isMCO.toLowerCase() === "false") {
        $("#divPrechecklistProgramType").hide();
        $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").value(ffsOnly);
        $("#EnrollmentPreChecklist_ProgramType_ID").val(FFSOnly);
    }
    clearSummaryErrors();
    if ($("input[name='Provider.ChangeOfOwnership.IsChowRequired.ID']:radio") !== undefined) {
        $("#Provider_ChangeOfOwnership_IsChowRequired_IDNo").focus();
    }
    $("#prechecklistGenerateButton").hide();

    $("#NewEnrollmentTypeIdentifier_EnrollmentTypeList").change(function (e) {
        clearSummaryErrors();
        let enrollmentTypeDropDown = $("#NewEnrollmentTypeIdentifier_EnrollmentTypeList").data("kendoDropDownList").value();
        clrKendoDropdownList(newEnrollmentTypeIdentifierProviderTypeListId);
        $("#NewEnrollmentTypeIdentifier_ProviderTypeList").data("kendoDropDownList").select(-1);
        $("#NewEnrollmentTypeIdentifier_ProviderTypeList").focus().select();

        if (enrollmentTypeDropDown !== "") {
            let providerTypesParm = { enrollmentType: enrollmentTypeDropDown, isPrechecklist: true };
            makeAsyncWebApiCall(loadProviderTypesWebApiUrl, "POST", JSON.stringify(providerTypesParm), "application/json", "getProviderTypeSuccess");
        }
    });
});

function initializeNewEnrollmentTypeIdentifiers() {
    if (enableRequireCAQHEnrollmentForProviderType && editorStep === 1) {
        toggleNewEnrollmentTypeIdentifiers();
        initializeNewEnrollmentTypeIdentifierProviderTypeDropdown();
    }
}
function initializeNewEnrollmentTypeIdentifierProviderTypeDropdown() {
    newEnrollmentTypeIdentifierProviderTypeDDL = $("#NewEnrollmentTypeIdentifier_ProviderTypeList").data("kendoDropDownList");
    newEnrollmentTypeIdentifierProviderTypeDDL.unbind();
    newEnrollmentTypeIdentifierProviderTypeDDL.bind("change", NewEnrollmentTypeIdentifierProviderTypeChange);
}

function initializePrechecklistProviderTypeDropdown() {
    prechecklistProviderTypeDDLData = $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList");
    prechecklistProviderTypeDDLData.unbind();
    prechecklistProviderTypeDDLData.bind("change", prechecklistProviderTypeChange);
}

getProviderTypeSuccess = function (result) {
    if (result && result.Data && result.Data.length > 0) {
        clrKendoDropdownList(newEnrollmentTypeIdentifierProviderTypeListId);
        let dataSource = new kendo.data.DataSource({ data: result.Data });
        newEnrollmentTypeIdentifierProviderTypeDDL.setDataSource(dataSource);
    }
};

function NewEnrollmentTypeIdentifierProviderTypeChange() {
    let providerTypeId = $('#NewEnrollmentTypeIdentifier_ProviderTypeList').data('kendoDropDownList').value();
    $(nextButtonId).hide();

    if (providerTypeId) {
        let enrollmentTypeId = $('#NewEnrollmentTypeIdentifier_EnrollmentTypeList').data('kendoDropDownList').value();
        let providerTypeParm = { providerType: providerTypeId, applicationType: $("#ApplicationType").val(), enrollmentType: enrollmentTypeId };
        makeAsyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(providerTypeParm), "application/json", "getProviderTypeAttributesSuccess");
    }
}

function getProviderTypeAttributesSuccess(result) {
    if (result && result.Data && result.Data.ProviderTypeDataListAttributes && result.Data.ProviderTypeDataListAttributes.length > 0) {
        evaluateCAQHEnrollmentEnforcement(result.Data.ProviderTypeDataListAttributes);
    }
    else {
        $(nextButtonId).show();
    }
}

function evaluateCAQHEnrollmentEnforcement(providerTypeDataListAttributes) {
    let isAllowOnlyCAQHEnrollment = getProviderTypeAttributesValuesByAttributeName(providerTypeDataListAttributes, 'AllowOnlyCAQHEnrollment');

    if (isAllowOnlyCAQHEnrollment === 'true') {
        let formattedErrorMsg = CaqhEnrollmentRequiredMessage.replace(/\\n/g, "<br/>");
        let htmlMessage = "<div class='mg-group-text-align'>" + formattedErrorMsg + "</div>"
        displayHtmlPopupOKCancelDialog(messageTypeQuestion, CaqhEnrollmentRequiredPopupTitle, htmlMessage, globalYes, "onCAQHRedirectConfirmYes", globalNo, "onCAQHRedirectConfirmNo", false, null);
    }
    else {
        $(nextButtonId).show();
    }
}

window.onCAQHRedirectConfirmYes = function () {
    if (!enrollmentViaCAQHUrl || enrollmentViaCAQHUrl.trim() === '') {
        return;
    }
    isStepDataDirty = false;
    window.location = enrollmentViaCAQHUrl;
};

window.onCAQHRedirectConfirmNo = function () {
    clearProviderTypeIdentifier();
    $(nextButtonId).hide();
};

function clearProviderTypeIdentifier() {
    $("#NewEnrollmentTypeIdentifier_EnrollmentTypeList").data("kendoDropDownList").select(-1);
    clrKendoDropdownList('NewEnrollmentTypeIdentifier_ProviderTypeList');
}

function toggleNewEnrollmentTypeIdentifiers() {
    if ($('input[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]:radio:checked').val() != undefined && $('input:radio[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]')[0].checked === true) {
        $('#divEnrollmentEvaluation').hide();
        setFieldAsNotRequired(newEnrollmentTypeIdentifierEnrollmentTypeListId, "NewEnrollmentTypeIdentifier_EnrollmentType");
        setFieldAsNotRequired(newEnrollmentTypeIdentifierProviderTypeListId, "NewEnrollmentTypeIdentifier_ProviderType");
    }
    else {
        $('#divEnrollmentEvaluation').show();
        setFieldAsRequired(newEnrollmentTypeIdentifierEnrollmentTypeListId, "NewEnrollmentTypeIdentifier_EnrollmentType");
        setFieldAsRequired(newEnrollmentTypeIdentifierProviderTypeListId, "NewEnrollmentTypeIdentifier_ProviderType");
        if (editorStep === 1) {
            $(nextButtonId).hide();
        }
    }
}

function setDataSourceForPrechecklistProviderTypeDropDown(dropDownId, data) {
    clrKendoDropdownList(dropDownId);
    var dataSource = new kendo.data.DataSource({ data: data });
    prechecklistProviderTypeDDLData.setDataSource(dataSource);
}

$('input[type=radio][name="EnrollmentPreChecklist.TaxIdTypes.ID"]').change(function () {
    clearSummaryErrors();
    togglePrechecklistGenerateButton();
});

$('input[type=radio][name="EnrollmentPreChecklist.IsMedicareEnrolled.ID"]').change(function () {
    clearSummaryErrors();
    togglePrechecklistGenerateButton();
});

$("#EnrollmentPreChecklist_SpecialtyList").change(function () {
    clearSummaryErrors();
    togglePrechecklistGenerateButton();
});

$("#EnrollmentPreChecklist_ProgramTypeList").change(function () {
    clearSummaryErrors();
    togglePrechecklistGenerateButton();
});

function prechecklistProviderTypeChange() {
    resetEnrollmentPrechecklistProgramTypeDropdown();
    $("#EnrollmentPreChecklist_ProgramType_ID").val("");
    $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").value("");
    clearSummaryErrors();
    var providerTypeDropDown = $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").value();
    var enrollmentType = $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").value();
    clrKendoDropdownList("EnrollmentPreChecklist_SpecialtyList");

    // Ensure the Specialty dropdown clears and immediately reflects that new data will be loaded
    var specialtyDropDown = $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList");
    if (specialtyDropDown) {
        specialtyDropDown.value("");
        specialtyDropDown.text(specialtyDropDown.options && specialtyDropDown.options.optionLabel ? specialtyDropDown.options.optionLabel : "");
        specialtyDropDown.enable(false);
        specialtyDropDown.trigger("change");
    }

    $("#divPrechecklistProgramType").show();
    setFieldAsRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
    $('[id*=EnrollmentPreChecklist_ProgramType]').resetValidation();

    if (providerTypeDropDown !== "") {
        let providerTypeParm = { providerType: providerTypeDropDown, applicationType: $("#ApplicationType").val(), enrollmentType: enrollmentType };
        let specialtyParm = { enrollmentType: enrollmentType, providerTypeDropDown: providerTypeDropDown, isPrechecklist: true };
        makeAsyncWebApiCall(riskTypeWebApiUrl, "POST", JSON.stringify(providerTypeParm), "application/json", "providerTypesAttributesSuccess");
        makeAsyncWebApiCall(loadSpecialityWebApiUrl, "POST", JSON.stringify(specialtyParm), "application/json", "specialtyDataReceiveSuccess");
    }
    else {
        $("#EnrollmentPreChecklist_ProgramType_ID").val("");
    }
    togglePrechecklistGenerateButton();
}

function providerTypesAttributesSuccess(result) {
    getProviderTypeAttribute(result.Data);

    if (enableRequireCAQHEnrollmentForProviderType) {
        let attrs = null;
        if (result && result.Data) {
            attrs = result.Data.ProviderTypeDataListAttributes;
        }

        isCAQHEnrollmentRequired = (attrs && attrs.length > 0)
            ? getProviderTypeAttributesValuesByAttributeName(attrs, 'AllowOnlyCAQHEnrollment')
            : 'false';
    }
}

function getProviderTypeAttribute(listAttributes) {
    var providerTypeAttributeValue = '';
    if (listAttributes !== null) {
        providerTypeAttributeValue = getProviderTypeAttributesValue(listAttributes);

        if (listAttributes.EnrollmentTypeEnrollmentAllowed !== null && listAttributes.EnrollmentTypeEnrollmentAllowed !== undefined && listAttributes.EnrollmentTypeEnrollmentAllowed.trim() !== "") {
            providerTypeAttributeValue = listAttributes.EnrollmentTypeEnrollmentAllowed.trim();
        }

        enrollmentAllowedAttributeValue = providerTypeAttributeValue;
        showHideProgramTypeBasedOnProviderType(providerTypeAttributeValue, listAttributes);
    }
}

function getProviderTypeAttributesValue(listAttributes) {
    var providerTypeAttributeValue = null;
    if (listAttributes.ProviderTypeDataListAttributes !== null && listAttributes.ProviderTypeDataListAttributes.length > 0) {
        for (i = 0; i < listAttributes.ProviderTypeDataListAttributes.length; i++) {
            if (listAttributes.ProviderTypeDataListAttributes[i] !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName !== null
                && listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeName === "EnrollmentAllowed") {
                providerTypeAttributeValue = listAttributes.ProviderTypeDataListAttributes[i].DataListAttributeValue;
                break;
            }
        }
    }
    return providerTypeAttributeValue;
}

function showHideProgramTypeBasedOnProviderType(providerTypeAttributeValue, listAttributes) {
    var enrollmentPreChecklistProgramTypeList = "#EnrollmentPreChecklist_ProgramTypeList";
    if (isMCO.toLowerCase() === "true") {
        var param = null;
        if (prechecklistProviderTypeDDLData.value() === "") {
            param = { providerType: $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").value() };
        }
        else {
            param = { providerType: prechecklistProviderTypeDDLData.value() };
        }

        if (providerTypeAttributeValue !== "" && providerTypeAttributeValue !== null) {
            if (providerTypeAttributeValue.toLowerCase() === customSingle.toLowerCase()) {
                let customSingleParam = param;
                if (listAttributes !== null && listAttributes !== undefined && listAttributes.EnrollmentTypeEnrollmentAllowed !== null && listAttributes.EnrollmentTypeEnrollmentAllowed !== undefined && listAttributes.EnrollmentTypeEnrollmentAllowed.trim().toLowerCase() === customSingle.toLowerCase()) {
                    let enrollmentTypeVal = $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").value();
                    let providerTypeVal = prechecklistProviderTypeDDLData.value() === '' ? $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").value() : prechecklistProviderTypeDDLData.value();
                    customSingleParam = { providerType: providerTypeVal, enrollmentType: enrollmentTypeVal };
                }
                let programTypesResult = makeSyncWebApiCall(programTypeWebApiUrl, "POST", JSON.stringify(customSingleParam), "application/json");
                overridePrechecklistProgramTypes(programTypesResult);
                setFieldAsRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
                $("#divPrechecklistProgramType").show();
            }
            else if (providerTypeAttributeValue.toLowerCase() === "custommultiple") {
                $("#divPrechecklistProgramType").hide();
                setFieldAsNotRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
                $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").setDataSource(new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes }));
                $("#EnrollmentPreChecklist_ProgramType_ID").val(FFSMCO);
                $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value(FFSMCO);
                $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").text("FFS and MCO");
            }
            else if (providerTypeAttributeValue.toLowerCase() === "yesallprogramtypes") {
                loadDropdownForPrechecklistYesAllProgramTypes(listAttributes);
            }
            else if (providerTypeAttributeValue.toLowerCase() === "yesffsonly") {
                $("#divPrechecklistProgramType").show();
                var dataSource = new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes });
                $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").setDataSource(dataSource);
                loadDropDownForPrechecklistFFSOnlyProgramType();
            }
            else if (providerTypeAttributeValue.toLowerCase() === "mcoonly") {
                $("#divPrechecklistProgramType").show();
                var mcoDataSource = new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes });
                $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").setDataSource(mcoDataSource);
                loadDropDownForPrechecklistMCOOnlyProgramType();
            }
        }
        else {
            loadDropdownForPrechecklistYesAllProgramTypes(listAttributes);
        }
    }
    else {
        $("#divPrechecklistProgramType").hide();
        setFieldAsNotRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
    }
}

function loadDropdownForPrechecklistYesAllProgramTypes(listAttributes) {
    $("#divPrechecklistProgramType").show();
    loadDropDownForPrechecklistAllProgramTypes(listAttributes);
    setFieldAsRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
}

function overridePrechecklistProgramTypes(programTypesResult) {
    var enrollmentPreChecklistProgramTypeList = "#EnrollmentPreChecklist_ProgramTypeList";
    var programTypeArray = [];
    var customSingleProgramTypes = [];
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

        $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").setDataSource(programTypeArray);
    }
}

function loadDropDownForPrechecklistAllProgramTypes(listAttributes) {
    $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").readonly(false);
    if ($("#EnrollmentPreChecklist_ProgramType_ID").val() === null || $("#EnrollmentPreChecklist_ProgramType_ID").val() === "") {
        clrKendoDropdownList("EnrollmentPreChecklist_ProgramTypeList");
    }
    var dataSource = new kendo.data.DataSource({ data: listAttributes.ProviderTypeListItemAttributes });
    $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").setDataSource(dataSource);
    if ($("#EnrollmentPreChecklist_ProgramType_ID").val() !== null || $("#EnrollmentPreChecklist_ProgramType_ID").val() !== "") {
        $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").value($("#EnrollmentPreChecklist_ProgramType_ID").val());
    }
    configureReadOnlyDropDownListWidgets();
}

function loadDropDownForPrechecklistFFSOnlyProgramType() {
    var programTypeDDLData = $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList");
    $("#EnrollmentPreChecklist_ProgramType_ID").val(FFSOnly);
    programTypeDDLData.value(FFSOnly);
    programTypeDDLData.readonly();
    configureReadOnlyDropDownListWidgets();
}

function loadDropDownForPrechecklistMCOOnlyProgramType() {
    var programTypeDDLData = $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList");
    $("#EnrollmentPreChecklist_ProgramType_ID").val(MCOOnly);
    programTypeDDLData.value(MCOOnly);
    programTypeDDLData.readonly();
    configureReadOnlyDropDownListWidgets();
}

function resetEnrollmentPrechecklistProgramTypeDropdown() {
    var enrollmentPreChecklistProgramTypeList = "#EnrollmentPreChecklist_ProgramTypeList";
    clrKendoDropdownList(enrollmentPreChecklistProgramTypeListId);
    $(enrollmentPreChecklistProgramTypeList).closest('div.editor-field').find('span.k-dropdown-wrap.k-state-default').find('span.k-input').removeAttr('title');
    $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").readonly(false);
    if (isMCO.toLowerCase() === "true") {
        $("#divPrechecklistProgramType").show();
        setFieldAsRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
    } else {
        $("#divPrechecklistProgramType").hide();
        setFieldAsNotRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
    }

    configureReadOnlyDropDownListWidgets();
}

function providerTypeDataReceiveSuccess(result) {
    setDataSourceForPrechecklistProviderTypeDropDown(enrollmentPreChecklistProviderTypeListId, result.Data);
}

function specialtyDataReceiveSuccess(result) {
    var specialtyListds = [];
    specialtyAttributeList = [];
    if (result.Data !== null && result.Data.LocaleDataListItems.length > 0) {
        for (var i = 0; i < result.Data.LocaleDataListItems.length; i++) {
            specialtyListds.push({
                FormattedText: result.Data.LocaleDataListItems[i].Value + '-' + result.Data.LocaleDataListItems[i].Text,
                ID: result.Data.LocaleDataListItems[i].Value
            });
            for (var j = 0; j < result.Data.LocaleDataListItems[i].AttributeValues.length; j++) {
                if (result.Data.LocaleDataListItems[i].AttributeValues[j] !== null
                    && result.Data.LocaleDataListItems[i].AttributeValues[j].DataListAttributeName !== null
                    && result.Data.LocaleDataListItems[i].AttributeValues[j].DataListAttributeName === "EnrollmentAllowed") {
                    specialtyAttributeList.push({
                        ID: result.Data.LocaleDataListItems[i].Value,
                        DataListAttributeName: result.Data.LocaleDataListItems[i].AttributeValues[j].DataListAttributeName,
                        DataListAttributeValue: result.Data.LocaleDataListItems[i].AttributeValues[j].DataListAttributeValue
                    });
                    break;
                }
            }
        }
        var dataSource = new kendo.data.DataSource({ data: specialtyListds });
        $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").setDataSource(dataSource);

        // Force the widget to re-render its option label/value immediately after binding
        var specialtyDropDown = $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList");
        if (specialtyDropDown) {
            specialtyDropDown.select(0);
            specialtyDropDown.value("");
            specialtyDropDown.enable(true);
        }
    }
    else {
        $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").select(-1);
        $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").enable(true);
    }
}

function validateSpecialtyAttribute() {
    var enrollmentPreChecklistProgramTypeList = "#EnrollmentPreChecklist_ProgramTypeList";
    var returnVal = true;
    for (var j = 0; j < specialtyAttributeList.length; j++) {
        if ($("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").value() === specialtyAttributeList[j].ID && specialtyAttributeList[j].DataListAttributeName.toLowerCase() === "enrollmentallowed") {
            switch (specialtyAttributeList[j].DataListAttributeValue.toLowerCase()) {
                case "mcoonly":
                    if ($(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "ffsonly"
                        || $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "sfcffs"
                        || $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "sfcffsmco"
                        || $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "ffsmco") {
                        displaySummaryErrors(specialtyInvalidForFFS);
                        returnVal = false;
                    }
                    break;
                case "yesffsonly":
                    if ($(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "mcoonly"
                        || $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "mcoenhonly"
                        || $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "sfcffsmco"
                        || $(enrollmentPreChecklistProgramTypeList).data("kendoDropDownList").value().toLowerCase() === "ffsmco") {
                        displaySummaryErrors(specialtyInvalidForMCO);
                        returnVal = false;
                    }
                    break;
                case "no":
                    displaySummaryErrors(specialtyInvalidNo);
                    returnVal = false;
                    break;
                default:
                    returnVal = true;
                    break;
            }
        }
    }
    return returnVal;
}

function ProviderReferenceTextCounter(fieldID) {
    var name = '#textCounter';
    var maxLength = 100;

    if ($(name).length == 0) {
        $(fieldID).closest('div').parent().append("<div id='textCounter' style='font-size:12px; margin-top:9px; float:right;'></div>");
    }

    $(fieldID).keyup(function () {
        var length = $(this).val().length;
        length = maxLength - length;
        $(name).text("Maximum " + length + " char");
    });
}

function editorInitStepPreprocess() {
    var cancel = false;
    return cancel;
}

function editorInitStepPostprocess() {
    initializeWizardControls();
}

function initializeWizardControls() {
    var trackingNumber = $("#TrackingNumber");
    var providerRef = $("#EnrollmentCreateCredentials_ProviderReference");
    var enrollmentTypeList = $("#EnrollmentCriteria_EnrollmentTypeList");

    $(cancelButtonId).show();
    $(nextButtonId).addClass("primary-button");
    if ($("#toc").is(':hidden') && enrollmentTypeList.data("kendoDropDownList").value() !== "") {
        makeAsyncWebApiCall(enrollmentStepsWebApiUrl, "POST", JSON.stringify(enrollmentTypeList.data("kendoDropDownList").value()), "application/json", "processEnrollmentStepsSuccess");
    }

    if (editorStep > 3 && enrollmentTypeList.data("kendoDropDownList").value() !== "") {
        var enrollmentTypeDropDown = enrollmentTypeList.data("kendoDropDownList");
        enrollmentTypeDropDown.readonly(true);

        var providerTypeDropDown = $("#EnrollmentCriteria_ProviderTypeList").data("kendoDropDownList");
        if (providerTypeDropDown.value() !== "") {
            providerTypeDropDown.readonly(true);
        }
        configureReadOnlyControls();
    }

    if (editorStep > 2 && tocLoaded) {
        ChangePageTitleAndNumber(editorStep);
    }
    switch (editorStep) {
        case 1: //Welcome
            url = welcomeUrl;
            $("#toc").hide();
            $("li[id='MCBMenu.PrintPreview']").hide();
            $("#mcbMenu").hide();
            $(cancelButtonId).hide();
            $(prevButtonId).hide();
            $(nextButtonId).prop('value', buttonStartText);
            $("#divPageHelpBody").text("").append(welcomeHelp);
            setHelpIconUrl("ProviderEnrollment.Welcome");
            $(nextButtonId).addClass("primary-button");
            break;

        case 2: //Register
            url = registrationUrl;
            $("#toc").hide();
            $(cancelButtonId).hide();
            $("li[id='MCBMenu.PrintPreview']").hide();
            $("#mcbMenu").hide();
            if (trackingNumber.val().length == 0) {
                trackingNumber.parent().parent().hide();
                if (!isSecure && isEnableMultiFactorAuthentication) {
                    $(nextButtonId).prop('value', buttonGenerateAuthenticationCode);
                }
                else {
                    $(nextButtonId).prop('value', buttonRegisterText);
                }
            }
            else {
                trackingNumber.parent().parent().show();
                $(nextButtonId).prop('value', buttonContinueSaveText);
            }
            $("#divPageHelpBody").text("").append(registrationHelp);
            setHelpIconUrl("ProviderEnrollment.EnrollmentRegistration");
            break;

        case 3: //General Page
            handlePreviousStepNavigation(editorStep);
            $(nextButtonId).show();
            $("#activeScreen.float-left").text(generalInformation);
            url = enrollmentCreateUrl;
            $("#mcbMenu").show();
            $("li[id='MCBMenu.ReturnToProvider']").hide();
            $("li[id='MCBMenu.PrintPreview']").show();
            $("ul#mcbMenu li:nth-child(10)").hide();
            document.getElementById('trackingNumber').innerHTML = trackingNumber.val();
            document.getElementById('providerReference').innerHTML = providerRef.val();

            checkCurrentEnrollment();
            checkPreviousEnrollment();
            checkProviderTypeFields();
            displayIndividualIdentification(enrollmentTypeList.data("kendoDropDownList").value());
            if (enrollmentTypeList.data("kendoDropDownList").value() === "") {
                $("#toc").show();
            }
            $("#divPageHelpBody").text("").append(enrollmentCreate);
            setHelpIconUrl("ProviderEnrollment.EnrollmentCreate");
            $("#msgButtonRow input[type=button]").focus();
            break;
    }
}

function setHelpIconUrl(helpContentKey) {
    $('#mcbHelpIcon').children().removeAttr("onclick").attr('onclick', 'displayPageLevelHelp("' + helpContentKey + '")');
}

function clearSSNEINbasedonTaxidtype() {
    var TaxIdType = $("#Provider_TaxIdentification_TaxIdType").val();
    if (TaxIdType === EIN) {
        $("#Provider_TaxIdentification_SSN").val("");
    }
    else {
        $("#Provider_TaxIdentification_TaxId").val("");
    }
}

function editorNextPostprocess() {
    if ($("span[id='Provider.TaxIdentification.SSN_validationMessage']").is(":visible")) {
        $(taxIdentificationSSN).addClass("k-invalid");
    }
    if ($("span[id='Provider.TaxIdentification.TaxId_validationMessage']").is(":visible")) {
        $(taxIdentificationTaxId).addClass("k-invalid");
    }
    if ($(providerTaxIdentificationSSNRawVal).val() !== undefined && $(providerTaxIdentificationSSNRawVal).val() !== "") {
        $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
    }
    if ($(providerTaxIdentificationTaxIdRawVal).val() !== undefined && $(providerTaxIdentificationTaxIdRawVal).val() !== "") {
        $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
    }
}

function editorNextPreprocess() {
    if (editorStep === 1) {
        setFieldAsNotRequired(enrollmentPreChecklistEnrollmentTypeListId, enrollmentPreChecklistEnrollmentTypeListId);
        setFieldAsNotRequired(enrollmentPreChecklistProviderTypeListId, enrollmentPreChecklistProviderTypeListId);
        setFieldAsNotRequired("EnrollmentPreChecklist_SpecialtyList", "EnrollmentPreChecklist_SpecialtyList");
        setFieldAsNotRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramTypeListId);
    }
    if ($(providerTaxIdentificationSSNRawVal).val() !== undefined && $(providerTaxIdentificationSSNRawVal).val() !== "") {
        $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
    }
    if ($(providerTaxIdentificationTaxIdRawVal).val() !== undefined && $(providerTaxIdentificationTaxIdRawVal).val() !== "") {
        $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
    }
}

function acceptChowEnrollment() {
    incrementEditor();
}

function onNoStayInWelcome() {
    cancel = true;
}

function displaySummaryErrors(errorMessage) {
    var errors = new Array();
    errors.push(errorMessage);
    showSummaryErrors(errors);
    var errorText = $(".validation-summary", window.opener).html();
    if (errorText !== "") {
        errorText = errorText.replace("<i", "<div class='alert alert-danger alert-dismissable k-form-error' role='alert'> <i");
        errorText = errorText.replace("data-hide", "data-dismiss");
        errorText = errorText.replace("</ul>", "</ul> </div>");
        $("div[id=validationSummary_child]").html(errorText).show();
        $(".validation-summary").hide();
    }
    else if (errorText === "") {
        $(".validation-summary", window.opener).show();
        $("div[id=validationSummary_child]").hide();
    }
}

function clearSummaryErrors() {
    $("div[id=validationSummary_child]").empty();
    $("div[id=validationSummary_child]").hide();
}

function validatePrechecklistData(element) {
    var taxIdType = $('input[name="EnrollmentPreChecklist.TaxIdTypes.ID"]:checked').val();
    var isMedicareEnrolled = $('input[name="EnrollmentPreChecklist.IsMedicareEnrolled.ID"]:checked').val();

    setFieldAsRequired(enrollmentPreChecklistEnrollmentTypeListId, "EnrollmentPreChecklist_EnrollmentType");
    setFieldAsRequired(enrollmentPreChecklistProviderTypeListId, "EnrollmentPreChecklist_ProviderType");
    setFieldAsRequired("EnrollmentPreChecklist_SpecialtyList", "EnrollmentPreChecklist_Specialty");

    if (isMCO.toLowerCase() === "false") {
        $("#divPrechecklistProgramType").hide();
        $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").value(ffsOnly);
        $("#EnrollmentPreChecklist_ProgramType_ID").val(FFSOnly);
        setFieldAsNotRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramTypeListId);
    }
    else if (enrollmentAllowedAttributeValue !== undefined && enrollmentAllowedAttributeValue !== null && enrollmentAllowedAttributeValue.toLowerCase() === "custommultiple") {
        setFieldAsNotRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);

    }
    else {
        setFieldAsRequired(enrollmentPreChecklistProgramTypeListId, enrollmentPreChecklistProgramType);
    }

    // Temporarily disable validation on fields outside the prechecklist (e.g., step 3 General Information fields)
    $("#CreateEnrollmentForm").find("[data-val-required]").each(function () {
        var $field = $(this);
        // Only disable fields that are NOT part of the prechecklist
        if (!$field.attr('id') || !$field.attr('id').startsWith('EnrollmentPreChecklist_')) {
            $field.attr("data-val-required-temp", $field.attr("data-val-required"));
            $field.removeAttr("data-val-required");
        }
    });

    var isValid = prechecklistDataValidator.validate();

    // Re-enable validation on those fields
    $("#CreateEnrollmentForm").find("[data-val-required-temp]").each(function () {
        var $field = $(this);
        $field.attr("data-val-required", $field.attr("data-val-required-temp"));
        $field.removeAttr("data-val-required-temp");
    });

    if (typeof taxIdType == "undefined") {
        setKendoValidatorFieldMessage($('[id*=EnrollmentPreChecklist_TaxIdTypes]'), taxIdTypeRequired);
        isValid = false;
    }
    else {
        $('[id*=EnrollmentPreChecklist_TaxIdTypes]').resetValidation();
        $(".editor-field").find(".assoc-box-radio-btn-list-horz").removeClass("k-invalid");
    }
    if (typeof (isMedicareEnrolled) === "undefined") {
        setKendoValidatorFieldMessage($('[id*=EnrollmentPreChecklist_IsMedicareEnrolled]'), isMedicareEnrolledRequired);
        isValid = false;
    }
    else {
        $('[id*=EnrollmentPreChecklist_IsMedicareEnrolled]').resetValidation();
        $(".editor-field").find(".assoc-box-radio-btn-list-horz").removeClass("k-invalid");
    }

    if (isValid) {
        isValid = validateSpecialtyAttribute();
    }

    if (isValid) {
        getPrechecklistRules(element);
    }
    return isValid;
}

function editorNextPostValidate() {
    var cancel = false;
    var isChowEnrollment = $("#IsChowEnrollment").val();
    var enrollmentType = $("#EnrollmentCriteria_EnrollmentTypeList").val();
    if (enrollmentType !== "") {
        cancel = SaveAndContinue(cancel);
    }
    else {
        switch (editorStep) {
            case 1: // Welcome
                if (isChowEnrollment !== undefined && isChowEnrollment !== null && isChowEnrollment.toLowerCase() === 'true') {
                    cancel = true;
                    displayPopupOKCancelDialog(messageTypeQuestion, chowConfirmTitle, chowSuccess, globalYes, "acceptChowEnrollment", globalNo, "onNoStayInWelcome");
                }
                break;
            case 2: // Registration
                if ($("#TrackingNumber").val().length === 0) {
                    if (!isSecure && isEnableMultiFactorAuthentication) {
                        openModalOverlay(multifactorAuthenticationFormId, multiFactorAuthenticationMvcUrl, 'panelForm-col-3', null, { emailId: $("#EnrollmentCreateCredentials_EmailAddress").val() });
                    }
                    else {
                        processEnrollmentRegistration();
                    }
                    cancel = true;
                }
                else {
                    processSaveApplication();
                    cancel = true;
                }
        }

    }
    return cancel;
}

function clearWelcomePage() {
    resetPrechecklistForm();
    $(createEnrollmentFormId).resetAllValidations();
    $(".editor-field").find(".assoc-box-radio-btn-list-horz").removeClass("k-invalid");
    clearSummaryErrors();
    $("#prechecklistGenerateButton").hide();
}

function getPrechecklistRules(element) {
    var enrollmentTypeDropDownValue = $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").value();
    var enrollmentTypeDropDownName = $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").text();
    var providerTypeDropDownValue = $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").value();
    var providerTypeDropDownName = $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").text();
    var specialtyDropDownValue = $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").value();
    var specialtyDropDownName = $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").text();
    var programTypeDropDownValue = $('#EnrollmentPreChecklist_ProgramType_ID').val();
    var programTypeDropDownName = $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").text();
    var taxIdType = $('input[name="EnrollmentPreChecklist.TaxIdTypes.ID"]:checked').val();
    var isMedicareEnrolled = $('input[name="EnrollmentPreChecklist.IsMedicareEnrolled.ID"]:checked').val();

    if (enrollmentTypeDropDownValue !== "" || providerTypeDropDownValue !== "" || specialtyDropDownValue !== "" || typeof (taxIdType) !== "undefined" || typeof (isMedicareEnrolled) !== "undefined" || programTypeDropDownValue !== "") {
        var param = {
            "EnrollmentTypeId": enrollmentTypeDropDownValue,
            "EnrollmentTypeName": enrollmentTypeDropDownName,
            "ProviderTypeId": providerTypeDropDownValue,
            "ProviderTypeName": providerTypeDropDownName,
            "SpecialtyId": specialtyDropDownValue,
            "SpecialtyName": specialtyDropDownName,
            "TaxIdType": taxIdType,
            "IsMedicareEnrolled": isMedicareEnrolled,
            "ProgramTypeId": programTypeDropDownValue,
            "ProgramTypeName": programTypeDropDownName,
            "EnrollmentAllowed": enrollmentAllowedAttributeValue,
            "IsCAQHEnrollmentRequired": isCAQHEnrollmentRequired
        };
    }
    var strWindowFeatures = "toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=400,visible=yes";
    window.open(generatePrechecklistRulesMVCUrl.split("?")[0] + '?data=' + JSON.stringify(param), "_blank", strWindowFeatures, '');
    hideLoadingDialog();
}

function stayInGeneralPage(e) {
    e.stopImmediatePropagation();
    $(window).scrollTop(0);
}

function SaveAndContinue(isCancel) {
    var enrollmentType = $("#EnrollmentCriteria_EnrollmentTypeList").val();

    var riskLevelId = "#RiskLevel";
    var isMedicareEnrolledID = "input[name='Provider.IsMedicareEnrolled.ID']:radio";

    if ($(programType).val() === 'FFSonly') {
        let retrievedPrograms = [];
        if (ProgramParticipationDetailRes !== undefined && ProgramParticipationDetailRes.length > 0) {
            for (const element of ProgramParticipationDetailRes) {
                retrievedPrograms.push(element.Id);
            }
            var mcoProgramsMultiSelect = $(mcoPrograms).data('kendoMultiSelect');
            if (mcoProgramsMultiSelect) {
                mcoProgramsMultiSelect.value(retrievedPrograms);
            }
        }
    }

    switch (editorStep) {

        case 2:
            processSaveApplication();
            isCancel = true;
            break;
        case 3: //General Page
            validateEmailInRevalidation();
            var generalDetails = $("#general").kendoValidator({
                validateOnBlur: false,
                validate: function () {
                    focusFirstErrorElement("#general");
                }
            }).data("kendoValidator");
            if (isMCO.toLowerCase() === "true") {
                getSelectedPrograms();
            }
            updateStateMalpracticeCoverage();
            updateCustomMultipleProgramTypes();

            if (generalDetails.validate()) {
                if (enrollmentType === atypicalEnrollmentType) {
                    clearSSNEINbasedonTaxidtype();
                }

                if ($(applicantContactEmailAddress).val().trim() !== "" && $(isEmailInvalid).val().toLowerCase() !== "true" && previousContactEmail.toLowerCase().localeCompare($("#ApplicantContact_EmailAddress").val().toLowerCase()) !== 0 && $("#ApplicantContact_EmailAddress").val().toLowerCase().localeCompare($("#EnrollmentCreateCredentials_EmailAddress").val().toLowerCase()) !== 0) {
                    displayPopupOKCancelDialog(popupWarning, actionAlertTitle, RegistrationEmailGeneralPageConfirmationMessage, globalYes, "changeEmailYes", globalNo, "changeEmailNo");
                    editorStep--;
                }
                else if ($(enrollmentCriteriaEnrollmentTypeList).data("kendoDropDownList").value() !== "" && $(isMedicareEnrolledID)[1].checked === true && parseInt(medicareParticipationCount) > 0) {
                    displayPopupOKCancelDialog(popupWarning, actionAlertTitle, isMediCareEnrolledGeneralPageConfirmationMessage, globalYes, "medicareEnrolledYes", globalNo, "medicareEnrolledNo");
                    editorStep--;
                }
                else {
                    $(isNPPESDirtyDataAllowed).val(false);
                    $(isSSNVerificationAccepted).val(false);
                    $(isEINVerificationAccepted).val(false);
                    isRevalidatedEnrommentRemoveForEnrollType();
                    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
                    isRevalidatedEnrommentAddForEnrollType();
                    editorStep--;
                }
            }
            if ($(providerTaxIdentificationSSNRawVal).val() !== undefined && $(providerTaxIdentificationSSNRawVal).val() !== "") {
                $("#" + taxIdentificationSSNHidden).val($(providerTaxIdentificationSSNRawVal).val());
            }
            if ($(providerTaxIdentificationTaxIdRawVal).val() !== undefined && $(providerTaxIdentificationTaxIdRawVal).val() !== "") {
                $("#" + taxIdentificationTaxIdHidden).val($(providerTaxIdentificationTaxIdRawVal).val());
            }
            break;
    }
}

function medicareEnrolledYes() {
    isRevalidatedEnrommentRemoveForEnrollType();
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
    isRevalidatedEnrommentAddForEnrollType();
    editorStep--;
}

function changeEmailYes() {
    var isMedicareEnrolledID = "input[name='Provider.IsMedicareEnrolled.ID']:radio";

    $("#EnrollmentCreateCredentials_EmailAddress").val($("#ApplicantContact_EmailAddress").val());
    $("#EnrollmentCreateCredentials_EmailAddressConfirmation").val($("#ApplicantContact_EmailAddressConfirmation").val());
    if ($(enrollmentCriteriaEnrollmentTypeList).data("kendoDropDownList").value() !== "" && $(isMedicareEnrolledID)[1].checked === true && parseInt(medicareParticipationCount) > 0) {
        displayPopupOKCancelDialog(popupWarning, actionAlertTitle, isMediCareEnrolledGeneralPageConfirmationMessage, globalYes, "medicareEnrolledYes", globalNo, "medicareEnrolledNo");
        editorStep--;
    }
    else {
        $(isNPPESDirtyDataAllowed).val(false);
        $(isSSNVerificationAccepted).val(false);
        $(isEINVerificationAccepted).val(false);
        isRevalidatedEnrommentRemoveForEnrollType();
        makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
        isRevalidatedEnrommentAddForEnrollType();
        editorStep--;
    }
}

function changeEmailNo() {
    var isMedicareEnrolledID = "input[name='Provider.IsMedicareEnrolled.ID']:radio";

    if ($(enrollmentCriteriaEnrollmentTypeList).data("kendoDropDownList").value() !== "" && $(isMedicareEnrolledID)[1].checked === true && parseInt(medicareParticipationCount) > 0) {
        displayPopupOKCancelDialog(popupWarning, actionAlertTitle, isMediCareEnrolledGeneralPageConfirmationMessage, globalYes, "medicareEnrolledYes", globalNo, "medicareEnrolledNo");
        editorStep--;
    }
    else {
        isRevalidatedEnrommentRemoveForEnrollType();
        makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
        isRevalidatedEnrommentAddForEnrollType();
        editorStep--;
    }
}

function medicareEnrolledNo() {
    var isMedicareEnrolledID = "input[name='Provider.IsMedicareEnrolled.ID']:radio";

    $(isMedicareEnrolledID)[0].checked = true;
    isRevalidatedEnrommentRemoveForEnrollType();
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
    isRevalidatedEnrommentAddForEnrollType();
    editorStep--;
}

// IsChowRequired change function
$('input:radio[name="Provider.ChangeOfOwnership.IsSecurePortalChowRequired.ID"]').change(function () {
    var isSecurePortalChowRequired = $('input:radio[name="Provider.ChangeOfOwnership.IsSecurePortalChowRequired.ID"]');
    var isChowEnrollment = isSecurePortalChowRequired[1].checked === true ? "false" : isSecurePortalChowRequired[0].checked === true ? "true" : "false";
    $("#IsChowEnrollment").val(isChowEnrollment);
});

//---------------------------------------------
// Save application functions
//---------------------------------------------
function processSaveApplication() {
    NewEnrollment = false;
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
}

//---------------------------------------------
// Register application functions
//---------------------------------------------
function processEnrollmentRegistration() {
    let registrationdata = {
        EmailAddress: $("#EnrollmentCreateCredentials_EmailAddress").val(), EmailAddressConfirmation: $("#EnrollmentCreateCredentials_EmailAddressConfirmation").val(), IsChowEnrollment: $("#IsChowEnrollment").val(), Password: $("#EnrollmentCreateCredentials_Password").val(), PasswordConfirmation: $("#EnrollmentCreateCredentials_PasswordConfirmation").val(), IsCreatedFromInternalPortal: $("#IsCreatedFromInternalPortal").val(), ProviderReference: $("#EnrollmentCreateCredentials_ProviderReference").val()
    };
    makeAsyncWebApiCall(registerWebApiUrl, "POST", registrationdata, "application/x-www-form-urlencoded", "processEnrollmentRegistrationSuccess", "processEnrollmentRegistrationFailure");
}

function processEnrollmentRegistrationSuccess(result) {
    var emailAddress = $("#EnrollmentCreateCredentials_EmailAddress").val();
    var trackingNumber = $("#TrackingNumber");
    var applicationId = $("#EnrollmentApplicationId");
    var isChowEnrollment = $("#IsChowEnrollment").val();
    if (result.IsValid) {
        applicationId.val(result.Data.EnrollmentApplicationId);
        trackingNumber.val(result.Data.TrackingNumber);
        $("#EnrollmentCreateCredentials_ProviderReference").val(result.Data.ProviderReference);
        var title = registerConfirmTitle;
        var msg;
        if (result.Data.IsNotificationSent) {
            msg = registerConfirmMsg.replace("{0}", result.Data.TrackingNumber).replace("{1}", getMaskedEmailId(emailAddress));
        }
        else {
            msg = registerConfirmEmailNotSent.replace("{0}", result.Data.TrackingNumber);
        }

        if (isChowEnrollment !== "undefined" && isChowEnrollment !== null && isChowEnrollment.toLowerCase() === 'true' && result.Data.Status.ID === enrollmentStatusStarted) {
            enrollmentApplicationId = result.Data.EnrollmentApplicationId;
            displayPopupDialogActionable("Info", title, msg, "OkChowEnrollmentSuccessClick");
        }
        else {
            displayPopupDialog("Info", title, msg);
            incrementEditor();
            NewEnrollment = true;
        }
    }
}

function OkChowEnrollmentSuccessClick() {
    isStepDataDirty = false;
    showLoadingDialog();
    FormdDataPost(ChowActionMVCUrl, enrollmentApplicationId);
}

$("#prevButton").click(function (e) {
    if (editorStep > 2) {
        PreviousButtonDirtyDataCheck(homeEnrollmentMvcUrl);
    }
    else {
        e.stopImmediatePropagation();
        PreviousButtonDirtyDataCheck(createEnrollmentMvcUrl, '');
    }
});


function processGeneralInformationLoad(html) {
    $("#general").empty();
    $("#general").append(html.Data);

    //Load Provider Types
    if (!providerTypeLoaded) {
        onEnrollmentTypeSelect();
    }
    var taxIDType = $("#Provider_TaxIdentification_TaxIdType").val();
    if (taxIDType === EIN) {
        $("#Provider_TaxIdentification_SSN").val("");
    }
    else if (taxIDType === SSN) {
        $("#Provider_TaxIdentification_TaxId").val("");
    }
    checkCurrentEnrollment();
    checkPreviousEnrollment();
    checkProviderTypeFields();
    displayIndividualIdentification(enrollmentTypeList.data("kendoDropDownList").value());

}
function processSaveApplicationFailure(result) {
    if (result === "ProgramTypeWarningMessage") {
        displayPopupDialog("Info", "Program Type", programTypeWarningMessage);
        isTocButtonClicked = false;
        hideSummaryErrors();
        isStepDataDirty = true;
    }
    else {
        var providerCurrentLegacyProviderIdentifier = "#Provider_CurrentLegacyProviderIdentifier";
        var check = false;
        var trackingNumber;
        isStepDataDirty = true;
        if (result[0] !== undefined) {
            if (result[0].indexOf(DuplicateSubmitFound) === 0) {
                isStepDataDirty = false;
                trackingNumber = result[0].replace(DuplicateSubmitFound, "");
                hideSummaryErrors();
                displayPopupDialog("Info", "Alert !", invalidStatus.replace("{0}", trackingNumber));
                submitFlag = true;
                check = true;
            }
            else if (result[0] === duplicateAtnFound) {
                hideSummaryErrors();
                displayPopupOKCancelDialog(popupWarning, duplicateAtnHeader, duplicateAtnErrorMessage.replace("{0}", result[1]), globalYes, "closeAndSetDuplicateFlagTrueSave", globalNo, "CloseAndSetDuplicateFlagFalse");
            }
            else if (result[0] === duplicateActiveProviderLocationFound) {
                hideSummaryErrors();
                if ($("#EnrollmentCriteria_EnrollmentType_ID").val() === individualGroupEnrollmentType) {
                    displayPopupOKCancelDialog(popupWarning, duplicateAtnHeader, associatedExistsForIorIGWarningMessage, globalYes, "closeAndSetDuplicateFlagTrueSave", globalNo, "CloseAndSetDuplicateFlagFalse");
                }
                else {
                    displayPopupOKCancelDialog(popupWarning, duplicateAtnHeader, duplicateAtnErrorMessageApprove, globalYes, "closeAndSetDuplicateFlagTrueSave", globalNo, "CloseAndSetDuplicateFlagFalse");
                }
                $("#Provider_PossibleDuplicateProviderLocationId").val(result[1]);
            }
            else if (result[0] === duplicateActiveChowProviderLocationFound) {
                hideSummaryErrors();
                displayPopupOKCancelDialog(popupWarning, duplicateAtnHeader, duplicateAtnErrorMessageChowProviderLocation, globalYes, "closeAndSetDuplicateFlagTrueSave", globalNo, "CloseAndSetDuplicateFlagFalse");
                $("#Provider_PossibleDuplicateProviderLocationId").val(result[1]);
            }
            else if (result[0] === raIndicatorUpdate) {
                hideSummaryErrors();
                displayPopupOKCancelDialog(popupWarning, actionAlertTitle, printIndicatorChangeGeneralPageConfirmation, globalYes, "closeAndUpdateRAIndicator", globalNo, "closeAndSetOldRAIndicatorSave");
            }
            else if (result[0] === raIndicatorClear) {
                hideSummaryErrors();
                displayPopupOKCancelDialog(popupWarning, actionAlertTitle, printIndicatorChangeGeneralPageConfirmation, globalYes, "closeAndUpdateRAIndicator", globalNo, "closeAndClearNpiINoSave");
            }
            else if (result[0] === isActiveErrorMessage) {
                $(".validation-errors").hide();
                setKendoValidatorFieldMessageForProviderID($(providerCurrentLegacyProviderIdentifier), result);
            }
            else if (result[0] === specialtyInvalid && ($(applicationType).val() === newEnrollmentType || ($(applicationType).val() === reenrollment && allowReenrollmentRequest.toLowerCase() === "false"))) {
                hideSummaryErrors();
                displayPopupOKCancelDialog(popupWarning, limitSpecialtyHeader, specialtyInvalidForGeneral, globalYes, "closeAndSetSpecialtyClearSave", globalNo, "closeAndSetSpecialtyNoSave");
            }
            else if (typeof result[0] === "string" && result[0].indexOf(screeningNPPESValidationErrorMsg) === 0)
            {
                hideSummaryErrors();
                displayPopupOKCancelDialog(popupWarning, screeningNPPESValidationPopUpTitle, screeningNPPESValidationErrorMsg, globalYes, "acceptNPPESDirtyData", globalNo, "allowNPPESDataCorrection");
            }
            else if (typeof result[0] === "string" && (result[0].indexOf(screeningIRSValidationErrorMsg) >= 0 || result[0].indexOf(screeningIRSValidationErrorMsgForReEnrollAndReval) >= 0))
            {
                hasIrsScreeningValidationError = true;
                var irsParts = result[0].split(":");
                irsTinValidationMatchCode = irsParts[0];
                irsTinType = irsParts[1]; // "SSN" or "EIN"
                hideSummaryErrors();
                var irsErrorMsg = (screeningIRSValidationErrorMsgForReEnrollAndReval && result[0].indexOf(screeningIRSValidationErrorMsgForReEnrollAndReval) >= 0)
                    ? screeningIRSValidationErrorMsgForReEnrollAndReval
                    : screeningIRSValidationErrorMsg;
                var formattedIrsErrorMsg = irsErrorMsg.replace(/\n/g, "<br/>");
                var htmlIrsMessage = "<div class='mg-group-text-align'>" + formattedIrsErrorMsg + "</div>";
                displayHtmlPopupOKCancelDialog(popupWarning, screeningIRSValidationPopUpTitle, htmlIrsMessage, globalYes, "acceptIrsTinVerificationResponse", globalNo, "allowGeneralPageIrsDataCorrection", false, null);
            }
            else {
                $(".validation-errors").show();
            }
        }
        if (!check) {
            $("#Provider_PreviousLegacyProviderIdentifier_validationMessage").addClass("display-block");
        }

        setPanelValidationIndicators();
        buildEnrollmentProgressPageError(result);
    }
}

function acceptNPPESDirtyData() {
    $(isNPPESDirtyDataAllowed).val(true);
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
}

function allowNPPESDataCorrection() {
    $(isNPPESDirtyDataAllowed).val(false);
}

function acceptIrsTinVerificationResponse() {
    if (irsTinType === "SSN") {
        $(isSSNVerificationAccepted).val(true);
        $(irsSSNValidationCode).val(irsTinValidationMatchCode);
    }
    if (irsTinType === "EIN") {
        $(isEINVerificationAccepted).val(true);
        $(irsEINValidationCode).val(irsTinValidationMatchCode);
    }
    hasIrsScreeningValidationError = false;
    isRevalidatedEnrommentRemoveForEnrollType();
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
    isRevalidatedEnrommentAddForEnrollType();
}

function allowGeneralPageIrsDataCorrection() {
    if (irsTinType === "SSN") {
        $(isSSNVerificationAccepted).val(false);
        $(irsSSNValidationCode).val(null);
    }
    if (irsTinType === "EIN") {
        $(isEINVerificationAccepted).val(false);
        $(irsEINValidationCode).val(null);
    }
    hasIrsScreeningValidationError = false;
}

closeAndSetDuplicateFlagTrueSave = function () {
    $("#IsDuplicateEnrollmentAllowed").val(true);
    $("#nextButton").click();
};

closeAndSetDuplicateFlagFalse = function () {
    $("#IsDuplicateEnrollmentAllowed").val(false);
};

closeAndSetSpecialtyClearSave = function () {
    $('#IsSpecialtyEnrollmentAllowed').val(true);
    $("#nextButton").click();
};

closeAndUpdateRAIndicator = function () {
    $('#RAIndicatorAdjustmentConfirmation').val(raAttributeToUpdate);
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
};

closeAndSetOldRAIndicatorSave = function () {
    $('#RAIndicatorAdjustmentConfirmation').val(raAttributeToRetain);
    makeAsyncWebApiCall(saveWebApiUrl, "PUT", $(createEnrollmentFormId).serialize(), "application/x-www-form-urlencoded", "processSaveApplicationSuccess", "processSaveApplicationFailure");
};

closeAndClearNpiINoSave = function () {
    var enrollType = $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value();
    $('#RAIndicatorAdjustmentConfirmation').val(raAttributeReCheck);
    if (enrollType !== "AT") {
        $(providerNationalProviderIdentifierVal).val("");
        $(providerNationalProviderIdentifierVal).focus().select();
    }
    else {
        clearTaxid();
    }
};

function clearTaxid() {
    var TaxIdType = $("#Provider_TaxIdentification_TaxIdType").val();
    if (TaxIdType === EIN) {
        $("#Provider_TaxIdentification_TaxId").val("");
        $("#Provider_TaxIdentification_TaxId").focus().select();
    }
    else {
        $("#Provider_TaxIdentification_SSNHidden").val("");
        $("#Provider_TaxIdentification_SSN").Focus().select();
    }
}

closeAndSetSpecialtyNoSave = function () {
    $('#IsSpecialtyEnrollmentAllowed').val(false);
    var preSelectedProgramtype = $('#ProgramType').val();
    $(programType).data("kendoDropDownList").value(preSelectedProgramtype);
    $('#Provider_ProgramTypeList').trigger('change');
    $('#Provider_ProgramType_ID').val(preSelectedProgramtype);
    if (isMCO.toLowerCase() === "true") {
        AssignProgramParticipation();
        displayProgramParticipation();
    }
};

function processSaveApplicationSuccess(result) {
    step = ++step;
    $("#IsDuplicateEnrollmentAllowed").val(false);
    if (result.IsValid) {
        isStepDataDirty = false;

        enrollmentStatus = result.Data.Status;
        enrollmentApplicationId = result.Data.EnrollmentApplicationId;
        isRegistrationEmailAddressUpdatedNotificationSent = result.Data.IsRegistrationEmailAddressUpdatedNotificationSent;
        if (result.Data.IsContactEmailAddressUpdatedNotificationSent === false) {
            displayPopupDialogActionable("Info", contactEmailAddressChangeNotificationTitle, contactEmailAddressUpdateNotificationNotSentMsg, "checkForRegistrationEmailNotification");
        }
        else {
            checkForRegistrationEmailNotification();
        }
    }
}

function checkForRegistrationEmailNotification() {
    if (isRegistrationEmailAddressUpdatedNotificationSent === false) {
        displayPopupDialogActionable("Info", registrationEmailAddressChangeNotificationTitle, registrationEmailAddressUpdateNotificationNotSentMsg, "enrollmentCreatePartialSuccess");
    }
    else {
        enrollmentCreatePartialSuccess();
    }
}

function enrollmentCreatePartialSuccess() {
    if (rtpFlag && $(isInternalPortalApp).val() === "True") {
        displayPopupDialogActionable("Info", rtpPopUpTitle, rtpToPartialmsg, "enrollmentCreatePartialSuccess");
        rtpFlag = false;
        return false;
    }

    if (enrollmentStatus !== null && enrollmentStatus.ID === enrollmentStatusStarted) {
        displayPopupDialogActionable("Info", reenrollmentPopUpTitle, reenrollmentPopUpMsg, "reenrollmentRedirect");
        return false;
    }

    if (isTocButtonClicked) {
        var enrollmentAttachmentAction = "/ProviderEnrollment/EnrollmentAttachment/";
        var feeAction = "/ProviderEnrollment/Fees/";
        var businessEntity = "Business";
        var individualEntity = "Individual";
        var isIndividualOrBusinessEntity = $('input:radio[name="Provider.IsIndividualOrBusiness.ID"]');

        isIndividualOrBusinessEntity = isIndividualOrBusinessEntity[0].checked === true ? individualEntity : (isIndividualOrBusinessEntity[1].checked === true ? businessEntity : "default");

        if (routeActionName === feeAction && isIndividualOrBusinessEntity === individualEntity) {
            FormdDataPost(enrollmentAttachmentAction, routeActionID);
        }
        else if (routeActionName === mcoConsentMvcUrl && $("#Provider_ProgramTypeList").val() === FFSOnly) {
            FormdDataPost(enrollmentAttachmentAction, routeActionID);
        }
        else {
            FormdDataPost(routeActionName, routeActionID);
        }
    }
    else {
        FormdDataPost(providerSpecialityMvcUrl, enrollmentApplicationId);
    }
}

function reenrollmentRedirect() {
    isStepDataDirty = false;
    window.location = cancelActionUrl;
}

function hidePanelById(divId) {
    $(divId).hide();
    toggleRequiredFieldsForAControlInsideADiv(divId, false);
}

function showPanelById(divId) {
    $(divId).show();
    toggleRequiredFieldsForAControlInsideADiv(divId, true);
}

function toggleRequiredFieldsForAControlInsideADiv(divId, makeEnable) {
    configureReadOnlyControls();

    if (makeEnable) {
        $(divId + " :input").each(function () { $(this).css("visibility", "visible"); });
        if (typeof removeReadyOnly === "function") {
            removeReadyOnly($(divId));
        }

        $(divId + " :input").each(function () {
            $(this).removeAttr("readonly");
            $(this).removeAttr("disabled");
            $(this).removeAttr("aria-readonly");
            $(this).removeAttr("aria-disabled");
            $(this).prop("readonly", false);
            $(this).prop("disabled", false);
            $(this).prop("tabindex", 0);
            $(this).removeClass("readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly");
        });

        $(divId).find("[data-role='dropdownlist']").each(function () {
            let dropDownList = $(this).data("kendoDropDownList");
            if (dropDownList) {
                dropDownList.readonly(false);
                dropDownList.enable(true);

                if (dropDownList.wrapper) {
                    dropDownList.wrapper.removeAttr("aria-readonly").removeAttr("aria-disabled").removeClass("readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly");
                }

                if (dropDownList.input) {
                    dropDownList.input.removeAttr("readonly").removeAttr("disabled").removeAttr("aria-readonly").removeAttr("aria-disabled").prop("readonly", false).prop("disabled", false).prop("tabindex", 0).removeClass("readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly");
                }
            }
        });

        $(divId).find("[data-role='datepicker']").each(function () {
            let datePicker = $(this).data("kendoDatePicker");
            if (datePicker) {
                datePicker.readonly(false);
                datePicker.enable(true);
            }
        });

        $(divId).find(".assoc-box-radio-btn-list-horz, .assoc-box-checkbox, .assoc-box-radio-btn-list-vert, .editor-field > div, .k-dropdownlist, .k-datepicker").removeClass("readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly");
        if (typeof configureReadOnlyDropDownListWidgets === "function") {
            configureReadOnlyDropDownListWidgets();
        }
    } else {
        $(divId + " :input").each(function () { $(this).css("visibility", "hidden"); });
        $(divId + " :input").each(function () { $(this).attr("readonly", true); });
        $(divId).find("[data-role='dropdownlist']").each(function () { $(this).data("kendoDropDownList").readonly(true); });
        configureReadOnlyControls();
    }
}

function isRevalidatedEnrommentRemoveForEnrollType() {
    var enrollType = $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value();
    var providerIndividualProviderBirthDate = "#Provider_IndividualProvider_BirthDate";

    if (enrollType === "I" || enrollType === "IG" || enrollType === "O") {
        if ($(applicationType).val() === reval) {
            $(providerNationalProviderIdentifierVal).prop("readonly", false);
            $("#Provider_TaxIdentification_SSN").prop("readonly", false);
        }
    }
    else if (enrollType === "G" || enrollType === "F") {

        if ($(applicationType).val() === reval) {
            if ($("#Provider_TaxIdentification_EffectiveFromDate").is(":visible") && $("#Provider_TaxIdentification_EffectiveFromDate").val !== "") {
                $("#Provider_TaxIdentification_EffectiveFromDate").data('kendoDatePicker').readonly(false);
            }
        }
    }
    else if (enrollType === "AT") {
        if ($(applicationType).val() === reval) {
            if ($("#Provider_TaxIdentification_EffectiveFromDate").is(":visible") && $("#Provider_TaxIdentification_EffectiveFromDate").val !== "") {
                $("#Provider_TaxIdentification_EffectiveFromDate").data('kendoDatePicker').readonly(false);
            }
        }
    }
    configureReadOnlyControls();
}

function isRevalidatedEnrommentAddForEnrollType() {
    var enrollType = $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value();
    var providerIndividualProviderBirthDate = "#Provider_IndividualProvider_BirthDate";

    if (enrollType === "I" || enrollType === "IG" || enrollType === "O") {
        if ($(applicationType).val() === reval) {
            if ($("#Provider_TaxIdentification_SSN").val() !== null && $("#Provider_TaxIdentification_SSN").val().trim() !== '') {
                $("#Provider_TaxIdentification_SSN").prop("readonly", true);
            }
        }
    }
    else if (enrollType === "G" || enrollType === "F") {
        if ($(applicationType).val() === reval) {

            if ($("#Provider_TaxIdentification_EffectiveFromDate").is(":visible") && $("#Provider_TaxIdentification_EffectiveFromDate").val !== "") {
                $("#Provider_TaxIdentification_EffectiveFromDate").data('kendoDatePicker').readonly(true);
            }
        }
    }
    else if (enrollType === "AT") {
        if ($(applicationType).val() === reval) {
            if ($("#Provider_TaxIdentification_EffectiveFromDate").is(":visible") && $("#Provider_TaxIdentification_EffectiveFromDate").val !== "") {
                $("#Provider_TaxIdentification_EffectiveFromDate").data('kendoDatePicker').readonly(true);
            }
        }
    }
    configureReadOnlyControls();
}

function setKendoValidatorFieldMessageForProviderID(field, errorMessage) {
    var parentElem = field.parents(".editor-field").first();
    if (parentElem === null || parentElem.length === 0) {
        parentElem = field.parent().parent().parent();
    }

    var fieldName = field[0].name;
    var valSpanId = field[0].id + "_validationMessage";
    $("#" + field[0].id).closest('div.editor-field').find("span.k-invalid-msg").remove();
    var span = "<span class='k-form-error k-invalid-msg field-validation-error' " +
        "id='" + valSpanId + "' role='alert' data-for='" + fieldName + "' " +
        "data-valmsg-for='" + fieldName + "'><span class='k-icon k-warning'> </span>" + errorMessage + "</span>";

    field.addClass("k-invalid");
    field.renameAttr("not-data-val-required", "data-val-required");
    field.attr("aria-invalid", "true");
    parentElem.append(span);
}

function navigateToNextStep() {
    processEnrollmentRegistration();
}

function processEnrollmentRegistrationFailure() {
    $(".validationSummary").show();
}

function togglePrechecklistGenerateButton() {
    if (isPrechecklistDetailsComplete()) {
        $("#prechecklistGenerateButton").show();
    } else {
        $("#prechecklistGenerateButton").hide();
    }
}

function isPrechecklistDetailsComplete() {

    var enrollmentType = $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").value()
    if (enrollmentType == "") {
        return false;
    }

    var providerType = $("#EnrollmentPreChecklist_ProviderTypeList").data("kendoDropDownList").value();
    if (providerType == "") {
        return false;
    }

    var specialty = $("#EnrollmentPreChecklist_SpecialtyList").data("kendoDropDownList").value();
    if (specialty == "") {
        return false;
    }

    var taxIdType = $('input[name="EnrollmentPreChecklist.TaxIdTypes.ID"]:checked').val();
    if (typeof (taxIdType) == "undefined") {
        return false;
    }

    var isMedicareEnrolled = $('input[name="EnrollmentPreChecklist.IsMedicareEnrolled.ID"]:checked').val();
    if (typeof (isMedicareEnrolled) == "undefined") {
        return false;
    }

    if (isMCO.toLowerCase() === "true") {
        var programType = $("#EnrollmentPreChecklist_ProgramTypeList").data("kendoDropDownList").value();
        if (programType === "" &&
            !(enrollmentAllowedAttributeValue !== undefined &&
                enrollmentAllowedAttributeValue !== null &&
                enrollmentAllowedAttributeValue.toLowerCase() === "custommultiple")) {
            return false;
        }
    }
    return true;
}

function resetPrechecklistForm() {
    $("#EnrollmentPreChecklist_EnrollmentTypeList").data("kendoDropDownList").select(-1);
    clrKendoDropdownList(enrollmentPreChecklistProviderTypeListId);
    clrKendoDropdownList("EnrollmentPreChecklist_SpecialtyList");
    $('input[name="EnrollmentPreChecklist.TaxIdTypes.ID"]').prop('checked', false);
    $('input[name="EnrollmentPreChecklist.IsMedicareEnrolled.ID"]').prop('checked', false);
    resetEnrollmentPrechecklistProgramTypeDropdown();
}

// Searches through provider type attributes to find and return a specific attribute value by name.
// This function can be reused to retrieve any attribute value for a provider type by passing different attribute names.
function getProviderTypeAttributesValuesByAttributeName(providerTypeDataListAttributes, attributeName) {
    let attribute = providerTypeDataListAttributes.find(attr => attr.DataListAttributeName === attributeName);

    if (!attribute) {
        return null;
    }

    if (attributeName === 'AllowOnlyCAQHEnrollment') {
        return (attribute.DataListAttributeValue && attribute.DataListAttributeValue.toLowerCase() === 'true') ? 'true' : 'false';
    }

    return attribute.DataListAttributeValue || null;
}