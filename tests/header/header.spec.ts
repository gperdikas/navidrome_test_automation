import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/header-page';

test('Admin is able to see header', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    
    await expect(headerPage.header).toBeVisible();
});

test('Admin is able to see the menu button', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.menuButton).toBeVisible();
});

test('Admin is able to see the tile of the open tab', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.title).toBeVisible();
});

test('Admin is able to see the refresh button', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.refreshButton).toBeVisible();
});

test('Admin is able to see the Now Playing button', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.nowPlayingButton).toBeVisible();
});

test('Admin is able to see the Activity button', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.activityButton).toBeVisible();
});

test('Admin is able to see the Settings button', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.settingsButton).toBeVisible();
});

test('When menu button is set on ON position, menu is visible', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openMenuTitles();

    await expect(headerPage.albumMenuTitle).toBeVisible(); 
    await expect(headerPage.artistsMenuTitle).toBeVisible(); 
    await expect(headerPage.songsMenuTitle).toBeVisible();
    await expect(headerPage.radiosMenuTitle).toBeVisible();
    await expect(headerPage.playlistsMenuTitle).toBeVisible();
});

test('When menu button is set on OFF position, menu is not visible', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

const buttonCount = await page.locator('header button.MuiIconButton-root').count();
console.log('How many buttons found?', buttonCount);



    await headerPage.closeMenuTitles();
   
    await expect(headerPage.albumMenuTitle).toBeHidden();
    await expect(headerPage.artistsMenuTitle).not.toBeVisible();
    await expect(headerPage.songsMenuTitle).not.toBeVisible();
    await expect(headerPage.radiosMenuTitle).not.toBeVisible();
    await expect(headerPage.playlistsMenuTitle).toBeHidden();
});

test('User clicks Refresh button and remain on homepage', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.albumMenuTitle).toBeVisible();
    
    const url = await page.url();
    await headerPage.clickRefresh();

    await expect(page).toHaveURL(url);
});

test('User clicks Now Playing button and popup opens', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.clickNowPlaying();

    await expect(headerPage.nowPlayingInfoBox).toBeVisible();
});

test('User clicks Activity button and popup opens', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.clickActivity();

    await expect(headerPage.activityPopover).toBeVisible();
    await expect(headerPage.uptimeInfoBox).toBeVisible();
    await expect(headerPage.foldersScannedInfoBox).toBeVisible();
    await expect(headerPage.scanInfoBox).toBeVisible();
});

test('User clicks Settings button and settings menu opens', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.clickSettings();
    
    await expect(headerPage.settingsPopover).toBeVisible();
    await expect(headerPage.usernameInfoBox).toBeVisible();
    await expect(headerPage.personalInfoBox).toBeVisible();
    await expect(headerPage.usersInfoBox).toBeVisible();
    await expect(headerPage.playersInfoBox).toBeVisible();
    await expect(headerPage.transcodingsInfoBox).toBeVisible();
    await expect(headerPage.librariesInfoBox).toBeVisible();
    await expect(headerPage.missingFilesInfoBox).toBeVisible();
    await expect(headerPage.aboutInfoBox).toBeVisible();
    await expect(headerPage.logoutInfoBox).toBeVisible();
});

test('User clicks on "Albums>All" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.allIntoAlbums).toBeVisible();

    await headerPage.allIntoAlbums.click();

    await expect(page).toHaveURL(/album\/all\?sort=name&order/);
});

test('User clicks on "Albums>Random" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.randomIntoAlbums).toBeVisible();

    await headerPage.randomIntoAlbums.click();

    await expect(page).toHaveURL(/album\/random\?sort=random&order/);
});

test('User clicks on "Albums>Favourites" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.favouritesIntoAlbums).toBeVisible();

    await headerPage.favouritesIntoAlbums.click();

    await expect(page).toHaveURL(/album\/starred\?sort=starred_at&order/);
});

test('User clicks on "Albums>Top Rated" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.topIntoAlbums).toBeVisible();

    await headerPage.topIntoAlbums.click();

    await expect(page).toHaveURL(/album\/topRated\?sort=rating&order/);
});

test('User clicks on "Albums>Recently added" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.recAddedIntoAlbums).toBeVisible();

    await headerPage.recAddedIntoAlbums.click();

    await expect(page).toHaveURL(/album\/recentlyAdded\?sort=recently_added&order/);
});

test('User clicks on "Albums>Recently played" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.recPlayedIntoAlbums).toBeVisible();

    await headerPage.recPlayedIntoAlbums.click();

    await expect(page).toHaveURL(/album\/recentlyPlayed\?sort=play_date&order/);
});

test('User clicks on "Albums>Most played" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.mostIntoAlbums).toBeVisible();

    await headerPage.mostIntoAlbums.click();

    await expect(page).toHaveURL(/album\/mostPlayed\?sort=play_count&order/);
});

test('User clicks on "Artists" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.artistsMenuTitle).toBeVisible();

    await headerPage.artistsMenuTitle.click();

    await expect(page).toHaveURL(/\#\/artist/);
});

test('User clicks on "Songs" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.songsMenuTitle).toBeVisible();

    await headerPage.songsMenuTitle.click();

    await expect(page).toHaveURL(/\#\/song/);
});

test('User clicks on "Radios" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.radiosMenuTitle).toBeVisible();

    await headerPage.radiosMenuTitle.click();

    await expect(page).toHaveURL(/\#\/radio/);
});

test('User clicks on "Playlists" path and lands on proper page', {tag: ['@regression', '@header', '@menu']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.openAlbumMenu();

    await expect(headerPage.playlistsMenuTitle).toBeVisible();

    await headerPage.playlistsMenuTitle.click();

    await expect(page).toHaveURL(/\#\/playlist/);
});
