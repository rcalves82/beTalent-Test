import { defineConfig, devices } from '@playwright/test';

const uiBaseURL = process.env.BASE_URL ?? 'https://www.saucedemo.com/';
const apiBaseURL =
  process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
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
      name: 'ui-chromium',
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
    {
      name: 'ui-firefox',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: uiBaseURL,
        testIdAttribute: 'data-test',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
    {
      name: 'ui-webkit',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: uiBaseURL,
        testIdAttribute: 'data-test',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});
