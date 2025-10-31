import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import type { ApiHandlerErrorResponseDto } from '@/types/auth.type'
import type { UpdateProfileDto, ProfileResponseDto } from './index.dto'
import { getProfile, updateProfile } from '.'

export const useGetProfile = () => {
  return useQuery<ProfileResponseDto, ApiHandlerErrorResponseDto>({
    queryKey: ['customer-profile'],
    queryFn: getProfile,
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.auth.setUser)

  return useMutation<ProfileResponseDto, ApiHandlerErrorResponseDto, UpdateProfileDto>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(data)
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] })
      toast.success('Profile updated successfully')
    },
    onError: (error) => {
      toast.error(error.meta?.response?.data?.message || 'Failed to update profile')
    },
  })
}
