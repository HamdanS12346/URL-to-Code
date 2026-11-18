
	kendo.syncReady(function(){jQuery("#Provider_PreferredCommunicationDetails_LanguageListList").kendoDropDownList({"change":function(e) {
        var sel = $('#Provider_PreferredCommunicationDetails_LanguageListList').val();
        if (sel != '') {
            $('#Provider_PreferredCommunicationDetails_LanguageList_ID').val(sel);
            var txt = $('#Provider_PreferredCommunicationDetails_LanguageListList').data('kendoDropDownList').text();
            $('#Provider_PreferredCommunicationDetails_LanguageList_Name').val(txt);
        } else {
            $('#Provider_PreferredCommunicationDetails_LanguageList_ID').val('');
            $('#Provider_PreferredCommunicationDetails_LanguageList_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#Provider_PreferredCommunicationDetails_LanguageListList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"en-us","Name":"English","DisplayFormat":0,"FormattedText":"English","DefaultCode":null},{"ID":"es-mx","Name":"Spanish","DisplayFormat":0,"FormattedText":"Spanish","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
