//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technology, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var expCollapsePanelArea;
var progressPanelArea;
var pageName;
var stepMaxCount;
var activeStep;
var pageNumber;
var tocLoaded = false;
var stepInfo;
var stepNumb;
var checkForExistingErrors = false;
var tocStepName;
var actionURL;
var routeActionName;
var routeActionID;
var isTocButtonClicked = false;
var isAddressPageInvalid = false;

$(document).ready(function () {
    if (hasRightsEnrollmentWithoutSave) {
        $("#nextButton").remove();
        $("#tocBtnPrev").addClass('primary-button');
    }
    $("#nextButton").click(function () {
        checkForExistingErrors = false;
    });
    $("#prevButton").click(function () {
        editorStep++;
    });
    activeStep = Number($('#ActiveStep').val());
    if (activeStep == 0) {
        $('#ActiveStep').val("3");
        activeStep = 3;
    }
    if (editorStep > 2 && editorStep !== 3) {
        //Load TOC
        if ($("#toc").is(':hidden') && $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value() !== "") {
            // Handle both enrollmentLocaleDataList and enrollmentTypeStepList
            if (typeof enrollmentLocaleDataList !== 'undefined' && enrollmentLocaleDataList != null) {
                processEnrollmentSteps(enrollmentLocaleDataList);
            } else if (typeof enrollmentTypeStepList !== 'undefined' && enrollmentTypeStepList != null) {
                processEnrollmentSteps(enrollmentTypeStepList.LocaleDataListItems);
            }
        }

        if (editorStep > 3 && $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value() !== "") {
            disableEnrollmentAndProviderType();
        }

        if (editorStep > 2 && tocLoaded) {
            disableEnrollmentAndProviderType();
            ChangePageTitleAndNumber(editorStep);
        }
    }
    else if (editorStep > 2 && activeStep > 3) {
        if ($("#toc").is(':hidden')) {
            // Handle both enrollmentLocaleDataList and enrollmentTypeStepList
            if (typeof enrollmentLocaleDataList !== 'undefined' && enrollmentLocaleDataList != null) {
                processEnrollmentSteps(enrollmentLocaleDataList);
            } else if (typeof enrollmentTypeStepList !== 'undefined' && enrollmentTypeStepList != null) {
                processEnrollmentSteps(enrollmentTypeStepList.LocaleDataListItems);
            }
        }
    }


    handlePreviousStepNavigation(editorStep);
    setStepperProgressLine();
});

function processEnrollmentPartialStepsSuccess(result) {
    processEnrollmentSteps(result.Data.LocaleDataListItems);
}

function processEnrollmentSteps(result) {
    stepInfo = result;
    stepMaxCount = stepInfo.length;
    expCollapsePanelArea = document.getElementById("ExpandCollapsePanelArea");
    progressPanelArea = document.getElementById("ProgressPanelArea");
    if (isSecure && isCreatedFromInternalPortal === "True") {
        createInternalPortalTOC();
        adjustStepperSteps();
        setStepperProgressLine();
    }
    else {
        createTOC();
        adjustStepperSteps();
        setStepperProgressLine();
    }
    ChangePageTitleAndNumber(editorStep);
    tocLoaded = true;
    if (result.length > 0 && editorStep > 2) {
        $("#toc").show();
        adjustStepperSteps();
        setStepperProgressLine();
    }
    else {
        $("#toc").hide();
    }

    handlePreviousStepNavigation(editorStep);
}
function createTOC() {
    $('#ExpandCollapsePanelArea').empty();
    pageName = new Array();
    pageNumber = new Array();

    // For a new enrollment
    if (activeStep == 0) {
        $('#ActiveStep').val("3");
        activeStep = 3;
    }
    var stepperLabels = [];
    var enrollmentType = $("#EnrollmentCriteria_EnrollmentTypeList").val();

    for (var i = 0; i < stepInfo.length; i++) {
        var actionName = stepInfo[i].Text;
        stepperLabels.push(actionName);
    }
    var stepper = $("#stepper").kendoStepper({
        linear: false,
        steps: stepperLabels,
        enable: true
    });
    for (var j = 0; j < stepMaxCount; j++) {
        var btnNumber = j + 1;
        var actionName = stepInfo[j].Text;
        stepNumber = Number(stepInfo[j].Order);
        tocStepName = stepInfo[j].Value;
        actionURL = "/ProviderEnrollment/" + tocStepName + "/";
        routeActionID = $("#EnrollmentApplicationId").val();
        pageName[stepNumber] = actionName;
        pageNumber[stepNumber] = btnNumber;
        var stepperItems = document.getElementById("stepper").getElementsByTagName("li")[j];
        var stepperLink = document.querySelectorAll("#stepper li a");

        if (stepNumber <= activeStep && stepNumber != editorStep) {
            stepperItems.setAttribute("class", "k-step-done k-step-success");
            stepperLink[j].setAttribute("onClick", "onStepperContentClick(" + stepNumber + "," + btnNumber + ",'" + actionURL + "')");

        } else if (stepNumber == editorStep) {
            stepperItems.setAttribute("class", "k-step-current k-step-focus");
            stepperLink[j].setAttribute("onClick", "onStepperContentClick(" + stepNumber + "," + btnNumber + ",'" + actionURL + "')");
        } else {
            stepperItems.setAttribute("class", "k-step");
            stepper = $("#stepper").getKendoStepper();
            stepper._steps[j].options.enabled = false;
        }
    };
    ChangePageTitleAndNumber(activeStep);
}
function setStepperProgressLine() {
    var stepperItems = document.getElementById("stepper").getElementsByTagName("li");
    let progressLineElm = document.querySelector("div.k-progressbar-horizontal[data-role='progressbar']");
    if (progressLineElm) {
        if (stepperItems.length < 16) {
            progressLineElm.style.width = "90%";
            progressLineElm.style.marginLeft = "4%";
        } else {
            progressLineElm.style.width = "93%";
            progressLineElm.style.marginLeft = "4%";
        }
    }
}
function onAlertSaveSuccess() {
    isStepDataDirty = false;
    FormdDataPost(routeActionName, routeActionID);
}

