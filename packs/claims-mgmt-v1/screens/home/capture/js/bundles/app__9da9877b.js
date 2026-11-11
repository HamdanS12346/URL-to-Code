/* Minification failed. Returning unminified contents.
(2719,28-29): run-time error JS1195: Expected expression: .
(2719,40-41): run-time error JS1003: Expected ':': )
(2720,32-33): run-time error JS1008: Expected '{': .
(2725,1-9): run-time error JS1006: Expected ')': function
(2703,1-66): run-time error JS1301: End of file encountered before function is properly closed: function populateRedactionWidget(redactWidgetId, unredactedValue)
(8854,1): run-time error JS1107: Expecting more source characters
(2720,9,2721,6): run-time error JS1314: Implicit property name must be identifier: $(redactWidgetRawValId).attr("data-original-value", unredactedValue);
    }
 */
/*
 * metismenu - v1.1.3
 * Easy menu jQuery plugin for Twitter Bootstrap 3
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */
!function(a,b,c){function d(b,c){this.element=a(b),this.settings=a.extend({},f,c),this._defaults=f,this._name=e,this.init()}var e="metisMenu",f={toggle:!0,doubleTapToGo:!1};d.prototype={init:function(){var b=this.element,d=this.settings.toggle,f=this;this.isIE()<=9?(b.find("li.active").has("ul").children("ul").collapse("show"),b.find("li").not(".active").has("ul").children("ul").collapse("hide")):(b.find("li.active").has("ul").children("ul").addClass("collapse in"),b.find("li").not(".active").has("ul").children("ul").addClass("collapse")),f.settings.doubleTapToGo&&b.find("li.active").has("ul").children("a").addClass("doubleTapToGo"),b.find("li").has("ul").children("a").on("click."+e,function(b){return b.preventDefault(),f.settings.doubleTapToGo&&f.doubleTapToGo(a(this))&&"#"!==a(this).attr("href")&&""!==a(this).attr("href")?(b.stopPropagation(),void(c.location=a(this).attr("href"))):(a(this).parent("li").toggleClass("active").children("ul").collapse("toggle"),void(d&&a(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide")))})},isIE:function(){for(var a,b=3,d=c.createElement("div"),e=d.getElementsByTagName("i");d.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",e[0];)return b>4?b:a},doubleTapToGo:function(a){var b=this.element;return a.hasClass("doubleTapToGo")?(a.removeClass("doubleTapToGo"),!0):a.parent().children("ul").length?(b.find(".doubleTapToGo").removeClass("doubleTapToGo"),a.addClass("doubleTapToGo"),!1):void 0},remove:function(){this.element.off("."+e),this.element.removeData(e)}},a.fn[e]=function(b){return this.each(function(){var c=a(this);c.data(e)&&c.data(e).remove(),c.data(e,new d(this,b))}),this}}(jQuery,window,document);;
//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2022. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
// Global variables
//-----------------------------------------------------------------------------------------
var bttDuration = 500;
var bttOffset = 220;
var activePortalId = null;
var colhdrTooltip = null;
var dpObserver = null;
var favoriteType = {
    Page: 0,
    Search: 1
};
var filterNav;
var filterSeqId = 0;
var fltrNavPosTop;
var gridPrimaryToolbar = null;
var gridSecondaryToolbar = null;
var hasSessionExpired;
var headerHeight;
var helpContentKey;
var helpDefaultContentKey;
var helpTypePrefix;
var helpWindowHandle;
var isFirstSessionCheck;
var itemsNotToCheck = [];
var kacObserver = null;
var msObserver = null;
var mainMenu = "#mainMenu";
var objectName = '';
var objectNames = [];
var pageHeader = $('#pageHeader');
var panelTypeContent = "panel";
var panelTypeDshbrdContent = "dashboard";
var panelTypeMCB = "mcb";
var panelTypeSubContent = "subpanel";
var panelTypeSubSection = "subsec";
var panelTypeTOC = "toc";
var pghdrObserver = null;
var policyPanel = "#policyPanel";
var prevFocusControl;
var resizeObserver = null;
var ssoPanelId = "ssoPanel";
var unredactedSize = 4;
var uplObserver = null;
var vmObserver = null;

//-----------------------------------------------------------------------------------------
// Document ready function
//-----------------------------------------------------------------------------------------
$(document).ready(function () {

    if (!sessionStorage.getItem("FirstSessionCheck")) {
        isFirstSessionCheck = true
        sessionStorage.setItem("FirstSessionCheck", true);
    }

    // If the user is not an SSO user and they are coming in fresh, meaning they have not authenticated or logged in yet,
    // and this is the first window to be loaded, we need to make sure we are on the unsecured page.  This code is to
    // prevent a user from being able to restart the application in an existing browser window or browser tab (after
    // previously shutting down a browser window or tab that had the application running in it) into a secured page.
    if ((!isOidcEnabled && isIdentityManagementEnabled && !userLoggedIn && globalIsExemptSessionTimeout === 'False') && isFirstSessionCheck) {
        isFirstSessionCheck = false;
        if (window.location.href != host + loginUrl && window.location.href != host + "/") {
            makeAsyncWebApiCall(logoffWebApiUrl, "PUT", null, "application/x-www-form-urlencoded", "processLogoffSuccess");
        }
    }

    let divMitaStepsBody;

    //Check if the app is running on a mobile device
    const isMobile = isPhone();

    //Check if the cookies are disabled
    isCookiesDisabled();

    // Initialize Kendo culture
    kendo.culture(globalLocaleCode);

    // set placeholder height (in pixels) of MCB menu for use with sticky menu
    if ($(".aag-google-srch-container").length > 0) {
        $(".aag-menu-bar").addClass("active-search-bar");
    }
    // Format Kendo menus and controls
    if ($(mainMenu).length) {
        $(mainMenu).kendoMenu({
            openOnClick: false,
            scrollable: true,
            orientation: "vertical"
        });

        $(mainMenu).find(".k-link.k-menu-link").each(function () {
            if ($(this).closest(".child-menu").length > 0) {
                $(this).find("i").remove();
            }
            else {
                $(this).find("i.fa").removeClass("fa").addClass("k-menu-expand-arrow-icon k-icon fa-solid fa-chevron-left fa-lg");
                $(this).find("span.k-menu-expand-arrow").remove();
            }
        });
    }

    if ($(mainMenu).length) {
        $("#mcbMenu").kendoMenu({
            openOnClick: true
        });

        if (mcbMitaHelpContent.length > 0) {
            divMitaStepsBody = $("#divMitaStepsBody");
            if (divMitaStepsBody.length) {
                divMitaStepsBody.html($("<div/>").html(mcbMitaHelpContent).text());
            }
        }
    }

    if ($("#activeModuleMenu").length > 0) {
        $("#activeModuleMenu").kendoMenu({
            openOnClick: false,
            scrollable: true
        });
        $("#activeModuleMenu").css("height", "");
        $("#activeModuleMenu").attr("tabindex", "-1");
    }

    if ($("#activeModuleMenuFirstItem").length > 0) {
        $("#activeModuleMenu").css("display", "block");
        $("#activeModuleMenu").attr("tabindex", "0");
        $(".menu").css("height", "3.2rem");
        $("#activeScreen").css("display", "block");
        $("#pageHeader.header").css("border-bottom", "0");
        let set = $('#activeModuleMenuFirstItem .k-menu-group').children();
        for (let i = 0, len = set.length; i < len; i += (set.length / 2 + 1)) {
            set.slice(i, i + (set.length / 2 + 1)).wrapAll('<div class="col-md-6"/>');
        }
    }

    if ($("#activeModuleMenu").length > 0) {
        $("#mcbMenu").kendoMenu({
            openOnClick: true
        });

        if (mcbMitaHelpContent.length > 0) {
            divMitaStepsBody = $("#divMitaStepsBody");
            if (divMitaStepsBody.length) {
                divMitaStepsBody.html($("<div/>").html(mcbMitaHelpContent).text());
            }
        }
    }

    sessionStorage.setItem('initialBodyWellPadding', 0);

    $("#aagMenu").click(function (e) {
        if (sessionStorage.getItem("IsAckMsg") === "False") {
            let focusedElement = $(document.activeElement);
            let aagMenuAlreadyActive = $(focusedElement).hasClass('aag-menu-item-focus');

            // This call to clear the menu is needed to clear the menu if a user previously clicked a tab
            // and is now clicking a different tab.  The original tab needs to go back to normal.
            clearAAGMenu();

            if (focusedElement.length > 0) {
                if (!aagMenuAlreadyActive) {
                    $(focusedElement).addClass('aag-menu-item-focus');
                }
            }
        }
    });

    if ($("#extprtlIntMenu").length > 0) {
        $("#mcbMenu").kendoMenu({
            openOnClick: true
        });
    }

    addEventListener("click", function (e) {
        if ($(e.target).parent().hasClass("msg-inline-close")) {
            $(e.target).parent().parent().hide();
        }
    });
    // add background image for the mobile portrait orientation message
    $("#orientationPortrait").css("background-image", "url('" + globalMobileOrientationImg + "')");

    externalPortalAdjustments();

    $(window).on("scroll", function () {
        filterNav = $('#filterNav');
        if (pageHeader.length) {
            let screenWidth = this.window.innerWidth > 0 ? this.window.innerWidth : this.screen.width;
            if ($(window).scrollTop() > 0 && screenWidth > 368) {
                if (pageHeader.hasClass('header-scroll') === false) {
                    pageHeader.addClass('header-scroll');
                }
            }
            else {
                if (pageHeader.hasClass('header-scroll')) {
                    pageHeader.removeClass('header-scroll');
                }
            }
        }
        if (filterNav.length) {
            if (($(window).scrollTop() + headerHeight) >= fltrNavPosTop) {
                if ($("#pageHeader").hasClass("headroom--pinned")) {
                    $("#filterNav").css("position", "fixed");
                    $("#filterNav").css("top", (headerHeight / 10).toString() + "rem");
                }
                else {
                    $("#filterNav").css("position", "fixed");
                    $("#filterNav").css("top", "0");
                }
            } else {
                $("#filterNav").css("position", "absolute");
                $("#filterNav").css("top", "auto");
            }
        }

        if (!isMobile) {
            if ($(this).scrollTop() > bttOffset) {
                $(".back-to-top").fadeIn(bttDuration);
            } else {
                $(".back-to-top").fadeOut(bttDuration);
            }
        }
    });

    $(document).on("keydown", function (e) {
        if (e.which === 8 && !$(e.target).is("input:not([readonly]):not([type=radio]):not([type=checkbox]), textarea, [contentEditable], [contentEditable=true]")) {
            e.preventDefault();
        }
    });

    $(".back-to-top").click(function (e) {
        scrollBackToTop(e);
        return false;
    });

    $(".col-highlights a").on("click", function () {
        showLoadingDialog();
    });

    // Toggle FilterNav panel open and closed
    shortcut.add("Ctrl+Shift+F", function () {
        if ($('#filterNav').length) {
            toggleFilterNav();
        }
    });

    // Toggle widget help tooltips
    shortcut.add("Ctrl+Shift+H", function (e) {
        let tooltip = null;
        if ($(e.target).hasClass("fa-circle-question")) {
            // When focus is on the help icon...
            let focusedWidgetId = sessionStorage.getItem('focusedWidgetId');
            $(e.target).attr("tabindex", "-1").removeClass("editor-icon-focus");
            $("#" + focusedWidgetId).focus();
            tooltip = $(e.target).data("kendoTooltip");
            tooltip.hide();
            sessionStorage.removeItem("focusedWidgetId");
        }
        else {
            // When focus is on the input...
            let widgetEditorField = $(e.target).closest(".editor-field");
            if (widgetEditorField !== null && widgetEditorField.length > 0) {
                let widgetTooltip = $(widgetEditorField).siblings(".editor-label").find("span.fa-solid.fa-circle-question[data-role='tooltip']");

                if ($(widgetEditorField).find(".k-editor").length > 0) {
                    let editorId = null;
                    editorId = $(widgetTooltip).attr("id") + "Editor";
                    $(widgetEditorField).find(".k-editor").attr("id", editorId);
                    $("#" + editorId).attr("tabindex", "0");
                    sessionStorage.setItem("focusedWidgetId", editorId);
                }
                else if ($(widgetEditorField).hasClass("assoc-box-checkbox")) {
                    let checkboxId = null;
                        widgetTooltip = $(widgetEditorField).find("span.fa-solid.fa-circle-question[data-role='tooltip']");
                        checkboxId = $(widgetEditorField).find("input").attr("id");
                        sessionStorage.setItem("focusedWidgetId", checkboxId);
                }
                else if ($(widgetEditorField).find(".assoc-box-radio-btn-list-horz")) {
                    let radioBtnListId = null;
                    if ($(widgetEditorField).hasClass("readonly-widget")) {
                        // Add read-only version of code here if it ever becomes applicable
                    }
                    else {
                        radioBtnListId = $(e.target).attr("id");
                    }
                    sessionStorage.setItem("focusedWidgetId", radioBtnListId);
                }
                else if ($(widgetEditorField).find(".k-dropdown-wrap").length > 0) {
                    let dropdownId = null;
                    dropdownId = $(widgetEditorField).find(".k-input").attr("id");
                    if (dropdownId === undefined) {
                        dropdownId = $(widgetTooltip).attr("id") + "DropDownList";
                        $(widgetEditorField).find(".k-input").attr("id", dropdownId);
                    }
                    $("#" + dropdownId).attr("tabindex", "0");
                    sessionStorage.setItem("focusedWidgetId", dropdownId);
                }
                else if ($(widgetEditorField).find(".k-multiselect").length > 0) {
                    let multiselectId = null;
                    multiselectId = $(widgetEditorField).find("select").attr("id");
                    $(widgetEditorField).find(".k-input").attr("id", multiselectId);
                    sessionStorage.setItem("focusedWidgetId", multiselectId);
                }
                else if ($(widgetEditorField).find(".k-upload").length > 0) {
                    let uploadId = null;
                    uploadId = $(widgetEditorField).find("input").attr("id");
                    sessionStorage.setItem("focusedWidgetId", uploadId);
                }
                else {
                    sessionStorage.setItem("focusedWidgetId", e.target.id);
                }

                if (widgetTooltip !== null && widgetTooltip.length > 0) {
                    $(widgetTooltip).attr("tabindex", "0").addClass("editor-icon-focus").focus();
                    tooltip = $(widgetTooltip).data("kendoTooltip");
                    tooltip.show();
                }
            }
        }

        // Removes the blue border from a widget's help icon when the icon loses focus (both keyboard and mouse)
        $(".editor-icon.fa-circle-question").blur(function () {
            $(this).removeClass("editor-icon-focus");
        });
    });

    // Scroll browser window back to top
    shortcut.add("Ctrl+Shift+Page_up", function (e) {
        scrollBackToTop(e);
    });

    $("[data-hide]").on("click keypress", function (e) {
        if (e.type == "click" || (e.type == "keypress" && e.keyCode === 32)) {
            $(this).closest(".validation-summary").hide();
        }
    });

    $("div.msg-inline-close").on("keypress click", function (e) {
        if (e.type == "click" || (e.type == "keypress" && e.keyCode === 32)) {
            let container = $(e.target).closest(".msg-inline").parent();
            if (container && container.length > 0) {
                container.empty();
            }
        }
    });

    if ($(".app-title").text().trim() === "") {
        $(".app-title").removeAttr("tabindex");
    }
    if ($(".system-name").text().trim() === "") {
        $(".system-name").removeAttr("tabindex");
    }

    // Start Mobile Events
    $('.fa-circle-question').on('touchstart', function (e) {
        let focusedWidgetId = sessionStorage.getItem('focusedWidgetId');
        $("#" + focusedWidgetId).focus();
        let tooltip = $(e.target).data("kendoTooltip");
        tooltip.show();
        sessionStorage.setItem("focusedWidgetId", null);
    });
    // End Mobile Events

    // Capture and correct inline grid validation messages that are being incorrectly structured causing them to vary from the standard.
    // NOTE: DOMSubtreeModified has been deprecated and will not work properly in some browsers (e.g. Firefox).  This needs to be converted
    // to use mutation observation as performed for the MultiSelect widget in window.load()
    $("body").on('DOMSubtreeModified', ".k-grid-content td[role='gridcell'] input.k-textbox", function () {
        $(".k-grid-content td[role='gridcell']").find("div.k-form-error.k-invalid-msg.field-validation-error").each(function () {
            $(this).replaceWith(function () {
                $(this).find("div.k-callout").remove();
                let msgInnerHtml = this.innerHTML;
                let msgOuterHtml = $(this).clone().attr('style', '').empty();
                let replacementSpan = $("<span>").append(msgInnerHtml);
                $.each(msgOuterHtml[0].attributes, function (index, attribute) {
                    $(replacementSpan).attr(attribute.name, attribute.value);
                });
                return replacementSpan;
            });
        });
    });

    // This is to resolve the issue where field-level error messages are not showing up correctly in in-line edit grids.  They are not formatted and
    // they do not appear within the cell so they overwrite the cell beneath them.  It looks like the last Kendo upgrade we took rendered in-line edit grids
    // differently than they did before.  I created a new event handler for DOM changes for these grids and set the search classes to match what Kendo now appears
    // to be generating.  The DOMSubtreeModified event handler above may be able to be removed eventually.
    $("body").on('DOMSubtreeModified', ".k-grid-edit-row td[role='gridcell'] span.k-widget.editor-control", function () {
        $(".k-grid-edit-row td[role='gridcell']").find("div.k-invalid-msg.field-validation-error").each(function () {
            $(this).replaceWith(function () {
                $(this).find("span.k-callout").remove();
                $(this).find("span.k-i-warning").addClass("icon-spacer-right");
                let msgInnerHtml = this.innerHTML;
                let msgOuterHtml = $(this).clone().attr('style', '').empty();
                let replacementSpan = $("<span>").append(msgInnerHtml);
                $.each(msgOuterHtml[0].attributes, function (index, attribute) {
                    $(replacementSpan).attr(attribute.name, attribute.value);
                });
                $(replacementSpan).addClass("k-form-error");
                return replacementSpan;
            });
        });
    });

    // Listen for orientation changes and perform appropriate actions.
    // NOTE: These events fire whenever a mobile device viewport is resized or changes orientation.  (Multiple event listeners are required
    //       to support the various mobile platforms.)  They do not determine the resulting state of the orientation...meaning 'portrait'
    //       or 'landscape'.Caution must be taken when attempting to determine the actual orientation of the device.  Not all mobile
    //       devices view 'portrait' and 'landscape' in the same manner.
    window.addEventListener("resize", orientationAdjustments, false);

    $(window).on("resize", function (e) {
        // Kendo does not currently contain a "resizeEnd" event for the menu widget.  Their recommended workaround is to use a timer
        // to ensure that the menu logic has completed after a window resize prior to making any menu adjustments.
        let resizeTimeout = null;
        clearTimeout(resizeTimeout);

        configureFilterNav();
        //adjustStepperSteps();
    });

    var noChangeCountToEnd = 100,
        noEndTimeout = 1000;
    window.addEventListener('orientationchange', function () {
        let interval,
            timeout,
            end,
            lastInnerWidth,
            lastInnerHeight,
            noChangeCount;

        end = function () {
            clearInterval(interval);
            clearTimeout(timeout);

            interval = null;
            timeout = null;

            // After orientation change has ended, perform any visual adjustments
            orientationAdjustments();
        };

        interval = setInterval(function () {
            if (global.innerWidth === lastInnerWidth && global.innerHeight === lastInnerHeight) {
                noChangeCount++;

                if (noChangeCount === noChangeCountToEnd) {
                    // The interval resolved the issue first.
                    end();
                }
            } else {
                lastInnerWidth = global.innerWidth;
                lastInnerHeight = global.innerHeight;
                noChangeCount = 0;
            }
        });
        timeout = setTimeout(function () {
            // The timeout happened first.
            end();
        }, noEndTimeout);
    });

    // Workaround for Chrome browsers to prevent undesired autofills on input widgets.
    // NOTE: IE Edge has come out with a version of window.chrome that does not have the same meaning as Google's window.chrome
    //       for browser detection.  If the following if statement becomes an issue, an alternative will need to be determined.
    var isChrome = !!window.chrome;
    if (isChrome) {
        if ($('[name="fakepasswordremembered"]').length == 0) {
            autofillWrkaround = "<!-- fake fields are a workaround for chrome autofill getting the wrong fields -->" +
                "<input style='display: none' type='text' name='fakeusernameremembered' />" +
                "<input style='display: none' type='password' name='fakepasswordremembered' />" +
                "<!-- ------------------------------------------------------------------------- -->";
            $('form').prepend(autofillWrkaround);
        }
    }

    //Add an event listener to catch when a mobile device is rotated
    //and make sure that when rotated to portrait, if an overlay is displayed, it is hidden
    //when the rotated back to landscape, the overlay is displayed again
    window.setTimeout(screenRotation, 3000);
    function screenRotation() {
        let portrait = window.matchMedia("(orientation: portrait)");
        portrait.addEventListener("change", function (e) {
            //Search for the modal form
            let mainBody = document.body;
            if (e.matches) {
                //Portrait mode
                //Search for the modal form and the overlay
                //**** THIS APPLIES FOR KENDO CONTROLS
                let modalPanel = mainBody.getElementsByClassName("k-widget k-window")[0];
                let modalOverlay = mainBody.getElementsByClassName("k-overlay")[0];
                //If it was found, then move it
                if (typeof modalPanel !== 'undefined') {
                    //Hide the panel and the overlay
                    $(modalPanel).hide();
                    $(modalOverlay).hide();
                }
            } else {
                //Landscape mode
                //Search for the modal form and the overlay
                //**** THIS APPLIES FOR KENDO CONTROLS
                let modalPanel = mainBody.getElementsByClassName("k-widget k-window")[0];
                let modalOverlay = mainBody.getElementsByClassName("k-overlay")[0];
                //If it was found, then move it
                if (typeof modalPanel !== 'undefined') {
                    //Hide the panel and the overlay
                    $(modalPanel).show();
                    $(modalOverlay).show();
                }
            }
        });
    }

    //adjustStepperSteps();
});

function adjustStepperSteps() {
    let stepperSteps = document.querySelectorAll(".k-stepper .k-step-list li");
    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let stepLength = Number(width / (stepperSteps.length + 1));
    $(".k-stepper .k-step-list li").css("min-width", stepLength);
}

// The following ajax prefilter ensures javascript files fetched from the multi-panel editor are cached and only downloaded once.
// Before this change, scripts downloaded via ajax looked like this: https://tenant1.dev.mapshc.com/Scripts/hp.ua3.providerManagement.providerDegree.js?_=1518625961292
// Note the unique number appended to the js file (_=15186259612). This caused the script to never get cached. With this change, the unique # is not appended and cahing occurs.
$.ajaxPrefilter('script', function (options) {
    options.cache = true;
});

$(window).on("load", function () {
    // Call functions that require the page to be fully rendered before executing
    $.ready.then(function () {

        applyMaskedDatePicker();

        // Display page
        $("#pageLoadOverlay").addClass("display-none");

        // Establish header roll-up
        initializeHeadRoom();

        // Configure Filter Nav
        configureFilterNav();

        // Clear general messages, if no visible messages exist
        if ($(".gm-container").children().length == 0) {
            clearGeneralMessages();
        }

        kendo.culture().numberFormat.currency.pattern[0] = "($n)";

        // Display password visibility icon if enabled
        if (globalIsPasswordVisibilityEnabled) {
            applyPasswordVisibility();
        }

        // Call the function to execute the essentials that were not executed because this is a Partial View
        commonPageEssentials();

        // Watch for dynamically loaded at-a-glance panels and initialize tooltips when content is added
        initAagPanelObserver();
    });
});

$(window).on("unload", function () {
    // Close Help window if it is open.
    closeHelpWindow();
    // Stop observing the DatePicker widget
    if (dpObserver) {
        dpObserver.disconnect();
    }
    // Stop observing the Kendo Animation Container
    if (kacObserver) {
        kacObserver.disconnect();
    }
    // Stop observing the Filter Nav widget
    if (pghdrObserver) {
        pghdrObserver.disconnect();
    }
    // Stop observing the MultiSelect widget
    if (msObserver) {
        msObserver.disconnect();
    }
    // Stop observing the Upload widget
    if (uplObserver) {
        uplObserver.disconnect();
    }
    // Stop observing the Validation Message widget
    if (vmObserver) {
        vmObserver.disconnect();
    }

    // Remove hidden redaction widget raw values
    removeRedactionRawValues();
});

window.onorientationchange = function () {
    window.location.reload();
};

//-----------------------------------------------------------------------------------------
// jQuery plugins
//-----------------------------------------------------------------------------------------
// string endsWith extension
if (typeof String.prototype.startsWith !== 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}
// string.format plugin, usage: "hello {0}".format("world") => "hello world"
if (typeof String.prototype.format !== 'function') {
    String.prototype.format = function () {
        let args = arguments;
        return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
    };
}

if (typeof String.prototype.replaceAll !== 'function') {
    String.prototype.replaceAll = function (find, replace) {
        return this.replace(new RegExp(find, "g"), replace);
    };
}

(function ($) {
    let _load = $.fn.load;
    $.fn.load = function (url, params, callback) {
        if (typeof params === "function") {
            callback = params;
            params = null;
        }

        if (url.indexOf('isPanel=1') === -1) {
            if (url.indexOf('?') !== -1) {
                url += "&isPanel=1";
            }
            else {
                url += "?isPanel=1";
            }
        }

        _load.call(this, url, params, function (data, status, xhr) {
            CheckForClientAction(data, status, xhr, callback);
            // Moved the following call to commonPageEssentials.
            //initializeTooltip("#" + this.id);
        });
        return this;
    };

    $.fn.serializeFormToJson = function () {
        let o = {};
        let a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.fn.readonly = function (isReadOnly) {
        this.each(function () {
            if ($(this).is("input")) {
                if (isReadOnly === false) {
                    $(this).removeAttr("readonly");
                }
                else {
                    $(this).attr("readonly", true);
                }
            }
        });

        return this;
    };

    $.fn.editor = function () {
        if (this.hasClass("editor-col")) {
            return $(this);
        }
        else {
            return $(this).parents(".editor-col").first();
        }
    };

    $.fn.presentAs = function (userLabel) {
        let editor = $(this).editor();
        let oldLabel = editor.find("label").first().text();
        let find = oldLabel + " ";
        let replace = userLabel + " ";

        let newHtml = $(this).editor().clone().html().toString();
        newHtml = newHtml.replaceAll(find, replace);

        editor.html(newHtml);

        editor.find("label[for]").first().text(userLabel);
        editor.find("span[title]").attr("title", userLabel).tooltip();
        return this;
    };

    $.fn.hasAttr = function (name) {
        let val = $(this).attr(name);

        if (typeof val !== typeof undefined && val !== false) {
            return true;
        }

        return false;
    };

    $.fn.required = function (makeRequired) {
        let msg;
        let asteriskLabel;

        return this.each(function () {
            if (makeRequired === true) {
                if ($(this).hasAttr("data-val-required")) {
                    return;
                }
                if ($(this).hasAttr("not-data-val-required")) {
                    msg = $(this).attr("not-data-val-required");
                    $(this).attr("data-val-required", msg).removeAttr("not-data-val-required");

                    asteriskLabel = $(this).editor().find("span.fa-asterisk").first();
                    if (asteriskLabel.length > 0) {
                        asteriskLabel.show();
                    } else {
                        $(this).editor().find(".editor-label").first()
                            .prepend('<span class="clickable editor-req-field fa-solid fa-asterisk" title="' + msg + '" data-role="tooltip"></span>');
                        $(this).editor().find("span.fa-asterisk").first().tooltip().show();
                    }
                }
            }
            else if (makeRequired === false) {
                if ($(this).hasAttr("not-data-val-required")) {
                    return;
                }
                if ($(this).hasAttr("data-val-required")) {
                    msg = $(this).attr("data-val-required");
                    $(this).attr("not-data-val-required", msg).removeAttr("data-val-required");

                    asteriskLabel = $(this).editor().find("span.fa-asterisk").first();
                    if (asteriskLabel.length > 0) {
                        asteriskLabel.remove();
                    }
                }
            }
        });
    };

    $.fn.tooltip = function () {
        this.kendoTooltip({
            animation: {
                open: {
                    duration: "250"
                },
                close: {
                    duration: "250"
                }
            },
            position: "top",
            showAfter: 250
        });
        return this;
    };

    $.fn.resetValue = function () {
        this.each(function () {
            if ($(this).data("kendoDropDownList")) {
                $(this).data("kendoDropDownList").value($(this)[0].defaultValue);
            }
            else if ($(this).is("input[type='checkbox'], input[type='radio']")) {
                $(this)[0].checked = $(this)[0].defaultChecked;
            } else if ($(this).is("input[data-role=maskedtextbox]")) {
                $(this).data("kendoMaskedTextBox").value($(this)[0].defaultValue);
            } else if ($(this).is("input[data-role=datepicker]")) {
                $(this).data("kendoDatePicker").value($(this)[0].defaultValue);
            }
            else {
                $(this).val($(this)[0].defaultValue);
            }
        });
        return this;
    };

    // Reset a single field validation message
    $.fn.resetValidation = function () {
        this.each(function () {
            // A field-level validation error displays a light red background color for both the widget and the message.  Kendo does not
            // provide this feature, so styles are added to the k-invalid class.  In order to reset the widget, these classes must be removed.
            $(this).closest("div.editor-field").removeClass("k-invalid").find("*").removeClass("k-invalid");
            $(this).closest("div.editor-field").find("span.k-form-error").addClass("k-hidden");
            $(this).removeAttr("aria-invalid");
        });
        return this;
    };

    // Reset all field validation messages for a given form
    $.fn.resetAllValidations = function () {
        this.find(".k-input, .k-widget, .k-picker, .assoc-box-radio-btn-list-horz").each(function () {
            if ($(this).hasClass("k-invalid")) {
                $(this).resetValidation();
            }
            else {
                $(this).find("input.k-invalid").resetValidation();
                $(this).find("span.k-invalid").resetValidation();
            }
        });
        return this;
    };

    $.fn.outerHTML = function () {
        $(this).eq(0).clone().html();
        return this;
    };

    $.fn.setDefaultValue = function () {
        this.each(function () {
            if ($(this).data("kendoDropDownList")) {
                $(this).data("kendoDropDownList")._initial = $(this).data("kendoDropDownList").value();
            }
            else if ($(this).is("input[type='checkbox'], input[type='radio']")) {
                if ($(this).is(":checked")) {
                    $(this).attr("checked", "checked");
                } else {
                    $(this).removeAttr("checked");
                }
            } else {
                $(this).prop("defaultValue", $(this).val());
            }
        });
        return this;
    };

    // Extends JQuery methods to get current cursor postion in input text.
    $.fn.getCursorPosition = function () {
        let widget = $(this).get(0);
        let position = 0;
        if ('selectionStart' in widget) {
            position = widget.selectionStart;
        }
        else if ('selection' in document) {
            widget.focus();
            let sel = document.selection.createRange();
            let selLength = document.selection.createRange().text.length;
            sel.moveStart('character', -widget.value.length);
            position = sel.text.length - selLength;
        }
        return position;
    };

    // Extends JQuery methods to set current cursor postion in input text.
    $.fn.setCursorPosition = function (position) {
        this.each(function (index, widget) {
            if (widget.setSelectionRange) {
                widget.setSelectionRange(position, position);
            } else if (widget.createTextRange) {
                let range = widget.createTextRange();
                range.collapse(true);
                range.moveEnd('character', position);
                range.moveStart('character', position);
                range.select();
            }
        });
        return this;
    };
}(jQuery));

//-----------------------------------------------------------------------------------------
// Expand/Collapse functions
//-----------------------------------------------------------------------------------------
function ExpandHelpItem(areaId, showLinkId, hideLinkId) {
    let area = $("#" + areaId);
    if (area !== null) {
        $(area).show();
        let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        if (width < 1280) {
            $(area).parent().height("55vh");
        } else {
            $(area).parent().height("auto");
        }
        removeAriaHidden();
        if (showLinkId !== null && hideLinkId !== null) {
            $("#" + hideLinkId).show();
            $("#" + hideLinkId).parent().show();
            $("#" + showLinkId).hide();
            $("#" + hideLinkId).focus();
        }
        // For AAG panels, tooltips don't work correctly on Android mobile devices, so this basically
        // turns off the tool tip for the Expand icon in the panel.
        if ('ontouchstart' in window) {
            cleanKendoToolTipElements();
            if ($("#" + showLinkId).data("kendoTooltip")) {
                $("#" + showLinkId).data("kendoTooltip").destroy();
            }
        }
    }

    applyMaskedDatePicker();
}

function ExpandItem(areaId, showLinkId, hideLinkId) {
    let area = document.getElementById(areaId);
    if (area !== null) {
        area.style.display = "inline";
        removeAriaHidden();
        if (showLinkId !== null && hideLinkId !== null) {
            let hideLink = document.getElementById(hideLinkId);
            hideLink.style.display = "inline";
            let showLink = document.getElementById(showLinkId);
            showLink.style.display = "none";
        }
    }
}

function CollapseHelpItem(areaId, showLinkId, hideLinkId) {
    let area = $("#" + areaId);
    if (area !== null) {
        $(area).hide();
        $(area).parent().height("15vh");
        addAriaHidden();
        if (showLinkId !== null && hideLinkId !== null) {
            $("#" + hideLinkId).hide();
            $("#" + showLinkId).show();
            $("#" + showLinkId).parent().show();
            $("#" + showLinkId).focus();
        }
        // For AAG panels, tooltips don't work correctly on Android mobile devices, so this basically
        // turns off the tool tip for the Collapse icon in the panel.
        if ('ontouchstart' in window) {
            cleanKendoToolTipElements();
            if ($("#" + hideLinkId).data("kendoTooltip")) {
                $("#" + hideLinkId).data("kendoTooltip").destroy();
            }
        }
    }
}

function CollapseItem(areaId, showLinkId, hideLinkId) {
    let area = document.getElementById(areaId);
    if (area !== null) {
        area.style.display = "none";
        addAriaHidden();
        if (showLinkId !== null && hideLinkId !== null) {
            let hideLink = document.getElementById(hideLinkId);
            hideLink.style.display = "none";
            let showLink = document.getElementById(showLinkId);
            showLink.style.display = "inline";
        }
    }
}

function initializeContentPanels(formId) {
    let panelHeader;
    let panelHeaderReqFields;
    let thisDivIcon;
    let totalReqFields;

    if (formId == undefined || formId == null) {
        formId = "";
    }

    $(formId + " .content-panel-container").each(function () {
        // Add an asterisk to content panel header is panel contains any required widgets
        totalReqFields = 0;
        $(this).find(".editor-req-field").each(function () {
            if ($(this).parent().is(":not('.editor-req-field-row')")) {
                totalReqFields++;
            }
        });
        panelHeader = $(this).find(".content-panel-hdr");
        panelHeaderReqFields = $(panelHeader).find(".editor-req-fields");
        if (totalReqFields > 0) {
            if (panelHeader.length > 0 && panelHeaderReqFields.length == 0) {
                $(panelHeader).prepend("<span class='clickable editor-req-fields fa-solid fa-asterisk' title='" + globalValidationRequiredFieldPanelMsg + "' data-role='tooltip'></span>");
            }
        }
        else {
            $(panelHeaderReqFields).remove();
        }

        let totalErrorsInPanel = $(this).find(".k-form-error:not(.k-hidden").length;
        if (totalErrorsInPanel > 0) {
            $(this).addClass("content-panel-container-error");
        }
        else {
            $(this).removeClass("content-panel-container-error");
        }
    });

    $(formId + " .content-subpanel").each(function () {
    });

    $(formId + " .content-panel-hdr-tools").each(function () {
        thisDivIcon = $(this).find("div.fa-solid");

        if ($(thisDivIcon).hasClass('panel-collapsed')) {
            collapsePanel(thisDivIcon, panelTypeContent);
        }
        else {
            expandPanel(thisDivIcon, panelTypeContent);
        }
    });

    $(formId + " .content-subpanel-hdr-tools").each(function () {
        thisDivIcon = $(this).find("div.fa-solid");

        if ($(thisDivIcon).hasClass('subpanel-collapsed')) {
            collapsePanel(thisDivIcon, panelTypeSubContent);
        }
        else {
            expandPanel(thisDivIcon, panelTypeSubContent);
        }
    });

    $(formId + " .subsec-panel-hdr-tools").each(function () {
        thisDivIcon = $(this).find("div.fa-solid");

        if ($(thisDivIcon).hasClass('subsec-collapsed')) {
            collapsePanel(thisDivIcon, panelTypeSubSection);
        }
        else {
            expandPanel(thisDivIcon, panelTypeSubSection);
        }
    });

    $(formId + " .dshbrd-panel-hdr-tools").each(function () {
        thisDivIcon = $(this).find("div.fa-solid");

        if ($(thisDivIcon).hasClass('panel-collapsed')) {
            collapsePanel(thisDivIcon, panelTypeDshbrdContent);
        }
        else {
            expandPanel(thisDivIcon, panelTypeDshbrdContent);
        }
    });
}

//-----------------------------------------------------------------------------------------
// Expand/Collapse functions and should be used only if the panel is load by $.load()
//-----------------------------------------------------------------------------------------
function togglePanelExpandCollapse(e) {
    e = e || window.event;
    let divobject = $(e.target).parent();
    expandCollapseAction(e, divobject);
}

function expandCollapseAction(e, thisDiv) {
    let spaceKey = 32;

    if (e.type == 'keypress' && e.which != spaceKey) {
        return;
    }

    if (e.target.nodeName === "DIV" && e.target.className.indexOf("content-panel-hdr-tools") > -1) {
        let contentPanelContainer;
        if ($(thisDiv).hasClass("fa-angle-up") || $(thisDiv).hasClass("fa-angle-down")) {
            contentPanelContainer = $(thisDiv).closest(".content-panel-container").find(".content-panel-bdy");
            if ($(thisDiv).hasClass("panel-collapsed")) {
                // expand the content panel
                contentPanelContainer.slideDown();
                $(thisDiv).removeClass("panel-collapsed").removeClass("fa-angle-down").addClass("fa-angle-up");
                $(thisDiv).attr("title", globalCollapse).attr("aria-expanded", true).attr("role", "button").attr("aria-label", globalCollapse);
                removeAriaHidden(contentPanelContainer);
            }
            else {
                // collapse the content panel
                contentPanelContainer.slideUp();
                $(thisDiv).removeClass("fa-angle-up").addClass("fa-angle-down").addClass("panel-collapsed");
                $(thisDiv).attr("title", globalExpand).attr("aria-expanded", false).attr("role", "button").attr("aria-label", globalExpand);
                addAriaHidden(contentPanelContainer);
            }
        }
    }
    else if (e.target.nodeName === "DIV" && e.target.className.indexOf("dshbrd-panel-hdr-tools") > -1) {
        let dshbrdContainer;
        if ($(thisDiv).hasClass("fa-angle-up") || $(thisDiv).hasClass("fa-angle-down")) {
            dshbrdContainer = $(thisDiv).closest(".dshbrd-panel-container").find(".dshbrd-panel-bdy");
            if ($(thisDiv).hasClass("panel-collapsed")) {
                // expand the content subpanel
                dshbrdContainer.slideDown();
                $(thisDiv).removeClass("panel-collapsed").removeClass("fa-angle-down").addClass("fa-angle-up");
                $(thisDiv).attr("title", globalCollapse).attr("aria-expanded", true).attr("role", "button").attr("aria-label", globalCollapse);
                removeAriaHidden(dshbrdContainer);
            }
            else {
                // collapse the content subpanel
                dshbrdContainer.slideUp();
                $(thisDiv).removeClass("fa-angle-up").addClass("fa-angle-down").addClass("panel-collapsed");
                $(thisDiv).attr("title", globalExpand).attr("aria-expanded", false).attr("role", "button").attr("aria-label", globalExpand);
                addAriaHidden(dshbrdContainer);
            }
        }
    }
    else if (e.target.nodeName === "DIV" && e.target.className.indexOf("content-subpanel-hdr-tools") > -1) {
        let subpanelContainer;
        if ($(thisDiv).hasClass("fa-angle-up") || $(thisDiv).hasClass("fa-angle-down")) {
            subpanelContainer = $(thisDiv).closest(".content-subpanel-container").find(".content-subpanel-bdy");
            if ($(thisDiv).hasClass("panel-collapsed")) {
                // expand the content subpanel
                subpanelContainer.slideDown();
                $(thisDiv).removeClass("panel-collapsed").removeClass("fa-angle-down").addClass("fa-angle-up");
                $(thisDiv).attr("title", globalCollapse).attr("aria-expanded", true).attr("role", "button").attr("aria-label", globalCollapse);
                removeAriaHidden(subpanelContainer);
            }
            else {
                // collapse the content subpanel
                subpanelContainer.slideUp();
                $(thisDiv).removeClass("fa-angle-up").addClass("fa-angle-down").addClass("panel-collapsed");
                $(thisDiv).attr("title", globalExpand).attr("aria-expanded", false).attr("role", "button").attr("aria-label", globalExpand);
                addAriaHidden(subpanelContainer);
            }
        }
    }
    else if (e.target.nodeName === "DIV" && e.target.className.indexOf("toc-panel-hdr-tools") > -1) {
        let tocContainer;
        if ($(thisDiv).hasClass("fa-angle-up") || $(thisDiv).hasClass("fa-angle-down")) {
            tocContainer = $(thisDiv).closest(".toc-panel-container").find(".toc-panel-bdy");
            if ($(thisDiv).hasClass("panel-collapsed")) {
                // expand the toc content panel
                tocContainer.slideDown();
                $(thisDiv).removeClass("panel-collapsed").removeClass("fa-angle-down").addClass("fa-angle-up");
                $(thisDiv).attr("title", globalCollapse).attr("aria-expanded", true).attr("role", "button").attr("aria-label", globalCollapse);
                removeAriaHidden(tocContainer);
            }
            else {
                // collapse the toc content panel
                tocContainer.slideUp();
                $(thisDiv).removeClass("fa-angle-up").addClass("fa-angle-down").addClass("panel-collapsed");
                $(thisDiv).attr("title", globalExpand).attr("aria-expanded", false).attr("role", "button").attr("aria-label", globalExpand);
                addAriaHidden(tocContainer);
            }
        }
    }
    else if (e.target.nodeName === "DIV" && e.target.className.indexOf("subsec-panel-hdr-tools") > -1) {
        let subsecContainer;
        if ($(thisDiv).hasClass("fa-angle-up") || $(thisDiv).hasClass("fa-angle-down")) {
            subsecContainer = $(thisDiv).closest(".subsec-panel-container").find(".subsec-panel-bdy");
            if ($(thisDiv).hasClass("panel-collapsed")) {
                // expand the subsec content panel
                subsecContainer.slideDown();
                $(thisDiv).removeClass("panel-collapsed").removeClass("fa-angle-down").addClass("fa-angle-up");
                $(thisDiv).attr("title", globalCollapse).attr("aria-expanded", true).attr("role", "button").attr("aria-label", globalCollapse);
                removeAriaHidden(subsecContainer);
            }
            else {
                // collapse the subsec content panel
                subsecContainer.slideUp();
                $(thisDiv).removeClass("fa-angle-up").addClass("fa-angle-down").addClass("panel-collapsed");
                $(thisDiv).attr("title", globalExpand).attr("aria-expanded", false).attr("role", "button").attr("aria-label", globalExpand);
                addAriaHidden(subsecContainer);
            }
        }
    }
    else if (e.target.nodeName === "DIV" && ($(e.target).hasClass("fa-angle-up") > 0 || $(e.target).hasClass("fa-angle-down") > 0)) {
        let thisDivIcon = $(thisDiv).find("div.fa-solid");
        if ($(thisDiv).parent().hasClass("subsec-panel-hdr-tools")) {
            if ($(thisDivIcon).hasClass('subsec-collapsed')) {
                expandPanel(thisDivIcon, panelTypeSubSection);
            }
            else {
                collapsePanel(thisDivIcon, panelTypeSubSection);
            }
        }
        if ($(thisDiv).parent().hasClass("content-subpanel-hdr-tools")) {
            if ($(thisDivIcon).hasClass('subpanel-collapsed')) {
                expandPanel(thisDivIcon, panelTypeSubContent);
            }
            else {
                collapsePanel(thisDivIcon, panelTypeSubContent);
            }
        }
        else if ($(thisDiv).parent().hasClass("content-panel-hdr-tools")) {
            if ($(thisDivIcon).hasClass('panel-collapsed')) {
                expandPanel(thisDivIcon, panelTypeContent);
            }
            else {
                collapsePanel(thisDivIcon, panelTypeContent);
            }
        }
        else if ($(thisDiv).parent().hasClass("content-ordered-panel-hdr-tools")) {
            //Now, check if this is a panel, or a subpanel
            if ($(thisDiv).parent().parent().hasClass("content-subpanel-hdr-tools")) {
                if ($(thisDivIcon).hasClass('subpanel-collapsed')) {
                    expandPanel(thisDivIcon, panelTypeSubContent);
                }
                else {
                    collapsePanel(thisDivIcon, panelTypeSubContent);
                }
            }
            else if ($(thisDiv).parent().parent().hasClass("content-panel-hdr-tools")) {
                if ($(thisDivIcon).hasClass('panel-collapsed')) {
                    expandPanel(thisDivIcon, panelTypeContent);
                }
                else {
                    collapsePanel(thisDivIcon, panelTypeContent);
                }
            }
            else if ($(thisDiv).parent().parent().hasClass("mcb-panel-hdr-tools")) {
                if ($(thisDivIcon).hasClass('mcb-panel-collapsed')) {
                    expandPanel(thisDivIcon, panelTypeMCB);
                }
                else {
                    collapsePanel(thisDivIcon, panelTypeMCB);
                }
            }
        }
        else if ($(thisDiv).parent().hasClass("dshbrd-panel-hdr-tools")) {
            if ($(thisDivIcon).hasClass('panel-collapsed')) {
                expandPanel(thisDivIcon, panelTypeDshbrdContent);
            }
            else {
                collapsePanel(thisDivIcon, panelTypeDshbrdContent);
            }
        }
        else if ($(thisDiv).parent().hasClass("mcb-panel-hdr-tools")) {
            if ($(thisDivIcon).hasClass('mcb-panel-collapsed')) {
                expandPanel(thisDivIcon, panelTypeMCB);
            }
            else {
                collapsePanel(thisDivIcon, panelTypeMCB);
            }
        }
    }
}

function expandAllAction(modalId) {
    if (modalId == undefined) {
        $("#expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-down").each(function (index, element) {
            expandAllPanel(element);
        });
    }
    else {
        $("#" + modalId).find("#expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-down").each(function (index, element) {
            expandAllPanel(element);
        });
    }
}

function collapseAllAction(modalId) {
    if (modalId == undefined) {
        $("#expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-down").each(function (index, element) {
            collapseAllPanel(element);
        });
    }
    else {
        $("#" + modalId).find("#expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .content-subpanel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .subsec-panel-hdr-tools .fa-angle-down, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-up, #expandCollapseDetailArea .dshbrd-panel-hdr-tools .fa-angle-down").each(function (index, element) {
            collapseAllPanel(element);
        });
    }
}

function expandAllPanel(panel) {
    if ($(panel).parent().parent().hasClass("subsec-panel-hdr-tools")) {
        if ($(panel).hasClass('subsec-collapsed')) {
            // expand the content subsection
            expandPanel(panel, panelTypeSubSection);
        }
    }
    else if ($(panel).parent().parent().hasClass("content-subpanel-hdr-tools")) {
        if ($(panel).hasClass('subpanel-collapsed')) {
            // expand the content subpanel
            expandPanel(panel, panelTypeSubContent);
        }
    }
    else if ($(panel).parent().parent().hasClass("content-panel-hdr-tools")) {
        if ($(panel).hasClass('panel-collapsed')) {
            // expand the content panel
            expandPanel(panel, panelTypeContent);
        }
    }
    else if ($(panel).parent().parent().hasClass("dshbrd-panel-hdr-tools")) {
        if ($(panel).hasClass('panel-collapsed')) {
            // collapse the content panel
            expandPanel(panel, panelTypeDshbrdContent);
        }
    }
    else if ($(panel).parent().parent().hasClass("mcb-panel-hdr-tools")) {
        if ($(panel).hasClass('mcb-panel-collapsed')) {
            // expand the content panel
            expandPanel(panel, panelTypeMCB);
        }
    }
    else if ($(panel).parent().parent().hasClass("content-ordered-panel-hdr-tools")) {
        //Now, check if this is a panel, or a subpanel
        if ($(panel).parent().parent().parent().hasClass("content-subpanel-hdr-tools")) {
            if ($(panel).hasClass('subpanel-collapsed')) {
                expandPanel(panel, panelTypeSubContent);
            }
        }
        else if ($(panel).parent().parent().parent().hasClass("content-panel-hdr-tools")) {
            if ($(panel).hasClass('panel-collapsed')) {
                expandPanel(panel, panelTypeContent);
            }
        }
        else if ($(panel).parent().parent().parent.hasClass("mcb-panel-hdr-tools")) {
            if ($(panel).hasClass('mcb-panel-collapsed')) {
                // expand the content panel
                expandPanel(panel, panelTypeMCB);
            }
        }
    }
}

function collapseAllPanel(panel) {
    if ($(panel).parent().parent().hasClass("subsec-panel-hdr-tools")) {
        if (!$(panel).hasClass('subsec-collapsed')) {
            // collapse the content subsection
            collapsePanel(panel, panelTypeSubSection);
        }
    }
    else if ($(panel).parent().parent().hasClass("content-subpanel-hdr-tools")) {
        if (!$(panel).hasClass('subpanel-collapsed')) {
            // collapse the content subpanel
            collapsePanel(panel, panelTypeSubContent);
        }
    }
    else if ($(panel).parent().parent().hasClass("content-panel-hdr-tools")) {
        if (!$(panel).hasClass('panel-collapsed')) {
            // collapse the content panel
            collapsePanel(panel, panelTypeContent);
        }
    }
    else if ($(panel).parent().parent().hasClass("dshbrd-panel-hdr-tools")) {
        if (!$(panel).hasClass('panel-collapsed')) {
            // collapse the content panel
            collapsePanel(panel, panelTypeDshbrdContent);
        }
    }
    else if ($(panel).parent().parent().hasClass("mcb-panel-hdr-tools")) {
        if (!$(panel).hasClass('mcb-panel-collapsed')) {
            // collapse the content panel
            collapsePanel(panel, panelTypeMCB);
        }
    }
    else if ($(panel).parent().parent().hasClass("content-ordered-panel-hdr-tools")) {
        //Now, check if this is a panel, or a subpanel
        if ($(panel).parent().parent().parent().hasClass("content-subpanel-hdr-tools")) {
            // collapse the content panel
            collapsePanel(panel, panelTypeSubContent);
        }
        else if ($(panel).parent().parent().parent().hasClass("content-panel-hdr-tools")) {
            // collapse the content panel
            collapsePanel(panel, panelTypeContent);
        }
        else if ($(panel).parent().parent().parent.hasClass("mcb-panel-hdr-tools")) {
            // collapse the content panel
            collapsePanel(panel, panelTypeMCB);
        }
    }
}

function expandPanel(panel, type) {
    if (type == panelTypeSubSection) {
        // expand the content subsection
        let subsecContainer = $(panel).closest('.subsec-panel-container').find('.subsec-panel-bdy');
        subsecContainer.slideDown(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.subsec-panel-container').removeClass('collapsedPanel');
        $(".panel-icon .fa-angle-up").attr('title', globalCollapse);
        removeAriaHidden(subsecContainer);
        if ($(panel).hasClass('subsec-collapsed')) {
            if ($(panel).hasClass('fa-angle-down')) {
                $(panel).removeClass('subsec-collapsed').removeClass('fa-angle-down').addClass('fa-angle-up').attr('title', globalCollapse);
            }
        }
        let cardPanel = subsecContainer.find(".card-panel");
        if (cardPanel) {
            let cardPanelId = $(cardPanel).attr("id");
            adjustCards(cardPanelId);
        }
    }
    else if (type == panelTypeSubContent) {
        // expand the content subpanel
        let subpanelContainer = $(panel).closest('.content-subpanel-container').find('.content-subpanel-bdy');
        subpanelContainer.slideDown(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.content-subpanel-container').removeClass('collapsedPanel');
        $(".panel-icon .fa-angle-up").attr('title', globalCollapse);
        removeAriaHidden(subpanelContainer);
        if ($(panel).hasClass('subpanel-collapsed')) {
            if ($(panel).hasClass('fa-angle-down')) {
                $(panel).removeClass('subpanel-collapsed').removeClass('fa-angle-down').addClass('fa-angle-up').attr('title', globalCollapse);
            }
        }
        let cardPanel = subpanelContainer.find(".card-panel");
        if (cardPanel) {
            let cardPanelId = $(cardPanel).attr("id");
            adjustCards(cardPanelId);
        }
    }
    else if (type == panelTypeContent) {
        // expand the content panel
        let panelContainer = $(panel).closest('.content-panel-container').find('.content-panel-bdy');
        panelContainer.slideDown(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.content-panel-container').removeClass('collapsedPanel');
        $(".panel-icon .fa-angle-up").attr('title', globalCollapse);
        removeAriaHidden(panelContainer);
        if ($(panel).hasClass('panel-collapsed')) {
            if ($(panel).hasClass('fa-angle-down')) {
                $(panel).removeClass('panel-collapsed').removeClass('fa-angle-down').addClass('fa-angle-up').attr('title', globalCollapse);
            }
        }
        let cardPanel = panelContainer.find(".card-panel");
        if (cardPanel) {
            let cardPanelId = $(cardPanel).attr("id");
            adjustCards(cardPanelId);
        }
    }
    else if (type == panelTypeDshbrdContent) {
        // expand the content panel
        $(panel).closest('.dshbrd-panel-container').find('.dshbrd-panel-bdy').slideDown();
        $(".panel-icon .fa-angle-up").attr('title', globalCollapse);
        removeAriaHidden();
        if ($(panel).hasClass('panel-collapsed')) {
            if ($(panel).hasClass('fa-angle-down')) {
                $(panel).removeClass('panel-collapsed').removeClass('fa-angle-down').addClass('fa-angle-up').attr('title', globalCollapse);
            }
        }
    }
    else if (type == panelTypeMCB) {
        // expand the mcb panel
        let mcbContainer = $(panel).closest('.mcb-panel-container').find('.mcb-panel-body, .mcb-overlay-panel-body');
        mcbContainer.slideDown(400, function () { postSlideUpAndSlideDown($(this)); });
        $(".panel-icon .fa-angle-up").attr('title', globalCollapse);
        removeAriaHidden(mcbContainer);
        if ($(panel).hasClass('mcb-panel-collapsed')) {
            if ($(panel).hasClass('fa-angle-down')) {
                $(panel).removeClass('mcb-panel-collapsed').removeClass('fa-angle-down').addClass('fa-angle-up').attr('title', globalCollapse);
            }
        }
    }
    checkExecuteFunctionByNameWithData("expandPanelPostProcess", panel, null);
}

function collapsePanel(panel, type) {
    if (type == panelTypeSubSection) {
        // collapse the content subsection
        let panelSubsection = $(panel).closest('.subsec-panel-container').find('.subsec-panel-bdy');
        panelSubsection.slideUp(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.subsec-panel-container').addClass('collapsedPanel');
        $(".panel-icon .fa-angle-down").attr('title', globalExpand);
        addAriaHidden(panelSubsection);
        if (!$(panel).hasClass('subsec-collapsed')) {
            if ($(panel).hasClass('fa-angle-up')) {
                $(panel).removeClass('fa-angle-up').addClass('fa-angle-down').addClass('subsec-collapsed').attr('title', globalExpand);
            }
        }
    }
    else if (type == panelTypeSubContent) {
        // collapse the content subpanel
        let subpanelContainer = $(panel).closest('.content-subpanel-container').find('.content-subpanel-bdy');
        subpanelContainer.slideUp(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.content-subpanel-container').addClass('collapsedPanel');
        $(".panel-icon .fa-angle-down").attr('title', globalExpand);
        addAriaHidden(subpanelContainer);
        if (!$(panel).hasClass('subpanel-collapsed')) {
            if ($(panel).hasClass('fa-angle-up')) {
                $(panel).removeClass('fa-angle-up').addClass('fa-angle-down').addClass('subpanel-collapsed').attr('title', globalExpand);
            }
        }
    }
    else if (type == panelTypeContent) {
        // collapse the content panel
        let contentPanel = $(panel).closest('.content-panel-container').find('.content-panel-bdy');
        contentPanel.slideUp(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.content-panel-container').addClass('collapsedPanel');
        $(".panel-icon .fa-angle-down").attr('title', globalExpand);
        addAriaHidden(contentPanel);
        if (!$(panel).hasClass('panel-collapsed')) {
            if ($(panel).hasClass('fa-angle-up')) {
                $(panel).removeClass('fa-angle-up').addClass('fa-angle-down').addClass('panel-collapsed').attr('title', globalExpand);
            }
        }
    }
    else if (type == panelTypeDshbrdContent) {
        // collapse the content panel
        let dshbrdcontentPanel = $(panel).closest('.dshbrd-panel-container').find('.dshbrd-panel-bdy');
        dshbrdcontentPanel.slideUp();
        dshbrdcontentPanel.slideUp(400, function () { postSlideUpAndSlideDown($(this)); });
        $(panel).closest('.dshbrd-panel-container').addClass('collapsedPanel');
        $(".panel-icon .fa-angle-down").attr('title', globalExpand);
        addAriaHidden(dshbrdcontentPanel);
        if (!$(panel).hasClass('panel-collapsed')) {
            if ($(panel).hasClass('fa-angle-up')) {
                $(panel).removeClass('fa-angle-up').addClass('fa-angle-down').addClass('panel-collapsed').attr('title', globalExpand);
            }
        }
    }
    else if (type == panelTypeMCB) {
        // collapse the mcb panel
        let mcbPanelContainer = $(panel).closest('.mcb-panel-container').find('.mcb-panel-body, .mcb-overlay-panel-body');
        mcbPanelContainer.slideUp(400, function () { postSlideUpAndSlideDown($(this)); });
        $(".panel-icon .fa-angle-down").attr('title', globalExpand);
        addAriaHidden(mcbPanelContainer);
        if (!$(panel).hasClass('mcb-panel-collapsed')) {
            if ($(panel).hasClass('fa-angle-up')) {
                $(panel).removeClass('fa-angle-up').addClass('fa-angle-down').addClass('mcb-panel-collapsed').attr('title', globalExpand);
            }
        }
    }
    checkExecuteFunctionByNameWithData("collapsePanelPostProcess", panel, null);
}

// This function calls the recenter overlay function in case the expanded or collapsed icon is on an overlay.
// If it was not an overlay it won't do anything.
function postSlideUpAndSlideDown(e) {
    let form = $(e).closest('form');
    if (form) {
        let formId = form.attr("id");
        if (formId) {
            recenterModalOverlay(formId);
        }
    }
}

//This function should be used to close the panels.
//If any new logic need to be added, should added here
function closeAction(e, thisDiv) {
    //Function to close the panels
    //thisDiv is the element that contains the close icon

    let closePanel = $(thisDiv).closest(".infPanel");
    closePanel.hide();
}

// NOTE: This function will be deprecated and replaced by the function beneath it once all panels are using the UA3 content panel/subpanel styles.
jQuery(function ($) {
    $('.panel-heading span.clickable, .panel-heading2 span.clickable, .content-panel-container span.clickable').on("keypress click", function (e) {
        let spaceKey = 32;

        if (e.type == 'keypress' && e.which != spaceKey) {
            return;
        }
        if ($(this).find('i').hasClass('fa-angle-up') || $(this).find('i').hasClass('fa-angle-down')) {
            if ($(this).hasClass('panel-collapsed')) {
                // expand the panel
                $(this).closest('.panel').find('.panel-body').slideDown();
                $(this).removeClass('panel-collapsed');
                $(this).parent().parent().parent().removeClass('collapsedPanel');
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                $(this).attr('title', globalCollapse).attr('aria-expanded', true);
                removeAriaHidden();
            }
            else {
                // collapse the panel
                $(this).closest('.panel').find('.panel-body').slideUp();
                $(this).addClass('panel-collapsed');
                $(this).parent().parent().parent().addClass('collapsedPanel');
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                $(this).attr('title', globalExpand).attr('aria-expanded', false);
                addAriaHidden();
            }
        }

        $(".content-panel-container span.fa-stack, .content-subpanel-container span.fa-stack, .subsec-panel-container span.fa-stack, .toc-panel-container span.fa-stack, .mcb-panel-container span.fa-stack, .dshbrd-panel-container span.fa-stack").on("keypress", function (e) {
            let panel = $(this);
            if (event.keyCode === 32) {
                //Call the click event, if the space bar was pressed
                $(panel).click();
            }
        });
    });
});

//-----------------------------------------------------------------------------------------
// JQuery extension functions
//-----------------------------------------------------------------------------------------
jQuery.fn.extend({
    renameAttr: function (name, newName) {
        let val;
        return this.each(function () {
            val = jQuery.attr(this, name);
            jQuery.attr(this, newName, val);
            jQuery.removeAttr(this, name);
        });
    }
});

function changeBgColor(panelId) {
    if (!panelId) {
        panelId = "";
    }

    $(panelId + ".content-panel-container").removeClass("alt-bkgrnd-color");
    $(panelId + ".content-subpanel-container").removeClass("alt-bkgrnd-color");
    $(panelId + ".content-subpanel-bdy").removeClass("alt-bkgrnd-color");
    $(panelId + ".content-panel-container:odd").addClass("alt-bkgrnd-color");
    $(panelId + ".content-subpanel-container:odd").addClass("alt-bkgrnd-color");
    $(panelId + ".content-subpanel-bdy:odd").addClass("alt-bkgrnd-color");
}

//-----------------------------------------------------------------------------------------
// Loading Dialog functions
//-----------------------------------------------------------------------------------------
function showLoadingDialog(loadingMsg) {
    if (!$("#loadingDialog").is(':visible')) {
        syncContentLoading();
        if (loadingMsg) {
            $(".wait-dialog").addClass("long-text");
            $(".wait-dialog.long-text .wait-dialog-lbl").text(loadingMsg);
        }
        else {
            $(".wait-dialog").removeClass("long-text");
            $(".wait-dialog .wait-dialog-lbl").text(globalMsgProcessing);
        }
    }
}

function hideLoadingDialog() {
    syncContentLoaded();
}

function syncContentLoading(containerId) {
    if (containerId === undefined) {
        $("#loadingDialog").show();
        $('<div class="processing-icon-backdrop"></div>').appendTo(document.body);
        if ($('div.modal').length > 0 || $(".k-overlay + .k-window").length > 0) {
            $('<div class="processing-icon-overlay"></div>').appendTo($(".k-overlay + .k-window"));        
        }
        else {
            $('html').css('overflow', 'hidden');
        }
        $('body').addClass('processing-icon-noscroll');
        $('body').attr('scroll', 'no');
        $(document).on('keydown', function (e) {
            if (e.which === 9) {
                return false;
            }
        });
    }
    else {
        $(containerId).addClass("loading");
    }
}

function syncContentLoaded(containerId) {
    if (containerId === undefined) {
        $("#loadingDialog").hide();
        $(".processing-icon-backdrop").remove();
        $(".processing-icon-overlay").remove();

        if ($('div.modal').length === 0 && $('div.k-overlay').length === 0) {
            $('html').css('overflow', 'auto');
        }

        $('body').removeClass('processing-icon-noscroll');
        $('body').attr('scroll', 'yes');
        $(document).unbind('keydown');
    }
    else {
        $(containerId).removeClass("loading");
    }
}

function addSpecialMessage(id, type, message, hideCloseBtn) {
    let item = formatGeneralMessage(type, message, hideCloseBtn);
    $("#" + id + ".sm-container").append(item);

    if ($(".sm-container").parents(".header").length == 1) {
        let msgContainerHgt = $(".sm-container").height();
        if (msgContainerHgt > 0) {
            let bodypad = parseInt($("body").css("padding-top")) + msgContainerHgt;
            $("body").css({ "padding-top": bodypad });
        }
    }
}

function clearSpecialMessage(id) {
    $("#" + id + ".sm-container").empty();
}

function addGeneralMessage(type, message, hideCloseBtn) {
    let item = formatGeneralMessage(type, message, hideCloseBtn);
    $(".gm-container").append(item);
    $(".gm-container").show();
}

function clearGeneralMessages() {
    $(".gm-container").empty();
    $(".gm-container").hide();
}

function formatGeneralMessage(type, message, hideCloseBtn) {
    let cssClass;
    let icon;
    let item;
    let btn;

    cssClass = formatDialogCss(type);
    icon = formatDialogIcon(type);
    if (hideCloseBtn === 'true') {
        btn = "";
    }
    else {
        btn = "<div class='msg-inline-close panel-icon clickable' role='alert' aria-label='close' onclick='removeGeneralMessage(this, event)' onkeypress='removeGeneralMessage(this, event)' tabindex='0'><span class='fa-solid fa-xmark' title='" + globalClose + "'></span></div>";
    }
    item = "<div class='msg-inline " + cssClass + "'><i class='msg-inline-icon fa-solid " + icon + "'></i>" + btn + message + "</div>";
    return item;
}

function removeGeneralMessage(gm, e) {
    if (e.type == "click" || (e.type == "keypress" && e.keyCode === 32)) {
        let container = $(gm).closest(".msg-inline").parent();
        let containerInline = $(gm).closest(".msg-inline-close").parent();
        if (container && container.length > 0) {
            container.empty();
        }
        if (containerInline && containerInline.length > 0) {
            containerInline.empty();
        }
    }
}

function buildReqFieldsRow() {
    return "<div class=\"row\"><div class=\"editor-req-field-row\" >" + globalReqFieldLabel + " ( <span class='editor-req-field fa-solid fa-asterisk'></span>)</div></div>";
}

function buildBnrReqFieldsRow() {
    return "<div class=\"editor-req-field-row\" >" + globalReqFieldLabel + " ( <span class='editor-req-field fa-solid fa-asterisk'></span>)</div>";
}

function buildBnrOneRecReqRow() {
    return "<div class=\"grid-info-bar\"><div class=\"editor-one-rec-req-field-row\" >" + globalOneRecReqLabel + "</div></div>";
}

function buildExpandCollapseRow(modalId) {
    if (modalId === undefined) {
        return "<div class=\"expand-collapse-row\" ><span><a class=\"common-page-link\" href=\"javascript:expandAllAction();\" onkeyup=\"onKeyupAction(event)\" onkeydown=\"onKeydownAction(event)\" tabindex=\"0\">" + globalExpandAll + "</a></span> | <span><a class=\"common-page-link\" href=\"javascript:collapseAllAction();\" onkeyup=\"onKeyupAction(event)\" onkeydown=\"onKeydownAction(event)\" tabindex=\"0\">" + globalCollapseAll + "</a></span></div>";
    }
    else {
        return "<div class=\"expand-collapse-row\" ><span><a class=\"common-page-link\" href=\"javascript:expandAllAction('" + modalId + "');\" onkeyup=\"onKeyupAction(event)\" onkeydown=\"onKeydownAction(event)\" tabindex=\"0\">" + globalExpandAll + "</a></span> | <span><a class=\"common-page-link\" href=\"javascript:collapseAllAction('" + modalId + "');\" onkeyup=\"onKeyupAction(event)\" onkeydown=\"onKeydownAction(event)\" tabindex=\"0\">" + globalCollapseAll + "</a></span></div>";
    }
}

// Actions to perform on a KEYUP event
function onKeyupAction(e) {
    if (e.which === 32) {
        // Pressing SPACE to simulate a mouse click
        e.target.click();
        e.preventDefault();
    }
}

// Actions to perform on a KEYDOWN event
function onKeydownAction(e) {
    if (e.which === 32) {
        // Prevent browser scrolling when SPACE is pressed
        e.preventDefault();
    }
}

function setKendoValidatorFieldMessage(field, errorMessage) {
    let parentElem = field.parents(".editor-field").first();
    if (parentElem === null || parentElem.length === 0) {
        if ($(field).hasClass("k-textbox") || $(field).find("k-dropdown").length > 0) {
            parentElem = field.parent();
        }
        else if ($(field).hasClass("k-grid") || field.closest("td[role='gridcell']")) {
            parentElem = field.parent().parent();
        }
        else {
            parentElem = field.parent().parent().parent();
        }
    }

    let fieldName = field[0].name;
    let valSpanId = field[0].id + "_validationMessage";
    $("#" + valSpanId).remove();

    let span = "<span class='k-form-error k-invalid-msg field-validation-error' " +
        "id='" + valSpanId + "' role='alert' data-for='" + fieldName + "' " +
        "data-valmsg-for='" + fieldName + "'><span class='k-icon k-i-warning icon-spacer-right'></span>" + errorMessage + "</span>";

    field.addClass("k-invalid");
    field.attr("aria-invalid", "true");
    if (parentElem.hasClass("assoc-box-checkbox")) {
        parentElem.parent().append(span);
    }
    else {
        parentElem.append(span);
    }
    parentElem.find(".assoc-box-radio-btn-list-horz").addClass("k-invalid");
}

// TODO: Remove functions (after module refactoring)...not needed with latest Kendo upgrade
function setKendoAutoCompleteDataBoundEvents(e) {
    //checkAutoCompleteForNoRecordsFound(e);
}

//function checkAutoCompleteForNoRecordsFound(e) {
//    console.log("checkAutoCompleteForNoRecordsFound()...");
//    let autoComplete = e.sender;
//    let currentWidget = $(autoComplete.element);
//    let currentWidgetId = $(currentWidget).prop("id");
//    console.log("   currentWidgetId = '" + currentWidgetId + "'");
//    if (autoComplete.dataSource.total() === 0) {
//        var currentWidgetList = $("#" + currentWidgetId + "-list").find("div.k-no-data");

//        if (currentWidgetList !== null && currentWidgetList.length > 0) {
//            $(currentWidgetList).find("div").text(globalEntityNoDataMsg);
//        }
//    }
//}

var currentGridId = null;
var gridContentColumns;
var gridSetOptionAction = false;
//-----------------------------------------------------------------------------------------
// Functions for Grids
//-----------------------------------------------------------------------------------------
function setKendoGridDataBoundEvents(e, panelNoRecordsFoundMsg, gridRowSingleClickCallBack, gridRowDoubleClickCallBack) {
    let gridId = e.sender.element[0].id;
    // Hide primary/secondary toolbars
    setGridToolbarVisibility(gridId, true);

    if (panelNoRecordsFoundMsg !== null) {
        panelNoRecordsFoundMsg = panelNoRecordsFoundMsg || undefined;
    }
    if (gridRowSingleClickCallBack !== null) {
        gridRowSingleClickCallBack = gridRowSingleClickCallBack || undefined;
    }
    if (gridRowDoubleClickCallBack !== null) {
        gridRowDoubleClickCallBack = gridRowDoubleClickCallBack || undefined;
    }

    localizeKendoGridMessages(e);
    checkGridForNoRecordsFound(e, panelNoRecordsFoundMsg);
    setKendoGridSortedColumnAttributes(e);
    setGridCheckboxCompliance(e);
    updateCommandCellStructure(gridId);
    updateGridCellBackgroundOpacity();
    // Add appropriate styles to grid filter dropdowns, once clicked
    $('.k-grid-filter-menu').on('click', function () {
        styleGridFilters();
    });

    // Grid Click/DblClick event callbacks and keyboard navigation functionality will only be called if both
    // callback function names are null.  This will allow grids that have not been upgraded to comply with our
    // S&G to still function properly until DS057 has been completed by all modules.
    if (gridRowSingleClickCallBack !== undefined && gridRowDoubleClickCallBack !== undefined) {
        // Create event handlers for single/double click on a grid row
        createGridClickEvents(gridId, gridRowSingleClickCallBack, gridRowDoubleClickCallBack);

        // Create keyboard shortcuts to simulate single/double clicks on a grid row...
        // ...single-click on grid row
        shortcut.add("Ctrl+Shift+S", function () {
            let grid = $("#" + gridId).data("kendoGrid");
            let cell = grid.select();
            $(cell).closest("tr").click();
        }, { 'target': document.getElementById(gridId) }
        );

        // ...double-click on grid row
        shortcut.add("Ctrl+Shift+D", function () {
            let grid = $("#" + gridId).data("kendoGrid");
            let cell = grid.select();
            $(cell).closest("tr").dblclick();
        }, { 'target': document.getElementById(gridId) }
        );
    }

    repositionGridSecondaryToolbar(gridId);

    $("[aria-activedescendant='" + gridId + "_active_cell']").removeAttr("aria-activedescendant");
    let grid = $("#" + gridId).data("kendoGrid");
    if (grid !== undefined) {
        setCommandButtonImages(grid);
        if (grid.pager) {
            grid.pager.resize();
        }
    }

    // Establish appropriate grid size type, if it has not already been performed
    if (!(sessionStorage.getItem(gridId + "GridTypeSet") == "true")) {
        //setGridSizeType(gridId);
    }

    if (typeof gridTypeHeight !== 'undefined') {
        setGridTypeHeight(gridId, gridTypeHeight);
    }

    if (typeof gridTypeSizeArray !== 'undefined') {
        $.each(gridTypeSizeArray, function (index, item) {
            if (item.gridId == gridId) {
                setGridTypeHeight(gridId, item.gridHeight);
                return false; // break the loop
            }
        });
    }
}
function updateGridCellBackgroundOpacity() {
    $(".k-grid-content td.k-table-td[style*='background: rgba(192, 192, 192, 0.114)']").each(function () {
        $(this).css("background", "var(--gw-color-neutral-1)");
    });
    $(".k-grid-content td.k-table-td[style*='background: rgba(192, 192, 192, 0.008)']").each(function () {
        $(this).css("background", "var(--gw-color-neutral-1)");
    });
}
// Future function to be used for Detail Grids in a Hierarchical Grid - DO NOT REMOVE
function setKendoDetailGridDataBoundEvents(e, panelNoRecordsFoundMsg) {
    ////console.log("=========================================================================");
    ////console.log("setKendoDetailGridDataBoundEvents()............................................");

    ////checkGridForNoRecordsFound(e, panelNoRecordsFoundMsg);
    ////setKendoGridSortedColumnAttributes(e);
}
function setGridCheckboxCompliance(e) {
    let gridCheckbox = document.querySelectorAll(".k-master-row td input[type=checkbox]");
    gridCheckbox.forEach(function (e) {
        let inputName = e.name;
        if (e.ariaLabel == undefined) {
            e.ariaLabel = inputName;
        }
    });
}
// If a grid has a command cell column, update each command cell TD by adding a container DIV around the cell 
// contents.  This will prevent the TDs from losing their default behavior due to the use of flexbox styles 
// inside each TD to align its content (e.g.buttons)
function updateCommandCellStructure(gridId) {
    $("#" + gridId + " td.k-command-cell").each(function () {
        $(this).wrapInner("<div></div>");
    });
}
function createGridClickEvents(gridId, gridRowSingleClickCallBack, gridRowDoubleClickCallBack) {
    if (gridRowSingleClickCallBack !== undefined && gridRowSingleClickCallBack !== null) {
        $("#" + gridId + " table tbody").off("click").on("click", "tr", function (e) {
            checkExecuteFunctionByNameWithData(gridRowSingleClickCallBack, e, null);
        });
    }
    if (gridRowDoubleClickCallBack !== undefined && gridRowDoubleClickCallBack !== null) {
        $("#" + gridId + " table tbody").off("dblclick").on("dblclick", "tr", function (e) {
            checkExecuteFunctionByNameWithData(gridRowDoubleClickCallBack, e, null);
        });
    }
}

function checkGridForNoRecordsFound(e, panelNoRecordsFoundMsg) {
    let noRecordsFoundMsg = globalNoRecordsFoundMsg;
    if (panelNoRecordsFoundMsg !== undefined && panelNoRecordsFoundMsg !== null) {
        noRecordsFoundMsg = panelNoRecordsFoundMsg;
    }

    let grid = e.sender;
    if (grid.dataSource.total() === 0) {
        let colCount = grid.columns.length;
        // check if kendo grid implements detail template (hierarchy) to include kendo expand/collapse column in count
        if (grid.wrapper.find("col[class*='k-hierarchy-col']").length > 0) {
            colCount++;
        }

        grid.wrapper
            .find("tbody[role*='rowgroup']")
            .append('<tr class="kendo-data-row" onclick="preventAction(event)" ondblclick="preventAction(event)"><td colspan="' + colCount + '" style="text-align:center"><br /><strong>' + noRecordsFoundMsg + '</strong></td></tr>');
    }

    // The following section of code is to apply the "no records" message, when applicable, to a detail grid within
    // a hierarchical Kendo grid.  This will be deprecated once all detail grids are calling the
    // setKendoDetailGridDataBoundEvents() function above.
    let masterRow = $("#" + grid.element[0].id).find(".k-master-row");
    if (masterRow !== null && masterRow.length > 0) {
        $(masterRow).each(function () {
            $(this).on("click", function (e) {
                // Make sure master row has completed expanding before checking detail row
                setTimeout(function waitMasterRowExpanded() {
                    let masterRowExpanded = $(e.target).closest(".k-master-row").find(".k-hierarchy-cell");
                    if (masterRowExpanded !== null && masterRowExpanded.length > 0) {
                        if ($(masterRowExpanded).attr("aria-expanded") === "true") {
                            let detailRow = $(e.target).closest(".k-master-row").next();
                            if (detailRow !== null && detailRow.length > 0 && detailRow.hasClass("k-detail-row")) {
                                let detailRowGrid = $(detailRow).find(".k-grid");
                                if (detailRowGrid !== null && detailRowGrid.length > 0) {
                                    let detailRowGridRows = $(detailRowGrid).find("tbody").find("tr[role='row']");
                                    if (detailRowGridRows.length === 0) {
                                        let detailColCount = $(detailRowGrid).find(".k-grid-header").find("th[scope='col']").length;
                                        $(detailRowGrid)
                                            .find("tbody[role*='rowgroup']")
                                            .append('<tr class="kendo-data-row" onclick="preventAction(event)" ondblclick="preventAction(event)"><td colspan="' + detailColCount + '" style="text-align:center"><br /><strong>' + noRecordsFoundMsg + '</strong></td></tr>');
                                    }
                                }
                            }
                        }
                    }
                    else {
                        setTimeout(waitMasterRowExpanded, 10);
                    }
                }, 10);
            });
        });
    }
}

function setKendoGridSortedColumnAttributes(e) {
    let grid = e.sender.wrapper;
    let gridId = e.sender.element[0].id;
    let gridData = e.sender.dataSource;
    let activeColFilters = false;
    let colCntr = 0;
    let columns = e.sender.columns;
    let filteredColumns = gridData.filter();
    let colHdrRow = grid.find("tr");
    let sortedColumns = gridData.sort();
    let totalColumns = grid.find("th.k-header").length;
    let totalPages = gridData.totalPages();
    let totalRows = gridData.total();

    // style each column header
    for (let i = 0; i < totalColumns; i++) {
        let header = null;
        let elmFltrIcon = null;
        let elmLink = null;
        let fltrIcon = null;
        let sortableLink = null;
        let styled = false;

        header = colHdrRow.find("th.k-header:eq(" + i + ")");
        if (header.length > 0 && header[0].hasAttribute !== undefined && header[0].hasAttribute !== '') {
            styled = (header[0].hasAttribute("data-header-styled")) && (header.attr("data-header-styled") == "data-header-styled");
        }
        if (!styled) {
            if (header.length > 0) {
                // Kendo only includes "k-cell-inner" style class when a column is sortable and/or filterable.  A "k-cell-inner" style class
                // is added to non-sortable/non-filterable columns in order to inherit the appropriate styles.
                let cellInner = $(header).find("span.k-cell-inner");
                if (cellInner.length == 0) {
                    $(header).wrapInner("<span class='k-cell-inner'></span>")
                }

                // if column header contains a sort, wrap it
                //if (($(header).attr("data-role") == "columnsorter") || ($(header).attr("data-role") == "filtermenu")) {
                sortableLink = $(header).find("span.k-link");
                $(sortableLink).wrap("<span class='grid-col-hdr-cell'></span>");
                //}

                // if column header contains a filter, wrap it
                fltrIcon = $(header).find("a.k-grid-filter");
                if (fltrIcon.length > 0) {
                    $(header).find("a").each(function () {
                        if ($(this).hasClass("k-grid-filter")) {
                            $(this).wrap("<span class='grid-filter-icon-cell'></span>");
                        }
                    });
                }

                // arrange the wrappers and add a placeholder for a potential sort indicator icon
                elmLink = $(header).find("span.grid-col-hdr-cell");
                if (elmLink.length > 0) {
                    elmFltrIcon = $(header).find("span.grid-filter-icon-cell").detach();
                    if (elmFltrIcon.length > 0) {
                        $(elmFltrIcon).last().insertAfter(elmLink);
                    }
                    if ($(header).attr("data-role") == "columnsorter") {
                        $("<span class='grid-sort-icon-cell'></div>").insertAfter(elmLink);
                    }
                }

                // add attribute to indicate the column header has been styled
                $(header).attr("data-header-styled", "data-header-styled");
            }
        }
    }

    // reset grid sort icon cell
    grid.find("tr th").find("span.grid-sort-icon-cell").each(function () {
        $(this).empty();
        $(this).removeClass("fa-stack display-none-priority");
    });

    // add sortable column icons to applicable headers
    for (let j = 0; j < totalColumns; j++) {
        let srtLink = colHdrRow.find("th.k-header:eq(" + j + ")").find("span.grid-col-hdr-cell").find(".k-link");
        if (srtLink.length > 0) {
            let srtIcon = colHdrRow.find("th.k-header:eq(" + j + ")").find("span.grid-sort-icon-cell");
            if (srtIcon.length > 0) {
                $(srtIcon).addClass("fa-stack");
                if (srtIcon.find(".grid-col-sort-ind-icon").length === 0) {
                    srtIcon.append("<i class='fa-solid fa-caret-up fa-stack-1x grid-col-sort-ind-icon'></i><i class='fa-light fa-caret-up fa-stack-1x grid-col-sort-ind-icon'></i>");

                    colHdrRow.find("th.k-header:eq(" + j + ")").addClass("clickable");
                    srtLink.find(".k-column-title").addClass("clickable");
                }
            }
        }
    }

    // if grid contains a sorted column, adjust the column color and header sort icon
    if (sortedColumns) {
        for (colCntr = 0; colCntr < columns.length; colCntr++) {
            let column = columns[colCntr];
            let header = null;
            let sortedColIdx = -1;

            for (let sortCntr = 0; sortCntr < sortedColumns.length; sortCntr++) {
                if (sortedColumns[sortCntr].field === column.field) {
                    // add background opacity to sorted column cells
                    for (let n = 0; n < totalColumns; n++) {
                        header = colHdrRow.find("th.k-header:eq(" + n + ")");
                        if (header.attr("data-field") === column.field) {
                            colHdrRow.find("td:eq(" + n + ")").css({ background: "rgba(192,192,192,0.115)" });
                            sortedColIdx = n;
                            break;
                        }
                    }

                    // setup the sorted column icon
                    let sortCell = colHdrRow.find("th.k-header:eq(" + sortedColIdx + ")").find(".grid-sort-icon-cell");
                    if (sortCell.length > 0) {
                        sortCell.children().remove();
                        if (sortedColumns[sortCntr].dir === "asc") {
                            //sortCell.append("<span class='fa-solid fa-caret-up fa-lg grid-col-sorted-ind-icon'></span>");
                            sortCell.append("<i class='fa-solid fa-caret-up fa-stack-1x grid-col-sorted-ind-icon'></i><i class='fa-light fa-caret-up fa-stack-1x grid-col-sort-ind-icon'></i>");
                        }
                        else {
                            if (sortedColumns[sortCntr].dir === "desc") {
                                //sortCell.append("<span class='fa-solid fa-caret-down fa-lg grid-col-sorted-ind-icon'></span>");
                                sortCell.append("<i class='fa-solid fa-caret-down fa-stack-1x grid-col-sorted-ind-icon'></i><i class='fa-light fa-caret-down fa-stack-1x grid-col-sort-ind-icon'></i>");
                            }
                        }
                    }
                    break;
                }
            }
        }
    }

    // determine if any of the visible columns have an active filter

    // NOTE: The kendo.data.DataSource.filter configuration property can be either an array of {field, operator, value} tuples,
    //       or an object containing a "logic" property (value can be "and" or "or") and a "Filters" property (an array of {field,
    //       operator, value} tuples, or other nested filter objects).

    if (filteredColumns) {
        for (colCntr = 0; colCntr < columns.length; colCntr++) {
            let columnField = columns[colCntr].field;
            let columnFilterable = columns[colCntr].filterable;
            for (let fltCntr1 = 0; fltCntr1 < filteredColumns.filters.length; fltCntr1++) {
                let filterField = null;
                if (filteredColumns.filters[fltCntr1].logic) {
                    for (let fltCntr2 = 0; fltCntr2 < filteredColumns.filters[fltCntr1].filters.length; fltCntr2++) {
                        filterField = filteredColumns.filters[fltCntr1].filters[fltCntr2].field;
                        if ((columnField == filterField) && columnFilterable) {
                            activeColFilters = true;
                            $(this).find("a.k-grid-filter").addClass("k-active");
                        }
                    }
                }
                else {
                    filterField = filteredColumns.filters[fltCntr1].field;
                    if ((columnField == filterField) && columnFilterable) {
                        activeColFilters = true;
                        $(this).find("a.k-grid-filter").addClass("k-active");
                    }
                }
            }
        }
    }

    // if the result set is 1 record or less and there are no active filters on visible columns, hide the sort and filter icons
    if ((totalRows < 2) && !activeColFilters && (totalPages < 2 || isNaN(totalPages))) {
        $("#" + gridId + " span.grid-sort-icon-cell").each(function () {
            $(this).addClass("display-none-priority");
            $(this).parents("th.k-header").removeClass("clickable");
            $(this).parents("th.k-header").find(".k-column-title").removeClass("clickable");
        });

        $("#" + gridId + " .k-grid-filter-menu").each(function () {
            $(this).addClass("display-none-priority");
        });
    }
    else {
        $("#" + gridId + " span.grid-sort-icon-cell").each(function () {
            $(this).removeClass("display-none-priority");
            $(this).parents("th.k-header").addClass("clickable");
            $(this).parents("th.k-header").find(".k-column-title").addClass("clickable");
        });

        $("#" + gridId + " .k-grid-filter-menu").each(function () {
            $(this).removeClass("display-none-priority");
        });
    }
}

function styleGridFilters() {
    $("form.k-filter-menu").each(function () {
        let filterForm = $(this);

        if (!filterForm[0].hasAttribute("data-filter-styled")) {
            $(filterForm).attr("data-filter-styled", "data-filter-styled");

            $(filterForm).find(".k-datepicker input").each(function () {
                $(this).kendoMaskedDatePicker();
                $(this).removeAttr("aria-placeholder");
            });
            let multiFilterContainer = $(filterForm).find("ul.k-multicheck-wrap");
            if (multiFilterContainer.length > 0) {
                filterSeqId = filterSeqId + 1;
                let fltrItems = $(multiFilterContainer).find("li.k-item");
                $.each(fltrItems, function () {
                    let fltrItem = $(this).find('.k-label input');
                    fltrItem.addClass("k-checkbox editor-control");
                    let chkbxID = fltrItem.val().toLowerCase().replace(/\s+/g, '') + 'Chkbx' + filterSeqId;
                    fltrItem.attr("id", chkbxID);

                    let labelText = $(this).find(".k-label").text();
                    let $newLabel = $("<label>")
                        .addClass("k-checkbox-label")
                        .attr("for", chkbxID)
                        .text(labelText);
                    fltrItem.after($newLabel);

                    // Remove duplicate label text
                    $(this).find(".k-label").contents().filter(function () {
                        return (this.nodeType == 3);
                    }).remove();
                });
            }
            // Make sure filter buttons are put in their own div element.
            $(filterForm).find(".k-actions").find("button").wrapAll("<div class='grid-filter-buttons'></div>");
        }
    });
}

function localizeKendoGridMessages(e) {
    // Currently, with the exception of the pager info section ("No Items to Display", etc.), Kendo's grid implementation uses a
    // resource file for all pager related labels and tooltips.  To avoid creating new resource files, or updating every grid
    // individually, all resource file related labels are handled in this function.  The pager info section which Kendo currently
    // localizes (for now) will remain intact.
    let grid = e.sender.wrapper;

    grid.find("thead").find("th.k-header").each(function () {
        let currentHeader = $(this);
        let currentHeaderText = $(currentHeader).attr("data-title");

        let currentHeaderSortIcon = $(currentHeader).find("td.grid-sort-icon-cell").find("a.k-link");
        if ((currentHeaderSortIcon !== null) && (currentHeaderSortIcon.length > 0)) {
            $(currentHeaderSortIcon).attr("title", globalGridSortMsg.replace("{0}", currentHeaderText));
        }

        let currentHeaderFilterIcon = $(currentHeader).find("span.k-icon.k-i-filter");
        if ((currentHeaderFilterIcon !== null) && (currentHeaderFilterIcon.length > 0)) {
            $(currentHeaderFilterIcon).attr("title", globalGridFilterMsg.replace("{0}", currentHeaderText));
        }
    });

    grid.find("div.k-pager.k-grid-pager").children("a").each(function () {
        let currentElement = $(this);
        if ($(currentElement).hasClass("k-link") && $(currentElement).hasClass("k-pager-nav") && $(currentElement).hasClass("k-pager-first")) {
            $(currentElement).attr("title", globalGridFirstPageMsg);
            $(currentElement).attr("aria-label", globalGridFirstPageMsg);

            let prevElement = $(currentElement).next();
            $(prevElement).attr("title", globalGridPrevPageMsg);
            $(prevElement).attr("aria-label", globalGridPrevPageMsg);
        }
        if ($(currentElement).hasClass("k-link") && $(currentElement).hasClass("k-pager-nav") && $(currentElement).hasClass("k-pager-last")) {
            $(currentElement).attr("title", globalGridLastPageMsg);
            $(currentElement).attr("aria-label", globalGridLastPageMsg);

            let nextElement = $(currentElement).prev();
            $(nextElement).attr("title", globalGridNextPageMsg);
            $(nextElement).attr("aria-label", globalGridNextPageMsg);
        }
    });

    let pagerItemsPerPage = grid.find("span.k-pager-sizes");
    if ((pagerItemsPerPage !== null) && (pagerItemsPerPage.length > 0)) {
        $(pagerItemsPerPage).contents().last()[0].textContent = globalGridItemsPerPageMsg;
    }

    let displayFooter = grid.find("span.k-pager-info");
    if (displayFooter != null && displayFooter.length > 0) {
        // We have to use a setTimeout here because otherwise this specific message will appear before the
        // grid is fully rendered so it will get overwritten by the default message.
        setTimeout(function () {
            let currentPage = grid.data("kendoGrid").dataSource.page();
            let pageSize = grid.data("kendoGrid").dataSource.pageSize();
            let totalCount = grid.data("kendoGrid").dataSource.total()
            let localGridDisplayMsg = "";
            if (totalCount > 0) {
                // Determine the range of rows the user is currently viewing.
                let startPageRange = (currentPage - 1) * pageSize + 1;
                let endPageRange = totalCount <= currentPage * pageSize ? totalCount : currentPage * pageSize;

                // Display localized "<start range> - <end range> of <total> items" message.
                localGridDisplayMsg = globalGridDisplayMsg.format(startPageRange, endPageRange, totalCount);
            }
            else {
                // Display localized "No Items To Display" message
                localGridDisplayMsg = globalGridEmptyMsg;
            }

            $(displayFooter).contents().last()[0].textContent = localGridDisplayMsg;
        }, 1);
    }

    let refreshTooltip = grid.find("a.k-pager-refresh");
    if ((refreshTooltip !== null) && (refreshTooltip.length > 0)) {
        $(refreshTooltip).attr("title", globalGridRefreshMsg);
        $(refreshTooltip).attr("aria-label", globalGridRefreshMsg);
    }
}

function repositionGridSecondaryToolbar(gridId) {
    let gridToolbarContainer = $("#" + gridId).find(".k-grid-toolbar");
    if ((gridToolbarContainer !== null) && (gridToolbarContainer.length > 0)) {
        // Kendo Grids only define a toolbar located above the column headers.  MMS uses "primary" and "secondary" class styles to
        // create two toolbars, one in the default location (primary) and the other positioned just above the pagination buttons.
        if ($(gridToolbarContainer).children(".grid-toolbar-secondary").length > 0) {
            //$("#" + gridId).find(".k-pager-wrap.k-grid-pager.k-widget.k-floatwrap").children().wrapAll("<div class='grid-pager-container' />");
            $("#" + gridId).find(".k-grid-pager")
                .prepend($("#" + gridId).find(".grid-toolbar-secondary"));
        }
    }
    if (!gridSetOptionAction) {
        setGridToolbarVisibility(gridId, false);
    }
}

function setGridToolbarVisibility(gridId, hideToolbars) {
    let primaryToolbar = $("#" + gridId).find(".grid-toolbar-primary");
    let secondaryToolbar = $("#" + gridId).find(".grid-toolbar-secondary");
    if (hideToolbars) {
        if (primaryToolbar !== null && primaryToolbar.length > 0) {
            $(primaryToolbar).addClass("display-none");
        }
        if (secondaryToolbar !== null && secondaryToolbar.length > 0) {
            $(secondaryToolbar).addClass("display-none");
        }
    }
    else {
        if (primaryToolbar !== null && primaryToolbar.length > 0) {
            $(primaryToolbar).removeClass("display-none");
        }
        if (secondaryToolbar !== null && secondaryToolbar.length > 0) {
            $(secondaryToolbar).removeClass("display-none");
        }
    }
}

function setGridTypeHeight(gridId, gridHeight) {
    // Grids are defined as one of 4 types: DEFAULT (KENDO), BASIC, EXPANDED AND JUMBO. (Original app settings below)
    //    DEFAULT properties:  Page size options (5, 10, 20);   Default page size (5);  Grid content max height (200px)
    //    BASIC properties:    Page size options (5, 10, 20);   Default page size (10); Grid content max height (200px)
    //    EXPANDED properties: Page size options (10, 20, 50);  Default page size (20); Grid content max height (500px)
    //    JUMBO properties:    Page size options (20, 50, 100); Default page size (50); Grid content max height (600px)
    if (!$("#" + gridId).hasClass("grid-full-screen")) {
        $("#" + gridId).children(".k-grid-content").css({
            "max-height": (gridHeight / 10).toString() + "rem",
            "height": "auto"
        });

        // Save the height of each grid to use when the full-screen feature is utilized
        sessionStorage.setItem(gridId + "GridTypeHeight", gridHeight);
    }
}

function applyKendoFilters(gridId, filters) {
    let gridData = $(gridId).data("kendoGrid");
    let currFilterObj = gridData.dataSource.filter();
    let currentFilters = currFilterObj ? currFilterObj.filters : [];

    for (let idx = 0, len = filters.length; idx < len; idx++) {
        let filterField = filters[idx][0];
        let filterOperator = filters[idx][1];
        let filterValue = filters[idx][2];

        if (currentFilters && currentFilters.length > 0) {
            for (let i = 0; i < currentFilters.length; i++) {
                if (currentFilters[i].field == filterField) {
                    currentFilters.splice(i, 1);
                    break;
                }
            }
        }

        if (filterValue != "") {
            currentFilters.push({
                field: filterField,
                operator: filterOperator,
                value: filterValue
            });
        }
    }

    gridData.dataSource.filter({
        logic: "and",
        filters: currentFilters
    });
}

function clearKendoFilters(gridId) {
    let gridData = $(gridId).data("kendoGrid");
    gridData.dataSource.filter({});
}

function gridDataSourceQuery(gridId, filters, page, pageSize, sort) {
    let gridData = $(gridId).data("kendoGrid");
    let currFilterObj = gridData.dataSource.filter();
    let currentFilters = currFilterObj ? currFilterObj.filters : [];

    for (let idx = 0, len = filters.length; idx < len; idx++) {
        let filterField = filters[idx][0];
        let filterOperator = filters[idx][1];
        let filterValue = filters[idx][2];

        if (currentFilters && currentFilters.length > 0) {
            for (let i = 0; i < currentFilters.length; i++) {
                if (currentFilters[i].field == filterField) {
                    currentFilters.splice(i, 1);
                    break;
                }
            }
        }

        if (filterValue != "") {
            currentFilters.push({
                field: filterField,
                operator: filterOperator,
                value: filterValue
            });
        }
    }

    gridData.dataSource.query({
        page: page,
        pageSize: pageSize,
        sort: sort,
        filter: {
            logic: "and",
            filters: currentFilters
        }
    });
}

function setCommandButtonImages(grid) {
    let gridRows = grid.tbody.find("tr");
    gridRows.each(function (e) {
        let copyButton = $(this).find("td.k-table-td").find(".copy-btn");
        if (copyButton) {
            $(copyButton).attr("role", "button").attr("aria-label", globalGridCopyBtn);
            $(copyButton).append("<i class='fa-solid fa-copy'></i>");
        }
        let copyButtonOld = $(this).find("td.k-table-td").find("#copy-btn");
        if (copyButtonOld) {
            $(copyButtonOld).attr("role", "button").attr("aria-label", globalGridCopyBtn);
            $(copyButtonOld).append("<i class='fa-solid fa-copy'></i>");
        }

        let editButton = $(this).find("td.k-table-td").find(".edit-btn");
        if (editButton) {
            $(editButton).attr("role", "button").attr("aria-label", globalGridEditBtn);
            $(editButton).append("<i class='fa-solid fa-pen'></i>");
        }
        let editButtonOld = $(this).find("td.k-table-td").find("#edit-btn");
        if (editButtonOld) {
            $(editButtonOld).attr("role", "button").attr("aria-label", globalGridEditBtn);
            $(editButtonOld).append("<i class='fa-solid fa-pen'></i>");
        }

        let mailButton = $(this).find("td.k-table-td").find(".mail-btn");
        if (mailButton) {
            $(mailButton).attr("role", "button").attr("aria-label", globalMail);
            $(mailButton).append("<i class='fa-solid fa-envelope'></i>");
        }
        let mailButtonOld = $(this).find("td.k-table-td").find("#mail-btn");
        if (mailButtonOld) {
            $(mailButtonOld).attr("role", "button").attr("aria-label", globalMail);
            $(mailButtonOld).append("<i class='fa-solid fa-envelope'></i>");
        }

        let removeButton = $(this).find("td.k-table-td").find(".remove-btn");
        if (removeButton) {
            $(removeButton).attr("role", "button").attr("aria-label", globalRemoveBtn);
            $(removeButton).append("<i class='fa-solid fa-xmark'></i>");
        }
        let removeButtonOld = $(this).find("td.k-table-td").find("#remove-btn");
        if (removeButtonOld) {
            $(removeButtonOld).attr("role", "button").attr("aria-label", globalRemoveBtn);
            $(removeButtonOld).append("<i class='fa-solid fa-xmark'></i>");
        }
        let commentButton = $(this).find("td.k-table-td").find(".comment-btn");
        if (commentButton) {
            $(commentButton).append("<i class='fa-solid fa-comment-dots'></i>");
        }
        let downloadButton = $(this).find("td").find(".download-btn");
        if (downloadButton) {
            $(downloadButton).attr("role", "button").attr("aria-label", globalDownloadBtn);
            $(downloadButton).append("<i class='fa-solid fa-download'></i>");
        }
        let downloadButtonOld = $(this).find("td").find("#download-btn");
        if (downloadButtonOld) {
            $(downloadButton).attr("role", "button").attr("aria-label", globalDownloadBtn);
            $(downloadButtonOld).append("<i class='fa-solid fa-download'></i>");
        }
        let retryButton = $(this).find("td").find(".retry-btn");
        if (retryButton) {
            $(retryButton).attr("role", "button").attr("aria-label", globalRetryBtn);
            $(retryButton).append("<i class='fa-solid fa-arrows-rotate'></i>");
        }
        let retryButtonOld = $(this).find("td").find("#retry-btn");
        if (retryButtonOld) {
            $(retryButton).attr("role", "button").attr("aria-label", globalRetryBtn);
            $(retryButtonOld).append("<i class='fa-solid fa-arrows-rotate'></i>");
        }
    });
}

function gridFullScreenToggle(gridId) {
    let gridTypeHeight = sessionStorage.getItem(gridId + "GridTypeHeight");

    if ((gridTypeHeight == null) || (gridTypeHeight == undefined)) {
        gridTypeHeight = globalGridTypeDefaultHeight;
    }

    let gridHeight = (gridTypeHeight / 10).toString() + "rem";
    if ($("#" + gridId).hasClass("grid-full-screen")) {
        $("#" + gridId).removeClass("grid-full-screen");
        $("#" + gridId).children(".k-grid-content").css({
            "max-height": gridHeight,
            "height": "auto"
        });
    }
    else {
        $("#" + gridId).addClass("grid-full-screen");
        let elemHgt = getGridElementsHeight("#" + gridId);
        gridHeight = (($(window).height() - elemHgt) / 10).toString() + "rem";
        $("#" + gridId).children(".k-grid-content").css({
            "max-height": gridHeight,
            "height": gridHeight
        });
    }
}

function getGridElementsHeight(gridId) {
    let toolbar = $(gridId).children(".k-grid-toolbar").length > 0 ? $(gridId).children(".k-grid-toolbar").outerHeight() : 0;
    let header = $(gridId).children(".k-grid-header").length > 0 ? $(gridId).children(".k-grid-header").outerHeight() : 0;
    let footer = $(gridId).children(".k-grid-footer").length > 0 ? $(gridId).children(".k-grid-footer").outerHeight() : 0;
    let pager = $(gridId).children(".k-grid-pager").length > 0 ? $(gridId).children(".k-grid-pager").outerHeight() : 0;

    return toolbar + header + footer + pager;
}

//-----------------------------------------------------------------------------------------
// End of Grid-related functions
//-----------------------------------------------------------------------------------------

function configureFilterNav() {
    filterNav = $('#filterNav');
    if (filterNav.length) {
        setFilterNavDimensions();
        adjustFooterUnderFilterNav();
    }
}

//-----------------------------------------------------------------------------------------
// Password-related functions
//-----------------------------------------------------------------------------------------

function applyPasswordVisibility(pwdWidgetId) {
    // In EDGE, Alt+F8 shortcut will initially display the password as well.  Disable this feature
    // if the MES version of password visibility is enabled.
    document.addEventListener('keydown', function (event) {
        if (event.altKey && event.key === 'F8') {
            event.preventDefault();
        }
    });

    $(":password").each(function () {
        if (!$(this).is('[name="fakepasswordremembered"]')) {
            let pwdId = $(this).attr("id");
            let pwdToggleId = pwdId + "VisibilityToggle";
            if ($(this).siblings("#" + pwdToggleId).length == 0) {
                let pwdToggleIconId = pwdId + "VisibilityToggleIcon";
                $(this).after('<span id="' + pwdToggleId + '" class="textbox-combo-icon clickable" unselectable="on" tabindex="-1"><i id="' + pwdToggleIconId + '" class="k-icon fa-solid fa-eye-slash" tabindex="0" role="button" aria-label="' + globalPasswordVisibilityToggle + '"></i></span>');
            }

            // Toggle the password visibility icon based on the current state
            togglePasswordVisibility(this.id);
        }
    });
}

function togglePasswordVisibility(pwdWidget) {
    if (!(pwdWidget == undefined || pwdWidget == null || pwdWidget == "")) {
        let passwordWidget = $("#" + pwdWidget);
        if (passwordWidget.length > 0) {
            // Clicking the password icon/button will toggle the visibility of the password value
            $(passwordWidget).siblings("#" + pwdWidget + "VisibilityToggle").off("click").on("click", function (e) {
                let eyeIcon = $(this).find("#" + pwdWidget + "VisibilityToggleIcon");
                togglePasswordVisibilityIcon(passwordWidget, eyeIcon);
            });

            // Pressing SPACE with icon in focus simulates an onClick
            $(passwordWidget).siblings("#" + pwdWidget + "VisibilityToggle").off("keyup").on("keyup", function (e) {
                if (e.which === 32) {
                    let eyeIcon = $(this).find("#" + pwdWidget + "VisibilityToggleIcon");
                    togglePasswordVisibilityIcon(passwordWidget, eyeIcon);
                }
            });
        }
    }
}

function togglePasswordVisibilityIcon(passwordWidget, eyeIcon) {
    if ($(passwordWidget).attr("type") === "password") {
        if ($(passwordWidget).val != "") {
            $(passwordWidget).attr("type", "text");
            $(eyeIcon).removeClass("fa-eye fa-eye-slash").addClass("fa-eye");
            $(eyeIcon).attr("aria-label", globalPasswordUnmasking);
        }
    }
    else {
        if ($(passwordWidget).val != "") {
            $(passwordWidget).attr("type", "password");
            $(eyeIcon).removeClass("fa-eye fa-eye-slash").addClass("fa-eye-slash");
            $(eyeIcon).attr("aria-label", globalPasswordMasking);
        }
    }
}

//-----------------------------------------------------------------------------------------
// End of Password-related functions
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
// Redaction-related functions
//-----------------------------------------------------------------------------------------

// Redact the value contained in every redaction widget and display the value initially as redacted
function applyRedactions(panelId) {
    if (panelId == undefined) {
        panelId = '';
    }

    if (panelId.length > 0 && !panelId.startsWith("#")) {
        panelId = "#" + panelId;
    }

    $(panelId + " div[data-template='EINWithRedact'], div[data-template='SSNWithRedact'], div[data-template='TextWithRedact']").each(function () {
        let widgetInput = $(this).find(".editor-field input.k-input-inner");

        if (widgetInput !== null && widgetInput.length > 0) {
            let widgetId = $(widgetInput).attr("id");
            let widgetRawValId = widgetId + "RawVal";
            let unredactedValue = $("#" + widgetRawValId).val() || "";

            if (unredactedValue.length > 0) {
                if (($(this).attr("data-template") === "EINWithRedact") || ($(this).attr("data-template") === "SSNWithRedact")) {
                    let maskedTextBox = $("#" + widgetId).data("kendoMaskedTextBox");
                    maskedTextBox.value(generateRedaction(unredactedValue, unredactedSize));
                }
                else if ($(this).attr("data-template") === "TextWithRedact") {
                    let textBox = $("#" + widgetId).data("kendoTextBox");
                    textBox.value(generateRedaction(unredactedValue, unredactedSize));
                }

                $(this).find(".textbox-combo-icon .k-icon").removeClass("fa-eye fa-eye-slash").addClass("fa-eye-slash");
                sessionStorage.setItem(widgetId + "RedactMode", "1");
            }
            else {
                $(this).find(".textbox-combo-icon .k-icon").removeClass("fa-eye fa-eye-slash").addClass("fa-eye");
                sessionStorage.setItem(widgetId + "RedactMode", "0");
            }
        }
    });
}

// Generate redacted value based upon the value and redaction size provided
function generateRedaction(value, unredactedSize) {
    let redactedValue = "";
    let redactedLength = 0;

    if (value != "undefined") {
        redactedLength = (value.length > unredactedSize) ? value.length - unredactedSize : value.length;
    }

    for (let i = 0; i < redactedLength; i++) {
        redactedValue += "●";
    }
    redactedValue += value.substring(redactedLength);

    return redactedValue;
}

// Store the raw version of the redaction widget value, as well as the original value used for resets
function populateRedactionWidget(redactWidgetId, unredactedValue) {
    let redactWidgetRawValId = "#" + redactWidgetId + "RawVal";

    // Store the unredacted value
    if (unredactedValue == undefined || unredactedValue == "") {
        $(redactWidgetRawValId).val(null);
    }
    else {
        let redactCharIdx = unredactedValue.indexOf("●");
        if (redactCharIdx == -1) {
            $(redactWidgetRawValId).val(unredactedValue);
        }
    }

    // Store the original value, for use during a form reset
    let origRawWidgetValue = $(redactWidgetRawValId).attr("data-original-value");
    if (origRawWidgetValue?.length == 0) {
        $(redactWidgetRawValId).attr("data-original-value", unredactedValue);
    }
}

// Reset the value of every redaction widget to its original value, within the panel specified
function resetRedactionWidgets(panelId) {
    let redactionPanel = $("#" + panelId);
    let redactWidgetId = null;

    $(redactionPanel).find("div[data-template='EINWithRedact'], div[data-template='SSNWithRedact'], div[data-template='TextWithRedact']").each(function () {
        if (($(this).attr("data-template") === "EINWithRedact") || ($(this).attr("data-template") === "SSNWithRedact")) {
            redactWidgetId = $(this).find("input[data-role='maskedtextbox']").attr("id");
        }
        else if ($(this).attr("data-template") === "TextWithRedact") {
            redactWidgetId = $(this).find("input[data-role='textbox']").attr("id");
        }

        let redactWidgetRawValId = "#" + redactWidgetId + "RawVal";
        let origRawWidgetValue = $(redactWidgetRawValId).attr("data-original-value");
        $(redactWidgetRawValId).val(origRawWidgetValue);

        populateRedactionWidget(redactWidgetId, origRawWidgetValue);
        applyRedactions(panelId);
    });
}

// Remove all hidden redaction elements on a page, or just the ones specified in the given panel/modal ID
function removeRedactionRawValues(id) {
    if (id == undefined) {
        $("input[data-widget-type='EINWithRedact']").each(function () {
            clearUnredactedValue(this, "ein");
        });
        $("input[data-widget-type='SSNWithRedact']").each(function () {
            clearUnredactedValue(this, "ssn");
        });
        $("input[data-widget-type='TextWithRedact']").each(function () {
            clearUnredactedValue(this, "text");
        });
    }
    else {
        $("#" + id).find("input[data-widget-type='EINWithRedact']").each(function () {
            clearUnredactedValue(this, "ein");
        });
        $("#" + id).find("input[data-widget-type='SSNWithRedact']").each(function () {
            clearUnredactedValue(this, "ssn");
        });
        $("#" + id).find("input[data-widget-type='TextWithRedact']").each(function () {
            clearUnredactedValue(this, "text");
        });
    }

    function clearUnredactedValue(that, redactionType) {
        let widgetContainer = $("#" + $(that).attr("id") + "RawVal").parent();
        if ($(widgetContainer).data("redact-container") == redactionType) {
            $(widgetContainer).remove();
        }
    }
}
//-----------------------------------------------------------------------------------------
// End of Redaction-related functions
//-----------------------------------------------------------------------------------------

function localizeWidgets(panelId) {
    localizeAutoCompleteWidgets(panelId);
    localizeDropDownListWidgets(panelId);
    localizeMultiSelectWidgets(panelId);
}

function localizeAutoCompleteWidgets(panelId) {
    $(panelId + ".k-autocomplete input").each(function () {
        $(this).data("kendoAutoComplete").setOptions({
            messages: {
                noData: globalEntityNoDataMsg
            }
        });
    });
}

function localizeDropDownListWidgets(panelId) {
    $(panelId + ".k-dropdownlist input").each(function () {
        $(this).data("kendoDropDownList").setOptions({
            messages: {
                noData: globalEntityNoDataMsg
            }
        });
    });
}

function localizeMultiSelectWidgets(panelId) {
    let currentWidgetTooltip;

    $(panelId + ".k-multiselect select").each(function () {
        $(this).data("kendoMultiSelect").setOptions({
            messages: {
                noData: globalEntityNoDataMsg
            }
        });
    });

    // The code below works and sets up the tooltip for the close icon on each multi-select item selected, but
    // if I put this in it will cause the changes events for multi-select controls set up by the module teams inside
    // the cshtml file to not trigger. Instead, the module teams would need to set up their change event
    // inside their javascript file.  So I'm commenting out these lines for now.
    //$(panelId + " .k-multiselect select").on("change", function () {
    //    // Delete tooltip
    //    $(this)[0].element.parent().find(".k-chip-remove-action").each(function () {
    //        $(this).attr("title", globalEntityDeleteMsg).attr("aria-label", globalEntityDeleteMsg).tooltip();
    //    });

    //});

    $(panelId + ".k-multiselect").each(function () {
        // Clear Tooltip
        currentWidgetTooltip = $(this).find("span.k-clear-value");
        if (currentWidgetTooltip !== null && currentWidgetTooltip.length > 0) {
            $(currentWidgetTooltip).attr("title", globalEntityClearMsg);
        }
    });
}

//-----------------------------------------------------------------------------------------
// Miscellaneous functions
//-----------------------------------------------------------------------------------------
function checkExecuteFunctionByName(functionName, defaultReturnValue) {
    let returnValue = defaultReturnValue;

    if ($.isFunction(window[functionName])) {
        returnValue = window[functionName]();
    }

    return returnValue;
}

function checkExecuteFunctionByNameWithData(functionName, data, defaultReturnValue) {
    let returnValue = defaultReturnValue;

    if ($.isFunction(window[functionName])) {
        returnValue = window[functionName](data);
    }

    return returnValue;
}

function checkExecuteParentWindowFunctionByName(functionName, defaultReturnValue) {
    let returnValue = defaultReturnValue;

    if ($.isFunction(window.parent[functionName])) {
        returnValue = window.parent[functionName]();
    }

    return returnValue;
}

function checkExecuteParentWindowFunctionByNameWithData(functionName, data, defaultReturnValue) {
    let returnValue = defaultReturnValue;

    if ($.isFunction(window.parent[functionName])) {
        returnValue = window.parent[functionName](data);
    }

    return returnValue;
}

function formatDialogCss(type) {
    let cssClass;

    switch (type.toUpperCase()) {
        case "ALERT":
        case "WARNING":
            cssClass = "msg-inline-alert";
            break;
        case "ERROR":
            cssClass = "msg-inline-error";
            break;
        case "INFO":
        case "QUESTION":
            cssClass = "msg-inline-info";
            break;
        case "SUCCESS":
            cssClass = "msg-inline-success";
            break;
    }

    return cssClass;
}

function formatDialogIcon(type) {
    let icon;

    switch (type.toUpperCase()) {
        case "ALERT":
        case "WARNING":
            icon = "fa-circle-exclamation";
            break;
        case "ERROR":
            icon = "fa-ban";
            break;
        case "INFO":
        case "QUESTION":
            icon = "fa-circle-info";
            break;
        case "SUCCESS":
            icon = "fa-circle-check";
            break;
    }

    return icon;
}

function getModalDialogStyle(type) {
    let modalStyle;

    switch (type.toLowerCase()) {
        case "alert":
        case "question":
            modalStyle = "alert";
            break;
        case "base":
            modalStyle = "base";
            break;
        case "error":
        case "warning":
            modalStyle = "warn";
            break;
        case "info":
            modalStyle = "info";
            break;
        case "success":
            modalStyle = "success";
            break;
    }
    return modalStyle;
}

function formatPartialZipCode(controlName) {
    let ctrl = $('#' + controlName);
    ctrl.val(ctrl.val().replace("-____", "-0000"));
}

function onblurPartialZipcodeSearch(controlName) {
    let ctrl = $('#' + controlName);
    if (ctrl.val().indexOf("_-") == -1) {
        ctrl.val(ctrl.val().replace("-____", ""));
    }
}

function onfocusPartialZipcodeSearch(controlName) {
    let ctrl = $('#' + controlName);
    if (ctrl.val().length == 5) {
        ctrl.val(ctrl.val() + "-____");
    }
}

function getFormFieldValue(fieldName, defaultValue) {
    let value = defaultValue;

    let ctrl = $("#" + fieldName);
    if (ctrl.length && ctrl.val().length > 0) {
        value = ctrl.val().trim();
    }

    return value;
}

function setFieldAsRequired(fieldId, labelForId) {
    let labelReqElem;
    let fieldLabelText;
    let labelElem = $("label[for=" + labelForId + "]");
    if (labelElem.length > 0) {
        fieldLabelText = globalValidationRequiredFieldMsg.format($("#" + labelElem[0].id).text());
    }

    if ($("#" + fieldId).attr("not-data-val-required") != undefined) {
        $("#" + fieldId).renameAttr("not-data-val-required", "data-val-required");
    }
    else if (fieldLabelText != undefined && fieldLabelText != "") {
        $("#" + fieldId).attr("data-val-required", fieldLabelText);
    }
    else {
        $("#" + fieldId).attr("data-val-required", globalValidationRequiredSummaryMsg);
    }

    labelReqElem = labelElem.parents(".editor-label").first();
    if (labelReqElem !== null && labelReqElem.length > 0) {
        let labelReqIcon = $(labelReqElem).find(".editor-req-field");
        if (labelReqIcon == null || labelReqIcon.length == 0) {
            let fieldLabelMsg = "<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + fieldLabelText + "' data-role='tooltip'></span>";
            labelReqElem.prepend(fieldLabelMsg);
        }
    }
}

function setFieldAsNotRequired(fieldId, labelForId) {
    $("#" + fieldId).renameAttr("data-val-required", "not-data-val-required");
    let labelReqElem = $("label[for=" + labelForId + "]").parents(".editor-label").first().children(".editor-req-field").first();
    if (labelReqElem !== null && labelReqElem.length > 0) {
        labelReqElem.remove();
    }
}

function removeDatePickerValSpan() {
    $(".k-datepicker ").each(function () {
        let widget = $(this).find("input[data-role = 'datepicker']");
        if (widget.length > 0) {
            let dropDownId = $(widget).attr("id");
            if ($(this).parent().find('.field-validation-valid[data-valmsg-for="' + dropDownId + '"]').length > 1) {
                $(this).parent().find('.field-validation-valid[data-valmsg-for="' + dropDownId + '"]').remove();
            }
        }
    });
}

function kendoAutoCompleteFilteringPreventBlank(e) {
    if (e.filter !== undefined) {
        if (!e.filter.value || e.filter.value.length < 2) { e.sender.popup.close(); e.preventDefault(); }
    }
}

// initialize/format panel (div) tooltip elements for kendoTooltip
function initializePanelTooltip(panelId) {
    if (panelId !== undefined && panelId !== '') {
        $(panelId).find('label[title], img[title], li[title], span[title]').not("[title='']").tooltip();
    }

    closeWidgetTooltipsOnBlur();
}

function initializeTooltip(panelId) {

    // Setup tooltips for all widgets that have a title attribute
    if (panelId) {
        $(panelId.trim()).find("a[title], label[title], li[title], img[title], span[title]").not("[title='']").not('.k-numerictextbox').not(".k-numeric-wrap").not(".k-dropdown").not("[data-role='tooltip']").each(function () {
            $(this).tooltip();
        })
    }
    else {
        panelId = "";
        $("a[title], label[title], li[title], img[title], span[title]").not("[title='']").not('.k-numerictextbox').not(".k-numeric-wrap").not(".k-dropdown").each(function () {
            $(this).tooltip();
        })
    }

    closeWidgetTooltipsOnBlur(panelId);

    // When hovering over a grid filter icon, hide the associated grid column header tooltip
    $(panelId + "span.k-icon.k-i-filter[data-role='tooltip']").mouseover(function () {
        let colhdr = $(this).parents("th.k-header[title]");
        if (colhdr !== null && colhdr.length > 0) {
            // Make sure tooltip has loaded before setup
            let fltrTimeout = setTimeout(function waitSetTooltip() {
                let colhdrId = $(colhdr).attr("aria-describedby");
                colhdrTooltip = $("div.k-tooltip[id='" + colhdrId + "']").parent();
                if (colhdrTooltip !== null && colhdrTooltip.length > 0) {
                    $(colhdrTooltip).css("display", "none");
                    clearTimeout(fltrTimeout);
                } else {
                    setTimeout(waitSetTooltip, 10);
                }
            }, 10);
        }
    });

    // Hide a tooltip on mouseout
    $(panelId + "span[data-role='tooltip']").mouseout(function () {
        if ($(this).data("kendoTooltip")) {
            $(this).data("kendoTooltip").hide();
        }

        // Reset tooltip if it is for a grid column header
        if (colhdrTooltip !== null && colhdrTooltip.length > 0) {
            $(colhdrTooltip).css("display", "block");
            colhdrTooltip = null;
        }
    });

    // Setup tooltips for grid column headers.  Module must code .HeaderHtmlAttributes(new { @title = "<title content>" }) in their grid columns.
    $(panelId + ".k-grid").each(function () {
        let tooltip = $(this).kendoTooltip({
            filter: "th.k-header[title]",
            position: "top"
        }).data("kendoTooltip");
    });
}

function closeWidgetTooltipsOnBlur(panelId) {
    $(panelId + ":input, " + panelId + "#TxtbxSearch_span, " + panelId + "#TxtbxModeless_span, " + panelId + ".editor-icon.fa-solid.fa-circle-question").blur(function (e) {
        let tooltip = null;
        if (!($(e.relatedTarget).is("#TxtbxSearch_span")) && !($(e.relatedTarget).is("#TxtbxModeless_span"))) {
            // Determine whether the blur is coming from the widget's help icon or the widget itself
            if ($(e.target).hasClass("editor-icon") && $(e.target).hasClass("fa-solid") && $(e.target).hasClass("fa-circle-question")) {
                tooltip = $(e.target).data("kendoTooltip");
                tooltip.hide();
                $(e.target).attr("tabindex", "-1");
            }
            else {
                let widgetEditorField = $(e.target).closest(".editor-field");
                if (widgetEditorField !== null && widgetEditorField.length > 0) {
                    let widgetTooltip = null;
                    if ($(widgetEditorField).hasClass("assoc-box-checkbox")) {
                        widgetTooltip = $(widgetEditorField).find("span.fa-solid.fa-circle-question[data-role='tooltip']");
                    }
                    else {
                        widgetTooltip = $(widgetEditorField).siblings(".editor-label").find("span.fa-solid.fa-circle-question[data-role='tooltip']");
                    }
                    if (widgetTooltip !== null && widgetTooltip.length > 0) {
                        tooltip = $(widgetTooltip).data("kendoTooltip");
                        tooltip.hide();
                    }
                }
            }
        }
    });
}

function formatCommonBlocks(panelId) {
    if (!panelId) {
        panelId = "";
    }

    // display the "required fields" message in both the banner and content well of a panel
    $(panelId + "#reqFieldMsg, div[id^='bnrReqFieldMsg'],  div[class^='bnrReqFieldMsg']").each(function () {
        $(this).replaceWith(buildBnrReqFieldsRow());
    });

    // display the "at least one record is required" message in both the banner and content well of a panel
    $(panelId + "div[class^='bnrOneRecReqMsg']").each(function () {
        $(this).replaceWith(buildBnrOneRecReqRow());
    });

    // display the Expand All | Collapse All links where designated on the page/modal overlay
    $(panelId + "div[id^='expandCollapseLinks'],  div[class^='expandCollapseLinks']").each(function () {
        // determine if this is for a page or modal overlay
        let currentForm = $(this).closest("form");
        let formId;
        let kendoWindow;
        if (currentForm && currentForm.length > 0) {
            formId = currentForm[0].id;
            if (formId) {
                kendoWindow = getModalOverlayWindow(formId);
            }
        }

        if (kendoWindow) {
            $(this).replaceWith(buildExpandCollapseRow(formId));
        }
        else {
            // The following code for the if condition is for the old bootstrap modal windows
            // and can be removed after DS056 is completed by all module teams.
            let modal = $(this).closest("div.modal.panelForm.in");
            if (modal !== null && $(modal).length > 0) {
                $(this).replaceWith(buildExpandCollapseRow(modal[0].id));
            }
            else {
                $(this).replaceWith(buildExpandCollapseRow());
            }
        }
    });
}

// Clear the AAG menu of selected menu items
function clearAAGMenu() {
    $("a").removeClass("aag-menu-item-focus");
}

String.prototype.format = function () {
    let args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};

// Optional text counter for MultiLine widget
function addTextCounter(widgetId, maxLength) {
    let selector = "#" + widgetId;
    let txtCounter = $("div[id^=textCounter]");
    let txtCounterId = txtCounter.length === 0 ? "textCounter" : "textCounter_" + (txtCounter.length + 1);
    if (!$(selector).closest("div").parent().find('div[id^=textCounter]').length) {
        $(selector).closest("div").parent().append("<div id='" + txtCounterId + "' class='text-counter'></div>");

        $(selector).keyup(function () {
            let length = maxLength - $(this).val().length;
            let msg = globalTextCounterStatusMsg.format(maxLength, length);
            $("#" + txtCounterId).text(msg);
        });
    }
}

function resetTextCounter(widgetId) {
    $("#" + widgetId).closest("div").parent().find('div[id^=textCounter]').empty();
}

function reversePanelTabIndex() {
    //This function is used in the Content Panel/Subpanel header to make sure that the tabindex is in the right order (left to right)
    //Loop thru the panels, and fix each one of them
    $(".mcb-panel-hdr-tools, .content-panel-hdr-tools, .content-subpanel-hdr-tools").each(function (i) {
        //First, check that the panel does not have the new div already
        let parentDiv = $(this);
        let elem = $(parentDiv).find("[class*='content-ordered-panel-hdr-tools']");

        if (!elem.length) {
            reverseIndividualPanelTabIndex(parentDiv);
        }

    });
}

function reverseIndividualPanelTabIndex(panel) {
    //Create a new div
    let newDiv = $('<div class = "content-ordered-panel-hdr-tools"></div>').appendTo(panel);
    $(panel).find("[class*='panel-icon']").each(function () {
        let icon = $(this);

        //Different behavior depending on the icon being clicked
        if (icon.children().first().hasClass('fa-xmark') ||
            (icon.children().first().hasClass('fa-angle-up') ||
                icon.children().first().hasClass('fa-angle-down') ||
                icon.children().first().hasClass('fa-circle-question'))) {
            //For close, expand/collapse and first help button, add the index to the icon, not to the div
            icon.children().first().attr('tabindex', 0);
        }
        else {
            //For the second help button, check where to add the tabindex
            if (icon.hasClass('panel-icon-help')) {
                icon.children().first().attr('tabindex', 0);
            }
        }

        //Move it to the div
        let iconDetached = icon.detach();
        iconDetached.prependTo(newDiv);
    });
}

function getWindowWidth() {
    let windowWidth = 0;
    if (typeof (window.innerWidth) == 'number') {
        windowWidth = window.innerWidth;
    }
    else {
        if (document.documentElement && document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        }
        else {
            if (document.body && document.body.clientWidth) {
                windowWidth = document.body.clientWidth;
            }
        }
    }
    return windowWidth;
}

function reconfigureKendoWidgets(panelId) {
    // Add Kendo ".k-widget" class to the input element in a MaskedTextBox or MultiLine Textbox (textarea).  This appears to have
    // been left off by Kendo and ".k-widget" is used as a selector for various processes.
    $(panelId + "input[data-role='maskedtextbox']").each(function () {
        if (!$(this).is("k-widget")) {
            $(this).addClass("k-widget");
        }
    });
    $(panelId + "textarea").each(function () {
        if (!$(this).is("k-widget")) {
            $(this).addClass("k-widget");
        }
    });

    // Add tabindex to make the Kendo WYSIWYG Editor tabbable and show focus
    $(panelId + ".k-widget.k-editor").attr("tabindex", "0");

    //reconfigureDropDownLists(panelId);
    reconfigureListBoxes(panelId);
}

// Rearranges rendered HTML so that the left listbox is rendered before the toolbar.  This will cause the
// left listbox to show focus first when tabbing into the complex ListBox widget, instead of the toolbar (as
// originally designed by Kendo), thus following the tabbing standards for UA3.
function reconfigureListBoxes(panelId) {
    $(panelId + "div.k-content.listbox-section").each(function () {
        let leftSide = $(this).find("div.k-listbox.k-listbox-actions-right");
        let toolbar = $(leftSide).find("div.k-listbox-actions");

        if (toolbar) {
            let divToolbar = $(toolbar).detach();
            $(leftSide).after(divToolbar);
        }
    });
}

//-----------------------------------------------------------------------------------------
// Configure read-only widget functions
//-----------------------------------------------------------------------------------------
function configureReadOnlyControls(panelId) {
    if (!panelId) {
        panelId = "";
    }

    configureReadOnlyAutoCompleteWidgets(panelId);
    configureReadOnlyDropDownListWidgets(panelId);
    configureReadOnlyMultiSelectWidgets(panelId);
    configureReadOnlyPickerWidgets(panelId);
    configureReadOnlyTextboxWidgets(panelId);
    configureReadOnlyNumericTextboxWidgets(panelId);
    configureReadOnlyMaskedTextboxWidgets(panelId);
    configureReadOnlyTextareaWidgets(panelId);
    configureReadOnlyTreeViewWidgets(panelId);
    configureReadOnlyUploadWidgets(panelId);

    configureReadOnlyCheckboxes(panelId);
    configureReadOnlyRadioButtonLists(panelId);
    configureReadOnlySwitches(panelId);
}

function configureReadOnlyAutoCompleteWidgets(panelId) {
    // if any autocomplete widgets on the page are read-only, restyle them.
    $(panelId + " span.k-autocomplete").each(function () {

        let autocompleteWidget = $(this);
        let autocompleteWidgetLabel = $(autocompleteWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let autocompleteWidgetReqIcon = $(autocompleteWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let autocompleteWidgetClearVal = $(autocompleteWidget).find("span.k-clear-value");
        let isReadOnlyAutocomplete = $(autocompleteWidget).find("input[readonly='readonly']").length != 0 || (autocompleteWidgetLabel !== null && $(autocompleteWidgetLabel).length > 0 && $(autocompleteWidgetLabel).is("[readonly]"));

        if (autocompleteWidget !== null && $(autocompleteWidget).length > 0) {
            if (isReadOnlyAutocomplete) {
                // If label has readonly attribute, apply it to the input as well
                if (autocompleteWidgetLabel !== null && $(autocompleteWidgetLabel).length > 0 && $(autocompleteWidgetLabel).is("[readonly]")) {
                    $(autocompleteWidget).find("input").attr("readonly", "readonly");
                }
                // hide the clear icon on a read-only autocomplete widget
                if (autocompleteWidgetClearVal !== null && autocompleteWidgetClearVal.length > 0) {
                    autocompleteWidgetClearVal.addClass("display-none-priority");
                }
                // set control to read-only styles
                $(autocompleteWidget).addClass("readonly-widget");
                if (autocompleteWidgetLabel !== null && $(autocompleteWidgetLabel).length > 0) {
                    $(autocompleteWidgetLabel).addClass('readonly-label');
                    $(autocompleteWidget).attr("aria-labelledby", autocompleteWidgetLabel[0].id);
                }
                if (autocompleteWidgetReqIcon !== null && $(autocompleteWidgetReqIcon).length > 0) {
                    $(autocompleteWidgetLabel).attr("data-req", "true");
                    $(autocompleteWidgetReqIcon).remove();
                }
                $(autocompleteWidget).find("input")
                    .attr("aria-readonly", true)
                    .removeAttr("placeholder")
                    .off('keyup keydown keypress');
            }
            else {
                // show the clear icon on an autocomplete widget
                autocompleteWidgetClearVal.removeClass("display-none-priority");

                // set control back to active styles
                $(autocompleteWidget).removeClass("readonly-widget").on("keyup keydown keypress");
                $(autocompleteWidgetLabel).removeClass("readonly-label");
                if ($(autocompleteWidgetLabel).attr("data-req")) {
                    $(autocompleteWidgetLabel).closest("div.editor-label")
                        .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(autocompleteWidgetLabel).text()) + "' data-role='tooltip'></span>");
                    $(autocompleteWidgetLabel).removeAttr("data-req")
                }
            }
        }
    });
}

function configureReadOnlyDatePickerWidgets(panelId) {
    configureReadOnlyPickerWidgets(panelId);
}

function configureReadOnlyDateTimePickerWidgets(panelId) {
    configureReadOnlyPickerWidgets(panelId);
}

function configureReadOnlyTimePickerWidgets(panelId) {
    configureReadOnlyPickerWidgets(panelId);
}

function configureReadOnlyPickerWidgets(panelId) {
    // if any picker widgets (DatePicker, DateTimePicker, TImePicker) on the page are read-only, restyle them.
    $(panelId + " span.k-datepicker, span.k-datetimepicker, span.k-timepicker").each(function () {
        let pickerWidget = $(this);
        let pickerWidgetButton = $(pickerWidget).find(".k-input-button");
        let pickerWidgetIcon = $(pickerWidget).find(".k-button-icon");
        let pickerWidgetInput = $(pickerWidget).find("input");
        let pickerWidgetInputData = $(pickerWidget).find("input").data("kendoMaskedTextBox");
        let pickerWidgetLabel = $(pickerWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let pickerWidgetReqIcon = $(pickerWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let isLabelReadonly = pickerWidgetLabel !== null && $(pickerWidgetLabel).length > 0 && $(pickerWidgetLabel).is("[readonly]");
        let isReadOnlyPicker = $(pickerWidget).find('input[readonly="readonly"]').length != 0 || isLabelReadonly;

        if (isReadOnlyPicker) {
            // If label has readonly attribute, apply it to the input as well
            if (isLabelReadonly) {
                $(pickerWidget).find("input").attr("readonly", "readonly");
            }
            // set widget to read-only styles
            if (pickerWidget !== null && $(pickerWidget).length > 0) {
                if ($(pickerWidget).find("input").length > 0) {
                    $(pickerWidget).find("input").addClass("readonly-widget");
                }
                else {
                    $(pickerWidget).addClass("readonly-widget");
                }
            }
            if (pickerWidgetLabel !== null && $(pickerWidgetLabel).length > 0) {
                pickerWidgetLabel.addClass("readonly-label");
            }
            if (pickerWidgetReqIcon !== null && $(pickerWidgetReqIcon).length > 0) {
                $(pickerWidgetLabel).attr("data-req", "true");
                $(pickerWidgetReqIcon).remove();
            }

            // change background/border color of picker icon
            if ($(pickerWidget) !== null && $(pickerWidget).length > 0) {
                $(pickerWidget).addClass("readonly-bkgrnd-color").attr("style", "padding: 0");  // This inline style must remain to work properly
            }

            // hide picker icon
            if ($(pickerWidgetButton) !== null && $(pickerWidgetButton).length > 0) {
                $(pickerWidgetButton).addClass("display-none-priority readonly-bkgrnd-color").attr("tabindex", "-1");
            }

            // hide icon cursor
            if ($(pickerWidgetIcon) !== null && $(pickerWidgetIcon).length > 0) {
                $(pickerWidgetIcon).addClass("readonly-cursor display-none-priority");
            }
            if (pickerWidgetInputData) {
                $(pickerWidgetInputData).readonly(true);
            }
        }
        else {
            // set widget back to active styles
            $(pickerWidget).removeClass("readonly-widget");
            $(pickerWidgetInput).removeClass("readonly-widget");
            $(pickerWidgetLabel).removeClass("readonly-label");
            if ($(pickerWidgetLabel).attr("data-req")) {
                $(pickerWidgetLabel).closest("div.editor-label")
                    .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(pickerWidgetLabel).text()) + "' data-role='tooltip'></span>");
                $(pickerWidgetLabel).removeAttr("data-req")
            }

            // reset background color of picker icon
            $(pickerWidget).removeClass("readonly-bkgrnd-color").removeAttr("style", "padding");

            // show picker icon
            $(pickerWidgetButton).removeClass("display-none-priority readonly-bkgrnd-color").attr("tabindex", "0");

            // enable icon cursor
            $(pickerWidgetIcon).removeClass("readonly-cursor display-none-priority");

            if (pickerWidgetInputData) {
                $(pickerWidgetInputData).readonly(false);
            }
        }

        // Add visible focus to DatePicker widget (not supported by Kendo)
        if ((pickerWidgetInput.length > 0) && $(pickerWidget).hasClass("readonly-widget")) {
            let idName = $(pickerWidgetInput).attr('id');
            if (idName.length > 0) {
                let idContainer = $('#' + idName).closest("div.editor-field").find(".k-input");
                $('#' + idName).focus(function () {
                    if (idContainer !== null && idContainer.length > 0) {
                        $(idContainer).addClass("readonly-datepicker-focus");
                    }

                    // This must be an inline style to override the input[readonly="readonly"] !important class property.
                    $('#' + idName).attr("style", "background-color: transparent !important");
                });

                $('#' + idName).blur(function () {
                    if (idContainer !== null && idContainer.length > 0) {
                        $(idContainer).removeClass("readonly-datepicker-focus");
                    }

                    // This must be an inline style to override the input[readonly="readonly"] !important class property.
                    $('#' + idName).find("input").removeAttr("style", "background-color");
                });
            }
        }
    });
}

function configureReadOnlyDropDownListWidgets(panelId) {
    let readOnlyDropdownSelector = (panelId && panelId.length > 0 ? panelId + " " : "") + "span.k-dropdownlist";
    let readOnlyDrpDwns = document.querySelectorAll(readOnlyDropdownSelector);
    readOnlyDrpDwns.forEach(function (dropdown) {
        let dropdownWidget = $(dropdown);
        let dropdownWidgetIcon = $(dropdownWidget).find(".k-button-icon");
        let dropdownWidgetLabel = $(dropdownWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let dropdownWidgetInput = $(dropdownWidget).parent().parent().closest("input.editor-control");
        let dropdownWidgetReqIcon = $(dropdownWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let dropdownInput = $(dropdownWidget).find("input.editor-control");
        let isReadOnlyDropdown = dropdownInput.is("[readonly]") || (dropdownWidgetLabel !== null && $(dropdownWidgetLabel).length > 0 && $(dropdownWidgetLabel).is("[readonly]"));

        if (dropdownWidget !== null && $(dropdownWidget).length > 0) {
            if (isReadOnlyDropdown) {
                // If label has readonly attribute, apply it to the input as well
                if (dropdownWidgetLabel !== null && $(dropdownWidgetLabel).length > 0 && $(dropdownWidgetLabel).is("[readonly]")) {
                    $(dropdownInput).attr("readonly", "readonly");
                }
                if ($(dropdownWidgetIcon) !== null && $(dropdownWidgetIcon).length > 0) {
                    $(dropdownWidgetIcon).addClass("display-none-priority");
                }
                $(dropdownWidget).off("keydown.readonlyDropdown").on("keydown.readonlyDropdown", function (e) {
                    if (e.which === 32 || (e.which >= 37 && e.which <= 40)) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });

                $(dropdownWidget).addClass("readonly-widget readonly-cursor");
                if (dropdownWidgetReqIcon !== null && $(dropdownWidgetReqIcon).length > 0) {
                    $(dropdownWidgetLabel).attr("data-req", true);
                    $(dropdownWidgetReqIcon).remove();
                }
                if (dropdownWidgetLabel !== null && $(dropdownWidgetLabel).length > 0) {
                    $(dropdownWidgetLabel).addClass("readonly-label");
                    $(dropdownWidgetInput).attr("aria-labelledby", dropdownWidgetLabel[0].id);
                }
                if ($(dropdownWidget).find("span.k-input-inner").length > 0) {
                    if ($(dropdownWidget).find("span.k-input-inner").text() === globalOptionLabelText) {
                        $(dropdownWidget).find("span.k-input-inner").addClass("display-none");
                    }
                    else {
                        $(dropdownWidget).find("span.k-input-inner").addClass("readonly-widget");
                    }
                }
            }
            else {
                // set control back to active styles
                $(dropdownWidget).off("keydown.readonlyDropdown");
                $(dropdownWidget).removeClass("readonly-widget readonly-cursor");
                $(dropdownWidgetIcon).removeClass("display-none-priority");
                $(dropdownWidgetLabel).removeClass("readonly-label");
                $(dropdownWidget).find("span.k-input-inner").removeClass("display-none").removeClass("readonly-widget");
                if ($(dropdownWidgetLabel).attr("data-req")) {
                    $(dropdownWidgetLabel).closest("div.editor-label")
                        .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(dropdownWidgetLabel).text()) + "' data-role='tooltip'></span>");
                    $(dropdownWidgetLabel).removeAttr("data-req")
                }
                $(dropdownWidget).find("span.k-input-inner").removeClass("display-none").removeClass("readonly-widget");
            }
        }
    });
}

function configureReadOnlyMultiSelectWidgets(panelId) {
    // if any multiselect widgets on the page are read-only, restyle them.
    $(panelId + " span.k-multiselect").each(function () {

        let multiselectWidget = $(this);
        let multiselectLabel = $(multiselectWidget).closest("div.editor-field").siblings("div.editor-label").find("label");
        let multiselectReqIcon = $(multiselectWidget).closest("div.editor-field").siblings("div.editor-label").find("span.editor-req-field");
        let multiselectClearIcon = $(multiselectWidget).find("span.k-clear-value");
        let isReadOnlyMultiselect = $(multiselectWidget).find("input[readonly='readonly']").length != 0 || (multiselectLabel !== null && $(multiselectLabel).length > 0 && $(multiselectLabel).is("[readonly]"));

        if (multiselectWidget !== null && $(multiselectWidget).length > 0) {
            if (isReadOnlyMultiselect) {
                // If label has readonly attribute, apply it to the input as well
                if (multiselectLabel !== null && $(multiselectLabel).length > 0 && $(multiselectLabel).is("[readonly]")) {
                    $(multiselectWidget).find("input").attr("readonly", "readonly");
                }
                // set widget to read-only styles
                $(multiselectWidget).addClass("readonly-widget").attr("tabindex", "0");
                $(multiselectWidget).find("select").css("display", "none");

                // hide the clear icon on a read-only multiselect control
                if (multiselectClearIcon !== null && multiselectClearIcon.length > 0) {
                    multiselectClearIcon.addClass("display-none-priority");
                }

                // adjust cursor and hide button close icons
                $(multiselectWidget).find("div.k-chip").addClass("readonly-cursor").addClass("readonly-multiselect-button");
                $(multiselectWidget).find("div.k-chip span.k-chip-action").addClass("display-none-priority");
                $(multiselectWidget).find("input.k-input-inner").attr("tabindex", "-1").addClass("display-none");

                if (multiselectLabel !== null && $(multiselectLabel).length > 0) {
                    $(multiselectLabel).addClass("readonly-label");
                }
                if (multiselectReqIcon !== null && $(multiselectReqIcon).length > 0) {
                    $(multiselectLabel).attr("data-req", "true");
                    $(multiselectReqIcon).remove();
                }

                if ($(this).prev().next().val() === globalOptionLabelText) {
                    $(this).prev().next().val('');
                }
            }
            else {
                // set widget back to active styles
                $(multiselectWidget).removeClass("readonly-widget").removeAttr("tabindex");
                $(multiselectWidget).find("select").css("display", "none");

                // show the clear icon on an multiselect control
                $(multiselectClearIcon).removeClass("display-none-priority");

                // adjust cursor and show button close icons
                $(multiselectWidget).find("div.k-chip").removeClass("readonly-cursor").removeClass("readonly-multiselect-button");
                $(multiselectWidget).find("div.k-chip span.k-chip-action").removeClass("display-none-priority");
                $(multiselectWidget).find("input.k-input-inner").removeAttr("tabindex").removeClass("display-none");
                if (multiselectLabel.length > 0) {
                    $(multiselectWidget).find("input.k-input-inner").attr("aria-labelledby", multiselectLabel[0].id);
                }
                $(multiselectLabel).removeClass("readonly-label");
                if ($(multiselectLabel).attr("data-req")) {
                    $(multiselectLabel).closest("div.editor-label")
                        .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(multiselectLabel).text()) + "' data-role='tooltip'></span>");
                    $(multiselectLabel).removeAttr("data-req")
                }
            }
        }
    });
}

function configureReadOnlyTextboxWidgets(panelId) {
    // if any standard textbox widgets on the page are read-only, restyle them.
    $(panelId + " span.k-textbox").each(function () {
        let textboxWidget = $(this);
        let textboxLabel = $(textboxWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let textboxReqIcon = $(textboxWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let isReadOnlyTextbox = $(textboxWidget).find("input[readonly='readonly']").length != 0 || (textboxLabel !== null && $(textboxLabel).length > 0 && $(textboxLabel).is("[readonly]"));

        if (textboxWidget !== null && $(textboxWidget).length > 0) {
            if (isReadOnlyTextbox) {
                // If label has readonly attribute, apply it to the input as well
                if (textboxLabel !== null && $(textboxLabel).length > 0 && $(textboxLabel).is("[readonly]")) {
                    $(textboxWidget).find("input").attr("readonly", "readonly");
                }
                // set control to read-only styles (styles for the widget are in CSS)
                if (textboxLabel !== null && $(textboxLabel).length > 0) {
                    $(textboxLabel).addClass("readonly-label");
                }
                if (textboxReqIcon !== null && $(textboxReqIcon).length > 0) {
                    $(textboxLabel).attr("data-req", "true");
                    $(textboxReqIcon).remove();
                }
                if ($(textboxWidget).find("input").length > 0) {
                    $(textboxWidget).find("input").addClass("readonly-widget").removeClass("k-no-click");
                    $(textboxWidget).find("input").parent(".k-textbox.k-input").addClass("readonly-widget");
                }
                else {
                    $(textboxWidget).addClass("readonly-widget").removeClass("k-no-click");
                }
            }
            else {
                // set widget back to active styles
                $(textboxLabel).removeClass("readonly-label");
                if ($(textboxLabel).attr("data-req")) {
                    $(textboxLabel).closest("div.editor-label")
                        .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(textboxLabel).text()) + "' data-role='tooltip'></span>");
                    $(textboxLabel).removeAttr("data-req")
                }
                $(textboxWidget).removeClass("readonly-widget");
                $(textboxWidget).find("input").removeClass("readonly-widget");
            }
        }

        // Add visible focus to Textbox widget (not supported by Kendo)
        setReadOnlyTextboxFocus(textboxWidget);
    });
}

function configureReadOnlyNumericTextboxWidgets(panelId) {
    // if any numeric textbox widgets on the page are read-only, restyle them.
    $(panelId + " span.k-numerictextbox").each(function () {
        let numTextboxInput1 = null;
        let numTextboxInput2 = null;
        let numTextboxLabel = $(this).closest("div.editor-field").parent("div").find("div.editor-label label");
        let numTextboxReqIcon = $(this).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let numTextboxWrap = $(this);
        let isLabelReadonly = numTextboxLabel !== null && $(numTextboxLabel).length > 0 && $(numTextboxLabel).is("[readonly]");

        $(this).find('input').each(function (i) {
            // Numeric textbox contains 2 input tags, with the first acting like a container.  The widget's styles and read-only
            // designation are handled in different inputs, so must parse through to properly set things up for readonly;
            if (i == 0) {
                numTextboxInput1 = $(this);
            }
            else {
                numTextboxInput2 = $(this);
                let isReadOnlyNumeric = ($(numTextboxInput2).attr('readonly') && $(numTextboxInput2).attr('readonly') === 'readonly') || isLabelReadonly;
                if (isReadOnlyNumeric) {
                    // If label has readonly attribute, apply it to the input as well
                    if (isLabelReadonly) {
                        $(numTextboxInput2).attr("readonly", "readonly");
                    }
                    // set widget to read-only styles
                    $(numTextboxWrap).addClass('readonly-widget');
                    $(numTextboxInput1).addClass('readonly-widget');
                    if (numTextboxLabel !== null && $(numTextboxLabel).length > 0) {
                        $(numTextboxLabel).addClass('readonly-label');
                        $(numTextboxInput1).attr("aria-labelledby", numTextboxLabel[0].id);
                        $(numTextboxInput2).attr("aria-labelledby", numTextboxLabel[0].id);
                    }
                    if (numTextboxReqIcon !== null && $(numTextboxReqIcon).length > 0) {
                        $(numTextboxLabel).attr("data-req", "true");
                        $(numTextboxReqIcon).remove();
                    }
                }
                else {
                    // set widget back to active styles
                    $(numTextboxWrap).removeClass('readonly-widget');
                    $(numTextboxInput1).removeClass('readonly-widget');
                    $(numTextboxLabel).removeClass('readonly-label');
                    if ($(numTextboxLabel).attr("data-req")) {
                        $(numTextboxLabel).closest("div.editor-label")
                            .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(numTextboxLabel).text()) + "' data-role='tooltip'></span>");
                        $(numTextboxLabel).removeAttr("data-req")
                    }
                    if (numTextboxLabel !== null && $(numTextboxLabel).length > 0) {
                        $(numTextboxInput1).attr("aria-labelledby", numTextboxLabel[0].id);
                    }
                }
            }
        });
    });
}

function configureReadOnlyMaskedTextboxWidgets(panelId) {
    // if any masked textbox widgets on the page are read-only, restyle them.
    $(panelId + ' span.k-maskedtextbox').each(function () {

        let maskedtextboxWidget = $(this);
        let maskedtextboxLabel = $(maskedtextboxWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let maskedtextboxReqIcon = $(maskedtextboxWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let isLabelReadonly = maskedtextboxLabel !== null && $(maskedtextboxLabel).length > 0 && $(maskedtextboxLabel).is("[readonly]");

        if (maskedtextboxWidget !== null && $(maskedtextboxWidget).length > 0) {
            let readOnlyInput = $(maskedtextboxWidget).find("input[readonly='readonly']")
            let isReadOnlyMasked = (($(readOnlyInput).length != 0) && ($(readOnlyInput).hasClass("readonly-widget"))) || isLabelReadonly;
            if (isReadOnlyMasked) {
                // If label has readonly attribute, apply it to the input as well
                if (isLabelReadonly) {
                    $(maskedtextboxWidget).find("input").attr("readonly", "readonly").addClass("readonly-widget");
                }
                // set widget to read-only styles (styles for the widget are in CSS)
                if (maskedtextboxLabel !== null && $(maskedtextboxLabel).length > 0) {
                    $(maskedtextboxLabel).addClass("readonly-label");
                    $(maskedtextboxWidget).attr("aria-labelledby", maskedtextboxLabel[0].id);
                }
                if (maskedtextboxReqIcon !== null && $(maskedtextboxReqIcon).length > 0) {
                    $(maskedtextboxLabel).attr("data-req", "true");
                    $(maskedtextboxReqIcon).remove();
                }
                if ($(maskedtextboxWidget).find(".k-input-inner").length > 0) {
                    $(maskedtextboxWidget).find(".k-input-inner").addClass("readonly-widget");
                    $(maskedtextboxWidget).addClass("readonly-widget");
                }
                else {
                    $(maskedtextboxWidget).addClass("readonly-widget");
                }
            }
            else {
                // set widget back to active styles
                $(maskedtextboxLabel).removeClass("readonly-label");
                if ($(maskedtextboxLabel).attr("data-req")) {
                    $(maskedtextboxLabel).closest("div.editor-label")
                        .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(maskedtextboxLabel).text()) + "' data-role='tooltip'></span>");
                    $(maskedtextboxLabel).removeAttr("data-req")
                }
                $(maskedtextboxWidget).find(".k-input-inner").removeClass("readonly-widget");
                $(maskedtextboxWidget).removeClass("readonly-widget");
            }
        }
    });
}

function configureReadOnlyTextareaWidgets(panelId) {
    // if any standard textarea widgets on the page are read-only, restyle them.
    $(panelId + " textarea.k-textbox").each(function () {

        let textareaWidget = $(this);
        let textareaLabel = $(textareaWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let textareaReqIcon = $(textareaWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");

        if ($(textareaWidget).attr("readonly") && $(textareaWidget).attr("readonly") === "readonly") {
            // set widget to read-only styles
            $(textareaWidget).addClass("readonly-widget");
            // set widget to read-only styles
            if (textareaLabel !== null && $(textareaLabel).length > 0) {
                $(textareaLabel).addClass("readonly-label");
            }
            if (textareaReqIcon !== null && $(textareaReqIcon).length > 0) {
                $(textareaLabel).attr("data-req", "true");
                $(textareaReqIcon).remove();
            }
        }
        else {
            // set widget back to active styles
            $(textareaWidget).removeClass("readonly-widget");
            $(textareaLabel).removeClass("readonly-label");
            if ($(textareaLabel).attr("data-req")) {
                $(textareaLabel).closest("div.editor-label")
                    .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(textareaLabel).text()) + "' data-role='tooltip'></span>");
                $(textareaLabel).removeAttr("data-req")
            }
        }
    });
}

function configureReadOnlyTreeViewWidgets(panelId) {
    // if any treeview widgets on the page have checkboxes, restyle them.
    $(panelId + " div.k-treeview").each(function () {

        let treeviewWidget = $(this);
        //Future enhancement
    });
}

function configureReadOnlyUploadWidgets(panelId) {
    // if any upload widgets on the page are disabled (read-only), restyle them.
    $(panelId + " div.k-upload").each(function () {

        let uploadWidget = $(this);
        let uploadWidgetLabel = $(uploadWidget).closest("div.editor-field").parent("div").find("div.editor-label label");
        let uploadWidgetReqIcon = $(uploadWidget).closest("div.editor-field").parent("div").find("div.editor-label span.editor-req-field");
        let uploadWidgetSelectButton = $(uploadWidget).find("div.k-button.k-upload-button");
        let uploadWidgetDropzone = $(uploadWidget).find("div.k-dropzone");

        if ($(uploadWidget).hasClass("k-disabled") && !($(uploadWidget).hasClass("readonly-widget"))) {
            if (uploadWidgetSelectButton !== null && $(uploadWidgetSelectButton).length > 0) {
                $(uploadWidgetSelectButton).addClass("display-none-priority");
            }
            $(uploadWidget).addClass("readonly-widget");
            if ($(uploadWidget).find("p.readonly-upload-empty-msg").length == 0) {
                if ($(uploadWidget).hasClass("k-upload-empty")) {
                    $("<p id='emptyMsg' class='paragraph-text readonly-upload-empty-msg'>" + upldCntrlNoFilesMsg + "</p>").insertAfter(uploadWidgetSelectButton);
                    $(uploadWidget).removeClass("display-none");
                }
                else {
                    $(uploadWidgetDropzone).addClass("display-none");
                }
            }
            // set widget to read-only styles
            if (uploadWidgetLabel !== null && $(uploadWidgetLabel).length > 0) {
                $(uploadWidgetLabel).addClass("readonly-label");
            }
            if (uploadWidgetReqIcon !== null && $(uploadWidgetReqIcon).length > 0) {
                $(uploadWidgetLabel).attr("data-req", "true");
                $(uploadWidgetReqIcon).remove();
            }
            $(uploadWidget).addClass("readonly-bkgrnd-color");
            $(uploadWidget).find(".k-upload-files").addClass("readonly-bkgrnd-color");

            // Add tabindex to make the Kendo upload widget tabbable and show focus when in read-only state
            $(uploadWidget).attr("tabindex", "0");

            $(uploadWidget).find("ul.k-upload-files > li.k-file").each(function () {
                $(this).addClass("readonly-upload-file-area-container");
                $(this).find(".k-file-extension").addClass("readonly-upload-file-area-content");
                $(this).find(".k-file-name").addClass("readonly-upload-file-area-content");
                $(this).find(".k-file-size").addClass("readonly-upload-file-area-content");

                // hide all remove icons
                $(this).find("button.k-button.k-upload-action").addClass("display-none-priority");
            });
        }
        else {
            if ($(uploadWidget).hasClass("k-upload-empty")) {
                $("#emptyMsg").remove();
            }
            else {
                $(uploadWidgetDropzone).removeClass("display-none");
            }

            // set widget back to active styles
            $(uploadWidgetSelectButton).removeClass("display-none-priority");
            $(uploadWidget).removeClass("readonly-widget");
            $(uploadWidgetLabel).removeClass("readonly-label");
            if ($(uploadWidgetLabel).attr("data-req")) {
                $(uploadWidgetLabel).closest("div.editor-label")
                    .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(uploadWidgetLabel).text()) + "' data-role='tooltip'></span>");
                $(uploadWidgetLabel).removeAttr("data-req")
            }
            $(uploadWidget).removeClass("readonly-bkgrnd-color");
            $(uploadWidget).find(".k-upload-files").removeClass("readonly-bkgrnd-color");
            $(uploadWidget).attr("tabindex", "-1");

            // show all remove icons
            $(uploadWidget).find("ul.k-upload-files > li.k-file").each(function () {
                $(this).removeClass("readonly-upload-file-area-container");
                $(this).find(".k-file-extension").removeClass("readonly-upload-file-area-content");
                $(this).find(".k-file-name").removeClass("readonly-upload-file-area-content");
                $(this).find(".k-file-size").removeClass("readonly-upload-file-area-content");
                $(this).find("button.k-button.k-upload-action").removeClass("display-none-priority");
            });
        }
    });
}

function configureReadOnlyCheckboxes(panelId) {
    // if any individual checkboxes on the page are read-only, restyle them.
    $(panelId + " div.assoc-box-checkbox").each(function () {
        let chkbxContainer = $(this);
        let chkbxWidget = $(chkbxContainer).find("input.k-checkbox");
        let chkbxLabel = $(chkbxContainer).find("label.k-checkbox-label");
        let chkbxWidgetLabel = $(chkbxContainer).siblings("div.editor-label").find("label");
        let chkbxWidgetReqIcon = $(chkbxContainer).find("span.editor-req-field");
        let chkbxTooltip = $(chkbxWidget).siblings("span.editor-icon");
        let tooltipId;

        $(chkbxContainer).find('input.readonly-k-checkbox-label').remove();

        if ($(chkbxWidget).attr("readonly") && $(chkbxWidget).attr("readonly") == "readonly") {
            $(chkbxWidgetLabel).text(chkbxLabel.text());
            $(chkbxWidgetLabel).attr("readonly", "readonly");
            if ($(chkbxWidget).is(":checked")) {
                $("<input>", {
                    "class": "readonly-k-checkbox-label",
                    "aria-label": chkbxLabel.text(),
                    value: globalYes,
                    readonly: "readonly"
                }).insertAfter(chkbxLabel);
            }
            else {
                $("<input>", {
                    "class": "readonly-k-checkbox-label",
                    "aria-label": chkbxLabel.text(),
                    value: globalNo,
                    readonly: "readonly"
                }).insertAfter(chkbxLabel);
            }
            $(chkbxTooltip).clone().insertAfter(chkbxWidgetLabel).tooltip();

            tooltipId = $(chkbxTooltip).attr("id");
            $(chkbxTooltip).attr("data-id", tooltipId).removeAttr("id");
            $(chkbxTooltip).addClass("display-none");
            $(chkbxLabel).addClass("display-none-priority");
            $(chkbxWidget).addClass("display-none-priority");
            $(chkbxContainer).attr("tabindex", 0);
            $(chkbxContainer).addClass("readonly-widget");
            if (chkbxWidgetReqIcon !== null && $(chkbxWidgetReqIcon).length > 0) {
                $(chkbxWidgetLabel).attr("data-req", "true");
                $(chkbxWidgetReqIcon).remove();
            }
        }
        else {
            $(chkbxWidgetLabel).html("&nbsp;");
            $(chkbxWidgetLabel).removeAttr("readonly");
            tooltipId = $(chkbxTooltip).attr("data-id");
            if ($("#" + tooltipId)) {
                $("#" + tooltipId).attr("data-id", tooltipId).removeAttr("id");
                $(chkbxTooltip).attr("id", tooltipId).removeAttr("data-id");
            }
            $(chkbxTooltip).removeClass("display-none");
            $(chkbxLabel).removeClass("display-none-priority");
            $(chkbxWidget).removeClass("display-none-priority");
            $(chkbxContainer).siblings("div.editor-label").find("span.editor-icon").remove();
            $(chkbxContainer).removeAttr("tabindex");
            $(chkbxContainer).removeClass("readonly-widget");
            if ($(chkbxLabel).attr("data-req")) {
                $(chkbxLabel).closest("div.editor-label")
                    .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(chkbxLabel).text()) + "' data-role='tooltip'></span>");
                $(chkbxLabel).removeAttr("data-req")
            }
        }
    });
}

function configureReadOnlyRadioButtonLists(panelId) {
    // if any horizontal radio button lists on the page are read-only, restyle them.
    $(panelId + ' div.assoc-box-radio-btn-list-horz').each(function () {
        styleReadonlyButtonList($(this));
    });

    // if any vertical radio button lists on the page are read-only, restyle them.
    $(panelId + ' div.assoc-box-radio-btn-list-vert').each(function () {
        styleReadonlyButtonList($(this));
    });
}

function styleReadonlyButtonList(btnList) {

    let btnListLabel = $(btnList).closest('div.editor-field').parent('div').find('div.editor-label label');
    let btnListReqIcon = $(btnListLabel).siblings("span.editor-req-field");
    let btnListROLabel;
    let btnId;
    let btnLabel;
    let btnListIsChecked;
    let selectedBtnLabel;

    if (btnList !== null && $(btnList).length > 0) {
        // If at least one radio button is marked as read-only, the entire list will be treated as read-only.
        let roCntr = $(btnList).find("input.k-radio[readonly='readonly']");

        if (roCntr.length > 0) {
            if (!$(btnList).hasClass("readonly-widget")) {
                // set widget to read-only styles (styles for the widget are in CSS)
                if (btnListLabel !== null && $(btnListLabel).length > 0) {
                    $(btnListLabel).addClass("readonly-label");
                }
                if (btnListReqIcon !== null && $(btnListReqIcon).length > 0) {
                    $(btnListReqIcon).remove();
                }
                $(btnList).addClass("readonly-widget");
                $(btnList).attr("tabindex", "0");

                btnListIsChecked = false;
                $(btnList).find(".list-item").each(function () {
                    if ($(this).find("input").prop("checked")) {
                        btnId = $(this).find('input').attr('id');
                        btnLabel = $(this).find("label[for='" + btnId + "']");
                        btnList.append("<label class='readonly-k-radio-label'>" + btnLabel.text() + "</label>");
                        btnListIsChecked = true;
                    }
                    $(this).addClass("display-none-priority");
                });
                if (!btnListIsChecked) {
                    if (btnListLabel !== null && $(btnListLabel).length > 0) {
                        selectedBtnLabel = btnListLabel.text();
                    }
                    else {
                        selectedBtnLabel = "???";
                    }
                    btnList.append("<label class='readonly-k-radio-label'>" + globalUnselectedRadioBtnList.replace("{0}", selectedBtnLabel) + "</label>");
                }
                $(roCntr).parents('ul').addClass("display-none");
            }
        }
        else {
            // set widget back to active styles
            $(btnList).find(".list-item").each(function () {
                $(this).removeClass("display-none-priority");
            });
            $(btnList).closest("div.editor-field").find("ul").removeClass("display-none");
            $(btnListLabel).removeClass("readonly-label");
            if ($(btnListLabel).attr("data-req")) {
                $(btnListLabel).closest("div.editor-label")
                    .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(btnListLabel).text()) + "' data-role='tooltip'></span>");
                $(btnListLabel).removeAttr("data-req")
            }
            $(btnList).removeClass("readonly-widget");
            $(btnList).removeAttr("contenteditable");
            btnListROLabel = $(btnList).find("label.readonly-k-radio-label");
            if (btnListROLabel.length > 0) {
                $(btnListROLabel).remove();
            }
        }
    }
}

function configureReadOnlySwitches(panelId) {
    // if any individual switches on the page are read-only, restyle them.
    $(panelId + " div.assoc-box-switch").each(function () {

        let switchContainer = $(this);
        let switchWidget = $(switchContainer).find("span.k-switch");
        let switchLabel = $(switchContainer).find("label");
        let switchWidgetLabel = $(switchContainer).siblings("div.editor-label").find("label");
        let switchWidgetReqIcon = $(switchContainer).find("span.editor-req-field");
        let switchTooltip = $(switchWidget).siblings("span.editor-icon");
        let tooltipId;
        let switchInstance = $(switchWidget).find("input").data("kendoSwitch");

        $(switchContainer).find('input.readonly-k-switch-label').remove();

        if ($(switchWidget).attr("readonly") && $(switchWidget).attr("readonly") == "readonly") {
            $(switchWidgetLabel).text(switchLabel.text());
            $(switchWidgetLabel).attr("readonly", "readonly");
            if (switchInstance.check()) {
                $("<input class='readonly-k-switch-label' aria-label='" + switchLabel.text() + "' value='" + globalYes + "' readonly='readonly' tabindex='-1' />").insertAfter(switchLabel);
            }
            else {
                $("<input class='readonly-k-switch-label' aria-label='" + switchLabel.text() + "' value='" + globalNo + "' readonly='readonly' tabindex='-1' />").insertAfter(switchLabel);
            }
            $(switchTooltip).clone().insertAfter(switchWidgetLabel).tooltip();

            tooltipId = $(switchTooltip).attr("id");
            $(switchTooltip).attr("data-id", tooltipId).removeAttr("id");
            $(switchTooltip).addClass("display-none");
            $(switchLabel).addClass("display-none-priority");
            $(switchWidget).addClass("display-none-priority");
            $(switchContainer).attr("tabindex", 0);
            $(switchContainer).addClass("readonly-widget");
            if (switchWidgetReqIcon !== null && $(switchWidgetReqIcon).length > 0) {
                $(switchWidgetReqIcon).remove();
            }
        }
        else {
            $(switchWidgetLabel).html("&nbsp;");
            $(switchWidgetLabel).removeAttr("readonly");
            tooltipId = $(switchTooltip).attr("data-id");
            if ($("#" + tooltipId)) {
                $("#" + tooltipId).attr("data-id", tooltipId).removeAttr("id");
                $(switchTooltip).attr("id", tooltipId).removeAttr("data-id");
            }
            $(switchTooltip).removeClass("display-none");
            $(switchLabel).removeClass("display-none-priority");
            $(switchWidget).removeClass("display-none-priority");
            $(switchContainer).siblings("div.editor-label").find("span.editor-icon").remove();
            $(switchContainer).removeAttr("tabindex");
            $(switchContainer).removeClass("readonly-widget");
            if ($(switchLabel).attr("data-req")) {
                $(switchLabel).closest("div.editor-label")
                    .prepend("<span class='clickable editor-req-field fa-solid fa-asterisk' title='" + globalValidationRequiredFieldMsg.format($(switchLabel).text()) + "' data-role='tooltip'></span>");
                $(switchLabel).removeAttr("data-req")
            }
        }
    });
}

function setReadOnlyTextboxFocus(textboxWidget) {
    let widgetInput = $(textboxWidget).find("input[readonly='readonly']");

    if (widgetInput !== null && widgetInput.length > 0) {
        let widgetId = $(widgetInput).attr("id");
        if (widgetId !== null && widgetId.length > 0) {
            $('#' + widgetId).focus(function () {
                $(this).closest("span.k-textbox.readonly-widget").addClass("readonly-widget-focus");
            });

            $('#' + widgetId).blur(function () {
                $(this).closest("span.k-textbox.readonly-widget").removeClass("readonly-widget-focus");
            });
        }
    }
}

function positionModelessWindow(tabID, windowID, side) {
    let modelessWindow;
    let windowSide = side || "right";
    if (windowSide !== "right") {
        windowSide = "left";
    }

    // toggle modeless window and position it
    if ($(windowID).closest('.k-window').css('display') == 'none') {
        adjustModelessWindowTabOnOpen(tabID);

        modelessWindow = $(windowID).data('kendoWindow');
        modelessWindow.open();

        // display modeless window on right side of tab (default)
        if (windowSide == "right") {
            $(windowID).closest('.k-window').css({
                'top': $(tabID).offset().top,
                'left': $(tabID).offset().left + $(tabID).outerWidth() + 10,
                'z-index': parseInt($('.body-well .header').css('z-index')) - 1
            });
        }
        else {
            // display modeless window on left side of tab
            $(windowID).closest('.k-window').css({
                'top': $(tabID).offset().top,
                'left': $(tabID).offset().left - $(windowID).outerWidth() - 10,
                'width': $(windowID).outerWidth(),
                'z-index': parseInt($('.body-well .header').css('z-index')) - 1
            });
        }
    }
    else {
        adjustModelessWindowTabOnClose(tabID);

        modelessWindow = $(windowID).data('kendoWindow');
        modelessWindow.close();
    }
}

function adjustModelessWindowTabOnClose(tabID) {
    $(tabID).find('i.fa-solid.fa-chevron-left').removeClass('fa-chevron-left').addClass('fa-chevron-right');
}

function adjustModelessWindowTabOnOpen(tabID) {
    $(tabID).find('i.fa-solid.fa-chevron-right').removeClass('fa-chevron-right').addClass('fa-chevron-left');
}

//-----------------------------------------------------------------------------------------
// Display Panel Form functions
//-----------------------------------------------------------------------------------------
function CheckForClientAction(data, status, xhr, callback) {
    if (data.startsWith("<html><header><meta clientAction")) {
        let parts = data.split(':');
        if (parts.length === 4) {
            switch (parts[1]) {
                case 'Redirect':
                    window.location = parts[2];
                    break;
            }
        }
    }
    else if (callback !== undefined) {
        callback(data, status, xhr);
    }
}

//-----------------------------------------------------------------------------------------
// Kendo Modal Window functions
//-----------------------------------------------------------------------------------------

// Opens a Kendo modal window, loads it and associates it with a draggable area.
function openModalOverlay(panelId, url, cssClass, height, data, callbackFunction, dateProperties) {
    showLoadingDialog();
    prevFocusControl = document.activeElement;

    // If the current overlay is already open (or trying to open) close the open one and keep going to open the new one.
    let prevDialog = $('#' + panelId);
    if (prevDialog.length) {
        let kendoWindow = prevDialog.data("kendoWindow");
        // The if condition below tests to make sure the kendo wrapper exists and the draggable element has been fully
        // initialized before attempting to close the kendo window and associated draggable object.  This might occur if
        // the openModalOverlay function gets called multiple times in succession.  If the wrapper and draggable objects exist
        // it will close the Kendo window before opening another Kendo window.  Otherwise, it will skip trying to open another window.
        if (kendoWindow && kendoWindow.wrapper && kendoWindow.wrapper.is(':data(ui-draggable)')) {
            closeModalOverlay(panelId);
        }
        else {
            return;
        }
    }

    let contentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let maxOverlayHeight = contentHeight * .85; // Max overlay height is 85% of browser content height.
    let panelContentId = panelId + "_content";
    let panelBodyId = panelId + "_body";
    let panelModalContainment = panelId + "_modalContainment";

    // Create element to act as a containment area for dragging the modal window.
    let modalContainment = $("<div id='" + panelModalContainment + "'>");
    $("body").prepend(modalContainment);
    $("#" + panelModalContainment).css({ "position": "fixed", "width": $(window).width(), "height": contentHeight, "top": "0px" });

    let dialog = $(
        "<div id='" + panelId + "' > " +
        "<div id='" + panelContentId + "' class='loading' > " +
        "<div id='" + panelBodyId + "'></div> " +
        "</div>" +
        "</div>"
    );

    dialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        actions: ["Custom", "Close"],
        autoFocus: false,
        maxHeight: maxOverlayHeight,
        resizable: false,
        draggable: false
    });

    let kendoDialog = dialog.data("kendoWindow");
    kendoDialog.wrapper.addClass(cssClass);

    // Customize the close icon
    let closeIcon = kendoDialog.wrapper.find(".k-svg-i-x");
    closeIcon.removeClass("k-svg-icon").removeClass("k-svg-i-x").addClass("k-i-custom-close");
    closeIcon.parent().attr("title", globalClose);

    // If you need Help action, add it manually
    let helpIcon = kendoDialog.wrapper.find(".k-svg-i-gear");
    helpIcon.removeClass("k-svg-icon").removeClass("k-svg-i-gear").addClass("k-i-help");
    helpIcon.parent().attr("title", helpWindowHandle);

    ///To do: Once all callers' code is changed to pass plain object(without stringify and parse) and date properties, the below if conditions will be removed.
    if (data !== undefined && data !== null) {
        if (data.hasOwnProperty('uid')) {
            if (dateProperties !== undefined && dateProperties !== null) {
                try {
                    setDatesWithoutTimeZone(data, dateProperties);
                }
                finally {
                    itemsNotToCheck = [];
                    objectName = '';
                    objectNames = [];
                }
            }
            data = JSON.parse(JSON.stringify(data));
        }
    }

    $("#" + panelBodyId).load(url, data, function () {

        //Define containment area for draggable modal overlay
        let draggableArea = $("#" + panelModalContainment);
        if (typeof draggableArea.offset() != "undefined" && draggableArea.offset() !== null) {
            let dx1 = draggableArea.offset().left;
            let dy1 = 0;
            if (!isPhone()) {
                dy1 = draggableArea.offset().top;
            }
            let mw = kendoDialog.wrapper.width();
            let mh = kendoDialog.wrapper.height();
            let pctWidthHidden = 0.90;
            let mHeaderHt = parseInt($('.k-window-titlebar').css('height'), 10);
            let mPadding = 10;
            let dx2 = draggableArea.width() + dx1 - mw;
            let dy2 = draggableArea.height() + dy1 - mh;

            // Create jQuery variable to the Kendo window wrapper to be used later to set up the draggable object of the window.
            let $jqDialog = dialog.data("kendoWindow").wrapper;

            $jqDialog.draggable({
                containment: [dx1 - (mw * pctWidthHidden), dy1, dx2 + (mw * pctWidthHidden), dy2 + (mh - (mHeaderHt + mPadding))],
                handle: ".k-window-titlebar",
                scroll: false
            });
        }

        applyModalMaskedDatePicker(panelId);
        commonPageEssentials("#" + panelId);

        removeModalStylesFromModalOverlay(panelId);

        shortcut.remove("Ctrl+Shift+Page_up");

        $("span.k-icon.k-i-help").attr("title", helpWindowHandle).tooltip();
        $("span.k-icon.k-i-custom-close").attr("title", globalClose).tooltip();

        unloadScrollBars();

        if (isPhone()) {
            kendoDialog.open().element.closest(".k-window").css({
                minWidth: $(window).width() * .9,
                maxHeight: $(window).height() * .85,
                top: 20,
            });
            if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $('html,body').scrollTop(0);
            }
            else {
                $("html").animate({ scrollTop: 0 });
            }
            $("#" + panelId).css("max-height", $(window).height() * .8);
        }
        else {
            // Adjust content area to prevent overflow below bottom of modal overlay
            let titlebarHeight = parseInt($("#" + panelId).siblings(".k-window-titlebar").css("height"), 10);
            $("#" + panelId).css("max-height", maxOverlayHeight - titlebarHeight);

            kendoDialog.center().open();
            initModalOverlayResizeObserver(kendoDialog);
        }

        hideLoadingDialog();

        focusFirstElement('#' + panelId);

        if ($.isFunction(window[callbackFunction])) {
            window[callbackFunction]();
        }
        else if ($.isFunction(callbackFunction)) {
            callbackFunction();
        }
    });

    //Expand|Collapse panel support for modal overlays
    $("#" + panelId).on("click", ".content-panel-container div.clickable, .content-subpanel-container div.clickable, .dshbrd-panel-container div.clickable", function (e) {
        expandCollapseAction(e, this);
    });
}

