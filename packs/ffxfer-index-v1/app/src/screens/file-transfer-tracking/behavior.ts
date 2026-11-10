// Screen-specific behavior for ffxfer-index-v1/file-transfer-tracking.
// The Provider kit handles widgets and generic actions (Search/Reset/grid/etc.).
// This file fills the gaps the kit cannot know: validation and Cancel navigation.

import kit from './kit.json';

type ValidationError = { field: string; message: string };

type DateTimeMessages = { date: string; datetime: string };

type NumericMessages = { number: string; regex: string; pattern: string };

function decodeHtmlEntities(text: string): string {
  return text
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function toInt(value: string): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : NaN;
}

function strictParseDateTime(value: string): { ok: true; kind: 'ok' } | { ok: false; kind: 'format' | 'date' } {
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, kind: 'ok' };

  const m = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)$/i);
  if (!m) return { ok: false, kind: 'format' };

  const month = toInt(m[1]);
  const day = toInt(m[2]);
  const year = toInt(m[3]);
  let hour12 = toInt(m[4]);
  const minute = toInt(m[5]);
  const ampm = m[6].toUpperCase();

  if (!(month >= 1 && month <= 12)) return { ok: false, kind: 'date' };
  if (!(day >= 1 && day <= 31)) return { ok: false, kind: 'date' };
  if (!Number.isFinite(year) || year < 1) return { ok: false, kind: 'date' };
  if (!(hour12 >= 1 && hour12 <= 12)) return { ok: false, kind: 'format' };
  if (!(minute >= 0 && minute <= 59)) return { ok: false, kind: 'format' };

  if (ampm !== 'AM' && ampm !== 'PM') return { ok: false, kind: 'format' };

  let hour = hour12 % 12;
  if (ampm === 'PM') hour += 12;

  const dt = new Date(year, month - 1, day, hour, minute, 0, 0);
  if (
    dt.getFullYear() !== year ||
    dt.getMonth() !== month - 1 ||
    dt.getDate() !== day ||
    dt.getHours() !== hour ||
    dt.getMinutes() !== minute
  ) {
    return { ok: false, kind: 'date' };
  }

  return { ok: true, kind: 'ok' };
}

function getForm(): HTMLFormElement | null {
  return document.querySelector('main[role="main"] form.k-content');
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
    list.replaceChildren(...errors.map((e) => {
      const li = document.createElement('li');
      li.textContent = e.message;
      return li;
    }));
  }
  summary.style.removeProperty('display');
  if (getComputedStyle(summary).display === 'none') summary.style.display = 'block';
}

