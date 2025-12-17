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
        
        test('User is able to log in', {tag: ['@loggedout', '@login', '@ui']}, async ({page}) => {
           const response = await authService.login(process.env.NADM_USER_TEST1!,process.env.NADM_PSW_TEST1!);
           expect(response.status()).toBe(200);
        });

        test('User is not able to log into Navidrome with invalid password provided', {tag: ['@loggedout', '@login', '@ui']}, async ({page}) =>{
            const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.INVALID_PASSWORD!);
            expect(response.status()).toBe(401);
        });

        test('User is not able to log into Navidrome without password provided', {tag: ['@loggedout', '@login', '@ui']}, async ({page}) =>{
            const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.EMPTY_CREDENTIAL!);
            expect(response.status()).toBe(401);
        });

        test('Invalid password fails log in and sends error message', {tag: ['@loggedout', '@login', '@ui']}, async ({ request }) => {
            const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.INVALID_PASSWORD!);
            expect(response.status()).toBe(401);

            const errorResponse = await response.json();
            expect(errorResponse.error).toBe('Invalid username or password');
        });

        test('Login functionality is case-sensitive', {tag: ['@loggedout', '@login', '@ui']}, async ({ request }) => {
            const response = await authService.login('ADMINtEST', 'ADMINtEST');
            expect(response.status()).toBe(401);
        });
    });
  
    test.describe('Login UI Tests', () => {
        let loginPage: LoginPage;

        test.beforeEach(async ({page}) => {
            loginPage = new LoginPage(page);
        });

        test('User is able to log in when using valid credentials', {tag: ['@loggedout', '@login', '@api']}, async ({ page }) => {
            await loginPage.goto();
            await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
            await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
        });

        test('User sees "Error: Unauthorized" popup when log in fails', {tag: ['@loggedout', '@login', '@api']}, async ({ page }) => {
            await loginPage.goto();
            await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);
            await expect(loginPage.unauthorizedLogErrorMsg).toBeVisible();
            await expect(loginPage.unauthorizedLogErrorMsg).toHaveText('Error: Unauthorized');
        });

        test('After fail to log in user is able to log in with valid credentials', {tag: ['@loggedout', '@login', '@api']}, async ({ page }) => {
            await loginPage.goto();
            await loginPage.login(process.env.TEST_USERNAME!, process.env.INVALID_PASSWORD!);
            await expect(loginPage.unauthorizedLogErrorMsg).toBeVisible();
            await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
            await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
        });
    });
});