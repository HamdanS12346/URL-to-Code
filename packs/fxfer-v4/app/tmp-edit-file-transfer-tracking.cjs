const fs = require('fs');

const p = 'src/screens/file-transfer-tracking/Page.tsx';
let s = fs.readFileSync(p, 'utf8');

s = s.replace("import { useLayoutEffect } from 'react';", "import { useEffect, useLayoutEffect } from 'react';");
s = s.replace("import { KitScreen, KitWidget, type KitData } from '../../kit';", "import { KitScreen, KitWidget, useKit, type KitData } from '../../kit';");

if (!s.includes('function ScreenBehavior()')) {
  const marker = '// fxfer-v4/file-transfer-tracking: static port of the capture. Behavior comes from spec/UI_SPEC.md + BEHAVIOR.md.';
  const idx = s.indexOf(marker);
  if (idx < 0) throw new Error('marker not found');

  const insert = `function ScreenBehavior() {
  const { bus } = useKit();

  useEffect(() => {
    const resultsPanel = document.getElementById('searchFileTrackingResultsPanel') as HTMLElement | null;
    const summary = document.querySelector<HTMLElement>('.editor-validation-summary.validation-summary[data-kit-h="h1"]');
    const summaryList = summary?.querySelector('ul.validation-errors') as HTMLUListElement | null | undefined;
    const summaryClose = summary?.querySelector<HTMLElement>('[data-hide="alert"]');

    const hideSummaryErrors = () => {
      if (!summary) return;
      summary.style.display = 'none';
      if (summaryList) summaryList.innerHTML = '';
    };

    const showSummaryError = (message: string) => {
      if (!summary || !summaryList) return;
      summaryList.innerHTML = '';
      const li = document.createElement('li');
      li.textContent = message;
      summaryList.appendChild(li);
      summary.style.display = '';
    };

    const hasAnyCriteria = () => {
      const ids = [
        'FileId',
        'FileName',
        'FileStatusList',
        'DirectionList',
        'TransportTypeList',
        'SourceLocation',
        'TradingPartnerId',
        'FromDate',
        'ToDate',
        'FromSize',
        'ToSize',
      ];
      return ids.some((id) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        const v = el?.value;
        return typeof v === 'string' ? v.trim() !== '' : v != null;
      });
    };

    const onReset = () => {
      hideSummaryErrors();
      if (resultsPanel) resultsPanel.style.display = 'none';
      (document.getElementById('FileId') as HTMLInputElement | null)?.focus();
    };

    const onSearch = () => {
      hideSummaryErrors();
    };

    const offReset = bus.on('reset', onReset);
    const offSearch = bus.on('search', onSearch);

    const onCancelClickCapture = (e: Event) => {
      hideSummaryErrors();
      if (resultsPanel) resultsPanel.style.display = 'none';
      window.location.hash = '#/';
      e.preventDefault();
      (e as any).stopImmediatePropagation?.();
      e.stopPropagation();
    };

    const onSearchClickCapture = (e: Event) => {
      hideSummaryErrors();
      if (!hasAnyCriteria()) {
        if (resultsPanel) resultsPanel.style.display = 'none';
        showSummaryError('At least one search criteria is required.');
        e.preventDefault();
        (e as any).stopImmediatePropagation?.();
        e.stopPropagation();
      }
    };

    const cancelButton = document.getElementById('cancelButton');
    cancelButton?.addEventListener('click', onCancelClickCapture, true);

    const searchButton = document.getElementById('nextButton');
    searchButton?.addEventListener('click', onSearchClickCapture, true);

    const onCloseSummary = (e: Event) => {
      e.preventDefault();
      hideSummaryErrors();
    };
    summaryClose?.addEventListener('click', onCloseSummary);

    return () => {
      cancelButton?.removeEventListener('click', onCancelClickCapture, true);
      searchButton?.removeEventListener('click', onSearchClickCapture, true);
      summaryClose?.removeEventListener('click', onCloseSummary);
      offReset?.();
      offSearch?.();
    };
  }, [bus]);

  return null;
}

`;

  s = s.slice(0, idx) + insert + s.slice(idx);
}

s = s.replace(
  '<><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><main',
  '<><KitScreen screen={kit as unknown as KitData} dialogs={{  }} services={services}><ScreenBehavior /><main'
);

fs.writeFileSync(p, s, 'utf8');
