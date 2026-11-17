var applicationTypeId = "#ApplicationTypeListList";
var clearButtonId = "#clearButton";
var searchButtonId = "#searchButton";
var formId = "#ProviderSearchForm";
var gridId = "#providerResultsGrid";
var providerStatusId = "#ProviderSearchStatus";
var atnId = "#ATN";
var providerNameId = "#ProviderName";
var npiId = "#NPI";
var legacyId = "#LegacyID";
var statesId = "#States_ID";
var cityId = "#City";
var taxID = "#TaxID";
var lastName = "#LastName";
var firstName = "#FirstName";
var businessName = "#BusinessName";
var contactEmail = "#ContactEmail";
var receiptDate = "#ReceiptDate";
var providerType = "#ProviderType_ID";
var enrollmentType = "#EnrollmentType_ID";
var lastStatus = "#LastStatus_ID";
var CurrentPage = "";
var PageSize = "";
var gridform = "ProviderApplicationform";
var exportPDFButton = "#searchenrollExportPDFButton";
var tempTaxID;
var formatedTaxID;
var hideSSNPanel = "#SSN_parent";
var hideEINPanel = "#EIN_parent";
var gridExportButton = "#gridExportButton";
var valid = "Valid";
var setFilters;
var initialLoad = true;
var providerResultsGrid = "#providerResultsGrid";

$(document).ready(function () {
    $("#bnrresultsGrid").hide();
    $(".container").has(gridId).hide();
    $(gridId).find(".k-grid-toolbar").insertAfter($(gridId).find(".k-grid-content"));
    $("#providername").hide();
    $("#TaxIDLabel").addClass("font-weight-bold");
    $("#TaxIDHelp").addClass("list-item ");
    checkForSSNAndEIN();
});

$('input:radio[name="TaxIdSelection.ID"]').change(function () {
    checkForSSNAndEIN();
});

function checkForSSNAndEIN() {
    if ($('input[name="TaxIdSelection.ID"]:checked').val() === EIN) {
        $(hideEINPanel).show();
        $(hideSSNPanel).hide();
    }
    else if ($('input[name="TaxIdSelection.ID"]:checked').val() === SSN) {
        $(hideSSNPanel).show();
        $(hideEINPanel).hide();
    }
    else {
        $(hideSSNPanel).hide();
        $(hideEINPanel).hide();
        populateRedactionWidget("EIN", "");
        populateRedactionWidget("SSN", "");
    }
    applyRedactions();
    $(taxID).val("");
    tempTaxID = "";
}

var validator = $(formId).kendoValidator(
    {
        validateOnBlur: false,
        validate: function () {
            focusFirstErrorElement(formId);
        }
    }
).data("kendoValidator");

function accountLinkTemplate(data) {
    var template = data.ATN;
    if (data.LastStatus.ID === "3" || data.LastStatus.ID === "5" || data.LastStatus.ID === "9") {
        template = "<a href='javascript:void(0)' onclick='downloadFile(\"" + data.ApplicationFile + "\")'>" + data.ATN + "</a>";
    }
    return template;
}

$.extend(this, {
    "providerSearchGridOnDataBinding": providerSearchGridOnDataBinding,
    "providerEnrollmentSearchResultGridOnDataBound": providerEnrollmentSearchResultGridOnDataBound,
    "initializedFilterMenu1": initializedFilterMenu1,
    "setKendoMegaGridDataBoundEvents": setKendoMegaGridDataBoundEvents
});

function providerEnrollmentSearchResultGridOnDataBound(e) {
    setKendoGridDataBoundEvents(e);
    e.preventDefault();
    if ($(providerResultsGrid).data('kendoMegaGrid').dataSource.total() > 1) {
        $(providerResultsGrid + " [data-field='Status']").addClass('font-weight-bold');
    }
    else {
        $(providerResultsGrid + " [data-field='Status']").addClass('font-weight-normal');
    }
    if (filterCount === 1) {
        filterCount = 0;
    }
}

