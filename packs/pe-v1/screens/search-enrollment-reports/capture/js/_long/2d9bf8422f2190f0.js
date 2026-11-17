//-----------------------------------------------------------------------------------------
//  This code is the property of Gainwell.Technology, Copyright (c) 2021. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var clearButtonId = "#clearButton";
var searchButtonId = "#searchButton";
var formId = "#EnrollmentReportSearchForm";
var gridId = "#enrollmentReportStatusResultsGrid";
var enrollmentReportStatusId = "#EnrollmentReportStatus";
var resultGridId = "#bnrresultsGrid";
var fromDateId = "#FromDate";
var toDateId = "#ToDate";

$(document).ready(function () {
    $(resultGridId).hide();
    $(gridId).find(".k-grid-toolbar").insertAfter($(gridId).find(".k-grid-content"));
    initializeNameTypeControls();

});

$(clearButtonId).click(function () {
    $(formId)[0].reset();
    $(fromDateId).val('');
    $(toDateId).val('');
    $('#UserId').val('');
    $(formId).resetAllValidations();
    hideSummaryErrors();
    isStepDataDirty = false;
    focusFirstElement(formId);
    $(resultGridId).hide();
    $(gridId).data("kendoGrid").dataSource.data([]);
});

var validator = $(formId).kendoValidator(
    {
        validateOnBlur: false,
        validate: function () {
            focusFirstErrorElement(formId);
        }
    }
).data("kendoValidator");

$(searchButtonId).click(function () {
    $(resultGridId).hide();
    $(gridId).data("kendoGrid").dataSource.data([]);
    if (validator.validate()) {
        hideSummaryErrors();
        searchEnrollmentReports();
    }
    else {
        $(resultGridId).hide();
    }
});

function searchEnrollmentReports(e) {
    $(enrollmentReportStatusId).empty();
    var filters;

    var fromDateVal = kendo.parseDate($(fromDateId).val());
    var toDateVal = kendo.parseDate($(toDateId).val());
    if (fromDateVal !== null && toDateVal !== null) {
        if (fromDateVal > toDateVal) {
            setKendoValidatorFieldMessage($(fromDateId), fromDateMessage);
            e.preventDefault();
            return false;
        }
    }
    filters = [
        ["UserId", "eq", $("#UserId").val()],
        ["FromDate", "eq", $(fromDateId).val()],
        ["ToDate", "eq", $(toDateId).val()]
    ];
    $(resultGridId).show();
    applyKendoFilters(gridId, filters);
    $(gridId).data("kendoGrid").dataSource.pageSize(10);
    showLoadingDialog();
}

function onEnrollmentReportSearchGridDataBound(e) {
    setKendoGridDataBoundEvents(e, null, null, null);
}

function onEnrollmentReportSearchGridOnDataBinding(e) {
    if (e.items.length == 0) {
        $(".panel-body").attr('style', 'display:block');
    }
    else {
        $("#SearchEnrollmentReport").attr('style', 'display:none');
        collapsePanel('#searchCriteriaPanelIcon', panelTypeContent);
    }
    hideLoadingDialog();
}

function getDateString(date) {
    var dateFormat = formatCultureDateMask();
    return kendo.toString(date, dateFormat);
}
function initializeNameTypeControls() {
    var date = new Date();
    $(fromDateId).val(getDateString(date));
    $(toDateId).val(getDateString(date));
}