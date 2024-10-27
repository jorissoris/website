import { Alert, AlertTitle, Button, Switch } from '@mui/material';
import AuthDialog from '../components/AuthDialog.tsx';
import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider.tsx';
import { useTheme } from '../providers/ThemeProvider.tsx';
import { enqueueSnackbar } from 'notistack';

export default function Home() {
  const { isLoggedIn, logout, checkAuth } = useAuth();
  const { themeCookie, toggleTheme } = useTheme();
  const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);
  const handleAuthOpen = () => setAuthDialogOpen(true);
  const handleAuthClose = () => setAuthDialogOpen(false);

  checkAuth();

  const handleTestToken = async () => {
    const response = await fetch('/api/whoami');
    switch (response.status) {
      case 200: {
        const body = await response.json();
        enqueueSnackbar('Your email is: ' + body.email, {
          variant: 'success',
          title: 'It works!'
        });
        break;
      }
      case 401:
        enqueueSnackbar('Please log in and try again.', {
          variant: 'error',
          title: 'Unauthorized user'
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
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="grid grid-cols-2 grid-flow-row gap-4 w-1/3">
          {isLoggedIn ? (
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant="contained" onClick={handleAuthOpen}>
              Login/Signup
            </Button>
          )}

          <Button variant="contained" onClick={handleTestToken}>
            Test Token
          </Button>
          <Alert severity="info" variant="outlined" className="col-span-2">
            <AlertTitle>Are you logged in?</AlertTitle>
            <p className="text-xl">{isLoggedIn ? 'Yes, you are.' : 'No, you are not.'}</p>
          </Alert>
          <Alert severity="info" variant="outlined" className="col-span-2">
            <AlertTitle>What theme do you prefer?</AlertTitle>
            <div className="grid grid-cols-3 grid-flow-row gap-4">
              <p className="text-xl text-center">Light mode</p>
              <Switch className="m-auto" checked={themeCookie.theme} onChange={toggleTheme} />
              <p className="text-xl text-center">Dark mode</p>
            </div>
          </Alert>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onClose={handleAuthClose} />
    </>
  );
}
