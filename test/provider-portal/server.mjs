// A small "Provider portal" for npm run smoke:provider: the client's layout (fixed header, side menu behind a hamburger,
// module tab + title bar, Search Criteria panel, ? help tooltips, Kendo dropdowns / number box / date-time pickers, a grid
// that Search fills by POST, Create New dialogs loaded by AJAX, a nested Create New, a row that opens an edit dialog),
// built on real Kendo UI (kendo-ui-core) plus pro.js. Login through the side menu, like the client's.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const NM = path.join(ROOT, 'node_modules');
const STATIC = {
  '/js/jquery.min.js': path.join(NM, 'jquery', 'dist', 'jquery.min.js'),
  '/js/kendo.ui.core.min.js': path.join(NM, 'kendo-ui-core', 'umd', 'kendo.ui.core.min.js'),
  '/css/kendo.css': path.join(NM, '@progress', 'kendo-theme-default', 'dist', 'all.css'),
  '/js/pro.js': fileURLToPath(new URL('./pro.js', import.meta.url)),
};
const CSS = `
body{margin:0;font:14px Arial,"Helvetica Neue",Helvetica,sans-serif;color:#333;background:#fff;padding-top:62px}
#pageHeader{position:fixed;top:0;left:0;right:0;height:62px;background:#2b3a44;z-index:1000;transition:transform .2s linear}
#pageHeader.headroom--unpinned{transform:translateY(-100%)}
#pageBanner{display:flex;align-items:center;height:62px}
#pageBannerLogo{margin-left:50px;color:#fff;font:bold 28px Arial}
#pageBannerTitle{margin-left:40px;text-align:center}.system-name{color:#2196f3;font:bold 20px Arial}.app-title{color:#fff;text-transform:uppercase}
.aag-menu{margin-left:auto;display:flex;gap:30px;list-style:none;padding:0 40px 0 0}.aag-menu a{color:#fff;font-size:12px;text-decoration:none;text-transform:uppercase}
.mobile-nav{display:none}@media (max-width:1280px){.desktop-nav{display:none}.mobile-nav{display:block}}
.hamburger{width:68px;height:62px;background:#2196f3;display:flex;align-items:center;justify-content:center;cursor:pointer}
.fa-solid{display:inline-block;width:14px;height:14px;background:currentColor;vertical-align:middle}
.fa-bars{width:30px;height:24px;color:#000}
.display-none{display:none!important}.display-flex{display:flex!important}
.disabled-backdrop{position:fixed;inset:0;background:#000;opacity:.3;z-index:1001}
#mainMenuContainer{position:fixed;top:0;right:0;width:288px;height:100%;background:#fff;z-index:1002;padding-top:60px;box-sizing:border-box;flex-direction:column}
#mainMenuContainer .fa-xmark{position:absolute;left:16px;top:20px;color:#2b3a44}
#mainMenuItemContainer{display:flex;height:82vh}.menu .k-menu{background:#2b3a44;border:0;line-height:32px}.menu .k-menu-link{color:#fff;text-transform:uppercase;padding:0 12px}.menu .k-menu-group{background:#2b3a44}.menu .k-menu-group a{color:#fff;padding:8px 14px;display:block}
.k-menu-scroll-wrapper{width:100%!important}#mainMenu{border:0;width:100%}#mainMenu .k-menu-link,.child-menu .k-menu-link{font-weight:bold;color:#1e2a33}
#moduleContentBar{display:flex;height:32px;align-items:center;background:#00f0b0}
.module-name{background:#2b3a44;color:#fff;height:32px;line-height:32px;padding:0 6px 0 36px;text-transform:uppercase}
#moduleContentBar h1{margin:0 0 0 10px;font:italic bold 14px Arial}
#mainContent{padding:16px 30px}
.page-toolbar{display:flex;justify-content:flex-end;gap:16px;align-items:center;border-bottom:1px solid #ccc;padding-bottom:8px;margin-bottom:24px}
.btn{border:1px solid #0062ff;color:#0062ff;background:#fff;padding:8px 30px;font-size:16px;cursor:pointer}.btn-primary{background:#268fcb;color:#fff;border-color:#000}
.content-panel-container{border:1px solid #e5e5e5;border-radius:6px;box-shadow:0 2px 6px #0002;margin-bottom:24px}
.content-panel-hdr{display:flex;justify-content:space-between;padding:10px 24px;background:#f9f9f9;font:bold 24px Arial}
.content-panel-bdy{padding:20px 10px 10px}.editor-row{display:flex;gap:16px;margin-bottom:16px}.editor-col{flex:1}
.editor-label{display:flex;font-weight:bold;margin-bottom:4px}.editor-label label{flex:1}
.editor-icon{width:13px;height:13px;border-radius:50%;background:#2a7de1;color:#fff;cursor:pointer}
.editor-req-field{color:#c0c;width:10px}.buttons{display:flex;gap:12px}.buttons .spacer{flex:1}
.k-textbox,.k-picker,.k-numerictextbox,.k-datepicker{width:100%}
.k-tooltip{background:#007cad;color:#fff;border-color:#007cad}
.k-window{background:#fff;border:1px solid #ced4da;border-radius:10px;box-shadow:10px 10px 23px -4px rgba(0,0,0,.5)}
.k-window-titlebar{display:flex;justify-content:space-between;padding:8px 12px;font-weight:bold}
.k-window-content{padding:10px 16px;max-height:600px;overflow:auto}
.k-overlay{position:fixed;inset:0;background:#3d3d3d;opacity:.5}
#pageFooter{background:#2b3a44;color:#fff;padding:24px;text-align:center;margin-top:40px}
.field-validation-error{color:#c00;font-size:12px}`;

