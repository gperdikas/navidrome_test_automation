import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlaylistService } from '../../api-helpers/PlaylistService';
import { randomString } from '../../helpers/random-string-generator';

test.describe('Edit playlist tests', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    let playlistRow: any;

    test.beforeEach(async ({page}) => {
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomsString = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomsString}`;
        playlistIdArray = [];
        isPublic = true;
    });

    test('Delete playlist', {tag: ['@loggedin', '@ui', '@admin', '@deleteplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistService.createPlaylist(playlistName, isPublic);
        await playlistPage.goto();
        await playlistPage.deletePlaylist(playlistName);    

        await expect(playlistPage.getPlaylistRowByName(playlistName)).not.toBeVisible();
    }); 
});