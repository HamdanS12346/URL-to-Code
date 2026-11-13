# Probe answers

27 of 27 pages probed; 0 step errors, 0 pages ran out of time. Everything is in answers.json, one file per page in pages/, pictures in shots/.

## Q1 Modal position
- 6/11 centered, 5 touching the left edge, 0 wider than the viewport, 0 running past the right edge
- by viewport: 1920x1080 centered x6, 1272x588 left-edge x5
- window classes: "panelForm-col-6 ui-draggable" x11
- width rules: .panel-form-col-6, .panelForm-col-6 {width:75%}
  - Administration > Broadcast Message / Create Broadcast Message @1272x588: x=0 w=1145 (touches left)
  - Administration > Manage User Invitations / Add User Invitation @1272x588: x=0 w=1145 (touches left)
  - Task Management > Link Configuration / Add Link Configuration @1272x588: x=0 w=1145 (touches left)
  - Task Management > Routing Configuration / Add Routing Configuration @1272x588: x=0 w=1145 (touches left)
  - Task Management > Task List / Add Task @1272x588: x=0 w=1145 (touches left)

## Q2 Dates
- 16 date inputs: 7 prefilled (days from today: 0 x4, 2912126 x2, -1 x1), 0 filled by script (no value attribute), 0 masked
- formats: datepicker MM/dd/yyyy x16
- driven (rest -> focus -> calendar button -> day picked -> blur):
  - Administration > Broadcast Message page Effective Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "11/13/2026"
  - Administration > Broadcast Message dialog Create Broadcast Message Effective Date: "11/13/2026" -> "11/13/2026" -> "11/13/2026" -> "11/13/2026" -> "11/13/2026"
  - Administration > Manage User Invitations page From Created Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "11/13/2026"
  - Administration > Manage User Invitations dialog Add User Invitation Account Expiration Date: "" -> "__/__/____" -> "__/__/____" -> "11/13/2026" -> "11/13/2026"
  - Task Management > Routing Configuration dialog Add Routing Configuration Effective Date: "11/13/2026" -> "11/13/2026" -> "11/13/2026" -> "11/13/2026" -> "11/13/2026"

## Q3/Q8 Clickable parts inside dialogs
- 4 effects
  - Administration > Broadcast Message / dialog Create Broadcast Message: create-new 
  - Administration > Manage User Invitations / dialog Add User Invitation: radio Internal Registration = No shows [Generic Identifier]
  - Task Management > Task List / dialog Add Task: dropdown TaskTypeCodeList = Dental Claim
  - Task Management > Task List / dialog Add Task: dropdown TaskTypeCodeList = Capitation Classification

## Q4 Search with nothing typed
- 26 pages with Search: 3 list rows, 0 show an empty grid, 20 show validation instead
- no-match search: validation x3, empty grid, no message x1
- loading indicator: none seen x12, k-loading-mask x11, #loadingDialog x3

## Q5 Validation on the page
- 23 validation states seen on Search; 4 distinct summary shapes
  - Administration > Broadcast Message (search): msg-inline-close panel-icon clickable icons [fa-solid fa-xmark] ""; field messages: -; its X hides it: true
  - Administration > FAQ's (search): msg-inline-close panel-icon clickable icons [fa-solid fa-xmark] ""; field messages: below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error; its X hides it: true
  - Administration > Manage Help (search): no summary icons [] ""; field messages: below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error; its X hides it: null
  - Administration > Manage Labels (search): no summary icons [] ""; field messages: below k-form-error k-invalid-msg field-validation-error; its X hides it: null
  - Administration > Manage Menu Items (search): no summary icons [] ""; field messages: below k-form-error k-invalid-msg field-validation-error; its X hides it: null

## Q6 Chevrons / collapsible panels
- 27 toggles; durations 400ms x26, 450ms x1; icon swaps fa-angle-up -> fa-angle-down panel-collapsed x26, fa-angle-up -> fa-angle-down subpanel-collapsed x1
- panels that change by themselves on Search: none

## Q7 Conditional parts on the page
- 29 effects
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Administration cascades ApplicationList
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Auth Determination cascades ApplicationList
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Claims Management cascades ApplicationList
  - Administration > Manage IOC Settings: dropdown TenantModuleList = Core cascades ApplicationList
  - Administration > Manage Menus: dropdown ReleaseStatusList = Test cascades SecurityRightDropdown, DisplaySizeDropDown
  - Administration > Manage Module Events: dropdown Modules = Administration cascades EventList
  - Administration > Manage Module Events: dropdown Modules = AS24OCT29Module cascades EventList
  - Administration > Manage Module Events: dropdown Modules = AS3016IntModule0904 cascades EventList
  - Administration > Manage Module Events: dropdown EventList = AbsentParentAdded cascades EventList
  - Administration > Manage Services: dropdown Status = Inactive cascades SecurityRightDropdown
  - Administration > Manage Services: dropdown SearchReleaseStatusList = Pending cascades LabelServiceDropdown
  - Administration > Manage Subscriptions: dropdown Modules = Administration cascades EventList

