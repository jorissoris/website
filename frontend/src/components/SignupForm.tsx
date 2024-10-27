import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import PasswordInput from './PasswordInput.tsx';
import { Forms } from '../types.ts';
import { enqueueSnackbar } from 'notistack';

export default function SignupForm({ onClose, handleLoadingTrue, handleLoadingFalse }: Forms) {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async () => {
    if (email === '' || firstName === '' || lastName === '' || password === '') {
      enqueueSnackbar('Please fill in everything.', {
        variant: 'error',
        title: 'Invalid credentials'
      });
      return;
    }

    try {
      handleLoadingTrue();
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        })
      });
      switch (response.status) {
        case 201: {
          const token: string = await response.json();
          console.log(token);
          onClose();
          enqueueSnackbar('Created account: ' + firstName + ' ' + lastName, {
            variant: 'success',
            title: 'Success'
          });
          break;
        }
        case 403:
          enqueueSnackbar('Try using a different username.', {
            variant: 'error',
            title: "Couldn't create account"
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
          <p className="text-2xl">Sign Up</p>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <TextField
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full"
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full"
        />
        <PasswordInput setPassword={setPassword} />
        <Button variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </>
  );
}
