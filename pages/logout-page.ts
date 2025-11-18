import {Page} from '@playwright/test';

export class LogoutPage {
    readonly page: Page;
    
    // Define locators
    readonly settingsIcon: any;
    readonly logoutButton: any;
    
    constructor(page: Page) {
        this.page = page;
        this.settingsIcon = page.locator('button[title="Settings"]');
        this.logoutButton = page.locator('li.logout'); 
    }

    // Define actions
    // Go to page
    async goto() {
        await this.page.goto('/');
    }

    // Login
    async logout() {
        await this.settingsIcon.click();
        await this.logoutButton.click();
    }
}