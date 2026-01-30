import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export class PlaylistService extends BaseApi {
  
    async createPlaylist(playlistName: string, isPublic: boolean): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post('/api/playlist/', {data: {name: playlistName, public: isPublic}});
        return response;
    }

    async deletePlaylistById(playlistId: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.delete(`/api/playlist/${playlistId}`);
        return response;
    }

    async getPlaylistIdByName(name: string): Promise<string | null> {
        await this.init();
        const response = await this.apiContext.get('/api/playlist');
        const playlistsArray = await response.json();    
        // const playlistArray = await (await this.apiContext.get('/api/playlist')).json();      
        for (let i=0; i<playlistsArray.length; i++) {
            if (playlistsArray[i].name === name) {
                return playlistsArray[i].id;
            } 
        }
        return null;
    }
}