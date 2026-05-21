import type { LoginRequest } from '@app/shared/dto/auth';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';

import { UserModel } from '@/database/models/user';
import { PasswordUtils } from '@/util/password';

export const AuthService = {
  async login(data: LoginRequest, jwtSecret: string) {
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
      throw new HTTPException(400, {
        message: 'Email hoặc mật khẩu không hợp lệ'
      });
    }

    const isPasswordValid = await PasswordUtils.verify(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HTTPException(400, {
        message: 'Email hoặc mật khẩu không hợp lệ'
      });
    }
    const expiredInMinutes = 15;

    const accessToken = await sign(
      {
        sub: user._id.toString(),
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + expiredInMinutes * 60
      },
      jwtSecret
    );

    return accessToken;
  }
};
