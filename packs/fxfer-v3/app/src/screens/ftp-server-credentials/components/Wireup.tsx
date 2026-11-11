import { useEffect, useRef } from 'react';
import { useKit } from '../../../kit';

export default function Wireup() {
  const { bus } = useKit() as any;
  const searchFromButtonRef = useRef(false);

  useEffect(() => {
    const searchButton = document.getElementById('nextButton');
    const cancelButton = document.getElementById('cancelButton');

    const serverNameInput = document.getElementById('FtpServerName') as HTMLInputElement | null;
    const includeInvalids = document.getElementById(
      'showInvalidFTPServerCredentialsCheckBox'
    ) as HTMLInputElement | null;

    const resultsPanel = document.getElementById('searchResults') as HTMLElement | null;

    const setResultsVisible = (visible: boolean) => {
      if (!resultsPanel) return;
      resultsPanel.style.display = visible ? '' : 'none';
    };
    const setCriteriaCollapsed = (collapsed: boolean) => {
      const icon = document.getElementById('criteriaPanel');
      const body = document.getElementById('FTPServerCredentialsSearch') as HTMLElement | null;
      if (!icon || !body) return;

      if (collapsed) {
        body.style.display = 'none';
        icon.classList.remove('fa-angle-up');
        icon.classList.add('fa-angle-down');
        icon.setAttribute('title', 'Expand');
      } else {
        body.style.display = '';
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-up');
        icon.setAttribute('title', 'Collapse');
      }
    };

    const valuesFromDom = () => ({
      FtpServerName: serverNameInput?.value ?? '',
      showInvalidFTPServerCredentialsCheckBox: includeInvalids?.checked ? 'true' : 'false',
    });

    const onSearchClickCapture = () => {
      searchFromButtonRef.current = true;
    };

    searchButton?.addEventListener('click', onSearchClickCapture, true);

    const unsubSearch = bus.on('search', () => {
      const fromButton = searchFromButtonRef.current;
      searchFromButtonRef.current = false;

      // Legacy script clears Include Invalids on every Search.
      if (fromButton && includeInvalids) includeInvalids.checked = false;

      // Ensure results panel is visible and criteria collapses once results are bound.
      setResultsVisible(true);
      setCriteriaCollapsed(true);
    });

    const unsubReset = bus.on('reset', () => {
      // Legacy script hides results on Reset.
      setResultsVisible(false);
      if (includeInvalids) includeInvalids.checked = false;
      setCriteriaCollapsed(false);
    });

    const onCancelClick = () => {
      // shortcut: legacy Cancel destination unknown, treat as Reset + hide results.
      bus.emit('reset', undefined);
      setResultsVisible(false);
      setCriteriaCollapsed(false);
    };

    cancelButton?.addEventListener('click', onCancelClick);

    const onIncludeInvalidsChange = () => {
      if (!resultsPanel || resultsPanel.style.display == 'none') return;
      // Legacy script refreshes the grid when Include Invalids changes.
      bus.emit('search', valuesFromDom());
    };

    includeInvalids?.addEventListener('change', onIncludeInvalidsChange);

    return () => {
      searchButton?.removeEventListener('click', onSearchClickCapture, true);
      cancelButton?.removeEventListener('click', onCancelClick);
      includeInvalids?.removeEventListener('change', onIncludeInvalidsChange);
      if (typeof unsubSearch === 'function') unsubSearch();
      if (typeof unsubReset === 'function') unsubReset();
    };
  }, [bus]);

  return null;
}
