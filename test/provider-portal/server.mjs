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
#pageBannerMenu .hamburger{width:68px;height:62px;background:#2196f3;display:flex;align-items:center;justify-content:center;cursor:pointer}
.fa-solid{display:inline-block;width:14px;height:14px;background:currentColor;vertical-align:middle}
.fa-bars{width:30px;height:24px;color:#000}
#menuOverlay{position:fixed;inset:0;background:rgba(61,61,61,.5);z-index:1001}
#mainMenuPanel{position:fixed;top:0;right:0;width:288px;height:100%;background:#fff;z-index:1002;padding-top:60px;box-sizing:border-box}
#mainMenuPanel .fa-xmark{position:absolute;left:16px;top:20px;color:#2b3a44}
#mainMenu{border:0;width:100%}#mainMenu .k-menu-link{font-weight:bold;color:#1e2a33}
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
  ['File Transfer Services', [['File Transfer Configuration', '/FileTransfer/SearchSourceLocations'], ['File Transfer Tracking', '/FileTransfer/SearchFileTransferTracking']]],
  ['Claims Management', [['Search Claims', '/ClaimsManagement/SearchClaims']]],
];
const field = (id, label, input, help = label, req = false) => `<div class="editor-col" id="${id}_parent"><div class="editor-label">${req ? `<span class="clickable editor-req-field fa-solid fa-asterisk" title="${label} is a required field." data-role="tooltip"></span>` : ''}<label for="${id}" id="${id}Label">${label}</label><span class="clickable editor-icon fa-solid fa-circle-question" id="${id}Help" role="img" title="${help}" data-role="tooltip"></span></div><div class="editor-field">${input}</div></div>`;
const text = (id, name, extra = '') => `<span class="k-input k-textbox"><input class="k-input-inner" id="${id}" name="${name}" ${extra}></span>`;

