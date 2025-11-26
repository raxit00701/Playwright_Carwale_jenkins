import { test, expect } from '@playwright/test';

test.describe('Authenticated flow via API', () => {
    let authToken; // store token here

    test.beforeEach(async ({ page, request }) => {
        // Step 1: Login via API
        const loginResponse = await request.post('https://carwale-backend.onrender.com/api/user/login', {
            data: {
                email: 'fekemif391@bipochub.com',
                password: 'Password@12',
            },
        });

        expect(loginResponse.ok()).toBeTruthy();

        // Step 2: Parse JSON
        const loginJson = await loginResponse.json();

        // Step 3: Extract token
        authToken = loginJson?.token;
        console.log('Auth Token:', authToken);

        // Step 4: Save JSON in localStorage
        await page.addInitScript((value) => {
            window.localStorage.setItem('auth', JSON.stringify(value));
        }, loginJson);

        // Step 5: Navigate to app
        await page.goto('https://carwale.onrender.com/');
    });

    test('Logout button should be visible after login', async ({ page }) => {
        const logoutButton = page.getByRole('link', { name: 'Logout' });
        await expect(logoutButton).toBeVisible();
    });

    test('Empty cart landing page should show .mb-1 and .mb-0', async ({ page, request }) => {
        // Call the empty cart endpoint with Authorization header
        const cartResponse = await request.get('https://carwale-backend.onrender.com/api/car/braintree/token', {
            headers: {
                accept: 'application/json, text/plain, */*',
                authorization: `Bearer ${authToken}`, // attach token here
            },
        });

        expect(cartResponse.ok()).toBeTruthy();

        // Navigate to empty cart page in UI
        await page.goto('https://carwale.onrender.com/cart'); // adjust path if needed

        // Check .mb-1 element
        const mb1 = page.locator('.mb-1');
        await expect(mb1).toBeVisible();
        console.log('Empty Cart .mb-1 Text:', await mb1.textContent());

        // Check .mb-0 element
        const mb0 = page.locator('.mb-0');
        await expect(mb0).toBeVisible();
        console.log('Empty Cart .mb-0 Text:', await mb0.textContent());
    });
});