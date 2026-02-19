import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlaylistService } from '../../api-helpers/PlaylistService';
import { randomString } from '../../helpers/random-string-generator';

test.describe('Public playlist visibility', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    let playlistRow: any;
    let context: any;
    let page: any;

    test.beforeAll(async ({browser}) => {
        context = await browser.newContext({storageState: 'auth.json'});
        page = await context.newPage();
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomStringResult = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        playlistIdArray = [];
        isPublic = true;
        await playlistPage.goto();
        await playlistPage.createTestingPlaylistPublic(playlistName);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        if (playlistId){
            playlistIdArray.push(playlistId);
        }
    });

    test.afterAll(async () => {
        for (let i=0; i<playlistIdArray.length; i++) {
            const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
        }
        await playlistService.dispose();
        await page.close();
        await context.close();
    });

    test('User public playlist is visible by Admin', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({browser}) => {
        let context = await browser.newContext({storageState: 'admin-auth.json'});
        let page = await context.newPage();
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistPage.openPlaylists(); 
        
        await expect(playlistPage.getPlaylistRowByName(playlistName)).toBeVisible();
    
        await page.close();
        await context.close();
    });

    test('User public playlist is visible by other user', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({browser}) => {
        let context = await browser.newContext({storageState: 'auth2.json'});
        let page = await context.newPage();
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistPage.openPlaylists(); 
        
        await expect(playlistPage.getPlaylistRowByName(playlistName)).toBeVisible();
    
        await page.close();
        await context.close();
    });
});

test.describe('Private playlist visibility', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    let playlistRow: any;
    let context: any;
    let page: any;

    test.beforeAll(async ({browser}) => {
        context = await browser.newContext({storageState: 'auth.json'});
        page = await context.newPage();
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomStringResult = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        playlistIdArray = [];
        isPublic = false;
        await playlistPage.goto();
        await playlistPage.createTestingPlaylistNotPublic(playlistName);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        if (playlistId){
            playlistIdArray.push(playlistId);
        }
    });

    test.afterAll(async () => {
        for (let i=0; i<playlistIdArray.length; i++) {
            const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
        }
        await playlistService.dispose();
        await page.close();
        await context.close();
    });

    test('User private playlist is visible by Admin', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({browser}) => {
        let context = await browser.newContext({storageState: 'admin-auth.json'});
        let page = await context.newPage();
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistPage.openPlaylists(); 
        
        await expect(playlistPage.getPlaylistRowByName(playlistName)).toBeVisible();
    
        await page.close();
        await context.close();   
    });

    test('User private playlist is not visible by other users', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({browser}) => {
        let context = await browser.newContext({storageState: 'auth2.json'});
        let page = await context.newPage();
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistPage.openPlaylists(); 
        
        await expect(playlistPage.getPlaylistRowByName(playlistName)).not.toBeAttached();
    
        await page.close();
        await context.close();    
    });
});
