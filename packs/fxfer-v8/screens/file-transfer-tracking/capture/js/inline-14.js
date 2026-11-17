
	kendo.syncReady(function(){jQuery("#DirectionList").kendoDropDownList({"change":function(e) {
        var sel = $('#DirectionList').val();
        if (sel != '') {
            $('#Direction_ID').val(sel);
            var txt = $('#DirectionList').data('kendoDropDownList').text();
            $('#Direction_Name').val(txt);
        } else {
            $('#Direction_ID').val('');
            $('#Direction_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#DirectionList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"1","Name":"INBOUND","DisplayFormat":0,"FormattedText":"INBOUND","DefaultCode":null},{"ID":"2","Name":"OUTBOUND","DisplayFormat":0,"FormattedText":"OUTBOUND","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
