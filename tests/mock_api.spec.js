// @ts-check
import { test, expect } from '@playwright/test';
import tags from '../mocks/tags.json'
import articles from '../mocks/articles.json'
import { json } from 'node:stream/consumers';

// https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0
// https://conduit-api.bondaracademy.com/api/tags

test.describe('Mocking APIs', () => {

    test('intercept tags API endpoint', async ({ page }) => {
        await page.route('**/api/tags', async route => { // mock the api endpoint
        // use ** to match anything before the text
        // use * to only match 1 path before or after
            if (route.request().method().includes('GET')) {
                // Mock only GET requests by returning our custom response
                await route.fulfill({
                    body: JSON.stringify(tags),
                    contentType: 'application/json',
                    status: 200
                });
            } else {
                // Allow all non-GET requests (POST, PUT, DELETE, etc.) to proceed normally
                await route.continue();
            }
    
        });
    
        await page.goto('https://conduit.bondaracademy.com/'); // start the execution
    
        // Assert that the tags from the intercepted API response is displayed
        await expect(page.locator('.tag-default')).toContainText([
            'IT Support',
            'Software Testing',
            'Network Technology'
        ]);
    });

    test('intercept article API endpoint', async ({ page }) => {
        await page.route('**/api/articles*', async route => {
            await route.fulfill({
                body: JSON.stringify(articles),
                contentType: 'application/json',
                status: 200
            });
        });

        await page.goto('https://conduit.bondaracademy.com/');
        await expect(page.locator('.article-preview h1').first()).toContainText('Mastering IT Support Fundamentals');

    });

    test('should handle 404 response gracefully', async ({ page }) => {
        await page.route('**/api/articles*', async route => {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({
                    errors: {
                        message: 'Not found'
                    }
                })
            })
        });

        await page.goto('https://conduit.bondaracademy.com/');
        // NOTE: This reflects the application's current behavior.
        // Ideally, the loading indicator should disappear and an error messageN
        // or empty state should be displayed instead.
        await expect(page.getByText('Loading articles...')).toBeVisible();
    });

});