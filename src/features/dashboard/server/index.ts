import { api } from '@/plugins/axios'
import { handleApiCall } from '@/lib/utils'
import type { TDashboardStats } from './index.dto'

export const getDashboardStats = async () => {
  const apiResponse = handleApiCall(async () => {
    const response = await api.get<TDashboardStats>('/admin/dashboard')
    return response.data
  })
  return apiResponse
}
