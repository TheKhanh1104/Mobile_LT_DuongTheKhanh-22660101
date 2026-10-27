import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return [
      { id: 1, name: 'Laptop Gaming Pro', price: 1200 },
      { id: 2, name: 'Chuột Không Dây RGB', price: 45 },
      { id: 3, name: 'Bàn Phím Cơ Custom', price: 150 },
      { id: 4, name: 'Tai Nghe Chống Ồn', price: 200 },
    ] as Product[];
  }
);

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;