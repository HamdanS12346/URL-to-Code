//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var isAuditPanelLoaded = false;
var isMailPanelLoaded = false;
var isNotesPanelLoaded = false;
var isPrintPreviewPanelLoaded = false;
var isReportsPanelLoaded = false;
var isReturnToProviderPanelLoaded = false;
var panelAuditBodyId = "pnlAuditBody";
var panelAuditId = "pnlAudit";
var panelAuditName = "Audit";
var panelMailBodyId = "pnlMailBody";
var panelMailId = "pnlMail";
var panelMailName = "Mail";
var panelNotesBodyId = "pnlNotesBody";
var panelNotesId = "pnlNotes";
var panelNotesName = "Notes";
var panelPrintPreviewBodyId = "pnlPrintPreviewBody";
var panelPrintPreviewId = "pnlPrintPreview";
var panelPrintPreviewName = "PrintPreview";
var panelReportsBodyId = "pnlReportsBody";
var panelReportsId = "pnlReports";
var panelReportsName = "Reports";
var panelReturnToProviderBodyId = "pnlReturnToProviderBody";
var panelReturnToProviderId = "pnlReturnToProvider";
var panelReturnToProviderName = "RPT";

//----------------------------------
// Module Content Bar - Audit Panel
//----------------------------------

$(document).ready(function () {
    initializeTooltip("#mcbPanel");
});

function getAudit() {
    // We don't want both an MCB panel as well as a separate browser window open for Audit, so close the window it it exists
    if (newWindow[panelAuditName]) {
        newWindow[panelAuditName].close();
    }

    if (isAuditPanelLoaded) {
        toggleVisibility(panelAuditId);
    }
    else {
        if (typeof moduleContentQueryString !== 'undefined') {
            auditUrl = auditUrl + moduleContentQueryString;
        }

        let auditContentResult = makeSyncWebApiCall(auditUrl, "POST", null, "application/json");
        if (auditContentResult.IsValid) {
            loadPanelContent(panelAuditId, auditContentResult.Data);
            toggleVisibility(panelAuditId);
        }
    }

    $("#ShowAuditMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            ExpandHelpItem('divAuditMCBPanel', 'ShowAuditMCBPanel', 'MinusSquareAudit');
        }
    });

    $("#HideAuditMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            CollapseHelpItem('divAuditMCBPanel', 'PlusSquareAudit', 'HideAuditMCBPanel');
        }
    });

    $("#auditHelp").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            displayPageLevelHelp(getHelpNodeValue(auditUrl, auditHelpNode));
        }
    });

    $("#auditClose").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            closeMCBPanel(this);
        }
    });

    initializeContentPanels("#" + panelAuditId);
    applyMaskedDatePicker();
    initializeTooltip("#" + panelAuditId);
}

//----------------------------------
// Module Content Bar - Mail Panel
//----------------------------------
function getMail() {
    // We don't want both an MCB panel as well as a separate browser window open for Mail, so close the window it it exists
    if (newWindow[panelMailName]) {
        newWindow[panelMailName].close();
    }

    if (isMailPanelLoaded) {
        toggleVisibility(panelMailId);
    }
    else {
        if (typeof moduleContentQueryString !== 'undefined') {
            mailUrl = mailUrl + moduleContentQueryString;
        }

        let mailContentResult = makeSyncWebApiCall(mailUrl, "POST", null, "application/json");
        if (mailContentResult.IsValid) {
            loadPanelContent(panelMailId, mailContentResult.Data);
            toggleVisibility(panelMailId);
        }
    }

    $("#ShowMailMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            ExpandHelpItem('divMailMCBPanel', 'ShowMailMCBPanel', 'MinusSquareMail');
        }
    });

    $("#HideMailMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            CollapseHelpItem('divMailMCBPanel', 'PlusSquareMail', 'HideMailMCBPanel');
        }
    });

    $("#mailHelp").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            displayPageLevelHelp(getHelpNodeValue(mailUrl, mailHelpNode));
        }
    });

    $("#mailClose").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            closeMCBPanel(this);
        }
    });

    initializeContentPanels('#' + panelMailId);
    initializeTooltip('#' + panelMailId);
}

