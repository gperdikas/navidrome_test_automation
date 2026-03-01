import { test, expect } from '@playwright/test';
// import { PlayerPage } from '../../pages/player-page';
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

/*
//      test 1  --  click pause, song pauses - ui

-- player opens --
-- song plays --
step 1 - click pause on player
-- music pauses --
*/
test('User clicks "Pause" on player and playlist pauses', {tag: []}, async ({page}) => {
    await page.waitForFunction(() => {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        return audio?.currentTime > 0;
    });
    
    const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
    expect(isPaused).toBe(false);

    //   continue test
});
/*
//      test 2  --  click play after pause, resumes the song - ui
-- player opens --
-- song plays --
step 1 - click pause on player
step 2 - click play on player
-- music starts --
*/
test('User clicks "Play" on player after pausing and playlist continues playing', {tag: []}, async ({page}) => {
    await page.waitForFunction(() => {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        return audio?.currentTime > 0;
    });
    
    const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
    expect(isPaused).toBe(false);

    //  continue test
});

/*
//      test 3  --  next goes to next song - ui
-- player opens --
-- song plays --
step 1 - click next on player
-- next song plays --
*/
test('User clicks "Next" on player and next song starts playing', {tag: []}, async ({page}) => {
    await page.waitForFunction(() => {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        return audio?.currentTime > 0;
    });
    
    const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
    expect(isPaused).toBe(false);

    //  continue test
});

/*
//      test 4  --  X icon close player - ui
-- player opens --
-- song plays --
step 1 - click previous on player
-- previous song plays --

*/
test('User clicks "Previous" on player and same song starts again', {tag: []}, async ({page}) => {
    await page.waitForFunction(() => {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        return audio?.currentTime > 0;
    });
    
    const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
    expect(isPaused).toBe(false);

    //  continue test
});

test('User clicks "Previous" on playertwice and previous song starts playing', {tag: []}, async ({page}) => {
    await page.waitForFunction(() => {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        return audio?.currentTime > 0;
    });
    
    const isPaused = await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused);
    expect(isPaused).toBe(false);

    //  continue test
});
});