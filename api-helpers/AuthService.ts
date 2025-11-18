import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export class AuthService extends BaseApi {
  
    async login(username: string, password: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post('/auth/login', {
            data: {
                username: username,
                password: password,
            },
        });
        return response;
    }

    async logout(token: string): Promise<APIResponse> {
        await this.init();
        const response = await this.apiContext.post('/auth/logout', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    }
}