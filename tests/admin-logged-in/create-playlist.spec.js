import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/playlist-page';

test('Admin clicks "Create playlist" icon and sees create playlist form', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
    const playlistPage = new PlaylistPage(page);

    await playlistPage.goto();
    await expect(playlistPage.createPlaylistIcon).toBeVisible();
    await playlistPage.createPlaylistIcon.click();
    await expect(createPlaylistForm).toBeVisible();
});

test('Admin is able to create a playlist', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
    const playlistPage = new PlaylistPage(page);

    await playlistPage.goto();
    await playlistPage.createTestingPlaylist();

    
});