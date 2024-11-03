import { Context, Next } from 'hono';
import logger from '../../infrastructure/logger/logger';

export const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  logger.info({
    method: c.req.method,
    url: c.req.url,
    status: c.res.status,
    duration: `${duration}ms`,
  });
};