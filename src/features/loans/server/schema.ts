import { z } from 'zod'

export const loanRequestSchema = z.object({
  principalAmount: z.number().min(1000, 'Minimum loan amount is 1,000 RWF'),
  tenorMonths: z.union([z.literal(3), z.literal(6), z.literal(12), z.literal(24)]),
  purpose: z.string().max(500, 'Purpose must be less than 500 characters').optional(),
  savingsAccountId: z.string().optional(),
})

export const repayLoanSchema = z.object({
  loanId: z.string().min(1, 'Loan ID is required'),
  amount: z.number().min(1, 'Amount must be at least 1 RWF'),
  savingsAccountId: z.string().optional(),
})
