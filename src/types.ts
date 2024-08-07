import React, { ReactNode } from 'react';
import { Product } from './model/productTypes';

export interface ProductsContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (productId: number, productData: Product) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  addProduct: (productData: Product) => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalProducts: number;
  setTotalProducts: React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: number;
  productAddedSuccessfully: boolean;
  resetProductAddedSuccessfully: () => void;
}

export interface ProductsProviderProps {
  children: ReactNode;
}

export interface AdminContextType {
  isManagerToolsVisible: boolean;
  toggleManagerTools: () => void;
  setManagerToolsVisible: (visible: boolean) => void;
}

export interface AdminProviderProps {
  children: ReactNode;
}

export type ProductPage = {
  total: number;
  skip: number;
  limit: number;
  products: Product[];
};