function setKendoMegaGridDataBoundEvents(e) {
    // Add appropriate styles to grid filter dropdowns
    $('.k-grid-filter').on('click', function () {
        styleGridFilters();
    });
}


function initializedFilterMenu1(e) {
    var filterElement = e.container[0];
    if (filterElement) {
        $(filterElement).find('.k-button.k-primary').prop('disabled', false);
        var i = 0;
        onFilterMenuInit(e);
        if (e.field === "ResultStatus") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            if (($(filterElement).find(':checkbox')[0]).value === labelInvalid) {
                ($(filterElement).find(':checkbox')[0]).value = statusInvalid;
            }
            if (($(filterElement).find(':checkbox')[1]).value === labelValid) {
                ($(filterElement).find(':checkbox')[1]).value = labelValid;
            }
        }
        else if (e.field === "ApplicationTypeList.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < applicationTypeDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = applicationTypeDataListArray[i].ApplicationTypeList.ID;
            }
        }
        else if (e.field === "ProviderType.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < providerTypeDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = providerTypeDataListArray[i].ProviderType.ID;
            }
        }
        else if (e.field === "States.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < stateDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = stateDataListArray[i].States.ID;
            }
        }
        else if (e.field === "TaxIdSelection.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < taxIdTypeDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = taxIdTypeDataListArray[i].TaxIdSelection.ID;
            }
        }
        else if (e.field === "EnrollmentType.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < enrollmentTypeDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = enrollmentTypeDataListArray[i].EnrollmentType.ID;
            }
        }
        else if (e.field === "ResultBenefitPlan.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < benefitDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = benefitDataListArray[i].ResultBenefitPlan.ID;
            }
        }

        else if (e.field === "PrimaryLanguage.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < languageDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = languageDataListArray[i].PrimaryLanguage.ID;
            }
        }

        else if (e.field === "ResultPopCode.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < popCodeDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = popCodeDataListArray[i].ResultPopCode.ID;
            }
        }

        else if (e.field === "ResultLOC.Name") {
            $('.k-icon').removeClass('k-font-icon');
            $(filterElement).find(".k-filter-selected-items").removeClass("display-none");

            for (i = 0; i < locDataListArray.length; i++) {
                ($(filterElement).find(':checkbox')[i + 1]).value = locDataListArray[i].ResultLOC.ID;
            }
        }
    }
}

function onFilterMenuInit(e) {
    var container = e.container;
    var searchTextBox = container.find(".k-textbox > input");
    var filterLink = e.container.find(".k-filterable > k-link");
    var popup = $(container).data("kendoPopup");
    searchTextBox.on("input", function (e) {
        setTimeout(function (e) {
            popup.position();
        }, 100);
    });
    popup.bind("activate", function (e) {
        this.position();
    });
}

$(clearButtonId).click(function () {
    $(formId)[0].reset();
    $(formId).resetAllValidations();
    hideSummaryErrors();
    isStepDataDirty = false;
    focusFirstElement(formId);
    $("#bnrresultsGrid").hide();
    if ($(gridId).data("kendoMegaGrid").dataSource.data.length > 1) {
        $(gridId).data("kendoMegaGrid").dataSource.data([]);
    }
    $("#States_ID").val('');
    $(enrollmentType).val("");
    $(providerType).val("");
    $("#ApplicationTypeListList").val('');
    $(lastStatus).val("");
    checkForSSNAndEIN();
});

