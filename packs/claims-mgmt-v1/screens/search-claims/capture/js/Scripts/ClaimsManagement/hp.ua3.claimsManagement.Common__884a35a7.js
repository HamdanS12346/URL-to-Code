//--------------------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved.
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//--------------------------------------------------------------------------------------------------
(function (window, $, undefined) {
    var setToLastRow = false;


    //Select a specific row.
    selectRow = function (gridId, rowToSelectIndex, withFocus, previousButtonId, nextButtonId) {
        var gridService = $(gridId).data("kendoGrid");
        var rowAt = gridService.dataSource.at(rowToSelectIndex);
        var rowuid = rowAt.uid;
        var row = gridService.tbody.find("tr[data-uid='" + rowuid + "']");
        gridService.select(row);
        var cell = row.find('td:eq(0)');
        gridService.current(cell);
        if (withFocus) {
            cell.focus();
        }
        calculatePrevNextButton(rowToSelectIndex, gridId, previousButtonId, nextButtonId);
    };

    //Calculate the previous or next button.
    calculatePrevNextButton = function (rowToSelectIndex, gridId, previousButtonId, nextButtonId) {
        var gridService = $(gridId).data("kendoGrid");
        var totalCount = gridService.dataSource.total();
        var pageService = gridService.dataSource.page();
        var pageSizeService = gridService.dataSource.pageSize();

        rowToSelectIndex = rowToSelectIndex + ((pageService - 1) * pageSizeService);

        if (totalCount === (rowToSelectIndex + 1)) {
            if (totalCount === 1) {
                toggleButton(previousButtonId, false);
            }
            else {
                toggleButton(previousButtonId, true);
            }
            toggleButton(nextButtonId, false);
        }
        else {
            if (rowToSelectIndex === 0) {
                toggleButton(previousButtonId, false);
                toggleButton(nextButtonId, true);
            }
            else {
                toggleButton(previousButtonId, true);
                toggleButton(nextButtonId, true);
            }
        }
    };

    //Toggle a button.
    toggleButton = function (control, enabled) {
        $(control).kendoButton().data("kendoButton").enable(enabled);
    };

    //Export PDF
    exportPdf = function (gridId) {
        $(gridId).getKendoGrid().saveAsPDF();
    };

    exportToExcel = function (e, gridId) {
        $(gridId).getKendoGrid().saveAsExcel();
    };

    //Set the next row of the grid on key down.
    setNextRowOnKeyDown = function (gridId, serverOperation) {
        var gridService = $(gridId).data("kendoGrid");
        var rowCount;
        if (gridService !== undefined) {
            if (serverOperation) {
                rowCount = gridService.dataSource.data().length;
            }
            else {
                rowCount = gridService.dataSource.view().length;
            }
            if (rowCount !== undefined) {
                var rows = gridService.items();
                var currSelRowIndex = rows.index(gridService.select());
                var nextRowIndex = rowCount - 1;
                if (currSelRowIndex < rowCount - 1) {
                    nextRowIndex = currSelRowIndex + 1;
                    setRowSelectionGrid(gridId, nextRowIndex, true);
                }
                else {
                    nextRowIndex = 0;
                    var pageService = gridService.dataSource.page();
                    var pageSizeService = gridService.dataSource.pageSize();
                    if (pageService * pageSizeService < gridService.dataSource.total()) {
                        gridService.dataSource.page(pageService + 1);
                        setRowSelectionGrid(gridId, nextRowIndex, true);
                    }
                }
            }
        }
    };

    //Set the previousrow of the grid on key up.
    setPreviousRowOnKeyUp = function (gridId, serverOperation) {
        var gridService = $(gridId).data("kendoGrid");
        setToLastRow = false;
        var rowCount;
        if (gridService !== undefined) {
            if (serverOperation) {
                rowCount = gridService.dataSource.data().length;
            }
            else {
                rowCount = gridService.dataSource.view().length;
            }
            if (rowCount !== undefined) {
                var rows = gridService.items();
                var currSelRowIndex = rows.index(gridService.select());
                prevRowIndex = 0;
                if (currSelRowIndex > 0) {
                    prevRowIndex = currSelRowIndex - 1;
                    setRowSelectionGrid(gridId, prevRowIndex, true);
                }
                else {
                    prevRowIndex = gridService.dataSource.pageSize() - 1;
                    var pageService = gridService.dataSource.page();
                    if (pageService > 1) {
                        gridService.dataSource.page(pageService - 1);
                        setToLastRow = true;
                    }

                    if ((!serverOperation && (currSelRowIndex > 0 || pageService > 1))) {
                        setRowSelectionGrid(gridId, prevRowIndex, true);
                    }
                }
            }
        }
    };

    setSelectRowOnKeyUpDown = function (gridId, rowToSelectIndex, withFocus) {
        if ($(gridId).data("kendoGrid") != undefined) {
            var gridService = $(gridId).data("kendoGrid");
            if (gridService.dataSource._data.length != 0) {
                var rowAt = gridService.dataSource.view()[rowToSelectIndex];
                var rowuid = rowAt.uid;
                var row = gridService.tbody.find("tr[data-uid='" + rowuid + "']");
                gridService.select(row);
                var cell = row.find('td:eq(0)');
                gridService.current(cell);
                if (withFocus) {
                    cell.focus();
                    gridService.table.focus();
                }
            }
        }
    };

    setRowSelectionGrid = function (gridId, rowToSelectIndex, withFocus) {
        var gridService = $(gridId).data("kendoGrid");
        var models = gridService.dataSource.view();
        var model = models[rowToSelectIndex];
        if (typeof model != "undefined") {
            var nextRowUid = model.uid;
            var row = gridService.table.find("[data-uid=" + nextRowUid + "]");
            gridService.select(row);
            var cell = row.find('td:eq(0)');
            gridService.current(cell);
            $(cell).closest("table").focus();
            if (withFocus) {
                cell.focus();
            }
        }
    };

    mouseHoverOnDemand = function (gridId) {
        var cell = $(gridId);
        if (cell.find('.gridColumnHover').length) {
            var columnHover = cell.find('.gridColumnHover').first();
            var datalist = columnHover.attr("dataListName");
            var id = columnHover.html();
            var desc = getHoverOverDescriptionValue(datalist, id);
            cell.attr("title", desc);
        }
    }

    //Initial Grid Row Selection
    setInitialGridRowSelected = function (gridId) {
        var gridService = $(gridId).data("kendoGrid");
        if (gridService.dataSource.total() > 0) {
            gridService.select("tr:eq(0)");
            var cell = gridService.tbody.find("tr[role='row'] td:first");
            gridService.current(cell);

            var rowCount = gridService.dataSource.data().length;

            if (setToLastRow === true) {
                setSelectRowOnKeyUpDown(gridId, rowCount - 1, true);
                setToLastRow = false;
            }
            else {
                setSelectRowOnKeyUpDown(gridId, 0, false);
            }
        }
    };

    clearAutoCompleteHoverOver = function () {
        $('input[data-role="autocomplete"]').each(
            function () {
                $(this).keyup(function (e) {
                    if ((e.keyCode === 8) || (e.keyCode === 46)) {
                        $(this).attr('title', "");
                    }
                });

                $(this).closest('div').find('.k-i-close').click(function () {
                    $(this).closest('div').find('input[data-role="autocomplete"]').attr('title', "");
                });

                $(this).mouseover(function (e) {
                    var dataListName = $(this).attr('id') + "_DataListName";
                    if ($("#" + dataListName) !== undefined && $("#" + dataListName).val() !== undefined) {
                        var desc = getHoverOverDescriptionValue($("#" + dataListName).val(), $(this).val());
                        $(this).attr('title', desc);
                    }  
                });
            });
    };

    isNullOrWhitespace = function (input) {

        if (typeof input === 'undefined' || input == null) {
            return true;
        }

        return input.replace(/\s/g, '').length < 1;
    };

    convertDateTimetoLocal = function (dateValue) {
        var chkTimeZone = dateValue.toString().split(" ").length;
        var timeString;
        if (chkTimeZone > 2) {
            timeString = dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getDate() + ' ' + dateValue.getHours() + ':' + dateValue.getMinutes() + ':' + dateValue.getSeconds();
        }
        else {
            timeString = dateValue;
        }
        return timeString;
    };

    convertLongDateTimetoShortDate = function (surgDate) {
        var dateValue = new Date(parseInt(surgDate.substr(6)));
        var offset = dateValue.getTimezoneOffset();
        var min = dateValue.getMinutes();
        offset = offset + min;
        ofsethour = offset / 60;
        var hours = (dateValue.getHours() + ofsethour);
        dateValue = dateValue.setHours(hours);
        dateValue = new Date(parseInt(dateValue));
        var nextmin = dateValue.getMinutes();
        if (nextmin > 0) {
            dateValue = dateValue.setMinutes(0);
            dateValue = new Date(parseInt(dateValue));
        }
        return dateValue;
    };

    doesDataSourceHaveChanges = function (ds) {
        var dirty = false;

        $.each(ds._data, function () {
            if (ds.hasChanges() || this.dirty === true || ds._destroyed.length > 0) {
                dirty = true;
            }
        });

        return dirty;
    };

    moveNextEditableCellByTab = function (grid, shiftKey) {
        if (grid !== undefined) {
            var current = grid.current();
            if (!current.hasClass("editable-cell")) {
                var nextCell;
                if (shiftKey) {
                    nextCell = current.prevAll(".editable-cell");
                    if (!nextCell[0]) {
                        var prevRow = current.parent().prev();
                        nextCell = prevRow.children(".editable-cell:last");
                    }
                } else {
                    nextCell = current.nextAll(".editable-cell");
                    if (!nextCell[0]) {
                        var nextRow = current.parent().next();
                        nextCell = nextRow.children(".editable-cell:first");
                    }
                }
                grid.current(nextCell);
                grid.editCell(nextCell[0]);
            }
        }
    };

    setGridKeyAction = function (e, grid, serverOperation) {
        if (grid !== null && grid !== undefined) {
            if (e.keyCode === upArrowKeyCode) {
                if (grid.id !== undefined) {
                    setPreviousRowOnKeyUp(grid.id, serverOperation);
                }
            }
            else if (e.keyCode === downArrowKeyCode) {
                if (grid.id !== undefined) {
                    setNextRowOnKeyDown(grid.id, serverOperation);
                }
            }
            else if (e.keyCode === kendo.keys.TAB) {
                moveNextEditableCellByTab(grid, e.shiftKey);
            }
        }
    };

    changeGridColumnSorting = function (gridId, fromColumn, toColumn) {
        var gridColumn = $(gridId).find("thead [data-field='" + fromColumn + "']");
        if (gridColumn.length > 0) {
            gridColumn.attr('data-field', toColumn);
        }
    };

    kendoAutoCompleteCustomFilteringPreventBlank = function (ev) {
        if (!ev.filter.value || ev.filter.value.length < 2) { ev.sender.popup.close(); ev.preventDefault(); }

        var filterValue = ev.filter.value;
        ev.preventDefault();

        this.dataSource.filter({
            logic: "or",
            filters: [
                {
                    field: "Name",
                    operator: "contains",
                    value: filterValue
                },
                {
                    field: "ID",
                    operator: "contains",
                    value: filterValue
                }
            ]
        });
    }
})(window, jQuery);