const layout = (loggedIn, { title, module, body = '', bodyClass = '' }) => `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><title>${title || 'Home'}</title>
<link rel="stylesheet" href="/css/kendo.css"><style>${CSS}</style>
<script src="/js/jquery.min.js"></script><script src="/js/kendo.ui.core.min.js"></script><script src="/js/pro.js"></script></head>
<body class="${bodyClass}">
<div id="pageHeader" class="header headroom headroom--top"${module ? ' style="border-bottom: 0px;"' : ''}><header id="pageBanner" role="banner">
<div id="pageBannerLogo"><a href="/Home/MyHome/"><span title="Client Logo" data-role="tooltip" id="logo">gainwell</span></a></div>
<div id="pageBannerTitle"><div class="system-name">Medicaid Management Solutions</div><div class="app-title">Final Test</div></div>
${loggedIn ? '<ul class="aag-menu"><li><a href="javascript:void(0)">Messages</a></li><li><a href="/Home/MyAccount">My Account</a></li><li><a href="/logout">Logout</a></li></ul>' : '<div style="margin-left:auto"></div>'}
<div id="pageBannerMenu"><nav aria-label="Hamburger Menu"><div class="hamburger"><i class="fa-solid fa-bars clickable" onclick="openMainMenu()" tabindex="0" aria-label="Main Menu" role="button"></i></div></nav></div>
</header></div>
<div id="menuOverlay" style="display:none" onclick="closeMainMenu()"></div>
<div id="mainMenuPanel" style="display:none"><i class="fa-solid fa-xmark clickable" onclick="closeMainMenu()" role="button" aria-label="Close"></i>
${loggedIn ? `<ul id="mainMenu">${MODULES.map(([m, items]) => `<li>&nbsp;${m}<ul>${items.map(([l, h]) => `<li><a href="${h}">&nbsp;${l}</a></li>`).join('')}</ul></li>`).join('')}</ul>`
    : '<form class="login" method="post" action="/login" style="padding:24px"><label>User name <input name="user" type="text"></label><br><label>Password <input name="pass" type="password"></label><br><button type="submit">Log In</button></form>'}
</div>
${module ? `<div id="moduleContentBar"><div class="module-name">${module}</div><h1>${title}</h1></div>` : ''}
<div id="mainContent">${body}</div>
<div id="pageFooter"><div id="baseFooter"><span>© 2026 Test Portal. All rights reserved.</span></div></div>
<script>
function openMainMenu(){ $('#menuOverlay,#mainMenuPanel').fadeIn(200); }
function closeMainMenu(){ $('#menuOverlay,#mainMenuPanel').fadeOut(200); }
$(function(){
  $('#mainMenu').kendoMenu({ orientation: 'vertical', direction: 'left' });
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
  const win = $('#editWindow').kendoWindow({ title: 'Add File Transfer Configuration', width: '75%' }).data('kendoWindow');
  const dest = $('#destWindow').kendoWindow({ title: 'Add Destination', width: '50%' }).data('kendoWindow');
  $('#btnCreate').on('click', () => { win.wrapper.find('.k-window-title').text('Add File Transfer Configuration'); win.refresh({ url: '/FileTransfer/EditPopup' }).then(() => win.open()); });
  $(document).on('click', '#btnAddDest', () => dest.refresh({ url: '/FileTransfer/DestinationPopup' }).then(() => dest.open()));
  $(document).on('click', '.k-window [id^=btnCancel]', function(){ $(this).closest('.k-window').find('[data-role=window]').data('kendoWindow').close(); });
  $('#grid').on('click', 'a.clickable', () => { win.wrapper.find('.k-window-title').text('Edit File Transfer Configuration'); win.refresh({ url: '/FileTransfer/EditPopup' }).then(() => win.open()); });
});</script>`,
  }),
  '/FileTransfer/SearchFileTransferTracking': () => ({
    title: 'File Transfer Tracking', module: 'File Transfer Services', bodyClass: 'FileTransfer SearchFileTransferTracking',
    body: searchCriteria(`<div class="editor-row">${field('FileId', 'File ID', text('FileId', 'FileId'))}${field('FileStatus', 'File Status', '<input id="FileStatus" name="FileStatus">')}</div>
<div class="editor-row">${field('FromDate', 'From Date', '<input id="FromDate" name="FromDate">')}${field('ToDate', 'To Date', '<input id="ToDate" name="ToDate">')}</div>`) + results() +
      `<script>$(function(){
  $('#FileStatus').kendoDropDownList({ optionLabel: 'select a value...', dataSource: ['Complete','Failed','Pending'] });
  $('#FromDate').kendoDateTimePicker({ max: new Date() }); $('#ToDate').kendoDateTimePicker({});
  $('#grid').kendoGrid({ autoBind: false, columns: [{ field: 'FileId', title: 'File ID' }, { field: 'FileName', title: 'File Name' }, { field: 'Status', title: 'File Status' }, { field: 'Created', title: 'Create Date' }],
    dataSource: { pageSize: 10, transport: { read: { url: '/FileTransfer/GetTracking', type: 'POST', dataType: 'json' } }, schema: { data: 'Data', total: 'Total' } } });
  $('#btnSearch').on('click', () => { $('#divResults').show(); $('#grid').data('kendoGrid').dataSource.read(); });
  ${collapse}
});</script>`,
  }),
};
const POPUP = `<div class="editor-req-field-row">Required Fields ( <span class="editor-req-field fa-solid fa-asterisk"></span>)</div>
<div class="content-panel-container"><div class="content-panel-hdr">Source Configuration</div><div class="content-panel-bdy">
<div class="editor-row">${field('Edit_ConfigName', 'Configuration Name', text('Edit_ConfigName', 'ConfigName', 'data-val="true" data-val-required="Configuration Name is a required field." data-val-length="Configuration Name has a maximum length of 50 characters." data-val-length-max="50" maxlength="50"'), 'Configuration Name', true)}
${field('Edit_Protocol', 'Protocol', '<input id="Edit_Protocol" name="EditProtocol" data-val="true" data-val-required="Protocol is a required field.">', 'Protocol', true)}
${field('Edit_OwnerEmail', 'Owner Email', text('Edit_OwnerEmail', 'OwnerEmail', 'data-val="true" data-val-email="Owner Email is not a valid e-mail address."'))}</div>
<div class="editor-row"><label><input type="radio" name="RunSchedule" value="W"> Run Weekly</label><label><input type="radio" name="RunSchedule" value="M"> Run Monthly</label><label><input type="checkbox" name="Active" checked> Active</label></div>
</div></div>
<div class="content-panel-container"><div class="content-panel-hdr">Destination Configuration <button class="btn" type="button" id="btnAddDest">Create New</button></div><div class="content-panel-bdy"><div id="destGrid"></div></div></div>
<div class="buttons"><button class="btn" type="button" id="btnResetEdit">Reset</button><span class="spacer"></span><button class="btn" type="button" id="btnCancelEdit">Cancel</button><button class="btn btn-primary" type="button" id="btnSave">Save</button></div>
<script>$('#Edit_Protocol').kendoDropDownList({ optionLabel: 'select a value...', dataSource: ['FTP','SFTP','UNC'] });
$('#destGrid').kendoGrid({ autoBind: false, noRecords: 'There are no records found.', columns: [{ field: 'Address', title: 'Destination Address' }, { field: 'Protocol', title: 'Destination Protocol' }], dataSource: { data: [] } });
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
    if (u.pathname === '/FileTransfer/GetTracking') return send(200, 'application/json', JSON.stringify(rows(14, (i) => ({ FileId: `f${1000 + i}`, FileName: `\\\\share\\file${i}.txt`, Status: 'Complete', Created: '5/25/2021 7:37 AM' }))));
    if (u.pathname === '/FileTransfer/EditPopup') return send(200, 'text/html', POPUP);
    if (u.pathname === '/FileTransfer/DestinationPopup') return send(200, 'text/html', DEST);
    const p = PAGES[u.pathname];
    send(p ? 200 : 404, 'text/html', layout(authed, p ? p() : { title: 'Not part of this test', body: '<h2>Not part of this test</h2>' }));
  }).listen(port);
}
