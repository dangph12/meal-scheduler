import { ApiResponse } from '@app/shared/api-response';
import { OnboardRequest, UserProfileRequest } from '@app/shared/dto/user';
import type { Context } from 'hono';
import { env } from 'hono/adapter';

import { UserService } from './user-service';

export const UserController = {
  async previewCaloriesIntake(c: Context, data: UserProfileRequest) {
    const result = await UserService.previewCaloriesIntake(data);
    return c.json(ApiResponse.success('Tính toán calories thành công', result));
  },

  async onboardUser(c: Context, data: OnboardRequest) {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c, 'node');

    if (!JWT_SECRET) {
      return c.json(
        ApiResponse.error('Server chưa gán giá trị JWT_SECRET'),
        500
      );
    }

    const accessToken = await UserService.onboardUser(data, JWT_SECRET);
    return c.json(ApiResponse.success('Đăng ký thành công', { accessToken }));
  }
};
