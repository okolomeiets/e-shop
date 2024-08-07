import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import ProductItem from '../components/Product';
import Spinner from '../components/Spinner';
import { replaceHyphensWithSpaces } from '../utils/textUtils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProductsByCategory } from '../features/productsSlice';

const CategoryProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  const formattedCategory = category ? replaceHyphensWithSpaces(category) : '';

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  const renderContent = () => {
    if (loading) {
      return (
        <Grid item xs={12}>
          <Spinner />
        </Grid>
      );
    }

    if (products.length > 0) {
      return products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductItem product={product} />
        </Grid>
      ));
    }

    return <Typography>No products found.</Typography>;
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h2" className="category-title">
            {formattedCategory}
          </Typography>
        </Grid>
        {renderContent()}
      </Grid>
    </Box>
  );
};

export default CategoryProductsPage;
