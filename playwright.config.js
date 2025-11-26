// @ts-check
const { devices } = require('@playwright/test');
const path = require('path');

const ROOT = 'C:\\Users\\raxit\\WebstormProjects\\playwright_pra';

const config = {
  testDir: './tests',
  // Run tests serially: only one worker => projects will run one after another (no parallel projects)
  workers: 1,
  retries: 1,
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  // Playwright's artifact root (keeps traces / temporary video paths accessible)
  outputDir: path.join(ROOT, 'playwright-artifacts'),

  // Default use options applied to all projects
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
  },

  // Use Allure reporter
  reporter: [
    ['allure-playwright', { outputFolder: path.join(ROOT, 'allure-results') }]
  ],

  projects: [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        // device defaults not needed for desktop firefox
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome', // uses installed Google Chrome
        headless: false,
      }
    },
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge', // uses installed Microsoft Edge
        headless: false,
      }
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: false,
        // Optionally include a mobile device like iPhone if desired:
        // ...devices['iPhone 11'],
      }
    }
  ]
};

module.exports = config;
