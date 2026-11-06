// Runs the generated parity tests: <screen folder>/spec/parity.spec.ts (outputs/<screen> or packs/<pack>/screens/<screen>) (legacy by default, TARGET=react for the rebuild).
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testIgnore: ['**/node_modules/**'],
  testMatch: '**/spec/parity.spec.ts',
  timeout: 60_000,
  // the local rebuild takes more parallelism (fullyParallel: one spec file is otherwise one worker); the live site stays gentle
  fullyParallel: process.env.TARGET === 'react',
  workers: process.env.TARGET === 'react' ? 4 : 2,
  reporter: 'list',
  use: { headless: true, ignoreHTTPSErrors: true },
});