// Closes a Kendo modal window.
function closeModalOverlay(panelId, reloadScroll) {
    removeRedactionRawValues(panelId);
    cleanKendoDynamicElements(panelId);
    if (resizeObserver) {
        resizeObserver.disconnect();
    }

    if (typeof reloadScroll == "undefined") { reloadScroll = true; }
    let panel = $('#' + panelId);
    let panelModalContainment = panelId + "_modalContainment";
    let kendoWindow = panel.data("kendoWindow");
    if (kendoWindow) {
        $("#" + panelModalContainment).remove();
        // The if condition below tests to make sure the draggable element has been fully initialized before
        // attempting to destroy it.  This might occur if the openModalOverlay function gets called multiple
        // times in succession.  It will try to close the Kendo window before opening another Kendo window.
        if (kendoWindow.wrapper.is(':data(ui-draggable)')) {
            kendoWindow.wrapper.draggable("destroy");
        }
        kendoWindow.destroy();
    }
    else {
        panel.hide();
        panel.remove();
    }

    $('ul.k-list.k-reset').each(function () {
        $(this).removeAttr('aria-labelledby');
    });

    // Add back ability to use hot keys to scroll to the top of the page.
    shortcut.add("Ctrl+Shift+Page_up", function (e) {
        scrollBackToTop(e);
    });

    if (reloadScroll) {
        reloadScrollBars();
    }

    if (typeof isOverlayDataDirty !== 'undefined') {
        isOverlayDataDirty = false;
    }

    if (prevFocusControl) {
        $(prevFocusControl).focus();
    }
}

