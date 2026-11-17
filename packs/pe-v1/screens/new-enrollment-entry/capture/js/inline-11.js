

    var actionAlertTitle = "Alert Confirmation";
    var buttonStartText = "Start";
    var buttonClearText = "Clear";
    var buttonCloseText = "Close";
    var buttonContinueText = "Continue";
    var buttonContinueSaveText = "Save and Continue";
    var buttonDeleteText = "Delete";
    var buttonRegisterText = "Register";
    var buttonResetText = "Clear";
    var buttonSaveText = "Save";
    var globalNo = 'No';
    var cancelInfo = "Are you sure you want to cancel and leave this enrollment?";
    var globalYes = 'Yes';

    var enrollApplicationIDPartial = ""
    var progressBarTitle = "PROGRESS";
    var stepInfoName = "Step {0}: ";
    var stepInfoCount = "Step {0} of {2}";
    var DataModified = "Data on this page has been modified. Do you want to save these changes?";
    var DataModifiedHdr = "Data Modified";
    var enrollmentTypeStepList = null
    var statusPartialMvcUrl = "/ProviderEnrollment/EnrollmentStatus/";
    var DuplicateSubmitFound = "DuplicateSubmitFound";
    var invalidStatus = "The enrollment with tracking number &lt;b&gt;{0}&lt;/b&gt; can no longer be changed. Please check Enrollment Status for more information regarding this application.";
    var invalidAddressErrorMessage = "{0}: You have entered invalid address details. Please correct your address details before you proceed any further.";
    var isCreatedFromInternalPortal = "True";
    var rtpReasonDataList = {"Id":null,"ContentId":"ProviderEnrollment.DataList.RTPReason","LocaleId":"en-US","Name":null,"LocaleDataListItems":[{"Id":"50c9bb65-a5be-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"01","Text":"Tax ID Not Valid","Order":1,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-a6be-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"02","Text":"Date of Birth Not Valid","Order":2,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-8acc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"03","Text":"NPI Not Valid","Order":3,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-8bcc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"04","Text":"Missing or invalid information on the Ownership Disclosure","Order":4,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-8ccc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"05","Text":"Missing or invalid information for the Managing Employee","Order":5,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-8dcc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"06","Text":"Invalid Insurance","Order":6,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-8ecc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"07","Text":"Expired or Invalid License","Order":7,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-8fcc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"08","Text":"Missing or invalid proof of fee payment","Order":8,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-90cc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"09","Text":"Missing/incorrect supporting documentation","Order":9,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-91cc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"10","Text":"Expired W-9","Order":10,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"50c9bb65-92cc-69e0-e053-4c65a28f8a9e","ContentId":null,"LocaleId":"en-US","Value":"11","Text":"Provider Agreement missing the signature (presumably for paper applications)","Order":11,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"0c07e869-47f2-4f45-bd92-4a1a5eae7fd8","ContentId":null,"LocaleId":"en-US","Value":"12","Text":"Site Visit Issue","Order":12,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"b67caf13-2812-4b14-a421-a4efb9d18dc7","ContentId":null,"LocaleId":"en-US","Value":"13","Text":"A signer has declined to sign.","Order":13,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"3127ba01-afef-47fe-9e05-2a28f0dfef39","ContentId":null,"LocaleId":"en-US","Value":"14","Text":"A document has exceeded its set expiration period without completing.","Order":14,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"b968c1f2-45db-411c-b0c9-e827299655a4","ContentId":null,"LocaleId":"en-US","Value":"15","Text":"The sender canceled the envelope before it was completed.","Order":15,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"373c4f9d-06b7-4efc-97ea-446d3edcf101","ContentId":null,"LocaleId":"en-US","Value":"098","Text":"Self-Disclosure Responses Required","Order":16,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"fa1087a4-11a3-4a39-ac9c-5d0bbe653d33","ContentId":null,"LocaleId":"en-US","Value":"99","Text":"Bulk Submission Validation Failed","Order":17,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0},{"Id":"4ec94d4d-d996-42e4-8409-db5e71f50be7","ContentId":null,"LocaleId":"en-US","Value":"097","Text":"Malpractice Information Required","Order":18,"AttributeValues":null,"DefaultCode":null,"LinkOrder":0}]};
    var rtpToPartialmsg = "All the required details are received after RTP.";
    var rtpStatusType = "Return To Provider";
    var rtpPopUpTitle = 'Alert!';
    var attachmentsName = "Attachments";
    var legalLastNameLabel = 'Legal Last Name';
    var enableSecondLastName = ('False'.toLocaleLowerCase() == "true") ? true : false;
    var enrollmentCreateActionName = "EnrollmentCreate";
    var secureEnrollmentCreateActionName = "CreateSecureEnrollment";
    var isSecure = ('True'.toLocaleLowerCase() == "true") ? true : false;
    var hasRightsEnrollmentWithoutSave = ('False'.toLocaleLowerCase() == "true") ? true : false;
