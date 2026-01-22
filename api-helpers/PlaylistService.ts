import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export class PlaylistService extends BaseApi {
  
    // async createPlaylist(playlistName: string): Promise<APIResponse> {
       
    // }

    async deletePlaylistById(playlistId: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.delete(`/api/playlist/${playlistId}`);
        return response;
    }

    async getPlaylistIdByName(name: string): Promise<string | null> {
        await this.init();
        const response = await this.apiContext.get('/api/playlist');
        const playlistsArray = await response.json();
        // 2 lines above can be const playlistArray = await (await this.apiContext.get('/api/playlist')).json();      
        for (let i=0; i<playlistsArray.length; i++) {
            if (playlistsArray[i].name === name) {
                return playlistsArray[i].id;
            } 
        }
        return null;
    }
}