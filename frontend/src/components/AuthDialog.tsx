import { Backdrop, CircularProgress, Dialog, DialogContent, Link } from '@mui/material';
import { useState } from 'react';
import SignupForm from './SignupForm.tsx';
import LoginForm from './LoginForm.tsx';

export default function AuthDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [login, setLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadingTrue = () => {
    setLoading(true);
  };
  const handleLoadingFalse = () => {
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        {login ? (
          <LoginForm
            onClose={onClose}
            handleLoadingTrue={handleLoadingTrue}
            handleLoadingFalse={handleLoadingFalse}
          />
        ) : (
          <SignupForm
            onClose={onClose}
            handleLoadingTrue={handleLoadingTrue}
            handleLoadingFalse={handleLoadingFalse}
          />
        )}
        <p>
          {login ? (
            <>
              Don&#39;t have an account yet?{' '}
              <Link
                onClick={() => {
                  setLogin(false);
                }}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Or{' '}
              <Link
                onClick={() => {
                  setLogin(true);
                }}
              >
                log in
              </Link>{' '}
              instead.
            </>
          )}
        </p>
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      </DialogContent>
    </Dialog>
  );
}
