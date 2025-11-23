import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../../pages/logout-page';

test('User is able to log out from Navidrome', {tag: ['@regression', '@smoke', '@logout']}, async ({page}) => {
    const logoutPage = new LogoutPage(page);
    await logoutPage.goto();
    await logoutPage.logout();

    await expect(page).toHaveURL(/\/app\/#\/login/);
});

