import { ApiResponse } from '@app/shared/api-response';
import type { LoginRequest } from '@app/shared/dto/auth';
import type { Context } from 'hono';
import { env } from 'hono/adapter';

import { AuthService } from './auth-service';

export class AuthController {
  static async login(c: Context, data: LoginRequest) {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c, 'node');

    if (!JWT_SECRET) {
      return c.json(
        ApiResponse.error('Server chưa gán giá trị JWT_SECRET'),
        500
      );
    }

    const accessToken = await AuthService.login(data, JWT_SECRET);

    return c.json(ApiResponse.success('Đăng nhập thành công', { accessToken }));
  }
}
