//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var forgotPasswordFormId = "ForgotPasswordForm";
var multifactorAuthenticationFormId = "MultifactorAuthenticationForm";
var resumeEnrollmentResult = "";

$(document).ready(function () {
    if (enablePasswordInputFlag) {
        setFieldAsRequired("Password", "Password");
    } else {
        setFieldAsNotRequired("Password", "Password");
    }

    initializeCaqhRefreshControls();
});

//---------------------------------------------
// Model Editor Event Hooks
//---------------------------------------------
function editorCancelPreprocess() {
    var cancel = false;

    //Add logic here

    return cancel;
}

function editorCancelPostprocess() {
    //Add logic here
}

function editorPreviousPreprocess() {
    var cancel = false;

    //Add logic here

    return cancel;
}

function editorPreviousPostprocess() {
    //Add logic here
}

function editorNextPreprocess() {
    var cancel = false;

    // Show radio validation message (don't cancel - let framework validate other fields too)
    if (isEnableRefreshCaqh && !isSecure && !isRevalidate) {
        validateResumeCAQHEnrollmentSelection();
    }

    return cancel;
}

function editorNextPostValidate() {
    var cancel = false;

    // Block submission if radio button is not selected and show validation message
    if (isEnableRefreshCaqh && !isSecure && !isRevalidate) {
        if (!validateResumeCAQHEnrollmentSelection()) {
            cancel = true;
            return cancel;
        }
    }

    processEnrollmentResume();
    cancel = true;
    return cancel;
}

function editorNextPostprocess() {
    //Add logic here
}

function editorResetPreprocess() {
    var cancel = false;

    //Add logic here

    return cancel;
}

function editorResetPostprocess() {
    //Add logic here
}

function editorInitStepPreprocess() {
    var cancel = false;

    //Add logic here

    return cancel;
}

function editorInitStepPostprocess() {
    initializeWizardControls();
}

function initializeWizardControls() {
    if (!isSecure && isEnableMultiFactorAuthentication) {
        $(nextButtonId).prop('value', buttonGenerateAuthenticationCode);
    }
    else {
        $(nextButtonId).prop('value', buttonResumeText);
    }
}

//---------------------------------------------
// Resume Enrollment functions
//---------------------------------------------
function processEnrollmentResume() {
    // Always call standard Resume first for authentication
    makeAsyncWebApiCall(resumeWebApiUrl, "POST", $(formId).serialize(), "application/x-www-form-urlencoded", "processEnrollmentResumeSuccess");
}

function processEnrollmentResumeSuccess(result) {
    resumeEnrollmentResult = result;
    if (result.IsValid && isSecure === false && isEnableMultiFactorAuthentication) {
        openModalOverlay(multifactorAuthenticationFormId, multiFactorAuthenticationMvcUrl, 'panelForm-col-3', null, { trackingNumber: $("#TrackingNumber").val() });
    }
    else if (result.IsValid) {
        navigateToNextStep();
    }
}

function navigateToNextStep() {
    isStepDataDirty = false;
    var panelDefinition = mpePanelDictionary["MultifactorAuthenticationForm"];
    if (panelDefinition != null) {
        panelDefinition.isDataDirty = false;
    }

    let caqhIdValue = $("#CAQHID").val();
    let result = resumeEnrollmentResult;
    if (isEnableRefreshCaqh && !isSecure && !isRevalidate && result.Data.IsCAQHEnrollment && (!caqhIdValue || caqhIdValue.trim() === "")) {
        displayPopupDialog("Error", caqhProviderNotFoundTitle, caqhDataNotFound);
        return;
    }

    if (isEnableRefreshCaqh && !isSecure && !isRevalidate) {
        if (caqhIdValue && caqhIdValue.trim() !== "") {
            const enteredCaqhId = caqhIdValue.trim().toLowerCase();
            const storedCaqhId = (result.Data.CaqhId || "").trim().toLowerCase();

            if (!result.Data.IsCAQHEnrollment || !storedCaqhId || storedCaqhId !== enteredCaqhId) {
                displayPopupDialog("Error", caqhProviderNotFoundTitle, caqhDataNotFound);
                return;
            }

            makeAsyncWebApiCall(updateCAQHWebApiUrl, "POST", $(formId).serialize(), "application/x-www-form-urlencoded", "processCAQHRefreshSuccess", "processCAQHRefreshFailure");
            return;
        }
    }

    performNavigation();
}

function processCAQHRefreshSuccess(result) {
    if (result.IsValid) {
        resumeEnrollmentResult = result;
    }
    performNavigation();
}

