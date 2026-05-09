import { ApiResponse } from '@app/shared/api-response';
import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const validator = <
  T extends z.ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zValidator(target, schema, (result, c) => {
    if (!result.success) {
      const readableError = fromZodError(result.error, {
        prefix: null,
        issueSeparator: '\n'
      });

      return c.json(ApiResponse.failed(readableError.message), 400);
    }
  });
