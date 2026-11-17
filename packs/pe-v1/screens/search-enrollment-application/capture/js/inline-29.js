
	kendo.syncReady(function(){jQuery("#ExportOptionsList").kendoDropDownList({"change":function(e) {
        var sel = $('#ExportOptionsList').val();
        if (sel != '') {
            $('#ExportOptions_ID').val(sel);
            var txt = $('#ExportOptionsList').data('kendoDropDownList').text();
            $('#ExportOptions_Name').val(txt);
        } else {
            $('#ExportOptions_ID').val('');
            $('#ExportOptions_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ExportOptionsList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"1","Name":"Export Page to Excel","DisplayFormat":0,"FormattedText":"Export Page to Excel","DefaultCode":null},{"ID":"2","Name":"Export Page to PDF","DisplayFormat":0,"FormattedText":"Export Page to PDF","DefaultCode":null},{"ID":"3","Name":"Export All to Excel","DisplayFormat":0,"FormattedText":"Export All to Excel","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
