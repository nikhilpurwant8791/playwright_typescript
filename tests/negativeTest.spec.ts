import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('Verify user can not checkout with empty cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateHome();
    await homePage.openShoppingCart();
    await homePage.verifyEmptyCartMessage();
});

test('Verify Error messages on checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigateHome();
    await homePage.selectMensOuterwear();
    await productPage.selectProduct('Men\'s Tech Shell Full-Zip Men');
    await productPage.addProductToCart();
    await checkoutPage.goToCheckout();
    await checkoutPage.placeOrder();

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

    await checkoutPage.verifyAllErrorMessages(errorMessages);
});