import { useEffect, useRef } from 'react';
import { useKit } from '../../../kit';

// Screen-specific glue the Provider kit cannot infer.
// Evidence: packs/claims-mgmt-v1/screens/search-claims/capture/js/inline-104.js
const MSG = {
  dateTypeValidation: 'From Date cannot be greater than To Date.',
  patientAccountValidation: 'At least three characters or Numbers are required',
  providerIdRequired: 'Provider ID is required when Svc Location ID is entered',
  searchClaimValidation:
    'At least one search criteria value to be entered along with a date range for Date of Service, Date Received, or Date Paid to initiate the search.',
} as const;

const VALUE = {
  // Search By
  icn: 'ICN',
  tcn: 'TCN',
  mcoIcn: 'MCOICN',

  // Member By
  memberId: 'MI',
  memberName: 'MN',
  patientAcc: 'PAN',

  // Provider
  providerByNpi: 'NP',
  providerById: 'PI',
  providerByName: 'PN',
  providerByTax: 'PT',
  providerByTaxonomy: 'PX',
  performing: 'PF',

  // Date/DX defaults
  defaultDateType: 'DOS',
  defaultDiagnosisType: '02',
  icd09: '01',
  icd10: '02',
} as const;

function q<T extends Element = HTMLElement>(sel: string): T | null {
  return document.querySelector(sel) as T | null;
}

function setDisplay(sel: string, show: boolean, display: string = 'block') {
  const el = q<HTMLElement>(sel);
  if (!el) return;
  el.style.display = show ? display : 'none';
}

function toggleAssocBox(sel: string, on: boolean) {
  const el = q<HTMLElement>(sel);
  if (!el) return;
  el.classList.toggle('assoc-box', on);
}

function clearInputValue(sel: string) {
  const el = q<HTMLInputElement>(sel);
  if (!el) return;
  el.value = '';
}

function clearFieldValidation(sel: string) {
  const el = q<HTMLElement>(sel);
  if (!el) return;

  const input = el as unknown as HTMLInputElement;
  if (typeof input.value === 'string') {
    input.classList.remove('k-invalid');
    input.removeAttribute('aria-invalid');
  }

  const id = (el as HTMLElement).id;
  if (!id) return;
  const msg = q<HTMLElement>(`#${CSS.escape(id)}_validationMessage`);
  if (msg) {
    msg.textContent = '';
    msg.style.display = 'none';
  }
}

function setFieldError(sel: string, message: string) {
  const el = q<HTMLElement>(sel);
  if (!el) return;

  const input = el as unknown as HTMLInputElement;
  if (typeof input.value === 'string') {
    input.classList.add('k-invalid');
    input.setAttribute('aria-invalid', 'true');
  }

  const id = (el as HTMLElement).id;
  if (!id) return;
  const msg = q<HTMLElement>(`#${CSS.escape(id)}_validationMessage`);
  if (msg) {
    msg.textContent = message;
    msg.style.display = '';
  }
}

function showValidationSummary(messages: string[]) {
  const summary = q<HTMLElement>('.validation-summary');
  if (!summary) return;

  const ul = summary.querySelector('ul.validation-errors');
  if (ul) {
    ul.innerHTML = '';
    for (const m of messages) {
      const li = document.createElement('li');
      li.textContent = m;
      ul.appendChild(li);
    }
  }

  summary.style.display = '';
}

function hideValidationSummary() {
  const summary = q<HTMLElement>('.validation-summary');
  if (!summary) return;
  const ul = summary.querySelector('ul.validation-errors');
  if (ul) ul.innerHTML = '';
  summary.style.display = 'none';
}

function showSearchStatusError(message: string) {
  const host = q<HTMLElement>('#searchClaimStatus');
  if (!host) return;

  host.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'msg-inline msg-inline-error';
  div.textContent = message;
  host.appendChild(div);
}

function clearSearchStatus() {
  const host = q<HTMLElement>('#searchClaimStatus');
  if (!host) return;
  host.innerHTML = '';
}

