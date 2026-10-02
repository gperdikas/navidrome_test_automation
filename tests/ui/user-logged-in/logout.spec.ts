import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../../pages/logout-page';

test.describe('Logout UI Tests', () => {
    let logoutPage: LogoutPage;

    test.beforeEach(async ({page}) => {
        logoutPage = new LogoutPage(page);
    });

    test('User is able to log out from Navidrome', {
        tag: ['@loggedin', '@logout'],
        annotation: {
            type: 'Issue',
            description: 'This test might fail because of a known issue, already reported to Navidrome.'
        }
    }, async ({page}) => {
        const logoutPage = new LogoutPage(page);
        await logoutPage.goto();
        const tokenBeforeLogout = await page.evaluate(() => localStorage.getItem('token'));
        await expect(tokenBeforeLogout).not.toBeNull();

        await logoutPage.logout();
        // const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('token'));
        await expect.poll(async ()=> {
            const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('token'));
            return tokenAfterLogout;
        }).toBeNull();
        await expect(page).toHaveURL(/\/app\/#\/login/);
    });
});



