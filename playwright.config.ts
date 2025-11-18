import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,  //2 retries on CI & 1 retry local
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  globalSetup: './tests/setup/global-setup.ts',
  
  use: {
    baseURL: 'http://localhost:4533',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium-ui-logged-in',
      testDir: './tests/ui/logged-in',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
    {
      name: 'chromium-ui-logged-out',
      testDir: './tests/ui/logged-out',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
      },
    },
    {
      name: 'api-logged-in',
      testDir: './tests/api/logged-in',
    },
    {
      name: 'api-logged-out',
      testDir: './tests/api/logged-out',
    }
  ],
});