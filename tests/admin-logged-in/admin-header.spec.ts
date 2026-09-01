import { test, expect } from '@playwright/test';
import { HeaderPage } from '../../pages/header-page';

test('Admin is able to see the Activity button', {tag: ['@loggedin', '@ui', '@header', '@admin']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.activityButton).toBeVisible();
});

test('Admin clicks Activity button and popup opens', {tag: ['@loggedin', '@ui', '@header', '@admin']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.clickActivity();

    await expect(headerPage.activityPopover).toBeVisible();
    await expect(headerPage.uptimeInfoBox).toBeVisible();
    await expect(headerPage.foldersScannedInfoBox).toBeVisible();
    await expect(headerPage.scanInfoBox).toBeVisible();
});

test('Admin is able to see the Now Playing button', {tag: ['@loggedin', '@ui', '@header', '@admin']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();

    await expect(headerPage.nowPlayingButton).toBeVisible();
});

test('User clicks Now Playing button and popup opens', {tag: ['@loggedin', '@ui', '@header', '@admin']}, async ({page}) => {
    const headerPage = new HeaderPage(page);
    await headerPage.goto();
    await headerPage.clickNowPlaying();

    await expect(headerPage.nowPlayingInfoBox).toBeVisible();
});