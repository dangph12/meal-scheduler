import { ApiResponse } from '@app/shared/api-response';
import { CreateUserRequest } from '@app/shared/dto/user';
import type { Context } from 'hono';
import { env } from 'hono/adapter';

import { UserService } from './user-service';

export const UserController = {
  async onboardUser(c: Context, data: CreateUserRequest) {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c, 'node');

    if (!JWT_SECRET) {
      return c.json(ApiResponse.error('Server misconfiguration'), 500);
    }

    const accessToken = await UserService.onboardUser(data, JWT_SECRET);
    return c.json(ApiResponse.success('Sign up successfully', { accessToken }));
  }
};
