import { ReactNode, useState, createContext, useContext } from "react";
import authClient from '../authClient'

// TODO: rename this type
export type LoginProps = {
    // TODO: add signup function
    login: (username: string, password: string) => Promise<boolean>
}


  const login: LoginFunction = async (username: string, password: string) => {
    const { data: { accessToken: token, user } } = await authClient.post<{ accessToken: string, user: User }>('/login', { username, password }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })

    setAccessToken(token)
    setCurrentUser(user)
    return true
  }

  const signUp: SignUpFunction = async (username: string, password: string, confirmPassword: string) => {
    const { data: { accessToken: token, user } } = await authClient.post<{ accessToken: string, user: User }>('/new', { username, password }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })

    setAccessToken(token)
    setCurrentUser(user)
    return true
  }

  const refreshAccessToken: RefreshAccessTokenFunction = async () => {
    try {
      const { data: { accessToken: token, user } } = await authClient.get<{ accessToken: string, user: User }>('/refresh', {
        headers: {
          "Accept": "application/json"
        }
      })

      setAccessToken(token)
      setCurrentUser(user)
      return true
    } catch (error) {
      return false;
    }
  }

  const logout: LogoutFunction = async () => {
    try {
      await authClient.get('/logout')

      setAccessToken('')
      setCurrentUser(undefined)

      return true
    } catch (error) {
      return false
    }
  }

  const contextValue: AuthContextValue = { login, signUp, logout, refreshAccessToken, currentUser, setCurrentUser, accessToken }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider