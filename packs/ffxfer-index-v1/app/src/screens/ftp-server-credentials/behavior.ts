// Screen-specific behavior for ffxfer-index-v1/ftp-server-credentials.
// The Provider kit handles widgets and generic actions (Search/Reset/dialog/grid/etc.).
// This file fills the gaps the kit cannot know: collapse wiring, validation, and Cancel navigation.

type ValidationError = { field: string; message: string };

function decodeHtmlEntities(text: string): string {
  return text
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function getForm(): HTMLFormElement | null {
  return document.querySelector('main[role="main"] form.k-content');
}

function isShown(el: HTMLElement | null | undefined): boolean {
  if (!el) return false;
  return el.getClientRects().length > 0;
}

function clearValidation(form: Element) {
  form.querySelectorAll('.k-invalid').forEach((e) => e.classList.remove('k-invalid'));
  form.querySelectorAll<HTMLElement>('span.k-invalid-msg').forEach((e) => {
    e.textContent = '';
    e.classList.remove('field-validation-error');
    e.style.removeProperty('display');
  });

  const summary = form.querySelector<HTMLElement>('.editor-validation-summary.validation-summary');
  if (summary) {
    summary.style.display = 'none';
    summary.querySelectorAll('ul.validation-errors li').forEach((li) => li.remove());
  }
}

function showSummary(form: Element, errors: ValidationError[]) {
  const summary = form.querySelector<HTMLElement>('.editor-validation-summary.validation-summary');
  if (!summary) return;

  const list = summary.querySelector<HTMLUListElement>('ul.validation-errors');
  if (list) {
    list.replaceChildren(
      ...errors.map((e) => {
        const li = document.createElement('li');
        li.textContent = e.message;
        return li;
      })
    );
  }
  summary.style.removeProperty('display');
  if (getComputedStyle(summary).display === 'none') summary.style.display = 'block';
}

function setFieldError(form: Element, fieldId: string, message: string): ValidationError {
  const input =
    form.querySelector<HTMLInputElement>(`#${CSS.escape(fieldId)}`) ??
    form.querySelector<HTMLInputElement>(`[name="${CSS.escape(fieldId)}"]`);
  const wrap = input?.closest('.k-input, .k-picker, .k-dropdownlist, .k-numerictextbox') ?? input;
  wrap?.classList.add('k-invalid');

  const slot =
    form.querySelector<HTMLElement>(`#${CSS.escape(fieldId)}_validationMessage`) ??
    form.querySelector<HTMLElement>(`span.k-invalid-msg[data-for="${CSS.escape(fieldId)}"]`);

  if (slot) {
    slot.textContent = message;
    slot.classList.add('field-validation-error');
    slot.style.display = 'block';
  }

  return { field: fieldId, message };
}

function validateServerName(form: Element): ValidationError[] {
  const input = form.querySelector<HTMLInputElement>('#FtpServerName');
  if (!input) return [];

  const v = (input.value ?? '').trim();
  if (!v) return [];

  const max = input.maxLength;
  if (Number.isFinite(max) && max > 0 && v.length > max) {
    const msg = input.getAttribute('data-val-length-max');
    return [setFieldError(form, 'FtpServerName', decodeHtmlEntities(msg ?? 'Server Name is too long.'))];
  }

  const patRaw = input.getAttribute('data-val-regex-pattern');
  if (patRaw) {
    const pat = decodeHtmlEntities(patRaw);
    try {
      if (!new RegExp(pat).test(v)) {
        const msg = input.getAttribute('data-val-regex');
        return [setFieldError(form, 'FtpServerName', decodeHtmlEntities(msg ?? 'Server Name is invalid.'))];
      }
    } catch {
      // If the legacy regex cannot be compiled, do not block search.
    }
  }

  return [];
}

function validateAll(form: Element): { ok: boolean; errors: ValidationError[] } {
  clearValidation(form);

  const errors: ValidationError[] = [];
  errors.push(...validateServerName(form));
  if (errors.length) showSummary(form, errors);
  return { ok: errors.length === 0, errors };
}

function hideSearchResults(form: Element) {
  const results = form.querySelector<HTMLElement>('#searchResults');
  if (results) results.style.display = 'none';
}

function clearCriteria(form: Element) {
  const serverName = form.querySelector<HTMLInputElement>('#FtpServerName');
  if (serverName) serverName.value = '';

  const includeInvalids = form.querySelector<HTMLInputElement>('#showInvalidFTPServerCredentialsCheckBox');
  if (includeInvalids) includeInvalids.checked = false;
}

export function initFtpServerCredentialsBehavior() {
  // The shared shell port includes overlays (menu/backdrop) visible by default;
  // hide them at rest so verify can interact with the page like the capture.
  const menu = document.querySelector<HTMLElement>('#mainMenuContainer');
  if (menu) menu.style.display = 'none';
  const backdrop = document.querySelector<HTMLElement>('.disabled-backdrop');
  if (backdrop) backdrop.style.display = 'none';

  const form = getForm();
  if (!form) return () => {};

  // Match the legacy screen: Search Results is hidden until Search.
  hideSearchResults(form);

  const criteriaToggle = form.querySelector<HTMLElement>('#criteriaPanel');
  const criteriaBody = form.querySelector<HTMLElement>('#FTPServerCredentialsSearch');

  // Wire the panel to the Provider kit's collapse behavior.
  const criteriaHdrTools = (criteriaBody?.previousElementSibling as HTMLElement | null);
  criteriaHdrTools?.setAttribute('data-kit-action', 'collapse');
  criteriaBody?.setAttribute('data-kit-collapse', '');

  const syncCriteriaIcon = (opening: boolean) => {
    if (!criteriaToggle) return;
    criteriaToggle.classList.toggle('fa-angle-up', opening);
    criteriaToggle.classList.toggle('fa-angle-down', !opening);
    criteriaToggle.setAttribute('title', opening ? 'Collapse' : 'Expand');
  };

  const onCriteriaToggleCapture = (e: Event) => {
    // The kit stops propagation; run in capture and only sync icon/title.
    if (!criteriaBody) return;
    const opening = !isShown(criteriaBody);
    syncCriteriaIcon(opening);
  };

  const onResetCapture = () => {
    clearValidation(form);
    clearCriteria(form);
    hideSearchResults(form);

    // Expand criteria if it was collapsed.
    if (criteriaToggle && criteriaBody && !isShown(criteriaBody)) criteriaToggle.click();
  };

  const onSearchCapture = (e: Event) => {
    const res = validateAll(form);
    if (!res.ok) {
      e.preventDefault();
      (e as any).stopImmediatePropagation?.();
      e.stopPropagation();
      return;
    }

    // After Search reveals results, collapse the criteria panel (matches capture).
    queueMicrotask(() => {
      if (criteriaToggle && criteriaBody && isShown(criteriaBody)) criteriaToggle.click();
    });
  };

  const onCancelCapture = (e: Event) => {
    // Spec marks destination as [UNKNOWN]; choose Home route to avoid navigating off-app.
    e.preventDefault();
    (e as any).stopImmediatePropagation?.();
    e.stopPropagation();
    globalThis.location.hash = '#/';
  };

  const resetButton = form.querySelector<HTMLElement>('#resetButton');
  const searchButton = form.querySelector<HTMLElement>('#nextButton');
  const cancelButton = form.querySelector<HTMLElement>('#cancelButton');

  criteriaToggle?.addEventListener('click', onCriteriaToggleCapture, true);
  resetButton?.addEventListener('click', onResetCapture, true);
  searchButton?.addEventListener('click', onSearchCapture, true);
  cancelButton?.addEventListener('click', onCancelCapture, true);

  // Optional: allow parity harness to call legacy-style validation.
  (globalThis as any).Page_ClientValidate = () => validateAll(form).ok;

  return () => {
    criteriaToggle?.removeEventListener('click', onCriteriaToggleCapture, true);
    resetButton?.removeEventListener('click', onResetCapture, true);
    searchButton?.removeEventListener('click', onSearchCapture, true);
    cancelButton?.removeEventListener('click', onCancelCapture, true);

    const g = globalThis as any;
    if (g.Page_ClientValidate) delete g.Page_ClientValidate;
  };
}

