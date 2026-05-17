import type { AuthRequest } from '../types/auth.types';

export const authCredentials: AuthRequest = {
  username: 'admin',
  password: 'password123',
};

export const invalidAuthCredentials: AuthRequest = {
  username: 'user_erro',
  password: '12345',
};
