import React from 'react';
import { Box } from '@mui/material';

const Spinner = () => (
  <Box sx={{
    height: '85vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center',
  }}
  >
    <Box className="loader" />
  </Box>
);

export default Spinner;
