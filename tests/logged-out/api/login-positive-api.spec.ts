import { test, expect } from '@playwright/test';
import { AuthService } from '../../../api-helpers/AuthService';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login API Tests', () => {
    let authService: AuthService;

    test.beforeEach(async () => {
        authService = new AuthService();
    });

    test.afterEach(async () => {
        await authService.dispose();
    });

    test('Admin login happens successfully with valid credentials', {tag: ['@api', '@login', '@regression']}, async () => {
        const response = await authService.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
    });

    test('User login happens successfully with valid credentials', {tag: ['@api', '@login', '@regression']}, async () => {
        const response = await authService.login(process.env.NADM_USER_TEST1!, process.env.NADM_PSW_TEST1!);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
    });
});

