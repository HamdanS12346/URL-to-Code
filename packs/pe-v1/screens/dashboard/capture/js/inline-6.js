
    var auditHelpNode = '';
    var auditUrl = '';
    var helpContentURL = '/Help/HelpContent/';
    var mailHelpNode = '';
    var mailUrl = '';
    var notesHelpNode = '';
    var notesUrl = '';
    var printPreviewHelpNode = '';
    var printPreviewUrl = '';
    var reportsHelpNode = '';
    var reportsUrl = '';
    var returnToProviderHelpNode = '';
    var returnToProviderUrl = '';
    helpContentKey = 'ProviderEnrollment.Enrollment';
    helpTypePrefix = 'UG';

    function displayPageLevelHelp(helpKey) {
        if (helpKey === undefined || helpKey === '') {
            helpContentKey = 'ProviderEnrollment.Enrollment';
        }
        else {
            helpContentKey = helpKey;
        }
        popupCenteredHelpWindow('/Help/HelpContentPopup?helpContentKey=' + helpContentKey + '&helpTypePrefix=' + helpTypePrefix + '&isModuleDDLDisplayed=true', 'HELP');
    }
