import {Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    // Define locators
    readonly usernameInput: any;
    readonly passwordInput: any;
    readonly signInButton: any;
    readonly unauthorizedLogErrorMsg: any;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.signInButton = page.getByText('Sign in');
        this.unauthorizedLogErrorMsg = page.getByRole('alert');    
    }

    // Define actions
    // Go to page
    async goto() {
        await this.page.goto('/');
    }

    // Login
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}