// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Band 1 of fxfer-v4/file-transfer-configuration: ported from packs/fxfer-v4/screens/file-transfer-configuration/snapshot/rendered.html (div).
export default function Div({ title, module }: { title?: string; module?: string }) {
  return (
    <div className="menu" role="navigation" style={{"height": "3.2rem"}}>{" "}<div id="activeModuleMenuNav" className="float-left">{" "}{" "}<div className="k-menu-scroll-wrapper" style={{"width": "164px"}} data-testid="button-8">
      <span className="k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-prev k-disabled" unselectable="on" style={{"display": "none"}} data-testid="button-9">
        <span className="k-icon k-svg-icon k-svg-i-caret-alt-left k-button-icon">
          <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
            <path d="m160 256 192-128v256z" />
            </svg>
          </span>
        </span>
      <ul id="activeModuleMenu" style={{"display": "block"}} data-role="menu" className="k-reset k-header k-menu k-menu-horizontal" aria-orientation="horizontal" tabIndex={0} role="menubar" data-kit-menu-hover="100" data-kit-menu-open-ms="200" data-kit-menu-close-ms="100" data-testid="activeModuleMenu">
        <li id="activeModuleMenuFirstItem" aria-haspopup="true" aria-expanded="false" className="k-item k-menu-item k-first k-last" role="menuitem" aria-controls="157f7fa2-535a-4b52-8ce6-33990a02d517" data-kit-flyout-demo="bar" data-groupparent="1794383411619" style={{"zIndex": "auto"}} data-testid="activeModuleMenuFirstItem">
          <span className="k-link k-menu-link" role="none">
            <span className="k-menu-link-text" role="none">{"\nFile Transfer Services                                                    "}</span>
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
      </div>{" "}</div>{" "}<h1 id="activeScreen" className="float-left" style={{"display": "block"}} data-kit-shell="title">{title}</h1>{" "}</div>
  );
}
