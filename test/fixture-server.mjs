// Self-test fixture: a page that behaves like ASP.NET WebForms output (validators, __doPostBack, AutoPostBack,
// confirm(), hover menu, grid paging, disabled-until-typed button, hidden admin panel).
//   node test/fixture-server.mjs            -> http://localhost:4321/Orders.aspx
//   GET /__log                              -> which POSTs reached the server (safe mode must never let Save/Delete through)
import http from 'node:http';

const PORT = +(process.env.PORT || 4321);
const log = [];
const STATES = { US: ['California', 'Texas', 'New York'], IN: ['Goa', 'Karnataka'], UK: [] };
const ROWS = Array.from({ length: 8 }, (_, i) => [`SO-${1001 + i}`, ['Open', 'Shipped', 'Closed'][i % 3], `$${(i + 1) * 125}.00`]);

const page = ({ country = 'US', pageNo = 1, details = false }) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Orders</title>
<style>
body { font-family: Verdana, Arial, sans-serif; font-size: 12px; color: #333; margin: 0; background: #f4f4f4 url(/img/bg.png) repeat-x; }
#header { background: #1f3b5c; color: #fff; padding: 10px 16px; height: 40px; }
#header img { vertical-align: middle; }
#menu { list-style: none; margin: 0; padding: 0 16px; background: #2d5580; height: 28px; }
#menu > li { float: left; position: relative; padding: 6px 12px; color: #fff; cursor: pointer; }
#menu li ul { display: none; position: absolute; left: 0; top: 28px; background: #fff; border: 1px solid #999; list-style: none; padding: 4px; margin: 0; width: 140px; }
#menu li:hover ul { display: block; }
#menu li ul a { color: #1f3b5c; display: block; padding: 3px; }
.content { padding: 16px; width: 760px; }
fieldset { border: 1px solid #bbb; margin-bottom: 12px; background: #fff; }
td { padding: 3px 6px; }
.btn { background: #0067b8; color: #fff; border: 1px solid #00538f; padding: 4px 14px; cursor: pointer; }
.btn:hover { background: #005a9e; }
.btn:disabled, .aspNetDisabled { background: #ccc; border-color: #aaa; color: #777; }
.err { color: red; }
.grid { border-collapse: collapse; width: 100%; background: #fff; }
.grid th { background: #1f3b5c; color: #fff; text-align: left; padding: 4px; }
.grid td { border-bottom: 1px solid #ddd; }
.grid tr.alt td { background: #eef3f8; }
.spacer { height: 500px; }
</style>
<script type="text/javascript">
var Page_Validators = [];
function __doPostBack(t, a) { var f = document.forms[0]; f.__EVENTTARGET.value = t; f.__EVENTARGUMENT.value = a; f.submit(); }
function WebForm_PostBackOptions(t, a, v, g) { this.eventTarget = t; this.eventArgument = a; this.validation = v; this.validationGroup = g; }
function WebForm_DoPostBackWithOptions(o) { if (o.validation && !Page_ClientValidate(o.validationGroup)) return false; __doPostBack(o.eventTarget, o.eventArgument); return true; }
function RequiredFieldValidatorEvaluateIsValid(v) { return document.getElementById(v.controltovalidate).value.replace(/^\\s+|\\s+$/g, '') !== ''; }
function RegularExpressionValidatorEvaluateIsValid(v) { var x = document.getElementById(v.controltovalidate).value; if (x === '') return true; var m = new RegExp(v.validationexpression).exec(x); return m !== null && m[0] === x; }
function ValidatorValidate(v) { v.isvalid = v.evaluationfunction(v); v.style.visibility = v.isvalid ? 'hidden' : 'visible'; return v.isvalid; }
function Page_ClientValidate(g) { var ok = true; for (var i = 0; i < Page_Validators.length; i++) if ((Page_Validators[i].validationGroup || '') === (g || '')) ok = ValidatorValidate(Page_Validators[i]) && ok; return ok; }
function ValidatorOnChange(id) { for (var i = 0; i < Page_Validators.length; i++) if (Page_Validators[i].controltovalidate === id) ValidatorValidate(Page_Validators[i]); }
function toggleShip(cb) { document.getElementById('ctl00_Main_pnlShipping').style.display = cb.checked ? 'block' : 'none'; }
</script></head>
<body>
<form method="post" action="./Orders.aspx" id="form1">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTIzNDU2Nzg5MGRk${'A'.repeat(400)}" />
<input type="hidden" name="ctl00$Main$hdnMode" id="ctl00_Main_hdnMode" value="edit" />
<div id="header"><img src="/img/logo.svg" alt="Contoso" width="32" height="32" /> <span id="ctl00_lblTitle" style="font-size:18px;font-weight:bold">Contoso Orders</span></div>
<ul id="menu"><li>Orders<ul><li><a href="/OrderList.aspx">All orders</a></li><li><a href="/NewOrder.aspx">New order</a></li></ul></li><li>Reports<ul><li><a href="/Reports.aspx">Monthly</a></li></ul></li></ul>
<div class="content">
<fieldset><legend>Customer</legend><table>
<tr><td>Name:</td><td><input name="ctl00$Main$txtName" type="text" maxlength="40" id="ctl00_Main_txtName" onchange="ValidatorOnChange(this.id)" />
<span id="ctl00_Main_rfvName" class="err" style="visibility:hidden">Name is required</span></td></tr>
<tr><td>Email:</td><td><input name="ctl00$Main$txtEmail" type="text" id="ctl00_Main_txtEmail" onchange="ValidatorOnChange(this.id)" />
<span id="ctl00_Main_revEmail" class="err" style="visibility:hidden">Enter a valid email</span></td></tr>
<tr><td>Country:</td><td><select name="ctl00$Main$ddlCountry" id="ctl00_Main_ddlCountry" onchange="javascript:setTimeout('__doPostBack(\\'ctl00$Main$ddlCountry\\',\\'\\')', 0)">
${Object.keys(STATES).map((c) => `<option value="${c}"${c === country ? ' selected="selected"' : ''}>${{ US: 'United States', IN: 'India', UK: 'United Kingdom' }[c]}</option>`).join('')}</select></td></tr>
<tr><td>State:</td><td><select name="ctl00$Main$ddlState" id="ctl00_Main_ddlState"${STATES[country].length ? '' : ' disabled="disabled" class="aspNetDisabled"'}>${STATES[country].map((s) => `<option>${s}</option>`).join('') || '<option>(none)</option>'}</select></td></tr>
<tr><td></td><td><input id="ctl00_Main_chkShip" type="checkbox" name="ctl00$Main$chkShip" onclick="toggleShip(this)" /><label for="ctl00_Main_chkShip">Ship to a different address</label></td></tr>
</table>
<div id="ctl00_Main_pnlShipping" style="display:none;padding:6px;background:#fffbe6">Shipping address: <input name="ctl00$Main$txtShipAddr" type="text" id="ctl00_Main_txtShipAddr" /></div>
</fieldset>
<fieldset><legend>Notes</legend>
<textarea name="ctl00$Main$txtNotes" id="ctl00_Main_txtNotes" rows="2" cols="50" oninput="document.getElementById('ctl00_Main_btnPreview').disabled = !this.value"></textarea>
<input type="button" id="ctl00_Main_btnPreview" class="btn" value="Preview" disabled="disabled" onclick="document.getElementById('ctl00_Main_lblPreview').innerHTML = document.getElementById('ctl00_Main_txtNotes').value" />
<span id="ctl00_Main_lblPreview"></span>
</fieldset>
<p><input type="submit" name="ctl00$Main$btnSave" value="Save" id="ctl00_Main_btnSave" class="btn" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$Main$btnSave&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false)); return false;" />
<input type="submit" name="ctl00$Main$btnDelete" value="Delete" id="ctl00_Main_btnDelete" class="btn" onclick="return confirm('Delete this order?');" />
<a id="ctl00_Main_lnkDetails" href="javascript:__doPostBack('ctl00$Main$lnkDetails','')">Show details</a>
<a id="ctl00_Main_lnkHelp" href="/Help.aspx" title="Open help">Help</a></p>
<span id="ctl00_Main_lblDetails">${details ? 'Details loaded for order SO-1001' : ''}</span>
<div id="ctl00_Main_pnlAdmin" style="display:none">Admin tools: <a href="/Admin.aspx">Purge</a></div>
<div class="spacer"></div>
<table class="grid" id="ctl00_Main_gvOrders"><tr><th>Order</th><th>Status</th><th>Total</th></tr>
${ROWS.slice((pageNo - 1) * 4, pageNo * 4).map((r, i) => `<tr${i % 2 ? ' class="alt"' : ''}><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
<tr><td colspan="3">${[1, 2].map((p) => (p === pageNo ? `<span>${p}</span>` : `<a href="javascript:__doPostBack('ctl00$Main$gvOrders','Page$${p}')">${p}</a>`)).join(' ')}</td></tr></table>
</div>
<script type="text/javascript">
(function () {
  var r = document.getElementById('ctl00_Main_rfvName'); r.controltovalidate = 'ctl00_Main_txtName'; r.errormessage = 'Name is required'; r.evaluationfunction = RequiredFieldValidatorEvaluateIsValid; r.display = 'Static'; r.validationGroup = '';
  var e = document.getElementById('ctl00_Main_revEmail'); e.controltovalidate = 'ctl00_Main_txtEmail'; e.errormessage = 'Enter a valid email'; e.evaluationfunction = RegularExpressionValidatorEvaluateIsValid; e.validationexpression = '\\\\w+([-+.]\\\\w+)*@\\\\w+([-.]\\\\w+)*\\\\.\\\\w+([-.]\\\\w+)*'; e.display = 'Static'; e.validationGroup = '';
  Page_Validators = [r, e];
})();
</script>
</form></body></html>`;

const LOGO = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="#f2b705"/></svg>';
const BG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAIAAAC3ufxZAAAAFklEQVR4nGP48OEDEwMDAwMDAwMDAwMAJHsDQX2D/jkAAAAASUVORK5CYII=', 'base64');

http.createServer((req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  if (u.pathname === '/__log') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify(log)); }
  if (u.pathname === '/img/logo.svg') { res.writeHead(200, { 'content-type': 'image/svg+xml' }); return res.end(LOGO); }
  if (u.pathname === '/img/bg.png') { res.writeHead(200, { 'content-type': 'image/png' }); return res.end(BG); }
  if (u.pathname.toLowerCase() !== '/orders.aspx') { res.writeHead(404); return res.end('not found'); }
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const f = new URLSearchParams(body);
      const target = f.get('__EVENTTARGET') || [...f.keys()].find((k) => /btn/.test(k)) || '';
      log.push({ at: new Date().toISOString(), target, arg: f.get('__EVENTARGUMENT') });
      const pageNo = target.endsWith('gvOrders') ? +(f.get('__EVENTARGUMENT') || 'Page$1').split('$')[1] : 1;
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(page({ country: f.get('ctl00$Main$ddlCountry') || 'US', pageNo, details: target.endsWith('lnkDetails') }));
    });
    return;
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(page({}));
}).listen(PORT, () => console.log(`fixture on http://localhost:${PORT}/Orders.aspx`));
