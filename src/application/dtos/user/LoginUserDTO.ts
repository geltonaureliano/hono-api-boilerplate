import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;