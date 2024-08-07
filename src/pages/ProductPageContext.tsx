// I want to keep this file as an example of usage with context.

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import ProductItem from '../components/Product';
import { useProducts } from '../contexts/ProductsContext';
import PaginationBar from '../components/PaginationBar';
import Spinner from '../components/Spinner';
import AlertMessage from '../components/AlertMessage';
import AdminPanel from '../components/AdminPanel';
import { ProductsService } from '../services/productsService';
import { replaceHyphensWithSpaces } from '../utils/textUtils';
import { Product } from '../model/productTypes';

const ProductsPage = () => {
  const {
    productAddedSuccessfully, resetProductAddedSuccessfully, products, setProducts, totalProducts, setTotalProducts, page, setPage, productsPerPage, updateProduct,
  } = useProducts();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [isLoading, setIsLoading] = useState(true);

  const formattedCategory = category ? replaceHyphensWithSpaces(category) : '';
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let data;
        if (category) {
          data = await ProductsService.fetchProductsByCategory(category);
        } else {
          data = await ProductsService.fetchProducts(productsPerPage, (page - 1) * productsPerPage);
        }
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, page, productsPerPage, setProducts, setTotalProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (productAddedSuccessfully) {
        resetProductAddedSuccessfully();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [productAddedSuccessfully, resetProductAddedSuccessfully]);

  const handleUpdateProduct = async (product: Product) => {
    await updateProduct(product.id, product);
  };

  return (
    <>
      <AdminPanel />
      <Box>
        {isLoading ? (
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
              onPageChange={(event, value) => setPage(value)}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default ProductsPage;
