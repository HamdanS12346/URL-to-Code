
	kendo.syncReady(function(){jQuery("#PayToList").kendoDropDownList({"change":function(e) {
        var sel = $('#PayToList').val();
        if (sel != '') {
            $('#PayTo_ID').val(sel);
            var txt = $('#PayToList').data('kendoDropDownList').text();
            $('#PayTo_Name').val(txt);
        } else {
            $('#PayTo_ID').val('');
            $('#PayTo_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#PayToList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"A","Name":"Alternate Payee","DisplayFormat":0,"FormattedText":"Alternate Payee","DefaultCode":null},{"ID":"M","Name":"Member","DisplayFormat":0,"FormattedText":"Member","DefaultCode":null},{"ID":"P","Name":"Provider","DisplayFormat":0,"FormattedText":"Provider","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
