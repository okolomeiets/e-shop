import React from 'react';
import {
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product } from '../model/productTypes';
import ManagerTools from './ManagerTools';
import { PLACEHOLDER_IMG_200X400 } from '../services/config';
import { replaceHyphensWithSpaces } from '../utils/textUtils';
import ImageSlider from './ImageSlider';
import { RootState } from '../app/store';

interface ProductProps {
  product: Product;
  onSave?: (product: Product) => void;
}

const ProductItem: React.FC<ProductProps> = ({ product, onSave }) => {
  const priceWithDiscount = product.price * (1 - (product.discountPercentage || 0) / 100);
  const isManagerToolsVisible = useSelector((state: RootState) => state.manager.isManagerToolsVisible);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {product.images && product.images.length > 1 ? (
        <ImageSlider images={product.images} />
      ) : (
        <CardMedia
          component="img"
          image={product.thumbnail || PLACEHOLDER_IMG_200X400}
          alt={product.title}
          sx={{
            width: '100%',
            height: '500px',
            objectFit: 'cover',
          }}
          data-testid="product-image"
        />
      )}
      <CardContent>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: '15px' }}>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} data-testid="product-category" className="breadcrumb-link">
            {replaceHyphensWithSpaces(product.category)}
          </Link>
          <Link color="inherit" to="/" data-testid="product-brand" className="breadcrumb-link">
            {product.brand}
          </Link>
        </Breadcrumbs>
        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '10px' }} data-testid="product-title">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {product.title}
          </Link>
        </Typography>

        <Rating name="read-only" value={+product.rating} readOnly size="small" sx={{ marginBottom: '10px' }} data-testid="product-rating" />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: product.discountPercentage ? 'line-through' : 'none', marginBottom: '5px' }}
          data-testid="product-price"
        >
          Price: $
          {+product.price}
        </Typography>

        {product.discountPercentage && product.discountPercentage > 0 ? (
          <>
            <Typography variant="body2" color="primary" sx={{ marginBottom: '5px' }} data-testid="product-price-with-discount">
              Price with Discount: $
              {priceWithDiscount.toFixed(2)}
            </Typography>
            <Typography variant="subtitle2" color="error" sx={{ marginBottom: '5px' }} data-testid="product-discount">
              Save
              {' '}
              {product.discountPercentage}
              %!
            </Typography>
          </>
        ) : null }

        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '10px' }} data-testid="product-description">
          {product.description}
        </Typography>
        {isManagerToolsVisible && onSave && <ManagerTools product={product} onSave={onSave} />}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
