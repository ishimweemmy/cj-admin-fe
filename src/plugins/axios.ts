import axios from 'axios'
import { API_DEFAULT_TIMEOUT } from '@/config/api.config'
import { env } from '@/env'
import { useAuthStore } from '@/stores/auth-store'

const api = axios.create({
  baseURL: `${env.VITE_API_BASE_URL}/api/v1`,
  timeout: API_DEFAULT_TIMEOUT,
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore.getState()
  const token = authStore.auth.authTokens.accessToken

  config.headers.set('Authorization', `Bearer ${token}`)

  return config
})

export { api }
