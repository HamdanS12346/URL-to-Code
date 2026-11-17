
	kendo.syncReady(function(){jQuery("#ApplicationTypeListList").kendoDropDownList({"change":function(e) {
        var sel = $('#ApplicationTypeListList').val();
        if (sel != '') {
            $('#ApplicationTypeList_ID').val(sel);
            var txt = $('#ApplicationTypeListList').data('kendoDropDownList').text();
            $('#ApplicationTypeList_Name').val(txt);
        } else {
            $('#ApplicationTypeList_ID').val('');
            $('#ApplicationTypeList_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ApplicationTypeListList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"0","Name":"New Enrollment","DisplayFormat":0,"FormattedText":"New Enrollment","DefaultCode":null},{"ID":"1","Name":"Revalidation","DisplayFormat":0,"FormattedText":"Revalidation","DefaultCode":null},{"ID":"2","Name":"ReEnrollment","DisplayFormat":0,"FormattedText":"ReEnrollment","DefaultCode":null},{"ID":"3","Name":"MCO Enrollment","DisplayFormat":0,"FormattedText":"MCO Enrollment","DefaultCode":null},{"ID":"4","Name":"Portal MCO Enrollment","DisplayFormat":0,"FormattedText":"Portal MCO Enrollment","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