function cleanKendoDynamicElements(panelId) {
    cleanKendoDateElements(panelId);
    cleanKendoDropDownElements(panelId);
    cleanKendoToolTipElements();
}

function cleanKendoDateElements(panelId) {
    if ($('#' + panelId) != undefined && $("#" + panelId).length > 0) {
        // Find dynamic elements created by Kendo to support the date picker and remove them if they are part
        // of the form (panelId) sent in the parameters.
        if ($('#' + panelId + " input[data-role='datepicker']") != undefined) {
            $('#' + panelId + " input[data-role='datepicker']").each(function () {
                let dateviewElement = $("div[id='" + this.id + "_dateview']");
                if (dateviewElement != undefined && dateviewElement.length > 0) {
                    $(dateviewElement).each(function () {
                        if ($(this).parent().hasClass("k-animation-container")) {
                            $(this).parent().remove();
                        }
                        else {
                            $(this).remove();
                        }
                    });
                }
            });
        }
    }
}

function cleanKendoDropDownElements(panelId) {
    if ($('#' + panelId) != undefined && $("#" + panelId).length > 0) {
        // Find dynamic elements created by Kendo to support the drop-down list and multi-select lists and remove
        // them if they are part of the form (panelId) sent in the parameters.
        if ($("div[data-role='popup']").find(".k-list") != undefined) {
            $("div[data-role='popup']").find(".k-list").each(function () {
                let listControlId = this.id.substring(0, this.id.indexOf("-list"));
                if (listControlId != '' && $("#" + panelId).find("#" + listControlId).length > 0) {
                    if ($(this).parent().parent().hasClass("k-animation-container")) {
                        $(this).parent().parent().remove();
                    }
                    else {
                        $(this).parent().remove();
                    }
                }
            });
        }
    }
}

