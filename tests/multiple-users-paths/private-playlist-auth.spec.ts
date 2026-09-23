import {test, expect} from '@playwright/test';
import * as fs from 'fs';

test('Private playlist authorization test', async ({request}) => {
    let playlistId: string;
    const playlistName = 'API private playlist';
    const playlistComment = 'created by API test';
    const editedPlaylistName = 'EDITED playlist name';
    const editedPlaylistComment = 'EDITED playlist comment';
    let tokenUser1: string;
    let tokenUser2: string;
    let tokenAdmin: string;

    await test.step('Get users and admin tokens', async() => {
        const fileTextUser1 = fs.readFileSync('api-token.json', 'utf-8');
        const fileDataUser1 = JSON.parse(fileTextUser1);
        tokenUser1 = fileDataUser1.token;

        const fileTextUser2 = fs.readFileSync('api-token-user2.json', 'utf-8');
        const fileDataUser2 = JSON.parse(fileTextUser2);
        tokenUser2 = fileDataUser2.token;

        const fileTextAdmin = fs.readFileSync('admin-api-token.json', 'utf-8');
        const fileDataAdmin = JSON.parse(fileTextAdmin);
        tokenAdmin = fileDataAdmin.token;
    });

    await test.step('User1 creates private playlist', async() => {
        const response = await request.post(
            `${process.env.BASE_URL}/api/playlist`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenUser1}`,
                },
                data: {
                    name: playlistName,
                    comment: playlistComment,
                    public: false,
                }
            }
        )
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        playlistId = responseBody.id;
    });

    await test.step('User1 is able to see the created private playlist', async() => {
        const response = await request.get(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenUser1}`,
                },
            }
        )
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toEqual(playlistId);
        expect(responseBody.public).toBe(false);
        expect(responseBody.name).toEqual(playlistName);
        expect(responseBody.comment).toEqual(playlistComment);
    });
  
    await test.step('User2 is not able to see the created private playlist', async() => {
        const response = await request.get(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenUser2}`,
                },
            }
        )
        expect(response.status()).toBe(404);
    });

    await test.step('Admin is able to see the created private playlist', async() => {
        const response = await request.get(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenAdmin}`,
                },
            }
        )
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toEqual(playlistId);
        expect(responseBody.public).toBe(false);
        expect(responseBody.name).toEqual(playlistName);
        expect(responseBody.comment).toEqual(playlistComment);
    });

    await test.step('Admin is able to edit user1 private playlist', async() => {
        const response = await request.put(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenAdmin}`,
                },
                data: {
                    name: editedPlaylistName,
                    comment: editedPlaylistComment,
                }
            }
        )
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toEqual(playlistId);
        expect(responseBody.public).toBe(false);
        expect(responseBody.name).toEqual(editedPlaylistName);
        expect(responseBody.comment).toEqual(editedPlaylistComment);    
    });

    await test.step('Admin is able to edit user1 private playlist', async() => {
        const response = await request.delete(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenAdmin}`,
                },
            }
        )
        expect(response.status()).toBe(200);
    });

    await test.step('Admin is not able to see the created private playlist', async() => {
        const response = await request.get(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenAdmin}`,
                },
            }
        )
        expect(response.status()).toBe(404);
    });

    await test.step('User1 is not able to see the created private playlist', async() => {
        const response = await request.get(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${tokenUser1}`,
                },
            }
        )
        expect(response.status()).toBe(404);
    });
});