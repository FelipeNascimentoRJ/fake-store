import {PayloadAction} from '@reduxjs/toolkit';
import {all, put, takeLatest} from 'redux-saga/effects';

import Symbols from '../../../application/symbols';
import Container from '../../../application/container';
import {LoadProductsUseCase} from '../../../application/domain/use-case/load-products';
import {LoadProductsByCategoryUseCase} from '../../../application/domain/use-case/load-products-by-category';

import {ErrorState} from '../types';
import {Products} from '../reducers/products';

function* loadMiddleware(): unknown {
  try {
    const useCase = Container.resolve<LoadProductsUseCase>(
      Symbols.useCases.loadProducts,
    );

    if (!useCase) {
      return;
    }

    const products = yield useCase.execute();

    yield put(Products.actions.loadSuccess(products));
  } catch (error) {
    yield put(Products.actions.loadFailure(error as ErrorState));
  }
}

function* loadByCategoryMiddleware({
  payload: category,
}: PayloadAction<string>): unknown {
  try {
    const useCase = Container.resolve<LoadProductsByCategoryUseCase>(
      Symbols.useCases.loadProductsByCategory,
    );

    if (!useCase) {
      return;
    }

    const products = yield useCase.execute(category);

    yield put(Products.actions.loadSuccess(products));
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
