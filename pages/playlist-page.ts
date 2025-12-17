import {Page} from '@playwright/test';

export class PlaylistPage {
    readonly page: Page;
    
    // Define locators
    readonly createPlaylistIcon: any;
    readonly createPlaylistForm: any;
    readonly nameInputBox :any;
    readonly commentInputBox :any;
    readonly publicSwitch :any;
    readonly saveButton :any;
    // readonly  :any;
    
    constructor(page: Page) {
        this.page = page;
        this.createPlaylistIcon = page.getByRole('button', { name: "Create" });
        this.createPlaylistForm = page.locator('form.simple-form');
        this.nameInputBox = page.locator('input[name="name"]'); 
        this.commentInputBox = page.locator('textarea[name="comment"]');
        this.publicSwitch = page.locator('input[name="public"]')
        this.saveButton = page.getByRole('button', {name: "Save"});
        // this. = 
        // this. = 
    }

    // Define actions
    // Go to page
    async goto() {
        await this.page.goto('/app/#/playlist');
    }

    // Create playlist
    async createTestingPlaylist() {
        await this.nameInputBox.fill("Test playlist");
        await this.commentInputBox.fill("This playlist is for testing purposes");
        await this.saveButton.click();
    }
}