import { createUserSchema } from '@app/shared/dto/user';
import { Hono } from 'hono';

import { validator } from '@/middleware/validate';

import { UserController } from './user-controller';

const userRoute = new Hono();

userRoute.post('/onboard', validator('json', createUserSchema), c =>
  UserController.onboardUser(c, c.req.valid('json'))
);

export default userRoute;
