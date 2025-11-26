// @ts-check
const { expect } = require('@playwright/test');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.emailInput = page.getByPlaceholder('Your email ID');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });
        this.centerText = page.locator('.col-md-9.mt-4 .text-center');
    }

    async goto() {
        await this.page.goto('https://carwale.onrender.com');
    }

    async login(email, password) {
        await expect(this.loginLink).toBeVisible();
        await this.loginLink.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLogoutVisible() {
        await expect(this.logoutButton).toBeVisible({ timeout: 5000 });
        const text = await this.logoutButton.textContent();
        console.log('🔘 Logout button text:', text?.trim());
    }

    async assertDashboardVisible() {
        await expect(this.dashboardButton).toBeVisible();
        const text = await this.dashboardButton.textContent();
        console.log('🔘 Dashboard button text:', text?.trim());
        await this.dashboardButton.click();
        await this.page.waitForTimeout(5000);
    }

    async assertCenterTextVisible() {
        if (await this.centerText.isVisible()) {
            const text = await this.centerText.textContent();
            console.log('📌 Element text:', text?.trim());
            console.log('✅ Test Passed: user name is visible');
        } else {
            throw new Error('❌ Test Failed: .col-md-9.mt-4 .text-center is not visible');
        }
    }
}

module.exports = { LoginPage };