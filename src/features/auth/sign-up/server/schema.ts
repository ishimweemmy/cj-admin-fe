import { z } from 'zod'

export const formSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === '' ? 'Please enter your email' : undefined,
    }),
    firstName: z.string().min(3, {
      message: 'First name must be greater than 2 characters',
    }),
    lastName: z.string().min(3, {
      message: 'Last name must be greater than 2 characters',
    }),
    phoneNumber: z
      .string()
      .refine((value) => /^\+\d{1,3}\s?\d{3,14}$/.test(value), {
        message: 'Invalid phone number',
      }),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .min(7, 'Password must be at least 7 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })
