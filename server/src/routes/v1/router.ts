import { Hono } from 'hono';

import authRoute from '@/feature/auth/auth-route';

const v1Router = new Hono();

v1Router.route('/auth', authRoute);

export default v1Router;
