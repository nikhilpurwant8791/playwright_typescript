import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { checkoutDataFixtures } from '../fixtures/checkoutDataFixture';

test('Complete end-to-end order placement', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.navigateHome();
  await homePage.selectMensOuterwear();
  await productPage.selectProduct('Men\'s Tech Shell Full-Zip Men');
  await productPage.addProductToCart();
  await productPage.closeDialog();

  await homePage.navigateHome();
  await homePage.selectLadiesOuterwear();
  await productPage.selectProduct('Ladies Modern Stretch Full');
  await productPage.addProductToCart();
  await productPage.closeDialog();

  await homePage.navigateHome();
  await homePage.selectMensTShirts();
  await productPage.selectProduct('YouTube Organic Cotton T-');
  await productPage.addProductToCart();

  await checkoutPage.goToCheckout();
  await checkoutPage.fillCheckoutForm(checkoutDataFixtures[0]);
  await checkoutPage.placeOrder();
  await checkoutPage.verifyOrderSuccess();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyReturnedToHome();
});

test('Order placement with different user - Dataset 2', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.navigateHome();
  await homePage.selectMensOuterwear();
  await productPage.selectProduct('Men\'s Tech Shell Full-Zip Men');
  await productPage.addProductToCart();
  await productPage.closeDialog();

  await homePage.navigateHome();
  await homePage.selectMensTShirts();
  await productPage.selectProduct('YouTube Organic Cotton T-');
  await productPage.addProductToCart();

  await checkoutPage.goToCheckout();
  await checkoutPage.fillCheckoutForm(checkoutDataFixtures[1]);
  await checkoutPage.placeOrder();
  await checkoutPage.verifyOrderSuccess();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyReturnedToHome();
});

test('Order placement with another user - Dataset 3', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.navigateHome();
  await homePage.selectLadiesOuterwear();
  await productPage.selectProduct('Ladies Modern Stretch Full');
  await productPage.addProductToCart();
  await productPage.closeDialog();

  await homePage.navigateHome();
  await homePage.selectMensTShirts();
  await productPage.selectProduct('YouTube Organic Cotton T-');
  await productPage.addProductToCart();

  await checkoutPage.goToCheckout();
  await checkoutPage.fillCheckoutForm(checkoutDataFixtures[2]);
  await checkoutPage.placeOrder();
  await checkoutPage.verifyOrderSuccess();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyReturnedToHome();
});