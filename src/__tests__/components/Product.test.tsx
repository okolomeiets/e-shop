import React from 'react';
import { render, screen } from '@testing-library/react';
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

let mockIsManagerToolsVisible = false;

jest.mock('../../components/ImageSlider', () => {
  const ImageSliderMock = () => <div>ImageSlider</div>;
  ImageSliderMock.displayName = 'ImageSliderMock';
  return ImageSliderMock;
});

jest.mock('../../components/ManagerTools', () => {
  const ManagerToolsMock = () => <div data-testid="manager-tools">ManagerTools</div>;
  ManagerToolsMock.displayName = 'ManagerToolsMock';
  return ManagerToolsMock;
});

jest.mock('../../contexts/AdminContext', () => ({
  useAdmin: () => ({ isManagerToolsVisible: mockIsManagerToolsVisible }),
}));
jest.mock('../../contexts/ProductsContext', () => ({
  useProducts: () => ({ updateProduct: jest.fn() }),
}));

describe('ProductItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsManagerToolsVisible = false;
  });

  test('renders product details', () => {
    render(<ProductItem product={product} />);
    expect(screen.getByRole('link', { name: product.category })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: product.brand })).toBeInTheDocument();
    expect(screen.getByTestId('product-title')).toBeInTheDocument();
    expect(screen.getByTestId('product-description')).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toBeInTheDocument();
    expect(screen.getByTestId('product-price-with-discount')).toBeInTheDocument();
    expect(screen.getByTestId('product-discount')).toBeInTheDocument();
  });

  test('renders correct styles for price element when discount price is absent', () => {
    const noDiscountProduct = { ...product, discountPercentage: 0 };
    render(<ProductItem product={noDiscountProduct} />);
    const price = screen.getByTestId('product-price');
    expect(price).toBeInTheDocument();
    expect(price).toHaveStyle('text-decoration: none');
  });

  test('renders ManagerTools with correct props when isManagerToolsVisible is true', () => {
    mockIsManagerToolsVisible = true;
    render(<ProductItem product={product} />);
    expect(screen.getByTestId('manager-tools')).toBeInTheDocument();
  });

  test('does not render ManagerTools when isManagerToolsVisible is false', () => {
    render(<ProductItem product={product} />);
    expect(screen.queryByTestId('manager-tools')).not.toBeInTheDocument();
  });

  test('renders CardMedia with the correct image when there is only one image', () => {
    const productWithOneImage = {
      ...product,
      images: ['img1.jpg'],
    };

    render(<ProductItem product={productWithOneImage} />);
    const cardMedia = screen.getByTestId('product-image');
    expect(cardMedia).toBeInTheDocument();
    expect(cardMedia).toHaveAttribute('src', productWithOneImage.thumbnail);
  });
});
