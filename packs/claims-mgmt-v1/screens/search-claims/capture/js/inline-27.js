
	kendo.syncReady(function(){jQuery("#ProviderByList").kendoDropDownList({"change":function(e) {
        var sel = $('#ProviderByList').val();
        if (sel != '') {
            $('#ProviderBy_ID').val(sel);
            var txt = $('#ProviderByList').data('kendoDropDownList').text();
            $('#ProviderBy_Name').val(txt);
        } else {
            $('#ProviderBy_ID').val('');
            $('#ProviderBy_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ProviderByList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"NP","Name":"NPI","DisplayFormat":0,"FormattedText":"NPI","DefaultCode":null},{"ID":"PI","Name":"Provider ID","DisplayFormat":0,"FormattedText":"Provider ID","DefaultCode":null},{"ID":"PN","Name":"Name","DisplayFormat":0,"FormattedText":"Name","DefaultCode":null},{"ID":"PT","Name":"Tax ID","DisplayFormat":0,"FormattedText":"Tax ID","DefaultCode":null},{"ID":"PX","Name":"Taxonomy","DisplayFormat":0,"FormattedText":"Taxonomy","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID"});});
