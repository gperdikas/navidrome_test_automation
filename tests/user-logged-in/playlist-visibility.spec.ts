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


    test.beforeAll(async ({browser}) => {
        // create public playlist
        const page = await browser.newPage();
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomStringResult = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        playlistIdArray = [];
        isPublic = true;
        await playlistService.createPlaylist(playlistName, isPublic); 
    });

    test.afterAll(async () => {
        for (let i=0; i<playlistIdArray.length; i++) {
            const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
        }
        await playlistService.dispose();
    });

    test('1', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({page}) => {
        // login as admin -- able to see the playlist created
    });

    test('2', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({page}) => {
        // login as user2 -- able to see the playlist created
    });
});

test.describe('Private playlist visibility', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    let playlistRow: any;

    test.beforeAll(async ({page}) => {
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomsString = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomsString}`;
        playlistIdArray = [];
        isPublic = false;
        await playlistService.createPlaylist(playlistName, isPublic);
    });

    test.afterAll(async () => {
        for (let i=0; i<playlistIdArray.length; i++) {
            const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
        }
        await playlistService.dispose();
    });

    test('1', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({page}) => {
        // login as admin -- able to see playlist
    });

    test('2', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({page}) => {
        // login as user2 -- NOT able to see playlist created
    });
});
