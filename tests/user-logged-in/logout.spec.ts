import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../pages/logout-page';
import * as dotenv from 'dotenv';

test.describe('Logout UI Tests', () => {
    let logoutPage: LogoutPage;

    test.beforeEach(async ({page}) => {
        logoutPage = new LogoutPage(page);
    });

    test('User is able to log out from Navidrome', {tag: ['@loggedin', '@logout']}, async ({page}) => {
        const logoutPage = new LogoutPage(page);
        await logoutPage.goto();
        const tokenBeforeLogout = await page.evaluate(() => localStorage.getItem('token'));
        await expect(tokenBeforeLogout).not.toBeNull();

        await logoutPage.logout();
        const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('token'));
        await expect(tokenAfterLogout).toBeNull();
        await expect(page).toHaveURL(/\/app\/#\/login/);
    });
});
