'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { setApiToken } from '@/lib/api';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  name: string | null;
  setName: (name: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  name: null,
  setName: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      setApiToken(accessToken);
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        setName(payload.name);
      } catch (error) {
        setAccessToken(null);
        setName(null);
      }
    }
  }, [accessToken, setAccessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, name, setName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
