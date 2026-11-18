//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var cancelButtonId = "#cancelButton";
var confirmEmail = "#EnrollmentCreateCredentials_EmailAddressConfirmation";
var disablingDiv = "#disablingDiv";
var disablingDivPopup = "#disablingDivPopup";
var disclsoureGroupQuestionDictionary;
var isInternalPortalApp = "#IsCreatedFromInternalPortal";
var leaveOnPage = false;
var prevButtonId = "#prevButton";
var rtpFlag = false;
var rtpStatusType;
var status = "#Status_Name";
var submitFlag = false;
var printEnrollmentApplicationId = "#EnrollmentApplicationId";
var ssnMaskFormat = '&&&-&&-&&&&';
var einMaskFormat = '&&-&&&&&&&';


$(document).ready(function () {
    $(window).on('beforeunload', function () {
        leaveOnPage = false;
        if (typeof (isTocButtonClicked) !== "undefined" && !isTocButtonClicked) {
            hideLoadingDialog();
            leaveOnPage = true;
        }
    });

    $(window).on('unload', function () {
        if (leaveOnPage) {
            showLoadingDialog();
        }
    });

    $(confirmEmail).bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    if ($(prevButtonId).parents().find(".editor-button-row-parent").length > 0) {
        $(prevButtonId).addClass("float-right btn-spacer-left").removeClass("btn-spacer-right").insertAfter("#modelEditorButtonRow .editor-button-nav-right");
    }
    if ($(cancelButtonId).parents().find(".editor-button-row-parent").length > 0) {
        $(cancelButtonId).addClass("float-left btn-spacer-right").removeClass("btn-spacer-left").insertBefore("#modelEditorButtonRow .editor-button-nav-right");
    }

    if ($(isInternalPortalApp).val() !== "True") {
        $("li[id='MCBMenu.ReturnToProvider']").hide();
    }

    if (rtpStatusType) {
        if ($(status).val() === rtpStatusType) {
            rtpFlag = true;
        }
    }
    getEnrollmentStatus();
});

$("#Coversheet").click(function () {
    generatePrintPreviewEnrollmentStatus();
});

function getEnrollmentStatus() {
    applicationID = $(printEnrollmentApplicationId).val();
    if (applicationID === undefined || applicationID === null || applicationID === "") {
        if (window.opener) {
            applicationID = window.opener.$(printEnrollmentApplicationId).val();
        }
    }

    if (applicationID === undefined || applicationID === null || applicationID === "") {
        return;
    }

    trackingID = $("#TrackingNumber").val();
    var activeStep = '#ActiveStep';
    var submissionStepNames = "24";
    var type = null;
    var riskValue = '';
    var riskId = "#RiskLevel";
    var providerTypeValue = '';
    var applicationType = "#ApplicationType";
    var activeStepValue = null;
    var enrollmentTypeList = "#EnrollmentCriteria_EnrollmentTypeList";
    var providerTypeList = "#EnrollmentCriteria_ProviderTypeList";

    activeStepValue = $(activeStep).val();
    if (!activeStepValue || activeStepValue === "") {
        if (window.opener) {
            activeStepValue = window.opener.$(activeStep).val();

        }
    }
    if (!activeStepValue || activeStepValue === "") {
        activeStepValue = submissionStepNames;
    }

    if (!trackingID || trackingID === "") {
        if (window.opener) {
            trackingID = window.opener.$(trackingNumber).val();
        }
    }

    applicationTypeValue = $(applicationType).val();
    if (!applicationTypeValue || applicationTypeValue === "") {
        if (window.opener) {
            applicationTypeValue = window.opener.$(applicationType).val();
        }
    }

    var enrolltype = $(enrollmentTypeList).data("kendoDropDownList");
    if (!enrolltype) {
        if (window.opener) {
            type = window.opener.$(enrollmentTypeList).data("kendoDropDownList").value();
        }
    }
    else {
        type = enrolltype.value();
    }

    riskValue = $(riskId).val();
    if (!riskValue || riskValue === "") {
        if (window.opener) {
            riskValue = window.opener.$(riskId).val();
        }
    }

    var providerType = $(providerTypeList).data("kendoDropDownList");
    if (!providerType) {
        if (window.opener) {
            getProviderType = window.opener.$(providerTypeList).data("kendoDropDownList").value();
        }
    } else {
        getProviderType = providerType.value();

    }

    var enrollmentStatusText;

    if (typeof statusText === 'undefined') {
        enrollmentStatusText = "";
    }
    else {
        enrollmentStatusText = statusText;
    }

    moduleContentQueryString = "?id=" + applicationID + "&enrollmentType=" + type + "&activeStep=" + activeStepValue + "&providerType=" + providerTypeValue + "&riskLevel=" + riskValue + "&applicationType=" + applicationTypeValue + "&enrollmentStatus=" + enrollmentStatusText;
}

