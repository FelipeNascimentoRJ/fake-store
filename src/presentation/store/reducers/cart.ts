import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CartListState, CartState, ErrorState, ProductState} from '../types';

const initialState: CartState = {
  error: null,
  cart: {},
};

export const Cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadMiddleware: (_state: CartState): void => {
      //
    },
    load: (state: CartState, action: PayloadAction<CartListState>): void => {
      state.cart = action.payload;
    },
    addOneMiddleware: (
      _state: CartState,
      _action: PayloadAction<ProductState>,
    ): void => {
      //
    },
    addOne: (
      state: CartState,
      {payload: product}: PayloadAction<ProductState>,
    ): void => {
      if (state.cart[product.id]) {
        state.cart[product.id].quantity += 1;
        return;
      }

      state.cart[product.id] = {
        product,
        quantity: 1,
      };
    },
    reduceOneMiddleware: (
      _state: CartState,
      _action: PayloadAction<number>,
    ): void => {
      //
    },
    reduceOne: (
      state: CartState,
      {payload: productId}: PayloadAction<number>,
    ): void => {
      const product = state.cart[productId];

      if (!product) {
        return;
      }

      const productIsEqualToZero = product && product.quantity - 1 === 0;

      if (productIsEqualToZero) {
        delete state.cart[productId];
        return;
      }

      state.cart[productId].quantity -= 1;
    },
    clearMiddleware: (_state: CartState): void => {
      //
    },
    clear: (state: CartState): void => {
      state.cart = {};
    },
    failure: (state: CartState, action: PayloadAction<ErrorState>): void => {
      state.error = action.payload;
    },
  },
});
