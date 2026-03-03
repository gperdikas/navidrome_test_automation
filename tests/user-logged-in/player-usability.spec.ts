import { test, expect } from '@playwright/test';
import { PlayerPage } from '../../pages/player-page';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlayerService } from '../../api-helpers/PlayerService';
import { randomString } from '../../helpers/random-string-generator';
import { PlaylistService } from '../../api-helpers/PlaylistService';
import { report } from 'process';


test.describe('Music player usability', () => {
    let playlistService: PlaylistService;
    let playlistId: string | null;
    let playlistName: string;
    let playlistIdArray: string[];
    let playlistPage : PlaylistPage;
    let playerPage : PlayerPage;

    test.beforeAll(async () => {
        playlistService = new PlaylistService();
        const randomStringResult = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        await playlistService.createPlaylist(playlistName, true);
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
            const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
        }
        await playlistService.dispose();
    });

    test.beforeEach(async ({page}) => {
        playlistPage = new PlaylistPage(page);
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
        const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPaused).toBe(false);

        await playerPage.pauseSong();
        await expect(playerPage.playButton).toBeVisible();
        await expect(playerPage.pauseButton).not.toBeVisible();
        expect(isPaused).toBe(true);
    });

    test('User clicks "Play" on player after pausing and playlist continues playing', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPaused).toBe(false);

        await playerPage.pauseAndResumeSong();
        await expect(playerPage.playButton).not.toBeVisible();
        await expect(playerPage.pauseButton).toBeVisible();    
        expect(isPaused).toBe(false);
    });

    test('User clicks "Next" on player and next song starts playing', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPaused).toBe(false);

        await playerPage.playNextSong();
        expect(isPaused).toBe(false);
        const songBeforeClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe("sonican-global-chase - [Unknown Artist]");
        await playerPage.nextButton.click();
        const songAfterClickNext = await page.locator('audio').getAttribute('title');
        expect(songAfterClickNext).toBe("sonican-uplifting-feelgood - [Unknown Artist]");
        // this works for this case. If more song or shuffle on try:
        // expect(songBeforeClickNext).not.toBe(songAfterClickNext);
        // check currentTime < 1 sec (song start from beginning)
       
    });

    test('User clicks "Previous" on player and same song starts again', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPaused).toBe(false);

        await playerPage.playSongFromStart();
        expect(isPaused).toBe(false);
        const songBeforeClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe("sonican-global-chase - [Unknown Artist]");
        await playerPage.previousButton.click();  
        const songAfterClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe(songAfterClickNext);
        // check currentTime < 1 sec (song start from beginning)
    });

    test('User clicks "Previous" on player twice and previous song starts playing', {tag: []}, async ({page}) => {
        await page.waitForFunction(() => {
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio?.currentTime > 0;
        });
        const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
        expect(isPaused).toBe(false);

        await playerPage.playPreviousSong();
        expect(isPaused).toBe(false);
         const songBeforeClickNext = await page.locator('audio').getAttribute('title');
        expect(songBeforeClickNext).toBe("sonican-global-chase - [Unknown Artist]");
        await playerPage.previousButton.click();
        await playerPage.previousButton.click();    
        const songAfterClickNext = await page.locator('audio').getAttribute('title');
        expect(songAfterClickNext).toBe("sonican-uplifting-feelgood - [Unknown Artist]");

        // check currentTime < 1 sec (song start from beginning)
    });
});