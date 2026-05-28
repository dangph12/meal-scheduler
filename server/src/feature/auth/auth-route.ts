import { loginRequestSchema } from '@app/shared/dto/auth';
import { Hono } from 'hono';

import { validator } from '@/middleware/validate';

import { AuthController } from './auth-controller';

const authRoute = new Hono();

authRoute.post('/login', validator('json', loginRequestSchema), c =>
  AuthController.login(c, c.req.valid('json'))
);

export default authRoute;
