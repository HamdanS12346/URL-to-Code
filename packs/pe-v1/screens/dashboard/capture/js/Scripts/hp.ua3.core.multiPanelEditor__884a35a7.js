//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
var mpePanelDictionary = {};
var globalPanelId;
var defaultRules;
var defaultMessages;
var mpeGridInitDataDictionary = {};
var titleBarInfo = [];

//-----------------------------------------------------------------------------------------
// Document ready function
//-----------------------------------------------------------------------------------------
$(document).ready(function () {

    $(window).on('beforeunload', function () {
        if (!hasSessionExpired) {
            if (typeof globalDirtyDataAlreadyFound !== 'undefined') {
                if (globalDirtyDataAlreadyFound !== true) {
                    return mpeCheckForDirtyPanelData(event);
                }
            }
            else {
                return mpeCheckForDirtyPanelData(event);
            }
        }
    });

    // Format common UA3 blocks
    $("#reqFieldMsg").replaceWith(buildReqFieldsRow());
    $("#bnrReqFieldMsg, div[class^='bnrReqFieldMsg']").replaceWith(buildBnrReqFieldsRow());
});

//-----------------------------------------------------------------------------------------
// Internal functions
//-----------------------------------------------------------------------------------------

//Return dirty data message if any panel is dirty
function mpeCheckForDirtyPanelData(event) {
    var isPanelDirty = false;

    for (var panel in mpePanelDictionary) {
        isPanelDirty = mpePanelDictionary[panel].isDataDirty;
        if (isPanelDirty) {
            break;
        }
    }

    if (isPanelDirty) {
        hideLoadingDialog();
        return globalDirtyDataMsg;
    }
    else {
        if (!checkForMailToLink(event)) {
            showLoadingDialog();
        }
    }
}

//Clear messages from the panel
function mpeClearPanelMessages(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        if (panelDefinition.statusMsgDivId && $("#" + panelDefinition.statusMsgDivId).length > 0) {
            $("#" + panelDefinition.statusMsgDivId).empty();
        }
    }
    else {
        console.log("mpeClearPanelMessages: Unable to find panel with id ='" + panelId + "'.");
    }
}

//Clear field validation messages from the panel
function mpeClearPanelValidatorMessages(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        panelDefinition.validator.hideMessages();
        $("#" + panelId + ' :input').resetValidation();
    }
    else {
        console.log("mpeClearPanelValidatorMessages: Unable to find panel with id ='" + panelId + "'.");
    }
}

//Check if panel dirty, hide if not, otherwise display popup and return flag
function mpeHidePanel(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {

        // If MPE is used in seamless flow overlay reset the default close icon function
        // set by the overlay when hiding this MPE panel.
        if (typeof overlayCloseIconId !== 'undefined') {
            if ($(overlayCloseIconId).length) {
                setOverlayCloseIconClickEventToDefault();
            }
        }
        else {
            if ($("#overlayCloseIcon").length) {
                setOverlayCloseIconClickEventToDefault();
            }
        }

        $("#" + panelId).hide();
    }
    else {
        console.log("mpeHidePanel: Unable to find panel with id ='" + panelId + "'.");
    }
    return;
}

//Initialize validator
function mpeInitializePanelValidator(panelId) {
    var formId = panelId === "form" ? panelId : "#" + panelId;
    kendo.init("#" + panelId);
    var validator = $("#" + panelId).kendoValidator(
        {
            rules: defaultRules,
            messages: defaultMessages,
            validateOnBlur: false,
            validate: function () {
                mpeSetPanelMessage(panelId, "Error", globalValidationSummaryMsg);
                focusFirstErrorElement(formId);
                setPanelValidationIndicators();
            }
        }
    ).data("kendoValidator");

    return validator;
}

