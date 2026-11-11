// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, type KitData } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/pro-dur';
import ProDURdashBoard from './components/ProDURdashBoard';

// claims-mgmt-v1/pro-dur: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function ProDurPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "Pro DUR";
    body.className = "ProDUR ProDURDashBoard";
    html.className = "k-webkit k-webkit157";
    body.setAttribute('style', "padding-top: 62px;");

    const overusePanel = document.getElementById('OverusePrecautionPanel');
    const onOverusePanelClick = (e: Event) => {
      e.preventDefault?.();
      window.location.assign('/ProDUR/ProDUROverusePrecaution/');
    };
    overusePanel?.addEventListener('click', onOverusePanelClick);

    return () => {
      overusePanel?.removeEventListener('click', onOverusePanelClick);
      style.remove();
      undo.forEach((f) => f());
      [document.title, body.id, body.className, html.className] = prev;
      if (prev[4] === null) body.removeAttribute('style'); else body.setAttribute('style', prev[4]);
    };
  }, []);

  return (
    <><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/ProDUR/ProDURDashBoard" method="post">
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="svRamcb6YDInHwvEw_PEA7yXgUcj20VZlZZcoP1Q1XytnQlU9eTTrSOz97DT7aYmEjBgxbAKhmC7exgiWIOYvA9ccm05Sivkaqept4-HOXRdXsGnudxhyKwcgnlVpostoc1HncPaoYwj3W7WavPHyA2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div className="produrouterborder" style={{"overflowX": "hidden"}}>{" "}<ProDURdashBoard />{" "}</div>{" "}</form>{" "}</main></KitScreen></>
  );
}
