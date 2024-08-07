import React from 'react';
import {
  AppBar, Toolbar, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <AppBar position="static" className="main-nav">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        React Shop
      </Typography>
      <Link to="/">
        Home
      </Link>
      <Link to="/products/categories">
        Categories
      </Link>
      <Link to="/products">
        All Products
      </Link>

    </Toolbar>
  </AppBar>
);

export default Navigation;