function cleanKendoToolTipElements() {
    $(".k-animation-container div[role=tooltip]").each(function () {
        if ($(this).parent().attr("aria-hidden") == "false") {
            $(this).hide();
            $(this).parent().hide();
        }
    });
}

// Retrieves the Kendo modal window based on a specified form.
function getModalOverlayWindow(formId) {
    let kendoModalWindow;
    let kendoWindowContent = $("#" + formId).closest(".k-window-content");
    if (kendoWindowContent && kendoWindowContent.length > 0) {
        let kendoWindowName = kendoWindowContent[0].id;

        if (kendoWindowName) {
            kendoModalWindow = $("#" + kendoWindowName).data("kendoWindow");
        }
    }
    return kendoModalWindow;
}

// Sets the title on a modal overlay.
function setModalOverlayTitle(overlayTitle, formId) {
    let kendoWindow = getModalOverlayWindow(formId);
    if (kendoWindow) {
        if (overlayTitle != undefined && overlayTitle !== '') {
            kendoWindow.title(overlayTitle);
        }
    }
}

// Binds a function to the close icon in a modal overlay.
function setModalOverlayCloseFunction(closeFunction, formId) {
    let kendoWindow = getModalOverlayWindow(formId);
    if (kendoWindow) {
        if (closeFunction != undefined && closeFunction !== '') {
            let closeIcon = kendoWindow.wrapper.find(".k-i-custom-close");
            closeIcon.attr("tabindex", "0");
            closeIcon.parent().off('click keypress').on('click keypress', function (e) {
                e.preventDefault();
                checkExecuteFunctionByName(closeFunction, null);
            });
        }
    }
}

