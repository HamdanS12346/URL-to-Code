//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var addressSearchViewPanel = "AddressSearchViewPanel";
var workStructForPanelFields;
var workListOfAddressTypeFields = new Array();
var functionSettings;
var isAVExecuting = false;
var isStateRestricted = false;
var isRestrictedByTenantState = false;
var enteredPostalCode;

var avProcessStatus = {
    fieldBeingProcessed: {
        name: "",
        id: "",
        shouldAVBeEvaluated: true,
        wasAVFunctionEvaluated: false,
        wasChangedFieldProcessed: false,
        wasAVServiceCalled: false,
        wasAVServiceSuccessful: false,
        wasAnAddressSuggested: false,
        wasASuggestedAddressSelected: false,
        wasPopupCalled: false
    },
    lastFieldProcessed: {
        name: "",
        id: "",
        shouldAVBeEvaluated: true,
        wasAVFunctionEvaluated: false,
        wasChangedFieldProcessed: false,
        wasAVServiceCalled: false,
        wasAVServiceSuccessful: false,
        wasAnAddressSuggested: false,
        wasASuggestedAddressSelected: false,
        wasPopupCalled: false
    }
};

var avProcessStatusHistory = new Array();

var defaultFunctionSettings = {
    additionalFunctions: {
        Line1: {
            preFunction: "",
            avFunction: "enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields))",
            posFunction: ""
        },
        Line2: {
            preFunction: "",
            avFunction: "enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields))",
            posFunction: ""
        },
        City: {
            preFunction: "",
            avFunction: "enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields))",
            posFunction: ""
        },
        County: {
            preFunction: "",
            avFunction: "enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields))",
            posFunction: ""
        },
        State: {
            preFunction: "",
            avFunction: "stateAddressValidation()",
            posFunction: ""
        },
        Country: {
            preFunction: "",
            avFunction: "enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields))",
            posFunction: ""
        },
        PostalCode: {
            preFunction: "",
            avFunction: "enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields))",
            posFunction: ""
        },
        onAddressValidationServiceSuccess: {
            preFunction: "",
            avFunction: "processOnAddressValidationServiceSuccess(result)",
            posFunction: ""
        }
    },
    shouldAddressSelectedFromValidatorPopupReplaceFields: "true"
};

var suggestedValidAddress = {
    city: "",
    line1: "",
    postalCode: ""
}
var isAddressSuggestValidated = false;
var errorMessage = "";
var clickAction = "";

function registerChangeFieldsForAddressValidator(parm) {

    if (!isAddressRegistered(parm)) {
        workListOfAddressTypeFields.push(parm);
    }

    $(parm.Line1).change(function () {
        avFunctionsToExecute(parm, "Line1");
    });

    $(parm.Line2).change(function () {
        avFunctionsToExecute(parm, "Line2");
    });

    $(parm.City).change(function () {
        avFunctionsToExecute(parm, "City");
    });

    $(parm.State).change(function () {
        avFunctionsToExecute(parm, "State");
    });

    $(parm.Country).change(function () {
        avFunctionsToExecute(parm, "Country");
    });

    $(parm.PostalCode).change(function () {
        if (!isAVExecuting) {
            isAVExecuting = true;
            avFunctionsToExecute(parm, "PostalCode");
        }
    });

    if (parm.County) {
        $(parm.County).change(function () {
            avFunctionsToExecute(parm, "County");
        });
    }

    isStateRestricted = (parm.restrictions && parm.restrictions.TenantStateRestriction);
}


function setAddresSuggestionConfigurations(e) {

    if ((e.sender) && (e.sender.table[0].rows.length > 0) && containsOnlyPOBoxAddresses(e.sender)) {
        e.sender.hideColumn("Number");
    }
    setKendoGridDataBoundEvents(e, null, null, null);
}

function isAddressRegistered(parm) {
    for (structIndex = 0; structIndex < workListOfAddressTypeFields.length; structIndex++) {

        if (workListOfAddressTypeFields[structIndex].AddressType == parm.AddressType
            && workListOfAddressTypeFields[structIndex].Line1 == parm.Line1
            && workListOfAddressTypeFields[structIndex].Line2 == parm.Line2
            && workListOfAddressTypeFields[structIndex].suggestedAddressResult.Latitude == parm.suggestedAddressResult.Latitude) {
            return true;
        }
    }
    return false;
}

