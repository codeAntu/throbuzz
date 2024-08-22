import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(30, 'Name must be at most 30 characters long'),
  email: z.string().email('Email must be a valid email address'),
  userName: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .regex(/^[a-zA-Z0-9_]*$/, 'Username must not contain special characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password must be at most 30 characters long'),
})
