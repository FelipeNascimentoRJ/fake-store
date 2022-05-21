import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ErrorState, ProductState, ProductsState} from '../types';

const initialState: ProductsState = {
  loading: false,
  error: null,
  products: [],
};

export const Products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadMiddleware: (state: ProductsState): void => {
      state.loading = true;
    },
    loadByCategoryMiddleware: (
      state: ProductsState,
      _action: PayloadAction<string>,
    ): void => {
      state.loading = true;
    },
    loadSuccess: (
      state: ProductsState,
      action: PayloadAction<ProductState[]>,
    ): void => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    loadFailure: (
      state: ProductsState,
      action: PayloadAction<ErrorState>,
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
