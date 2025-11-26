// @ts-check
const { test, expect } = require('@playwright/test');

const {apiLogin} = require("../utils/auth");

test.describe('Car details Test with add to cart (API object)', () => {
    test.beforeEach(async ({ page, request }) => {
        await apiLogin(page, request);
    });

test('Car purchased', async ({ page }) => {
// Step 1: Go to site


// Step 6: Click on Brands button
    const carsButton = page.getByRole('link', { name: 'Brands' });
    await carsButton.click();
    // Step 7: Click on Hyundai brand link
    const hyundaiLink = page.locator('a[href="/brand/hyundai"]');
    await expect(hyundaiLink).toBeVisible();
    await hyundaiLink.click();




// Step 8: Click first violet button inside card
    const firstCardBtn = page.locator('.card a.btn[style*="blueviolet"]').first();
    await expect(firstCardBtn).toBeVisible();
    await firstCardBtn.click();

// Step 9: Click on violet button (view button)
    const violetButton = page.locator('button.btn[style*="blueviolet"]');
    await expect(violetButton).toBeVisible();
    await violetButton.click();

// Step 10: Click on violet-colored SVG icon (add to cart)
    const violetIcon = page.locator('i.fa svg[color="blueviolet"]');
    await expect(violetIcon).toBeVisible();
    await violetIcon.click();

// Step 11: Print all elements inside .col-lg-7
    const colTexts = await page.locator('.col-lg-7').allInnerTexts();
    console.log('🔎 Elements inside .col-lg-7:', colTexts);


// Step 12: Click on payment option card
    const paymentOption = page.locator('.braintree-option__card');
    await expect(paymentOption).toBeVisible();
    await paymentOption.click();

    await page.frameLocator('iframe#braintree-hosted-field-number')
        .locator('input[data-braintree-name="number"]')
        .type('4622943127011022', { delay: 30 });

    await page.frameLocator('iframe#braintree-hosted-field-expirationDate')
        .locator('input[data-braintree-name="expirationDate"], input[name="expiration"]')
        .type('06/28', { delay: 25 });



    // Step 13: Click on Make Payment button
    await page.getByRole('button', { name: 'Make Payment' }).click();

    await page.waitForLoadState('networkidle');

// Step Y: Print all orders
    const colTexts2 = await page.locator('.col-md-12 *').allInnerTexts();
    console.log('🔎 Elements inside .col-md-9.my-3:', colTexts2);


});

});