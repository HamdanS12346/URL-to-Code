// Services of "File Transfer Tracking". GENERATED once by final-playwright (packs/ffxfer-index-v1); edit freely, it is not overwritten.
// endpoints: what the live screen called (method, path, the form fields it sent). The functions answer with mock data
// (synthetic rows shaped like the live grid, no client data) until they are wired to the real backend.
import { mockPage, type KitData } from '../kit';
import kit from '../screens/file-transfer-tracking/kit.json';

const data = kit as unknown as KitData;

export const endpoints = {
  search: {
    method: 'GET',
    url: '/api/FileTransfer/SearchFileTransferTracking/',
    // Query params are derived from the search criteria inputs (see spec/UI_SPEC.md §10).
    params: [
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
      'ToSize'
    ]
  }
} as const;

function buildSearchUrl(values: Record<string, string>): string {
  const qs = new URLSearchParams();
  for (const key of endpoints.search.params) {
    const v = values[key];
    if (typeof v === 'string' && v.trim() !== '') qs.set(key, v);
  }
  const q = qs.toString();
  return q ? `${endpoints.search.url}?${q}` : endpoints.search.url;
}

export async function search(values: Record<string, string>) {
  // No backend in this pack: record the contract we *would* call.
  (globalThis as any).__lastFileTransferTrackingSearch = {
    method: endpoints.search.method,
    url: buildSearchUrl(values)
  };

  const [id, after] = Object.entries(data.grids ?? {})[0] ?? [];
  return id ? mockPage(data.widgets[id], after) : { total: 0, rows: [] };
}

export async function save(dialog: string, values: Record<string, string>) {
  return { ok: true, dialog, values }; // the real call: the dialog's save endpoint (not recorded: the capture never clicks Save)
}
