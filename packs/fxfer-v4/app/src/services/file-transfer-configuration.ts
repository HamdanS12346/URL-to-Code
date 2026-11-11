// Services of "File Transfer Configuration". GENERATED once by final-playwright (packs/fxfer-v4); edit freely, it is not overwritten.
// endpoints: what the live screen called (method, path, the form fields it sent). The functions answer with mock data
// (synthetic rows shaped like the live grid, no client data) until they are wired to the real backend.
import { mockPage, type KitData } from '../kit';
import kit from '../screens/file-transfer-configuration/kit.json';

const data = kit as unknown as KitData;
export const endpoints = {
  "search": {
    "method": "GET",
    "url": "/api/FileTransfer/SearchFileTransfer/",
    "params": []
  },
  "open_d1": {
    "method": "POST",
    "url": "/FileTransfer/FileTransferConfigurationEdit/",
    "params": []
  },
  "open_d2": {
    "method": "GET",
    "url": "/FileTransfer/FileTransferConfigurationView/",
    "params": []
  }
} as const;

export async function search(values: Record<string, string>) {
  const [id, after] = Object.entries(data.grids ?? {})[0] ?? [];
  const page = id ? mockPage(data.widgets[id], after) : { total: 0, rows: [] };

  const rows = Array.isArray((page as any).rows) ? (page as any).rows : [];

  const norm = (v: unknown) => String(v ?? '').trim();
  const empty = (v: string) => !v || v.toLowerCase().includes('select a value');

  const wantConfigId = norm(values.ConfigId);
  const wantConfigName = norm(values.ConfigName);
  const wantOwnerName = norm(values.OwnerName);
  const wantProtocol = norm(values.ProtocolList);
  const wantOwnerModule = norm(values.SearchModuleList);

  // Legacy script: when the checkbox is checked it shows inactive-only.
  const showInactiveRaw = norm((values as any).FileTransferShowInactiveCheckBox).toLowerCase();
  const showInactive = showInactiveRaw == 'true' || showInactiveRaw == 'on' || showInactiveRaw == '1';

  const get = (row: any, path: string) =>
    path.split('.').reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), row);

  const matchEq = (actual: unknown, wanted: string) =>
    empty(wanted) ? true : norm(actual).toLowerCase() === wanted.toLowerCase();

  const filtered = rows.filter((row: any) => {
    if (!matchEq(get(row, 'ConfigId'), wantConfigId)) return false;
    if (!matchEq(get(row, 'ConfigName'), wantConfigName)) return false;
    if (!matchEq(get(row, 'OwnerName'), wantOwnerName)) return false;
    if (!matchEq(get(row, 'ProtocolType.Name'), wantProtocol)) return false;
    if (!matchEq(get(row, 'OwnerSubsystem.Name'), wantOwnerModule)) return false;

    const status = norm(get(row, 'Status')).toLowerCase();
    return showInactive ? status === 'inactive' : status !== 'inactive';
  });

  return { total: filtered.length, rows: filtered };
}

export async function save(dialog: string, values: Record<string, string>) {
  return { ok: true, dialog, values }; // the real call: the dialog's save endpoint (not recorded: the capture never clicks Save)
}