$(searchButtonId).click(function () {
    setFieldAsNotRequired("ExportOptionsList", "ExportOptionsListLabel");
    $("#ExportOptionsList").data("kendoDropDownList").select(null);
    $("#ExportOptions_ID").val("");
    $("#ExportOptions_Name").val("");
    $(taxID).val("");
    tempTaxID = "";
    if ($('input[name="TaxIdSelection.ID"]:checked').val() === EIN) {
        if ($("#EINRawVal").val() != "") {
            tempTaxID = $("#EINRawVal").val();
        }
    }
    else if ($('input[name="TaxIdSelection.ID"]:checked').val() === SSN) {
        if ($("#SSNRawVal").val() != "") {
            tempTaxID = $("#SSNRawVal").val();
        }
    }
    $(taxID).val(tempTaxID);
    setFieldAsNotRequired("City", "City");
    setFieldAsNotRequired("StatesList", "States");
    setFieldAsNotRequired("LastName", "LastName");
    setFieldAsNotRequired("FirstName", "FirstName");
    if ($(cityId).val() === '' && $("#States_ID").val() !== '') {
        setFieldAsRequired("City", "City");
    }
    else if ($(cityId).val() !== '' && $("#States_ID").val() === '') {
        setFieldAsRequired("StatesList", "States");
    }
    if ($(lastName).val() === '' && $(firstName).val() !== '') {
        setFieldAsRequired("LastName", "LastName");
    }
    else if ($(lastName).val() !== '' && $(firstName).val() === '') {
        setFieldAsRequired("FirstName", "FirstName");
    }

    if ($(atnId).val() === '' && $(providerNameId).val() === '' && $(npiId).val() === '' && $(legacyId).val() === '' &&
        $(lastName).val() === '' && $(firstName).val() === '' && $(cityId).val() === '' && $("#States_ID").val() === '' && $(taxID).val() === '' && $(businessName).val() === ''
        && $(contactEmail).val() === '' && $(receiptDate).val() === '' && $(providerType).val() === '' && $(enrollmentType).val() === '' && $(lastStatus).val() === '' && $("#ApplicationTypeListList").val() === '') {
        var errorText = minimumonesearchcriteriaMsg;
        var errors = new Array();
        errors.push(errorText);
        showSummaryErrors(errors);
        $(window).scrollTop(0);
    }
    else if (validator.validate()) {
        hideSummaryErrors();
        $("#bnrresultsGrid").show();
        var gridFilters = applyMegaGridFilters();
        resetAndApplyKendoFilters(gridId, gridFilters.filters, 1, 10, "");
        showLoadingDialog();
    }
    else {
        $("#bnrresultsGrid").hide();
    }
});

