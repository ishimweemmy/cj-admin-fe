import { z } from 'zod'

const customerStatusSchema = z.union([
  z.literal('NOT_VERIFIED'),
  z.literal('ACTIVE'),
  z.literal('INACTIVE'),
  z.literal('SUSPENDED'),
])
export type CustomerStatus = z.infer<typeof customerStatusSchema>

const kycStatusSchema = z.union([
  z.literal('PENDING'),
  z.literal('VERIFIED'),
  z.literal('REJECTED'),
])
export type KYCStatus = z.infer<typeof kycStatusSchema>

const customerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  status: customerStatusSchema,
  role: z.literal('CUSTOMER'),
  creditScore: z.number(),
  kycStatus: kycStatusSchema,
  creditAccountId: z.string().optional(),
  creditLimit: z.number().optional(),
  availableCredit: z.number().optional(),
  usedCredit: z.number().optional(),
  totalLoans: z.number(),
  activeLoans: z.number(),
  defaultedLoans: z.number(),
  fullyPaidLoans: z.number(),
  totalSavingsAccounts: z.number(),
  totalSavingsBalance: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Customer = z.infer<typeof customerSchema>

export const customerListSchema = z.array(customerSchema)
