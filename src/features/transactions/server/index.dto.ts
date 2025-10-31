import type { Transaction } from '@/types/financial.type'
import type { ETransactionType, ETransactionStatus } from '@/enums/financial.enum'

export type TQueryTransactionsDto = {
  type?: ETransactionType
  status?: ETransactionStatus
  startDate?: string
  endDate?: string
  customerId?: string
  search?: string
  savingsAccountId?: string
  page?: number
  limit?: number
}

export type TTransactionAdmin = Transaction & {
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  savingsAccountId?: string
  savingsAccountNumber?: string
}
