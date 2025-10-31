import { api } from '@/plugins/axios'
import { handleApiCall } from '@/lib/utils'
import type { PaginatedResponse } from '@/types/pagination.type'
import type { TTransactionAdmin, TQueryTransactionsDto } from './index.dto'

export const getTransactions = async (query?: TQueryTransactionsDto) => {
  return handleApiCall(async () => {
    const response = await api.get<PaginatedResponse<TTransactionAdmin>>('/admin/transactions', {
      params: query,
    })
    return response.data
  })
}

export const getTransaction = async (id: string) => {
  return handleApiCall(async () => {
    const response = await api.get<TTransactionAdmin>(`/admin/transactions/${id}`)
    return response.data
  })
}
