import { useState, useRef } from 'react';
import { Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import PasswordInput from './PasswordInput';
import { FormsProps } from '../types';
import { enqueueSnackbar } from 'notistack';
import ValidatedTextField from './ValidatedTextField';
import { emailValidator, passwordValidator } from './validator.ts';

export default function LoginForm({ onClose, setLoading }: FormsProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formValid = useRef({ email: false, password: false });

  const handleSubmit = async () => {
    if (Object.values(formValid.current).some((isValid) => !isValid)) {
      enqueueSnackbar('Please enter valid email and password.', {
        variant: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      switch (response.status) {
        case 200:
          onClose();
          enqueueSnackbar('You logged in.', { variant: 'success' });
          break;
        case 401:
          enqueueSnackbar('Incorrect email or password.', { variant: 'error' });
          break;
        default:
          enqueueSnackbar('Something went wrong. Please try again later.', {
            variant: 'error'
          });
      }
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 grid-flow-row gap-2">
      <div className="flex justify-between">
        <p className="text-2xl">Log In</p>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <ValidatedTextField
        label="Email"
        validator={emailValidator}
        onChange={(isValid) => (formValid.current.email = isValid)}
        value={email}
        setValue={setEmail}
      />
      <PasswordInput
        setPassword={(value) => {
          setPassword(value);
          formValid.current.password = !passwordValidator(value);
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Log In
      </Button>
    </div>
  );
}
