import {PayloadAction} from '@reduxjs/toolkit';
import {all, put, takeLatest} from 'redux-saga/effects';

import {Cart} from '../reducers/cart';
import {ErrorState, ProductState} from '../types';

function* addOneMiddleware({
  payload: product,
}: PayloadAction<ProductState>): unknown {
  try {
    // TODO: add products to cart
    console.log('addOneMiddleware');

    yield put(Cart.actions.addOne(product));
  } catch (error) {
    yield put(Cart.actions.failure(error as ErrorState));
  }
}

function* reduceOneMiddleware({
  payload: productId,
}: PayloadAction<number>): unknown {
  try {
    // TODO: reduce products in cart
    console.log('reduceOneMiddleware');

    yield put(Cart.actions.reduceOne(productId));
  } catch (error) {
    yield put(Cart.actions.failure(error as ErrorState));
  }
}

function* clearMiddleware(): unknown {
  try {
    // TODO: clear cart
    console.log('clearMiddleware');

    yield put(Cart.actions.clear());
  } catch (error) {
    yield put(Cart.actions.failure(error as ErrorState));
  }
}

export default function* root() {
  yield all([
    takeLatest(Cart.actions.addOneMiddleware, addOneMiddleware),
    takeLatest(Cart.actions.reduceOneMiddleware, reduceOneMiddleware),
    takeLatest(Cart.actions.clearMiddleware, clearMiddleware),
  ]);
}
