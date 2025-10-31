/**
 * Financial constants from backend customer-service
 * All values synced with backend business logic
 */

// Account Tier Limits (from backend: savings/constants/tier.constants.ts)
export const TIER_LIMITS = {
  BASIC: {
    dailyWithdrawal: 50000,
    monthlyWithdrawal: 500000,
    dailyDeposit: 100000,
    interestRate: 5.0,
  },
  SILVER: {
    dailyWithdrawal: 200000,
    monthlyWithdrawal: 2000000,
    dailyDeposit: 500000,
    interestRate: 5.5,
  },
  GOLD: {
    dailyWithdrawal: 1000000,
    monthlyWithdrawal: 10000000,
    dailyDeposit: 2000000,
    interestRate: 6.0,
  },
  PLATINUM: {
    dailyWithdrawal: 5000000,
    monthlyWithdrawal: 50000000,
    dailyDeposit: 10000000,
    interestRate: 7.0,
  },
} as const

// Loan Interest Rates by Tenor in Months (from backend: loan.service.ts)
export const LOAN_INTEREST_RATES = {
  3: 5.0, // 3 months: 5%
  6: 8.0, // 6 months: 8%
  12: 12.0, // 12 months: 12%
  24: 18.0, // 24 months: 18%
} as const

export const LOAN_TENOR_OPTIONS = [3, 6, 12, 24] as const

// Customer Defaults (from backend: user/constants/customer.constants.ts)
export const CUSTOMER_DEFAULTS = {
  INITIAL_CREDIT_SCORE: 300,
  INITIAL_CREDIT_LIMIT: 50000,
  MIN_CREDIT_SCORE: 200,
  MAX_CREDIT_SCORE: 850,
} as const

// Credit Score Ranges (from backend: user/constants/customer.constants.ts)
export const CREDIT_SCORE_RANGES = {
  POOR: { min: 200, max: 299, label: 'Poor', color: 'destructive' },
  FAIR: { min: 300, max: 499, label: 'Fair', color: 'secondary' },
  GOOD: { min: 500, max: 699, label: 'Good', color: 'default' },
  EXCELLENT: { min: 700, max: 850, label: 'Excellent', color: 'default' },
} as const

// Loan Approval Thresholds (from backend: loan.service.ts)
export const AUTO_APPROVAL_THRESHOLD = 50000 // RWF
export const MIN_CREDIT_SCORE_AUTO = 300
export const MIN_CREDIT_SCORE_REJECT = 200

// Currency
export const CURRENCY = 'RWF' as const
