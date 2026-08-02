import { test, expect } from '@playwright/test';

test.describe('All My Tests', () => { // this is when grouping tests if you have may tests in a file

    test.beforeEach(async ({ page }) => { // put .beforeEach hook so that this test will run BEFORE each test

        await page.goto('https://saucedemo.com');

        // Fill username
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');

        // Fill password
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');

        // Login
        await page.locator('[data-test="login-button"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
    });

    test.afterEach(async ({ page }) => { // this hook will run AFTER all test
        await page.close();
    });

    test('Homepage', async ({ page }) => {

        // Add items on the cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        await page.locator('[data-test="item-1-title-link"]').click();
        await page.locator('[data-test="add-to-cart"]').click();

        await page.locator('[data-test="back-to-products"]').click();
    });

    test('Logout', async ({ page }) => {

        // Logout
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com');

    });

});