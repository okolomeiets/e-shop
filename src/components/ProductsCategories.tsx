import React, { useEffect } from 'react';
import {
  Box, Card, CardActionArea, CardContent, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { fetchCategories } from '../features/productsSlice';
import Spinner from './Spinner';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const ProductsCategories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box>
      {categories.length ? (
        <Grid container spacing={2} justifyContent="center" style={{ padding: '95px' }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.slug}>
              <Card>
                <CardActionArea component={Link} to={`/products?category=${category.slug}`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="category-item">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (<Spinner />)}
    </Box>
  );
};

export default ProductsCategories;
