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

// import { request, APIRequestContext } from '@playwright/test';
// import * as fs from 'fs';

// export class BaseApi {
//   protected baseURL: string;
//   protected apiContext!: APIRequestContext;

//   constructor(baseURL: string = 'http://localhost:4533') {
//     this.baseURL = baseURL;
//   }

//   async init() {
//     console.log('Creating API context with storage state');
    
//     // Use the storage state (includes cookies) instead of just the token
//     this.apiContext = await request.newContext({
//       baseURL: this.baseURL,
//       storageState: 'admin-auth.json'  // ← Use cookies instead!
//     });
    
//     console.log('API context created with cookies');
//   }

//   async dispose() {
//     await this.apiContext.dispose();
//   }
// }