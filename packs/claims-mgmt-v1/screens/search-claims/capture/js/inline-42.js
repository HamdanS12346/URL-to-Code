
	kendo.syncReady(function(){jQuery("#ClaimStatusList").kendoDropDownList({"change":function(e) {
        var sel = $('#ClaimStatusList').val();
        if (sel != '') {
            $('#ClaimStatus_ID').val(sel);
            var txt = $('#ClaimStatusList').data('kendoDropDownList').text();
            $('#ClaimStatus_Name').val(txt);
        } else {
            $('#ClaimStatus_ID').val('');
            $('#ClaimStatus_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ClaimStatusList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"01","Name":"Denied","DisplayFormat":0,"FormattedText":"Denied","DefaultCode":null},{"ID":"02","Name":"Paid","DisplayFormat":0,"FormattedText":"Paid","DefaultCode":null},{"ID":"11","Name":"Suspended","DisplayFormat":0,"FormattedText":"Suspended","DefaultCode":null},{"ID":"91","Name":"Adjusted","DisplayFormat":0,"FormattedText":"Adjusted","DefaultCode":null},{"ID":"00","Name":"Voided","DisplayFormat":0,"FormattedText":"Voided","DefaultCode":null},{"ID":"95","Name":"In Process","DisplayFormat":0,"FormattedText":"In Process","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
