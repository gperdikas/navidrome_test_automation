import { request, APIRequestContext } from '@playwright/test';

export class BaseApi {
  protected baseURL: string;
  protected apiContext!: APIRequestContext;

  constructor(baseURL: string = 'http://localhost:4533') {
    this.baseURL = baseURL;
  }

  async init() {
    this.apiContext = await request.newContext({
      baseURL: this.baseURL,
    });
  }

  async dispose() {
    await this.apiContext.dispose();
  }
}