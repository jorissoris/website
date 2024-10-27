import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import PasswordInput from './PasswordInput.tsx';
import { Forms } from '../types.ts';
import { enqueueSnackbar } from 'notistack';

export default function LoginForm({ onClose, handleLoadingTrue, handleLoadingFalse }: Forms) {
  const [email, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      enqueueSnackbar('Please fill in email and password.', {
        variant: 'error',
        title: 'Invalid credentials'
      });
      return;
    }

    try {
      handleLoadingTrue();
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      switch (response.status) {
        case 200: {
          onClose();
          enqueueSnackbar('You logged in.', {
            variant: 'success',
            title: 'Success'
          });
          break;
        }
        case 401:
          enqueueSnackbar('Did you spell everything correctly?', {
            variant: 'error',
            title: 'Incorrect username or password'
          });
          break;
        case 500:
          enqueueSnackbar('Something went wrong. Please try again later.', {
            variant: 'error',
            title: 'Internal Server Error'
          });
          break;
        default:
          enqueueSnackbar('Something went wrong. Please try again later.', {
            variant: 'error',
            title: 'Error'
          });
      }
    } catch (error) {
      enqueueSnackbar('Are you connected to the internet?', {
        variant: 'error',
        title: 'Error: ' + error
      });
    } finally {
      handleLoadingFalse();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-flow-row gap-2">
        <div className="flex justify-between">
          <p className="text-2xl">Log In</p>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <TextField
          fullWidth
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput setPassword={setPassword} />
        <Button variant="contained" onClick={handleSubmit}>
          Log In
        </Button>
      </div>
    </>
  );
}
