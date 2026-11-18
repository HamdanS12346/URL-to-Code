//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var ssnMaskFormat = '&&&-&&-&&&&';
var einMaskFormat = '&&-&&&&&&&';

function downloadLetterPdf(result, atnNumber) {
    var fileName = atnNumber + ".PDF";
    if (result != null) {
        if (result.Data != null && result.Data.FileContents != null) {
            var blob = new Blob([result.Data.FileContents], { type: 'application/pdf' });
            var data = result.Data.FileContents;

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                //Internet Explorer Browser.
                var byteCharacters = atob(data);

                if (byteCharacters != null) {
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);
                    blob = new Blob([byteArray], { type: 'application/pdf' });
                    window.navigator.msSaveOrOpenBlob(blob, fileName);
                }
            }
            else {
                //Other Browsers.
                var dlnk = document.getElementById('dwnldLnk');
                if (dlnk != null) {
                    dlnk.href = "data:application/pdf;base64, " + data;
                    dlnk.download = fileName;
                    dlnk.click();
                }
            }
        }
    }
}

function modelToBoolean(modelBool) {
    if (!modelBool) {
        return false;
    }
    if (modelBool.toString().toLowerCase() == 'true') {
        return true;
    }
    return false;
}

function sealFieldFromCopying(fieldId) {
    if (fieldId) {
        $(fieldId).bind("cut copy paste", function (e) {
            e.preventDefault();
        });
    }
}

function enableDisableAssociationExportOptions() {
    var associationExportToExcel = "#AssociationExportToExcel";
    var associationExportToPDF = "#AssociationExportToPDF";
    var deleteAllEnrollmentProviderAssociation = "#providerAssociationDeleteAllButton";

    if (showIndividualAssociationPanelByDisplayRule == "True") {
        if ($(providerAssociationGridId).data("kendoGrid").dataSource.data().length > 0) {
            $(associationExportToExcel).attr("disabled", false);
            $(associationExportToPDF).attr("disabled", false);
            $(deleteAllEnrollmentProviderAssociation).attr("disabled", false);
            $(associationExportToPDF).removeClass('inactive-link');
        }
        else {
            $(associationExportToExcel).attr("disabled", true);
            $(associationExportToPDF).attr("disabled", true);
            $(deleteAllEnrollmentProviderAssociation).attr("disabled", true);
            $(associationExportToPDF).addClass('inactive-link');
        }
        if (hasRightsEnrollmentWithoutSave) {
            $("#providerAssociationDeleteAllButton").remove();
        }
    }
}

function enableDisableAssociationGroupExportOptions() {
    var groupAsociationExportToExcel = "#GroupAsociationExportToExcel";
    var groupAssociationExportToPDF = "#GroupAssociationExportToPDF";

    if (showGroupAssociationPanelByDisplayRule == "True") {
        if ($(providerGroupAssociationGridId).data("kendoGrid").dataSource.data().length > 0) {
            $(groupAsociationExportToExcel).attr("disabled", false);
            $(groupAssociationExportToPDF).attr("disabled", false);
            $(groupAssociationExportToPDF).removeClass('inactive-link');
        }
        else {
            $(groupAsociationExportToExcel).attr("disabled", true);
            $(groupAssociationExportToPDF).attr("disabled", true);
            $(groupAssociationExportToPDF).addClass('inactive-link');
        }
    }
}

function bindingMutlipleElementsGroup(className) {
    $("." + className).each(function () {
        var editorLabel = $(this).siblings("div.editor-label").detach();
        $(this).prepend(editorLabel);
    });
}

function formatPartialPostalCode(zipcodeElement) {
    var zipCodeElement = $("#" + zipcodeElement);
    if (zipCodeElement) {
        var zipValue = zipCodeElement.val();
        if (zipValue) {
            if (zipValue.length == 5) {
                zipCodeElement.val(zipValue + "-0000");
            } else if (zipValue.endsWith("-____")) {
                zipCodeElement.val(zipValue.replace("-____", "-0000"));
            }
        }
    }
}

function preventSaveForViewOnlyUsers(saveButton, deleteButton) {    
    if (hasRightsEnrollmentWithoutSave) {
        $("#" + saveButton).remove();
        $("#" + deleteButton).remove();
    }
}