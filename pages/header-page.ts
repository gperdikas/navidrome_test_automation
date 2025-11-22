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
    readonly nowPlayingInfoBox: any;
    readonly uptimeInfoBox: any;
    readonly foldersScannedInfoBox: any;
    readonly scanInfoBox: any;
    readonly activityPopover: any;
    readonly settingsPopover: any;
    // readonly usernameInfoBox: any;
    readonly userInfoBox: any;
    readonly personalInfoBox: any;
    readonly usersInfoBox: any;
    readonly playersInfoBox: any;
    readonly transcodingsInfoBox: any;
    readonly librariesInfoBox: any;
    readonly missingFilesInfoBox: any;
    readonly aboutInfoBox: any;
    readonly logoutInfoBox: any;
    readonly allIntoAlbums: any;
    readonly randomIntoAlbums: any;
    readonly favouritesIntoAlbums: any;
    readonly topIntoAlbums: any;
    readonly recAddedIntoAlbums: any;
    readonly recPlayedIntoAlbums: any;
    readonly mostIntoAlbums: any;


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
        this.nowPlayingInfoBox = page.locator('#now-playing-title');
        this.activityPopover = page.locator('.MuiPopover-paper .MuiCard-root');
        this.uptimeInfoBox = this.activityPopover.getByText('Server Uptime');
        this.foldersScannedInfoBox = this.activityPopover.getByText('Total Folders Scanned');
        this.scanInfoBox = this.activityPopover.locator('button[title="Quick Scan"]');
        this.settingsPopover = page.locator('.MuiPaper-root.MuiPopover-paper');
        // this.usernameInfoBox = this.settingsPopover.getByText();
        this.personalInfoBox = this.settingsPopover.getByText('Personal');
        this.usersInfoBox = this.settingsPopover.getByText('Users');
        this.playersInfoBox = this.settingsPopover.getByText('Players');
        this.transcodingsInfoBox = this.settingsPopover.getByText('Transcoding');
        this.librariesInfoBox = this.settingsPopover.getByText('Libraries');
        this.missingFilesInfoBox = this.settingsPopover.getByText('Missing Files'); 
        this.aboutInfoBox = this.settingsPopover.getByRole('menuitem', { name: 'About' });
        this.logoutInfoBox = this.settingsPopover.getByText('Logout');
        this.allIntoAlbums = page.locator('a', {hasText: 'All'});
        this.randomIntoAlbums = page.locator('a', {hasText: 'Random'});
        this.favouritesIntoAlbums = page.locator('a', {hasText: 'Favourites'});
        this.topIntoAlbums = page.locator('a', {hasText: 'Top Rated'});
        this.recAddedIntoAlbums = page.locator('a', {hasText: 'Recently Added'});
        this.recPlayedIntoAlbums = page.locator('a', {hasText: 'Recently Played'});
        this.mostIntoAlbums = page.locator('a', {hasText: 'Most Played'});
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

    // Opens 'Albums'
    async openAlbumMenu() {
        const albumsOpen = await this.allIntoAlbums.isVisible();
        if (!albumsOpen) {
            await this.albumMenuTitle.click();
        }
    } 

    // Close 'Albums'
    async closeAlbumMenu() {
        const albumsOpen = await this.allIntoAlbums.isVisible();
        if (albumsOpen) {
            await this.albumMenuTitle.click();
            await this.albumMenuTitle.waitFor({state: 'hidden'});
        }
    }

    // Click refresh button
    async clickRefresh() {
        await this.refreshButton.click();
    }
    
    // Click Now playing button
    async clickNowPlaying() {
        await this.nowPlayingButton.click();
    }
    
    // Click Activity button
    async clickActivity() {
        await this.activityButton.click();
    }
    
    // Click Settings button
        async clickSettings() {
        await this.settingsButton.click();
    }
}