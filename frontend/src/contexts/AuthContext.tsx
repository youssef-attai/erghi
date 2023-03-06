import { createContext, PropsWithChildren, useContext, useState } from 'react';
import authAPI from '../api/auth';

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await authAPI.post('/login', { username, password });
      setUser({ username: data.username });
    } catch (error: any) {
      throw { message: error.response.data.message };
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await authAPI.get('/me');
      setUser({ username: data.username });
    } catch (error: any) {
      throw { message: error.response.data.message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.get('/logout');
      setUser(null);
    } catch (error: any) {
      throw { message: error.response.data.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, getCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
