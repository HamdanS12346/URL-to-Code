//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

$("#mainMenuContainer").css("max-height", window.innerHeight);

function openMainMenu() {
    $("#mainMenuContainer").removeClass("display-none").addClass("display-flex");
    $("body").append("<div class='disabled-backdrop'></div>");
}

function closeMainMenu() {
    showLoadingDialog();
    $("#mainMenuContainer").removeClass("display-flex").addClass("display-none");
    $("body").find(".disabled-backdrop").remove();
    hideLoadingDialog();
}

// Add appropriate styles to grid filter dropdowns
$("#mainMenuClose").on("click", function () {
    closeMainMenu();
});
$(".child-menu").on("click", function () {
    closeMainMenu();
});

$("#mobileMenuIcon").on("click", function () {
    if ($(this).hasClass("fa-square-minus")) {
        $("#mainMenuItemContainer").css("height", "48vh");
    } else {
        $("#mainMenuItemContainer").css("height", "20vh");
    }

});

$("#mainMenuClose").on("keypress", function (e) {
    var spaceKey = 32;
    if (e.type == 'keypress' && e.which != spaceKey) {
        return;
    }
    closeMainMenu();
});

$("#mcbMenu").kendoMenu({
    openOnClick: true
});