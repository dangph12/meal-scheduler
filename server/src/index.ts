import { ApiResponse } from '@app/shared/api-response';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { connectMongoDB } from '@/database/mongo';
import { errorHandler } from '@/middleware/error-handler';
import v1Router from '@/routes/v1/router';

const app = new Hono();

app.onError(errorHandler);

app.get('/health', c => {
  return c.json({ status: 'ok' });
});

app.route('/v1', v1Router);

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
