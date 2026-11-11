//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
var formId = "form";
var cancelButtonId = "#cancelButton";
var editorButtonRow = "#modelEditorButtonRow";
var prevButtonId = "#prevButton";
var nextButtonId = "#nextButton";
var resetButtonId = "#resetButton";
var printButtonId = "#printButton";
var alt1ButtonId = "#alt1Button";
var alt2ButtonId = "#alt2Button";
var alt3ButtonId = "#alt3Button";
var alt4ButtonId = "#alt4Button";
var alt5ButtonId = "#alt5Button";
var alt6ButtonId = "#alt6Button";
var alt7ButtonId = "#alt7Button";
var alt8ButtonId = "#alt8Button";

var cancelActionText = $("#Editor_CancelActionText").val();
var cancelActionUrl = $("#Editor_CancelActionUrl").val();
var isCancelEnabled = $("#Editor_IsCancelEnabled").val().toLowerCase() == "true";

var deleteActionText = $("#Editor_DeleteActionText").val();
var nextActionText = $("#Editor_NextActionText").val();
var prevActionText = $("#Editor_PrevActionText").val();
var resetActionText = $("#Editor_ResetActionText").val();
var saveActionText = $("#Editor_SaveActionText").val();

var printActionText = ($("#Editor_PrintActionText").val() == "") ? "Print" : $("#Editor_PrintActionText").val();
var printActionUrl = $("#Editor_PrintActionUrl").val();
var isPrintEnabled = $("#Editor_IsPrintEnabled").val().toLowerCase() === "true";

var alt1ActionText = ($("#Editor_Alt1ActionText").val() == "") ? "Alt1" : $("#Editor_Alt1ActionText").val();
var alt1ActionUrl = $("#Editor_Alt1ActionUrl").val();
var isAlt1Enabled = $("#Editor_IsAlt1Enabled").val().toLowerCase() === "true";

var alt2ActionText = ($("#Editor_Alt2ActionText").val() == "") ? "Alt2" : $("#Editor_Alt2ActionText").val();
var alt2ActionUrl = $("#Editor_Alt2ActionUrl").val();
var isAlt2Enabled = $("#Editor_IsAlt2Enabled").val().toLowerCase() === "true";

var alt3ActionText = ($("#Editor_Alt3ActionText").val() == "") ? "Alt3" : $("#Editor_Alt3ActionText").val();
var alt3ActionUrl = $("#Editor_Alt3ActionUrl").val();
var isAlt3Enabled = $("#Editor_IsAlt3Enabled").val().toLowerCase() === "true";

var alt4ActionText = ($("#Editor_Alt4ActionText").val() == "") ? "Alt4" : $("#Editor_Alt4ActionText").val();
var alt4ActionUrl = $("#Editor_Alt4ActionUrl").val();
var isAlt4Enabled = $("#Editor_IsAlt4Enabled").val().toLowerCase() === "true";

var alt5ActionText = ($("#Editor_Alt5ActionText").val() == "") ? "Alt5" : $("#Editor_Alt5ActionText").val();
var alt5ActionUrl = $("#Editor_Alt5ActionUrl").val();
var isAlt5Enabled = $("#Editor_IsAlt5Enabled").val().toLowerCase() === "true";

var alt6ActionText = ($("#Editor_Alt6ActionText").val() == "") ? "Alt6" : $("#Editor_Alt6ActionText").val();
var alt6ActionUrl = $("#Editor_Alt6ActionUrl").val();
var isAlt6Enabled = $("#Editor_IsAlt6Enabled").val().toLowerCase() === "true";

var alt7ActionText = ($("#Editor_Alt7ActionText").val() == "") ? "Alt7" : $("#Editor_Alt7ActionText").val();
var alt7ActionUrl = $("#Editor_Alt7ActionUrl").val();
var isAlt7Enabled = $("#Editor_IsAlt7Enabled").val().toLowerCase() === "true";

var alt8ActionText = ($("#Editor_Alt8ActionText").val() == "") ? "Alt8" : $("#Editor_Alt8ActionText").val();
var alt8ActionUrl = $("#Editor_Alt8ActionUrl").val();
var isAlt8Enabled = $("#Editor_IsAlt8Enabled").val().toLowerCase() === "true";

