import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ApiHandlerErrorResponseDto } from '@/types/auth.type'
import { register } from '.'
import type { RegisterDto, RegisterResponseDto } from './index.dto'

export const useRegister = () => {
  const navigate = useNavigate()
  return useMutation<
    RegisterResponseDto,
    ApiHandlerErrorResponseDto,
    RegisterDto
  >({
    mutationFn: (payload) => register(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Admin registered successfully')
      navigate({ to: '/sign-in', replace: true })
    },
    onError: (error) => {
      toast.error(error.meta?.response?.data?.message || 'Failed to register')
    },
  })
}