function setFieldError(form: Element, fieldId: string, message: string): ValidationError {
  const input = form.querySelector<HTMLInputElement>(`#${CSS.escape(fieldId)}`) ?? form.querySelector<HTMLInputElement>(`[name="${CSS.escape(fieldId)}"]`);
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

function validateTextField(form: Element, fieldId: string): ValidationError[] {
  const input = form.querySelector<HTMLInputElement>(`#${CSS.escape(fieldId)}`);
  if (!input) return [];

  const v = (input.value ?? '').trim();
  if (!v) return [];

  const max = input.maxLength;
  if (Number.isFinite(max) && max > 0 && v.length > max) {
    const msg = input.getAttribute('data-val-length-max');
    return [setFieldError(form, fieldId, decodeHtmlEntities(msg ?? `${fieldId} is too long.`))];
  }

  const patRaw = input.getAttribute('data-val-regex-pattern');
  if (patRaw) {
    const pat = decodeHtmlEntities(patRaw);
    try {
      if (!new RegExp(pat).test(v)) {
        const msg = input.getAttribute('data-val-regex');
        return [setFieldError(form, fieldId, decodeHtmlEntities(msg ?? `${fieldId} is invalid.`))];
      }
    } catch {
      // If the legacy regex can't be compiled, do not block search.
    }
  }

  return [];
}

function validateDateTimeField(form: Element, fieldId: string, messages: DateTimeMessages): ValidationError[] {
  const input = form.querySelector<HTMLInputElement>(`#${CSS.escape(fieldId)}`) ?? form.querySelector<HTMLInputElement>(`[name="${CSS.escape(fieldId)}"]`);
  if (!input) return [];

  const v = (input.value ?? '').trim();
  if (!v) return [];

  const parsed = strictParseDateTime(v);
  if (!parsed.ok) {
    const msg = parsed.kind === 'format' ? messages.datetime : messages.date;
    return [setFieldError(form, fieldId, msg)];
  }

  return [];
}

function validateNumericField(form: Element, fieldId: string, messages: NumericMessages): ValidationError[] {
  const input = form.querySelector<HTMLInputElement>(`#${CSS.escape(fieldId)}`) ?? form.querySelector<HTMLInputElement>(`[name="${CSS.escape(fieldId)}"]`);
  if (!input) return [];

  const v = (input.value ?? '').trim();
  if (!v) return [];

  try {
    const re = new RegExp(messages.pattern);
    if (!re.test(v)) return [setFieldError(form, fieldId, messages.regex || messages.number)];
  } catch {
    // fallback: should never happen with captured regex
    if (!Number.isFinite(Number(v))) return [setFieldError(form, fieldId, messages.number)];
  }

  return [];
}

function validateAll(form: Element): { ok: boolean; errors: ValidationError[] } {
  clearValidation(form);

  const widgets = (kit as any).widgets as Record<string, any>;
  const fromDateMessages: DateTimeMessages = widgets.k5.validation;
  const toDateMessages: DateTimeMessages = widgets.k6.validation;
  const fromSizeMessages: NumericMessages = {
    number: widgets.k7.validation.number,
    regex: widgets.k7.validation.regex,
    pattern: widgets.k7.validationParams['regex-pattern']
  };
  const toSizeMessages: NumericMessages = {
    number: widgets.k8.validation.number,
    regex: widgets.k8.validation.regex,
    pattern: widgets.k8.validationParams['regex-pattern']
  };

  const errors: ValidationError[] = [];
  errors.push(...validateTextField(form, 'FileId'));
  errors.push(...validateTextField(form, 'FileName'));
  errors.push(...validateTextField(form, 'TradingPartnerId'));
  errors.push(...validateDateTimeField(form, 'FromDate', fromDateMessages));
  errors.push(...validateDateTimeField(form, 'ToDate', toDateMessages));
  errors.push(...validateNumericField(form, 'FromSize', fromSizeMessages));
  errors.push(...validateNumericField(form, 'ToSize', toSizeMessages));

  if (errors.length) showSummary(form, errors);
  return { ok: errors.length === 0, errors };
}

export function initFileTransferTrackingBehavior() {
  // The shared shell port includes overlays (menu/backdrop) visible by default;
  // hide them at rest so verify can interact with the page like the capture.
  const menu = document.querySelector<HTMLElement>("#mainMenuContainer");
  if (menu) menu.style.display = "none";
  const backdrop = document.querySelector<HTMLElement>(".disabled-backdrop");
  if (backdrop) backdrop.style.display = "none";

  const form = getForm();
  if (!form) return () => {};

  // Enable the kit's collapse animation for this panel (capture did not stamp the action attributes).
  const collapseButton = form.querySelector<HTMLElement>('[data-testid="button-collapse"]');
  collapseButton?.setAttribute('data-kit-action', 'collapse');
  const panelBody = form.querySelector<HTMLElement>('#searchFileTrackingPanel');
  panelBody?.setAttribute('data-kit-collapse', '');

  const onResetCapture = () => clearValidation(form);

  const onSearchCapture = (e: Event) => {
    const res = validateAll(form);
    if (!res.ok) {
      e.preventDefault();
      (e as any).stopImmediatePropagation?.();
      e.stopPropagation();
    }
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

  resetButton?.addEventListener('click', onResetCapture, true);
  searchButton?.addEventListener('click', onSearchCapture, true);
  cancelButton?.addEventListener('click', onCancelCapture, true);

  // Optional: allow parity harness to call legacy-style validation.
  (globalThis as any).Page_ClientValidate = () => validateAll(form).ok;

  return () => {
    resetButton?.removeEventListener('click', onResetCapture, true);
    searchButton?.removeEventListener('click', onSearchCapture, true);
    cancelButton?.removeEventListener('click', onCancelCapture, true);

    const g = globalThis as any;
    if (g.Page_ClientValidate) delete g.Page_ClientValidate;
  };
}
