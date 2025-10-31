/**
 * Financial enums synced with backend customer-service
 */

// Account Tier (from backend: savings/enums/account-tier.enum.ts)
export enum EAccountTier {
  BASIC = 'BASIC',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

// Savings Account Type (from backend: savings/enums/savings-account-type.enum.ts)
export enum ESavingsAccountType {
  REGULAR = 'REGULAR',
  PREMIUM = 'PREMIUM',
}

// Account Status (from backend: savings/enums/account-status.enum.ts)
export enum EAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
}

// Loan Status (from backend: loan/enums/loan-status.enum.ts)
export enum ELoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DISBURSED = 'DISBURSED',
  ACTIVE = 'ACTIVE',
  FULLY_PAID = 'FULLY_PAID',
  DEFAULTED = 'DEFAULTED',
  REJECTED = 'REJECTED',
}

// Approval Status (from backend: loan/enums/approval-status.enum.ts)
export enum EApprovalStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  AUTO_APPROVED = 'AUTO_APPROVED',
  MANUAL_APPROVED = 'MANUAL_APPROVED',
  REJECTED = 'REJECTED',
}

// Repayment Status (from backend: loan/enums/repayment-status.enum.ts)
export enum ERepaymentStatus {
  SCHEDULED = 'SCHEDULED',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
}

// Transaction Type (from backend: transaction/enums/transaction-type.enum.ts)
export enum ETransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  LOAN_DISBURSEMENT = 'LOAN_DISBURSEMENT',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  INTEREST_CREDIT = 'INTEREST_CREDIT',
  FEE_CHARGE = 'FEE_CHARGE',
  LATE_FEE_CHARGE = 'LATE_FEE_CHARGE',
}

// Transaction Status (from backend: transaction/enums/transaction-status.enum.ts)
export enum ETransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
}
