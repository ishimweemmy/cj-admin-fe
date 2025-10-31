export type TDashboardStats = {
  customers: {
    total: number
  }
  loans: {
    pending: number
    active: number
    defaulted: number
    totalDisbursed: number
    totalOutstanding: number
  }
  transactions: {
    last30Days: {
      count: number
      totalAmount: number
    }
  }
  credit: {
    totalCreditLimit: number
    totalAvailableCredit: number
    totalOutstandingBalance: number
    utilizationRate: string
  }
  recentActivity: {
    loanApplications: Array<{
      date: string
      count: string
    }>
  }
}
