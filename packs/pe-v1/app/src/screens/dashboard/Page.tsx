// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, type KitData } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/dashboard';

// pe-v1/dashboard: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function DashboardPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "Provider Enrollment";
    body.className = "ProviderEnrollment Dashboard";
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
    <><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/ProviderEnrollment/Dashboard" id="EnrollmentDashboardForm" method="post" name="EnrollmentDashboardForm">
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="2fh-tf2ZNgM-5IRZS4dqeObcFNx6d4sl_RW3Zn8ESpolDva0jnAPXj17Yc8o0Tx0QBC-n9zS61iNflARf4-4Tfzs_W0A1jJ0vzcMM61Ts4Ab5jz31Kr8Eaama4W4cFi79UH1rXhmZD2pqwAbIfcEqA2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" style={{"display": "none"}} data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="row">{" "}<div id="DashboardStatus"></div>{" "}<div id="buttonRow" className="align-right">{" "}<label id="savePreferencesButtonLabel" htmlFor="savePreferencesButton" className="display-none">{"Save Preferences"}</label>
        <input id="savePreferencesButton" type="button" className="k-button primary-button" value="Save Preferences" aria-labelledby="savePreferencesButtonLabel" style={{"display": "none"}} data-testid="savePreferencesButton" />{" "}<i className="fa-solid fa-gear fa-2x clickable extprtlprv-int-detail-menu-back caret-active-module" id="settingPreferencesButton" aria-hidden="true" data-testid="settingPreferencesButton"></i>{" "}</div>{" "}<div className="row">{" "}<div id="ProviderEnrollmentDashboard" className="dashboard paddingTop15px col-md-8">{" "}<div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="07f9f9c0-d730-4d9c-821b-722cd0e2124e" data-testid="07f9f9c0-d730-4d9c-821b-722cd0e2124e">
            <a className="dshbrd-link-panes clickable" href="/ProviderEnrollment/Dashboard" data-testid="link-dashboard-8">
              <span className="dshbrd-link-txt">{"Dashboard"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-30b2-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-30b2-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="/ProviderEnrollment/SearchProviderApplication" data-testid="link-search-enrollment-application-2">
              <span className="dshbrd-link-txt">{"Search Enrollment Application"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="37791c1b-823b-438f-bc52-c5bfa08c88f5" data-testid="37791c1b-823b-438f-bc52-c5bfa08c88f5">
            <a className="dshbrd-link-panes clickable" href="/ProviderEnrollment/SearchEnrollmentReports" data-testid="link-search-enrollment-reports-2">
              <span className="dshbrd-link-txt">{"Search Enrollment Reports"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-afb8-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-afb8-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/dashboard" data-testid="link-workflow-dashboard-2">
              <span className="dshbrd-link-txt">{"Workflow Dashboard"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-b0b8-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-b0b8-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/applications" data-testid="link-workflow-applications-2">
              <span className="dshbrd-link-txt">{"Workflow Applications"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-b1b8-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-b1b8-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/configuration" data-testid="link-workflow-configuration-2">
              <span className="dshbrd-link-txt">{"Workflow Configuration"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-adb8-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-adb8-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="https://apnmc.shared.tst.pgwcloud.net/suite/sites/provider-enrollment-review/page/tasks" data-testid="link-workflow-tasks-2">
              <span className="dshbrd-link-txt">{"Workflow Tasks"}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-66b8-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-66b8-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="/ProviderEnrollment/CreateSecureEnrollment" data-testid="link-new-enrollment-entry-2">
              <span className="dshbrd-link-txt">{"New Enrollment Entry "}</span>
              </a>
            </div>
          <div className="row float-left ui-draggable ui-draggable-handle ui-droppable" id="51c9bb65-91b8-69e0-e053-4c65a28f8a9e" data-testid="51c9bb65-91b8-69e0-e053-4c65a28f8a9e">
            <a className="dshbrd-link-panes clickable" href="/ProviderEnrollment/ResumeSecureEnrollment" data-testid="link-resume-enrollment-entry-2">
              <span className="dshbrd-link-txt">{"Resume Enrollment Entry"}</span>
              </a>
            </div>
          </div>{" "}<div className="col-md-3 float-right">{" "}<input name="__RequestVerificationToken" type="hidden" defaultValue="IlHBOZXq3DNnIoMtFR2TDjSrvOcjyf-PZ_E0qW86A1elBa-0YsLfaR9fs3Hs_VgKjOxVZKYDpIbYjFtJUvm5p8E-2pO1KLxuj6jq5oh328TJIJAsJ-LnrtQ6aC2kEiQa0GQBAExbFXFzF0hwnJrVNA2" style={{}} />{" "}<div className="row">{" "}<div className="dshbrd-panel-container">{" "}<div className="dshbrd-panel-hdr">{" "}<div className="dshbrd-icon-status">{" "}<span className="dshbrd-panel-hdr-lbl">{"Status"}</span>{" "}</div>{" "}</div>{" "}<div className="dshbrd-panel-bdy">{" "}<div className="panel-body" id="recentlySubmitted" data-testid="recentlySubmitted">{" "}<ul className="unordered-list-container-horz">{" "}<li className="dshbrd-panel-list-item">{" "}<a id="2" data-testid="2">{"Submitted - 31"}</a>{" "}</li>{" "}<li className="dshbrd-panel-list-item">{" "}<a id="1" data-testid="1">{"Pending - 770"}</a>{" "}</li>{" "}<li className="dshbrd-panel-list-item">{" "}<a id="6" data-testid="6">{"Return To Provider - 38"}</a>{" "}</li>{" "}<li className="dshbrd-panel-list-item">{" "}<a id="8" data-testid="8">{"Waiting for Attachments - 15"}</a>{" "}</li>{" "}</ul>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<br />{" "}<input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" />
          <input style={{"display": "none"}} type="password" name="fakepasswordremembered" />
          <input name="__RequestVerificationToken" type="hidden" defaultValue="pBn97PHt39Wp-pV2r1thK1G03nf9ugVsCfDPvaPtGv1MuGXhulg1P33OfeMntdsmLL18NR-4vW8K0kJlEKzmC87r5d8Rx09S0SOztM8CeYCdHBs8Wy4o39ZnzEfgaERpd3Sr5yscNW4RPabeqD020g2" style={{}} />{" "}<div className="row">{" "}<fieldset>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                    Quick Search\n                "}</div>{" "}<div className="content-panel-bdy">{" "}<div className="panel-body">{" "}<div id="quickSearch">{" "}<div className="editor-field">{" "}<div className="editor-col editor-clear" id="ATN_parent" data-template="">
                          <div className="editor-label">
                            <label htmlFor="ATN" id="ATNLabel" title="ATN">{"ATN"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ATNHelp" role="img" title="The ATN is a unique number assigned to an enrollment application initiated by a provider." data-role="tooltip" data-kit-tip="The ATN is a unique number assigned to an enrollment application initiated by a provider." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ATNHelp"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="ATN has a maximum length of 10 characters." data-val-number="ATN is restricted to numeric characters only [0-9]." data-val-regex="ATN is restricted to numeric characters only [0-9]." data-val-regex-pattern="^([0-9])*$" height="0" id="ATN" ignoredirtydata="False" maxLength={10} name="ATN" not-data-val-required="ATN is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="ATNLabel ATNHelpDesc" style={{"width": "100%"}} defaultValue="" data-testid="ATN" />
                              </span>
                            <span className="k-invalid-msg" id="ATN_validationMessage" data-for="ATN"></span>
                            <span id="ATNHelpDesc" hidden={true} data-kit-h="h2">{"The ATN is a unique number assigned to an enrollment application initiated by a provider."}</span>
                            </div>
                          </div>{" "}<div className="editor-col editor-clear" id="LastName_parent" data-template="">
                          <div className="editor-label">
                            <label htmlFor="LastName" id="LastNameLabel" title="Last Name">{"Last Name"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="LastNameHelp" role="img" title="Enter the Last Name." data-role="tooltip" data-kit-tip="Enter the Last Name." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="LastNameHelp"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="Last Name has a maximum length of 50 characters." data-val-regex="Last Name contains invalid characters: Must start with a letter. Allowed characters: letters, single spaces, and [' , . -]." data-val-regex-pattern="^([[a-zA-Z'.,\\-]+(?: [a-zA-Z'.,\\-]+)*|[^\\x00-\\x7F])*$" height="0" id="LastName" ignoredirtydata="False" maxLength={50} name="LastName" not-data-val-required="Last Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="LastNameLabel LastNameHelpDesc" style={{"width": "100%"}} defaultValue="" data-testid="LastName" />
                              </span>
                            <span className="k-invalid-msg" id="LastName_validationMessage" data-for="LastName"></span>
                            <span id="LastNameHelpDesc" hidden={true} data-kit-h="h3">{"Enter the Last Name."}</span>
                            </div>
                          </div>{" "}<div className="editor-col editor-clear" id="BusinessName_parent" data-template="">
                          <div className="editor-label">
                            <label htmlFor="BusinessName" id="BusinessNameLabel" title="Business Name">{"Business Name"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="BusinessNameHelp" role="img" title="Enter Business Name" data-role="tooltip" data-kit-tip="Enter Business Name" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="BusinessNameHelp"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="Business Name has a maximum length of 50 characters." data-val-regex="Business Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % and Unicode are not allowed." data-val-regex-pattern="^[A-Za-z0-9 `!@#$&amp;()_+\\-={}|[\\]\\&quot;',.\\/?]+$" height="0" id="BusinessName" ignoredirtydata="False" maxLength={50} name="BusinessName" not-data-val-required="Business Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="BusinessNameLabel BusinessNameHelpDesc" style={{"width": "100%"}} defaultValue="" data-testid="BusinessName" />
                              </span>
                            <span className="k-invalid-msg" id="BusinessName_validationMessage" data-for="BusinessName"></span>
                            <span id="BusinessNameHelpDesc" hidden={true} data-kit-h="h4">{"Enter Business Name"}</span>
                            </div>
                          </div>{" "}<div className="editor-col" id="NPI_parent" data-template="NPI">
                          <div className="editor-label">
                            <label htmlFor="NPI" id="NPILabel" title="NPI ">{"NPI "}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="NPIHelp" role="img" title="Enter the ten digit National Provider Identifier as printed on the NPPES letter." data-role="tooltip" data-kit-tip="Enter the ten digit National Provider Identifier as printed on the NPPES letter." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="NPIHelp"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-maskedtextbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner k-widget" data-val-length-max="NPI  has a maximum length of 10 characters." data-val-number="NPI  is restricted to numeric characters only [0-9]." data-val-regex="NPI  is restricted to numeric characters only [0-9]." data-val-regex-pattern="^([0-9])*$" height="0" id="NPI" ignoredirtydata="False" name="NPI" not-data-val-required="NPI  is a required field." data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="0000000000" aria-labelledby="NPILabel NPIHelpDesc" style={{"width": "100%"}} defaultValue="" data-testid="NPI" />
                              </span>
                            <span className="k-invalid-msg" id="NPI_validationMessage" data-for="NPI"></span>
                            <span id="NPIHelpDesc" hidden={true} data-kit-h="h5">{"Enter the ten digit National Provider Identifier as printed on the NPPES letter."}</span>
                            </div>
                          </div>{" "}</div>{" "}<div className="editor-button-row">{" "}<span className="editor-button-nav">{" "}<label id="clearButtonLabel" htmlFor="clearButton" className="display-none">{"Clear"}</label>
                          <input id="clearButton" type="button" className="k-button btn-spacer-right" value="Clear" aria-labelledby="clearButtonLabel" data-kit-action="reset" style={{}} data-testid="clearButton" />{" "}<label id="searchButtonLabel" htmlFor="searchButton" className="display-none">{"Search"}</label>
                          <input id="searchButton" type="button" className="k-button primary-button" value="Search" aria-labelledby="searchButtonLabel" data-kit-action="search" style={{}} data-testid="searchButton" />{" "}</span>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}</div>{" "}</div>
    </form>{" "}<br />{" "}<div className="row">{" "}<form action="/ProviderEnrollment/Dashboard" method="post">
      <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text-5" />
      <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-6" />
      <input name="__RequestVerificationToken" type="hidden" defaultValue="m4-ChKHesTKbeiq_LjoSc6cpd8D0zWb1Lcel1RgUnNv0d0u0DIAr7RriexVHDCakHFvLn7ORupAyt16vIwDVy1C9V8LkvwgygumTrLhZgNqFT6HlXMEMawNax7m5esAV1reDJ0eDcUjRNVNBQ3lmmQ2" style={{}} />{" "}<div id="searchResultsGrid">{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr" id="searchResultHeader">{"\n                Search Results\n            "}</div>{" "}<div className="content-panel-bdy">{" "}<div id="ProviderEnrollmentSearchStatus"></div>{" "}<KitWidget id="k1" />{" "}</div>{" "}</div>{" "}</div>{" "}</form>{" "}</div>{" "}</main></KitScreen></>
  );
}
