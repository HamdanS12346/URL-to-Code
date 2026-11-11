//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

//---------------------------------------------
// Model Editor Event Hooks
//---------------------------------------------

var divChatPanel = null;
var divCoreContactUsBody = "#divCoreContactUsBody";
var divCoreBroadcastMsgBody = "#divCoreBroadcastMsgBody";
var divLoginBody = "#divLoginBody";
var elemChat = null;
var IsInitiallyLoadBroadCast = false;
var iconFaqStickyCaretUp = '&nbsp;<i class="fa-solid fa-caret-up fa-lg"></i>';
var iconFaqStickyCaretDown = '&nbsp;<i class="fa-solid fa-caret-down fa-lg"></i>';
var isForMobile;

$(document).ready(function () {
    $(".aag-menu").kendoMenu({
        openOnClick: true
    });
    if ((typeof isChangingPIN == 'undefined' || !isChangingPIN) && chkBroadcastMsgTab()) {
        var elemLi = "";
        var elemA = "";
        IsInitiallyLoadBroadCast = true;
        if (sessionStorage.getItem("ShowBroadCastMessage") === null) {
            sessionStorage.setItem("IsAckMsg", "False");
            sessionStorage.setItem("ShowBroadCastMessage", "True");
            if (isExternalPortal === 'True') {
                if (activePortal === "ExternalManagedCarePortal") {
                    elemLi = document.getElementById('AAGExtMCOMenu.BroadcastMessages' + (isForMobile ? "_mbl" : ""));
                }
                else if (activePortal === "ExternalMemberPortal") {
                    elemLi = document.getElementById('AAGExtMbrMenu.BroadcastMessages' + (isForMobile ? "_mbl" : ""));
                }
                else if (activePortal === "ExternalDrugRebatePortal")
                {
                    elemLi = document.getElementById('AAGExtDRMenu.BroadcastMessages' + (isForMobile ? "_mbl" : ""));
                }
                else {
                    elemLi = document.getElementById('AAGExtPrvMenu.BroadcastMsg' + (isForMobile ? "_mbl" : ""));
                }
            }
            else {
                elemLi = document.getElementById('AAGMenu.BroadcastMsg' + (isForMobile ? "_mbl" : ""));
            }
            elemA = elemLi.getElementsByTagName('a')[0];
            elemA.classList.add('aag-menu-item-focus');
            getBroadcastMsg();
        }
        else if (sessionStorage.getItem("IsAckMsg") === "True") {
            if (isExternalPortal === 'True') {
                if (activePortal === "ExternalManagedCarePortal") {
                    elemLi = document.getElementById('AAGExtMCOMenu.BroadcastMessages' + (isForMobile ? "_mbl" : ""));
                }
                else if (activePortal === "ExternalMemberPortal") {
                    elemLi = document.getElementById('AAGExtMbrMenu.BroadcastMessages' + (isForMobile ? "_mbl" : ""));
                }
                else if (activePortal === "ExternalDrugRebatePortal") {
                    elemLi = document.getElementById('AAGExtDRMenu.BroadcastMessages' + (isForMobile ? "_mbl" : ""));
                }
                else {
                    elemLi = document.getElementById('AAGExtPrvMenu.BroadcastMsg' + (isForMobile ? "_mbl" : ""));
                }
            }
            else {
                elemLi = document.getElementById('AAGMenu.BroadcastMsg' + (isForMobile ? "_mbl" : ""));
            }
            elemA = elemLi.getElementsByTagName('a')[0];
            elemA.classList.add('aag-menu-item-focus');
            getBroadcastMsg();
        }
        IsInitiallyLoadBroadCast = false;
    }
    else {
        sessionStorage.setItem("IsAckMsg", "False");
    }
});

