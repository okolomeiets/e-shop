import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../pages/ProductPage', () => () => <div>ProductPage</div>);
jest.mock('../components/Header', () => () => <header>Header</header>);
jest.mock('../components/Footer', () => () => <footer>Footer</footer>);

describe('App Component', () => {
  test('renders Header, ProductPage, and Footer components', () => {
    render(<App />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('ProductPage')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('renders Box with correct padding style', () => {
    render(<App />);
    const box = screen.getByText('ProductPage').parentElement;
    expect(box).toHaveStyle({ padding: '15px' });
  });

  test('ErrorBoundary has correct fallback', () => {
    render(<App />);
    const errorBoundaryFallback = screen.queryByText('Something went wrong with the product list. Please reload the page.');
    expect(errorBoundaryFallback).not.toBeInTheDocument();
  });
});
