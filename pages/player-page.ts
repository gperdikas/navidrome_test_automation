import {Page, Locator} from '@playwright/test';

export class PlaylistPage {
    readonly page: Page;
    
    // Define locators
    readonly pauseButton: any;
    readonly playButton: any;
    readonly previousButton: any;
    readonly nextButton: any;
    

    constructor(page: Page) {
        this.page = page;
        this.pauseButton = page.locator('span[title="Click to pause"]');
        this.playButton = page.locator('span[title="Click to play"]');
        this.previousButton = page.locator('span[title="Previous track"]');
        this.nextButton = page.locator('span[title="Next track"]');
    }

    // Define actions
    // Go to songs page
    async gotosong() {
        await this.page.goto('/app/#/song'); 
    }

    // Pause playing song
    async pauseSong() {
        await this.pauseButton.click();
    }

    // Pause and resume song
    async pauseAndResumeSong() {
        await this.pauseButton.click();
        await this.playButton.click();
    }

    // Go to next song
    async playNextSong() {
        await this.nextButton.click();
    }

    // Go to previous song
    async playPreviousSong() {
        await this.previousButton.click();
        await this.previousButton.click();
    }

    // Start again already playing song
    async playSongFromStart() {
        await this.previousButton.click();
    }  

   



}


