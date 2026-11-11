
	kendo.syncReady(function(){jQuery("#ClaimSubTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#ClaimSubTypeList').val();
        if (sel != '') {
            $('#ClaimSubType_ID').val(sel);
            var txt = $('#ClaimSubTypeList').data('kendoDropDownList').text();
            $('#ClaimSubType_Name').val(txt);
        } else {
            $('#ClaimSubType_ID').val('');
            $('#ClaimSubType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#ClaimSubTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"FIN","Name":"Finance","DisplayFormat":0,"FormattedText":"Finance","DefaultCode":null},{"ID":"HH","Name":"Home Health","DisplayFormat":0,"FormattedText":"Home Health","DefaultCode":null},{"ID":"COMP","Name":"Compound","DisplayFormat":0,"FormattedText":"Compound","DefaultCode":null},{"ID":"SNF","Name":"Skilled Nursing Facility","DisplayFormat":0,"FormattedText":"Skilled Nursing Facility","DefaultCode":null},{"ID":"DME","Name":"Durable Medical Equipment","DisplayFormat":0,"FormattedText":"Durable Medical Equipment","DefaultCode":null},{"ID":"ORTHO","Name":"Orthodontia","DisplayFormat":0,"FormattedText":"Orthodontia","DefaultCode":null},{"ID":"HSPC","Name":"Hospice Care ","DisplayFormat":0,"FormattedText":"Hospice Care ","DefaultCode":null},{"ID":"CO","Name":"Cross Over","DisplayFormat":0,"FormattedText":"Cross Over","DefaultCode":null},{"ID":"DIET","Name":"Diet\\Nutrition","DisplayFormat":0,"FormattedText":"Diet\\Nutrition","DefaultCode":null},{"ID":"LAB","Name":"Laboratory","DisplayFormat":0,"FormattedText":"Laboratory","DefaultCode":null},{"ID":"NM","Name":"Non Medical","DisplayFormat":0,"FormattedText":"Non Medical","DefaultCode":null},{"ID":"PEDI","Name":"Pediatric","DisplayFormat":0,"FormattedText":"Pediatric","DefaultCode":null},{"ID":"REHAB","Name":"Rehabilitation","DisplayFormat":0,"FormattedText":"Rehabilitation","DefaultCode":null},{"ID":"SPCH","Name":"Speech/Hearing","DisplayFormat":0,"FormattedText":"Speech/Hearing","DefaultCode":null},{"ID":"SPEC","Name":"Speciality - RN","DisplayFormat":0,"FormattedText":"Speciality - RN","DefaultCode":null},{"ID":"SUPP","Name":"Supplier","DisplayFormat":0,"FormattedText":"Supplier","DefaultCode":null},{"ID":"SURG","Name":"Surgery","DisplayFormat":0,"FormattedText":"Surgery","DefaultCode":null},{"ID":"TECH","Name":"Technicians","DisplayFormat":0,"FormattedText":"Technicians","DefaultCode":null},{"ID":"TRANS","Name":"Transportation","DisplayFormat":0,"FormattedText":"Transportation","DefaultCode":null},{"ID":"VISI","Name":"Vision","DisplayFormat":0,"FormattedText":"Vision","DefaultCode":null},{"ID":"DISAB","Name":"Disabilities","DisplayFormat":0,"FormattedText":"Disabilities","DefaultCode":null},{"ID":"PSYCH","Name":"Psychiatric","DisplayFormat":0,"FormattedText":"Psychiatric","DefaultCode":null},{"ID":"RESP","Name":"Respite","DisplayFormat":0,"FormattedText":"Respite","DefaultCode":null},{"ID":"SUBAB","Name":"Substance Abuse Disorder Rehabilitation Facility","DisplayFormat":0,"FormattedText":"Substance Abuse Disorder Rehabilitation Facility","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
