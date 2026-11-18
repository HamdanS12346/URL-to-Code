
    if (!($("#Provider_TaxIdentification_SSNRawVal") !== null && $("#Provider_TaxIdentification_SSNRawVal").length > 0)) {
        $("body").append("<div data-redact-container='ssn'><input type='hidden' id='Provider_TaxIdentification_SSNRawVal' name='Provider_TaxIdentification_SSNRawVal' class='display-none' size='9' data-widget-type='SSNWithRedact' value='' data-original-value='' /></div>");
    }

    $(document).ready(function (e) {
        $("#Provider_TaxIdentification_SSN").after("<span id='Provider_TaxIdentification_SSNSpan' class='textbox-combo-icon clickable' unselectable='on' tabindex='-1'><i id='Provider_TaxIdentification_SSNIcon' class='k-icon fa-solid fa-eye' tabindex='0' role='button' aria-label='" + globalRedactionToggle + "'></i></span>");
        $("#Provider_TaxIdentification_SSN").attr("data-widget-type", "SSNWithRedact");

        // MaskedTextBox begins in redact mode, with no blur having happened
        sessionStorage.setItem("Provider_TaxIdentification_SSN" + "RedactMode", "0");

        $("#Provider_TaxIdentification_SSN").on("change", function (e) {
            let inputValue = e.target.value.replaceAll("_", "").replaceAll("-", "").replace(/\D/g, "").substring(0, 9);
            let isRedacted = sessionStorage.getItem("Provider_TaxIdentification_SSN" + "RedactMode") === "1" ? true : false;

            // Data is only editable if in unredacted state...
            if ((inputValue.length <= 9) && !isRedacted) {
                $("#Provider_TaxIdentification_SSNRawVal").val(inputValue);
            }
        });

        $("#Provider_TaxIdentification_SSN").on("beforeinput", function (e) {
            let isRedacted = sessionStorage.getItem("Provider_TaxIdentification_SSN" + "RedactMode") === "1" ? true : false;

            // Block input when the widget is redacted
            if (isRedacted) {
                e.preventDefault();
            }
        });

        function widgetRedactionAction(widgetId, widgetSpanId, widgetIdHidden, forceRedact) {
            let eyeIcon = $("#" + widgetSpanId).find(".k-icon");
            let isRedacted = sessionStorage.getItem(widgetId + "RedactMode") === "1" ? true : false;
            let unredactedValue = $("#" + widgetIdHidden).val() || "";
            let maskedTextBox = $("#Provider_TaxIdentification_SSN").data("kendoMaskedTextBox");

            // Display redact/unredacted value, based upon status or forced redaction
            if ((!isRedacted || (forceRedact == 1)) && (unredactedValue.length > 0)) {
                // Switch to redacted mask
                maskedTextBox.value("");  // Clear before changing mask
                maskedTextBox.setOptions({ mask: "&&&-&&-&&&&" });
                maskedTextBox.value(generateRedaction(unredactedValue, 4));  // Set redacted value

                $(eyeIcon).removeClass("fa-eye fa-eye-slash").addClass("fa-eye-slash");
                $(eyeIcon).attr("aria-label", globalRedactionEnable);
                sessionStorage.setItem(widgetId + "RedactMode", "1");
            }
            else {
                // Switch to unredacted mask
                maskedTextBox.value("");  // Clear before changing mask
                maskedTextBox.setOptions({ mask: "000-00-0000" });
                maskedTextBox.value(unredactedValue);  // Set redacted value

                $(eyeIcon).removeClass("fa-eye fa-eye-slash").addClass("fa-eye");
                $(eyeIcon).attr("aria-label", globalRedactionDisable);
                sessionStorage.setItem(widgetId + "RedactMode", "0");
            }
        }

        $("#Provider_TaxIdentification_SSN").blur(function (e) {
            let propertyIconId = $("#Provider_TaxIdentification_SSNIcon").attr("id");
            let propertyId = $("#Provider_TaxIdentification_SSN").attr("id");
            let propertyIdRawVal = $("#Provider_TaxIdentification_SSNRawVal").attr("id");
            let propertyIdSpan = $("#Provider_TaxIdentification_SSNSpan").attr("id");
            let isRedacted = sessionStorage.getItem("Provider_TaxIdentification_SSN" + "RedactMode") === "1" ? true : false;
            let relatedTargetId = $(e.relatedTarget).attr("id");

            if ((!isRedacted) && (relatedTargetId !== propertyIconId)) {
                widgetRedactionAction(propertyId, propertyIdSpan, propertyIdRawVal, 1);
            }
        });

        $("#Provider_TaxIdentification_SSN").focus(function (e) {
            let propertyIconId = $("#Provider_TaxIdentification_SSNIcon").attr("id");
            let propertyId = $("#Provider_TaxIdentification_SSN").attr("id");
            let propertyIdRawVal = $("#Provider_TaxIdentification_SSNRawVal").attr("id");
            let propertyIdSpan = $("#Provider_TaxIdentification_SSNSpan").attr("id");
            let isRedacted = sessionStorage.getItem("Provider_TaxIdentification_SSN" + "RedactMode") === "1" ? true : false;
            let relatedTargetId = $(e.relatedTarget).attr("id");

            // When redaction widget input obtains focus, don't redact the value if the previous focused element was the redaction icon/button
            if (!((!isRedacted) && ((relatedTargetId == propertyIdSpan) || (relatedTargetId == propertyIconId) || (relatedTargetId == undefined)))) {
                widgetRedactionAction(propertyId, propertyIdSpan, propertyIdRawVal, 1);
            }
        });

        $("#Provider_TaxIdentification_SSNSpan").on("focusout", function (e) {
            let propertyIconId = $("#Provider_TaxIdentification_SSNIcon").attr("id");
            let propertyId = $("#Provider_TaxIdentification_SSN").attr("id");
            let propertyIdRawVal = $("#Provider_TaxIdentification_SSNRawVal").attr("id");
            let propertyIdSpan = $("#Provider_TaxIdentification_SSNSpan").attr("id");
            let isRedacted = sessionStorage.getItem("Provider_TaxIdentification_SSN" + "RedactMode") === "1" ? true : false;
            let relatedTargetId = $(e.relatedTarget).attr("id");

            // If focus moves from Redact icon to widget input, do nothing.  Otherwise, redact the SSN.
            if (!isRedacted && (relatedTargetId !== propertyIconId) && (relatedTargetId !== propertyId)) {
                widgetRedactionAction(propertyId, propertyIdSpan, propertyIdRawVal, 1);
            }
        });

        // Clicking the icon/button will toggle the redaction
        $("#Provider_TaxIdentification_SSNSpan").click(function (e) {
            let propertyId = $("#Provider_TaxIdentification_SSN").attr("id");
            let propertyIdRawVal = $("#Provider_TaxIdentification_SSNRawVal").attr("id");
            let propertyIdSpan = $("#Provider_TaxIdentification_SSNSpan").attr("id");

            widgetRedactionAction(propertyId, propertyIdSpan, propertyIdRawVal, 0);
        });

        // Pressing SPACE with icon in focus simulates an onClick
        $("#Provider_TaxIdentification_SSNSpan").keydown(function (e) {
            let propertyId = $("#Provider_TaxIdentification_SSN").attr("id");
            let propertyIdRawVal = $("#Provider_TaxIdentification_SSNRawVal").attr("id");
            let propertyIdSpan = $("#Provider_TaxIdentification_SSNSpan").attr("id");

            if (e.which === 32) {
                e.preventDefault();  // Prevent browser scrolling when SPACE is pressed on Redact icon
                widgetRedactionAction(propertyId, propertyIdSpan, propertyIdRawVal, 0);
            }
        });
    });

    $(window).on("load", function () {
        // Call functions that require the page to be fully rendered before executing
        $.ready.then(function () {
            // Set the redaction widget's mask to the appropriate state, based on whether the
            // widget is being pre-populated at rendering with a value or not
            let maskedTextBox = $("#Provider_TaxIdentification_SSN").data("kendoMaskedTextBox");

            if ($("#Provider_TaxIdentification_SSN").val() == "") {
                maskedTextBox.setOptions({
                    mask: "000-00-0000"
                });
            }
            else {
                maskedTextBox.setOptions({
                    mask: "&&&-&&-&&&&"
                });
            }
        });
    });
