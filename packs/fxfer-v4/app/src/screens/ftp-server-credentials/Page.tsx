// @ts-nocheck - mechanical port of the captured DOM (unknown legacy attributes); drop this line once you hand-edit the file
import { useEffect, useLayoutEffect } from 'react';
import css from './style.css?inline';
import { KitScreen, KitWidget, type KitData, useKit } from '../../kit';
import kit from './kit.json';
import * as services from '../../services/ftp-server-credentials';
import DialogD1 from './dialogs/DialogD1';
import DialogD2 from './dialogs/DialogD2';

function FtpServerCredentialsBehavior() {
  const { bus } = useKit();

  useEffect(() => {
    const qs = <T extends Element>(sel: string) => document.querySelector<T>(sel);

    const hideSummaryErrors = () => {
      const summary = qs<HTMLElement>('.editor-validation-summary.validation-summary');
      if (summary) summary.style.display = 'none';
      const list = summary?.querySelector<HTMLUListElement>('ul.validation-errors');
      if (list) list.innerHTML = '';
    };

    const showSummaryErrors = (messages: string[]) => {
      const summary = qs<HTMLElement>('.editor-validation-summary.validation-summary');
      if (!summary) return;
      const list = summary.querySelector<HTMLUListElement>('ul.validation-errors');
      if (list) list.innerHTML = messages.map((m) => '<li>' + m + '</li>').join('');
      summary.style.display = '';
    };

    const clearFieldError = () => {
      const input = qs<HTMLInputElement>('#FtpServerName');
      const msg = qs<HTMLElement>('#FtpServerName_validationMessage');
      if (input) {
        input.classList.remove('k-invalid');
        input.removeAttribute('aria-invalid');
      }
      if (msg) msg.textContent = '';
    };

    const validateBeforeSearch = () => {
      const input = qs<HTMLInputElement>('#FtpServerName');
      if (!input) return true;

      const raw = input.value ?? '';
      const value = raw.trim();

      const regexPattern = input.getAttribute('data-val-regex-pattern');
      if (regexPattern && value) {
        try {
          const re = new RegExp(regexPattern);
          if (!re.test(value)) {
            const message = input.getAttribute('data-val-regex') ?? 'Invalid value.';
            input.classList.add('k-invalid');
            input.setAttribute('aria-invalid', 'true');
            const msg = qs<HTMLElement>('#FtpServerName_validationMessage');
            if (msg) msg.textContent = message;
            showSummaryErrors([message]);
            return false;
          }
        } catch {
          // If the legacy regex can't compile, don't block search.
        }
      }

      const maxLen = Number(input.getAttribute('maxlength') ?? input.getAttribute('maxLength') ?? '0');
      if (maxLen > 0 && value.length > maxLen) {
        const message = input.getAttribute('data-val-length-max') ?? ('Maximum length is ' + maxLen + '.');
        input.classList.add('k-invalid');
        input.setAttribute('aria-invalid', 'true');
        const msg = qs<HTMLElement>('#FtpServerName_validationMessage');
        if (msg) msg.textContent = message;
        showSummaryErrors([message]);
        return false;
      }

      clearFieldError();
      hideSummaryErrors();
      return true;
    };

    const setCriteriaCollapsed = (collapsed: boolean) => {
      const body = qs<HTMLElement>('#FTPServerCredentialsSearch');
      const icon = qs<HTMLElement>('#criteriaPanel');
      if (body) body.style.display = collapsed ? 'none' : '';
      if (icon) {
        icon.classList.toggle('fa-angle-up', !collapsed);
        icon.classList.toggle('fa-angle-down', collapsed);
        icon.setAttribute('title', collapsed ? 'Expand' : 'Collapse');
      }
    };

    const setSearchResultsVisible = (visible: boolean) => {
      const results = qs<HTMLElement>('#searchResults');
      if (results) results.style.display = visible ? '' : 'none';
    };

    const applyClientFilters = () => {
      const grid = qs<HTMLElement>('#FTPServerCredentialsGrid');
      if (!grid) return;

      const q = (qs<HTMLInputElement>('#FtpServerName')?.value ?? '').trim().toLowerCase();
      const includeInvalid = !!qs<HTMLInputElement>('#showInvalidFTPServerCredentialsCheckBox')?.checked;

      const rows = grid.querySelectorAll<HTMLTableRowElement>('tbody tr');
      rows.forEach((row) => {
        const cells = row.querySelectorAll<HTMLTableCellElement>('td');
        if (cells.length === 0) return;

        const serverName = (cells[0]?.textContent ?? '').trim().toLowerCase();
        const isValidText = (cells[cells.length - 1]?.textContent ?? '').trim().toLowerCase();
        const isValid = isValidText === 'true' || isValidText === 'yes' || isValidText === '1';

        const matchName = !q || serverName.includes(q);
        const matchValid = includeInvalid ? true : isValid;

        row.style.display = matchName && matchValid ? '' : 'none';
      });
    };

    const onClickCapture = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target instanceof HTMLInputElement && target.id === 'nextButton') {
        if (!validateBeforeSearch()) {
          e.preventDefault();
          e.stopPropagation();
          // @ts-expect-error stopImmediatePropagation exists on Event at runtime.
          e.stopImmediatePropagation?.();
          return;
        }

        // Legacy behavior: always uncheck before querying.
        const includeInvalid = qs<HTMLInputElement>('#showInvalidFTPServerCredentialsCheckBox');
        if (includeInvalid) includeInvalid.checked = false;
        hideSummaryErrors();
      }

      if (target instanceof HTMLInputElement && target.id === 'cancelButton') {
        e.preventDefault();
        e.stopPropagation();
        // @ts-expect-error stopImmediatePropagation exists on Event at runtime.
        e.stopImmediatePropagation?.();
        window.location.hash = '#/';
      }

      const close = (target as HTMLElement).closest?.('[data-hide="alert"]');
      if (close) {
        hideSummaryErrors();
      }
    };

    const onInputCapture = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target instanceof HTMLInputElement && target.id === 'FtpServerName') {
        clearFieldError();
        hideSummaryErrors();
      }
    };

    const onChangeCapture = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target instanceof HTMLInputElement && target.id === 'showInvalidFTPServerCredentialsCheckBox') {
        // The legacy screen re-queries the grid; on the rebuild we filter the current rows.
        applyClientFilters();
      }
    };

    document.addEventListener('click', onClickCapture, true);
    document.addEventListener('input', onInputCapture, true);
    document.addEventListener('change', onChangeCapture, true);

    const unsubSearch = bus.on('search', () => {
      hideSummaryErrors();
      // Match the legacy: collapse criteria once results bind.
      setCriteriaCollapsed(true);
      requestAnimationFrame(() => applyClientFilters());
    });

    const unsubReset = bus.on('reset', () => {
      hideSummaryErrors();
      clearFieldError();
      setSearchResultsVisible(false);
      setCriteriaCollapsed(false);
    });

    return () => {
      document.removeEventListener('click', onClickCapture, true);
      document.removeEventListener('input', onInputCapture, true);
      document.removeEventListener('change', onChangeCapture, true);
      unsubSearch();
      unsubReset();
    };
  }, [bus]);

  return null;
}

