import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  phone: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;