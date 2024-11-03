import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  phone: z.string().optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;