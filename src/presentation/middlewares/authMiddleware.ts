import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (c: Context, next: Next) => {
  const { authorization } = c.req.header()

  if (!authorization) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    c.set('userId', (decoded as any).userId);

    await next();
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401);
  }
};