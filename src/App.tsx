import './App.css';
import { Box } from '@mui/material';
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AdminProvider } from './contexts/AdminContext';
import { ProductsProvider } from './contexts/ProductsContext';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductCategoriesPage from './pages/ProductCategoriesPage';
import { RootErrorBoundary, PageErrorBoundary, Fallback } from './components/ErrorBoundaries';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: '/',
        element: (
          <Box sx={{ padding: '15px' }}>
            <HomePage />
          </Box>
        ),
      },
      {
        path: '/products',
        element: (

          <Box sx={{ padding: '15px' }}>
            <ProductsPage />
          </Box>

        ),
        errorElement: <PageErrorBoundary />,
      },
      {
        path: '/products/categories',
        element: (

          <Box sx={{ padding: '15px' }}>
            <ProductCategoriesPage />
          </Box>

        ),
        errorElement: <PageErrorBoundary />,
      },
      {
        path: '/product/:productId',
        element: (

          <Box sx={{ padding: '15px' }}>
            <ProductDetailPage />
          </Box>

        ),
        errorElement: <PageErrorBoundary />,
      },
      {
        path: '*',
        element: (
          <Box sx={{ padding: '15px' }}>
            <NotFoundPage />
          </Box>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ProductsProvider>
      <AdminProvider>
        <RouterProvider router={router} fallbackElement={<Fallback />} />
        <Footer />
      </AdminProvider>
    </ProductsProvider>
  );
}

export default App;
