// @ts-check
const { expect } = require('@playwright/test');

class CarsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.carsLink = page.getByRole('link', { name: 'Cars' });
        this.brandsLink = page.getByRole('link', { name: 'Brands' });
    }

    async gotoCars() {
        await expect(this.carsLink).toBeVisible();
        await this.carsLink.click();
    }

    async gotoBrands() {
        await expect(this.brandsLink).toBeVisible();
        await this.brandsLink.click();
    }
}

module.exports = { CarsPage };