import { request, APIRequestContext } from '@playwright/test';
import * as fs from 'fs';

export class BaseApi {
  protected baseURL: string;
  protected apiContext!: APIRequestContext;

  constructor(baseURL: string = 'http://localhost:4533') {
    this.baseURL = baseURL;
  }

  async init() {
    const fileContent = fs.readFileSync('admin-api-token.json', 'utf-8');
    const tokenData = JSON.parse(fileContent);
    const token = tokenData.token;
    this.apiContext = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'x-nd-authorization': 'Bearer ' + token,
    },
    });
  }

  async dispose() {
    await this.apiContext.dispose();
  }
}