function onAlertSaveFailure() {
    isStepDataDirty = true;
}

function onDirtyDataSave() {
    var currentStepNumber = $("#CurrentStep").val();
    isStepDataDirty = true;
    //Bug 2735515: Submit Page-Data modified popup appears even though there were no data changes made
    //On the submit page, when the user confirms the data modification popup, mandatory field validations need to be bypassed. 
    //If we use $("#nextButton").click(); it triggers mandatory fields validations.
    //Instead of triggering the next button's click event directly, a function was created. But the logic inside the if block's function and else block's event handler is same.
    if (typeof submitStep !== 'undefined' && typeof step !== 'undefined' && submitStep == step.substring(1)) {
        proceedWithoutFieldValidation();
    } else {
        $("#nextButton").click();
    }

    if ($(':input').hasClass('k-invalid')) {
        $("#CurrentStep").val(currentStepNumber);
    }
}

function onNoDirtyData() {
    isStepDataDirty = false;
    FormdDataPost(routeActionName, routeActionID);
}

function onStepperContentClick(stepNumber, serialNumber, actionURLName) {
    stepNumb = stepNumber;
    serialNumb = serialNumber;
    routeActionName = actionURLName;
    isTocButtonClicked = true;
    routeActionID = $("#EnrollmentApplicationId").val();
    var requestverificationtoken = $('input[name="__RequestVerificationToken"]').val();
    $('#step' + stepNumber).each(function () {
        if ($(':input').hasClass('k-invalid')) {
            checkForExistingErrors = true;
        }
    });
    if ($(".field-validation-error:visible").length > 0) {
        isStepDataDirty = true;
    }
    if (hasRightsEnrollmentWithoutSave) {
        isStepDataDirty = false;
    }
    if (isStepDataDirty == true) {
        displayPopupOKCancelDialog("Warning", DataModifiedHdr, DataModified, globalYes, "onDirtyDataSave", globalNo, "onNoDirtyData");
    }
    else {
        FormdDataPost(routeActionName, routeActionID);
    }
}
function commonpanelclick(stepNumber, serialNumber, e) {
    $('#step' + stepNumber).each(function () {
        if ($(':input').hasClass('k-invalid')) {
            checkForExistingErrors = true;
        }
    });
    if (checkForExistingErrors == false) {
        if ($('#' + stepNumber).hasClass('k-step')) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

        // Dont change if the current page and the navigated page is the same.
        if (editorStep == activeStep) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

        e.stopPropagation();
        e.preventDefault();
        isStepDataDirty = false;

    }

    return false;
}


