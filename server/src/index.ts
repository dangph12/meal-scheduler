import { ApiResponse } from '@app/shared/api-response';
import { loginRequestSchema, signUpRequestSchema } from '@app/shared/dto/auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { sign } from 'hono/jwt';

import { UserModel } from './database/models/user-model';
import { connectMongoDB } from './database/mongo';
import { errorHandler } from './error-handler';
import { PasswordUtils } from './password';
import { validator } from './validate';

const app = new Hono();

app.onError(errorHandler);

app.get('/health', c => {
  return c.json({ status: 'ok' });
});

app.post('/login', validator('json', loginRequestSchema), c => {
  const validated = c.req.valid('json');
  // validated is automatically typed as LoginRequest
  return c.json({ token: '...' });
});

app.post('/sign-up', validator('json', signUpRequestSchema), async c => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c, 'node');

  if (!JWT_SECRET) {
    return c.json(ApiResponse.failed('Server misconfiguration'), 500);
  }

  const validated = c.req.valid('json');

  const existingUser = await UserModel.findOne({ email: validated.email });

  if (existingUser) {
    return c.json(ApiResponse.failed('Email already exists'), 400);
  }

  const hashedPassword = await PasswordUtils.hash(validated.password);

  const user = await UserModel.create({
    ...validated,
    password: hashedPassword
  });

  const expiredInMinutes = 15;

  const accessToken = await sign(
    {
      sub: user._id.toString(),
      exp: Math.floor(Date.now() / 1000) + expiredInMinutes * 60
    },
    JWT_SECRET
  );

  return c.json(ApiResponse.success(accessToken));
});

app.notFound(c => {
  return c.json(ApiResponse.failed('Not Found'), 404);
});

const bootstrap = async () => {
  try {
    await connectMongoDB();
    serve(
      {
        fetch: app.fetch,
        port: 5000
      },
      info => {
        console.warn(`Server is running on http://localhost:${info.port}`);
      }
    );
  } catch (error) {
    console.error('Failed to bootstrap server', error);
    process.exit(1);
  }
};

void bootstrap();
