//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
var providerEnrollmentDashboard = "#ProviderEnrollmentDashboard";
var formId = "#QuickSearchEditForm";
var atn = "#ATN";
var lastName = "#LastName";
var npi = "#NPI";
var businessName = "#BusinessName";
var gridId = "#providerEnrollmentResultsGrid";

var validator = $(formId).kendoValidator(
    {
        validateOnBlur: false,
        validate: function () {
            focusFirstErrorElement(formId);
        }
    }
).data("kendoValidator");

function ClearBtn() {
    $(formId)[0].reset();
    $(formId).resetAllValidations();
    hideSummaryErrors();
    focusFirstElement(formId);
    $(gridId).data("kendoGrid").dataSource.data([]);
    $("#searchResultsGrid").hide();
}

function SearchBtn() {
    hideSummaryErrors();
    setFieldAsNotRequired("ATN", "ATN");
    setFieldAsNotRequired("NPI", "NPI");
    setFieldAsNotRequired("LastName", "LastName");
    setFieldAsNotRequired("BusinessName", "BusinessName");

    var textboxesEmpty = true;
    $('input:text').each(function() {
        var textboxName = $(this).prop('name');

        if (textboxName === "ATN" || textboxName === "NPI" || textboxName === "LastName" || textboxName === "BusinessName") {
            if ($(this).val().length > 0) {
                textboxesEmpty = false;
            }
        }
    });

    if (textboxesEmpty === true) {
        displaySummaryErrors(allTextboxesEmpty);
        return;
    }

    if (validator.validate()) {
        hideSummaryErrors();
        $("#searchResultsGrid").show();
        searchProvider();
    }
    else {
        $("#searchResultsGrid").hide();
    }
}

function displaySummaryErrors(errorMessage) {
    var errors = new Array();
    errors.push(errorMessage);
    showSummaryErrors(errors);
}

function searchProvider() {
    $(gridId).data("kendoGrid").dataSource.filter().filters.splice(0, 2);

    var filters;
    filters =[
        ["QuickSearchFlag", "eq", true],
        ["ATN", "eq", $(atn).val()],
        ["NPI", "eq", $(npi).val()],
        ["LastName", "eq", $(lastName).val()],
        ["BusinessName", "eq", $(businessName).val()]
    ];
    applyKendoFilters(gridId, filters);
}