// Sets the help node that gets displayed when the help icon is clicked in a modal overlay.
function setModalOverlayHelpNode(helpNode, formId) {
    let kendoWindow = getModalOverlayWindow(formId);
    if (kendoWindow) {
        let helpIcon = kendoWindow.wrapper.find(".k-i-help");
        if (helpNode == undefined || helpNode === '') {
            helpIcon.parent().hide();
        }
        else {
            helpIcon.parent().show();
            helpIcon.attr("tabindex", "0");
            helpIcon.parent().off('click keypress').on('click keypress', function (e) {
                e.preventDefault();
                displayPageLevelHelp(helpNode);
            });
        }
    }
}

// Re-centers the modal overlay for the specified form.
function recenterModalOverlay(formId) {
    if (!isPhone()) {
        let kendoWindow = getModalOverlayWindow(formId);
        if (kendoWindow) {
            let draggable = kendoWindow.wrapper.closest(".ui-draggable");
            if (draggable != undefined) {
                draggable.css({ "width": "", "height": "" });
            }
            kendoWindow.center();
        }
    }
}

function initModalOverlayResizeObserver(kendoDialog) {
    resizeObserver = new ResizeObserver(() => {
        if (kendoDialog !== undefined) {
            kendoDialog.center();
        }
    });

    let overlay = $(".k-overlay").next(".k-window").find(".k-window-content");
    if (overlay) {
        resizeObserver.observe(overlay[0]);
    }
}

// If a modal overlay needs to be reloaded, this function can be called in the callback function to
// perform tasks that are typically called when the overlay is opened, but doesn't happen during a load.
// Here is an example of what the load would look like in the module:
//
//$("#overlayForm").load(url,
//    {
//        model: JSON.parse(JSON.stringify(modelData))
//    },
//    function () {
//        postReloadModalOverlay(formId);
//    }
//);
function postReloadModalOverlay(formId) {
    applyModalMaskedDatePicker(formId);

    commonPageEssentials("#" + formId);
    removeModalStylesFromModalOverlay(formId);
    recenterModalOverlay(formId);
    focusFirstElement("#" + formId);
}

// This function removes old modal styles from the Kendo modal windows.  Once all modal windows have been
// converted to use the Kendo modal windows, this function, and all calls to it, can be removed.
function removeModalStylesFromModalOverlay(panelId) {
    let modalPanelBdy = $("#" + panelId).find(".modal-panel-bdy");
    if (modalPanelBdy) {
        modalPanelBdy.removeClass("modal-panel-bdy");
    }

    let modalPanelFormContainer = $("#" + panelId).find(".modal-panel-form-container");
    if (modalPanelFormContainer) {
        modalPanelFormContainer.removeClass("modal-panel-form-container");
    }
}

//-----------------------------------------------------------------------------------------
// Bootstrap modal window functions
//-----------------------------------------------------------------------------------------

///Issue:Dates were getting decrementedy by 1 day when the record(s) is opened from kendo grid for view or edit
///Parameter :"dateProperties"-This parameter takes the dates which have this issue in the form of JSONArray as per the below example
///Example :
///let dateFields = ["EffectiveDate", "EndDate", "ProcessingStartDate", "ProcessingEndDate", { MemberVOSTags: ["VOSEffectiveDate", "VOSEndDate"] }];
///displayModalPanelDialog(memberRateViewPanelId, viewMemberRateUrl, 'panelForm-col-6', null, selectedMemberRate, null, dateFields);
///MemberVOSTags is inner object which will have dates in array format.
function displayModalPanelDialog(panelId, url, cssClass, height, data, callbackFunction, dateProperties) {
    let prevDialog = $('#' + panelId);
    let panelContentId = panelId + "_content";
    let panelBodyId = panelId + "_body";
    if (prevDialog.length) {
        prevDialog.remove();
    }
    let dialog = $(
        "<div id='" + panelId + "' class='modal panelForm' role='dialog' data-keyboard='false' data-backdrop='static'>" +
        "<div class='modal-dialog " + cssClass + "'>" +
        "<div id='draggableModal' class='modal-content'>" +
        "<div id='" + panelContentId + "' class='loading'>" +
        "<div id='" + panelBodyId + "' class='modal-body panelForm_init" + cssClass + "' />" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
    dialog.modal({ backdrop: "static" });

    ///To do: Once all callers' code is changed to pass plain object(without stringify and parse) and date properties, the below if conditions will be removed.
    if (data !== undefined && data !== null) {
        if (data.hasOwnProperty('uid')) {
            if (dateProperties !== undefined && dateProperties !== null) {
                try {
                    setDatesWithoutTimeZone(data, dateProperties);
                }
                finally {
                    itemsNotToCheck = [];
                    objectName = '';
                    objectNames = [];
                }
            }
            data = JSON.parse(JSON.stringify(data));
        }
    }

    $("#" + panelBodyId).load(url, data, function () {
        initWidgets(panelId);
        setOverlayHeight();

        // Define containment area for draggable modal overlay
        let draggableArea = $('#' + panelId);
        let modalPanel = $("#" + panelId + " .modal-content");
        if (typeof draggableArea.offset() != "undefined" && draggableArea.offset() !== null) {
            let dx1 = draggableArea.offset().left;
            let dy1 = draggableArea.offset().top;
            let mw = modalPanel.outerWidth();
            let mh = modalPanel.outerHeight();
            let pctWidthHidden = 0.90;
            let mBorderHt = parseInt($('.modal-panel-form-container').css('borderLeftWidth'), 10);
            let mHeaderHt = parseInt($('.modal-panel-hdr').css('height'), 10);
            let mPadding = 10;
            let dx2 = draggableArea.width() + dx1 - mw;
            let dy2 = draggableArea.height() + dy1 - mh;
            $("#" + panelId + " .modal-content").draggable({
                containment: [dx1 - (mw * pctWidthHidden), dy1, dx2 + (mw * pctWidthHidden), dy2 + (mh - (mHeaderHt + mBorderHt + mPadding))],
                handle: ".modal-panel-hdr",
                scroll: false
            });

            formatCommonBlocks();
            reconfigureKendoWidgets();
            focusFirstElement('#' + panelId);
        }

        if (typeof callbackFunction === 'function') {
            callbackFunction();
        }
    });
    unloadScrollBars();
    $("#" + panelContentId).removeClass("loading");
    $(document).off('focusin.modal');

    //Expand|Collapse panel support for modal overlays
    $("#" + panelId).on("click keypress", ".content-panel-container div.clickable, .content-subpanel-container div.clickable, .dshbrd-panel-container div.clickable", function (e) {
        expandCollapseAction(e, this);
    });
}

// Note: As with Bootstrap's 'shown.bs.modal' event used above a timer must be included.  Once Bootstrap has been upgraded,
// hopefully new functionality can be applied and the timeout removed.
function setOverlayHeight(formId) {
    if (formId == undefined) {
        formId = '';
    }
    else {
        formId = "#" + formId + " ";
    }
    setTimeout(function waitSetOverlayHeight() {
        let modalDialog = $('.modal-dialog');
        let overlayHeaderHeight = 0;
        let overlayWrapper = $(formId + "#divOverlayModelWrapper");
        if (overlayWrapper != undefined && overlayWrapper.length > 0) {
            // Note: When the OverlayTopModelEditor is used the page needs to calculate the height size of the contents of the OverlayTopModelEditor
            // and reduce the size of the model dialog by this height size to keep the overlay from being too tall and spilling off the window.
            overlayHeaderHeight = $(formId + "#divOverlayModelWrapper").height();
        }
        modalBody = $(formId + '.modal-panel-bdy');
        if (modalBody !== null && modalBody.length > 0) {
            let contentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let maxOverlayHeight = contentHeight * .85; // Max overlay height is 85% of browser content height.
            modalBody.css({ 'max-height': maxOverlayHeight - overlayHeaderHeight });

            // Note: In most cases, using the CSS properties "top" and "transform" vertically centers the modal overlay on
            // the page.  However, when one or more radio buttons exist (either visible or hidden), IE has a documented issue
            // with vertical alignment when a radio button is clicked.  To avoid this issue, the following code is used to
            // modify the styles when radio buttons are present in the modal overlay and an IE browser is being used.  In all
            // other scenarios, "top" and "transform" will be used as defined in the CSS.
            let ua = window.navigator.userAgent;
            let isIE = /MSIE|Trident/.test(ua);
            let radioButton = modalDialog.find('form input:radio');
            if (isIE && radioButton !== null && radioButton.length > 0) {
                // Note: jQuery has documented issues with assigning the "!important" pseudo property using the .css() method.
                // Therefore, the .attr() method must be used.
                modalDialog.attr('style', 'top:auto; transform:none !important;');
                modalDialog.css('margin-top', Math.max(0, ($(window).height() - modalDialog.height()) / 2));
            }
        } else {
            setTimeout(waitSetOverlayHeight, 10);
        }
    }, 10);
}

function setPanelHeight(panelId) {
    if (panelId == undefined) {
        panelId = '';
    }
    else {
        panelId = panelId + " ";
    }
    setTimeout(function waitSetPanelHeight() {
        let panelContainer = $('.aag-panel');
        panelBody = $(panelId + '.aag-panel-body');
        panelInnerBody = $(panelId + '.inner-panel-body');
        if (panelBody !== null && panelBody.length > 0) {
            panelBody.css({ 'max-height': '75vh' });
            panelInnerBody.css({ 'max-height': '50vh' });
            panelInnerBody.css({ 'overflow': 'auto' });

            // Note: In most cases, using the CSS properties "top" and "transform" vertically centers the modal overlay on
            // the page.  However, when one or more radio buttons exist (either visible or hidden), IE has a documented issue
            // with vertical alignment when a radio button is clicked.  To avoid this issue, the following code is used to
            // modify the styles when radio buttons are present in the panel overlay and an IE browser is being used.  In all
            // other scenarios, "top" and "transform" will be used as defined in the CSS.
            let ua = window.navigator.userAgent;
            let isIE = /MSIE|Trident/.test(ua);
            let radioButton = panelContainer.find('form input:radio');
            if (isIE && radioButton !== null && radioButton.length > 0) {
                // Note: jQuery has documented issues with assigning the "!important" pseudo property using the .css() method.
                // Therefore, the .attr() method must be used.
                panelContainer.attr('style', 'top:auto; transform:none !important;');
                panelContainer.css('margin-top', Math.max(0, ($(window).height() - panelContainer.height()) / 2));
            }
        } else {
            setTimeout(waitSetPanelHeight, 10);
        }
    }, 10);
}

function closeModalPanelDialog(panelId, reloadScroll) {
    cleanKendoDynamicElements(panelId);

    if (typeof reloadScroll == "undefined") { reloadScroll = true; }
    let panel = $('#' + panelId);
    panel.hide();
    panel.remove();
    $('ul.k-list.k-reset').each(function () {
        $(this).removeAttr('aria-labelledby');
    });

    if (reloadScroll) {
        $(".modal-backdrop").remove();
        reloadScrollBars();
    }

    if (typeof isOverlayDataDirty !== 'undefined') {
        isOverlayDataDirty = false;
    }
}

function initWidgets(panelId) {
    applyModalMaskedDatePicker(panelId);

    // Reconfigure ListBox widgets to provide proper tabbing/focus
    reconfigureListBoxes();

    // Configure attributes to specific read-only controls
    configureReadOnlyControls(panelId);

    // Add 508 compliance...must always follow configureReadOnlyControls(), never precede
    accessibility508Support(panelId);

    // Establish consistent validation message placement for DatePicker, both standard and grid inline edit.
    //addDatePickerValidationSpan(panelId);
}

function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto'; // Chrome & Firefox
    document.body.scroll = "yes"; // IE only
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden'; // Chrome & Firefox
    document.body.scroll = "no"; // IE only
}

