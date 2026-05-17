import { test, expect } from '../../../fixtures/test-fixtures';
import {
  saucedemoCheckoutInfo,
  saucedemoCheckoutSummary,
  saucedemoOrderComplete,
  saucedemoPassword,
  saucedemoProducts,
  saucedemoUsers,
} from '../../../data/saucedemo.data';

test.describe('Carrinho de compras', () => {
  const { backpack, bikeLight } = saucedemoProducts;

  test.beforeEach(async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login(saucedemoUsers.standard, saucedemoPassword);
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });

  test('Fluxo completo de compra', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addProductToCart(backpack.slug);

    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cartPage.expectLoaded();

    const cartItem = cartPage.cartItemByName(backpack.name);
    await expect(cartItem).toBeVisible();
    await expect(cartItem.getByTestId('item-quantity')).toHaveText(
      backpack.quantity,
    );
    await expect(cartItem.getByTestId('inventory-item-name')).toHaveText(
      backpack.name,
    );
    await expect(cartItem.getByTestId('inventory-item-desc')).toHaveText(
      backpack.description,
    );
    await expect(cartItem.getByTestId('inventory-item-price')).toHaveText(
      backpack.price,
    );

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await checkoutPage.fillCustomerInfo(saucedemoCheckoutInfo);
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.summaryContainer).toBeVisible();

    const summaryItem = checkoutPage.cartItemByName(backpack.name);
    await expect(summaryItem).toBeVisible();
    await expect(summaryItem.getByTestId('item-quantity')).toHaveText(
      backpack.quantity,
    );
    await expect(summaryItem.getByTestId('inventory-item-name')).toHaveText(
      backpack.name,
    );
    await expect(summaryItem.getByTestId('inventory-item-desc')).toHaveText(
      backpack.description,
    );
    await expect(summaryItem.getByTestId('inventory-item-price')).toHaveText(
      backpack.price,
    );

    await expect(page.getByTestId('payment-info-value')).toHaveText(
      saucedemoCheckoutSummary.paymentInfo,
    );
    await expect(page.getByTestId('shipping-info-value')).toHaveText(
      saucedemoCheckoutSummary.shippingInfo,
    );
    await expect(page.getByTestId('subtotal-label')).toHaveText(
      saucedemoCheckoutSummary.subtotal,
    );
    await expect(page.getByTestId('tax-label')).toHaveText(
      saucedemoCheckoutSummary.tax,
    );
    await expect(page.getByTestId('total-label')).toHaveText(
      saucedemoCheckoutSummary.total,
    );

    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/checkout-complete\.html/);

    await checkoutCompletePage.expectLoaded();
    await expect(checkoutCompletePage.header).toHaveText(
      saucedemoOrderComplete.header,
    );
    await expect(checkoutCompletePage.message).toHaveText(
      saucedemoOrderComplete.message,
    );
  });

  test('Remover item no carrinho', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart(bikeLight.slug);

    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cartPage.expectLoaded();

    const cartItem = cartPage.cartItemByName(bikeLight.name);
    await expect(cartItem).toBeVisible();

    await cartPage.removeProduct(bikeLight.slug);

    await expect(cartPage.cartContentsContainer).toBeVisible();
    await expect(cartPage.removedCartItem).toHaveCount(1);
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartItem).toHaveCount(0);
    await expect(cartPage.removeButton(bikeLight.slug)).toHaveCount(0);
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
  });
});
