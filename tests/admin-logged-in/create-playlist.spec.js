import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';

// test('Admin clicks "Create playlist" icon and sees create playlist form', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
//     const playlistPage = new PlaylistPage(page);

//     await playlistPage.goto();
//     await expect(playlistPage.createPlaylistIcon).toBeVisible();
//     await playlistPage.createPlaylistIcon.click();
//     await expect(createPlaylistForm).toBeVisible();
// });

test('Admin is able to create a playlist', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
    const playlistPage = new PlaylistPage(page);

    await playlistPage.goto();
    await playlistPage.createTestingPlaylistNotPublic();
await page.pause();
await page.waitForTimeout(1000);

    await expect(this.playlistTableRow).toBeVisible();
    await expect(this.playlistName).toHaveText("Test playlist");
    await expect(this.playlistPublicStateChecked).not.toBeVisible();
});

// create playlist test fails. probably it is the locators on expect part bc the photo it takes when brakes shows the playlist created