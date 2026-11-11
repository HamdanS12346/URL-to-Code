// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Dialog d2 "View File Transfer Configuration" of fxfer-v3/file-transfer-configuration: ported from packs/fxfer-v3/screens/file-transfer-configuration/kit/dialogs/d2.html.
export default function DialogD2() {
  return (
    <><div id="FileTransferConfigurationViewOverlay_content" className="loading">{" "}<div id="FileTransferConfigurationViewOverlay_body">{" "}<form action="/FileTransfer/FileTransferConfigurationView" id="FileTransferConfigurationViewForm" method="post" name="FileTransferConfigurationViewForm" data-role="validator" noValidate={true}>
      <input name="__RequestVerificationToken" type="hidden" defaultValue="sGNC5mMzCgd--cHilWgybRIA5VEOjheL42vX8Y8taC1tDntyATMXzcX466Yoaq4zpaNtkb0CXeufuN4c8Ej1_-3IV-iGVdoBpBVpAvFAzEZKL5hW8rfuP1XDmaNA5Yw3KA9aGGtwKS9L1qqCbD8bmw2" />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="">{" "}<div className="">{" "}<div className="panel-body-modal">{" "}<div className="editor-section">{" "}<fieldset>{" "}<div id="divFileTransferConfigurationView">{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                                    Source Configuration\n                                "}</div>{" "}<div className="content-panel-bdy panel-body col-md-12 assoc-box editor-section row">{" "}<div className="col-md-3 editor-col" id="eft_ConfigName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_ConfigName" id="eft_ConfigNameLabel" readOnly={true} className="readonly-label" title="Configuration Name">{"Configuration Name"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_ConfigNameHelp" role="img" title="Configuration Name" data-role="tooltip" data-kit-tip="Configuration Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget readonly-widget-focus" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Configuration Name has a maximum length of 50 characters." data-val-regex="Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" data-val-required="Configuration Name is a required field." height="0" id="eft_ConfigName" ignoredirtydata="False" maxLength={50} name="ConfigName" defaultValue="Test" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_ConfigNameLabel eft_ConfigNameHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_ConfigName_validationMessage" data-for="eft_ConfigName"></span>
                          <span id="eft_ConfigNameHelpDesc" hidden={true}>{"Configuration Name"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_Description_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_Description" id="eft_DescriptionLabel" readOnly={true} className="readonly-label" title="Description">{"Description"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_DescriptionHelp" role="img" title="Description" data-role="tooltip" data-kit-tip="Description" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Description has a maximum length of 200 characters." height="0" id="eft_Description" ignoredirtydata="False" maxLength={200} name="Description" not-data-val-required="Description is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_DescriptionLabel eft_DescriptionHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_Description_validationMessage" data-for="eft_Description"></span>
                          <span id="eft_DescriptionHelpDesc" hidden={true}>{"Description"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_ProtocolTypeList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="eft_ProtocolType" id="eft_ProtocolTypeLabel" readOnly={true} className="readonly-label" title="Protocol">{"Protocol"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_ProtocolTypeHelp" role="img" title="Protocol" data-role="tooltip" data-kit-tip="Protocol" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <label id="ProtocolTypeListTextLabel" htmlFor="ProtocolTypeListText" className="display-none">{"ProtocolTypeListText"}</label>
                          <input readOnly={true} className="k-textbox editor-control" id="ProtocolTypeListText" name="ProtocolTypeListText" defaultValue="FTP" aria-labelledby="eft_ProtocolTypeLabel" />
                          <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="eft_ProtocolTypeList_listbox" aria-busy="false" aria-describedby="0e6e588f-f27a-4a9d-b396-910249431c43" aria-labelledby="eft_ProtocolTypeLabel eft_ProtocolTypeHelpDesc" data-kit="k19" style={{}}>
                              <span id="0e6e588f-f27a-4a9d-b396-910249431c43" unselectable="on" className="k-input-inner readonly-widget">
                                <span className="k-input-value-text">{"FTP"}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="eft_ProtocolTypeListLabel" htmlFor="eft_ProtocolTypeList" className="display-none">{"eft_ProtocolTypeList"}</label>
                              <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Protocol is a required field." height="0" id="eft_ProtocolTypeList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.ProtocolType" listviewdisplayformat="Name" name="ProtocolTypeList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-ProtocolType" type="text" defaultValue="1" data-role="dropdownlist" aria-labelledby="eft_ProtocolTypeListLabel" style={{"display": "none"}} />
                              </span>{" "}<label id="eft_ProtocolType_IDLabel" htmlFor="eft_ProtocolType_ID" className="display-none">{"eft_ProtocolType_ID"}</label>
                            <input readOnly={true} id="eft_ProtocolType_ID" name="ProtocolType.ID" type="hidden" defaultValue="1" aria-labelledby="eft_ProtocolType_IDLabel" />{" "}<label id="eft_ProtocolType_NameLabel" htmlFor="eft_ProtocolType_Name" className="display-none">{"eft_ProtocolType_Name"}</label>
                            <input readOnly={true} id="eft_ProtocolType_Name" name="ProtocolType.Name" type="hidden" defaultValue="FTP" aria-labelledby="eft_ProtocolType_NameLabel" />{" "}<label id="eft_ProtocolType_DisplayFormatLabel" htmlFor="eft_ProtocolType_DisplayFormat" className="display-none">{"eft_ProtocolType_DisplayFormat"}</label>
                            <input readOnly={true} id="eft_ProtocolType_DisplayFormat" name="ProtocolType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_ProtocolType_DisplayFormatLabel" />
                            </div>
                          <span className="k-invalid-msg" id="eft_ProtocolTypeList_validationMessage" data-for="eft_ProtocolTypeList"></span>
                          <span id="eft_ProtocolTypeHelpDesc" hidden={true}>{"Protocol"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_FTPServerName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_FTPServerName" id="eft_FTPServerNameLabel" readOnly={true} className="readonly-label" title="Server">{"Server"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_FTPServerNameHelp" role="img" title="Server" data-role="tooltip" data-kit-tip="Server" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-required="Server is a required field." height="0" id="eft_FTPServerName" ignoredirtydata="False" name="FTPServerName" defaultValue="SFTP TEST" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_FTPServerNameLabel eft_FTPServerNameHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_FTPServerName_validationMessage" data-for="eft_FTPServerName"></span>
                          <span id="eft_FTPServerNameHelpDesc" hidden={true}>{"Server"}</span>
                          </div>
                        </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="eft_SourceAddress_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_SourceAddress" id="eft_SourceAddressLabel" readOnly={true} className="readonly-label" title="Source Address">{"Source Address"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_SourceAddressHelp" role="img" title="Source Address" data-role="tooltip" data-kit-tip="Source Address" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Source Address has a maximum length of 248 characters." data-val-required="Source Address is a required field." height="0" id="eft_SourceAddress" ignoredirtydata="False" maxLength={248} name="SourceAddress" defaultValue="/test" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_SourceAddressLabel eft_SourceAddressHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_SourceAddress_validationMessage" data-for="eft_SourceAddress"></span>
                          <span id="eft_SourceAddressHelpDesc" hidden={true}>{"Source Address"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_SourceFileMask_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_SourceFileMask" id="eft_SourceFileMaskLabel" readOnly={true} className="readonly-label" title="Source File Mask">{"Source File Mask"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_SourceFileMaskHelp" role="img" title="Source File Mask" data-role="tooltip" data-kit-tip="Source File Mask" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Source File Mask has a maximum length of 50 characters." data-val-required="Source File Mask is a required field." height="0" id="eft_SourceFileMask" ignoredirtydata="False" maxLength={50} name="SourceFileMask" defaultValue="wer" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_SourceFileMaskLabel eft_SourceFileMaskHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_SourceFileMask_validationMessage" data-for="eft_SourceFileMask"></span>
                          <span id="eft_SourceFileMaskHelpDesc" hidden={true}>{"Source File Mask"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_FileDirectionList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="eft_FileDirection" id="eft_FileDirectionLabel" readOnly={true} className="readonly-label" title="File Direction">{"File Direction"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_FileDirectionHelp" role="img" title="File Direction" data-role="tooltip" data-kit-tip="File Direction" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <label id="FileDirectionListTextLabel" htmlFor="FileDirectionListText" className="display-none">{"FileDirectionListText"}</label>
                          <input readOnly={true} className="k-textbox editor-control" id="FileDirectionListText" name="FileDirectionListText" defaultValue="" aria-labelledby="eft_FileDirectionLabel" />
                          <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="eft_FileDirectionList_listbox" aria-busy="false" aria-describedby="086af94c-314d-40e2-be6d-f7aebdc2fd3d" aria-labelledby="eft_FileDirectionLabel eft_FileDirectionHelpDesc" data-kit="k20" style={{}}>
                              <span id="086af94c-314d-40e2-be6d-f7aebdc2fd3d" unselectable="on" className="k-input-inner display-none">
                                <span className="k-input-value-text">{"select a value..."}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="eft_FileDirectionListLabel" htmlFor="eft_FileDirectionList" className="display-none">{"eft_FileDirectionList"}</label>
                              <input readOnly={true} isclonedisplayfor="true" className="editor-control" height="0" id="eft_FileDirectionList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.FileDirection" listviewdisplayformat="Name" name="FileDirectionList" not-data-val-required="File Direction is a required field." propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-FileDirection" type="text" data-role="dropdownlist" aria-labelledby="eft_FileDirectionListLabel" style={{"display": "none"}} />
                              </span>{" "}<label id="eft_FileDirection_IDLabel" htmlFor="eft_FileDirection_ID" className="display-none">{"eft_FileDirection_ID"}</label>
                            <input readOnly={true} id="eft_FileDirection_ID" name="FileDirection.ID" type="hidden" defaultValue="" aria-labelledby="eft_FileDirection_IDLabel" />{" "}<label id="eft_FileDirection_NameLabel" htmlFor="eft_FileDirection_Name" className="display-none">{"eft_FileDirection_Name"}</label>
                            <input readOnly={true} id="eft_FileDirection_Name" name="FileDirection.Name" type="hidden" defaultValue="" aria-labelledby="eft_FileDirection_NameLabel" />{" "}<label id="eft_FileDirection_DisplayFormatLabel" htmlFor="eft_FileDirection_DisplayFormat" className="display-none">{"eft_FileDirection_DisplayFormat"}</label>
                            <input readOnly={true} id="eft_FileDirection_DisplayFormat" name="FileDirection.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_FileDirection_DisplayFormatLabel" />
                            </div>
                          <span className="k-invalid-msg" id="eft_FileDirectionList_validationMessage" data-for="eft_FileDirectionList"></span>
                          <span id="eft_FileDirectionHelpDesc" hidden={true}>{"File Direction"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_TradingPartner_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_TradingPartner" id="eft_TradingPartnerLabel" readOnly={true} className="readonly-label" title="Trading Partner">{"Trading Partner"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_TradingPartnerHelp" role="img" title="Trading Partner" data-role="tooltip" data-kit-tip="Trading Partner" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Trading Partner has a maximum length of 10 characters." data-val-regex="Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="eft_TradingPartner" ignoredirtydata="False" maxLength={10} name="TradingPartner" not-data-val-required="Trading Partner is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_TradingPartnerLabel eft_TradingPartnerHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_TradingPartner_validationMessage" data-for="eft_TradingPartner"></span>
                          <span id="eft_TradingPartnerHelpDesc" hidden={true}>{"Trading Partner"}</span>
                          </div>
                        </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerName" id="eft_OwnerNameLabel" readOnly={true} className="readonly-label" title="Owner Name">{"Owner Name"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerNameHelp" role="img" title="Owner Name" data-role="tooltip" data-kit-tip="Owner Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Owner Name has a maximum length of 50 characters." data-val-required="Owner Name is a required field." height="0" id="eft_OwnerName" ignoredirtydata="False" maxLength={50} name="OwnerName" defaultValue="yashwanth" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_OwnerNameLabel eft_OwnerNameHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_OwnerName_validationMessage" data-for="eft_OwnerName"></span>
                          <span id="eft_OwnerNameHelpDesc" hidden={true}>{"Owner Name"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerPhoneNumber_parent" data-template="PhoneNumberUS">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerPhoneNumber" id="eft_OwnerPhoneNumberLabel" readOnly={true} className="readonly-label" title="Owner Phone">{"Owner Phone"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerPhoneNumberHelp" role="img" title="Owner Phone" data-role="tooltip" data-kit-tip="Owner Phone" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <span className="k-input k-maskedtextbox editor-control readonly-widget" aria-labelledby="eft_OwnerPhoneNumberLabel" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget k-widget" data-val="true" data-val-length-max="Owner Phone has a maximum length of 20 characters." data-val-regex="Enter Valid Phone Number." data-val-regex-pattern="^(?!(^\\(?(0{3})\\)?( |-|\\.)?0{3}( |-|\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( |-|\\.)?\\d{3,3}( |-|\\.)?\\d{4,4}$)" data-val-required="Owner Phone is a required field." height="0" id="eft_OwnerPhoneNumber" ignoredirtydata="False" name="OwnerPhoneNumber" defaultValue="1233333333" data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="000-000-0000" style={{"width": "100%"}} aria-labelledby="eft_OwnerPhoneNumberLabel eft_OwnerPhoneNumberHelpDesc" />
                            </span>
                          <span className="k-invalid-msg" id="eft_OwnerPhoneNumber_validationMessage" data-for="eft_OwnerPhoneNumber"></span>
                          <span id="eft_OwnerPhoneNumberHelpDesc" hidden={true}>{"Owner Phone"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerSubsystemList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerSubsystem" id="eft_OwnerSubsystemLabel" readOnly={true} className="readonly-label" title="Owner Module">{"Owner Module"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerSubsystemHelp" role="img" title="Owner Module" data-role="tooltip" data-kit-tip="Owner Module" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <label id="OwnerSubsystemListTextLabel" htmlFor="OwnerSubsystemListText" className="display-none">{"OwnerSubsystemListText"}</label>
                          <input readOnly={true} className="k-textbox editor-control" id="OwnerSubsystemListText" name="OwnerSubsystemListText" defaultValue="Administration" aria-labelledby="eft_OwnerSubsystemLabel" />
                          <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="eft_OwnerSubsystemList_listbox" aria-busy="false" aria-describedby="51b3151b-636b-41b3-8aad-7e5d4c6d0d7e" aria-labelledby="eft_OwnerSubsystemLabel eft_OwnerSubsystemHelpDesc" data-kit="k21" style={{}}>
                              <span id="51b3151b-636b-41b3-8aad-7e5d4c6d0d7e" unselectable="on" className="k-input-inner readonly-widget">
                                <span className="k-input-value-text">{"Administration"}</span>
                                </span>
                              <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256 352 128 160h256z" />
                                    </svg>
                                  </span>
                                </button>
                              <label id="eft_OwnerSubsystemListLabel" htmlFor="eft_OwnerSubsystemList" className="display-none">{"eft_OwnerSubsystemList"}</label>
                              <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Owner Module is a required field." height="0" id="eft_OwnerSubsystemList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.OwnerModule" listviewdisplayformat="Name" name="OwnerSubsystemList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-OwnerSubsystem" type="text" defaultValue="0B34481F-F69C-3AB6-E053-C9157ACEFF03" data-role="dropdownlist" aria-labelledby="eft_OwnerSubsystemListLabel" style={{"display": "none"}} />
                              </span>{" "}<label id="eft_OwnerSubsystem_IDLabel" htmlFor="eft_OwnerSubsystem_ID" className="display-none">{"eft_OwnerSubsystem_ID"}</label>
                            <input readOnly={true} id="eft_OwnerSubsystem_ID" name="OwnerSubsystem.ID" type="hidden" defaultValue="0B34481F-F69C-3AB6-E053-C9157ACEFF03" aria-labelledby="eft_OwnerSubsystem_IDLabel" />{" "}<label id="eft_OwnerSubsystem_NameLabel" htmlFor="eft_OwnerSubsystem_Name" className="display-none">{"eft_OwnerSubsystem_Name"}</label>
                            <input readOnly={true} id="eft_OwnerSubsystem_Name" name="OwnerSubsystem.Name" type="hidden" defaultValue="Administration" aria-labelledby="eft_OwnerSubsystem_NameLabel" />{" "}<label id="eft_OwnerSubsystem_DisplayFormatLabel" htmlFor="eft_OwnerSubsystem_DisplayFormat" className="display-none">{"eft_OwnerSubsystem_DisplayFormat"}</label>
                            <input readOnly={true} id="eft_OwnerSubsystem_DisplayFormat" name="OwnerSubsystem.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_OwnerSubsystem_DisplayFormatLabel" />
                            </div>
                          <span className="k-invalid-msg" id="eft_OwnerSubsystemList_validationMessage" data-for="eft_OwnerSubsystemList"></span>
                          <span id="eft_OwnerSubsystemHelpDesc" hidden={true}>{"Owner Module"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerEmail_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerEmail" id="eft_OwnerEmailLabel" readOnly={true} className="readonly-label" title="Owner Email">{"Owner Email"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerEmailHelp" role="img" title="Owner Email" data-role="tooltip" data-kit-tip="Owner Email" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-email-msg="Owner Email is not a valid email address. Enter email with 'name@domain' format." data-val="true" data-val-length-max="Owner Email has a maximum length of 150 characters." data-val-regex="Owner Email is not a valid email address. Enter email with 'name@domain' format." data-val-regex-pattern="^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$" data-val-required="Owner Email is a required field." height="0" id="eft_OwnerEmail" ignoredirtydata="False" maxLength={150} name="OwnerEmail" defaultValue="yashwanth.goduguchintha@dxc.com" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_OwnerEmailLabel eft_OwnerEmailHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_OwnerEmail_validationMessage" data-for="eft_OwnerEmail"></span>
                          <span id="eft_OwnerEmailHelpDesc" hidden={true}>{"Owner Email"}</span>
                          </div>
                        </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-12 assoc-box editor-section row">{" "}<div className="col-md-12 assoc-box editor-section row">{" "}<div className="col-md-4 editor-col list-horizontal editor-clear" id="eft_RunSchedule_parent" data-template="RadioButtonList">
                            <div className="editor-label">
                              <label htmlFor="eft_RunSchedule" id="eft_RunScheduleLabel" readOnly={true} className="readonly-label" title="Run Schedule">{"Run Schedule"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunScheduleHelp" role="img" title="Run Schedule" data-role="tooltip" data-kit-tip="Run Schedule" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<div className="assoc-box-radio-btn-list-horz readonly-widget" tabIndex={0}>{" "}<span className="list-item display-none-priority">
                                  <input readOnly={true} className="k-radio" id="eft_RunSchedule_ID1" name="RunSchedule.ID" type="radio" defaultValue="1" defaultChecked={true} ignoredirtydata="False" aria-describedby="eft_RunScheduleHelpDesc" />
                                  <label className="k-radio-label" htmlFor="eft_RunSchedule_ID1">{"Run Weekly"}</label>
                                  </span>
                                <span className="list-item display-none-priority">
                                  <input readOnly={true} className="k-radio" id="eft_RunSchedule_ID2" name="RunSchedule.ID" type="radio" defaultValue="2" ignoredirtydata="False" aria-describedby="eft_RunScheduleHelpDesc" />
                                  <label className="k-radio-label" htmlFor="eft_RunSchedule_ID2">{"Run Monthly"}</label>
                                  </span>{" "}<label className="readonly-k-radio-label">{"Run Weekly"}</label>
                                </div>{" "}<span className="k-invalid-msg" id="eft_RunSchedule_validationMessage" data-for="eft_RunSchedule"></span>
                              <span id="eft_RunScheduleHelpDesc" hidden={true}>{"Run Schedule"}</span>
                              </div>
                            </div>{" "}<div id="RunType_Weekly">{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnSunday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Sunday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnSunday" ignoredirtydata="False" name="RunOnSunday" not-data-val-required="Sunday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnSundayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnSunday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Sunday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Sunday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnSunday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnSundayHelp" role="img" title="Run Sunday" data-role="tooltip" data-kit-tip="Run Sunday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnSunday_validationMessage" data-for="eft_RunOnSunday"></span>
                                <span id="eft_RunOnSundayHelpDesc" hidden={true}>{"Run Sunday"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnMonday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Monday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnMonday" ignoredirtydata="False" name="RunOnMonday" not-data-val-required="Monday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnMondayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnMonday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Monday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Monday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnMonday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnMondayHelp" role="img" title="Run Monday" data-role="tooltip" data-kit-tip="Run Monday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnMonday_validationMessage" data-for="eft_RunOnMonday"></span>
                                <span id="eft_RunOnMondayHelpDesc" hidden={true}>{"Run Monday"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnTuesday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Tuesday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnTuesday" ignoredirtydata="False" name="RunOnTuesday" not-data-val-required="Tuesday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnTuesdayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnTuesday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Tuesday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Tuesday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnTuesday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnTuesdayHelp" role="img" title="Run Tuesday" data-role="tooltip" data-kit-tip="Run Tuesday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnTuesday_validationMessage" data-for="eft_RunOnTuesday"></span>
                                <span id="eft_RunOnTuesdayHelpDesc" hidden={true}>{"Run Tuesday"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnWednesday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Wednesday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnWednesday" ignoredirtydata="False" name="RunOnWednesday" not-data-val-required="Wednesday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnWednesdayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnWednesday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Wednesday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Wednesday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnWednesday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnWednesdayHelp" role="img" title="Run Wednesday" data-role="tooltip" data-kit-tip="Run Wednesday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnWednesday_validationMessage" data-for="eft_RunOnWednesday"></span>
                                <span id="eft_RunOnWednesdayHelpDesc" hidden={true}>{"Run Wednesday"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnThursday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Thursday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnThursday" ignoredirtydata="False" name="RunOnThursday" not-data-val-required="Thursday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnThursdayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnThursday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Thursday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Thursday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnThursday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnThursdayHelp" role="img" title="Run Thursday" data-role="tooltip" data-kit-tip="Run Thursday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnThursday_validationMessage" data-for="eft_RunOnThursday"></span>
                                <span id="eft_RunOnThursdayHelpDesc" hidden={true}>{"Run Thursday"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnFriday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Friday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnFriday" ignoredirtydata="False" name="RunOnFriday" not-data-val-required="Friday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnFridayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnFriday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Friday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Friday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnFriday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnFridayHelp" role="img" title="Run Friday" data-role="tooltip" data-kit-tip="Run Friday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnFriday_validationMessage" data-for="eft_RunOnFriday"></span>
                                <span id="eft_RunOnFridayHelpDesc" hidden={true}>{"Run Friday"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnSaturday_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Saturday"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnSaturday" ignoredirtydata="False" name="RunOnSaturday" not-data-val-required="Saturday is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnSaturdayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnSaturday" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Saturday"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Saturday" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnSaturday" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnSaturdayHelp" role="img" title="Run Saturday" data-role="tooltip" data-kit-tip="Run Saturday" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnSaturday_validationMessage" data-for="eft_RunOnSaturday"></span>
                                <span id="eft_RunOnSaturdayHelpDesc" hidden={true}>{"Run Saturday"}</span>
                                </div>
                              </div>{" "}</div>{" "}<div className="clear-both"></div>{" "}<div id="RunType_Monthly">{" "}<div className="col-md-3 editor-col" id="eft_RunOnFirstDay_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Run On First Day Month"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnFirstDay" ignoredirtydata="False" name="RunOnFirstDay" not-data-val-required="Run On First Day Month is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnFirstDayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnFirstDay" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Run On First Day Month"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Run On First Day Month" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnFirstDay" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnFirstDayHelp" role="img" title="Run On First Day Month" data-role="tooltip" data-kit-tip="Run On First Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnFirstDay_validationMessage" data-for="eft_RunOnFirstDay"></span>
                                <span id="eft_RunOnFirstDayHelpDesc" hidden={true}>{"Run On First Day Month"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnLastDay_parent">
                              <div className="editor-label">
                                <label readOnly={true}>{"Run On Last Day Month"}</label>
                                </div>
                              <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                                <span className="k-checkbox-wrap">
                                  <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_RunOnLastDay" ignoredirtydata="False" name="RunOnLastDay" not-data-val-required="Run On Last Day Month is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_RunOnLastDayHelpDesc" />
                                  </span>
                                <label htmlFor="eft_RunOnLastDay" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Run On Last Day Month"}</label>
                                <input className="readonly-k-checkbox-label" aria-label="Run On Last Day Month" defaultValue="No" readOnly={true} />
                                <input readOnly={true} disabled={true} name="RunOnLastDay" type="hidden" defaultValue="false" />
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnLastDayHelp" role="img" title="Run On Last Day Month" data-role="tooltip" data-kit-tip="Run On Last Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                <span className="k-invalid-msg" id="eft_RunOnLastDay_validationMessage" data-for="eft_RunOnLastDay"></span>
                                <span id="eft_RunOnLastDayHelpDesc" hidden={true}>{"Run On Last Day Month"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnThisDayList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="eft_RunOnThisDay" id="eft_RunOnThisDayLabel" readOnly={true} className="readonly-label" title="Run On This Day Month">{"Run On This Day Month"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnThisDayHelp" role="img" title="Run On This Day Month" data-role="tooltip" data-kit-tip="Run On This Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">
                                <label id="RunOnThisDayListTextLabel" htmlFor="RunOnThisDayListText" className="display-none">{"RunOnThisDayListText"}</label>
                                <input readOnly={true} className="k-textbox editor-control" id="RunOnThisDayListText" name="RunOnThisDayListText" defaultValue="" aria-labelledby="eft_RunOnThisDayLabel" />
                                <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="eft_RunOnThisDayList_listbox" aria-busy="false" aria-describedby="4b8f3fcd-52b2-47fd-804f-70ab79e359e4" aria-labelledby="eft_RunOnThisDayLabel eft_RunOnThisDayHelpDesc" data-kit="k22" style={{}}>
                                    <span id="4b8f3fcd-52b2-47fd-804f-70ab79e359e4" unselectable="on" className="k-input-inner readonly-widget">
                                      <span className="k-input-value-text">{"null"}</span>
                                      </span>
                                    <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                      <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                        <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M256 352 128 160h256z" />
                                          </svg>
                                        </span>
                                      </button>
                                    <label id="eft_RunOnThisDayListLabel" htmlFor="eft_RunOnThisDayList" className="display-none">{"eft_RunOnThisDayList"}</label>
                                    <input readOnly={true} isclonedisplayfor="true" className="editor-control" height="0" id="eft_RunOnThisDayList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.DayOfMonth" listviewdisplayformat="Name" name="RunOnThisDayList" not-data-val-required="Run On This Day Month is a required field." propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-RunOnThisDay" type="text" defaultValue="0" data-role="dropdownlist" aria-labelledby="eft_RunOnThisDayListLabel" style={{"display": "none"}} />
                                    </span>{" "}<label id="eft_RunOnThisDay_IDLabel" htmlFor="eft_RunOnThisDay_ID" className="display-none">{"eft_RunOnThisDay_ID"}</label>
                                  <input readOnly={true} id="eft_RunOnThisDay_ID" name="RunOnThisDay.ID" type="hidden" defaultValue="0" aria-labelledby="eft_RunOnThisDay_IDLabel" />{" "}<label id="eft_RunOnThisDay_NameLabel" htmlFor="eft_RunOnThisDay_Name" className="display-none">{"eft_RunOnThisDay_Name"}</label>
                                  <input readOnly={true} id="eft_RunOnThisDay_Name" name="RunOnThisDay.Name" type="hidden" defaultValue="" aria-labelledby="eft_RunOnThisDay_NameLabel" />{" "}<label id="eft_RunOnThisDay_DisplayFormatLabel" htmlFor="eft_RunOnThisDay_DisplayFormat" className="display-none">{"eft_RunOnThisDay_DisplayFormat"}</label>
                                  <input readOnly={true} id="eft_RunOnThisDay_DisplayFormat" name="RunOnThisDay.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_RunOnThisDay_DisplayFormatLabel" />
                                  </div>
                                <span className="k-invalid-msg" id="eft_RunOnThisDayList_validationMessage" data-for="eft_RunOnThisDayList"></span>
                                <span id="eft_RunOnThisDayHelpDesc" hidden={true}>{"Run On This Day Month"}</span>
                                </div>
                              </div>{" "}</div>{" "}</div>{" "}<div className="clear-both rowpad"></div>{" "}<div className="col-md-3 editor-col" id="eft_TimeWindowStartList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="eft_TimeWindowStart" id="eft_TimeWindowStartLabel" readOnly={true} className="readonly-label" title="Time Window Start">{"Time Window Start"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_TimeWindowStartHelp" role="img" title="Time Window Start" data-role="tooltip" data-kit-tip="Time Window Start" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <label id="TimeWindowStartListTextLabel" htmlFor="TimeWindowStartListText" className="display-none">{"TimeWindowStartListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="TimeWindowStartListText" name="TimeWindowStartListText" defaultValue="0000" aria-labelledby="eft_TimeWindowStartLabel" />
                            <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="eft_TimeWindowStartList_listbox" aria-busy="false" aria-describedby="1a3ddc8d-e510-411f-81f3-fd30a2e3908d" aria-labelledby="eft_TimeWindowStartLabel eft_TimeWindowStartHelpDesc" data-kit="k23" style={{}}>
                                <span id="1a3ddc8d-e510-411f-81f3-fd30a2e3908d" unselectable="on" className="k-input-inner readonly-widget">
                                  <span className="k-input-value-text">{"0000"}</span>
                                  </span>
                                <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                  <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M256 352 128 160h256z" />
                                      </svg>
                                    </span>
                                  </button>
                                <label id="eft_TimeWindowStartListLabel" htmlFor="eft_TimeWindowStartList" className="display-none">{"eft_TimeWindowStartList"}</label>
                                <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Time Window Start is a required field." height="0" id="eft_TimeWindowStartList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.TimeWindow" listviewdisplayformat="Name" name="TimeWindowStartList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-TimeWindowStart" type="text" defaultValue="0000" data-role="dropdownlist" aria-labelledby="eft_TimeWindowStartListLabel" style={{"display": "none"}} />
                                </span>{" "}<label id="eft_TimeWindowStart_IDLabel" htmlFor="eft_TimeWindowStart_ID" className="display-none">{"eft_TimeWindowStart_ID"}</label>
                              <input readOnly={true} id="eft_TimeWindowStart_ID" name="TimeWindowStart.ID" type="hidden" defaultValue="0000" aria-labelledby="eft_TimeWindowStart_IDLabel" />{" "}<label id="eft_TimeWindowStart_NameLabel" htmlFor="eft_TimeWindowStart_Name" className="display-none">{"eft_TimeWindowStart_Name"}</label>
                              <input readOnly={true} id="eft_TimeWindowStart_Name" name="TimeWindowStart.Name" type="hidden" defaultValue="0000" aria-labelledby="eft_TimeWindowStart_NameLabel" />{" "}<label id="eft_TimeWindowStart_DisplayFormatLabel" htmlFor="eft_TimeWindowStart_DisplayFormat" className="display-none">{"eft_TimeWindowStart_DisplayFormat"}</label>
                              <input readOnly={true} id="eft_TimeWindowStart_DisplayFormat" name="TimeWindowStart.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_TimeWindowStart_DisplayFormatLabel" />
                              </div>
                            <span className="k-invalid-msg" id="eft_TimeWindowStartList_validationMessage" data-for="eft_TimeWindowStartList"></span>
                            <span id="eft_TimeWindowStartHelpDesc" hidden={true}>{"Time Window Start"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="eft_TimeWindowEndList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="eft_TimeWindowEnd" id="eft_TimeWindowEndLabel" readOnly={true} className="readonly-label" title="Time Window End">{"Time Window End"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_TimeWindowEndHelp" role="img" title="Time Window End" data-role="tooltip" data-kit-tip="Time Window End" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <label id="TimeWindowEndListTextLabel" htmlFor="TimeWindowEndListText" className="display-none">{"TimeWindowEndListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="TimeWindowEndListText" name="TimeWindowEndListText" defaultValue="0030" aria-labelledby="eft_TimeWindowEndLabel" />
                            <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="eft_TimeWindowEndList_listbox" aria-busy="false" aria-describedby="5917f02a-a4e8-48c7-890b-423d587ddd7f" aria-labelledby="eft_TimeWindowEndLabel eft_TimeWindowEndHelpDesc" data-kit="k24" style={{}}>
                                <span id="5917f02a-a4e8-48c7-890b-423d587ddd7f" unselectable="on" className="k-input-inner readonly-widget">
                                  <span className="k-input-value-text">{"0030"}</span>
                                  </span>
                                <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                  <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M256 352 128 160h256z" />
                                      </svg>
                                    </span>
                                  </button>
                                <label id="eft_TimeWindowEndListLabel" htmlFor="eft_TimeWindowEndList" className="display-none">{"eft_TimeWindowEndList"}</label>
                                <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Time Window End is a required field." height="0" id="eft_TimeWindowEndList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.TimeWindow" listviewdisplayformat="Name" name="TimeWindowEndList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.FileTransferConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-TimeWindowEnd" type="text" defaultValue="0030" data-role="dropdownlist" aria-labelledby="eft_TimeWindowEndListLabel" style={{"display": "none"}} />
                                </span>{" "}<label id="eft_TimeWindowEnd_IDLabel" htmlFor="eft_TimeWindowEnd_ID" className="display-none">{"eft_TimeWindowEnd_ID"}</label>
                              <input readOnly={true} id="eft_TimeWindowEnd_ID" name="TimeWindowEnd.ID" type="hidden" defaultValue="0030" aria-labelledby="eft_TimeWindowEnd_IDLabel" />{" "}<label id="eft_TimeWindowEnd_NameLabel" htmlFor="eft_TimeWindowEnd_Name" className="display-none">{"eft_TimeWindowEnd_Name"}</label>
                              <input readOnly={true} id="eft_TimeWindowEnd_Name" name="TimeWindowEnd.Name" type="hidden" defaultValue="0030" aria-labelledby="eft_TimeWindowEnd_NameLabel" />{" "}<label id="eft_TimeWindowEnd_DisplayFormatLabel" htmlFor="eft_TimeWindowEnd_DisplayFormat" className="display-none">{"eft_TimeWindowEnd_DisplayFormat"}</label>
                              <input readOnly={true} id="eft_TimeWindowEnd_DisplayFormat" name="TimeWindowEnd.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_TimeWindowEnd_DisplayFormatLabel" />
                              </div>
                            <span className="k-invalid-msg" id="eft_TimeWindowEndList_validationMessage" data-for="eft_TimeWindowEndList"></span>
                            <span id="eft_TimeWindowEndHelpDesc" hidden={true}>{"Time Window End"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="eft_SendNotification_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Send Notification"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_SendNotification" ignoredirtydata="False" name="SendNotification" not-data-val-required="Send Notification is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_SendNotificationHelpDesc" />
                              </span>
                            <label htmlFor="eft_SendNotification" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Send Notification"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Send Notification" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="SendNotification" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_SendNotificationHelp" role="img" title="Send Notification" data-role="tooltip" data-kit-tip="Send Notification" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="eft_SendNotification_validationMessage" data-for="eft_SendNotification"></span>
                            <span id="eft_SendNotificationHelpDesc" hidden={true}>{"Send Notification"}</span>
                            </div>
                          </div>{" "}<div className="col-md-2 editor-col" id="eft_Suspended_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Suspend"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" height="0" id="eft_Suspended" ignoredirtydata="False" name="Suspended" not-data-val-required="Suspend is a required field." type="checkbox" defaultValue="true" style={{}} aria-describedby="eft_SuspendedHelpDesc" />
                              </span>
                            <label htmlFor="eft_Suspended" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Suspend"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Suspend" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="Suspended" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_SuspendedHelp" role="img" title="Suspend" data-role="tooltip" data-kit-tip="Suspend" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="eft_Suspended_validationMessage" data-for="eft_Suspended"></span>
                            <span id="eft_SuspendedHelpDesc" hidden={true}>{"Suspend"}</span>
                            </div>
                          </div>{" "}<div className="col-md-1 editor-col" id="eft_Status_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="eft_Status" id="eft_StatusLabel" readOnly={true} className="readonly-label" title="Status">{"Status"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_StatusHelp" role="img" title="Status" data-role="tooltip" data-kit-tip="Status" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                              <input readOnly={true} className="editor-control k-input-inner readonly-widget" height="0" id="eft_Status" ignoredirtydata="False" name="Status" not-data-val-required="Status is a required field." defaultValue="Active" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_StatusLabel eft_StatusHelpDesc" />
                              </span>{" "}<span className="k-invalid-msg" id="eft_Status_validationMessage" data-for="eft_Status"></span>
                            <span id="eft_StatusHelpDesc" hidden={true}>{"Status"}</span>
                            </div>
                          </div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                                    Destination Configuration\n                                "}</div>{" "}<div className="content-panel-bdy">{" "}<div className="k-grid editor-grid" id="FileTransferDestinationGrid" data-role="grid" style={{}} data-kit="k25">
                        <div aria-controls="e574f686-a400-407c-81f1-3d386bf58a8b" aria-label="grid toolbar" className="k-toolbar k-grid-toolbar k-toolbar-resizable" role="toolbar">{" "}<div className="grid-toolbar-primary align-right">{" "}<span className="k-checkbox-wrap">
                              <input data-role="checkbox" id="DestinationShowInactiveCheckBox" ignoredirtydata="true" name="DestinationShowInactiveCheckBox" title="Show Inactives" type="checkbox" defaultValue="true" className="k-checkbox" style={{}} />
                              </span>
                            <input name="DestinationShowInactiveCheckBox" type="hidden" defaultValue="false" />{" "}</div>{" "}</div>
                        <div className="k-grid-header" style={{"paddingRight": "15px"}}>
                          <div className="k-grid-header-wrap k-auto-scrollable" data-role="resizable">
                            <table role="grid" className="k-grid-header-table k-table">
                              <colgroup>
                                <col />
                                <col />
                                <col />
                                <col style={{"width": "75px"}} />
                                </colgroup>
                              <thead className="k-table-thead" role="rowgroup" id="1314dc66-4135-4587-9c7e-098535e1f730">
                                <tr className="k-table-row" role="row">
                                  <th className="k-table-th k-header" data-field="DestinationAddress" data-index="0" data-resizable="true" data-title="Destination Address" id="e3e322d6-f78f-4dd1-ba25-ada97bc19ffc" role="columnheader" scope="col" aria-colindex="1">
                                    <span className="k-cell-inner">
                                      <span className="k-link">
                                        <span className="k-column-title">{"Destination Address"}</span>
                                        </span>
                                      </span>
                                    </th>
                                  <th className="k-table-th k-header" data-field="DestinationProtocol.Name" data-index="1" data-resizable="true" data-title="Destination Protocol" id="571d33f6-b756-428e-bfc7-680af99da838" role="columnheader" scope="col" aria-colindex="2">
                                    <span className="k-cell-inner">
                                      <span className="k-link">
                                        <span className="k-column-title">{"Destination Protocol"}</span>
                                        </span>
                                      </span>
                                    </th>
                                  <th className="k-table-th k-header" data-field="ContactName" data-index="2" data-resizable="true" data-title="Contact Name" id="e79b5210-05ae-4e7f-9cb3-8d48cb4ac6b5" role="columnheader" scope="col" aria-colindex="3">
                                    <span className="k-cell-inner">
                                      <span className="k-link">
                                        <span className="k-column-title">{"Contact Name"}</span>
                                        </span>
                                      </span>
                                    </th>
                                  <th className="k-table-th k-header" data-field="Status" data-index="3" data-resizable="true" data-title="Status" id="cb90b2ae-da23-4924-a8d1-54d3f455c813" role="columnheader" scope="col" aria-colindex="4">
                                    <span className="k-cell-inner">
                                      <span className="k-link">
                                        <span className="k-column-title">{"Status"}</span>
                                        </span>
                                      </span>
                                    </th>
                                  <th className="k-table-th k-header k-hidden" data-field="Active" data-index="4" data-resizable="true" data-title="Active" id="8d2bcfc1-81ca-4d64-a737-2107c2766f25" role="columnheader" scope="col" aria-colindex="5" style={{"display": "none"}}>
                                    <span className="k-cell-inner">
                                      <span className="k-link">
                                        <span className="k-column-title">{"Active"}</span>
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
                            <table id="e574f686-a400-407c-81f1-3d386bf58a8b" role="grid" tabIndex={0} className="k-grid-table k-table k-selectable" data-role="selectable" aria-colcount="5" aria-owns="1314dc66-4135-4587-9c7e-098535e1f730 9ee5fb3b-4587-4093-95cf-e7863b9b4ecd ">
                              <colgroup>
                                <col />
                                <col />
                                <col />
                                <col style={{"width": "75px"}} />
                                </colgroup>
                              <tbody className="k-table-tbody" id="9ee5fb3b-4587-4093-95cf-e7863b9b4ecd" role="rowgroup">
                                <tr className="k-table-row k-master-row" data-uid="930501e6-2a47-48ad-9bef-8490e6d85be5" role="row">
                                  <td className="k-table-td" role="gridcell" aria-colindex="1">{"https://dxccommercial.test.mapshc.com"}</td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="2">{"FTP"}</td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="3"></td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="4">{"Active"}</td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="5" style={{"display": "none"}}>{"true"}</td>
                                  </tr>
                                <tr className="k-table-row k-table-alt-row k-master-row" data-uid="6703f565-879e-4cb0-8dd9-28813f38df3e" role="row">
                                  <td className="k-table-td" role="gridcell" aria-colindex="1">{"/Test"}</td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="2">{"SFTP"}</td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="3"></td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="4">{"Active"}</td>
                                  <td className="k-table-td" role="gridcell" aria-colindex="5" style={{"display": "none"}}>{"true"}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        <div aria-controls="e574f686-a400-407c-81f1-3d386bf58a8b" className="k-pager k-grid-pager k-pager-responsive" data-role="pager" aria-label="Page navigation, page 1 of 1" role="application" aria-roledescription="pager" aria-keyshortcuts="Enter ArrowRight ArrowLeft" id="56c06372-c81b-49bf-ac96-1794aaf4f8ac" tabIndex={0}>
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
                              <button role="button" aria-current="page" tabIndex={0} aria-label="Page 1" className="k-button  k-button-flat k-button-primary k-selected">
                                <span className="k-button-text">{"1"}</span>
                                </button>
                              </div>
                            <button aria-label="Go to the next page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled" data-page="1" title="Go to the next page" tabIndex={-1} aria-disabled="true">
                              <span className="k-icon k-svg-icon k-svg-i-caret-alt-right k-button-icon">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                  <path d="M352 256 160 384V128z" />
                                  </svg>
                                </span>
                              </button>
                            <button aria-label="Go to the last page" className="k-button k-pager-nav k-button-flat k-icon-button k-disabled k-pager-last" data-page="1" title="Go to the last page" tabIndex={-1} aria-disabled="true">
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
                              <span className="k-numerictextbox k-input" style={{}}>
                                <input type="text" data-validate="false" title="1" tabIndex={0} className="k-input-inner" role="spinbutton" aria-valuemin="1" autoComplete="off" aria-disabled="false" aria-label="Page" aria-valuenow="1" style={{}} />
                                <input aria-label="Page" data-role="numerictextbox" role="spinbutton" className="k-input-inner" inputMode="text" type="text" aria-valuemin="1" aria-disabled="false" aria-valuenow="1" style={{"display": "none"}} />
                                <span className="k-icon k-svg-icon k-svg-i-exclamation-circle k-input-validation-icon k-hidden">
                                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M224 128h64v160h-64zm0 256h64v-64h-64zm256-128c0 123.7-100.3 224-224 224S32 379.7 32 256 132.3 32 256 32s224 100.3 224 224m-32 0c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192" />
                                    </svg>
                                  </span>
                                </span>
                              <span>
                                <span>{"of 1"}</span>
                                </span>
                              </span>
                            </div>
                          <a aria-label="Refresh" className="k-pager-refresh k-button k-button-flat k-icon-button" href="/FileTransfer/FileTransferConfigurationView?subdomain=uximc&amp;ftsSourceLocationId=aab80b60-a4ec-4713-8e70-c2208c327cd1&amp;isPanel=1" title="Refresh" data-role="tooltip" data-kit-tip="Refresh" data-kit-tip-pos="top" data-kit-tip-after="250">
                            <span className="k-icon k-svg-icon k-svg-i-arrow-rotate-cw k-button-icon">
                              <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg?v=30.0.0.2609">
                                <path d="M480 288c0 123.7-100.3 224-224 224S32 411.7 32 288 132.3 64 256 64V0l160 96-160 96v-64c-88.2 0-160 71.8-160 160s71.8 160 160 160 160-71.8 160-160c0-29.1-7.8-56.4-21.5-80l55.5-32c19.1 32.9 30 71.2 30 112" />
                                </svg>
                              </span>
                            </a>
                          <span className="k-pager-info">{"1 - 2 of 2 items"}</span>
                          <span className="k-pager-sizes">
                            <span title="" className="k-picker k-dropdownlist" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-label="Page sizes drop down" aria-disabled="false" aria-readonly="false" aria-controls="cdf6f769-dfa3-45bb-be0b-80a46ba1b0f9_listbox" aria-busy="false" aria-describedby="a80cd503-14fb-4746-811c-aee5c8e4b943" style={{}}>
                              <span id="a80cd503-14fb-4746-811c-aee5c8e4b943" unselectable="on" className="k-input-inner">
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
                            <span>{"items per page"}</span>
                            </span>
                          </div>
                        </div>{" "}</div>{" "}</div>{" "}<div id="FileTransferConfigurationViewButtons">
                    <div id="FileTransferConfigurationViewFormButtonRow" className="editor-button-row">
                      <input id="editFileTransferConfigurationButton" type="button" value="Edit" className="cancel k-button btn-spacer-right" />
                      <span className="editor-button-nav">
                        <input id="closeFileTransferConfigurationButton" type="button" value="Close" className="cancel k-button btn-spacer-left" data-kit-action="close" />
                        </span>
                      </div>
                    </div>{" "}</div>{" "}<div id="divDestinationConfigurationView" style={{"display": "none"}}>{" "}<input name="__RequestVerificationToken" type="hidden" defaultValue="SvP4kvH8dkdmuSy0tGpo6QT3iRQFuUizewG1-rsqtw0mnWhwZLTXKCVg7B1NSqSYw5I-NqhpaGriXLiKr6c3JoQMbUeYmnxzQPi6EoXPhwdBiaf1RykgUruZFQ3hGRIUTPtGAVLVsQ3_bc8QezUd6g2" />{" "}<div id="DestinationConfigurationViewStatus"></div>{" "}<div className="editor-section">{" "}<fieldset>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="viewDestinationProtocolList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="viewDestinationProtocol" id="viewDestinationProtocolLabel" readOnly={true} className="readonly-label" title="Destination Protocol">{"Destination Protocol"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewDestinationProtocolHelp" role="img" title="Destination Protocol" data-role="tooltip" data-kit-tip="Destination Protocol" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <label id="DestinationProtocolListTextLabel" htmlFor="DestinationProtocolListText" className="display-none">{"DestinationProtocolListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="DestinationProtocolListText" name="DestinationProtocolListText" defaultValue="" aria-labelledby="viewDestinationProtocolLabel" />
                            <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="viewDestinationProtocolList_listbox" aria-busy="false" aria-describedby="067610ad-5b05-4b4f-8522-c72830b4e12f" aria-labelledby="viewDestinationProtocolLabel viewDestinationProtocolHelpDesc" data-kit="k26" style={{}}>
                                <span id="067610ad-5b05-4b4f-8522-c72830b4e12f" unselectable="on" className="k-input-inner display-none">
                                  <span className="k-input-value-text">{"select a value..."}</span>
                                  </span>
                                <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                  <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M256 352 128 160h256z" />
                                      </svg>
                                    </span>
                                  </button>
                                <label id="viewDestinationProtocolListLabel" htmlFor="viewDestinationProtocolList" className="display-none">{"viewDestinationProtocolList"}</label>
                                <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Destination Protocol is a required field." id="viewDestinationProtocolList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.ProtocolType" listviewdisplayformat="Name" name="DestinationProtocolList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-DestinationProtocol" type="text" data-role="dropdownlist" aria-labelledby="viewDestinationProtocolListLabel" style={{"display": "none"}} />
                                </span>{" "}<label id="viewDestinationProtocol_IDLabel" htmlFor="viewDestinationProtocol_ID" className="display-none">{"viewDestinationProtocol_ID"}</label>
                              <input readOnly={true} id="viewDestinationProtocol_ID" name="DestinationProtocol.ID" type="hidden" defaultValue="" aria-labelledby="viewDestinationProtocol_IDLabel" />{" "}<label id="viewDestinationProtocol_NameLabel" htmlFor="viewDestinationProtocol_Name" className="display-none">{"viewDestinationProtocol_Name"}</label>
                              <input readOnly={true} id="viewDestinationProtocol_Name" name="DestinationProtocol.Name" type="hidden" defaultValue="" aria-labelledby="viewDestinationProtocol_NameLabel" />{" "}<label id="viewDestinationProtocol_DisplayFormatLabel" htmlFor="viewDestinationProtocol_DisplayFormat" className="display-none">{"viewDestinationProtocol_DisplayFormat"}</label>
                              <input readOnly={true} id="viewDestinationProtocol_DisplayFormat" name="DestinationProtocol.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="viewDestinationProtocol_DisplayFormatLabel" />
                              </div>
                            <span className="k-invalid-msg" id="viewDestinationProtocolList_validationMessage" data-for="viewDestinationProtocolList"></span>
                            <span id="viewDestinationProtocolHelpDesc" hidden={true}>{"Destination Protocol"}</span>
                            </div>
                          </div>{" "}<div className="editor-field" id="viewdivFTPId">{" "}<div className="col-md-3 editor-col" id="viewFTPServerList_parent" data-template="ListItemSingle">
                            <div className="editor-label">
                              <label htmlFor="viewFTPServer" id="viewFTPServerLabel" readOnly={true} className="readonly-label" title="Server">{"Server"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewFTPServerHelp" role="img" title="Server" data-role="tooltip" data-kit-tip="Server" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">
                              <label id="FTPServerListTextLabel" htmlFor="FTPServerListText" className="display-none">{"FTPServerListText"}</label>
                              <input readOnly={true} className="k-textbox editor-control" id="FTPServerListText" name="FTPServerListText" defaultValue="" aria-labelledby="viewFTPServerLabel" />
                              <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="viewFTPServerList_listbox" aria-labelledby="viewFTPServerLabel viewFTPServerHelpDesc" data-kit="k27" style={{}}>
                                  <span id="d31afa8d-b9c6-41e0-b445-33309c9f399a" unselectable="on" className="k-input-inner display-none">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="viewFTPServerListLabel" htmlFor="viewFTPServerList" className="display-none">{"viewFTPServerList"}</label>
                                  <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Server is a required field." id="viewFTPServerList" ignoredirtydata="False" listviewdatalistcontentid="" listviewdisplayformat="Name" name="FTPServerList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-FTPServer" type="text" data-role="dropdownlist" aria-labelledby="viewFTPServerListLabel" style={{"display": "none"}} />
                                  </span>{" "}<label id="viewFTPServer_IDLabel" htmlFor="viewFTPServer_ID" className="display-none">{"viewFTPServer_ID"}</label>
                                <input readOnly={true} id="viewFTPServer_ID" name="FTPServer.ID" type="hidden" defaultValue="" aria-labelledby="viewFTPServer_IDLabel" />{" "}<label id="viewFTPServer_NameLabel" htmlFor="viewFTPServer_Name" className="display-none">{"viewFTPServer_Name"}</label>
                                <input readOnly={true} id="viewFTPServer_Name" name="FTPServer.Name" type="hidden" defaultValue="" aria-labelledby="viewFTPServer_NameLabel" />{" "}<label id="viewFTPServer_DisplayFormatLabel" htmlFor="viewFTPServer_DisplayFormat" className="display-none">{"viewFTPServer_DisplayFormat"}</label>
                                <input readOnly={true} id="viewFTPServer_DisplayFormat" name="FTPServer.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="viewFTPServer_DisplayFormatLabel" />
                                </div>
                              <span className="k-invalid-msg" id="viewFTPServerList_validationMessage" data-for="viewFTPServerList"></span>
                              <span id="viewFTPServerHelpDesc" hidden={true}>{"Server"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div className="col-md-3 editor-col" id="viewDestinationTypeList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="viewDestinationType" id="viewDestinationTypeLabel" readOnly={true} className="readonly-label" title="Destination Type">{"Destination Type"}</label>
                            </div>
                          <div className="editor-field">
                            <label id="DestinationTypeListTextLabel" htmlFor="DestinationTypeListText" className="display-none">{"DestinationTypeListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="DestinationTypeListText" name="DestinationTypeListText" defaultValue="" aria-labelledby="viewDestinationTypeLabel" />
                            <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="viewDestinationTypeList_listbox" aria-busy="false" aria-describedby="1176491b-9add-4e2e-b459-c12b1b948539" aria-labelledby="viewDestinationTypeLabel" data-kit="k28" style={{}}>
                                <span id="1176491b-9add-4e2e-b459-c12b1b948539" unselectable="on" className="k-input-inner display-none">
                                  <span className="k-input-value-text">{"select a value..."}</span>
                                  </span>
                                <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                  <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                    <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M256 352 128 160h256z" />
                                      </svg>
                                    </span>
                                  </button>
                                <label id="viewDestinationTypeListLabel" htmlFor="viewDestinationTypeList" className="display-none">{"viewDestinationTypeList"}</label>
                                <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="Destination Type is a required field." id="viewDestinationTypeList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.DestinationType" listviewdisplayformat="Name" name="DestinationTypeList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-DestinationType" type="text" data-role="dropdownlist" aria-labelledby="viewDestinationTypeListLabel" style={{"display": "none"}} />
                                </span>{" "}<label id="viewDestinationType_IDLabel" htmlFor="viewDestinationType_ID" className="display-none">{"viewDestinationType_ID"}</label>
                              <input readOnly={true} id="viewDestinationType_ID" name="DestinationType.ID" type="hidden" defaultValue="" aria-labelledby="viewDestinationType_IDLabel" />{" "}<label id="viewDestinationType_NameLabel" htmlFor="viewDestinationType_Name" className="display-none">{"viewDestinationType_Name"}</label>
                              <input readOnly={true} id="viewDestinationType_Name" name="DestinationType.Name" type="hidden" defaultValue="" aria-labelledby="viewDestinationType_NameLabel" />{" "}<label id="viewDestinationType_DisplayFormatLabel" htmlFor="viewDestinationType_DisplayFormat" className="display-none">{"viewDestinationType_DisplayFormat"}</label>
                              <input readOnly={true} id="viewDestinationType_DisplayFormat" name="DestinationType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="viewDestinationType_DisplayFormatLabel" />
                              </div>
                            <span className="k-invalid-msg" id="viewDestinationTypeList_validationMessage" data-for="viewDestinationTypeList"></span>
                            </div>
                          </div>{" "}<div className="editor-field" id="viewdivDestinationAddress">{" "}<div className="col-md-3 editor-col" id="viewDestinationAddress_parent" data-template="Text">
                            <div className="editor-label">
                              <label htmlFor="viewDestinationAddress" id="viewDestinationAddressLabel" readOnly={true} className="readonly-label" title="Destination Address">{"Destination Address"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewDestinationAddressHelp" role="img" title="Destination Address" data-role="tooltip" data-kit-tip="Destination Address" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Destination Address has a maximum length of 248 characters." data-val-required="Destination Address is a required field." id="viewDestinationAddress" ignoredirtydata="False" maxLength={248} name="DestinationAddress" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="viewDestinationAddressLabel viewDestinationAddressHelpDesc" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="viewDestinationAddress_validationMessage" data-for="viewDestinationAddress"></span>
                              <span id="viewDestinationAddressHelpDesc" hidden={true}>{"Destination Address"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div className="editor-field" id="viewdivContractName">{" "}<div className="col-md-3 editor-col" id="viewContractNameList_parent" data-template="ListItemSingle">
                            <div className="editor-label">
                              <label htmlFor="viewContractName" id="viewContractNameLabel" readOnly={true} className="readonly-label" title="FTE Module Contract">{"FTE Module Contract"}</label>
                              </div>
                            <div className="editor-field">
                              <label id="ContractNameListTextLabel" htmlFor="ContractNameListText" className="display-none">{"ContractNameListText"}</label>
                              <input readOnly={true} className="k-textbox editor-control" id="ContractNameListText" name="ContractNameListText" defaultValue="" aria-labelledby="viewContractNameLabel" />
                              <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="viewContractNameList_listbox" aria-busy="false" aria-describedby="97df0080-95f2-4e33-804c-b9e1b8925406" aria-labelledby="viewContractNameLabel" data-kit="k29" style={{}}>
                                  <span id="97df0080-95f2-4e33-804c-b9e1b8925406" unselectable="on" className="k-input-inner display-none">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="viewContractNameListLabel" htmlFor="viewContractNameList" className="display-none">{"viewContractNameList"}</label>
                                  <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-required="FTE Module Contract is a required field." id="viewContractNameList" ignoredirtydata="False" listviewdatalistcontentid="Integration.DataList.HPPContractAssemblies" listviewdisplayformat="Name" name="ContractNameList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-ContractName" type="text" data-role="dropdownlist" aria-labelledby="viewContractNameListLabel" style={{"display": "none"}} />
                                  </span>{" "}<label id="viewContractName_IDLabel" htmlFor="viewContractName_ID" className="display-none">{"viewContractName_ID"}</label>
                                <input readOnly={true} id="viewContractName_ID" name="ContractName.ID" type="hidden" defaultValue="" aria-labelledby="viewContractName_IDLabel" />{" "}<label id="viewContractName_NameLabel" htmlFor="viewContractName_Name" className="display-none">{"viewContractName_Name"}</label>
                                <input readOnly={true} id="viewContractName_Name" name="ContractName.Name" type="hidden" defaultValue="" aria-labelledby="viewContractName_NameLabel" />{" "}<label id="viewContractName_DisplayFormatLabel" htmlFor="viewContractName_DisplayFormat" className="display-none">{"viewContractName_DisplayFormat"}</label>
                                <input readOnly={true} id="viewContractName_DisplayFormat" name="ContractName.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="viewContractName_DisplayFormatLabel" />
                                </div>
                              <span className="k-invalid-msg" id="viewContractNameList_validationMessage" data-for="viewContractNameList"></span>
                              </div>
                            </div>{" "}</div>{" "}<div className="editor-field" id="viewdivFTEMetadataId">{" "}<div className="col-md-3 editor-col" id="viewImportJobName_parent" data-template="Text">
                            <div className="editor-label">
                              <label htmlFor="viewImportJobName" id="viewImportJobNameLabel" readOnly={true} className="readonly-label" title="FTE Metadata">{"FTE Metadata"}</label>
                              </div>
                            <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                                <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="FTE Metadata has a maximum length of 248 characters." data-val-required="FTE Metadata is a required field." id="viewImportJobName" ignoredirtydata="False" maxLength={248} name="ImportJobName" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="viewImportJobNameLabel" style={{"width": "100%"}} />
                                </span>{" "}<span className="k-invalid-msg" id="viewImportJobName_validationMessage" data-for="viewImportJobName"></span>
                              </div>
                            </div>{" "}</div>{" "}</div>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="viewContactName_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="viewContactName" id="viewContactNameLabel" readOnly={true} className="readonly-label" title="Contact Name">{"Contact Name"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewContactNameHelp" role="img" title="Contact Name" data-role="tooltip" data-kit-tip="Contact Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                              <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Contact Name has a maximum length of 50 characters." data-val-regex="Contact Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="viewContactName" ignoredirtydata="False" maxLength={50} name="ContactName" not-data-val-required="Contact Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="viewContactNameLabel viewContactNameHelpDesc" style={{"width": "100%"}} />
                              </span>{" "}<span className="k-invalid-msg" id="viewContactName_validationMessage" data-for="viewContactName"></span>
                            <span id="viewContactNameHelpDesc" hidden={true}>{"Contact Name"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="viewContactPhone_parent" data-template="PhoneNumberUS">
                          <div className="editor-label">
                            <label htmlFor="viewContactPhone" id="viewContactPhoneLabel" readOnly={true} className="readonly-label" title="Contact Phone">{"Contact Phone"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewContactPhoneHelp" role="img" title="Contact Phone" data-role="tooltip" data-kit-tip="Contact Phone" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-maskedtextbox editor-control readonly-widget" aria-labelledby="viewContactPhoneLabel" style={{}}>
                              <input readOnly={true} className="editor-control k-input-inner readonly-widget k-widget" data-val-length-max="Contact Phone has a maximum length of 50 characters." data-val-regex="Enter Valid Phone Number." data-val-regex-pattern="^(?!(^\\(?(0{3})\\)?( |-|\\.)?0{3}( |-|\\.)?0{4}$))(^\\(?(\\d{3,3})\\)?( |-|\\.)?\\d{3,3}( |-|\\.)?\\d{4,4}$)" id="viewContactPhone" ignoredirtydata="False" name="ContactPhone" not-data-val-required="Contact Phone is a required field." data-role="maskedtextbox" autoComplete="off" inputMode="text" aria-placeholder="000-000-0000" aria-labelledby="viewContactPhoneLabel viewContactPhoneHelpDesc" style={{"width": "100%"}} />
                              </span>
                            <span className="k-invalid-msg" id="viewContactPhone_validationMessage" data-for="viewContactPhone"></span>
                            <span id="viewContactPhoneHelpDesc" hidden={true}>{"Contact Phone"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="viewContactEmail_parent" data-template="">
                          <div className="editor-label">
                            <label htmlFor="viewContactEmail" id="viewContactEmailLabel" readOnly={true} className="readonly-label" title="Contact Email">{"Contact Email"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewContactEmailHelp" role="img" title="Contact Email" data-role="tooltip" data-kit-tip="Contact Email" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                              <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-email-msg="Contact Email is not a valid email address. Enter email with 'name@domain' format." data-val-length-max="Contact Email has a maximum length of 50 characters." data-val-regex="Contact Email is not a valid email address. Enter email with 'name@domain' format." data-val-regex-pattern="^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$" id="viewContactEmail" ignoredirtydata="False" maxLength={50} name="ContactEmail" not-data-val-required="Contact Email is a required field." type="text" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="viewContactEmailLabel viewContactEmailHelpDesc" style={{"width": "100%"}} />
                              </span>
                            <span className="k-invalid-msg" id="viewContactEmail_validationMessage" data-for="viewContactEmail"></span>
                            <span id="viewContactEmailHelpDesc" hidden={true}>{"Contact Email"}</span>
                            </div>
                          </div>{" "}</div>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="viewOverwriteAtDestination_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Overwrite At Destination"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" id="viewOverwriteAtDestination" ignoredirtydata="False" name="OverwriteAtDestination" not-data-val-required="Overwrite At Destination is a required field." type="checkbox" defaultValue="true" aria-describedby="viewOverwriteAtDestinationHelpDesc" style={{}} />
                              </span>
                            <label htmlFor="viewOverwriteAtDestination" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Overwrite At Destination"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Overwrite At Destination" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="OverwriteAtDestination" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewOverwriteAtDestinationHelp" role="img" title="Overwrite At Destination" data-role="tooltip" data-kit-tip="Overwrite At Destination" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="viewOverwriteAtDestination_validationMessage" data-for="viewOverwriteAtDestination"></span>
                            <span id="viewOverwriteAtDestinationHelpDesc" hidden={true}>{"Overwrite At Destination"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="viewCompressAtDestination_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Compress At Destination"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" id="viewCompressAtDestination" ignoredirtydata="False" name="CompressAtDestination" not-data-val-required="Compress At Destination is a required field." type="checkbox" defaultValue="true" aria-describedby="viewCompressAtDestinationHelpDesc" style={{}} />
                              </span>
                            <label htmlFor="viewCompressAtDestination" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Compress At Destination"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Compress At Destination" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="CompressAtDestination" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewCompressAtDestinationHelp" role="img" title="Compress At Destination" data-role="tooltip" data-kit-tip="Compress At Destination" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="viewCompressAtDestination_validationMessage" data-for="viewCompressAtDestination"></span>
                            <span id="viewCompressAtDestinationHelpDesc" hidden={true}>{"Compress At Destination"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="viewDestinationIsArchive_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Destination Is Archive"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" id="viewDestinationIsArchive" ignoredirtydata="False" name="DestinationIsArchive" not-data-val-required="Destination Is Archive is a required field." type="checkbox" defaultValue="true" aria-describedby="viewDestinationIsArchiveHelpDesc" style={{}} />
                              </span>
                            <label htmlFor="viewDestinationIsArchive" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Destination Is Archive"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Destination Is Archive" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="DestinationIsArchive" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewDestinationIsArchiveHelp" role="img" title="Destination Is Archive" data-role="tooltip" data-kit-tip="Destination Is Archive" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="viewDestinationIsArchive_validationMessage" data-for="viewDestinationIsArchive"></span>
                            <span id="viewDestinationIsArchiveHelpDesc" hidden={true}>{"Destination Is Archive"}</span>
                            </div>
                          </div>{" "}</div>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="viewRenameAtDestination_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Rename At Destination"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" id="viewRenameAtDestination" ignoredirtydata="False" name="RenameAtDestination" not-data-val-required="Rename At Destination is a required field." type="checkbox" defaultValue="true" aria-describedby="viewRenameAtDestinationHelpDesc" style={{}} />
                              </span>
                            <label htmlFor="viewRenameAtDestination" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Rename At Destination"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Rename At Destination" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="RenameAtDestination" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewRenameAtDestinationHelp" role="img" title="Rename At Destination" data-role="tooltip" data-kit-tip="Rename At Destination" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="viewRenameAtDestination_validationMessage" data-for="viewRenameAtDestination"></span>
                            <span id="viewRenameAtDestinationHelpDesc" hidden={true}>{"Rename At Destination"}</span>
                            </div>
                          </div>{" "}<div id="divDestinationRenamePatternId">{" "}<div className="col-md-3 editor-col" id="viewRenamePatternList_parent" data-template="ListItemSingle">
                            <div className="editor-label">
                              <label htmlFor="viewRenamePattern" id="viewRenamePatternLabel" readOnly={true} className="readonly-label" title="Rename Pattern">{"Rename Pattern"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewRenamePatternHelp" role="img" title="Rename Pattern" data-role="tooltip" data-kit-tip="Rename Pattern" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">
                              <label id="RenamePatternListTextLabel" htmlFor="RenamePatternListText" className="display-none">{"RenamePatternListText"}</label>
                              <input readOnly={true} className="k-textbox editor-control" id="RenamePatternListText" name="RenamePatternListText" defaultValue="" aria-labelledby="viewRenamePatternLabel" />
                              <div style={{"display": "none"}}>{" "}<span title="" className="k-picker k-dropdownlist editor-control readonly-widget readonly-cursor" unselectable="on" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-readonly="true" aria-controls="viewRenamePatternList_listbox" aria-busy="false" aria-describedby="9b416650-e12e-4ee5-827a-3a77d5669f55" aria-labelledby="viewRenamePatternLabel viewRenamePatternHelpDesc" data-kit="k30" style={{}}>
                                  <span id="9b416650-e12e-4ee5-827a-3a77d5669f55" unselectable="on" className="k-input-inner display-none">
                                    <span className="k-input-value-text">{"select a value..."}</span>
                                    </span>
                                  <button role="button" tabIndex={-1} className="k-input-button k-button k-icon-button" aria-label="select" type="button">
                                    <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon display-none-priority">
                                      <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 352 128 160h256z" />
                                        </svg>
                                      </span>
                                    </button>
                                  <label id="viewRenamePatternListLabel" htmlFor="viewRenamePatternList" className="display-none">{"viewRenamePatternList"}</label>
                                  <input readOnly={true} isclonedisplayfor="true" className="editor-control" data-val="true" data-val-length-max="Rename Pattern has a maximum length of 50 characters." data-val-required="Rename Pattern is a required field." id="viewRenamePatternList" ignoredirtydata="False" listviewdatalistcontentid="FileTransfer.DataList.RenamePattern" listviewdisplayformat="Name" maxLength={50} name="RenamePatternList" propertydefinitioncachekey="PD-HP.HSP.UA3.FileTransfer.UX.Data.FileTransfer.DestinationConfigurationModel-/FileTransfer/FileTransferConfigurationView-Desktop-RenamePattern" type="text" data-role="dropdownlist" aria-labelledby="viewRenamePatternListLabel" style={{"display": "none"}} />
                                  </span>{" "}<label id="viewRenamePattern_IDLabel" htmlFor="viewRenamePattern_ID" className="display-none">{"viewRenamePattern_ID"}</label>
                                <input readOnly={true} id="viewRenamePattern_ID" name="RenamePattern.ID" type="hidden" defaultValue="" aria-labelledby="viewRenamePattern_IDLabel" />{" "}<label id="viewRenamePattern_NameLabel" htmlFor="viewRenamePattern_Name" className="display-none">{"viewRenamePattern_Name"}</label>
                                <input readOnly={true} id="viewRenamePattern_Name" name="RenamePattern.Name" type="hidden" defaultValue="" aria-labelledby="viewRenamePattern_NameLabel" />{" "}<label id="viewRenamePattern_DisplayFormatLabel" htmlFor="viewRenamePattern_DisplayFormat" className="display-none">{"viewRenamePattern_DisplayFormat"}</label>
                                <input readOnly={true} id="viewRenamePattern_DisplayFormat" name="RenamePattern.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="viewRenamePattern_DisplayFormatLabel" />
                                </div>
                              <span className="k-invalid-msg" id="viewRenamePatternList_validationMessage" data-for="viewRenamePatternList"></span>
                              <span id="viewRenamePatternHelpDesc" hidden={true}>{"Rename Pattern"}</span>
                              </div>
                            </div>{" "}</div>{" "}<div className="col-md-3 editor-col" id="viewActive_parent">
                          <div className="editor-label">
                            <label readOnly={true}>{"Active"}</label>
                            </div>
                          <div className="editor-field assoc-box-checkbox readonly-widget" tabIndex={0}>
                            <span className="k-checkbox-wrap">
                              <input readOnly={true} disabled={true} className="editor-control k-checkbox k-disabled display-none-priority" data-role="checkbox" id="viewActive" ignoredirtydata="False" name="Active" not-data-val-required="Active is a required field." type="checkbox" defaultValue="true" aria-describedby="viewActiveHelpDesc" style={{}} />
                              </span>
                            <label htmlFor="viewActive" className="k-checkbox-label k-disabled display-none-priority" style={{}}>{"Active"}</label>
                            <input className="readonly-k-checkbox-label" aria-label="Active" defaultValue="No" readOnly={true} />
                            <input readOnly={true} disabled={true} name="Active" type="hidden" defaultValue="false" />
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewActiveHelp" role="img" title="Active" data-role="tooltip" data-kit-tip="Active" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            <span className="k-invalid-msg" id="viewActive_validationMessage" data-for="viewActive"></span>
                            <span id="viewActiveHelpDesc" hidden={true}>{"Active"}</span>
                            </div>
                          </div>{" "}</div>{" "}<div className="clear-n-pad">{" "}</div>{" "}<div id="DestinationConfigurationViewButtons">
                        <div id="DestinationConfigurationViewFormButtonRow" className="editor-button-row">
                          <span className="editor-button-nav">
                            <input id="closeDestinationConfigurationButton" type="button" value="Close" className="cancel k-button btn-spacer-left primary-button" data-kit-action="close" />
                            </span>
                          </div>
                        </div>{" "}<div className="rowpad"></div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}</fieldset>{" "}</div>{" "}</div>{" "}</div>{" "}</div>
      </form>{" "}</div>{" "}</div></>
  );
}
