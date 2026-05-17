import { test, expect } from '@playwright/test';
import { AuthClient } from '../../../clients/AuthClient';
import { invalidAuthCredentials } from '../../../data/auth.data';
import { getAuthToken } from '../../../helpers/auth.helper';
import type { AuthErrorResponse } from '../../../types/auth.types';

test.describe('Autenticação', () => {
  test('Gerar token com sucesso', async ({ request }) => {
    const token = await getAuthToken(request);

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  test('Login inválido', async ({ request }) => {
    const authClient = new AuthClient(request);

    const response = await authClient.authenticate(invalidAuthCredentials);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as AuthErrorResponse;
    expect(body.reason).toBe('Bad credentials');
    expect(body).not.toHaveProperty('token');
  });
});