function toggleVisibilityStyle(panel) {
    var elem = document.getElementById(panel);
    var elemBroadcastMsg = document.getElementById("divCoreBroadcastMsg");
    if (divChatPanel != null) {
        elemChat = document.getElementById(divChatPanel);
    }
    var elemCoUs = document.getElementById("divCoreContactUs");
    var elemExt = document.getElementById("divExternalLinks");
    var elemFav = document.getElementById("divFavorites");
    var elemLogin = document.getElementById("divLogin");
    var ele = document.getElementById("AAGMenu.ExternalLinks");
    if (elem.style.visibility === "visible") {
        cleanKendoToolTipElements();

        // For AAG panels, tooltips don't work correctly on Android mobile devices, so this basically
        // turns off the tool tip for the Close icon in the displayed AAG panel.
        if ('ontouchstart' in window) {
            if ($("#CloseBroadcastMsgPanel").data("kendoTooltip")) {
                $("#CloseBroadcastMsgPanel").data("kendoTooltip").destroy();
            }
            if ($("#ExternalLinksClose").data("kendoTooltip")) {
                $("#ExternalLinksClose").data("kendoTooltip").destroy();
            }
            if ($("#FavoritesClose").data("kendoTooltip")) {
                $("#FavoritesClose").data("kendoTooltip").destroy();
            }
            if ($("#IntContactUsClose").data("kendoTooltip")) {
                $("#IntContactUsClose").data("kendoTooltip").destroy();
            }
            if ($("#overlayCloseIcon").data("kendoTooltip")) {
                $("#overlayCloseIcon").data("kendoTooltip").destroy();
            }
        }

        if (elem.id === "divLogin") {
            $("#divLogin").empty();
            if (typeof overlayInfoArray !== 'undefined') {
                if (overlayInfoArray.length > 0) {
                    overlayInfoArray.pop();
                }
            }
        }

        elem.style.visibility = "hidden";
        $(".disabled-backdrop").remove();
        clearAAGMenu();
        sessionStorage.removeItem("SelectedTabType");
        reloadScrollBars();
    }
    else {
        unloadScrollBars();
        elem.style.visibility = "visible";
        if (elem.id === "divExternalLinks") {
            elemBroadcastMsg.style.visibility = "hidden";
            elemCoUs.style.visibility = "hidden";
            if (elemChat != null) {
                elemChat.style.visibility = "hidden";
            }
            elemFav.style.visibility = "hidden";
            //var offset = ele.offsetLeft - 11;
            //elemExt.style.left = offset + "px";

            $("#divExternalLinksBody").focus();
            setUpAtAGlanceTabbingHandlers(null, null, 'ExternalLinksClose', 'divExternalLinks');

            disableBg();
            closeMobileNav();
        }
        else if (elem.id === "divFavorites") {
            elemBroadcastMsg.style.visibility = "hidden";
            if (elemChat != null) {
                elemChat.style.visibility = "hidden";
            }
            elemCoUs.style.visibility = "hidden";
            elemExt.style.visibility = "hidden";
        }
        else if (elem.id === "divCoreContactUs") {
            elemBroadcastMsg.style.visibility = "hidden";
            if (elemChat != null) {
                elemChat.style.visibility = "hidden";
            }
            elemExt.style.visibility = "hidden";
            elemFav.style.visibility = "hidden";
            elemLogin.style.visibility = "hidden";
        }
        else if (elem.id === "divLogin") {
            if (elemChat != null) {
                elemChat.style.visibility = "hidden";
            }
            elemCoUs.style.visibility = "hidden";
        }
        else if (elem.id === "divCoreBroadcastMsg") {
            if (isExternalPortal === 'True') {
                hideExternalPortalMenusDiv();
            }
            else {
                if (elemChat != null) {
                    elemChat.style.visibility = "hidden";
                }
                elemCoUs.style.visibility = "hidden";
                elemExt.style.visibility = "hidden";
                elemFav.style.visibility = "hidden";
            }
        }
        else if (divChatPanel != null) {
            if (elem.id === divChatPanel) {
                elemBroadcastMsg.style.visibility = "hidden";
                elemCoUs.style.visibility = "hidden";
                elemExt.style.visibility = "hidden";
                elemFav.style.visibility = "hidden";
                elemLogin.style.visibility = "hidden";
            }
        }
    }
}

function hideExternalPortalMenusDiv() {
    var elemExtPortCoUs = document.getElementById("divPortalContactUs");
    var elmExtPort = document.getElementById("divPortalFAQ");
    elemExtPortCoUs.style.visibility = "hidden";
    elmExtPort.style.visibility = "hidden";
}
function closeMobileNav() {
    $("#mainMenuContainer").removeClass("display-flex").addClass("display-none");
}
function disableBg() {
    if ($("body").find(".disabled-backdrop").length == 0) {
        $("body").append("<div class='disabled-backdrop'></div>");
    }
}
//-----------------------------------------------------------------------------------------
// At A Glance Language functions
//-----------------------------------------------------------------------------------------
function getLanguage() {
    openModalOverlay("languageOverlay", "/Notification/Languages", "panelForm-col-2", null, null);
    closeMobileNav();
}

