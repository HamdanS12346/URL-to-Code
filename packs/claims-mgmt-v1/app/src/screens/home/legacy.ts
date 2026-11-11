import { useEffect } from 'react';

type AnyWindow = Window & Record<string, unknown>;

type LegacyToggle = (id: string) => void;

type LegacyPopupCenteredWindow = (url: string, name?: string) => Window | null;

type VoidFn = () => void;

const mcbPanelIds = [
  'pnlAudit',
  'pnlMail',
  'pnlNotes',
  'pnlPrintPreview',
  'pnlReports',
  'pnlReturnToProvider',
] as const;

type McbPanelId = (typeof mcbPanelIds)[number];

function getEl<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function setClass(el: HTMLElement | null, className: string, on: boolean) {
  if (!el) return;
  el.classList.toggle(className, on);
}

function setMcbOpen(panelId: McbPanelId, open: boolean) {
  const panel = getEl(panelId);
  if (!panel) return;
  setClass(panel, 'display-none', !open);
}

function closeAllMcbPanels() {
  for (const id of mcbPanelIds) setMcbOpen(id, false);
}

function showOnlyMcbPanel(panelId: McbPanelId) {
  closeAllMcbPanels();
  setMcbOpen(panelId, true);
}

function setPanelVisibility(panelId: string, visible: boolean) {
  const panel = getEl(panelId);
  if (!panel) return;
  panel.style.visibility = visible ? 'visible' : 'hidden';
}

function toggleVisibilityStyle(panelId: string) {
  const panel = getEl(panelId);
  if (!panel) return;

  const current = getComputedStyle(panel).visibility;
  setPanelVisibility(panelId, current === 'hidden');
}

function toggleVisibility(panelId: string) {
  const panel = getEl(panelId);
  if (!panel) return;

  if (panel.classList.contains('display-none')) {
    panel.classList.remove('display-none');
    return;
  }

  const current = getComputedStyle(panel).display;
  panel.style.display = current === 'none' ? '' : 'none';
}

function showProviderMessagesInstructions() {
  const provider = getEl('providerPortalMessagesInstructions');
  const member = getEl('memberPortalMessagesInstructions');
  const managedCare = getEl('managedCarePortalMessagesInstructions');
  const drugRebate = getEl('drugRebatePortalMessagesInstructions');
  const internal = getEl('internalPortalMessagesInstructions');

  if (internal) internal.style.display = 'none';
  if (provider) provider.style.display = 'block';
  if (member) member.style.display = 'none';
  if (managedCare) managedCare.style.display = 'none';
  if (drugRebate) drugRebate.style.display = 'none';
}

export function useHomeLegacyBindings() {
  useEffect(() => {
    const win = window as unknown as AnyWindow;
    const previous: Record<string, unknown> = {};

    const define = (name: string, value: unknown) => {
      previous[name] = win[name];
      win[name] = value;
    };

    define('toggleVisibility', toggleVisibility satisfies LegacyToggle);
    define('toggleVisibilityStyle', toggleVisibilityStyle satisfies LegacyToggle);

    define('getAudit', (() => showOnlyMcbPanel('pnlAudit')) satisfies VoidFn);
    define('getMail', (() => showOnlyMcbPanel('pnlMail')) satisfies VoidFn);
    define('getNotes', (() => showOnlyMcbPanel('pnlNotes')) satisfies VoidFn);
    define('getPrintPreview', (() => showOnlyMcbPanel('pnlPrintPreview')) satisfies VoidFn);
    define('getReports', (() => showOnlyMcbPanel('pnlReports')) satisfies VoidFn);
    define('getReturnToProvider', (() => showOnlyMcbPanel('pnlReturnToProvider')) satisfies VoidFn);

    define('getFavorites', (() => toggleVisibilityStyle('divFavorites')) satisfies VoidFn);
    define('getContactUs', (() => toggleVisibilityStyle('divCoreContactUs')) satisfies VoidFn);
    define(
      'getBroadcastMsg',
      (() => {
        showProviderMessagesInstructions();
        toggleVisibilityStyle('divCoreBroadcastMsg');
      }) satisfies VoidFn,
    );

    define(
      'popupCenteredWindow',
      ((url: string) => window.open(url, '_blank', 'noopener,noreferrer')) satisfies LegacyPopupCenteredWindow,
    );

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // MCB panel close icons
      if (target.closest('#auditClose')) setMcbOpen('pnlAudit', false);
      if (target.closest('#mailClose')) setMcbOpen('pnlMail', false);
      if (target.closest('#notesClose')) setMcbOpen('pnlNotes', false);
      if (target.closest('#printPreviewClose')) setMcbOpen('pnlPrintPreview', false);
      if (target.closest('#reportsClose')) setMcbOpen('pnlReports', false);
      if (target.closest('[data-testid="button-close-6"]')) setMcbOpen('pnlReturnToProvider', false);

      // AAG panels
      if (target.closest('#ExternalLinksClose') || target.closest('#extLinksCloseButton')) {
        setPanelVisibility('divExternalLinks', false);
      }

      if (target.closest('#FavoritesClose')) {
        setPanelVisibility('divFavorites', false);
      }

      if (target.closest('#IntContactUsClose') || target.closest('#intPortalContactUsCloseButton')) {
        setPanelVisibility('divCoreContactUs', false);
      }

      if (target.closest('#CloseBroadcastMsgPanel') || target.closest('#messagesCloseButton')) {
        setPanelVisibility('divCoreBroadcastMsg', false);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);

      for (const [name, value] of Object.entries(previous)) {
        if (value === undefined) delete win[name];
        else win[name] = value;
      }
    };
  }, []);
}

