// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { KitWidget } from '../../../kit';
// Dialog d2 "View File Transfer Configuration" of fxfer-v7/file-transfer-configuration: ported from packs/fxfer-v7/screens/file-transfer-configuration/kit/dialogs/d2.html.
export default function DialogD2() {
  return (
    <><div id="FileTransferConfigurationViewOverlay_content" className="loading">{" "}<div id="FileTransferConfigurationViewOverlay_body">{" "}<form action="/FileTransfer/FileTransferConfigurationView" id="FileTransferConfigurationViewForm" method="post" name="FileTransferConfigurationViewForm" data-role="validator" noValidate={true}>
      <input name="__RequestVerificationToken" type="hidden" defaultValue="pZRdX1XhOFO8vbMj5OS4SsHMbhV9dPW3HyqmZ1bh2G8zhf7ipfnQ_A7oMWhcsMoc0r5UmGyoGVopVODYCjDmBdFQ1zolHApzMtDISllgbBkZ74RmgZcYUp8v6f9WN8DDkXJ5kuWi9jIMtgJYeXohWA2" />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" data-kit-h="h67">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="">{" "}<div className="">{" "}<div className="panel-body-modal">{" "}<div className="editor-section">{" "}<fieldset>{" "}<div id="divFileTransferConfigurationView">{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                                    Source Configuration\n                                "}</div>{" "}<div className="content-panel-bdy panel-body col-md-12 assoc-box editor-section row">{" "}<div className="col-md-3 editor-col" id="eft_ConfigName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_ConfigName" id="eft_ConfigNameLabel" readOnly={true} className="readonly-label" title="Configuration Name">{"Configuration Name"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_ConfigNameHelp" role="img" title="Configuration Name" data-role="tooltip" data-kit-tip="Configuration Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget readonly-widget-focus" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Configuration Name has a maximum length of 50 characters." data-val-regex="Configuration Name is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" data-val-required="Configuration Name is a required field." height="0" id="eft_ConfigName" ignoredirtydata="False" maxLength={50} name="ConfigName" defaultValue="Test" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_ConfigNameLabel eft_ConfigNameHelpDesc" data-kit-autofocus="" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_ConfigName_validationMessage" data-for="eft_ConfigName"></span>
                          <span id="eft_ConfigNameHelpDesc" hidden={true} data-kit-h="h68">{"Configuration Name"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_Description_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_Description" id="eft_DescriptionLabel" readOnly={true} className="readonly-label" title="Description">{"Description"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_DescriptionHelp" role="img" title="Description" data-role="tooltip" data-kit-tip="Description" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Description has a maximum length of 200 characters." height="0" id="eft_Description" ignoredirtydata="False" maxLength={200} name="Description" not-data-val-required="Description is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_DescriptionLabel eft_DescriptionHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_Description_validationMessage" data-for="eft_Description"></span>
                          <span id="eft_DescriptionHelpDesc" hidden={true} data-kit-h="h69">{"Description"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_ProtocolTypeList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="eft_ProtocolType" id="eft_ProtocolTypeLabel" readOnly={true} className="readonly-label" title="Protocol">{"Protocol"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_ProtocolTypeHelp" role="img" title="Protocol" data-role="tooltip" data-kit-tip="Protocol" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <label id="ProtocolTypeListTextLabel" htmlFor="ProtocolTypeListText" className="display-none">{"ProtocolTypeListText"}</label>
                          <input readOnly={true} className="k-textbox editor-control" id="ProtocolTypeListText" name="ProtocolTypeListText" defaultValue="FTP" aria-labelledby="eft_ProtocolTypeLabel" />
                          <div style={{"display": "none"}} data-kit-h="h70">{" "}<KitWidget id="k33" />{" "}<label id="eft_ProtocolType_IDLabel" htmlFor="eft_ProtocolType_ID" className="display-none">{"eft_ProtocolType_ID"}</label>
                            <input readOnly={true} id="eft_ProtocolType_ID" name="ProtocolType.ID" type="hidden" defaultValue="1" aria-labelledby="eft_ProtocolType_IDLabel" />{" "}<label id="eft_ProtocolType_NameLabel" htmlFor="eft_ProtocolType_Name" className="display-none">{"eft_ProtocolType_Name"}</label>
                            <input readOnly={true} id="eft_ProtocolType_Name" name="ProtocolType.Name" type="hidden" defaultValue="FTP" aria-labelledby="eft_ProtocolType_NameLabel" />{" "}<label id="eft_ProtocolType_DisplayFormatLabel" htmlFor="eft_ProtocolType_DisplayFormat" className="display-none">{"eft_ProtocolType_DisplayFormat"}</label>
                            <input readOnly={true} id="eft_ProtocolType_DisplayFormat" name="ProtocolType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_ProtocolType_DisplayFormatLabel" />
                            </div>
                          <span className="k-invalid-msg" id="eft_ProtocolTypeList_validationMessage" data-for="eft_ProtocolTypeList"></span>
                          <span id="eft_ProtocolTypeHelpDesc" hidden={true} data-kit-h="h71">{"Protocol"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_FTPServerName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_FTPServerName" id="eft_FTPServerNameLabel" readOnly={true} className="readonly-label" title="Server">{"Server"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_FTPServerNameHelp" role="img" title="Server" data-role="tooltip" data-kit-tip="Server" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-required="Server is a required field." height="0" id="eft_FTPServerName" ignoredirtydata="False" name="FTPServerName" defaultValue="SFTP TEST" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_FTPServerNameLabel eft_FTPServerNameHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_FTPServerName_validationMessage" data-for="eft_FTPServerName"></span>
                          <span id="eft_FTPServerNameHelpDesc" hidden={true} data-kit-h="h72">{"Server"}</span>
                          </div>
                        </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="eft_SourceAddress_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_SourceAddress" id="eft_SourceAddressLabel" readOnly={true} className="readonly-label" title="Source Address">{"Source Address"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_SourceAddressHelp" role="img" title="Source Address" data-role="tooltip" data-kit-tip="Source Address" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Source Address has a maximum length of 248 characters." data-val-required="Source Address is a required field." height="0" id="eft_SourceAddress" ignoredirtydata="False" maxLength={248} name="SourceAddress" defaultValue="/test" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_SourceAddressLabel eft_SourceAddressHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_SourceAddress_validationMessage" data-for="eft_SourceAddress"></span>
                          <span id="eft_SourceAddressHelpDesc" hidden={true} data-kit-h="h73">{"Source Address"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_SourceFileMask_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_SourceFileMask" id="eft_SourceFileMaskLabel" readOnly={true} className="readonly-label" title="Source File Mask">{"Source File Mask"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_SourceFileMaskHelp" role="img" title="Source File Mask" data-role="tooltip" data-kit-tip="Source File Mask" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Source File Mask has a maximum length of 50 characters." data-val-required="Source File Mask is a required field." height="0" id="eft_SourceFileMask" ignoredirtydata="False" maxLength={50} name="SourceFileMask" defaultValue="wer" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_SourceFileMaskLabel eft_SourceFileMaskHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_SourceFileMask_validationMessage" data-for="eft_SourceFileMask"></span>
                          <span id="eft_SourceFileMaskHelpDesc" hidden={true} data-kit-h="h74">{"Source File Mask"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_FileDirectionList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="eft_FileDirection" id="eft_FileDirectionLabel" readOnly={true} className="readonly-label" title="File Direction">{"File Direction"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_FileDirectionHelp" role="img" title="File Direction" data-role="tooltip" data-kit-tip="File Direction" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <label id="FileDirectionListTextLabel" htmlFor="FileDirectionListText" className="display-none">{"FileDirectionListText"}</label>
                          <input readOnly={true} className="k-textbox editor-control" id="FileDirectionListText" name="FileDirectionListText" defaultValue="" aria-labelledby="eft_FileDirectionLabel" />
                          <div style={{"display": "none"}} data-kit-h="h75">{" "}<KitWidget id="k34" />{" "}<label id="eft_FileDirection_IDLabel" htmlFor="eft_FileDirection_ID" className="display-none">{"eft_FileDirection_ID"}</label>
                            <input readOnly={true} id="eft_FileDirection_ID" name="FileDirection.ID" type="hidden" defaultValue="" aria-labelledby="eft_FileDirection_IDLabel" />{" "}<label id="eft_FileDirection_NameLabel" htmlFor="eft_FileDirection_Name" className="display-none">{"eft_FileDirection_Name"}</label>
                            <input readOnly={true} id="eft_FileDirection_Name" name="FileDirection.Name" type="hidden" defaultValue="" aria-labelledby="eft_FileDirection_NameLabel" />{" "}<label id="eft_FileDirection_DisplayFormatLabel" htmlFor="eft_FileDirection_DisplayFormat" className="display-none">{"eft_FileDirection_DisplayFormat"}</label>
                            <input readOnly={true} id="eft_FileDirection_DisplayFormat" name="FileDirection.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_FileDirection_DisplayFormatLabel" />
                            </div>
                          <span className="k-invalid-msg" id="eft_FileDirectionList_validationMessage" data-for="eft_FileDirectionList"></span>
                          <span id="eft_FileDirectionHelpDesc" hidden={true} data-kit-h="h76">{"File Direction"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_TradingPartner_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_TradingPartner" id="eft_TradingPartnerLabel" readOnly={true} className="readonly-label" title="Trading Partner">{"Trading Partner"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_TradingPartnerHelp" role="img" title="Trading Partner" data-role="tooltip" data-kit-tip="Trading Partner" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val-length-max="Trading Partner has a maximum length of 10 characters." data-val-regex="Trading Partner is restricted to alphanumeric characters only [A-Z], [a-z], [0-9]." data-val-regex-pattern="^([A-Za-z0-9]|[^\\x00-\\x7F])*$" height="0" id="eft_TradingPartner" ignoredirtydata="False" maxLength={10} name="TradingPartner" not-data-val-required="Trading Partner is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_TradingPartnerLabel eft_TradingPartnerHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_TradingPartner_validationMessage" data-for="eft_TradingPartner"></span>
                          <span id="eft_TradingPartnerHelpDesc" hidden={true} data-kit-h="h77">{"Trading Partner"}</span>
                          </div>
                        </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerName_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerName" id="eft_OwnerNameLabel" readOnly={true} className="readonly-label" title="Owner Name">{"Owner Name"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerNameHelp" role="img" title="Owner Name" data-role="tooltip" data-kit-tip="Owner Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Owner Name has a maximum length of 50 characters." data-val-required="Owner Name is a required field." height="0" id="eft_OwnerName" ignoredirtydata="False" maxLength={50} name="OwnerName" defaultValue="yashwanth" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_OwnerNameLabel eft_OwnerNameHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_OwnerName_validationMessage" data-for="eft_OwnerName"></span>
                          <span id="eft_OwnerNameHelpDesc" hidden={true} data-kit-h="h78">{"Owner Name"}</span>
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
                          <span id="eft_OwnerPhoneNumberHelpDesc" hidden={true} data-kit-h="h79">{"Owner Phone"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerSubsystemList_parent" data-template="ListItemSingle">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerSubsystem" id="eft_OwnerSubsystemLabel" readOnly={true} className="readonly-label" title="Owner Module">{"Owner Module"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerSubsystemHelp" role="img" title="Owner Module" data-role="tooltip" data-kit-tip="Owner Module" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">
                          <label id="OwnerSubsystemListTextLabel" htmlFor="OwnerSubsystemListText" className="display-none">{"OwnerSubsystemListText"}</label>
                          <input readOnly={true} className="k-textbox editor-control" id="OwnerSubsystemListText" name="OwnerSubsystemListText" defaultValue="Administration" aria-labelledby="eft_OwnerSubsystemLabel" />
                          <div style={{"display": "none"}} data-kit-h="h80">{" "}<KitWidget id="k35" />{" "}<label id="eft_OwnerSubsystem_IDLabel" htmlFor="eft_OwnerSubsystem_ID" className="display-none">{"eft_OwnerSubsystem_ID"}</label>
                            <input readOnly={true} id="eft_OwnerSubsystem_ID" name="OwnerSubsystem.ID" type="hidden" defaultValue="0B34481F-F69C-3AB6-E053-C9157ACEFF03" aria-labelledby="eft_OwnerSubsystem_IDLabel" />{" "}<label id="eft_OwnerSubsystem_NameLabel" htmlFor="eft_OwnerSubsystem_Name" className="display-none">{"eft_OwnerSubsystem_Name"}</label>
                            <input readOnly={true} id="eft_OwnerSubsystem_Name" name="OwnerSubsystem.Name" type="hidden" defaultValue="Administration" aria-labelledby="eft_OwnerSubsystem_NameLabel" />{" "}<label id="eft_OwnerSubsystem_DisplayFormatLabel" htmlFor="eft_OwnerSubsystem_DisplayFormat" className="display-none">{"eft_OwnerSubsystem_DisplayFormat"}</label>
                            <input readOnly={true} id="eft_OwnerSubsystem_DisplayFormat" name="OwnerSubsystem.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_OwnerSubsystem_DisplayFormatLabel" />
                            </div>
                          <span className="k-invalid-msg" id="eft_OwnerSubsystemList_validationMessage" data-for="eft_OwnerSubsystemList"></span>
                          <span id="eft_OwnerSubsystemHelpDesc" hidden={true} data-kit-h="h81">{"Owner Module"}</span>
                          </div>
                        </div>{" "}<div className="col-md-3 editor-col" id="eft_OwnerEmail_parent" data-template="Text">
                        <div className="editor-label">
                          <label htmlFor="eft_OwnerEmail" id="eft_OwnerEmailLabel" readOnly={true} className="readonly-label" title="Owner Email">{"Owner Email"}</label>
                          <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_OwnerEmailHelp" role="img" title="Owner Email" data-role="tooltip" data-kit-tip="Owner Email" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                          </div>
                        <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                            <input readOnly={true} className="editor-control k-input-inner readonly-widget" data-email-msg="Owner Email is not a valid email address. Enter email with 'name@domain' format." data-val="true" data-val-length-max="Owner Email has a maximum length of 150 characters." data-val-regex="Owner Email is not a valid email address. Enter email with 'name@domain' format." data-val-regex-pattern="^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]+[\\w-]+\\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,62}$" data-val-required="Owner Email is a required field." height="0" id="eft_OwnerEmail" ignoredirtydata="False" maxLength={150} name="OwnerEmail" defaultValue="yashwanth.goduguchintha@dxc.com" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_OwnerEmailLabel eft_OwnerEmailHelpDesc" />
                            </span>{" "}<span className="k-invalid-msg" id="eft_OwnerEmail_validationMessage" data-for="eft_OwnerEmail"></span>
                          <span id="eft_OwnerEmailHelpDesc" hidden={true} data-kit-h="h82">{"Owner Email"}</span>
                          </div>
                        </div>{" "}<div className="clear-both"></div>{" "}<div className="col-md-12 assoc-box editor-section row">{" "}<div className="col-md-12 assoc-box editor-section row">{" "}<div className="col-md-4 editor-col list-horizontal editor-clear" id="eft_RunSchedule_parent" data-template="RadioButtonList">
                            <div className="editor-label">
                              <label htmlFor="eft_RunSchedule" id="eft_RunScheduleLabel" readOnly={true} className="readonly-label" title="Run Schedule">{"Run Schedule"}</label>
                              <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunScheduleHelp" role="img" title="Run Schedule" data-role="tooltip" data-kit-tip="Run Schedule" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                              </div>
                            <div className="editor-field">{" "}<div className="assoc-box-radio-btn-list-horz readonly-widget" tabIndex={0}>{" "}<span className="list-item display-none-priority" data-kit-h="h83">
                                  <input readOnly={true} className="k-radio" id="eft_RunSchedule_ID1" name="RunSchedule.ID" type="radio" defaultValue="1" defaultChecked={true} ignoredirtydata="False" aria-describedby="eft_RunScheduleHelpDesc" />
                                  <label className="k-radio-label" htmlFor="eft_RunSchedule_ID1">{"Run Weekly"}</label>
                                  </span>
                                <span className="list-item display-none-priority" data-kit-h="h84">
                                  <input readOnly={true} className="k-radio" id="eft_RunSchedule_ID2" name="RunSchedule.ID" type="radio" defaultValue="2" ignoredirtydata="False" aria-describedby="eft_RunScheduleHelpDesc" />
                                  <label className="k-radio-label" htmlFor="eft_RunSchedule_ID2">{"Run Monthly"}</label>
                                  </span>{" "}<label className="readonly-k-radio-label">{"Run Weekly"}</label>
                                </div>{" "}<span className="k-invalid-msg" id="eft_RunSchedule_validationMessage" data-for="eft_RunSchedule"></span>
                              <span id="eft_RunScheduleHelpDesc" hidden={true} data-kit-h="h85">{"Run Schedule"}</span>
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
                                <span id="eft_RunOnSundayHelpDesc" hidden={true} data-kit-h="h86">{"Run Sunday"}</span>
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
                                <span id="eft_RunOnMondayHelpDesc" hidden={true} data-kit-h="h87">{"Run Monday"}</span>
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
                                <span id="eft_RunOnTuesdayHelpDesc" hidden={true} data-kit-h="h88">{"Run Tuesday"}</span>
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
                                <span id="eft_RunOnWednesdayHelpDesc" hidden={true} data-kit-h="h89">{"Run Wednesday"}</span>
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
                                <span id="eft_RunOnThursdayHelpDesc" hidden={true} data-kit-h="h90">{"Run Thursday"}</span>
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
                                <span id="eft_RunOnFridayHelpDesc" hidden={true} data-kit-h="h91">{"Run Friday"}</span>
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
                                <span id="eft_RunOnSaturdayHelpDesc" hidden={true} data-kit-h="h92">{"Run Saturday"}</span>
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
                                <span id="eft_RunOnFirstDayHelpDesc" hidden={true} data-kit-h="h93">{"Run On First Day Month"}</span>
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
                                <span id="eft_RunOnLastDayHelpDesc" hidden={true} data-kit-h="h94">{"Run On Last Day Month"}</span>
                                </div>
                              </div>{" "}<div className="col-md-3 editor-col" id="eft_RunOnThisDayList_parent" data-template="ListItemSingle">
                              <div className="editor-label">
                                <label htmlFor="eft_RunOnThisDay" id="eft_RunOnThisDayLabel" readOnly={true} className="readonly-label" title="Run On This Day Month">{"Run On This Day Month"}</label>
                                <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_RunOnThisDayHelp" role="img" title="Run On This Day Month" data-role="tooltip" data-kit-tip="Run On This Day Month" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                                </div>
                              <div className="editor-field">
                                <label id="RunOnThisDayListTextLabel" htmlFor="RunOnThisDayListText" className="display-none">{"RunOnThisDayListText"}</label>
                                <input readOnly={true} className="k-textbox editor-control" id="RunOnThisDayListText" name="RunOnThisDayListText" defaultValue="" aria-labelledby="eft_RunOnThisDayLabel" />
                                <div style={{"display": "none"}} data-kit-h="h95">{" "}<KitWidget id="k36" />{" "}<label id="eft_RunOnThisDay_IDLabel" htmlFor="eft_RunOnThisDay_ID" className="display-none">{"eft_RunOnThisDay_ID"}</label>
                                  <input readOnly={true} id="eft_RunOnThisDay_ID" name="RunOnThisDay.ID" type="hidden" defaultValue="0" aria-labelledby="eft_RunOnThisDay_IDLabel" />{" "}<label id="eft_RunOnThisDay_NameLabel" htmlFor="eft_RunOnThisDay_Name" className="display-none">{"eft_RunOnThisDay_Name"}</label>
                                  <input readOnly={true} id="eft_RunOnThisDay_Name" name="RunOnThisDay.Name" type="hidden" defaultValue="" aria-labelledby="eft_RunOnThisDay_NameLabel" />{" "}<label id="eft_RunOnThisDay_DisplayFormatLabel" htmlFor="eft_RunOnThisDay_DisplayFormat" className="display-none">{"eft_RunOnThisDay_DisplayFormat"}</label>
                                  <input readOnly={true} id="eft_RunOnThisDay_DisplayFormat" name="RunOnThisDay.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_RunOnThisDay_DisplayFormatLabel" />
                                  </div>
                                <span className="k-invalid-msg" id="eft_RunOnThisDayList_validationMessage" data-for="eft_RunOnThisDayList"></span>
                                <span id="eft_RunOnThisDayHelpDesc" hidden={true} data-kit-h="h96">{"Run On This Day Month"}</span>
                                </div>
                              </div>{" "}</div>{" "}</div>{" "}<div className="clear-both rowpad"></div>{" "}<div className="col-md-3 editor-col" id="eft_TimeWindowStartList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="eft_TimeWindowStart" id="eft_TimeWindowStartLabel" readOnly={true} className="readonly-label" title="Time Window Start">{"Time Window Start"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_TimeWindowStartHelp" role="img" title="Time Window Start" data-role="tooltip" data-kit-tip="Time Window Start" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <label id="TimeWindowStartListTextLabel" htmlFor="TimeWindowStartListText" className="display-none">{"TimeWindowStartListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="TimeWindowStartListText" name="TimeWindowStartListText" defaultValue="0000" aria-labelledby="eft_TimeWindowStartLabel" />
                            <div style={{"display": "none"}} data-kit-h="h97">{" "}<KitWidget id="k37" />{" "}<label id="eft_TimeWindowStart_IDLabel" htmlFor="eft_TimeWindowStart_ID" className="display-none">{"eft_TimeWindowStart_ID"}</label>
                              <input readOnly={true} id="eft_TimeWindowStart_ID" name="TimeWindowStart.ID" type="hidden" defaultValue="0000" aria-labelledby="eft_TimeWindowStart_IDLabel" />{" "}<label id="eft_TimeWindowStart_NameLabel" htmlFor="eft_TimeWindowStart_Name" className="display-none">{"eft_TimeWindowStart_Name"}</label>
                              <input readOnly={true} id="eft_TimeWindowStart_Name" name="TimeWindowStart.Name" type="hidden" defaultValue="0000" aria-labelledby="eft_TimeWindowStart_NameLabel" />{" "}<label id="eft_TimeWindowStart_DisplayFormatLabel" htmlFor="eft_TimeWindowStart_DisplayFormat" className="display-none">{"eft_TimeWindowStart_DisplayFormat"}</label>
                              <input readOnly={true} id="eft_TimeWindowStart_DisplayFormat" name="TimeWindowStart.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_TimeWindowStart_DisplayFormatLabel" />
                              </div>
                            <span className="k-invalid-msg" id="eft_TimeWindowStartList_validationMessage" data-for="eft_TimeWindowStartList"></span>
                            <span id="eft_TimeWindowStartHelpDesc" hidden={true} data-kit-h="h98">{"Time Window Start"}</span>
                            </div>
                          </div>{" "}<div className="col-md-3 editor-col" id="eft_TimeWindowEndList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="eft_TimeWindowEnd" id="eft_TimeWindowEndLabel" readOnly={true} className="readonly-label" title="Time Window End">{"Time Window End"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_TimeWindowEndHelp" role="img" title="Time Window End" data-role="tooltip" data-kit-tip="Time Window End" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <label id="TimeWindowEndListTextLabel" htmlFor="TimeWindowEndListText" className="display-none">{"TimeWindowEndListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="TimeWindowEndListText" name="TimeWindowEndListText" defaultValue="0030" aria-labelledby="eft_TimeWindowEndLabel" />
                            <div style={{"display": "none"}} data-kit-h="h99">{" "}<KitWidget id="k38" />{" "}<label id="eft_TimeWindowEnd_IDLabel" htmlFor="eft_TimeWindowEnd_ID" className="display-none">{"eft_TimeWindowEnd_ID"}</label>
                              <input readOnly={true} id="eft_TimeWindowEnd_ID" name="TimeWindowEnd.ID" type="hidden" defaultValue="0030" aria-labelledby="eft_TimeWindowEnd_IDLabel" />{" "}<label id="eft_TimeWindowEnd_NameLabel" htmlFor="eft_TimeWindowEnd_Name" className="display-none">{"eft_TimeWindowEnd_Name"}</label>
                              <input readOnly={true} id="eft_TimeWindowEnd_Name" name="TimeWindowEnd.Name" type="hidden" defaultValue="0030" aria-labelledby="eft_TimeWindowEnd_NameLabel" />{" "}<label id="eft_TimeWindowEnd_DisplayFormatLabel" htmlFor="eft_TimeWindowEnd_DisplayFormat" className="display-none">{"eft_TimeWindowEnd_DisplayFormat"}</label>
                              <input readOnly={true} id="eft_TimeWindowEnd_DisplayFormat" name="TimeWindowEnd.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="eft_TimeWindowEnd_DisplayFormatLabel" />
                              </div>
                            <span className="k-invalid-msg" id="eft_TimeWindowEndList_validationMessage" data-for="eft_TimeWindowEndList"></span>
                            <span id="eft_TimeWindowEndHelpDesc" hidden={true} data-kit-h="h100">{"Time Window End"}</span>
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
                            <span id="eft_SendNotificationHelpDesc" hidden={true} data-kit-h="h101">{"Send Notification"}</span>
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
                            <span id="eft_SuspendedHelpDesc" hidden={true} data-kit-h="h102">{"Suspend"}</span>
                            </div>
                          </div>{" "}<div className="col-md-1 editor-col" id="eft_Status_parent" data-template="Text">
                          <div className="editor-label">
                            <label htmlFor="eft_Status" id="eft_StatusLabel" readOnly={true} className="readonly-label" title="Status">{"Status"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="eft_StatusHelp" role="img" title="Status" data-role="tooltip" data-kit-tip="Status" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                              <input readOnly={true} className="editor-control k-input-inner readonly-widget" height="0" id="eft_Status" ignoredirtydata="False" name="Status" not-data-val-required="Status is a required field." defaultValue="Active" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="eft_StatusLabel eft_StatusHelpDesc" />
                              </span>{" "}<span className="k-invalid-msg" id="eft_Status_validationMessage" data-for="eft_Status"></span>
                            <span id="eft_StatusHelpDesc" hidden={true} data-kit-h="h103">{"Status"}</span>
                            </div>
                          </div>{" "}</div>{" "}</div>{" "}</div>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                                    Destination Configuration\n                                "}</div>{" "}<div className="content-panel-bdy">{" "}<KitWidget id="k39" />{" "}</div>{" "}</div>{" "}<div id="FileTransferConfigurationViewButtons">
                    <div id="FileTransferConfigurationViewFormButtonRow" className="editor-button-row">
                      <input id="editFileTransferConfigurationButton" type="button" value="Edit" className="cancel k-button btn-spacer-right" />
                      <span className="editor-button-nav">
                        <input id="closeFileTransferConfigurationButton" type="button" value="Close" className="cancel k-button btn-spacer-left" data-kit-action="close" />
                        </span>
                      </div>
                    </div>{" "}</div>{" "}<div id="divDestinationConfigurationView" data-kit-h="h104" style={{"display": "none"}}>{" "}<input name="__RequestVerificationToken" type="hidden" defaultValue="RBihGUNGjLUuLaXCDdwr2KcJz7ZwBtljqMaZRYbKdhnRm12Z_YjXnb1PRi6NDwKiujXOnyNv9ouCjyYwXUqer77diJd6N5Ci_9hYhXe8saoyhfBIQZw7T7ojQ24YK3UMa0detIgM20osrBDaocG4eg2" />{" "}<div id="DestinationConfigurationViewStatus"></div>{" "}<div className="editor-section">{" "}<fieldset>{" "}<div className="row">{" "}<div className="col-md-3 editor-col" id="viewDestinationProtocolList_parent" data-template="ListItemSingle">
                          <div className="editor-label">
                            <label htmlFor="viewDestinationProtocol" id="viewDestinationProtocolLabel" readOnly={true} className="readonly-label" title="Destination Protocol">{"Destination Protocol"}</label>
                            <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="viewDestinationProtocolHelp" role="img" title="Destination Protocol" data-role="tooltip" data-kit-tip="Destination Protocol" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                            </div>
                          <div className="editor-field">
                            <label id="DestinationProtocolListTextLabel" htmlFor="DestinationProtocolListText" className="display-none">{"DestinationProtocolListText"}</label>
                            <input readOnly={true} className="k-textbox editor-control" id="DestinationProtocolListText" name="DestinationProtocolListText" defaultValue="" aria-labelledby="viewDestinationProtocolLabel" />
                            <div style={{"display": "none"}}>{" "}<KitWidget id="k40" />{" "}<label id="viewDestinationProtocol_IDLabel" htmlFor="viewDestinationProtocol_ID" className="display-none">{"viewDestinationProtocol_ID"}</label>
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
                              <div style={{"display": "none"}}>{" "}<KitWidget id="k41" />{" "}<label id="viewFTPServer_IDLabel" htmlFor="viewFTPServer_ID" className="display-none">{"viewFTPServer_ID"}</label>
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
                            <div style={{"display": "none"}}>{" "}<KitWidget id="k42" />{" "}<label id="viewDestinationType_IDLabel" htmlFor="viewDestinationType_ID" className="display-none">{"viewDestinationType_ID"}</label>
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
                              <div style={{"display": "none"}}>{" "}<KitWidget id="k43" />{" "}<label id="viewContractName_IDLabel" htmlFor="viewContractName_ID" className="display-none">{"viewContractName_ID"}</label>
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
                              <div style={{"display": "none"}}>{" "}<KitWidget id="k44" />{" "}<label id="viewRenamePattern_IDLabel" htmlFor="viewRenamePattern_ID" className="display-none">{"viewRenamePattern_ID"}</label>
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
