// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CarsPage } = require('../pages/CarsPage');

test('Car purchased', async ({ page }) => {
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const carsPage = new CarsPage(page);

    // Step 1: Navigate to the application
    await loginPage.goto();

    // Step 2-5: Login with credentials
    await loginPage.login('fekemif391@bipochub.com', 'Password@12');
    await page.waitForTimeout(2000);

    // Step 6: Navigate to Brands page
    await carsPage.gotoBrands();

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

    // Step 13: Fill card details in iframes
    await page.frameLocator('iframe#braintree-hosted-field-number')
        .locator('input[data-braintree-name="number"]')
        .type('4622943127011022', { delay: 30 });

    await page.frameLocator('iframe#braintree-hosted-field-expirationDate')
        .locator('input[data-braintree-name="expirationDate"], input[name="expiration"]')
        .type('06/28', { delay: 25 });

    // Step 14: Click on Make Payment button
    await page.getByRole('button', { name: 'Make Payment' }).click();

    await page.waitForLoadState('networkidle');

    // Step 15: Print all orders
    const colTexts2 = await page.locator('.col-md-12 *').allInnerTexts();
    console.log('🔎 Elements inside .col-md-12:', colTexts2);
});