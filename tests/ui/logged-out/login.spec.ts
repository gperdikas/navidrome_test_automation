import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login-page';

test.describe('Login UI Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
    });

    test('User is able to log in when using valid credentials', {tag: ['@loggedout', '@login', '@ui']}, async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
    });

    test('User sees "Error: Unauthorized" popup when log in fails', {tag: ['@loggedout', '@login', '@ui']}, async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);
        await expect(loginPage.unauthorizedLogErrorMsg).toBeVisible();
        await expect(loginPage.unauthorizedLogErrorMsg).toHaveText('Error: Unauthorized');
    });

    test('After fail to log in user is able to log in with valid credentials', {tag: ['@loggedout', '@login', '@ui']}, async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);
        await expect(loginPage.unauthorizedLogErrorMsg).toBeVisible();
        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
    });
});