function generatePrintPreviewEnrollmentStatus() {
    var params = { TrackingId: trackingID, NotificationCategory: 'Coversheet' };
    makeAsyncWebApiCall(coversheetPDFUrl, "PUT", params, "application/json;charset=utf-8", "coversheetSuccess");
}

function coversheetSuccess(result) {
    downloadLetterPdf(result, trackingID);
}
function hidePanelById(divId) {
    $(divId).hide();
    toggleRequiredFieldsForAControlInsideADiv(divId, false);
}

function showPanelById(divId) {
    $(divId).show();
    toggleRequiredFieldsForAControlInsideADiv(divId, true);
}

function reapplyCaqhGeneralInfoDropdownReadonly(scope) {
    var isCaqhEnrollment = ($("#IsCAQHEnrollment").val() || "false").toLowerCase() === "true";
    var isCaqhReadOnlyActive = ($("#IsCaqhReadOnlyActive").val() || "false").toLowerCase() === "true";
    if (!isCaqhEnrollment && !isCaqhReadOnlyActive) {
        return;
    }

    var context = scope || $(document);
    var dropdownIds = ["EnrollmentCriteria_EnrollmentTypeList", "EnrollmentCriteria_ProviderTypeList"];
    var readonlyApplied = false;

    $.each(dropdownIds, function (i, id) {
        var selector = "#" + id;
        if (context.find(selector).length === 0 && context.is(selector) === false) {
            return;
        }

        var dropDownList = $(selector).data("kendoDropDownList");
        if (dropDownList) {
            dropDownList.readonly(true);
            readonlyApplied = true;
        }
        $(selector).attr("readonly", "readonly");
    });

    if (readonlyApplied) {
        configureReadOnlyControls();
    }
}

