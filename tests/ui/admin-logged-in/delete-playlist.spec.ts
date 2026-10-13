import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../../pages/playlist-page';
import { PlaylistService } from '../../../api-helpers/PlaylistService';
import { randomString } from '../../../helpers/random-string-generator';
import { readToken } from '../../../helpers/token-reader';

test.describe('Delete playlist tests', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    // let playlistRow: any;
    let tokenAdmin: string;
    let playlistComment: string;

    test.beforeAll(async ({browser}) => {
        tokenAdmin = readToken('admin-api-token.json');
    });

    test.beforeEach(async ({page}) => {
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomStringResult = randomString();
        playlistName = `Test playlist ${Date.now()}_${randomStringResult}`;
        playlistComment = 'playlist_comment';
        playlistIdArray = [];
        isPublic = true;
    });

    test('Delete playlist', {tag: ['@loggedin', '@ui', '@admin', '@deleteplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistService.createPlaylist(playlistName, isPublic, playlistComment, tokenAdmin);
        await playlistPage.goto();    
        playlistId = await playlistService.getPlaylistIdByName(playlistName);
        if (playlistId){
            playlistIdArray.push(playlistId);
        }
        await playlistPage.deletePlaylist(playlistName);

        await expect(playlistPage.getPlaylistRowByName(playlistName)).not.toBeVisible();
    }); 
});