// @ts-check
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Login flow validation on carwale demo site', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1–5: Perform login
    await loginPage.goto();
    await loginPage.login('fekemif391@bipochub.com', 'Password@12');

    // Step 6–7: Assert Logout button
    await loginPage.assertLogoutVisible();

    // Step 8–9: Assert Dashboard button
    await loginPage.assertDashboardVisible();

    // Step 10: Assert center text
    await loginPage.assertCenterTextVisible();
});