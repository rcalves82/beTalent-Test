import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly sortContainer: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.sortContainer = page.getByTestId('product-sort-container');
    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
  }

  async expectLoaded(): Promise<void> {
    await this.title.waitFor({ state: 'visible' });
  }

  async sortBy(value: string): Promise<void> {
    await this.sortContainer.selectOption(value);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();

    return prices.map((price) => Number(price.replace('$', '')));
  }

  addToCartButton(productSlug: string): Locator {
    return this.page.getByTestId(`add-to-cart-${productSlug}`);
  }

  async addProductToCart(productSlug: string): Promise<void> {
    await this.addToCartButton(productSlug).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
