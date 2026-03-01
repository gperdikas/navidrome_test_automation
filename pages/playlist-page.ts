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
    readonly editPlaylistButton: any;
    readonly ownerInputBox: any;
    readonly ownerDropDownMenu: any;
    readonly ownerDropDownOption: any;
    readonly publicSwitchOnPlaylistBoard: any;
    readonly deleteButton: any;
    readonly playlistsButton: any;
    readonly playPlaylistButton: any;
    
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
        this.editPlaylistButton = page.getByRole('button', {name: "Edit"});
        this.ownerInputBox = page.locator('#ownerId');
        this.ownerDropDownMenu = page.getByRole('listbox');
        this.ownerDropDownOption = page.getByRole('option', {name: "userTestOwner1"});
        this.publicSwitchOnPlaylistBoard = page.locator('input.MuiSwitch-input');
        this.deleteButton = page.locator('button.ra-delete-button');
        // this.playlistsButton = page.locator('a[title="Playlists"]');
        this.playlistsButton = page.getByRole('menuitem', {name: 'Playlists', exact: true});
        this.playPlaylistButton = page.getByRole('button', {name: 'Play', exact: true});
    }

    // Define actions
    // Go to playlists page
    async goto() {
        await this.page.goto('/app/#/playlist');
    }

    // Open playlists page
    async openPlaylists() {
        await this.playlistsButton.click();
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

    // Edit playlist's name
    async editPlaylistsName(playlistName: string) {
        await (this.getPlaylistRowByName(playlistName)).locator(this.editPlaylistButton).click();
        await this.nameInputBox.fill('editedName');
        await this.saveButton.click();
    }

    // Edit playlist's comment
    async editPlaylistsComment(playlistName: string) {
        await (this.getPlaylistRowByName(playlistName)).locator(this.editPlaylistButton).click();
        await this.commentInputBox.fill('editedComment');
        await this.saveButton.click();
    }    

    // Edit playlist's owner
    async editPlaylistsOwner(playlistName: string){
        await (this.getPlaylistRowByName(playlistName)).locator(this.editPlaylistButton).click();
        await this.ownerInputBox.click();
        await this.ownerDropDownOption.click();
    }

    // Edit playlist's publicity status
    async editPublicityStatus(playlistName: string){
        await (this.getPlaylistRowByName(playlistName)).locator(this.editPlaylistButton).click();
        await this.publicSwitch.click();
        await this.saveButton.click();
    }

    // Delete playlist
    async deletePlaylist(playlistName: string){
        await (this.getPlaylistRowByName(playlistName)).locator(this.editPlaylistButton).click();
        await this.deleteButton.click();
    }

    //Play whole playlist
    async playWholePlaylist(){
        await this.playPlaylistButton.click();
    }
}