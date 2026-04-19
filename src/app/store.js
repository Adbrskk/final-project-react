import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
  },
});