//----------------------------------
// Module Content Bar - Notes Panel
//----------------------------------
function getNotes() {
    // We don't want both an MCB panel as well as a separate browser window open for Notes, so close the window it it exists
    if (newWindow[panelNotesName]) {
        newWindow[panelNotesName].close();
    }

    if (isNotesPanelLoaded) {
        toggleVisibility(panelNotesId);
    }
    else {
        if (typeof moduleContentQueryString !== 'undefined') {
            notesUrl = notesUrl + moduleContentQueryString;
        }

        let notesContentResult = makeSyncWebApiCall(notesUrl, "POST", null, "application/json");
        if (notesContentResult.IsValid) {
            loadPanelContent(panelNotesId, notesContentResult.Data);
            toggleVisibility(panelNotesId);
        }
    }

    $("#ShowNotesMCBPanel").off("click keypress keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            ExpandHelpItem('divNotesMCBPanel', 'ShowNotesMCBPanel', 'MinusSquareNotes');
        }
    });

    $("#HideNotesMCBPanel").off("click keypress keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            CollapseHelpItem('divNotesMCBPanel', 'PlusSquareNotes', 'HideNotesMCBPanel');
        }
    });

    $("#notesHelp").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            displayPageLevelHelp(getHelpNodeValue(notesUrl, notesHelpNode));
        }
    });

    $("#notesClose").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            closeMCBPanel(this);
        }
    });

    initializeContentPanels('#' + panelNotesId);
    initializeTooltip('#' + panelNotesId);
}

//------------------------------------------
// Module Content Bar - Print Preview Panel
//------------------------------------------
function getPrintPreview() {
    // We don't want both an MCB panel as well as a separate browser window open for Notes, so close the window it it exists
    if (newWindow[panelPrintPreviewName]) {
        newWindow[panelPrintPreviewName].close();
    }

    if (isPrintPreviewPanelLoaded) {
        toggleVisibility(panelPrintPreviewId);
    }
    else {
        if (typeof moduleContentQueryString !== 'undefined') {
            printPreviewUrl = printPreviewUrl + moduleContentQueryString;
        }

        let printContentResult = makeSyncWebApiCall(printPreviewUrl, "POST", null, "application/json");
        if (printContentResult.IsValid) {
            loadPanelContent(panelPrintPreviewId, printContentResult.Data);
            toggleVisibility(panelPrintPreviewId);
        }
    }

    $("#ShowPrintPreviewMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            ExpandHelpItem('divPrintPreviewMCBPanel', 'ShowPrintPreviewMCBPanel', 'MinusSquarePrintPreview');
        }
    });

    $("#HidePrintPreviewMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            CollapseHelpItem('divPrintPreviewMCBPanel', 'PlusSquarePrintPreview', 'HidePrintPreviewMCBPanel');
        }
    });

    $("#printPreviewHelp").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            displayPageLevelHelp(getHelpNodeValue(printPreviewUrl, printPreviewHelpNode));
        }
    });

    $("#printPreviewClose").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            closeMCBPanel(this);
        }
    });

    initializeContentPanels('#' + panelPrintPreviewId);
    initializeTooltip("#" + panelPrintPreviewId);
}

