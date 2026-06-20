import {test, expect} from '@playwright/test';

test("Selectors Demo", async({ page }) => {
    await page.goto("https://saucedemo.com");
    // await page.pause()

    // Fills username field
    await page.locator('id=user-name').click();
    await page.locator('id=user-name').fill('standard_user');

    // Fill password field
    await page.locator('id=password').click();
    await page.locator('id=password').fill("secret_sauce");

    // Click login button
    await page.locator('id=login-button').click();

    // Expect the header text to be visible
    await expect(page.getByText('Swag Labs')).toBeVisible();

    // Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('#logout_sidebar_link').click();

    // Expects to be back on HomePage (Login)
    await expect(page).toHaveURL('https://www.saucedemo.com');
});