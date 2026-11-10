
	kendo.syncReady(function(){jQuery("#SourceLocation").kendoDropDownList({"dataSource":{"transport":{"read":{"url":"/api/FileTransfer/GetSourceLocations/"},"prefix":""},"schema":{"errors":"Errors"}},"dataTextField":"Name","filter":"contains","autoBind":true,"dataValueField":"ID","optionLabel":"select a value..."});});
