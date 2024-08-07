import React from 'react';
import Alert from '@mui/material/Alert';

interface AlertProps {
  severity: 'error' | 'info' | 'success' | 'warning';
  variant: 'filled' | 'outlined' | 'standard';
  children: React.ReactNode;
}

const AlertMessage: React.FC<AlertProps> = ({ severity, variant, children }) => (
  <Alert severity={severity} variant={variant}>
    {children}
  </Alert>
);

export default AlertMessage;
