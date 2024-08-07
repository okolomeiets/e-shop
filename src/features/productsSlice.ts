import {
  AsyncThunk,
  createAsyncThunk, createSlice, PayloadAction, UnknownAction,
} from '@reduxjs/toolkit';
import { Product } from '../model/productTypes';
import { ProductsService } from '../services/productsService';

export interface ProductsState {
  products: Product[];
  categories: { slug: string; name: string; url: string }[];
  loading: boolean;
  error: string | null;
  page: number;
  totalProducts: number;
  productsPerPage: number;
  productAddedSuccessfully: boolean;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  page: 1,
  totalProducts: 0,
  productsPerPage: 16,
  productAddedSuccessfully: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ productsPerPage, page }: { productsPerPage: number; page: number }, { rejectWithValue }) => {
    try {
      const response = await ProductsService.fetchProducts(productsPerPage, (page - 1) * productsPerPage);
      return { products: response.products, total: response.total };
    } catch (error) {
      return rejectWithValue((error as { response: { data: string } }).response.data);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ProductsService.fetchCategories();
      return data;
    } catch (error) {
      return rejectWithValue((error as { response: { data: string } }).response.data);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryName: string, { rejectWithValue }) => {
    try {
      const response = await ProductsService.fetchProductsByCategory(categoryName);
      return { products: response.products, total: response.total };
    } catch (error) {
      return rejectWithValue((error as { response: { data: string } }).response.data);
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData: Product, { rejectWithValue }) => {
    try {
      const response = await ProductsService.addProduct(productData);
      return response;
    } catch (error) {
      return rejectWithValue((error as { response: { data: string } }).response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProducts',
  async (productId: number, { rejectWithValue }) => {
    try {
      await ProductsService.deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue((error as { response: { data: string } }).response.data);
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData } : { productId: number, productData: Product }, { rejectWithValue }) => {
    try {
      return { productId, productData };
    } catch (error) {
      return rejectWithValue((error as { response: { data: string } }).response.data);
    }
  },
);

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

function isPendingAction(action: UnknownAction): action is PendingAction {
  return typeof action.type === 'string' && action.type.endsWith('/pending');
}

function isRejectedAction(action: UnknownAction): action is RejectedAction {
  return typeof action.type === 'string' && action.type.endsWith('/rejected');
}

function isFulfilledAction(action: UnknownAction): action is FulfilledAction {
  return typeof action.type === 'string' && action.type.endsWith('/fulfilled');
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    resetProductAddedSuccessfully: (state) => {
      state.productAddedSuccessfully = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Product[], total: number }>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ slug: string; name: string; url: string }[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<{ products: Product[], total: number }>) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.unshift(action.payload);
        state.totalProducts = state.products.length;
        state.productAddedSuccessfully = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.totalProducts = state.products.length;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<{ productId: number, productData: Product }>) => {
        state.loading = false;
        const { productId, productData } = action.payload;
        const updatedProducts = state.products.map((product) => (product.id === productId ? { ...product, ...productData } : product));
        state.products = updatedProducts;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action: RejectedAction) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else if (action.error && typeof action.error === 'object' && 'message' in action.error) {
          state.error = (action.error as { message: string }).message ?? 'Unknown error';
        }
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage, setTotalProducts, resetProductAddedSuccessfully } = productsSlice.actions;

export default productsSlice.reducer;
