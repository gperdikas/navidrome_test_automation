import { test, expect } from '@playwright/test';
import { AuthService } from '../../api-helpers/AuthService';
import { LogoutPage } from '../../pages/logout-page';
import * as dotenv from 'dotenv';

test.describe.serial('Logout Tests', () => {
    test.describe('Logout API Tests', () => {
        let authService: AuthService;
        
        test.beforeEach(async () => {
            authService = new AuthService();
        });
        
        test.afterEach(async () => {
            await authService.dispose();
        });
        

    });
  
    test.describe('Logout UI Tests', () => {
        let logoutPage: LogoutPage;

        test.beforeEach(async ({page}) => {
            logoutPage = new LogoutPage(page);
        });

       test('User is able to log out from Navidrome', {tag: ['@regression', '@smoke', '@logout']}, async ({page}) => {
           const logoutPage = new LogoutPage(page);
           await logoutPage.goto();
           await logoutPage.logout();
       
           await expect(page).toHaveURL(/\/app\/#\/login/);
       });
    });
});