#!/usr/bin/env node
// Online smoke test: confirm we can login to the Provider portal.
// - Reuses login() from scripts/lib/portal.mjs
// - Reads password from $env:UI_PASSWORD (falls back to $env:PASSWORD)
// - Does NOT print secrets
// - Does NOT write storageState to disk

import fs from 'node:fs';
import path from 'node:path';
import { launch } from '../../scripts/lib/browser.mjs';
import { login } from '../../scripts/lib/portal.mjs';

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const cfg = readJson(path.resolve('config.json'));
const pack = readJson(path.resolve('packs/file-transfer/pack.json'));

const username = process.env.USERNAME || '';
const password = process.env.UI_PASSWORD || process.env.PASSWORD || '';

if (!username) {
  console.error('Missing USERNAME in environment.');
  process.exit(2);
}
if (!password) {
  console.error('Missing UI_PASSWORD (or PASSWORD) in environment.');
  process.exit(2);
}

const url = 'https://uximc.mms.tst.pgwcloud.net/Home/MyHome';

const viewport = { width: 1920, height: 1080 };
const dpr = 1;

const sel = {
  ...(pack.selectors || {}),
  ...(pack.menuButton ? { menuButton: pack.menuButton } : {}),
};

const browser = await launch({ ...cfg, headed: false });
try {
  await login(browser, {
    url,
    state: undefined,
    creds: { username, password },
    sel,
    viewport,
    log: (msg) => console.log(String(msg || '').replace(/[\r\n]+/g, ' ').trim()),
  });

  console.log('LOGIN_SMOKE_OK');
} catch (e) {
  console.error('LOGIN_SMOKE_FAIL');
  console.error(String(e?.message || e));
  process.exitCode = 1;
} finally {
  await browser.close().catch(() => {});
}
