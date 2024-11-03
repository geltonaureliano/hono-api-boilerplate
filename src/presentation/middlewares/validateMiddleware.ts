import { Context, Next } from 'hono';
import { ZodSchema, z } from 'zod';

export const validate = (schema: ZodSchema<any>) => {
  return async (c: Context, next: Next) => {
    const body = await c.req.json();
    try {
      const result = schema.parse(body);
      c.set('validatedData', result);
      await next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.map((e) => ({ field: e.path[0], message: e.message }));
        return c.json({ errors }, 422);
      }
      throw err;
    }
  };
};