function scrollBackToTop(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, bttDuration);
}

function displayPopupDialog(type, title, msg, showClose, controlToFocusOnClose) {
    let modalStyle = getModalDialogStyle(type);
    let modalIcon = formatDialogIcon(type);

    if (!controlToFocusOnClose) {
        controlToFocusOnClose = "";
    }

    let decodedMsg = $("<div/>").html(msg).text();
    let alertDialog = $(
        "<div id='modalMessagePopup' class='modal-msg-panel-container-" + modalStyle + "' role='dialog' aria-label='" + title + "'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        decodedMsg +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='okButton' autofocus class='k-button' data-dismiss='modal' value='" + globalActionButtonOK + "' onClick='removeModalMessagePopup(" + controlToFocusOnClose + ");'/>" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );
    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: title,
        draggable: false,
        resizable: false,
        close: function () {
            removeModalMessagePopup();
        }
    });

    let alertWindow = alertDialog.data("kendoWindow");
    let closeIcon = alertWindow.wrapper.find(".k-i-close");

    let titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-" + modalStyle);
        titleBar.prepend("<i class='fa-solid modal-msg-icon-" + modalStyle + " " + modalIcon + "'></i>");
    }

    if (showClose) {
        closeIcon.parent().show();
    }
    else {
        closeIcon.parent().hide();
    }

    alertWindow.center().open();
    $("#modalMessagePopup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalMessageAside' aria-label='Modal Message'>");
}

function displayHtmlPopupDialog(type, title, html, showClose) {
    let modalStyle = getModalDialogStyle(type);
    let modalIcon = formatDialogIcon(type);

    let alertDialog = $(
        "<div id='modalMessagePopup' class='modal-msg-panel-container-" + modalStyle + "' role='dialog' aria-label='" + title + "'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        html +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='okButton' class='k-button' data-dismiss='modal' value='" + globalActionButtonOK + "' onClick='removeModalMessagePopup();' />" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );
    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: title,
        draggable: false,
        resizable: false,
        close: function () {
            removeModalMessagePopup();
        }
    });

    let alertWindow = alertDialog.data("kendoWindow");
    let closeIcon = alertWindow.wrapper.find(".k-i-close");

    let titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-" + modalStyle);
        titleBar.prepend("<i class='fa-solid modal-msg-icon-" + modalStyle + " " + modalIcon + "'></i>");
    }

    if (showClose) {
        closeIcon.parent().show();
    }
    else {
        closeIcon.parent().hide();
    }

    alertWindow.center().open();
    $("#modalMessagePopup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalMessageAside' aria-label='Modal Message'>");
}

function displayPopupDialogActionable(type, title, msg, okBtnAction, showClose) {
    let modalStyle = getModalDialogStyle(type);
    let modalIcon = formatDialogIcon(type);

    let decodedMsg = $("<div/>").html(msg).text();
    let alertDialog = $(
        "<div id='modalMessagePopup' class='modal-msg-panel-container-" + modalStyle + "' role='dialog' aria-label='" + title + "'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        decodedMsg +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='okButton' class='k-button' data-dismiss='modal' value='" + globalActionButtonOK + "' onClick='checkExecuteFunctionByName(\"" + okBtnAction + "\", null); removeModalMessagePopup();' />" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );
    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: title,
        draggable: false,
        resizable: false,
        close: function () {
            removeModalMessagePopup();
        }
    });

    let alertWindow = alertDialog.data("kendoWindow");
    let closeIcon = alertWindow.wrapper.find(".k-i-close");

    let titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-" + modalStyle);
        titleBar.prepend("<i class='fa-solid modal-msg-icon-" + modalStyle + " " + modalIcon + "'></i>");
    }

    if (showClose) {
        closeIcon.parent().show();
    }
    else {
        closeIcon.parent().hide();
    }

    alertWindow.center().open();
    $("#modalMessagePopoup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalMessageAside' aria-label='Modal Message'>");
}

function displayHtmlPopupDialogActionable(type, title, html, okBtnAction, showClose) {
    let modalStyle = getModalDialogStyle(type);
    let modalIcon = formatDialogIcon(type);

    let alertDialog = $(
        "<div id='modalMessagePopup' class='modal-msg-panel-container-" + modalStyle + "' role='dialog' aria-label='" + title + "'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        html +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='okButton' class='k-button' data-dismiss='modal' value='" + globalActionButtonOK + "' onClick='checkExecuteFunctionByName(\"" + okBtnAction + "\", null); removeModalMessagePopup();' />" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );
    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: title,
        draggable: false,
        resizable: false,
        close: function () {
            removeModalMessagePopup();
        }
    });

    let alertWindow = alertDialog.data("kendoWindow");
    let closeIcon = alertWindow.wrapper.find(".k-i-close");

    let titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-" + modalStyle);
        titleBar.prepend("<i class='fa-solid modal-msg-icon-" + modalStyle + " " + modalIcon + "'></i>");
    }

    if (showClose) {
        closeIcon.parent().show();
    }
    else {
        closeIcon.parent().hide();
    }

    alertWindow.center().open();
    $("#modalMessagePopup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalMessageAside' aria-label='Modal Message'>");
}

function displayPopupOKCancelDialog(type, title, msg, okBtnText, okBtnAction, cancelBtnText, cancelBtnAction, showClose, data) {
    let modalStyle = getModalDialogStyle(type);
    let modalIcon = formatDialogIcon(type);

    let decodedMsg = $("<div/>").html(msg).text();
    let alertDialog = $(
        "<div id='modalMessagePopup' class='modal-msg-panel-container-" + modalStyle + "' role='dialog' aria-label='" + title + "'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        decodedMsg +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='cancelModalButton' class='k-button btn-spacer-right' data-dismiss='modal' value='" + cancelBtnText + "' onClick='checkExecuteFunctionByName(\"" + cancelBtnAction + "\", null); removeModalMessagePopup();' />" +
        "        <input type='button' id='okButton' class='k-button' data-dismiss='modal' value='" + okBtnText + "' />" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );
    alertDialog.find('#okButton').on('click', function () {
        removeModalMessagePopup();
        checkExecuteFunctionByNameWithData(okBtnAction, data, null);
    });
    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: title,
        draggable: false,
        resizable: false,
        actions: [],
        close: function () {
            checkExecuteFunctionByName(cancelBtnAction, null);
            removeModalMessagePopup();
        }
    });

    let alertWindow = alertDialog.data("kendoWindow");
    let closeIcon = alertWindow.wrapper.find(".k-i-close");

    let titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-" + modalStyle);
        titleBar.prepend("<i class='fa-solid modal-msg-icon-" + modalStyle + " " + modalIcon + "'></i>");
    }

    if (showClose) {
        closeIcon.parent().show();
    }
    else {
        closeIcon.parent().hide();
    }

    alertWindow.center().open();
    $("#modalMessagePopup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalMessageAside' aria-label='Modal Message'>");
}

function displayHtmlPopupOKCancelDialog(type, title, msg, okBtnText, okBtnAction, cancelBtnText, cancelBtnAction, showClose, data) {
    let modalStyle = getModalDialogStyle(type);
    let modalIcon = formatDialogIcon(type);

    let alertDialog = $(
        "<div id='modalMessagePopup' class='modal-msg-panel-container-" + modalStyle + "' role='dialog' aria-label='" + title + "'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        msg +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='cancelModalButton' class='k-button btn-spacer-right' data-dismiss='modal' value='" + cancelBtnText + "' onClick='checkExecuteFunctionByName(\"" + cancelBtnAction + "\", null); removeModalMessagePopup();' />" +
        "        <input type='button' id='okButton' class='k-button' data-dismiss='modal' value='" + okBtnText + "' />" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );
    alertDialog.find('#okButton').on('click', function () {
        removeModalMessagePopup();
        checkExecuteFunctionByNameWithData(okBtnAction, data, null);
    });
    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: title,
        draggable: false,
        resizable: false,
        close: function () {
            checkExecuteFunctionByName(cancelBtnAction, null);
            removeModalMessagePopup();
        }
    });

    let alertWindow = alertDialog.data("kendoWindow");
    let closeIcon = alertWindow.wrapper.find(".k-i-close");

    let titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-" + modalStyle);
        titleBar.prepend("<i class='fa-solid modal-msg-icon-" + modalStyle + " " + modalIcon + "'></i>");
    }

    if (showClose) {
        closeIcon.parent().show();
    }
    else {
        closeIcon.parent().hide();
    }

    alertWindow.center().open();
    $("#modalMessagePopup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalMessageAside' aria-label='Modal Message'>");
}

function removeModalMessagePopup(controlToFocusOnClose) {
    let kendoWindow = $("#modalMessagePopup").data("kendoWindow");
    let overlayWrapper = $("[id*='divOverlayModelWrapper']");

    if (kendoWindow) {
        kendoWindow.destroy();
        if ($("#modalMessageAside").length > 0) {
            $("#modalMessageAside").remove();
            if ($(".k-overlay").length > 1) {
                $(".k-overlay")[1].remove();
            }
        }
    }
    else {
        $('#modalMessagePopup').modal('hide').remove();
    }

    let overlayExists = $(".k-widget.k-window").length > 0;

    // Make sure an overlay is not active before turning the scroll bar back on in the main content window.
    if ((overlayWrapper == undefined || overlayWrapper.length === 0) && !overlayExists) {
        $('html').css('overflow', 'auto');
    }
    if (controlToFocusOnClose) {
        if ($(controlToFocusOnClose).data("kendoDropDownList")) {
            $(controlToFocusOnClose).data("kendoDropDownList").focus();
        }
        else {
            $(controlToFocusOnClose).focus();
        }
    }
    controlToFocusOnClose = null;
}

function setupWindowWidgets() {
    let windowPane = $(".k-window");
    if (windowPane !== null && windowPane.length > 0) {
        $(windowPane).find(".k-window-titlebar .k-window-action").each(function () {
            $(this).removeClass('k-button');
            $(this).removeClass('k-bare');
            $(this).removeClass('k-button-icon');
        });
    }
}

function setModelessWindowIcons(id) {
    setTimeout(function () {
        let iconMinimize = $(id).parent('.k-window').find('.k-i-window-minimize');
        let iconMaximize = $(id).parent('.k-window').find('.k-i-window-maximize');
        let iconRestore = $(id).parent('.k-window').find('.k-i-window-restore');
        let iconClose = $(id).parent('.k-window').find('.k-i-close');

        if (iconMinimize.length > 0) {
            $(iconMinimize).attr("title", globalMinimize).tooltip();
        }

        if (iconMaximize.length > 0) {
            $(iconMaximize).attr("title", globalMaximize).tooltip();
        }

        if (iconRestore.length > 0) {
            $(iconRestore).attr("title", globalRestore).tooltip();
        }

        if (iconClose.length > 0) {
            $(iconClose).attr("title", globalClose).tooltip();
        }
    }, 1);
}
function toggleModelessWindowMinimize(id) {
    let iconMinimize = $(id).parent('.k-window').find('.k-i-window-minimize');
    let iconRestore = $(id).parent('.k-window').find('.k-i-window-restore');

    if (iconMinimize.length > 0) {
        let iconVisibility = $(iconMinimize).parent('a').css('display');
        if (iconVisibility === 'none') {
            $(iconRestore).addClass('i-minimize-flip');
        }
    }

    setModelessWindowIcons(id);
    setupWindowWidgets();
}

function toggleModelessWindowMaximize(id) {
    let iconMaximize = $(id).parent('.k-window').find('.k-i-window-maximize');
    let iconRestore = $(id).parent('.k-window').find('.k-i-window-restore');

    if (iconMaximize.length > 0) {
        let iconVisibility = $(iconMaximize).parent('a').css('display');
        if (iconVisibility === 'none') {
            $(iconRestore).addClass('i-maximize-flip');
        }
        // Unpin the page header, if it is pinned, so it will not cover up the maximized modeless window
        if (typeof headroom != 'undefined') {
            headroom.unpin();
        }
    }

    setModelessWindowIcons(id);
    setupWindowWidgets();
}


//-----------------------------------------------------------------------------------------
// Popup window functions
// With title parmeter: part of Logout and same window instance
// Without title parameter: not part of Logout and different window instance
//-----------------------------------------------------------------------------------------
var newWindow = {};
function initializePopUpWindowDimensions() {
    let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    let popupLeft = (width / 4) + dualScreenLeft;
    let popupTop = (height / 4) + dualScreenTop;
    let popupWidth = screen.width / 2;
    let popupHeight = screen.height / 2;
    return {
        popupLeft: popupLeft,
        popupTop: popupTop,
        popupWidth: popupWidth,
        popupHeight: popupHeight,
        dualScreenTop: dualScreenTop
    }
};

function popupCenteredWindow(url, title) {
    let windowDimensions = initializePopUpWindowDimensions();
    if (title.length > 0) {
        newWindow[title] = window.open(url, title, "toolbar=0,menubar=0,scrollbars=1,resizable=1,top=" + windowDimensions.popupTop + ",left=" + windowDimensions.popupLeft + ",width=" + windowDimensions.popupWidth + ",height=" + windowDimensions.popupHeight);
        if (window.focus) {
            newWindow[title].focus();
        }
    }
    else {
        let newWindowBlankTitle = window.open(url, "", "toolbar=1,menubar=1,scrollbars=1,resizable=1,top=" + windowDimensions.dualScreenTop + ",left=" + windowDimensions.popupLeft + ",width=" + windowDimensions.popupWidth + ",height=" + windowDimensions.popupHeight);
        if (window.focus) {
            newWindowBlankTitle.focus();
        }
    }
}

function closeHelpWindow() {
    if (newWindow[helpWindowHandle] !== undefined) {
        newWindow[helpWindowHandle].close();
    }
}

function popupCloseWindow() {
    for (let title in newWindow) {
        let window = newWindow[title];
        window.close();
        delete newWindow[title];
    }
    return true;
}

//-----------------------------------------------------------------------------------------
// Set focus functions
//-----------------------------------------------------------------------------------------
function focusFirstElement(formId) {
    let contentHeight = window.innerHeight;
    let firstKendoControl = $(formId).find(".k-picker[aria-disabled='false']:visible:has(input:not(:disabled)),input:visible:not(:disabled),textarea:visible:not(:disabled),select:visible:not(:disabled),.assoc-box-radio-btn-list-horz.k-radio").first();
    if (contentHeight < 426) {
        $("html, body").animate({ scrollTop: 0 }, bttDuration);
    } else {
        if ($(firstKendoControl).hasClass("k-dropdown")) {
            let input = $(firstKendoControl).find("input")[0];
            let dropdown = $(input).data("kendoDropDownList");
            dropdown.focus();
        }
        else {
            firstKendoControl.focus();
        }

    }
}

function focusLastElement(formId) {
    let lastKendoControl = $(formId).find(".k-widget[aria-disabled='false']:visible:has(input:not(:disabled):not([readonly])),input:visible:not(:disabled):not([readonly]),textarea:visible:not(:disabled):not([readonly]),select:visible:not(:disabled):not([readonly])").last();
    if ($(lastKendoControl).hasClass("k-dropdown")) {
        let input = $(lastKendoControl).find("input")[0];
        let dropdown = $(input).data("kendoDropDownList");
        dropdown.focus();
    }
    else {
        lastKendoControl.focus();
    }
}

function focusFirstErrorElement(formId) {
    let controlElement = $(formId).find('.k-invalid:not([readonly]) input').first();

    if (controlElement.length > 0) {
        let elementRole = controlElement.attr('data-role');
        let elementId = controlElement[0].id;

        if (elementRole != undefined && elementId != undefined) {
            if (elementRole == "numerictextbox") {
                $('#' + elementId).data('kendoNumericTextBox').focus();
            }
            else if (elementRole == "dropdownlist") {
                $('#' + elementId).data('kendoDropDownList').focus();
            }
            else {
                controlElement.focus().select();
            }
        }
        else {
            controlElement.focus().select();
        }
    }
}

function focusModuleTitle() {
    let modalHdr = $('.modal-panel-hdr span');
    if (modalHdr.length > 0) {
        $('.modal-panel-hdr span').attr('tabindex', '0').focus();
    }
}

function setDefaultButton(buttonId, inputControlsDivId) {
    /*
    / buttonId - The element id of the button that is being set as default.
    / inputControlsDivId - The element id of the DIV that contains the form-level input controls, not including the button controls.
    */
    $(inputControlsDivId).on("keydown", function (event) {
        let keycode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);

        if (keycode == 13 && !$(':focus').hasClass("k-button") && !$(buttonId).is(':disabled')) {
            $(':focus').blur();
            $(buttonId).click();
        }
        else if (keycode == 13 && $(':focus').hasClass("k-button")) {
            $(':focus').click();
        }
    });
}

//-----------------------------------------------------------------------------------------
// Validation summary functions
//-----------------------------------------------------------------------------------------
function hideSummaryErrors() {
    let validationSummary = $(".validation-summary");
    if ($(validationSummary).length) {
        validationSummary.hide();
    }
}

function showSummaryErrorSimple() {
    let validationSummary = $(".validation-summary");
    let validationErrors = $(".validation-errors");

    if ($(validationSummary).length) {
        let html = "";
        validationErrors.empty().append($(html));
        validationSummary.show();
    }
}

function showSummaryErrors(errors) {
    let validationSummary = $(".validation-summary");
    let validationErrors = $(".validation-errors");

    if ($(validationSummary).length) {
        let html = "";
        for (let idx = 0; idx < errors.length; idx++) {
            html += "<li>" + errors[idx] + "</li>";
        }
        validationErrors.empty().append($(html));

        if (html.length > 0) {
            validationSummary.show();
            if (errors.length > 0 && $(".msg-inline-close").length > 0) {
                $(".msg-inline-close").focus();
            }
        }
        else {
            validationSummary.hide();
        }
    }
}

//-----------------------------------------------------------------------------------------
// Web API functions
//-----------------------------------------------------------------------------------------
function makeAsyncWebApiCall(webApiUrl, action, inputData, contentType, responseMethod, errorResponseMethod) {
    let result = {
        IsValid: false,
        Data: null
    };

    clearGeneralMessages();
    hideSummaryErrors();
    showLoadingDialog();

    $.ajax({
        async: true,
        url: webApiUrl,
        type: action,
        data: inputData,
        contentType: contentType,
        success: function (outputData) {
            hideLoadingDialog();
            if (outputData && typeof outputData == "object" && "IsValid" in outputData) {
                result.IsValid = outputData.IsValid;
            }
            result.Data = outputData;

            let statusCodeType = "Success";
            if (result.Data) {
                if (result.Data.StatusCode != undefined) {
                    switch (result.Data.StatusCode) {
                        case 7010:
                            statusCodeType = "Info";
                            break;
                        case 7000:
                            statusCodeType = "Warning";
                            break;
                        default:
                            statusCodeType = "Success";
                            break;
                    }
                }
            }

            if ($.isFunction(window[responseMethod])) {
                returnValue = window[responseMethod](result, statusCodeType);
            } else if ($.isFunction(responseMethod)) {
                returnValue = responseMethod(result, statusCodeType);
            }
        },
        error: function (obj, status, error) {
            hideLoadingDialog();
            processWebApiError(obj, status, error, errorResponseMethod);
        }
    });
}

function makeSyncWebApiCall(webApiUrl, action, inputData, contentType, errorResponseMethod) {
    let result = {
        IsValid: false,
        Data: null
    };

    clearGeneralMessages();
    hideSummaryErrors();
    showLoadingDialog();

    $.ajax({
        async: false,
        url: webApiUrl,
        type: action,
        data: inputData,
        contentType: contentType,
        success: function (outputData) {
            if (outputData && typeof outputData === "object" && outputData.Result && "IsValid" in outputData.Result) {
                result.IsValid = outputData.Result.IsValid;
            }
            else {
                result.IsValid = true;
            }
            result.Data = outputData;
        },
        error: function (obj, status, error) {
            processWebApiError(obj, status, error, errorResponseMethod);
        }
    });
    hideLoadingDialog();

    return result;
}

function processWebApiError(obj, status, error, errorResponseMethod) {
    if (obj.responseJSON != null) {
        let result = obj.responseJSON;
        let errors = new Array();
        let step = 999;
        let fieldErrors = false;
        let i;
        if (result != null) {
            if (result.RedirectUrl != null && result.RedirectUrl.length > 0) {
                checkExecuteFunctionByName("resetDirtyData", null);
                window.location = result.RedirectUrl;
            }
            else {
                if (result.Messages != null && result.Messages.length > 0) {
                    for (i = 0; i < result.Messages.length; i++) {
                        errors.push(result.Messages[i].Message);
                    }
                }
                if (result.FieldMessages != null && result.FieldMessages.length > 0) {
                    for (i = 0; i < result.FieldMessages.length; i++) {
                        let fieldMessage = result.FieldMessages[i];
                        if (fieldMessage.Step > 0 && fieldMessage.Step < step) {
                            step = fieldMessage.Step;
                        }
                        let field = $(fieldMessage.Field);
                        if (field != null && field.length > 0) {
                            setKendoValidatorFieldMessage(field, fieldMessage.Message);
                        }
                        else {
                            field = $('#' + fieldMessage.Field);
                            if (field != null && field.length > 0) {
                                setKendoValidatorFieldMessage(field, fieldMessage.Message);
                            }
                            else {
                                errors.push(fieldMessage.Message);
                            }
                        }
                    }
                    fieldErrors = true;
                }
                if (step < 999) {
                    if ($.isFunction(window["initEdtorStep"])) {
                        editorStep = step;
                        initEdtorStep(step, editorStepCount);
                    }
                }
                if (errors.length > 0) {
                    showSummaryErrors(errors);
                }
                else if (fieldErrors) {
                    showSummaryErrorSimple();
                }
                if ($.isFunction(window[errorResponseMethod])) {
                    returnValue = window[errorResponseMethod](errors);
                }
                else if ($.isFunction(errorResponseMethod)) {
                    returnValue = errorResponseMethod(errors);
                }
            }
        }
    }
    else {
        // Unhandled error
        addGeneralMessage("Error", globalMsgWebApiError);
    }
    hideLoadingDialog();
}

function onWebApiError(e) {
    processWebApiError(e.xhr, e.xhr.status, e.xhr.statusText);
}

//-----------------------------------------------------------------------------------------
// Filter Nav functions
//-----------------------------------------------------------------------------------------
function initializeFilterNav() {
    let fltrNav = $("#filterNav");
    let fltrNavBtnTab = $("#filterNavButtonTab");

    // set styles for filter nav to make it visible and floatable
    fltrNav.css("position", "absolute");
    fltrNav.css("visibility", "visible");
    fltrNavBtnTab.hide();
    fltrNav.show();

    headerHeight = parseInt($("body").css("padding-top"));
    fltrNavPosTop = parseInt(fltrNav.offset().top);

    // create the overlay for the page background when the nav is open.
    fltrNav.parent().append('<div id="filterNavOverlay" style="display: none;"></div>');
    $('#filterNavOverlay').css("top", headerHeight);
}

// get the dimensions for the filter nav panel, based upon the content well container settings
function setFilterNavDimensions() {
    let containerWidth = parseInt($("div.container").width());
    let navFilterWidth = (containerWidth + ((globalFilterNavTabWidthClosed - globalFilterNavTabWidthOpen) * 2));  // Leave in px since the value is calculated.
    $("#filterNavPanelContainer").css("max-width", navFilterWidth.toString() + "px");

    let navFilterHeight = parseInt($(window).height()) - parseInt($("#pageHeader").height()) - parseInt($("#filterNavButtonTab").height());
    $("#filterNavPanel").css("max-height", navFilterHeight.toString() + "px");
}

function adjustFooterUnderFilterNav() {
    if ($("#filterNav").length) {
        if ($("#fltNavSpacer").length) {
            $("#fltNavSpacer").remove();
        }
        let footerOffset = parseInt($("#pageFooter").offset().top);
        let footerHeight = parseInt($("#pageFooter").height());
        let filtNavOffset = parseInt($("#filterNav").offset().top);
        let filtNavHeight = parseInt($("#filterNav").height());

        if ((filtNavOffset + filtNavHeight) > footerOffset) {
            let adjustmentDiv = (filtNavOffset + filtNavHeight) - footerOffset + parseInt($(".content").css("padding-bottom"));
            $("#pageBody").append("<div id='fltNavSpacer' style='height:" + adjustmentDiv + "px;'></div>");
        }
    }
}

//-----------------------------------------------------------------------------------------
// Begin UA3 core module definitions
//-----------------------------------------------------------------------------------------

// Base namespace for UA3 modules
UA3 = (function ($) {
    return {};
})(jQuery);

// UA3 Module for common functions touching the screen and DOM
UA3.View = (function ($) {
    let _getFormObject = function (formIdSelector, attributeName) {
        let attrName = attributeName || "id";
        let formObj = {};
        $("input", $(formIdSelector)).each(function (index) {
            if ($(this).attr(attrName)) {
                let val = $(this).val();
                let id = $(this).attr("id").replace(".", "_").replace(" ", "_");
                formObj[id] = $(this).val();
            }
        });
        return formObj;
    };

    return {
        // Turns a form into a javascript object with properties from the form's input elements
        getFormObject: _getFormObject
    };
})(jQuery);

// UA3 Module for functionality related to supporting kendo's MVVM pattern
UA3.ViewModel = (function ($) {
    let _extend = function (model) {
        // Wraps a ViewModel function in a context-aware callback for invocation outside of the ViewModel
        model.wrapCallback = function (callback) {
            return $.proxy(callback, this);
        };

        // Formats strings and sends to console.log, standard C# format ("hello {0}", "world")
        model.log = function (message, formats) {
            let args = arguments;
            let leftOver = Array.prototype.slice.call(args, 1);
            let formatted = args[0].format(leftOver);
            console.log(formatted);
        };

        // Extends a view model by assigning properties from a form's input elements
        model.loadFormData = function (formSelector) {
            let formObj = UA3.View.getFormObject(formSelector, "id");
            $.extend(this, formObj);
            return this;
        };

        // Binds a view model to a document element (typically $(document.body) or $(someform)
        model.bindTo = function (element) {
            let observerable = kendo.observable(this);
            kendo.bind(element, observerable);
            if ($.isFunction(this.initialize)) {
                observerable.initialize();
            }

            return this;
        };

        return model;
    };

    return {
        // Extends a view model definition with common functionality
        extend: _extend
    };
})(jQuery);

//-----------------------------------------------------------------------------------------
// Function for resetting the scroll bar of KendoGrid to top position
//-----------------------------------------------------------------------------------------
function ResetGridScrollbar(gridName) {
    return function (e) {
        $(gridName + " .k-grid-content").scrollTop(0);
    };
}

//-----------------------------------------------------------------------------------------
// Functions for Date Masking
//-----------------------------------------------------------------------------------------
// This following two functions handle a cursor issue on the DatePicker textbox.  When the current date is selected in the DatePicker
// calendar, focus returns to the now-populated textbox of the DatePicker widget, with the cursor to the right of the date.  However,
// hitting the backspace to delete the last digit of the year causes the cursor to reposition to the beginning of the textbox. Per
// Kendo, this is due to 2 widgets being initialized from a single DOM element.  The two functions were provided by Kendo to correctly
// calculate the cursor positioning.
kendo.ui.MaskedTextBox.fn.inputChange = function (backward) {
    let that = this;
    let old = that._old;
    let element = that.element[0];
    let value = element.value;
    let selection = kendo.caret(element);
    let cursor = selection[1];
    let lengthDiff = value.length - old.length;
    let mobile = kendo.support.mobileOS;

    if (that.__dropping && lengthDiff < 0) { //dropping in same input on WebKit is raised once for the removal phase and once for the adding phase
        return;
    }

    if (lengthDiff === -1 && mobile.android && mobile.browser === "chrome") {
        backward = true;
    }

    let contentStart = Math.min(cursor, stringDiffStart(value, 10));
    if (contentStart == 0 && backward && cursor != 0) {
        contentStart = cursor;
    }
    let content = value.substring(contentStart, cursor);
    element.value = value.substring(0, contentStart) + that._emptyMask.substring(contentStart);

    let caretPos = that._mask(contentStart, cursor, content);
    let endContent = that._trimStartPromptChars(value.substring(cursor), Math.min(lengthDiff, caretPos - contentStart));

    let unmasked = that._unmask(endContent, old.length - endContent.length);
    that._mask(caretPos, caretPos, unmasked);

    if (backward) {
        caretPos = that._findCaretPosBackwards(contentStart);
    }

    kendo.caret(element, caretPos);

    //clean-up flags
    that.__dropping = false;
};

function stringDiffStart(str1, str2) {
    let i = 0;
    while (i < str2.length) {
        if (str1[i] !== str2[i]) {
            break;
        }
        i++;
    }
    return i;
}

(function ($) {
    // Shorten references to variables which is better for uglification.
    let kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        CHANGE = "change";

    let MaskedDatePicker = kendo.ui.Widget.extend({

        // Initialize the widget.  "element" is the element that is being initialized.  "options" is a set of configuration values.
        init: function (element, options) {
            let that = this;
            let dateFormat = formatCultureDateMask();
            let dateMask = "00/00/0000";

            if (dateFormat.startsWith("yyyy")) {
                dateMask = "0000/00/00";
            }

            // The base call to initialize the widget.
            Widget.fn.init.call(this, element, options);
            let maxDate = that.element.data("kendoDatePicker").max();

            $(element).kendoMaskedTextBox({
                mask: that.options.dateOptions.mask || dateMask
            })
                .kendoDatePicker({
                    format: that.options.dateOptions.format || dateFormat,
                    max: maxDate
                })
                .closest(".k-datepicker")
                .add(element)
                .removeClass("k-textbox");

            $(element).parents(".k-maskedtextbox").last().replaceWith(function () {
                return $('input', this);
            });

            that.element.data("kendoDatePicker").bind(CHANGE, function () {
                that.trigger(CHANGE);
            });

            //// The code below was created because at one time AXE scans would flag duplicate id attributes as errors, but they quit parsing for that now.
            //// This function is hack code from Kendo and is no longer supported, but we have to use it until they fix the DateInput method of masking dates.
            //// Leaving this code here until we get rid of this hack function or until we determine this code is needed again.
            ////    let dateId = $(element).attr("id");
            ////    if (dateId != undefined) {
            ////        let dateviewId = dateId + "_dateview";
            ////        if ($("div[id='" + dateviewId + "']").length > 1) {
            ////            $("div[id='" + dateviewId + "']")[1].remove();
            ////        }
            ////    }
        },
        options: {
            name: "MaskedDatePicker",
            autoBind: true,
            dateOptions: {}
        },
        events: [
            CHANGE
        ],
        destroy: function () {
            let that = this;
            kendo.ui.Widget.fn.destroy.call(that);

            kendo.destroy(that.element);
        },
        value: function (value) {
            let datepicker = this.element.data("kendoDatePicker");

            if (value === undefined) {
                return datepicker.value();
            }

            datepicker.value(value);
        }
    });

    kendo.ui.plugin(MaskedDatePicker);

})(window.kendo.jQuery);

function MaskedDatePicker(obj) {
    $(obj).kendoMaskedDatePicker();
}

function applyMaskedDatePicker() {
    // add custom control to all DatePickers to apply masking.
    $('span.k-datepicker input').each(function () {
        let dpId = $(this).attr('id');
        if ((dpId !== null) && (dpId.length > 0)) {
            MaskedDatePicker('#' + dpId);
        }
        $(this).removeAttr("aria-placeholder");
    });
}

function applyModalMaskedDatePicker(pnlId) {
    // add custom control to all DatePickers to apply masking.
    $('#' + pnlId + ' span.k-datepicker input').each(function () {
        let dpId = $(this).attr('id');
        if (dpId !== null && dpId.length > 0) {
            MaskedDatePicker('#' + dpId);
        }
        $(this).removeAttr("aria-placeholder");
    });
}

function formatCultureDateMask() {
    let dateMask = kendo.culture().calendars.standard.patterns.d;
    if (dateMask.indexOf("MM") === -1) {
        dateMask = dateMask.replace("M", "MM");
    }
    if (dateMask.indexOf("dd") === -1) {
        dateMask = dateMask.replace("d", "dd");
    }
    if (dateMask.indexOf("yyyy") === -1) {
        dateMask = dateMask.replace("yy", "yyyy");
    }

    return dateMask;
}

function kendoMaskedDatePickerValidate(obj) {
    if (obj !== undefined) {
        let dateMaskError1 = "__/__/____";
        let dateMaskError2 = "____/__/__"
        let isValid = setDatePattern(obj);
        let data = $("#" + obj).val();
        let erroMsg = "";
        if (isValid == false) {
            erroMsg = $("#" + obj).attr("data-val-date");
        }
        else if ($('#' + obj).parents(".editor-field").first().find(".k-invalid").length > 0 && erroMsg == "") {
            if ($('#' + obj).attr('aria-invalid') != undefined && $('#' + obj).attr('aria-invalid') == "true") {
                if ($("#" + obj).attr("data-val-date").trim() != $('#' + obj + '_validationMessage').text().trim()) {
                    erroMsg = $('#' + obj + '_validationMessage').text().trim();
                }
            }
        }

        if (data !== "" && data != dateMaskError1 && data != dateMaskError2) {
            ClearKendoValidatorFieldMessage($("#" + obj));
            if (erroMsg != "") {
                setKendoValidatorFieldMessage($("#" + obj), erroMsg);
            }
        }
        $("#" + obj).removeAttr("aria-placeholder");
        manageCalender508Support();
    }
}

function ClearKendoValidatorFieldMessage(field) {
    $(field).resetValidation();
}

function setDatePattern(obj) {
    let isValid = false;
    let dateValue = replaceAll($("#" + obj).val(), "_", "");
    let maskFormat = formatCultureDateMask();
    let data = kendo.toString(kendo.parseDate(dateValue, maskFormat), maskFormat);
    if (isNaN(data)) {
        $("#" + obj).kendoMaskedDatePicker();
        $("#" + obj).val(data);
        isValid = true;
    }
    return isValid;
}

function checkMinMaxDate(obj) {
    let isValid = true;
    let dateValue = replaceAll($("#" + obj).val(), "_", "");
    let maskFormat = formatCultureDateMask();
    let globalMaskFormat = "yyyy/MM/dd";
    if (globalDateMin.indexOf(".") >= 0) {
        globalMaskFormat = "yyyy.MM.dd";
    }
    if (globalDateMin.indexOf("-") >= 0) {
        globalMaskFormat = "yyyy-MM-dd";
    }

    let data = kendo.toString(kendo.parseDate(dateValue, maskFormat), maskFormat);
    if (isNaN(data)) {
        let dateMin = globalDateMin;
        let dateMax = globalDateMax;
        if (kendo.parseDate(globalDateMin, globalMaskFormat) != null) {
            dateMin = kendo.parseDate(globalDateMin, globalMaskFormat);
            dateMax = kendo.parseDate(globalDateMax, globalMaskFormat);
        }
        if (kendo.parseDate(dateValue, maskFormat) < kendo.parseDate(dateMin) ||
            kendo.parseDate(dateValue, maskFormat) > kendo.parseDate(dateMax)) {
            $("#" + obj).kendoMaskedDatePicker();
            $("#" + obj).val(data);
            isValid = false;
        }
    }
    return isValid;
}

function checkRedactedEIN(obj) {
    let isValid = false;
    let einRawValue = null;
    let einRawValueMasked = null;

    // Since the specified widget is redacted, get the raw value.
    let einWidgetRawVal = $("#" + obj + "RawVal");

    if (einWidgetRawVal != null && einWidgetRawVal.length > 0) {
        einRawValue = $(einWidgetRawVal).val();
        einRawValueMasked = einRawValue.substr(0, 2) + "-" + einRawValue.substr(2, 7);
        isValid = new RegExp(decodeURIComponent(globalEncodedEINRegularExpression), "g").test(einRawValueMasked);
    }
    return isValid;
}

function checkRedactedSSN(obj) {
    let isValid = false;
    let ssnRawValue = null;
    let ssnRawValueMasked = null;

    // Since the specified widget is redacted, get the raw value.
    let ssnWidgetRawVal = $("#" + obj + "RawVal");

    if (ssnWidgetRawVal != null && ssnWidgetRawVal.length > 0) {
        ssnRawValue = $(ssnWidgetRawVal).val();
        ssnRawValueMasked = ssnRawValue.substr(0, 3) + "-" + ssnRawValue.substr(3, 2) + "-" + ssnRawValue.substr(5, 4);
        isValid = new RegExp(decodeURIComponent(globalEncodedSSNRegularExpression), "g").test(ssnRawValueMasked);
    }
    return isValid;
}

function ClearKendoMaskedDateError(event, obj) {
    if ((event.keyCode == 9) && $('div.k-animation-container .k-calendar-container').is(":visible")) {
        $('div.k-animation-container .k-calendar-container').hide();
    }
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        if ($("#" + obj).val().slice(-1) >= 0) {
            kendoMaskedDatePickerValidate(obj);
            let datepicker = $("#" + obj).data("kendoDatePicker");
            datepicker.element.focus();
        }
    }
    clearGeneralMessages();
}

