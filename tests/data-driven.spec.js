import { test, expect } from '@playwright/test';

// Test data for validating username field boundaries.
// Each object represents one test scenario:
// - username: input value to test
// - errorMessage: expected validation message
// - isErrorDisplayed: whether the error should appear
[
    {
        username: '12',
        errorMessage: 'username is too short (minimum is 3 characters)',
        isErrorDisplayed: true
    },
    {
        username: '123',
        errorMessage: 'username',
        isErrorDisplayed: false
    },
    {
        username: '12345678901234567890',
        errorMessage: 'username',
        isErrorDisplayed: false
    },
    {
        username: '123456789012345678901',
        errorMessage: 'username is too long (maximum is 20 characters',
        isErrorDisplayed: true
    }
].forEach(({ username, errorMessage, isErrorDisplayed }) => { // Loop through each test data object and create a separate Playwright test.

    // The test name includes the username being tested for easier identification.
    test(`Error message test ${username}`, async ({ page }) => {

        // Navigate to the application homepage.
        await page.goto('https://conduit.bondaracademy.com');

        // Open the Sign Up page.
        await page.getByRole('link', { name: 'Sign Up' }).click();

        // Fill the username field using the current test data.
        await page.getByRole('textbox', { name: 'Username' }).fill(username);

        // Fill other required fields with placeholder values
        // so that username validation can be tested independently.
        await page.getByRole('textbox', { name: 'Email' }).fill('12');
        await page.getByRole('textbox', { name: 'Password' }).fill('HelloWorld');

        // Submit the registration form.
        await page.getByRole('button', { name: 'Sign Up' }).click();

        // Verify whether the username validation message
        // should appear based on the current test scenario.
        if (isErrorDisplayed) {
            // Positive assertion:
            // The expected validation error should be visible.
            await expect(page.locator('.error-messages'))
                .toContainText(errorMessage);
        } else {
            // Negative assertion:
            // The validation error should NOT be displayed.
            await expect(page.locator('.error-messages'))
                .not.toContainText(errorMessage);
        }

    });

});