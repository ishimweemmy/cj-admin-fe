import type { ELoanStatus, EApprovalStatus } from '@/enums/financial.enum'
import type { Loan, RepaymentSchedule } from '@/types/financial.type'
import type { TCustomer } from '@/features/customers/server/index.dto'

// Admin-specific loan response with customer info
export type TLoan = Loan & {
  user: TCustomer
}

// Query params for fetching loans
export type TQueryLoansDto = {
  page?: number
  limit?: number
  status?: ELoanStatus
  approvalStatus?: EApprovalStatus
}

// Approve loan
export type TApproveLoanDto = {
  notes?: string
}

// Reject loan
export type TRejectLoanDto = {
  reason: string
  notes?: string
}

// Disburse loan
export type TDisburseLoanDto = {
  notes?: string
}

// Action response
export type TLoanActionResponseDto = {
  success: boolean
  message: string
  loan: TLoan
}

export type RepaymentScheduleResponseDto = RepaymentSchedule