function toggleRequiredFieldsForAControlInsideADiv(divId, makeEnable) {
    configureReadOnlyControls();

    if (makeEnable) {
        removeReadyOnly($(divId));
        $(divId + " :input").each(function () { $(this).css("visibility", "visible"); });
        $(divId).find("[data-role='dropdownlist']").each(function () {
            let dropDownList = $(this).data("kendoDropDownList");
            if (dropDownList) {
                dropDownList.readonly(false);
                dropDownList.enable(true);

                if (dropDownList.wrapper) {
                    dropDownList.wrapper
                        .removeAttr("aria-readonly")
                        .removeAttr("aria-disabled")
                        .removeClass("k-state-disabled k-disabled k-readonly readonly-control readonly-bkgrnd-color");
                }

                if (dropDownList.input) {
                    dropDownList.input
                        .removeAttr("readonly")
                        .removeAttr("aria-readonly")
                        .prop("readonly", false)
                        .prop("disabled", false)
                        .removeAttr("disabled")
                        .prop("tabindex", 0)
                        .removeClass("readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly");
                }
            }
        });
        $(divId).find("span.k-dropdownlist").each(function () {
            let readOnlyInput = $(this).find("input[readonly]");
            if (readOnlyInput.length > 0) {
                readOnlyInput.removeAttr("readonly");
                readOnlyInput.prop("tabindex", "0");
            }

            $(this)
                .removeAttr("aria-readonly")
                .removeAttr("aria-disabled")
                .removeClass("k-state-disabled k-disabled k-readonly readonly-control readonly-bkgrnd-color");

            $(this).find(".k-input, .k-input-inner, .k-dropdown-wrap, .k-picker-wrap, .k-input-button")
                .removeClass("k-state-disabled k-disabled k-readonly readonly-control readonly-bkgrnd-color");
        });
        configureReadOnlyDropDownListWidgets();
        $(divId).find("[data-role='datepicker']").each(function () {
            let datePicker = $(this).data("kendoDatePicker");
            if (datePicker) {
                datePicker.readonly(false);
                datePicker.enable(true);
            }
            $(this).parents().find(".k-datepicker").css("visibility", "visible");
            $(this).parents().find(".k-datepicker").removeAttr("aria-readonly").removeAttr("aria-disabled").removeClass("k-state-disabled k-disabled k-readonly readonly-control readonly-bkgrnd-color");
            $(this).parents().find(".k-picker-wrap").removeClass("k-state-disabled k-disabled k-readonly readonly-control readonly-bkgrnd-color");
            $(this).parents().find(".k-input, .k-input-inner, .k-input-button").removeClass("k-state-disabled k-disabled k-readonly readonly-control readonly-bkgrnd-color");
        });
        $(divId).find(".assoc-box-radio-btn-list-horz, .assoc-box-checkbox, .assoc-box-radio-btn-list-vert, .editor-field > div").removeClass("readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly");
        reapplyCaqhGeneralInfoDropdownReadonly($(divId));
    } else {
        $(divId + " :input").each(function () { $(this).css("visibility", "hidden"); });
        $(divId + " :input").each(function () { $(this).prop("readonly", true); });
        $(divId).find("[data-role='dropdownlist']").each(function () { $(this).data("kendoDropDownList").enable(false); });
        configureReadOnlyControls();
    }
}

function dateFormat(date) {
    var minDate = new Date(globalDateMin);
    date = new Date(date);
    if (date.toDateString() !== minDate.toDateString()) {
        var month = date.getMonth().toString();
        month = month.length > 1 ? month : '0' + month;
        var getdate = date.getDate().toString();
        getdate = getdate.length > 1 ? getdate : '0' + getdate;
        return kendo.toString(new Date(date.getFullYear(), month, getdate), "u");
    }
    else {
        return '';
    }
}

function processSaveApplicationFailureSubmit(result) {
    isStepDataDirty = true;
    if (result[0] !== undefined && result[0].indexOf(DuplicateSubmitFound) === 0) {
        isStepDataDirty = false;
        var trackingNumber = result[0].replace(DuplicateSubmitFound, "");
        hideSummaryErrors();
        displayPopupDialog("Info", "Alert !", invalidStatus.replace("{0}", trackingNumber));
        submitFlag = true;
    }
    buildEnrollmentProgressPageError(result);
}

function buildEnrollmentProgressPageError(result) {
    var pageValidationErrorMsgs;
    if (enrollmentStepName !== undefined) {
        switch (enrollmentStepName) {
            case "GeneralInfo":
                pageValidationErrorMsgs = buildGeneralInformationPageError();
                break;
            case "Credentialing":
                pageValidationErrorMsgs = buildCredentialingPageError();
                break;
            case "ProviderType":
                pageValidationErrorMsgs = buildProviderTypePageError();
                ApplyErrorPanelIndicatorsCommonError();
                ApplyErrorPanelIndicatorsWrtErrors(result);
                break;
            case "Other":
                ApplyErrorPanelIndicatorsWrtErrors(result); //for standard error messages with panel title
                pageValidationErrorMsgs = buildOtherPageErrors(); //for non standard error messages without panel title
                break;
            default:
                pageValidationErrorMsgs = undefined;
                break;
        }
    }

    if (Array.isArray(pageValidationErrorMsgs)) {
        pageValidationErrorMsgs.forEach(function(panel) {
            if (panel.errors && panel.errors.some(function (error) {
                return result.some(function (msg) {
                    return msg.includes(error);
                });
            }))
            {
                setPanelErrorIndicator(panel.element);
            }
        });
    }
}

