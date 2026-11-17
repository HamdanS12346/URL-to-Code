
	kendo.syncReady(function(){jQuery("#LastStatusList").kendoDropDownList({"change":function(e) {
        var sel = $('#LastStatusList').val();
        if (sel != '') {
            $('#LastStatus_ID').val(sel);
            var txt = $('#LastStatusList').data('kendoDropDownList').text();
            $('#LastStatus_Name').val(txt);
        } else {
            $('#LastStatus_ID').val('');
            $('#LastStatus_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#LastStatusList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"5","Name":"Approved","DisplayFormat":0,"FormattedText":"Approved","DefaultCode":null},{"ID":"13","Name":"Requested","DisplayFormat":0,"FormattedText":"Requested","DefaultCode":null},{"ID":"7","Name":"Expired","DisplayFormat":0,"FormattedText":"Expired","DefaultCode":null},{"ID":"4","Name":"Partial","DisplayFormat":0,"FormattedText":"Partial","DefaultCode":null},{"ID":"1","Name":"Pending","DisplayFormat":0,"FormattedText":"Pending","DefaultCode":null},{"ID":"12","Name":"Pending Credentialing","DisplayFormat":0,"FormattedText":"Pending Credentialing","DefaultCode":null},{"ID":"3","Name":"Rejected","DisplayFormat":0,"FormattedText":"Rejected","DefaultCode":null},{"ID":"6","Name":"Return To Provider","DisplayFormat":0,"FormattedText":"Return To Provider","DefaultCode":null},{"ID":"10","Name":"Started","DisplayFormat":0,"FormattedText":"Started","DefaultCode":null},{"ID":"2","Name":"Submitted","DisplayFormat":0,"FormattedText":"Submitted","DefaultCode":null},{"ID":"9","Name":"Submitted to Managed Care","DisplayFormat":0,"FormattedText":"Submitted to Managed Care","DefaultCode":null},{"ID":"8","Name":"Waiting for Attachments","DisplayFormat":0,"FormattedText":"Waiting for Attachments","DefaultCode":null},{"ID":"11","Name":"Pending Adjudication","DisplayFormat":0,"FormattedText":"Pending Adjudication","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