function processCAQHRefreshFailure(result) {
    hideSummaryErrors();
    let title;
    let msg;
    switch (result.length) {
        case 1:
            // Single error - could be CAQH Provider Type or CAQH Provider Location not found
            if (result[0] == caqhDataNotFound) {
                title = caqhProviderNotFoundTitle;
                msg = caqhDataNotFound;
                displayPopupDialog("Error", title, msg);
            }
            else if (result[0] == caqhProviderDetailsNotFound) {
                title = caqhProviderNotFoundTitle;
                msg = caqhProviderDetailsNotFound;
                displayPopupDialog("Error", title, msg);
            }
            else if (result[0] == caqhUpdateIncomplete) {
                title = caqhUpdateIncompleteTitle;
                msg = caqhUpdateIncomplete;
                displayPopupDialog("Info", title, msg);
            }
            break;
        case 2:
            // Two errors - both CAQH Provider Type and CAQH Provider Location not found
            title = caqhProviderNotFoundTitle;
            msg = caqhDataNotFound;
            displayPopupDialog("Error", title, msg);
            break;
        default:
            break;
    }
}
function performNavigation() {
    var result = resumeEnrollmentResult;
    var actionURL;
    if (result.Data.Message != null && result.Data.Message.length > 2) {
        actionURL = result.Data.Message;
        if (isSecure && result.Data.Message === enrollmentCreateActionName) {
            actionURL = createSecureEnrollmentMvcUrl;
        }
    }
    else if (result.Data.Message != null && result.Data.Message == "23") {
        actionURL = submitEnrollmentMvcUrl;
    }
    else {
        if (isSecure) {
            actionURL = createSecureEnrollmentMvcUrl;
        }
        else {
            actionURL = createEnrollmentMvcUrl;
        }
    }

    FormdDataPost(actionURL, result.Data.EnrollmentApplicationId);
}

function forgotPassword() {
    openModalOverlay(forgotPasswordFormId, forgetPasswordMvcUrl, 'panelForm-col-4', null, null);
}

//---------------------------------------------
// CAQH Refresh Enrollment functions
//---------------------------------------------
function initializeCaqhRefreshControls() {
    let isSecurePortal = (typeof isSecure !== 'undefined') && isSecure;
    if (typeof isEnableRefreshCaqh === 'undefined' || !isEnableRefreshCaqh || isSecurePortal) {
        $("#resumeCAQHEnrollmentContainer").hide();
        $("#caqhIdContainer").hide();
        $("#caqhInstructionalText").hide();
        $("#standardInstructionalText").show();
        return;
    }

    if (isSetDefaultResumeCAQH) {
        $("#caqhIdContainer").show();
        $("#caqhInstructionalText").show();
        $("#standardInstructionalText").hide();
        setFieldAsRequired("CAQHID", "CAQHID");
    } else {
        $("#caqhIdContainer").hide();
        $("#caqhInstructionalText").hide();
        $("#standardInstructionalText").show();
        setFieldAsNotRequired("CAQHID", "CAQHID");
    }

    $("input[name='IsResumeCAQHEnrollment']").on("change", function () {
        clearResumeCAQHEnrollmentValidation();
        toggleCaqhRefreshFields();
    });
}

function validateResumeCAQHEnrollmentSelection() {
    let selectedValue = $("input[name='IsResumeCAQHEnrollment']:checked").val();
    if (selectedValue === undefined) {
        setKendoValidatorFieldMessage($('[id*=IsResumeCAQHEnrollment]'), resumeCAQHEnrollmentRequiredMessage);
        return false;
    }
    return true;
}

function clearResumeCAQHEnrollmentValidation() {
    $('[id*=IsResumeCAQHEnrollment]').resetValidation();
}

function toggleCaqhRefreshFields() {
    var selectedValue = $("input[name='IsResumeCAQHEnrollment']:checked").val();

    if (selectedValue === "true") {
        $("#caqhIdContainer").show();
        $("#caqhInstructionalText").show();
        $("#standardInstructionalText").hide();
        setFieldAsRequired("CAQHID", "CAQHID");
        $("#TrackingNumber").val("");
        $("#Password").val("");
    } else {
        $("#caqhIdContainer").hide();
        $("#caqhInstructionalText").hide();
        $("#standardInstructionalText").show();
        setFieldAsNotRequired("CAQHID", "CAQHID");
        $("#CAQHID").val("");
        $("#CAQHID").resetValidation();
        $("#TrackingNumber").val("");
        $("#Password").val("");
    }

    // Refresh validation state for Tracking ID and Password fields
    $("#TrackingNumber").resetValidation();
    $("#Password").resetValidation();

    // Clear panel error indicator and hide validation summary
    $(".content-panel-container").removeClass("content-panel-container-error");
    hideSummaryErrors();
}