// Set Rules
function mpeSetRules(panelValidation) {
    defaultRules = {
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
        minDate: function (input) {
            var value = $(input).val();
            if (typeof (value) != "object") {
                var date = kendo.parseDate(value);
                if (date != null) {
                    var year = date.getFullYear();
                    if (year == 0) {
                        return false;
                    }
                }
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
        ignoreDisabled: function (input) {
            return true;
        },
        minMaxDate: function (input) {
            if (input.is("[data-role='datepicker']") && input.val() !== "") {
                return checkMinMaxDate(input[0].id);
            } else {
                return true;
            }
        },
        autoCompleteMustMatch: function (input) {
            if (input.is("[data-autocomplete-must-match]")) {
                var sac = input.data("kendoAutoComplete");
                var sacData = sac.dataSource.data();
                var sax = sac.value().split(" - ")[0].trim();
                if ((sax != '') && (sacData != null)) {
                    var match = $.grep(sacData, function (Item, Index) {
                        if ($.trim(Item.ID).toLowerCase() == sax.toLowerCase()) {
                            return true;
                        }
                    });
                    if (match.length != 0) {
                        sac.value(match[0].FormattedText);
                        return true;
                    }
                    return false;
                }
                return true;
            }
            return true;
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
    };

    defaultMessages = {
        required: function (input) {
            return input.attr("data-val-required");
        },
        equalTo: function (input) {
            return input.attr("data-val-equalto-other");
        },
        minDate: function (input) {
            return input.attr("data-val-date");
        },
        dateTimePicker: function (input) {
            return input.attr("data-val-datetime");
        },
        datePicker: function (input) {
            return input.attr("data-val-date");
        },
        autoCompleteMustMatch: function (input) {
            return input.attr("data-autocomplete-must-match");
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
    };

    if (panelValidation != undefined && panelValidation != null && panelValidation != '') {
        $.extend(defaultRules, panelValidation.Rules);
        $.extend(defaultMessages, panelValidation.Messages);
    }
}

//Get initial grid data
function getInitialGridData(paneId) {
    $("#" + paneId + " .k-grid ").each(function () {
        if ($("#" + $(this).attr("id")).data('kendoGrid') != null) {
            mpeGridInitDataDictionary[$(this).attr("id")] = JSON.stringify($("#" + $(this).attr("id")).data('kendoGrid').dataSource.data());
        }
    });
}

// Check if specific panel is dirty and return flag
function mpeIsPanelDirty(panelId) {
    var isPanelDirty = false;
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        isPanelDirty = panelDefinition.isDataDirty;
    }
    else {
        console.log("mpeIsPanelDirty: Unable to find panel with id ='" + panelId + "'.");
    }

    return isPanelDirty;
}

//Cancel any panel changes, reset values and hide panel
function mpePanelCancel(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {

        var kendoWindow = getModalOverlayWindow(panelId);

        if (kendoWindow) {
            mpePanelReset(panelId);
            closeModalOverlay(panelId);
            mpePopTitleBarInfoOffStack(false);
        }
        else {
            $("#" + panelId).hide();
            mpePanelReset(panelId);
        }

        if ($.isFunction(window[panelDefinition.cancelFunctionCallback])) {
            window[panelDefinition.cancelFunctionCallback]();
        }
    }
    else {
        console.log("mpePanelCancel: Unable to find panel with id ='" + panelId + "'.");
    }
}

function mpePanelClose(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    var kendoWindow = getModalOverlayWindow(panelId);

    if (kendoWindow) {
        closeModalOverlay(panelId);
        mpePopTitleBarInfoOffStack(false);
        if (panelDefinition) {
            panelDefinition.isDataDirty = false;
        }
    }
    else {
        console.log("mpePanelClose: Unable to find panel with id ='" + panelId + "'.");
    }
}

//Reset values in panel to original values
function mpePanelReset(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        mpeClearPanelMessages(panelId);
        clearGeneralMessages();
        $("#" + panelId)[0].reset();
        resetDatePicker();
        resetGrids(panelId);
        resetRedactionWidgets(panelId);
        panelDefinition.validator.hideMessages();
        $("#" + panelId + ' :input').resetValidation();
        panelDefinition.isDataDirty = false;
        focusFirstElement("#" + panelId);
        resetDropdownValues(panelId);
        initWidgets();
        if ($.isFunction(window[panelDefinition.resetFunctionCallback])) {
            window[panelDefinition.resetFunctionCallback]();
        }
        setPanelValidationIndicators();
    }
    else {
        console.log("mpePanelReset: Unable to find panel with id ='" + panelId + "'.");
    }
}

//Reset data in all the grids with original data
function resetGrids(panelId) {
    $("#" + panelId + " .k-grid").each(function () {
        if (mpeGridInitDataDictionary[$(this).attr("id")] != null && $("#" + $(this).attr("id")).data('kendoGrid') != null) {
            $("#" + $(this).attr("id")).data('kendoGrid').dataSource.data(jQuery.parseJSON(mpeGridInitDataDictionary[$(this).attr("id")]));
        }
    });
}

//Reset datapicker calender old selection
function resetDatePicker() {
    $('div.k-animation-container .k-calendar-container table tr').find('.k-state-focused').removeClass('k-state-focused');
}

// Resets the value selected in Dropdowns to the original value
function resetDropdownValues(panelId) {
    $("#" + panelId).find("input[data-role='dropdownlist']").each(function () {
        let id = $(this).parent().parent().find("input[type='hidden']:eq(0)").attr("id");
        let name = $(this).parent().parent().find("input[type='hidden']:eq(1)").attr("id");
        $(this).resetValue();
        $('#' + id).val($("#" + $(this)[0].id).data("kendoDropDownList").value());
        $('#' + name).val($("#" + $(this)[0].id).data("kendoDropDownList").text());
    });
}

//Validate panel and save data
var mpeCallbackPanel;
function mpePanelSave(panelId) {
    globalPanelId = $("#" + panelId).find('input[type="button"]:not(:disabled), a');
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        var dirtyData = panelDefinition.isDataDirty;
        globalPanelId.prop("disabled", true);
        globalPanelId.css('pointer-events', 'none');
        clearGeneralMessages();
        if (panelDefinition.validator.validate()) {
            $("#" + panelId).find('input').blur();
            var success = true;
            // Clear messages
            mpeClearPanelMessages(panelId);
            //save off callback panel
            mpeCallbackPanel = panelDefinition;

            if (mpePrePanelSaveCallback()) {
                if (mpeOverridePanelSaveCallback()) {
                    mpePanelSaveDirect(panelDefinition, panelId);
                }
            }
            else {
                globalPanelId.prop("disabled", false);
                mpePanelDictionary[panelId].isDataDirty = dirtyData;
                globalPanelId.css('pointer-events', 'auto');
            }
        }
        else {
            globalPanelId.prop("disabled", false);
            mpePanelDictionary[panelId].isDataDirty = dirtyData;
            globalPanelId.css('pointer-events', 'auto');
        }
        setPanelValidationIndicators();
    }
    else {
        console.log("mpePanelSave: Unable to find panel with id ='" + panelId + "'.");
    }
}

function mpePanelSaveDirect(panelDefinition, panelId) {
    var fieldValues = $("#" + panelId).serialize();

    makeAsyncWebApiCall(
        panelDefinition.saveWebApiUrl
        , panelDefinition.saveActionVerb
        , fieldValues
        , "application/x-www-form-urlencoded"
        , "mpePanelSaveCallback"
        , "mpePanelErrorCallback");
}

function mpePrePanelSaveCallback() {
    var returnValue = true;
    if ($.isFunction(window["Pre" + mpeCallbackPanel.saveFunctionCallback])) {
        returnValue = window["Pre" + mpeCallbackPanel.saveFunctionCallback]();
    }
    return returnValue;
}

function mpeOverridePanelSaveCallback() {
    var returnValue = true;
    if ($.isFunction(window["Override" + mpeCallbackPanel.saveFunctionCallback])) {
        returnValue = window["Override" + mpeCallbackPanel.saveFunctionCallback]();
    }
    if (!returnValue) {
        globalPanelId.css('pointer-events', 'auto');
    }
    return returnValue;
}

function mpePanelErrorCallback(errors) {
    if ($.isFunction(window[mpeCallbackPanel.errorFunctionCallback])) {
        globalPanelId.prop("disabled", false);
        returnValue = window[mpeCallbackPanel.errorFunctionCallback](errors);
    }
    globalPanelId.css('pointer-events', 'auto');
}

function mpePanelSaveCallback(result, statusCodeType) {
    // reset dirty data - should do this AFTER a successful call
    mpeCallbackPanel.isDataDirty = false;

    if ($.isFunction(window[mpeCallbackPanel.saveFunctionCallback])) {
        globalPanelId.prop("disabled", false);
        returnValue = window[mpeCallbackPanel.saveFunctionCallback](result, statusCodeType);
    }
    globalPanelId.css('pointer-events', 'auto');
}

//Register all panel properties
function mpeRegisterPanel(
    panelId
    , statusMsgDivId
    , buttonDivId
    , saveWebApiUrl
    , saveActionVerb
    , isDirtyDataEnabled
    , isCancelEnabled
    , cancelFunctionCallback
    , isResetEnabled
    , resetFunctionCallback
    , saveFunctionCallback
    , errorFunctionCallback
    , extraButtons
    , buttonLocation
    , panelValidation
    , panelTitle
    , closeFunction
    , panelHelpNode) {

    // Set Rules
    mpeSetRules(panelValidation);

    // Initialize panel validator
    var validator = mpeInitializePanelValidator(panelId);

    //Get initial grid data
    getInitialGridData(panelId);

    // Initialize button locations
    if (!buttonLocation) {
        buttonLocation = { leftButtons: "ResetButton", rightButtons: "CancelButton,SaveButton" };
    }

    // Initialize panel definition
    var panelDefinition = {
        cancelFunctionCallback: cancelFunctionCallback,
        errorFunctionCallback: errorFunctionCallback,
        isCancelEnabled: isCancelEnabled,
        isDirtyDataEnabled: isDirtyDataEnabled,
        isResetEnabled: isResetEnabled,
        isDataDirty: false,
        panelId: panelId,
        resetFunctionCallback: resetFunctionCallback,
        saveFunctionCallback: saveFunctionCallback,
        saveActionVerb: saveActionVerb,
        saveWebApiUrl: saveWebApiUrl,
        statusMsgDivId: statusMsgDivId,
        buttonDivId: buttonDivId,
        validator: validator,
        extraButtons: extraButtons,
        buttonLocation: buttonLocation
    };
    mpePanelDictionary[panelId] = panelDefinition;

    //set dirty data trigger...set dirty data if ignoredirtyData property does not exist or is not equal to true.
    $('#' + panelId + " :input[ignoredirtydata]").not("[ignoredirtydata='True']").change(function (e) {
        if (!($(this).is("[data-role='datepicker']") && e.target.value == "__/__/____")) {
            if (!(e.target.value == e.target.defaultValue) || !(e.target.checked == e.target.defaultChecked)) {
                panelDefinition.isDataDirty = true;
            }
        }
    });

    //keyboard keyup event set dirty data trigger...set dirty data if ignoredirtyData property does not exist or is not equal to true.
    $('#' + panelId + " :input[ignoredirtydata]").not("[ignoredirtydata='True']").keyup(function (e) {
        var code = e.KeyCode || e.which;
        //Allow all alphanumeric and special character and space and backspace
        if ((code >= 44 && code <= 90) || (code >= 96 && code <= 123) || (code >= 186 && code <= 222) || (code === 32) || (code === 8)) {
            if (!panelDefinition.isDataDirty) {
                if (checkMasking($(this).attr("id"), e.target.defaultValue)) {
                    if (!(e.target.value == e.target.defaultValue)) {
                        panelDefinition.isDataDirty = true;
                    }
                }
            }

        }
    });

    // Commenting out the following section as the update of a datasource may happen if someone simply changes the
    // page size of the grid, which does not constitute a real change.  Hopefully, one of the other handlers will
    // be triggered if something changes a data source.
    ////set dirty data trigger
    //$('#' + panelId + ' .k-grid').change(function (e) {
    //    $("#" + panelId + " .k-grid ").each(function () {
    //        //Set the isDataDirty flag to true when grid has any changes.
    //        if ($(this).data('kendoGrid') != null) {
    //            if ($(this).data('kendoGrid').dataSource.hasChanges()) {
    //                panelDefinition.isDataDirty = true;
    //            }
    //        }
    //    });
    //});

    // If MPE is used in seamless flow overlay overwrite the default close icon function
    // set by the overlay to the cancel function specified for this MPE panel.
    if (typeof overlayCloseIconId !== 'undefined') {
        if ($(overlayCloseIconId).length) {
            if (typeof setOverlayCloseIconClickEventToNewHandler !== 'undefined' && $.isFunction(setOverlayCloseIconClickEventToNewHandler)) {
                setOverlayCloseIconClickEventToNewHandler(cancelFunctionCallback);
            }
        }
    }
    else {
        if ($("#overlayCloseIcon").length) {
            if (typeof setOverlayCloseIconClickEventToNewHandler !== 'undefined' && $.isFunction(setOverlayCloseIconClickEventToNewHandler)) {
                setOverlayCloseIconClickEventToNewHandler(cancelFunctionCallback);
            }
        }
    }

    var kendoWindow = getModalOverlayWindow(panelId);

    if (kendoWindow) {
        mpePushTitleBarInfoOnStack(panelTitle, closeFunction, panelHelpNode, panelId);
        kendoWindow.wrapper.find(".k-i-close").parent().hide();
    }

    // Initialize panel controls
    mpeClearPanelMessages(panelId);
    mpeRenderPanelButtons(panelDefinition);
    mpeSetTabFocus(panelId);
    focusFirstElement("#" + panelId);
    focusModuleTitle();
    //changeBgColor();

    //initializeContentPanels('#' + panelId);

    // Initialize Mutation Observers
    //initMutationObservers();
}

//Register all read-only panel properties
function mpeRegisterReadOnlyPanel(
    panelId
    , statusMsgDivId
    , buttonDivId
    , buttonLocation
    , cancelFunctionCallback
    , panelTitle
    , closeFunction
    , panelHelpNode) {

    //Get initial grid data
    getInitialGridData(panelId);

    // Initialize panel validator
    var validator = mpeInitializePanelValidator(panelId);

    // Initialize button locations
    if (!buttonLocation) {
        buttonLocation = { leftButtons: "", rightButtons: "CloseButton" };
    }

    // Initialize panel definition
    var panelDefinition = {
        cancelFunctionCallback: cancelFunctionCallback,
        errorFunctionCallback: null,
        isCancelEnabled: true,
        isDirtyDataEnabled: false,
        isResetEnabled: false,
        isDataDirty: false,
        panelId: panelId,
        resetFunctionCallback: null,
        saveFunctionCallback: null,
        saveActionVerb: null,
        saveWebApiUrl: null,
        statusMsgDivId: statusMsgDivId,
        buttonDivId: buttonDivId,
        validator: validator,
        buttonLocation: buttonLocation
    };
    mpePanelDictionary[panelId] = panelDefinition;

    var kendoWindow = getModalOverlayWindow(panelId);

    if (kendoWindow) {
        mpePushTitleBarInfoOnStack(panelTitle, closeFunction, panelHelpNode, panelId);
        kendoWindow.wrapper.find(".k-i-close").parent().hide();
    }
    else {
        var modalHdr = $('.modal-panel-hdr span');
        if (modalHdr.length > 0) {
            $('.modal-panel-hdr span').attr('tabindex', '0').focus();
        }
    }

    // Initialize panel controls
    mpeClearPanelMessages(panelId);
    mpeRenderPanelButtons(panelDefinition);
    mpeSetTabFocus(panelId);
    focusFirstElement("#" + panelId);
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

function getButtonHtml(panelDefinition, button, isLeftButton) {
    var html = "";
    var btnSpacer = isLeftButton ? "btn-spacer-right" : "btn-spacer-left";
    if (button == "ResetButton") {
        if (panelDefinition.isResetEnabled) {
            html = "<input id='" + panelDefinition.panelId + button + "' type='button' value='" + globalActionButtonReset + "' class='k-button " + btnSpacer + "' onClick='mpePanelReset(&quot;" + panelDefinition.panelId + "&quot;)' />";
        }
    }
    else if (button == "CancelButton") {
        if (panelDefinition.isCancelEnabled) {
            html = "<input id='" + panelDefinition.panelId + button + "' type='button' value='" + globalActionButtonCancel + "' class='cancel k-button " + btnSpacer + "' onClick='mpePanelCancel(&quot;" + panelDefinition.panelId + "&quot;)' />";
        }
    }
    else if (button == "CloseButton") {
        html = "<input id='" + panelDefinition.panelId + button + "' type='button' value='" + globalClose + "' class='k-button " + btnSpacer + "' onClick='mpePanelCancel(&quot;" + panelDefinition.panelId + "&quot;)' />";
    }
    else if (button == "SaveButton") {
        html = "<input id='" + panelDefinition.panelId + button + "' type='button' value='" + globalActionButtonSave + "' class='k-button " + btnSpacer + " primary-button' onClick='mpePanelSave(&quot;" + panelDefinition.panelId + "&quot;)' />";
    }
    else if (button == "SubmitButton") {
        $.each(panelDefinition.extraButtons, function () {
            if (button == this.id) {
                html = "<input id='" + this.id + "' type='button' value='" + globalActionButtonSubmit + "' class='k-button " + btnSpacer + " primary-button' onClick='" + this.callbackFunction + "()' />";
            }
        });
    }

    else if (panelDefinition.extraButtons && panelDefinition.extraButtons.length > 0) {
        $.each(panelDefinition.extraButtons, function () {
            if (button == this.id) {
                html = "<input id='" + this.id + "' type='button' value='" + this.label + "' class='cancel k-button " + btnSpacer + "' onClick='" + this.callbackFunction + "()' />";
            }
        });
    }
    return html;
}

//Build panel buttons
function mpeRenderPanelButtons(panelDefinition) {
    if (panelDefinition.buttonDivId && $("#" + panelDefinition.buttonDivId).length > 0) {
        var html = "<div id='" + panelDefinition.panelId + "ButtonRow' class='editor-button-row'>";

        //Add the left aligned buttons
        var leftButtons = panelDefinition.buttonLocation.leftButtons.split(",");

        for (i = 0; i < leftButtons.length; i++) {
            html += getButtonHtml(panelDefinition, leftButtons[i].trim(), true);
        }

        html += "<span class='editor-button-nav'>";

        //Add the right aligned buttons
        var rightButtons = panelDefinition.buttonLocation.rightButtons.split(",");

        for (i = 0; i < rightButtons.length; i++) {
            html += getButtonHtml(panelDefinition, rightButtons[i].trim(), false);
        }
        html += "</span></div>";

        $("#" + panelDefinition.buttonDivId).html(html);
    }
}

function mpeSetTabFocus(panelId, firstKendoControl, lastKendoControl) {
    // NOTE: The firstKendoControl parameter is no longer being used because we don't want to bypass accessibility by
    // allowing the logic to skip fields.  Leaving the parameter in case an unusual situation presents itself where it
    // is needed in the future.
    var kendoWindow = getModalOverlayWindow(panelId);
    if (!kendoWindow) {
        panelId = "#" + panelId;
        //Set Focus while using TAB
        $('#draggableModal .editor-button-row, #draggableModal .editor-button-row-parent').on('keydown', function (e) {
            if ($(':input:not(:hidden):last').is(":focus")) {
                if (($("this:focus") && e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    focusFirstElement(panelId);
                }
            }
        });

        //Set Focus while using Shift + TAB
        var tabControl = $(panelId).find(".k-widget[aria-disabled='false']:visible:has(input:not(:disabled)),input:visible:not(:disabled),textarea:visible:not(:disabled),select:visible:not(:disabled)").first();
        tabControl.on('keydown', function (e) {
            if (($("this:focus") && e.which === 9 && e.shiftKey)) {
                // If the first input field of the panel is inside a grid (i.e. "Show inactives" check box) this form is probably a part
                // of a page that has multiple forms, so we don't want this field to be considered the first field.
                if ($(this).closest(".k-widget[data-role='grid']").length == 0) {
                    e.preventDefault();
                    focusLastElement(panelId);
                }
            }
        });
    }
    else {
        var helpIcon = kendoWindow.wrapper.find(".k-i-help");
        var closeIcon = kendoWindow.wrapper.find(".k-i-custom-close");

        if (!lastKendoControl) {
            lastKendoControl = $('#' + panelId).find(".k-widget[aria-disabled='false'][type!='hidden']:has(input:not(:disabled)),input:not(:disabled)[type!='hidden'],textarea:not(:disabled)[type!='hidden'],select:not(:disabled)[type!='hidden']").last();
        }

        // If the last field on the form has the focus and the Tab key is pressed set the focus on the help icon if it is there or the close icon if it isn't.
        $(lastKendoControl).on('keydown', function (e) {
            if ($("this:focus") && e.which === 9 && !e.shiftKey) {
                e.preventDefault();
                if (helpIcon && helpIcon.is(":visible")) {
                    helpIcon.focus();
                }
                else {
                    if (closeIcon) {
                        closeIcon.focus();
                    }
                }
            }
        });

        $(helpIcon).parent().on('keydown', function (e) {
            if ($("this:focus") && e.which === 9 && !e.shiftKey) {
                e.preventDefault();
                $(closeIcon).focus();
            }
            else {
                if ($("this:focus") && e.which === 9 && e.shiftKey) {
                    e.preventDefault();
                    $(lastKendoControl).focus();
                }
            }
        });

        $(closeIcon).parent().off('keydown').on('keydown', function (e) {
            if ($("this:focus") && e.which === 9 && e.shiftKey) {
                if (helpIcon && helpIcon.is(":visible")) {
                    e.preventDefault();
                    $(helpIcon).focus();
                }
                else {
                    e.preventDefault();
                    $(lastKendoControl).focus();
                }
            }
        });
    }
}

//Set message in panels message container
function mpeSetPanelMessage(panelId, type, message, errors) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        mpeClearPanelMessages(panelId);
        $("#" + panelDefinition.statusMsgDivId).empty();
        //check for individual field errors
        if (typeof errors != 'undefined' && errors.length > 0) {
            message += "<ul>";
            for (var idx = 0; idx < errors.length; idx++) {
                message += "<li>" + errors[idx] + "</li>";
            }
            message += "</ul>";
        }
        if (message.length > 0) {
            var item = formatGeneralMessage(type, message);
            $("#" + panelDefinition.statusMsgDivId).append(item);
            $("#" + panelDefinition.statusMsgDivId).find("span.fa-solid.fa-circle-xmark").tooltip();
            if (typeof errors != 'undefined' && errors.length > 0 && $(".msg-inline-close").length > 0) {
                $(".msg-inline-close").focus();
            }
            recenterModalOverlay(panelId);
        }
    }
    else {
        console.log("mpeSetPanelMessage: Unable to find panel with id ='" + panelId + "'.");
    }
}

//Unhide panel
function mpeShowPanel(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        $("#" + panelId).show();
    }
    else {
        console.log("mpeShowPanel: Unable to find panel with id ='" + panelId + "'.");
    }
}

