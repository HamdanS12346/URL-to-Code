// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, type KitData } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/search-enrollment-application';

// pe-v1/search-enrollment-application: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function SearchEnrollmentApplicationPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "Search Enrollment Application";
    body.className = "ProviderEnrollment SearchProviderApplication";
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
    <><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/ProviderEnrollment/SearchProviderApplication" className="k-content" id="ProviderSearchForm" method="post" name="ProviderSearchForm" data-role="validator" noValidate={true}>
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="6JBhSxn8Fcl9cB9juCCCI8-HKC1do3thlfvqGvGn1QoaEBpZO_cyT2M2DpCK06JddRgWXvs42Q8UG12YWxdp9ePbAZ-XkPH7dCl4noAsHM6mE6dgKkjzS-NWxu48bK5Iss6XoIBPNzfYlyx5wo6OKA2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" style={{"display": "none"}} data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="container">{" "}<div className="row">{" "}<fieldset>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                        Search Enrollment Application\n                    "}</div>{" "}<div id="PlusMinusSearchProvider" className="content-panel-hdr-tools">{" "}<div className="content-ordered-panel-hdr-tools">
                <div className="panel-icon clickable" data-kit-action="collapse" data-testid="button-22">{" "}<div id="searchCriteriaPanelIcon" className="fa-solid fa-angle-up" title="Collapse" tabIndex={0} data-testid="searchCriteriaPanelIcon"></div>{" "}</div>
                </div>
              </div>{" "}<div id="providerSearch" className="content-panel-bdy display-block" data-kit-collapse="open">{" "}<div className="panel-body">{" "}<div>{" "}<div className="col-md-3 editor-col" id="ATN_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="ATN" id="ATNLabel" title="ATN">{"ATN"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ATNHelp" role="img" title="The ATN is a unique number assigned to an enrollment application initiated by a provider." data-role="tooltip" data-kit-tip="The ATN is a unique number assigned to an enrollment application initiated by a provider." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ATNHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="ATN has a maximum length of 10 characters." data-val-number="ATN is restricted to numeric characters only [0-9]." data-val-regex="ATN is restricted to numeric characters only [0-9]." data-val-regex-pattern="^([0-9])*$" height="0" id="ATN" ignoredirtydata="False" maxLength={10} name="ATN" not-data-val-required="ATN is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="ATNLabel ATNHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="ATN" />
                        </span>
                      <span className="k-invalid-msg" id="ATN_validationMessage" data-for="ATN"></span>
                      <span id="ATNHelpDesc" hidden={true}>{"The ATN is a unique number assigned to an enrollment application initiated by a provider."}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="LegacyID_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="LegacyID" id="LegacyIDLabel" title="Service Location ID">{"Service Location ID"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="LegacyIDHelp" role="img" title="Service Location ID" data-role="tooltip" data-kit-tip="Service Location ID" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="LegacyIDHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="Service Location ID has a maximum length of 14 characters." data-val-regex="Service Location ID is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="LegacyID" ignoredirtydata="False" maxLength={14} name="LegacyID" not-data-val-required="Service Location ID is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="LegacyIDLabel LegacyIDHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="LegacyID" />
                        </span>
                      <span className="k-invalid-msg" id="LegacyID_validationMessage" data-for="LegacyID"></span>
                      <span id="LegacyIDHelpDesc" hidden={true}>{"Service Location ID"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="NPI_parent" data-template="NPI">
                    <div className="editor-label">
                      <label htmlFor="NPI" id="NPILabel" title="NPI ">{"NPI "}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="NPIHelp" role="img" title="Enter the ten digit National Provider Identifier as printed on the NPPES letter." data-role="tooltip" data-kit-tip="Enter the ten digit National Provider Identifier as printed on the NPPES letter." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="NPIHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-maskedtextbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner k-widget" data-val-length-max="NPI  has a maximum length of 10 characters." data-val-number="NPI  is restricted to numeric characters only [0-9]." data-val-regex="NPI  is restricted to numeric characters only [0-9]." data-val-regex-pattern="^([0-9])*$" height="0" id="NPI" ignoredirtydata="False" name="NPI" not-data-val-required="NPI  is a required field." data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="0000000000" aria-labelledby="NPILabel NPIHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="NPI" />
                        </span>
                      <span className="k-invalid-msg" id="NPI_validationMessage" data-for="NPI"></span>
                      <span id="NPIHelpDesc" hidden={true}>{"Enter the ten digit National Provider Identifier as printed on the NPPES letter."}</span>
                      </div>
                    </div>{" "}<div className="editor-section">{" "}<div className="col-md-3 editor-col" id="TaxIdSelection_parent" data-template="RadioButtonList">
                      <div className="editor-label">
                        <label htmlFor="TaxIdSelection" id="TaxIdSelectionLabel" title="Tax ID">{"Tax ID"}</label>
                        <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TaxIdSelectionHelp" role="img" title="Tax ID" data-role="tooltip" data-kit-tip="Tax ID" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="TaxIdSelectionHelp"></span>
                        </div>
                      <div className="editor-field">{" "}<div className="assoc-box-radio-btn-list-horz">{" "}<span className="list-item">
                            <input className="k-radio" id="TaxIdSelection_IDEIN" name="TaxIdSelection.ID" type="radio" defaultValue="EIN" ignoredirtydata="False" aria-describedby="TaxIdSelectionHelpDesc" aria-hidden="false" style={{}} data-testid="TaxIdSelection_IDEIN" />
                            <label className="k-radio-label" htmlFor="TaxIdSelection_IDEIN">{"EIN"}</label>
                            </span>
                          <span className="list-item">
                            <input className="k-radio" id="TaxIdSelection_IDSSN" name="TaxIdSelection.ID" type="radio" defaultValue="SSN" ignoredirtydata="False" aria-describedby="TaxIdSelectionHelpDesc" aria-hidden="false" style={{}} data-testid="TaxIdSelection_IDSSN" />
                            <label className="k-radio-label" htmlFor="TaxIdSelection_IDSSN">{"SSN"}</label>
                            </span>{" "}</div>{" "}<span className="k-invalid-msg" id="TaxIdSelection_validationMessage" data-for="TaxIdSelection"></span>
                        <span id="TaxIdSelectionHelpDesc" hidden={true}>{"Tax ID"}</span>
                        </div>
                      </div>{" "}</div>{" "}<div className="col-md-3 editor-col editor-clear" id="SSN_parent" data-template="SSNWithRedact" style={{"display": "none"}}>
                    <div className="editor-field">{" "}<span className="k-input k-maskedtextbox editor-control" style={{}}>
                        <label id="SSNLabel" htmlFor="SSN" className="display-none">{"SSN"}</label>
                        <input className="editor-control k-input-inner k-widget" data-val-redact-regex="Enter a valid SSN." data-val-regex-pattern="^(.)*$" id="SSN" ignoredirtydata="False" name="SSN" not-data-val-required="SSN is a required field." data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="&amp;&amp;&amp;-&amp;&amp;-&amp;&amp;&amp;&amp;" style={{"width": "100%"}} data-widget-type="SSNWithRedact" aria-labelledby="SSNLabel" aria-hidden="false" defaultValue="" data-testid="SSN" />
                        <span id="SSNSpan" className="textbox-combo-icon clickable" unselectable="on" tabIndex={-1} data-testid="SSNSpan">
                          <i id="SSNIcon" className="k-icon fa-solid fa-eye" tabIndex={0} role="button" aria-label="Redaction toggle" data-testid="SSNIcon"></i>
                          </span>
                        <span className="k-icon k-svg-icon k-svg-i-exclamation-circle k-input-validation-icon k-hidden">
                          <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                            <path d="M224 128h64v160h-64zm0 256h64v-64h-64zm256-128c0 123.7-100.3 224-224 224S32 379.7 32 256 132.3 32 256 32s224 100.3 224 224m-32 0c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192" />
                            </svg>
                          </span>
                        </span>{" "}<span className="k-invalid-msg" id="SSN_validationMessage" data-for="SSN"></span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col editor-clear" id="EIN_parent" data-template="EINWithRedact" style={{"display": "none"}}>
                    <div className="editor-field">{" "}<span className="k-input k-maskedtextbox editor-control" style={{}}>
                        <label id="EINLabel" htmlFor="EIN" className="display-none">{"EIN"}</label>
                        <input className="editor-control k-input-inner k-widget" data-val-redact-regex="Enter a valid EIN." data-val-regex-pattern="^(.)*$" id="EIN" ignoredirtydata="False" name="EIN" not-data-val-required="EIN is a required field." data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="&amp;&amp;-&amp;&amp;&amp;&amp;&amp;&amp;&amp;" data-widget-type="EINWithRedact" aria-labelledby="EINLabel" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="EIN" />
                        <span id="EINSpan" className="textbox-combo-icon clickable" unselectable="on" tabIndex={-1} data-testid="EINSpan">
                          <i id="EINIcon" className="k-icon fa-solid fa-eye" tabIndex={0} role="button" aria-label="Redaction toggle" data-testid="EINIcon"></i>
                          </span>
                        <span className="k-icon k-svg-icon k-svg-i-exclamation-circle k-input-validation-icon k-hidden">
                          <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                            <path d="M224 128h64v160h-64zm0 256h64v-64h-64zm256-128c0 123.7-100.3 224-224 224S32 379.7 32 256 132.3 32 256 32s224 100.3 224 224m-32 0c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192" />
                            </svg>
                          </span>
                        </span>{" "}<span className="k-invalid-msg" id="EIN_validationMessage" data-for="EIN"></span>
                      </div>
                    </div>{" "}<label id="TaxIdTypeLabel" htmlFor="TaxIdType" className="display-none">{"TaxIdType"}</label>
                  <input id="TaxIdType" name="TaxIdType" type="hidden" defaultValue="" aria-labelledby="TaxIdTypeLabel" aria-hidden="false" style={{}} />{" "}<div className="col-md-3 editor-col editor-clear" id="LastName_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="LastName" id="LastNameLabel" title="Last Name">{"Last Name"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="LastNameHelp" role="img" title="Enter the Last Name." data-role="tooltip" data-kit-tip="Enter the Last Name." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="LastNameHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="Last Name has a maximum length of 50 characters." data-val-regex="Last Name contains invalid characters: Must start with a letter. Allowed characters: letters, single spaces, and [' , . -]." data-val-regex-pattern="^([A-Za-z'.,\\-][A-Z a-z'.,\\-]*[A-Za-z'.,\\-]|[A-Za-z'.,\\-])$" height="0" id="LastName" ignoredirtydata="False" maxLength={50} name="LastName" not-data-val-required="Last Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="LastNameLabel LastNameHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="LastName" />
                        </span>
                      <span className="k-invalid-msg" id="LastName_validationMessage" data-for="LastName"></span>
                      <span id="LastNameHelpDesc" hidden={true}>{"Enter the Last Name."}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="FirstName_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="FirstName" id="FirstNameLabel" title="First Name">{"First Name"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FirstNameHelp" role="img" title="Enter the First Name." data-role="tooltip" data-kit-tip="Enter the First Name." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FirstNameHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="First Name has a maximum length of 50 characters." data-val-regex="First Name contains invalid characters: Must start with a letter. Allowed characters: letters, single spaces, and [' , . -]." data-val-regex-pattern="^([A-Za-z'.,\\-][A-Z a-z'.,\\-]*[A-Za-z'.,\\-]|[A-Za-z'.,\\-])$" height="0" id="FirstName" ignoredirtydata="False" maxLength={50} name="FirstName" not-data-val-required="First Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="FirstNameLabel FirstNameHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="FirstName" />
                        </span>
                      <span className="k-invalid-msg" id="FirstName_validationMessage" data-for="FirstName"></span>
                      <span id="FirstNameHelpDesc" hidden={true}>{"Enter the First Name."}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="BusinessName_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="BusinessName" id="BusinessNameLabel" title="Business Name">{"Business Name"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="BusinessNameHelp" role="img" title="Enter Business Name" data-role="tooltip" data-kit-tip="Enter Business Name" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="BusinessNameHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="Business Name has a maximum length of 50 characters." data-val-regex="Business Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % and Unicode are not allowed." data-val-regex-pattern="^[A-Za-z0-9 `!@#$&amp;()_+\\-={}|[\\]\\&quot;',.\\/?]+$" height="0" id="BusinessName" ignoredirtydata="False" maxLength={50} name="BusinessName" not-data-val-required="Business Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="BusinessNameLabel BusinessNameHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="BusinessName" />
                        </span>
                      <span className="k-invalid-msg" id="BusinessName_validationMessage" data-for="BusinessName"></span>
                      <span id="BusinessNameHelpDesc" hidden={true}>{"Enter Business Name"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="ContactEmail_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="ContactEmail" id="ContactEmailLabel" title="Contact Email">{"Contact Email"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ContactEmailHelp" role="img" title="Contact Email" data-role="tooltip" data-kit-tip="Contact Email" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ContactEmailHelp"></span>
                      </div>
                    <div className="editor-field">
                      <span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="Contact Email has a maximum length of 150 characters." data-val-regex="Contact Email is not a valid email address. Enter email with 'name@domain' format." data-val-regex-pattern="^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$" height="0" id="ContactEmail" ignoredirtydata="False" maxLength={150} name="ContactEmail" not-data-val-required="Contact Email is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="ContactEmailLabel ContactEmailHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="ContactEmail" />
                        </span>
                      <span className="k-invalid-msg" id="ContactEmail_validationMessage" data-for="ContactEmail"></span>
                      <span id="ContactEmailHelpDesc" hidden={true}>{"Contact Email"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col editor-clear" id="EnrollmentTypeList_parent" data-template="ListItemSingle">
                    <div className="editor-label">
                      <label htmlFor="EnrollmentType" id="EnrollmentTypeLabel" title="Enrollment Type">{"Enrollment Type"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="EnrollmentTypeHelp" role="img" title="Enrollment Type" data-role="tooltip" data-kit-tip="Enrollment Type" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="EnrollmentTypeHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k1" />{" "}<label id="EnrollmentType_IDLabel" htmlFor="EnrollmentType_ID" className="display-none">{"EnrollmentType_ID"}</label>
                      <input id="EnrollmentType_ID" name="EnrollmentType.ID" type="hidden" defaultValue="" aria-labelledby="EnrollmentType_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="EnrollmentType_NameLabel" htmlFor="EnrollmentType_Name" className="display-none">{"EnrollmentType_Name"}</label>
                      <input id="EnrollmentType_Name" name="EnrollmentType.Name" type="hidden" defaultValue="" aria-labelledby="EnrollmentType_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="EnrollmentType_DisplayFormatLabel" htmlFor="EnrollmentType_DisplayFormat" className="display-none">{"EnrollmentType_DisplayFormat"}</label>
                      <input id="EnrollmentType_DisplayFormat" name="EnrollmentType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="EnrollmentType_DisplayFormatLabel" aria-hidden="false" style={{}} />
                      <span className="k-invalid-msg" id="EnrollmentTypeList_validationMessage" data-for="EnrollmentTypeList"></span>
                      <span id="EnrollmentTypeHelpDesc" hidden={true}>{"Enrollment Type"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="ProviderTypeList_parent" data-template="ListItemSingle">
                    <div className="editor-label">
                      <label htmlFor="ProviderType" id="ProviderTypeLabel" title="Provider Type">{"Provider Type"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderTypeHelp" role="img" title="Provider Type" data-role="tooltip" data-kit-tip="Provider Type" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderTypeHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k2" />{" "}<label id="ProviderType_IDLabel" htmlFor="ProviderType_ID" className="display-none">{"ProviderType_ID"}</label>
                      <input id="ProviderType_ID" name="ProviderType.ID" type="hidden" defaultValue="" aria-labelledby="ProviderType_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="ProviderType_NameLabel" htmlFor="ProviderType_Name" className="display-none">{"ProviderType_Name"}</label>
                      <input id="ProviderType_Name" name="ProviderType.Name" type="hidden" defaultValue="" aria-labelledby="ProviderType_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="ProviderType_DisplayFormatLabel" htmlFor="ProviderType_DisplayFormat" className="display-none">{"ProviderType_DisplayFormat"}</label>
                      <input id="ProviderType_DisplayFormat" name="ProviderType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ProviderType_DisplayFormatLabel" aria-hidden="false" style={{}} />
                      <span className="k-invalid-msg" id="ProviderTypeList_validationMessage" data-for="ProviderTypeList"></span>
                      <span id="ProviderTypeHelpDesc" hidden={true}>{"Provider Type"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="LastStatusList_parent" data-template="ListItemSingle">
                    <div className="editor-label">
                      <label htmlFor="LastStatus" id="LastStatusLabel" title="Status">{"Status"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="LastStatusHelp" role="img" title="Status" data-role="tooltip" data-kit-tip="Status" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="LastStatusHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k3" />{" "}<label id="LastStatus_IDLabel" htmlFor="LastStatus_ID" className="display-none">{"LastStatus_ID"}</label>
                      <input id="LastStatus_ID" name="LastStatus.ID" type="hidden" defaultValue="" aria-labelledby="LastStatus_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="LastStatus_NameLabel" htmlFor="LastStatus_Name" className="display-none">{"LastStatus_Name"}</label>
                      <input id="LastStatus_Name" name="LastStatus.Name" type="hidden" defaultValue="" aria-labelledby="LastStatus_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="LastStatus_DisplayFormatLabel" htmlFor="LastStatus_DisplayFormat" className="display-none">{"LastStatus_DisplayFormat"}</label>
                      <input id="LastStatus_DisplayFormat" name="LastStatus.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="LastStatus_DisplayFormatLabel" aria-hidden="false" style={{}} />
                      <span className="k-invalid-msg" id="LastStatusList_validationMessage" data-for="LastStatusList"></span>
                      <span id="LastStatusHelpDesc" hidden={true}>{"Status"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="ReceiptDate_parent" data-template="">
                    <div className="editor-label">
                      <label htmlFor="ReceiptDate" id="ReceiptDateLabel" title="Receipt Date">{"Receipt Date"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ReceiptDateHelp" role="img" title="Receipt Date" data-role="tooltip" data-kit-tip="Receipt Date" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ReceiptDateHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k4" />
                      <span className="k-invalid-msg" id="ReceiptDate_validationMessage" data-for="ReceiptDate"></span>
                      <span id="ReceiptDateHelpDesc" hidden={true}>{"Receipt Date"}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col editor-clear" id="City_parent" data-template="Text">
                    <div className="editor-label">
                      <label htmlFor="City" id="CityLabel" title="City ">{"City "}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="CityHelp" role="img" title="Enter the City name." data-role="tooltip" data-kit-tip="Enter the City name." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="CityHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                        <input className="editor-control k-input-inner" data-val-length-max="City  has a maximum length of 70 characters." data-val-regex="City  contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="City" ignoredirtydata="False" maxLength={70} name="City" not-data-val-required="City  is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="CityLabel CityHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="City" />
                        </span>{" "}<span className="k-invalid-msg" id="City_validationMessage" data-for="City"></span>
                      <span id="CityHelpDesc" hidden={true}>{"Enter the City name."}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="StatesList_parent" data-template="ListItemSingle">
                    <div className="editor-label">
                      <label htmlFor="States" id="StatesLabel" title="State">{"State"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="StatesHelp" role="img" title="Enter the state associated with the program." data-role="tooltip" data-kit-tip="Enter the state associated with the program." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="StatesHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k5" />{" "}<label id="States_IDLabel" htmlFor="States_ID" className="display-none">{"States_ID"}</label>
                      <input id="States_ID" name="States.ID" type="hidden" defaultValue="" aria-labelledby="States_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="States_NameLabel" htmlFor="States_Name" className="display-none">{"States_Name"}</label>
                      <input id="States_Name" name="States.Name" type="hidden" defaultValue="" aria-labelledby="States_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="States_DisplayFormatLabel" htmlFor="States_DisplayFormat" className="display-none">{"States_DisplayFormat"}</label>
                      <input id="States_DisplayFormat" name="States.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="States_DisplayFormatLabel" aria-hidden="false" style={{}} />
                      <span className="k-invalid-msg" id="StatesList_validationMessage" data-for="StatesList"></span>
                      <span id="StatesHelpDesc" hidden={true}>{"Enter the state associated with the program."}</span>
                      </div>
                    </div>{" "}<div className="col-md-3 editor-col" id="ApplicationTypeListList_parent" data-template="ListItemSingle">
                    <div className="editor-label">
                      <label htmlFor="ApplicationTypeList" id="ApplicationTypeListLabel" title="Application Type">{"Application Type"}</label>
                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ApplicationTypeListHelp" role="img" title="Application Type" data-role="tooltip" data-kit-tip="Application Type" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ApplicationTypeListHelp"></span>
                      </div>
                    <div className="editor-field">{" "}<KitWidget id="k6" />{" "}<label id="ApplicationTypeList_IDLabel" htmlFor="ApplicationTypeList_ID" className="display-none">{"ApplicationTypeList_ID"}</label>
                      <input id="ApplicationTypeList_ID" name="ApplicationTypeList.ID" type="hidden" defaultValue="" aria-labelledby="ApplicationTypeList_IDLabel" aria-hidden="false" style={{}} />{" "}<label id="ApplicationTypeList_NameLabel" htmlFor="ApplicationTypeList_Name" className="display-none">{"ApplicationTypeList_Name"}</label>
                      <input id="ApplicationTypeList_Name" name="ApplicationTypeList.Name" type="hidden" defaultValue="" aria-labelledby="ApplicationTypeList_NameLabel" aria-hidden="false" style={{}} />{" "}<label id="ApplicationTypeList_DisplayFormatLabel" htmlFor="ApplicationTypeList_DisplayFormat" className="display-none">{"ApplicationTypeList_DisplayFormat"}</label>
                      <input id="ApplicationTypeList_DisplayFormat" name="ApplicationTypeList.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ApplicationTypeList_DisplayFormatLabel" aria-hidden="false" style={{}} />
                      <span className="k-invalid-msg" id="ApplicationTypeListList_validationMessage" data-for="ApplicationTypeListList"></span>
                      <span id="ApplicationTypeListHelpDesc" hidden={true}>{"Application Type"}</span>
                      </div>
                    </div>{" "}<div id="providername" style={{"display": "none"}}>{" "}<div className="col-md-3 editor-col" id="ProviderName_parent" data-template="">
                      <div className="editor-label">
                        <label htmlFor="ProviderName" id="ProviderNameLabel" title="Provider Name">{"Provider Name"}</label>
                        <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProviderNameHelp" role="img" title="Enter the Provider Name." data-role="tooltip" data-kit-tip="Enter the Provider Name." data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="ProviderNameHelp"></span>
                        </div>
                      <div className="editor-field">
                        <span className="k-input k-textbox editor-control" style={{}}>
                          <input className="editor-control k-input-inner" data-val-length-max="Provider Name has a maximum length of 50 characters." data-val-regex="Provider Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" height="0" id="ProviderName" ignoredirtydata="False" maxLength={50} name="ProviderName" not-data-val-required="Provider Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="ProviderNameLabel ProviderNameHelpDesc" aria-hidden="false" style={{"width": "100%"}} defaultValue="" data-testid="ProviderName" />
                          </span>
                        <span className="k-invalid-msg" id="ProviderName_validationMessage" data-for="ProviderName"></span>
                        <span id="ProviderNameHelpDesc" hidden={true}>{"Enter the Provider Name."}</span>
                        </div>
                      </div>{" "}</div>{" "}<div className="display-none">{" "}<label id="TaxIDLabel" htmlFor="TaxID" className="display-none">{"TaxID"}</label>
                    <input id="TaxID" name="TaxID" type="hidden" defaultValue="" aria-labelledby="TaxIDLabel" aria-hidden="false" style={{}} />{" "}</div>{" "}</div>{" "}<div className="editor-button-row">{" "}<span className="editor-button-nav">{" "}<label id="clearButtonLabel" htmlFor="clearButton" className="display-none">{"Clear"}</label>
                    <input id="clearButton" type="button" className="k-button btn-spacer-right" value="Clear" aria-labelledby="clearButtonLabel" aria-hidden="false" data-kit-action="reset" style={{}} data-testid="clearButton" />{" "}<label id="searchButtonLabel" htmlFor="searchButton" className="display-none">{"Search"}</label>
                    <input id="searchButton" type="button" className="k-button primary-button" value="Search" aria-labelledby="searchButtonLabel" aria-hidden="false" data-kit-action="search" style={{}} data-testid="searchButton" />{" "}</span>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}<div className="container" data-kit-h="h2" style={{"display": "none"}}>{" "}<div id="bnrresultsGrid" className="display-none" style={{"display": "none"}}>{" "}<div className="row">{" "}<div className="content-panel-container">{" "}<div className="app-title1">{"\n                        Search Results\n                    "}</div>{" "}<div id="ProviderSearchStatus"></div>{" "}<div className="mega-grid-container mg-mega-grid-container content-panel-bdy paddingTop10px">{" "}<div className="k-grid editor-grid mg-page-align mg-grid" id="providerResultsGrid" data-role="megagrid">
                <div className="k-header k-grid-top" id="mgTop">{" "}<div className="row mg-toolbar-hdr">{" "}<button type="button" id="gridExportButton" className="k-button mg-grid-data-filter-btn" data-testid="gridExportButton">{" "}<span>{"Export Records"}</span>{" "}</button>{" "}<button type="button" id="gridDataFilterButton" className="k-button mg-grid-data-filter-btn mgGridDataFilterButton" data-testid="gridDataFilterButton">{" "}<span>
                        <i className="fa-solid fa-filter"></i>
                        </span>{" "}<span>{"Grid Data Filter"}</span>{" "}</button>
                    <i id="mgFullScreenButton" className="fa-solid fa-down-left-and-up-right-to-center mg-fullScreenButton" data-testid="mgFullScreenButton"></i>{" "}<div id="ViewGridDataFilterPopup" className="modal panelForm in mg-ViewGridDataFilterPopup" role="dialog" data-keyboard="false" data-backdrop="static" title="Grid Data Filter Popup" style={{"display": "none"}}>{" "}<div id="outerBox" className="mg-outerDiv mg-modal-dialog" style={{"display": "block"}}>{" "}<div className="mg-gdf-panel-form-container">{" "}<div id="saveSelectionPanel" className="save-selection-panel">{" "}<div className="row mg-group-selection">{" "}<div className="mg-group-text-position" id="mgGroupSelection">{" "}<span className="mg-text">{"CHOOSE AN EXISTING FILTER, OR..."}</span>{" "}<KitWidget id="k7" />{" "}</div>{" "}</div>{" "}<div className="row mg-tabstrip-group-text mg-group-text-position">{" "}<span className="mg-text">{" \tCREATE A NEW FILTER SETUP "}</span>{" "}</div>{" "}</div>{" "}<div className="row">{" "}<div className="mg-section k-content">{" "}<div id="mggdfTabstrip" className="mg-gdfTabStrip k-tabstrip k-tabstrip-top" data-role="tabstrip">{" "}<div className="k-tabstrip-items-wrapper k-hstack">
                                  <ul className="mg-tabstrip-button-list k-tabstrip-items k-reset k-tabstrip-items-start" tabIndex={0} role="tablist" data-testid="button-23">
                                    <li className="k-state-active mg-grouptab k-tabstrip-item k-first" role="tab" aria-selected="false" aria-controls="mggdfTabstrip-1" id="mggdfTabstrip-tab-1" data-testid="mggdfTabstrip-tab-1">{" "}<span unselectable="on" className="k-link">
                                        <span unselectable="on" className="k-link-text">
                                          <span className="fa-stack fa-lg mg-tab-icon-dimension">{" "}<i id="Groupi" className="fa-solid fa-circle fa-stack-1x mg-whiteiconcolor mg-tabstrip-button-position"></i>{" "}<span id="Groupspan" className="fa-solid fa-stack-1x mg-blueiconcolor">{" "}<span className="mg-tab-icon-text">{" 1 "}</span>{" "}</span>{" "}</span>{" Group\n                        "}</span>
                                        </span>
                                      </li>
                                    <li className="k-tabstrip-item" role="tab" aria-selected="false" aria-controls="mggdfTabstrip-2" id="mggdfTabstrip-tab-2" data-testid="mggdfTabstrip-tab-2">{" "}<span unselectable="on" className="k-link">
                                        <span unselectable="on" className="k-link-text">
                                          <span className="fa-stack fa-lg mg-tab-icon-dimension">{" "}<i id="Sorti" className="fa-solid fa-circle fa-stack-1x mg-whiteiconcolor mg-tabstrip-button-position"></i>{" "}<span id="Sortspan" className="fa-solid fa-stack-1x mg-blueiconcolor">{" "}<span className="mg-tab-icon-text">{" 2 "}</span>{" "}</span>{" "}</span>{" Sort\n                        "}</span>
                                        </span>
                                      </li>
                                    <li className="k-tabstrip-item k-last" role="tab" aria-selected="false" aria-controls="mggdfTabstrip-3" id="mggdfTabstrip-tab-3" data-testid="mggdfTabstrip-tab-3">{" "}<span unselectable="on" className="k-link">
                                        <span unselectable="on" className="k-link-text">
                                          <span className="fa-stack fa-lg mg-tab-icon-dimension">{" "}<i id="Selecti" className="fa-solid fa-circle fa-stack-1x mg-whiteiconcolor mg-tabstrip-button-position"></i>{" "}<span id="Selectspan" className="fa-solid fa-stack-1x mg-blueiconcolor">{" "}<span className="mg-tab-icon-text">{" 3 "}</span>{" "}</span>{" "}</span>{" Select\n                        "}</span>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>{" "}<i id="close" className="fa-solid fa-circle-xmark fa-lg mg-whiteiconcolor mg-close-icon clickable close-click" data-testid="close"></i>{" "}<div className="mg-tabstrip-clear k-tabstrip-content" style={{"background": "inherit !important"}} id="mggdfTabstrip-1" role="tabpanel" tabIndex={0} aria-labelledby="mggdfTabstrip-tab-1" aria-hidden="true" data-testid="mggdfTabstrip-1">{" "}<span className="group">{" "}</span>{" "}<br />{" "}<div className="mg-outline mg-whiteiconcolor mg-GroupcheckBoxs mg-group-checkarea" id="groupNameCheckbox">{" "}<span className="mg-text">{"CHECK TO CREATE A COLUMN GROUPING"}</span>{" "}<hr className="mg-hr-topLine" />{" "}<br />{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup1" data-index="1" className="k-checkbox" style={{}} data-testid="toggleGroup1" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup1">
                                        <span className="mg-text-font">{"GROUP 1"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup2" data-index="2" className="k-checkbox" style={{}} data-testid="toggleGroup2" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup2">
                                        <span className="mg-text-font">{"GROUP 2"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup3" data-index="3" className="k-checkbox" style={{}} data-testid="toggleGroup3" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup3">
                                        <span className="mg-text-font">{"GROUP 3"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup4" data-index="4" className="k-checkbox" style={{}} data-testid="toggleGroup4" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup4">
                                        <span className="mg-text-font">{"GROUP 4"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup5" data-index="5" className="k-checkbox" style={{}} data-testid="toggleGroup5" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup5">
                                        <span className="mg-text-font">{"GROUP 5"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup6" data-index="6" className="k-checkbox" style={{}} data-testid="toggleGroup6" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup6">
                                        <span className="mg-text-font">{"GROUP 6"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup7" data-index="7" className="k-checkbox" style={{}} data-testid="toggleGroup7" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup7">
                                        <span className="mg-text-font">{"GROUP 7"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup8" data-index="8" className="k-checkbox" style={{}} data-testid="toggleGroup8" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup8">
                                        <span className="mg-text-font">{"GROUP 8"}</span>
                                        </label>{" "}</div>{" "}<div className="row">{" "}<input type="checkbox" id="toggleGroup9" data-index="9" className="k-checkbox" style={{}} data-testid="toggleGroup9" />{" "}<label className="k-checkbox-label" htmlFor="toggleGroup9">
                                        <span className="mg-text-font">{"GROUP 9"}</span>
                                        </label>{" "}</div>{" "}</div>{" "}<div id="groupNameText" className="mg-outline mg-group-textbox">{" "}<span className="mg-text">{"CUSTOM LABELS(LIMIT 7 characters)"}</span>{" "}<hr className="mg-hr-topLine" />{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName1Label" htmlFor="toggleGroupName1" className="display-none">{"toggleGroupName1"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName1" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName1Label" style={{}} defaultValue="" data-testid="toggleGroupName1" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName2Label" htmlFor="toggleGroupName2" className="display-none">{"toggleGroupName2"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName2" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName2Label" style={{}} defaultValue="" data-testid="toggleGroupName2" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName3Label" htmlFor="toggleGroupName3" className="display-none">{"toggleGroupName3"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName3" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName3Label" style={{}} defaultValue="" data-testid="toggleGroupName3" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName4Label" htmlFor="toggleGroupName4" className="display-none">{"toggleGroupName4"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName4" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName4Label" style={{}} defaultValue="" data-testid="toggleGroupName4" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName5Label" htmlFor="toggleGroupName5" className="display-none">{"toggleGroupName5"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName5" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName5Label" style={{}} defaultValue="" data-testid="toggleGroupName5" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName6Label" htmlFor="toggleGroupName6" className="display-none">{"toggleGroupName6"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName6" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName6Label" style={{}} defaultValue="" data-testid="toggleGroupName6" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName7Label" htmlFor="toggleGroupName7" className="display-none">{"toggleGroupName7"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName7" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName7Label" style={{}} defaultValue="" data-testid="toggleGroupName7" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName8Label" htmlFor="toggleGroupName8" className="display-none">{"toggleGroupName8"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName8" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName8Label" style={{}} defaultValue="" data-testid="toggleGroupName8" />{" "}</div>{" "}<br />{" "}<div className="row mg-custmlblHeight">{" "}<label id="toggleGroupName9Label" htmlFor="toggleGroupName9" className="display-none">{"toggleGroupName9"}</label>
                                      <input type="text" maxLength={7} id="toggleGroupName9" readOnly={true} className="mg-txtSize" aria-labelledby="toggleGroupName9Label" style={{}} defaultValue="" data-testid="toggleGroupName9" />{" "}</div>{" "}</div>{" "}</div>{" "}<div className="mg-tabstrip-clear k-tabstrip-content" style={{"background": "inherit !important"}} id="mggdfTabstrip-2" role="tabpanel" tabIndex={0} aria-labelledby="mggdfTabstrip-tab-2" aria-hidden="true" data-testid="mggdfTabstrip-2">{" "}<span className="sort">{" "}</span>{" "}<div style={{"textAlign": "left"}}>{" "}<span className="mg-text">{"SELECT A GROUP - ADD COLUMNS - SORT IN PREFERRED ORDER"}</span>{" "}<hr className="mg-hr-topLine" />{" "}<br />{" "}<div className="mg-outline">{" "}<div id="sortGroupRadio" className="mg-radioButtons mg-radio-sort" style={{"paddingRight": "0!important"}}>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup1" data-index="1" className="k-radio" style={{}} data-testid="sortGroup1" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup1">{"GROUP 1"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup2" data-index="2" className="k-radio" style={{}} data-testid="sortGroup2" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup2">{"GROUP 2"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup3" data-index="3" className="k-radio" style={{}} data-testid="sortGroup3" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup3">{"GROUP 3"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup4" data-index="4" className="k-radio" style={{}} data-testid="sortGroup4" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup4">{"GROUP 4"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup5" data-index="5" className="k-radio" style={{}} data-testid="sortGroup5" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup5">{"GROUP 5"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup6" data-index="6" className="k-radio" style={{}} data-testid="sortGroup6" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup6">{"GROUP 6"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup7" data-index="7" className="k-radio" style={{}} data-testid="sortGroup7" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup7">{"GROUP 7"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup8" data-index="8" className="k-radio" style={{}} data-testid="sortGroup8" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup8">{"GROUP 8"}</label>{" "}</div>{" "}<div className="row">{" "}<input type="radio" name="radioSortGroup" id="sortGroup9" data-index="9" className="k-radio" style={{}} data-testid="sortGroup9" />{" "}<label className="k-radio-label mg-sort-filter-spacing" htmlFor="sortGroup9">{"GROUP 9"}</label>{" "}</div>{" "}</div>{" "}<table className="mg-sort-table" cellPadding="5">{" "}<tbody>
                                          <tr className="mg-sort-listview-toprow">{" "}<td className="mg-sort-listview-heading" style={{"background": "inherit !important"}}>{" "}<label className="mg-text" id="availableListItemsLabel">{"AVAILABLE COLUMNS"}</label>{" "}</td>{" "}<td style={{"background": "inherit !important"}}></td>{" "}<td className="mg-sort-listview-heading" style={{"background": "inherit !important"}}>{" "}<label className="mg-text" id="selectedListItemsLabel">{"SELECTED COLUMNS"}</label>{" "}</td>{" "}</tr>{" "}<tr>{" "}<td className="mg-sort-availableList" style={{"background": "inherit !important"}}>{" "}<div className="row">{" "}<div className="mg-sort-listView k-listview k-listview-bordered k-selectable" id="availableListItems" data-role="listview" tabIndex={0} data-testid="availableListItems">
                                                  <div className="k-listview-content" role="listbox" tabIndex={0} aria-multiselectable="true" aria-labelledby="availableListItemsLabel" data-testid="button-available-columns">
                                                    <div className="k-listview-item" data-uid="f9b30841-e569-4809-8502-b483850f3d77" role="option" aria-selected="false" data-testid="button-application-type">{"Application Type"}</div>
                                                    <div className="k-listview-item" data-uid="ca10f6d7-55bb-4952-962b-8d8b4652f6c8" role="option" aria-selected="false" data-testid="button-atn">{"ATN"}</div>
                                                    <div className="k-listview-item" data-uid="141c2f38-358e-4e57-ad44-f95e4e497faa" role="option" aria-selected="false" data-testid="button-bulk-submitted">{"Bulk Submitted"}</div>
                                                    <div className="k-listview-item" data-uid="546af2f7-9a31-4d44-8c1c-45d65325aad4" role="option" aria-selected="false" data-testid="button-business-name">{"Business Name"}</div>
                                                    <div className="k-listview-item" data-uid="679dce8a-05d7-4955-8629-cf7754f40d44" role="option" aria-selected="false" data-testid="button-city">{"City "}</div>
                                                    <div className="k-listview-item" data-uid="025f4b8a-5596-4f61-be5c-ac1dd8d45a48" role="option" aria-selected="false" data-testid="button-created-date">{"Created Date"}</div>
                                                    <div className="k-listview-item" data-uid="844d1999-95b5-4832-ada3-479ecf52a5ae" role="option" aria-selected="false" data-testid="button-email-address">{"Email Address"}</div>
                                                    <div className="k-listview-item" data-uid="378843c0-697c-4dd3-b5bc-434b0ec135c5" role="option" aria-selected="false" data-testid="button-enrollment-progress-step">{"Enrollment Progress Step"}</div>
                                                    <div className="k-listview-item" data-uid="5752bfde-a236-45d1-b08e-62fc302d943f" role="option" aria-selected="false" data-testid="button-enrollment-type">{"Enrollment Type"}</div>
                                                    <div className="k-listview-item" data-uid="3f8bf971-199b-415e-b081-09b499171ef7" role="option" aria-selected="false" data-testid="button-first-name">{"First Name"}</div>
                                                    <div className="k-listview-item" data-uid="3e46049a-e4c9-492d-88ee-dc0892aeafb1" role="option" aria-selected="false" data-testid="button-last-name">{"Last Name"}</div>
                                                    <div className="k-listview-item" data-uid="1f37d048-f065-4888-99ab-d1bdf678612d" role="option" aria-selected="false" data-testid="button-last-updated">{"Last Updated"}</div>
                                                    <div className="k-listview-item" data-uid="77530a81-2ca6-48ff-aefd-6d6fddffe9b5" role="option" aria-selected="false" data-testid="button-middle-name">{"Middle Name"}</div>
                                                    <div className="k-listview-item" data-uid="af4025d1-fc17-47dc-a0e8-3760bc2de0d9" role="option" aria-selected="false" data-testid="button-npi">{"NPI "}</div>
                                                    <div className="k-listview-item" data-uid="28d78eee-a96b-45d5-9d44-c17305f79722" role="option" aria-selected="false" data-testid="button-provider-type">{"Provider Type"}</div>
                                                    <div className="k-listview-item" data-uid="1053a1bd-24b6-4f95-9744-d176656243be" role="option" aria-selected="false" data-testid="button-reason-code">{"Reason Code"}</div>
                                                    <div className="k-listview-item" data-uid="bf3c7700-cf11-4c48-8a42-7e748f855780" role="option" aria-selected="false" data-testid="button-reason-expired">{"Reason Expired"}</div>
                                                    <div className="k-listview-item" data-uid="731c9f7a-d1cb-4f0c-8848-ea64b9e0ca59" role="option" aria-selected="false" data-testid="button-revalidation-due-date">{"Revalidation Due Date"}</div>
                                                    <div className="k-listview-item" data-uid="6f4c40cb-bf44-43ab-bc38-c8f4608decb2" role="option" aria-selected="false" data-testid="button-service-location-id">{"Service Location ID"}</div>
                                                    <div className="k-listview-item" data-uid="89624541-6bda-467c-9a7e-2c5b571ca389" role="option" aria-selected="false" data-testid="button-state">{"State"}</div>
                                                    <div className="k-listview-item" data-uid="ebcddf42-e651-4776-9e9d-1276a12e14d2" role="option" aria-selected="false" data-testid="button-status">{"Status"}</div>
                                                    <div className="k-listview-item" data-uid="6be48dcb-09bd-4500-b58c-d6f44af23a16" role="option" aria-selected="false" data-testid="button-submission-date">{"Submission Date"}</div>
                                                    <div className="k-listview-item" data-uid="0b20a24f-e092-48f6-89f0-9b209214d15d" role="option" aria-selected="false" data-testid="button-tax-id">{"Tax ID"}</div>
                                                    <div className="k-listview-item" data-uid="ab0f70aa-ba1a-4b50-b4b2-96538e939f79" role="option" aria-selected="false" data-testid="button-tax-id-type">{"Tax ID Type "}</div>
                                                    <div className="k-listview-item" data-uid="11d50105-1738-47f8-9547-d0922c65024e" role="option" aria-selected="false" data-testid="button-zip-code-postal-code">{"ZIP Code/Postal Code"}</div>
                                                    </div>
                                                  </div>{" "}</div>{" "}</td>{" "}<td className="mg-sort-updownarrow" style={{"background": "inherit !important"}}>{" "}<div className="moveItemToSelected k-button" data-testid="button-application-typeatnbulk-submitte">
                                                <i id="chevron-right-btn" alt="moveItemToSelected" className="fa-solid fa-chevron-right fa-lg"></i>
                                                </div>{" "}<br />
                                              <br />{" "}<div className="mg-sort-leftimage k-button moveItemToAvailable" data-testid="button-application-typeatnbulk-submitte-2">
                                                <i id="chevron-left-btn" alt="moveItemToAvailable" className="fa-solid fa-chevron-left fa-lg"></i>
                                                </div>{" "}</td>{" "}<td className="mg-sort-selectedList" style={{"background": "inherit !important"}}>{" "}<div className="row">{" "}<div className="mg-sort-listView k-listview k-listview-bordered k-selectable" id="selectedListItems" data-role="listview" data-testid="selectedListItems">
                                                  <div className="k-listview-content" role="listbox" tabIndex={0} aria-labelledby="selectedListItemsLabel" data-testid="button-selected-columns"></div>
                                                  </div>{" "}</div>{" "}</td>{" "}<td style={{"background": "inherit !important"}}>{" "}<div className="top-img-click mgItemsUp k-button" data-testid="button-application-typeatnbulk-submitte-3">
                                                <i id="arrow-top-btn" alt="topimage" className="fa-solid fa-arrow-up fa-lg">{" "}</i>
                                                </div>{" "}<br />
                                              <br />{" "}<div className="mg-sort-leftimage bottom-img-click mgItemsDown k-button" data-testid="button-application-typeatnbulk-submitte-4">
                                                <i id="arrow-bottom-btn" alt="bottomimage" className="fa-solid fa-arrow-down fa-lg"></i>
                                                </div>{" "}</td>{" "}</tr>{" "}</tbody>
                                        </table>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="mg-filter-tabArea mg-tabstrip-clear k-tabstrip-content" style={{"background": "inherit !important"}} id="mggdfTabstrip-3" role="tabpanel" tabIndex={0} aria-labelledby="mggdfTabstrip-tab-3" aria-hidden="true" data-testid="mggdfTabstrip-3">{" "}<span className="filter">{" "}</span>{" "}<div className="mg-outline mg-whiteiconcolor mg-SelectPanelcheckBoxs mg-radioButtons mg-sort-listview-heading">{" "}<span className="mg-text">{"\tSELECT A GROUP TO FILTER - CHECK TO SHOW GROUP"}</span>{" "}<table className="mg-filter-table-top filterGroupSelection-click" cellPadding="8" id="mgfilterGroupSection">{" "}<tbody>
                                        <tr className="mg-filter-table-row"></tr>{" "}</tbody>
                                      </table>{" "}<table className="mg-filter-table" cellPadding="5">{" "}<tbody>
                                        <tr>{" "}<th className="mg-filter-topheading">{" "}<span className="mg-text">{"CHECK TO SHOW COLUMNS"}</span>{" "}</th>{" "}<th className="mg-filter-table-position">{" "}<center>
                                              <span className="mg-text">{"FREEZE"}</span>
                                              </center>{" "}</th>{" "}</tr>{" "}</tbody>
                                      </table>{" "}<div className="mg-tab-scrollbar">{" "}<table className="mg-filter-table filterPanelColumns-click" cellPadding="5" cellSpacing="5" id="filterPanelColumns"></table>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="row mg-filter-userCustomArea mg-group-text-align" id="userSelectionName">{" "}<span className="mg-text mg-filter-nameText">{"NAME YOUR NEW FILTER SETUP"}</span>{" "}<br />{" "}<label id="UserSelectionNameLabel" htmlFor="UserSelectionName" className="display-none">{"UserSelectionName"}</label>
                                <input type="text" id="UserSelectionName" className="mg-filter-username-text user-selection-click mgUserSelectionText" maxLength={50} aria-labelledby="UserSelectionNameLabel" style={{}} defaultValue="" data-testid="UserSelectionName" />{" "}<div className="mg-filter-templateArea">{" "}<input type="checkbox" className="k-checkbox mg-filter-checkbox" id="mgTemplateCheckbox" style={{}} data-testid="mgTemplateCheckbox" />{" "}<label className="k-checkbox-label" htmlFor="mgTemplateCheckbox">
                                    <span className="mg-text-font mg-text">{" Template"}</span>
                                    </label>{" "}</div>{" "}</div>{" "}<div className="mg-buttons-toolbar">{" "}<hr className="mg-hr-solidLine" />{" "}<div className="mg-buttons-toolbar-header">{"PREFERENCES"}</div>{" "}<hr className="mg-hr-bottomLine" />{" "}<table className="mgpreferenceBox">{" "}<tbody>
                                    <tr>{" "}<td className="mg-toolbar-clearImage" style={{"background": "inherit !important"}}>{" "}<div>{" "}<i id="clearImage" className="fa-solid fa-circle-xmark fa-4x mg-whiteiconcolor clickable mg-clear-click" data-testid="clearImage"></i>{" "}<div className="mg-buttons-toolbar-header">{" Clear "}</div>{" "}</div>{" "}</td>{" "}<td className="mg-toolbar-accept-save" style={{"background": "inherit !important"}}>{" "}<div>{" "}<i id="acceptButton" className="fa-solid fa-circle-check fa-4x mg-whiteiconcolor clickable mg-accept-click" data-testid="acceptButton"></i>{" "}<div className="mg-buttons-toolbar-header">{" ACCEPT "}</div>{" "}</div>{" "}</td>{" "}<td className="mg-toolbar-accept-save" style={{"background": "inherit !important"}}>{" "}<div>{" "}<i id="saveImage" data-gridname="MegaGrid" className="fa-solid fa-floppy-disk fa-4x mg-save-disable mg-save-click" data-testid="saveImage"></i>{" "}<div className="mg-buttons-toolbar-header">{" SAVE "}</div>{" "}</div>{" "}</td>{" "}</tr>{" "}</tbody>
                                  </table>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="mg-clearfix">{" "}</div>{" "}</div>{" "}<div className="mg-clearfix">{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<div id="granularGrpHeader" className="row mg-toolbar-col-group-pct mg-dialog-display">{" "}<div className="mg-granularGrpBar"></div>{" "}<div id="grphdrId1" className="mg-groupHeader">{" "}<div id="togglegrphdr1"></div>{" "}</div>{" "}<div id="grphdrId2" className="mg-groupHeader">{" "}<div id="togglegrphdr2"></div>{" "}</div>{" "}<div id="grphdrId3" className="mg-groupHeader">{" "}<div id="togglegrphdr3"></div>{" "}</div>{" "}<div id="grphdrId4" className="mg-groupHeader">{" "}<div id="togglegrphdr4"></div>{" "}</div>{" "}<div id="grphdrId5" className="mg-groupHeader">{" "}<div id="togglegrphdr5"></div>{" "}</div>{" "}<div id="grphdrId6" className="mg-groupHeader">{" "}<div id="togglegrphdr6"></div>{" "}</div>{" "}<div id="grphdrId7" className="mg-groupHeader">{" "}<div id="togglegrphdr7"></div>{" "}</div>{" "}<div id="grphdrId8" className="mg-groupHeader">{" "}<div id="togglegrphdr8"></div>{" "}</div>{" "}<div id="grphdrId9" className="mg-groupHeader">{" "}<div id="togglegrphdr9"></div>{" "}</div>{" "}</div>{" "}<div id="granularGrp" className=" row mg-toolbar-col-group mg-dialog-display">{" "}<div className="mg-toolbar-col-grps">
                      <span className="mg-toolbar-col-grps-lbl">{"COLUMN GROUPINGS"}</span>
                      </div>{" "}<div id="togglegrp1" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName1" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl " data-testid="toggleGrpName1">
                        <i className="fa-solid fa-eye"></i>{"GROUP 1"}</span>
                      </div>{" "}<div id="togglegrp2" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName2" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName2">
                        <i className="fa-solid fa-eye"></i>{" GROUP 2"}</span>
                      </div>{" "}<div id="togglegrp3" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName3" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName3">
                        <i className="fa-solid fa-eye"></i>{" GROUP 3"}</span>
                      </div>{" "}<div id="togglegrp4" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName4" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName4">
                        <i className="fa-solid fa-eye"></i>{" GROUP 4"}</span>
                      </div>{" "}<div id="togglegrp5" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName5" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName5">
                        <i className="fa-solid fa-eye"></i>{" GROUP 5"}</span>
                      </div>{" "}<div id="togglegrp6" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName6" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName6">
                        <i className="fa-solid fa-eye"></i>{" GROUP 6"}</span>
                      </div>{" "}<div id="togglegrp7" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName7" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName7">
                        <i className="fa-solid fa-eye"></i>{" GROUP 7"}</span>
                      </div>{" "}<div id="togglegrp8" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName8" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName8">
                        <i className="fa-solid fa-eye"></i>{" GROUP 8"}</span>
                      </div>{" "}<div id="togglegrp9" className="mg-toolbar-col-grp1">
                      <span id="toggleGrpName9" style={{"cursor": "pointer", "width": "100%"}} className="mg-toolbar-col-grps-lbl" data-testid="toggleGrpName9">
                        <i className="fa-solid fa-eye"></i>{" GROUP 9"}</span>
                      </div>{" "}</div>
                  </div>
                <div className="k-grid-header" style={{"paddingRight": "15px"}}>
                  <div className="k-grid-header-wrap k-auto-scrollable" data-role="resizable" data-testid="button-24">
                    <table role="grid" className="k-grid-header-table k-table">
                      <colgroup>
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        </colgroup>
                      <thead className="k-table-thead" role="rowgroup">
                        <tr className="k-table-row" role="row">
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultATN" data-index="0" data-resizable="true" data-title="ATN" id="78ab503d-0042-467e-85bd-37d54a1429b8" role="columnheader" scope="col" data-role="columnsorter" data-testid="78ab503d-0042-467e-85bd-37d54a1429b8">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"ATN"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="ATN filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="ATN filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-atn-filter-column-settings">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultFirstName" data-index="1" data-resizable="true" data-title="First Name" id="a24b7e3a-e931-475f-bcd4-001c8e7f8659" role="columnheader" scope="col" data-role="columnsorter" data-testid="a24b7e3a-e931-475f-bcd4-001c8e7f8659">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"First Name"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="First Name filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="First Name filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-first-name-filter-column-setting">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultMiddleName" data-index="2" data-resizable="true" data-title="Middle Name" id="a55e8887-a69b-4d57-914e-d63149183c78" role="columnheader" scope="col" data-role="columnsorter" data-testid="a55e8887-a69b-4d57-914e-d63149183c78">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Middle Name"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Middle Name filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Middle Name filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-middle-name-filter-column-settin">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultLastName" data-index="3" data-resizable="true" data-title="Last Name" id="a64be493-9538-4882-867f-0a086e92624b" role="columnheader" scope="col" data-role="columnsorter" data-testid="a64be493-9538-4882-867f-0a086e92624b">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Last Name"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Last Name filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Last Name filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-last-name-filter-column-settings">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultLegacyID" data-index="4" data-resizable="true" data-title="Service Location ID" id="81c85fa9-083a-43ee-ac8c-789caf72d886" role="columnheader" scope="col" data-role="columnsorter" data-testid="81c85fa9-083a-43ee-ac8c-789caf72d886">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Service Location ID"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Service Location ID filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Service Location ID filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-service-location-id-filter-colum">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultNPI" data-index="5" data-resizable="true" data-title="NPI " id="4a34b9c3-3785-4095-a0a1-f44c03c4fc3b" role="columnheader" scope="col" data-role="columnsorter" data-testid="4a34b9c3-3785-4095-a0a1-f44c03c4fc3b">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"NPI "}</span>
                                </span>
                              <a aria-hidden="true" aria-label="NPI  filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="NPI  filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-npi-filter-column-settings">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="TaxIdSelection.Name" data-index="6" data-resizable="true" data-title="Tax ID Type " id="2dcd81bf-59b8-40dd-8afe-afcc64c0ded8" role="columnheader" scope="col" data-role="columnsorter" data-testid="2dcd81bf-59b8-40dd-8afe-afcc64c0ded8">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Tax ID Type "}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Tax ID Type  filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Tax ID Type  filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-tax-id-type-filter-column-settin">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th className="k-table-th k-header" data-field="TaxID" data-index="7" data-resizable="true" data-title="Tax ID" id="82ae14db-9956-4d53-99fa-5989e32e0ad8" role="columnheader" scope="col">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Tax ID"}</span>
                                </span>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ApplicationTypeList.Name" data-index="8" data-resizable="true" data-title="Application Type" id="efe43371-244f-4f7c-9096-7fe9fbaf9b4b" role="columnheader" scope="col" data-role="columnsorter" data-testid="efe43371-244f-4f7c-9096-7fe9fbaf9b4b">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Application Type"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Application Type filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Application Type filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-application-type-filter-column-s">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th className="k-table-th k-header" data-field="LastStatusName" data-index="9" data-resizable="true" data-title="Status" id="42d710e5-8bbc-4276-aada-653e7c5313f5" role="columnheader" scope="col">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Status"}</span>
                                </span>
                              </span>
                            </th>
                          <th className="k-table-th k-header" data-field="EnrollmentProgressStepName" data-index="10" data-resizable="true" data-title="Enrollment Progress Step" id="28927a16-af36-49c3-ad20-219c20d01d22" role="columnheader" scope="col">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Enrollment Progress Step"}</span>
                                </span>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ModifiedDate" data-index="11" data-resizable="true" data-title="Last Updated" id="fa0e978e-b18c-4b90-a496-127856c0aba4" role="columnheader" scope="col" data-role="columnsorter" data-testid="fa0e978e-b18c-4b90-a496-127856c0aba4">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Last Updated"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Last Updated filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Last Updated filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-last-updated-filter-column-setti">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultBusinessName" data-index="12" data-resizable="true" data-title="Business Name" id="35ecce39-9e4e-47c1-8839-b4cc1ef1bd02" role="columnheader" scope="col" data-role="columnsorter" data-testid="35ecce39-9e4e-47c1-8839-b4cc1ef1bd02">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Business Name"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Business Name filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Business Name filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-business-name-filter-column-sett">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultContactEmail" data-index="13" data-resizable="true" data-title="Email Address" id="33378e5c-fa04-4e40-a092-594156b583dd" role="columnheader" scope="col" data-role="columnsorter" data-testid="33378e5c-fa04-4e40-a092-594156b583dd">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Email Address"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Email Address filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Email Address filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-email-address-filter-column-sett">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="States.Name" data-index="14" data-resizable="true" data-title="State" id="48cdc7e1-1291-42e9-b350-b8330bebc1d6" role="columnheader" scope="col" data-role="columnsorter" data-testid="48cdc7e1-1291-42e9-b350-b8330bebc1d6">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"State"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="State filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="State filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-state-filter-column-settings">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultCity" data-index="15" data-resizable="true" data-title="City " id="8388ef7d-4409-4b59-88c6-e8dfa8124466" role="columnheader" scope="col" data-role="columnsorter" data-testid="8388ef7d-4409-4b59-88c6-e8dfa8124466">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"City "}</span>
                                </span>
                              <a aria-hidden="true" aria-label="City  filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="City  filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-city-filter-column-settings">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ProviderType.Name" data-index="16" data-resizable="true" data-title="Provider Type" id="ff64a450-1f50-4234-9952-701868851f75" role="columnheader" scope="col" data-role="columnsorter" data-testid="ff64a450-1f50-4234-9952-701868851f75">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Provider Type"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Provider Type filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Provider Type filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-provider-type-filter-column-sett">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="EnrollmentType.Name" data-index="17" data-resizable="true" data-title="Enrollment Type" id="f92bc064-2bb2-4f96-9b83-0819405123ba" role="columnheader" scope="col" data-role="columnsorter" data-testid="f92bc064-2bb2-4f96-9b83-0819405123ba">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Enrollment Type"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Enrollment Type filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Enrollment Type filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-enrollment-type-filter-column-se">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ReasonCode" data-index="18" data-resizable="true" data-title="Reason Code" id="e5203ccc-e4cd-4bf0-94d8-b4be423d6695" role="columnheader" scope="col" data-role="columnsorter" data-testid="e5203ccc-e4cd-4bf0-94d8-b4be423d6695">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Reason Code"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Reason Code filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Reason Code filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-reason-code-filter-column-settin">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="CreatedDate" data-index="19" data-resizable="true" data-title="Created Date" id="64c00c28-1990-4b59-87b4-473bdfcc2b16" role="columnheader" scope="col" data-role="columnsorter" data-testid="64c00c28-1990-4b59-87b4-473bdfcc2b16">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Created Date"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Created Date filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Created Date filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-created-date-filter-column-setti">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="SubmittedDate" data-index="20" data-resizable="true" data-title="Submission Date" id="626ab2db-9abd-46c3-95ee-883bf1ce05ce" role="columnheader" scope="col" data-role="columnsorter" data-testid="626ab2db-9abd-46c3-95ee-883bf1ce05ce">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Submission Date"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Submission Date filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Submission Date filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-submission-date-filter-column-se">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="RevalidationDate" data-index="21" data-resizable="true" data-title="Revalidation Due Date" id="a367d665-8c71-490f-bd46-cca00fad8a8e" role="columnheader" scope="col" data-role="columnsorter" data-testid="a367d665-8c71-490f-bd46-cca00fad8a8e">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Revalidation Due Date"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Revalidation Due Date filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Revalidation Due Date filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-revalidation-due-date-filter-col">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultPostalCode" data-index="22" data-resizable="true" data-title="ZIP Code/Postal Code" id="434c9570-eab8-4047-8b7f-939cc6ea26a8" role="columnheader" scope="col" data-role="columnsorter" data-testid="434c9570-eab8-4047-8b7f-939cc6ea26a8">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"ZIP Code/Postal Code"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="ZIP Code/Postal Code filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="ZIP Code/Postal Code filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-zip-code-postal-code-filter-colu">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="ResultReasonExpired" data-index="23" data-resizable="true" data-title="Reason Expired" id="6e2fda78-bfc2-4f18-a0e9-f6515ef1dfe2" role="columnheader" scope="col" data-role="columnsorter" data-testid="6e2fda78-bfc2-4f18-a0e9-f6515ef1dfe2">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Reason Expired"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Reason Expired filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Reason Expired filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-reason-expired-filter-column-set">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          <th aria-haspopup="menu" aria-sort="none" className="k-table-th k-header k-filterable" data-field="BulkSubmitted" data-index="24" data-resizable="true" data-title="Bulk Submitted" id="ff18e48e-b0bd-41f1-a7d5-f1026a2e12ee" role="columnheader" scope="col" data-role="columnsorter" data-testid="ff18e48e-b0bd-41f1-a7d5-f1026a2e12ee">
                            <span className="k-cell-inner">
                              <span className="k-link">
                                <span className="k-column-title">{"Bulk Submitted"}</span>
                                </span>
                              <a aria-hidden="true" aria-label="Bulk Submitted filter column settings" className="k-grid-filter-menu k-grid-header-menu" href="javascript:void(0)" title="Bulk Submitted filter column settings" tabIndex={-1} data-role="tooltip" data-testid="link-bulk-submitted-filter-column-set">
                                <span className="k-icon k-svg-icon k-svg-i-filter">
                                  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                    <path d="M64 64v32l160 160v224l64-64V256L448 96V64z" />
                                    </svg>
                                  </span>
                                </a>
                              </span>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                <div className="k-grid-container">
                  <div className="k-grid-content k-auto-scrollable" style={{"height": "auto", "maxHeight": "500px"}}>
                    <table id="a0da6847-68b0-4f4f-b626-25731beed45f" role="grid" className="k-grid-table k-table k-selectable" data-role="selectable" data-testid="a0da6847-68b0-4f4f-b626-25731beed45f">
                      <colgroup>
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        <col style={{"width": "150px"}} />
                        </colgroup>
                      <tbody className="k-table-tbody" id="a2021912-b487-424c-978f-b9f5e81d3b7d" role="rowgroup"></tbody>
                      </table>
                    </div>
                  <div aria-controls="a0da6847-68b0-4f4f-b626-25731beed45f" aria-label="grid toolbar" className="k-toolbar k-grid-toolbar k-toolbar-resizable" role="toolbar" data-testid="button-grid-toolbar">{" "}</div>
                  </div>
                <div aria-controls="a0da6847-68b0-4f4f-b626-25731beed45f" className="k-pager k-grid-pager" data-role="pager" data-testid="button-25">
                  <div className="grid-toolbar-secondary">{" "}<div className="col-md-2 editor-col editor-clear padding-bottom-zero" id="ExportOptionsList_parent" data-template="ListItemSingle">
                      <div className="editor-field">{" "}<KitWidget id="k8" />{" "}<label id="ExportOptions_IDLabel" htmlFor="ExportOptions_ID" className="display-none">{"ExportOptions_ID"}</label>
                        <input id="ExportOptions_ID" name="ExportOptions.ID" type="hidden" defaultValue="" aria-labelledby="ExportOptions_IDLabel" style={{}} />{" "}<label id="ExportOptions_NameLabel" htmlFor="ExportOptions_Name" className="display-none">{"ExportOptions_Name"}</label>
                        <input id="ExportOptions_Name" name="ExportOptions.Name" type="hidden" defaultValue="" aria-labelledby="ExportOptions_NameLabel" style={{}} />{" "}<label id="ExportOptions_DisplayFormatLabel" htmlFor="ExportOptions_DisplayFormat" className="display-none">{"ExportOptions_DisplayFormat"}</label>
                        <input id="ExportOptions_DisplayFormat" name="ExportOptions.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ExportOptions_DisplayFormatLabel" style={{}} />
                        <span className="k-invalid-msg" id="ExportOptionsList_validationMessage" data-for="ExportOptionsList"></span>
                        </div>
                      </div>{" "}<a className="k-button" data-testid="button-export">{"\nExport\n                            "}</a>{" "}</div>
                  <div className="k-pager-numbers-wrap">
                    <button aria-label="Go to the first page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled k-pager-first" data-page="1" title="Go to the first page" data-testid="button-go-to-the-first-page">
                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-to-left k-button-icon">
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                          <path d="M352 384 160 256l192-128zM128 128v256h32V128z" />
                          </svg>
                        </span>
                      </button>
                    <button aria-label="Go to the previous page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled" data-page="0" title="Go to the previous page" data-testid="button-go-to-the-previous-page">
                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-left k-button-icon">
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                          <path d="m160 256 192-128v256z" />
                          </svg>
                        </span>
                      </button>
                    <div className="k-pager-numbers">
                      <button role="button" aria-current="page" tabIndex={-1} aria-label="Page 0" className="k-button undefined k-button-flat k-button-primary k-selected" data-testid="button-page-0">
                        <span className="k-button-text">{"0"}</span>
                        </button>
                      </div>
                    <button aria-label="Go to the next page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled" data-page="2" title="Go to the next page" data-testid="button-go-to-the-next-page">
                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-right k-button-icon">
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                          <path d="M352 256 160 384V128z" />
                          </svg>
                        </span>
                      </button>
                    <button aria-label="Go to the last page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled k-pager-last" data-page="1" title="Go to the last page" data-testid="button-go-to-the-last-page">
                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-to-right k-button-icon">
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                          <path d="m128 128 192 128-192 128zm224 256V128h-32v256z" />
                          </svg>
                        </span>
                      </button>
                    <span className="k-pager-input" style={{"display": "none"}}>
                      <span>{"Page"}</span>
                      <KitWidget id="k9" />
                      <span>{"of 0"}</span>
                      </span>
                    </div>
                  <a aria-label="Refresh" className="k-pager-refresh k-button k-button-flat k-icon-button" href="/api/ProviderEnrollment/SearchProviderApplication/" title="Refresh" data-role="tooltip" data-kit-tip="Refresh" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="link-refresh">
                    <span className="k-icon k-svg-icon k-svg-i-arrow-rotate-cw k-button-icon">
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                        <path d="M480 288c0 123.7-100.3 224-224 224S32 411.7 32 288 132.3 64 256 64V0l160 96-160 96v-64c-88.2 0-160 71.8-160 160s71.8 160 160 160 160-71.8 160-160c0-29.1-7.8-56.4-21.5-80l55.5-32c19.1 32.9 30 71.2 30 112" />
                        </svg>
                      </span>
                    </a>
                  <span className="k-pager-info">{"No Items to display"}</span>
                  <span className="k-pager-sizes">
                    <KitWidget id="k10" />
                    <span>{"Items per page"}</span>
                    </span>
                  </div>
                </div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</form>{" "}<form id="downloadFileForm" method="post" action="/api/ProviderEnrollment/GetFile/" style={{"display": "none"}}>
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text-3" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-4" />{" "}<input name="__RequestVerificationToken" type="hidden" defaultValue="mWjPnrb6Ukidv4fZkN-IOHb1grFkEwt6-IIfGg8unVkpnnvqHVd46Co3EAL5g9rC8GxCJ-nVTqQdZqWvjYyIUYpKK94YQDReBrqx4MDsBu17Fb06XBKAFJlSI2sQkV_ZsfGmtAdxKag8IdbljYwdbQ2" style={{}} />{" "}<label id="downloadFileIdLabel" htmlFor="downloadFileId" className="display-none">{"downloadFileId"}</label>
    <input type="hidden" id="downloadFileId" name="fileId" aria-labelledby="downloadFileIdLabel" defaultValue="" style={{}} />{" "}</form>{" "}</main></KitScreen></>
  );
}
