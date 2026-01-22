import {Page, Locator} from '@playwright/test';

export class PlaylistPage {
    readonly page: Page;
    
    // Define locators
    readonly createPlaylistIcon: any;
    readonly createPlaylistForm: any;
    readonly nameInputBox: any;
    readonly commentInputBox: any;
    readonly publicSwitch: any;
    readonly saveButton: any;
    readonly playlistTableRow: any;
    readonly playlistName: any;
    readonly playlistPublicStateChecked: any;
    readonly playlistsTable: any;
    
    constructor(page: Page) {
        this.page = page;
        this.createPlaylistIcon = page.getByRole('button', { name: "Create" });
        this.createPlaylistForm = page.locator('form.simple-form');
        this.nameInputBox = page.locator('input[name="name"]'); 
        this.commentInputBox = page.locator('textarea[name="comment"]');
        this.publicSwitch = page.locator('input[name="public"]')
        this.saveButton = page.getByRole('button', {name: "Save"});
        this.playlistsTable = page.locator('table.MuiTable-root');
        this.playlistTableRow = page.locator('tbody.datagrid-body');
        this.playlistName = this.playlistTableRow.locator('td.column-name');
        this.playlistPublicStateChecked = page.locator('span.Mui-checked'); 
    }

    // Define actions
    // Go to page
    async goto() {
        await this.page.goto('/app/#/playlist');
    }

    // Create not public playlist
    async createTestingPlaylistNotPublic(playlistName: string) {
        await this.createPlaylistIcon.click();
        await this.nameInputBox.fill(playlistName);
        await this.commentInputBox.fill("This playlist is not public");
        let checkedPublic = await this.publicSwitch.isChecked();
        if(checkedPublic) { 
            await this.publicSwitch.click(); 
        } else { 
        }     
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
    }

    // Create public playlist
    async createTestingPlaylistPublic(playlistName: string) {
        await this.createPlaylistIcon.click();
        await this.nameInputBox.fill(playlistName);
        await this.commentInputBox.fill("This playlist is public");
        let checkedPublic = await this.publicSwitch.isChecked();
        if(checkedPublic) { 
        } else { 
            await this.publicSwitch.click(); 
        }
        await this.saveButton.click();
    }

    // Get a specific playlist row by playlist's name
    getPlaylistRowByName(playlistName: string): Locator {
        return this.playlistsTable.locator('tr').filter({hasText: playlistName});
    }

    // Get the public check for a specific playlist
    getPlaylistPublicCheckbox(playlistName: string) {
        return this.getPlaylistRowByName(playlistName).locator('span.Mui-checked');
    }
}