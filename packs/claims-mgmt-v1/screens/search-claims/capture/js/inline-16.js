
	kendo.syncReady(function(){jQuery("#DateTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#DateTypeList').val();
        if (sel != '') {
            $('#DateType_ID').val(sel);
            var txt = $('#DateTypeList').data('kendoDropDownList').text();
            $('#DateType_Name').val(txt);
        } else {
            $('#DateType_ID').val('');
            $('#DateType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#DateTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"DOS","Name":"Service Date","DisplayFormat":0,"FormattedText":"Service Date","DefaultCode":"DOS"},{"ID":"DP","Name":"Paid Date","DisplayFormat":0,"FormattedText":"Paid Date","DefaultCode":null},{"ID":"DR","Name":"Receipt Date","DisplayFormat":0,"FormattedText":"Receipt Date","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID"});});
