import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlaylistService } from '../../api-helpers/PlaylistService';

test.describe('Create playlist tests', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;

    test.beforeEach(async () => {
        playlistService = new PlaylistService();
        playlistName = `Test playlist ${Date.now()}`
    });

    test('Admin is able to create a not public playlist', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);

        await playlistPage.goto();
        await playlistPage.createTestingPlaylistNotPublic(playlistName);
        await page.waitForTimeout(1000);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);

        await expect(playlistPage.playlistsTable).toBeVisible();
        await expect(playlistPage.playlistName).toHaveText("Test playlist");
        await expect(playlistPage.playlistPublicStateChecked).not.toBeVisible();
    });

    test.afterEach(async () => {
        if (playlistId){
            await playlistService.deletePlaylistById(playlistId);
        }
        await playlistService.dispose();
    });
});
