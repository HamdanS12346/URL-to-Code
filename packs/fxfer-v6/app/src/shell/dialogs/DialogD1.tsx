// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Dialog d1 "Add File Transfer Configuration" of fxfer-v6/file-transfer-configuration: ported from packs/fxfer-v6/screens/file-transfer-configuration/kit/dialogs/d1.html.
export default function DialogD1() {
  return (
    <><div id="FileTransferConfigurationEditPopup_content" className="loading">{" "}<div id="FileTransferConfigurationEditPopup_body">{" "}<form action="/FileTransfer/FileTransferConfigurationEdit" className="k-content" id="FileTransferConfigurationEditForm" method="post" name="FileTransferConfigurationEditForm" data-role="validator" noValidate={true}>
      <input name="__RequestVerificationToken" type="hidden" defaultValue="z7PhB7dtcXRc_0yacqPyIHfGr67aBXHVfLO75C28sQU10d-LQjWPUatStgMVLFPMxH_L6wCVTfbtUSkgl9sc65reGnIaCfh3BMoZ7oaWHRizPK_ulOnXqwKXVeg4adB63Tc7y84EMzosytyZ7vnBlg2" />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" data-kit-h="h3">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="">{" "}<div className="">{" "}<div id="divModalPanelBdyScroll">{" "}<div className="editor-req-field-row">{"Required Fields ( "}<span className="editor-req-field fa-solid fa-asterisk"></span>{")"}</div>{" "}<div className="panel-body-modal" id="body">{" "}<div id="FileTransferConfigurationEditStatus"></div>{" "}<div id="divSourceId">{" "}<div className="row">{" "}<div id="FileTransferConfigurationFormStatus"></div>{" "}<div className="editor-section">{" "}<fieldset>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">
                          <span className="clickable editor-req-fields fa-solid fa-asterisk" title="Panel contains one or more required fields." data-role="tooltip" data-kit-tip="Panel contains one or more required fields." data-kit-tip-pos="bottom" data-kit-tip-after="100"></span>{"\n                                            Source Configuration\n                                        "}</div>{" "}<div className="content-panel-bdy col-md-12 assoc-box editor-section row">{" "}<div id="base_configuration" className="panel-body">{" "}<label id="FtsSourceLocationIdLabel" htmlFor="FtsSourceLocationId" className="display-none">{"FtsSourceLocationId"}</label>
                            <input id="FtsSourceLocationId" name="FtsSourceLocationId" type="hidden" defaultValue="" aria-labelledby="FtsSourceLocationIdLabel" />{" "}<input id="ConfigId" name="ConfigId" type="hidden" defaultValue="0" />{" "}<label id="FTPServerIdLabel" htmlFor="FTPServerId" className="display-none">{"FTPServerId"}</label>
                            <input id="FTPServerId" name="FTPServerId" type="hidden" defaultValue="" aria-labelledby="FTPServerIdLabel" />{" "}<div className="col-md-3 editor-col" id="Edit_ConfigName_parent" data-template="Text">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Configuration Name is a required field." data-role="tooltip" data-kit-tip="Configuration Name is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="Edit_ConfigName" id="Edit_ConfigNameLabel" title="Configuration Name">{"Configuration Name"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_ConfigNameHelp" role="img" title="Configuration Name" data-role="tooltip" data-kit-tip="Configuration Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-focus" style={{}}>
                                  <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Configuration Name has a maximum length of 50 characters." data-val-regex="Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" data-val-required="Configuration Name is a required field." height="0" id="Edit_ConfigName" ignoredirtydata="False" maxLength={50} name="ConfigName" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="Edit_ConfigNameLabel Edit_ConfigNameHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="Edit_ConfigName_validationMessage" data-for="ConfigName"></span>
                                <span id="Edit_ConfigNameHelpDesc" hidden={true} data-kit-h="h4">{"Configuration Name"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="Description_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="Description" id="DescriptionLabel" title="Description">{"Description"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="DescriptionHelp" role="img" title="Description" data-role="tooltip" data-kit-tip="Description" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val-length-max="Description has a maximum length of 200 characters." height="0" id="Description" ignoredirtydata="False" maxLength={200} name="Description" not-data-val-required="Description is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="DescriptionLabel DescriptionHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="Description_validationMessage" data-for="Description"></span>
                                <span id="DescriptionHelpDesc" hidden={true} data-kit-h="h5">{"Description"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="ProtocolTypeList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Protocol is a required field." data-role="tooltip" data-kit-tip="Protocol is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="ProtocolType" id="ProtocolTypeLabel" title="Protocol">{"Protocol"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ProtocolTypeHelp" role="img" title="Protocol" data-role="tooltip" data-kit-tip="Protocol" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="ProtocolTypeList_listbox" aria-busy="false" aria-describedby="12b876d4-e62b-46b4-832f-a5a971d2eb87" style={{}} aria-labelledby="ProtocolTypeLabel ProtocolTypeHelpDesc" data-kit="k5">
                                  <span id="12b876d4-e62b-46b4-832f-a5a971d2eb87" unselectable="on" className="k-input-inner">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="ProtocolTypeListLabel" htmlFor="ProtocolTypeList" className="display-none">{"ProtocolTypeList"}</label>
                                  <input className="editor-control" data-val="true" data-val-required="Protocol is a required field." height="0" id="ProtocolTypeList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.ProtocolType" listviewdisplayformat="Name" name="ProtocolTypeList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-ProtocolType" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="ProtocolTypeListLabel" />
                                  </span>{" "}<label id="ProtocolType_IDLabel" htmlFor="ProtocolType_ID" className="display-none">{"ProtocolType_ID"}</label>
                                <input id="ProtocolType_ID" name="ProtocolType.ID" type="hidden" defaultValue="" aria-labelledby="ProtocolType_IDLabel" />{" "}<label id="ProtocolType_NameLabel" htmlFor="ProtocolType_Name" className="display-none">{"ProtocolType_Name"}</label>
                                <input id="ProtocolType_Name" name="ProtocolType.Name" type="hidden" defaultValue="" aria-labelledby="ProtocolType_NameLabel" />{" "}<label id="ProtocolType_DisplayFormatLabel" htmlFor="ProtocolType_DisplayFormat" className="display-none">{"ProtocolType_DisplayFormat"}</label>
                                <input id="ProtocolType_DisplayFormat" name="ProtocolType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ProtocolType_DisplayFormatLabel" />
                                <span className="k-invalid-msg" id="ProtocolTypeList_validationMessage" data-for="ProtocolTypeList"></span>
                                <span id="ProtocolTypeHelpDesc" hidden={true} data-kit-h="h6">{"Protocol"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="ftpServer" data-kit-h="h7" style={{"display": "none"}}>{" "}<div className="editor-label">{" "}<span className="clickable editor-req-field fa-solid fa-asterisk" title="Server is a required field." data-role="tooltip" data-kit-tip="Server is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="col-md-4 editor-colFTPServer" id="col-md-4 editor-colFTPServerLabel" title="Server">{"Server"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="col-md-4_editor-colFTPServerHelp" role="img" title="Server" data-role="tooltip" data-kit-tip="Server" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{" "}<div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="FtsServerList_listbox" aria-labelledby="col-md-4 editor-colFTPServerLabel col-md-4_editor-colFTPServerHelpDesc" style={{}} aria-busy="false" data-kit="k6">
                                  <span id="83fb012c-f39c-41b1-a037-03810348ed92" unselectable="on" className="k-input-inner">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="FtsServerListLabel" htmlFor="FtsServerList" className="display-none">{"FtsServerList"}</label>
                                  <input className="editor-control" data-val="true" data-val-required="Please input required information and try again." height="0" id="FtsServerList" ignoredirtydata="False" name="FtsServerList" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="FtsServerListLabel" />
                                  </span>{" "}<span id="col-md-4_editor-colFTPServerHelpDesc" hidden={true}>{"Server"}</span>
                                </div>{" "}</div>{" "}<label id="OwnerSubsystemIdLabel" htmlFor="OwnerSubsystemId" className="display-none">{"OwnerSubsystemId"}</label>
                            <input id="OwnerSubsystemId" name="OwnerSubsystemId" type="hidden" defaultValue="" aria-labelledby="OwnerSubsystemIdLabel" />{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="SourceAddress_parent" data-template="Text">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Source Address is a required field." data-role="tooltip" data-kit-tip="Source Address is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="SourceAddress" id="SourceAddressLabel" title="Source Address">{"Source Address"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="SourceAddressHelp" role="img" title="Source Address" data-role="tooltip" data-kit-tip="Source Address" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Source Address has a maximum length of 248 characters." data-val-required="Source Address is a required field." height="0" id="SourceAddress" ignoredirtydata="False" maxLength={248} name="SourceAddress" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="SourceAddressLabel SourceAddressHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="SourceAddress_validationMessage" data-for="SourceAddress"></span>
                                <span id="SourceAddressHelpDesc" hidden={true} data-kit-h="h8">{"Source Address"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="SourceFileMask_parent" data-template="Text">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Source File Mask is a required field." data-role="tooltip" data-kit-tip="Source File Mask is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="SourceFileMask" id="SourceFileMaskLabel" title="Source File Mask">{"Source File Mask"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="SourceFileMaskHelp" role="img" title="Source File Mask" data-role="tooltip" data-kit-tip="Source File Mask" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Source File Mask has a maximum length of 50 characters." data-val-required="Source File Mask is a required field." height="0" id="SourceFileMask" ignoredirtydata="False" maxLength={50} name="SourceFileMask" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="SourceFileMaskLabel SourceFileMaskHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="SourceFileMask_validationMessage" data-for="SourceFileMask"></span>
                                <span id="SourceFileMaskHelpDesc" hidden={true} data-kit-h="h9">{"Source File Mask"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="FileDirectionList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="FileDirection" id="FileDirectionLabel" title="File Direction">{"File Direction"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FileDirectionHelp" role="img" title="File Direction" data-role="tooltip" data-kit-tip="File Direction" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="FileDirectionList_listbox" aria-busy="false" aria-describedby="23d476a3-77cc-4632-8d0b-20e55b3e522b" style={{}} aria-labelledby="FileDirectionLabel FileDirectionHelpDesc" data-kit="k7">
                                  <span id="23d476a3-77cc-4632-8d0b-20e55b3e522b" unselectable="on" className="k-input-inner">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="FileDirectionListLabel" htmlFor="FileDirectionList" className="display-none">{"FileDirectionList"}</label>
                                  <input className="editor-control" height="0" id="FileDirectionList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.FileDirection" listviewdisplayformat="Name" name="FileDirectionList" not-data-val-required="File Direction is a required field." propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-FileDirection" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="FileDirectionListLabel" />
                                  </span>{" "}<label id="FileDirection_IDLabel" htmlFor="FileDirection_ID" className="display-none">{"FileDirection_ID"}</label>
                                <input id="FileDirection_ID" name="FileDirection.ID" type="hidden" defaultValue="" aria-labelledby="FileDirection_IDLabel" />{" "}<label id="FileDirection_NameLabel" htmlFor="FileDirection_Name" className="display-none">{"FileDirection_Name"}</label>
                                <input id="FileDirection_Name" name="FileDirection.Name" type="hidden" defaultValue="" aria-labelledby="FileDirection_NameLabel" />{" "}<label id="FileDirection_DisplayFormatLabel" htmlFor="FileDirection_DisplayFormat" className="display-none">{"FileDirection_DisplayFormat"}</label>
                                <input id="FileDirection_DisplayFormat" name="FileDirection.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="FileDirection_DisplayFormatLabel" />
                                <span className="k-invalid-msg" id="FileDirectionList_validationMessage" data-for="FileDirectionList"></span>
                                <span id="FileDirectionHelpDesc" hidden={true} data-kit-h="h10">{"File Direction"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="TradingPartner_parent" data-template="Text">
                              <div className="editor-label">
                                <label htmlFor="TradingPartner" id="TradingPartnerLabel" title="Trading Partner">{"Trading Partner"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TradingPartnerHelp" role="img" title="Trading Partner" data-role="tooltip" data-kit-tip="Trading Partner" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val-length-max="Trading Partner has a maximum length of 10 characters." data-val-regex="Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="TradingPartner" ignoredirtydata="False" maxLength={10} name="TradingPartner" not-data-val-required="Trading Partner is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="TradingPartnerLabel TradingPartnerHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="TradingPartner_validationMessage" data-for="TradingPartner"></span>
                                <span id="TradingPartnerHelpDesc" hidden={true} data-kit-h="h11">{"Trading Partner"}</span>
                                </div>
                              </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="Edit_OwnerName_parent" data-template="Text">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Owner Name is a required field." data-role="tooltip" data-kit-tip="Owner Name is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="Edit_OwnerName" id="Edit_OwnerNameLabel" title="Owner Name">{"Owner Name"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Edit_OwnerNameHelp" role="img" title="Owner Name" data-role="tooltip" data-kit-tip="Owner Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Owner Name has a maximum length of 50 characters." data-val-required="Owner Name is a required field." height="0" id="Edit_OwnerName" ignoredirtydata="False" maxLength={50} name="OwnerName" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="Edit_OwnerNameLabel Edit_OwnerNameHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="Edit_OwnerName_validationMessage" data-for="OwnerName"></span>
                                <span id="Edit_OwnerNameHelpDesc" hidden={true} data-kit-h="h12">{"Owner Name"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="OwnerPhoneNumber_parent" data-template="PhoneNumberUS">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Owner Phone is a required field." data-role="tooltip" data-kit-tip="Owner Phone is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="OwnerPhoneNumber" id="OwnerPhoneNumberLabel" title="Owner Phone">{"Owner Phone"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="OwnerPhoneNumberHelp" role="img" title="Owner Phone" data-role="tooltip" data-kit-tip="Owner Phone" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">
                                <span className="k-input k-maskedtextbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner k-widget" data-val="true" data-val-length-max="Owner Phone has a maximum length of 20 characters." data-val-regex="Enter Valid Phone Number." data-val-regex-pattern="^(?!(^\\(?(0{3})\\)?( |-|\\.)?0{3}( |-|\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( |-|\\.)?\\d{3,3}( |-|\\.)?\\d{4,4}$)" data-val-required="Owner Phone is a required field." height="0" id="OwnerPhoneNumber" ignoredirtydata="False" name="OwnerPhoneNumber" data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="000-000-0000" style={{"width": "100%"}} aria-labelledby="OwnerPhoneNumberLabel OwnerPhoneNumberHelpDesc" />
                                  </span>
                                <span className="k-invalid-msg" id="OwnerPhoneNumber_validationMessage" data-for="OwnerPhoneNumber"></span>
                                <span id="OwnerPhoneNumberHelpDesc" hidden={true} data-kit-h="h13">{"Owner Phone"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col">{" "}<div className="editor-label">{" "}<span className="clickable editor-req-field fa-solid fa-asterisk" title="Owner Module is a required field." data-role="tooltip" data-kit-tip="Owner Module is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="col-md-4 editor-colOwnerSubsystem" id="col-md-4 editor-colOwnerSubsystemLabel" title="Owner Module">{"Owner Module"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="col-md-4_editor-colOwnerSubsystemHelp" role="img" title="Owner Module" data-role="tooltip" data-kit-tip="Owner Module" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{" "}<div className="editor-field">{" "}<label id="OwnerSubsystem_IDLabel" htmlFor="OwnerSubsystem_ID" className="display-none">{"OwnerSubsystem_ID"}</label>
                                <input id="OwnerSubsystem_ID" name="OwnerSubsystem.ID" type="hidden" defaultValue="" aria-labelledby="OwnerSubsystem_IDLabel" />{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="AddConfigModuleList_listbox" aria-labelledby="col-md-4 editor-colOwnerSubsystemLabel col-md-4_editor-colOwnerSubsystemHelpDesc" style={{}} aria-busy="false" data-kit="k8">
                                  <span id="4efbcca7-2af4-4e1f-b7fb-570e312d27ea" unselectable="on" className="k-input-inner">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="AddConfigModuleListLabel" htmlFor="AddConfigModuleList" className="display-none">{"AddConfigModuleList"}</label>
                                  <input className="editor-control" data-val="true" data-val-required="Owner Module is a required field." height="0" id="AddConfigModuleList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.OwnerModule" listviewdisplayformat="Name" name="AddConfigModuleList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-OwnerSubsystem" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="AddConfigModuleListLabel" />
                                  </span>{" "}<span id="col-md-4_editor-colOwnerSubsystemHelpDesc" hidden={true} data-kit-h="h14">{"Owner Module"}</span>
                                </div>{" "}</div>{" "}<div className="col-md-3 editor-col" id="OwnerEmail_parent" data-template="Text">
                              <div className="editor-label">
                                <span className="clickable editor-req-field fa-solid fa-asterisk" title="Owner Email is a required field." data-role="tooltip" data-kit-tip="Owner Email is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <label htmlFor="OwnerEmail" id="OwnerEmailLabel" title="Owner Email">{"Owner Email"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="OwnerEmailHelp" role="img" title="Owner Email" data-role="tooltip" data-kit-tip="Owner Email" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                  <input className="editor-control k-input-inner" data-email-msg="Owner Email is not a valid email address. Enter email with 'name@domain' format." data-val="true" data-val-length-max="Owner Email has a maximum length of 150 characters." data-val-regex="Owner Email is not a valid email address. Enter email with 'name@domain' format." data-val-regex-pattern="^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$" data-val-required="Owner Email is a required field." height="0" id="OwnerEmail" ignoredirtydata="False" maxLength={150} name="OwnerEmail" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="OwnerEmailLabel OwnerEmailHelpDesc" />
                                  </span>{" "}<span className="k-invalid-msg" id="OwnerEmail_validationMessage" data-for="OwnerEmail"></span>
                                <span id="OwnerEmailHelpDesc" hidden={true} data-kit-h="h15">{"Owner Email"}</span>
                                </div>
                              </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-12 assoc-box editor-section row">{" "}<div className="col-md-12 assoc-box editor-section row">{" "}<div className="col-md-4 editor-col list-horizontal editor-clear" id="RunSchedule_parent" data-template="RadioButtonList">
                                  <div className="editor-label">
                                    <span className="clickable editor-req-field fa-solid fa-asterisk" title="Run Schedule is a required field." data-role="tooltip" data-kit-tip="Run Schedule is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                    <label htmlFor="RunSchedule" id="RunScheduleLabel" title="Run Schedule">{"Run Schedule"}</label>
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunScheduleHelp" role="img" title="Run Schedule" data-role="tooltip" data-kit-tip="Run Schedule" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                    </div>
                                  <div className="editor-field">{" "}<div className="assoc-box-radio-btn-list-horz">{" "}<span className="list-item">
                                        <input className="k-radio" id="RunSchedule_ID1" name="RunSchedule.ID" type="radio" defaultValue="1" ignoredirtydata="False" aria-describedby="RunScheduleHelpDesc" />
                                        <label className="k-radio-label" htmlFor="RunSchedule_ID1">{"Run Weekly"}</label>
                                        </span>
                                      <span className="list-item">
                                        <input className="k-radio" id="RunSchedule_ID2" name="RunSchedule.ID" type="radio" defaultValue="2" ignoredirtydata="False" aria-describedby="RunScheduleHelpDesc" />
                                        <label className="k-radio-label" htmlFor="RunSchedule_ID2">{"Run Monthly"}</label>
                                        </span>{" "}</div>{" "}<span className="k-invalid-msg" id="RunSchedule_validationMessage" data-for="RunSchedule"></span>
                                    <span id="RunScheduleHelpDesc" hidden={true} data-kit-h="h16">{"Run Schedule"}</span>
                                    </div>
                                  </div>{" "}<div id="RunType_Weekly" data-kit-h="h17" style={{"display": "none"}}>{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="RunOnSunday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnSunday" ignoredirtydata="False" name="RunOnSunday" not-data-val-required="Sunday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnSundayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnSunday" className="k-checkbox-label" style={{}}>{"Sunday"}</label>
                                      <input name="RunOnSunday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnSundayHelp" role="img" title="Run Sunday" data-role="tooltip" data-kit-tip="Run Sunday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnSunday_validationMessage" data-for="RunOnSunday"></span>
                                      <span id="RunOnSundayHelpDesc" hidden={true}>{"Run Sunday"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnMonday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnMonday" ignoredirtydata="False" name="RunOnMonday" not-data-val-required="Monday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnMondayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnMonday" className="k-checkbox-label" style={{}}>{"Monday"}</label>
                                      <input name="RunOnMonday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnMondayHelp" role="img" title="Run Monday" data-role="tooltip" data-kit-tip="Run Monday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnMonday_validationMessage" data-for="RunOnMonday"></span>
                                      <span id="RunOnMondayHelpDesc" hidden={true}>{"Run Monday"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnTuesday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnTuesday" ignoredirtydata="False" name="RunOnTuesday" not-data-val-required="Tuesday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnTuesdayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnTuesday" className="k-checkbox-label" style={{}}>{"Tuesday"}</label>
                                      <input name="RunOnTuesday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnTuesdayHelp" role="img" title="Run Tuesday" data-role="tooltip" data-kit-tip="Run Tuesday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnTuesday_validationMessage" data-for="RunOnTuesday"></span>
                                      <span id="RunOnTuesdayHelpDesc" hidden={true}>{"Run Tuesday"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnWednesday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnWednesday" ignoredirtydata="False" name="RunOnWednesday" not-data-val-required="Wednesday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnWednesdayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnWednesday" className="k-checkbox-label" style={{}}>{"Wednesday"}</label>
                                      <input name="RunOnWednesday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnWednesdayHelp" role="img" title="Run Wednesday" data-role="tooltip" data-kit-tip="Run Wednesday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnWednesday_validationMessage" data-for="RunOnWednesday"></span>
                                      <span id="RunOnWednesdayHelpDesc" hidden={true}>{"Run Wednesday"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnThursday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnThursday" ignoredirtydata="False" name="RunOnThursday" not-data-val-required="Thursday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnThursdayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnThursday" className="k-checkbox-label" style={{}}>{"Thursday"}</label>
                                      <input name="RunOnThursday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnThursdayHelp" role="img" title="Run Thursday" data-role="tooltip" data-kit-tip="Run Thursday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnThursday_validationMessage" data-for="RunOnThursday"></span>
                                      <span id="RunOnThursdayHelpDesc" hidden={true}>{"Run Thursday"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnFriday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnFriday" ignoredirtydata="False" name="RunOnFriday" not-data-val-required="Friday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnFridayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnFriday" className="k-checkbox-label" style={{}}>{"Friday"}</label>
                                      <input name="RunOnFriday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnFridayHelp" role="img" title="Run Friday" data-role="tooltip" data-kit-tip="Run Friday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnFriday_validationMessage" data-for="RunOnFriday"></span>
                                      <span id="RunOnFridayHelpDesc" hidden={true}>{"Run Friday"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnSaturday_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnSaturday" ignoredirtydata="False" name="RunOnSaturday" not-data-val-required="Saturday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnSaturdayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnSaturday" className="k-checkbox-label" style={{}}>{"Saturday"}</label>
                                      <input name="RunOnSaturday" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnSaturdayHelp" role="img" title="Run Saturday" data-role="tooltip" data-kit-tip="Run Saturday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnSaturday_validationMessage" data-for="RunOnSaturday"></span>
                                      <span id="RunOnSaturdayHelpDesc" hidden={true}>{"Run Saturday"}</span>
                                      </div>
                                    </div>{" "}</div>{" "}<div className="clear-both"></div>{" "}<div id="RunType_Monthly" data-kit-h="h18" style={{"display": "none"}}>{" "}<div className="col-md-3 editor-col" id="RunOnFirstDay_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnFirstDay" ignoredirtydata="False" name="RunOnFirstDay" not-data-val-required="Run On First Day Month is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnFirstDayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnFirstDay" className="k-checkbox-label" style={{}}>{"Run On First Day Month"}</label>
                                      <input name="RunOnFirstDay" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnFirstDayHelp" role="img" title="Run On First Day Month" data-role="tooltip" data-kit-tip="Run On First Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnFirstDay_validationMessage" data-for="RunOnFirstDay"></span>
                                      <span id="RunOnFirstDayHelpDesc" hidden={true}>{"Run On First Day Month"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnLastDay_parent">
                                    <div className="editor-label">
                                      <label>{" "}</label>
                                      </div>
                                    <div className="editor-field assoc-box-checkbox">
                                      <span className="k-checkbox-wrap">
                                        <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="RunOnLastDay" ignoredirtydata="False" name="RunOnLastDay" not-data-val-required="Run On Last Day Month is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="RunOnLastDayHelpDesc" />
                                        </span>
                                      <label htmlFor="RunOnLastDay" className="k-checkbox-label" style={{}}>{"Run On Last Day Month"}</label>
                                      <input name="RunOnLastDay" type="hidden" defaultValue="false" />
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnLastDayHelp" role="img" title="Run On Last Day Month" data-role="tooltip" data-kit-tip="Run On Last Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      <span className="k-invalid-msg" id="RunOnLastDay_validationMessage" data-for="RunOnLastDay"></span>
                                      <span id="RunOnLastDayHelpDesc" hidden={true}>{"Run On Last Day Month"}</span>
                                      </div>
                                    </div>{" "}<div className="col-md-3 editor-col" id="RunOnThisDayList_parent" data-template="ListItemSingle">
                                    <div className="editor-label">
                                      <label htmlFor="RunOnThisDay" id="RunOnThisDayLabel" title="Run On This Day Month">{"Run On This Day Month"}</label>
                                      <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RunOnThisDayHelp" role="img" title="Run On This Day Month" data-role="tooltip" data-kit-tip="Run On This Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                      </div>
                                    <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="RunOnThisDayList_listbox" aria-busy="false" aria-describedby="5ade198d-a9f5-4efb-b383-54aa46ad9ea7" style={{}} aria-labelledby="RunOnThisDayLabel RunOnThisDayHelpDesc" data-kit="k9">
                                        <span id="5ade198d-a9f5-4efb-b383-54aa46ad9ea7" unselectable="on" className="k-input-inner">
                                          <span className="k-input-value-text">{"select a value..."}</span>
                                          </span>
                                        <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                          <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                            <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M256 352 128 160h256z" />
                                              </svg>
                                            </span>
                                          </button>
                                        <label id="RunOnThisDayListLabel" htmlFor="RunOnThisDayList" className="display-none">{"RunOnThisDayList"}</label>
                                        <input className="editor-control" height="0" id="RunOnThisDayList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.DayOfMonth" listviewdisplayformat="Name" name="RunOnThisDayList" not-data-val-required="Run On This Day Month is a required field." propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-RunOnThisDay" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="RunOnThisDayListLabel" />
                                        </span>{" "}<label id="RunOnThisDay_IDLabel" htmlFor="RunOnThisDay_ID" className="display-none">{"RunOnThisDay_ID"}</label>
                                      <input id="RunOnThisDay_ID" name="RunOnThisDay.ID" type="hidden" defaultValue="" aria-labelledby="RunOnThisDay_IDLabel" />{" "}<label id="RunOnThisDay_NameLabel" htmlFor="RunOnThisDay_Name" className="display-none">{"RunOnThisDay_Name"}</label>
                                      <input id="RunOnThisDay_Name" name="RunOnThisDay.Name" type="hidden" defaultValue="" aria-labelledby="RunOnThisDay_NameLabel" />{" "}<label id="RunOnThisDay_DisplayFormatLabel" htmlFor="RunOnThisDay_DisplayFormat" className="display-none">{"RunOnThisDay_DisplayFormat"}</label>
                                      <input id="RunOnThisDay_DisplayFormat" name="RunOnThisDay.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="RunOnThisDay_DisplayFormatLabel" />
                                      <span className="k-invalid-msg" id="RunOnThisDayList_validationMessage" data-for="RunOnThisDayList"></span>
                                      <span id="RunOnThisDayHelpDesc" hidden={true}>{"Run On This Day Month"}</span>
                                      </div>
                                    </div>{" "}</div>{" "}</div>{" "}<div className="clear-both" id="clear"></div>{" "}<div className="col-md-3 editor-col" id="TimeWindowStartList_parent" data-template="ListItemSingle">
                                <div className="editor-label">
                                  <span className="clickable editor-req-field fa-solid fa-asterisk" title="Time Window Start is a required field." data-role="tooltip" data-kit-tip="Time Window Start is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                  <label htmlFor="TimeWindowStart" id="TimeWindowStartLabel" title="Time Window Start">{"Time Window Start"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TimeWindowStartHelp" role="img" title="Time Window Start" data-role="tooltip" data-kit-tip="Time Window Start" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                  </div>
                                <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="TimeWindowStartList_listbox" aria-busy="false" aria-describedby="f0c0abe9-a699-4598-9804-d6b608d38936" style={{}} aria-labelledby="TimeWindowStartLabel TimeWindowStartHelpDesc" data-kit="k10">
                                    <span id="f0c0abe9-a699-4598-9804-d6b608d38936" unselectable="on" className="k-input-inner">
                                      <span className="k-input-value-text">{"select a value..."}</span>
                                      </span>
                                    <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M256 352 128 160h256z" />
                                          </svg>
                                        </span>
                                      </button>
                                    <label id="TimeWindowStartListLabel" htmlFor="TimeWindowStartList" className="display-none">{"TimeWindowStartList"}</label>
                                    <input className="editor-control" data-val="true" data-val-required="Time Window Start is a required field." height="0" id="TimeWindowStartList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.TimeWindow" listviewdisplayformat="Name" name="TimeWindowStartList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-TimeWindowStart" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="TimeWindowStartListLabel" />
                                    </span>{" "}<label id="TimeWindowStart_IDLabel" htmlFor="TimeWindowStart_ID" className="display-none">{"TimeWindowStart_ID"}</label>
                                  <input id="TimeWindowStart_ID" name="TimeWindowStart.ID" type="hidden" defaultValue="" aria-labelledby="TimeWindowStart_IDLabel" />{" "}<label id="TimeWindowStart_NameLabel" htmlFor="TimeWindowStart_Name" className="display-none">{"TimeWindowStart_Name"}</label>
                                  <input id="TimeWindowStart_Name" name="TimeWindowStart.Name" type="hidden" defaultValue="" aria-labelledby="TimeWindowStart_NameLabel" />{" "}<label id="TimeWindowStart_DisplayFormatLabel" htmlFor="TimeWindowStart_DisplayFormat" className="display-none">{"TimeWindowStart_DisplayFormat"}</label>
                                  <input id="TimeWindowStart_DisplayFormat" name="TimeWindowStart.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="TimeWindowStart_DisplayFormatLabel" />
                                  <span className="k-invalid-msg" id="TimeWindowStartList_validationMessage" data-for="TimeWindowStartList"></span>
                                  <span id="TimeWindowStartHelpDesc" hidden={true} data-kit-h="h19">{"Time Window Start"}</span>
                                  </div>
                                </div>{" "}<div className="col-md-3 editor-col" id="TimeWindowEndList_parent" data-template="ListItemSingle">
                                <div className="editor-label">
                                  <span className="clickable editor-req-field fa-solid fa-asterisk" title="Time Window End is a required field." data-role="tooltip" data-kit-tip="Time Window End is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                  <label htmlFor="TimeWindowEnd" id="TimeWindowEndLabel" title="Time Window End">{"Time Window End"}</label>
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="TimeWindowEndHelp" role="img" title="Time Window End" data-role="tooltip" data-kit-tip="Time Window End" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                  </div>
                                <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="TimeWindowEndList_listbox" aria-busy="false" aria-describedby="afac3f8f-12ab-4cb5-bd6d-6d446673c1cc" style={{}} aria-labelledby="TimeWindowEndLabel TimeWindowEndHelpDesc" data-kit="k11">
                                    <span id="afac3f8f-12ab-4cb5-bd6d-6d446673c1cc" unselectable="on" className="k-input-inner">
                                      <span className="k-input-value-text">{"select a value..."}</span>
                                      </span>
                                    <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M256 352 128 160h256z" />
                                          </svg>
                                        </span>
                                      </button>
                                    <label id="TimeWindowEndListLabel" htmlFor="TimeWindowEndList" className="display-none">{"TimeWindowEndList"}</label>
                                    <input className="editor-control" data-val="true" data-val-required="Time Window End is a required field." height="0" id="TimeWindowEndList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.TimeWindow" listviewdisplayformat="Name" name="TimeWindowEndList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-TimeWindowEnd" type="text" data-role="dropdownlist" style={{"display": "none"}} aria-labelledby="TimeWindowEndListLabel" />
                                    </span>{" "}<label id="TimeWindowEnd_IDLabel" htmlFor="TimeWindowEnd_ID" className="display-none">{"TimeWindowEnd_ID"}</label>
                                  <input id="TimeWindowEnd_ID" name="TimeWindowEnd.ID" type="hidden" defaultValue="" aria-labelledby="TimeWindowEnd_IDLabel" />{" "}<label id="TimeWindowEnd_NameLabel" htmlFor="TimeWindowEnd_Name" className="display-none">{"TimeWindowEnd_Name"}</label>
                                  <input id="TimeWindowEnd_Name" name="TimeWindowEnd.Name" type="hidden" defaultValue="" aria-labelledby="TimeWindowEnd_NameLabel" />{" "}<label id="TimeWindowEnd_DisplayFormatLabel" htmlFor="TimeWindowEnd_DisplayFormat" className="display-none">{"TimeWindowEnd_DisplayFormat"}</label>
                                  <input id="TimeWindowEnd_DisplayFormat" name="TimeWindowEnd.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="TimeWindowEnd_DisplayFormatLabel" />
                                  <span className="k-invalid-msg" id="TimeWindowEndList_validationMessage" data-for="TimeWindowEndList"></span>
                                  <span id="TimeWindowEndHelpDesc" hidden={true} data-kit-h="h20">{"Time Window End"}</span>
                                  </div>
                                </div>{" "}<div className="col-md-3 editor-col" id="SendNotification_parent">
                                <div className="editor-label">
                                  <label>{" "}</label>
                                  </div>
                                <div className="editor-field assoc-box-checkbox">
                                  <span className="k-checkbox-wrap">
                                    <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="SendNotification" ignoredirtydata="False" name="SendNotification" not-data-val-required="Send Notification is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="SendNotificationHelpDesc" />
                                    </span>
                                  <label htmlFor="SendNotification" className="k-checkbox-label" style={{}}>{"Send Notification"}</label>
                                  <input name="SendNotification" type="hidden" defaultValue="false" />
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="SendNotificationHelp" role="img" title="Send Notification" data-role="tooltip" data-kit-tip="Send Notification" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                  <span className="k-invalid-msg" id="SendNotification_validationMessage" data-for="SendNotification"></span>
                                  <span id="SendNotificationHelpDesc" hidden={true} data-kit-h="h21">{"Send Notification"}</span>
                                  </div>
                                </div>{" "}<div className="col-md-2 editor-col" id="Suspended_parent">
                                <div className="editor-label">
                                  <label>{" "}</label>
                                  </div>
                                <div className="editor-field assoc-box-checkbox">
                                  <span className="k-checkbox-wrap">
                                    <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="Suspended" ignoredirtydata="False" name="Suspended" not-data-val-required="Suspend is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="SuspendedHelpDesc" />
                                    </span>
                                  <label htmlFor="Suspended" className="k-checkbox-label" style={{}}>{"Suspend"}</label>
                                  <input name="Suspended" type="hidden" defaultValue="false" />
                                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="SuspendedHelp" role="img" title="Suspend" data-role="tooltip" data-kit-tip="Suspend" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                  <span className="k-invalid-msg" id="Suspended_validationMessage" data-for="Suspended"></span>
                                  <span id="SuspendedHelpDesc" hidden={true} data-kit-h="h22">{"Suspend"}</span>
                                  </div>
                                </div>{" "}<div id="active">{" "}<div className="col-md-2 editor-col editor-clear" id="IsActive_parent">
                                  <div className="editor-label">
                                    <label>{" "}</label>
                                    </div>
                                  <div className="editor-field assoc-box-checkbox">
                                    <span className="k-checkbox-wrap">
                                      <input className="editor-control k-checkbox" data-role="checkbox" height="0" id="IsActive" ignoredirtydata="False" name="IsActive" not-data-val-required="Active is a required field." type="checkbox" defaultValue="true" defaultChecked={true} style={{}} aria-describedby="IsActiveHelpDesc" />
                                      </span>
                                    <label htmlFor="IsActive" className="k-checkbox-label" style={{}}>{"Active"}</label>
                                    <input name="IsActive" type="hidden" defaultValue="false" />
                                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="IsActiveHelp" role="img" title="Active" data-role="tooltip" data-kit-tip="Active" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                    <span className="k-invalid-msg" id="IsActive_validationMessage" data-for="IsActive"></span>
                                    <span id="IsActiveHelpDesc" hidden={true} data-kit-h="h23">{"Active"}</span>
                                    </div>
                                  </div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                                            Destination Configuration\n                                        "}</div>{" "}<div className="content-panel-bdy">{" "}<div id="SearchFileTransferStatus"></div>{" "}<div id="searchGrid">{" "}<div className="k-grid editor-grid" id="DestinationGrid" data-role="grid" style={{}} data-kit="k12">
                              <div aria-controls="d89d8cff-9b45-4bbe-a1a4-3e2f4cc928e1" aria-label="grid toolbar" className="k-toolbar k-grid-toolbar k-toolbar-resizable" role="toolbar">{" "}<div className="grid-toolbar-primary" id="grid">{" "}<span className="k-checkbox-wrap">
                                    <input data-role="checkbox" id="DestinationShowInactiveCheckBox" ignoredirtydata="true" name="DestinationShowInactiveCheckBox" title="Show Inactives" type="checkbox" defaultValue="true" className="k-checkbox" style={{}} />
                                    </span>
                                  <label htmlFor="DestinationShowInactiveCheckBox" className="k-checkbox-label" style={{}}>{"Show Inactives"}</label>
                                  <input name="DestinationShowInactiveCheckBox" type="hidden" defaultValue="false" />{" "}<button id="DestinationGridAddButton" title="Create New" type="button" data-role="button" className="k-button" role="button" aria-disabled="false" tabIndex={0} data-kit-action="create">
                                    <span className="k-button-text">{"Create New"}</span>
                                    </button>{" "}</div>{" "}</div>
                              <div className="k-grid-header" style={{"paddingRight": "15px"}}>
                                <div className="k-grid-header-wrap k-auto-scrollable" data-role="resizable">
                                  <table role="grid" className="k-grid-header-table k-table">
                                    <colgroup>
                                      <col />
                                      <col />
                                      <col />
                                      <col style={{"width": "75px"}} />
                                      </colgroup>
                                    <thead className="k-table-thead" role="rowgroup" id="b55e20e4-e84d-4b30-95bb-2fab86633f45">
                                      <tr className="k-table-row" role="row">
                                        <th className="k-table-th k-header" data-field="DestinationAddress" data-index="0" data-resizable="true" data-title="Destination Address" id="0cdc3d6b-e020-4584-980a-8aba2b565722" role="columnheader" scope="col" data-header-styled="data-header-styled">
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Destination Address"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header" data-field="DestinationProtocol.Name" data-index="1" data-resizable="true" data-title="Destination Protocol" id="0d8011e5-fb95-4d47-83cb-940428079866" role="columnheader" scope="col" data-header-styled="data-header-styled">
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Destination Protocol"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header" data-field="ContactName" data-index="2" data-resizable="true" data-title="Contact Name" id="4f5961b1-4ca1-4813-b940-bcb65ca95e74" role="columnheader" scope="col" data-header-styled="data-header-styled">
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Contact Name"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header" data-field="Status" data-index="3" data-resizable="true" data-title="Status" id="a69a1442-d16a-4a7e-ad9c-da104b2a82ac" role="columnheader" scope="col" data-header-styled="data-header-styled">
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Status"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="Active" data-index="4" data-resizable="true" data-title="Active" id="475015f3-df0c-4d3a-845f-c37fb2440b67" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Active"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="ContactPhone" data-index="5" data-resizable="true" data-title="Contact Phone" id="777b372a-efa5-4ef0-a235-52b3df2babd3" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Contact Phone"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="ContactEmail" data-index="6" data-resizable="true" data-title="Contact Email" id="b338eae3-3e55-432a-87ba-89c7ed81aef3" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Contact Email"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="OverwriteAtDestination" data-index="7" data-resizable="true" data-title="Overwrite At Destination" id="27640246-cd5d-43dd-bea4-2f6732c86676" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Overwrite At Destination"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="CompressAtDestination" data-index="8" data-resizable="true" data-title="Compress At Destination" id="19fc77dc-b29a-48f3-96b1-796a839bcff7" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Compress At Destination"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="DestinationIsArchive" data-index="9" data-resizable="true" data-title="Destination Is Archive" id="434f909e-daff-4d6b-95aa-1df3849a4f0e" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Destination Is Archive"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="RenameAtDestination" data-index="10" data-resizable="true" data-title="Rename At Destination" id="5d8892a2-f3b3-41e6-ae41-f0663ab0ceef" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Rename At Destination"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="RenamePattern" data-index="11" data-resizable="true" data-title="Rename Pattern" id="782985de-3932-436f-b264-42fe81e1a9af" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Rename Pattern"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="FTPServer" data-index="12" data-resizable="true" data-title="Server" id="17ad0f15-5e83-4793-a54d-6e37f998af12" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Server"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="DestinationId" data-index="13" data-resizable="true" data-title="Destination Id" id="bf657cc1-e60f-4099-8fb2-e0797c0b9a67" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Destination Id"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="DestinationLineNumber" data-index="14" data-resizable="true" data-title="Destination Line Number" id="7920811f-ca0a-46d7-b58e-9c6c2d067735" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Destination Line Number"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="IsAddedUpdated" data-index="15" data-resizable="true" data-title="Is Added Updated" id="90a41fb0-c646-48f8-aa39-acb54c627202" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Is Added Updated"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="FTEMetadataId" data-index="16" data-resizable="true" data-title="FTE Metadata" id="56214bf3-a3da-4442-adc7-520d27c5a107" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"FTE Metadata"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="ContractName" data-index="17" data-resizable="true" data-title="FTE Module Contract" id="8288fe5f-562b-4dd5-aeda-959b0658b643" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"FTE Module Contract"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        <th className="k-table-th k-header k-hidden" data-field="DestinationType" data-index="18" data-resizable="true" data-title="Destination Type" id="8804d036-598a-4398-833d-5164d440ae41" role="columnheader" scope="col" data-header-styled="data-header-styled" style={{"display": "none"}}>
                                          <span className="k-cell-inner">
                                            <span className="grid-col-hdr-cell">
                                              <span className="k-link">
                                                <span className="k-column-title">{"Destination Type"}</span>
                                                </span>
                                              </span>
                                            </span>
                                          </th>
                                        </tr>
                                      </thead>
                                    </table>
                                  </div>
                                </div>
                              <div className="k-grid-container">
                                <div className="k-grid-content k-auto-scrollable" style={{"height": "200px"}}>
                                  <table id="d89d8cff-9b45-4bbe-a1a4-3e2f4cc928e1" role="grid" tabIndex={0} className="k-grid-table k-table k-selectable" data-role="selectable" aria-owns="b55e20e4-e84d-4b30-95bb-2fab86633f45 8fe01863-3236-4e9c-beb6-c3cd9ee1f9b4 ">
                                    <colgroup>
                                      <col />
                                      <col />
                                      <col />
                                      <col style={{"width": "75px"}} />
                                      </colgroup>
                                    <tbody className="k-table-tbody" id="8fe01863-3236-4e9c-beb6-c3cd9ee1f9b4" role="rowgroup">
                                      <tr className="kendo-data-row">
                                        <td colSpan={19} style={{"textAlign": "center"}}>
                                          <br />
                                          <strong>{"There are no records found."}</strong>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  <div className="k-grid-content-expander" style={{"width": "1386.67px"}}></div>
                                  </div>
                                </div>
                              <div aria-controls="d89d8cff-9b45-4bbe-a1a4-3e2f4cc928e1" className="k-pager k-grid-pager k-pager-responsive" data-role="pager" aria-label="Page navigation, page 0 of 0" role="application" aria-roledescription="pager" aria-keyshortcuts="Enter ArrowRight ArrowLeft" id="fd3b250a-0250-45e7-9aa6-b3877134f9d5" tabIndex={0}>
                                <div className="k-pager-numbers-wrap">
                                  <button aria-label="Go to the first page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled k-pager-first" data-page="1" title="Go to the first page" tabIndex={-1} aria-disabled="true">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-to-left k-button-icon">
                                      <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                        <path d="M352 384 160 256l192-128zM128 128v256h32V128z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <button aria-label="Go to the previous page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled" data-page="1" title="Go to the previous page" tabIndex={-1} aria-disabled="true">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-left k-button-icon">
                                      <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                        <path d="m160 256 192-128v256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <div className="k-pager-numbers">
                                    <button role="button" aria-current="page" tabIndex={0} aria-label="Page 0" className="k-button  k-button-flat k-button-primary k-selected">
                                      <span className="k-button-text">{"0"}</span>
                                      </button>
                                    </div>
                                  <button aria-label="Go to the next page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled" data-page="0" title="Go to the next page" tabIndex={-1} aria-disabled="true">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-right k-button-icon">
                                      <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                        <path d="M352 256 160 384V128z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <button aria-label="Go to the last page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled k-pager-last" data-page="0" title="Go to the last page" tabIndex={-1} aria-disabled="true">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-to-right k-button-icon">
                                      <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                        <path d="m128 128 192 128-192 128zm224 256V128h-32v256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <span className="k-pager-input" style={{"display": "none"}}>
                                    <span>
                                      <span>{"Page"}</span>
                                      </span>
                                    <span className="k-numerictextbox k-input k-disabled" style={{}}>
                                      <input type="text" data-validate="false" title="" tabIndex={0} className="k-input-inner" role="spinbutton" aria-valuemin="1" autoComplete="off" aria-disabled="true" aria-label="Page" disabled={true} style={{}} />
                                      <input aria-label="Page" data-role="numerictextbox" role="spinbutton" className="k-input-inner" inputMode="text" type="text" aria-valuemin="1" aria-disabled="true" disabled={true} style={{"display": "none"}} />
                                      <span className="k-icon k-svg-icon k-svg-i-exclamation-circle k-input-validation-icon k-hidden">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M224 128h64v160h-64zm0 256h64v-64h-64zm256-128c0 123.7-100.3 224-224 224S32 379.7 32 256 132.3 32 256 32s224 100.3 224 224m-32 0c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192" />
                                          </svg>
                                        </span>
                                      </span>
                                    <span>
                                      <span>{"of 0"}</span>
                                      </span>
                                    </span>
                                  </div>
                                <a aria-label="Refresh" className="k-pager-refresh k-button k-button-flat k-icon-button" href="/FileTransfer/FileTransferConfigurationEdit?subdomain=uximc&amp;isPanel=1" title="Refresh" data-role="tooltip" data-kit-tip="Refresh" data-kit-tip-pos="top" data-kit-tip-after="250">
                                  <span className="k-icon k-svg-icon k-svg-i-arrow-rotate-cw k-button-icon">
                                    <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                      <path d="M480 288c0 123.7-100.3 224-224 224S32 411.7 32 288 132.3 64 256 64V0l160 96-160 96v-64c-88.2 0-160 71.8-160 160s71.8 160 160 160 160-71.8 160-160c0-29.1-7.8-56.4-21.5-80l55.5-32c19.1 32.9 30 71.2 30 112" />
                                      </svg>
                                    </span>
                                  </a>
                                <span className="k-pager-info">{"No Items to display"}</span>
                                <span className="k-pager-sizes">
                                  <span title="" className="k-picker k-dropdownlist" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-label="Page sizes drop down" aria-disabled="false" aria-readonly="false" aria-controls="5c727492-3b45-4f0a-9546-311dc4352d29_listbox" aria-busy="false" aria-describedby="28538732-4bde-4777-9462-cccd5a6d0982" style={{}}>
                                    <span id="28538732-4bde-4777-9462-cccd5a6d0982" unselectable="on" className="k-input-inner">
                                      <span className="k-input-value-text">{"10"}</span>
                                      </span>
                                    <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M256 352 128 160h256z" />
                                          </svg>
                                        </span>
                                      </button>
                                    <select defaultValue="10" aria-label="Page sizes drop down" data-role="dropdownlist" style={{"display": "none"}}>
                                      <option value="5">{"5"}</option>
                                      <option value="10">{"10"}</option>
                                      <option value="20">{"20"}</option>
                                      </select>
                                    </span>
                                  <span>{"Items per page"}</span>
                                  </span>
                                </div>
                              </div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}<div className="clear-n-pad"></div>{" "}<div id="FileTransferConfigurationEditButtons">
                    <div id="FileTransferConfigurationEditFormButtonRow" className="editor-button-row">
                      <input id="FileTransferConfigurationEditFormResetButton" type="button" value="Reset" className="k-button btn-spacer-right" data-kit-action="reset" />
                      <span className="editor-button-nav">
                        <input id="FileTransferConfigurationEditFormCancelButton" type="button" value="Cancel" className="cancel k-button btn-spacer-left" data-kit-action="cancel" />
                        <input id="FileTransferConfigurationEditFormSaveButton" type="button" value="Save" className="k-button btn-spacer-left primary-button" data-kit-action="save" />
                        </span>
                      </div>
                    </div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="">{" "}<div id="divDestinationId" data-kit-h="h24" style={{"display": "none"}}>{" "}<div className="row">{" "}<input name="__RequestVerificationToken" type="hidden" defaultValue="cEekNrc5q_J6IVbM40hTahlK9On_VYZ2VeiYkzNU3F6T69O5C0SzGro6E1TB22b3qYtV7ceVhQnh51_JHzXRp77Bh2jJnWex8WXRy9xaSclHPDajQB6zCe4t6H5j2gxFB4Zzt-YfVE8hQYPFGyohyg2" />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="panel-body">{" "}<div id="DestinationConfigurationEditFormStatus"></div>{" "}<div className="editor-section">{" "}<fieldset>{" "}<label id="appSettingLabel" htmlFor="appSetting" className="display-none">{"appSetting"}</label>
                        <input id="appSetting" name="appSetting" type="hidden" defaultValue="\\\\wtstpmmsmcbch1.pg.gtdsd.com\\MedicaidFileShare\\Integration\\FTECommonFolder" aria-labelledby="appSettingLabel" />{" "}<div className="col-md-3 editor-col" id="DestinationProtocolList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <span className="clickable editor-req-field fa-solid fa-asterisk" title="Destination Protocol is a required field." data-role="tooltip" data-kit-tip="Destination Protocol is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <label htmlFor="DestinationProtocol" id="DestinationProtocolLabel" title="Destination Protocol">{"Destination Protocol"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="DestinationProtocolHelp" role="img" title="Destination Protocol" data-role="tooltip" data-kit-tip="Destination Protocol" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control k-focus" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="DestinationProtocolList_listbox" aria-busy="false" aria-describedby="32068bb4-1dc6-491d-a948-03d93e4b7f93" style={{}} aria-labelledby="DestinationProtocolLabel DestinationProtocolHelpDesc" data-kit="k13">
                              <span id="32068bb4-1dc6-491d-a948-03d93e4b7f93" unselectable="on" className="k-input-inner">
                                <span className="k-input-value-text">{"select a value..."}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="DestinationProtocolListLabel" htmlFor="DestinationProtocolList" className="display-none">{"DestinationProtocolList"}</label>
                              <input className="editor-control" data-val="true" data-val-required="Destination Protocol is a required field." id="DestinationProtocolList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.ProtocolType" listviewdisplayformat="Name" name="DestinationProtocolList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-DestinationProtocol" type="text" data-role="dropdownlist" aria-labelledby="DestinationProtocolListLabel" style={{"display": "none"}} />
                              </span>{" "}<label id="DestinationProtocol_IDLabel" htmlFor="DestinationProtocol_ID" className="display-none">{"DestinationProtocol_ID"}</label>
                            <input id="DestinationProtocol_ID" name="DestinationProtocol.ID" type="hidden" defaultValue="" aria-labelledby="DestinationProtocol_IDLabel" />{" "}<label id="DestinationProtocol_NameLabel" htmlFor="DestinationProtocol_Name" className="display-none">{"DestinationProtocol_Name"}</label>
                            <input id="DestinationProtocol_Name" name="DestinationProtocol.Name" type="hidden" defaultValue="" aria-labelledby="DestinationProtocol_NameLabel" />{" "}<label id="DestinationProtocol_DisplayFormatLabel" htmlFor="DestinationProtocol_DisplayFormat" className="display-none">{"DestinationProtocol_DisplayFormat"}</label>
                            <input id="DestinationProtocol_DisplayFormat" name="DestinationProtocol.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="DestinationProtocol_DisplayFormatLabel" />
                            <span className="k-invalid-msg" id="DestinationProtocolList_validationMessage" data-for="DestinationProtocolList"></span>
                            <span id="DestinationProtocolHelpDesc" hidden={true}>{"Destination Protocol"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="divFTPId" style={{"display": "none"}}>{" "}<div className="editor-label">{" "}<span className="clickable editor-req-field fa-solid fa-asterisk" title="Server is a required field." data-role="tooltip" data-kit-tip="Server is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <label htmlFor="col-md-3 editor-colFTPServer" id="col-md-3 editor-colFTPServerLabel" title="Server">{"Server"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="col-md-3_editor-colFTPServerHelp" role="img" title="Server" data-role="tooltip" data-kit-tip="Server" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{" "}<div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="FTPServer_listbox" aria-labelledby="col-md-3 editor-colFTPServerLabel col-md-3_editor-colFTPServerHelpDesc" aria-busy="false" data-kit="k14" style={{}}>
                              <span id="4047e1a7-cabb-4583-ae3c-3835b19398be" unselectable="on" className="k-input-inner">
                                <span className="k-input-value-text">{"select a value..."}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="FTPServerLabel" htmlFor="FTPServer" className="display-none">{"Server"}</label>
                              <input className="editor-control" data-val="true" id="FTPServer" ignoredirtydata="False" listviewdatalistcontentid="" listviewdisplayformat="Name" name="FTPServer" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-FTPServer" type="text" data-role="dropdownlist" not-data-val-required="Server is a required field." aria-labelledby="FTPServerLabel" style={{"display": "none"}} />
                              </span>{" "}<span id="col-md-3_editor-colFTPServerHelpDesc" hidden={true}>{"Server"}</span>
                            </div>{" "}</div>{" "}<div className="col-md-3 editor-col" id="DestinationTypeList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <span className="clickable editor-req-field fa-solid fa-asterisk" title="Destination Type is a required field." data-role="tooltip" data-kit-tip="Destination Type is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <label htmlFor="DestinationType" id="DestinationTypeLabel" title="Destination Type">{"Destination Type"}</label>
                            </div>
                          <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="DestinationTypeList_listbox" aria-busy="false" aria-describedby="a399768a-924c-4f4f-8625-ee46dae67633" style={{}} aria-labelledby="DestinationTypeLabel" data-kit="k15">
                              <span id="a399768a-924c-4f4f-8625-ee46dae67633" unselectable="on" className="k-input-inner">
                                <span className="k-input-value-text">{"select a value..."}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="DestinationTypeListLabel" htmlFor="DestinationTypeList" className="display-none">{"DestinationTypeList"}</label>
                              <input className="editor-control" data-val="true" data-val-required="Destination Type is a required field." id="DestinationTypeList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.DestinationType" listviewdisplayformat="Name" name="DestinationTypeList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-DestinationType" type="text" data-role="dropdownlist" aria-labelledby="DestinationTypeListLabel" style={{"display": "none"}} />
                              </span>{" "}<label id="DestinationType_IDLabel" htmlFor="DestinationType_ID" className="display-none">{"DestinationType_ID"}</label>
                            <input id="DestinationType_ID" name="DestinationType.ID" type="hidden" defaultValue="" aria-labelledby="DestinationType_IDLabel" />{" "}<label id="DestinationType_NameLabel" htmlFor="DestinationType_Name" className="display-none">{"DestinationType_Name"}</label>
                            <input id="DestinationType_Name" name="DestinationType.Name" type="hidden" defaultValue="" aria-labelledby="DestinationType_NameLabel" />{" "}<label id="DestinationType_DisplayFormatLabel" htmlFor="DestinationType_DisplayFormat" className="display-none">{"DestinationType_DisplayFormat"}</label>
                            <input id="DestinationType_DisplayFormat" name="DestinationType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="DestinationType_DisplayFormatLabel" />
                            <span className="k-invalid-msg" id="DestinationTypeList_validationMessage" data-for="DestinationTypeList"></span>
                            </div>
                          </div>{" "}<div id="divDestinationAddress">{" "}<div className="col-md-3 editor-col" id="DestinationAddress_parent" data-template="Text">
                            <div className="editor-label">
                              <span className="clickable editor-req-field fa-solid fa-asterisk" title="Destination Address is a required field." data-role="tooltip" data-kit-tip="Destination Address is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <label htmlFor="DestinationAddress" id="DestinationAddressLabel" title="Destination Address">{"Destination Address"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="DestinationAddressHelp" role="img" title="Destination Address" data-role="tooltip" data-kit-tip="Destination Address" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                                <input className="editor-control k-input-inner" data-val="true" data-val-length-max="Destination Address has a maximum length of 248 characters." data-val-required="Destination Address is a required field." id="DestinationAddress" ignoredirtydata="False" maxLength={248} name="DestinationAddress" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="DestinationAddressLabel DestinationAddressHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="DestinationAddress_validationMessage" data-for="DestinationAddress"></span>
                              <span id="DestinationAddressHelpDesc" hidden={true}>{"Destination Address"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div id="divContractName" style={{"display": "none"}}>{" "}<div className="col-md-3 editor-col" id="ContractNameList_parent" data-template="ListItemSingle">
                            <div className="editor-label">
                              <label htmlFor="ContractName" id="ContractNameLabel" title="FTE Module Contract">{"FTE Module Contract"}</label>
                              </div>
                            <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="ContractNameList_listbox" aria-busy="false" aria-describedby="74322b3c-67ff-4757-b5b9-c983763c7f13" style={{}} aria-labelledby="ContractNameLabel" data-kit="k16">
                                <span id="74322b3c-67ff-4757-b5b9-c983763c7f13" unselectable="on" className="k-input-inner">
                                  <span className="k-input-value-text">{"select a value..."}</span>
                                  </span>
                                <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                  <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M256 352 128 160h256z" />
                                      </svg>
                                    </span>
                                  </button>
                                <label id="ContractNameListLabel" htmlFor="ContractNameList" className="display-none">{"ContractNameList"}</label>
                                <input className="editor-control" data-val="true" id="ContractNameList" ignoredirtydata="False" listviewdatalistcontentid="Integration.DataList.HPPContractAssemblies" listviewdisplayformat="Name" name="ContractNameList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-ContractName" type="text" data-role="dropdownlist" aria-labelledby="ContractNameListLabel" style={{"display": "none"}} not-data-val-required="FTE Module Contract is a required field." />
                                </span>{" "}<label id="ContractName_IDLabel" htmlFor="ContractName_ID" className="display-none">{"ContractName_ID"}</label>
                              <input id="ContractName_ID" name="ContractName.ID" type="hidden" defaultValue="" aria-labelledby="ContractName_IDLabel" />{" "}<label id="ContractName_NameLabel" htmlFor="ContractName_Name" className="display-none">{"ContractName_Name"}</label>
                              <input id="ContractName_Name" name="ContractName.Name" type="hidden" defaultValue="" aria-labelledby="ContractName_NameLabel" />{" "}<label id="ContractName_DisplayFormatLabel" htmlFor="ContractName_DisplayFormat" className="display-none">{"ContractName_DisplayFormat"}</label>
                              <input id="ContractName_DisplayFormat" name="ContractName.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="ContractName_DisplayFormatLabel" />
                              <span className="k-invalid-msg" id="ContractNameList_validationMessage" data-for="ContractNameList"></span>
                              </div>
                            </div>{" "}</div>{" "}<div className="col-md-3 editor-col" id="divFTEMetadataId" style={{"display": "none"}}>{" "}<div className="editor-label">{" "}<span className="clickable editor-req-field fa-solid fa-asterisk" title="FTE Metadata is a required field." data-role="tooltip" data-kit-tip="FTE Metadata is a required field." data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <label htmlFor="col-md-3 editor-colFTEMetadataId" id="col-md-3 editor-colFTEMetadataIdLabel" title="FTE Metadata">{"FTE Metadata"}</label>{" "}</div>{" "}<div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="FTEMetadataId_listbox" aria-busy="false" aria-describedby="56d2582a-1f0b-4b33-9ab6-7263ef6aa28a" aria-labelledby="col-md-3 editor-colFTEMetadataIdLabel" style={{}} data-kit="k17">
                              <span id="56d2582a-1f0b-4b33-9ab6-7263ef6aa28a" unselectable="on" className="k-input-inner">
                                <span className="k-input-value-text">{"select a value..."}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="FTEMetadataIdLabel" htmlFor="FTEMetadataId" className="display-none">{"FTEMetadataId"}</label>
                              <input className="editor-control" data-val="true" data-val-length-max="FTE Metadata has a maximum length of 248 characters." id="FTEMetadataId" ignoredirtydata="False" maxLength={248} name="FTEMetadataId" type="text" data-role="dropdownlist" aria-labelledby="FTEMetadataIdLabel" style={{"display": "none"}} not-data-val-required="FTE Metadata is a required field." />
                              </span>{" "}</div>{" "}</div>{" "}<label id="updateDestinationIdLabel" htmlFor="updateDestinationId" className="display-none">{"updateDestinationId"}</label>
                        <input type="hidden" id="updateDestinationId" aria-labelledby="updateDestinationIdLabel" />{" "}<label id="updateDestinationLineNumberLabel" htmlFor="updateDestinationLineNumber" className="display-none">{"updateDestinationLineNumber"}</label>
                        <input type="hidden" id="updateDestinationLineNumber" aria-labelledby="updateDestinationLineNumberLabel" />{" "}<div className="editor-clear" id="divInstructions" style={{"display": "none"}}>{" "}<b>
                            <p>{"Inbound file will be moved to an internal directory for FTE to process"}</p>
                            </b>{" "}<br />{" "}</div>{" "}<div className="col-md-3 editor-col editor-clear" id="ContactName_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="ContactName" id="ContactNameLabel" title="Contact Name">{"Contact Name"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ContactNameHelp" role="img" title="Contact Name" data-role="tooltip" data-kit-tip="Contact Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-val-length-max="Contact Name has a maximum length of 50 characters." data-val-regex="Contact Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="ContactName" ignoredirtydata="False" maxLength={50} name="ContactName" not-data-val-required="Contact Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="ContactNameLabel ContactNameHelpDesc" style={{"width": "100%"}} />
                              </span>{" "}<span className="k-invalid-msg" id="ContactName_validationMessage" data-for="ContactName"></span>
                            <span id="ContactNameHelpDesc" hidden={true}>{"Contact Name"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="ContactPhone_parent" data-template="PhoneNumberUS">
                          <div className="editor-label">
                            <label htmlFor="ContactPhone" id="ContactPhoneLabel" title="Contact Phone">{"Contact Phone"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ContactPhoneHelp" role="img" title="Contact Phone" data-role="tooltip" data-kit-tip="Contact Phone" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-maskedtextbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner k-widget" data-val-length-max="Contact Phone has a maximum length of 50 characters." data-val-regex="Enter Valid Phone Number." data-val-regex-pattern="^(?!(^\\(?(0{3})\\)?( |-|\\.)?0{3}( |-|\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( |-|\\.)?\\d{3,3}( |-|\\.)?\\d{4,4}$)" id="ContactPhone" ignoredirtydata="False" name="ContactPhone" not-data-val-required="Contact Phone is a required field." data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="000-000-0000" aria-labelledby="ContactPhoneLabel ContactPhoneHelpDesc" style={{"width": "100%"}} />
                              </span>
                            <span className="k-invalid-msg" id="ContactPhone_validationMessage" data-for="ContactPhone"></span>
                            <span id="ContactPhoneHelpDesc" hidden={true}>{"Contact Phone"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="ContactEmail_parent" data-template="">
                          <div className="editor-label">
                            <label htmlFor="ContactEmail" id="ContactEmailLabel" title="Contact Email">{"Contact Email"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ContactEmailHelp" role="img" title="Contact Email" data-role="tooltip" data-kit-tip="Contact Email" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-textbox editor-control" style={{}}>
                              <input className="editor-control k-input-inner" data-email-msg="Contact Email is not a valid email address. Enter email with 'name@domain' format." data-val-length-max="Contact Email has a maximum length of 50 characters." data-val-regex="Contact Email is not a valid email address. Enter email with 'name@domain' format." data-val-regex-pattern="^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$" id="ContactEmail" ignoredirtydata="False" maxLength={50} name="ContactEmail" not-data-val-required="Contact Email is a required field." type="text" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="ContactEmailLabel ContactEmailHelpDesc" style={{"width": "100%"}} />
                              </span>
                            <span className="k-invalid-msg" id="ContactEmail_validationMessage" data-for="ContactEmail"></span>
                            <span id="ContactEmailHelpDesc" hidden={true}>{"Contact Email"}</span>
                            </div>
                          </div>{" "}<div className="editor-clear" id="divOverwriteAtDestination">{" "}<div className="col-md-3 editor-col editor-clear" id="OverwriteAtDestination_parent">
                            <div className="editor-label">
                              <label>{" "}</label>
                              </div>
                            <div className="editor-field assoc-box-checkbox">
                              <span className="k-checkbox-wrap">
                                <input className="editor-control k-checkbox" data-role="checkbox" id="OverwriteAtDestination" ignoredirtydata="False" name="OverwriteAtDestination" not-data-val-required="Overwrite At Destination is a required field." type="checkbox" defaultValue="true" aria-describedby="OverwriteAtDestinationHelpDesc" style={{}} />
                                </span>
                              <label htmlFor="OverwriteAtDestination" className="k-checkbox-label" style={{}}>{"Overwrite At Destination"}</label>
                              <input name="OverwriteAtDestination" type="hidden" defaultValue="false" />
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="OverwriteAtDestinationHelp" role="img" title="Overwrite At Destination" data-role="tooltip" data-kit-tip="Overwrite At Destination" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <span className="k-invalid-msg" id="OverwriteAtDestination_validationMessage" data-for="OverwriteAtDestination"></span>
                              <span id="OverwriteAtDestinationHelpDesc" hidden={true}>{"Overwrite At Destination"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div id="divCompressAtDestination">{" "}<div className="col-md-3 editor-col" id="CompressAtDestination_parent">
                            <div className="editor-label">
                              <label>{" "}</label>
                              </div>
                            <div className="editor-field assoc-box-checkbox">
                              <span className="k-checkbox-wrap">
                                <input className="editor-control k-checkbox" data-role="checkbox" id="CompressAtDestination" ignoredirtydata="False" name="CompressAtDestination" not-data-val-required="Compress At Destination is a required field." type="checkbox" defaultValue="true" aria-describedby="CompressAtDestinationHelpDesc" style={{}} />
                                </span>
                              <label htmlFor="CompressAtDestination" className="k-checkbox-label" style={{}}>{"Compress At Destination"}</label>
                              <input name="CompressAtDestination" type="hidden" defaultValue="false" />
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="CompressAtDestinationHelp" role="img" title="Compress At Destination" data-role="tooltip" data-kit-tip="Compress At Destination" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <span className="k-invalid-msg" id="CompressAtDestination_validationMessage" data-for="CompressAtDestination"></span>
                              <span id="CompressAtDestinationHelpDesc" hidden={true}>{"Compress At Destination"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div id="divDestinationIsArchive">{" "}<div className="col-md-3 editor-col" id="DestinationIsArchive_parent">
                            <div className="editor-label">
                              <label>{" "}</label>
                              </div>
                            <div className="editor-field assoc-box-checkbox">
                              <span className="k-checkbox-wrap">
                                <input className="editor-control k-checkbox" data-role="checkbox" id="DestinationIsArchive" ignoredirtydata="False" name="DestinationIsArchive" not-data-val-required="Destination Is Archive is a required field." type="checkbox" defaultValue="true" aria-describedby="DestinationIsArchiveHelpDesc" style={{}} />
                                </span>
                              <label htmlFor="DestinationIsArchive" className="k-checkbox-label" style={{}}>{"Destination Is Archive"}</label>
                              <input name="DestinationIsArchive" type="hidden" defaultValue="false" />
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="DestinationIsArchiveHelp" role="img" title="Destination Is Archive" data-role="tooltip" data-kit-tip="Destination Is Archive" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <span className="k-invalid-msg" id="DestinationIsArchive_validationMessage" data-for="DestinationIsArchive"></span>
                              <span id="DestinationIsArchiveHelpDesc" hidden={true}>{"Destination Is Archive"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div id="divRenameAtDestination">{" "}<div className="col-md-3 editor-col editor-clear" id="RenameAtDestination_parent">
                            <div className="editor-label">
                              <label>{" "}</label>
                              </div>
                            <div className="editor-field assoc-box-checkbox">
                              <span className="k-checkbox-wrap">
                                <input className="editor-control k-checkbox" data-role="checkbox" id="RenameAtDestination" ignoredirtydata="False" name="RenameAtDestination" not-data-val-required="Rename At Destination is a required field." type="checkbox" defaultValue="true" aria-describedby="RenameAtDestinationHelpDesc" style={{}} />
                                </span>
                              <label htmlFor="RenameAtDestination" className="k-checkbox-label" style={{}}>{"Rename At Destination"}</label>
                              <input name="RenameAtDestination" type="hidden" defaultValue="false" />
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RenameAtDestinationHelp" role="img" title="Rename At Destination" data-role="tooltip" data-kit-tip="Rename At Destination" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              <span className="k-invalid-msg" id="RenameAtDestination_validationMessage" data-for="RenameAtDestination"></span>
                              <span id="RenameAtDestinationHelpDesc" hidden={true}>{"Rename At Destination"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div id="divRenamePatternId" style={{"display": "none"}}>{" "}<div className="col-md-3 editor-col" id="RenamePatternList_parent" data-template="ListItemSingle">
                            <div className="editor-label">
                              <label htmlFor="RenamePattern" id="RenamePatternLabel" title="Rename Pattern">{"Rename Pattern"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="RenamePatternHelp" role="img" title="Rename Pattern" data-role="tooltip" data-kit-tip="Rename Pattern" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span title="" className="k-picker k-dropdownlist editor-control" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="false" aria-controls="RenamePatternList_listbox" aria-busy="false" aria-describedby="4ea49677-e67b-467c-982c-bc80fc0b0631" style={{}} aria-labelledby="RenamePatternLabel RenamePatternHelpDesc" data-kit="k18">
                                <span id="4ea49677-e67b-467c-982c-bc80fc0b0631" unselectable="on" className="k-input-inner">
                                  <span className="k-input-value-text">{"select a value..."}</span>
                                  </span>
                                <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                  <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                                    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M256 352 128 160h256z" />
                                      </svg>
                                    </span>
                                  </button>
                                <label id="RenamePatternListLabel" htmlFor="RenamePatternList" className="display-none">{"RenamePatternList"}</label>
                                <input className="editor-control" data-val="true" data-val-length-max="Rename Pattern has a maximum length of 50 characters." id="RenamePatternList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.RenamePattern" listviewdisplayformat="Name" maxLength={50} name="RenamePatternList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationEdit-Desktop-RenamePattern" type="text" data-role="dropdownlist" aria-labelledby="RenamePatternListLabel" style={{"display": "none"}} not-data-val-required="Rename Pattern is a required field." />
                                </span>{" "}<label id="RenamePattern_IDLabel" htmlFor="RenamePattern_ID" className="display-none">{"RenamePattern_ID"}</label>
                              <input id="RenamePattern_ID" name="RenamePattern.ID" type="hidden" defaultValue="" aria-labelledby="RenamePattern_IDLabel" />{" "}<label id="RenamePattern_NameLabel" htmlFor="RenamePattern_Name" className="display-none">{"RenamePattern_Name"}</label>
                              <input id="RenamePattern_Name" name="RenamePattern.Name" type="hidden" defaultValue="" aria-labelledby="RenamePattern_NameLabel" />{" "}<label id="RenamePattern_DisplayFormatLabel" htmlFor="RenamePattern_DisplayFormat" className="display-none">{"RenamePattern_DisplayFormat"}</label>
                              <input id="RenamePattern_DisplayFormat" name="RenamePattern.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="RenamePattern_DisplayFormatLabel" />
                              <span className="k-invalid-msg" id="RenamePatternList_validationMessage" data-for="RenamePatternList"></span>
                              <span id="RenamePatternHelpDesc" hidden={true}>{"Rename Pattern"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div className="col-md-3 editor-col" id="Active_parent">
                          <div className="editor-label">
                            <label>{" "}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox">
                            <span className="k-checkbox-wrap">
                              <input className="editor-control k-checkbox" data-role="checkbox" id="Active" ignoredirtydata="False" name="Active" not-data-val-required="Active is a required field." type="checkbox" defaultValue="true" aria-describedby="ActiveHelpDesc" style={{}} />
                              </span>
                            <label htmlFor="Active" className="k-checkbox-label" style={{}}>{"Active"}</label>
                            <input name="Active" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="ActiveHelp" role="img" title="Active" data-role="tooltip" data-kit-tip="Active" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="Active_validationMessage" data-for="Active"></span>
                            <span id="ActiveHelpDesc" hidden={true}>{"Active"}</span>
                            </div>
                          </div>{" "}<div className="clear-n-pad"></div>{" "}<div id="DestinationConfigurationEditButtons">
                          <div id="DestinationConfigurationEditFormButtonRow" className="editor-button-row">
                            <input id="DestinationResetButton" type="button" value="Reset" className="cancel k-button btn-spacer-right" data-kit-action="reset" />
                            <input id="DestinationRemoveButton" type="button" value="Remove" className="cancel k-button btn-spacer-right" style={{"display": "none"}} />
                            <input id="CreateFromExisting" type="button" value="Create from Existing" className="cancel k-button btn-spacer-right" style={{}} data-kit-action="create" />
                            <span className="editor-button-nav">
                              <input id="DestinationCancelButton" type="button" value="Cancel" className="cancel k-button btn-spacer-left" data-kit-action="cancel" />
                              <input id="AddAnotherButton" type="button" value="Add Another" className="cancel k-button btn-spacer-left" />
                              <input id="SaveAndCloseButton" type="button" value="Save" className="cancel k-button btn-spacer-left primary-button" data-kit-action="save" />
                              <input id="UpdateAndCloseButton" type="button" value="Save" className="cancel k-button btn-spacer-left primary-button" data-kit-action="save" style={{"display": "none"}} />
                              </span>
                            </div>
                          </div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>
      </form>{" "}</div>{" "}</div></>
  );
}
