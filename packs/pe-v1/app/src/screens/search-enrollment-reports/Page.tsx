// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, type KitData } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/search-enrollment-reports';

// pe-v1/search-enrollment-reports: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function SearchEnrollmentReportsPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "Search Enrollment Reports";
    body.className = "ProviderEnrollment SearchEnrollmentReports";
    html.className = "k-webkit k-webkit157";
    body.setAttribute('style', "padding-top: 62px;");
    return () => {
      style.remove();
      undo.forEach((f) => f());
      [document.title, body.id, body.className, html.className] = prev;
      if (prev[4] === null) body.removeAttribute('style'); else body.setAttribute('style', prev[4]);
    };
  }, []);

  return (
    <><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/ProviderEnrollment/SearchEnrollmentReports" id="EnrollmentReportSearchForm" method="post" name="EnrollmentReportSearchForm" data-role="validator" noValidate={true}>
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="6O67yy3ILqQfcHM8R0wnIyUK_pgchZbySQYBgF6RiQsFhn2aAWCehlPNvtC-POtKQXQAo4EoxiGZDppY4WH1TY0OdFpx_zUhs5E627hc6Q1H5hJSF_l6cql220A9zEcOro3TrqFaOeNPcy_GgRl4Aw2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" style={{"display": "none"}} data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="container">{" "}<div className="row">{" "}<fieldset>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">
              <span className="clickable editor-req-fields fa-solid fa-asterisk" title="Panel contains one or more required fields." data-role="tooltip" data-kit-tip="Panel contains one or more required fields." data-kit-tip-pos="top" data-kit-tip-after="100"></span>{"\n                        Search Enrollment Reports\n                    "}</div>{" "}<div id="PlusMinusSearchEnrollmentReport" className="content-panel-hdr-tools">{" "}<div className="content-ordered-panel-hdr-tools">
                <div className="panel-icon clickable" data-kit-action="collapse" data-testid="button-22">{" "}<div id="searchCriteriaPanelIcon" className="fa-solid fa-angle-up" title="Collapse" tabIndex={0} data-testid="searchCriteriaPanelIcon"></div>{" "}</div>
                </div>
              </div>{" "}<div id="SearchEnrollmentReport" className="content-panel-bdy" data-kit-collapse="open">{" "}<div className="editor-req-field-row">{"Required Fields ( "}<span className="editor-req-field fa-solid fa-asterisk"></span>{")"}</div>{" "}<div className="panel-body">{" "}<div className="rowpad">{" "}<p>{"Complete the necessary criteria for the chosen search(s)."}</p>
                  <br />{" "}<p>{"Note: The name of the report file is displayed as Module Name, Timestamp in YYYYMMDDHHMMSS format, and the Report Name. The latest generated file is displayed at the top. "}</p>{" "}</div>{" "}<div>{" "}<div className="col-md-3 editor-col" id="FromDate_parent" data-template="">
                    <div className="editor-label">
                      <span className="clickable editor-req-field fa-solid fa-asterisk" title="From Date is a required field." data-role="tooltip" data-kit-tip="From Date is a required field." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="button-from-date-is-a-required-field"></span>
                      <label htmlFor="FromDate" id="FromDateLabel" title="From Date">{"From Date"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FromDateHelp" role="img" title="Select From Date to display the exported excel" data-role="tooltip" data-kit-tip="Select From Date to display the exported excel" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FromDateHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k1" />
                      <span className="k-invalid-msg" id="FromDate_validationMessage" data-for="FromDate"></span>
                      <span id="FromDateHelpDesc" hidden={true}>{"Select From Date to display the exported excel"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="ToDate_parent" data-template="">
                    <div className="editor-label">
                      <span className="clickable editor-req-field fa-solid fa-asterisk" title="To Date is a required field." data-role="tooltip" data-kit-tip="To Date is a required field." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="button-to-date-is-a-required-field"></span>
                      <label htmlFor="ToDate" id="ToDateLabel" title="To Date">{"To Date"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ToDateHelp" role="img" title="Select To Date to display the exported excel" data-role="tooltip" data-kit-tip="Select To Date to display the exported excel" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ToDateHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k2" />
                      <span className="k-invalid-msg" id="ToDate_validationMessage" data-for="ToDate"></span>
                      <span id="ToDateHelpDesc" hidden={true}>{"Select To Date to display the exported excel"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="UserId_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="UserId" id="UserIdLabel" title="User ID">{"User ID"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="UserIdHelp" role="img" title="User ID" data-role="tooltip" data-kit-tip="User ID" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="UserIdHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="User ID has a maximum length of 200 characters." data-val-regex="User ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="UserId" ignoredirtydata="False" maxLength={200} name="UserId" not-data-val-required="User ID is a required field." defaultValue="useradmin1" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="UserIdLabel UserIdHelpDesc" aria-hidden="false" style={{"width": "100%"}} data-testid="UserId" />
                        </span>{" "}<span className="k-invalid-msg" id="UserId_validationMessage" data-for="UserId"></span>
                      <span id="UserIdHelpDesc" hidden={true}>{"User ID"}</span>
                      </div>
                    </div>{" "}</div>{" "}<div className="editor-button-row">{" "}<span className="editor-button-nav">{" "}<label id="clearButtonLabel" htmlFor="clearButton" className="display-none">{"Clear"}</label>
                    <input id="clearButton" type="button" className="k-button btn-spacer-right" value="Clear" aria-labelledby="clearButtonLabel" aria-hidden="false" data-kit-action="reset" style={{}} data-testid="clearButton" />{" "}<label id="searchButtonLabel" htmlFor="searchButton" className="display-none">{"Search"}</label>
                    <input id="searchButton" type="button" className="k-button primary-button" value="Search" aria-labelledby="searchButtonLabel" aria-hidden="false" data-kit-action="search" style={{}} data-testid="searchButton" />{" "}</span>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}<div className="container">{" "}<div id="bnrresultsGrid" className="display-none" data-kit-h="h2" style={{"display": "none"}}>{" "}<div className="row">{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                        Search Results\n                    "}</div>{" "}<div id="EnrollmentReportStatus"></div>{" "}<div className="content-panel-bdy">{" "}<KitWidget id="k3" />{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</form>{" "}<form id="downloadFileForm" method="post" action="/api/ProviderEnrollment/GetFile/" style={{"display": "none"}}>
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text-3" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-4" />{" "}<input name="__RequestVerificationToken" type="hidden" defaultValue="vyKJm_EYCOnJVA6mMLLHnsn1KrLO7HZ9-caBPJVeWYERsSDJcBpQhkOQ2n5BdhSL8NX8MNgKLDmv40wO6C9xvaI88S98gpVP4kXwwB2LVk6E0WKsudm3QpnCf1XOp_OCYi58s_9hvMPubWRRmRNrtg2" style={{}} />{" "}<label id="downloadFileIdLabel" htmlFor="downloadFileId" className="display-none">{"downloadFileId"}</label>
    <input type="hidden" id="downloadFileId" name="fileId" aria-labelledby="downloadFileIdLabel" defaultValue="" style={{}} />{" "}</form>{" "}</main></KitScreen></>
  );
}
