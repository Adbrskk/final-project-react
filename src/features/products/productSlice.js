import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/products/all');

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (Array.isArray(response.data.products)) {
        return response.data.products;
      }

      if (Array.isArray(response.data.rows)) {
        return response.data.rows;
      }

      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch products'
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (slug, thunkAPI) => {
    try {
      const response = await api.get(`/categories/${slug}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch category products'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categoryTitle: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    resetProductsState: (state) => {
      state.items = [];
      state.categoryTitle = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.categoryTitle = 'All products';
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.status = 'succeeded';

      const data = action.payload;

      if (Array.isArray(data?.data?.products)) {
        state.items = data.data.products;
      } else if (Array.isArray(data?.products)) {
        state.items = data.products;
      } else if (Array.isArray(data?.data)) {
        state.items = data.data;
      } else {
        state.items = [];
      }

      state.categoryTitle = data?.category?.title || data?.title || '';
    })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetProductsState } = productSlice.actions;
export default productSlice.reducer;