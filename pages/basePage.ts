import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL = 'https://shop.polymer-project.org/';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '') {
    await this.page.goto(this.baseURL + path);
  }
}
