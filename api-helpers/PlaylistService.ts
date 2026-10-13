import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export class PlaylistService extends BaseApi {
  
    // Creates a playlist
     async createPlaylist(playlistName:string, isPublic: boolean, playlistComment: string, token: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post(
            `${process.env.BASE_URL}/api/playlist`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${token}`,
                },
                data: {
                    name: playlistName,
                    comment: playlistComment,
                    public: isPublic,
                }
            }
        )
        return response;
    };

    // Get existing playlist by its Id
    async getPlaylistById(playlistId: string, token: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.get(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${token}`,
                }
            }
        )
        return response;
    }

    // Edit playlist by Id
    async editPlaylistById(playlistId: string, token: string, editedPlaylistName: string, editedPlaylistComment:string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.put(
            `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${token}`,
                },
                data: {
                    name: editedPlaylistName,
                    comment: editedPlaylistComment,
                }
            }    
        )
        return response;
    }

    // Deletes playlist by Id
    async deletePlaylistById(playlistId: string, token: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.delete(
           `${process.env.BASE_URL}/api/playlist/${playlistId}`,
            {
                headers: {
                    'x-nd-authorization': `Bearer ${token}`,
                },
            } 
        )
        return response;
    }
    
    // Gets a playlist's id by its name
    async getPlaylistIdByName(name: string): Promise<string | null> {
        await this.init();
        const response = await this.apiContext.get('/api/playlist');
        const playlistsArray = await response.json();    
        for (let i=0; i<playlistsArray.length; i++) {
            if (playlistsArray[i].name === name) {
                return playlistsArray[i].id;
            } 
        }
        return null;
    }

    // Creates a user
    async createTestUser(): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post('/api/user/', {data: {isAdmin : false , userName: 'userTestOwner1' , password: 'userTestOwner' , name : 'UserTest' , email : 'testuser@owner.com'}});
        return response;
    }

    // Gets a user's id by their name
    async getUserIdByName(userName: string): Promise<string | null> {
        await this.init();
        const response = await this.apiContext.get('/api/user');
        const usersArray = await response.json();
        for (let i=0; i<usersArray.length; i++) {
            if (usersArray[i].userName === userName) {
                return usersArray[i].id;
            }
        }    
        return null;
    }

    // Deletes a user
    async deleteTestUser(userId: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.delete(`api/user/${userId}`);
        return response;
    }

    // Get song's Id

    // what if song given does not exist?

    async getSongIdByName(songName: string): Promise<string> {
        await this.init();
        const response = await this.apiContext.get(`api/song`);
        const songsArray = await response.json();
        function checkMissing(song: any) {
            return song.missing === false;
        }
        const presentSongsArray = songsArray.filter(checkMissing);
        function checkName(song: any) {
            return song.title === songName
        }
        const foundSong = presentSongsArray.find(checkName);
        return foundSong.id;
    }

    // Add song to playlist
    async addSongToPlaylist(playlistId: string, songIds: string[]): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post(`/api/playlist/${playlistId}/tracks`, {data: {ids: songIds}});
        return response;
    }
}