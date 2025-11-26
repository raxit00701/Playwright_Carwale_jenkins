const { test, expect } = require('@playwright/test');

const {apiLogin} = require("../utils/auth");

test.describe('LOGIN API', () => {
    test.beforeEach(async ({ page, request }) => {
        await apiLogin(page, request);
    });

test('Filter functionality', async ({ page }) => {




    // Step 6: Click on Cars button
    const carsButton = page.getByRole('link', { name: 'Cars' });
    await carsButton.click();
    await page.waitForTimeout(2000);

    // Grab all checkboxes inside .d-flex.flex-column
    const checkboxes = page.locator('.d-flex.flex-column .ant-checkbox-input');

    // PART 2: Test all combinations - each checkbox with both radio buttons
    console.log('\n=== PART 2: Testing Radio Buttons with All Checkboxes ===');
    const radioSelectors = [
        'input.ant-radio-input[value="1,50"]',
        'input.ant-radio-input[value="51,100"]'
    ];

    // Test all 4 checkboxes with both radio buttons
    for (let i = 0; i < 4; i++) {
        const checkbox = checkboxes.nth(i);

        for (let j = 0; j < radioSelectors.length; j++) {
            // Check the checkbox
            await expect(checkbox).toBeVisible();
            await checkbox.check();
            console.log(`☑️ Checkbox ${i + 1} checked`);
            await expect(checkbox).toBeChecked();

            // Click the radio button
            const radio = page.locator(radioSelectors[j]);
            await radio.click();
            console.log(`✅ Clicked radio: ${radioSelectors[j]}`);
            await expect(radio).toBeChecked();

            // Wait for filtering to complete


            // Verify car cards are displayed
            const carCards = page.locator('.col-md-12.col-lg-4.mb-3 > .card');

            // Check if any car cards exist
            const cardCount = await carCards.count();

            if (cardCount === 0) {
                console.log('❌ No filtered cards found');
            } else {
                try {
                    await expect(carCards.first()).toBeVisible({ timeout: 10000 });

                    const cardTexts = await carCards.allInnerTexts();
                    console.log(`🔍 Found ${cardTexts.length} car filtered cards:`);
                    cardTexts.forEach((text, index) => {
                        console.log(`🚗 Card ${index + 1}:\n${text.trim()}\n`);
                    });
                } catch (error) {
                    console.log('❌ No filtered cards found (timeout waiting for visibility)');
                }
            }

            // Click RESET FILTERS button to clear all filters
            const resetButton = page.locator('//button[normalize-space()="RESET FILTERS"]');
            await resetButton.click();
            console.log('🔄 Clicked RESET FILTERS button');

            // Wait for UI to reset
            await page.waitForTimeout(1000);

            console.log('---');
        }
    }

    console.log('\n=== Test Completed ===');
});
});