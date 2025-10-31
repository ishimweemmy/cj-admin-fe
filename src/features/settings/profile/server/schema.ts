import { z } from 'zod'

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional().or(z.literal('')),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional().or(z.literal('')),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters').optional().or(z.literal('')),
})
