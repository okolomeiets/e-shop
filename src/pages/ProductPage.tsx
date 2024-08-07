import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import ProductItem from '../components/Product';
import PaginationBar from '../components/PaginationBar';
import Spinner from '../components/Spinner';
import AlertMessage from '../components/AlertMessage';
import AdminPanel from '../components/AdminPanel';
import { replaceHyphensWithSpaces } from '../utils/textUtils';
import { Product } from '../model/productTypes';
import {
  fetchProducts,
  fetchProductsByCategory,
  setPage,
  resetProductAddedSuccessfully,
  updateProduct,
} from '../features/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    loading,
    productAddedSuccessfully,
    page,
    totalProducts,
    productsPerPage,

  } = useAppSelector((state: RootState) => state.products);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const formattedCategory = category ? replaceHyphensWithSpaces(category) : '';
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    } else {
      dispatch(fetchProducts({ productsPerPage, page }));
    }
  }, [category, productsPerPage, page, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (productAddedSuccessfully) {
        dispatch(resetProductAddedSuccessfully());
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [productAddedSuccessfully, dispatch]);

  const handleUpdateProduct = async (product: Product) => {
    await dispatch(updateProduct({ productId: product.id, productData: product }));
  };

  return (
    <>
      <AdminPanel />
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {category && (
            <Typography gutterBottom variant="h4" component="h2" className="category-title">
              {formattedCategory}
            </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {productAddedSuccessfully && (
                <AlertMessage severity="success" variant="standard">
                  Product was added successfully.
                </AlertMessage>
                )}
              </Grid>
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={6} lg={3} key={product.id}>
                    <ProductItem product={product} onSave={handleUpdateProduct} />
                  </Grid>
                ))
              ) : (
                <Typography>No products found.</Typography>
              )}
            </Grid>
            <PaginationBar
              page={page}
              count={pageCount}
              onPageChange={(event, value) => dispatch(setPage(value))}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default ProductsPage;
