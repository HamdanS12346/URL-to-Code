import { useEffect } from 'react';

const PANEL_IDS = [
  'divExternalLinks',
  'divCoreBroadcastMsg',
  'divFavorites',
  'divCoreContactUs',
] as const;

type PanelId = (typeof PANEL_IDS)[number];

function byId<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function hide(el: HTMLElement | null) {
  if (!el) return;
  el.classList.add('display-none');
}

function show(el: HTMLElement | null) {
  if (!el) return;
  el.classList.remove('display-none');
}

function isVisible(el: HTMLElement | null) {
  if (!el) return false;
  return !el.classList.contains('display-none');
}

function toggle(el: HTMLElement | null) {
  if (!el) return;
  el.classList.toggle('display-none');
}

function hideAllPanels() {
  for (const id of PANEL_IDS) hide(byId(id));
}

function togglePanel(id: PanelId) {
  const target = byId(id);
  if (!target) return;

  const willOpen = !isVisible(target);
  hideAllPanels();
  if (willOpen) show(target);
}

function setCollapsible(expandId: string, collapseId: string, bodyId: string) {
  const expand = byId<HTMLAnchorElement>(expandId);
  const collapse = byId<HTMLAnchorElement>(collapseId);
  const body = byId<HTMLElement>(bodyId);
  if (!expand || !collapse || !body) return () => {};

  const setExpanded = (expanded: boolean) => {
    body.style.display = expanded ? '' : 'none';
    expand.style.display = expanded ? 'none' : '';
    collapse.style.display = expanded ? '' : 'none';
  };

  // Capture state: body visible, expand hidden, collapse visible
  setExpanded(true);

  const onExpand = (e: Event) => {
    e.preventDefault();
    setExpanded(true);
  };
  const onCollapse = (e: Event) => {
    e.preventDefault();
    setExpanded(false);
  };

  expand.addEventListener('click', onExpand);
  collapse.addEventListener('click', onCollapse);
  return () => {
    expand.removeEventListener('click', onExpand);
    collapse.removeEventListener('click', onCollapse);
  };
}

function wireClick(id: string, handler: (e: MouseEvent) => void) {
  const el =
    byId<HTMLElement>(id) ??
    (document.querySelector(`[data-testid="${CSS.escape(id)}"]`) as HTMLElement | null);

  if (!el) return () => {};
  el.addEventListener('click', handler as any);
  return () => el.removeEventListener('click', handler as any);
}

export function useHomeLegacyBehavior() {
  useEffect(() => {
    // Start from the home hero state: all accessory panels closed.
    hideAllPanels();

    // Global legacy functions used by javascript: hrefs in the capture.
    const prev: Record<string, any> = {};
    const setGlobal = (name: string, value: any) => {
      prev[name] = (window as any)[name];
      (window as any)[name] = value;
    };

    setGlobal('toggleVisibilityStyle', (id: string) => {
      if (id === 'divExternalLinks') togglePanel('divExternalLinks');
    });

    setGlobal('getBroadcastMsg', () => togglePanel('divCoreBroadcastMsg'));
    setGlobal('getFavorites', () => togglePanel('divFavorites'));
    setGlobal('getContactUs', () => togglePanel('divCoreContactUs'));

    // Language picker UI is unknown in the spec: keep it a no-op.
    setGlobal('getLanguage', () => {});

    // Page-level help UI is unknown in the spec: keep it a no-op.
    setGlobal('displayPageLevelHelp', () => {});

    // External links open a centered popup in legacy; do a normal new tab.
    setGlobal('popupCenteredWindow', (url: string) => {
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch {
        // ignored
      }
    });

    const teardown: Array<() => void> = [];

    // Prevent hard navigations for header items that would hit the legacy server.
    const preventOnly = (e: MouseEvent) => {
      e.preventDefault();
    };
    teardown.push(wireClick('link-my-account', preventOnly));
    teardown.push(wireClick('link-my-account-2', preventOnly));
    teardown.push(wireClick('link-logout', preventOnly));
    teardown.push(wireClick('link-logout-2', preventOnly));

    // Close buttons (the capture uses plain <a> tags with no href).
    teardown.push(
      wireClick('ExternalLinksClose', (e) => {
        e.preventDefault();
        hide(byId('divExternalLinks'));
      }),
    );
    teardown.push(
      wireClick('extLinksCloseButton', (e) => {
        e.preventDefault();
        hide(byId('divExternalLinks'));
      }),
    );

    teardown.push(
      wireClick('CloseBroadcastMsgPanel', (e) => {
        e.preventDefault();
        hide(byId('divCoreBroadcastMsg'));
      }),
    );
    teardown.push(
      wireClick('messagesCloseButton', (e) => {
        e.preventDefault();
        hide(byId('divCoreBroadcastMsg'));
      }),
    );

    teardown.push(
      wireClick('FavoritesClose', (e) => {
        e.preventDefault();
        hide(byId('divFavorites'));
      }),
    );

    teardown.push(
      wireClick('IntContactUsClose', (e) => {
        e.preventDefault();
        hide(byId('divCoreContactUs'));
      }),
    );
    teardown.push(
      wireClick('intPortalContactUsCloseButton', (e) => {
        e.preventDefault();
        hide(byId('divCoreContactUs'));
      }),
    );

    // Panel body expand/collapse.
    teardown.push(
      setCollapsible(
        'ShowCoreBroadcastMsgBody',
        'HideCoreBroadcastMsgBody',
        'divCoreBroadcastMsgFullBody',
      ),
    );
    teardown.push(setCollapsible('ShowFavoritesBody', 'HideFavoritesBody', 'divFavoritesBody'));
    teardown.push(
      setCollapsible('ShowCoreContactUsBody', 'HideCoreContactUsBody', 'divCoreContactUsFullBody'),
    );

    // Messages tab buttons: toggle active classes only (content is static/no backend).
    const cur = byId<HTMLButtonElement>('curMsgButton');
    const ack = byId<HTMLButtonElement>('acknowledgedMsgButton');
    if (cur && ack) {
      const setTab = (tab: 'cur' | 'ack') => {
        cur.classList.toggle('broadcast-msg-primary-tab', tab === 'cur');
        cur.classList.toggle('broadcast-msg-inactive-tab', tab !== 'cur');
        ack.classList.toggle('broadcast-msg-primary-tab', tab === 'ack');
        ack.classList.toggle('broadcast-msg-inactive-tab', tab !== 'ack');
      };
      setTab('cur');
      const onCur = (e: Event) => {
        e.preventDefault();
        setTab('cur');
      };
      const onAck = (e: Event) => {
        e.preventDefault();
        setTab('ack');
      };
      cur.addEventListener('click', onCur);
      ack.addEventListener('click', onAck);
      teardown.push(() => {
        cur.removeEventListener('click', onCur);
        ack.removeEventListener('click', onAck);
      });
    }

    return () => {
      teardown.forEach((f) => f());
      for (const [k, v] of Object.entries(prev)) {
        if (v === undefined) delete (window as any)[k];
        else (window as any)[k] = v;
      }
    };
  }, []);
}
