// Runs the generated parity tests: outputs/<screen>/spec/parity.spec.ts (legacy by default, TARGET=react for the rebuild).
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'outputs',
  testMatch: '**/spec/parity.spec.ts',
  timeout: 60_000,
  // the local rebuild takes more parallelism (fullyParallel: one spec file is otherwise one worker); the live site stays gentle
  fullyParallel: process.env.TARGET === 'react',
  workers: process.env.TARGET === 'react' ? 4 : 2,
  reporter: 'list',
  use: { headless: true, ignoreHTTPSErrors: true },
});
