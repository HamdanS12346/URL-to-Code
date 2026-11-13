# Probe answers

7 of 7 pages probed; 1 step errors, 0 pages ran out of time. Everything is in answers.json, one file per page in pages/, pictures in shots/.

## Q1 Modal position
- 9/13 centered, 4 touching the left edge, 0 wider than the viewport, 0 running past the right edge
- by viewport: 1920x1080 centered x9, 1272x588 left-edge x4
- window classes: "panelForm-col-6 ui-draggable" x6, "panelForm-col-5 ui-draggable" x4, "panelForm-col-4 ui-draggable" x3
- width rules: .panel-form-col-5, .panelForm-col-5 {width:62.5%} | .panel-form-col-4, .panelForm-col-4 {width:50%} | .panel-form-col-6, .panelForm-col-6 {width:75%}
  - Alert Notification > Event Configuration / Add Event @1272x588: x=0 w=1145 (touches left)
  - Alert Notification > Event Subscription / Add Event Subscription @1272x588: x=0 w=1145 (touches left)
  - File Transfer Services > File Transfer Configuration / Add File Transfer Configuration @1272x588: x=0 w=1145 (touches left)
  - File Transfer Services > FTP Server Credentials / Add FTP Server Credentials @1272x588: x=0 w=1145 (touches left)

## Q2 Dates
- 5 date inputs: 2 prefilled (days from today: 0 x2, -46337 x2), 0 filled by script (no value attribute), 0 masked
- formats: datepicker MM/dd/yyyy x3, datetimepicker M/d/yyyy h:mm tt x2
- driven (rest -> focus -> calendar button -> day picked -> blur):
  - Alert Notification > Tracking page Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "11/13/2026"
  - File Transfer Services > File Transfer Tracking page From Date: "" -> "" -> "" -> "11/13/2026 12:00 AM" -> "11/13/2026 12:00 AM"

## Q3/Q8 Clickable parts inside dialogs
- 4 effects
  - Alert Notification > Event Configuration / dialog Add Event: radio Run Schedule = Run Weekly shows [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
  - Alert Notification > Event Configuration / dialog Add Event: radio Run Schedule = Run Monthly shows [Run On First Day Month, Run On Last Day Month, Run Day Of Month, RunDayOfMonthList, RunDayOfMonth_ID, RunDayOfMonth_Name, RunDayOfMonth_DisplayFormat] hides [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
  - Alert Notification > Event Subscription / dialog Add Event Subscription: checkbox Send SMS toggled shows [SMS Address]
  - File Transfer Services > File Transfer Configuration / dialog Add File Transfer Configuration: create-new  shows inline [appSetting, Destination Protocol, DestinationProtocolList, DestinationProtocol_ID, DestinationProtocol_Name, DestinationProtocol_DisplayFormat, Server, Server, Destination Type, DestinationTypeList]

## Q4 Search with nothing typed
- 7 pages with Search: 6 list rows, 0 show an empty grid, 1 show validation instead
- no-match search: no grid x4, empty grid, no message x3
- loading indicator: #loadingDialog x5, k-loading-mask x2

## Q5 Validation on the page
- 1 validation states seen on Search; 1 distinct summary shapes
  - File Transfer Services > File Transfer Tracking (search): k-loading-text icons [] "Loading..."; field messages: -; its X hides it: null

## Q6 Chevrons / collapsible panels
- 7 toggles; durations 400ms x7; icon swaps fa-angle-up -> fa-angle-down panel-collapsed x7
- panels that change by themselves on Search: none

## Q7 Conditional parts on the page
- 0 effects
  - (none)

## Q9 Save with nothing filled (POST blocked)
- 4 dialogs: 4 show validation, 0 tried to post anyway (validated on the server only)
  - Alert Notification > Event Configuration / Add Event: msg-inline-close panel-icon clickable; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - Alert Notification > Event Subscription / Add Event Subscription: msg-inline-close panel-icon clickable k-form-error k-invalid-msg field-validation-error k-form-error k-invalid-msg field-validation-error; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - File Transfer Services > File Transfer Configuration / Add File Transfer Configuration: msg-inline-close panel-icon clickable; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - File Transfer Services > FTP Server Credentials / Add FTP Server Credentials: no summary; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error

## Q10 Closing a dialog
- after an edit: cancel: closes x5, x: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [No/Yes], No keeps it open: true, Yes closes it: true x4, x: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [No/Yes], No keeps it open: true, Yes closes it: false x1
- without an edit: x: closes x8, cancel: closes x4, cancel: could not reopen x3, cancel: no such button x1

## Q11 Grid filter
- 7 grids after Search, 5 filter popups opened; filterable: {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","endswith":"Ends With","startswith":"Starts With"}}} x3, false x2, {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","startswith":"Starts With","endswith":"Ends With"},"date":{"eq":"Equal To","gte":"Greater Than","lte":"Less Than"}}} x1, {"extra":false,"operators":{"string":{"contains":"Contains","startswith":"Starts With","endswith":"Ends With"}}} x1; 1 distinct popup shapes
  - Alert Notification > Event Configuration (Event Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Alert Notification > Event Subscription (Event Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Alert Notification > Subscriber Configuration (Email Address): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Alert Notification > Tracking (Event Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - File Transfer Services > FTP Server Credentials (Server Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1

## Q12 Vocabulary
- buttons the kit does not map: "Edit" x3, "Invalidate" x1
- widget roles the kit does not rebuild: autocomplete x2, maskedtextbox x2
- pages with tabs: 0

## Q13 Layout and menus per viewport
- 1920x1080 (Alert Notification > Event Configuration): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Alert Notification > Event Configuration): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x500 (85% of the height, fits: true, content scrolls: true)
- 1920x1080 (Alert Notification > Event Subscription): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Alert Notification > Event Subscription): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x448 (76% of the height, fits: true, content scrolls: false)
- 1920x1080 (Alert Notification > Subscriber Configuration): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Alert Notification > Subscriber Configuration): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x258 (44% of the height, fits: true, content scrolls: false)
- 1920x1080 (Alert Notification > Tracking): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Alert Notification > Tracking): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (File Transfer Services > File Transfer Configuration): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (File Transfer Services > File Transfer Configuration): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x500 (85% of the height, fits: true, content scrolls: true)
- 1920x1080 (File Transfer Services > File Transfer Tracking): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (File Transfer Services > File Transfer Tracking): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (File Transfer Services > FTP Server Credentials): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (File Transfer Services > FTP Server Credentials): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x500 (85% of the height, fits: true, content scrolls: true)
- menu fly-outs measured: 40; with a scrollbar: 0; cut off by the window: 0; overflow values seen: visible (inline: yes) x40
  - (none)
- side menus that did not open: none
