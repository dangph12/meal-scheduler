import type { LoginRequest, SignUpRequest } from '@app/shared/dto/auth';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';

import { UserModel } from '@/database/models/user';
import { PasswordUtils } from '@/util/password';

export class AuthService {
  static async login(data: LoginRequest, jwtSecret: string) {
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
      throw new HTTPException(400, { message: 'Invalid email or password' });
    }

    const isPasswordValid = await PasswordUtils.verify(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HTTPException(400, { message: 'Invalid email or password' });
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

  static async signUp(data: SignUpRequest, jwtSecret: string) {
    const hashedPassword = await PasswordUtils.hash(data.password);

    let user;
    try {
      user = await UserModel.create({
        ...data,
        password: hashedPassword
      });
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err && err.code === 11000) {
        throw new HTTPException(409, { message: 'Email already exists' });
      }
      throw err;
    }

    const expiredInMinutes = 15;

    const accessToken = await sign(
      {
        sub: user._id.toString(),
        exp: Math.floor(Date.now() / 1000) + expiredInMinutes * 60
      },
      jwtSecret
    );

    return accessToken;
  }
}