function resetAndApplyKendoFilters(gridId, filters, page, pageSize, sort) {
    var gridData = $(gridId).data("kendoMegaGrid");
    var currentFilters = [];
    for (var idx = 0, len = filters.length; idx < len; idx++) {
        var filterField = filters[idx][0];
        var filterOperator = filters[idx][1];
        var filterValue = filters[idx][2];

        if (filterValue !== "") {
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

function OnSorting(e) {
    SetFilterSearch();
}

function OnPaging(e) {
    SetFilterSearch();
}

function SetFilterSearch() {
    initialLoad = false;
    var gridFilters = JSON.parse(sessionStorage.getItem(setFilters));

    $(providerResultsGrid).data("kendoMegaGrid").dataSource._filter = {
        "logic": "and", filters: gridFilters
    };
}

$(".k-link.k-pager-nav").on('click', function () {
    SetFilterSearch();
});

$(".k-i-refresh").on('click', function () {
    SetFilterSearch();
});

$(".k-i-filter").on('click', function () {
    SetFilterSearch();
});

function providerSearchGridOnDataBinding(e) {
    setKendoGridDataBoundEvents(e, null, null, null);
    $(".container").has(gridId).show();
    if ((!e.items) || e.items.length === 0) {
        $(".panel-body").attr('style', 'display:block');
    }
    else {
        $("#providerSearch").attr('style', 'display:none');
        collapsePanel('#searchCriteriaPanelIcon', panelTypeContent);
    }
    hideLoadingDialog();
    $(gridExportButton).hide();

    if ($(providerResultsGrid).data("kendoMegaGrid").dataSource._filter !== undefined) {
        if ($(providerResultsGrid).data("kendoMegaGrid").dataSource._filter.filters.length === 0) {
            var gridFilters = JSON.parse(sessionStorage.getItem(setFilters));

            $(providerResultsGrid).data("kendoMegaGrid").dataSource._filter = {
                "logic": "and", filters: gridFilters
            };
        }
        filters = $(providerResultsGrid).data("kendoMegaGrid").dataSource._filter.filters;
    }

    sessionStorage.removeItem(setFilters);
    sessionStorage.setItem(setFilters, JSON.stringify(filters));

}

function toggleAssocBox(control, displayed) {
    (displayed) ? $(control).addClass('assoc-box') : $(control).removeClass('assoc-box');
}

function toggleView(control, displayed) {
    (displayed) ? $(control).show() : $(control).hide();
}

function resetFields() {
    resetValidation();
    resetFormFields();
    hideSearchByPanels();
}

function OnSelectRow(e) {
    if (isHavingRightToViewPDF.toLowerCase() === "true") {
        var grid = e.sender;
        dataItem = grid.dataItem(this.select());
        var selecteditem = JSON.parse(JSON.stringify(dataItem.toJSON()));
        if (dataItem.DisplayName !== null) {
            openModalOverlay("ProviderEnrollmentApplicationsViewOverlay", ProviderEnrollmentApplicationURL, 'panelForm-col-5', null, { atnVal: selecteditem, __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val() });
        }
        else {
            displayPopupDialog("Info", noDataFoundInfoPopupTitle, noDataFoundInfoPopupMsg);
        }
    }
}

function searchEnrollGridOnExportExcel() {
    $("#providerResultsGrid").getKendoMegaGrid().saveAsExcel();
}

function filterProviderDataToExport(element) {
    setFieldAsNotRequired("ExportOptionsList", "ExportOptionsListLabel");
    if ($("#ExportOptions_ID").val() === '') {
        setFieldAsRequired("ExportOptionsList", "ExportOptionsListLabel");
    }
    if (validator.validate()) {
        var grid = $(gridId).data("kendoMegaGrid");
        switch ($("#ExportOptions_ID").val()) {
            case exportPageToExcel:
                CurrentPage = grid.dataSource.page();
                PageSize = grid.dataSource.pageSize();
                exportType = $("#ExportOptions_ID").val();
                break;
            case exportPageToPDF:
                CurrentPage = grid.dataSource.page();
                PageSize = grid.dataSource.pageSize();
                exportType = $("#ExportOptions_ID").val();
                break;
            case exportAllToExcel:
                CurrentPage = 1;
                PageSize = grid.dataSource.total();
                exportType = $("#ExportOptions_ID").val();
                break;
            default:
                break;
        }

        if (parseInt(exportAllMaxRowsLimitNumber) !== 0 && PageSize > exportAllMaxRowsLimitNumber) {
            displayPopupOKCancelDialog(messageWarning, messagingModalsAlertTitle, exportAllMaxRowsErrorMessageWithNumber, globalContinue, "sendReportRequest", globalCancel, "");
            return false;
        }
        else {
            var searchProviderApplicationParms = '';
            searchProviderApplicationParms = renderSearchProviderReportUrl + '?currentPage=' + CurrentPage + '&pageSize=' + PageSize + '&exportType=' + exportType;
            window.open(searchProviderApplicationParms, '_blank');
            hideLoadingDialog();
        }
    }
    else {
        return false;
    }
}

function sendReportRequest() {
    makeAsyncWebApiCall(getPEReportWebApiURL + '?currentPage=' + CurrentPage + '&pageSize=' + PageSize + '&exportType=' + exportType, "GET", "", "application/json;charset=utf-8");
}

function getFormattedTaxId(data) {
    data.TaxID = data.TaxID ? data.TaxID.toString() : "";
    if (!hasRightToViewTaxId) {
        if (data.TaxID !== '' && data.TaxIdType === SSN) {
            return gridMaskSSNOrEIN(data.TaxID, false);
        }
        else if (data.TaxID !== '' && data.TaxIdType === EIN) {
            return gridMaskSSNOrEIN(false, data.TaxID);
        }
        else {
            return '';
        }
    }
    else {
        if (data.TaxID !== '' && data.TaxIdType === SSN) {
            formatedTaxID = data.TaxID.substr(0, 3) + "-" + data.TaxID.substr(3, 2) + "-" + data.TaxID.substr(5, 4);
            return formatedTaxID;
        }
        else if (data.TaxID !== '' && data.TaxIdType === EIN) {
            formatedTaxID = data.TaxID.substr(0, 2) + "-" + data.TaxID.substr(2, 7);
            return formatedTaxID;
        }
        else {
            return '';
        }
    }
}

function filterGridData() {
    $(formId).resetAllValidations();
    var gridFilters = applyMegaGridFilters();

    return {
        filter: {
            logic: "and",
            filters:
                gridFilters.filters
        }
    };
}

function applyMegaGridFilters() {
    var gridFilters = { logic: "and", filters: [] };

    if ($(atnId).val() !== null && $(atnId).val() !== "") {
        gridFilters.filters.push({ field: "ATN", operator: "eq", value: $(atnId).val() });
    }
    if ($(npiId).val() !== null && $(npiId).val() !== "") {
        gridFilters.filters.push({ field: "NPI", operator: "eq", value: $(npiId).val() });
    }
    if ($(legacyId).val() !== null && $(legacyId).val() !== "") {
        gridFilters.filters.push({ field: "LegacyID", operator: "eq", value: $(legacyId).val() });
    }
    if (typeof ($('input[name="TaxIdSelection.ID"]:checked').val()) !== "undefined") {
        gridFilters.filters.push({ field: "TaxIdType", operator: "eq", value: $('input[name="TaxIdSelection.ID"]:checked').val() });
    }
    if ($(taxID).val() !== null && $(taxID).val() !== "") {
        gridFilters.filters.push({ field: "TaxID", operator: "eq", value: $(taxID).val() });
    }
    if (hasRightToViewTaxId) {
        gridFilters.filters.push({ field: "IsTaxIdTypeHasRites", operator: "eq", value: hasRightToViewTaxId });
    }
    if ($(lastName).val() !== null && $(lastName).val() !== "") {
        gridFilters.filters.push({ field: "LastName", operator: "eq", value: $(lastName).val() });
    }
    if ($(firstName).val() !== null && $(firstName).val() !== "") {
        gridFilters.filters.push({ field: "FirstName", operator: "eq", value: $(firstName).val() });
    }
    if ($(businessName).val() !== null && $(businessName).val() !== "") {
        gridFilters.filters.push({ field: "BusinessName", operator: "eq", value: $(businessName).val() });
    }
    if ($(contactEmail).val() !== null && $(contactEmail).val() !== "") {
        gridFilters.filters.push({ field: "ContactEmail", operator: "eq", value: $(contactEmail).val() });
    }
    if ($(enrollmentType).val() !== null && $(enrollmentType).val() !== "") {
        gridFilters.filters.push({ field: "EnrollmentType", operator: "eq", value: $(enrollmentType).val() });
    }
    if ($(providerType).val() !== null && $(providerType).val() !== "") {
        gridFilters.filters.push({ field: "ProviderType", operator: "eq", value: $(providerType).val() });
    }
    if ($(lastStatus).val() !== null && $(lastStatus).val() !== "") {
        gridFilters.filters.push({ field: "LastStatus", operator: "eq", value: $(lastStatus).val() });
    }
    if ($(receiptDate).val() !== null && $(receiptDate).val() !== "") {
        gridFilters.filters.push({ field: "ReceiptDate", operator: "eq", value: $(receiptDate).val() });
    }
    if ($(cityId).val() !== null && $(cityId).val() !== "") {
        gridFilters.filters.push({ field: "City", operator: "eq", value: $(cityId).val() });
    }
    if ($(statesId).val() != null && $(statesId).val() != "") {
        gridFilters.filters.push({ field: "States", operator: "eq", value: $(statesId).val() });
    }
    if ($(applicationTypeId).val() !== null && $(applicationTypeId).val() !== "") {
        gridFilters.filters.push({ field: "ApplicationType", operator: "eq", value: $(applicationTypeId).val() });
    }

    return gridFilters;
}