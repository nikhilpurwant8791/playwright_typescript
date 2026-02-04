import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
  }

  async addProductToCart() {
    await this.page.getByRole('button', { name: 'Add this item to cart' }).click();
  }

  async closeDialog() {
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }
}
