import { useQuery } from '@tanstack/react-query'
import type { ApiHandlerErrorResponseDto } from '@/types/auth.type'
import type { PaginatedResponse } from '@/types/pagination.type'
import type { TTransactionAdmin, TQueryTransactionsDto } from './index.dto'
import { getTransactions, getTransaction } from '.'

export const useGetTransactions = (query?: TQueryTransactionsDto) => {
  return useQuery<PaginatedResponse<TTransactionAdmin>, ApiHandlerErrorResponseDto>({
    queryKey: ['transactions', query],
    queryFn: () => getTransactions(query),
  })
}

export const useGetTransaction = (id: string) => {
  return useQuery<TTransactionAdmin, ApiHandlerErrorResponseDto>({
    queryKey: ['transaction', id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  })
}