// This function sets the open event on date picker calendars, which automatically sets the
// calendar to today's date if the date picker doesn't contain a date.
function setDateCalendarOpenEvent() {
    $("span.k-datepicker").each(function () {
        let datePickerId = $(this).find("input").attr("id");
        let datePickerWidget = $("#" + datePickerId).data("kendoDatePicker");
        datePickerWidget.bind("open", function (e) {
            if ($(e.sender.element[0]).val() == undefined || $(e.sender.element[0]).val() == "") {
                e.sender.value(null);
                this.dateView.current(new Date());
            }
        });
    });
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function setHelpContentKey(str) {
    helpContentKey = str;
}

function setDefaultCloseOnEscape(panelId, closeFunctionName) {
    $('#' + panelId).keydown(function (e) {
        let keycode = e.keyCode ? e.keyCode : (e.which ? e.which : e.charCode);
        if (keycode === 27) {
            checkExecuteLocalFunctionByName(closeFunctionName, null);
        }
    });
}

function checkExecuteLocalFunctionByName(functionName, defaultReturnValue) {
    let returnValue = defaultReturnValue;
    if ($.isFunction(functionName)) {
        returnValue = functionName();
    }
    return returnValue;
}

(function ($) {
    let kendo = window.kendo,
        ui = kendo.ui,
        widget = ui.Widget,
        bookMarked = "fa-solid",
        bookMarkSelected = " b-selected",
        bookMarkRemoved = "fa-regular",
        bookmarkCss = " fa-bookmark bookmark-icon",
        onSaveSuccessEvent = "onSaveSuccess",
        onSaveFailureEvent = "onSaveFailure",
        onDeleteSuccessEvent = "onDeleteSuccess",
        onDeleteFailureEvent = "onDeleteFailure",
        onReadSuccessEvent = "onReadSuccess",
        onReadFailureEvent = "onReadFailure",
        clickEvent = "click",
        bookMark = widget.extend({
            init: function (element, options) {
                let that = this;
                widget.fn.init.call(that, element, options);
                element = that.element;
                that._icon = $('<i></i>')
                    .attr({ id: 'bookMark' })
                    .addClass(bookMarkRemoved + bookmarkCss);

                element.addClass("bookMark");

                element.append(that._icon);
                element.on(clickEvent, $.proxy(that._click, that));
            },
            options: {
                name: "BookMark",
                toolTip: "BooKMark",
                saveUrl: '',
                deleteUrl: '',
                readUrl: '',
                item: []
            },
            _icon: [],
            events: [
                onSaveSuccessEvent, onSaveFailureEvent, onDeleteSuccessEvent, onDeleteFailureEvent, onReadSuccessEvent,
                onReadFailureEvent
            ],
            read: function () {
                let that = this;
                that._showProgress();
                makeAsyncWebApiCall(that.options.readUrl,
                    "POST",
                    JSON.stringify(that.options.item),
                    "application/json",
                    $.proxy(that._onReadSuccess, that),
                    $.proxy(that._onReadFailure, that));
            },
            _showProgress: function () {
                let that = this;
                kendo.ui.progress(that.element, true);
            },
            _hideProgress: function () {
                let that = this;
                kendo.ui.progress(that.element, false);
            },
            _click: function (e) {
                let that = this;
                that._showProgress();
                if (that.options.item.BookMarkId == "") {
                    makeAsyncWebApiCall(that.options.saveUrl,
                        "POST",
                        JSON.stringify(that.options.item),
                        "application/json",
                        $.proxy(that._onSaveSuccess, that),
                        $.proxy(that._onSaveFailure, that)
                    );
                } else {
                    makeAsyncWebApiCall(that.options.deleteUrl,
                        "POST",
                        JSON.stringify(that.options.item),
                        "application/json",
                        $.proxy(that._onDeleteSuccess, that),
                        $.proxy(that._onDeleteFailure, that));
                }
            },
            _onSaveSuccess: function (result) {
                let that = this;
                that._hideProgress();
                if (result != undefined && result.Data != null) {
                    that.options.item.BookMarkId = result.Data.BookMarkId;
                    that._icon
                        .removeClass(bookMarkRemoved + " " + bookmarkCss)
                        .addClass(bookMarked + " " + bookmarkCss + " " + bookMarkSelected);
                    that.trigger(onSaveSuccessEvent);
                }
            },
            _onSaveFailure: function (result) {
                let that = this;
                that._hideProgress();
                that._icon
                    .removeClass(bookMarked + " " + bookmarkCss + " " + bookMarkSelected)
                    .addClass(bookMarkRemoved + " " + bookmarkCss + " ");
                that.trigger(onSaveFailureEvent);
            },
            _onDeleteSuccess: function () {
                let that = this;
                that.options.item.BookMarkId = '';
                that._hideProgress();
                that._icon
                    .removeClass(bookMarked + " " + bookmarkCss + " " + bookMarkSelected)
                    .addClass(bookMarkRemoved + " " + bookmarkCss + " ");
                that.trigger(onDeleteSuccessEvent);
            },
            _onDeleteFailure: function () {
                let that = this;
                that._hideProgress();
                that._icon
                    .removeClass(bookMarkRemoved + " " + bookmarkCss)
                    .addClass(bookMarked + " " + bookmarkCss + " " + bookMarkSelected);
                that.trigger(onDeleteFailureEvent);
            },
            _onReadSuccess: function (e) {
                let that = this;
                that._hideProgress();
                if (e.Data != undefined && e.Data.BookMarkId != "") {
                    that.options.item.BookMarkId = e.Data.BookMarkId;
                    that._icon
                        .removeClass(bookMarkRemoved + " " + bookmarkCss)
                        .addClass(bookMarked + " " + bookmarkCss + " " + bookMarkSelected);
                }
                that.trigger(onReadSuccessEvent);
            },
            _onReadFailure: function () {
                let that = this;
                that._hideProgress();
                that._icon
                    .removeClass(bookMarked + " " + bookmarkCss + " " + bookMarkSelected)
                    .addClass(bookMarkRemoved + " " + bookmarkCss + " ");
                that.trigger(onReadFailureEvent);
            }
        });
    kendo.ui.plugin(bookMark);
})(jQuery);

function SaveSearchFavorite() {
    let favoriteDiv = document.getElementById("divFavorites");
    let hideFavBody = $('#HideFavoritesBody');
    if (favoriteDiv != null && favoriteDiv.style.visibility === "visible") {
        if (hideFavBody != null && hideFavBody.is(':visible') === false) {
            ExpandHelpItem('divFavoritesBody', 'ShowFavoritesBody', 'HideFavoritesBody');
        }
        $("#favoriteHelpContent").addClass('display-none');
        $("#moduleContent").removeClass('display-none');
        refreshFavoritesContent();
    }
    else {
        getFavorites();
    }
    AddSearchFavorite();
}

// used to temporarily disable the sort and filter while adding new inline editor row.
// After successfull update or cancel , the grid is reloaded back so that proper sorting and filtering attributes are added back
function removeSortForInlineEditorNewRow(gridId) {
    let grid = $(gridId).data("kendoGrid");
    let sorting = grid.dataSource.sort();
    let filtering = grid.dataSource.filter();
    if (filtering) {
        grid.dataSource.filter(null);
    }
    if (sorting) {
        grid.dataSource.sort(null);
    }
}

// disable the sorting of the inline grid header while a row is being edited
function disableSortingForInlineEditor(elementId) {
    $(elementId).find('th.k-header').css('pointer-events', 'none');
    $(elementId + ' .k-grid-header .k-link .k-header').click(function (e) {
        return false;
    });
}

// enable the sorting of inline grid header.
function enableSortingForInlineEditor(elementId) {
    $(elementId + ' .k-grid-header .k-link .k-header').unbind('click');
    $(elementId).find('th.k-header').css('pointer-events', 'auto');
}

//-----------------------------------------------------------------------------------------
// Functions for 508 Compliance
//-----------------------------------------------------------------------------------------
function accessibility508Support(panelId) {
    if (!panelId) {
        panelId = "";
    }

    $(panelId + 'input, select, textarea').each(function () {
        let inputId = $(this).attr('id');
        if (inputId) {
            label = $('label[for="' + inputId + '"]');
            if (label.length == 0) {
                let labelText = ($(this).attr('type') === 'button' && $(this).val() && $.trim($(this).val()) !== '') ? $(this).val() : inputId;
                $('<label id="' + inputId + 'Label" for="' + inputId + '" class="display-none">' + labelText + '</label>').insertBefore(this);
                $("#" + inputId).attr("aria-labelledby", inputId + 'Label');
            }
        }
    });
    let inputs = document.querySelectorAll(panelId + '.editor-field input.k-textbox[readonly]');
    inputs.forEach(function (input) {
        let labelDiv = input.closest('.editor-field').previousElementSibling;
        let label = labelDiv.querySelector('label');
        if (label) {
            let labelId = label.getAttribute('id');
            input.setAttribute('aria-labelledby', labelId);
        }
    });
    $(panelId + "div[data-role='wizard'] .k-step-link").each(function () {
        let wizardLabel = $(this).find(".k-step-label").text();
        $(this).attr("title", wizardLabel);
    });

    // Fix the "Certain ARIA roles must be contained by particular parents" issue in the treeview
    $(panelId + '.k-treeview').find('ul.k-group').each(function () {
        // Add the "tree" role to the ul element
        $(this).attr("role", "group");
    });

    // Add title attribute to textboxes with Search icon at the end of them.
    $(panelId + "span.k-textbox span.k-picker-wrap span.k-select span.k-icon.k-i-search").each(function () {
        $(this).attr("title", globalSearchLabel);
    });

    $(panelId + ".content-ordered-panel-hdr-tools .panel-icon .fa-xmark").each(function () {
        $(this).attr("title", globalClose);
    });

    //Add tabbing for DateTeme Picker Buttons
    let dateTimePickerButtons = document.querySelectorAll(panelId + '.k-datetimepicker button.k-icon-button');
    dateTimePickerButtons.forEach(function (e) {
        e.tabIndex = "0";
        e.removeAttribute('unselectable');
    });

    manageLabel508Support(panelId);
    manageGrid508Support(panelId);
    manageTooltipDescriptions508(panelId);
    manageDropDownListPopup508Support(panelId);
}
//Add title to Labels for languages with truncated copy
function manageLabel508Support(panelId) {
    $(panelId + "label").each(function () {
        let labelText = $(this).attr("aria-label");
        $(this).attr("title", labelText);
        $(this).removeAttr("aria-label");
    });
}
// Remove disabled attribute and update aria-hidden to false
function updateAriaHidden() {
    $('input, select, textarea').each(function () {
        if ($(this) !== null && $(this).length > 0) {
            $(this).attr('aria-hidden', 'false');
        } else {
            $(this).attr('aria-hidden', 'true');
        }
    });
}

function addAriaHidden(container) {
    if (container) {
        $(container).find('input, select, textarea').each(function () {
            $(this).attr('aria-hidden', 'true');
        });
    }
    else {
        $('input, select, textarea').each(function () {
            $(this).attr('aria-hidden', 'true');
        });
    }
}

function removeAriaHidden(container) {
    if (container) {
        $(container).find('input, select, textarea').each(function () {
            $(this).attr('aria-hidden', 'false');
        });
    }
    else {
        $('input, select, textarea').each(function () {
            $(this).attr('aria-hidden', 'false');
        });
    }
}

// TODO: Remove this function call from all modules, then remove manageFormControls508Support() from core.common.js
function manageFormControls508Support() {
    ////    manageInputControl508Support();
    ////    manageCalender508Support();
    ////    manageNumericTextbox508Support();
    ////    manageGrid508Support();
}

// TODO: manageAjaxForm508Support() is only called by Provider Portal.  Change all function calls to accessibility508Support()
// and remove manageAjaxForm508Support() from core.common.js
function manageAjaxForm508Support() {
    accessibility508Support();
}

// TODO: Remove this function call from all modules, then remove manageInputControl508Support() from core.common.js
function manageInputControl508Support() {
    ////    let hiddenSpan = "<span aria-hidden='true' class='display-none'>None</span>";

    ////    if ($('#activeScreen').val() === "") {
    ////        $('#activeScreen').append(hiddenSpan);
    ////    }

    ////    $("label:empty").each(function () {
    ////        $(this).html(hiddenSpan);
    ////    });

    ////    $("label:contains('\u00a0')").each(function () {
    ////        if ($(this).html() === "&nbsp;") {
    ////            $(this).append(hiddenSpan);
    ////        }
    ////    });

    ////    $("button:empty, button span:empty").each(function () {
    ////        if ($(this).text() === '') {
    ////            $(this).append(hiddenSpan);
    ////        }
    ////    });

    ////    $('input, select, textarea').each(function () {
    ////        let inputId = $(this).attr('id');
    ////        if (inputId) {
    ////            let label = $('label[for="' + inputId + '"]');
    ////            if (label.length == 0) {
    ////                $('<label id="' + inputId + 'Label" for="' + inputId + '" class="display-none">' + inputId + '</label>').insertBefore(this);
    ////            }
    ////        }
    ////    });
}

function manageGrid508Support(panelId) {
    $(panelId + ".k-grid .k-grid-header table[role='none']").each(function () {
        $(this).attr("role", "grid");
    });
    $(panelId + "#ViewGridDataFilterPopup").attr("title", "Grid Data Filter Popup");
    $(panelId + "#availableListItems .k-listview-content").attr("aria-labelledby", "availableListItemsLabel");
    $(panelId + "#selectedListItems .k-listview-content").attr("aria-labelledby", "selectedListItemsLabel");
    $(panelId + "#selectedListItems .k-listview-item").attr("title", "Select List Option");
    $(panelId + "#availableListItems").attr("tabindex", "0");
}

// Bug 3154528: Associate focusable form controls with their label and tooltip help icon
// so NVDA reads both the field label and tooltip description when user tabs to the field.
// Kendo widgets replace native inputs with wrapper spans that lose the label[for] association.
function manageTooltipDescriptions508(panelId) {
    $(panelId + ".editor-label").each(function () {
        let labelEl = $(this).find("label[id]").first();
        if (labelEl.length === 0) return;
        let labelId = labelEl.attr("id");
        let helpIcon = $(this).find("span.fa-circle-question[id]").first();
        let tooltipText = helpIcon.length > 0 ? helpIcon.attr("title") : null;
        let editorField = $(this).siblings(".editor-field").first();
        if (editorField.length === 0) return;

        // Bug 3363643: Radio buttons - each input.k-radio gets tooltip text as description
        if (tooltipText && editorField.find(".assoc-box-radio-btn-list-horz, .assoc-box-radio-btn-list-vert").length > 0) {
            let descId = helpIcon.attr("id") + "Desc";
            $("<span>").attr("id", descId).attr("hidden", "").text(tooltipText).appendTo(editorField);
            editorField.find("input.k-radio").each(function () {
                $(this).attr("aria-describedby", descId);
            });
            return;
        }

        let focusable = editorField.find("span.k-dropdownlist, span.k-combobox").first();
        if (focusable.length === 0) {
            focusable = editorField.find("input.k-input-inner, input.editor-control, textarea.editor-control").not("[type='hidden']").first();
        }
        if (focusable.length > 0) {
            if (tooltipText) {
                let descId = helpIcon.attr("id") + "Desc";
                $("<span>").attr("id", descId).attr("hidden", "").text(tooltipText).appendTo(editorField);
                focusable.attr("aria-labelledby", labelId + " " + descId);
            } else {
                focusable.attr("aria-labelledby", labelId);
            }
        }
    });

    // Bug 3363643: Checkboxes - help icon is inside .editor-field, not .editor-label
    $(panelId + ".editor-field.assoc-box-checkbox").each(function () {
        let helpIcon = $(this).find("span.fa-circle-question[id]").first();
        if (helpIcon.length === 0) return;
        let tooltipText = helpIcon.attr("title");
        let checkbox = $(this).find("input.k-checkbox").first();
        if (checkbox.length > 0 && tooltipText) {
            let descId = helpIcon.attr("id") + "Desc";
            $("<span>").attr("id", descId).attr("hidden", "").text(tooltipText).appendTo($(this));
            checkbox.attr("aria-describedby", descId);
        }
    });
}

// Commenting out the contents of this function as it doesn't seem to be needed any longer.  Not removing the function
// at this time because some modules are calling this function even though it does nothing.
function manageCalender508Support(panelId) {
    //    $(panelId + ".k-calendar .k-header a span:empty").each(function () {
    //        $(this).append($('<span aria-hidden="true" class="display-none">None</span>'));
    //    });

    //    // The code below was added because Kendo dynamically creates animation elements when a calendar in a datepicker element is clicked.  The problem was
    //    // Kendo was always using "nav-up" as the id when creating these elements, which caused AXE issues due to duplicate IDs.  The newer versions of Kendo appear
    //    // to be using a GUID as the ID for these elements.  If this is the case we may be able to remove this code in the future, but for now
    //    // I mimic what Kendo appears to be doing now with the code below.
    //    $("#nav-up").each(function () {
    //        let newGuid = createGuid();
    //        $(this).attr("id", newGuid);
    //        let calendarElem = $(this).parent().parent().find(".k-calendar-view table");
    //        if (calendarElem && calendarElem.length > 0) {
    //            calendarElem.attr("aria-labelledby", newGuid);
    //        }
    //    });
}

// Bug 3347565: Kendo's popup container div.k-list has no ARIA role, but its child
// option-label div has role="option" — an orphaned option breaks NVDA navigation.
// Adding role="listbox" to the container gives NVDA a valid accessibility tree.
function manageDropDownListPopup508Support(panelId) {
    let selector = (panelId && panelId.length > 0 ? panelId + " " : "") + "input[data-role='dropdownlist']";
    $(selector).each(function () {
        let $input = $(this);
        let ddl = $input.data("kendoDropDownList");
        if (!ddl || $input.data("popupA11yPatched")) return;
        $input.data("popupA11yPatched", true);

        ddl.bind("open", function () {
            if (ddl.list) {
                ddl.list.attr("role", "listbox");
            }
            if (ddl.ul) {
                ddl.ul.attr("aria-hidden", "false");
            }
        });

        ddl.bind("close", function () {
            if (ddl.ul) {
                ddl.ul.attr("aria-hidden", "true");
            }
        });
    });
}

//-----------------------------------------------------------------------------------------
// End of 508 Compliance
//-----------------------------------------------------------------------------------------

// Inline Grid Texbox Computed Name Fix
function inlineComplianceFix() {
    $(".k-grid-edit-row .k-textbox input").each(function () {
        $(this).attr("aria-label", $(this).attr("id"));
    });

    $(".k-grid-edit-row span.k-dropdown input").each(function () {
        $(this).attr("aria-label", $(this).attr("id"));
    });

    $(".k-grid-edit-row textarea").each(function () {
        $(this).attr("aria-label", $(this).attr("id"));
    });

    $(".k-grid-edit-row .k-maskedtextbox input").each(function () {
        $(this).attr("aria-label", $(this).attr("id"));
    });

    accessibility508Support();
}

function clearDropDownSearchFilter(e) {
    if (e.sender.filterInput.val().length > 0) {
        e.sender.filterInput.val("");
        e.sender.dataSource.filter({});
    }
}

function setDatesWithoutTimeZone(data, dateProperties) {

    if (itemsNotToCheck.length == 0 && data !== null && data.fields !== null) {
        $.each(Object.keys(data), function (i, itemNotToCheck) { if (Object.keys(data.fields).indexOf(itemNotToCheck) < 0) { itemsNotToCheck.push(itemNotToCheck); } });
    }

    $.each(data, function (key, value) {
        if ($.inArray(key, itemsNotToCheck) < 0) {
            if ($.type(data[key]) === 'object') {
                if (data[key].uid !== undefined) {
                    if (data[key].length === undefined || (data[key].length != undefined && data[key].length > 0)) {
                        data[key].__proto__ = null;
                    }

                    objectNames.push({ key: data[key].uid, objName: key });
                    setDatesWithoutTimeZone(data[key], dateProperties);
                }
                else if (data[key].uid === undefined && data[key].length > 0) {
                    findObjectNameForListObject(data[key], key);
                }
            }
            else {
                objectName = FindObjectName(data.uid);
                if (findDateTypeProperties(objectName, key, dateProperties)) {
                    data[key] = convertDateTimetoLocal(data[key]);
                }
            }
        }
    }
    );
}

function filterMaxDate(element) {
    element.kendoDatePicker({
        max: globalDateMaxMMDDYYYY
    });
}

function findObjectNameForListObject(listObject, objectName) {
    for (let i = 0; i < listObject.length; i++) {
        if ($.type(listObject[i]) === 'object' && listObject[i].uid === 'undefined' && listObject[i].length > 0) {
            findObjectNameForListObject(listObject[i], objectName);
        }
        else {
            objectNames.push({ key: listObject[i].uid, objName: objectName });
        }
    }
}

function FindObjectName(objectId) {
    let returnObjectName = '';
    $.each(objectNames, function (key, value) {
        if (value.key === objectId) {
            returnObjectName = value.objName;
            return;
        }
    });
    return returnObjectName;
}

function findDateTypeProperties(objectProperty, key, dateProperties) {
    if (objectProperty != '' && objectProperty != null) {
        for (let i = 0; i < dateProperties.length; i++) {
            if (Array.isArray(dateProperties[i][objectProperty])) {
                for (j in dateProperties[i][objectProperty]) {
                    if (dateProperties[i][objectProperty][j] == key) {
                        return true;
                    }
                }
            }
        }
    }
    else {
        if ($.inArray(key, dateProperties) != -1) {
            objectName = '';
            return true;
        }

    }
}

function convertDateTimetoLocal(dateValue) {
    if (dateValue === null) {
        dateValue = '';
    }
    let chkTimeZone = dateValue.toString().split(" ").length;
    let timeString;
    if (chkTimeZone > 2 && isValidDate(dateValue)) {
        dateValue = new Date(dateValue);
        if (getTotalHours(dateValue) >= 24) {
            dateValue = AddDaysToDate(new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate()), 1);
        }
        timeString = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getDate() + ' ' + dateValue.getHours() + ':' + dateValue.getMinutes() + ':' + dateValue.getSeconds();
    }
    else {
        timeString = dateValue;
    }
    return timeString;
}

function isValidDate(dateTime) {
    let parsedDate = Date.parse(dateTime);
    if (!isNaN(parsedDate)) {
        return true;
    }
    return false;
}

function getTotalHours(dateForHours) {
    let dateHours = dateForHours.getHours();
    let dateMinutes = dateForHours.getMinutes();
    let dateSeconds = dateForHours.getSeconds();
    let totalHours = dateHours + (dateMinutes / 60) + (dateSeconds / 3600);
    return (totalHours + (new Date).getTimezoneOffset() / 60);
}

function AddDaysToDate(date, noOfDays) {
    let dateTimezoneOffset = date.getTimezoneOffset() * 60 * 1000,
        dateTime = date.getTime(),
        dateObject = new Date(),
        currentTimezoneOffest;

    dateTime += (1000 * 60 * 60 * 24) * noOfDays;

    currentTimezoneOffest = dateObject.getTimezoneOffset() * 60 * 1000;
    if (dateTimezoneOffset != currentTimezoneOffest) {
        let diffTimezoneOffset = currentTimezoneOffest - dateTimezoneOffset;
        dateTime += diffTimezoneOffset;
    }
    dateObject.setTime(dateTime);
    return dateObject;
}

function initializeHeadRoom() {
    // Headroom is only used on the main window.  For all other (e.g. MCB panels opened in separate windows), Headroom will not be applied.
    let isSeparateWindow = $("body").filter("[data-content]");
    if (isSeparateWindow !== null && isSeparateWindow.length > 0) {
        $("body").css("padding-top", "0");
    }
    else {
        // grab an element
        let myElement = document.querySelector("#pageHeader");
        // construct an instance of Headroom, passing the element
        //let headroom = new Headroom(myElement);
        let headroom = new Headroom(myElement, {
            // vertical offset in px before element is first unpinned
            offset: 150,
            // scroll tolerance in px before state changes
            tolerance: 0,
            // or you can specify tolerance individually for up/down scroll
            //tolerance : {
            //    up : 5,
            //    down : 0
            //},
            // css classes to apply
            classes: {
                // when element is initialised
                initial: "headroom",
                // when scrolling up
                pinned: "headroom--pinned",
                // when scrolling down
                unpinned: "headroom--unpinned"
                //// when above offset
                //    top : "headroom--top",
                //// when below offset
                //    notTop : "headroom--not-top",
                //// when at bottom of scoll area
                //    bottom : "headroom--bottom",
                //// when not at bottom of scroll area
                //    notBottom : "headroom--not-bottom"
            }
            //// element to listen to scroll events on, defaults to `window`
            //scroller : someElement,
            //// callback when pinned (`this` is headroom object)
            //onPin: function () {},
            //// callback when unpinned (`this` is headroom object)
            //onUnpin: function () {},
            //// callback when above offset, `this` is headroom object
            //onTop : function() {},
            //// callback when below offset, `this` is headroom object
            //onNotTop : function() {},
            //// callback when at bottom of page, `this` is headroom object
            //onBottom : function() {},
            //// callback when moving away from bottom of page, `this` is headroom object
            //onNotBottom : function() {}
        });
        // initialise
        headroom.init();
    }
}

//TODO: Need to research the following "fixes" before removing, as they cause runtime errors with Kendo 2023.1.117
////Fix for Editing of Complex Objects in Grid that got Broken by Kendo upgrade 2017.3.913
////kendo.ui.Grid.fn._dirtyIndicatorTemplate = function (field, paramName) {
////    if (field && paramName) {
////        return "#= " + paramName + " && " + paramName + ".dirty && " +
////            paramName + ".dirtyFields && " + paramName + ".dirtyFields['" + field + "'] ? '<span class=\"k-dirty\"></span>' : '' #";
////    }

////    return "";
////};

////kendo.ui.Grid.fn._dirtyCellTemplate = function (field, paramName) {
////    if (field && paramName) {
////        return "#= " + paramName + " && " + paramName + ".dirty && " +
////            paramName + ".dirtyFields && " + paramName + ".dirtyFields['" + field + "'] ? ' k-dirty-cell' : '' #";
////    }

////    return "";
////};

// Not sure this code is needed anymore since the recent Kendo upgrades, but some modules are calling this
// function, so leaving it here for now.
function addDropDownValidationSpan(panelId) {
    if (!panelId) {
        panelId = "";
    }

    $(panelId + ".k-dropdown").each(function () {
        let widget = $(this).find("input[data-role = 'dropdownlist']");
        if (widget.length > 0) {
            let dropDownName = $(widget).attr("name");
            let dropDownId = $(widget).attr("id");
            let duplicateSpanName = $('span[id="' + dropDownName + '_validationMessage"]');
            let duplicateSpanId = $('span[id="' + dropDownId + '_validationMessage"]');
            if (duplicateSpanName.length == 0 && duplicateSpanId.length == 0) {
                let validationSpan = '<span class="k-invalid-msg" id="' + dropDownName + '_validationMessage" data-for="' + dropDownName + '"></span>';
                $(this).parent().append(validationSpan);
            }
        }
    });
}

function setAutoCompleteCustomRules() {
    autoCompleteRules = {
        autoCompleteSubmitPage: function (input) {
            if (input.is("[data-invalid-code]")) {
                let autoCompleteSource = input.data("kendoAutoComplete");
                let autoCompleteData = autoCompleteSource.dataSource.data();
                let autoCompleteVal = autoCompleteSource.value();
                let autoCompleteIdVal = autoCompleteVal.split(" - ")[0].trim();
                let acOptions = autoCompleteSource.options;
                let containsFTs = [];
                let defaultVal = input[0].defaultValue;
                if (autoCompleteVal !== '') {
                    if (autoCompleteVal.length >= acOptions.minLength) {
                        if (autoCompleteData !== null && autoCompleteData.length !== 0) {
                            let matchedIds = $.grep(autoCompleteData, function (Item, Index) {
                                return $.trim(Item.ID).toLowerCase() === autoCompleteIdVal.toLowerCase();
                            });
                            if (!matchedIds.length) {
                                containsFTs = $.grep(autoCompleteData, function (Item, Index) {
                                    return $.trim(Item.FormattedText).toLowerCase().indexOf(autoCompleteVal.toLowerCase()) !== -1;
                                });
                            }
                            if (matchedIds.length === 1 || containsFTs.length === 1) {
                                let filteredArray = matchedIds.length ? matchedIds : containsFTs;
                                let textVal = filteredArray[0].FormattedText;
                                switch (acOptions.dataTextField) {
                                    case "ID":
                                        textVal = filteredArray[0].ID;
                                        break;
                                    case "Name":
                                        textVal = filteredArray[0].Name;
                                        break;
                                }
                                autoCompleteSource.value(textVal);
                                return true;
                            }
                            return false;
                        }
                        else if (defaultVal.toLowerCase() !== autoCompleteVal.toLowerCase()) {
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
                return true;
            }
            return true;
        },
        autoCompleteSearchPage: function (input) {
            if (input.is("[data-autocomplete-search]")) {
                let autoCompleteSource = input.data("kendoAutoComplete");
                let autoCompleteData = autoCompleteSource.dataSource.data();
                let autoCompleteVal = autoCompleteSource.value().trim();
                let autoCompleteIdVal = autoCompleteVal.split(" - ")[0].trim();
                let containsFTs = [];
                if (autoCompleteVal != '' && autoCompleteData !== null && autoCompleteData.length !== 0) {
                    let matchedIds = $.grep(autoCompleteData, function (Item, Index) {
                        return $.trim(Item.ID).toLowerCase() === autoCompleteIdVal.toLowerCase();
                    });
                    if (!matchedIds.length) {
                        containsFTs = $.grep(autoCompleteData, function (Item, Index) {
                            return $.trim(Item.FormattedText).toLowerCase().indexOf(autoCompleteVal.toLowerCase()) !== -1;
                        });
                    }
                    if (matchedIds.length === 1 || containsFTs.length === 1) {
                        let filteredArray = matchedIds.length ? matchedIds : containsFTs;
                        let textVal = filteredArray[0].FormattedText;
                        switch (autoCompleteSource.options.dataTextField) {
                            case "ID":
                                textVal = filteredArray[0].ID;
                                break;
                            case "Name":
                                textVal = filteredArray[0].Name;
                                break;
                        }
                        autoCompleteSource.value(textVal);
                        return true;
                    }
                    return true;
                }
                return true;
            }
            return true;
        }
    };
    autoCompleteMessages = {
        autoCompleteSubmitPage: function (intput) {
            return intput.attr("data-invalid-code");
        }
    };
}

function preventAction(ev) {
    ev.stopPropagation();
}

function sendSSO(url) {
    if (url.toLowerCase().startsWith('http') || url.toLowerCase().startsWith('www')) {
        //paramaterized url somehow get encoded, need to revert back.
        url = url.replace(/&amp;/g, "&");
        window.open(url);
    }
    else {
        openModalOverlay(ssoPanelId, url, 'panelForm-col-4', null, null, "closeModal");
    }
}

function removeMaskedTextboxValidationSpan(panelId) {

    $(panelId + "input[data-role = 'maskedtextbox']").each(function () {
        let widget = $(this);
        let spanIcon = null;
        if (widget.length > 0) {
            spanIcon = $(widget).next();
            if (spanIcon.hasClass("k-icon")) {
                $(spanIcon).remove();
            }
        }
    });
}

function toggleExternalPortalPolicyPanel(action, hash) {
    if (action === 'open') {
        if ($(policyPanel).css('display') === 'none') {
            $('#pageFooter').parent().find('form').children('div').hide();
            $(policyPanel).show();
        }
        //scroll to the correct bookmark
        externalPolicyPanelScrollTo();
        $('#policyPanel .extprtl-dshbrd-content-well-panel-bdy').scrollTo('a[name="' + hash + '"]');
    }
    else {
        $(policyPanel).hide();
        $('#pageFooter').parent().find('form').show();
    }
}

function hideExternalPortalPolicyPanel() {
    $('#pageFooter').parent().find('form').children('div').show();
    $(policyPanel).hide();
}

function externalPolicyPanelScrollTo() {
    jQuery.fn.scrollTo = function (elem) {
        $(this).animate({
            scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
        }, 1000);
        return this;
    };
}

function externalPortalAdjustments() {
    $('div.extprtl-dshbrd-right').each(function () {
        let titleHeight = parseInt($(this).find('div.extprtl-dshbrd-helpful-links-title').outerHeight());
        let contentHeight = parseInt($(this).find('div.extprtl-dshbrd-helpful-links-content').css('height'));
        let contentPadBottom = 20;
        let adjustedHeight = contentHeight - titleHeight - contentPadBottom;
        $('div.extprtl-dshbrd-helpful-links-content').css('height', adjustedHeight.toString() + "px");
    });
}

function orientationAdjustments() {
    // Adjust modal overlay, if one exists
    setOverlayHeight();
    // Adjust panel widow, if one exists
    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    if (width > 1281) {
        setPanelHeight();
    }
}

function filterInvalidDates(e) {
    e.container.find("[data-role=datepicker]").each(function (idx) {
        let element = $(this);
        MaskedDatePicker(element);
        $(element).closest('form').find('.k-primary').on("click", function (e) {
            let dt = $(element).data("kendoDatePicker");
            let value = dt.value();
            if (value === null) {
                dt.value('');
                e.preventDefault();
            }
        });
    });
}

function initSlidingPanel(panelId) {
    let slidingPanel = $("#" + panelId);
    $(slidingPanel).find(".sliding-panel-container").hide();
    $(slidingPanel).find(".sliding-panel-tab").click(function () {
        toggleSlidingPanel(slidingPanel);
    });
}

function toggleSlidingPanel(slidingPanelId) {
    $(slidingPanelId).find(".sliding-panel-container").animate({ width: "toggle" }, function () {
        let pnlCollapsed = $(slidingPanelId).attr("data-collapsed");
        if (pnlCollapsed !== undefined && pnlCollapsed.length > 0) {
            if (pnlCollapsed === "true") {
                $(slidingPanelId).find(".sliding-panel-tab-caret").removeClass("fa-solid fa-caret-right fa-lg");
                $(slidingPanelId).find(".sliding-panel-tab-caret").addClass("fa-solid fa-caret-left fa-lg");
                $(slidingPanelId).attr("data-collapsed", "false");
            }
            else {
                $(slidingPanelId).find(".sliding-panel-tab-caret").removeClass("fa-solid fa-caret-left fa-lg");
                $(slidingPanelId).find(".sliding-panel-tab-caret").addClass("fa-solid fa-caret-right fa-lg");
                $(slidingPanelId).attr("data-collapsed", "true");
            }
        }
        else {
            $(slidingPanelId).find(".sliding-panel-tab-caret").removeClass("fa-solid fa-caret-left fa-lg");
            $(slidingPanelId).find(".sliding-panel-tab-caret").addClass("fa-solid fa-caret-right fa-lg");
            $(slidingPanelId).attr("data-collapsed", "true");
        }
    });
}

function removeXSSThreat(url) {
    let securedURL = '';
    if (url !== '') {
        securedURL = url.replace(/<[a-zA-Z\/][^>]*>/g, '');
    }
    return encodeURIComponents(securedURL);
}

function encodeURIComponents(securedURL) {
    let query = securedURL.split('?')[1];
    securedURL = securedURL.split('?')[0];
    let queryParams = query.split("&");
    securedURL = securedURL + '?';
    for (let i = 0; i < queryParams.length; i++) {
        let pair = queryParams[i].split("=");
        securedURL = securedURL + pair[0] + "=" + encodeURIComponent(pair[1]) + '&';
    }
    return securedURL.substring(0, securedURL.length - 1);
}

function OnGridDataRequestEnd(e) {
    if (e.type === "read" && e.response) {
        let fields = [],
            data = jQuery.isArray(e.response) ? e.response : e.response.Data,
            index = 0,
            length = data.length;
        if (e.response.Data !== null && e.response.Data !== undefined) {
            if (e.sender.reader.model !== null && e.sender.reader.model !== undefined) {
                for (let field in e.sender.reader.model.fields) {
                    if (e.sender.reader.model.fields[field].type === "date") {
                        fields.push(field);
                    }
                }
            }
        }
        for (; index < length; index++) {
            let item = data[index];
            for (let name in item) {
                let prop = item[name];
                let dateFields = $.grep(fields, function (item) {
                    return item === name;
                });
                if (typeof prop === "string" && (prop.indexOf("/Date(") === 0 || dateFields.length > 0)) {
                    let localISOTime;
                    if (prop.indexOf("/Date(") === 0) {
                        let number = prop.substring(prop.indexOf("(") + 1, prop.indexOf(")"));
                        localISOTime = new Date(number * 1).toISOString().slice(0, -1);
                        item[name] = localISOTime;
                    } else if (new Date(prop).toString() !== 'Invalid Date' && prop.toUpperCase().indexOf("Z") != -1) {
                        localISOTime = new Date(prop.slice(0, -1));
                        item[name] = localISOTime;
                    }
                }
            }
        }
    }
}

function ISODateString(date) {
    function pad(n) { return n < 10 ? '0' + n : n; }
    return date.getFullYear() + '-'
        + pad(date.getMonth() + 1) + '-'
        + pad(date.getDate()) + 'T'
        + pad(date.getHours()) + ':'
        + pad(date.getMinutes()) + ':'
        + pad(date.getSeconds());
}

JSON.stringifyWithOutUTC = function (e) {
    Date.prototype.toJSON = function () {
        let isoTime = ISODateString(new Date(this));
        return isoTime;
    };
    let serializedContent = JSON.stringify(e);
    Date.prototype.toJSON = function () {
        return (new Date(this)).toISOString();
    };
    return serializedContent;
};

function formatToUsdCurrency(amountValue) {
    let inputAmount = "";
    if (amountValue != undefined && amountValue !== '') {
        inputAmount = parseFloat(amountValue).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
    }
    return inputAmount;
}

function multiSelectChangeEvent(e) {
    let currentWidget = $(e.sender.element);
    let currentWidgetId = $(currentWidget).prop("id");
    let currentWidgetTooltip;

    $("#" + currentWidgetId).parent().find("div.k-multiselect-wrap").find("li.k-button").each(function () {
        currentWidgetTooltip = $(this).find("span.k-icon.k-i-close").parent();
        if (currentWidgetTooltip !== null && currentWidgetTooltip.length > 0) {
            $(currentWidgetTooltip).attr("title", globalEntityDeleteMsg).attr("aria-label", globalEntityDeleteMsg).attr("data-role", "tooltip");
        }
    });
}

function postFormSetup(path, params) {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', path);

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            let hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    return form;
}

function postForm(path, params) {
    let form = postFormSetup(path, params)
    form.submit();
}

function postFormToPopupWindow(path, newWindowTitle, params) {
    let form = postFormSetup(path, params);
    if (newWindowTitle != null && newWindowTitle.length > 0) {
        let windowDimensions = initializePopUpWindowDimensions();
        form.setAttribute("target", newWindowTitle);
        window.open('', newWindowTitle, "toolbar=0,menubar=0,scrollbars=1,resizable=1,top=" + windowDimensions.popupTop + ",left=" + windowDimensions.popupLeft + ",width=" + windowDimensions.popupWidth + ",height=" + windowDimensions.popupHeight);
        form.target = newWindowTitle;
    }

    form.submit();
}

function postFormToNewTab(path, params) {
    let form = $('<form id="postToNewTabForm" target="_blank"></form>');
    form.attr("method", "post");
    form.attr("action", path);
    $.each(params, function (key, value) {
        let field = $('<input></input>');
        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);
        form.append(field);
    });

    $(document.body).append(form);
    form.submit();
    $("#postToNewTabForm").remove();
}

function getVerificationToken() {
    return $('input[name="__RequestVerificationToken"]').val();
}

//-----------------------------------------------------------------------------------------
// Functions for Kendo Charts
//-----------------------------------------------------------------------------------------
var chartColorSeriesTheme;
var chartThemes = kendo.dataviz.ui.themes;

function getChartColors(parentElem, selector, style) {
    elemstr = '<div ' + selector + '></div>';
    let $elem = $(elemstr).hide().appendTo(parentElem);
    val = $elem.css(style);
    $elem.remove();
    return val;
}

//An optional array of the predetermined color CSS classes can be passed in to get the colors in a specific order
function setChartColorSeries(totalCols, colors) {
    let cssClass = null;
    let cssIndex = null;
    let maxChartColors = 12;
    let cssSeriesAllColors = [];
    let cssSeriesColors = [];

    // Build array containing all defined chart colors in CSS, CSS styles can be passed in for a predetermined order
    if (typeof colors !== typeof undefined) {
        for (let n = 0; n < colors.length; n++) {
            cssSeriesAllColors[n] = getChartColors("body", "class=\"" + colors[n] + "\"", "background-color");
        }

        maxChartColors = colors.length;
    }
    else {
        for (let i = 0; i < maxChartColors; i++) {
            cssIndex = "00" + (i + 1);
            cssClass = "chart-item-pri" + cssIndex.slice(-2);
            cssSeriesAllColors[i] = getChartColors("body", "class=\"" + cssClass + "\"", "background-color");
        }
    }

    // Build array containing subset of colors for specific number of items in chart]
    if (totalCols > 0) {
        cssSeriesColors[0] = cssSeriesAllColors[0];
        if (totalCols > 1) {
            let colorInterval = maxChartColors / totalCols;
            for (let n = 1; n < totalCols - 1; n++) {
                cssSeriesColors[n] = cssSeriesAllColors[Math.round(n * colorInterval)];
            }
            cssSeriesColors[totalCols - 1] = cssSeriesAllColors[maxChartColors - 1];
        }
    }

    // Create Kendo chart template
    chartColorSeriesTheme = kendo.deepExtend(
        // Deep copy
        {},

        // Base theme
        chartThemes.default,

        {
            chart: {
                // Can contain any chart settings
                seriesColors: cssSeriesColors
            }
        }
    );
}
//-----------------------------------------------------------------------------------------
// End of Kendo Charts
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
// Functions for Mutation Observers
//-----------------------------------------------------------------------------------------
function initMutationObservers() {
    initValidationMsgObserver();
    initDatePickerObserver();
    initMultiSelectObserver();
    initUploadObserver();
    initKendoAnimationContainerObserver();
    initPageHeaderObserver();
}

function initValidationMsgObserver() {
    let elements = $("form").find("[data-role=autocomplete],[data-role=combobox],[data-role=datepicker],[data-role=datetimepicker],[data-role=dropdownlist],[data-role=maskedtextbox],[data-role=multiselect],[data-role=numerictextbox],[data-role=textbox],[data-role=timepicker],div.assoc-box-radio-btn-list-horz,textarea");

    vmObserver = new MutationObserver(function (vmMutations) {
        let idx = 0,
            vmMutation,
            length = vmMutations.length;

        for (; idx < length; idx++) {
            vmMutation = vmMutations[idx];
            if ((vmMutation.attributeName === "class") || (vmMutation.attributeName === "aria-invalid")) {
                updateValidationMsgOnChange(vmMutation);
            }
        }
    });
    let config = { attributes: true, childList: false, characterData: false, subtree: false };

    elements.each(function () {
        vmObserver.observe(this, config);
    });
}

function updateValidationMsgOnChange(e) {
    let element = $(e.target || e.srcElement);

    let elementErrors = element.parent("span.k-autocomplete")
        .add(element.closest("span.k-datepicker"))
        .add(element.closest("span.k-datetimepicker"))
        .add(element.closest("span.k-dropdownlist"))
        .add(element.parent("span.k-maskedtextbox"))
        .add(element.parent("span.k-multiselect"))
        .add(element.closest("span.k-numerictextbox"))
        .add(element.parent("span.k-textbox"))
        .add(element.closest("span.k-timepicker"))
        .add(element).siblings("span.k-form-error");

    elementErrors.each(function () {
        if ($(this).find("span.k-icon.k-i-warning").length == 0) {
            $(this).prepend("<span class='k-icon k-i-warning icon-spacer-right'></span>");
        }
    });
}

function initDatePickerObserver() {
    // This makes sure that the aria-placeholder="00/00/0000" attribute is removed from DatePicker controls.  This causes AXE issues.
    // NOTE: Once we move to using the DateInput configuration of the Kendo DatePicker, we should be able to remove this observer.
    let dpTarget = $(".k-datepicker input");
    // Options for the observer (which mutations to observe)
    let dpConfig = { attributes: true }
    dpObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "aria-placeholder") {
                $(mutation.target).removeAttr("aria-placeholder");
            }
        });
    });

    // Pass in the target node(s), as well as the observer options
    if (dpTarget != null) {
        dpTarget.each(function () {
            dpObserver.observe(this, dpConfig);
        });
    }
}

