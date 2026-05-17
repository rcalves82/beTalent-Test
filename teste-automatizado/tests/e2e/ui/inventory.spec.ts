import { test, expect } from '../../../fixtures/test-fixtures';
import {
  saucedemoPassword,
  saucedemoSortOptions,
  saucedemoUsers,
} from '../../../data/saucedemo.data';

test.describe('Inventário de produtos', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login(saucedemoUsers.standard, saucedemoPassword);
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });

  test('Ordenação A-Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(saucedemoSortOptions.nameAsc);

    const productNames = await inventoryPage.getProductNames();
    const expectedOrder = [...productNames].sort((a, b) =>
      a.localeCompare(b),
    );

    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames).toEqual(expectedOrder);
  });

  test('Ordenação Z-A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(saucedemoSortOptions.nameDesc);

    const productNames = await inventoryPage.getProductNames();
    const expectedOrder = [...productNames].sort((a, b) =>
      b.localeCompare(a),
    );

    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames).toEqual(expectedOrder);
  });

  test('Preço decrescente', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy(saucedemoSortOptions.priceLowHigh);

    const productPrices = await inventoryPage.getProductPrices();
    const expectedOrder = [...productPrices].sort((a, b) => a - b);

    expect(productPrices.length).toBeGreaterThan(0);
    expect(productPrices).toEqual(expectedOrder);
  });

});
