// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Load JSON data
const dataPath = path.join(
    'C:\\Users\\raxit\\WebstormProjects\\playwright_pra\\json_data',
    'login.json'
);
const loginData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test('Login flow validation for multiple sessions in same browser', async ({ page }) => {
    // Step 1: Go to site once
    await page.goto('https://carwale.onrender.com');

    for (const session of loginData.sessions) {
        console.log(`🚀 Running session: ${session.name}`);

        // Step 2: Wait explicitly for Login link to appear
        await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

        // Step 3: Click on Login link
        await page.getByRole('link', { name: 'Login' }).click();

        // Step 4: Fill in email and password from JSON
        await page.getByPlaceholder('Your email ID').fill(session.email);
        await page.getByPlaceholder('Your password').fill(session.password);

        // Step 5: Click on Login button
        await page.getByRole('button', { name: 'Login' }).click();

        if (session.expected === 'success') {
            // ✅ Successful login flow
            const logoutButton = page.getByRole('link', { name: 'Logout' });
            await expect(logoutButton).toBeVisible({ timeout: 5000 });
            console.log(`🔘 [${session.name}] Logout button text:`, (await logoutButton.textContent())?.trim());

            const dashboardButton = page.getByRole('link', { name: 'Dashboard' });
            await expect(dashboardButton).toBeVisible();
            console.log(`🔘 [${session.name}] Dashboard button text:`, (await dashboardButton.textContent())?.trim());

            await dashboardButton.click();
            await page.waitForTimeout(2000);

            const targetElement = page.locator('.col-md-9.mt-4 .text-center');
            if (await targetElement.isVisible()) {
                console.log(`📌 [${session.name}] Element text:`, (await targetElement.textContent())?.trim());
                console.log(`✅ [${session.name}] Test Passed: user name is visible`);
            } else {
                throw new Error(`❌ [${session.name}] Test Failed: .col-md-9.mt-4 .text-center not visible`);
            }

            // Logout before next session
            await logoutButton.click();
            await page.waitForTimeout(1000);

        } else {
            // ❌ Invalid login flow
            const errorMessage = page.getByText('Invalid Email or Password!', { exact: true }) // adjust selector if needed
            await expect(errorMessage).toBeVisible({ timeout: 5000 });
            console.log(`⚠️ [${session.name}] Error message:`, (await errorMessage.textContent())?.trim());

            // Navigate back to home for next session
            await page.goto('https://carwale.onrender.com');
        }
    }
});