
	kendo.syncReady(function(){jQuery("#EnrollmentPreChecklist_SpecialtyList").kendoDropDownList({"change":function(e) {
        var sel = $('#EnrollmentPreChecklist_SpecialtyList').val();
        if (sel != '') {
            $('#EnrollmentPreChecklist_Specialty_ID').val(sel);
            var txt = $('#EnrollmentPreChecklist_SpecialtyList').data('kendoDropDownList').text();
            $('#EnrollmentPreChecklist_Specialty_Name').val(txt);
        } else {
            $('#EnrollmentPreChecklist_Specialty_ID').val('');
            $('#EnrollmentPreChecklist_Specialty_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#EnrollmentPreChecklist_SpecialtyList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":{"transport":{"read":{"url":"/api/Localization/GetDataList/","data":function() { return kendo.ui.DropDownList.requestData(jQuery("#EnrollmentPreChecklist_SpecialtyList") , ""); }},"prefix":""},"serverFiltering":true,"filter":[],"schema":{"errors":"Errors"}},"dataTextField":"FormattedText","autoBind":false,"dataValueField":"ID","optionLabel":"select a value..."});});
