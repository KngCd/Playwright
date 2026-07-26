// @ts-check
import { test, expect } from '@playwright/test';

test('visual testing', async ({ page }) => {
    
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts');

    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({force: true});

    await expect(usingTheGridForm).toHaveScreenshot();

});

test('theme testing', async ({ page }) => {

    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts');

    await page.getByRole('button', { name: 'Light' }).click();
    await page.getByText('Dark').click();

    await expect(page).toHaveScreenshot();

});