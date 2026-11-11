
	kendo.syncReady(function(){jQuery("#ProviderRoleList").kendoDropDownList({"change":function(e) {
        var sel = $('#ProviderRoleList').val();
        if (sel != '') {
            $('#ProviderRole_ID').val(sel);
            var txt = $('#ProviderRoleList').data('kendoDropDownList').text();
            $('#ProviderRole_Name').val(txt);
        } else {
            $('#ProviderRole_ID').val('');
            $('#ProviderRole_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ProviderRoleList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"BL","Name":"Billing","DisplayFormat":0,"FormattedText":"Billing","DefaultCode":null},{"ID":"PF","Name":"Performing","DisplayFormat":0,"FormattedText":"Performing","DefaultCode":null},{"ID":"RF","Name":"Referring","DisplayFormat":0,"FormattedText":"Referring","DefaultCode":null},{"ID":"AT","Name":"Attending","DisplayFormat":0,"FormattedText":"Attending","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
