// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { LoginPage } = require('../pages/LoginPage');

// Load search terms from JSON
const dataPath = path.join(
    'C:\\Users\\raxit\\WebstormProjects\\playwright_pra\\json_data',
    'search_terms.json'
);
const searchData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Create one test per search term
for (const { keyword } of searchData.terms) {
    test(`Search for "${keyword}"`, async ({ page }) => {
        // Step 1: Go to site using POM
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        // Step 2: Login using POM
        await loginPage.login('fekemif391@bipochub.com', 'Password@12');
        await page.waitForTimeout(3000);

        // Step 3: Navigate to Cars page
        await page.getByRole('link', { name: 'Cars' }).click();

        // Step 4: Search
        const searchInput = page.getByPlaceholder('🔎 Search your car...');
        await searchInput.fill(keyword);
        await page.waitForLoadState('networkidle');

        const carCards = page.locator('.col-md-12.col-lg-4.mb-3 > .card');
        await expect(carCards.first()).toBeVisible({ timeout: 5000 });

        const cardTexts = await carCards.allInnerTexts();
        console.log(`🔍 Found ${cardTexts.length} "${keyword}" car cards:`);
        cardTexts.forEach((text, index) => {
            console.log(`🚗 Card ${index + 1}:\n${text}\n`);
        });
    });
}