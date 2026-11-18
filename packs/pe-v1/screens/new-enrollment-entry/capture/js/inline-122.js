
	kendo.syncReady(function(){jQuery("#ApplicantContact_PhoneNumberTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#ApplicantContact_PhoneNumberTypeList').val();
        if (sel != '') {
            $('#ApplicantContact_PhoneNumberType_ID').val(sel);
            var txt = $('#ApplicantContact_PhoneNumberTypeList').data('kendoDropDownList').text();
            $('#ApplicantContact_PhoneNumberType_Name').val(txt);
        } else {
            $('#ApplicantContact_PhoneNumberType_ID').val('');
            $('#ApplicantContact_PhoneNumberType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ApplicantContact_PhoneNumberTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"F","Name":"Fax","DisplayFormat":0,"FormattedText":"Fax","DefaultCode":null},{"ID":"H","Name":"Home","DisplayFormat":0,"FormattedText":"Home","DefaultCode":null},{"ID":"M","Name":"Mobile","DisplayFormat":0,"FormattedText":"Mobile","DefaultCode":null},{"ID":"O","Name":"Other","DisplayFormat":0,"FormattedText":"Other","DefaultCode":null},{"ID":"P","Name":"Pager","DisplayFormat":0,"FormattedText":"Pager","DefaultCode":null},{"ID":"TT","Name":"TTY","DisplayFormat":0,"FormattedText":"TTY","DefaultCode":null},{"ID":"W","Name":"Work","DisplayFormat":0,"FormattedText":"Work","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