//Reset the default values of fields in the panel from the panels values that have been successfully updated to backend.
//These will be the new values use if panel is reset
function mpeSetPanelDefaultValues(panelId) {
    var panelDefinition = mpePanelDictionary[panelId];
    if (panelDefinition != null) {
        //set each input default value to the current value due to data being successfully to database
        $('#' + panelId + ' :input').setDefaultValue();
    }
    else {
        console.log("mpeSetPanelDefaultValues: Unable to find panel with id ='" + panelId + "'.");
    }
}

function mpePushTitleBarInfoOnStack(overlayTitle, closeFunction, helpNode, panelId) {
    if (overlayTitle || closeFunction || helpNode) {
        setModalOverlayTitle(overlayTitle, panelId);
        setModalOverlayCloseFunction(closeFunction, panelId);
        setModalOverlayHelpNode(helpNode, panelId);
        titleBarInfo.push({
            "panelId": panelId,
            "overlayTitle": overlayTitle,
            "closeFunction": closeFunction,
            "helpNode": helpNode
        });
    }
}

function mpePopTitleBarInfoOffStack(keepCurrent) {
    if (titleBarInfo !== null && titleBarInfo.length > 0) {

        // If keepCurrent is true then we don't want to pop and we just want to refresh the title bar with the latest title info.
        if (!keepCurrent) {
            titleBarInfo.pop();
        }

        if (titleBarInfo.length > 0) {
            let panelId = titleBarInfo[titleBarInfo.length - 1].panelId;
            setModalOverlayTitle(titleBarInfo[titleBarInfo.length - 1].overlayTitle, panelId);
            setModalOverlayCloseFunction(titleBarInfo[titleBarInfo.length - 1].closeFunction, panelId);
            setModalOverlayHelpNode(titleBarInfo[titleBarInfo.length - 1].helpNode, panelId);
        }
    }
}