//This can be applied to all pages where content panels styles are proper.
function ApplyErrorPanelIndicatorsWrtErrors(result) {
    // Only proceed if there are error messages to process
    if (!result || result.length === 0) {
        return;
    }

    const panelMappings = buildPanelTitleDivIdMappingsFromDOM();

    // Process error messages and apply indicators
    processErrorMessagesAndApplyErrorIndicators(result, panelMappings);
}

function ApplyErrorPanelIndicatorsCommonError() {
    const panelMappings = getPanelsWithValidationErrors();

    panelMappings.forEach(mapping => {
        if (mapping.hasErrors) {
            // Process error messages and apply indicators
            setPanelErrorIndicator(mapping.element);
        }
    });
}

function getPanelsWithValidationErrors() {
    const panels = [];
    $('.content-panel-hdr').each(function () {
        const header = $(this);
        // skip hidden headers
        if (!header.is(':visible')) {
            return;
        }

        const container = header.closest('.content-panel-container');
        if (!container || container.length === 0) {
            return;
        }
        // skip containers without id or not visible
        const containerId = container.attr('id');
        if (!containerId || !container.is(':visible')) {
            return;
        }
        // look inside the panel body (support subpanel body as well)
        const body = container.find('.content-panel-bdy').first();
        if (!body || body.length === 0) {
            panels.push({ element: '#' + containerId, hasErrors: false, errors: [] });
            return;
        }

        // collect visible validation messages under the panel body
        const errorEls = body.find('.field-validation-error, .k-invalid-msg').filter(function () {
            const $el = $(this);
            // ignore empty text and hidden nodes (including inline style="display:none;")
            return $el.is(':visible') && $el.text().trim().length > 0;
        });

        const errors = errorEls.toArray().map(e => $(e).text().trim());

        panels.push({
            element: '#' + containerId,
            hasErrors: errors.length > 0,
            errors: errors
        });
    });

    return panels;
}

function buildPanelTitleDivIdMappingsFromDOM() {
    const panelMappings = [];

    // Find all elements with class "content-panel-hdr"
    $('.content-panel-hdr').each(function () {
        const headerElement = $(this);
        const panelTitle = headerElement.text().trim();

        // Find the parent container with class "content-panel-container"
        const containerElement = headerElement.closest('.content-panel-container');

        if (containerElement.length > 0 && containerElement.attr('id')) {
            // Create variations of the header text (singular/plural forms)
            const titles = createPanelTitleVariations(panelTitle);

            panelMappings.push({
                keywords: titles,
                element: '#' + containerElement.attr('id')
            });
        }
    });

    return panelMappings;
}

function createPanelTitleVariations(panelTitle) {
    const titles = [panelTitle];

    // Add singular form if header text appears to be plural
    if (panelTitle.endsWith('s') && panelTitle.length > 1) {
        titles.push(panelTitle.slice(0, -1)); // Remove 's'
    }
    // Add plural form if header text appears to be singular
    else {
        titles.push(panelTitle + 's'); // Add 's'
    }

    return titles;
}

function processErrorMessagesAndApplyErrorIndicators(result, panelMappings) {
    // Iterate through each error message in the result
    for (let i = 0; i < result.length; i++) {
        let errorMessage = result[i];

        // Check each panel mapping for keyword matches
        panelMappings.forEach(mapping => {
            const matchFound = checkErrorMessageMatchesPanel(errorMessage, mapping.keywords);

            if (matchFound) {
                setPanelErrorIndicator(mapping.element);
            }
        });
    }
}

