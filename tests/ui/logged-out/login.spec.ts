import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login-page';
import { UserPool } from '../../../api-helpers/UserPool';

const userPool = new UserPool();

test.describe.serial('Login UI tests', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    
    test('User is able to log into Navidrome', {tag: ['@regression', '@smoke', '@login']}, async ({page}) => {
        const user = userPool.getNextUser();
        await loginPage.login(user.username, user.password);

        await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
    });

    test('User is not able to log into Navidrome using invalid password', {tag: ['@regression', '@smoke', '@login']}, async ({page}) => {
        const user = userPool.getNextUser();
        await loginPage.login(user.username, process.env.INVALID_PASSWORD!);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User is not able to log into Navidrome with invalid username', {tag: ['@regression', '@login']}, async ({page}) => {
        const user = userPool.getNextUser();
        await loginPage.login(process.env.INVALID_USERNAME!, user.password);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User is not able to log into Navidrome without username provided', {tag: ['@regression', '@login']}, async ({page}) =>{
        const user = userPool.getNextUser();
        await loginPage.login(process.env.EMPTY_CREDENTIAL! , user.password);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    test('User is not able to log into Navidrome without password provided', {tag: ['@regression', '@login']}, async ({page}) =>{
        const user = userPool.getNextUser();
        await loginPage.login(user.username , process.env.EMPTY_CREDENTIAL!);

        await expect(page).toHaveURL(/\/app\/#\/login/);
    });

    // test('User is not able to log into Navidrome when providing first part of valid username' , {tag: ['@regression', '@login']}, async ({page}) =>{
    //     const loginPage = new LoginPage(page);

    //     await loginPage.goto();
    //     await loginPage.login(process.env.HALF_USERNAME! , user.password);

    //     await expect(page).toHaveURL(/\/app\/#\/login/);
    // });

    // test('User is not able to log into Navidrome when providing first part of valid password' , {tag: ['@regression', '@login']}, async ({page}) =>{
    //     const loginPage = new LoginPage(page);

    //     await loginPage.goto();
    //     await loginPage.login(user.username , process.env.HALF_PASSWORD!);

    //     await expect(page).toHaveURL(/\/app\/#\/login/);
    // });

    test('User sees related error message when fails to login' , {tag: ['@regression', '@login', '@smoke', '@errorHandling']}, async ({page}) => {
        const user = userPool.getNextUser();
        await loginPage.login(user.username, process.env.INVALID_PASSWORD!);

        await expect(loginPage.unauthorizedLogErrorMsg).toBeVisible();
    });

    test('User is able to login after a failing first attempt' , {tag: ['@regression', '@login', '@smoke']}, async ({page}) => {
        const user = userPool.getNextUser();
        await loginPage.login(user.username, process.env.INVALID_PASSWORD!);    
        await loginPage.unauthorizedLogErrorMsg.waitFor({ state: 'hidden' });
        await loginPage.login(user.username, user.password);

        await expect(page).toHaveURL(/\/app\/#\/album\/recentlyAdded/);
    });
});