function onLanguagesClose() {
    closeModalOverlay("languageOverlay");
    $(".disabled-backdrop").remove();
}

//-----------------------------------------------------------------------------------------
// At A Glance Favorites functions
//-----------------------------------------------------------------------------------------
function getFavorites(moduleName) {
    var elmFav = document.getElementById("divFavorites");
    if (elmFav.style.visibility === "visible") {
        toggleVisibilityStyle('divFavorites');
    }
    else {
        if (moduleName == undefined) {
            moduleName = "";
        }
        var result = makeSyncWebApiCall("/Favorites/FavoritesContent", "POST", { name: moduleName }, "application/x-www-form-urlencoded; charset=UTF-8");
        if (result.IsValid) {
            onLoadFavoritesContentSuccess(result.Data);
        }
    }
    disableBg();
    closeMobileNav();
}

function onLoadFavoritesContentSuccess(data) {
    $("#divFavoritesBody").removeAttr('style');
    $("#divFavoritesBody").html(data);
    toggleVisibilityStyle('divFavorites');
    unloadScrollBars();
    ExpandHelpItem('divFavoritesBody', 'ShowFavoritesBody', 'HideFavoritesBody');

    $("#pagesButton").focus();
    $("#favoritesButton").attr("tabindex", "0");
    setUpAtAGlanceTabbingHandlers('HideFavoritesBody', 'ShowFavoritesBody', 'FavoritesClose', 'divFavorites');
}

function reloadFavorites(moduleName) {
    var result = makeSyncWebApiCall("/Favorites/FavoritesContent", "POST", { name: moduleName }, "application/x-www-form-urlencoded; charset=UTF-8");
    if (result.IsValid) {
        onReloadFavoritesContentSuccess(result.Data);
    }
}

function onReloadFavoritesContentSuccess(data) {
    $("#divFavoritesBody").html(data);
    unloadScrollBars();
}

function getContactUs() {
    var result = makeSyncWebApiCall("/Notification/ContactUs", "GET", { viewInNewWindow: false }, "application/json");
    if (result.IsValid) {
        onLoadContactUsContentSuccess(result.Data);
    }
    disableBg();
    closeMobileNav();
}

function onLoadContactUsContentSuccess(data) {
    $(divCoreContactUsBody).html(data);
    unloadScrollBars();
    toggleVisibilityStyle('divCoreContactUs');
    ExpandHelpItem('divCoreContactUsBody', 'ShowCoreContactUsBody', 'HideCoreContactUsBody');

    $("#openExtContactUsInSeparateWindow").focus();
    $("#intPortalContactUsCloseButton").show();
    setUpAtAGlanceTabbingHandlers('HideCoreContactUsBody', 'ShowCoreContactUsBody', 'IntContactUsClose', 'divCoreContactUs');
}

function getLogin() {
    if (isOidcEnabled) {
        window.location = securitySignInUrl;
    }
    else {
        var result = makeSyncWebApiCall(checkUserLoggedInStatusUrl, "GET", null, "application/json");
        if (result.Data) {
            window.location = homeIndexUrl;
        }
        else {
            var result = makeSyncWebApiCall("/Access/Login", "GET", null, "application/json");
            if (result.IsValid) {
                onLoadLoginContentSuccess(result.Data);
                disableBg();
            }
            //hideLoadingDialog();
            closeMobileNav();
        }
    }
}

function onLoadLoginContentSuccess(data) {
    $('#divLogin').html(data);
    unloadScrollBars();
    if (isRecaptchaEnabled == "true") {
        grecaptcha.render("recaptcha_container", {
            sitekey: recaptchaSiteKey
        });
    }
    commonPageEssentials('#divLogin');
    toggleVisibilityStyle('divLogin');
    focusFirstElement('#divLogin');
}

