import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string()
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  // eslint-disable-next-line no-console
  console.error(parsedEnv.error)
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`)
}

export const env = parsedEnv.data
