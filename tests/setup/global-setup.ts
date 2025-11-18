import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4533');
  
  await page.locator('input[name="username"]').fill(process.env.TEST_USERNAME!);
  await page.locator('input[name="password"]').fill(process.env.TEST_PASSWORD!);
  await page.locator('button[type="submit"]').click();
  
  await page.waitForURL('http://localhost:4533/**');
  
  await page.context().storageState({ path: 'auth.json' });
  
  await browser.close();
}

export default globalSetup;