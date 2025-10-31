import type { Customer, CustomerStatus, KYCStatus } from '../data/schema'

export type TCustomer = Customer

export type TCustomerDetailed = TCustomer & {
  loans: any[]
  savingsAccounts: any[]
  recentTransactions: any[]
}

export type TQueryCustomersDto = {
  page?: number
  limit?: number
  search?: string
  status?: CustomerStatus
  kycStatus?: KYCStatus
}

export type TSuspendCustomerDto = {
  reason: string
  notes?: string
}

export type TUnsuspendCustomerDto = Pick<TSuspendCustomerDto, 'notes'>

export type TUpdateCreditLimitDto = TSuspendCustomerDto & {
  newLimit: number
}

export type TUpdateCreditScoreDto = TSuspendCustomerDto & {
  newScore: number
}

export type TCustomerActionResponseDto = {
  success: boolean
  message: string
  customer: TCustomer
}
