# Probe answers

155 of 161 pages probed (6 failed: Drug Rebate > ROSI/PQAS List, Provider Enrollment > Workflow Applications, Provider Enrollment > Workflow Configuration, Provider Enrollment > Workflow Dashboard, Provider Enrollment > Workflow Tasks); 21 step errors, 0 pages ran out of time. Everything is in answers.json, one file per page in pages/, pictures in shots/.

## Q1 Modal position
- 13/23 centered, 10 touching the left edge, 0 wider than the viewport, 0 running past the right edge
- by viewport: 1920x1080 centered x13, 1280x720 left-edge x10
- note: this is why some reference shots look "centered" while the live portal (and the 1280x720 shots) show left-edge/touching-left behavior
  - example: `file-transfer-services-ftp-server-credentials--create1.png` (1920x1080) centered vs `file-transfer-services-ftp-server-credentials--create1-1280x720.png` (1280x720) touching left
  - example: `file-transfer-services-file-transfer-configuration--create1.png` (1920x1080) centered vs `file-transfer-services-file-transfer-configuration--create1-1280x720.png` (1280x720) touching left
  - kit runtime fix: use layout viewport (`document.documentElement.clientWidth/Height`) for centering math (was `window.innerWidth/innerHeight`) so rebuild matches Kendo `center()` at 1280x720
- window classes: "panelForm-col-6 ui-draggable" x17, "panelForm-col-5 ui-draggable" x4, "panelForm-col-3 ui-draggable" x2
- width rules: .panel-form-col-6, .panelForm-col-6 {width:75%} | .panel-form-col-5, .panelForm-col-5 {width:62.5%} | .panel-form-col-3, .panelForm-col-3 {width:37.5%}
  - Administration > Broadcast Message / Create Broadcast Message @1280x720: x=0 w=1152 (touches left)
  - Administration > Manage User Invitations / Add User Invitation @1280x720: x=0 w=1152 (touches left)
  - Alert Notification > Event Configuration / Add Event @1280x720: x=0 w=1152 (touches left)
  - Drug Rebate > Fund Codes / Edit Fund Code @1280x720: x=0 w=1152 (touches left)
  - File Transfer Services > File Transfer Configuration / Add File Transfer Configuration @1280x720: x=0 w=1152 (touches left)

## Q2 Dates
- 146 date inputs: 26 prefilled (days from today: 0 x8, -1 x8, 2912126 x3, -46337 x3, 1 x1, 17 x1), 5 filled by script (no value attribute), 0 masked
- formats: datepicker MM/dd/yyyy x137, datetimepicker M/d/yyyy h:mm tt x5, datetimepicker MM/dd/yyyy h:mm tt x2, timepicker t x2
- driven (rest -> focus -> calendar button -> day picked -> blur):
  - Administration > Broadcast Message page Effective Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "11/13/2026"
  - Administration > Broadcast Message dialog Create Broadcast Message Effective Date: "11/12/2026" -> "11/12/2026" -> "11/12/2026" -> "11/13/2026" -> "null"
  - Administration > Manage User Invitations page From Created Date: "" -> "__/__/____" -> "__/__/____" -> "11/01/2026" -> "11/01/2026"
  - Administration > Manage User Invitations dialog Add User Invitation Account Expiration Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "null"
  - Alert Notification > Tracking page Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "11/13/2026"

