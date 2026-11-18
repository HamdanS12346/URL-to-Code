// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Dialog d3 "Alert Confirmation" of fxfer-v9/ftp-server-credentials: ported from packs/fxfer-v9/screens/ftp-server-credentials/kit/dialogs/d3.html.
export default function DialogD3() {
  return (
    <><div className="panel-body-modal modal-msg-content">{" "}<div className="clear-n-pad">{"Invalidate cannot be un-done, the record cannot be edited once it is invalidated. Do you wish to continue?    "}</div>{" "}<div id="msgButtonRow" className="editor-button-row-modal">{" "}<div className="align-center">{" "}<input type="button" id="cancelModalButton" className="k-button btn-spacer-right" data-dismiss="modal" value="No" />{" "}<input type="button" id="okButton" className="k-button" data-dismiss="modal" value="Yes" />{" "}</div>{" "}</div>{" "}</div></>
  );
}
