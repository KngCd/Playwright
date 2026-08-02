import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test('Login', async ({ page }) => {
    
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.APP_USERNAME, process.env.APP_PASSWORD);
});