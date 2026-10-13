import { test, expect } from '@playwright/test';
import { PlayerPage } from '../../../pages/player-page';
import { PlaylistPage } from '../../../pages/playlist-page';
import { randomString } from '../../../helpers/random-string-generator';
import { PlaylistService } from '../../../api-helpers/PlaylistService';
import {readToken} from '../../../helpers/token-reader';


test.describe('Music player usability', () => {
    let playlistService: PlaylistService;
    let playlistId: string | null;
    let playlistName: string;
    let playlistComment: string;
    let playlistIdArray: string[];
    let playerPage : PlayerPage;
    let isPublic: boolean;
    let tokenUser1: string;
  

    test.beforeAll(async () => {
        tokenUser1 = readToken('api-token.json');
        playlistService = new PlaylistService();
        const randomStringResult = randomString();
        isPublic = true;
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        playlistComment = 'playlist_comment';
        await playlistService.createPlaylist(playlistName, isPublic, playlistComment, tokenUser1);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        playlistIdArray = [];
        if (playlistId) {
          playlistIdArray.push(playlistId);
        } else {   
            throw new Error('Playlist not found after creation');
        }
        const songIds = [
            await playlistService.getSongIdByName('sonican-global-chase'),
            await playlistService.getSongIdByName('sonican-uplifting-feelgood')
        ];
        await playlistService.addSongToPlaylist(playlistId, songIds)
    });

    test.afterAll(async () => {
        for (let i=0; i<playlistIdArray.length; i++) {
            const response = await playlistService.deletePlaylistById(playlistIdArray[i], tokenUser1, );
            console.log(`DELETE ${playlistIdArray[i]} -> ${response?.status()}`);
        }
        await playlistService.dispose();
    });

    test.beforeEach(async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        playerPage = new PlayerPage(page);
        await playlistPage.goto();
        const playlistRow = playlistPage.getPlaylistRowByName(playlistName);
        await playlistRow.click();
        await playlistPage.playWholePlaylist();
    });


    test('User clicks "Pause" on player and playlist pauses', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        let isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);

        await playerPage.pauseSong();
        await page.waitForTimeout(300);
        await expect(playerPage.playButton).toBeVisible();
        await expect(playerPage.pauseButton).not.toBeVisible();
        isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(true);
    });

    test('User clicks "Play" on player after pausing and playlist continues playing', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        let isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);

        await playerPage.pauseAndResumeSong();
        await expect(playerPage.playButton).not.toBeVisible();
        await expect(playerPage.pauseButton).toBeVisible();    
        isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);
    });

    test('User clicks "Next" on player and next song starts playing', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        let isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);

        isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);
        const songBeforeClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe("sonican-global-chase - [Unknown Artist]");
        await playerPage.playNextSong();
        const songAfterClickNext = await page.locator('audio').getAttribute('title');
        expect(songAfterClickNext).toBe("sonican-uplifting-feelgood - [Unknown Artist]");
        // this works for this case. If playlist has more songs or shuffle is on try:
        // expect(songBeforeClickNext).not.toBe(songAfterClickNext);
        await page.waitForTimeout(300);
        const currentTimespotOnSong = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.currentTime);
        expect(currentTimespotOnSong).toBeLessThan(1);
    });

    test('User clicks "Previous" on player and same song starts again', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 1;
        });
        let isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);

        isPausedCurrentValue = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPausedCurrentValue).toBe(false);
        const songBeforeClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe("sonican-global-chase - [Unknown Artist]");
        await playerPage.playSongFromStart();
        const songAfterClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe(songAfterClickNext);
        await page.waitForTimeout(300);
        const currentTimespotOnSong = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.currentTime);
        expect(currentTimespotOnSong).toBeLessThan(1);
    });

    test('User clicks "Previous" on player twice and previous song starts playing', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 1;
        });
        const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPaused).toBe(false);

        expect(isPaused).toBe(false);
         const songBeforeClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe("sonican-global-chase - [Unknown Artist]");
        await playerPage.playPreviousSong();    
        const songAfterClickNext = await page.locator('audio').getAttribute('title');
        expect(songAfterClickNext).toBe("sonican-uplifting-feelgood - [Unknown Artist]");
        await page.waitForTimeout(300);
        const currentTimespotOnSong = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.currentTime);
        expect(currentTimespotOnSong).toBeLessThan(1);
    });
});