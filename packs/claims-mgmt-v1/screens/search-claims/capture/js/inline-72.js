
	kendo.syncReady(function(){jQuery("#DiagnosisTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#DiagnosisTypeList').val();
        if (sel != '') {
            $('#DiagnosisType_ID').val(sel);
            var txt = $('#DiagnosisTypeList').data('kendoDropDownList').text();
            $('#DiagnosisType_Name').val(txt);
        } else {
            $('#DiagnosisType_ID').val('');
            $('#DiagnosisType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#DiagnosisTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"01","Name":"ICD-9-CM","DisplayFormat":0,"FormattedText":"ICD-9-CM","DefaultCode":null},{"ID":"02","Name":"ICD-10-CM","DisplayFormat":0,"FormattedText":"ICD-10-CM","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID"});});
