import { CustomContentProps } from 'notistack';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
}

export interface AlertProps extends CustomContentProps {
  title?: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  checkAuth: () => void;
  logout: () => void;
}

export interface ThemeContextType {
  themeCookie: { [x: string]: never };
  toggleTheme: () => void;
}

export interface Forms {
  onClose: () => void;
  handleLoadingTrue: () => void;
  handleLoadingFalse: () => void;
}