const MODULES = [
  ['Administration', [['Broadcast Message', '/BroadcastMessage/BroadcastMessageSearch'], ["FAQ's", '/FAQMaintenance/FAQMaintenanceSearch']]],
  ['File Transfer Services', [['File Transfer Configuration', '/FileTransfer/SearchSourceLocations'], ['File Transfer Tracking', '/FileTransfer/SearchFileTransferTracking'], ['FTP Server Credentials', '/FileTransfer/SearchFTPServerCredentials']]],
  ['Claims Management', [['Search Claims', '/ClaimsManagement/SearchClaims']]],
];
const field = (id, label, input, help = label, req = false) => `<div class="editor-col" id="${id}_parent"><div class="editor-label">${req ? `<span class="clickable editor-req-field fa-solid fa-asterisk" title="${label} is a required field." data-role="tooltip"></span>` : ''}<label for="${id}" id="${id}Label">${label}</label><span class="clickable editor-icon fa-solid fa-circle-question" id="${id}Help" role="img" title="${help}" data-role="tooltip"></span></div><div class="editor-field">${input}</div></div>`;
const text = (id, name, extra = '') => `<span class="k-input k-textbox"><input class="k-input-inner" id="${id}" name="${name}" ${extra}></span>`;

const layout = (loggedIn, { title, module, body = '', bodyClass = '', help = false }) => `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><title>${title || 'Home'}</title>
<link rel="stylesheet" href="/css/kendo.css"><style>${CSS}</style>
<script src="/js/jquery.min.js"></script><script src="/js/kendo.ui.core.min.js"></script><script src="/js/pro.js"></script></head>
<body class="${bodyClass}">
<div id="pageHeader" class="header headroom headroom--top"${module ? ' style="border-bottom: 0px;"' : ''}><header id="pageBanner" role="banner">
<div id="pageBannerLogo"><a href="/Home/MyHome/"><span title="Client Logo" data-role="tooltip" id="logo">gainwell</span></a></div>
<div id="pageBannerTitle"><div class="system-name">Medicaid Management Solutions</div><div class="app-title">Final Test</div></div>
${loggedIn ? '<ul class="aag-menu"><li><a href="javascript:void(0)">Messages</a></li><li><a href="/Home/MyAccount">My Account</a></li><li><a href="/logout">Logout</a></li></ul>' : '<div style="margin-left:auto"></div>'}
<div class="mobile-nav"><div id="pageBannerMenuMobile"><nav aria-label="Hamburger Mobile Menu"><div class="hamburger"><i class="fa-solid fa-bars clickable" onclick="openMainMenu()" tabindex="0" aria-label="Main Menu" role="button"></i></div></nav></div></div>
<div id="pageBannerMenu" class="desktop-nav"><nav aria-label="Hamburger Menu"><div class="hamburger"><i class="fa-solid fa-bars clickable" onclick="openMainMenu()" tabindex="0" aria-label="Main Menu" role="button"></i></div></nav></div>
</header></div>
<input class="editor-control" id="menuSearch" type="hidden" style="position:absolute;top:70px;left:0">
<div id="mainMenuContainer" class="display-none"><i id="mainMenuClose" class="fa-solid fa-xmark clickable" onclick="closeMainMenu()" role="button" aria-label="Close"></i>
${loggedIn ? `<div class="mobile-aag"><div class="content-subpanel-container collapsedPanel"><div class="content-subpanel-hdr">Quick Links</div><div class="content-subpanel-hdr-tools"><div class="content-ordered-panel-hdr-tools"><div class="panel-icon clickable"><div id="mobileMenuIcon" class="fa-solid fa-angle-down subpanel-collapsed" title="Expand" tabindex="0"></div></div></div></div><div class="content-subpanel-bdy" style="display:none"><ul class="aag-menu-quick"><li><a href="javascript:void(0)">Messages</a></li><li><a href="/Home/MyAccount">My Account</a></li></ul></div></div></div><div id="mainMenuItemContainer"><ul id="mainMenu">${MODULES.map(([m, items]) => `<li>&nbsp;${m}<ul class="child-menu">${items.map(([l, h]) => `<li><a href="${h}">&nbsp;${l}</a></li>`).join('')}</ul></li>`).join('')}</ul></div>`
    : '<form class="login" method="post" action="/login" style="padding:24px"><label>User name <input name="user" type="text"></label><br><label>Password <input name="pass" type="password"></label><br><button type="submit">Log In</button></form>'}
</div>
${module ? `<div id="moduleContentBar"><div class="module-name">${module}</div><div class="menu" role="navigation"><ul id="activeModuleMenu"><li><a href="/Dashboard">${module} <i class="fa-solid fa-chevron-down"></i></a><ul class="k-menu-group">${(MODULES.find(([m]) => m === module)?.[1] || []).map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></li></ul></div><h1>${title}</h1></div>` : ''}
<div id="mcbRowBorder">${help ? '<div id="mcbHelpIcon" class="help-icon-container"><span class="fa-stack clickable" onclick="displayPageLevelHelp()" role="button" tabindex="0" aria-label="Help" title="Help" data-role="tooltip"><i class="fa-solid fa-book-open help-icon-stack-top"></i></span></div>' : ''}</div>
<div id="mainContent">${body}</div>
<div id="pageFooter"><div id="baseFooter"><span>© 2026 Test Portal. All rights reserved.</span></div></div>
<script>
// the client's hp.ua3.core.mainMenu.js (probe 2, Q22): a class swap and a backdrop appended to <body>, no fade;
// only the close icon closes it (Escape and a click on the backdrop do not). The hidden input that turns into a text
// field while the menu is open is the stray element that once fooled the capture into thinking it was part of the menu.
function openMainMenu(){ $('#mainMenuContainer').removeClass('display-none').addClass('display-flex'); $('#menuSearch').attr('type', 'text'); $('body').append("<div class='disabled-backdrop'></div>"); }
function closeMainMenu(){ $('#mainMenuContainer').removeClass('display-flex').addClass('display-none'); $('#menuSearch').attr('type', 'hidden'); $('.disabled-backdrop').remove(); }
$(document).on('click', '#mainMenu .child-menu a', closeMainMenu);
// the portal's own small-screen switch (hp.ua3.core): below 1280 px wide the dialog code takes its phone branch (see pro.js Window.open)
isPhone = function () {
  if ((window.matchMedia("(max-width: 1280px)").matches) && (window.matchMedia("(orientation: portrait)"))) {
    return true;
  } else {
    return false;
  }
};
// the portal's core helpers (hp.ua3.core.*): a dialog is a Kendo window on the element id = the panel id, its content by AJAX
var trackingViewUrl = '/FileTransfer/TrackingView';
var PANEL_TITLES = { FileTransferTrackingViewPopup: 'View File Transfer Tracking' };
function openModalOverlay(panelId, url, cssClass){
  var el = $('#' + panelId); if (!el.length) el = $('<div id="' + panelId + '"></div>').appendTo('body');
  var w = el.data('kendoWindow') || el.kendoWindow({ title: PANEL_TITLES[panelId] || panelId, width: '75%', modal: true }).data('kendoWindow');
  w.refresh({ url: url }).then(function(){ w.center().open(); });
}
function setKendoGridDataBoundEvents(e, msg, onClick, onDblClick){ /* the client's version binds the row clicks here */ }
$(function(){
  // scrollable, like the client's: once an item was opened Kendo keeps its popup in a container on the scroll wrapper, out of
  // the <li> (data-groupparent / data-group). The capture hovers the pack's own module, so that is the one it finds this way
  $('#mainMenu').kendoMenu({ orientation: 'vertical', direction: 'left', scrollable: true, hoverDelay: 100, animation: { open: { duration: 200 }, close: { duration: 100 } } });
  $('#activeModuleMenu').kendoMenu({ openOnClick: false, scrollable: true });
  $('[data-role=tooltip]').each(function(){ $(this).kendoTooltip({ position: 'top', showAfter: 400 }); });
});
</script></body></html>`;

const searchCriteria = (fields) => `<div class="content-panel-container"><div class="content-panel-hdr">Search Criteria <a class="clickable" href="javascript:void(0)" id="toggleCriteria"><i class="fa-solid fa-chevron-up"></i></a></div>
<div class="content-panel-bdy" id="criteriaBody">${fields}
<div class="buttons"><button class="btn" type="button" id="btnReset">Reset</button><span class="spacer"></span><button class="btn" type="button" id="btnCancel">Cancel</button><button class="btn btn-primary" type="button" id="btnSearch">Search</button></div></div></div>`;
const results = (extra = '') => `<div class="content-panel-container" id="divResults" style="display:none"><div class="content-panel-hdr">Search Results</div><div class="content-panel-bdy">${extra}<div id="grid"></div></div></div>`;
const collapse = `$('#toggleCriteria').on('click', () => { $('#criteriaBody').slideToggle(400); $('#toggleCriteria i').toggleClass('fa-chevron-up fa-chevron-down'); });`;

const PAGES = {
  '/Home/MyHome/': () => ({ title: 'Home', bodyClass: 'Home MyHome', body: '<div class="hero" style="height:300px;background:linear-gradient(#ddd,#999);font-size:32px;padding:24px">Medicaid Management Solutions</div>' }),
  '/FileTransfer/SearchSourceLocations': () => ({
    title: 'File Transfer Configuration', module: 'File Transfer Services', bodyClass: 'FileTransfer SearchSourceLocations',
    body: `<div class="page-toolbar"><span class="fa-solid fa-book clickable" title="Help" data-role="tooltip"></span><button class="btn" type="button" id="btnCreate">Create New</button></div>` +
      searchCriteria(`<div class="editor-row">${field('ConfigId', 'Configuration ID', '<input id="ConfigId" name="ConfigId" value="0" maxlength="9">')}${field('ConfigName', 'Configuration Name', text('ConfigName', 'ConfigName', 'maxlength="50"'))}${field('OwnerName', 'Owner Name', text('OwnerName', 'OwnerName'))}</div>
<div class="editor-row">${field('OwnerModule', 'Owner Module', '<input id="OwnerModule" name="OwnerModule">')}${field('Protocol', 'Protocol', '<input id="Protocol" name="Protocol">')}<div class="editor-col"></div></div>`) +
      results('<label style="float:right"><input type="checkbox" id="ShowInactive" name="ShowInactive"> Show Inactives</label>') +
      `<div id="editWindow"></div><div id="destWindow"></div>
<script>$(function(){
  $('#ConfigId').kendoNumericTextBox({ format: '#', decimals: 0, spinners: false }).data('kendoNumericTextBox').value(null);
  $('#OwnerModule').kendoDropDownList({ optionLabel: 'select a value...', dataTextField: 'Text', dataValueField: 'Value', dataSource: ['Administration','Auth Determination','Claims Management','Core','Correspondence Mgmt','Member Portal','TPL Policy','Managed Care'].map((t, i) => ({ Text: t, Value: String(i + 1) })) });
  $('#Protocol').kendoDropDownList({ optionLabel: 'select a value...', dataSource: ['FTP','SFTP','UNC'] });
  $('#grid').kendoGrid({ autoBind: false, sortable: true, rowLink: true, columns: [{ field: 'ConfigId', title: 'Configuration ID' }, { field: 'ConfigName', title: 'Configuration Name' }, { field: 'Protocol', title: 'Protocol' }, { field: 'Owner', title: 'Owner Name' }, { field: 'Status', title: 'Status' }],
    dataSource: { pageSize: 10, transport: { read: { url: '/FileTransfer/GetSourceLocations', type: 'POST', dataType: 'json' } }, schema: { data: 'Data', total: 'Total' } } });
  $('#btnSearch').on('click', () => { $('#divResults').show(); $('#grid').data('kendoGrid').dataSource.read(); });
  $('#btnReset').on('click', () => { $('#ConfigId').data('kendoNumericTextBox').value(null); $('#OwnerModule').data('kendoDropDownList').value(''); });
  ${collapse}
  // the column filter: an icon in a header and the Kendo popup it opens (filter operator, value, Filter / Clear)
  $('#grid .k-grid-header th').eq(2).find('.k-cell-inner').append('<a class="k-grid-filter-menu" href="#" title="Protocol filter column settings" aria-label="Protocol filter column settings"><span class="k-icon k-svg-icon k-svg-i-filter"></span></a>');
  $('body').append('<div id="filterPop" class="k-animation-container k-animation-container-shown" style="display:none;position:absolute;z-index:10002"><div class="k-child-animation-container"><form class="k-filter-menu k-popup" style="padding:8px;background:#fff;border:1px solid #ccc;width:254px"><div class="k-filter-help-text">Show items with value that:</div><input type="text" title="Operator" value="Equal To" style="width:100%;margin:6px 0"><input type="text" title="Value" style="width:100%;margin-bottom:6px"><button class="k-button" type="submit">Filter</button> <button class="k-button" type="reset">Clear</button></form></div></div>');
  $(document).on('click', '#grid .k-grid-filter-menu', function(e){ e.preventDefault(); e.stopPropagation(); const r = this.getBoundingClientRect(); $('#filterPop').css({ display: 'block', left: r.left + scrollX - 100, top: r.bottom + scrollY + 4 }); });
  $(document).on('click', '#filterPop button', function(e){ e.preventDefault(); $('#filterPop').hide(); });
  $(document).on('mousedown', function(e){ if (!$(e.target).closest('#filterPop, .k-grid-filter-menu').length) $('#filterPop').hide(); });
  const win = $('#editWindow').kendoWindow({ title: 'Add File Transfer Configuration', width: '75%' }).data('kendoWindow');
  // closing with an edit in it: the X asks first (the live portal's "form data has changed"), Cancel closes without asking
  let dirty = false;
  $(document).on('input', '#editWindow input', () => { dirty = true; });
  document.addEventListener('click', (e) => {
    const x = e.target.closest && e.target.closest('.k-window-titlebar-action');
    if (!dirty || !x || !$(x).closest('.k-window').find('#editWindow').length || $('#leaveConfirm').length) return;
    e.stopImmediatePropagation(); e.preventDefault();
    const c = $('<div id="leaveConfirm" class="k-window k-dialog" style="position:fixed;left:50%;top:40%;margin-left:-210px;z-index:20000;width:420px"><div class="k-window-titlebar"><span class="k-window-title">Alert Confirmation</span></div><div class="k-window-content">Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?<div class="buttons"><span class="spacer"></span><button type="button" class="btn" id="leaveNo">No</button><button type="button" class="btn btn-primary" id="leaveYes">Yes</button></div></div></div>').appendTo('body');
    $('#leaveNo').on('click', () => c.remove());
    $('#leaveYes').on('click', () => { c.remove(); dirty = false; win.close(); });
  }, true);
  const dest = $('#destWindow').kendoWindow({ title: 'Add Destination', width: '50%' }).data('kendoWindow');
  $('#btnCreate').on('click', () => { dirty = false; win.wrapper.find('.k-window-title').text('Add File Transfer Configuration'); win.refresh({ url: '/FileTransfer/EditPopup' }).then(() => win.open()); });
  $(document).on('click', '#btnAddDest', () => dest.refresh({ url: '/FileTransfer/DestinationPopup' }).then(() => dest.open()));
  $(document).on('click', '.k-window [id^=btnCancel]', function(){ $(this).closest('.k-window').find('[data-role=window]').data('kendoWindow').close(); });
  $('#grid').on('click', 'a.clickable', () => { win.wrapper.find('.k-window-title').text('Edit File Transfer Configuration'); win.refresh({ url: '/FileTransfer/EditPopup' }).then(() => win.open()); });
});</script>`,
  }),
  // a page whose Search with nothing typed answers with a validation banner (and a message under the field), not a grid; a date prefilled with today; a masked empty date; a radio that shows a part
  '/FileTransfer/SearchFTPServerCredentials': () => ({
    title: 'FTP Server Credentials', module: 'File Transfer Services', bodyClass: 'FileTransfer SearchFTPServerCredentials',
    body: `<div class="page-toolbar"><button class="btn" type="button" id="btnCreate" onclick="location.href='/FileTransfer/AddFtpCredential'">Create New</button></div><div class="editor-validation-summary validation-summary" style="display:none"><i class="msg-inline-icon fa-solid fa-ban"></i><div class="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabindex="0"><span class="fa-solid fa-xmark" title="Close" data-role="tooltip"></span></div>Resolve the following form field errors and try again.<ul class="validation-errors"></ul></div>` +
      searchCriteria(`<div class="editor-row">${field('ServerName', 'Server Name', text('ServerName', 'ServerName', 'maxlength="50"'))}${field('BeginDate', 'Begin Date', '<input id="BeginDate" name="BeginDate">')}${field('EndDate', 'End Date', '<input id="EndDate" name="EndDate">')}</div>
<div class="editor-row"><div class="editor-col"><div class="editor-label"><label>Schedule</label></div><label><input type="radio" name="Sched" value="D"> Daily</label> <label><input type="radio" name="Sched" value="W"> Weekly</label><div id="weeklyPart" style="display:none"><label>Weekday <input name="Weekday"></label></div></div></div>`) + results() +
      `<script>$(function(){
  $('#BeginDate').kendoDatePicker({ format: 'MM/dd/yyyy', value: new Date() });
  $('#EndDate').kendoDatePicker({ format: 'MM/dd/yyyy' });
  $('#EndDate').on('focus', function(){ if (!this.value) this.value = '__/__/____'; }).on('blur', function(){ if (this.value === '__/__/____') this.value = ''; });
  $('#grid').kendoGrid({ autoBind: false, columns: [{ field: 'Server', title: 'Server Name' }, { field: 'Status', title: 'Status' }], dataSource: { pageSize: 10, transport: { read: { url: '/FileTransfer/GetFtp', type: 'POST', dataType: 'json' } }, schema: { data: 'Data', total: 'Total' } } });
  $('input[name=Sched]').on('change', function(){ $('#weeklyPart').toggle(this.value === 'W'); });
  $('#btnSearch').on('click', function(){
    if (!$('#ServerName').val()) {
      $('.validation-errors').html('<li>Enter at least one search criteria.</li>'); $('.validation-summary').show();
      const col = $('#ServerName').closest('.editor-col'); col.find('.msg').remove(); col.append('<span class="field-validation-error msg" data-valmsg-for="ServerName">Server Name is required.</span>');
      return;
    }
    $('.validation-summary').hide(); $('#divResults').show(); $('#grid').data('kendoGrid').dataSource.read();
  });
  $(document).on('click', '[data-hide=alert]', function(){ $(this).closest('.validation-summary').hide(); });
  ${collapse}
});</script>`,
  }),
  // the page a Create New goes to (the live portal's Add pages: a screen of their own, not a dialog)
  '/FileTransfer/AddFtpCredential': () => ({
    title: 'Add FTP Credential', module: 'File Transfer Services', bodyClass: 'FileTransfer AddFtpCredential',
    body: `<div class="content-panel-container"><div class="content-panel-hdr">Add FTP Credential</div><div class="content-panel-bdy"><div class="editor-row">${field('NewServer', 'Server Name', text('NewServer', 'NewServer', 'maxlength="50"'))}</div><div class="buttons"><button class="btn" type="button" id="btnReset">Reset</button><span class="spacer"></span><button class="btn btn-primary" type="button" id="btnSave">Save</button></div></div></div>`,
  }),
  '/FileTransfer/SearchFileTransferTracking': () => ({
    title: 'File Transfer Tracking', module: 'File Transfer Services', help: true, bodyClass: 'FileTransfer SearchFileTransferTracking',
    body: searchCriteria(`<div class="editor-row">${field('FileId', 'File ID', text('FileId', 'FileId'))}${field('FileStatus', 'File Status', '<input id="FileStatus" name="FileStatus">')}</div>
<div class="editor-row">${field('FromDate', 'From Date', '<input id="FromDate" name="FromDate">')}${field('ToDate', 'To Date', '<input id="ToDate" name="ToDate">')}</div>`) + results() +
      `<script>$(function(){
  $('#FileStatus').kendoDropDownList({ optionLabel: 'select a value...', dataSource: ['Complete','Failed','Pending'] });
  $('#FromDate').kendoDateTimePicker({ max: new Date() }); $('#ToDate').kendoDateTimePicker({});
  $('#grid').kendoGrid({ autoBind: false, columns: [{ field: 'FileId', title: 'File ID' }, { field: 'FileName', title: 'File Name' }, { field: 'Status', title: 'File Status' }, { field: 'Created', title: 'Create Date' }],
    dataBound: trackingDataBound, dataSource: { pageSize: 10, transport: { read: { url: '/FileTransfer/GetTracking', type: 'POST', dataType: 'json' } }, schema: { data: 'Data', total: 'Total' } } });
  $('#btnSearch').on('click', () => { $('#divResults').show(); $('#grid').data('kendoGrid').dataSource.read(); });
  $('#grid').on('dblclick', 'tbody tr', onDisplayTrackingView); // what setKendoGridDataBoundEvents wires on the client's grids
  ${collapse}
});
// the portal's grid convention (probe 2, Q20: 62 of 89 pages): a click selects a row, a double-click opens it
function trackingDataBound(e) {
  setKendoGridDataBoundEvents(e, null, null, onDisplayTrackingView);
}

function onDisplayTrackingView() {
    openModalOverlay("FileTransferTrackingViewPopup", trackingViewUrl, 'panelForm-col-6');
}
</script>`,
  }),
};
const POPUP = `<div class="editor-validation-summary validation-summary" style="display:none"><i class="msg-inline-icon fa-solid fa-ban"></i><div class="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabindex="0"><span class="fa-solid fa-xmark" title="Close" data-role="tooltip"></span></div>Resolve the following form field errors and try again.<ul class="validation-errors"></ul></div>
<div class="editor-req-field-row">Required Fields ( <span class="editor-req-field fa-solid fa-asterisk"></span>)</div>
<div class="content-panel-container"><div class="content-panel-hdr">Source Configuration</div><div class="content-panel-bdy">
<div class="editor-row">${field('Edit_ConfigName', 'Configuration Name', text('Edit_ConfigName', 'ConfigName', 'data-val="true" data-val-required="Configuration Name is a required field." data-val-length="Configuration Name has a maximum length of 50 characters." data-val-length-max="50" maxlength="50"'), 'Configuration Name', true)}
${field('Edit_Protocol', 'Protocol', '<input id="Edit_Protocol" name="EditProtocol" data-val="true" data-val-required="Protocol is a required field.">', 'Protocol', true)}
${field('Edit_OwnerEmail', 'Owner Email', text('Edit_OwnerEmail', 'OwnerEmail', 'data-val="true" data-val-email="Owner Email is not a valid e-mail address."'))}</div>
<div class="editor-row"><label><input type="radio" name="RunSchedule" value="W"> Run Weekly</label><label><input type="radio" name="RunSchedule" value="M"> Run Monthly</label><label><input type="checkbox" name="Active" checked> Active</label></div>
<div id="monthlyPart" style="display:none"><label>Run Day Of Month <input name="RunDay"></label></div>
</div></div>
<div class="content-panel-container"><div class="content-panel-hdr">Destination Configuration <button class="btn" type="button" id="btnAddDest">Create New</button></div><div class="content-panel-bdy"><div id="destGrid"></div></div></div>
<div class="buttons"><button class="btn" type="button" id="btnResetEdit">Reset</button><span class="spacer"></span><button class="btn" type="button" id="btnCancelEdit">Cancel</button><button class="btn btn-primary" type="button" id="btnSave">Save</button></div>
<div id="divDestinationId" style="display: none;"><div class="content-panel-container"><div class="content-panel-hdr">Destination</div><div class="content-panel-bdy">
<div class="editor-row">${field('DestinationName', 'Destination Name', text('DestinationName', 'DestinationName', 'data-val="true" data-val-required="Destination Name is a required field."'), 'Destination Name', true)}</div>
<div class="buttons"><span class="spacer"></span><input id="DestinationCancelButton" type="button" value="Cancel" class="btn"><input id="SaveAndCloseButton" type="button" value="Save" class="btn btn-primary"></div></div></div></div>
<script>$('#Edit_Protocol').kendoDropDownList({ optionLabel: 'select a value...', dataSource: ['FTP','SFTP','UNC'] });
// a radio shows a part that is hidden at rest; Save with nothing filled shows the summary banner and a message under each required field (no request)
$('input[name=RunSchedule]').on('change', function(){ $('#monthlyPart').toggle(this.value === 'M'); });
$('#btnSave').on('click', function(){
  let bad = false;
  $('#editWindow [data-val-required]').each(function(){ if (!$(this).val()) { bad = true; const col = $(this).closest('.editor-col'); col.find('.msg').remove(); col.append('<span class="field-validation-error msg" data-valmsg-for="' + this.name + '">' + $(this).attr('data-val-required') + '</span>'); } });
  if (bad) $('#editWindow .validation-summary').show();
});
$('#destGrid').kendoGrid({ autoBind: false, noRecords: 'There are no records found.', columns: [{ field: 'Address', title: 'Destination Address' }, { field: 'Protocol', title: 'Destination Protocol' }], dataSource: { data: [] } });
// the client's Add dialog: a second Create New in the Destination grid's toolbar shows a form that is part of the same dialog
$('#destGrid').prepend('<div class="k-toolbar k-grid-toolbar"><button id="DestinationGridAddButton" title="Create New" type="button" class="k-button"><span class="k-button-text">Create New</span></button></div>');
$('#DestinationGridAddButton').on('click', function(){ $('#divDestinationId').show(); });
$('#DestinationCancelButton').on('click', function(){ $('#divDestinationId').hide(); });
$('.k-window [data-role=tooltip]').each(function(){ if (!$(this).data('kendoTooltip')) $(this).kendoTooltip({ position: 'top', showAfter: 400 }); });</script>`;
const DEST = `${field('DestAddress', 'Destination Address', text('DestAddress', 'DestAddress', 'data-val="true" data-val-required="Destination Address is a required field."'), 'Destination Address', true)}
<div class="buttons"><span class="spacer"></span><button class="btn" type="button" id="btnCancelDest">Cancel</button><button class="btn btn-primary" type="button" id="btnSaveDest">Save</button></div>`;
const rows = (n, f) => ({ Data: Array.from({ length: n }, (_, i) => f(i)), Total: n });

export function startProviderPortal(port, { password, cookie }) {
  return http.createServer((req, res) => {
    const u = new URL(req.url, `http://localhost:${port}`);
    const authed = (req.headers.cookie || '').includes(cookie);
    const send = (code, type, body) => { res.writeHead(code, { 'content-type': type }); res.end(body); };
    if (STATIC[u.pathname]) return send(200, u.pathname.endsWith('.css') ? 'text/css' : 'text/javascript', fs.readFileSync(STATIC[u.pathname]));
    if (req.method === 'POST' && u.pathname === '/login') {
      let b = '';
      req.on('data', (c) => { b += c; });
      return req.on('end', () => {
        const f = new URLSearchParams(b);
        if (f.get('user') === 'admin' && f.get('pass') === password) { res.writeHead(302, { 'set-cookie': `${cookie}; Path=/`, location: '/Home/MyHome/' }); return res.end(); }
        send(200, 'text/html', layout(false, PAGES['/Home/MyHome/']()));
      });
    }
    if (u.pathname !== '/Home/MyHome/' && !authed) { res.writeHead(302, { location: '/Home/MyHome/' }); return res.end(); }
    if (u.pathname === '/FileTransfer/GetSourceLocations') return send(200, 'application/json', JSON.stringify(rows(23, (i) => ({ ConfigId: i + 4, ConfigName: `Config${i}`, Protocol: ['FTP', 'SFTP', 'UNC'][i % 3], Owner: `Owner ${i}`, Status: 'Active' }))));
    if (u.pathname === '/FileTransfer/GetFtp') return send(200, 'application/json', JSON.stringify(rows(5, (i) => ({ Server: `ftp${i}.example.test`, Status: 'Active' }))));
    if (u.pathname === '/FileTransfer/GetTracking') return send(200, 'application/json', JSON.stringify(rows(14, (i) => ({ FileId: `f${1000 + i}`, FileName: `\\\\share\\file${i}.txt`, Status: 'Complete', Created: '5/25/2021 7:37 AM' }))));
    if (u.pathname === '/FileTransfer/EditPopup') return send(200, 'text/html', POPUP);
    if (u.pathname === '/FileTransfer/DestinationPopup') return send(200, 'text/html', DEST);
    if (u.pathname === '/FileTransfer/TrackingView') return send(200, 'text/html', `${field('ViewFileName', 'File Name', text('ViewFileName', 'FileName', 'readonly'))}<div class="buttons"><span class="spacer"></span><button class="btn" type="button" id="btnCancelView" onclick="$(this).closest('.k-window').find('[data-role=window]').data('kendoWindow').close()">Cancel</button></div>`);
    const p = PAGES[u.pathname];
    send(p ? 200 : 404, 'text/html', layout(authed, p ? p() : { title: 'Not part of this test', body: '<h2>Not part of this test</h2>' }));
  }).listen(port);
}
