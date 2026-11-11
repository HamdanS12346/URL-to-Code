//--------------------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//--------------------------------------------------------------------------------------------------
(function (window, $, undefined) {
    //---------------------------------------------
    // Search Functions
    //---------------------------------------------
    var accesskey = "accesskey";
    var allowGridSelect;
    var authorizationNumber = "#AuthorizationNumber";
    var cancelButtonId = "#cancelButton";
    var claimIdentifiersListId = "#ClaimIdentifiersList";
    var claimsIdentifierAssocBox = "#divClaimsIdentifierAssocBox";
    var claimsAssocBox = "#divClaimsAssocBox";
    var claimsSearchResultsPanel = "#claimsSearchResultsPanel";
    var claimMemberByList = "#MemberByList";
    var claimMemberId = "#MemberID";
    var claimMemberName = "#MemberName";
    var claimType = "#ClaimTypeList";
    var claimSubType = "#ClaimSubTypeList";
    var claimStatus = "#ClaimStatusList";
    var claimSourceCode = "#ClaimSourceCodeList";
    var countGridCall = 0;
    var dateTypeList = "#DateTypeList";
    var defaultFromDate;
    var defaultToDate;
    var diagnosisTypeList = "#DiagnosisTypeList";
    var divDatePanel = "#divDatePanel";
    var divProviderByList = "#divProviderByList";
    var divProviderByListNPIPanel = "#divProviderByList_NPI";
    var divProviderByListProviderLocationIDPanel = "#divProviderByList_ProviderLocationID";
    var divProviderByListProviderIDPanel = "#divProviderByList_ProviderID";
    var divProviderByListProviderNamePanel = "#divProviderByList_ProviderName";
    var divProviderByListProviderTaxIDPanel = "#divProviderByList_ProviderTaxID";
    var divProviderByListProviderTaxonomyPanel = "#divProviderByList_ProviderTaxonomy";
    var diagnosisCodeDivICD09 = "#diagnosisCodeDiv_ICD09";
    var diagnosisCodeDivICD10 = "#diagnosisCodeDiv_ICD10";
    var divDateTypeAssocBox = "#divDateTypeAssocBox";
    var divSearchClaims = "#divSearchClaims";
    var dropdownlist;
    var excelButtonId = "#excelButton span";
    var exceptionErrorCode = "#ExceptionErrorCode";
    var falseId = "False";
    var flag = true;
    var formId = "form";
    var fromDateId = "#FromDate";
    var grid;
    var gridId = "#ClaimsResultsGrid";
    var ICN = "#SearchICN";
    var icn = "ICN";
    var iCNPanel = "#divClaimIdentifiersList_ICN";
    var isReturnToSearch = "IsReturnToSearch";
    var item;
    var kendoDropDownList = "kendoDropDownList";
    var memberIdPanel = "#divMemberByList_MemberID";
    var memberNamePanel = "#divMemberByList_MemberName";
    var memberByAssocBox = "#divMemberByAssocBox";
    var mcoICN = "MCOICN";
    var mcoICNId = "#MCOICN";
    var mcoICNPanel = "#divClaimIdentifierscList_MCOICN";
    var modifier1 = "#Modifiers1";
    var modifier2 = "#Modifiers2";
    var modifier3 = "#Modifiers3";
    var modifier4 = "#Modifiers4";
    var nextButtonId = "#nextButton";
    var npi = "#NPI";
    var numReg = new RegExp(numericExp);
    var overflow = "overflow";
    var operatorIdentifier = "#OperatorIdentifier";
    var page;
    var pageTarget;
    var rowTarget;
    var pageSize;
    var pageWrap = ".k-pager-wrap.k-grid-pager.k-widget.k-floatwrap";
    var payTo = "#PayToList";
    var patientAcct = "#PatientAccountNumber";
    var patientAccNo = "#divMemberByList_PatientAccNo";
    var pdfButtonId = "#pdfButton span";
    var plusMinusSearchClaims = "#plusMinusSearchClaims";
    var plusMinusSearchClaimsClick = "#plusMinusSearchClaimsClick";
    var pridxcode9 = "#PrimaryDiagnosisCodeICD09";
    var pridxcode10 = "#PrimaryDiagnosisCodeICD10";
    var primaryDiagnosisCodeICD10 = "#PrimaryDiagnosisCodeICD10";
    var procCodeFrom = "#ProcCodeFrom";
    var procCodeTo = "#ProcCodeTo";
    var providerByList = "#ProviderByList";
    var providerLocationID = "#ProviderLocationID";
    var providerName = "#ProviderName";
    var providerRoleList = "#ProviderRoleList";
    var providerTaxID = "#ProviderTaxID";
    var providerID = "#ProviderID";
    var providerTaxonomy = "#ProviderTaxonomy";
    var ranNmber = "#RANumber";
    var resetButtonId = "#resetButton";
    var savedClaimsSearch = "savedClaimsSearch";
    var searchButtonId = "#searchButton";
    var searchBy;
    var searchClaimsForm;
    var selectedClaim;
    var selectedClaimPanelId = "#selectedClaimPanel";
    var setToLastRow = false;
    var serviceType = "#ServiceTypeList";
    var searchCriteriaFound;
    var searchfilter;
    var searchClaimStatus = "#searchClaimStatus";
    var sort;
    var status = true;
    var tcnId = "#TCN";
    var tcn = "TCN";
    var tcnPanel = "#divClaimIdentifiersList_TCN";
    var title = "title";
    var toDateId = "#ToDate";
    var totalBilledRangeFrom = "#TotalBilledRangeFrom";
    var totalBilledRangeTo = "#TotalBilledRangeTo";
    var toothNumberFrom = "#ToothNumberFrom";
    var toothNumberTo = "#ToothNumberTo";
    var validator;
    var visible = "visible";

    $(document).ready(function () {
        //-------------------------------------
        // Initialize form validator
        //-------------------------------------
        validator = $(formId).kendoValidator(
            {
                validateOnBlur: false,
                validate: function () {
                    focusFirstErrorElement(formId);
                }
            }
        ).data("kendoValidator");

        $("body").keydown(function (e) {
            var zKey = 90;
            if ((e.ctrlKey || e.metaKey) && e.keyCode === zKey) {
                e.preventDefault();
                return false;
            }
        });

        $(resetButtonId).attr(accesskey, "Q");
        $(resetButtonId).attr(title, "Alt+Q");
        $(cancelButtonId).attr(accesskey, "1");
        $(cancelButtonId).attr(title, "Alt+1");
        $(nextButtonId).attr(accesskey, "2");
        $(nextButtonId).attr(title, "Alt+2");
        $(pdfButtonId).css(overflow, visible);
        $(excelButtonId).css(overflow, visible);
        $(modifier1).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(modifier2).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(modifier3).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(modifier4).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(toothNumberFrom).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(toothNumberTo).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(exceptionErrorCode).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(pridxcode9).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
        $(pridxcode10).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");


        //-------------------------------------
        // Initialize form
        //-------------------------------------
        hideProviderByList();
        hideMemberByControls();
        $(".container").has(gridId).hide();
        setDefaultButton(searchButtonId, claimsIdentifierAssocBox);
        focusFirstElement(formId);
        searchClaimsForm = $(formId)[0];
        $(window).on('unload', function () {
            sessionStorage.setItem(isReturnToSearch, falseId);
        });

        grid = $(gridId).data("kendoGrid");
        sort = grid.dataSource.sort();
        page = grid.dataSource.page();
        pageSize = grid.dataSource.pageSize();

        grid.table.on("keydown", function (e) {
            var rows = grid.items();
            if (e.keyCode === 38) {
                previousRow();
            }

            if (e.keyCode === 40) {
                nextRow();
            }
        });

        hideSearchByControls();
        var claimIdentifier = $(claimIdentifiersListId).data("kendoDropDownList");
        claimIdentifier.bind("change", claimIdentifiersListChange);
        var providerRole = $(providerRoleList).data("kendoDropDownList");
        providerRole.bind("change", providerRoleListChange);
        var providerBy = $(providerByList).data("kendoDropDownList");
        providerBy.bind("change", providerByListChange);
        var claimMemberBy = $(claimMemberByList).data("kendoDropDownList");
        claimMemberBy.bind("change", claimMemberByListChange);
        var dateDataType = $(dateTypeList).data(kendoDropDownList);
        dateDataType.bind("change", dateDataTypeListChange);
        var icdDataType = $(diagnosisTypeList).data("kendoDropDownList");
        icdDataType.bind("change", icdDataTypeListChange);


        $(providerTaxonomy).kendoAutoComplete({
            filter: "contains",
            placeholder: taxonomyPlaceholder,
            noDataTemplate: noDataFound,
            filtering: kendoAutoCompleteFilteringPreventBlank,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: taxonomyWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onTaxonomySelect
        });
        //Predictive Search of Modifiers1
        $(modifier1).kendoAutoComplete({
            filter: "contains",
            minLength: 1,
            placeholder: modifierPlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: modifierWebApiUrl

                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onModifier1Select
        });

        //Predictive Search of Modifiers2
        $(modifier2).kendoAutoComplete({
            filter: "contains",
            minLength: 1,
            placeholder: modifierPlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: modifierWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onModifier2Select
        });

        //Predictive Search of Modifiers3
        $(modifier3).kendoAutoComplete({
            filter: "contains",
            minLength: 1,
            placeholder: modifierPlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: modifierWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onModifier3Select
        });

        //Predictive Search of Modifiers4
        $(modifier4).kendoAutoComplete({
            filter: "contains",
            minLength: 1,
            placeholder: modifierPlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: modifierWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onModifier4Select
        });
        //Predictive Search of ToothNumberFrom
        $(toothNumberFrom).kendoAutoComplete({
            filter: "contains",
            minLength: 1,
            placeholder: toothnumberPlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: toothnumberWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onToothNumberFromSelect
        });
        //Predictive Search of ToothNumberTo
        $(toothNumberTo).kendoAutoComplete({
            filter: "contains",
            minLength: 1,
            placeholder: toothnumberPlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: toothnumberWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onToothNumberToSelect
        });

        //Predictive Search of ExceptionErrorCode
        $(exceptionErrorCode).kendoAutoComplete({
            filter: "contains",
            filtering: kendoAutoCompleteFilteringPreventBlank,
            placeholder: exceptionErrorCodePlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: exceptionErrorCodeWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onExceptionErrorCodeSelect
        });

        $(pridxcode9).kendoAutoComplete({
            filter: "contains",
            filtering: kendoAutoCompleteFilteringPreventBlank,
            placeholder: pridxCodePlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: icd09CodeWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onICD09Select
        });

        $(pridxcode10).kendoAutoComplete({
            filter: "contains",
            filtering: kendoAutoCompleteFilteringPreventBlank,
            placeholder: pridxCodePlaceholder,
            noDataTemplate: noDataFound,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: {
                        url: icd10CodeWebApiUrl
                    }
                }
            },
            dataTextField: "FormattedText",
            template: "#= ID # - #= Name #",
            select: onicd10Select
        });

        //Clear description from autocomplete controls when user click on clear icon
        $('.k-autocomplete').find("input").each(function () {
            var autoCompleteControlId = $(this).first()["0"].id;
            $("#" + autoCompleteControlId).closest('div').find('.k-i-close').click(function () {
                $("#" + autoCompleteControlId).attr('title', "");
            });
        });
        resumePrevSearch();
        configureReadOnlyControls();
    });

    onTaxonomySelect = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(providerTaxonomy).attr('title', desc);
        $(providerTaxonomy).closest('div').find('.k-i-close').click(function () {
            $(providerTaxonomy).attr('title', "");
        });
    };

    $(providerTaxonomy).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(providerTaxonomy).attr('title', "");
        }
    });


    onICD09Select = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(pridxcode9).attr('title', desc);
        $(pridxcode9).closest('div').find('.k-i-close').click(function () {
            $(pridxcode9).attr('title', "");
        });
    };

    $(pridxcode9).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(pridxcode9).attr('title', "");
        }
    });


    onicd10Select = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(pridxcode10).attr('title', desc);
        $(pridxcode10).closest('div').find('.k-i-close').click(function () {
            $(pridxcode10).attr('title', "");
        });
    };

    $(pridxcode10).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(pridxcode10).attr('title', "");
        }
    });


    claimMemberByListChange = function (e) {
        initializeMemberByControls();
        var showAssocBox = false;
        var msg = '';
        var memberType = this.value();
        switch (memberType) {
            case memberId:
                toggleView(memberIdPanel, true);
                showAssocBox = true;
                break;
            case memberName:
                toggleView(memberNamePanel, true);
                showAssocBox = true;
                break;
            case patientAcc:
                toggleView(patientAccNo, true);
                showAssocBox = true;
                break;
        }
        toggleAssocBox(memberByAssocBox, showAssocBox);
    };

    initializeMemberByControls = function () {
        $(claimMemberId).val("");
        $(claimMemberName).val("");
        $(patientAcct).val("");
        toggleView(memberIdPanel, false);
        toggleView(memberNamePanel, false);
        toggleView(patientAccNo, false);
    };

    hideMemberByControls = function () {
        $(memberIdPanel).hide();
        $(memberNamePanel).hide();
        $(patientAccNo).hide();
    };

    hideProviderByList = function () {
        $(divProviderByList).hide();
        $(divProviderByListNPIPanel).hide();
        $(divProviderByListProviderNamePanel).hide();
        $(divProviderByList_ProviderID).hide();
        $(divProviderByListProviderLocationIDPanel).hide();
        $(divProviderByListProviderTaxIDPanel).hide();
        $(divProviderByListProviderTaxonomyPanel).hide();
        $(diagnosisCodeDivICD10).hide();
        $(diagnosisCodeDivICD09).hide();
        $(divDatePanel).hide();
    };

    providerRoleListChange = function (e) {
        var showAssocBox = false;
        providerRoleType = this.value();
        var providerByDDL = $(providerByList).data(kendoDropDownList);
        if (providerRoleType === "") {
            providerByDDL.value("NP");
            providerByDDL.trigger("change");
            initializeProviderRoleControls();
            toggleView(divProviderByList, false);
        }
        else {
            toggleView(divProviderByList, true);
            showAssocBox = true;
            providerByDDL.trigger("change");
        }
        toggleAssocBox(claimsAssocBox, showAssocBox);
    };

    providerByListChange = function (e) {
        initializeProviderRoleControls();
        var showAssocBox = false;
        var providerByType = this.value();
        switch (providerByType) {
            case providerNumber:
                toggleView(divProviderByListNPIPanel, true);
                showAssocBox = true;
                break;
            case id:
                toggleView(divProviderByListProviderIDPanel, true);
                enableServiceLocationPanel();
                showAssocBox = true;
                break;
            case name:
                toggleView(divProviderByListProviderNamePanel, true);
                showAssocBox = true;
                break;
            case providerTax:
                toggleView(divProviderByListProviderTaxIDPanel, true);
                showAssocBox = true;
                break;
            case taxonomy:
                $(providerTaxonomy).removeClass("k-widget k-autocomplete k-header k-textbox editor-control k-state-default k-icon k-i-close");
                toggleView(divProviderByListProviderTaxonomyPanel, true);
                showAssocBox = true;
                break;
        }
        toggleAssocBox(claimsAssocBox, showAssocBox);
    };

    enableServiceLocationPanel = function () {
        if (providerRoleType === performing) {
            toggleView(divProviderByListProviderLocationIDPanel, true);
        }
    };

    initializeProviderRoleControls = function () {
        $(npi).val("");
        $(providerName).val("");
        $(providerLocationID).val("");
        $(providerID).val("");
        $(providerTaxID).val("");
        $(providerTaxonomy).val("");
        toggleProviderControls();
    };

    toggleProviderControls = function () {
        $(providerTaxonomy).attr('title', null);
        toggleView(divProviderByListNPIPanel, false);
        toggleView(divProviderByListProviderIDPanel, false);
        toggleView(divProviderByListProviderLocationIDPanel, false);
        toggleView(divProviderByListProviderNamePanel, false);
        toggleView(divProviderByListProviderTaxIDPanel, false);
        toggleView(divProviderByListProviderTaxonomyPanel, false);
    };

    dateDataTypeListChange = function (e) {
        var fromDateValidationMessage = "#FromDate_validationMessage";
        var toDateValidationMessage = "#ToDate_validationMessage";
        initializeDateControls();
        var showAssocBox = false;
        var dateDataTypeId = this.value();
        if (dateDataTypeId !== "") {
            $(fromDateValidationMessage).text("");
            $(fromDateValidationMessage).hide();
            $(toDateValidationMessage).hide();
            $(toDateValidationMessage).text("");
            $(fromDateId).removeClass("k-invalid");
            $(toDateId).removeClass("k-invalid");
            $(searchClaimStatus).empty();
            toggleView(divDatePanel, true);
            showAssocBox = true;
        }
        else {
            $(fromDateValidationMessage).text("");
            $(fromDateValidationMessage).hide();
            $(toDateValidationMessage).hide();
            $(toDateValidationMessage).text("");
            $(fromDateId).removeClass("k-invalid");
            $(toDateId).removeClass("k-invalid");
            $(searchClaimStatus).empty();
        }

        toggleAssocBox(divDateTypeAssocBox, showAssocBox);
    };

    icdDataTypeListChange = function (e) {
        dropdownlist = $(diagnosisTypeList).data("kendoDropDownList");
        if (dropdownlist.value() === "") {
            $(pridxcode9).val(null);
            $(pridxcode10).val(null);
            toggleView(diagnosisCodeDivICD09, false);
            toggleView(diagnosisCodeDivICD10, false);
        }
        var icdDataType = this.value();
        switch (icdDataType) {
            case icd09Code:
                $(pridxcode9).val(null);
                $(pridxcode10).val(null);
                toggleView(diagnosisCodeDivICD09, true);
                toggleView(diagnosisCodeDivICD10, false);
                break;
            case icd10Code:
                $(pridxcode10).val(null);
                $(pridxcode9).val(null);
                toggleView(diagnosisCodeDivICD10, true);
                toggleView(diagnosisCodeDivICD09, false);
                break;
        }
    };

    initializeDateControls = function () {
        $(fromDateId).val(sessionStorage.getItem("defaultFromDateSearch"));
        $(toDateId).val(sessionStorage.getItem("defaultToDateSearch"));
        toggleView(divDatePanel, false);
    };

    previousRow = function () {
        var grid = $(gridId).data("kendoGrid");
        setToLastRow = false;
        if (grid !== undefined) {
            var rowCount = grid.dataSource.data().length;
            if (rowCount !== undefined) {
                var rows = grid.items();
                var currSelRowIndex = rows.index(grid.select());
                var prevRowIndex = 0;
                if (currSelRowIndex > 0) {
                    prevRowIndex = currSelRowIndex - 1;
                    selectClaimRow(prevRowIndex);
                }
                else {
                    prevRowIndex = grid.dataSource.pageSize() - 1;
                    var page = grid.dataSource.page();
                    if (page > 1) {
                        grid.dataSource.page(page - 1);
                        setToLastRow = true;
                    }
                }
                $(selectedClaimPanelId).show();
            }
        }
    };

    nextRow = function () {
        var grid = $(gridId).data("kendoGrid");
        if (grid !== undefined) {
            var rowCount = grid.dataSource.data().length;
            if (rowCount !== undefined) {
                var rows = grid.items();
                var currSelRowIndex = rows.index(grid.select());
                var nextRowIndex = rowCount - 1;
                if (currSelRowIndex < rowCount - 1) {
                    nextRowIndex = currSelRowIndex + 1;
                    selectClaimRow(nextRowIndex);
                }
                else {
                    nextRowIndex = 0;
                    var page = grid.dataSource.page();
                    var pageSize = grid.dataSource.pageSize();
                    if ((page) * pageSize < grid.dataSource.total()) {
                        grid.dataSource.page(page + 1);
                        selectClaimRow(nextRowIndex);
                    }
                }
                $(selectedClaimPanelId).show();
            }
        }
    };

    selectClaimRow = function (claimRowIndex) {
        var grid = $(gridId).data("kendoGrid");
        var rowAt = grid.dataSource.at(claimRowIndex);
        var rowuid = rowAt.uid;
        var row = grid.tbody.find("tr[data-uid='" + rowuid + "']");
        grid.select(row);
        var cell = row.find('td:eq(0)');
        grid.current(cell);
        cell.focus();
        claimsGridCalcPrevNextButton(claimRowIndex);
    };

    clickToSearchClaimsCollapseExpand = function () {
        var display = 'display';
        var none = 'none';
        var faPlusSquare = "fa-square-plus";
        var faMinusSquare = "fa-square-minus";
        var panelCollapsed = "panel-collapsed";
        var panelExpanded = "panel-expanded";

        if ($(divSearchClaims).css(display) === none) {
            $(divSearchClaims).show();
            $(plusMinusSearchClaims).addClass(faMinusSquare).removeClass(faPlusSquare);
            $(plusMinusSearchClaimsClick).addClass(panelCollapsed);
        }
        else {
            $(divSearchClaims).hide();
            $(plusMinusSearchClaims).addClass(faPlusSquare).removeClass(faMinusSquare);
            $(plusMinusSearchClaimsClick).addClass(panelExpanded);
        }
    };

    //Advanced Search
    clickToAdvancedSearchClaimsCollapseExpand = function () {
        var divAdvacedSearchClaims = "#divAdvancedSearchClaims";
        var plusMinusAdvancedSearchClaims = "#plusMinusAdvancedSearchClaims";
        var plusMinusAdvancedSearchClaimsClick = "#plusMinusAdvancedSearchClaimsClick";
        var display = 'display';
        var none = 'none';
        var faPlusSquare = "fa-square-plus";
        var faMinusSquare = "fa-square-minus";
        var panelCollapsed = "panel-collapsed";
        var panelExpanded = "panel-expanded";

        if ($(divAdvacedSearchClaims).css(display) === none) {
            $(divAdvacedSearchClaims).show();
            $(plusMinusAdvancedSearchClaims).addClass(faPlusSquare).removeClass(faMinusSquare);
            $(plusMinusAdvancedSearchClaimsClick).addClass(panelCollapsed);
            $(plusMinusAdvancedSearchClaims).attr("title", collapse);
        }
        else {
            $(divAdvacedSearchClaims).hide();
            $(plusMinusAdvancedSearchClaims).addClass(faMinusSquare).removeClass(faPlusSquare);
            $(plusMinusAdvancedSearchClaimsClick).addClass(panelExpanded);
            $(plusMinusAdvancedSearchClaims).attr("title", expand);
        }
    };

    onModifier1Select = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(modifier1).attr('title', desc);
        $(modifier1).closest('div').find('.k-i-close').click(function () {
            $(modifier1).attr('title', "");
        });
    };

    $(modifier1).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(modifier1).attr('title', "");
        }
    });

    onModifier2Select = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(modifier2).attr('title', desc);
        $(modifier2).closest('div').find('.k-i-close').click(function () {
            $(modifier2).attr('title', "");
        });
    };

    $(modifier2).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(modifier2).attr('title', "");
        }
    });

    onModifier3Select = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(modifier3).attr('title', desc);
        $(modifier3).closest('div').find('.k-i-close').click(function () {
            $(modifier3).attr('title', "");
        });
    };

    $(modifier3).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(modifier3).attr('title', "");
        }
    });


    onModifier4Select = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(modifier4).attr('title', desc);
        $(modifier4).closest('div').find('.k-i-close').click(function () {
            $(modifier4).attr('title', "");
        });
    };

    $(modifier4).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(modifier4).attr('title', "");
        }
    });

    onToothNumberFromSelect = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(toothNumberFrom).attr('title', desc);
        $(toothNumberFrom).closest('div').find('.k-i-close').click(function () {
            $(toothNumberFrom).attr('title', "");
        });
    };

    $(toothNumberFrom).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(toothNumberFrom).attr('title', "");
        }
    });

    onToothNumberToSelect = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(toothNumberTo).attr('title', desc);
        $(toothNumberTo).closest('div').find('.k-i-close').click(function () {
            $(toothNumberTo).attr('title', "");
        });
    };

    $(toothNumberTo).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(toothNumberTo).attr('title', "");
        }
    });


    onExceptionErrorCodeSelect = function (e) {
        var dataItem = this.dataItem(e.item.index());
        var desc = dataItem.Name;
        var ID = dataItem.ID;
        dataItem.FormattedText = ID;
        $(exceptionErrorCode).attr('title', desc);
        $(exceptionErrorCode).closest('div').find('.k-i-close').click(function () {
            $(exceptionErrorCode).attr('title', "");
        });
    };

    $(exceptionErrorCode).keyup(function (e) {
        if ((e.keyCode === 8) || (e.keyCode === 46)) {
            $(exceptionErrorCode).attr('title', "");
        }
    });

    getSearchFilter = function () {
        $(claimsSearchResultsPanel).hide();
        if (validator.validate()) {
            hideSummaryErrors();
            status = checkErrorValidations();
            if (flag && checkclaimsValidation()) {
                var filters = [
                    ["ClaimIdentifiers", "eq", $(claimIdentifiersListId).val()],
                    ["MemberBy", "eq", $(claimMemberByList).val()],
                    ["ProviderBy", "eq", $(providerByList).val()],
                    ["SearchICN", "eq", $(ICN).val()],
                    ["TCN", "eq", $(tcnId).val()],
                    ["MCOICN", "eq", $(mcoICNId).val()],
                    ["FromDate", "eq", $(fromDateId).val()],
                    ["ToDate", "eq", $(toDateId).val()],
                    ["DateTypeId", "eq", $(dateTypeList).val()],
                    ["MEMBERID", "eq", $(claimMemberId).val()],
                    ["MEMBERNAME", "eq", $(claimMemberName).val()],
                    ["PATIENTACCT", "eq", $(patientAcct).val()],
                    ["ROLE", "eq", $(providerRoleList).val()],
                    ["NPI", "eq", $(npi).val()],
                    ["ProviderID", "eq", $(providerID).val()],
                    ["ProviderLocationID", "eq", $(providerLocationID).val()],
                    ["ProviderName", "eq", $(providerName).val()],
                    ["ProviderTaxID", "eq", $(providerTaxID).val()],
                    ["ClaimTypeCode", "eq", $(claimType).val()],
                    ["ClaimSubType", "eq", $(claimSubType).val()],
                    ["ClaimStatus", "eq", $(claimStatus).val()],
                    ["ClaimSourceCode", "eq", $(claimSourceCode).val()],
                    ["PayTo", "eq", $(payTo).val()],
                    ["ServiceType", "eq", $(serviceType).val()],
                    ["PROVIDERTAXONOMY", "eq", $(providerTaxonomy).val()],
                    ["MODIFIER1", "eq", $(modifier1).val()],
                    ["MODIFIER2", "eq", $(modifier2).val()],
                    ["MODIFIER3", "eq", $(modifier3).val()],
                    ["MODIFIER4", "eq", $(modifier4).val()],
                    ["EXCEPTIONERRORCODE", "eq", $(exceptionErrorCode).val()],
                    ["AUTHORIZATIONNUMBER", "eq", $(authorizationNumber).val()],
                    ["OPERATORIDENTIFIER", "eq", $(operatorIdentifier).val()],
                    ["RANNUMBER", "eq", $(ranNmber).val()],
                    ["TOTALBILLEDRANGEFROM", "eq", $(totalBilledRangeFrom).val()],
                    ["TOTOLBILLEDRANGETO", "eq", $(totalBilledRangeTo).val()],
                    ["PROCCODEFROM", "eq", $(procCodeFrom).val()],
                    ["PROCCODETO", "eq", $(procCodeTo).val()],
                    ["TOOTHNUMBERFROM", "eq", $(toothNumberFrom).val()],
                    ["TOOTHNUMBERTO", "eq", $(toothNumberTo).val()],
                    ["DiagnosisType", "eq", $(diagnosisTypeList).val()],
                    ["PRIDXCODE", "eq", $(pridxcode9).val()],
                    ["PRIDXCODEICD10", "eq", $(primaryDiagnosisCodeICD10).val()]
                ];
                applyKendoFilters(gridId, filters);
            }
            else {
                hideLoadingDialog();
                $(".container").has(gridId).hide();
            }
        }
    };

    resumePrevSearch = function () {
        if (sessionStorage.getItem("IsReturnToSearch") === "True") {
            bindSavedSearchCriteria();
            if (searchCriteriaFound) {
                editorNextPostValidate();
            }
            sessionStorage.setItem(isReturnToSearch, falseId);
            searchCriteriaFound = false;
        } else {
            sessionStorage.setItem("defaultFromDateSearch", $(fromDateId).val());
            sessionStorage.setItem("defaultToDateSearch", $(toDateId).val());
            sessionStorage.removeItem(savedClaimsSearch);

            var dateDataType = $(dateTypeList).data(kendoDropDownList);
            dateDataType.value("DOS");
            dateDataType.trigger("change");

            var icdDataType = $(diagnosisTypeList).data(kendoDropDownList);
            icdDataType.value("02");
            icdDataType.trigger("change");

            sessionStorage.setItem(isReturnToSearch, falseId);
        }
    };

    bindSavedSearchCriteria = function () {
        var dollarsign = "$";
        var savedSearch = sessionStorage[savedClaimsSearch];
        if ($("#DateType_Name").val() !== "") {
            $(dateTypeList).data(kendoDropDownList).value($("#DateType_Name").val());
            $(fromDateId).val($(fromDateId).val());
            $(toDateId).val($(toDateId).val());
            toggleView(divDatePanel, true);
            $(claimIdentifiersListId).data(kendoDropDownList).value($("#ClaimIdentifiers_Name").val());
            $(ICN).val().length > 0 ? toggleView(iCNPanel, true) : toggleView(iCNPanel, false);
            $(tcnId).val().length > 0 ? toggleView(tcnPanel, true) : toggleView(tcnPanel, false);
            $(mcoICNId).val().length > 0 ? toggleView(mcoICNPanel, true) : toggleView(mcoICNPanel, false);

            //member by list
            $(claimMemberByList).data(kendoDropDownList).value($("#MemberBy_Name").val());
            $(claimMemberId).val().length > 0 ? toggleView(memberIdPanel, true) : toggleView(memberIdPanel, false);
            $(claimMemberName).val().length > 0 ? toggleView(memberNamePanel, true) : toggleView(memberNamePanel, false);
            $(patientAcct).val().length > 0 ? toggleView(patientAccNo, true) : toggleView(patientAccNo, false);

            //provider role list
            $(providerRoleList).data(kendoDropDownList).value($("#ProviderRole_Name").val());
            if ($("#ProviderRole_Name").val() !== "") {
                toggleView(divProviderByList, true);
            }

            //provider by list
            $(providerByList).data(kendoDropDownList).value($("#ProviderBy_Name").val());
            $(npi).val().length > 0 ? toggleView(divProviderByListNPIPanel, true) : toggleView(divProviderByListNPIPanel, false);
            $(providerName).val().length > 0 ? toggleView(divProviderByListProviderNamePanel, true) : toggleView(divProviderByListProviderNamePanel, false);
            $(providerID).val().length > 0 ? toggleView(divProviderByListProviderIDPanel, true) : toggleView(divProviderByListProviderIDPanel, false);
            $(providerLocationID).val().length > 0 ? toggleView(divProviderByListProviderLocationIDPanel, true) : toggleView(divProviderByListProviderLocationIDPanel, false);
            $(providerTaxID).val().length > 0 ? toggleView(divProviderByListProviderTaxIDPanel, true) : toggleView(divProviderByListProviderTaxIDPanel, false);
            $(providerTaxonomy).val().length > 0 ? toggleView(divProviderByListProviderTaxonomyPanel, true) : toggleView(divProviderByListProviderTaxonomyPanel, false);

            //advance search
            $(claimType).data(kendoDropDownList).value($("#ClaimType_Name").val());
            $(claimSubType).data(kendoDropDownList).value($("#ClaimSubType_Name").val());
            $(claimStatus).data(kendoDropDownList).value($("#ClaimStatus_Name").val());
            $(claimSourceCode).data(kendoDropDownList).value($("#ClaimSourceCode_Name").val());
            $(payTo).data(kendoDropDownList).value($("#PayTo_Name").val());
            $(serviceType).data(kendoDropDownList).value($("#ServiceType_Name").val());
            $(diagnosisTypeList).data(kendoDropDownList).value($("#DiagnosisType_Name").val());

            $("#DiagnosisType_Name").val() === icd09Code ? toggleView(diagnosisCodeDivICD09, true) : toggleView(diagnosisCodeDivICD09, false);
            $("#DiagnosisType_Name").val() === icd10Code ? toggleView(diagnosisCodeDivICD10, true) : toggleView(diagnosisCodeDivICD10, false);
            hideSearchByControls();
        }

        if (savedSearch) {
            var claimsSearchCriteria = JSON.parse(savedSearch);
            sort = JSON.parse(claimsSearchCriteria.sort);
            searchfilter = JSON.parse(claimsSearchCriteria.searchfilter);
            var lengthFilter = searchfilter.filters.length;
            for (var i = 0; i < lengthFilter; i++) {
                if (searchfilter.filters[i].field == "PaidDate") {
                    searchfilter.filters[i].value = sessionStorage.getItem("SearchfilterValue");
                }
            }
            sessionStorage.removeItem("SearchfilterValue");
            page = claimsSearchCriteria.page;
            pageSize = claimsSearchCriteria.pageSize;
            searchCriteriaFound = true;
            var queryString = window.location.search.substring(1);
            if (queryString.length) {
                if (window.history != undefined && window.history.pushState != undefined) {
                    // add a new state to the history, to change the url without reloading the page
                    window.history.pushState({}, document.title, window.location.pathname);
                }
            }

            $(modifier1).attr("title", claimsSearchCriteria.modifierFirstTitle);
            $(modifier2).attr("title", claimsSearchCriteria.modifierSecondTitle);
            $(modifier3).attr("title", claimsSearchCriteria.modifierThirdTitle);
            $(modifier4).attr("title", claimsSearchCriteria.modifierFourthTitle);
            $(exceptionErrorCode).attr("title", claimsSearchCriteria.expErrorIdTitle);
            $(toothNumberFrom).attr("title", claimsSearchCriteria.toothNumFromTitle);
            $(toothNumberTo).attr("title", claimsSearchCriteria.toothNumToTitle);
            $(pridxcode9).attr("title", claimsSearchCriteria.primaryDiagnosisCode9Title);
            $(primaryDiagnosisCodeICD10).attr("title", claimsSearchCriteria.primaryDiagnosisCode10Title);
        }

        var rangeFromValue = $(totalBilledRangeFrom).val() !== "" ? (dollarsign + parseFloat($(totalBilledRangeFrom).val()).toFixed(2)) : $(totalBilledRangeFrom).val();
        var rangeTovalue = $(totalBilledRangeTo).val() !== "" ? (dollarsign + parseFloat($(totalBilledRangeTo).val()).toFixed(2)) : $(totalBilledRangeTo).val();
        $(totalBilledRangeFrom).parent().find("input").first().val(rangeFromValue);
        $(totalBilledRangeTo).parent().find("input").first().val(rangeTovalue);
        $(totalBilledRangeFrom).parent().find("input").first().attr('title', rangeFromValue);
        $(totalBilledRangeTo).parent().find("input").first().attr('title', rangeTovalue);
        $(claimIdentifiersListId).data(kendoDropDownList).value().length > 0 ? toggleAssocBox(divClaimsIdentifierAssocBox, true) : toggleAssocBox(divClaimsIdentifierAssocBox, false);
        $(dateTypeList).data(kendoDropDownList).value().length > 0 ? toggleAssocBox(divDateTypeAssocBox, true) : toggleAssocBox(divDateTypeAssocBox, false);
        $(claimMemberByList).data(kendoDropDownList).value().length > 0 ? toggleAssocBox(memberByAssocBox, true) : toggleAssocBox(memberByAssocBox, false);
        $(providerRoleList).data(kendoDropDownList).value().length > 0 ? toggleAssocBox(claimsAssocBox, true) : toggleAssocBox(claimsAssocBox, false);
        getSearchFilter();
        $(gridId).data("kendoGrid").dataSource.sort(sort);
        pageTarget = page;
        $(gridId).data("kendoGrid").dataSource.pageSize(pageSize);
        $(gridId).data("kendoGrid").dataSource.filter(searchfilter);
    };

    checkclaimsValidation = function () {
        var isValidDateRange = true;
        var isAtleastOneSearchCriteriaPresent = true;
        var isICNOrTCNLessThan3 = true;
        var isMemberLessThan3 = true;
        var isProviderLessThan3 = true;
        $(searchClaimStatus).empty();
        var message = searchClaimValidation;
        var claimIdentifierselected = $(claimIdentifiersListId).data(kendoDropDownList).value().length;
        var providerRoleselected = $(providerRoleList).data(kendoDropDownList).value().length;
        var claimMemberByselected = $(claimMemberByList).data(kendoDropDownList).value().length;
        $(searchClaimStatus).empty();
        if (new Date($(fromDateId).val()) > new Date($(toDateId).val())) {
            setKendoValidatorFieldMessage($(fromDateId), dateTypeValidation);
            isValidDateRange = false;
        }
        if (claimIdentifierselected === 0 && claimMemberByselected === 0 && providerRoleselected === 0 && isValidDateRange === true && validateAdvancedSearch() === true) {
            isAtleastOneSearchCriteriaPresent = false;
        }

        if ((claimIdentifierselected > 0) || (claimMemberByselected > 0) || (providerRoleselected > 0)) {

            if (validateclaimIdentifiers() && validateClaimMembers() && validateProviderRoles() && validateAdvancedSearch() == true) {
                isAtleastOneSearchCriteriaPresent = false;
            }
        }

        if ((claimIdentifierselected > 0 || validatesearchclaim() || validateAdvancedSearch() == true)) {
            if ($(ICN).val().length > 0 && $(ICN).val().length < 3) {
                setKendoValidatorFieldMessage($(ICN), patientAccountValidation);
                isICNOrTCNLessThan3 = false;
            }
            else if ($(tcnId).val().length > 0 && $(tcnId).val().length < 3) {
                setKendoValidatorFieldMessage($(tcnId), patientAccountValidation);
                isICNOrTCNLessThan3 = false;
            }
            else if ($(mcoICNId).val().length > 0 && $(mcoICNId).val().length < 3) {
                setKendoValidatorFieldMessage($(mcoICNId), patientAccountValidation);
                isICNOrTCNLessThan3 = false;
            }
        }

        if ((claimMemberByselected > 0 || validatesearchclaim() && validateClaimMembers() || validateAdvancedSearch() == true)) {
            if ($(claimMemberId).val().length > 0 && $(claimMemberId).val().length < 3) {
                setKendoValidatorFieldMessage($(claimMemberId), patientAccountValidation);
                isMemberLessThan3 = false;
            }
            else if ($(claimMemberName).val().length > 0 && $(claimMemberName).val().length < 3) {
                setKendoValidatorFieldMessage($(claimMemberName), patientAccountValidation);
                isMemberLessThan3 = false;
            }
            else if ($(patientAcct).val().length > 0 && $(patientAcct).val().length < 3) {
                setKendoValidatorFieldMessage($(patientAcct), patientAccountValidation);
                isMemberLessThan3 = false;
            }
        }
        if ((providerRoleselected > 0 || validatesearchclaim() || validateProviderRoles() || validateAdvancedSearch() == true)) {
            if ($(npi).val().length > 0 && $(npi).val().length < 3) {
                setKendoValidatorFieldMessage($(npi), patientAccountValidation);
                isProviderLessThan3 = false;
            }
            else if ($(providerName).val().length > 0 && $(providerName).val().length < 3) {
                setKendoValidatorFieldMessage($(providerName), patientAccountValidation);
                isProviderLessThan3 = false;
            }
            else if ($(providerID).val().length > 0 && $(providerID).val().length < 3) {
                setKendoValidatorFieldMessage($(providerID), patientAccountValidation);
                if ($(providerLocationID).val().length > 0 && $(providerLocationID).val().length < 3) {
                    setKendoValidatorFieldMessage($(providerLocationID), patientAccountValidation);
                    isProviderLessThan3 = false;
                }
                isProviderLessThan3 = false;
            }
            else if ($(providerTaxID).val().length > 0 && $(providerTaxID).val().length < 3) {
                setKendoValidatorFieldMessage($(providerTaxID), patientAccountValidation);
                isProviderLessThan3 = false;
            }
            else if ($(providerLocationID).val().length > 0 && $(providerID).val().length === 0) {
                setKendoValidatorFieldMessage($(providerID), providerIdRequired);

                if ($(providerLocationID).val().length > 0 && $(providerLocationID).val().length < 3) {
                    setKendoValidatorFieldMessage($(providerLocationID), patientAccountValidation);
                    isProviderLessThan3 = false;
                }
                isProviderLessThan3 = false;
            }
            else if ($(providerLocationID).val().length > 0 && $(providerLocationID).val().length < 3) {
                setKendoValidatorFieldMessage($(providerLocationID), patientAccountValidation);
                isProviderLessThan3 = false;
            }
        }
        if (status == false) {
            isAtleastOneSearchCriteriaPresent = false;
        }
        else if (isAtleastOneSearchCriteriaPresent === false) {
            item = formatGeneralMessage("Error", message);
            $(searchClaimStatus).append(item);
            hideLoadingDialog();
        }
        if ((isICNOrTCNLessThan3 === false || isMemberLessThan3 === false || isProviderLessThan3 === false || isValidDateRange === false)) {
            $(".validation-summary").show();
            hideLoadingDialog();
            return false;
        }

        return isAtleastOneSearchCriteriaPresent;
    };

    checkErrorValidations = function () {
        var totalBilledAmtstatus = validateTotalBilledAmt();
        var procCodestatus = validateProcCode();
        var toothNumberstatus = validateToothNumber();
        var authLength = validateLengthOfFeilds($("#AuthorizationNumber").val(), "", $("#AuthorizationNumber"), "");
        var opeLength = validateLengthOfFeilds($("#OperatorIdentifier").val(), "", $("#OperatorIdentifier"), "");
        var rALength = validateLengthOfFeilds($("#RANumber").val(), "", $("#RANumber"), "");
        if (!totalBilledAmtstatus || !procCodestatus || !toothNumberstatus || !authLength || !opeLength || !rALength) {
            $(".validation-summary").show();
            return false;
        }
        else {
            return true;
        }
    };

    validateTotalBilledAmt = function () {
        var dollarsSign = "$";
        var currentErrorStatus = true;
        var totalBilledAmtFrom = $(totalBilledRangeFrom).val();
        var totalBilledAmtTo = $(totalBilledRangeTo).val();
        if (totalBilledAmtFrom == "" && totalBilledAmtTo == "") {
            return true;
        }
        else {
            var fieldErrorStatus = checkForFieldErrors(totalBilledAmtFrom, totalBilledAmtTo, $(totalBilledRangeFrom), $("#TotalBilledRangeToSpinner"), totalbilledAmtFromNull, dollarsSign);
            if (parseInt(totalBilledAmtFrom) > parseInt($("#TotalBilledRangeTo").val())) {
                setKendoValidatorFieldMessage($(totalBilledRangeFrom), totalbilledAmtFromRange);
                currentErrorStatus = false;
            }
            if (!fieldErrorStatus || !currentErrorStatus) {
                return false;
            }
            else {
                return true;
            }
        }
    };

    validateProcCode = function () {
        var procCodeFrom = $("#ProcCodeFrom").val();
        var currentErrorStatus = true;
        var procCodeTo = $("#ProcCodeTo").val();
        if (procCodeFrom != "" || procCodeTo != "") {
            var fieldErrorStatus = checkForFieldErrors(procCodeFrom, procCodeTo, $("#ProcCodeFrom"), $("#ProcCodeTo"), procCodeRange, "");
            procCodeTo = $("#ProcCodeTo").val();
            var alphaErrorStatus = compareAlphaNumericChars(procCodeFrom, procCodeTo, $("#ProcCodeFrom"), procCodeRangeFrom);
            var numericErrorStatus = validateForNumericChars(procCodeFrom, procCodeTo, $("#ProcCodeFrom"), procCodeRangeFrom);
            var lengthErrorStatus = validateLengthOfFeilds($("#ProcCodeFrom").val(), $("#ProcCodeTo").val(), $("#ProcCodeFrom"), $("#ProcCodeTo"));
            if (procCodeFrom != "") {
                if ((!numReg.test(procCodeFrom) && numReg.test(procCodeTo)) || (numReg.test(procCodeFrom) && !numReg.test(procCodeTo))) {
                    setKendoValidatorFieldMessage($("#ProcCodeFrom"), procedureCodeRangeFromTo);
                    currentErrorStatus = false;
                }
            }
            if (!fieldErrorStatus || !alphaErrorStatus || !numericErrorStatus || !lengthErrorStatus || !currentErrorStatus) {
                return false;
            }
        }
        return true;
    };

    validateToothNumber = function () {
        var currentErrorStatus = true;
        var toothNumberFrom = $("#ToothNumberFrom").val();
        var toothNumberTo = $("#ToothNumberTo").val();
        if (toothNumberFrom != "" || toothNumberTo != "") {
            var fieldErrorStatus = checkForFieldErrors(toothNumberFrom, toothNumberTo, $("#ToothNumberFrom"), $("#ToothNumberTo"), toothNumberNull, "");
            toothNumberTo = $("#ToothNumberTo").val();
            var alphaErrorStatus = compareAlphaNumericChars(toothNumberFrom, toothNumberTo, $("#ToothNumberFrom"), toothNumberRange);
            var numericErrorStatus = validateForNumericChars(toothNumberFrom, toothNumberTo, $("#ToothNumberFrom"), toothNumberRange);
            if (toothNumberFrom != "") {
                if ((!numReg.test(toothNumberFrom) && numReg.test(toothNumberTo)) || (numReg.test(toothNumberFrom) && !numReg.test(toothNumberTo))) {
                    setKendoValidatorFieldMessage($("#ToothNumberFrom"), toothNumberFromTo);
                    currentErrorStatus = false;
                }
            }
            if (!fieldErrorStatus || !alphaErrorStatus || !numericErrorStatus || !currentErrorStatus) {
                return false;
            }
        }
        return true;
    };

    validateLengthOfFeilds = function (fromValue, toValue, assignFieldFrom, assignFieldTo) {
        var isLengthFromUpto3 = true;
        var isLengthToUpto3 = true;
        if (fromValue != "" && fromValue.length < 3) {
            setKendoValidatorFieldMessage(assignFieldFrom, atleast3CharReq);
            isLengthFromUpto3 = false;
        }
        if (toValue != "" && toValue.length < 3) {
            setKendoValidatorFieldMessage(assignFieldTo, atleast3CharReq);
            isLengthToUpto3 = false;
        }
        if (!isLengthFromUpto3 || !isLengthToUpto3) {
            return false;
        }
        return true;
    };

    checkForFieldErrors = function (fromValue, toValue, fieldName, valueAssignField, errorMsg, dollarsSign) {
        if (fromValue === null || fromValue === undefined || fromValue === "") {
            setKendoValidatorFieldMessage(fieldName, errorMsg);
            return false;
        }
        else if ((toValue === null || toValue === undefined || toValue === "")) {
            if (dollarsSign != "") {
                valueAssignField.val(dollarsSign + parseFloat(fromValue).toFixed(2));
                $("#TotalBilledRangeTo").val(fromValue);
            }
            else {
                valueAssignField.val(fromValue);
            }
        }
        return true;
    };

    compareAlphaNumericChars = function (fromValue, toValue, fieldName, errorMsg) {
        if (fromValue.localeCompare(toValue) === 1) {
            setKendoValidatorFieldMessage(fieldName, errorMsg);
            return false;
        }
        return true;
    };

    validateForNumericChars = function (fromValue, toValue, fieldName, errorMsg) {
        if (numReg.test(fromValue) && numReg.test(toValue)) {
            if (parseInt(fromValue) > parseInt(toValue)) {
                setKendoValidatorFieldMessage(fieldName, errorMsg);
                return false;
            }
        }
        return true;
    };

    validateAdvancedSearch = function () {
        var advanceSearchDropdownLength = [];
        advanceSearchDropdownLength.push($(claimType).data(kendoDropDownList).value().length);
        advanceSearchDropdownLength.push($(claimSubType).data(kendoDropDownList).value().length);
        advanceSearchDropdownLength.push($(claimStatus).data(kendoDropDownList).value().length);
        advanceSearchDropdownLength.push($(claimSourceCode).data(kendoDropDownList).value().length);
        advanceSearchDropdownLength.push($(payTo).data(kendoDropDownList).value().length);
        advanceSearchDropdownLength.push($(serviceType).data(kendoDropDownList).value().length);
        advanceSearchDropdownLength.push($(modifier1).val().length);
        advanceSearchDropdownLength.push($(modifier2).val().length);
        advanceSearchDropdownLength.push($(modifier3).val().length);
        advanceSearchDropdownLength.push($(modifier4).val().length);
        advanceSearchDropdownLength.push($(exceptionErrorCode).val().length);
        advanceSearchDropdownLength.push($(authorizationNumber).val().length);
        advanceSearchDropdownLength.push($(operatorIdentifier).val().length);
        advanceSearchDropdownLength.push($(ranNmber).val().length);
        advanceSearchDropdownLength.push($(pridxcode9).val().length);
        advanceSearchDropdownLength.push($(primaryDiagnosisCodeICD10).val().length);

        if ($(totalBilledRangeFrom).val() !== "0" && $(totalBilledRangeTo).val() !== "0") {
            if ($(totalBilledRangeFrom).val() <= $(totalBilledRangeTo).val()) {
                advanceSearchDropdownLength.push(1);
            }
            else {
                advanceSearchDropdownLength.push(0);
            }
        }

        if ($(procCodeFrom).val() !== "" && $(procCodeTo).val() !== "") {
            advanceSearchDropdownLength.push(1);
        }

        if ($(toothNumberFrom).val() !== "" && $(toothNumberTo).val() !== "") {
            advanceSearchDropdownLength.push(1);
        }

        function getSum(total, num) {
            return total + num;
        }

        var resultValidationCount = advanceSearchDropdownLength.reduce(getSum);

        if (resultValidationCount === 0) {
            return true;
        }
    };

    validatesearchclaim = function () {
        var validatesearchClaimstatus = false;
        var claimIdentifierselected = $(claimIdentifiersListId).data(kendoDropDownList).value().length;
        var providerRoleselected = $(providerRoleList).data(kendoDropDownList).value().length;
        var claimMemberByselected = $(claimMemberByList).data(kendoDropDownList).value().length;

        if (claimIdentifierselected === 0 && claimMemberByselected === 0 && providerRoleselected === 0) {
            validatesearchClaimstatus = true;
        }

        return validatesearchClaimstatus;
    };

    validateclaimIdentifiers = function () {
        var validateClaimIdentifierstatus = false;
        if ($(ICN).val().length === 0 && $(tcnId).val().length === 0 && $(mcoICNId).val().length === 0) {
            validateClaimIdentifierstatus = true;
        }

        return validateClaimIdentifierstatus;
    };

    validateClaimMembers = function () {

        var validateclaimMemberstatus = false;
        if ($(claimMemberId).val().length === 0 && $(claimMemberName).val().length === 0 && $(patientAcct).val().length === 0) {
            validateclaimMemberstatus = true;
        }

        return validateclaimMemberstatus;
    };


    validateProviderRoles = function () {
        var providerBySelected = $(providerByList).data(kendoDropDownList).value().length;
        var validateProviderRolestatus = false;
        if (providerBySelected === 0 || ($(npi).val().length === 0 && $(providerName).val().length === 0 && $(providerID).val().length === 0 && $(providerTaxID).val().length === 0 && $(providerTaxonomy).val().length === 0 && $(providerLocationID).val().length === 0)) {
            validateProviderRolestatus = true;
        }
        return validateProviderRolestatus;
    };

    saveSearchCriteria = function () {
        sort = grid.dataSource.sort();
        page = grid.dataSource.page();
        pageSize = grid.dataSource.pageSize();
        searchfilter = grid.dataSource.filter();
        var lengthFilter = searchfilter.filters.length;
        for (var i = 0; i < lengthFilter; i++) {
            if (searchfilter.filters[i].field == "PaidDate") {
                var filterDate = searchfilter.filters[i].value;
                if (filterDate != null) {
                    var lengthString = filterDate.toString().split(" ").length;
                    if (lengthString > 5) {
                        var timeString = filterDate.getFullYear() + '-' + (filterDate.getMonth() + 1) + '-' + filterDate.getDate() + ' ' + filterDate.getHours() + ':' + filterDate.getMinutes() + ':' + filterDate.getSeconds();
                        sessionStorage.setItem("SearchfilterValue", timeString);
                    }
                    else {
                        sessionStorage.setItem("SearchfilterValue", filterDate);
                    }
                }
            }
        }
        sessionStorage.removeItem(savedClaimsSearch);
        var claimsSearchCriteria = {
            modifierFirstTitle: $(modifier1).attr(title),
            modifierSecondTitle: $(modifier2).attr(title),
            modifierThirdTitle: $(modifier3).attr(title),
            modifierFourthTitle: $(modifier4).attr(title),
            expErrorIdTitle: $(exceptionErrorCode).attr(title),
            toothNumFromTitle: $(toothNumberFrom).attr(title),
            toothNumToTitle: $(toothNumberTo).attr(title),
            primaryDiagnosisCode9Title: $(pridxcode9).attr(title),
            primaryDiagnosisCode10Title: $(primaryDiagnosisCodeICD10).attr(title),
            sort: JSON.stringify(sort),
            searchfilter: JSON.stringify(searchfilter),
            page: page,
            pageSize: pageSize
        };
        sessionStorage.setItem(savedClaimsSearch, kendo.stringify(claimsSearchCriteria));
    };
    resetClaimsSearch = function () {
        $(claimsSearchResultsPanel).hide();

    };

    reset = function () {
        var divAdvacedSearchClaims = "#divAdvancedSearchClaims";
        var plusMinusAdvancedSearchClaimsClick = "#plusMinusAdvancedSearchClaimsClick";
        var plusMinusAdvancedSearchClaims = "#plusMinusAdvancedSearchClaims";
        var faPlusSquare = "fa-square-plus";
        var faMinusSquare = "fa-square-minus";
        var panelCollapsed = "panel-collapsed";
        var panelExpanded = "panel-expanded";

        if ($(gridId).data("kendoGrid").dataSource._filter !== undefined) {
            for (count = 0; count < $(gridId).data("kendoGrid").dataSource._filter.filters.length; count++) {
                if ($(gridId).data("kendoGrid").dataSource._filter.filters[count].field === 'ICN' ||
                    $(gridId).data("kendoGrid").dataSource._filter.filters[count].field === 'PaidDate') {
                    $(gridId).data("kendoGrid").dataSource._filter = null;
                    break;
                }
            }
        }
        if ($(gridId).data("kendoGrid").dataSource._sort !== null) {
            $(gridId).data("kendoGrid").dataSource._sort = null;
        }
        hideSearchByControls();
        $(divDatePanel).hide();
        $(divProviderByList).hide();
        $(divProviderByListNPIPanel).hide();
        $(divProviderByListProviderIDPanel).hide();
        $(divProviderByListProviderNamePanel).hide();
        $(divProviderByListProviderLocationIDPanel).hide();
        $(divProviderByListProviderTaxIDPanel).hide();
        $(divProviderByListProviderTaxonomyPanel).hide();
        $(diagnosisTypeList).data("kendoDropDownList").value(-1);
        $(ICN).val("")[0].defaultValue = "";
        $(tcnId).val("")[0].defaultValue = "";
        $(mcoICNId).val("")[0].defaultValue = "";
        $(modifier1).val("")[0].defaultValue = "";
        $(modifier2).val("")[0].defaultValue = "";
        $(modifier3).val("")[0].defaultValue = "";
        $(modifier4).val("")[0].defaultValue = "";
        $(toothNumberFrom).val("")[0].defaultValue = "";
        $(toothNumberTo).val("")[0].defaultValue = "";
        $(totalBilledRangeFrom).val("")[0].defaultValue = "0";
        $(totalBilledRangeTo).val("")[0].defaultValue = "0";
        $(exceptionErrorCode).val("")[0].defaultValue = "";
        $(authorizationNumber).val("")[0].defaultValue = "";
        $(operatorIdentifier).val("")[0].defaultValue = "";
        $(procCodeTo).val("")[0].defaultValue = "";
        $(ranNmber).val("")[0].defaultValue = "";
        $(procCodeFrom).val("")[0].defaultValue = "";
        $(pridxcode9).val("")[0].defaultValue = "";
        $(pridxcode9).attr('title', "");
        $(pridxcode10).val("")[0].defaultValue = "";
        $(pridxcode10).attr('title', "");
        $(modifier1).attr('title', "");
        $(modifier2).attr('title', "");
        $(modifier3).attr('title', "");
        $(modifier4).attr('title', "");
        $(toothNumberFrom).attr('title', "");
        $(toothNumberTo).attr('title', "");
        $(exceptionErrorCode).attr('title', "");
        $(diagnosisCodeDivICD10).hide();
        $(diagnosisCodeDivICD09).hide();
        toggleAssocBox(claimsAssocBox, false);
        toggleAssocBox(divClaimsIdentifierAssocBox, false);
        toggleAssocBox(divDateTypeAssocBox, false);
        toggleAssocBox(divMemberByAssocBox, false);
        hideMemberByControls();
        $(claimMemberByList).data("kendoDropDownList").value(-1);
        $(dateTypeList).data("kendoDropDownList").value(-1);
        $(searchClaimStatus).empty();
        $(iCNPanel).hide();
        $(tcnPanel).hide();
        $(mcoICNPanel).hide();
        $(divAdvacedSearchClaims).hide();
        $(plusMinusAdvancedSearchClaims).addClass(faPlusSquare).removeClass(faMinusSquare);
        $(plusMinusAdvancedSearchClaimsClick).addClass(panelCollapsed);
        $(plusMinusAdvancedSearchClaims).attr("title", expand);
        $(fromDateId).val(defaultFromDate);
        $(toDateId).val(defaultToDate);
    };

    claimsGridOnDataBound = function (e) {
        checkGridForNoRecordsFound(e);
        e.preventDefault();
        saveSearchCriteria();

        grid = e.sender;
        if (grid.dataSource.total() > 0) {
            grid.select("tr:eq(0)");
            var cell = grid.tbody.find("tr[role='row'] td:first");
            grid.current(cell);
            grid.table.focus();

            var rowCount = grid.dataSource.data().length;
            if (setToLastRow === true) {
                selectClaimRow(rowCount - 1);
                setToLastRow = false;
            }
            else {
                selectClaimRow(0);
            }
            $(selectedClaimPanelId).show();
        }
        else {
            $(selectedClaimPanelId).hide();
        }
    };

    claimsGridOnDataBinding = function (e) {
        var faPlusSquare = "fa-square-plus";
        var faMinusSquare = "fa-square-minus";
        var panelCollapsed = "panel-collapsed";

        $(claimsSearchResultsPanel).show();
        if (e.items.length === 0) {
            $(".panel-body").show();
        }
        else {
            $(divSearchClaims).hide();
            $(plusMinusSearchClaims).addClass(faPlusSquare).removeClass(faMinusSquare);
            $(plusMinusSearchClaimsClick).addClass(panelCollapsed);
        }

        hideLoadingDialog();
    };


    claimsGridOnRowSelected = function (e) {
        var IsGridDataRetained = "IsGridDataRetained";
        countGridCall = countGridCall + 1;
        if (sessionStorage.getItem(IsGridDataRetained) === "True") {
            $(gridId).data("kendoGrid").dataSource.page(pageTarget);
            sessionStorage.setItem(IsGridDataRetained, "False");
            allowGridSelect = "True";
        }
        selectedRow = e.sender.select();
        var item = e.sender.dataItem(selectedRow);
        var grid = $(gridId).data("kendoGrid");
        if (item !== undefined) {
            var memberDOB = convertDateTimetoLocal(item.MemberDOB);
            item.MemberDOB = memberDOB;
            $.ajax({
                type: "POST"
                , async: false
                , url: "/ClaimsManagement/GetClaimsQuickInfo"
                , data: JSON.stringify({
                    searchResultsModel: item
                })
                , contentType: "application/json"
                , success: onLoadQuickInfoSuccess
            });
            var rows = grid.items();
            var currSelRowIndex = rows.index(grid.select());
            claimsGridCalcPrevNextButton(currSelRowIndex);
            $('input[readonly="readonly"]').attr('tabindex', -1);
            $('.chk-disabled').attr('tabindex', -1);
        }
        $("#EmergencyIndicator").attr('disabled', true);
        $("#PrimaryDiagnosis_Code").attr("title", $("#PrimaryDiagnosis_CodeDescr").val());

    };

    onLoadQuickInfoSuccess = function (data) {
        var returnFocusRecord;
        var getCurrentGrid = $(gridId).data("kendoGrid");
        var quickInfoSectionId = "#quickInfoSection";
        $(quickInfoSectionId).html(data);
        $(quickInfoSectionId).show();
        configureReadOnlyControls();
        if ((countGridCall == 4) && (allowGridSelect == "True")) {
            var savedrow = $(gridId).find("tr:eq(" + sessionStorage.getItem(rowTarget) + ")");
            allowGridSelect = "False";
            returnFocusRecord = "True";
            $(gridId).data("kendoGrid").select(savedrow);
        }
        if (returnFocusRecord == "True") {
            getCurrentGrid.element.find(".k-grid-content").animate({
                scrollTop: getCurrentGrid.select().position().top - getCurrentGrid.element.find('.k-grid-content').position().top + getCurrentGrid.element.find('.k-grid-content').scrollTop()
            });
            returnFocusRecord = "False";
        }
    };

    claimsGridCalcPrevNextButton = function (currSelRowIndex) {
        var totalCount = grid.dataSource.total();
        var page = grid.dataSource.page();
        var pageSize = grid.dataSource.pageSize();
        var prevClaimButtonId = "#prevClaimButton";
        var nextClaimButtonId = "#nextClaimButton";
        var kendoButton = "kendoButton";
        currSelRowIndex = currSelRowIndex + ((page - 1) * pageSize);

        if (totalCount === (currSelRowIndex + 1)) {
            if (totalCount === 1) {
                $(prevClaimButtonId).kendoButton().data(kendoButton).enable(false);
            }
            else {
                $(prevClaimButtonId).kendoButton().data(kendoButton).enable(true);
            }
            $(nextClaimButtonId).kendoButton().data(kendoButton).enable(false);
        }
        else {
            if (currSelRowIndex === 0) {
                $(prevClaimButtonId).kendoButton().data(kendoButton).enable(false);
                $(nextClaimButtonId).kendoButton().data(kendoButton).enable(true);
            }
            else {
                $(prevClaimButtonId).kendoButton().data(kendoButton).enable(true);
                $(nextClaimButtonId).kendoButton().data(kendoButton).enable(true);
            }
        }
    };

    claimsGridOnExportExcel = function () {
        $(gridId).getKendoGrid().saveAsExcel();
    };

    claimsGridOnExportPDF = function () {
        $(gridId).getKendoGrid().saveAsPDF();
    };

    //---------------------------------------------
    // Model Editor Event Hooks
    //---------------------------------------------
    editorNextPreprocess = function () {
        var cancel = false;
        sessionStorage.setItem(isReturnToSearch, falseId);
        return cancel;
    };

    editorNextPostValidate = function () {
        var cancel = true;
        showLoadingDialog();
        getSearchFilter();
        return cancel;
    };

    editorCancelPreprocess = function () {
        var cancel = false;

        return cancel;
    };

    editorResetPreprocess = function () {
        var cancel = false;
        hideSummaryErrors();
        reset();
        resetClaimsSearch();
        return cancel;
    };

    editorResetPostprocess = function () {
        var defaultrange = "$0.00";
        $(totalBilledRangeFrom).parent().find("input").first().val(defaultrange);
        $(totalBilledRangeTo).parent().find("input").first().val(defaultrange);
        $(totalBilledRangeFrom).parent().find("input").first().attr('title', defaultrange);
        $(totalBilledRangeTo).parent().find("input").first().attr('title', defaultrange);

        var dateDataTypeRes = $(dateTypeList).data(kendoDropDownList);
        dateDataTypeRes.value("DOS");
        dateDataTypeRes.trigger("change");

        var icdDataTypeRes = $(diagnosisTypeList).data(kendoDropDownList);
        icdDataTypeRes.value("02");
        icdDataTypeRes.trigger("change");

        var provByList = $(providerByList).data(kendoDropDownList);
        provByList.value("NP");

        initializeProviderRoleControls();

        clearLocalStorage();
    };

    editorInitStepPreprocess = function () {
        var cancel = false;

        //Add logic here

        return cancel;
    };

    processNext = function () {
        makeAsyncWebApiCall(searchWebApiUrl, "POST", $(formId).serialize(), "application/x-www-form-urlencoded", "");
    };

    clearLocalStorage = function () {
        sessionStorage.setItem(isReturnToSearch, falseId);
        sessionStorage.removeItem(savedClaimsSearch);
    };

    $(gridId).on("dblclick", "tr.k-state-selected", function (e) {
        var grid = $(gridId).data("kendoGrid");
        var dataitem = grid.dataItem($(this));
        if (dataitem !== undefined) {
            var icn = dataitem.ICN;
            var claimStatus = dataitem.ClaimStatus.ID;
            var claimType = dataitem.ClaimType.ID;
            claimsManagementCreateUrl(icn, claimStatus, claimType, e);
        }
    });

    claimsManagementCreateUrl = function (icn, claimStatus, claimType, e) {
        var pageUrl;
        var pended = "11";
        var DentalID = "DE";
        var MedicalID = "ME";
        var OutpatientID = "OP";
        var InpatientID = "IP";
        if (claimStatus === pended && claimType === DentalID) {
            pageUrl = informationPageEditUrl;
        }
        else {
            pageUrl = informationPageUrl;
        }
        var currentGrid = $(gridId).data("kendoGrid").dataSource.data();
        var excepted = icn;
        $.each(currentGrid, function (idx, elem) {
            if (elem.ICN === excepted) {
                sessionStorage.setItem(rowTarget, idx + 1);
            }
        });

        e = e || window.event;
        switch (e.which) {
            case 1: window.location = pageUrl + "?ICN=" + icn;
                break;
            case 2: window.location = pageUrl + "?ICN=" + icn;
                break;
            case 3: $(e.target).prop('href', pageUrl + "?ICN=" + icn);
                break;
        }
        sessionStorage.setItem("IsRedirect", falseId);
    };

    claimIdentifiersListChange = function (e) {
        initializeSearchByControls();
        var showAssocBox = false;
        var claimIdentifierId = this.value();
        switch (claimIdentifierId) {
            case selectedICN:
                toggleView(iCNPanel, true);
                showAssocBox = true;
                break;
            case selectedTCN:
                toggleView(tcnPanel, true);
                showAssocBox = true;
                break;
            case selectedMCOICN:
                toggleView(mcoICNPanel, true);
                showAssocBox = true;
                break;
        }

        toggleAssocBox(claimsIdentifierAssocBox, showAssocBox);
    };

    hideSearchByControls = function () {
        var savedSearch = sessionStorage[savedClaimsSearch];
        if (!savedSearch) {
            $(iCNPanel).hide();
            $(tcnPanel).hide();
            $(mcoICNPanel).hide();
            $(memberIdPanel).hide();
            $(memberNamePanel).hide();
            $(divProviderByListNPIPanel).hide();
            $(divProviderByListProviderNamePanel).hide();
            $(divProviderByListProviderIDPanel).hide();
            $(divProviderByListProviderTaxIDPanel).hide();
            $(divProviderByListProviderLocationIDPanel).hide();
            $(divProviderByListProviderTaxonomyPanel).hide();
        }
        else {
            $("#ClaimIdentifiers_Name").val() === selectedICN ? $(iCNPanel).show() : $(iCNPanel).hide();
            $("#ClaimIdentifiers_Name").val() === selectedTCN ? $(tcnPanel).show() : $(tcnPanel).hide();
            $("#ClaimIdentifiers_Name").val() === selectedMCOICN ? $(mcoICNPanel).show() : $(mcoICNPanel).hide();
            $("#MemberBy_Name").val() === memberId ? $(memberIdPanel).show() : $(memberIdPanel).hide();
            $("#MemberBy_Name").val() === memberName ? $(memberNamePanel).show() : $(memberNamePanel).hide();
            $("#ProviderBy_Name").val() === providerNumber && $.trim($(npi).val()) !== "" ? $(divProviderByListNPIPanel).show() : $(divProviderByListNPIPanel).hide();
            $("#ProviderBy_Name").val() === name ? $(divProviderByListProviderNamePanel).show() : $(divProviderByListProviderNamePanel).hide();
            $("#ProviderBy_Name").val() === id ? $(divProviderByListProviderIDPanel).show() : $(divProviderByListProviderIDPanel).hide();
            $("#ProviderBy_Name").val() === providerTax ? $(divProviderByListProviderTaxIDPanel).show() : $(divProviderByListProviderTaxIDPanel).hide();
            $("#ProviderBy_Name").val() === taxonomy ? $(divProviderByListProviderTaxonomyPanel).show() : $(divProviderByListProviderTaxonomyPanel).hide();
            if (($("#ProviderBy_Name").val() === id) && ($("#ProviderRole_Name").val() === "PF")) {
                $(divProviderByListProviderLocationIDPanel).show();
            }
            else {
                $(divProviderByListProviderLocationIDPanel).hide();
            }
        }
    };

    initializeSearchByControls = function () {
        $(ICN).val("");
        $(tcnId).val("");
        $(mcoICNId).val("");
        toggleView(iCNPanel, false);
        toggleView(tcnPanel, false);
        toggleView(mcoICNPanel, false);
    };

    toggleView = function (control, displayed) {
        displayed === true ? $(control).show() : $(control).hide();
    };

    toggleAssocBox = function (control, displayed) {
        var assocbox = 'assoc-box';
        displayed === true ? $(control).addClass(assocbox) : $(control).removeClass(assocbox);
    };
})(window, jQuery);
