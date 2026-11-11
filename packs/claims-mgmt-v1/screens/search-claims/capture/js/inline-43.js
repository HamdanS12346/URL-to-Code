
	kendo.syncReady(function(){jQuery("#ClaimSourceCodeList").kendoDropDownList({"change":function(e) {
        var sel = $('#ClaimSourceCodeList').val();
        if (sel != '') {
            $('#ClaimSourceCode_ID').val(sel);
            var txt = $('#ClaimSourceCodeList').data('kendoDropDownList').text();
            $('#ClaimSourceCode_Name').val(txt);
        } else {
            $('#ClaimSourceCode_ID').val('');
            $('#ClaimSourceCode_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ClaimSourceCodeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"HT","Name":"HIPAA Transaction","DisplayFormat":0,"FormattedText":"HIPAA Transaction","DefaultCode":null},{"ID":"ME","Name":"Manual Entry","DisplayFormat":0,"FormattedText":"Manual Entry","DefaultCode":null},{"ID":"AB","Name":"Test","DisplayFormat":0,"FormattedText":"Test","DefaultCode":null},{"ID":"tyuiop679","Name":"Testing","DisplayFormat":0,"FormattedText":"Testing","DefaultCode":null},{"ID":"1234","Name":"Test","DisplayFormat":0,"FormattedText":"Test","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
