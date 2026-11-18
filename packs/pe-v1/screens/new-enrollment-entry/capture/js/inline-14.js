
	kendo.syncReady(function(){jQuery("#EnrollmentPreChecklist_EnrollmentTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#EnrollmentPreChecklist_EnrollmentTypeList').val();
        if (sel != '') {
            $('#EnrollmentPreChecklist_EnrollmentType_ID').val(sel);
            var txt = $('#EnrollmentPreChecklist_EnrollmentTypeList').data('kendoDropDownList').text();
            $('#EnrollmentPreChecklist_EnrollmentType_Name').val(txt);
        } else {
            $('#EnrollmentPreChecklist_EnrollmentType_ID').val('');
            $('#EnrollmentPreChecklist_EnrollmentType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#EnrollmentPreChecklist_EnrollmentTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"I","Name":"Individual","DisplayFormat":0,"FormattedText":"Individual","DefaultCode":null},{"ID":"F","Name":"Facility","DisplayFormat":0,"FormattedText":"Facility","DefaultCode":null},{"ID":"G","Name":"Group","DisplayFormat":0,"FormattedText":"Group","DefaultCode":null},{"ID":"IG","Name":"Individual Within Group","DisplayFormat":0,"FormattedText":"Individual Within Group","DefaultCode":null},{"ID":"AT","Name":"Atypical Providers","DisplayFormat":0,"FormattedText":"Atypical Providers","DefaultCode":null},{"ID":"O","Name":"Ordering, Prescribing, Referring","DisplayFormat":0,"FormattedText":"Ordering, Prescribing, Referring","DefaultCode":null},{"ID":"TT","Name":"Test2025","DisplayFormat":0,"FormattedText":"Test2025","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
