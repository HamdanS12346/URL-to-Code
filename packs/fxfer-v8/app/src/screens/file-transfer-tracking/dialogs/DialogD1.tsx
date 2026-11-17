// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { KitWidget } from '../../../kit';
// Dialog d1 "File Transfer Tracking" of fxfer-v8/file-transfer-tracking: ported from packs/fxfer-v8/screens/file-transfer-tracking/kit/dialogs/d1.html.
export default function DialogD1() {
  return (
    <><div id="FileTransferTrackingViewPopup_content" className="loading">{" "}<div id="FileTransferTrackingViewPopup_body">{" "}<form action="/FileTransfer/FileTransferTrackingView" id="FileTransferTrackingViewForm" method="post" name="FileTransferTrackingViewForm" data-role="validator" noValidate={true}>
      <input name="__RequestVerificationToken" type="hidden" defaultValue="ZgAeGS6nErGOKK27M-nQcfvR2bhokdgIo9IFnM4mH4LGAKY7PQBiz_Jt1FiZ9bbc-WSxtzaD8RxVzQUHAZShfBDa6-7BpnfK_ZRt9QWNwwtTv7tH1eC6OrmBlruuBp1o-PAmE66lhEfvFSsSqFfY-A2" />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" data-kit-h="h3">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>
      <div className="" id="trackingViewPanel">{" "}<div id="divOverlayModelWrapper">{" "}<div className="modal-panel-hdr display-none" style={{"display": "none"}} data-kit-h="h4">{" "}<span>{"File Transfer Tracking"}</span>{" "}<a id="overlayCloseIcon" tabIndex={0}>
              <i className="fa-solid fa-circle-xmark float-right clickable overlay-icons" title="Close"></i>
              </a>{" "}</div>{" "}<div className="gm-container-modal" id="gmContainerModal" style={{"display": "none"}}></div>{" "}<div className="container clear-n-pad-top">{" "}<div id="validationSummaryOverlay" className="msg-inline msg-inline-error display-none" style={{"display": "none"}} data-kit-h="h5">{" "}<i className="msg-inline-icon fa-solid fa-circle-xmark"></i>{" "}<div id="ValSummClose" className="msg-inline-close panel-icon clickable" role="alert" data-hide-overlay="alert" aria-label="close" tabIndex={0}>{" "}<span className="fa-solid fa-circle-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n                    Resolve the following form field errors and try again. \n                    "}<ul id="validationErrorsOverlay"></ul>{" "}</div>{" "}</div>{" "}<label id="closeFunctionLabel" htmlFor="closeFunction" className="display-none">{"closeFunction"}</label>
          <input type="hidden" id="closeFunction" defaultValue="processFileTransfertrackingClose" aria-labelledby="closeFunctionLabel" />{" "}<label id="overlayTitleLabel" htmlFor="overlayTitle" className="display-none">{"overlayTitle"}</label>
          <input type="hidden" id="overlayTitle" defaultValue="File Transfer Tracking" aria-labelledby="overlayTitleLabel" />{" "}</div>{" "}<div className="">{" "}<div className="panel-body-modal">{" "}<div className="subsec-panel-hdr-topmost">{"\n                Information\n            "}</div>{" "}<div className="row">{" "}<div className="col-md-6 editor-col" id="Information.FileId_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_FileId" id="Information_FileIdLabel" readOnly={true} className="readonly-label" title="File ID">{"File ID"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_FileIdHelp" role="img" title="File ID" data-role="tooltip" data-kit-tip="File ID" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget readonly-widget-focus" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val-length-max="File ID has a maximum length of 50 characters." data-val-regex="File ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Information_FileId" ignoredirtydata="False" maxLength={50} name="Information.FileId" not-data-val-required="File ID is a required field." readOnly={true} defaultValue="0b3ad742-223b-4bc1-8b5b-867d8dfde039" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Information_FileIdLabel Information_FileIdHelpDesc" style={{"width": "100%"}} data-kit-autofocus="" />
                    </span>{" "}<span className="k-invalid-msg" id="Information_FileId_validationMessage" data-for="Information.FileId"></span>
                  <span id="Information_FileIdHelpDesc" hidden={true} data-kit-h="h6">{"File ID"}</span>
                  </div>
                </div>{" "}<div className="col-md-4 editor-col" id="Information.CreateDate_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_CreateDate" id="Information_CreateDateLabel" readOnly={true} className="readonly-label" title="Create Date">{"Create Date"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_CreateDateHelp" role="img" title="Create Date" data-role="tooltip" data-kit-tip="Create Date" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val="true" data-val-date="The field Create Date must be a date." data-val-datetime="Create Date must represent a valid date time in the format 'M/d/yyyy h:mm tt'." height="0" id="Information_CreateDate" ignoredirtydata="False" name="Information.CreateDate" not-data-val-required="Create Date is a required field." readOnly={true} defaultValue="5/25/2021 7:37:51 AM" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="Information_CreateDateLabel Information_CreateDateHelpDesc" />
                    </span>{" "}<span className="k-invalid-msg" id="Information_CreateDate_validationMessage" data-for="Information.CreateDate"></span>
                  <span id="Information_CreateDateHelpDesc" hidden={true} data-kit-h="h7">{"Create Date"}</span>
                  </div>
                </div>{" "}<div className="col-md-2 editor-col" id="Information.DirectionList_parent" data-template="ListItemSingle">
                <div className="editor-label">
                  <label htmlFor="Information_Direction" id="Information_DirectionLabel" readOnly={true} className="readonly-label" title="Direction">{"Direction"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_DirectionHelp" role="img" title="Direction" data-role="tooltip" data-kit-tip="Direction" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">
                  <label id="Information_DirectionListTextLabel" htmlFor="Information_DirectionListText" className="display-none">{"Information_DirectionListText"}</label>
                  <input className="k-textbox editor-control" id="Information_DirectionListText" name="Information.DirectionListText" readOnly={true} defaultValue="OUTBOUND" aria-labelledby="Information_DirectionLabel" />
                  <div style={{"display": "none"}} data-kit-h="h8">{" "}<KitWidget id="k10" />{" "}<label id="Information_Direction_IDLabel" htmlFor="Information_Direction_ID" className="display-none">{"Information_Direction_ID"}</label>
                    <input id="Information_Direction_ID" name="Information.Direction.ID" type="hidden" defaultValue="2" aria-labelledby="Information_Direction_IDLabel" />{" "}<label id="Information_Direction_NameLabel" htmlFor="Information_Direction_Name" className="display-none">{"Information_Direction_Name"}</label>
                    <input id="Information_Direction_Name" name="Information.Direction.Name" type="hidden" defaultValue="OUTBOUND" aria-labelledby="Information_Direction_NameLabel" />{" "}<label id="Information_Direction_DisplayFormatLabel" htmlFor="Information_Direction_DisplayFormat" className="display-none">{"Information_Direction_DisplayFormat"}</label>
                    <input id="Information_Direction_DisplayFormat" name="Information.Direction.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="Information_Direction_DisplayFormatLabel" />
                    </div>
                  <span className="k-invalid-msg" id="Information_DirectionList_validationMessage" data-for="Information.DirectionList"></span>
                  <span id="Information_DirectionHelpDesc" hidden={true} data-kit-h="h9">{"Direction"}</span>
                  </div>
                </div>{" "}<div className="col-md-5 editor-col editor-clear" id="Information.FileName_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_FileName" id="Information_FileNameLabel" readOnly={true} className="readonly-label" title="File Name">{"File Name"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_FileNameHelp" role="img" title="File Name" data-role="tooltip" data-kit-tip="File Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val-length-max="File Name has a maximum length of 100 characters." data-val-regex="File Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Information_FileName" ignoredirtydata="False" maxLength={100} name="Information.FileName" not-data-val-required="File Name is a required field." readOnly={true} defaultValue="\\\\mapsftshrfs01\\CommercialSharedFolder\\ProgramIntegrityCT\\CaseListRefresh\\Batch\\Output\\CaseTrackingInput_20210518.csv" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Information_FileNameLabel Information_FileNameHelpDesc" style={{"width": "100%"}} />
                    </span>{" "}<span className="k-invalid-msg" id="Information_FileName_validationMessage" data-for="Information.FileName"></span>
                  <span id="Information_FileNameHelpDesc" hidden={true} data-kit-h="h10">{"File Name"}</span>
                  </div>
                </div>{" "}<div className="col-md-3 editor-col" id="Information.Size_parent" data-template="">
                <div className="editor-label">
                  <label htmlFor="Information_Size" id="Information_SizeLabel" readOnly={true} className="readonly-label" title="Size (KB)">{"Size (KB)"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_SizeHelp" role="img" title="Size (KB)" data-role="tooltip" data-kit-tip="Size (KB)" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val="true" data-val-length-max="Size (KB) has a maximum length of 15 characters." data-val-number="Size (KB) is restricted to numeric values with at most 2 decimal places." data-val-regex="Size (KB) is restricted to numeric values with at most 2 decimal places." data-val-regex-pattern="^[+-]?(?=\\d|\\.\\d{0,2})\\d*(\\.\\d{0,2})?$" height="0" id="Information_Size" ignoredirtydata="False" maxLength={15} name="Information.Size" not-data-val-required="Size (KB) is a required field." readOnly={true} defaultValue="0" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="Information_SizeLabel Information_SizeHelpDesc" />
                    </span>{" "}<span className="k-invalid-msg" id="Information_Size_validationMessage" data-for="Information.Size"></span>
                  <span id="Information_SizeHelpDesc" hidden={true} data-kit-h="h11">{"Size (KB)"}</span>
                  </div>
                </div>{" "}<div className="col-md-4 editor-col" id="Information.CheckSumCode_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_CheckSumCode" id="Information_CheckSumCodeLabel" readOnly={true} className="readonly-label" title="Check Sum Code">{"Check Sum Code"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_CheckSumCodeHelp" role="img" title="Check Sum Code" data-role="tooltip" data-kit-tip="Check Sum Code" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val-length-max="Check Sum Code has a maximum length of 50 characters." id="Information_CheckSumCode" ignoredirtydata="False" maxLength={50} name="Information.CheckSumCode" not-data-val-required="Check Sum Code is a required field." readOnly={true} data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Information_CheckSumCodeLabel Information_CheckSumCodeHelpDesc" style={{"width": "100%"}} />
                    </span>{" "}<span className="k-invalid-msg" id="Information_CheckSumCode_validationMessage" data-for="Information.CheckSumCode"></span>
                  <span id="Information_CheckSumCodeHelpDesc" hidden={true} data-kit-h="h12">{"Check Sum Code"}</span>
                  </div>
                </div>{" "}<div className="col-md-3 editor-col editor-clear" id="Information.FileStatusList_parent" data-template="ListItemSingle">
                <div className="editor-label">
                  <label htmlFor="Information_FileStatus" id="Information_FileStatusLabel" readOnly={true} className="readonly-label" title="File Status">{"File Status"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_FileStatusHelp" role="img" title="File Status" data-role="tooltip" data-kit-tip="File Status" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">
                  <label id="Information_FileStatusListTextLabel" htmlFor="Information_FileStatusListText" className="display-none">{"Information_FileStatusListText"}</label>
                  <input className="k-textbox editor-control" id="Information_FileStatusListText" name="Information.FileStatusListText" readOnly={true} defaultValue="Complete" aria-labelledby="Information_FileStatusLabel" />
                  <div style={{"display": "none"}} data-kit-h="h13">{" "}<KitWidget id="k11" />{" "}<label id="Information_FileStatus_IDLabel" htmlFor="Information_FileStatus_ID" className="display-none">{"Information_FileStatus_ID"}</label>
                    <input id="Information_FileStatus_ID" name="Information.FileStatus.ID" type="hidden" defaultValue="1" aria-labelledby="Information_FileStatus_IDLabel" />{" "}<label id="Information_FileStatus_NameLabel" htmlFor="Information_FileStatus_Name" className="display-none">{"Information_FileStatus_Name"}</label>
                    <input id="Information_FileStatus_Name" name="Information.FileStatus.Name" type="hidden" defaultValue="Complete" aria-labelledby="Information_FileStatus_NameLabel" />{" "}<label id="Information_FileStatus_DisplayFormatLabel" htmlFor="Information_FileStatus_DisplayFormat" className="display-none">{"Information_FileStatus_DisplayFormat"}</label>
                    <input id="Information_FileStatus_DisplayFormat" name="Information.FileStatus.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="Information_FileStatus_DisplayFormatLabel" />
                    </div>
                  <span className="k-invalid-msg" id="Information_FileStatusList_validationMessage" data-for="Information.FileStatusList"></span>
                  <span id="Information_FileStatusHelpDesc" hidden={true} data-kit-h="h14">{"File Status"}</span>
                  </div>
                </div>{" "}<div className="col-md-3 editor-col" id="Information.TransportTypeList_parent" data-template="ListItemSingle">
                <div className="editor-label">
                  <label htmlFor="Information_TransportType" id="Information_TransportTypeLabel" readOnly={true} className="readonly-label" title="Transport Type">{"Transport Type"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_TransportTypeHelp" role="img" title="Transport Type" data-role="tooltip" data-kit-tip="Transport Type" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">
                  <label id="Information_TransportTypeListTextLabel" htmlFor="Information_TransportTypeListText" className="display-none">{"Information_TransportTypeListText"}</label>
                  <input className="k-textbox editor-control" id="Information_TransportTypeListText" name="Information.TransportTypeListText" readOnly={true} defaultValue="UNC" aria-labelledby="Information_TransportTypeLabel" />
                  <div style={{"display": "none"}} data-kit-h="h15">{" "}<KitWidget id="k12" />{" "}<label id="Information_TransportType_IDLabel" htmlFor="Information_TransportType_ID" className="display-none">{"Information_TransportType_ID"}</label>
                    <input id="Information_TransportType_ID" name="Information.TransportType.ID" type="hidden" defaultValue="3" aria-labelledby="Information_TransportType_IDLabel" />{" "}<label id="Information_TransportType_NameLabel" htmlFor="Information_TransportType_Name" className="display-none">{"Information_TransportType_Name"}</label>
                    <input id="Information_TransportType_Name" name="Information.TransportType.Name" type="hidden" defaultValue="UNC" aria-labelledby="Information_TransportType_NameLabel" />{" "}<label id="Information_TransportType_DisplayFormatLabel" htmlFor="Information_TransportType_DisplayFormat" className="display-none">{"Information_TransportType_DisplayFormat"}</label>
                    <input id="Information_TransportType_DisplayFormat" name="Information.TransportType.DisplayFormat" type="hidden" defaultValue="Name" aria-labelledby="Information_TransportType_DisplayFormatLabel" />
                    </div>
                  <span className="k-invalid-msg" id="Information_TransportTypeList_validationMessage" data-for="Information.TransportTypeList"></span>
                  <span id="Information_TransportTypeHelpDesc" hidden={true} data-kit-h="h16">{"Transport Type"}</span>
                  </div>
                </div>{" "}<div className="col-md-6 editor-col" id="Information.OriginatingServerName_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_OriginatingServerName" id="Information_OriginatingServerNameLabel" readOnly={true} className="readonly-label" title="Originating Server Name">{"Originating Server Name"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_OriginatingServerNameHelp" role="img" title="Originating Server Name" data-role="tooltip" data-kit-tip="Originating Server Name" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val-length-max="Originating Server Name has a maximum length of 100 characters." data-val-regex="Originating Server Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Information_OriginatingServerName" ignoredirtydata="False" maxLength={100} name="Information.OriginatingServerName" not-data-val-required="Originating Server Name is a required field." readOnly={true} data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Information_OriginatingServerNameLabel Information_OriginatingServerNameHelpDesc" style={{"width": "100%"}} />
                    </span>{" "}<span className="k-invalid-msg" id="Information_OriginatingServerName_validationMessage" data-for="Information.OriginatingServerName"></span>
                  <span id="Information_OriginatingServerNameHelpDesc" hidden={true} data-kit-h="h17">{"Originating Server Name"}</span>
                  </div>
                </div>{" "}<div className="col-md-8 editor-col editor-clear" id="Information.SourceLocation_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_SourceLocation" id="Information_SourceLocationLabel" readOnly={true} className="readonly-label" title="Source Location">{"Source Location"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_SourceLocationHelp" role="img" title="Source Location" data-role="tooltip" data-kit-tip="Source Location" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val-length-max="Source Location has a maximum length of 250 characters." data-val-regex="Source Location contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Information_SourceLocation" ignoredirtydata="False" maxLength={250} name="Information.SourceLocation" not-data-val-required="Source Location is a required field." readOnly={true} defaultValue="PICTOutBound - \\\\mapsftshrfs01\\CommercialSharedFolder\\ProgramIntegrityCT\\CaseListRefresh\\Batch\\Output" data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Information_SourceLocationLabel Information_SourceLocationHelpDesc" style={{"width": "100%"}} />
                    </span>{" "}<span className="k-invalid-msg" id="Information_SourceLocation_validationMessage" data-for="Information.SourceLocation"></span>
                  <span id="Information_SourceLocationHelpDesc" hidden={true} data-kit-h="h18">{"Source Location"}</span>
                  </div>
                </div>{" "}<div className="col-md-4" id="Information.TradingPartnerId_parent" data-template="Text">
                <div className="editor-label">
                  <label htmlFor="Information_TradingPartnerId" id="Information_TradingPartnerIdLabel" readOnly={true} className="readonly-label" title="Trading Partner ID">{"Trading Partner ID"}</label>
                  <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="Information_TradingPartnerIdHelp" role="img" title="Trading Partner ID" data-role="tooltip" data-kit-tip="Trading Partner ID" data-kit-tip-pos="top" data-kit-tip-after="250"></span>
                  </div>
                <div className="editor-field">{" "}<span className="k-input k-textbox editor-control k-readonly readonly-widget" style={{}}>
                    <input className="editor-control k-input-inner readonly-widget" data-val-length-max="Trading Partner ID has a maximum length of 15 characters." data-val-regex="Trading Partner ID contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="Information_TradingPartnerId" ignoredirtydata="False" maxLength={15} name="Information.TradingPartnerId" not-data-val-required="Trading Partner ID is a required field." readOnly={true} data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" aria-labelledby="Information_TradingPartnerIdLabel Information_TradingPartnerIdHelpDesc" style={{"width": "100%"}} />
                    </span>{" "}<span className="k-invalid-msg" id="Information_TradingPartnerId_validationMessage" data-for="Information.TradingPartnerId"></span>
                  <span id="Information_TradingPartnerIdHelpDesc" hidden={true} data-kit-h="h19">{"Trading Partner ID"}</span>
                  </div>
                </div>{" "}</div>{" "}<div className="subsec-panel-hdr">{"\n                Events\n            "}</div>{" "}<div className="content-panel-container">{" "}<div className="content-panel-bdy">{" "}<KitWidget id="k13" />{" "}</div>{" "}</div>{" "}<div className="subsec-panel-hdr">{"\n                Exceptions\n            "}</div>{" "}<div className="content-panel-container">{" "}<div className="content-panel-bdy">{" "}<KitWidget id="k14" />{" "}</div>{" "}</div>{" "}<div id="overlayModelEditorButtonRow" className="editor-button-row-modal">{" "}<div className="editor-button-nav-left">{" "}<label id="altLeft1ButtonLabel" htmlFor="altLeft1Button" className="display-none">{"altLeft1Button"}</label>
                <input id="altLeft1Button" type="button" className="k-button btn-spacer-right" aria-labelledby="altLeft1ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altLeft2ButtonLabel" htmlFor="altLeft2Button" className="display-none">{"altLeft2Button"}</label>
                <input id="altLeft2Button" type="button" className="k-button btn-spacer-right" aria-labelledby="altLeft2ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altLeft3ButtonLabel" htmlFor="altLeft3Button" className="display-none">{"altLeft3Button"}</label>
                <input id="altLeft3Button" type="button" className="k-button btn-spacer-right" aria-labelledby="altLeft3ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altLeft4ButtonLabel" htmlFor="altLeft4Button" className="display-none">{"altLeft4Button"}</label>
                <input id="altLeft4Button" type="button" className="k-button btn-spacer-right" aria-labelledby="altLeft4ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altLeft5ButtonLabel" htmlFor="altLeft5Button" className="display-none">{"altLeft5Button"}</label>
                <input id="altLeft5Button" type="button" className="k-button btn-spacer-right" aria-labelledby="altLeft5ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altLeft6ButtonLabel" htmlFor="altLeft6Button" className="display-none">{"altLeft6Button"}</label>
                <input id="altLeft6Button" type="button" className="k-button" aria-labelledby="altLeft6ButtonLabel" value=" " style={{"display": "none"}} />{" "}</div>{" "}<div className="editor-button-nav-right">{" "}<label id="altRight6ButtonLabel" htmlFor="altRight6Button" className="display-none">{"altRight6Button"}</label>
                <input id="altRight6Button" type="button" className="k-button" aria-labelledby="altRight6ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altRight5ButtonLabel" htmlFor="altRight5Button" className="display-none">{"altRight5Button"}</label>
                <input id="altRight5Button" type="button" className="k-button btn-spacer-left" aria-labelledby="altRight5ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altRight4ButtonLabel" htmlFor="altRight4Button" className="display-none">{"altRight4Button"}</label>
                <input id="altRight4Button" type="button" className="k-button btn-spacer-left" aria-labelledby="altRight4ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altRight3ButtonLabel" htmlFor="altRight3Button" className="display-none">{"altRight3Button"}</label>
                <input id="altRight3Button" type="button" className="k-button btn-spacer-left" aria-labelledby="altRight3ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altRight2ButtonLabel" htmlFor="altRight2Button" className="display-none">{"altRight2Button"}</label>
                <input id="altRight2Button" type="button" className="k-button btn-spacer-left" aria-labelledby="altRight2ButtonLabel" value=" " style={{"display": "none"}} />{" "}<label id="altRight1ButtonLabel" htmlFor="altRight1Button" className="display-none">{"Cancel"}</label>
                <input id="altRight1Button" type="button" className="k-button btn-spacer-left primary-button" aria-labelledby="altRight1ButtonLabel" value="Cancel" aria-label="Cancel" data-kit-action="cancel" />{" "}</div>{" "}</div>{" "}<div id="formIdCheckDiv" style={{"visibility": "hidden"}}></div>{" "}<label id="parentOverlayDivLabel" htmlFor="parentOverlayDiv" className="display-none">{"parentOverlayDiv"}</label>
            <input id="parentOverlayDiv" type="hidden" defaultValue="" aria-labelledby="parentOverlayDivLabel" />{" "}<label id="childOverlayDivLabel" htmlFor="childOverlayDiv" className="display-none">{"childOverlayDiv"}</label>
            <input id="childOverlayDiv" type="hidden" defaultValue="" aria-labelledby="childOverlayDivLabel" />{" "}<label id="overlayEntityNameIdLabel" htmlFor="overlayEntityNameId" className="display-none">{"overlayEntityNameId"}</label>
            <input id="overlayEntityNameId" type="hidden" aria-labelledby="overlayEntityNameIdLabel" />{" "}<label id="isOverlayDirtyDataEnabledIdLabel" htmlFor="isOverlayDirtyDataEnabledId" className="display-none">{"isOverlayDirtyDataEnabledId"}</label>
            <input id="isOverlayDirtyDataEnabledId" type="hidden" defaultValue="True" aria-labelledby="isOverlayDirtyDataEnabledIdLabel" />{" "}<label id="overlayDirtyDataMessageLabel" htmlFor="overlayDirtyDataMessage" className="display-none">{"overlayDirtyDataMessage"}</label>
            <input id="overlayDirtyDataMessage" type="hidden" defaultValue="Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?" aria-labelledby="overlayDirtyDataMessageLabel" />{" "}</div>{" "}</div>{" "}</div>{" "}</form>
    </div>{" "}</div></>
  );
}