function initMultiSelectObserver() {
    // Capture and correct MultiSelect validation messages that are being incorrectly structured causing them to vary from the standard.
    // Node that will be observed for mutations
    let msTarget = $(".k-widget.k-multiselect")[0];
    // Options for the observer (which mutations to observe)
    let msConfig = { attributes: false, childList: true, characterData: false, subtree: true };
    msObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            let msNewNodes = mutation.addedNodes;
            if (msNewNodes !== null) {
                let msWidgetValidation = $(".k-multiselect span.k-form-error.k-invalid-msg.field-validation-error");
                if (msWidgetValidation !== null && msWidgetValidation.length > 0) {
                    $(msWidgetValidation).parent().after($(msWidgetValidation).detach());
                }
            }
        });
    });
    // Pass in the target node, as well as the observer options
    if (msTarget != null) {
        msObserver.observe(msTarget, msConfig);
    }
}

function initUploadObserver() {
    // Capture and perform modifications for the Kendo Upload widget.
    // Node that will be observed for mutations
    let uplTarget = $(".k-widget.k-upload")[0];
    // Options for the observer (which mutations to observe)
    let uplConfig = { attributes: false, childList: true, characterData: false, subtree: true };
    uplObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            let uplNewNodes = mutation.addedNodes;
            if (uplNewNodes !== null) {
                let uplWidgetButton = $(".k-upload-files button.k-upload-action");
                if (uplWidgetButton !== null && uplWidgetButton.length > 0) {
                    $(uplWidgetButton).attr("tabindex", "0");
                }
            }
        });
    });
    // Pass in the target node, as well as the observer options
    if (uplTarget != null) {
        uplObserver.observe(uplTarget, uplConfig);
    }
}

function initKendoAnimationContainerObserver() {
    // Capture and perform modifications for the Kendo Animation Container
    // Node that will be observed for mutations
    let kacTarget = document.documentElement || document.body;
    // Options for the observer (which mutations to observe)
    let kacConfig = { attributes: false, childList: true, characterData: false, subtree: true };
    kacObserver = new MutationObserver(function (kacMutations) {
        kacMutations.forEach(function (kacMutation) {
            let kacNewNodes = kacMutation.addedNodes;
            if (kacNewNodes !== null) {
                // Correct Grid filters that are being incorrectly structured causing 508 compliance(WAVE) errors.
                let kacChkboxFilter = $(".k-animation-container form li.k-item label.k-label input.k-checkbox");
                if (kacChkboxFilter !== null && kacChkboxFilter.length > 0) {
                    kacChkboxFilter.unwrap();
                }

                // Restructure radio button filter so re-styled radio buttons display properly.
                let radioId = null;
                let radioIndex = 0;
                $(".k-animation-container form div.k-filter-menu-container div.k-filter-help-text").siblings("label").each(function () {
                    radioIndex += 1;
                    radioId = "radioFilter" + radioIndex;
                    let kacRadioFilterTxt = $(this).text();
                    let child = this.firstChild;
                    while (child) {
                        let nextChild = child.nextSibling;
                        if (child.nodeType == 3) {
                            this.removeChild(child);
                        }
                        child = nextChild;
                    }
                    let kacRadioFilterElm = $(this).find("input[type='radio']");
                    $(kacRadioFilterElm).addClass("k-radio").attr("id", radioId);
                    $(kacRadioFilterElm).unwrap("label").wrap("<span class='list-item'></span>");
                    $(kacRadioFilterElm).parent("span.list-item").append("<label class='k-radio-label' for='" + radioId + "'>" + kacRadioFilterTxt + "</label>");
                });

                // Restructure DropDownList (with grouping) so that group labels are separate lines to prevent overlapping with list items
                $(".k-animation-container div.k-popup.k-group").each(function () {
                    if ($(this).find("ul[data-list-styled='data-list-styled']").length == 0) {
                        let groupLabel = null;

                        let groupListItemLabel = $(this).find(".k-list-item-group-label");
                        if (groupListItemLabel !== null && $(groupListItemLabel).length > 0) {
                            let groupListItem = $(groupListItemLabel).closest("li.k-list-item");
                            if (groupListItem !== null && $(groupListItem).length > 0) {
                                groupLabel = $(groupListItemLabel).detach();
                                if (groupLabel) {
                                    $(groupListItem).prepend(groupLabel);
                                }
                            }
                        }

                        let listGroupStickyHeader = $(this).find(".k-list-group-sticky-header").detach();
                        if (listGroupStickyHeader !== null && $(listGroupStickyHeader).length > 0) {
                            groupLabel = $(listGroupStickyHeader).removeAttr("style").removeClass("k-list-group-sticky-header").addClass("k-list-item-group-label");

                            $(this).find("ul li:first").prepend(groupLabel);
                        }

                        $(this).find("ul").attr("data-list-styled", "data-list-styled");
                    }
                });

                // Localize CLEAR tooltip in MultiSelect widget
                let kacClearTooltip = $(".k-multiselect-wrap .k-clear-value");
                if (kacClearTooltip !== null && kacClearTooltip.length > 0) {
                    $(kacClearTooltip).attr("title", globalEntityClearMsg);
                }

                // Add placeholder text to any DropDownList with a filter
                $(".k-animation-container .k-list-filter input.k-input-inner").each(function () {
                    $(this).attr("placeholder", globalComboSearchMsg);
                });
            }
        });
    });
    // Pass in the target node, as well as the observer options
    if (kacTarget != null) {
        kacObserver.observe(kacTarget, kacConfig);
    }
}

function initPageHeaderObserver() {
    // On page header movement, capture and adjust 1) MCB panels and 2) Filter Nav location,  whenever the page header hides/appears.
    // Node that will be observed for mutations
    let pghdrTarget = document.querySelector("#pageHeader");
    // Options for the observer (which mutations to observe)
    let pghdrConfig = { attributes: true };
    pghdrObserver = new MutationObserver(function (mutations) {
        if ($("#pageHeader").hasClass("headroom--pinned")) {
            // Apply MCB panel adjustments
            $("#mcbPanels").find(".mcb-panel").each(function () {
                let activePanel = $(this).attr("data-active");
                if (typeof activePanel !== typeof undefined && activePanel !== false) {
                    $(this).css("visibility", "visible");
                    $(this).removeAttr("data-active");
                }
            });

            // Apply Filter Nav adjustments
            if (($(window).scrollTop() + headerHeight) >= fltrNavPosTop) {
                $("#filterNav").css("position", "fixed");
                $("#filterNav").css("top", (headerHeight / 10).toString() + "rem");
            } else {
                $("#filterNav").css("position", "absolute");
                $("#filterNav").css("top", "auto");
            }
        }
        else if ($("#pageHeader").hasClass("headroom--unpinned")) {
            // Apply MCB panel adjustments
            $("#mcbPanels").find(".mcb-panel").each(function () {
                panelStatus = $(this).css("visibility");
                if (panelStatus == "visible") {
                    $(this).css("visibility", "hidden");
                    $(this).attr("data-active", "true");
                }
            });

            // Apply Filter Nav adjustments
            if ($(window).scrollTop() >= fltrNavPosTop) {
                $("#filterNav").css("position", "fixed");
                $("#filterNav").css("top", "0");
            }
            else {
                $("#filterNav").css("position", "absolute");
                $("#filterNav").css("top", "auto");
            }
        }
    });
    // Pass in the target node, as well as the observer options
    if (pghdrTarget != null) {
        pghdrObserver.observe(pghdrTarget, pghdrConfig);
    }
}

function positionDropdownErrorsWithIncellEditing(sectionId) {
    formatInLineGridCellError(sectionId);
}

function formatInLineGridCellError(sectionId) {
    // Fix positioning of error messages while using dropdowns in Kendo Grid with in-cell editing
    let targetDocument = sectionId != null ? document.getElementById(sectionId) : (document.documentElement || document.body);
    // Options for the observer (which mutations to observe)
    let dropDownConfig = { attributes: false, childList: true, characterData: false, subtree: true };
    let documentObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            let newNodes = mutation.addedNodes;
            if (newNodes !== null) {
                $(".k-grid td[role='gridcell']").find("div.k-tooltip.k-tooltip-error.k-validator-tooltip.k-invalid-msg.field-validation-error").each(function () {
                    $(this).replaceWith(function () {
                        $(this).find("span.k-callout").remove();
                        let msgInnerHtml = this.innerHTML;
                        let msgOuterHtml = $(this).clone().attr('style', '').empty();
                        let replacementSpan = $("<span>").append(msgInnerHtml);
                        $.each(msgOuterHtml[0].attributes, function (index, attribute) {
                            $(replacementSpan).attr(attribute.name, attribute.value);
                        });
                        return replacementSpan;
                    });
                });
            }
        });
    });

    // Pass in the target node, as well as the observer options
    if (targetDocument != null) {
        documentObserver.observe(targetDocument, dropDownConfig);
    }
}

function disconnectObserver(observer) {
    if (observer != null) {
        observer.disconnect();
    }
}

// Observe dynamically created at-a-glance panels (e.g. Forgot Password) for content injection
function initAagPanelObserver() {
    let aagPanelIds = ['divForgotUserName', 'divForgotPassword'];
    let bodyObserver = new MutationObserver(function (mutations) {
        aagPanelIds.forEach(function (id) {
            let panel = document.getElementById(id);
            if (panel && panel.childElementCount > 0 && !panel.dataset.initialized) {
                panel.dataset.initialized = 'true';
                commonPageEssentials('#' + id);
            }
        });
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
}

//-----------------------------------------------------------------------------------------
// End of Mutation Observers
//-----------------------------------------------------------------------------------------

function commonPageEssentials(panelId) {
    // This function performs common tasks required for pages and overlays.  It is called by default for most overlays and page,
    // but this function may need to be called explicitly from any Partial View to execute the code that is usually executed when the page is loaded
    // Since the partial views don't run the document.ready or window.load functions, this function needs to be called from the
    // partial views to execute any initial code

    // If a panelId is not set, make it an empty string.  If it is set append a space at the end as it will likely be concatenated
    // to other CSS classes to apply changes to various elements.
    if (!panelId) {
        panelId = '';
    }
    else {
        panelId = panelId + " ";
    }

    formatCommonBlocks(panelId);

    //changeBgColor(panelId);

    initializeTooltip(panelId);

    setupWindowWidgets();

    localizeWidgets(panelId);

    applyRedactions(panelId);

    configureReadOnlyControls(panelId);

    // Add 508 compliance...must always follow configureReadOnlyControls(), never precede
    accessibility508Support(panelId);

    // Reconfigure various Kendo widgets to provide proper structure, class styles, tabbing/focus
    reconfigureKendoWidgets(panelId);

    // Establish consistent validation message placement for DropDowns, DatePicker and MaskedTextBox, both standard and grid inline edit.
    removeMaskedTextboxValidationSpan(panelId);

    initializeContentPanels(panelId);

    // Reposition every secondary toolbar below the content area of its associated grid
    $(".k-grid").each(function () {
        if (!$(this).hasClass("k-treelist")) {
            let gridId = this.id;
            repositionGridSecondaryToolbar(gridId);
        }
    });

    // Reverse the tab index of the icons on the Panels/Subpanels
    reversePanelTabIndex();

    // Code for keyboard navigation for panels
    keyboardActivationForPanels();

    $("#pageBannerLogo").attr("tabindex", "0");

    configureButtonsWithIcons();

    initMutationObservers();

    $("div.card-panel").each(function () {
        let panelId = $(this).attr("id");
        adjustCards(panelId);
    });

    // The following section of code is a workaround provided by Telerik to resize the Stepper widget (either standalone
    // or within a Wizard) when its container is resized.  This ensures that the Stepper's internal elements are properly aligned.
    let stepper = $($(".k-stepper")[0]).data("kendoStepper");
    if (stepper !== undefined) {
        if (typeof ResizeObserver !== "undefined") {
            stepper._resizeObserver = new ResizeObserver(function () {
                stepper.resize();
            });
            stepper._resizeObserver.observe(stepper.wrapper[0]);
        }
    }
    // End of Telerik workaround
}

function adjustCards(panelId) {
    let maxCardTitleHeight = 0;
    let maxCardTitleBoldHeight = 0;
    let maxCardDescriptionHeight = 0;
    let maxCardBodyHeight = 0;
    let maxCardTitle2Height = 0;
    let maxCardTitle2BoldHeight = 0;
    let maxCardDateHeight = 0;
    let maxCardTagHeight = 0;

    // Determine the tallest element of each card in the panel save its height
    $("#" + panelId).find("div[data-card-role='carddetail']").each(function () {
        $(this).find("div.card-title-base.card-title").removeClass("display-none");
        let currentCardTitleHeight = $(this).find("div.card-title-base.card-title").height();
        if (currentCardTitleHeight > maxCardTitleHeight) {
            maxCardTitleHeight = currentCardTitleHeight;
        }

        $(this).find("div.card-title-base.card-title-bold").removeClass("display-none");
        let currentCardTitleBoldHeight = $(this).find("div.card-title-base.card-title-bold").height();
        if (currentCardTitleBoldHeight > maxCardTitleBoldHeight) {
            maxCardTitleBoldHeight = currentCardTitleBoldHeight;
        }

        $(this).find("div.card-description").removeClass("display-none");
        let currentCardDescriptionHeight = $(this).find("div.card-description").height();
        if (currentCardDescriptionHeight > maxCardDescriptionHeight) {
            maxCardDescriptionHeight = currentCardDescriptionHeight;
        }

        $(this).find("div.card-body").removeClass("display-none");
        let currentCardBodyHeight = $(this).find("div.card-body").height();
        if (currentCardBodyHeight > maxCardBodyHeight) {
            maxCardBodyHeight = currentCardBodyHeight;
        }

        $(this).find("div.card-title-base.card-title2").removeClass("display-none");
        let currentCardTitle2Height = $(this).find("div.card-title-base.card-title2").height();
        if (currentCardTitle2Height > maxCardTitle2Height) {
            maxCardTitle2Height = currentCardTitle2Height;
        }

        $(this).find("div.card-title-base.card-title2-bold").removeClass("display-none");
        let currentCardTitle2BoldHeight = $(this).find("div.card-title-base.card-title2-bold").height();
        if (currentCardTitle2BoldHeight > maxCardTitle2BoldHeight) {
            maxCardTitle2BoldHeight = currentCardTitle2BoldHeight;
        }

        $(this).find("div.card-date-container").removeClass("display-none");
        let currentCardDateHeight = $(this).find("div.card-date-container").height();
        if (currentCardDateHeight > maxCardDateHeight) {
            maxCardDateHeight = currentCardDateHeight;
        }

        $(this).find("div.card-tag-container").removeClass("display-none");
        let currentCardTagHeight = $(this).find("div.card-tag-container").height();
        if (currentCardTagHeight > maxCardTagHeight) {
            maxCardTagHeight = currentCardTagHeight;
        }
    });

    $("#" + panelId).find("div.card-title-base.card-title").each(function () {
        if (maxCardTitleHeight > 0) {
            $(this).height(maxCardTitleHeight);
        }
        else if (maxCardTitleHeight == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-title-base.card-title-bold").each(function () {
        if (maxCardTitleBoldHeight > 0) {
            $(this).height(maxCardTitleBoldHeight);
        }
        else if (maxCardTitleBoldHeight == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-description").each(function () {
        if (maxCardDescriptionHeight > 0) {
            $(this).height(maxCardDescriptionHeight);
        }
        else if (maxCardDescriptionHeight == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-body").each(function () {
        if (maxCardBodyHeight > 0) {
            $(this).height(maxCardBodyHeight);
        }
        else if (maxCardBodyHeight == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-title-base.card-title2").each(function () {
        if (maxCardTitle2Height > 0) {
            $(this).height(maxCardTitle2Height);
        }
        else if (maxCardTitle2Height == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-title-base.card-title2-bold").each(function () {
        if (maxCardTitle2BoldHeight > 0) {
            $(this).height(maxCardTitle2BoldHeight);
        }
        else if (maxCardTitle2BoldHeight == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-date-container").each(function () {
        if (maxCardDateHeight > 0) {
            $(this).height(maxCardDateHeight);
        }
        else if (maxCardDateHeight == 0) {
            $(this).addClass("display-none");
        }
    });

    $("#" + panelId).find("div.card-tag-container").each(function () {
        if (maxCardTagHeight > 0) {
            $(this).height(maxCardTagHeight);
        }
        else if (maxCardTagHeight == 0) {
            $(this).addClass("display-none");
        }
    });
}

function isCookiesDisabled() {
    //Function used to verify if the cookies are enabled. Cookies are required for the application to run
    //If the cookies are disabled, then display a page with an error an instructions
    if (!navigator.cookieEnabled) {
        //Redirect to the "Disabled Cookies" page here
        let errorPath = "/Error/ErrorCookies/";
        window.location.replace(errorPath);
    }
}

function keyboardActivationForPanels() {
    //***** Function to enable the space bar to activate the icons in the panels
    //Panel Close (x)
    $(".content-panel-container div.fa-xmark, .content-subpanel-container div.fa-xmark, .subsec-panel-container div.fa-xmark, .toc-panel-container div.fa-xmark, .mcb-panel-container div.fa-xmark, .dshbrd-panel-container div.fa-xmark").on("keypress click", function (e) {
        if (event.type == "click" || (event.type == "keypress" && event.keyCode === 32)) {
            //Close button
            closeAction(e, this);
        }
    });

    //Code used to expand/collapse the panels using the space bar
    $(".content-panel-container div.clickable, .content-subpanel-container div.clickable, .subsec-panel-container div.clickable, .toc-panel-container div.clickable, .mcb-panel-container div.clickable, .dshbrd-panel-container div.clickable").on("keypress click", function (e) {
        if (e.target.className.indexOf("fa-angle-up") > -1 || e.target.className.indexOf("fa-angle-down") > -1) {
            //Expand/Collapse button
            expandCollapseAction(e, this);
        }

        if ($(this).attr('id') == undefined) {
            e.stopImmediatePropagation();
        }
    });
}

isPhone = function () {
    //If the screen is less than 1280px, then treat the device as a phone
    let portrait = window.matchMedia("(orientation: portrait)");
    if ((window.matchMedia("(max-width: 1280px)").matches) && (window.matchMedia("(orientation: portrait)"))) {
        // This is a phone
        return true;
    } else {
        // Not a Phone
        return false;
    }
};

function removeImgVersion(fieldName) {
    let fileNameInput = $(fieldName);
    let fileNameValue = fileNameInput.val();
    let fileNameUpdated = fileNameValue.split("?")[0];
    fileNameInput.val(fileNameUpdated);
}

function createGuid() {
    function _p8(s) {
        let p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function configureButtonsWithIcons() {
    $("button.edit-btn").each(function (e) {
        $(this).attr("aria-label", globalGridEditBtn);
        let buttonIcon = $(this).find("i.fa-pen");
        if (buttonIcon.length == 0) {
            $(this).append("<i class='fa fa-solid fa-pen'></i>");
        }
    });
}

function checkForMailToLink(event) {
    let mailToLinkFound = false;
    if ($(event.target.activeElement) && $(event.target.activeElement).length > 0 && $(event.target.activeElement)[0].href && $(event.target.activeElement)[0].href.indexOf("mailto") != -1) {
        mailToLinkFound = true;
    }
    return mailToLinkFound;
}
function wizardOnSelect(e) {
    let currentStepIndex = e.step.options.index;
    if (currentStepIndex > lastCompletedStepIndex + 1) {
        e.preventDefault();
    }
    if (currentStepIndex == lastCompletedStepIndex + 1) {
        lastCompletedStepIndex = currentStepIndex;
    }
}
function resizePanelHeight() {
    let dashboardPanel = document.querySelectorAll('.extprtl-dshbrd-pane-back');
    let panelMaxHeight = 0;
    for (let i = 0; i < dashboardPanel.length; i++) {
        let panelHeight = dashboardPanel[i].clientHeight;
        panelMaxHeight = Math.max(panelMaxHeight, panelHeight);
    }

    for (let i = 0; i < dashboardPanel.length; i++) {
        dashboardPanel[i].style.height = panelMaxHeight + 'px';
    }
    let messagesPanel = document.querySelector('.extprtl-dshbrd-pane-msg-cntr');
    if (messagesPanel && messagesPanel.style) {
        messagesPanel.style.height = panelMaxHeight + 'px';
    }
    let coveragePanel = document.querySelector('.extprtl-dshbrd-pane-find-coverage');
    if (coveragePanel && coveragePanel.style) {
        coveragePanel.style.height = panelMaxHeight + 'px';
    }
    let reqCardPanel = document.querySelector('.extprtl-dshbrd-pane-req-card');
    if (reqCardPanel && reqCardPanel.style) {
        reqCardPanel.style.height = panelMaxHeight + 'px';
    }
    let findProviderPanel = document.querySelector('.extprtl-dshbrd-pane-find-provider');
    if (findProviderPanel && findProviderPanel.style) {
        findProviderPanel.style.height = panelMaxHeight + 'px';
    }
}

function setPanelValidationIndicators() {
    $(".content-panel-container").each(function () {
        let pnlContainer = $(this);
        let formErrCntr = 0;
        $(pnlContainer).find(".k-invalid-msg").each(function () {
            if ($(this).is(".k-form-error") && !$(this).is(".k-hidden")) {
                formErrCntr++;
            }
        });
        if (formErrCntr == 0) {
            $(pnlContainer).removeClass("content-panel-container-error");
        } else {
            $(pnlContainer).addClass("content-panel-container-error");
        }
    });
};
//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

$(document).ready(function () {
    hasSessionExpired = false;
    if (typeof globalIsExemptSessionTimeout !== 'undefined') {
        if (globalIsExemptSessionTimeout === 'False') {
            scheduleTimeoutPopup();
        }
    }
});

//----------------------------------------------------------
// CountDown and schedule PopUp Javascript Methods
//------------------------------------------------------------
var timeLeft, popupTimer, countDownTimer, popupDateTime;
var ajaxListener = new Object();
ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
ajaxListener.tempSend = XMLHttpRequest.prototype.send;

function stopTimers() {
    window.clearTimeout(popupTimer);
    window.clearTimeout(countDownTimer);
}

var showTimeoutPopup = function () {
    var title = globalSessionTimeOutNotification;
    var msg = globalSessionTimeOutNotificationMsg;
    msg = msg.replace('{0}', formatAMPM());
    msg = msg.replace('{1}', globalSessionTimeLeft);

    var buttonCancel = globalButtonCancelText;
    var buttonExtend = globalButtonExtendText;

    displayTimeoutPopup(msg);
    timeLeft = globalSessionTimeLeft * 60;
    popupDateTime = Date.now();
    updateCountDown();
};

var scheduleTimeoutPopup = function () {
    stopTimers();
    popupTimer = window.setTimeout(showTimeoutPopup, (globalSessionTimeOut - globalSessionTimeLeft) * 60 * 1000);
};

var updateCountDown = function () {
    //For some users the timer doesn't run when the browser does not have focus
    //For that case, check timestamps
    if (popupDateTime + globalSessionTimeLeft * 60 * 1000 > Date.now() && timeLeft > 0) {
        timeLeft--;
        countDownTimer = window.setTimeout(updateCountDown, 1000);
    } else {
        removeTimeOutPopup();
        logoffFunction();
    }
};

//---------------------------------------------
// Extension Methods
//---------------------------------------------
function continueFunction() {
    makeAsyncWebApiCall(extendSessionWebApiUrl, "PUT", null, "application/x-www-form-urlencoded", "processExtendSessionSuccess");
}

function processExtendSessionSuccess() {
    scheduleTimeoutPopup();
}

//---------------------------------------------
// Session Kill Methods
//---------------------------------------------
function logoffFunction() {
    makeAsyncWebApiCall(logoffWebApiUrl, "PUT", null, "application/x-www-form-urlencoded", "processLogoffSuccess");
}

function processLogoffSuccess(result) {
    hasSessionExpired = true;
    window.location = result.Data.RedirectUrl;
}

function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function displayTimeoutPopup(msg) {

    var decodedMsg = $("<div/>").html(msg).text();
    var alertDialog = $(
        "<div id='extendSessionPopup' class='modal-msg-panel-container-info role='dialog' aria-label='info'>" +
        "  <div class='panel-body-modal modal-msg-content'>" +
        "    <div class='clear-n-pad'>" +
        decodedMsg +
        "    </div>" +
        "    <div id='msgButtonRow' class='editor-button-row-modal'>" +
        "      <div class='align-center'>" +
        "        <input type='button' id='cancelModalButton' class='k-button btn-spacer-right' data-dismiss='modal' value='" + globalButtonCancelText + "' onClick='removeTimeOutPopup();' />" +
        "        <input type='button' id='extendButton' class='k-button' data-dismiss='modal' value='" + globalButtonExtendText + "' onClick='removeTimeOutPopup(); checkExecuteFunctionByName(\"continueFunction\", null);' />" +
        "      </div>" +
        "    </div>" +
        "  </div>" +
        "</div>"
    );

    alertDialog.kendoWindow({
        modal: {
            preventScroll: true
        },
        title: globalSessionTimeOutNotification,
        draggable: false,
        resizable: false
    });

    var alertWindow = alertDialog.data("kendoWindow");
    alertWindow.wrapper.find(".k-i-close").hide();

    var titleBar = alertWindow.wrapper.find(".k-window-titlebar");
    if (titleBar != undefined) {
        titleBar.addClass("modal-msg-title-info");
        titleBar.prepend("<i class='fa-solid modal-msg-icon-info fa-circle-info'></i>");
    }

    alertWindow.center().open();
    $("#extendSessionPopup").closest(".k-widget.k-window").prev().addBack().wrapAll("<aside id='modalTimeOutMessageAside' aria-label='Modal Message'>");
}

function removeTimeOutPopup() {
    let kendoWindow = $("#extendSessionPopup").data("kendoWindow");
    let overlayWrapper = $("[id*='divOverlayModelWrapper']");

    if (kendoWindow) {
        kendoWindow.destroy();
    }

    if ($("#modalTimeOutMessageAside").length > 0) {
        $("#modalTimeOutMessageAside").remove();
        if ($(".k-overlay").length > 1) {
            $(".k-overlay")[1].remove();
        }
    }

    let overlayExists = $(".k-widget.k-window").length > 0;

    // Make sure an overlay is not active before turning the scroll bar back on in the main content window.
    if ((overlayWrapper == undefined || overlayWrapper.length === 0) && !overlayExists) {
        $('html').css('overflow', 'auto');
    }
}

ajaxListener.callback = function () {
    if (typeof globalIsExemptSessionTimeout !== 'undefined') {
        if (globalIsExemptSessionTimeout === 'False') {
            scheduleTimeoutPopup();
        }
    }
};

XMLHttpRequest.prototype.open = function (a, b) {
    if (!a) {
        a = '';
    }
    if (!b) {
        b = '';
    }
    ajaxListener.tempOpen.apply(this, arguments);
    ajaxListener.method = a;
    ajaxListener.url = b;
    if (a.toLowerCase() === 'get') {
        ajaxListener.data = b.split('?');
        ajaxListener.data = ajaxListener.data[1];
    }
};

XMLHttpRequest.prototype.send = function (a, b) {
    if (!a) {
        a = '';
    }
    if (!b) {
        b = '';
    }
    ajaxListener.tempSend.apply(this, arguments);
    if (ajaxListener.method.toLowerCase() == 'post') {
        ajaxListener.data = a;
    }
    ajaxListener.callback();
};
;
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
};
/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
    'all_shortcuts': {},//All the shortcuts are stored in this array
    'add': function (shortcut_combination, callback, opt) {
        //Provide a set of default options
        var default_options = {
            'type': 'keydown',
            'propagate': false,
            'disable_in_input': false,
            'target': document,
            'keycode': false
        }
        if (!opt) opt = default_options;
        else {
            for (var dfo in default_options) {
                if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }

        var ele = opt.target;
        if (typeof opt.target == 'string') ele = document.getElementById(opt.target);
        var ths = this;
        shortcut_combination = shortcut_combination.toLowerCase();

        //The function to be called at keypress
        var func = function (e) {
            e = e || window.event;

            if (opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
                var element;
                if (e.target) element = e.target;
                else element = e.srcElement;
                if (element.nodeType == 3) element = element.parentNode;

                if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
            }

            //Find Which key is pressed
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            var character = String.fromCharCode(code).toLowerCase();

            if (code == 188) character = ","; //If the user presses , when the type is onkeydown
            if (code == 190) character = "."; //If the user presses , when the type is onkeydown

            var keys = shortcut_combination.split("+");
            //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
            var kp = 0;

            //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
            var shift_nums = {
                "`": "~",
                "1": "!",
                "2": "@",
                "3": "#",
                "4": "$",
                "5": "%",
                "6": "^",
                "7": "&",
                "8": "*",
                "9": "(",
                "0": ")",
                "-": "_",
                "=": "+",
                ";": ":",
                "'": "\"",
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|"
            }
            //Special Keys - and their codes
            var special_keys = {
                'esc': 27,
                'escape': 27,
                'tab': 9,
                'space': 32,
                'return': 13,
                'enter': 13,
                'backspace': 8,

                'scrolllock': 145,
                'scroll_lock': 145,
                'scroll': 145,
                'capslock': 20,
                'caps_lock': 20,
                'caps': 20,
                'numlock': 144,
                'num_lock': 144,
                'num': 144,

                'pause': 19,
                'break': 19,

                'insert': 45,
                'home': 36,
                'delete': 46,
                'end': 35,

                'pageup': 33,
                'page_up': 33,
                'pu': 33,

                'pagedown': 34,
                'page_down': 34,
                'pd': 34,

                'left': 37,
                'up': 38,
                'right': 39,
                'down': 40,

                'f1': 112,
                'f2': 113,
                'f3': 114,
                'f4': 115,
                'f5': 116,
                'f6': 117,
                'f7': 118,
                'f8': 119,
                'f9': 120,
                'f10': 121,
                'f11': 122,
                'f12': 123
            }

            var modifiers = {
                shift: { wanted: false, pressed: false },
                ctrl: { wanted: false, pressed: false },
                alt: { wanted: false, pressed: false },
                meta: { wanted: false, pressed: false }	//Meta is Mac specific
            };

            if (e.ctrlKey) modifiers.ctrl.pressed = true;
            if (e.shiftKey) modifiers.shift.pressed = true;
            if (e.altKey) modifiers.alt.pressed = true;
            if (e.metaKey) modifiers.meta.pressed = true;

            for (var i = 0; k = keys[i], i < keys.length; i++) {
                //Modifiers
                if (k == 'ctrl' || k == 'control') {
                    kp++;
                    modifiers.ctrl.wanted = true;

                } else if (k == 'shift') {
                    kp++;
                    modifiers.shift.wanted = true;

                } else if (k == 'alt') {
                    kp++;
                    modifiers.alt.wanted = true;
                } else if (k == 'meta') {
                    kp++;
                    modifiers.meta.wanted = true;
                } else if (k.length > 1) { //If it is a special key
                    if (special_keys[k] == code) kp++;

                } else if (opt['keycode']) {
                    if (opt['keycode'] == code) kp++;

                } else { //The special keys did not match
                    if (character == k) kp++;
                    else {
                        if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                            character = shift_nums[character];
                            if (character == k) kp++;
                        }
                    }
                }
            }

            if (kp == keys.length &&
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
                callback(e);

                if (!opt['propagate']) { //Stop the event
                    //e.cancelBubble is supported by IE - this will kill the bubbling process.
                    e.cancelBubble = true;
                    e.returnValue = false;

                    //e.stopPropagation works in Firefox.
                    if (e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    return false;
                }
            }
        }
        this.all_shortcuts[shortcut_combination] = {
            'callback': func,
            'target': ele,
            'event': opt['type']
        };
        //Attach the function with the event
        if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
        else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
        else ele['on' + opt['type']] = func;
    },

    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove': function (shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        var binding = this.all_shortcuts[shortcut_combination];
        delete (this.all_shortcuts[shortcut_combination])
        if (!binding) return;
        var type = binding['event'];
        var ele = binding['target'];
        var callback = binding['callback'];

        if (ele.detachEvent) ele.detachEvent('on' + type, callback);
        else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on' + type] = false;
    }
};
