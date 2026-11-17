//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
var gridId = "#providerEnrollmentResultsGrid";
var providerEnrollmentDashboard = "#ProviderEnrollmentDashboard";
var enrollmentPreferenceForm = "EnrollmentPreferenceForm";
var savePreferencesButtonId = "#savePreferencesButton";

$(document).ready(function () {
    $(savePreferencesButtonId).hide();
    for (i = 0; i < childItems.length; i++) {
        var parentDiv = $('<div>', { class: 'row float-left', id: childItems[i].Id });
        var anchorTag = $('<a />', { class: 'dshbrd-link-panes clickable', href: childItems[i].BaseUrl });
        var spanTag = $('<span>', { class: 'dshbrd-link-txt', text: childItems[i].DefaultText });

        anchorTag.append(spanTag);
        parentDiv.append(anchorTag);

        makeElementAsDragAndDrop(parentDiv);
        $(providerEnrollmentDashboard).append(parentDiv);
    }

    function makeElementAsDragAndDrop(elem) {
        $(elem).draggable({
            revert: "invalid",
            cursor: "move",
            helper: "clone",
            containment: "parent"
        });
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);
                makeElementAsDragAndDrop(this);
                makeElementAsDragAndDrop($dragElem);
                $(savePreferencesButtonId).show();
            }
        });
    }
    $("#providerEnrollmentResultsGrid").data("kendoGrid").showColumn(3);
    $("#providerEnrollmentResultsGrid").data("kendoGrid").hideColumn(4);

    $("#recentlySubmitted").click(function (e) {
        $("#searchResultsGrid").show();
    });
});

$("#savePreferencesButton").click(function () {
    hideSummaryErrors();
    $("#DashboardStatus").empty();
    var childDivs = $(providerEnrollmentDashboard).children();
    var userPreferenceMenuIds = [];
    for (i = 0; i < childDivs.length; i++) {
        userPreferenceMenuIds.push(childDivs[i].id);
    }
    makeAsyncWebApiCall(savePreferencesWebApiUrl, "GET", "userPreferences=" + userPreferenceMenuIds, "application/x-www-form-urlencoded", "processSavePreferencesSuccess");
});

function processSavePreferencesSuccess(result) {
    $("#DashboardStatus").empty();
    var item = formatGeneralMessage("Success", dashboardPreferenceSuccessMessage);
    $("#DashboardStatus").append(item);
    $(savePreferencesButtonId).hide();
}

$("#settingPreferencesButton").click(function () {
    $("#DashboardStatus").empty();
    openModalOverlay("EnrollmentPreferenceOverlay", enrollmentPreferencesUrl, 'panelForm-col-2', null, null);
});

function searchResult(statusId, statusText) {
    searchProviderEnrollmentStatus(gridId, statusId, statusText);
}

function searchProviderEnrollmentStatus(gridId, enrollmentStatus, enrollmentStatusText) {
    $(gridId).data("kendoGrid").dataSource.filter().filters.splice(0, 2);
    var filters;
    if (enrollmentStatus === "Submitted") {
        $(gridId).data("kendoGrid").showColumn(3);
        $(gridId).data("kendoGrid").hideColumn(4);
        filters = [
            ["LastStatus", "eq", enrollmentStatus]
        ];
    }
    else {
        $(gridId).data("kendoGrid").showColumn(4);
        $(gridId).data("kendoGrid").hideColumn(3);

        filters = [
            ["QuickSearchFlag", "eq", true],
            ["LastStatus", "eq", enrollmentStatus]
        ];
    }
    document.getElementById("searchResultHeader").innerText = searchGridResultHeader + " - " + enrollmentStatusText;
    applyKendoFilters(gridId, filters);
}