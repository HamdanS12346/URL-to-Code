


    var isMedicareEnrolledRequired = "Are you Medicare enrolled? is a required field.";
    var registerWebApiUrl = "/api/ProviderEnrollment/Register/";
    var registerConfirmTitle = "Registration Complete";
    var registerConfirmMsg = "&lt;p&gt;Your tracking number is &lt;b&gt;{0}&lt;/b&gt;.&lt;/p&gt;&lt;p style=&#39;word-wrap:break-word&#39;&gt;An email will be generated and sent to your email address &lt;b&gt;{1}&lt;/b&gt; with further instructions.&lt;/p&gt;&lt;p&gt;You can now continue with your enrollment application.&lt;/p&gt;";
    var registerConfirmEmailNotSent = "&lt;p&gt;There was an issue on sending the registration email.&lt;/p&gt;&lt;p style=&#39;word-wrap:break-word&#39;&gt;Please note the Application Tracking Number (ATN) &lt;b&gt;{0}&lt;/b&gt;.&lt;/p&gt;";
    var contactEmailAddressUpdateNotificationNotSentMsg = "&lt;p&gt;There was an issue with sending the contact email update notification.&lt;/p&gt;";
    var contactEmailAddressChangeNotificationTitle = "Contact Email Address Change Notification";
    var registrationEmailAddressUpdateNotificationNotSentMsg = "&lt;p&gt;There was an issue with sending the registration email update notification.&lt;/p&gt;";
    var registrationEmailAddressChangeNotificationTitle = "Registration Email Address Change Notification";

    var taxIdTypeRequired = "Tax ID Type  is a required field.";

    var generatePrechecklistRulesMVCUrl = "/ProviderEnrollment/GeneratePrechecklistRules/";
    var paymentInformationUrl = "/api/ProviderEnrollment/PaymentInformation/";
    var saveWebApiUrl = "/api/ProviderEnrollment/SavePartial/";

    var accountNumberMismatch = "Account number do not match";
    var emailNotMatch = "Email addresses do not match.";
    var enrollmentCreate = '';
    var providerEnrollmentPaymentFaliureDetails = '<div class="row"><div class="col-md-12">Your payment authorization request could not be processed. Please see the message below for the specific reason for this processing failure.</div><p>&nbsp</p><div id="confirmationSection"><div class="row"><div class="col-md-4 text-right"><b>Confirmation Number</b></div><div class="col-md-6 text-left"></div></div><div class="row"><div class="col-md-4 text-right"></div><div class="col-md-6 text-left"><b>Verification code is not recognized.</b></div></div></div><p>&nbsp</p><div class="col-md-12" >In order to proceed, follow these steps:<p>&nbsp</p><ul><li>Select the Close button to close this Confirmation box and return to the enrollment application.</li><br/><li>You may save information entered to this point by selecting the Finish Later button, entering the required information, and then selecting the Submit button.<br/>NOTE 1: If you DO NOT select Finish Later and select Cancel or navigate out of the application, all informartion entered will be lost and you will need to start over.<br/>NOTE 2: Attachments are not saved and will need to be re-added when you resume your application.</li><br/><li>Research and resolve the processing issue.</li><br/><li>Return to the Provider Portal enrollment page and select Resume Enrollment.</li><br/><li>Enter the credentials you supplied upon selecting Finish Later.</li><br/><li>Navigate through the application to the Attachments and Fees page and then resubmit you online bill payment.</li></ul></div></div>';
    var providerEnrollmentPaymentSuccessDetails = '<div class="row"><div class="col-md-12">Congratulations. Your payment has been processed successfully. Please print a copy of this page for your records. Also, record the confirmation Number displayed below. This number, along with the payment amount must be entered in the appropriate fields of the Provider Enrollment form.</div><p>&nbsp</p><div id="confirmationSection"><div class="row"><div class="col-md-4 text-right"><b>Confirmation Number</b></div><div class="col-md-6 text-left"><b>{0}</b></div></div><div class="row"><div class="col-md-4 text-right"></div><div class="col-md-6 text-left"><b>Credit card authorization completed successfully.</b></div></div></div><p>&nbsp</p><div class="col-md-12" >To close out of the Online Bill process and retun to the Provider Enrollment form, click the "<b>Close</b>" button.</div></div>';
    var registrationHelp = "";
    var welcomeHelp = "";

    var enrollmentCreateUrl = "/Help/HelpPage?contentId=ProviderEnrollment.HtmlBlock.Page.Help.EnrollmentCreate";
    var registrationUrl = "/Help/HelpPage?contentId=ProviderEnrollment.HtmlBlock.Page.Help.EnrollmentRegistration";
    var welcomeUrl = "/Help/HelpPage?contentId=ProviderEnrollment.HtmlBlock.Page.Help.Welcome";

    var actionAlertTitle = "Alert Confirmation";
    var buttonGenerateAuthenticationCode = "GENERATE AUTHENTICATION CODE";
    var associatedExistsForIorIGWarningMessage = "A Provider with similar details is already associated to a group. Do you want to continue with this information?";
    var cancelActionUrl = "/ProviderEnrollment/ResumeSecureEnrollment/";
    var revalidateActionUrl = "/ProviderEnrollment/Revalidate/";
    var cancelheader = "Cancel Confirmation";
    var cancelmessage = "Would you like to exit application ?";
    var ChowActionMVCUrl = "/CHOW/ChowRequestForm/";
    var createEnrollmentMvcUrl = "/ProviderEnrollment/EnrollmentCreate/";
    var deleteHeader = 'Delete Confirmation';
    var deleteMessage = 'Are you sure you want to delete this record?';
    var EIN = "EIN";
    var einMask = "00-0000000";
    var enrollmentStepsWebApiUrl = "/api/ProviderEnrollment/GetStepsForEnrollmentTypePartial/";
    var customSingle = "CustomSingle";
    var ffsOnly = "FFSonly";
    var generalInformation = "General Information";
    var generalInformationMVCUrl = "/ProviderEnrollment/GeneralInformation/";
    var homeEnrollmentMvcUrl = "/Home/Index/";
    var allowReenrollmentRequest = 'True';
    var isEnableMultiFactorAuthentication = ('False'.toLowerCase() == "true") ? true : false;
    var isMCO = "True";
    var isSecure = ('True'.toLowerCase()=="true") ? true: false;
    var individualWithInGroupEnrollmentTypeCode = "IG";
    var labelNewEnrollment = "New Enrollment";
    var loadProviderTypesWebApiUrl = '/api/ProviderEnrollment/GetProviderTypes/';
    var loadSpecialityWebApiUrl = '/api/ProviderEnrollment/GetSpecialtiesbasedEnroll/';
    var programTypeWebApiUrl = "/api/ProviderEnrollment/GetProgramTypes/";
    var messageType = "Info";
    var messageTypeError = "Error";
    var messageWarning = "Warning";
    var mcoConsentMvcUrl = "/ProviderEnrollment/MCOConsentForm/";
    var multiFactorAuthenticationMvcUrl = "/ProviderEnrollment/EnrollmentMultifactorAuthentication/";
    var newEnrollmentType = "NewEnrollment";
    var notificationTypeValue = "26";
    var providerSpecialityMvcUrl = "/ProviderEnrollment/Specialities/";
    var providerTypePartialMvcUrl = "/ProviderEnrollment/ProviderTypeInformation/";
    var resumeEnrollmentMVCUrl = "/ProviderEnrollment/EnrollmentResume/";
    var resumePartialMvcUrl = "/ProviderEnrollment/EnrollmentResume/";
    var reval = "Revalidation";
    var riskTypeWebApiUrl = "/api/ProviderEnrollment/GetProviderTypesAttributesValue/";
    var selectAValue = "select a value...";
    var specialtyInvalid = "Specialty {0} is invalid.";
    var specialtyInvalidForFFS = "This specialty is not eligible for enrollment for FFS";
    var specialtyInvalidForFFSMCO = "This specialty is not eligible for enrollment for FFS or MCO";
    var specialtyInvalidForMCO = "This specialty is not eligible for MCO enrollment";
    var specialtyInvalidNo = "The selected specialty is not allowed for enrollment";
    var SSN = "SSN";
    var ssnMask = "000-00-0000";
    var technicalErrorHeader = "Technical Issue";
    var technicalErrorMessage = "There was an issue processing your request.  Please retry your selection.";

    var enableOnlyCAQHUpdates = ('True'.toLowerCase() == "true") ? true : false;
    var enableRequireCAQHEnrollmentForProviderType = ('False'.toLowerCase() == "true") ? true : false;
    var enrollmentViaCAQHUrl = "/ProviderEnrollment/EnrollmentViaCAQH/";
    var CaqhEnrollmentRequiredPopupTitle = "CAQH Enrollment Confirmation";
    var CaqhEnrollmentRequiredMessage = "The selected Provider Type requires CAQH enrollment.\\nClick Yes to continue to CAQH registration, or No to modify your selection and proceed with the application.";
