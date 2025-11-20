import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../../pages/header-page';

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

// test('When menu button is set on OFF position, menu is not visible', {tag: ['@regression', '@smoke', '@header']}, async ({page}) => {
//     const headerPage = new HeaderPage(page);
//     await headerPage.goto();
//     await headerPage.closeMenuTitles();
   
//     await expect(headerPage.albumMenuText).toBeHidden();
//     await expect(headerPage.artistsMenuTitle).not.toBeVisible();
//     await expect(headerPage.songsMenuTitle).not.toBeVisible();
//     await expect(headerPage.radiosMenuTitle).not.toBeVisible();
//     await expect(headerPage.playlistsMenuTitle).toBeHidden();
// });

