

    var caqhDataNotFound = "CAQH data not found or not authorized for the details provided. Please verify the information or contact CAQH for assistance.";
    var caqhProviderDetailsNotFound = "Your primary CAQH details (such as Practice Location, Provider Type, or Specialty) have been updated since your last registration. To continue, you must create a new CAQH registration using your updated information.";;
    var caqhUpdateIncomplete = "Unable to refresh application at this time. Please try again later.";
    var caqhProviderNotFoundTitle = "CAQH Provider Not Found";
    var caqhUpdateIncompleteTitle = "CAQH Update Incomplete";   
    var buttonResumeText = "Resume";
    var resumeWebApiUrl = "/api/ProviderEnrollment/Resume/";
    var updateCAQHWebApiUrl = "/api/ProviderEnrollment/UpdateCAQHEnrollment/";
    var createEnrollmentMvcUrl = "/ProviderEnrollment/EnrollmentCreate/";
    var createSecureEnrollmentMvcUrl = "/ProviderEnrollment/CreateSecureEnrollment/";
    var submitEnrollmentMvcUrl = "/ProviderEnrollment/Submit/";

    var actionAlertTitle = "Alert Confirmation";
    var forgetPasswordMvcUrl = "/ProviderEnrollment/ForgotPassword/";
    var generateOTPHeader = 'Generate One Time Password';
    var globalNo = "No";
    var globalYes = "Yes";
    var resetPasswordHeader = 'Reset Password';
    var resetText = "Clear";
    var saveText = "Save";

    var resetPasswordWebApiUrl = '/api/ProviderEnrollment/ResetPassword/';
    var resetPasswordMessage = "Your password has been successfully reset.";
    var resetPasswordMessageTitle = " Reset Password";
    var  rtpStatusType = "Return To Provider";

    var isEnableMultiFactorAuthentication = ('False'.toLocaleLowerCase() == "true") ? true : false;
    var isSecure = ('True'.toLocaleLowerCase() == "true") ? true : false;
    var multiFactorAuthenticationMvcUrl = "/ProviderEnrollment/EnrollmentMultifactorAuthentication/";
    var buttonGenerateAuthenticationCode = "GENERATE AUTHENTICATION CODE";
    var notificationTypeValue = "22";
    var enrollmentCreateActionName = "EnrollmentCreate";
    var enablePasswordInputFlag = "True";
    var isEnableRefreshCaqh = ('True'.toLocaleLowerCase() == "true") ? true : false;
    var isSetDefaultResumeCAQH = ('True'.toLocaleLowerCase() == "true") ? true : false;
    var isRevalidate = ('False'.toLocaleLowerCase() == "true") ? true : false;
    var resumeCAQHEnrollmentRequiredMessage = "Do you want to resume CAQH enrollment? is a required field.";
