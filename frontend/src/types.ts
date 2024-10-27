import { Dispatch, SetStateAction } from 'react';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  checkAuth: () => void;
  logout: () => void;
}

export interface ThemeContextType {
  themeCookie: { [x: string]: boolean };
  toggleTheme: () => void;
}

export interface FormsProps {
  onClose: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface ValidateProps {
  label: string;
  validator: (value: string) => string | false;
  onChange: (isValid: boolean) => void;
  setValue: Dispatch<SetStateAction<string>>;
}
