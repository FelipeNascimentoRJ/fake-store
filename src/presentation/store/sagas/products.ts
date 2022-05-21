import {PayloadAction} from '@reduxjs/toolkit';
import {all, put, takeLatest} from 'redux-saga/effects';

import {ErrorState} from '../types';
import {Products} from '../reducers/products';

function* loadMiddleware(): unknown {
  try {
    // TODO: load products
    console.log('loadMiddleware');

    yield put(Products.actions.loadSuccess([]));
  } catch (error) {
    yield put(Products.actions.loadFailure(error as ErrorState));
  }
}

function* loadByCategoryMiddleware({
  payload: category,
}: PayloadAction<string>): unknown {
  try {
    // TODO: load products by category
    console.log('loadByCategoryMiddleware: ', category);

    yield put(Products.actions.loadSuccess([]));
  } catch (error) {
    yield put(Products.actions.loadFailure(error as ErrorState));
  }
}

export default function* root() {
  yield all([
    takeLatest(Products.actions.loadMiddleware, loadMiddleware),
    takeLatest(
      Products.actions.loadByCategoryMiddleware,
      loadByCategoryMiddleware,
    ),
  ]);
}
