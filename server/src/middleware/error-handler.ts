import { ApiResponse } from '@app/shared/api-response';
import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    const message = err.message || 'Client Error';

    if (message === 'Refresh token expired') {
      c.header(
        'Set-Cookie',
        'refreshToken=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/'
      );
    }

    return c.json(ApiResponse.failed(message, err.cause), err.status);
  }

  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message;

  console.error(err);
  return c.json(ApiResponse.error(message), 500);
};
