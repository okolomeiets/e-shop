import React, {
  createContext, useState, useContext, useEffect, useMemo, useCallback,
} from 'react';
import { ProductsContextType, ProductsProviderProps } from '../types';
import { Product } from '../model/productTypes';
import { ProductsService } from '../services/productsService';

const defaultProductsContext: ProductsContextType = {
  products: [],
  setProducts: () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
  addProduct: async () => {},
  page: 1,
  setPage: () => {},
  totalProducts: 0,
  setTotalProducts: () => {},
  productsPerPage: 16,
  productAddedSuccessfully: false,
  resetProductAddedSuccessfully: () => {},
};

const ProductsContext = createContext<ProductsContextType>(defaultProductsContext);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProductsContext.products);
  const [page, setPage] = useState<number>(defaultProductsContext.page);
  const [totalProducts, setTotalProducts] = useState<number>(defaultProductsContext.totalProducts);
  const [productAddedSuccessfully, setProductAddedSuccessfully] = useState(defaultProductsContext.productAddedSuccessfully);

  const productsPerPage = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductsService.fetchProducts(productsPerPage, (page - 1) * productsPerPage);
        setProducts(response.products);
        setTotalProducts(response.total);
      } catch (error) {
        console.error('Error when receiving products:', error);
      }
    };
    fetchProducts();
  }, [page]);

  const handleUpdateProduct = useCallback(async (productId: number, productData: Product) => {
    try {
      await ProductsService.updateProduct(productId, productData);
    } catch (error) {
      console.error('Error when updating the product:', error);
    }
    setProducts((currentProducts) => currentProducts.map((product) => (product.id === productId ? { ...product, ...productData } : product)));
  }, [setProducts]);

  // The commented-out code at the bottom is correct, but I cannot apply it due to the limitations of the
  // dummyjson API (the API does not allow modifications on the server).

  // const handleUpdateProduct = useCallback(async (productId: number, productData: ProductType) => {
  //   try {
  //     const updatedProduct = await ProductsService.updateProduct(productId, productData);
  //     setProducts((currentProducts) => currentProducts.map((product) => (product.id === productId ? { ...product, ...updatedProduct } : product)));
  //   } catch (error) {
  //     console.error('Error when updating the product:', error);
  //   }
  // }, [setProducts]);

  const handleDeleteProduct = useCallback(async (productId: number) => {
    try {
      await ProductsService.deleteProduct(productId);
      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error when deleting the product:', error);
    }
  }, [setProducts]);

  const handleAddProduct = useCallback(async (productData: Product) => {
    try {
      const newProduct = await ProductsService.addProduct(productData);
      setProducts((currentProducts) => [newProduct, ...currentProducts]);
      setTotalProducts((currentTotal) => currentTotal + 1);
      setProductAddedSuccessfully(true);
    } catch (error) {
      console.error('Error when adding the product:', error);
    }
  }, [setProducts, setTotalProducts, setProductAddedSuccessfully]);

  const resetProductAddedSuccessfully = useCallback(() => {
    setProductAddedSuccessfully(false);
  }, [setProductAddedSuccessfully]);

  const value = useMemo(() => ({
    products,
    setProducts,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    addProduct: handleAddProduct,
    page,
    setPage,
    totalProducts,
    setTotalProducts,
    productsPerPage,
    productAddedSuccessfully,
    resetProductAddedSuccessfully,
  }), [products, page, totalProducts, productsPerPage, productAddedSuccessfully, handleAddProduct, handleDeleteProduct, handleUpdateProduct, resetProductAddedSuccessfully]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
