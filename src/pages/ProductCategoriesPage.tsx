import React from 'react';
import { Typography } from '@mui/material';
import ProductsCategories from '../components/ProductsCategories';

const ProductCategoriesPage = () => (
  <>
    <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h4" component="h2">
      Categories
    </Typography>
    <ProductsCategories />
  </>
);

export default ProductCategoriesPage;
