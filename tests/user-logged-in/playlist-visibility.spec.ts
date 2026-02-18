import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlaylistService } from '../../api-helpers/PlaylistService';

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
        const randomsString = await playlistPage.randomString();
        playlistName = `Test playlist ${Date.now()}_${randomsString}`;
        // playlistIdArray = [];
        isPublic = true;
        await playlistService.createPlaylist(playlistName, isPublic); 
    });

    test.afterAll(async () => {
        // delete playlist by name
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
        // create private playlist
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomsString = await playlistPage.randomString();
        playlistName = `Test playlist ${Date.now()}_${randomsString}`;
        playlistIdArray = [];
        isPublic = false;
        await playlistService.createPlaylist(playlistName, isPublic);
    });

    test.afterAll(async () => {
        // delete private playlist
    });

    test('1', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({page}) => {
        // login as admin -- able to see playlist
    });

    test('2', {tag: ['@loggedin', '@ui', '@user', '@playlistvisibility']}, async ({page}) => {
        // login as user2 -- NOT able to see playlist created
    });
});
