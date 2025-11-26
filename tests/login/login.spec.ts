import { test, expect } from '@playwright/test';
import { AuthService } from '../../api-helpers/AuthService';
import { LoginPage } from '../../pages/login-page';
import * as dotenv from 'dotenv';

test.describe.serial('Login Tests', () => {
    test.describe('Login API Tests', () => {
        let authService: AuthService;
        
        test.beforeEach(async () => {
            authService = new AuthService();
        });
        
        test.afterEach(async () => {
            await authService.dispose();
        });
        
        test('User is able to log in', {tag: ['@regression', '@smoke', '@login']}, async ({page}) => {
           const response = await authService.login(process.env.NADM_USER_TEST1!,process.env.NADM_PSW_TEST1!);
           expect(response.status()).toBe(200);
        });

        test('User is not able to log into Navidrome without password provided', {tag: ['@regression', '@login']}, async ({page}) =>{
            const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.EMPTY_CREDENTIAL!);
            expect(response.status()).toBe(401);
        });

        test('Login fails with valid username & empty password', {tag: ['@api', '@login', '@regression']}, async() => {
            const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.EMPTY_CREDENTIAL!);
            expect(response.status()).toBe(401);
        }); 

        // test('Invalid password fails log in and sends error message', async ({ request }) => {
        //      // test code
        // });

        // test('Invalid username fails log in and sends error message', async ({ request }) => {
        //      // test code
        // });

        test('Login functionality is case-sensitive', async ({ request }) => {
            const response = await authService.login('ADMINtEST', 'ADMINtEST');
            expect(response.status()).toBe(401);
        });
    });
  
    test.describe('Login UI Tests', () => {
        let loginPage: LoginPage;

        test.beforeEach(async ({page}) => {
            loginPage = new LoginPage(page);
        });

        test('User is able to log in when using valid credentials', async ({ page }) => {
            await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
            await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
        });

        // test('User sees 'Unauthorized' popup when log in fails', async ({ page }) => {
        
        // });

        // test('After fail to log in user is able to log in with valid credentials', async ({ page }) => {
        
        // });
    });
});