/**
 * Formatting utilities for financial data
 */

import { format as formatDateFn } from 'date-fns'
import {
  CREDIT_SCORE_RANGES,
  CURRENCY,
  LOAN_INTEREST_RATES,
} from '@/lib/constants/financial.constants'
import {
  EAccountStatus,
  ELoanStatus,
  ETransactionStatus,
  ERepaymentStatus,
  EApprovalStatus,
} from '@/enums/financial.enum'

/**
 * Format amount as RWF currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Get credit score rating and color
 */
export const getCreditScoreRating = (score: number) => {
  if (score >= CREDIT_SCORE_RANGES.EXCELLENT.min)
    return CREDIT_SCORE_RANGES.EXCELLENT
  if (score >= CREDIT_SCORE_RANGES.GOOD.min) return CREDIT_SCORE_RANGES.GOOD
  if (score >= CREDIT_SCORE_RANGES.FAIR.min) return CREDIT_SCORE_RANGES.FAIR
  return CREDIT_SCORE_RANGES.POOR
}

/**
 * Get badge variant for status enums
 */
export const getStatusBadgeVariant = (
  status:
    | EAccountStatus
    | ELoanStatus
    | ETransactionStatus
    | ERepaymentStatus
    | EApprovalStatus
    | string,
):
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning' => {
  const statusVariants: Record<string, any> = {
    // Account statuses
    [EAccountStatus.ACTIVE]: 'default',
    [EAccountStatus.INACTIVE]: 'secondary',
    [EAccountStatus.FROZEN]: 'warning',
    [EAccountStatus.CLOSED]: 'outline',

    // Loan statuses
    [ELoanStatus.PENDING]: 'secondary',
    [ELoanStatus.APPROVED]: 'success',
    [ELoanStatus.DISBURSED]: 'default',
    [ELoanStatus.ACTIVE]: 'default',
    [ELoanStatus.FULLY_PAID]: 'success',
    [ELoanStatus.DEFAULTED]: 'destructive',
    [ELoanStatus.REJECTED]: 'destructive',

    // Approval statuses
    [EApprovalStatus.PENDING_REVIEW]: 'secondary',
    [EApprovalStatus.AUTO_APPROVED]: 'success',
    [EApprovalStatus.MANUAL_APPROVED]: 'success',
    [EApprovalStatus.REJECTED]: 'destructive',

    // Transaction statuses
    [ETransactionStatus.PENDING]: 'secondary',
    [ETransactionStatus.COMPLETED]: 'default',
    [ETransactionStatus.FAILED]: 'destructive',
    [ETransactionStatus.REVERSED]: 'warning',

    // Repayment statuses
    [ERepaymentStatus.SCHEDULED]: 'secondary',
    [ERepaymentStatus.PAID]: 'success',
    [ERepaymentStatus.OVERDUE]: 'destructive',
    [ERepaymentStatus.PARTIALLY_PAID]: 'warning',
  }

  return statusVariants[status] || 'outline'
}

/**
 * Format date
 */
export const formatDate = (
  date: string | Date,
  formatStr: string = 'PPP',
): string => {
  return formatDateFn(new Date(date), formatStr)
}

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDateFn(new Date(date), 'PPP p')
}

/**
 * Calculate loan total amount and monthly installment
 */
export const calculateLoanTotal = (
  principalAmount: number,
  tenorMonths: keyof typeof LOAN_INTEREST_RATES,
) => {
  const interestRate = LOAN_INTEREST_RATES[tenorMonths]
  const totalAmount = principalAmount * (1 + interestRate / 100)
  const monthlyInstallment = totalAmount / tenorMonths

  return {
    interestRate,
    totalAmount,
    monthlyInstallment,
    interestAmount: totalAmount - principalAmount,
  }
}

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

/**
 * Calculate percentage
 */
export const calculatePercentage = (
  value: number,
  total: number,
): number => {
  if (total === 0) return 0
  return (value / total) * 100
}
