import { test, expect } from '@playwright/test';
import { AuthService } from '../../../api-helpers/AuthService';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe.serial('Login API - Negative Test Cases', () => {
    let authService: AuthService;

    test.beforeEach(async () => {
        authService = new AuthService();
    });

    test.afterEach(async () => {
        await authService.dispose();
    });

    test('User login fails with valid username & invalid password', {tag: ['@api', '@login', '@regression']}, async () => {
        const response = await authService.login(process.env.NADM_USER_TEST1!, process.env.INVALID_PASSWORD!);
        expect(response.status()).toBe(401);
    });

    test('Login fails with invalid username & valid password', {tag: ['@api', '@login', '@regression']}, async() => {
        const response = await authService.login(process.env.INVALID_USERNAME!, process.env.NADM_PSW_TEST2!);
        expect(response.status()).toBe(401);
    });

    test('Login fails with valid username & empty password', {tag: ['@api', '@login', '@regression']}, async() => {
        const response = await authService.login(process.env.NADM_USER_TEST3!, process.env.EMPTY_CREDENTIAL!);
        expect(response.status()).toBe(401);
    });    

    test('Login fails if user gives valid credentials, but while typing username Caps Lock is on', {tag: ['@api', '@login', '@regression']}, async() => {
        const response = await authService.login('ADMINtEST', process.env.NADM_PSW_TEST1!);
        expect(response.status()).toBe(401);
    });

    test('Login fails if user gives valid credentials, but while typing password Caps Lock is on', {tag: ['@api', '@login', '@regression']}, async() => {
        const response = await authService.login(process.env.NADM_USER_TEST2!, 'ADMINtEST');
        expect(response.status()).toBe(401);
    });
});