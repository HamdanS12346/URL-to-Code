// This code is the property of Gainwell Technologies, Copyright (c) 2023. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
var panelId = "SearchFTPServerCredentialsId";
var panelStatus = "searchFTPServerCredentialsStatus";
var showInactivesCheckBoxId = "#showInvalidFTPServerCredentialsCheckBox";
var ftpServerNameId = "#FtpServerName";
var gridId = "#FTPServerCredentialsGrid";
var resultsGridId = "#" + panelId;
var moduleId = "#ModuleName_ID";
var divCriteria = "#criteriaPanel";
var divSearchResults = "#searchResults";
var helpbtnSearchGrid = "#HelpbtnSearchGrid";
var validator;

$(document).ready(function () {
    mpeRegisterPanel(
        panelId
        , panelStatus
        , null
        , null
        , null
        , true
        , true
        , null
        , true
        , null);
    setValidator();
    $(divSearchResults).hide();
    $("#pageBody").find(".gm-container").hide();
});

// Model Editor Event Hooks
function editorResetPreprocess() {
    mpePanelReset(panelId);
    $(divSearchResults).hide();
    return false;
}

$(helpbtnSearchGrid).on('click', function () {
    var contentHelp = searchResultsHelpId;
    displayPageLevelHelp(contentHelp);
});

$(showInactivesCheckBoxId).change(function () {
    var onlyActiveFields = "true";
    if ($(showInactivesCheckBoxId).is(":checked")) {
        onlyActiveFields = "";
    }

    refreshResultGrid(buildSearchCriteria(onlyActiveFields), gridId);
});

function editorNextPostValidate() {
    var cancel = false;
    initialSearch = true;
    mpeClearPanelMessages(panelId);
    searchFTPServerCredentials();
    cancel = true;
    return cancel;
}

function editorCancelPreprocess() {
    var cancel = false;
    return cancel;
}

function setValidator() {
    validator = $(resultsGridId).kendoValidator(
        {
            validateOnBlur: false,
            validate: function () {
                focusFirstErrorElement(resultsGridId);
            }
        }
    ).data("kendoValidator");
}

function FTPServerCredentialsGridOnDataBinding(e) {
    $(divSearchResults).show();
    $(".container").has(resultsGridId).show();
    if (e.items.length == 0) {
        $(".panel-body").attr('style', 'display:block');
    }
    else {
        collapsePanel(divCriteria, "panel");
    }
    hideLoadingDialog();
}

function searchFTPServerCredentials() {
    $(showInactivesCheckBoxId).prop('checked', false);
    showLoadingDialog();
    refreshResultGrid(buildSearchCriteria("true"), gridId);
}

function initializeFilters(arg) {
    hideSummaryErrors();
    if (arg.sender.dataSource._filter !== null) {
        $.extend(arg.sender.dataSource._filter.filters, buildSearchCriteria("true"));
    }
    else if (arg.filter !== null) {
        var filter = [];
        $.extend(filter, buildSearchCriteria("true"));
        for (var i = 0; i < arg.filter.filters.length; i++) {
            filter.push(arg.filter.filters[0]);
        }
        arg.preventDefault();
        refreshResultGrid(filter, gridId);
    }
    else {
        arg.preventDefault();
        refreshResultGrid(buildSearchCriteria("true"), gridId);
    }
}

function buildSearchCriteria(onlyActiveValues) {
    var filters = [];

    if ($(moduleId).val() != '') {

        if ($(showInactivesCheckBoxId).is(":checked")) {
            onlyActiveValues = "";
            filters.push({ "field": isValidField, "operator": "eq", "value": onlyActiveValues });
        }
        else {
            filters.push({ "field": isValidField, "operator": "eq", "value": true });
        }

        if ($(ftpServerNameId).val() != '') {
            filters.push({ "field": serverNameSearchField, "operator": "contains", "value": $(ftpServerNameId).val() });
        }
    }

    return filters;
}

function refreshResultGrid(filters, searchGrid) {
    if (filters !== null && filters.length > 0) {
        $(searchGrid).data("kendoGrid").dataSource.query(
            {
                page: 1,
                pageSize: 10,
                filter: filters
            });
    }
}

function FTPServerCredentialsGridOnDataBound(e) {
    setKendoGridDataBoundEvents(e, null, null, 'displayViewEditFTPServerCredentials');
}

function onFtpServerCredentialsAdd(e) {
    showLoadingDialog();
    openModalOverlay("ViewEditFTPServerCredentials", ftpServerCredentialsAddUrl, 'panelForm-col-6', null, null);
}

function FTPServerCredentialGridOnRowSelected(e) {
    var grid = e.sender;
    dataItem = grid.dataItem(this.select());
    selectedRecord = dataItem;
}

function displayViewEditFTPServerCredentials() {
    showLoadingDialog();
    openModalOverlay("ViewEditFTPServerCredentials", ftpServerCredentialsAddUrl, 'panelForm-col-6', null, selectedRecord);
}