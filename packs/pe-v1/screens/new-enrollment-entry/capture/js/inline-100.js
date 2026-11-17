
	kendo.syncReady(function(){jQuery("#Provider_ProgramTypeList").kendoDropDownList({"change":function(e) {
        var sel = $('#Provider_ProgramTypeList').val();
        if (sel != '') {
            $('#Provider_ProgramType_ID').val(sel);
            var txt = $('#Provider_ProgramTypeList').data('kendoDropDownList').text();
            $('#Provider_ProgramType_Name').val(txt);
        } else {
            $('#Provider_ProgramType_ID').val('');
            $('#Provider_ProgramType_Name').val('');
        }
    },"select":function(e) {
            if (e.item) {
               var dataItem = this.dataItem(e.item);
               $('#Provider_ProgramTypeList').data('kendoDropDownList').wrapper.attr('title', '');
            }
        },"dataSource":[{"ID":"FFSonly","Name":"FFS only ","DisplayFormat":0,"FormattedText":"FFS only ","DefaultCode":null},{"ID":"MCOonly","Name":"MCO(s) only","DisplayFormat":0,"FormattedText":"MCO(s) only","DefaultCode":null},{"ID":"FFSMCO","Name":"FFS and MCO","DisplayFormat":0,"FormattedText":"FFS and MCO","DefaultCode":null},{"ID":"SfCFFS","Name":"Smiles for Children","DisplayFormat":0,"FormattedText":"Smiles for Children","DefaultCode":null},{"ID":"MCOEnhOnly","Name":"MCO (Enhanced Benefit) Only","DisplayFormat":0,"FormattedText":"MCO (Enhanced Benefit) Only","DefaultCode":null},{"ID":"SfCFFSMCO","Name":"Smiles for Children and MCO (Enhanced Benefit)","DisplayFormat":0,"FormattedText":"Smiles for Children and MCO (Enhanced Benefit)","DefaultCode":null},{"ID":"Logisticare","Name":"Logisticare","DisplayFormat":0,"FormattedText":"Logisticare","DefaultCode":null},{"ID":"SETran","Name":"SoutheastTran","DisplayFormat":0,"FormattedText":"SoutheastTran","DefaultCode":null},{"ID":"NationalMedTran","Name":"National MedTran","DisplayFormat":0,"FormattedText":"National MedTran","DefaultCode":null},{"ID":"VAPremier","Name":"VA Premier","DisplayFormat":0,"FormattedText":"VA Premier","DefaultCode":null},{"ID":"Veyo","Name":"Veyo","DisplayFormat":0,"FormattedText":"Veyo","DefaultCode":null},{"ID":"FFSBH","Name":"FFS Only","DisplayFormat":0,"FormattedText":"FFS Only","DefaultCode":null},{"ID":"FFSMCOBH","Name":"FFS and MCO","DisplayFormat":0,"FormattedText":"FFS and MCO","DefaultCode":null},{"ID":"MCOOnlyBH","Name":"MCO(s) Only","DisplayFormat":0,"FormattedText":"MCO(s) Only","DefaultCode":null},{"ID":"VERB","Name":"VERB","DisplayFormat":0,"FormattedText":"VERB","DefaultCode":null}],"dataTextField":"FormattedText","dataValueField":"ID","optionLabel":"select a value..."});});
