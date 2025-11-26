// tests/register.spec.js
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Carwale Registration', () => {

    test('Valid registration with natural data', async ({ page }) => {
        await page.goto('https://carwale.onrender.com/');

        // Navigate to register
        await page.click('a[href="/register"]');

        // Fill valid natural data
        await page.fill('input[placeholder="Your name"]', faker.person.fullName());
        await page.fill('input[placeholder="Your email ID"]', faker.internet.email());
        await page.fill('input[placeholder="Your password"]', faker.internet.password({ length: 10 }));

        // ✅ Explicit click before filling phone number
        await page.click('input[placeholder="Your phone number"]');
        await page.fill('input[placeholder="Your phone number"]', faker.number.int({ min: 1000000000, max: 9999999999 }).toString());// 10-digit

        await page.fill('input[placeholder="Your address"]', faker.location.streetAddress());

        // Click Register
        await page.getByRole('button', { name: 'Register' }).click();

        // Example assertion (adjust based on app behavior)
        await expect(page).toHaveURL(/.*register/);
    });

    test('Invalid registration with broken data', async ({ page }) => {
        await page.goto('https://carwale.onrender.com/');

        // Navigate to register
        await page.click('a[href="/register"]');

        // Fill invalid data
        await page.fill('input[placeholder="Your name"]', '!!!@@@'); // invalid chars
        await page.fill('input[placeholder="Your email ID"]', 'not-an-email'); // invalid email
        await page.fill('input[placeholder="Your password"]', '123'); // too short

        // ✅ Explicit click before filling phone number
        await page.click('input[placeholder="Your phone number"]');
        await page.fill('input[placeholder="Your phone number"]', '12'); // not numeric

        await page.fill('input[placeholder="Your address"]', ''); // blank

        // Click Register
        await page.getByRole('button', { name: 'Register' }).click();

        // Example assertion (adjust based on app behavior)
        await expect(page).toHaveURL(/.*register/);
    });

});