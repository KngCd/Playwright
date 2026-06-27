import { test, expect } from '@playwright/test';

test("Assertions Demo", async ({ page, context }) => {

    await page.goto('https://kitchen.applitools.com');
    await page.pause();

    // Check if the element is present or not
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveCount(1);

    // Check if the element is visible or not
    await expect(page.getByText('A pantry full of web')).toBeVisible();
    // await expect.soft(page.getByText('A pantry full of web')).toBeHidden(); // you can add 'soft' keyword to make the test run even there's error

    // Check if the element is enabled/disabled
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toBeEnabled();
    // await expect.soft(page.getByRole('heading', { name: 'The Kitchen' })).toBeDisabled();

    // Check if the text matches values or not
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveText('The Kitchen');
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).not.toHaveText('Sample Text');

    // Check the attribute value
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveAttribute('class', /.*css-dpmy2a/);
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveClass(/.*css-dpmy2a/);

    // Check the URL and the page title
    await expect(page).toHaveURL(/kitchen.applitools.com/); // Expect the URL to contain a substring by using / /
    await expect(page).toHaveTitle(/Kitchen/);

    // Visual validation using screenshot
    await expect(page).toHaveScreenshot();
});