function checkErrorMessageMatchesPanel(errorMessage, titles) {
    return titles.some(title => {
        // Check if title appears at the beginning followed by colon, period, or bracket
        const startsWithTitle = errorMessage.indexOf(title) === 0 &&
            (errorMessage.startsWith(title + ":") || errorMessage.startsWith(title + ".") ||
                errorMessage.startsWith(title + "[") || errorMessage.includes(title + " "));

        // Check if title appears at the end followed by period
        const endsWithTitle = errorMessage.endsWith(title + ".") || errorMessage.endsWith(title);

        //if any other common combination required then that can be added here

        return startsWithTitle || endsWithTitle;
    });
}
function getFormattedDate(date) {
    var dateFormat = formatCultureDateMask();

    return kendo.toString(date, dateFormat);
}

function isLessThanCurrentDate(date) {
    var dateFormat = formatCultureDateMask();
    var selectedDate = kendo.parseDate(kendo.toString(date, dateFormat), dateFormat);
    var currentDate = new Date().setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
        return true;
    }
    else {
        return false;
    }
}

function isFutureDate(date) {
    var dateFormat = formatCultureDateMask();
    var selectedDate = kendo.parseDate(kendo.toString(date, dateFormat), dateFormat);
    var currentDate = new Date().setHours(0, 0, 0, 0);

    if (selectedDate > currentDate) {
        return true;
    } else {
        return false;
    }
}