## Q3/Q8 Clickable parts inside dialogs
- 5 effects
  - Alert Notification > Event Configuration / dialog Add Event: radio Run Schedule = Run Weekly shows [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
  - Alert Notification > Event Configuration / dialog Add Event: radio Run Schedule = Run Monthly shows [Run On First Day Month, Run On Last Day Month, Run Day Of Month, RunDayOfMonthList, RunDayOfMonth_ID, RunDayOfMonth_Name, RunDayOfMonth_DisplayFormat] hides [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
  - File Transfer Services > File Transfer Configuration / dialog Add File Transfer Configuration: radio Run Schedule = Run Weekly shows [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
  - File Transfer Services > File Transfer Configuration / dialog Add File Transfer Configuration: radio Run Schedule = Run Monthly shows [Run On First Day Month, Run On Last Day Month, Run On This Day Month, RunOnThisDayList, RunOnThisDay_ID, RunOnThisDay_Name, RunOnThisDay_DisplayFormat] hides [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
  - File Transfer Services > File Transfer Configuration / dialog Add File Transfer Configuration: create-new  shows inline [appSetting, Destination Protocol, DestinationProtocolList, DestinationProtocol_ID, DestinationProtocol_Name, DestinationProtocol_DisplayFormat, Server, Server, Destination Type, DestinationTypeList]

## Q4 Search with nothing typed
- 133 pages with Search: 10 list rows, 0 show an empty grid, 108 show validation instead
- no-match search: validation x50, no grid x16, empty grid, no message x13
- loading indicator: none seen x70, #loadingDialog x47, k-loading-mask x16

## Q5 Validation on the page
- 158 validation states seen on Search; 8 distinct summary shapes
  - Administration > Broadcast Message (search): msg-inline-close panel-icon clickable icons [fa-solid fa-xmark] ""; field messages: -; its X hides it: true
  - Administration > FAQ's (search): msg-inline-close panel-icon clickable icons [fa-solid fa-xmark] ""; field messages: below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error; its X hides it: true
  - Administration > Manage Application Settings (search): k-loading-text icons [] "Loading..."; field messages: -; its X hides it: null
  - Administration > Manage Help (search): no summary icons [] ""; field messages: below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error; its X hides it: null
  - Administration > Manage Labels (search): no summary icons [] ""; field messages: below k-form-error k-invalid-msg field-validation-error; its X hides it: null

## Q6 Chevrons / collapsible panels
- 144 toggles; durations 0ms x144; icon swaps fa-angle-up -> fa-angle-down panel-collapsed x124, fa-square-minus -> fa-square-plus x8, fa-angle-up -> fa-angle-down subpanel-collapsed x8, fa-angle-down panel-collapsed -> fa-angle-up x2, fa-square-plus -> fa-square-minus x1
- panels that change by themselves on Search: none

## Q7 Conditional parts on the page
- 102 effects
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Administration cascades ApplicationList
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Auth Determination cascades ApplicationList
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Claims Management cascades ApplicationList
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Core cascades ApplicationList
  - Administration > Manage Module Events: dropdown Modules = Administration cascades EventList
  - Administration > Manage Module Events: dropdown Modules = AS24OCT29Module cascades EventList
  - Administration > Manage Module Events: dropdown Modules = AS3016IntModule0904 cascades EventList
  - Administration > Manage Module Events: dropdown EventList = AbsentParentAdded cascades EventList
  - Administration > Manage Services: dropdown Status = Active cascades LabelServiceDropdown
  - Administration > Manage Services: dropdown TenantModuleList = Claims Management cascades SecurityRightDropdown
  - Administration > Manage Services: dropdown TenantModuleList = Core cascades SearchModuleList
  - Claims Management > Search Claims: dropdown ClaimIdentifiersList = ICN shows [ICN]

## Q9 Save with nothing filled (POST blocked)
- 4 dialogs: 4 show validation, 0 tried to post anyway (validated on the server only)
  - Alert Notification > Event Configuration / Add Event: msg-inline-close panel-icon clickable; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - File Transfer Services > File Transfer Configuration / Add File Transfer Configuration: msg-inline-close panel-icon clickable; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - File Transfer Services > FTP Server Credentials / Add FTP Server Credentials: no summary; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - Task Management > Link Configuration / Add Link Configuration: msg-inline-close panel-icon clickable k-form-error k-invalid-msg field-validation-error k-form-error k-invalid-msg field-validation-error; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error

## Q10 Closing a dialog
- after an edit: x: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [No/Yes] x4, cancel: closes x3, x: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [Stay/Leave] x2, cancel: no such button x1, cancel: stays open x1, cancel: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [Stay/Leave] x1
- without an edit: x: closes x13, x: no such button x4, cancel: no such button x4

## Q11 Grid filter
- 37 grids after Search, 15 filter popups opened; filterable: {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","endswith":"Ends With","startswith":"Starts With"}}} x15, false x13, {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","endswith":"Ends With","startswith":"Starts With"},"date":{"eq":"Equal To","gte":"Is After Or Equal To","lte":"Is Before Or Equal To"}}} x2, {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","startswith":"Starts With","endswith":"Ends With"},"date":{"eq":"Equal To","gte":"Greater Than","lte":"Less Than"}}} x1, {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","endswith":"Ends With","startswith":"Starts With"},"number":{"eq":"Equal To","gte":"Is Greater Than Or Equal To","lte":"Is Less Than Or Equal To"},"date":{"eq":"Equal To","gte":"Is After Or Equal To","lte":"Is Before Or Equal To"}}} x1, {"extra":false,"operators":{"string":{"contains":"Contains","startswith":"Starts With","endswith":"Ends With"}}} x1; 2 distinct popup shapes
  - Administration > Broadcast Message (Message Title): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage HTML Blocks (Content ID): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage Module Events (Module): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage Security Functions (Function Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage Security Rights (Right Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1

## Q12 Vocabulary
- buttons the kit does not map: "Previous" x4, "View" x2, "View Catalog" x2, "Friday, November 13, 2026" x2, "Next" x2, "Start" x2, "Standard" x2, "Label" x2, "Primary" x2, "Save & Continue" x2, "Move All To" x2, "Edit" x1, "Invalidate" x1, "List" x1, "Today" x1, "November 2026" x1, "Day" x1, "Week" x1, "Month" x1, "ST - PG Mapping" x1, "Register" x1, "Resume" x1, "Upload Files" x1, "Run Process" x1, "Processing Icon" x1
- widget roles the kit does not rebuild: maskedtextbox x31, autocomplete x27, multiselect x9, tabstrip x8, listview x4, upload x3, megagrid x3, listbox x2, calendar x2, treelist x2, toolbar x2, chart x1, scheduler x1, buttongroup x1, togglebutton x1, timeline x1, switch x1, progressbar x1, wizard x1, stepper x1, treeview x1
- pages with tabs: 8
