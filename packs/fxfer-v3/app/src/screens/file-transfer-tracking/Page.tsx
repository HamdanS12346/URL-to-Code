// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useEffect, useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, useKit, type KitData } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/file-transfer-tracking';

// fxfer-v3/file-transfer-tracking: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function FileTransferTrackingPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "File Transfer Tracking";
    body.className = "FileTransfer SearchFileTransferTracking";
    html.className = "k-webkit k-webkit157";
    body.setAttribute('style', "padding-top: 62px;");
    return () => {
      style.remove();
      undo.forEach((f) => f());
      [document.title, body.id, body.className, html.className] = prev;
      if (prev[4] === null) body.removeAttribute('style'); else body.setAttribute('style', prev[4]);
    };
  }, []);

  function FileTransferTrackingBehavior() {
    const { bus } = useKit();

    useEffect(() => {
      const summaryEl = () => document.querySelector('[data-kit-h="h1"]');
      const summaryListEl = () => summaryEl()?.querySelector('ul.validation-errors');

      const hideSummaryErrors = () => {
        const el = summaryEl();
        if (el) el.style.display = 'none';
        const list = summaryListEl();
        if (list) list.innerHTML = '';
      };

      const showSummaryError = (message) => {
        const el = summaryEl();
        const list = summaryListEl();
        if (!el || !list) return;
        list.innerHTML = '<li>' + message + '</li>';
        el.style.display = '';
      };

      const hideResults = () => {
        const panel = document.getElementById('searchFileTrackingResultsPanel');
        if (panel) panel.style.display = 'none';
      };

      const valueOf = (id) => {
        const el = document.getElementById(id);
        if (!el) return '';
        if ('value' in el) return String(el.value ?? '');
        return '';
      };

      const hasAnyCriteria = () => {
        const ids = [
          'FileId',
          'FileName',
          'FileStatusList',
          'DirectionList',
          'TransportTypeList',
          'SourceLocation',
          'TradingPartnerId',
          'FromDate',
          'ToDate',
          'FromSize',
          'ToSize',
        ];
        return ids.some((id) => valueOf(id).trim() !== '');
      };

      const onDocClick = (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;

        if (target.closest('[data-hide="alert"]')) {
          hideSummaryErrors();
        }

        if (target.closest('#cancelButton')) {
          // Live page carries Editor.CancelActionUrl=/Home/MyHome/; in this pack, Home is '#/'.
          window.location.hash = '#/';
        }
      };

      const offReset = bus.on('reset', () => {
        hideSummaryErrors();
        hideResults();

        const fileId = document.getElementById('FileId');
        if (fileId && 'focus' in fileId) {
          fileId.focus();
          if ('select' in fileId) fileId.select();
        }
      });

      const offSearch = bus.on('search', () => {
        hideSummaryErrors();
        if (hasAnyCriteria()) return;

        // Kit will have already run its search; mirror the portal by hiding results and showing a page-level message.
        hideResults();
        showSummaryError('At least one search criteria is required.');
      });

      document.addEventListener('click', onDocClick);
      return () => {
        offReset();
        offSearch();
        document.removeEventListener('click', onDocClick);
      };
    }, [bus]);

    return null;
  }

  return (
    <><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><FileTransferTrackingBehavior /><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/FileTransfer/SearchFileTransferTracking" className="k-content" method="post">
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="bTc7zIKD-MRadNQOkeXfVYX61L_EDhuDi_HSZ9SzZve-yCo7pqDwoqGyj6_g3MaqrLBi2trpE6LbGsdw2-hQOpV4px1lrCbsXrJCkrjk9LP4NWFBKjkYI2xPySOUMNL_6Lon6P5kX2-G2yypHVP7mA2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" style={{"display": "none"}} data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="container">{" "}<fieldset id="step1" data-role="validator">{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                    Search Criteria\n                "}</div>{" "}<div className="content-panel-hdr-tools">{" "}<div className="content-ordered-panel-hdr-tools">
              <div className="panel-icon clickable" data-testid="button-21">{" "}<div className="fa-solid fa-angle-up" title="Collapse" tabIndex={0} data-testid="button-collapse"></div>{" "}</div>
              </div>
            </div>{" "}<div id="searchFileTrackingPanel" className="content-panel-bdy">{" "}<div className="editor-req-field-row">{"Required Fields ( "}<span className="editor-req-field fa-solid fa-asterisk"></span>{")"}</div>{" "}<div className="panel-body">{" "}<div className="editor-section">{" "}<div className="col-md-4 editor-col" id="FileId_parent" data-template="Text">
                  <div className="editor-label">
                    <label htmlFor="FileId" id="FileIdLabel" title="File ID">{"File ID"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FileIdHelp" role="img" title="File ID" data-role="tooltip" data-kit-tip="File ID" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FileIdHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                      <input className="editor-control k-input-inner" data-val-length-max="File ID has a maximum length of 50 characters." data-val-regex="File ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="FileId" ignoredirtydata="False" maxLength={50} name="FileId" not-data-val-required="File ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="FileIdLabel FileIdHelpDesc" aria-hidden="false" defaultValue="" data-testid="FileId" />
                      </span>{" "}<span className="k-invalid-msg" id="FileId_validationMessage" data-for="FileId"></span>
                    <span id="FileIdHelpDesc" hidden={true} data-kit-h="h2">{"File ID"}</span>
                    </div>
                  </div>{" "}<div className="col-md-5 editor-col" id="FileName_parent" data-template="Text">
                  <div className="editor-label">
                    <label htmlFor="FileName" id="FileNameLabel" title="File Name">{"File Name"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FileNameHelp" role="img" title="File Name" data-role="tooltip" data-kit-tip="File Name" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FileNameHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                      <input className="editor-control k-input-inner" data-val-length-max="File Name has a maximum length of 100 characters." data-val-regex="File Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="FileName" ignoredirtydata="False" maxLength={100} name="FileName" not-data-val-required="File Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="FileNameLabel FileNameHelpDesc" aria-hidden="false" defaultValue="" data-testid="FileName" />
                      </span>{" "}<span className="k-invalid-msg" id="FileName_validationMessage" data-for="FileName"></span>
                    <span id="FileNameHelpDesc" hidden={true} data-kit-h="h3">{"File Name"}</span>
                    </div>
                  </div>{" "}<div className="col-md-4 editor-col editor-clear" id="FileStatusList_parent" data-template="ListItemSingle">
                  <div className="editor-label">
                    <label htmlFor="FileStatus" id="FileStatusLabel" title="File Status">{"File Status"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FileStatusHelp" role="img" title="File Status" data-role="tooltip" data-kit-tip="File Status" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FileStatusHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<KitWidget id="k1" />{" "}<label id="FileStatus_IDLabel" htmlFor="FileStatus_ID" className="display-none">{"FileStatus_ID"}</label>
                    <input id="FileStatus_ID" name="FileStatus.ID" type="hidden" defaultValue="" aria-labelledby="FileStatus_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="FileStatus_NameLabel" htmlFor="FileStatus_Name" className="display-none">{"FileStatus_Name"}</label>
                    <input id="FileStatus_Name" name="FileStatus.Name" type="hidden" defaultValue="" aria-labelledby="FileStatus_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="FileStatus_DisplayFormatLabel" htmlFor="FileStatus_DisplayFormat" className="display-none">{"FileStatus_DisplayFormat"}</label>
                    <input id="FileStatus_DisplayFormat" name="FileStatus.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="FileStatus_DisplayFormatLabel" aria-hidden="false" style={{}} />
                    <span className="k-invalid-msg" id="FileStatusList_validationMessage" data-for="FileStatusList"></span>
                    <span id="FileStatusHelpDesc" hidden={true} data-kit-h="h4">{"File Status"}</span>
                    </div>
                  </div>{" "}<div className="col-md-3 editor-col" id="DirectionList_parent" data-template="ListItemSingle">
                  <div className="editor-label">
                    <label htmlFor="Direction" id="DirectionLabel" title="Direction">{"Direction"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="DirectionHelp" role="img" title="Direction" data-role="tooltip" data-kit-tip="Direction" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="DirectionHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<KitWidget id="k2" />{" "}<label id="Direction_IDLabel" htmlFor="Direction_ID" className="display-none">{"Direction_ID"}</label>
                    <input id="Direction_ID" name="Direction.ID" type="hidden" defaultValue="" aria-labelledby="Direction_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="Direction_NameLabel" htmlFor="Direction_Name" className="display-none">{"Direction_Name"}</label>
                    <input id="Direction_Name" name="Direction.Name" type="hidden" defaultValue="" aria-labelledby="Direction_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="Direction_DisplayFormatLabel" htmlFor="Direction_DisplayFormat" className="display-none">{"Direction_DisplayFormat"}</label>
                    <input id="Direction_DisplayFormat" name="Direction.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="Direction_DisplayFormatLabel" aria-hidden="false" style={{}} />
                    <span className="k-invalid-msg" id="DirectionList_validationMessage" data-for="DirectionList"></span>
                    <span id="DirectionHelpDesc" hidden={true} data-kit-h="h5">{"Direction"}</span>
                    </div>
                  </div>{" "}<div className="col-md-4 editor-col" id="TransportTypeList_parent" data-template="ListItemSingle">
                  <div className="editor-label">
                    <label htmlFor="TransportType" id="TransportTypeLabel" title="Transport Type">{"Transport Type"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TransportTypeHelp" role="img" title="Transport Type" data-role="tooltip" data-kit-tip="Transport Type" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="TransportTypeHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<KitWidget id="k3" />{" "}<label id="TransportType_IDLabel" htmlFor="TransportType_ID" className="display-none">{"TransportType_ID"}</label>
                    <input id="TransportType_ID" name="TransportType.ID" type="hidden" defaultValue="" aria-labelledby="TransportType_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="TransportType_NameLabel" htmlFor="TransportType_Name" className="display-none">{"TransportType_Name"}</label>
                    <input id="TransportType_Name" name="TransportType.Name" type="hidden" defaultValue="" aria-labelledby="TransportType_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="TransportType_DisplayFormatLabel" htmlFor="TransportType_DisplayFormat" className="display-none">{"TransportType_DisplayFormat"}</label>
                    <input id="TransportType_DisplayFormat" name="TransportType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="TransportType_DisplayFormatLabel" aria-hidden="false" style={{}} />
                    <span className="k-invalid-msg" id="TransportTypeList_validationMessage" data-for="TransportTypeList"></span>
                    <span id="TransportTypeHelpDesc" hidden={true} data-kit-h="h6">{"Transport Type"}</span>
                    </div>
                  </div>{" "}<div className="col-md-5 editor-col editor-clear">{" "}<div className="editor-label">{" "}<label htmlFor="SourceLocationId" id="SourceLocationIdLabel" title="Source Location">{"Source Location"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="SourceLocationIdHelp" role="img" title="Source Location" data-role="tooltip" data-kit-tip="Source Location" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="SourceLocationIdHelp"></span>{" "}</div>{" "}<div className="editor-field">{" "}<KitWidget id="k4" />{" "}<span id="SourceLocationIdHelpDesc" hidden={true} data-kit-h="h7">{"Source Location"}</span>
                    </div>{" "}</div>{" "}<div className="col-md-2 editor-col" id="TradingPartnerId_parent" data-template="Text">
                  <div className="editor-label">
                    <label htmlFor="TradingPartnerId" id="TradingPartnerIdLabel" title="Trading Partner ID">{"Trading Partner ID"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TradingPartnerIdHelp" role="img" title="Trading Partner ID" data-role="tooltip" data-kit-tip="Trading Partner ID" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="TradingPartnerIdHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                      <input className="editor-control k-input-inner" data-val-length-max="Trading Partner ID has a maximum length of 25 characters." data-val-regex="Trading Partner ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="TradingPartnerId" ignoredirtydata="False" maxLength={25} name="TradingPartnerId" not-data-val-required="Trading Partner ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="TradingPartnerIdLabel TradingPartnerIdHelpDesc" aria-hidden="false" defaultValue="" data-testid="TradingPartnerId" />
                      </span>{" "}<span className="k-invalid-msg" id="TradingPartnerId_validationMessage" data-for="TradingPartnerId"></span>
                    <span id="TradingPartnerIdHelpDesc" hidden={true} data-kit-h="h8">{"Trading Partner ID"}</span>
                    </div>
                  </div>{" "}<div className="col-md-2 editor-col editor-clear" id="FromDate_parent" data-template="DateTime">
                  <div className="editor-label">
                    <label htmlFor="FromDate" id="FromDateLabel" title="From Date">{"From Date"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FromDateHelp" role="img" title="From Date" data-role="tooltip" data-kit-tip="From Date" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FromDateHelp"></span>
                    </div>
                  <div className="editor-field">
                    <KitWidget id="k5" />
                    <span className="k-invalid-msg" id="FromDate_validationMessage" data-for="FromDate"></span>
                    <span id="FromDateHelpDesc" hidden={true} data-kit-h="h9">{"From Date"}</span>
                    </div>
                  </div>{" "}<div className="col-md-2 editor-col" id="ToDate_parent" data-template="DateTime">
                  <div className="editor-label">
                    <label htmlFor="ToDate" id="ToDateLabel" title="To Date">{"To Date"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ToDateHelp" role="img" title="To Date" data-role="tooltip" data-kit-tip="To Date" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ToDateHelp"></span>
                    </div>
                  <div className="editor-field">
                    <KitWidget id="k6" />
                    <span className="k-invalid-msg" id="ToDate_validationMessage" data-for="ToDate"></span>
                    <span id="ToDateHelpDesc" hidden={true} data-kit-h="h10">{"To Date"}</span>
                    </div>
                  </div>{" "}<div className="col-md-2 editor-col" id="FromSize_parent" data-template="Number">
                  <div className="editor-label">
                    <label htmlFor="FromSize" id="FromSizeLabel" title="From Size (KB)">{"From Size (KB)"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FromSizeHelp" role="img" title="From Size (KB)" data-role="tooltip" data-kit-tip="From Size (KB)" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FromSizeHelp"></span>
                    </div>
                  <div className="editor-field">
                    <KitWidget id="k7" />
                    <span className="k-invalid-msg" id="FromSize_validationMessage" data-for="FromSize"></span>
                    <span id="FromSizeHelpDesc" hidden={true} data-kit-h="h11">{"From Size (KB)"}</span>
                    </div>
                  </div>{" "}<div className="col-md-2 editor-col" id="ToSize_parent" data-template="Number">
                  <div className="editor-label">
                    <label htmlFor="ToSize" id="ToSizeLabel" title="To Size (KB)">{"To Size (KB)"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ToSizeHelp" role="img" title="To Size (KB)" data-role="tooltip" data-kit-tip="To Size (KB)" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ToSizeHelp"></span>
                    </div>
                  <div className="editor-field">
                    <KitWidget id="k8" />
                    <span className="k-invalid-msg" id="ToSize_validationMessage" data-for="ToSize"></span>
                    <span id="ToSizeHelpDesc" hidden={true} data-kit-h="h12">{"To Size (KB)"}</span>
                    </div>
                  </div>{" "}</div>{" "}<div className="editor-button-row">{" "}<label id="Editor_Alt1ActionTextLabel" htmlFor="Editor_Alt1ActionText" className="display-none">{"Editor_Alt1ActionText"}</label>
                <input id="Editor_Alt1ActionText" name="Editor.Alt1ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt1ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt1ActionUrlLabel" htmlFor="Editor_Alt1ActionUrl" className="display-none">{"Editor_Alt1ActionUrl"}</label>
                <input id="Editor_Alt1ActionUrl" name="Editor.Alt1ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt1ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt2ActionTextLabel" htmlFor="Editor_Alt2ActionText" className="display-none">{"Editor_Alt2ActionText"}</label>
                <input id="Editor_Alt2ActionText" name="Editor.Alt2ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt2ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt2ActionUrlLabel" htmlFor="Editor_Alt2ActionUrl" className="display-none">{"Editor_Alt2ActionUrl"}</label>
                <input id="Editor_Alt2ActionUrl" name="Editor.Alt2ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt2ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt3ActionTextLabel" htmlFor="Editor_Alt3ActionText" className="display-none">{"Editor_Alt3ActionText"}</label>
                <input id="Editor_Alt3ActionText" name="Editor.Alt3ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt3ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt3ActionUrlLabel" htmlFor="Editor_Alt3ActionUrl" className="display-none">{"Editor_Alt3ActionUrl"}</label>
                <input id="Editor_Alt3ActionUrl" name="Editor.Alt3ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt3ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt4ActionTextLabel" htmlFor="Editor_Alt4ActionText" className="display-none">{"Editor_Alt4ActionText"}</label>
                <input id="Editor_Alt4ActionText" name="Editor.Alt4ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt4ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt4ActionUrlLabel" htmlFor="Editor_Alt4ActionUrl" className="display-none">{"Editor_Alt4ActionUrl"}</label>
                <input id="Editor_Alt4ActionUrl" name="Editor.Alt4ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt4ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt5ActionTextLabel" htmlFor="Editor_Alt5ActionText" className="display-none">{"Editor_Alt5ActionText"}</label>
                <input id="Editor_Alt5ActionText" name="Editor.Alt5ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt5ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt5ActionUrlLabel" htmlFor="Editor_Alt5ActionUrl" className="display-none">{"Editor_Alt5ActionUrl"}</label>
                <input id="Editor_Alt5ActionUrl" name="Editor.Alt5ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt5ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt6ActionTextLabel" htmlFor="Editor_Alt6ActionText" className="display-none">{"Editor_Alt6ActionText"}</label>
                <input id="Editor_Alt6ActionText" name="Editor.Alt6ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt6ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt6ActionUrlLabel" htmlFor="Editor_Alt6ActionUrl" className="display-none">{"Editor_Alt6ActionUrl"}</label>
                <input id="Editor_Alt6ActionUrl" name="Editor.Alt6ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt6ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt7ActionTextLabel" htmlFor="Editor_Alt7ActionText" className="display-none">{"Editor_Alt7ActionText"}</label>
                <input id="Editor_Alt7ActionText" name="Editor.Alt7ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt7ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt7ActionUrlLabel" htmlFor="Editor_Alt7ActionUrl" className="display-none">{"Editor_Alt7ActionUrl"}</label>
                <input id="Editor_Alt7ActionUrl" name="Editor.Alt7ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt7ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt8ActionTextLabel" htmlFor="Editor_Alt8ActionText" className="display-none">{"Editor_Alt8ActionText"}</label>
                <input id="Editor_Alt8ActionText" name="Editor.Alt8ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt8ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt8ActionUrlLabel" htmlFor="Editor_Alt8ActionUrl" className="display-none">{"Editor_Alt8ActionUrl"}</label>
                <input id="Editor_Alt8ActionUrl" name="Editor.Alt8ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt8ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_CancelActionTextLabel" htmlFor="Editor_CancelActionText" className="display-none">{"Editor_CancelActionText"}</label>
                <input id="Editor_CancelActionText" name="Editor.CancelActionText" type="hidden" defaultValue="Cancel" aria-labelledby="Editor_CancelActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_CancelActionUrlLabel" htmlFor="Editor_CancelActionUrl" className="display-none">{"Editor_CancelActionUrl"}</label>
                <input id="Editor_CancelActionUrl" name="Editor.CancelActionUrl" type="hidden" defaultValue="/Home/MyHome/" aria-labelledby="Editor_CancelActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ConfirmDeleteMessageLabel" htmlFor="Editor_ConfirmDeleteMessage" className="display-none">{"Editor_ConfirmDeleteMessage"}</label>
                <input id="Editor_ConfirmDeleteMessage" name="Editor.ConfirmDeleteMessage" type="hidden" defaultValue="Are you sure you want to delete the ?" aria-labelledby="Editor_ConfirmDeleteMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DeleteActionTextLabel" htmlFor="Editor_DeleteActionText" className="display-none">{"Editor_DeleteActionText"}</label>
                <input id="Editor_DeleteActionText" name="Editor.DeleteActionText" type="hidden" defaultValue="Delete" aria-labelledby="Editor_DeleteActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DeletedMessageLabel" htmlFor="Editor_DeletedMessage" className="display-none">{"Editor_DeletedMessage"}</label>
                <input id="Editor_DeletedMessage" name="Editor.DeletedMessage" type="hidden" defaultValue=" was successfully deleted." aria-labelledby="Editor_DeletedMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DirectionLabel" htmlFor="Editor_Direction" className="display-none">{"Editor_Direction"}</label>
                <input id="Editor_Direction" name="Editor.Direction" type="hidden" defaultValue="Next" aria-labelledby="Editor_DirectionLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DirtyDataMessageLabel" htmlFor="Editor_DirtyDataMessage" className="display-none">{"Editor_DirtyDataMessage"}</label>
                <input id="Editor_DirtyDataMessage" name="Editor.DirtyDataMessage" type="hidden" defaultValue="Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?" aria-labelledby="Editor_DirtyDataMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_EntityNameLabel" htmlFor="Editor_EntityName" className="display-none">{"Editor_EntityName"}</label>
                <input id="Editor_EntityName" name="Editor.EntityName" type="hidden" defaultValue="" aria-labelledby="Editor_EntityNameLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt1EnabledLabel" htmlFor="Editor_IsAlt1Enabled" className="display-none">{"Editor_IsAlt1Enabled"}</label>
                <input id="Editor_IsAlt1Enabled" name="Editor.IsAlt1Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt1EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt2EnabledLabel" htmlFor="Editor_IsAlt2Enabled" className="display-none">{"Editor_IsAlt2Enabled"}</label>
                <input id="Editor_IsAlt2Enabled" name="Editor.IsAlt2Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt2EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt3EnabledLabel" htmlFor="Editor_IsAlt3Enabled" className="display-none">{"Editor_IsAlt3Enabled"}</label>
                <input id="Editor_IsAlt3Enabled" name="Editor.IsAlt3Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt3EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt4EnabledLabel" htmlFor="Editor_IsAlt4Enabled" className="display-none">{"Editor_IsAlt4Enabled"}</label>
                <input id="Editor_IsAlt4Enabled" name="Editor.IsAlt4Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt4EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt5EnabledLabel" htmlFor="Editor_IsAlt5Enabled" className="display-none">{"Editor_IsAlt5Enabled"}</label>
                <input id="Editor_IsAlt5Enabled" name="Editor.IsAlt5Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt5EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt6EnabledLabel" htmlFor="Editor_IsAlt6Enabled" className="display-none">{"Editor_IsAlt6Enabled"}</label>
                <input id="Editor_IsAlt6Enabled" name="Editor.IsAlt6Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt6EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt7EnabledLabel" htmlFor="Editor_IsAlt7Enabled" className="display-none">{"Editor_IsAlt7Enabled"}</label>
                <input id="Editor_IsAlt7Enabled" name="Editor.IsAlt7Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt7EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt8EnabledLabel" htmlFor="Editor_IsAlt8Enabled" className="display-none">{"Editor_IsAlt8Enabled"}</label>
                <input id="Editor_IsAlt8Enabled" name="Editor.IsAlt8Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt8EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsCancelEnabledLabel" htmlFor="Editor_IsCancelEnabled" className="display-none">{"Editor_IsCancelEnabled"}</label>
                <input id="Editor_IsCancelEnabled" name="Editor.IsCancelEnabled" type="hidden" defaultValue="True" aria-labelledby="Editor_IsCancelEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsDirtyDataEnabledLabel" htmlFor="Editor_IsDirtyDataEnabled" className="display-none">{"Editor_IsDirtyDataEnabled"}</label>
                <input id="Editor_IsDirtyDataEnabled" name="Editor.IsDirtyDataEnabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsDirtyDataEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsPrintEnabledLabel" htmlFor="Editor_IsPrintEnabled" className="display-none">{"Editor_IsPrintEnabled"}</label>
                <input id="Editor_IsPrintEnabled" name="Editor.IsPrintEnabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsPrintEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsProcessDirtyLabel" htmlFor="Editor_IsProcessDirty" className="display-none">{"Editor_IsProcessDirty"}</label>
                <input id="Editor_IsProcessDirty" name="Editor.IsProcessDirty" type="hidden" defaultValue="False" aria-labelledby="Editor_IsProcessDirtyLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsResetEnabledLabel" htmlFor="Editor_IsResetEnabled" className="display-none">{"Editor_IsResetEnabled"}</label>
                <input id="Editor_IsResetEnabled" name="Editor.IsResetEnabled" type="hidden" defaultValue="True" aria-labelledby="Editor_IsResetEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ModeLabel" htmlFor="Editor_Mode" className="display-none">{"Editor_Mode"}</label>
                <input id="Editor_Mode" name="Editor.Mode" type="hidden" defaultValue="Create" aria-labelledby="Editor_ModeLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_NextActionTextLabel" htmlFor="Editor_NextActionText" className="display-none">{"Editor_NextActionText"}</label>
                <input id="Editor_NextActionText" name="Editor.NextActionText" type="hidden" defaultValue="Next" aria-labelledby="Editor_NextActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_PrevActionTextLabel" htmlFor="Editor_PrevActionText" className="display-none">{"Editor_PrevActionText"}</label>
                <input id="Editor_PrevActionText" name="Editor.PrevActionText" type="hidden" defaultValue="Prev" aria-labelledby="Editor_PrevActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_PrintActionTextLabel" htmlFor="Editor_PrintActionText" className="display-none">{"Editor_PrintActionText"}</label>
                <input id="Editor_PrintActionText" name="Editor.PrintActionText" type="hidden" defaultValue="" aria-labelledby="Editor_PrintActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_PrintActionUrlLabel" htmlFor="Editor_PrintActionUrl" className="display-none">{"Editor_PrintActionUrl"}</label>
                <input id="Editor_PrintActionUrl" name="Editor.PrintActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_PrintActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ResetActionTextLabel" htmlFor="Editor_ResetActionText" className="display-none">{"Editor_ResetActionText"}</label>
                <input id="Editor_ResetActionText" name="Editor.ResetActionText" type="hidden" defaultValue="Reset" aria-labelledby="Editor_ResetActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_SaveActionTextLabel" htmlFor="Editor_SaveActionText" className="display-none">{"Editor_SaveActionText"}</label>
                <input id="Editor_SaveActionText" name="Editor.SaveActionText" type="hidden" defaultValue="Search" aria-labelledby="Editor_SaveActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_SavedMessageLabel" htmlFor="Editor_SavedMessage" className="display-none">{"Editor_SavedMessage"}</label>
                <input id="Editor_SavedMessage" name="Editor.SavedMessage" type="hidden" defaultValue=" was successfully saved." aria-labelledby="Editor_SavedMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ShowSummaryErrorLabel" htmlFor="Editor_ShowSummaryError" className="display-none">{"Editor_ShowSummaryError"}</label>
                <input id="Editor_ShowSummaryError" name="Editor.ShowSummaryError" type="hidden" defaultValue="True" aria-labelledby="Editor_ShowSummaryErrorLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_StepLabel" htmlFor="Editor_Step" className="display-none">{"Editor_Step"}</label>
                <input id="Editor_Step" name="Editor.Step" type="hidden" defaultValue="1" aria-labelledby="Editor_StepLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_StepCountLabel" htmlFor="Editor_StepCount" className="display-none">{"Editor_StepCount"}</label>
                <input id="Editor_StepCount" name="Editor.StepCount" type="hidden" defaultValue="1" aria-labelledby="Editor_StepCountLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_TitleFormatTextLabel" htmlFor="Editor_TitleFormatText" className="display-none">{"Editor_TitleFormatText"}</label>
                <input id="Editor_TitleFormatText" name="Editor.TitleFormatText" type="hidden" defaultValue="{0} {1} - Step {2} of {3}" aria-labelledby="Editor_TitleFormatTextLabel" aria-hidden="false" style={{}} />{" "}<div id="modelEditorButtonRow" className="editor-button-row-parent">{" "}<div className="editor-button-nav-left">{" "}<label id="prevButtonLabel" htmlFor="prevButton" className="display-none">{"Prev"}</label>
                    <input id="prevButton" type="button" className="k-button btn-spacer-right" value="Prev" aria-labelledby="prevButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="prevButton" />{" "}<label id="resetButtonLabel" htmlFor="resetButton" className="display-none">{"Reset"}</label>
                    <input id="resetButton" type="button" className="k-button btn-spacer-right" value="Reset" aria-labelledby="resetButtonLabel" aria-hidden="false" style={{}} data-kit-action="reset" data-testid="resetButton" />{" "}<label id="alt1ButtonLabel" htmlFor="alt1Button" className="display-none">{"Alt1"}</label>
                    <input id="alt1Button" type="button" className="k-button btn-spacer-right" value="Alt1" aria-labelledby="alt1ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt1Button" />{" "}<label id="alt4ButtonLabel" htmlFor="alt4Button" className="display-none">{"Alt4"}</label>
                    <input id="alt4Button" type="button" className="k-button btn-spacer-right" value="Alt4" aria-labelledby="alt4ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt4Button" />{" "}<label id="alt5ButtonLabel" htmlFor="alt5Button" className="display-none">{"Alt5"}</label>
                    <input id="alt5Button" type="button" className="k-button btn-spacer-right" value="Alt5" aria-labelledby="alt5ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt5Button" />{" "}<label id="alt6ButtonLabel" htmlFor="alt6Button" className="display-none">{"Alt6"}</label>
                    <input id="alt6Button" type="button" className="k-button btn-spacer-right" value="Alt6" aria-labelledby="alt6ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt6Button" />{" "}<label id="alt7ButtonLabel" htmlFor="alt7Button" className="display-none">{"Alt7"}</label>
                    <input id="alt7Button" type="button" className="k-button btn-spacer-right" value="Alt7" aria-labelledby="alt7ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt7Button" />{" "}<label id="alt8ButtonLabel" htmlFor="alt8Button" className="display-none">{"Alt8"}</label>
                    <input id="alt8Button" type="button" className="k-button btn-spacer-right" value="Alt8" aria-labelledby="alt8ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt8Button" />{" "}<label id="printButtonLabel" htmlFor="printButton" className="display-none">{"Print"}</label>
                    <input id="printButton" type="button" className="k-button" value="Print" aria-labelledby="printButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="printButton" />{" "}</div>{" "}<div className="editor-button-nav-right">{" "}<label id="alt2ButtonLabel" htmlFor="alt2Button" className="display-none">{"Alt2"}</label>
                    <input id="alt2Button" type="button" className="k-button" value="Alt2" aria-labelledby="alt2ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt2Button" />{" "}<label id="alt3ButtonLabel" htmlFor="alt3Button" className="display-none">{"Alt3"}</label>
                    <input id="alt3Button" type="button" className="k-button btn-spacer-left" value="Alt3" aria-labelledby="alt3ButtonLabel" aria-hidden="false" style={{"display": "none"}} data-testid="alt3Button" />{" "}<label id="cancelButtonLabel" htmlFor="cancelButton" className="display-none">{"Cancel"}</label>
                    <input id="cancelButton" type="button" className="k-button btn-spacer-left" value="Cancel" aria-labelledby="cancelButtonLabel" aria-hidden="false" style={{}} data-kit-action="cancel" data-testid="cancelButton" />{" "}<label id="nextButtonLabel" htmlFor="nextButton" className="display-none">{"Search"}</label>
                    <input id="nextButton" type="button" className="k-button btn-spacer-left" value="Search" aria-labelledby="nextButtonLabel" aria-hidden="false" style={{}} data-kit-action="search" data-testid="nextButton" />{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}<div className="clear-n-pad"></div>{" "}<div id="searchFileTrackingResultsPanel" style={{"display": "none"}} data-kit-h="h13">{" "}<div className="row">{" "}<div className="content-panel-container" id="searchFileTrackingGrid">{" "}<div className="content-panel-hdr">{"\n                        Search Results\n                    "}</div>{" "}<div id="searchFileTrackingGridInfo" className="content-panel-bdy">{" "}<KitWidget id="k9" />{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</form>{" "}</main></KitScreen></>
  );
}
