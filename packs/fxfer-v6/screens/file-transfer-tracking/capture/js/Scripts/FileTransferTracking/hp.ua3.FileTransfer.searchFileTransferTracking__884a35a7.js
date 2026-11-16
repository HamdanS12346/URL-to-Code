//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var selectedFileTransferRow;

$(document).ready(function () {
    // control events
    var today = kendo.date.today();
    var toDate = $("#ToDate").data("kendoDateTimePicker");
    toDate.min(today);
    toDate.value(today);
    toDate.trigger('change');
    $("#ToDate").val('');

    var fromDate = $("#FromDate").data("kendoDateTimePicker");
    fromDate.max(today);
    fromDate.value(today);
    fromDate.trigger('change');
    $("#FromDate").val('');
});

function displayFileTransferTracking(e) {
    setKendoGridDataBoundEvents(e, null, null, "callFileTransferTrackingView");
}

function callFileTransferTrackingView() {
    if (selectedFileTransferRow !== undefined) {
        showLoadingDialog();
        openModalOverlay('FileTransferTrackingViewPopup', trackingViewUrl, 'panelForm-col-6', null, selectedFileTransferRow);
    }
}

// Model Editor Event Hooks
function editorCancelPreprocess() {
    var cancel = false;
    return cancel;
}

function editorPreviousPreprocess() {
    var cancel = false;
    return cancel;
}

function editorNextPreprocess() {
    var cancel = false;
    return cancel;
}

function editorNextPostValidate() {
    var cancel = true;
    performFileTrackingSearch();

    return cancel;
}

function editorResetPreprocess() {
    var cancel = false;
    return cancel;
}

function editorResetPostprocess() {
    var cancel = false;
    hideSummaryErrors();
    resetFieldValidations();
    resetSearchFileTransfer();
    return cancel;
}

// Functions
function fileTrackingGridOnRowSelected(e) {
    grid = e.sender;
    dataItem = grid.dataItem(this.select());

    selectedFileTransferRow = {
        FileId: dataItem.FileId
    };
}

function resetFieldValidations() {
    $('#FileId').resetValidation();
    $('#FileName').resetValidation();
    $('#FileStatusList').resetValidation();
    $('#DirectionList').resetValidation();
    $('#TransportTypeList').resetValidation();
    $('#FromDate').resetValidation();
    $('#ToDate').resetValidation();
    $('#FromSize').resetValidation();
    $('#ToSize').resetValidation();
    $('#TradingPartnerId').resetValidation();
}

function resetSearchFileTransfer() {
    var today = kendo.date.today();

    var toDate = $("#ToDate").data("kendoDateTimePicker");
    toDate.min(today);
    toDate.value(today);
    toDate.trigger('change');
    $("#ToDate").val('');

    var fromDate = $("#FromDate").data("kendoDateTimePicker");
    fromDate.max(today);
    fromDate.value(today);
    fromDate.trigger('change');
    $("#FromDate").val('');

    $('#FileId').focus().select();
    $("#searchFileTrackingResultsPanel").hide();
}

function performFileTrackingSearch() {
    hideSummaryErrors();

    var filters = [
        ['FileId', 'eq', $('#FileId').val()],
        ['FileName', 'eq', $('#FileName').val()],
        ['FileStatus', 'eq', $('#FileStatusList').val()],
        ['Direction', 'eq', $('#DirectionList').val()],
        ['TransportType', 'eq', $('#TransportTypeList').val()],
        ['FromDate', 'eq', $('#FromDate').val()],
        ['ToDate', 'eq', $('#ToDate').val()],
        ['FromSize', 'eq', $('#FromSize').val()],
        ['ToSize', 'eq', $('#ToSize').val()],
        ['TradingPartnerId', "eq", $('#TradingPartnerId').val()],
        ['SourceLocationId', "eq", $('#SourceLocation').val()]
    ];
    applyKendoFilters('#fileTrackingResultsGrid', filters);

    $('#searchFileTrackingResultsPanel').show();
}