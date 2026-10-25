// Runs the generated parity tests: outputs/<screen>/spec/parity.spec.ts (legacy by default, TARGET=react for the rebuild).
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'outputs',
  testMatch: '**/spec/parity.spec.ts',
  timeout: 60_000,
  workers: 2,
  reporter: 'list',
  use: { headless: true, ignoreHTTPSErrors: true },
});
