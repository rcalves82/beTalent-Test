import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { AuthRequest } from '../types/auth.types';

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  authenticate(credentials: AuthRequest): Promise<APIResponse> {
    return this.request.post('/auth', { data: credentials });
  }
}
