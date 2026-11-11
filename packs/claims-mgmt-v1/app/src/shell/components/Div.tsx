// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
// Band 1 of claims-mgmt-v1/search-claims: ported from packs/claims-mgmt-v1/screens/search-claims/snapshot/rendered.html (div).
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
      <ul id="activeModuleMenu" style={{"display": "block"}} data-role="menu" className="k-reset k-header k-menu k-menu-horizontal" aria-orientation="horizontal" tabIndex={0} role="menubar" data-testid="activeModuleMenu">
        <li id="activeModuleMenuFirstItem" aria-haspopup="true" aria-expanded="false" className="k-item k-menu-item k-first k-last" role="menuitem" aria-controls="d0c85f9b-b8aa-42e7-98c5-c89921c4fb3f" data-testid="activeModuleMenuFirstItem">{" "}<a href="/ClaimsManagement/Dashboard" className="k-link k-menu-link" data-testid="link-claims-management-2">{"Claims Management "}<i className="fa-solid fa-chevron-down"></i>
            <span aria-hidden="true" className="k-menu-expand-arrow">
              <span className="k-icon k-svg-icon k-svg-i-caret-alt-down">
                <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 352 128 160h256z" />
                  </svg>
                </span>
              </span>
            </a>{" "}<div className="k-menu-popup k-popup" aria-hidden="false" style={{"display": "none"}}>
            <ul className="k-menu-group" role="menu" id="d0c85f9b-b8aa-42e7-98c5-c89921c4fb3f">{" "}<div className="col-md-6">
                <li className="k-item k-menu-item k-first" role="menuitem" data-testid="button-search-claims-2">{" "}<a href="/ClaimsManagement/SearchClaims" role="button" className="k-link k-menu-link" data-testid="link-search-claims-2">{"Search Claims"}</a>{" "}</li>
                <li className="k-item k-menu-item k-last" role="menuitem" data-testid="button-pro-dur-2">{" "}<a href="/ProDUR/ProDURDashBoard" role="button" className="k-link k-menu-link" data-testid="link-pro-dur-2">{"Pro DUR"}</a>{" "}</li>
                </div>{" "}</ul>
            </div>{" "}</li>
        </ul>
      <span className="k-button k-button-flat k-icon-button k-menu-scroll-button k-menu-scroll-button-next k-disabled" unselectable="on" style={{"display": "none"}} data-testid="button-claims-management-search-claims--2">
        <span className="k-icon k-svg-icon k-svg-i-caret-alt-right k-button-icon">
          <svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
            <path d="M352 256 160 384V128z" />
            </svg>
          </span>
        </span>
      </div>{" "}</div>{" "}<h1 id="activeScreen" className="float-left" style={{"display": "block"}} data-kit-shell="title">{title}</h1>{" "}</div>
  );
}
