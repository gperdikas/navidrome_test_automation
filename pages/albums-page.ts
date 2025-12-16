import {Page} from '@playwright/test';

export class HeaderPage {
    readonly page: Page;
    
    // Define locators
    readonly header: any;
    readonly menuButton: any;
    readonly albumMenuTitle: any;
    readonly all: any;
    readonly random: any;
    readonly favourites: any;
    readonly topRated: any;
    readonly recentlyAdded: any;
    readonly recentlyPlayed: any;
    readonly mostPlayed: any;
    // into All

    // into Random

    // into Favourites

    // into Top Rated

    // into Recently Added

    // into Recently Played

    // into Most Played
    

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('header.MuiPaper-root');
        this.albumMenuTitle = page.getByText('Albums', { exact: true });
        this.menuButton = page.locator('header button:has(svg path[d*="M3 18h18v-2H3v2z"])');        
        this.all = page.locator('a', {hasText: 'All'});
        this.random = page.locator('a', {hasText: 'Random'});
        this.favourites = page.locator('a', {hasText: 'Favourites'});
        this.topRated = page.locator('a', {hasText: 'Top Rated'});
        this.recentlyAdded = page.locator('a', {hasText: 'Recently Added'});
        this.recentlyPlayed = page.locator('a', {hasText: 'Recently Played'});
        this.mostPlayed = page.locator('a', {hasText: 'Most Played'});
        // into All

        // into Random

        // into Favourites

        // into Top Rated

        // into Recently Added

        // into Recently Played

        // into Most Played
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
    // async closeMenuTitles() {
    //     const menuVisible = await this.albumMenuTitle.isVisible();
       
    // if (menuVisible) {
    //         await this.menuButton.click();
    //         await this.page.waitForTimeout(100); 
    //     const stillVisible = await this.albumMenuTitle.isVisible();
    //         await this.albumMenuText.waitFor({state: 'hidden'});
    //     } 
    // }

    // Opens 'Albums'
    async openAlbumMenu() {
        const albumsOpen = await this.all.isVisible();
        if (!albumsOpen) {
            await this.albumMenuTitle.click();
        }
    } 

    // Close 'Albums'
    async closeAlbumMenu() {
        const albumsOpen = await this.all.isVisible();
        if (albumsOpen) {
            await this.albumMenuTitle.click();
            await this.albumMenuTitle.waitFor({state: 'hidden'});
        }
    }

    // Open 'All' page
    async openAll() {
        await this.all.click();
    }

    // Open 'Random' page
    async openRandom() {
        await this.random.click();
    }

    // Open 'Favourites' page
    async openFavourites() {
        await this.favourites.click();
    }

    // Open 'Top Rated' page
    async openTopRated() {
        await this.topRated.click();
    }

    // Open 'Recently Added' page
    async openRecentlyAdded() {
        await this.recentlyAdded.click();
    }

    // Open 'Recently Played' page
    async openRecentlyPlayed() {
        await this.recentlyPlayed.click();
    }

    // Open 'Most played' page
    async openMostPlayed() {
        await this.mostPlayed.click();
    }
}