//------------------------------------
// Module Content Bar - Reports Panel
//------------------------------------
function getReports() {
    // We don't want both an MCB panel as well as a separate browser window open for Reports, so close the window it it exists
    if (newWindow[panelReportsName]) {
        newWindow[panelReportsName].close();
    }

    if (isReportsPanelLoaded) {
        toggleVisibility(panelReportsId);
    }
    else {
        if (typeof moduleContentQueryString !== 'undefined') {
            reportsUrl = reportsUrl + moduleContentQueryString;
        }

        let reportsContentResult = makeSyncWebApiCall(reportsUrl, "POST", null, "application/json");
        if (reportsContentResult.IsValid) {
            loadPanelContent(panelReportsId, reportsContentResult.Data);
            toggleVisibility(panelReportsId);
        }
    }

    $("#ShowReportsMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            ExpandHelpItem('divReportsMCBPanel', 'ShowReportsMCBPanel', 'MinusSquareReports');
        }
    });

    $("#HideReportsMCBPanel").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            CollapseHelpItem('divReportsMCBPanel', 'PlusSquareReports', 'HideReportsMCBPanel');
        }
    });

    $("#reportsHelp").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            displayPageLevelHelp(getHelpNodeValue(reportsUrl, reportsHelpNode));
        }
    });

    $("#reportsClose").off("click keydown").on("click keydown", function (event) {
        if (event.type == "click" || (event.type == "keydown" && event.keyCode === 32)) {
            event.preventDefault();
            closeMCBPanel(this);
        }
    });

    initializeContentPanels('#' + panelReportsId);
    initializeTooltip("#" + panelReportsId);
}

//-----------------------------------------------
// Module Content Bar - Return To Provider Panel
//-----------------------------------------------
function getReturnToProvider() {
    // We don't want both an MCB panel as well as a separate browser window open for Reports, so close the window it it exists
    if (newWindow[panelReturnToProviderName]) {
        newWindow[panelReturnToProviderName].close();
    }

    if (isReturnToProviderPanelLoaded) {
        toggleVisibility(panelReturnToProviderId);
    }
    else {
        if (typeof moduleContentQueryString !== 'undefined') {
            returnToProviderUrl = returnToProviderUrl + moduleContentQueryString;
        }

        let returnToProviderContentResult = makeSyncWebApiCall(returnToProviderUrl, "POST", null, "application/json");
        if (returnToProviderContentResult.IsValid) {
            loadPanelContent(panelReturnToProviderId, returnToProviderContentResult.Data);
            toggleVisibility(panelReturnToProviderId);
        }
    }
    initializeContentPanels('#' + panelReturnToProviderId);
}

function loadPanelContent(panelId, data) {
    switch (panelId) {
        case panelAuditId:
            $("#" + panelAuditBodyId).html(data);
            isAuditPanelLoaded = true;
            setHelpIcon(auditUrl, auditHelpNode, "#auditHelp");
            break;
        case panelMailId:
            $("#" + panelMailBodyId).html(data);
            isMailPanelLoaded = true;
            setHelpIcon(mailUrl, mailHelpNode, "#mailHelp");
            break;
        case panelNotesId:
            $("#" + panelNotesBodyId).html(data);
            isNotesPanelLoaded = true;
            setHelpIcon(notesUrl, notesHelpNode, "#notesHelp");
            break;
        case panelPrintPreviewId:
            $("#" + panelPrintPreviewBodyId).html(data);
            isPrintPreviewPanelLoaded = true;
            setHelpIcon(printPreviewUrl, printPreviewHelpNode, "#printPreviewHelp");
            break;
        case panelReportsId:
            $("#" + panelReportsBodyId).html(data);
            isReportsPanelLoaded = true;
            setHelpIcon(reportsUrl, reportsHelpNode, "#reportsHelp");
            break;
        case panelReturnToProviderId:
            $("#" + panelReturnToProviderBodyId).html(data);
            isReturnToProviderPanelLoaded = true;
            break;
    }
}

