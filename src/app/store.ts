import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import managerReducer from '../features/managerSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    manager: managerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
