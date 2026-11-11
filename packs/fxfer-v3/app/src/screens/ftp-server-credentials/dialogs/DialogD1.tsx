// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Dialog d1 "Add FTP Server Credentials" of fxfer-v3/ftp-server-credentials: ported from packs/fxfer-v3/screens/ftp-server-credentials/kit/dialogs/d1.html.
export default function DialogD1() {
  return (
    <><div id="ViewEditFTPServerCredentials_content" className="loading">{" "}<div id="ViewEditFTPServerCredentials_body">{" "}<form action="/FileTransfer/AddFTPServerCredentials" id="viewEditFTPServerCredentialsId" method="post" name="viewEditFTPServerCredentialsId" data-role="validator" noValidate={true}>
      <input name="__RequestVerificationToken" type="hidden" defaultValue="i67MF8EOC_0Uxf5wmqUSMRU7tgr-5Dq5T8x0GxuFLYYIUVsHksymHWPZ0yNEnSNZI7wmTXayyOdvNEbhEGoMh3od-meyBAj9ZkL09qDqj00Km-RZV6sTPuFNaY1F-SckFaAEezQXtMRiszdcdJNn_g2" />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="">{" "}<div className="">{" "}<div id="ViewEditFTPServerCredentialsValidation"></div>{" "}<div className="panel-body-modal">{" "}<div className="content-panel-container">{" "}<div className="content-panel-bdy">{" "}<div className="clear-n-pad" id="inputFtpServerCredentialsControlsDiv">{" "}<div className="content-subpanel-container">{" "}<div className="content-subpanel-hdr">{"\n                                    FTP Server Credentials\n                                "}</div>{" "}<div className="content-subpanel-bdy">{" "}<fieldset>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="Edit_FtpServerName_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Server Name is a required field." data-role="tooltip" data-kit-tip="Server Name is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpServerName" id="Edit_FtpServerNameLabel" title="Server Name">{"Server Name"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpServerNameHelp" role="img" title="Server Name" data-role="tooltip" data-kit-tip="Server Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-focus" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Server Name has a maximum length of 50 characters." data-val-regex="Server Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Server Name is a required field." id="Edit_FtpServerName" ignoredirtydata="False" maxLength={50} name="FtpServerName" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpServerNameLabel Edit_FtpServerNameHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpServerName_validationMessage" data-for="FtpServerName"></span>
                              <span id="Edit_FtpServerNameHelpDesc" hidden={true}>{"Server Name"}</span>
                              </div>
                            </div>{" "}<div className="col-md-4 editor-col" id="Edit_FtpDescription_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Description is a required field." data-role="tooltip" data-kit-tip="Description is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpDescription" id="Edit_FtpDescriptionLabel" title="Description">{"Description"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpDescriptionHelp" role="img" title="Description" data-role="tooltip" data-kit-tip="Description" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Description has a maximum length of 100 characters." data-val-regex="Description contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Description is a required field." id="Edit_FtpDescription" ignoredirtydata="False" maxLength={100} name="FtpDescription" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpDescriptionLabel Edit_FtpDescriptionHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpDescription_validationMessage" data-for="FtpDescription"></span>
                              <span id="Edit_FtpDescriptionHelpDesc" hidden={true}>{"Description"}</span>
                              </div>
                            </div>{" "}<div className="col-md-3 editor-col" id="Edit_FtpTransferMode_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Transfer Mode is a required field." data-role="tooltip" data-kit-tip="Transfer Mode is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpTransferMode" id="Edit_FtpTransferModeLabel" title="Transfer Mode">{"Transfer Mode"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpTransferModeHelp" role="img" title="Transfer Mode" data-role="tooltip" data-kit-tip="Transfer Mode" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Transfer Mode has a maximum length of 1 characters." data-val-required="Transfer Mode is a required field." id="Edit_FtpTransferMode" ignoredirtydata="False" maxLength={1} name="FtpTransferMode" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpTransferModeLabel Edit_FtpTransferModeHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpTransferMode_validationMessage" data-for="FtpTransferMode"></span>
                              <span id="Edit_FtpTransferModeHelpDesc" hidden={true}>{"Transfer Mode"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="Edit_FtpServerIp_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="IP Server is a required field." data-role="tooltip" data-kit-tip="IP Server is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpServerIp" id="Edit_FtpServerIpLabel" title="IP Server">{"IP Server"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpServerIpHelp" role="img" title="IP Server" data-role="tooltip" data-kit-tip="IP Server" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="IP Server has a maximum length of 15 characters." data-val-regex="IP Server contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="IP Server is a required field." id="Edit_FtpServerIp" ignoredirtydata="False" maxLength={15} name="FtpServerIp" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpServerIpLabel Edit_FtpServerIpHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpServerIp_validationMessage" data-for="FtpServerIp"></span>
                              <span id="Edit_FtpServerIpHelpDesc" hidden={true}>{"IP Server"}</span>
                              </div>
                            </div>{" "}<div className="col-md-2 editor-col" id="Edit_FtpPort_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Port is a required field." data-role="tooltip" data-kit-tip="Port is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpPort" id="Edit_FtpPortLabel" title="Port">{"Port"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpPortHelp" role="img" title="Port" data-role="tooltip" data-kit-tip="Port" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-number="The field Port must be a number." data-val-regex="Port contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Port is a required field." id="Edit_FtpPort" ignoredirtydata="False" name="FtpPort" defaultValue="0" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpPortLabel Edit_FtpPortHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpPort_validationMessage" data-for="FtpPort"></span>
                              <span id="Edit_FtpPortHelpDesc" hidden={true}>{"Port"}</span>
                              </div>
                            </div>{" "}<div className="col-md-3 editor-col" id="Edit_FtpProxyAddress_parent" data-template="Text">
                            <div className="editor-label">
                              <label htmlFor="Edit_FtpProxyAddress" id="Edit_FtpProxyAddressLabel" title="Proxy Address">{"Proxy Address"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpProxyAddressHelp" role="img" title="Proxy Address" data-role="tooltip" data-kit-tip="Proxy Address" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val-length-max="Proxy Address has a maximum length of 200 characters." data-val-regex="Proxy Address contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Edit_FtpProxyAddress" ignoredirtydata="False" maxLength={200} name="FtpProxyAddress" not-data-val-required="Proxy Address is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpProxyAddressLabel Edit_FtpProxyAddressHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpProxyAddress_validationMessage" data-for="FtpProxyAddress"></span>
                              <span id="Edit_FtpProxyAddressHelpDesc" hidden={true}>{"Proxy Address"}</span>
                              </div>
                            </div>{" "}<div className="col-md-2 editor-col" id="Edit_FtpProxyPort_parent" data-template="Text">
                            <div className="editor-label">
                              <label htmlFor="Edit_FtpProxyPort" id="Edit_FtpProxyPortLabel" title="Proxy Port">{"Proxy Port"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpProxyPortHelp" role="img" title="Proxy Port" data-role="tooltip" data-kit-tip="Proxy Port" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-number="The field Proxy Port must be a number." data-val-regex="Proxy Port contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Edit_FtpProxyPort" ignoredirtydata="False" name="FtpProxyPort" not-data-val-required="Proxy Port is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpProxyPortLabel Edit_FtpProxyPortHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpProxyPort_validationMessage" data-for="FtpProxyPort"></span>
                              <span id="Edit_FtpProxyPortHelpDesc" hidden={true}>{"Proxy Port"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="Edit_FtpUser_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Server User is a required field." data-role="tooltip" data-kit-tip="Server User is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpUser" id="Edit_FtpUserLabel" title="Server User">{"Server User"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpUserHelp" role="img" title="Server User" data-role="tooltip" data-kit-tip="Server User" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Server User has a maximum length of 50 characters." data-val-regex="Server User contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Server User is a required field." id="Edit_FtpUser" ignoredirtydata="False" maxLength={50} name="FtpUser" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpUserLabel Edit_FtpUserHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpUser_validationMessage" data-for="FtpUser"></span>
                              <span id="Edit_FtpUserHelpDesc" hidden={true}>{"Server User"}</span>
                              </div>
                            </div>{" "}<div className="col-md-3 editor-col" id="Edit_FtpPassword_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Password is a required field." data-role="tooltip" data-kit-tip="Password is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpPassword" id="Edit_FtpPasswordLabel" title="Password">{"Password"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpPasswordHelp" role="img" title="Password" data-role="tooltip" data-kit-tip="Password" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Password has a maximum length of 50 characters." data-val-regex="Password contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Password is a required field." id="Edit_FtpPassword" ignoredirtydata="False" maxLength={50} name="FtpPassword" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpPasswordLabel Edit_FtpPasswordHelpDesc" style={{"width": "100%"}} type="password" />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpPassword_validationMessage" data-for="FtpPassword"></span>
                              <span id="Edit_FtpPasswordHelpDesc" hidden={true}>{"Password"}</span>
                              </div>
                            </div>
                          <div className="col-md-3 editor-col" id="Edit_FtpPasswordConfirmation_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Password Confirmation is a required field." data-role="tooltip" data-kit-tip="Password Confirmation is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="Edit_FtpPasswordConfirmation" id="Edit_FtpPasswordConfirmationLabel" title="Password Confirmation">{"Password Confirmation"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_FtpPasswordConfirmationHelp" role="img" title="Password Confirmation" data-role="tooltip" data-kit-tip="Password Confirmation" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-equalto-other="Passwords do not match." data-val-length-max="Password Confirmation has a maximum length of 50 characters." data-val-regex="Password Confirmation contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Password Confirmation is a required field." id="Edit_FtpPasswordConfirmation" ignoredirtydata="False" maxLength={50} name="FtpPasswordConfirmation" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Edit_FtpPasswordConfirmationLabel Edit_FtpPasswordConfirmationHelpDesc" style={{"width": "100%"}} type="password" />
                                </span>{" "}<span className="k-invalid-msg" id="Edit_FtpPasswordConfirmation_validationMessage" data-for="FtpPasswordConfirmation"></span>
                              <span id="Edit_FtpPasswordConfirmationHelpDesc" hidden={true}>{"Password Confirmation"}</span>
                              </div>
                            </div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}<div id="divValues" style={{"display": "none"}}>{" "}<label id="FtpServerIdLabel" htmlFor="FtpServerId" className="display-none">{"FtpServerId"}</label>
                    <input id="FtpServerId" name="FtpServerId" type="hidden" defaultValue="" aria-labelledby="FtpServerIdLabel" />{" "}<div className="col-md-3 editor-col" id="View_FtpServerId_parent" data-template="">
                      <div className="editor-label">
                        <label htmlFor="View_FtpServerId" id="View_FtpServerIdLabel" readOnly={true} className="readonly-label" title="FtpServerId">{"FtpServerId"}</label>
                        </div>
                      <div className="editor-field">
                        <span className="k-input k-textbox k-readonly readonly-widget" style={{}}>
                          <input readOnly={true} id="View_FtpServerId" name="FtpServerId" data-role="textbox" aria-disabled="false" className="k-input-inner readonly-widget" inputMode="text" autoComplete="off" aria-labelledby="View_FtpServerIdLabel" style={{"width": "100%"}} />
                          </span>
                        <span className="k-invalid-msg" id="View_FtpServerId_validationMessage" data-for="View_FtpServerId"></span>
                        </div>
                      </div>{" "}</div>{" "}<label id="Metadata_ModifiedDateLabel" htmlFor="Metadata_ModifiedDate" className="display-none">{"Metadata_ModifiedDate"}</label>
                  <input id="Metadata_ModifiedDate" name="Metadata.ModifiedDate" type="hidden" defaultValue="" aria-labelledby="Metadata_ModifiedDateLabel" />{" "}<label id="Metadata_ModifiedIdLabel" htmlFor="Metadata_ModifiedId" className="display-none">{"Metadata_ModifiedId"}</label>
                  <input id="Metadata_ModifiedId" name="Metadata.ModifiedId" type="hidden" defaultValue="" aria-labelledby="Metadata_ModifiedIdLabel" />{" "}<label id="Metadata_ModifiedTimestampLabel" htmlFor="Metadata_ModifiedTimestamp" className="display-none">{"Metadata_ModifiedTimestamp"}</label>
                  <input id="Metadata_ModifiedTimestamp" name="Metadata.ModifiedTimestamp" type="hidden" defaultValue="" aria-labelledby="Metadata_ModifiedTimestampLabel" />{" "}</div>{" "}<div id="divAuditInfoId" style={{"display": "none"}}>{" "}<div className="content-subpanel-container">{" "}<div className="content-subpanel-hdr">{"\n                                    Audit Details\n                                "}</div>{" "}<div className="content-subpanel-bdy">{" "}<br />{" "}<div className="col-md-3 editor-col" id="View_OperatorId_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="View_OperatorId" id="View_OperatorIdLabel" readOnly={true} className="readonly-label" title="Last Modified User Id">{"Last Modified User Id"}</label>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Last Modified User Id has a maximum length of 200 characters." data-val-regex="Last Modified User Id contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" data-val-required="Last Modified User Id is a required field." id="View_OperatorId" ignoredirtydata="False" maxLength={200} name="OperatorId" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="View_OperatorIdLabel" style={{"width": "100%"}} />
                            </span>{" "}<span className="k-invalid-msg" id="View_OperatorId_validationMessage" data-for="View_OperatorId"></span>
                          </div>
                        </div>{" "}<div className="col-md-2 editor-col" id="View_CreationDate_parent" data-template="Date">
                        <div className="editor-label">
                          <label htmlFor="View_CreationDate" id="View_CreationDateLabel" readOnly={true} className="readonly-label" title="Creation Date">{"Creation Date"}</label>
                          </div>
                        <div className="editor-field">{" "}<span className="k-datepicker k-input editor-control k-input-inner readonly-bkgrnd-color" style={{"padding": "0"}} data-kit="k2">
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-date="Creation Date must represent a valid date in the format 'MM/DD/YYYY'." data-val-minmax-date="Creation Date must be within 01/01/1900 and 12/31/9999." data-val-required="Creation Date is a required field." id="View_CreationDate" ignoredirtydata="False" name="CreationDate" type="text" defaultValue="01/01/1900" data-role="datepicker" inputMode="text" role="combobox" aria-expanded="false" aria-haspopup="grid" aria-controls="View_CreationDate_dateview" autoComplete="off" aria-disabled="false" aria-readonly="true" style={{}} aria-labelledby="View_CreationDateLabel" />
                            <button aria-label="select" tabIndex={-1} className="k-input-button k-button k-icon-button display-none-priority readonly-bkgrnd-color" type="button" role="button">
                              <span className="k-icon k-svg-icon k-svg-i-calendar k-button-icon readonly-cursor display-none-priority">
                                <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M416 416H288V288h128zm64-352v384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h64V0h64v32h128V0h64v32h64c17.6 0 32 14.4 32 32m-32 128H64v255.9l.1.1 383.9-.1zm0-127.9q-.15-.15 0 0l-64-.1v32h-64V64H192v32h-64V64H64.1l-.1.1V160h384z" />
                                  </svg>
                                </span>
                              </button>
                            </span>
                          <span className="k-invalid-msg" id="View_CreationDate_validationMessage" data-for="View_CreationDate"></span>
                          </div>
                        </div>{" "}<div className="col-md-2 editor-col" id="View_LastModifiedDate_parent" data-template="Date">
                        <div className="editor-label">
                          <label htmlFor="View_LastModifiedDate" id="View_LastModifiedDateLabel" readOnly={true} className="readonly-label" title="Modified Date">{"Modified Date"}</label>
                          </div>
                        <div className="editor-field">{" "}<span className="k-datepicker k-input editor-control k-input-inner readonly-bkgrnd-color" style={{"padding": "0"}} data-kit="k3">
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-date="Modified Date must represent a valid date in the format 'MM/DD/YYYY'." data-val-minmax-date="Modified Date must be within 01/01/1900 and 12/31/9999." height="0" id="View_LastModifiedDate" ignoredirtydata="False" name="LastModifiedDate" not-data-val-required="Modified Date is a required field." type="text" defaultValue="01/01/1900" data-role="datepicker" inputMode="text" role="combobox" aria-expanded="false" aria-haspopup="grid" aria-controls="View_LastModifiedDate_dateview" autoComplete="off" aria-disabled="false" aria-readonly="true" style={{}} aria-labelledby="View_LastModifiedDateLabel" />
                            <button aria-label="select" tabIndex={-1} className="k-input-button k-button k-icon-button display-none-priority readonly-bkgrnd-color" type="button" role="button">
                              <span className="k-icon k-svg-icon k-svg-i-calendar k-button-icon readonly-cursor display-none-priority">
                                <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M416 416H288V288h128zm64-352v384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h64V0h64v32h128V0h64v32h64c17.6 0 32 14.4 32 32m-32 128H64v255.9l.1.1 383.9-.1zm0-127.9q-.15-.15 0 0l-64-.1v32h-64V64H192v32h-64V64H64.1l-.1.1V160h384z" />
                                  </svg>
                                </span>
                              </button>
                            </span>
                          <span className="k-invalid-msg" id="View_LastModifiedDate_validationMessage" data-for="View_LastModifiedDate"></span>
                          </div>
                        </div>{" "}<div className="col-md-2 editor-col" id="View_IsValid_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="View_IsValid" id="View_IsValidLabel" readOnly={true} className="readonly-label" title="Is Valid">{"Is Valid"}</label>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" id="View_IsValid" ignoredirtydata="False" name="IsValid" not-data-val-required="Is Valid is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="View_IsValidLabel" style={{"width": "100%"}} />
                            </span>{" "}<span className="k-invalid-msg" id="View_IsValid_validationMessage" data-for="View_IsValid"></span>
                          </div>
                        </div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<div id="ViewEditFTPServerCredentialsButtons">
              <div id="viewEditFTPServerCredentialsIdButtonRow" className="editor-button-row">
                <input id="btnInvalidate" type="button" value="Invalidate" className="cancel k-button btn-spacer-right" style={{"display": "none"}} />
                <span className="editor-button-nav">
                  <input id="viewEditFTPServerCredentialsIdCancelButton" type="button" value="Cancel" className="cancel k-button btn-spacer-left" data-kit-action="cancel" />
                  <input id="btnSave" type="button" value="Save" className="cancel k-button btn-spacer-left" data-kit-action="save" />
                  </span>
                </div>
              </div>{" "}</div>{" "}</div>{" "}</div>{" "}</form>{" "}</div>{" "}</div></>
  );
}
