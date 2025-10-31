import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'
import type { TUser } from '@/types/auth.type'

const AUTH_TOKEN = 'authTokens'
const AUTH_USER = 'authUser'

type TAuthTokens = {
  accessToken: string
  refreshToken: string
}

interface AuthState {
  auth: {
    user: TUser | null
    setUser: (user: TUser | null) => void
    authTokens: TAuthTokens
    setAuthTokens: (authTokens: TAuthTokens) => void
    resetAuthTokens: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = getCookie(AUTH_TOKEN)
  const userState = getCookie(AUTH_USER)
  const defaultTokenValue = { accessToken: '', refreshToken: '' }
  const initToken = cookieState ? JSON.parse(cookieState) : defaultTokenValue
  const initUser = userState ? JSON.parse(userState) : null
  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => {
          if (user) {
            setCookie(AUTH_USER, JSON.stringify(user))
          } else {
            removeCookie(AUTH_USER)
          }
          return { ...state, auth: { ...state.auth, user } }
        }),
      authTokens: initToken,
      setAuthTokens: (authTokens) =>
        set((state) => {
          setCookie(AUTH_TOKEN, JSON.stringify(authTokens))
          return { ...state, auth: { ...state.auth, authTokens } }
        }),
      resetAuthTokens: () =>
        set((state) => {
          removeCookie(AUTH_TOKEN)
          return {
            ...state,
            auth: {
              ...state.auth,
              authTokens: defaultTokenValue,
            },
          }
        }),
      reset: () =>
        set((state) => {
          removeCookie(AUTH_TOKEN)
          removeCookie(AUTH_USER)
          return {
            ...state,
            auth: {
              ...state.auth,
              user: null,
              authTokens: defaultTokenValue,
            },
          }
        }),
    },
  }
})
