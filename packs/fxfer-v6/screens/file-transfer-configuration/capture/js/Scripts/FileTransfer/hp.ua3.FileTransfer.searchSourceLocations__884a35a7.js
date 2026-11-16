//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
var fileTransferViewPanelId = "FileTransferViewPopup";
var ftsSourceLocationID;
var addMode = false;
var editMode = false;

$("#FileTransferShowInactiveCheckBox").change(function () {
    clearGeneralMessages();
    applyFileTransferFilter();
});

function editorInitStepPostprocess() {
    $('#ConfigId').val('');
}

// Model Editor Event Hooks
function editorNextPostValidate() {
    var cancel = true;
    performFileTransferSearch();

    return cancel;
}

function editorResetPostprocess() {
    var cancel = false;
    hideSummaryErrors();
    resetFieldValidations();
    resetSearchFileTransfer();
    return cancel;
}

function performFileTransferSearch() {
    hideSummaryErrors();

    clearGeneralMessages();
    var configIDVal = $('#ConfigId').val();
    var configNameVal = $('#ConfigName').val();
    var ownerNameVal = $('#OwnerName').val();
    var protocolVal = $('#ProtocolList').val();
    var ownerModuleVal = $('#SearchModuleList').val();
    var checked = !$('#FileTransferShowInactiveCheckBox').is(":checked");
    var filters = [
        ["ConfigId", "eq", configIDVal],
        ["OwnerName", "eq", ownerNameVal],
        ["ConfigName", "eq", configNameVal],
        ["Protocol", "eq", protocolVal],
        ["OwnerSubsystem", "eq", ownerModuleVal],
        ["IsActive", "eq", checked]
    ];
    applyKendoFilters("#FileTransferSearchGrid", filters);
    $("#divFileBaseSourceStatus").hide();

    $('#searchFileTransferConfigResultsPanel').show();
}

function resetFieldValidations() {
    $('#ConfigId').resetValidation();
    $('#ConfigName').resetValidation();
    $('#OwnerName').resetValidation();
    $('#SearchModuleList').resetValidation();
    $('#ProtocolList').resetValidation();
}

function resetSearchFileTransfer() {
    clearGeneralMessages();
    $('#FileTransferSearchForm')[0].reset();
    $('#ConfigId').val('');
    $('#FileTransferShowInactiveCheckBox').attr('checked', false);
    $("#FileTransferSearchGrid").data('kendoGrid').dataSource.data([]);
    $("#divFileBaseSourceStatus").hide();

    $("#searchFileTransferConfigResultsPanel").hide();
}

function onDisplayFileTransferView() {
    showLoadingDialog();
    openModalOverlay("FileTransferConfigurationViewOverlay", viewFileTransferConfigurationUrl + "?" +encodeURI("ftsSourceLocationId=" +ftsSourceLocationId), 'panelForm-col-6');
}

function applyFileTransferFilter() {

    var configIDVal = $('#ConfigId').val();
    var configNameVal = $('#ConfigName').val();
    var ownerNameVal = $('#OwnerName').val();
    var protocolVal = $('#ProtocolList').val();
    var ownerModuleVal = $('#SearchModuleList').val();
    var checked = !$("#FileTransferShowInactiveCheckBox").is(":checked");

    var filters = [
        ["ConfigId", "eq", configIDVal],
        ["OwnerName", "eq", ownerNameVal],
        ["ConfigName", "eq", configNameVal],
        ["Protocol", "eq", protocolVal],
        ["OwnerSubsystem", "eq", ownerModuleVal],
        ["IsActive", "eq", checked]
    ];

    applyKendoFilters("#FileTransferSearchGrid", filters);
}

$("#FileTransferGridAddButton").click(function () {
    clearGeneralMessages();
    mpeClearPanelMessages("AddFileBaseConfigurationForm");
    var addEditSelectedconfiguration = {};
    openModalOverlay("FileTransferConfigurationEditPopup", editFileTransferConfigurationUrl, 'panelForm-col-6', null, addEditSelectedconfiguration);
    $("#divFileBaseSourceStatus").hide();
});

function fileTransferGridOnRowSelected(e) {
    var grid = e.sender;
    dataItem = grid.dataItem(this.select());
    ftsSourceLocationId = dataItem.FtsSourceLocationId;
    $("#divFileBaseSourceStatus").hide();
}

function sourceLocationsDataBound(e) {
    setKendoGridDataBoundEvents(e, null, null, "onDisplayFileTransferView");
}

function emptySuccessMessageDiv() {
    $(".gm-container").empty();
}
