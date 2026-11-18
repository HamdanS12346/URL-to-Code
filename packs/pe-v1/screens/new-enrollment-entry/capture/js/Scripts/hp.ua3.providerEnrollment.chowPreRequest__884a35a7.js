//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2022. All rights reserved.
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

(function (window, $, undefined) {
    $(document).ready(function () {
        if ($('input[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]:radio:checked').val() == undefined) {
            $("input[name='Provider.ChangeOfOwnership.IsChowRequired.ID']:radio").filter("[value='No']").prop("checked", true);
        }

        if ($('input[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]:radio:checked').val() == undefined || $('input:radio[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]')[1].checked === true) {
            $("#divTaxIdQuestion").hide();
            $("#divNPIQuestion").hide();
            $("#divPercentageQuestion").hide();
            setFieldAsNotRequired("Provider_ChangeOfOwnership_TaxIdTransfer_IsTaxIdTransfer", "Provider_ChangeOfOwnership_TaxIdTransfer_IsTaxIdTransfer");
            setFieldAsNotRequired("Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer", "Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer");
            setFieldAsNotRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
        }
        $(nextButtonId);

        // Fix tab order: Tab from percentage field should go to Start button
        // Skip divEnrollmentEvaluation section when CHOW percentage is the last user input
        // Bind to the visible spinner input since Kendo renders a separate input the user types into
        $("#divPercentageQuestion").on("keydown", "input", function (e) {
            if (e.keyCode === 9 && !e.shiftKey) {
                // Force the Kendo widget to commit its pending value and trigger jQuery change
                var numericTextBox = $("#Provider_ChangeOfOwnership_TotalPercentageChange").data("kendoNumericTextBox");
                if (numericTextBox) {
                    numericTextBox.value($(e.target).val());
                    $("#Provider_ChangeOfOwnership_TotalPercentageChange").trigger("change");
                }
                if ($(nextButtonId).is(":visible")) {
                    e.preventDefault();
                    $(nextButtonId).focus();
                }
            }
        });
    });

    $('input:radio[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]').change(function () {
        if ($('input[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]:radio:checked').val() != undefined && $('input:radio[name="Provider.ChangeOfOwnership.IsChowRequired.ID"]')[0].checked === true) {
            if (isTaxIDChangeRequiresNewEnrollment) {
                $("#divTaxIdQuestion").show();
                setFieldAsRequired("Provider_ChangeOfOwnership_TaxIdTransfer_IsTaxIdTransfer", "Provider_ChangeOfOwnership_TaxIdTransfer_IsTaxIdTransfer");
            }
            else if (isNpiChangeRequiresNewEnrollment) {
                $("#divNPIQuestion").show();
                setFieldAsRequired("Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer", "Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer");
            }
            else {
                $("#divPercentageQuestion").show();
                setFieldAsRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
            }
            $(nextButtonId).hide();
        }
        else {
            $("#divTaxIdQuestion").hide();
            $("#divNPIQuestion").hide();
            $("#divPercentageQuestion").hide();
            setFieldAsNotRequired("Provider_ChangeOfOwnership_TaxIdTransfer_IsTaxIdTransfer", "Provider_ChangeOfOwnership_TaxIdTransfer_IsTaxIdTransfer");
            setFieldAsNotRequired("Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer", "Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer");
            setFieldAsNotRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
            $("#Provider_ChangeOfOwnership_TotalPercentageChange").val('');
            $("#Provider_ChangeOfOwnership_TotalPercentageChangeSpinner").val('');
            clearPercentageSpinner();
            $("input[name='Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID']:radio").filter("[value='Yes']").prop("checked", false);
            $("input[name='Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID']:radio").filter("[value='No']").prop("checked", false);
            $("input[name='Provider.ChangeOfOwnership.TaxIdTransfer.IsTaxIdTransfer.ID']:radio").filter("[value='Yes']").prop("checked", false);
            $("input[name='Provider.ChangeOfOwnership.TaxIdTransfer.IsTaxIdTransfer.ID']:radio").filter("[value='No']").prop("checked", false);
            $("#IsChowEnrollment").val(false);
            showStartButton();
        }

        if (enableRequireCAQHEnrollmentForProviderType) {
            clearProviderTypeIdentifier();
            toggleNewEnrollmentTypeIdentifiers();
        }
    });

    $('input:radio[name="Provider.ChangeOfOwnership.TaxIdTransfer.IsTaxIdTransfer.ID"]').change(function () {
        if ($('input[name="Provider.ChangeOfOwnership.TaxIdTransfer.IsTaxIdTransfer.ID"]:radio:checked').val() != undefined && $('input:radio[name="Provider.ChangeOfOwnership.TaxIdTransfer.IsTaxIdTransfer.ID"]')[0].checked === true) {
            if (isNpiChangeRequiresNewEnrollment) {
                $("#divNPIQuestion").show();
                setFieldAsRequired("Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer", "Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer");
            }
            else {
                $("#divPercentageQuestion").show();
                setFieldAsRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
            }
            $(nextButtonId).hide();
        }
        else {
            $("#divNPIQuestion").hide();
            $("#divPercentageQuestion").hide();
            $("#Provider_ChangeOfOwnership_TotalPercentageChange").val('');
            $("#Provider_ChangeOfOwnership_TotalPercentageChangeSpinner").val('');
            clearPercentageSpinner();
            $("input[name='Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID']:radio").filter("[value='Yes']").prop("checked", false);
            $("input[name='Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID']:radio").filter("[value='No']").prop("checked", false);
            setFieldAsNotRequired("Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer", "Provider_ChangeOfOwnership_NPITransfer_IsNPITransfer");
            setFieldAsNotRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
            $(nextButtonId).hide();
            callPopup(messageTypeInfo, ChowTaxIDTransferTitle, taxIdInfoMessage, "showStartButton");
            $("#IsChowEnrollment").val(false);
        }
    });

    $('input:radio[name="Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID"]').change(function () {
        if ($('input[name="Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID"]:radio:checked').val() != undefined && $('input:radio[name="Provider.ChangeOfOwnership.NPITransfer.IsNPITransfer.ID"]')[0].checked === true) {
            $("#divPercentageQuestion").show();
            setFieldAsRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
            $(nextButtonId).hide();
        }
        else {
            $("#divPercentageQuestion").hide();
            $("#Provider_ChangeOfOwnership_TotalPercentageChange").val('');
            $("#Provider_ChangeOfOwnership_TotalPercentageChangeSpinner").val('');
            clearPercentageSpinner();
            setFieldAsNotRequired("Provider_ChangeOfOwnership_TotalPercentageChange", "Provider_ChangeOfOwnership_TotalPercentageChange");
            $(nextButtonId).hide();
            callPopup(messageTypeInfo, chowNPITransferTitle, npiInfoMessage, "showStartButton");
            $("#IsChowEnrollment").val(false);
        }
    });

    $("#Provider_ChangeOfOwnership_TotalPercentageChange").change(function (e) {
        if ($("#Provider_ChangeOfOwnership_TotalPercentageChange").val() != "" && parseInt($("#Provider_ChangeOfOwnership_TotalPercentageChange").val()) >= parseInt(minPercentage)) {
            $("#IsChowEnrollment").val(true);
            showStartButton();
        }
        else if ($("#Provider_ChangeOfOwnership_TotalPercentageChange").val() != "") {
            $(nextButtonId).hide();
            $("#IsChowEnrollment").val(false);
            callPopup(messageTypeInfo, ChowTotalPercentageTitle, chowLessPercentageInfo, "redirectAction");
        }
        else if ($("#Provider_ChangeOfOwnership_TotalPercentageChange").val() == "") {
            $(nextButtonId).hide();
            $("#IsChowEnrollment").val(false);
        }
    });

}(window, jQuery));

function callPopup(messageType, messagetitle, msg, actionmethod) {
    displayPopupDialogActionable(messageType, messagetitle, msg, actionmethod);
}

function redirectAction() {
    isStepDataDirty = false;
    window.location = $('#HomeUrl').val();
}

function showStartButton() {
    $(nextButtonId).show();
}

function clearPercentageSpinner() {
    var numericTextBox = $("#Provider_ChangeOfOwnership_TotalPercentageChange").data("kendoNumericTextBox");
    if (numericTextBox) {
        numericTextBox.value(null);
    }
}
