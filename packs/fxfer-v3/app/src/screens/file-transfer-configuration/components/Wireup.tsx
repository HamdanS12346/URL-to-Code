import { useEffect } from 'react';

function clearGeneralMessages() {
  const gm = document.querySelector<HTMLElement>('.gm-container');
  if (!gm) return;
  gm.innerHTML = '';
  gm.style.display = 'none';
}

function hideResultsPanel() {
  const panel = document.getElementById('searchFileTransferConfigResultsPanel') as HTMLElement | null;
  if (panel) panel.style.display = 'none';
}

export default function Wireup() {
  useEffect(() => {
    const cancel = document.getElementById('cancelButton') as HTMLInputElement | null;
    const reset = document.getElementById('resetButton') as HTMLInputElement | null;
    const next = document.getElementById('nextButton') as HTMLInputElement | null;

    const onCancelClickCapture = (e: Event) => {
      // Screen JS does not define cancel; keep it harmless and predictable.
      e.preventDefault();
      (e as any).stopImmediatePropagation?.();
      clearGeneralMessages();

      // Treat Cancel like a full reset back to the initial state.
      reset?.click();
      hideResultsPanel();
    };

    const onDocChangeCapture = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      if (t.id === 'FileTransferShowInactiveCheckBox') {
        clearGeneralMessages();

        // Legacy filters the existing grid; retriggering Search is close enough
        // for the mock data grid.
        const resultsVisible =
          (document.getElementById('searchFileTransferConfigResultsPanel') as HTMLElement | null)?.style.display !== 'none';
        if (resultsVisible) next?.click();
      }
    };

    cancel?.addEventListener('click', onCancelClickCapture, true);
    document.addEventListener('change', onDocChangeCapture, true);

    return () => {
      cancel?.removeEventListener('click', onCancelClickCapture, true);
      document.removeEventListener('change', onDocChangeCapture, true);
    };
  }, []);

  return null;
}