function toggleVisibility(panelId) {
    let mcbContentBar = $("#mcbContentBar");
    let auditTabId = $(mcbContentBar).find("#MCBMenu\\.Audit");
    let mailTabId = $(mcbContentBar).find("#MCBMenu\\.Mail");
    let notesTabId = $(mcbContentBar).find("#MCBMenu\\.Notes");
    let printPreviewTabId = $(mcbContentBar).find("#MCBMenu\\.PrintPreview");
    let reportsTabId = $(mcbContentBar).find("#MCBMenu\\.Reports");
    let returnToProviderTabId = $(mcbContentBar).find("#MCBMenu\\.ReturnToProvider");

    switch (panelId) {
        case panelAuditId:
            if ($("#" + panelAuditId).hasClass("display-none")) {
                setActiveMCB("#" + panelAuditId, auditTabId);
            }
            else {
                resetActiveMCB("#" + panelAuditId, auditTabId);
            }
            resetActiveMCB("#" + panelMailId, mailTabId);
            resetActiveMCB("#" + panelNotesId, notesTabId);
            resetActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            resetActiveMCB("#" + panelReportsId, reportsTabId);
            resetActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            break;
        case panelMailId:
            if ($("#" + panelMailId).hasClass("display-none")) {
                setActiveMCB("#" + panelMailId, mailTabId);
            }
            else {
                resetActiveMCB("#" + panelMailId, mailTabId);
            }
            resetActiveMCB("#" + panelAuditId, auditTabId);
            resetActiveMCB("#" + panelNotesId, notesTabId);
            resetActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            resetActiveMCB("#" + panelReportsId, reportsTabId);
            resetActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            break;
        case panelNotesId:
            if ($("#" + panelNotesId).hasClass("display-none")) {
                setActiveMCB("#" + panelNotesId, notesTabId);
            }
            else {
                resetActiveMCB("#" + panelNotesId, notesTabId);
            }
            resetActiveMCB("#" + panelAuditId, auditTabId);
            resetActiveMCB("#" + panelMailId, mailTabId);
            resetActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            resetActiveMCB("#" + panelReportsId, reportsTabId);
            resetActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            break;
        case panelPrintPreviewId:
            if ($("#" + panelPrintPreviewId).hasClass("display-none")) {
                setActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            }
            else {
                resetActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            }
            resetActiveMCB("#" + panelAuditId, auditTabId);
            resetActiveMCB("#" + panelMailId, mailTabId);
            resetActiveMCB("#" + panelNotesId, notesTabId);
            resetActiveMCB("#" + panelReportsId, reportsTabId);
            resetActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            break;
        case panelReportsId:
            if ($("#" + panelReportsId).hasClass("display-none")) {
                setActiveMCB("#" + panelReportsId, reportsTabId);
            }
            else {
                resetActiveMCB("#" + panelReportsId, reportsTabId);
            }
            resetActiveMCB("#" + panelAuditId, auditTabId);
            resetActiveMCB("#" + panelMailId, mailTabId);
            resetActiveMCB("#" + panelNotesId, notesTabId);
            resetActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            resetActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            break;
        case panelReturnToProviderId:
            if ($("#" + panelReturnToProviderId).hasClass("display-none")) {
                setActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            }
            else {
                resetActiveMCB("#" + panelReturnToProviderId, returnToProviderTabId);
            }
            resetActiveMCB("#" + panelAuditId, auditTabId);
            resetActiveMCB("#" + panelMailId, mailTabId);
            resetActiveMCB("#" + panelNotesId, notesTabId);
            resetActiveMCB("#" + panelPrintPreviewId, printPreviewTabId);
            resetActiveMCB("#" + panelReportsId, reportsTabId);
            break;
    }
    accessibility508Support();
    changeBgColor();
}

function resetActiveMCB(mcbPanelId, mcbTab) {
    $(mcbPanelId).addClass("display-none");
    if (mcbTab !== null && mcbTab.length > 0) {
        $(mcbTab).removeClass("mcb-active-tab-item").removeClass("k-focus");
        $(mcbTab).find(".k-link").removeClass("mcb-active-tab-link");
        $(mcbPanelId).off("keypress click");
    }
}

function setActiveMCB(mcbPanelId, mcbTab) {
    $(mcbPanelId).removeClass("display-none");
    if (mcbTab !== null && mcbTab.length > 0) {
        $(mcbTab).addClass("mcb-active-tab-item");
        $(mcbTab).find(".k-link").addClass("mcb-active-tab-link");

        //Expand|Collapse panel support for MCB panels
        $(mcbPanelId).on("keypress click", ".content-panel-container div.clickable, .content-subpanel-container div.clickable", function (e) {
            expandCollapseAction(e, this);
        });
    }
}

