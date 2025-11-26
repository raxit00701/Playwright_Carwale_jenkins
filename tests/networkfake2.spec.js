// @ts-check
const { test, expect } = require('@playwright/test');
const { apiLogin } = require("../utils/auth");

test.describe('Orders Mock Test', () => {
    let loginJson;

    test.beforeEach(async ({ page, request }) => {
        // Use utility for login
        loginJson = await apiLogin(page, request);
        console.log('Auth Token:', loginJson.token);
    });

    test('Login -> Dashboard -> Orders (mock) and capture token', async ({ page }) => {
        // Enable console logging to catch frontend errors
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

        // 1) Fake response object - TESTING WITH ONLY 1 ORDER
        const fakeOrdersResponse = [
            {
                "_id": "SINGLE_MOCK_ORDER",
                "products": [
                    {
                        "_id": "66a69c3e9a595d7d2648ec55",
                        "name": "MOCKED Mercedes-Benz E-Class",
                        "slug": "mercedes-benz-e-class",
                        "description": "This is a SINGLE MOCKED ORDER for testing - Luxury sedan",
                        "price": "73.33",
                        "fuelType": "Petrol, Diesel",
                        "transmission": "Automatic",
                        "engineSize": "1991 cc",
                        "mileage": "12.06 km/l",
                        "safetyrating": "4.9",
                        "warranty": "3 Years or 100000 km",
                        "seater": "5",
                        "size": "5063 mm L X 1860 mm W X 1494 mm H",
                        "fuelTank": "80L",
                        "brand": "66a6913fb7e9049ec2d0b52b",
                        "productPictures": [
                            "https://drive.google.com/file/d/1hzRImGK_BqRgSKFPSgctP02-c_SGsIdG/view?usp=drivesdk"
                        ],
                        "createdAt": "2024-07-28T19:30:06.998Z",
                        "updatedAt": "2024-07-28T19:30:06.998Z",
                        "__v": 0
                    }
                ],
                "payment": {
                    "success": true,
                    "message": "MOCK Payment Successful - Single Order Test",
                    "transaction": { "id": "MOCK_TXN_12345" }
                },
                "buyer": {
                    "_id": "692065bef07819eab3e7e48c",
                    "name": "Test User - Single Order"
                },
                "status": "Delivered",
                "createdAt": "2025-11-23T12:30:00.000Z",
                "updatedAt": "2025-11-23T12:30:00.000Z",
                "__v": 0
            }
        ]; // ← Still an ARRAY, just with 1 element!

        // 2) Variable to store captured token
        let capturedAuthToken = null;

        // Ensure Dashboard link visible (login done)
        await page.getByRole('link', { name: 'Dashboard' }).click();

        // Wait for dashboard to load
        await page.waitForLoadState('networkidle');

        // 4) Register the route to mock the orders API
        await page.route('**/api/user/orders', async (route) => {
            const headers = route.request().headers();
            capturedAuthToken = headers['authorization'] || headers['Authorization'] || null;
            console.log('✅ Captured Authorization header:', capturedAuthToken);
            console.log('🎭 Using MOCKED response');

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fakeOrdersResponse),
            });
        });

        // 5) Click Orders and wait for the intercepted response
        const ordersResponsePromise = page.waitForResponse(
            response => response.url().includes('/api/user/orders') && response.status() === 200,
            { timeout: 10000 }
        );

        console.log('🖱️  Clicking Orders link...');
        await page.locator("xpath=//a[normalize-space()='Order']").click();

        await ordersResponsePromise;
        console.log('✅ Orders API intercepted successfully');

        // Wait for UI to render
        await page.waitForTimeout(2000);

        // 6) Assert badge is visible - FIX: use .first() since there are multiple badges
        const badgeLocator = page.locator("xpath=//span[@class='badge text-bg-primary']").first();
        await expect(badgeLocator).toBeVisible({ timeout: 10000 });
        console.log('✅ Badge is visible');

        // 7) Verify token was captured
        expect(capturedAuthToken).not.toBeNull();
        console.log('✅✅✅ Token successfully captured:', capturedAuthToken);

        // 8) Assert that mocked car name is visible on page (SINGLE ORDER)
        await expect(page.locator('text=MOCKED Mercedes-Benz E-Class')).toBeVisible();
        console.log('✅ Mocked car data is displayed correctly');

        // 9) Verify mocked status is displayed (SINGLE ORDER)
        await expect(page.locator('text=Delivered')).toBeVisible();
        console.log('✅ Mocked order status "Delivered" is displayed');

        // 10) Verify we only have 1 order
        const orderRows = await page.locator('xpath=//span[@class="badge text-bg-primary"]').count();
        console.log(`✅ Total order badges found: ${orderRows}`);
        console.log(`   Expected: 1 (our single mocked order)`);
        expect(orderRows).toBe(1); // Should have exactly 1 order
    });
});