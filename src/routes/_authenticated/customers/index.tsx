import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Customers } from '@/features/customers'

const customersSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(
      z.union([
        z.literal('NOT_VERIFIED'),
        z.literal('ACTIVE'),
        z.literal('INACTIVE'),
        z.literal('SUSPENDED'),
      ])
    )
    .optional()
    .catch([]),
  kycStatus: z
    .array(
      z.union([
        z.literal('PENDING'),
        z.literal('VERIFIED'),
        z.literal('REJECTED'),
      ])
    )
    .optional()
    .catch([]),
  search: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/customers/')({
  validateSearch: customersSearchSchema,
  component: Customers,
})
