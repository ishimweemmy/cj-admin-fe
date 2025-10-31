import { api } from '@/plugins/axios'
import { handleApiCall } from '@/lib/utils'
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

export const getCustomers = async (query?: TQueryCustomersDto) => {
  return handleApiCall(async () => {
    const response = await api.get<PaginatedResponse<TCustomer>>('/admin/customers', { params: query })
    return response.data
  })
}

export const getCustomer = async (customerId: string) => {
  return handleApiCall(async () => {
    const response = await api.get<TCustomerDetailed>(`/admin/customers/${customerId}`)
    return response.data
  })
}

export const suspendCustomer = async (customerId: string, payload: TSuspendCustomerDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<TCustomerActionResponseDto>(
      `/admin/customers/${customerId}/suspend`,
      payload
    )
    return response.data
  })
}

export const unsuspendCustomer = async (customerId: string, payload: TUnsuspendCustomerDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<TCustomerActionResponseDto>(
      `/admin/customers/${customerId}/unsuspend`,
      payload
    )
    return response.data
  })
}

export const updateCreditLimit = async (customerId: string, payload: TUpdateCreditLimitDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<TCustomerActionResponseDto>(
      `/admin/customers/${customerId}/credit-limit`,
      payload
    )
    return response.data
  })
}

export const updateCreditScore = async (customerId: string, payload: TUpdateCreditScoreDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<TCustomerActionResponseDto>(
      `/admin/customers/${customerId}/credit-score`,
      payload
    )
    return response.data
  })
}
