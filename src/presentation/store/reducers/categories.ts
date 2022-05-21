import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ErrorState, CategoriesState} from '../types';

const initialState: CategoriesState = {
  loading: false,
  error: null,
  categories: ['all', 'category1', 'category2', 'category3'],
};

export const Categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    loadMiddleware: (state: CategoriesState): void => {
      state.loading = true;
    },
    loadSuccess: (
      state: CategoriesState,
      action: PayloadAction<string[]>,
    ): void => {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    loadFailure: (
      state: CategoriesState,
      action: PayloadAction<ErrorState>,
    ): void => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
