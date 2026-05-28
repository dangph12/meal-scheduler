import { onboardSchema, userProfileSchema } from '@app/shared/dto/user';
import { Hono } from 'hono';

import { validator } from '@/middleware/validate';

import { UserController } from './user-controller';

const userRoute = new Hono();

userRoute.post('/onboard/preview', validator('json', userProfileSchema), c =>
  UserController.previewCaloriesIntake(c, c.req.valid('json'))
);

userRoute.post('/onboard', validator('json', onboardSchema), c =>
  UserController.onboardUser(c, c.req.valid('json'))
);

export default userRoute;
