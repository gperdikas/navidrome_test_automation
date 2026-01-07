import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';

// test('Admin clicks "Create playlist" icon and sees create playlist form', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
//     const playlistPage = new PlaylistPage(page);

//     await playlistPage.goto();
//     await expect(playlistPage.createPlaylistIcon).toBeVisible();
//     await playlistPage.createPlaylistIcon.click();
//     await expect(createPlaylistForm).toBeVisible();
// });

test('Admin is able to create a not public playlist', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
    const playlistPage = new PlaylistPage(page);

    await playlistPage.goto();
    await playlistPage.createTestingPlaylistNotPublic();
await page.pause();
await page.waitForTimeout(1000);

    await expect(playlistPage.playlistsTable).toBeVisible();
    await expect(playlistPage.playlistName).toHaveText("Test playlist");
    await expect(playlistPage.playlistPublicStateChecked).not.toBeVisible();
});

// create playlist works. need to create a after each to delete the playlist created