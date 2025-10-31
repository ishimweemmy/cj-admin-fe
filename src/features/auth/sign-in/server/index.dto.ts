import type { z } from 'zod'
import type { TUser } from '@/types/auth.type'
import type { formSchema } from './schema'

export type LoginDto = z.infer<typeof formSchema>

export type LoginResponseDto = {
  token: string
  refreshToken: string
  user: TUser
}
