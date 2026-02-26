import { test, expect } from '@playwright/test';
import { PlayerPage } from '../../pages/player-page';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlayerService } from '../../api-helpers/PlayerService';
import { randomString } from '../../helpers/random-string-generator';
import { PlaylistService } from '../../api-helpers/PlaylistService';


test.describe('Music player usability', () => {
    let playlistService: PlaylistService;
    let playlistId: string | null;
    let playlistName: string;

    test.beforeAll(async () => {
        playlistService = new PlaylistService();
        const randomStringResult = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        await playlistService.createPlaylist(playlistName, true);
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        if (!playlistId) {
            throw new Error('Playlist not found after creation');
        }
        const songIds = [
            await playlistService.getSongIdByName('sonican-global-chase'),
            await playlistService.getSongIdByName('sonican-uplifting-feelgood')
        ];
        await playlistService.addSongToPlaylist(playlistId, songIds)
    });

    test.afterAll(async () => {
        await playlistService.dispose();
    });


//      test 1  --  click play, song starts - ui


//      test 2  --  pause/resume pauses/resumes the song - ui


//      test 3  --  next goes to next song - ui


//      test 4  --  X icon close player - ui
});