function parseDate(value: string): number | null {
  const t = Date.parse(value);
  return Number.isFinite(t) ? t : null;
}

type KitState = {
  claimIdentifiers: string;
  memberBy: string;
  providerRole: string;
  providerBy: string;
  dateType: string;
  diagnosisType: string;
};

type ChangeEvent = { name: string; id?: string; value: unknown };

export default function SearchClaimsBehavior() {
  const ctx = useKit();
  const bus = ctx?.bus;

  const state = useRef<KitState>({
    claimIdentifiers: '',
    memberBy: '',
    providerRole: '',
    providerBy: VALUE.providerByNpi,
    dateType: VALUE.defaultDateType,
    diagnosisType: VALUE.defaultDiagnosisType,
  });

  const widgetValues = useRef(new Map<string, string>());

  const syncClaimIdentifiers = (value: string) => {
    clearInputValue('#SearchICN');
    clearInputValue('#TCN');
    clearInputValue('#MCOICN');

    setDisplay('#divClaimIdentifiersList_ICN', value === VALUE.icn);
    setDisplay('#divClaimIdentifiersList_TCN', value === VALUE.tcn);
    setDisplay('#divClaimIdentifierscList_MCOICN', value === VALUE.mcoIcn);

    toggleAssocBox('#divClaimsIdentifierAssocBox', value.length > 0);
  };

  const syncMemberBy = (value: string) => {
    clearInputValue('#MemberID');
    clearInputValue('#MemberName');
    clearInputValue('#PatientAccountNumber');

    setDisplay('#divMemberByList_MemberID', value === VALUE.memberId);
    setDisplay('#divMemberByList_MemberName', value === VALUE.memberName);
    setDisplay('#divMemberByList_PatientAccNo', value === VALUE.patientAcc);

    toggleAssocBox('#divMemberByAssocBox', value.length > 0);
  };

  const hideProviderPanels = () => {
    setDisplay('#divProviderByList', false);
    setDisplay('#divProviderByList_NPI', false);
    setDisplay('#divProviderByList_ProviderName', false);
    setDisplay('#divProviderByList_ProviderID', false);
    setDisplay('#divProviderByList_ProviderLocationID', false);
    setDisplay('#divProviderByList_ProviderTaxID', false);
    setDisplay('#divProviderByList_ProviderTaxonomy', false);
  };

  const clearProviderInputs = () => {
    clearInputValue('#NPI');
    clearInputValue('#ProviderName');
    clearInputValue('#ProviderID');
    clearInputValue('#ProviderLocationID');
    clearInputValue('#ProviderTaxID');
    clearInputValue('#ProviderTaxonomy');
  };

  const syncProviderRole = (providerRoleValue: string) => {
    state.current.providerRole = providerRoleValue;
    clearProviderInputs();

    if (!providerRoleValue) {
      state.current.providerBy = VALUE.providerByNpi;
      widgetValues.current.set('ProviderByList', VALUE.providerByNpi);
      hideProviderPanels();
      toggleAssocBox('#divClaimsAssocBox', false);
      return;
    }

    setDisplay('#divProviderByList', true);
    toggleAssocBox('#divClaimsAssocBox', true);
    syncProviderBy(state.current.providerBy);
  };

  const syncProviderBy = (providerByValue: string) => {
    state.current.providerBy = providerByValue || VALUE.providerByNpi;

    clearProviderInputs();
    setDisplay('#divProviderByList_NPI', false);
    setDisplay('#divProviderByList_ProviderName', false);
    setDisplay('#divProviderByList_ProviderID', false);
    setDisplay('#divProviderByList_ProviderLocationID', false);
    setDisplay('#divProviderByList_ProviderTaxID', false);
    setDisplay('#divProviderByList_ProviderTaxonomy', false);

    if (!state.current.providerRole) return;

    switch (state.current.providerBy) {
      case VALUE.providerByNpi:
        setDisplay('#divProviderByList_NPI', true);
        break;
      case VALUE.providerByName:
        setDisplay('#divProviderByList_ProviderName', true);
        break;
      case VALUE.providerByTax:
        setDisplay('#divProviderByList_ProviderTaxID', true);
        break;
      case VALUE.providerByTaxonomy:
        setDisplay('#divProviderByList_ProviderTaxonomy', true);
        break;
      case VALUE.providerById:
        setDisplay('#divProviderByList_ProviderID', true);
        if (state.current.providerRole === VALUE.performing) {
          setDisplay('#divProviderByList_ProviderLocationID', true);
        }
        break;
    }
  };

  const syncDateType = (value: string) => {
    state.current.dateType = value;
    setDisplay('#divDatePanel', !!value, '');
    toggleAssocBox('#divDateTypeAssocBox', value.length > 0);
  };

  const syncDiagnosisType = (value: string) => {
    state.current.diagnosisType = value;

    if (value === VALUE.icd09) {
      clearInputValue('#PrimaryDiagnosisCodeICD09');
      clearInputValue('#PrimaryDiagnosisCodeICD10');
      setDisplay('#diagnosisCodeDiv_ICD09', true);
      setDisplay('#diagnosisCodeDiv_ICD10', false);
      return;
    }

    if (value === VALUE.icd10) {
      clearInputValue('#PrimaryDiagnosisCodeICD09');
      clearInputValue('#PrimaryDiagnosisCodeICD10');
      setDisplay('#diagnosisCodeDiv_ICD10', true);
      setDisplay('#diagnosisCodeDiv_ICD09', false);
      return;
    }

    setDisplay('#diagnosisCodeDiv_ICD09', false);
    setDisplay('#diagnosisCodeDiv_ICD10', false);
  };

  const toggleSearchCriteriaPanel = () => {
    const body = q<HTMLElement>('#divSearchClaims');
    const icon = q<HTMLElement>('#plusMinusSearchClaims');
    const click = q<HTMLElement>('#plusMinusSearchClaimsClick');
    if (!body || !icon || !click) return;

    const isHidden = getComputedStyle(body).display === 'none';
    if (isHidden) {
      body.style.display = 'block';
      icon.classList.add('fa-square-minus');
      icon.classList.remove('fa-square-plus');
      click.classList.add('panel-collapsed');
    } else {
      body.style.display = 'none';
      icon.classList.add('fa-square-plus');
      icon.classList.remove('fa-square-minus');
      click.classList.add('panel-expanded');
    }
  };

  const toggleAdvancedPanel = () => {
    const body = q<HTMLElement>('#divAdvancedSearchClaims');
    const icon = q<HTMLElement>('#plusMinusAdvancedSearchClaims');
    const click = q<HTMLElement>('#plusMinusAdvancedSearchClaimsClick');
    if (!body || !icon || !click) return;

    const isHidden = getComputedStyle(body).display === 'none';
    if (isHidden) {
      body.style.display = 'block';
      icon.classList.add('fa-square-plus');
      icon.classList.remove('fa-square-minus');
      click.classList.add('panel-collapsed');
      icon.setAttribute('title', 'Collapse');
    } else {
      body.style.display = 'none';
      icon.classList.add('fa-square-minus');
      icon.classList.remove('fa-square-plus');
      click.classList.add('panel-expanded');
      icon.setAttribute('title', 'Expand');
    }
  };

  const clearAllValidation = () => {
    clearSearchStatus();
    hideValidationSummary();

    for (const sel of [
      '#FromDate',
      '#ToDate',
      '#SearchICN',
      '#TCN',
      '#MCOICN',
      '#MemberID',
      '#MemberName',
      '#PatientAccountNumber',
      '#NPI',
      '#ProviderName',
      '#ProviderID',
      '#ProviderLocationID',
      '#ProviderTaxID',
    ]) {
      clearFieldValidation(sel);
    }
  };

  const validateAndMaybeBlockSearch = (): boolean => {
    clearAllValidation();

    const errors: string[] = [];

    const from = q<HTMLInputElement>('#FromDate')?.value ?? '';
    const to = q<HTMLInputElement>('#ToDate')?.value ?? '';
    const fromT = parseDate(from);
    const toT = parseDate(to);
    if (fromT !== null && toT !== null && fromT > toT) {
      setFieldError('#FromDate', MSG.dateTypeValidation);
      errors.push(MSG.dateTypeValidation);
    }

    const lengthMin3Selectors = [
      '#SearchICN',
      '#TCN',
      '#MCOICN',
      '#MemberID',
      '#MemberName',
      '#PatientAccountNumber',
      '#NPI',
      '#ProviderName',
      '#ProviderID',
      '#ProviderLocationID',
      '#ProviderTaxID',
    ] as const;

    for (const sel of lengthMin3Selectors) {
      const v = (q<HTMLInputElement>(sel)?.value ?? '').trim();
      if (v && v.length < 3) {
        setFieldError(sel, MSG.patientAccountValidation);
        errors.push(MSG.patientAccountValidation);
      }
    }

    const svcLoc = (q<HTMLInputElement>('#ProviderLocationID')?.value ?? '').trim();
    const providerId = (q<HTMLInputElement>('#ProviderID')?.value ?? '').trim();
    if (svcLoc && !providerId) {
      setFieldError('#ProviderID', MSG.providerIdRequired);
      errors.push(MSG.providerIdRequired);
    }

    // Criteria present?
    const hasAnyText = (selectors: readonly string[]) =>
      selectors.some((s) => ((q<HTMLInputElement>(s)?.value ?? '').trim().length > 0));

    const hasClaimIdentifier = (() => {
      if (!state.current.claimIdentifiers) return false;
      if (state.current.claimIdentifiers === VALUE.icn) return (q<HTMLInputElement>('#SearchICN')?.value ?? '').trim().length > 0;
      if (state.current.claimIdentifiers === VALUE.tcn) return (q<HTMLInputElement>('#TCN')?.value ?? '').trim().length > 0;
      if (state.current.claimIdentifiers === VALUE.mcoIcn) return (q<HTMLInputElement>('#MCOICN')?.value ?? '').trim().length > 0;
      return false;
    })();

    const hasMember = (() => {
      if (!state.current.memberBy) return false;
      if (state.current.memberBy === VALUE.memberId) return (q<HTMLInputElement>('#MemberID')?.value ?? '').trim().length > 0;
      if (state.current.memberBy === VALUE.memberName) return (q<HTMLInputElement>('#MemberName')?.value ?? '').trim().length > 0;
      if (state.current.memberBy === VALUE.patientAcc) return (q<HTMLInputElement>('#PatientAccountNumber')?.value ?? '').trim().length > 0;
      return false;
    })();

    const hasProvider = (() => {
      if (!state.current.providerRole) return false;
      return hasAnyText([
        '#NPI',
        '#ProviderName',
        '#ProviderID',
        '#ProviderLocationID',
        '#ProviderTaxID',
        '#ProviderTaxonomy',
      ]);
    })();

    // Any other widget value besides the always-set defaults counts as a criteria.
    const hasOtherWidgetCriteria = (() => {
      const ignored = new Set<string>([
        'DateTypeList',
        'FromDate',
        'ToDate',
        'DiagnosisTypeList',
        'ProviderByList',
        'ClaimIdentifiersList',
        'MemberByList',
        'ProviderRoleList',
      ]);
      for (const [name, value] of widgetValues.current.entries()) {
        if (ignored.has(name)) continue;
        if (value && String(value).trim().length > 0) return true;
      }
      return false;
    })();

    const hasAdvancedTextCriteria = hasAnyText([
      '#AuthorizationNumber',
      '#OperatorIdentifier',
      '#RANumber',
      '#TotalBilledRangeFrom',
      '#TotalBilledRangeTo',
      '#ProcCodeFrom',
      '#ProcCodeTo',
      '#ToothNumberFrom',
      '#ToothNumberTo',
      '#Modifiers1',
      '#Modifiers2',
      '#Modifiers3',
      '#Modifiers4',
      '#ExceptionErrorCode',
      '#PrimaryDiagnosisCodeICD09',
      '#PrimaryDiagnosisCodeICD10',
    ]);

    const hasCriteria = hasClaimIdentifier || hasMember || hasProvider || hasOtherWidgetCriteria || hasAdvancedTextCriteria;
    if (!hasCriteria) {
      showSearchStatusError(MSG.searchClaimValidation);
      errors.push(MSG.searchClaimValidation);
    }

    if (errors.length > 0) {
      // Dedupe but keep order.
      const unique: string[] = [];
      for (const e of errors) if (!unique.includes(e)) unique.push(e);
      showValidationSummary(unique);
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!bus) return;

    // Initial state: match capture defaults.
    syncClaimIdentifiers(state.current.claimIdentifiers);
    syncMemberBy(state.current.memberBy);
    syncProviderRole(state.current.providerRole);
    syncDateType(state.current.dateType);
    syncDiagnosisType(state.current.diagnosisType);

    const unsubChange = bus.on('change', ({ name, value }: ChangeEvent) => {
      widgetValues.current.set(name, String(value ?? ''));

      switch (name) {
        case 'ClaimIdentifiersList':
          state.current.claimIdentifiers = String(value ?? '');
          syncClaimIdentifiers(state.current.claimIdentifiers);
          break;
        case 'MemberByList':
          state.current.memberBy = String(value ?? '');
          syncMemberBy(state.current.memberBy);
          break;
        case 'ProviderRoleList':
          syncProviderRole(String(value ?? ''));
          break;
        case 'ProviderByList':
          syncProviderBy(String(value ?? ''));
          break;
        case 'DateTypeList':
          syncDateType(String(value ?? ''));
          break;
        case 'DiagnosisTypeList':
          syncDiagnosisType(String(value ?? ''));
          break;
      }
    });

    const unsubReset = bus.on('reset', () => {
      clearAllValidation();

      state.current.claimIdentifiers = '';
      state.current.memberBy = '';
      state.current.providerRole = '';
      state.current.providerBy = VALUE.providerByNpi;
      state.current.dateType = VALUE.defaultDateType;
      state.current.diagnosisType = VALUE.defaultDiagnosisType;

      widgetValues.current.clear();
      widgetValues.current.set('ProviderByList', VALUE.providerByNpi);
      widgetValues.current.set('DateTypeList', VALUE.defaultDateType);
      widgetValues.current.set('DiagnosisTypeList', VALUE.defaultDiagnosisType);

      syncClaimIdentifiers('');
      syncMemberBy('');
      syncProviderRole('');
      syncDateType(VALUE.defaultDateType);
      syncDiagnosisType(VALUE.defaultDiagnosisType);

      setDisplay('#claimsSearchResultsPanel', false);
    });

    const onClickCapture = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      if (t.closest('#plusMinusSearchClaimsClick')) {
        toggleSearchCriteriaPanel();
        return;
      }

      if (t.closest('#plusMinusAdvancedSearchClaimsClick')) {
        toggleAdvancedPanel();
        return;
      }

      if (t.closest('#nextButton')) {
        if (!validateAndMaybeBlockSearch()) {
          e.preventDefault();
          e.stopPropagation();
          (e as unknown as { stopImmediatePropagation?: () => void }).stopImmediatePropagation?.();
        } else {
          clearSearchStatus();
        }
        return;
      }

      if (t.closest('#cancelButton')) {
        e.preventDefault();
        e.stopPropagation();
        (e as unknown as { stopImmediatePropagation?: () => void }).stopImmediatePropagation?.();
        clearAllValidation();
        setDisplay('#claimsSearchResultsPanel', false);
        window.location.hash = '#/';
      }
    };

    document.addEventListener('click', onClickCapture, true);

    return () => {
      unsubChange?.();
      unsubReset?.();
      document.removeEventListener('click', onClickCapture, true);
    };
  }, [bus]);

  return null;
}
