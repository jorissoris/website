import { createContext, useContext, useMemo, ReactNode, useState } from 'react';
import { AuthContextType } from '../types.ts';
import { enqueueSnackbar } from 'notistack';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/whoami', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        setIsLoggedIn(false);
        enqueueSnackbar('You logged out.', {
          variant: 'success',
          title: 'Success'
        });
      }
    } catch (error) {
      enqueueSnackbar('Are you connected to the internet?', {
        variant: 'error',
        title: 'Error: ' + error
      });
    }
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      checkAuth,
      logout
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