function ClearValidationMessage(controlID) {
    $("#" + controlID).resetValidation();
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

function clrKendoDropdownListWithValues(dropdownId) {
    var dropdownBox = $("#" + dropdownId + ":not([type='hidden']):not([readonly]):not([disabled])").data("kendoDropDownList");
    if (dropdownBox) {
        dropdownBox.value(null);
        dropdownBox.trigger("change");
    }
}

function GetTaxonomyWithContactName(currentDataItem) {
    var _taxonomyCodeWithName = "";
    var _taxonomyCode = currentDataItem.TaxonomyCode;
    var _taxonomyName = currentDataItem.TaxonomyName;

    if (_taxonomyCode && _taxonomyName) {
        _taxonomyCodeWithName = _taxonomyCode + "-" + _taxonomyName;
    }
    else if (_taxonomyCode) {
        _taxonomyCodeWithName = _taxonomyCode;
    }
    else if (_taxonomyName) {
        _taxonomyCodeWithName = _taxonomyName;
    }

    if (_taxonomyCodeWithName === null || _taxonomyCodeWithName.indexOf("null") > -1) {
        _taxonomyCodeWithName = '';
    }

    return _taxonomyCodeWithName;
}

function FormdDataPost(url, enrollmentApplicationId) {
    if (enrollmentApplicationId) {
        var requestverificationtoken = $('input[name="__RequestVerificationToken"]').val();
        var form = $('<form action="' + url + '" method="post" >' +
            '<input type="hidden" name="applicationId" value="' + enrollmentApplicationId + '" />' +
            '<input type="hidden" name="__RequestVerificationToken" value="' + requestverificationtoken + '" />' +
            '</form>');
        $('body').append(form);
        form.submit();
    }
    else {
        postForm(url,
            {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
            }
        );
    }
}

function PreviousButtonDirtyDataCheck(redirectActionURL, enrollmentApplicationId) {
    if (isStepDataDirty && !hasRightsEnrollmentWithoutSave) {
        isTocButtonClicked = true;
        routeActionName = redirectActionURL;
        routeActionID = enrollmentApplicationId;
        displayPopupOKCancelDialog("Warning", DataModifiedHdr, DataModified, globalYes, "onDirtyDataSave", globalNo, "onNoDirtyData");
    }
    else {
        FormdDataPost(redirectActionURL, enrollmentApplicationId);
    }
}

function setKendoValidatorFieldMessageForTaxonomy(field, errorMessage) {
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
    $(span).insertAfter("span.k-autocomplete");
}

function setKendoValidatorFieldMessageForEFTERA(field, errorMessage) {
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

function ClearValidationMessageEFTERA(controlID) {
    $("#" + controlID).resetValidation();
}

function resetValuesInDiv(divId) {
    $(divId + " :input").each(function () {
        $(this).val('');
    });

    $(divId).find("[data-role='dropdownlist']").each(function () {
        $(this).data("kendoDropDownList").value("");
    });
}

function divToShowAndHide(divToShow, divToHide) {
    toggleRequiredFieldsForAControlInsideADiv(divToShow, true);
    toggleRequiredFieldsForAControlInsideADiv(divToHide, false);
    $(divToShow).show();
    $(divToHide).hide();
}

function validateBirthDate(date) {

    var dateFormat = formatCultureDateMask();
    var dateToFormat = kendo.parseDate(kendo.toString(date, dateFormat), dateFormat);

    if (dateToFormat !== null && !isNaN(dateToFormat) && dateToFormat !== "Invalid Date") {
        var dateToFormatOnlyYear = dateToFormat.getUTCFullYear();
        var currentDate = new Date();
        var currentYear = currentDate.getUTCFullYear();
        var dateDifference = currentYear - dateToFormatOnlyYear;
        if (dateDifference >= 18 && dateDifference <= 150) {
            return true;
        }
        dateToFormatOnlyYear = null;
        currentDate = null;
        currentYear = null;
        dateDifference = null;
        return false;
    }
    return false;
}

function validateAmountOfDebt(amount) {
    if ( parseInt(amount) === 0) {
        setKendoValidatorFieldMessage($("#AmountOfDebt"), amountofDebtValidationMessage);
        return false;
    }
    return true;
}

function errorMsgToPopup(formId, errorMsg) {
    hideSummaryErrors();
    var errors = new Array();
    errors.push(errorMsg);
    mpeSetPanelMessage(formId, "Error", globalValidationSummaryMsg, errors);
}

function makeControlsReadonlyForMCO(formId) {
    if (formId.indexOf("#") < 0) {
        formId = "#" + formId;
    }

    $(formId).find(':input').each(function () {
        $(this).readonly();

        if ($(this).hasClass('k-button')) {
            $(this).hide();
        }
    });

    $(formId).find("[data-role='dropdownlist']").each(function () {
        $(this).data("kendoDropDownList").readonly();
    });

    $(formId).find("[data-role='datepicker']").each(function () {
        $(this).data("kendoDatePicker").readonly();
    });

    configureReadOnlyControls();

    var cancelButtonId = formId + "CancelButton";

    if (typeof (buttonCloseText) !== "undefined") {
        $(cancelButtonId).val(buttonCloseText).show();
    }
    else {
        $(cancelButtonId).show();
    }
    $(cancelButtonId).addClass("k-button primary-button");

    $(formId).find(".editor-req-field-row").hide();
}

removeReadyOnly = function (followUpForm) {
    followUpForm.find('.editor-req-field').removeClass('readonly-req-icon');

    followUpForm.find(':input').each(function () {
        $(this).removeAttr('disabled');
        $(this).removeAttr('readonly');
        $(this).removeAttr('aria-readonly');
        $(this).removeAttr('aria-disabled');
        $(this).prop('tabindex', '0');
        $(this).removeClass('readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly');
    });

    followUpForm.find("[data-role='dropdownlist']").each(function () {
        let dropDownList = $(this).data("kendoDropDownList");
        if (dropDownList) {
            dropDownList.readonly(false);
            dropDownList.enable(true);

            if (dropDownList.wrapper) {
                dropDownList.wrapper.removeAttr('aria-disabled').removeAttr('aria-readonly').removeClass('readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly');
            }

            if (dropDownList.input) {
                dropDownList.input.removeAttr('disabled').removeAttr('readonly').removeAttr('aria-disabled').removeAttr('aria-readonly').prop('tabindex', '0').removeClass('readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly');
            }
        }
    });

    followUpForm.find("[data-role='datepicker']").each(function () {
        let datePicker = $(this).data("kendoDatePicker");
        if (datePicker) {
            datePicker.readonly(false);
            datePicker.enable(true);
        }
    });

    followUpForm.find('.assoc-box-radio-btn-list-horz, .assoc-box-checkbox, .assoc-box-radio-btn-list-vert, .editor-field > div').removeClass('readonly-control readonly-bkgrnd-color k-state-disabled k-disabled k-readonly');

    followUpForm.find("[data-role='grid']").find(':input').each(function () {
        if ($(this).hasClass('k-button')) {
            $(this).show();
        }
    });

    followUpForm.find("[data-role='grid']").find('.k-grid-Edit').each(function () {
        $(this).show();
    });

    reapplyCaqhGeneralInfoDropdownReadonly(followUpForm);
};

function hideGridButtonsForMCO(formId) {
    $(formId).find("[data-role='grid']").each(function () {
        $(this).find(".k-button").hide();
        $(this).data("kendoGrid").hideColumn($(this).data("kendoGrid").columns.length - 1);
    });
}

function checkIfRTP() {
    if (rtpFlag && $(isInternalPortalApp).val() === "True") {
        displayPopupDialogActionable("Info", rtpPopUpTitle, rtpToPartialmsg, "rtpToPartialSuccess");
        rtpFlag = false;
        return true;
    }
}

function rtpToPartialSuccess() {
    var id = $("#EnrollmentApplicationId").val();
    if (isTocButtonClicked) {
        FormdDataPost(routeActionName, routeActionID);
    }
    else {
        FormdDataPost(nextActionUrl, id);
    }
}

function displayFieldAsRequired(fieldLabelId, isFieldRequired) {
    if ($("#" + fieldLabelId)) {
        var fieldLabelText = $("#" + fieldLabelId).text();
        if ($("#" + fieldLabelId).parent().find("span.clickable.editor-req-field.fa-solid.fa-asterisk").length <= 0 && isFieldRequired) {
            var fieldLabelMsg = "<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + fieldLabelText + " is a required field.' data-role='tooltip'></span>";
            $("#" + fieldLabelId).parent().prepend(fieldLabelMsg);
        }
        else if ($("#" + fieldLabelId).parent().find("span.clickable.editor-req-field.fa-solid.fa-asterisk").length > 0 && !isFieldRequired) {
            $("#" + fieldLabelId).parent().find("span.clickable.editor-req-field.fa-solid.fa-asterisk").remove();
        }
    }
}

function getFormattedDateByLocalCode(date) {
    var dateFormat = formatCultureDateMask();
    var selectedDate = kendo.toString(date, dateFormat);
    return selectedDate;
}

//---------------------------------------------
// Model Editor Event Hooks
//---------------------------------------------
function editorCancelPreprocess() {
    if (typeof cancelInfo !== 'undefined' && cancelInfo) {
        displayPopupOKCancelDialog("Warning", actionAlertTitle, cancelInfo, globalYes, "cancelSuccess", globalNo, "");
        return true;
    }
    else {
        return false;
    }
}

function cancelSuccess() {
    isStepDataDirty = false;
    window.location = cancelActionUrl;
}

function formatGridDate(gridDate) {
    if (!gridDate) {
        return "";
    }
    else {
        return kendo.format('{0:d}', kendo.parseDate(gridDate));
    }
}

function setUndefinedValueToEmpty(formId) {
    $(formId).find(':input').each(function () {
        if ($(this).hasClass('k-textbox') && $(this).val() === 'undefined') {
            $(this).val('');
        }
    });
}

function isNumber(evt) {
    var iKeyCode = evt.which ? evt.which : evt.keyCode;
    if (iKeyCode < 48 || iKeyCode > 57) {
        return false;
    }
    return true;
}

function getMaskedEmailId(emailId) {
    var lastIndex = emailId.indexOf('@');
    var startIndex = (lastIndex > 2) ? 3 : lastIndex;
    var endIndex = lastIndex;
    return emailId.slice(0, startIndex) +
        emailId.slice(startIndex, endIndex).replace(/./g, '*') +
        emailId.slice(endIndex);
}

function maskSSNOrEIN(textboxid, maskFormat, value, unredactedSize) {
    var masked = $(textboxid).kendoMaskedTextBox({
        mask: maskFormat
    }).getKendoMaskedTextBox();
    masked.value(generateRedaction(value, unredactedSize));

    return masked;
}

function gridMaskTaxId(tax, type) {
    var maskedHtml = '';
    if (type.toUpperCase() === "SSN") {
        maskedHtml = gridMaskSSNOrEIN(tax.SSNHidden, null);
    } else if (type.toUpperCase() === "EIN") {
        maskedHtml = gridMaskSSNOrEIN(null, tax.TaxIdHidden);
    }

    return maskedHtml;
}

function gridMaskSSNOrEIN(ssnHidden, einHidden) {
    var maskedHtml = '';
    if (ssnHidden && !einHidden) {
        maskedHtml = kendo.htmlEncode(maskSSN(ssnHidden, unredactedSize).value());
    } else if (einHidden && !ssnHidden) {
        maskedHtml = kendo.htmlEncode(maskEIN(einHidden, unredactedSize).value());
    }

    return maskedHtml;
}

function maskSSN(ssnNumber, unredactedSize) {
    var masked = $("<input id='ssnmasked'></input>").kendoMaskedTextBox({
        mask: ssnMaskFormat
    }).getKendoMaskedTextBox();
    masked.value(generateRedaction(ssnNumber, unredactedSize));

    return masked;
}

function maskEIN(einNumber, unredactedSize) {
    var masked = $("<input id='einmasked'></input>").kendoMaskedTextBox({
        mask: einMaskFormat
    }).getKendoMaskedTextBox();
    masked.value(generateRedaction(einNumber, unredactedSize));

    return masked;
}

function displayPanelAsRequired(panelId, isPanelRequired) {
    let panelHeader = $(panelId + " .content-panel-hdr");
    let panelHeaderReqMark = $(panelHeader).find("span.editor-req-fields[title='" + globalValidationRequiredFieldPanelMsg + "'][data-role='tooltip']");
    if (panelHeaderReqMark.length == 0 && isPanelRequired) {
        $(panelHeader).prepend("<span class='clickable editor-req-fields fa-solid fa-asterisk' title='" + globalValidationRequiredFieldPanelMsg + "' data-role='tooltip'></span>");
    }
    else if (panelHeaderReqMark.length > 0 && !isPanelRequired) {
        $(panelHeader).find("span.clickable.editor-req-fields.fa-solid.fa-asterisk").remove();
    }
}

function displayPanelAsNonRequired(panelId) {
    let panelHeader = $(panelId + " .content-panel-hdr");
    $(panelHeader).find("span.clickable.editor-req-fields.fa-solid.fa-asterisk").remove();
}

function setPanelErrorIndicator(panelId) {
    if (!$(panelId + ".content-panel-container").hasClass("content-panel-container-error")) {
        $(panelId + ".content-panel-container").addClass("content-panel-container-error");
    }
}

function clearPanelErrorIndicator(panelId) {
    if (panelId) {
        $(panelId + ".content-panel-container").removeClass("content-panel-container-error");
    }
}

function hasValidationErrors(containerSelector) {
    const $container = (containerSelector instanceof jQuery)
        ? containerSelector
        : $(containerSelector);

    if (!$container || $container.length === 0) return false;

    const hasErrorMessages = $container
        .find('.field-validation-error:visible, .k-invalid-msg:visible')
        .toArray()
        .some(el => $(el).text().trim().length > 0);

    return hasErrorMessages;
}

function downloadFile(fileId) {
    let form = document.getElementById("downloadFileForm");
    form.target = "_blank";
    document.getElementById("downloadFileId").value = fileId;
    form.submit();
}