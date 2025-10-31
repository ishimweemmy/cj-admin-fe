import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiHandlerErrorResponseDto } from '@/types/auth.type'
import type { PaginatedResponse } from '@/types/pagination.type'
import { toast } from 'sonner'
import {
  getLoans,
  getLoan,
  approveLoan,
  rejectLoan,
  disburseLoan,
  getRepaymentSchedule,
} from '.'
import type {
  TLoan,
  TQueryLoansDto,
  TApproveLoanDto,
  TRejectLoanDto,
  TDisburseLoanDto,
  TLoanActionResponseDto,
  RepaymentScheduleResponseDto,
} from './index.dto'

export const useGetLoans = (query?: TQueryLoansDto) => {
  return useQuery<PaginatedResponse<TLoan>, ApiHandlerErrorResponseDto>({
    queryKey: ['loans', query],
    queryFn: () => getLoans(query),
  })
}

export const useGetLoan = (loanId: string) => {
  return useQuery<TLoan, ApiHandlerErrorResponseDto>({
    queryKey: ['loan', loanId],
    queryFn: () => getLoan(loanId),
    enabled: !!loanId,
  })
}

export const useGetRepaymentSchedule = (loanId: string) => {
  return useQuery<RepaymentScheduleResponseDto, ApiHandlerErrorResponseDto>({
    queryKey: ['repayment-schedule', loanId],
    queryFn: () => getRepaymentSchedule(loanId),
    enabled: !!loanId,
  })
}

export const useApproveLoan = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TLoanActionResponseDto,
    ApiHandlerErrorResponseDto,
    { loanId: string; payload: TApproveLoanDto }
  >({
    mutationFn: ({ loanId, payload }) => approveLoan(loanId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
      queryClient.invalidateQueries({ queryKey: ['loan', data.loan.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Loan approved successfully')
    },
    onError: (error) => {
      toast.error(
        error.meta?.response?.data?.message || 'Failed to approve loan'
      )
    },
  })
}

export const useRejectLoan = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TLoanActionResponseDto,
    ApiHandlerErrorResponseDto,
    { loanId: string; payload: TRejectLoanDto }
  >({
    mutationFn: ({ loanId, payload }) => rejectLoan(loanId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
      queryClient.invalidateQueries({ queryKey: ['loan', data.loan.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Loan rejected successfully')
    },
    onError: (error) => {
      toast.error(
        error.meta?.response?.data?.message || 'Failed to reject loan'
      )
    },
  })
}

export const useDisburseLoan = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TLoanActionResponseDto,
    ApiHandlerErrorResponseDto,
    { loanId: string; payload: TDisburseLoanDto }
  >({
    mutationFn: ({ loanId, payload }) => disburseLoan(loanId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
      queryClient.invalidateQueries({ queryKey: ['loan', data.loan.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success(data.message || 'Loan disbursed successfully')
    },
    onError: (error) => {
      toast.error(
        error.meta?.response?.data?.message || 'Failed to disburse loan'
      )
    },
  })
}
