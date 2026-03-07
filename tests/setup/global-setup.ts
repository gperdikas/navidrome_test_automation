import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

async function loginAndSaveState(
  username: string,
  password: string,
  tokenPath: string,
  authPath: string
) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(process.env.BASE_URL || 'http://localhost:4533');
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  const responsePromise = page.waitForResponse(
    response => response.url().includes('/auth/login') && response.status() === 200
  );
  await page.locator('button[type="submit"]').click();

  const response = await responsePromise;
  const responseBody = await response.json();
  const token = responseBody.token;
  fs.writeFileSync(tokenPath, JSON.stringify({ token }));
  await page.waitForURL(`${process.env.BASE_URL}/**`);  
  await page.context().storageState({ path: authPath });
  await browser.close();
}

async function globalSetup(config: FullConfig) {
  await loginAndSaveState(process.env.TEST_USERNAME! , process.env.TEST_PASSWORD! , 'admin-api-token.json' , 'admin-auth.json');
  await loginAndSaveState(process.env.NADM_USER_TEST1! , process.env.NADM_PSW_TEST1! , 'api-token.json' , 'auth.json');
  await loginAndSaveState(process.env.NADM_USER_TEST2! , process.env.NADM_PSW_TEST2! , 'api-token-user2.json' , 'auth2.json');
}

export default globalSetup;