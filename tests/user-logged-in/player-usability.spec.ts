import { test, expect } from '@playwright/test';
import { PlayerPage } from '../../pages/player-page';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlayerService } from '../../api-helpers/PlayerService';
import { randomString } from '../../helpers/random-string-generator';
import { PlaylistService } from '../../api-helpers/PlaylistService';


//  beforeAll 
//      create playlist - api
//      add 2 songs - api

//  after all  
//      delete playlist - api

//  test 1  --  click play, song starts - ui


//  test 2  --  pause/resume pauses/resumes the song - ui


//  test 3  --  next goes to next song - ui


//  test 4  --  X icon close player - ui

test.describe('Music player usability', () => {
    let playerService: PlayerService;
    let playlistService: PlaylistService;
    let playlistPage: PlaylistPage;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    // let playlistRow: any;
    let context: any;
    let page: any;

    test.beforeAll(async() => {
        //  --  STEPS   --  //

        // step1  --  user1 creates public playlist

        // step2  --  get playlist id by name

        // step3  --  make array with playlist id

        // step4  --  get song id by name (x2 for 2 songs might be 1 playlist but will delete it this way)


        // context = await browser.newContext({storageState: 'auth.json'});
        // page = await context.newPage();
        // playlistService = new PlaylistService();
        // playlistPage = new PlaylistPage(page);
        // const randomStringResult = randomString();
        // playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        // playlistIdArray = [];
        // isPublic = true;
        // await playlistPage.goto();
        // await playlistPage.createTestingPlaylistPublic(playlistName);
        // playlistId = await playlistService.getPlaylistIdByName(playlistName);
        // if (playlistId){
        //     playlistIdArray.push(playlistId);
        // }

    });

    test.afterAll(async () => {
        for (let i=0; i<playlistIdArray.length; i++) {
            const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
        }
        await playlistService.dispose();
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