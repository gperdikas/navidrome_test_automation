import {test, expect} from '@playwright/test';
import {readToken} from '../../../helpers/token-reader';
import { PlaylistService } from '../../../api-helpers/PlaylistService';

test.describe('Playlist authorization tests', () => {
    let idArray: string[] = [];
    let playlistId: string;
    let tokenUser1: string;
    let tokenUser2: string;
    let tokenAdmin: string;
    let playlistService: PlaylistService;

    test.beforeAll(async () => {
        tokenUser1 = readToken('api-token.json')
        tokenUser2 = readToken('api-token-user2.json')
        tokenAdmin = readToken('admin-api-token.json')
    });

    test.beforeEach(async () => {
        playlistService = new PlaylistService();
    });

    test.afterEach(async ({request}) => {
        while (idArray.length > 0){
            const id = idArray[0];
            const response = await playlistService.deletePlaylistById(playlistId, tokenAdmin);
            if(response.status() !== 200){
                console.warn(`Cleanup: Could not delete playlist with id: ${id}.`);
            }
            idArray = idArray.filter(item => item !== id);
        }
    });

    test('Private playlist authorization test', async ({request}) => {
        const playlistName = 'API private playlist';
        const playlistComment = 'created by API test';
        const editedPlaylistName = 'EDITED playlist name';
        const editedPlaylistComment = 'EDITED playlist comment';
        const isPublic = false;

        await test.step('User1 creates private playlist', async() => {
            const response = await playlistService.createPlaylist(playlistName, isPublic, playlistComment, tokenUser1)
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            playlistId = responseBody.id;
            idArray.push(playlistId);
        });

        await test.step('User1 is able to see the created private playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenUser1)
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            expect(responseBody.id).toEqual(playlistId);
            expect(responseBody.public).toBe(false);
            expect(responseBody.name).toEqual(playlistName);
            expect(responseBody.comment).toEqual(playlistComment);
        });
    
        await test.step('User2 is not able to see the created private playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenUser2)
            expect(response.status()).toBe(404);
        });

        await test.step('Admin is able to see the created private playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenAdmin)
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            expect(responseBody.id).toEqual(playlistId);
            expect(responseBody.public).toBe(false);
            expect(responseBody.name).toEqual(playlistName);
            expect(responseBody.comment).toEqual(playlistComment);
        });

        await test.step('Admin is able to edit user1 private playlist', async() => {
            const response = await playlistService.editPlaylistById(playlistId, tokenAdmin, editedPlaylistName, editedPlaylistComment)
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            expect(responseBody.id).toEqual(playlistId);
            expect(responseBody.public).toBe(false);
            expect(responseBody.name).toEqual(editedPlaylistName);
            expect(responseBody.comment).toEqual(editedPlaylistComment);    
        });

        await test.step('Admin is able to delete user1 private playlist', async() => {
            const response = await playlistService.deletePlaylistById(playlistId, tokenAdmin)
            expect(response.status()).toBe(200);

            idArray = idArray.filter(item => item !== playlistId);
        });

        await test.step('Admin is not able to see the created private playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenAdmin)
            expect(response.status()).toBe(404);
        });

        await test.step('User1 is not able to see the created private playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenUser1)
            expect(response.status()).toBe(404);
        });
    });

    test('Public playlist authorization test', async ({request}) => {
        const playlistName = 'API public playlist';
        const playlistComment = 'created by API test';
        const editedPlaylistName = 'EDITED playlist name';
        const editedPlaylistComment = 'EDITED playlist comment';
        const isPublic = true;

        await test.step('User1 creates public playlist', async() => {
            const response = await playlistService.createPlaylist(playlistName, isPublic, playlistComment, tokenUser1)
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            playlistId = responseBody.id;
            idArray.push(playlistId);
        });

        await test.step('User2 is able to see the created public playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenUser2);
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            expect(responseBody.id).toEqual(playlistId);
            expect(responseBody.public).toBe(true);
        });

        await test.step('User2 is not able to edit user1 public playlist', async() => {
            const response = await playlistService.editPlaylistById(playlistId, tokenUser2, editedPlaylistName, editedPlaylistComment);
            expect(response.status()).toBe(403);  
        });

        await test.step('User2 is not able to delete user1 public playlist', async() => {
            const response = await playlistService.deletePlaylistById(playlistId, tokenUser2);
            expect(response.status()).toBe(403);
        });

        await test.step('User1 is able to delete public playlist', async() => {
            const response = await playlistService.deletePlaylistById(playlistId, tokenUser1);
            expect(response.status()).toBe(200);

            idArray = idArray.filter(item => item !== playlistId);
        });

        await test.step('User1 is not able to see the deleted public playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenUser1)
            expect(response.status()).toBe(404);
        });

        await test.step('User2 is not able to see the deleted public playlist', async() => {
            const response = await playlistService.getPlaylistById(playlistId, tokenUser2)
            expect(response.status()).toBe(404);
        });
    });
});