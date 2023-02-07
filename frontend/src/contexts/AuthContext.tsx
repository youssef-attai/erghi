import { ReactNode, useState, createContext, useContext } from "react";
import authClient from '../authClient'

// TODO: rename this type
export type LoginProps = {
    // TODO: add signup function
    login: (username: string, password: string) => Promise<boolean>
}

const AuthContext = createContext({} as LoginProps)

type ChildrenType = {
  children: ReactNode
}

const AuthProvider = ({ children }: ChildrenType) => {
  const [jwt, setJwt] = useState("")

  const login = async (username: string, password: string) => {
    // TODO: Move axios requests to a separate module of easy-to-call functions, 
    //        e.g. accessToken = authService.login(username, password)
    const { data } = await authClient.post('/login', { username, password }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    const { accessToken } = data

    setJwt(accessToken)

    // return success/fail for login action handler
    return true
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