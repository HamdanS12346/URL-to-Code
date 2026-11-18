
    var auditHelpNode = '';
    var auditUrl = '';
    var helpContentURL = '/Help/HelpContent/';
    var mailHelpNode = '';
    var mailUrl = '';
    var notesHelpNode = '';
    var notesUrl = '';
    var printPreviewHelpNode = '';
    var printPreviewUrl = '/ProviderEnrollment/PrintPreviewPanel';
    var reportsHelpNode = '';
    var reportsUrl = '';
    var returnToProviderHelpNode = '';
    var returnToProviderUrl = '/ProviderEnrollment/ReturnToProviderPanel';
    helpContentKey = 'ProviderEnrollment.CreateSecureEnrollment';
    helpTypePrefix = 'UG';

    function displayPageLevelHelp(helpKey) {
        if (helpKey === undefined || helpKey === '') {
            helpContentKey = 'ProviderEnrollment.CreateSecureEnrollment';
        }
        else {
            helpContentKey = helpKey;
        }
        popupCenteredHelpWindow('/Help/HelpContentPopup?helpContentKey=' + helpContentKey + '&helpTypePrefix=' + helpTypePrefix + '&isModuleDDLDisplayed=true', 'HELP');
    }