function avFunctionsToExecute(parm, field) {
    workStructForPanelFields = parm;
    functionSettings = defaultFunctionSettings;
    functionSettings = getAVFieldSettings(parm, functionSettings);

    avProcessStatus.fieldBeingProcessed = {
        name: field,
        id: workStructForPanelFields[field],
        shouldAVBeEvaluated: true,
        wasAVFunctionEvaluated: false,
        wasChangedFieldProcessed: false,
        wasAVServiceCalled: false,
        wasAVServiceSuccessful: false,
        wasAnAddressSuggested: false,
        wasASuggestedAddressSelected: false,
        wasPopupCalled: false
    };

    const avFieldFunction = functionSettings.additionalFunctions[field]["preFunction"];
    if (avFieldFunction) {
        executeAdditionalFunction(avFieldFunction)
    }
    processAVFunction();
}

function executeAdditionalFunction(avAdditionalFieldFunction) {
    if (typeof avAdditionalFieldFunction === 'function') {
        avAdditionalFieldFunction();
    }
    else if (typeof avAdditionalFieldFunction === 'string') {
        stringtoFunctionmatch(avAdditionalFieldFunction);
    }
}

function processAVFunction() {
    if (avProcessStatus.fieldBeingProcessed.shouldAVBeEvaluated) {
        const functionInfo = functionSettings.additionalFunctions[avProcessStatus.fieldBeingProcessed.name]["avFunction"];

        if (typeof functionInfo === 'string') {
            stringtoFunctionmatch(functionInfo);
        }

        avProcessStatus.fieldBeingProcessed.wasAVFunctionEvaluated = true;
    }
}

