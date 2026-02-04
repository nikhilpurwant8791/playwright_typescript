import { test, expect } from '@playwright/test';
import { request } from 'https';

test('Verify the home page title', async ({ page }) => {
    await page.goto('https://shop.polymer-project.org/');
    await expect(page).toHaveTitle(/Home - SHOP/);
});


test('Verify homepage links', async ({ page, request }) => {
    await page.goto('https://shop.polymer-project.org/');

    const links = await page.locator('a').all();

    for (const link of links) {
        const href = await link.getAttribute('href');

        const url = new URL(href!, page.url()).href;

        const response = await request.get(url);
        console.log(`${response.status()} url is -> ${url}`);

        expect(response.status(), `Broken link: ${url}`).toBeLessThan(400);
    }
});


test('Verify cart item and quantity added', async ({ page }) => {
    await page.goto('https://shop.polymer-project.org/');
    await page.locator('#tabContainer').getByRole('link', { name: 'Men\'s Outerwear' }).click();
    await page.getByRole('link', { name: 'Men\'s Tech Shell Full-Zip Men' }).click();
    await page.getByRole('button', { name: 'Add this item to cart' }).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.locator('shop-cart-item')).toContainText('Men\'s Tech Shell Full-Zip');
    await expect(page.getByLabel('Change quantity')).toHaveValue('1');
});

