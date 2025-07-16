import React, { createContext, useState, useEffect, useCallback, type  ReactNode } from 'react';
import apiClient from '../api/axiosConfig';
import { login as apiLogin } from '../api/authApi';

interface LoginCredentials { username: string; password: string; }
interface User { name: string; }
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
interface AuthProviderProps { children: ReactNode; }

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      delete apiClient.defaults.headers.common['Authorization'];

      const response = await apiLogin(credentials);
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      
      
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Falha no login:", error);
      throw error;
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
  }, []);

  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

