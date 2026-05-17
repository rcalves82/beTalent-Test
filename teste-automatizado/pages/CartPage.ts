import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly cartContentsContainer: Locator;
  readonly removedCartItem: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartItems = page.getByTestId('inventory-item');
    this.cartContentsContainer = page.getByTestId('cart-contents-container');
    this.removedCartItem = page.locator('.removed_cart_item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async expectLoaded(): Promise<void> {
    await this.title.waitFor({ state: 'visible' });
  }

  cartItemByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  removeButton(productSlug: string): Locator {
    return this.page.getByTestId(`remove-${productSlug}`);
  }

  async removeProduct(productSlug: string): Promise<void> {
    await this.removeButton(productSlug).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
