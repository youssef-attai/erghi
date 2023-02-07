import { ReactNode, useState, createContext, useContext } from "react";
import authClient from '../authClient'
import User from "../models/User";

export type LoginFunction = (username: string, password: string) => Promise<boolean>
export type SignUpFunction = (username: string, password: string, confirmPassword: string) => Promise<boolean>
export type RefreshAccessTokenFunction = () => Promise<boolean>
export type LogoutFunction = () => Promise<boolean>

export type AuthContextValue = {
  login: LoginFunction
  signUp: SignUpFunction
  logout: LogoutFunction 
  refreshAccessToken: RefreshAccessTokenFunction
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  accessToken: string
}

const AuthContext = createContext({} as AuthContextValue)

type AuthProviderProps = { children: ReactNode }

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<User>()

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