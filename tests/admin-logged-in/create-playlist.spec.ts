import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlaylistService } from '../../api-helpers/PlaylistService';

test.describe('Create playlist tests', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];

    test.beforeEach(async () => {
        playlistService = new PlaylistService();
        playlistName = `Test playlist ${Date.now()}`;
        playlistIdArray = [];
    });

    test.afterEach(async () => {
    for (let i=0; i<playlistIdArray.length; i++) {
        const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
    }
    await playlistService.dispose();
    });

    test('Admin is able to create a not public playlist', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistPage.createTestingPlaylistNotPublic(playlistName);
        await page.waitForTimeout(1000);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        if (playlistId){
            playlistIdArray.push(playlistId);
        }
        
        await expect(playlistPage.playlistsTable).toBeVisible();
        await expect(playlistPage.getPlaylistRowByName(playlistName).locator('td.column-name')).toHaveText(playlistName);
        await expect(playlistPage.getPlaylistPublicCheckbox(playlistName)).not.toBeVisible();
    });

    test('Admin is able to create a public playlist', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistPage.createTestingPlaylistPublic(playlistName);
        await page.waitForTimeout(1000);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        if (playlistId) {
        playlistIdArray.push(playlistId);
        }

        await expect(playlistPage.playlistsTable).toBeVisible();
        await expect(playlistPage.playlistName.filter({ hasText: playlistName})).toHaveText(playlistName);
        await expect(playlistPage.getPlaylistPublicCheckbox(playlistName)).toBeVisible();
    });
});