var serialNumb;
var dirtyevent;
function onPanelTableContentClick(stepNumber, serialNumber, actionURLName, e) {
    isTocButtonClicked = true;
    stepNumb = stepNumber;
    serialNumb = serialNumber;
    dirtyevent = e;
    routeActionName = actionURLName;
    routeActionID = $("#EnrollmentApplicationId").val();
    if (stepNumber == Number($("#CurrentStep").val())) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    if ($(".field-validation-error:visible").length > 0) {
        isStepDataDirty = true;
    }

    if (isStepDataDirty == true) {
        displayPopupOKCancelDialog("Warning", DataModifiedHdr, DataModified, globalYes, "onDirtyDataSave", globalNo, "onNoDirtyData");
    }
    else {
        FormdDataPost(routeActionName, routeActionID);
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}
function changeClassOfTocButton(oldActiveStep, newActiveStep) {
    createTOC();
    $('#' + "Progressbar" + oldActiveStep).removeClass('toc-progress-active');
    $('#' + "Progressbar" + oldActiveStep).addClass('toc-progress-visited');

    $('#' + "Progressbar" + newActiveStep).removeClass('toc-progress-standard');
    $('#' + "Progressbar" + newActiveStep).addClass('toc-progress-active');
}

function ChangePageTitleAndNumber(stepNumber) {
    TOCbuttonClicked = true;
    var activeStepSerialNumber = pageNumber[stepNumber];
    var pageTitle = pageName[stepNumber];
    var stepNum = stepInfoName.replace('{0}', activeStepSerialNumber);
    document.getElementById('stepNumber').innerHTML = stepNum;
    document.getElementById('stepPageTitle').innerHTML = pageTitle;
    var stepcount = stepInfoCount.replace('{0}', activeStepSerialNumber).replace('{2}', stepMaxCount);
    document.getElementById('stepPageNumber').innerHTML = stepcount;
}
//globalDirtyDataMsg
function editorStepCancel() {
    $(cancelButtonId).click();

}

function editorStepPrevious() {
    $(prevButtonId).click();
}

function editorStepSave() {
    $(nextButtonId).click();
    isStepDataDirty = (isAddressPageInvalid) ? true : false;
}


function initializeWizardControls() {
    if ($("#toc").is(':hidden') && $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value() != "") {
        // Handle both enrollmentLocaleDataList and enrollmentTypeStepList
        if (typeof enrollmentLocaleDataList !== 'undefined' && enrollmentLocaleDataList != null) {
            processEnrollmentSteps(enrollmentLocaleDataList);
        } else if (typeof enrollmentTypeStepList !== 'undefined' && enrollmentTypeStepList != null) {
            processEnrollmentSteps(enrollmentTypeStepList.LocaleDataListItems);
        }
    }

    if (editorStep > 3 && $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList").value() != "") {
        disableEnrollmentAndProviderType();
    }

    if (editorStep > 2 && tocLoaded) {
        ChangePageTitleAndNumber(editorStep);
    }
}

function disableEnrollmentAndProviderType() {
    var enrollmentTypeDropDown = $("#EnrollmentCriteria_EnrollmentTypeList").data("kendoDropDownList");
    enrollmentTypeDropDown.enable(false);

    var providerTypeDropDown = $("#EnrollmentCriteria_ProviderTypeList").data("kendoDropDownList");
    if (providerTypeDropDown.value() != "") {
        providerTypeDropDown.enable(false);
    }
}

function createInternalPortalTOC() {
    $('#ExpandCollapsePanelArea').empty();
    pageName = new Array();
    pageNumber = new Array();

    activeStep = Number($('#ActiveStep').val());

    // For a new enrollment
    if (activeStep == 0) {
        $('#ActiveStep').val("3");
        activeStep = 3;
    }
    var stepperLabels = [];
    var enrollmentType = $("#EnrollmentCriteria_EnrollmentTypeList").val();
    for (var i = 0; i < stepInfo.length; i++) {
        var actionName = stepInfo[i].Text;
        stepperLabels.push(actionName);
    }
    var stepper = $("#stepper").kendoStepper({
        linear: false,
        steps: stepperLabels,
        enable: true
    });

    for (var i = 0; i < stepInfo.length; i++) {
        var btnNumber = i + 1;
        stepNumber = Number(stepInfo[i].Order);
        tocStepName = stepInfo[i].Value === enrollmentCreateActionName ? secureEnrollmentCreateActionName : stepInfo[i].Value;
        var actionName = stepInfo[i].Text;
        stepNumber = Number(stepInfo[i].Order);
        tocStepName = stepInfo[i].Value === enrollmentCreateActionName ? secureEnrollmentCreateActionName : stepInfo[i].Value;
        actionURL = "/ProviderEnrollment/" + tocStepName + "/";

        pageName[stepNumber] = actionName;
        pageNumber[stepNumber] = btnNumber;
        var stepperItems = document.getElementById("stepper").getElementsByTagName("li")[i];
        var stepperLink = document.querySelectorAll("#stepper li a");
        var item;

        if ((stepNumber <= activeStep && stepNumber != editorStep) || ((editorStep > "5" || activeStep > "5") && !(stepNumber == editorStep && stepNumber == activeStep) && !(stepNumber == editorStep && stepNumber != activeStep))) {
            stepperItems.setAttribute("class", "k-step-done k-step-success");
            stepperLink[i].setAttribute("onClick", "onStepperContentClick(" + stepNumber + "," + btnNumber + ",'" + actionURL + "')");
        }
        else if (stepNumber == editorStep) {
            stepperItems.setAttribute("class", "k-step-current k-step-focus");
            stepperLink[i].setAttribute("onClick", "onStepperContentClick(" + stepNumber + "," + btnNumber + ",'" + actionURL + "')");
        }
        else {
            stepperItems.setAttribute("class", "k-step");
            stepper = $("#stepper").getKendoStepper();
            stepper._steps[i].options.enabled = false;
        }
    }

    ChangePageTitleAndNumber(activeStep);
}

function handlePreviousStepNavigation(editorStep) {
    editorStep > 3 ? $("#tocBtnPrev").show() : $("#tocBtnPrev").hide();
    editorStep > 3 ? $("#prevButton").show() : $("#prevButton").hide();
}
