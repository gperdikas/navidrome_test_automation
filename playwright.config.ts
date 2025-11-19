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
      name: 'logged-in',
      testDir: './tests/logged-in',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
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