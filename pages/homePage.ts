import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateHome() {
    await this.goto();
  }

  async verifyHomePageTitle() {
    await expect(this.page).toHaveTitle(/Home - SHOP/);
  }

  async selectMensOuterwear() {
    await this.page.locator('#tabContainer').getByRole('link', { name: 'Men\'s Outerwear' }).click();
  }

  async selectLadiesOuterwear() {
    await this.page.getByRole('link', { name: 'Ladies Outerwear' }).first().click();
  }

  async selectMensTShirts() {
    await this.page.getByRole('link', { name: 'Men\'s T-Shirts' }).first().click();
  }

  async openShoppingCart() {
    await this.page.getByRole('button', { name: 'Shopping cart: 0 items' }).click();
  }

  async verifyEmptyCartMessage() {
    await expect(this.page.getByRole('paragraph')).toContainText('Your is empty.');
  }

  async getPageLinks() {
    const links = await this.page.locator('a').all();
    return links;
  }

  async verifyAllLinks(request: any) {
    const links = await this.getPageLinks();

    for (const link of links) {
      const href = await link.getAttribute('href');
      const url = new URL(href!, this.page.url()).href;
      const response = await request.get(url);
      console.log(`${response.status()} url is -> ${url}`);
      expect(response.status(), `Broken link: ${url}`).toBeLessThan(400);
    }
  }
}
