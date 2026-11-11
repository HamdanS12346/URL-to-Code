
	kendo.syncReady(function(){jQuery("#ServiceTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#ServiceTypeList').val();
        if (sel != '') {
            $('#ServiceType_ID').val(sel);
            var txt = $('#ServiceTypeList').data('kendoDropDownList').text();
            $('#ServiceType_Name').val(txt);
        } else {
            $('#ServiceType_ID').val('');
            $('#ServiceType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ServiceTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"01","Name":"Surgery","DisplayFormat":0,"FormattedText":"Surgery","DefaultCode":null},{"ID":"02","Name":"Medical","DisplayFormat":0,"FormattedText":"Medical","DefaultCode":null},{"ID":"06","Name":"Laboratory","DisplayFormat":0,"FormattedText":"Laboratory","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
