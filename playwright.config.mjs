// Runs the generated parity tests: outputs/<screen>/spec/parity.spec.ts (legacy by default, TARGET=react for the rebuild).
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'outputs',
  testMatch: '**/spec/parity.spec.ts',
  timeout: 60_000,
  workers: process.env.TARGET === 'react' ? 4 : 2, // the local rebuild takes more parallelism; the live site stays gentle
  reporter: 'list',
  use: { headless: true, ignoreHTTPSErrors: true },
});
