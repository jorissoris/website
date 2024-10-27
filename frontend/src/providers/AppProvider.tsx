import { ReactNode } from 'react';
import AuthProvider from './AuthProvider.tsx';
import ThemeProvider from './ThemeProvider.tsx';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