function stringtoFunctionmatch(field) {
    const functionMatch = field.match(/(\w+)\((.*)\)/);
    if (functionMatch && functionMatch[1]) {
        const functionName = functionMatch[1];
        const argString = functionMatch[2].trim();
        const func = window[functionName];

        if (typeof func === 'function') {
            let args = [];

            if (argString.length > 0) {
                try {
                    args = argString.split(',').map(arg => {
                        let argParams = [];
                        const argMatch = arg.match(/(\w+)\((.*)\)/);

                        if (argMatch) {
                            const subFunctionName = argMatch[1];
                            argParams = argMatch[2].split(',').map(argParam => {
                                let argParamObj = argParam.trim().replace(/['"]/g, '');
                                return (typeof window[argParamObj] !== "undefined") ? window[argParamObj] : argParamObj;
                            });

                            if (typeof window[subFunctionName] === "function") {
                                return window[subFunctionName](...argParams);
                            }
                            else {
                                return (typeof window[arg] !== "undefined") ? window[arg] : arg;
                            }
                        }
                        else {
                            return (typeof window[arg] !== "undefined") ? window[arg] : arg;
                        }
                    });
                } catch (error) {
                    console.error("Error evaluating arguments: ", error);
                    return;
                }
            }

            func(...args);
        }
    }
}

function processPosFunction() {
    const serviceSuccessPosFunction = functionSettings.additionalFunctions["onAddressValidationServiceSuccess"]["posFunction"];
    if (serviceSuccessPosFunction) {
        executeAdditionalFunction(fieldPosFunction);
    }
    if (functionSettings.additionalFunctions[avProcessStatus.fieldBeingProcessed.name]) {
        const fieldPosFunction = functionSettings.additionalFunctions[avProcessStatus.fieldBeingProcessed.name]?.["posFunction"];
        if (fieldPosFunction) {
            executeAdditionalFunction(fieldPosFunction);
        }
    }
    isAVExecuting = false;
    processFieldStatistics();
}

function processFieldStatistics() {
    avProcessStatus.lastFieldProcessed = {
        name: avProcessStatus.fieldBeingProcessed.name,
        id: avProcessStatus.fieldBeingProcessed.id,
        shouldAVBeEvaluated: avProcessStatus.fieldBeingProcessed.shouldAVBeEvaluated,
        wasAVFunctionEvaluated: avProcessStatus.fieldBeingProcessed.wasAVFunctionEvaluated,
        wasChangedFieldProcessed: true,
        wasAVServiceCalled: avProcessStatus.fieldBeingProcessed.wasAVServiceCalled,
        wasAVServiceSuccessful: avProcessStatus.fieldBeingProcessed.wasAVServiceSuccessful,
        wasAnAddressSuggested: avProcessStatus.fieldBeingProcessed.wasAnAddressSuggested,
        wasASuggestedAddressSelected: avProcessStatus.fieldBeingProcessed.wasASuggestedAddressSelected,
        wasPopupCalled: avProcessStatus.fieldBeingProcessed.wasPopupCalled
    };

    avProcessStatus.fieldBeingProcessed = {
        name: "",
        id: "",
        shouldAVBeEvaluated: true,
        wasAVFunctionEvaluated: false,
        wasChangedFieldProcessed: false,
        wasAVServiceCalled: false,
        wasAVServiceSuccessful: false,
        wasAnAddressSuggested: false,
        wasASuggestedAddressSelected: false,
        wasPopupCalled: false
    };
    $(workStructForPanelFields.PostalCode).focus();
    avProcessStatusHistory.push(avProcessStatus.lastFieldProcessed);
}

function getAVFieldSettings(parm, settings) {
    var paramsLines = ['Line1', 'Line2', 'City', 'State', 'Country', 'PostalCode', 'County', 'onAddressValidationServiceSuccess'];
    for (var i = 0; i < paramsLines.length; i++) {
        if (!(typeof parm.additionalFunctions === 'undefined') && !(parm.additionalFunctions === null)) {
            if (!(typeof parm.additionalFunctions[paramsLines[i]] === 'undefined') && !(parm.additionalFunctions[paramsLines[i]] === null)) {
                if (!(typeof parm.additionalFunctions[paramsLines[i]]["preFunction"] === 'undefined') && !(parm.additionalFunctions[paramsLines[i]]["preFunction"] === null)) {
                    settings.additionalFunctions[paramsLines[i]]["preFunction"] = parm.additionalFunctions[paramsLines[i]]["preFunction"];
                }
            }
        }

        if (!(typeof parm.additionalFunctions === 'undefined') && !(parm.additionalFunctions === null)) {
            if (!(typeof parm.additionalFunctions[paramsLines[i]] === 'undefined') && !(parm.additionalFunctions[paramsLines[i]] === null)) {
                if (!(typeof parm.additionalFunctions[paramsLines[i]]["avFunction"] === 'undefined') && !(parm.additionalFunctions[paramsLines[i]]["avFunction"] === null)) {
                    settings.additionalFunctions[paramsLines[i]]["avFunction"] = parm.additionalFunctions[paramsLines[i]]["avFunction"];
                }
            }
        }

        if (!(typeof parm.additionalFunctions === 'undefined') && !(parm.additionalFunctions === null)) {
            if (!(typeof parm.additionalFunctions[paramsLines[i]] === 'undefined') && !(parm.additionalFunctions[paramsLines[i]] === null)) {
                if (!(typeof parm.additionalFunctions[paramsLines[i]]["posFunction"] === 'undefined') && !(parm.additionalFunctions[paramsLines[i]]["posFunction"] === null)) {
                    settings.additionalFunctions[paramsLines[i]]["posFunction"] = parm.additionalFunctions[paramsLines[i]]["posFunction"];
                }
            }
        }
    }

    if (!(typeof parm.shouldAddressSelectedFromValidatorPopupReplaceFields === 'undefined') && !(parm.shouldAddressSelectedFromValidatorPopupReplaceFields === null)) {
        settings.shouldAddressSelectedFromValidatorPopupReplaceFields = parm.shouldAddressSelectedFromValidatorPopupReplaceFields;
    }

    return settings;
}

function getListOfFieldsValuesForAddressValidation(parm) {
    var jsListOfFieldsValuesForAddressValidator = {
        Line1: $(parm.Line1).val(),
        Line2: $(parm.Line2).val(),
        City: $(parm.City).val(),
        "States.ID": $(parm.State).data("kendoDropDownList").value(),
        PostalCode: $(parm.PostalCode).val(),
        "Country.ID": $(parm.Country).data("kendoDropDownList").value(),
        Country: $(parm.Country).data("kendoDropDownList").value(),
        Source: parm.Source,
        AddressTypeName: parm.AddressType,
        IsTenantStateRestricted: isRestrictedByTenantState
    };

    return jsListOfFieldsValuesForAddressValidator;
}

function enteredAddressValidation(addressFields) {
    if (areAddressFieldsFilled(addressFields)) {
        if (addressFields.Country == "US") {
            $(':focus').blur();
            avValidateAddress(addressFields);
        }
        else {
            displayPopupOKCancelDialog("Warning", addressValidationAddressConfirmationHeader, addressValidationAddressConfirmationMessage, globalYes, "acceptInvalidAddress", globalNo, "clearAddressFields");
        }
    }
}

function areAddressFieldsFilled(addressFields) {
    var postalCodeRegex = /\d\d\d\d\d/;
    var postalUndes = addressFields.PostalCode;

    if (postalUndes) {
        if (postalUndes.substring(postalUndes.length - 4, postalUndes.length).indexOf("_") >= 0) {
            postalUndes = postalUndes.substring(0, 5) + "-0000";
            addressFields.PostalCode = postalUndes;
        }
    }

    return addressFields.Line1
        && addressFields.City
        && addressFields.PostalCode
        && postalCodeRegex.test(addressFields.PostalCode)
        && addressFields["Country.ID"]
        && addressFields.Country
        && addressFields["States.ID"];
}

function avValidateAddress(addressFields) {
    if (isAddressValidationEnabled == "True") {
        avProcessStatus.fieldBeingProcessed.wasAVServiceCalled = true;
        enteredPostalCode = addressFields.PostalCode;
        makeAsyncWebApiCall(addressValidationValidateAddressWebApiUrl, "PUT", addressFields, "application/x-www-form-urlencoded", "onAddressValidationServiceSuccess", "onAddressValidationServiceError");
    }
    else {
        markNotValidAddress();
        onAddressValidationServiceSuccess();
    }
}

function displayInvalidAddressTypeMessage(result) {
    setKendoValidatorFieldMessage($(workStructForPanelFields.Line1), result.Data.ValidationMessage);
    markNotValidAddress();
    errorMessage = result.Data.ValidationMessage;
    $(workStructForPanelFields.suggestedAddressResult.ContainsInvalidType).val(true);
    $(workStructForPanelFields.suggestedAddressResult.AddressConfirmed).val(true);
}

function onAddressValidationServiceError(result) {
    avProcessStatus.fieldBeingProcessed.wasAVFunctionEvaluated = true;
    avProcessStatus.fieldBeingProcessed.wasChangedFieldProcessed = false;
    avProcessStatus.fieldBeingProcessed.wasAVServiceCalled = true;
    avProcessStatus.fieldBeingProcessed.wasAVServiceSuccessful = false;
    avProcessStatus.fieldBeingProcessed.wasAnAddressSuggested = false;
    avProcessStatus.fieldBeingProcessed.wasASuggestedAddressSelected = false;
    avProcessStatus.fieldBeingProcessed.wasPopupCalled = false;
    isAVExecuting = false;
    setIsMROSaveNotValidated();
    processFieldStatistics();
}

function setIsMROSaveNotValidated() {
    if (parentFormId == "MedicalRelatedOrganizationEditForm") {
        isAddressSuggestValidated = false;
        suggestedValidAddress.city = "";
        suggestedValidAddress.line1 = "";
        suggestedValidAddress.postalCode = "";
    }
}

function setIsMROSaveValidated() {
    if (parentFormId == "MedicalRelatedOrganizationEditForm") {
        suggestedValidAddress.city = $(workStructForPanelFields.City).val();
        suggestedValidAddress.line1 = $(workStructForPanelFields.Line1).val();
        suggestedValidAddress.postalCode = $(workStructForPanelFields.PostalCode).val();
        isAddressSuggestValidated = true;
        errorMessage = "";
        $(workStructForPanelFields.suggestedAddressResult.ContainsInvalidType).val(false);
    }
}

function onAddressValidationServiceSuccess(result) {
    avProcessStatus.fieldBeingProcessed.wasAVServiceSuccessful = true;
    const serverSuccessPreFunction = functionSettings.additionalFunctions["onAddressValidationServiceSuccess"]["preFunction"]
    if (serverSuccessPreFunction) {
        executeAdditionalFunction(serverSuccessPreFunction);
    }

    var avFunction = functionSettings.additionalFunctions["onAddressValidationServiceSuccess"]["avFunction"];
    if (typeof avFunction === 'function') {
        avFunction();
    } else if (typeof avFunction === 'string') {
        var funcName = avFunction.split('(')[0];
        var func = window[funcName];
        if (typeof func === 'function') {
            func(result);
        }
    }
    isAVExecuting = false;
    if (result.Data.ValidationMessage != null) {
        setIsMROSaveNotValidated();
    }
}

function processOnAddressValidationServiceSuccess(result) {
    if (isAddressValidationEnabled == "True") {
        if (!result.Data.IsTypeAllowed) {
            displayInvalidAddressTypeMessage(result);
            return;
        }

        $(workStructForPanelFields.suggestedAddressResult.ContainsInvalidType).val(false);
        $(workStructForPanelFields.Line1).resetValidation();

        if (result.Data.ResultPercentage >= acceptedAddressScore
            && result.Data.SuggestedAddress.AddressElements.length > 0
            && result.Data.SuggestedAddress.AddressElements[0].PostalCode == enteredPostalCode) {
            markValidAddress(result);
            setIsMROSaveValidated();
            if (clickAction == "Save" && parentFormId == "MedicalRelatedOrganizationEditForm") {
                OnClickSave();
            }
        }
        else {
            markNotValidAddress();

            if (result.Data.ResultPercentage > minSuggestionAddressScore && result.Data.SuggestedAddress.AddressElements.length > 0) {
                suggestAddressess(result.Data.SuggestedAddress);
            }
            else {
                displayPopupOKCancelDialog("Warning", addressValidationAddressConfirmationHeader, addressValidationAddressConfirmationMessage, globalYes, "acceptInvalidAddress", globalNo, "clearAddressFields");
            }
        }
    }
}

function suggestAddressess(suggestedAddresses) {
    var locationName = $('#Provider_LocationPayTo_LocationIdentity_Name').val();
    if (locationName === undefined) {
        locationName = $('#LocationIdentity_Name').val();
    }
    if (locationName !== undefined) {
        suggestedAddresses.AddressLocationName = locationName;
    }
    if (suggestedAddresses) {
        avProcessStatus.fieldBeingProcessed.wasAnAddressSuggested = true;
        avProcessStatus.fieldBeingProcessed.wasPopupCalled = true;
        if (parentOverlay != '') {
            showLoadingDialog();
            $(childOverlay).load(SuggestedAddressesFromValidatorPopupUrl,
                suggestedAddresses,
                function () {
                    $(childOverlay).show();
                    $(parentOverlay).hide();
                    postReloadModalOverlay(parentFormId);
                    hideLoadingDialog();
                }
            );
        }
        else {
            openModalOverlay(addressSearchViewPanel, SuggestedAddressesFromValidatorPopupUrl, 'panelForm-col-5', null, suggestedAddresses);
        }
    }
}

function markValidAddress(validationResult) {
    $(workStructForPanelFields.suggestedAddressResult.IsAddressValidated).val(true);
    $(workStructForPanelFields.suggestedAddressResult.AddressConfirmed).val(true);
    $(workStructForPanelFields.suggestedAddressResult.Longitude).val(validationResult.Data.Longitude);
    $(workStructForPanelFields.suggestedAddressResult.Latitude).val(validationResult.Data.Latitude);
    $(workStructForPanelFields.suggestedAddressResult.Type).val(getAddressType(validationResult.Data.OutputXML));
    $(workStructForPanelFields.suggestedAddressResult.ContainsInvalidType).val(false);
}

function markNotValidAddress() {
    $(workStructForPanelFields.suggestedAddressResult.IsAddressValidated).val(false);
    $(workStructForPanelFields.suggestedAddressResult.AddressConfirmed).val(false);
    $(workStructForPanelFields.suggestedAddressResult.Longitude).val(0);
    $(workStructForPanelFields.suggestedAddressResult.Latitude).val(0);
    $(workStructForPanelFields.suggestedAddressResult.Type).val("");
}

function acceptInvalidAddress() {
    isAVExecuting = false;
    markNotValidAddress();
    $(workStructForPanelFields.suggestedAddressResult.AddressConfirmed).val(true);
    if (typeof validationSummary !== 'undefined' && validationSummary && $(validationSummary)) {
        $(validationSummary).css({
            display: "none"
        });
    }

    $(workStructForPanelFields.Line1).resetValidation();
    $(workStructForPanelFields.Line2).resetValidation();
    $(workStructForPanelFields.PostalCode).resetValidation();
    $(workStructForPanelFields.City).resetValidation();
    setIsMROSaveValidated();
}

function clearAddressFields() {
    markNotValidAddress();
    $(workStructForPanelFields.Line1).val("");
    $(workStructForPanelFields.Line1).resetValidation();
    $(workStructForPanelFields.Line2).val("");
    $(workStructForPanelFields.Line2).resetValidation();
    $(workStructForPanelFields.PostalCode).val("");
    $(workStructForPanelFields.PostalCode).resetValidation();
    $(workStructForPanelFields.City).val("");
    $(workStructForPanelFields.City).resetValidation();
    if (!isStateRestricted) {
        $(workStructForPanelFields.State).data("kendoDropDownList").value("");
        $(workStructForPanelFields.State).resetValidation();
        $(workStructForPanelFields.Country).data("kendoDropDownList").value("");
        $(workStructForPanelFields.Country).resetValidation();
    }
    if (workStructForPanelFields.County) {
        $(workStructForPanelFields.County).data("kendoDropDownList").value("");
        $(workStructForPanelFields.County).resetValidation();
    }
    isAVExecuting = false;
    setIsMROSaveNotValidated();
}

function onSelectedAddressFromValidator(e) {
    avProcessStatus.fieldBeingProcessed.wasASuggestedAddressSelected = true;

    var data = this.dataItem(this.select());
    var line1 = "";


    if (data.AddressType == "P") {
        line1 = data.Street;
    }
    else {
        line1 = (data.Number != null) ? ((data.Street != null) ? data.Number + ' ' + data.Street : data.Number) : ((data.Street != null) ? data.Street : '');
    }

    var country = (data.Country != null) ? ((data.Country == 'UNITED STATES') ? 'US' : ((data.Country == 'MEXICO') ? 'MX' : 'CN')) : '';

    if (functionSettings.shouldAddressSelectedFromValidatorPopupReplaceFields == "true") {
        $(workStructForPanelFields.Line1).val(line1);
        $(workStructForPanelFields.City).val(data.Locality);
        $(workStructForPanelFields.State).data("kendoDropDownList").value(data.State);
        $(workStructForPanelFields.State).data("kendoDropDownList").trigger("change");
        $(workStructForPanelFields.Country).data("kendoDropDownList").value(country);
        $(workStructForPanelFields.Country).data("kendoDropDownList").trigger("change");
        $(workStructForPanelFields.PostalCode).data("kendoMaskedTextBox").value(data.PostalCode);

        //counties
        if (workStructForPanelFields.County) {
            var reloadedCounties = makeSyncWebApiCall(loadCountiesWebApiUrl, "GET", providerStatesCountiesAdditionalData($(workStructForPanelFields.State).val()), "application/json;charset=utf-8");

            if (reloadedCounties && reloadedCounties.Data.length > 0) {
                $(workStructForPanelFields.County).data("kendoDropDownList").setDataSource(reloadedCounties.Data);
                $(workStructForPanelFields.County).data("kendoDropDownList").value(data.CountyCode);
                $(workStructForPanelFields.County.replace("List", "_Name")).val(data.County);
                $(workStructForPanelFields.County.replace("List", "_ID")).val(data.CountyCode);
                $('#Address_County_Name').val(data.County);
                $('#Address_Country_Name').val(data.Country);
            }
        }

        //// mark address as valid address.
        $(workStructForPanelFields.suggestedAddressResult.IsAddressValidated).val(true);
        $(workStructForPanelFields.suggestedAddressResult.AddressConfirmed).val(true);
        $(workStructForPanelFields.suggestedAddressResult.Longitude).val(data.Longitude);
        $(workStructForPanelFields.suggestedAddressResult.Latitude).val(data.Latitude);
        $(workStructForPanelFields.suggestedAddressResult.Type).val(data.AddressType);
    }

    if (parentOverlay != '') {
        mpePopTitleBarInfoOffStack();
        if (parentFormId = "MedicalRelatedOrganizationEditForm") {
            isAddressSuggestValidated = true;
            suggestedValidAddress.city = data.Locality;
            suggestedValidAddress.line1 = line1;
            suggestedValidAddress.postalCode = data.PostalCode;
        }
        $(childOverlay).hide();
        $(parentOverlay).show();
    }
    else {
        mpePanelClose(addressSearchViewPanel);
    }
    processPosFunction();
}

suggestedAddressPopUpCancel = function () {
    if (isAddressValidationEnabled == "True" && isAllowingByPassOfAddressVerification == "false" && $("#CurrentStep").val() == 3) {
        SetGloabalErrorDiasbleFields(AddressSource);
    }
    else {
        displayPopupOKCancelDialog("Warning", addressValidationAddressConfirmationHeader, addressValidationAddressConfirmationMessage, globalYes, "acceptInvalidAddress", globalNo, "clearAddressFields");
    }

    if (parentOverlay != '') {
        mpePopTitleBarInfoOffStack();
        $(childOverlay).hide();
        $(parentOverlay).show();
    }
    else {
        mpePanelClose(addressSearchViewPanel);
    }
    avProcessStatus.fieldBeingProcessed.wasASuggestedAddressSelected = false;
    processPosFunction();
};

loadStateCounties = function (stateCode) {
    var loadedCounties = makeSyncWebApiCall(loadCountiesWebApiUrl, "GET", providerStatesCountiesAdditionalData(stateCode), "application/json;charset=utf-8");

    if (loadedCounties && loadedCounties.Data.length > 0) {
        return loadedCounties.Data;
    }
};

stateAddressValidation = function () {
    if (workStructForPanelFields.County) {
        var loadedStateCounties = loadStateCounties($(workStructForPanelFields.State).val());
        if (loadedStateCounties) {
            $(workStructForPanelFields.County).data("kendoDropDownList").setDataSource(loadedStateCounties);
        }
        else {
            $(workStructForPanelFields.County).data("kendoDropDownList").select(-1);
        }
    }

    enteredAddressValidation(getListOfFieldsValuesForAddressValidation(workStructForPanelFields));
};

providerStatesCountiesAdditionalData = function (stateCode) {
    return {
        id: countiesDatalist,
        pid: statesDatalist,
        value: stateCode
    };
};

getStateName = function (addressFieldSource, stateCode) {
    var addressListField = addressFieldSource != "" ? $(addressFieldSource + "_StatesList") : $("#StatesList");
    if (addressListField.data("kendoDropDownList")) {

        var stateList = addressListField.data("kendoDropDownList").dataSource._data;
        for (i = 0; i < stateList.length; i++) {
            if (stateList[i].ID == stateCode) {
                return stateList[i].Name;
            }
        }

        return "";
    }
};

containsOnlyPOBoxAddresses = function (grid) {
    for (var row = 0; row < grid.table[0].rows.length; row++) {
        if (grid.table[0].rows[row].cells[10].innerText != "P") {
            return false;
        }
    }
    return true;
};

getAddressType = function (outputXml) {
    var xml = $.parseXML(outputXml),
        $xml = $(xml),
        addressType = $xml.find('ResultData').attr('AddressType');

    return addressType;
};
