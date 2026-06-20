import { test, expect } from '@playwright/test';

test('My first test', async ({page}) => {
    await page.goto('https://kuboware.com');

    await expect(page).toHaveTitle(/Kubo-ware/);
});