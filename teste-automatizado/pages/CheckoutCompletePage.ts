import { type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly container: Locator;
  readonly header: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('checkout-complete-container');
    this.header = page.getByTestId('complete-header');
    this.message = page.getByTestId('complete-text');
  }

  async expectLoaded(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }
}
