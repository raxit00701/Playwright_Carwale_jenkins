// @ts-check
const { expect } = require('@playwright/test');

/**
 * Perform API login and inject response into localStorage
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').APIRequestContext} request
 * @returns {Promise<any>} login JSON (includes token)
 */
async function apiLogin(page, request) {
    const loginResponse = await request.post(
        'https://carwale-backend.onrender.com/api/user/login',
        {
            data: {
                email: 'fekemif391@bipochub.com',
                password: 'Password@12',
            },
        }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginJson = await loginResponse.json();

    // Save JSON in localStorage
    await page.addInitScript((value) => {
        window.localStorage.setItem('auth', JSON.stringify(value));
    }, loginJson);

    // Navigate with authenticated state
    await page.goto('https://carwale.onrender.com/');

    return loginJson; // <-- critical: return JSON so spec can use token
}

module.exports = { apiLogin };