function getBroadcastMsg() {
    disableBg();
    closeMobileNav();
    var acknowledgedMsg = "";
    if (sessionStorage.getItem('IsAcknowledgedMessage') === 'True') {
        acknowledgedMsg = "True";
    }
    else {
        acknowledgedMsg = "False";
    }

    var result = makeSyncWebApiCall("/Notification/BroadcastMsg" + "?isAcknowledgedMsg=" + acknowledgedMsg, "GET", null, "application/json");
    if (result.IsValid) {
        onLoadBroadcastMsgContentSuccess(result.Data);
    }
    else {
        $(".disabled-backdrop").remove();
    }
    sessionStorage.setItem('IsAcknowledgedMessage', 'False');
}

function onLoadBroadcastMsgContentSuccess(data) {
    let isAcknowledgeable = "";
    let noBroadcastMessage = "";
    $(divCoreBroadcastMsgBody).html(data);
    $(divCoreBroadcastMsgBody).find("#NoBroadcastMessage").each(function (i) {
        noBroadcastMessage = "NoBroadcastMessage";
    });
    if (IsInitiallyLoadBroadCast === true && noBroadcastMessage === "NoBroadcastMessage") {
        clearAAGMenu();
    }
    if ((IsInitiallyLoadBroadCast === true && noBroadcastMessage !== "NoBroadcastMessage") || IsInitiallyLoadBroadCast === false) {
        if (sessionStorage.getItem('IsBroadcastMsgWindowActive') !== 'True') {
            toggleVisibilityStyle('divCoreBroadcastMsg');
        }
        else {
            sessionStorage.setItem('IsBroadcastMsgWindowActive', 'False');
        }
        ExpandHelpItem('divCoreBroadcastMsgBody', 'ShowCoreBroadcastMsgBody', 'HideCoreBroadcastMsgBody');
        $("#MinusSquareBroadcastMsg").on("click", function () {
            $(this).parent().parent().next().css("height", "auto !important");
            $("#divCoreBroadcastFullMsg .aag-panel-body").css("height", "auto !important");
        });

        $(divCoreBroadcastMsgBody).find(".is-acknowledgeable").each(function (i) {
            isAcknowledgeable = "IsAcknowledgeable";
        });

        // If we are on the Current tab and not the Acknowledged tab
        if (sessionStorage.getItem('IsAcknowledgedMessage') !== 'True') {
            // If we have messages to acknowledge
            if (isAcknowledgeable === 'IsAcknowledgeable') {
                $('#InstructionsAcknowledgeBroadcastMsg').show();
                disableMenus();
                sessionStorage.setItem("IsAckMsg", "True");
            }
            else {
                $('#InstructionsAcknowledgeBroadcastMsg').hide();
                enableMenus();
            }
        }
        else {
            $('#InstructionsAcknowledgeBroadcastMsg').hide();
        }

        if (!IsInitiallyLoadBroadCast && noBroadcastMessage === "NoBroadcastMessage" && sessionStorage.getItem('IsAcknowledgedMessage') !== 'True') {
            $('#InstructionsAcknowledgeBroadcastMsg').show();
        }
        unloadScrollBars();
    }
    else {
        $(".disabled-backdrop").remove();
        enableMenus();
    }
    IsInitiallyLoadBroadCast = false;
    $("#curMsgButton").focus();
    setUpAtAGlanceTabbingHandlers('HideCoreBroadcastMsgBody', 'ShowCoreBroadcastMsgBody', 'CloseBroadcastMsgPanel', 'divCoreBroadcastMsg');
}

function refreshFavoritesContent() {
    var result = makeSyncWebApiCall("/Favorites/GetFavoritesModuleContent", "GET", null, "application/json");
    if (result.IsValid) {
        onRefreshFavoritesContentSuccess(result.Data);
    }
}

function onRefreshFavoritesContentSuccess(data) {
    $("#moduleContent").html(data);
}

