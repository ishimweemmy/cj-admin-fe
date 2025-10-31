import { api } from '@/plugins/axios'
import { handleApiCall } from '@/lib/utils'
import type { UpdateProfileDto, ProfileResponseDto } from './index.dto'

export const getProfile = async () => {
  return handleApiCall(async () => {
    const response = await api.get<ProfileResponseDto>('/customer/profile')
    return response.data
  })
}

export const updateProfile = async (data: UpdateProfileDto) => {
  return handleApiCall(async () => {
    const response = await api.patch<ProfileResponseDto>('/customer/profile', data)
    return response.data
  })
}
