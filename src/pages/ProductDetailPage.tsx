import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ProductItem from '../components/Product';
import { Product } from '../model/productTypes';
import { ProductsService } from '../services/productsService';
import Spinner from '../components/Spinner';

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product>();
  const { productId } = useParams<'productId'>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId !== undefined) {
        try {
          const data = await ProductsService.fetchProductDetails(productId);
          setProduct(data);
        } catch (error) {
          console.error('Error when receiving product:', error);
        }
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Button variant="text" onClick={handleGoBack} sx={{ marginBottom: '20px' }}>
        <ChevronLeftIcon />
        {' '}
        Back
      </Button>
      {product ? (
        <ProductItem product={product} />
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default ProductDetailPage;
