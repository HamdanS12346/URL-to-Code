// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, type KitData } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/search-claims';
import SearchClaimsBehavior from './components/SearchClaimsBehavior';

// claims-mgmt-v1/search-claims: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function SearchClaimsPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "Search Claims";
    body.className = "ClaimsManagement SearchClaims";
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
    <><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><SearchClaimsBehavior /><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/ClaimsManagement/SearchClaims" className="k-content" id="ClaimsSearchForm" method="post" name="ClaimsSearchForm" data-role="validator" noValidate={true}>
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="HF92zdWAdvIIydRBxWKta6hpS9CY88ZlbjkNme8qJccowQhX1YlICXx8mMp8-xoVnWEBWXPS-ZDzEaVuL3xYmuQUMn7ShQt3gmTm1tOwAKk6ZvBFYsM2nlkhDMYkgXLkWLdQU0SafQxbJePzaJslUw2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" style={{"display": "none"}} data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="container">{" "}<div className="row">{" "}<fieldset data-role="validator">{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">
              <span className="clickable editor-req-fields fa-solid fa-asterisk" title="Panel contains one or more required fields." data-role="tooltip" data-kit-tip="Panel contains one or more required fields." data-kit-tip-pos="top" data-kit-tip-after="100"></span>{"\n                        Search Criteria\n                    "}</div>{" "}<div className="content-panel-hdr-tools toc-progress-label">{" "}<span id="plusMinusSearchClaimsClick" className="pull-right clickable toc-progress-label" data-testid="plusMinusSearchClaimsClick">
                <i id="plusMinusSearchClaims" className="fa-solid fa-square-minus"></i>
                </span>{" "}<div className="content-ordered-panel-hdr-tools"></div>
              </div>{" "}<div id="divSearchClaims" className="content-panel-bdy extprtlprv-int-detail-page-banner-date-separator">{" "}<div className="editor-req-field-row">{"Required Fields ( "}<span className="editor-req-field fa-solid fa-asterisk"></span>{")"}</div>{" "}<div className="panel-body">{" "}<div id="searchClaimStatus"></div>{" "}<div className="editor-section">{" "}<div id="divClaimsIdentifierAssocBox" className="cellleft col-md-2 toc-progress-label">{" "}<div className="row">{" "}<div className="col-md-12 editor-col editor-clear" id="ClaimIdentifiersList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="ClaimIdentifiers" id="ClaimIdentifiersLabel" title="Search By">{"Search By"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ClaimIdentifiersHelp" role="img" title="Search for claims by ICN, TCN, or MCO ICN." data-role="tooltip" data-kit-tip="Search for claims by ICN, TCN, or MCO ICN." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ClaimIdentifiersHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k1" />{" "}<label id="ClaimIdentifiers_IDLabel" htmlFor="ClaimIdentifiers_ID" className="display-none">{"ClaimIdentifiers_ID"}</label>
                          <input id="ClaimIdentifiers_ID" name="ClaimIdentifiers.ID" type="hidden" defaultValue="" aria-labelledby="ClaimIdentifiers_IDLabel" style={{}} />{" "}<label id="ClaimIdentifiers_NameLabel" htmlFor="ClaimIdentifiers_Name" className="display-none">{"ClaimIdentifiers_Name"}</label>
                          <input id="ClaimIdentifiers_Name" name="ClaimIdentifiers.Name" type="hidden" defaultValue="" aria-labelledby="ClaimIdentifiers_NameLabel" style={{}} />{" "}<label id="ClaimIdentifiers_DisplayFormatLabel" htmlFor="ClaimIdentifiers_DisplayFormat" className="display-none">{"ClaimIdentifiers_DisplayFormat"}</label>
                          <input id="ClaimIdentifiers_DisplayFormat" name="ClaimIdentifiers.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ClaimIdentifiers_DisplayFormatLabel" style={{}} />
                          <span className="k-invalid-msg" id="ClaimIdentifiersList_validationMessage" data-for="ClaimIdentifiersList"></span>
                          <span id="ClaimIdentifiersHelpDesc" hidden={true} data-kit-h="h2">{"Search for claims by ICN, TCN, or MCO ICN."}</span>
                          </div>
                        </div>{" "}<input id="ClaimIdentifiers_Name" name="ClaimIdentifiers.Name" type="hidden" defaultValue="" style={{}} />{" "}</div>{" "}<div className="row">{" "}<div id="divClaimIdentifiersList_ICN" data-kit-h="h3" style={{"display": "none"}}>{" "}<div className="col-md-12 editor-col editor-clear" id="SearchICN_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="SearchICN" id="SearchICNLabel" title="ICN">{"ICN"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="SearchICNHelp" role="img" title="Internal Claim Number assigned by Claims Management. " data-role="tooltip" data-kit-tip="Internal Claim Number assigned by Claims Management." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="SearchICNHelp"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="ICN has a maximum length of 15 characters." data-val-regex="ICN contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="SearchICN" ignoredirtydata="False" maxLength={15} name="ICN" not-data-val-required="ICN is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="SearchICNLabel SearchICNHelpDesc" defaultValue="" data-testid="SearchICN" />
                              </span>{" "}<span className="k-invalid-msg" id="SearchICN_validationMessage" data-for="ICN"></span>
                            <span id="SearchICNHelpDesc" hidden={true}>{"Internal Claim Number assigned by Claims Management. "}</span>
                            </div>
                          </div>{" "}</div>{" "}<div id="divClaimIdentifiersList_TCN" style={{"display": "none"}} data-kit-h="h4">{" "}<div className="col-md-12 editor-col editor-clear" id="TCN_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="TCN" id="TCNLabel" title="TCN">{"TCN"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TCNHelp" role="img" title="This is the transaction control number (TCN) which uniquely identifies a legacy claim." data-role="tooltip" data-kit-tip="This is the transaction control number (TCN) which uniquely identifies a legacy claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="TCNHelp"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="TCN has a maximum length of 15 characters." data-val-regex="TCN contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="TCN" ignoredirtydata="False" maxLength={15} name="TCN" not-data-val-required="TCN is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="TCNLabel TCNHelpDesc" defaultValue="" data-testid="TCN" />
                              </span>{" "}<span className="k-invalid-msg" id="TCN_validationMessage" data-for="TCN"></span>
                            <span id="TCNHelpDesc" hidden={true}>{"This is the transaction control number (TCN) which uniquely identifies a legacy claim."}</span>
                            </div>
                          </div>{" "}</div>{" "}<div id="divClaimIdentifierscList_MCOICN" style={{"display": "none"}} data-kit-h="h5">{" "}<div className="col-md-12 editor-col editor-clear" id="MCOICN_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="MCOICN" id="MCOICNLabel" title="MCO ICN">{"MCO ICN"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="MCOICNHelp" role="img" title="This is the MCO assigned internal claim number for the encounter." data-role="tooltip" data-kit-tip="This is the MCO assigned internal claim number for the encounter." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="MCOICNHelp"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="MCO ICN has a maximum length of 15 characters." data-val-regex="MCO ICN contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="MCOICN" ignoredirtydata="False" maxLength={15} name="MCOICN" not-data-val-required="MCO ICN is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="MCOICNLabel MCOICNHelpDesc" defaultValue="" data-testid="MCOICN" />
                              </span>{" "}<span className="k-invalid-msg" id="MCOICN_validationMessage" data-for="MCOICN"></span>
                            <span id="MCOICNHelpDesc" hidden={true}>{"This is the MCO assigned internal claim number for the encounter."}</span>
                            </div>
                          </div>{" "}</div>{" "}</div>{" "}</div>{" "}<div id="divDateTypeAssocBox" className="col-md-3 toc-progress-label assoc-box">{" "}<div className="row">{" "}<div className="col-md-12 editor-col editor-clear" id="DateType_parent" data-template="ListItemSingleNoSelectAValue">
                        <div className="editor-label">
                          <label htmlFor="DateType" id="DateTypeLabel" title="Choose Date Type">{"Choose Date Type"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="DateTypeHelp" role="img" title="Search for claims by date of service (DOS), date received, or date paid. " data-role="tooltip" data-kit-tip="Search for claims by date of service (DOS), date received, or date paid." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="DateTypeHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k2" />{" "}<label id="DateType_IDLabel" htmlFor="DateType_ID" className="display-none">{"DateType_ID"}</label>
                          <input id="DateType_ID" name="DateType.ID" type="hidden" defaultValue="DOS" aria-labelledby="DateType_IDLabel" style={{}} />{" "}<label id="DateType_NameLabel" htmlFor="DateType_Name" className="display-none">{"DateType_Name"}</label>
                          <input id="DateType_Name" name="DateType.Name" type="hidden" defaultValue="Service Date" aria-labelledby="DateType_NameLabel" style={{}} />{" "}<label id="DateType_DisplayFormatLabel" htmlFor="DateType_DisplayFormat" className="display-none">{"DateType_DisplayFormat"}</label>
                          <input id="DateType_DisplayFormat" name="DateType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="DateType_DisplayFormatLabel" style={{}} />{" "}<span className="k-invalid-msg" id="DateType_validationMessage" data-for="DateType"></span>
                          <span id="DateTypeHelpDesc" hidden={true} data-kit-h="h6">{"Search for claims by date of service (DOS), date received, or date paid. "}</span>
                          </div>
                        </div>{" "}<input id="DateType_Name" name="DateType.Name" type="hidden" defaultValue="" style={{}} />{" "}</div>{" "}<div id="divDatePanel" className="row" style={{}}>{" "}<div className="col-md-6 editor-col" id="FromDate_parent" data-template="Date">
                        <div className="editor-label">
                          <span className="clickable editor-req-field fa-solid fa-asterisk" title="Date From is a required field." data-role="tooltip" data-kit-tip="Date From is a required field." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="button-date-from-is-a-required-field"></span>
                          <label htmlFor="FromDate" id="FromDateLabel" title="Date From">{"Date From"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FromDateHelp" role="img" title="Beginning date range for date of service (DOS), date received, or date paid." data-role="tooltip" data-kit-tip="Beginning date range for date of service (DOS), date received, or date paid." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FromDateHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k3" />
                          <span className="k-invalid-msg" id="FromDate_validationMessage" data-for="FromDate" style={{"display": "none"}}></span>
                          <span id="FromDateHelpDesc" hidden={true} data-kit-h="h7">{"Beginning date range for date of service (DOS), date received, or date paid."}</span>
                          </div>
                        </div>{" "}<div className="col-md-6 editor-col" id="ToDate_parent" data-template="Date">
                        <div className="editor-label">
                          <span className="clickable editor-req-field fa-solid fa-asterisk" title="Date To is a required field." data-role="tooltip" data-kit-tip="Date To is a required field." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="button-date-to-is-a-required-field"></span>
                          <label htmlFor="ToDate" id="ToDateLabel" title="Date To">{"Date To"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ToDateHelp" role="img" title="Ending date range for date of service (DOS), date received, or date paid." data-role="tooltip" data-kit-tip="Ending date range for date of service (DOS), date received, or date paid." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ToDateHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k4" />
                          <span className="k-invalid-msg" id="ToDate_validationMessage" data-for="ToDate" style={{"display": "none"}}></span>
                          <span id="ToDateHelpDesc" hidden={true} data-kit-h="h8">{"Ending date range for date of service (DOS), date received, or date paid."}</span>
                          </div>
                        </div>{" "}</div>{" "}</div>{" "}<div id="divMemberByAssocBox" className="cellleft col-md-2 toc-progress-label">{" "}<div className="row">{" "}<div className="col-md-12 editor-col editor-clear" id="MemberByList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="MemberBy" id="MemberByLabel" title="Choose Member By">{"Choose Member By"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="MemberByHelp" role="img" title="Search for claims by Member ID, Member Name or Patient Account Number" data-role="tooltip" data-kit-tip="Search for claims by Member ID, Member Name or Patient Account Number" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="MemberByHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k5" />{" "}<label id="MemberBy_IDLabel" htmlFor="MemberBy_ID" className="display-none">{"MemberBy_ID"}</label>
                          <input id="MemberBy_ID" name="MemberBy.ID" type="hidden" defaultValue="" aria-labelledby="MemberBy_IDLabel" style={{}} />{" "}<label id="MemberBy_NameLabel" htmlFor="MemberBy_Name" className="display-none">{"MemberBy_Name"}</label>
                          <input id="MemberBy_Name" name="MemberBy.Name" type="hidden" defaultValue="" aria-labelledby="MemberBy_NameLabel" style={{}} />{" "}<label id="MemberBy_DisplayFormatLabel" htmlFor="MemberBy_DisplayFormat" className="display-none">{"MemberBy_DisplayFormat"}</label>
                          <input id="MemberBy_DisplayFormat" name="MemberBy.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="MemberBy_DisplayFormatLabel" style={{}} />
                          <span className="k-invalid-msg" id="MemberByList_validationMessage" data-for="MemberByList"></span>
                          <span id="MemberByHelpDesc" hidden={true} data-kit-h="h9">{"Search for claims by Member ID, Member Name or Patient Account Number"}</span>
                          </div>
                        </div>{" "}<input id="MemberBy_Name" name="MemberBy.Name" type="hidden" defaultValue="" style={{}} />{" "}</div>{" "}<div className="row">{" "}<div id="divMemberByList_MemberID" style={{"display": "none"}} data-kit-h="h10">{" "}<div className="col-md-12 editor-col" id="MemberID_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="MemberID" id="MemberIDLabel" title="Member ID">{"Member ID"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="MemberIDHelp" role="img" title="This is the Unique ID from the Member's HealthCare Card." data-role="tooltip" data-kit-tip="This is the Unique ID from the Member's HealthCare Card." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="MemberIDHelp"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-regex="Member ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="MemberID" ignoredirtydata="False" name="MemberID" not-data-val-required="Member ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="MemberIDLabel MemberIDHelpDesc" defaultValue="" data-testid="MemberID" />
                              </span>{" "}<span className="k-invalid-msg" id="MemberID_validationMessage" data-for="MemberID"></span>
                            <span id="MemberIDHelpDesc" hidden={true}>{"This is the Unique ID from the Member's HealthCare Card."}</span>
                            </div>
                          </div>{" "}</div>{" "}<div id="divMemberByList_MemberName" style={{"display": "none"}} data-kit-h="h11">{" "}<div className="col-md-12 editor-col" id="MemberName_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="MemberName" id="MemberNameLabel" title="Member Name">{"Member Name"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="MemberNameHelp" role="img" title="Full name of the Member associated with the Member ID." data-role="tooltip" data-kit-tip="Full name of the Member associated with the Member ID." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="MemberNameHelp"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-regex="Member Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="MemberName" ignoredirtydata="False" name="MemberName" not-data-val-required="Member Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="MemberNameLabel MemberNameHelpDesc" defaultValue="" data-testid="MemberName" />
                              </span>{" "}<span className="k-invalid-msg" id="MemberName_validationMessage" data-for="MemberName"></span>
                            <span id="MemberNameHelpDesc" hidden={true}>{"Full name of the Member associated with the Member ID."}</span>
                            </div>
                          </div>{" "}</div>{" "}<div id="divMemberByList_PatientAccNo" style={{"display": "none"}} data-kit-h="h12">{" "}<div className="col-md-12 editor-col" id="PatientAccountNumber_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="PatientAccountNumber" id="PatientAccountNumberLabel" title="Patient Acct">{"Patient Acct"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="PatientAccountNumberHelp" role="img" title={"\tIdentification for a member assigned by a provider."} data-role="tooltip" data-kit-tip="Identification for a member assigned by a provider." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="PatientAccountNumberHelp"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="Patient Acct has a maximum length of 50 characters." data-val-regex="Patient Acct contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="PatientAccountNumber" ignoredirtydata="False" maxLength={50} name="PatientAccountNumber" not-data-val-required="Patient Acct is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="PatientAccountNumberLabel PatientAccountNumberHelpDesc" defaultValue="" data-testid="PatientAccountNumber" />
                              </span>{" "}<span className="k-invalid-msg" id="PatientAccountNumber_validationMessage" data-for="PatientAccountNumber"></span>
                            <span id="PatientAccountNumberHelpDesc" hidden={true}>{"\tIdentification for a member assigned by a provider."}</span>
                            </div>
                          </div>{" "}</div>{" "}</div>{" "}</div>{" "}<div id="divClaimsAssocBox" className="row cellleft col-md-4 toc-progress-label">{" "}<div>{" "}<div className="col-md-6 editor-col" id="ProviderRoleList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="ProviderRole" id="ProviderRoleLabel" title="Choose Provider Role">{"Choose Provider Role"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderRoleHelp" role="img" title="Search for claims by billing provider, performing provider, or referring provider" data-role="tooltip" data-kit-tip="Search for claims by billing provider, performing provider, or referring provider" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderRoleHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k6" />{" "}<label id="ProviderRole_IDLabel" htmlFor="ProviderRole_ID" className="display-none">{"ProviderRole_ID"}</label>
                          <input id="ProviderRole_ID" name="ProviderRole.ID" type="hidden" defaultValue="" aria-labelledby="ProviderRole_IDLabel" style={{}} />{" "}<label id="ProviderRole_NameLabel" htmlFor="ProviderRole_Name" className="display-none">{"ProviderRole_Name"}</label>
                          <input id="ProviderRole_Name" name="ProviderRole.Name" type="hidden" defaultValue="" aria-labelledby="ProviderRole_NameLabel" style={{}} />{" "}<label id="ProviderRole_DisplayFormatLabel" htmlFor="ProviderRole_DisplayFormat" className="display-none">{"ProviderRole_DisplayFormat"}</label>
                          <input id="ProviderRole_DisplayFormat" name="ProviderRole.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ProviderRole_DisplayFormatLabel" style={{}} />
                          <span className="k-invalid-msg" id="ProviderRoleList_validationMessage" data-for="ProviderRoleList"></span>
                          <span id="ProviderRoleHelpDesc" hidden={true} data-kit-h="h13">{"Search for claims by billing provider, performing provider, or referring provider"}</span>
                          </div>
                        </div>{" "}<input id="ProviderRole_Name" name="ProviderRole.Name" type="hidden" defaultValue="" style={{}} />{" "}</div>{" "}<div id="divProviderByList" style={{"display": "none"}} data-kit-h="h14">{" "}<div className="col-md-6 editor-col " id="ProviderBy_parent" data-template="ListItemSingleNoSelectAValue">
                        <div className="editor-label">
                          <label htmlFor="ProviderBy" id="ProviderByLabel" title="Choose Provider By">{"Choose Provider By"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderByHelp" role="img" title="Search for claims by National Provider Number (NPI), Provider Location ID, Provider Name, Provider Tax ID, or Provider Taxonomy" data-role="tooltip" data-kit-tip="Search for claims by National Provider Number (NPI), Provider Location ID, Provider Name, Provider Tax ID, or Provider Taxonomy" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderByHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<KitWidget id="k7" />{" "}<label id="ProviderBy_IDLabel" htmlFor="ProviderBy_ID" className="display-none">{"ProviderBy_ID"}</label>
                          <input id="ProviderBy_ID" name="ProviderBy.ID" type="hidden" defaultValue="" aria-labelledby="ProviderBy_IDLabel" style={{}} />{" "}<label id="ProviderBy_NameLabel" htmlFor="ProviderBy_Name" className="display-none">{"ProviderBy_Name"}</label>
                          <input id="ProviderBy_Name" name="ProviderBy.Name" type="hidden" defaultValue="" aria-labelledby="ProviderBy_NameLabel" style={{}} />{" "}<label id="ProviderBy_DisplayFormatLabel" htmlFor="ProviderBy_DisplayFormat" className="display-none">{"ProviderBy_DisplayFormat"}</label>
                          <input id="ProviderBy_DisplayFormat" name="ProviderBy.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ProviderBy_DisplayFormatLabel" style={{}} />{" "}<span className="k-invalid-msg" id="ProviderBy_validationMessage" data-for="ProviderBy"></span>
                          <span id="ProviderByHelpDesc" hidden={true}>{"Search for claims by National Provider Number (NPI), Provider Location ID, Provider Name, Provider Tax ID, or Provider Taxonomy"}</span>
                          </div>
                        </div>{" "}<input id="ProviderBy_Name" name="ProviderBy.Name" type="hidden" defaultValue="" style={{}} />{" "}</div>{" "}<div id="divProviderByList_NPI" className="row" style={{"display": "none"}} data-kit-h="h15">{" "}<div className="col-md-6 editor-col editor-clear" id="NPI_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="NPI" id="NPILabel" title="NPI">{"NPI"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="NPIHelp" role="img" title="This is the NPI number assigned by the government for the provider" data-role="tooltip" data-kit-tip="This is the NPI number assigned by the government for the provider" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="NPIHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                            <input className="editor-control k-input-inner" data-val-length-max="NPI has a maximum length of 50 characters." data-val-regex="NPI contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="NPI" ignoredirtydata="False" maxLength={50} name="NPI" not-data-val-required="NPI is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="NPILabel NPIHelpDesc" defaultValue="" data-testid="NPI" />
                            </span>{" "}<span className="k-invalid-msg" id="NPI_validationMessage" data-for="NPI"></span>
                          <span id="NPIHelpDesc" hidden={true}>{"This is the NPI number assigned by the government for the provider"}</span>
                          </div>
                        </div>{" "}</div>{" "}<div id="divProviderByList_ProviderName" className="row" style={{"display": "none"}} data-kit-h="h16">{" "}<div className="col-md-6 editor-col editor-clear" id="ProviderName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="ProviderName" id="ProviderNameLabel" title="Provider Name">{"Provider Name"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderNameHelp" role="img" title="This is the name for the provider on the claim." data-role="tooltip" data-kit-tip="This is the name for the provider on the claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderNameHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                            <input className="editor-control k-input-inner" data-val-length-max="Provider Name has a maximum length of 50 characters." data-val-regex="Provider Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ProviderName" ignoredirtydata="False" maxLength={50} name="ProviderName" not-data-val-required="Provider Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="ProviderNameLabel ProviderNameHelpDesc" defaultValue="" data-testid="ProviderName" />
                            </span>{" "}<span className="k-invalid-msg" id="ProviderName_validationMessage" data-for="ProviderName"></span>
                          <span id="ProviderNameHelpDesc" hidden={true}>{"This is the name for the provider on the claim."}</span>
                          </div>
                        </div>{" "}</div>{" "}<div id="divProviderByList_ProviderTaxonomy" className="row" style={{"display": "none"}} data-kit-h="h17">{" "}<div className="col-md-6 editor-col editor-clear" id="ProviderTaxonomy_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="ProviderTaxonomy" id="ProviderTaxonomyLabel" title="Provider Taxonomy">{"Provider Taxonomy"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderTaxonomyHelp" role="img" title="This is the taxonomy code for the provider on the claim" data-role="tooltip" data-kit-tip="This is the taxonomy code for the provider on the claim" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderTaxonomyHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                            <span tabIndex={-1} className="k-autocomplete k-input editor-control k-input-inner" style={{"width": "100%"}}>
                              <input className="editor-control k-input-inner" data-val-length-max="Provider Taxonomy has a maximum length of 50 characters." data-val-regex="Provider Taxonomy contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ProviderTaxonomy" ignoredirtydata="False" maxLength={50} name="ProviderTaxonomy" not-data-val-required="Provider Taxonomy is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter taxonomy..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="ProviderTaxonomy_listbox" aria-labelledby="ProviderTaxonomyLabel ProviderTaxonomyHelpDesc" defaultValue="" data-testid="ProviderTaxonomy" />
                              <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="button-clear">
                                <span className="k-icon k-svg-icon k-svg-i-x">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                    </svg>
                                  </span>
                                </span>
                              </span>
                            </span>{" "}<span className="k-invalid-msg" id="ProviderTaxonomy_validationMessage" data-for="ProviderTaxonomy"></span>
                          <span id="ProviderTaxonomyHelpDesc" hidden={true}>{"This is the taxonomy code for the provider on the claim"}</span>
                          </div>
                        </div>{" "}</div>{" "}<div id="divProviderByList_ProviderTaxID" className="row" style={{"display": "none"}} data-kit-h="h18">{" "}<div className="col-md-6 editor-col editor-clear" id="ProviderTaxID_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="ProviderTaxID" id="ProviderTaxIDLabel" title="Provider Tax ID">{"Provider Tax ID"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderTaxIDHelp" role="img" title="This is the tax identifier for the provider on the claim" data-role="tooltip" data-kit-tip="This is the tax identifier for the provider on the claim" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderTaxIDHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                            <input className="editor-control k-input-inner" data-val-length-max="Provider Tax ID has a maximum length of 50 characters." data-val-regex="Provider Tax ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ProviderTaxID" ignoredirtydata="False" maxLength={50} name="ProviderTaxID" not-data-val-required="Provider Tax ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="ProviderTaxIDLabel ProviderTaxIDHelpDesc" defaultValue="" data-testid="ProviderTaxID" />
                            </span>{" "}<span className="k-invalid-msg" id="ProviderTaxID_validationMessage" data-for="ProviderTaxID"></span>
                          <span id="ProviderTaxIDHelpDesc" hidden={true}>{"This is the tax identifier for the provider on the claim"}</span>
                          </div>
                        </div>{" "}</div>{" "}<div id="divProviderByList_ProviderID" style={{"display": "none"}} data-kit-h="h19">{" "}<div className="col-md-6 editor-col editor-clear" id="ProviderID_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="ProviderID" id="ProviderIDLabel" title="Provider ID">{"Provider ID"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderIDHelp" role="img" title="Identification number of the provider performing the service." data-role="tooltip" data-kit-tip="Identification number of the provider performing the service." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderIDHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                            <input className="editor-control k-input-inner" data-val-length-max="Provider ID has a maximum length of 50 characters." data-val-regex="Provider ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ProviderID" ignoredirtydata="False" maxLength={50} name="ProviderID" not-data-val-required="Provider ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="ProviderIDLabel ProviderIDHelpDesc" defaultValue="" data-testid="ProviderID" />
                            </span>{" "}<span className="k-invalid-msg" id="ProviderID_validationMessage" data-for="ProviderID"></span>
                          <span id="ProviderIDHelpDesc" hidden={true}>{"Identification number of the provider performing the service."}</span>
                          </div>
                        </div>{" "}</div>{" "}<div id="divProviderByList_ProviderLocationID" style={{"display": "none"}} data-kit-h="h20">{" "}<div className="col-md-6 editor-col" id="ProviderLocationID_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="ProviderLocationID" id="ProviderLocationIDLabel" title="Svc Location ID">{"Svc Location ID"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderLocationIDHelp" role="img" title="The location code where the provider performs the service." data-role="tooltip" data-kit-tip="The location code where the provider performs the service." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderLocationIDHelp"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                            <input className="editor-control k-input-inner" data-val-length-max="Svc Location ID has a maximum length of 50 characters." data-val-regex="Svc Location ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ProviderLocationID" ignoredirtydata="False" maxLength={50} name="ProviderLocationID" not-data-val-required="Svc Location ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="ProviderLocationIDLabel ProviderLocationIDHelpDesc" defaultValue="" data-testid="ProviderLocationID" />
                            </span>{" "}<span className="k-invalid-msg" id="ProviderLocationID_validationMessage" data-for="ProviderLocationID"></span>
                          <span id="ProviderLocationIDHelpDesc" hidden={true}>{"The location code where the provider performs the service."}</span>
                          </div>
                        </div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="row">{" "}<fieldset data-role="validator">{" "}<div className="content-subpanel-container">{" "}<div className="content-subpanel-hdr">{"\n                                        Advanced\n                                    "}</div>{" "}<div className="content-panel-hdr-tools">{" "}<span id="plusMinusAdvancedSearchClaimsClick" className="pull-right clickable" data-testid="plusMinusAdvancedSearchClaimsClick">
                        <i id="plusMinusAdvancedSearchClaims" className="fa-solid fa-square-plus"></i>
                        </span>{" "}<div className="content-ordered-panel-hdr-tools"></div>
                      </div>{" "}<div id="divAdvancedSearchClaims" className="content-panel-bdy collapse">{" "}<div className="editor-section panel-body">{" "}<div>{" "}<div className="row">{" "}<div className="col-md-2 editor-col editor-clear" id="ClaimTypeList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="ClaimType" id="ClaimTypeLabel" title="Claim Type">{"Claim Type"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ClaimTypeHelp" role="img" title="Indicates the type of claim. i.e. Medical, Inpatient, Outpatient, Pharmacy, Dental" data-role="tooltip" data-kit-tip="Indicates the type of claim. i.e. Medical, Inpatient, Outpatient, Pharmacy, Dental" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ClaimTypeHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<KitWidget id="k8" />{" "}<label id="ClaimType_IDLabel" htmlFor="ClaimType_ID" className="display-none">{"ClaimType_ID"}</label>
                                <input id="ClaimType_ID" name="ClaimType.ID" type="hidden" defaultValue="" aria-labelledby="ClaimType_IDLabel" style={{}} />{" "}<label id="ClaimType_NameLabel" htmlFor="ClaimType_Name" className="display-none">{"ClaimType_Name"}</label>
                                <input id="ClaimType_Name" name="ClaimType.Name" type="hidden" defaultValue="" aria-labelledby="ClaimType_NameLabel" style={{}} />{" "}<label id="ClaimType_DisplayFormatLabel" htmlFor="ClaimType_DisplayFormat" className="display-none">{"ClaimType_DisplayFormat"}</label>
                                <input id="ClaimType_DisplayFormat" name="ClaimType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ClaimType_DisplayFormatLabel" style={{}} />
                                <span className="k-invalid-msg" id="ClaimTypeList_validationMessage" data-for="ClaimTypeList"></span>
                                <span id="ClaimTypeHelpDesc" hidden={true} data-kit-h="h21">{"Indicates the type of claim. i.e. Medical, Inpatient, Outpatient, Pharmacy, Dental"}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="ClaimSubTypeList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="ClaimSubType" id="ClaimSubTypeLabel" title="Sub Type">{"Sub Type"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ClaimSubTypeHelp" role="img" title="Indicates additional qualifications of types of claims within the initial claim type i.e. DME, Home Health are valid subtypes for a medical claim type" data-role="tooltip" data-kit-tip="Indicates additional qualifications of types of claims within the initial claim type i.e. DME, Home Health are valid subtypes for a medical claim type" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ClaimSubTypeHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<KitWidget id="k9" />{" "}<label id="ClaimSubType_IDLabel" htmlFor="ClaimSubType_ID" className="display-none">{"ClaimSubType_ID"}</label>
                                <input id="ClaimSubType_ID" name="ClaimSubType.ID" type="hidden" defaultValue="" aria-labelledby="ClaimSubType_IDLabel" style={{}} />{" "}<label id="ClaimSubType_NameLabel" htmlFor="ClaimSubType_Name" className="display-none">{"ClaimSubType_Name"}</label>
                                <input id="ClaimSubType_Name" name="ClaimSubType.Name" type="hidden" defaultValue="" aria-labelledby="ClaimSubType_NameLabel" style={{}} />{" "}<label id="ClaimSubType_DisplayFormatLabel" htmlFor="ClaimSubType_DisplayFormat" className="display-none">{"ClaimSubType_DisplayFormat"}</label>
                                <input id="ClaimSubType_DisplayFormat" name="ClaimSubType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ClaimSubType_DisplayFormatLabel" style={{}} />
                                <span className="k-invalid-msg" id="ClaimSubTypeList_validationMessage" data-for="ClaimSubTypeList"></span>
                                <span id="ClaimSubTypeHelpDesc" hidden={true} data-kit-h="h22">{"Indicates additional qualifications of types of claims within the initial claim type i.e. DME, Home Health are valid subtypes for a medical claim type"}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="ClaimStatusList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="ClaimStatus" id="ClaimStatusLabel" title="Status">{"Status"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ClaimStatusHelp" role="img" title="Identifies the status of the claim with the system i.e. Paid, Denied, Suspended, Voided, Adjusted." data-role="tooltip" data-kit-tip="Identifies the status of the claim with the system i.e. Paid, Denied, Suspended, Voided, Adjusted." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ClaimStatusHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<KitWidget id="k10" />{" "}<label id="ClaimStatus_IDLabel" htmlFor="ClaimStatus_ID" className="display-none">{"ClaimStatus_ID"}</label>
                                <input id="ClaimStatus_ID" name="ClaimStatus.ID" type="hidden" defaultValue="" aria-labelledby="ClaimStatus_IDLabel" style={{}} />{" "}<label id="ClaimStatus_NameLabel" htmlFor="ClaimStatus_Name" className="display-none">{"ClaimStatus_Name"}</label>
                                <input id="ClaimStatus_Name" name="ClaimStatus.Name" type="hidden" defaultValue="" aria-labelledby="ClaimStatus_NameLabel" style={{}} />{" "}<label id="ClaimStatus_DisplayFormatLabel" htmlFor="ClaimStatus_DisplayFormat" className="display-none">{"ClaimStatus_DisplayFormat"}</label>
                                <input id="ClaimStatus_DisplayFormat" name="ClaimStatus.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ClaimStatus_DisplayFormatLabel" style={{}} />
                                <span className="k-invalid-msg" id="ClaimStatusList_validationMessage" data-for="ClaimStatusList"></span>
                                <span id="ClaimStatusHelpDesc" hidden={true} data-kit-h="h23">{"Identifies the status of the claim with the system i.e. Paid, Denied, Suspended, Voided, Adjusted."}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="ClaimSourceCodeList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="ClaimSourceCode" id="ClaimSourceCodeLabel" title="Claim Source Code">{"Claim Source Code"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ClaimSourceCodeHelp" role="img" title="Indicates the origin of the claim. i.e. HIPAA transaction, manual entry, batch entry." data-role="tooltip" data-kit-tip="Indicates the origin of the claim. i.e. HIPAA transaction, manual entry, batch entry." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ClaimSourceCodeHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<KitWidget id="k11" />{" "}<label id="ClaimSourceCode_IDLabel" htmlFor="ClaimSourceCode_ID" className="display-none">{"ClaimSourceCode_ID"}</label>
                                <input id="ClaimSourceCode_ID" name="ClaimSourceCode.ID" type="hidden" defaultValue="" aria-labelledby="ClaimSourceCode_IDLabel" style={{}} />{" "}<label id="ClaimSourceCode_NameLabel" htmlFor="ClaimSourceCode_Name" className="display-none">{"ClaimSourceCode_Name"}</label>
                                <input id="ClaimSourceCode_Name" name="ClaimSourceCode.Name" type="hidden" defaultValue="" aria-labelledby="ClaimSourceCode_NameLabel" style={{}} />{" "}<label id="ClaimSourceCode_DisplayFormatLabel" htmlFor="ClaimSourceCode_DisplayFormat" className="display-none">{"ClaimSourceCode_DisplayFormat"}</label>
                                <input id="ClaimSourceCode_DisplayFormat" name="ClaimSourceCode.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ClaimSourceCode_DisplayFormatLabel" style={{}} />
                                <span className="k-invalid-msg" id="ClaimSourceCodeList_validationMessage" data-for="ClaimSourceCodeList"></span>
                                <span id="ClaimSourceCodeHelpDesc" hidden={true} data-kit-h="h24">{"Indicates the origin of the claim. i.e. HIPAA transaction, manual entry, batch entry."}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="PayToList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="PayTo" id="PayToLabel" title="Pay To">{"Pay To"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="PayToHelp" role="img" title="Indicates who is paid when the claim is resolved. i.e. Member, Provider, Provider Group, Practice Location " data-role="tooltip" data-kit-tip="Indicates who is paid when the claim is resolved. i.e. Member, Provider, Provider Group, Practice Location" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="PayToHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<KitWidget id="k12" />{" "}<label id="PayTo_IDLabel" htmlFor="PayTo_ID" className="display-none">{"PayTo_ID"}</label>
                                <input id="PayTo_ID" name="PayTo.ID" type="hidden" defaultValue="" aria-labelledby="PayTo_IDLabel" style={{}} />{" "}<label id="PayTo_NameLabel" htmlFor="PayTo_Name" className="display-none">{"PayTo_Name"}</label>
                                <input id="PayTo_Name" name="PayTo.Name" type="hidden" defaultValue="" aria-labelledby="PayTo_NameLabel" style={{}} />{" "}<label id="PayTo_DisplayFormatLabel" htmlFor="PayTo_DisplayFormat" className="display-none">{"PayTo_DisplayFormat"}</label>
                                <input id="PayTo_DisplayFormat" name="PayTo.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="PayTo_DisplayFormatLabel" style={{}} />
                                <span className="k-invalid-msg" id="PayToList_validationMessage" data-for="PayToList"></span>
                                <span id="PayToHelpDesc" hidden={true} data-kit-h="h25">{"Indicates who is paid when the claim is resolved. i.e. Member, Provider, Provider Group, Practice Location "}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="ServiceTypeList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="ServiceType" id="ServiceTypeLabel" title="Svc Type">{"Svc Type"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ServiceTypeHelp" role="img" title="The type of service associated with the major or primary procedure code for this claim." data-role="tooltip" data-kit-tip="The type of service associated with the major or primary procedure code for this claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ServiceTypeHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<KitWidget id="k13" />{" "}<label id="ServiceType_IDLabel" htmlFor="ServiceType_ID" className="display-none">{"ServiceType_ID"}</label>
                                <input id="ServiceType_ID" name="ServiceType.ID" type="hidden" defaultValue="" aria-labelledby="ServiceType_IDLabel" style={{}} />{" "}<label id="ServiceType_NameLabel" htmlFor="ServiceType_Name" className="display-none">{"ServiceType_Name"}</label>
                                <input id="ServiceType_Name" name="ServiceType.Name" type="hidden" defaultValue="" aria-labelledby="ServiceType_NameLabel" style={{}} />{" "}<label id="ServiceType_DisplayFormatLabel" htmlFor="ServiceType_DisplayFormat" className="display-none">{"ServiceType_DisplayFormat"}</label>
                                <input id="ServiceType_DisplayFormat" name="ServiceType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ServiceType_DisplayFormatLabel" style={{}} />
                                <span className="k-invalid-msg" id="ServiceTypeList_validationMessage" data-for="ServiceTypeList"></span>
                                <span id="ServiceTypeHelpDesc" hidden={true} data-kit-h="h26">{"The type of service associated with the major or primary procedure code for this claim."}</span>
                                </div>
                              </div>{" "}<input id="ClaimType_Name" name="ClaimType.Name" type="hidden" defaultValue="" style={{}} />{" "}<input id="ClaimSubType_Name" name="ClaimSubType.Name" type="hidden" defaultValue="" style={{}} />{" "}<input id="ClaimStatus_Name" name="ClaimStatus.Name" type="hidden" defaultValue="" style={{}} />{" "}<input id="ClaimSourceCode_Name" name="ClaimSourceCode.Name" type="hidden" defaultValue="" style={{}} />{" "}<input id="PayTo_Name" name="PayTo.Name" type="hidden" defaultValue="" style={{}} />{" "}<input id="ServiceType_Name" name="ServiceType.Name" type="hidden" defaultValue="" style={{}} />{" "}</div>{" "}<div className="row">{" "}<div className="col-md-1 editor-col editor-clear" id="Modifiers1_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="Modifiers1" id="Modifiers1Label" title="Mod1">{"Mod1"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Modifiers1Help" role="img" title="Code used to provide additional information about the procedure. May affect payment." data-role="tooltip" data-kit-tip="Code used to provide additional information about the procedure. May affect payment." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="Modifiers1Help"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                    <input className="k-input-inner" data-val-length-max="Mod1 has a maximum length of 50 characters." height="0" id="Modifiers1" ignoredirtydata="False" maxLength={50} name="Modifiers1" not-data-val-required="Mod1 is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter mod..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="Modifiers1_listbox" aria-labelledby="Modifiers1Label Modifiers1HelpDesc" defaultValue="" data-testid="Modifiers1" />
                                    <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h27" data-testid="button-clear-2">
                                      <span className="k-icon k-svg-icon k-svg-i-x">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </span>{" "}<span className="k-invalid-msg" id="Modifiers1_validationMessage" data-for="Modifiers1"></span>
                                <span id="Modifiers1HelpDesc" hidden={true} data-kit-h="h28">{"Code used to provide additional information about the procedure. May affect payment."}</span>
                                </div>
                              </div>{" "}<div className="col-md-1 editor-col" id="Modifiers2_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="Modifiers2" id="Modifiers2Label" title="Mod2">{"Mod2"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Modifiers2Help" role="img" title="Code used to provide additional information about the procedure. May affect payment." data-role="tooltip" data-kit-tip="Code used to provide additional information about the procedure. May affect payment." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="Modifiers2Help"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                    <input className="k-input-inner" data-val-length-max="Mod2 has a maximum length of 50 characters." height="0" id="Modifiers2" ignoredirtydata="False" maxLength={50} name="Modifiers2" not-data-val-required="Mod2 is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter mod..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="Modifiers2_listbox" aria-labelledby="Modifiers2Label Modifiers2HelpDesc" defaultValue="" data-testid="Modifiers2" />
                                    <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h29" data-testid="button-clear-3">
                                      <span className="k-icon k-svg-icon k-svg-i-x">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </span>{" "}<span className="k-invalid-msg" id="Modifiers2_validationMessage" data-for="Modifiers2"></span>
                                <span id="Modifiers2HelpDesc" hidden={true} data-kit-h="h30">{"Code used to provide additional information about the procedure. May affect payment."}</span>
                                </div>
                              </div>{" "}<div className="col-md-1 editor-col" id="Modifiers3_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="Modifiers3" id="Modifiers3Label" title="Mod3">{"Mod3"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Modifiers3Help" role="img" title="Code used to provide additional information about the procedure. May affect payment." data-role="tooltip" data-kit-tip="Code used to provide additional information about the procedure. May affect payment." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="Modifiers3Help"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                    <input className="k-input-inner" data-val-length-max="Mod3 has a maximum length of 50 characters." height="0" id="Modifiers3" ignoredirtydata="False" maxLength={50} name="Modifiers3" not-data-val-required="Mod3 is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter mod..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="Modifiers3_listbox" aria-labelledby="Modifiers3Label Modifiers3HelpDesc" defaultValue="" data-testid="Modifiers3" />
                                    <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h31" data-testid="button-clear-4">
                                      <span className="k-icon k-svg-icon k-svg-i-x">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </span>{" "}<span className="k-invalid-msg" id="Modifiers3_validationMessage" data-for="Modifiers3"></span>
                                <span id="Modifiers3HelpDesc" hidden={true} data-kit-h="h32">{"Code used to provide additional information about the procedure. May affect payment."}</span>
                                </div>
                              </div>{" "}<div className="col-md-1 editor-col" id="Modifiers4_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="Modifiers4" id="Modifiers4Label" title="Mod4">{"Mod4"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Modifiers4Help" role="img" title="Code used to provide additional information about the procedure. May affect payment." data-role="tooltip" data-kit-tip="Code used to provide additional information about the procedure. May affect payment." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="Modifiers4Help"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                    <input className="k-input-inner" data-val-length-max="Mod4 has a maximum length of 50 characters." height="0" id="Modifiers4" ignoredirtydata="False" maxLength={50} name="Modifiers4" not-data-val-required="Mod4 is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter mod..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="Modifiers4_listbox" aria-labelledby="Modifiers4Label Modifiers4HelpDesc" defaultValue="" data-testid="Modifiers4" />
                                    <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h33" data-testid="button-clear-5">
                                      <span className="k-icon k-svg-icon k-svg-i-x">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </span>{" "}<span className="k-invalid-msg" id="Modifiers4_validationMessage" data-for="Modifiers4"></span>
                                <span id="Modifiers4HelpDesc" hidden={true} data-kit-h="h34">{"Code used to provide additional information about the procedure. May affect payment."}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="ExceptionErrorCode_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="ExceptionErrorCode" id="ExceptionErrorCodeLabel" title="Exp Error Code">{"Exp Error Code"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ExceptionErrorCodeHelp" role="img" title="Code used to identify the failed edit or audit." data-role="tooltip" data-kit-tip="Code used to identify the failed edit or audit." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ExceptionErrorCodeHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                    <input className="k-input-inner" data-val-length-max="Exp Error Code has a maximum length of 50 characters." data-val-regex="Exp Error Code contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ExceptionErrorCode" ignoredirtydata="False" maxLength={50} name="ExceptionErrorCode" not-data-val-required="Exp Error Code is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter exp error code..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="ExceptionErrorCode_listbox" aria-labelledby="ExceptionErrorCodeLabel ExceptionErrorCodeHelpDesc" defaultValue="" data-testid="ExceptionErrorCode" />
                                    <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h35" data-testid="button-clear-6">
                                      <span className="k-icon k-svg-icon k-svg-i-x">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </span>{" "}<span className="k-invalid-msg" id="ExceptionErrorCode_validationMessage" data-for="ExceptionErrorCode"></span>
                                <span id="ExceptionErrorCodeHelpDesc" hidden={true} data-kit-h="h36">{"Code used to identify the failed edit or audit."}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="AuthorizationNumber_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="AuthorizationNumber" id="AuthorizationNumberLabel" title="Prior Auth">{"Prior Auth"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="AuthorizationNumberHelp" role="img" title="Identifies the prior authorization (prior auth) number that provides approval for the services on the associated claim." data-role="tooltip" data-kit-tip="Identifies the prior authorization (prior auth) number that provides approval for the services on the associated claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="AuthorizationNumberHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val-length-max="Prior Auth has a maximum length of 50 characters." data-val-regex="Prior Auth contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="AuthorizationNumber" ignoredirtydata="False" maxLength={50} name="AuthorizationNumber" not-data-val-required="Prior Auth is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="AuthorizationNumberLabel AuthorizationNumberHelpDesc" defaultValue="" data-testid="AuthorizationNumber" />
                                  </span>{" "}<span className="k-invalid-msg" id="AuthorizationNumber_validationMessage" data-for="AuthorizationNumber"></span>
                                <span id="AuthorizationNumberHelpDesc" hidden={true} data-kit-h="h37">{"Identifies the prior authorization (prior auth) number that provides approval for the services on the associated claim."}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="OperatorIdentifier_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="OperatorIdentifier" id="OperatorIdentifierLabel" title="Operator ID">{"Operator ID"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="OperatorIdentifierHelp" role="img" title="Identifies the last person that updated the claim." data-role="tooltip" data-kit-tip="Identifies the last person that updated the claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="OperatorIdentifierHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val-length-max="Operator ID has a maximum length of 200 characters." data-val-regex="Operator ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="OperatorIdentifier" ignoredirtydata="False" maxLength={200} name="OperatorIdentifier" not-data-val-required="Operator ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="OperatorIdentifierLabel OperatorIdentifierHelpDesc" defaultValue="" data-testid="OperatorIdentifier" />
                                  </span>{" "}<span className="k-invalid-msg" id="OperatorIdentifier_validationMessage" data-for="OperatorIdentifier"></span>
                                <span id="OperatorIdentifierHelpDesc" hidden={true} data-kit-h="h38">{"Identifies the last person that updated the claim."}</span>
                                </div>
                              </div>{" "}<div className="col-md-2 editor-col" id="RANumber_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="RANumber" id="RANumberLabel" title="RA Number">{"RA Number"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RANumberHelp" role="img" title="Check number associated with the paid claim." data-role="tooltip" data-kit-tip="Check number associated with the paid claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="RANumberHelp"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val-length-max="RA Number has a maximum length of 50 characters." data-val-regex="RA Number contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="RANumber" ignoredirtydata="False" maxLength={50} name="RANumber" not-data-val-required="RA Number is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="RANumberLabel RANumberHelpDesc" defaultValue="" data-testid="RANumber" />
                                  </span>{" "}<span className="k-invalid-msg" id="RANumber_validationMessage" data-for="RANumber"></span>
                                <span id="RANumberHelpDesc" hidden={true} data-kit-h="h39">{"Check number associated with the paid claim."}</span>
                                </div>
                              </div>{" "}</div>{" "}<div className="row">{" "}<div id="totalBiledRangeFromandToAssocBox" className="col-md-3 editor-col">{" "}<div className="editor-label">{" "}<label htmlFor="TotalBilled" id="TotalBilledLabel" title="Total Billed">{"Total Billed"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TotalBilledHelp" role="img" title="Total of all line charges on the claim." data-role="tooltip" data-kit-tip="Total of all line charges on the claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="TotalBilledHelp"></span>{" "}</div>{" "}<div className="assoc-box display-inline-block">{" "}<div className="col-md-6 editor-col editor-clear" id="TotalBilledRangeFrom_parent" data-template="Currency">
                                  <div className="editor-label">
                                    <label htmlFor="TotalBilledRangeFrom" id="TotalBilledRangeFromLabel" title="Range From">{"Range From"}</label>
                                    </div>
                                  <div className="editor-field">
                                    <KitWidget id="k14" />{" "}<span className="k-invalid-msg" id="TotalBilledRangeFrom_validationMessage" data-for="TotalBilledRangeFrom"></span>
                                    </div>
                                  </div>{" "}<div className="col-md-6 editor-col" id="TotalBilledRangeTo_parent" data-template="Currency">
                                  <div className="editor-label">
                                    <label htmlFor="TotalBilledRangeTo" id="TotalBilledRangeToLabel" title="Range To">{"Range To"}</label>
                                    </div>
                                  <div className="editor-field">
                                    <KitWidget id="k15" />{" "}<span className="k-invalid-msg" id="TotalBilledRangeTo_validationMessage" data-for="TotalBilledRangeTo"></span>
                                    </div>
                                  </div>{" "}</div>{" "}</div>{" "}<div id="procCodeFromandToAssocBox" className="col-md-2 editor-col">{" "}<div className="editor-label">{" "}<label htmlFor="col-md-3 editor-colProcCode" id="col-md-3 editor-colProcCodeLabel" title="Proc Code">{"Proc Code"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="col-md-3_editor-colProcCodeHelp" role="img" title="CDT/HCPCS code (DXXXX) used to identify a procedure." data-role="tooltip" data-kit-tip="CDT/HCPCS code (DXXXX) used to identify a procedure." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="col-md-3_editor-colProcCodeHelp"></span>{" "}</div>{" "}<div className="assoc-box display-inline-block">{" "}<div className="col-md-6 editor-col" id="ProcCodeFrom_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="ProcCodeFrom" id="ProcCodeFromLabel" title="From">{"From"}</label>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                      <input className="editor-control k-input-inner" data-val-length-max="From has a maximum length of 50 characters." data-val-regex="From is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="ProcCodeFrom" ignoredirtydata="False" maxLength={50} name="ProcCodeFrom" not-data-val-required="From is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="ProcCodeFromLabel" defaultValue="" data-testid="ProcCodeFrom" />
                                      </span>{" "}<span className="k-invalid-msg" id="ProcCodeFrom_validationMessage" data-for="ProcCodeFrom"></span>
                                    </div>
                                  </div>{" "}<div className="col-md-6 editor-col" id="ProcCodeTo_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="ProcCodeTo" id="ProcCodeToLabel" title="To">{"To"}</label>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                      <input className="editor-control k-input-inner" data-val-length-max="To has a maximum length of 50 characters." data-val-regex="To is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="ProcCodeTo" ignoredirtydata="False" maxLength={50} name="ProcCodeTo" not-data-val-required="To is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="ProcCodeToLabel" defaultValue="" data-testid="ProcCodeTo" />
                                      </span>{" "}<span className="k-invalid-msg" id="ProcCodeTo_validationMessage" data-for="ProcCodeTo"></span>
                                    </div>
                                  </div>{" "}</div>{" "}</div>{" "}<div id="toothnumberFromandToAssocBox" className="col-md-2 editor-col">{" "}<div className="editor-label">{" "}<label htmlFor="col-md-3 editor-colToothNo" id="col-md-3 editor-colToothNoLabel" title="Tooth No">{"Tooth No"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="col-md-3_editor-colToothNoHelp" role="img" title="Identifies the tooth the provider rendered services. An alphabetic character indicates temporary teeth and numeric indicates permanent teeth." data-role="tooltip" data-kit-tip="Identifies the tooth the provider rendered services. An alphabetic character indicates temporary teeth and numeric indicates permanent teeth." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="col-md-3_editor-colToothNoHelp"></span>{" "}</div>{" "}<div className="assoc-box display-inline-block">{" "}<div className="col-md-6 editor-col" id="ToothNumberFrom_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="ToothNumberFrom" id="ToothNumberFromLabel" title="From">{"From"}</label>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                      <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                        <input className="k-input-inner" data-val-length-max="From has a maximum length of 50 characters." data-val-regex="From is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="ToothNumberFrom" ignoredirtydata="False" maxLength={50} name="ToothNumberFrom" not-data-val-required="From is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter tooth..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="ToothNumberFrom_listbox" aria-labelledby="ToothNumberFromLabel" defaultValue="" data-testid="ToothNumberFrom" />
                                        <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h40" data-testid="button-clear-7">
                                          <span className="k-icon k-svg-icon k-svg-i-x">
                                            <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                              </svg>
                                            </span>
                                          </span>
                                        </span>
                                      </span>{" "}<span className="k-invalid-msg" id="ToothNumberFrom_validationMessage" data-for="ToothNumberFrom"></span>
                                    </div>
                                  </div>{" "}<div className="col-md-6 editor-col" id="ToothNumberTo_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="ToothNumberTo" id="ToothNumberToLabel" title="To">{"To"}</label>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                      <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                        <input className="k-input-inner" data-val-length-max="To has a maximum length of 50 characters." data-val-regex="To is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="ToothNumberTo" ignoredirtydata="False" maxLength={50} name="ToothNumberTo" not-data-val-required="To is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter tooth..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="ToothNumberTo_listbox" aria-labelledby="ToothNumberToLabel" defaultValue="" data-testid="ToothNumberTo" />
                                        <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h41" data-testid="button-clear-8">
                                          <span className="k-icon k-svg-icon k-svg-i-x">
                                            <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                              </svg>
                                            </span>
                                          </span>
                                        </span>
                                      </span>{" "}<span className="k-invalid-msg" id="ToothNumberTo_validationMessage" data-for="ToothNumberTo"></span>
                                    </div>
                                  </div>{" "}</div>{" "}</div>{" "}<div id="diagnosisTypeAssocBox" className="col-md-3 editor-col">{" "}<div className="editor-label">{" "}<label htmlFor="editor-colPriDXCode" id="editor-colPriDXCodeLabel" title="Prim DX Code">{"Prim DX Code"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="editor-colPriDXCodeHelp" role="img" title="The major or primary diagnosis for this claim" data-role="tooltip" data-kit-tip="The major or primary diagnosis for this claim" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="editor-colPriDXCodeHelp"></span>{" "}</div>{" "}<div className="assoc-box display-inline-block col-md-12">{" "}<div className="editor-col col-md-6" id="DiagnosisType_parent" data-template="ListItemSingleNoSelectAValue">
                                  <div className="editor-label">
                                    <label htmlFor="DiagnosisType" id="DiagnosisTypeLabel" title="Choose DX Type">{"Choose DX Type"}</label>
                                    </div>
                                  <div className="editor-field">{" "}<KitWidget id="k16" />{" "}<label id="DiagnosisType_IDLabel" htmlFor="DiagnosisType_ID" className="display-none">{"DiagnosisType_ID"}</label>
                                    <input id="DiagnosisType_ID" name="DiagnosisType.ID" type="hidden" defaultValue="02" aria-labelledby="DiagnosisType_IDLabel" style={{}} />{" "}<label id="DiagnosisType_NameLabel" htmlFor="DiagnosisType_Name" className="display-none">{"DiagnosisType_Name"}</label>
                                    <input id="DiagnosisType_Name" name="DiagnosisType.Name" type="hidden" defaultValue="ICD-10-CM" aria-labelledby="DiagnosisType_NameLabel" style={{}} />{" "}<label id="DiagnosisType_DisplayFormatLabel" htmlFor="DiagnosisType_DisplayFormat" className="display-none">{"DiagnosisType_DisplayFormat"}</label>
                                    <input id="DiagnosisType_DisplayFormat" name="DiagnosisType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="DiagnosisType_DisplayFormatLabel" style={{}} />{" "}<span className="k-invalid-msg" id="DiagnosisType_validationMessage" data-for="DiagnosisType"></span>
                                    </div>
                                  </div>{" "}<input id="DiagnosisType_Name" name="DiagnosisType.Name" type="hidden" defaultValue="" style={{}} />{" "}<div id="diagnosisCodeDiv_ICD09" style={{"display": "none"}} data-kit-h="h42">{" "}<div className="editor-col col-md-6" id="PrimaryDiagnosisCodeICD09_parent" data-template="Text">
                                    <div className="editor-label">
                                      <label htmlFor="PrimaryDiagnosisCodeICD09" id="PrimaryDiagnosisCodeICD09Label" title="Code">{"Code"}</label>
                                      </div>
                                    <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                        <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                          <input className="k-input-inner" data-val-length-max="Code has a maximum length of 50 characters." data-val-regex="Code contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="PrimaryDiagnosisCodeICD09" ignoredirtydata="False" maxLength={50} name="PrimaryDiagnosisCodeICD09" not-data-val-required="Code is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter prim dx code..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="PrimaryDiagnosisCodeICD09_listbox" aria-labelledby="PrimaryDiagnosisCodeICD09Label" defaultValue="" data-testid="PrimaryDiagnosisCodeICD09" />
                                          <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="button-clear-9">
                                            <span className="k-icon k-svg-icon k-svg-i-x">
                                              <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                                </svg>
                                              </span>
                                            </span>
                                          </span>
                                        </span>{" "}<span className="k-invalid-msg" id="PrimaryDiagnosisCodeICD09_validationMessage" data-for="PrimaryDiagnosisCodeICD09"></span>
                                      </div>
                                    </div>{" "}</div>{" "}<div id="diagnosisCodeDiv_ICD10" style={{}}>{" "}<div className="editor-col col-md-6" id="PrimaryDiagnosisCodeICD10_parent" data-template="Text">
                                    <div className="editor-label">
                                      <label htmlFor="PrimaryDiagnosisCodeICD10" id="PrimaryDiagnosisCodeICD10Label" title="Code">{"Code"}</label>
                                      </div>
                                    <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                        <span tabIndex={-1} className="k-autocomplete k-input k-input-inner" style={{"width": "100%"}}>
                                          <input className="k-input-inner" data-val-length-max="Code has a maximum length of 50 characters." data-val-regex="Code contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="PrimaryDiagnosisCodeICD10" ignoredirtydata="False" maxLength={50} name="PrimaryDiagnosisCodeICD10" not-data-val-required="Code is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{}} placeholder="enter prim dx code..." type="text" aria-readonly="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="PrimaryDiagnosisCodeICD10_listbox" aria-labelledby="PrimaryDiagnosisCodeICD10Label" defaultValue="" data-testid="PrimaryDiagnosisCodeICD10" />
                                          <span unselectable="on" className="k-clear-value k-hidden" title="clear" role="button" tabIndex={-1} data-role="tooltip" data-kit-tip="clear" data-kit-tip-pos="top" data-kit-tip-after="250" data-kit-h="h43" data-testid="button-clear-10">
                                            <span className="k-icon k-svg-icon k-svg-i-x">
                                              <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M416 141.3 301.3 256 416 370.7 370.7 416 256 301.3 141.3 416 96 370.7 210.7 256 96 141.3 141.3 96 256 210.7 370.7 96z" />
                                                </svg>
                                              </span>
                                            </span>
                                          </span>
                                        </span>{" "}<span className="k-invalid-msg" id="PrimaryDiagnosisCodeICD10_validationMessage" data-for="PrimaryDiagnosisCodeICD10"></span>
                                      </div>
                                    </div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}<div className="editor-button-row">{" "}<label id="Editor_Alt1ActionTextLabel" htmlFor="Editor_Alt1ActionText" className="display-none">{"Editor_Alt1ActionText"}</label>
                <input id="Editor_Alt1ActionText" name="Editor.Alt1ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt1ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt1ActionUrlLabel" htmlFor="Editor_Alt1ActionUrl" className="display-none">{"Editor_Alt1ActionUrl"}</label>
                <input id="Editor_Alt1ActionUrl" name="Editor.Alt1ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt1ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt2ActionTextLabel" htmlFor="Editor_Alt2ActionText" className="display-none">{"Editor_Alt2ActionText"}</label>
                <input id="Editor_Alt2ActionText" name="Editor.Alt2ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt2ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt2ActionUrlLabel" htmlFor="Editor_Alt2ActionUrl" className="display-none">{"Editor_Alt2ActionUrl"}</label>
                <input id="Editor_Alt2ActionUrl" name="Editor.Alt2ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt2ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt3ActionTextLabel" htmlFor="Editor_Alt3ActionText" className="display-none">{"Editor_Alt3ActionText"}</label>
                <input id="Editor_Alt3ActionText" name="Editor.Alt3ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt3ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt3ActionUrlLabel" htmlFor="Editor_Alt3ActionUrl" className="display-none">{"Editor_Alt3ActionUrl"}</label>
                <input id="Editor_Alt3ActionUrl" name="Editor.Alt3ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt3ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt4ActionTextLabel" htmlFor="Editor_Alt4ActionText" className="display-none">{"Editor_Alt4ActionText"}</label>
                <input id="Editor_Alt4ActionText" name="Editor.Alt4ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt4ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt4ActionUrlLabel" htmlFor="Editor_Alt4ActionUrl" className="display-none">{"Editor_Alt4ActionUrl"}</label>
                <input id="Editor_Alt4ActionUrl" name="Editor.Alt4ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt4ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt5ActionTextLabel" htmlFor="Editor_Alt5ActionText" className="display-none">{"Editor_Alt5ActionText"}</label>
                <input id="Editor_Alt5ActionText" name="Editor.Alt5ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt5ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt5ActionUrlLabel" htmlFor="Editor_Alt5ActionUrl" className="display-none">{"Editor_Alt5ActionUrl"}</label>
                <input id="Editor_Alt5ActionUrl" name="Editor.Alt5ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt5ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt6ActionTextLabel" htmlFor="Editor_Alt6ActionText" className="display-none">{"Editor_Alt6ActionText"}</label>
                <input id="Editor_Alt6ActionText" name="Editor.Alt6ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt6ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt6ActionUrlLabel" htmlFor="Editor_Alt6ActionUrl" className="display-none">{"Editor_Alt6ActionUrl"}</label>
                <input id="Editor_Alt6ActionUrl" name="Editor.Alt6ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt6ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt7ActionTextLabel" htmlFor="Editor_Alt7ActionText" className="display-none">{"Editor_Alt7ActionText"}</label>
                <input id="Editor_Alt7ActionText" name="Editor.Alt7ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt7ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt7ActionUrlLabel" htmlFor="Editor_Alt7ActionUrl" className="display-none">{"Editor_Alt7ActionUrl"}</label>
                <input id="Editor_Alt7ActionUrl" name="Editor.Alt7ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt7ActionUrlLabel" style={{}} />{" "}<label id="Editor_Alt8ActionTextLabel" htmlFor="Editor_Alt8ActionText" className="display-none">{"Editor_Alt8ActionText"}</label>
                <input id="Editor_Alt8ActionText" name="Editor.Alt8ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt8ActionTextLabel" style={{}} />{" "}<label id="Editor_Alt8ActionUrlLabel" htmlFor="Editor_Alt8ActionUrl" className="display-none">{"Editor_Alt8ActionUrl"}</label>
                <input id="Editor_Alt8ActionUrl" name="Editor.Alt8ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt8ActionUrlLabel" style={{}} />{" "}<label id="Editor_CancelActionTextLabel" htmlFor="Editor_CancelActionText" className="display-none">{"Editor_CancelActionText"}</label>
                <input id="Editor_CancelActionText" name="Editor.CancelActionText" type="hidden" defaultValue="Cancel" aria-labelledby="Editor_CancelActionTextLabel" style={{}} />{" "}<label id="Editor_CancelActionUrlLabel" htmlFor="Editor_CancelActionUrl" className="display-none">{"Editor_CancelActionUrl"}</label>
                <input id="Editor_CancelActionUrl" name="Editor.CancelActionUrl" type="hidden" defaultValue="/Home/MyHome/" aria-labelledby="Editor_CancelActionUrlLabel" style={{}} />{" "}<label id="Editor_ConfirmDeleteMessageLabel" htmlFor="Editor_ConfirmDeleteMessage" className="display-none">{"Editor_ConfirmDeleteMessage"}</label>
                <input id="Editor_ConfirmDeleteMessage" name="Editor.ConfirmDeleteMessage" type="hidden" defaultValue="Are you sure you want to delete the ?" aria-labelledby="Editor_ConfirmDeleteMessageLabel" style={{}} />{" "}<label id="Editor_DeleteActionTextLabel" htmlFor="Editor_DeleteActionText" className="display-none">{"Editor_DeleteActionText"}</label>
                <input id="Editor_DeleteActionText" name="Editor.DeleteActionText" type="hidden" defaultValue="Delete" aria-labelledby="Editor_DeleteActionTextLabel" style={{}} />{" "}<label id="Editor_DeletedMessageLabel" htmlFor="Editor_DeletedMessage" className="display-none">{"Editor_DeletedMessage"}</label>
                <input id="Editor_DeletedMessage" name="Editor.DeletedMessage" type="hidden" defaultValue=" was successfully deleted." aria-labelledby="Editor_DeletedMessageLabel" style={{}} />{" "}<label id="Editor_DirectionLabel" htmlFor="Editor_Direction" className="display-none">{"Editor_Direction"}</label>
                <input id="Editor_Direction" name="Editor.Direction" type="hidden" defaultValue="Next" aria-labelledby="Editor_DirectionLabel" style={{}} />{" "}<label id="Editor_DirtyDataMessageLabel" htmlFor="Editor_DirtyDataMessage" className="display-none">{"Editor_DirtyDataMessage"}</label>
                <input id="Editor_DirtyDataMessage" name="Editor.DirtyDataMessage" type="hidden" defaultValue="Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?" aria-labelledby="Editor_DirtyDataMessageLabel" style={{}} />{" "}<label id="Editor_EntityNameLabel" htmlFor="Editor_EntityName" className="display-none">{"Editor_EntityName"}</label>
                <input id="Editor_EntityName" name="Editor.EntityName" type="hidden" defaultValue="" aria-labelledby="Editor_EntityNameLabel" style={{}} />{" "}<label id="Editor_IsAlt1EnabledLabel" htmlFor="Editor_IsAlt1Enabled" className="display-none">{"Editor_IsAlt1Enabled"}</label>
                <input id="Editor_IsAlt1Enabled" name="Editor.IsAlt1Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt1EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt2EnabledLabel" htmlFor="Editor_IsAlt2Enabled" className="display-none">{"Editor_IsAlt2Enabled"}</label>
                <input id="Editor_IsAlt2Enabled" name="Editor.IsAlt2Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt2EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt3EnabledLabel" htmlFor="Editor_IsAlt3Enabled" className="display-none">{"Editor_IsAlt3Enabled"}</label>
                <input id="Editor_IsAlt3Enabled" name="Editor.IsAlt3Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt3EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt4EnabledLabel" htmlFor="Editor_IsAlt4Enabled" className="display-none">{"Editor_IsAlt4Enabled"}</label>
                <input id="Editor_IsAlt4Enabled" name="Editor.IsAlt4Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt4EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt5EnabledLabel" htmlFor="Editor_IsAlt5Enabled" className="display-none">{"Editor_IsAlt5Enabled"}</label>
                <input id="Editor_IsAlt5Enabled" name="Editor.IsAlt5Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt5EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt6EnabledLabel" htmlFor="Editor_IsAlt6Enabled" className="display-none">{"Editor_IsAlt6Enabled"}</label>
                <input id="Editor_IsAlt6Enabled" name="Editor.IsAlt6Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt6EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt7EnabledLabel" htmlFor="Editor_IsAlt7Enabled" className="display-none">{"Editor_IsAlt7Enabled"}</label>
                <input id="Editor_IsAlt7Enabled" name="Editor.IsAlt7Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt7EnabledLabel" style={{}} />{" "}<label id="Editor_IsAlt8EnabledLabel" htmlFor="Editor_IsAlt8Enabled" className="display-none">{"Editor_IsAlt8Enabled"}</label>
                <input id="Editor_IsAlt8Enabled" name="Editor.IsAlt8Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt8EnabledLabel" style={{}} />{" "}<label id="Editor_IsCancelEnabledLabel" htmlFor="Editor_IsCancelEnabled" className="display-none">{"Editor_IsCancelEnabled"}</label>
                <input id="Editor_IsCancelEnabled" name="Editor.IsCancelEnabled" type="hidden" defaultValue="True" aria-labelledby="Editor_IsCancelEnabledLabel" style={{}} />{" "}<label id="Editor_IsDirtyDataEnabledLabel" htmlFor="Editor_IsDirtyDataEnabled" className="display-none">{"Editor_IsDirtyDataEnabled"}</label>
                <input id="Editor_IsDirtyDataEnabled" name="Editor.IsDirtyDataEnabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsDirtyDataEnabledLabel" style={{}} />{" "}<label id="Editor_IsPrintEnabledLabel" htmlFor="Editor_IsPrintEnabled" className="display-none">{"Editor_IsPrintEnabled"}</label>
                <input id="Editor_IsPrintEnabled" name="Editor.IsPrintEnabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsPrintEnabledLabel" style={{}} />{" "}<label id="Editor_IsProcessDirtyLabel" htmlFor="Editor_IsProcessDirty" className="display-none">{"Editor_IsProcessDirty"}</label>
                <input id="Editor_IsProcessDirty" name="Editor.IsProcessDirty" type="hidden" defaultValue="False" aria-labelledby="Editor_IsProcessDirtyLabel" style={{}} />{" "}<label id="Editor_IsResetEnabledLabel" htmlFor="Editor_IsResetEnabled" className="display-none">{"Editor_IsResetEnabled"}</label>
                <input id="Editor_IsResetEnabled" name="Editor.IsResetEnabled" type="hidden" defaultValue="True" aria-labelledby="Editor_IsResetEnabledLabel" style={{}} />{" "}<label id="Editor_ModeLabel" htmlFor="Editor_Mode" className="display-none">{"Editor_Mode"}</label>
                <input id="Editor_Mode" name="Editor.Mode" type="hidden" defaultValue="Create" aria-labelledby="Editor_ModeLabel" style={{}} />{" "}<label id="Editor_NextActionTextLabel" htmlFor="Editor_NextActionText" className="display-none">{"Editor_NextActionText"}</label>
                <input id="Editor_NextActionText" name="Editor.NextActionText" type="hidden" defaultValue="Next" aria-labelledby="Editor_NextActionTextLabel" style={{}} />{" "}<label id="Editor_PrevActionTextLabel" htmlFor="Editor_PrevActionText" className="display-none">{"Editor_PrevActionText"}</label>
                <input id="Editor_PrevActionText" name="Editor.PrevActionText" type="hidden" defaultValue="Prev" aria-labelledby="Editor_PrevActionTextLabel" style={{}} />{" "}<label id="Editor_PrintActionTextLabel" htmlFor="Editor_PrintActionText" className="display-none">{"Editor_PrintActionText"}</label>
                <input id="Editor_PrintActionText" name="Editor.PrintActionText" type="hidden" defaultValue="" aria-labelledby="Editor_PrintActionTextLabel" style={{}} />{" "}<label id="Editor_PrintActionUrlLabel" htmlFor="Editor_PrintActionUrl" className="display-none">{"Editor_PrintActionUrl"}</label>
                <input id="Editor_PrintActionUrl" name="Editor.PrintActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_PrintActionUrlLabel" style={{}} />{" "}<label id="Editor_ResetActionTextLabel" htmlFor="Editor_ResetActionText" className="display-none">{"Editor_ResetActionText"}</label>
                <input id="Editor_ResetActionText" name="Editor.ResetActionText" type="hidden" defaultValue="Reset" aria-labelledby="Editor_ResetActionTextLabel" style={{}} />{" "}<label id="Editor_SaveActionTextLabel" htmlFor="Editor_SaveActionText" className="display-none">{"Editor_SaveActionText"}</label>
                <input id="Editor_SaveActionText" name="Editor.SaveActionText" type="hidden" defaultValue="Search" aria-labelledby="Editor_SaveActionTextLabel" style={{}} />{" "}<label id="Editor_SavedMessageLabel" htmlFor="Editor_SavedMessage" className="display-none">{"Editor_SavedMessage"}</label>
                <input id="Editor_SavedMessage" name="Editor.SavedMessage" type="hidden" defaultValue=" was successfully saved." aria-labelledby="Editor_SavedMessageLabel" style={{}} />{" "}<label id="Editor_ShowSummaryErrorLabel" htmlFor="Editor_ShowSummaryError" className="display-none">{"Editor_ShowSummaryError"}</label>
                <input id="Editor_ShowSummaryError" name="Editor.ShowSummaryError" type="hidden" defaultValue="True" aria-labelledby="Editor_ShowSummaryErrorLabel" style={{}} />{" "}<label id="Editor_StepLabel" htmlFor="Editor_Step" className="display-none">{"Editor_Step"}</label>
                <input id="Editor_Step" name="Editor.Step" type="hidden" defaultValue="1" aria-labelledby="Editor_StepLabel" style={{}} />{" "}<label id="Editor_StepCountLabel" htmlFor="Editor_StepCount" className="display-none">{"Editor_StepCount"}</label>
                <input id="Editor_StepCount" name="Editor.StepCount" type="hidden" defaultValue="1" aria-labelledby="Editor_StepCountLabel" style={{}} />{" "}<label id="Editor_TitleFormatTextLabel" htmlFor="Editor_TitleFormatText" className="display-none">{"Editor_TitleFormatText"}</label>
                <input id="Editor_TitleFormatText" name="Editor.TitleFormatText" type="hidden" defaultValue="{0} {1} - Step {2} of {3}" aria-labelledby="Editor_TitleFormatTextLabel" style={{}} />{" "}<div id="modelEditorButtonRow" className="editor-button-row-parent">{" "}<div className="editor-button-nav-left">{" "}<label id="prevButtonLabel" htmlFor="prevButton" className="display-none">{"Prev"}</label>
                    <input id="prevButton" type="button" className="k-button btn-spacer-right" value="Prev" style={{"display": "none"}} aria-labelledby="prevButtonLabel" data-testid="prevButton" />{" "}<label id="resetButtonLabel" htmlFor="resetButton" className="display-none">{"Reset"}</label>
                    <input id="resetButton" type="button" className="k-button btn-spacer-right" value="Reset" accessKey="Q" title="Alt+Q" aria-labelledby="resetButtonLabel" style={{}} data-kit-action="reset" data-testid="resetButton" />{" "}<label id="alt1ButtonLabel" htmlFor="alt1Button" className="display-none">{"Alt1"}</label>
                    <input id="alt1Button" type="button" className="k-button btn-spacer-right" value="Alt1" style={{"display": "none"}} aria-labelledby="alt1ButtonLabel" data-testid="alt1Button" />{" "}<label id="alt4ButtonLabel" htmlFor="alt4Button" className="display-none">{"Alt4"}</label>
                    <input id="alt4Button" type="button" className="k-button btn-spacer-right" value="Alt4" style={{"display": "none"}} aria-labelledby="alt4ButtonLabel" data-testid="alt4Button" />{" "}<label id="alt5ButtonLabel" htmlFor="alt5Button" className="display-none">{"Alt5"}</label>
                    <input id="alt5Button" type="button" className="k-button btn-spacer-right" value="Alt5" style={{"display": "none"}} aria-labelledby="alt5ButtonLabel" data-testid="alt5Button" />{" "}<label id="alt6ButtonLabel" htmlFor="alt6Button" className="display-none">{"Alt6"}</label>
                    <input id="alt6Button" type="button" className="k-button btn-spacer-right" value="Alt6" style={{"display": "none"}} aria-labelledby="alt6ButtonLabel" data-testid="alt6Button" />{" "}<label id="alt7ButtonLabel" htmlFor="alt7Button" className="display-none">{"Alt7"}</label>
                    <input id="alt7Button" type="button" className="k-button btn-spacer-right" value="Alt7" style={{"display": "none"}} aria-labelledby="alt7ButtonLabel" data-testid="alt7Button" />{" "}<label id="alt8ButtonLabel" htmlFor="alt8Button" className="display-none">{"Alt8"}</label>
                    <input id="alt8Button" type="button" className="k-button btn-spacer-right" value="Alt8" style={{"display": "none"}} aria-labelledby="alt8ButtonLabel" data-testid="alt8Button" />{" "}<label id="printButtonLabel" htmlFor="printButton" className="display-none">{"Print"}</label>
                    <input id="printButton" type="button" className="k-button" value="Print" style={{"display": "none"}} aria-labelledby="printButtonLabel" data-testid="printButton" />{" "}</div>{" "}<div className="editor-button-nav-right">{" "}<label id="alt2ButtonLabel" htmlFor="alt2Button" className="display-none">{"Alt2"}</label>
                    <input id="alt2Button" type="button" className="k-button" value="Alt2" style={{"display": "none"}} aria-labelledby="alt2ButtonLabel" data-testid="alt2Button" />{" "}<label id="alt3ButtonLabel" htmlFor="alt3Button" className="display-none">{"Alt3"}</label>
                    <input id="alt3Button" type="button" className="k-button btn-spacer-left" value="Alt3" style={{"display": "none"}} aria-labelledby="alt3ButtonLabel" data-testid="alt3Button" />{" "}<label id="cancelButtonLabel" htmlFor="cancelButton" className="display-none">{"Cancel"}</label>
                    <input id="cancelButton" type="button" className="k-button btn-spacer-left" value="Cancel" accessKey="1" title="Alt+1" aria-labelledby="cancelButtonLabel" style={{}} data-kit-action="cancel" data-testid="cancelButton" />{" "}<label id="nextButtonLabel" htmlFor="nextButton" className="display-none">{"Search"}</label>
                    <input id="nextButton" type="button" className="k-button btn-spacer-left" value="Search" accessKey="2" title="Alt+2" aria-labelledby="nextButtonLabel" style={{}} data-kit-action="search" data-testid="nextButton" />{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}<div id="claimsSearchResultsPanel" className="container" style={{"display": "none"}} data-kit-h="h44">{" "}<div className="row">{" "}<div className="content-panel-container" id="claimsInfoGrid">{" "}<div className="content-panel-hdr">{"\n                    Search Results\n                "}</div>{" "}<div id="claimsGridInfo">{" "}<KitWidget id="k17" />{" "}</div>{" "}<br />{" "}<div id="quickInfoSection">{" "}<div id="selectedClaimPanel">{" "}<div className="row text-align-top" id="divSelectedClaimPrevNext">{" "}<div className="paid-claim-selected-row">{" "}<div className="cellright" id="divSelectedClaimAssocBox">{" "}<div className="col-md-6 text-right paddingTop10px">{"\n                        SELECTED CLAIM\n                    "}</div>{" "}<div className="col-md-2 align-right cellright">{" "}<button accessKey="N" className="nav-button k-button btn-spacer-right k-icon-button" id="nextClaimButton" title="Alt+N" type="button" data-role="button" role="button" aria-disabled="false" tabIndex={0} data-testid="nextClaimButton">
                        <span className="k-sprite fa-solid fa-sort-down fa-2x k-button-icon"></span>
                        </button>{" "}<br />{" "}<br />{" "}</div>{" "}<div className="col-md-2 align-right cellright">{" "}<button accessKey="P" className="nav-button k-button btn-spacer-right k-icon-button" id="prevClaimButton" title="Alt+P" type="button" data-role="button" role="button" aria-disabled="false" tabIndex={0} data-testid="prevClaimButton">
                        <span className="k-sprite fa-solid fa-sort-up fa-2x k-button-icon"></span>
                        </button>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="content-subpanel-container">{" "}<div className="content-subpanel-hdr">{"\n                Quick Information\n            "}</div>{" "}<div className="content-subpanel-bdy">{" "}<fieldset data-role="validator">{" "}<div id="selectedClaimRecord" className="panel-body">{" "}<div className="editor-section">{" "}<div id="divinputClaimsInformationPanelControls">{" "}<div className="row">{" "}<div className="col-md-6">{" "}<div className="subsec-panel-hdr-topmost">{"\n                                            Member Information\n                                        "}</div>{" "}<div className="row">{" "}<div className="col-md-6 editor-col" id="View_MemberName_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="View_MemberName" id="View_MemberNameLabel" readOnly={true} className="readonly-label" title="Member Name">{"Member Name"}</label>
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_MemberNameHelp" role="img" title="Full name of the Member associated with the Member ID." data-role="tooltip" data-kit-tip="Full name of the Member associated with the Member ID." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_MemberNameHelp"></span>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                      <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Member Name has a maximum length of 125 characters." data-val-regex="Member Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="View_MemberName" ignoredirtydata="False" maxLength={125} name="MemberName" not-data-val-required="Member Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_MemberNameLabel View_MemberNameHelpDesc" defaultValue="" data-testid="View_MemberName" />
                                      </span>{" "}<span className="k-invalid-msg" id="View_MemberName_validationMessage" data-for="View_MemberName"></span>
                                    <span id="View_MemberNameHelpDesc" hidden={true}>{"Full name of the Member associated with the Member ID."}</span>
                                    </div>
                                  </div>{" "}<div className="col-md-3 editor-col" id="View_MemberDOB_parent" data-template="Date">
                                  <div className="editor-label">
                                    <label htmlFor="View_MemberDOB" id="View_MemberDOBLabel" readOnly={true} className="readonly-label" title="DOB">{"DOB"}</label>
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_MemberDOBHelp" role="img" title="Member's date of birth." data-role="tooltip" data-kit-tip="Member's date of birth." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_MemberDOBHelp"></span>
                                    </div>
                                  <div className="editor-field">{" "}<KitWidget id="k18" />
                                    <span className="k-invalid-msg" id="View_MemberDOB_validationMessage" data-for="View_MemberDOB"></span>
                                    <span id="View_MemberDOBHelpDesc" hidden={true}>{"Member's date of birth."}</span>
                                    </div>
                                  </div>{" "}<div className="col-md-2 editor-col" id="View_MemberGenderCode_parent" data-template="TextBoxHoverClaims">
                                  <div className="editor-label">
                                    <label htmlFor="View_MemberGenderCode" id="View_MemberGenderCodeLabel" readOnly={true} className="readonly-label" title="Gender">{"Gender"}</label>
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_MemberGenderCodeHelp" role="img" title="Member's gender." data-role="tooltip" data-kit-tip="Member's gender." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_MemberGenderCodeHelp"></span>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox k-readonly readonly-widget" style={{}}>
                                      <label id="View_MemberGenderCode_IDLabel" htmlFor="View_MemberGenderCode_ID" className="display-none">{"View_MemberGenderCode_ID"}</label>
                                      <input readOnly={true} id="View_MemberGenderCode_ID" name="MemberGenderCode.ID" data-role="textbox" aria-disabled="false" className="k-input-inner readonly-widget" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_MemberGenderCodeLabel View_MemberGenderCodeHelpDesc" defaultValue="" data-testid="View_MemberGenderCode_ID" />
                                      </span>{" "}<label id="View_MemberGenderCode_descLabel" htmlFor="View_MemberGenderCode_desc" className="display-none">{"View_MemberGenderCode_desc"}</label>
                                    <input readOnly={true} id="View_MemberGenderCode_desc" type="hidden" defaultValue="" aria-labelledby="View_MemberGenderCode_descLabel" style={{}} />
                                    <span className="k-invalid-msg" id="View_MemberGenderCode_validationMessage" data-for="View_MemberGenderCode"></span>
                                    <span id="View_MemberGenderCodeHelpDesc" hidden={true}>{"Member's gender."}</span>
                                    </div>
                                  </div>{" "}</div>{" "}</div>{" "}<div className="col-md-6">{" "}<div className="subsec-panel-hdr-topmost">{"\n                                            Provider Information\n                                        "}</div>{" "}<div className="row">{" "}<div className="col-md-6 editor-col" id="View_BillingProviderName_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="View_BillingProviderName" id="View_BillingProviderNameLabel" readOnly={true} className="readonly-label" title="Billing Prov Name">{"Billing Prov Name"}</label>
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_BillingProviderNameHelp" role="img" title="This is the name for the billing provider on the claim." data-role="tooltip" data-kit-tip="This is the name for the billing provider on the claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_BillingProviderNameHelp"></span>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                      <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Billing Prov Name has a maximum length of 125 characters." data-val-regex="Billing Prov Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="View_BillingProviderName" ignoredirtydata="False" maxLength={125} name="BillingProviderName" not-data-val-required="Billing Prov Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_BillingProviderNameLabel View_BillingProviderNameHelpDesc" defaultValue="" data-testid="View_BillingProviderName" />
                                      </span>{" "}<span className="k-invalid-msg" id="View_BillingProviderName_validationMessage" data-for="View_BillingProviderName"></span>
                                    <span id="View_BillingProviderNameHelpDesc" hidden={true}>{"This is the name for the billing provider on the claim."}</span>
                                    </div>
                                  </div>{" "}<div className="col-md-4 editor-col" id="View_BillingProviderTaxId_parent" data-template="Text">
                                  <div className="editor-label">
                                    <label htmlFor="View_BillingProviderTaxId" id="View_BillingProviderTaxIdLabel" readOnly={true} className="readonly-label" title="Billing Prov Tax ID">{"Billing Prov Tax ID"}</label>
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_BillingProviderTaxIdHelp" role="img" title="This is the tax identifier for the billing provider on the claim." data-role="tooltip" data-kit-tip="This is the tax identifier for the billing provider on the claim." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_BillingProviderTaxIdHelp"></span>
                                    </div>
                                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                      <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Billing Prov Tax ID has a maximum length of 50 characters." data-val-regex="Billing Prov Tax ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="View_BillingProviderTaxId" ignoredirtydata="False" maxLength={50} name="BillingProviderTaxId" not-data-val-required="Billing Prov Tax ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_BillingProviderTaxIdLabel View_BillingProviderTaxIdHelpDesc" defaultValue="" data-testid="View_BillingProviderTaxId" />
                                      </span>{" "}<span className="k-invalid-msg" id="View_BillingProviderTaxId_validationMessage" data-for="View_BillingProviderTaxId"></span>
                                    <span id="View_BillingProviderTaxIdHelpDesc" hidden={true}>{"This is the tax identifier for the billing provider on the claim."}</span>
                                    </div>
                                  </div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="row col-md-12">{" "}<div className="editor-clear subsec-panel-hdr">{"\n                                        Payment Information\n                                    "}</div>{" "}<div className="row">{" "}<div className="col-md-2 editor-col" id="View_TotalAllowedAmount_parent" data-template="Currency">
                                <div className="editor-label">
                                  <label htmlFor="View_TotalAllowedAmount" id="View_TotalAllowedAmountLabel" readOnly={true} className="readonly-label" title="Total Allowed">{"Total Allowed"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_TotalAllowedAmountHelp" role="img" title="Amount calculated based on pricing fee schedule and business rules" data-role="tooltip" data-kit-tip="Amount calculated based on pricing fee schedule and business rules" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_TotalAllowedAmountHelp"></span>
                                  </div>
                                <div className="editor-field">
                                  <KitWidget id="k19" />{" "}<span className="k-invalid-msg" id="View_TotalAllowedAmount_validationMessage" data-for="View_TotalAllowedAmount"></span>
                                  <span id="View_TotalAllowedAmountHelpDesc" hidden={true}>{"Amount calculated based on pricing fee schedule and business rules"}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_TotalCopayAmount_parent" data-template="Currency">
                                <div className="editor-label">
                                  <label htmlFor="View_TotalCopayAmount" id="View_TotalCopayAmountLabel" readOnly={true} className="readonly-label" title="Total Copay">{"Total Copay"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_TotalCopayAmountHelp" role="img" title="Amount of money the member pays for services rendered, usually when you receive the service." data-role="tooltip" data-kit-tip="Amount of money the member pays for services rendered, usually when you receive the service." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_TotalCopayAmountHelp"></span>
                                  </div>
                                <div className="editor-field">
                                  <KitWidget id="k20" />{" "}<span className="k-invalid-msg" id="View_TotalCopayAmount_validationMessage" data-for="View_TotalCopayAmount"></span>
                                  <span id="View_TotalCopayAmountHelpDesc" hidden={true}>{"Amount of money the member pays for services rendered, usually when you receive the service."}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_TotalCoinsuranceAmount_parent" data-template="Currency">
                                <div className="editor-label">
                                  <label htmlFor="View_TotalCoinsuranceAmount" id="View_TotalCoinsuranceAmountLabel" readOnly={true} className="readonly-label" title="Total Coinsurance">{"Total Coinsurance"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_TotalCoinsuranceAmountHelp" role="img" title="The amount based on a percentage of the Provider's charge that is the member's responsibility. " data-role="tooltip" data-kit-tip="The amount based on a percentage of the Provider's charge that is the member's responsibility." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_TotalCoinsuranceAmountHelp"></span>
                                  </div>
                                <div className="editor-field">
                                  <KitWidget id="k21" />{" "}<span className="k-invalid-msg" id="View_TotalCoinsuranceAmount_validationMessage" data-for="View_TotalCoinsuranceAmount"></span>
                                  <span id="View_TotalCoinsuranceAmountHelpDesc" hidden={true}>{"The amount based on a percentage of the Provider's charge that is the member's responsibility. "}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_TotalDeductibleAmount_parent" data-template="Currency">
                                <div className="editor-label">
                                  <label htmlFor="View_TotalDeductibleAmount" id="View_TotalDeductibleAmountLabel" readOnly={true} className="readonly-label" title="Total Deductible">{"Total Deductible"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_TotalDeductibleAmountHelp" role="img" title="Amount of money the member is responsible for paying for services rendered." data-role="tooltip" data-kit-tip="Amount of money the member is responsible for paying for services rendered." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_TotalDeductibleAmountHelp"></span>
                                  </div>
                                <div className="editor-field">
                                  <KitWidget id="k22" />{" "}<span className="k-invalid-msg" id="View_TotalDeductibleAmount_validationMessage" data-for="View_TotalDeductibleAmount"></span>
                                  <span id="View_TotalDeductibleAmountHelpDesc" hidden={true}>{"Amount of money the member is responsible for paying for services rendered."}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_TotalSpenddownAmount_parent" data-template="Currency">
                                <div className="editor-label">
                                  <label htmlFor="View_TotalSpenddownAmount" id="View_TotalSpenddownAmountLabel" readOnly={true} className="readonly-label" title="Total Spenddown">{"Total Spenddown"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_TotalSpenddownAmountHelp" role="img" title="Amount of money the member is responsible for paying for services rendered." data-role="tooltip" data-kit-tip="Amount of money the member is responsible for paying for services rendered." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_TotalSpenddownAmountHelp"></span>
                                  </div>
                                <div className="editor-field">
                                  <KitWidget id="k23" />{" "}<span className="k-invalid-msg" id="View_TotalSpenddownAmount_validationMessage" data-for="View_TotalSpenddownAmount"></span>
                                  <span id="View_TotalSpenddownAmountHelpDesc" hidden={true}>{"Amount of money the member is responsible for paying for services rendered."}</span>
                                  </div>
                                </div>{" "}</div>{" "}</div>{" "}<div className="row col-md-12">{" "}<div className="editor-clear subsec-panel-hdr">{"\n                                        Additional Information\n                                    "}</div>{" "}<div className="row">{" "}<label id="PrimaryDiagnosis_CodeDescrLabel" htmlFor="PrimaryDiagnosis_CodeDescr" className="display-none">{"PrimaryDiagnosis_CodeDescr"}</label>
                              <input id="PrimaryDiagnosis_CodeDescr" name="PrimaryDiagnosis.CodeDescr" type="hidden" defaultValue="" aria-labelledby="PrimaryDiagnosis_CodeDescrLabel" style={{}} />{" "}<div className="col-md-1 editor-col" id="View_PrimaryDiagnosis.Qualifier_parent" data-template="TextBoxHoverClaims">
                                <div className="editor-label">
                                  <label htmlFor="PrimaryDiagnosis_Qualifier" id="PrimaryDiagnosis_QualifierLabel" readOnly={true} className="readonly-label" title="Qual">{"Qual"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="PrimaryDiagnosis_QualifierHelp" role="img" title="DX Code List qualifier identifying a specific industry" data-role="tooltip" data-kit-tip="DX Code List qualifier identifying a specific industry" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="PrimaryDiagnosis_QualifierHelp"></span>
                                  </div>
                                <div className="editor-field">{" "}<span className="k-input k-textbox k-readonly readonly-widget" style={{}}>
                                    <label id="PrimaryDiagnosis_Qualifier_IDLabel" htmlFor="PrimaryDiagnosis_Qualifier_ID" className="display-none">{"PrimaryDiagnosis_Qualifier_ID"}</label>
                                    <input readOnly={true} id="PrimaryDiagnosis_Qualifier_ID" name="PrimaryDiagnosis.Qualifier.ID" data-role="textbox" aria-disabled="false" className="k-input-inner readonly-widget" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="PrimaryDiagnosis_QualifierLabel PrimaryDiagnosis_QualifierHelpDesc" defaultValue="" data-testid="PrimaryDiagnosis_Qualifier_ID" />
                                    </span>{" "}<label id="PrimaryDiagnosis_Qualifier_descLabel" htmlFor="PrimaryDiagnosis_Qualifier_desc" className="display-none">{"PrimaryDiagnosis_Qualifier_desc"}</label>
                                  <input readOnly={true} id="PrimaryDiagnosis_Qualifier_desc" type="hidden" defaultValue="" aria-labelledby="PrimaryDiagnosis_Qualifier_descLabel" style={{}} />
                                  <span className="k-invalid-msg" id="PrimaryDiagnosis_Qualifier_validationMessage" data-for="View_PrimaryDiagnosis.Qualifier"></span>
                                  <span id="PrimaryDiagnosis_QualifierHelpDesc" hidden={true}>{"DX Code List qualifier identifying a specific industry"}</span>
                                  </div>
                                </div>{" "}<div className="col-md-1 editor-col" id="View_PrimaryDiagnosis.Code_parent" data-template="Text">
                                <div className="editor-label">
                                  <label htmlFor="PrimaryDiagnosis_Code" id="PrimaryDiagnosis_CodeLabel" readOnly={true} className="readonly-label" title="Code">{"Code"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="PrimaryDiagnosis_CodeHelp" role="img" title="The major or primary diagnosis for this claim" data-role="tooltip" data-kit-tip="The major or primary diagnosis for this claim" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="PrimaryDiagnosis_CodeHelp"></span>
                                  </div>
                                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                    <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Code has a maximum length of 50 characters." data-val-regex="Code contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="PrimaryDiagnosis_Code" ignoredirtydata="False" maxLength={50} name="PrimaryDiagnosis.Code" not-data-val-required="Code is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="PrimaryDiagnosis_CodeLabel PrimaryDiagnosis_CodeHelpDesc" defaultValue="" data-testid="PrimaryDiagnosis_Code" />
                                    </span>{" "}<span className="k-invalid-msg" id="PrimaryDiagnosis_Code_validationMessage" data-for="View_PrimaryDiagnosis.Code"></span>
                                  <span id="PrimaryDiagnosis_CodeHelpDesc" hidden={true}>{"The major or primary diagnosis for this claim"}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_ExceptionErrorCode_parent" data-template="TextBoxHoverClaims">
                                <div className="editor-label">
                                  <label htmlFor="View_ExceptionErrorCode" id="View_ExceptionErrorCodeLabel" readOnly={true} className="readonly-label" title="Exp Error Code">{"Exp Error Code"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_ExceptionErrorCodeHelp" role="img" title="Code used to identify the failed edit or audit." data-role="tooltip" data-kit-tip="Code used to identify the failed edit or audit." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_ExceptionErrorCodeHelp"></span>
                                  </div>
                                <div className="editor-field">{" "}<span className="k-input k-textbox k-readonly readonly-widget" style={{}}>
                                    <label id="View_ExceptionErrorCode_IDLabel" htmlFor="View_ExceptionErrorCode_ID" className="display-none">{"View_ExceptionErrorCode_ID"}</label>
                                    <input readOnly={true} id="View_ExceptionErrorCode_ID" name="ExceptionErrorCode.ID" data-role="textbox" aria-disabled="false" className="k-input-inner readonly-widget" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_ExceptionErrorCodeLabel View_ExceptionErrorCodeHelpDesc" defaultValue="" data-testid="View_ExceptionErrorCode_ID" />
                                    </span>{" "}<label id="View_ExceptionErrorCode_descLabel" htmlFor="View_ExceptionErrorCode_desc" className="display-none">{"View_ExceptionErrorCode_desc"}</label>
                                  <input readOnly={true} id="View_ExceptionErrorCode_desc" type="hidden" defaultValue="" aria-labelledby="View_ExceptionErrorCode_descLabel" style={{}} />
                                  <span className="k-invalid-msg" id="View_ExceptionErrorCode_validationMessage" data-for="View_ExceptionErrorCode"></span>
                                  <span id="View_ExceptionErrorCodeHelpDesc" hidden={true}>{"Code used to identify the failed edit or audit."}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_Department_parent" data-template="Text">
                                <div className="editor-label">
                                  <label htmlFor="View_Department" id="View_DepartmentLabel" readOnly={true} className="readonly-label" title="Department">{"Department"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_DepartmentHelp" role="img" title="Identifies the current department to which the claim is assigned. " data-role="tooltip" data-kit-tip="Identifies the current department to which the claim is assigned." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_DepartmentHelp"></span>
                                  </div>
                                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                    <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Department has a maximum length of 50 characters." data-val-regex="Department contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="View_Department" ignoredirtydata="False" maxLength={50} name="Department" not-data-val-required="Department is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_DepartmentLabel View_DepartmentHelpDesc" defaultValue="" data-testid="View_Department" />
                                    </span>{" "}<span className="k-invalid-msg" id="View_Department_validationMessage" data-for="View_Department"></span>
                                  <span id="View_DepartmentHelpDesc" hidden={true}>{"Identifies the current department to which the claim is assigned. "}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="View_Location_parent" data-template="Text">
                                <div className="editor-label">
                                  <label htmlFor="View_Location" id="View_LocationLabel" readOnly={true} className="readonly-label" title="Location">{"Location"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="View_LocationHelp" role="img" title="Identifies the current location to which the claim is assigned." data-role="tooltip" data-kit-tip="Identifies the current location to which the claim is assigned." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="View_LocationHelp"></span>
                                  </div>
                                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                    <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Location has a maximum length of 50 characters." data-val-regex="Location contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="View_Location" ignoredirtydata="False" maxLength={50} name="Location" not-data-val-required="Location is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="View_LocationLabel View_LocationHelpDesc" defaultValue="" data-testid="View_Location" />
                                    </span>{" "}<span className="k-invalid-msg" id="View_Location_validationMessage" data-for="View_Location"></span>
                                  <span id="View_LocationHelpDesc" hidden={true}>{"Identifies the current location to which the claim is assigned."}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="EmergencyIndicator_parent">
                                <div className="editor-label">
                                  <label>{" "}</label>
                                  </div>
                                <div className="editor-field assoc-box-checkbox">
                                  <span className="k-checkbox-wrap">
                                    <span className="k-checkbox-wrap">
                                      <input className="editor-control k-checkbox" data-role="checkbox" id="EmergencyIndicator" ignoredirtydata="False" name="EmergencyIndicator" not-data-val-required="Emergency is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="EmergencyIndicatorHelpDesc" data-testid="EmergencyIndicator" />
                                      </span>
                                    <label htmlFor="EmergencyIndicator" className="k-checkbox-label" style={{}}>{"Emergency"}</label>
                                    </span>
                                  <input name="EmergencyIndicator" type="hidden" defaultValue="false" style={{}} />
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="EmergencyIndicatorHelp" role="img" title="Indicates whether service was provided as a result of an emergency situation." data-role="tooltip" data-kit-tip="Indicates whether service was provided as a result of an emergency situation." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="EmergencyIndicatorHelp"></span>
                                  <span className="k-invalid-msg" id="EmergencyIndicator_validationMessage" data-for="EmergencyIndicator"></span>
                                  <span id="EmergencyIndicatorHelpDesc" hidden={true}>{"Indicates whether service was provided as a result of an emergency situation."}</span>
                                  </div>
                                </div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>
    </form>{" "}</main></KitScreen></>
  );
}

