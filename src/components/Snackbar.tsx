import React from 'react';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { SnackbarState } from '../hooks/useSnackbar';

interface SnackbarProps {
  snackbar: SnackbarState;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ snackbar, onClose }) => {
  return (
    <MuiSnackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  );
};
