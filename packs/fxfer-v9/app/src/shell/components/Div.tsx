// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Band 1 of fxfer-v9/file-transfer-configuration: ported from packs/fxfer-v9/screens/file-transfer-configuration/snapshot/rendered.html (div).
export default function Div({ title, module }: { title?: string; module?: string }) {
  if (!title) return null; // the live page of a screen with no title has no title bar
  return (
    <div className="menu" role="navigation" style={{"height": "3.2rem"}}>{" "}<div id="activeModuleMenuNav" className="float-left">{" "}{" "}<div className="k-menu-scroll-wrapper" style={{"width": "162.667px"}} data-testid="button-8">
      <span className="k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-prev k-disabled" unselectable="on" style={{"display": "none"}} data-testid="button-9">
        <span className="k-icon k-svg-icon k-svg-i-caret-alt-left k-button-icon">
          <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
            <path d="m160 256 192-128v256z" />
            </svg>
          </span>
        </span>
      <ul id="activeModuleMenu" style={{"display": "block"}} data-role="menu" className="k-reset k-header k-menu k-menu-horizontal" aria-orientation="horizontal" tabIndex={0} role="menubar" data-kit-menu-hover="100" data-kit-menu-open-ms="200" data-kit-menu-close-ms="100" data-testid="activeModuleMenu">
        <li id="activeModuleMenuFirstItem" aria-haspopup="true" aria-expanded="false" className="k-item k-menu-item k-first k-last" role="menuitem" aria-controls="adfddb36-ef60-47c6-a3e0-6fa622d83663" data-kit-flyout-demo="bar" data-groupparent="1794912305075" style={{"zIndex": "auto"}} data-testid="activeModuleMenuFirstItem">
          <span className="k-link k-menu-link" role="none">
            <span className="k-menu-link-text" role="none" data-kit-shell="module">{module ?? "File Transfer Services"}</span>
            <span aria-hidden="true" className="k-menu-expand-arrow">
              <span className="k-icon k-svg-icon k-svg-i-caret-alt-down">
                <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 352 128 160h256z" />
                  </svg>
                </span>
              </span>
            </span>{" "}</li>
        </ul>
      <span className="k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-next k-disabled" unselectable="on" style={{"display": "none"}} data-testid="button-file-transfer-services-2">
        <span className="k-icon k-svg-icon k-svg-i-caret-alt-right k-button-icon">
          <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
            <path d="M352 256 160 384V128z" />
            </svg>
          </span>
        </span>
      <div className="k-animation-container" role="region" style={{"display": "none", "position": "absolute", "zIndex": "10002", "top": "32px", "left": "0px", "overflow": "hidden"}}>
        <div className="k-child-animation-container" style={{"height": "73.3333px", "width": "1920px", "display": "none", "transform": "translateY(-73.3229px)"}}>
          <div className="k-menu-popup k-popup" style={{"overflow": "visible", "fontSize": "14px", "fontFamily": "Arial, &quot", "fontStretch": "100%", "fontStyle": "normal", "fontWeight": "400", "lineHeight": "20px"}} data-role="popup" data-group="1794912305075" aria-hidden="true">
            <div className="k-menu-scroll-wrapper k-menu-scroll-wrapper-vertical">
              <span className="k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-prev k-disabled" unselectable="on" style={{"width": "100%"}} data-testid="button-10">
                <span className="k-icon k-svg-icon k-svg-i-caret-alt-up k-button-icon">
                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                    <path d="m256 160 128 192H128z" />
                    </svg>
                  </span>
                </span>
              <ul className="k-menu-group" role="menu" id="adfddb36-ef60-47c6-a3e0-6fa622d83663" style={{"overflow": "hidden", "height": "292px"}}>{" "}<div className="col-md-6">
                  <li className="k-item k-menu-item k-first" role="menuitem" data-testid="button-file-transfer-configuration-2">{" "}<a href="/FileTransfer/SearchSourceLocations" role="button" className="k-link k-menu-link" data-testid="link-file-transfer-configuration-2">{"File Transfer Configuration"}</a>{" "}</li>
                  <li className="k-item k-menu-item" role="menuitem" data-testid="button-file-transfer-tracking-2">{" "}<a href="/FileTransfer/SearchFileTransferTracking" role="button" className="k-link k-menu-link" data-testid="link-file-transfer-tracking-2">{"File Transfer Tracking"}</a>{" "}</li>
                  </div>{" "}<div className="col-md-6">
                  <li className="k-item k-menu-item k-last" role="menuitem" data-testid="button-ftp-server-credentials-2">{" "}<a href="/FileTransfer/SearchFTPServerCredentials" role="button" className="k-link k-menu-link" data-testid="link-ftp-server-credentials-2">{"FTP Server Credentials"}</a>{" "}</li>
                  </div>{" "}</ul>
              <span className="k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-next k-disabled" unselectable="on" style={{"width": "100%"}} data-testid="button-11">
                <span className="k-icon k-svg-icon k-svg-i-caret-alt-down k-button-icon">
                  <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 352 128 160h256z" />
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}</div>{" "}<h1 id="activeScreen" className="float-left" style={{"display": "block"}} data-kit-shell="title">{title}</h1>{" "}</div>
  );
}
