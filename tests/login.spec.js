// @ts-check
const { test, expect } = require('@playwright/test');

test('Login flow validation on carwale demo site', async ({ page }) => {
    // Step 1: Go to site (no networkidle)
    await page.goto('https://carwale.onrender.com');

    // Step 2: Wait explicitly for Login link to appear
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

    // Step 3: Click on Login link
    await page.getByRole('link', { name: 'Login' }).click();

    // Step 4: Fill in email and password
    await page.getByPlaceholder('Your email ID').fill('fekemif391@bipochub.com');
    await page.getByPlaceholder('Your password').fill('Password@12');

    // Step 5: Click on Login button
    await page.getByRole('button', { name: 'Login' }).click();






    // Step 6: Assertion – check if Logout button is visible
    const logoutButton = page.getByRole('link', { name: 'Logout' });
    await expect(logoutButton).toBeVisible({ timeout: 5000 });

    // Step 7: Print the text of the Logout button
    const logoutText = await logoutButton.textContent();
    console.log('🔘 Logout button text:', logoutText?.trim());

    // Step 8: Assertion – check if Dashboard button is visible
    const DashboardButton = page.getByRole('link', { name: 'Dashboard' });
    await expect(DashboardButton).toBeVisible();
    // Step 9: Print the text of the Dashboard button
    const DashboardText = await DashboardButton.textContent();
    console.log('🔘 Dashboard button text:', DashboardText?.trim());
    await DashboardButton.click();
    await page.waitForTimeout(5000);

    // Step 10: Check if .col-md-9.mt-4 .text-center (center text) is visible and print its text
    const targetElement = page.locator('.col-md-9.mt-4 .text-center');

    if (await targetElement.isVisible()) {
        const text = await targetElement.textContent();
        console.log('📌 Element text:', text?.trim());
        console.log('✅ Test Passed: user name is visible');
    } else {
        throw new Error('❌ Test Failed: .col-md-9.mt-4 .text-center is not visible');
    }



});