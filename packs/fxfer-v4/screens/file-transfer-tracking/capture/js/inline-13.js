
	kendo.syncReady(function(){jQuery("#FileStatusList").kendoDropDownList({"change":function(e) {
        var sel = $('#FileStatusList').val();
        if (sel != '') {
            $('#FileStatus_ID').val(sel);
            var txt = $('#FileStatusList').data('kendoDropDownList').text();
            $('#FileStatus_Name').val(txt);
        } else {
            $('#FileStatus_ID').val('');
            $('#FileStatus_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#FileStatusList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"1","Name":"Complete","DisplayFormat":0,"FormattedText":"Complete","DefaultCode":null},{"ID":"2","Name":"Error","DisplayFormat":0,"FormattedText":"Error","DefaultCode":null},{"ID":"3","Name":"Transferring","DisplayFormat":0,"FormattedText":"Transferring","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
