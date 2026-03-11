import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,  //2 retries on CI & 1 retry local
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', {open: 'never'}], ['allure-playwright', {outputFolder: 'allure-results'}]],
  
  globalSetup: './tests/setup/global-setup.ts',
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4533',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'user-logged-in',
      testDir: './tests/user-logged-in',  
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
    {
      name: 'admin-logged-in',
      testDir: './tests/admin-logged-in',  
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'admin-auth.json',
      },
    },
    {
      name: 'logged-out',
      testDir: './tests/logged-out',  
      use: { 
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
      },
    }
  ],
});