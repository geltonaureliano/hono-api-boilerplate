import { Context, Next } from 'hono';
import logger from '../../infrastructure/logger/logger';

export const errorMiddleware = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    logger.error({
      message: (err as Error).message,
      stack: (err as Error).stack,
    });
    c.status(500);
    c.json({ message: 'Internal Server Error' });
  }
};