// fxfer-v4/ftp-server-credentials: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.
export default function FtpServerCredentialsPage() {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    const { body, documentElement: html } = document;
    const prev = [document.title, body.id, body.className, html.className, body.getAttribute('style')];
    // the page's CSS picks its theme off these (data-color-mode, data-light-theme, ...), so its var()s need them
    const undo = [[html, [["lang","en"]]], [body, [["scroll","yes"]]]].flatMap(([el, pairs]) =>
      pairs.map(([n, v]) => { const p = el.getAttribute(n); el.setAttribute(n, v); return () => (p === null ? el.removeAttribute(n) : el.setAttribute(n, p)); }));
    document.title = "FTP Server Credentials";
    body.className = "FileTransfer SearchFTPServerCredentials";
    html.className = "k-webkit k-webkit157";
    body.setAttribute('style', "padding-top: 62px;");
    return () => {
      style.remove();
      undo.forEach((f) => f());
      [document.title, body.id, body.className, html.className] = prev;
      if (prev[4] === null) body.removeAttribute('style'); else body.setAttribute('style', prev[4]);
    };
  }, []);

  return (
    <><KitScreen screen={kit as unknown as KitData} dialogs={{ d1: DialogD1, d2: DialogD2 }} services={services}><FtpServerCredentialsBehavior /><main role="main">{" "}<div className="gm-container" style={{"display": "none"}}></div>{" "}<form action="/FileTransfer/SearchFTPServerCredentials" className="k-content" id="SearchFTPServerCredentialsId" method="post" name="SearchFTPServerCredentialsId" data-role="validator" noValidate={true}>
    <input style={{"display": "none"}} type="text" name="fakeusernameremembered" defaultValue="" data-testid="text" />
    <input style={{"display": "none"}} type="password" name="fakepasswordremembered" data-testid="text-2" />
    <input name="__RequestVerificationToken" type="hidden" defaultValue="lQsX1F_kGHSvZTDDKgyh4b-wkRYfGGUYLDPe9jKGlaOo868Kn0w5qSzxhTpiTKIfUL0nWdO4S0zFuaIvcfGndfFofPPA6pjNvmK4oc18dwdN-KimYqoVa8J7jkvg6x389lvIvY89rNcU2MMiD4-vJA2" style={{}} />{" "}<div className="container">{" "}<div className="editor-validation-summary validation-summary" style={{"display": "none"}} data-kit-h="h1">{" "}<i className="msg-inline-icon fa-solid fa-ban"></i>{" "}<div className="msg-inline-close panel-icon clickable" role="alert" data-hide="alert" aria-label="close" tabIndex={0} data-testid="button-close-7">{" "}<span className="fa-solid fa-xmark" title="Close" data-role="tooltip" data-kit-tip="Close" data-kit-tip-pos="top" data-kit-tip-after="250"></span>{" "}</div>{"\n        Resolve the following form field errors and try again. \n        "}<ul className="validation-errors"></ul>{" "}</div>{" "}</div>{" "}<div id="FTPServerCredentialsSearchPanel" className="container">{" "}<div id="searchFTPServerCredentialsStatus"></div>{" "}<fieldset data-role="validator">{" "}<div className="row">{" "}<div className="float-right assoc-box-bottom-separator">{" "}<button id="ftpServerCredentialAddButton" title="Create New" type="button" data-role="button" className="k-button" role="button" aria-disabled="false" tabIndex={0} data-kit-action="create" data-testid="ftpServerCredentialAddButton">
              <span className="k-button-text">{"Create New"}</span>
              </button>{" "}</div>{" "}</div>{" "}<div className="content-panel-container">{" "}<div className="content-panel-hdr">{"\n                    Search Criteria\n                "}</div>{" "}<div className="content-panel-hdr-tools">{" "}<div className="content-ordered-panel-hdr-tools">
              <div className="panel-icon clickable" data-testid="button-22">{" "}<div id="criteriaPanel" className="fa-solid fa-angle-up" title="Collapse" tabIndex={0} data-testid="criteriaPanel"></div>{" "}</div>
              </div>
            </div>{" "}<div id="FTPServerCredentialsSearch" className="content-panel-bdy">{" "}<div className="editor-req-field-row">{"Required Fields ( "}<span className="editor-req-field fa-solid fa-asterisk"></span>{")"}</div>{" "}<div className="panel-body">{" "}<div className="row">{" "}<div className="col-md-2 editor-col" id="FtpServerName_parent" data-template="Text">
                  <div className="editor-label">
                    <label htmlFor="FtpServerName" id="FtpServerNameLabel" title="Server Name">{"Server Name"}</label>
                    <span aria-label="HELP" className="clickable editor-icon fa-solid fa-circle-question" id="FtpServerNameHelp" role="img" title="Server Name" data-role="tooltip" data-kit-tip="Server Name" data-kit-tip-pos="top" data-kit-tip-after="250" data-testid="FtpServerNameHelp"></span>
                    </div>
                  <div className="editor-field">{" "}<span className="k-input k-textbox editor-control" style={{}}>
                      <input className="editor-control k-input-inner" data-val-length-max="Server Name has a maximum length of 50 characters." data-val-regex="Server Name contains invalid characters. The characters ; * ^ : ~ &lt; &gt; % are not allowed." data-val-regex-pattern="^([^;*^:~&lt;&gt;%])*$" id="FtpServerName" ignoredirtydata="False" maxLength={50} name="FtpServerName" not-data-val-required="Server Name is a required field." data-role="textbox" aria-disabled="false" inputMode="text" autoComplete="off" style={{"width": "100%"}} aria-labelledby="FtpServerNameLabel FtpServerNameHelpDesc" aria-hidden="false" defaultValue="" data-testid="FtpServerName" />
                      </span>{" "}<span className="k-invalid-msg" id="FtpServerName_validationMessage" data-for="FtpServerName"></span>
                    <span id="FtpServerNameHelpDesc" hidden={true} data-kit-h="h2">{"Server Name"}</span>
                    </div>
                  </div>{" "}<label id="IsValidLabel" htmlFor="IsValid" className="display-none">{"IsValid"}</label>
                <input id="IsValid" name="IsValid" type="hidden" defaultValue="" aria-labelledby="IsValidLabel" aria-hidden="false" style={{}} />{" "}</div>{" "}<div id="FTPServerCredentialsGridButtons" className="editor-button-row">{" "}<label id="Editor_Alt1ActionTextLabel" htmlFor="Editor_Alt1ActionText" className="display-none">{"Editor_Alt1ActionText"}</label>
                <input id="Editor_Alt1ActionText" name="Editor.Alt1ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt1ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt1ActionUrlLabel" htmlFor="Editor_Alt1ActionUrl" className="display-none">{"Editor_Alt1ActionUrl"}</label>
                <input id="Editor_Alt1ActionUrl" name="Editor.Alt1ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt1ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt2ActionTextLabel" htmlFor="Editor_Alt2ActionText" className="display-none">{"Editor_Alt2ActionText"}</label>
                <input id="Editor_Alt2ActionText" name="Editor.Alt2ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt2ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt2ActionUrlLabel" htmlFor="Editor_Alt2ActionUrl" className="display-none">{"Editor_Alt2ActionUrl"}</label>
                <input id="Editor_Alt2ActionUrl" name="Editor.Alt2ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt2ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt3ActionTextLabel" htmlFor="Editor_Alt3ActionText" className="display-none">{"Editor_Alt3ActionText"}</label>
                <input id="Editor_Alt3ActionText" name="Editor.Alt3ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt3ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt3ActionUrlLabel" htmlFor="Editor_Alt3ActionUrl" className="display-none">{"Editor_Alt3ActionUrl"}</label>
                <input id="Editor_Alt3ActionUrl" name="Editor.Alt3ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt3ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt4ActionTextLabel" htmlFor="Editor_Alt4ActionText" className="display-none">{"Editor_Alt4ActionText"}</label>
                <input id="Editor_Alt4ActionText" name="Editor.Alt4ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt4ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt4ActionUrlLabel" htmlFor="Editor_Alt4ActionUrl" className="display-none">{"Editor_Alt4ActionUrl"}</label>
                <input id="Editor_Alt4ActionUrl" name="Editor.Alt4ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt4ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt5ActionTextLabel" htmlFor="Editor_Alt5ActionText" className="display-none">{"Editor_Alt5ActionText"}</label>
                <input id="Editor_Alt5ActionText" name="Editor.Alt5ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt5ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt5ActionUrlLabel" htmlFor="Editor_Alt5ActionUrl" className="display-none">{"Editor_Alt5ActionUrl"}</label>
                <input id="Editor_Alt5ActionUrl" name="Editor.Alt5ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt5ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt6ActionTextLabel" htmlFor="Editor_Alt6ActionText" className="display-none">{"Editor_Alt6ActionText"}</label>
                <input id="Editor_Alt6ActionText" name="Editor.Alt6ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt6ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt6ActionUrlLabel" htmlFor="Editor_Alt6ActionUrl" className="display-none">{"Editor_Alt6ActionUrl"}</label>
                <input id="Editor_Alt6ActionUrl" name="Editor.Alt6ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt6ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt7ActionTextLabel" htmlFor="Editor_Alt7ActionText" className="display-none">{"Editor_Alt7ActionText"}</label>
                <input id="Editor_Alt7ActionText" name="Editor.Alt7ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt7ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt7ActionUrlLabel" htmlFor="Editor_Alt7ActionUrl" className="display-none">{"Editor_Alt7ActionUrl"}</label>
                <input id="Editor_Alt7ActionUrl" name="Editor.Alt7ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt7ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt8ActionTextLabel" htmlFor="Editor_Alt8ActionText" className="display-none">{"Editor_Alt8ActionText"}</label>
                <input id="Editor_Alt8ActionText" name="Editor.Alt8ActionText" type="hidden" defaultValue="" aria-labelledby="Editor_Alt8ActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_Alt8ActionUrlLabel" htmlFor="Editor_Alt8ActionUrl" className="display-none">{"Editor_Alt8ActionUrl"}</label>
                <input id="Editor_Alt8ActionUrl" name="Editor.Alt8ActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_Alt8ActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_CancelActionTextLabel" htmlFor="Editor_CancelActionText" className="display-none">{"Editor_CancelActionText"}</label>
                <input id="Editor_CancelActionText" name="Editor.CancelActionText" type="hidden" defaultValue="Cancel" aria-labelledby="Editor_CancelActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_CancelActionUrlLabel" htmlFor="Editor_CancelActionUrl" className="display-none">{"Editor_CancelActionUrl"}</label>
                <input id="Editor_CancelActionUrl" name="Editor.CancelActionUrl" type="hidden" defaultValue="/Home/MyHome/" aria-labelledby="Editor_CancelActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ConfirmDeleteMessageLabel" htmlFor="Editor_ConfirmDeleteMessage" className="display-none">{"Editor_ConfirmDeleteMessage"}</label>
                <input id="Editor_ConfirmDeleteMessage" name="Editor.ConfirmDeleteMessage" type="hidden" defaultValue="Are you sure you want to delete the ?" aria-labelledby="Editor_ConfirmDeleteMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DeleteActionTextLabel" htmlFor="Editor_DeleteActionText" className="display-none">{"Editor_DeleteActionText"}</label>
                <input id="Editor_DeleteActionText" name="Editor.DeleteActionText" type="hidden" defaultValue="Delete" aria-labelledby="Editor_DeleteActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DeletedMessageLabel" htmlFor="Editor_DeletedMessage" className="display-none">{"Editor_DeletedMessage"}</label>
                <input id="Editor_DeletedMessage" name="Editor.DeletedMessage" type="hidden" defaultValue=" was successfully deleted." aria-labelledby="Editor_DeletedMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DirectionLabel" htmlFor="Editor_Direction" className="display-none">{"Editor_Direction"}</label>
                <input id="Editor_Direction" name="Editor.Direction" type="hidden" defaultValue="Next" aria-labelledby="Editor_DirectionLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_DirtyDataMessageLabel" htmlFor="Editor_DirtyDataMessage" className="display-none">{"Editor_DirtyDataMessage"}</label>
                <input id="Editor_DirtyDataMessage" name="Editor.DirtyDataMessage" type="hidden" defaultValue="Form data has changed and has not been saved. Are you sure you want to leave without saving your changes first?" aria-labelledby="Editor_DirtyDataMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_EntityNameLabel" htmlFor="Editor_EntityName" className="display-none">{"Editor_EntityName"}</label>
                <input id="Editor_EntityName" name="Editor.EntityName" type="hidden" defaultValue="" aria-labelledby="Editor_EntityNameLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt1EnabledLabel" htmlFor="Editor_IsAlt1Enabled" className="display-none">{"Editor_IsAlt1Enabled"}</label>
                <input id="Editor_IsAlt1Enabled" name="Editor.IsAlt1Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt1EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt2EnabledLabel" htmlFor="Editor_IsAlt2Enabled" className="display-none">{"Editor_IsAlt2Enabled"}</label>
                <input id="Editor_IsAlt2Enabled" name="Editor.IsAlt2Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt2EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt3EnabledLabel" htmlFor="Editor_IsAlt3Enabled" className="display-none">{"Editor_IsAlt3Enabled"}</label>
                <input id="Editor_IsAlt3Enabled" name="Editor.IsAlt3Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt3EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt4EnabledLabel" htmlFor="Editor_IsAlt4Enabled" className="display-none">{"Editor_IsAlt4Enabled"}</label>
                <input id="Editor_IsAlt4Enabled" name="Editor.IsAlt4Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt4EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt5EnabledLabel" htmlFor="Editor_IsAlt5Enabled" className="display-none">{"Editor_IsAlt5Enabled"}</label>
                <input id="Editor_IsAlt5Enabled" name="Editor.IsAlt5Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt5EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt6EnabledLabel" htmlFor="Editor_IsAlt6Enabled" className="display-none">{"Editor_IsAlt6Enabled"}</label>
                <input id="Editor_IsAlt6Enabled" name="Editor.IsAlt6Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt6EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt7EnabledLabel" htmlFor="Editor_IsAlt7Enabled" className="display-none">{"Editor_IsAlt7Enabled"}</label>
                <input id="Editor_IsAlt7Enabled" name="Editor.IsAlt7Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt7EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsAlt8EnabledLabel" htmlFor="Editor_IsAlt8Enabled" className="display-none">{"Editor_IsAlt8Enabled"}</label>
                <input id="Editor_IsAlt8Enabled" name="Editor.IsAlt8Enabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsAlt8EnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsCancelEnabledLabel" htmlFor="Editor_IsCancelEnabled" className="display-none">{"Editor_IsCancelEnabled"}</label>
                <input id="Editor_IsCancelEnabled" name="Editor.IsCancelEnabled" type="hidden" defaultValue="True" aria-labelledby="Editor_IsCancelEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsDirtyDataEnabledLabel" htmlFor="Editor_IsDirtyDataEnabled" className="display-none">{"Editor_IsDirtyDataEnabled"}</label>
                <input id="Editor_IsDirtyDataEnabled" name="Editor.IsDirtyDataEnabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsDirtyDataEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsPrintEnabledLabel" htmlFor="Editor_IsPrintEnabled" className="display-none">{"Editor_IsPrintEnabled"}</label>
                <input id="Editor_IsPrintEnabled" name="Editor.IsPrintEnabled" type="hidden" defaultValue="False" aria-labelledby="Editor_IsPrintEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsProcessDirtyLabel" htmlFor="Editor_IsProcessDirty" className="display-none">{"Editor_IsProcessDirty"}</label>
                <input id="Editor_IsProcessDirty" name="Editor.IsProcessDirty" type="hidden" defaultValue="False" aria-labelledby="Editor_IsProcessDirtyLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_IsResetEnabledLabel" htmlFor="Editor_IsResetEnabled" className="display-none">{"Editor_IsResetEnabled"}</label>
                <input id="Editor_IsResetEnabled" name="Editor.IsResetEnabled" type="hidden" defaultValue="True" aria-labelledby="Editor_IsResetEnabledLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ModeLabel" htmlFor="Editor_Mode" className="display-none">{"Editor_Mode"}</label>
                <input id="Editor_Mode" name="Editor.Mode" type="hidden" defaultValue="Create" aria-labelledby="Editor_ModeLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_NextActionTextLabel" htmlFor="Editor_NextActionText" className="display-none">{"Editor_NextActionText"}</label>
                <input id="Editor_NextActionText" name="Editor.NextActionText" type="hidden" defaultValue="Next" aria-labelledby="Editor_NextActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_PrevActionTextLabel" htmlFor="Editor_PrevActionText" className="display-none">{"Editor_PrevActionText"}</label>
                <input id="Editor_PrevActionText" name="Editor.PrevActionText" type="hidden" defaultValue="Prev" aria-labelledby="Editor_PrevActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_PrintActionTextLabel" htmlFor="Editor_PrintActionText" className="display-none">{"Editor_PrintActionText"}</label>
                <input id="Editor_PrintActionText" name="Editor.PrintActionText" type="hidden" defaultValue="" aria-labelledby="Editor_PrintActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_PrintActionUrlLabel" htmlFor="Editor_PrintActionUrl" className="display-none">{"Editor_PrintActionUrl"}</label>
                <input id="Editor_PrintActionUrl" name="Editor.PrintActionUrl" type="hidden" defaultValue="" aria-labelledby="Editor_PrintActionUrlLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ResetActionTextLabel" htmlFor="Editor_ResetActionText" className="display-none">{"Editor_ResetActionText"}</label>
                <input id="Editor_ResetActionText" name="Editor.ResetActionText" type="hidden" defaultValue="Reset" aria-labelledby="Editor_ResetActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_SaveActionTextLabel" htmlFor="Editor_SaveActionText" className="display-none">{"Editor_SaveActionText"}</label>
                <input id="Editor_SaveActionText" name="Editor.SaveActionText" type="hidden" defaultValue="Search" aria-labelledby="Editor_SaveActionTextLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_SavedMessageLabel" htmlFor="Editor_SavedMessage" className="display-none">{"Editor_SavedMessage"}</label>
                <input id="Editor_SavedMessage" name="Editor.SavedMessage" type="hidden" defaultValue=" was successfully saved." aria-labelledby="Editor_SavedMessageLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_ShowSummaryErrorLabel" htmlFor="Editor_ShowSummaryError" className="display-none">{"Editor_ShowSummaryError"}</label>
                <input id="Editor_ShowSummaryError" name="Editor.ShowSummaryError" type="hidden" defaultValue="False" aria-labelledby="Editor_ShowSummaryErrorLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_StepLabel" htmlFor="Editor_Step" className="display-none">{"Editor_Step"}</label>
                <input id="Editor_Step" name="Editor.Step" type="hidden" defaultValue="1" aria-labelledby="Editor_StepLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_StepCountLabel" htmlFor="Editor_StepCount" className="display-none">{"Editor_StepCount"}</label>
                <input id="Editor_StepCount" name="Editor.StepCount" type="hidden" defaultValue="1" aria-labelledby="Editor_StepCountLabel" aria-hidden="false" style={{}} />{" "}<label id="Editor_TitleFormatTextLabel" htmlFor="Editor_TitleFormatText" className="display-none">{"Editor_TitleFormatText"}</label>
                <input id="Editor_TitleFormatText" name="Editor.TitleFormatText" type="hidden" defaultValue="{0} {1} - Step {2} of {3}" aria-labelledby="Editor_TitleFormatTextLabel" aria-hidden="false" style={{}} />{" "}<div id="modelEditorButtonRow" className="editor-button-row-parent">{" "}<div className="editor-button-nav-left">{" "}<label id="prevButtonLabel" htmlFor="prevButton" className="display-none">{"Prev"}</label>
                    <input id="prevButton" type="button" className="k-button btn-spacer-right" value="Prev" style={{"display": "none"}} aria-labelledby="prevButtonLabel" aria-hidden="false" data-testid="prevButton" />{" "}<label id="resetButtonLabel" htmlFor="resetButton" className="display-none">{"Reset"}</label>
                    <input id="resetButton" type="button" className="k-button btn-spacer-right" value="Reset" aria-labelledby="resetButtonLabel" aria-hidden="false" style={{}} data-kit-action="reset" data-testid="resetButton" />{" "}<label id="alt1ButtonLabel" htmlFor="alt1Button" className="display-none">{"Alt1"}</label>
                    <input id="alt1Button" type="button" className="k-button btn-spacer-right" value="Alt1" style={{"display": "none"}} aria-labelledby="alt1ButtonLabel" aria-hidden="false" data-testid="alt1Button" />{" "}<label id="alt4ButtonLabel" htmlFor="alt4Button" className="display-none">{"Alt4"}</label>
                    <input id="alt4Button" type="button" className="k-button btn-spacer-right" value="Alt4" style={{"display": "none"}} aria-labelledby="alt4ButtonLabel" aria-hidden="false" data-testid="alt4Button" />{" "}<label id="alt5ButtonLabel" htmlFor="alt5Button" className="display-none">{"Alt5"}</label>
                    <input id="alt5Button" type="button" className="k-button btn-spacer-right" value="Alt5" style={{"display": "none"}} aria-labelledby="alt5ButtonLabel" aria-hidden="false" data-testid="alt5Button" />{" "}<label id="alt6ButtonLabel" htmlFor="alt6Button" className="display-none">{"Alt6"}</label>
                    <input id="alt6Button" type="button" className="k-button btn-spacer-right" value="Alt6" style={{"display": "none"}} aria-labelledby="alt6ButtonLabel" aria-hidden="false" data-testid="alt6Button" />{" "}<label id="alt7ButtonLabel" htmlFor="alt7Button" className="display-none">{"Alt7"}</label>
                    <input id="alt7Button" type="button" className="k-button btn-spacer-right" value="Alt7" style={{"display": "none"}} aria-labelledby="alt7ButtonLabel" aria-hidden="false" data-testid="alt7Button" />{" "}<label id="alt8ButtonLabel" htmlFor="alt8Button" className="display-none">{"Alt8"}</label>
                    <input id="alt8Button" type="button" className="k-button btn-spacer-right" value="Alt8" style={{"display": "none"}} aria-labelledby="alt8ButtonLabel" aria-hidden="false" data-testid="alt8Button" />{" "}<label id="printButtonLabel" htmlFor="printButton" className="display-none">{"Print"}</label>
                    <input id="printButton" type="button" className="k-button" value="Print" style={{"display": "none"}} aria-labelledby="printButtonLabel" aria-hidden="false" data-testid="printButton" />{" "}</div>{" "}<div className="editor-button-nav-right">{" "}<label id="alt2ButtonLabel" htmlFor="alt2Button" className="display-none">{"Alt2"}</label>
                    <input id="alt2Button" type="button" className="k-button" value="Alt2" style={{"display": "none"}} aria-labelledby="alt2ButtonLabel" aria-hidden="false" data-testid="alt2Button" />{" "}<label id="alt3ButtonLabel" htmlFor="alt3Button" className="display-none">{"Alt3"}</label>
                    <input id="alt3Button" type="button" className="k-button btn-spacer-left" value="Alt3" style={{"display": "none"}} aria-labelledby="alt3ButtonLabel" aria-hidden="false" data-testid="alt3Button" />{" "}<label id="cancelButtonLabel" htmlFor="cancelButton" className="display-none">{"Cancel"}</label>
                    <input id="cancelButton" type="button" className="k-button btn-spacer-left" value="Cancel" aria-labelledby="cancelButtonLabel" aria-hidden="false" style={{}} data-kit-action="cancel" data-testid="cancelButton" />{" "}<label id="nextButtonLabel" htmlFor="nextButton" className="display-none">{"Search"}</label>
                    <input id="nextButton" type="button" className="k-button btn-spacer-left" value="Search" aria-labelledby="nextButtonLabel" aria-hidden="false" style={{}} data-kit-action="search" data-testid="nextButton" />{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</fieldset>{" "}<div className="clear-n-pad"></div>{" "}<div id="searchResults" style={{"display": "none"}} data-kit-h="h3">{" "}<div className="row">{" "}<div className="content-panel-container" id="searchFTPServerCredentialsGrid">{" "}<div className="content-panel-hdr">{"\n                        Search Results\n                    "}</div>{" "}<div id="HelpbtnSearchGrid" className="openHelp help-icon-panel-hdr" data-testid="HelpbtnSearchGrid">{" "}<span className="fa-stack fa-lg clickable" data-testid="button-23">{" "}<i className="fa-solid fa-circle fa-stack-1x help-icon-stack-bkgrnd"></i>{" "}<i className="fa-solid fa-circle fa-stack-2x help-icon-stack-bottom"></i>{" "}<i className="fa-solid fa-circle-question fa-stack-1x help-icon-stack-top" data-testid="button-24"></i>{" "}</span>{" "}</div>{" "}<div className="grid-toolbar-primary align-right">{" "}<span className="k-checkbox-wrap">
                <input data-role="checkbox" id="showInvalidFTPServerCredentialsCheckBox" name="showInvalidFTPServerCredentialsCheckBox" title="Include Invalids" type="checkbox" defaultValue="true" className="k-checkbox" style={{}} data-testid="showInvalidFTPServerCredentialsCheckBox" />
                </span>
              <label htmlFor="showInvalidFTPServerCredentialsCheckBox" className="k-checkbox-label" style={{}}>{"Include Invalids"}</label>
              <input name="showInvalidFTPServerCredentialsCheckBox" type="hidden" defaultValue="false" style={{}} />{" "}</div>{" "}<div id="searchFtpServerCredentialsGridInfo" className="content-panel-bdy">{" "}<KitWidget id="k1" />{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</div>{" "}</form>{" "}</main></KitScreen></>
  );
}
