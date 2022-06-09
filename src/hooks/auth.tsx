import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: any;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ArenaTK:token');
    const user = localStorage.getItem('@ArenaTK:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@ArenaTK:token');
    localStorage.removeItem('@ArenaTK:user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth', {
      email,
      password,
    });

    const { token, user } : any = response.data;

    localStorage.setItem('@ArenaTK:token', token);
    localStorage.setItem('@ArenaTK:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