## Q9 Save with nothing filled (POST blocked)
- 5 dialogs: 5 show validation, 0 tried to post anyway (validated on the server only)
  - Administration > Broadcast Message / Create Broadcast Message: msg-inline-close panel-icon clickable k-form-error k-invalid-msg field-validation-error; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, null k-form-error k-invalid-msg field-validation-error
  - Administration > Manage User Invitations / Add User Invitation: msg-inline-close panel-icon clickable; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - Task Management > Link Configuration / Add Link Configuration: msg-inline-close panel-icon clickable k-form-error k-invalid-msg field-validation-error k-form-error k-invalid-msg field-validation-error; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - Task Management > Routing Configuration / Add Routing Configuration: msg-inline-close panel-icon clickable k-form-error k-invalid-msg field-validation-error k-form-error k-invalid-msg field-validation-error; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error
  - Task Management > Task List / Add Task: msg-inline-close panel-icon clickable k-form-error k-invalid-msg field-validation-error k-form-error k-invalid-msg field-validation-error; field messages below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error, below k-form-error k-invalid-msg field-validation-error

## Q10 Closing a dialog
- after an edit: cancel: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [Stay/Leave], Stay keeps it open: true, Leave closes it: true x4, x: confirm "Form data has changed and has not been saved. Are you sure you want to leave wit" [Stay/Leave], Stay keeps it open: true, Leave closes it: true x3, x: closes x1
- without an edit: x: closes x7, cancel: closes x5, cancel: could not reopen x1, cancel: no such button x1

## Q11 Grid filter
- 8 grids after Search, 6 filter popups opened; filterable: {"extra":false,"operators":{"string":{"eq":"Equal To","contains":"Contains","endswith":"Ends With","startswith":"Starts With"}}} x7, false x1; 2 distinct popup shapes
  - Administration > Broadcast Message (Message Title): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage HTML Blocks (Content ID): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage Module Events (Module): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage Security Functions (Function Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1
  - Administration > Manage Security Rights (Right Name): fields dropdownlist,text; buttons Filter/Clear; chevrons 1

## Q12 Vocabulary
- buttons the kit does not map: none
- widget roles the kit does not rebuild: autocomplete x5, multiselect x2, maskedtextbox x2, listbox x1, megagrid x1, tabstrip x1, listview x1
- pages with tabs: 1

## Q13 Layout and menus per viewport
- 1920x1080 (Administration > Broadcast Message): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Broadcast Message): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x500 (85% of the height, fits: true, content scrolls: true)
- 1920x1080 (Administration > FAQ's): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > FAQ's): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Application Settings): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Application Settings): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Help): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Help): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage HTML Blocks): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage HTML Blocks): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Images): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Images): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage IOC Settings): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage IOC Settings): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Labels): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Labels): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Menu Items): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Menu Items): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Menus): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Menus): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Messages): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Messages): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Module Events): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Module Events): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Security Functions): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Security Functions): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Security Rights): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Security Rights): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Security Roles): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Security Roles): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Services): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Services): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage Subscriptions): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Subscriptions): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Administration > Manage User Invitations): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage User Invitations): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x500 (85% of the height, fits: true, content scrolls: true)
- 1920x1080 (Administration > Manage Users): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Administration > Manage Users): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Task Management > Bulk Recall): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Bulk Recall): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Task Management > Dashboard): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Dashboard): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Task Management > Link Configuration): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Link Configuration): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x491 (84% of the height, fits: true, content scrolls: false)
- 1920x1080 (Task Management > Manage User Association): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Manage User Association): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Task Management > Manage User Schedule): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Manage User Schedule): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- 1920x1080 (Task Management > Routing Configuration): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Routing Configuration): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x385 (65% of the height, fits: true, content scrolls: false)
- 1920x1080 (Task Management > Task List): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Task List): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width; dialog x=0 y=20 1145x500 (85% of the height, fits: true, content scrolls: true)
- 1920x1080 (Task Management > Task Template): layout desktop, isPhone() false; header 62px; hamburgers shown: 2/5; nav links: 6; page fits the width
- 1272x588 (Task Management > Task Template): layout small (<=1280), isPhone() true; header 62px; hamburgers shown: 3/5; nav links: 0; page fits the width
- menu fly-outs measured: 40; with a scrollbar: 0; cut off by the window: 0; overflow values seen: visible (inline: yes) x40
  - (none)
- side menus that did not open: none
