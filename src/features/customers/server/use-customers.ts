import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ApiHandlerErrorResponseDto } from '@/types/auth.type'
import type { PaginatedResponse } from '@/types/pagination.type'
import type {
  TCustomer,
  TCustomerDetailed,
  TQueryCustomersDto,
  TSuspendCustomerDto,
  TUnsuspendCustomerDto,
  TUpdateCreditLimitDto,
  TUpdateCreditScoreDto,
  TCustomerActionResponseDto,
} from './index.dto'
import {
  getCustomers,
  getCustomer,
  suspendCustomer,
  unsuspendCustomer,
  updateCreditLimit,
  updateCreditScore,
} from '.'

export const useGetCustomers = (query?: TQueryCustomersDto) => {
  return useQuery<PaginatedResponse<TCustomer>, ApiHandlerErrorResponseDto>({
    queryKey: ['customers', query],
    queryFn: () => getCustomers(query),
  })
}

export const useGetCustomer = (customerId: string) => {
  return useQuery<TCustomerDetailed, ApiHandlerErrorResponseDto>({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomer(customerId),
    enabled: !!customerId,
  })
}

export const useSuspendCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TCustomerActionResponseDto,
    ApiHandlerErrorResponseDto,
    { customerId: string; payload: TSuspendCustomerDto }
  >({
    mutationFn: ({ customerId, payload }) => suspendCustomer(customerId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customer', data.customer.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Customer suspended successfully')
    },
    onError: (error) => {
      toast.error(error.meta?.response?.data?.message || 'Failed to suspend customer')
    },
  })
}

export const useUnsuspendCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TCustomerActionResponseDto,
    ApiHandlerErrorResponseDto,
    { customerId: string; payload: TUnsuspendCustomerDto }
  >({
    mutationFn: ({ customerId, payload }) => unsuspendCustomer(customerId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customer', data.customer.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Customer unsuspended successfully')
    },
    onError: (error) => {
      toast.error(error.meta?.response?.data?.message || 'Failed to unsuspend customer')
    },
  })
}

export const useUpdateCreditLimit = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TCustomerActionResponseDto,
    ApiHandlerErrorResponseDto,
    { customerId: string; payload: TUpdateCreditLimitDto }
  >({
    mutationFn: ({ customerId, payload }) => updateCreditLimit(customerId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customer', data.customer.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Credit limit updated successfully')
    },
    onError: (error) => {
      toast.error(error.meta?.response?.data?.message || 'Failed to update credit limit')
    },
  })
}

export const useUpdateCreditScore = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TCustomerActionResponseDto,
    ApiHandlerErrorResponseDto,
    { customerId: string; payload: TUpdateCreditScoreDto }
  >({
    mutationFn: ({ customerId, payload }) => updateCreditScore(customerId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customer', data.customer.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Credit score updated successfully')
    },
    onError: (error) => {
      toast.error(error.meta?.response?.data?.message || 'Failed to update credit score')
    },
  })
}
