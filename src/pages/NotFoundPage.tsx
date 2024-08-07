import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Button, Box,
} from '@mui/material';

const NotFoundPage = () => (
  <Box style={{
    display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center',
  }}
  >
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist. You can go back to the homepage or explore our categories.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/products/categories">
        Categories
      </Button>
    </Container>
  </Box>
);

export default NotFoundPage;
