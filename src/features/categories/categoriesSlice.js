import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPopularCategories = createAsyncThunk(
  'categories/fetchPopularCategories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/categories/popular');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch popular categories'
      );
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/categories');

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (Array.isArray(response.data.categories)) {
        return response.data.categories;
      }

      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch categories'
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    popularItems: [],
    status: 'idle',
    popularStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularCategories.pending, (state) => {
        state.popularStatus = 'loading';
      })
      .addCase(fetchPopularCategories.fulfilled, (state, action) => {
        state.popularStatus = 'succeeded';
        state.popularItems = action.payload;
      })
      .addCase(fetchPopularCategories.rejected, (state, action) => {
        state.popularStatus = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;