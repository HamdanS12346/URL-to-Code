var providerEnrollmentStatusId = "#ProviderEnrollmentSearchStatus";
var gridform = "ProviderApplicationform";

$(document).ready(function () {
    searchProviderEnrollment(gridId);
});

function searchProviderEnrollment(gridId) {
    if (submittedApplication.toLowerCase() === "false")
    {
        $("#searchResultsGrid").show();
    }
    else
    {
        $("#searchResultsGrid").hide();
    }
    var filters;
    filters = [
        ["SubmittedDate", "eq", new Date()]
    ];
    applyKendoFilters(gridId, filters);
}

function formatKendoDate(date) {
    var format = formatCultureDateMask();
    var dateFormat = kendo.toString(kendo.parseDate(date), format);
    return dateFormat == null ? "" : dateFormat;
}

function OnSelectedRow(e) {
    if (isHavingRightToViewPDF.toLowerCase() === "true") {
        var grid = e.sender;
        dataItem = grid.dataItem(this.select());
        var selecteditem = JSON.parse(JSON.stringify(dataItem.toJSON()));
        if (dataItem.DisplayName != null) {
            openModalOverlay("ProviderEnrollmentApplicationsViewOverlay", ProviderEnrollmentApplicationURL, 'panelForm-col-5', null, { atnVal: selecteditem, __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val() });
        }
        else {
            displayPopupDialog("Info", noDataFoundInfoPopupTitle, noDataFoundInfoPopupMsg);
        }
    }
}
