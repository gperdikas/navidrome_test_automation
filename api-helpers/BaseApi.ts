import { request, APIRequestContext } from '@playwright/test';
import { readToken } from '../helpers/token-reader';

export class BaseApi {
  protected baseURL: string;
  protected apiContext!: APIRequestContext;

  constructor(baseURL: string = 'http://localhost:4533') {
    this.baseURL = baseURL;
  }

  async init() {
    const token = readToken('admin-api-token.json');
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
