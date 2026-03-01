import {Page, Locator} from '@playwright/test';

export class PlaylistPage {
    readonly page: Page;
    
    // Define locators
    readonly xxx: any;
    

    constructor(page: Page) {
        this.page = page;

    }

    // Define actions
    // Go to songs page
    async gotosong() {
        await this.page.goto('/app/#/song'); 
    }

    

   



}


