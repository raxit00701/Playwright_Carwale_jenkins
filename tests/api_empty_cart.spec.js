// @ts-check
const { test, expect } = require('@playwright/test');
const { apiLogin } = require("../utils/auth");    // login helper
const { getEmptyCartToken } = require('../utils/emptyCartApi'); // empty cart helper

test.describe('Empty Cart Landing Page', () => {
    let loginJson;

    test.beforeEach(async ({ page, request }) => {
        // Use utility for login
        loginJson = await apiLogin(page, request);
        console.log('Auth Token:', loginJson.token);
    });

    test('Empty cart landing page elements', async ({ page, request }) => {
        // Use utility for empty cart API
        await getEmptyCartToken(request, loginJson.token);

        // Navigate to empty cart page
        await page.goto('https://carwale.onrender.com/cart');

        const mb1 = page.locator('.mb-1');
        await expect(mb1).toBeVisible();
        console.log('Empty Cart .mb-1 Text:', await mb1.textContent());

        const mb0 = page.locator('.mb-0');
        await expect(mb0).toBeVisible();
        console.log('Empty Cart .mb-0 Text:', await mb0.textContent());
    });
});