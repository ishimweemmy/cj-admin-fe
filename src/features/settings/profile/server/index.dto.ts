import type { TUser } from '@/types/auth.type'

export type UpdateProfileDto = Partial<Pick<TUser, 'firstName' | 'lastName' | 'phoneNumber'>>

export type ProfileResponseDto = TUser
