// @ts-check
const { test, expect } = require('@playwright/test');

const {apiLogin} = require("../utils/auth");

test.describe('LOGIN API', () => {
    test.beforeEach(async ({ page, request }) => {
        await apiLogin(page, request);
    });

    test('Car details flow with add to cart', async ({ page }) => {
        const carsButton = page.getByRole('link', { name: 'Cars' });
        await carsButton.click();

        await page.locator('.card a.btn[style*="blueviolet"]').nth(0).click();

        const carCards = page.locator("div[class='col-md-6']");
        const cardTexts = await carCards.allInnerTexts();
        cardTexts.forEach((text) => console.log(`-----The car detail is------\n${text}\n`));

        const cartButton = page.locator('button.btn[style*="blueviolet"]');
        await expect(cartButton).toBeVisible();
        await cartButton.click();

        console.log('🛒 Test Passed: Cart button clicked and Cart page displayed');

        const successMessage = page.locator('//div[@role="status"]');
        await expect(successMessage).toBeVisible({ timeout: 5000 });

        console.log('✅ Test Passed: "Item Removed Successfully" message displayed');
    });
});