import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { passwordValidator } from './validator.ts';

interface PasswordInputProps {
  setPassword: Dispatch<SetStateAction<string>>;
}

export default function PasswordInput({ setPassword }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | false>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setError(passwordValidator(newValue)); // Set error message if validation fails
  };

  return (
    <FormControl variant="outlined" className="w-full" error={!!error}>
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        onChange={handlePasswordChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
