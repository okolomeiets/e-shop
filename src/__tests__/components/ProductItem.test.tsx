import React from 'react';
import { render } from '@testing-library/react';
import ProductItem from '../../components/Product';
import { Product } from '../../model/productTypes';

const product: Product = {
  id: 1,
  title: 'Test Product',
  description: 'A description for the test product',
  price: 100,
  discountPercentage: 10,
  category: 'Electronics',
  brand: 'TestBrand',
  rating: 4.5,
  images: ['img1.jpg', 'img2.jpg'],
  stock: 20,
  thumbnail: 'thumb.jpg',
};

jest.mock('../../contexts/AdminContext', () => ({
  useAdmin: () => ({ isManagerToolsVisible: true }),
}));
jest.mock('../../contexts/ProductsContext', () => ({
  useProducts: () => ({ updateProduct: jest.fn() }),
}));

describe('ProductItem Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<ProductItem product={product} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
