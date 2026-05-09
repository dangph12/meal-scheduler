import { ApiResponse } from '@app/shared/api-response';
import type { LoginRequest, SignUpRequest } from '@app/shared/dto/auth';
import type { Context } from 'hono';
import { env } from 'hono/adapter';

import { AuthService } from './auth-service';

export class AuthController {
  static async login(c: Context, data: LoginRequest) {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c, 'node');

    if (!JWT_SECRET) {
      return c.json(ApiResponse.error('Server misconfiguration'), 500);
    }

    const accessToken = await AuthService.login(data, JWT_SECRET);

    return c.json(ApiResponse.success(accessToken));
  }

  static async signUp(c: Context, data: SignUpRequest) {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c, 'node');

    if (!JWT_SECRET) {
      return c.json(ApiResponse.error('Server misconfiguration'), 500);
    }

    const accessToken = await AuthService.signUp(data, JWT_SECRET);
    return c.json(ApiResponse.success(accessToken));
  }
}
