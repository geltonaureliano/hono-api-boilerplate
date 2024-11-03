import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    c.set('userId', (decoded as any).userId);
    await next();
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401);
  }
};