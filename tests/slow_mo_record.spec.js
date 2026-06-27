import { chromium, expect, test } from '@playwright/test';

test("Slow Motion Recording Demo", async() => {

    // Launch the browser
    const browser = await chromium.launch({
        slowMo: 500,
        headless: false
    });

    // Create a new browser context
    const context = await browser.newContext({
        recordVideo: {
            dir: 'test-results/video',
            size: { width: 800, height: 600 }
        }
    });

    // Create a new page inside context
    const page = await context.newPage();

    await page.goto('https://demo.applitools.com/');

    // Fill the username
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('Raghav');

    // Fill the password
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('1234');

    // Ensure the 'Remember Me' is checked
    await page.getByRole('checkbox', { name: 'Remember Me' }).check();
    await expect(page.getByRole('checkbox', { name: 'Remember Me' })).toBeChecked();

    // Login
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Expects a homepage
    await expect(page.getByRole('link', { name: 'ACME' })).toBeVisible();

    // Dispose context once it's no longer needed
    await context.close();
});