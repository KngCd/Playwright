import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config()

test.only("Login Demo Test 1", async({ page, context}) => {
    // Go this page
    await page.goto('https://demo.applitools.com/');
    await page.pause();

    // Fill the username
    await page.getByRole('textbox', { name: 'Enter your username' }).fill(process.env.WEB_USERNAME);

    // Fill the password
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.WEB_PASSWORD);

    // Ensure the 'Remember Me' is checked
    await page.getByRole('checkbox', { name: 'Remember Me' }).check();
    await expect(page.getByRole('checkbox', { name: 'Remember Me' })).toBeChecked();

    // Login
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Expects a homepage
    await expect(page.getByRole('link', { name: 'ACME' })).toBeVisible();
});

test("Login Demo Test 2", async({ page, context }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('img', { name: 'company-branding' })).toBeVisible();

    // Fill the username
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

    // Fill the password
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Ensure user is redirected to dashboard
    await page.locator('div').filter({ hasText: /^Dashboard$/ })

    // Logout
    await page.locator('.oxd-userdropdown').click();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // Should return to the login page
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});