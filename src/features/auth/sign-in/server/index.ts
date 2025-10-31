import { api } from '@/plugins/axios'
import { handleApiCall } from '@/lib/utils'
import type { LoginDto, LoginResponseDto } from './index.dto'

export const login = async (payload: LoginDto) => {
  const apiResponse = handleApiCall(async () => {
    const response = await api.post<LoginResponseDto>('/admin/auth/login', payload)
    return response.data
  })
  return apiResponse
}