function chkBroadcastMsgTab() {
    let forMobile = (typeof isForMobile == 'undefined') ? false : isForMobile;

    let elemBroadcastMsg = document.getElementById('AAGMenu.BroadcastMsg' + (forMobile ? "_mbl" : ""));
    let elemExtPrvPortalBroadcastMsg = document.getElementById('AAGExtPrvMenu.BroadcastMsg' + (forMobile ? "_mbl" : ""));
    let elemExtMbrPortalBroadcastMsg = document.getElementById('AAGExtMbrMenu.BroadcastMessages' + (forMobile ? "_mbl" : ""));
    let elemExtMCOPortalBroadcastMsg = document.getElementById('AAGExtMCOMenu.BroadcastMessages' + (forMobile ? "_mbl" : ""));
    let elemExtDRPortalBroadcastMsg = document.getElementById('AAGExtDRMenu.BroadcastMessages' + (forMobile ? "_mbl" : ""));

    let isAuth = false;
    if (elemBroadcastMsg !== null || elemExtPrvPortalBroadcastMsg !== null || elemExtMbrPortalBroadcastMsg !== null || elemExtMCOPortalBroadcastMsg !== null || elemExtDRPortalBroadcastMsg != null) {
        isAuth = true;
    }
    return isAuth;
}

$("#googleSearch").on("keydown", function (event) {
    var keycode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
    if (keycode == 13) {
        event.preventDefault();
        googleSearch_onClick();
    }
});

function googleSearch_onClick() {
    searchString = $("#googleSearch").val();
    var win = window.open('/Home/CustomGoogleSearch?searchString=' + searchString, '_blank');
    win.focus();
}

function googleSearchMobile_onClick() {
    searchString = $("#googleSearchMobile").val();
    var win = window.open('/Home/CustomGoogleSearch?searchString=' + searchString, '_blank');
    win.focus();
}

function allResult(cxCode, tabId) {
    var strValue = $('#gsc-i-id1').val();
    var url = googleSearchUrl + "?searchString=" + strValue + "&tabCode=" + cxCode + "&tabId=" + tabId;
    window.location = url;
}

function setUpAtAGlanceTabbingHandlers(minIcn, maxIcn, closeIcn, formId) {
    lastKendoControl = $('#' + formId).find(".k-widget[aria-disabled='false']:visible:has(input:not(:disabled),input:not(:disabled):visible,textarea:not(:disabled):visible,select:not(:disabled):visible").last();
    if (minIcn == null) {
        minIcon = minIcn;
    }
    else {
        minIcon = $("#" + minIcn);
    }
    closeIcon = $("#" + closeIcn);
    maxIcon = $("#" + maxIcn);

    if (lastKendoControl == null) {
        lastKendoControl = closeIcon;
    }

    // If the last field on the form has the focus and the Tab key is pressed set the focus on the help icon if it is there or the close icon if it isn't.
    $(lastKendoControl).on('keydown', function (e) {
        if ($("this:focus") && e.which === 9 && !e.shiftKey) {
            e.preventDefault();
            if (minIcon == null) {
                $(closeIcon).focus();
            }
            else {
                $(minIcon).focus();
            }
        }
    });

    $(minIcon).on('keydown', function (e) {
        if ($("this:focus") && e.which === 9 && !e.shiftKey) {
            e.preventDefault();
            $(closeIcon).focus();
        }
        else if ($("this:focus") && e.which === 9 && e.shiftKey) {
            e.preventDefault();
            $(lastKendoControl).focus();
        }
    });

    $(maxIcon).on('keydown', function (e) {
        if ($("this:focus") && e.which === 9) {
            e.preventDefault();
            $(closeIcon).focus();
        }
    });

    $(closeIcon).on('keydown', function (e) {
        if ($("this:focus") && e.which === 9 && e.shiftKey) {
            if (minIcon && minIcon.is(":visible")) {
                e.preventDefault();
                $(minIcon).focus();
            }
            else if(maxIcon && maxIcon.is(":visible")) {
                e.preventDefault();
                $(maxIcon).focus();
            }
            else {
                e.preventDefault();
                $(lastKendoControl).focus();
            }
        }
        else if ($("this:focus") && e.which === 9 && !e.shiftKey) {
            if (maxIcon && maxIcon.is(":visible")) {
                e.preventDefault();
                $(maxIcon).focus();
            }
        }
    });
}

function messagesClose() {
    toggleVisibilityStyle('divCoreBroadcastMsg');
}

function extLinksClose() {
    toggleVisibilityStyle('divExternalLinks');
}

function portalFavoriteClose() {
    toggleVisibilityStyle('divFavorites');
}

function intPortalContactUsClose() {
    toggleVisibilityStyle('divCoreContactUs');
}