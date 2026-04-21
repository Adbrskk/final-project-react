import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});