
	kendo.syncReady(function(){jQuery("#Provider_IndividualProvider_GenderList").kendoDropDownList({"change":function(e) {
        var sel = $('#Provider_IndividualProvider_GenderList').val();
        if (sel != '') {
            $('#Provider_IndividualProvider_Gender_ID').val(sel);
            var txt = $('#Provider_IndividualProvider_GenderList').data('kendoDropDownList').text();
            $('#Provider_IndividualProvider_Gender_Name').val(txt);
        } else {
            $('#Provider_IndividualProvider_Gender_ID').val('');
            $('#Provider_IndividualProvider_Gender_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#Provider_IndividualProvider_GenderList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"U","Name":"Unknown","DisplayFormat":0,"FormattedText":"Unknown","DefaultCode":null},{"ID":"F","Name":"Female","DisplayFormat":0,"FormattedText":"Female","DefaultCode":null},{"ID":"M","Name":"Male","DisplayFormat":0,"FormattedText":"Male","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
