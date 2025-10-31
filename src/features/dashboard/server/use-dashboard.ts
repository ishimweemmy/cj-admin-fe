import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from './index'

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardStats,
  })
}