var titleFormatText = $("#Editor_TitleFormatText").val();
var editorEntityName = $("#Editor_EntityName").val();
var editorDirection = $("#Editor_Direction").val();
var editorMode = $("#Editor_Mode").val();
var editorStep = Number($("#Editor_Step").val());
var editorStepCount = Number($("#Editor_StepCount").val());
var confirmDeleteMessage = $("#Editor_ConfirmDeleteMessage").val();
var dirtyDataMessage = $("#Editor_DirtyDataMessage").val();
var ignoreDirtyData = false;
var isStepDataDirty = false;
var isDirtyDataEnabled = $("#Editor_IsDirtyDataEnabled").val().toLowerCase() == "true";
var isResetEnabled = $("#Editor_IsResetEnabled").val().toLowerCase() == "true";
var isProcessDirty = $("#Editor_IsProcessDirty").val().toLowerCase() == "true";
var showSummaryError = $("#Editor_ShowSummaryError").val().toLowerCase() == "true";
var stepPanelDictionary = {};
var pageDates = [];

//-----------------------------------------------------------------------------------------
// Document ready function
//-----------------------------------------------------------------------------------------
$(document).ready(function () {

    //-------------------------------------
    // Initialize editor step validators
    //-------------------------------------
    for (idx = 1; idx <= editorStepCount; idx++) {
        var stepId = idx;
        var validator = initEdtorStepValidator(stepId);
        stepPanelDictionary[stepId] = validator;
    }

    //-------------------------------------
    // Initialize editor controls
    //-------------------------------------
    initEdtorStep(editorStep, editorStepCount);
    getInitialPageDates();

    $(resetButtonId).prop('value', resetActionText);

    if (!isResetEnabled || editorMode == "Delete" || editorMode == "ReadOnly") {
        $(resetButtonId).hide();
    }

    $(cancelButtonId).prop('value', cancelActionText);
    if (!isCancelEnabled) {
        $(cancelButtonId).hide();
    }

    $(printButtonId).prop('value', printActionText);
    if (!isPrintEnabled) {
        $(printButtonId).hide();
    }

    $(alt1ButtonId).prop('value', alt1ActionText);
    if (!isAlt1Enabled) {
        $(alt1ButtonId).hide();
    }

    $(alt2ButtonId).prop('value', alt2ActionText);
    if (!isAlt2Enabled) {
        $(alt2ButtonId).hide();
    }

    $(alt3ButtonId).prop('value', alt3ActionText);
    if (!isAlt3Enabled) {
        $(alt3ButtonId).hide();
    }

    $(alt4ButtonId).prop('value', alt4ActionText);
    if (!isAlt4Enabled) {
        $(alt4ButtonId).hide();
    }

    $(alt5ButtonId).prop('value', alt5ActionText);
    if (!isAlt5Enabled) {
        $(alt5ButtonId).hide();
    }

    $(alt6ButtonId).prop('value', alt6ActionText);
    if (!isAlt6Enabled) {
        $(alt6ButtonId).hide();
    }

    $(alt7ButtonId).prop('value', alt7ActionText);
    if (!isAlt7Enabled) {
        $(alt7ButtonId).hide();
    }

    $(alt8ButtonId).prop('value', alt8ActionText);
    if (!isAlt8Enabled) {
        $(alt8ButtonId).hide();
    }

    $(prevButtonId).prop('value', prevActionText);

    $("input").on("keypress", function (event) {
        var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
        if (keycode == 13) {
            setEnterFunctionality();
            return false;
        }
        else {
            return true;
        }
    });

    $('.k-autocomplete, .k-dropdown, .k-multiselect').on("keypress click", function (e) {
        if (e.which === 13) {
            $(nextButtonId).click();
            return false;
        }
        else {
            return true;
        }
    });

    function setEnterFunctionality() {
        var focusElem = $(":focus");
        var focusedElemId = '#' + focusElem[0].id;

        switch (focusedElemId) {
            case prevButtonId:
                $(prevButtonId).click();
                break;

            case resetButtonId:
                 $(resetButtonId).click();
                break;

            case cancelButtonId:
                $(cancelButtonId).click();
                break;

            case printButtonId:
                $(printButtonId).click();
                break;

            case alt1ButtonId:
                $(alt1ButtonId).click();
                break;

            case alt2ButtonId:
                $(alt2ButtonId).click();
                break;

            case alt3ButtonId:
                $(alt3ButtonId).click();
                break;

            case alt4ButtonId:
                $(alt4ButtonId).click();
                break;

            case alt5ButtonId:
                $(alt5ButtonId).click();
                break;

            case alt6ButtonId:
                $(alt6ButtonId).click();
                break;

            case alt7ButtonId:
                $(alt7ButtonId).click();
                break;

            case alt8ButtonId:
                $(alt8ButtonId).click();
                break;

            default:
                $(nextButtonId).click();
                break;
        }

        // Initialize Mutation Observers
        //initMutationObservers();
        //manageLabel508Support();
    }

    //-------------------------------------
    // Define control events
    //-------------------------------------
    $(window).on('beforeunload', function () {
        if (!hasSessionExpired && (isDirtyDataEnabled && !ignoreDirtyData) && (isProcessDirty || isStepDataDirty)) {
            globalDirtyDataAlreadyFound = true;
            hideLoadingDialog();
            return dirtyDataMessage;
        }
        else {
            if (!checkForMailToLink(event)) {
                showLoadingDialog();
            }
        }
    });

    //set dirty data trigger...set dirty data if ignoredirtyData property does not exist or is not equal to true.
    $(":input[ignoredirtydata]").not("[ignoredirtydata='True']").change(function (e) {
        if (!($(this).is("[data-role='datepicker']") && e.target.value == "__/__/____")) {
            if (!(e.target.value == e.target.defaultValue) || !(e.target.checked === e.target.defaultChecked)) {
                ignoreDirtyData = false;
                isStepDataDirty = true;
                $(resetButtonId).prop('disabled', false);
            }
        }
    });

    //keyboard keyup event set dirty data trigger...set dirty data if ignoredirtyData property does not exist or is not equal to true.
    $(" :input[ignoredirtydata]").not("[ignoredirtydata='True']").keyup(function (e) {
        var code = e.KeyCode || e.which;
        //Allow all alphanumeric and special character and space and backspace
        if ((code >= 44 && code <= 90) || (code >= 96 && code <= 123) || (code >= 186 && code <= 222) || (code === 32) || (code === 8)) {
            if (!isStepDataDirty) {
                if (checkMasking($(this).attr("id"), e.target.defaultValue)) {
                    if (!(e.target.value == e.target.defaultValue)) {
                        ignoreDirtyData = false;
                        isStepDataDirty = true;
                    }
                }
            }
        }
    });

    $(cancelButtonId).click(function () {
        var cancel = checkExecuteFunctionByName("editorCancelPreprocess", false);
        if (!cancel) {
            clearGeneralMessages();
            checkExecuteFunctionByName("editorCancelPostprocess", null);
            window.location = cancelActionUrl;
        }
    });

    $(prevButtonId).click(function () {
        var cancel = checkExecuteFunctionByName("editorPreviousPreprocess", false);
        if (!cancel) {
            clearGeneralMessages();
            ignoreDirtyData = true;
            if (editorStep > 1) {
                decrementEditor();
            }
            checkExecuteFunctionByName("editorPreviousPostprocess", null);
        }
    });

    $(nextButtonId).click(function () {
        clearGeneralMessages();
        $(':focus').blur();
        var cancel = checkExecuteFunctionByName("editorNextPreprocess", false);
        var validator = stepPanelDictionary[editorStep];
        if (!cancel) {
            if (editorStep < editorStepCount) {
                if (validator.validate()) {
                    cancel = checkExecuteFunctionByName("editorNextPostValidate", false);
                    if (!cancel) {
                        incrementEditor();
                    }
                }
                else {
                    ExpandPanelOnError();
                }

            }
            else {
                if (editorMode == "Delete") {
                    if (confirm(confirmDeleteMessage)) {
                        cancel = checkExecuteFunctionByName("editorNextPostValidate", false);
                        if (!cancel) {
                            $("#Editor_Direction").val("Next");
                            $(formId).submit();
                        }
                    }
                }
                else {
                    if (validator != undefined && validator.validate()) {
                        cancel = checkExecuteFunctionByName("editorNextPostValidate", false);
                        if (!cancel) {
                            isFormDataDirty = false;
                            ignoreDirtyData = true;
                            if (!isProcessDirty) {
                                $("#Editor_IsProcessDirty").val(isStepDataDirty);
                            }
                            $("#Editor_Direction").val("Next");
                            $(formId).submit();
                        }
                    }
                }
            }
            checkExecuteFunctionByName("editorNextPostprocess", null);
        }
    });

    $(resetButtonId).click(function () {
        var cancel = checkExecuteFunctionByName("editorResetPreprocess", false);
        var validator = stepPanelDictionary[editorStep];
        if (!cancel) {
            resetEditorStep(editorStep);
            $(':input').removeClass("k-invalid");
            clearGeneralMessages();
            hideSummaryErrors();
            validator.hideMessages();
            isStepDataDirty = false;
            focusFirstElement(formId);
            $(formId).resetAllValidations();
            checkExecuteFunctionByName("editorResetPostprocess", null);
            resetRedactionWidgets(formId);
            initializeContentPanels(formId);
        }
    });

    $(printButtonId).click(function () {
        var print = checkExecuteFunctionByName("editorPrintPreprocess", false);
        if (!print) {
            if (printActionUrl !== 'undefined' && printActionUrl !== '') {
                window.open(printActionUrl, '_blank');
            }
            checkExecuteFunctionByName("editorPrintPostprocess", null);
        }
    });

    $(alt1ButtonId).click(function () {
        var alt1 = checkExecuteFunctionByName("editorAlt1Preprocess", false);
        if (!alt1) {
            if (alt1ActionUrl !== 'undefined' && alt1ActionUrl !== '') {
                window.location = alt1ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt1Postprocess", null);
        }
    });

    $(alt2ButtonId).click(function () {
        var alt2 = checkExecuteFunctionByName("editorAlt2Preprocess", false);
        if (!alt2) {
            if (alt2ActionUrl !== 'undefined' && alt2ActionUrl !== '') {
                window.location = alt2ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt2Postprocess", null);
        }
    });

    $(alt3ButtonId).click(function () {
        var alt3 = checkExecuteFunctionByName("editorAlt3Preprocess", false);
        if (!alt3) {
            if (alt3ActionUrl !== 'undefined' && alt3ActionUrl !== '') {
                window.location = alt3ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt3Postprocess", null);
        }
    });

    $(alt4ButtonId).click(function () {
        var alt4 = checkExecuteFunctionByName("editorAlt4Preprocess", false);
        if (!alt4) {
            if (alt4ActionUrl !== 'undefined' && alt4ActionUrl !== '') {
                window.location = alt4ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt4Postprocess", null);
        }
    });

    $(alt5ButtonId).click(function () {
        var alt5 = checkExecuteFunctionByName("editorAlt5Preprocess", false);
        if (!alt5) {
            if (alt5ActionUrl !== 'undefined' && alt5ActionUrl !== '') {
                window.location = alt5ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt5Postprocess", null);
        }
    });

    $(alt6ButtonId).click(function () {
        var alt6 = checkExecuteFunctionByName("editorAlt6Preprocess", false);
        if (!alt6) {
            if (alt6ActionUrl !== 'undefined' && alt6ActionUrl !== '') {
                window.location = alt6ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt6Postprocess", null);
        }
    });

    $(alt7ButtonId).click(function () {
        let alt7 = checkExecuteFunctionByName("editorAlt7Preprocess", false);
        if (!alt7) {
            if (alt7ActionUrl !== 'undefined' && alt7ActionUrl !== '') {
                window.location = alt7ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt7Postprocess", null);
        }
    });

    $(alt8ButtonId).click(function () {
        let alt8 = checkExecuteFunctionByName("editorAlt8Preprocess", false);
        if (!alt8) {
            if (alt8ActionUrl !== 'undefined' && alt8ActionUrl !== '') {
                window.location = alt8ActionUrl;
            }
            checkExecuteFunctionByName("editorAlt8Postprocess", null);
        }
    });
});

//-----------------------------------------------------------------------------------------
// Initializes the model editor for a specified step.
//-----------------------------------------------------------------------------------------
function resetDirtyData() {
    isProcessDirty = false;
    isStepDataDirty = false;
}

function decrementEditor() {
    editorStep -= 1;
    initEdtorStep(editorStep, editorStepCount);
}

function incrementEditor() {
    editorStep += 1;
    initEdtorStep(editorStep, editorStepCount);
}

function initEdtorStep(editorStep, editorStepCount) {
    var cancel = checkExecuteFunctionByName("editorInitStepPreprocess", false);
    if (!cancel) {
        //save editorStep to model field
        $('#Editor_Step').val(editorStep);

        //Hide errors
        hideSummaryErrors();

        //Show correct step and validators
        for (idx = 1; idx <= editorStepCount; idx++) {
            var stepName = "#step" + idx;
            var stepButtonRowName = stepName + "ButtonRow";
            if ($(stepName).length) {
                if (idx == editorStep) {
                    $(stepName).show();
                    $(stepName).find("[skip-data-val-required]").renameAttr("skip-data-val-required", "data-val-required");

                    if ($(stepButtonRowName).length) {
                        jQuery(editorButtonRow).detach().appendTo(stepButtonRowName);
                    }
                }
                else {
                    $(stepName).hide();
                    $(stepName).find("[data-val-required]").renameAttr("data-val-required", "skip-data-val-required");
                }
            }
        }

        //Set focus to first form visible field
        focusFirstElement(formId);

        //Format buttons
        if (editorStep == 1) {
            $(prevButtonId).hide();
        }
        else {
            $(prevButtonId).show();
        }

        if (editorStep == editorStepCount) {
            if (editorMode == "ReadOnly") {
                $(nextButtonId).hide();
            }

            else if (editorMode == "Delete") {
                $(nextButtonId).prop('value', deleteActionText);
            }
            else {
                $(nextButtonId).prop('value', saveActionText);
            }
        }
        else {
            $(nextButtonId).prop('value', nextActionText);
        }

        checkExecuteFunctionByName("editorInitStepPostprocess", false);
    }
}

function initEdtorStepValidator(stepId) {
    var stepPanelId = "#step" + stepId;
    if ($(stepPanelId).length == 0) {
        stepPanelId = "fieldset";
    }
    kendo.init(stepPanelId);
    var validator = $(stepPanelId).kendoValidator(
        {
            rules: {
                required: function (input) {
                    if (input.filter("[data-val-required]").length && $.trim(input.val()) == "") {
                        return false;
                    }
                    return true;
                },
                equalTo: function (input) {
                    if (input.filter("[data-val-equalto-other]").length) {
                        var compareToPropertyName = input.attr("id").replace("Confirmation", "");
                        return input.val() == $("#" + compareToPropertyName).val();
                    }
                    return true;
                },
                dateTimePicker: function (input) {
                    if (input.is("[data-role='datetimepicker']") && input.val() !== "") {
                        return input.data("kendoDateTimePicker").value();
                    } else {
                        return true;
                    }
                },
                datePicker: function (input) {
                    if (input.is("[data-role='datepicker']") && input.val() !== "") {
                        return setDatePattern(input[0].id);
                    } else {
                        return true;
                    }
                },
                minMaxDate: function (input) {
                    if (input.is("[data-role='datepicker']") && input.val() !== "") {
                        return checkMinMaxDate(input[0].id);
                    }
                    else {
                        return true;
                    }
                },
                redactedEIN: function (input) {
                    if (input.is("[data-widget-type='EINWithRedact']") && input.val() !== "") {
                        return checkRedactedEIN(input[0].id);
                    }
                    else {
                        return true;
                    }
                },
                redactedSSN: function (input) {
                    if (input.is("[data-widget-type='SSNWithRedact']") && input.val() !== "") {
                        return checkRedactedSSN(input[0].id);
                    }
                    else {
                        return true;
                    }
                }
            },
            messages: {
                required: function (input) {
                    return input.attr("data-val-required");
                },
                equalTo: function (input) {
                    return input.attr("data-val-equalto-other");
                },
                dateTimePicker: function (input) {
                    return input.attr("data-val-datetime");
                },
                datePicker: function (input) {
                    return input.attr("data-val-date");
                },
                minMaxDate: function (input) {
                    return input.attr("data-val-minmax-date");
                },
                redactedEIN: function (input) {
                    return input.attr("data-val-redact-regex");
                },
                redactedSSN: function (input) {
                    return input.attr("data-val-redact-regex");
                }
            },
            validateOnBlur: false,
            validate: function () {
                if (this.errors().length > 0) {
                    if (showSummaryError) {
                        showSummaryErrorSimple();
                    }
                    else {
                        hideSummaryErrors();
                    }
                    focusFirstErrorElement(formId);
                }
                else {
                    hideSummaryErrors();
                }
                setPanelValidationIndicators();
            }
        }
    ).data("kendoValidator");

    return validator;
}

function resetEditorStep(stepId) {
    var stepPanelId = "#step" + stepId;
    if ($(stepPanelId).length == 0) {
        stepPanelId = "fieldset";
    }
    $(stepPanelId + ' :input').resetValue();
    resetDropdowns(stepPanelId);
    resetPageDates();
}

function resetDropdowns(panelId) {
    $(panelId).find("input[data-role='dropdownlist']").each(function (e) {
        var ctrl = $(this).attr("id");
        var sel = $('#' + ctrl).data("kendoDropDownList")._initial;
        var id = $('#' + ctrl).parent().parent().find("input[type='hidden']:eq(0)").attr("id");
        var name = $('#' + ctrl).parent().parent().find("input[type='hidden']:eq(1)").attr("id");

        if (sel != '') {
            $('#' + id).val(sel);
            var txt = $('#' + ctrl).data('kendoDropDownList').text();
            $('#' + name).val(txt);
            $('#' + ctrl).val(sel);
        } else {
            $('#' + id).val('');
            $('#' + name).val('');
            $('#' + ctrl).val('');
            $('#' + ctrl).data('kendoDropDownList').value('');
        }
    });
}

function ExpandPanelOnError() {
    $('.panel.content-panel-container').filter(function () {
        if ($(this).find('input').hasClass('k-invalid')) {
            $(this).closest('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('fa-square-plus').addClass('fa-square-plus');

            var thisDiv = $(this).find('.content-panel-hdr-tools');
            if (thisDiv.length > 0) {
                if ($(thisDiv).hasClass('fa-square-plus')) {
                    $(thisDiv).removeClass('panel-collapsed');
                    $(thisDiv).removeClass('fa-square-plus').addClass('fa-square-minus');
                    $(thisDiv)[0].title = globalCollapse;
                }
            }
        }
    });
}

function clearPanelFields(panelId) {
    //clear data base on input type
    $(panelId + ' input, ' + panelId + ' select').each(
        function (index) {
            var input = $(this);
            var element = document.getElementById(input.attr('id'));
            if (element !== null) {
                if (input.attr('type') === 'text') {
                    if (input.attr('data-role') === 'dropdownlist') {
                        $("#" + input.attr('id')).data("kendoDropDownList").value(-1);
                    }
                    else {
                        element.value = null;
                    }
                } else if (input.attr('type') === 'checkbox') {
                    element.checked = false;
                } else if (input.attr('type') === 'radio') {
                    element.checked = false;
                } else if (input.attr('type') === 'button' || input.attr('type') === 'reset' || input.attr('type') === 'submit') {
                    //don't clear button label values
                } else {
                    if (input.attr('data-role') === 'multiselect') {
                        $("#" + input.attr('id')).data("kendoMultiSelect").value('');
                    }
                    else {
                        element.value = '';
                    }
                }
            }
        }
    );
    //clear any error messages
    var $inputs = $(panelId + ' :input');
    $inputs.each(function () {
        ClearKendoValidatorFieldMessage($(this));
    });
}

function checkMasking(controlId, defaultValue) {
    var isChange = true;
    if ($("#" + controlId).is("[data-role='datepicker']") || $("#" + controlId).is("[data-role='maskedtextbox']") || $("#" + controlId).is("[data-role='datetimepicker']")) {
        if ($("#" + controlId).data("kendoMaskedTextBox").raw() == "" && defaultValue == "") {
            isChange = false;
        }
        else {  // In case of postalcode, EIN and SSN etc...
            if ($("#" + controlId).data("kendoMaskedTextBox").raw() === defaultValue) {
                isChange = false;
            }
        }
    }
    return isChange;
}

function getInitialPageDates() {
    let pageDateInputs = $(formId + " .k-datepicker input").filter(function () {
        return $(this).closest('.k-grid').length === 0;
    });
    pageDateInputs.each(function () {
        let dateValue = $(this).data("kendoDatePicker");
        if (dateValue.value() === null) {
            pageDates.push({ id: $(this).attr("id") });
        }
    });
}

function resetPageDates() {
    for (let pageDate of pageDates) {
        if ($("#" + pageDate.id).data("kendoDatePicker") != null) {
            $("#" + pageDate.id).data("kendoDatePicker").value(null);
            $("#" + pageDate.id).data("kendoDatePicker").setOptions({
                format: formatCultureDateMask()
            });
        }
    }
}
  

