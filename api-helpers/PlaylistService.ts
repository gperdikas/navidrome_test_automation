import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export class PlaylistService extends BaseApi {
  
    // Creates a playlist
    async createPlaylist(playlistName: string, isPublic: boolean): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post('/api/playlist/', {data: {name: playlistName, public: isPublic}});
        return response;
    }

    // Deletes a playlist
    async deletePlaylistById(playlistId: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.delete(`/api/playlist/${playlistId}`);
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
}