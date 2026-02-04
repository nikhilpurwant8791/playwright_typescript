import { test, expect } from '@playwright/test';

test('Verify user can not checkout with empty cart', async ({ page }) => {
    await page.goto('https://shop.polymer-project.org/');
    await page.getByRole('button', { name: 'Shopping cart: 0 items' }).click();
    await expect(page.getByRole('paragraph')).toContainText('Your is empty.');
});

test('Verify Error messages on checkout', async ({ page }) => {
    await page.goto('https://shop.polymer-project.org/');
    await page.locator('#tabContainer').getByRole('link', { name: 'Men\'s Outerwear' }).click();
    await page.getByRole('link', { name: 'Men\'s Tech Shell Full-Zip Men' }).click();
    await page.getByRole('button', { name: 'Add this item to cart' }).click();
    await page.getByRole('link', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Place Order' }).click();

    const errorMessages = [
        'Invalid Phone Number',
        'Invalid Email',
        'Invalid Address',
        'Invalid City',
        'Invalid State/Province',
        'Invalid Zip/Postal Code',
        'Invalid Cardholder Name',
        'Invalid Card Number',
        'Invalid CVV'
    ];

    for (const errorMsg of errorMessages) {
        await expect(page.locator(`[error-message="${errorMsg}"]`).first()).toBeVisible();
    }
})