/**
 * Financial types synced with backend DTOs
 */
import type {
  EAccountStatus,
  EAccountTier,
  ESavingsAccountType,
  ELoanStatus,
  EApprovalStatus,
  ERepaymentStatus,
  ETransactionType,
  ETransactionStatus,
} from '@/enums/financial.enum'
import { LOAN_TENOR_OPTIONS } from '@/lib/constants/financial.constants'

// Loan Tenor Type - extracted from constant
export type LoanTenorMonths = (typeof LOAN_TENOR_OPTIONS)[number]

// Savings Account
export type SavingsAccount = {
  id: string
  accountNumber: string
  accountType: ESavingsAccountType
  tier: EAccountTier
  balance: number
  interestRate: number
  currency: string
  status: EAccountStatus
  lastInterestCalculationDate: Date | null
  createdAt: Date
  updatedAt: Date
}

// Credit Account
export type CreditAccount = {
  id: string
  accountNumber: string
  creditLimit: number
  availableCredit: number
  totalBorrowed: number
  totalRepaid: number
  outstandingBalance: number
  status: EAccountStatus
  createdAt: Date
  updatedAt: Date
}

// Loan
export type Loan = {
  id: string
  loanNumber: string
  principalAmount: number
  interestRate: number
  tenorMonths: number
  totalAmount: number
  outstandingAmount: number
  status: ELoanStatus
  approvalStatus: EApprovalStatus
  requestedAt: Date
  approvedAt: Date | null
  disbursedAt: Date | null
  dueDate: Date
  purpose: string | null
  savingsAccountId: string | null
  savingsAccountNumber: string | null
  createdAt: Date
  updatedAt: Date
}

// Repayment Schedule Item
export type RepaymentScheduleItem = {
  id: string
  scheduleNumber: number
  dueDate: Date
  dueAmount: number
  amountPaid: number
  status: ERepaymentStatus
  paidAt: Date | null
  lateFee: number
}

// Repayment Schedule
export type RepaymentSchedule = {
  loanNumber: string
  totalAmount: number
  outstandingAmount: number
  schedule: RepaymentScheduleItem[]
}

// Transaction
export type Transaction = {
  id: string
  transactionReference: string
  type: ETransactionType
  amount: number
  balanceBefore: number
  balanceAfter: number
  status: ETransactionStatus
  description: string
  metadata: Record<string, any> | null
  processedAt: Date | null
  createdAt: Date
}
