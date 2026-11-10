// Services of "FTP Server Credentials". GENERATED once by final-playwright (packs/ffxfer-index-v1); edit freely, it is not overwritten.
// endpoints: what the live screen called (method, path, the form fields it sent). The functions answer with mock data
// (synthetic rows shaped like the live grid, no client data) until they are wired to the real backend.
import { mockPage, type KitData } from '../kit';
import kit from '../screens/ftp-server-credentials/kit.json';

const data = kit as unknown as KitData;
export const endpoints = {
  "search": {
    "method": "GET",
    "url": "/api/FileTransfer/GetFTPServerCredentials/",
    "params": []
  },
  "open_d1": {
    "method": "GET",
    "url": "/FileTransfer/AddFTPServerCredentials/",
    "params": []
  }
} as const;

export async function search(values: Record<string, string>) {
  (globalThis as any).__lastFtpServerCredentialsSearch = {
    method: endpoints.search.method,
    url: endpoints.search.url,
    values
  };

  // No backend in this pack: record the contract we *would* call.
  const [id, after] = Object.entries(data.grids ?? {})[0] ?? [];
  return id ? mockPage(data.widgets[id], after) : { total: 0, rows: [] };
}

export async function save(dialog: string, values: Record<string, string>) {
  return { ok: true, dialog, values }; // the real call: the dialog's save endpoint (not recorded: the capture never clicks Save)
}


