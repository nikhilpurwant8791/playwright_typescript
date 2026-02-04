import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

test('Verify the home page title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateHome();
    await homePage.verifyHomePageTitle();
});

test('Verify homepage links', async ({ page, request }) => {
    const homePage = new HomePage(page);
    await homePage.navigateHome();
    await homePage.verifyAllLinks(request);
});

test('Verify cart item and quantity added', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateHome();
    await homePage.selectMensOuterwear();
    await productPage.selectProduct('Men\'s Tech Shell Full-Zip Men');
    await productPage.addProductToCart();
    await cartPage.viewCart();
    await cartPage.verifyCartItem('Men\'s Tech Shell Full-Zip');
    await cartPage.verifyCartItemQuantity('1');
});

