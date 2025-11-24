import { test, expect } from '@playwright/test';
import { AuthService } from '../../api-helpers/AuthService';
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
        
        // test('User is able to log in', {tag: ['@regression', '@smoke', '@login']}, async ({page}) => {
           
        // });

        // test('User is not able to log into Navidrome without password provided', {tag: ['@regression', '@login']}, async ({page}) =>{
            
        // });

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
  
    // test.describe('Login UI Tests', () => {
        // test('User is able to log in', async ({ page }) => {
        
        // });

        // test('User sees the proper error message when log in fails', async ({ page }) => {
        
        // });

        // test('After fail to log in user is able to log in with valid credentials', async ({ page }) => {
        
        // });
    // });
});