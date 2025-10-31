import type { ApiHandlerCallBack, ApiHandlerErrorResponseDto } from '@/types/auth.type'
import type { AxiosError, AxiosResponse } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generates page numbers for pagination with ellipsis
 * @param currentPage - Current page number (1-based)
 * @param totalPages - Total number of pages
 * @returns Array of page numbers and ellipsis strings
 *
 * Examples:
 * - Small dataset (≤5 pages): [1, 2, 3, 4, 5]
 * - Near beginning: [1, 2, 3, 4, '...', 10]
 * - In middle: [1, '...', 4, 5, 6, '...', 10]
 * - Near end: [1, '...', 7, 8, 9, 10]
 */
export function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5 // Maximum number of page buttons to show
  const rangeWithDots = []

  if (totalPages <= maxVisiblePages) {
    // If total pages is 5 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      rangeWithDots.push(i)
    }
  } else {
    // Always show first page
    rangeWithDots.push(1)

    if (currentPage <= 3) {
      // Near the beginning: [1] [2] [3] [4] ... [10]
      for (let i = 2; i <= 4; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      // Near the end: [1] ... [7] [8] [9] [10]
      rangeWithDots.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        rangeWithDots.push(i)
      }
    } else {
      // In the middle: [1] ... [4] [5] [6] ... [10]
      rangeWithDots.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    }
  }

  return rangeWithDots
}


/**
 * Handles API calls and catches errors, returning a standardized error response.
 *
 * @template T - The type of the expected response.
 * @param {ApiHandlerCallBack<T>} cb - The callback function that performs the API call.
 * @returns {Promise<Awaited<T>>} - The API response or a standardized error response.
 * @throws {ApiHandlerErrorResponseDto} - Throws a standardized error response if the API call fails.
 */
export const handleApiCall = async <T>(cb: ApiHandlerCallBack<T>): Promise<Awaited<T>> => {
  try {
    return await cb()
  } catch (error) {
    const axiosError = error as AxiosError

    const errorStatuses = [400, 401, 403, 404, 500]
    const isError = errorStatuses.includes(axiosError.response?.status ?? 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = axiosError.response as AxiosResponse<any>

    const errorResponse: ApiHandlerErrorResponseDto = {
      ...axiosError,
      is400: response?.status === 400,
      is401: response?.status === 401,
      is403: response?.status === 403,
      is404: response?.status === 404,
      is500: response?.status === 500,
      isError,
      response,
      meta: axiosError
    }

    throw errorResponse
  }
}