
	kendo.syncReady(function(){jQuery("#MemberByList").kendoDropDownList({"change":function(e) {
        var sel = $('#MemberByList').val();
        if (sel != '') {
            $('#MemberBy_ID').val(sel);
            var txt = $('#MemberByList').data('kendoDropDownList').text();
            $('#MemberBy_Name').val(txt);
        } else {
            $('#MemberBy_ID').val('');
            $('#MemberBy_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#MemberByList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"MI","Name":"ID","DisplayFormat":0,"FormattedText":"ID","DefaultCode":null},{"ID":"MN","Name":"Name","DisplayFormat":0,"FormattedText":"Name","DefaultCode":null},{"ID":"PAN","Name":"Patient Acct","DisplayFormat":0,"FormattedText":"Patient Acct","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
