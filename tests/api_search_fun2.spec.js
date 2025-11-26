// @ts-check
const { test, expect } = require('@playwright/test');

const {apiLogin} = require("../utils/auth");

test.describe('LOGIN API', () => {
    test.beforeEach(async ({ page, request }) => {
        await apiLogin(page, request);
    });

test('Search functionality', async ({ page }) => {


    // Step 6: Click on Cars button
    const carsButton = page.getByRole('link', { name: 'Cars' });
    await carsButton.click();

    // Step 7: Search for "Mahindra"
    const searchInput = page.getByPlaceholder('🔎 Search your car...');
    await searchInput.clear();
    await searchInput.fill('mahindra');
    await page.waitForLoadState('networkidle');

    // Step 8: Print all Mahindra card texts
    const carCards = page.locator('.col-md-12.col-lg-4.mb-3 > .card');
    await expect(carCards.first()).toBeVisible({ timeout: 5000 });

    let cardTexts = await carCards.allInnerTexts();
    console.log(`🔍 Found ${cardTexts.length} Mahindra car cards:`);
    cardTexts.forEach((text, index) => {
        console.log(`🚗 Card ${index + 1}:\n${text}\n`);
    });

    // Step 9: Search for "Honda"
    await searchInput.clear();
    await searchInput.fill('honda');
    await page.waitForLoadState('networkidle');

    cardTexts = await carCards.allInnerTexts();
    console.log(`🔍 Found ${cardTexts.length} Honda car cards:`);
    cardTexts.forEach((text, index) => {
        console.log(`🚗 Card ${index + 1}:\n${text}\n`);
    });

    // Step 10: Search for "Mercedes Benz"
    await searchInput.clear();
    await searchInput.fill('mercedes');
    await page.waitForLoadState('networkidle');

    cardTexts = await carCards.allInnerTexts();
    console.log(`🔍 Found ${cardTexts.length} Mercedes Benz car cards:`);
    cardTexts.forEach((text, index) => {
        console.log(`🚗 Card ${index + 1}:\n${text}\n`);
    });
});

});