function setHelpIcon(contentUrl, pnlHelpNode, iconId) {
    // If there is no Help Node associated with the Reports panel or URL do not show the Help Icon.
    let helpNode = getHelpNodeValue(contentUrl, pnlHelpNode);
    if (helpNode === '') {
        $(iconId).addClass("display-none-priority");
    }
}

function getHelpNodeValue(contentUrl, baseHelpId) {
    let urlParamString = contentUrl.split("?");
    let helpNodeParam = '';

    // Determine if the content URl (i.e. Audit, Reports or Notes URL) has a query parameter specifying
    // the help node to use specific to the page calling the content URL.
    if (urlParamString.length > 1) {
        urlParamString = urlParamString[1].split("&");
        for (let i = 0; i < urlParamString.length; i++) {
            helpNodeParam = urlParamString[i].search("helpNode");
            if (helpNodeParam !== -1) {
                return urlParamString[i].split("=")[1];
            }
        }
    }

    if (helpNodeParam === -1) {
        helpNodeParam = '';
    }

    // If there was no help node specified in the content URL use the help node ID associated with
    // the page being called (i.e. Audit, Reports or Notes panel).
    if (helpNodeParam === '' && baseHelpId !== '') {
        helpNodeParam = baseHelpId;
    }

    return helpNodeParam;
}

function closeMCBPanel(thisPnl) {
    let panelId = $(thisPnl).closest('.mcb-panel').attr('id');

    switch (panelId) {
        case panelAuditId:
            isAuditPanelLoaded = false;
            break;
        case panelMailId:
            isMailPanelLoaded = false;
            break;
        case panelNotesId:
            isNotesPanelLoaded = false;
            break;
        case panelPrintPreviewId:
            isPrintPreviewPanelLoaded = false;
            break;
        case panelReportsId:
            isReportsPanelLoaded = false;
            break;
        case panelReturnToProviderId:
            isReturnToProviderPanelLoaded = false;
            break;
    }
    closeHelpWindow();
    cleanKendoDynamicElements(panelId);
    toggleVisibility(panelId);
}

function openPopupInNewWindow(thisPnl, url, panelName) {
    toggleVisibility($(thisPnl).closest('.mcb-panel').attr('id'));
    closeHelpWindow();

    if (url.indexOf('?') != -1) {
        url = url + "&viewInNewWindow=true&panelName=" + panelName.toLowerCase()+ "&helpContentKey=" + helpContentKey;
    }
    else {
        url = url + "?viewInNewWindow=true&panelName=" + panelName.toLowerCase()+ "&helpContentKey=" + helpContentKey;
    }
    popupCenteredWindow(url, panelName);
}

// The function below is used for positioning and size of the help window.  It may be that this windows can be created more dynamically and if
// a better option is found this function will be replaced.
function popupCenteredHelpWindow(url, title) {

    let helpTab = document.getElementById("mcbHelpIcon");
    $("#mcbHelpIcon").attr("title", helpWindowHandle).tooltip();
    let helpPosition = helpTab.getBoundingClientRect();
    let helpPositionLeft = helpPosition.left || 0;
    let helpPositionTop = helpPosition.top || 0;

    let dualScreenLeft = window.screenLeft || window.screenX;
    let dualScreenTop = window.screenTop || window.screenY;

    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    let top = helpPositionTop + dualScreenTop;

    let popupWidth = screen.width / 1.8;
    let popupHeight = screen.height / 1.8;

    let left = dualScreenLeft + helpPositionLeft + helpTab.offsetWidth - popupWidth - 15;

    let params = "toolbar=1,menubar=1,scrollbars=0,resizable=1,top=" + top + ",left=" + left + ",width=" + popupWidth + ",height=" + popupHeight;

    if (title.length > 0) {
        newWindow[title] = window.open(url, title, params);

        if (window.focus) {
            newWindow[title].focus();
        }
    }
    else {
        let newWindowBlankTitle = window.open(url, "", params);

        if (window.focus) {
            newWindowBlankTitle.focus();
        }
    }
}
