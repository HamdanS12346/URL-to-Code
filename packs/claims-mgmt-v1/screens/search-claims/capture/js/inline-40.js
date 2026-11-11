
	kendo.syncReady(function(){jQuery("#ClaimTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#ClaimTypeList').val();
        if (sel != '') {
            $('#ClaimType_ID').val(sel);
            var txt = $('#ClaimTypeList').data('kendoDropDownList').text();
            $('#ClaimType_Name').val(txt);
        } else {
            $('#ClaimType_ID').val('');
            $('#ClaimType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ClaimTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"I","Name":"Inpatient","DisplayFormat":0,"FormattedText":"Inpatient","DefaultCode":null},{"ID":"A","Name":"Inpatient Crossover","DisplayFormat":0,"FormattedText":"Inpatient Crossover","DefaultCode":null},{"ID":"M","Name":"Medical","DisplayFormat":0,"FormattedText":"Medical","DefaultCode":null},{"ID":"B","Name":"Medical Crossover","DisplayFormat":0,"FormattedText":"Medical Crossover","DefaultCode":null},{"ID":"ME","Name":"Medical","DisplayFormat":0,"FormattedText":"Medical","DefaultCode":null},{"ID":"OP","Name":"Outpatient","DisplayFormat":0,"FormattedText":"Outpatient","DefaultCode":null},{"ID":"DE","Name":"Dental","DisplayFormat":0,"FormattedText":"Dental","DefaultCode":null},{"ID":"PH","Name":"Pharmacy","DisplayFormat":0,"FormattedText":"Pharmacy","DefaultCode":null},{"ID":"IP","Name":"Inpatient","DisplayFormat":0,"FormattedText":"Inpatient","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
