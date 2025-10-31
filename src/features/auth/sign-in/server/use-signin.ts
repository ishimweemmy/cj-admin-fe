import { useMutation } from '@tanstack/react-query'
import type { ApiHandlerErrorResponseDto } from '@/types/auth.type'
import { useAuthStore } from '@/stores/auth-store'
import { login } from '.'
import type { LoginDto, LoginResponseDto } from './index.dto'
import { useNavigate } from '@tanstack/react-router'

export const useSignIn = (redirectTo?: string) => {
  const { auth } = useAuthStore()
const navigate = useNavigate()

  return useMutation<LoginResponseDto, ApiHandlerErrorResponseDto, LoginDto>({
    mutationFn: (payload) => login(payload),
    onSuccess: (data, _variables) => {
      console.log("data", data)
      auth.setUser(data.user)
      auth.setAuthTokens({
        accessToken: data.token,
        refreshToken: data.refreshToken,
      })


      const targetPath = redirectTo || '/'
      navigate({ to: targetPath, replace: true })
    },
  })
}
