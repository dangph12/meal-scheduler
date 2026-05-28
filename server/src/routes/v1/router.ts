import { Hono } from 'hono';

import authRoute from '@/feature/auth/auth-route';
import userRoute from '@/feature/users/user-route';

const v1Router = new Hono();

v1Router.route('/auth', authRoute);
v1Router.route('/users', userRoute);

export default v1Router;
