import React, { useMemo } from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        borderTop: 1,
        borderColor: 'divider',
        backgroundColor: 'primary.main',
        color: 'white',
        py: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        React Shop
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& a': {
            mx: 2,
          },
        }}
      >
        <Link href="/" color="inherit">
          Home
        </Link>
        <Link href="/" color="inherit">
          Products
        </Link>
        <Link href="/" color="inherit">
          About Us
        </Link>
        <Link href="/" color="inherit">
          Contact
        </Link>
      </Box>
      <Typography variant="body2">
        ©
        {' '}
        {currentYear}
        {' '}
        React Shop. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
