// Services of "FTP Server Credentials". GENERATED once by final-playwright (packs/fxfer-v3); edit freely, it is not overwritten.
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
  },
  "open_d2": {
    "method": "POST",
    "url": "/FileTransfer/AddFTPServerCredentials/",
    "params": [
      "FtpServerId",
      "FtpServerName",
      "FtpServerIp",
      "FtpTransferMode",
      "FtpUser",
      "FtpPassword",
      "FtpPasswordConfirmation",
      "FtpDescription",
      "FtpPort",
      "FtpProxyAddress",
      "FtpProxyPort",
      "LastModifiedDate",
      "CreationDate",
      "IsValid",
      "RemovePassword",
      "OperatorId",
      "Editor[Alt1ActionText]",
      "Editor[Alt1ActionUrl]",
      "Editor[Alt2ActionText]",
      "Editor[Alt2ActionUrl]",
      "Editor[Alt3ActionText]",
      "Editor[Alt3ActionUrl]",
      "Editor[Alt4ActionText]",
      "Editor[Alt4ActionUrl]",
      "Editor[Alt5ActionText]",
      "Editor[Alt5ActionUrl]",
      "Editor[Alt6ActionText]",
      "Editor[Alt6ActionUrl]",
      "Editor[Alt7ActionText]",
      "Editor[Alt7ActionUrl]",
      "Editor[Alt8ActionText]",
      "Editor[Alt8ActionUrl]",
      "Editor[EntityName]",
      "Editor[Step]",
      "Editor[StepCount]",
      "Editor[Mode]",
      "Editor[Direction]",
      "Editor[IsAlt1Enabled]",
      "Editor[IsAlt2Enabled]",
      "Editor[IsAlt3Enabled]",
      "Editor[IsAlt4Enabled]",
      "Editor[IsAlt5Enabled]",
      "Editor[IsAlt6Enabled]",
      "Editor[IsAlt7Enabled]",
      "Editor[IsAlt8Enabled]",
      "Editor[IsDirtyDataEnabled]",
      "Editor[IsCancelEnabled]",
      "Editor[IsResetEnabled]",
      "Editor[IsPrintEnabled]",
      "Editor[IsProcessDirty]",
      "Editor[ConfirmDeleteMessage]",
      "Editor[DirtyDataMessage]",
      "Editor[DeletedMessage]",
      "Editor[CancelActionText]",
      "Editor[CancelActionUrl]",
      "Editor[DeleteActionText]",
      "Editor[NextActionText]",
      "Editor[PrevActionText]",
      "Editor[PrintActionText]",
      "Editor[PrintActionUrl]",
      "Editor[SaveActionText]",
      "Editor[ResetActionText]",
      "Editor[SavedMessage]",
      "Editor[ShowSummaryError]",
      "Editor[TitleFormatText]",
      "Editor[Title]",
      "Metadata[IsActive]",
      "Metadata[ModifiedDate]",
      "Metadata[ModifiedId]",
      "Metadata[ModifiedTimestamp]"
    ]
  }
} as const;


export async function search(values: Record<string, string>) {
  void values; // the real call: endpoints.search with these form values
  const [id, after] = Object.entries(data.grids ?? {})[0] ?? [];
  return id ? mockPage(data.widgets[id], after) : { total: 0, rows: [] };
}

export async function save(dialog: string, values: Record<string, string>) {
  return { ok: true, dialog, values }; // the real call: the dialog's save endpoint (not recorded: the capture never clicks Save)
}
