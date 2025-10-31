import type { z } from 'zod'
import type { TUser } from '@/types/auth.type'
import type { formSchema } from './schema'

export type RegisterDto = Omit<z.infer<typeof formSchema>, "confirmPassword">

export type RegisterResponseDto = {
  message: string
  user: TUser
}
