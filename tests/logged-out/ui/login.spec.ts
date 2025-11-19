import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe.serial('Login UI tests', () => {
    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    
    test('User is able to log into Navidrome', {tag: ['@regression', '@smoke', '@login']}, async ({page}) => {
        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
    });

    test('User is not able to log into Navidrome using invalid password', {tag: ['@regression', '@smoke', '@login']}, async ({page}) => {
        await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User is not able to log into Navidrome with invalid username', {tag: ['@regression', '@login']}, async ({page}) => {
        await loginPage.login(process.env.INVALID_USERNAME!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User is not able to log into Navidrome without username provided', {tag: ['@regression', '@login']}, async ({page}) =>{
        await loginPage.login(process.env.EMPTY_CREDENTIAL!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User is not able to log into Navidrome without password provided', {tag: ['@regression', '@login']}, async ({page}) =>{
        await loginPage.login(process.env.TEST_USERNAME!, process.env.EMPTY_CREDENTIAL!);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User sees related error message when fails to login' , {tag: ['@regression', '@login', '@smoke', '@errorHandling']}, async ({page}) => {
        await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);

        await expect(loginPage.unauthorizedLogErrorMsg).toBeVisible();
    });

    test('User is able to login after a failing first attempt' , {tag: ['@regression', '@login', '@smoke']}, async ({page}) => {
        await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);    
        await loginPage.unauthorizedLogErrorMsg.waitFor({ state: 'hidden' });
        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
    });
});
