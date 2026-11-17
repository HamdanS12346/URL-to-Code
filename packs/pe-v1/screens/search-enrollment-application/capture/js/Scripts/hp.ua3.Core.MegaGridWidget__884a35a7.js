//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------
(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        //HTML Tags
        tabStrip = "#mggdfTabstrip",
        availableListItems = "#availableListItems",
        selectedListItems = "#selectedListItems",
        userSelectionDropDown = ".mg-group-dropdown",
        moveItemToSelected = ".moveItemToSelected",
        moveItemToAvailable = ".moveItemToAvailable",
        upButton = ".mgItemsUp",
        downButton = ".mgItemsDown",
        groupNameCheckbox = "#groupNameCheckbox",
        toggleGroupCheckbox = "#toggleGroup",
        toggleGroupName = "#toggleGroupName",
        acceptButton = "#acceptButton",
        sortGroupRadio = "#sortGroupRadio",
        filterGroupSection = "#mgfilterGroupSection", // TODO: Rename to "#mgFilterGroupSection" and update HTML Block
        gridExportButton = "#gridExportButton",
        filterPanelColumns = "#filterPanelColumns",
        mgFullScreenButton = "#mgFullScreenButton",
        activeGroupClass = ".mg-changebackground", // TODO: Rename to ".mg-change-background" and update HTML Block
        userSelectionName = ".mg-filter-userCustomArea", // TODO: Rename to ".mg-filter-user-custom-area" and update HTML Block
        userSavedSelectionDropdown = ".save-selection-panel",
        userCustomNameTextBox = ".user-selection-click",
        saveButton = ".mg-save-click",
        userSelectionText = ".mgUserSelectionText",
        alertMessageBox = ".mg-alert-box",
        alertMessageCloseIcon = ".mg-alert-close",
        alertCancelButton = ".mgCancelButton",
        alertOkButton = ".mgOkButton",
        gridDataFilterPopup = ".mg-ViewGridDataFilterPopup", // TODO: Rename to ".mg-view-grid-data-filter-popup" and update HTML Block
        gridDataFilterButton = ".mgGridDataFilterButton",
        mgFullScreen = "mg-fullScreen",
        mgMegaGridContainerClass = ".mg-mega-grid-container",
        gridDataButtonInactive = "mg-grid-data-filter-btn",
        gridDataButtonActive = "mg-grid-data-filter-pp-btn",
        tabStripButtonList = ".mg-tabstrip-button-list",
        tabStripButtonText = ".mg-tab-icon-text",
        tabStripWhiteIconColor = "mg-whiteiconcolor",
        tabStripBlueIconColor = "mg-blueiconcolor",
        sortGroup = "sortGroup",
        megaGridParentClass = "mg-grid",
        controlName = "MegaGrid",
        kendoControlName = "kendoMegaGrid",
        dataIndexAttribute = "data-index",
        defaultText = 'No filter', // Not Locale Specific - Same Text in all the locales
        currentFilterSelectionText = 'Last created filter', // Not Locale Specific - Same Text in all the locales
        dropDownList = '[data-role=dropdownlist]',
        filterDropDown = "#megaGridUserSelections-list",
        GROUPPANEL = 0,
        SORTPANEL = 1,
        SELECTPANEL = 2,
        CLOSEMESSAGE = 0,
        INCOMPLETESTEPMESSAGE = 1,
        SKIPSTEPMESSAGE = 2,
        SELECTIONNAMEUPDATEMESSAGE = 3,
        SELECTIONNAMERESERVEDMESSAGE = 4,
        DELETEFILTERSELECTION = 5,
        SHAREDTEMPLATEOVERRIDEMESSAGE = 6,
        UNIQUENAME = 1,
        RESERVEDNAME = 2,
        DUPLICATENAME = 3,
        SHAREDTEMPLATENAME = 4,
        groupCount = 10,
        groupTabStrip = ".mg-grouptab",
        that = [],
        visibleColumns = [],
        sortedColumns = [],
        GroupClass = function () {
            this.visible = false;
            this.name = "";
            this.displayName = '';
            this.columns = [];
            this.visibleColumns = [];
            this.freeze = "";
            this.filterGroupSelect = false;
            this.groupIndex = 0;
            this.filterGroupSelectTemp = false;
            this.Isfreeze = false;
            this.hideGroupHeaderAndGranular = false;
        },
        ParamClass = function () {
            this.userSelection = [];
            this.groupSelection = [];
            this.sortSelection = [];
            this.filterSelection = [];
            this.initialGridConfig = [];
            this.userCustomName = "";
            this.userSelectionBuffer = "";
            this.IsTemplate = false;
        };
    var MegaGrid = ui.Grid.extend({
        _userDataBoundEvent: null,
        _userSelectionData: null,
        initialLoad: true,
        init: function (element, options) {
            that = this;
            $(element).addClass(megaGridParentClass);
            that._preInit(options);
            ui.Grid.fn.init.call(that, element, options);
            that.sortedColumns = JSON.parse(JSON.stringify(that.columns));
            that._create();
            that._attachEvents();

        },
        _preInit: function (options) {
            that._setupDataBoundEvents(options);
            that._setupVariables();
        },
        options: {
            name: controlName,
            //Alert message text blocks
            gridDataFilterCloseText: '',
            filterStepNotCompletedText: '',
            skipSortSelectionText: '',
            selectionNameUpdateText: '',
            selectionNameReservedText: '',
            filterDeletionConfirmation: '',
            sharedTemplateOverrideMessage: '',
            //Template Localization elements
            chooseExistingFilterText: '',
            createNewFilterText: '',
            tabstripGroupText: '',
            tabstripSortText: '',
            tabstripSelectText: '',
            checkToCreateText: '',
            groupConstantText: '',
            customLabelText: '',
            selectAGroupText: '',
            availableColumnsText: '',
            selectedColumnsText: '',
            selectGroupToFilterText: '',
            checkToShowColumnText: '',
            freezeText: '',
            nameYourNewFilterText: '',
            preferencesText: '',
            clearText: '',
            acceptText: '',
            saveText: '',
            //Unique key
            gridId: '',
            defaultLocaleText: '',
            currentFilterSelectionLocaleText: '',
            //Urls
            saveUserSelectionUrl: '',
            getUserSavedSelectionUrl: '',
            getUserSelectionUrl: '',
            deleteUserSelectionUrl: '',

            headerGrouping: '',
            filterHeaderTemplate: '',
            filterBodyTemplate: '',
            alertMessageTemplate: '',
            gridDataFilterTemplate: '',
            defaultTemplateItems: [],
            defaultNotExistTemplateItems: []
        },
        _setupDataBoundEvents: function (options) {
            that._userDataBoundEvent = options.dataBound;
            options.dataBound = function (e) {
                //Widget specific data bound functions
                that._bindGroup();
                that._checkMegaGridForNoRecordsFound(e);
                // User specified data bound functionality
                if (that._userDataBoundEvent != null || that._userDataBoundEvent != undefined) {
                    that._userDataBoundEvent(e);
                }
                if (e.sender.pager) {
                    e.sender.pager.resize();
                }
            };
        },
        _attachEvents: function () {
            for (index = 1; index < groupCount; index++) {
                that.element.find("#toggleGrpName" + index).on("click", $.proxy(that._groupHeaderFilterColumns, that, index));
            }

            that.element.find(".close-click").click(function () {
                that._showMessageBox(CLOSEMESSAGE);
            });
            that.element.find(".mg-clear-click").click(function (e) {
                that._onClearClick(e);
            });
            that.element.find(moveItemToSelected).click(function (e) {
                that._moveItemToSelected(e);
            });
            that.element.find(moveItemToAvailable).click(function (e) {
                that._moveItemToAvailable(e);
            });
            that.element.find(upButton).click(function (e) {
                that._shiftItemsTop(e);
            });
            that.element.find(downButton).click(function (e) {
                that._shiftItemsDown(e);
            });
            that.element.find(groupNameCheckbox + " input[type=checkbox]").change(function (e) {
                $.proxy(that._groupNameCheckboxChange, this)();
            });
            that.element.find(acceptButton).click(function (e) {
                that._onAcceptClick(e);
            });
            that.element.find(tabStrip).getKendoTabStrip().bind("select", function (e) {
                that._onTabChange(e);
            });
            that.element.find(sortGroupRadio + " input[name=radioSortGroup]").change(function (e) {
                that._onRadioSortGroupChange(e);
            });
            that.element.find(userCustomNameTextBox).bind('input', function (e) {
                that._onUserSelectionNameChange(e);
            });
            that.element.find(saveButton).click(function (e) {
                if (that._validateFilterSelection()) {
                    that._mergeFilterSelection();
                    that._processSaveRequest();
                } else {
                    that._showMessageBox(INCOMPLETESTEPMESSAGE);
                }

            });
            // TODO: Rename to ".mg-filter-template-area" and update HTML Block
            that.element.find(gridDataFilterButton).click(function (e) {
                if ($(this).hasClass(gridDataButtonInactive)) {
                    $(this).removeClass(gridDataButtonInactive).addClass(gridDataButtonActive);
                    that.element.find(gridDataFilterPopup).show();
                    that.element.find(tabStrip).getKendoTabStrip().activateTab(that.element.find(groupTabStrip));
                    that.element.find('.mg-filter-templateArea input[type="checkbox"]').prop('checked', that._userSelectionData.IsTemplate);
                    that._setupGroupTab();
                    that._initializeGridDataFilterPanels();
                    that._highlightSelectedTab(GROUPPANEL);
                }
            });

            that.element.find(mgFullScreenButton).click(function (e) {
                if ($(mgMegaGridContainerClass).parent().hasClass(mgFullScreen)) {
                    $(mgMegaGridContainerClass).parent().removeClass(mgFullScreen);
                    $(mgFullScreenButton).addClass(' fa-down-left-and-up-right-to-center');
                    $(mgFullScreenButton).removeClass('fa-up-right-and-down-left-from-center');
                    that._initializeGridTypeHeight();
                }
                else {
                    $(mgMegaGridContainerClass).parent().addClass(mgFullScreen);
                    $(mgMegaGridContainerClass).find(".k-grid-content").css('height', '51rem');
                    $(mgFullScreenButton).addClass('fa-up-right-and-down-left-from-center');
                    $(mgFullScreenButton).removeClass('fa-down-left-and-up-right-to-center');
                }
            });
            this.element.find(gridExportButton).click(function (event) {
                var visibleColumns = that.element.find('th.k-header:visible');
                var selectedColumns = [];
                for (var i = 0; i < visibleColumns.length; i++) {
                    selectedColumns.push($(visibleColumns[i]).data('field'));
                }

                var availableColumns = [];
                $.each(that._userSelectionData.out, function (index, element) {
                    availableColumns.push(element.Datafield);
                });

                var excludedColumns = availableColumns.filter(function (element) {
                    return selectedColumns.indexOf(element) < 0;
                });

                event.filterColumns = that.getFilterColumns();
                event.sortedColumns = that.getSortedColumns();
                event.includedColumns = selectedColumns;
                event.excludedColumns = excludedColumns;
                onGridExportDataClick(event);
            });
        },

        getSortedColumns: function () {
            var sortColumns = [];
            sortColumns = that.dataSource.sort();
            var Sorts = [];
            var length = 0;
            var index = 0;

            if (sortColumns != null) {
                length = sortColumns.length;
                for (index = 0; index < length; index++) {
                    Sorts.push({
                        Member: sortColumns[index].field,
                        SortDirection: that.getSortDirection(sortColumns[index].dir)
                    });
                }

                return JSON.stringify(Sorts);
            }
            else {
                return "";
            }
        },

        getFilterColumns: function () {
            var index = 0;
            var filterColumns = [];
            filterColumns = that.dataSource.filter();
            var Filters = [];
            var length = 0;

            if (filterColumns != null && filterColumns.filters != null) {
                length = filterColumns.filters.length;
                for (index = 0; index < length; index++) {
                    Filters.push({
                        Member: filterColumns.filters[index].field,
                        Value: filterColumns.filters[index].value,
                        Operator: that.getFilterOperator(filterColumns.filters[index].operator)
                    });
                }
                return JSON.stringify(Filters);
            }
            else {
                return "";
            }
        },

        getFilterOperator: function (operator) {
            switch (operator) {
                case "lt":
                    return 0;
                case "lte":
                    return 1;
                case "eq":
                    return 2;
                case "neq":
                    return 3;
                case "gte":
                    return 4;
                case "gt":
                    return 5;
                case "startswith":
                    return 6;
                case "endswith":
                    return 7;
                case "contains":
                    return 8;
                case "iscontainedin":
                    return 9;
                case "doesnotcontain":
                    return 10;
                case "isnull":
                    return 11;
                case "isnotnull":
                    return 12;
                case "isempty":
                    return 13;
                case "isnotempty":
                    return 14;
                default:
                    return 2;
            }
        },

        getSortDirection: function (dir) {
            if (dir == "asc") {
                return 0;
            }
            else {
                return 1;
            }
        },

        _create: function () {
            that.element.find('.k-grid-header-wrap tr[role="row"] th a').attr("tabindex", "-1"); // Kendo columns hide themselves when being tabbed over
            that._localizeGridDataFilterTemplate();
            that.options.headerGrouping = that.options.headerGrouping.replace("{0}", that.options.gridDataFilterTemplate);
            var headerTemplate = kendo.template(that.options.headerGrouping);
            that.element.prepend(headerTemplate(that.options));
            that._initializeGridTypeHeight();
            that._createControls();
            that._initializeVariables();
            //Make sure that the filter popup is not shown
            that._hideFilterPopup();
        },
        //Event Handlers
        _onClearClick: function (e) {
            var currentTab = that.element.find(tabStrip).data('kendoTabStrip').select().index();
            switch (currentTab) {
                case GROUPPANEL:
                    that._clearGroupPanel(); that._mergeGroupSelection();
                    that._loadSortSelection(); that._mergeSortSelection();
                    that._loadFilterSelection(); that._setupGroupTab();
                    break;
                case SORTPANEL:
                    that._clearSortPanel(); that._mergeSortSelection();
                    that._loadFilterSelection(); that._setupSortPanel();
                    break;
                case SELECTPANEL:
                    that._clearFilterPanel(); that._setupFilterTab();
                    break;
            }
        },
        _onMegaGridDataBound: function (e) {
            //Logic goes here
        },
        _moveItemToSelected: function (e) {
            var selectedItemsCount = $("input:radio[name='radioSortGroup']:enabled").length;
            if (selectedItemsCount > 0) {
                var listAvailableColumns = $(availableListItems).getKendoListView();
                var availableListDataSource = $(availableListItems).getKendoListView().dataSource;
                var selected = $.map(listAvailableColumns.select(), function (element) {
                    var item = availableListDataSource.view()[$(element).index()];
                    $(selectedListItems).getKendoListView().dataSource.add({ Name: item.Name, Value: item.Value, Datafield: item.Datafield });
                    return $(element).index();
                });
                $.each(selected, function (index, value) {
                    var item = availableListDataSource.view()[selected[index] - index];
                    availableListDataSource.remove(item);
                });
                that._saveCurrentGroupSelection();
            }
        },
        _moveItemToAvailable: function (e) {
            var selectedItemData = $(selectedListItems).getKendoListView();
            var selectedItemDataSource = $(selectedListItems).getKendoListView().dataSource;

            var selected = $.map(selectedItemData.select(), function (element) {
                var item = selectedItemDataSource.view()[$(element).index()];
                $(availableListItems).getKendoListView().dataSource.add({ Name: item.Name, Value: item.Value, Datafield: item.Datafield });
                return $(element).index();
            });
            $.each(selected, function (index, value) {
                var item = selectedItemDataSource.view()[selected[index] - index];
                selectedItemDataSource.remove(item);
            });
            that._saveCurrentGroupSelection();
        },
        _shiftItemsTop: function (e) {
            var selectedItemDataSource = that.element.find(selectedListItems).getKendoListView().dataSource;
            var selectedItemData = that.element.find(selectedListItems).getKendoListView();
            var length = selectedItemData.select().length;
            var moveItems = [];
            for (i = 0; i < length; i++) {
                moveItems.push($(selectedItemData.select()[i]).index());
            }
            var minIndex = Math.min.apply(Math, moveItems);
            if (minIndex > 0) {
                var selectItems = [];
                for (i = 0; i < length; i++) {
                    selectedIndex = moveItems[i];
                    selectedItem = selectedItemDataSource.view()[selectedIndex];
                    if (selectedIndex >= 1) {
                        selectedItemDataSource.insert(selectedIndex - 1, { Name: selectedItem.Name, Value: selectedItem.Value, Datafield: selectedItem.Datafield });
                        selectedItemDataSource.remove(selectedItem);
                        selectItems.push(selectedIndex - 1);
                    }
                }
                for (i = 0; i < selectItems.length; i++) {
                    selectedItemData.select(selectedItemData.element.children()[selectItems[i]]);
                }
            }
            that._saveCurrentGroupSelection();
        },
        _shiftItemsDown: function (e) {
            var selectedItemDataSource = that.element.find(selectedListItems).getKendoListView().dataSource;
            var selectedItemData = that.element.find(selectedListItems).getKendoListView();
            var length = selectedItemData.select().length;
            var moveItems = [];
            for (i = 0; i < length; i++) {
                moveItems.push($(selectedItemData.select()[i]).index());
            }
            var maxIndex = Math.max.apply(Math, moveItems);
            var totalItems = selectedItemDataSource.total();
            if ((maxIndex + 1) < totalItems) {
                var selectItems = [];
                for (i = length - 1; i >= 0; i--) {
                    selectedIndex = moveItems[i];
                    selectedItem = selectedItemDataSource.view()[selectedIndex];
                    selectedItemDataSource.insert(selectedIndex + 2, { Name: selectedItem.Name, Value: selectedItem.Value, Datafield: selectedItem.Datafield });
                    selectedItemDataSource.remove(selectedItem);
                    selectItems.push(selectedIndex);
                }
                for (i = 0; i < selectItems.length; i++) {
                    selectedItemData.select(selectedItemData.element.children()[selectItems[i] + 1]);
                }
            }
            that._saveCurrentGroupSelection();
        },
        _groupNameCheckboxChange: function (e) {
            var dataIndex = $(this).attr(dataIndexAttribute);
            var groupNameText = toggleGroupName + dataIndex;
            if (this.checked) {
                that.element.find(groupNameText).attr("readonly", false);
            }
            else {
                that.element.find(groupNameText).attr("readonly", true);
                that.element.find(groupNameText).val("");
            }
        },
        _onAcceptClick: function (e) {
            var selectedTab = that.element.find(tabStrip).getKendoTabStrip().select().index();
            if (selectedTab == GROUPPANEL) {
                that.element.find(tabStrip).getKendoTabStrip().select(1);
            }
            else if (selectedTab == SORTPANEL) {
                that.element.find(tabStrip).getKendoTabStrip().select(2);
            }
            else if (selectedTab == SELECTPANEL) {
                if (that._validateFilterSelection()) {
                    that._mergeFilterSelection();
                    that._userSelectionData.userCustomName = "";
                    that._saveUserSelection(currentFilterSelectionText);
                } else {
                    that._showMessageBox(INCOMPLETESTEPMESSAGE);
                }
            }
        },
        _onTabChange: function (e) {
            var previousTab = that.element.find(tabStrip).getKendoTabStrip().select().index();
            var nextTab = $(e.item).index();
            switch (nextTab) {
                case GROUPPANEL:
                    that._highlightSelectedTab(GROUPPANEL);
                    that._onGroupTabSelection(e, previousTab);
                    break;
                case SORTPANEL:
                    that._onSortTabSelection(e, previousTab);
                    break;
                case SELECTPANEL:
                    that._onFilterTabSelection(e, previousTab);
                    break;
            }
        },
        _onRadioSortGroupChange: function (e) {
            var selectedIndex = that.element.find('input[name="radioSortGroup"]:checked').attr(dataIndexAttribute);
            var selectedItemDataSource = $(selectedListItems).getKendoListView().dataSource;
            selectedItemDataSource.data([]);
            $.each(that._userSelectionData.sortSelection[selectedIndex].columns, function (index, element) {
                if (element.Name.trim() != "") {
                    selectedItemDataSource.add({ Name: element.Name, Value: element.Value, Datafield: element.Datafield });
                }
            });
        },
        _onFilterGroupSelection: function () {
            that._saveSelectedGroupFilterSelection();
            var selectedGroupIndex = $(this).attr(dataIndexAttribute);
            that._setupFilterBodyByIndex(selectedGroupIndex);
        },
        _setupFilterBodyByIndex: function (groupIndex) {
            that.element.find(filterGroupSection).find(activeGroupClass).removeClass('mg-changebackground'); // TODO: Rename to "mg-change-background" and update HTML Block
            that.element.find(filterGroupSection).find('td[data-index="' + groupIndex + '"]').addClass('mg-changebackground'); // TODO: Rename to "mg-change-background" and update HTML Block
            that._setupFilterBody(groupIndex);
        },
        _onUserSelectionNameChange: function (e) {
            var userSelectionName = $(e.target).val();
            if (userSelectionName.trim() == "") {
                that._disableSaveIcon();
            } else {
                that._enableSaveIcon();
            }
        },
        _checkMegaGridForNoRecordsFound: function (e) {
            if (that.dataSource.total() == 0) {
                var colCount = $(that.element).find('table[role="grid"]:first').find('tr[role="row"] > th:visible').length;
                $(that.element)
                    .find('tbody:last')
                    .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" style="text-align:center"><br /><strong>' + globalNoRecordsFoundMsg + '</strong></td></tr>');
            }

            setKendoGridSortedColumnAttributes(e);

            // Add appropriate styles to grid filter dropdowns
            $('.k-grid-filter').on('click', function () {
                styleGridFilters();
            });
        },
        // Initailize grid content height from Grid Size Type feature, if applicable
        _initializeGridTypeHeight: function () {
            if (typeof gridTypeHeight !== "undefined") {
                if (gridTypeHeight > 200) {
                    $(mgMegaGridContainerClass).find(".k-grid-content").css('height', 'auto').css('max-height', gridTypeHeight + 'px');
                }
                else {
                    $(mgMegaGridContainerClass).find(".k-grid-content").css('height', '200px');
                }
            }
            else {
                $(mgMegaGridContainerClass).find(".k-grid-content").css('height', '200px');
            }
        },
        //Initializing Controls and Variables
        _createControls: function () {
            that._initializeUserSelectionDropDown();
            that._initializeTabStrip();
            that._initializeAvailableListItems();
            that._initializeSelectedListItems();
        },
        _initializeUserSelectionDropDown: function () {
            that.element.find(userSelectionDropDown).kendoDropDownList({
                autoBind: false,
                dataTextField: "SelectionCustomName",
                dataValueField: "SelectionCustomName",
                template: '<span class="k-state-default panel-left extprtl-content-width">#:SelectionCustomName#</span>',
                dataBound: function (item) {
                    var items = $(item.sender.ul).find("li"),
                        length = items.length;
                    if (length > 0) {
                        for (var index = 0; index < length; index++) {
                            var li = items[index];
                            var dataItem = item.sender.dataItem(index);
                            if (dataItem.IsDeleteEnabled) {
                                var deleteIcon = $('<a href="#" class="mg-alert-close fa-solid fa-trash-can"></a>');
                                deleteIcon.on("click", { item: dataItem }, function (event) {
                                    event.preventDefault();
                                    that._handleDeleteFilter(event.data.item);
                                });
                                $(li).find('.k-list-item-text span').append(deleteIcon);
                            }
                        }
                    }
                },
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            async: false,
                            type: "POST",
                            url: that.options.getUserSelectionUrl + "/" + that.options.gridId,
                            dataType: "JSON"
                        }
                    },
                    group: { field: "TemplateText" }
                })
            });
            that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().bind('change', function (e) {
                that._onUserNameSelection();
            });
            that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().bind('open', function (e) {
                that._onFilterOpen();
            });
            that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource.read();
            that._getMegaGridDefaultTemplate();
            that._checkMegaGridDefaultTemplate();
        },
        _handleDeleteFilter: function (dataItem) {
            that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().close();
            that._showMessageBox(DELETEFILTERSELECTION, dataItem);
        },
        _deleteFilterSelection: function (dataToPost) {
            var userData = { 'SelectionCustomName': dataToPost.SelectionCustomName, 'Content': that._getUserSelectionContent(), 'GridID': that.options.gridId };
            makeAsyncWebApiCall(that.options.deleteUserSelectionUrl,
                "POST",
                JSON.stringify(userData),
                "application/json",
                $.proxy(that._deleteFilterSelectionSuccess, that),
                $.proxy(that._onSaveSelectionFailure, that));
        },
        _deleteFilterSelectionSuccess: function () {
            var currentDropDownList = that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList();
            if (currentDropDownList.value() == that._userSelectionData.userCustomName) {
                that._userSelectionData.userCustomName = "";
            }
            that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource.read();
        },
        _initializeTabStrip: function () {
            that.element.find(tabStrip).kendoTabStrip({
                animation: false,
                navigation: false
            });
        },
        _initializeAvailableListItems: function () {
            that.element.find(availableListItems).kendoListView({
                template: "<div>#:Name#</div>",
                selectable: "multiple"
            });
            // 2392231_AXE_508_Issue - Fix: aria-labelledby not permitted on div with no valid role
            that.element.find(availableListItems).find(".k-listview-content").attr("role", "listbox").attr("tabindex", "0");
            that.element.find(availableListItems).find(".k-listview-item").attr("role", "option");
        },
        _initializeSelectedListItems: function () {
            that.element.find(selectedListItems).kendoListView({
                template: "<div>#:Name#</div>",
                selectable: "multiple"
            });
            // 2392231_AXE_508_Issue - Fix: aria-labelledby not permitted on div with no valid role
            that.element.find(selectedListItems).find(".k-listview-content").attr("role", "listbox").attr("tabindex", "0");
            that.element.find(selectedListItems).find(".k-listview-item").attr("role", "option");
        },
        _setupVariables: function () {
            that._userSelectionData = new ParamClass();
            that._setupGroupVariables();

        },
        _setupGroupVariables: function () {
            that._clearBufferPanels();
            that._userSelectionData.userSelection = [];
            for (i = 0; i < groupCount; i++) {
                that._userSelectionData.groupSelection.push(new GroupClass());
                that._userSelectionData.userSelection.push(new GroupClass());
                that._userSelectionData.sortSelection.push(new GroupClass());
                that._userSelectionData.filterSelection.push(new GroupClass());
            }
        },
        _clearGroupPanelVariables: function () {
            that._clearBufferPanels();
            for (i = 0; i < groupCount; i++) {
                that._userSelectionData.groupSelection.push(new GroupClass());
                that._userSelectionData.sortSelection.push(new GroupClass());
                that._userSelectionData.filterSelection.push(new GroupClass());
            }
        },
        _clearBufferPanels: function () {
            that._userSelectionData.groupSelection = [];
            that._userSelectionData.sortSelection = [];
            that._userSelectionData.filterSelection = [];
        },
        _initializeVariables: function () {
            that._userSelectionData.out = [];
            var gridColumns = that.element.data(kendoControlName);
            $.each(gridColumns.columns, function (index, element) {
                that._userSelectionData.initialGridConfig.push(element.field);
                var title = element.title === 'undefined' ? "" : element.title;
                that._userSelectionData.out.push({ Name: title, Value: index, Datafield: element.field });
            });
            that._sortColumnNames();
            that.element.find(availableListItems).getKendoListView().dataSource.data(that._userSelectionData.out);
        },
        //Navigation Tab helpers
        _onGroupTabSelection: function (e, previousTab) {
            if (previousTab == SELECTPANEL) {
                that._saveSelectedGroupFilterSelection();
            }
            that._setupGroupTab();
        },
        _onFilterOpen: function () {
            //Check if the delete icon is already displayed on the items... if not, display it
            if ($(filterDropDown).find(".fa-trash-can").length <= 0) {
                that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource.read();
            }
        },
        _onSortTabSelection: function (e, previousTab) {
            if (previousTab == GROUPPANEL) {
                that._saveGroupTab();
                if (that._validateGroupTab()) {
                    that._highlightSelectedTab(SORTPANEL);
                    that._mergeGroupSelection(); that._loadSortSelection();
                    that._loadFilterSelection(); that._setupSortPanel();
                }
                else {
                    that._mergeGroupSelection(); that._loadSortSelection();
                    that._loadFilterSelection();
                    that._showMessageBox(INCOMPLETESTEPMESSAGE);
                    e.preventDefault();
                }
            }
            else if (previousTab == SELECTPANEL) {
                that._highlightSelectedTab(SORTPANEL);
                that._saveSelectedGroupFilterSelection();
                that._setupSortPanel();
            }
        },
        _onFilterTabSelection: function (e, previousTab) {
            if (previousTab == SORTPANEL) {
                if (that._validateSortTab()) {
                    that._highlightSelectedTab(SELECTPANEL);
                    that._mergeSortSelection(); that._loadFilterSelection();
                    that._setupFilterTab();
                }
                else {
                    that._mergeSortSelection(); that._loadFilterSelection();
                    that._showMessageBox(INCOMPLETESTEPMESSAGE);
                    e.preventDefault();
                }
            }
            else if (previousTab == GROUPPANEL) {
                that._saveGroupTab();
                if (that._validateGroupTab()) {
                    that._mergeGroupSelection(); that._loadSortSelection();
                    if (that._validateSortTab()) {
                        that._highlightSelectedTab(SELECTPANEL);
                        that._mergeSortSelection(); that._loadFilterSelection();
                        that._setupFilterTab();
                    }
                    else {
                        that._showMessageBox(SKIPSTEPMESSAGE);
                        e.preventDefault();
                    }

                }
                else {
                    that._showMessageBox(INCOMPLETESTEPMESSAGE);
                    e.preventDefault();
                }
            }
        },
        // Group Tab Helpers
        _setupGroupTab: function () {
            $.each(that._userSelectionData.groupSelection, function (index, element) {
                var selectedCheckBox = toggleGroupCheckbox + index;
                var selectedTextBox = toggleGroupName + index;
                $(selectedCheckBox).prop('checked', element.visible);
                $(selectedTextBox).attr('readonly', !element.visible);
                if (element.visible == true && element.name != "") {
                    $(selectedTextBox).val(element.name);
                }
                else {
                    $(selectedTextBox).val('');
                }
            });
            that.element.find(userSelectionName).hide();
            that._setupUserSelectionDropDown();
            that._disableSaveIcon();
        },
        _saveGroupTab: function () {
            var groupCheckBoxes = that.element.find(groupNameCheckbox + " input[type=checkbox]");
            $.each(groupCheckBoxes, function (index, element) {
                var dataIndex = $(element).attr(dataIndexAttribute);
                var groupNameText = toggleGroupName + dataIndex;
                if (element.checked) {
                    that._userSelectionData.groupSelection[dataIndex].visible = true;
                    that._userSelectionData.groupSelection[dataIndex].name = $.trim(that.element.find(groupNameText).val());
                    that._userSelectionData.groupSelection[dataIndex].displayName = that._userSelectionData.groupSelection[dataIndex].name;
                    that._userSelectionData.groupSelection[dataIndex].groupIndex = index + 1;
                }
                else {
                    that._userSelectionData.groupSelection[dataIndex] = new GroupClass();
                    that._userSelectionData.groupSelection[dataIndex].groupIndex = index + 1;
                }
            });
        },
        _validateGroupTab: function () {
            var result = false;
            $.each(that._userSelectionData.groupSelection, function (index, element) {
                if (element.visible == true) {
                    result = true;
                }
            });
            return result;
        },
        _mergeGroupSelection: function () {
            $.each(that._userSelectionData.groupSelection, function (index, element) {
                that._userSelectionData.userSelection[index].visible = element.visible;
                that._userSelectionData.userSelection[index].name = element.name;
                that._userSelectionData.userSelection[index].groupIndex = element.groupIndex;
                if (element.visible == false) {
                    that._userSelectionData.userSelection[index].columns = [];
                }
            });
        },
        _clearGroupPanel: function () {
            $.each(that._userSelectionData.groupSelection, function (index, element) {
                element.visible = false;
                element.name = '';
                element.displayName = '';
            });
            that._userSelectionData.userCustomName = "";
        },
        //Sort Tab Helpers
        _saveCurrentGroupSelection: function () {
            var selectedIndex = that.element.find('input[name="radioSortGroup"]:checked').attr(dataIndexAttribute);
            var selectedColumns = $(selectedListItems).getKendoListView().dataSource._data;
            that._userSelectionData.sortSelection[selectedIndex].columns = [];
            $.each(selectedColumns, function (index, element) {
                that._userSelectionData.sortSelection[selectedIndex].columns.push(element);
            });
        },
        _loadSortSelection: function () {
            $.each(that._userSelectionData.userSelection, function (index, element) {
                that._userSelectionData.sortSelection[index].visible = that._userSelectionData.userSelection[index].visible;
                that._userSelectionData.sortSelection[index].name = that._userSelectionData.userSelection[index].name;
                //that._userSelectionData.sortSelection[index].columns = $.extend(true, [], element.columns);
                if (that._userSelectionData.sortSelection[index].visible == false) {
                    that._userSelectionData.sortSelection[index].columns = [];
                }
            });
        },
        _setupSortPanel: function () {
            that._setupAvailableListOptions();
            that._setupSortRadioOptions();
            that.element.find(userSelectionName).hide();
            that.element.find(userSavedSelectionDropdown).hide();
            that._disableSaveIcon();

            // 2392231_AXE_508_Issue - Start here
            // Fix: Scrollable region must have keyboard access (Tab 2)
            that.element.find(availableListItems).find(".k-listview-content").attr("tabindex", "0");
            that.element.find(selectedListItems).find(".k-listview-content").attr("tabindex", "0");

            // Fix: Elements must only use permitted ARIA attributes (Tab 2)
            that.element.find(availableListItems).find(".k-listview-content").attr("role", "listbox");
            that.element.find(availableListItems).find(".k-listview-item").attr("role", "option");
            that.element.find(selectedListItems).find(".k-listview-content").attr("role", "listbox");
            that.element.find(selectedListItems).find(".k-listview-item").attr("role", "option");
            // Remove aria-activedescendant when no item is active, as it is invalid without a valid reference
            let availableListEl = that.element.find(availableListItems);
            let selectedListEl = that.element.find(selectedListItems);
            if (availableListEl.attr("aria-activedescendant") === "" || availableListEl.attr("aria-activedescendant") === undefined) {
                availableListEl.removeAttr("aria-activedescendant");
            }
            if (selectedListEl.attr("aria-activedescendant") === "" || selectedListEl.attr("aria-activedescendant") === undefined) {
                selectedListEl.removeAttr("aria-activedescendant");
            }
            // 2392231_AXE_508_Issue - End here - aitool
        },
        _setupAvailableListOptions: function () {
            var availableListDataSource = $(availableListItems).getKendoListView().dataSource;
            availableListDataSource.data(that._userSelectionData.out);
            $.each(that._userSelectionData.sortSelection, function (index, element) {
                if (element.visible == true) {
                    $.each(element.columns, function (index, element) {
                        var positionInAvailableList = that._findPositionInList(element, availableListDataSource._data);
                        if (positionInAvailableList != -1) {
                            availableListDataSource.remove(availableListDataSource.view()[positionInAvailableList]);
                        }
                    });
                }
            });
        },
        _setupSortRadioOptions: function () {
            that.element.find(sortGroupRadio + " input[name='radioSortGroup']").attr('disabled', true);
            $.each(that._userSelectionData.sortSelection, function (index, element) {
                var displayName = that.options.groupConstantText + " " + index;
                if (element.visible == true) {
                    that.element.find(sortGroupRadio + " input[data-index='" + index + "']").attr('disabled', false);
                    displayName = element.name != '' ? element.name : displayName;
                }
                that.element.find(sortGroupRadio + " label[for='" + sortGroup + index + "']").html(displayName.toUpperCase());
            });
            $(that.element.find(sortGroupRadio + " input[name='radioSortGroup']:enabled")[0]).prop('checked', true);
            that.element.find(sortGroupRadio + " input[name='radioSortGroup']").trigger('change');
        },
        _validateSortTab: function () {
            var result = true;
            $.each(that._userSelectionData.sortSelection, function (index, element) {
                if (element.visible == true && element.columns.length == 0) {
                    result = false;
                }
            });
            return result;
        },
        _mergeSortSelection: function () {
            $.each(that._userSelectionData.sortSelection, function (index, element) {
                that._userSelectionData.userSelection[index].columns = $.extend(true, [], element.columns);
            });
        },
        _clearSortPanel: function () {
            $.each(that._userSelectionData.sortSelection, function (index, element) {
                element.columns = [];
            });
            $.each(that._userSelectionData.filterSelection, function (index, element) {
                element.filterGroupSelect = false;
            });
            that._userSelectionData.userCustomName = "";
        },
        // Filter Tab helpers
        _loadFilterSelection: function () {
            $.each(that._userSelectionData.userSelection, function (index, element) {
                that._userSelectionData.filterSelection[index].visible = element.visible;
                that._userSelectionData.filterSelection[index].name = element.name;
                that._userSelectionData.filterSelection[index].columns = $.extend(true, [], element.columns);
                if (element.visible == false || element.columns.length == 0) {
                    that._userSelectionData.filterSelection[index].columns = [];
                    that._userSelectionData.filterSelection[index].visibleColumns = [];
                    that._userSelectionData.filterSelection[index].freeze = '';
                    if (element.visible == false) {
                        that._userSelectionData.filterSelection[index].filterGroupSelect = false;
                    }
                }

                var ind = that._userSelectionData.filterSelection[index].visibleColumns.length;
                while (ind--) {
                    var item = that._userSelectionData.filterSelection[index].visibleColumns[ind];
                    var arrayIndex = that._findItemInList(item, element.columns);
                    if (arrayIndex == -1) {
                        that._userSelectionData.filterSelection[index].visibleColumns.splice(ind, 1);
                        if (that._userSelectionData.filterSelection[index].freeze == item) {
                            that._userSelectionData.filterSelection[index].freeze = '';
                        }
                    }
                }
            });
        },
        _setupFilterTab: function () {
            var filterHeader = kendo.template(that.options.filterHeaderTemplate);
            filterHeader = $.proxy(filterHeader, this)(that._userSelectionData.filterSelection);

            that.element.find(filterGroupSection).find('tr').html(filterHeader);
            that.element.find(filterGroupSection).find('tr > td').click(function (e) {
                $.proxy(that._onFilterGroupSelection, this)();
            });
            // TODO: Rename to ".mg-header-panel-check" and update HTML Block
            that.element.find(filterGroupSection).find('.mgHeaderPanelCheck').click(function (e) {
                if ($(e.target).is('label')) {
                    e.stopPropagation();
                }
                else if ($(e.target).is('input')) {
                    var groupSelected = $(e.target).is(':checked');
                    var selectedGroupIndex = $(this).attr('data-index');
                    that._userSelectionData.filterSelection[selectedGroupIndex].filterGroupSelect = groupSelected;
                    e.stopPropagation();
                }
            });
            var firstGroupIndex = $(that.element.find(filterGroupSection).find('tr > td')[0]).attr(dataIndexAttribute);
            that._setupFilterBodyByIndex(firstGroupIndex);
            that.element.find(userSelectionText).val(that._userSelectionData.userCustomName);
            that.element.find(userSelectionName).show();
            that.element.find(userSavedSelectionDropdown).hide();
            that.element.find(userCustomNameTextBox).trigger('input');

            // 2392231_AXE_508_Issue - Fix: Form elements must have labels
            that.element.find(filterGroupSection).find('.k-checkbox').each(function () {
                var dataIndex = $(this).closest('.mgHeaderPanelCheck').attr('data-index') || $(this).closest('td').attr('data-index');
                var groupName = (that._userSelectionData.filterSelection[dataIndex] && that._userSelectionData.filterSelection[dataIndex].name)
                    || (that.options.groupConstantText + " " + dataIndex);
                var labelText = (that.options.selectGroupToFilterText || "Select group") + " " + groupName;
                $(this).attr("aria-label", labelText);
                $(this).attr("title", labelText);
            });
        },
        _setupFilterBody: function (groupIndex) {
            var filterBody = kendo.template(that.options.filterBodyTemplate);
            filterBody = filterBody(that._userSelectionData.filterSelection[groupIndex].columns);
            that.element.find(filterPanelColumns).html(filterBody);
            that.element.find(filterPanelColumns + " input[type='checkbox']").change(function (e) {
                var groupColumnDataField = $(this).attr('datafield');
                var currentFreezeRadioButton = that.element.find(filterPanelColumns + " input[type='radio'][datafield='" + groupColumnDataField + "']");
                if ($(this).is(':checked')) {
                    currentFreezeRadioButton.attr('disabled', false);
                }
                else {
                    currentFreezeRadioButton.prop('checked', false);
                    currentFreezeRadioButton.attr('disabled', true);
                }
            });
            that.element.find(filterPanelColumns + " input[type='checkbox']").each(function (index, element) {
                var dataField = $(element).attr('datafield');
                var visibleColumns = that._userSelectionData.filterSelection[groupIndex].visibleColumns;
                var itemIndex = visibleColumns == undefined || visibleColumns.length == 0 ? 1 : $.inArray(dataField, visibleColumns);
                if (itemIndex != -1) {
                    $(element).attr('checked', true);
                    that.element.find(filterPanelColumns + " input[type='radio'][datafield='" + dataField + "']").attr('disabled', false);
                }
            });
            // TODO: Rename to ".mg-filter-left-col" and update HTML Block
            $('.mg-filter-leftcol .mg-text-font').each(function () {
                var labelText = $(this).text().length; if (labelText === 30) { $(this).prepend('<span class="display-none">Empty Column Heading</span>)'); }
            });

            // 2392231_AXE_508_Issue - Start here -
            // Fix: Checkbox form elements must have labels (Tab 3)
            that.element.find(filterPanelColumns + " input[type='checkbox']").each(function (index, element) {
                let dataField = $(element).attr('datafield');
                let columnName = that._localizeColumnFields(dataField) || dataField;
                $(element).attr("aria-label", columnName);
            });
            that.element.find(filterPanelColumns + " input[type='radio']").each(function (index, element) {
                let dataField = $(element).attr('datafield');
                let columnName = that._localizeColumnFields(dataField) || dataField;
                $(element).attr("aria-label", that.options.freezeText + " " + columnName);
            });
            // 2392231_AXE_508_Issue - End here - aitool

            var freezeDataField = that._userSelectionData.filterSelection[groupIndex].freeze;
            var freezeFieldIndex = $.inArray(freezeDataField, that._userSelectionData.filterSelection[groupIndex].visibleColumns);
            if (freezeFieldIndex != -1) {
                that.element.find(filterPanelColumns + " input[type='radio'][datafield='" + freezeDataField + "']").prop('checked', true);
            }
        },
        _saveSelectedGroupFilterSelection: function () {
            var selectedGroupIndex = that.element.find(filterGroupSection + " " + activeGroupClass).attr(dataIndexAttribute);
            that._userSelectionData.filterSelection[selectedGroupIndex].visibleColumns = [];
            that._userSelectionData.filterSelection[selectedGroupIndex].freeze = '';
            that.element.find(filterPanelColumns).find("input[type='checkbox']:checked").each(function (index, element) {
                var selectedDataField = $(element).attr('datafield');
                that._userSelectionData.filterSelection[selectedGroupIndex].visibleColumns.push(selectedDataField);
            });
            var freezeDataField = that.element.find(filterPanelColumns).find("input[type='radio']:checked").attr('datafield');
            if (freezeDataField != undefined) {
                that._userSelectionData.filterSelection[selectedGroupIndex].freeze = freezeDataField;
            }
            that._userSelectionData.userCustomName = $.trim(that.element.find(userSelectionText).val());
        },
        _validateFilterSelection: function () {
            that._saveSelectedGroupFilterSelection();
            var isFilterSelectionValid = false;
            var isAtleastOneGroupVisible = false;
            $.each(that._userSelectionData.filterSelection, function (index, element) {
                if (element.filterGroupSelect && element.visible) {
                    isAtleastOneGroupVisible = true;
                }
            });

            if (isAtleastOneGroupVisible) {
                var visibleAndFreezeColumnExists = true;
                $.each(that._userSelectionData.filterSelection, function (index, element) {
                    if (element.visible) {
                        if (element.visibleColumns.length != 0 && element.freeze != '') {
                            if ($.inArray(element.freeze, element.visibleColumns) == -1) {
                                visibleAndFreezeColumnExists = false;
                            }
                        }
                        else {
                            visibleAndFreezeColumnExists = false;
                        }
                    }
                });
                if (visibleAndFreezeColumnExists == true) {
                    isFilterSelectionValid = true;
                }
            }
            return isFilterSelectionValid;
        },
        _mergeFilterSelection: function () {
            $.each(that._userSelectionData.filterSelection, function (index, element) {
                if (element.visible) {
                    that._userSelectionData.userSelection[index].visibleColumns = $.extend(true, [], element.visibleColumns);
                    that._userSelectionData.userSelection[index].freeze = element.freeze;
                    that._userSelectionData.userSelection[index].filterGroupSelect = element.filterGroupSelect;
                }
                else {
                    that._userSelectionData.userSelection[index].visibleColumns = [];
                    that._userSelectionData.userSelection[index].freeze = '';
                    that._userSelectionData.userSelection[index].filterGroupSelect = false;
                }
            });
        },
        _clearFilterPanel: function () {
            $.each(that._userSelectionData.filterSelection, function (index, element) {
                element.visibleColumns = [];
                element.freeze = '';
                element.filterGroupSelect = false;
            });
            that._userSelectionData.userCustomName = "";
        },
        _isTemplate: function () {
            return that.element.find('.mg-filter-templateArea input[type="checkbox"]').is(':checked'); // TODO: Rename to ".mg-filter-template-area" and update HTML Block
        },

        // Save user filter selection
        _getUserSelectionContent: function () {
            var selectedContent = [];
            $.each(that._userSelectionData.userSelection, function (index, element) {
                if (element.visible == true) {
                    selectedContent.push(element);
                }
            });
            return JSON.stringify(selectedContent);
        },
        _saveUserSelection: function (customName) {
            that._reflectToGrid();
            that._hideFilterPopup();
            that._userSelectionData.IsTemplate = that._isTemplate();
            var userData = { 'SelectionCustomName': customName, 'Content': that._getUserSelectionContent(), 'GridID': that.options.gridId, IsTemplate: that._isTemplate() };
            makeAsyncWebApiCall(that.options.saveUserSelectionUrl,
                "POST",
                JSON.stringify(userData),
                "application/json",
                $.proxy(that._onSaveSelectionSuccess, that),
                $.proxy(that._onSaveSelectionFailure, that));
        },
        _onSaveSelectionSuccess: function (result) {
            that._userSelectionData.userSelectionBuffer = JSON.stringify(that._userSelectionData.userSelection);
            that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource.read();
        },
        _onSaveSelectionFailure: function (result) {
            //Logic goes here
        },
        _getUserSavedSelectionById: function (selectionCustomName) {
            if (that.options.defaultNotExistTemplateItems.indexOf(selectionCustomName) >= 0 && typeof (getDefaultTemplateUrl) !== 'undefined') {
                result = {};
                var json = makeSyncWebApiCall(getDefaultTemplateUrl, "GET", null, "application/json");
                var selectedTemplatefromURL = json.Data.filter(function(x) {
                    return x.SelectionCustomName === selectionCustomName;
                });
                if (typeof (selectedTemplatefromURL) !== 'undefined') {
                    if (selectedTemplatefromURL.length > 0) {
                        result.Data = selectedTemplatefromURL[0];
                    }
                }
                that._onGetUserSavedSelectionSuccess(result);
            }
            else {
                var userData = { "SelectionCustomName": selectionCustomName, GridID: that.options.gridId };
                makeAsyncWebApiCall(that.options.getUserSavedSelectionUrl,
                    "POST",
                    JSON.stringify(userData),
                    "application/json",
                    $.proxy(that._onGetUserSavedSelectionSuccess, that),
                    $.proxy(that._onGetUserSavedSelectionFailure, that));
            }
        },
        _onGetUserSavedSelectionSuccess: function (result) {
            var mappedResult = [];
            if (result.Data != null) {
                for (var i = 0; i < groupCount; i++) {
                    mappedResult.push(new GroupClass());
                }
                var savedSelections = JSON.parse(result.Data.Content);
                $.each(savedSelections, function (index, value) {
                    mappedResult[value.groupIndex] = that._mapToJsObject(value);
                });

                $.each(mappedResult, function (index, value) {
                    $.each(value.columns, function (ind, val) {
                        val.Name = that._localizeColumnFields(val.Datafield);
                    });
                });
                that._setTemplateSelections(result.Data.IsTemplate, result.Data.IsDeleteEnabled);
                that._userSelectionData.userSelection = mappedResult;
                that._userSelectionData.userSelectionBuffer = JSON.stringify(that._userSelectionData.userSelection);
                that._reflectToGrid();
                that._initializeGridDataFilterPanels();
            }
        },
        _onGetUserSavedSelectionFailure: function (result) {
            //Logic goes here
        },
        _setTemplateSelections: function (isSelectionTemplate, isUsersOwnSelection) {
            that._userSelectionData.IsTemplate = isSelectionTemplate && isUsersOwnSelection;
        },
        _initializeGridDataFilterPanels: function () {
            that._clearGroupPanelVariables();
            $.each(that._userSelectionData.userSelection, function (index, element) {
                that._userSelectionData.groupSelection[index].visible = element.visible;
                that._userSelectionData.groupSelection[index].name = element.name;
                that._userSelectionData.groupSelection[index].groupIndex = element.groupIndex;
                that._userSelectionData.sortSelection[index].columns = $.extend(true, [], element.columns);
                that._userSelectionData.filterSelection[index].visibleColumns = $.extend(true, [], element.visibleColumns);
                that._userSelectionData.filterSelection[index].freeze = element.freeze;
                that._userSelectionData.filterSelection[index].filterGroupSelect = element.filterGroupSelect;
            });
            that._setupGroupTab();
        },
        _validateUserCustomSelectionName: function (userCustomSelectionName) {
            var result = UNIQUENAME;
            if (userCustomSelectionName == currentFilterSelectionText || userCustomSelectionName == that.options.currentFilterSelectionLocaleText
                || userCustomSelectionName == defaultText || userCustomSelectionName == that.options.defaultLocaleText) {
                result = RESERVEDNAME;
            }
            else {
                var customNameDataList = that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource._data;
                $.each(customNameDataList, function (index, element) {
                    if (element.SelectionCustomName === userCustomSelectionName) {
                        if (element.IsDeleteEnabled) {
                            result = DUPLICATENAME;
                        } else {
                            result = SHAREDTEMPLATENAME;
                        }
                    }
                });
            }
            return result;
        },
        _processSaveRequest: function () {
            var userCustomSelectionName = that.element.find(userSelectionText).val();
            userCustomSelectionName = $.trim(userCustomSelectionName);
            var nameFieldStatus = that._validateUserCustomSelectionName(userCustomSelectionName);
            switch (nameFieldStatus) {
                case RESERVEDNAME:
                    that._showMessageBox(SELECTIONNAMERESERVEDMESSAGE);
                    break;
                case DUPLICATENAME:
                    that._showMessageBox(SELECTIONNAMEUPDATEMESSAGE);
                    break;
                case UNIQUENAME:
                    that._saveUserSelection(userCustomSelectionName);
                    break;
                case SHAREDTEMPLATENAME:
                    that._showMessageBox(SHAREDTEMPLATEOVERRIDEMESSAGE);
                    break;
            }
        },
        _onUserNameSelection: function () {
            //Get the selected value from the filters dropdown
            var userSelectionNameVal = $.trim(that.element.find(userSelectionDropDown + dropDownList).val());
            that._hideFilterPopup();
            that._userSelectionData.userCustomName = userSelectionNameVal;
            //Check if the selected value is the "default"
            if (userSelectionNameVal == defaultText || userSelectionNameVal == that.options.defaultLocaleText) {
                //Default filter selected, apply no filters here
                // Set to Default
                that._setupGroupVariables();
                that._userSelectionData.userCustomName = "";
                that._userSelectionData.userSelectionBuffer = [];
                that._resetGridToDefault();
                return;
            }
            else if (userSelectionNameVal == currentFilterSelectionText || userSelectionNameVal == that.options.currentFilterSelectionLocaleText) {
                //Current filter selected, apply the last saved filter
                userSelectionNameVal = currentFilterSelectionText;
                that._userSelectionData.userCustomName = "";
            }
            //Apply the selected filter
            that._getUserSavedSelectionById(userSelectionNameVal);
        },
        _onUserSelectionNameDataBound: function () {
            var savedUserSelectionDropDown = that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList();
            var savedItemsCount = savedUserSelectionDropDown.dataSource._data.length;

            if (that.initialLoad == true) {
                //If the grid is being loaded. Not sure if this code is loaded more than once
                //Add the values to the dropdown
                savedUserSelectionDropDown.select(function (dataItem) {
                    return dataItem.SelectionCustomName == that.options.currentFilterSelectionLocaleText;
                });
                //Select the "Default" option when initializing
                that.element.find(userSelectionDropDown + dropDownList).val(defaultText);
                savedUserSelectionDropDown.select(function (dataItem) {
                    return dataItem.SelectionCustomName === that.options.defaultLocaleText;
                });
                savedUserSelectionDropDown.trigger('change');
                that.initialLoad = false;
            }
            else {
                //Not sure if this code is ever executed!!!!!
                if (that._userSelectionData.userCustomName == "") {
                    savedUserSelectionDropDown.select(function (dataItem) {
                        return dataItem.SelectionCustomName === that.options.currentFilterSelectionLocaleText;
                    });
                    if (savedUserSelectionDropDown.value() != that.options.currentFilterSelectionLocaleText) {
                        savedUserSelectionDropDown.select(function (dataItem) {
                            return dataItem.SelectionCustomName === that.options.defaultLocaleText;
                        });
                    }
                    savedUserSelectionDropDown.trigger('change');
                } else {
                    savedUserSelectionDropDown.select(function (dataItem) {
                        return dataItem.SelectionCustomName === that._userSelectionData.userCustomName;
                    });
                }
            }
        },
        //Message box functions
        _showMessageBox: function (messageType, dataToPost) {
            var data;
            var messageText;
            switch (messageType) {
                case CLOSEMESSAGE:
                    data = that._formatMessageBoxParam(that.options.gridDataFilterCloseText, "Close", null, "Continue", null);
                    that._setupMessageBox(data);
                    that.element.find(alertCancelButton).click(function (e) {
                        that._hideFilterPopup();
                        if (that._userSelectionData.userSelectionBuffer.length > 0) {
                            var userEnabledGroups = that._retainGroupSelection();
                            that._userSelectionData.userSelection = JSON.parse(that._userSelectionData.userSelectionBuffer);
                            that._repopulateGroupSelection(userEnabledGroups);
                        } else {
                            that._setupGroupVariables();
                        }
                        that._userSelectionData.userCustomName = that._rectifyCustomName();
                    });
                    break;
                case INCOMPLETESTEPMESSAGE:
                    data = that._formatMessageBoxParam(that.options.filterStepNotCompletedText, "CLOSE", null, null, null);
                    that._setupMessageBox(data);
                    break;
                case SKIPSTEPMESSAGE:
                    data = that._formatMessageBoxParam(that.options.skipSortSelectionText, "CLOSE", null, null, null);
                    that._setupMessageBox(data);
                    break;
                case SELECTIONNAMEUPDATEMESSAGE:
                    messageText = that.options.selectionNameUpdateText.replace(/@Name/g, that.element.find(userSelectionText).val());
                    data = that._formatMessageBoxParam(messageText, "Close", null, "Continue", null);
                    that._setupMessageBox(data);
                    that.element.find(alertCancelButton).click(function (e) {
                        that._saveUserSelection($.trim(that.element.find(userSelectionText).val()));
                    });
                    break;
                case SELECTIONNAMERESERVEDMESSAGE:
                    messageText = that.options.selectionNameReservedText.replace(/@Name/g, that.element.find(userSelectionText).val());
                    data = that._formatMessageBoxParam(messageText, "Ok", null, null, null);
                    that._setupMessageBox(data);
                    break;
                case DELETEFILTERSELECTION:
                    messageText = that.options.filterDeletionConfirmation;
                    data = that._formatMessageBoxParam(messageText, "Ok", null, "Cancel", null);
                    that._setupMessageBox(data);
                    that.element.find(alertOkButton).click(function (e) {
                        that._deleteFilterSelection(dataToPost);
                    });
                    break;
                case SHAREDTEMPLATEOVERRIDEMESSAGE:
                    messageText = that.options.sharedTemplateOverrideMessage.replace(/@Name/g, that.element.find(userSelectionText).val());
                    data = that._formatMessageBoxParam(messageText, "Ok", null, null, null);
                    that._setupMessageBox(data);
                    break;
            }
        },
        _formatMessageBoxParam: function (message, okButton, okButtonAction, cancelButton, cancelButtonAction) {
            var showCancelButton = cancelButton == null ? false : true;
            var data = {
                messageText: message,
                okButtonText: okButton,
                cancelButtonText: cancelButton,
                displayCancelButton: showCancelButton
            };
            return data;
        },
        _setupMessageBox: function (data) {
            var messageBox = kendo.template(that.options.alertMessageTemplate);
            messageBox = messageBox(data);
            $(messageBox).insertAfter(that.element.find(tabStrip));
            //Attach Message box events
            that.element.find(alertMessageCloseIcon + " , " + alertCancelButton + " , " + alertOkButton).click(function (e) {
                that._closeAlertMessageBox();
            });
        },
        _retainGroupSelection: function () {
            var userEnabledGroups = [];
            $.each(that._userSelectionData.userSelection, function (index, element) {
                userEnabledGroups.push(element);
            });
            return userEnabledGroups;
        },
        _repopulateGroupSelection: function (userEnabledGroups) {
            $.each(userEnabledGroups, function (index, element) {
                that._userSelectionData.userSelection[index].filterGroupSelectTemp = element.filterGroupSelectTemp;
                that._userSelectionData.userSelection[index].Isfreeze = element.Isfreeze;
                that._userSelectionData.userSelection[index].hideGroupHeaderAndGranular = element.hideGroupHeaderAndGranular;
            });
        },
        _closeAlertMessageBox: function () {
            that.element.find(alertMessageBox).remove();
        },
        //Private helper functions
        _sortColumnNames: function () {
            that._userSelectionData.out.sort(function (first, second) {
                var firstName = first.Name.toLowerCase();
                var secondName = second.Name.toLowerCase();
                if (firstName == secondName) {
                    return 0;
                }
                return firstName < secondName ? -1 : 1;
            });
        },
        _hideFilterPopup: function () {
            that.element.find(gridDataFilterButton).removeClass(gridDataButtonActive).addClass(gridDataButtonInactive);
            that.element.find(gridDataFilterPopup).fadeOut("slow", function () { /* Logic goes here */ });
        },
        _findPositionInList: function (column, data) {
            var result = -1;
            $.each(data, function (index, element) {
                if (element.Datafield == column.Datafield) {
                    result = index;
                }
            });
            return result;
        },
        _findItemInList: function (data, list) {
            var resultIndex = -1;
            $.each(list, function (index, element) {
                if (element.Datafield == data) {
                    resultIndex = index;
                }
            });
            return resultIndex;
        },
        _enableSaveIcon: function () {
            this.element.find(saveButton).removeClass("mg-save-disable").addClass("mg-save-enable");
        },
        _disableSaveIcon: function () {
            this.element.find(saveButton).removeClass("mg-save-enable").addClass("mg-save-disable");
        },
        _mapToJsObject: function (data) {
            var result = {};
            $.map(data, function (item, index) {
                result[that._firstToLower(index)] = data[index];
            });
            return result;
        },
        _localizeColumnFields: function (dataField) {
            var elementName = '';
            $.each(that._userSelectionData.out, function (index, element) {
                if (element.Datafield == dataField) {
                    elementName = element.Name;
                }
            });
            return elementName;
        },
        _setupUserSelectionDropDown: function () {
            var savedItemsCount = that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource._data.length;
            savedItemsCount > 0 ? that.element.find(userSavedSelectionDropdown).show() : that.element.find(userSavedSelectionDropdown).hide();
        },
        _firstToLower: function (str) {
            return (str == 'DisplayColumns' ? str : (str.charAt(0).toLowerCase() + str.slice(1)));
        },
        _mapToResult: function () {
            //Logic goes here
        },
        _localizeGridDataFilterTemplate: function () {
            that.options.headerGrouping = that.options.headerGrouping.split("{1}").join(that.options.groupConstantText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{1}", that.options.chooseExistingFilterText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{2}", that.options.createNewFilterText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{3}", that.options.tabstripGroupText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{4}", that.options.tabstripSortText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{5}", that.options.tabstripSelectText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{6}", that.options.checkToCreateText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.split("{7}").join(that.options.groupConstantText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{8}", that.options.customLabelText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{9}", that.options.selectAGroupText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{10}", that.options.availableColumnsText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{11}", that.options.selectedColumnsText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{12}", that.options.selectGroupToFilterText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{13}", that.options.checkToShowColumnText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{14}", that.options.freezeText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{15}", that.options.nameYourNewFilterText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{16}", that.options.preferencesText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{17}", that.options.clearText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{18}", that.options.acceptText);
            that.options.gridDataFilterTemplate = that.options.gridDataFilterTemplate.replace("{19}", that.options.saveText);
        },
        _reflectToGrid: function () {
            that._resetGranularGrouping();
            that._clearFiltersAndSorting();
        },
        _resetGridToDefault: function () {
            that._resetGranularGrouping();
            that._clearFiltersAndSorting();
        },
        _resetGranularGrouping: function () {
            $.each(that._userSelectionData.userSelection, function (index, element) {
                that._userSelectionData.userSelection[index].Isfreeze = false;
                that._userSelectionData.userSelection[index].hideGroupHeaderAndGranular = false;
                that._userSelectionData.userSelection[index].filterGroupSelectTemp = false;
            });
        },
        _rectifyCustomName: function () {
            var userSelectionNameVal = that.element.find(userSelectionDropDown + dropDownList).val();
            if (userSelectionNameVal == defaultText || userSelectionNameVal == that.options.defaultLocaleText ||
                userSelectionNameVal == currentFilterSelectionText || userSelectionNameVal == that.options.currentFilterSelectionLocaleText) {
                userSelectionNameVal = "";
            }
            return userSelectionNameVal;
        },
        _highlightSelectedTab: function (nextTab) {
            var that = this;
            if (nextTab >= 0 && nextTab <= 2) {
                $(that.element.find(tabStripButtonList + " i")).addClass(tabStripWhiteIconColor).removeClass(tabStripBlueIconColor);
                $(that.element.find(tabStripButtonList + " " + tabStripButtonText)).removeClass(tabStripWhiteIconColor);
                var tabElementsLength = that.element.find(tabStripButtonList + " i").length;
                if (tabElementsLength > 0) {
                    $(that.element.find(tabStripButtonList + " i")[nextTab]).removeClass(tabStripWhiteIconColor).addClass(tabStripBlueIconColor);
                    $(that.element.find(tabStripButtonList + " " + tabStripButtonText)[nextTab]).addClass(tabStripWhiteIconColor);
                }
            }
        },
        _bindGroup: function (startIndex, endIndex) {
            for (index = 1; index < groupCount; index++) {
                var currentGroupItem = that._userSelectionData.userSelection[index];
                that._buildGroup(currentGroupItem, index, undefined);
            }
            that._showHideColumns();
            that._buildGranularGroup();
        },
        _buildPercentageBar: function () {
            for (index = 1; index < groupCount; index++) {
                var currentGroupItem = that._userSelectionData.userSelection[index];
                var currentGroupName = that.element.find("#toggleGrpName" + index);
                var currentGroup = that.element.find("#togglegrp" + index);
                var groupHeader = that.element.find("#grphdrId" + index);
                var toogleGroupHeader = that.element.find("#togglegrphdr" + index);

                if (currentGroupItem.columns.length > 0) {
                    var slctColLength = currentGroupItem.visibleColumns.length;
                    var totLength = currentGroupItem.columns.length;

                    var grpHdrWidth = (slctColLength / totLength) * 100 + "%";
                    $(groupHeader).show();
                    $(groupHeader).css('width', $(currentGroup).width() / $(currentGroup).parent().width() * 100 + "%");

                    $(toogleGroupHeader).addClass("mg-group-header-space").css("width", grpHdrWidth);
                    if ($(currentGroupName).hasClass("mg-toolbar-col-group-disabled")) {
                        $(toogleGroupHeader).removeClass('mg-group-header-space');
                    }
                } else {
                    $(groupHeader).hide();
                }
            }
        },
        _buildGranularGroup: function () {
            var granularGroupRow = $('<tr></tr>', {
                'class': 'granularGrp'
            });
            var isGranularAdded = false;
            var granularGroupingExapandCollapse;
            var currentGroupItem;
            var colSpan;
            var tHead;
            var outerSpan;
            var innerSpan;
            var iImage;
            for (index = 1; index < groupCount; index++) {
                currentGroupItem = that._userSelectionData.userSelection[index];
                colSpan = currentGroupItem.Isfreeze ? 1 : currentGroupItem.visibleColumns.length;
                if (currentGroupItem.visible && (currentGroupItem.filterGroupSelect || currentGroupItem.filterGroupSelectTemp) && !currentGroupItem.hideGroupHeaderAndGranular) {
                    isGranularAdded = true;
                    granularGroupingExapandCollapse = $.proxy(that._granularGroupingExapandCollapse, that, currentGroupItem, index);
                    tHead = $("<th></th>", {
                        'style': 'cursor: pointer;',
                        'class': 'mg-toolbar-group mg-toolbar-group' + currentGroupItem.groupIndex,
                        'colspan': colSpan,
                        'scope': 'colgroup'
                    });
                    outerSpan = $("<span></span>");
                    innerSpan = $("<span></span>", {
                        'class': 'mg-granular'
                    });
                    var granularName = "";
                    if (currentGroupItem.name == "") {
                        granularName = (that.options.groupConstantText.toUpperCase() + "  " + index);
                    }
                    else if (currentGroupItem.name != "") {
                        granularName = (currentGroupItem.name.toUpperCase());
                    }
                    innerSpan.append("<span>" + granularName + "</span>");

                    granularGroupingExapandCollapse = $.proxy(that._granularGroupingExapandCollapse, that, currentGroupItem, tHead);

                    iImage = $("<i></i>", {
                        'class': 'fa-solid ' + (currentGroupItem.Isfreeze ? 'fa-forward' : 'fa-backward') + ' float-right',
                        'id': 'imgShowHide' + currentGroupItem.groupIndex
                    })
                        .on('click', granularGroupingExapandCollapse);

                    innerSpan.append(iImage);
                    outerSpan.append(innerSpan);
                    tHead.append(outerSpan);
                    granularGroupRow.append(tHead);
                }
            }

            that.element.find('table > thead').find('.granularGrp').remove();
            if (isGranularAdded) {
                that.element.find('table > thead > tr').eq(0).before(granularGroupRow);
                that.element.find("#granularGrpHeader").css("display", "block");
                that.element.find("#granularGrp").css("display", "block");
                that.element.find("#granularGrpHeader").show();
            } else {
                that.element.find("#granularGrpHeader").css("display", "none");
                that.element.find("#granularGrpHeader").hide();
                that.element.find("#granularGrp").css("display", "none");
            }
            that._buildPercentageBar();
        },
        _buildGroup: function (currentGroupItem, index, granularExpandCollaspse) {
            var currentGroupName = that.element.find("#toggleGrpName" + index);
            var currentGroup = that.element.find("#togglegrp" + index);

            if (currentGroupItem.visible) {
                $(currentGroupName).removeClass('mg-toolbar-col-grp1').addClass('mg-toolbar-col-group1');
                $(currentGroup).show();

                $(currentGroupName).addClass("fa-solid fa-eye");

                if (currentGroupItem.name == "") {
                    $(currentGroupName).text("    " + that.options.groupConstantText.toUpperCase() + "  " + index);
                }
                else if (currentGroupItem.name != "") {

                    $(currentGroupName).text("    " + currentGroupItem.name.toUpperCase());
                }

                if (currentGroupItem.filterGroupSelect == true || currentGroupItem.filterGroupSelectTemp) {
                    $(currentGroupName).removeClass('mg-toolbar-col-group-disabled').addClass('mg-toolbar-col-group1');
                }
                else {
                    $(currentGroupName).removeClass('mg-toolbar-col-group1 mg-toolbar-col-group2 mg-toolbar-col-grp1').addClass('mg-toolbar-col-group-disabled');
                }

            } else {
                $(currentGroupName).removeClass('mg-toolbar-col-group1').addClass('mg-toolbar-col-grp1');
                $(currentGroup).hide();
            }
        },
        _granularGroupingExapandCollapse: function (currentGroupItem, tHead, index, event) {
            currentGroupItem.Isfreeze = currentGroupItem.Isfreeze ? false : true;
            $.when(that._showHideColumns()).done(function () {
                that.refresh();
            });
            that._buildGranularGroup();
        },
        _showHideColumns: function () {
            that.element.find('table > thead').find('.granularGrp').remove();
            var visibleColumns = [];
            for (index = 1; index < groupCount; index++) {
                var currentItem = that._userSelectionData.userSelection[index];

                if (currentItem.visible && (currentItem.filterGroupSelect || currentItem.filterGroupSelectTemp) && !currentItem.hideGroupHeaderAndGranular) {
                    $.each(currentItem.visibleColumns, function (indexer, item) {
                        var actualItem = that._findColumn(that.columns, 0, item);
                        if (actualItem != undefined) {
                            if (currentItem.Isfreeze) {
                                if (currentItem.freeze == item) {
                                    visibleColumns.push(actualItem.Item);
                                }
                            } else {
                                visibleColumns.push(actualItem.Item);
                            }
                        }
                    });
                }
            }

            var visibleColumnLength;
            var actualColumn;
            var visibleIndex = 0;
            if (visibleColumns.length == 0) {
                visibleColumnLength = that.sortedColumns.length;
                for (visibleIndex = 0; visibleIndex < visibleColumnLength; visibleIndex++) {
                    actualColumn = that._findColumn(that.columns, visibleIndex, that.sortedColumns[visibleIndex].field);
                    if (actualColumn != undefined) {
                        that.reorderColumn(visibleIndex, actualColumn.Item);
                        that._showCol(actualColumn.Item.field);
                    }
                }
            } else {
                visibleColumnLength = visibleColumns.length;
                for (visibleIndex = 0; visibleIndex < visibleColumnLength; visibleIndex++) {
                    actualColumn = visibleColumns[visibleIndex];
                    that.reorderColumn(visibleIndex, actualColumn);
                    that._showCol(actualColumn.field);
                }
                var totalColumnLegth = that.columns.length;
                for (var indexMegaGrid = 0; indexMegaGrid < totalColumnLegth; indexMegaGrid++) {
                    var item = that.columns[indexMegaGrid];
                    var itemFound = that._findColumn(visibleColumns, 0, item.field);
                    if (itemFound == undefined) {
                        that._hideCol(item.field);
                    }
                }
            }
        },
        _groupHeaderFilterColumns: function (index, event) {
            var currentItem;
            for (indexer = index - 1; indexer >= 1; indexer--) {
                currentItem = that._userSelectionData.userSelection[indexer];
                currentItem.hideGroupHeaderAndGranular = true;
            }
            for (indexer = index; indexer < groupCount; indexer++) {
                currentItem = that._userSelectionData.userSelection[indexer];
                currentItem.hideGroupHeaderAndGranular = false;
            }

            that._userSelectionData.userSelection[index].filterGroupSelectTemp = true;
            that._userSelectionData.userSelection[index].hideGroupHeaderAndGranular = false;
            that._bindGroup();

            if (that.element.find("#toggleGrpName" + index).hasClass('mg-toolbar-col-group1')) {
                that.element.find("[id^='toggleGrpName']").removeClass('mg-toolbar-col-group2').addClass('mg-toolbar-col-group1');
                that.element.find("#toggleGrpName" + index).removeClass('mg-toolbar-col-group1').addClass('mg-toolbar-col-group2');
                that.element.find("#togglegrp" + index).removeClass('mg-toolbar-col-grp1').addClass('mg-toolbar-col-group2');
            }

            if (that.element.find(".k-grid-content").hasClass('k-auto-scrollable')) {
                that.element.find(".k-grid-content.k-auto-scrollable").scrollLeft(0);
            }
        },
        _clearFiltersAndSorting: function () {
            var readRequestRequired = false;

            if (that.dataSource
                && that.dataSource.filter()
                && that.dataSource.filter().length > 0) {
                that.dataSource.filter().filters.splice(0, that.dataSource.filter().filters.length);
                readRequestRequired = true;
            }

            if (that.dataSource
                && that.dataSource.sort()
                && that.dataSource.sort().length > 0) {
                that.dataSource.sort().splice(0, that.dataSource.sort().length);
                readRequestRequired = true;
            }

            if (readRequestRequired) {
                that.dataSource.read();
            } else {
                that._bindGroup();
            }
        },
        _findColumn: function (itemToSearch, startIndex, searchField) {
            var columnLength = itemToSearch.length;
            for (var index = startIndex; index < columnLength; index++) {
                if (itemToSearch[index].field == searchField) {
                    var actualColumn = [];
                    actualColumn.Index = index;
                    actualColumn.Item = itemToSearch[index];
                    return actualColumn;
                }
            }
            return undefined;
        },
        _showCol: function (col) {
            var column = that.element.find(".k-grid-header table [data-field='" + col + "']");
            column.show();
            var selector = ".k-grid-content table td:nth-child(" + (parseInt(column.attr("data-index")) + 1) + ")";
            that.element.find(selector).show();
        },
        _hideCol: function (col) {
            var column = that.element.find(".k-grid-header table [data-field='" + col + "']");
            column.hide();
            var selector = ".k-grid-content table td:nth-child(" + (parseInt(column.attr("data-index")) + 1) + ")";
            that.element.find(selector).hide();
        },
        _getMegaGridDefaultTemplate: function () {
            if (typeof (that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource._data) !== 'undefined') {
                var len = that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource._data.length;
                for (var i = 0; i < len; i++) {
                    var dataItem = that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource._data[i];
                    that.options.defaultTemplateItems.push(dataItem.SelectionCustomName);
                }
            }
        },
        _checkMegaGridDefaultTemplate: function () {
            if (typeof (that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource._data) !== 'undefined') {
                if (typeof (defaultTemplateName) !== 'undefined') {
                    var templatesName = defaultTemplateName.split(',');
                    that.options.defaultNotExistTemplateItems = templatesName.filter(function (n) { return !this.has(n); }, new Set(that.options.defaultTemplateItems));
                    for (var i = 0; i < that.options.defaultNotExistTemplateItems.length; i++) {
                        that.element.find(userSelectionDropDown + dropDownList).getKendoDropDownList().dataSource.add({
                            Content: '',
                            GridID: that.options.gridId,
                            IsDeleteEnabled: false,
                            IsTemplate: true,
                            SelectionCustomName: that.options.defaultNotExistTemplateItems[i],
                            TemplateText: "Templates"
                        });
                    }
                }
            }
        }
    });
    ui.plugin(MegaGrid);
})(jQuery);
