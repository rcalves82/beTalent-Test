import { test, expect } from '../../../fixtures/test-fixtures';
import { saucedemoPassword, saucedemoUsers } from '../../../data/saucedemo.data';
import type { InventoryPage } from '../../../pages/InventoryPage';
import type { LoginPage } from '../../../pages/LoginPage';
import type { Page } from '@playwright/test';

async function expectSuccessfulLogin(
  loginPage: LoginPage,
  inventoryPage: InventoryPage,
  page: Page,
  username: string,
  options?: { loginTimeout?: number },
): Promise<void> {
  await loginPage.login(username, saucedemoPassword);

  await expect(page).toHaveURL(/inventory\.html/, {
    timeout: options?.loginTimeout ?? 5_000,
  });
  await inventoryPage.expectLoaded();
  await expect(inventoryPage.title).toHaveText('Products');
}

test.describe('Login - Swag Labs', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Login válido com sucesso', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await expectSuccessfulLogin(
      loginPage,
      inventoryPage,
      page,
      saucedemoUsers.standard,
    );
  });


  test('Usuário bloqueado', async ({ loginPage }) => {
    await loginPage.login(saucedemoUsers.lockedOut, saucedemoPassword);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out.',
    );
  });

  test('Credenciais inválidas', async ({ loginPage }) => {
    await loginPage.login(saucedemoUsers.standard, 'senha_incorreta');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match',
    );
  });
});
