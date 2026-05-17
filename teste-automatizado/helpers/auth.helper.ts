import type { APIRequestContext } from '@playwright/test';
import { AuthClient } from '../clients/AuthClient';
import { authCredentials } from '../data/auth.data';
import type { AuthResponse } from '../types/auth.types';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  const authClient = new AuthClient(request);
  const response = await authClient.authenticate(authCredentials);

  if (response.status() !== 200) {
    throw new Error(`Falha na autenticação: status ${response.status()}`);
  }

  const body = (await response.json()) as AuthResponse;

  if (!body.token) {
    throw new Error('Token não retornado na autenticação');
  }

  return body.token;
}
