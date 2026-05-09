import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
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

      throw new HTTPException(400, { message: readableError.message });
    }
  });
