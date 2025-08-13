import { z } from 'zod';

export const User = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  user_type: z.number().refine(val => [1, 2].includes(val), { message: 'Must be 1 or 2' }),
  service_type: z.number().refine(val => [1, 2].includes(val), { message: 'Must be 1 or 2' }),
  enabled: z.boolean(),
  roles: z.string().array(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const RegisterUserBody = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  user_type: z.number().refine(val => [1, 2].includes(val), { message: 'Must be 1 or 2' }),
  service_type: z.number().refine(val => [1, 2].includes(val), { message: 'Must be 1 or 2' }),
});

export const VerifyUserEmailBody = z.object({
  token: z.string(),
});

export const UpdateUserBody = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  user_type: z
    .number()
    .optional()
    .refine(val => [1, 2].includes(val), { message: 'Must be 1 or 2' }),
  service_type: z
    .number()
    .optional()
    .refine(val => [1, 2].includes(val), { message: 'Must be 1 or 2' }),
  enabled: z.boolean().optional(),
});

export const LoginUserBody = z.object({
  email: z.string(),
  password: z.string().min(8).max(20),
});
