import {Page} from '@playwright/test';

export class HeaderPage {
    readonly page: Page;
    
    // Define locators
    readonly header: any;
    readonly menuButton: any;
    readonly title: any;
    readonly refreshButton: any;
    readonly nowPlayingButton: any;
    readonly activityButton: any;
    readonly settingsButton: any;
    readonly albumMenuTitle: any;
    readonly artistsMenuTitle: any;
    readonly songsMenuTitle: any;
    readonly radiosMenuTitle: any;
    readonly playlistsMenuTitle: any;
    readonly albumMenuText: any;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('header.MuiPaper-root');
        this.menuButton = page.locator('header button.MuiIconButton-root').first();
        this.title = page.locator('#react-admin-title');    
        this.refreshButton = page.locator('button[aria-label="Refresh"]');
        this.nowPlayingButton = page.locator('button[aria-label="Now Playing"]');
        this.activityButton = page.locator('button[title="Activity"]');    
        this.settingsButton = page.locator('button[aria-label="Settings"]');
        this.albumMenuTitle = page.getByRole('menuitem', {name: 'Albums'});
        this.artistsMenuTitle = page.locator('a', {hasText: 'Artists'});
        this.songsMenuTitle = page.locator('a', {hasText: 'Songs'});
        this.radiosMenuTitle = page.locator('a', {hasText: 'Radios'});
        this.playlistsMenuTitle = page.getByRole('menuitem', {name: 'Playlists'});
        this.albumMenuText = page.getByText('Albums', { exact: true });
    }

    // Define actions
    // Go to page
    async goto() {
        await this.page.goto('/');
    }

    // Open menu
    async openMenuTitles() {
        const menuVisible = await this.albumMenuTitle.isVisible();
        if (!menuVisible) {
            await this.menuButton.click();
        }
    }

    // Close menu
    async closeMenuTitles() {
        const menuVisible = await this.albumMenuTitle.isVisible();
        if (menuVisible) {
            await this.menuButton.click();
            await this.albumMenuText.waitFor({state: 'hidden'});
        }
    }
    // Click refresh button

    // Click Now playing button

    // Click Activity button

    // Click Settings button
}