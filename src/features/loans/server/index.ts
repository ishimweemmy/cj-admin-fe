import { api } from '@/plugins/axios'
import type { PaginatedResponse } from '@/types/pagination.type'
import { handleApiCall } from '@/lib/utils'
import type {
  TLoan,
  TQueryLoansDto,
  TApproveLoanDto,
  TRejectLoanDto,
  TDisburseLoanDto,
  TLoanActionResponseDto,
  RepaymentScheduleResponseDto,
} from './index.dto'

export const getLoans = async (query?: TQueryLoansDto) => {
  return handleApiCall(async () => {
    const response = await api.get<PaginatedResponse<TLoan>>('/admin/loans', {
      params: query,
    })
    return response.data
  })
}

export const getLoan = async (loanId: string) => {
  return handleApiCall(async () => {
    const response = await api.get<TLoan>(`/admin/loans/${loanId}`)
    return response.data
  })
}

export const approveLoan = async (loanId: string, payload: TApproveLoanDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<TLoanActionResponseDto>(
      `/admin/loans/${loanId}/approve`,
      payload
    )
    return response.data
  })
}

export const rejectLoan = async (loanId: string, payload: TRejectLoanDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<TLoanActionResponseDto>(
      `/admin/loans/${loanId}/reject`,
      payload
    )
    return response.data
  })
}

export const disburseLoan = async (
  loanId: string,
  payload: TDisburseLoanDto
) => {
  return handleApiCall(async () => {
    const response = await api.post<TLoanActionResponseDto>(
      `/admin/loans/${loanId}/disburse`,
      payload
    )
    return response.data
  })
}

export const getRepaymentSchedule = async (loanId: string) => {
  return handleApiCall(async () => {
    const response = await api.get<RepaymentScheduleResponseDto>(
      `/loan/${loanId}/schedule`
    )
    return response.data
  })
}
