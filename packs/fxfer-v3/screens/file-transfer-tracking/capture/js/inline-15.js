
	kendo.syncReady(function(){jQuery("#TransportTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#TransportTypeList').val();
        if (sel != '') {
            $('#TransportType_ID').val(sel);
            var txt = $('#TransportTypeList').data('kendoDropDownList').text();
            $('#TransportType_Name').val(txt);
        } else {
            $('#TransportType_ID').val('');
            $('#TransportType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#TransportTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"1","Name":"FTP","DisplayFormat":0,"FormattedText":"FTP","DefaultCode":null},{"ID":"2","Name":"SFTP","DisplayFormat":0,"FormattedText":"SFTP","DefaultCode":null},{"ID":"3","Name":"UNC","DisplayFormat":0,"FormattedText":"UNC","DefaultCode":null},{"ID":"4","Name":"FTPS","DisplayFormat":0,"FormattedText":"FTPS","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
