
	kendo.syncReady(function(){jQuery("#Provider_IndividualProvider_EthnicityList").kendoDropDownList({"change":function(e) {
        var sel = $('#Provider_IndividualProvider_EthnicityList').val();
        if (sel != '') {
            $('#Provider_IndividualProvider_Ethnicity_ID').val(sel);
            var txt = $('#Provider_IndividualProvider_EthnicityList').data('kendoDropDownList').text();
            $('#Provider_IndividualProvider_Ethnicity_Name').val(txt);
        } else {
            $('#Provider_IndividualProvider_Ethnicity_ID').val('');
            $('#Provider_IndividualProvider_Ethnicity_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#Provider_IndividualProvider_EthnicityList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"01","Name":"Hispanic/Latino","DisplayFormat":0,"FormattedText":"Hispanic/Latino","DefaultCode":null},{"ID":"02","Name":"Not Hispanic/Latino","DisplayFormat":0,"FormattedText":"Not Hispanic/Latino","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
