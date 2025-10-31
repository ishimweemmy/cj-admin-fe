import { api } from '@/plugins/axios'
import { handleApiCall } from '@/lib/utils'
import type { RegisterDto, RegisterResponseDto } from './index.dto'

export const register = async (payload: RegisterDto) => {
  const apiResponse = handleApiCall(async () => {
    const response = await api.post<RegisterResponseDto>('/admin/auth/register', payload)
    return response.data
  })
  return apiResponse
}
