import { ApiResponse } from '@app/shared/api-response';
import { loginRequestSchema } from '@app/shared/dto/auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { errorHandler } from './error-handler';
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

app.notFound(c => {
  return c.json(ApiResponse.failed('Not Found'), 404);
});

serve(
  {
    fetch: app.fetch,
    port: 5000
  },
  info => {
    console.warn(`Server is running on http://localhost:${info.port}`);
  }
);
