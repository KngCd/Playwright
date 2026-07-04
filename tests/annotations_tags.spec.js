import { test, expect } from '@playwright/test';

test.skip('Skip this Test', async ({ page }) => {
    // this test will be skipped

});

test.fail('Not Yet Ready', async ({ page }) => {
    // run, but expected to fail

    await page.goto('https://google.com')
});

test.fixme("Test to be Fixed", async({ page }) => {
    // test will be aborted

});

test.slow("Slow test", async ({ page }) => {
    // the test is marked as slow, this will triple the test timeout

});

// test.only("Focus on this test", async ({ page }) => {
//     // this will make this test to be the only one to run

// });

test('skip this test', async ({ page, browserName }) => {
    // this will skip a test if it meets a condition

    test.skip(browserName === 'firefox', 'Still working on it');
});

// Tags
test('Test login page @fast', async({ page }) => {
    // Tags help group tests and allow filtering them later with --grep
    // npx playwright test --grep @fast
    // This will run all tests with @fast tag
    
    // if you want to skip tests with certain tag use:
    // npx playwright test --grep-invert @fast
});

// Other tags:

// @smoke → run the most critical tests first
// @regression → run tests for broader regression coverage
// @fast → quick tests, usually for sanity checks
// @slow → longer - running tests
// @login → tests related to authentication
// @checkout → tests for checkout flow
// @api → API tests
// @ui → UI tests
// @desktop → desktop - browser specific tests
// @mobile → mobile - browser or responsive tests
// @critical → high - priority business - critical tests

// Common Playwright annotation tags:

// @skip → not executed
// @fail → expected to fail
// @fixme → placeholder / test to be fixed
// @slow → increases timeout
// @only → runs only this test