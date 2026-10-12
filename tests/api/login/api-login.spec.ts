import { test, expect } from '@playwright/test';
import { AuthService } from '../../../api-helpers/AuthService';

test.describe('Login API Tests', () => {
    let authService: AuthService;
        
    test.beforeEach(async () => {
        authService = new AuthService();
    });
        
    test.afterEach(async () => {
        await authService.dispose();
    });
        
    test('User is able to log in', {tag: ['@loggedout', '@login', '@api']}, async () => {
        const response = await authService.login(process.env.NADM_USER_TEST1!,process.env.NADM_PSW_TEST1!);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(typeof responseBody.token).toBe('string');
        expect(responseBody.token).not.toBe('');
    });

    test('User is not able to log into Navidrome with invalid password provided', {tag: ['@loggedout', '@login', '@api']}, async () =>{
        const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.INVALID_PASSWORD!);
        expect(response.status()).toBe(401);

        const responseBody = await response.json();
        expect(responseBody.token).toBeUndefined();
        expect(responseBody.error).toBe('Invalid username or password');
    });

    test('User is not able to log into Navidrome without password provided', {tag: ['@loggedout', '@login', '@api']}, async () =>{
        const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.EMPTY_CREDENTIAL!);
        expect(response.status()).toBe(401);

        const responseBody = await response.json();
        expect(responseBody.token).toBeUndefined();
    });

    test('Login functionality is case-sensitive', {tag: ['@loggedout', '@login', '@api']}, async () => {
        const response = await authService.login('ADMINtEST', 'ADMINtEST');
        expect(response.status()).toBe(401);

        const responseBody = await response.json();
        expect(responseBody.token).toBeUndefined();
    });
});