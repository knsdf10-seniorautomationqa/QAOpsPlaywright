// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
 const config = ({
  testDir: './tests',
  retries :  1 ,// will retry one time before claiming the test has failed
  workers : 6, // playwright default supports 5 workers i.e. 5 test files running at once, we can control this
  timeout :30*1000,
 expect : {
timeout : 5000
 },

 reporter :'html', 
  use: {
    actionTimeout : 10*1000,
    navigationTimeout : 30*1000,
    //browserName : 'chromium',
    //headless: false,
    //screenshot : 'on',
    //trace: 'on', //off,on
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
use: {
    
    browserName : 'chromium',
    headless: false,
    screenshot : 'on',
    trace: 'on', //off,on
    ignoreHttpsError : true,
    permissions: ['geolocation'],
  },

    },

    {
      name: 'firefox',
      use: {
    
    browserName : 'firefox',
    headless: false,
    screenshot : 'only-on-failure',
    video :  'retain-on-failure',
    trace: 'on', //off,on
    //viewport :{width :720,height: 720},
    ...devices['iPhone 16'],
  },
    },

    {
      name: 'webkit',
     use: {
    
    browserName : 'webkit',
    headless: true,
    screenshot : 'off',
    trace: 'on', //off,on
    ...devices['iPhone 16']
  },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ], 

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

module.exports = config