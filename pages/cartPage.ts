import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async viewCart() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }

  async goToCheckout() {
    await this.page.getByRole('link', { name: 'Checkout' }).click();
  }

  async verifyCartItem(itemName: string) {
    await expect(this.page.locator('shop-cart-item')).toContainText(itemName);
  }

  async verifyCartItemQuantity(quantity: string) {
    await expect(this.page.getByLabel('Change quantity')).toHaveValue(quantity);
  }
}
