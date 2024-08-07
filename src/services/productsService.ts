import axios from 'axios';
import { API_BASE_URL } from './config';
import { Product } from '../model/productTypes';
import { ProductPage } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export class ProductsService {
  static fetchProducts = async (limit = 16, skip = 0): Promise<ProductPage> => {
    const response = await apiClient.get(`products?limit=${limit}&skip=${skip}`);
    return response.data;
  };

  static updateProduct = async (productId: number, productData: Product): Promise<Product> => {
    const response = await apiClient.put(`/products/${productId}`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  static deleteProduct = async (productId: number): Promise<Product> => {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  };

  static addProduct = async (productData: Product): Promise<Product> => {
    const response = await apiClient.post('/products/add', productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  static fetchCategories = async (): Promise<{ slug: string; name: string; url: string }[]> => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  };

  static fetchProductsByCategory = async (categoryName: string): Promise<{ products: Product[], total: number }> => {
    const response = await apiClient.get(`/products/category/${categoryName}`);
    return {
      products: response.data.products,
      total: response.data.total,
    };
  };

  static fetchProductDetails = async (productId: string): Promise<Product> => {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  };
}
