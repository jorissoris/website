import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { AlertProps } from '../types.ts';

const Error = forwardRef<HTMLDivElement, AlertProps>(({ id, message, title }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} className="py-2 px-4 bg-red-600 rounded">
      <div className="flex justify-center w-full">
        <ErrorIcon />
        <div className="w-full ml-3">
          <div className="flex justify-between w-full">
            <b>{title}</b>
            <IconButton size="small" onClick={handleDismiss}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
          <p className="mt-[-5px]">{message}</p>
        </div>
      </div>
    </SnackbarContent>
  );
});

Error.displayName = 'Error';

export default Error;
