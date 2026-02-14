import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../../pages/playlist-page';
import { PlaylistService } from '../../api-helpers/PlaylistService';

test.describe('Edit playlist tests', () => {
    let playlistService: PlaylistService;
    let playlistName: string;
    let playlistId: string | null;
    let playlistIdArray: string[];
    let isPublic: boolean;
    let playlistRow: any;

    test.beforeEach(async ({page}) => {
        playlistService = new PlaylistService();
        const playlistPage = new PlaylistPage(page);
        const randomsString = await playlistPage.randomString();
        playlistName = `Test playlist ${Date.now()}_${randomsString}`;
        playlistIdArray = [];
        isPublic = true;
    });

    test.afterEach(async () => {
    for (let i=0; i<playlistIdArray.length; i++) {
        const response = await playlistService.deletePlaylistById(playlistIdArray[i]);
    }
    await playlistService.dispose();
    });

    test('Admin is able to edit playlist Name', {tag: ['@loggedin', '@ui', '@admin', '@createplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistService.createPlaylist(playlistName, isPublic);
        const playlistId = await playlistService.getPlaylistIdByName(playlistName);
        playlistIdArray.push(playlistId!);
        await playlistPage.goto();
        await playlistPage.editPlaylistsName(playlistName);    

        await expect(playlistPage.playlistsTable).toBeVisible();
        await expect(playlistPage.getPlaylistRowByName('editedName').locator('td.column-name')).toHaveText('editedName');
    }); 

    test('Admin is able to edit playlist Comment', {tag: ['@loggedin', '@ui', '@admin', '@editplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistService.createPlaylist(playlistName, isPublic);
        const playlistId = await playlistService.getPlaylistIdByName(playlistName);
        playlistIdArray.push(playlistId!);
        await playlistPage.goto();
        await playlistPage.editPlaylistsComment(playlistName);
        await (playlistPage.getPlaylistRowByName(playlistName)).locator(playlistPage.editPlaylistButton).click();

        await expect(playlistPage.commentInputBox).toHaveText('editedComment');
    });

    test('Admin is able to edit playlist Owner', {tag: ['@loggedin', '@ui', '@admin', '@editplaylist']}, async ({page}) => {
        const playlistPage = new PlaylistPage(page);
        await playlistPage.goto();
        await playlistService.createPlaylist(playlistName, isPublic);
        const playlistId = await playlistService.getPlaylistIdByName(playlistName);
        playlistIdArray.push(playlistId!);
        await playlistService.createTestUser();
        await playlistPage.editPlaylistsOwner(playlistName);
       
        await expect(playlistPage.ownerInputBox).toHaveText('userTestOwner1');

        const userId = await playlistService.getUserIdByName('userTestOwner1');
        await playlistService.deleteTestUser(userId!); 
    });

    // test('Admin is able to edit playlist publicity status', {tag: ['@loggedin', '@ui', '@admin', '@editplaylist']}, async ({page}) => {
    
    // });

    // ADD one API test the confirms that edit, really edits and does not duplicate
    // GO TO playlist-page and change hard coded edited name to string vars and run each function with both string vars name/comment and edited name/comment
});
