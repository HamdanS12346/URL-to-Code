import { useEffect } from 'react';

const PHONE_WIDTH_PX = 1280;

function setDisplay(el: HTMLElement | null, show: boolean) {
  if (!el) return;
  el.classList.toggle('display-none', !show);
  el.style.display = show ? '' : 'none';
}

function setVisibility(el: HTMLElement | null, show: boolean) {
  if (!el) return;
  el.style.visibility = show ? 'visible' : 'hidden';
}

function getById(id: string): HTMLElement | null {
  return document.getElementById(id) as HTMLElement | null;
}

function hideAll(ids: string[], hide: (el: HTMLElement | null, show: boolean) => void) {
  for (const id of ids) hide(getById(id), false);
}

export default function HomeBehavior() {
  useEffect(() => {
    const aagPanels = ['divExternalLinks', 'divCoreBroadcastMsg', 'divFavorites', 'divCoreContactUs'];
    const mcbPanels = ['pnlAudit', 'pnlMail', 'pnlNotes', 'pnlPrintPreview', 'pnlReports', 'pnlReturnToProvider'];

    const showMcbPanel = (id: string) => {
      for (const other of mcbPanels) setDisplay(getById(other), other === id);
    };

    const hideMcbPanels = () => {
      for (const other of mcbPanels) setDisplay(getById(other), false);
    };

    const showAagPanel = (id: string) => {
      for (const other of aagPanels) setVisibility(getById(other), other === id);
    };

    const hideAagPanels = () => {
      for (const other of aagPanels) setVisibility(getById(other), false);
    };

    const showPolicyPanel = (anchorName?: string) => {
      const panel = getById('policyPanel');
      if (!panel) return;
      panel.classList.remove('display-none');
      panel.style.display = '';

      if (!anchorName) return;
      const anchor = panel.querySelector<HTMLElement>(`a[name="${anchorName}"]`);
      anchor?.scrollIntoView({ block: 'start' });
    };

    const hidePolicyPanel = () => {
      const panel = getById('policyPanel');
      if (!panel) return;
      panel.style.display = 'none';
      panel.classList.add('display-none');
    };

    const onResize = () => {
      const portrait = window.matchMedia?.('(orientation: portrait)')?.matches ?? window.innerHeight > window.innerWidth;
      setDisplay(getById('orientationPortrait'), portrait);
      setDisplay(getById('orientationLandscape'), !portrait);
      setDisplay(document.querySelector<HTMLElement>('.mobile-nav'), window.innerWidth < PHONE_WIDTH_PX);
    };

    onResize();
    window.addEventListener('resize', onResize);

    // Legacy hooks used by href="javascript:..." links in the ported markup.
    const w = window as unknown as Record<string, any>;
    const prev: Record<string, unknown> = {};
    const expose = (name: string, fn: (...args: any[]) => any) => {
      prev[name] = w[name];
      w[name] = fn;
    };

    expose('toggleVisibility', (id: string) => {
      const el = getById(id);
      if (!el) return;
      const hidden = getComputedStyle(el).display === 'none' || el.classList.contains('display-none');
      setDisplay(el, hidden);
    });

    expose('toggleVisibilityStyle', (id: string) => {
      const el = getById(id);
      if (!el) return;
      if (el.classList.contains('aag-panel')) {
        const hidden = getComputedStyle(el).visibility === 'hidden';
        if (hidden) showAagPanel(id);
        else setVisibility(el, false);
        return;
      }
      const hidden = getComputedStyle(el).display === 'none' || el.classList.contains('display-none');
      setDisplay(el, hidden);
    });

    expose('getBroadcastMsg', () => showAagPanel('divCoreBroadcastMsg'));
    expose('getFavorites', () => showAagPanel('divFavorites'));
    expose('getContactUs', () => showAagPanel('divCoreContactUs'));

    // The language overlay isn't captured on this screen; keep the call safe.
    expose('getLanguage', () => {
      const overlay = getById('languageOverlay');
      if (overlay) setVisibility(overlay, true);
    });

    expose('getAudit', () => showMcbPanel('pnlAudit'));
    expose('getMail', () => showMcbPanel('pnlMail'));
    expose('getNotes', () => showMcbPanel('pnlNotes'));
    expose('getPrintPreview', () => showMcbPanel('pnlPrintPreview'));
    expose('getReports', () => showMcbPanel('pnlReports'));
    expose('getReturnToProvider', () => showMcbPanel('pnlReturnToProvider'));

    expose('popupCenteredWindow', (url: string) => {
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch {
        // noop
      }
    });

    expose('displayPageLevelHelp', () => {
      const help = document.querySelector<HTMLElement>('#mcbHelpIcon');
      if (help) help.focus();
    });

    // Close buttons (anchors) inside the accessory panels.
    const closeById: Array<[string, () => void]> = [
      ['ExternalLinksClose', () => setVisibility(getById('divExternalLinks'), false)],
      ['extLinksCloseButton', () => setVisibility(getById('divExternalLinks'), false)],
      ['messagesCloseButton', () => setVisibility(getById('divCoreBroadcastMsg'), false)],
      ['FavoritesClose', () => setVisibility(getById('divFavorites'), false)],
      ['IntContactUsClose', () => setVisibility(getById('divCoreContactUs'), false)],
      ['intPortalContactUsCloseButton', () => setVisibility(getById('divCoreContactUs'), false)],
      ['auditClose', () => setDisplay(getById('pnlAudit'), false)],
      ['mailClose', () => setDisplay(getById('pnlMail'), false)],
      ['notesClose', () => setDisplay(getById('pnlNotes'), false)],
      ['printPreviewClose', () => setDisplay(getById('pnlPrintPreview'), false)],
      ['reportsClose', () => setDisplay(getById('pnlReports'), false)],
      ['button-close-6', () => setDisplay(getById('pnlReturnToProvider'), false)],
      ['button-close-8', hidePolicyPanel]
    ];

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Footer policy links (no href in the port).
      const testId = target.closest<HTMLElement>('[data-testid]')?.getAttribute('data-testid');
      if (testId === 'button-disclaimer') {
        showPolicyPanel('sectionDisclaimer');
        return;
      }
      if (testId === 'button-website-requirements') {
        showPolicyPanel('sectionWebsiteRequirements');
        return;
      }
      if (testId === 'button-privacy-policy') {
        showPolicyPanel('sectionPrivacyPolicy');
        return;
      }
      if (testId === 'button-cookie-policy') {
        showPolicyPanel();
        return;
      }

      for (const [id, close] of closeById) {
        if (target.closest(`#${CSS.escape(id)}`)) {
          close();
          return;
        }
      }
    };

    document.addEventListener('click', onDocClick);

    // Start with accessory panels hidden (CSS uses visibility).
    hideAagPanels();
    hideMcbPanels();
    hidePolicyPanel();

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onDocClick);

      for (const k of Object.keys(prev)) {
        if (prev[k] === undefined) delete w[k];
        else w[k] = prev[k];
      }
    };
  }, []);

  return null;
}