import { useEffect } from 'react';

function setVisible(el: HTMLElement | null, visible: boolean) {
  if (!el) return;
  el.style.display = visible ? '' : 'none';
}

function textValue(el: HTMLInputElement | null) {
  return (el?.value ?? '').trim();
}

function isFtpLike(protocol: string) {
  const p = protocol.trim().toLowerCase();
  return p === 'ftp' || p === 'sftp' || p === 'ftps';
}

function syncRunSchedule() {
  const weeklyChecked = document.querySelector<HTMLInputElement>('input[name="RunSchedule.ID"][value="1"]')?.checked ?? false;
  const monthlyChecked = document.querySelector<HTMLInputElement>('input[name="RunSchedule.ID"][value="2"]')?.checked ?? false;
  setVisible(document.getElementById('RunType_Weekly'), weeklyChecked);
  setVisible(document.getElementById('RunType_Monthly'), monthlyChecked);
  if (!weeklyChecked && !monthlyChecked) {
    setVisible(document.getElementById('RunType_Weekly'), false);
    setVisible(document.getElementById('RunType_Monthly'), false);
  }
}

function syncSourceProtocol() {
  const protocol = textValue(document.getElementById('ProtocolTypeList') as HTMLInputElement | null);
  // legacy convention: UNC is path-based, others use Server
  setVisible(document.getElementById('ftpServer'), isFtpLike(protocol));
}

function syncDestinationProtocol() {
  const protocol = textValue(document.getElementById('DestinationProtocolList') as HTMLInputElement | null);
  setVisible(document.getElementById('divFTPId'), isFtpLike(protocol));
}

function syncRenameAtDestination() {
  const checked = document.querySelector<HTMLInputElement>('#RenameAtDestination')?.checked ?? false;
  setVisible(document.getElementById('divRenamePatternId'), checked);
}

function syncDestinationType() {
  const t = textValue(document.getElementById('DestinationTypeList') as HTMLInputElement | null);
  const isFte = t.toLowerCase().includes('fte');
  setVisible(document.getElementById('divContractName'), isFte);
  setVisible(document.getElementById('divFTEMetadataId'), isFte);
  setVisible(document.getElementById('divInstructions'), isFte);
}

function syncDestinationEditMode() {
  const updateId = textValue(document.getElementById('updateDestinationId') as HTMLInputElement | null);
  const editing = updateId.length > 0;
  setVisible(document.getElementById('DestinationRemoveButton'), editing);
  setVisible(document.getElementById('UpdateAndCloseButton'), editing);
}

function hideSearchResults() {
  const panel = document.getElementById('searchFileTransferConfigResultsPanel');
  if (panel) panel.style.display = 'none';
}

function hidePageSummary() {
  const s = document.querySelector<HTMLElement>('#FileTransferSearchForm [data-kit-h="h1"]');
  if (s) s.style.display = 'none';
  s?.querySelector('.validation-errors')?.replaceChildren();
}

function syncValidationSummaries(root: ParentNode = document) {
  for (const summary of Array.from(root.querySelectorAll<HTMLElement>('.validation-summary'))) {
    const list = summary.querySelector<HTMLUListElement>('ul.validation-errors');
    if (!list) continue;

    const msgs = Array.from(summary.closest('form')?.querySelectorAll<HTMLElement>('.k-invalid-msg') ?? [])
      .map((e) => (e.textContent ?? '').trim())
      .filter(Boolean);

    if (msgs.length === 0) {
      summary.style.display = 'none';
      list.replaceChildren();
      continue;
    }

    summary.style.display = '';
    // Keep it simple: mirror field messages into the summary list.
    list.replaceChildren(...msgs.map((m) => {
      const li = document.createElement('li');
      li.textContent = m;
      return li;
    }));
  }
}

function showDestinationDetailsFromRow(row: HTMLTableRowElement) {
  const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>('td'));
  const address = (cells[0]?.textContent ?? '').trim();
  const protocol = (cells[1]?.textContent ?? '').trim();
  const contact = (cells[2]?.textContent ?? '').trim();

  setVisible(document.getElementById('divDestinationConfigurationView'), true);

  const setInput = (id: string, v: string) => {
    const i = document.getElementById(id) as HTMLInputElement | null;
    if (i) i.value = v;
  };

  setInput('viewDestinationAddress', address);
  setInput('DestinationProtocolListText', protocol);
  setInput('viewContactName', contact);
}

export default function FileTransferConfigurationBehavior() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      if (t.closest('#cancelButton')) {
        // Guess (no explicit handler in the captured screen js): treat Cancel like Reset + hide results.
        (document.getElementById('resetButton') as HTMLInputElement | null)?.click();
        hideSearchResults();
        hidePageSummary();
        return;
      }

      const close = t.closest<HTMLElement>('.validation-summary [data-hide="alert"]');
      if (close) {
        const summary = close.closest<HTMLElement>('.validation-summary');
        if (summary) {
          summary.style.display = 'none';
          summary.querySelector('ul.validation-errors')?.replaceChildren();
        }
        return;
      }

      const destRow = t.closest<HTMLTableRowElement>('#FileTransferDestinationGrid tbody tr');
      if (destRow) {
        showDestinationDetailsFromRow(destRow);
      }
    };

    const onChange = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      if (t instanceof HTMLInputElement) {
        if (t.id === 'ProtocolTypeList') syncSourceProtocol();
        if (t.name === 'RunSchedule.ID') syncRunSchedule();
        if (t.id === 'DestinationProtocolList') syncDestinationProtocol();
        if (t.id === 'DestinationTypeList') syncDestinationType();
        if (t.id === 'RenameAtDestination') syncRenameAtDestination();
        if (t.id === 'updateDestinationId') syncDestinationEditMode();
      }

      // Validation summaries are built from whatever messages exist.
      syncValidationSummaries();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('change', onChange);

    const mo = new MutationObserver(() => {
      syncValidationSummaries();
      syncSourceProtocol();
      syncRunSchedule();
      syncDestinationProtocol();
      syncRenameAtDestination();
      syncDestinationType();
      syncDestinationEditMode();
    });

    mo.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'value', 'checked']
    });

    // initial sync
    syncValidationSummaries();
    syncSourceProtocol();
    syncRunSchedule();
    syncDestinationProtocol();
    syncRenameAtDestination();
    syncDestinationType();
    syncDestinationEditMode();

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('change', onChange);
      mo.disconnect();
    };
  }, []);

  return null;
}
