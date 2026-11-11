//-----------------------------------------------------------------------------------------
// This code is the property of Gainwell Technologies, Copyright (c) 2021. All rights reserved
//
// Any unauthorized use in whole or in part without written consent is strictly prohibited.
// Violators may be punished to the full extent of the law.
//-----------------------------------------------------------------------------------------

var onRequestEnd = function (e) {
    if (e.response !== undefined && e.response.Data && e.response.Data.length) {
        var data = e.response.Data;
        if (this.group().length && e.type == "read") {
            handleGroups(data);
        }
        else {
            loopRecords(data);
        }
    }
};

function handleGroups(groups) {
    for (var i = 0; i < groups.length; i++) {
        var gr = groups[i];
        offsetDateFields(gr);
        if (gr.HasSubgroups) {
            handleGroups(gr.Items);
        }
        else {
            loopRecords(gr.Items);
        }
    }
}

function loopRecords(records) {
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        offsetDateFields(record);
    }
}

function offsetDateFields(obj) {
    for (var name in obj) {
        var prop = obj[name];
        if (typeof (prop) === "string" && prop.indexOf("/Date(") == 0) {
            obj[name] = prop.replace(/\d+/, function (n) {
                var offsetMiliseconds = new Date(parseInt(n)).getTimezoneOffset() * 60000;
                return parseInt(n) + offsetMiliseconds;
            });
        }
    }
}

function getHoverOverDescriptionValue(datalistID, ID) {
    var desc = "";
    $.ajax({
        type: "POST"
        , async: false
        , url: "/ClaimsManagement/GetHoverOverDescriptionValue"
        , data: JSON.stringify({
            datalist: datalistID,
            value: ID
        })
        , contentType: "application/json"
        , success: function (data) { desc = data; }
    });

    //decode the encoded string returned from AJAX call
    return $('<div>').html(desc).text();
}