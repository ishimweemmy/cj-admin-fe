import { type ApiHandlerErrorResponseDto } from '@/types/auth.type'
import { toast } from 'sonner'

export function handleServerError(error: unknown) {
  let errMsg = 'Something went wrong!'
  // eslint-disable-next-line no-console
  console.log(error)

  // Non-Axios Errors (status based errors)

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  // Axios Errors

  if (isAxiosError(error)) {
    errMsg = error.response?.data.message
  }

  toast.error(errMsg)
}

function isAxiosError(error: unknown): error is ApiHandlerErrorResponseDto {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as ApiHandlerErrorResponseDto).isError === true
  )
}
