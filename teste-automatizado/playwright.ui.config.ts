import { defineConfig, devices } from '@playwright/test';

const uiBaseURL = process.env.BASE_URL ?? 'https://www.saucedemo.com/';
const apiBaseURL =
  process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com';

/**
 * Config dedicada ao Playwright UI Mode.
 * Usa testMatch (em vez de testDir por projeto) para listar API e UI juntos.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: 'list',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  projects: [
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: apiBaseURL,
      },
    },
    {
      name: 'ui',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
        testIdAttribute: 'data-test',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});
