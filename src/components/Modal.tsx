import React from 'react';

import {
  Dialog, DialogContent, useMediaQuery, useTheme,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const ModalComponent: React.FC<ModalProps> = ({
  open, onClose, children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
    >
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
